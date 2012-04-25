#if js
/**
 * An array which stores 32-bit float values.
 */
extern class Float32Array implements ArrayAccess<Float> {
	
	/**
	 * Gets the length of the array
	 */
	var length(default, null) : Int;
	
	/**
	 * Initializes a new instance of the Float32Array class.
	 * @param length the length
	 */
    function new(length:Int = 0) : Void;
}
#end