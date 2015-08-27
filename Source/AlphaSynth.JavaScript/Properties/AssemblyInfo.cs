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
using System.Reflection;

// General Information about an assembly is controlled through the following 
// set of attributes. Change these attribute values to modify the information
// associated with an assembly.
using AlphaSynth.IO;
using AlphaSynth.Main;
using AlphaSynth.Player;
using SharpKit.JavaScript;

[assembly: AssemblyTitle("AlphaSynth")]
[assembly: AssemblyDescription("alphaSynth is a multi platform midi synthesizer")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("")]
[assembly: AssemblyProduct("AlphaSynth")]
[assembly: AssemblyCopyright("Copyright ©  2014")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]

// Version information for an assembly consists of the following four values:
//
//      Major Version
//      Minor Version 
//      Build Number
//      Revision
//
// You can specify all the values or you can default the Build and Revision Numbers 
// by using the '*' as shown below:
// [assembly: AssemblyVersion("1.0.*")]
[assembly: AssemblyVersion("1.0.0.0")]
[assembly: AssemblyFileVersion("1.0.0.0")]

[assembly: JsExport(ExportComments = true, OmitSharpKitHeaderComment = true, ForceOmitCasts = true, ForceIntegers = true)]
// Export all Types
[assembly: JsType(Mode = JsMode.Prototype,
                    AutomaticPropertiesAsFields = true,
                    Export = true,
                    IgnoreGenericTypeArguments = true,
                    IgnoreGenericMethodArguments = true,
                    OmitCasts = true
                    )]

// Exclude Interfaces from exporting
[assembly: JsType(Export = false, TargetType = typeof(IAlphaSynth))]
[assembly: JsType(Export = false, TargetType = typeof(IFlashSynthOutput))]
[assembly: JsType(Export = false, TargetType = typeof(IAlphaSynthAsync))]
[assembly: JsType(Export = false, TargetType = typeof(IAlphaSynthSync))]
[assembly: JsType(Export = false, TargetType = typeof(ISynthOutput))]
[assembly: JsType(Export = false, TargetType = typeof(IReadable))]
[assembly: JsType(Export = false, TargetType = typeof(IWriteable))]

[assembly: JsType(JsMode.Prototype, TargetType = typeof(Math), Name = "Math", NativeArrayEnumerator = true, NativeEnumerator = false, Export = false)]

[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Min", Name = "min")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Max", Name = "max")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Abs", Name = "abs")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Pow", Name = "pow")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Sqrt", Name = "sqrt")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Sin", Name = "sin")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Cos", Name = "cos")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Tan", Name = "tan")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Ceiling", Name = "ceil")]
[assembly: JsMethod(TargetType = typeof(Math), TargetMethod = "Log10", InlineCodeExpression = "(Math.log(d) / Math.LN10)")]

[assembly: JsMethod(TargetType = typeof(string), TargetMethod = "IsNullOrEmpty", InlineCodeExpression = "((value == null) || (value.length == 0))")]
[assembly: JsMethod(TargetType = typeof(string), TargetMethod = "StartsWith", InlineCodeExpression = "this.indexOf(value) == 0")]
[assembly: JsMethod(TargetType = typeof(string), TargetMethod = "EndsWith", InlineCodeExpression = "(this.lastIndexOf(value) == (this.length - value.length))")]
[assembly: JsMethod(TargetType = typeof(string), TargetMethod = "Contains", InlineCodeExpression = "this.indexOf(value) != -1")]
[assembly: JsMethod(TargetType = typeof(string), TargetMethod = "Replace", InlineCodeExpression = "this.replace(oldValue, newValue)")]
[assembly: JsMethod(TargetType = typeof(string), TargetMethod = "Split", InlineCodeExpression = "this.split(separator)")]
[assembly: JsMethod(TargetType = typeof(string), TargetMethod = "get_Chars", Name = "charCodeAt", NativeOverloads = true)]

[assembly: JsMethod(TargetType = typeof(IComparable), TargetMethod = "CompareTo", InlineCodeExpression = "(this - obj)")]
[assembly: JsMethod(TargetType = typeof(int), TargetMethod = "CompareTo", InlineCodeExpression = "(this - value)")]

[assembly: JsMethod(TargetType = typeof(Nullable<>), TargetMethod = "get_Value", InlineCodeExpression = "this")]