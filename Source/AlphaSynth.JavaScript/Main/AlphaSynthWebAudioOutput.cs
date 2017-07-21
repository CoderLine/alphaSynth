using System;
using AlphaSynth.Ds;
using AlphaSynth.Player;
using AlphaSynth.Util;
using SharpKit.Html;
using SharpKit.Html.webaudio;
using SharpKit.JavaScript;

namespace AlphaSynth.Main
{
    /// <summary>
    /// This class implements a HTML5 Web Audio API based audio output device
    /// for alphaSynth. It can be controlled via a JS API.
    /// </summary>
    class AlphaSynthWebAudioOutput : ISynthOutput
    {
        private const int BufferSize = 4096;
        private const int BufferCount = 10;

        private AudioContext _context;
        private AudioBuffer _buffer;
        private AudioBufferSourceNode _source;
        private ScriptProcessorNode _audioNode;

        private CircularSampleBuffer _circularBuffer;

        private bool _finished;

        public int SampleRate
        {
            get { return (int)_context.sampleRate; }
        }

        public void Open()
        {
            _finished = false;

            _circularBuffer = new CircularSampleBuffer(BufferSize * BufferCount);

            JsContext.JsCode("window.AudioContext = window.AudioContext || window.webkitAudioContext");
            _context = new AudioContext();

            // possible fix for Web Audio in iOS 9 (issue #4)
            dynamic ctx = _context;
            if (ctx.state == "suspended")
            {
                EventListener resume = null;
                resume = e =>
                {
                    ctx.resume();
                    HtmlContext.window.setTimeout(() =>
                    {
                        if (ctx.state == "running")
                        {
                            HtmlContext.document.body.removeEventListener("touchend", resume, false);
                        }
                    }, 0);
                };
                HtmlContext.document.body.addEventListener("touchend", resume, false);
            }

            // create an empty buffer source (silence)
            _buffer = _context.createBuffer(2, BufferSize, _context.sampleRate);

            // create a script processor node which will replace the silence with the generated audio
            _audioNode = _context.createScriptProcessor(BufferSize, 0, 2);
            _audioNode.onaudioprocess = GenerateSound;

            Ready();
        }

        public void Play()
        {
            RequestBuffers();
            _finished = false;
            _source = _context.createBufferSource();
            _source.buffer = _buffer;
            _source.loop = true;
            _source.connect(_audioNode, 0, 0);
            _source.start(0);
            _audioNode.connect(_context.destination, 0, 0);
        }

        public void Pause()
        {
            if (_source != null)
            {
                _source.stop(0);
                _source.disconnect(0);
            }
            _source = null;
            _audioNode.disconnect(0);
        }

        public void SequencerFinished()
        {
            _finished = true;
        }


        public void AddSamples(SampleArray f)
        {
            _circularBuffer.Write(f, 0, f.Length);
        }

        public void ResetSamples()
        {
            _circularBuffer.Clear();
        }

        private void RequestBuffers()
        {
            // if we fall under the half of buffers
            // we request one half
            const int count = (BufferCount / 2) * BufferSize;
            if (_circularBuffer.Count < count && SampleRequest != null)
            {
                for (int i = 0; i < BufferCount / 2; i++)
                {
                    SampleRequest();
                }
            }
        }

        private void GenerateSound(DOMEvent e)
        {
            var ae = (AudioProcessingEvent)e;
            var left = ae.outputBuffer.getChannelData(0);
            var right = ae.outputBuffer.getChannelData(1);
            var samples = left.length + right.length;
            if (_circularBuffer.Count < samples)
            {
                if (_finished)
                {
                    Finished();
                }
            }
            else
            {
                var buffer = new SampleArray(samples);
                _circularBuffer.Read(buffer, 0, buffer.Length);

                var s = 0;
                for (int i = 0; i < left.length; i++)
                {
                    left[i] = buffer[s++];
                    right[i] = buffer[s++];
                }

                SamplesPlayed(left.length);
            }



            if (!_finished)
            {
                RequestBuffers();
            }
        }


        public event Action Ready;
        public event Action<int> SamplesPlayed;
        public event Action SampleRequest;
        public event Action Finished;
    }
}