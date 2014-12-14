using System;
using AlphaSynth.IO;
using AlphaSynth.Sequencer;
using AlphaSynth.Synthesis;
using NAudio.Utils;
using NAudio.Wave;

namespace AlphaSynth.NAudio
{
    class SynthWaveProvider : IWaveProvider
    {
        public volatile object LockObj = new object();

        private readonly Synthesizer _synth;
        private readonly MidiFileSequencer _sequencer;

        private readonly CircularBuffer _circularBuffer;
        private readonly byte[] _synthBuffer;

        public WaveFormat WaveFormat { get; private set; }

        public Synthesizer Synth
        {
            get { return _synth; }
        }

        public MidiFileSequencer Sequencer
        {
            get { return _sequencer; }
        }

        public SynthWaveProvider(Synthesizer synth, MidiFileSequencer sequencer)
        {
            _synth = synth;
            _sequencer = sequencer;
            WaveFormat = new WaveFormat(synth.SampleRate, 16, synth.AudioChannels);
            int bufferSize = (int)System.Math.Ceiling((2.0 * WaveFormat.AverageBytesPerSecond) / synth.RawBufferSize) * synth.RawBufferSize;
            Console.WriteLine(WaveFormat.AverageBytesPerSecond);
            _circularBuffer = new CircularBuffer(bufferSize);
            _synthBuffer = new byte[synth.RawBufferSize];
            sequencer.AddFinishedListener(OnFinished);
        }

        public int Read(byte[] buffer, int offset, int count)
        {
            while (_circularBuffer.Count < count)
            {
                lock (LockObj)
                {
                    _sequencer.FillMidiEventQueue();
                    _synth.GetNext(_synthBuffer);
                    _circularBuffer.Write(_synthBuffer, 0, _synthBuffer.Length);
                }
            }
            OnTimeUpdated();
            return _circularBuffer.Read(buffer, offset, count);
        }

        public event EventHandler Finished;

        protected virtual void OnFinished()
        {
            EventHandler handler = Finished;
            if (handler != null) handler(this, EventArgs.Empty);
        }

        public event EventHandler TimeUpdated;

        protected virtual void OnTimeUpdated()
        {
            EventHandler handler = TimeUpdated;
            if (handler != null) handler(this, EventArgs.Empty);
        }
    }
}
