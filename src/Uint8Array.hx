#if js
/**
 * A array buffer which stores 8bit unsigned integer (unsigned byte). 
 */
extern class Uint8Array implements ArrayAccess<Int> {
	
	/**
	 * The length of the array. 
	 */
	var length(default, null) : Int;
	
	/**
	 * Initializes a new instance of the Uint8Array class.
	 * @param length the size of the array
	 */
    function new(length:Int = 0) : Void;
}
#end