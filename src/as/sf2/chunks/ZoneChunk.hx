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
package as.sf2.chunks;

import as.ds.FixedArray.FixedArray;
import as.platform.Types.TypeUtils;
import as.sf2.Generator;
import as.sf2.Modulator;
import as.sf2.Zone;
import haxe.io.BytesInput;

class ZoneChunk extends Chunk
{
    private var _zoneData:FixedArray<RawZoneData>;

    public function new(id:String, size:Int, input:BytesInput) 
    {
        super(id, size);
        _zoneData = new FixedArray<RawZoneData>(Std.int(size / 4.0));
        
        var lastZone:RawZoneData = null;
        for (x in 0 ... _zoneData.length)
        {
            var z = new RawZoneData();
            z.generatorIndex = input.readUInt16();
            z.modulatorIndex = input.readUInt16();
            if (lastZone != null)
            {
                lastZone.generatorCount = TypeUtils.ToUInt16(z.generatorIndex - lastZone.generatorIndex);
                lastZone.modulatorCount = TypeUtils.ToUInt16(z.modulatorIndex - lastZone.modulatorIndex);
            }
            _zoneData[x] = z;
            lastZone = z;
        }
    }    

    public function toZones(modulators:FixedArray<Modulator>, generators:FixedArray<Generator>) : FixedArray<Zone>
    {
        var zones = new FixedArray<Zone>(_zoneData.length- 1);
        for (x in 0 ... zones.length)
        {
            var rawZone = _zoneData[x];
            var zone = new Zone();
            zone.generators = new FixedArray<Generator>(rawZone.generatorCount);
            FixedArray.blit(generators, rawZone.generatorIndex, zone.generators, 0, rawZone.generatorCount);
            zone.modulators = new FixedArray<Modulator>(rawZone.modulatorCount);
            FixedArray.blit(modulators, rawZone.modulatorIndex, zone.modulators, 0, rawZone.modulatorCount);
            zones[x] = zone;
        }
        return zones;
    }
}

class RawZoneData
{
    public var generatorIndex:Int;
    public var modulatorIndex:Int;
    public var generatorCount:Int;
    public var modulatorCount:Int;

    public function new()
    {
    }
}