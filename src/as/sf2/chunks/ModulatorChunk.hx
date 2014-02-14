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
package as.sf2.chunks;

import as.ds.FixedArray.FixedArray;
import as.sf2.Modulator;
import haxe.io.BytesInput;

class ModulatorChunk extends Chunk
{
    public var modulators(default, null):FixedArray<Modulator>;
    
    public function new(id:String, size:Int, input:BytesInput) 
    {
        super(id, size);
        if (size % 10 != 0)
            throw ("Invalid SoundFont. The presetzone chunk was invalid.");
        modulators = new FixedArray<Modulator>(Std.int((size / 10.0) - 1));
        for (x in 0 ... modulators.length)
        {
            modulators[x] = new Modulator(input);
        }
        new Modulator(input); //terminal record
    }
}