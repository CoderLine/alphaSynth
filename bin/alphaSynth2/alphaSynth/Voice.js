alphaSynth.Voice = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.scomponent.StereoSynthComponent.prototype ) alphaSynth.Voice.prototype[k] = alphaSynth.scomponent.StereoSynthComponent.prototype[k];
alphaSynth.Voice.prototype._currentNote = 0;
alphaSynth.Voice.prototype._components = null;
alphaSynth.Voice.prototype._bendables = null;
alphaSynth.Voice.prototype._controllables = null;
alphaSynth.Voice.prototype._pitchBendModulation = 0.0;
alphaSynth.Voice.prototype._mainBuffer = null;
alphaSynth.Voice.prototype.getCurrentNote = function() {
	return this._currentNote;
};
alphaSynth.Voice.prototype.getOrdinal = function() {
	return 1;
};
alphaSynth.Voice.prototype.getPitchBendModulation = function() {
	return this._pitchBendModulation;
};
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
};
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
};
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
};
alphaSynth.Voice.prototype.release = function(velocity) {
	var _g = 0, _g1 = this._components;
	while(_g < _g1.length) {
		var component = _g1[_g];
		++_g;
		component.release(velocity);
	}
};
alphaSynth.Voice.prototype.processControllerMessage = function(controllerType,value) {
	var _g = 0, _g1 = this._controllables;
	while(_g < _g1.length) {
		var controllable = _g1[_g];
		++_g;
		controllable.processControllerMessage(controllerType,value);
	}
};
alphaSynth.Voice.prototype.isPlaying = function() {
	throw "abstract method not implemented";
	return false;
};
alphaSynth.Voice.prototype.addComponent = function(component) {
	component.addOrdinalChangedHandler($closure(this,"handleOrdinalChanged"));
	this._components.push(component);
	this._components.sort($closure(alphaSynth.scomponent.SynthComponent,"comparer"));
	component.setBufferSize(this._mainBuffer.getBufferSize());
};
alphaSynth.Voice.prototype.removeComponent = function(component) {
	if(Lambda.has(this._components,component)) {
		component.removeOrdinalChangedHandler($closure(this,"handleOrdinalChanged"));
		this._components.remove(component);
	}
};
alphaSynth.Voice.prototype.addBendable = function(bendable) {
	this._bendables.push(bendable);
};
alphaSynth.Voice.prototype.addControllable = function(controllable) {
	this._controllables.push(controllable);
};
alphaSynth.Voice.prototype.handleOrdinalChanged = function() {
	this._components.sort($closure(alphaSynth.scomponent.SynthComponent,"comparer"));
};
alphaSynth.Voice.prototype.handleBufferSizeChanged = function() {
	var _g = 0, _g1 = this._components;
	while(_g < _g1.length) {
		var component = _g1[_g];
		++_g;
		component.setBufferSize(this._mainBuffer.getBufferSize());
	}
};
;
;
