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

import as.bank.descriptors.GeneratorDescriptor;

class DefaultGenerators
{
    private static var _defaultSine:Generator;
    private static var _defaultSaw:Generator;
    private static var _defaultSquare:Generator;
    private static var _defaultTriangle:Generator;
  
    public static function defaultSine():Generator
    {
        if (_defaultSine == null) _defaultSine = new SineGenerator(new GeneratorDescriptor());
        return _defaultSine;
    }
   
    public static function defaultSaw():Generator
    {
        if (_defaultSaw == null) _defaultSaw = new SawGenerator(new GeneratorDescriptor());
        return _defaultSaw;
    }
    
    public static function defaultSquare():Generator
    {
        if (_defaultSquare == null) _defaultSquare = new SquareGenerator(new GeneratorDescriptor());
        return _defaultSquare;
    }
    
    public static function defaultTriangle():Generator
    {
        if (_defaultTriangle == null) _defaultTriangle = new TriangleGenerator(new GeneratorDescriptor());
        return _defaultTriangle;
    }
}