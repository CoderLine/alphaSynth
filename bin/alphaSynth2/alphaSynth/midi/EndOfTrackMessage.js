alphaSynth.midi.EndOfTrackMessage = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.midi.MetaMessage.prototype ) alphaSynth.midi.EndOfTrackMessage.prototype[k] = alphaSynth.midi.MetaMessage.prototype[k];
alphaSynth.midi.EndOfTrackMessage.END_OF_TRACK = 47;
alphaSynth.midi.EndOfTrackMessage.isEndOfTrackMessage = function(midiMessage) {
	if(midiMessage.getLength() != 3 || midiMessage.getStatus() != 255) {
		return false;
	}
	var msg = midiMessage.getMessage();
	return (msg.b[1] & 255) == 47 && msg.b[2] == 0;
};
alphaSynth.midi.EndOfTrackMessage.prototype.setMetaMessage = function(type,data) {
	throw "not allowed";
};
;
