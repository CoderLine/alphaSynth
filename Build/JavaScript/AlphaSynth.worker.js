var alphaSynthWorker = null;
self.onmessage = function(e) {
    var data = e.data;
    if(data.cmd == 'init') {
        importScripts(data.root + 'AlphaSynth.js');
        alphaSynthWorker = new AlphaSynth.Main.AlphaSynthWebWorkerApi(self);
    }
};