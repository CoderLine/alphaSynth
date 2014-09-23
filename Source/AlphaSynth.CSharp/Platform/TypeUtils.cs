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
using System;

namespace AlphaSynth.Platform
{
    public class TypeUtils
    {
        public static readonly bool IsLittleEndian = BitConverter.IsLittleEndian;

        public static uint ToUInt32(int i)
        {
            return (uint) i;
        }

        public static short ToInt16(int i)
        {
            return (short) i;
        }

        public static ushort ToUInt16(int i)
        {
            return (ushort) i;
        }

        public static byte ToUInt8(int i)
        {
            return (byte) i;
        }

        public static void ClearIntArray(int[] array)
        {
            Array.Clear(array, 0, array.Length);
        }

        public static void ClearShortArray(short[] array)
        {
            Array.Clear(array, 0, array.Length);
        }
    }
}
