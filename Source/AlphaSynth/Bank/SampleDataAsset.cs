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
using AlphaSynth.Sf2;
using AlphaSynth.Util;

namespace AlphaSynth.Bank
{
    public class SampleDataAsset
    {
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public int Channels { get; set; }
        [IntrinsicProperty]
        public int SampleRate { get; set; }
        [IntrinsicProperty]
        public short RootKey { get; set; }
        [IntrinsicProperty]
        public short Tune { get; set; }
        [IntrinsicProperty]
        public float Start { get; set; }
        [IntrinsicProperty]
        public float End { get; set; }
        [IntrinsicProperty]
        public float LoopStart { get; set; }
        [IntrinsicProperty]
        public float LoopEnd { get; set; }
        [IntrinsicProperty]
        public PcmData SampleData { get; set; }

        public SampleDataAsset(SampleHeader sample, SoundFontSampleData sampleData)
        {
            Channels = 1;

            Name = sample.Name;
            SampleRate = sample.SampleRate;
            RootKey = sample.RootKey;
            Tune = sample.Tune;
            Start = sample.Start;
            End = sample.End;
            LoopStart = sample.StartLoop;
            LoopEnd = sample.EndLoop;
            SampleData = PcmData.Create(sampleData.BitsPerSample, sampleData.SampleData, true);
        }
    }
}
