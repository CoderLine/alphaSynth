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

interface ISynthPlayerListener
{
    public function onPositionChanged(currentTime:Int, endTime:Int, currentTick:Int, endTick:Int) : Void;
    public function onFinished() : Void;
    public function onSoundFontLoad(loaded:Int, full:Int) : Void;
    public function onSoundFontLoaded() : Void;
    public function onSoundFontLoadFailed() : Void;
    public function onMidiLoad(loaded:Int, full:Int) : Void;
    public function onMidiLoaded() : Void;
    public function onMidiLoadFailed() : Void;
    public function onReadyForPlay() : Void;
}