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
}