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
package as.platform;

import as.ds.FixedArray.FixedArray;
import haxe.io.Bytes;
import haxe.Serializer;
import haxe.Unserializer;

#if cs
typedef Byte = cs.StdTypes.UInt8;
#elseif java
typedef Byte = java.Int8;
#else
typedef Byte = Int;
#end

#if cs
typedef Short = cs.StdTypes.Int16;
#elseif java
typedef Short = java.Int16;
#else
typedef Short = Int;
#end

#if (cs || java)
typedef Float32 = Float;
#else
typedef Float32 = Float;
#end

#if cs 
@:native("System.Array")
@:nativeGen
extern class CsArray 
{
    public static function Clear(a:CsArray, start:Int, length:Int) : Void;
}

#end

class TypeUtils
{
    public static inline var IntMax = 2147483647; 
    public static var IsLittleEndian(default, null):Bool;

    public static function __init__()
    {
        #if cs
        IsLittleEndian = true; // BitConverter.IsLittleEndian
        #else
        IsLittleEndian = true;
        #end
    }
    
    public static inline function clearIntArray(a:FixedArray<Int>)
    {
		#if cs
            CsArray.Clear(cast a, 0, a.length);
		#else
			for (i in 0... a.length)
			{
                a.set(i, 0);
			}
		#end
    }
    
    public static inline function clearFloat32Array(a:FixedArray<Float32>)
    {
		#if cs
            CsArray.Clear(cast a, 0, a.length);
		#else
			for (i in 0... a.length)
			{
                a.set(i, 0.0);
			}
		#end
    }
    public static inline function clearObjectArray<T>(a:FixedArray<T>)
    {
		#if cs
            CsArray.Clear(cast a, 0, a.length);
		#else
			for (i in 0... a.length)
			{
                a.set(i, null);
			}
		#end
    }
    
    public static function ToInt8(v:Int)
    {
        return ((((v & 255) >> 7) * ( -256)) + (v & 255));
    }
    
    public static function ToUInt8(v:Int)
    {
        return (v & 255);
    }
    
    public static function ToInt16(v:Int)
    {
        return ((((v & 65535) >> 15) * ( -65536)) + (v & 65535));
    }
    
    public static function ToUInt16(v:Int)
    {
        return (v & 65535);
    }
    
    public static function byteArrayFromArray(array:Array<Byte>) : Bytes
    {
        var bytes = Bytes.alloc(array.length);
        for (i in 0 ... array.length) bytes.set(i, array[i]);
        return bytes;
    }
}