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
package as.sequencer;

import as.ds.FixedArray.FixedArray;
import as.midi.event.MetaNumberEvent;
import as.midi.event.MidiEvent;
import as.midi.MidiFile;
import as.midi.MidiHelper;
import as.midi.MidiHelper.MetaEventTypeEnum;
import as.platform.Types.Float32;
import as.synthesis.Synthesizer;
import as.synthesis.SynthHelper;

// TODO: this sequencer really needs rework
class MidiFileSequencer
{
    private var _synthData:FixedArray<SynthEvent>;
    private var _finished:Array<Void->Void>;
    private var _blockList:FixedArray<Bool>;
    private var _playbackRate:Float32;
    private var _eventIndex:Int;
    
    public var synth:Synthesizer;
    public var isPlaying(default, null):Bool;
    public var isMidiLoaded(get, null):Bool;
    public var currentTempo(default, null):Int;
    public var currentTime(default, null):Int;
    public var endTime(default, null):Int;
    public var playSpeed(get, set):Float32;
    
    public function get_isMidiLoaded() : Bool
    {
        return _synthData != null;
    }
    
    public function get_playSpeed() : Float32
    {
        return _playbackRate;
    }
    
    public function set_playSpeed(value:Float32) : Float32
    {
        _playbackRate = SynthHelper.clampF(value, 0.125, 8.0);
        return _playbackRate;
    }
    
    public function new(synth:Synthesizer) 
    {
        this.synth = synth;
        _playbackRate = 1;
        isPlaying = false;
        _blockList = new FixedArray<Bool>(Synthesizer.DefaultChannelCount);
        _finished = new Array < Void->Void > (); 
        synth.addMidiMessageProcessed(midiEventProcessed);
    }
    
    public function addFinishedListener(listener:Void->Void )
    {
        _finished.push(listener);
    }
    
    private function fireFinished()
    {
        for (l in _finished) if (l != null) l();
    }
    
    public function loadMidi(midiFile:MidiFile) : Bool
    {
        if (isPlaying) return false;
        loadMidiFile(midiFile);
        return true;
    }
    
    public function unloadMidi() : Bool
    {
        if (isPlaying) return false;
        _synthData = null;
        return true;
    }
    
    public function play()
    {
        if (isPlaying || _synthData == null) return;
        isPlaying = true;
    }
    
    public function pause()
    {
        isPlaying = false;
    }
    
    public function stop()
    {
        isPlaying = false;
        currentTime = 0;
        _eventIndex = 0;
    }
    
    public function isChannelMuted(channel:Int)
    {
        return _blockList[channel];
    }
    
    public function muteAllChannels()
    {
        for (x in 0 ... _blockList.length) 
        {
            _blockList[x] = true;
        }
    }
    
    public function unMuteAllChannels()
    {
        for (x in 0 ... _blockList.length) 
        {
            _blockList[x] = false;
        }
    }
    
    public function setMute(channel:Int, muteValue:Bool)
    {
        _blockList[channel] = muteValue;
    }
    
    public function seek(seconds:Int) : Void
    {
        var targetSampleTime = Std.int(synth.sampleRate * seconds);
        if (targetSampleTime > currentTime)
        {
            silentProcess(targetSampleTime - currentTime);
        }
        else if(targetSampleTime < currentTime)
        {
            currentTime = 0;
            _eventIndex = 0;
            synth.noteOffAll(true);
            synth.resetPrograms();
            synth.resetSynthControls();
            silentProcess(targetSampleTime);
        }
    }
    
    public function fillMidiEventQueue()
    {
        if (!isPlaying || synth.midiEventQueue.length != 0)
            return;
        if (currentTime >= endTime)
        {
            currentTime = 0;
            _eventIndex = 0;
            isPlaying = false;
            synth.noteOffAll(true);
            synth.resetPrograms();
            synth.resetSynthControls();
            fireFinished();
            return;
        }
        
        var newMSize = Std.int(synth.microBufferSize * _playbackRate);
        var endSample = currentTime + (newMSize * synth.microBufferCount);
        for (x in 0 ... synth.microBufferCount)
        {
            currentTime += newMSize;
            while (_eventIndex < _synthData.length && _synthData[_eventIndex].delta < currentTime)
            {
                if (_synthData[_eventIndex].event.getCommand() != MidiEventTypeEnum.NoteOn || !_blockList[_synthData[_eventIndex].event.getChannel()])
                {
                    synth.midiEventQueue.addFirst(_synthData[_eventIndex]);
                    synth.midiEventCounts[x]++;                    
                }
                _eventIndex++;
            }
        }
    }
    
    public function loadMidiFile(midiFile:MidiFile)
    {
        var bpm = 120.0;
        if (midiFile.tracks.length > 1 || midiFile.tracks[0].endTime == 0)
            midiFile.combineTracks();
        _synthData = new FixedArray<SynthEvent>(midiFile.tracks[0].midiEvents.length);
        
        _eventIndex = 0;
        currentTime = 0;
        currentTempo = Std.int(bpm);
        var absDelta = 0.0;
        for (x in 0 ... midiFile.tracks[0].midiEvents.length)
        {
            var mEvent:MidiEvent = midiFile.tracks[0].midiEvents[x];
            _synthData[x] = new SynthEvent(mEvent);
            absDelta += synth.sampleRate * mEvent.deltaTime * (60.0 / (bpm * midiFile.division));
            _synthData[x].delta = Std.int(absDelta);
            if (isTempoMessage(mEvent.getCommand(), mEvent.getData1()))
            {
                var meta:MetaNumberEvent = cast mEvent;
                bpm = MidiHelper.MicroSecondsPerMinute / meta.value;
            }
        }
        endTime = _synthData[_synthData.length - 1].delta;
    }
    
    private function midiEventProcessed(midiEvent:MidiEvent)
    {
        if (isTempoMessage(midiEvent.getCommand(), midiEvent.getData1()))
        {
            var meta:MetaNumberEvent = cast midiEvent;
            currentTempo = Std.int(MidiHelper.MicroSecondsPerMinute / meta.value);
        }
    }
    
    private function isTempoMessage(command:Int, data1:Int)
    {
        return command == 0xFF && data1 == MetaEventTypeEnum.Tempo;
    }
    
    private function silentProcess(amount:Int) : Void
    {
        while (_eventIndex < _synthData.length && _synthData[_eventIndex].delta < (currentTime + amount))
        {
            if (_synthData[_eventIndex].event.getCommand() != MidiEventTypeEnum.NoteOn)
            {
                var m = _synthData[_eventIndex];
                synth.processMidiMessage(m.event);
            }
            _eventIndex++;
        }
        currentTime += amount;
    }
}