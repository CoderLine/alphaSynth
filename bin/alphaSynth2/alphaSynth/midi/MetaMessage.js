alphaSynth.midi.MetaMessage = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.midi.MidiMessage.prototype ) alphaSynth.midi.MetaMessage.prototype[k] = alphaSynth.midi.MidiMessage.prototype[k];
alphaSynth.midi.MetaMessage.META = 255;
alphaSynth.midi.MetaMessage.prototype._dataLength = 0;
alphaSynth.midi.MetaMessage.prototype.setMetaMessage = function(type,data) {
	this._dataLength = data.length;
	this.setInternalData(haxe.io.Bytes.alloc(2 + this._dataLength));
	this.getInternalData().b[0] = 255;
	this.getInternalData().b[1] = type & 255;
	if(this._dataLength > 0) {
		this.getInternalData().blit(this.getLength() - this._dataLength,data,0,this._dataLength);
	}
};
alphaSynth.midi.MetaMessage.prototype.getType = function() {
	return this.getLength() >= 2?this.getInternalData().b[1] & 255:0;
};
alphaSynth.midi.MetaMessage.prototype.getData = function() {
	var returnData = haxe.io.Bytes.alloc(this._dataLength);
	returnData.blit(0,this.getInternalData(),this.getLength() - this._dataLength,this._dataLength);
	return returnData;
};
;
