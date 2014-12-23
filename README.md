# alphaSynth

alphaSynth is web based Midi Synthesizer written in C#. This library can load SoundFont2 and Midi Files and generate the raw audio samples needed for playback. 

For .net target platforms you can use your prefered audio library to play the samples. A sample for NAudio playback is included.

For web platforms alphaSynth uses Web Workers and Web Audio API for playback. For Internet Explorer support alphaSynth uses a flash fallback for playing the audio. 


## License

    Copyright (c) 2014, T3866, PerryCodes, Daniel Kuschny and Contributors, All rights reserved.

    This library is free software; you can redistribute it and/or
    modify it under the terms of the GNU Lesser General Public
    License as published by the Free Software Foundation; either
    version 3.0 of the License, or at your option any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
    Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public
    License along with this library.

alphaSynth is a cleaned up port of the C# Synth Project (https://csharpsynthproject.codeplex.com/) which got optimized for targeting HTML5. 