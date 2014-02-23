/*
 * This file is part of alphaSynth.
 * Copyright (c) 2014, T3866, PerryCodes, Daniel Kuschny and Contributors, All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.0 of the License, or at your option any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library.
 */
package as.bank.components;

import as.bank.components.Enum;
import as.bank.descriptors.EnvelopeDescriptor;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;
import as.platform.Types.Short;
import as.synthesis.Synthesizer;
import as.util.SynthConstants;
import as.util.Tables;

// TODO: reimplement this, it seems this implementation doesn't work as expected. 
// https://github.com/timowest/rogue/blob/4996e97c4a7be32542819802664116c5a214f0aa/dsp/envelope.cpp
class Envelope
{
    private var _stages:FixedArray<EnvelopeStage>;
    private var _index:Int;
    private var _stage:EnvelopeStage;
    
    public var value:Float32;
    public var currentStage(default, null):Int;
    public var depth:Float32;
    
    
    public function new() 
    {
        value = 0;
        depth = 0;
        _stages = new FixedArray<EnvelopeStage>(7);
        for (x in 0 ... _stages.length)
            _stages[x] = new EnvelopeStage();
        _stages[0].graph = Tables.envelopeTables(0);
        _stages[2].graph = Tables.envelopeTables(0);
        _stages[3].reverse = true;
        _stages[4].graph = Tables.envelopeTables(0);
        _stages[5].reverse = true;
        _stages[6].graph = Tables.envelopeTables(0);
        _stages[6].time = 100000000;
        currentStage = EnvelopeStateEnum.Delay;
        while (_stages[currentStage].time == 0)
        {
            currentStage++;
        }
        _stage = _stages[currentStage];
    }
    
    public function quickSetupDAHDSR(sampleRate:Int, note:Int, keyNumToHold:Short, keyNumToDecay:Short, susMod:Float32, envelopeInfo:EnvelopeDescriptor)
    {
        depth = envelopeInfo.depth;
        // Delay
        _stages[0].offset = 0;
        _stages[0].scale = 0;
        _stages[0].time = Std.int(Math.max(0, Std.int(sampleRate * (envelopeInfo.delayTime))));
        // Attack
        _stages[1].offset = envelopeInfo.startLevel;
        _stages[1].scale = envelopeInfo.peakLevel - envelopeInfo.startLevel;
        _stages[1].time = Std.int(Math.max(0, Std.int(sampleRate * (envelopeInfo.attackTime))));
        _stages[1].graph = Tables.envelopeTables(envelopeInfo.attackGraph);
        // Hold
        _stages[2].offset = 0;
        _stages[2].scale = envelopeInfo.peakLevel;
        _stages[2].time = Std.int(Math.max(0, Std.int(sampleRate * (envelopeInfo.holdTime) * Math.pow(2, ((60 - note) * keyNumToHold) / 1200.0))));
        // Decay
        _stages[3].offset = envelopeInfo.sustainLevel * susMod;
        _stages[3].scale = envelopeInfo.peakLevel - envelopeInfo.sustainLevel * susMod;
        _stages[3].time = Std.int(Math.max(0, Std.int(sampleRate * (envelopeInfo.decayTime) * Math.pow(2, ((60 - note) * keyNumToDecay) / 1200.0))));
        _stages[3].graph = Tables.envelopeTables(envelopeInfo.decayGraph);
        // Sustain
        _stages[4].offset = 0;
        _stages[4].scale = envelopeInfo.sustainLevel * susMod;
        _stages[4].time = Std.int(sampleRate * envelopeInfo.sustainTime);
        // Release
        _stages[5].offset = 0;
        _stages[5].scale = _stages[3].time == 0 && _stages[4].time == 0 ? envelopeInfo.peakLevel : _stages[4].scale;
        _stages[5].time = Std.int(Math.max(0, Std.int(sampleRate * (envelopeInfo.releaseTime))));
        _stages[5].graph = Tables.envelopeTables(envelopeInfo.releaseGraph);

        _index = 0;
        value = 0;
        currentStage = EnvelopeStateEnum.Delay;
        while (_stages[currentStage].time == 0)
        {
            currentStage++;
        }
        _stage = _stages[currentStage];
    }
    
    public function increment(samples:Int)
    {
        do
        {
            var neededSamples:Int = _stage.time - _index;
            if (neededSamples > samples)
            {
                _index += samples;
                samples = 0;
            }
            else
            {
                _index = 0;
                if (currentStage != EnvelopeStateEnum.None)
                {
                    do
                    {
                        _stage = _stages[++currentStage];
                    } while (_stage.time == 0);
                }
                samples -= neededSamples;
            }
        } while (samples > 0);
        
        var i = Std.int(_stage.graph.length * (_index / cast(_stage.time, Float32)));
        if (_stage.reverse)
            value = (1 - _stage.graph[i]) * _stage.scale + _stage.offset;
        else
            value = _stage.graph[i] * _stage.scale + _stage.offset;
    }

    public function release()
    {
        if (value <= SynthConstants.NonAudible)
        {
            _index = 0;
            currentStage = EnvelopeStateEnum.None;
            _stage = _stages[currentStage];
        }
        else if (currentStage < EnvelopeStateEnum.Release)
        {
            _index = 0;
            currentStage = EnvelopeStateEnum.Release;
            _stage = _stages[currentStage];
            _stage.scale = value;
        }
    }    
}

class EnvelopeStage
{
    public var time:Int;
    public var graph:FixedArray<Float32>;
    public var scale:Float32;
    public var offset:Float32;
    public var reverse:Bool;
    
    public function new()
    {
        time = 0;
        graph = null;
        scale = 0;
        offset = 0;
        reverse = false;
    }
}