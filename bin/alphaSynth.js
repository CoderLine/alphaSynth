$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof haxe=='undefined') haxe = {}
if(!haxe.io) haxe.io = {}
haxe.io.BytesBuffer = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
haxe.io.BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe.io.BytesBuffer.prototype.b = null;
haxe.io.BytesBuffer.prototype.addByte = function($byte) {
	this.b.push($byte);
}
haxe.io.BytesBuffer.prototype.add = function(src) {
	var b1 = this.b;
	var b2 = src.b;
	{
		var _g1 = 0, _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
}
haxe.io.BytesBuffer.prototype.addBytes = function(src,pos,len) {
	if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	{
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
}
haxe.io.BytesBuffer.prototype.getBytes = function() {
	var bytes = new haxe.io.Bytes(this.b.length,this.b);
	this.b = null;
	return bytes;
}
haxe.io.BytesBuffer.prototype.__class__ = haxe.io.BytesBuffer;
if(typeof alphaSynth=='undefined') alphaSynth = {}
alphaSynth.Component = function(sampleRate) { if( sampleRate === $_ ) return; {
	this._sampleRate = sampleRate;
}}
alphaSynth.Component.__name__ = ["alphaSynth","Component"];
alphaSynth.Component.prototype._sampleRate = null;
alphaSynth.Component.prototype.getSamplesPerSecond = function() {
	return this._sampleRate.getSamplesPerSecond();
}
alphaSynth.Component.prototype.__class__ = alphaSynth.Component;
if(!alphaSynth.scomponent) alphaSynth.scomponent = {}
alphaSynth.scomponent.SynthComponent = function(sampleRate) { if( sampleRate === $_ ) return; {
	alphaSynth.Component.call(this,sampleRate);
	this._ordinalChanged = new Array();
}}
alphaSynth.scomponent.SynthComponent.__name__ = ["alphaSynth","scomponent","SynthComponent"];
alphaSynth.scomponent.SynthComponent.__super__ = alphaSynth.Component;
for(var k in alphaSynth.Component.prototype ) alphaSynth.scomponent.SynthComponent.prototype[k] = alphaSynth.Component.prototype[k];
alphaSynth.scomponent.SynthComponent.comparer = function(a,b) {
	if(a.getOrdinal() > b.getOrdinal()) return 1;
	if(a.getOrdinal() < b.getOrdinal()) return -1;
	return 0;
}
alphaSynth.scomponent.SynthComponent.prototype._ordinalChanged = null;
alphaSynth.scomponent.SynthComponent.prototype.generate = function(offset,sampleCount) {
	throw "abstract method not implemented";
}
alphaSynth.scomponent.SynthComponent.prototype.trigger = function(previousNote,note,velocity) {
	throw "abstract method not implemented";
}
alphaSynth.scomponent.SynthComponent.prototype.release = function(velocity) {
	throw "abstract method not implemented";
}
alphaSynth.scomponent.SynthComponent.prototype.getOrdinal = function() {
	throw "abstract method not implemented";
	return 0;
}
alphaSynth.scomponent.SynthComponent.prototype.getBufferSize = function() {
	throw "abstract method not implemented";
	return 0;
}
alphaSynth.scomponent.SynthComponent.prototype.setBufferSize = function(bufferSize) {
	throw "abstract method not implemented";
}
alphaSynth.scomponent.SynthComponent.prototype.getSynthesizeReplaceEnabled = function() {
	throw "abstract method not implemented";
	return false;
}
alphaSynth.scomponent.SynthComponent.prototype.setSynthesizeReplaceEnabled = function(synthesizeReplaceEnabled) {
	throw "abstract method not implemented";
}
alphaSynth.scomponent.SynthComponent.prototype.onOrdinalChanged = function() {
	var _g = 0, _g1 = this._ordinalChanged;
	while(_g < _g1.length) {
		var handler = _g1[_g];
		++_g;
		handler();
	}
}
alphaSynth.scomponent.SynthComponent.prototype.addOrdinalChangedHandler = function(handler) {
	this._ordinalChanged.push(handler);
}
alphaSynth.scomponent.SynthComponent.prototype.removeOrdinalChangedHandler = function(handler) {
	this._ordinalChanged.remove(handler);
}
alphaSynth.scomponent.SynthComponent.prototype.__class__ = alphaSynth.scomponent.SynthComponent;
alphaSynth.scomponent.StereoSynthComponent = function(sampleRate,buffer) { if( sampleRate === $_ ) return; {
	alphaSynth.scomponent.SynthComponent.call(this,sampleRate);
	this._buffer = buffer;
}}
alphaSynth.scomponent.StereoSynthComponent.__name__ = ["alphaSynth","scomponent","StereoSynthComponent"];
alphaSynth.scomponent.StereoSynthComponent.__super__ = alphaSynth.scomponent.SynthComponent;
for(var k in alphaSynth.scomponent.SynthComponent.prototype ) alphaSynth.scomponent.StereoSynthComponent.prototype[k] = alphaSynth.scomponent.SynthComponent.prototype[k];
alphaSynth.scomponent.StereoSynthComponent.prototype._buffer = null;
alphaSynth.scomponent.StereoSynthComponent.prototype.getBuffer = function() {
	return this._buffer.getBuffer();
}
alphaSynth.scomponent.StereoSynthComponent.prototype.getBufferSize = function() {
	return this._buffer.getBufferSize();
}
alphaSynth.scomponent.StereoSynthComponent.prototype.setBufferSize = function(bufferSize) {
	this._buffer.setBufferSize(bufferSize);
}
alphaSynth.scomponent.StereoSynthComponent.prototype.__class__ = alphaSynth.scomponent.StereoSynthComponent;
alphaSynth.scomponent.IControllable = function() { }
alphaSynth.scomponent.IControllable.__name__ = ["alphaSynth","scomponent","IControllable"];
alphaSynth.scomponent.IControllable.prototype.processControllerMessage = null;
alphaSynth.scomponent.IControllable.prototype.__class__ = alphaSynth.scomponent.IControllable;
alphaSynth.scomponent.IBendable = function() { }
alphaSynth.scomponent.IBendable.__name__ = ["alphaSynth","scomponent","IBendable"];
alphaSynth.scomponent.IBendable.prototype.getPitchBendModulation = null;
alphaSynth.scomponent.IBendable.prototype.setPitchBendModulation = null;
alphaSynth.scomponent.IBendable.prototype.__class__ = alphaSynth.scomponent.IBendable;
alphaSynth.Voice = function(sampleRate,buffer) { if( sampleRate === $_ ) return; {
	alphaSynth.scomponent.StereoSynthComponent.call(this,sampleRate,buffer);
	this._currentNote = 69;
	this._mainBuffer = buffer;
	this._components = new Array();
	this._bendables = new Array();
	this._controllables = new Array();
	buffer.addBufferSizeChangedHandler($closure(this,"handleBufferSizeChanged"));
}}
alphaSynth.Voice.__name__ = ["alphaSynth","Voice"];
alphaSynth.Voice.__super__ = alphaSynth.scomponent.StereoSynthComponent;
for(var k in alphaSynth.scomponent.StereoSynthComponent.prototype ) alphaSynth.Voice.prototype[k] = alphaSynth.scomponent.StereoSynthComponent.prototype[k];
alphaSynth.Voice.prototype._currentNote = null;
alphaSynth.Voice.prototype._components = null;
alphaSynth.Voice.prototype._bendables = null;
alphaSynth.Voice.prototype._controllables = null;
alphaSynth.Voice.prototype._pitchBendModulation = null;
alphaSynth.Voice.prototype._mainBuffer = null;
alphaSynth.Voice.prototype.getCurrentNote = function() {
	return this._currentNote;
}
alphaSynth.Voice.prototype.getOrdinal = function() {
	return 1;
}
alphaSynth.Voice.prototype.getPitchBendModulation = function() {
	return this._pitchBendModulation;
}
alphaSynth.Voice.prototype.setPitchBendModulation = function(modulation) {
	this._pitchBendModulation = modulation;
	{
		var _g = 0, _g1 = this._bendables;
		while(_g < _g1.length) {
			var bendable = _g1[_g];
			++_g;
			bendable.setPitchBendModulation(this.getPitchBendModulation());
		}
	}
}
alphaSynth.Voice.prototype.generate = function(offset,sampleCount) {
	if(!this.isPlaying()) return;
	{
		var _g = 0, _g1 = this._components;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			component.generate(offset,sampleCount);
		}
	}
}
alphaSynth.Voice.prototype.trigger = function(previousNote,note,velocity) {
	this._currentNote = note;
	{
		var _g = 0, _g1 = this._components;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			component.trigger(previousNote,note,velocity);
		}
	}
}
alphaSynth.Voice.prototype.release = function(velocity) {
	var _g = 0, _g1 = this._components;
	while(_g < _g1.length) {
		var component = _g1[_g];
		++_g;
		component.release(velocity);
	}
}
alphaSynth.Voice.prototype.processControllerMessage = function(controllerType,value) {
	var _g = 0, _g1 = this._controllables;
	while(_g < _g1.length) {
		var controllable = _g1[_g];
		++_g;
		controllable.processControllerMessage(controllerType,value);
	}
}
alphaSynth.Voice.prototype.isPlaying = function() {
	throw "abstract method not implemented";
	return false;
}
alphaSynth.Voice.prototype.addComponent = function(component) {
	component.addOrdinalChangedHandler($closure(this,"handleOrdinalChanged"));
	this._components.push(component);
	this._components.sort($closure(alphaSynth.scomponent.SynthComponent,"comparer"));
	component.setBufferSize(this._mainBuffer.getBufferSize());
}
alphaSynth.Voice.prototype.removeComponent = function(component) {
	if(Lambda.has(this._components,component)) {
		component.removeOrdinalChangedHandler($closure(this,"handleOrdinalChanged"));
		this._components.remove(component);
	}
}
alphaSynth.Voice.prototype.addBendable = function(bendable) {
	this._bendables.push(bendable);
}
alphaSynth.Voice.prototype.addControllable = function(controllable) {
	this._controllables.push(controllable);
}
alphaSynth.Voice.prototype.handleOrdinalChanged = function() {
	this._components.sort($closure(alphaSynth.scomponent.SynthComponent,"comparer"));
}
alphaSynth.Voice.prototype.handleBufferSizeChanged = function() {
	var _g = 0, _g1 = this._components;
	while(_g < _g1.length) {
		var component = _g1[_g];
		++_g;
		component.setBufferSize(this._mainBuffer.getBufferSize());
	}
}
alphaSynth.Voice.prototype.__class__ = alphaSynth.Voice;
alphaSynth.Voice.__interfaces__ = [alphaSynth.scomponent.IControllable,alphaSynth.scomponent.IBendable];
if(!alphaSynth.midi) alphaSynth.midi = {}
alphaSynth.midi.MidiFileProperties = function(p) { if( p === $_ ) return; {
	this._format = 1;
	this._trackCount = 0;
	this._division = 24;
}}
alphaSynth.midi.MidiFileProperties.__name__ = ["alphaSynth","midi","MidiFileProperties"];
alphaSynth.midi.MidiFileProperties.prototype._format = null;
alphaSynth.midi.MidiFileProperties.prototype._trackCount = null;
alphaSynth.midi.MidiFileProperties.prototype._division = null;
alphaSynth.midi.MidiFileProperties.prototype.getFormat = function() {
	return this._format;
}
alphaSynth.midi.MidiFileProperties.prototype.getTrackCount = function() {
	return this._trackCount;
}
alphaSynth.midi.MidiFileProperties.prototype.getDivision = function() {
	return this._division;
}
alphaSynth.midi.MidiFileProperties.prototype.read = function(stream) {
	var magic = stream.readString(4);
	if(magic != "MThd") {
		throw "invalid midi file: file header not found";
	}
	{
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			stream.readByte();
		}
	}
	this._format = stream.readInt16();
	this._trackCount = stream.readInt16();
	this._division = stream.readInt16();
}
alphaSynth.midi.MidiFileProperties.prototype.__class__ = alphaSynth.midi.MidiFileProperties;
alphaSynth.PitchBender = function(voice) { if( voice === $_ ) return; {
	this._pitchBendRange = 2;
	this._voices = voice;
}}
alphaSynth.PitchBender.__name__ = ["alphaSynth","PitchBender"];
alphaSynth.PitchBender.prototype._pitchBendRange = null;
alphaSynth.PitchBender.prototype._voices = null;
alphaSynth.PitchBender.prototype.bendPitch = function(data1,data2) {
	var pitchBendModulation = data1 | data2 << 7;
	pitchBendModulation -= 8192;
	pitchBendModulation /= 8192;
	pitchBendModulation *= this._pitchBendRange / 12.0;
	{
		var _g = 0, _g1 = this._voices;
		while(_g < _g1.length) {
			var voice = _g1[_g];
			++_g;
			voice.setPitchBendModulation(pitchBendModulation);
		}
	}
}
alphaSynth.PitchBender.prototype.__class__ = alphaSynth.PitchBender;
if(!alphaSynth.buffer) alphaSynth.buffer = {}
alphaSynth.buffer.ISynthesizerGlobalBuffer = function() { }
alphaSynth.buffer.ISynthesizerGlobalBuffer.__name__ = ["alphaSynth","buffer","ISynthesizerGlobalBuffer"];
alphaSynth.buffer.ISynthesizerGlobalBuffer.prototype.setBufferSize = null;
alphaSynth.buffer.ISynthesizerGlobalBuffer.prototype.writeBuffer = null;
alphaSynth.buffer.ISynthesizerGlobalBuffer.prototype.finish = null;
alphaSynth.buffer.ISynthesizerGlobalBuffer.prototype.__class__ = alphaSynth.buffer.ISynthesizerGlobalBuffer;
alphaSynth.buffer.StereoBuffer = function(bufferSize) { if( bufferSize === $_ ) return; {
	this._amplitude = 0.25;
	this.setBufferSize(bufferSize);
	this._bufferSizeChanged = new Array();
}}
alphaSynth.buffer.StereoBuffer.__name__ = ["alphaSynth","buffer","StereoBuffer"];
alphaSynth.buffer.StereoBuffer.prototype._buffer = null;
alphaSynth.buffer.StereoBuffer.prototype._amplitude = null;
alphaSynth.buffer.StereoBuffer.prototype._bufferSizeChanged = null;
alphaSynth.buffer.StereoBuffer.prototype.getBuffer = function() {
	return this._buffer;
}
alphaSynth.buffer.StereoBuffer.prototype.getAmplitude = function() {
	return this._amplitude;
}
alphaSynth.buffer.StereoBuffer.prototype.setAmplitude = function(amplitude) {
	this._amplitude = amplitude;
}
alphaSynth.buffer.StereoBuffer.prototype.clear = function() {
	var bufferSize = this.getBufferSize();
	this._buffer[0] = alphaSynth.PlatformFactory.getSampleBuffer(bufferSize);
	this._buffer[1] = alphaSynth.PlatformFactory.getSampleBuffer(bufferSize);
}
alphaSynth.buffer.StereoBuffer.prototype.modulateAmplitude = function() {
	var bufferSize = this.getBufferSize();
	{
		var _g = 0;
		while(_g < bufferSize) {
			var i = _g++;
			this._buffer[0].set(i,this._buffer[0].get(i) * this._amplitude);
			this._buffer[1].set(i,this._buffer[1].get(i) * this._amplitude);
		}
	}
}
alphaSynth.buffer.StereoBuffer.prototype.getBufferSize = function() {
	return this._buffer[0].getLength();
}
alphaSynth.buffer.StereoBuffer.prototype.setBufferSize = function(bufferSize) {
	this._buffer = new Array();
	this._buffer.push(alphaSynth.PlatformFactory.getSampleBuffer(bufferSize));
	this._buffer.push(alphaSynth.PlatformFactory.getSampleBuffer(bufferSize));
}
alphaSynth.buffer.StereoBuffer.prototype.onBufferSizeChanged = function() {
	var _g = 0, _g1 = this._bufferSizeChanged;
	while(_g < _g1.length) {
		var handler = _g1[_g];
		++_g;
		handler();
	}
}
alphaSynth.buffer.StereoBuffer.prototype.addBufferSizeChangedHandler = function(handler) {
	this._bufferSizeChanged.push(handler);
}
alphaSynth.buffer.StereoBuffer.prototype.removeBufferSizeChangedHandler = function(handler) {
	this._bufferSizeChanged.remove(handler);
}
alphaSynth.buffer.StereoBuffer.prototype.__class__ = alphaSynth.buffer.StereoBuffer;
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
alphaSynth.PlatformFactory = function() { }
alphaSynth.PlatformFactory.__name__ = ["alphaSynth","PlatformFactory"];
alphaSynth.PlatformFactory.getFileLoader = function() {
	return new alphaSynth.js.JsFileLoader();
}
alphaSynth.PlatformFactory.getSampleBuffer = function(length) {
	if(length == null) length = 0;
	var buffer = null;
	buffer = new alphaSynth.js.JsSampleBuffer(length);
	return buffer;
}
alphaSynth.PlatformFactory.getByteBuffer = function(length) {
	if(length == null) length = 0;
	var buffer = null;
	buffer = new alphaSynth.js.JsByteBuffer(length);
	return buffer;
}
alphaSynth.PlatformFactory.prototype.__class__ = alphaSynth.PlatformFactory;
alphaSynth.Channel = function(synthesizer,factory,voiceCount,synthBuffer) { if( synthesizer === $_ ) return; {
	this._voices = new Array();
	{
		var _g = 0;
		while(_g < voiceCount) {
			var i = _g++;
			var v = factory(synthesizer.getSampleRate(),synthBuffer);
			v.setSynthesizeReplaceEnabled(false);
			this._voices.push(v);
		}
	}
	this._allocator = new alphaSynth.VoiceAllocator(this._voices);
	this._bender = new alphaSynth.PitchBender(this._voices);
	this._controlProcessor = new alphaSynth.ControlProcessor(this._voices,this._allocator);
	this._dispatcher = new alphaSynth.MessageDispatcher(this._allocator,this._controlProcessor,this._bender);
}}
alphaSynth.Channel.__name__ = ["alphaSynth","Channel"];
alphaSynth.Channel.prototype._voices = null;
alphaSynth.Channel.prototype._dispatcher = null;
alphaSynth.Channel.prototype._allocator = null;
alphaSynth.Channel.prototype._bender = null;
alphaSynth.Channel.prototype._controlProcessor = null;
alphaSynth.Channel.prototype.generate = function(offset,count) {
	var _g = 0, _g1 = this._voices;
	while(_g < _g1.length) {
		var voice = _g1[_g];
		++_g;
		voice.generate(offset,count);
	}
}
alphaSynth.Channel.prototype.dispatch = function(midiMessage) {
	this._dispatcher.dispatch(midiMessage);
}
alphaSynth.Channel.prototype.__class__ = alphaSynth.Channel;
alphaSynth.SampleRate = function(samplesPerSecond) { if( samplesPerSecond === $_ ) return; {
	if(samplesPerSecond == null) samplesPerSecond = 44100;
	this._sampleRateChanged = new Array();
	this.setSamplesPerSecond(samplesPerSecond);
}}
alphaSynth.SampleRate.__name__ = ["alphaSynth","SampleRate"];
alphaSynth.SampleRate.prototype._samplesPerSecond = null;
alphaSynth.SampleRate.prototype.getSamplesPerSecond = function() {
	return this._samplesPerSecond;
}
alphaSynth.SampleRate.prototype.setSamplesPerSecond = function(samplesPerSecond) {
	this._samplesPerSecond = samplesPerSecond;
	this.onSampleRateChanged();
}
alphaSynth.SampleRate.prototype._sampleRateChanged = null;
alphaSynth.SampleRate.prototype.onSampleRateChanged = function() {
	var _g = 0, _g1 = this._sampleRateChanged;
	while(_g < _g1.length) {
		var handler = _g1[_g];
		++_g;
		handler();
	}
}
alphaSynth.SampleRate.prototype.addSampleRateChangedHandler = function(handler) {
	this._sampleRateChanged.push(handler);
}
alphaSynth.SampleRate.prototype.removeSampleRateChangedHandler = function(handler) {
	this._sampleRateChanged.remove(handler);
}
alphaSynth.SampleRate.prototype.__class__ = alphaSynth.SampleRate;
alphaSynth.StatusReporter = function(p) { if( p === $_ ) return; {
	this._progressUpdated = new Array();
}}
alphaSynth.StatusReporter.__name__ = ["alphaSynth","StatusReporter"];
alphaSynth.StatusReporter.prototype._progressUpdated = null;
alphaSynth.StatusReporter.prototype.onProgressUpdated = function(status,progress,data) {
	this.onProgressUpdated2(new alphaSynth.SynthesizerStatus(status,progress,data));
}
alphaSynth.StatusReporter.prototype.onProgressUpdated2 = function(status) {
	var _g = 0, _g1 = this._progressUpdated;
	while(_g < _g1.length) {
		var handler = _g1[_g];
		++_g;
		handler(status);
	}
}
alphaSynth.StatusReporter.prototype.addProgressUpdatedHandler = function(handler) {
	if(handler == null) return;
	this._progressUpdated.push(handler);
}
alphaSynth.StatusReporter.prototype.removeProgressUpdatedHandler = function(handler) {
	this._progressUpdated.remove(handler);
}
alphaSynth.StatusReporter.prototype.__class__ = alphaSynth.StatusReporter;
alphaSynth.SynthesizerStatus = function(status,progress,data) { if( status === $_ ) return; {
	this._statusText = status;
	this._progress = progress;
	this._data = data;
}}
alphaSynth.SynthesizerStatus.__name__ = ["alphaSynth","SynthesizerStatus"];
alphaSynth.SynthesizerStatus.prototype._statusText = null;
alphaSynth.SynthesizerStatus.prototype._progress = null;
alphaSynth.SynthesizerStatus.prototype._data = null;
alphaSynth.SynthesizerStatus.prototype.getStatusText = function() {
	return this._statusText;
}
alphaSynth.SynthesizerStatus.prototype.getProgress = function() {
	return this._progress;
}
alphaSynth.SynthesizerStatus.prototype.getData = function() {
	return this._data;
}
alphaSynth.SynthesizerStatus.prototype.__class__ = alphaSynth.SynthesizerStatus;
alphaSynth.midi.MidiTrack = function(p) { if( p === $_ ) return; {
	this._events = new Array();
	var eotMessage = new alphaSynth.midi.EndOfTrackMessage();
	this._endOfTrack = new alphaSynth.midi.MidiEvent(eotMessage,0);
	this._events.push(this._endOfTrack);
}}
alphaSynth.midi.MidiTrack.__name__ = ["alphaSynth","midi","MidiTrack"];
alphaSynth.midi.MidiTrack.prototype._events = null;
alphaSynth.midi.MidiTrack.prototype._endOfTrack = null;
alphaSynth.midi.MidiTrack.prototype.get = function(index) {
	return this._events[index];
}
alphaSynth.midi.MidiTrack.prototype.size = function() {
	return this._events.length;
}
alphaSynth.midi.MidiTrack.prototype.getTickLength = function() {
	if(this._events.length == 0) return 0;
	return this._events[this._events.length - 1].getTick();
}
alphaSynth.midi.MidiTrack.prototype.add = function(midiEvent) {
	if(alphaSynth.midi.EndOfTrackMessage.isEndOfTrackMessage(midiEvent.getMessage())) {
		this._endOfTrack.setTick(midiEvent.getTick());
	}
	var insertPosition = this._events.length;
	while(insertPosition > 0) {
		var previousEvent = this._events[insertPosition - 1];
		if(midiEvent.getTick() >= previousEvent.getTick()) {
			break;
		}
		insertPosition--;
	}
	if(insertPosition == this._events.length) {
		this._events.insert(this._events.length - 1,midiEvent);
		this._endOfTrack.setTick(midiEvent.getTick());
	}
	else {
		this._events.insert(insertPosition,midiEvent);
	}
}
alphaSynth.midi.MidiTrack.prototype.remove = function(midiEvent) {
	if(this._endOfTrack == midiEvent) return;
	this._events.remove(midiEvent);
}
alphaSynth.midi.MidiTrack.prototype.__class__ = alphaSynth.midi.MidiTrack;
alphaSynth.FileLoader = function() { }
alphaSynth.FileLoader.__name__ = ["alphaSynth","FileLoader"];
alphaSynth.FileLoader.prototype.loadBinary = null;
alphaSynth.FileLoader.prototype.__class__ = alphaSynth.FileLoader;
alphaSynth.NoteTracker = function(p) { if( p === $_ ) return; {
	this._noteOnMessages = new Array();
	this._lastNote = 69;
}}
alphaSynth.NoteTracker.__name__ = ["alphaSynth","NoteTracker"];
alphaSynth.NoteTracker.prototype._noteOnMessages = null;
alphaSynth.NoteTracker.prototype._lastNote = null;
alphaSynth.NoteTracker.prototype.noteOn = function(message) {
	if(message.getCommand() != 144 || message.getCommand() == 144 && message.getData2() == 0) {
		return;
	}
	this._noteOnMessages.push(message);
	this._lastNote = message.getData1();
}
alphaSynth.NoteTracker.prototype.noteOff = function(message) {
	if(message.getCommand() != 128) {
		if(message.getCommand() != 144) {
			if(message.getData2() > 0) {
				return;
			}
		}
		else {
			return;
		}
	}
	var index = -1;
	{
		var _g1 = 0, _g = this._noteOnMessages.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._noteOnMessages[i].getChannel() == message.getChannel() && this._noteOnMessages[i].getData1() == message.getData1()) {
				index = i;
				break;
			}
		}
	}
	if(index >= 0) {
		this._noteOnMessages.remove(this._noteOnMessages[index]);
		if(this._noteOnMessages.length > 0) {
			this._lastNote = this._noteOnMessages[this._noteOnMessages.length - 1].getData1();
		}
	}
}
alphaSynth.NoteTracker.prototype.clear = function() {
	this._noteOnMessages = new Array();
}
alphaSynth.NoteTracker.prototype.size = function() {
	return this._noteOnMessages.length;
}
alphaSynth.NoteTracker.prototype.getLastNote = function() {
	return this._lastNote;
}
alphaSynth.NoteTracker.prototype.__class__ = alphaSynth.NoteTracker;
alphaSynth.Synthesizer = function(bufferSize,globalBuffer,sampleRate,channelCount,voiceCount,voiceFactory,effectFactory) { if( bufferSize === $_ ) return; {
	alphaSynth.StatusReporter.call(this);
	this._channels = new Array();
	this._sampleRate = new alphaSynth.SampleRate(sampleRate);
	this._eventQueue = new alphaSynth.PriorityQueue($closure(alphaSynth.SynthEvent,"compare"));
	this._synthBuffer = new alphaSynth.buffer.StereoBuffer(bufferSize);
	this._globalBuffer = globalBuffer;
	this._effects = new Array().concat(effectFactory(this._sampleRate,this._synthBuffer));
	{
		var _g = 0;
		while(_g < channelCount) {
			var i = _g++;
			var c = new alphaSynth.Channel(this,voiceFactory,voiceCount,this._synthBuffer);
			this._channels.push(c);
		}
	}
}}
alphaSynth.Synthesizer.__name__ = ["alphaSynth","Synthesizer"];
alphaSynth.Synthesizer.__super__ = alphaSynth.StatusReporter;
for(var k in alphaSynth.StatusReporter.prototype ) alphaSynth.Synthesizer.prototype[k] = alphaSynth.StatusReporter.prototype[k];
alphaSynth.Synthesizer.prototype._channels = null;
alphaSynth.Synthesizer.prototype._eventQueue = null;
alphaSynth.Synthesizer.prototype._globalBuffer = null;
alphaSynth.Synthesizer.prototype._synthBuffer = null;
alphaSynth.Synthesizer.prototype._effects = null;
alphaSynth.Synthesizer.prototype._lastEvent = null;
alphaSynth.Synthesizer.prototype._sampleRate = null;
alphaSynth.Synthesizer.prototype._returnBytes = null;
alphaSynth.Synthesizer.prototype.getGlobalBuffer = function() {
	return this._globalBuffer;
}
alphaSynth.Synthesizer.prototype.setGlobalBuffer = function(globalBuffer) {
	this._globalBuffer = globalBuffer;
}
alphaSynth.Synthesizer.prototype.processMessage = function(time,message) {
	var evt = new alphaSynth.SynthEvent(time,message);
	this._eventQueue.enqueue(evt);
	if(this._lastEvent == null || evt.getTime() > this._lastEvent.getTime()) this._lastEvent = evt;
}
alphaSynth.Synthesizer.prototype.generate = function() {
	var eventCount = this._eventQueue.size();
	var samplesNeededForEvents = this.microsecondsToSampleCount(this._lastEvent.getTime());
	var bufferCount = Math.ceil(samplesNeededForEvents / this._synthBuffer.getBufferSize());
	var realSampleCount = bufferCount * this._synthBuffer.getBufferSize();
	this._globalBuffer.setBufferSize(realSampleCount);
	var samplesToGenerate = 0;
	do {
		samplesToGenerate = this.writeToBuffer(samplesToGenerate);
		var processedEvents = eventCount - this._eventQueue.size();
		this.onProgressUpdated("Generating audiodata",processedEvents / eventCount);
		this._globalBuffer.writeBuffer(this._synthBuffer);
	} while(samplesToGenerate > 0 || this._eventQueue.size() > 0);
	this._globalBuffer.finish();
}
alphaSynth.Synthesizer.prototype.microsecondsToSampleCount = function(microSecond) {
	var seconds = microSecond / 1000000.0;
	var samples = Std["int"](seconds * this._sampleRate.getSamplesPerSecond());
	return samples;
}
alphaSynth.Synthesizer.prototype.writeToBuffer = function(samplesToGenerate) {
	var synthEvent;
	var offset = 0;
	var count = 0;
	while(offset < this._synthBuffer.getBufferSize()) {
		if(samplesToGenerate <= 0) {
			if(this._eventQueue.size() > 0) {
				synthEvent = this._eventQueue.dequeue();
				var currentTime = synthEvent.getTime();
				if(this._eventQueue.size() > 0) {
					var nextTime = this._eventQueue.peek().getTime();
					var deltaTime = nextTime - currentTime;
					var deltaSamples = this.microsecondsToSampleCount(deltaTime);
					count = deltaSamples - offset;
				}
				else {
					count = this._synthBuffer.getBufferSize() - offset;
				}
			}
			else {
				synthEvent = null;
				count = this._synthBuffer.getBufferSize() - offset;
			}
		}
		else {
			synthEvent = null;
			count = samplesToGenerate;
		}
		if(synthEvent != null) {
			if(Std["is"](synthEvent.getMessage(),alphaSynth.midi.ShortMessage)) {
				var msg = synthEvent.getMessage();
				this._channels[msg.getChannel()].dispatch(msg);
			}
		}
		if(count > 0) {
			var sampleCount = Std["int"](Math.min(count,this._synthBuffer.getBufferSize() - offset));
			{
				var _g = 0, _g1 = this._channels;
				while(_g < _g1.length) {
					var channel = _g1[_g];
					++_g;
					channel.generate(offset,sampleCount);
				}
			}
			offset += sampleCount;
			count -= sampleCount;
			samplesToGenerate = Std["int"](Math.max(0,samplesToGenerate - sampleCount));
		}
	}
	{
		var _g = 0, _g1 = this._effects;
		while(_g < _g1.length) {
			var effectComponent = _g1[_g];
			++_g;
			effectComponent.process();
		}
	}
	this._synthBuffer.modulateAmplitude();
	return Std["int"](Math.max(0,count));
}
alphaSynth.Synthesizer.prototype.getSampleRate = function() {
	return this._sampleRate;
}
alphaSynth.Synthesizer.prototype.__class__ = alphaSynth.Synthesizer;
haxe.io.Input = function() { }
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype.bigEndian = null;
haxe.io.Input.prototype.readByte = function() {
	return (function($this) {
		var $r;
		throw "Not implemented";
		return $r;
	}(this));
}
haxe.io.Input.prototype.readBytes = function(s,pos,len) {
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
haxe.io.Input.prototype.close = function() {
	null;
}
haxe.io.Input.prototype.setEndian = function(b) {
	this.bigEndian = b;
	return b;
}
haxe.io.Input.prototype.readAll = function(bufsize) {
	if(bufsize == null) bufsize = 16384;
	var buf = haxe.io.Bytes.alloc(bufsize);
	var total = new haxe.io.BytesBuffer();
	try {
		while(true) {
			var len = this.readBytes(buf,0,bufsize);
			if(len == 0) throw haxe.io.Error.Blocked;
			total.addBytes(buf,0,len);
		}
	}
	catch( $e0 ) {
		if( js.Boot.__instanceof($e0,haxe.io.Eof) ) {
			var e = $e0;
			null;
		} else throw($e0);
	}
	return total.getBytes();
}
haxe.io.Input.prototype.readFullBytes = function(s,pos,len) {
	while(len > 0) {
		var k = this.readBytes(s,pos,len);
		pos += k;
		len -= k;
	}
}
haxe.io.Input.prototype.read = function(nbytes) {
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
haxe.io.Input.prototype.readUntil = function(end) {
	var buf = new StringBuf();
	var last;
	while((last = this.readByte()) != end) buf.b[buf.b.length] = String.fromCharCode(last);
	return buf.b.join("");
}
haxe.io.Input.prototype.readLine = function() {
	var buf = new StringBuf();
	var last;
	var s;
	try {
		while((last = this.readByte()) != 10) buf.b[buf.b.length] = String.fromCharCode(last);
		s = buf.b.join("");
		if(s.charCodeAt(s.length - 1) == 13) s = s.substr(0,-1);
	}
	catch( $e0 ) {
		if( js.Boot.__instanceof($e0,haxe.io.Eof) ) {
			var e = $e0;
			{
				s = buf.b.join("");
				if(s.length == 0) throw e;
			}
		} else throw($e0);
	}
	return s;
}
haxe.io.Input.prototype.readFloat = function() {
	throw "Not implemented";
	return 0;
}
haxe.io.Input.prototype.readDouble = function() {
	throw "Not implemented";
	return 0;
}
haxe.io.Input.prototype.readInt8 = function() {
	var n = this.readByte();
	if(n >= 128) return n - 256;
	return n;
}
haxe.io.Input.prototype.readInt16 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var n = this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
	if((n & 32768) != 0) return n - 65536;
	return n;
}
haxe.io.Input.prototype.readUInt16 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	return this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
}
haxe.io.Input.prototype.readInt24 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var ch3 = this.readByte();
	var n = this.bigEndian?ch3 | ch2 << 8 | ch1 << 16:ch1 | ch2 << 8 | ch3 << 16;
	if((n & 8388608) != 0) return n - 16777216;
	return n;
}
haxe.io.Input.prototype.readUInt24 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var ch3 = this.readByte();
	return this.bigEndian?ch3 | ch2 << 8 | ch1 << 16:ch1 | ch2 << 8 | ch3 << 16;
}
haxe.io.Input.prototype.readInt31 = function() {
	var ch1, ch2, ch3, ch4;
	if(this.bigEndian) {
		ch4 = this.readByte();
		ch3 = this.readByte();
		ch2 = this.readByte();
		ch1 = this.readByte();
	}
	else {
		ch1 = this.readByte();
		ch2 = this.readByte();
		ch3 = this.readByte();
		ch4 = this.readByte();
	}
	if((ch4 & 128) == 0 != ((ch4 & 64) == 0)) throw haxe.io.Error.Overflow;
	return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
}
haxe.io.Input.prototype.readUInt30 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var ch3 = this.readByte();
	var ch4 = this.readByte();
	if((this.bigEndian?ch1:ch4) >= 64) throw haxe.io.Error.Overflow;
	return this.bigEndian?ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24:ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
}
haxe.io.Input.prototype.readInt32 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var ch3 = this.readByte();
	var ch4 = this.readByte();
	return this.bigEndian?(ch1 << 8 | ch2) << 16 | (ch3 << 8 | ch4):(ch4 << 8 | ch3) << 16 | (ch2 << 8 | ch1);
}
haxe.io.Input.prototype.readString = function(len) {
	var b = haxe.io.Bytes.alloc(len);
	this.readFullBytes(b,0,len);
	return b.toString();
}
haxe.io.Input.prototype.__class__ = haxe.io.Input;
haxe.io.BytesInput = function(b,pos,len) { if( b === $_ ) return; {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe.io.Error.OutsideBounds;
	this.b = b.b;
	this.pos = pos;
	this.len = len;
}}
haxe.io.BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe.io.BytesInput.__super__ = haxe.io.Input;
for(var k in haxe.io.Input.prototype ) haxe.io.BytesInput.prototype[k] = haxe.io.Input.prototype[k];
haxe.io.BytesInput.prototype.b = null;
haxe.io.BytesInput.prototype.pos = null;
haxe.io.BytesInput.prototype.len = null;
haxe.io.BytesInput.prototype.readByte = function() {
	if(this.len == 0) throw new haxe.io.Eof();
	this.len--;
	return this.b[this.pos++];
}
haxe.io.BytesInput.prototype.readBytes = function(buf,pos,len) {
	if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
	if(this.len == 0 && len > 0) throw new haxe.io.Eof();
	if(this.len < len) len = this.len;
	var b1 = this.b;
	var b2 = buf.b;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
	}
	this.pos += len;
	this.len -= len;
	return len;
}
haxe.io.BytesInput.prototype.__class__ = haxe.io.BytesInput;
alphaSynth.buffer.GlobalSampleBuffer = function(p) { if( p === $_ ) return; {
	this._buffer = alphaSynth.PlatformFactory.getSampleBuffer();
	this._pos = 0;
}}
alphaSynth.buffer.GlobalSampleBuffer.__name__ = ["alphaSynth","buffer","GlobalSampleBuffer"];
alphaSynth.buffer.GlobalSampleBuffer.prototype._buffer = null;
alphaSynth.buffer.GlobalSampleBuffer.prototype._pos = null;
alphaSynth.buffer.GlobalSampleBuffer.prototype.getSamples = function() {
	return this._buffer;
}
alphaSynth.buffer.GlobalSampleBuffer.prototype.setBufferSize = function(size) {
	this._pos = 0;
	this._buffer = alphaSynth.PlatformFactory.getSampleBuffer(size);
}
alphaSynth.buffer.GlobalSampleBuffer.prototype.writeBuffer = function(buffer) {
	var original = buffer.getBuffer();
	var i = 0;
	while(i < buffer.getBufferSize()) {
		this._buffer.set(this._pos++,original[0].get(i));
		this._buffer.set(this._pos++,original[1].get(i));
		i++;
	}
}
alphaSynth.buffer.GlobalSampleBuffer.prototype.finish = function() {
	null;
}
alphaSynth.buffer.GlobalSampleBuffer.prototype.__class__ = alphaSynth.buffer.GlobalSampleBuffer;
alphaSynth.buffer.GlobalSampleBuffer.__interfaces__ = [alphaSynth.buffer.ISynthesizerGlobalBuffer];
if(!alphaSynth.simple) alphaSynth.simple = {}
alphaSynth.simple.WaveformType = { __ename__ : ["alphaSynth","simple","WaveformType"], __constructs__ : ["Sawtooth","Square","Triangle"] }
alphaSynth.simple.WaveformType.Sawtooth = ["Sawtooth",0];
alphaSynth.simple.WaveformType.Sawtooth.toString = $estr;
alphaSynth.simple.WaveformType.Sawtooth.__enum__ = alphaSynth.simple.WaveformType;
alphaSynth.simple.WaveformType.Square = ["Square",1];
alphaSynth.simple.WaveformType.Square.toString = $estr;
alphaSynth.simple.WaveformType.Square.__enum__ = alphaSynth.simple.WaveformType;
alphaSynth.simple.WaveformType.Triangle = ["Triangle",2];
alphaSynth.simple.WaveformType.Triangle.toString = $estr;
alphaSynth.simple.WaveformType.Triangle.__enum__ = alphaSynth.simple.WaveformType;
alphaSynth.midi.MidiMessage = function(p) { if( p === $_ ) return; {
	null;
}}
alphaSynth.midi.MidiMessage.__name__ = ["alphaSynth","midi","MidiMessage"];
alphaSynth.midi.MidiMessage.prototype._data = null;
alphaSynth.midi.MidiMessage.prototype.getMessage = function() {
	var clone = haxe.io.Bytes.alloc(this._data.length);
	clone.blit(0,this._data,0,this._data.length);
	return clone;
}
alphaSynth.midi.MidiMessage.prototype.getLength = function() {
	return this._data.length;
}
alphaSynth.midi.MidiMessage.prototype.getStatus = function() {
	return this._data.length > 0?this._data.b[0] & 255:0;
}
alphaSynth.midi.MidiMessage.prototype.getInternalData = function() {
	return this._data;
}
alphaSynth.midi.MidiMessage.prototype.setInternalData = function(data) {
	this._data = data;
}
alphaSynth.midi.MidiMessage.prototype.__class__ = alphaSynth.midi.MidiMessage;
haxe.io.Eof = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype.toString = function() {
	return "Eof";
}
haxe.io.Eof.prototype.__class__ = haxe.io.Eof;
alphaSynth.midi.TrackReader = function(midiSequence) { if( midiSequence === $_ ) return; {
	this._midiSequence = midiSequence;
}}
alphaSynth.midi.TrackReader.__name__ = ["alphaSynth","midi","TrackReader"];
alphaSynth.midi.TrackReader.prototype._midiSequence = null;
alphaSynth.midi.TrackReader.prototype._stream = null;
alphaSynth.midi.TrackReader.prototype._newTrack = null;
alphaSynth.midi.TrackReader.prototype._trackData = null;
alphaSynth.midi.TrackReader.prototype._trackIndex = null;
alphaSynth.midi.TrackReader.prototype.read = function(stream) {
	this._stream = stream;
	var magic = stream.readString(4);
	if(magic != "MTrk") {
		throw "invalid midi file: track not found";
	}
	var trackLength = this.getTrackLength();
	this._trackData = this.readBuffer(trackLength);
	this._newTrack = this._midiSequence.createTrack();
	this.parseTrackData();
}
alphaSynth.midi.TrackReader.prototype.getTrackLength = function() {
	return this._stream.readInt32();
}
alphaSynth.midi.TrackReader.prototype.parseTrackData = function() {
	this._trackIndex = 0;
	var tick = 0;
	var status = 0;
	var endOfTrackFound = false;
	while(!this.endOfTrack() && !endOfTrackFound) {
		var message = null;
		var data1 = -1;
		var data2 = 0;
		tick += this.readVariableLenghtValue();
		var byteValue = this.readUnsigned();
		if(byteValue >= 128) {
			status = byteValue;
		}
		else {
			data1 = byteValue;
		}
		if(status >= 192 && status <= 223) {
			if(data1 == -1) {
				data1 = this.readUnsigned();
			}
			var sms = new alphaSynth.midi.ShortMessage();
			sms.setShortMessage(status,data1,0);
			message = sms;
		}
		else if(status >= 128 && status <= 239) {
			if(data1 == -1) {
				data1 = this.readUnsigned();
			}
			data2 = this.readUnsigned();
			var sms = new alphaSynth.midi.ShortMessage();
			sms.setShortMessage(status,data1,data2);
			message = sms;
		}
		else if(status == 240 || status == 247) {
			var sysexLength = this.readVariableLenghtValue();
			var sysexData = this.readData(sysexLength);
		}
		else if(status == 255) {
			var metaType = this.readUnsigned();
			var metaLength = this.readVariableLenghtValue();
			var metaData = this.readData(metaLength);
			var mms = new alphaSynth.midi.MetaMessage();
			mms.setMetaMessage(metaType,metaData);
			message = mms;
			if(metaType == 47) {
				endOfTrackFound = true;
			}
		}
		if(message != null) this._newTrack.add(new alphaSynth.midi.MidiEvent(message,tick));
	}
}
alphaSynth.midi.TrackReader.prototype.readData = function(count) {
	var data = haxe.io.Bytes.alloc(count);
	data.blit(0,this._trackData,this._trackIndex,count);
	this._trackIndex += count;
	return data;
}
alphaSynth.midi.TrackReader.prototype.readUnsigned = function() {
	return this._trackData.b[this._trackIndex++] & 255;
}
alphaSynth.midi.TrackReader.prototype.endOfTrack = function() {
	return this._trackIndex >= this._trackData.length;
}
alphaSynth.midi.TrackReader.prototype.readVariableLenghtValue = function() {
	var result = 0;
	var currentByte;
	do {
		currentByte = this._trackData.b[this._trackIndex++];
		result = (result << 7) + (currentByte & 127);
	} while((currentByte & 128) != 0);
	return result;
}
alphaSynth.midi.TrackReader.prototype.readBuffer = function(size) {
	var buffer = haxe.io.Bytes.alloc(size);
	{
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			buffer.b[i] = this._stream.readByte() & 255;
		}
	}
	return buffer;
}
alphaSynth.midi.TrackReader.prototype.__class__ = alphaSynth.midi.TrackReader;
alphaSynth.midi.MidiSequence = function(p) { if( p === $_ ) return; {
	alphaSynth.StatusReporter.call(this);
	this._tracks = new Array();
}}
alphaSynth.midi.MidiSequence.__name__ = ["alphaSynth","midi","MidiSequence"];
alphaSynth.midi.MidiSequence.__super__ = alphaSynth.StatusReporter;
for(var k in alphaSynth.StatusReporter.prototype ) alphaSynth.midi.MidiSequence.prototype[k] = alphaSynth.StatusReporter.prototype[k];
alphaSynth.midi.MidiSequence.loadSequence = function(method,url,success,progressListener) {
	var loader = alphaSynth.PlatformFactory.getFileLoader();
	loader.loadBinary(method,url,function(data) {
		var sequence = new alphaSynth.midi.MidiSequence();
		if(progressListener != null) sequence.addProgressUpdatedHandler(progressListener);
		sequence.load(data);
		success(sequence);
	},function(err) {
		throw err;
	});
}
alphaSynth.midi.MidiSequence.prototype._tracks = null;
alphaSynth.midi.MidiSequence.prototype._division = null;
alphaSynth.midi.MidiSequence.prototype.getTracks = function() {
	return this._tracks;
}
alphaSynth.midi.MidiSequence.prototype.get = function(index) {
	return this._tracks[index];
}
alphaSynth.midi.MidiSequence.prototype.getDivision = function() {
	return this._division;
}
alphaSynth.midi.MidiSequence.prototype.setDivision = function(division) {
	this._division = division;
}
alphaSynth.midi.MidiSequence.prototype.createTrack = function() {
	var track = new alphaSynth.midi.MidiTrack();
	this._tracks.push(track);
	return track;
}
alphaSynth.midi.MidiSequence.prototype.removeTrack = function(track) {
	this._tracks.remove(track);
}
alphaSynth.midi.MidiSequence.prototype.getTickLength = function() {
	var maxLength = 0;
	{
		var _g = 0, _g1 = this._tracks;
		while(_g < _g1.length) {
			var midiTrack = _g1[_g];
			++_g;
			var trackLength = midiTrack.getTickLength();
			if(trackLength > maxLength) {
				maxLength = trackLength;
			}
		}
	}
	return maxLength;
}
alphaSynth.midi.MidiSequence.prototype.load = function(stream) {
	this._tracks = new Array();
	var properties = new alphaSynth.midi.MidiFileProperties();
	var reader = new alphaSynth.midi.TrackReader(this);
	this.onProgressUpdated("Loading Midi Sequence",0);
	properties.read(stream);
	this.setDivision(properties.getDivision());
	{
		var _g1 = 0, _g = properties.getTrackCount();
		while(_g1 < _g) {
			var i = _g1++;
			reader.read(stream);
			var trackProgress = i / properties.getTrackCount();
			this.onProgressUpdated("Loading Midi Sequence",trackProgress);
		}
	}
	this.onProgressUpdated("Loading Midi Sequence",1);
}
alphaSynth.midi.MidiSequence.prototype.__class__ = alphaSynth.midi.MidiSequence;
alphaSynth.simple.SimpleVoice = function(sampleRate,buffer) { if( sampleRate === $_ ) return; {
	alphaSynth.Voice.call(this,sampleRate,buffer);
	this.initialize(sampleRate,buffer);
}}
alphaSynth.simple.SimpleVoice.__name__ = ["alphaSynth","simple","SimpleVoice"];
alphaSynth.simple.SimpleVoice.__super__ = alphaSynth.Voice;
for(var k in alphaSynth.Voice.prototype ) alphaSynth.simple.SimpleVoice.prototype[k] = alphaSynth.Voice.prototype[k];
alphaSynth.simple.SimpleVoice.prototype._osc = null;
alphaSynth.simple.SimpleVoice.prototype.isPlaying = function() {
	return this._osc.isPlaying();
}
alphaSynth.simple.SimpleVoice.prototype.initialize = function(sampleRate,buffer) {
	this._osc = new alphaSynth.simple.SimpleOscillator(sampleRate,buffer);
	this._osc.setWaveType(alphaSynth.simple.WaveformType.Triangle);
	this.addComponent(this._osc);
	this.addBendable(this._osc);
}
alphaSynth.simple.SimpleVoice.prototype.getSynthesizeReplaceEnabled = function() {
	return this._osc.getSynthesizeReplaceEnabled();
}
alphaSynth.simple.SimpleVoice.prototype.setSynthesizeReplaceEnabled = function(synthesizeReplaceEnabled) {
	this._osc.setSynthesizeReplaceEnabled(synthesizeReplaceEnabled);
}
alphaSynth.simple.SimpleVoice.prototype.__class__ = alphaSynth.simple.SimpleVoice;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					return "???";
				}
			}
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
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
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
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	}
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	}
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = this.length + len - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
alphaSynth.PriorityQueue = function(comparer) { if( comparer === $_ ) return; {
	this._data = new Array();
	this._data.push(null);
	this._comparer = comparer;
}}
alphaSynth.PriorityQueue.__name__ = ["alphaSynth","PriorityQueue"];
alphaSynth.PriorityQueue.prototype._comparer = null;
alphaSynth.PriorityQueue.prototype._data = null;
alphaSynth.PriorityQueue.prototype.size = function() {
	return this._data.length - 1;
}
alphaSynth.PriorityQueue.prototype.peek = function() {
	if(this.size() == 0) return null;
	else return this._data[1];
}
alphaSynth.PriorityQueue.prototype.enqueue = function(value) {
	this._data.push(value);
	this.bubbleUp(this._data.length - 1);
}
alphaSynth.PriorityQueue.prototype.dequeue = function() {
	if(this.size() == 0) return null;
	var minValue = this._data[1];
	if(this._data.length > 2) {
		var lastValue = this._data[this._data.length - 1];
		this._data.remove(this._data[this._data.length - 1]);
		this._data[1] = lastValue;
		this.bubbleDown(1);
	}
	else {
		this._data.remove(this._data[1]);
	}
	return minValue;
}
alphaSynth.PriorityQueue.prototype.bubbleUp = function(startCell) {
	var cell = startCell;
	while(this.isParentBigger(cell)) {
		var parentValue = this._data[Std["int"](cell / 2)];
		var childValue = this._data[cell];
		this._data[Std["int"](cell / 2)] = childValue;
		this._data[cell] = parentValue;
		cell = Std["int"](cell / 2);
	}
}
alphaSynth.PriorityQueue.prototype.bubbleDown = function(startCell) {
	var cell = startCell;
	while(this.isLeftChildSmaller(cell) || this.isRightChildSmaller(cell)) {
		var child = this.compareChild(cell);
		if(child == -1) {
			var parentValue = this._data[cell];
			var leftChildValue = this._data[2 * cell];
			this._data[cell] = leftChildValue;
			this._data[2 * cell] = parentValue;
			cell = 2 * cell;
		}
		else if(child == 1) {
			var parentValue = this._data[cell];
			var rightChildValue = this._data[2 * cell + 1];
			this._data[cell] = rightChildValue;
			this._data[2 * cell + 1] = parentValue;
			cell = 2 * cell + 1;
		}
	}
}
alphaSynth.PriorityQueue.prototype.isParentBigger = function(childCell) {
	if(childCell == 1) return false;
	return this._comparer(this._data[Std["int"](childCell / 2)],this._data[childCell]) > 0;
}
alphaSynth.PriorityQueue.prototype.isLeftChildSmaller = function(parentCell) {
	if(2 * parentCell >= this._data.length) return false;
	return this._comparer(this._data[2 * parentCell],this._data[parentCell]) < 0;
}
alphaSynth.PriorityQueue.prototype.isRightChildSmaller = function(parentCell) {
	if(2 * parentCell + 1 >= this._data.length) return false;
	return this._comparer(this._data[2 * parentCell + 1],this._data[parentCell]) < 0;
}
alphaSynth.PriorityQueue.prototype.compareChild = function(parentCell) {
	var leftChildSmaller = this.isLeftChildSmaller(parentCell);
	var rightChildSmaller = this.isRightChildSmaller(parentCell);
	if(leftChildSmaller || rightChildSmaller) {
		if(leftChildSmaller && rightChildSmaller) {
			var leftChild = 2 * parentCell;
			var rightChild = 2 * parentCell + 1;
			var leftValue = this._data[leftChild];
			var rightValue = this._data[rightChild];
			if(this._comparer(leftValue,rightValue) <= 0) return -1;
			else return 1;
		}
		else if(leftChildSmaller) return -1;
		else return 1;
	}
	else return 0;
}
alphaSynth.PriorityQueue.prototype.__class__ = alphaSynth.PriorityQueue;
alphaSynth.Main = function() { }
alphaSynth.Main.__name__ = ["alphaSynth","Main"];
alphaSynth.Main.main = function() {
	null;
}
alphaSynth.Main.prototype.__class__ = alphaSynth.Main;
alphaSynth.MessageDispatcher = function(allocator,processor,bender) { if( allocator === $_ ) return; {
	this._allocator = allocator;
	this._bender = bender;
	this._processor = processor;
}}
alphaSynth.MessageDispatcher.__name__ = ["alphaSynth","MessageDispatcher"];
alphaSynth.MessageDispatcher.prototype._allocator = null;
alphaSynth.MessageDispatcher.prototype._bender = null;
alphaSynth.MessageDispatcher.prototype._processor = null;
alphaSynth.MessageDispatcher.prototype.dispatch = function(message) {
	if(message.getCommand() == 144 || message.getCommand() == 128) {
		this._allocator.allocate(message);
	}
	else if(message.getCommand() == 176) {
		this._processor.process(message.getData1(),message.getData2());
	}
	else if(message.getCommand() == 224) {
		this._bender.bendPitch(message.getData1(),message.getData2());
	}
}
alphaSynth.MessageDispatcher.prototype.__class__ = alphaSynth.MessageDispatcher;
if(!alphaSynth.wave) alphaSynth.wave = {}
alphaSynth.wave.WaveFile = function(sampleRate,sampleCount) { if( sampleRate === $_ ) return; {
	alphaSynth.StatusReporter.call(this);
	this._sampleRate = sampleRate;
	this._position = 0;
	this._data = alphaSynth.PlatformFactory.getByteBuffer(44 + 4 * sampleCount);
	this._dataUri = null;
	this._dataString = new Array();
	this._dataLength = sampleCount * 4;
	this._sampleCount = sampleCount;
}}
alphaSynth.wave.WaveFile.__name__ = ["alphaSynth","wave","WaveFile"];
alphaSynth.wave.WaveFile.__super__ = alphaSynth.StatusReporter;
for(var k in alphaSynth.StatusReporter.prototype ) alphaSynth.wave.WaveFile.prototype[k] = alphaSynth.StatusReporter.prototype[k];
alphaSynth.wave.WaveFile.prototype._sampleRate = null;
alphaSynth.wave.WaveFile.prototype._data = null;
alphaSynth.wave.WaveFile.prototype._position = null;
alphaSynth.wave.WaveFile.prototype._dataUri = null;
alphaSynth.wave.WaveFile.prototype._dataString = null;
alphaSynth.wave.WaveFile.prototype._dataLength = null;
alphaSynth.wave.WaveFile.prototype._sampleCount = null;
alphaSynth.wave.WaveFile.prototype.writeSampleByte = function(data) {
	this.writeByte(data);
}
alphaSynth.wave.WaveFile.prototype.startDataUri = function() {
	this._dataUri = "data:audio/wav;base64,";
	this.writeWaveHeader();
	this.writeChunk1();
	this.writeChunk2();
}
alphaSynth.wave.WaveFile.prototype.getDataUri = function() {
	if(this._dataUri == null) {
		var update = $closure(this,"onProgressUpdated");
		this._dataUri = "data:audio/wav;base64," + alphaSynth.wave.FastBase64.encode(this._data,function(progress) {
			update("Generating Data URI",progress);
		});
	}
	return this._dataUri;
}
alphaSynth.wave.WaveFile.prototype.writeWaveHeader = function() {
	this.writeString("RIFF");
	this.writeInt(36 + this._sampleCount);
	this.writeString("WAVE");
}
alphaSynth.wave.WaveFile.prototype.writeChunk1 = function() {
	this.writeString("fmt ");
	this.writeInt(16);
	this.writeShort(1);
	this.writeShort(2);
	this.writeInt(this._sampleRate);
	this.writeInt(this._sampleRate * 2 * 16 >> 3);
	this.writeShort(4);
	this.writeShort(16);
}
alphaSynth.wave.WaveFile.prototype.writeChunk2 = function() {
	this.writeString("data");
	this.writeInt(this._dataLength);
}
alphaSynth.wave.WaveFile.prototype.finish = function() {
	this.getDataUri();
}
alphaSynth.wave.WaveFile.prototype.writeString = function(string) {
	var _g1 = 0, _g = string.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.writeByte(string.charCodeAt(i));
	}
}
alphaSynth.wave.WaveFile.prototype.writeInt = function(data) {
	this.writeByte(data);
	this.writeByte(data >> 8);
	this.writeByte(data >> 16);
	this.writeByte(data >> 24);
}
alphaSynth.wave.WaveFile.prototype.writeShort = function(data) {
	this.writeByte(data);
	this.writeByte(data >> 8);
}
alphaSynth.wave.WaveFile.prototype.writeByte = function($byte) {
	this._data.set(this._position,$byte & 255);
	this._position++;
}
alphaSynth.wave.WaveFile.prototype.__class__ = alphaSynth.wave.WaveFile;
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
alphaSynth.TypeUtils = function() { }
alphaSynth.TypeUtils.__name__ = ["alphaSynth","TypeUtils"];
alphaSynth.TypeUtils.castToShort = function($short) {
	return Std["int"](Math.max(-32768,Math.min(32767,$short)));
}
alphaSynth.TypeUtils.prototype.__class__ = alphaSynth.TypeUtils;
if(!alphaSynth.js) alphaSynth.js = {}
alphaSynth.js.JsFileLoader = function(p) { if( p === $_ ) return; {
	null;
}}
alphaSynth.js.JsFileLoader.__name__ = ["alphaSynth","js","JsFileLoader"];
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
}
alphaSynth.js.JsFileLoader.prototype.__class__ = alphaSynth.js.JsFileLoader;
alphaSynth.js.JsFileLoader.__interfaces__ = [alphaSynth.FileLoader];
alphaSynth.MidiToWaveConverter = function(p) { if( p === $_ ) return; {
	alphaSynth.StatusReporter.call(this);
	var voiceFactory = function(sr,buffer) {
		return new alphaSynth.simple.SimpleVoice(sr,buffer);
	}
	var effectFactory = function(sr,buffer) {
		return [];
	}
	this._synthesizer = new alphaSynth.Synthesizer(2048,null,48000,16,16,voiceFactory,effectFactory);
	this._synthesizer.addProgressUpdatedHandler($closure(this,"handleSynthesizerUpdated"));
}}
alphaSynth.MidiToWaveConverter.__name__ = ["alphaSynth","MidiToWaveConverter"];
alphaSynth.MidiToWaveConverter.__super__ = alphaSynth.StatusReporter;
for(var k in alphaSynth.StatusReporter.prototype ) alphaSynth.MidiToWaveConverter.prototype[k] = alphaSynth.StatusReporter.prototype[k];
alphaSynth.MidiToWaveConverter.convertToSamples = function(sequence,statusListener) {
	var converter = new alphaSynth.MidiToWaveConverter();
	converter.addProgressUpdatedHandler(statusListener);
	return converter.synthesizeToSamples(sequence);
}
alphaSynth.MidiToWaveConverter.convertToDataUri = function(sequence,statusListener) {
	var converter = new alphaSynth.MidiToWaveConverter();
	converter.addProgressUpdatedHandler(statusListener);
	return converter.synthesizeToDataUri(sequence);
}
alphaSynth.MidiToWaveConverter.prototype._synthesizer = null;
alphaSynth.MidiToWaveConverter.prototype.getSampleRate = function() {
	return this._synthesizer.getSampleRate().getSamplesPerSecond();
}
alphaSynth.MidiToWaveConverter.prototype.setSampleRate = function(sampleRate) {
	return this._synthesizer.getSampleRate().setSamplesPerSecond(sampleRate);
}
alphaSynth.MidiToWaveConverter.prototype.synthesizeToSamples = function(sequence) {
	var buffer = new alphaSynth.buffer.GlobalSampleBuffer();
	this._synthesizer.setGlobalBuffer(buffer);
	this.send(sequence);
	this._synthesizer.generate();
	return buffer.getSamples();
}
alphaSynth.MidiToWaveConverter.prototype.synthesizeToDataUri = function(sequence) {
	var buffer = new alphaSynth.buffer.WaveFileGlobalBuffer(this._synthesizer.getSampleRate().getSamplesPerSecond());
	this._synthesizer.setGlobalBuffer(buffer);
	this.send(sequence);
	this._synthesizer.generate();
	return buffer.getDataUri();
}
alphaSynth.MidiToWaveConverter.prototype.send = function(sequence) {
	var tracks = sequence.getTracks();
	var trackspos = new Array();
	{
		var _g1 = 0, _g = tracks.length;
		while(_g1 < _g) {
			var i = _g1++;
			trackspos.push(0);
		}
	}
	var bpm = 120;
	var ticksPerBeat = sequence.getDivision();
	var lastTick = 0;
	var curTime = 0;
	while(true) {
		var selevent = null;
		var seltrack = -1;
		{
			var _g1 = 0, _g = tracks.length;
			while(_g1 < _g) {
				var i = _g1++;
				var trackpos = trackspos[i];
				var track = tracks[i];
				if(trackpos < track.size()) {
					var evt = track.get(trackpos);
					if(selevent == null || evt.getTick() < selevent.getTick()) {
						selevent = evt;
						seltrack = i;
					}
				}
			}
		}
		if(seltrack == -1) break;
		trackspos[seltrack]++;
		var tick = selevent.getTick();
		var ticksToNextEvent = tick - lastTick;
		var beatsToNextEvent = ticksToNextEvent / 1.0 / ticksPerBeat;
		var secondsToNextEvent = beatsToNextEvent / (bpm / 60.0);
		var microsecondsToNextEvent = Std["int"](secondsToNextEvent * 1000000);
		curTime += microsecondsToNextEvent;
		lastTick = tick;
		var msg = selevent.getMessage();
		if(Std["is"](msg,alphaSynth.midi.MetaMessage)) {
			var mms = msg;
			if(mms.getType() == 81) {
				var data = mms.getData();
				bpm = Std["int"](60000000 / ((data.b[0] & 255) << 16 | (data.b[1] & 255) << 8 | data.b[2] & 255));
			}
		}
		else {
			this._synthesizer.processMessage(curTime,msg);
		}
	}
}
alphaSynth.MidiToWaveConverter.prototype.handleSynthesizerUpdated = function(status) {
	this.onProgressUpdated2(status);
}
alphaSynth.MidiToWaveConverter.prototype.__class__ = alphaSynth.MidiToWaveConverter;
alphaSynth.PowerOfTwoTable = function() { }
alphaSynth.PowerOfTwoTable.__name__ = ["alphaSynth","PowerOfTwoTable"];
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
}
alphaSynth.PowerOfTwoTable.prototype.__class__ = alphaSynth.PowerOfTwoTable;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	a.push(i);
	}}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	l.add(i);
	}}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(x));
	}}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(i++,x));
	}}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		{ var $it0 = it.iterator();
		while( $it0.hasNext() ) { var x = $it0.next();
		if(x == elt) return true;
		}}
	}
	else {
		{ var $it1 = it.iterator();
		while( $it1.hasNext() ) { var x = $it1.next();
		if(cmp(x,elt)) return true;
		}}
	}
	return false;
}
Lambda.exists = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) return true;
	}}
	return false;
}
Lambda.foreach = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(!f(x)) return false;
	}}
	return true;
}
Lambda.iter = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	f(x);
	}}
}
Lambda.filter = function(it,f) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) l.add(x);
	}}
	return l;
}
Lambda.fold = function(it,f,first) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	first = f(x,first);
	}}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) { var $it0 = it.iterator();
	while( $it0.hasNext() ) { var _ = $it0.next();
	n++;
	}}
	else { var $it1 = it.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	if(pred(x)) n++;
	}}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var v2 = $it0.next();
	{
		if(v == v2) return i;
		i++;
	}
	}}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	{ var $it0 = a.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(x);
	}}
	{ var $it1 = b.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	l.add(x);
	}}
	return l;
}
Lambda.prototype.__class__ = Lambda;
alphaSynth.wave.FastBase64 = function() { }
alphaSynth.wave.FastBase64.__name__ = ["alphaSynth","wave","FastBase64"];
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
}
alphaSynth.wave.FastBase64.getBaseChar = function($byte) {
	return alphaSynth.wave.FastBase64._chars[$byte];
}
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
}
alphaSynth.wave.FastBase64.prototype.__class__ = alphaSynth.wave.FastBase64;
alphaSynth.IBuffer = function() { }
alphaSynth.IBuffer.__name__ = ["alphaSynth","IBuffer"];
alphaSynth.IBuffer.prototype.get = null;
alphaSynth.IBuffer.prototype.set = null;
alphaSynth.IBuffer.prototype.getLength = null;
alphaSynth.IBuffer.prototype.__class__ = alphaSynth.IBuffer;
alphaSynth.BinaryReader = function(p) { if( p === $_ ) return; {
	null;
}}
alphaSynth.BinaryReader.__name__ = ["alphaSynth","BinaryReader"];
alphaSynth.BinaryReader.prototype._buffer = null;
alphaSynth.BinaryReader.prototype._pos = null;
alphaSynth.BinaryReader.prototype.initialize = function(data) {
	this._buffer = data;
	this._pos = 0;
}
alphaSynth.BinaryReader.prototype.readBool = function() {
	return this.readByte() == 1;
}
alphaSynth.BinaryReader.prototype.readByte = function() {
	var data = this.getByte(this._pos);
	this._pos++;
	return data;
}
alphaSynth.BinaryReader.prototype.readString = function(charCount) {
	var s = "";
	{
		var _g = 0;
		while(_g < charCount) {
			var i = _g++;
			s += String.fromCharCode(this.readByte());
		}
	}
	return s;
}
alphaSynth.BinaryReader.prototype.getByte = function(index) {
	var data = this._buffer.charCodeAt(index);
	data = data & 255;
	return data;
}
alphaSynth.BinaryReader.prototype.readInt32 = function() {
	return this.readByte() << 24 | this.readByte() << 16 | this.readByte() << 8 | this.readByte();
}
alphaSynth.BinaryReader.prototype.readInt16 = function() {
	return this.readByte() << 8 | this.readByte();
}
alphaSynth.BinaryReader.prototype.getPosition = function() {
	return this._pos;
}
alphaSynth.BinaryReader.prototype.size = function() {
	return this._buffer.length;
}
alphaSynth.BinaryReader.prototype.__class__ = alphaSynth.BinaryReader;
alphaSynth.midi.MetaMessage = function(p) { if( p === $_ ) return; {
	alphaSynth.midi.MidiMessage.call(this);
}}
alphaSynth.midi.MetaMessage.__name__ = ["alphaSynth","midi","MetaMessage"];
alphaSynth.midi.MetaMessage.__super__ = alphaSynth.midi.MidiMessage;
for(var k in alphaSynth.midi.MidiMessage.prototype ) alphaSynth.midi.MetaMessage.prototype[k] = alphaSynth.midi.MidiMessage.prototype[k];
alphaSynth.midi.MetaMessage.prototype._dataLength = null;
alphaSynth.midi.MetaMessage.prototype.setMetaMessage = function(type,data) {
	this._dataLength = data.length;
	this.setInternalData(haxe.io.Bytes.alloc(2 + this._dataLength));
	this.getInternalData().b[0] = 255;
	this.getInternalData().b[1] = type & 255;
	if(this._dataLength > 0) {
		this.getInternalData().blit(this.getLength() - this._dataLength,data,0,this._dataLength);
	}
}
alphaSynth.midi.MetaMessage.prototype.getType = function() {
	return this.getLength() >= 2?this.getInternalData().b[1] & 255:0;
}
alphaSynth.midi.MetaMessage.prototype.getData = function() {
	var returnData = haxe.io.Bytes.alloc(this._dataLength);
	returnData.blit(0,this.getInternalData(),this.getLength() - this._dataLength,this._dataLength);
	return returnData;
}
alphaSynth.midi.MetaMessage.prototype.__class__ = alphaSynth.midi.MetaMessage;
alphaSynth.js.JsByteBuffer = function(length) { if( length === $_ ) return; {
	if(length == null) length = 0;
	this._data = new Uint8Array(length);
}}
alphaSynth.js.JsByteBuffer.__name__ = ["alphaSynth","js","JsByteBuffer"];
alphaSynth.js.JsByteBuffer.prototype._data = null;
alphaSynth.js.JsByteBuffer.prototype.getLength = function() {
	return this._data.length;
}
alphaSynth.js.JsByteBuffer.prototype.get = function(index) {
	return this._data[index];
}
alphaSynth.js.JsByteBuffer.prototype.set = function(index,value) {
	this._data[index] = value;
}
alphaSynth.js.JsByteBuffer.prototype.__class__ = alphaSynth.js.JsByteBuffer;
alphaSynth.js.JsByteBuffer.__interfaces__ = [alphaSynth.IBuffer];
alphaSynth.midi.MidiEvent = function(message,tick) { if( message === $_ ) return; {
	this._message = message;
	this._tick = tick;
}}
alphaSynth.midi.MidiEvent.__name__ = ["alphaSynth","midi","MidiEvent"];
alphaSynth.midi.MidiEvent.prototype._message = null;
alphaSynth.midi.MidiEvent.prototype._tick = null;
alphaSynth.midi.MidiEvent.prototype.getMessage = function() {
	return this._message;
}
alphaSynth.midi.MidiEvent.prototype.getTick = function() {
	return this._tick;
}
alphaSynth.midi.MidiEvent.prototype.setTick = function(tick) {
	this._tick = tick;
}
alphaSynth.midi.MidiEvent.prototype.__class__ = alphaSynth.midi.MidiEvent;
alphaSynth.midi.ShortMessage = function(p) { if( p === $_ ) return; {
	alphaSynth.midi.MidiMessage.call(this);
}}
alphaSynth.midi.ShortMessage.__name__ = ["alphaSynth","midi","ShortMessage"];
alphaSynth.midi.ShortMessage.__super__ = alphaSynth.midi.MidiMessage;
for(var k in alphaSynth.midi.MidiMessage.prototype ) alphaSynth.midi.ShortMessage.prototype[k] = alphaSynth.midi.MidiMessage.prototype[k];
alphaSynth.midi.ShortMessage.getDataLength = function(status) {
	switch(status) {
	case 246:case 247:case 248:case 249:case 250:case 251:case 252:case 253:case 254:case 255:{
		return 0;
	}break;
	case 241:case 243:{
		return 1;
	}break;
	case 242:{
		return 2;
	}break;
	}
	switch(status & 240) {
	case 128:case 144:case 160:case 176:case 224:{
		return 2;
	}break;
	case 192:case 208:{
		return 1;
	}break;
	default:{
		throw "invalid status byte: " + Std.string(status);
	}break;
	}
	return 0;
}
alphaSynth.midi.ShortMessage.prototype.getChannel = function() {
	return this.getStatus() & 15;
}
alphaSynth.midi.ShortMessage.prototype.getCommand = function() {
	return this.getStatus() & 240;
}
alphaSynth.midi.ShortMessage.prototype.getData1 = function() {
	return this.getLength() > 1?this.getInternalData().b[1] & 255:0;
}
alphaSynth.midi.ShortMessage.prototype.getData2 = function() {
	return this.getLength() > 2?this.getInternalData().b[2] & 255:0;
}
alphaSynth.midi.ShortMessage.prototype.setShortMessage = function(status,data1,data2) {
	if(data2 == null) data2 = -1;
	if(data1 == null) data1 = -1;
	var dataLength = alphaSynth.midi.ShortMessage.getDataLength(status);
	var completeLength = dataLength + 1;
	if(this.getInternalData() == null || this.getInternalData().length < completeLength) {
		this.setInternalData(haxe.io.Bytes.alloc(completeLength));
	}
	this.getInternalData().b[0] = status & 255 & 255;
	if(this.getLength() > 1) {
		this.getInternalData().b[1] = data1 & 255 & 255;
		if(this.getLength() > 2) {
			this.getInternalData().b[2] = data2 & 255 & 255;
		}
	}
}
alphaSynth.midi.ShortMessage.prototype.__class__ = alphaSynth.midi.ShortMessage;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
alphaSynth.ControlProcessor = function(voices,allocator) { if( voices === $_ ) return; {
	this._voices = voices;
	this._allocator = allocator;
}}
alphaSynth.ControlProcessor.__name__ = ["alphaSynth","ControlProcessor"];
alphaSynth.ControlProcessor.prototype._voices = null;
alphaSynth.ControlProcessor.prototype._allocator = null;
alphaSynth.ControlProcessor.prototype.process = function(type,value) {
	if(type == 64) {
		this._allocator.setSubstainEnabled(value >= 64);
	}
	else if(type == 120) {
		this._allocator.allSoundOff();
	}
	else {
		var fValue = value;
		fValue /= 127;
		{
			var _g = 0, _g1 = this._voices;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				v.processControllerMessage(type,fValue);
			}
		}
	}
}
alphaSynth.ControlProcessor.prototype.__class__ = alphaSynth.ControlProcessor;
alphaSynth.midi.EndOfTrackMessage = function(p) { if( p === $_ ) return; {
	alphaSynth.midi.MetaMessage.call(this);
	alphaSynth.midi.MetaMessage.prototype.setMetaMessage.call(this,47,haxe.io.Bytes.alloc(1));
}}
alphaSynth.midi.EndOfTrackMessage.__name__ = ["alphaSynth","midi","EndOfTrackMessage"];
alphaSynth.midi.EndOfTrackMessage.__super__ = alphaSynth.midi.MetaMessage;
for(var k in alphaSynth.midi.MetaMessage.prototype ) alphaSynth.midi.EndOfTrackMessage.prototype[k] = alphaSynth.midi.MetaMessage.prototype[k];
alphaSynth.midi.EndOfTrackMessage.isEndOfTrackMessage = function(midiMessage) {
	if(midiMessage.getLength() != 3 || midiMessage.getStatus() != 255) {
		return false;
	}
	var msg = midiMessage.getMessage();
	return (msg.b[1] & 255) == 47 && msg.b[2] == 0;
}
alphaSynth.midi.EndOfTrackMessage.prototype.setMetaMessage = function(type,data) {
	throw "not allowed";
}
alphaSynth.midi.EndOfTrackMessage.prototype.__class__ = alphaSynth.midi.EndOfTrackMessage;
alphaSynth.simple.SimpleOscillator = function(sampleRate,buffer) { if( sampleRate === $_ ) return; {
	alphaSynth.scomponent.StereoSynthComponent.call(this,sampleRate,buffer);
	this._panning = 0.5;
	this._waveType = alphaSynth.simple.WaveformType.Sawtooth;
	this._accumulator = 0;
	this._pitchBendModulation = 0;
	this._playing = false;
	this._synthesizeReplaceEnabled = true;
	this.initialize();
}}
alphaSynth.simple.SimpleOscillator.__name__ = ["alphaSynth","simple","SimpleOscillator"];
alphaSynth.simple.SimpleOscillator.__super__ = alphaSynth.scomponent.StereoSynthComponent;
for(var k in alphaSynth.scomponent.StereoSynthComponent.prototype ) alphaSynth.simple.SimpleOscillator.prototype[k] = alphaSynth.scomponent.StereoSynthComponent.prototype[k];
alphaSynth.simple.SimpleOscillator.prototype._panning = null;
alphaSynth.simple.SimpleOscillator.prototype._waveType = null;
alphaSynth.simple.SimpleOscillator.prototype._currentNote = null;
alphaSynth.simple.SimpleOscillator.prototype._accumulator = null;
alphaSynth.simple.SimpleOscillator.prototype._pitchBendModulation = null;
alphaSynth.simple.SimpleOscillator.prototype._playing = null;
alphaSynth.simple.SimpleOscillator.prototype._synthesizeReplaceEnabled = null;
alphaSynth.simple.SimpleOscillator.prototype.getWaveType = function() {
	return this._waveType;
}
alphaSynth.simple.SimpleOscillator.prototype.setWaveType = function(waveType) {
	this._waveType = waveType;
}
alphaSynth.simple.SimpleOscillator.prototype.initialize = function() {
	this._currentNote = 69;
}
alphaSynth.simple.SimpleOscillator.prototype.generate = function(offset,count) {
	var buffer = this.getBuffer();
	var output = 0;
	var modNote = this._currentNote + 12 * this._pitchBendModulation;
	if(modNote < 0) {
		modNote = 0;
	}
	else if(modNote > 127) {
		modNote = 127;
	}
	var increment = alphaSynth.PowerOfTwoTable.getPower((modNote - 69) / 12) * 440 / this.getSamplesPerSecond();
	var endIndex = offset + count;
	{
		var _g = offset;
		while(_g < endIndex) {
			var i = _g++;
			var $e = this._waveType;
			switch( $e[1] ) {
			case 0:
			{
				output = 1 - 2 * this._accumulator;
			}break;
			case 1:
			{
				if(this._accumulator < 0.5) {
					output = -1;
				}
				else {
					output = 1;
				}
			}break;
			case 2:
			{
				if(this._accumulator < 0.5) {
					output = 1 - 4 * this._accumulator;
				}
				else {
					output = 1 - 4 * (1 - this._accumulator);
				}
			}break;
			}
			if(this._synthesizeReplaceEnabled) {
				buffer[0].set(i,output * (1 - this._panning));
				buffer[1].set(i,output * this._panning);
			}
			else {
				buffer[0].set(i,buffer[0].get(i) + output * (1 - this._panning));
				buffer[1].set(i,buffer[1].get(i) + output * this._panning);
			}
			this._accumulator += increment;
			if(this._accumulator >= 1) {
				this._accumulator -= 1;
			}
		}
	}
}
alphaSynth.simple.SimpleOscillator.prototype.trigger = function(previousNote,note,velocity) {
	this._currentNote = note;
	this._playing = true;
}
alphaSynth.simple.SimpleOscillator.prototype.release = function(velocity) {
	this._playing = false;
}
alphaSynth.simple.SimpleOscillator.prototype.getSynthesizeReplaceEnabled = function() {
	return this._synthesizeReplaceEnabled;
}
alphaSynth.simple.SimpleOscillator.prototype.setSynthesizeReplaceEnabled = function(synthesizeReplaceEnabled) {
	this._synthesizeReplaceEnabled = synthesizeReplaceEnabled;
}
alphaSynth.simple.SimpleOscillator.prototype.getOrdinal = function() {
	return 1;
}
alphaSynth.simple.SimpleOscillator.prototype.getPitchBendModulation = function() {
	return this._pitchBendModulation;
}
alphaSynth.simple.SimpleOscillator.prototype.setPitchBendModulation = function(modulation) {
	this._pitchBendModulation = modulation;
}
alphaSynth.simple.SimpleOscillator.prototype.isPlaying = function() {
	return this._playing;
}
alphaSynth.simple.SimpleOscillator.prototype.__class__ = alphaSynth.simple.SimpleOscillator;
alphaSynth.simple.SimpleOscillator.__interfaces__ = [alphaSynth.scomponent.IBendable];
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
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
alphaSynth.js.JsSampleBuffer = function(length) { if( length === $_ ) return; {
	if(length == null) length = 0;
	this._data = new Float32Array(length);
}}
alphaSynth.js.JsSampleBuffer.__name__ = ["alphaSynth","js","JsSampleBuffer"];
alphaSynth.js.JsSampleBuffer.prototype._data = null;
alphaSynth.js.JsSampleBuffer.prototype.getLength = function() {
	return this._data.length;
}
alphaSynth.js.JsSampleBuffer.prototype.get = function(index) {
	return this._data[index];
}
alphaSynth.js.JsSampleBuffer.prototype.set = function(index,value) {
	this._data[index] = value;
}
alphaSynth.js.JsSampleBuffer.prototype.__class__ = alphaSynth.js.JsSampleBuffer;
alphaSynth.js.JsSampleBuffer.__interfaces__ = [alphaSynth.IBuffer];
alphaSynth.buffer.WaveFileGlobalBuffer = function(sampleRate) { if( sampleRate === $_ ) return; {
	this._sampleRate = sampleRate;
}}
alphaSynth.buffer.WaveFileGlobalBuffer.__name__ = ["alphaSynth","buffer","WaveFileGlobalBuffer"];
alphaSynth.buffer.WaveFileGlobalBuffer.prototype._wave = null;
alphaSynth.buffer.WaveFileGlobalBuffer.prototype._sampleRate = null;
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.getDataUri = function() {
	return this._wave.getDataUri();
}
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.setBufferSize = function(size) {
	this._wave = new alphaSynth.wave.WaveFile(this._sampleRate,size);
}
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.writeBuffer = function(buffer) {
	var samples = buffer.getBuffer();
	var sampleData = 0;
	{
		var _g1 = 0, _g = buffer.getBufferSize();
		while(_g1 < _g) {
			var i = _g1++;
			var leftSample = samples[0].get(i);
			sampleData = alphaSynth.TypeUtils.castToShort(32767 * leftSample);
			this._wave.writeSampleByte(sampleData);
			this._wave.writeSampleByte(sampleData >> 8);
			var rightSample = samples[1].get(i);
			sampleData = alphaSynth.TypeUtils.castToShort(32767 * rightSample);
			this._wave.writeSampleByte(sampleData);
			this._wave.writeSampleByte(sampleData >> 8);
		}
	}
}
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.finish = function() {
	this._wave.finish();
}
alphaSynth.buffer.WaveFileGlobalBuffer.prototype.__class__ = alphaSynth.buffer.WaveFileGlobalBuffer;
alphaSynth.buffer.WaveFileGlobalBuffer.__interfaces__ = [alphaSynth.buffer.ISynthesizerGlobalBuffer];
haxe.io.Bytes = function(length,b) { if( length === $_ ) return; {
	this.length = length;
	this.b = b;
}}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	{
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			a.push(0);
		}
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	{
		var _g1 = 0, _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = s.cca(i);
			if(c <= 127) a.push(c);
			else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			}
			else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
			else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = $closure(String,"fromCharCode");
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		}
		else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127);
		else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		}
		else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	return s;
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
haxe.Int32 = function() { }
haxe.Int32.__name__ = ["haxe","Int32"];
haxe.Int32.make = function(a,b) {
	return a << 16 | b;
}
haxe.Int32.ofInt = function(x) {
	return x;
}
haxe.Int32.toInt = function(x) {
	if((x >> 30 & 1) != x >>> 31) throw "Overflow " + x;
	return x & -1;
}
haxe.Int32.toNativeInt = function(x) {
	return x;
}
haxe.Int32.add = function(a,b) {
	return a + b;
}
haxe.Int32.sub = function(a,b) {
	return a - b;
}
haxe.Int32.mul = function(a,b) {
	return a * b;
}
haxe.Int32.div = function(a,b) {
	return Std["int"](a / b);
}
haxe.Int32.mod = function(a,b) {
	return a % b;
}
haxe.Int32.shl = function(a,b) {
	return a << b;
}
haxe.Int32.shr = function(a,b) {
	return a >> b;
}
haxe.Int32.ushr = function(a,b) {
	return a >>> b;
}
haxe.Int32.and = function(a,b) {
	return a & b;
}
haxe.Int32.or = function(a,b) {
	return a | b;
}
haxe.Int32.xor = function(a,b) {
	return a ^ b;
}
haxe.Int32.neg = function(a) {
	return -a;
}
haxe.Int32.complement = function(a) {
	return ~a;
}
haxe.Int32.compare = function(a,b) {
	return a - b;
}
haxe.Int32.prototype.__class__ = haxe.Int32;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
alphaSynth.VoiceAllocator = function(voices) { if( voices === $_ ) return; {
	this._releasedVoices = new Array().concat(voices);
	this._triggeredVoices = new Array();
	this._delayedNoteOffMessages = new Array();
	this._messageQueue = new Array();
	this._tracker = new alphaSynth.NoteTracker();
}}
alphaSynth.VoiceAllocator.__name__ = ["alphaSynth","VoiceAllocator"];
alphaSynth.VoiceAllocator.prototype._triggeredVoices = null;
alphaSynth.VoiceAllocator.prototype._releasedVoices = null;
alphaSynth.VoiceAllocator.prototype._delayedNoteOffMessages = null;
alphaSynth.VoiceAllocator.prototype._messageQueue = null;
alphaSynth.VoiceAllocator.prototype._substainEnabled = null;
alphaSynth.VoiceAllocator.prototype._tracker = null;
alphaSynth.VoiceAllocator.prototype.allocate = function(message) {
	this._messageQueue.push(message);
	this.processMessages();
}
alphaSynth.VoiceAllocator.prototype.processMessages = function() {
	while(this._messageQueue.length > 0) {
		this.processMessage(this._messageQueue.shift());
	}
}
alphaSynth.VoiceAllocator.prototype.processMessage = function(message) {
	if(message.getCommand() == 144) {
		if(message.getData2() > 0) {
			this.processNoteOnMessage(message);
		}
		else {
			this.processNoteOffMessage(message);
		}
	}
	else if(message.getCommand() == 128) {
		this.processNoteOffMessage(message);
	}
}
alphaSynth.VoiceAllocator.prototype.processNoteOffMessage = function(message) {
	var velocity = message.getData2();
	velocity /= 127;
	if(this._substainEnabled) {
		this._delayedNoteOffMessages.push(message);
	}
	else {
		this._tracker.noteOff(message);
		var index = -1;
		{
			var _g1 = 0, _g = this._triggeredVoices.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(this._triggeredVoices[i].getCurrentNote() == message.getData1()) {
					index = i;
					break;
				}
			}
		}
		if(index >= 0) {
			var voice = this._triggeredVoices[index];
			voice.release(velocity);
			this._triggeredVoices.remove(this._triggeredVoices[index]);
			this._releasedVoices.push(voice);
		}
	}
}
alphaSynth.VoiceAllocator.prototype.processNoteOnMessage = function(message) {
	var velocity = message.getData2();
	velocity /= 127;
	if(this._releasedVoices.length > 0) {
		var voice = this._releasedVoices[0];
		this._releasedVoices.remove(this._releasedVoices[0]);
		voice.trigger(this._tracker.getLastNote(),message.getData1(),velocity);
		this._triggeredVoices.push(voice);
	}
	else if(this._triggeredVoices.length > 0) {
		var voice = this._triggeredVoices[0];
		this._triggeredVoices.remove(this._triggeredVoices[0]);
		voice.trigger(this._tracker.getLastNote(),message.getData1(),velocity);
		this._triggeredVoices.push(voice);
	}
	this._tracker.noteOn(message);
}
alphaSynth.VoiceAllocator.prototype.setSubstainEnabled = function(substainEnabled) {
	if(substainEnabled == this._substainEnabled) return;
	this._substainEnabled = substainEnabled;
	if(!this._substainEnabled) {
		{
			var _g = 0, _g1 = this._delayedNoteOffMessages;
			while(_g < _g1.length) {
				var noteOffMessage = _g1[_g];
				++_g;
				this._messageQueue.push(noteOffMessage);
			}
		}
		this._delayedNoteOffMessages = new Array();
		this.processMessages();
	}
}
alphaSynth.VoiceAllocator.prototype.allSoundOff = function() {
	this._messageQueue = new Array();
	this._tracker.clear();
	this._delayedNoteOffMessages = new Array();
	{
		var _g = 0, _g1 = this._triggeredVoices;
		while(_g < _g1.length) {
			var voice = _g1[_g];
			++_g;
			this._releasedVoices.push(voice);
		}
	}
	this._triggeredVoices = new Array();
}
alphaSynth.VoiceAllocator.prototype.__class__ = alphaSynth.VoiceAllocator;
if(!alphaSynth.ecomponent) alphaSynth.ecomponent = {}
alphaSynth.ecomponent.EffectComponent = function(sampleRate,buffer) { if( sampleRate === $_ ) return; {
	alphaSynth.Component.call(this,sampleRate);
	this._buffer = buffer;
}}
alphaSynth.ecomponent.EffectComponent.__name__ = ["alphaSynth","ecomponent","EffectComponent"];
alphaSynth.ecomponent.EffectComponent.__super__ = alphaSynth.Component;
for(var k in alphaSynth.Component.prototype ) alphaSynth.ecomponent.EffectComponent.prototype[k] = alphaSynth.Component.prototype[k];
alphaSynth.ecomponent.EffectComponent.prototype._buffer = null;
alphaSynth.ecomponent.EffectComponent.prototype.getBuffer = function() {
	return this._buffer;
}
alphaSynth.ecomponent.EffectComponent.prototype.process = function() {
	throw "abstract method not implemented";
}
alphaSynth.ecomponent.EffectComponent.prototype.reset = function() {
	throw "abstract method not implemented";
}
alphaSynth.ecomponent.EffectComponent.prototype.__class__ = alphaSynth.ecomponent.EffectComponent;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) {
		r++;
	}
	if(r > 0) return s.substr(r,l - r);
	else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) {
		r++;
	}
	if(r > 0) {
		return s.substr(0,l - r);
	}
	else {
		return s;
	}
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			s += c.substr(0,l - sl);
			sl = l;
		}
		else {
			s += c;
			sl += cl;
		}
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			ns += c.substr(0,l - sl);
			sl = l;
		}
		else {
			ns += c;
			sl += cl;
		}
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
alphaSynth.SynthEvent = function(time,message) { if( time === $_ ) return; {
	this._time = time;
	this._message = message;
}}
alphaSynth.SynthEvent.__name__ = ["alphaSynth","SynthEvent"];
alphaSynth.SynthEvent.compare = function(a,b) {
	if(a.getTime() > b.getTime()) return 1;
	if(a.getTime() < b.getTime()) return -1;
	return 0;
}
alphaSynth.SynthEvent.prototype._time = null;
alphaSynth.SynthEvent.prototype._message = null;
alphaSynth.SynthEvent.prototype.getTime = function() {
	return this._time;
}
alphaSynth.SynthEvent.prototype.getMessage = function() {
	return this._message;
}
alphaSynth.SynthEvent.prototype.__class__ = alphaSynth.SynthEvent;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
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
	}(this));
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
alphaSynth.scomponent.SynthComponent.NoteCount = 128;
alphaSynth.scomponent.SynthComponent.NotesPerOctave = 12;
alphaSynth.scomponent.SynthComponent.A440NoteNumber = 69;
alphaSynth.scomponent.SynthComponent.A440Frequency = 440;
alphaSynth.scomponent.SynthComponent.MiddleCNoteNumber = 60;
alphaSynth.scomponent.SynthComponent.ParameterScaler = 127;
alphaSynth.midi.MidiFileProperties.FILE_MAGIC = "MThd";
alphaSynth.PitchBender.CENTER = 8192;
alphaSynth.PitchBender.RANGE_MAX_VALUE = 12.0;
alphaSynth.SampleRate.DEFAULT_RATE = 44100;
alphaSynth.Synthesizer.DEFAULT_BUFFER_SIZE = 2048;
alphaSynth.midi.TrackReader.TRACK_MAGIC = "MTrk";
alphaSynth.TypeUtils.SHORT_MAX = 32767;
alphaSynth.TypeUtils.SHORT_MIN = -32768;
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
alphaSynth.wave.FastBase64._chars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
alphaSynth.midi.MetaMessage.META = 255;
alphaSynth.midi.ShortMessage.DATA_MAX_VALUE = 127;
alphaSynth.midi.ShortMessage.SYSTEM_RESET = 255;
alphaSynth.midi.ShortMessage.NOTE_OFF = 128;
alphaSynth.midi.ShortMessage.NOTE_ON = 144;
alphaSynth.midi.ShortMessage.CONTROL_CHANGE = 176;
alphaSynth.midi.ShortMessage.PROGRAM_CHANGE = 192;
alphaSynth.midi.ShortMessage.PITCH_BEND = 224;
alphaSynth.midi.ShortMessage.HOLD_PEDAL1 = 64;
alphaSynth.midi.ShortMessage.ALL_SOUND_OFF = 120;
alphaSynth.midi.EndOfTrackMessage.END_OF_TRACK = 47;
js.Lib.onerror = null;
alphaSynth.Main.main()