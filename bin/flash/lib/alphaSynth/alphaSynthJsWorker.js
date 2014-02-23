(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
IMap.prototype = {
	__class__: IMap
}
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
var XmlType = $hxClasses["XmlType"] = { __ename__ : ["XmlType"], __constructs__ : [] }
var Xml = function() { }
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
var as = {}
as.player = {}
as.player.ISynthPlayerListener = function() { }
$hxClasses["as.player.ISynthPlayerListener"] = as.player.ISynthPlayerListener;
as.player.ISynthPlayerListener.__name__ = ["as","player","ISynthPlayerListener"];
as.player.ISynthPlayerListener.prototype = {
	__class__: as.player.ISynthPlayerListener
}
as.AlphaSynthJsWorker = function() {
	mconsole.Console.hasConsole = false;
	mconsole.Console.start();
	mconsole.Console.removePrinter(mconsole.Console.defaultPrinter);
	mconsole.Console.addPrinter(this._printer = new as.log.LevelPrinter($bind(this,this.sendLog)));
	this._main = self;
	this._main.addEventListener("message",$bind(this,this.handleMessage),false);
	this._player = new as.player.SynthPlayer();
	this._player._events.add(this);
	this.onReady();
};
$hxClasses["as.AlphaSynthJsWorker"] = as.AlphaSynthJsWorker;
as.AlphaSynthJsWorker.__name__ = ["as","AlphaSynthJsWorker"];
as.AlphaSynthJsWorker.__interfaces__ = [as.player.ISynthPlayerListener];
as.AlphaSynthJsWorker.main = function() {
	as.AlphaSynthJsWorker.instance = new as.AlphaSynthJsWorker();
}
as.AlphaSynthJsWorker.prototype = {
	sendLog: function(level,s) {
		this._main.postMessage({ cmd : "log", level : level, message : s});
	}
	,onReadyForPlay: function() {
		this._main.postMessage({ cmd : "readyForPlay", value : this.isReadyForPlay()});
	}
	,onMidiLoadFailed: function() {
		this._main.postMessage({ cmd : "midiFileLoadFailed"});
	}
	,onMidiLoaded: function() {
		this._main.postMessage({ cmd : "midiFileLoaded"});
	}
	,onMidiLoad: function(loaded,full) {
		this._main.postMessage({ cmd : "midiLoad", loaded : loaded, full : full});
	}
	,onSoundFontLoadFailed: function() {
		this._main.postMessage({ cmd : "soundFontLoadFailed"});
	}
	,onSoundFontLoaded: function() {
		this._main.postMessage({ cmd : "soundFontLoaded"});
	}
	,onSoundFontLoad: function(loaded,full) {
		this._main.postMessage({ cmd : "soundFontLoad", loaded : loaded, full : full});
	}
	,onFinished: function() {
		this._main.postMessage({ cmd : "finished"});
	}
	,onPlayerStateChanged: function(state) {
		this._main.postMessage({ cmd : "playerStateChanged", state : state});
	}
	,onPositionChanged: function(currentTime,endTime,currentTick,endTick) {
		this._main.postMessage({ cmd : "positionChanged", currentTime : currentTime, endTime : endTime, currentTick : currentTick, endTick : endTick});
	}
	,onReady: function() {
		this._main.postMessage({ cmd : "ready"});
	}
	,setLogLevel: function(level) {
		if(level < 0 || level > 5) {
			mconsole.Console.error("invalid log level",null,{ fileName : "AlphaSynthJsWorker.hx", lineNumber : 148, className : "as.AlphaSynthJsWorker", methodName : "setLogLevel"});
			return;
		}
		this._printer.level = level;
	}
	,isMidiLoaded: function() {
		return this._player.isMidiLoaded;
	}
	,isSoundFontLoaded: function() {
		return this._player.isSoundFontLoaded;
	}
	,getState: function() {
		return this._player.state;
	}
	,loadMidiData: function(data) {
		this._player.loadMidiData(data);
	}
	,loadMidiUrl: function(url) {
		this._player.loadMidiUrl(url);
	}
	,loadSoundFontData: function(data) {
		this._player.loadSoundFontData(data);
	}
	,loadSoundFontUrl: function(url) {
		this._player.loadSoundFontUrl(url);
	}
	,setPositionTime: function(millis) {
		this._player.set_timePosition(millis);
	}
	,setPositionTick: function(tick) {
		this._player.set_tickPosition(tick);
	}
	,stop: function() {
		this._player.stop();
	}
	,playPause: function() {
		this._player.playPause();
	}
	,pause: function() {
		this._player.pause();
	}
	,play: function() {
		this._player.play();
	}
	,isReadyForPlay: function() {
		return this._player.get_isReady();
	}
	,handleMessage: function(e) {
		var data = e.data;
		switch(data.cmd) {
		case "play":
			this.play();
			break;
		case "pause":
			this.pause();
			break;
		case "isReadyForPlay":
			this._main.postMessage({ cmd : "isReadyForPlay", value : this.isReadyForPlay()});
			break;
		case "playPause":
			this.playPause();
			break;
		case "stop":
			this.stop();
			break;
		case "setPositionTick":
			this.setPositionTick(data.tick);
			break;
		case "setPositionTime":
			this.setPositionTime(data.time);
			break;
		case "loadSoundFontUrl":
			this.loadSoundFontUrl(data.url);
			break;
		case "loadSoundFontData":
			this.loadSoundFontData(data.data);
			break;
		case "loadMidiUrl":
			this.loadMidiUrl(data.url);
			break;
		case "loadMidiData":
			this.loadMidiUrl(data.data);
			break;
		case "getState":
			this._main.postMessage({ cmd : "getState", value : this.getState()});
			break;
		case "isSoundFontLoaded":
			this._main.postMessage({ cmd : "isSoundFontLoaded", value : this.isSoundFontLoaded()});
			break;
		case "isMidiLoaded":
			this._main.postMessage({ cmd : "isMidiLoaded", value : this.isMidiLoaded()});
			break;
		case "setLogLevel":
			this.setLogLevel(data.level);
			break;
		}
	}
	,__class__: as.AlphaSynthJsWorker
}
as.bank = {}
as.bank.AssetManager = function() {
	this.patchAssets = new Array();
	this.sampleAssets = new Array();
};
$hxClasses["as.bank.AssetManager"] = as.bank.AssetManager;
as.bank.AssetManager.__name__ = ["as","bank","AssetManager"];
as.bank.AssetManager.prototype = {
	findSample: function(name) {
		var _g = 0, _g1 = this.sampleAssets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.name == name) return s;
		}
		return null;
	}
	,findPatch: function(name) {
		var _g = 0, _g1 = this.patchAssets;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(p.assetName == name) return p;
		}
		return null;
	}
	,__class__: as.bank.AssetManager
}
as.bank.PatchAsset = function(name,patch) {
	this.assetName = name;
	this.patch = patch;
};
$hxClasses["as.bank.PatchAsset"] = as.bank.PatchAsset;
as.bank.PatchAsset.__name__ = ["as","bank","PatchAsset"];
as.bank.PatchAsset.prototype = {
	__class__: as.bank.PatchAsset
}
as.bank.PatchBank = function() {
	this.reset();
};
$hxClasses["as.bank.PatchBank"] = as.bank.PatchBank;
as.bank.PatchBank.__name__ = ["as","bank","PatchBank"];
as.bank.PatchBank.prototype = {
	assignPatchToBank: function(patch,bankNumber,startRange,endRange) {
		if(bankNumber < 0) return;
		if(startRange > endRange) {
			var range = startRange;
			startRange = endRange;
			endRange = range;
		}
		if(startRange < 0 || startRange >= 128) throw "startRange out of range";
		if(endRange < 0 || endRange >= 128) throw "endRange out of range";
		var patches;
		if(this._bank.exists(bankNumber)) patches = this._bank.get(bankNumber); else {
			patches = new Array(128);
			this._bank.set(bankNumber,patches);
		}
		var _g1 = startRange, _g = endRange + 1;
		while(_g1 < _g) {
			var x = _g1++;
			patches[x] = patch;
		}
	}
	,readSf2Region: function(region,globals,gens,isRelative) {
		if(!isRelative) {
			if(globals != null) {
				var _g1 = 0, _g = globals.length;
				while(_g1 < _g) {
					var x = _g1++;
					region.generators[globals[x].generatorType] = as.platform.TypeUtils.ToInt16(globals[x]._rawAmount);
				}
			}
			var _g1 = 0, _g = gens.length;
			while(_g1 < _g) {
				var x = _g1++;
				region.generators[gens[x].generatorType] = as.platform.TypeUtils.ToInt16(gens[x]._rawAmount);
			}
		} else {
			var genList = new Array();
			var _g1 = 0, _g = gens.length;
			while(_g1 < _g) {
				var i = _g1++;
				genList.push(gens[i]);
			}
			if(globals != null) {
				var _g1 = 0, _g = globals.length;
				while(_g1 < _g) {
					var x = _g1++;
					var found = false;
					var _g3 = 0, _g2 = genList.length;
					while(_g3 < _g2) {
						var i = _g3++;
						if(genList[i].generatorType == globals[x].generatorType) {
							found = true;
							break;
						}
					}
					if(!found) genList.push(globals[x]);
				}
			}
			var _g1 = 0, _g = genList.length;
			while(_g1 < _g) {
				var x = _g1++;
				var value = genList[x].generatorType;
				if(value < 5 || value == 12 || value == 45 || value == 46 || value == 47 || value == 50 || value == 54 || value == 57 || value == 58) continue; else if(value == 43 || value == 44) {
					var lo_a;
					var hi_a;
					var lo_b;
					var hi_b;
					if(as.platform.TypeUtils.IsLittleEndian) {
						lo_a = region.generators[value] & 255;
						hi_a = region.generators[value] >> 8 & 255;
						lo_b = as.platform.TypeUtils.ToInt16(genList[x]._rawAmount) & 255;
						hi_b = as.platform.TypeUtils.ToInt16(genList[x]._rawAmount) >> 8 & 255;
					} else {
						hi_a = region.generators[value] & 255;
						lo_a = region.generators[value] >> 8 & 255;
						hi_b = as.platform.TypeUtils.ToInt16(genList[x]._rawAmount) & 255;
						lo_b = as.platform.TypeUtils.ToInt16(genList[x]._rawAmount) >> 8 & 255;
					}
					lo_a = Math.max(lo_a,lo_b) | 0;
					hi_a = Math.min(hi_a,hi_b) | 0;
					if(lo_a > hi_a) throw "Invalid sf2 region. The range generators do not intersect.";
					if(as.platform.TypeUtils.IsLittleEndian) region.generators[value] = lo_a | hi_a << 8; else region.generators[value] = lo_a << 8 | hi_a;
				} else {
					var g = region.generators[value];
					region.generators[value] = g + as.platform.TypeUtils.ToInt16(genList[x]._rawAmount);
				}
			}
		}
	}
	,readSf2Instruments: function(instruments) {
		var regions = new Array(instruments.length);
		var _g1 = 0, _g = regions.length;
		while(_g1 < _g) {
			var x = _g1++;
			var globalGens = null;
			var i;
			if(instruments[x].zones[0].generators.length == 0 || instruments[x].zones[0].generators[instruments[x].zones[0].generators.length - 1].generatorType != 53) {
				globalGens = instruments[x].zones[0].generators;
				i = 1;
			} else i = 0;
			regions[x] = new Array(instruments[x].zones.length - i);
			var _g3 = 0, _g2 = regions[x].length;
			while(_g3 < _g2) {
				var j = _g3++;
				var r = new as.sf2.Sf2Region();
				r.applyDefaultValues();
				this.readSf2Region(r,globalGens,instruments[x].zones[j + i].generators,false);
				regions[x][j] = r;
			}
		}
		return regions;
	}
	,loadSf2: function(input) {
		this.reset();
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Reading SF2"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Reading SF2"],{ fileName : "PatchBank.hx", lineNumber : 108, className : "as.bank.PatchBank", methodName : "loadSf2"});
		var sf = new as.sf2.SoundFont();
		sf.load(input);
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Building patchbank"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Building patchbank"],{ fileName : "PatchBank.hx", lineNumber : 112, className : "as.bank.PatchBank", methodName : "loadSf2"});
		this.name = sf.info.bankName;
		this.comments = sf.info.comments;
		var _g1 = 0, _g = sf.presets.sampleHeaders.length;
		while(_g1 < _g) {
			var x = _g1++;
			this.assets.sampleAssets.push(new as.bank.SampleDataAsset(sf.presets.sampleHeaders[x],sf.sampleData));
		}
		var inst = this.readSf2Instruments(sf.presets.instruments);
		var _g = 0, _g1 = sf.presets.presetHeaders;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var globalGens = null;
			var i;
			if(p.zones[0].generators.length == 0 || p.zones[0].generators[p.zones[0].generators.length - 1].generatorType != 41) {
				globalGens = p.zones[0].generators;
				i = 1;
			} else i = 0;
			var regionList = new Array();
			while(i < p.zones.length) {
				var presetLoKey = 0;
				var presetHiKey = 127;
				var presetLoVel = 0;
				var presetHiVel = 127;
				if(p.zones[i].generators[0].generatorType == 43) {
					if(as.platform.TypeUtils.IsLittleEndian) {
						presetLoKey = as.platform.TypeUtils.ToInt16(p.zones[i].generators[0]._rawAmount) & 255;
						presetHiKey = as.platform.TypeUtils.ToInt16(p.zones[i].generators[0]._rawAmount) >> 8 & 255;
					} else {
						presetHiKey = as.platform.TypeUtils.ToInt16(p.zones[i].generators[0]._rawAmount) & 255;
						presetLoKey = as.platform.TypeUtils.ToInt16(p.zones[i].generators[0]._rawAmount) >> 8 & 255;
					}
					if(p.zones[i].generators.length > 1 && p.zones[i].generators[1].generatorType == 44) {
						if(as.platform.TypeUtils.IsLittleEndian) {
							presetLoVel = as.platform.TypeUtils.ToInt16(p.zones[i].generators[1]._rawAmount) & 255;
							presetHiVel = as.platform.TypeUtils.ToInt16(p.zones[i].generators[1]._rawAmount) >> 8 & 255;
						} else {
							presetHiVel = as.platform.TypeUtils.ToInt16(p.zones[i].generators[1]._rawAmount) & 255;
							presetLoVel = as.platform.TypeUtils.ToInt16(p.zones[i].generators[1]._rawAmount) >> 8 & 255;
						}
					}
				} else if(p.zones[i].generators[0].generatorType == 44) {
					if(as.platform.TypeUtils.IsLittleEndian) {
						presetLoVel = as.platform.TypeUtils.ToInt16(p.zones[i].generators[0]._rawAmount) & 255;
						presetHiVel = as.platform.TypeUtils.ToInt16(p.zones[i].generators[0]._rawAmount) >> 8 & 255;
					} else {
						presetHiVel = as.platform.TypeUtils.ToInt16(p.zones[i].generators[0]._rawAmount) & 255;
						presetLoVel = as.platform.TypeUtils.ToInt16(p.zones[i].generators[0]._rawAmount) >> 8 & 255;
					}
				}
				if(p.zones[i].generators[p.zones[i].generators.length - 1].generatorType == 41) {
					var insts = inst[as.platform.TypeUtils.ToInt16(p.zones[i].generators[p.zones[i].generators.length - 1]._rawAmount)];
					var _g3 = 0, _g2 = insts.length;
					while(_g3 < _g2) {
						var x = _g3++;
						var instLoKey;
						var instHiKey;
						var instLoVel;
						var instHiVel;
						if(as.platform.TypeUtils.IsLittleEndian) {
							instLoKey = insts[x].generators[43] & 255;
							instHiKey = insts[x].generators[43] >> 8 & 255;
							instLoVel = insts[x].generators[44] & 255;
							instHiVel = insts[x].generators[44] >> 8 & 255;
						} else {
							instHiKey = insts[x].generators[43] & 255;
							instLoKey = insts[x].generators[43] >> 8 & 255;
							instHiVel = insts[x].generators[44] & 255;
							instLoVel = insts[x].generators[44] >> 8 & 255;
						}
						if(instLoKey <= presetHiKey && presetLoKey <= instHiKey && (instLoVel <= presetHiVel && presetLoVel <= instHiVel)) {
							var r = new as.sf2.Sf2Region();
							haxe.ds._Vector.Vector_Impl_.blit(insts[x].generators,0,r.generators,0,r.generators.length);
							this.readSf2Region(r,globalGens,p.zones[i].generators,true);
							regionList.push(r);
						}
					}
				}
				i++;
			}
			var mp = new as.bank.patch.MultiPatch(p.name);
			mp.loadSf2(regionList,this.assets);
			this.assets.patchAssets.push(new as.bank.PatchAsset(mp.name,mp));
			this.assignPatchToBank(mp,p.bankNumber,p.patchNumber,p.patchNumber);
		}
	}
	,isBankLoaded: function(bankNumber) {
		return this._bank.exists(bankNumber);
	}
	,getPatchByName: function(bankNumber,name) {
		if(this._bank.exists(bankNumber)) {
			var patches = this._bank.get(bankNumber);
			var _g1 = 0, _g = patches.length;
			while(_g1 < _g) {
				var x = _g1++;
				if(patches[x] != null && patches[x].name == name) return patches[x];
			}
		}
		return null;
	}
	,getPatchByNumber: function(bankNumber,patchNumber) {
		if(this._bank.exists(bankNumber)) return this._bank.get(bankNumber)[patchNumber];
		return null;
	}
	,getBank: function(bankNumber) {
		if(this._bank.exists(bankNumber)) return this._bank.get(bankNumber);
		return null;
	}
	,getLoadedBanks: function() {
		var keys = new Array();
		var $it0 = this._bank.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			keys.push(k);
		}
		return keys;
	}
	,reset: function() {
		this._bank = new haxe.ds.IntMap();
		this.assets = new as.bank.AssetManager();
		this.name = "";
		this.comments = "";
	}
	,__class__: as.bank.PatchBank
}
as.bank.SampleDataAsset = function(sample,sampleData) {
	this.channels = 1;
	this.name = sample.name;
	this.sampleRate = sample.sampleRate;
	this.rootKey = sample.rootKey;
	this.tune = sample.tune;
	this.start = sample.start;
	this.end = sample.end;
	this.loopStart = sample.startLoop;
	this.loopEnd = sample.endLoop;
	this.sampleData = sampleData.sampleData;
};
$hxClasses["as.bank.SampleDataAsset"] = as.bank.SampleDataAsset;
as.bank.SampleDataAsset.__name__ = ["as","bank","SampleDataAsset"];
as.bank.SampleDataAsset.prototype = {
	__class__: as.bank.SampleDataAsset
}
as.bank.components = {}
as.bank.components.GeneratorStateEnum = function() { }
$hxClasses["as.bank.components.GeneratorStateEnum"] = as.bank.components.GeneratorStateEnum;
as.bank.components.GeneratorStateEnum.__name__ = ["as","bank","components","GeneratorStateEnum"];
as.bank.components.EnvelopeStateEnum = function() { }
$hxClasses["as.bank.components.EnvelopeStateEnum"] = as.bank.components.EnvelopeStateEnum;
as.bank.components.EnvelopeStateEnum.__name__ = ["as","bank","components","EnvelopeStateEnum"];
as.bank.components.LfoStateEnum = function() { }
$hxClasses["as.bank.components.LfoStateEnum"] = as.bank.components.LfoStateEnum;
as.bank.components.LfoStateEnum.__name__ = ["as","bank","components","LfoStateEnum"];
as.bank.components.WaveformEnum = function() { }
$hxClasses["as.bank.components.WaveformEnum"] = as.bank.components.WaveformEnum;
as.bank.components.WaveformEnum.__name__ = ["as","bank","components","WaveformEnum"];
as.bank.components.InterpolationEnum = function() { }
$hxClasses["as.bank.components.InterpolationEnum"] = as.bank.components.InterpolationEnum;
as.bank.components.InterpolationEnum.__name__ = ["as","bank","components","InterpolationEnum"];
as.bank.components.LoopModeEnum = function() { }
$hxClasses["as.bank.components.LoopModeEnum"] = as.bank.components.LoopModeEnum;
as.bank.components.LoopModeEnum.__name__ = ["as","bank","components","LoopModeEnum"];
as.bank.components.FilterTypeEnum = function() { }
$hxClasses["as.bank.components.FilterTypeEnum"] = as.bank.components.FilterTypeEnum;
as.bank.components.FilterTypeEnum.__name__ = ["as","bank","components","FilterTypeEnum"];
as.bank.components.Envelope = function() {
	this.value = 0;
	this.depth = 0;
	this._stages = new Array(7);
	var _g1 = 0, _g = this._stages.length;
	while(_g1 < _g) {
		var x = _g1++;
		this._stages[x] = new as.bank.components.EnvelopeStage();
	}
	this._stages[0].graph = as.util.Tables.envelopeTables(0);
	this._stages[2].graph = as.util.Tables.envelopeTables(0);
	this._stages[3].reverse = true;
	this._stages[4].graph = as.util.Tables.envelopeTables(0);
	this._stages[5].reverse = true;
	this._stages[6].graph = as.util.Tables.envelopeTables(0);
	this._stages[6].time = 100000000;
	this.currentStage = 0;
	while(this._stages[this.currentStage].time == 0) this.currentStage++;
	this._stage = this._stages[this.currentStage];
};
$hxClasses["as.bank.components.Envelope"] = as.bank.components.Envelope;
as.bank.components.Envelope.__name__ = ["as","bank","components","Envelope"];
as.bank.components.Envelope.prototype = {
	release: function() {
		if(this.value <= 1e-5) {
			this._index = 0;
			this.currentStage = 6;
			this._stage = this._stages[this.currentStage];
		} else if(this.currentStage < 5) {
			this._index = 0;
			this.currentStage = 5;
			this._stage = this._stages[this.currentStage];
			this._stage.scale = this.value;
		}
	}
	,increment: function(samples) {
		do {
			var neededSamples = this._stage.time - this._index;
			if(neededSamples > samples) {
				this._index += samples;
				samples = 0;
			} else {
				this._index = 0;
				if(this.currentStage != 6) do this._stage = this._stages[++this.currentStage]; while(this._stage.time == 0);
				samples -= neededSamples;
			}
		} while(samples > 0);
		var i = this._stage.graph.length * (this._index / js.Boot.__cast(this._stage.time , Float)) | 0;
		if(this._stage.reverse) this.value = (1 - this._stage.graph[i]) * this._stage.scale + this._stage.offset; else this.value = this._stage.graph[i] * this._stage.scale + this._stage.offset;
	}
	,quickSetupDAHDSR: function(sampleRate,note,keyNumToHold,keyNumToDecay,susMod,envelopeInfo) {
		this.depth = envelopeInfo.depth;
		this._stages[0].offset = 0;
		this._stages[0].scale = 0;
		this._stages[0].time = Math.max(0,sampleRate * envelopeInfo.delayTime | 0) | 0;
		this._stages[1].offset = envelopeInfo.startLevel;
		this._stages[1].scale = envelopeInfo.peakLevel - envelopeInfo.startLevel;
		this._stages[1].time = Math.max(0,sampleRate * envelopeInfo.attackTime | 0) | 0;
		this._stages[1].graph = as.util.Tables.envelopeTables(envelopeInfo.attackGraph);
		this._stages[2].offset = 0;
		this._stages[2].scale = envelopeInfo.peakLevel;
		this._stages[2].time = Math.max(0,sampleRate * envelopeInfo.holdTime * Math.pow(2,(60 - note) * keyNumToHold / 1200.0) | 0) | 0;
		this._stages[3].offset = envelopeInfo.sustainLevel * susMod;
		this._stages[3].scale = envelopeInfo.peakLevel - envelopeInfo.sustainLevel * susMod;
		this._stages[3].time = Math.max(0,sampleRate * envelopeInfo.decayTime * Math.pow(2,(60 - note) * keyNumToDecay / 1200.0) | 0) | 0;
		this._stages[3].graph = as.util.Tables.envelopeTables(envelopeInfo.decayGraph);
		this._stages[4].offset = 0;
		this._stages[4].scale = envelopeInfo.sustainLevel * susMod;
		this._stages[4].time = sampleRate * envelopeInfo.sustainTime | 0;
		this._stages[5].offset = 0;
		this._stages[5].scale = this._stages[3].time == 0 && this._stages[4].time == 0?envelopeInfo.peakLevel:this._stages[4].scale;
		this._stages[5].time = Math.max(0,sampleRate * envelopeInfo.releaseTime | 0) | 0;
		this._stages[5].graph = as.util.Tables.envelopeTables(envelopeInfo.releaseGraph);
		this._index = 0;
		this.value = 0;
		this.currentStage = 0;
		while(this._stages[this.currentStage].time == 0) this.currentStage++;
		this._stage = this._stages[this.currentStage];
	}
	,__class__: as.bank.components.Envelope
}
as.bank.components.EnvelopeStage = function() {
	this.time = 0;
	this.graph = null;
	this.scale = 0;
	this.offset = 0;
	this.reverse = false;
};
$hxClasses["as.bank.components.EnvelopeStage"] = as.bank.components.EnvelopeStage;
as.bank.components.EnvelopeStage.__name__ = ["as","bank","components","EnvelopeStage"];
as.bank.components.EnvelopeStage.prototype = {
	__class__: as.bank.components.EnvelopeStage
}
as.bank.components.Filter = function() {
	this._a1 = 0;
	this._a2 = 0;
	this._b1 = 0;
	this._b2 = 0;
	this._m1 = 0;
	this._m2 = 0;
	this._m3 = 0;
	this._lastFc = 0;
	this.filterMethod = 0;
	this.cutOff = 0;
	this.resonance = 0;
};
$hxClasses["as.bank.components.Filter"] = as.bank.components.Filter;
as.bank.components.Filter.__name__ = ["as","bank","components","Filter"];
as.bank.components.Filter.prototype = {
	configOnePoleLowpass: function(fc) {
		this._a1 = 1.0 - Math.exp(-2. * Math.PI * fc);
	}
	,configBiquadHighpass: function(fc,q) {
		var w0 = as.util.SynthConstants.TwoPi * fc;
		var cosw0 = Math.cos(w0);
		var alpha = Math.sin(w0) / (2.0 * q);
		var a0inv = 1.0 / (1.0 + alpha);
		var qinv = 1.0 / Math.sqrt(q);
		this._a1 = -2. * cosw0 * a0inv;
		this._a2 = (1.0 - alpha) * a0inv;
		this._b1 = (-1. - cosw0) * a0inv * qinv;
		this._b2 = (1.0 + cosw0) * a0inv * qinv * 0.5;
	}
	,configBiquadLowpass: function(fc,q) {
		var w0 = as.util.SynthConstants.TwoPi * fc;
		var cosw0 = Math.cos(w0);
		var alpha = Math.sin(w0) / (2.0 * q);
		var a0inv = 1.0 / (1.0 + alpha);
		this._a1 = -2. * cosw0 * a0inv;
		this._a2 = (1.0 - alpha) * a0inv;
		this._b1 = (1.0 - cosw0) * a0inv * (1.0 / Math.sqrt(q));
		this._b2 = this._b1 * 0.5;
	}
	,applyFilterMulti: function(data) {
		var _g1 = 0, _g = data.length;
		while(_g1 < _g) {
			var x = _g1++;
			data[x] = this.applyFilterSingle(data[x]);
		}
	}
	,applyFilterSingle: function(sample) {
		var _g = this;
		switch(_g.filterMethod) {
		case 2:case 1:
			this._m3 = sample - this._a1 * this._m1 - this._a2 * this._m2;
			sample = this._b2 * (this._m3 + this._m2) + this._b1 * this._m1;
			this._m2 = this._m1;
			this._m1 = this._m3;
			return sample;
		case 3:
			this._m1 += this._a1 * (sample - this._m1);
			return this._m1;
		default:
			return 0;
		}
	}
	,updateCoefficients: function(fc,q) {
		fc = as.synthesis.SynthHelper.clampF(fc,0,.49);
		if(Math.abs(this._lastFc - fc) > .001) {
			var _g = this;
			switch(_g.filterMethod) {
			case 1:
				this.configBiquadLowpass(fc,q);
				break;
			case 2:
				this.configBiquadHighpass(fc,q);
				break;
			case 3:
				this.configOnePoleLowpass(fc);
				break;
			}
			this._lastFc = fc;
		}
	}
	,quickSetup: function(sampleRate,note,velocity,filterInfo) {
		this.cutOff = filterInfo.cutOff;
		this.resonance = filterInfo.resonance;
		this.filterMethod = filterInfo.filterMethod;
		this._lastFc = -1000;
		this._m1 = 0;
		this._m2 = 0;
		this._m3 = 0;
		if(this.filterMethod == 0 || this.cutOff <= 0.0 || this.resonance <= 0.0) this.filterMethod = 0; else {
			var fc = this.cutOff * as.synthesis.SynthHelper.centsToPitch((note - filterInfo.rootKey) * filterInfo.keyTrack + (velocity * filterInfo.velTrack | 0));
			this.updateCoefficients(as.synthesis.SynthHelper.clampF(fc / sampleRate,0,.5),this.resonance);
		}
	}
	,disable: function() {
		this.filterMethod = 0;
	}
	,get_enabled: function() {
		return this.filterMethod != 0;
	}
	,__class__: as.bank.components.Filter
}
as.bank.components.Lfo = function() {
	this._lfoState = 0;
	this._generator = as.bank.components.generators.DefaultGenerators.defaultSine();
	this._delayTime = 0;
	this._increment = 0;
	this._phase = 0;
	this.frequency = 0;
	this.currentState = 0;
	this.value = 0;
	this.depth = 0;
};
$hxClasses["as.bank.components.Lfo"] = as.bank.components.Lfo;
as.bank.components.Lfo.__name__ = ["as","bank","components","Lfo"];
as.bank.components.Lfo.prototype = {
	reset: function() {
		this.value = 0;
		if(this._delayTime > 0) {
			this._phase = this._delayTime;
			this._lfoState = 0;
		} else {
			this._phase = 0.0;
			this._lfoState = 1;
		}
	}
	,getNext: function() {
		if(this._lfoState == 0) {
			this._phase--;
			if(this._phase <= 0.0) {
				this._phase = this._generator.loopStartPhase;
				this._lfoState = 1;
			}
			return 0.0;
		} else {
			this._phase += this._increment;
			if(this._phase >= this._generator.loopEndPhase) this._phase = this._generator.loopStartPhase + (this._phase - this._generator.loopEndPhase) % (this._generator.loopEndPhase - this._generator.loopStartPhase);
			return this._generator.getValue(this._phase);
		}
	}
	,increment: function(amount) {
		if(this._lfoState == 0) {
			this._phase -= amount;
			if(this._phase <= 0.0) {
				this._phase = this._generator.loopStartPhase + this._increment * -this._phase;
				this.value = this._generator.getValue(this._phase);
				this._lfoState = 1;
			}
		} else {
			this._phase += this._increment * amount;
			if(this._phase >= this._generator.loopEndPhase) this._phase = this._generator.loopStartPhase + (this._phase - this._generator.loopEndPhase) % (this._generator.loopEndPhase - this._generator.loopStartPhase);
			this.value = this._generator.getValue(this._phase);
		}
	}
	,quickSetup: function(sampleRate,lfoInfo) {
		this._generator = lfoInfo.generator;
		this._delayTime = sampleRate * lfoInfo.delayTime | 0;
		this.frequency = lfoInfo.frequency;
		this._increment = this._generator.period * this.frequency / sampleRate;
		this.depth = lfoInfo.depth;
		this.reset();
	}
	,__class__: as.bank.components.Lfo
}
as.bank.components.generators = {}
as.bank.components.generators.DefaultGenerators = function() { }
$hxClasses["as.bank.components.generators.DefaultGenerators"] = as.bank.components.generators.DefaultGenerators;
as.bank.components.generators.DefaultGenerators.__name__ = ["as","bank","components","generators","DefaultGenerators"];
as.bank.components.generators.DefaultGenerators.defaultSine = function() {
	if(as.bank.components.generators.DefaultGenerators._defaultSine == null) as.bank.components.generators.DefaultGenerators._defaultSine = new as.bank.components.generators.SineGenerator(new as.bank.descriptors.GeneratorDescriptor());
	return as.bank.components.generators.DefaultGenerators._defaultSine;
}
as.bank.components.generators.DefaultGenerators.defaultSaw = function() {
	if(as.bank.components.generators.DefaultGenerators._defaultSaw == null) as.bank.components.generators.DefaultGenerators._defaultSaw = new as.bank.components.generators.SawGenerator(new as.bank.descriptors.GeneratorDescriptor());
	return as.bank.components.generators.DefaultGenerators._defaultSaw;
}
as.bank.components.generators.DefaultGenerators.defaultSquare = function() {
	if(as.bank.components.generators.DefaultGenerators._defaultSquare == null) as.bank.components.generators.DefaultGenerators._defaultSquare = new as.bank.components.generators.SquareGenerator(new as.bank.descriptors.GeneratorDescriptor());
	return as.bank.components.generators.DefaultGenerators._defaultSquare;
}
as.bank.components.generators.DefaultGenerators.defaultTriangle = function() {
	if(as.bank.components.generators.DefaultGenerators._defaultTriangle == null) as.bank.components.generators.DefaultGenerators._defaultTriangle = new as.bank.components.generators.TriangleGenerator(new as.bank.descriptors.GeneratorDescriptor());
	return as.bank.components.generators.DefaultGenerators._defaultTriangle;
}
as.bank.components.generators.Generator = function(description) {
	this.loopMode = description.loopMethod;
	this.loopStartPhase = description.loopStartPhase;
	this.loopEndPhase = description.loopEndPhase;
	this.startPhase = description.startPhase;
	this.endPhase = description.endPhase;
	this.offset = description.offset;
	this.period = description.period;
	this.frequency = 0;
	this.rootKey = description.rootkey;
	this.keyTrack = description.keyTrack;
	this.velocityTrack = description.velTrack;
	this.tune = description.tune;
};
$hxClasses["as.bank.components.generators.Generator"] = as.bank.components.generators.Generator;
as.bank.components.generators.Generator.__name__ = ["as","bank","components","generators","Generator"];
as.bank.components.generators.Generator.prototype = {
	getValues: function(generatorParams,blockBuffer,increment) {
		var proccessed = 0;
		do {
			var samplesAvailable = Math.ceil((generatorParams.currentEnd - generatorParams.phase) / increment) | 0;
			if(samplesAvailable > blockBuffer.length - proccessed) while(proccessed < blockBuffer.length) {
				blockBuffer[proccessed++] = this.getValue(generatorParams.phase);
				generatorParams.phase += increment;
			} else {
				var endProccessed = proccessed + samplesAvailable;
				while(proccessed < endProccessed) {
					blockBuffer[proccessed++] = this.getValue(generatorParams.phase);
					generatorParams.phase += increment;
				}
				switch(generatorParams.currentState) {
				case 0:
					generatorParams.currentStart = this.loopStartPhase;
					generatorParams.currentEnd = this.loopEndPhase;
					generatorParams.currentState = 1;
					break;
				case 1:
					generatorParams.phase += generatorParams.currentStart - generatorParams.currentEnd;
					break;
				case 2:
					generatorParams.currentState = 3;
					while(proccessed < blockBuffer.length) blockBuffer[proccessed++] = 0;
					break;
				}
			}
		} while(proccessed < blockBuffer.length);
	}
	,getValue: function(phase) {
		throw "abstract";
		return 0;
	}
	,release: function(generatorParams) {
		if(this.loopMode == 3) {
			generatorParams.currentState = 2;
			generatorParams.currentStart = this.startPhase;
			generatorParams.currentEnd = this.endPhase;
		}
	}
	,__class__: as.bank.components.generators.Generator
}
as.bank.components.generators.GeneratorParameters = function() {
	this.phase = 0;
	this.currentStart = 0;
	this.currentEnd = 0;
	this.currentState = 0;
};
$hxClasses["as.bank.components.generators.GeneratorParameters"] = as.bank.components.generators.GeneratorParameters;
as.bank.components.generators.GeneratorParameters.__name__ = ["as","bank","components","generators","GeneratorParameters"];
as.bank.components.generators.GeneratorParameters.prototype = {
	quickSetup: function(generator) {
		this.currentStart = generator.startPhase;
		this.phase = this.currentStart + generator.offset;
		switch(generator.loopMode) {
		case 2:case 3:
			if(this.phase >= generator.endPhase) this.currentState = 3; else if(this.phase >= generator.loopEndPhase) {
				this.currentState = 2;
				this.currentEnd = generator.endPhase;
			} else if(this.phase >= generator.loopStartPhase) {
				this.currentState = 1;
				this.currentEnd = generator.loopEndPhase;
				this.currentStart = generator.loopStartPhase;
			} else {
				this.currentState = 0;
				this.currentEnd = generator.loopStartPhase;
			}
			break;
		default:
			this.currentEnd = generator.endPhase;
			if(this.phase >= this.currentEnd) this.currentState = 3; else this.currentState = 2;
		}
	}
	,__class__: as.bank.components.generators.GeneratorParameters
}
as.bank.components.generators.SampleGenerator = function() {
	as.bank.components.generators.Generator.call(this,new as.bank.descriptors.GeneratorDescriptor());
};
$hxClasses["as.bank.components.generators.SampleGenerator"] = as.bank.components.generators.SampleGenerator;
as.bank.components.generators.SampleGenerator.__name__ = ["as","bank","components","generators","SampleGenerator"];
as.bank.components.generators.SampleGenerator.__super__ = as.bank.components.generators.Generator;
as.bank.components.generators.SampleGenerator.prototype = $extend(as.bank.components.generators.Generator.prototype,{
	interpolate: function(generatorParams,blockBuffer,increment,start,end) {
		var _end = generatorParams.currentState == 1?this.loopEndPhase - 1:this.endPhase - 1;
		var index;
		var s0;
		var s1;
		var s2;
		var s3;
		var mu;
		var _g = as.util.SynthConstants;
		switch(_g.InterpolationMode) {
		case 1:
			while(start < end && generatorParams.phase < _end) {
				index = generatorParams.phase | 0;
				s1 = this.samples[index];
				s2 = this.samples[index + 1];
				mu = generatorParams.phase - index;
				blockBuffer[start++] = s1 + mu * (s2 - s1);
				generatorParams.phase += increment;
			}
			while(start < end) {
				index = generatorParams.phase | 0;
				s1 = this.samples[index];
				if(generatorParams.currentState == 1) s2 = this.samples[generatorParams.currentStart | 0]; else s2 = s1;
				mu = generatorParams.phase - index | 0;
				blockBuffer[start++] = s1 + mu * (s2 - s1);
				generatorParams.phase += increment;
			}
			break;
		case 2:
			while(start < end && generatorParams.phase < _end) {
				index = generatorParams.phase | 0;
				s1 = this.samples[index];
				s2 = this.samples[index + 1];
				mu = (1 - Math.cos((generatorParams.phase - index) * Math.PI)) * 0.5;
				blockBuffer[start++] = s1 * (1 - mu) + s2 * mu;
				generatorParams.phase += increment;
			}
			while(start < end) {
				index = generatorParams.phase | 0;
				s1 = this.samples[index];
				if(generatorParams.currentState == 1) s2 = this.samples[generatorParams.currentStart | 0]; else s2 = s1;
				mu = (1 - Math.cos((generatorParams.phase - index) * Math.PI)) * 0.5;
				blockBuffer[start++] = s1 * (1 - mu) + s2 * mu;
				generatorParams.phase += increment;
			}
			break;
		case 3:
			_end = generatorParams.currentState == 1?this.loopStartPhase + 1:this.startPhase + 1;
			while(start < end && generatorParams.phase < _end) {
				index = generatorParams.phase | 0;
				if(generatorParams.currentState == 1) s0 = this.samples[generatorParams.currentEnd - 1 | 0]; else s0 = this.samples[index];
				s1 = this.samples[index];
				s2 = this.samples[index + 1];
				s3 = this.samples[index + 2];
				mu = generatorParams.phase - index;
				blockBuffer[start++] = (-0.5 * s0 + 1.5 * s1 - 1.5 * s2 + 0.5 * s3) * mu * mu * mu + (s0 - 2.5 * s1 + 2 * s2 - 0.5 * s3) * mu * mu + (-0.5 * s0 + 0.5 * s2) * mu + s1;
				generatorParams.phase += increment;
			}
			_end = generatorParams.currentState == 1?this.loopEndPhase - 2:this.endPhase - 2;
			while(start < end && generatorParams.phase < _end) {
				index = generatorParams.phase | 0;
				s0 = this.samples[index - 1];
				s1 = this.samples[index];
				s2 = this.samples[index + 1];
				s3 = this.samples[index + 2];
				mu = generatorParams.phase - index;
				blockBuffer[start++] = (-0.5 * s0 + 1.5 * s1 - 1.5 * s2 + 0.5 * s3) * mu * mu * mu + (s0 - 2.5 * s1 + 2 * s2 - 0.5 * s3) * mu * mu + (-0.5 * s0 + 0.5 * s2) * mu + s1;
				generatorParams.phase += increment;
			}
			_end += 1;
			while(start < end) {
				index = generatorParams.phase | 0;
				s0 = this.samples[index - 1];
				s1 = this.samples[index];
				if(generatorParams.phase < _end) {
					s2 = this.samples[index + 1];
					if(generatorParams.currentState == 1) s3 = this.samples[generatorParams.currentStart | 0]; else s3 = s2;
				} else if(generatorParams.currentState == 1) {
					s2 = this.samples[generatorParams.currentStart | 0];
					s3 = this.samples[generatorParams.currentStart + 1 | 0];
				} else {
					s2 = s1;
					s3 = s1;
				}
				mu = generatorParams.phase - index;
				blockBuffer[start++] = (-0.5 * s0 + 1.5 * s1 - 1.5 * s2 + 0.5 * s3) * mu * mu * mu + (s0 - 2.5 * s1 + 2 * s2 - 0.5 * s3) * mu * mu + (-0.5 * s0 + 0.5 * s2) * mu + s1;
				generatorParams.phase += increment;
			}
			break;
		default:
			while(start < end) {
				blockBuffer[start++] = this.samples[generatorParams.phase | 0];
				generatorParams.phase += increment;
			}
		}
	}
	,getValues: function(generatorParams,blockBuffer,increment) {
		var proccessed = 0;
		do {
			var samplesAvailable = Math.ceil((generatorParams.currentEnd - generatorParams.phase) / increment) | 0;
			if(samplesAvailable > blockBuffer.length - proccessed) {
				this.interpolate(generatorParams,blockBuffer,increment,proccessed,blockBuffer.length);
				return;
			} else {
				var endProccessed = proccessed + samplesAvailable;
				this.interpolate(generatorParams,blockBuffer,increment,proccessed,endProccessed);
				proccessed = endProccessed;
				switch(generatorParams.currentState) {
				case 0:
					generatorParams.currentStart = this.loopStartPhase;
					generatorParams.currentEnd = this.loopEndPhase;
					generatorParams.currentState = 1;
					break;
				case 1:
					generatorParams.phase += generatorParams.currentStart - generatorParams.currentEnd;
					break;
				case 2:
					generatorParams.currentState = 3;
					while(proccessed < blockBuffer.length) blockBuffer[proccessed++] = 0;
					break;
				}
			}
		} while(proccessed < blockBuffer.length);
	}
	,getValue: function(phase) {
		return this.samples[phase | 0];
	}
	,__class__: as.bank.components.generators.SampleGenerator
});
as.bank.components.generators.SawGenerator = function(description) {
	as.bank.components.generators.Generator.call(this,description);
	if(this.endPhase < 0) this.endPhase = 1;
	if(this.startPhase < 0) this.startPhase = 0;
	if(this.loopEndPhase < 0) this.loopEndPhase = this.endPhase;
	if(this.loopStartPhase < 0) this.loopStartPhase = this.startPhase;
	if(this.period < 0) this.period = 1;
	if(this.rootKey < 0) this.rootKey = 69;
	this.frequency = 440;
};
$hxClasses["as.bank.components.generators.SawGenerator"] = as.bank.components.generators.SawGenerator;
as.bank.components.generators.SawGenerator.__name__ = ["as","bank","components","generators","SawGenerator"];
as.bank.components.generators.SawGenerator.__super__ = as.bank.components.generators.Generator;
as.bank.components.generators.SawGenerator.prototype = $extend(as.bank.components.generators.Generator.prototype,{
	getValue: function(phase) {
		return 2.0 * (phase - Math.floor(phase + 0.5));
	}
	,__class__: as.bank.components.generators.SawGenerator
});
as.bank.components.generators.SineGenerator = function(description) {
	as.bank.components.generators.Generator.call(this,description);
	if(this.endPhase < 0) this.endPhase = as.util.SynthConstants.TwoPi;
	if(this.startPhase < 0) this.startPhase = 0;
	if(this.loopEndPhase < 0) this.loopEndPhase = this.endPhase;
	if(this.loopStartPhase < 0) this.loopStartPhase = this.startPhase;
	if(this.period < 0) this.period = as.util.SynthConstants.TwoPi;
	if(this.rootKey < 0) this.rootKey = 69;
	this.frequency = 440;
};
$hxClasses["as.bank.components.generators.SineGenerator"] = as.bank.components.generators.SineGenerator;
as.bank.components.generators.SineGenerator.__name__ = ["as","bank","components","generators","SineGenerator"];
as.bank.components.generators.SineGenerator.__super__ = as.bank.components.generators.Generator;
as.bank.components.generators.SineGenerator.prototype = $extend(as.bank.components.generators.Generator.prototype,{
	getValue: function(phase) {
		return Math.sin(phase);
	}
	,__class__: as.bank.components.generators.SineGenerator
});
as.bank.components.generators.SquareGenerator = function(description) {
	as.bank.components.generators.Generator.call(this,description);
	if(this.endPhase < 0) this.endPhase = as.util.SynthConstants.TwoPi;
	if(this.startPhase < 0) this.startPhase = 0;
	if(this.loopEndPhase < 0) this.loopEndPhase = this.endPhase;
	if(this.loopStartPhase < 0) this.loopStartPhase = this.startPhase;
	if(this.period < 0) this.period = as.util.SynthConstants.TwoPi;
	if(this.rootKey < 0) this.rootKey = 69;
	this.frequency = 440;
};
$hxClasses["as.bank.components.generators.SquareGenerator"] = as.bank.components.generators.SquareGenerator;
as.bank.components.generators.SquareGenerator.__name__ = ["as","bank","components","generators","SquareGenerator"];
as.bank.components.generators.SquareGenerator.__super__ = as.bank.components.generators.Generator;
as.bank.components.generators.SquareGenerator.prototype = $extend(as.bank.components.generators.Generator.prototype,{
	getValue: function(phase) {
		var v = Math.sin(phase);
		if(v > 0) return 1;
		if(v < 0) return -1;
		return 0;
	}
	,__class__: as.bank.components.generators.SquareGenerator
});
as.bank.components.generators.TriangleGenerator = function(description) {
	as.bank.components.generators.Generator.call(this,description);
	if(this.endPhase < 0) this.endPhase = 1.25;
	if(this.startPhase < 0) this.startPhase = 0.25;
	if(this.loopEndPhase < 0) this.loopEndPhase = this.endPhase;
	if(this.loopStartPhase < 0) this.loopStartPhase = this.startPhase;
	if(this.period < 0) this.period = 1;
	if(this.rootKey < 0) this.rootKey = 69;
	this.frequency = 440;
};
$hxClasses["as.bank.components.generators.TriangleGenerator"] = as.bank.components.generators.TriangleGenerator;
as.bank.components.generators.TriangleGenerator.__name__ = ["as","bank","components","generators","TriangleGenerator"];
as.bank.components.generators.TriangleGenerator.__super__ = as.bank.components.generators.Generator;
as.bank.components.generators.TriangleGenerator.prototype = $extend(as.bank.components.generators.Generator.prototype,{
	getValue: function(phase) {
		return Math.abs(phase - Math.floor(phase + 0.5)) * 4.0 - 1.0;
	}
	,__class__: as.bank.components.generators.TriangleGenerator
});
as.bank.components.generators.WhiteNoiseGenerator = function(description) {
	as.bank.components.generators.Generator.call(this,description);
	if(this.endPhase < 0) this.endPhase = 1;
	if(this.startPhase < 0) this.startPhase = 0;
	if(this.loopEndPhase < 0) this.loopEndPhase = this.endPhase;
	if(this.loopStartPhase < 0) this.loopStartPhase = this.startPhase;
	if(this.period < 0) this.period = 1;
	if(this.rootKey < 0) this.rootKey = 69;
	this.frequency = 440;
};
$hxClasses["as.bank.components.generators.WhiteNoiseGenerator"] = as.bank.components.generators.WhiteNoiseGenerator;
as.bank.components.generators.WhiteNoiseGenerator.__name__ = ["as","bank","components","generators","WhiteNoiseGenerator"];
as.bank.components.generators.WhiteNoiseGenerator.__super__ = as.bank.components.generators.Generator;
as.bank.components.generators.WhiteNoiseGenerator.prototype = $extend(as.bank.components.generators.Generator.prototype,{
	getValue: function(phase) {
		return Math.random() * 2.0 - 1.0;
	}
	,__class__: as.bank.components.generators.WhiteNoiseGenerator
});
as.bank.descriptors = {}
as.bank.descriptors.EnvelopeDescriptor = function() {
	this.delayTime = 0;
	this.attackTime = 0;
	this.attackGraph = 1;
	this.holdTime = 0;
	this.decayTime = 0;
	this.decayGraph = 1;
	this.sustainTime = 3600;
	this.releaseTime = 0;
	this.releaseGraph = 1;
	this.sustainLevel = 0;
	this.peakLevel = 1;
	this.startLevel = 0;
	this.depth = 1;
	this.vel2Delay = 0;
	this.vel2Attack = 0;
	this.vel2Hold = 0;
	this.vel2Decay = 0;
	this.vel2Sustain = 0;
	this.vel2Release = 0;
	this.vel2Depth = 0;
};
$hxClasses["as.bank.descriptors.EnvelopeDescriptor"] = as.bank.descriptors.EnvelopeDescriptor;
as.bank.descriptors.EnvelopeDescriptor.__name__ = ["as","bank","descriptors","EnvelopeDescriptor"];
as.bank.descriptors.EnvelopeDescriptor.prototype = {
	__class__: as.bank.descriptors.EnvelopeDescriptor
}
as.bank.descriptors.FilterDescriptor = function() {
	this.filterMethod = 0;
	this.cutOff = -1;
	this.resonance = 1;
	this.rootKey = 60;
	this.keyTrack = 0;
	this.velTrack = 0;
};
$hxClasses["as.bank.descriptors.FilterDescriptor"] = as.bank.descriptors.FilterDescriptor;
as.bank.descriptors.FilterDescriptor.__name__ = ["as","bank","descriptors","FilterDescriptor"];
as.bank.descriptors.FilterDescriptor.prototype = {
	__class__: as.bank.descriptors.FilterDescriptor
}
as.bank.descriptors.GeneratorDescriptor = function() {
	this.applyDefault();
};
$hxClasses["as.bank.descriptors.GeneratorDescriptor"] = as.bank.descriptors.GeneratorDescriptor;
as.bank.descriptors.GeneratorDescriptor.__name__ = ["as","bank","descriptors","GeneratorDescriptor"];
as.bank.descriptors.GeneratorDescriptor.prototype = {
	applyDefault: function() {
		this.loopMethod = 0;
		this.samplerType = 0;
		this.assetName = "null";
		this.endPhase = -1;
		this.startPhase = -1;
		this.loopEndPhase = -1;
		this.loopStartPhase = -1;
		this.offset = 0;
		this.period = -1;
		this.rootkey = -1;
		this.keyTrack = 100;
		this.velTrack = 0;
		this.tune = 0;
	}
	,__class__: as.bank.descriptors.GeneratorDescriptor
}
as.bank.descriptors.LfoDescriptor = function() {
	this.delayTime = 0;
	this.frequency = 8.0;
	this.depth = 1;
	this.generator = as.bank.components.generators.DefaultGenerators.defaultSine();
};
$hxClasses["as.bank.descriptors.LfoDescriptor"] = as.bank.descriptors.LfoDescriptor;
as.bank.descriptors.LfoDescriptor.__name__ = ["as","bank","descriptors","LfoDescriptor"];
as.bank.descriptors.LfoDescriptor.prototype = {
	__class__: as.bank.descriptors.LfoDescriptor
}
as.bank.patch = {}
as.bank.patch.Patch = function(name) {
	this.name = name;
	this.generatorInfo = new Array(4);
	this.envelopeInfo = new Array(4);
	this.lfoInfo = new Array(4);
	this.filterInfo = new Array(4);
	this.exclusiveGroup = 0;
	this.exclusiveGroupTarget = 0;
};
$hxClasses["as.bank.patch.Patch"] = as.bank.patch.Patch;
as.bank.patch.Patch.__name__ = ["as","bank","patch","Patch"];
as.bank.patch.Patch.prototype = {
	stop: function(voiceparams) {
		throw "abstract";
	}
	,start: function(voiceparams) {
		throw "abstract";
		return false;
	}
	,process: function(voiceparams,startIndex,endIndex) {
		throw "abstract";
	}
	,clearDescriptors: function() {
		as.platform.TypeUtils.clearObjectArray(this.generatorInfo);
		as.platform.TypeUtils.clearObjectArray(this.envelopeInfo);
		as.platform.TypeUtils.clearObjectArray(this.filterInfo);
		as.platform.TypeUtils.clearObjectArray(this.lfoInfo);
	}
	,__class__: as.bank.patch.Patch
}
as.bank.patch.MultiPatch = function(name) {
	as.bank.patch.Patch.call(this,name);
	this._intervalType = 0;
};
$hxClasses["as.bank.patch.MultiPatch"] = as.bank.patch.MultiPatch;
as.bank.patch.MultiPatch.__name__ = ["as","bank","patch","MultiPatch"];
as.bank.patch.MultiPatch.__super__ = as.bank.patch.Patch;
as.bank.patch.MultiPatch.prototype = $extend(as.bank.patch.Patch.prototype,{
	determineIntervalType: function() {
		var checkChannel = false;
		var checkVelocity = false;
		var _g1 = 0, _g = this._intervalList.length;
		while(_g1 < _g) {
			var x = _g1++;
			if(this._intervalList[x].startChannel != 0 || this._intervalList[x].endChannel != 15) {
				checkChannel = true;
				if(checkChannel && checkVelocity) this._intervalType = 0;
			}
			if(this._intervalList[x].startVelocity != 0 || this._intervalList[x].endVelocity != 127) {
				checkVelocity = true;
				if(checkChannel && checkVelocity) this._intervalType = 0;
			}
		}
		if(checkChannel) this._intervalType = 1; else if(checkVelocity) this._intervalType = 2; else this._intervalType = 3;
	}
	,loadSf2: function(regions,assets) {
		this._intervalList = new Array(regions.length);
		var _g1 = 0, _g = regions.length;
		while(_g1 < _g) {
			var x = _g1++;
			var loKey;
			var hiKey;
			var loVel;
			var hiVel;
			if(as.platform.TypeUtils.IsLittleEndian) {
				loKey = regions[x].generators[43] & 255;
				hiKey = regions[x].generators[43] >> 8 & 255;
				loVel = regions[x].generators[44] & 255;
				hiVel = regions[x].generators[44] >> 8 & 255;
			} else {
				hiKey = regions[x].generators[43] & 255;
				loKey = regions[x].generators[43] >> 8 & 255;
				hiVel = regions[x].generators[44] & 255;
				loVel = regions[x].generators[44] >> 8 & 255;
			}
			var sf2 = new as.bank.patch.Sf2Patch(this.name + "_" + x);
			sf2.load(regions[x],assets);
			this._intervalList[x] = new as.bank.patch.PatchInterval(sf2,0,15,loKey,hiKey,loVel,hiVel);
		}
		this.determineIntervalType();
	}
	,findPatches: function(channel,key,velocity,layers) {
		var _g = this;
		switch(_g._intervalType) {
		case 0:
			var _g2 = 0, _g1 = this._intervalList.length;
			while(_g2 < _g1) {
				var x = _g2++;
				if(this._intervalList[x].checkAllIntervals(channel,key,velocity)) layers.push(this._intervalList[x].patch);
			}
			break;
		case 1:
			var _g2 = 0, _g1 = this._intervalList.length;
			while(_g2 < _g1) {
				var x = _g2++;
				if(this._intervalList[x].checkChannelAndKey(channel,key)) layers.push(this._intervalList[x].patch);
			}
			break;
		case 2:
			var _g2 = 0, _g1 = this._intervalList.length;
			while(_g2 < _g1) {
				var x = _g2++;
				if(this._intervalList[x].checkKeyAndVelocity(key,velocity)) layers.push(this._intervalList[x].patch);
			}
			break;
		case 3:
			var _g2 = 0, _g1 = this._intervalList.length;
			while(_g2 < _g1) {
				var x = _g2++;
				if(this._intervalList[x].checkKey(key)) layers.push(this._intervalList[x].patch);
			}
			break;
		}
	}
	,__class__: as.bank.patch.MultiPatch
});
as.bank.patch.IntervalType = function() { }
$hxClasses["as.bank.patch.IntervalType"] = as.bank.patch.IntervalType;
as.bank.patch.IntervalType.__name__ = ["as","bank","patch","IntervalType"];
as.bank.patch.PatchInterval = function(patch,startChannel,endChannel,startKey,endKey,startVelocity,endVelocity) {
	this.patch = patch;
	this.startChannel = startChannel;
	this.endChannel = endChannel;
	this.startKey = startKey;
	this.endKey = endKey;
	this.startVelocity = startVelocity;
	this.endVelocity = endVelocity;
};
$hxClasses["as.bank.patch.PatchInterval"] = as.bank.patch.PatchInterval;
as.bank.patch.PatchInterval.__name__ = ["as","bank","patch","PatchInterval"];
as.bank.patch.PatchInterval.prototype = {
	checkKey: function(key) {
		return key >= this.startKey && key <= this.endKey;
	}
	,checkKeyAndVelocity: function(key,velocity) {
		return key >= this.startKey && key <= this.endKey && (velocity >= this.startVelocity && velocity <= this.endVelocity);
	}
	,checkChannelAndKey: function(channel,key) {
		return channel >= this.startChannel && channel <= this.endChannel && (key >= this.startKey && key <= this.endKey);
	}
	,checkAllIntervals: function(channel,key,velocity) {
		return channel >= this.startChannel && channel <= this.endChannel && (key >= this.startKey && key <= this.endKey) && (velocity >= this.startVelocity && velocity <= this.endVelocity);
	}
	,__class__: as.bank.patch.PatchInterval
}
as.bank.patch.Sf2Patch = function(name) {
	as.bank.patch.Patch.call(this,name);
	this._pan = new as.synthesis.PanComponent();
	this._iniFilterFc = 0;
	this._filterQ = 0;
	this._sustainVolEnv = 0;
	this._initialAttn = 0;
	this._keyOverride = 0;
	this._velOverride = 0;
	this._keynumToModEnvHold = 0;
	this._keynumToModEnvDecay = 0;
	this._keynumToVolEnvHold = 0;
	this._keynumToVolEnvDecay = 0;
	this._modLfoToPitch = 0;
	this._vibLfoToPitch = 0;
	this._modEnvToPitch = 0;
	this._modLfoToFilterFc = 0;
	this._modEnvToFilterFc = 0;
	this._modLfoToVolume = 0;
};
$hxClasses["as.bank.patch.Sf2Patch"] = as.bank.patch.Sf2Patch;
as.bank.patch.Sf2Patch.__name__ = ["as","bank","patch","Sf2Patch"];
as.bank.patch.Sf2Patch.__super__ = as.bank.patch.Patch;
as.bank.patch.Sf2Patch.prototype = $extend(as.bank.patch.Patch.prototype,{
	loadFilter: function(region) {
		this.filterInfo[0] = new as.bank.descriptors.FilterDescriptor();
		this.filterInfo[0].cutOff = 20000;
		this.filterInfo[0].filterMethod = 1;
		this.filterInfo[0].resonance = 1;
	}
	,loadLfos: function(region) {
		this.lfoInfo[0] = new as.bank.descriptors.LfoDescriptor();
		this.lfoInfo[0].delayTime = Math.pow(2,region.generators[21] / 1200.0);
		this.lfoInfo[0].frequency = Math.pow(2,region.generators[22] / 1200.0) * 8.176;
		this.lfoInfo[0].generator = as.bank.components.generators.DefaultGenerators.defaultSine();
		this.lfoInfo[1] = new as.bank.descriptors.LfoDescriptor();
		this.lfoInfo[1].delayTime = Math.pow(2,region.generators[23] / 1200.0);
		this.lfoInfo[1].frequency = Math.pow(2,region.generators[24] / 1200.0) * 8.176;
		this.lfoInfo[1].generator = as.bank.components.generators.DefaultGenerators.defaultSine();
	}
	,loadEnvelopes: function(region) {
		this.envelopeInfo[0] = new as.bank.descriptors.EnvelopeDescriptor();
		this.envelopeInfo[0].attackTime = Math.pow(2,region.generators[26] / 1200.0);
		this.envelopeInfo[0].decayTime = Math.pow(2,region.generators[28] / 1200.0);
		this.envelopeInfo[0].delayTime = Math.pow(2,region.generators[25] / 1200.0);
		this.envelopeInfo[0].holdTime = Math.pow(2,region.generators[27] / 1200.0);
		this.envelopeInfo[0].peakLevel = 1;
		this.envelopeInfo[0].releaseTime = Math.pow(2,region.generators[30] / 1200.0);
		this.envelopeInfo[0].startLevel = 0;
		this.envelopeInfo[0].sustainLevel = 1.0 - region.generators[29] / 1000.0;
		if(this.envelopeInfo[0].attackTime < 0.001) this.envelopeInfo[0].attackTime = 0.001; else if(this.envelopeInfo[0].attackTime > 100) this.envelopeInfo[0].attackTime = 100;
		if(this.envelopeInfo[0].decayTime < 0.001) this.envelopeInfo[0].decayTime = 0; else if(this.envelopeInfo[0].decayTime > 100) this.envelopeInfo[0].decayTime = 100;
		if(this.envelopeInfo[0].delayTime < 0.001) this.envelopeInfo[0].delayTime = 0; else if(this.envelopeInfo[0].delayTime > 20) this.envelopeInfo[0].delayTime = 20;
		if(this.envelopeInfo[0].holdTime < 0.001) this.envelopeInfo[0].holdTime = 0; else if(this.envelopeInfo[0].holdTime > 20) this.envelopeInfo[0].holdTime = 20;
		if(this.envelopeInfo[0].releaseTime < 0.001) this.envelopeInfo[0].releaseTime = 0.001; else if(this.envelopeInfo[0].releaseTime > 100) this.envelopeInfo[0].releaseTime = 100;
		this.envelopeInfo[1] = new as.bank.descriptors.EnvelopeDescriptor();
		this.envelopeInfo[1].attackTime = Math.pow(2,region.generators[34] / 1200.0);
		this.envelopeInfo[1].decayTime = Math.pow(2,region.generators[36] / 1200.0);
		this.envelopeInfo[1].delayTime = Math.pow(2,region.generators[33] / 1200.0);
		this.envelopeInfo[1].holdTime = Math.pow(2,region.generators[35] / 1200.0);
		this.envelopeInfo[1].peakLevel = 1;
		this.envelopeInfo[1].releaseTime = Math.pow(2,region.generators[38] / 1200.0);
		this.envelopeInfo[1].startLevel = 0;
		this.envelopeInfo[1].sustainLevel = 1;
		if(this.envelopeInfo[1].attackTime < 0.001) this.envelopeInfo[1].attackTime = 0.001; else if(this.envelopeInfo[1].attackTime > 100) this.envelopeInfo[1].attackTime = 100;
		if(this.envelopeInfo[1].decayTime < 0.001) this.envelopeInfo[1].decayTime = 0; else if(this.envelopeInfo[1].decayTime > 100) this.envelopeInfo[1].decayTime = 100;
		if(this.envelopeInfo[1].delayTime < 0.001) this.envelopeInfo[1].delayTime = 0; else if(this.envelopeInfo[1].delayTime > 20) this.envelopeInfo[1].delayTime = 20;
		if(this.envelopeInfo[1].holdTime < 0.001) this.envelopeInfo[1].holdTime = 0; else if(this.envelopeInfo[1].holdTime > 20) this.envelopeInfo[1].holdTime = 20;
		if(this.envelopeInfo[1].releaseTime < 0.001) this.envelopeInfo[1].releaseTime = 0.001; else if(this.envelopeInfo[1].releaseTime > 100) this.envelopeInfo[1].releaseTime = 100;
	}
	,loadGen: function(region,assets) {
		var sda = assets.sampleAssets[region.generators[53]];
		var gen = new as.bank.components.generators.SampleGenerator();
		gen.endPhase = sda.end + region.generators[1] + 32768.0 * region.generators[12];
		gen.frequency = sda.sampleRate;
		gen.keyTrack = region.generators[56];
		gen.loopEndPhase = sda.loopEnd + region.generators[3] + 32768.0 * region.generators[50];
		var _g = region.generators[54] & 3;
		switch(_g) {
		case 0:case 2:
			gen.loopMode = 0;
			break;
		case 1:
			gen.loopMode = 2;
			break;
		case 3:
			gen.loopMode = 3;
			break;
		}
		gen.loopStartPhase = sda.loopStart + region.generators[2] + 32768.0 * region.generators[45];
		gen.offset = 0;
		gen.period = 1.0;
		if(region.generators[58] > -1) gen.rootKey = region.generators[58]; else gen.rootKey = sda.rootKey;
		gen.startPhase = sda.start + region.generators[0] + 32768.0 * region.generators[4];
		gen.tune = sda.tune + region.generators[52] + 100 * region.generators[51];
		gen.velocityTrack = 0;
		gen.samples = sda.sampleData;
		this.generatorInfo[0] = gen;
	}
	,load: function(region,assets) {
		this.exclusiveGroup = region.generators[57];
		this.exclusiveGroupTarget = this.exclusiveGroup;
		this._iniFilterFc = region.generators[8];
		this._filterQ = as.synthesis.SynthHelper.dBtoLinear(region.generators[9] / 10.0);
		this._sustainVolEnv = region.generators[37] / 10.0;
		this._initialAttn = region.generators[48] / 10.0;
		this._keyOverride = region.generators[46];
		this._velOverride = region.generators[47];
		this._keynumToModEnvHold = region.generators[31];
		this._keynumToModEnvDecay = region.generators[32];
		this._keynumToVolEnvHold = region.generators[39];
		this._keynumToVolEnvDecay = region.generators[40];
		this._pan.setValue(region.generators[17] / 500.0,0);
		this._modLfoToPitch = region.generators[5];
		this._vibLfoToPitch = region.generators[6];
		this._modEnvToPitch = region.generators[7];
		this._modLfoToFilterFc = region.generators[10];
		this._modEnvToFilterFc = region.generators[11];
		this._modLfoToVolume = region.generators[13] / 10.0;
		this.loadGen(region,assets);
		this.loadEnvelopes(region);
		this.loadLfos(region);
		this.loadFilter(region);
	}
	,process: function(voiceparams,startIndex,endIndex) {
		var basePitch = as.synthesis.SynthHelper.centsToPitch(voiceparams.pitchOffset + voiceparams.synth.totalPitch[voiceparams.channel]) * voiceparams.generators[0].frequency / voiceparams.synth.sampleRate;
		var x = startIndex;
		while(x < endIndex) {
			voiceparams.envelopes[0].increment(64);
			voiceparams.envelopes[1].increment(64);
			voiceparams.lfos[0].increment(64);
			voiceparams.lfos[1].increment(64);
			voiceparams.generators[0].getValues(voiceparams.generatorParams[0],voiceparams.blockBuffer,basePitch * as.synthesis.SynthHelper.centsToPitch(voiceparams.envelopes[0].value * this._modEnvToPitch + voiceparams.lfos[0].value * this._modLfoToPitch + voiceparams.lfos[1].value * this._vibLfoToPitch | 0));
			if(voiceparams.filters[0].get_enabled()) {
				var centsFc = this._iniFilterFc + voiceparams.lfos[0].value * this._modLfoToFilterFc + voiceparams.envelopes[0].value * this._modEnvToFilterFc;
				if(centsFc > 13500) centsFc = 13500;
				voiceparams.filters[0].updateCoefficients(as.synthesis.SynthHelper.keyToFrequency(centsFc / 100.0,69) / voiceparams.synth.sampleRate,this._filterQ);
				voiceparams.filters[0].applyFilterMulti(voiceparams.blockBuffer);
			}
			var volume = as.synthesis.SynthHelper.dBtoLinear(voiceparams.volOffset + voiceparams.lfos[0].value * this._modLfoToVolume) * voiceparams.envelopes[1].value * voiceparams.synth.totalVolume[voiceparams.channel] * voiceparams.synth.get_mixGain();
			if(voiceparams.synth.audioChannels == 2) as.synthesis.SynthHelper.mixMonoToStereoInterpolation(x,volume * this._pan.left * voiceparams.synth.panPositions[voiceparams.channel].left,volume * this._pan.right * voiceparams.synth.panPositions[voiceparams.channel].right,voiceparams); else as.synthesis.SynthHelper.mixMonoToMonoInterpolation(x,volume,voiceparams);
			if(voiceparams.envelopes[1].currentStage > 2 && volume <= 1e-5 || voiceparams.generatorParams[0].currentState == 3) {
				voiceparams.state = 0;
				return;
			}
			x += 64 * voiceparams.synth.audioChannels;
		}
	}
	,stop: function(voiceparams) {
		voiceparams.generators[0].release(voiceparams.generatorParams[0]);
		if(voiceparams.generators[0].loopMode != 1) {
			voiceparams.envelopes[0].release();
			voiceparams.envelopes[1].release();
		}
	}
	,start: function(voiceparams) {
		var note = this._keyOverride > -1?this._keyOverride:voiceparams.note;
		var vel = this._velOverride > -1?this._velOverride:voiceparams.velocity;
		voiceparams.generatorParams[0].quickSetup(voiceparams.generators[0]);
		voiceparams.envelopes[0].quickSetupDAHDSR(voiceparams.synth.sampleRate,note,this._keynumToModEnvHold,this._keynumToModEnvDecay,1,this.envelopeInfo[0]);
		var susMod = as.synthesis.SynthHelper.dBtoLinear(-this._sustainVolEnv);
		if(susMod <= 1e-5) susMod = 0;
		voiceparams.envelopes[1].quickSetupDAHDSR(voiceparams.synth.sampleRate,note,this._keynumToVolEnvHold,this._keynumToVolEnvDecay,susMod,this.envelopeInfo[1]);
		voiceparams.filters[0].disable();
		voiceparams.lfos[0].quickSetup(voiceparams.synth.sampleRate,this.lfoInfo[0]);
		voiceparams.lfos[1].quickSetup(voiceparams.synth.sampleRate,this.lfoInfo[1]);
		voiceparams.pitchOffset = (note - voiceparams.generators[0].rootKey) * voiceparams.generators[0].keyTrack + voiceparams.generators[0].tune;
		voiceparams.volOffset = -20. * (Math.log(16129.0 / (vel * vel)) / Math.log(10)) + -this._initialAttn;
		return voiceparams.generatorParams[0].currentState != 3 && voiceparams.envelopes[1].currentStage != 6;
	}
	,__class__: as.bank.patch.Sf2Patch
});
as.ds = {}
as.ds._FixedArray = {}
as.ds._FixedArray.FixedArray_Impl_ = function() { }
$hxClasses["as.ds._FixedArray.FixedArray_Impl_"] = as.ds._FixedArray.FixedArray_Impl_;
as.ds._FixedArray.FixedArray_Impl_.__name__ = ["as","ds","_FixedArray","FixedArray_Impl_"];
as.ds._FixedArray.FixedArray_Impl_._new = function(length) {
	return new Array(length);
}
as.ds._FixedArray.FixedArray_Impl_.get = function(this1,index) {
	return this1[index];
}
as.ds._FixedArray.FixedArray_Impl_.set = function(this1,index,val) {
	return this1[index] = val;
}
as.ds._FixedArray.FixedArray_Impl_.clone = function(this1) {
	return this1.slice(0);
}
as.ds._FixedArray.FixedArray_Impl_.get_length = function(this1) {
	return this1.length;
}
as.ds._FixedArray.FixedArray_Impl_.blit = function(src,srcPos,dest,destPos,len) {
	haxe.ds._Vector.Vector_Impl_.blit(src,srcPos,dest,destPos,len);
}
as.ds._FixedArray.FixedArray_Impl_.fromArrayCopy = function(array) {
	return (function($this) {
		var $r;
		var vec = new Array(array.length);
		{
			var _g1 = 0, _g = array.length;
			while(_g1 < _g) {
				var i = _g1++;
				vec[i] = array[i];
			}
		}
		$r = vec;
		return $r;
	}(this));
}
as.ds._FixedArray.FixedArray_Impl_.serialize = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v.length);
	var _g1 = 0, _g = v.length;
	while(_g1 < _g) {
		var i = _g1++;
		s.serialize(v[i]);
	}
	return s.toString();
}
as.ds._FixedArray.FixedArray_Impl_.unserialize = function(data) {
	var s = new haxe.Unserializer(data);
	var length = s.unserialize();
	var v = new Array(length);
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var val = s.unserialize();
		v[i] = val;
	}
	return v;
}
as.ds.LinkedListNode = function() {
};
$hxClasses["as.ds.LinkedListNode"] = as.ds.LinkedListNode;
as.ds.LinkedListNode.__name__ = ["as","ds","LinkedListNode"];
as.ds.LinkedListNode.prototype = {
	invalidate: function() {
		this._list = null;
		this._next = null;
		this._prev = null;
	}
	,get_prev: function() {
		return this._prev == null || this == this._list.first?null:this._prev;
	}
	,get_next: function() {
		return this._next == null || this._list.first == this._next?null:this._next;
	}
	,__class__: as.ds.LinkedListNode
}
as.ds.LinkedList = function() {
	this.length = 0;
};
$hxClasses["as.ds.LinkedList"] = as.ds.LinkedList;
as.ds.LinkedList.__name__ = ["as","ds","LinkedList"];
as.ds.LinkedList.prototype = {
	insertNodeToEmptyList: function(node) {
		node._next = node;
		node._prev = node;
		node._list = this;
		this.first = node;
		this.length++;
	}
	,insertNodeBefore: function(node,newNode) {
		newNode._next = node;
		newNode._prev = node._prev;
		node._prev._next = newNode;
		node._prev = newNode;
		newNode._list = this;
		this.length++;
	}
	,remove: function(n) {
		if(n._next == n) this.first = null; else {
			n._next._prev = n._prev;
			n._prev._next = n._next;
			if(this.first == n) this.first = n._next;
		}
		n.invalidate();
		this.length--;
	}
	,removeLast: function() {
		if(this.first == null) return null;
		var v = this.first._prev != null?this.first._prev.value:null;
		this.remove(this.first._prev);
		return v;
	}
	,removeFirst: function() {
		if(this.first == null) return null;
		var v = this.first.value;
		this.remove(this.first);
		return v;
	}
	,addLast: function(v) {
		var node = new as.ds.LinkedListNode();
		node.value = v;
		if(this.first == null) this.insertNodeToEmptyList(node); else this.insertNodeBefore(this.first,node);
	}
	,addFirst: function(v) {
		var node = new as.ds.LinkedListNode();
		node.value = v;
		if(this.first == null) this.insertNodeToEmptyList(node); else {
			this.insertNodeBefore(this.first,node);
			this.first = node;
		}
	}
	,__class__: as.ds.LinkedList
}
var mconsole = {}
mconsole.Printer = function() { }
$hxClasses["mconsole.Printer"] = mconsole.Printer;
mconsole.Printer.__name__ = ["mconsole","Printer"];
mconsole.Printer.prototype = {
	__class__: mconsole.Printer
}
as.log = {}
as.log.LevelPrinter = function(target) {
	this._target = target;
	this.level = as.log.LevelPrinter.logLevelToInt(mconsole.LogLevel.log);
};
$hxClasses["as.log.LevelPrinter"] = as.log.LevelPrinter;
as.log.LevelPrinter.__name__ = ["as","log","LevelPrinter"];
as.log.LevelPrinter.__interfaces__ = [mconsole.Printer];
as.log.LevelPrinter.logLevelToInt = function(level) {
	switch( (level)[1] ) {
	case 4:
		return 4;
	case 3:
		return 3;
	case 1:
		return 2;
	case 2:
		return 1;
	case 0:
		return 0;
	}
}
as.log.LevelPrinter.prototype = {
	printLine: function(level,message) {
		this._target(level,message);
	}
	,print: function(level,params,indent,pos) {
		var intLevel = as.log.LevelPrinter.logLevelToInt(level);
		if(intLevel < this.level) return;
		params = params.slice();
		var _g1 = 0, _g = params.length;
		while(_g1 < _g) {
			var i = _g1++;
			params[i] = Std.string(params[i]);
		}
		var message = params.join(", ");
		var nextPosition = "@ " + pos.className + "." + pos.methodName;
		var nextLineNumber = Std.string(pos.lineNumber);
		var lineColumn = "";
		var emptyLineColumn = "";
		if(nextPosition != this._position) this._target(intLevel,nextPosition);
		emptyLineColumn = StringTools.lpad(""," ",5);
		if(nextPosition != this._position || nextLineNumber != this._lineNumber) lineColumn = StringTools.lpad("L" + nextLineNumber," ",6) + ": "; else lineColumn = emptyLineColumn;
		this._position = nextPosition;
		this._lineNumber = nextLineNumber;
		var indent1 = StringTools.lpad(""," ",indent * 2);
		message = lineColumn + indent1 + message;
		message = message.split("\n").join("\n" + emptyLineColumn + indent1);
		this._target(intLevel,message);
	}
	,__class__: as.log.LevelPrinter
}
as.midi = {}
as.midi.MidiFile = function() {
	this.division = 0;
	this.trackFormat = 0;
	this.timingStandard = 0;
};
$hxClasses["as.midi.MidiFile"] = as.midi.MidiFile;
as.midi.MidiFile.__name__ = ["as","midi","MidiFile"];
as.midi.MidiFile.readMetaMessage = function(input,delta,status) {
	var metaStatus = input.readByte();
	switch(metaStatus) {
	case 0:
		var count = input.readByte();
		if(count == 0) return new as.midi.event.MetaNumberEvent(delta,status,metaStatus,-1); else if(count == 2) return new as.midi.event.MetaNumberEvent(delta,status,metaStatus,input.readInt16()); else throw haxe.io.Error.Custom("Invalid sequence number event.");
		break;
	case 1:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 2:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 3:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 4:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 5:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 6:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 7:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 8:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 9:
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,as.midi.MidiFile.readString(input));
	case 32:
		if(input.readByte() != 1) throw haxe.io.Error.Custom("Invalid midi channel event. Expected size of 1.");
		return new as.midi.event.MetaEvent(delta,status,metaStatus,input.readByte());
	case 33:
		if(input.readByte() != 1) throw haxe.io.Error.Custom("Invalid midi port event. Expected size of 1.");
		return new as.midi.event.MetaEvent(delta,status,metaStatus,input.readByte());
	case 47:
		return new as.midi.event.MetaEvent(delta,status,metaStatus,input.readByte());
	case 81:
		if(input.readByte() != 3) throw haxe.io.Error.Custom("Invalid tempo event. Expected size of 3.");
		return new as.midi.event.MetaNumberEvent(delta,status,metaStatus,input.readByte() << 16 | input.readByte() << 8 | input.readByte());
	case 84:
		if(input.readByte() != 5) throw haxe.io.Error.Custom("Invalid smpte event. Expected size of 5.");
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,input.readByte() + ":" + input.readByte() + ":" + input.readByte() + ":" + input.readByte() + ":" + input.readByte());
	case 88:
		if(input.readByte() != 4) throw haxe.io.Error.Custom("Invalid time signature event. Expected size of 4.");
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,input.readByte() + ":" + input.readByte() + ":" + input.readByte() + ":" + input.readByte());
	case 89:
		if(input.readByte() != 2) throw haxe.io.Error.Custom("Invalid key signature event. Expected size of 2.");
		return new as.midi.event.MetaTextEvent(delta,status,metaStatus,input.readByte() + ":" + input.readByte());
	case 127:
		var length = as.midi.MidiFile.readVariableLength(input);
		var data = input.read(length);
		return new as.midi.event.MetaDataEvent(delta,status,metaStatus,data);
	}
	throw haxe.io.Error.Custom("Not a valid meta message Status: " + status + " Meta: " + metaStatus);
}
as.midi.MidiFile.readRealTimeMessage = function(input,delta,status) {
	switch(status) {
	case 248:
		return new as.midi.event.RealTimeEvent(delta,status,0,0);
	case 249:
		return new as.midi.event.RealTimeEvent(delta,status,0,0);
	case 250:
		return new as.midi.event.RealTimeEvent(delta,status,0,0);
	case 252:
		return new as.midi.event.RealTimeEvent(delta,status,0,0);
	case 253:
		return new as.midi.event.RealTimeEvent(delta,status,0,0);
	case 254:
		return new as.midi.event.RealTimeEvent(delta,status,0,0);
	case 255:
		return as.midi.MidiFile.readMetaMessage(input,delta,status);
	default:
		throw haxe.io.Error.Custom("The real time message was invalid or unsupported : " + status);
	}
}
as.midi.MidiFile.readSystemCommonMessage = function(input,delta,status) {
	switch(status) {
	case 247:case 240:
		var maker = input.readInt16();
		if(maker == 0) maker = input.readInt16(); else if(maker == 247) return null;
		var data = new Array();
		var b = input.readByte();
		while(b != 247) {
			data.push(b);
			b = input.readByte();
		}
		return new as.midi.event.SystemExclusiveEvent(delta,status,maker,as.platform.TypeUtils.byteArrayFromArray(data));
	case 241:
		return new as.midi.event.SystemCommonEvent(delta,status,input.readByte(),0);
	case 242:
		return new as.midi.event.SystemCommonEvent(delta,status,input.readByte(),input.readByte());
	case 243:
		return new as.midi.event.SystemCommonEvent(delta,status,input.readByte(),0);
	case 246:
		return new as.midi.event.SystemCommonEvent(delta,status,0,0);
	default:
		throw haxe.io.Error.Custom("The system common message was invalid or unsupported : " + status);
	}
}
as.midi.MidiFile.readVoiceMessage = function(input,delta,status,data1) {
	var _g = status & 240;
	switch(_g) {
	case 128:
		return new as.midi.event.MidiEvent(delta,status,data1,input.readByte());
	case 144:
		var velocity = input.readByte();
		if(velocity == 0) status = status & 15 | 128;
		return new as.midi.event.MidiEvent(delta,status,data1,velocity);
	case 160:
		return new as.midi.event.MidiEvent(delta,status,data1,input.readByte());
	case 176:
		return new as.midi.event.MidiEvent(delta,status,data1,input.readByte());
	case 192:
		return new as.midi.event.MidiEvent(delta,status,data1,0);
	case 208:
		return new as.midi.event.MidiEvent(delta,status,data1,0);
	case 224:
		return new as.midi.event.MidiEvent(delta,status,data1,input.readByte());
	default:
		throw haxe.io.Error.Custom("The status provided was not that of a voice message.");
	}
}
as.midi.MidiFile.trackVoiceStats = function(midiEvent,instList,drumList,channelList,noteOnCount) {
	if(midiEvent.getCommand() == 144) {
		var chan = midiEvent.getChannel();
		if(!Lambda.has(channelList,chan)) channelList.push(chan);
		noteOnCount++;
	} else if(midiEvent.getCommand() == 192) {
		var chan = midiEvent.getChannel();
		var prog = midiEvent.getData1();
		if(chan == 9) {
			if(!Lambda.has(drumList,prog)) drumList.push(prog);
		} else if(!Lambda.has(instList,prog)) instList.push(prog);
	}
	return noteOnCount;
}
as.midi.MidiFile.readVariableLength = function(input) {
	var value = 0;
	var next;
	do {
		next = input.readByte();
		value = value << 7;
		value = value | next & 127;
	} while((next & 128) == 128);
	return value;
}
as.midi.MidiFile.readString = function(input) {
	var length = as.midi.MidiFile.readVariableLength(input);
	return input.readString(length);
}
as.midi.MidiFile.prototype = {
	readTrack: function(input) {
		var instList = new Array();
		var drumList = new Array();
		var channelList = new Array();
		var eventList = new Array();
		var noteOnCount = 0;
		var totalTime = 0;
		while(as.util.IOHelper.read8BitChars(input,4) != "MTrk") {
			var length = input.readInt32();
			while(length > 0) {
				length--;
				input.readByte();
			}
		}
		var endPosition = input.readInt32() + input.get_position();
		var prevStatus = 0;
		while(input.get_position() < endPosition) {
			var delta = as.midi.MidiFile.readVariableLength(input);
			totalTime += delta;
			var status = input.readByte();
			if(status >= 128 && status <= 239) {
				prevStatus = status;
				eventList.push(as.midi.MidiFile.readVoiceMessage(input,delta,status,input.readByte()));
				noteOnCount = as.midi.MidiFile.trackVoiceStats(eventList[eventList.length - 1],instList,drumList,channelList,noteOnCount);
			} else if(status >= 240 && status <= 247) {
				prevStatus = 0;
				eventList.push(as.midi.MidiFile.readSystemCommonMessage(input,delta,status));
			} else if(status >= 248 && status <= 255) eventList.push(as.midi.MidiFile.readRealTimeMessage(input,delta,status)); else if(prevStatus == 0) {
				while((status & 128) != 128) status = input.readByte();
				if(status >= 128 && status <= 239) {
					prevStatus = status;
					eventList.push(as.midi.MidiFile.readVoiceMessage(input,delta,status,input.readByte()));
					noteOnCount = as.midi.MidiFile.trackVoiceStats(eventList[eventList.length - 1],instList,drumList,channelList,noteOnCount);
				} else if(status >= 240 && status <= 247) eventList.push(as.midi.MidiFile.readSystemCommonMessage(input,delta,status)); else if(status >= 248 && status <= 255) eventList.push(as.midi.MidiFile.readRealTimeMessage(input,delta,status));
			} else {
				eventList.push(as.midi.MidiFile.readVoiceMessage(input,delta,prevStatus,status));
				noteOnCount = as.midi.MidiFile.trackVoiceStats(eventList[eventList.length - 1],instList,drumList,channelList,noteOnCount);
			}
		}
		if(input.get_position() != endPosition) throw haxe.io.Error.Custom("The track length was invalid for the current MTrk chunk.");
		if(Lambda.has(channelList,9)) {
			if(!Lambda.has(drumList,0)) drumList.push(0);
		} else if(!Lambda.has(instList,0)) instList.push(0);
		var track = new as.midi.MidiTrack(as.platform.TypeUtils.byteArrayFromArray(instList),as.platform.TypeUtils.byteArrayFromArray(drumList),as.platform.TypeUtils.byteArrayFromArray(channelList),(function($this) {
			var $r;
			var vec = new Array(eventList.length);
			{
				var _g1 = 0, _g = eventList.length;
				while(_g1 < _g) {
					var i = _g1++;
					vec[i] = eventList[i];
				}
			}
			$r = vec;
			return $r;
		}(this)));
		track.noteOnCount = noteOnCount;
		track.endTime = totalTime;
		return track;
	}
	,readHeader: function(input) {
		if(input.readInt32() != 6) throw haxe.io.Error.Custom("Midi header is invalid.");
		this.trackFormat = input.readInt16();
		this.tracks = new Array(input.readInt16());
		var div = input.readInt16();
		this.division = div & 32767;
		this.timingStandard = (div & 32768) > 0?1:0;
	}
	,findHead: function(input,attempts) {
		var match = 0;
		while(attempts > 0) {
			var _g = String.fromCharCode(input.readByte());
			switch(_g) {
			case "M":
				match = 1;
				break;
			case "T":
				match = match == 1?2:0;
				break;
			case "h":
				match = match == 2?3:0;
				break;
			case "d":
				if(match == 3) return true;
				match = 0;
				break;
			}
			attempts--;
		}
		return false;
	}
	,load: function(input) {
		input.set_bigEndian(true);
		if(!this.findHead(input,500)) throw haxe.io.Error.Custom("Invalid midi file : MThd chunk could not be found.");
		this.readHeader(input);
		var _g1 = 0, _g = this.tracks.length;
		while(_g1 < _g) {
			var x = _g1++;
			this.tracks[x] = this.readTrack(input);
		}
	}
	,mergeTracks: function() {
		var eventCount = 0;
		var notesPlayed = 0;
		var programsUsed = new Array();
		var drumProgramsUsed = new Array();
		var channelsUsed = new Array();
		var _g1 = 0, _g = this.tracks.length;
		while(_g1 < _g) {
			var x = _g1++;
			eventCount += this.tracks[x].midiEvents.length;
			notesPlayed += this.tracks[x].noteOnCount;
			var _g3 = 0, _g2 = this.tracks[x].instruments.length;
			while(_g3 < _g2) {
				var i = _g3++;
				var p = this.tracks[x].instruments.b[i];
				if(!Lambda.has(programsUsed,p)) programsUsed.push(p);
			}
			var _g3 = 0, _g2 = this.tracks[x].drumInstruments.length;
			while(_g3 < _g2) {
				var i = _g3++;
				var p = this.tracks[x].drumInstruments.b[i];
				if(!Lambda.has(drumProgramsUsed,p)) drumProgramsUsed.push(p);
			}
			var _g3 = 0, _g2 = this.tracks[x].activeChannels.length;
			while(_g3 < _g2) {
				var i = _g3++;
				var p = this.tracks[x].activeChannels.b[i];
				if(!Lambda.has(channelsUsed,p)) channelsUsed.push(p);
			}
		}
		var track = new as.midi.MidiTrack(as.platform.TypeUtils.byteArrayFromArray(programsUsed),as.platform.TypeUtils.byteArrayFromArray(drumProgramsUsed),as.platform.TypeUtils.byteArrayFromArray(channelsUsed),new Array(eventCount));
		track.noteOnCount = notesPlayed;
		return track;
	}
	,combineTracks: function() {
		var finalTrack = this.mergeTracks();
		var absEvents = new Array(this.tracks.length);
		var _g1 = 0, _g = this.tracks.length;
		while(_g1 < _g) {
			var i = _g1++;
			absEvents[i] = new Array(this.tracks[i].midiEvents.length);
			var totalDeltaTime = 0;
			var _g3 = 0, _g2 = this.tracks[i].midiEvents.length;
			while(_g3 < _g2) {
				var j = _g3++;
				absEvents[i][j] = this.tracks[i].midiEvents[j];
				totalDeltaTime += absEvents[i][j].deltaTime;
				absEvents[i][j].deltaTime = totalDeltaTime;
			}
		}
		var eventCount = 0;
		var delta = 0;
		var nextdelta = 2147483647;
		var counters = new Array(absEvents.length);
		as.platform.TypeUtils.clearIntArray(counters);
		while(eventCount < finalTrack.midiEvents.length) {
			var _g1 = 0, _g = absEvents.length;
			while(_g1 < _g) {
				var x = _g1++;
				while(counters[x] < absEvents[x].length && absEvents[x][counters[x]].deltaTime == delta) {
					finalTrack.midiEvents[eventCount] = absEvents[x][counters[x]];
					eventCount++;
					counters[x]++;
				}
				if(counters[x] < absEvents[x].length && absEvents[x][counters[x]].deltaTime < nextdelta) nextdelta = absEvents[x][counters[x]].deltaTime;
			}
			delta = nextdelta;
			nextdelta = 2147483647;
		}
		finalTrack.endTime = finalTrack.midiEvents[finalTrack.midiEvents.length - 1].deltaTime;
		var deltaDiff = 0;
		var _g1 = 0, _g = finalTrack.midiEvents.length;
		while(_g1 < _g) {
			var x = _g1++;
			var oldTime = finalTrack.midiEvents[x].deltaTime;
			finalTrack.midiEvents[x].deltaTime -= deltaDiff;
			deltaDiff = oldTime;
		}
		this.tracks = new Array(1);
		this.tracks[0] = finalTrack;
		this.trackFormat = 0;
	}
	,__class__: as.midi.MidiFile
}
as.midi.MidiTrackFormat = function() { }
$hxClasses["as.midi.MidiTrackFormat"] = as.midi.MidiTrackFormat;
as.midi.MidiTrackFormat.__name__ = ["as","midi","MidiTrackFormat"];
as.midi.MidiTimeFormat = function() { }
$hxClasses["as.midi.MidiTimeFormat"] = as.midi.MidiTimeFormat;
as.midi.MidiTimeFormat.__name__ = ["as","midi","MidiTimeFormat"];
as.midi.MidiEventTypeEnum = function() { }
$hxClasses["as.midi.MidiEventTypeEnum"] = as.midi.MidiEventTypeEnum;
as.midi.MidiEventTypeEnum.__name__ = ["as","midi","MidiEventTypeEnum"];
as.midi.MetaEventTypeEnum = function() { }
$hxClasses["as.midi.MetaEventTypeEnum"] = as.midi.MetaEventTypeEnum;
as.midi.MetaEventTypeEnum.__name__ = ["as","midi","MetaEventTypeEnum"];
as.midi.SystemCommonTypeEnum = function() { }
$hxClasses["as.midi.SystemCommonTypeEnum"] = as.midi.SystemCommonTypeEnum;
as.midi.SystemCommonTypeEnum.__name__ = ["as","midi","SystemCommonTypeEnum"];
as.midi.SystemRealtimeTypeEnum = function() { }
$hxClasses["as.midi.SystemRealtimeTypeEnum"] = as.midi.SystemRealtimeTypeEnum;
as.midi.SystemRealtimeTypeEnum.__name__ = ["as","midi","SystemRealtimeTypeEnum"];
as.midi.ControllerTypeEnum = function() { }
$hxClasses["as.midi.ControllerTypeEnum"] = as.midi.ControllerTypeEnum;
as.midi.ControllerTypeEnum.__name__ = ["as","midi","ControllerTypeEnum"];
as.midi.MidiHelper = function() { }
$hxClasses["as.midi.MidiHelper"] = as.midi.MidiHelper;
as.midi.MidiHelper.__name__ = ["as","midi","MidiHelper"];
as.midi.MidiTrack = function(instPrograms,drumPrograms,activeChannels,midiEvents) {
	this.instruments = instPrograms;
	this.drumInstruments = drumPrograms;
	this.activeChannels = activeChannels;
	this.midiEvents = midiEvents;
	this.noteOnCount = 0;
	this.endTime = 0;
};
$hxClasses["as.midi.MidiTrack"] = as.midi.MidiTrack;
as.midi.MidiTrack.__name__ = ["as","midi","MidiTrack"];
as.midi.MidiTrack.prototype = {
	__class__: as.midi.MidiTrack
}
as.midi.event = {}
as.midi.event.MidiEvent = function(delta,status,data1,data2) {
	this.deltaTime = delta;
	this._message = status | data1 << 8 | data2 << 16;
};
$hxClasses["as.midi.event.MidiEvent"] = as.midi.event.MidiEvent;
as.midi.event.MidiEvent.__name__ = ["as","midi","event","MidiEvent"];
as.midi.event.MidiEvent.prototype = {
	getData2: function() {
		return (this._message & 16711680) >> 16;
	}
	,getData1: function() {
		return (this._message & 65280) >> 8;
	}
	,getCommand: function() {
		return this._message & 240;
	}
	,getChannel: function() {
		return this._message & 15;
	}
	,__class__: as.midi.event.MidiEvent
}
as.midi.event.MetaEvent = function(delta,status,data1,data2) {
	as.midi.event.MidiEvent.call(this,delta,status,data1,data2);
};
$hxClasses["as.midi.event.MetaEvent"] = as.midi.event.MetaEvent;
as.midi.event.MetaEvent.__name__ = ["as","midi","event","MetaEvent"];
as.midi.event.MetaEvent.__super__ = as.midi.event.MidiEvent;
as.midi.event.MetaEvent.prototype = $extend(as.midi.event.MidiEvent.prototype,{
	getMetaStatus: function() {
		return this.getData1();
	}
	,getCommand: function() {
		return this._message & 255;
	}
	,getChannel: function() {
		return -1;
	}
	,__class__: as.midi.event.MetaEvent
});
as.midi.event.MetaDataEvent = function(delta,status,metaId,data) {
	as.midi.event.MetaEvent.call(this,delta,status,metaId,0);
	this.data = data;
};
$hxClasses["as.midi.event.MetaDataEvent"] = as.midi.event.MetaDataEvent;
as.midi.event.MetaDataEvent.__name__ = ["as","midi","event","MetaDataEvent"];
as.midi.event.MetaDataEvent.__super__ = as.midi.event.MetaEvent;
as.midi.event.MetaDataEvent.prototype = $extend(as.midi.event.MetaEvent.prototype,{
	__class__: as.midi.event.MetaDataEvent
});
as.midi.event.MetaNumberEvent = function(delta,status,metaId,number) {
	as.midi.event.MetaEvent.call(this,delta,status,metaId,0);
	this.value = number;
};
$hxClasses["as.midi.event.MetaNumberEvent"] = as.midi.event.MetaNumberEvent;
as.midi.event.MetaNumberEvent.__name__ = ["as","midi","event","MetaNumberEvent"];
as.midi.event.MetaNumberEvent.__super__ = as.midi.event.MetaEvent;
as.midi.event.MetaNumberEvent.prototype = $extend(as.midi.event.MetaEvent.prototype,{
	__class__: as.midi.event.MetaNumberEvent
});
as.midi.event.MetaTextEvent = function(delta,status,metaId,text) {
	as.midi.event.MetaEvent.call(this,delta,status,metaId,0);
	this.text = text;
};
$hxClasses["as.midi.event.MetaTextEvent"] = as.midi.event.MetaTextEvent;
as.midi.event.MetaTextEvent.__name__ = ["as","midi","event","MetaTextEvent"];
as.midi.event.MetaTextEvent.__super__ = as.midi.event.MetaEvent;
as.midi.event.MetaTextEvent.prototype = $extend(as.midi.event.MetaEvent.prototype,{
	__class__: as.midi.event.MetaTextEvent
});
as.midi.event.RealTimeEvent = function(delta,status,data1,data2) {
	as.midi.event.MidiEvent.call(this,delta,status,data1,data2);
};
$hxClasses["as.midi.event.RealTimeEvent"] = as.midi.event.RealTimeEvent;
as.midi.event.RealTimeEvent.__name__ = ["as","midi","event","RealTimeEvent"];
as.midi.event.RealTimeEvent.__super__ = as.midi.event.MidiEvent;
as.midi.event.RealTimeEvent.prototype = $extend(as.midi.event.MidiEvent.prototype,{
	getCommand: function() {
		return this._message & 255;
	}
	,getChannel: function() {
		return -1;
	}
	,__class__: as.midi.event.RealTimeEvent
});
as.midi.event.SystemCommonEvent = function(delta,status,data1,data2) {
	as.midi.event.MidiEvent.call(this,delta,status,data1,data2);
};
$hxClasses["as.midi.event.SystemCommonEvent"] = as.midi.event.SystemCommonEvent;
as.midi.event.SystemCommonEvent.__name__ = ["as","midi","event","SystemCommonEvent"];
as.midi.event.SystemCommonEvent.__super__ = as.midi.event.MidiEvent;
as.midi.event.SystemCommonEvent.prototype = $extend(as.midi.event.MidiEvent.prototype,{
	getCommand: function() {
		return this._message & 255;
	}
	,getChannel: function() {
		return -1;
	}
	,__class__: as.midi.event.SystemCommonEvent
});
as.midi.event.SystemExclusiveEvent = function(delta,status,id,data) {
	as.midi.event.SystemCommonEvent.call(this,delta,status,id & 255,id >> 8);
	this.data = data;
};
$hxClasses["as.midi.event.SystemExclusiveEvent"] = as.midi.event.SystemExclusiveEvent;
as.midi.event.SystemExclusiveEvent.__name__ = ["as","midi","event","SystemExclusiveEvent"];
as.midi.event.SystemExclusiveEvent.__super__ = as.midi.event.SystemCommonEvent;
as.midi.event.SystemExclusiveEvent.prototype = $extend(as.midi.event.SystemCommonEvent.prototype,{
	getManufacturerId: function() {
		return this._message >> 8;
	}
	,__class__: as.midi.event.SystemExclusiveEvent
});
as.platform = {}
as.platform.TypeUtils = function() { }
$hxClasses["as.platform.TypeUtils"] = as.platform.TypeUtils;
as.platform.TypeUtils.__name__ = ["as","platform","TypeUtils"];
as.platform.TypeUtils.clearIntArray = function(a) {
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = 0;
	}
}
as.platform.TypeUtils.clearShortArray = function(a) {
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = 0;
	}
}
as.platform.TypeUtils.clearFloat32Array = function(a) {
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = 0.0;
	}
}
as.platform.TypeUtils.clearObjectArray = function(a) {
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = null;
	}
}
as.platform.TypeUtils.ToInt8 = function(v) {
	return ((v & 255) >> 7) * -256 + (v & 255);
}
as.platform.TypeUtils.ToUInt8 = function(v) {
	return v & 255;
}
as.platform.TypeUtils.ToInt16 = function(v) {
	return ((v & 65535) >> 15) * -65536 + (v & 65535);
}
as.platform.TypeUtils.ToUInt16 = function(v) {
	return v & 65535;
}
as.platform.TypeUtils.byteArrayFromArray = function(array) {
	var bytes = haxe.io.Bytes.alloc(array.length);
	var _g1 = 0, _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		bytes.b[i] = array[i] & 255;
	}
	return bytes;
}
as.player.ISynthOutput = function() { }
$hxClasses["as.player.ISynthOutput"] = as.player.ISynthOutput;
as.player.ISynthOutput.__name__ = ["as","player","ISynthOutput"];
as.player.ISynthOutput.prototype = {
	__class__: as.player.ISynthOutput
}
as.player.JsWorkerOutput = function() {
	this._positionChangedListeners = new Array();
	this._finishedListeners = new Array();
	this._sampleRequestListeners = new Array();
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Initializing js output worker"]);
	mconsole.Console.print(mconsole.LogLevel.debug,["Initializing js output worker"],{ fileName : "JsWorkerOutput.hx", lineNumber : 36, className : "as.player.JsWorkerOutput", methodName : "new"});
	this._workerSelf = self;
	this._workerSelf.addEventListener("message",$bind(this,this.handleMessage),false);
};
$hxClasses["as.player.JsWorkerOutput"] = as.player.JsWorkerOutput;
as.player.JsWorkerOutput.__name__ = ["as","player","JsWorkerOutput"];
as.player.JsWorkerOutput.__interfaces__ = [as.player.ISynthOutput];
as.player.JsWorkerOutput.prototype = {
	seek: function(position) {
		this._workerSelf.postMessage({ cmd : "playerSeek", pos : position});
	}
	,stop: function() {
		this._workerSelf.postMessage({ cmd : "playerStop"});
	}
	,pause: function() {
		this._workerSelf.postMessage({ cmd : "playerPause"});
	}
	,play: function() {
		this._workerSelf.postMessage({ cmd : "playerPlay"});
	}
	,addSamples: function(samples) {
		this._workerSelf.postMessage({ cmd : "playerAddSamples", samples : samples});
	}
	,fireFinished: function() {
		var _g = 0, _g1 = this._finishedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l();
		}
	}
	,addFinishedListener: function(listener) {
		this._finishedListeners.push(listener);
	}
	,fireSampleRequest: function() {
		var _g = 0, _g1 = this._sampleRequestListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l();
		}
	}
	,addSampleRequestListener: function(listener) {
		this._sampleRequestListeners.push(listener);
	}
	,firePositionChanged: function(pos) {
		var _g = 0, _g1 = this._positionChangedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(pos);
		}
	}
	,addPositionChangedListener: function(listener) {
		this._positionChangedListeners.push(listener);
	}
	,sequencerFinished: function() {
		this._workerSelf.postMessage({ cmd : "playerSequencerFinished"});
	}
	,handleMessage: function(e) {
		var data = e.data;
		switch(data.cmd) {
		case "playerSampleRequest":
			this.fireSampleRequest();
			break;
		case "playerFinished":
			this.fireFinished();
			break;
		case "playerPositionChanged":
			this.firePositionChanged(data.pos);
			break;
		}
	}
	,__class__: as.player.JsWorkerOutput
}
as.player.SynthPlayer = function() {
	var _g = this;
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Initializing player"]);
	mconsole.Console.print(mconsole.LogLevel.debug,["Initializing player"],{ fileName : "SynthPlayer.hx", lineNumber : 41, className : "as.player.SynthPlayer", methodName : "new"});
	this._events = new as.player.SynthPlayerEventDispatcher();
	this.state = as.player.SynthPlayerState.Stopped;
	this._events.onPlayerStateChanged(this.state);
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Opening output"]);
	mconsole.Console.print(mconsole.LogLevel.debug,["Opening output"],{ fileName : "SynthPlayer.hx", lineNumber : 47, className : "as.player.SynthPlayer", methodName : "new"});
	this._output = new as.player.JsWorkerOutput();
	this._output.addFinishedListener(function() {
		_g.stop();
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Finished playback"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Finished playback"],{ fileName : "SynthPlayer.hx", lineNumber : 57, className : "as.player.SynthPlayer", methodName : "new"});
		_g._events.onFinished();
	});
	this._output.addSampleRequestListener(function() {
		_g._sequencer.fillMidiEventQueue();
		_g._synth.synthesize();
		_g._output.addSamples(_g._synth.sampleBuffer);
	});
	this._output.addPositionChangedListener(function(pos) {
		_g.firePositionChanged(pos);
	});
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Creating synthesizer"]);
	mconsole.Console.print(mconsole.LogLevel.debug,["Creating synthesizer"],{ fileName : "SynthPlayer.hx", lineNumber : 72, className : "as.player.SynthPlayer", methodName : "new"});
	this._synth = new as.synthesis.Synthesizer(44100,2,441,3,100);
	this._sequencer = new as.sequencer.MidiFileSequencer(this._synth);
	this._sequencer.addFinishedListener(($_=this._output,$bind($_,$_.sequencerFinished)));
};
$hxClasses["as.player.SynthPlayer"] = as.player.SynthPlayer;
as.player.SynthPlayer.__name__ = ["as","player","SynthPlayer"];
as.player.SynthPlayer.prototype = {
	addEventListener: function(listener) {
		this._events.add(listener);
	}
	,firePlayerStateChanged: function() {
		this._events.onPlayerStateChanged(this.state);
	}
	,firePositionChanged: function(pos) {
		var endTime = this._sequencer.endTime / this._synth.sampleRate * 1000 | 0;
		var currentTime = pos;
		var endTick = this._sequencer.millisToTicks(endTime);
		var currentTick = this._sequencer.millisToTicks(currentTime);
		this._tickPosition = currentTick;
		this._timePosition = currentTime;
		mconsole.Console.debug("Position changed: (time: " + currentTime + "/" + endTime + ", tick: " + currentTick + "/" + endTick + ")",{ fileName : "SynthPlayer.hx", lineNumber : 309, className : "as.player.SynthPlayer", methodName : "firePositionChanged"});
		this._events.onPositionChanged(currentTime,endTime,currentTick,endTick);
	}
	,onMidiLoad: function(loaded,total) {
		mconsole.Console.debug("Midi downloading: " + loaded + "/" + total + " bytes",{ fileName : "SynthPlayer.hx", lineNumber : 296, className : "as.player.SynthPlayer", methodName : "onMidiLoad"});
		this._events.onMidiLoad(loaded,total);
	}
	,onSoundFontLoad: function(loaded,total) {
		mconsole.Console.debug("Soundfont downloading: " + loaded + "/" + total + " bytes",{ fileName : "SynthPlayer.hx", lineNumber : 290, className : "as.player.SynthPlayer", methodName : "onSoundFontLoad"});
		this._events.onSoundFontLoad(loaded,total);
	}
	,set_timePosition: function(position) {
		mconsole.Console.debug("Seeking to position " + position + "ms",{ fileName : "SynthPlayer.hx", lineNumber : 271, className : "as.player.SynthPlayer", methodName : "set_timePosition"});
		if(this.state == as.player.SynthPlayerState.Playing) {
			this._sequencer.pause();
			this._output.pause();
		}
		this._sequencer.seek(position);
		this._output.seek(position);
		if(this.state == as.player.SynthPlayerState.Playing) {
			this._sequencer.play();
			this._output.play();
		}
		return position;
	}
	,get_timePosition: function() {
		return this._timePosition;
	}
	,set_tickPosition: function(position) {
		this.set_timePosition(this._sequencer.ticksToMillis(position));
		return position;
	}
	,get_tickPosition: function() {
		return this._tickPosition;
	}
	,get_isReady: function() {
		return this.isSoundFontLoaded && this.isMidiLoaded;
	}
	,loadMidiBytes: function(data) {
		if(this.state != as.player.SynthPlayerState.Stopped) return;
		var input = new haxe.io.BytesInput(data);
		try {
			if(mconsole.Console.hasConsole) mconsole.Console.callConsole("info",["Loading midi from bytes"]);
			mconsole.Console.print(mconsole.LogLevel.info,["Loading midi from bytes"],{ fileName : "SynthPlayer.hx", lineNumber : 229, className : "as.player.SynthPlayer", methodName : "loadMidiBytes"});
			var midi = new as.midi.MidiFile();
			midi.load(input);
			this._sequencer.loadMidi(midi);
			this.isMidiLoaded = true;
			this._events.onMidiLoaded();
			if(mconsole.Console.hasConsole) mconsole.Console.callConsole("info",["Midi successfully loaded"]);
			mconsole.Console.print(mconsole.LogLevel.info,["Midi successfully loaded"],{ fileName : "SynthPlayer.hx", lineNumber : 235, className : "as.player.SynthPlayer", methodName : "loadMidiBytes"});
			if(this.isSoundFontLoaded && this.isMidiLoaded) this._events.onReadyForPlay();
		} catch( e ) {
			mconsole.Console.error("Could not load soundfont from bytes " + Std.string(e),null,{ fileName : "SynthPlayer.hx", lineNumber : 240, className : "as.player.SynthPlayer", methodName : "loadMidiBytes"});
			this.isMidiLoaded = false;
			this._sequencer.unloadMidi();
			this._events.onMidiLoadFailed();
		}
	}
	,loadMidiData: function(data) {
		if(this.state != as.player.SynthPlayerState.Stopped) return;
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("info",["Start loading midi from serialized bytes"]);
		mconsole.Console.print(mconsole.LogLevel.info,["Start loading midi from serialized bytes"],{ fileName : "SynthPlayer.hx", lineNumber : 210, className : "as.player.SynthPlayer", methodName : "loadMidiData"});
		var bytes = null;
		try {
			bytes = haxe.Unserializer.run(data);
			this.loadMidiBytes(bytes);
		} catch( e ) {
			mconsole.Console.error("Could not load midi from serialized bytes: " + Std.string(e),null,{ fileName : "SynthPlayer.hx", lineNumber : 219, className : "as.player.SynthPlayer", methodName : "loadMidiData"});
		}
	}
	,loadMidiUrl: function(url) {
		if(this.state != as.player.SynthPlayerState.Stopped) return;
		mconsole.Console.info("Start loading midi from url " + url,{ fileName : "SynthPlayer.hx", lineNumber : 191, className : "as.player.SynthPlayer", methodName : "loadMidiUrl"});
		var loader = new as.util.UrlLoader();
		loader.url = url;
		loader.method = "GET";
		loader.complete = $bind(this,this.loadMidiBytes);
		loader.progress = $bind(this,this.onMidiLoad);
		try {
			loader.load();
		} catch( e ) {
			mconsole.Console.error("Could not load midi from url: " + Std.string(e),null,{ fileName : "SynthPlayer.hx", lineNumber : 203, className : "as.player.SynthPlayer", methodName : "loadMidiUrl"});
		}
	}
	,loadSoundFontBytes: function(data) {
		if(this.state != as.player.SynthPlayerState.Stopped) return;
		var input = new haxe.io.BytesInput(data);
		try {
			if(mconsole.Console.hasConsole) mconsole.Console.callConsole("info",["Loading soundfont from bytes"]);
			mconsole.Console.print(mconsole.LogLevel.info,["Loading soundfont from bytes"],{ fileName : "SynthPlayer.hx", lineNumber : 170, className : "as.player.SynthPlayer", methodName : "loadSoundFontBytes"});
			var bank = new as.bank.PatchBank();
			bank.loadSf2(input);
			this._synth.loadBank(bank);
			this.isSoundFontLoaded = true;
			this._events.onSoundFontLoaded();
			if(mconsole.Console.hasConsole) mconsole.Console.callConsole("info",["soundFont successfully loaded"]);
			mconsole.Console.print(mconsole.LogLevel.info,["soundFont successfully loaded"],{ fileName : "SynthPlayer.hx", lineNumber : 176, className : "as.player.SynthPlayer", methodName : "loadSoundFontBytes"});
			if(this.isSoundFontLoaded && this.isMidiLoaded) this._events.onReadyForPlay();
		} catch( e ) {
			mconsole.Console.error("Could not load soundfont from bytes " + Std.string(e),null,{ fileName : "SynthPlayer.hx", lineNumber : 181, className : "as.player.SynthPlayer", methodName : "loadSoundFontBytes"});
			this.isSoundFontLoaded = false;
			this._synth.unloadBank();
			this._events.onSoundFontLoadFailed();
		}
	}
	,loadSoundFontData: function(data) {
		if(this.state != as.player.SynthPlayerState.Stopped) return;
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("info",["Start loading soundfont from serialized bytes"]);
		mconsole.Console.print(mconsole.LogLevel.info,["Start loading soundfont from serialized bytes"],{ fileName : "SynthPlayer.hx", lineNumber : 151, className : "as.player.SynthPlayer", methodName : "loadSoundFontData"});
		var bytes = null;
		try {
			bytes = haxe.Unserializer.run(data);
			this.loadSoundFontBytes(bytes);
		} catch( e ) {
			mconsole.Console.error("Could not load soundfont from serialized bytes: " + Std.string(e),null,{ fileName : "SynthPlayer.hx", lineNumber : 160, className : "as.player.SynthPlayer", methodName : "loadSoundFontData"});
		}
	}
	,loadSoundFontUrl: function(url) {
		if(this.state != as.player.SynthPlayerState.Stopped) return;
		mconsole.Console.info("Start loading soundfont from url " + url,{ fileName : "SynthPlayer.hx", lineNumber : 132, className : "as.player.SynthPlayer", methodName : "loadSoundFontUrl"});
		var loader = new as.util.UrlLoader();
		loader.url = url;
		loader.method = "GET";
		loader.complete = $bind(this,this.loadSoundFontBytes);
		loader.progress = $bind(this,this.onSoundFontLoad);
		try {
			loader.load();
		} catch( e ) {
			mconsole.Console.error("Could not load soundfont from url: " + Std.string(e),null,{ fileName : "SynthPlayer.hx", lineNumber : 144, className : "as.player.SynthPlayer", methodName : "loadSoundFontUrl"});
		}
	}
	,stop: function() {
		if(this.state == as.player.SynthPlayerState.Stopped || !(this.isSoundFontLoaded && this.isMidiLoaded)) return;
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Stopping playback"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Stopping playback"],{ fileName : "SynthPlayer.hx", lineNumber : 120, className : "as.player.SynthPlayer", methodName : "stop"});
		this._sequencer.stop();
		this._synth.stop();
		this._output.stop();
		this.state = as.player.SynthPlayerState.Stopped;
		this._events.onPlayerStateChanged(this.state);
		this.firePositionChanged(0);
	}
	,playPause: function() {
		if(this.state == as.player.SynthPlayerState.Playing || !(this.isSoundFontLoaded && this.isMidiLoaded)) this.pause(); else this.play();
	}
	,pause: function() {
		if(this.state != as.player.SynthPlayerState.Playing || !(this.isSoundFontLoaded && this.isMidiLoaded)) return;
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Pausing playback"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Pausing playback"],{ fileName : "SynthPlayer.hx", lineNumber : 104, className : "as.player.SynthPlayer", methodName : "pause"});
		this._sequencer.pause();
		this._output.pause();
		this.state = as.player.SynthPlayerState.Paused;
		this._events.onPlayerStateChanged(this.state);
	}
	,play: function() {
		if(this.state == as.player.SynthPlayerState.Playing || !(this.isSoundFontLoaded && this.isMidiLoaded)) return;
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Starting playback"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Starting playback"],{ fileName : "SynthPlayer.hx", lineNumber : 94, className : "as.player.SynthPlayer", methodName : "play"});
		this._sequencer.play();
		this._output.play();
		this.state = as.player.SynthPlayerState.Playing;
		this._events.onPlayerStateChanged(this.state);
	}
	,__class__: as.player.SynthPlayer
}
as.player.SynthPlayerEventDispatcher = function() {
	this._listeners = new Array();
};
$hxClasses["as.player.SynthPlayerEventDispatcher"] = as.player.SynthPlayerEventDispatcher;
as.player.SynthPlayerEventDispatcher.__name__ = ["as","player","SynthPlayerEventDispatcher"];
as.player.SynthPlayerEventDispatcher.__interfaces__ = [as.player.ISynthPlayerListener];
as.player.SynthPlayerEventDispatcher.prototype = {
	add: function(listener) {
		this._listeners.push(listener);
	}
	,onReadyForPlay: function() {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onReadyForPlay();
		}
	}
	,onMidiLoadFailed: function() {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onMidiLoadFailed();
		}
	}
	,onMidiLoaded: function() {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onMidiLoaded();
		}
	}
	,onMidiLoad: function(loaded,full) {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onMidiLoad(loaded,full);
		}
	}
	,onSoundFontLoadFailed: function() {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onSoundFontLoadFailed();
		}
	}
	,onSoundFontLoaded: function() {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onSoundFontLoaded();
		}
	}
	,onSoundFontLoad: function(loaded,full) {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onSoundFontLoad(loaded,full);
		}
	}
	,onFinished: function() {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onFinished();
		}
	}
	,onPlayerStateChanged: function(state) {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onPlayerStateChanged(state);
		}
	}
	,onPositionChanged: function(currentTime,endTime,currentTick,endTick) {
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.onPositionChanged(currentTime,endTime,currentTick,endTick);
		}
	}
	,__class__: as.player.SynthPlayerEventDispatcher
}
as.player.SynthPlayerState = $hxClasses["as.player.SynthPlayerState"] = { __ename__ : ["as","player","SynthPlayerState"], __constructs__ : ["Stopped","Playing","Paused"] }
as.player.SynthPlayerState.Stopped = ["Stopped",0];
as.player.SynthPlayerState.Stopped.toString = $estr;
as.player.SynthPlayerState.Stopped.__enum__ = as.player.SynthPlayerState;
as.player.SynthPlayerState.Playing = ["Playing",1];
as.player.SynthPlayerState.Playing.toString = $estr;
as.player.SynthPlayerState.Playing.__enum__ = as.player.SynthPlayerState;
as.player.SynthPlayerState.Paused = ["Paused",2];
as.player.SynthPlayerState.Paused.toString = $estr;
as.player.SynthPlayerState.Paused.__enum__ = as.player.SynthPlayerState;
as.sequencer = {}
as.sequencer.MidiFileSequencerTempoChange = function(bpm,ticks,time) {
	this.bpm = bpm;
	this.ticks = ticks;
	this.time = time;
};
$hxClasses["as.sequencer.MidiFileSequencerTempoChange"] = as.sequencer.MidiFileSequencerTempoChange;
as.sequencer.MidiFileSequencerTempoChange.__name__ = ["as","sequencer","MidiFileSequencerTempoChange"];
as.sequencer.MidiFileSequencerTempoChange.prototype = {
	__class__: as.sequencer.MidiFileSequencerTempoChange
}
as.sequencer.MidiFileSequencer = function(synth) {
	this.synth = synth;
	this._eventIndex = 0;
	this._division = 0;
	this._playbackRate = 1;
	this.isPlaying = false;
	this._blockList = new Array(16);
	this._finished = new Array();
	synth.addMidiMessageProcessed($bind(this,this.midiEventProcessed));
};
$hxClasses["as.sequencer.MidiFileSequencer"] = as.sequencer.MidiFileSequencer;
as.sequencer.MidiFileSequencer.__name__ = ["as","sequencer","MidiFileSequencer"];
as.sequencer.MidiFileSequencer.prototype = {
	silentProcess: function(amount) {
		if(amount <= 0) return;
		while(this._eventIndex < this._synthData.length && this._synthData[this._eventIndex].delta < this.currentTime + amount) {
			if(this._synthData[this._eventIndex].event.getCommand() != 144) {
				var m = this._synthData[this._eventIndex];
				this.synth.processMidiMessage(m.event);
			}
			this._eventIndex++;
		}
		this.currentTime += amount;
	}
	,ticksToMillis: function(ticks) {
		var time = 0;
		var bpm = 120.0;
		var lastChange = 0;
		var _g = 0, _g1 = this._tempoChanges;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(ticks < c.ticks) break;
			time = c.time;
			bpm = c.bpm;
			lastChange = c.ticks;
		}
		ticks -= lastChange;
		time += ticks * (60000.0 / (bpm * this._division)) | 0;
		return time;
	}
	,millisToTicks: function(time) {
		var ticks = 0;
		var bpm = 120.0;
		var lastChange = 0;
		var _g = 0, _g1 = this._tempoChanges;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(time < c.time) break;
			ticks = c.ticks;
			bpm = c.bpm;
			lastChange = c.time;
		}
		time -= lastChange;
		ticks += time / (60000.0 / (bpm * this._division)) | 0;
		return ticks;
	}
	,isTempoMessage: function(command,data1) {
		return command == 255 && data1 == 81;
	}
	,midiEventProcessed: function(midiEvent) {
		if(this.isTempoMessage(midiEvent.getCommand(),midiEvent.getData1())) {
			var meta = midiEvent;
			this.currentTempo = 60000000 / meta.value | 0;
		}
	}
	,loadMidiFile: function(midiFile) {
		this._tempoChanges = new Array();
		var bpm = 120.0;
		if(midiFile.tracks.length > 1 || midiFile.tracks[0].endTime == 0) midiFile.combineTracks();
		this._synthData = new Array(midiFile.tracks[0].midiEvents.length);
		this._division = midiFile.division;
		this._eventIndex = 0;
		this.currentTime = 0;
		this.currentTempo = bpm | 0;
		var absDelta = 0.0;
		var absTick = 0;
		var absTime = 0.0;
		var _g1 = 0, _g = midiFile.tracks[0].midiEvents.length;
		while(_g1 < _g) {
			var x = _g1++;
			var mEvent = midiFile.tracks[0].midiEvents[x];
			this._synthData[x] = new as.synthesis.SynthEvent(mEvent);
			absTick += mEvent.deltaTime;
			absTime += mEvent.deltaTime * (60000.0 / (bpm * midiFile.division));
			absDelta += this.synth.sampleRate * mEvent.deltaTime * (60.0 / (bpm * midiFile.division));
			this._synthData[x].delta = absDelta | 0;
			if(this.isTempoMessage(mEvent.getCommand(),mEvent.getData1())) {
				var meta = mEvent;
				bpm = 60000000 / meta.value;
				this._tempoChanges.push(new as.sequencer.MidiFileSequencerTempoChange(bpm,absTick,absTime | 0));
			}
		}
		this.endTime = this._synthData[this._synthData.length - 1].delta;
	}
	,fillMidiEventQueue: function() {
		if(!this.isPlaying || this.synth.midiEventQueue.length != 0) return;
		if(this.currentTime >= this.endTime) {
			this.currentTime = 0;
			this._eventIndex = 0;
			this.isPlaying = false;
			this.synth.noteOffAll(true);
			this.synth.resetPrograms();
			this.synth.resetSynthControls();
			this.fireFinished();
			return;
		}
		var newMSize = this.synth.microBufferSize * this._playbackRate | 0;
		var endSample = this.currentTime + newMSize * this.synth.microBufferCount;
		var _g1 = 0, _g = this.synth.microBufferCount;
		while(_g1 < _g) {
			var x = _g1++;
			this.currentTime += newMSize;
			while(this._eventIndex < this._synthData.length && this._synthData[this._eventIndex].delta < this.currentTime) {
				if(this._synthData[this._eventIndex].event.getCommand() != 144 || !this._blockList[this._synthData[this._eventIndex].event.getChannel()]) {
					this.synth.midiEventQueue.addFirst(this._synthData[this._eventIndex]);
					this.synth.midiEventCounts[x]++;
				}
				this._eventIndex++;
			}
		}
	}
	,seek: function(milliseconds) {
		var targetSampleTime = this.synth.sampleRate * (milliseconds / 1000.0) | 0;
		if(targetSampleTime > this.currentTime) this.silentProcess(targetSampleTime - this.currentTime); else if(targetSampleTime < this.currentTime) {
			this.currentTime = 0;
			this._eventIndex = 0;
			this.synth.noteOffAll(true);
			this.synth.resetPrograms();
			this.synth.resetSynthControls();
			this.silentProcess(targetSampleTime);
		}
	}
	,setMute: function(channel,muteValue) {
		this._blockList[channel] = muteValue;
	}
	,unMuteAllChannels: function() {
		var _g1 = 0, _g = this._blockList.length;
		while(_g1 < _g) {
			var x = _g1++;
			this._blockList[x] = false;
		}
	}
	,muteAllChannels: function() {
		var _g1 = 0, _g = this._blockList.length;
		while(_g1 < _g) {
			var x = _g1++;
			this._blockList[x] = true;
		}
	}
	,isChannelMuted: function(channel) {
		return this._blockList[channel];
	}
	,stop: function() {
		this.isPlaying = false;
		this.currentTime = 0;
		this._eventIndex = 0;
	}
	,pause: function() {
		this.isPlaying = false;
	}
	,play: function() {
		if(this.isPlaying || this._synthData == null) return;
		this.isPlaying = true;
	}
	,unloadMidi: function() {
		if(this.isPlaying) return false;
		this._synthData = null;
		return true;
	}
	,loadMidi: function(midiFile) {
		if(this.isPlaying) return false;
		this.loadMidiFile(midiFile);
		return true;
	}
	,fireFinished: function() {
		var _g = 0, _g1 = this._finished;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(l != null) l();
		}
	}
	,addFinishedListener: function(listener) {
		this._finished.push(listener);
	}
	,set_playSpeed: function(value) {
		this._playbackRate = as.synthesis.SynthHelper.clampF(value,0.125,8.0);
		return this._playbackRate;
	}
	,get_playSpeed: function() {
		return this._playbackRate;
	}
	,get_isMidiLoaded: function() {
		return this._synthData != null;
	}
	,__class__: as.sequencer.MidiFileSequencer
}
as.sf2 = {}
as.sf2.SFSampleLink = function() { }
$hxClasses["as.sf2.SFSampleLink"] = as.sf2.SFSampleLink;
as.sf2.SFSampleLink.__name__ = ["as","sf2","SFSampleLink"];
as.sf2.GeneratorEnum = function() { }
$hxClasses["as.sf2.GeneratorEnum"] = as.sf2.GeneratorEnum;
as.sf2.GeneratorEnum.__name__ = ["as","sf2","GeneratorEnum"];
as.sf2.TransformEnum = function() { }
$hxClasses["as.sf2.TransformEnum"] = as.sf2.TransformEnum;
as.sf2.TransformEnum.__name__ = ["as","sf2","TransformEnum"];
as.sf2.ControllerSourceEnum = function() { }
$hxClasses["as.sf2.ControllerSourceEnum"] = as.sf2.ControllerSourceEnum;
as.sf2.ControllerSourceEnum.__name__ = ["as","sf2","ControllerSourceEnum"];
as.sf2.DirectionEnum = function() { }
$hxClasses["as.sf2.DirectionEnum"] = as.sf2.DirectionEnum;
as.sf2.DirectionEnum.__name__ = ["as","sf2","DirectionEnum"];
as.sf2.PolarityEnum = function() { }
$hxClasses["as.sf2.PolarityEnum"] = as.sf2.PolarityEnum;
as.sf2.PolarityEnum.__name__ = ["as","sf2","PolarityEnum"];
as.sf2.SourceTypeEnum = function() { }
$hxClasses["as.sf2.SourceTypeEnum"] = as.sf2.SourceTypeEnum;
as.sf2.SourceTypeEnum.__name__ = ["as","sf2","SourceTypeEnum"];
as.sf2.Generator = function(input) {
	this.generatorType = input.readUInt16();
	this._rawAmount = input.readUInt16();
};
$hxClasses["as.sf2.Generator"] = as.sf2.Generator;
as.sf2.Generator.__name__ = ["as","sf2","Generator"];
as.sf2.Generator.prototype = {
	set_highByteAmount: function(v) {
		return this._rawAmount = (this._rawAmount & 255) + (as.platform.TypeUtils.ToUInt8(v) << 8);
	}
	,get_highByteAmount: function() {
		return as.platform.TypeUtils.ToUInt8((this._rawAmount & 65280) >> 8);
	}
	,set_lowByteAmount: function(v) {
		return this._rawAmount = (this._rawAmount & 65280) + as.platform.TypeUtils.ToUInt8(v);
	}
	,get_lowByteAmount: function() {
		return as.platform.TypeUtils.ToUInt8(this._rawAmount & 255);
	}
	,set_amountInt16: function(v) {
		return this._rawAmount = as.platform.TypeUtils.ToInt16(v);
	}
	,get_amountInt16: function() {
		return as.platform.TypeUtils.ToInt16(this._rawAmount);
	}
	,__class__: as.sf2.Generator
}
as.sf2.Instrument = function() {
};
$hxClasses["as.sf2.Instrument"] = as.sf2.Instrument;
as.sf2.Instrument.__name__ = ["as","sf2","Instrument"];
as.sf2.Instrument.prototype = {
	__class__: as.sf2.Instrument
}
as.sf2.Modulator = function(input) {
	this._sourceModulationData = new as.sf2.ModulatorType(input);
	this._destinationGenerator = input.readUInt16();
	this._amount = input.readInt16();
	this._sourceModulationAmount = new as.sf2.ModulatorType(input);
	this._sourceTransform = input.readUInt16();
};
$hxClasses["as.sf2.Modulator"] = as.sf2.Modulator;
as.sf2.Modulator.__name__ = ["as","sf2","Modulator"];
as.sf2.Modulator.prototype = {
	__class__: as.sf2.Modulator
}
as.sf2.ModulatorType = function(input) {
	var raw = input.readUInt16();
	if((raw & 512) == 512) this.polarity = 1; else this.polarity = 0;
	if((raw & 256) == 256) this.direction = 1; else this.direction = 0;
	this.isMidiContinuousController = (raw & 128) == 128;
	this.sourceType = (raw & 64512) >> 10;
	this._controllerSource = as.platform.TypeUtils.ToUInt16(raw & 127);
};
$hxClasses["as.sf2.ModulatorType"] = as.sf2.ModulatorType;
as.sf2.ModulatorType.__name__ = ["as","sf2","ModulatorType"];
as.sf2.ModulatorType.prototype = {
	__class__: as.sf2.ModulatorType
}
as.sf2.PresetHeader = function() {
};
$hxClasses["as.sf2.PresetHeader"] = as.sf2.PresetHeader;
as.sf2.PresetHeader.__name__ = ["as","sf2","PresetHeader"];
as.sf2.PresetHeader.prototype = {
	__class__: as.sf2.PresetHeader
}
as.sf2.SampleHeader = function(input) {
	this.name = as.util.IOHelper.read8BitStringLength(input,20);
	this.start = input.readInt32();
	this.end = input.readInt32();
	this.startLoop = input.readInt32();
	this.endLoop = input.readInt32();
	this.sampleRate = input.readInt32();
	this.rootKey = input.readByte();
	this.tune = as.platform.TypeUtils.ToInt8(input.readByte());
	this.sampleLink = input.readUInt16();
	this.soundFontSampleLink = input.readUInt16();
};
$hxClasses["as.sf2.SampleHeader"] = as.sf2.SampleHeader;
as.sf2.SampleHeader.__name__ = ["as","sf2","SampleHeader"];
as.sf2.SampleHeader.prototype = {
	__class__: as.sf2.SampleHeader
}
as.sf2.Sf2Region = function() {
	this.generators = new Array(61);
};
$hxClasses["as.sf2.Sf2Region"] = as.sf2.Sf2Region;
as.sf2.Sf2Region.__name__ = ["as","sf2","Sf2Region"];
as.sf2.Sf2Region.prototype = {
	applyDefaultValues: function() {
		this.generators[0] = 0;
		this.generators[1] = 0;
		this.generators[2] = 0;
		this.generators[3] = 0;
		this.generators[4] = 0;
		this.generators[5] = 0;
		this.generators[6] = 0;
		this.generators[7] = 0;
		this.generators[8] = 13500;
		this.generators[9] = 0;
		this.generators[10] = 0;
		this.generators[11] = 0;
		this.generators[12] = 0;
		this.generators[13] = 0;
		this.generators[15] = 0;
		this.generators[16] = 0;
		this.generators[17] = 0;
		this.generators[21] = -12000;
		this.generators[22] = 0;
		this.generators[23] = -12000;
		this.generators[24] = 0;
		this.generators[25] = -12000;
		this.generators[26] = -12000;
		this.generators[27] = -12000;
		this.generators[28] = -12000;
		this.generators[29] = 0;
		this.generators[30] = -12000;
		this.generators[31] = 0;
		this.generators[32] = 0;
		this.generators[33] = -12000;
		this.generators[34] = -12000;
		this.generators[35] = -12000;
		this.generators[36] = -12000;
		this.generators[37] = 0;
		this.generators[38] = -12000;
		this.generators[39] = 0;
		this.generators[40] = 0;
		this.generators[43] = 32512;
		this.generators[44] = 32512;
		this.generators[45] = 0;
		this.generators[46] = -1;
		this.generators[47] = -1;
		this.generators[48] = 0;
		this.generators[50] = 0;
		this.generators[51] = 0;
		this.generators[52] = 0;
		this.generators[54] = 0;
		this.generators[56] = 100;
		this.generators[57] = 0;
		this.generators[58] = -1;
	}
	,__class__: as.sf2.Sf2Region
}
as.sf2.SoundFont = function() {
};
$hxClasses["as.sf2.SoundFont"] = as.sf2.SoundFont;
as.sf2.SoundFont.__name__ = ["as","sf2","SoundFont"];
as.sf2.SoundFont.prototype = {
	load: function(input) {
		var id = as.util.IOHelper.read8BitChars(input,4);
		var size = input.readInt32();
		if(id.toLowerCase() != "riff") throw "Invalid soundfont. Could not find RIFF header.";
		id = as.util.IOHelper.read8BitChars(input,4);
		if(id.toLowerCase() != "sfbk") throw "Invalid soundfont. Riff type is invalid.";
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Reading info chunk"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Reading info chunk"],{ fileName : "SoundFont.hx", lineNumber : 42, className : "as.sf2.SoundFont", methodName : "load"});
		this.info = new as.sf2.SoundFontInfo(input);
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Reading sampledata chunk"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Reading sampledata chunk"],{ fileName : "SoundFont.hx", lineNumber : 44, className : "as.sf2.SoundFont", methodName : "load"});
		this.sampleData = new as.sf2.SoundFontSampleData(input);
		if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",["Reading preset chunk"]);
		mconsole.Console.print(mconsole.LogLevel.debug,["Reading preset chunk"],{ fileName : "SoundFont.hx", lineNumber : 46, className : "as.sf2.SoundFont", methodName : "load"});
		this.presets = new as.sf2.SoundFontPresets(input);
	}
	,__class__: as.sf2.SoundFont
}
as.sf2.SoundFontInfo = function(input) {
	this.tools = "";
	this.comments = "";
	this.copyright = "";
	this.targetProduct = "";
	this.author = "";
	this.dataROM = "";
	this.creationDate = "";
	this.bankName = "";
	this.soundEngine = "";
	var id = as.util.IOHelper.read8BitChars(input,4);
	var size = input.readInt32();
	if(id.toLowerCase() != "list") throw "Invalid soundfont. Could not find INFO LIST chunk.";
	var readTo = input.get_position() + size;
	id = as.util.IOHelper.read8BitChars(input,4);
	if(id.toLowerCase() != "info") throw "Invalid soundfont. The LIST chunk is not of type INFO.";
	while(input.get_position() < readTo) {
		id = as.util.IOHelper.read8BitChars(input,4);
		size = input.readInt32();
		var _g = id.toLowerCase();
		switch(_g) {
		case "ifil":
			this.sfVersionMajor = input.readInt16();
			this.sfVersionMinor = input.readInt16();
			break;
		case "isng":
			this.soundEngine = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		case "inam":
			this.bankName = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		case "irom":
			this.dataROM = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		case "iver":
			this.romVersionMajor = input.readInt16();
			this.romVersionMinor = input.readInt16();
			break;
		case "icrd":
			this.creationDate = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		case "ieng":
			this.author = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		case "iprd":
			this.targetProduct = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		case "icop":
			this.copyright = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		case "icmt":
			this.comments = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		case "isft":
			this.tools = as.util.IOHelper.read8BitStringLength(input,size);
			break;
		default:
			throw "Invalid soundfont. The Chunk: " + id + " was not expected.";
		}
	}
};
$hxClasses["as.sf2.SoundFontInfo"] = as.sf2.SoundFontInfo;
as.sf2.SoundFontInfo.__name__ = ["as","sf2","SoundFontInfo"];
as.sf2.SoundFontInfo.prototype = {
	__class__: as.sf2.SoundFontInfo
}
as.sf2.SoundFontPresets = function(input) {
	var id = as.util.IOHelper.read8BitChars(input,4);
	var size = input.readInt32();
	if(id.toLowerCase() != "list") throw "Invalid soundfont. Could not find pdta LIST chunk.";
	var readTo = input.get_position() + size;
	id = as.util.IOHelper.read8BitChars(input,4);
	if(id.toLowerCase() != "pdta") throw "Invalid soundfont. The LIST chunk is not of type pdta.";
	var presetModulators = null;
	var presetGenerators = null;
	var instrumentModulators = null;
	var instrumentGenerators = null;
	var pbag = null;
	var ibag = null;
	var phdr = null;
	var inst = null;
	while(input.get_position() < readTo) {
		id = as.util.IOHelper.read8BitChars(input,4);
		size = input.readInt32();
		var _g = id.toLowerCase();
		switch(_g) {
		case "phdr":
			phdr = new as.sf2.chunks.PresetHeaderChunk(id,size,input);
			break;
		case "pbag":
			pbag = new as.sf2.chunks.ZoneChunk(id,size,input);
			break;
		case "pmod":
			presetModulators = new as.sf2.chunks.ModulatorChunk(id,size,input).modulators;
			break;
		case "pgen":
			presetGenerators = new as.sf2.chunks.GeneratorChunk(id,size,input).generators;
			break;
		case "inst":
			inst = new as.sf2.chunks.InstrumentChunk(id,size,input);
			break;
		case "ibag":
			ibag = new as.sf2.chunks.ZoneChunk(id,size,input);
			break;
		case "imod":
			instrumentModulators = new as.sf2.chunks.ModulatorChunk(id,size,input).modulators;
			break;
		case "igen":
			instrumentGenerators = new as.sf2.chunks.GeneratorChunk(id,size,input).generators;
			break;
		case "shdr":
			this.sampleHeaders = new as.sf2.chunks.SampleHeaderChunk(id,size,input).sampleHeaders;
			break;
		default:
			throw "Invalid soundfont. Unrecognized sub chunk: " + id;
		}
	}
	var pZones = pbag.toZones(presetModulators,presetGenerators);
	this.presetHeaders = phdr.toPresets(pZones);
	var iZones = ibag.toZones(instrumentModulators,instrumentGenerators);
	this.instruments = inst.toInstruments(iZones);
};
$hxClasses["as.sf2.SoundFontPresets"] = as.sf2.SoundFontPresets;
as.sf2.SoundFontPresets.__name__ = ["as","sf2","SoundFontPresets"];
as.sf2.SoundFontPresets.prototype = {
	__class__: as.sf2.SoundFontPresets
}
as.sf2.SoundFontSampleData = function(input) {
	var id = as.util.IOHelper.read8BitChars(input,4);
	var size = input.readInt32();
	if(id.toLowerCase() != "list") throw "Invalid soundfont. Could not find sdta LIST chunk.";
	var readTo = input.get_position() + size;
	id = as.util.IOHelper.read8BitChars(input,4);
	if(id.toLowerCase() != "sdta") throw "Invalid soundfont. The LIST chunk is not of type sdta.";
	this.bitsPerSample = 0;
	var rawSampleData = null;
	while(input.get_position() < readTo) {
		var subID = as.util.IOHelper.read8BitChars(input,4);
		var size1 = input.readInt32();
		var _g = subID.toLowerCase();
		switch(_g) {
		case "smpl":
			this.bitsPerSample = 16;
			rawSampleData = input.read(size1);
			this.sampleData = new Array(rawSampleData.length / 2 | 0);
			as.platform.TypeUtils.clearFloat32Array(this.sampleData);
			break;
		case "sm24":
			if(rawSampleData == null || size1 != (Math.ceil(this.sampleData.length / 2.0) | 0)) input.read(size1); else {
				this.bitsPerSample = 24;
				var _g2 = 0, _g1 = this.sampleData.length;
				while(_g2 < _g1) {
					var x = _g2++;
					var b = haxe.io.Bytes.alloc(3);
					b.b[0] = input.readByte() & 255;
					b.b[1] = rawSampleData.b[2 * x] & 255;
					b.b[2] = rawSampleData.b[2 * x + 1] & 255;
					this.sampleData[x] = as.util.IOHelper.readInt24(b,0) / 8388608;
				}
			}
			if(size1 % 2 == 1) {
				if(input.readByte() != 0) {
					var _g1 = input, _g2 = _g1.get_position();
					_g1.set_position(_g2 - 1);
					_g2;
				}
			}
			break;
		default:
			throw "Invalid soundfont. Unknown chunk id: " + subID + ".";
		}
	}
	if(this.bitsPerSample == 16) {
		var _g1 = 0, _g = this.sampleData.length;
		while(_g1 < _g) {
			var x = _g1++;
			this.sampleData[x] = as.util.IOHelper.readInt16(rawSampleData,2 * x) / 32768.0;
		}
	} else if(this.bitsPerSample != 24) throw "Only 16 and 24 bit samples are supported.";
};
$hxClasses["as.sf2.SoundFontSampleData"] = as.sf2.SoundFontSampleData;
as.sf2.SoundFontSampleData.__name__ = ["as","sf2","SoundFontSampleData"];
as.sf2.SoundFontSampleData.prototype = {
	__class__: as.sf2.SoundFontSampleData
}
as.sf2.Zone = function() {
};
$hxClasses["as.sf2.Zone"] = as.sf2.Zone;
as.sf2.Zone.__name__ = ["as","sf2","Zone"];
as.sf2.Zone.prototype = {
	__class__: as.sf2.Zone
}
as.sf2.chunks = {}
as.sf2.chunks.Chunk = function(id,size) {
	this.chunkId = id;
	this.chunkSize = size;
};
$hxClasses["as.sf2.chunks.Chunk"] = as.sf2.chunks.Chunk;
as.sf2.chunks.Chunk.__name__ = ["as","sf2","chunks","Chunk"];
as.sf2.chunks.Chunk.prototype = {
	__class__: as.sf2.chunks.Chunk
}
as.sf2.chunks.GeneratorChunk = function(id,size,input) {
	as.sf2.chunks.Chunk.call(this,id,size);
	if(size % 4 != 0) throw "Invalid SoundFont. The presetzone chunk was invalid.";
	this.generators = new Array(size / 4.0 - 1 | 0);
	var _g1 = 0, _g = this.generators.length;
	while(_g1 < _g) {
		var x = _g1++;
		this.generators[x] = new as.sf2.Generator(input);
	}
	new as.sf2.Generator(input);
};
$hxClasses["as.sf2.chunks.GeneratorChunk"] = as.sf2.chunks.GeneratorChunk;
as.sf2.chunks.GeneratorChunk.__name__ = ["as","sf2","chunks","GeneratorChunk"];
as.sf2.chunks.GeneratorChunk.__super__ = as.sf2.chunks.Chunk;
as.sf2.chunks.GeneratorChunk.prototype = $extend(as.sf2.chunks.Chunk.prototype,{
	__class__: as.sf2.chunks.GeneratorChunk
});
as.sf2.chunks.InstrumentChunk = function(id,size,input) {
	as.sf2.chunks.Chunk.call(this,id,size);
	if(size % 22 != 0) throw "Invalid SoundFont. The preset chunk was invalid.";
	this._rawInstruments = new Array(size / 22.0 | 0);
	var lastInstrument = null;
	var _g1 = 0, _g = this._rawInstruments.length;
	while(_g1 < _g) {
		var x = _g1++;
		var i = new as.sf2.chunks.RawInstrument();
		i.name = as.util.IOHelper.read8BitStringLength(input,20);
		i.startInstrumentZoneIndex = input.readUInt16();
		if(lastInstrument != null) lastInstrument.endInstrumentZoneIndex = as.platform.TypeUtils.ToUInt16(i.startInstrumentZoneIndex - 1);
		this._rawInstruments[x] = i;
		lastInstrument = i;
	}
};
$hxClasses["as.sf2.chunks.InstrumentChunk"] = as.sf2.chunks.InstrumentChunk;
as.sf2.chunks.InstrumentChunk.__name__ = ["as","sf2","chunks","InstrumentChunk"];
as.sf2.chunks.InstrumentChunk.__super__ = as.sf2.chunks.Chunk;
as.sf2.chunks.InstrumentChunk.prototype = $extend(as.sf2.chunks.Chunk.prototype,{
	toInstruments: function(zones) {
		var inst = new Array(this._rawInstruments.length - 1);
		var _g1 = 0, _g = inst.length;
		while(_g1 < _g) {
			var x = _g1++;
			var rawInst = this._rawInstruments[x];
			var i = new as.sf2.Instrument();
			i.name = rawInst.name;
			i.zones = new Array(rawInst.endInstrumentZoneIndex - rawInst.startInstrumentZoneIndex + 1);
			haxe.ds._Vector.Vector_Impl_.blit(zones,rawInst.startInstrumentZoneIndex,i.zones,0,i.zones.length);
			inst[x] = i;
		}
		return inst;
	}
	,__class__: as.sf2.chunks.InstrumentChunk
});
as.sf2.chunks.RawInstrument = function() {
};
$hxClasses["as.sf2.chunks.RawInstrument"] = as.sf2.chunks.RawInstrument;
as.sf2.chunks.RawInstrument.__name__ = ["as","sf2","chunks","RawInstrument"];
as.sf2.chunks.RawInstrument.prototype = {
	__class__: as.sf2.chunks.RawInstrument
}
as.sf2.chunks.ModulatorChunk = function(id,size,input) {
	as.sf2.chunks.Chunk.call(this,id,size);
	if(size % 10 != 0) throw "Invalid SoundFont. The presetzone chunk was invalid.";
	this.modulators = new Array(size / 10.0 - 1 | 0);
	var _g1 = 0, _g = this.modulators.length;
	while(_g1 < _g) {
		var x = _g1++;
		this.modulators[x] = new as.sf2.Modulator(input);
	}
	new as.sf2.Modulator(input);
};
$hxClasses["as.sf2.chunks.ModulatorChunk"] = as.sf2.chunks.ModulatorChunk;
as.sf2.chunks.ModulatorChunk.__name__ = ["as","sf2","chunks","ModulatorChunk"];
as.sf2.chunks.ModulatorChunk.__super__ = as.sf2.chunks.Chunk;
as.sf2.chunks.ModulatorChunk.prototype = $extend(as.sf2.chunks.Chunk.prototype,{
	__class__: as.sf2.chunks.ModulatorChunk
});
as.sf2.chunks.PresetHeaderChunk = function(id,size,input) {
	as.sf2.chunks.Chunk.call(this,id,size);
	if(size % 38 != 0) throw "Invalid SoundFont. The preset chunk was invalid.";
	this._rawPresets = new Array(size / 38.0 | 0);
	var lastPreset = null;
	var _g1 = 0, _g = this._rawPresets.length;
	while(_g1 < _g) {
		var x = _g1++;
		var p = new as.sf2.chunks.RawPreset();
		p.name = as.util.IOHelper.read8BitStringLength(input,20);
		p.patchNumber = input.readUInt16();
		p.bankNumber = input.readUInt16();
		p.startPresetZoneIndex = input.readUInt16();
		p.library = haxe.Int64.getLow(as.util.IOHelper.readUInt32(input));
		p.genre = haxe.Int64.getLow(as.util.IOHelper.readUInt32(input));
		p.morphology = haxe.Int64.getLow(as.util.IOHelper.readUInt32(input));
		if(lastPreset != null) lastPreset.endPresetZoneIndex = as.platform.TypeUtils.ToUInt16(p.startPresetZoneIndex - 1);
		this._rawPresets[x] = p;
		lastPreset = p;
	}
};
$hxClasses["as.sf2.chunks.PresetHeaderChunk"] = as.sf2.chunks.PresetHeaderChunk;
as.sf2.chunks.PresetHeaderChunk.__name__ = ["as","sf2","chunks","PresetHeaderChunk"];
as.sf2.chunks.PresetHeaderChunk.__super__ = as.sf2.chunks.Chunk;
as.sf2.chunks.PresetHeaderChunk.prototype = $extend(as.sf2.chunks.Chunk.prototype,{
	toPresets: function(presetZones) {
		var presets = new Array(this._rawPresets.length - 1);
		var _g1 = 0, _g = presets.length;
		while(_g1 < _g) {
			var x = _g1++;
			var rawPreset = this._rawPresets[x];
			var p = new as.sf2.PresetHeader();
			p.bankNumber = rawPreset.bankNumber;
			p.genre = rawPreset.genre;
			p.library = rawPreset.library;
			p.morphology = rawPreset.morphology;
			p.name = rawPreset.name;
			p.patchNumber = rawPreset.patchNumber;
			p.zones = new Array(rawPreset.endPresetZoneIndex - rawPreset.startPresetZoneIndex + 1);
			haxe.ds._Vector.Vector_Impl_.blit(presetZones,rawPreset.startPresetZoneIndex,p.zones,0,p.zones.length);
			presets[x] = p;
		}
		return presets;
	}
	,__class__: as.sf2.chunks.PresetHeaderChunk
});
as.sf2.chunks.RawPreset = function() {
};
$hxClasses["as.sf2.chunks.RawPreset"] = as.sf2.chunks.RawPreset;
as.sf2.chunks.RawPreset.__name__ = ["as","sf2","chunks","RawPreset"];
as.sf2.chunks.RawPreset.prototype = {
	__class__: as.sf2.chunks.RawPreset
}
as.sf2.chunks.SampleHeaderChunk = function(id,size,input) {
	as.sf2.chunks.Chunk.call(this,id,size);
	if(size % 46 != 0) throw "Invalid SoundFont. The sample header chunk was invalid.";
	this.sampleHeaders = new Array(size / 46.0 - 1 | 0);
	var _g1 = 0, _g = this.sampleHeaders.length;
	while(_g1 < _g) {
		var x = _g1++;
		this.sampleHeaders[x] = new as.sf2.SampleHeader(input);
	}
	new as.sf2.SampleHeader(input);
};
$hxClasses["as.sf2.chunks.SampleHeaderChunk"] = as.sf2.chunks.SampleHeaderChunk;
as.sf2.chunks.SampleHeaderChunk.__name__ = ["as","sf2","chunks","SampleHeaderChunk"];
as.sf2.chunks.SampleHeaderChunk.__super__ = as.sf2.chunks.Chunk;
as.sf2.chunks.SampleHeaderChunk.prototype = $extend(as.sf2.chunks.Chunk.prototype,{
	__class__: as.sf2.chunks.SampleHeaderChunk
});
as.sf2.chunks.ZoneChunk = function(id,size,input) {
	as.sf2.chunks.Chunk.call(this,id,size);
	this._zoneData = new Array(size / 4.0 | 0);
	var lastZone = null;
	var _g1 = 0, _g = this._zoneData.length;
	while(_g1 < _g) {
		var x = _g1++;
		var z = new as.sf2.chunks.RawZoneData();
		z.generatorIndex = input.readUInt16();
		z.modulatorIndex = input.readUInt16();
		if(lastZone != null) {
			lastZone.generatorCount = as.platform.TypeUtils.ToUInt16(z.generatorIndex - lastZone.generatorIndex);
			lastZone.modulatorCount = as.platform.TypeUtils.ToUInt16(z.modulatorIndex - lastZone.modulatorIndex);
		}
		this._zoneData[x] = z;
		lastZone = z;
	}
};
$hxClasses["as.sf2.chunks.ZoneChunk"] = as.sf2.chunks.ZoneChunk;
as.sf2.chunks.ZoneChunk.__name__ = ["as","sf2","chunks","ZoneChunk"];
as.sf2.chunks.ZoneChunk.__super__ = as.sf2.chunks.Chunk;
as.sf2.chunks.ZoneChunk.prototype = $extend(as.sf2.chunks.Chunk.prototype,{
	toZones: function(modulators,generators) {
		var zones = new Array(this._zoneData.length - 1);
		var _g1 = 0, _g = zones.length;
		while(_g1 < _g) {
			var x = _g1++;
			var rawZone = this._zoneData[x];
			var zone = new as.sf2.Zone();
			zone.generators = new Array(rawZone.generatorCount);
			haxe.ds._Vector.Vector_Impl_.blit(generators,rawZone.generatorIndex,zone.generators,0,rawZone.generatorCount);
			zone.modulators = new Array(rawZone.modulatorCount);
			haxe.ds._Vector.Vector_Impl_.blit(modulators,rawZone.modulatorIndex,zone.modulators,0,rawZone.modulatorCount);
			zones[x] = zone;
		}
		return zones;
	}
	,__class__: as.sf2.chunks.ZoneChunk
});
as.sf2.chunks.RawZoneData = function() {
};
$hxClasses["as.sf2.chunks.RawZoneData"] = as.sf2.chunks.RawZoneData;
as.sf2.chunks.RawZoneData.__name__ = ["as","sf2","chunks","RawZoneData"];
as.sf2.chunks.RawZoneData.prototype = {
	__class__: as.sf2.chunks.RawZoneData
}
as.synthesis = {}
as.synthesis.VoiceStateEnum = function() { }
$hxClasses["as.synthesis.VoiceStateEnum"] = as.synthesis.VoiceStateEnum;
as.synthesis.VoiceStateEnum.__name__ = ["as","synthesis","VoiceStateEnum"];
as.synthesis.PanFormulaEnum = function() { }
$hxClasses["as.synthesis.PanFormulaEnum"] = as.synthesis.PanFormulaEnum;
as.synthesis.PanFormulaEnum.__name__ = ["as","synthesis","PanFormulaEnum"];
as.synthesis.PanComponent = function() {
};
$hxClasses["as.synthesis.PanComponent"] = as.synthesis.PanComponent;
as.synthesis.PanComponent.__name__ = ["as","synthesis","PanComponent"];
as.synthesis.PanComponent.prototype = {
	setValue: function(value,formula) {
		value = as.synthesis.SynthHelper.clampF(value,-1,1);
		switch(formula) {
		case 0:
			var dvalue = as.util.SynthConstants.HalfPi * (value + 1) / 2.0;
			this.left = Math.cos(dvalue);
			this.right = Math.sin(dvalue);
			break;
		case 1:
			this.left = .5 + value * -.5;
			this.right = .5 + value * .5;
			break;
		case 2:
			var dvalue = as.util.SynthConstants.HalfPi * (value + 1.0) / 2.0;
			this.left = Math.cos(dvalue) / 0.707106781186;
			this.right = Math.sin(dvalue) / 0.707106781186;
			break;
		default:
			throw "Invalid pan law selected.";
		}
	}
	,__class__: as.synthesis.PanComponent
}
as.synthesis.SynthHelper = function() { }
$hxClasses["as.synthesis.SynthHelper"] = as.synthesis.SynthHelper;
as.synthesis.SynthHelper.__name__ = ["as","synthesis","SynthHelper"];
as.synthesis.SynthHelper.clampF = function(value,min,max) {
	if(value <= min) return min; else if(value >= max) return max; else return value;
}
as.synthesis.SynthHelper.clampI = function(value,min,max) {
	if(value <= min) return min; else if(value >= max) return max; else return value;
}
as.synthesis.SynthHelper.clampS = function(value,min,max) {
	if(value <= min) return min; else if(value >= max) return max; else return value;
}
as.synthesis.SynthHelper.nearestPowerOfTwo = function(value) {
	return Math.pow(2,Math.round(Math.log(value) / Math.log(2)));
}
as.synthesis.SynthHelper.samplesFromTime = function(sampleRate,seconds) {
	return sampleRate * seconds;
}
as.synthesis.SynthHelper.timeFromSamples = function(sampleRate,samples) {
	return samples / js.Boot.__cast(sampleRate , Float);
}
as.synthesis.SynthHelper.dBtoLinear = function(dBvalue) {
	return Math.pow(10.0,dBvalue / 20.0);
}
as.synthesis.SynthHelper.lineartoDB = function(linearvalue) {
	return 20.0 * (Math.log(linearvalue) / Math.log(10));
}
as.synthesis.SynthHelper.frequencyToKey = function(frequency,rootkey) {
	return 12.0 * (Math.log(frequency / 440.0) / Math.log(2.0)) + rootkey;
}
as.synthesis.SynthHelper.keyToFrequency = function(key,rootkey) {
	return Math.pow(2.0,(key - rootkey) / 12.0) * 440.0;
}
as.synthesis.SynthHelper.semitoneToPitch = function(key) {
	if(key < -127) key = -127; else if(key > 127) key = 127;
	return as.util.Tables.semitoneTable(127 + key);
}
as.synthesis.SynthHelper.centsToPitch = function(cents) {
	var key = cents / 100.0 | 0;
	cents -= key * 100;
	if(key < -127) key = -127; else if(key > 127) key = 127;
	return as.util.Tables.semitoneTable(127 + key) * as.util.Tables.centTable(100 + cents);
}
as.synthesis.SynthHelper.mixStereoToStereoInterpolation = function(startIndex,leftVol,rightVol,voiceParams) {
	var inc_l = (leftVol - voiceParams.mixing[0]) / 64;
	var inc_r = (rightVol - voiceParams.mixing[1]) / 64;
	var i = 0;
	while(i < voiceParams.blockBuffer.length) {
		voiceParams.mixing[0] += inc_l;
		voiceParams.mixing[1] += inc_r;
		voiceParams.synth.sampleBuffer[startIndex + i] += voiceParams.blockBuffer[i++] * voiceParams.mixing[0];
		voiceParams.synth.sampleBuffer[startIndex + i] += voiceParams.blockBuffer[i] * voiceParams.mixing[1];
		i++;
	}
	voiceParams.mixing[0] = leftVol;
	voiceParams.mixing[1] = rightVol;
}
as.synthesis.SynthHelper.mixMonoToStereoInterpolation = function(startIndex,leftVol,rightVol,voiceParams) {
	var inc_l = (leftVol - voiceParams.mixing[0]) / 64;
	var inc_r = (rightVol - voiceParams.mixing[1]) / 64;
	var _g1 = 0, _g = voiceParams.blockBuffer.length;
	while(_g1 < _g) {
		var i = _g1++;
		voiceParams.mixing[0] += inc_l;
		voiceParams.mixing[1] += inc_r;
		voiceParams.synth.sampleBuffer[startIndex] += voiceParams.blockBuffer[i] * voiceParams.mixing[0];
		voiceParams.synth.sampleBuffer[startIndex + 1] += voiceParams.blockBuffer[i] * voiceParams.mixing[1];
		startIndex += 2;
	}
	voiceParams.mixing[0] = leftVol;
	voiceParams.mixing[1] = rightVol;
}
as.synthesis.SynthHelper.mixMonoToMonoInterpolation = function(startIndex,volume,voiceParams) {
	var inc = (volume - voiceParams.mixing[0]) / 64;
	var _g1 = 0, _g = voiceParams.blockBuffer.length;
	while(_g1 < _g) {
		var i = _g1++;
		voiceParams.mixing[0] += inc;
		voiceParams.synth.sampleBuffer[startIndex + i] += voiceParams.blockBuffer[i] * voiceParams.mixing[0];
	}
	voiceParams.mixing[0] = volume;
}
as.synthesis.SynthEvent = function(event) {
	this.event = event;
};
$hxClasses["as.synthesis.SynthEvent"] = as.synthesis.SynthEvent;
as.synthesis.SynthEvent.__name__ = ["as","synthesis","SynthEvent"];
as.synthesis.SynthEvent.prototype = {
	__class__: as.synthesis.SynthEvent
}
as.synthesis.Synthesizer = function(sampleRate,audioChannels,bufferSize,bufferCount,polyphony) {
	var MinSampleRate = 8000;
	var MaxSampleRate = 96000;
	if(sampleRate < MinSampleRate || sampleRate > MaxSampleRate) throw "Invalid paramater: (sampleRate) Valid ranges are " + MinSampleRate + " to " + MaxSampleRate;
	if(audioChannels < 1 || audioChannels > 2) throw "Invalid paramater: (audioChannels) Valid ranges are " + 1 + " to " + 2;
	this._midiMessageProcessed = new Array();
	this._masterVolume = 1;
	this._synthGain = 0.35;
	this.sampleRate = sampleRate;
	this.audioChannels = audioChannels;
	this.microBufferSize = as.synthesis.SynthHelper.clampI(bufferSize,0.001 * sampleRate | 0,0.05 * sampleRate | 0);
	this.microBufferSize = Math.ceil(this.microBufferSize / 64) * 64 | 0;
	this.microBufferCount = Math.max(1,bufferCount) | 0;
	this.sampleBuffer = new Array(this.microBufferSize * this.microBufferCount * audioChannels);
	as.platform.TypeUtils.clearFloat32Array(this.sampleBuffer);
	this.littleEndian = true;
	this._bankSelect = new Array(16);
	as.platform.TypeUtils.clearIntArray(this._bankSelect);
	this.programs = new Array(16);
	as.platform.TypeUtils.clearIntArray(this.programs);
	this._channelPressure = new Array(16);
	as.platform.TypeUtils.clearFloat32Array(this._channelPressure);
	this._pan = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._pan);
	this._volume = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._volume);
	this._expression = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._expression);
	this._modRange = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._modRange);
	this._pitchBend = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._pitchBend);
	this._pitchBendRange = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._pitchBendRange);
	this._masterCoarseTune = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._masterCoarseTune);
	this._masterFineTune = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._masterFineTune);
	this._holdPedal = new Array(16);
	this._rpn = new Array(16);
	as.platform.TypeUtils.clearShortArray(this._rpn);
	this.modWheel = new Array(16);
	as.platform.TypeUtils.clearFloat32Array(this.modWheel);
	this.panPositions = new Array(16);
	this.totalPitch = new Array(16);
	as.platform.TypeUtils.clearIntArray(this.totalPitch);
	this.totalVolume = new Array(16);
	as.platform.TypeUtils.clearFloat32Array(this.totalVolume);
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		this.panPositions[i] = new as.synthesis.PanComponent();
	}
	this.resetSynthControls();
	this._voiceManager = new as.synthesis.VoiceManager(as.synthesis.SynthHelper.clampI(polyphony,5,250),this);
	this.midiEventQueue = new as.ds.LinkedList();
	this.midiEventCounts = new Array(this.microBufferCount);
	as.platform.TypeUtils.clearIntArray(this.midiEventCounts);
};
$hxClasses["as.synthesis.Synthesizer"] = as.synthesis.Synthesizer;
as.synthesis.Synthesizer.__name__ = ["as","synthesis","Synthesizer"];
as.synthesis.Synthesizer.prototype = {
	fireMidiMessageProcessed: function(event) {
		var _g = 0, _g1 = this._midiMessageProcessed;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(l != null) l(event);
		}
	}
	,addMidiMessageProcessed: function(listener) {
		this._midiMessageProcessed.push(listener);
	}
	,processMidiMessage: function(event) {
		var command = event.getCommand();
		var channel = event.getChannel();
		var data1 = event.getData1();
		var data2 = event.getData2();
		switch(command) {
		case 128:
			this.noteOff(channel,data1);
			break;
		case 144:
			if(data2 == 0) this.noteOff(channel,data1); else this.noteOn(channel,data1,data2);
			break;
		case 160:
			break;
		case 176:
			switch(data1) {
			case 0:
				if(channel == 9) data2 += 128;
				if(this.soundBank.isBankLoaded(data2)) this._bankSelect[channel] = data2; else this._bankSelect[channel] = channel == 9?128:0;
				break;
			case 1:
				this._modRange[channel] = this._modRange[channel] & 127 | data2 << 7;
				this.modWheel[channel] = 100 * (this._modRange[channel] / 16383.0);
				break;
			case 33:
				this._modRange[channel] = this._modRange[channel] & 65408 | data2;
				this.modWheel[channel] = 100 * (this._modRange[channel] / 16383.0);
				break;
			case 7:
				this._volume[channel] = this._volume[channel] & 127 | data2 << 7;
				this.updateTotalVolume(channel);
				break;
			case 39:
				this._volume[channel] = this._volume[channel] & 65408 | data2;
				this.updateTotalVolume(channel);
				break;
			case 10:
				this._pan[channel] = this._pan[channel] & 127 | data2 << 7;
				this.updatePan(channel);
				break;
			case 42:
				this._pan[channel] = this._pan[channel] & 65408 | data2;
				this.updatePan(channel);
				break;
			case 11:
				this._expression[channel] = this._expression[channel] & 127 | data2 << 7;
				this.updateTotalVolume(channel);
				break;
			case 43:
				this._expression[channel] = this._expression[channel] & 65408 | data2;
				this.updateTotalVolume(channel);
				break;
			case 64:
				if(this._holdPedal[channel] && !(data2 > 63)) {
					var node = this._voiceManager.activeVoices.first;
					while(node != null) {
						if(node.value.voiceParams.noteOffPending) {
							node.value.stop();
							this._voiceManager.removeVoiceFromRegistry(node.value);
						}
						node = node.get_next();
					}
				}
				this._holdPedal[channel] = data2 > 63;
				break;
			case 99:
				this._rpn[channel] = -1;
				break;
			case 98:
				this._rpn[channel] = -1;
				break;
			case 101:
				this._rpn[channel] = this._rpn[channel] & 127 | data2 << 7;
				break;
			case 100:
				this._rpn[channel] = this._rpn[channel] & 65408 | data2;
				break;
			case 123:
				this.noteOffAll(false);
				break;
			case 6:
				if(this._rpn[channel] == 0) {
					this._pitchBendRange[channel] = this._pitchBendRange[channel] & 127 | data2 << 7;
					this.updateTotalPitch(channel);
				} else if(this._rpn[channel] == 1) {
					this._masterFineTune[channel] = this._masterFineTune[channel] & 127 | data2 << 7;
					this.updateTotalPitch(channel);
				} else if(this._rpn[channel] == 2) {
					this._masterCoarseTune[channel] = data2 - 64;
					this.updateTotalPitch(channel);
				}
				break;
			case 38:
				if(this._rpn[channel] == 0) {
					this._pitchBendRange[channel] = this._pitchBendRange[channel] & 65408 | data2;
					this.updateTotalPitch(channel);
				} else if(this._rpn[channel] == 1) {
					this._masterFineTune[channel] = this._masterFineTune[channel] & 65408 | data2;
					this.updateTotalPitch(channel);
				}
				break;
			case 121:
				this.resetSynthControls();
				break;
			default:
				return;
			}
			break;
		case 192:
			this.programs[channel] = data1;
			break;
		case 208:
			this._channelPressure[channel] = data2 / 127.0;
			this.updateTotalVolume(channel);
			break;
		case 224:
			this._pitchBend[channel] = data1 | data2 << 7;
			this.updateTotalPitch(channel);
			break;
		default:
		}
		this.fireMidiMessageProcessed(event);
	}
	,noteOffAllChannel: function(channel,immediate) {
		var node = this._voiceManager.activeVoices.first;
		while(node != null) if(channel == node.value.voiceParams.channel) {
			if(immediate) {
				node.value.stopImmediately();
				var delnode = node;
				node = node.get_next();
				this._voiceManager.activeVoices.remove(delnode);
				this._voiceManager.freeVoices.addFirst(delnode.value);
			} else {
				if(this._holdPedal[channel]) node.value.voiceParams.noteOffPending = true; else node.value.stop();
				node = node.get_next();
			}
		}
	}
	,noteOffAll: function(immediate) {
		var node = this._voiceManager.activeVoices.first;
		if(immediate) {
			this._voiceManager.clearRegistry();
			while(node != null) {
				node.value.stopImmediately();
				var delnode = node;
				node = node.get_next();
				this._voiceManager.activeVoices.remove(delnode);
				this._voiceManager.freeVoices.addFirst(delnode.value);
			}
		} else while(node != null) {
			if(this._holdPedal[node.value.voiceParams.channel]) node.value.voiceParams.noteOffPending = true; else node.value.stop();
			node = node.get_next();
		}
	}
	,noteOff: function(channel,note) {
		if(this._holdPedal[channel]) {
			var node = this._voiceManager.registry[channel][note];
			while(node != null) {
				node.value.voiceParams.noteOffPending = true;
				node = node.next;
			}
		} else {
			var node = this._voiceManager.registry[channel][note];
			while(node != null) {
				node.value.stop();
				node = node.next;
			}
			this._voiceManager.removeFromRegistry(channel,note);
		}
	}
	,noteOn: function(channel,note,velocity) {
		var inst = this.soundBank.getPatchByNumber(this._bankSelect[channel],this.programs[channel]);
		if(inst == null) return;
		var layers = new Array();
		if(js.Boot.__instanceof(inst,as.bank.patch.MultiPatch)) {
			var multi = inst;
			multi.findPatches(channel,note,velocity,layers);
			if(layers.length == 0) return;
		} else layers.push(inst);
		if(this._voiceManager.registry[channel][note] != null) {
			var node = this._voiceManager.registry[channel][note];
			while(node != null) {
				node.value.stop();
				node = node.next;
			}
			this._voiceManager.removeFromRegistry(channel,note);
		}
		var _g1 = 0, _g = layers.length;
		while(_g1 < _g) {
			var x = _g1++;
			var notseen = true;
			var i = x - 1;
			while(i >= 0) {
				if(layers[x].exclusiveGroupTarget == layers[i].exclusiveGroupTarget) {
					notseen = false;
					break;
				}
				i--;
			}
			if(layers[x].exclusiveGroupTarget != 0 && notseen) {
				var node = this._voiceManager.activeVoices.first;
				while(node != null) {
					if(layers[x].exclusiveGroupTarget == node.value.patch.exclusiveGroup) {
						node.value.stop();
						this._voiceManager.removeVoiceFromRegistry(node.value);
					}
					node = node.get_next();
				}
			}
		}
		var _g1 = 0, _g = layers.length;
		while(_g1 < _g) {
			var x = _g1++;
			var voice = this._voiceManager.getFreeVoice();
			voice.configure(channel,note,velocity,layers[x]);
			this._voiceManager.addToRegistry(voice);
			this._voiceManager.activeVoices.addLast(voice);
			voice.start();
		}
	}
	,updatePan: function(channel) {
		var value = as.util.SynthConstants.HalfPi * (this._pan[channel] / 16383.0);
		this.panPositions[channel].left = Math.cos(value);
		this.panPositions[channel].right = Math.sin(value);
	}
	,updateTotalVolume: function(channel) {
		this.totalVolume[channel] = this._channelPressure[channel] * (this._volume[channel] / 16383.0) * (this._expression[channel] / 16383.0);
	}
	,updateTotalPitch: function(channel) {
		var cents = (this._pitchBend[channel] - 8192.0) / 8192.0 * (100 * (this._pitchBendRange[channel] >> 7) + (this._pitchBendRange[channel] & 127));
		cents += 100.0 * (this._masterCoarseTune[channel] + (this._masterFineTune[channel] - 8192.0) / 8192.0);
		this.totalPitch[channel] = cents | 0;
	}
	,convertWorkingBuffer: function(to,from) {
		var i = 0;
		if(this.littleEndian) {
			var _g1 = 0, _g = from.length;
			while(_g1 < _g) {
				var x = _g1++;
				var s = as.synthesis.SynthHelper.clampF(from[x] * this._masterVolume,-1.0,1.0) * 32767 | 0;
				to.b[i] = s & 255 & 255;
				to.b[i + 1] = s >> 8 & 255 & 255;
				i += 2;
			}
		} else {
			var _g1 = 0, _g = from.length;
			while(_g1 < _g) {
				var x = _g1++;
				var s = as.synthesis.SynthHelper.clampF(from[x] * this._masterVolume,-1.0,1.0) * 32767 | 0;
				to.b[i] = s >> 8 & 255 & 255;
				to.b[i + 1] = s & 255 & 255;
				i += 2;
			}
		}
	}
	,fillWorkingBuffer: function() {
		var sampleIndex = 0;
		var _g1 = 0, _g = this.microBufferCount;
		while(_g1 < _g) {
			var x = _g1++;
			if(this.midiEventQueue.length > 0) {
				var _g3 = 0, _g2 = this.midiEventCounts[x];
				while(_g3 < _g2) {
					var i = _g3++;
					var m = this.midiEventQueue.removeLast();
					this.processMidiMessage(m.event);
				}
			}
			var node = this._voiceManager.activeVoices.first;
			while(node != null) {
				node.value.process(sampleIndex,sampleIndex + this.microBufferSize * this.audioChannels);
				if(node.value.voiceParams.state == 0) {
					var delnode = node;
					node = node.get_next();
					this._voiceManager.removeVoiceFromRegistry(delnode.value);
					this._voiceManager.activeVoices.remove(delnode);
					this._voiceManager.freeVoices.addFirst(delnode.value);
				} else node = node.get_next();
			}
			sampleIndex += this.microBufferSize * this.audioChannels;
		}
		as.platform.TypeUtils.clearIntArray(this.midiEventCounts);
	}
	,getChannelHoldPedalStatus: function(channel) {
		return this._holdPedal[channel];
	}
	,getChannelPitchBend: function(channel) {
		return (this._pitchBend[channel] - 8192.0) / 8192.0;
	}
	,getChannelPan: function(channel) {
		return (this._pan[channel] - 8192.0) / 8192.0;
	}
	,getChannelExpression: function(channel) {
		return this._expression[channel] / 16383.0;
	}
	,getChannelVolume: function(channel) {
		return this._volume[channel] / 16383.0;
	}
	,getNext: function(buffer) {
		this.synthesize();
		this.convertWorkingBuffer(buffer,this.sampleBuffer);
	}
	,synthesize: function() {
		as.platform.TypeUtils.clearFloat32Array(this.sampleBuffer);
		this.fillWorkingBuffer();
	}
	,setAudioChannelCount: function(channels) {
		channels = as.synthesis.SynthHelper.clampI(channels,1,2);
		if(this.audioChannels != channels) {
			this.audioChannels = channels;
			this.sampleBuffer = new Array(this.microBufferSize * this.microBufferCount * this.audioChannels);
			as.platform.TypeUtils.clearFloat32Array(this.sampleBuffer);
		}
	}
	,getProgram: function(channel) {
		if(this.soundBank != null) {
			var inst = this.soundBank.getPatchByNumber(channel == 9?128:this._bankSelect[channel],this.programs[channel]);
			if(inst != null) return inst;
		}
		return null;
	}
	,getProgramName: function(channel) {
		var p = this.getProgram(channel);
		if(p == null) return "null";
		return p.name;
	}
	,resetPrograms: function() {
		as.platform.TypeUtils.clearIntArray(this.programs);
	}
	,resetSynthControls: function() {
		var _g = 0;
		while(_g < 16) {
			var x = _g++;
			this._bankSelect[x] = 0;
			this._channelPressure[x] = 1.0;
			this._pan[x] = 8192;
			this._volume[x] = 11520;
			this._expression[x] = 12800;
			this._pitchBend[x] = 8192;
			this._modRange[x] = 0;
			this.modWheel[x] = 0;
			this._pitchBendRange[x] = 256;
			this._masterCoarseTune[x] = 0;
			this._masterFineTune[x] = 8192;
			this._holdPedal[x] = false;
			this._rpn[x] = -1;
			this.updateTotalPitch(x);
			this.updateTotalVolume(x);
			this.updatePan(x);
		}
		this._bankSelect[9] = 128;
	}
	,stop: function() {
		this.resetSynthControls();
		this.resetPrograms();
		this.noteOffAll(true);
	}
	,unloadBank: function() {
		if(this.soundBank != null) {
			this.noteOffAll(true);
			this._voiceManager.unloadPatches();
			this.soundBank = null;
		}
	}
	,loadBank: function(bank) {
		this.unloadBank();
		this.soundBank = bank;
	}
	,set_mixGain: function(v) {
		this._synthGain = as.synthesis.SynthHelper.clampF(v,0.5,1);
		return this._synthGain;
	}
	,get_mixGain: function() {
		return this._synthGain;
	}
	,set_masterVolume: function(v) {
		this._masterVolume = as.synthesis.SynthHelper.clampF(v,0,3);
		return this._masterVolume;
	}
	,get_masterVolume: function() {
		return this._masterVolume;
	}
	,get_polyphony: function() {
		return this._voiceManager.polyphony;
	}
	,get_workingBufferSize: function() {
		return this.sampleBuffer.length;
	}
	,get_rawBufferSize: function() {
		return this.sampleBuffer.length * 2;
	}
	,get_freeVoices: function() {
		return this._voiceManager.freeVoices.length;
	}
	,get_activeVoices: function() {
		return this._voiceManager.activeVoices.length;
	}
	,__class__: as.synthesis.Synthesizer
}
as.synthesis.Voice = function(synth) {
	this.voiceParams = new as.synthesis.VoiceParameters(synth);
};
$hxClasses["as.synthesis.Voice"] = as.synthesis.Voice;
as.synthesis.Voice.__name__ = ["as","synthesis","Voice"];
as.synthesis.Voice.prototype = {
	configure: function(channel,note,velocity,patch) {
		as.platform.TypeUtils.clearFloat32Array(this.voiceParams.mixing);
		this.voiceParams.pitchOffset = 0;
		this.voiceParams.volOffset = 0;
		this.voiceParams.noteOffPending = false;
		this.voiceParams.channel = channel;
		this.voiceParams.note = note;
		this.voiceParams.velocity = velocity;
		this.patch = patch;
		if(patch == null) this.voiceParams.generators = null; else this.voiceParams.generators = patch.generatorInfo;
	}
	,process: function(startIndex,endIndex) {
		if(this.voiceParams.state == 0) return;
		this.patch.process(this.voiceParams,startIndex,endIndex);
	}
	,stopImmediately: function() {
		this.voiceParams.state = 0;
	}
	,stop: function() {
		if(this.voiceParams.state != 2) return;
		this.voiceParams.state = 1;
		this.patch.stop(this.voiceParams);
	}
	,start: function() {
		if(this.voiceParams.state != 0) return;
		if(this.patch.start(this.voiceParams)) this.voiceParams.state = 2;
	}
	,__class__: as.synthesis.Voice
}
as.synthesis.VoiceStealingMethod = function() { }
$hxClasses["as.synthesis.VoiceStealingMethod"] = as.synthesis.VoiceStealingMethod;
as.synthesis.VoiceStealingMethod.__name__ = ["as","synthesis","VoiceStealingMethod"];
as.synthesis.VoiceNode = function() {
};
$hxClasses["as.synthesis.VoiceNode"] = as.synthesis.VoiceNode;
as.synthesis.VoiceNode.__name__ = ["as","synthesis","VoiceNode"];
as.synthesis.VoiceNode.prototype = {
	__class__: as.synthesis.VoiceNode
}
as.synthesis.VoiceManager = function(voiceCount,synth) {
	this.stealingMethod = 0;
	this.polyphony = voiceCount;
	this._voicePool = new Array(voiceCount);
	this._vNodes = new haxe.ds.GenericStack();
	this.freeVoices = new as.ds.LinkedList();
	this.activeVoices = new as.ds.LinkedList();
	var _g = 0;
	while(_g < voiceCount) {
		var i = _g++;
		var v = new as.synthesis.Voice(synth);
		this._voicePool[i] = v;
		this._vNodes.add(new as.synthesis.VoiceNode());
		this.freeVoices.addLast(v);
	}
	this.registry = new Array(16);
	var _g1 = 0, _g = this.registry.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.registry[i] = new Array(128);
	}
};
$hxClasses["as.synthesis.VoiceManager"] = as.synthesis.VoiceManager;
as.synthesis.VoiceManager.__name__ = ["as","synthesis","VoiceManager"];
as.synthesis.VoiceManager.prototype = {
	stealQuietestVoice: function() {
		var voiceVolume = 1000.0;
		var quietest = null;
		var node = this.activeVoices.first;
		while(node != null) {
			if(node.value.voiceParams.state != 2) {
				var volume = node.value.voiceParams.mixing[0] + node.value.voiceParams.mixing[1];
				if(volume < voiceVolume) {
					quietest = node;
					voiceVolume = volume;
				}
			}
			node = node.get_next();
		}
		if(quietest == null) quietest = this.activeVoices.first;
		this.removeVoiceFromRegistry(quietest.value);
		this.activeVoices.remove(quietest);
		quietest.value.voiceParams.state = 0;
		return quietest.value;
	}
	,stealOldest: function() {
		var node = this.activeVoices.first;
		while(node != null && node.value.voiceParams.state == 2) node = node.get_next();
		if(node == null) node = this.activeVoices.first;
		this.removeVoiceFromRegistry(node.value);
		this.activeVoices.remove(node);
		node.value.voiceParams.state = 0;
		return node.value;
	}
	,unloadPatches: function() {
		var _g1 = 0, _g = this._voicePool.length;
		while(_g1 < _g) {
			var x = _g1++;
			this._voicePool[x].configure(0,0,0,null);
			var $it0 = this._vNodes.iterator();
			while( $it0.hasNext() ) {
				var n = $it0.next();
				n.value = null;
			}
		}
	}
	,clearRegistry: function() {
		var node = this.activeVoices.first;
		while(node != null) {
			var vnode = this.registry[node.value.voiceParams.channel][node.value.voiceParams.note];
			while(vnode != null) {
				this._vNodes.add(vnode);
				vnode = vnode.next;
			}
			this.registry[node.value.voiceParams.channel][node.value.voiceParams.note] = null;
			node = node.get_next();
		}
	}
	,removeVoiceFromRegistry: function(voice) {
		var node = this.registry[voice.voiceParams.channel][voice.voiceParams.note];
		if(node == null) return;
		if(node.value == voice) {
			this.registry[voice.voiceParams.channel][voice.voiceParams.note] = node.next;
			this._vNodes.add(node);
			return;
		} else {
			var node2 = node;
			node = node.next;
			while(node != null) {
				if(node.value == voice) {
					node2.next = node.next;
					this._vNodes.add(node);
					return;
				}
				node2 = node;
				node = node.next;
			}
		}
	}
	,removeFromRegistry: function(channel,note) {
		var node = this.registry[channel][note];
		while(node != null) {
			this._vNodes.add(node);
			node = node.next;
		}
		this.registry[channel][note] = null;
	}
	,addToRegistry: function(voice) {
		var node = this._vNodes.pop();
		node.value = voice;
		node.next = this.registry[voice.voiceParams.channel][voice.voiceParams.note];
		this.registry[voice.voiceParams.channel][voice.voiceParams.note] = node;
	}
	,getFreeVoice: function() {
		if(this.freeVoices.length > 0) {
			var voice = this.freeVoices.first.value;
			this.freeVoices.removeFirst();
			return voice;
		} else if(this.stealingMethod == 0) return this.stealOldest(); else return this.stealQuietestVoice();
	}
	,__class__: as.synthesis.VoiceManager
}
as.synthesis.VoiceParameters = function(synth) {
	this.synth = synth;
	this.channel = 0;
	this.note = 0;
	this.velocity = 0;
	this.state = 0;
	this.pitchOffset = 0;
	this.volOffset = 0;
	this.blockBuffer = new Array(64);
	as.platform.TypeUtils.clearFloat32Array(this.blockBuffer);
	this.mixing = new Array(4);
	as.platform.TypeUtils.clearFloat32Array(this.mixing);
	this.counters = new Array(4);
	as.platform.TypeUtils.clearFloat32Array(this.counters);
	this.generatorParams = new Array(4);
	this.generators = null;
	this.envelopes = new Array(4);
	this.filters = new Array(4);
	this.lfos = new Array(4);
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		this.generatorParams[i] = new as.bank.components.generators.GeneratorParameters();
		this.envelopes[i] = new as.bank.components.Envelope();
		this.filters[i] = new as.bank.components.Filter();
		this.lfos[i] = new as.bank.components.Lfo();
	}
};
$hxClasses["as.synthesis.VoiceParameters"] = as.synthesis.VoiceParameters;
as.synthesis.VoiceParameters.__name__ = ["as","synthesis","VoiceParameters"];
as.synthesis.VoiceParameters.prototype = {
	__class__: as.synthesis.VoiceParameters
}
as.util = {}
as.util.IOHelper = function() { }
$hxClasses["as.util.IOHelper"] = as.util.IOHelper;
as.util.IOHelper.__name__ = ["as","util","IOHelper"];
as.util.IOHelper.read8BitChars = function(input,length) {
	var s = new StringBuf();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		s.b += String.fromCharCode(input.readByte());
	}
	return s.b;
}
as.util.IOHelper.read8BitString = function(input) {
	var s = new StringBuf();
	var c = input.readByte();
	while(c != 0) {
		s.b += String.fromCharCode(c);
		c = input.readByte();
	}
	return s.b;
}
as.util.IOHelper.read8BitStringLength = function(input,length) {
	var s = new StringBuf();
	var z = -1;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var c = input.readByte();
		if(c == 0 && z == -1) z = i;
		s.b += String.fromCharCode(c);
	}
	var t = s.b;
	if(z >= 0) return t.substring(0,z);
	return t;
}
as.util.IOHelper.readSInt8 = function(input) {
	var v = input.readByte();
	return ((v & 255) >> 7) * -256 + (v & 255);
}
as.util.IOHelper.readUInt32 = function(input) {
	var ch1 = input.readByte();
	var ch2 = input.readByte();
	var ch3 = input.readByte();
	var ch4 = input.readByte();
	var b1_high = 0, b1_low = (input.bigEndian?ch4 | ch3 << 8:ch1 | ch2 << 8) | 0;
	var b2 = haxe.Int64.shl(new haxe.Int64(0,input.bigEndian?ch2 << 16 | ch1 << 24:ch3 << 16 | ch4 << 24),16);
	return new haxe.Int64(b1_high | b2.high,b1_low | b2.low);
}
as.util.IOHelper.readInt24 = function(input,index) {
	var i;
	if(as.platform.TypeUtils.IsLittleEndian) {
		i = input.b[index] | input.b[index + 1] << 8 | input.b[index + 2] << 16;
		if((i & 8388608) == 8388608) i = i | -16777216;
	} else {
		i = input.b[index] << 16 | input.b[index + 1] << 8 | input.b[index + 2];
		if((i & 256) == 256) i = i | 255;
	}
	return i;
}
as.util.IOHelper.readInt16 = function(input,index) {
	if(as.platform.TypeUtils.IsLittleEndian) return as.platform.TypeUtils.ToInt16(input.b[index] | input.b[index + 1] << 8);
	return as.platform.TypeUtils.ToInt16(input.b[index] << 8 | input.b[index + 1]);
	var i;
	if(as.platform.TypeUtils.IsLittleEndian) {
		i = input.b[index] | input.b[index + 1] << 8 | input.b[index + 2] << 16;
		if((i & 8388608) == 8388608) i = i | -16777216;
	} else {
		i = input.b[index] << 16 | input.b[index + 1] << 8 | input.b[index + 2];
		if((i & 256) == 256) i = i | 255;
	}
	return i;
}
as.util.SynthConstants = function() { }
$hxClasses["as.util.SynthConstants"] = as.util.SynthConstants;
as.util.SynthConstants.__name__ = ["as","util","SynthConstants"];
as.util.Tables = function() { }
$hxClasses["as.util.Tables"] = as.util.Tables;
as.util.Tables.__name__ = ["as","util","Tables"];
as.util.Tables.envelopeTables = function(index) {
	if(!as.util.Tables._isInitialized) as.util.Tables.init();
	return as.util.Tables._envelopeTables[index];
}
as.util.Tables.semitoneTable = function(index) {
	if(!as.util.Tables._isInitialized) as.util.Tables.init();
	return as.util.Tables._semitoneTable[index];
}
as.util.Tables.centTable = function(index) {
	if(!as.util.Tables._isInitialized) as.util.Tables.init();
	return as.util.Tables._centTable[index];
}
as.util.Tables.sincTable = function(index) {
	if(!as.util.Tables._isInitialized) as.util.Tables.init();
	return as.util.Tables._sincTable[index];
}
as.util.Tables.init = function() {
	var EnvelopeSize = 64;
	var ExponentialCoeff = .09;
	as.util.Tables._envelopeTables = new Array(4);
	as.util.Tables._envelopeTables[0] = as.util.Tables.removeDenormals(as.util.Tables.createSustainTable(EnvelopeSize));
	as.util.Tables._envelopeTables[1] = as.util.Tables.removeDenormals(as.util.Tables.createLinearTable(EnvelopeSize));
	as.util.Tables._envelopeTables[2] = as.util.Tables.removeDenormals(as.util.Tables.createExponentialTable(EnvelopeSize,ExponentialCoeff));
	as.util.Tables._envelopeTables[3] = as.util.Tables.removeDenormals(as.util.Tables.createSineTable(EnvelopeSize));
	as.util.Tables._centTable = as.util.Tables.createCentTable();
	as.util.Tables._semitoneTable = as.util.Tables.createSemitoneTable();
	as.util.Tables._sincTable = as.util.Tables.createSincTable(16,64,.43,as.util.Tables.hammingWindow);
	as.util.Tables._isInitialized = true;
}
as.util.Tables.createSquareTable = function(size,k) {
	var FourOverPi = 4 / Math.PI;
	var squaretable = new Array(size);
	var inc = 1.0 / size;
	var phase = 0;
	var _g = 0;
	while(_g < size) {
		var x = _g++;
		var value = 0.0;
		var _g2 = 1, _g1 = k + 1;
		while(_g2 < _g1) {
			var i = _g2++;
			var twokminus1 = 2 * i - 1;
			value += Math.sin(as.util.SynthConstants.TwoPi * twokminus1 * phase) / twokminus1;
		}
		squaretable[x] = as.synthesis.SynthHelper.clampF(FourOverPi * value,-1,1);
		phase += inc;
	}
	return squaretable;
}
as.util.Tables.createCentTable = function() {
	var cents = new Array(201);
	var _g1 = 0, _g = cents.length;
	while(_g1 < _g) {
		var x = _g1++;
		cents[x] = Math.pow(2.0,(x - 100.0) / 1200.0);
	}
	return cents;
}
as.util.Tables.createSemitoneTable = function() {
	var table = new Array(255);
	var _g1 = 0, _g = table.length;
	while(_g1 < _g) {
		var x = _g1++;
		table[x] = Math.pow(2.0,(x - 127.0) / 12.0);
	}
	return table;
}
as.util.Tables.createSustainTable = function(size) {
	var table = new Array(size);
	var _g = 0;
	while(_g < size) {
		var x = _g++;
		table[x] = 1;
	}
	return table;
}
as.util.Tables.createLinearTable = function(size) {
	var table = new Array(size);
	var _g = 0;
	while(_g < size) {
		var x = _g++;
		table[x] = x / js.Boot.__cast(size - 1 , Float);
	}
	return table;
}
as.util.Tables.createExponentialTable = function(size,coeff) {
	coeff = as.synthesis.SynthHelper.clampF(coeff,.001,.9);
	var graph = new Array(size);
	var val = 0;
	var _g = 0;
	while(_g < size) {
		var x = _g++;
		graph[x] = val;
		val += coeff * (1 / 0.63 - val);
	}
	var _g = 0;
	while(_g < size) {
		var x = _g++;
		graph[x] = graph[x] / graph[graph.length - 1];
	}
	return graph;
}
as.util.Tables.createSineTable = function(size) {
	var graph = new Array(size);
	var inc = 3.0 * Math.PI / 2.0 / (size - 1);
	var phase = 0;
	var _g = 0;
	while(_g < size) {
		var x = _g++;
		graph[x] = Math.abs(Math.sin(phase));
		phase += inc;
	}
	return graph;
}
as.util.Tables.removeDenormals = function(data) {
	var _g1 = 0, _g = data.length;
	while(_g1 < _g) {
		var x = _g1++;
		if(Math.abs(data[x]) < 1e-38) data[x] = 0;
	}
	return data;
}
as.util.Tables.vonHannWindow = function(i,size) {
	return 0.5 - 0.5 * Math.cos(as.util.SynthConstants.TwoPi * (0.5 + i / size));
}
as.util.Tables.hammingWindow = function(i,size) {
	return 0.54 - 0.46 * Math.cos(as.util.SynthConstants.TwoPi * i / size);
}
as.util.Tables.blackmanWindow = function(i,size) {
	return 0.42659 - 0.49656 * Math.cos(as.util.SynthConstants.TwoPi * i / size) + 0.076849 * Math.cos(4.0 * Math.PI * i / size);
}
as.util.Tables.createSincTable = function(windowSize,resolution,cornerRatio,windowFunction) {
	var subWindow = windowSize / 2 + 1 | 0;
	var table = new Array(subWindow * resolution);
	var gain = 2.0 * cornerRatio;
	var _g = 0;
	while(_g < subWindow) {
		var x = _g++;
		var _g1 = 0;
		while(_g1 < resolution) {
			var y = _g1++;
			var a = x + y / js.Boot.__cast(resolution , Float);
			var sinc = as.util.SynthConstants.TwoPi * cornerRatio * a;
			if(Math.abs(sinc) > 0.00001) sinc = Math.sin(sinc) / sinc; else sinc = 1.0;
			table[x * 64 + y] = gain * sinc * windowFunction(a,windowSize);
		}
	}
	return table;
}
as.util.UrlLoader = function() {
};
$hxClasses["as.util.UrlLoader"] = as.util.UrlLoader;
as.util.UrlLoader.__name__ = ["as","util","UrlLoader"];
as.util.UrlLoader.prototype = {
	fireComplete: function(data) {
		if(this.complete != null) this.complete(data);
	}
	,fireProgress: function(loaded,full) {
		if(this.progress != null) this.progress(loaded,full);
	}
	,load: function() {
		var _g = this;
		var request = new XMLHttpRequest();
		request.open(this.method,this.url,true);
		request.responseType = "arraybuffer";
		request.onload = function(e) {
			var buffer = request.response;
			if(buffer) {
				if(_g.complete != null) _g.complete(haxe.io.Bytes.ofData(new Uint8Array(buffer)));
			}
		};
		request.onprogress = function(e) {
			if(_g.progress != null) _g.progress(e.loaded,e.total);
		};
		request.send(null);
	}
	,__class__: as.util.UrlLoader
}
var haxe = {}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
}
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
haxe.Int64 = function(high,low) {
	this.high = high | 0;
	this.low = low | 0;
};
$hxClasses["haxe.Int64"] = haxe.Int64;
haxe.Int64.__name__ = ["haxe","Int64"];
haxe.Int64.getLow = function(x) {
	return x.low;
}
haxe.Int64.shl = function(a,b) {
	return (b & 63) == 0?a:(b & 63) < 32?new haxe.Int64(a.high << b | a.low >>> 32 - (b & 63),a.low << b):new haxe.Int64(a.low << b - 32,0);
}
haxe.Int64.prototype = {
	__class__: haxe.Int64
}
haxe.Log = function() { }
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.prototype = {
	serialize: function(v) {
		var _g = Type["typeof"](v);
		var $e = (_g);
		switch( $e[1] ) {
		case 0:
			this.buf.b += "n";
			break;
		case 1:
			if(v == 0) {
				this.buf.b += "z";
				return;
			}
			this.buf.b += "i";
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += "k"; else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += "d";
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.b += "a";
				var l = v.length;
				var _g1 = 0;
				while(_g1 < l) {
					var i = _g1++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += "n"; else {
								this.buf.b += "u";
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += "n"; else {
						this.buf.b += "u";
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += "h";
				break;
			case List:
				this.buf.b += "l";
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += "h";
				break;
			case Date:
				var d = v;
				this.buf.b += "v";
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case haxe.ds.StringMap:
				this.buf.b += "b";
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.ds.IntMap:
				this.buf.b += "q";
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += ":";
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.ds.ObjectMap:
				this.buf.b += "M";
				var v1 = v;
				var $it3 = v1.keys();
				while( $it3.hasNext() ) {
					var k = $it3.next();
					var id = Reflect.field(k,"__id__");
					Reflect.deleteField(k,"__id__");
					this.serialize(k);
					k.__id__ = id;
					this.serialize(v1.h[k.__id__]);
				}
				this.buf.b += "h";
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += "s";
				this.buf.b += Std.string(chars.length);
				this.buf.b += ":";
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += "C";
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += "g";
				} else {
					this.buf.b += "c";
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += "o";
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += ":";
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += ":";
			var l = v.length;
			this.buf.b += Std.string(l - 2);
			var _g1 = 2;
			while(_g1 < l) {
				var i = _g1++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += ":";
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,__class__: haxe.Serializer
}
haxe.Timer = function() { }
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
haxe.ds.GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
$hxClasses["haxe.ds.GenericCell"] = haxe.ds.GenericCell;
haxe.ds.GenericCell.__name__ = ["haxe","ds","GenericCell"];
haxe.ds.GenericCell.prototype = {
	__class__: haxe.ds.GenericCell
}
haxe.ds.GenericStack = function() {
};
$hxClasses["haxe.ds.GenericStack"] = haxe.ds.GenericStack;
haxe.ds.GenericStack.__name__ = ["haxe","ds","GenericStack"];
haxe.ds.GenericStack.prototype = {
	iterator: function() {
		var l = this.head;
		return { hasNext : function() {
			return l != null;
		}, next : function() {
			var k = l;
			l = k.next;
			return k.elt;
		}};
	}
	,pop: function() {
		var k = this.head;
		if(k == null) return null; else {
			this.head = k.next;
			return k.elt;
		}
	}
	,add: function(item) {
		this.head = new haxe.ds.GenericCell(item,this.head);
	}
	,__class__: haxe.ds.GenericStack
}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.ds._Vector = {}
haxe.ds._Vector.Vector_Impl_ = function() { }
$hxClasses["haxe.ds._Vector.Vector_Impl_"] = haxe.ds._Vector.Vector_Impl_;
haxe.ds._Vector.Vector_Impl_.__name__ = ["haxe","ds","_Vector","Vector_Impl_"];
haxe.ds._Vector.Vector_Impl_.blit = function(src,srcPos,dest,destPos,len) {
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest[destPos + i] = src[srcPos + i];
	}
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Input = function() { }
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	readString: function(len) {
		var b = haxe.io.Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		return this.bigEndian?ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24:ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		return this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n = this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
		if((n & 32768) != 0) return n - 65536;
		return n;
	}
	,read: function(nbytes) {
		var s = haxe.io.Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw haxe.io.Error.Blocked;
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,readByte: function() {
		return (function($this) {
			var $r;
			throw "Not implemented";
			return $r;
		}(this));
	}
	,__class__: haxe.io.Input
}
haxe.io.BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe.io.Error.OutsideBounds;
	this.b = b.b;
	this.pos = pos;
	this.len = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe.io.BytesInput;
haxe.io.BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe.io.BytesInput.__super__ = haxe.io.Input;
haxe.io.BytesInput.prototype = $extend(haxe.io.Input.prototype,{
	readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
		if(this.len == 0 && len > 0) throw new haxe.io.Eof();
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,readByte: function() {
		if(this.len == 0) throw new haxe.io.Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,set_position: function(p) {
		return this.pos = p;
	}
	,get_position: function() {
		return this.pos;
	}
	,__class__: haxe.io.BytesInput
});
haxe.io.Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0, _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
mconsole.AlertPrinter = function() {
};
$hxClasses["mconsole.AlertPrinter"] = mconsole.AlertPrinter;
mconsole.AlertPrinter.__name__ = ["mconsole","AlertPrinter"];
mconsole.AlertPrinter.__interfaces__ = [mconsole.Printer];
mconsole.AlertPrinter.prototype = {
	print: function(level,params,_,pos) {
		js.Lib.alert(Std.string(level) + ": " + pos.fileName + ":" + pos.lineNumber + ": " + params.join(" "));
	}
	,__class__: mconsole.AlertPrinter
}
mconsole.Console = function() { }
$hxClasses["mconsole.Console"] = mconsole.Console;
mconsole.Console.__name__ = ["mconsole","Console"];
mconsole.Console.start = function() {
	if(mconsole.Console.running) return;
	mconsole.Console.running = true;
	mconsole.Console.previousTrace = haxe.Log.trace;
	haxe.Log.trace = mconsole.Console.haxeTrace;
	if(mconsole.Console.hasConsole) {
	} else {
	}
}
mconsole.Console.stop = function() {
	if(!mconsole.Console.running) return;
	mconsole.Console.running = false;
	haxe.Log.trace = mconsole.Console.previousTrace;
	mconsole.Console.previousTrace = null;
}
mconsole.Console.addPrinter = function(printer) {
	mconsole.Console.removePrinter(printer);
	mconsole.Console.printers.push(printer);
}
mconsole.Console.removePrinter = function(printer) {
	HxOverrides.remove(mconsole.Console.printers,printer);
}
mconsole.Console.haxeTrace = function(value,pos) {
	var params = pos.customParams;
	if(params == null) params = []; else pos.customParams = null;
	var level = (function($this) {
		var $r;
		switch(value) {
		case "log":
			$r = mconsole.LogLevel.log;
			break;
		case "warn":
			$r = mconsole.LogLevel.warn;
			break;
		case "info":
			$r = mconsole.LogLevel.info;
			break;
		case "debug":
			$r = mconsole.LogLevel.debug;
			break;
		case "error":
			$r = mconsole.LogLevel.error;
			break;
		default:
			$r = (function($this) {
				var $r;
				params.unshift(value);
				$r = mconsole.LogLevel.log;
				return $r;
			}($this));
		}
		return $r;
	}(this));
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole(Std.string(level),params);
	mconsole.Console.print(level,params,pos);
}
mconsole.Console.print = function(level,params,pos) {
	var _g = 0, _g1 = mconsole.Console.printers;
	while(_g < _g1.length) {
		var printer = _g1[_g];
		++_g;
		printer.print(level,params,mconsole.Console.groupDepth,pos);
	}
}
mconsole.Console.log = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("log",[message]);
	mconsole.Console.print(mconsole.LogLevel.log,[message],pos);
}
mconsole.Console.info = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("info",[message]);
	mconsole.Console.print(mconsole.LogLevel.info,[message],pos);
}
mconsole.Console.debug = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",[message]);
	mconsole.Console.print(mconsole.LogLevel.debug,[message],pos);
}
mconsole.Console.warn = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("warn",[message]);
	mconsole.Console.print(mconsole.LogLevel.warn,[message],pos);
}
mconsole.Console.error = function(message,stack,pos) {
	if(stack == null) stack = haxe.CallStack.callStack();
	var stackTrace = stack.length > 0?"\n" + mconsole.StackHelper.toString(stack):"";
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("error",[message]);
	mconsole.Console.print(mconsole.LogLevel.error,["Error: " + Std.string(message) + stackTrace],pos);
}
mconsole.Console.trace = function(pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("trace",[]);
	var stack = mconsole.StackHelper.toString(haxe.CallStack.callStack());
	mconsole.Console.print(mconsole.LogLevel.error,["Stack trace:\n" + stack],pos);
}
mconsole.Console.assert = function(expression,message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("assert",[expression,message]);
	if(!expression) {
		var stack = mconsole.StackHelper.toString(haxe.CallStack.callStack());
		mconsole.Console.print(mconsole.LogLevel.error,["Assertion failed: " + Std.string(message) + "\n" + stack],pos);
		throw message;
	}
}
mconsole.Console.count = function(title,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("count",[title]);
	var position = pos.fileName + ":" + pos.lineNumber;
	var count = mconsole.Console.counts.exists(position)?mconsole.Console.counts.get(position) + 1:1;
	mconsole.Console.counts.set(position,count);
	mconsole.Console.print(mconsole.LogLevel.log,[title + ": " + count],pos);
}
mconsole.Console.group = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("group",[message]);
	mconsole.Console.print(mconsole.LogLevel.log,[message],pos);
	mconsole.Console.groupDepth += 1;
}
mconsole.Console.groupEnd = function(pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("groupEnd",[]);
	if(mconsole.Console.groupDepth > 0) mconsole.Console.groupDepth -= 1;
}
mconsole.Console.time = function(name,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("time",[name]);
	mconsole.Console.times.set(name,haxe.Timer.stamp());
}
mconsole.Console.timeEnd = function(name,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("timeEnd",[name]);
	if(mconsole.Console.times.exists(name)) {
		mconsole.Console.print(mconsole.LogLevel.log,[name + ": " + ((haxe.Timer.stamp() - mconsole.Console.times.get(name)) * 1000 | 0) + "ms"],pos);
		mconsole.Console.times.remove(name);
	}
}
mconsole.Console.markTimeline = function(label,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("markTimeline",[label]);
}
mconsole.Console.profile = function(title,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("profile",[title]);
}
mconsole.Console.profileEnd = function(title,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("profileEnd",[title]);
}
mconsole.Console.enterDebugger = function() {
	debugger;
}
mconsole.Console.detectConsole = function() {
	return false;
}
mconsole.Console.callConsole = function(method,params) {
	if(console[method] != null) {
		if(method == "log" && js.Boot.__instanceof(params[0],Xml)) method = mconsole.Console.dirxml;
		if(console[method].apply != null) console[method].apply(console,mconsole.Console.toConsoleValues(params)); else if(Function.prototype.bind != null) Function.prototype.bind.call(console[method],console).apply(console,mconsole.Console.toConsoleValues(params));
	}
}
mconsole.Console.toConsoleValues = function(params) {
	var _g1 = 0, _g = params.length;
	while(_g1 < _g) {
		var i = _g1++;
		params[i] = mconsole.Console.toConsoleValue(params[i]);
	}
	return params;
}
mconsole.Console.toConsoleValue = function(value) {
	var typeClass = Type.getClass(value);
	var typeName = typeClass == null?"":Type.getClassName(typeClass);
	if(typeName == "Xml") {
		var parser = new DOMParser();
		return parser.parseFromString(value.toString(),"text/xml").firstChild;
	} else if(typeName == "Map" || typeName == "StringMap" || typeName == "IntMap") {
		var $native = { };
		var map = value;
		var $it0 = map.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			$native[Std.string(key)] = mconsole.Console.toConsoleValue(map.get(key));
		}
		return $native;
	} else {
		var _g = Type["typeof"](value);
		var $e = (_g);
		switch( $e[1] ) {
		case 7:
			var e = $e[2];
			var $native = [];
			var name = Type.getEnumName(e) + "." + Type.enumConstructor(value);
			var params = Type.enumParameters(value);
			if(params.length > 0) {
				$native.push(name + "(");
				var _g2 = 0, _g1 = params.length;
				while(_g2 < _g1) {
					var i = _g2++;
					$native.push(mconsole.Console.toConsoleValue(params[i]));
				}
				$native.push(")");
			} else return [name];
			return $native;
		default:
		}
		if(typeName == "Array" || typeName == "List" || typeName == "haxe.FastList") {
			var $native = [];
			var iterable = value;
			var $it1 = $iterator(iterable)();
			while( $it1.hasNext() ) {
				var i = $it1.next();
				$native.push(mconsole.Console.toConsoleValue(i));
			}
			return $native;
		}
	}
	return value;
}
mconsole.LogLevel = $hxClasses["mconsole.LogLevel"] = { __ename__ : ["mconsole","LogLevel"], __constructs__ : ["log","info","debug","warn","error"] }
mconsole.LogLevel.log = ["log",0];
mconsole.LogLevel.log.toString = $estr;
mconsole.LogLevel.log.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.info = ["info",1];
mconsole.LogLevel.info.toString = $estr;
mconsole.LogLevel.info.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.debug = ["debug",2];
mconsole.LogLevel.debug.toString = $estr;
mconsole.LogLevel.debug.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.warn = ["warn",3];
mconsole.LogLevel.warn.toString = $estr;
mconsole.LogLevel.warn.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.error = ["error",4];
mconsole.LogLevel.error.toString = $estr;
mconsole.LogLevel.error.__enum__ = mconsole.LogLevel;
mconsole.PrinterBase = function() {
	this.printPosition = true;
	this.printLineNumbers = true;
};
$hxClasses["mconsole.PrinterBase"] = mconsole.PrinterBase;
mconsole.PrinterBase.__name__ = ["mconsole","PrinterBase"];
mconsole.PrinterBase.prototype = {
	printLine: function(color,line,pos) {
		throw "method not implemented in ConsolePrinterBase";
	}
	,print: function(level,params,indent,pos) {
		params = params.slice();
		var _g1 = 0, _g = params.length;
		while(_g1 < _g) {
			var i = _g1++;
			params[i] = Std.string(params[i]);
		}
		var message = params.join(", ");
		var nextPosition = "@ " + pos.className + "." + pos.methodName;
		var nextLineNumber = Std.string(pos.lineNumber);
		var lineColumn = "";
		var emptyLineColumn = "";
		if(this.printPosition) {
			if(nextPosition != this.position) this.printLine(mconsole.ConsoleColor.none,nextPosition,pos);
		}
		if(this.printLineNumbers) {
			emptyLineColumn = StringTools.lpad(""," ",5);
			if(nextPosition != this.position || nextLineNumber != this.lineNumber) lineColumn = StringTools.lpad(nextLineNumber," ",4) + " "; else lineColumn = emptyLineColumn;
		}
		this.position = nextPosition;
		this.lineNumber = nextLineNumber;
		var color = (function($this) {
			var $r;
			switch( (level)[1] ) {
			case 0:
				$r = mconsole.ConsoleColor.white;
				break;
			case 1:
				$r = mconsole.ConsoleColor.blue;
				break;
			case 2:
				$r = mconsole.ConsoleColor.green;
				break;
			case 3:
				$r = mconsole.ConsoleColor.yellow;
				break;
			case 4:
				$r = mconsole.ConsoleColor.red;
				break;
			}
			return $r;
		}(this));
		var indent1 = StringTools.lpad(""," ",indent * 2);
		message = lineColumn + indent1 + message;
		message = message.split("\n").join("\n" + emptyLineColumn + indent1);
		this.printLine(color,message,pos);
	}
	,__class__: mconsole.PrinterBase
}
mconsole.ConsoleColor = $hxClasses["mconsole.ConsoleColor"] = { __ename__ : ["mconsole","ConsoleColor"], __constructs__ : ["none","white","blue","green","yellow","red"] }
mconsole.ConsoleColor.none = ["none",0];
mconsole.ConsoleColor.none.toString = $estr;
mconsole.ConsoleColor.none.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.white = ["white",1];
mconsole.ConsoleColor.white.toString = $estr;
mconsole.ConsoleColor.white.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.blue = ["blue",2];
mconsole.ConsoleColor.blue.toString = $estr;
mconsole.ConsoleColor.blue.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.green = ["green",3];
mconsole.ConsoleColor.green.toString = $estr;
mconsole.ConsoleColor.green.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.yellow = ["yellow",4];
mconsole.ConsoleColor.yellow.toString = $estr;
mconsole.ConsoleColor.yellow.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.red = ["red",5];
mconsole.ConsoleColor.red.toString = $estr;
mconsole.ConsoleColor.red.__enum__ = mconsole.ConsoleColor;
mconsole.StackHelper = function() { }
$hxClasses["mconsole.StackHelper"] = mconsole.StackHelper;
mconsole.StackHelper.__name__ = ["mconsole","StackHelper"];
mconsole.StackHelper.createFilters = function() {
	var filters = new haxe.ds.StringMap();
	filters.set("@ mconsole.ConsoleRedirect.haxeTrace:59",true);
	return filters;
}
mconsole.StackHelper.toString = function(stack) {
	return "null";
}
mconsole.StackItemHelper = function() { }
$hxClasses["mconsole.StackItemHelper"] = mconsole.StackItemHelper;
mconsole.StackItemHelper.__name__ = ["mconsole","StackItemHelper"];
mconsole.StackItemHelper.toString = function(item,isFirst) {
	if(isFirst == null) isFirst = false;
	return (function($this) {
		var $r;
		var $e = (item);
		switch( $e[1] ) {
		case 1:
			var module = $e[2];
			$r = module;
			break;
		case 3:
			var method = $e[3], className = $e[2];
			$r = className + "." + method;
			break;
		case 4:
			var v = $e[2];
			$r = "Lambda(" + v + ")";
			break;
		case 2:
			var line = $e[4], file = $e[3], s = $e[2];
			$r = (s == null?file.split("::").join(".") + ":" + line:mconsole.StackItemHelper.toString(s)) + ":" + line;
			break;
		case 0:
			$r = "(anonymous function)";
			break;
		}
		return $r;
	}(this));
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
as.platform.TypeUtils.IsLittleEndian = true;
as.bank.PatchBank.DrumBank = 128;
as.bank.PatchBank.BankSize = 128;
as.bank.components.GeneratorStateEnum.PreLoop = 0;
as.bank.components.GeneratorStateEnum.Loop = 1;
as.bank.components.GeneratorStateEnum.PostLoop = 2;
as.bank.components.GeneratorStateEnum.Finished = 3;
as.bank.components.EnvelopeStateEnum.Delay = 0;
as.bank.components.EnvelopeStateEnum.Attack = 1;
as.bank.components.EnvelopeStateEnum.Hold = 2;
as.bank.components.EnvelopeStateEnum.Decay = 3;
as.bank.components.EnvelopeStateEnum.Sustain = 4;
as.bank.components.EnvelopeStateEnum.Release = 5;
as.bank.components.EnvelopeStateEnum.None = 6;
as.bank.components.LfoStateEnum.Delay = 0;
as.bank.components.LfoStateEnum.Sustain = 1;
as.bank.components.WaveformEnum.Sine = 0;
as.bank.components.WaveformEnum.Square = 1;
as.bank.components.WaveformEnum.Saw = 2;
as.bank.components.WaveformEnum.Triangle = 3;
as.bank.components.WaveformEnum.SampleData = 4;
as.bank.components.WaveformEnum.WhiteNoise = 5;
as.bank.components.InterpolationEnum.None = 0;
as.bank.components.InterpolationEnum.Linear = 1;
as.bank.components.InterpolationEnum.Cosine = 2;
as.bank.components.InterpolationEnum.CubicSpline = 3;
as.bank.components.InterpolationEnum.Sinc = 4;
as.bank.components.LoopModeEnum.NoLoop = 0;
as.bank.components.LoopModeEnum.OneShot = 1;
as.bank.components.LoopModeEnum.Continuous = 2;
as.bank.components.LoopModeEnum.LoopUntilNoteOff = 3;
as.bank.components.FilterTypeEnum.None = 0;
as.bank.components.FilterTypeEnum.BiquadLowpass = 1;
as.bank.components.FilterTypeEnum.BiquadHighpass = 2;
as.bank.components.FilterTypeEnum.OnePoleLowpass = 3;
as.bank.patch.IntervalType.ChannelKeyVelocity = 0;
as.bank.patch.IntervalType.ChannelKey = 1;
as.bank.patch.IntervalType.KeyVelocity = 2;
as.bank.patch.IntervalType.Key = 3;
as.log.LevelPrinter.MinLogLevel = 0;
as.log.LevelPrinter.MaxLogLevel = 5;
as.midi.MidiTrackFormat.SingleTrack = 0;
as.midi.MidiTrackFormat.MultiTrack = 1;
as.midi.MidiTrackFormat.MultiSong = 2;
as.midi.MidiTimeFormat.TicksPerBeat = 0;
as.midi.MidiTimeFormat.FramesPerSecond = 1;
as.midi.MidiEventTypeEnum.NoteOff = 128;
as.midi.MidiEventTypeEnum.NoteOn = 144;
as.midi.MidiEventTypeEnum.NoteAftertouch = 160;
as.midi.MidiEventTypeEnum.Controller = 176;
as.midi.MidiEventTypeEnum.ProgramChange = 192;
as.midi.MidiEventTypeEnum.ChannelAftertouch = 208;
as.midi.MidiEventTypeEnum.PitchBend = 224;
as.midi.MetaEventTypeEnum.SequenceNumber = 0;
as.midi.MetaEventTypeEnum.TextEvent = 1;
as.midi.MetaEventTypeEnum.CopyrightNotice = 2;
as.midi.MetaEventTypeEnum.SequenceOrTrackName = 3;
as.midi.MetaEventTypeEnum.InstrumentName = 4;
as.midi.MetaEventTypeEnum.LyricText = 5;
as.midi.MetaEventTypeEnum.MarkerText = 6;
as.midi.MetaEventTypeEnum.CuePoint = 7;
as.midi.MetaEventTypeEnum.PatchName = 8;
as.midi.MetaEventTypeEnum.PortName = 9;
as.midi.MetaEventTypeEnum.MidiChannel = 32;
as.midi.MetaEventTypeEnum.MidiPort = 33;
as.midi.MetaEventTypeEnum.EndOfTrack = 47;
as.midi.MetaEventTypeEnum.Tempo = 81;
as.midi.MetaEventTypeEnum.SmpteOffset = 84;
as.midi.MetaEventTypeEnum.TimeSignature = 88;
as.midi.MetaEventTypeEnum.KeySignature = 89;
as.midi.MetaEventTypeEnum.SequencerSpecific = 127;
as.midi.SystemCommonTypeEnum.SystemExclusive = 240;
as.midi.SystemCommonTypeEnum.MtcQuarterFrame = 241;
as.midi.SystemCommonTypeEnum.SongPosition = 242;
as.midi.SystemCommonTypeEnum.SongSelect = 243;
as.midi.SystemCommonTypeEnum.TuneRequest = 246;
as.midi.SystemCommonTypeEnum.SystemExclusive2 = 247;
as.midi.SystemRealtimeTypeEnum.MidiClock = 248;
as.midi.SystemRealtimeTypeEnum.MidiTick = 249;
as.midi.SystemRealtimeTypeEnum.MidiStart = 250;
as.midi.SystemRealtimeTypeEnum.MidiContinue = 252;
as.midi.SystemRealtimeTypeEnum.MidiStop = 253;
as.midi.SystemRealtimeTypeEnum.ActiveSense = 254;
as.midi.SystemRealtimeTypeEnum.Reset = 255;
as.midi.ControllerTypeEnum.BankSelectCoarse = 0;
as.midi.ControllerTypeEnum.ModulationCoarse = 1;
as.midi.ControllerTypeEnum.BreathControllerCoarse = 2;
as.midi.ControllerTypeEnum.FootControllerCoarse = 4;
as.midi.ControllerTypeEnum.PortamentoTimeCoarse = 5;
as.midi.ControllerTypeEnum.DataEntryCoarse = 6;
as.midi.ControllerTypeEnum.VolumeCoarse = 7;
as.midi.ControllerTypeEnum.BalanceCoarse = 8;
as.midi.ControllerTypeEnum.PanCoarse = 10;
as.midi.ControllerTypeEnum.ExpressionControllerCoarse = 11;
as.midi.ControllerTypeEnum.EffectControl1Coarse = 12;
as.midi.ControllerTypeEnum.EffectControl2Coarse = 13;
as.midi.ControllerTypeEnum.GeneralPurposeSlider1 = 16;
as.midi.ControllerTypeEnum.GeneralPurposeSlider2 = 17;
as.midi.ControllerTypeEnum.GeneralPurposeSlider3 = 18;
as.midi.ControllerTypeEnum.GeneralPurposeSlider4 = 19;
as.midi.ControllerTypeEnum.BankSelectFine = 32;
as.midi.ControllerTypeEnum.ModulationFine = 33;
as.midi.ControllerTypeEnum.BreathControllerFine = 34;
as.midi.ControllerTypeEnum.FootControllerFine = 36;
as.midi.ControllerTypeEnum.PortamentoTimeFine = 37;
as.midi.ControllerTypeEnum.DataEntryFine = 38;
as.midi.ControllerTypeEnum.VolumeFine = 39;
as.midi.ControllerTypeEnum.BalanceFine = 40;
as.midi.ControllerTypeEnum.PanFine = 42;
as.midi.ControllerTypeEnum.ExpressionControllerFine = 43;
as.midi.ControllerTypeEnum.EffectControl1Fine = 44;
as.midi.ControllerTypeEnum.EffectControl2Fine = 45;
as.midi.ControllerTypeEnum.HoldPedal = 64;
as.midi.ControllerTypeEnum.Portamento = 65;
as.midi.ControllerTypeEnum.SostenutoPedal = 66;
as.midi.ControllerTypeEnum.SoftPedal = 67;
as.midi.ControllerTypeEnum.LegatoPedal = 68;
as.midi.ControllerTypeEnum.Hold2Pedal = 69;
as.midi.ControllerTypeEnum.SoundVariation = 70;
as.midi.ControllerTypeEnum.SoundTimbre = 71;
as.midi.ControllerTypeEnum.SoundReleaseTime = 72;
as.midi.ControllerTypeEnum.SoundAttackTime = 73;
as.midi.ControllerTypeEnum.SoundBrightness = 74;
as.midi.ControllerTypeEnum.SoundControl6 = 75;
as.midi.ControllerTypeEnum.SoundControl7 = 76;
as.midi.ControllerTypeEnum.SoundControl8 = 77;
as.midi.ControllerTypeEnum.SoundControl9 = 78;
as.midi.ControllerTypeEnum.SoundControl10 = 79;
as.midi.ControllerTypeEnum.GeneralPurposeButton1 = 80;
as.midi.ControllerTypeEnum.GeneralPurposeButton2 = 81;
as.midi.ControllerTypeEnum.GeneralPurposeButton3 = 82;
as.midi.ControllerTypeEnum.GeneralPurposeButton4 = 83;
as.midi.ControllerTypeEnum.EffectsLevel = 91;
as.midi.ControllerTypeEnum.TremuloLevel = 92;
as.midi.ControllerTypeEnum.ChorusLevel = 93;
as.midi.ControllerTypeEnum.CelesteLevel = 94;
as.midi.ControllerTypeEnum.PhaseLevel = 95;
as.midi.ControllerTypeEnum.DataButtonIncrement = 96;
as.midi.ControllerTypeEnum.DataButtonDecrement = 97;
as.midi.ControllerTypeEnum.NonRegisteredParameterFine = 98;
as.midi.ControllerTypeEnum.NonRegisteredParameterCourse = 99;
as.midi.ControllerTypeEnum.RegisteredParameterFine = 100;
as.midi.ControllerTypeEnum.RegisteredParameterCourse = 101;
as.midi.ControllerTypeEnum.AllSoundOff = 120;
as.midi.ControllerTypeEnum.ResetControllers = 121;
as.midi.ControllerTypeEnum.LocalKeyboard = 122;
as.midi.ControllerTypeEnum.AllNotesOff = 123;
as.midi.ControllerTypeEnum.OmniModeOff = 124;
as.midi.ControllerTypeEnum.OmniModeOn = 125;
as.midi.ControllerTypeEnum.MonoMode = 126;
as.midi.ControllerTypeEnum.PolyMode = 127;
as.midi.MidiHelper.MicroSecondsPerMinute = 60000000;
as.midi.MidiHelper.MinChannel = 0;
as.midi.MidiHelper.MaxChannel = 15;
as.midi.MidiHelper.DrumChannel = 9;
as.platform.TypeUtils.IntMax = 2147483647;
as.player.SynthPlayer.SampleRate = 44100;
as.sf2.SFSampleLink.MonoSample = 1;
as.sf2.SFSampleLink.RightSample = 2;
as.sf2.SFSampleLink.LeftSample = 4;
as.sf2.SFSampleLink.LinkedSample = 8;
as.sf2.SFSampleLink.RomMonoSample = 32769;
as.sf2.SFSampleLink.RomRightSample = 32770;
as.sf2.SFSampleLink.RomLeftSample = 32772;
as.sf2.SFSampleLink.RomLinkedSample = 32776;
as.sf2.GeneratorEnum.StartAddressOffset = 0;
as.sf2.GeneratorEnum.EndAddressOffset = 1;
as.sf2.GeneratorEnum.StartLoopAddressOffset = 2;
as.sf2.GeneratorEnum.EndLoopAddressOffset = 3;
as.sf2.GeneratorEnum.StartAddressCoarseOffset = 4;
as.sf2.GeneratorEnum.ModulationLFOToPitch = 5;
as.sf2.GeneratorEnum.VibratoLFOToPitch = 6;
as.sf2.GeneratorEnum.ModulationEnvelopeToPitch = 7;
as.sf2.GeneratorEnum.InitialFilterCutoffFrequency = 8;
as.sf2.GeneratorEnum.InitialFilterQ = 9;
as.sf2.GeneratorEnum.ModulationLFOToFilterCutoffFrequency = 10;
as.sf2.GeneratorEnum.ModulationEnvelopeToFilterCutoffFrequency = 11;
as.sf2.GeneratorEnum.EndAddressCoarseOffset = 12;
as.sf2.GeneratorEnum.ModulationLFOToVolume = 13;
as.sf2.GeneratorEnum.Unused1 = 14;
as.sf2.GeneratorEnum.ChorusEffectsSend = 15;
as.sf2.GeneratorEnum.ReverbEffectsSend = 16;
as.sf2.GeneratorEnum.Pan = 17;
as.sf2.GeneratorEnum.Unused2 = 18;
as.sf2.GeneratorEnum.Unused3 = 19;
as.sf2.GeneratorEnum.Unused4 = 20;
as.sf2.GeneratorEnum.DelayModulationLFO = 21;
as.sf2.GeneratorEnum.FrequencyModulationLFO = 22;
as.sf2.GeneratorEnum.DelayVibratoLFO = 23;
as.sf2.GeneratorEnum.FrequencyVibratoLFO = 24;
as.sf2.GeneratorEnum.DelayModulationEnvelope = 25;
as.sf2.GeneratorEnum.AttackModulationEnvelope = 26;
as.sf2.GeneratorEnum.HoldModulationEnvelope = 27;
as.sf2.GeneratorEnum.DecayModulationEnvelope = 28;
as.sf2.GeneratorEnum.SustainModulationEnvelope = 29;
as.sf2.GeneratorEnum.ReleaseModulationEnvelope = 30;
as.sf2.GeneratorEnum.KeyNumberToModulationEnvelopeHold = 31;
as.sf2.GeneratorEnum.KeyNumberToModulationEnvelopeDecay = 32;
as.sf2.GeneratorEnum.DelayVolumeEnvelope = 33;
as.sf2.GeneratorEnum.AttackVolumeEnvelope = 34;
as.sf2.GeneratorEnum.HoldVolumeEnvelope = 35;
as.sf2.GeneratorEnum.DecayVolumeEnvelope = 36;
as.sf2.GeneratorEnum.SustainVolumeEnvelope = 37;
as.sf2.GeneratorEnum.ReleaseVolumeEnvelope = 38;
as.sf2.GeneratorEnum.KeyNumberToVolumeEnvelopeHold = 39;
as.sf2.GeneratorEnum.KeyNumberToVolumeEnvelopeDecay = 40;
as.sf2.GeneratorEnum.Instrument = 41;
as.sf2.GeneratorEnum.Reserved1 = 42;
as.sf2.GeneratorEnum.KeyRange = 43;
as.sf2.GeneratorEnum.VelocityRange = 44;
as.sf2.GeneratorEnum.StartLoopAddressCoarseOffset = 45;
as.sf2.GeneratorEnum.KeyNumber = 46;
as.sf2.GeneratorEnum.Velocity = 47;
as.sf2.GeneratorEnum.InitialAttenuation = 48;
as.sf2.GeneratorEnum.Reserved2 = 49;
as.sf2.GeneratorEnum.EndLoopAddressCoarseOffset = 50;
as.sf2.GeneratorEnum.CoarseTune = 51;
as.sf2.GeneratorEnum.FineTune = 52;
as.sf2.GeneratorEnum.SampleID = 53;
as.sf2.GeneratorEnum.SampleModes = 54;
as.sf2.GeneratorEnum.Reserved3 = 55;
as.sf2.GeneratorEnum.ScaleTuning = 56;
as.sf2.GeneratorEnum.ExclusiveClass = 57;
as.sf2.GeneratorEnum.OverridingRootKey = 58;
as.sf2.GeneratorEnum.Unused5 = 59;
as.sf2.GeneratorEnum.UnusedEnd = 60;
as.sf2.TransformEnum.Linear = 0;
as.sf2.TransformEnum.AbsoluteValue = 2;
as.sf2.ControllerSourceEnum.NoController = 0;
as.sf2.ControllerSourceEnum.NoteOnVelocity = 2;
as.sf2.ControllerSourceEnum.NoteOnKeyNumber = 3;
as.sf2.ControllerSourceEnum.PolyPressure = 10;
as.sf2.ControllerSourceEnum.ChannelPressure = 13;
as.sf2.ControllerSourceEnum.PitchWheel = 14;
as.sf2.ControllerSourceEnum.PitchWheelSensitivity = 16;
as.sf2.ControllerSourceEnum.Link = 127;
as.sf2.DirectionEnum.MinToMax = 0;
as.sf2.DirectionEnum.MaxToMin = 1;
as.sf2.PolarityEnum.Unipolar = 0;
as.sf2.PolarityEnum.Bipolar = 1;
as.sf2.SourceTypeEnum.Linear = 0;
as.sf2.SourceTypeEnum.Concave = 1;
as.sf2.SourceTypeEnum.Convex = 2;
as.sf2.SourceTypeEnum.Switch = 3;
as.synthesis.VoiceStateEnum.Stopped = 0;
as.synthesis.VoiceStateEnum.Stopping = 1;
as.synthesis.VoiceStateEnum.Playing = 2;
as.synthesis.PanFormulaEnum.Neg3dBCenter = 0;
as.synthesis.PanFormulaEnum.Neg6dBCenter = 1;
as.synthesis.PanFormulaEnum.ZeroCenter = 2;
as.synthesis.VoiceStealingMethod.Oldest = 0;
as.synthesis.VoiceStealingMethod.Quietest = 1;
as.util.SynthConstants.InterpolationMode = 1;
as.util.SynthConstants.TwoPi = 2.0 * Math.PI;
as.util.SynthConstants.HalfPi = Math.PI / 2.0;
as.util.SynthConstants.InverseSqrtOfTwo = 0.707106781186;
as.util.SynthConstants.DefaultLfoFrequency = 8.0;
as.util.SynthConstants.DefaultModDepth = 100;
as.util.SynthConstants.DefaultPolyphony = 40;
as.util.SynthConstants.MinPolyphony = 5;
as.util.SynthConstants.MaxPolyphony = 250;
as.util.SynthConstants.DefaultBlockSize = 64;
as.util.SynthConstants.MaxBufferSize = 0.05;
as.util.SynthConstants.MinBufferSize = 0.001;
as.util.SynthConstants.DenormLimit = 1e-38;
as.util.SynthConstants.NonAudible = 1e-5;
as.util.SynthConstants.SincWidth = 16;
as.util.SynthConstants.SincResolution = 64;
as.util.SynthConstants.MaxVoiceComponents = 4;
as.util.SynthConstants.DefaultChannelCount = 16;
as.util.SynthConstants.DefaultKeyCount = 128;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
mconsole.Console.defaultPrinter = new mconsole.AlertPrinter();
mconsole.Console.printers = [mconsole.Console.defaultPrinter];
mconsole.Console.groupDepth = 0;
mconsole.Console.times = new haxe.ds.StringMap();
mconsole.Console.counts = new haxe.ds.StringMap();
mconsole.Console.running = false;
mconsole.Console.dirxml = "dirxml";
mconsole.Console.hasConsole = mconsole.Console.detectConsole();
mconsole.StackHelper.filters = mconsole.StackHelper.createFilters();
as.AlphaSynthJsWorker.main();
})();
