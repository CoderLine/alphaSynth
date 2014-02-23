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
import as.log.LevelPrinter;
import as.log.MethodPrinter;
import as.platform.Types.Float32;
import as.player.FlashOutput.FlashOutputDevice;
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
import mconsole.LogLevel;

class FlashOutputDevice
{
    private static inline var BufferSize = 8192;
    private static inline var Latency = (BufferSize * 1000) / (2*SynthPlayer.SampleRate);
    private static inline var BufferCount = 10;

    private var _sound:Sound;
    private var _soundChannel:SoundChannel;

    private var _circularBuffer:CircularSampleBuffer;
    
    private var _position:Int;
    private var _finished:Bool;
    
    public function new()
    {
        _finished = false;
        
        _circularBuffer = new CircularSampleBuffer(BufferSize*BufferCount);
        _sound = new Sound();
        _sound.addEventListener(SampleDataEvent.SAMPLE_DATA, generateSound);
    }
    
    public function play()
    {
        requestBuffers();
        _finished = false;
        _soundChannel = _sound.play(_position);
    }
    
    public function pause()
    {
        _position = Std.int(_soundChannel.position);
        _soundChannel.stop();
        _soundChannel = null;
    }
    
    public function stop()
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
    
    public function seek(position:Int)
    {
        _position = position;
    }
    
    public function finish()
    {
        _finished = true;
    }
    
    public function addSamples(f:FixedArray<Float32>)
    {
        _circularBuffer.write(f, 0, f.length);
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
                requestBuffer();
            }
        }
    }
    
    private function generateSound(e:SampleDataEvent)
    {
        if (_circularBuffer.count < BufferSize)
        {
            if (_finished)
            {
                finished();
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
            positionChanged(Std.int(_soundChannel.position - Latency));
        }
        
        if (!_finished)
        {
            requestBuffers();
        }
    }      
    
    public var requestBuffer:Void->Void;
    public var finished:Void->Void;
    public var positionChanged:Int->Void;
}

class FlashOutputWorker extends Sprite
{
    
    private var _fromOutput:MessageChannel;
    private var _toOutput:MessageChannel;
    
    private var _device:FlashOutputDevice;
    
    public function new()
    {
        super();
        _device = new FlashOutputDevice();
        _device.requestBuffer = function() {
            _fromOutput.send("synthesize");
        };
        _device.finished = function() {
            _fromOutput.send('finished');
        };
        _device.positionChanged = function(pos:Int) {
            _fromOutput.send("position");
            _fromOutput.send(pos);
        };
        
        _fromOutput = Worker.current.getSharedProperty("fromOutput");
		_toOutput = Worker.current.getSharedProperty("toOutput");
		_toOutput.addEventListener(Event.CHANNEL_MESSAGE, handleMessage);
    }
    
    private function handleMessage(_)
    {
        var cmd:String = _toOutput.receive();
        switch(cmd)
        {
            case 'play':
                _device.play();
            case 'pause':
                _device.pause();
            case 'stop':
                _device.stop();
            case 'seek':
                var position = _toOutput.receive(true);
                _device.seek(position);
            case 'finished':
                _device.finish();
            case 'synthesized':
                var f = _toOutput.receive(true);
                _device.addSamples(f);
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
        
        Console.debug('Initializing flash output worker');
        _output = HxWorker.workerFromClass(FlashOutputWorker);
        
        _fromOutput = _output.createMessageChannel(Worker.current);
        _toOutput = Worker.current.createMessageChannel(_output);

        _output.setSharedProperty("toOutput", _toOutput);
        _output.setSharedProperty("fromOutput", _fromOutput);

        _fromOutput.addEventListener(Event.CHANNEL_MESSAGE, handleMessage);
        
        Console.debug('Starting output worker');
        _output.start();
    }
    
    private function handleMessage(e:Event)
    {
        var cmd = _fromOutput.receive();
        switch(cmd)
        {
            case "log":
                var level:LogLevel = _fromOutput.receive(true);
                var params:Array<Dynamic> = _fromOutput.receive(true);
                var indent:Array<Dynamic> = _fromOutput.receive(true);
                var pos:PosInfos = _fromOutput.receive(true);
                untyped Console.print(level, params, pos);
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
        Console.debug("Sending play to worker");
        _toOutput.send("play");
    }   
    
    public function pause() 
    {
        Console.debug("Sending pause to worker");
        _toOutput.send("pause");
    }
    
    public function stop() 
    {
        Console.debug("Sending stop to worker");
        _toOutput.send("stop");
    }
    
    public function seek(position:Int) 
    {
        Console.debug('Seeking to position ${position}');
        _toOutput.send("seek");
        _toOutput.send(position);
    }
}