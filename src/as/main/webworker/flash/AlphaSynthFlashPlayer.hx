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
package as.main.webworker.flash;

import as.ds.FixedArray.FixedArray;
import as.ds.SampleArray;
import as.platform.Types.Float32;
import as.player.FlashOutputDevice;
import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;

/**
 * This class implements a flash based audio output device
 * for alphaSynth. It can be controlled via a JS API.
 */
class AlphaSynthFlashPlayer 
{
    public var AlphaSynthId = "AlphaSynth";
    public static var instance:AlphaSynthFlashPlayer;
    public static function main()
    {
        instance = new AlphaSynthFlashPlayer();
    }
    
    private var _output:FlashOutputDevice;
    private var _js:ExternalConnection;
    
    public function new()
    {
        var ctx = new Context();
        ctx.addObject("FlashAlphaSynth", this);
        _js = ExternalConnection.jsConnect("default", ctx);
        
        _output = new FlashOutputDevice();
        _output.requestBuffer = function() {
            _js.JsAlphaSynth.playerSampleRequest.call([]);
        };
        _output.finished = function() {
            _js.JsAlphaSynth.playerFinished.call([]);
        };
        _output.positionChanged = function(pos:Int) {
            _js.JsAlphaSynth.playerPositionChanged.call([pos]);
        };
        _js.JsAlphaSynth.playerReady.call([]);
    }
    
    public function sequencerFinished() : Void
    {
        _output.finish();
    }
    
    public function addSamples(samples:String)
    {
        var sampleData:SampleArray = SampleArray.unserialize(samples);
        _output.addSamples(sampleData);
    }
    
    public function play() 
    {
        _output.play();
    }   
    
    public function pause() 
    {
        _output.pause();
    }
    
    public function stop() 
    {
        _output.stop();
    }
    
    public function seek(position:Int) 
    {
        _output.seek(position);
    }
}