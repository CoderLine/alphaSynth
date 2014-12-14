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

using SharpKit.JavaScript;

namespace AlphaSynth.Platform
{
    public class TypeUtils
    {
        public static readonly bool IsLittleEndian = true;

        [JsMethod(InlineCodeExpression = "i")]
        public static uint ToUInt32(int i)
        {
            return (uint) i;
        }

        [JsMethod(InlineCodeExpression = "((((i & 65535) >> 15) * ( -65536)) + (i & 65535))")]
        public static short ToInt16(int i)
        {
            return (short) i;
        }

        [JsMethod(InlineCodeExpression = "(i & 65535)")]
        public static ushort ToUInt16(int i)
        {
            return (ushort)i;
        }

        [JsMethod(InlineCodeExpression = "(i & 255)")]
        public static byte ToUInt8(int i)
        {
            return (byte)i;
        }

        public static void ClearIntArray(int[] array)
        {
            for (int i = 0; i < array.Length; i++)
            {
                array[i] = 0;
            }
        }

        public static void ClearShortArray(short[] array)
        {
            for (int i = 0; i < array.Length; i++)
            {
                array[i] = 0;
            }
        }
    }
}
