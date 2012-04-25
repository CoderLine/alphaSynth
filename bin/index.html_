<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>alphaSynth</title>
	<script type="text/javascript" src="jquery.min.js"></script>
	<script type="text/javascript" src="alphaSynth.js"></script>
	<script type="text/javascript" src="audiolib.min.js"></script>
	<script type="text/javascript">
	
	var progressCache = null;
	
	$(document).ready(function() {
		
		$('.alphaSynth').click(function() {
			progressCache = [];
			
			// load sequence and delegate to processing after finish
			alphaSynth.midi.MidiSequence.loadSequence("GET", $(this).attr('rel'), synthesizeSequence, handleStatus);
		});
	});
	
	// starts the synthesizing of the sequence
	function synthesizeSequence(sequence) {
		// process data 
		var samples = alphaSynth.MidiToWaveConverter.convertToSamples(sequence, handleStatus);
		handleStatus(new alphaSynth.SynthesizerStatus("finished", 1, samples));
	}
    
    function handleStatus(status) {
    
		if(status.getStatusText() == "finished") {
			var offset = 0;
			var data = status.getData();
            
			function fillBuffer(stereoBuffer) {
				var index = 0;
				while(index < stereoBuffer.length) {
					stereoBuffer[index++] = data.get(offset++);
					if(offset > data.getLength()) 
						return;
				}
			}
			var preBufferSize = 65536 * 4096;
			var dev = audioLib.AudioDevice(fillBuffer, 2, preBufferSize,48000);
		}
		else {
			if(!progressCache[status.getStatusText()]) {
				var li = $('<li></li>');
				$('#progress').append(li);
				progressCache[status.getStatusText()] = li;
			}
		
			progressCache[status.getStatusText()].html(getStatusString(status));
		}
	}
	
	function getStatusString(status) {
		var percentage = status.getProgress() * 100;
		return "" + percentage + "% - " + status.getStatusText();
	}

	function log(s) {
		$("#log").append("<li>" + new Date().getTime() + " - " + s + "</li>");
	}
	</script>
</head>
<body>
	<button class="alphaSynth" rel="sweet.mid">Play Sweet Home Alabama</button>
	<button class="alphaSynth" rel="wonderwall.mid">Play Wonderwall</button>
	<button class="alphaSynth" rel="fade.mid">Play Fade To Black</button>
	<button class="alphaSynth" rel="canon.mid">Play Canon Rock</button>
	<br />
	<strong>Progress:</strong>
	<ul id="progress"></ul>
	<br />
	<strong>Log:</strong>
	<ul id="log"></ul>
	<br />
</body>
</html>