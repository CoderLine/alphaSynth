IntIter = function () { /* ctor */ }#abstract;
;
IntIter.prototype.min = 0;
IntIter.prototype.max = 0;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
};
IntIter.prototype.next = function() {
	return this.min++;
};
;
