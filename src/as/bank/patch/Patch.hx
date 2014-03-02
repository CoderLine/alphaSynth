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
package as.bank.patch;

import as.bank.components.generators.Generator;
import as.bank.descriptors.EnvelopeDescriptor;
import as.bank.descriptors.FilterDescriptor;
import as.bank.descriptors.LfoDescriptor;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.TypeUtils;
import as.synthesis.Synthesizer;
import as.synthesis.VoiceParameters;
import as.util.SynthConstants;

class Patch
{
    public var exclusiveGroupTarget:Int;
    public var exclusiveGroup:Int;
    public var generatorInfo(default, null):FixedArray<Generator>;
    public var envelopeInfo(default, null):FixedArray<EnvelopeDescriptor>;
    public var lfoInfo(default, null):FixedArray<LfoDescriptor>;
    public var filterInfo(default, null):FixedArray<FilterDescriptor>;
    public var name(default, null):String;
    
    private function new(name:String)
    {
        this.name = name;
        generatorInfo = new FixedArray<Generator>(SynthConstants.MaxVoiceComponents);
        envelopeInfo = new FixedArray<EnvelopeDescriptor>(SynthConstants.MaxVoiceComponents);
        lfoInfo = new FixedArray<LfoDescriptor>(SynthConstants.MaxVoiceComponents);
        filterInfo = new FixedArray<FilterDescriptor>(SynthConstants.MaxVoiceComponents);
        exclusiveGroup = 0;
        exclusiveGroupTarget = 0;
    }
    
    public function clearDescriptors()
    {
        TypeUtils.clearObjectArray(generatorInfo);
        TypeUtils.clearObjectArray(envelopeInfo);
        TypeUtils.clearObjectArray(filterInfo);
        TypeUtils.clearObjectArray(lfoInfo);
    }
 
    public function process(voiceparams:VoiceParameters, startIndex:Int, endIndex:Int)
    {
        throw "abstract";
    }
 
    public function start(voiceparams:VoiceParameters) : Bool
    {
        throw "abstract";
        return false;
    }
 
    public function stop(voiceparams:VoiceParameters)
    {
        throw "abstract";
    }
}