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
using AlphaSynth.Util;

namespace AlphaSynth.Main
{
    public interface IAlphaSynth
    {
        /// <summary>
        ///Starts the playback if possible
        /// </summary>    
        void Play();

        /// <summary>
        ///Pauses the playback if was running
        /// </summary>
        void Pause();

        /// <summary>
        /// Starts the playback if possible, pauses the playback if was running
        /// </summary>
        void PlayPause();

        /// <summary>
        /// Stopps the playback
        /// </summary>
        void Stop();

        /// <summary>
        /// Moves to the given tick position within the song
        /// </summary>
        /// <param name="tick">the midi tick position to jump at</param>
        void SetPositionTick(int tick);

        /// <summary>
        /// Moves to the given millisecond position within the song
        /// </summary>
        /// <param name="millis">the millisecond position to jump at</param>
        void SetPositionTime(int millis);

        /// <summary>
        /// Sets the master volume of the generated audio
        /// </summary>
        /// <param name="volume">the master volume from 0.0-3.0 (default 1.0)</param>
        void SetMasterVolume(float volume);

        /// <summary>
        /// Sets the current playback speed. 
        /// </summary>
        /// <param name="playbackSpeed">The playback speed where 1 is normal speed (100%) (0.125-8.0)</param>
        void SetPlaybackSpeed(float playbackSpeed);

        /// <summary>
        /// Loads a soundfont from the given url
        /// </summary>
        /// <param name="url">the url to load the soundfont from</param>
        void LoadSoundFontUrl(string url);

        /// <summary>
        ///Loads a soundfont from the given data
        /// </summary>
        /// <param name="data">a byte array to load the data from </param>
        void LoadSoundFontBytes(byte[] data);

        /// <summary>
        /// Loads a midi from the given url
        /// </summary>
        /// <param name="url">the url to load the midi from</param>
        void LoadMidiUrl(string url);

        /// <summary>
        ///Loads a midi from the given data
        /// </summary>
        /// <param name="data">a byte array to load the data from </param>
        void LoadMidiBytes(byte[] data);

        /// <summary>
        /// Sets the logging level which alphaTab should use.
        /// </summary>
        /// <param name="level">the logging level</param>
        void SetLogLevel(LogLevel level);
    }
}
