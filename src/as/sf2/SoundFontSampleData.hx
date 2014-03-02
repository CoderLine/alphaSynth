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

import as.ds.FixedArray.FixedArray;
import as.ds.SampleArray;
import as.platform.Types.Float32;
import as.platform.Types.TypeUtils;
import as.util.IOHelper;
import haxe.io.Bytes;
import haxe.io.BytesInput;

class SoundFontSampleData
{
    public var bitsPerSample(default, null):Int;
    public var sampleData(default, null):SampleArray;
    
    public function new(input:BytesInput) 
    {
        var id = IOHelper.read8BitChars(input, 4);
        var size = input.readInt32();
        if(id.toLowerCase() != "list")
            throw ("Invalid soundfont. Could not find sdta LIST chunk.");
        var readTo = input.position + size;
        id = IOHelper.read8BitChars(input, 4);
        if(id.toLowerCase() != "sdta")
            throw ("Invalid soundfont. The LIST chunk is not of type sdta."); 
            
        bitsPerSample = 0;
        var rawSampleData:Bytes = null;
        while (input.position < readTo)
        {
            var subID = IOHelper.read8BitChars(input, 4);
            var size = input.readInt32();
            switch (subID.toLowerCase())
            {
                case "smpl":
                    bitsPerSample = 16;
                    rawSampleData = input.read(size);
                    sampleData = new SampleArray(Std.int(rawSampleData.length / 2));
                    TypeUtils.clearSampleArray(sampleData);
                case "sm24":
                    if (rawSampleData == null || size != Std.int(Math.ceil(sampleData.length / 2.0)))
                    {//ignore this chunk if wrong size or if it comes first
                        input.read(size);
                    }
                    else
                    {
                        bitsPerSample = 24;
                        for (x in 0 ... sampleData.length)
                        {
                            var b = Bytes.alloc(3);
                            b.set(0, input.readByte());
                            b.set(1, rawSampleData.get(2 * x));
                            b.set(2, rawSampleData.get(2 * x + 1));
                            sampleData[x] = IOHelper.readInt24(b, 0) / 8388608;
                        }
                    }
                    if (size % 2 == 1)
                    {
                        if (input.readByte() != 0) input.position--;
                    }
                default:
                    throw ("Invalid soundfont. Unknown chunk id: " + subID + ".");
            }
        }
        
        if (bitsPerSample == 16)
        {
            for (x in 0 ... sampleData.length)
            {
                sampleData[x] = IOHelper.readInt16(rawSampleData, 2 * x) / 32768.0;
            }
        }
        else if (bitsPerSample != 24)
            throw ("Only 16 and 24 bit samples are supported.");

    }
    
}