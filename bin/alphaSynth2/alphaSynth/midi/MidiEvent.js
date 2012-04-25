alphaSynth.midi.MidiEvent = function () { /* ctor */ }#abstract;
;
alphaSynth.midi.MidiEvent.prototype._message = null;
alphaSynth.midi.MidiEvent.prototype._tick = 0;
alphaSynth.midi.MidiEvent.prototype.getMessage = function() {
	return this._message;
};
alphaSynth.midi.MidiEvent.prototype.getTick = function() {
	return this._tick;
};
alphaSynth.midi.MidiEvent.prototype.setTick = function(tick) {
	this._tick = tick;
};
;
