﻿/*
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
using AlphaSynth.Util;

namespace AlphaSynth.Sf2
{
    public class SoundFont
    {
        [IntrinsicProperty]
        public SoundFontInfo Info { get; set; }
        [IntrinsicProperty]
        public SoundFontSampleData SampleData { get; set; }
        [IntrinsicProperty]
        public SoundFontPresets Presets { get; set; }

        public void Load(IReadable input)
        {
            var id = input.Read8BitChars(4);
            var size = input.ReadInt32LE();
            if (id.ToLower() != "riff")
                throw new Exception("Invalid soundfont. Could not find RIFF header.");
            id = input.Read8BitChars(4);
            if (id.ToLower() != "sfbk")
                throw new Exception("Invalid soundfont. Riff type is invalid.");

            Logger.Debug("Reading info chunk");
            Info = new SoundFontInfo(input);
            Logger.Debug("Reading sampledata chunk");
            SampleData = new SoundFontSampleData(input);
            Logger.Debug("Reading preset chunk");
            Presets = new SoundFontPresets(input);
        }
    }
}
