alphaSynth.midi.MidiTrack = function () { /* ctor */ }#abstract;
;
alphaSynth.midi.MidiTrack.prototype._events = null;
alphaSynth.midi.MidiTrack.prototype._endOfTrack = null;
alphaSynth.midi.MidiTrack.prototype.get = function(index) {
	return this._events[index];
};
alphaSynth.midi.MidiTrack.prototype.size = function() {
	return this._events.length;
};
alphaSynth.midi.MidiTrack.prototype.getTickLength = function() {
	if(this._events.length == 0) return 0;
	return this._events[this._events.length - 1].getTick();
};
alphaSynth.midi.MidiTrack.prototype.add = function(midiEvent) {
	if(alphaSynth.midi.EndOfTrackMessage.isEndOfTrackMessage(midiEvent.getMessage())) {
		this._endOfTrack.setTick(midiEvent.getTick());
	}
	var insertPosition = this._events.length;
	while(insertPosition > 0) {
		var previousEvent = this._events[insertPosition - 1];
		if(midiEvent.getTick() >= previousEvent.getTick()) {
			break;
		}
		insertPosition--;
	}
	if(insertPosition == this._events.length) {
		this._events.insert(this._events.length - 1,midiEvent);
		this._endOfTrack.setTick(midiEvent.getTick());
	}
	else {
		this._events.insert(insertPosition,midiEvent);
	}
};
alphaSynth.midi.MidiTrack.prototype.remove = function(midiEvent) {
	if(this._endOfTrack == midiEvent) return;
	this._events.remove(midiEvent);
};
;
