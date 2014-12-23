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
    class AlphaSynthWebWorker : IAlphaSynthSync, ISynthPlayerListener
    {
        private SynthPlayer _player;
        private SharpKit.Html.workers.WorkerContext _main;

        public AlphaSynthWebWorker(SharpKit.Html.workers.WorkerContext main)
        {
            _main = main;
            _main.addEventListener("message", HandleMessage, false);

            _player = new SynthPlayer();
            _player.AddEventListener(this);
            OnReady();
        }

        public void HandleMessage(DOMEvent e)
        {
            var data = e.As<MessageEvent>().data;
            var cmd = data.Member("cmd").As<string>();
            switch (cmd)
            {
                case "play":
                    Play();
                    break;
                case "pause":
                    Pause();
                    break;
                case "isReadyForPlay":
                    PostMessage(new { cmd = "isReadyForPlay", value = IsReadyForPlay() });
                    break;
                case "getMasterVolume":
                    PostMessage(new { cmd = "getMasterVolume", value = _player.MasterVolume });
                    break;
                case "setMasterVolume":
                    _player.MasterVolume = data.Member("value").As<float>();
                    break;
                case "playPause":
                    PlayPause();
                    break;
                case "stop":
                    Stop();
                    break;
                case "setPositionTick":
                    SetPositionTick(data.Member("tick").As<int>());
                    break;
                case "setPositionTime":
                    SetPositionTime(data.Member("time").As<int>());
                    break;
                case "loadSoundFontUrl":
                    LoadSoundFontUrl(data.Member("url").As<string>());
                    break;
                case "loadSoundFontBytes":
                    LoadSoundFontBytes(data.Member("data").As<byte[]>());
                    break;
                case "loadMidiUrl":
                    LoadMidiUrl(data.Member("url").As<string>());
                    break;
                case "loadMidiBytes":
                    LoadMidiBytes(data.Member("data").As<byte[]>());
                    break;
                case "getState":
                    PostMessage(new { cmd = "getState", value = GetState() });
                    break;
                case "isSoundFontLoaded":
                    PostMessage(new { cmd = "isSoundFontLoaded", value = IsSoundFontLoaded() });
                    break;
                case "isMidiLoaded":
                    PostMessage(new { cmd = "isMidiLoaded", value = IsMidiLoaded() });
                    break;
                case "setLogLevel":
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
        //
        // Events

        public void OnReady()
        {
            PostMessage(new { cmd = "ready" });
        }

        public void OnPositionChanged(int currentTime, int endTime, int currentTick, int endTick)
        {
            PostMessage(new
            {
                cmd = "positionChanged",
                currentTime = currentTime,
                endTime = endTime,
                currentTick = currentTick,
                endTick = endTick
            });
        }

        public void OnPlayerStateChanged(SynthPlayerState state)
        {
            PostMessage(new
            {
                cmd = "playerStateChanged",
                state = state
            });
        }

        public void OnFinished()
        {
            PostMessage(new
            {
                cmd = "finished"
            });
        }

        public void OnSoundFontLoad(int loaded, int full)
        {
            PostMessage(new
            {
                cmd = "soundFontLoad",
                loaded = loaded,
                full = full
            });
        }

        public void OnSoundFontLoaded()
        {
            PostMessage(new
            {
                cmd = "soundFontLoaded"
            });
        }

        public void OnSoundFontLoadFailed()
        {
            PostMessage(new
            {
                cmd = "soundFontLoadFailed"
            });
        }

        public void OnMidiLoad(int loaded, int full)
        {
            PostMessage(new
            {
                cmd = "midiLoad",
                loaded = loaded,
                full = full
            });
        }

        public void OnMidiLoaded()
        {
            PostMessage(new
            {
                cmd = "midiFileLoaded"
            });
        }

        public void OnMidiLoadFailed()
        {
            PostMessage(new
            {
                cmd = "midiFileLoadFailed"
            });
        }

        public void OnReadyForPlay()
        {
            PostMessage(new
            {
                cmd = "readyForPlay",
                value = IsReadyForPlay()
            });
        }

        public void SendLog(LogLevel level, string s)
        {
            PostMessage(new
            {
                cmd = "log",
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
