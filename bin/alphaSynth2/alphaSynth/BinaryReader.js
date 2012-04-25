alphaSynth.BinaryReader = function () { /* ctor */ }#abstract;
;
alphaSynth.BinaryReader.prototype._buffer = "";
alphaSynth.BinaryReader.prototype._pos = 0;
alphaSynth.BinaryReader.prototype.initialize = function(data) {
	this._buffer = data;
	this._pos = 0;
};
alphaSynth.BinaryReader.prototype.readBool = function() {
	return this.readByte() == 1;
};
alphaSynth.BinaryReader.prototype.readByte = function() {
	var data = this.getByte(this._pos);
	this._pos++;
	return data;
};
alphaSynth.BinaryReader.prototype.readString = function(charCount) {
	var s = "";
	{
		var _g = 0;
		while(_g < charCount) {
			var i = _g++;
			s += String.fromCharCode(this.readByte());
		}
	}
	return s;
};
alphaSynth.BinaryReader.prototype.getByte = function(index) {
	var data = this._buffer.charCodeAt(index);
	data = data & 255;
	return data;
};
alphaSynth.BinaryReader.prototype.readInt32 = function() {
	return this.readByte() << 24 | this.readByte() << 16 | this.readByte() << 8 | this.readByte();
};
alphaSynth.BinaryReader.prototype.readInt16 = function() {
	return this.readByte() << 8 | this.readByte();
};
alphaSynth.BinaryReader.prototype.getPosition = function() {
	return this._pos;
};
alphaSynth.BinaryReader.prototype.size = function() {
	return this._buffer.length;
};
;
