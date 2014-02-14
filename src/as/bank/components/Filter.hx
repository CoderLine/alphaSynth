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
package as.bank.components;

import as.bank.components.Enum;
import as.bank.descriptors.FilterDescriptor;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;
import as.synthesis.Synthesizer;
import as.synthesis.SynthHelper;

class Filter
{
    private var _a1:Float32;
    private var _a2:Float32;
    private var _b1:Float32;
    private var _b2:Float32;
    private var _m1:Float32;
    private var _m2:Float32;
    private var _m3:Float32;
    private var _lastFc:Float32;
    
    public var filterMethod(default,null):Int;
    public var cutOff(default,null):Float32;
    public var resonance(default,null):Float32;
    public var enabled(get, null):Bool;
    public function get_enabled() : Bool
    {
        return filterMethod != FilterTypeEnum.None;
    }
    
    public function new()
    {
        
    }
    
    public function disable()
    {
        filterMethod = FilterTypeEnum.None;
    }
    
    public function quickSetup(sampleRate:Int, note:Int, velocity:Float32, filterInfo:FilterDescriptor)
    {
        cutOff = filterInfo.cutOff;
        resonance = filterInfo.resonance;
        filterMethod = filterInfo.filterMethod;
        _lastFc = -1000;
        _m1 = 0;
        _m2 = 0;
        _m3 = 0;
        if (filterMethod == FilterTypeEnum.None || cutOff <= 0.0 || resonance <= 0.0)
        {
            filterMethod = FilterTypeEnum.None;
        }
        else
        {
            var fc = cutOff * SynthHelper.centsToPitch((note - filterInfo.rootKey) * filterInfo.keyTrack + Std.int(velocity * filterInfo.velTrack));
            updateCoefficients(SynthHelper.clampF(fc / sampleRate, 0, .5), resonance);
        }
    }
    
    public function updateCoefficients(fc:Float32, q:Float32) : Void
    {
        fc = SynthHelper.clampF(fc, 0, .49);
        if (Math.abs(_lastFc - fc) > .001)
        {
            switch (filterMethod)
            {
                case FilterTypeEnum.BiquadLowpass:
                    configBiquadLowpass(fc, q);
                case FilterTypeEnum.BiquadHighpass:
                    configBiquadHighpass(fc, q);
                case FilterTypeEnum.OnePoleLowpass:
                    configOnePoleLowpass(fc);
            }
            _lastFc = fc;
        }
    }
    
    public function applyFilterSingle(sample:Float32) : Float32
    {
        switch(filterMethod)
        {
            case FilterTypeEnum.BiquadHighpass, FilterTypeEnum.BiquadLowpass:
                _m3 = sample - _a1 * _m1 - _a2 * _m2;
                sample = _b2 * (_m3 + _m2) + _b1 * _m1;
                _m2 = _m1;
                _m1 = _m3;
                return sample;
            case FilterTypeEnum.OnePoleLowpass:
                _m1 += _a1 * (sample - _m1);
                return _m1;
            default:
                return 0;
        }
    }
    
    public function applyFilterMulti(data:FixedArray<Float32>) : Void
    {
        for (x in 0 ... data.length)
        {
            data[x] = applyFilterSingle(data[x]);
        }
    }

    private function configBiquadLowpass(fc:Float32, q:Float32)
    {
        var w0 = Synthesizer.TwoPi * fc;
        var cosw0 = Math.cos(w0);
        var alpha = Math.sin(w0) / (2.0 * q);
        var a0inv = 1.0 / (1.0 + alpha);
        _a1 = (-2.0 * cosw0 * a0inv);
        _a2 = ((1.0 - alpha) * a0inv);
        _b1 = ((1.0 - cosw0) * a0inv * (1.0 / Math.sqrt(q)));
        _b2 = _b1 * 0.5;
    }
    
    private function configBiquadHighpass(fc:Float32, q:Float32)
    {
        var w0 = Synthesizer.TwoPi * fc;
        var cosw0 = Math.cos(w0);
        var alpha = Math.sin(w0) / (2.0 * q);
        var a0inv = 1.0 / (1.0 + alpha);
        var qinv = 1.0 / Math.sqrt(q);
        _a1 = (-2.0 * cosw0 * a0inv);
        _a2 = ((1.0 - alpha) * a0inv);
        _b1 = ((-1.0 - cosw0) * a0inv * qinv);
        _b2 = ((1.0 + cosw0) * a0inv * qinv * 0.5);
    }
    
    private function configOnePoleLowpass(fc:Float32)
    {
        _a1 = 1.0 - Math.exp(-2.0 * Math.PI * fc);
    }    
}