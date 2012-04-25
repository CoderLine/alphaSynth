alphaSynth.StatusReporter = function () { /* ctor */ }#abstract;
;
alphaSynth.StatusReporter.prototype._progressUpdated = null;
alphaSynth.StatusReporter.prototype.onProgressUpdated = function(status,progress,data) {
	this.onProgressUpdated2(new alphaSynth.SynthesizerStatus(status,progress,data));
};
alphaSynth.StatusReporter.prototype.onProgressUpdated2 = function(status) {
	var _g = 0, _g1 = this._progressUpdated;
	while(_g < _g1.length) {
		var handler = _g1[_g];
		++_g;
		handler(status);
	}
};
alphaSynth.StatusReporter.prototype.addProgressUpdatedHandler = function(handler) {
	if(handler == null) return;
	this._progressUpdated.push(handler);
};
alphaSynth.StatusReporter.prototype.removeProgressUpdatedHandler = function(handler) {
	this._progressUpdated.remove(handler);
};
;
