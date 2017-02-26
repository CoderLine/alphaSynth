using System;
using AlphaSynth.Ds;
using AlphaSynth.Main;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.Html.workers;
using SharpKit.JavaScript;

namespace AlphaSynth.Player
{
    class WebWorkerOutput : ISynthOutput
    {
        public const string CmdOutputPrefix = AlphaSynthWebWorker.CmdPrefix + "output.";

        // Worker -> Output
        public const string CmdOutputSequencerFinished = CmdOutputPrefix + "sequencerFinished";
        public const string CmdOutputAddSamples = CmdOutputPrefix + "addSamples";
        public const string CmdOutputPlay = CmdOutputPrefix + "play";
        public const string CmdOutputPause = CmdOutputPrefix + "pause";
        public const string CmdOutputResetSamples = CmdOutputPrefix + "resetSamples";

        // Output -> Worker
        public const string CmdOutputSampleRequest = CmdOutputPrefix + "sampleRequest";
        public const string CmdOutputFinished = CmdOutputPrefix + "finished";
        public const string CmdOutputSamplesPlayed = CmdOutputPrefix + "samplesPlayed";


        // this value is initialized by the alphaSynth WebWorker wrapper 
        // that also includes the alphaSynth library into the worker. 
        public static int PreferredSampleRate { get; set; }

        private DedicatedWorkerContext _worker;

        public int SampleRate
        {
            get { return PreferredSampleRate; }
        }

        public void Open()
        {
            Logger.Debug("Initializing webworker worker");
            _worker = JsContext.JsCode("self").As<DedicatedWorkerContext>();
            _worker.addEventListener("message", HandleMessage, false);
            Ready();
        }

        private void HandleMessage(DOMEvent e)
        {
            var data = e.As<MessageEvent>().data;
            var cmd = data.Member("cmd").As<string>();
            switch (cmd)
            {
                case CmdOutputSampleRequest:
                    SampleRequest();
                    break;
                case CmdOutputFinished:
                    Finished();
                    break;
                case CmdOutputSamplesPlayed:
                    SamplesPlayed(data.Member("samples").As<int>());
                    break;
            }
        }


        public event Action Ready;
        public event Action<int> SamplesPlayed;
        public event Action SampleRequest;
        public event Action Finished;

        public void SequencerFinished()
        {
            _worker.postMessage(new { cmd = CmdOutputSequencerFinished });
        }

        public void AddSamples(SampleArray samples)
        {
            _worker.postMessage(new { cmd = CmdOutputAddSamples, samples = samples });
        }

        public void Play()
        {
            _worker.postMessage(new { cmd = CmdOutputPlay });
        }

        public void Pause()
        {
            _worker.postMessage(new { cmd = CmdOutputPause });
        }

        public void ResetSamples()
        {
            _worker.postMessage(new { cmd = CmdOutputResetSamples });
        }
    }
}