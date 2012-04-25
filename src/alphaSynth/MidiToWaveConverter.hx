package alphaSynth;

import haxe.io.Bytes;

import alphaSynth.midi.MidiEvent;
import alphaSynth.midi.MidiSequence;
import alphaSynth.midi.MidiMessage;
import alphaSynth.midi.MidiTrack;
import alphaSynth.midi.MetaMessage;

import alphaSynth.buffer.StereoBuffer;
import alphaSynth.buffer.GlobalSampleBuffer;
import alphaSynth.buffer.WaveFileGlobalBuffer;

import alphaSynth.ecomponent.EffectComponent;

import alphaSynth.simple.SimpleVoice;

import alphaSynth.wave.WaveFile;

/**
 * This utility class allows easy using of the synthesizer in order to convert
 * a midi file to wave samples
 */
class MidiToWaveConverter extends StatusReporter
{
	private var _synthesizer:Synthesizer;
	
	/**
	 * Initializes a new instance of the MidiToWaveConverter class. 
	 */
	public function new()
	{		
		super();
		var voiceFactory = function(sr:SampleRate, buffer:StereoBuffer) : Voice
		{
			return new SimpleVoice(sr, buffer);
		};
		
		var effectFactory = function(sr:SampleRate, buffer:StereoBuffer) : Array<EffectComponent>
		{
			return [];
		};
		
		_synthesizer = new Synthesizer(Synthesizer.DEFAULT_BUFFER_SIZE, 48000,
										16, 16, voiceFactory, effectFactory);
		_synthesizer.addProgressUpdatedHandler(handleSynthesizerUpdated);
	}
	
	/**
	 * Gets the samples per second used to synthesize.
	 */
	public function getSampleRate() : Int
	{
		return _synthesizer.getSampleRate().getSamplesPerSecond();
	}
	
	/**
	 * Sets the samples per second used to synthesize.
	 */
	public function setSampleRate(sampleRate:Int) : Void
	{
		return _synthesizer.getSampleRate().setSamplesPerSecond(sampleRate);
	}
	
	/**
	 * Starts the converting of the specified midi sequence and returns the complete samples
	 * @param sequence the midi sequence to convert to samples
	 * @return the generated float samples
	 */
	public function synthesizeToSamples(sequence:MidiSequence) : IBuffer<Float>
	{
		var buffer:GlobalSampleBuffer = new GlobalSampleBuffer();
		_synthesizer.setGlobalBuffer(buffer);
		send(sequence);
		_synthesizer.generate();
		return buffer.getSamples();
	}
	
	/**
	 * Starts the converting of the specified midi sequence and returns the wave file as data uri
	 * @param sequence the midi sequence to convert to samples
	 * @return a string containing the generated samples packed into a data uri 
	 */
    public function synthesizeToDataUri(sequence:MidiSequence) : String
	{
		var buffer:WaveFileGlobalBuffer = new WaveFileGlobalBuffer(_synthesizer.getSampleRate().getSamplesPerSecond());
		_synthesizer.setGlobalBuffer(buffer);
		send(sequence);
		_synthesizer.generate();
		return buffer.getDataUri();
	}
	
	/**
	 * Sends all messages in correct order and with correct timespans to the synthesizer
	 * @param sequence the sequence to send. 
	 */
	private function send(sequence:MidiSequence) : Void
	{
		// a list of all tracks
		var tracks:Array<MidiTrack> = sequence.getTracks();
		
		// the positions on all tracks (event count)
		var trackspos:Array<Int> = new Array<Int>();
		for(i in 0 ... tracks.length) trackspos.push(0);
		
		// current beats per minute
		var bpm:Int = 120;
		// ticks per beat defined by the sequence
		var ticksPerBeat:Int = sequence.getDivision();
		// the last tick to calculate the diff
		var lastTick:Int = 0; 
		// global current tick time
		var curTime:Int = 0;
		
		while(true)
		{
			// find the next message on all tracks. 
			var selevent:MidiEvent = null;
			var seltrack:Int = -1;
			for(i in 0 ... tracks.length)
			{
				var trackpos:Int = trackspos[i];
				var track:MidiTrack = tracks[i];
				if(trackpos < track.size())
				{
					var evt:MidiEvent = track.get(trackpos);
					if(selevent == null || evt.getTick() < selevent.getTick())
					{
						selevent = evt;
						seltrack = i;
					}
				}
			}
			
			// if no track was found we are done
			if(seltrack == -1)
				break;
				
			// update position 
			trackspos[seltrack]++;
			
			// get tick of event
			var tick:Int = selevent.getTick();
			
			// TODO: Mention midi speed for calculation here
			
			// determine how many ticks we have done since last event
			var ticksToNextEvent:Int = tick - lastTick;
			var beatsToNextEvent:Float = (ticksToNextEvent/1.0)/ticksPerBeat;
			
			// calculate the diff according to the current bpm
			var secondsToNextEvent = (beatsToNextEvent/(bpm/60.0));
			var microsecondsToNextEvent:Int = Std.int(secondsToNextEvent*1000000);
			curTime += microsecondsToNextEvent;
			lastTick = tick;
			
			// process the message
			var msg:MidiMessage = selevent.getMessage();
			if(Std.is(msg, MetaMessage))
			{
				var mms:MetaMessage = cast msg;
				if(mms.getType() == 0x51)
				{
					var data:Bytes = mms.getData();
					bpm = Std.int(60000000 / (((data.get(0) & 0xFF) << 16)
                              | ((data.get(1) & 0xFF) << 8) | (data.get(2) & 0xFF)));
				}
			}
			else
			{
				_synthesizer.processMessage(curTime, msg);
			}
		}
	}
	
	/**
	 * Starts the converting of the specified midi sequence and returns the complete samples
	 * @param sequence the midi sequence to convert to samples
	 * @param statusListener a listener which get notified on updated
	 * @return the generated float samples
	 */
	public static function convertToSamples(sequence:MidiSequence, statusListener:SynthesizerStatus->Void = null) : IBuffer<Float>
	{
		var converter:MidiToWaveConverter = new MidiToWaveConverter();
		converter.addProgressUpdatedHandler(statusListener);
		return converter.synthesizeToSamples(sequence);
	}
	 
	/**
	 * Starts the converting of the specified midi sequence and returns the wave file as data uri
	 * @param sequence the midi sequence to convert to samples
	 * @param statusListener a listener which get notified on updated
	 * @return a string containing the generated samples packed into a data uri 
	 */
    public static function convertToDataUri(sequence:MidiSequence, statusListener:SynthesizerStatus->Void = null) : String
	{
		var converter:MidiToWaveConverter = new MidiToWaveConverter();
		converter.addProgressUpdatedHandler(statusListener);
		return converter.synthesizeToDataUri(sequence);
	}
	
	/**
	 * Handles the update event 
	 */
	private function handleSynthesizerUpdated(status:SynthesizerStatus) : Void
	{
		onProgressUpdated2(status); 
	}
}
