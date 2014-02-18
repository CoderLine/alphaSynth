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
package as.log;

import haxe.PosInfos;
import mconsole.LogLevel;
import mconsole.Printer;

class LevelPrinter implements Printer
{
    private var _target:Int->String->Void;
	private var _position:String;
	private var _lineNumber:String;
    
    public var level:Int;
    
    public function new(target:Int->String->Void) 
    {
        _target = target;
        level = logLevelToInt(LogLevel.log);
    }
    
    public function print(level:LogLevel, params:Array<Dynamic>, indent:Int, pos:PosInfos):Void 
    {
        var intLevel = logLevelToInt(level);
        if (intLevel < this.level) return;
        
        params = params.copy();
    
		// prepare message
		for (i in 0...params.length)
			params[i] = Std.string(params[i]);
		var message = params.join(", ");

        // get position
		var nextPosition = "@ " + pos.className + "." + pos.methodName;
		var nextLineNumber = Std.string(pos.lineNumber);

		// print positions/lines
		var lineColumn = "";
		var emptyLineColumn = "";

        if (nextPosition != _position)
        {
            printLine(intLevel, nextPosition);
        }
		
        emptyLineColumn = StringTools.lpad("", " ", 5);

        if (nextPosition != _position || nextLineNumber != _lineNumber)
        {
            lineColumn = StringTools.lpad("L" + nextLineNumber, " ", 6) + ": ";
        }
        else
        {
            lineColumn = emptyLineColumn;
        }
        
        _position = nextPosition;
		_lineNumber = nextLineNumber;
        
		// indent message
		var indent = StringTools.lpad("", " ", indent * 2);
		message = lineColumn + indent + message;
		message = message.split("\n").join("\n" + emptyLineColumn + indent);

		// print message
		printLine(intLevel, message);
    }
    
    private inline function printLine(level:Int, message:String) : Void
    {
        _target(level, message);
    }
    
    public static inline var MinLogLevel = 0;
    public static inline var MaxLogLevel = 5;
    public static function logLevelToInt(level:LogLevel)
    {
        switch(level)
        {
            case error: return 4;
            case warn: return 3;
            case info: return 2;
            case debug: return 1;
            case log: return 0;
        }
    }
}