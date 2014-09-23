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
using System.Runtime.CompilerServices;
using AlphaSynth.IO;
using AlphaSynth.Midi.Event;

namespace AlphaSynth.Midi
{
    public class MidiTrack
    {
        [IntrinsicProperty]
        public ByteArray Instruments { get; private set; }
        [IntrinsicProperty]
        public ByteArray DrumInstruments { get; private set; }
        [IntrinsicProperty]
        public ByteArray ActiveChannels { get; private set; }
        [IntrinsicProperty]
        public MidiEvent[] MidiEvents { get; private set; }

        [IntrinsicProperty]
        public int NoteOnCount { get; set; }
        [IntrinsicProperty]
        public int EndTime { get; set; }

        public MidiTrack(ByteArray instPrograms, ByteArray drumPrograms, ByteArray activeChannels, MidiEvent[] midiEvents)
        {
            Instruments = instPrograms;
            DrumInstruments = drumPrograms;
            ActiveChannels = activeChannels;
            MidiEvents = midiEvents;

            NoteOnCount = 0;
            EndTime = 0;
        }
    }
}
