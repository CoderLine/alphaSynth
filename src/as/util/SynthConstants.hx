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
import as.bank.components.Enum.InterpolationEnum;

class SynthConstants
{
    public static var InterpolationMode = InterpolationEnum.Linear;

    public static inline var SampleRate = 44100;

    public static var TwoPi = 2.0 * Math.PI;      
    public static var HalfPi = Math.PI / 2.0;     
    public static inline var InverseSqrtOfTwo = 0.707106781186;
    public static inline var DefaultLfoFrequency = 8.0;
    public static inline var DefaultModDepth = 100;
    public static inline var DefaultPolyphony = 40;    
    public static inline var MinPolyphony = 5;         
    public static inline var MaxPolyphony = 250;       
    public static inline var DefaultBlockSize = 64;    
    public static inline var MaxBufferSize = 0.05;   
    public static inline var MinBufferSize = 0.001;  
    public static inline var DenormLimit = 1e-38;   
    public static inline var NonAudible = 1e-5;       
    public static inline var SincWidth = 16;           
    public static inline var SincResolution = 64;      
    public static inline var MaxVoiceComponents = 4;   
    public static inline var DefaultChannelCount = 16; 
    public static inline var DefaultKeyCount = 128;    
}