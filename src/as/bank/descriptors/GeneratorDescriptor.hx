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

import as.bank.components.Enum.LoopModeEnum;
import as.bank.components.Enum.WaveformEnum;
import as.platform.Types.Float32;
import as.platform.Types.Short;

class GeneratorDescriptor 
{
    public var loopMethod:Int;
    public var samplerType:Int;
    public var assetName : String;
    public var endPhase:Float32;
    public var startPhase:Float32;
    public var loopEndPhase:Float32;
    public var loopStartPhase:Float32;
    public var offset:Float32;
    public var period:Float32;
    public var rootkey:Short;
    public var keyTrack:Short;
    public var velTrack:Short;
    public var tune:Short;
    
    public function new() 
    {
        applyDefault();
    }
    
    private function applyDefault()
    {
        loopMethod = LoopModeEnum.NoLoop;
        samplerType = WaveformEnum.Sine;
        assetName = "null";
        endPhase = -1;
        startPhase = -1;
        loopEndPhase = -1;
        loopStartPhase = -1;
        offset = 0;
        period = -1;
        rootkey = cast -1;
        keyTrack = cast 100;
        velTrack = cast 0;
        tune = cast 0;
    }
    
}