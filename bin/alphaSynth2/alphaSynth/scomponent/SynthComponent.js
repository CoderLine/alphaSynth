if(!alphaSynth.scomponent) alphaSynth.scomponent = {};
alphaSynth.scomponent.SynthComponent = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.Component.prototype ) alphaSynth.scomponent.SynthComponent.prototype[k] = alphaSynth.Component.prototype[k];
alphaSynth.scomponent.SynthComponent.NoteCount = 128;
alphaSynth.scomponent.SynthComponent.NotesPerOctave = 12;
alphaSynth.scomponent.SynthComponent.A440NoteNumber = 69;
alphaSynth.scomponent.SynthComponent.A440Frequency = 440;
alphaSynth.scomponent.SynthComponent.MiddleCNoteNumber = 60;
alphaSynth.scomponent.SynthComponent.ParameterScaler = 127;
alphaSynth.scomponent.SynthComponent.comparer = function(a,b) {
	if(a.getOrdinal() > b.getOrdinal()) return 1;
	if(a.getOrdinal() < b.getOrdinal()) return -1;
	return 0;
};
alphaSynth.scomponent.SynthComponent.prototype._ordinalChanged = null;
alphaSynth.scomponent.SynthComponent.prototype.generate = function(offset,sampleCount) {
	throw "abstract method not implemented";
};
alphaSynth.scomponent.SynthComponent.prototype.trigger = function(previousNote,note,velocity) {
	throw "abstract method not implemented";
};
alphaSynth.scomponent.SynthComponent.prototype.release = function(velocity) {
	throw "abstract method not implemented";
};
alphaSynth.scomponent.SynthComponent.prototype.getOrdinal = function() {
	throw "abstract method not implemented";
	return 0;
};
alphaSynth.scomponent.SynthComponent.prototype.getBufferSize = function() {
	throw "abstract method not implemented";
	return 0;
};
alphaSynth.scomponent.SynthComponent.prototype.setBufferSize = function(bufferSize) {
	throw "abstract method not implemented";
};
alphaSynth.scomponent.SynthComponent.prototype.getSynthesizeReplaceEnabled = function() {
	throw "abstract method not implemented";
	return false;
};
alphaSynth.scomponent.SynthComponent.prototype.setSynthesizeReplaceEnabled = function(synthesizeReplaceEnabled) {
	throw "abstract method not implemented";
};
alphaSynth.scomponent.SynthComponent.prototype.onOrdinalChanged = function() {
	var _g = 0, _g1 = this._ordinalChanged;
	while(_g < _g1.length) {
		var handler = _g1[_g];
		++_g;
		handler();
	}
};
alphaSynth.scomponent.SynthComponent.prototype.addOrdinalChangedHandler = function(handler) {
	this._ordinalChanged.push(handler);
};
alphaSynth.scomponent.SynthComponent.prototype.removeOrdinalChangedHandler = function(handler) {
	this._ordinalChanged.remove(handler);
};
;
