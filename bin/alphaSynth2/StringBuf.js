StringBuf = function () { /* ctor */ }#abstract;
;
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
};
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
};
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
};
StringBuf.prototype.toString = function() {
	return this.b.join("");
};
StringBuf.prototype.b = null;
;
