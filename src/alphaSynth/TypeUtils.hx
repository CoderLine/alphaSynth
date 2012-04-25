package alphaSynth;

/**
 * This class provides type checking and conversion operations for 
 * unsupported types.  
 */
class TypeUtils 
{
	/**
	 * The max value of an 16 bit signed integer (known as short)
	 */
	public static inline var SHORT_MAX:Int = 32767;
	
	/**
	 * The min value of an 16 bit signed integer (known as short)
	 */
	public static inline var SHORT_MIN:Int = -32768;
	
	/**
	 * Ensures that the specified number is a short. 
	 */
	public static function castToShort(short:Float) : Int
	{
		return Std.int(Math.max(SHORT_MIN, Math.min(SHORT_MAX, short)));
	}
}
