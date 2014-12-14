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
using System.Runtime.CompilerServices;
using AlphaSynth.Ds;

namespace AlphaSynth.Bank
{
    public class AssetManager
    {
        public FastList<PatchAsset> PatchAssets { get; private set; }
        public FastList<SampleDataAsset> SampleAssets { get; private set; }

        public AssetManager()
        {
            PatchAssets = new FastList<PatchAsset>();
            SampleAssets = new FastList<SampleDataAsset>();
        }

        public PatchAsset FindPatch(string name)
        {
            for (int i = 0; i < PatchAssets.Count; i++)
            {
                var patchAsset = PatchAssets[i];
                if (patchAsset.Name == name)
                {
                    return patchAsset;
                }
            }
            return null;
        }

        public SampleDataAsset FindSample(string name)
        {
            for (int i = 0; i < SampleAssets.Count; i++)
            {
                var sampleDataAsset = SampleAssets[i];
                if (sampleDataAsset.Name == name)
                {
                    return sampleDataAsset;
                }
            }
            return null;
        }
    }
}
