alphaSynth.MessageDispatcher = function () { /* ctor */ }#abstract;
;
alphaSynth.MessageDispatcher.prototype._allocator = null;
alphaSynth.MessageDispatcher.prototype._bender = null;
alphaSynth.MessageDispatcher.prototype._processor = null;
alphaSynth.MessageDispatcher.prototype.dispatch = function(message) {
	if(message.getCommand() == 144 || message.getCommand() == 128) {
		this._allocator.allocate(message);
	}
	else if(message.getCommand() == 176) {
		this._processor.process(message.getData1(),message.getData2());
	}
	else if(message.getCommand() == 224) {
		this._bender.bendPitch(message.getData1(),message.getData2());
	}
};
;
