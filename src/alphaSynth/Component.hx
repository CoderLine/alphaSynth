package alphaSynth;

/**
 * The base class for all components within the synthesizer. 
 */
class Component 
{
	private var _sampleRate:SampleRate;
	
	/**
	 * Initializes a new instance of the Component class. 
	 * @param sampleRate the sampleRate to determine the samples per second
	 */
	private function new(sampleRate:SampleRate)
	{
		_sampleRate = sampleRate;
	}
	
	/**
	 * Gets the amount of samples to process per second. 
	 */
	private function getSamplesPerSecond() : Int
	{
		return _sampleRate.getSamplesPerSecond();
	}
}
