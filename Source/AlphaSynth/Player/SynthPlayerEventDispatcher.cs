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
using AlphaSynth.Ds;

namespace AlphaSynth.Player
{
    public class SynthPlayerEventDispatcher : ISynthPlayerListener
    {
        private readonly FastList<ISynthPlayerListener> _listeners;

        public SynthPlayerEventDispatcher()
        {
            _listeners = new FastList<ISynthPlayerListener>();
        }

        public void OnPositionChanged(int currentTime, int endTime, int currentTick, int endTick)
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnPositionChanged(currentTime, endTime, currentTick, endTick);
            }
        }

        public void OnPlayerStateChanged(SynthPlayerState state)
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnPlayerStateChanged(state);
            }
        }

        public void OnFinished()
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnFinished();
            }
        }

        public void OnSoundFontLoad(int loaded, int full)
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnSoundFontLoad(loaded, full);
            }
        }

        public void OnSoundFontLoaded()
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnSoundFontLoaded();
            }
        }

        public void OnSoundFontLoadFailed()
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnSoundFontLoadFailed();
            }
        }

        public void OnMidiLoad(int loaded, int full)
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnMidiLoad(loaded, full);
            }
        }

        public void OnMidiLoaded()
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnMidiLoaded();
            }
        }

        public void OnMidiLoadFailed()
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnMidiLoadFailed();
            }
        }

        public void OnReadyForPlay()
        {
            for (int i = 0; i < _listeners.Count; i++)
            {
                _listeners[i].OnReadyForPlay();
            }
        }

        public void Add(ISynthPlayerListener listener)
        {
            _listeners.Add(listener);
        }
    }
}
