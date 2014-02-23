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

import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;
import as.util.HxWorker;
import flash.display.Sprite;
import flash.events.Event;
import flash.system.MessageChannel;
import flash.system.Worker;
import haxe.PosInfos;
import mconsole.LogLevel;

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