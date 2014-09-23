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
using System.Diagnostics;

namespace AlphaSynth.Util
{
    public class Logger
    {
        public static LogLevel LogLevel { get; set; }

        static Logger()
        {
            LogLevel = LogLevel.Info;
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

            StackFrame frame = new StackFrame(2, true);
            var method = frame.GetMethod();
            var lineNumber = frame.GetFileLineNumber();

            var color = Console.ForegroundColor;
            switch (logLevel)
            {
                case LogLevel.None:
                    break;
                case LogLevel.Debug:
                    Console.ForegroundColor = ConsoleColor.DarkGray;
                    break;
                case LogLevel.Info:
                    Console.ForegroundColor = ConsoleColor.Gray;
                    break;
                case LogLevel.Warning:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    break;
                case LogLevel.Error:
                    Console.ForegroundColor = ConsoleColor.Red;
                    break;
            }

            Console.WriteLine("{0}.{1}:{2} - {3}", method.DeclaringType.FullName, method.Name, lineNumber, msg);
            Console.ForegroundColor = color;
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
