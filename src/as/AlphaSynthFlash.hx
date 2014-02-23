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

import as.log.LevelPrinter;
import as.player.ISynthPlayerListener;
import as.player.SynthPlayer;
import as.player.SynthPlayerState;
import haxe.io.Bytes;
import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;

/**
 * This main class for the flash target provives
 * a full AlphaSynth synthesizer.
 */
class AlphaSynthFlash implements IAlphaSynth implements ISynthPlayerListener
{
    public var AlphaSynthId = "AlphaSynth";
    public static var instance:AlphaSynthFlash;
    public static function main()
    {
        instance = new AlphaSynthFlash();
    }
    
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
}
