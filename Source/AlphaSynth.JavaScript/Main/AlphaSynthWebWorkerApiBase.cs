using System;
using AlphaSynth.Ds;
using AlphaSynth.Player;
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
    class AlphaSynthWebWorkerApiBase : HtmlContext, IAlphaSynthAsync
    {
        private readonly string _alphaSynthScriptFile;
        private readonly Worker _synth;
        private readonly ISynthOutput _player;

        private bool _isPlayerReady;
        private bool _isWorkerReady;

        private readonly FastDictionary<string, FastList<JsFunction>> _events;

        public AlphaSynthWebWorkerApiBase(ISynthOutput player, string alphaSynthScriptFile)
        {
            _player = player;
            _player.ReadyChanged += PlayerReadyChanged;
            _player.PositionChanged += PlayerPositionChanged;
            _player.SampleRequest += PlayerSampleRequest;
            _player.Finished += PlayerFinished;

            _events = new FastDictionary<string, FastList<JsFunction>>();

            _alphaSynthScriptFile = alphaSynthScriptFile;

            // create web worker
            _synth = new Worker(_alphaSynthScriptFile);
        }

        public void Startup()
        {
            // start player
            _player.Open();
            // start worker
            _synth.addEventListener("message", HandleWorkerMessage, false);

            _synth.postMessage(new { cmd = "alphaSynth.playerReady", alphaSynthScript = _alphaSynthScriptFile, sampleRate = _player.SampleRate });
        }

        //
        // API communicating with the web worker

        public void IsReadyForPlay()
        {
            _synth.postMessage(new { cmd = "alphaSynth.isReadyForPlay" });
        }

        public void Play()
        {
            _synth.postMessage(new { cmd = "alphaSynth.play" });
        }

        public void Pause()
        {
            _synth.postMessage(new { cmd = "alphaSynth.pause" });
        }

        public void PlayPause()
        {
            _synth.postMessage(new { cmd = "alphaSynth.playPause" });
        }

        public void Stop()
        {
            _synth.postMessage(new { cmd = "alphaSynth.stop" });
        }

        public void SetPositionTick(int tick)
        {
            _synth.postMessage(new { cmd = "alphaSynth.setPositionTick", tick = tick });
        }

        public void SetPositionTime(int millis)
        {
            _synth.postMessage(new { cmd = "alphaSynth.setPositionTime", time = millis });
        }

        public void LoadSoundFontUrl(string url)
        {
            _synth.postMessage(new { cmd = "alphaSynth.loadSoundFontUrl", url = QualifyUrl(url) });
        }

        public void LoadSoundFontBytes(byte[] data)
        {
            _synth.postMessage(new { cmd = "alphaSynth.loadSoundFontBytes", data = data });
        }

        public void LoadMidiUrl(string url)
        {
            _synth.postMessage(new { cmd = "alphaSynth.loadMidiUrl", url = QualifyUrl(url) });
        }

        public void LoadMidiBytes(byte[] data)
        {
            _synth.postMessage(new { cmd = "alphaSynth.loadMidiBytes", data = data });
        }

        public void GetState()
        {
            _synth.postMessage(new { cmd = "alphaSynth.getState" });
        }

        public void GetMasterVolume()
        {
            _synth.postMessage(new { cmd = "alphaSynth.getMasterVolume" });
        }

        public void SetMasterVolume(float volume)
        {
            _synth.postMessage(new { cmd = "alphaSynth.setMasterVolume", value = volume });
        }

        public void GetPlaybackSpeed()
        {
            _synth.postMessage(new { cmd = "alphaSynth.getPlaybackSpeed" });
        }

        public void SetPlaybackSpeed(float playbackSpeed)
        {
            _synth.postMessage(new { cmd = "alphaSynth.setPlaybackSpeed", value = playbackSpeed });
        }

        public void SetPlaybackRange(int startTick, int endTick)
        {
            _synth.postMessage(new { cmd = "alphaSynth.setPlaybackRange", startTick = startTick, endTick = endTick });
        }

        public void IsSoundFontLoaded()
        {
            _synth.postMessage(new { cmd = "alphaSynth.isSoundFontLoaded" });
        }

        public void IsMidiLoaded()
        {
            _synth.postMessage(new { cmd = "alphaSynth.isMidiLoaded" });
        }

        public void SetLogLevel(LogLevel level)
        {
            _synth.postMessage(new { cmd = "alphaSynth.setLogLevel", level = level });
        }

        private static string QualifyUrl(string url)
        {
            var img = (HtmlImageElement)document.createElement("img");
            img.onerror = e => { };
            img.src = url;
            url = img.src;
            img.src = null;
            return url;
        }

        public virtual void HandleWorkerMessage(DOMEvent e)
        {
            var data = e.As<MessageEvent>().data;
            var cmd = data.Member("cmd").As<string>();
            switch (cmd)
            {
                // responses
                case "alphaSynth.isReadyForPlay":
                    TriggerEvent("isReadyForPlay", new[] { data.Member("value") });
                    break;
                case "alphaSynth.getState":
                    TriggerEvent("getState", new[] { data.Member("value") });
                    break;
                case "alphaSynth.getMasterVolume":
                    TriggerEvent("getMasterVolume", new[] { data.Member("value") });
                    break;
                case "alphaSynth.isSoundFontLoaded":
                    TriggerEvent("isSoundFontLoaded", new[] { data.Member("value") });
                    break;
                case "alphaSynth.isMidiLoaded":
                    TriggerEvent("isMidiLoaded", new[] { data.Member("value") });
                    break;

                // events
                case "alphaSynth.ready":
                    _isWorkerReady = true;
                    CheckForReadyState();
                    break;
                case "alphaSynth.positionChanged":
                    TriggerEvent("positionChanged", new[] { data.Member("currentTime"), data.Member("endTime"), data.Member("currentTick"), data.Member("endTick") });
                    break;
                case "alphaSynth.playerStateChanged":
                    TriggerEvent("playerStateChanged", new[] { data.Member("state") });
                    break;
                case "alphaSynth.finished":
                    TriggerEvent("finished");
                    break;
                case "alphaSynth.soundFontLoad":
                    TriggerEvent("soundFontLoad", new[] { data.Member("loaded"), data.Member("total") });
                    break;
                case "alphaSynth.soundFontLoaded":
                    TriggerEvent("soundFontLoaded");
                    break;
                case "alphaSynth.soundFontLoadFailed":
                    TriggerEvent("soundFontLoadFailed");
                    break;
                case "alphaSynth.midiLoad":
                    TriggerEvent("midiLoad", new[] { data.Member("loaded"), data.Member("total") });
                    break;
                case "alphaSynth.midiFileLoaded":
                    TriggerEvent("midiFileLoaded");
                    break;
                case "alphaSynth.midiFileLoadFailed":
                    TriggerEvent("midiFileLoadFailed");
                    break;
                case "alphaSynth.readyForPlay":
                    TriggerEvent("readyForPlay", new[] { data.Member("value") });
                    break;
                case "alphaSynth.log":
                    Log(data.Member("level").As<LogLevel>(), data.Member("message").As<string>());
                    break;
                // js player communication
                case "alphaSynth.playerSequencerFinished":
                    _player.SequencerFinished();
                    break;
                case "alphaSynth.playerAddSamples":
                    _player.AddSamples(data.Member("samples").As<SampleArray>());
                    break;
                case "alphaSynth.playerPlay":
                    _player.Play();
                    break;
                case "alphaSynth.playerPause":
                    _player.Pause();
                    break;
                case "alphaSynth.playerSeek":
                    _player.Seek(data.Member("pos").As<int>());
                    break;
                case "alphaSynth.setPlaybackSpeed":
                    _player.SetPlaybackSpeed(data.Member("value").As<float>());
                    break;
            }
        }

        private void CheckForReadyState()
        {
            TriggerEvent("ready", new object[] { (_isWorkerReady && _isPlayerReady) });
        }

        private void PlayerReadyChanged(bool isReady)
        {
            _isPlayerReady = isReady;
            CheckForReadyState();
        }

        public void On(string events, Action action)
        {
            if (!_events.ContainsKey(events))
            {
                _events[events] = new FastList<JsFunction>();
            }
            _events[events].Add(action.As<JsFunction>());
        }

        //
        // Events triggered by player

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

        public void PlayerSampleRequest()
        {
            _synth.postMessage(new { cmd = "alphaSynth.playerSampleRequest" });
        }

        public void PlayerFinished()
        {
            _synth.postMessage(new { cmd = "alphaSynth.playerFinished" });
        }

        public void PlayerPositionChanged(double pos)
        {
            _synth.postMessage(new { cmd = "alphaSynth.playerPositionChanged", pos = pos });
        }

        private void Log(LogLevel level, string message)
        {
            switch (level)
            {
                case LogLevel.None:
                    console.log(message);
                    break;
                case LogLevel.Debug:
                    console.debug(message);
                    break;
                case LogLevel.Info:
                    console.info(message);
                    break;
                case LogLevel.Warning:
                    console.warn(message);
                    break;
                case LogLevel.Error:
                    console.error(message);
                    break;
            }
        }
    }
}