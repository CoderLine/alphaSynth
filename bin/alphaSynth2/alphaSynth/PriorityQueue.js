alphaSynth.PriorityQueue = function () { /* ctor */ }#abstract;
;
alphaSynth.PriorityQueue.prototype._comparer = null;
alphaSynth.PriorityQueue.prototype._data = null;
alphaSynth.PriorityQueue.prototype.size = function() {
	return this._data.length - 1;
};
alphaSynth.PriorityQueue.prototype.peek = function() {
	if(this.size() == 0) return null;
	else return this._data[1];
};
alphaSynth.PriorityQueue.prototype.enqueue = function(value) {
	this._data.push(value);
	this.bubbleUp(this._data.length - 1);
};
alphaSynth.PriorityQueue.prototype.dequeue = function() {
	if(this.size() == 0) return null;
	var minValue = this._data[1];
	if(this._data.length > 2) {
		var lastValue = this._data[this._data.length - 1];
		this._data.remove(this._data[this._data.length - 1]);
		this._data[1] = lastValue;
		this.bubbleDown(1);
	}
	else {
		this._data.remove(this._data[1]);
	}
	return minValue;
};
alphaSynth.PriorityQueue.prototype.bubbleUp = function(startCell) {
	var cell = startCell;
	while(this.isParentBigger(cell)) {
		var parentValue = this._data[Std["int"](cell / 2)];
		var childValue = this._data[cell];
		this._data[Std["int"](cell / 2)] = childValue;
		this._data[cell] = parentValue;
		cell = Std["int"](cell / 2);
	}
};
alphaSynth.PriorityQueue.prototype.bubbleDown = function(startCell) {
	var cell = startCell;
	while(this.isLeftChildSmaller(cell) || this.isRightChildSmaller(cell)) {
		var child = this.compareChild(cell);
		if(child == -1) {
			var parentValue = this._data[cell];
			var leftChildValue = this._data[2 * cell];
			this._data[cell] = leftChildValue;
			this._data[2 * cell] = parentValue;
			cell = 2 * cell;
		}
		else if(child == 1) {
			var parentValue = this._data[cell];
			var rightChildValue = this._data[2 * cell + 1];
			this._data[cell] = rightChildValue;
			this._data[2 * cell + 1] = parentValue;
			cell = 2 * cell + 1;
		}
	}
};
alphaSynth.PriorityQueue.prototype.isParentBigger = function(childCell) {
	if(childCell == 1) return false;
	return this._comparer(this._data[Std["int"](childCell / 2)],this._data[childCell]) > 0;
};
alphaSynth.PriorityQueue.prototype.isLeftChildSmaller = function(parentCell) {
	if(2 * parentCell >= this._data.length) return false;
	return this._comparer(this._data[2 * parentCell],this._data[parentCell]) < 0;
};
alphaSynth.PriorityQueue.prototype.isRightChildSmaller = function(parentCell) {
	if(2 * parentCell + 1 >= this._data.length) return false;
	return this._comparer(this._data[2 * parentCell + 1],this._data[parentCell]) < 0;
};
alphaSynth.PriorityQueue.prototype.compareChild = function(parentCell) {
	var leftChildSmaller = this.isLeftChildSmaller(parentCell);
	var rightChildSmaller = this.isRightChildSmaller(parentCell);
	if(leftChildSmaller || rightChildSmaller) {
		if(leftChildSmaller && rightChildSmaller) {
			var leftChild = 2 * parentCell;
			var rightChild = 2 * parentCell + 1;
			var leftValue = this._data[leftChild];
			var rightValue = this._data[rightChild];
			if(this._comparer(leftValue,rightValue) <= 0) return -1;
			else return 1;
		}
		else if(leftChildSmaller) return -1;
		else return 1;
	}
	else return 0;
};
;
