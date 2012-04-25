package alphaSynth.buffer;

/**
 * Classes implementing this interface can be used as
 * a global buffer recieving samples 
 */
interface ISynthesizerGlobalBuffer
{
	/**
	 * Notifies how many samples will the global buffer will store at the end.
	 */
	public function setBufferSize(size:Int) : Void;
	
	/**
	 * This method is called as the synthesizer has filled a buffer with samples.
	 * Use this method in implementations to write samples into a backstore.
	 * @param buffer the buffer filled with samples 
	 */
	public function writeBuffer(buffer:StereoBuffer) : Void;
	
	/**
	 * Tells the buffer that the synthesizer has finished synthesizing the song. 
	 */	
	public function finish() : Void;
}
