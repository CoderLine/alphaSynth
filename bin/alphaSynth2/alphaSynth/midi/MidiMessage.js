alphaSynth.midi.MidiMessage = function () { /* ctor */ }#abstract;
;
alphaSynth.midi.MidiMessage.prototype._data = null;
alphaSynth.midi.MidiMessage.prototype.getMessage = function() {
	var clone = haxe.io.Bytes.alloc(this._data.length);
	clone.blit(0,this._data,0,this._data.length);
	return clone;
};
alphaSynth.midi.MidiMessage.prototype.getLength = function() {
	return this._data.length;
};
alphaSynth.midi.MidiMessage.prototype.getStatus = function() {
	return this._data.length > 0?this._data.b[0] & 255:0;
};
alphaSynth.midi.MidiMessage.prototype.getInternalData = function() {
	return this._data;
};
alphaSynth.midi.MidiMessage.prototype.setInternalData = function(data) {
	this._data = data;
};
;
