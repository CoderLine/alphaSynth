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
using System.Runtime.CompilerServices;
using AlphaSynth.IO;
using AlphaSynth.Platform;
using AlphaSynth.Util;

namespace AlphaSynth.Sf2.Chunks
{
    public class PresetHeaderChunk : Chunk
    {
        private readonly RawPreset[] _rawPresets;

        public PresetHeaderChunk(string id, int size, IReadable input)
            : base(id, size)
        {
            if (size % 38 != 0)
                throw new Exception("Invalid SoundFont. The preset chunk was invalid.");

            _rawPresets = new RawPreset[((int)(size / 38.0))];
            RawPreset lastPreset = null;
            for (int x = 0; x < _rawPresets.Length; x++)
            {
                var p = new RawPreset();
                p.Name = input.Read8BitStringLength(20);
                p.PatchNumber = input.ReadUInt16LE();
                p.BankNumber = input.ReadUInt16LE();
                p.StartPresetZoneIndex = input.ReadUInt16LE();
                p.Library = input.ReadInt32LE();
                p.Genre = input.ReadInt32LE();
                p.Morphology = input.ReadInt32LE();
                if (lastPreset != null)
                {
                    lastPreset.EndPresetZoneIndex = TypeUtils.ToUInt16((p.StartPresetZoneIndex - 1));
                }
                _rawPresets[x] = p;
                lastPreset = p;
            }
        }

        public PresetHeader[] ToPresets(Zone[] presetZones)
        {
            var presets = new PresetHeader[(_rawPresets.Length - 1)];
            for (int x = 0; x < presets.Length; x++)
            {
                var rawPreset = _rawPresets[x];
                var p = new PresetHeader();
                p.BankNumber = rawPreset.BankNumber;
                p.Genre = rawPreset.Genre;
                p.Library = rawPreset.Library;
                p.Morphology = rawPreset.Morphology;
                p.Name = rawPreset.Name;
                p.PatchNumber = rawPreset.PatchNumber;
                p.Zones = new Zone[(rawPreset.EndPresetZoneIndex - rawPreset.StartPresetZoneIndex + 1)];
                Std.ArrayCopy(presetZones, rawPreset.StartPresetZoneIndex, p.Zones, 0, p.Zones.Length);
                presets[x] = p;
            }
            return presets;
        }
    }

    public class RawPreset
    {
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public int PatchNumber { get; set; }
        [IntrinsicProperty]
        public int BankNumber { get; set; }
        [IntrinsicProperty]
        public int StartPresetZoneIndex { get; set; }
        [IntrinsicProperty]
        public int EndPresetZoneIndex { get; set; }
        [IntrinsicProperty]
        public int Library { get; set; }
        [IntrinsicProperty]
        public int Genre { get; set; }
        [IntrinsicProperty]
        public int Morphology { get; set; }
    }
}
