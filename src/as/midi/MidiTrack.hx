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

import as.ds.FixedArray.FixedArray;
import as.midi.event.MidiEvent;
import haxe.io.Bytes;
import haxe.Serializer;
import haxe.Unserializer;

class MidiTrack 
{
    public var instruments(default, null):Bytes;
    public var drumInstruments(default, null):Bytes;
    public var activeChannels(default, null):Bytes;
    public var midiEvents(default, null):FixedArray<MidiEvent>;
    
    public var noteOnCount:Int;
    public var endTime:Int;
    
    public function new(instPrograms:Bytes, drumPrograms:Bytes, activeChannels:Bytes, midiEvents:FixedArray<MidiEvent>) 
    {
        instruments = instPrograms;
        drumInstruments = drumPrograms;
        this.activeChannels = activeChannels;
        this.midiEvents = midiEvents;
        
        noteOnCount = 0;
        endTime = 0;
    }
}