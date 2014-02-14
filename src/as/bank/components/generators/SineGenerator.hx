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
import as.bank.components.generators.GeneratorParameters;
import as.bank.descriptors.GeneratorDescriptor;
import as.platform.Types.Float32;
import as.synthesis.Synthesizer;

class SineGenerator extends Generator
{
    public function new(description:GeneratorDescriptor)
    {
        super(description);
        if (endPhase < 0)
            endPhase = Synthesizer.TwoPi;
        if (startPhase < 0)
            startPhase = 0;
        if (loopEndPhase < 0)
            loopEndPhase = endPhase;
        if (loopStartPhase < 0)
            loopStartPhase = startPhase;
        if (period < 0)
            period = Synthesizer.TwoPi;
        if (rootKey < 0)
            rootKey = cast 69;
        frequency = 440;
    }
    
    public override function getValue(phase:Float32):Float32
    {
        return Math.sin(phase);
    }  
}