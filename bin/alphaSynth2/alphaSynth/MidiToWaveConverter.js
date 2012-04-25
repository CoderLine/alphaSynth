alphaSynth.MidiToWaveConverter = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.StatusReporter.prototype ) alphaSynth.MidiToWaveConverter.prototype[k] = alphaSynth.StatusReporter.prototype[k];
alphaSynth.MidiToWaveConverter.convertToSamples = function(sequence,statusListener) {
	var converter = new alphaSynth.MidiToWaveConverter();
	converter.addProgressUpdatedHandler(statusListener);
	return converter.synthesizeToSamples(sequence);
};
alphaSynth.MidiToWaveConverter.convertToDataUri = function(sequence,statusListener) {
	var converter = new alphaSynth.MidiToWaveConverter();
	converter.addProgressUpdatedHandler(statusListener);
	return converter.synthesizeToDataUri(sequence);
};
alphaSynth.MidiToWaveConverter.prototype._synthesizer = null;
alphaSynth.MidiToWaveConverter.prototype.getSampleRate = function() {
	return this._synthesizer.getSampleRate().getSamplesPerSecond();
};
alphaSynth.MidiToWaveConverter.prototype.setSampleRate = function(sampleRate) {
	return this._synthesizer.getSampleRate().setSamplesPerSecond(sampleRate);
};
alphaSynth.MidiToWaveConverter.prototype.synthesizeToSamples = function(sequence) {
	var buffer = new alphaSynth.buffer.GlobalSampleBuffer();
	this._synthesizer.setGlobalBuffer(buffer);
	this.send(sequence);
	this._synthesizer.generate();
	return buffer.getSamples();
};
alphaSynth.MidiToWaveConverter.prototype.synthesizeToDataUri = function(sequence) {
	var buffer = new alphaSynth.buffer.WaveFileGlobalBuffer(this._synthesizer.getSampleRate().getSamplesPerSecond());
	this._synthesizer.setGlobalBuffer(buffer);
	this.send(sequence);
	this._synthesizer.generate();
	return buffer.getDataUri();
};
alphaSynth.MidiToWaveConverter.prototype.send = function(sequence) {
	var tracks = sequence.getTracks();
	var trackspos = new Array();
	{
		var _g1 = 0, _g = tracks.length;
		while(_g1 < _g) {
			var i = _g1++;
			trackspos.push(0);
		}
	}
	var bpm = 120;
	var ticksPerBeat = sequence.getDivision();
	var lastTick = 0;
	var curTime = 0;
	while(true) {
		var selevent = null;
		var seltrack = -1;
		{
			var _g1 = 0, _g = tracks.length;
			while(_g1 < _g) {
				var i = _g1++;
				var trackpos = trackspos[i];
				var track = tracks[i];
				if(trackpos < track.size()) {
					var evt = track.get(trackpos);
					if(selevent == null || evt.getTick() < selevent.getTick()) {
						selevent = evt;
						seltrack = i;
					}
				}
			}
		}
		if(seltrack == -1) break;
		trackspos[seltrack]++;
		var tick = selevent.getTick();
		var ticksToNextEvent = tick - lastTick;
		var beatsToNextEvent = ticksToNextEvent / 1.0 / ticksPerBeat;
		var secondsToNextEvent = beatsToNextEvent / (bpm / 60.0);
		var microsecondsToNextEvent = Std["int"](secondsToNextEvent * 1000000);
		curTime += microsecondsToNextEvent;
		lastTick = tick;
		var msg = selevent.getMessage();
		if(Std["is"](msg,alphaSynth.midi.MetaMessage)) {
			var mms = msg;
			if(mms.getType() == 81) {
				var data = mms.getData();
				bpm = Std["int"](60000000 / ((data.b[0] & 255) << 16 | (data.b[1] & 255) << 8 | data.b[2] & 255));
			}
		}
		else {
			this._synthesizer.processMessage(curTime,msg);
		}
	}
};
alphaSynth.MidiToWaveConverter.prototype.handleSynthesizerUpdated = function(status) {
	this.onProgressUpdated2(status);
};
;
