alphaSynth.midi.ShortMessage = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.midi.MidiMessage.prototype ) alphaSynth.midi.ShortMessage.prototype[k] = alphaSynth.midi.MidiMessage.prototype[k];
alphaSynth.midi.ShortMessage.DATA_MAX_VALUE = 127;
alphaSynth.midi.ShortMessage.SYSTEM_RESET = 255;
alphaSynth.midi.ShortMessage.NOTE_OFF = 128;
alphaSynth.midi.ShortMessage.NOTE_ON = 144;
alphaSynth.midi.ShortMessage.CONTROL_CHANGE = 176;
alphaSynth.midi.ShortMessage.PROGRAM_CHANGE = 192;
alphaSynth.midi.ShortMessage.PITCH_BEND = 224;
alphaSynth.midi.ShortMessage.HOLD_PEDAL1 = 64;
alphaSynth.midi.ShortMessage.ALL_SOUND_OFF = 120;
alphaSynth.midi.ShortMessage.getDataLength = function(status) {
	switch(status) {
	case 246:case 247:case 248:case 249:case 250:case 251:case 252:case 253:case 254:case 255:{
		return 0;
	}break;
	case 241:case 243:{
		return 1;
	}break;
	case 242:{
		return 2;
	}break;
	}
	switch(status & 240) {
	case 128:case 144:case 160:case 176:case 224:{
		return 2;
	}break;
	case 192:case 208:{
		return 1;
	}break;
	default:{
		throw "invalid status byte: " + Std.string(status);
	}break;
	}
	return 0;
};
alphaSynth.midi.ShortMessage.prototype.getChannel = function() {
	return this.getStatus() & 15;
};
alphaSynth.midi.ShortMessage.prototype.getCommand = function() {
	return this.getStatus() & 240;
};
alphaSynth.midi.ShortMessage.prototype.getData1 = function() {
	return this.getLength() > 1?this.getInternalData().b[1] & 255:0;
};
alphaSynth.midi.ShortMessage.prototype.getData2 = function() {
	return this.getLength() > 2?this.getInternalData().b[2] & 255:0;
};
alphaSynth.midi.ShortMessage.prototype.setShortMessage = function(status,data1,data2) {
	if(data2 == null) data2 = -1;
	if(data1 == null) data1 = -1;
	var dataLength = alphaSynth.midi.ShortMessage.getDataLength(status);
	var completeLength = dataLength + 1;
	if(this.getInternalData() == null || this.getInternalData().length < completeLength) {
		this.setInternalData(haxe.io.Bytes.alloc(completeLength));
	}
	this.getInternalData().b[0] = status & 255 & 255;
	if(this.getLength() > 1) {
		this.getInternalData().b[1] = data1 & 255 & 255;
		if(this.getLength() > 2) {
			this.getInternalData().b[2] = data2 & 255 & 255;
		}
	}
};
;
