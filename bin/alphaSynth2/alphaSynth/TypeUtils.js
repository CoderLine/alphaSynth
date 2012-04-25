alphaSynth.TypeUtils = function() { };
;
alphaSynth.TypeUtils.SHORT_MAX = 32767;
alphaSynth.TypeUtils.SHORT_MIN = -32768;
alphaSynth.TypeUtils.castToShort = function($short) {
	return Std["int"](Math.max(-32768,Math.min(32767,$short)));
};
;
