using System;
using System.IO;
using System.Windows.Forms;
using @as.bank;
using @as.midi;
using @as.sequencer;
using @as.synthesis;
using haxe.io;
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
            cs.Boot.init();

            //
            // Midi
            Console.WriteLine("Opening Midi");
            OpenFileDialog dlg = new OpenFileDialog {Filter = "Midi Files (*.mid)|*.mid;*.midi"};
            if (dlg.ShowDialog() != DialogResult.OK)
            {
                return;
            }

            MidiFile file;
            try
            {
                byte[] data = File.ReadAllBytes(dlg.FileName);
                BytesInput input = new BytesInput { b = data, len = data.Length };
                file = new MidiFile();
                file.load(input);
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
                byte[] data = File.ReadAllBytes(dlg.FileName);
                BytesInput input = new BytesInput { b = data, len = data.Length };

                bank = new PatchBank();
                bank.loadSf2(input);
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
                seq.setMute(1, true);
                directSoundOut = new DirectSoundOut(100);
                SynthWaveProvider provider = new SynthWaveProvider(synth, seq);
                provider.TimeUpdated += (s, e) =>
                {
                    Console.CursorTop--;
                    Console.Write("".PadLeft(Console.BufferWidth - 1, ' '));
                    Console.CursorLeft = 0;
                    Console.WriteLine("{0:mm\\:ss\\:fff} of {1:mm\\:ss\\:fff} (Tempo {2})",
                        TimeSpan.FromSeconds(SynthHelper.timeFromSamples(provider.Synth.sampleRate,
                            provider.Sequencer.currentTime)),
                        TimeSpan.FromSeconds(SynthHelper.timeFromSamples(provider.Synth.sampleRate,
                            provider.Sequencer.endTime)),
                        provider.Sequencer.currentTempo);
                };
                provider.Finished += (s, e) => directSoundOut.Stop();
                directSoundOut.Init(provider);


                seq.loadMidi(file);
                synth.loadBank(bank);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return;
            }

            //
            // Play
            Console.WriteLine("Start playing");
            seq.play();
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
            seq.stop();
            synth.noteOffAll(true);
            synth.resetSynthControls();
            synth.resetPrograms();
            directSoundOut.Stop();
            directSoundOut.Dispose();
            synth.unloadBank();
            seq.unloadMidi();
        }
    }
}
