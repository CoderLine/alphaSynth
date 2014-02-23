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
import as.player.SynthPlayerState;

/**
 * Adds some getters to the IAlphaSynth interface. 
 * The return values are provided directly as return value
 */
interface IAlphaSynthSync extends IAlphaSynth
{
    /**
     * Is ready for play
     */    
    public function isReadyForPlay() : Bool;
    
    /**
     * Returns the current player state
     * @return the current player state
     */
    public function getState() : SynthPlayerState;
    
    /**
     * Returns whether the soundfont was loaded and parsed
     * @return true if the soundfont was loaded and parsed
     */    
    public function isSoundFontLoaded() : Bool;
    
    /**
     * Returns whether the midi data was loaded and parsed
     * @return true if the midi data was loaded and parsed
     */    
    public function isMidiLoaded() : Bool;
}