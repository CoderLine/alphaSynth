package alphaSynth.js;

class JsByteBuffer implements IBuffer<Int> 
{
    private var _data:Uint8Array;
    
    public function new(length:Int = 0) 
    {
    	_data = new Uint8Array(length);
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
