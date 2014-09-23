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
using AlphaSynth.Bank.Components;

namespace AlphaSynth.Bank.Descriptors
{
    public class FilterDescriptor
    {
        [IntrinsicProperty]
        public FilterType FilterMethod { get; set; }
        [IntrinsicProperty]
        public float CutOff { get; set; }
        [IntrinsicProperty]
        public float Resonance { get; set; }
        [IntrinsicProperty]
        public short RootKey { get; set; }
        [IntrinsicProperty]
        public short KeyTrack { get; set; }
        [IntrinsicProperty]
        public short VelTrack { get; set; }

        public FilterDescriptor()
        {
            FilterMethod = FilterType.None;
            CutOff = -1;
            Resonance = 1;
            RootKey = 60;
            KeyTrack = 0;
            VelTrack = 0;
        }
    }
}
