using System;
using System.IO;
using System.Windows.Forms;
using AlphaSynth.Bank;
using AlphaSynth.IO;
using AlphaSynth.Midi;
using AlphaSynth.Sequencer;
using AlphaSynth.Synthesis;
using NAudio.Wave;

namespace AlphaSynth.NAudio
{
    class Program
    {
        [STAThread]
        public static void Main()
        {
            Console.BufferHeight = 4000;
            Play();
        }

        private static void Play()
        {
            //
            // Midi
            Console.WriteLine("Opening Midi");
            var dlg = new OpenFileDialog { Filter = "Midi Files (*.mid)|*.mid;*.midi" };
            if (dlg.ShowDialog() != DialogResult.OK)
            {
                return;
            }

            MidiFile file;
            try
            {
                var data = File.ReadAllBytes(dlg.FileName);
                var input = ByteBuffer.FromBuffer(data);
                file = new MidiFile();
                file.Load(input);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return;
            }

            //
            // SF2 
            Console.WriteLine("Opening SF2");
            dlg.Filter = "SoundFont 2 Bank (*.sf2)|*.sf2";
            if (dlg.ShowDialog() != DialogResult.OK)
            {
                return;
            }

            PatchBank bank;
            try
            {
                var data = File.ReadAllBytes(dlg.FileName);
                var input = ByteBuffer.FromBuffer(data);

                bank = new PatchBank();
                bank.LoadSf2(input);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return;
            }

            //
            // Creating Synth
            Synthesizer synth;
            MidiFileSequencer seq;
            DirectSoundOut directSoundOut;
            try
            {
                Console.WriteLine("Setup audio");
                synth = new Synthesizer(44100, 2, 441, 3, 100);
                seq = new MidiFileSequencer(synth);
                directSoundOut = new DirectSoundOut(100);
                SynthWaveProvider provider = new SynthWaveProvider(synth, seq);
                provider.TimeUpdated += (s, e) =>
                {
                    Console.CursorTop--;
                    Console.Write("".PadLeft(Console.BufferWidth - 1, ' '));
                    Console.CursorLeft = 0;
                    Console.WriteLine("{0:mm\\:ss\\:fff} of {1:mm\\:ss\\:fff} (Tempo {2})",
                        TimeSpan.FromSeconds(SynthHelper.TimeFromSamples(provider.Synth.SampleRate,
                            provider.Sequencer.CurrentTime)),
                        TimeSpan.FromSeconds(SynthHelper.TimeFromSamples(provider.Synth.SampleRate,
                            provider.Sequencer.EndTime)),
                        provider.Sequencer.CurrentTempo);
                };
                provider.Finished += (s, e) => directSoundOut.Stop();
                directSoundOut.Init(provider);

                seq.LoadMidi(file);
                synth.LoadBank(bank);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return;
            }

            //
            // Play
            Console.WriteLine("Start playing");
            seq.Play();
            directSoundOut.Play();

            Console.WriteLine("Press enter to exit");
            while (directSoundOut.PlaybackState == PlaybackState.Playing)
            {
                try
                {
                    Reader.ReadLine(5000);
                }
                catch (Exception)
                {
                }
            }


            // 
            // Cleanup
            seq.Stop();
            synth.NoteOffAll(true);
            synth.ResetSynthControls();
            synth.ResetPrograms();
            directSoundOut.Stop();
            directSoundOut.Dispose();
            synth.UnloadBank();
            seq.UnloadMidi();
        }
    }
}
