package alphaSynth.midi;

import haxe.io.BytesInput;
import alphaSynth.PlatformFactory;

/**
 * A MidiSequence is a set of MidiTracks representing a complete song. 
 */
class MidiSequence extends StatusReporter
{
	private var _tracks:Array<MidiTrack>;
	private var _division:Int;
	
	/**
	 * Initializes a new instance of the MidiTrack Class. 
	 */
	public function new()
	{
		super();
		_tracks = new Array<MidiTrack>();
	}
	
	/**
	 * Gets the list of stored midi tracks. 
	 */
	public function getTracks() : Array<MidiTrack>
	{
		return _tracks;
	}
	
	/**
	 * Gets the track at the specified index. 
	 */
	public function get(index:Int) : MidiTrack
	{
		return _tracks[index];
	}
	
	/**
	 * Gets the division of the midi sequence. 
	 */
	public function getDivision() : Int
	{
		return _division;
	}
	
	/**
	 * Sets the division of the midi sequence. 
	 */
	public function setDivision(division:Int)
	{
		_division = division;
	}
	
	/**
	 * Creates a new midi track and adds it to the sequence.
	 * @return the created midi track. 
	 */
	public function createTrack() : MidiTrack
	{
		var track:MidiTrack = new MidiTrack();
		_tracks.push(track);
		return track;
	}
	
	/**
	 * Removes the specified MidiTrack from the sequence
	 */
	public function removeTrack(track:MidiTrack) : Void
	{
		_tracks.remove(track);
	} 
	
	/**
	 * Gets the lenght of the MidiSequence in midi ticks.
	 * @return the last tick of the longest track within the midi sequence. 
	 */
	public function getTickLength()
	{
		var maxLength:Int = 0;
		for(midiTrack in _tracks)
		{
			var trackLength:Int = midiTrack.getTickLength();
			if(trackLength > maxLength)
			{
				maxLength = trackLength;
			}
		}
		return maxLength;
	}
	
	/**
	 * Loads the sequence data provided by the specified stream.
	 * @param stream the stream to read the data from. 
	 */
	public function load(stream:BinaryReader)
	{
		_tracks = new Array<MidiTrack>();
		
		// create data readers
		var properties:MidiFileProperties = new MidiFileProperties();
		var reader:TrackReader = new TrackReader(this);
		
		// read meta data
		onProgressUpdated("Loading Midi Sequence", 0);
		properties.read(stream);
		setDivision(properties.getDivision());
		// read tracks
		for(i in 0 ... properties.getTrackCount())
		{
			reader.read(stream);
			var trackProgress:Float = i / properties.getTrackCount();
			onProgressUpdated("Loading Midi Sequence", trackProgress);
		}
		onProgressUpdated("Loading Midi Sequence", 1);
	}
	
	/**
	 * Loads a sequence from the specified url using the current file loader.
	 * @param method the load method to use (depends on the current target platform)
	 * @param url the url to load the sequence from
	 * @param progressListener the listener to notify on progress updates
	 * @param success the function to call after successful loading
	 */
	public static function loadSequence(method:String, url:String, success:MidiSequence->Void, progressListener:SynthesizerStatus->Void = null) : Void
	{
		// get the current file loader
		var loader:FileLoader = PlatformFactory.getFileLoader();
		// start loading
		loader.loadBinary(method, url, 
			// success
			function(data:BinaryReader) : Void
			{
				var sequence:MidiSequence = new MidiSequence();
				if(progressListener != null)
					sequence.addProgressUpdatedHandler(progressListener);
				sequence.load(data);
				success(sequence);	
			},
			// error 
			function (err:String) : Void
			{
				throw err;
			}
		);
	}
}
