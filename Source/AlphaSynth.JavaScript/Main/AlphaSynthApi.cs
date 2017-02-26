using System;
using AlphaSynth.Ds;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.JavaScript;

namespace AlphaSynth.Main
{
    /// <summary>
    /// This is the main JavaScript api wrapper for alphaSynth. It detects browser compatibility and
    /// initializes a alphaSynth version for the client. 
    /// 
    /// Compatibility:
    ///   If a browser supports WebWorkers, we will use WebWorkers for Synthesizing the samples and a Flash player for playback
    ///   If the browser does not support WebWorkers we'll use a pure Flash fallback which requires Flash 11.4
    /// 
    /// - IE6-9   - Unsupported
    /// - IE10-11 - Flash is used for playback, Synthesizing is done in a WebWorker
    /// - Firefox - Web Audio API is used for playback, Synthesizing is done in a WebWorker 
    /// - Chrome  - Web Audio API is used for playback, Synthesizing is done in a WebWorker 
    /// - Safari  - Web Audio API is used for playback, Synthesizing is done in a WebWorker 
    /// - Opera   - Web Audio API is used for playback, Synthesizing is done in a WebWorker
    /// </summary>
    public class AlphaSynthApi : HtmlContext
    {
        public static IAlphaSynth Create(string alphaSynthScriptFile = "")
        {
            // var swf = SwfObject;
            var supportsWebAudio = Platform.Platform.SupportsWebAudio;
            var supportsWebWorkers = Platform.Platform.SupportsWebWorkers;
            var forceFlash = Platform.Platform.ForceFlash;

            // explicitly specified file/root path
            if (!string.IsNullOrEmpty(alphaSynthScriptFile))
            {
                // append script name 
                if (!alphaSynthScriptFile.EndsWith(".js"))
                {
                    if (!alphaSynthScriptFile.EndsWith("/"))
                    {
                        alphaSynthScriptFile += "/";
                    }
                    alphaSynthScriptFile += "AlphaSynth.js";
                }
                if (!alphaSynthScriptFile.StartsWith("http") && !alphaSynthScriptFile.StartsWith("https"))
                {
                    var root = new StringBuilder();
                    root.Append(window.location.protocol);
                    root.Append("//");
                    root.Append(window.location.hostname);
                    if (window.location.port.As<bool>())
                    {
                        root.Append(":");
                        root.Append(window.location.port);
                    }
                    root.Append(alphaSynthScriptFile);
                    alphaSynthScriptFile = root.ToString();
                }
            }
            // find automatically
            else
            {
                alphaSynthScriptFile = Platform.Platform.ScriptFile;
            }

            if (supportsWebAudio && !forceFlash)
            {
                Logger.Info("Will use webworkers for synthesizing and web audio api for playback");
                return new AlphaSynthWebWorkerApi(new AlphaSynthWebAudioOutput(), alphaSynthScriptFile);
            }

            if (supportsWebWorkers)
            {
                Logger.Info("Will use webworkers for synthesizing and flash for playback");
                return  new AlphaSynthWebWorkerApi(new AlphaSynthFlashOutput(alphaSynthScriptFile), alphaSynthScriptFile);
            }

            Logger.Error("Incompatible browser");
            throw new Exception("Incompatible browser");
        }
    }
}
