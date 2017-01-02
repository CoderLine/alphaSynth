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
        private int _eventIndex;
        private int _division;

        public Synthesizer Synth { get; set; }
        public bool IsPlaying { get; private set; }
        public bool IsMidiLoaded { get { return _synthData != null; } }
        public int CurrentTempo { get; private set; }
        public int CurrentSampleTime { get; private set; }
        public int EndTime { get; private set; }

        public int PlaybackRangeStartSampleTime { get; private set; }
        public double PlaybackRangeStart
        {
            get
            {
                return PlaybackRangeStartSampleTime < 0 ? -1 : SampleTimeToMillis(PlaybackRangeStartSampleTime);
            }
        }

        public int PlaybackRangeEndSampleTime { get; private set; }
        public double PlaybackRangeEnd
        {
            get
            {
                return PlaybackRangeEndSampleTime < 0 ? -1 : SampleTimeToMillis(PlaybackRangeEndSampleTime);
            }
        }

        public float PlaybackSpeed
        {
            get;
            set;
        }

        public MidiFileSequencer(Synthesizer synth)
        {
            Synth = synth;
            _eventIndex = 0;
            _division = 0;
            PlaybackSpeed = 1;
            IsPlaying = false;
            _blockList = new bool[SynthConstants.DefaultChannelCount];
            _finished = new FastList<Action>();
            synth.AddMidiMessageProcessed(MidiEventProcessed);
            PlaybackRangeEndSampleTime = -1;
            PlaybackRangeStartSampleTime = -1;
        }

        public void SetPlaybackRange(int startTick, int endTick)
        {
            PlaybackRangeStartSampleTime = MillisToSampleTime((int)(TicksToMillis(startTick) / PlaybackSpeed));
            PlaybackRangeEndSampleTime = MillisToSampleTime((int)(TicksToMillis(endTick) / PlaybackSpeed));
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

        public void Seek(double milliseconds)
        {
            var targetSampleTime = MillisToSampleTime(milliseconds);
            if (targetSampleTime > CurrentSampleTime)
            {//process forward
                SilentProcess(targetSampleTime - CurrentSampleTime);
            }
            else if (targetSampleTime < CurrentSampleTime)
            {//we have to restart the midi to make sure we get the right state: instruments, volume, pan, etc
                CurrentSampleTime = 0;
                _eventIndex = 0;
                Synth.NoteOffAll(true);
                Synth.ResetPrograms();
                Synth.ResetSynthControls();
                SilentProcess(targetSampleTime);
            }
        }

        private int MillisToSampleTime(double milliseconds)
        {
            return (int)(Synth.SampleRate * (milliseconds / 1000.0));
        }

        private double SampleTimeToMillis(int sampleTime)
        {
            return sampleTime / (double)Synth.SampleRate * 1000;
        }

        public void FillMidiEventQueue()
        {
            if (!IsPlaying || Synth.MidiEventQueue.Length != 0)
                return;
            
            var newMSize = (int)(Synth.MicroBufferSize * PlaybackSpeed);
            for (int x = 0; x < Synth.MicroBufferCount; x++)
            {
                CurrentSampleTime += newMSize;
                while (_eventIndex < _synthData.Length && _synthData[_eventIndex].Delta < CurrentSampleTime)
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
            CurrentSampleTime = 0;
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

        public int MillisToTicks(double time)
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
            // we add 1 for possible rounding errors.(floating point issuses)
            return ticks + 1;
        }

        public double TicksToMillis(int ticks)
        {
            var time = 0.0;
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
            time += (ticks * (60000.0 / (bpm * _division)));

            return time;
        }

        private void SilentProcess(int amount)
        {
            if (amount <= 0) return;
            while (_eventIndex < _synthData.Length && _synthData[_eventIndex].Delta < (CurrentSampleTime + amount))
            {
                if (_synthData[_eventIndex].Event.Command != MidiEventTypeEnum.NoteOn)
                {
                    var m = _synthData[_eventIndex];
                    Synth.ProcessMidiMessage(m.Event);
                }
                _eventIndex++;
            }
            CurrentSampleTime += amount;
        }

        public void CheckForStop(double pos)
        {
            pos = MillisToSampleTime(pos);
            if (PlaybackRangeEndSampleTime < 0 && pos >= EndTime)
            {
                CurrentSampleTime = 0;
                _eventIndex = 0;
                IsPlaying = false;
                Synth.NoteOffAll(true);
                Synth.ResetPrograms();
                Synth.ResetSynthControls();
                FireFinished();
            }
            else if (PlaybackRangeEndSampleTime > 0 && pos >= PlaybackRangeEndSampleTime)
            {
                CurrentSampleTime = PlaybackRangeStartSampleTime;
                _eventIndex = 0;
                IsPlaying = false;
                Synth.NoteOffAll(true);
                Synth.ResetPrograms();
                Synth.ResetSynthControls();
                FireFinished();
            }
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
