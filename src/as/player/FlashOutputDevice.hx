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
package as.player;

import as.ds.CircularSampleBuffer;
import as.ds.FixedArray.FixedArray;
import as.ds.SampleArray;
import as.platform.Types.Float32;
import as.util.SynthConstants;
import flash.events.SampleDataEvent;
import flash.media.Sound;
import flash.media.SoundChannel;

class FlashOutputDevice
{
    private static inline var BufferSize = 8192;
    private static inline var Latency = (BufferSize * 1000) / (2*SynthConstants.SampleRate);
    private static inline var BufferCount = 10;

    private var _sound:Sound;
    private var _soundChannel:SoundChannel;

    private var _circularBuffer:CircularSampleBuffer;
    
    private var _position:Int;
    private var _finished:Bool;
    private var _bufferTime:Int;
    
    public function new()
    {
        _finished = false;
        _bufferTime = 0;
        _circularBuffer = new CircularSampleBuffer(BufferSize*BufferCount);
        _sound = new Sound();
        _sound.addEventListener(SampleDataEvent.SAMPLE_DATA, generateSound);
    }
    
    public function play()
    {
        requestBuffers();
        _finished = false;
        if (_position == 0)
            _bufferTime = 0;
        _soundChannel = _sound.play(_position);
    }
    
    public function pause()
    {
        _position = Std.int(_soundChannel.position);
        _soundChannel.stop();
        _soundChannel = null;
    }
    
    public function stop()
    {
        _position = 0;
        _finished = true;
        _circularBuffer.clear();
        if (_soundChannel != null)
        {
            _soundChannel.stop();
            _soundChannel = null;
        }
    }
    
    public function seek(position:Int)
    {
        _position = position;
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
                requestBuffer();
            }
        }
    }
    
    private function generateSound(e:SampleDataEvent)
    {
        if (_circularBuffer.count < BufferSize)
        {
            if (_finished)
            {
                finished();
                stop();
            }
            else
            {
                for (i in 0 ... BufferSize)
                {
                    e.data.writeFloat(0);
                }
                _bufferTime += Std.int((BufferSize * 1000) / (2 * SynthConstants.SampleRate));
            }
        }
        else
        {
            var buffer = new SampleArray(BufferSize);
            _circularBuffer.read(buffer, 0, buffer.length);
            
            for (i in 0 ... BufferSize)
            {
                e.data.writeFloat(buffer.get(i));
            }
        }
        
        if (_soundChannel.position != 0)
        {
            positionChanged(Std.int(_soundChannel.position - _bufferTime));
        }
        
        if (!_finished)
        {
            requestBuffers();
        }
    }      
    
    public var requestBuffer:Void->Void;
    public var finished:Void->Void;
    public var positionChanged:Int->Void;
}