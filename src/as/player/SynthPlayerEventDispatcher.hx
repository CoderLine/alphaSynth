package as.player;

class SynthPlayerEventDispatcher implements ISynthPlayerListener
{
    private var _listeners:Array<ISynthPlayerListener>;
    public function new() 
    {
        _listeners = new Array<ISynthPlayerListener>();
    }
    
    public function onPositionChanged(currentTime:Int, endTime:Int, currentTick:Int, endTick:Int) : Void
    {
        for (l in _listeners) l.onPositionChanged(currentTime, endTime, currentTick, endTick);
    }
    
    public function onPlayerStateChanged(state:SynthPlayerState) : Void
    {
        for (l in _listeners) l.onPlayerStateChanged(state);
    }
    
    public function onFinished() : Void
    {
        for (l in _listeners) l.onFinished();
    }
    
    public function onSoundFontLoad(loaded:Int, full:Int) : Void
    {
        for (l in _listeners) l.onSoundFontLoad(loaded, full);
    }
    
    public function onSoundFontLoaded() : Void
    {
        for (l in _listeners) l.onSoundFontLoaded();
    }
    
    public function onSoundFontLoadFailed() : Void
    {
        for (l in _listeners) l.onSoundFontLoadFailed();
    }
    
    public function onMidiLoad(loaded:Int, full:Int) : Void
    {
        for (l in _listeners) l.onMidiLoad(loaded, full);
    }
    
    public function onMidiLoaded() : Void
    {
        for (l in _listeners) l.onMidiLoaded();
    }
    
    public function onMidiLoadFailed() : Void
    {
        for (l in _listeners) l.onMidiLoadFailed();
    }
    
    public function onReadyForPlay() : Void
    {
        for (l in _listeners) l.onReadyForPlay();
    }
    
    public function add(listener:ISynthPlayerListener)
    {
        _listeners.push(listener);
    }
}