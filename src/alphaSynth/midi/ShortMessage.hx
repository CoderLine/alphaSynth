package alphaSynth.midi;

import haxe.io.Bytes;

/**
 * Represents a short message. 
 */
class ShortMessage extends MidiMessage
{
	public static inline var DATA_MAX_VALUE = 127;
	
	// Commands
	public static inline var SYSTEM_RESET = 0xFF;
	public static inline var NOTE_OFF = 0x80; 
	public static inline var NOTE_ON = 0x90;
	public static inline var CONTROL_CHANGE = 0xB0;
	public static inline var PROGRAM_CHANGE = 0xC0;
	public static inline var PITCH_BEND = 0xE0;
	
	// Control changes
	public static inline var HOLD_PEDAL1 = 0x40;
	public static inline var ALL_SOUND_OFF = 0x78;
	
	/**
	 * Initializes a new instance of the ShortMessage class. 
	 */
	public function new()
	{
		super();
	}
	
	/**
	 * Gets the channel according to the short message
	 */
	public function getChannel() : Int
	{
		return getStatus() & 0x0F;
	}
	
	/**
	 * Gets the command of this message
	 */
	public function getCommand()
	{
		return getStatus() & 0xF0;
	}
	
	/**
	 * Gets the first data byte of this message
	 * @return the first data byte if available, otherwise zero
	 */
	public function getData1()
	{
		return (getLength() > 1) ? (getInternalData().get(1) & 0xFF) : 0;
	}
	
	/**
	 * Gets the second data byte of this message
	 * @return the second data byte if available, otherwise zero
	 */
	public function getData2()
	{
		return (getLength() > 2) ? (getInternalData().get(2) & 0xFF) : 0;
	}
	
	/**
	 * Sets the short message data.
	 * @param status the status byte
	 * @param data1 the first data base
	 * @param data2 the second data base
	 */
	public function setShortMessage(status:Int, data1:Int = -1, data2:Int = -1)
	{
		// determine how many data bytes are available for the current status 
		var dataLength:Int = getDataLength(status);
		var completeLength:Int = dataLength + 1;
		
		if(getInternalData() == null || getInternalData().length < completeLength)
		{
			setInternalData(Bytes.alloc(completeLength));
		}
		
		// set status
		getInternalData().set(0, (status & 0xFF));
		// write data 1
		if(getLength() > 1)
		{
			getInternalData().set(1, (data1 & 0xFF));
			// write data 2
			if(getLength() > 2)
			{
				getInternalData().set(2, (data2 & 0xFF));
			}
		}
	}
	
	/**
	 * Gets the amount of data bytes which are used for the specified status byte
	 */
	private static function getDataLength(status:Int) : Int
	{
		switch(status)
		{
			case 0xF6, 0xF7, 0xF8, 0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE, 0xFF:
				return 0;
			case 0xF1, 0xF3:
				return 1;
			case 0xF2:
				return 2; 
		}
		
		switch(status & 0xF0)
		{
			case 0x80, 0x90, 0xA0, 0xB0, 0xE0:
				return 2;
			case 0xC0, 0xD0:
				return 1;
			default: 
				throw "invalid status byte: " + Std.string(status);
		}
		
		return 0;
	}
	
}
