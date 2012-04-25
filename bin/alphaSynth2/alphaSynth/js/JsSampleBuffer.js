alphaSynth.js.JsSampleBuffer = function () { /* ctor */ }#abstract;
;
alphaSynth.js.JsSampleBuffer.prototype._data = null;
alphaSynth.js.JsSampleBuffer.prototype.getLength = function() {
	return this._data.length;
};
alphaSynth.js.JsSampleBuffer.prototype.get = function(index) {
	return this._data[index];
};
alphaSynth.js.JsSampleBuffer.prototype.set = function(index,value) {
	this._data[index] = value;
};
;
;
