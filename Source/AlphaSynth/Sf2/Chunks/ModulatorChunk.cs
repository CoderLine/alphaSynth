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

namespace AlphaSynth.Sf2.Chunks
{
    public class ModulatorChunk : Chunk
    {
        public Modulator[] Modulators { get; set; }

        public ModulatorChunk(string id, int size, IReadable input)
            : base(id, size)
        {
            if(size % 10 != 0)
                throw new Exception("Invalid SoundFont. The presetzone chunk was invalid.");
            Modulators = new Modulator[(size/10) - 1];
            for (int x = 0; x < Modulators.Length; x++)
            {
                Modulators[x] = new Modulator(input);
            }
            new Modulator(input);
        }
    }
}
