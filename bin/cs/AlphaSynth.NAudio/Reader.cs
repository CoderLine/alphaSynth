using System;
using System.Threading;

namespace AlphaSynth.NAudio
{
    class Reader
    {
        private static readonly AutoResetEvent GetInput;
        private static readonly AutoResetEvent GotInput;
        private static string _input;

        static Reader()
        {
            Thread inputThread = new Thread(Run) {IsBackground = true};
            inputThread.Start();
            GetInput = new AutoResetEvent(false);
            GotInput = new AutoResetEvent(false);
        }

        private static void Run()
        {
            while (true)
            {
                GetInput.WaitOne();
                _input = Console.ReadLine();
                GotInput.Set();
            }
        }

        public static string ReadLine(int timeOutMillisecs)
        {
            GetInput.Set();
            bool success = GotInput.WaitOne(timeOutMillisecs);
            if (success)
                return _input;
            throw new TimeoutException("User did not provide input within the timelimit.");
        }
    }
}