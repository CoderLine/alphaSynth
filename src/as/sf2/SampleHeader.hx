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

import as.platform.Types.Byte;
import as.platform.Types.Short;
import as.platform.Types.TypeUtils;
import as.util.IOHelper;
import haxe.Int64;
import haxe.io.BytesInput;

class SampleHeader
{
    public var name:String;
    public var start(default, null):Int;
    public var end(default, null):Int;
    public var startLoop(default, null):Int;
    public var endLoop(default, null):Int;
    public var sampleRate(default, null):Int;
    public var rootKey(default, null):Byte;
    public var tune(default, null):Short;
    public var sampleLink(default, null):Short;
    public var soundFontSampleLink(default, null):Short;
    
    public function new(input:BytesInput) 
    {
        name = IOHelper.read8BitStringLength(input, 20);
        start = input.readInt32();
        end = input.readInt32();
        startLoop = input.readInt32();
        endLoop = input.readInt32();
        sampleRate = input.readInt32();
        rootKey = input.readByte();
        tune = cast TypeUtils.ToInt8(input.readByte());
        sampleLink = cast input.readUInt16();
        soundFontSampleLink = cast input.readUInt16();
    }
}