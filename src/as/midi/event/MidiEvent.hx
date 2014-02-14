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
package as.midi.event;

import as.platform.Types.Byte;
import haxe.Serializer;
import haxe.Unserializer;

class MidiEvent
{
    private var _message:Int;
    
    public var deltaTime:Int;
    
    public function getChannel() : Int
    {
        return _message & 0x000000F;
    }
    
    public function getCommand() : Int
    {
        return _message & 0x00000F0;
    }
    
    public function getData1() : Int
    {
        return  (_message & 0x000FF00) >> 8;
    }
    
    public function getData2() : Int
    {
        return  (_message & 0x0FF0000) >> 16;
    }
    
    public function new(delta:Int, status:Int, data1:Byte, data2:Byte)
    {
        deltaTime = delta;
        _message = status | (data1 << 8) | (data2 << 16);
    }
}