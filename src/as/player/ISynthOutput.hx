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
import as.ds.SampleArray;
import as.platform.Types.Float32;

/**
 * Classes implementing this functions can be used by 
 * the SynthPlayer to actually play the generated audio.
 */
interface ISynthOutput
{
    /**
     * Gets called as soon the midi sequencer
     * is finished.
     */
    function sequencerFinished():Void;
    
    /**
     * Adds a new listener method which gets called
     * as the play position changed.
     * @param listener the listener to add
     */ 
    function addPositionChangedListener(listener:Int->Void):Void;
    
    /**
     * Adds a new listener method which gets called
     * as the synth output finished the playback.
     * @param listener
     */
    function addFinishedListener(listener:Void->Void):Void;
    
    /**
     * Tells the synth output to start playing the output 
     */
    function play():Void;
    
    /**
     * Tells the synth output to pause the playback
     */
    function pause():Void;
    
    /**
     * Tells the synth output to stop the playback and jump back to the
     * beginning
     */
    function stop():Void;
    
    /**
     * Adds new audio samples to the output buffer 
     */
    function addSamples(samples:SampleArray):Void;
        
    /**
     * Adds a new listener method which gets called
     * if the synthesizer should fill a new sample buffer. 
     * @param listener
     */
    function addSampleRequestListener(listener:Void->Void):Void;
    
    /**
     * Seeks to the specified millisecond position
     * @param position the millisecond position to seek at
     */
    function seek(position:Int):Void;

}