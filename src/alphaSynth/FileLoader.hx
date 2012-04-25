package alphaSynth;

/**
 * This is the interface which file loaders need to implement for providing files on different plattforms. 
 */
interface FileLoader 
{
	/**
	 * Tells the loader to start loading the specified file.
	 * @param method the method of loading (i.e. HTTP methods, file, remote etc.) 
	 * @param file the url to the file to load 
	 * @param success the method which will get called on successful loading
	 * @param error the method called on any error 
	 */
	function loadBinary(method:String, file:String, success:BinaryReader->Void, error:String->Void) : Void;	
}