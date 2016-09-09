using System;
using AlphaSynth.Ds;
using AlphaSynth.Platform;
using AlphaSynth.Player;
using AlphaSynth.Synthesis;
using AlphaSynth.Util;
using NAudio.Wave;

namespace AlphaSynth.NAudio
{
    class NAudioSynthOutput : WaveProvider32, ISynthOutput
    {
        private const int BufferSize = 4096;
        private const int BufferCount = 10;
        private const int PreferredSampleRate = 44100;

        private DirectSoundOut _context;

        private CircularSampleBuffer _circularBuffer;

        private bool _finished;
        private double _currentTime;
        private double _playbackSpeed;

        public int SampleRate
        {
            get { return PreferredSampleRate; }
        }

        public NAudioSynthOutput()
            : base(PreferredSampleRate, SynthConstants.AudioChannels)
        {
        }

        public void Open()
        {
            _playbackSpeed = 1;
            _finished = false;
            _currentTime = 0;
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
            _context.Play();
        }

        public void Pause()
        {
            _context.Pause();
        }

        public void Stop()
        {
            _finished = true;
            _context.Stop();
            _currentTime = 0;
            _circularBuffer.Clear();
        }

        public void Seek(int position)
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

        public override int Read(float[] buffer, int offset, int count)
        {
            if (_circularBuffer.Count < count)
            {
                if (_finished)
                {
                    if (Finished != null) Finished();
                    Stop();
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

                var samples = count/2.0;
                _currentTime += (samples / SampleRate) * 1000 * _playbackSpeed;

            }

            if (PositionChanged != null)
            {
                PositionChanged((int)_currentTime);
            }

            if (!_finished)
            {
                RequestBuffers();
            }

            return count;
        }

        public void SetPlaybackSpeed(float playbackSpeed)
        {
            _playbackSpeed = playbackSpeed;
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