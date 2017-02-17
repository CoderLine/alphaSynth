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
using System;
using SharpKit.Html;
using SharpKit.JavaScript;
using Console = System.Console;

namespace AlphaSynth.Util
{
    public class Logger : HtmlContext
    {
        public static LogLevel LogLevel { get; set; }
        public static Action<string> LogHandler { get; set; }

        static Logger()
        {
            LogLevel = LogLevel.Info;
            LogHandler = s => console.log(s);
        }

        public static void Debug(string msg)
        {
            Log(LogLevel.Debug, msg);
        }

        public static void Warning(string msg)
        {
            Log(LogLevel.Warning, msg);
        }

        public static void Info(string msg)
        {
            Log(LogLevel.Info, msg);
        }

        public static void Error(string msg)
        {
            Log(LogLevel.Error, msg);
        }

        private static void Log(LogLevel logLevel, string msg)
        {
            if (logLevel < LogLevel) return;

            var caller = GetCaller();

            if (LogHandler != null)
            {
                LogHandler(caller + "-" + msg);
            }
        }


        [JsMethod(InlineCode = "arguments.callee.caller.caller.name")]
        private static string GetCaller()
        {
            return "";
        }
    }

    public enum LogLevel
    {
        None = 0,
        Debug = 1,
        Info = 2,
        Warning = 3,
        Error = 4
    }
}
