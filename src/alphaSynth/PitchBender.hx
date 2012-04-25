package alphaSynth;

/**
 * This class handles pitch bend messages for a list of voices. 
 */
class PitchBender 
{
	/**
	 * Pitch bend center value
	 */
	private static inline var CENTER:Int = 8192;
	
	/**
	 * Pitch end range maximum value
	 */
	public static inline var RANGE_MAX_VALUE:Float = 12.0;
	
	private var _pitchBendRange:Int;
	private var _voices:Array<Voice>;
	
	/**
	 * Initializes a new instance of the PitchBender class.
	 * @param voice the list of voices to handle. 
	 */
	public function new(voice:Array<Voice>)
	{
		_pitchBendRange = 2;
		_voices = voice;
	}
	
	/**
	 * Takes ptich bend message data, converts it to a floating point number
	 * int the range of [-1, 1] and sends it to the voice collection. 
	 * @param data1 the first data byte of the pitch bend message
	 * @param data2 the second data byte of the pitch bend message
	 */
	public function bendPitch(data1:Int, data2:Int) : Void
	{
		var pitchBendModulation:Float = data1 | (data2 << 7);
		
		pitchBendModulation -= CENTER;
		pitchBendModulation /= CENTER;
		pitchBendModulation *= _pitchBendRange / RANGE_MAX_VALUE;
		
		for(voice in _voices)
		{
			voice.setPitchBendModulation(pitchBendModulation);
		}
	}
}
