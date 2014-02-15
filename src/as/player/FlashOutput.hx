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

import as.ds.CircularSampleBuffer;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;
import as.util.HxWorker;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.SampleDataEvent;
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.system.MessageChannel;
import flash.system.Worker;
import haxe.Log;
import haxe.PosInfos;

class FlashOutputWorker extends Sprite
{
    private static inline var BufferSize = 8192;
    private static inline var BufferCount = 10;
    
    private var _fromOutput:MessageChannel;
    private var _toOutput:MessageChannel;

    private var _sound:Sound;
    private var _soundChannel:SoundChannel;

    private var _circularBuffer:CircularSampleBuffer;
    
    private var _position:Int;
    private var _finished:Bool;
    
    public function new()
    {
        super();
        _finished = false;
        
        _fromOutput = Worker.current.getSharedProperty("fromOutput");
		_toOutput = Worker.current.getSharedProperty("toOutput");
		
		_toOutput.addEventListener(Event.CHANNEL_MESSAGE, handleMessage);
       
        _circularBuffer = new CircularSampleBuffer(BufferSize*BufferCount);
        _sound = new Sound();
        _sound.addEventListener(SampleDataEvent.SAMPLE_DATA, generateSound);

        
        var oldTrace = Log.trace;
        Log.trace = function(v:Dynamic, ?i:PosInfos)
        {
            oldTrace(v, i);
            _fromOutput.send('log');
            _fromOutput.send(Std.string(v));
            _fromOutput.send(i);
        };
    }
    
    private function handleMessage(_)
    {
        var cmd:String = _toOutput.receive();
        switch(cmd)
        {
            case 'play':
                play();
            case 'pause':
                pause();
            case 'stop':
                stop();
            case 'finished':
                _finished = true;
            case 'synthesized':
                var f = _toOutput.receive(true);
                _circularBuffer.write(f, 0, f.length);
        }
    }
    
    private function requestBuffers()
    {
        // if we fall under the half of buffers
        // we request one half
        var count = (BufferCount / 2) * BufferSize;
        if (_circularBuffer.count < count)
        {
            for (i in 0 ... Std.int(BufferCount/2))
            {
                _fromOutput.send("synthesize");
            }
        }
    }
    
    private function play()
    {
        requestBuffers();
        _finished = false;
        _soundChannel = _sound.play(_position);
    }
    
    private function pause()
    {
        _position = Std.int(_soundChannel.position);
        _soundChannel.stop();
        _soundChannel = null;
    }
    
    private function stop()
    {
        _position = 0;
        _finished = true;
        _circularBuffer.clear();
        if (_soundChannel != null)
        {
            _soundChannel.stop();
            _soundChannel = null;
        }
    }
    
    private function generateSound(e:SampleDataEvent)
    {
        if (_circularBuffer.count < BufferSize)
        {
            if (_finished)
            {
                _fromOutput.send('finished');
                stop();
            }
            else
            {
                for (i in 0 ... BufferSize)
                {
                    e.data.writeFloat(0);
                }
            }
        }
        else
        {
            var buffer = new FixedArray<Float32>(BufferSize);
            _circularBuffer.read(buffer, 0, buffer.length);
            
            for (i in 0 ... BufferSize)
            {
                e.data.writeFloat(buffer.get(i));
            }
        }
        
        if (_soundChannel.position != 0)
        {
            _fromOutput.send("position");
            _fromOutput.send(Std.int(_soundChannel.position - SynthPlayer.Latency));
        }
        
        if (!_finished)
        {
            requestBuffers();
        }
    }    
}

class FlashOutput implements ISynthOutput
{
    private var _output:Worker;
    private var _fromOutput:MessageChannel;
    private var _toOutput:MessageChannel;
    
    private var _positionChangedListeners:Array < Int->Void > ;
    private var _finishedListeners:Array < Void->Void > ;
    private var _sampleRequestListeners:Array < Void->Void > ;

    public function new() 
    {
        _positionChangedListeners = new Array();
        _finishedListeners = new Array();
        _sampleRequestListeners = new Array();
        
        trace('initializing output worker');
        _output = HxWorker.workerFromClass(FlashOutputWorker);
        
        _fromOutput = _output.createMessageChannel(Worker.current);
        _toOutput = Worker.current.createMessageChannel(_output);

        _output.setSharedProperty("toOutput", _toOutput);
        _output.setSharedProperty("fromOutput", _fromOutput);

        _fromOutput.addEventListener(Event.CHANNEL_MESSAGE, handleMessage);
        
        trace('starting output worker');
        _output.start();
    }
    
    private function handleMessage(e:Event)
    {
        var cmd = _fromOutput.receive();
        switch(cmd)
        {
            case "log":
                var v:String = _fromOutput.receive(true);
                var i:PosInfos = _fromOutput.receive(true);
                Log.trace(v, i);
            case "synthesize":
                fireSampleRequest();
            case "position":
                firePositionChanged(_fromOutput.receive(true));
            case "finished":
                fireFinished();
        }
    }
    
    public function sequencerFinished() : Void
    {
        _toOutput.send('finished');
    }
    
    public function addPositionChangedListener(listener:Int->Void):Void
    {
        _positionChangedListeners.push(listener);
    }
    
    private function firePositionChanged(pos:Int)
    {
        for (l in _positionChangedListeners)
        {
            l(pos);
        }
    }
    
    public function addSampleRequestListener(listener:Void->Void):Void
    {
        _sampleRequestListeners.push(listener);
    }
    
    private function fireSampleRequest()
    {
        for (l in _sampleRequestListeners)
        {
            l();
        }
    }
 
    public function addFinishedListener(listener:Void->Void):Void
    {
        _finishedListeners.push(listener);
    }
    
    private function fireFinished()
    {
        for (l in _finishedListeners)
        {
            l();
        }
    }
    
    public function addSamples(samples:FixedArray<Float32>)
    {
        _toOutput.send("synthesized");
        _toOutput.send(samples);        
    }
    
    public function play() 
    {
        _toOutput.send("play");
    }   
    
    public function pause() 
    {
        _toOutput.send("pause");
    }
    
    public function stop() 
    {
        _toOutput.send("stop");
    }
}