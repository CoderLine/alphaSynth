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
import as.platform.Types.TypeUtils;
import haxe.Serializer;
import haxe.Unserializer;

// todo abstract for javascript
typedef FixedArrayData<T> = haxe.ds.Vector<T>;

@:arrayAccess
abstract FixedArray<T>(FixedArrayData<T>) 
{
	public inline function new(length:Int) 
    {
        this = new haxe.ds.Vector<T>(length);
	}
    
	public inline function get(index:Int):Null<T> 
    {
		return this[index];
	}

	public inline function set(index:Int, val:T):T 
    {
		return this[index] = val;
	}
    
    public inline function clone() : FixedArray<T>
    {
        #if flash
        return cast this.toData().slice();
        #elseif js
        return cast this.toData().slice(0);
        #elseif cs
        var c = new new haxe.ds.Vector<T>(length);
        this.toData().CopyTo(c, 0);
        return c;
        #end
    }

	public var length(get, never):Int;
	inline function get_length():Int 
    {
        return this.length;
	}

	public static inline function blit<T>(src:FixedArray<T>, srcPos:Int, dest:FixedArray<T>, destPos:Int, len:Int):Void
	{
        haxe.ds.Vector.blit(untyped src, srcPos, untyped dest, destPos, len);
	}

	public static inline function fromArrayCopy<T>(array:Array<T>):FixedArray<T> 
    {
        return untyped haxe.ds.Vector.fromArrayCopy(array);
	}
    
    public static inline function serialize<T>(v:FixedArray<T>) : String
    {
        var s = new Serializer();
        s.serialize(v.length);
        for (i in 0 ... v.length)
        {
            s.serialize(v.get(i));
        }
        return s.toString();
    }
    
    public static inline function unserialize<T>(data:String) : FixedArray<T>
    {
        var s = new Unserializer(data);
        var length:Int = s.unserialize();
        var v = new FixedArray<T>(length);
        for (i in 0 ... length)
        {
            v.set(i, s.unserialize());
        }
        return v;
    }
}