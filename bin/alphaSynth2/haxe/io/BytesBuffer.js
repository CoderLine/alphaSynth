if(typeof haxe=='undefined') haxe = {};
if(!haxe.io) haxe.io = {};
haxe.io.BytesBuffer = function () { /* ctor */ }#abstract;
;
haxe.io.BytesBuffer.prototype.b = null;
haxe.io.BytesBuffer.prototype.addByte = function($byte) {
	this.b.push($byte);
};
haxe.io.BytesBuffer.prototype.add = function(src) {
	var b1 = this.b;
	var b2 = src.b;
	{
		var _g1 = 0, _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
};
haxe.io.BytesBuffer.prototype.addBytes = function(src,pos,len) {
	if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	{
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
};
haxe.io.BytesBuffer.prototype.getBytes = function() {
	var bytes = new haxe.io.Bytes(this.b.length,this.b);
	this.b = null;
	return bytes;
};
;
