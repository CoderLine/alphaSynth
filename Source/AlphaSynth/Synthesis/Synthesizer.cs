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
using AlphaSynth.Bank.Patch;
using AlphaSynth.Ds;
using AlphaSynth.IO;
using AlphaSynth.Midi;
using AlphaSynth.Midi.Event;
using AlphaSynth.Platform;
using AlphaSynth.Util;

namespace AlphaSynth.Synthesis
{
    public class SynthEvent
    {
        [IntrinsicProperty]
        public MidiEvent Event { get; set; }
        [IntrinsicProperty]
        public int Delta { get; set; }

        public SynthEvent(MidiEvent e)
        {
            Event = e;
        }
    }

    public class Synthesizer
    {
        private VoiceManager _voiceManager;
        private SynthParameters[] _synthChannels;
        private float _masterVolume;
        private float _synthGain;
        private FastList<Action<MidiEvent>> _midiMessageProcessed;

        private Patch[] _layerList;

        [IntrinsicProperty]
        public LinkedList<SynthEvent> MidiEventQueue { get; private set; }

        [IntrinsicProperty]
        public int[] MidiEventCounts { get; private set; }

        [IntrinsicProperty]
        public SampleArray SampleBuffer { get; set; }

        /// <summary>
        /// The number of audio channels
        /// </summary>
        [IntrinsicProperty]
        public int AudioChannels { get; private set; }

        [IntrinsicProperty]
        public bool LittleEndian { get; set; }

        /// <summary>
        /// The patch bank that holds all of the currently loaded instrument patches
        /// </summary>
        [IntrinsicProperty]
        public PatchBank SoundBank { get; private set; }

        /// <summary>
        /// The number of samples per second produced per channel
        /// </summary>
        [IntrinsicProperty]
        public int SampleRate { get; private set; }

        /// <summary>
        /// Global volume control
        /// </summary>
        public float MasterVolume
        {
            get { return _masterVolume; }
            set { _masterVolume = SynthHelper.ClampF(value, 0, 3); }
        }

        /// <summary>
        /// The mix volume for each voice
        /// </summary>
        public float MixGain
        {
            get { return _synthGain; }
            set { _synthGain = SynthHelper.ClampF(value, 0.5f, 1); }
        }

        /// <summary>
        /// The size of the individual sub buffers in samples
        /// </summary>
        public int MicroBufferSize
        {
            get;
            private set;
        }

        /// <summary>
        /// The number of sub buffers
        /// </summary>
        public int MicroBufferCount
        {
            get;
            private set;
        }

        /// <summary>
        /// Controls the method used when stealing voices.
        /// </summary>
        public VoiceStealingMethod VoiceStealMethod
        {
            get { return _voiceManager.StealingMethod; }
            set { _voiceManager.StealingMethod = value; }
        }

        /// <summary>
        /// The number of voices in use.
        /// </summary>
        public int ActiveVoices
        {
            get { return _voiceManager.ActiveVoices.Length; }
        }

        /// <summary>
        /// The number of voices that are not being used.
        /// </summary>
        public int FreeVoices
        {
            get { return _voiceManager.FreeVoices.Length; }
        }

        /// <summary>
        /// The size of the entire buffer in bytes
        /// </summary>
        public int RawBufferSize
        {//Assuming 16 bit data;
            get { return SampleBuffer.Length * 2; }
        }

        /// <summary>
        /// The size of the entire buffer in samples
        /// </summary>
        public int WorkingBufferSize
        {
            get { return SampleBuffer.Length; }
        }

        /// <summary>
        /// The number of voices
        /// </summary>
        public int Polyphony
        {
            get { return _voiceManager.Polyphony; }
        }



        public Synthesizer(int sampleRate, int audioChannels, int bufferSize, int bufferCount, int polyphony)
        {
            var MinSampleRate = 8000;
            var MaxSampleRate = 96000;

            if (sampleRate < MinSampleRate || sampleRate > MaxSampleRate)
                throw new Exception("Invalid paramater: (sampleRate) Valid ranges are " + MinSampleRate + " to " +
                                    MaxSampleRate);
            if (audioChannels < 1 || audioChannels > 2)
                throw new Exception("Invalid paramater: (audioChannels) Valid ranges are " + 1 + " to " + 2);

            _midiMessageProcessed = new FastList<Action<MidiEvent>>();
            //
            // Setup synth parameters
            _masterVolume = 1;
            _synthGain = 0.35f;

            SampleRate = sampleRate;
            AudioChannels = audioChannels;
            MicroBufferSize = SynthHelper.ClampI(bufferSize, (int)(SynthConstants.MinBufferSize * sampleRate),
                (int)(SynthConstants.MaxBufferSize * sampleRate));
            MicroBufferSize =
                (int)
                    (Math.Ceiling(MicroBufferSize / (double)SynthConstants.DefaultBlockSize) *
                     SynthConstants.DefaultBlockSize); //ensure multiple of block size
            MicroBufferCount = (Math.Max(1, bufferCount));
            SampleBuffer = new SampleArray((MicroBufferSize * MicroBufferCount * audioChannels));
            LittleEndian = true;

            //Setup Controllers
            _synthChannels = new SynthParameters[SynthConstants.DefaultChannelCount];
            for (int x = 0; x < _synthChannels.Length; x++)
                _synthChannels[x] = new SynthParameters(this);
            //Create synth voices
            _voiceManager = new VoiceManager(SynthHelper.ClampI(polyphony, SynthConstants.MinPolyphony, SynthConstants.MaxPolyphony));
            //Create midi containers
            MidiEventQueue = new LinkedList<SynthEvent>();
            MidiEventCounts = new int[MicroBufferCount];
            _layerList = new Patch[15];

            _midiMessageProcessed = new FastList<Action<MidiEvent>>();
            ResetSynthControls();
        }

        public void LoadBank(PatchBank bank)
        {
            UnloadBank();
            SoundBank = bank;
        }

        public void UnloadBank()
        {
            if (SoundBank != null)
            {
                NoteOffAll(true);
                _voiceManager.UnloadPatches();
                SoundBank = null;
            }
        }

        public void Stop()
        {
            ResetSynthControls();
            ResetPrograms();
            NoteOffAll(true);
        }

        public void ResetSynthControls()
        {
            for (int x = 0; x < _synthChannels.Length; x++)
            {
                _synthChannels[x].ResetControllers();
            }
            _synthChannels[MidiHelper.DrumChannel].BankSelect = PatchBank.DrumBank;
            ReleaseAllHoldPedals();
        }

        public void ResetPrograms()
        {
            for (int x = 0; x < _synthChannels.Length; x++)
            {
                _synthChannels[x].Program = 0;
            }
        }

        public string GetProgramName(int channel)
        {
            var p = GetProgram(channel);
            if (p == null) return "null";
            return p.Name;
        }

        public Patch GetProgram(int channel)
        {
            if (SoundBank != null)
            {
                var sChannel = _synthChannels[channel];
                var inst = SoundBank.GetPatchByNumber(sChannel.BankSelect, sChannel.Program);
                if (inst != null)
                    return inst;
            }
            return null;
        }

        public void SetAudioChannelCount(int channels)
        {
            channels = SynthHelper.ClampI(channels, 1, 2);
            if (AudioChannels != channels)
            {
                AudioChannels = channels;
                SampleBuffer = new SampleArray((MicroBufferSize * MicroBufferCount * AudioChannels));
            }
        }

        public void Synthesize()
        {
            SampleBuffer.Clear();
            FillWorkingBuffer();
        }

        public void GetNext(ByteArray buffer)
        {
            Synthesize();
            ConvertWorkingBuffer(buffer, SampleBuffer);
        }

        public float GetChannelVolume(int channel)
        {
            return _synthChannels[channel].Volume.Combined / 16383f;
        }

        public float GetChannelExpression(int channel)
        {
            return _synthChannels[channel].Expression.Combined / 16383f;
        }

        public float GetChannelPan(int channel)
        {
            return (_synthChannels[channel].Pan.Combined - 8192.0f) / 8192f;
        }

        public float GetChannelPitchBend(int channel)
        {
            return (_synthChannels[channel].PitchBend.Combined - 8192.0f) / 8192f;
        }

        public bool GetChannelHoldPedalStatus(int channel)
        {
            return _synthChannels[channel].HoldPedal;
        }

        private void FillWorkingBuffer()
        {
            /*Break the process loop into sections representing the smallest timeframe before the midi controls need to be updated
            the bigger the timeframe the more efficent the process is, but playback quality will be reduced.*/
            var sampleIndex = 0;
            for (int x = 0; x < MicroBufferCount; x++)
            {
                if (MidiEventQueue.Length > 0)
                {
                    for (int i = 0; i < MidiEventCounts[x]; i++)
                    {
                        var m = MidiEventQueue.RemoveLast();
                        ProcessMidiMessage(m.Event);
                    }
                }
                //voice processing loop
                var node = _voiceManager.ActiveVoices.First; //node used to traverse the active voices
                while (node != null)
                {
                    node.Value.Process(sampleIndex, sampleIndex + MicroBufferSize * AudioChannels);
                    //if an active voice has stopped remove it from the list
                    if (node.Value.VoiceParams.State == VoiceStateEnum.Stopped)
                    {
                        var delnode = node; //node used to remove inactive voices
                        node = node.Next;
                        _voiceManager.RemoveVoiceFromRegistry(delnode.Value);
                        _voiceManager.ActiveVoices.Remove(delnode);
                        _voiceManager.FreeVoices.AddFirst(delnode.Value);
                    }
                    else
                    {
                        node = node.Next;
                    }
                }
                sampleIndex += MicroBufferSize * AudioChannels;
            }
            TypeUtils.ClearIntArray(MidiEventCounts);
        }

        private void ConvertWorkingBuffer(ByteArray to, SampleArray from)
        {
            var i = 0;
            if (LittleEndian)
            {
                for (int x = 0; x < from.Length; x++)
                {
                    var s = TypeUtils.ToInt16((int)(SynthHelper.ClampF(from[x] * _masterVolume, -1.0f, 1.0f) * 32767));
                    to[i] = (byte)(s & 0xFF);
                    to[i + 1] = (byte)((s >> 8) & 0xFF);
                    i += 2;
                }
            }
            else
            {
                for (int x = 0; x < from.Length; x++)
                {
                    var s = TypeUtils.ToInt16((int)(SynthHelper.ClampF(from[x] * _masterVolume, -1.0f, 1.0f) * 32767));
                    to[i] = (byte)((s >> 8) & 0xFF);
                    to[i + 1] = (byte)(s & 0xFF);
                    i += 2;
                }
            }
        }

        #region Midi Handling

        public void NoteOn(int channel, int note, int velocity)
        {
            // Get the correct instrument depending if it is a drum or not
            var sChan = _synthChannels[channel];
            Patch inst = SoundBank.GetPatchByNumber(sChan.BankSelect, sChan.Program);
            if (inst == null)
                return;
            // A NoteOn can trigger multiple voices via layers
            int layerCount;
            if (inst is MultiPatch)
            {
                layerCount = ((MultiPatch)inst).FindPatches(channel, note, velocity, _layerList);
            }
            else
            {
                layerCount = 1;
                _layerList[0] = inst;
            }

            // If a key with the same note value exists, stop it
            if (_voiceManager.Registry[channel, note] != null)
            {
                var node = _voiceManager.Registry[channel, note];
                while (node != null)
                {
                    node.Value.Stop();
                    node = node.Next;
                }
                _voiceManager.RemoveFromRegistry(channel, note);
            }
            // Check exclusive groups
            for (var x = 0; x < layerCount; x++)
            {
                bool notseen = true;
                for (int i = x - 1; i >= 0; i--)
                {
                    if (_layerList[x].ExclusiveGroupTarget == _layerList[i].ExclusiveGroupTarget)
                    {
                        notseen = false;
                        break;
                    }
                }
                if (_layerList[x].ExclusiveGroupTarget != 0 && notseen)
                {
                    var node = _voiceManager.ActiveVoices.First;
                    while (node != null)
                    {
                        if (_layerList[x].ExclusiveGroupTarget == node.Value.Patch.ExclusiveGroup)
                        {
                            node.Value.Stop();
                            _voiceManager.RemoveVoiceFromRegistry(node.Value);
                        }
                        node = node.Next;
                    }
                }
            }
            // Assign a voice to each layer
            for (int x = 0; x < layerCount; x++)
            {
                Voice voice = _voiceManager.GetFreeVoice();
                if (voice == null)// out of voices and skipping is enabled
                    break;
                voice.Configure(channel, note, velocity, _layerList[x], _synthChannels[channel]);
                _voiceManager.AddToRegistry(voice);
                _voiceManager.ActiveVoices.AddLast(voice);
                voice.Start();
            }
            // Clear layer list
            for (int x = 0; x < layerCount; x++)
                _layerList[x] = null;

        }

        public void NoteOff(int channel, int note)
        {
            if (_synthChannels[channel].HoldPedal)
            {
                var node = _voiceManager.Registry[channel, note];
                while (node != null)
                {
                    node.Value.VoiceParams.NoteOffPending = true;
                    node = node.Next;
                }
            }
            else
            {
                var node = _voiceManager.Registry[channel, note];
                while (node != null)
                {
                    node.Value.Stop();
                    node = node.Next;
                }
                _voiceManager.RemoveFromRegistry(channel, note);
            }
        }

        public void NoteOffAll(bool immediate)
        {
            var node = _voiceManager.ActiveVoices.First;
            if (immediate)
            {//if immediate ignore hold pedals and clear the entire registry
                _voiceManager.ClearRegistry();
                while (node != null)
                {
                    node.Value.StopImmediately();
                    var delnode = node;
                    node = node.Next;
                    _voiceManager.ActiveVoices.Remove(delnode);
                    _voiceManager.FreeVoices.AddFirst(delnode.Value);
                }
            }
            else
            {//otherwise we have to check for hold pedals and double check the registry before removing the voice
                while (node != null)
                {
                    VoiceParameters voiceParams = node.Value.VoiceParams;
                    if (voiceParams.State == VoiceStateEnum.Playing)
                    {
                        //if hold pedal is enabled do not stop the voice
                        if (_synthChannels[voiceParams.Channel].HoldPedal)
                        {
                            voiceParams.NoteOffPending = true;
                        }
                        else
                        {
                            node.Value.Stop();
                            _voiceManager.RemoveVoiceFromRegistry(node.Value);
                        }
                    }
                    node = node.Next;
                }
            }
        }

        public void NoteOffAllChannel(int channel, bool immediate)
        {
            var node = _voiceManager.ActiveVoices.First;
            while (node != null)
            {
                if (channel == node.Value.VoiceParams.Channel)
                {
                    if (immediate)
                    {
                        node.Value.StopImmediately();
                        var delnode = node;
                        node = node.Next;
                        _voiceManager.ActiveVoices.Remove(delnode);
                        _voiceManager.FreeVoices.AddFirst(delnode.Value);
                    }
                    else
                    {
                        //if hold pedal is enabled do not stop the voice
                        if (_synthChannels[channel].HoldPedal)
                            node.Value.VoiceParams.NoteOffPending = true;
                        else
                            node.Value.Stop();
                        node = node.Next;
                    }
                }
            }
        }

        public void ProcessMidiMessage(MidiEvent e)
        {
            var command = e.Command;
            var channel = e.Channel;
            var data1 = e.Data1;
            var data2 = e.Data2;
            switch (command)
            {
                case MidiEventTypeEnum.NoteOff:
                    NoteOff(channel, data1);
                    break;
                case MidiEventTypeEnum.NoteOn:
                    if (data2 == 0)
                        NoteOff(channel, data1);
                    else
                        NoteOn(channel, data1, data2);
                    break;
                case MidiEventTypeEnum.NoteAftertouch:
                    //synth uses channel after touch instead
                    break;
                case MidiEventTypeEnum.Controller:
                    switch ((ControllerTypeEnum)data1)
                    {
                        case ControllerTypeEnum.BankSelectCoarse: //Bank select coarse
                            if (channel == MidiHelper.DrumChannel)
                                data2 += PatchBank.DrumBank;
                            if (SoundBank.IsBankLoaded(data2))
                                _synthChannels[channel].BankSelect = (byte)data2;
                            else
                                _synthChannels[channel].BankSelect = (byte) ((channel == MidiHelper.DrumChannel) ? PatchBank.DrumBank : 0);
                            break;
                        case ControllerTypeEnum.ModulationCoarse: //Modulation wheel coarse
                            _synthChannels[channel].ModRange.Coarse = (byte)data2;
                            _synthChannels[channel].UpdateCurrentMod();
                            break;
                        case ControllerTypeEnum.ModulationFine: //Modulation wheel fine
                            _synthChannels[channel].ModRange.Fine = (byte)data2;
                            _synthChannels[channel].UpdateCurrentMod();
                            break;
                        case ControllerTypeEnum.VolumeCoarse: //Channel volume coarse
                            _synthChannels[channel].Volume.Coarse = (byte)data2;
                            break;
                        case ControllerTypeEnum.VolumeFine: //Channel volume fine
                            _synthChannels[channel].Volume.Fine = (byte)data2;
                            break;
                        case ControllerTypeEnum.PanCoarse: //Pan coarse
                            _synthChannels[channel].Pan.Coarse = (byte)data2;
                            _synthChannels[channel].UpdateCurrentPan();
                            break;
                        case ControllerTypeEnum.PanFine: //Pan fine
                            _synthChannels[channel].Pan.Fine = (byte)data2;
                            _synthChannels[channel].UpdateCurrentPan();
                            break;
                        case ControllerTypeEnum.ExpressionControllerCoarse: //Expression coarse
                            _synthChannels[channel].Expression.Coarse = (byte)data2;
                            _synthChannels[channel].UpdateCurrentVolume();
                            break;
                        case ControllerTypeEnum.ExpressionControllerFine: //Expression fine
                            _synthChannels[channel].Expression.Fine = (byte)data2;
                            _synthChannels[channel].UpdateCurrentVolume();
                            break;
                        case ControllerTypeEnum.HoldPedal: //Hold pedal
                            if (_synthChannels[channel].HoldPedal && !(data2 > 63)) //if hold pedal is released stop any voices with pending release tags
                                ReleaseHoldPedal(channel);
                            _synthChannels[channel].HoldPedal = data2 > 63;
                            break;
                        case ControllerTypeEnum.LegatoPedal: //Legato Pedal
                            _synthChannels[channel].LegatoPedal = data2 > 63;
                            break;
                        case ControllerTypeEnum.NonRegisteredParameterCourse: //NRPN Coarse Select   //fix for invalid DataEntry after unsupported NRPN events
                            _synthChannels[channel].Rpn.Combined = 0x3FFF; //todo implement NRPN
                            break;
                        case ControllerTypeEnum.NonRegisteredParameterFine: //NRPN Fine Select     //fix for invalid DataEntry after unsupported NRPN events
                            _synthChannels[channel].Rpn.Combined = 0x3FFF; //todo implement NRPN
                            break;
                        case ControllerTypeEnum.RegisteredParameterCourse: //RPN Coarse Select
                            _synthChannels[channel].Rpn.Coarse = (byte)data2;
                            break;
                        case ControllerTypeEnum.RegisteredParameterFine: //RPN Fine Select
                            _synthChannels[channel].Rpn.Fine = (byte)data2;
                            break;
                        case ControllerTypeEnum.AllNotesOff: //Note Off All
                            NoteOffAll(false);
                            break;
                        case ControllerTypeEnum.DataEntryCoarse: //DataEntry Coarse
                            switch (_synthChannels[channel].Rpn.Combined)
                            {
                                case 0: //change semitone, pitchwheel
                                    _synthChannels[channel].PitchBendRangeCoarse = (byte)data2;
                                    _synthChannels[channel].UpdateCurrentPitch();
                                    break;
                                case 1: //master fine tune coarse
                                    _synthChannels[channel].MasterFineTune.Coarse = (byte)data2;
                                    break;
                                case 2: //master coarse tune coarse
                                    _synthChannels[channel].MasterCoarseTune = (short)(data2 - 64);
                                    break;
                            }
                            break;
                        case ControllerTypeEnum.DataEntryFine: //DataEntry Fine
                            switch (_synthChannels[channel].Rpn.Combined)
                            {
                                case 0: //change cents, pitchwheel
                                    _synthChannels[channel].PitchBendRangeFine = (byte)data2;
                                    _synthChannels[channel].UpdateCurrentPitch();
                                    break;
                                case 1: //master fine tune fine
                                    _synthChannels[channel].MasterFineTune.Fine = (byte)data2;
                                    break;
                            }
                            break;
                        case ControllerTypeEnum.ResetControllers: //Reset All
                            _synthChannels[channel].Expression.Combined = 0x3FFF;
                            _synthChannels[channel].ModRange.Combined = 0;
                            if (_synthChannels[channel].HoldPedal)
                                ReleaseHoldPedal(channel);
                            _synthChannels[channel].HoldPedal = false;
                            _synthChannels[channel].LegatoPedal = false;
                            _synthChannels[channel].Rpn.Combined = 0x3FFF;
                            _synthChannels[channel].PitchBend.Combined = 0x2000;
                            _synthChannels[channel].ChannelAfterTouch = 0;
                            _synthChannels[channel].UpdateCurrentPitch(); //because pitchBend was reset
                            _synthChannels[channel].UpdateCurrentVolume(); //because expression was reset
                            break;
                        default:
                            return;
                    }
                    break;
                case MidiEventTypeEnum.ProgramChange: //Program Change
                    _synthChannels[channel].Program = (byte)data1;
                    break;
                case MidiEventTypeEnum.ChannelAftertouch: //Channel Aftertouch
                    _synthChannels[channel].ChannelAfterTouch = (byte)data2;
                    break;
                case MidiEventTypeEnum.PitchBend: //Pitch Bend
                    _synthChannels[channel].PitchBend.Coarse = (byte)data2;
                    _synthChannels[channel].PitchBend.Fine = (byte)data1;
                    _synthChannels[channel].UpdateCurrentPitch();                   
                    break;
            }
            FireMidiMessageProcessed(e);
        }

         
        public void AddMidiMessageProcessed(Action<MidiEvent> listener)
        {
            _midiMessageProcessed.Add(listener);
        }

        private void FireMidiMessageProcessed(MidiEvent e)
        {
            for (int i = 0; i < _midiMessageProcessed.Count; i++)
            {
                var l = _midiMessageProcessed[i];
                if (l != null)
                {
                    l(e);
                }
            }
        }

        private void ReleaseAllHoldPedals()
        {
            LinkedListNode<Voice> node = _voiceManager.ActiveVoices.First;
            while (node != null)
            {
                if (node.Value.VoiceParams.NoteOffPending)
                {
                    node.Value.Stop();
                    _voiceManager.RemoveVoiceFromRegistry(node.Value);
                }
                node = node.Next;
            }
        }

        private void ReleaseHoldPedal(int channel)
        {
            LinkedListNode<Voice> node = _voiceManager.ActiveVoices.First;
            while (node != null)
            {
                if (node.Value.VoiceParams.Channel == channel && node.Value.VoiceParams.NoteOffPending)
                {
                    node.Value.Stop();
                    _voiceManager.RemoveVoiceFromRegistry(node.Value);
                }
                node = node.Next;
            }
        }


        #endregion
    }
}
