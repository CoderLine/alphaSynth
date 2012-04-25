package alphaSynth.midi;

/**
 * A midi event is a midi message sent on a specific tick position. 
 */
class MidiEvent 
{
	private var _message:MidiMessage;
	private var _tick:Int;
	
	/**
	 * Initializes a new instance of the MidiEvent class.
	 * @param message the midi message 
	 * @param tick the tick position of this event
	 */
	public function new(message:MidiMessage, tick:Int)
	{
		_message = message;
		_tick = tick;
	}
	
	/**
	 * Gets the midi message stored in this event. 
	 */
	public function getMessage() : MidiMessage
	{
		return _message;
	}
	
	/**	
	 * Gets the tick position of this event. 
	 */
	public function getTick() : Int
	{
		return _tick;
	}
	
	/**
	 * Sets the tick position of this event. 
	 * Use this method before adding to a midi track otherwise the 
	 * midi event is positioned wrong within the midi track.
	 */
	public function setTick(tick:Int) : Void
	{
		_tick = tick;
	}
}
