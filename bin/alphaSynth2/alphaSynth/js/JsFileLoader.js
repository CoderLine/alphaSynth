if(!alphaSynth.js) alphaSynth.js = {};
alphaSynth.js.JsFileLoader = function () { /* ctor */ }#abstract;
;
alphaSynth.js.JsFileLoader.prototype.loadBinary = function(method,file,success,error) {
	var onSuccess = function(data) {
		var reader = new alphaSynth.BinaryReader();
		reader.initialize(data);
		success(reader);
	}
	var onError = function(x,e) {
		if(x.status == 0) {
			error("You are offline!!\n Please Check Your Network.");
		}
		else if(x.status == 404) {
			error("Requested URL not found.");
		}
		else if(x.status == 500) {
			error("Internel Server Error.");
		}
		else if(e == "parsererror") {
			error("Error.\nParsing JSON Request failed.");
		}
		else if(e == "timeout") {
			error("Request Time out.");
		}
	}
	var xhr = new js.XMLHttpRequest();
	xhr.open(method,file,true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			onSuccess(xhr.responseText);
		}
		else {
			onError(xhr,xhr.responseText);
		}
	}
	{
		if(xhr.overrideMimeType) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
		else null;
	}
	xhr.send(null);
};
;
;
