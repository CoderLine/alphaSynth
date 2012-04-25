alphaSynth.VoiceAllocator = function () { /* ctor */ }#abstract;
;
alphaSynth.VoiceAllocator.prototype._triggeredVoices = null;
alphaSynth.VoiceAllocator.prototype._releasedVoices = null;
alphaSynth.VoiceAllocator.prototype._delayedNoteOffMessages = null;
alphaSynth.VoiceAllocator.prototype._messageQueue = null;
alphaSynth.VoiceAllocator.prototype._substainEnabled = null;
alphaSynth.VoiceAllocator.prototype._tracker = null;
alphaSynth.VoiceAllocator.prototype.allocate = function(message) {
	this._messageQueue.push(message);
	this.processMessages();
};
alphaSynth.VoiceAllocator.prototype.processMessages = function() {
	while(this._messageQueue.length > 0) {
		this.processMessage(this._messageQueue.shift());
	}
};
alphaSynth.VoiceAllocator.prototype.processMessage = function(message) {
	if(message.getCommand() == 144) {
		if(message.getData2() > 0) {
			this.processNoteOnMessage(message);
		}
		else {
			this.processNoteOffMessage(message);
		}
	}
	else if(message.getCommand() == 128) {
		this.processNoteOffMessage(message);
	}
};
alphaSynth.VoiceAllocator.prototype.processNoteOffMessage = function(message) {
	var velocity = message.getData2();
	velocity /= 127;
	if(this._substainEnabled) {
		this._delayedNoteOffMessages.push(message);
	}
	else {
		this._tracker.noteOff(message);
		var index = -1;
		{
			var _g1 = 0, _g = this._triggeredVoices.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(this._triggeredVoices[i].getCurrentNote() == message.getData1()) {
					index = i;
					break;
				}
			}
		}
		if(index >= 0) {
			var voice = this._triggeredVoices[index];
			voice.release(velocity);
			this._triggeredVoices.remove(this._triggeredVoices[index]);
			this._releasedVoices.push(voice);
		}
	}
};
alphaSynth.VoiceAllocator.prototype.processNoteOnMessage = function(message) {
	var velocity = message.getData2();
	velocity /= 127;
	if(this._releasedVoices.length > 0) {
		var voice = this._releasedVoices[0];
		this._releasedVoices.remove(this._releasedVoices[0]);
		voice.trigger(this._tracker.getLastNote(),message.getData1(),velocity);
		this._triggeredVoices.push(voice);
	}
	else if(this._triggeredVoices.length > 0) {
		var voice = this._triggeredVoices[0];
		this._triggeredVoices.remove(this._triggeredVoices[0]);
		voice.trigger(this._tracker.getLastNote(),message.getData1(),velocity);
		this._triggeredVoices.push(voice);
	}
	this._tracker.noteOn(message);
};
alphaSynth.VoiceAllocator.prototype.setSubstainEnabled = function(substainEnabled) {
	if(substainEnabled == this._substainEnabled) return;
	this._substainEnabled = substainEnabled;
	if(!this._substainEnabled) {
		{
			var _g = 0, _g1 = this._delayedNoteOffMessages;
			while(_g < _g1.length) {
				var noteOffMessage = _g1[_g];
				++_g;
				this._messageQueue.push(noteOffMessage);
			}
		}
		this._delayedNoteOffMessages = new Array();
		this.processMessages();
	}
};
alphaSynth.VoiceAllocator.prototype.allSoundOff = function() {
	this._messageQueue = new Array();
	this._tracker.clear();
	this._delayedNoteOffMessages = new Array();
	{
		var _g = 0, _g1 = this._triggeredVoices;
		while(_g < _g1.length) {
			var voice = _g1[_g];
			++_g;
			this._releasedVoices.push(voice);
		}
	}
	this._triggeredVoices = new Array();
};
;
