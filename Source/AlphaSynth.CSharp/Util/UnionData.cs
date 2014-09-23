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
using System.Runtime.InteropServices;

namespace AlphaSynth.Util
{
    [StructLayout(LayoutKind.Explicit)]
    public struct UnionData
    {
        //double values
        [FieldOffset(0)]
        public double Double1;
        //float values
        [FieldOffset(0)]
        public float Float1;
        [FieldOffset(4)]
        public float Float2;
        //int values
        [FieldOffset(0)]
        public int Int1;
        [FieldOffset(4)]
        public int Int2;
    }
}
