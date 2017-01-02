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
namespace AlphaSynth.Sf2
{
    public enum SFSampleLink
    {
        MonoSample = 1,
        RightSample = 2,
        LeftSample = 4,
        LinkedSample = 8,
        OggVobis = 0x10,
        RomMonoSample = 0x8001,
        RomRightSample = 0x8002,
        RomLeftSample = 0x8004,
        RomLinkedSample = 0x8008
    }

    public enum GeneratorEnum
    {
        StartAddressOffset = 0,
        EndAddressOffset = 1,
        StartLoopAddressOffset = 2,
        EndLoopAddressOffset = 3,
        StartAddressCoarseOffset = 4,
        ModulationLFOToPitch = 5,
        VibratoLFOToPitch = 6,
        ModulationEnvelopeToPitch = 7,
        InitialFilterCutoffFrequency = 8,
        InitialFilterQ = 9,
        ModulationLFOToFilterCutoffFrequency = 10,
        ModulationEnvelopeToFilterCutoffFrequency = 11,
        EndAddressCoarseOffset = 12,
        ModulationLFOToVolume = 13,
        Unused1 = 14,
        ChorusEffectsSend = 15,
        ReverbEffectsSend = 16,
        Pan = 17,
        Unused2 = 18,
        Unused3 = 19,
        Unused4 = 20,
        DelayModulationLFO = 21,
        FrequencyModulationLFO = 22,
        DelayVibratoLFO = 23,
        FrequencyVibratoLFO = 24,
        DelayModulationEnvelope = 25,
        AttackModulationEnvelope = 26,
        HoldModulationEnvelope = 27,
        DecayModulationEnvelope = 28,
        SustainModulationEnvelope = 29,
        ReleaseModulationEnvelope = 30,
        KeyNumberToModulationEnvelopeHold = 31,
        KeyNumberToModulationEnvelopeDecay = 32,
        DelayVolumeEnvelope = 33,
        AttackVolumeEnvelope = 34,
        HoldVolumeEnvelope = 35,
        DecayVolumeEnvelope = 36,
        SustainVolumeEnvelope = 37,
        ReleaseVolumeEnvelope = 38,
        KeyNumberToVolumeEnvelopeHold = 39,
        KeyNumberToVolumeEnvelopeDecay = 40,
        Instrument = 41,
        Reserved1 = 42,
        KeyRange = 43,
        VelocityRange = 44,
        StartLoopAddressCoarseOffset = 45,
        KeyNumber = 46,
        Velocity = 47,
        InitialAttenuation = 48,
        Reserved2 = 49,
        EndLoopAddressCoarseOffset = 50,
        CoarseTune = 51,
        FineTune = 52,
        SampleID = 53,
        SampleModes = 54,
        Reserved3 = 55,
        ScaleTuning = 56,
        ExclusiveClass = 57,
        OverridingRootKey = 58,
        Unused5 = 59,
        UnusedEnd = 60
    }

    public enum TransformEnum
    {
        Linear = 0,
        AbsoluteValue = 2
    }

    public enum ControllerSourceEnum
    {
        NoController = 0,
        NoteOnVelocity = 2,
        NoteOnKeyNumber = 3,
        PolyPressure = 10,
        ChannelPressure = 13,
        PitchWheel = 14,
        PitchWheelSensitivity = 16,
        Link = 127
    }

    public enum DirectionEnum
    {
        MinToMax = 0,
        MaxToMin = 1
    }

    public enum PolarityEnum
    {
        Unipolar = 0,
        Bipolar = 1
    }

    public enum SourceTypeEnum
    {
        Linear = 0,
        Concave = 1,
        Convex = 2,
        Switch = 3
    }
}
