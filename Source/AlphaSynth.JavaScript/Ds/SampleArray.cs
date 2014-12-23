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

using SharpKit.Html;
using SharpKit.JavaScript;

namespace AlphaSynth.Ds
{
    [JsType(Mode = JsMode.Prototype, Name = "Float32Array", Export = false, PropertiesAsFields = true)]
    public class SampleArray
    {
        [JsMethod(InlineCodeExpression = "new Float32Array(length)")]
        public SampleArray(int length)
        {
        }

        [JsProperty(NativeIndexer = true)]
        public float this[int index]
        {
            [JsMethod(Export = false)]
            get
            {
                return 0;
            }
            [JsMethod(Export = false)]
            set
            {
            }
        }

        [JsProperty(Name = "buffer", NativeField = true)]
        public extern ArrayBuffer Buffer { get; }
        
        [JsProperty(Name = "length", Export = false)]
        public int Length
        {
            [JsMethod(InlineCodeExpression = "this.length", Export = false)]
            get
            {
                return 0;
            }
        }

        [JsMethod(InlineCodeExpression = "this = new Float32Array(this.length)", Export = false)]
        public void Clear()
        {
        }

        [JsMethod(InlineCodeExpression = "dest.set(src.subarray(srcPos, srcPos + len), destPos)", Export = false)]
        public static void Blit(SampleArray src, int srcPos, SampleArray dest, int destPos, int len)
        {
        }
    }
}
