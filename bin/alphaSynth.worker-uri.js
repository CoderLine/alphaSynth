// this web-worker provides the generation of audio samples as float values
importScripts('alphaSynth_workerOptimized.js');

// starts loading the midi sequence
function synthesizeFile(url) {
	// load sequence and delegate to processing after finish
	alphaSynth.midi.MidiSequence.loadSequence("GET", url, synthesizeSequence, updateStatus);
}

// starts the synthesizing of the sequence
function synthesizeSequence(sequence) {
	// process data 
	var dataUri = alphaSynth.MidiToWaveConverter.convertToDataUri(sequence, updateStatus);
	updateStatus(new alphaSynth.SynthesizerStatus("finished", 1, dataUri));
}

// submits the status the listener 
function updateStatus(status) {
	postMessage(status);
}

onmessage = function(event) {
	var url = event.data;
	synthesizeFile(url);
}