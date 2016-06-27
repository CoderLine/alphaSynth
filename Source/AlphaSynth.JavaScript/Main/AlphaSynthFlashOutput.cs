using System;
using AlphaSynth.Ds;
using AlphaSynth.Player;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.JavaScript;

namespace AlphaSynth.Main
{
    // NOTE: we prefix all ISynthOutput methods with "AlphaSynth" to ensure
    // the ExternalInterface callbacks are called (play, stop etc. might control. the main movie)
    public interface IFlashSynthOutput
    {
        void AlphaSynthSequencerFinished();
        void AlphaSynthPlay();
        void AlphaSynthPause();
        void AlphaSynthStop();
        void AlphaSynthAddSamples(string base64Samples);
        void AlphaSynthSeek(int position);
    }

    class AlphaSynthFlashOutput : HtmlContext, ISynthOutput
    {
        public const int PreferredSampleRate = 44100;

        private readonly string _alphaSynthRoot;
        private const string Id = "alphaSynthFlashPlayer";
        private static readonly FastDictionary<string, AlphaSynthFlashOutput> Lookup;

        static AlphaSynthFlashOutput()
        {
            Lookup = new FastDictionary<string, AlphaSynthFlashOutput>();
        }

        private static int NextId;

        private string _id;
        private string _swfId;
        private HtmlElement _swfContainer;

        public int SampleRate
        {
            get { return PreferredSampleRate; }
        }

        public AlphaSynthFlashOutput(string alphaSynthRoot)
        {
            _alphaSynthRoot = alphaSynthRoot;

            var lastSlash = _alphaSynthRoot.LastIndexOf("/");
            if (lastSlash != -1)
            {
                _alphaSynthRoot = _alphaSynthRoot.Substring(0, lastSlash + 1);
            }
        }

        public void Open()
        {
            _id = Id + NextId;
            _swfId = _id + "swf";
            Lookup[_id] = this;
            NextId++;

            _swfContainer = document.createElement("div").As<HtmlElement>();
            _swfContainer.className = Id;
            _swfContainer.setAttribute("id", _id);
            document.body.appendChild(_swfContainer);

            var swf = JsCode("swfobject");
            var embedSwf = swf.Member("embedSWF").As<Action<string, string, string, string, string, string, object, object, object>>();
            embedSwf(
                _alphaSynthRoot + "AlphaSynth.FlashOutput.swf",
                _id, "1px", "1px", "9.0.0",
                null,
                new { id = _id, sampleRate = PreferredSampleRate }, new { allowScriptAccess = "always" }, new { id = _swfId }
            );
        }


        public void SequencerFinished()
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthSequencerFinished();
        }

        public void AddSamples(SampleArray samples)
        {
            var uint8 = new Uint8Array(samples.Buffer);
            var b64 = JsCode("window.btoa(String.fromCharCode.apply(null, uint8))").As<string>();
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthAddSamples(b64);
        }

        public void Play()
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthPlay();
        }

        public void Pause()
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthPause();
        }

        public void Stop()
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthStop();
        }

        public void Seek(int position)
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthSeek(position);
        }

        public event Action SampleRequest;
        public static void OnSampleRequest(string id)
        {
            if (Lookup.ContainsKey(id) && Lookup[id].SampleRequest != null)
            {
                Lookup[id].SampleRequest();
            }
        }

        public event Action Finished;
        public static void OnFinished(string id)
        {
            if (Lookup.ContainsKey(id) && Lookup[id].Finished != null)
            {
                Lookup[id].Finished();
            }
        }

        public event Action<int> PositionChanged;
        public static void OnPositionChanged(string id, int position)
        {
            if (Lookup.ContainsKey(id) && Lookup[id].PositionChanged != null)
            {
                Lookup[id].PositionChanged(position);
            }
        }

        public event Action<bool> ReadyChanged;
        public static void OnReadyChanged(string id, bool isReady)
        {
            if (Lookup.ContainsKey(id) && Lookup[id].ReadyChanged != null)
            {
                Lookup[id].ReadyChanged(isReady);
            }
        }
    }
}
