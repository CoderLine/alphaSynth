package alphaSynth.as;

class AsByteBuffer implements IBuffer<Int> 
{
    private var _data:Array<Int>;
    
    public function new(length:Int = 0) 
    {
    	_data = new Array<Int>();
    	for(i in 0 ... length) _data.push(0);
    }
    
    public function getLength() : Int
    {
    	return _data.length;
    }
    
    public function get(index:Int) : Int
    {
    	return _data[index];
    }
    
    public function set(index:Int, value:Int) 
    {
    	_data[index] = value;
    }
}
