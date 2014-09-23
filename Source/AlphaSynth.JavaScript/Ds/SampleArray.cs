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

namespace AlphaSynth.Ds
{
    [IncludeGenericArguments(false)]
    [IgnoreNamespace]
    [Imported(ObeysTypeSystem = true)]
    [ScriptName("Float32Array")]
    public class SampleArray
    {
        [InlineCode("new Float32Array({length})")]
        public SampleArray(int length)
        {
        }

        [IntrinsicProperty]
        public float this[int index]
        {
            get
            {
                return 0;
            }
            set
            {
            }
        }

        [ScriptName("length")]
        public int Length
        {
            get
            {
                return 0;
            }
        }

        [InlineCode("{this} = new Float32Array()")]
        public void Clear()
        {
        }

        [InlineCode("{src}.set({dest}.subarray({srcPos}, {srcPos} + {len}), {destPos})")]
        public static void Blit(SampleArray src, int srcPos, SampleArray dest, int destPos, int len)
        {
        }
    }
}
