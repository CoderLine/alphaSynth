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
package as.bank.components.generators;

import as.bank.components.Enum.GeneratorStateEnum;
import as.bank.components.Enum.InterpolationEnum;
import as.bank.components.generators.GeneratorParameters;
import as.bank.descriptors.GeneratorDescriptor;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Float32;
import as.synthesis.Synthesizer;

class SampleGenerator extends Generator
{
    public var samples:FixedArray<Float32>;

    public function new() 
    {
        super(new GeneratorDescriptor());
    }
    
    public override function getValue(phase:Float32):Float32
    {
        return samples[Std.int(phase)];
    }
    
    public override function getValues(generatorParams:GeneratorParameters, blockBuffer:FixedArray<Float32>, increment:Float32):Void 
    {
        var proccessed:Int = 0;
        do
        {
            var samplesAvailable:Int = Std.int(Math.ceil((generatorParams.currentEnd - generatorParams.phase) / increment));
            if (samplesAvailable > blockBuffer.length - proccessed)
            {
                interpolate(generatorParams, blockBuffer, increment, proccessed, blockBuffer.length);
                return; //proccessed = blockBuffer.Length;
            }
            else
            {
                var endProccessed = proccessed + samplesAvailable;
                interpolate(generatorParams, blockBuffer, increment, proccessed, endProccessed);
                proccessed = endProccessed;
                switch (generatorParams.currentState)
                {
                    case GeneratorStateEnum.PreLoop:
                        generatorParams.currentStart = loopStartPhase;
                        generatorParams.currentEnd = loopEndPhase;
                        generatorParams.currentState = GeneratorStateEnum.Loop;
                    case GeneratorStateEnum.Loop:
                        generatorParams.phase += generatorParams.currentStart - generatorParams.currentEnd;
                    case GeneratorStateEnum.PostLoop:
                        generatorParams.currentState = GeneratorStateEnum.Finished;
                        while (proccessed < blockBuffer.length)
                            blockBuffer[proccessed++] = 0;
                }
            }
        } while (proccessed < blockBuffer.length);
    }
    

    private function interpolate(generatorParams:GeneratorParameters, blockBuffer:FixedArray<Float32>, increment:Float32, start:Int, end:Int)
    {
        var _end:Float32 = generatorParams.currentState == GeneratorStateEnum.Loop ? this.loopEndPhase - 1 : this.endPhase -1 ;
        var index:Int;
        var s0:Float32;
        var s1:Float32;
        var s2:Float32;
        var s3:Float32;
        var mu:Float32;        
        switch (Synthesizer.InterpolationMode)
        {
            case InterpolationEnum.Linear:
            {
                while (start < end && generatorParams.phase < _end)//do this until we reach an edge case or fill the buffer
                {
                    index = Std.int(generatorParams.phase);
                    s1 = samples[index];
                    s2 = samples[index + 1];
                    mu = (generatorParams.phase - index);
                    blockBuffer[start++] = s1 + mu * (s2 - s1);
                    generatorParams.phase += increment;
                }
                while (start < end)//edge case, if in loop wrap to loop start else use duplicate sample
                {
                    index = Std.int(generatorParams.phase);
                    s1 = samples[index];
                    if (generatorParams.currentState == GeneratorStateEnum.Loop)
                        s2 = samples[Std.int(generatorParams.currentStart)];
                    else
                        s2 = s1;
                    mu = Std.int(generatorParams.phase - index);
                    blockBuffer[start++] = s1 + mu * (s2 - s1);
                    generatorParams.phase += increment;
                }
            }
            case InterpolationEnum.Cosine:
            {
                while (start < end && generatorParams.phase < _end)//do this until we reach an edge case or fill the buffer
                {
                    index = Std.int(generatorParams.phase);
                    s1 = samples[index];
                    s2 = samples[index + 1];
                    mu = (1 - Math.cos((generatorParams.phase - index) * Math.PI)) * 0.5;
                    blockBuffer[start++] = s1 * (1 - mu) + s2 * mu;
                    generatorParams.phase += increment;
                }
                while (start < end)//edge case, if in loop wrap to loop start else use duplicate sample
                {
                    index = Std.int(generatorParams.phase);
                    s1 = samples[index];
                    if (generatorParams.currentState == GeneratorStateEnum.Loop)
                        s2 = samples[Std.int(generatorParams.currentStart)];
                    else
                        s2 = s1;
                    mu = (1 - Math.cos((generatorParams.phase - index) * Math.PI)) * 0.5;
                    blockBuffer[start++] = s1 * (1 - mu) + s2 * mu;
                    generatorParams.phase += increment;
                }
            }
            case InterpolationEnum.CubicSpline:
            {
                _end = generatorParams.currentState == GeneratorStateEnum.Loop ? this.loopStartPhase + 1 : this.startPhase + 1;
                while (start < end && generatorParams.phase < _end)//edge case, wrap to l or duplicate sample
                {
                    index = Std.int(generatorParams.phase);
                    if (generatorParams.currentState == GeneratorStateEnum.Loop)
                        s0 = samples[Std.int(generatorParams.currentEnd - 1)];
                    else
                        s0 = samples[index];
                    s1 = samples[index];
                    s2 = samples[index + 1];
                    s3 = samples[index + 2];
                    mu = (generatorParams.phase - index);
                    blockBuffer[start++] = ((-0.5 * s0 + 1.5 * s1 - 1.5 * s2 + 0.5 * s3) * mu * mu * mu + (s0 - 2.5 * s1 + 2 * s2 - 0.5 * s3) * mu * mu + (-0.5 * s0 + 0.5 * s2) * mu + (s1));
                    generatorParams.phase += increment;
                }
                _end = generatorParams.currentState == GeneratorStateEnum.Loop ? this.loopEndPhase - 2 : this.endPhase - 2;
                while (start < end && generatorParams.phase < _end)
                {
                    index = Std.int(generatorParams.phase);
                    s0 = samples[index - 1];
                    s1 = samples[index];
                    s2 = samples[index + 1];
                    s3 = samples[index + 2];
                    mu =(generatorParams.phase - index);
                    blockBuffer[start++] = ((-0.5 * s0 + 1.5 * s1 - 1.5 * s2 + 0.5* s3) * mu * mu * mu + (s0 - 2.5 * s1 + 2 * s2 - 0.5 * s3) * mu * mu + (-0.5 * s0 + 0.5 * s2) * mu + (s1));
                    generatorParams.phase += increment;
                }
                _end += 1;
                while (start < end)//edge case, wrap to startpoint or duplicate sample
                {
                    index = Std.int(generatorParams.phase);
                    s0 = samples[index - 1];
                    s1 = samples[index];
                    if (generatorParams.phase < _end)
                    {
                        s2 = samples[index + 1];
                        if (generatorParams.currentState == GeneratorStateEnum.Loop)
                            s3 = samples[Std.int(generatorParams.currentStart)];
                        else
                            s3 = s2;
                    }
                    else
                    {
                        if (generatorParams.currentState == GeneratorStateEnum.Loop)
                        {
                            s2 = samples[Std.int(generatorParams.currentStart)];
                            s3 = samples[Std.int(generatorParams.currentStart + 1)];
                        }
                        else
                        {
                            s2 = s1;
                            s3 = s1;
                        }
                    }
                    mu = (generatorParams.phase - index);
                    blockBuffer[start++] = ((-0.5 * s0 + 1.5 * s1 - 1.5 * s2 + 0.5 * s3) * mu * mu * mu + (s0 - 2.5* s1 + 2 * s2 - 0.5 * s3) * mu * mu + (-0.5 * s0 + 0.5 * s2) * mu + (s1));
                    generatorParams.phase += increment;
                }
            }
            default:
            {
                while (start < end)
                {
                    blockBuffer[start++] = samples[Std.int(generatorParams.phase)];
                    generatorParams.phase += increment;
                }
            }
        }
    }    
}