alphaSynth.SynthEvent = function () { /* ctor */ }#abstract;
;
alphaSynth.SynthEvent.compare = function(a,b) {
	if(a.getTime() > b.getTime()) return 1;
	if(a.getTime() < b.getTime()) return -1;
	return 0;
};
alphaSynth.SynthEvent.prototype._time = 0;
alphaSynth.SynthEvent.prototype._message = null;
alphaSynth.SynthEvent.prototype.getTime = function() {
	return this._time;
};
alphaSynth.SynthEvent.prototype.getMessage = function() {
	return this._message;
};
;
