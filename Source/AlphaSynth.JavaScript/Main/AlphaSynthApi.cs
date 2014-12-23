using System;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.JavaScript;

namespace AlphaSynth.Main
{
    /// <summary>
    ///  This is the main JavaScript api wrapper for alphaSynth. It detects browser compatibility and
    /// initializes a alphaSynth version for the client. 
    /// 
    /// Compatibility:
    ///   If a browser supports WebWorkers, we will use WebWorkers for Synthesizing the samples and a Flash player for playback
    ///   If the browser does not support WebWorkers we'll use a pure Flash fallback which requires Flash 11.4
    /// 
    /// 
    /// - IE6-9   - A pure flash alphaSynth is initialized (Requires Flash 11.4)
    /// - IE10-11 - Flash is used for playback, Synthesizing is done in a WebWorker
    /// - Firefox - Web Audio API is used for playback, Synthesizing is done in a WebWorker 
    /// - Chrome  - Web Audio API is used for playback, Synthesizing is done in a WebWorker 
    /// - Safari  - Web Audio API is used for playback, Synthesizing is done in a WebWorker 
    /// - Opera   - Web Audio API is used for playback, Synthesizing is done in a WebWorker
    /// </summary>
    public class AlphaSynthApi : HtmlContext, IAlphaSynthAsync
    {
        public const string AlphaSynthId = "AlphaSynth";

        private static JsObject SwfObject
        {
            [JsMethod(InlineCode = "swfobject", Export = false)]
            get { return null; }
        }

        private static bool SupportsWebAudio
        {
            [JsMethod(InlineCode = "!!window.ScriptProcessorNode", Export = false)]
            get { return false; }
        }

        private static bool SupportsWebWorkers
        {
            [JsMethod(InlineCode = "!!window.Worker", Export = false)]
            get { return false; }
        }

        private static bool ForceFlash
        {
            [JsMethod(InlineCode = "!!window.ForceFlash", Export = false)]
            get { return false; }
        }

        public IAlphaSynthAsync RealInstance { get; set; }
        public bool Ready { get; set; }

        public void Startup()
        {
            RealInstance.On("readyForPlay", () =>
            {
                Ready = true;
            });
            RealInstance.Startup();
        }

        public void IsReadyForPlay()
        {
            if (RealInstance == null) return;
            RealInstance.IsReadyForPlay();
        }

        public void GetMasterVolume()
        {
            if (RealInstance == null) return;
            RealInstance.GetMasterVolume();
        }

        public void SetMasterVolume(float volume)
        {
            if (RealInstance == null) return;
            RealInstance.SetMasterVolume(volume);
        }

        public void GetState()
        {
            if (RealInstance == null) return;
            RealInstance.GetState();
        }

        public void IsSoundFontLoaded()
        {
            if (RealInstance == null) return;
            RealInstance.IsSoundFontLoaded();
        }
        public void IsMidiLoaded()
        {
            if (RealInstance == null) return;
            RealInstance.IsMidiLoaded();
        }
        public void Play()
        {
            if (RealInstance == null) return;
            RealInstance.Play();
        }
        public void Pause()
        {
            if (RealInstance == null) return;
            RealInstance.Pause();
        }
        public void PlayPause()
        {
            if (RealInstance == null) return;
            RealInstance.PlayPause();
        }
        public void Stop()
        {
            if (RealInstance == null) return;
            RealInstance.Stop();
        }
        public void SetPositionTick(int tick)
        {
            if (RealInstance == null) return;
            RealInstance.SetPositionTick(tick);
        }
        public void SetPositionTime(int millis)
        {
            if (RealInstance == null) return;
            RealInstance.SetPositionTime(millis);
        }
        public void LoadSoundFontUrl(string url)
        {
            if (RealInstance == null) return;
            RealInstance.LoadSoundFontUrl(url);
        }
        public void LoadSoundFontBytes(byte[] data)
        {
            if (RealInstance == null) return;
            RealInstance.LoadSoundFontBytes(data);
        }
        public void LoadMidiUrl(string url)
        {
            if (RealInstance == null) return;
            RealInstance.LoadMidiUrl(url);
        }
        public void LoadMidiBytes(byte[] data)
        {
            if (RealInstance == null) return;
            RealInstance.LoadMidiBytes(data);
        }

        public void SetLogLevel(LogLevel level)
        {
            Logger.LogLevel = level;
            if (RealInstance == null) return;
            RealInstance.SetLogLevel(level);
        }

        public void On(string events, Action fn)
        {
            if (RealInstance == null) return;
            RealInstance.On(events, fn);
            if (events == "readyForPlay" && Ready)
            {
                fn();
            }
        }

        public AlphaSynthApi(string asRoot = "", string swfObjectRoot = "")
        {
            // var swf = SwfObject;
            var supportsWebAudio = SupportsWebAudio;
            var supportsWebWorkers = SupportsWebWorkers;
            var forceFlash = ForceFlash;

            if (asRoot == "")
            {
                asRoot = window["AsRoot"].toString();
            }

            if (swfObjectRoot == "")
            {
                swfObjectRoot = window["SwfObjectRoot"].toString();
            }

            if (supportsWebAudio && !forceFlash)
            {
                Logger.Info("Will use webworkers for synthesizing and web audio api for playback");
                RealInstance = new AlphaSynthWebWorkerApi(asRoot);
            }
            else if (supportsWebWorkers)
            {
                Logger.Info("Will use webworkers for synthesizing and flash for playback");
                RealInstance = new AlphaSynthFlashPlayerApi(asRoot, swfObjectRoot);
            }
            else
            {
                Logger.Error("Incompatible browser");
                throw new Exception("Incompatible browser");
            }

            RealInstance.Startup();
        }
    }
}
