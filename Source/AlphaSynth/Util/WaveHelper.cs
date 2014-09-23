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
using AlphaSynth.IO;
using AlphaSynth.Platform;

namespace AlphaSynth.Util
{
    public class WaveHelper
    {
        public static void SwapEndianess(ByteArray data, int bits)
        {
            bits /= 8; //get bytes per sample
            var swapArray = new ByteArray(bits);
            for (int x = 0; x < data.Length; x += bits)
            {
                Std.BlockCopy(data, x, swapArray, 0, bits);
                Std.Reverse(swapArray);
                Std.BlockCopy(swapArray, 0, data, x, bits);
            }
        }
    }
}