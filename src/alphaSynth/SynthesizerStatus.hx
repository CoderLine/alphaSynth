package alphaSynth;

/**
 * This is an object storing the information about the status 
 * of synthesizing progress.
 */
class SynthesizerStatus 
{
	private var _statusText:String;
	private var _progress:Float;
	private var _data:Dynamic;
	
	/**
	 * Initializes a new instance of the SynthesizerStatus class.
	 * @param status the status text
	 * @param progress the percentage of the progress
	 * @param data the metadata object
	 */
	public function new(status:String, progress:Float, data:Dynamic = null)
	{
		_statusText = status;
		_progress = progress;
		_data = data;
	}
	
	/**
	 * Gets the status message of this status.
	 */
	public function getStatusText() : String
	{
		return _statusText;
	}
	
	/**
	 * Gets the percentage of the progress. 
	 */
	public function getProgress() : Float
	{
		return _progress;
	}
	
	/**
	 * Gets the metadata object stored within this status. 
	 */
	public function getData() : Dynamic
	{
		return _data;
	}
}
