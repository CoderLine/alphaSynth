alphaSynth.PitchBender = function () { /* ctor */ }#abstract;
;
alphaSynth.PitchBender.CENTER = 8192;
alphaSynth.PitchBender.RANGE_MAX_VALUE = 12.0;
alphaSynth.PitchBender.prototype._pitchBendRange = 0;
alphaSynth.PitchBender.prototype._voices = null;
alphaSynth.PitchBender.prototype.bendPitch = function(data1,data2) {
	var pitchBendModulation = data1 | data2 << 7;
	pitchBendModulation -= 8192;
	pitchBendModulation /= 8192;
	pitchBendModulation *= this._pitchBendRange / 12.0;
	{
		var _g = 0, _g1 = this._voices;
		while(_g < _g1.length) {
			var voice = _g1[_g];
			++_g;
			voice.setPitchBendModulation(pitchBendModulation);
		}
	}
};
;
