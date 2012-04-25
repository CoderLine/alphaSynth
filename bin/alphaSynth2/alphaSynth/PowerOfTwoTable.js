alphaSynth.PowerOfTwoTable = function() { };
;
alphaSynth.PowerOfTwoTable.TABLE_SIZE = 4096;
alphaSynth.PowerOfTwoTable._table = (function($this) {
	var $r;
	var table = new Array();
	var increment = 1.0 / 4096;
	var accumulator = 0;
	{
		var _g = 0;
		while(_g < 4096) {
			var i = _g++;
			table.push(Math.pow(2,accumulator));
			accumulator += increment;
		}
	}
	$r = table;
	return $r;
}(this));
alphaSynth.PowerOfTwoTable.getPower = function(exponent) {
	var result;
	if(exponent >= 0) {
		var whole = Std["int"](exponent);
		var fractional = exponent - whole;
		var index = Std["int"](4096 * fractional);
		result = alphaSynth.PowerOfTwoTable._table[index] * (1 << whole);
	}
	else {
		var whole = Std["int"](-exponent);
		var fractional = -exponent - whole;
		var index = Std["int"](4096 * fractional);
		result = 1.0 / (alphaSynth.PowerOfTwoTable._table[index] * (1 << whole));
	}
	return result;
};
;
