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
    public class SoundFontInfo
    {
        [IntrinsicProperty]
        public short RomVersionMajor { get; set; }
        [IntrinsicProperty]
        public short RomVersionMinor { get; set; }
        [IntrinsicProperty]
        public short SfVersionMajor { get; set; }
        [IntrinsicProperty]
        public short SfVersionMinor { get; set; }
        [IntrinsicProperty]
        public string SoundEngine { get; set; }
        [IntrinsicProperty]
        public string BankName { get; set; }
        [IntrinsicProperty]
        public string DataRom { get; set; }
        [IntrinsicProperty]
        public string CreationDate { get; set; }
        [IntrinsicProperty]
        public string Author { get; set; }
        [IntrinsicProperty]
        public string TargetProduct { get; set; }
        [IntrinsicProperty]
        public string Copyright { get; set; }
        [IntrinsicProperty]
        public string Comments { get; set; }
        [IntrinsicProperty]
        public string Tools { get; set; }

        public SoundFontInfo(IReadable input)
        {
            Tools = "";
            Comments = "";
            Copyright = "";
            TargetProduct = "";
            Author = "";
            DataRom = "";
            CreationDate = "";
            BankName = "";
            SoundEngine = "";
            var id = input.Read8BitChars(4);
            var size = input.ReadInt32LE();
            if (id.ToLower() != "list")
                throw new Exception("Invalid soundfont. Could not find INFO LIST chunk.");
            var readTo = input.Position + size;
            id = input.Read8BitChars(4);
            if (id.ToLower() != "info")
                throw new Exception("Invalid soundfont. The LIST chunk is not of type INFO.");

            while (input.Position < readTo)
            {
                id = input.Read8BitChars(4);
                size = input.ReadInt32LE();
                switch (id.ToLower())
                {
                    case "ifil":
                        SfVersionMajor = input.ReadInt16LE();
                        SfVersionMinor = input.ReadInt16LE();
                        break;
                    case "isng":
                        SoundEngine = input.Read8BitStringLength(size);
                        break;
                    case "inam":
                        BankName = input.Read8BitStringLength(size);
                        break;
                    case "irom":
                        DataRom = input.Read8BitStringLength(size);
                        break;
                    case "iver":
                        RomVersionMajor = input.ReadInt16LE();
                        RomVersionMinor = input.ReadInt16LE();
                        break;
                    case "icrd":
                        CreationDate = input.Read8BitStringLength(size);
                        break;
                    case "ieng":
                        Author = input.Read8BitStringLength(size);
                        break;
                    case "iprd":
                        TargetProduct = input.Read8BitStringLength(size);
                        break;
                    case "icop":
                        Copyright = input.Read8BitStringLength(size);
                        break;
                    case "icmt":
                        Comments = input.Read8BitStringLength(size);
                        break;
                    case "isft":
                        Tools = input.Read8BitStringLength(size);
                        break;
                    default:
                        throw new Exception("Invalid soundfont. The Chunk: " + id + " was not expected.");
                }
            }
        }
    }
}
