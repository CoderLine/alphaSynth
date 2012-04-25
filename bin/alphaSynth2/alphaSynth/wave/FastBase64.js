alphaSynth.wave.FastBase64 = function() { };
;
alphaSynth.wave.FastBase64._chars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
alphaSynth.wave.FastBase64.encode = function(data,progressListener) {
	var out = [];
	var i = 0;
	var j = 0;
	var r = data.getLength() % 3;
	var len = data.getLength() - r;
	var c;
	var reportCount = 0;
	var reportOffset = data.getLength() / 1000.0;
	while(i < len) {
		if(progressListener != null && reportCount > reportOffset) {
			reportCount = 0;
			progressListener(i / data.getLength());
		}
		out[j++] = alphaSynth.wave.FastBase64.encodeBytes([data.get(i++),data.get(i++),data.get(i++)]);
		reportCount += 4;
	}
	if(r == 1) {
		out[j++] = alphaSynth.wave.FastBase64.encodeBytes([data.get(i++)]);
	}
	else if(r == 2) {
		out[j++] = alphaSynth.wave.FastBase64.encodeBytes([data.get(i++),data.get(i++)]);
	}
	if(progressListener != null) progressListener(1);
	return out.join("");
};
alphaSynth.wave.FastBase64.getBaseChar = function($byte) {
	return alphaSynth.wave.FastBase64._chars[$byte];
};
alphaSynth.wave.FastBase64.encodeBytes = function(data) {
	var c;
	if(data.length == 3) {
		c = data[0] << 16 | data[1] << 8 | data[2];
		return alphaSynth.wave.FastBase64.getBaseChar(c >> 18) + alphaSynth.wave.FastBase64.getBaseChar(c >> 12 & 63) + alphaSynth.wave.FastBase64.getBaseChar(c >> 6 & 63) + alphaSynth.wave.FastBase64.getBaseChar(c & 63);
	}
	else if(data.length == 2) {
		c = data[0] << 8 | data[1];
		return alphaSynth.wave.FastBase64.getBaseChar(c >> 10) + alphaSynth.wave.FastBase64.getBaseChar(c >> 4 & 63) + alphaSynth.wave.FastBase64.getBaseChar((c & 15) << 2) + "=";
	}
	else if(data.length == 1) {
		c = data[0];
		return alphaSynth.wave.FastBase64.getBaseChar(c >> 2) + alphaSynth.wave.FastBase64.getBaseChar((c & 3) << 4) + "==";
	}
	return "";
};
;
