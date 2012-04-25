haxe.Int32 = function() { };
;
haxe.Int32.make = function(a,b) {
	return a << 16 | b;
};
haxe.Int32.ofInt = function(x) {
	return x;
};
haxe.Int32.toInt = function(x) {
	if((x >> 30 & 1) != x >>> 31) throw "Overflow " + x;
	return x & -1;
};
haxe.Int32.toNativeInt = function(x) {
	return x;
};
haxe.Int32.add = function(a,b) {
	return a + b;
};
haxe.Int32.sub = function(a,b) {
	return a - b;
};
haxe.Int32.mul = function(a,b) {
	return a * b;
};
haxe.Int32.div = function(a,b) {
	return Std["int"](a / b);
};
haxe.Int32.mod = function(a,b) {
	return a % b;
};
haxe.Int32.shl = function(a,b) {
	return a << b;
};
haxe.Int32.shr = function(a,b) {
	return a >> b;
};
haxe.Int32.ushr = function(a,b) {
	return a >>> b;
};
haxe.Int32.and = function(a,b) {
	return a & b;
};
haxe.Int32.or = function(a,b) {
	return a | b;
};
haxe.Int32.xor = function(a,b) {
	return a ^ b;
};
haxe.Int32.neg = function(a) {
	return -a;
};
haxe.Int32.complement = function(a) {
	return ~a;
};
haxe.Int32.compare = function(a,b) {
	return a - b;
};
;
