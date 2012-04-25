package alphaSynth.buffer;

import haxe.io.Bytes;

/**
 * This buffer contains a list of stereo audio samples. (left and right channel): 
 * Samples are stored as float values.
 */
class StereoBuffer 
{
	private var _buffer:Array<IBuffer<Float>>;
	private var _amplitude:Float;
	
	private var _bufferSizeChanged:Array<Void->Void>; // event
	
	/**
	 * Initializes a new instance of the StereoBuffer class.
	 * @param bufferSize the amount of samples to store per channel. 
	 */
	public function new(bufferSize:Int)
	{
		_amplitude = 0.25;
		setBufferSize(bufferSize);
		_bufferSizeChanged = new Array<Void->Void>();
	}
	
	/**
	 * Gets the underlying buffer which is used as backstore for all samples. 
	 */
	public function getBuffer() : Array<IBuffer<Float>>
	{
		return _buffer;
	}
	
	/**
	 * Gets the maximum amplitude used for the samples during modulation. 
	 * A sample of value 1 will become amplitude
	 * A sample of value -1 will become -amplitude
	 */
	public function getAmplitude() : Float
	{
		return _amplitude;
	}
	
	/**
	 * Sets the maximum amplitude used for the samples during modulation. 
	 * A sample of value 1 will become amplitude
	 * A sample of value -1 will become -amplitude
	 * @param amplitude the amplitude to use during modulation
	 */
	public function setAmplitude(amplitude:Float) : Void
	{
		_amplitude = amplitude;
	}
	
	/**
	 * Clears the complete buffer and sets all values to 0. 
	 */
	public function clear() : Void
	{
		var bufferSize:Int = getBufferSize();
		_buffer[0] = PlatformFactory.getSampleBuffer(bufferSize);
		_buffer[1] = PlatformFactory.getSampleBuffer(bufferSize);
	}
	
	/**
	 * Modulates the current underlying buffer to use
	 * the specified amplitude.
	 */
	public function modulateAmplitude() : Void
	{
		var bufferSize:Int = getBufferSize();
		for(i in 0 ... bufferSize)
		{
			_buffer[0].set(i, _buffer[0].get(i) * _amplitude);
			_buffer[1].set(i, _buffer[1].get(i) * _amplitude);
		}
	}
	
	/**
	 * Gets the current size of the buffer. 
	 * @return the amount of samples stored within each channel. 
	 */
	public function getBufferSize() : Int
	{
		return _buffer[0].getLength();
	}
	
	/**
	 * Sets the current size of the buffer. The buffer will get cleared.  
	 * @param bufferSize the new amount of samples stored in each channel of this buffer
	 */
	public function setBufferSize(bufferSize:Int) : Void
	{
		_buffer = new Array<IBuffer<Float>>();
		_buffer.push(PlatformFactory.getSampleBuffer(bufferSize));
		_buffer.push(PlatformFactory.getSampleBuffer(bufferSize));
	}
	
	
	/**
	 * Raises the bufferSizeChanged event. 
	 */
	private function onBufferSizeChanged()
	{
		for(handler in _bufferSizeChanged)
		{
			handler();
		}
	}
	
	/**
	 * Adds a new handler which will get notified as the buffer size changes. 
	 */
	public function addBufferSizeChangedHandler(handler:Void->Void)
	{
		_bufferSizeChanged.push(handler);
	}
	
	/**
	 * Removes a handler which should not get notified on buffer size changes anymore.
	 */
	public function removeBufferSizeChangedHandler(handler:Void->Void)
	{
		_bufferSizeChanged.remove(handler);
	}
}
