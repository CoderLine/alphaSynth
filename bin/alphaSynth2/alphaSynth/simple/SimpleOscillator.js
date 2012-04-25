alphaSynth.simple.SimpleOscillator = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.scomponent.StereoSynthComponent.prototype ) alphaSynth.simple.SimpleOscillator.prototype[k] = alphaSynth.scomponent.StereoSynthComponent.prototype[k];
alphaSynth.simple.SimpleOscillator.prototype._panning = 0.0;
alphaSynth.simple.SimpleOscillator.prototype._waveType = null;
alphaSynth.simple.SimpleOscillator.prototype._currentNote = 0;
alphaSynth.simple.SimpleOscillator.prototype._accumulator = 0.0;
alphaSynth.simple.SimpleOscillator.prototype._pitchBendModulation = 0.0;
alphaSynth.simple.SimpleOscillator.prototype._playing = null;
alphaSynth.simple.SimpleOscillator.prototype._synthesizeReplaceEnabled = null;
alphaSynth.simple.SimpleOscillator.prototype.getWaveType = function() {
	return this._waveType;
};
alphaSynth.simple.SimpleOscillator.prototype.setWaveType = function(waveType) {
	this._waveType = waveType;
};
alphaSynth.simple.SimpleOscillator.prototype.initialize = function() {
	this._currentNote = 69;
};
alphaSynth.simple.SimpleOscillator.prototype.generate = function(offset,count) {
	var buffer = this.getBuffer();
	var output = 0;
	var modNote = this._currentNote + 12 * this._pitchBendModulation;
	if(modNote < 0) {
		modNote = 0;
	}
	else if(modNote > 127) {
		modNote = 127;
	}
	var increment = alphaSynth.PowerOfTwoTable.getPower((modNote - 69) / 12) * 440 / this.getSamplesPerSecond();
	var endIndex = offset + count;
	{
		var _g = offset;
		while(_g < endIndex) {
			var i = _g++;
			var $e = this._waveType;
			switch( $e[1] ) {
			case 0:
			{
				output = 1 - 2 * this._accumulator;
			}break;
			case 1:
			{
				if(this._accumulator < 0.5) {
					output = -1;
				}
				else {
					output = 1;
				}
			}break;
			case 2:
			{
				if(this._accumulator < 0.5) {
					output = 1 - 4 * this._accumulator;
				}
				else {
					output = 1 - 4 * (1 - this._accumulator);
				}
			}break;
			}
			if(this._synthesizeReplaceEnabled) {
				buffer[0].set(i,output * (1 - this._panning));
				buffer[1].set(i,output * this._panning);
			}
			else {
				buffer[0].set(i,buffer[0].get(i) + output * (1 - this._panning));
				buffer[1].set(i,buffer[1].get(i) + output * this._panning);
			}
			this._accumulator += increment;
			if(this._accumulator >= 1) {
				this._accumulator -= 1;
			}
		}
	}
};
alphaSynth.simple.SimpleOscillator.prototype.trigger = function(previousNote,note,velocity) {
	this._currentNote = note;
	this._playing = true;
};
alphaSynth.simple.SimpleOscillator.prototype.release = function(velocity) {
	this._playing = false;
};
alphaSynth.simple.SimpleOscillator.prototype.getSynthesizeReplaceEnabled = function() {
	return this._synthesizeReplaceEnabled;
};
alphaSynth.simple.SimpleOscillator.prototype.setSynthesizeReplaceEnabled = function(synthesizeReplaceEnabled) {
	this._synthesizeReplaceEnabled = synthesizeReplaceEnabled;
};
alphaSynth.simple.SimpleOscillator.prototype.getOrdinal = function() {
	return 1;
};
alphaSynth.simple.SimpleOscillator.prototype.getPitchBendModulation = function() {
	return this._pitchBendModulation;
};
alphaSynth.simple.SimpleOscillator.prototype.setPitchBendModulation = function(modulation) {
	this._pitchBendModulation = modulation;
};
alphaSynth.simple.SimpleOscillator.prototype.isPlaying = function() {
	return this._playing;
};
;
;
