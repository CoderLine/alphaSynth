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
package as.player;

import as.bank.PatchBank;
import as.midi.MidiFile;
import as.sequencer.MidiFileSequencer;
import as.synthesis.Synthesizer;
import as.util.UrlLoader;
import haxe.Http;
import haxe.io.Bytes;
import haxe.io.BytesInput;
import haxe.Unserializer;

class SynthPlayer 
{
    private static inline var SampleRate = 44100;
    private static inline var BufferSize = 8192;
    public static inline var Latency = 0;
    private static inline var BufferCount = 5;
    
    private var _output:ISynthOutput;
    private var _synth:Synthesizer;
    private var _sequencer:MidiFileSequencer;
    private var _events:SynthPlayerEventDispatcher;
    
    public function new() 
    {
        Console.debug('Initializing player');
        _events = new SynthPlayerEventDispatcher();

        state = Stopped;
        
        Console.debug("Opening output");
        #if flash
        _output = new FlashOutput();
        #end
        
        _output.addFinishedListener(function() {
            // stop everything
            stop(); 
            Console.debug("Finished playback");
            _events.onFinished();
        });
        _output.addSampleRequestListener(function() {
            // synthesize buffer
            _sequencer.fillMidiEventQueue();
            _synth.synthesize();
            // send it to output
            _output.addSamples(_synth.sampleBuffer);
        });
        _output.addPositionChangedListener(function(pos:Int) {
            // log position
            firePositionChanged(pos);
        });
        
        Console.debug("Creating synthesizer");
        _synth = new Synthesizer(SampleRate, 2, 441, 3, 100);
        _sequencer = new MidiFileSequencer(_synth);
        _sequencer.addFinishedListener(_output.sequencerFinished);
    }

    //
    // API
    
    public var state(default,null):SynthPlayerState;
    public var isSoundFontLoaded(default,null):Bool;
    public var isMidiLoaded(default, null):Bool;
    
    private var _tickPosition:Int;
    public var tickPosition(get, set):Int;
    private var _timePosition:Int;
    public var timePosition(get, set):Int;
    public var isReady(get, null):Bool;
        
    public function play()
    {
        if (state == Playing || !isReady) return;
        Console.debug("Starting playback");
        state = Playing;
        _sequencer.play();
        _output.play();
    }
    
    public function pause()
    {
        if (state != Playing || !isReady) return;
        Console.debug("Pausing playback");
        state = Paused;
        _sequencer.pause();
        _output.pause();
    }
    
    public function playPause()
    {
        if (state == Playing || !isReady) pause();
        else play();
    }
    
    public function stop()
    {
        if (state == Stopped || !isReady) return;
        Console.debug("Stopping playback");
        state = Stopped;
        _sequencer.stop();
        _synth.stop();
        _output.stop();
    }
    
    public function loadSoundFontUrl(url:String) : Void
    {
        if (state != Stopped) return;
        Console.info('Start loading soundfont from url ${url}');
        var loader = new UrlLoader();
        loader.url = url;
        loader.method = "GET";
        loader.complete = loadSoundFontBytes;
        loader.progress = onSoundFontLoad;
        try 
        {
            loader.load();
        }
        catch (e:Dynamic)
        {
            Console.error('Could not load soundfont from url: ${e}');
        }
    }
    
    public function loadSoundFontData(data:String) : Void
    {
        if (state != Stopped) return;
        Console.info('Start loading soundfont from serialized bytes');
        var bytes:Bytes = null;
        try
        {
            bytes = Unserializer.run(data);
            loadSoundFontBytes(bytes);
        }
        catch (e:Dynamic)
        {
            Console.error('Could not load soundfont from serialized bytes: ${e}');
        }
    }    
    
    public function loadSoundFontBytes(data:Bytes) : Void
    {
        if (state != Stopped) return;
        var input:BytesInput = new BytesInput(data);
        try 
        {
            Console.info('Loading soundfont from bytes');
            var bank = new PatchBank();
            bank.loadSf2(input);
            _synth.loadBank(bank);
            isSoundFontLoaded = true;
            _events.onSoundFontLoaded();
            Console.info('soundFont successfully loaded');
            if (isReady) _events.onReadyForPlay();
        }
        catch (e:Dynamic)
        {
            Console.error('Could not load soundfont from bytes ${e}');
            isSoundFontLoaded = false;
            _synth.unloadBank();
            _events.onSoundFontLoadFailed();
        }
    }    
    
    public function loadMidiUrl(url:String) : Void
    {
        if (state != Stopped) return;
        Console.info('Start loading midi from url ${url}');
        var loader = new UrlLoader();
        loader.url = url;
        loader.method = "GET";
        loader.complete = loadMidiBytes;
        loader.progress = onMidiLoad;
        try 
        {
            loader.load();
        }
        catch (e:Dynamic)
        {
            Console.error('Could not load midi from url: ${e}');
        }
    }
    
    public function loadMidiData(data:String) : Void
    {
        if (state != Stopped) return;
        Console.info('Start loading midi from serialized bytes');
        var bytes:Bytes = null;
        try
        {
            bytes = Unserializer.run(data);
            loadMidiBytes(bytes);
        }
        catch (e:Dynamic)
        {
            Console.error('Could not load midi from serialized bytes: ${e}');
        }
    }
    
    public function loadMidiBytes(data:Bytes) : Void
    {
        if (state != Stopped) return;
        var input:BytesInput = new BytesInput(data);
        try 
        {
            Console.info('Loading midi from bytes');
            var midi = new MidiFile();
            midi.load(input);
            _sequencer.loadMidi(midi);
            isMidiLoaded = true;
            _events.onMidiLoaded();
            Console.info('Midi successfully loaded');
            if (isReady) _events.onReadyForPlay();
        }
        catch (e:Dynamic)
        {
            Console.error('Could not load soundfont from bytes ${e}');
            isMidiLoaded = false;
            _sequencer.unloadMidi();
            _events.onMidiLoadFailed();
        }
    }        
    
    private inline function get_isReady() : Bool
    {
        return isSoundFontLoaded && isMidiLoaded;
    }
    
    
    private function get_tickPosition() : Int
    {
        return _tickPosition;
    }
    
    private function set_tickPosition(position:Int) : Int
    {        
        timePosition = _sequencer.ticksToMillis(position);
        return position;
    }
    
    private function get_timePosition() : Int
    {
        return _timePosition;
    }
    
    private function set_timePosition(position:Int) : Int
    {
        Console.debug('Seeking to position ${position}ms');
        var oldState = state;
        pause();
        _sequencer.seek(position);
        _output.seek(position);
        if (oldState == Playing) play();
        
        return position;
    }
    
    private function onSoundFontLoad(loaded:Int, total:Int)
    {
        Console.debug('Soundfont downloading: ${loaded}/${total} bytes');
        _events.onSoundFontLoad(loaded, total);
    }
    
    private function onMidiLoad(loaded:Int, total:Int)
    {
        Console.debug('Midi downloading: ${loaded}/${total} bytes');
        _events.onMidiLoad(loaded, total);
    }
    
    private function firePositionChanged(pos:Int)
    {
        var endTime = Std.int((_sequencer.endTime / _synth.sampleRate) * 1000);
        var currentTime = pos;
        var endTick = _sequencer.millisToTicks(endTime);
        var currentTick = _sequencer.millisToTicks(currentTime);

        _tickPosition = currentTick;
        _timePosition = currentTime;
        Console.debug('Position changed: (time: ${currentTime}/${endTime}, tick: ${currentTick}/${endTick})');
        _events.onPositionChanged(currentTime, endTime, currentTick, endTick);
    }
    
    public inline function addEventListener(listener:ISynthPlayerListener)
    {
        _events.add(listener);
    }
}