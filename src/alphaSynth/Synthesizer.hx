package alphaSynth;

import alphaSynth.buffer.StereoBuffer;
import alphaSynth.buffer.ISynthesizerGlobalBuffer;
import alphaSynth.ecomponent.EffectComponent;
import alphaSynth.midi.MidiMessage;
import alphaSynth.midi.ShortMessage;

/**
 * The main synthesizer wrapping all data and operations for 
 * synthesizing a midi sequence to wave samples 
 */
class Synthesizer extends StatusReporter
{
	/**
	 * The default size of the sample buffer
	 */
	public static inline var DEFAULT_BUFFER_SIZE:Int = 2048;
	
	private var _channels:Array<Channel>;
	private var _eventQueue:PriorityQueue<SynthEvent>;
	private var _globalBuffer:ISynthesizerGlobalBuffer;
	private var _synthBuffer:StereoBuffer;
	private var _effects:Array<EffectComponent>;
	private var _lastEvent:SynthEvent;
	private var _sampleRate:SampleRate;
	private var _returnBytes:Bool;
	 
	/**	 
	 * Initializes a new instance of the Synthesizer class. 
	 * @param bufferSize the size of the buffer used for synthesizing a block
	 * @param globalBuffer the global buffer to synthesize into
	 * @param sampleRate how many samples per second should get synthesized
	 * @param channelCount how many midi channels should be handled 
	 * @param voiceCount how many voices should be created per midi channel (determines simultanous notes)
	 * @param voiceFactory the factory to use for creating new voices
	 * @param effectFactory a factory which provides the effects which get applied per buffer. 
	 */
	public function new(bufferSize:Int, globalBuffer:ISynthesizerGlobalBuffer = null, sampleRate:Int, 
						channelCount:Int, voiceCount:Int, 
						voiceFactory:Voice.VoiceFactory, effectFactory:EffectFactory)
	{
		super();
		_channels = new Array<Channel>();
		_sampleRate = new SampleRate(sampleRate);
		_eventQueue = new PriorityQueue<SynthEvent>(SynthEvent.compare);
		_synthBuffer = new StereoBuffer(bufferSize);
		_globalBuffer = globalBuffer;
		
		_effects = new Array<EffectComponent>().concat(effectFactory(_sampleRate, _synthBuffer));
		
		for(i in 0 ... channelCount)
		{
			var c:Channel = new Channel(this, voiceFactory, voiceCount, _synthBuffer);
			_channels.push(c);
		}
	}
	
	/**
	 * Gets the globalBuffer used for synthesis.
	 */
	public function getGlobalBuffer() : ISynthesizerGlobalBuffer
	{
		return _globalBuffer;
	}
	
	/**
	 * Sets the globalBuffer used for synthesis.
	 */
	public function setGlobalBuffer(globalBuffer:ISynthesizerGlobalBuffer) : Void
	{
		_globalBuffer = globalBuffer;
	}
	
	/**
	 * Adds a new midi message to the synthesizer.
	 * @param time time in milliseconds of the message
	 * @param message the message to send on the specified time
	 */
	public function processMessage(time:Int, message:MidiMessage)
	{
		var evt:SynthEvent = new SynthEvent(time, message);
		_eventQueue.enqueue(evt);
		if(_lastEvent == null || evt.getTime() > _lastEvent.getTime())
			_lastEvent = evt;
	}
	
	/**
	 * Starts the generation of all samples into the global buffer. 
	 */
	public function generate()
	{
		var eventCount:Int = _eventQueue.size();
		
		// calculate how many samples we will generate 
		var samplesNeededForEvents:Int = microsecondsToSampleCount(_lastEvent.getTime());
		// as the buffer will get filled with empty samples we need to mention those
		var bufferCount:Int = Math.ceil(samplesNeededForEvents / _synthBuffer.getBufferSize());
		var realSampleCount = bufferCount * _synthBuffer.getBufferSize();
		_globalBuffer.setBufferSize(realSampleCount);
		
		// how many samples should get generated till getting the next event
		var samplesToGenerate:Int = 0;
		do
		{
			samplesToGenerate = writeToBuffer(samplesToGenerate);
			
			var processedEvents = eventCount - _eventQueue.size();
			onProgressUpdated("Generating audiodata", processedEvents / eventCount);
			
			// write samples from synthBuffer to global buffer
			_globalBuffer.writeBuffer(_synthBuffer);
		} while(samplesToGenerate > 0 || _eventQueue.size() > 0);
		_globalBuffer.finish();
	}
	
	/**
	 * Converts a millisecond count to the according count of samples 
	 */
	private function microsecondsToSampleCount(microSecond:Int)
	{
		var seconds:Float = microSecond/1000000.0;
		var samples:Int = Std.int(seconds * _sampleRate.getSamplesPerSecond());
		return samples;
	}
	
	/**
	 * Fills the next buffer with samples
	 * @param samplesToGenerate the amount of samples to generate before loading the next event. 
	 */
	private function writeToBuffer(samplesToGenerate:Int) : Int
	{
		var synthEvent:SynthEvent;
		var offset:Int = 0;
		var count:Int = 0;
		
		// will buffer is full
		while(offset < _synthBuffer.getBufferSize())
		{
			if(samplesToGenerate <= 0) // next event?
			{
				// get the next synth event out of the queue
				if(_eventQueue.size() > 0)
				{
					synthEvent = _eventQueue.dequeue();
					
					// determine how many samples we can generate till the next event
					var currentTime:Int = synthEvent.getTime();
					if(_eventQueue.size() > 0)
					{
						var nextTime:Int = _eventQueue.peek().getTime();
						var deltaTime:Int = nextTime - currentTime;
						var deltaSamples = microsecondsToSampleCount(deltaTime);
						count = deltaSamples - offset;	
					}
					else
					{
						count = _synthBuffer.getBufferSize() - offset;
					}				
				}
				else
				{
					synthEvent = null;
					count = _synthBuffer.getBufferSize() - offset;
				}
			}
			else
			{
				// no additional event loading, we need to fill this buffer 
				// using the current state
				synthEvent = null;
				count = samplesToGenerate;				
			}
			
			// process the event if available
			if(synthEvent != null)
			{
				if(Std.is(synthEvent.getMessage(), ShortMessage))
				{
					var msg:ShortMessage = cast(synthEvent.getMessage());
					_channels[msg.getChannel()].dispatch(msg);
				}
			}
			
			// process samples if needed
			if(count > 0)
			{
				// we can only fill the buffer, but probably we need more samples till the next
				// event. 
				var sampleCount = Std.int(Math.min(count, _synthBuffer.getBufferSize() - offset));
				// synthesize samples 
				for(channel in _channels)
				{
					channel.generate(offset, sampleCount);
				}
				// mark samples as generated
				offset += sampleCount;
				count -= sampleCount;
				samplesToGenerate = Std.int(Math.max(0, samplesToGenerate - sampleCount));
			}
		}
		
		// apply effects as the buffer is full
		for(effectComponent in _effects)
		{
			effectComponent.process();
		}
		
		// ensure maximum amplitude
		_synthBuffer.modulateAmplitude();
		
		return Std.int(Math.max(0, count));
	}
	
	/**
	 * Gets the current sample of this synthesizer
	 */
	public function getSampleRate() : SampleRate
	{
		return _sampleRate;
	}
}
