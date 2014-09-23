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
using AlphaSynth.Ds;
using AlphaSynth.Midi;
using AlphaSynth.Midi.Event;
using AlphaSynth.Synthesis;
using AlphaSynth.Util;

namespace AlphaSynth.Sequencer
{
    public class MidiFileSequencer
    {
        private SynthEvent[] _synthData;
        private FastList<MidiFileSequencerTempoChange> _tempoChanges;
        private FastList<Action> _finished;
        private bool[] _blockList;
        private float _playbackRate;
        private int _eventIndex;
        private int _division;

        [IntrinsicProperty]
        public Synthesizer Synth { get; set; }
        [IntrinsicProperty]
        public bool IsPlaying { get; private set; }
        public bool IsMidiLoaded { get { return _synthData != null; } }
        [IntrinsicProperty]
        public int CurrentTempo { get; private set; }
        [IntrinsicProperty]
        public int CurrentTime { get; private set; }
        [IntrinsicProperty]
        public int EndTime { get; private set; }

        public float PlaySpeed
        {
            get { return _playbackRate; }
            set { _playbackRate = SynthHelper.ClampF(value, 0.125f, 8.0f); }
        }

        public MidiFileSequencer(Synthesizer synth)
        {
            Synth = synth;
            _eventIndex = 0;
            _division = 0;
            _playbackRate = 1;
            IsPlaying = false;
            _blockList = new bool[SynthConstants.DefaultChannelCount];
            _finished = new FastList<Action>();
            synth.AddMidiMessageProcessed(MidiEventProcessed);
        }

        public void AddFinishedListener(Action listener)
        {
            _finished.Add(listener);
        }

        private void FireFinished()
        {
            for (int i = 0; i < _finished.Count; i++)
            {
                var l = _finished[i];
                if (l != null)
                    l();
            }
        }


        public bool LoadMidi(MidiFile midiFile)
        {
            if (IsPlaying) return false;
            LoadMidiFile(midiFile);
            return true;
        }

        public bool UnloadMidi()
        {
            if (IsPlaying) return false;
            _synthData = null;
            return true;
        }

        public void Play()
        {
            if (IsPlaying || _synthData == null) return;
            IsPlaying = true;
        }

        public void Pause()
        {
            IsPlaying = false;
        }

        public void Stop()
        {
            IsPlaying = false;
            CurrentTime = 0;
            _eventIndex = 0;
        }

        public bool IsChannelMuted(int channel)
        {
            return _blockList[channel];
        }

        public void MuteAllChannels()
        {
            for (int x = 0; x < _blockList.Length; x++)
            {
                _blockList[x] = true;
            }
        }

        public void UnMuteAllChannels()
        {
            for (int x = 0; x < _blockList.Length; x++)
            {
                _blockList[x] = false;
            }
        }

        public void SetMute(int channel, bool muteValue)
        {
            _blockList[channel] = muteValue;
        }

        public void Seek(int milliseconds)
        {
            var targetSampleTime = (int)(Synth.SampleRate * (milliseconds / 1000.0));
            if (targetSampleTime > CurrentTime)
            {//process forward
                SilentProcess(targetSampleTime - CurrentTime);
            }
            else if (targetSampleTime < CurrentTime)
            {//we have to restart the midi to make sure we get the right state: instruments, volume, pan, etc
                CurrentTime = 0;
                _eventIndex = 0;
                Synth.NoteOffAll(true);
                Synth.ResetPrograms();
                Synth.ResetSynthControls();
                SilentProcess(targetSampleTime);
            }
        }

        public void FillMidiEventQueue()
        {
            if (!IsPlaying || Synth.MidiEventQueue.Length != 0)
                return;
            if (CurrentTime >= EndTime)
            {
                CurrentTime = 0;
                _eventIndex = 0;
                IsPlaying = false;
                Synth.NoteOffAll(true);
                Synth.ResetPrograms();
                Synth.ResetSynthControls();
                FireFinished();
                return;
            }

            var newMSize = (int)(Synth.MicroBufferSize * _playbackRate);
            var endSample = CurrentTime + (newMSize * Synth.MicroBufferCount);
            for (int x = 0; x < Synth.MicroBufferCount; x++)
            {
                CurrentTime += newMSize;
                while (_eventIndex < _synthData.Length && _synthData[_eventIndex].Delta < CurrentTime)
                {
                    if (_synthData[_eventIndex].Event.Command != MidiEventTypeEnum.NoteOn || !_blockList[_synthData[_eventIndex].Event.Channel])
                    {
                        Synth.MidiEventQueue.AddFirst(_synthData[_eventIndex]);
                        Synth.MidiEventCounts[x]++;
                    }
                    _eventIndex++;
                }
            }
        }

        private void LoadMidiFile(MidiFile midiFile)
        {
            _tempoChanges = new FastList<MidiFileSequencerTempoChange>();
            //Converts midi to sample based format for easy sequencing
            float bpm = 120.0f;
            //Combine all tracks into 1 track that is organized from lowest to highest absolute time
            if (midiFile.Tracks.Length > 1 || midiFile.Tracks[0].EndTime == 0)
                midiFile.CombineTracks();

            //Convert delta time to sample time
            _synthData = new SynthEvent[midiFile.Tracks[0].MidiEvents.Length];
            _division = midiFile.Division;
            _eventIndex = 0;
            CurrentTime = 0;
            CurrentTempo = (int)bpm;
            //Calculate sample based time using double counter and round down to nearest integer sample.
            var absDelta = 0.0;
            var absTick = 0;
            var absTime = 0.0;
            for (int x = 0; x < midiFile.Tracks[0].MidiEvents.Length; x++)
            {
                var mEvent = midiFile.Tracks[0].MidiEvents[x];
                _synthData[x] = new SynthEvent(mEvent);
                absTick += mEvent.DeltaTime;
                absTime += mEvent.DeltaTime * (60000.0 / (bpm * midiFile.Division));
                absDelta += Synth.SampleRate * mEvent.DeltaTime * (60.0 / (bpm * midiFile.Division));
                _synthData[x].Delta = (int)(absDelta);
                //Update tempo
                if (IsTempoMessage(mEvent.Command, mEvent.Data1))
                {
                    var meta = (MetaNumberEvent)mEvent;
                    bpm = MidiHelper.MicroSecondsPerMinute / meta.Value;
                    _tempoChanges.Add(new MidiFileSequencerTempoChange(bpm, absTick, (int)(absTime)));
                }
            }

            EndTime = _synthData[_synthData.Length - 1].Delta;
        }

        private void MidiEventProcessed(MidiEvent midiEvent)
        {
            if (IsTempoMessage(midiEvent.Command, midiEvent.Data1))
            {
                var meta = (MetaNumberEvent)midiEvent;
                CurrentTempo = (int)(MidiHelper.MicroSecondsPerMinute / meta.Value);
            }
        }

        private bool IsTempoMessage(MidiEventTypeEnum command, int data1)
        {
            return command == MidiEventTypeEnum.Meta && data1 == (int)MetaEventTypeEnum.Tempo;
        }

        public int MillisToTicks(int time)
        {
            var ticks = 0;
            var bpm = 120.0;
            var lastChange = 0;

            // find start and bpm of last tempo change before time
            for (int i = 0; i < _tempoChanges.Count; i++)
            {
                var c = _tempoChanges[i];
                if (time < c.Time)
                {
                    break;
                }
                ticks = c.Ticks;
                bpm = c.Bpm;
                lastChange = c.Time;
            }

            // add the missing ticks
            time -= lastChange;
            ticks += (int)(time / (60000.0 / (bpm * _division)));

            return ticks;
        }

        public int TicksToMillis(int ticks)
        {
            var time = 0;
            var bpm = 120.0;
            var lastChange = 0;

            // find start and bpm of last tempo change before time
            for (int i = 0; i < _tempoChanges.Count; i++)
            {
                var c = _tempoChanges[i];
                if (ticks < c.Ticks)
                {
                    break;
                }
                time = c.Time;
                bpm = c.Bpm;
                lastChange = c.Ticks;
            }

            // add the missing millis
            ticks -= lastChange;
            time += (int)(ticks * (60000.0 / (bpm * _division)));

            return time;
        }

        private void SilentProcess(int amount)
        {
            if (amount <= 0) return;
            while (_eventIndex < _synthData.Length && _synthData[_eventIndex].Delta < (CurrentTime + amount))
            {
                if (_synthData[_eventIndex].Event.Command != MidiEventTypeEnum.NoteOn)
                {
                    var m = _synthData[_eventIndex];
                    Synth.ProcessMidiMessage(m.Event);
                }
                _eventIndex++;
            }
            CurrentTime += amount;
        }
    }

    public class MidiFileSequencerTempoChange
    {
        public float Bpm { get; set; }
        public int Ticks { get; set; }
        public int Time { get; set; }

        public MidiFileSequencerTempoChange(float bpm, int ticks, int time)
        {
            Bpm = bpm;
            Ticks = ticks;
            Time = time;
        }
    }
}
