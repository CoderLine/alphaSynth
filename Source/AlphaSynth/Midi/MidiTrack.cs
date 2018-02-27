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
using System.Linq;
using AlphaSynth.Midi.Event;
using System.Collections.Generic;

namespace AlphaSynth.Midi
{
    public class MidiTrack
    {
        public byte[] Instruments { get; private set; }
        public byte[] DrumInstruments { get; private set; }
        public byte[] ActiveChannels { get; private set; }
        public MidiEvent[] MidiEvents { get; private set; }
        public string Name { get; private set; }
        public string InstrumentName { get; private set; }

        public int NoteOnCount { get; set; }
        public int EndTime { get; set; }

        public MidiTrack(byte[] instPrograms, byte[] drumPrograms, byte[] activeChannels, MidiEvent[] midiEvents)
        {
            Instruments = instPrograms ?? Enumerable.Empty<byte>().ToArray();
            DrumInstruments = drumPrograms ?? Enumerable.Empty<byte>().ToArray();
            ActiveChannels = activeChannels ?? Enumerable.Empty<byte>().ToArray();
            MidiEvents = midiEvents ?? Enumerable.Empty<MidiEvent>().ToArray();

            var textEvents = MidiEvents.Where(e => e is MetaTextEvent).Select(e => e as MetaTextEvent).ToArray();
            Name = ExtractText(textEvents, (int)MetaEventTypeEnum.SequenceOrTrackName);
            InstrumentName = ExtractText(textEvents, (int)MetaEventTypeEnum.InstrumentName);

            NoteOnCount = 0;
            EndTime = 0;
        }

        private static string ExtractText(IEnumerable<MetaTextEvent> textEvents, int eventType, string defValue = "undefined")
        {
            if (!textEvents.Any())
                return defValue;

            var result = string.Join(" ", textEvents.Where(e => e.MetaStatus == eventType).Select(e => e.Text)).Trim();
            return (string.IsNullOrWhiteSpace(result)) ? defValue : result;
        }
    }
}
