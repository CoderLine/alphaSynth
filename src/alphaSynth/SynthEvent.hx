package alphaSynth;

import alphaSynth.midi.MidiMessage;

/**
 * Represents a midi event which is sent on a millisecond time. 
 */
class SynthEvent 
{
	private var _time:Int;
	private var _message:MidiMessage;
	
	/**
	 * Initializes a new instance of the SynthEvent Class
	 * @param time the millisecond time of this event
	 * @param message the message to send on the specified time
	 */
	public function new(time:Int, message:MidiMessage)
	{
		_time = time;
		_message = message;
	}
	
	/**
	 * Gets the millisecond time when to send the message
	 */
	public function getTime()
	{
		return _time;
	}
	
	/**
	 * Gets the message to send on the specified time. 
	 */
	public function getMessage() : MidiMessage
	{
		return _message;
	}
	
	/**
	 * This comparer compares two SynthEvents according to their time. 
	 */
	public static function compare(a:SynthEvent, b:SynthEvent) : Int
	{
		if(a.getTime() > b.getTime())
			return 1;
		if(a.getTime() < b.getTime())
			return -1;
		return 0;
	}
}
