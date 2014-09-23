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
using System.Globalization;
using AlphaSynth.IO;

namespace AlphaSynth.Platform
{
    public class Std
    {
        public static int ParseInt(int s)
        {
            return s;
        }

        public static int ParseInt(string s)
        {
            int f;
            if (!Int32.TryParse(s, NumberStyles.Integer, CultureInfo.InvariantCulture, out f))
            {
                f = 0;
            }
            return f;
        }
        public static string StringFromCharCode(int c)
        {
            return ((char)c).ToString();
        }

        private static readonly Random Seed = new Random();
        public static double Random()
        {
            return Seed.NextDouble();
        }

        public static void BlockCopy(ByteArray src, int srcOffset, ByteArray dst, int dstOffset, int count)
        {
            Buffer.BlockCopy(src.Data, srcOffset, dst.Data, dstOffset, count);
        }

        public static void ArrayCopy<T>(T[] src, int srcOffset, T[] dst, int dstOffset, int count)
        {
            Array.Copy(src, srcOffset, dst, dstOffset, count);
        }

        public static void Reverse(ByteArray array)
        {
            Array.Reverse(array.Data);
        }
    }
}
