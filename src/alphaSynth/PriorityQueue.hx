package alphaSynth;

/**
 * Priority Queue data structure
 */
class PriorityQueue<T>
{
	private var _comparer:T->T->Int;
	private var _data:Array<T>;
	
	/**
	 * Initializes a new instance of the PriorityQueue class.
	 * @param comparer the comparator to use for comparing the entries 
	 */
	public function new(comparer:T->T->Int)
	{
        //Initialize the array that will hold the values
		_data = new Array<T>();
        //Fill the first cell in the array with an empty value
		_data.push(null);
		_comparer = comparer;
	}
	
	/**
	 * Gets the number of values stored within the Priority Queue
	 */
	public function size() : Int
	{
		return _data.length - 1;
	}
	
	/**
	 * Returns the value at the head of the Priority Queue without removing it.
	 */
	public function peek() : T
	{
		if(size() == 0) 
			return null;
		else
			return _data[1];
	}
	
	/**
	 * Adds a value to the Priority Queue
	 */
	public function enqueue(value:T) : Void
	{
		_data.push(value);
		bubbleUp(_data.length - 1);
	}
	
	/**
	 * Returns the minimum value inside the Priority Queue
	 */
	public function dequeue() : T 
	{
		if(size() == 0) return null;
		
		var minValue:T = _data[1];
		
		if(_data.length > 2)
		{
			var lastValue:T = _data[_data.length - 1];
			_data.remove(_data[_data.length - 1]);
			_data[1] = lastValue;
			
			bubbleDown(1);
		}
		else
		{
			_data.remove(_data[1]);
		}
		
		return minValue;
	}
	
	/**
	 * Restores the heap-order property between child and parent values going up towards the head
	 */
	private function bubbleUp(startCell:Int)
	{
		var cell:Int = startCell;
		
		while(isParentBigger(cell))
		{
			var parentValue:T = _data[Std.int(cell / 2)];
			var childValue:T = _data[cell];
			
			_data[Std.int(cell / 2)] = childValue;
			_data[cell] = parentValue;
			
			cell = Std.int(cell / 2);
		}
	}
	
	/**	
	 * Restores the heap-order property between child and parent values going down towards the bottom
	 */
	private function bubbleDown(startCell:Int)
	{
		var cell:Int = startCell;
		
		while(isLeftChildSmaller(cell) || isRightChildSmaller(cell))
		{
			var child:Int = compareChild(cell);
			
			if(child == -1)
			{
				var parentValue:T = _data[cell];
				var leftChildValue:T = _data[2 * cell];
				
				_data[cell] = leftChildValue;
				_data[2 * cell] = parentValue;
				
				cell = 2 * cell;
			}
			else if(child == 1)
			{
				var parentValue:T = _data[cell];
				var rightChildValue:T = _data[ 2 * cell + 1];
				
				_data[cell] = rightChildValue;
				_data[2*cell + 1] = parentValue;
				
				cell = 2 * cell + 1;
			}
		}
	}
	
	/**
	 * Returns if the value of a parent is greater than its child
	 */
	private function isParentBigger(childCell:Int) : Bool
	{
		if(childCell == 1) return false;
		return _comparer(_data[Std.int(childCell / 2)], _data[childCell]) > 0;
	}
	
	/**
	 * Returns whether the left child cell is smaller than the parent cell.
     * Returns false if a left child does not exist.
	 */
	private function isLeftChildSmaller(parentCell:Int) : Bool
	{
		if(2 * parentCell >= _data.length) return false;
		return _comparer(_data[2*parentCell], _data[parentCell]) < 0;
	}
	
	/**
     * Returns whether the right child cell is smaller than the parent cell.
     * Returns false if a right child does not exist.
	 */
	private function isRightChildSmaller(parentCell:Int) : Bool
	{
		if(2 * parentCell + 1 >= _data.length) return false;
		return _comparer(_data[2*parentCell + 1], _data[parentCell]) < 0;
	}
	
	/**
	 * Compares the children cells of a parent cell. -1 indicates the left child is the smaller of the two,
     * 1 indicates the right child is the smaller of the two, 0 inidicates that neither child is smaller than the parent.
	 */
	private function compareChild(parentCell:Int)
	{
		var leftChildSmaller:Bool = isLeftChildSmaller(parentCell);
		var rightChildSmaller:Bool = isRightChildSmaller(parentCell);
		
		if(leftChildSmaller || rightChildSmaller)
		{
			if(leftChildSmaller && rightChildSmaller)
			{
				var leftChild:Int = 2 * parentCell;
				var rightChild:Int = 2 * parentCell + 1;
				
				var leftValue:T = _data[leftChild];
				var rightValue:T = _data[rightChild];
				
				if(_comparer(leftValue, rightValue) <= 0)
					return -1;
				else
					return 1;
			}
			else if(leftChildSmaller)
				return -1;
			else
				return 1;
		}
		else
			return 0;
	}
}
