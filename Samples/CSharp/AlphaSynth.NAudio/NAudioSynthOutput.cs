using System;
using AlphaSynth.Ds;
using AlphaSynth.Player;
using AlphaSynth.Synthesis;
using AlphaSynth.Util;
using NAudio.Wave;

namespace AlphaSynth.NAudio
{
    class NAudioSynthOutput : WaveProvider32, ISynthOutput
    {
        private const int BufferSize = 4096;
        private const float Latency = (BufferSize * 1000) / (2 * SynthConstants.SampleRate);
        private const int BufferCount = 10;

        private DirectSoundOut _context;

        private CircularSampleBuffer _circularBuffer;

        private bool _finished;

        private int _startTime;
        private int _pauseStart;
        private int _pauseTime;
        private bool _paused;

        public NAudioSynthOutput(Synthesizer synth)
            : base(synth.SampleRate, synth.AudioChannels)
        {
        }

        public void Open()
        {
            _finished = false;

            _circularBuffer = new CircularSampleBuffer(BufferSize * BufferCount);

            _context = new DirectSoundOut(100);
            _context.Init(this);

            OnReadyChanged(true);
        }

        public void Close()
        {
            Stop();
            _context.Dispose();
        }

        public void Play()
        {
            RequestBuffers();
            _finished = false;
            if (_paused)
            {
                _paused = false;
                _pauseTime += (int)(_context.PlaybackPosition.TotalSeconds * 1000 - _pauseStart);
            }
            else
            {
                _startTime = (int)(_context.PlaybackPosition.TotalSeconds * 1000);
                _pauseTime = 0;
            }
            
            _context.Play();
        }

        public void Pause()
        {
            _context.Pause();
            _paused = true;
            _pauseStart = (int)(_context.PlaybackPosition.TotalSeconds * 1000);
        }

        public void Stop()
        {
            _finished = true;
            _paused = false;
            _context.Stop();
            _circularBuffer.Clear();
        }

        public void Seek(int position)
        {
            _startTime = (int)(_context.PlaybackPosition.TotalSeconds * 1000 - position);
            _pauseTime = 0;
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
            return (_context.PlaybackPosition.TotalSeconds * 1000 - _startTime - _pauseTime - Latency);
        }

        public override int Read(float[] buffer, int offset, int count)
        {
            if (_circularBuffer.Count < count)
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
                var read = new SampleArray(count);
                _circularBuffer.Read(read, 0, read.Length);

                for (int i = 0; i < count; i++)
                {
                    buffer[offset + i] = read[i];
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

            return count;
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