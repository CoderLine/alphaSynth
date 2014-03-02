package as.util;

import haxe.io.Bytes;

class UrlLoader
{
    public var url:String;
    public var method:String;
    
    public function new()
    {
    }
    
    #if flash
    public function load()
    {
        var loader = new flash.net.URLLoader();
        loader.addEventListener( flash.events.Event.COMPLETE, function(e) 
        {
            var data:flash.utils.ByteArray = loader.data;
            fireComplete(Bytes.ofData(data));
        });
        loader.addEventListener( flash.events.ProgressEvent.PROGRESS, function(e:flash.events.ProgressEvent) 
        {
            fireProgress(Std.int(e.bytesLoaded), Std.int(e.bytesTotal));
        });
        loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
        
        var request = new flash.net.URLRequest( url );
        request.method = method;
        loader.load(request);
    }
    #elseif js
    public function load()
    {
        var request = new js.html.XMLHttpRequest();
        request.open(method, url, true);
        request.responseType = "arraybuffer";
        request.onload = function(e) {
            var buffer = request.response;
            if (buffer) 
            {
                fireComplete(Bytes.ofData(untyped new as.util.TypedArrays.Uint8Array(buffer)));
            }
        };
        request.onprogress = function(e) {
            fireProgress(e.loaded, e.total);
        };
        request.send(null);
    }
    #else
    #error Unsupported platform
    #end
    
    public var progress:Int->Int->Void;
    private inline function fireProgress(loaded:Int, full:Int) 
    {
        if (progress != null) progress(loaded, full);
    }
        
    public var complete:Bytes->Void;
    private inline function fireComplete(data:Bytes) 
    {
        if (complete != null) complete(data);
    }
}