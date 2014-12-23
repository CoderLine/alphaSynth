namespace AlphaSynth.Main
{
    /// <summary>
    /// This class implements a JavaScript API for initializing and controlling
    /// a WebWorker based alphaSynth which uses a HTML5 Web Audio Api Output.
    /// </summary>
    class AlphaSynthWebWorkerApi : AlphaSynthWebWorkerApiBase
    {
        public AlphaSynthWebWorkerApi(string asRoot)
            : base(new AlphaSynthWebAudioOutput(), asRoot)
        {
        }
    }
}
