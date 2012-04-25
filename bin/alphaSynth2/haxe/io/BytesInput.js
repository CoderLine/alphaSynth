haxe.io.BytesInput = function () { /* ctor */ }#abstract;
;
;
for(var k in haxe.io.Input.prototype ) haxe.io.BytesInput.prototype[k] = haxe.io.Input.prototype[k];
haxe.io.BytesInput.prototype.b = null;
haxe.io.BytesInput.prototype.pos = 0;
haxe.io.BytesInput.prototype.len = 0;
haxe.io.BytesInput.prototype.readByte = function() {
	if(this.len == 0) throw new haxe.io.Eof();
	this.len--;
	return this.b[this.pos++];
};
haxe.io.BytesInput.prototype.readBytes = function(buf,pos,len) {
	if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
	if(this.len == 0 && len > 0) throw new haxe.io.Eof();
	if(this.len < len) len = this.len;
	var b1 = this.b;
	var b2 = buf.b;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
	}
	this.pos += len;
	this.len -= len;
	return len;
};
;
