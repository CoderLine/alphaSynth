package alphaSynth.midi;
import haxe.io.Bytes;

/**
 * Stores a list of ordered MidiEvent objects and a trailing end of track message. 
 */
class MidiTrack 
{
	private var _events:Array<MidiEvent>;
	private var _endOfTrack:MidiEvent;
	
	/**
	 * Initializes a new instance of the MidiTrack class. 
	 */
	public function new()
	{
		_events = new Array<MidiEvent>();
		
		// create the eot message for this track
		var eotMessage = new EndOfTrackMessage();
		_endOfTrack = new MidiEvent(eotMessage, 0);
		_events.push(_endOfTrack);
	}
	
	/**
	 * Gets the midi event at the specified index. 
	 */
	public function get(index:Int) : MidiEvent
	{
		return _events[index];
	}
	
	/**
	 * Gets the count of midi events in this track. 
	 */
	public function size() : Int
	{
		return _events.length;
	}
	
	/**
	 * Gets the length of this track in ticks. 
	 * @return the tick position of the last event within this track. 
	 * if the track is empty zero. 
	 */
	public function getTickLength() : Int
	{
		if(_events.length == 0) return 0;
		return _events[_events.length - 1].getTick();
	}
	
	/**
	 * Adds a new MidiEvent to this track. 
	 * The event gets inserted on the correct position according to the tick position.
	 */
	public function add(midiEvent:MidiEvent) : Void
	{
		// don't allow the adding of new EOT messages, but use the tick position 
		if(EndOfTrackMessage.isEndOfTrackMessage(midiEvent.getMessage()))
		{
			_endOfTrack.setTick(midiEvent.getTick());
		}
		
		// Determine the insert position according to the 
		// tick position. we assume the inserting on the end, 
		// therefore we start searching at the end. 
		var insertPosition:Int = _events.length;
		while(insertPosition > 0)
		{
			var previousEvent:MidiEvent = _events[insertPosition - 1];
			if(midiEvent.getTick() >= previousEvent.getTick())
			{
				break;
			}
			insertPosition--;
		}
		
		// don't allow insertion after EOT event, insert before it and update EOT
		if(insertPosition == _events.length)
		{
			_events.insert(_events.length - 1, midiEvent);
			_endOfTrack.setTick(midiEvent.getTick());
		}
		else
		{
			_events.insert(insertPosition, midiEvent);
		}
	}
	
	/**
	 * Removes the specified MidiEvent from this track. 
	 */
	public function remove(midiEvent:MidiEvent) : Void
	{
		// prevent removing of EOT
		if(_endOfTrack == midiEvent) return;
		_events.remove(midiEvent);
	}
}
