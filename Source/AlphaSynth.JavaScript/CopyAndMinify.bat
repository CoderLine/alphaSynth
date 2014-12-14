@ECHO OFF
set ProjectDir=%~1
set SolutionDir=%~2

echo Copying JavaScript
xcopy "%ProjectDir%\res\AlphaSynth.js" "%SolutionDir%\Build\JavaScript" /i /Y
echo Minifying JavaScript
uglifyjs "%SolutionDir%\Build\JavaScript\AlphaSynth.js" -o "%SolutionDir%\Build\JavaScript\AlphaSynth.min.js" -c