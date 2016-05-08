using System;
using System.IO;
using AlphaSynth.IO;
using AlphaSynth.Midi;
using AlphaSynth.Midi.Event;

namespace MidiDumper
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                if (args.Length != 1)
                {
                    Console.WriteLine("Usage: MidiDumper File.mid");
                    return;
                }
                var midiData = ByteBuffer.FromBuffer(File.ReadAllBytes(args[0]));
                var midi = new MidiFile();
                midi.Load(midiData);

                Console.WriteLine("Division: {0}", midi.Division);
                Console.WriteLine("TrackFormat: {0}", midi.TrackFormat);
                Console.WriteLine("TimingStandard: {0}", midi.TimingStandard);
                Console.WriteLine("Tracks: {0}", midi.Tracks.Length);
                Console.WriteLine();

                for (int i = 0; i < midi.Tracks.Length; i++)
                {
                    var midiTrack = midi.Tracks[i];
                    Console.WriteLine("Track {0} ({1} Events)", i, midiTrack.MidiEvents.Length);

                    ulong absoluteTime = 0;
                    for (int j = 0; j < midiTrack.MidiEvents.Length; j++)
                    {
                        var midiEvent = midiTrack.MidiEvents[j];

                        Console.WriteLine(" [{0}] Delta[{1}] Chl[{2}] Cmd[{3}] Data1[{4}] Data2[{5}]", absoluteTime,
                            midiEvent.DeltaTime, midiEvent.Channel, midiEvent.Command, midiEvent.Data1, midiEvent.Data2);

                        absoluteTime += (ulong) midiEvent.DeltaTime;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Failed: {0}", e);
            }
        }
    }
}
