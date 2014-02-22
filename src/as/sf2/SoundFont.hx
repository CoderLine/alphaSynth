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
package as.sf2;
import as.util.IOHelper;
import haxe.io.BytesInput;

class SoundFont
{
    public var info(default, null):SoundFontInfo;
    public var sampleData(default, null):SoundFontSampleData;
    public var presets(default, null):SoundFontPresets;
    
    public function new() 
    {
    }
    
    public function load(input:BytesInput)
    {
        var id = IOHelper.read8BitChars(input, 4);
        var size = input.readInt32();
        if (id.toLowerCase() != "riff")
            throw ("Invalid soundfont. Could not find RIFF header.");
        id = IOHelper.read8BitChars(input, 4);
        if (id.toLowerCase() != "sfbk")
            throw ("Invalid soundfont. Riff type is invalid.");
         
        Console.debug('Reading info chunk');
        info = new SoundFontInfo(input);
        Console.debug('Reading sampledata chunk');
        sampleData = new SoundFontSampleData(input);
        Console.debug('Reading preset chunk');
        presets = new SoundFontPresets(input);
    }
    
}