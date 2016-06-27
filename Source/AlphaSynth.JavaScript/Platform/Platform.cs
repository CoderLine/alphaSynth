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
using AlphaSynth.Player;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.JavaScript;

namespace AlphaSynth.Platform
{
    public class Platform
    {
        public static bool SupportsWebAudio
        {
            [JsMethod(InlineCode = "!!window.ScriptProcessorNode", Export = false)]
            get { return false; }
        }

        public static bool SupportsWebWorkers
        {
            [JsMethod(InlineCode = "!!window.Worker", Export = false)]
            get { return false; }
        }

        public static bool ForceFlash
        {
            [JsMethod(InlineCode = "!!window.ForceFlash", Export = false)]
            get { return false; }
        }

        public static ISynthOutput CreateOutput()
        {
            return new WebWorkerOutput();
        }

        static Platform()
        {
            PlatformInit();
        }

        public static string ScriptFile { get; set; }
        private static void PlatformInit()
        {
            // try to build the find the alphaTab script url in case we are not in the webworker already
            if (HtmlContext.self.document.As<bool>())
            {
                var scriptElement = HtmlContext.document.Member("currentScript").As<HtmlScriptElement>();

                // fallback to script tag that has an alphatab data attribute set.
                if (!scriptElement.As<bool>())
                {
                    scriptElement = HtmlContext.document.querySelector("script[data-alphasynth]").As<HtmlScriptElement>();
                }

                // failed to automatically resolve
                if (!scriptElement.As<bool>())
                {
                    HtmlContext.console.warn("Could not automatically find alphaSynth script file for worker, please add the data-alphasynth attribute to the script tag that includes alphasynth or provide it when initializing");
                }
                else
                {
                    ScriptFile = scriptElement.src;
                }
            }
        }
    }
}
