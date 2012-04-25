alphaSynth.SampleRate = function () { /* ctor */ }#abstract;
;
alphaSynth.SampleRate.DEFAULT_RATE = 44100;
alphaSynth.SampleRate.prototype._samplesPerSecond = 0;
alphaSynth.SampleRate.prototype.getSamplesPerSecond = function() {
	return this._samplesPerSecond;
};
alphaSynth.SampleRate.prototype.setSamplesPerSecond = function(samplesPerSecond) {
	this._samplesPerSecond = samplesPerSecond;
	this.onSampleRateChanged();
};
alphaSynth.SampleRate.prototype._sampleRateChanged = null;
alphaSynth.SampleRate.prototype.onSampleRateChanged = function() {
	var _g = 0, _g1 = this._sampleRateChanged;
	while(_g < _g1.length) {
		var handler = _g1[_g];
		++_g;
		handler();
	}
};
alphaSynth.SampleRate.prototype.addSampleRateChangedHandler = function(handler) {
	this._sampleRateChanged.push(handler);
};
alphaSynth.SampleRate.prototype.removeSampleRateChangedHandler = function(handler) {
	this._sampleRateChanged.remove(handler);
};
;
