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

namespace AlphaSynth.Main
{
    /// <summary>
    /// Adds some getters to the IAlphaSynth interface. 
    /// The return values are provided directly as return value
    /// </summary>
    public interface IAlphaSynthSync : IAlphaSynth
    {
        /// <summary>
        ///  Is ready for play
        /// </summary>
        bool IsReadyForPlay();

        /// <summary>
        /// Returns the current player state
        /// </summary>
        /// <returns>the current player state</returns>
        SynthPlayerState GetState();

        /// <summary>
        /// Returns the current master volume
        /// </summary>
        /// <returns>the current master volume</returns>
        float GetMasterVolume();

        /// <summary>
        /// Returns the current playback speed. 
        /// </summary>
        float GetPlaybackSpeed();

        /// <summary>
        ///  Returns whether the soundfont was loaded and parsed
        /// </summary>
        /// <returns>true if the soundfont was loaded and parsed</returns>
        bool IsSoundFontLoaded();

        /// <summary>
        ///  Returns whether the midi data was loaded and parsed
        /// </summary>
        /// <returns>true if the midi data was loaded and parsed</returns>
        bool IsMidiLoaded();
    }
}
