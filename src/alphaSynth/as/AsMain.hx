package alphaSynth.as;
#if flash 

import alphaSynth.midi.MidiSequence;

import flash.external.ExternalInterface;
import flash.text.TextField;
import flash.text.TextFormat;
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.events.SampleDataEvent;


/**
 * A Main class for actionscript
 */
class AsMain 
{
	private static var progressCache:Hash<Float>;
	
	private static var txt:TextField;
	private static var samples:IBuffer<Float>;
    private static var sound:Sound;
	private static var channel:SoundChannel;
	
    /**
     * The application main entry point
     */
    public static function main() 
    {
    	txt = new TextField();
    	txt.width = 400;
    	txt.height = 400;
    	txt.text = "Status";
    	flash.Lib.current.addChild(txt);
    	
    	var format:TextFormat = new TextFormat();
    	format.font = "Arial";
    	format.size = 14; 
    	format.color = 0x000000;
    	txt.defaultTextFormat = format;
    	
        ExternalInterface.addCallback('load', load);
        ExternalInterface.addCallback('play', play);
    }
    
    public static function load(s:String)
    {
    	try {
        	progressCache = new Hash<Float>();
            // load sequence and delegate to processing after finish
            alphaSynth.midi.MidiSequence.loadSequence("GET", s, synthesizeSequence, handleStatus);
    	}
    	catch(e:Dynamic) {
    		txt.text = Std.string(e);
    	}
    }
    
    public static function synthesizeSequence(sequence:MidiSequence)
    {
    	// process data 
        samples = alphaSynth.MidiToWaveConverter.convertToSamples(sequence, handleStatus);
        sound = new Sound(); 
        sound.addEventListener(
            SampleDataEvent.SAMPLE_DATA,
            soundGenerator
        );
        play();
    } 
    
    public static function play() 
    {
    	handleStatus(new SynthesizerStatus("Start playing", 0));
    	channel = sound.play();
    }
    
    public static function stop()
    {
    	channel.stop();
    }
    
    public static function handleStatus(status:SynthesizerStatus)
    {
    	progressCache.set(status.getStatusText(), status.getProgress() * 100);
    	
    	var buf:StringBuf = new StringBuf();
    	for(key in progressCache.keys()) 
    	{
    		buf.add(key + "-" + Std.string(progressCache.get(key)));
    		buf.add("\n");
    	}
    	txt.text = buf.toString();
    }
    
    public static function soundGenerator(event:SampleDataEvent) : Void {
    	handleStatus(new SynthesizerStatus("Writing sound data", 0));
        for(i in 0 ... samples.getLength()) 
        {
        	handleStatus(new SynthesizerStatus("Writing sound data", i / samples.getLength()));
            event.data.writeFloat(samples.get(i));	
        }
        handleStatus(new SynthesizerStatus("Writing sound data", 1));
    }
}

#end