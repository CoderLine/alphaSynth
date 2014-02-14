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
package as.bank.components.generators;

import as.bank.components.Enum.GeneratorStateEnum;
import as.bank.components.Enum.InterpolationEnum;
import as.bank.components.Enum.LoopModeEnum;
import as.bank.components.Enum.WaveformEnum;
import as.bank.descriptors.GeneratorDescriptor;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;
import as.platform.Types.Short;

class Generator
{
    public var loopMode:Int;
    public var loopStartPhase:Float32;
    public var loopEndPhase:Float32;
    public var startPhase:Float32;
    public var endPhase:Float32;
    public var offset:Float32;
    public var period:Float32;
    public var frequency:Float32;
    public var rootKey:Short;
    public var keyTrack:Short;
    public var velocityTrack:Short;
    public var tune:Short;
    
    private function new(description:GeneratorDescriptor)
    {
        loopMode = description.loopMethod;
        loopStartPhase = description.loopStartPhase;
        loopEndPhase = description.loopEndPhase;
        startPhase = description.startPhase;
        endPhase = description.endPhase;
        offset = description.offset;
        period = description.period;
        rootKey = description.rootkey;
        keyTrack = description.keyTrack;
        velocityTrack = description.velTrack;
        tune = description.tune;
    }

    public function release(generatorParams:GeneratorParameters)
    {
        if (loopMode == LoopModeEnum.LoopUntilNoteOff)
        {
            generatorParams.currentState = GeneratorStateEnum.PostLoop;
            generatorParams.currentStart = startPhase;
            generatorParams.currentEnd = endPhase;
        }
    }
    
    public function getValue(phase:Float32) : Float32
    {
        throw "abstract";
        return 0;
    }
    
    public function getValues(generatorParams:GeneratorParameters, blockBuffer:FixedArray<Float32>, increment:Float32):Void 
    {
        var proccessed = 0;
        do
        {
            var samplesAvailable = Std.int(Math.ceil((generatorParams.currentEnd - generatorParams.phase) / increment));
            if (samplesAvailable > blockBuffer.length - proccessed)
            {
                while (proccessed < blockBuffer.length)
                {
                    blockBuffer[proccessed++] = getValue(generatorParams.phase);
                    generatorParams.phase += increment;
                }
            }
            else
            {
                var endProccessed = proccessed + samplesAvailable;
                while (proccessed < endProccessed)
                {
                    blockBuffer[proccessed++] = getValue(generatorParams.phase);
                    generatorParams.phase += increment;
                }
                switch (generatorParams.currentState)
                {
                    case GeneratorStateEnum.PreLoop:
                        generatorParams.currentStart = loopStartPhase;
                        generatorParams.currentEnd = loopEndPhase;
                        generatorParams.currentState = GeneratorStateEnum.Loop;
                    case GeneratorStateEnum.Loop:
                        generatorParams.phase += generatorParams.currentStart - generatorParams.currentEnd;
                    case GeneratorStateEnum.PostLoop:
                        generatorParams.currentState = GeneratorStateEnum.Finished;
                        while (proccessed < blockBuffer.length)
                            blockBuffer[proccessed++] = 0;
                }
            }
        } while (proccessed < blockBuffer.length);
    }
}