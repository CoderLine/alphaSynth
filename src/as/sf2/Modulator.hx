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

import as.platform.Types.Short;
import haxe.io.BytesInput;

class Modulator
{
    private var _sourceModulationData:ModulatorType;
    private var _destinationGenerator:Int;
    private var _amount:Short;
    private var _sourceModulationAmount:ModulatorType;
    private var _sourceTransform:Int;
    
    public function new(input:BytesInput) 
    {
        _sourceModulationData = new ModulatorType(input);
        _destinationGenerator = input.readUInt16();
        _amount = cast input.readInt16();
        _sourceModulationAmount = new ModulatorType(input);
        _sourceTransform = input.readUInt16();
    }
}