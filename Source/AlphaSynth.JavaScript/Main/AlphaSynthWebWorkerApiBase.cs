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
            _synth = new Worker(CreateWorkerUrl());
        }


        private string CreateWorkerUrl()
        {
            var source = @"self.onmessage = function(e) {
                if(e.data.cmd == 'playerReady') {
                    importScripts(e.data.alphaSynthScript);
                    AlphaSynth.Player.WebWorkerOutput.PreferredSampleRate = e.data.sampleRate;
                    new AlphaSynth.Main.AlphaSynthWebWorker(self);
                }
            }";

            JsCode("window.URL = window.URL || window.webkitURL;");
            JsCode("window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder  || window.MozBlobBuilder;");

            Blob blob;
            try
            {
                blob = new Blob(new[] { source }, new { type = "application/javascript" });
            }
            catch
            {
                dynamic builder = JsCode("new BlobBuilder()");
                builder.append(source);
                blob = builder.getBlob();
            }

            return JsCode("URL.createObjectURL(blob)").As<string>();
        }

        public void Startup()
        {
            // start player
            _player.Open();
            // start worker
            _synth.addEventListener("message", HandleWorkerMessage, false);

            _synth.postMessage(new { cmd = "playerReady", alphaSynthScript = _alphaSynthScriptFile, sampleRate = _player.SampleRate });
        }

        //
        // API communicating with the web worker

        public void IsReadyForPlay()
        {
            _synth.postMessage(new { cmd = "isReadyForPlay" });
        }

        public void Play()
        {
            _synth.postMessage(new { cmd = "play" });
        }

        public void Pause()
        {
            _synth.postMessage(new { cmd = "pause" });
        }

        public void PlayPause()
        {
            _synth.postMessage(new { cmd = "playPause" });
        }

        public void Stop()
        {
            _synth.postMessage(new { cmd = "stop" });
        }

        public void SetPositionTick(int tick)
        {
            _synth.postMessage(new { cmd = "setPositionTick", tick = tick });
        }

        public void SetPositionTime(int millis)
        {
            _synth.postMessage(new { cmd = "setPositionTime", time = millis });
        }

        public void LoadSoundFontUrl(string url)
        {
            _synth.postMessage(new { cmd = "loadSoundFontUrl", url = QualifyUrl(url) });
        }

        public void LoadSoundFontBytes(byte[] data)
        {
            _synth.postMessage(new { cmd = "loadSoundFontBytes", data = data });
        }

        public void LoadMidiUrl(string url)
        {
            _synth.postMessage(new { cmd = "loadMidiUrl", url = QualifyUrl(url) });
        }

        public void LoadMidiBytes(byte[] data)
        {
            _synth.postMessage(new { cmd = "loadMidiBytes", data = data });
        }

        public void GetState()
        {
            _synth.postMessage(new { cmd = "getState" });
        }

        public void GetMasterVolume()
        {
            _synth.postMessage(new { cmd = "getMasterVolume" });
        }

        public void SetMasterVolume(float volume)
        {
            _synth.postMessage(new { cmd = "setMasterVolume", value = volume });
        }

        public void GetPlaybackSpeed()
        {
            _synth.postMessage(new { cmd = "getPlaybackSpeed" });
        }

        public void SetPlaybackSpeed(float playbackSpeed)
        {
            _synth.postMessage(new { cmd = "setPlaybackSpeed", value = playbackSpeed });
        }

        public void SetPlaybackRange(int startTick, int endTick)
        {
            _synth.postMessage(new { cmd = "setPlaybackRange", startTick = startTick, endTick = endTick });
        }

        public void IsSoundFontLoaded()
        {
            _synth.postMessage(new { cmd = "isSoundFontLoaded" });
        }

        public void IsMidiLoaded()
        {
            _synth.postMessage(new { cmd = "isMidiLoaded" });
        }

        public void SetLogLevel(LogLevel level)
        {
            _synth.postMessage(new { cmd = "setLogLevel", level = level });
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
                case "isReadyForPlay":
                case "getState":
                case "getMasterVolume":
                case "isSoundFontLoaded":
                case "isMidiLoaded":
                    TriggerEvent(cmd, new[] { data.Member("value") });
                    break;

                // events
                case "ready":
                    _isWorkerReady = true;
                    CheckForReadyState();
                    break;
                case "positionChanged":
                    TriggerEvent(cmd, new[] { data.Member("currentTime"), data.Member("endTime"), data.Member("currentTick"), data.Member("endTick") });
                    break;
                case "playerStateChanged":
                    TriggerEvent(cmd, new[] { data.Member("state") });
                    break;
                case "finished":
                    TriggerEvent(cmd);
                    break;
                case "soundFontLoad":
                    TriggerEvent(cmd, new[] { data.Member("loaded"), data.Member("total") });
                    break;
                case "soundFontLoaded":
                    TriggerEvent(cmd);
                    break;
                case "soundFontLoadFailed":
                    TriggerEvent(cmd);
                    break;
                case "midiLoad":
                    TriggerEvent(cmd, new[] { data.Member("loaded"), data.Member("total") });
                    break;
                case "midiFileLoaded":
                    TriggerEvent(cmd);
                    break;
                case "midiFileLoadFailed":
                    TriggerEvent(cmd);
                    break;
                case "readyForPlay":
                    TriggerEvent(cmd, new[] { data.Member("value") });
                    break;
                case "log":
                    Log(data.Member("level").As<LogLevel>(), data.Member("message").As<string>());
                    break;
                // js player communication
                case "playerSequencerFinished":
                    _player.SequencerFinished();
                    break;
                case "playerAddSamples":
                    _player.AddSamples(data.Member("samples").As<SampleArray>());
                    break;
                case "playerPlay":
                    _player.Play();
                    break;
                case "playerPause":
                    _player.Pause();
                    break;
                case "playerSeek":
                    _player.Seek(data.Member("pos").As<int>());
                    break;
                case "setPlaybackSpeed":
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
            _synth.postMessage(new { cmd = "playerSampleRequest" });
        }

        public void PlayerFinished()
        {
            _synth.postMessage(new { cmd = "playerFinished" });
        }

        public void PlayerPositionChanged(double pos)
        {
            _synth.postMessage(new { cmd = "playerPositionChanged", pos = pos });
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