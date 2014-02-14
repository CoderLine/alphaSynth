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
package as.util;

import as.platform.Types.TypeUtils;
import haxe.Int64;
import haxe.io.Bytes;
import haxe.io.Input;


class IOHelper
{
    public static function read8BitChars(input:Input, length:Int) : String
    {
        var s = new StringBuf();
        for (i in 0 ... length)
            s.addChar(input.readByte());
        return s.toString();
    }
    
    public static function read8BitString(input:Input) : String
    {
        var s = new StringBuf();
        var c = input.readByte();
        while (c != 0)
        {
           s.addChar(c);
           c = input.readByte();
        }
        return s.toString();
    }
    
    public static function read8BitStringLength(input:Input, length:Int) : String
    {
        var s = new StringBuf();
        var z = -1;
        for (i in 0 ... length)
        {
            var c = input.readByte();
            if (c == 0 && z == -1) z = i;
            s.addChar(c);
        }
            
        var t = s.toString();
        if (z >= 0)
            return t.substring(0, z);
        return t;
    }
    
    public static function readSInt8(input:Input) : Int
    {
        var v = input.readByte();
		return cast ((((v & 255) >> 7) * ( -256)) + (v & 255)); 
    }
    
    public static function readUInt32(input:Input) : Int64
    {
		var ch1 = input.readByte();
		var ch2 = input.readByte();
		var ch3 = input.readByte();
		var ch4 = input.readByte();
        
        var b1 = Int64.make(0, input.bigEndian ? ch4 | (ch3 << 8) : ch1 | (ch2 << 8));
        var b2 = Int64.shl(Int64.make(0, input.bigEndian ? (ch2 << 16) | (ch1 << 24)  : (ch3 << 16) | (ch4 << 24)), 16);
        
        return Int64.or(b1, b2);
    }
    
    public static function readInt24(input:Bytes, index:Int)
    {
        var i:Int;
        if (TypeUtils.IsLittleEndian)
        {
            i = input.get(index) | (input.get(index + 1) << 8) | (input.get(index + 2) << 16);
            if ((i & 0x800000) == 0x800000)
                i = i | (0xFF << 24);
        }
        else
        {
            i = (input.get(index) << 16) | (input.get(index + 1) << 8) | input.get(index + 2);
            if ((i & 0x100) == 0x100)
                i = i | 0xFF;
        }
        return i;
        
    }
    
    public static function readInt16(input:Bytes, index:Int)
        {
        if (TypeUtils.IsLittleEndian)
            return TypeUtils.ToInt16(input.get(index) | (input.get(index + 1) << 8));
        return TypeUtils.ToInt16((input.get(index) << 8) | input.get(index + 1));

        var i:Int;
        if (TypeUtils.IsLittleEndian)
        {
            i = input.get(index) | (input.get(index + 1) << 8) | (input.get(index + 2) << 16);
            if ((i & 0x800000) == 0x800000)
                i = i | (0xFF << 24);
        }
        else
        {
            i = (input.get(index) << 16) | (input.get(index + 1) << 8) | input.get(index + 2);
            if ((i & 0x100) == 0x100)
                i = i | 0xFF;
        }
        return i;
        
    }
}