package alphaSynth.midi;
import haxe.io.Bytes;

/**
 * This reader can be used to read midi track data. 
 */
class TrackReader 
{
	/**
	 * The magic number indicating the track start
	 */
	private static inline var TRACK_MAGIC:String = "MTrk";
	
	private var _midiSequence:MidiSequence;
	private var _stream:BinaryReader;
	
	private var _newTrack:MidiTrack;
	private var _trackData:Bytes;
	private var _trackIndex:Int;
	
	/**
	 * Initializes a new instance of the TrackReader class.
	 * @param midiSequence the sequence to get MidiTrack instances from. 
	 */
	public function new(midiSequence:MidiSequence)
	{
		_midiSequence = midiSequence;
	}
	
	/**
	 * Reads a track from the specified stream.
	 * @param stream the stream to read from. 
	 */
	public function read(stream:BinaryReader) : Void
	{
		_stream = stream;
		
		// read the magic number
		var magic:String = stream.readString(4);
		if(magic != TRACK_MAGIC)
		{
			throw "invalid midi file: track not found";
		}
		
		// read the data of this track
		var trackLength = getTrackLength();
		_trackData = readBuffer(trackLength);
		
		// create a track and parse the data
		_newTrack = _midiSequence.createTrack();
		parseTrackData();
	}
	
	/**
	 * Reads the track length from the stream. 
	 */
	private function getTrackLength() : Int
	{
		return _stream.readInt32();
	}
	
	/**
	 * Parses the current track data. 
	 */
	private function parseTrackData()
	{
		// reset the index
		_trackIndex = 0;
		
		var tick:Int = 0;
		var status:Int = 0;
		var endOfTrackFound = false;
		while(!endOfTrack() && !endOfTrackFound)
		{
			var message:MidiMessage = null;
			
			var data1:Int = -1;
			var data2:Int = 0;
			
			tick += readVariableLenghtValue();
			
			// read the status/data1
			var byteValue:Int = readUnsigned();
			if(byteValue >= 0x80)
			{
				status = byteValue;
			}
			else
			{
				data1 = byteValue;
			}
			
			// short message with only one data byte
			if(status >= 0xC0 && status <= 0xDF)
			{
				if(data1 == -1)
				{
					data1 = readUnsigned();
				}
				var sms:ShortMessage = new ShortMessage();
				sms.setShortMessage(status, data1, 0);
				message = sms;
			}
			// short message with two data bytes
			else if(status >= 0x80 && status <= 0xEF)
			{
				if(data1 == -1)
				{
					data1 = readUnsigned();
				}
				data2 = readUnsigned();
				var sms:ShortMessage = new ShortMessage();
				sms.setShortMessage(status, data1, data2);
				message = sms;
			}
			// sysex message
			else if(status == 0xF0 || status == 0xF7)
			{
				var sysexLength = readVariableLenghtValue();
				var sysexData:Bytes = readData(sysexLength);
				// unsupported yet
			}
			// meta message
			else if(status == MetaMessage.META)
			{
				var metaType:Int = readUnsigned();
				var metaLength:Int = readVariableLenghtValue();
				var metaData:Bytes = readData(metaLength);
				
				var mms:MetaMessage = new MetaMessage();
				mms.setMetaMessage(metaType, metaData);
				message = mms;
				if(metaType == EndOfTrackMessage.END_OF_TRACK)
				{
					endOfTrackFound = true;
				}
			}
			if(message != null)
				_newTrack.add(new MidiEvent(message, tick));
		}
	}
	
	/**
	 * Reads the specified amount of bytes from the track data. 
	 * @param count the ammount of bytes to read
	 * @return the read bytes
	 */
	private function readData(count:Int) : Bytes
	{
		// simply copy the bytes and update offset
		var data:Bytes = Bytes.alloc(count);
		data.blit(0, _trackData, _trackIndex, count);
		_trackIndex += count;	
		return data;
	}
	
	/**
	 * Reads an unsigned byte from the track data.
	 */
	private function readUnsigned() : Int
	{
		return _trackData.get(_trackIndex++) & 0xFF;
	}
	
	/**
	 * Gets a value indicating whether the whole trackdata was read. 
	 */
	private function endOfTrack() : Bool
	{
		return _trackIndex >= _trackData.length;
	}
	
	/**
	 * Reads a variable length integer
	 */
	private function readVariableLenghtValue() : Int
	{
		var result:Int = 0;
		var currentByte:Int;
		do
		{
			currentByte = _trackData.get(_trackIndex++);
			result = (result << 7) + (currentByte & 0x7F);
		} while((currentByte & 0x80) != 0);
		
		return result;
	}
	
	/**
	 * Reads a list of bytes from the stream.
	 * @param size the amount of bytes to read
	 * @return the read bytes. 
	 */
	private function readBuffer(size:Int) : Bytes
	{
		var buffer:Bytes = Bytes.alloc(size);
		for(i in 0 ... size)
		{
			buffer.set(i, _stream.readByte());
		}
		return buffer;
	}
	
}
