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

import flash.display.Sprite;
import flash.system.Worker;
import flash.system.WorkerDomain;
import format.swf.Reader;
import format.swf.Writer;
import haxe.io.Bytes;
import haxe.io.BytesData;
import haxe.io.BytesInput;
import haxe.io.BytesOutput;
import haxe.macro.Format;

class HxWorker 
{
	public static function workerFromClass(clazz:Class<Dynamic>, giveAppPrivileges = false, bytes:BytesData = null, domain:WorkerDomain = null):Worker 
    {
		var type = clazz;
		while (type != null && type != Sprite) 
        {
			type = Type.getSuperClass(type);
		}
		if (type != Sprite) 
        {
			throw 'Class ${Type.getClassName(clazz)} must inherit from Sprite to link to the root';
		}
		if (bytes == null) 
        {
			bytes = flash.Lib.current.loaderInfo.bytes;
		}
		var swfReader = new Reader(new BytesInput(Bytes.ofData(bytes)));
		
		var swf = swfReader.read();
		for (tag in swf.tags) 
        {
			switch (tag) 
            {
				case TSymbolClass(refs):
					for (ref in refs) 
                    {
						if (ref.cid == 0) 
                        {
							ref.className = Type.getClassName(clazz);
							
							var swfData = new BytesOutput();
							new Writer(swfData).write(swf);
							
							if (domain == null) 
                            {
								domain = WorkerDomain.current;
							}
							return domain.createWorker(swfData.getBytes().getData(), giveAppPrivileges);
						}
					}
				case _:
			}
		}
		return null;
	}
}