using System;
using AlphaSynth.Player;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.JavaScript;

namespace AlphaSynth.Main
{
    /// <summary>
    /// This class implements a HTML5 WebWorker based version of alphaSynth
    /// which can be controlled via WebWorker messages.
    /// </summary>
    class AlphaSynthWebWorker : IAlphaSynthSync
    {
        private SynthPlayer _player;
        private SharpKit.Html.workers.WorkerContext _main;

        public AlphaSynthWebWorker(SharpKit.Html.workers.WorkerContext main)
        {
            _main = main;
            _main.addEventListener("message", HandleMessage, false);

            _player = new SynthPlayer();

            _player.PositionChanged += OnPositionChanged;
            _player.PlayerStateChanged += OnPlayerStateChanged;
            _player.Finished += OnFinished;
            _player.SoundFontLoad += OnSoundFontLoad;
            _player.SoundFontLoaded += OnSoundFontLoaded;
            _player.SoundFontLoadFailed += OnSoundFontLoadFailed;
            _player.MidiLoad += OnMidiLoad;
            _player.MidiLoaded += OnMidiLoaded;
            _player.MidiLoadFailed += OnMidiLoadFailed;
            _player.ReadyForPlay += OnReadyForPlay;

            OnReady();
        }

        static AlphaSynthWebWorker()
        {
            if (!HtmlContext.self.document.As<bool>())
            {
                var main = HtmlContext.self.As<SharpKit.Html.workers.WorkerContext>();
                main.addEventListener("message", e =>
                {
                    var data = e.As<MessageEvent>().data;
                    var cmd = data.Member("cmd").As<string>();
                    switch (cmd)
                    {
                        case "alphaSynth.playerReady":
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
                case "alphaSynth.play":
                    Play();
                    break;
                case "alphaSynth.pause":
                    Pause();
                    break;
                case "alphaSynth.isReadyForPlay":
                    PostMessage(new { cmd = "alphaSynth.isReadyForPlay", value = IsReadyForPlay() });
                    break;
                case "alphaSynth.getMasterVolume":
                    PostMessage(new { cmd = "alphaSynth.getMasterVolume", value = _player.MasterVolume });
                    break;
                case "alphaSynth.setMasterVolume":
                    _player.MasterVolume = data.Member("value").As<float>();
                    break;
                case "alphaSynth.getPlaybackSpeed":
                    PostMessage(new { cmd = "alphaSynth.getPlaybackSpeed", value = _player.Sequencer.PlaybackSpeed });
                    break;
                case "alphaSynth.setPlaybackSpeed":
                    _player.PlaybackSpeed = data.Member("value").As<float>();
                    break;
                case "alphaSynth.setPlaybackRange":
                    SetPlaybackRange(data.Member("startTick").As<int>(), data.Member("endTick").As<int>());
                    break;
                case "alphaSynth.playPause":
                    PlayPause();
                    break;
                case "alphaSynth.stop":
                    Stop();
                    break;
                case "alphaSynth.setPositionTick":
                    SetPositionTick(data.Member("tick").As<int>());
                    break;
                case "alphaSynth.setPositionTime":
                    SetPositionTime(data.Member("time").As<int>());
                    break;
                case "alphaSynth.loadSoundFontUrl":
                    LoadSoundFontUrl(data.Member("url").As<string>());
                    break;
                case "alphaSynth.loadSoundFontBytes":
                    LoadSoundFontBytes(data.Member("data").As<byte[]>());
                    break;
                case "alphaSynth.loadMidiUrl":
                    LoadMidiUrl(data.Member("url").As<string>());
                    break;
                case "alphaSynth.loadMidiBytes":
                    LoadMidiBytes(data.Member("data").As<byte[]>());
                    break;
                case "alphaSynth.getState":
                    PostMessage(new { cmd = "getState", value = GetState() });
                    break;
                case "alphaSynth.isSoundFontLoaded":
                    PostMessage(new { cmd = "isSoundFontLoaded", value = IsSoundFontLoaded() });
                    break;
                case "alphaSynth.isMidiLoaded":
                    PostMessage(new { cmd = "isMidiLoaded", value = IsMidiLoaded() });
                    break;
                case "alphaSynth.setLogLevel":
                    SetLogLevel(data.Member("level").As<LogLevel>());
                    break;
            }
        }

        [JsMethod(Export = false, InlineCodeExpression = "this._main.postMessage(o)")]
        private void PostMessage(object o)
        {

        }

        public bool IsReadyForPlay()
        {
            return _player.IsReady;
        }

        public void Play()
        {
            _player.Play();
        }

        public void Pause()
        {
            _player.Pause();
        }

        public void PlayPause()
        {
            _player.PlayPause();
        }

        public void Stop()
        {
            _player.Stop();
        }

        public void SetPositionTick(int tick)
        {
            _player.TickPosition = tick;
        }

        public void SetPositionTime(int millis)
        {
            _player.TimePosition = millis;
        }

        public void LoadSoundFontUrl(string url)
        {
            _player.LoadSoundFontUrl(url);
        }

        public void LoadSoundFontBytes(byte[] data)
        {
            _player.LoadSoundFontBytes(data);
        }

        public void LoadMidiUrl(string url)
        {
            _player.LoadMidiUrl(url);
        }

        public void LoadMidiBytes(byte[] data)
        {
            _player.LoadMidiBytes(data);
        }

        public SynthPlayerState GetState()
        {
            return _player.State;
        }

        public bool IsSoundFontLoaded()
        {
            return _player.IsSoundFontLoaded;
        }

        public bool IsMidiLoaded()
        {
            return _player.IsMidiLoaded;
        }

        public float GetMasterVolume()
        {
            return _player.MasterVolume;
        }

        public void SetMasterVolume(float volume)
        {
            _player.MasterVolume = volume;
        }

        public float GetPlaybackSpeed()
        {
            return _player.PlaybackSpeed;
        }

        public void SetPlaybackSpeed(float playbackSpeed)
        {
            _player.PlaybackSpeed = playbackSpeed;
        }

        public void SetPlaybackRange(int startTick, int endTick)
        {
            _player.SetPlaybackRange(startTick, endTick);
        }

        //
        // Events

        public void OnReady()
        {
            PostMessage(new { cmd = "alphaSynth.ready" });
        }

        public void OnPositionChanged(object sender, PositionChangedEventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.positionChanged",
                currentTime = e.CurrentTime,
                endTime = e.EndTime,
                currentTick = e.CurrentTick,
                endTick = e.EndTick
            });
        }

        public void OnPlayerStateChanged(object sender, PlayerStateChangedEventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.playerStateChanged",
                state = e.State
            });
        }

        public void OnFinished(object sender, EventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.finished"
            });
        }

        public void OnSoundFontLoad(object sender, ProgressEventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.soundFontLoad",
                loaded = e.Loaded,
                total = e.Total
            });
        }

        public void OnSoundFontLoaded(object sender, EventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.soundFontLoaded"
            });
        }

        public void OnSoundFontLoadFailed(object sender, EventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.soundFontLoadFailed"
            });
        }

        public void OnMidiLoad(object sender, ProgressEventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.midiLoad",
                loaded = e.Loaded,
                total = e.Total
            });
        }

        public void OnMidiLoaded(object sender, EventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.midiFileLoaded"
            });
        }

        public void OnMidiLoadFailed(object sender, EventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.midiFileLoadFailed"
            });
        }

        public void OnReadyForPlay(object sender, EventArgs e)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.readyForPlay",
                value = IsReadyForPlay()
            });
        }

        public void SendLog(LogLevel level, string s)
        {
            PostMessage(new
            {
                cmd = "alphaSynth.log",
                level = level,
                message = s
            });
        }


        public void SetLogLevel(LogLevel level)
        {
            Logger.LogLevel = level;
        }
    }
}
