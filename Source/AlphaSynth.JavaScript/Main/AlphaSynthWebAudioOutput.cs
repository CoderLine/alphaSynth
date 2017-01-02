using System;
using AlphaSynth.Ds;
using AlphaSynth.Player;
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
        private double _currentTime;
        private double _playbackSpeed;

        public int SampleRate
        {
            get { return (int)_context.sampleRate; }
        }

        public void Open()
        {
            _playbackSpeed = 1;
            _finished = false;

            _circularBuffer = new CircularSampleBuffer(BufferSize * BufferCount);

            JsContext.JsCode("window.AudioContext = window.AudioContext || window.webkitAudioContext");
            _context = new AudioContext();

            _currentTime = 0;

            // create an empty buffer source (silence)
            _buffer = _context.createBuffer(2, BufferSize, _context.sampleRate);

            // create a script processor node which will replace the silence with the generated audio
            _audioNode = _context.createScriptProcessor(BufferSize, 0, 2);
            _audioNode.onaudioprocess = GenerateSound;

            OnReadyChanged(true);
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
            }
            _source = null;
            _audioNode.disconnect(0);
        }

        public void Seek(double position)
        {
            _currentTime = position;
            _circularBuffer.Clear();
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

                _currentTime += (left.length / (double)SampleRate) * 1000 * _playbackSpeed;
            }

            if (PositionChanged != null)
            {
                PositionChanged(_currentTime);
            }

            if (!_finished)
            {
                RequestBuffers();
            }
        }

        public void SetPlaybackSpeed(float playbackSpeed)
        {
            _playbackSpeed = playbackSpeed;
        }

        public event Action SampleRequest;
        public event Action Finished;
        public event Action<double> PositionChanged;
        public event Action<bool> ReadyChanged;
        protected virtual void OnReadyChanged(bool isReady)
        {
            Action<bool> handler = ReadyChanged;
            if (handler != null) handler(isReady);
        }
    }
}