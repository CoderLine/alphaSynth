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
package as.util;

import as.bank.components.Enum.WaveformEnum;
import as.bank.components.generators.Generator;
import as.bank.components.generators.SawGenerator;
import as.bank.components.generators.SineGenerator;
import as.bank.components.generators.SquareGenerator;
import as.bank.components.generators.TriangleGenerator;
import as.bank.components.generators.WhiteNoiseGenerator;
import as.bank.descriptors.GeneratorDescriptor;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;
import as.synthesis.Synthesizer;
import as.synthesis.SynthHelper;

class Tables
{
    public static var EnvelopeTables:FixedArray<FixedArray<Float32>>;
    public static var SemitoneTable:FixedArray<Float32>;
    public static var CentTable:FixedArray<Float32>;
    public static var SincTable:FixedArray<Float32>; 

    public static function __init__()
    {
        __init();
    }
    public static function __init()
    {
        var EnvelopeSize = 64;
        var ExponentialCoeff = .09;
        EnvelopeTables = new FixedArray<FixedArray<Float32>>(4);  
        EnvelopeTables[0] = (removeDenormals(createSustainTable(EnvelopeSize)));
        EnvelopeTables[1] = (removeDenormals(createLinearTable(EnvelopeSize)));
        EnvelopeTables[2] = (removeDenormals(createExponentialTable(EnvelopeSize, ExponentialCoeff)));
        EnvelopeTables[3] = (removeDenormals(createSineTable(EnvelopeSize)));
        CentTable = createCentTable();
        SemitoneTable = createSemitoneTable();
        SincTable = createSincTable(Synthesizer.SincWidth, Synthesizer.SincResolution, .43, hammingWindow);
    }
    
    public static function createSquareTable(size:Int, k:Int) : FixedArray<Float32>
    {//Uses Fourier Expansion up to k terms 
        var FourOverPi = 4 / Math.PI;
        var squaretable = new FixedArray<Float32>(size);
        var inc = 1.0 / size;
        var phase:Float = 0;
        for (x in 0 ... size)
        {
            var value = 0.0;
            for (i in 1 ... (k+1))
            {
                var twokminus1 = (2 * i) - 1;
                value += Math.sin(Synthesizer.TwoPi * (twokminus1) * phase) / (twokminus1);
            }
            squaretable[x] = SynthHelper.clampF((FourOverPi * value), -1, 1);
            phase += inc;
        }
        return squaretable;
    }

    public static function createCentTable() : FixedArray<Float32>
    {//-100 to 100 cents
        var cents = new FixedArray<Float32>(201);
        for(x in 0 ... cents.length)
        {
            cents[x] = Math.pow(2.0, (x - 100.0) / 1200.0);
        }
        return cents;
    }
    
    public static function createSemitoneTable() : FixedArray<Float32>
    {//-127 to 127 semitones
        var table = new FixedArray<Float32>(255);
        for(x in 0 ... table.length)
        {
            table[x] = Math.pow(2.0, (x - 127.0) / 12.0);
        }
        return table;
    }
    
    public static function createSustainTable(size:Int) : FixedArray<Float32>
    {
        var table = new FixedArray<Float32>(size);
        for(x in 0 ... size)
        {
            table[1];
        }
        return table;
    }
    
    public static function createLinearTable(size:Int) : FixedArray<Float32>
    {
        var table = new FixedArray<Float32>(size);
        for(x in 0 ... size)
        {
            table[x] = x / cast((size - 1), Float);
        }
        return table;
    }
    
    public static function createExponentialTable(size:Int, coeff:Float) : FixedArray<Float32>
    {
        coeff = SynthHelper.clampF(coeff, .001, .9);
        var graph:FixedArray<Float32> = new FixedArray<Float32>(size);
        var val:Float = 0;
        for (x in 0 ... size)
        {
            graph[x] = val;
            val += coeff * ((1 / 0.63) - val);
        }
        for (x in 0 ... size)
        {
            graph[x] = graph[x] / graph[graph.length - 1];
        }
        return graph;
    }
    
    public static function createSineTable(size:Int) : FixedArray<Float32>
    {
        var graph:FixedArray<Float32> = new FixedArray<Float32>(size);
        var inc:Float = (3.0 * Math.PI / 2.0) / (size - 1);
        var phase:Float = 0;
        for (x in 0 ... size)
        {
            graph[x] = Math.abs(Math.sin(phase));
            phase += inc;
        }
        return graph;
    }
    private static function removeDenormals(data: FixedArray<Float32>) : FixedArray<Float32>
    {
        for (x in 0 ... data.length)
        {
            if (Math.abs(data[x]) < Synthesizer.DenormLimit)
                data[x] = 0;
        }
        return data;
    }    
    
    public static function vonHannWindow(i:Float, size:Int) : Float
    {
        return 0.5 - 0.5 * Math.cos(Synthesizer.TwoPi * (0.5 + i / size));
    }
    
    public static function hammingWindow(i:Float, size:Int) : Float
    {
        return 0.54 - 0.46 * Math.cos(Synthesizer.TwoPi * i / size);  
    }
    
    public static function blackmanWindow(i:Float, size:Int) : Float
    {
        return 0.42659 - 0.49656 * Math.cos(Synthesizer.TwoPi * i / size) + 0.076849 * Math.cos(4.0 * Math.PI * i / size);
    }    
    
    public static function createSincTable(windowSize:Int, resolution:Int, cornerRatio:Float, windowFunction:Float->Int->Float) : FixedArray<Float32>
    {
        var subWindow:Int = Std.int((windowSize / 2) + 1); 
        var table:FixedArray<Float32> = new FixedArray<Float32>((subWindow * resolution));
        var gain:Float = 2.0 * cornerRatio;
        for (x in 0 ... subWindow)
        {
            for (y in 0 ... resolution)
            {
                var a = x + (y / cast(resolution,Float));
                var sinc = Synthesizer.TwoPi * cornerRatio * a;
                if (Math.abs(sinc) > 0.00001) 
                    sinc = Math.sin(sinc) / sinc; 
                else 
                    sinc = 1.0;
                table[x * Synthesizer.SincResolution + y] = (gain * sinc * windowFunction(a, windowSize));
            }
        }
        return table;
    }    
}