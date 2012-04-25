package alphaSynth.js;

class JsSampleBuffer implements IBuffer<Float> 
{
    private var _data:Float32Array;
    
    public function new(length:Int = 0) 
    {
    	_data = new Float32Array(length);
    }
    
    public function getLength() : Int
    {
    	return _data.length;
    }
    
    public function get(index:Int) : Float
    {
    	return _data[index];
    }
    
    public function set(index:Int, value:Float) 
    {
    	_data[index] = value;
    }
}
