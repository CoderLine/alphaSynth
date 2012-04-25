package alphaSynth.wave;

/**
 * A fast base 64 encoder
 * based on http://ntt.cc/2009/11/28/base64-encoder-and-decoder-with-actionscript-3-full-source-code.html
 */
class FastBase64 
{
	private static var _chars:Array<String> =
        ['A','B','C','D','E','F','G','H',
        'I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X',
        'Y','Z','a','b','c','d','e','f',
        'g','h','i','j','k','l','m','n',
        'o','p','q','r','s','t','u','v',
        'w','x','y','z','0','1','2','3',
        '4','5','6','7','8','9','+','/'];
	
	/**
	 * Encodes the given byte array as base64 string.
	 * @param data the byte array to encode
	 * @param progressListener this listener gets called upon progress changes
	 * @return the specified data ase base64 encoded string
	 */
	public static function encode(data:IBuffer<Int>, progressListener:Float->Void = null) : String
	{
		var out:Array<String> = [];
		var i:Int = 0;
		var j:Int = 0;
		var r:Int = data.getLength() % 3;
		var len:Int = data.getLength() - r;
		var c:Int;
		
		var reportCount:Float = 0;
		var reportOffset:Float = data.getLength() / 1000.0; 
		while(i < len) 
		{
			if(progressListener != null && reportCount > reportOffset) 
			{
				reportCount = 0;
				progressListener(i / data.getLength());
			}
			
			out[j++] = encodeBytes([data.get(i++), data.get(i++), data.get(i++)]);
            reportCount += 4;
		}
		
		if(r == 1) 
		{
			out[j++] = encodeBytes([data.get(i++)]);
		}
		else if (r == 2) 
		{
			out[j++] = encodeBytes([data.get(i++), data.get(i++)]);
        }
        
        if(progressListener != null) progressListener(1);
		
        return out.join("");
	}
	
	public static function getBaseChar(byte:Int)
	{
		return _chars[byte];
	}
	
	public static function encodeBytes(data:Array<Int>) : String
	{
		var c:Int;
		if(data.length == 3)
		{
			c = data[0] << 16 | data[1] << 8 | data[2];
			return getBaseChar(c >> 18) + getBaseChar(c >> 12 & 0x3f) + getBaseChar(c >> 6 & 0x3f) + getBaseChar(c & 0x3f);
		}
		else if(data.length == 2)
		{
			c = data[0] << 8 | data[1];
        	return getBaseChar(c >> 10) + getBaseChar(c >> 4 & 0x3f) + getBaseChar((c & 0x0f) << 2) + "=";
		}
		else if(data.length == 1)
		{
			c = data[0];
            return getBaseChar(c >> 2) + getBaseChar((c & 0x03) << 4) + "==";
		}
		return "";
	}
}
