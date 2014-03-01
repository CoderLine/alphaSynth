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

class SynthPlayerEventDispatcher implements ISynthPlayerListener
{
    private var _listeners:Array<ISynthPlayerListener>;
    public function new() 
    {
        _listeners = new Array<ISynthPlayerListener>();
    }
    
    public function onPositionChanged(currentTime:Int, endTime:Int, currentTick:Int, endTick:Int) : Void
    {
        for (l in _listeners) l.onPositionChanged(currentTime, endTime, currentTick, endTick);
    }
    
    public function onPlayerStateChanged(state:SynthPlayerState) : Void
    {
        for (l in _listeners) l.onPlayerStateChanged(state);
    }
    
    public function onFinished() : Void
    {
        for (l in _listeners) l.onFinished();
    }
    
    public function onSoundFontLoad(loaded:Int, full:Int) : Void
    {
        for (l in _listeners) l.onSoundFontLoad(loaded, full);
    }
    
    public function onSoundFontLoaded() : Void
    {
        for (l in _listeners) l.onSoundFontLoaded();
    }
    
    public function onSoundFontLoadFailed() : Void
    {
        for (l in _listeners) l.onSoundFontLoadFailed();
    }
    
    public function onMidiLoad(loaded:Int, full:Int) : Void
    {
        for (l in _listeners) l.onMidiLoad(loaded, full);
    }
    
    public function onMidiLoaded() : Void
    {
        for (l in _listeners) l.onMidiLoaded();
    }
    
    public function onMidiLoadFailed() : Void
    {
        for (l in _listeners) l.onMidiLoadFailed();
    }
    
    public function onReadyForPlay() : Void
    {
        for (l in _listeners) l.onReadyForPlay();
    }
    
    public function add(listener:ISynthPlayerListener)
    {
        _listeners.push(listener);
    }
}