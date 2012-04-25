alphaSynth.midi.MidiSequence = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.StatusReporter.prototype ) alphaSynth.midi.MidiSequence.prototype[k] = alphaSynth.StatusReporter.prototype[k];
alphaSynth.midi.MidiSequence.loadSequence = function(method,url,success,progressListener) {
	var loader = alphaSynth.PlatformFactory.getFileLoader();
	loader.loadBinary(method,url,function(data) {
		var sequence = new alphaSynth.midi.MidiSequence();
		if(progressListener != null) sequence.addProgressUpdatedHandler(progressListener);
		sequence.load(data);
		success(sequence);
	},function(err) {
		throw err;
	});
};
alphaSynth.midi.MidiSequence.prototype._tracks = null;
alphaSynth.midi.MidiSequence.prototype._division = 0;
alphaSynth.midi.MidiSequence.prototype.getTracks = function() {
	return this._tracks;
};
alphaSynth.midi.MidiSequence.prototype.get = function(index) {
	return this._tracks[index];
};
alphaSynth.midi.MidiSequence.prototype.getDivision = function() {
	return this._division;
};
alphaSynth.midi.MidiSequence.prototype.setDivision = function(division) {
	this._division = division;
};
alphaSynth.midi.MidiSequence.prototype.createTrack = function() {
	var track = new alphaSynth.midi.MidiTrack();
	this._tracks.push(track);
	return track;
};
alphaSynth.midi.MidiSequence.prototype.removeTrack = function(track) {
	this._tracks.remove(track);
};
alphaSynth.midi.MidiSequence.prototype.getTickLength = function() {
	var maxLength = 0;
	{
		var _g = 0, _g1 = this._tracks;
		while(_g < _g1.length) {
			var midiTrack = _g1[_g];
			++_g;
			var trackLength = midiTrack.getTickLength();
			if(trackLength > maxLength) {
				maxLength = trackLength;
			}
		}
	}
	return maxLength;
};
alphaSynth.midi.MidiSequence.prototype.load = function(stream) {
	this._tracks = new Array();
	var properties = new alphaSynth.midi.MidiFileProperties();
	var reader = new alphaSynth.midi.TrackReader(this);
	this.onProgressUpdated("Loading Midi Sequence",0);
	properties.read(stream);
	this.setDivision(properties.getDivision());
	{
		var _g1 = 0, _g = properties.getTrackCount();
		while(_g1 < _g) {
			var i = _g1++;
			reader.read(stream);
			var trackProgress = i / properties.getTrackCount();
			this.onProgressUpdated("Loading Midi Sequence",trackProgress);
		}
	}
	this.onProgressUpdated("Loading Midi Sequence",1);
};
;
