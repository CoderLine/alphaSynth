if(!alphaSynth.ecomponent) alphaSynth.ecomponent = {};
alphaSynth.ecomponent.EffectComponent = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.Component.prototype ) alphaSynth.ecomponent.EffectComponent.prototype[k] = alphaSynth.Component.prototype[k];
alphaSynth.ecomponent.EffectComponent.prototype._buffer = null;
alphaSynth.ecomponent.EffectComponent.prototype.getBuffer = function() {
	return this._buffer;
};
alphaSynth.ecomponent.EffectComponent.prototype.process = function() {
	throw "abstract method not implemented";
};
alphaSynth.ecomponent.EffectComponent.prototype.reset = function() {
	throw "abstract method not implemented";
};
;
