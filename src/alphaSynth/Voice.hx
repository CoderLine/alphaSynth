package alphaSynth;

import alphaSynth.buffer.StereoBuffer;

import alphaSynth.scomponent.IBendable;
import alphaSynth.scomponent.IControllable;
import alphaSynth.scomponent.SynthComponent;
import alphaSynth.scomponent.StereoSynthComponent;

/**
 * Implementations of this factory provides Voice implementations. 
 */
typedef VoiceFactory = SampleRate->StereoBuffer->Voice;

/**
 * A voice is an entity which is responsible for synthesizing one single played note within the synthesizer. 
 * It uses a directed acyclic graph in which SynthComponents represent a single node to
 * perform the synthesis. 
 */
class Voice extends StereoSynthComponent,
			implements IBendable,
			implements IControllable
{
	private var _currentNote:Int;
	
	private var _components:Array<SynthComponent>;
	private var _bendables:Array<IBendable>;
	private var _controllables:Array<IControllable>;
	
	private var _pitchBendModulation:Float;
	private var _mainBuffer:StereoBuffer;
	
	/**
	 * Initializes a new instance of the StereoSynthComponent class
	 * @param sampleRate the sample rate to determine the samples per second. 
	 * @param buffer the buffer to synthesize in
	 */
	private function new(sampleRate:SampleRate, buffer:StereoBuffer)
	{
		super(sampleRate, buffer);
		
		_currentNote = 69;
		_mainBuffer = buffer;
		
		_components = new Array<SynthComponent>();
		_bendables = new Array<IBendable>();
		_controllables = new Array<IControllable>();

		buffer.addBufferSizeChangedHandler(handleBufferSizeChanged);
	}
	
	/**
	 * Gets the current played note of this voice. 
	 */
	public function getCurrentNote()
	{
		return _currentNote;
	}
	
	/**
	 * Gets the ordinal value within the graph. 
	 */
	public override function getOrdinal() : Int
	{
		return 1;
	}
	
	/**
	 * Gets the current pitch bend applied to this voice. 
	 */
	public function getPitchBendModulation()
	{
		return _pitchBendModulation;
	}
	
	/**
	 * Sets the current pitch bend applied to this voice. 
	 */
	public function setPitchBendModulation(modulation:Float)
	{
		_pitchBendModulation = modulation;
		for(bendable in _bendables)
		{
			bendable.setPitchBendModulation(getPitchBendModulation());
		}
	}
	
	/**
	 * Synthesizes the SynthComponents's output into its buffer using
	 * the specified offset and count values to determine where
	 * in the buffer the ouput is placed.
	 * @param offset the zero-based index offset into the SynthComponent's buffer
	 * in which to begin synthesizing output
	 * @param count the number of samples to synthesize
	 */
	public override function generate(offset:Int, sampleCount:Int) : Void
	{
		if(!isPlaying()) 
			return;
		for(component in _components)
		{
			component.generate(offset, sampleCount);
		}
	}
	
	/**
	 * Triggeres the SynthComponent with the specified note.
	 * @param previousNotte the note that was previously played
	 * @param note the note that is triggering the synthcomponent
	 * @param velocity the velocity with which the note was played. 
	 */
	public override function trigger(previousNote:Int, note:Int, velocity:Float) : Void
	{
		_currentNote = note;
		for(component in _components)
		{
			component.trigger(previousNote, note, velocity);
		}
	}
	
	/**	
	 * Releases the currently triggered note.
	 * @param velocity The velocity with which the note was released.
	 */
	public override function release(velocity:Float) : Void
	{
		for(component in _components)
		{
			component.release(velocity);
		}
	}
	
	/**
	 * Called if a controller message occured. 
	 */
	public function processControllerMessage(controllerType:Int, value:Float) : Void
	{
		for(controllable in _controllables)
		{
			controllable.processControllerMessage(controllerType, value);
		}
	}
	
	/**
	 * Gets a value indicating whether this voice is currently playing. 
	 */
	private function isPlaying() : Bool
	{
		throw "abstract method not implemented";
		return false;
	}
	
	/**
	 * Adds a new SynthComponent to the synthesizer graph. 
	 */
	private function addComponent(component:SynthComponent) : Void
	{
		component.addOrdinalChangedHandler(handleOrdinalChanged);
		_components.push(component);
		_components.sort(SynthComponent.comparer);
		component.setBufferSize(_mainBuffer.getBufferSize());
	}
	
	/**
	 * Removes a new SynthComponent from the synthesizer graph. 
	 */
	private function removeComponent(component:SynthComponent) : Void
	{
		if(Lambda.has(_components, component))
		{
			component.removeOrdinalChangedHandler(handleOrdinalChanged);
			_components.remove(component);
		}
	}
	
	/**
	 * Adds a new component to the voice, which is responsible for handling 
	 * pitch bends. 
	 */
	private function addBendable(bendable:IBendable) : Void
	{
		_bendables.push(bendable);
	}
	
	/**
	 * Adds a new component to the voice, which can accept controller messages. 
	 */
	private function addControllable(controllable:IControllable) : Void
	{
		_controllables.push(controllable);
	}
	
	/**
	 * Updates the component graph as any ordinal value changes.
	 */
	private function handleOrdinalChanged()
	{
		_components.sort(SynthComponent.comparer);
	}
	
	/**
	 * Tells all components to update the buffers according to the new buffer size. 
	 */
	private function handleBufferSizeChanged() : Void
	{
		for(component in _components)
		{
			component.setBufferSize(_mainBuffer.getBufferSize());
		}
	}
	
	
}
