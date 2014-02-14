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

import as.bank.components.Enum.FilterTypeEnum;
import as.platform.Types.Float32;
import as.platform.Types.Short;

class FilterDescriptor 
{
    public var filterMethod:Int;
    public var cutOff:Float32;
    public var resonance:Float32;
    public var rootKey:Short;
    public var keyTrack:Short;
    public var velTrack:Short;
    
    public function new() 
    {
        filterMethod = FilterTypeEnum.None;
        cutOff = -1;
        resonance = 1;
        rootKey = cast 60;
        keyTrack = cast 0;
        velTrack = cast 0;
    }
}