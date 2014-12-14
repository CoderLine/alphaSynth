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

using SharpKit.Html;
using SharpKit.JavaScript;

namespace AlphaSynth.Util
{
    public partial class UrlLoader
    {
        [JsMethod(InlineCodeExpression = "new Uint8Array(arrayBuffer)", Export = false)]
        private byte[] NewUint8Array(object arrayBuffer)
        {
            return null;
        }

        public void Load()
        {
            var request = new XMLHttpRequest();
            request.open(Method, Url, true);
            request.responseType = "arraybuffer";
            request.onload = e =>
            {
                var buffer = NewUint8Array(request.response);
                if (buffer != null)
                {
                    FireComplete(buffer);
                }
            };
            request.onprogress = e =>
            {
                var progressE = e;
                FireProgress(progressE.loaded, progressE.total);
            };
            request.send();
        }
    }
}
