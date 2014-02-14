using System;
using @as.sequencer;
using @as.synthesis;
using haxe.io;
using haxe.lang;
using NAudio.Utils;
using NAudio.Wave;

namespace AlphaSynth.NAudio
{
    class ActionFunction : Function
    {
        private readonly Action _action;

        public ActionFunction(Action action)
            : base(0, 0)
        {
            _action = action;
        }

        public override object __hx_invoke0_o()
        {
            _action();
            return null;
        }
    }

    class SynthWaveProvider : IWaveProvider
    {
        public volatile object LockObj = new object();

        private readonly Synthesizer _synth;
        private readonly MidiFileSequencer _sequencer;

        private readonly CircularBuffer _circularBuffer;
        private readonly byte[] _synthBuffer;
        private readonly Bytes _synthBufferWrapper;

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
            WaveFormat = new WaveFormat(synth.sampleRate, 16, synth.audioChannels);
            int bufferSize = (int)System.Math.Ceiling((2.0 * WaveFormat.AverageBytesPerSecond) / synth.get_rawBufferSize()) * synth.get_rawBufferSize();
            Console.WriteLine(WaveFormat.AverageBytesPerSecond);
            _circularBuffer = new CircularBuffer(bufferSize);
            _synthBuffer = new byte[synth.get_rawBufferSize()];
            _synthBufferWrapper = new Bytes(_synthBuffer.Length, _synthBuffer);
            sequencer.addFinishedListener(new ActionFunction(OnFinished));
        }

        public int Read(byte[] buffer, int offset, int count)
        {
            while (_circularBuffer.Count < count)
            {
                lock (LockObj)
                {
                    _sequencer.fillMidiEventQueue();
                    _synth.getNext(_synthBufferWrapper);
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
