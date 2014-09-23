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
namespace AlphaSynth.Player
{
    public interface ISynthPlayerListener
    {
        void OnPositionChanged(int currentTime, int endTime, int currentTick, int endTick);
        void OnPlayerStateChanged(SynthPlayerState state);
        void OnFinished();
        void OnSoundFontLoad(int loaded, int full);
        void OnSoundFontLoaded();
        void OnSoundFontLoadFailed();
        void OnMidiLoad(int loaded, int full);
        void OnMidiLoaded();
        void OnMidiLoadFailed();
        void OnReadyForPlay();
    }
}
