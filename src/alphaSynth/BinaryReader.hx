package alphaSynth;

/**
 * This is a binary file reader.
 * It uses an unencoded (raw 1byte for a character) string to handle binary data. 
 */
class BinaryReader 
{ 
	private var _buffer:String;
	private var _pos:Int;
	
	/**
	 * Initializes a new BinaryReader class. 
	 */ 
	public function new() 
	{
	}
 
	/**
	 * Initializes the reader using the specified string data. 
	 */
	public function initialize(data:String)
	{
		_buffer = data;
		_pos = 0; 
	}
	
	/**
	 * Reads a bool value from the stream. 
	 */
	public function readBool() : Bool
	{ 
		return this.readByte() == 1; 
	}
		
	/**
	 * Reads a byte from the stream. 
	 */
	public function readByte() : Int
	{
        // TODO: Check for EOF
		var data = getByte(_pos);
		this._pos++;
		return data;
	}
	
	/**
	 * Reads a ascii string from the stream. 
	 * @param charCount the amount of characters to read.
	 */
	public function readString(charCount:Int) : String
	{
		var s:String = "";
		for(i in 0 ... charCount)
		{
			s += String.fromCharCode(readByte());
		}
		return s;
	}
	
	/**
	 * Gets the byte at the specific index. 
	 * @param index the zero-based index of the byte 
	 */
	public function getByte(index:Int) : Int
	{
		var data:Int = this._buffer.charCodeAt(index);
		data = data & 0xFF;
		return data;
	}
	
	/**
	 * Reads a 32Bit integer from the stream
	 */
	public function readInt32() : Int
	{
		return (readByte() << 24) | (readByte() << 16) | (readByte() << 8) | readByte();
	}
	
	/**
	 * Reads a 16Bit integer (short) from the stream 
	 */
	public function readInt16() : Int
	{
		return (readByte() << 8) | readByte();
	}
	
	/**
	 * Gets the current position within the stream. 
	 */
	public function getPosition() : Int
	{
		return this._pos;
	}
	
	/**
	 * Gets the size of the stream. 
	 */
	public function size() :Int 
	{
		return this._buffer.length;
	}	
}