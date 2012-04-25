package alphaSynth;

import alphaSynth.midi.ShortMessage;

/**
 * This dispatcher ensures that the correct class will receive a midi message. 
 */
class MessageDispatcher 
{
	private var _allocator:VoiceAllocator;
	private var _bender:PitchBender;
	private var _processor:ControlProcessor;
	
	/**
	 * Initializs a new instance of the MessageDispatcher class.
	 * @param allocator the voice allocator responsible for handling note messages
	 * @param processor the control processor responsible for handling control messages
	 * @param bender the pitch bender responsible for handling pitch bend messages
	 */
	public function new(allocator:VoiceAllocator, processor:ControlProcessor, bender:PitchBender)
	{
		_allocator = allocator;
		_bender = bender;
		_processor = processor;
	}
	
	/**
	 * Dispatches the specified message to the correct handler
	 * @param message the message to handle. 
	 */
	public function dispatch(message:ShortMessage) : Void
	{
        if (message.getCommand() == ShortMessage.NOTE_ON || message.getCommand() == ShortMessage.NOTE_OFF)
        {
            _allocator.allocate(message);
        }
        else if (message.getCommand() == ShortMessage.CONTROL_CHANGE)
        {
            _processor.process(message.getData1(), message.getData2());
        }
        else if (message.getCommand() == ShortMessage.PITCH_BEND)
        {
            _bender.bendPitch(message.getData1(), message.getData2());
        }
	}
}
