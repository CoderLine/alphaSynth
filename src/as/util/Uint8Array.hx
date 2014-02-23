package as.util;

@:native("Uint8Array")
extern class Uint8Array implements ArrayAccess<Int>
{
    public var length(default, null):Int;
    public function new(o:Dynamic):Void;
}