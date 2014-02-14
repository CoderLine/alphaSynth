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
package as.sf2;

import as.sf2.Enum;
import as.platform.Types.TypeUtils;
import haxe.io.BytesInput;

class ModulatorType
{
    private var _controllerSource:Int;/*ushort*/
    public var polarity:Int;
    public var direction:Int;
    public var sourceType:Int;
    public var isMidiContinuousController(default,null):Bool;
    
    public function new(input:BytesInput) 
    {
        var raw = input.readUInt16();
        
        if ((raw & 0x0200) == 0x0200)
            polarity = PolarityEnum.Bipolar;
        else
            polarity = PolarityEnum.Unipolar;
        if ((raw & 0x0100) == 0x0100)
            direction = DirectionEnum.MaxToMin;
        else
            direction = DirectionEnum.MinToMax;
            
        isMidiContinuousController = ((raw & 0x0080) == 0x0080);
        sourceType = ((raw & (0xFC00)) >> 10);
        _controllerSource = TypeUtils.ToUInt16((raw & 0x007F));
    }
}