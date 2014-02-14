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

import as.platform.Types.TypeUtils;
import haxe.io.BytesInput;

class Generator
{
    private var _rawAmount:Int; /*ushort*/
    
    public var generatorType:Int;
    
    public var amountInt16(get, set):Int;
    private inline function get_amountInt16() : Int
    {
        return TypeUtils.ToInt16(_rawAmount);
    }
    private inline function set_amountInt16(v:Int) : Int
    {
        return _rawAmount = TypeUtils.ToInt16(v);
    }
    
    public var lowByteAmount(get, set):Int;
    private inline function get_lowByteAmount() : Int
    {
        return TypeUtils.ToUInt8(_rawAmount & 0x00FF);
    }
    private inline function set_lowByteAmount(v:Int) : Int
    {
        return _rawAmount = ( (_rawAmount & 0xFF00) + TypeUtils.ToUInt8(v));
    }
    
    public var highByteAmount(get, set):Int;
    private inline function get_highByteAmount() : Int
    {
        return TypeUtils.ToUInt8((_rawAmount & 0xFF00) >> 8);
    }
    private inline function set_highByteAmount(v:Int) : Int
    {
        return _rawAmount = ( (_rawAmount & 0x00FF) + (TypeUtils.ToUInt8(v) << 8));
    }
    
    public function new(input:BytesInput) 
    {
        generatorType = input.readUInt16();
        _rawAmount = input.readUInt16();
    }
}