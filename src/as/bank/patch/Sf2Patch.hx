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

import as.bank.AssetManager;
import as.bank.components.Enum.EnvelopeStateEnum;
import as.bank.components.Enum.FilterTypeEnum;
import as.bank.components.Enum.GeneratorStateEnum;
import as.bank.components.Enum.LoopModeEnum;
import as.bank.components.generators.DefaultGenerators;
import as.bank.components.generators.Generator;
import as.bank.components.generators.SampleGenerator;
import as.bank.descriptors.EnvelopeDescriptor;
import as.bank.descriptors.FilterDescriptor;
import as.bank.descriptors.LfoDescriptor;
import as.platform.Types.Float32;
import as.platform.Types.Short;
import as.sf2.Enum.GeneratorEnum;
import as.sf2.Sf2Region;
import as.synthesis.Synthesizer;
import as.synthesis.SynthHelper;
import as.synthesis.VoiceParameters;
import as.util.SynthConstants;

class Sf2Patch extends Patch
{
    private var _iniFilterFc:Int;
    private var _filterQ:Float32;
    private var _sustainVolEnv:Float32;
    private var _initialAttn:Float32;
    private var _keyOverride:Short;
    private var _velOverride:Short;
    private var _keynumToModEnvHold:Short;
    private var _keynumToModEnvDecay:Short;
    private var _keynumToVolEnvHold:Short;
    private var _keynumToVolEnvDecay:Short;
    private var _pan:PanComponent;
    private var _modLfoToPitch:Short;
    private var _vibLfoToPitch:Short;
    private var _modEnvToPitch:Short;
    private var _modLfoToFilterFc:Short;
    private var _modEnvToFilterFc:Short;
    private var _modLfoToVolume:Float32;

    public function new(name:String) 
    {
        super(name);
        _pan = new PanComponent();
        _iniFilterFc = 0;
        _filterQ = 0;
        _sustainVolEnv = 0;
        _initialAttn = 0;
        _keyOverride = 0;
        _velOverride = 0;
        _keynumToModEnvHold = 0;
        _keynumToModEnvDecay = 0;
        _keynumToVolEnvHold = 0;
        _keynumToVolEnvDecay = 0;
        _modLfoToPitch = 0;
        _vibLfoToPitch = 0;
        _modEnvToPitch = 0;
        _modLfoToFilterFc = 0;
        _modEnvToFilterFc = 0;
        _modLfoToVolume = 0;
    }
    
    public override function start(voiceparams:VoiceParameters):Bool 
    {
        var note = _keyOverride > -1 ? _keyOverride : voiceparams.note;
        var vel = _velOverride > -1 ? _velOverride : voiceparams.velocity;

        voiceparams.generatorParams[0].quickSetup(voiceparams.generators[0]);

        voiceparams.envelopes[0].quickSetupDAHDSR(voiceparams.synth.sampleRate, note, _keynumToModEnvHold, _keynumToModEnvDecay, 1, this.envelopeInfo[0]);
        var susMod:Float32 = SynthHelper.dBtoLinear(-_sustainVolEnv);
        if (susMod <= 1e-5)
            susMod = 0;
        voiceparams.envelopes[1].quickSetupDAHDSR(voiceparams.synth.sampleRate, note, _keynumToVolEnvHold, _keynumToVolEnvDecay, susMod, this.envelopeInfo[1]);

        voiceparams.filters[0].disable();

        voiceparams.lfos[0].quickSetup(voiceparams.synth.sampleRate, lfoInfo[0]);
        voiceparams.lfos[1].quickSetup(voiceparams.synth.sampleRate, lfoInfo[1]);

        voiceparams.pitchOffset = (note - voiceparams.generators[0].rootKey) * voiceparams.generators[0].keyTrack + voiceparams.generators[0].tune;
        voiceparams.volOffset = -20.0 * (Math.log(16129.0 / (vel * vel))/Math.log(10)) + -_initialAttn;

        return voiceparams.generatorParams[0].currentState != GeneratorStateEnum.Finished && voiceparams.envelopes[1].currentStage != EnvelopeStateEnum.None;
    }
    
    public override function stop(voiceparams:VoiceParameters):Void 
    {
        voiceparams.generators[0].release(voiceparams.generatorParams[0]);
        if (voiceparams.generators[0].loopMode != LoopModeEnum.OneShot)
        {
            voiceparams.envelopes[0].release();
            voiceparams.envelopes[1].release();
        }
    }
    
    public override function process(voiceparams:VoiceParameters, startIndex:Int, endIndex:Int):Void 
    {
        var basePitch = SynthHelper.centsToPitch(voiceparams.pitchOffset + voiceparams.synth.totalPitch[voiceparams.channel])
            * voiceparams.generators[0].frequency / voiceparams.synth.sampleRate;

        var x = startIndex;
        while (x < endIndex)
        {
            voiceparams.envelopes[0].increment(SynthConstants.DefaultBlockSize);
            voiceparams.envelopes[1].increment(SynthConstants.DefaultBlockSize);
            voiceparams.lfos[0].increment(SynthConstants.DefaultBlockSize);
            voiceparams.lfos[1].increment(SynthConstants.DefaultBlockSize);

            voiceparams.generators[0].getValues(voiceparams.generatorParams[0], voiceparams.blockBuffer, basePitch *
                SynthHelper.centsToPitch(Std.int(voiceparams.envelopes[0].value * _modEnvToPitch +
                voiceparams.lfos[0].value * _modLfoToPitch + voiceparams.lfos[1].value * _vibLfoToPitch)));

            if (voiceparams.filters[0].enabled)
            {
                var centsFc = _iniFilterFc + voiceparams.lfos[0].value * _modLfoToFilterFc + voiceparams.envelopes[0].value * _modEnvToFilterFc;
                if (centsFc > 13500)
                    centsFc = 13500;
                voiceparams.filters[0].updateCoefficients(SynthHelper.keyToFrequency(centsFc / 100.0, 69) / voiceparams.synth.sampleRate, _filterQ);
                voiceparams.filters[0].applyFilterMulti(voiceparams.blockBuffer);
            }
            var volume:Float = SynthHelper.dBtoLinear(voiceparams.volOffset + voiceparams.lfos[0].value * _modLfoToVolume) * voiceparams.envelopes[1].value * voiceparams.synth.totalVolume[voiceparams.channel] * voiceparams.synth.mixGain;
            if (voiceparams.synth.audioChannels == 2)
            {
                SynthHelper.mixMonoToStereoInterpolation(x,
                    volume * _pan.left * voiceparams.synth.panPositions[voiceparams.channel].left,
                    volume * _pan.right * voiceparams.synth.panPositions[voiceparams.channel].right,
                    voiceparams);
            }
            else
            {
                SynthHelper.mixMonoToMonoInterpolation(x, volume, voiceparams);
            }
            
            if ((voiceparams.envelopes[1].currentStage > EnvelopeStateEnum.Hold && volume <= SynthConstants.NonAudible) || voiceparams.generatorParams[0].currentState == GeneratorStateEnum.Finished)
            {
                voiceparams.state = VoiceStateEnum.Stopped;
                return;
            }
            
            x += SynthConstants.DefaultBlockSize * voiceparams.synth.audioChannels;
        }
    }
    
    public function load(region:Sf2Region, assets:AssetManager)
    {
        exclusiveGroup = region.generators[GeneratorEnum.ExclusiveClass];
        exclusiveGroupTarget = exclusiveGroup;
        
        _iniFilterFc = region.generators[GeneratorEnum.InitialFilterCutoffFrequency];
        _filterQ = SynthHelper.dBtoLinear(region.generators[GeneratorEnum.InitialFilterQ] / 10.0);
        _sustainVolEnv = region.generators[GeneratorEnum.SustainVolumeEnvelope] / 10.0;
        _initialAttn = region.generators[GeneratorEnum.InitialAttenuation] / 10.0;
        _keyOverride = region.generators[GeneratorEnum.KeyNumber];
        _velOverride = region.generators[GeneratorEnum.Velocity];
        _keynumToModEnvHold = region.generators[GeneratorEnum.KeyNumberToModulationEnvelopeHold];
        _keynumToModEnvDecay = region.generators[GeneratorEnum.KeyNumberToModulationEnvelopeDecay];
        _keynumToVolEnvHold = region.generators[GeneratorEnum.KeyNumberToVolumeEnvelopeHold];
        _keynumToVolEnvDecay = region.generators[GeneratorEnum.KeyNumberToVolumeEnvelopeDecay];
        _pan.setValue(region.generators[GeneratorEnum.Pan] / 500.0, PanFormulaEnum.Neg3dBCenter);
        _modLfoToPitch = region.generators[GeneratorEnum.ModulationLFOToPitch];
        _vibLfoToPitch = region.generators[GeneratorEnum.VibratoLFOToPitch];
        _modEnvToPitch = region.generators[GeneratorEnum.ModulationEnvelopeToPitch];
        _modLfoToFilterFc = region.generators[GeneratorEnum.ModulationLFOToFilterCutoffFrequency];
        _modEnvToFilterFc = region.generators[GeneratorEnum.ModulationEnvelopeToFilterCutoffFrequency];
        _modLfoToVolume = region.generators[GeneratorEnum.ModulationLFOToVolume] / 10.0;
        loadGen(region, assets);
        loadEnvelopes(region);
        loadLfos(region);
        loadFilter(region);    
    }
    
    private function loadGen(region:Sf2Region, assets:AssetManager)
    {
        var sda:SampleDataAsset = assets.sampleAssets[region.generators[GeneratorEnum.SampleID]];
        var gen:SampleGenerator = new SampleGenerator();
        gen.endPhase = sda.end + region.generators[GeneratorEnum.EndAddressOffset] + 32768.0 * region.generators[GeneratorEnum.EndAddressCoarseOffset];
        gen.frequency = sda.sampleRate;
        gen.keyTrack = region.generators[GeneratorEnum.ScaleTuning];
        gen.loopEndPhase = sda.loopEnd + region.generators[GeneratorEnum.EndLoopAddressOffset] + 32768.0 * region.generators[GeneratorEnum.EndLoopAddressCoarseOffset];
        switch (region.generators[GeneratorEnum.SampleModes] & 0x3)
        {
            case 0x0, 0x2:
                gen.loopMode = LoopModeEnum.NoLoop;
            case 0x1:
                gen.loopMode = LoopModeEnum.Continuous;
            case 0x3:
                gen.loopMode = LoopModeEnum.LoopUntilNoteOff;
        }
        gen.loopStartPhase = sda.loopStart + region.generators[GeneratorEnum.StartLoopAddressOffset] + 32768.0 * region.generators[GeneratorEnum.StartLoopAddressCoarseOffset];
        gen.offset = 0;
        gen.period = 1.0;
        if (region.generators[GeneratorEnum.OverridingRootKey] > -1)
            gen.rootKey = region.generators[GeneratorEnum.OverridingRootKey];
        else
            gen.rootKey = sda.rootKey;
        gen.startPhase = sda.start + region.generators[GeneratorEnum.StartAddressOffset] + 32768.0 * region.generators[GeneratorEnum.StartAddressCoarseOffset];
        gen.tune = (sda.tune + region.generators[GeneratorEnum.FineTune] + 100 * region.generators[GeneratorEnum.CoarseTune]);
        gen.velocityTrack = cast 0;
        gen.samples = sda.sampleData;
        this.generatorInfo[0] = gen;
    }    
    
    private function loadEnvelopes(region:Sf2Region)
    {
        //
        // Mod Env
        envelopeInfo[0] = new EnvelopeDescriptor();
        envelopeInfo[0].attackTime = Math.pow(2, region.generators[GeneratorEnum.AttackModulationEnvelope] / 1200.0);
        envelopeInfo[0].decayTime = Math.pow(2, region.generators[GeneratorEnum.DecayModulationEnvelope] / 1200.0);
        envelopeInfo[0].delayTime = Math.pow(2, region.generators[GeneratorEnum.DelayModulationEnvelope] / 1200.0);
        envelopeInfo[0].holdTime = Math.pow(2, region.generators[GeneratorEnum.HoldModulationEnvelope] / 1200.0);
        envelopeInfo[0].peakLevel = 1;
        envelopeInfo[0].releaseTime = Math.pow(2, region.generators[GeneratorEnum.ReleaseModulationEnvelope] / 1200.0);
        envelopeInfo[0].startLevel = 0;
        envelopeInfo[0].sustainLevel = 1.0 - region.generators[GeneratorEnum.SustainModulationEnvelope] / 1000.0;
        if (envelopeInfo[0].attackTime < 0.001)
            envelopeInfo[0].attackTime = 0.001;
        else if (envelopeInfo[0].attackTime > 100)
            envelopeInfo[0].attackTime = 100;
        if (envelopeInfo[0].decayTime < 0.001)
            envelopeInfo[0].decayTime = 0;
        else if (envelopeInfo[0].decayTime > 100)
            envelopeInfo[0].decayTime = 100;
        if (envelopeInfo[0].delayTime < 0.001)
            envelopeInfo[0].delayTime = 0;
        else if (envelopeInfo[0].delayTime > 20)
            envelopeInfo[0].delayTime = 20;
        if (envelopeInfo[0].holdTime < 0.001)
            envelopeInfo[0].holdTime = 0;
        else if (envelopeInfo[0].holdTime > 20)
            envelopeInfo[0].holdTime = 20;
        if (envelopeInfo[0].releaseTime < 0.001)
            envelopeInfo[0].releaseTime = 0.001;
        else if (envelopeInfo[0].releaseTime > 100)
            envelopeInfo[0].releaseTime = 100;
        
        //
        // Vol Env
        envelopeInfo[1] = new EnvelopeDescriptor();
        envelopeInfo[1].attackTime = Math.pow(2, region.generators[GeneratorEnum.AttackVolumeEnvelope] / 1200.0);
        envelopeInfo[1].decayTime = Math.pow(2, region.generators[GeneratorEnum.DecayVolumeEnvelope] / 1200.0);
        envelopeInfo[1].delayTime = Math.pow(2, region.generators[GeneratorEnum.DelayVolumeEnvelope] / 1200.0);
        envelopeInfo[1].holdTime = Math.pow(2, region.generators[GeneratorEnum.HoldVolumeEnvelope] / 1200.0);
        envelopeInfo[1].peakLevel = 1;
        envelopeInfo[1].releaseTime = Math.pow(2, region.generators[GeneratorEnum.ReleaseVolumeEnvelope] / 1200.0);
        envelopeInfo[1].startLevel = 0;
        envelopeInfo[1].sustainLevel = 1;
        if (envelopeInfo[1].attackTime < 0.001)
            envelopeInfo[1].attackTime = 0.001;
        else if (envelopeInfo[1].attackTime > 100)
            envelopeInfo[1].attackTime = 100;
        if (envelopeInfo[1].decayTime < 0.001)
            envelopeInfo[1].decayTime = 0;
        else if (envelopeInfo[1].decayTime > 100)
            envelopeInfo[1].decayTime = 100;
        if (envelopeInfo[1].delayTime < 0.001)
            envelopeInfo[1].delayTime = 0;
        else if (envelopeInfo[1].delayTime > 20)
            envelopeInfo[1].delayTime = 20;
        if (envelopeInfo[1].holdTime < 0.001)
            envelopeInfo[1].holdTime = 0;
        else if (envelopeInfo[1].holdTime > 20)
            envelopeInfo[1].holdTime = 20;
        if (envelopeInfo[1].releaseTime < 0.001)
            envelopeInfo[1].releaseTime = 0.001;
        else if (envelopeInfo[1].releaseTime > 100)
            envelopeInfo[1].releaseTime = 100;
    }    
    
    private function loadLfos(region:Sf2Region)
    {
        lfoInfo[0] = new LfoDescriptor();
        lfoInfo[0].delayTime = Math.pow(2, region.generators[GeneratorEnum.DelayModulationLFO] / 1200.0);
        lfoInfo[0].frequency = (Math.pow(2, region.generators[GeneratorEnum.FrequencyModulationLFO] / 1200.0) * 8.176);
        lfoInfo[0].generator = DefaultGenerators.defaultSine();
        lfoInfo[1] = new LfoDescriptor();
        lfoInfo[1].delayTime = Math.pow(2, region.generators[GeneratorEnum.DelayVibratoLFO] / 1200.0);
        lfoInfo[1].frequency = (Math.pow(2, region.generators[GeneratorEnum.FrequencyVibratoLFO] / 1200.0) * 8.176);
        lfoInfo[1].generator = DefaultGenerators.defaultSine();
    }

    private function loadFilter(region:Sf2Region)
    {
        filterInfo[0] = new FilterDescriptor();
        filterInfo[0].cutOff = 20000;
        filterInfo[0].filterMethod = FilterTypeEnum.BiquadLowpass;
        filterInfo[0].resonance = 1;
    }
}