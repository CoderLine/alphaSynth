package alphaSynth;

import alphaSynth.midi.ShortMessage;

/**
 * This class takes care of the currently played notes. 
 */
class NoteTracker 
{
	private var _noteOnMessages:Array<ShortMessage>;
	private var _lastNote:Int;
	
	/**
	 * Initializes a new instance of the NoteTracker class. 
	 */
	public function new()
	{
		_noteOnMessages = new Array<ShortMessage>();
		_lastNote = 69;
	}
	
	/**
	 * Processes a NoteOn message.
	 */
	public function noteOn(message:ShortMessage)
	{
		// ignore other messages than noteOn
		if(message.getCommand() != ShortMessage.NOTE_ON ||
			(message.getCommand() == ShortMessage.NOTE_ON && message.getData2() == 0))
		{
			// throw "not a note on message";
			return;
		}
		
		_noteOnMessages.push(message);
		_lastNote = message.getData1();
	}
	
	/**
	 * Processes a NoteOff message.
	 */
	public function noteOff(message:ShortMessage)
	{
		// check if a correct message
		if(message.getCommand() != ShortMessage.NOTE_OFF)
		{
			if(message.getCommand() != ShortMessage.NOTE_ON)
			{
				if(message.getData2() > 0)
				{
					// throw "not a note off message"
					return;
				}
			}
			else
			{
				// throw "not a note off message"
				return;				
			}
		}
		
		// find the index of the note within the storage
		var index:Int = -1;
		for(i in 0 ... _noteOnMessages.length)
		{
			if(_noteOnMessages[i].getChannel() == message.getChannel() && _noteOnMessages[i].getData1() == message.getData1())
			{
				index = i;
				break;
			}
		}
		
		// remove the played note index
		if(index >= 0)
		{
			_noteOnMessages.remove(_noteOnMessages[index]);
			if(_noteOnMessages.length > 0)
			{
				_lastNote = _noteOnMessages[_noteOnMessages.length - 1].getData1();
			}
		}
	}
	
	/**
	 * Clears all played notes.
	 */
	public function clear()
	{
		_noteOnMessages = new Array<ShortMessage>();
	}
	
	/**
	 * The count of played notes. 
	 */
	public function size()
	{
		return _noteOnMessages.length;
	}
	
	/**
	 * Gets the last played note. 
	 */
	public function getLastNote()
	{
		return _lastNote;
	}
}
