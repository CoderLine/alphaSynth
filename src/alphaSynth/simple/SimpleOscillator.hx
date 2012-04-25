package alphaSynth.simple;

import alphaSynth.buffer.StereoBuffer;

import alphaSynth.scomponent.SynthComponent;
import alphaSynth.scomponent.StereoSynthComponent;
import alphaSynth.scomponent.IBendable;

class SimpleOscillator extends StereoSynthComponent, 
					implements IBendable
{
	private var _panning:Float;
	private var _waveType:WaveformType;
	private var _currentNote:Int;
	private var _accumulator:Float;
	private var _pitchBendModulation:Float;
	private var _playing:Bool;
	private var _synthesizeReplaceEnabled:Bool;
	
	public function new(sampleRate:SampleRate, buffer:StereoBuffer)
	{
		super(sampleRate, buffer);
		_panning = 0.5;
		_waveType = WaveformType.Sawtooth;
		_accumulator = 0;
		_pitchBendModulation = 0;
		_playing = false;
		_synthesizeReplaceEnabled = true;
		initialize();
	}

	public function getWaveType() : WaveformType
	{
		return _waveType;
	}
	
	public function setWaveType(waveType:WaveformType) : Void
	{
		_waveType = waveType;
	}
	
	private function initialize()
	{
		_currentNote = SynthComponent.A440NoteNumber;
	}
	
	public override function generate(offset:Int, count:Int) : Void
	{
		var buffer:Array<IBuffer<Float>> = getBuffer();
		
		var output:Float = 0;
		var modNote:Float = _currentNote + SynthComponent.NotesPerOctave * _pitchBendModulation;
		
		if(modNote < 0)
		{
			modNote = 0;	
		}
		else if(modNote > SynthComponent.NoteCount - 1)
		{
			modNote = SynthComponent.NoteCount - 1;
		}
		
		var increment:Float = PowerOfTwoTable.getPower((modNote - SynthComponent.A440NoteNumber) / SynthComponent.NotesPerOctave) * SynthComponent.A440Frequency / getSamplesPerSecond();
		var endIndex:Int = offset + count;
		for(i in offset ... endIndex)
		{
			switch(_waveType)
			{
				case WaveformType.Sawtooth:
					output = 1 - 2 * _accumulator;
				case WaveformType.Square:
					if(_accumulator < 0.5)
					{
						output = -1;
					}
					else
					{
						output = 1;
					}
				case WaveformType.Triangle:
					if(_accumulator < 0.5)
					{
						output = 1 - 4 * _accumulator;
					}
					else
					{
						output = 1 - 4 * (1 - _accumulator);
					}
			}
			
			if(_synthesizeReplaceEnabled)
			{
				buffer[0].set(i, output * (1 - _panning));
				buffer[1].set(i, output * _panning);
			}
			else
			{
			    buffer[0].set(i, buffer[0].get(i) + (output * (1 - _panning)));
			    buffer[1].set(i, buffer[1].get(i) + (output * _panning));
			}
			
			_accumulator += increment;
			
			if(_accumulator >= 1)
			{
				_accumulator -= 1;
			}
		}
	}
	
	public override function trigger(previousNote:Int, note:Int, velocity:Float)
	{
		_currentNote = note;
		_playing = true;
	}
	
	public override function release(velocity:Float)
	{
		_playing = false;
	}
	
	public override function getSynthesizeReplaceEnabled() : Bool
	{
		return _synthesizeReplaceEnabled;
	}
	public override function setSynthesizeReplaceEnabled(synthesizeReplaceEnabled:Bool)
	{
		_synthesizeReplaceEnabled = synthesizeReplaceEnabled;
	}
	
	public override function getOrdinal() : Int
	{
		return 1;
	}
	
	public function getPitchBendModulation() : Float
	{
		return _pitchBendModulation;
	}
	
	public function setPitchBendModulation(modulation:Float) : Void
	{
		_pitchBendModulation = modulation;
	}
	
	public function isPlaying() : Bool
	{
		return _playing;
	}
}
