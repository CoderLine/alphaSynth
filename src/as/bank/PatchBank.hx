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
package as.bank;

import as.bank.patch.MultiPatch;
import as.bank.patch.Patch;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Byte;
import as.platform.Types.Short;
import as.platform.Types.TypeUtils;
import as.sf2.Enum.GeneratorEnum;
import as.sf2.Generator;
import as.sf2.Instrument;
import as.sf2.Sf2Region;
import as.sf2.SoundFont;
import haxe.ds.IntMap.IntMap;
import haxe.ds.StringMap.StringMap;
import haxe.io.BytesInput;

class PatchBank
{
    public static inline var DrumBank = 128;
    public static inline var BankSize = 128;

    private var _bank:IntMap < FixedArray<Patch> > ;
    public var assets:AssetManager;
    
    public var name:String;
    public var comments:String;
    
    public function new() 
    {
        reset();
    }
    
    public function reset()
    {
        _bank = new IntMap < FixedArray<Patch> > ();
        assets = new AssetManager();
        name = "";
        comments = "";
    }
    
    public function getLoadedBanks() : Array<Int>
    {
        var keys:Array<Int> = new Array<Int>();
        for (k in _bank.keys())
        {
            keys.push(k);
        }
        return keys;
    }
    
    public function getBank(bankNumber:Int) : FixedArray<Patch>
    {
        if(_bank.exists(bankNumber))
            return _bank.get(bankNumber);
        return null;
    }
    
    public function getPatchByNumber(bankNumber:Int, patchNumber:Int) : Patch
    {
        if (_bank.exists(bankNumber))
        {
            return _bank.get(bankNumber)[patchNumber];
        }
        return null;
    }
    
    public function getPatchByName(bankNumber:Int, name:String) : Patch
    {
        if (_bank.exists(bankNumber))
        {
            var patches = _bank.get(bankNumber);
            for (x in 0 ... patches.length)
            {
                if (patches[x] != null && patches[x].name == name)
                    return patches[x];
            }
        }
        return null;
    }
    
    public function isBankLoaded(bankNumber:Int) : Bool
    {
        return _bank.exists(bankNumber);
    }    
    
    public function loadSf2(input:BytesInput)
    {
        reset();
               
        var sf = new SoundFont();
        sf.load(input);
        
        name = sf.info.bankName;
        comments = sf.info.comments;

        for (x in 0 ... sf.presets.sampleHeaders.length)
        {
            assets.sampleAssets.push(new SampleDataAsset(sf.presets.sampleHeaders[x], sf.sampleData));
        }

        var inst:FixedArray<FixedArray<Sf2Region>> = readSf2Instruments(sf.presets.instruments);

        for (p in sf.presets.presetHeaders)
        {
            var globalGens:FixedArray<Generator> = null;
            var i:Int;
            if (p.zones[0].generators.length == 0 ||
                p.zones[0].generators[p.zones[0].generators.length - 1].generatorType != GeneratorEnum.Instrument)
            {
                globalGens = p.zones[0].generators;
                i = 1;
            }
            else
                i = 0;
            var regionList:Array<Sf2Region> = new Array<Sf2Region>();
            while (i < p.zones.length)
            {
                var presetLoKey:Byte = 0;
                var presetHiKey:Byte = 127;
                var presetLoVel:Byte = 0;
                var presetHiVel:Byte = 127;
                if (p.zones[i].generators[0].generatorType == GeneratorEnum.KeyRange)
                {
                    if (TypeUtils.IsLittleEndian)
                    {
                        presetLoKey = (p.zones[i].generators[0].amountInt16 & 0xFF);
                        presetHiKey = ((p.zones[i].generators[0].amountInt16 >> 8) & 0xFF);
                    }
                    else
                    {
                        presetHiKey = (p.zones[i].generators[0].amountInt16 & 0xFF);
                        presetLoKey = ((p.zones[i].generators[0].amountInt16 >> 8) & 0xFF);
                    }
                    if (p.zones[i].generators.length > 1 && p.zones[i].generators[1].generatorType == GeneratorEnum.VelocityRange)
                    {
                        if (TypeUtils.IsLittleEndian)
                        {
                            presetLoVel = (p.zones[i].generators[1].amountInt16 & 0xFF);
                            presetHiVel = ((p.zones[i].generators[1].amountInt16 >> 8) & 0xFF);
                        }
                        else
                        {
                            presetHiVel = (p.zones[i].generators[1].amountInt16 & 0xFF);
                            presetLoVel = ((p.zones[i].generators[1].amountInt16 >> 8) & 0xFF);
                        }
                    }
                }
                else if (p.zones[i].generators[0].generatorType == GeneratorEnum.VelocityRange)
                {
                    if (TypeUtils.IsLittleEndian)
                    {
                        presetLoVel = (p.zones[i].generators[0].amountInt16 & 0xFF);
                        presetHiVel = ((p.zones[i].generators[0].amountInt16 >> 8) & 0xFF);
                    }
                    else
                    {
                        presetHiVel = (p.zones[i].generators[0].amountInt16 & 0xFF);
                        presetLoVel = ((p.zones[i].generators[0].amountInt16 >> 8) & 0xFF);
                    }
                }
                if(p.zones[i].generators[p.zones[i].generators.length - 1].generatorType == GeneratorEnum.Instrument)
                {
                    var insts:FixedArray<Sf2Region> = inst[p.zones[i].generators[p.zones[i].generators.length - 1].amountInt16];
                    for (x in 0 ... insts.length)
                    {
                        var instLoKey:Byte;
                        var instHiKey:Byte;
                        var instLoVel:Byte;
                        var instHiVel:Byte;
                        if (TypeUtils.IsLittleEndian)
                        {
                            instLoKey = (insts[x].generators[GeneratorEnum.KeyRange] & 0xFF);
                            instHiKey = ((insts[x].generators[GeneratorEnum.KeyRange] >> 8) & 0xFF);
                            instLoVel = (insts[x].generators[GeneratorEnum.VelocityRange] & 0xFF);
                            instHiVel = ((insts[x].generators[GeneratorEnum.VelocityRange] >> 8) & 0xFF);
                        }
                        else
                        {
                            instHiKey = (insts[x].generators[GeneratorEnum.KeyRange] & 0xFF);
                            instLoKey = ((insts[x].generators[GeneratorEnum.KeyRange] >> 8) & 0xFF);
                            instHiVel = (insts[x].generators[GeneratorEnum.VelocityRange] & 0xFF);
                            instLoVel = ((insts[x].generators[GeneratorEnum.VelocityRange] >> 8) & 0xFF);
                        }
                        if ((instLoKey <= presetHiKey && presetLoKey <= instHiKey) && (instLoVel <= presetHiVel && presetLoVel <= instHiVel))
                        {
                            var r:Sf2Region = new Sf2Region();
                            FixedArray.blit(insts[x].generators, 0, r.generators, 0, r.generators.length);
                            readSf2Region(r, globalGens, p.zones[i].generators, true);
                            regionList.push(r);
                        }
                    }
                }
                i++;
            }
            var mp:MultiPatch = new MultiPatch(p.name);
            mp.loadSf2(regionList, assets);
            assets.patchAssets.push(new PatchAsset(mp.name, mp));
            assignPatchToBank(mp, p.bankNumber, p.patchNumber, p.patchNumber);
        }        
    }
    
    private function readSf2Instruments(instruments:FixedArray<Instrument>) : FixedArray<FixedArray<Sf2Region>>
    {
        var regions = new FixedArray<FixedArray<Sf2Region>>(instruments.length);
        for (x in 0 ... regions.length)
        {
            var globalGens:FixedArray<Generator> = null;
            var i:Int;
            if (instruments[x].zones[0].generators.length == 0 ||
                instruments[x].zones[0].generators[instruments[x].zones[0].generators.length - 1].generatorType != GeneratorEnum.SampleID)
            {
                globalGens = instruments[x].zones[0].generators;
                i = 1;
            }
            else
                i = 0;
                
            regions[x] = new FixedArray<Sf2Region>(instruments[x].zones.length - i);
            for (j in 0 ... regions[x].length)
            {
                var r:Sf2Region = new Sf2Region();
                r.applyDefaultValues();
                readSf2Region(r, globalGens, instruments[x].zones[j + i].generators, false);
                regions[x][j] = r;
            }
        }
        return regions;
    }    
    
    private function readSf2Region(region:Sf2Region, globals:FixedArray<Generator>, gens:FixedArray<Generator>, isRelative:Bool) : Void
    {
        if (!isRelative)
        {
            if (globals != null)
            {
                for (x in 0 ... globals.length)
                    region.generators[globals[x].generatorType] = cast globals[x].amountInt16;
            }
            for (x in 0 ... gens.length)
                region.generators[gens[x].generatorType] = cast gens[x].amountInt16;
        }
        else
        {
            var genList:Array<Generator> = new Array<Generator>();
            for (i in 0 ... gens.length) genList.push(gens[i]);
            if (globals != null)
            {
                for (x in 0 ... globals.length)
                {
                    var found:Bool = false;
                    for (i in 0 ... genList.length)
                    {
                        if (genList[i].generatorType == globals[x].generatorType)
                        {
                            found = true;
                            break;
                        }
                    }
                    if (!found)
                        genList.push(globals[x]);
                }
            }
            for (x in 0 ... genList.length)
            {
                var value:Int = genList[x].generatorType;
                if (value < 5 || value == 12 || value == 45 || value == 46 || value == 47 || value == 50 || value == 54 || value == 57 || value == 58)
                    continue;
                else if (value == 43 || value == 44)
                {
                    var lo_a:Byte;
                    var hi_a:Byte;
                    var lo_b:Byte;
                    var hi_b:Byte;
                    if (TypeUtils.IsLittleEndian)
                    {
                        lo_a = (region.generators[value] & 0xFF);
                        hi_a = ((region.generators[value] >> 8) & 0xFF);
                        lo_b = (genList[x].amountInt16 & 0xFF);
                        hi_b = ((genList[x].amountInt16 >> 8) & 0xFF);
                    }
                    else
                    {
                        hi_a = (region.generators[value] & 0xFF);
                        lo_a = ((region.generators[value] >> 8) & 0xFF);
                        hi_b = (genList[x].amountInt16 & 0xFF);
                        lo_b = ((genList[x].amountInt16 >> 8) & 0xFF);
                    }
                    lo_a = Std.int(Math.max(lo_a, lo_b));
                    hi_a = Std.int(Math.min(hi_a, hi_b));

                    if (lo_a > hi_a)
                        throw ("Invalid sf2 region. The range generators do not intersect.");
                    if (TypeUtils.IsLittleEndian)
                        region.generators[value] = cast (lo_a | (hi_a << 8));
                    else
                        region.generators[value] = cast ((lo_a << 8) | hi_a);
                }
                else
                {
                    var g:Short = region.generators[value];
                    region.generators[value] = g + genList[x].amountInt16;
                }
            }
        }
    }    
    
    private function assignPatchToBank(patch:Patch, bankNumber:Int, startRange:Int, endRange:Int)
    {
        if (bankNumber < 0)
            return;

        if (startRange > endRange)
        {
            var range = startRange;
            startRange = endRange;
            endRange = range;
        }
        if(startRange < 0 || startRange >= BankSize)
            throw ("startRange out of range");
        if (endRange < 0 || endRange >= BankSize)
            throw ("endRange out of range");

        var patches:FixedArray<Patch>;
        if (_bank.exists(bankNumber))
        {
            patches = _bank.get(bankNumber);
        }
        else
        {
            patches = new FixedArray<Patch>(BankSize); 
            _bank.set(bankNumber, patches);
        }
        for (x in startRange ... endRange + 1)
            patches[x] = patch;
    }    
}