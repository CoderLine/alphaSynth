package alphaSynth;

interface IBuffer<T> {
    function get(index:Int) : T;
    function set(index:Int, value:T) : Void;
    function getLength() : Int;
}
