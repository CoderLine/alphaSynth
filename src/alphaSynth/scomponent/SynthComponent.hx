package alphaSynth.scomponent;

/**
 * The base class for all synthesizer components.
 */
class SynthComponent extends Component
{
	/**
	 * The total number of notes. 
	 */
	public static inline var NoteCount:Int = 128;
	
	/**
	 * The number of notes per octave.
	 */
	public static inline var NotesPerOctave:Int = 12;
	
	/**
	 * The note number for the frequency 440Hz
	 */
	public static inline var A440NoteNumber:Int = 69;
	
	/**
	 * The Frequency for the note A above the middle C
	 */
	public static inline var A440Frequency:Int = 440;
	
	/**
	 * The note number for the middle C
	 */
	public static inline var MiddleCNoteNumber:Int = 60;
	
	/**
	 * For scaling generic parameter values. 
	 */
	private static inline var ParameterScaler:Int = 127;
	
	private var _ordinalChanged:Array<Void->Void>;
	
	/**	
	 * Initializes a new instance of the SynthComponent class.
	 * @param sampleRate the sample rate to determine the samples per second. 
	 */
	private function new(sampleRate:SampleRate)
	{
		super(sampleRate);
		_ordinalChanged = new Array<Void->Void>();
	}
	
	/**
	 * Synthesizes the SynthComponents's output into its buffer using
	 * the specified offset and count values to determine where
	 * in the buffer the ouput is placed.
	 * @param offset the zero-based index offset into the SynthComponent's buffer
	 * in which to begin synthesizing output
	 * @param count the number of samples to synthesize
	 */
	public function generate(offset:Int, sampleCount:Int) : Void
	{
		throw "abstract method not implemented";
	}
	
	/**
	 * Triggeres the SynthComponent with the specified note.
	 * @param previousNotte the note that was previously played
	 * @param note the note that is triggering the synthcomponent
	 * @param velocity the velocity with which the note was played. 
	 */
	public function trigger(previousNote:Int, note:Int, velocity:Float) : Void
	{
		throw "abstract method not implemented";
	}
	
	/**	
	 * Releases the currently triggered note.
	 * @param velocity The velocity with which the note was released.
	 */
	public function release(velocity:Float) : Void
	{
		throw "abstract method not implemented";
	}
	
	/**
	 * Gets the SynthComponent's ordinal value.
	 */
	public function getOrdinal() : Int
	{
		throw "abstract method not implemented";
		return 0;
	}
	
	/**
	 * Gets the SynthComponent's buffer size
	 */
	public function getBufferSize() : Int
	{
		throw "abstract method not implemented";
		return 0;
	}
	
	/**
	 * Sets the SynthComponent's buffer size
	 */
	public function setBufferSize(bufferSize:Int) : Void
	{
		throw "abstract method not implemented";
	}
	
	/**
	 * Gets a value indicating whether the SynthComponent should
	 * synthesize its output in-place or sum its output with the values
	 * already in its buffer.
	 */
	public function getSynthesizeReplaceEnabled() : Bool
	{
		throw "abstract method not implemented";
		return false;
	}
	
	/**
	 * Sets a value indicating whether the SynthComponent should
	 * synthesize its output in-place or sum its output with the values
	 * already in its buffer.
	 */
	public function setSynthesizeReplaceEnabled(synthesizeReplaceEnabled:Bool) : Void
	{
		throw "abstract method not implemented";
	}
	
	
	/**
	 * Raises the ordinalChanged event.
	 */
	private function onOrdinalChanged()
	{
		for(handler in _ordinalChanged)
		{
			handler();
		}
	}
	
	/**
	 * Adds a new handler to the OrdinalChanged Event. 
	 * Called when the ordinal value changes. 
	 */
	public function addOrdinalChangedHandler(handler:Void->Void)
	{
		_ordinalChanged.push(handler);
	}
	
	/**
	 * Removes a new handler from the OrdinalChanged Event. 
	 * Called when the ordinal value changes. 
	 */
	public function removeOrdinalChangedHandler(handler:Void->Void)
	{
		_ordinalChanged.remove(handler);
	}
	
	/**
	 * A comparer which allows the SynthComponent sorting according to their ordinal values. 
	 */
	public static function comparer(a:SynthComponent, b:SynthComponent) : Int
	{
		if(a.getOrdinal() > b.getOrdinal())
			return 1;
		if(a.getOrdinal() < b.getOrdinal())
			return -1;
		return 0;
	}
	
}
