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
package as.midi;

import as.platform.Types.Byte;

class MidiEventTypeEnum
{
    public static inline var NoteOff = 0x80;
    public static inline var NoteOn = 0x90;
    public static inline var NoteAftertouch = 0xA0;
    public static inline var Controller = 0xB0;
    public static inline var ProgramChange = 0xC0;
    public static inline var ChannelAftertouch = 0xD0;
    public static inline var PitchBend = 0xE0;
}

class MetaEventTypeEnum
{
    public static inline var SequenceNumber = 0x00;
    public static inline var TextEvent = 0x01;
    public static inline var CopyrightNotice = 0x02;
    public static inline var SequenceOrTrackName = 0x03;
    public static inline var InstrumentName = 0x04;
    public static inline var LyricText = 0x05;
    public static inline var MarkerText = 0x06;
    public static inline var CuePoint = 0x07;
    public static inline var PatchName= 0x08;
    public static inline var PortName = 0x09;
    public static inline var MidiChannel = 0x20;
    public static inline var MidiPort = 0x21;
    public static inline var EndOfTrack = 0x2F;
    public static inline var Tempo = 0x51;
    public static inline var SmpteOffset = 0x54;
    public static inline var TimeSignature = 0x58;
    public static inline var KeySignature = 0x59;
    public static inline var SequencerSpecific = 0x7F;
}

class SystemCommonTypeEnum
{
    public static inline var SystemExclusive = 0xF0;
    public static inline var MtcQuarterFrame = 0xF1;
    public static inline var SongPosition = 0xF2;
    public static inline var SongSelect = 0xF3;
    public static inline var TuneRequest = 0xF6;
    public static inline var SystemExclusive2 = 0xF7;
}

class SystemRealtimeTypeEnum
{
    public static inline var MidiClock = 0xF8;
    public static inline var MidiTick = 0xF9;
    public static inline var MidiStart = 0xFA;
    public static inline var MidiContinue = 0xFC;
    public static inline var MidiStop = 0xFD;
    public static inline var ActiveSense = 0xFE;
    public static inline var Reset = 0xFF;
}

class ControllerTypeEnum
{
    public static inline var BankSelectCoarse = 0x00;
    public static inline var ModulationCoarse = 0x01;
    public static inline var BreathControllerCoarse = 0x02;
    public static inline var FootControllerCoarse = 0x04;
    public static inline var PortamentoTimeCoarse = 0x05;
    public static inline var DataEntryCoarse = 0x06;
    public static inline var VolumeCoarse = 0x07;
    public static inline var BalanceCoarse = 0x08;
    public static inline var PanCoarse = 0x0A;
    public static inline var ExpressionControllerCoarse = 0x0B;
    public static inline var EffectControl1Coarse = 0x0C;
    public static inline var EffectControl2Coarse = 0x0D;
    public static inline var GeneralPurposeSlider1 = 0x10;
    public static inline var GeneralPurposeSlider2 = 0x11;
    public static inline var GeneralPurposeSlider3 = 0x12;
    public static inline var GeneralPurposeSlider4 = 0x13;
    public static inline var BankSelectFine = 0x20;
    public static inline var ModulationFine = 0x21;
    public static inline var BreathControllerFine = 0x22;
    public static inline var FootControllerFine = 0x24;
    public static inline var PortamentoTimeFine = 0x25;
    public static inline var DataEntryFine = 0x26;
    public static inline var VolumeFine = 0x27;
    public static inline var BalanceFine = 0x28;
    public static inline var PanFine = 0x2A;
    public static inline var ExpressionControllerFine = 0x2B;
    public static inline var EffectControl1Fine = 0x2C;
    public static inline var EffectControl2Fine = 0x2D;
    public static inline var HoldPedal = 0x40;
    public static inline var Portamento = 0x41;
    public static inline var SostenutoPedal = 0x42;
    public static inline var SoftPedal = 0x43;
    public static inline var LegatoPedal = 0x44;
    public static inline var Hold2Pedal = 0x45;
    public static inline var SoundVariation = 0x46;
    public static inline var SoundTimbre = 0x47;
    public static inline var SoundReleaseTime = 0x48;
    public static inline var SoundAttackTime = 0x49;
    public static inline var SoundBrightness = 0x4A;
    public static inline var SoundControl6 = 0x4B;
    public static inline var SoundControl7 = 0x4C;
    public static inline var SoundControl8 = 0x4D;
    public static inline var SoundControl9 = 0x4E;
    public static inline var SoundControl10 = 0x4F;
    public static inline var GeneralPurposeButton1 = 0x50;
    public static inline var GeneralPurposeButton2 = 0x51;
    public static inline var GeneralPurposeButton3 = 0x52;
    public static inline var GeneralPurposeButton4 = 0x53;
    public static inline var EffectsLevel = 0x5B;
    public static inline var TremuloLevel = 0x5C;
    public static inline var ChorusLevel = 0x5D;
    public static inline var CelesteLevel = 0x5E;
    public static inline var PhaseLevel = 0x5F;
    public static inline var DataButtonIncrement = 0x60;
    public static inline var DataButtonDecrement = 0x61;
    public static inline var NonRegisteredParameterFine = 0x62;
    public static inline var NonRegisteredParameterCourse = 0x63;
    public static inline var RegisteredParameterFine = 0x64;
    public static inline var RegisteredParameterCourse = 0x65;
    public static inline var AllSoundOff = 0x78;
    public static inline var ResetControllers = 0x79;
    public static inline var LocalKeyboard = 0x7A;
    public static inline var AllNotesOff = 0x7B;
    public static inline var OmniModeOff = 0x7C;
    public static inline var OmniModeOn = 0x7D;
    public static inline var MonoMode = 0x7E;
    public static inline var PolyMode = 0x7F;
}

class MidiHelper
{
    public static inline var MicroSecondsPerMinute = 60000000; 
    public static inline var MinChannel = 0;
    public static inline var MaxChannel = 15;
    public static inline var DrumChannel:Byte = 9;
}