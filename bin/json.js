JSON = {};
JSON.encodeFloat32Array = function(data, statusListener) {
	var str = "[";
	
	var dataStrings = new Array();
	var statusCounter = 0;
	var statusStep = data.length / 100;
	for(var i = 0; i < data.length; i++)
	{
		if(statusListener && statusCounter > statusStep)
		{
			statusListener(new alphaSynth.SynthesizerStatus("Encode to Json", i / data.length));
			statusCounter = 0;
		}
		dataStrings.push(data[i].toString());
		statusCounter++;
	}
	
	// TODO: Chrome crashes here, (to big string?)
	str += dataStrings.join(",");
	if(statusListener)
	{
		statusListener(new alphaSynth.SynthesizerStatus("Encode to Json", 1));
	}
	
	str += "]";
	
	return str;
}
JSON.decodeFloat32Array = function(data) {
	var untyped = eval('(' + data + ')');
	return untyped; // new Float32Array(untyped);
}