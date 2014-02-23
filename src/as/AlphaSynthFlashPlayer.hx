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
package as;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;
import as.player.FlashOutput;
import as.player.ISynthOutput;
import as.player.SynthPlayerState;
import haxe.remoting.ExternalConnection;
import haxe.io.Bytes;
import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;
import haxe.Serializer;
import haxe.Unserializer;

/**
 * This main class for the flash target implements a 
 * flash sample player.
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
        var sampleData:FixedArray<Float32> = FixedArray.unserialize(samples);
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