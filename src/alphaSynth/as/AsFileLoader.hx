package alphaSynth.as;

#if flash

import flash.events.Event;
import flash.events.HTTPStatusEvent;
import flash.events.IOErrorEvent;
import flash.events.SecurityErrorEvent;
import flash.net.URLLoader;
import flash.net.URLLoaderDataFormat;
import flash.net.URLRequest;
import flash.net.URLRequestMethod;
import flash.utils.ByteArray;

/**
 * This is a fileloader implementation for ActionScript.
 */
class AsFileLoader implements FileLoader
{
    /**
     * Creates a new instance of the AsFileLoader class. 
     */
    public function new()
    {
    }
    
    /**
     * Tells the file loader to load the specified file
     * @param method the method to use for file loading allowed values depend on the implementation. 
     *               this implementation bypasses thhe method to the ajax request. 
     * @param file the path to the file to load.
     *               this implementation uses this value as url for the ajax request. 
     * @param success this method is called if the file loading process was successful. 
     * @param error this method is called if any error occures during file loading.                             
     */
    public function loadBinary(method:String, file:String, success:BinaryReader->Void, error:String->Void) : Void
    {       
        var loader:URLLoader = new URLLoader();
        loader.dataFormat = URLLoaderDataFormat.BINARY;
        
        var request = new URLRequest(file);
        if (method.toLowerCase() == "get")
        {
            request.method = URLRequestMethod.GET;
        }
        else
        {
            request.method = URLRequestMethod.POST;
        }
        
        
        // add success handler
        loader.addEventListener(Event.COMPLETE, function(ev:Event) {
            
            // decode byte array to string
            var result:ByteArray = cast(loader.data);
            var data = "";
            var i:UInt = 0; 
            while(i < (result.length))
            {
                data += untyped String.fromCharCode(result.readByte());
                i++;
            }
            
            var reader:BinaryReader = new BinaryReader();
            reader.initialize(data);
            success(reader);
        });
        
        // add error handler
        var errorHandler = function(ev:Event) {
            error(Std.string(ev));
        };
        loader.addEventListener(IOErrorEvent.IO_ERROR, errorHandler);
        loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, errorHandler);
        loader.load(new URLRequest(file));
    }
}

#end