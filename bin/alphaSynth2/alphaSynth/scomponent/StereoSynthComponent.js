alphaSynth.scomponent.StereoSynthComponent = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.scomponent.SynthComponent.prototype ) alphaSynth.scomponent.StereoSynthComponent.prototype[k] = alphaSynth.scomponent.SynthComponent.prototype[k];
alphaSynth.scomponent.StereoSynthComponent.prototype._buffer = null;
alphaSynth.scomponent.StereoSynthComponent.prototype.getBuffer = function() {
	return this._buffer.getBuffer();
};
alphaSynth.scomponent.StereoSynthComponent.prototype.getBufferSize = function() {
	return this._buffer.getBufferSize();
};
alphaSynth.scomponent.StereoSynthComponent.prototype.setBufferSize = function(bufferSize) {
	this._buffer.setBufferSize(bufferSize);
};
;
