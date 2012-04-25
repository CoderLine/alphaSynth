package alphaSynth;

/**
 * This class stores the sample rate and provides an event
 * as the samplerate changes
 */
class SampleRate 
{
	/**
	 * The default sample rate. 
	 */
	public static inline var DEFAULT_RATE = 44100;
	
	private var _samplesPerSecond:Int;
	
	/**
	 * Initializes a new instance of the SampleRate class.
	 * @param samplesPerSecond how many samples per seconds to use. 
	 */
	public function new(samplesPerSecond:Int = DEFAULT_RATE)
	{
		_sampleRateChanged = new Array<Void->Void>();
		setSamplesPerSecond(samplesPerSecond);
	}
	
	/**
	 * Gets the samples per second. 
	 */
	public function getSamplesPerSecond() : Int
	{
		return _samplesPerSecond;
	}

	/**
	 * Sets the samples per seconds. 
	 */
	public function setSamplesPerSecond(samplesPerSecond:Int) : Void
	{
		_samplesPerSecond = samplesPerSecond;
		onSampleRateChanged();
	}
	
	// raised as the sample rate gets changed. 
	private var _sampleRateChanged:Array<Void->Void>;
	
	/**
	 * Raises sampleRateChanged event. 
	 */
	private function onSampleRateChanged()
	{
		for(handler in _sampleRateChanged)
		{
			handler();
		}
	}
	
	/**
	 * Add a handler which get notified as the sample rate has changed. 
	 */
	public function addSampleRateChangedHandler(handler:Void->Void)
	{
		_sampleRateChanged.push(handler);
	}
	
	/**
	 * Remove a handler which get notified as the sample rate has changed. 
	 */
	public function removeSampleRateChangedHandler(handler:Void->Void)
	{
		_sampleRateChanged.remove(handler);
	}
}
