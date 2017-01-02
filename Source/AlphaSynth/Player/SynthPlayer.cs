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
using System.ComponentModel;
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
        public ISynthOutput Output { get; private set; }
        public Synthesizer Synth { get; private set; }
        public MidiFileSequencer Sequencer { get; private set; }

        public SynthPlayer()
        {
            Logger.Debug("Initializing player");

            State = SynthPlayerState.Paused;
            OnPlayerStateChanged(new PlayerStateChangedEventArgs(State));

            Logger.Debug("Opening output");
            Output = Platform.Platform.CreateOutput();

            Logger.Debug("Creating synthesizer");
            Synth = new Synthesizer(Output.SampleRate, SynthConstants.AudioChannels, 441, 3, 100);
            Sequencer = new MidiFileSequencer(Synth);

            Sequencer.AddFinishedListener(Output.SequencerFinished);

            Output.Finished += () =>
            {
                // stop everything
                Stop();
                Logger.Debug("Finished playback");
                OnFinished();
            };
            Output.SampleRequest += () =>
            {
                // synthesize buffer
                Sequencer.FillMidiEventQueue();
                Synth.Synthesize();
                // send it to output
                Output.AddSamples(Synth.SampleBuffer);
            };
            Output.PositionChanged += pos =>
            {
                // log position
                if (State == SynthPlayerState.Playing)
                {
                    FirePositionChanged(pos);   
                }
            };

            Output.Open();
        }

        public SynthPlayerState State { get; private set; }
        public bool IsSoundFontLoaded { get; private set; }
        public bool IsMidiLoaded { get; private set; }

        private int _tickPosition;
        private double _timePosition;
        private float _playbackSpeed;

        public int TickPosition
        {
            get { return _tickPosition; }
            set { TimePosition = Sequencer.TicksToMillis(value) / Sequencer.PlaybackSpeed; }
        }

        public float MasterVolume
        {
            get { return Synth.MasterVolume; }
            set { Synth.MasterVolume = value; }
        }

        public double TimePosition
        {
            get { return _timePosition; }
            set
            {
                Logger.Debug("Seeking to position " + value + "ms");
                if (State == SynthPlayerState.Playing)
                {
                    Sequencer.Pause();
                    Output.Pause();
                }
                Sequencer.Seek(value);
                Output.Seek(value);
                if (State == SynthPlayerState.Playing)
                {
                    Sequencer.Play();
                    Output.Play();
                }
                else
                {
                    FirePositionChanged(value);
                }
            }
        }

        public float PlaybackSpeed
        {
            get { return _playbackSpeed; }
            set
            {
                _playbackSpeed = SynthHelper.ClampF(value, 0.125f, 8.0f);
                Sequencer.PlaybackSpeed = _playbackSpeed;
                Output.SetPlaybackSpeed(_playbackSpeed);
            }
        }

        public void SetPlaybackRange(int startTick, int endTick)
        {
            // pause playback to prevent flickering on audio, 
            // for now we don't support on-the-fly changing of the playback range.
            if (State == SynthPlayerState.Playing)
            {
                Pause();
            }
            Sequencer.SetPlaybackRange(startTick, endTick);
            TickPosition = startTick;
        }

        public bool IsReady
        {
            get { return IsSoundFontLoaded && IsMidiLoaded; }
        }

        public void Play()
        {
            if (State == SynthPlayerState.Playing || !IsReady) return;
            Logger.Debug("Starting playback");
            Sequencer.Play();
            Output.Play();
            State = SynthPlayerState.Playing;
            OnPlayerStateChanged(new PlayerStateChangedEventArgs(State));
        }

        public void Pause()
        {
            if (State != SynthPlayerState.Playing || !IsReady) return;
            Logger.Debug("Pausing playback");
            Sequencer.Pause();
            Output.Pause();
            State = SynthPlayerState.Paused;
            OnPlayerStateChanged(new PlayerStateChangedEventArgs(State));
        }

        public void PlayPause()
        {
            if (State == SynthPlayerState.Playing || !IsReady) Pause();
            else Play();
        }

        public void Stop()
        {
            Pause();
            TimePosition = (Sequencer.PlaybackRangeStart > 0) ? Sequencer.PlaybackRangeStart : 0;
        }

        public void LoadSoundFontUrl(string url)
        {
            if (State != SynthPlayerState.Paused) return;
            Logger.Info("Start loading soundfont from url " + url);
            var loader = new UrlLoader();
            loader.Url = url;
            loader.Method = "GET";
            loader.Complete = LoadSoundFontBytes;
            loader.Progress = OnLoaderSoundFontLoad;
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
            if (State != SynthPlayerState.Paused) return;
            var input = ByteBuffer.FromBuffer(data);
            try
            {
                Logger.Info("Loading soundfont from bytes");
                var bank = new PatchBank();
                bank.LoadSf2(input);
                Synth.LoadBank(bank);
                IsSoundFontLoaded = true;
                OnSoundFontLoaded();
                Logger.Info("soundFont successfully loaded");
                if (IsReady) OnReadyForPlay();
            }
            catch (Exception e)
            {
                Logger.Error("Could not load soundfont from bytes " + e);
                IsSoundFontLoaded = false;
                Synth.UnloadBank();
                OnSoundFontLoadFailed();
            }
        }

        public void LoadMidiUrl(string url)
        {
            if (State != SynthPlayerState.Paused) return;
            Logger.Info("Start loading midi from url " + url);
            var loader = new UrlLoader();
            loader.Url = url;
            loader.Method = "GET";
            loader.Complete = LoadMidiBytes;
            loader.Progress = OnLoaderMidiLoad;
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
            if (State != SynthPlayerState.Paused) return;
            var input = ByteBuffer.FromBuffer(data);
            try
            {
                Logger.Info("Loading midi from bytes");
                var midi = new MidiFile();
                midi.Load(input);
                Sequencer.LoadMidi(midi);
                IsMidiLoaded = true;
                OnMidiLoaded();
                Logger.Info("Midi successfully loaded");
                if (IsReady) OnReadyForPlay();
                FirePositionChanged(0);
            }
            catch (Exception e)
            {
                Logger.Error("Could not load midi from bytes " + e);
                IsMidiLoaded = false;
                Sequencer.UnloadMidi();
                OnMidiLoadFailed();
            }
        }

        private void OnLoaderSoundFontLoad(int loaded, int total)
        {
            Logger.Debug("Soundfont downloading: " + loaded + "/" + total + " bytes");
            OnSoundFontLoad(new ProgressEventArgs(loaded, total));
        }

        private void OnLoaderMidiLoad(int loaded, int total)
        {
            Logger.Debug("Midi downloading: " + loaded + "/" + total + " bytes");
            OnMidiLoad(new ProgressEventArgs(loaded, total));
        }

        private void FirePositionChanged(double pos)
        {
            Sequencer.CheckForStop(pos);

            var endTime = Math.Ceiling(Sequencer.EndTime / (double)Synth.SampleRate) * 1000;
            var currentTime = pos;
            var endTick = Sequencer.MillisToTicks(endTime);
            var currentTick = Sequencer.MillisToTicks(currentTime);

            _tickPosition = currentTick;
            _timePosition = currentTime;
            Logger.Debug("Position changed: (time: " + currentTime + "/" + endTime + ", tick: " + currentTick + "/" + endTime + ")");
            OnPositionChanged(new PositionChangedEventArgs(currentTime, endTime, currentTick, endTick));
        }


        public event EventHandler<PositionChangedEventArgs> PositionChanged;
        protected virtual void OnPositionChanged(PositionChangedEventArgs e)
        {
            EventHandler<PositionChangedEventArgs> handler = PositionChanged;
            if (handler != null) handler(this, e);
        }

        public event EventHandler<PlayerStateChangedEventArgs> PlayerStateChanged;
        protected virtual void OnPlayerStateChanged(PlayerStateChangedEventArgs e)
        {
            EventHandler<PlayerStateChangedEventArgs> handler = PlayerStateChanged;
            if (handler != null) handler(this, e);
        }

        public event EventHandler Finished;
        protected virtual void OnFinished()
        {
            EventHandler handler = Finished;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler<ProgressEventArgs> SoundFontLoad;
        protected virtual void OnSoundFontLoad(ProgressEventArgs e)
        {
            EventHandler<ProgressEventArgs> handler = SoundFontLoad;
            if (handler != null) handler(this, e);
        }

        public event EventHandler SoundFontLoaded;
        protected virtual void OnSoundFontLoaded()
        {
            EventHandler handler = SoundFontLoaded;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler SoundFontLoadFailed;
        protected virtual void OnSoundFontLoadFailed()
        {
            EventHandler handler = SoundFontLoadFailed;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler<ProgressEventArgs> MidiLoad;
        protected virtual void OnMidiLoad(ProgressEventArgs e)
        {
            EventHandler<ProgressEventArgs> handler = MidiLoad;
            if (handler != null) handler(this, e);
        }

        public event EventHandler MidiLoaded;
        protected virtual void OnMidiLoaded()
        {
            EventHandler handler = MidiLoaded;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler MidiLoadFailed;
        protected virtual void OnMidiLoadFailed()
        {
            EventHandler handler = MidiLoadFailed;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler ReadyForPlay;
        protected virtual void OnReadyForPlay()
        {
            EventHandler handler = ReadyForPlay;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }
    }

    public class EmptyEventArgs : EventArgs
    {
        public static readonly EmptyEventArgs Instance = new EmptyEventArgs();
        private EmptyEventArgs()
        {

        }
    }

    public class ProgressEventArgs : EventArgs
    {
        public int Loaded { get; private set; }
        public int Total { get; private set; }

        public ProgressEventArgs(int loaded, int total)
        {
            Loaded = loaded;
            Total = total;
        }
    }

    public class PlayerStateChangedEventArgs : EventArgs
    {
        public SynthPlayerState State { get; private set; }

        public PlayerStateChangedEventArgs(SynthPlayerState state)
        {
            State = state;
        }
    }

    public class PositionChangedEventArgs : EventArgs
    {
        public double CurrentTime { get; private set; }
        public double EndTime { get; private set; }
        public int CurrentTick { get; private set; }
        public int EndTick { get; private set; }

        public PositionChangedEventArgs(double currentTime, double endTime, int currentTick, int endTick)
        {
            CurrentTime = currentTime;
            EndTime = endTime;
            CurrentTick = currentTick;
            EndTick = endTick;
        }
    }
}
