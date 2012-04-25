package alphaSynth.scomponent;

/**
 * A SynthComponent implementing this interface can accept controller messages
 */
interface IControllable 
{
	/**
	 * Called if a controller message occured. 
	 */
	public function processControllerMessage(type:Int, value:Float) : Void;
}
