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

// platform specific includes

#if flash
import as.player.SynthPlayer;
import as.util.HxWorker;
import flash.display.JointStyle;
import flash.display.Sprite;
import flash.Lib;
import flash.system.Worker;
import flash.events.Event;
import flash.events.ProgressEvent;
import flash.net.URLLoaderDataFormat;
import flash.utils.ByteArray;
import flash.utils.JSON;

#end

#if js
import js.Browser;
import js.JQuery;
#end

#if cs
import as.player.SynthPlayer;
#end

import haxe.Log;
import haxe.PosInfos;

import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;

@:expose
class Main 
{
    #if flash
    
    private static var _player:SynthPlayer;
    private static var _js;
    
    public static function main()
    {
        var ctx = new Context();
        ctx.addObject("FlashAlphaSynth", Main);
        _js = ExternalConnection.jsConnect("default", ctx);
        Log.trace = function(v:Dynamic, ?info:PosInfos)
        {
            _js.JsAlphaSynth.log.call([v, info]);
        };

         
        trace('Initializing synthsizer');
        _player = new SynthPlayer();
        trace('Done');
        
        _js.JsAlphaSynth.ready.call([]);
    }
    
    public static function loadSoundFont(url:String)
    {
        _player.loadBankUrl(url);
    }
    
    public static function loadMidiFromUrl(url:String)
    {
        _player.loadMidiUrl(url);
    }
    
    public static function play()
    {
        _player.play();
    }
    
    public static function isPlaying()
    {
        _player.isPlaying();
    }
    
    public static function pause()
    {
        _player.pause();
    }
    
    public static function stop()
    {
        _player.stop();
    }
    
    #elseif js
    
    private static var _flash;
    
    public static var AlphaSynthId = "AlphaSynth";
    
    public static function main()
    {
        var ctx = new Context();
        ctx.addObject("JsAlphaSynth", Main);
        _flash = ExternalConnection.flashConnect("default", AlphaSynthId, ctx);
    }
    
    public static function loadSoundFont(url:String)
    {
        _flash.FlashAlphaSynth.loadSoundFont.call([url]);
    }
    
    public static function loadMidiFromUrl(url:String)
    {
        _flash.FlashAlphaSynth.loadMidiFromUrl.call([url]);
    }    

    public static function play()
    {
        _flash.FlashAlphaSynth.play.call([]);
    }

    public static function pause()
    {
        _flash.FlashAlphaSynth.pause.call([]);
    }

    public static function isPlaying()
    {
        _flash.FlashAlphaSynth.isPlaying.call([]);
    }
    
    public static function stop()
    {
        _flash.FlashAlphaSynth.stop.call([]);
    }
    
    public static function log(v:Dynamic, i:PosInfos)
    {
        Log.trace(v, i);
    }
    
    public static function ready()
    {
        if (untyped __js__("jQuery"))
        {
            untyped __js__("jQuery(document).trigger('alphaSynthReady')");
        }
    }
    
    #elseif cs
    
    public static function main()
    {        
    }    
    
    #end
}
