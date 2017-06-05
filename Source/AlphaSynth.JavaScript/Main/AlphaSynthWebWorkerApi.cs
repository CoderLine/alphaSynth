using System;
using AlphaSynth.Ds;
using AlphaSynth.Player;
using AlphaSynth.Synthesis;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.Html.fileapi;
using SharpKit.Html.workers;
using SharpKit.JavaScript;

namespace AlphaSynth.Main
{
    /// <summary>
    /// This class implements a JavaScript API for initializing and controlling
    /// a WebWorker based alphaSynth which uses the given player as output.
    /// </summary>
    class AlphaSynthWebWorkerApi : HtmlContext, IAlphaSynth
    {
        private readonly Worker _synth;
        private readonly ISynthOutput _output;

        private readonly FastDictionary<string, FastList<JsFunction>> _events;

        private bool _workerIsReadyForPlayback;
        private bool _workerIsReady;
        private bool _outputIsReady;
        private PlayerState _state;
        private LogLevel _logLevel;
        private float _masterVolume;
        private double _playbackSpeed;
        private bool _isSoundFontLoaded;
        private bool _isMidiLoaded;
        private int _tickPosition;
        private double _timePosition;
        private PlaybackRange _playbackRange;

        /// <inheritdoc />
        public bool IsReady
        {
            get { return _workerIsReady && _outputIsReady; }
        }

        /// <inheritdoc />
        public bool IsReadyForPlayback
        {
            get { return _workerIsReadyForPlayback; }
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
            set
            {
                Logger.LogLevel = value;
                _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetLogLevel, value = value });
            }
        }

        /// <inheritdoc />
        public float MasterVolume
        {
            get { return _masterVolume; }
            set
            {
                value = SynthHelper.ClampF(value, SynthConstants.MinVolume, SynthConstants.MaxVolume);
                _masterVolume = value;
                _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetMasterVolume, value = value });
            }
        }

        /// <inheritdoc />
        public double PlaybackSpeed
        {
            get { return _playbackSpeed; }
            set
            {
                value = SynthHelper.ClampD(value, SynthConstants.MinPlaybackSpeed, SynthConstants.MaxPlaybackSpeed);
                _playbackSpeed = value;
                _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetPlaybackSpeed, value = value });
            }
        }

        /// <inheritdoc />
        public int TickPosition
        {
            get { return _tickPosition; }
            set
            {
                if (value < 0)
                {
                    value = 0;
                }
                _tickPosition = value;
                _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetTickPosition, value = value });
            }
        }

        /// <inheritdoc />
        public double TimePosition
        {
            get { return _timePosition; }
            set
            {
                if (value < 0)
                {
                    value = 0;
                }
                _timePosition = value;
                _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetTimePosition, value = value });
            }
        }

        /// <inheritdoc />
        public PlaybackRange PlaybackRange
        {
            get { return _playbackRange; }
            set
            {
                if (value != null)
                {
                    if (value.StartTick < 0)
                    {
                        value.StartTick = 0;
                    }
                    if (value.EndTick < 0)
                    {
                        value.EndTick = 0;
                    }
                }
                _playbackRange = value;
                _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetPlaybackRange, value = value });
            }
        }

        public AlphaSynthWebWorkerApi(ISynthOutput player, string alphaSynthScriptFile)
        {
            _output = player;
            _output.Ready += OnOutputReady;
            _output.SamplesPlayed += OnOutputSamplesPlayed;
            _output.SampleRequest += OnOutputSampleRequest;
            _output.Finished += OnOutputFinished;

            _events = new FastDictionary<string, FastList<JsFunction>>();

            _output.Open();

            try
            {
                _synth = new Worker(alphaSynthScriptFile);
            }
            catch
            {
                // fallback to blob worker 
                try
                {
                    var script = "importScripts('" + alphaSynthScriptFile + "')";
                    var blob = new Blob(new[] { script });
                    _synth = new Worker(window.URL.createObjectURL(blob));
                }
                catch (Exception e)
                {
                    Logger.Error("Failed to create WebWorker: " + e);
                    // TODO: fallback to synchronous mode
                }
            }
            _synth.addEventListener("message", HandleWorkerMessage, false);
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdInitialize, sampleRate = _output.SampleRate });

            MasterVolume = 1;
            PlaybackSpeed = 1;
        }

        //
        // API communicating with the web worker

        /// <inheritdoc />
        public void Play()
        {
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdPlay });
        }

        /// <inheritdoc />
        public void Pause()
        {
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdPause });
        }

        /// <inheritdoc />
        public void PlayPause()
        {
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdPlayPause });
        }

        /// <inheritdoc />
        public void Stop()
        {
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdStop });
        }

        /// <inheritdoc />
        public void LoadSoundFont(byte[] data)
        {
            if (@typeof(data) == "string")
            {
                var url = data.As<string>();
                Logger.Info("Start loading Soundfont from url " + url);
                var request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";
                request.onload = e =>
                {
                    var buffer = new Uint8Array(request.response.As<ArrayBuffer>());
                    _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdLoadSoundFontBytes, data = buffer.As<byte[]>() });
                };
                request.onerror = e =>
                {
                    Logger.Error("Loading failed: " + e.message);
                    TriggerEvent("soundFontLoadFailed");
                };
                request.onprogress = e =>
                {
                    Logger.Debug("Soundfont downloading: " + e.loaded + "/" + e.total + " bytes");
                    TriggerEvent("soundFontLoad", new object[] {new
                    {
                        loaded = e.loaded,
                        total = e.total
                    }});
                };
                request.send();
            }
            else
            {
                _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdLoadSoundFontBytes, data = data });
            }
        }

        /// <inheritdoc />
        public void LoadMidi(byte[] data)
        {
            if (@typeof(data) == "string")
            {
                var url = data.As<string>();
                Logger.Info("Start loading midi from url " + url);

                var request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";
                request.onload = e =>
                {
                    var buffer = new Uint8Array(request.response.As<ArrayBuffer>());
                    _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdLoadMidiBytes, data = buffer });
                };
                request.onerror = e =>
                {
                    Logger.Error("Loading failed: " + e.message);
                    TriggerEvent("midiLoadFailed");
                };
                request.onprogress = e =>
                {
                    Logger.Debug("Midi downloading: " + e.loaded + "/" + e.total + " bytes");
                    TriggerEvent("midiLoad", new object[] { new
                    {
                        loaded = e.loaded,
                        total = e.total
                    }});
                };
                request.send();
            }
            else
            {
                _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdLoadMidiBytes, data = data });
            }
        }

        /// <inheritdoc />
        public void SetChannelMute(int channel, bool mute)
        {
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetChannelMute, channel = channel, mute = mute });
        }

        /// <inheritdoc />
        public void ResetChannelStates()
        {
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdResetChannelStates });
        }

        /// <inheritdoc />
        public void SetChannelSolo(int channel, bool solo)
        {
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetChannelSolo, channel = channel, solo = solo });
        }

        /// <inheritdoc />
        public void SetChannelVolume(int channel, double volume)
        {
            volume = SynthHelper.ClampD(volume, SynthConstants.MinVolume, SynthConstants.MaxVolume);
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetChannelVolume, channel = channel, volume = volume });
        }

        /// <inheritdoc />
        public void SetChannelProgram(int channel, byte program)
        {
            program = SynthHelper.ClampB(program, SynthConstants.MinProgram, SynthConstants.MaxProgram);
            _synth.postMessage(new { cmd = AlphaSynthWebWorker.CmdSetChannelProgram, channel = channel, program = program });
        }

        private static string QualifyUrl(string url)
        {
            var img = (HtmlAnchorElement)document.createElement("a");
            img.onerror = e => { };
            img.href = url;
            url = img.href;
            return url;
        }

        public virtual void HandleWorkerMessage(DOMEvent e)
        {
            var data = e.As<MessageEvent>().data;
            var cmd = data.Member("cmd").As<string>();
            switch (cmd)
            {
                case AlphaSynthWebWorker.CmdReady:
                    _workerIsReady = true;
                    CheckReady();
                    break;
                case AlphaSynthWebWorker.CmdReadyForPlayback:
                    _workerIsReadyForPlayback = true;
                    CheckReadyForPlayback();
                    break;
                case AlphaSynthWebWorker.CmdPositionChanged:
                    _timePosition = data.Member("currentTime").As<double>();
                    _tickPosition = data.Member("currentTick").As<int>();
                    TriggerEvent("positionChanged", new[] { data });
                    break;
                case AlphaSynthWebWorker.CmdPlayerStateChanged:
                    _state = data.Member("state").As<PlayerState>();
                    TriggerEvent("playerStateChanged", new[] { data });
                    break;
                case AlphaSynthWebWorker.CmdFinished:
                    TriggerEvent("finished");
                    break;
                case AlphaSynthWebWorker.CmdSoundFontLoaded:
                    TriggerEvent("soundFontLoaded");
                    break;
                case AlphaSynthWebWorker.CmdSoundFontLoadFailed:
                    TriggerEvent("soundFontLoadFailed");
                    break;
                case AlphaSynthWebWorker.CmdMidiLoaded:
                    _isMidiLoaded = true;
                    CheckReadyForPlayback();
                    TriggerEvent("midiFileLoaded");
                    break;
                case AlphaSynthWebWorker.CmdMidiLoadFailed:
                    _isSoundFontLoaded = true;
                    CheckReadyForPlayback();
                    TriggerEvent("midiFileLoadFailed");
                    break;
                case AlphaSynthWebWorker.CmdLog:
                    Logger.Log(data.Member("level").As<LogLevel>(), data.Member("message").As<string>());
                    break;

                // output communication ( output <- worker )
                case WebWorkerOutput.CmdOutputSequencerFinished:
                    _output.SequencerFinished();
                    break;
                case WebWorkerOutput.CmdOutputAddSamples:
                    _output.AddSamples(data.Member("samples").As<SampleArray>());
                    break;
                case WebWorkerOutput.CmdOutputPlay:
                    _output.Play();
                    break;
                case WebWorkerOutput.CmdOutputPause:
                    _output.Pause();
                    break;
                case WebWorkerOutput.CmdOutputResetSamples:
                    _output.ResetSamples();
                    break;
            }
        }

        private void CheckReady()
        {
            if (IsReady)
            {
                TriggerEvent("ready");
            }
        }


        private void CheckReadyForPlayback()
        {
            if (IsReadyForPlayback)
            {
                TriggerEvent("readyForPlayback");
            }
        }

        /// <summary>
        /// Registers for the specified event.
        /// </summary>
        /// <param name="events">The event to register for</param>
        /// <param name="action">The function to call on the event.</param>
        public void On(string events, Action action)
        {
            if (!_events.ContainsKey(events))
            {
                _events[events] = new FastList<JsFunction>();
            }
            _events[events].Add(action.As<JsFunction>());
        }

        private void TriggerEvent(string name, object[] args = null)
        {
            var events = _events[name];
            if (events != null)
            {
                for (int i = 0; i < events.Count; i++)
                {
                    events[i].apply(@null, args);
                }
            }
        }

        //
        // output communication ( output -> worker )


        public void OnOutputSampleRequest()
        {
            _synth.postMessage(new { cmd = WebWorkerOutput.CmdOutputSampleRequest });
        }

        public void OnOutputFinished()
        {
            _synth.postMessage(new { cmd = WebWorkerOutput.CmdOutputFinished });
        }

        public void OnOutputSamplesPlayed(int samples)
        {
            _synth.postMessage(new { cmd = WebWorkerOutput.CmdOutputSamplesPlayed, samples = samples });
        }

        private void OnOutputReady()
        {
            _outputIsReady = true;
            CheckReady();
        }
    }
}