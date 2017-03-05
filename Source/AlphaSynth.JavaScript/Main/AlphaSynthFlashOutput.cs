using System;
using AlphaSynth.Ds;
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
        void AlphaSynthResetSamples();
        void AlphaSynthAddSamples(string base64Samples);
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
        private float _playbackSpeed;

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
            _playbackSpeed = 1;
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

        public void Play()
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthPlay();
        }

        public void Pause()
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthPause();
        }

        public void SequencerFinished()
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthSequencerFinished();
        }

        public void AddSamples(SampleArray samples)
        {
            var uint8 = new Uint8Array(samples.Buffer);
            JsFunction fromCharCode = JsCode("String.fromCharCode").As<JsFunction>();
            var b64 = window.btoa(fromCharCode.apply(null, uint8.As<object[]>()).As<string>());
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthAddSamples(b64);
        }


        public void ResetSamples()
        {
            document.getElementById(_swfId).As<IFlashSynthOutput>().AlphaSynthResetSamples();
        }

        public event Action Ready;
        public static void OnReady(string id)
        {
            if (Lookup.ContainsKey(id))
            {
                Lookup[id].Ready();
            }
        }

        public event Action SampleRequest;
        public static void OnSampleRequest(string id)
        {
            if (Lookup.ContainsKey(id))
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

        public event Action<int> SamplesPlayed;
        public static void OnSamplesPlayed(string id, int samples)
        {
            if (Lookup.ContainsKey(id))
            {
                Lookup[id].SamplesPlayed(samples);
            }
        }
    }
}
