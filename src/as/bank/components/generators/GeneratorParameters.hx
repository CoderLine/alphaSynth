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
import as.bank.components.Enum.LoopModeEnum;
import as.platform.Types.Float32;

class GeneratorParameters
{
    public var phase:Float32;
    public var currentStart:Float32;
    public var currentEnd:Float32;
    public var currentState:Int;
    
    public function new() 
    {
        phase = 0;
        currentStart = 0;
        currentEnd = 0;
        currentState = 0;
    }
    
    public function quickSetup(generator:Generator) : Void
    {
        currentStart = generator.startPhase;
        phase = currentStart + generator.offset;
        switch (generator.loopMode)
        {
            case LoopModeEnum.Continuous, LoopModeEnum.LoopUntilNoteOff:
                if (phase >= generator.endPhase)
                {
                    currentState = GeneratorStateEnum.Finished;
                }
                else if (phase >= generator.loopEndPhase)
                {
                    currentState = GeneratorStateEnum.PostLoop;
                    currentEnd = generator.endPhase;
                }
                else if (phase >= generator.loopStartPhase)
                {
                    currentState = GeneratorStateEnum.Loop;
                    currentEnd = generator.loopEndPhase;
                    currentStart = generator.loopStartPhase;
                }
                else
                {
                    currentState = GeneratorStateEnum.PreLoop;
                    currentEnd = generator.loopStartPhase;
                }
            default:
                currentEnd = generator.endPhase;
                if (phase >= currentEnd)
                    currentState = GeneratorStateEnum.Finished;
                else
                    currentState = GeneratorStateEnum.PostLoop;
        }
    }    
}