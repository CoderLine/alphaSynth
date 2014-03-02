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
package as.bank;
import as.ds.FixedArray.FixedArray;
import as.ds.SampleArray;
import as.platform.Types.Float32;
import as.platform.Types.Short;
import as.sf2.SampleHeader;
import as.sf2.SoundFontSampleData;

class SampleDataAsset
{
    public var name:String;
    public var channels:Int;
    public var sampleRate:Int;
    public var rootKey:Short;
    public var tune:Short;
    public var start:Float32;
    public var end:Float32;
    public var loopStart:Float32;
    public var loopEnd:Float32;
    public var sampleData:SampleArray;
    
    public function new(sample:SampleHeader, sampleData:SoundFontSampleData)
    {
        channels = 1;
        
        name = sample.name;
        sampleRate = sample.sampleRate;
        rootKey = cast sample.rootKey;
        tune = sample.tune;
        start = sample.start;
        end = sample.end;
        loopStart = sample.startLoop;
        loopEnd = sample.endLoop;
        this.sampleData = sampleData.sampleData;
    }
}