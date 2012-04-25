alphaSynth.Channel = function () { /* ctor */ }#abstract;
;
alphaSynth.Channel.prototype._voices = null;
alphaSynth.Channel.prototype._dispatcher = null;
alphaSynth.Channel.prototype._allocator = null;
alphaSynth.Channel.prototype._bender = null;
alphaSynth.Channel.prototype._controlProcessor = null;
alphaSynth.Channel.prototype.generate = function(offset,count) {
	var _g = 0, _g1 = this._voices;
	while(_g < _g1.length) {
		var voice = _g1[_g];
		++_g;
		voice.generate(offset,count);
	}
};
alphaSynth.Channel.prototype.dispatch = function(midiMessage) {
	this._dispatcher.dispatch(midiMessage);
};
;
