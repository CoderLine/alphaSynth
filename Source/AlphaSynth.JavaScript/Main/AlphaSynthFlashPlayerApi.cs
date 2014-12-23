using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.JavaScript;

namespace AlphaSynth.Main
{
    /// <summary>
    /// This class implements a JavaScript API for initializing and controlling
    /// a WebWorker based alphaSynth which uses a Flash based Audio Output.    
    /// </summary>
    class AlphaSynthFlashPlayerApi : AlphaSynthWebWorkerApiBase
    {
        public AlphaSynthFlashPlayerApi(string asRoot, string swfObjectRoot)
            : base(new AlphaSynthFlashOutput(asRoot, swfObjectRoot), asRoot)
        {
        }
    }
}
