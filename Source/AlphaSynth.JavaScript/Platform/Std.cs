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
    public class Std
    {
        public const bool IsLittleEndian = true;

        public static int ParseInt(string s)
        {
            int f = JsContext.parseInt(s);
            if (JsContext.isNaN(f))
            {
                f = 0;
            }
            return f;
        }

        [JsMethod(InlineCodeExpression = "String.fromCharCode(c)")]
        public static string StringFromCharCode(int c)
        {
            return "";
        }

        public static double Random()
        {
            return JsMath.random();
        }

        [JsMethod(InlineCodeExpression = "dst.set(src.subarray(srcOffset, srcOffset + count), dstOffset)")]
        public static void BlockCopy(byte[] src, int srcOffset, byte[] dst, int dstOffset, int count)
        {
        }

        public static void ArrayCopy<T>(T[] src, int srcOffset, T[] dst, int dstOffset, int count)
        {
            for (int i = 0; i < count; i++)
            {
                dst[dstOffset + i] = src[srcOffset + i];
            }
        }

        public static void Reverse(byte[] array)
        {
            var i = 0;
            var j = array.Length - 1;
            while (i < j)
            {
                var t = array[i];
                array[i] = array[j];
                array[j] = t;
                i++;
                j--;
            }
        }
    }
}
