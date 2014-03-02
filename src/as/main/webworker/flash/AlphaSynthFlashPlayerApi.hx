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
import as.main.IAlphaSynthAsync;
import as.platform.Types.Float32;
import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;
import js.Browser;
import js.html.Element;
import js.JQuery;

/**
 * This class implements a JavaScript API for initializing and controlling
 * a WebWorker based alphaSynth which uses a Flash based Audio Output.
 */
class AlphaSynthFlashPlayerApi implements IAlphaSynthAsync
{
    public static inline var AlphaSynthId = "AlphaSynth";
    public static inline var AlphaSynthWorkerId = "AlphaSynthWorker";
    
    private var _flash:ExternalConnection;
    private var _synth:Dynamic;
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
    
    //
    // API communicating with the web worker
    
    public function isReadyForPlay() : Void
    {
        _synth.postMessage( { cmd: 'isReadyForPlay' } );
    }
    
    public function play() : Void
    {
        _synth.postMessage( { cmd: 'play' } );
    }
    
    public function pause() : Void
    {
        _synth.postMessage( { cmd: 'pause' } );
    }
    
    public function playPause() : Void
    {
        _synth.postMessage( { cmd: 'playPause' } );
    }
    
    public function stop() : Void
    {
        _synth.postMessage( { cmd: 'stop' } );
    }
    
    public function setPositionTick(tick:Int) : Void
    {
        _synth.postMessage( { cmd: 'setPositionTick', tick: tick } );
    }
    
    public function setPositionTime(millis:Int) : Void
    {
        _synth.postMessage( { cmd: 'setPositionTime', time: millis} );
    }

    public function loadSoundFontUrl(url:String) : Void
    {
        _synth.postMessage( { cmd: 'loadSoundFontUrl', url: qualifyURL(url)} );
    }
    
    public function loadSoundFontData(data:String) : Void
    {
        _synth.postMessage( { cmd: 'loadSoundFontData', data: data} );
    }
    
    public function loadMidiBytes(data:Dynamic /*Uint8Array */)
    {
        _synth.postMessage( { cmd: 'loadMidiBytes', data: data} );
    }    
    
    public function loadMidiUrl(url:String) : Void
    {
        _synth.postMessage( { cmd: 'loadMidiUrl', url: qualifyURL(url)} );
    }
    
    public function loadMidiData(data:String) : Void
    {
        _synth.postMessage( { cmd: 'loadMidiData', data: data} );
    }
    
    public function getState() : Void
    {
        _synth.postMessage( { cmd: 'getState' } );
    }
    
    public function isSoundFontLoaded() : Void
    {
        _synth.postMessage( { cmd: 'isSoundFontLoaded' } );
    }
    
    public function isMidiLoaded() : Void
    {
        _synth.postMessage( { cmd: 'isMidiLoaded' } );
    }
    
    public function setLogLevel(level:Int) : Void
    {
        _synth.postMessage( { cmd: 'setLogLevel', level: level } );
    }
    
    private function qualifyURL(url:String):String
    {
        var img:js.html.ImageElement = cast Browser.document.createElement('img');
        img.onerror = function(e) { };
        img.src = url;
        url = img.src; 
        img.src = null; 
        return url;
    }
    
    public function handleWorkerMessage(e:Dynamic)
    {
        var data = e.data;
        switch(data.cmd)
        {
            // responses
            case 'isReadyForPlay': untyped __js__("this._events.trigger(data.cmd, [data.value])");
            case 'getState': untyped __js__("this._events.trigger(data.cmd, [data.value])");
            case 'isSoundFontLoaded': untyped __js__("this._events.trigger(data.cmd, [data.value])");
            case 'isMidiLoaded': untyped __js__("this._events.trigger(data.cmd, [data.value])");
            // events
            case 'positionChanged': untyped __js__("this._events.trigger(data.cmd, [data.currentTime, data.endTime, data.currentTick, data.endTick])");
            case 'playerStateChanged': untyped __js__("this._events.trigger(data.cmd, [data.state])");
            case 'finished': untyped __js__("this._events.trigger(data.cmd)");
            case 'soundFontLoad': untyped __js__("this._events.trigger(data.cmd, [data.loaded, data.full])");
            case 'soundFontLoaded': untyped __js__("this._events.trigger(data.cmd)");
            case 'soundFontLoadFailed': untyped __js__("this._events.trigger(data.cmd)");
            case 'midiLoad': untyped __js__("this._events.trigger(data.cmd, [data.loaded, data.full])");
            case 'midiFileLoaded': untyped __js__("this._events.trigger(data.cmd)");
            case 'midiFileLoadFailed': untyped __js__("this._events.trigger(data.cmd)");
            case 'readyForPlay': untyped __js__("this._events.trigger(data.cmd, data.value)");
            case 'log': log(data.level, data.message);
            // flash player communication
            case 'playerSequencerFinished': _flash.FlashAlphaSynth.sequencerFinished.call([]);
            case 'playerAddSamples': _flash.FlashAlphaSynth.addSamples.call([SampleArray.serialize(data.samples)]);
            case 'playerPlay': _flash.FlashAlphaSynth.play.call([]);
            case 'playerPause': _flash.FlashAlphaSynth.pause.call([]);
            case 'playerStop': _flash.FlashAlphaSynth.stop.call([]);
            case 'playerSeek': _flash.FlashAlphaSynth.seek.call([data.pos]);
        }
    }
    
    public function on(events:String, fn:Dynamic)
    {
        _events.on(events, fn);
    }

    
    //
    // Events triggered by flash player
    
    public function playerReady()
    {
        // start worker
        untyped {
            _synth = untyped Browser.window[AlphaSynthWorkerId];
            _synth.addEventListener('message', handleWorkerMessage, false);
            _synth.postMessage( { cmd: 'playerReady' } );
            untyped __js__("this._events.trigger('ready')");
        }
    }
    
    public function playerSampleRequest()
    {
        _synth.postMessage( { cmd: 'playerSampleRequest' } );
    }
    
    public function playerFinished()
    {
        _synth.postMessage( { cmd: 'playerFinished' } );
    }
    
    public function playerPositionChanged(pos:Int)
    {
        _synth.postMessage( { cmd: 'playerPositionChanged', pos: pos } );
    }
    
    private function log(level:Int, message:String)
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
            
            untyped {
                // create web worker
                Browser.window[AlphaSynthWorkerId] = __js__('new Worker(asRoot + "alphaSynthWorker.js")');
                // initialize swf
                swf.embedSWF(
                    asRoot + "alphaSynthPlayer.swf", 
                    "alphaSynthContainer", "1px", "1px", "11.0.0", 
                    swfObjectRoot + "expressInstall.swf", 
                    {}, {allowScriptAccess : "always"}, {id:"AlphaSynth"}
                );
            }
            
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
