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
import as.bank.components.generators.Generator;
import as.bank.descriptors.LfoDescriptor;
import as.platform.Types.Float32;

class Lfo
{
    private var _lfoState:Int;
    private var _generator:Generator;
    private var _delayTime:Int;
    private var _increment:Float32;
    private var _phase:Float32;
    
    public var frequency(default, null):Float32;
    public var currentState(default, null):Int;
    public var value:Float32;
    public var depth:Float32;
    
    public function new() 
    {
        
    }
    
    public function quickSetup(sampleRate:Int, lfoInfo:LfoDescriptor)
    {
        _generator = lfoInfo.generator;
        _delayTime = Std.int(sampleRate * lfoInfo.delayTime);
        frequency = lfoInfo.frequency;
        _increment = _generator.period * frequency / sampleRate;
        depth = lfoInfo.depth;
        reset();
    }

    public function increment(amount:Int)
    {
        if (_lfoState == LfoStateEnum.Delay)
        {
            _phase -= amount;
            if (_phase <= 0.0)
            {
                _phase = _generator.loopStartPhase + _increment * -_phase;
                value = _generator.getValue(_phase);
                _lfoState = LfoStateEnum.Sustain;
            }
        }
        else
        {
            _phase += _increment * amount;
            if (_phase >= _generator.loopEndPhase)
                _phase = _generator.loopStartPhase + (_phase - _generator.loopEndPhase) % (_generator.loopEndPhase - _generator.loopStartPhase);
            value = _generator.getValue(_phase);
        }
    }    
    
    public function getNext() : Float32
    {
        if (_lfoState == LfoStateEnum.Delay)
        {
            _phase--;
            if (_phase <= 0.0)
            {
                _phase = _generator.loopStartPhase;
                _lfoState = LfoStateEnum.Sustain;
            }
            return 0.0;
        }
        else
        {
            _phase += _increment;
            if (_phase >= _generator.loopEndPhase)
                _phase = _generator.loopStartPhase + (_phase - _generator.loopEndPhase) % (_generator.loopEndPhase - _generator.loopStartPhase);
            return _generator.getValue(_phase);
        }
    }
    
    public function reset()
    {
        value = 0;
        if (_delayTime > 0)
        {
            _phase = _delayTime;
            _lfoState = LfoStateEnum.Delay;
        }
        else
        {
            _phase = 0.0;
            _lfoState = LfoStateEnum.Sustain;
        }
    }    
}