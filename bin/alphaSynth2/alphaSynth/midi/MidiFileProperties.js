if(!alphaSynth.midi) alphaSynth.midi = {};
alphaSynth.midi.MidiFileProperties = function () { /* ctor */ }#abstract;
;
alphaSynth.midi.MidiFileProperties.FILE_MAGIC = "MThd";
alphaSynth.midi.MidiFileProperties.prototype._format = 0;
alphaSynth.midi.MidiFileProperties.prototype._trackCount = 0;
alphaSynth.midi.MidiFileProperties.prototype._division = 0;
alphaSynth.midi.MidiFileProperties.prototype.getFormat = function() {
	return this._format;
};
alphaSynth.midi.MidiFileProperties.prototype.getTrackCount = function() {
	return this._trackCount;
};
alphaSynth.midi.MidiFileProperties.prototype.getDivision = function() {
	return this._division;
};
alphaSynth.midi.MidiFileProperties.prototype.read = function(stream) {
	var magic = stream.readString(4);
	if(magic != "MThd") {
		throw "invalid midi file: file header not found";
	}
	{
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			stream.readByte();
		}
	}
	this._format = stream.readInt16();
	this._trackCount = stream.readInt16();
	this._division = stream.readInt16();
};
;
