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
package as.synthesis;

import as.bank.components.Enum.InterpolationEnum;
import as.bank.patch.MultiPatch;
import as.bank.patch.Patch;
import as.bank.PatchBank;
import as.ds.FixedArray.FixedArray;
import as.ds.LinkedList.LinkedList;
import as.midi.event.MidiEvent;
import as.platform.Types.Float32;
import as.platform.Types.TypeUtils;
import as.synthesis.SynthHelper;
import as.midi.MidiHelper;
import as.platform.Types.Short;
import as.util.SynthConstants;
import haxe.io.Bytes;
import haxe.io.Path;

class SynthEvent
{
    public var event:MidiEvent;
    public var delta:Int;
    
    public function new(event:MidiEvent)
    {
        this.event = event;
    }
}

class Synthesizer
{
    private var _voiceManager:VoiceManager;
    private var _masterVolume:Float32;
    private var _synthGain:Float32;
    private var _midiMessageProcessed:Array < MidiEvent->Void > ;
    
    private var _bankSelect:FixedArray<Int>;
    private var _channelPressure:FixedArray<Float32>;
    private var _pan:FixedArray<Short>;
    private var _volume:FixedArray<Short>;
    private var _expression:FixedArray<Short>;
    private var _modRange:FixedArray<Short>;
    private var _pitchBend:FixedArray<Short>;
    private var _pitchBendRange:FixedArray<Short>;
    private var _masterCoarseTune:FixedArray<Short>;
    private var _masterFineTune:FixedArray<Short>;
    private var _holdPedal:FixedArray<Bool>;
    private var _rpn:FixedArray<Short>;
    
    public var sampleBuffer:FixedArray<Float32>;
    
    public var littleEndian:Bool;
    public var modWheel:FixedArray<Float32>;
    public var panPositions:FixedArray<PanComponent>;
    public var totalPitch:FixedArray<Int>;
    public var totalVolume:FixedArray<Float32>;
    
    public var programs:FixedArray<Int>;
    
    public var activeVoices(get, never):Int;
    private function get_activeVoices() { return _voiceManager.activeVoices.length; }
    
    public var freeVoices(get, never):Int;
    private function get_freeVoices() { return _voiceManager.freeVoices.length; }
    
    public var microBufferSize(default,null):Int;
    public var microBufferCount(default,null):Int;
    
    public var rawBufferSize(get, never):Int;
    private function get_rawBufferSize() { return sampleBuffer.length * 2; }
    
    public var workingBufferSize(get, never):Int;
    private function get_workingBufferSize() { return sampleBuffer.length; }
    
    public var polyphony(get, never):Int;
    private function get_polyphony() { return _voiceManager.polyphony; }
    
    public var masterVolume(get, set):Float;
    private function get_masterVolume() { return _masterVolume; }
    private function set_masterVolume(v:Float) { _masterVolume = SynthHelper.clampF(v, 0, 3); return _masterVolume; }
    
    public var mixGain(get, set):Float;
    private function get_mixGain() { return _synthGain; }
    private function set_mixGain(v:Float) { _synthGain = SynthHelper.clampF(v, 0.5, 1); return _synthGain; }
    
    public var sampleRate(default,null):Int;
    public var audioChannels(default,null):Int;
    public var soundBank(default, null):PatchBank;
    
    public var midiEventQueue(default, null):LinkedList<SynthEvent>;
    public var midiEventCounts(default, null):FixedArray<Int>;
    
    public function new(sampleRate:Int, audioChannels:Int, bufferSize:Int, bufferCount:Int, polyphony:Int)
    {
        var MinSampleRate = 8000;
        var MaxSampleRate = 96000;
        
        if (sampleRate < MinSampleRate || sampleRate > MaxSampleRate)
            throw ("Invalid paramater: (sampleRate) Valid ranges are " + MinSampleRate + " to " + MaxSampleRate);
        if (audioChannels < 1 || audioChannels > 2)
            throw ("Invalid paramater: (audioChannels) Valid ranges are " + 1 + " to " + 2);
        
        _midiMessageProcessed = new Array < MidiEvent->Void >();
        //
        // Setup synth parameters
        _masterVolume = 1;
        _synthGain = 0.35;
        
        this.sampleRate = sampleRate;
        this.audioChannels = audioChannels;
        this.microBufferSize = SynthHelper.clampI(bufferSize, Std.int(SynthConstants.MinBufferSize * sampleRate), Std.int(SynthConstants.MaxBufferSize * sampleRate));
        this.microBufferSize = Std.int(Math.ceil(this.microBufferSize /  SynthConstants.DefaultBlockSize) * SynthConstants.DefaultBlockSize); //ensure multiple of block size
        this.microBufferCount = Std.int(Math.max(1, bufferCount));
        sampleBuffer = new FixedArray<Float32>((microBufferSize * microBufferCount * audioChannels));
        TypeUtils.clearFloat32Array(sampleBuffer);
        littleEndian = true;
        
        //
        // Setup controllers
        _bankSelect = new FixedArray<Int>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearIntArray(_bankSelect);
        programs = new FixedArray<Int>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearIntArray(programs);
        _channelPressure = new FixedArray<Float32>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearFloat32Array(_channelPressure);
        _pan = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_pan);
        _volume = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_volume);
        _expression = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_expression);
        _modRange = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_modRange);
        _pitchBend = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_pitchBend);
        _pitchBendRange = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_pitchBendRange);
        _masterCoarseTune = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_masterCoarseTune);
        _masterFineTune = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_masterFineTune);
        _holdPedal = new FixedArray<Bool>(SynthConstants.DefaultChannelCount);
        _rpn = new FixedArray<Short>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearShortArray(_rpn);
        modWheel = new FixedArray<Float32>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearFloat32Array(modWheel);
        panPositions = new FixedArray<PanComponent>(SynthConstants.DefaultChannelCount);
        totalPitch = new FixedArray<Int>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearIntArray(totalPitch);
        totalVolume = new FixedArray<Float32>(SynthConstants.DefaultChannelCount);
        TypeUtils.clearFloat32Array(totalVolume);
        
        for (i in 0 ... SynthConstants.DefaultChannelCount)
        {
            panPositions[i] = new PanComponent();
        }
        
        // 
        //set controls to default values
        resetSynthControls();
        //create synth voices
        _voiceManager = new VoiceManager(SynthHelper.clampI(polyphony, SynthConstants.MinPolyphony, SynthConstants.MaxPolyphony), this);
        //create midi containers
        midiEventQueue = new LinkedList<SynthEvent>();
        midiEventCounts = new FixedArray<Int>(microBufferCount);
        TypeUtils.clearIntArray(midiEventCounts);
    }
    
    public function loadBank(bank:PatchBank)
    {
        unloadBank();
        soundBank = bank;
    }
    
    public function unloadBank()
    {
        if (soundBank != null)
        {
            noteOffAll(true);
            _voiceManager.unloadPatches();
            soundBank = null;
        }
    }
    
    public function stop()
    {
        resetSynthControls();
        resetPrograms();
        noteOffAll(true);
    }
    
    public function resetSynthControls()
    {
        for (x in 0 ... SynthConstants.DefaultChannelCount)
        {
            _bankSelect[x] = 0;
            _channelPressure[x] = 1.0; 
            _pan[x] = cast 0x2000;
            _volume[x] = cast (90 << 7); 
            _expression[x] = cast (100 << 7);
            _pitchBend[x] = cast 0x2000;
            _modRange[x] = cast 0;
            modWheel[x] = 0;
            _pitchBendRange[x] = cast (2 << 7);
            _masterCoarseTune[x] = cast 0;
            _masterFineTune[x] = cast 0x2000; 
            _holdPedal[x] = false;
            _rpn[x] = cast -1; 
            updateTotalPitch(x);
            updateTotalVolume(x);
            updatePan(x);
        }
        _bankSelect[MidiHelper.DrumChannel] = PatchBank.DrumBank;
    }
    
    public function resetPrograms()
    {
        TypeUtils.clearIntArray(programs);
    }
    
    public function getProgramName(channel:Int) : String
    {
        var p = getProgram(channel);
        if (p == null) return "null";
        return p.name;
    }
    
    public function getProgram(channel:Int) : Patch
    {
        if (soundBank != null)
        {
            var inst = soundBank.getPatchByNumber(channel == MidiHelper.DrumChannel ? PatchBank.DrumBank : _bankSelect[channel], programs[channel]);
            if (inst != null)
                return inst;
        }
        return null;
    }
    
    public function setAudioChannelCount(channels:Int)
    {
        channels = SynthHelper.clampI(channels, 1, 2);
        if (audioChannels != channels)
        {
            audioChannels = channels;
            sampleBuffer = new FixedArray<Float32>((microBufferSize * microBufferCount * audioChannels));
            TypeUtils.clearFloat32Array(sampleBuffer);
        }
    }
    
    public function synthesize()
    {
        TypeUtils.clearFloat32Array(sampleBuffer);
        fillWorkingBuffer();
    }
    
    public function getNext(buffer:Bytes)
    {
        synthesize();
        convertWorkingBuffer(buffer, sampleBuffer);
    }

    public function getChannelVolume(channel:Int) : Float { return _volume[channel] / 16383.0; }
    public function getChannelExpression(channel:Int) : Float { return _expression[channel] / 16383.0; }
    public function getChannelPan(channel:Int) : Float { return (_pan[channel] - 8192.0) / 8192.0; }
    public function getChannelPitchBend(channel:Int) : Float { return (_pitchBend[channel] - 8192.0) / 8192.0; }
    public function getChannelHoldPedalStatus(channel:Int) : Bool { return _holdPedal[channel]; }

    private function fillWorkingBuffer()
    {
        var sampleIndex = 0;
        for (x in 0 ... microBufferCount)
        {
            if (midiEventQueue.length > 0)
            {
                for (i in 0 ... midiEventCounts[x])
                {
                    var m:SynthEvent = midiEventQueue.removeLast();
                    processMidiMessage(m.event);
                }
            }
            //voice processing loop
            var node = _voiceManager.activeVoices.first; //node used to traverse the active voices
            while (node != null)
            {
                node.value.process(sampleIndex, sampleIndex + microBufferSize * audioChannels);
                //if an active voice has stopped remove it from the list
                if (node.value.voiceParams.state == VoiceStateEnum.Stopped)
                {
                    var delnode = node; //node used to remove inactive voices
                    node = node.next;
                    _voiceManager.removeVoiceFromRegistry(delnode.value);
                    _voiceManager.activeVoices.remove(delnode);
                    _voiceManager.freeVoices.addFirst(delnode.value);
                }
                else
                {
                    node = node.next;
                }
            }
            sampleIndex += microBufferSize * audioChannels;
        }
        TypeUtils.clearIntArray(midiEventCounts);
    }
    
    private function convertWorkingBuffer(to:Bytes, from:FixedArray<Float32>)
    {
        var i:Int = 0;
        if (littleEndian)
        {
            for (x in 0 ... from.length)
            {
                var s:Short = cast Std.int((SynthHelper.clampF(from[x] * _masterVolume, -1.0, 1.0) * 32767));
                to.set(i, s & 0xFF);
                to.set(i + 1, (s >> 8) & 0xFF);
                i += 2;
            }
        }
        else
        {
            for (x in 0 ... from.length)
            {
                var s:Short = cast Std.int((SynthHelper.clampF(from[x] * _masterVolume, -1.0, 1.0) * 32767));
                to.set(i, (s >> 8) & 0xFF);
                to.set(i + 1, s & 0xFF);
                i += 2;
            }
        }
    }

    private function updateTotalPitch(channel:Int)
    {
        var cents = ((_pitchBend[channel] - 8192.0) / 8192.0) * (100 * (_pitchBendRange[channel] >> 7) + (_pitchBendRange[channel] & 0x7F));
        cents += 100.0 * (_masterCoarseTune[channel] + (_masterFineTune[channel] - 8192.0) / 8192.0);
        totalPitch[channel] = Std.int(cents);
    }
    private function updateTotalVolume(channel:Int)
    {
        totalVolume[channel] = _channelPressure[channel] * (_volume[channel] / 16383.0) * (_expression[channel] / 16383.0);
    }
    private function updatePan(channel:Int)
    {
        var value = SynthConstants.HalfPi * (_pan[channel] / 16383.0);
        panPositions[channel].left = Math.cos(value);
        panPositions[channel].right = Math.sin(value);
    }
    
    // 
    // Midi Handling
    public function noteOn(channel:Int, note:Int, velocity:Int)
    {
        // Get the correct instrument depending if it is a drum or not
        var inst:Patch = soundBank.getPatchByNumber(_bankSelect[channel], programs[channel]);
        if (inst == null)
            return;
        // A NoteOn can trigger multiple voices via layers
        var layers:Array<Patch> = new Array<Patch>();
        if (Std.is(inst, MultiPatch))
        {
            var multi:MultiPatch = cast inst;
            multi.findPatches(channel, note, velocity, layers);
            if (layers.length == 0) 
                return;
        }
        else
            layers.push(inst);
        // If a key with the same note value exists, stop it
        if (_voiceManager.registry[channel][note] != null)
        {
            var node = _voiceManager.registry[channel][note];
            while (node != null)
            {
                node.value.stop();
                node = node.next;
            }
            _voiceManager.removeFromRegistry(channel, note);
        }
        // Check exclusive groups
        for (x in 0 ... layers.length)
        {
            var notseen = true;
            var i = x - 1;
            while (i >= 0)
            {
                if (layers[x].exclusiveGroupTarget == layers[i].exclusiveGroupTarget)
                {
                    notseen = false;
                    break;
                }
                i--;
            }
            if (layers[x].exclusiveGroupTarget != 0 && notseen)
            {
                var node = _voiceManager.activeVoices.first;
                while (node != null)
                {
                    if (layers[x].exclusiveGroupTarget == node.value.patch.exclusiveGroup)
                    {
                        node.value.stop();
                        _voiceManager.removeVoiceFromRegistry(node.value);
                    }
                    node = node.next;
                }
            }
        }
        // Assign a voice to each layer
        for (x in 0 ... layers.length)
        {
            var voice = _voiceManager.getFreeVoice();
            voice.configure(channel, note, velocity, layers[x]);
            _voiceManager.addToRegistry(voice);
            _voiceManager.activeVoices.addLast(voice);
            voice.start();
        }        
    }
    
    public function noteOff(channel:Int, note:Int)
    {
        if (_holdPedal[channel])
        {
            var node = _voiceManager.registry[channel][note];
            while (node != null)
            {
                node.value.voiceParams.noteOffPending = true;
                node = node.next;
            }
        }
        else
        {
            var node = _voiceManager.registry[channel][note];
            while (node != null)
            {
                node.value.stop();
                node = node.next;
            }
            _voiceManager.removeFromRegistry(channel, note);
        }
    }
    
    public function noteOffAll(immediate:Bool)
    {
        var node = _voiceManager.activeVoices.first;
        if (immediate)
        {//if immediate ignore hold pedals and clear the entire registry
            _voiceManager.clearRegistry();
            while (node != null)
            {
                node.value.stopImmediately();
                var delnode = node;
                node = node.next;
                _voiceManager.activeVoices.remove(delnode);
                _voiceManager.freeVoices.addFirst(delnode.value);
            }
        }
        else
        {//otherwise we have to check for hold pedals and double check the registry before removing the voice
            while (node != null)
            {
                //if hold pedal is enabled do not stop the voice
                if (_holdPedal[node.value.voiceParams.channel])
                    node.value.voiceParams.noteOffPending = true;
                else
                    node.value.stop();
                node = node.next;
            }
        }    
    }
    
    public function noteOffAllChannel(channel:Int, immediate:Bool)
    {
        var node = _voiceManager.activeVoices.first;
        while (node != null)
        {
            if (channel == node.value.voiceParams.channel)
            {
                if (immediate)
                {
                    node.value.stopImmediately();
                    var delnode = node;
                    node = node.next;
                    _voiceManager.activeVoices.remove(delnode);
                    _voiceManager.freeVoices.addFirst(delnode.value);
                }
                else
                {
                    //if hold pedal is enabled do not stop the voice
                    if (_holdPedal[channel])
                        node.value.voiceParams.noteOffPending = true;
                    else
                        node.value.stop();
                    node = node.next;
                }
            }
        }
    }
    
    public function processMidiMessage(event:MidiEvent)
    {
        var command = event.getCommand();
        var channel = event.getChannel();
        var data1 = event.getData1();
        var data2 = event.getData2();
        switch (command)
        {
            case MidiEventTypeEnum.NoteOff: 
                noteOff(channel, data1);
            case MidiEventTypeEnum.NoteOn:
                if (data2 == 0)
                    noteOff(channel, data1);
                else
                    noteOn(channel, data1, data2);
            case MidiEventTypeEnum.NoteAftertouch:
                //synth uses channel after touch instead
            case MidiEventTypeEnum.Controller:
                switch (data1)
                {
                    case ControllerTypeEnum.BankSelectCoarse: //Bank select coarse
                        if (channel == MidiHelper.DrumChannel)
                            data2 += PatchBank.DrumBank;
                        if (soundBank.isBankLoaded(data2))
                            _bankSelect[channel] = data2;
                        else
                            _bankSelect[channel] = (channel == MidiHelper.DrumChannel) ? PatchBank.DrumBank : 0;
                    case ControllerTypeEnum.ModulationCoarse: //Modulation wheel coarse
                        _modRange[channel] = cast ((_modRange[channel] & 0x7F) | data2 << 7);
                        modWheel[channel] = SynthConstants.DefaultModDepth * (_modRange[channel] / 16383.0); 
                    case ControllerTypeEnum.ModulationFine: //Modulation wheel fine
                        _modRange[channel] = cast ((_modRange[channel] & 0xFF80) | data2);
                        modWheel[channel] = SynthConstants.DefaultModDepth * (_modRange[channel] / 16383.0);
                    case ControllerTypeEnum.VolumeCoarse: //Channel volume coarse
                        _volume[channel] = cast ((_volume[channel] & 0x7F) | data2 << 7);
                        updateTotalVolume(channel);
                    case ControllerTypeEnum.VolumeFine: //Channel volume fine
                        _volume[channel] = cast ((_volume[channel] & 0xFF80) | data2);
                        updateTotalVolume(channel);
                    case ControllerTypeEnum.PanCoarse: //Pan coarse
                        _pan[channel] = cast ((_pan[channel] & 0x7F) | data2 << 7);
                        updatePan(channel);
                    case ControllerTypeEnum.PanFine: //Pan fine
                        _pan[channel] = cast ((_pan[channel] & 0xFF80) | data2);
                        updatePan(channel);
                    case ControllerTypeEnum.ExpressionControllerCoarse: //Expression coarse
                        _expression[channel] = cast ((_expression[channel] & 0x7F) | data2 << 7);
                        updateTotalVolume(channel);
                    case ControllerTypeEnum.ExpressionControllerFine: //Expression fine
                        _expression[channel] = cast ((_expression[channel] & 0xFF80) | data2);
                        updateTotalVolume(channel);
                    case ControllerTypeEnum.HoldPedal: //Hold pedal
                        if (_holdPedal[channel] && !(data2 > 63))
                        {//if hold pedal is released stop any voices with pending release tags
                            var node = _voiceManager.activeVoices.first;
                            while (node != null)
                            {
                                if (node.value.voiceParams.noteOffPending)
                                {
                                    node.value.stop();
                                    _voiceManager.removeVoiceFromRegistry(node.value);
                                }
                                node = node.next;
                            }
                        }
                        _holdPedal[channel] = data2 > 63;
                    case ControllerTypeEnum.NonRegisteredParameterCourse: //NRPN Coarse Select   //fix for invalid DataEntry after unsupported NRPN events
                        _rpn[channel] = cast -1; //todo implement NRPN
                    case ControllerTypeEnum.NonRegisteredParameterFine: //NRPN Fine Select     //fix for invalid DataEntry after unsupported NRPN events
                        _rpn[channel] = cast -1; //todo implement NRPN
                    case ControllerTypeEnum.RegisteredParameterCourse: //RPN Coarse Select
                        _rpn[channel] = cast ((_rpn[channel] & 0x7F) | data2 << 7);
                    case ControllerTypeEnum.RegisteredParameterFine: //RPN Fine Select
                        _rpn[channel] = cast ((_rpn[channel] & 0xFF80) | data2);
                    case ControllerTypeEnum.AllNotesOff: //Note Off All
                        noteOffAll(false);
                    case ControllerTypeEnum.DataEntryCoarse: //DataEntry Coarse
                        if (_rpn[channel] == 0)//change semitone, pitchwheel
                        {
                            _pitchBendRange[channel] = cast ((_pitchBendRange[channel] & 0x7F) | data2 << 7);
                            updateTotalPitch(channel);
                        }
                        else if (_rpn[channel] == 1)//master fine tune coarse
                        {
                            _masterFineTune[channel] = cast ((_masterFineTune[channel] & 0x7F) | data2 << 7);
                            updateTotalPitch(channel);
                        }
                        else if (_rpn[channel] == 2)//master coarse tune coarse
                        {//in semitones
                            _masterCoarseTune[channel] = cast (data2 - 64);
                            updateTotalPitch(channel);
                        }
                    case ControllerTypeEnum.DataEntryFine: //DataEntry Fine
                        if (_rpn[channel] == 0)//change cents, pitchwheel
                        {
                            _pitchBendRange[channel] = cast ((_pitchBendRange[channel] & 0xFF80) | data2);
                            updateTotalPitch(channel);
                        }
                        else if (_rpn[channel] == 1) //master fine tune fine
                        {
                            _masterFineTune[channel] = cast ((_masterFineTune[channel] & 0xFF80) | data2);
                            updateTotalPitch(channel);
                        }
                    case ControllerTypeEnum.ResetControllers: //Reset All
                        resetSynthControls();
                    default:
                        return;
                }
            case MidiEventTypeEnum.ProgramChange: //Program Change
                programs[channel] = data1;
            case MidiEventTypeEnum.ChannelAftertouch: //Channel Aftertouch
                _channelPressure[channel] = data2 / 127.0;
                updateTotalVolume(channel);
            case MidiEventTypeEnum.PitchBend: //Pitch Bend
                _pitchBend[channel] = cast (data1 | (data2 << 7));
                updateTotalPitch(channel);
            default:
        }
        
        fireMidiMessageProcessed(event);
    }
    
    public function addMidiMessageProcessed(listener:MidiEvent->Void)
    {
        _midiMessageProcessed.push(listener);
    }
    
    private function fireMidiMessageProcessed(event:MidiEvent)
    {
        for (l in _midiMessageProcessed)
        {
            if (l != null) l(event);
        }
    }
}