package alphaSynth;

/**
 * This factory provides platform specific instances to ensure alphaSynth can 
 * be used on multiple target platforms (javascript, actionscript)
 */
class PlatformFactory 
{
	/**
	 * Returns a file loader for the current platform. 
	 */
	public static function getFileLoader() 
	{
		#if js
			return new alphaSynth.js.JsFileLoader();
		#elseif flash
		    return new alphaSynth.as.AsFileLoader();
		#else
			return null;
		#end 
	}
	
	public static function getSampleBuffer(length:Int = 0) 
	{
		var buffer:IBuffer<Float> = null;
		#if js 
		  buffer = new alphaSynth.js.JsSampleBuffer(length);
	    #elseif flash
	      buffer = new alphaSynth.as.AsSampleBuffer(length);
	    #else 
	      buffer = null;
        #end 
        return buffer;
	}
	 
	public static function getByteBuffer(length:Int = 0) 
	{
		var buffer:IBuffer<Int> = null;
        #if js 
          buffer = new alphaSynth.js.JsByteBuffer(length);
        #elseif flash
          buffer = new alphaSynth.as.AsByteBuffer(length);
        #else 
          buffer = null;
        #end 
        return buffer;
	}
}
