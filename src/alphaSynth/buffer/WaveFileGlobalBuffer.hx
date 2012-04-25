package alphaSynth.buffer;

import alphaSynth.wave.WaveFile;
import alphaSynth.wave.FastBase64;

/**
 * A global buffer which stores samples as a 
 * base64 encoded datauri string
 */
class WaveFileGlobalBuffer implements ISynthesizerGlobalBuffer
{
	private var _wave:WaveFile;
	private var _sampleRate:Int;
	public function getDataUri() : String
	{
		return _wave.getDataUri();
	}
	
	/**
	 * Initializes a new instance of the WaveFileGlobalBuffer class.
	 */
	public function new(sampleRate:Int)
	{
		_sampleRate = sampleRate;
	}
	
	public function setBufferSize(size:Int)
	{
		 // 4 bytes for each sample
		_wave = new WaveFile(_sampleRate, size);
	}
	
	/**
	 * This method is called as the synthesizer has filled a buffer with samples.
	 * Use this method in implementations to write samples into a backstore.
	 * @param buffer the buffer filled with samples 
	 */
	public function writeBuffer(buffer:StereoBuffer) : Void
	{
		var samples:Array<IBuffer<Float>> = buffer.getBuffer();
		
		var sampleData:Int = 0;
		
		for(i in 0 ... buffer.getBufferSize())
		{
			// create bytes 
			var leftSample:Float = samples[0].get(i);
			sampleData = TypeUtils.castToShort(TypeUtils.SHORT_MAX * leftSample);
			_wave.writeSampleByte(sampleData);
			_wave.writeSampleByte((sampleData >> 8));
			
			// write right channel byte
			var rightSample:Float = samples[1].get(i);
			sampleData = TypeUtils.castToShort(TypeUtils.SHORT_MAX * rightSample);
			_wave.writeSampleByte(sampleData);
			_wave.writeSampleByte((sampleData >> 8));
		}
	}
	
	public function finish()
	{
		_wave.finish();
	}
}
