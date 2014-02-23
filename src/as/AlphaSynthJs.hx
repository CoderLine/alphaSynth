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
import js.JQuery;

/**
 * This is the main JavaScript api wrapper for alphaSynth. It detects browser compatibility and
 * initializes a alphaSynth version for the client. 
 * 
 * Compatibility:
 *   If a browser supports WebWorkers, we will use WebWorkers for Synthesizing the samples and a Flash player for playback
 *   If the browser does not support WebWorkers we'll use a pure Flash fallback which requires Flash 11.4
 * 
 * 
 * - IE6-9   - A pure flash alphaSynth is initialized (Requires Flash 11.4)
 * - IE10-11 - Flash is used for playback, Synthesizing is done in a WebWorker
 * - Firefox - Flash is used for playback, Synthesizing is done in a WebWorker [1]
 * - Chrome  - Flash is used for playback, Synthesizing is done in a WebWorker [1]
 * - Safari  - Flash is used for playback, Synthesizing is done in a WebWorker [1]
 * - Opera   - Flash is used for playback, Synthesizing is done in a WebWorker [1]
 * 
 
 * 
 * [1] - In Future Versions they will use the Web Audio API for playback
 */
@:expose("as.AlphaSynth")
class AlphaSynthJs implements IAlphaSynthAsync
{
    public var AlphaSynthId = "AlphaSynth";
    public static var instance:AlphaSynthJs;
    private static var _printer:LevelPrinter;
    
    public static function main()
    {
        untyped Console.hasConsole = false;
        Console.start();
        Console.removePrinter(Console.defaultPrinter);
        Console.addPrinter((_printer = new LevelPrinter(log)));
        
        instance = new AlphaSynthJs();
    }
    
    public static function log(level:Int, message:String)
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
    
    public var realInstance:IAlphaSynthAsync;
    
    public function new()
    {
    }
    
       
    public function isReadyForPlay() : Void
    {
        if (realInstance == null) return;
        realInstance.isReadyForPlay();
    }
    public function getState() : Void
    {
        if (realInstance == null) return;
        realInstance.getState();
    }
    public function isSoundFontLoaded() : Void
    {
        if (realInstance == null) return;
        realInstance.isSoundFontLoaded();
    }
    public function isMidiLoaded() : Void
    {
        if (realInstance == null) return;
        realInstance.isMidiLoaded();
    }
    public function play() : Void
    {
        if (realInstance == null) return;
        realInstance.play();
    }
    public function pause() : Void
    {
        if (realInstance == null) return;
        realInstance.pause();
    }
    public function playPause() : Void
    {
        if (realInstance == null) return; 
        realInstance.playPause();
    }
    public function stop() : Void
    {
        if (realInstance == null) return;
        realInstance.stop();
    }
    public function setPositionTick(tick:Int) : Void
    {
        if (realInstance == null) return;
        realInstance.setPositionTick(tick);
    }
    public function setPositionTime(millis:Int) : Void
    {
        if (realInstance == null) return;
        realInstance.setPositionTime(millis);
    }
    public function loadSoundFontUrl(url:String) : Void
    {
        if (realInstance == null) return;
        realInstance.loadSoundFontUrl(url);
    }
    public function loadSoundFontData(data:String) : Void
    {
        if (realInstance == null) return;
        realInstance.loadSoundFontData(data);
    }
    public function loadMidiUrl(url:String) : Void
    {
        if (realInstance == null) return;
        realInstance.loadMidiUrl(url);
    }
    public function loadMidiData(data:String) : Void
    {
        if (realInstance == null) return;
        realInstance.loadMidiData(data);
    }
    public function setLogLevel(level:Int) : Void
    {
        _printer.level = level;
        if (realInstance == null) return;
        realInstance.setLogLevel(level);
    }
    
    public function on(events:String, fn:Dynamic)
    {
        if (realInstance == null) return;
        realInstance.on(events, fn);
    }
    
    public static function init(asRoot:String, swfObjectRoot:String = '') : Bool
    {
        var swf = untyped __js__("swfobject");
        var supportsWebWorkers:Bool = untyped __js__('!!window.Worker');
        var supportsFlashWorkers:Bool = swf.hasFlashPlayerVersion('11.4');
        
        if (supportsWebWorkers)
        {
            Console.debug("Will use webworkers for synthesizing");
            var result = AlphaSynthFlashPlayerApi.init(asRoot, swfObjectRoot);
            if (result)
            {
                instance.realInstance = new AlphaSynthFlashPlayerApi();
            }
            return result;
        }
        else if (supportsFlashWorkers)
        {
            Console.debug("Will use flash for synthesizing");
            var result = AlphaSynthFlashApi.init(asRoot, swfObjectRoot);
            if (result)
            {
                instance.realInstance = new AlphaSynthFlashApi();
            }
            return result;
        }
        else
        {
            Console.error("Incompatible browser");
            // incompatible browser
            return false;
        }
    }
    
    
}