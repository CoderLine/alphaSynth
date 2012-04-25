alphaSynth.buffer.WaveFileGlobalBuffer = function () { /* ctor */ }#abstract;
;
alphaSynth.buffer.WaveFileGlobalBuffer.prototype._wave = null;
alphaSynth.buffer.WaveFileGlobalBuffer.prototype._sampleRate = 0;
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.getDataUri = function() {
	return this._wave.getDataUri();
};
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.setBufferSize = function(size) {
	this._wave = new alphaSynth.wave.WaveFile(this._sampleRate,size);
};
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.writeBuffer = function(buffer) {
	var samples = buffer.getBuffer();
	var sampleData = 0;
	{
		var _g1 = 0, _g = buffer.getBufferSize();
		while(_g1 < _g) {
			var i = _g1++;
			var leftSample = samples[0].get(i);
			sampleData = alphaSynth.TypeUtils.castToShort(32767 * leftSample);
			this._wave.writeSampleByte(sampleData);
			this._wave.writeSampleByte(sampleData >> 8);
			var rightSample = samples[1].get(i);
			sampleData = alphaSynth.TypeUtils.castToShort(32767 * rightSample);
			this._wave.writeSampleByte(sampleData);
			this._wave.writeSampleByte(sampleData >> 8);
		}
	}
};
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.finish = function() {
	this._wave.finish();
};
;
;
