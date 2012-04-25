package alphaSynth.scomponent;

/**
 * A SynthComponent implementing this interface can accept the modulation
 * resulting of PitchBend messages
 */
interface IBendable 
{
	/**
	 * Gets the current PitchBendModulation
	 */
	public function getPitchBendModulation() : Float;
	
	/**
	 * Sets the current PitchBendModulation.
	 */
	public function setPitchBendModulation(modulation:Float) : Void;
}
