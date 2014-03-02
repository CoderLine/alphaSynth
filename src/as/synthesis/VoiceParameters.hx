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
package as.synthesis;

import as.bank.components.Envelope;
import as.bank.components.Filter;
import as.bank.components.generators.Generator;
import as.bank.components.generators.GeneratorParameters;
import as.bank.components.generators.TriangleGenerator;
import as.bank.components.Lfo;
import as.ds.FixedArray.FixedArray;
import as.ds.SampleArray;
import as.platform.Types.Float32;
import as.platform.Types.TypeUtils;
import as.synthesis.SynthHelper.VoiceStateEnum;
import as.util.SynthConstants;

class VoiceParameters
{
    public var channel:Int;
    public var note:Int;
    public var velocity:Int;
    public var noteOffPending:Bool;
    public var state:Int;
    public var synth:Synthesizer;
    public var pitchOffset:Int;
    public var volOffset:Float32;
    public var blockBuffer:SampleArray;
    public var mixing:SampleArray;
    public var counters:SampleArray;    
    public var generatorParams:FixedArray<GeneratorParameters>;
    public var generators:FixedArray<Generator>;  
    public var envelopes:FixedArray<Envelope>;
    public var filters:FixedArray<Filter>;      
    public var lfos:FixedArray<Lfo>;               
    
    public function new(synth:Synthesizer)
    {
        this.synth = synth;
        channel = 0;
        note = 0;
        velocity = 0;
        state = VoiceStateEnum.Stopped;
        pitchOffset = 0;
        volOffset = 0;
        blockBuffer = new SampleArray(SynthConstants.DefaultBlockSize);
        TypeUtils.clearSampleArray(blockBuffer);
        //create default number of each component
        mixing = new SampleArray(SynthConstants.MaxVoiceComponents);
        TypeUtils.clearSampleArray(mixing);
        counters = new SampleArray(SynthConstants.MaxVoiceComponents);
        TypeUtils.clearSampleArray(counters);
        generatorParams = new FixedArray<GeneratorParameters>(SynthConstants.MaxVoiceComponents);
        generators = null; //since this is set directly there is no need to initialize
        envelopes = new FixedArray<Envelope>(SynthConstants.MaxVoiceComponents);
        filters = new FixedArray<Filter>(SynthConstants.MaxVoiceComponents);
        lfos = new FixedArray<Lfo>(SynthConstants.MaxVoiceComponents);
        for (i in 0 ... SynthConstants.MaxVoiceComponents)
        {
            generatorParams[i] = new GeneratorParameters();
            envelopes[i] = new Envelope();
            filters[i] = new Filter();
            lfos[i] = new Lfo();
        }
    }

}