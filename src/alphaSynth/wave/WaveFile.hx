package alphaSynth.wave;

/**
 * This class allows the conversion of raw audio data (float samples) 
 * into wave file byte data. The wave data is encoded into a base64 encoded datauri 
 * immediatly after writing. 
 */
class WaveFile extends StatusReporter
{
	private var _sampleRate:Int;
	private var _data:IBuffer<Int>;
	private var _position:Int;
	
	private var _dataUri:String;
	// stores all data bytes during writing as strings 
	// string concat is a heavy operation therefore we use array.join afterwards
	private var _dataString:Array<String>;
	
	// how many bytes of samples the wavefile will contain
	private var _dataLength:Int;
	private var _sampleCount:Int;
	
	/**
	 * Initializes a new instance of the WaveFile class. 
	 * @param sampleRate the count of samples per second
	 */
	public function new(sampleRate:Int, sampleCount:Int)
	{
		super();
		
		_sampleRate = sampleRate;
		
		// 12 Bytes file header
		// 24 Bytes Chunk 1
		// 8 Bytes Chunk 2 Header
		// 4*sampleCount Bytes sample data
		_position = 0;
		_data = PlatformFactory.getByteBuffer(12 + 24 + 8 + (4*sampleCount));
		
		_dataUri = null;
		_dataString = new Array<String>();
		
		_dataLength = sampleCount * 4;
		_sampleCount = sampleCount;
	}
	
	
	public function writeSampleByte(data:Int) : Void
	{
        writeByte(data);
	}
	
	private function startDataUri()
	{
		// add data uri start
		_dataUri = 'data:audio/wav;base64,';
		writeWaveHeader();
		writeChunk1();
		writeChunk2();		
	}
	
	/**
	 * Returns the dataUri for this wave file. 
	 * Converts the specified sample array into a dataURI containing the wave data.
	 * @param sampleRate the count of samples per second
	 * @param data the audio samples to encode
	 * @return a string containing the data url of the wave data. 
	 */
	public function getDataUri() : String
	{
		if(_dataUri == null)
		{
			var update = onProgressUpdated; // hack for haxe bug
			_dataUri = 'data:audio/wav;base64,' + FastBase64.encode(_data, function(progress) {
				update("Generating Data URI", progress);			
			});
		}
		return _dataUri;
	}
	
	
	/**
	 * Writes a new wave header into the backstore
	 */
	private function writeWaveHeader() : Void
	{
		// 4+4+4 bytes => 12bytes wave header
		
		// RIFF Filesize-8 WAVE
		writeString("RIFF");
		writeInt(36 + _sampleCount);
		writeString("WAVE");
	}
	
	/**
	 * Writes the first chunk which contains the format data
	 */
	private function writeChunk1() : Void
	{
		// 4 + 4 + 2 + 2 + 4 + 4 + 2 + 2 = 24bytes chunk 1 
		
		// format indicator
		writeString("fmt ");
		// 16 - PCM
		writeInt(16);
		// PCM
		writeShort(1);
		// stereo
		writeShort(2);
		// sampleRate
		writeInt(_sampleRate);
		// byteRate = (sampleRate * numChannels * BitsPerSample) >> 3
		writeInt(((_sampleRate * 2 * 16) >> 3));
		// blockAlign = (NumChannels*BitsPerSample) >> 3
		writeShort(((2 * 16) >> 3));
		// bitsPerSample
		writeShort(16);
	}
	
	/**
	 * Write the second chunk which contains the sample data
	 */
	private function writeChunk2() : Void
	{
		// 4 + 4 + (sample*4) = 8 + $databytes bytes
		
		// data indicator
		writeString("data");
		// write data length
		writeInt(_dataLength);
	}	
	
	/**
	 * Parses the specified  into a wave file
	 * @param the string containing the base64 encoded data part
	 */
	public function finish() : Void
	{
		getDataUri();
	}
	
	
	/**
	 * Writes a string into the backstore
	 * @param string the string containing the bytes to write
	 */
	private function writeString(string:String) : Void
	{
		for(i in 0 ... string.length)
		{
			writeByte(string.charCodeAt(i));
		}
	}
	
	/**
	 * Writes an integer into the backstore
	 * @param data the int to write
	 */
	private function writeInt(data:Int) : Void
	{
		writeByte( data );
		writeByte( (data >> 8) );
		writeByte( (data >> 16) );
		writeByte( (data >> 24) );
	}
	
	/**
	 * Writes a short into the backstore
	 * @param data the short to write
	 */
	private function writeShort(data:Int) : Void
	{
		writeByte( data );
		writeByte( (data >> 8) );
	}
	
	/**
	 * Writes a byte into the backstore
	 * @param byte the byte to write
	 */
	private function writeByte(byte:Int) : Void
	{ 
		_data.set(_position, (byte & 0xFF));
		_position++;
	}
}
