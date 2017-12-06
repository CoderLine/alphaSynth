﻿using AlphaSynth.Synthesis;
using AlphaSynth.Util;

namespace AlphaSynth
{
    public interface IAlphaSynth
    {
        /// <summary>
        /// Gets or sets whether the synthesizer is ready for interaction. (output and worker are initialized)
        /// </summary>
        bool IsReady
        {
            get;
        }

        /// <summary>
        /// Gets or sets whether the synthesizer is ready for playback. (output, worker are initialized, soundfont and midi are loaded)
        /// </summary>p
        bool IsReadyForPlayback
        {
            get;
        }

        /// <summary>
        /// Gets the current player state.
        /// </summary>
        PlayerState State
        {
            get;
        }

        /// <summary>
        /// Gets or sets the loging level. 
        /// </summary>
        LogLevel LogLevel
        {
            get; set;
        }

        /// <summary>
        /// Gets or sets the current master volume as percentage. (range: 0.0-3.0, default 1.0)
        /// </summary>
        float MasterVolume
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the metronome volume. (range: 0.0-3.0, default 0.0)
        /// </summary>
        float MetronomeVolume
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the current playback speed as percentage. (range: 0.125-8.0, default: 1.0)
        /// </summary>
        double PlaybackSpeed
        {
            get; set;
        }

        /// <summary>
        /// Gets or sets the position within the song in midi ticks.
        /// </summary>
        int TickPosition
        {
            get; set;
        }

        /// <summary>
        /// Gets or sets the position within the song in milliseconds.
        /// </summary>
        double TimePosition
        {
            get; set;
        }

        /// <summary>
        /// Gets or sets the range of the song that should be played. Set this to null
        /// to play the whole song. 
        /// </summary>
        PlaybackRange PlaybackRange
        {
            get; set;
        }

        /// <summary>
        /// Gets or sets whether the playback should automatically restart after it finished. 
        /// </summary>
        bool IsLooping
        {
            get; set;
        }

        /// <summary>
        /// Starts the playback if possible
        /// </summary>  
        void Play();

        /// <summary>
        /// Pauses the playback if was running
        /// </summary>
        void Pause();

        /// <summary>
        /// Starts the playback if possible, pauses the playback if was running
        /// </summary>
        void PlayPause();

        /// <summary>
        /// Stopps the playback
        /// </summary>
        void Stop();

        /// <summary>
        ///Loads a soundfont from the given data
        /// </summary>
        /// <param name="data">a byte array to load the data from </param>
        void LoadSoundFont(byte[] data);

        /// <summary>
        ///Loads a midi from the given data
        /// </summary>
        /// <param name="data">a byte array to load the data from </param>
        void LoadMidi(byte[] data);

        /// <summary>
        /// Gets the mute state of a channel.
        /// </summary>
        /// <param name="channel">The channel number</param>
        /// <param name="mute">true if the channel should be muted, otherwise false.</param>
        void SetChannelMute(int channel, bool mute);

        /// <summary>
        /// Resets the mute/solo state of all channels
        /// </summary>
        void ResetChannelStates();

        /// <summary>
        /// Gets the solo state of a channel.
        /// </summary>
        /// <param name="channel">The channel number</param>
        /// <param name="solo">true if the channel should be played solo, otherwise false.</param>
        void SetChannelSolo(int channel, bool solo);


        /// <summary>
        /// Gets or sets the current and initial volume of the given channel.
        /// </summary>
        /// <param name="channel">The channel number.</param>
        /// <param name="volume">The volume of the channel (0.0-3.0)</param>
        void SetChannelVolume(int channel, double volume);

        /// <summary>
        /// Gets or sets the current and initial pan of the given channel.
        /// </summary>
        /// <param name="channel">The channel number.</param>
        /// <param name="pan">The pan of the channel (from -1.0 to 1.0)</param>
        void SetChannelPan(int channel, double pan);

        /// <summary>
        /// Gets or sets the current and initial program of the given channel.
        /// </summary>
        /// <param name="channel">The channel number.</param>
        /// <param name="program">The midi program.</param>
        void SetChannelProgram(int channel, byte program);
    }
}
