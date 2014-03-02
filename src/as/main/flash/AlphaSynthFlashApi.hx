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
package as.main.flash;

import as.player.SynthPlayerState;
import haxe.Serializer;
import haxe.io.Bytes;
import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;
import js.Browser;
import js.JQuery;
import js.html.Element;

/**
 * This class implements the JavaScript API for initializing and controlling the flash based alphaSynth
 */
class AlphaSynthFlashApi implements IAlphaSynthAsync 
{
    public var AlphaSynthId = "AlphaSynth";
    
    private var _flash:ExternalConnection;
    private var _events:JQuery;
    
    public function new()
    {
        var ctx = new Context();
        ctx.addObject("JsAlphaSynth", this);
        _flash = ExternalConnection.flashConnect("default", AlphaSynthId, ctx);
        
        // todo: get rid of jQuery dependency
        _events = new JQuery('<span></span>');
    }
    
    public function startup()
    {
        
    }
    
    public function isReadyForPlay() : Void
    {
        var v = _flash.FlashAlphaSynth.isReadyForPlay.call([]);
        untyped __js__("this._events.trigger('isReadyForPlay', [v])");
    }
    
    public function play() : Void
    {
        _flash.FlashAlphaSynth.play.call([]);
    }
    
    public function pause() : Void
    {
        _flash.FlashAlphaSynth.pause.call([]);
    }
    
    public function playPause() : Void
    {
        _flash.FlashAlphaSynth.playPause.call([]);
    }
    
    public function stop() : Void
    {
        _flash.FlashAlphaSynth.stop.call([]);
    }
    
    public function setPositionTick(tick:Int) : Void
    {
        _flash.FlashAlphaSynth.setPositionTick.call([tick]);
    }
    
    public function setPositionTime(millis:Int) : Void
    {
        _flash.FlashAlphaSynth.setPositionTime.call([millis]);
    }

    public function loadSoundFontUrl(url:String) : Void
    {
        _flash.FlashAlphaSynth.loadSoundFontUrl.call([url]);
    }
    
    public function loadSoundFontData(data:String) : Void
    {
        _flash.FlashAlphaSynth.loadSoundFontData.call([data]);
    }
    
    public function loadMidiBytes(data:Dynamic /*Uint8Array */)
    {
        var data = Serializer.run(Bytes.ofData(data));
        loadMidiData(data);
    }    
    
    public function loadMidiUrl(url:String) : Void
    {
        _flash.FlashAlphaSynth.loadMidiUrl.call([url]);
    }
    
    public function loadMidiData(data:String) : Void
    {
        _flash.FlashAlphaSynth.loadMidiData.call([data]);
    }
    
    public function getState() : Void
    {
        var v = _flash.FlashAlphaSynth.getState.call([]);
        untyped __js__("this._events.trigger('getState', [v])");
    }
    
    public function isSoundFontLoaded() : Void
    {
        var v = _flash.FlashAlphaSynth.isSoundFontLoaded.call([]);
        untyped __js__("this._events.trigger('isSoundFontLoaded', [v])");
    }
    
    public function isMidiLoaded() : Void
    {
        var v = _flash.FlashAlphaSynth.isMidiLoaded.call([]);
        untyped __js__("this._events.trigger('isMidiLoaded', [v])");
    }
    
    public function setLogLevel(level:Int) : Void
    {
        _flash.FlashAlphaSynth.setLogLevel.call([level]);
    }
    
    public function on(events:String, fn:Dynamic)
    {
        _events.on(events, fn);
    }
    
    public function log(level:Int, message:String)
    {
        var console = untyped __js__("window.console");
        switch(level)
        {
            case 0: console.log(message);
            case 1: console.debug(message);
            case 2: console.info(message);
            case 3: console.warn(message);
            case 4: console.error(message);
        }
    }
        
    public function trigger(event:String)
    {
        var args = untyped __js__("Array.prototype.slice.call(arguments)");
        switch(event)
        {
            case "log":
                log(untyped args[1], untyped args[2]);
        }
        
        var events = _events;
        untyped __js__("events.trigger(event, args.splice(1))");
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
                asRoot + "alphaSynthFull.swf", 
                "alphaSynthContainer", "1px", "1px", "11.4.0", 
                swfObjectRoot + "expressInstall.swf", 
                {}, {allowScriptAccess : "always"}, {id:"AlphaSynth"}
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
}
