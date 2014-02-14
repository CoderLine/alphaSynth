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

class GeneratorStateEnum 
{
    public static inline var PreLoop = 0;
    public static inline var Loop = 1;
    public static inline var PostLoop = 2;
    public static inline var Finished = 3; 
}

class EnvelopeStateEnum 
{ 
    public static inline var Delay = 0;
    public static inline var Attack = 1;
    public static inline var Hold = 2;
    public static inline var Decay = 3;
    public static inline var Sustain = 4;
    public static inline var Release = 5;
    public static inline var None = 6;
}

class LfoStateEnum 
{ 
    public static inline var Delay = 0;
    public static inline var Sustain = 1;
}

class WaveformEnum 
{ 
    public static inline var Sine = 0;
    public static inline var Square = 1;
    public static inline var Saw = 2;
    public static inline var Triangle = 3;
    public static inline var SampleData = 4;
    public static inline var WhiteNoise = 5; 
}

class InterpolationEnum 
{ 
    public static inline var None = 0;
    public static inline var Linear = 1;
    public static inline var Cosine = 2;
    public static inline var CubicSpline = 3;
    public static inline var Sinc = 4;
}

class LoopModeEnum 
{ 
    public static inline var NoLoop = 0;
    public static inline var OneShot = 1;
    public static inline var Continuous = 2;
    public static inline var LoopUntilNoteOff = 3; 
}

class FilterTypeEnum 
{ 
    public static inline var None = 0;
    public static inline var BiquadLowpass = 1;
    public static inline var BiquadHighpass = 2;
    public static inline var OnePoleLowpass = 3;
}