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
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;

class JsWorkerOutput implements ISynthOutput
{
    private var _positionChangedListeners:Array < Int->Void > ;
    private var _finishedListeners:Array < Void->Void > ;
    private var _sampleRequestListeners:Array < Void->Void > ;
    
    private var _workerSelf:Dynamic;

    public function new() 
    {
        _positionChangedListeners = new Array();
        _finishedListeners = new Array();
        _sampleRequestListeners = new Array();
        
        Console.debug('Initializing js output worker');
        _workerSelf = untyped __js__('self');
        _workerSelf.addEventListener('message', handleMessage, false);
    }
    
    public function handleMessage(e:Dynamic)
    {
        // handle events sent from flash player
        var data = e.data;
        switch(data.cmd)
        {
            case 'playerSampleRequest':
                fireSampleRequest();
            case 'playerFinished':
                fireFinished();
            case 'playerPositionChanged':
                firePositionChanged(data.pos);
        }
    }
        
    public function sequencerFinished() : Void
    {
        _workerSelf.postMessage( { cmd: 'playerSequencerFinished' } );
    }
    
    public function addPositionChangedListener(listener:Int->Void):Void
    {
        _positionChangedListeners.push(listener);
    }
    
    private function firePositionChanged(pos:Int)
    {
        for (l in _positionChangedListeners)
        {
            l(pos);
        }
    }
    
    public function addSampleRequestListener(listener:Void->Void):Void
    {
        _sampleRequestListeners.push(listener);
    }
    
    private function fireSampleRequest()
    {
        for (l in _sampleRequestListeners)
        {
            l();
        }
    }
 
    public function addFinishedListener(listener:Void->Void):Void
    {
        _finishedListeners.push(listener);
    }
    
    private function fireFinished()
    {
        for (l in _finishedListeners)
        {
            l();
        }
    }
    
    public function addSamples(samples:FixedArray<Float32>)
    {
        _workerSelf.postMessage( { cmd: 'playerAddSamples', samples: samples } );        
    }
    
    public function play() 
    {
        _workerSelf.postMessage( { cmd: 'playerPlay' } );
    }   
    
    public function pause() 
    {
        _workerSelf.postMessage( { cmd: 'playerPause' } );
    }
    
    public function stop() 
    {
        _workerSelf.postMessage( { cmd: 'playerStop' } );
    }
    
    public function seek(position:Int) 
    {
        _workerSelf.postMessage( { cmd: 'playerSeek', pos: position } );
    }
}