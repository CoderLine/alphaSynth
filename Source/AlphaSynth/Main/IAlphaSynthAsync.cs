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

namespace AlphaSynth.Main
{
    /// <summary>
    /// Adds some getters to the IAlphaSynth interface. 
    /// The return values are reported asynchronously via event.
    /// </summary>
    public interface IAlphaSynthAsync : IAlphaSynth
    {
        /// <summary>
        ///  Is ready for play
        /// </summary>
        void IsReadyForPlay();

        /// <summary>
        ///  Returns the current player state
        /// </summary>
        void GetState();

        /// <summary>
        ///  Returns whether the soundfont was loaded and parsed
        /// </summary>
        /// <retur
        void IsSoundFontLoaded();

        /// <summary>
        ///  Returns whether the midi data was loaded and parsed
        /// </summary>
        void IsMidiLoaded();

        /// <summary>
        ///  Adds a new event listener to events
        /// </summary>
        void On(string events, Action<object> fn);

        void Startup();
    }
}
