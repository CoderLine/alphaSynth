package alphaSynth.scomponent;

import alphaSynth.buffer.StereoBuffer;

/**
 * Represents a synthesizer component with stereo output
 */
class StereoSynthComponent extends SynthComponent
{
	private var _buffer:StereoBuffer;
	
	/**
	 * Initializes a new instance of the StereoSynthComponent class
	 * @param sampleRate the sample rate to determine the samples per second. 
	 * @param buffer the buffer 
	 */
	private function new(sampleRate:SampleRate, buffer:StereoBuffer)
	{
		super(sampleRate);
		_buffer = buffer;
	}
	
	/**
	 * Gets the buffer for storing samples. 
	 */
	public function getBuffer() : Array<IBuffer<Float>>
	{
		return _buffer.getBuffer();
	}
	
	/**
	 * Gets the buffer size (amount of samples per channel). 
	 */
	public override function getBufferSize() : Int
	{
		return _buffer.getBufferSize();
	}
	
	/**
	 * Sets the buffer size (amount of samples per channel). 
	 */
	public override function setBufferSize(bufferSize:Int) : Void
	{
		_buffer.setBufferSize(bufferSize);
	}
}
