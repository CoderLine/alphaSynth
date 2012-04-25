package alphaSynth.midi;
import haxe.io.Bytes;

/**
 * Represents an end of track message which cannot be changed. 
 */
class EndOfTrackMessage extends MetaMessage
{
	/**
	 * The data byte for indicating end of track messages.
	 */
	public static inline var END_OF_TRACK = 0x2F;
	 
	/**
	 * Creates a new instance of the EndOfTrackMessage class. 
	 */
	public function new()
	{
		super();
		super.setMetaMessage(END_OF_TRACK, Bytes.alloc(1));
	}
	
	/**
	 * Sets the meta message data. 
	 * @param type the type of meta message 
	 * @param data the data bytes for this meta message
	 */
	public override function setMetaMessage(type:Int, data:Bytes)
	{
		throw "not allowed";
	} 
	
	
	/**
	 * Checks if the specified MidiMessage is a end of track message according to 
	 * the data.
	 * @param midiMessage the message to check
	 * @return true if midiMessage is a end of track message, otherwise false.
	 */
	public static function isEndOfTrackMessage(midiMessage:MidiMessage) : Bool
	{
		// check for correct data and status
		if(midiMessage.getLength() != 3 || midiMessage.getStatus() != MetaMessage.META)
		{
			return false;
		}
		
		// Check for bytes
		var msg:Bytes = midiMessage.getMessage();
		return ((msg.get(1) & 0xFF) == END_OF_TRACK) && (msg.get(2) == 0);
	}
}
