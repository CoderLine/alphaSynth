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
import haxe.Http;
import haxe.io.Bytes;
import haxe.io.BytesInput;

class SynthPlayer
{
    private static inline var BufferSize = 8192;
    private static inline var BufferCount = 5;
    
    private var _output:ISynthOutput;
    
    private var _synth:Synthesizer;
    private var _sequencer:MidiFileSequencer;
    
    public function new() 
    {
        #if flash
        _output = new FlashOutput();
        #end
        _output.addFinishedListener(function() {
            // stop everything
            trace('Output Finished');
            stop(); 
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
            if (isPlaying()) 
            {
                var endTime = Std.int((_sequencer.endTime / _synth.sampleRate) * 1000);
                trace('position: ' + pos + "/" + endTime);
            }
        });
        
        trace('initializing synth');
        _synth = new Synthesizer(44100, 2, 441, 3, 100);
        _sequencer = new MidiFileSequencer(_synth);
        _sequencer.addFinishedListener(_output.sequencerFinished);
    }
    
    public function loadBank(bank:PatchBank)
    {
        _synth.loadBank(bank);
    }
    
    public function loadMidi(midi:MidiFile)
    {
        _sequencer.loadMidi(midi);
    }
    
    #if flash
    public function loadBankUrl(url:String)
    {
        var loader = new flash.net.URLLoader();
        loader.addEventListener( flash.events.Event.COMPLETE, function(e) 
        {
            trace('Soundfont Downloaded, start parsing');
            var data:flash.utils.ByteArray = loader.data;
            try 
            {
                var input:BytesInput = new BytesInput(Bytes.ofData(data));
                var bank = new PatchBank();
                bank.loadSf2(input);
                _synth.loadBank(bank);
                trace('SF2 Loaded');
            }
            catch (e:Dynamic) 
            {
                trace('Loading failed: ' + e);
            }
        });
        loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
        
        var request = new flash.net.URLRequest( url );
        request.method = "GET";
        try 
        {
            loader.load( request );
        }
        catch ( e : Dynamic )
        {
            trace("Error loading soundfont : " +  e);
        }    
    }
    
    public function loadMidiUrl(url:String)
    {
        var loader = new flash.net.URLLoader();
        loader.addEventListener( flash.events.Event.COMPLETE, function(e) 
        {
            trace('Midi Downloaded, start parsing');
            var data:flash.utils.ByteArray = loader.data;
            try 
            {
                var input:BytesInput = new BytesInput(Bytes.ofData(data));
                var file = new MidiFile();
                file.load(input);
                _sequencer.loadMidi(file);
                trace('Midi Loaded');
            }
            catch (e:Dynamic) 
            {
                trace('Loading failed: ' + e);
            }
        });
        loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
        
        var request = new flash.net.URLRequest( url );
        request.method = "GET";
        try 
        {
            loader.load( request );
        }
        catch ( e : Dynamic )
        {
            trace("Error loading midi : " +  e);
        }    
    }
    #end
    
    public function play()
    {
        _sequencer.play();
        _output.play();
    }
    
    public function isPlaying()
    {
        return _sequencer.isPlaying;
    }
    
    public function pause()
    {
        _sequencer.pause();
        _output.pause();
    }
    
    public function stop()
    {
        _sequencer.stop();
        _synth.stop();
        _output.stop();
    }
}