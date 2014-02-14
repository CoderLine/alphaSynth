package as.synthesis;

class SynthPosition
{
    public var currentTime:Int;
    public var currentTick:Int;
    public var endTime:Int;
    public var endTick:Int;

    public function new(currentTime:Int=0, currentTick:Int=0, 
                        endTime:Int=0, endTick:Int=0) 
    {
        this.currentTime = currentTime;
        this.currentTick = currentTick;
        this.endTime = endTime;
        this.endTick = endTick;
    }    
}