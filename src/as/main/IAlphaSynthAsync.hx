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
package as.main;

import as.player.SynthPlayerState;

/**
 * Adds some getters to the IAlphaSynth interface. 
 * The return values are reported asynchronously via event.
 */
interface IAlphaSynthAsync extends IAlphaSynth
{
    /**
     * Is ready for play
     * @return true if the player is ready for play, otherwise false
     */    
    public function isReadyForPlay() : Void;
    
    /**
     * Returns the current player state
     * @return the current player state
     */
    public function getState() : Void;
    
    /**
     * Returns whether the soundfont was loaded and parsed
     * @return true if the soundfont was loaded and parsed
     */    
    public function isSoundFontLoaded() : Void;
    
    /**
     * Returns whether the midi data was loaded and parsed
     * @return true if the midi data was loaded and parsed
     */    
    public function isMidiLoaded() : Void;
    
    /**
     * Adds a new event listener to events
     */
    public function on(events:String, fn:Dynamic):Void;
    
    public function startup():Void;
}