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
using System.Runtime.CompilerServices;
using AlphaSynth.Bank;
using AlphaSynth.IO;
using AlphaSynth.Midi;
using AlphaSynth.Sequencer;
using AlphaSynth.Synthesis;
using AlphaSynth.Util;

namespace AlphaSynth.Player
{
    public class SynthPlayer
    {
        private ISynthOutput _output;
        private Synthesizer _synth;
        private MidiFileSequencer _sequencer;
        private SynthPlayerEventDispatcher _events;

        public SynthPlayer()
        {
            Logger.Debug("Initializing player");
            _events = new SynthPlayerEventDispatcher();

            State = SynthPlayerState.Stopped;
            FirePlayerStateChanged();

            Logger.Debug("Opening output");
            _output = Platform.Platform.CreateOutput();

            _output.Finished += () =>
            {
                // stop everything
                Stop();
                Logger.Debug("Finished playback");
                _events.OnFinished();
            };
            _output.SampleRequest += () =>
            {
                // synthesize buffer
                _sequencer.FillMidiEventQueue();
                _synth.Synthesize();
                // send it to output
                _output.AddSamples(_synth.SampleBuffer);
            };
            _output.PositionChanged += pos =>
            {
                // log position
                FirePositionChanged(pos);
            };

            Logger.Debug("Creating synthesizer");
            _synth = new Synthesizer(SynthConstants.SampleRate, 2, 441, 3, 100);
            _sequencer = new MidiFileSequencer(_synth);
            _sequencer.AddFinishedListener(_output.SequencerFinished);

            _output.Open();
        }

        public SynthPlayerState State { get; private set; }
        public bool IsSoundFontLoaded { get; private set; }
        public bool IsMidiLoaded { get; private set; }

        private int _tickPosition;
        private int _timePosition;

        public int TickPosition
        {
            get { return _tickPosition; }
            set { TimePosition = _sequencer.TicksToMillis(value); }
        }

        public float MasterVolume
        {
            get { return _synth.MasterVolume; }
            set { _synth.MasterVolume = value; }
        }

        public int TimePosition
        {
            get { return _timePosition; }
            set
            {
                Logger.Debug("Seeking to position " + value + "ms");
                if (State == SynthPlayerState.Playing)
                {
                    _sequencer.Pause();
                    _output.Pause();
                }
                _sequencer.Seek(value);
                _output.Seek(value);
                if (State == SynthPlayerState.Playing)
                {
                    _sequencer.Play();
                    _output.Play();
                }
            }
        }

        public bool IsReady
        {
            get { return IsSoundFontLoaded && IsMidiLoaded; }
        }

        public void Play()
        {
            if (State == SynthPlayerState.Playing || !IsReady) return;
            Logger.Debug("Starting playback");
            _sequencer.Play();
            _output.Play();
            State = SynthPlayerState.Playing;
            FirePlayerStateChanged();
        }

        public void Pause()
        {
            if (State != SynthPlayerState.Playing || !IsReady) return;
            Logger.Debug("Pausing playback");
            _sequencer.Pause();
            _output.Pause();
            State = SynthPlayerState.Paused;
            FirePlayerStateChanged();
        }

        public void PlayPause()
        {
            if (State == SynthPlayerState.Playing || !IsReady) Pause();
            else Play();
        }

        public void Stop()
        {
            if (State == SynthPlayerState.Stopped || !IsReady) return;
            Logger.Debug("Stopping playback");
            _sequencer.Stop();
            _synth.Stop();
            _output.Stop();
            State = SynthPlayerState.Stopped;
            FirePlayerStateChanged();
            FirePositionChanged(0);
        }

        public void LoadSoundFontUrl(string url)
        {
            if (State != SynthPlayerState.Stopped) return;
            Logger.Info("Start loading soundfont from url " + url);
            var loader = new UrlLoader();
            loader.Url = url;
            loader.Method = "GET";
            loader.Complete = LoadSoundFontBytes;
            loader.Progress = OnSoundFontLoad;
            try
            {
                loader.Load();
            }
            catch (Exception e)
            {
                Logger.Error("Could not load soundfont from url: " + e);
            }
        }

        public void LoadSoundFontBytes(byte[] data)
        {
            if (State != SynthPlayerState.Stopped) return;
            var input = ByteBuffer.FromBuffer(data);
            try
            {
                Logger.Info("Loading soundfont from bytes");
                var bank = new PatchBank();
                bank.LoadSf2(input);
                _synth.LoadBank(bank);
                IsSoundFontLoaded = true;
                _events.OnSoundFontLoaded();
                Logger.Info("soundFont successfully loaded");
                if (IsReady) _events.OnReadyForPlay();
            }
            catch (Exception e)
            {
                Logger.Error("Could not load soundfont from bytes " + e);
                IsSoundFontLoaded = false;
                _synth.UnloadBank();
                _events.OnSoundFontLoadFailed();
            }
        }

        public void LoadMidiUrl(string url)
        {
            if (State != SynthPlayerState.Stopped) return;
            Logger.Info("Start loading midi from url " + url);
            var loader = new UrlLoader();
            loader.Url = url;
            loader.Method = "GET";
            loader.Complete = LoadMidiBytes;
            loader.Progress = OnMidiLoad;
            try
            {
                loader.Load();
            }
            catch (Exception e)
            {
                Logger.Error("Could not load midi from url: " + e);
            }
        }

        public void LoadMidiBytes(byte[] data)
        {
            if (State != SynthPlayerState.Stopped) return;
            var input = ByteBuffer.FromBuffer(data);
            try
            {
                Logger.Info("Loading midi from bytes");
                var midi = new MidiFile();
                midi.Load(input);
                _sequencer.LoadMidi(midi);
                IsMidiLoaded = true;
                _events.OnMidiLoaded();
                Logger.Info("Midi successfully loaded");
                if (IsReady) _events.OnReadyForPlay();
                FirePositionChanged(0);
            }
            catch (Exception e)
            {
                Logger.Error("Could not load midi from bytes " + e);
                IsMidiLoaded = false;
                _sequencer.UnloadMidi();
                _events.OnMidiLoadFailed();
            }
        }

        private void OnSoundFontLoad(int loaded, int total)
        {
            Logger.Debug("Soundfont downloading: " + loaded + "/" + total + " bytes");
            _events.OnSoundFontLoad(loaded, total);
        }

        private void OnMidiLoad(int loaded, int total)
        {
            Logger.Debug("Midi downloading: " + loaded + "/" + total + " bytes");
            _events.OnMidiLoad(loaded, total);
        }

        private void FirePositionChanged(int pos)
        {
            var endTime = (int)((_sequencer.EndTime / _synth.SampleRate) * 1000);
            var currentTime = pos;
            var endTick = _sequencer.MillisToTicks(endTime);
            var currentTick = _sequencer.MillisToTicks(currentTime);

            _tickPosition = currentTick;
            _timePosition = currentTime;
            Logger.Debug("Position changed: (time: " + currentTime + "/" + endTime + ", tick: " + currentTick + "/" + endTime + ")");
            _events.OnPositionChanged(currentTime, endTime, currentTick, endTick);
        }

        private void FirePlayerStateChanged()
        {
            _events.OnPlayerStateChanged(State);
        }

        public void AddEventListener(ISynthPlayerListener listener)
        {
            _events.Add(listener);
        }
    }
}
