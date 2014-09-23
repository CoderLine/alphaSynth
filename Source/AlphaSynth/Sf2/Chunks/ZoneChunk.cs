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
using System.Runtime.CompilerServices;
using AlphaSynth.IO;
using AlphaSynth.Platform;
using AlphaSynth.Util;

namespace AlphaSynth.Sf2.Chunks
{
    public class ZoneChunk : Chunk
    {
        private RawZoneData[] _zoneData;

        public ZoneChunk(string id, int size, IReadable input)
            : base(id, size)
        {
            _zoneData = new RawZoneData[((int)(size / 4.0))];

            RawZoneData lastZone = null;
            for (int x = 0; x < _zoneData.Length; x++)
            {
                var z = new RawZoneData();
                z.GeneratorIndex = input.ReadUInt16LE();
                z.ModulatorIndex = input.ReadUInt16LE();
                if (lastZone != null)
                {
                    lastZone.GeneratorCount = TypeUtils.ToUInt16(z.GeneratorIndex - lastZone.GeneratorIndex);
                    lastZone.ModulatorCount = TypeUtils.ToUInt16(z.ModulatorIndex - lastZone.ModulatorIndex);
                }
                _zoneData[x] = z;
                lastZone = z;
            }
        }

        public Zone[] ToZones(Modulator[] modulators, Generator[] generators)
        {
            var zones = new Zone[(_zoneData.Length- 1)];
            for (int x = 0; x < zones.Length; x++)
            {
                var rawZone = _zoneData[x];
                var zone = new Zone();
                zone.Generators = new Generator[rawZone.GeneratorCount];
                Std.ArrayCopy(generators, rawZone.GeneratorIndex, zone.Generators, 0, rawZone.GeneratorCount);
                zone.Modulators = new Modulator[rawZone.ModulatorCount];
                Std.ArrayCopy(modulators, rawZone.ModulatorIndex, zone.Modulators, 0, rawZone.ModulatorCount);
                zones[x] = zone;
            }
            return zones;
        }
    }

    public class RawZoneData
    {
        [IntrinsicProperty]
        public int GeneratorIndex { get; set; }
        [IntrinsicProperty]
        public int ModulatorIndex { get; set; }
        [IntrinsicProperty]
        public int GeneratorCount { get; set; }
        [IntrinsicProperty]
        public int ModulatorCount { get; set; }
    }
}
