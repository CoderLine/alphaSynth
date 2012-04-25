alphaSynth.ControlProcessor = function () { /* ctor */ }#abstract;
;
alphaSynth.ControlProcessor.prototype._voices = null;
alphaSynth.ControlProcessor.prototype._allocator = null;
alphaSynth.ControlProcessor.prototype.process = function(type,value) {
	if(type == 64) {
		this._allocator.setSubstainEnabled(value >= 64);
	}
	else if(type == 120) {
		this._allocator.allSoundOff();
	}
	else {
		var fValue = value;
		fValue /= 127;
		{
			var _g = 0, _g1 = this._voices;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				v.processControllerMessage(type,fValue);
			}
		}
	}
};
;
