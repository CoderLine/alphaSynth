using System;
using AlphaSynth.Ds;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.JavaScript;
using WorkerContext = SharpKit.Html.workers.WorkerContext;

namespace AlphaSynth.Player
{
    class WebWorkerOutput : ISynthOutput
    {
        // this value is initialized by the alphaSynth WebWorker wrapper 
        // that also includes the alphaSynth library into the worker. 
        public static int PreferredSampleRate { get; set; }

        private Action<int> _positionChangedListeners;
        private Action _finishedListeners;
        private Action _sampleRequestListeners;

        private WorkerContext _workerSelf;
        private int _sampleRate;

        public int SampleRate
        {
            get { return PreferredSampleRate; }
        }

        public void Open()
        {
            Logger.Debug("Initializing webworker worker");
            _workerSelf = JsContext.JsCode("self").As<WorkerContext>();
            _workerSelf.addEventListener("message", HandleMessage, false);

            OnReadyChanged(true);
        }

        private void HandleMessage(DOMEvent e)
        {
            var data = e.As<MessageEvent>().data;
            var cmd = data.Member("cmd").As<string>();
            switch (cmd)
            {
                case "playerSampleRequest":
                    OnSampleRequest();
                    break;
                case "playerFinished":
                    OnFinished();
                    break;
                case "playerPositionChanged":
                    OnPositionChanged(data.Member("pos").As<int>());
                    break;
            }
        }

        [JsMethod(InlineCodeExpression = "this._workerSelf.postMessage(o)")]
        private void PostMessage(object o)
        {
        }

        public event Action<int> PositionChanged;
        protected virtual void OnPositionChanged(int obj)
        {
            Action<int> handler = PositionChanged;
            if (handler != null) handler(obj);
        }

        public event Action Finished;
        protected virtual void OnFinished()
        {
            Action handler = Finished;
            if (handler != null) handler();
        }

        public event Action SampleRequest;
        protected virtual void OnSampleRequest()
        {
            Action handler = SampleRequest;
            if (handler != null) handler();
        }

        public event Action<bool> ReadyChanged;
        protected virtual void OnReadyChanged(bool isReady)
        {
            Action<bool> handler = ReadyChanged;
            if (handler != null) handler(isReady);
        }

        public void SequencerFinished()
        {
            PostMessage(new { cmd = "playerSequencerFinished" });
        }

        public void AddSamples(SampleArray samples)
        {
            PostMessage(new { cmd = "playerAddSamples", samples = samples });
        }

        public void Play()
        {
            PostMessage(new { cmd = "playerPlay" });
        }

        public void Pause()
        {
            PostMessage(new { cmd = "playerPause" });
        }

        public void Stop()
        {
            PostMessage(new { cmd = "playerStop" });
        }

        public void Seek(int position)
        {
            PostMessage(new { cmd = "playerSeek", pos = position });
        }
    }
}