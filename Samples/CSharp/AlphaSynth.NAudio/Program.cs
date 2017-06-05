using System;
using System.IO;
using System.Windows.Forms;
using AlphaSynth.Synthesis;
using Timer = System.Timers.Timer;

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

            byte[] midiData;
            try
            {
                midiData = File.ReadAllBytes(dlg.FileName);
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

            byte[] sf2Data;
            try
            {
                sf2Data = File.ReadAllBytes(dlg.FileName);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return;
            }

            //
            // Creating Synth
            Platform.Platform.OutputFactory = () => new NAudioSynthOutput();
            AlphaSynth player;
            try
            {
                Console.WriteLine("Setup audio");
                player = new AlphaSynth();
                player.LoadMidi(midiData);
                player.LoadSoundFont(sf2Data);
                player.PositionChanged += (sender, args) =>
                {
                    TimeSpan currentTime = TimeSpan.FromMilliseconds(args.CurrentTime);
                    TimeSpan endTime = TimeSpan.FromMilliseconds(args.EndTime);

                    Console.CursorTop--;
                    Console.Write("".PadLeft(Console.BufferWidth - 1, ' '));
                    Console.CursorLeft = 0;
                    Console.WriteLine("{0:mm\\:ss\\:fff} ({1}) of {2:mm\\:ss\\:fff} ({3})",
                        currentTime, args.CurrentTick, endTime, args.EndTick);
                };
                player.Finished += isLooping =>
                {
                    ((NAudioSynthOutput) player.Output).Close();
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return;
            }

            //
            // Play
            Console.WriteLine("Start playing");
            player.Play();

            Console.WriteLine("Press enter to exit");
            while (player.State == PlayerState.Playing)
            {
                try
                {
                    Reader.ReadLine(5000);
                    player.Pause();
                }
                catch (Exception)
                {
                }
            }

            // 
            // Cleanup
            player.Pause();

            Console.ReadLine();
        }
    }
}
