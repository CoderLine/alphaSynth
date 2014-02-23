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

class AlphaSynthJsWorker implements ISynthPlayerListener
{
    public static var instance:AlphaSynthJsWorker;
    public static function main()
    {
        instance = new AlphaSynthJsWorker();
    }
    
    private var _player:SynthPlayer;
    private var _main:Dynamic;
    private var _printer:LevelPrinter;
    
    public function new()
    {
        untyped Console.hasConsole = false;
        Console.start();
        Console.removePrinter(Console.defaultPrinter);
        Console.addPrinter((_printer = new LevelPrinter(sendLog)));
        
        _main = untyped __js__('self');
        _main.addEventListener('message', handleMessage, false);
        
        _player = new SynthPlayer();
        _player.addEventListener(this);
        onReady();
    }
    
    public function handleMessage(e:Dynamic)
    {
        var data:Dynamic = e.data;
        switch(data.cmd)
        {
            case 'play': play();
            case 'pause': pause();
            case 'isReadyForPlay': _main.postMessage( { cmd: 'isReadyForPlay', value: isReadyForPlay() } );
            case 'playPause': playPause();
            case 'stop': stop();
            case 'setPositionTick': setPositionTick(data.tick);
            case 'setPositionTime': setPositionTime(data.time);
            case 'loadSoundFontUrl': loadSoundFontUrl(data.url);
            case 'loadSoundFontData': loadSoundFontData(data.data);
            case 'loadMidiUrl': loadMidiUrl(data.url);
            case 'loadMidiData': loadMidiUrl(data.data);
            case 'getState': _main.postMessage( { cmd: 'getState', value: getState() } );
            case 'isSoundFontLoaded': _main.postMessage( { cmd: 'isSoundFontLoaded', value: isSoundFontLoaded() } );
            case 'isMidiLoaded': _main.postMessage( { cmd: 'isMidiLoaded', value: isMidiLoaded() } );
            case 'setLogLevel': setLogLevel(data.level);
        }
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
        _main.postMessage( { cmd: 'ready' } );
    }
    
    public function onPositionChanged(currentTime:Int, endTime:Int, currentTick:Int, endTick:Int) : Void
    {
        _main.postMessage( { 
            cmd: 'positionChanged',
            currentTime: currentTime,
            endTime: endTime,
            currentTick: currentTick, 
            endTick: endTick
        } );
    }
    
    public function onPlayerStateChanged(state:SynthPlayerState) : Void
    {
        _main.postMessage( { 
            cmd: 'playerStateChanged',
            state: state
        } );    
    }
    
    public function onFinished() : Void
    {
        _main.postMessage( { 
            cmd: 'finished'
        } ); 
    }
    
    public function onSoundFontLoad(loaded:Int, full:Int) : Void
    {
        _main.postMessage( { 
            cmd: 'soundFontLoad',
            loaded: loaded,
            full: full
        } ); 
    }
    
    public function onSoundFontLoaded() : Void
    {
        _main.postMessage( { 
            cmd: 'soundFontLoaded' 
        } ); 
    }
    
    public function onSoundFontLoadFailed() : Void
    {
        _main.postMessage( { 
            cmd: 'soundFontLoadFailed' 
        } ); 
    }
    
    public function onMidiLoad(loaded:Int, full:Int) : Void
    {
        _main.postMessage( { 
            cmd: 'midiLoad',
            loaded: loaded,
            full: full
        } ); 
    }
    
    public function onMidiLoaded() : Void
    {
        _main.postMessage( { 
            cmd: 'midiFileLoaded' 
        } ); 
    }
    
    public function onMidiLoadFailed() : Void
    {
        _main.postMessage( { 
            cmd: 'midiFileLoadFailed' 
        } ); 
    }
    
    public function onReadyForPlay() : Void
    {
        _main.postMessage( { 
            cmd: 'readyForPlay',
            value: isReadyForPlay() 
        } ); 
    }
    
    public function sendLog(level:Int, s:String) : Void
    {
        _main.postMessage( { 
            cmd: 'log',
            level: level,
            message: s
        } ); 
    }
}