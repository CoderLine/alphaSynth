package alphaSynth;

import alphaSynth.buffer.StereoBuffer;
import alphaSynth.midi.ShortMessage;

/**
 * A channel represents the handler for a midi channel. 
 * It contains a list of voices which all use the same midi program. 
 */
class Channel 
{
	private var _voices:Array<Voice>;
	private var _dispatcher:MessageDispatcher;
	private var _allocator:VoiceAllocator;
	private var _bender:PitchBender;
	private var _controlProcessor:ControlProcessor;
	
	// TODO: volume, program etc. 
	
	/**
	 * Initializes a new instance of the Channel class.
	 * @param synthesizer the parent synthesizer of this channel
	 * @param factory the factory to use for creating voices
	 * @param voiceCount the amount of voices to create
	 * @param synthBuffer the buffer to use for synthesizing into 
	 */
	public function new(synthesizer:Synthesizer, factory:Voice.VoiceFactory, voiceCount:Int, synthBuffer:StereoBuffer)
	{
		// create voices. 
		_voices = new Array<Voice>();
		for(i in 0 ... voiceCount)
		{
			var v:Voice = factory(synthesizer.getSampleRate(), synthBuffer);
			v.setSynthesizeReplaceEnabled(false);
			_voices.push(v);
		}
		
		_allocator = new VoiceAllocator(_voices);
		_bender = new PitchBender(_voices);
		_controlProcessor = new ControlProcessor(_voices, _allocator);
		_dispatcher = new MessageDispatcher(_allocator, _controlProcessor, _bender);
	}
	
	/**
	 * Tells the voices within this channel to start generating the samples into the current buffer.
	 * @param offset the offset within the buffer to synthesize into
	 * @param count the amount of samples to generate
	 */
	public function generate(offset:Int, count:Int) : Void
	{
		for(voice in _voices)
		{
			voice.generate(offset, count);
		}
	}
	
	/**
	 * Handles the given message for this channel. 
	 */
	public function dispatch(midiMessage:ShortMessage) : Void
	{
		_dispatcher.dispatch(midiMessage);
	}
}
