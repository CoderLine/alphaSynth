package alphaSynth.midi;

import haxe.io.Bytes;

/**
 * This class is a container for midi header data. It provides reading of those. 
 */
class MidiFileProperties 
{
	/**
	 * The Magic number indicating the midi file header. 
	 */
	private static inline var FILE_MAGIC:String = "MThd"; 
	
	private var _format:Int;
	private var _trackCount:Int;
	private var _division:Int;
	
	/**
	 * Initializes a new instance of the MidiFileProperties class. 
	 */
	public function new()
	{
		_format = 1;
		_trackCount = 0;
		_division = 24;
	}
	
	/**
	 * Gets the midi file format. (PPQ etc.) 
	 */
	public function getFormat() : Int
	{
		return _format;
	}
	
	/**
	 * Gets the amount of tracks stored in the midi file. 
	 */
	public function getTrackCount() : Int
	{
		return _trackCount;
	}
	
	/**
	 * Gets the division of the file. (ticks per beat)
	 */
	public function getDivision() : Int
	{
		return _division;
	}
	
	/**
	 * Reads the data from the specified stream into the current object. 
	 * @param stream the stream to read from
	 */
	public function read(stream:BinaryReader) : Void
	{
		// read magic number
		var magic:String = stream.readString(4);
		if(magic != FILE_MAGIC)
		{
			throw "invalid midi file: file header not found";	
		}
		
		// read rest of the header
		for(i in 0 ... 4)
			stream.readByte();

		// read data
		_format = stream.readInt16();
		_trackCount = stream.readInt16();
		_division = stream.readInt16();
	}
}
