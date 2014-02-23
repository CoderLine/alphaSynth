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
import as.midi.MidiHelper;
import as.midi.event.MetaDataEvent;
import as.midi.event.MetaEvent;
import as.midi.event.MetaNumberEvent;
import as.midi.event.MetaTextEvent;
import as.midi.event.MidiEvent;
import as.midi.event.RealTimeEvent;
import as.midi.event.SystemCommonEvent;
import as.midi.event.SystemExclusiveEvent;
import as.platform.Types.Byte;
import as.platform.Types.TypeUtils;
import as.util.IOHelper;
import haxe.io.Bytes;
import haxe.io.BytesInput;
import haxe.io.Error;
import haxe.io.Input;
import haxe.Serializer;
import haxe.Unserializer;

class MidiFile
{
    public var division(default, null):Int;
    public var trackFormat(default, null):Int;
    public var timingStandard(default, null):Int;
    public var tracks(default, null):FixedArray<MidiTrack>;
    
    public function new() 
    {
        division = 0;
        trackFormat = 0;
        timingStandard = 0;
    } 
    
    public function combineTracks() : Void
    {
        var finalTrack:MidiTrack = mergeTracks();
                
        var absEvents:FixedArray<FixedArray<MidiEvent>> = new FixedArray<FixedArray<MidiEvent>>(tracks.length);
        for (i in 0 ... tracks.length) 
        {
            absEvents[i] = new FixedArray<MidiEvent>(tracks[i].midiEvents.length);
            var totalDeltaTime = 0;
            for (j in 0 ... tracks[i].midiEvents.length) 
            {
                absEvents[i][j] = tracks[i].midiEvents[j];
                totalDeltaTime += absEvents[i][j].deltaTime;
                absEvents[i][j].deltaTime = totalDeltaTime;
            }
        }
        
        var eventCount:Int = 0;
        var delta:Int = 0;
        var nextdelta:Int = TypeUtils.IntMax;
        var counters:FixedArray<Int> = new FixedArray<Int>(absEvents.length);
        TypeUtils.clearIntArray(counters);
        while (eventCount < finalTrack.midiEvents.length)
        {
            for (x in 0 ... absEvents.length)
            {
                while (counters[x] < absEvents[x].length && absEvents[x][counters[x]].deltaTime == delta)
                {
                    finalTrack.midiEvents[eventCount] = absEvents[x][counters[x]];
                    eventCount++;
                    counters[x]++;
                }
                if (counters[x] < absEvents[x].length && absEvents[x][counters[x]].deltaTime < nextdelta)
                    nextdelta = absEvents[x][counters[x]].deltaTime;
            }
            delta = nextdelta;
            nextdelta = TypeUtils.IntMax;
        }
        finalTrack.endTime = finalTrack.midiEvents[finalTrack.midiEvents.length - 1].deltaTime;
        var deltaDiff:Int = 0;
        for (x in 0 ... finalTrack.midiEvents.length)
        {
            var oldTime:Int = finalTrack.midiEvents[x].deltaTime;
            finalTrack.midiEvents[x].deltaTime -= deltaDiff;
            deltaDiff = oldTime;
        }
        
        tracks = new FixedArray<MidiTrack>(1);
        tracks[0] = finalTrack;
        trackFormat = MidiTrackFormat.SingleTrack;        
    }
    
    public function mergeTracks() : MidiTrack
    {
        var eventCount:Int = 0; 
        var notesPlayed:Int = 0;
        var programsUsed:Array<Byte> = new Array<Byte>();
        var drumProgramsUsed:Array<Byte> = new Array<Byte>();
        var channelsUsed:Array<Byte> = new Array<Byte>();
        for (x in 0 ... tracks.length)
        {
            eventCount += tracks[x].midiEvents.length;
            notesPlayed += tracks[x].noteOnCount;
            
            for (i in 0 ... tracks[x].instruments.length)
            {
                var p:Byte = tracks[x].instruments.get(i);
                if (!Lambda.has(programsUsed, p))
                    programsUsed.push(p);
            }
            for (i in 0 ... tracks[x].drumInstruments.length)
            {
                var p:Byte = tracks[x].drumInstruments.get(i);
                if (!Lambda.has(drumProgramsUsed, p))
                    drumProgramsUsed.push(p);
            }            
            
            for (i in 0 ... tracks[x].activeChannels.length)
            {
                var p:Byte = tracks[x].activeChannels.get(i);
                if (!Lambda.has(channelsUsed, p))
                    channelsUsed.push(p);
            }
        }
        
        var track:MidiTrack = new MidiTrack(TypeUtils.byteArrayFromArray(programsUsed),
                                            TypeUtils.byteArrayFromArray(drumProgramsUsed),
                                            TypeUtils.byteArrayFromArray(channelsUsed),
                                            new FixedArray<MidiEvent>(eventCount));
        track.noteOnCount = notesPlayed;
        return track;            
    }
    
    public function load(input:BytesInput) : Void
    {
        input.bigEndian = true;
        if (!findHead(input, 500))
            throw Error.Custom("Invalid midi file : MThd chunk could not be found.");
        readHeader(input);
        for (x in 0 ... tracks.length)
        {
            tracks[x] = readTrack(input);
        }
    }
    
    private function findHead(input:BytesInput, attempts:Int) : Bool
    {
        var match:Int = 0;
        while (attempts > 0)
        {
            switch(String.fromCharCode(input.readByte()))
            {
                case 'M':
                    match = 1;
                case 'T':
                    match = match == 1 ? 2 : 0;
                case 'h':
                    match = match == 2 ? 3 : 0;
                case 'd':
                    if (match == 3) return true;
                    match = 0;
            }
            attempts--;
        }
        return false;
    }
    
    private function readHeader(input:BytesInput)
    {
        if (input.readInt32() != 6)
            throw Error.Custom("Midi header is invalid.");
        trackFormat = input.readInt16();
        tracks = new FixedArray<MidiTrack>(input.readInt16());
        var div:Int = input.readInt16();
        division = div & 0x7FFF;
        timingStandard = ((div & 0x8000) > 0) ? MidiTimeFormat.FramesPerSecond : MidiTimeFormat.TicksPerBeat;
    }
    
    private function readTrack(input:BytesInput)
    {
        var instList:Array<Byte> = new Array<Byte>();
        var drumList:Array<Byte> = new Array<Byte>();
        var channelList:Array<Byte> = new Array<Byte>();
        var eventList:Array<MidiEvent> = new Array<MidiEvent>();
        var noteOnCount:Int = 0;
        var totalTime = 0;
        while (IOHelper.read8BitChars(input, 4) != "MTrk")
        {
            var length:Int = input.readInt32();
            while (length > 0)
            {
                length--;
                input.readByte();
            }
        }
        
        var endPosition:Int = input.readInt32() + input.position;
        var prevStatus:Byte = 0;
        while (input.position < endPosition)
        {
            var delta:Int = readVariableLength(input);
            totalTime += delta;
            var status:Byte = input.readByte();
            if (status >= 0x80 && status <= 0xEF)
            {
                prevStatus = status;
                eventList.push(readVoiceMessage(input, delta, status, input.readByte()));
                noteOnCount = trackVoiceStats(eventList[eventList.length -1], instList, drumList, channelList, noteOnCount);
            }
            else if (status >= 0xF0 && status <= 0xF7)
            {
                prevStatus = 0;
                eventList.push(readSystemCommonMessage(input, delta, status));
            }
            else if (status >= 0xF8 && status <= 0xFF)
            {
                eventList.push(readRealTimeMessage(input, delta, status));
            }
            else 
            {
                if (prevStatus == 0)
                {
                    while ((status & 0x80) != 0x80)
                    {
                        status = input.readByte();
                    }
                    if (status >= 0x80 && status <= 0xEF)
                    {
                        prevStatus = status;
                        eventList.push(readVoiceMessage(input, delta, status, input.readByte()));
                        noteOnCount = trackVoiceStats(eventList[eventList.length -1], instList, drumList, channelList, noteOnCount);
                    }
                    else if (status >= 0xF0 && status <= 0xF7)
                    {
                        eventList.push(readSystemCommonMessage(input, delta, status));
                    }
                    else if (status >= 0xF8 && status <= 0xFF)
                    {
                        eventList.push(readRealTimeMessage(input, delta, status));
                    }
                }
                else
                {
                    eventList.push(readVoiceMessage(input, delta, prevStatus, status));
                    noteOnCount = trackVoiceStats(eventList[eventList.length -1], instList, drumList, channelList, noteOnCount);
                }
            }
        }
        
        if (input.position != endPosition)
            throw Error.Custom("The track length was invalid for the current MTrk chunk.");
        if (Lambda.has(channelList, MidiHelper.DrumChannel))
        {
            if (!Lambda.has(drumList, 0))
                drumList.push(0);
        }
        else
        {
            if (!Lambda.has(instList, 0))
                instList.push(0);
        }
        var track:MidiTrack = new MidiTrack(TypeUtils.byteArrayFromArray(instList),
                                            TypeUtils.byteArrayFromArray(drumList),
                                            TypeUtils.byteArrayFromArray(channelList),
                                            FixedArray.fromArrayCopy(eventList));
        track.noteOnCount = noteOnCount;
        track.endTime = totalTime;
        return track;
    }
    
    private static function readMetaMessage(input:Input, delta:Int, status:Byte) : MidiEvent
    {
        var metaStatus:Byte = input.readByte();
        switch(metaStatus)
        {
            case MetaEventTypeEnum.SequenceNumber:
                {
                    var count:Int = input.readByte();
                    if (count == 0)
                        return new MetaNumberEvent(delta, status, metaStatus, -1);
                    else if (count == 2)
                    {
                        return new MetaNumberEvent(delta, status, metaStatus, input.readInt16());
                    }
                    else
                        throw Error.Custom("Invalid sequence number event.");
                }
            case MetaEventTypeEnum.TextEvent:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.CopyrightNotice:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.SequenceOrTrackName:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.InstrumentName:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.LyricText:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.MarkerText:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.CuePoint:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.PatchName:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.PortName:
                return new MetaTextEvent(delta, status, metaStatus, readString(input));
            case MetaEventTypeEnum.MidiChannel:
                if (input.readByte() != 1)
                    throw Error.Custom("Invalid midi channel event. Expected size of 1.");
                return new MetaEvent(delta, status, metaStatus, input.readByte());
            case MetaEventTypeEnum.MidiPort:
                if (input.readByte() != 1)
                    throw Error.Custom("Invalid midi port event. Expected size of 1.");
                return new MetaEvent(delta, status, metaStatus, input.readByte());
            case MetaEventTypeEnum.EndOfTrack:
                return new MetaEvent(delta, status, metaStatus, input.readByte());
            case MetaEventTypeEnum.Tempo:
                if (input.readByte() != 3)
                    throw Error.Custom("Invalid tempo event. Expected size of 3.");
                return new MetaNumberEvent(delta, status, metaStatus, (input.readByte() << 16) | (input.readByte() << 8) | input.readByte());
            case MetaEventTypeEnum.SmpteOffset:
                if (input.readByte() != 5)
                    throw Error.Custom("Invalid smpte event. Expected size of 5.");
                return new MetaTextEvent(delta, status, metaStatus, input.readByte() + ":" + input.readByte() + ":" + input.readByte() + ":" + input.readByte() + ":" + input.readByte());
            case MetaEventTypeEnum.TimeSignature:
                if (input.readByte() != 4)
                    throw Error.Custom("Invalid time signature event. Expected size of 4.");
                return new MetaTextEvent(delta, status, metaStatus, input.readByte() + ":" + input.readByte() + ":" + input.readByte() + ":" + input.readByte());
            case MetaEventTypeEnum.KeySignature:
                if (input.readByte() != 2)
                    throw Error.Custom("Invalid key signature event. Expected size of 2.");
                return new MetaTextEvent(delta, status, metaStatus, input.readByte() + ":" + input.readByte());
            case MetaEventTypeEnum.SequencerSpecific:
                var length = readVariableLength(input);
                var data = input.read(length);
                return new MetaDataEvent(delta, status, metaStatus, data);
        }
        throw Error.Custom("Not a valid meta message Status: " + status + " Meta: " + metaStatus);
    }
    
    private static function readRealTimeMessage(input:Input, delta:Int, status:Byte) : MidiEvent
    {
        switch (status)
        {
            case SystemRealtimeTypeEnum.MidiClock:
                return new RealTimeEvent(delta, status, 0, 0);
            case SystemRealtimeTypeEnum.MidiTick:
                return new RealTimeEvent(delta, status, 0, 0);
            case SystemRealtimeTypeEnum.MidiStart:
                return new RealTimeEvent(delta, status, 0, 0);
            case SystemRealtimeTypeEnum.MidiContinue:
                return new RealTimeEvent(delta, status, 0, 0);
            case SystemRealtimeTypeEnum.MidiStop:
                return new RealTimeEvent(delta, status, 0, 0);
            case SystemRealtimeTypeEnum.ActiveSense:
                return new RealTimeEvent(delta, status, 0, 0);
            case SystemRealtimeTypeEnum.Reset:
                return readMetaMessage(input, delta, status);
            default:
                throw Error.Custom("The real time message was invalid or unsupported : " + status);
        }
    }    
    
    private static function readSystemCommonMessage(input:Input, delta:Int, status:Byte) : MidiEvent
    {
        switch (status)
        {
            case SystemCommonTypeEnum.SystemExclusive2, 
                SystemCommonTypeEnum.SystemExclusive:
                {
                    var maker = input.readInt16();
                    if (maker == 0x0)
                    {
                        maker = input.readInt16();
                    }
                    else if (maker == 0xF7)
                        return null;
                    var data:Array<Byte> = new Array<Byte>();
                    var b = input.readByte();
                    while (b != 0xF7)
                    {
                        data.push(b);
                        b = input.readByte();
                    }
                    return new SystemExclusiveEvent(delta, status, cast maker, TypeUtils.byteArrayFromArray(data));
                }
            case SystemCommonTypeEnum.MtcQuarterFrame:
                return new SystemCommonEvent(delta, status, input.readByte(), 0);
            case SystemCommonTypeEnum.SongPosition:
                return new SystemCommonEvent(delta, status, input.readByte(), input.readByte());
            case SystemCommonTypeEnum.SongSelect:
                return new SystemCommonEvent(delta, status, input.readByte(), 0);
            case SystemCommonTypeEnum.TuneRequest:
                return new SystemCommonEvent(delta, status, 0, 0);
            default:
                throw Error.Custom("The system common message was invalid or unsupported : " + status);
        }    
    }
    
    private static function readVoiceMessage(input:Input, delta:Int, status:Byte, data1:Byte) : MidiEvent
    {
        switch (status & 0xF0)
        {
            case MidiEventTypeEnum.NoteOff: 
                return new MidiEvent(delta, status, data1, input.readByte());
            case MidiEventTypeEnum.NoteOn: 
                var velocity:Byte = input.readByte();
                if (velocity == 0) 
                    status = ((status & 0x0F) | 0x80);
                return new MidiEvent(delta, status, data1, velocity);
            case MidiEventTypeEnum.NoteAftertouch:
                return new MidiEvent(delta, status, data1, input.readByte());
            case MidiEventTypeEnum.Controller: 
                return new MidiEvent(delta, status, data1, input.readByte());
            case MidiEventTypeEnum.ProgramChange:
                return new MidiEvent(delta, status, data1, 0);
            case MidiEventTypeEnum.ChannelAftertouch:
                return new MidiEvent(delta, status, data1, 0);
            case MidiEventTypeEnum.PitchBend:
                return new MidiEvent(delta, status, data1, input.readByte());
            default:
                throw Error.Custom("The status provided was not that of a voice message.");
        }    
    }
    
    private static function trackVoiceStats(midiEvent:MidiEvent, instList:Array<Byte>, drumList:Array<Byte>, channelList:Array<Byte>, noteOnCount:Int)
    {
        if (midiEvent.getCommand() == MidiEventTypeEnum.NoteOn)
        {
            var chan:Int = midiEvent.getChannel();
            if (!Lambda.has(channelList, chan))
                channelList.push(chan);
            noteOnCount++;
        }
        else if (midiEvent.getCommand() == MidiEventTypeEnum.ProgramChange)
        {
            var chan:Int = midiEvent.getChannel();
            var prog:Byte = midiEvent.getData1();
            if (chan == MidiHelper.DrumChannel)
            {
                if (!Lambda.has(drumList, prog))
                    drumList.push(prog);
            }
            else
            {
                if (!Lambda.has(instList, prog))
                    instList.push(prog);
            }
        }
        return noteOnCount;
    }
    
    private static function readVariableLength(input:Input) : Int
    {
        var value:Int = 0;
        var next:Int;
        do 
        {
            next = input.readByte();
            value = value << 7;
            value = value | (next & 0x7F);
        } while ((next & 0x80) == 0x80);
        return value;
    }
    
    private static function readString(input:Input) : String
    {
        var length:Int = readVariableLength(input);
        return input.readString(length); // TODO: check for correct string encoding
    }
}


class MidiTrackFormat
{
    public static inline var SingleTrack = 0;
    public static inline var MultiTrack = 1;
    public static inline var MultiSong = 2;
}

class MidiTimeFormat
{
    public static inline var TicksPerBeat = 0;
    public static inline var FramesPerSecond = 1;
}