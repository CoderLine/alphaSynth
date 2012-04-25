alphaSynth.simple.SimpleVoice = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.Voice.prototype ) alphaSynth.simple.SimpleVoice.prototype[k] = alphaSynth.Voice.prototype[k];
alphaSynth.simple.SimpleVoice.prototype._osc = null;
alphaSynth.simple.SimpleVoice.prototype.isPlaying = function() {
	return this._osc.isPlaying();
};
alphaSynth.simple.SimpleVoice.prototype.initialize = function(sampleRate,buffer) {
	this._osc = new alphaSynth.simple.SimpleOscillator(sampleRate,buffer);
	this._osc.setWaveType(alphaSynth.simple.WaveformType.Triangle);
	this.addComponent(this._osc);
	this.addBendable(this._osc);
};
alphaSynth.simple.SimpleVoice.prototype.getSynthesizeReplaceEnabled = function() {
	return this._osc.getSynthesizeReplaceEnabled();
};
alphaSynth.simple.SimpleVoice.prototype.setSynthesizeReplaceEnabled = function(synthesizeReplaceEnabled) {
	this._osc.setSynthesizeReplaceEnabled(synthesizeReplaceEnabled);
};
;
