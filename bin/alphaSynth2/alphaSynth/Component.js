if(typeof alphaSynth=='undefined') alphaSynth = {};
alphaSynth.Component = function () { /* ctor */ }#abstract;
;
alphaSynth.Component.prototype._sampleRate = null;
alphaSynth.Component.prototype.getSamplesPerSecond = function() {
	return this._sampleRate.getSamplesPerSecond();
};
;
