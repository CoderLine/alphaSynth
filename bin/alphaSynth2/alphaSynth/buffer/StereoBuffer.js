alphaSynth.buffer.StereoBuffer = function () { /* ctor */ }#abstract;
;
alphaSynth.buffer.StereoBuffer.prototype._buffer = null;
alphaSynth.buffer.StereoBuffer.prototype._amplitude = 0.0;
alphaSynth.buffer.StereoBuffer.prototype._bufferSizeChanged = null;
alphaSynth.buffer.StereoBuffer.prototype.getBuffer = function() {
	return this._buffer;
};
alphaSynth.buffer.StereoBuffer.prototype.getAmplitude = function() {
	return this._amplitude;
};
alphaSynth.buffer.StereoBuffer.prototype.setAmplitude = function(amplitude) {
	this._amplitude = amplitude;
};
alphaSynth.buffer.StereoBuffer.prototype.clear = function() {
	var bufferSize = this.getBufferSize();
	this._buffer[0] = alphaSynth.PlatformFactory.getSampleBuffer(bufferSize);
	this._buffer[1] = alphaSynth.PlatformFactory.getSampleBuffer(bufferSize);
};
alphaSynth.buffer.StereoBuffer.prototype.modulateAmplitude = function() {
	var bufferSize = this.getBufferSize();
	{
		var _g = 0;
		while(_g < bufferSize) {
			var i = _g++;
			this._buffer[0].set(i,this._buffer[0].get(i) * this._amplitude);
			this._buffer[1].set(i,this._buffer[1].get(i) * this._amplitude);
		}
	}
};
alphaSynth.buffer.StereoBuffer.prototype.getBufferSize = function() {
	return this._buffer[0].getLength();
};
alphaSynth.buffer.StereoBuffer.prototype.setBufferSize = function(bufferSize) {
	this._buffer = new Array();
	this._buffer.push(alphaSynth.PlatformFactory.getSampleBuffer(bufferSize));
	this._buffer.push(alphaSynth.PlatformFactory.getSampleBuffer(bufferSize));
};
alphaSynth.buffer.StereoBuffer.prototype.onBufferSizeChanged = function() {
	var _g = 0, _g1 = this._bufferSizeChanged;
	while(_g < _g1.length) {
		var handler = _g1[_g];
		++_g;
		handler();
	}
};
alphaSynth.buffer.StereoBuffer.prototype.addBufferSizeChangedHandler = function(handler) {
	this._bufferSizeChanged.push(handler);
};
alphaSynth.buffer.StereoBuffer.prototype.removeBufferSizeChangedHandler = function(handler) {
	this._bufferSizeChanged.remove(handler);
};
;
