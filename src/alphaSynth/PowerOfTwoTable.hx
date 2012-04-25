package alphaSynth;

/**
 * Provides functionality for raising 2 to a power by using lookup tables
 */
class PowerOfTwoTable
{
	/**
	 * The amount of numbers stored in the lookup table. 
	 */
	private static inline var TABLE_SIZE:Int = 4096;
	
	/**
	 * The backstore. 
	 */
	private static var _table:Array<Float> = {
		var table:Array<Float> = new Array<Float>();
		
		var increment:Float = 1.0 / TABLE_SIZE;
		var accumulator:Float = 0;
		
		for(i in 0 ... TABLE_SIZE)
		{
			table.push(Math.pow(2, accumulator));
			accumulator += increment;
		}
		
		table;
	};
	
	/**
	 * Gets the result of 2 raised to the specified power
	 * @param exponent the exponent that specifies the power. 
	 * @return 2 raised to the specified power. 
	 */
	public static function getPower(exponent:Float) : Float
	{
		var result:Float;
		
		if(exponent >= 0)
		{
			var whole:Int = Std.int(exponent);
			var fractional:Float = exponent - whole;
			
			var index = Std.int(TABLE_SIZE * fractional);
			result = _table[index] * (1 << whole);
		}
		else
		{
			var whole:Int = Std.int(-exponent);
			var fractional:Float = -exponent - whole;
			
			var index = Std.int(TABLE_SIZE * fractional);
			result = 1.0 / (_table[index] * (1 << whole));
		}
		return result;
	}
}
