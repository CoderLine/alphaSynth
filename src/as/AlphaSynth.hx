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

#if flash
import as.log.LevelPrinter;
import as.player.ISynthPlayerListener;
import as.player.SynthPlayer;
import as.player.SynthPlayerState;
import haxe.io.Bytes;
import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;

#elseif js
import as.player.SynthPlayerState;
import haxe.Serializer;
import haxe.io.Bytes;
import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;
import js.Browser;
import js.JQuery;
import js.html.Element;

#elseif cs
import as.player.SynthPlayer;
#end

@:expose
class AlphaSynth implements IAlphaSynth 
#if flash
implements ISynthPlayerListener
#end
{
    public var AlphaSynthId = "AlphaSynth";
    public static var instance:AlphaSynth;
    public static function main()
    {
        instance = new AlphaSynth();
    }
    
    #if flash
    
    private var _player:SynthPlayer;
    private var _js:ExternalConnection;
    private var _printer:LevelPrinter;
    
    public function new()
    {
        untyped Console.hasConsole = false;
        Console.start();
        Console.removePrinter(Console.defaultPrinter);
        Console.addPrinter((_printer = new LevelPrinter(sendLog)));
        
        var ctx = new Context();
        ctx.addObject("FlashAlphaSynth", this);
        _js = ExternalConnection.jsConnect("default", ctx);
        
        _player = new SynthPlayer();
        _player.addEventListener(this);
        onReady();
    }
    
    public function isReadyForPlay() : Bool
    {
        return _player.isReady;
    }
    
    public function play() : Void
    {
        _player.play();
    }
    
    public function pause() : Void
    {
        _player.pause();
    }
    
    public function playPause() : Void
    {
        _player.playPause();
    }
    
    public function stop() : Void
    {
        _player.stop();
    }
    
    public function setPositionTick(tick:Int) : Void
    {
        _player.tickPosition = tick;
    }
    
    public function setPositionTime(millis:Int) : Void
    {
        _player.timePosition = millis;
    }

    public function loadSoundFontUrl(url:String) : Void
    {
        _player.loadSoundFontUrl(url);
    }
    
    public function loadSoundFontData(data:String) : Void
    {
        _player.loadSoundFontData(data);
    }
    
    public function loadMidiUrl(url:String) : Void
    {
        _player.loadMidiUrl(url);
    }
    
    public function loadMidiData(data:String) : Void
    {
        _player.loadMidiData(data);
    }
    
    public function getState() : SynthPlayerState
    {
        return _player.state;
    }
    
    public function isSoundFontLoaded() : Bool
    {
        return _player.isSoundFontLoaded;
    }
    
    public function isMidiLoaded() : Bool
    {
        return _player.isMidiLoaded;
    }
    
    public function setLogLevel(level:Int) : Void
    {
        if (level < LevelPrinter.MinLogLevel || level > LevelPrinter.MaxLogLevel)
        {
            Console.error("invalid log level");
            return;
        }
        _printer.level = level;
    }
    
    //
    // Events
    
    public function onReady() : Void
    {
        _js.JsAlphaSynth.trigger.call(['ready']);
    }
    
    public function onPositionChanged(currentTime:Int, endTime:Int, currentTick:Int, endTick:Int) : Void
    {
        _js.JsAlphaSynth.trigger.call(['positionChanged', currentTime, endTime, currentTick, endTick]);
    }
    
    public function onPlayerStateChanged(state:SynthPlayerState) : Void
    {
        _js.JsAlphaSynth.trigger.call(['playerStateChanged', Type.enumIndex(state)]);
    }
    
    public function onFinished() : Void
    {
        _js.JsAlphaSynth.trigger.call(['finished']);
    }
    
    public function onSoundFontLoad(loaded:Int, full:Int) : Void
    {
        _js.JsAlphaSynth.trigger.call(['soundFontLoad', loaded, full]);
    }
    
    public function onSoundFontLoaded() : Void
    {
        _js.JsAlphaSynth.trigger.call(['soundFontLoaded']);
    }
    
    public function onSoundFontLoadFailed() : Void
    {
        _js.JsAlphaSynth.trigger.call(['soundFontLoadFailed']);
    }
    
    public function onMidiLoad(loaded:Int, full:Int) : Void
    {
        _js.JsAlphaSynth.trigger.call(['midiLoad', loaded, full]);
    }
    
    public function onMidiLoaded() : Void
    {
        _js.JsAlphaSynth.trigger.call(['midiFileLoaded']);
    }
    
    public function onMidiLoadFailed() : Void
    {
        _js.JsAlphaSynth.trigger.call(['midiFileLoadFailed']);
    }
    
    public function onReadyForPlay() : Void
    {
        _js.JsAlphaSynth.trigger.call(['readyForPlay', isReadyForPlay()]);
    }
    
    public function sendLog(level:Int, s:String) : Void
    {
        _js.JsAlphaSynth.trigger.call(['log', level, s]);
    }
    
    #elseif js
    
    private var _flash:ExternalConnection;
    private var _events:JQuery;
    
    public var ready:Bool;
    
    public function new()
    {
        ready = false;
        
        var ctx = new Context();
        ctx.addObject("JsAlphaSynth", this);
        _flash = ExternalConnection.flashConnect("default", AlphaSynthId, ctx);
        
        // todo: get rid of jQuery dependency
        _events = new JQuery('<span></span>');
    }
    
    public function isReadyForPlay() : Bool
    {
        return _flash.FlashAlphaSynth.isReadyForPlay.call([]);
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
    
    public function getState() : SynthPlayerState
    {
        return _flash.FlashAlphaSynth.getState.call([]);
    }
    
    public function isSoundFontLoaded() : Bool
    {
        return _flash.FlashAlphaSynth.isSoundFontLoaded.call([]);
    }
    
    public function isMidiLoaded() : Bool
    {
        return _flash.FlashAlphaSynth.isMidiLoaded.call([]);
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
            case "ready":
                ready = true;
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
    #else
    public function new()
    {
        
    }
    #end
}
