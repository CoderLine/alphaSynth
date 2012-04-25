alphaSynth.PlatformFactory = function() { };
;
alphaSynth.PlatformFactory.getFileLoader = function() {
	return new alphaSynth.js.JsFileLoader();
};
alphaSynth.PlatformFactory.getSampleBuffer = function(length) {
	if(length == null) length = 0;
	var buffer = null;
	buffer = new alphaSynth.js.JsSampleBuffer(length);
	return buffer;
};
alphaSynth.PlatformFactory.getByteBuffer = function(length) {
	if(length == null) length = 0;
	var buffer = null;
	buffer = new alphaSynth.js.JsByteBuffer(length);
	return buffer;
};
;
