package alphaSynth;

import alphaSynth.midi.ShortMessage;

/**
 * This class handles a list of voices and their playing state. 
 */
class VoiceAllocator 
{
	private var _triggeredVoices:Array<Voice>;
	private var _releasedVoices:Array<Voice>;
	
	private var _delayedNoteOffMessages:Array<ShortMessage>;
	private var _messageQueue:Array<ShortMessage>;
	
	private var _substainEnabled:Bool;
	private var _tracker:NoteTracker;
	
	/**
	 * Initializes a new instance of the VoiceAllocator class. 
	 * @param voices the voices to handle
	 */
	public function new(voices:Array<Voice>)
	{
		_releasedVoices = new Array<Voice>().concat(voices);
		_triggeredVoices = new Array<Voice>();
		_delayedNoteOffMessages = new Array<ShortMessage>();
		_messageQueue = new Array<ShortMessage>();
		_tracker = new NoteTracker();
	}
	
	/**
	 * Processes the specified message
	 * @param message the message to handle. 
	 */
	public function allocate(message:ShortMessage) : Void
	{
		_messageQueue.push(message); // enqueue
		processMessages();
	}
	
	/**
	 * Processes all messages which should get handled. 
	 */
	private function processMessages() : Void
	{
		while(_messageQueue.length > 0)
		{
			// dequeue
			processMessage(_messageQueue.shift());
		}
	}
	
	/**
	 * Processes the specified message.
	 * @param message the message to handle. 
	 */
	private function processMessage(message:ShortMessage) : Void
	{
		// send note on or off depending on message.
		if(message.getCommand() == ShortMessage.NOTE_ON)
		{
			if(message.getData2() > 0)
			{
				processNoteOnMessage(message);
			}
			else
			{
				processNoteOffMessage(message);
			}
		}
		else if(message.getCommand() == ShortMessage.NOTE_OFF)
		{
			processNoteOffMessage(message);
		}
	}
	
	/**
	 * Processes a NoteOff message
	 * @param message the note off message
	 */
	private function processNoteOffMessage(message:ShortMessage)
	{
		var velocity:Float = message.getData2();
		velocity /= ShortMessage.DATA_MAX_VALUE;
		
		// keep it back on substain
		if(_substainEnabled)
		{
			_delayedNoteOffMessages.push(message);
		}
		else
		{
			// notify tracker
			_tracker.noteOff(message);
			
			// find the triggered voice according to the message data
			var index:Int = -1;
			for(i in 0 ... _triggeredVoices.length)
			{
				if(_triggeredVoices[i].getCurrentNote() == message.getData1())
				{
					index = i;
					break;
				}
			}
			
			// release the voice
			if(index >= 0)
			{
				var voice:Voice = _triggeredVoices[index];
				voice.release(velocity);
				_triggeredVoices.remove(_triggeredVoices[index]);
				_releasedVoices.push(voice);
			}
		}
	}
	
	/**
	 * Processes a NoteOn Message
	 * @param message the note on message
	 */
	private function processNoteOnMessage(message:ShortMessage)
	{
		var velocity:Float = message.getData2();
		velocity /= ShortMessage.DATA_MAX_VALUE;
		
		if(_releasedVoices.length > 0) // try to use a released voice
		{
			var voice:Voice = _releasedVoices[0];
			_releasedVoices.remove(_releasedVoices[0]);
			voice.trigger(_tracker.getLastNote(), message.getData1(), velocity);
			_triggeredVoices.push(voice);
		}
		else if(_triggeredVoices.length > 0) // steal the longest played voice 
		{
			var voice:Voice = _triggeredVoices[0];
			_triggeredVoices.remove(_triggeredVoices[0]);
			voice.trigger(_tracker.getLastNote(), message.getData1(), velocity);
			_triggeredVoices.push(voice);
		}
		// notify tracker
		_tracker.noteOn(message);
	}
	
	/**
	 * Sets the substain state
	 * @param substainEnabled true if the substain should get enabled, otherwise false
	 */
	public function setSubstainEnabled(substainEnabled:Bool) : Void
	{
		if(substainEnabled == _substainEnabled) return;
		_substainEnabled = substainEnabled;
		
		// on substain disable, process all messages
		if(!_substainEnabled)
		{
			for(noteOffMessage in _delayedNoteOffMessages)
			{
				// enqueue
				_messageQueue.push(noteOffMessage);
			}
			_delayedNoteOffMessages = new Array<ShortMessage>();
			processMessages();
		}
	}
	
	/**	
	 * Releases all voices
	 */
	public function allSoundOff()
	{
		_messageQueue = new Array<ShortMessage>();
		_tracker.clear();
		_delayedNoteOffMessages = new Array<ShortMessage>();
		
		for(voice in _triggeredVoices)
		{
			_releasedVoices.push(voice);
		}
		
		_triggeredVoices = new Array<Voice>();
	}
}
