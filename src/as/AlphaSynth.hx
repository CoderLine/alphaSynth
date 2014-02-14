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
import as.midi.MidiFile;
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
import js.html.Element;
#end

#if cs
import as.player.SynthPlayer;
#end

import haxe.Log;
import haxe.PosInfos;
import haxe.Serializer;
import haxe.Unserializer;
import haxe.io.Bytes;
import haxe.io.BytesInput;

import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;
import as.synthesis.SynthPosition;

#if js

extern class Uint8Array implements ArrayAccess<Int>
{
  public var length:Int;
}
  
#end

@:expose
class AlphaSynth 
{
    #if flash
    
    private static var _player:SynthPlayer;
    private static var _js;
    
    public static function main()
    {
        var ctx = new Context();
        ctx.addObject("FlashAlphaSynth", AlphaSynth);
        _js = ExternalConnection.jsConnect("default", ctx);
        Log.trace = function(v:Dynamic, ?info:PosInfos)
        {
            _js.JsAlphaSynth.log.call([v, info]);
        };

         
        trace('Initializing synthsizer');
        _player = new SynthPlayer();
        _player.addPositionChangedListener(function(p) {
            _js.JsAlphaSynth.firePositionChanged.call([p]);
        });
        _player.addFinishedListener(function() {
            _js.JsAlphaSynth.fireFinished.call([]);
        });
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
    
    public static function loadMidi(data:String)
    {
        try 
        {
            var bytes:Bytes = Unserializer.run(data);
            var midi = new MidiFile();
            midi.load(new BytesInput(bytes));
            _player.loadMidi(midi);
            return true;
        }
        catch (e:Dynamic)
        {
            trace('error loading midi from binary: ' + e);
            return false;
        }
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
    public static var isReady:Bool;
    
    private static var _finishedListener:Array < Void->Void > ;
    private static var _positionChangedListener:Array < SynthPosition->Void > ;

    
    public static function main()
    {
        _finishedListener = new Array < Void->Void >();
        _positionChangedListener = new Array < SynthPosition->Void >();

        var ctx = new Context();
        ctx.addObject("JsAlphaSynth", AlphaSynth);
        _flash = ExternalConnection.flashConnect("default", AlphaSynthId, ctx);
    }
    
    public static function loadSoundFontFromUrl(url:String)
    {
        _flash.FlashAlphaSynth.loadSoundFont.call([url]);
    }
    
    public static function loadMidiFromUrl(url:String)
    {
        _flash.FlashAlphaSynth.loadMidiFromUrl.call([url]);
    }    
    
    public static function loadMidi(data:Uint8Array)
    {
        var data = Serializer.run(Bytes.ofData(untyped data));
        return _flash.FlashAlphaSynth.loadMidi.call([data]);
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
        return _flash.FlashAlphaSynth.isPlaying.call([]);
    }
    
    public static function stop()
    {
        _flash.FlashAlphaSynth.stop.call([]);
    }
    
    public static function positionChanged(pos:SynthPosition)
    {
        
    }
    
    public static function fireFinished()
    {
        for (l in _finishedListener)
        {
            l();
        }
    }
    
    public static inline function addFinishedListener(listener:Void->Void)
    {
        _finishedListener.push(listener);
    }
    
    public static inline function addPositionChangedListener(listener:SynthPosition->Void)
    {
        _positionChangedListener.push(listener);
    }
    
    public static function firePositionChanged(position:SynthPosition)
    {
        for (l in _positionChangedListener)
        {
            l(position);
        }
    }
        
    public static function log(v:Dynamic, i:PosInfos)
    {
        Log.trace(v, i);
    }
    
    public static function ready()
    {
        isReady = true;
        if (untyped __js__("jQuery"))
        {
            untyped __js__("jQuery(document).trigger('alphaSynthReady')");
        }
    }
    
    public static function init(asRoot:String, swfObjectRoot:String = '')
    {
        var swf = untyped __js__("swfobject");
        if (asRoot != '' && !StringTools.endsWith(asRoot, "/"))
        {
            asRoot += "/";
        }
        if (swfObjectRoot != '' && !StringTools.endsWith(swfObjectRoot, "/"))
        {
            swfObjectRoot += "/";
        }
        
        if (swf)
        {
            // check for existing instance
            var alphaSynth:Element = Browser.document.getElementById("alphaSynthContainer");
            if (alphaSynth != null)
            {
                trace('Skipped initialization, existing alphaSynthContainer found');
                return false;
            }
            
            // create container
            alphaSynth = Browser.document.createElement('div');
            alphaSynth.setAttribute('id', 'alphaSynthContainer');
            Browser.document.body.appendChild(alphaSynth);
            
            // initialize swf
            untyped swf.embedSWF(
                asRoot + "alphaSynth.swf", 
                "alphaSynthContainer", "1px", "1px", "11.4.0", 
                swfObjectRoot + "expressInstall.swf", 
                {}, {}, {id:"AlphaSynth"}
            );
            return true;
        }    
        else
        {
            // todo: maybe a fallback solution writing html?
            trace('Error initializing alphaSynth: swfobject not found');
            return false;
        }
    }
    
    #elseif cs
    
    public static function main()
    {        
    }    
    
    #end
}
