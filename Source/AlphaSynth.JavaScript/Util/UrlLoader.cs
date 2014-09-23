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
using System.Net;
using AlphaSynth.IO;

namespace AlphaSynth.Util
{
    public partial class UrlLoader
    {
        public void Load()
        {
            var request = new XmlHttpRequest();
            request.Open(Method, Url, true);
            request.ResponseType = XmlHttpRequestResponseType.Arraybuffer;
            request.OnLoad = e =>
            {
                var buffer = (ByteArray)request.Response;
                if (buffer != null)
                {
                    FireComplete(buffer);
                }
            };
            request.OnProgress = e =>
            {
                var progressE = (ProgressEvent)e;
                FireProgress((int)progressE.Loaded, (int)progressE.Total);
            };
            request.Send();
        }
    }
}
