alphaSynth.Synthesizer = function () { /* ctor */ }#abstract;
;
;
for(var k in alphaSynth.StatusReporter.prototype ) alphaSynth.Synthesizer.prototype[k] = alphaSynth.StatusReporter.prototype[k];
alphaSynth.Synthesizer.DEFAULT_BUFFER_SIZE = 2048;
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
};
alphaSynth.Synthesizer.prototype.setGlobalBuffer = function(globalBuffer) {
	this._globalBuffer = globalBuffer;
};
alphaSynth.Synthesizer.prototype.processMessage = function(time,message) {
	var evt = new alphaSynth.SynthEvent(time,message);
	this._eventQueue.enqueue(evt);
	if(this._lastEvent == null || evt.getTime() > this._lastEvent.getTime()) this._lastEvent = evt;
};
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
};
alphaSynth.Synthesizer.prototype.microsecondsToSampleCount = function(microSecond) {
	var seconds = microSecond / 1000000.0;
	var samples = Std["int"](seconds * this._sampleRate.getSamplesPerSecond());
	return samples;
};
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
};
alphaSynth.Synthesizer.prototype.getSampleRate = function() {
	return this._sampleRate;
};
;
