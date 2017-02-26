using System;
using AlphaSynth.Player;
using AlphaSynth.Synthesis;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.Html.workers;
using SharpKit.JavaScript;

namespace AlphaSynth.Main
{
    /// <summary>
    /// This class implements a HTML5 WebWorker based version of alphaSynth
    /// which can be controlled via WebWorker messages.
    /// </summary>
    class AlphaSynthWebWorker
    {
        #region Commands

        public const string CmdPrefix = "alphaSynth.";

        // Main -> Worker
        public const string CmdInitialize = CmdPrefix + "initialize";

        public const string CmdSetLogLevel = CmdPrefix + "setLogLevel";
        public const string CmdSetMasterVolume = CmdPrefix + "setMasterVolume";
        public const string CmdSetPlaybackSpeed = CmdPrefix + "setPlaybackSpeed";
        public const string CmdSetTickPosition = CmdPrefix + "setTickPosition";
        public const string CmdSetTimePosition = CmdPrefix + "setTimePosition";
        public const string CmdSetPlaybackRange = CmdPrefix + "setPlaybackRange";

        public const string CmdPlay = CmdPrefix + "play";
        public const string CmdPause = CmdPrefix + "pause";
        public const string CmdPlayPause = CmdPrefix + "playPause";
        public const string CmdStop = CmdPrefix + "stop";
        public const string CmdLoadSoundFontUrl = CmdPrefix + "loadSoundFontUrl";
        public const string CmdLoadSoundFontBytes = CmdPrefix + "loadSoundFontBytes";
        public const string CmdLoadMidiUrl = CmdPrefix + "loadMidiUrl";
        public const string CmdLoadMidiBytes = CmdPrefix + "loadMidiBytes";
        public const string CmdSetChannelMute = CmdPrefix + "setChannelMute";
        public const string CmdSetChannelSolo = CmdPrefix + "setChannelSolo";
        public const string CmdSetChannelVolume = CmdPrefix + "setChannelVolume";
        public const string CmdSetChannelProgram = CmdPrefix + "setChannelProgram";
        public const string CmdResetChannelStates = CmdPrefix + "resetChannelStates";

        // Worker -> Main
        public const string CmdReady = CmdPrefix + "ready";
        public const string CmdReadyForPlayback = CmdPrefix + "readyForPlayback";
        public const string CmdPositionChanged = CmdPrefix + "positionChanged";
        public const string CmdPlayerStateChanged = CmdPrefix + "playerStateChanged";
        public const string CmdFinished = CmdPrefix + "finished";
        public const string CmdSoundFontLoad = CmdPrefix + "soundFontLoad";
        public const string CmdSoundFontLoaded = CmdPrefix + "soundFontLoaded";
        public const string CmdSoundFontLoadFailed = CmdPrefix + "soundFontLoadFailed";
        public const string CmdMidiLoad = CmdPrefix + "midiLoad";
        public const string CmdMidiLoaded = CmdPrefix + "midiLoaded";
        public const string CmdMidiLoadFailed = CmdPrefix + "midiLoadFailed";
        public const string CmdLog = CmdPrefix + "log";

        #endregion

        private readonly AlphaSynth _player;
        private readonly DedicatedWorkerContext _main;

        public AlphaSynthWebWorker(DedicatedWorkerContext main)
        {
            _main = main;
            _main.addEventListener("message", HandleMessage, false);

            _player = new AlphaSynth();
            _player.PositionChanged += OnPositionChanged;
            _player.PlayerStateChanged += OnPlayerStateChanged;
            _player.Finished += OnFinished;
            _player.SoundFontLoaded += OnSoundFontLoaded;
            _player.SoundFontLoadFailed += OnSoundFontLoadFailed;
            _player.SoundFontLoadFailed += OnSoundFontLoadFailed;
            _player.MidiLoaded += OnMidiLoaded;
            _player.MidiLoadFailed += OnMidiLoadFailed;
            _player.ReadyForPlayback += OnReadyForPlayback;

            _main.postMessage(new { cmd = CmdReady });
        }

        static AlphaSynthWebWorker()
        {
            if (!HtmlContext.self.document.As<bool>())
            {
                var main = HtmlContext.self.As<DedicatedWorkerContext>();
                main.addEventListener("message", e =>
                {
                    var data = e.As<MessageEvent>().data;
                    var cmd = data.Member("cmd").As<string>();
                    switch (cmd)
                    {
                        case CmdInitialize:
                            WebWorkerOutput.PreferredSampleRate = data.Member("sampleRate").As<int>();
                            new AlphaSynthWebWorker(main);
                            break;
                    }
                }, false);
            }
        }

        public void HandleMessage(DOMEvent e)
        {
            var data = e.As<MessageEvent>().data;
            var cmd = data.Member("cmd").As<string>();
            switch (cmd)
            {
                case CmdSetLogLevel:
                    Logger.LogLevel = data.Member("value").As<LogLevel>();
                    break;
                case CmdSetMasterVolume:
                    _player.MasterVolume = data.Member("value").As<float>();
                    break;
                case CmdSetPlaybackSpeed:
                    _player.PlaybackSpeed = data.Member("value").As<double>();
                    break;
                case CmdSetTickPosition:
                    _player.TickPosition = data.Member("value").As<int>();
                    break;
                case CmdSetTimePosition:
                    _player.TimePosition = data.Member("value").As<double>();
                    break;
                case CmdSetPlaybackRange:
                    _player.PlaybackRange = data.Member("value").As<PlaybackRange>();
                    break;
                case CmdPlay:
                    _player.Play();
                    break;
                case CmdPause:
                    _player.Pause();
                    break;
                case CmdStop:
                    _player.Stop();
                    break;
                case CmdLoadSoundFontUrl:
                    LoadSoundFontUrl(data.Member("url").As<string>());
                    break;
                case CmdLoadSoundFontBytes:
                    _player.LoadSoundFont(data.Member("data").As<byte[]>());
                    break;
                case CmdLoadMidiUrl:
                    LoadMidiUrl(data.Member("url").As<string>());
                    break;
                case CmdLoadMidiBytes:
                    _player.LoadMidi(data.Member("data").As<byte[]>());
                    break;
                case CmdSetChannelMute:
                    _player.SetChannelMute(data.Member("channel").As<int>(), data.Member("mute").As<bool>());
                    break;
                case CmdSetChannelSolo:
                    _player.SetChannelSolo(data.Member("channel").As<int>(), data.Member("solo").As<bool>());
                    break;
                case CmdSetChannelVolume:
                    _player.SetChannelVolume(data.Member("channel").As<int>(), data.Member("volume").As<double>());
                    break;
                case CmdSetChannelProgram:
                    _player.SetChannelProgram(data.Member("channel").As<int>(), data.Member("program").As<byte>());
                    break;
                case CmdResetChannelStates:
                    _player.ResetChannelStates();
                    break;
            }
        }

        private void LoadMidiUrl(string url)
        {
            Logger.Info("Start loading soundfont from url " + url);

            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            request.onload = e =>
            {
                var buffer = new Uint8Array(request.response.As<ArrayBuffer>());
                _player.LoadMidi(buffer.As<byte[]>());
            };
            request.onerror = e =>
            {
                Logger.Error("Loading failed: " + e.message);
                OnMidiLoadFailed(this, EmptyEventArgs.Instance);
            };
            request.onprogress = e =>
            {
                Logger.Debug("Midi downloading: " + e.loaded + "/" + e.total + " bytes");
                _main.postMessage(new
                {
                    cmd = CmdMidiLoad,
                    loaded = e.loaded,
                    total = e.total
                });
            };
            request.send();
        }

        private void LoadSoundFontUrl(string url)
        {
            Logger.Info("Start loading Soundfont from url " + url);
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            request.onload = e =>
            {
                var buffer = new Uint8Array(request.response.As<ArrayBuffer>());
                _player.LoadSoundFont(buffer.As<byte[]>());
            };
            request.onerror = e =>
            {
                Logger.Error("Loading failed: " + e.message);
                OnSoundFontLoadFailed(this, EventArgs.Empty);
            };
            request.onprogress = e =>
            {
                Logger.Debug("Soundfont downloading: " + e.loaded + "/" + e.total + " bytes");
                _main.postMessage(new
                {
                    cmd = CmdSoundFontLoad,
                    loaded = e.loaded,
                    total = e.total
                });
            };
            request.send();
        }

        public void OnPositionChanged(object sender, PositionChangedEventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdPositionChanged,
                currentTime = e.CurrentTime,
                endTime = e.EndTime,
                currentTick = e.CurrentTick,
                endTick = e.EndTick
            });
        }

        public void OnPlayerStateChanged(object sender, PlayerStateChangedEventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdPlayerStateChanged,
                state = e.State
            });
        }

        public void OnFinished(object sender, EventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdFinished
            });
        }

        public void OnSoundFontLoaded(object sender, EventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdSoundFontLoaded
            });
        }

        public void OnSoundFontLoadFailed(object sender, EventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdSoundFontLoadFailed
            });
        }

        public void OnMidiLoad(object sender, ProgressEventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdMidiLoad,
                loaded = e.Loaded,
                total = e.Total
            });
        }

        public void OnMidiLoaded(object sender, EventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdMidiLoaded
            });
        }

        public void OnMidiLoadFailed(object sender, EventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdMidiLoaded
            });
        }

        public void OnReadyForPlayback(object sender, EventArgs e)
        {
            _main.postMessage(new
            {
                cmd = CmdReadyForPlayback
            });
        }

        public void SendLog(LogLevel level, string s)
        {
            _main.postMessage(new
            {
                cmd = CmdLog,
                level = level,
                message = s
            });
        }
    }
}
