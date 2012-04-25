package alphaSynth.js;

#if js

import haxe.io.Bytes;
import js.XMLHttpRequest;
import alphaSynth.FileLoader;

/**
 * This is a fileloader implementation for JavaScript.
 */
class JsFileLoader implements FileLoader
{
	/**
	 * Creates a new instance of the JsFileLoader class. 
	 */
	public function new()
	{
	}
	
	/**
	 * Tells the file loader to load the specified file
	 * @param method the method to use for file loading allowed values depend on the implementation. 
	 * 				 this implementation bypasses thhe method to the ajax request. 
	 * @param file the path to the file to load.
	 * 				 this implementation uses this value as url for the ajax request. 
     * @param success this method is called if the file loading process was successful. 
     * @param error this method is called if any error occures during file loading.  					 		
	 */
	public function loadBinary(method:String, file:String, success:BinaryReader->Void, error:String->Void) : Void
	{		
		// build jquery ajax options
		var onSuccess = function(data:String)
		{
			// create reader
			var reader:BinaryReader = new BinaryReader();
			reader.initialize(data);
			success(reader);
		}
		var onError = function(x:Dynamic, e:String)
		{
			if(x.status==0){
				error('You are offline!!\n Please Check Your Network.');
			}else if(x.status==404){
				error('Requested URL not found.');
			}else if(x.status==500){
				error('Internel Server Error.');
			}else if(e=='parsererror'){
				error('Error.\nParsing JSON Request failed.');
			}else if(e=='timeout'){
				error('Request Time out.');
			}
		}
		
		var xhr:XMLHttpRequest = new XMLHttpRequest();
	    xhr.open(method, file, true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200)
			{
				onSuccess(xhr.responseText);
			}
			else 
			{
				onError(xhr, xhr.responseText);
			}
		}
		untyped
		{
			if (xhr.overrideMimeType)
			{
				xhr.overrideMimeType('text/plain; charset=x-user-defined');
			}
		}	
		xhr.send(null);
	}
}
#end