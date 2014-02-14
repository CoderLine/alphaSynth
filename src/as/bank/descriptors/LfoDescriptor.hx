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
package as.bank.descriptors;

import as.bank.components.Enum.WaveformEnum;
import as.bank.components.generators.DefaultGenerators;
import as.bank.components.generators.Generator;
import as.platform.Types.Float32;
import as.synthesis.Synthesizer;
import as.synthesis.SynthHelper;
import haxe.io.BytesInput;

class LfoDescriptor
{
    public var delayTime:Float32;
    public var frequency:Float32;
    public var depth:Float32;
    public var generator:Generator;

    public function new() 
    {
        delayTime = 0;
        frequency = Synthesizer.DefaultLfoFrequency;
        depth = 1;
        generator = DefaultGenerators.DefaultSine;
    }
}