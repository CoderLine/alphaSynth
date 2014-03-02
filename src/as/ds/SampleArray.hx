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
package as.ds;

import as.ds.SampleArray.SampleArrayData;
import as.platform.Types.Float32;
import haxe.Serializer;
import haxe.Unserializer;

#if flash
typedef SampleArrayData = flash.Vector<Float32>;
#elseif js
typedef SampleArrayData = as.util.TypedArrays.Float32Array;
#end

@:arrayAccess
abstract SampleArray(SampleArrayData)
{
    public inline function new(length:Int)
    {
        #if flash 
        this = new flash.Vector<Float32>(length, true);
        #else
        this = new as.util.TypedArrays.Float32Array(length);
        #end
    }
    
    public inline function get(index:Int):Float32 
    {
		return this[index];
	}

	public inline function set(index:Int, val:Float32):Float32 
    {
		return this[index] = val;
	}
    
	public var length(get, never):Int;
	inline function get_length():Int 
    {
        return this.length;
	}
    
    public inline function toData() : SampleArrayData
    {
        return cast this;
    }

	public static inline function blit<T>(src:SampleArray, srcPos:Int, dest:SampleArray, destPos:Int, len:Int):Void
	{
        #if js
        dest.toData().set(src.toData().subarray(srcPos, srcPos + len), destPos);
        #else
        for (i in 0...len)
        {
            dest[destPos + i] = src[srcPos + i];
        }        
        #end        
	}

	public static inline function fromArrayCopy(array:Array<Float32>):SampleArray
    {
        #if js
        return cast new as.util.TypedArrays.Float32Array(array);
        #else 
        var copy = new SampleArray(array.length);
        for (i in 0 ... array.length)
        {
            copy[i] = array[i];
        }
        return copy;
        #end
	}
    
    public static inline function serialize<T>(v:SampleArray) : String
    {
        var s = new Serializer();
        s.serialize(v.length);
        for (i in 0 ... v.length)
        {
            s.serialize(v.get(i));
        }
        return s.toString();
    }
    
    public static inline function unserialize<T>(data:String) : SampleArray
    {
        var s = new Unserializer(data);
        var length:Int = s.unserialize();
        var v = new SampleArray(length);
        for (i in 0 ... length)
        {
            v.set(i, s.unserialize());
        }
        return v;
    } 
}