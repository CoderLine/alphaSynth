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

import haxe.io.Bytes;

class UrlLoader
{
    public var url:String;
    public var method:String;
    
    public function new()
    {
    }
    
    #if flash
    public function load()
    {
        var loader = new flash.net.URLLoader();
        loader.addEventListener( flash.events.Event.COMPLETE, function(e) 
        {
            var data:flash.utils.ByteArray = loader.data;
            fireComplete(Bytes.ofData(data));
        });
        loader.addEventListener( flash.events.ProgressEvent.PROGRESS, function(e:flash.events.ProgressEvent) 
        {
            fireProgress(Std.int(e.bytesLoaded), Std.int(e.bytesTotal));
        });
        loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
        
        var request = new flash.net.URLRequest( url );
        request.method = method;
        loader.load(request);
    }
    #else 
    #error Unsupported platform
    #end
    
    public var progress:Int->Int->Void;
    private inline function fireProgress(loaded:Int, full:Int) 
    {
        if (progress != null) progress(loaded, full);
    }
        
    public var complete:Bytes->Void;
    private inline function fireComplete(data:Bytes) 
    {
        if (complete != null) complete(data);
    }
}