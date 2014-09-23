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
using System;
using System.Runtime.CompilerServices;
using AlphaSynth.Bank.Descriptors;
using AlphaSynth.Ds;

namespace AlphaSynth.Bank.Components.Generators
{
    public enum LoopMode
    {
        NoLoop = 0,
        OneShot = 1,
        Continuous = 2,
        LoopUntilNoteOff = 3
    }

    public enum GeneratorState
    {
        PreLoop = 0,
        Loop = 1,
        PostLoop = 2,
        Finished = 3
    }

    public abstract class Generator
    {
        [IntrinsicProperty]
        public LoopMode LoopMode { get; set; }
        [IntrinsicProperty]
        public double LoopStartPhase { get; set; }
        [IntrinsicProperty]
        public double LoopEndPhase { get; set; }
        [IntrinsicProperty]
        public double StartPhase { get; set; }
        [IntrinsicProperty]
        public double EndPhase { get; set; }
        [IntrinsicProperty]
        public double Offset { get; set; }
        [IntrinsicProperty]
        public double Period { get; set; }
        [IntrinsicProperty]
        public double Frequency { get; set; }
        [IntrinsicProperty]
        public short RootKey { get; set; }
        [IntrinsicProperty]
        public short KeyTrack { get; set; }
        [IntrinsicProperty]
        public short VelocityTrack { get; set; }
        [IntrinsicProperty]
        public short Tune { get; set; }


        protected Generator(GeneratorDescriptor description)
        {
            LoopMode = description.LoopMethod;
            LoopStartPhase = description.LoopStartPhase;
            LoopEndPhase = description.LoopEndPhase;
            StartPhase = description.StartPhase;
            EndPhase = description.EndPhase;
            Offset = description.Offset;
            Period = description.Period;
            Frequency = 0;
            RootKey = description.RootKey;
            KeyTrack = description.KeyTrack;
            VelocityTrack = description.VelTrack;
            Tune = description.Tune;
        }

        public void Release(GeneratorParameters generatorParams)
        {
            if (LoopMode == LoopMode.LoopUntilNoteOff)
            {
                generatorParams.CurrentState = GeneratorState.PostLoop;
                generatorParams.CurrentStart = StartPhase;
                generatorParams.CurrentEnd = EndPhase;
            }
        }

        public abstract float GetValue(double phase);
        public virtual void GetValues(GeneratorParameters generatorParams, SampleArray blockBuffer, double increment)
        {
            var proccessed = 0;
            do
            {
                var samplesAvailable = (int)(Math.Ceiling((generatorParams.CurrentEnd - generatorParams.Phase) / increment));
                if (samplesAvailable > blockBuffer.Length - proccessed)
                {
                    while (proccessed < blockBuffer.Length)
                    {
                        blockBuffer[proccessed++] = GetValue(generatorParams.Phase);
                        generatorParams.Phase += increment;
                    }
                }
                else
                {
                    var endProccessed = proccessed + samplesAvailable;
                    while (proccessed < endProccessed)
                    {
                        blockBuffer[proccessed++] = GetValue(generatorParams.Phase);
                        generatorParams.Phase += increment;
                    }
                    switch (generatorParams.CurrentState)
                    {
                        case GeneratorState.PreLoop:
                            generatorParams.CurrentStart = LoopStartPhase;
                            generatorParams.CurrentEnd = LoopEndPhase;
                            generatorParams.CurrentState = GeneratorState.Loop;
                            break;
                        case GeneratorState.Loop:
                            generatorParams.Phase += generatorParams.CurrentStart - generatorParams.CurrentEnd;
                            break;
                        case GeneratorState.PostLoop:
                            generatorParams.CurrentState = GeneratorState.Finished;
                            while (proccessed < blockBuffer.Length)
                                blockBuffer[proccessed++] = 0;
                            break;
                    }
                }
            } while (proccessed < blockBuffer.Length);
        }
    }
}
