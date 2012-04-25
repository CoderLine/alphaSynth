alphaSynth.NoteTracker = function () { /* ctor */ }#abstract;
;
alphaSynth.NoteTracker.prototype._noteOnMessages = null;
alphaSynth.NoteTracker.prototype._lastNote = 0;
alphaSynth.NoteTracker.prototype.noteOn = function(message) {
	if(message.getCommand() != 144 || message.getCommand() == 144 && message.getData2() == 0) {
		return;
	}
	this._noteOnMessages.push(message);
	this._lastNote = message.getData1();
};
alphaSynth.NoteTracker.prototype.noteOff = function(message) {
	if(message.getCommand() != 128) {
		if(message.getCommand() != 144) {
			if(message.getData2() > 0) {
				return;
			}
		}
		else {
			return;
		}
	}
	var index = -1;
	{
		var _g1 = 0, _g = this._noteOnMessages.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._noteOnMessages[i].getChannel() == message.getChannel() && this._noteOnMessages[i].getData1() == message.getData1()) {
				index = i;
				break;
			}
		}
	}
	if(index >= 0) {
		this._noteOnMessages.remove(this._noteOnMessages[index]);
		if(this._noteOnMessages.length > 0) {
			this._lastNote = this._noteOnMessages[this._noteOnMessages.length - 1].getData1();
		}
	}
};
alphaSynth.NoteTracker.prototype.clear = function() {
	this._noteOnMessages = new Array();
};
alphaSynth.NoteTracker.prototype.size = function() {
	return this._noteOnMessages.length;
};
alphaSynth.NoteTracker.prototype.getLastNote = function() {
	return this._lastNote;
};
;
