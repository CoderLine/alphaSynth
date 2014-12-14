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
using AlphaSynth.Bank.Patch;
using AlphaSynth.Ds;
using AlphaSynth.IO;
using AlphaSynth.Platform;
using AlphaSynth.Sf2;
using AlphaSynth.Util;

namespace AlphaSynth.Bank
{
    public class PatchBank
    {
        public const int DrumBank = 128;
        public const int BankSize = 128;

        private FastDictionary<int, Patch.Patch[]> _bank;
        private AssetManager _assets;

        public string Name { get; set; }
        public string Comments { get; set; }

        public PatchBank()
        {
            Reset();
        }

        public void Reset()
        {
            _bank = new FastDictionary<int, Patch.Patch[]>();
            _assets = new AssetManager();
            Name = "";
            Comments = "";
        }

        public int[] LoadedBanks
        {
            get
            {
                var banks = new FastList<int>();
                foreach (var bank in _bank.Keys)
                {
                    banks.Add(Std.ParseInt(bank));
                }
                return banks.ToArray();
            }
        }

        public Patch.Patch[] GetBank(int bankNumber)
        {
            return _bank.ContainsKey(bankNumber) ? _bank[bankNumber] : null;
        }

        public Patch.Patch GetPatchByNumber(int bankNumber, int patchNumber)
        {
            return _bank.ContainsKey(bankNumber) ? _bank[bankNumber][patchNumber] : null;
        }

        public Patch.Patch GetPatchByName(int bankNumber, string name)
        {
            if (_bank.ContainsKey(bankNumber))
            {
                var patches = _bank[bankNumber];
                foreach (var patch in patches)
                {
                    if (patch != null && patch.Name == name)
                    {
                        return patch;
                    }
                }
            }
            return null;
        }

        public bool IsBankLoaded(int bankNumber)
        {
            return _bank.ContainsKey(bankNumber);
        }

        public void LoadSf2(IReadable input)
        {
            Reset();

            Logger.Debug("Reading SF2");
            var sf = new SoundFont();
            sf.Load(input);

            Logger.Debug("Building patchbank");
            Name = sf.Info.BankName;
            Comments = sf.Info.Comments;

            //load samples
            foreach (var sampleHeader in sf.Presets.SampleHeaders)
            {
                _assets.SampleAssets.Add(new SampleDataAsset(sampleHeader, sf.SampleData));
            }

            //create instrument regions first
            var sfinsts = ReadSf2Instruments(sf.Presets.Instruments);
            //load each patch
            foreach (var p in sf.Presets.PresetHeaders)
            {
                Generator[] globalGens = null;
                int i;
                if (p.Zones[0].Generators.Length == 0 ||
                    p.Zones[0].Generators[p.Zones[0].Generators.Length - 1].GeneratorType != GeneratorEnum.Instrument)
                {
                    globalGens = p.Zones[0].Generators;
                    i = 1;
                }
                else
                {
                    i = 0;
                }

                var regionList = new FastList<Sf2Region>();
                while (i < p.Zones.Length)
                {
                    byte presetLoKey = 0;
                    byte presetHiKey = 127;
                    byte presetLoVel = 0;
                    byte presetHiVel = 127;

                    if (p.Zones[i].Generators[0].GeneratorType == GeneratorEnum.KeyRange)
                    {
                        if (TypeUtils.IsLittleEndian)
                        {
                            presetLoKey = TypeUtils.ToUInt8(p.Zones[i].Generators[0].AmountInt16 & 0xFF);
                            presetHiKey = TypeUtils.ToUInt8((p.Zones[i].Generators[0].AmountInt16 >> 8) & 0xFF);
                        }
                        else
                        {
                            presetHiKey = TypeUtils.ToUInt8(p.Zones[i].Generators[0].AmountInt16 & 0xFF);
                            presetLoKey = TypeUtils.ToUInt8((p.Zones[i].Generators[0].AmountInt16 >> 8) & 0xFF);
                        }
                        if (p.Zones[i].Generators.Length > 1 && p.Zones[i].Generators[1].GeneratorType == GeneratorEnum.VelocityRange)
                        {
                            if (TypeUtils.IsLittleEndian)
                            {
                                presetLoVel = TypeUtils.ToUInt8(p.Zones[i].Generators[1].AmountInt16 & 0xFF);
                                presetHiVel = TypeUtils.ToUInt8((p.Zones[i].Generators[1].AmountInt16 >> 8) & 0xFF);
                            }
                            else
                            {
                                presetHiVel = TypeUtils.ToUInt8(p.Zones[i].Generators[1].AmountInt16 & 0xFF);
                                presetLoVel = TypeUtils.ToUInt8((p.Zones[i].Generators[1].AmountInt16 >> 8) & 0xFF);
                            }
                        }
                    }
                    else if (p.Zones[i].Generators[0].GeneratorType == GeneratorEnum.VelocityRange)
                    {
                        if (TypeUtils.IsLittleEndian)
                        {
                            presetLoVel = TypeUtils.ToUInt8(p.Zones[i].Generators[0].AmountInt16 & 0xFF);
                            presetHiVel = TypeUtils.ToUInt8((p.Zones[i].Generators[0].AmountInt16 >> 8) & 0xFF);
                        }
                        else
                        {
                            presetHiVel = TypeUtils.ToUInt8(p.Zones[i].Generators[0].AmountInt16 & 0xFF);
                            presetLoVel = TypeUtils.ToUInt8((p.Zones[i].Generators[0].AmountInt16 >> 8) & 0xFF);
                        }
                    }
                    if (p.Zones[i].Generators[p.Zones[i].Generators.Length - 1].GeneratorType == GeneratorEnum.Instrument)
                    {
                        var insts = sfinsts[p.Zones[i].Generators[p.Zones[i].Generators.Length - 1].AmountInt16];
                        foreach (var inst in insts)
                        {
                            byte instLoKey;
                            byte instHiKey;
                            byte instLoVel;
                            byte instHiVel;
                            if (TypeUtils.IsLittleEndian)
                            {
                                instLoKey = TypeUtils.ToUInt8(inst.Generators[(int)GeneratorEnum.KeyRange] & 0xFF);
                                instHiKey = TypeUtils.ToUInt8((inst.Generators[(int)GeneratorEnum.KeyRange] >> 8) & 0xFF);
                                instLoVel = TypeUtils.ToUInt8(inst.Generators[(int)GeneratorEnum.VelocityRange] & 0xFF);
                                instHiVel = TypeUtils.ToUInt8((inst.Generators[(int)GeneratorEnum.VelocityRange] >> 8) & 0xFF);
                            }
                            else
                            {
                                instHiKey = TypeUtils.ToUInt8(inst.Generators[(int)GeneratorEnum.KeyRange] & 0xFF);
                                instLoKey = TypeUtils.ToUInt8((inst.Generators[(int)GeneratorEnum.KeyRange] >> 8) & 0xFF);
                                instHiVel = TypeUtils.ToUInt8(inst.Generators[(int)GeneratorEnum.VelocityRange] & 0xFF);
                                instLoVel = TypeUtils.ToUInt8((inst.Generators[(int)GeneratorEnum.VelocityRange] >> 8) & 0xFF);
                            }
                            if ((instLoKey <= presetHiKey && presetLoKey <= instHiKey) && (instLoVel <= presetHiVel && presetLoVel <= instHiVel))
                            {
                                var r = new Sf2Region();
                                Std.ArrayCopy(inst.Generators, 0, r.Generators, 0, r.Generators.Length);
                                ReadSf2Region(r, globalGens, p.Zones[i].Generators, true);
                                regionList.Add(r);
                            }
                        }
                    }
                    i++;
                }
                var mp = new MultiPatch(p.Name);
                mp.LoadSf2(regionList.ToArray(), _assets);
                _assets.PatchAssets.Add(new PatchAsset(mp.Name, mp));
                AssignPatchToBank(mp, p.BankNumber, p.PatchNumber, p.PatchNumber);
            }
        }

        private Sf2Region[][] ReadSf2Instruments(Instrument[] instruments)
        {
            var regions = new Sf2Region[instruments.Length][];
            for (int x = 0; x < instruments.Length; x++)
            {
                Generator[] globalGens = null;
                int i;
                if (instruments[x].Zones[0].Generators.Length == 0 ||
                    instruments[x].Zones[0].Generators[instruments[x].Zones[0].Generators.Length - 1].GeneratorType != GeneratorEnum.SampleID)
                {
                    globalGens = instruments[x].Zones[0].Generators;
                    i = 1;
                }
                else
                    i = 0;

                regions[x] = new Sf2Region[instruments[x].Zones.Length - i];
                for (int j = 0; j < regions[x].Length; j++)
                {
                    var r = new Sf2Region();
                    r.ApplyDefaultValues();
                    ReadSf2Region(r, globalGens, instruments[x].Zones[j + i].Generators, false);
                    regions[x][j] = r;
                }
            }
            return regions;
        }

        private void ReadSf2Region(Sf2Region region, Generator[] globals, Generator[] gens, bool isRelative)
        {
            if (!isRelative)
            {
                if (globals != null)
                {
                    for (int x = 0; x < globals.Length; x++)
                    {
                        region.Generators[(int) globals[x].GeneratorType] = globals[x].AmountInt16;
                    }
                }
                for (int x = 0; x < gens.Length; x++)
                {
                    region.Generators[(int) gens[x].GeneratorType] = gens[x].AmountInt16;
                }
            }
            else
            {
                var genList = new FastList<Generator>();
                foreach (var generator in gens)
                {
                    genList.Add(generator);
                }
                if (globals != null)
                {
                    for (int x = 0; x < globals.Length; x++)
                    {
                        var found = false;
                        for (int i = 0; i < genList.Count; i++)
                        {
                            if (genList[i].GeneratorType == globals[x].GeneratorType)
                            {
                                found = true;
                                break;
                            }
                        }
                        if (!found)
                        {
                            genList.Add(globals[x]);
                        }
                    }
                }
                for (int x = 0; x < genList.Count; x++)
                {
                    var value = (int)genList[x].GeneratorType;
                    if (value < 5 || value == 12 || value == 45 || value == 46 || value == 47 || value == 50 ||
                        value == 54 || value == 57 || value == 58)
                    {
                        continue;
                    }
                    else if (value == 43 || value == 44)
                    {
                        byte lo_a;
                        byte hi_a;
                        byte lo_b;
                        byte hi_b;
                        if (TypeUtils.IsLittleEndian)
                        {
                            lo_a = TypeUtils.ToUInt8(region.Generators[value] & 0xFF);
                            hi_a = TypeUtils.ToUInt8((region.Generators[value] >> 8) & 0xFF);
                            lo_b = TypeUtils.ToUInt8(genList[x].AmountInt16 & 0xFF);
                            hi_b = TypeUtils.ToUInt8((genList[x].AmountInt16 >> 8) & 0xFF);
                        }
                        else
                        {
                            hi_a = TypeUtils.ToUInt8(region.Generators[value] & 0xFF);
                            lo_a = TypeUtils.ToUInt8((region.Generators[value] >> 8) & 0xFF);
                            hi_b = TypeUtils.ToUInt8(genList[x].AmountInt16 & 0xFF);
                            lo_b = TypeUtils.ToUInt8((genList[x].AmountInt16 >> 8) & 0xFF);
                        }
                        lo_a = (byte) Math.Max(lo_a, lo_b);
                        hi_a = Math.Min(hi_a, hi_b);

                        if (lo_a > hi_a)
                        {
                            throw new Exception("Invalid sf2 region. The range generators do not intersect.");
                        }
                        if (TypeUtils.IsLittleEndian)
                        {
                            region.Generators[value] = TypeUtils.ToInt16((lo_a | (hi_a << 8)));
                        }
                        else
                        {
                            region.Generators[value] = TypeUtils.ToInt16((lo_a << 8) | hi_a);
                        }
                    }
                    else
                    {
                        region.Generators[value] = TypeUtils.ToInt16(region.Generators[value] + genList[x].AmountInt16);
                    }
                }
            }
        }

        private void AssignPatchToBank(Patch.Patch patch, int bankNumber, int startRange, int endRange)
        {
            if (bankNumber < 0)
                return;

            if (startRange > endRange)
            {
                var range = startRange;
                startRange = endRange;
                endRange = range;
            }
            if (startRange < 0 || startRange >= BankSize)
                throw new Exception("startRange out of range");
            if (endRange < 0 || endRange >= BankSize)
                throw new Exception("endRange out of range");

            Patch.Patch[] patches;
            if (_bank.ContainsKey(bankNumber))
            {
                patches = _bank[bankNumber];
            }
            else
            {
                patches = new Patch.Patch[BankSize];
                _bank[bankNumber] = patches;
            }
            for (int x = startRange; x <= endRange; x++)
            {
                patches[x] = patch;
            }
        }
    }
}
