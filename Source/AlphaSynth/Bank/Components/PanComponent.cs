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
using AlphaSynth.Synthesis;
using AlphaSynth.Util;

namespace AlphaSynth.Bank.Components
{
    public enum PanFormulaEnum
    {
        Neg3dBCenter = 0,
        Neg6dBCenter = 1,
        ZeroCenter = 2
    }

    public class PanComponent
    {
        public float Left { get; set; }
        public float Right { get; set; }

        public void SetValue(float value, PanFormulaEnum formula)
        {
            value = SynthHelper.ClampF(value, SynthConstants.MinPan, SynthConstants.MaxPan);
            double dvalue;
            switch (formula)
            {
                case PanFormulaEnum.Neg3dBCenter:
                    dvalue = SynthConstants.HalfPi * (value + 1) / 2.0;
                    Left = (float)Math.Cos(dvalue);
                    Right = (float)Math.Sin(dvalue);
                    break;
                case PanFormulaEnum.Neg6dBCenter:
                    Left = (float)(0.5 - value * 0.5);
                    Right = (float)(0.5 + value * 0.5);
                    break;
                case PanFormulaEnum.ZeroCenter:
                    dvalue = SynthConstants.HalfPi * (value + 1) / 2.0;
                    Left = (float)(Math.Cos(dvalue) / SynthConstants.InverseSqrtOfTwo);
                    Right = (float)(Math.Sin(dvalue) / SynthConstants.InverseSqrtOfTwo);
                    break;
                default:
                    throw new Exception("Invalid pan law selected.");
            }
        }
    }
}
