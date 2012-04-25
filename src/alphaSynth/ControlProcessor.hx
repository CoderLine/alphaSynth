package alphaSynth;

import alphaSynth.midi.ShortMessage;

/**
 * This processor is responsible for processing channel messages for a channel. 
 */
class ControlProcessor 
{
	private var _voices:Array<Voice>;
	private var _allocator:VoiceAllocator;
	
	/**
	 * Initializes a new instance of the ControlProcessor class.
	 * @param voices the voices to handle
	 * @param allocator the allocator managing the played voices. 
	 */
	public function new(voices:Array<Voice>, allocator:VoiceAllocator)
	{
		_voices = voices;
		_allocator = allocator;
	}
	
	/**
	 * Processes the specified control message
	 * @param type the type of control message
	 * @param value the value of the message
	 */
	public function process(type:Int, value:Int) : Void
	{
		if(type == ShortMessage.HOLD_PEDAL1)
		{
			_allocator.setSubstainEnabled(value >= 64);
		}
		else if(type == ShortMessage.ALL_SOUND_OFF)
		{
			_allocator.allSoundOff();
		}
		else
		{
			// delegate process
			var fValue:Float = value;
			fValue /= ShortMessage.DATA_MAX_VALUE;
			for(v in _voices)
			{
				v.processControllerMessage(type, fValue);
			}
		}
	}
}
