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

namespace AlphaSynth.Bank.Descriptors
{
    public class EnvelopeDescriptor
    {
        [IntrinsicProperty]
        public float DelayTime { get; set; }
        [IntrinsicProperty]
        public float AttackTime { get; set; }
        [IntrinsicProperty]
        public short AttackGraph { get; set; }
        [IntrinsicProperty]
        public float HoldTime { get; set; }
        [IntrinsicProperty]
        public float DecayTime { get; set; }
        [IntrinsicProperty]
        public short DecayGraph { get; set; }
        [IntrinsicProperty]
        public float SustainTime { get; set; }
        [IntrinsicProperty]
        public float ReleaseTime { get; set; }
        [IntrinsicProperty]
        public short ReleaseGraph { get; set; }
        [IntrinsicProperty]
        public float SustainLevel { get; set; }
        [IntrinsicProperty]
        public float PeakLevel { get; set; }
        [IntrinsicProperty]
        public float StartLevel { get; set; }
        [IntrinsicProperty]
        public float Depth { get; set; }
        [IntrinsicProperty]
        public float Vel2Delay { get; set; }
        [IntrinsicProperty]
        public float Vel2Attack { get; set; }
        [IntrinsicProperty]
        public float Vel2Hold { get; set; }
        [IntrinsicProperty]
        public float Vel2Decay { get; set; }
        [IntrinsicProperty]
        public float Vel2Sustain { get; set; }
        [IntrinsicProperty]
        public float Vel2Release { get; set; }
        [IntrinsicProperty]
        public float Vel2Depth { get; set; }

        public EnvelopeDescriptor()
        {
            DelayTime = 0;
            AttackTime = 0;
            AttackGraph = 1;
            HoldTime = 0;
            DecayTime = 0;
            DecayGraph = 1;
            SustainTime = 3600;
            ReleaseTime = 0;
            ReleaseGraph = 1;
            SustainLevel = 0;
            PeakLevel = 1;
            StartLevel = 0;
            Depth = 1;
            Vel2Delay = 0;
            Vel2Attack = 0;
            Vel2Hold = 0;
            Vel2Decay = 0;
            Vel2Sustain = 0;
            Vel2Release = 0;
            Vel2Depth = 0;
        }
    }
}
