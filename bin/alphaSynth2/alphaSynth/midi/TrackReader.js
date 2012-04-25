alphaSynth.midi.TrackReader = function () { /* ctor */ }#abstract;
;
alphaSynth.midi.TrackReader.TRACK_MAGIC = "MTrk";
alphaSynth.midi.TrackReader.prototype._midiSequence = null;
alphaSynth.midi.TrackReader.prototype._stream = null;
alphaSynth.midi.TrackReader.prototype._newTrack = null;
alphaSynth.midi.TrackReader.prototype._trackData = null;
alphaSynth.midi.TrackReader.prototype._trackIndex = 0;
alphaSynth.midi.TrackReader.prototype.read = function(stream) {
	this._stream = stream;
	var magic = stream.readString(4);
	if(magic != "MTrk") {
		throw "invalid midi file: track not found";
	}
	var trackLength = this.getTrackLength();
	this._trackData = this.readBuffer(trackLength);
	this._newTrack = this._midiSequence.createTrack();
	this.parseTrackData();
};
alphaSynth.midi.TrackReader.prototype.getTrackLength = function() {
	return this._stream.readInt32();
};
alphaSynth.midi.TrackReader.prototype.parseTrackData = function() {
	this._trackIndex = 0;
	var tick = 0;
	var status = 0;
	var endOfTrackFound = false;
	while(!this.endOfTrack() && !endOfTrackFound) {
		var message = null;
		var data1 = -1;
		var data2 = 0;
		tick += this.readVariableLenghtValue();
		var byteValue = this.readUnsigned();
		if(byteValue >= 128) {
			status = byteValue;
		}
		else {
			data1 = byteValue;
		}
		if(status >= 192 && status <= 223) {
			if(data1 == -1) {
				data1 = this.readUnsigned();
			}
			var sms = new alphaSynth.midi.ShortMessage();
			sms.setShortMessage(status,data1,0);
			message = sms;
		}
		else if(status >= 128 && status <= 239) {
			if(data1 == -1) {
				data1 = this.readUnsigned();
			}
			data2 = this.readUnsigned();
			var sms = new alphaSynth.midi.ShortMessage();
			sms.setShortMessage(status,data1,data2);
			message = sms;
		}
		else if(status == 240 || status == 247) {
			var sysexLength = this.readVariableLenghtValue();
			var sysexData = this.readData(sysexLength);
		}
		else if(status == 255) {
			var metaType = this.readUnsigned();
			var metaLength = this.readVariableLenghtValue();
			var metaData = this.readData(metaLength);
			var mms = new alphaSynth.midi.MetaMessage();
			mms.setMetaMessage(metaType,metaData);
			message = mms;
			if(metaType == 47) {
				endOfTrackFound = true;
			}
		}
		if(message != null) this._newTrack.add(new alphaSynth.midi.MidiEvent(message,tick));
	}
};
alphaSynth.midi.TrackReader.prototype.readData = function(count) {
	var data = haxe.io.Bytes.alloc(count);
	data.blit(0,this._trackData,this._trackIndex,count);
	this._trackIndex += count;
	return data;
};
alphaSynth.midi.TrackReader.prototype.readUnsigned = function() {
	return this._trackData.b[this._trackIndex++] & 255;
};
alphaSynth.midi.TrackReader.prototype.endOfTrack = function() {
	return this._trackIndex >= this._trackData.length;
};
alphaSynth.midi.TrackReader.prototype.readVariableLenghtValue = function() {
	var result = 0;
	var currentByte;
	do {
		currentByte = this._trackData.b[this._trackIndex++];
		result = (result << 7) + (currentByte & 127);
	} while((currentByte & 128) != 0);
	return result;
};
alphaSynth.midi.TrackReader.prototype.readBuffer = function(size) {
	var buffer = haxe.io.Bytes.alloc(size);
	{
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			buffer.b[i] = this._stream.readByte() & 255;
		}
	}
	return buffer;
};
;
