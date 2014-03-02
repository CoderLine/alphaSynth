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

interface IAlphaSynth
{
    /**
     * Starts the playback if possible
     */    
    public function play() : Void;
    
    /**
     * Pauses the playback if was running
     */
    public function pause() : Void;
    
    /**
     * Starts the playback if possible, pauses the playback if was running
     */
    public function playPause() : Void;
    
    /**
     * Stopps the playback
     */
    public function stop() : Void;
    
    /**
     * Moves to the given tick position within the song
     * @param tick the midi tick position to jump at
     */
    public function setPositionTick(tick:Int) : Void;
    
    /**
     * Moves to the given millisecond position within the song
     * @param millis the millisecond position to jump at
     */
    public function setPositionTime(millis:Int) : Void;
    
    /**
     * Loads a soundfont from the given url
     * @param url the url to load the soundfont from
     */
    public function loadSoundFontUrl(url:String) : Void;
    
    /**
     * Loads a soundfont from the given data
     * @param data a serialized haxe.io.Bytes 
     */
    public function loadSoundFontData(data:String) : Void;
    
    /**
     * Loads a midi from the given url
     * @param url the url to load the midi from
     */
    public function loadMidiUrl(url:String) : Void;
    
    /**
     * Loads a midi from the given data
     * @param data a serialized haxe.io.Bytes 
     */
    public function loadMidiData(data:String) : Void;
    
    /**
     * Sets the logging level which alphaTab should use.
     * @param level the logging level (0 - log, 1 - debug, 2 - info, 3 - warn, 4 - error, 5 - off)
     */
    public function setLogLevel(level:Int) : Void;
}