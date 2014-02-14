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
package as.sf2;
import as.ds.FixedArray.FixedArray;
import as.sf2.Enum;
import as.platform.Types.Short;

class Sf2Region
{
    public var generators(default, null):FixedArray<Short>;
    
    public function new() 
    {
        generators = new FixedArray<Short>(61); 
    }
    
    public function applyDefaultValues()
    {
        generators[GeneratorEnum.StartAddressOffset] = cast 0;
        generators[GeneratorEnum.EndAddressOffset] = cast 0;
        generators[GeneratorEnum.StartLoopAddressOffset] = cast 0;
        generators[GeneratorEnum.EndLoopAddressOffset] = cast 0;
        generators[GeneratorEnum.StartAddressCoarseOffset] = cast 0;
        generators[GeneratorEnum.ModulationLFOToPitch] = cast 0;
        generators[GeneratorEnum.VibratoLFOToPitch] = cast 0;
        generators[GeneratorEnum.ModulationEnvelopeToPitch] = cast 0;
        generators[GeneratorEnum.InitialFilterCutoffFrequency] = cast 13500;
        generators[GeneratorEnum.InitialFilterQ] = cast 0;
        generators[GeneratorEnum.ModulationLFOToFilterCutoffFrequency] = cast 0;
        generators[GeneratorEnum.ModulationEnvelopeToFilterCutoffFrequency] = cast 0;
        generators[GeneratorEnum.EndAddressCoarseOffset] = cast 0;
        generators[GeneratorEnum.ModulationLFOToVolume] = cast 0;
        generators[GeneratorEnum.ChorusEffectsSend] = cast 0;
        generators[GeneratorEnum.ReverbEffectsSend] = cast 0;
        generators[GeneratorEnum.Pan] = cast 0;
        generators[GeneratorEnum.DelayModulationLFO] = cast -12000;
        generators[GeneratorEnum.FrequencyModulationLFO] = cast 0;
        generators[GeneratorEnum.DelayVibratoLFO] = cast -12000;
        generators[GeneratorEnum.FrequencyVibratoLFO] = cast 0;
        generators[GeneratorEnum.DelayModulationEnvelope] = cast -12000;
        generators[GeneratorEnum.AttackModulationEnvelope] = cast -12000;
        generators[GeneratorEnum.HoldModulationEnvelope] = cast -12000;
        generators[GeneratorEnum.DecayModulationEnvelope] = cast -12000;
        generators[GeneratorEnum.SustainModulationEnvelope] = cast 0;
        generators[GeneratorEnum.ReleaseModulationEnvelope] = cast -12000;
        generators[GeneratorEnum.KeyNumberToModulationEnvelopeHold] = cast 0;
        generators[GeneratorEnum.KeyNumberToModulationEnvelopeDecay] = cast 0;
        generators[GeneratorEnum.DelayVolumeEnvelope] = cast -12000;
        generators[GeneratorEnum.AttackVolumeEnvelope] = cast -12000;
        generators[GeneratorEnum.HoldVolumeEnvelope] = cast -12000;
        generators[GeneratorEnum.DecayVolumeEnvelope] = cast -12000;
        generators[GeneratorEnum.SustainVolumeEnvelope] = cast 0;
        generators[GeneratorEnum.ReleaseVolumeEnvelope] = cast -12000;
        generators[GeneratorEnum.KeyNumberToVolumeEnvelopeHold] = cast 0;
        generators[GeneratorEnum.KeyNumberToVolumeEnvelopeDecay] = cast 0;
        generators[GeneratorEnum.KeyRange] = cast 0x7F00;
        generators[GeneratorEnum.VelocityRange] = cast 0x7F00;
        generators[GeneratorEnum.StartLoopAddressCoarseOffset] = cast 0;
        generators[GeneratorEnum.KeyNumber] = cast -1;
        generators[GeneratorEnum.Velocity] = cast -1;
        generators[GeneratorEnum.InitialAttenuation] = cast 0;
        generators[GeneratorEnum.EndLoopAddressCoarseOffset] = cast 0;
        generators[GeneratorEnum.CoarseTune] = cast 0;
        generators[GeneratorEnum.FineTune] = cast 0;
        generators[GeneratorEnum.SampleModes] = cast 0;
        generators[GeneratorEnum.ScaleTuning] = cast 100;
        generators[GeneratorEnum.ExclusiveClass] = cast 0;
        generators[GeneratorEnum.OverridingRootKey] = cast -1;
    }
}