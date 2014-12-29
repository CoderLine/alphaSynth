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
        private const float Latency = (BufferSize * 1000) / (2 * SynthConstants.SampleRate);
        private const int BufferCount = 10;

        private AudioContext _context;
        private AudioBuffer _buffer;
        private AudioBufferSourceNode _source;
        private ScriptProcessorNode _audioNode;

        private CircularSampleBuffer _circularBuffer;

        private bool _finished;

        private int? _seekTime;

        private int _startTime;
        private int _pauseStart;
        private int _pauseTime;
        private bool _paused;

        public void Open()
        {
            _finished = false;

            _circularBuffer = new CircularSampleBuffer(BufferSize * BufferCount);

            JsContext.JsCode("window.AudioContext = window.AudioContext || window.webkitAudioContext");
            _context = new AudioContext();

            // create an empty buffer source (silence)
            _buffer = _context.createBuffer(2, BufferSize, SynthConstants.SampleRate);

            // create a script processor node which will replace the silence with the generated audio
            _audioNode = _context.createScriptProcessor(BufferSize, 0, 2);
            _audioNode.onaudioprocess = GenerateSound;

            OnReadyChanged(true);
        }

        public void Play()
        {
            RequestBuffers();
            _finished = false;
            if (_seekTime != null)
            {
                _startTime = (int)(_context.currentTime * 1000 - _seekTime.Value);
                _pauseTime = 0;
                _paused = false;
            }
            else if (_paused)
            {
                _paused = false;
                _pauseTime += (int)(_context.currentTime * 1000 - _pauseStart);
            }
            else
            {
                _startTime = (int)(_context.currentTime * 1000);
                _pauseTime = 0;
            }
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
            }
            _source = null;
            _paused = true;
            _pauseStart = (int)(_context.currentTime * 1000);
            _audioNode.disconnect(0);
        }

        public void Stop()
        {
            _finished = true;
            _paused = false;
            if (_source != null)
            {
                _source.stop(0);
            }
            _source = null;
            _circularBuffer.Clear();
            _audioNode.disconnect(0);
        }

        public void Seek(int position)
        {
            _seekTime = position;
        }

        public void SequencerFinished()
        {
            _finished = true;
        }

        public void AddSamples(SampleArray f)
        {
            _circularBuffer.Write(f, 0, f.Length);
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

        private double CalcPosition()
        {
            return (_context.currentTime * 1000 - _startTime - _pauseTime - Latency);
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
                    if (Finished != null) Finished();
                    Stop();
                }
                else
                {
                    // when buffering we count it as pause time
                    _pauseTime += (BufferSize * 1000) / (2 * SynthConstants.SampleRate);
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
            }

            if (PositionChanged != null)
            {
                PositionChanged((int)(CalcPosition()));
            }

            if (!_finished)
            {
                RequestBuffers();
            }
        }

        public event Action SampleRequest;
        public event Action Finished;
        public event Action<int> PositionChanged;
        public event Action<bool> ReadyChanged;
        protected virtual void OnReadyChanged(bool isReady)
        {
            Action<bool> handler = ReadyChanged;
            if (handler != null) handler(isReady);
        }
    }
}