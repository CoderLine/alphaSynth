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
    public static var DefaultSine:Generator;
    public static var DefaultSaw:Generator;
    public static var DefaultSquare:Generator;
    public static var DefaultTriangle:Generator;
    
    public static function __init__()
    {
        DefaultSine = new SineGenerator(new GeneratorDescriptor());
        DefaultSaw = new SawGenerator(new GeneratorDescriptor());
        DefaultSquare = new SquareGenerator(new GeneratorDescriptor());
        DefaultTriangle = new TriangleGenerator(new GeneratorDescriptor());
    }
}