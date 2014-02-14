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
package as.bank.descriptors;

import as.platform.Types.Float32;
import as.platform.Types.Short;

class EnvelopeDescriptor
{
    public var delayTime:Float32;    
    public var attackTime:Float32;   
    public var attackGraph:Short;
    public var holdTime:Float32;     
    public var decayTime:Float32;    
    public var decayGraph:Short;
    public var sustainTime:Float32;  
    public var releaseTime:Float32;  
    public var releaseGraph:Short;
    public var sustainLevel:Float32; 
    public var peakLevel:Float32;    
    public var startLevel:Float32;
    public var depth:Float32;
    public var vel2Delay:Float32;
    public var vel2Attack:Float32;
    public var vel2Hold:Float32;
    public var vel2Decay:Float32;
    public var vel2Sustain:Float32;
    public var vel2Release:Float32;
    public var vel2Depth:Float32;
    
    public function new() 
    {
        delayTime = 0;
        attackTime = 0;
        attackGraph = cast 1;
        holdTime = 0;
        decayTime = 0;
        decayGraph = cast 1;
        sustainTime = 3600;
        releaseTime = 0;
        releaseGraph = cast 1;
        sustainLevel = 0;
        peakLevel = 1;
        startLevel = 0;
        depth = 1;
        vel2Delay = 0;
        vel2Attack = 0;
        vel2Hold = 0;
        vel2Decay = 0;
        vel2Sustain = 0;
        vel2Release = 0;
        vel2Depth = 0;
    }
}