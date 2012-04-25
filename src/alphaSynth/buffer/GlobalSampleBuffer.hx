package alphaSynth.buffer;

/**
 * This buffer stores all samples as float values. 
 */
class GlobalSampleBuffer implements ISynthesizerGlobalBuffer
{
    private var _buffer:IBuffer<Float>;	
    private var _pos:Int;
	
	/**
	 * Initializes a new instance of the GlobalSampleBuffer class.
	 */
	public function new()
	{
		_buffer = PlatformFactory.getSampleBuffer();
		_pos = 0;
	}
	
	/**
	 * Return the sample buffer.
	 */
	public function getSamples() : IBuffer<Float>
	{
		return _buffer;
	}
	
	/**
     * Notifies how many samples will the global buffer will store at the end.
     */
	public function setBufferSize(size:Int) : Void
	{
		_pos = 0;
		_buffer = PlatformFactory.getSampleBuffer(size);
	}
	
	/**
	 * This method is called as the synthesizer has filled a buffer with samples.
	 * Use this method in implementations to write samples into a backstore.
	 * @param buffer the buffer filled with samples 
	 */
	public function writeBuffer(buffer:StereoBuffer) : Void
	{
		var original:Array<IBuffer<Float>> = buffer.getBuffer();
		var i:Int = 0;
		while(i < buffer.getBufferSize())
		{
			_buffer.set(_pos++, original[0].get(i));
			_buffer.set(_pos++, original[1].get(i));
			i++; 
		}
	}
	
	public function finish()
	{
		// Nothing to do
	}
	
}
