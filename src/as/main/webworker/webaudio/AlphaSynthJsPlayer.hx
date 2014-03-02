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
package as.main.webworker.webaudio;

import as.ds.CircularSampleBuffer;
import as.ds.FixedArray.FixedArray;
import as.ds.SampleArray;
import as.platform.Types.Float32;
import as.util.SynthConstants;
import haxe.remoting.Context;
import haxe.remoting.ExternalConnection;

/**
 * This class implements a HTML5 Web Audio API based audio output device
 * for alphaSynth. It can be controlled via a JS API.
 */
class AlphaSynthJsPlayer 
{
    private static inline var BufferSize = 4096;
    private static inline var Latency = (BufferSize * 1000) / (2*SynthConstants.SampleRate);
    private static inline var BufferCount = 10;

    private var _context:Dynamic /*AudioContext*/;
    private var _buffer:Dynamic /*AudioBuffer*/;
    private var _source:Dynamic /*BufferSourceNode*/;
    private var _audioNode:Dynamic /*ScriptProcessorNode*/;

    private var _circularBuffer:CircularSampleBuffer;
    
    private var _finished:Bool;
    
    private var _startTime:Int;
    private var _pauseStart:Int;
    private var _pauseTime:Int;
    private var _paused:Bool;
    
    public function new()
    {
        _finished = false;
        
        _circularBuffer = new CircularSampleBuffer(BufferSize * BufferCount);
        
        untyped __js__('window.AudioContext = window.AudioContext || window.webkitAudioContext');
        _context = untyped __js__('new AudioContext()');
        
        // create an empty buffer source (silence)
        _buffer = _context.createBuffer(2, BufferSize, SynthConstants.SampleRate);
        
        // create a script processor node which will replace the silence with the generated audio
        _audioNode = _context.createScriptProcessor(BufferSize, 0, 2);
        _audioNode.onaudioprocess = generateSound;
     
    }
    
    public function play()
    {
        requestBuffers();
        _finished = false;
        if (_paused)
        {
            _paused = false;
            _pauseTime += Std.int(_context.currentTime*1000 - _pauseStart);
        }
        else
        {
            _startTime = Std.int(_context.currentTime*1000);
            _pauseTime = 0;
        }
        _source = _context.createBufferSource();
        _source.buffer = _buffer; 
        _source.loop = true;
        _source.connect(_audioNode);
        _source.start(0);
        _audioNode.connect(_context.destination);
    }
    
    public function pause()
    {
        _source.stop();
        _source = null;
        _paused = true;
        _pauseStart = Std.int(_context.currentTime*1000);
        _audioNode.disconnect();
    }
    
    public function stop()
    {
        _finished = true;
        _paused = false;
        _source.stop();
        _source = null;
        _circularBuffer.clear();
        _audioNode.disconnect();
    }
    
    public function seek(position:Int)
    {
        _startTime = Std.int(_context.currentTime*1000 - position);
        _pauseTime = 0;
    }
    
    public function finish()
    {
        _finished = true;
    }
    
    public function addSamples(f:SampleArray)
    {
        _circularBuffer.write(f, 0, f.length);
    }
    
    private function requestBuffers()
    {
        // if we fall under the half of buffers
        // we request one half
        var count = (BufferCount / 2) * BufferSize;
        if (_circularBuffer.count < count)
        {
            for (i in 0 ... Std.int(BufferCount/2))
            {
                if(requestBuffer != null) requestBuffer();
            }
        }
    }
    
    private inline function calcPosition()
    {
        return (_context.currentTime*1000 - _startTime - _pauseTime - Latency);
    }
    
    private function generateSound(e:Dynamic)
    {
        var left:Dynamic = e.outputBuffer.getChannelData(0);
        var right:Dynamic = e.outputBuffer.getChannelData(1);
        var samples:Int = left.length + right.length;
        if (_circularBuffer.count < samples)
        {
            if (_finished)
            {
                if (finished != null) finished();
                stop();
            }
            else
            {
                // buffering
            }
        }
        else
        {
            var buffer = new SampleArray(samples);
            _circularBuffer.read(buffer, 0, buffer.length);
            
            var s = 0;
            for (i in 0 ... left.length)
            {
                left[i] = buffer.get(s++);
                right[i] = buffer.get(s++);
            }
        }
        
        if(positionChanged != null)
            positionChanged(Std.int(calcPosition()));
        
        if (!_finished)
        {
            requestBuffers();
        }
    }      
    
    public var requestBuffer:Void->Void;
    public var finished:Void->Void;
    public var positionChanged:Int->Void;
}