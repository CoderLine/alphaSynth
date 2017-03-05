using System;
using AlphaSynth.Bank;
using AlphaSynth.IO;
using AlphaSynth.Midi;
using AlphaSynth.Synthesis;
using AlphaSynth.Util;

namespace AlphaSynth
{
    public class AlphaSynth : IAlphaSynth
    {
        private MidiFileSequencer _sequencer;
        private Synthesizer _synthesizer;

        private bool _outputIsReady;
        private PlayerState _state;
        private LogLevel _logLevel;
        private bool _isSoundFontLoaded;
        private bool _isMidiLoaded;
        private int _tickPosition;
        private double _timePosition;

        public ISynthOutput Output { get; private set; }

        /// <inheritdoc />
        public bool IsReady
        {
            get { return _outputIsReady; }
        }

        /// <inheritdoc />
        public bool IsReadyForPlayback
        {
            get { return IsReady && _isSoundFontLoaded && _isMidiLoaded; }
        }

        /// <inheritdoc />
        public PlayerState State
        {
            get { return _state; }
        }

        /// <inheritdoc />
        public LogLevel LogLevel
        {
            get { return Logger.LogLevel; }
            set { Logger.LogLevel = value; }
        }

        /// <inheritdoc />
        public float MasterVolume
        {
            get { return _synthesizer.MasterVolume; }
            set
            {
                value = SynthHelper.ClampF(value, SynthConstants.MinVolume, SynthConstants.MaxVolume);
                _synthesizer.MasterVolume = value;
            }
        }

        /// <inheritdoc />
        public double PlaybackSpeed
        {
            get { return _sequencer.PlaybackSpeed; }
            set
            {
                value = SynthHelper.ClampD(value, SynthConstants.MinPlaybackSpeed, SynthConstants.MaxPlaybackSpeed);
                var oldSpeed = _sequencer.PlaybackSpeed;
                _sequencer.PlaybackSpeed = value;
                UpdateTimePosition(_timePosition * (oldSpeed / value));
            }
        }

        /// <inheritdoc />
        public int TickPosition
        {
            get { return _tickPosition; }
            set
            {
                TimePosition = _sequencer.TickPositionToTimePosition(value);
            }
        }

        /// <inheritdoc />
        public double TimePosition
        {
            get { return _timePosition; }
            set
            {
                Logger.Debug("Seeking to position " + value + "ms");

                // tell the sequencer to jump to the given position
                _sequencer.Seek(value * _sequencer.PlaybackSpeed);

                // update the internal position 
                UpdateTimePosition(value);

                // tell the output to reset the already synthesized buffers and request data again 
                Output.ResetSamples();
            }
        }

        /// <inheritdoc />
        public PlaybackRange PlaybackRange
        {
            get
            {
                return _sequencer.PlaybackRange;
            }
            set
            {
                _sequencer.PlaybackRange = value;
                if (value != null)
                {
                    TickPosition = value.StartTick;
                }
            }
        }

        public AlphaSynth()
        {
            Logger.Debug("Initializing player");
            _state = PlayerState.Paused;

            Logger.Debug("Creating output");
            Output = Platform.Platform.CreateOutput();
            Output.Ready += () =>
            {
                _outputIsReady = true;
                CheckReadyForPlayback();
            };
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
                _sequencer.FillMidiEventQueue();
                _synthesizer.Synthesize();
                // send it to output
                Output.AddSamples(_synthesizer.SampleBuffer);
                // tell sequencer to check whether its work is done
                _sequencer.CheckForStop();
            };
            Output.SamplesPlayed += OnSamplesPlayed;

            Logger.Debug("Creating synthesizer");
            _synthesizer = new Synthesizer(Output.SampleRate, SynthConstants.AudioChannels, 441, 3, 100);

            _sequencer = new MidiFileSequencer(_synthesizer);
            _sequencer.Finished += Output.SequencerFinished;

            Logger.Debug("Opening output");
            Output.Open();
        }

        /// <inheritdoc />
        public void Play()
        {
            if (State == PlayerState.Playing || !IsReadyForPlayback) return;

            Logger.Debug("Starting playback");
            _state = PlayerState.Playing;
            OnPlayerStateChanged(new PlayerStateChangedEventArgs(_state));

            Output.Play();
        }

        /// <inheritdoc />
        public void Pause()
        {
            if (State == PlayerState.Paused || !IsReadyForPlayback) return;

            Logger.Debug("Pausing playback");
            _state = PlayerState.Paused;
            OnPlayerStateChanged(new PlayerStateChangedEventArgs(_state));

            Output.Pause();
            _synthesizer.NoteOffAll(false);
        }

        /// <inheritdoc />
        public void PlayPause()
        {
            if (State == PlayerState.Playing || !IsReadyForPlayback)
            {
                Pause();
            }
            else
            {
                Play();
            }
        }

        /// <inheritdoc />
        public void Stop()
        {
            if (!IsReadyForPlayback) return;

            Logger.Debug("Stopping playback");
            Pause();
            TickPosition = _sequencer.PlaybackRange != null ? _sequencer.PlaybackRange.StartTick : 0;
        }

        /// <inheritdoc />
        public void LoadSoundFont(byte[] data)
        {
            Pause();

            var input = ByteBuffer.FromBuffer(data);
            try
            {
                Logger.Info("Loading soundfont from bytes");
                var bank = new PatchBank();
                bank.LoadSf2(input);
                _synthesizer.LoadBank(bank);

                _isSoundFontLoaded = true;
                OnSoundFontLoaded();

                Logger.Info("soundFont successfully loaded");
                CheckReadyForPlayback();
            }
            catch (Exception e)
            {
                Logger.Error("Could not load soundfont from bytes " + e);
                OnSoundFontLoadFailed();
            }
        }

        private void CheckReadyForPlayback()
        {
            if (IsReadyForPlayback)
            {
                OnReadyForPlayback();
            }
        }

        /// <inheritdoc />
        public void LoadMidi(byte[] data)
        {
            Stop();

            var input = ByteBuffer.FromBuffer(data);
            try
            {
                Logger.Info("Loading midi from bytes");

                var midi = new MidiFile();
                midi.Load(input);

                _sequencer.LoadMidi(midi);
                _isMidiLoaded = true;
                OnMidiLoaded();
                Logger.Info("Midi successfully loaded");
                CheckReadyForPlayback();

                TickPosition = 0;
            }
            catch (Exception e)
            {
                Logger.Error("Could not load midi from bytes " + e);
                OnMidiLoadFailed();
            }
        }

        /// <inheritdoc />
        public void SetChannelMute(int channel, bool mute)
        {
            _synthesizer.SetChannelMute(channel, mute);
        }

        /// <inheritdoc />
        public void ResetChannelStates()
        {
            _synthesizer.ResetChannelStates();
        }

        /// <inheritdoc />
        public void SetChannelSolo(int channel, bool solo)
        {
            _synthesizer.SetChannelSolo(channel, solo);
        }

        /// <inheritdoc />
        public void SetChannelVolume(int channel, double volume)
        {
            volume = SynthHelper.ClampD(volume, SynthConstants.MinVolume, SynthConstants.MaxVolume);
            _synthesizer.SetChannelVolume(channel, volume);
        }

        /// <inheritdoc />
        public void SetChannelProgram(int channel, byte program)
        {
            program = SynthHelper.ClampB(program, SynthConstants.MinProgram, SynthConstants.MaxProgram);
            _sequencer.SetChannelProgram(channel, program);
            _synthesizer.SetChannelProgram(channel, program);
        }

        private void OnSamplesPlayed(int sampleCount)
        {
            var playedMillis = (sampleCount / (double)_synthesizer.SampleRate) * 1000;
            UpdateTimePosition(_timePosition + playedMillis);
        }

        private void UpdateTimePosition(double timePosition)
        {
            // update the real positions
            var currentTime = _timePosition = timePosition;
            var currentTick = _tickPosition = _sequencer.TimePositionToTickPosition(currentTime);

            var endTime = _sequencer.EndTime;
            var endTick = _sequencer.EndTick;

            Logger.Debug("Position changed: (time: " + currentTime + "/" + endTime + ", tick: " + currentTick + "/" + endTime + ")");
            OnPositionChanged(new PositionChangedEventArgs(currentTime, endTime, currentTick, endTick));
        }

        #region Events

        public event EventHandler Finished;
        protected virtual void OnFinished()
        {
            EventHandler handler = Finished;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler<PlayerStateChangedEventArgs> PlayerStateChanged;
        protected virtual void OnPlayerStateChanged(PlayerStateChangedEventArgs e)
        {
            var handler = PlayerStateChanged;
            if (handler != null) handler(this, e);
        }

        public event EventHandler SoundFontLoaded;
        protected virtual void OnSoundFontLoaded()
        {
            var handler = SoundFontLoaded;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler ReadyForPlayback;
        protected virtual void OnReadyForPlayback()
        {
            var handler = ReadyForPlayback;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler SoundFontLoadFailed;
        protected virtual void OnSoundFontLoadFailed()
        {
            var handler = SoundFontLoadFailed;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler MidiLoaded;
        protected virtual void OnMidiLoaded()
        {
            var handler = MidiLoaded;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }

        public event EventHandler MidiLoadFailed;
        protected virtual void OnMidiLoadFailed()
        {
            var handler = MidiLoadFailed;
            if (handler != null) handler(this, EmptyEventArgs.Instance);
        }


        public event EventHandler<PositionChangedEventArgs> PositionChanged;
        protected virtual void OnPositionChanged(PositionChangedEventArgs e)
        {
            var handler = PositionChanged;
            if (handler != null) handler(this, e);
        }

        #endregion
    }

    #region EventArgs

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
        public PlayerState State { get; private set; }

        public PlayerStateChangedEventArgs(PlayerState state)
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

    #endregion
}