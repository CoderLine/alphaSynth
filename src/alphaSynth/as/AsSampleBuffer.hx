package alphaSynth.as;

class AsSampleBuffer implements IBuffer<Float> 
{
    private var _data:Array<Float>;
    
    public function new(length:Int = 0) 
    {
    	_data = new Array<Float>();
    	for(i in 0 ... length) _data.push(0.0);
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
