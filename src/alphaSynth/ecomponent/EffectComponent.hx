package alphaSynth.ecomponent;

import alphaSynth.buffer.StereoBuffer;

/**
 * A factory providing a list of effect components which are used by a channel. 
 */
typedef EffectFactory = SampleRate->StereoBuffer->Array<EffectComponent>;

/**
 * The base class for implementing effects which can be applied to samples. 
 * i.e. chorus, echo. 
 */
class EffectComponent extends Component
{
	private var _buffer:StereoBuffer;
	
	/**
	 * Initializes a new instance of the EffectComponent class. 
	 * @param sampleRate the sampleRate to use for effect processing
	 * @param buffer the buffer containing the samples on which the effect is applied. 
	 */
	private function new(sampleRate:SampleRate, buffer:StereoBuffer)
	{
		super(sampleRate);
		_buffer = buffer;
	}
	
	/**
	 * Gets the buffer containing the samples on which the effect should get applied. 
	 */
	public function getBuffer() : StereoBuffer
	{
		return _buffer;
	}
	
	/**
	 * Tells the effect component to apply the effect to the current buffer. 
	 */
	public function process() : Void
	{
		throw "abstract method not implemented";
	}
	
	/**
	 * Tells the effect component to reset all it's data for the a new set of samples. 
	 */	
	public function reset() : Void
	{
		throw "abstract method not implemented";
	}
}
