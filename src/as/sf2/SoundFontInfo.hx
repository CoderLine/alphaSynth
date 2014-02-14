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
import as.util.IOHelper;
import haxe.io.BytesInput;

class SoundFontInfo
{
    public var romVersionMajor(default,null):Short;
    public var romVersionMinor(default,null):Short;
    public var sfVersionMajor(default,null):Short;
    public var sfVersionMinor(default,null):Short;
    public var soundEngine(default,null):String;
    public var bankName(default,null):String;
    public var dataROM(default,null):String;
    public var creationDate(default,null):String;
    public var author(default,null):String;
    public var targetProduct(default,null):String;
    public var copyright(default,null):String;
    public var comments(default,null):String;
    public var tools(default,null):String;


    public function new(input:BytesInput) 
    {
        tools = "";
        comments = "";
        copyright = "";
        targetProduct = "";
        author = "";
        dataROM = "";
        creationDate = "";
        bankName = "";
        soundEngine = "";
        var id = IOHelper.read8BitChars(input, 4);
        var size = input.readInt32();
        if(id.toLowerCase() != "list")
            throw ("Invalid soundfont. Could not find INFO LIST chunk.");
        var readTo = input.position + size;
        id = IOHelper.read8BitChars(input, 4);
        if(id.toLowerCase() != "info")
            throw ("Invalid soundfont. The LIST chunk is not of type INFO."); 

        while (input.position < readTo)
        {
            id = IOHelper.read8BitChars(input, 4);
            size = input.readInt32();
            switch (id.toLowerCase())
            {
                case "ifil":
                    sfVersionMajor = cast input.readInt16();
                    sfVersionMinor = cast input.readInt16();
                case "isng":
                    soundEngine = IOHelper.read8BitStringLength(input, size);
                case "inam":
                    bankName = IOHelper.read8BitStringLength(input, size);
                case "irom":
                    dataROM = IOHelper.read8BitStringLength(input, size);
                case "iver":
                    romVersionMajor = cast input.readInt16();
                    romVersionMinor = cast input.readInt16();
                case "icrd":
                    creationDate = IOHelper.read8BitStringLength(input, size);
                case "ieng":
                    author = IOHelper.read8BitStringLength(input, size);
                case "iprd":
                    targetProduct = IOHelper.read8BitStringLength(input, size);
                case "icop":
                    copyright = IOHelper.read8BitStringLength(input, size);
                case "icmt":
                    comments = IOHelper.read8BitStringLength(input, size);
                case "isft":
                    tools = IOHelper.read8BitStringLength(input, size);
                default:
                    throw ("Invalid soundfont. The Chunk: " + id + " was not expected.");
            }
        }            
    }
    
}