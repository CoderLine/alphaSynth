js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch( $e1 ) {
					{
						var e1 = $e1;
						{
							throw "Unable to create XMLHttpRequest object.";
						}
					}
				}
			}
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this))alphaSynth.SynthesizerStatus = function () { /* ctor */ }#abstract;
;
alphaSynth.SynthesizerStatus.prototype._statusText = "";
alphaSynth.SynthesizerStatus.prototype._progress = 0.0;
alphaSynth.SynthesizerStatus.prototype._data = null;
alphaSynth.SynthesizerStatus.prototype.getStatusText = function() {
	return this._statusText;
};
alphaSynth.SynthesizerStatus.prototype.getProgress = function() {
	return this._progress;
};
alphaSynth.SynthesizerStatus.prototype.getData = function() {
	return this._data;
};
;
