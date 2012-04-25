alphaSynth.js.JsByteBuffer = function () { /* ctor */ }#abstract;
;
alphaSynth.js.JsByteBuffer.prototype._data = null;
alphaSynth.js.JsByteBuffer.prototype.getLength = function() {
	return this._data.length;
};
alphaSynth.js.JsByteBuffer.prototype.get = function(index) {
	return this._data[index];
};
alphaSynth.js.JsByteBuffer.prototype.set = function(index,value) {
	this._data[index] = value;
};
;
;
