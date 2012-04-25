package alphaSynth.midi;

import haxe.io.Bytes;

/**
 * This is the base class of midi messages. 
 */
class MidiMessage 
{
	// the plain midi data stored
	private var _data:Bytes;
	
	/**
	 * Creates a new instance of the MidiMessage class.
	 */
	private function new()
	{
	}
	
	/**
	 * Gets a copy of the complete midi message data 
	 */
	public function getMessage() : Bytes
	{
		var clone:Bytes = Bytes.alloc(_data.length);
		clone.blit(0, _data, 0, _data.length);
		return clone;
	}
	
	/**
	 * Gets the size of the data stored in this message.
	 */
	public function getLength() : Int
	{
		return _data.length;
	}
	
	/**
	 * Gets the status byte of this message
	 */
	public function getStatus() : Int
	{
		return (_data.length > 0) ? (_data.get(0) & 0xFF) : 0;
	}
	
	/**
	 * Gets real data bytes of this message (no copy).
	 */
	private function getInternalData() : Bytes
	{
		return _data;
	}
	
	/**
	 * Sets the data bytes of this message. (not copied). 
	 */
	private function setInternalData(data:Bytes) : Void
	{
		_data = data;
	}
}