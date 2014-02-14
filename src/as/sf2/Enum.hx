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

class SFSampleLink
{
    public static inline var MonoSample = 1;
    public static inline var RightSample = 2;
    public static inline var LeftSample = 4;
    public static inline var LinkedSample = 8;
    public static inline var RomMonoSample = 0x8001;
    public static inline var RomRightSample = 0x8002;
    public static inline var RomLeftSample = 0x8004;
    public static inline var RomLinkedSample = 0x8008;
}

class GeneratorEnum
{
    public static inline var StartAddressOffset = 0;
    public static inline var EndAddressOffset = 1;
    public static inline var StartLoopAddressOffset = 2;
    public static inline var EndLoopAddressOffset = 3;
    public static inline var StartAddressCoarseOffset = 4;
    public static inline var ModulationLFOToPitch = 5;
    public static inline var VibratoLFOToPitch = 6;
    public static inline var ModulationEnvelopeToPitch = 7;
    public static inline var InitialFilterCutoffFrequency = 8;
    public static inline var InitialFilterQ = 9;
    public static inline var ModulationLFOToFilterCutoffFrequency = 10;
    public static inline var ModulationEnvelopeToFilterCutoffFrequency = 11;
    public static inline var EndAddressCoarseOffset = 12;
    public static inline var ModulationLFOToVolume = 13;
    public static inline var Unused1 = 14;
    public static inline var ChorusEffectsSend = 15;
    public static inline var ReverbEffectsSend = 16;
    public static inline var Pan = 17;
    public static inline var Unused2 = 18;
    public static inline var Unused3 = 19;
    public static inline var Unused4 = 20;
    public static inline var DelayModulationLFO = 21;
    public static inline var FrequencyModulationLFO = 22;
    public static inline var DelayVibratoLFO = 23;
    public static inline var FrequencyVibratoLFO = 24;
    public static inline var DelayModulationEnvelope = 25;
    public static inline var AttackModulationEnvelope = 26;
    public static inline var HoldModulationEnvelope = 27;
    public static inline var DecayModulationEnvelope = 28;
    public static inline var SustainModulationEnvelope = 29;
    public static inline var ReleaseModulationEnvelope = 30;
    public static inline var KeyNumberToModulationEnvelopeHold = 31;
    public static inline var KeyNumberToModulationEnvelopeDecay = 32;
    public static inline var DelayVolumeEnvelope = 33;
    public static inline var AttackVolumeEnvelope = 34;
    public static inline var HoldVolumeEnvelope = 35;
    public static inline var DecayVolumeEnvelope = 36;
    public static inline var SustainVolumeEnvelope = 37;
    public static inline var ReleaseVolumeEnvelope = 38;
    public static inline var KeyNumberToVolumeEnvelopeHold = 39;
    public static inline var KeyNumberToVolumeEnvelopeDecay = 40;
    public static inline var Instrument = 41;
    public static inline var Reserved1 = 42;
    public static inline var KeyRange = 43;
    public static inline var VelocityRange = 44;
    public static inline var StartLoopAddressCoarseOffset = 45;
    public static inline var KeyNumber = 46;
    public static inline var Velocity = 47;
    public static inline var InitialAttenuation = 48;
    public static inline var Reserved2 = 49;
    public static inline var EndLoopAddressCoarseOffset = 50;
    public static inline var CoarseTune = 51;
    public static inline var FineTune = 52;
    public static inline var SampleID = 53;
    public static inline var SampleModes = 54;
    public static inline var Reserved3 = 55;
    public static inline var ScaleTuning = 56;
    public static inline var ExclusiveClass = 57;
    public static inline var OverridingRootKey = 58;
    public static inline var Unused5 = 59;
    public static inline var UnusedEnd = 60;
}

class TransformEnum
{
    public static inline var Linear = 0;
    public static inline var AbsoluteValue = 2;
}

class ControllerSourceEnum
{
    public static inline var NoController = 0;
    public static inline var NoteOnVelocity = 2;
    public static inline var NoteOnKeyNumber = 3;
    public static inline var PolyPressure = 10;
    public static inline var ChannelPressure = 13;
    public static inline var PitchWheel = 14;
    public static inline var PitchWheelSensitivity = 16;
    public static inline var Link = 127;
}

class DirectionEnum
{
    public static inline var MinToMax = 0;
    public static inline var MaxToMin = 1;
}

class PolarityEnum
{
    public static inline var Unipolar = 0;
    public static inline var Bipolar = 1;
}

class SourceTypeEnum
{
    public static inline var Linear = 0;
    public static inline var Concave = 1;
    public static inline var Convex = 2;
    public static inline var Switch = 3; 
}