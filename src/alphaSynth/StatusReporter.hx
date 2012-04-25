package alphaSynth;

/**
 * The base class for classes providing their working progress
 */
class StatusReporter 
{
	private var _progressUpdated:Array<SynthesizerStatus->Void>;
	
	/**
	 * Initializes a new instance of the MidiToWaveConverter class. 
	 */
	private function new()
	{
		_progressUpdated = new Array<SynthesizerStatus->Void>();
	}
	
	/**
	 * Raises the progressUpdated event.
	 * @param status the status message
	 * @param progress the percentage of progress. 
	 * @param data a metadata object
	 */
	private function onProgressUpdated(status:String, progress:Float, data:Dynamic = null)
	{
		onProgressUpdated2(new SynthesizerStatus(status, progress, data));
	}
	/**
	 * Raises the progressUpdated event.
	 * @param status the status message
	 * @param progress the percentage of progress. 
	 * @param data a metadata object
	 */
	private function onProgressUpdated2(status:SynthesizerStatus)
	{
		for(handler in _progressUpdated)
		{
			handler(status);
		}
	}
	
	/**
	 * Adds a new handler which will get notified on synthesizer updates. 
	 */
	public function addProgressUpdatedHandler(handler:SynthesizerStatus->Void)
	{
		if(handler == null) return;
		_progressUpdated.push(handler);
	}
	
	/**
	 * Removes a new handler which will get notified on synthesizer updates. 
	 */
	public function removeProgressUpdatedHandler(handler:SynthesizerStatus->Void)
	{
		_progressUpdated.remove(handler);
	}
}
