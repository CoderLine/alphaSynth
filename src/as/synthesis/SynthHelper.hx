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
package as.synthesis;

import as.platform.Types.Byte;
import as.platform.Types.Float32;
import as.platform.Types.Short;
import as.util.Tables;

class VoiceStateEnum
{
    public static inline var Stopped = 0;
    public static inline var Stopping = 1;
    public static inline var Playing = 2;
}

class PanFormulaEnum
{
    public static inline var Neg3dBCenter = 0;
    public static inline var Neg6dBCenter = 1;
    public static inline var ZeroCenter = 2;
}

class PanComponent
{
    public var left:Float32;
    public var right:Float32;
    
    public function new()
    {
        
    }
    
    public function setValue(value:Float32, formula:Int)
    {
        value = SynthHelper.clampF(value, -1, 1);
        switch(formula)
        {
            case PanFormulaEnum.Neg3dBCenter:
            {
                var dvalue = Synthesizer.HalfPi * (value + 1) / 2.0;
                left = Math.cos(dvalue);
                right = Math.sin(dvalue);
            }
            case PanFormulaEnum.Neg6dBCenter:
            {
                left = .5 + value * -.5;
                right = .5 + value * .5;
            }
            case PanFormulaEnum.ZeroCenter:
            {
                var dvalue = Synthesizer.HalfPi * (value + 1.0) / 2.0;
                left = (Math.cos(dvalue) / Synthesizer.InverseSqrtOfTwo);
                right = (Math.sin(dvalue) / Synthesizer.InverseSqrtOfTwo);
            }
            default:
                throw ("Invalid pan law selected.");
        }
    }
}

class SynthHelper
{
    public static function clampF(value:Float32, min:Float32, max:Float32) : Float32
    {
        if (value <= min)
            return min;
        else if (value >= max)
            return max;
        else
            return value;
    }
    public static function clampI(value:Int, min:Int, max:Int) : Int
    {
        if (value <= min)
            return min;
        else if (value >= max)
            return max;
        else
            return value;
    }
    public static function clampS(value:Short, min:Short, max:Short) : Short
    {
        if (value <= min)
            return min;
        else if (value >= max)
            return max;
        else
            return value;
    }
    
    public static function nearestPowerOfTwo(value: Float32) : Float32
    {
        return Math.pow(2, Math.round(Math.log(value) / Math.log(2)));
    }
    public static function samplesFromTime(sampleRate: Int, seconds: Float32) : Float32
    {
        return sampleRate * seconds;
    }
    public static function timeFromSamples(sampleRate: Int, samples: Int) : Float32
    {
        return samples / cast(sampleRate, Float32);
    }
        
    public static function dBtoLinear(dBvalue: Float32) : Float32
    {
        return Math.pow(10.0, (dBvalue / 20.0));
    }
    public static function lineartoDB(linearvalue: Float32) : Float32
    {
        return 20.0 * (Math.log(linearvalue) / Math.log(10));
    }

    //Midi Note and Frequency Conversions
    public static function frequencyToKey(frequency: Float32, rootkey: Int) : Float32
    {
        return 12.0 * (Math.log(frequency / 440.0) / Math.log(2.0)) + rootkey;
    }
    public static function keyToFrequency(key: Float32, rootkey: Int) : Float32
    {
        return Math.pow(2.0, (key - rootkey) / 12.0) * 440.0;
    }

    public static function semitoneToPitch(key: Int) : Float32
    {//does not return a frequency, only the 2^(1/12) value.
        if (key < -127)
            key = -127;
        else if (key > 127)
            key = 127;
        return Tables.SemitoneTable[127 + key];
    }
    public static function centsToPitch(cents: Int) : Float32
    {//does not return a frequency, only the 2^(1/12) value.
        var key:Int = Std.int(cents / 100.0);
        cents -= key * 100;
        if (key < -127)
            key = -127;
        else if (key > 127)
            key = 127;
        return Tables.SemitoneTable[127 + key] * Tables.CentTable[100 + cents];
    }

    //Mixing
    public static function mixStereoToStereoInterpolation(startIndex: Int, leftVol: Float32, rightVol: Float32, voiceParams:VoiceParameters) : Void
    {
        var inc_l = (leftVol - voiceParams.mixing[0]) / Synthesizer.DefaultBlockSize;
        var inc_r = (rightVol - voiceParams.mixing[1]) / Synthesizer.DefaultBlockSize;
        var i = 0;
        while(i < voiceParams.blockBuffer.length)
        {
            voiceParams.mixing[0] += inc_l;
            voiceParams.mixing[1] += inc_r;
            voiceParams.synth.sampleBuffer[startIndex + i] += voiceParams.blockBuffer[i++] * voiceParams.mixing[0];
            voiceParams.synth.sampleBuffer[startIndex + i] += voiceParams.blockBuffer[i] * voiceParams.mixing[1];
            i++;
        }
        voiceParams.mixing[0] = leftVol;
        voiceParams.mixing[1] = rightVol;
    }   
    
    public static function mixMonoToStereoInterpolation(startIndex: Int, leftVol: Float32, rightVol: Float32, voiceParams:VoiceParameters) : Void
    {
        var inc_l = (leftVol - voiceParams.mixing[0]) / Synthesizer.DefaultBlockSize;
        var inc_r = (rightVol - voiceParams.mixing[1]) / Synthesizer.DefaultBlockSize;
        for (i in 0 ... voiceParams.blockBuffer.length)
        {
            voiceParams.mixing[0] += inc_l;
            voiceParams.mixing[1] += inc_r;
            voiceParams.synth.sampleBuffer[startIndex] += voiceParams.blockBuffer[i] * voiceParams.mixing[0];
            voiceParams.synth.sampleBuffer[startIndex + 1] += voiceParams.blockBuffer[i] * voiceParams.mixing[1];
            startIndex += 2;
        }
        voiceParams.mixing[0] = leftVol;
        voiceParams.mixing[1] = rightVol;
    }
    public static function mixMonoToMonoInterpolation(startIndex: Int, volume: Float32, voiceParams:VoiceParameters) : Void
    {
        var inc = (volume - voiceParams.mixing[0]) / Synthesizer.DefaultBlockSize;
        for (i in 0 ... voiceParams.blockBuffer.length)
        {
            voiceParams.mixing[0] += inc;
            voiceParams.synth.sampleBuffer[startIndex + i] += voiceParams.blockBuffer[i] * voiceParams.mixing[0];
        }
        voiceParams.mixing[0] = volume;
    }    
}