(function($this) {
	var $r;
	js.Lib.document = document;
	js.Lib.window = window;
	$r = onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
	return $r;
}(this))js.Lib = function() { };
;
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.onerror = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
js.Lib.eval = function(code) {
	return eval(code);
};
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
};
;
