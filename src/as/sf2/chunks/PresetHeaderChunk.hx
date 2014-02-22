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
import as.sf2.PresetHeader;
import as.sf2.Zone;
import as.util.IOHelper;
import haxe.Int64;
import haxe.io.BytesInput;

class PresetHeaderChunk extends Chunk
{
    private var _rawPresets:FixedArray<RawPreset>;
    
    public function new(id:String, size:Int, input:BytesInput) 
    {
        super(id, size);
        if (size % 38 != 0)
            throw ("Invalid SoundFont. The preset chunk was invalid.");
        
        _rawPresets = new FixedArray<RawPreset>(Std.int(size / 38.0));
        var lastPreset:RawPreset = null;
        for (x in 0 ... _rawPresets.length)
        {
            var p = new RawPreset();
            p.name = IOHelper.read8BitStringLength(input, 20);
            p.patchNumber = input.readUInt16();
            p.bankNumber = input.readUInt16();
            p.startPresetZoneIndex = input.readUInt16();
            p.library = Int64.getLow(IOHelper.readUInt32(input));
            p.genre = Int64.getLow(IOHelper.readUInt32(input));
            p.morphology = Int64.getLow(IOHelper.readUInt32(input));
            if (lastPreset != null)
                lastPreset.endPresetZoneIndex = TypeUtils.ToUInt16((p.startPresetZoneIndex - 1));
            _rawPresets[x] = p;
            lastPreset = p;
        }
    }
    
    public function toPresets(presetZones:FixedArray<Zone>) : FixedArray<PresetHeader>
    {
        var presets = new FixedArray<PresetHeader>(_rawPresets.length - 1);
        for(x in 0 ... presets.length)
        {
            var rawPreset = _rawPresets[x];
            var p = new PresetHeader();
            p.bankNumber = rawPreset.bankNumber;
            p.genre = rawPreset.genre;
            p.library = rawPreset.library;
            p.morphology = rawPreset.morphology;
            p.name = rawPreset.name;
            p.patchNumber = rawPreset.patchNumber;
            p.zones = new FixedArray<Zone>(rawPreset.endPresetZoneIndex - rawPreset.startPresetZoneIndex + 1);
            FixedArray.blit(presetZones, rawPreset.startPresetZoneIndex, p.zones, 0, p.zones.length);
            presets[x] = p;
        }
        return presets;
    }
}

class RawPreset
{
    public var name:String;
    public var patchNumber:Int;
    public var bankNumber:Int;
    public var startPresetZoneIndex:Int;
    public var endPresetZoneIndex:Int;
    public var library:Int;
    public var genre:Int;
    public var morphology:Int;

    public function new()
    {
    }
}
