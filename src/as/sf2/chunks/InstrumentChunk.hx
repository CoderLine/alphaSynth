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
import as.sf2.Instrument;
import as.sf2.Zone;
import as.util.IOHelper;
import haxe.io.BytesInput;

class InstrumentChunk extends Chunk
{
    private var _rawInstruments:FixedArray<RawInstrument>;
    
    public function new(id:String, size:Int, input:BytesInput) 
    {
        super(id, size);
        if (size % 22 != 0)
            throw ("Invalid SoundFont. The preset chunk was invalid.");
        _rawInstruments = new FixedArray<RawInstrument>(Std.int(size / 22.0));
        var lastInstrument = null;
        for (x in 0 ... _rawInstruments.length)
        {
            var i = new RawInstrument();
            i.name = IOHelper.read8BitStringLength(input, 20);
            i.startInstrumentZoneIndex = input.readUInt16();
            if (lastInstrument != null)
                lastInstrument.endInstrumentZoneIndex = TypeUtils.ToUInt16((i.startInstrumentZoneIndex - 1));
            _rawInstruments[x] = i;
            lastInstrument = i;
        }    
    }
    
    public function toInstruments(zones:FixedArray<Zone>) : FixedArray<Instrument>
    {
        var inst = new FixedArray<Instrument>(_rawInstruments.length - 1);
        for (x in 0 ... inst.length)
        {
            var rawInst = _rawInstruments[x];
            var i = new Instrument();
            i.name = rawInst.name;
            i.zones = new FixedArray<Zone>(rawInst.endInstrumentZoneIndex - rawInst.startInstrumentZoneIndex + 1);
            FixedArray.blit(zones, rawInst.startInstrumentZoneIndex, i.zones, 0, i.zones.length);
            inst[x] = i;
        }
        return inst;
    }
}


class RawInstrument
{
    public var name:String;
    public var startInstrumentZoneIndex:Int;
    public var endInstrumentZoneIndex:Int;

    public function new() 
    {
    }
}
