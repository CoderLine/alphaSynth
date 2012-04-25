package alphaSynth.simple;

import alphaSynth.buffer.StereoBuffer;

class SimpleVoice extends Voice
{
	private var _osc:SimpleOscillator;
	
	public function new(sampleRate:SampleRate, buffer:StereoBuffer)
	{
		super(sampleRate, buffer);
		initialize(sampleRate, buffer);
	}
	
	private override function isPlaying() : Bool
	{
		return _osc.isPlaying();
	}
	
	private function initialize(sampleRate:SampleRate, buffer:StereoBuffer)
	{
		_osc = new SimpleOscillator(sampleRate, buffer);
		_osc.setWaveType(WaveformType.Triangle);
		
		addComponent(_osc);
		addBendable(_osc);
	}
	
	public override function getSynthesizeReplaceEnabled() : Bool
	{
		return _osc.getSynthesizeReplaceEnabled();
	}
	
	public override function setSynthesizeReplaceEnabled(synthesizeReplaceEnabled:Bool) : Void
	{
		_osc.setSynthesizeReplaceEnabled(synthesizeReplaceEnabled);
	}
}
