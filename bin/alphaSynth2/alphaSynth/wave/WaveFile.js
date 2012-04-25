if(!alphaSynth.wave) alphaSynth.wave = {};
alphaSynth.wave.WaveFile = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.StatusReporter.prototype ) alphaSynth.wave.WaveFile.prototype[k] = alphaSynth.StatusReporter.prototype[k];
alphaSynth.wave.WaveFile.prototype._sampleRate = 0;
alphaSynth.wave.WaveFile.prototype._data = null;
alphaSynth.wave.WaveFile.prototype._position = 0;
alphaSynth.wave.WaveFile.prototype._dataUri = "";
alphaSynth.wave.WaveFile.prototype._dataString = null;
alphaSynth.wave.WaveFile.prototype._dataLength = 0;
alphaSynth.wave.WaveFile.prototype._sampleCount = 0;
alphaSynth.wave.WaveFile.prototype.writeSampleByte = function(data) {
	this.writeByte(data);
};
alphaSynth.wave.WaveFile.prototype.startDataUri = function() {
	this._dataUri = "data:audio/wav;base64,";
	this.writeWaveHeader();
	this.writeChunk1();
	this.writeChunk2();
};
alphaSynth.wave.WaveFile.prototype.getDataUri = function() {
	if(this._dataUri == null) {
		var update = $closure(this,"onProgressUpdated");
		this._dataUri = "data:audio/wav;base64," + alphaSynth.wave.FastBase64.encode(this._data,function(progress) {
			update("Generating Data URI",progress);
		});
	}
	return this._dataUri;
};
alphaSynth.wave.WaveFile.prototype.writeWaveHeader = function() {
	this.writeString("RIFF");
	this.writeInt(36 + this._sampleCount);
	this.writeString("WAVE");
};
alphaSynth.wave.WaveFile.prototype.writeChunk1 = function() {
	this.writeString("fmt ");
	this.writeInt(16);
	this.writeShort(1);
	this.writeShort(2);
	this.writeInt(this._sampleRate);
	this.writeInt(this._sampleRate * 2 * 16 >> 3);
	this.writeShort(4);
	this.writeShort(16);
};
alphaSynth.wave.WaveFile.prototype.writeChunk2 = function() {
	this.writeString("data");
	this.writeInt(this._dataLength);
};
alphaSynth.wave.WaveFile.prototype.finish = function() {
	this.getDataUri();
};
alphaSynth.wave.WaveFile.prototype.writeString = function(string) {
	var _g1 = 0, _g = string.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.writeByte(string.charCodeAt(i));
	}
};
alphaSynth.wave.WaveFile.prototype.writeInt = function(data) {
	this.writeByte(data);
	this.writeByte(data >> 8);
	this.writeByte(data >> 16);
	this.writeByte(data >> 24);
};
alphaSynth.wave.WaveFile.prototype.writeShort = function(data) {
	this.writeByte(data);
	this.writeByte(data >> 8);
};
alphaSynth.wave.WaveFile.prototype.writeByte = function($byte) {
	this._data.set(this._position,$byte & 255);
	this._position++;
};
;
