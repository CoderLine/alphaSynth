package as.util;
import as.util.TypedArrays.Float32Array;

@:native("Uint8Array")
extern class Uint8Array implements ArrayAccess<Int>
{
    public var length(default, null):Int;
    public function new(o:Dynamic):Void;
    
}

@:native("Float32Array")
extern class Float32Array implements ArrayAccess<Float>
{
    public var length(default, null):Int;
    public function new(o:Dynamic):Void;
    public function subarray(begin:Int, end:Int):Float32Array;
    public function set(array:Float32Array, offset:Int):Void;
}