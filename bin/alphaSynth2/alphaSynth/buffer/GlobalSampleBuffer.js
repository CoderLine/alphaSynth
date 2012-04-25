alphaSynth.buffer.GlobalSampleBuffer = function () { /* ctor */ }#abstract;
;
alphaSynth.buffer.GlobalSampleBuffer.prototype._buffer = null;
alphaSynth.buffer.GlobalSampleBuffer.prototype._pos = 0;
alphaSynth.buffer.GlobalSampleBuffer.prototype.getSamples = function() {
	return this._buffer;
};
alphaSynth.buffer.GlobalSampleBuffer.prototype.setBufferSize = function(size) {
	this._pos = 0;
	this._buffer = alphaSynth.PlatformFactory.getSampleBuffer(size);
};
alphaSynth.buffer.GlobalSampleBuffer.prototype.writeBuffer = function(buffer) {
	var original = buffer.getBuffer();
	var i = 0;
	while(i < buffer.getBufferSize()) {
		this._buffer.set(this._pos++,original[0].get(i));
		this._buffer.set(this._pos++,original[1].get(i));
		i++;
	}
};
alphaSynth.buffer.GlobalSampleBuffer.prototype.finish = function() {
	null;
};
;
;
