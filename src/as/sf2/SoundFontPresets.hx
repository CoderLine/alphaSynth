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
package as.sf2;

import as.ds.FixedArray.FixedArray;
import as.sf2.chunks.GeneratorChunk;
import as.sf2.chunks.InstrumentChunk;
import as.sf2.chunks.ModulatorChunk;
import as.sf2.chunks.PresetHeaderChunk;
import as.sf2.chunks.SampleHeaderChunk;
import as.sf2.chunks.ZoneChunk;
import as.util.IOHelper;
import haxe.io.BytesInput;

class SoundFontPresets
{
    public var sampleHeaders(default, null):FixedArray<SampleHeader>;
    public var presetHeaders(default, null):FixedArray<PresetHeader>;
    public var instruments(default, null):FixedArray<Instrument>;
    
    public function new(input:BytesInput)
    {
        var id = IOHelper.read8BitChars(input, 4);
        var size = input.readInt32();
        if(id.toLowerCase() != "list")
            throw ("Invalid soundfont. Could not find pdta LIST chunk.");
        var readTo = input.position + size;
        id = IOHelper.read8BitChars(input, 4);
        if(id.toLowerCase() != "pdta")
            throw ("Invalid soundfont. The LIST chunk is not of type pdta."); 
            
        var presetModulators:FixedArray<Modulator> = null;
        var presetGenerators:FixedArray<Generator> = null;
        var instrumentModulators:FixedArray<Modulator> = null;
        var instrumentGenerators:FixedArray<Generator> = null;

        var pbag:ZoneChunk = null;
        var ibag:ZoneChunk = null;
        var phdr:PresetHeaderChunk = null;
        var inst:InstrumentChunk = null;
        
        while (input.position < readTo)
        {
            id = IOHelper.read8BitChars(input, 4);
            size = input.readInt32();
            switch (id.toLowerCase())
            {
                case "phdr":
                    phdr = new PresetHeaderChunk(id, size, input);
                case "pbag":
                    pbag = new ZoneChunk(id, size, input);
                case "pmod":
                    presetModulators = new ModulatorChunk(id, size, input).modulators;
                case "pgen":
                    presetGenerators = new GeneratorChunk(id, size, input).generators;
                case "inst":
                    inst = new InstrumentChunk(id, size, input);
                case "ibag":
                    ibag = new ZoneChunk(id, size, input);
                case "imod":
                    instrumentModulators = new ModulatorChunk(id, size, input).modulators;
                case "igen":
                    instrumentGenerators = new GeneratorChunk(id, size, input).generators;
                case "shdr":
                    sampleHeaders = new SampleHeaderChunk(id, size, input).sampleHeaders;
                default:
                    throw ("Invalid soundfont. Unrecognized sub chunk: " + id);
            }
        }
        var pZones = pbag.toZones(presetModulators, presetGenerators);
        presetHeaders = phdr.toPresets(pZones);
        var iZones = ibag.toZones(instrumentModulators, instrumentGenerators);
        instruments = inst.toInstruments(iZones);            
    }
}