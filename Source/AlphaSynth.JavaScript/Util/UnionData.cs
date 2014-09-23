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
using System.Runtime.CompilerServices;

namespace AlphaSynth.Util
{
    [IgnoreNamespace]
    [Imported(ObeysTypeSystem = true)]
    [ScriptName("DataView")]
    public class UnionData
    {
        //double values
        public double Double1
        {
            [InlineCode("{this}.getFloat64(0, true)")]
            get { return 0; }
        }
        //float values
        public double Float1
        {
            [InlineCode("{this}.getFloat32(0, true)")]
            get { return 0; }
        }
        public double Float2
        {
            [InlineCode("{this}.getFloat32(4, true)")]
            get { return 0; }
        }
        //int values
        public double Int1
        {
            [InlineCode("{this}.getInt32(0, true)")]
            get { return 0; }
        }
        public double Int2
        {
            [InlineCode("{this}.getInt32(4, true)")]
            get { return 0; }
        }

        [InlineCode("new DataView(new ArrayBuffer(8))")]
        public UnionData()
        {
        }
    }
}
