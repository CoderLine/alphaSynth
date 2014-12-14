@echo off
echo Starting HTTP Server
start "AlphaSynth Sample HTTP Server" ..\..\Tools\miniweb.exe -r ..\..\
echo Opening Sample
start http://localhost:8000/Samples/JavaScript/index.html