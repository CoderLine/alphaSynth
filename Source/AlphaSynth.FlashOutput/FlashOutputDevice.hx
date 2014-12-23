import flash.events.SampleDataEvent;
import flash.external.ExternalInterface;
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.Lib;
import flash.utils.Endian;

class FlashOutputDevice
{
    private static inline var BufferSize = 8192;
    private static inline var BufferCount = 10;

    private static var Instance:FlashOutputDevice;
    public static function main() : Void
    {
        Instance = new FlashOutputDevice(
            Lib.current.loaderInfo.parameters.id,
            Std.parseInt(Lib.current.loaderInfo.parameters.sampleRate)
        );
    }
    
    private var _id:String;
    private var _sampleRate:Int;
    private var _latency:Float;
    
    private var _sound:Sound;
    private var _soundChannel:SoundChannel;
    
    private var _circularBuffer:CircularSampleBuffer;
    
    private var _position:Int;
    private var _finished:Bool;
    private var _bufferTime:Int;
    
    public function new(id:String, sampleRate:Int)
    {
        _id = id;
        logDebug('Initializing Flash Output');
        
        _sampleRate = sampleRate;
        _latency = (BufferSize * 1000) / (2 * sampleRate);
        
        _finished = false;
        _bufferTime = 0;
        _circularBuffer = new CircularSampleBuffer(BufferSize * BufferCount);
        _sound = new Sound();
        _sound.addEventListener(SampleDataEvent.SAMPLE_DATA, generateSound);

        ExternalInterface.addCallback("AlphaSynthSequencerFinished", sequencerFinished); 
        ExternalInterface.addCallback("AlphaSynthAddSamples", addSamples);         
        ExternalInterface.addCallback("AlphaSynthPlay", play);         
        ExternalInterface.addCallback("AlphaSynthPause", pause);         
        ExternalInterface.addCallback("AlphaSynthStop", stop);         
        ExternalInterface.addCallback("AlphaSynthSeek", seek);  

        readyChanged(true);
        
        logDebug('Flash Output initialized');
    }
    
    // API for JavaScript    
    private function sequencerFinished()
    {
        _finished = true;
    }
    
    private function addSamples(b64:String)
    {
        var decoded = haxe.crypto.Base64.decode(b64);
        var bytes = decoded.getData();
        bytes.endian = Endian.LITTLE_ENDIAN;
        var sampleArray = cast(decoded.getData(), SampleArray);
        _circularBuffer.write(sampleArray, 0, sampleArray.length);
    }
    
    private function play()
    {
        logDebug('FlashOutput: Play');
        try 
        {
            sampleRequest();
            _finished = false;
            if(_position == 0)
            {
                _bufferTime = 0;
            }
            _soundChannel = _sound.play(_position);
        }
        catch(e:Dynamic)
        {
            logError('FlashOutput: Play Error: ' + Std.string(e));
        }
        return true;
    }
    
    private function pause()
    {
        logDebug('FlashOutput: Pause');
        try 
        {
            if(_soundChannel != null) 
            {
                _position = Std.int(_soundChannel.position);
                _soundChannel.stop();
                _soundChannel = null;
            }
        }
        catch(e:Dynamic)
        {
            logError('FlashOutput: Pause Error: ' + Std.string(e));
        }            
    }
    
    private function stop()
    {
        logDebug('FlashOutput: Stop');
        try
        {
            _position = 0;
            _finished = true;
            _circularBuffer.clear();
            if(_soundChannel != null)
            {
                _soundChannel.stop();
                _soundChannel = null;
            }
        }
        catch(e:Dynamic)
        {
            logError('FlashOutput: Stop Error: ' + Std.string(e));
        }            
    }
    
    private function seek(position:Int)
    {
        logDebug('FlashOutput: Seek - ' + position);
       _position = position;
    }
    
    // API to JavaScript
    private function sampleRequest()
    {
       // if we fall under the half of buffers
        // we request one half
        var count = (BufferCount / 2) * BufferSize;
        if (_circularBuffer.count < count)
        {
            for (i in 0 ... Std.int(BufferCount/2))
            {
                ExternalInterface.call("AlphaSynth.Main.AlphaSynthFlashOutput.OnSampleRequest", _id);
            }
        }
    }
    
    private function finished()
    {
        ExternalInterface.call("AlphaSynth.Main.AlphaSynthFlashOutput.OnFinished", _id);
    }
    
    private function positionChanged(position:Int)
    {
        ExternalInterface.call("AlphaSynth.Main.AlphaSynthFlashOutput.OnPositionChanged", _id, position);   
    }
    
    private function readyChanged(isReady:Bool)
    {
        ExternalInterface.call("AlphaSynth.Main.AlphaSynthFlashOutput.OnReadyChanged", _id, isReady);
    }
    
    private function logDebug(msg:String)
    {
        ExternalInterface.call("AlphaSynth.Util.Logger.Debug", msg);
    }
    
    private function logError(msg:String)
    {
        ExternalInterface.call("AlphaSynth.Util.Logger.Error", msg);
    }
    
    // play logic
    private function generateSound(e:SampleDataEvent)
    {
        try 
        {
            if (_circularBuffer.count < BufferSize)
            {
                if (_finished)
                {
                    finished();
                    stop();
                }
                else
                {
                    for (i in 0 ... BufferSize)
                    {
                        e.data.writeFloat(0);
                    }
                    _bufferTime += Std.int((BufferSize * 1000) / (2 * _sampleRate));
                }
            }
            else
            {
                var buffer = new SampleArray(BufferSize);
                _circularBuffer.read(buffer, 0, buffer.length);
                
                var raw = buffer.toData();
                raw.position = 0;
                
                for (i in 0 ... BufferSize)
                {
                    e.data.writeFloat(raw.readFloat());
                }
            }
            
            if (_soundChannel != null && _soundChannel.position != 0)
            {
                positionChanged(Std.int(_soundChannel.position - _bufferTime));
            }
            
            if (!_finished)
            {
                sampleRequest();
            }
        }
        catch(e:Dynamic)
        {   
            var stack = haxe.CallStack.toString(haxe.CallStack.exceptionStack());
            logError('FlashOutput: Generate Error: ' + Std.string(e) + '\r\n' + stack);
        }
    }          
}