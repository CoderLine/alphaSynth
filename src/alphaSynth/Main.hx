package alphaSynth;

import alphaSynth.buffer.ISynthesizerGlobalBuffer;
import alphaSynth.buffer.StereoBuffer;

import alphaSynth.midi.EndOfTrackMessage;
import alphaSynth.midi.MidiMessage;
import alphaSynth.midi.MidiEvent;
import alphaSynth.midi.MidiFileProperties;
import alphaSynth.midi.MidiMessage;
import alphaSynth.midi.MidiTrack;
import alphaSynth.midi.ShortMessage;
import alphaSynth.midi.TrackReader;

import alphaSynth.scomponent.IBendable;
import alphaSynth.scomponent.IControllable;
import alphaSynth.scomponent.SynthComponent;
import alphaSynth.scomponent.StereoSynthComponent;

import alphaSynth.BinaryReader;
import alphaSynth.Channel;
import alphaSynth.Component;
import alphaSynth.FileLoader;
import alphaSynth.MessageDispatcher;
import alphaSynth.PitchBender;
import alphaSynth.PlatformFactory;
import alphaSynth.SampleRate;
import alphaSynth.Voice;

import alphaSynth.MidiToWaveConverter;

import alphaSynth.simple.SimpleVoice;
import alphaSynth.simple.SimpleOscillator;

import alphaSynth.wave.WaveFile;
import alphaSynth.wave.FastBase64;

/**
 * The application main class.
 */
class Main 
{
    /**
     * The application main entry point
     */
	public static function main() 
	{
	   #if flash
	       alphaSynth.as.AsMain.main();
	   #end	
	} 

}
