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

import as.platform.Types.TypeUtils;
import as.synthesis.SynthHelper;
import as.bank.patch.Patch;

class Voice
{
    public var patch(default, null):Patch;
    public var voiceParams(default, null):VoiceParameters;
    
    public function new(synth:Synthesizer)
    {
        voiceParams = new VoiceParameters(synth);
    }
    
    public function start()
    {
        if (voiceParams.state != VoiceStateEnum.Stopped)
            return;
        if (patch.start(voiceParams))
            voiceParams.state = VoiceStateEnum.Playing;
    }
    
    public function stop()
    {
        if (voiceParams.state != VoiceStateEnum.Playing)
            return;
        voiceParams.state = VoiceStateEnum.Stopping;
        patch.stop(voiceParams);
    }
    
    public function stopImmediately()
    {
        voiceParams.state = VoiceStateEnum.Stopped;
    }
    
    public function process(startIndex:Int, endIndex:Int)
    {
        if (voiceParams.state == VoiceStateEnum.Stopped)
            return;
        patch.process(voiceParams, startIndex, endIndex);
    }
    
    public function configure(channel:Int, note:Int, velocity:Int, patch:Patch)
    {
        TypeUtils.clearSampleArray(voiceParams.mixing);
        voiceParams.pitchOffset = 0;
        voiceParams.volOffset = 0;
        voiceParams.noteOffPending = false;
        voiceParams.channel = channel;
        voiceParams.note = note;
        voiceParams.velocity = velocity;
        this.patch = patch;
        if (patch == null)
            voiceParams.generators = null;
        else    
            voiceParams.generators = patch.generatorInfo;
    }
}