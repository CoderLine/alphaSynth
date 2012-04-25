package alphaSynth.midi;

import haxe.io.Bytes;

/**
 * Represents a midi meta message. 
 */
class MetaMessage extends MidiMessage
{
	/**
	 * The status byte for meta messages. 
	 */
	public static inline var META = 0xFF;
	
	private var _dataLength:Int;
	
	/**
	 * Initializes a new instance of the MetaMessage class. 
	 */
	public function new()
	{
		super();
	}
	
	/**
	 * Sets the meta message data. 
	 * @param type the type of meta message 
	 * @param data the data bytes for this meta message
	 */
	public function setMetaMessage(type:Int, data:Bytes)
	{
		_dataLength = data.length;
		// set base data for meta message
		setInternalData(Bytes.alloc(2 + _dataLength));
		getInternalData().set(0, META);
		getInternalData().set(1, type);
		// add data to bytes
		if(_dataLength > 0)
		{
			getInternalData().blit(getLength() - _dataLength, data, 0, _dataLength);
		}		
	}
	
	/**
	 * Gets the type of the meta message. 
	 */
	public function getType() : Int
	{
		return (getLength() >= 2) ? (getInternalData().get(1) & 0xFF) : 0;
	}
	
	/**
	 * Gets a copy of the data section for this meta message. 
	 */
	public function getData() : Bytes
	{
		var returnData:Bytes = Bytes.alloc(_dataLength);
		returnData.blit(0, getInternalData(), getLength() - _dataLength, _dataLength);
		return returnData;
	}
}
