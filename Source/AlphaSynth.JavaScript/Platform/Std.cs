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
using System.Runtime.CompilerServices;
using AlphaSynth.IO;

namespace AlphaSynth.Platform
{
    public class Std
    {
        public const bool IsLittleEndian = true;

        public static int ParseInt(string s)
        {
            int f;
            if (!int.TryParse(s, out f))
            {
                f = 0;
            }
            return f;
        }

        [InlineCode("String.fromCharCode({c})")]
        public static string StringFromCharCode(int c)
        {
            return "";
        }

        public static double Random()
        {
            return Math.Random();
        }

        [InlineCode("{dst}.set({src}.subarray({srcOffset}, {srcOffset} + {count}), {dstOffset})")]
        public static void BlockCopy(ByteArray src, int srcOffset, ByteArray dst, int dstOffset, int count)
        {
        }

        public static void ArrayCopy<T>(T[] src, int srcOffset, T[] dst, int dstOffset, int count)
        {
            for (int i = 0; i < count; i++)
            {
                dst[dstOffset + i] = src[srcOffset + i];
            }
        }

        public static void Reverse(ByteArray array)
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
