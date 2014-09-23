(function() {
	'use strict';
	var $asm = {};
	global.AlphaSynth = global.AlphaSynth || {};
	global.AlphaSynth.Bank = global.AlphaSynth.Bank || {};
	global.AlphaSynth.Bank.Components = global.AlphaSynth.Bank.Components || {};
	global.AlphaSynth.Bank.Components.Generators = global.AlphaSynth.Bank.Components.Generators || {};
	global.AlphaSynth.Bank.Descriptors = global.AlphaSynth.Bank.Descriptors || {};
	global.AlphaSynth.Bank.Patch = global.AlphaSynth.Bank.Patch || {};
	global.AlphaSynth.Ds = global.AlphaSynth.Ds || {};
	global.AlphaSynth.IO = global.AlphaSynth.IO || {};
	global.AlphaSynth.Main = global.AlphaSynth.Main || {};
	global.AlphaSynth.Midi = global.AlphaSynth.Midi || {};
	global.AlphaSynth.Midi.Event = global.AlphaSynth.Midi.Event || {};
	global.AlphaSynth.Platform = global.AlphaSynth.Platform || {};
	global.AlphaSynth.Player = global.AlphaSynth.Player || {};
	global.AlphaSynth.Sequencer = global.AlphaSynth.Sequencer || {};
	global.AlphaSynth.Sf2 = global.AlphaSynth.Sf2 || {};
	global.AlphaSynth.Sf2.Chunks = global.AlphaSynth.Sf2.Chunks || {};
	global.AlphaSynth.Synthesis = global.AlphaSynth.Synthesis || {};
	global.AlphaSynth.Util = global.AlphaSynth.Util || {};
	ss.initAssembly($asm, 'AlphaSynth');
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.AssetManager
	var $AlphaSynth_Bank_AssetManager = function() {
		this.patchAssets = null;
		this.sampleAssets = null;
		this.patchAssets = [];
		this.sampleAssets = [];
	};
	$AlphaSynth_Bank_AssetManager.__typeName = 'AlphaSynth.Bank.AssetManager';
	global.AlphaSynth.Bank.AssetManager = $AlphaSynth_Bank_AssetManager;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.PatchAsset
	var $AlphaSynth_Bank_PatchAsset = function(name, patch) {
		this.name = null;
		this.patch = null;
		this.name = name;
		this.patch = patch;
	};
	$AlphaSynth_Bank_PatchAsset.__typeName = 'AlphaSynth.Bank.PatchAsset';
	global.AlphaSynth.Bank.PatchAsset = $AlphaSynth_Bank_PatchAsset;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.PatchBank
	var $AlphaSynth_Bank_PatchBank = function() {
		this.$_bank = null;
		this.$_assets = null;
		this.name = null;
		this.comments = null;
		this.reset();
	};
	$AlphaSynth_Bank_PatchBank.__typeName = 'AlphaSynth.Bank.PatchBank';
	global.AlphaSynth.Bank.PatchBank = $AlphaSynth_Bank_PatchBank;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.SampleDataAsset
	var $AlphaSynth_Bank_SampleDataAsset = function(sample, sampleData) {
		this.name = null;
		this.channels = 0;
		this.sampleRate = 0;
		this.rootKey = 0;
		this.tune = 0;
		this.start = 0;
		this.end = 0;
		this.loopStart = 0;
		this.loopEnd = 0;
		this.sampleData = null;
		this.channels = 1;
		this.name = sample.name;
		this.sampleRate = sample.sampleRate;
		this.rootKey = sample.rootKey;
		this.tune = sample.tune;
		this.start = sample.start;
		this.end = sample.end;
		this.loopStart = sample.startLoop;
		this.loopEnd = sample.endLoop;
		this.sampleData = $AlphaSynth_Util_PcmData.create(sampleData.bitsPerSample, sampleData.sampleData, true);
	};
	$AlphaSynth_Bank_SampleDataAsset.__typeName = 'AlphaSynth.Bank.SampleDataAsset';
	global.AlphaSynth.Bank.SampleDataAsset = $AlphaSynth_Bank_SampleDataAsset;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Envelope
	var $AlphaSynth_Bank_Components_Envelope = function() {
		this.$_stages = null;
		this.$_index = 0;
		this.$_stage = null;
		this.$1$ValueField = 0;
		this.$1$CurrentStageField = 0;
		this.$1$DepthField = 0;
		this.set_value(0);
		this.set_depth(0);
		this.$_stages = new Array(7);
		for (var x = 0; x < this.$_stages.length; x++) {
			this.$_stages[x] = new $AlphaSynth_Bank_Components_EnvelopeStage();
			this.$_stages[x].graph = $AlphaSynth_Util_Tables.envelopeTables(0);
		}
		this.$_stages[3].reverse = true;
		this.$_stages[5].reverse = true;
		this.$_stages[6].time = 100000000;
		this.set_currentStage(0);
		this.$_stage = this.$_stages[this.get_currentStage()];
	};
	$AlphaSynth_Bank_Components_Envelope.__typeName = 'AlphaSynth.Bank.Components.Envelope';
	global.AlphaSynth.Bank.Components.Envelope = $AlphaSynth_Bank_Components_Envelope;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.EnvelopeStage
	var $AlphaSynth_Bank_Components_EnvelopeStage = function() {
		this.time = 0;
		this.graph = null;
		this.scale = 0;
		this.offset = 0;
		this.reverse = false;
		this.time = 0;
		this.graph = null;
		this.scale = 0;
		this.offset = 0;
		this.reverse = false;
	};
	$AlphaSynth_Bank_Components_EnvelopeStage.__typeName = 'AlphaSynth.Bank.Components.EnvelopeStage';
	global.AlphaSynth.Bank.Components.EnvelopeStage = $AlphaSynth_Bank_Components_EnvelopeStage;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.EnvelopeState
	var $AlphaSynth_Bank_Components_EnvelopeState = function() {
	};
	$AlphaSynth_Bank_Components_EnvelopeState.__typeName = 'AlphaSynth.Bank.Components.EnvelopeState';
	global.AlphaSynth.Bank.Components.EnvelopeState = $AlphaSynth_Bank_Components_EnvelopeState;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Filter
	var $AlphaSynth_Bank_Components_Filter = function() {
		this.$_a1 = 0;
		this.$_a2 = 0;
		this.$_b1 = 0;
		this.$_b2 = 0;
		this.$_m1 = 0;
		this.$_m2 = 0;
		this.$_m3 = 0;
		this.$_cutOff = 0;
		this.$_resonance = 0;
		this.filterMethod = 0;
		this.$1$CoeffNeedsUpdatingField = false;
		this.$_a1 = 0;
		this.$_a2 = 0;
		this.$_b1 = 0;
		this.$_b2 = 0;
		this.$_m1 = 0;
		this.$_m2 = 0;
		this.$_m3 = 0;
		this.filterMethod = 0;
		this.set_cutOff(0);
		this.set_resonance(0);
	};
	$AlphaSynth_Bank_Components_Filter.__typeName = 'AlphaSynth.Bank.Components.Filter';
	global.AlphaSynth.Bank.Components.Filter = $AlphaSynth_Bank_Components_Filter;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.FilterType
	var $AlphaSynth_Bank_Components_FilterType = function() {
	};
	$AlphaSynth_Bank_Components_FilterType.__typeName = 'AlphaSynth.Bank.Components.FilterType';
	global.AlphaSynth.Bank.Components.FilterType = $AlphaSynth_Bank_Components_FilterType;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Lfo
	var $AlphaSynth_Bank_Components_Lfo = function() {
		this.$_phase = 0;
		this.$_increment = 0;
		this.$_delayTime = 0;
		this.$_generator = null;
		this.$1$FrequencyField = 0;
		this.$1$CurrentStateField = 0;
		this.$1$ValueField = 0;
		this.$1$DepthField = 0;
		this.set_currentState(0);
		this.$_generator = $AlphaSynth_Bank_Components_Generators_DefaultGenerators.defaultSine;
		this.$_delayTime = 0;
		this.$_increment = 0;
		this.$_phase = 0;
		this.set_frequency(0);
		this.set_currentState(0);
		this.set_value(0);
		this.set_depth(0);
	};
	$AlphaSynth_Bank_Components_Lfo.__typeName = 'AlphaSynth.Bank.Components.Lfo';
	global.AlphaSynth.Bank.Components.Lfo = $AlphaSynth_Bank_Components_Lfo;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.LfoState
	var $AlphaSynth_Bank_Components_LfoState = function() {
	};
	$AlphaSynth_Bank_Components_LfoState.__typeName = 'AlphaSynth.Bank.Components.LfoState';
	global.AlphaSynth.Bank.Components.LfoState = $AlphaSynth_Bank_Components_LfoState;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.PanComponent
	var $AlphaSynth_Bank_Components_PanComponent = function() {
		this.left = 0;
		this.right = 0;
	};
	$AlphaSynth_Bank_Components_PanComponent.__typeName = 'AlphaSynth.Bank.Components.PanComponent';
	global.AlphaSynth.Bank.Components.PanComponent = $AlphaSynth_Bank_Components_PanComponent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.PanFormulaEnum
	var $AlphaSynth_Bank_Components_PanFormulaEnum = function() {
	};
	$AlphaSynth_Bank_Components_PanFormulaEnum.__typeName = 'AlphaSynth.Bank.Components.PanFormulaEnum';
	global.AlphaSynth.Bank.Components.PanFormulaEnum = $AlphaSynth_Bank_Components_PanFormulaEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.DefaultGenerators
	var $AlphaSynth_Bank_Components_Generators_DefaultGenerators = function() {
	};
	$AlphaSynth_Bank_Components_Generators_DefaultGenerators.__typeName = 'AlphaSynth.Bank.Components.Generators.DefaultGenerators';
	global.AlphaSynth.Bank.Components.Generators.DefaultGenerators = $AlphaSynth_Bank_Components_Generators_DefaultGenerators;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.Generator
	var $AlphaSynth_Bank_Components_Generators_Generator = function(description) {
		this.loopMode = 0;
		this.loopStartPhase = 0;
		this.loopEndPhase = 0;
		this.startPhase = 0;
		this.endPhase = 0;
		this.offset = 0;
		this.period = 0;
		this.frequency = 0;
		this.rootKey = 0;
		this.keyTrack = 0;
		this.velocityTrack = 0;
		this.tune = 0;
		this.loopMode = description.loopMethod;
		this.loopStartPhase = description.loopStartPhase;
		this.loopEndPhase = description.loopEndPhase;
		this.startPhase = description.startPhase;
		this.endPhase = description.endPhase;
		this.offset = description.offset;
		this.period = description.period;
		this.frequency = 0;
		this.rootKey = description.rootKey;
		this.keyTrack = description.keyTrack;
		this.velocityTrack = description.velTrack;
		this.tune = description.tune;
	};
	$AlphaSynth_Bank_Components_Generators_Generator.__typeName = 'AlphaSynth.Bank.Components.Generators.Generator';
	global.AlphaSynth.Bank.Components.Generators.Generator = $AlphaSynth_Bank_Components_Generators_Generator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.GeneratorParameters
	var $AlphaSynth_Bank_Components_Generators_GeneratorParameters = function() {
		this.phase = 0;
		this.currentStart = 0;
		this.currentEnd = 0;
		this.currentState = 0;
		this.phase = 0;
		this.currentStart = 0;
		this.currentEnd = 0;
		this.currentState = 0;
	};
	$AlphaSynth_Bank_Components_Generators_GeneratorParameters.__typeName = 'AlphaSynth.Bank.Components.Generators.GeneratorParameters';
	global.AlphaSynth.Bank.Components.Generators.GeneratorParameters = $AlphaSynth_Bank_Components_Generators_GeneratorParameters;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.GeneratorState
	var $AlphaSynth_Bank_Components_Generators_GeneratorState = function() {
	};
	$AlphaSynth_Bank_Components_Generators_GeneratorState.__typeName = 'AlphaSynth.Bank.Components.Generators.GeneratorState';
	global.AlphaSynth.Bank.Components.Generators.GeneratorState = $AlphaSynth_Bank_Components_Generators_GeneratorState;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.Interpolation
	var $AlphaSynth_Bank_Components_Generators_Interpolation = function() {
	};
	$AlphaSynth_Bank_Components_Generators_Interpolation.__typeName = 'AlphaSynth.Bank.Components.Generators.Interpolation';
	global.AlphaSynth.Bank.Components.Generators.Interpolation = $AlphaSynth_Bank_Components_Generators_Interpolation;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.LoopMode
	var $AlphaSynth_Bank_Components_Generators_LoopMode = function() {
	};
	$AlphaSynth_Bank_Components_Generators_LoopMode.__typeName = 'AlphaSynth.Bank.Components.Generators.LoopMode';
	global.AlphaSynth.Bank.Components.Generators.LoopMode = $AlphaSynth_Bank_Components_Generators_LoopMode;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.SampleGenerator
	var $AlphaSynth_Bank_Components_Generators_SampleGenerator = function() {
		this.samples = null;
		$AlphaSynth_Bank_Components_Generators_Generator.call(this, new $AlphaSynth_Bank_Descriptors_GeneratorDescriptor());
	};
	$AlphaSynth_Bank_Components_Generators_SampleGenerator.__typeName = 'AlphaSynth.Bank.Components.Generators.SampleGenerator';
	global.AlphaSynth.Bank.Components.Generators.SampleGenerator = $AlphaSynth_Bank_Components_Generators_SampleGenerator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.SawGenerator
	var $AlphaSynth_Bank_Components_Generators_SawGenerator = function(description) {
		$AlphaSynth_Bank_Components_Generators_Generator.call(this, description);
		if (this.endPhase < 0) {
			this.endPhase = 1;
		}
		if (this.startPhase < 0) {
			this.startPhase = 0;
		}
		if (this.loopEndPhase < 0) {
			this.loopEndPhase = this.endPhase;
		}
		if (this.loopStartPhase < 0) {
			this.loopStartPhase = this.startPhase;
		}
		if (this.period < 0) {
			this.period = 1;
		}
		if (this.rootKey < 0) {
			this.rootKey = 69;
		}
		this.frequency = 440;
	};
	$AlphaSynth_Bank_Components_Generators_SawGenerator.__typeName = 'AlphaSynth.Bank.Components.Generators.SawGenerator';
	global.AlphaSynth.Bank.Components.Generators.SawGenerator = $AlphaSynth_Bank_Components_Generators_SawGenerator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.SineGenerator
	var $AlphaSynth_Bank_Components_Generators_SineGenerator = function(description) {
		$AlphaSynth_Bank_Components_Generators_Generator.call(this, description);
		if (this.endPhase < 0) {
			this.endPhase = $AlphaSynth_Util_SynthConstants.twoPi;
		}
		if (this.startPhase < 0) {
			this.startPhase = 0;
		}
		if (this.loopEndPhase < 0) {
			this.loopEndPhase = this.endPhase;
		}
		if (this.loopStartPhase < 0) {
			this.loopStartPhase = this.startPhase;
		}
		if (this.period < 0) {
			this.period = $AlphaSynth_Util_SynthConstants.twoPi;
		}
		if (this.rootKey < 0) {
			this.rootKey = 69;
		}
		this.frequency = 440;
	};
	$AlphaSynth_Bank_Components_Generators_SineGenerator.__typeName = 'AlphaSynth.Bank.Components.Generators.SineGenerator';
	global.AlphaSynth.Bank.Components.Generators.SineGenerator = $AlphaSynth_Bank_Components_Generators_SineGenerator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.SquareGenerator
	var $AlphaSynth_Bank_Components_Generators_SquareGenerator = function(description) {
		$AlphaSynth_Bank_Components_Generators_Generator.call(this, description);
		if (this.endPhase < 0) {
			this.endPhase = $AlphaSynth_Util_SynthConstants.twoPi;
		}
		if (this.startPhase < 0) {
			this.startPhase = 0;
		}
		if (this.loopEndPhase < 0) {
			this.loopEndPhase = this.endPhase;
		}
		if (this.loopStartPhase < 0) {
			this.loopStartPhase = this.startPhase;
		}
		if (this.period < 0) {
			this.period = $AlphaSynth_Util_SynthConstants.twoPi;
		}
		if (this.rootKey < 0) {
			this.rootKey = 69;
		}
		this.frequency = 440;
	};
	$AlphaSynth_Bank_Components_Generators_SquareGenerator.__typeName = 'AlphaSynth.Bank.Components.Generators.SquareGenerator';
	global.AlphaSynth.Bank.Components.Generators.SquareGenerator = $AlphaSynth_Bank_Components_Generators_SquareGenerator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.TriangleGenerator
	var $AlphaSynth_Bank_Components_Generators_TriangleGenerator = function(description) {
		$AlphaSynth_Bank_Components_Generators_Generator.call(this, description);
		if (this.endPhase < 0) {
			this.endPhase = 1.25;
		}
		if (this.startPhase < 0) {
			this.startPhase = 0.25;
		}
		if (this.loopEndPhase < 0) {
			this.loopEndPhase = this.endPhase;
		}
		if (this.loopStartPhase < 0) {
			this.loopStartPhase = this.startPhase;
		}
		if (this.period < 0) {
			this.period = 1;
		}
		if (this.rootKey < 0) {
			this.rootKey = 69;
		}
		this.frequency = 440;
	};
	$AlphaSynth_Bank_Components_Generators_TriangleGenerator.__typeName = 'AlphaSynth.Bank.Components.Generators.TriangleGenerator';
	global.AlphaSynth.Bank.Components.Generators.TriangleGenerator = $AlphaSynth_Bank_Components_Generators_TriangleGenerator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Components.Generators.WhiteNoiseGenerator
	var $AlphaSynth_Bank_Components_Generators_WhiteNoiseGenerator = function(description) {
		$AlphaSynth_Bank_Components_Generators_Generator.call(this, description);
		if (this.endPhase < 0) {
			this.endPhase = 1;
		}
		if (this.startPhase < 0) {
			this.startPhase = 0;
		}
		if (this.loopEndPhase < 0) {
			this.loopEndPhase = this.endPhase;
		}
		if (this.loopStartPhase < 0) {
			this.loopStartPhase = this.startPhase;
		}
		if (this.period < 0) {
			this.period = 1;
		}
		if (this.rootKey < 0) {
			this.rootKey = 69;
		}
		this.frequency = 440;
	};
	$AlphaSynth_Bank_Components_Generators_WhiteNoiseGenerator.__typeName = 'AlphaSynth.Bank.Components.Generators.WhiteNoiseGenerator';
	global.AlphaSynth.Bank.Components.Generators.WhiteNoiseGenerator = $AlphaSynth_Bank_Components_Generators_WhiteNoiseGenerator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Descriptors.EnvelopeDescriptor
	var $AlphaSynth_Bank_Descriptors_EnvelopeDescriptor = function() {
		this.delayTime = 0;
		this.attackTime = 0;
		this.attackGraph = 0;
		this.holdTime = 0;
		this.decayTime = 0;
		this.decayGraph = 0;
		this.sustainTime = 0;
		this.releaseTime = 0;
		this.releaseGraph = 0;
		this.sustainLevel = 0;
		this.peakLevel = 0;
		this.startLevel = 0;
		this.depth = 0;
		this.vel2Delay = 0;
		this.vel2Attack = 0;
		this.vel2Hold = 0;
		this.vel2Decay = 0;
		this.vel2Sustain = 0;
		this.vel2Release = 0;
		this.vel2Depth = 0;
		this.delayTime = 0;
		this.attackTime = 0;
		this.attackGraph = 1;
		this.holdTime = 0;
		this.decayTime = 0;
		this.decayGraph = 1;
		this.sustainTime = 3600;
		this.releaseTime = 0;
		this.releaseGraph = 1;
		this.sustainLevel = 0;
		this.peakLevel = 1;
		this.startLevel = 0;
		this.depth = 1;
		this.vel2Delay = 0;
		this.vel2Attack = 0;
		this.vel2Hold = 0;
		this.vel2Decay = 0;
		this.vel2Sustain = 0;
		this.vel2Release = 0;
		this.vel2Depth = 0;
	};
	$AlphaSynth_Bank_Descriptors_EnvelopeDescriptor.__typeName = 'AlphaSynth.Bank.Descriptors.EnvelopeDescriptor';
	global.AlphaSynth.Bank.Descriptors.EnvelopeDescriptor = $AlphaSynth_Bank_Descriptors_EnvelopeDescriptor;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Descriptors.FilterDescriptor
	var $AlphaSynth_Bank_Descriptors_FilterDescriptor = function() {
		this.filterMethod = 0;
		this.cutOff = 0;
		this.resonance = 0;
		this.rootKey = 0;
		this.keyTrack = 0;
		this.velTrack = 0;
		this.filterMethod = 0;
		this.cutOff = -1;
		this.resonance = 1;
		this.rootKey = 60;
		this.keyTrack = 0;
		this.velTrack = 0;
	};
	$AlphaSynth_Bank_Descriptors_FilterDescriptor.__typeName = 'AlphaSynth.Bank.Descriptors.FilterDescriptor';
	global.AlphaSynth.Bank.Descriptors.FilterDescriptor = $AlphaSynth_Bank_Descriptors_FilterDescriptor;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Descriptors.GeneratorDescriptor
	var $AlphaSynth_Bank_Descriptors_GeneratorDescriptor = function() {
		this.loopMethod = 0;
		this.samplerType = 0;
		this.assetName = null;
		this.endPhase = 0;
		this.startPhase = 0;
		this.loopEndPhase = 0;
		this.loopStartPhase = 0;
		this.offset = 0;
		this.period = 0;
		this.rootKey = 0;
		this.keyTrack = 0;
		this.velTrack = 0;
		this.tune = 0;
		this.loopMethod = 0;
		this.samplerType = 0;
		this.assetName = 'null';
		this.endPhase = -1;
		this.startPhase = -1;
		this.loopEndPhase = -1;
		this.loopStartPhase = -1;
		this.offset = 0;
		this.period = -1;
		this.rootKey = -1;
		this.keyTrack = 100;
		this.velTrack = 0;
		this.tune = 0;
	};
	$AlphaSynth_Bank_Descriptors_GeneratorDescriptor.__typeName = 'AlphaSynth.Bank.Descriptors.GeneratorDescriptor';
	global.AlphaSynth.Bank.Descriptors.GeneratorDescriptor = $AlphaSynth_Bank_Descriptors_GeneratorDescriptor;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Descriptors.LfoDescriptor
	var $AlphaSynth_Bank_Descriptors_LfoDescriptor = function() {
		this.$1$DelayTimeField = 0;
		this.$1$FrequencyField = 0;
		this.$1$DepthField = 0;
		this.$1$GeneratorField = null;
		this.set_delayTime(0);
		this.set_frequency($AlphaSynth_Util_SynthConstants.defaultLfoFrequency);
		this.set_depth(1);
		this.set_generator($AlphaSynth_Bank_Components_Generators_DefaultGenerators.defaultSine);
	};
	$AlphaSynth_Bank_Descriptors_LfoDescriptor.__typeName = 'AlphaSynth.Bank.Descriptors.LfoDescriptor';
	global.AlphaSynth.Bank.Descriptors.LfoDescriptor = $AlphaSynth_Bank_Descriptors_LfoDescriptor;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Descriptors.Waveform
	var $AlphaSynth_Bank_Descriptors_Waveform = function() {
	};
	$AlphaSynth_Bank_Descriptors_Waveform.__typeName = 'AlphaSynth.Bank.Descriptors.Waveform';
	global.AlphaSynth.Bank.Descriptors.Waveform = $AlphaSynth_Bank_Descriptors_Waveform;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Patch.IntervalType
	var $AlphaSynth_Bank_Patch_IntervalType = function() {
	};
	$AlphaSynth_Bank_Patch_IntervalType.__typeName = 'AlphaSynth.Bank.Patch.IntervalType';
	global.AlphaSynth.Bank.Patch.IntervalType = $AlphaSynth_Bank_Patch_IntervalType;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Patch.MultiPatch
	var $AlphaSynth_Bank_Patch_MultiPatch = function(name) {
		this.$_intervalType = 0;
		this.$_intervalList = null;
		$AlphaSynth_Bank_Patch_Patch.call(this, name);
		this.$_intervalType = 0;
	};
	$AlphaSynth_Bank_Patch_MultiPatch.__typeName = 'AlphaSynth.Bank.Patch.MultiPatch';
	global.AlphaSynth.Bank.Patch.MultiPatch = $AlphaSynth_Bank_Patch_MultiPatch;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Patch.Patch
	var $AlphaSynth_Bank_Patch_Patch = function(name) {
		this.exclusiveGroupTarget = 0;
		this.exclusiveGroup = 0;
		this.name = null;
		this.name = name;
		this.exclusiveGroup = 0;
		this.exclusiveGroupTarget = 0;
	};
	$AlphaSynth_Bank_Patch_Patch.__typeName = 'AlphaSynth.Bank.Patch.Patch';
	global.AlphaSynth.Bank.Patch.Patch = $AlphaSynth_Bank_Patch_Patch;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Patch.PatchInterval
	var $AlphaSynth_Bank_Patch_PatchInterval = function(patch, startChannel, endChannel, startKey, endKey, startVelocity, endVelocity) {
		this.$1$PatchField = null;
		this.$1$StartChannelField = 0;
		this.$1$StartKeyField = 0;
		this.$1$StartVelocityField = 0;
		this.$1$EndChannelField = 0;
		this.$1$EndKeyField = 0;
		this.$1$EndVelocityField = 0;
		this.set_patch(patch);
		this.set_startChannel(startChannel);
		this.set_endChannel(endChannel);
		this.set_startKey(startKey);
		this.set_endKey(endKey);
		this.set_startVelocity(startVelocity);
		this.set_endVelocity(endVelocity);
	};
	$AlphaSynth_Bank_Patch_PatchInterval.__typeName = 'AlphaSynth.Bank.Patch.PatchInterval';
	global.AlphaSynth.Bank.Patch.PatchInterval = $AlphaSynth_Bank_Patch_PatchInterval;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Bank.Patch.Sf2Patch
	var $AlphaSynth_Bank_Patch_Sf2Patch = function(name) {
		this.$iniFilterFc = 0;
		this.$filterQ = 0;
		this.$initialAttn = 0;
		this.$keyOverride = 0;
		this.$velOverride = 0;
		this.$keynumToModEnvHold = 0;
		this.$keynumToModEnvDecay = 0;
		this.$keynumToVolEnvHold = 0;
		this.$keynumToVolEnvDecay = 0;
		this.$pan = null;
		this.$modLfoToPitch = 0;
		this.$vibLfoToPitch = 0;
		this.$modEnvToPitch = 0;
		this.$modLfoToFilterFc = 0;
		this.$modEnvToFilterFc = 0;
		this.$modLfoToVolume = 0;
		this.$gen = null;
		this.$mod_env = null;
		this.$vel_env = null;
		this.$mod_lfo = null;
		this.$vib_lfo = null;
		this.$fltr = null;
		$AlphaSynth_Bank_Patch_Patch.call(this, name);
	};
	$AlphaSynth_Bank_Patch_Sf2Patch.__typeName = 'AlphaSynth.Bank.Patch.Sf2Patch';
	$AlphaSynth_Bank_Patch_Sf2Patch.$calculateModulator = function(s, t, d, p, value, min, max) {
		var output = 0;
		var i;
		value = value - min;
		max = max - min;
		if (d === 1) {
			value = max - value;
		}
		switch (s) {
			case 0: {
				output = ss.Int32.div(value, max);
				break;
			}
			case 1: {
				i = 127 - value;
				output = -0.208333333333333 * (Math.log(i * i / (max * max)) / Math.log(10));
				break;
			}
			case 2: {
				i = value;
				output = 1 + 0.208333333333333 * (Math.log(i * i / (max * max)) / Math.log(10));
				break;
			}
			case 3: {
				if (value <= ss.Int32.div(max, 2)) {
					output = 0;
				}
				else {
					output = 1;
				}
				break;
			}
		}
		if (p === 1) {
			output = output * 2 - 1;
		}
		if (t === 2) {
			output = Math.abs(output);
		}
		return output;
	};
	global.AlphaSynth.Bank.Patch.Sf2Patch = $AlphaSynth_Bank_Patch_Sf2Patch;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Ds.CircularSampleBuffer
	var $AlphaSynth_Ds_CircularSampleBuffer = function(size) {
		this.$_buffer = null;
		this.$_writePosition = 0;
		this.$_readPosition = 0;
		this.$_sampleCount = 0;
		this.$_buffer = new Float32Array(size);
		this.$_writePosition = 0;
		this.$_readPosition = 0;
		this.$_sampleCount = 0;
	};
	$AlphaSynth_Ds_CircularSampleBuffer.__typeName = 'AlphaSynth.Ds.CircularSampleBuffer';
	global.AlphaSynth.Ds.CircularSampleBuffer = $AlphaSynth_Ds_CircularSampleBuffer;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Ds.LinkedList
	var $AlphaSynth_Ds_LinkedList$1 = function(T) {
		var $type = function() {
			this.first = null;
			this.length = 0;
			this.length = 0;
		};
		ss.registerGenericClassInstance($type, $AlphaSynth_Ds_LinkedList$1, [T], {
			addFirst: function(value) {
				var node = new (ss.makeGenericType($AlphaSynth_Ds_LinkedListNode$1, [T]))();
				node.value = value;
				if (ss.isNullOrUndefined(this.first)) {
					this.$insertNodeToEmptyList(node);
				}
				else {
					this.$insertNodeBefore(this.first, node);
					this.first = node;
				}
			},
			addLast: function(value) {
				var node = new (ss.makeGenericType($AlphaSynth_Ds_LinkedListNode$1, [T]))();
				node.value = value;
				if (ss.isNullOrUndefined(this.first)) {
					this.$insertNodeToEmptyList(node);
				}
				else {
					this.$insertNodeBefore(this.first, node);
				}
			},
			removeFirst: function() {
				if (ss.isNullOrUndefined(this.first)) {
					return null;
				}
				var v = this.first.value;
				this.remove(this.first);
				return v;
			},
			removeLast: function() {
				if (ss.isNullOrUndefined(this.first)) {
					return null;
				}
				var v = (ss.isValue(this.first.$_prev) ? this.first.$_prev.value : null);
				this.remove(this.first.$_prev);
				return v;
			},
			remove: function(n) {
				if (ss.referenceEquals(n.$_next, n)) {
					this.first = null;
				}
				else {
					n.$_next.$_prev = n.$_prev;
					n.$_prev.$_next = n.$_next;
					if (ss.referenceEquals(this.first, n)) {
						this.first = n.$_next;
					}
				}
				n.invalidate();
				this.length--;
			},
			$insertNodeBefore: function(node, newNode) {
				newNode.$_next = node;
				newNode.$_prev = node.$_prev;
				node.$_prev.$_next = newNode;
				node.$_prev = newNode;
				newNode.$_list = this;
				this.length++;
			},
			$insertNodeToEmptyList: function(node) {
				node.$_next = node;
				node.$_prev = node;
				node.$_list = this;
				this.first = node;
				this.length++;
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$AlphaSynth_Ds_LinkedList$1.__typeName = 'AlphaSynth.Ds.LinkedList$1';
	ss.initGenericClass($AlphaSynth_Ds_LinkedList$1, $asm, 1);
	global.AlphaSynth.Ds.LinkedList$1 = $AlphaSynth_Ds_LinkedList$1;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Ds.LinkedListNode
	var $AlphaSynth_Ds_LinkedListNode$1 = function(T) {
		var $type = function() {
			this.$_list = null;
			this.$_next = null;
			this.$_prev = null;
			this.value = null;
		};
		ss.registerGenericClassInstance($type, $AlphaSynth_Ds_LinkedListNode$1, [T], {
			get_next: function() {
				return ((ss.isNullOrUndefined(this.$_next) || ss.referenceEquals(this.$_list.first, this.$_next)) ? null : this.$_next);
			},
			get_prev: function() {
				return ((ss.isNullOrUndefined(this.$_prev) || ss.referenceEquals(this, this.$_list.first)) ? null : this.$_prev);
			},
			invalidate: function() {
				this.$_list = null;
				this.$_next = null;
				this.$_prev = null;
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$AlphaSynth_Ds_LinkedListNode$1.__typeName = 'AlphaSynth.Ds.LinkedListNode$1';
	ss.initGenericClass($AlphaSynth_Ds_LinkedListNode$1, $asm, 1);
	global.AlphaSynth.Ds.LinkedListNode$1 = $AlphaSynth_Ds_LinkedListNode$1;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.IO.ByteBuffer
	var $AlphaSynth_IO_ByteBuffer = function() {
		$AlphaSynth_IO_ByteBuffer.$ctor2.call(this, 0);
	};
	$AlphaSynth_IO_ByteBuffer.__typeName = 'AlphaSynth.IO.ByteBuffer';
	$AlphaSynth_IO_ByteBuffer.$ctor2 = function(capacity) {
		this.$_buffer = null;
		this.$_capacity = 0;
		this.$1$PositionField = 0;
		this.$1$LengthField = 0;
		this.$_buffer = new Uint8Array(capacity);
		this.$_capacity = capacity;
	};
	$AlphaSynth_IO_ByteBuffer.$ctor1 = function(buffer) {
		this.$_buffer = null;
		this.$_capacity = 0;
		this.$1$PositionField = 0;
		this.$1$LengthField = 0;
		this.$_buffer = buffer;
		this.set_length(this.$_capacity = buffer.length);
	};
	global.AlphaSynth.IO.ByteBuffer = $AlphaSynth_IO_ByteBuffer;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.IO.IReadable
	var $AlphaSynth_IO_IReadable = function() {
	};
	$AlphaSynth_IO_IReadable.__typeName = 'AlphaSynth.IO.IReadable';
	global.AlphaSynth.IO.IReadable = $AlphaSynth_IO_IReadable;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.IO.IWriteable
	var $AlphaSynth_IO_IWriteable = function() {
	};
	$AlphaSynth_IO_IWriteable.__typeName = 'AlphaSynth.IO.IWriteable';
	global.AlphaSynth.IO.IWriteable = $AlphaSynth_IO_IWriteable;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Main.IAlphaSynth
	var $AlphaSynth_Main_IAlphaSynth = function() {
	};
	$AlphaSynth_Main_IAlphaSynth.__typeName = 'AlphaSynth.Main.IAlphaSynth';
	global.AlphaSynth.Main.IAlphaSynth = $AlphaSynth_Main_IAlphaSynth;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Main.IAlphaSynthAsync
	var $AlphaSynth_Main_IAlphaSynthAsync = function() {
	};
	$AlphaSynth_Main_IAlphaSynthAsync.__typeName = 'AlphaSynth.Main.IAlphaSynthAsync';
	global.AlphaSynth.Main.IAlphaSynthAsync = $AlphaSynth_Main_IAlphaSynthAsync;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Main.IAlphaSynthSync
	var $AlphaSynth_Main_IAlphaSynthSync = function() {
	};
	$AlphaSynth_Main_IAlphaSynthSync.__typeName = 'AlphaSynth.Main.IAlphaSynthSync';
	global.AlphaSynth.Main.IAlphaSynthSync = $AlphaSynth_Main_IAlphaSynthSync;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.MidiFile
	var $AlphaSynth_Midi_MidiFile = function() {
		this.$1$DivisionField = 0;
		this.$1$TrackFormatField = 0;
		this.$1$TimingStandardField = 0;
		this.$1$TracksField = null;
		this.set_division(0);
		this.set_trackFormat(0);
		this.set_timingStandard(0);
	};
	$AlphaSynth_Midi_MidiFile.__typeName = 'AlphaSynth.Midi.MidiFile';
	$AlphaSynth_Midi_MidiFile.$readMetaMessage = function(input, delta, status) {
		var metaStatus = input.readByte();
		switch (metaStatus) {
			case 0: {
				var count = input.readByte();
				if (count === 0) {
					return new $AlphaSynth_Midi_Event_MetaNumberEvent(delta, status, metaStatus, -1);
				}
				else if (count === 2) {
					return new $AlphaSynth_Midi_Event_MetaNumberEvent(delta, status, metaStatus, $AlphaSynth_Util_IOHelper.readInt16BE(input));
				}
				else {
					throw new ss.Exception('Invalid sequence number event.');
				}
			}
			case 1: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 2: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 3: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 4: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 5: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 6: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 7: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 8: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 9: {
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, $AlphaSynth_Midi_MidiFile.$readString(input));
			}
			case 32: {
				if (input.readByte() !== 1) {
					throw new ss.Exception('Invalid midi channel event. Expected size of 1.');
				}
				return new $AlphaSynth_Midi_Event_MetaEvent(delta, status, metaStatus, input.readByte());
			}
			case 33: {
				if (input.readByte() !== 1) {
					throw new ss.Exception('Invalid midi port event. Expected size of 1.');
				}
				return new $AlphaSynth_Midi_Event_MetaEvent(delta, status, metaStatus, input.readByte());
			}
			case 47: {
				return new $AlphaSynth_Midi_Event_MetaEvent(delta, status, metaStatus, input.readByte());
			}
			case 81: {
				if (input.readByte() !== 3) {
					throw new ss.Exception('Invalid tempo event. Expected size of 3.');
				}
				return new $AlphaSynth_Midi_Event_MetaNumberEvent(delta, status, metaStatus, input.readByte() << 16 | input.readByte() << 8 | input.readByte());
			}
			case 84: {
				if (input.readByte() !== 5) {
					throw new ss.Exception('Invalid smpte event. Expected size of 5.');
				}
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, input.readByte() + ':' + input.readByte() + ':' + input.readByte() + ':' + input.readByte() + ':' + input.readByte());
			}
			case 88: {
				if (input.readByte() !== 4) {
					throw new ss.Exception('Invalid time signature event. Expected size of 4.');
				}
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, input.readByte() + ':' + input.readByte() + ':' + input.readByte() + ':' + input.readByte());
			}
			case 89: {
				if (input.readByte() !== 2) {
					throw new ss.Exception('Invalid key signature event. Expected size of 2.');
				}
				return new $AlphaSynth_Midi_Event_MetaTextEvent(delta, status, metaStatus, input.readByte() + ':' + input.readByte());
			}
			case 127: {
				var length = $AlphaSynth_Midi_MidiFile.$readVariableLength(input);
				var data = $AlphaSynth_Util_IOHelper.readByteArray(input, length);
				return new $AlphaSynth_Midi_Event_MetaDataEvent(delta, status, metaStatus, data);
			}
		}
		throw new ss.Exception('Not a valid meta message Status: ' + status + ' Meta: ' + metaStatus);
	};
	$AlphaSynth_Midi_MidiFile.$readRealTimeMessage = function(input, delta, status) {
		switch (status) {
			case 248: {
				return new $AlphaSynth_Midi_Event_RealTimeEvent(delta, status, 0, 0);
			}
			case 249: {
				return new $AlphaSynth_Midi_Event_RealTimeEvent(delta, status, 0, 0);
			}
			case 250: {
				return new $AlphaSynth_Midi_Event_RealTimeEvent(delta, status, 0, 0);
			}
			case 252: {
				return new $AlphaSynth_Midi_Event_RealTimeEvent(delta, status, 0, 0);
			}
			case 253: {
				return new $AlphaSynth_Midi_Event_RealTimeEvent(delta, status, 0, 0);
			}
			case 254: {
				return new $AlphaSynth_Midi_Event_RealTimeEvent(delta, status, 0, 0);
			}
			case 255: {
				return $AlphaSynth_Midi_MidiFile.$readMetaMessage(input, delta, status);
			}
			default: {
				throw new ss.Exception('The real time message was invalid or unsupported : ' + status);
			}
		}
	};
	$AlphaSynth_Midi_MidiFile.$readSystemCommonMessage = function(input, delta, status) {
		switch (status) {
			case 247:
			case 240: {
				var maker = $AlphaSynth_Util_IOHelper.readInt16BE(input);
				if (maker === 0) {
					maker = $AlphaSynth_Util_IOHelper.readInt16BE(input);
				}
				else if (maker === 247) {
					return null;
				}
				var data = [];
				var b = input.readByte();
				while (b !== 247) {
					data.push(b);
					b = input.readByte();
				}
				return new $AlphaSynth_Midi_Event_SystemExclusiveEvent(delta, status, maker, new Uint8Array(data.slice(0)));
			}
			case 241: {
				return new $AlphaSynth_Midi_Event_SystemCommonEvent(delta, status, input.readByte(), 0);
			}
			case 242: {
				return new $AlphaSynth_Midi_Event_SystemCommonEvent(delta, status, input.readByte(), input.readByte());
			}
			case 243: {
				return new $AlphaSynth_Midi_Event_SystemCommonEvent(delta, status, input.readByte(), 0);
			}
			case 246: {
				return new $AlphaSynth_Midi_Event_SystemCommonEvent(delta, status, 0, 0);
			}
			default: {
				throw new ss.Exception('The system common message was invalid or unsupported : ' + status);
			}
		}
	};
	$AlphaSynth_Midi_MidiFile.$readVoiceMessage = function(input, delta, status, data1) {
		switch (status & 240) {
			case 128: {
				return new $AlphaSynth_Midi_Event_MidiEvent(delta, status, data1, input.readByte());
			}
			case 144: {
				var velocity = input.readByte();
				if (velocity === 0) {
					status = status & 15 | 128;
				}
				return new $AlphaSynth_Midi_Event_MidiEvent(delta, status, data1, velocity);
			}
			case 160: {
				return new $AlphaSynth_Midi_Event_MidiEvent(delta, status, data1, input.readByte());
			}
			case 176: {
				return new $AlphaSynth_Midi_Event_MidiEvent(delta, status, data1, input.readByte());
			}
			case 192: {
				return new $AlphaSynth_Midi_Event_MidiEvent(delta, status, data1, 0);
			}
			case 208: {
				return new $AlphaSynth_Midi_Event_MidiEvent(delta, status, data1, 0);
			}
			case 224: {
				return new $AlphaSynth_Midi_Event_MidiEvent(delta, status, data1, input.readByte());
			}
			default: {
				throw new ss.Exception('The status provided was not that of a voice message.');
			}
		}
	};
	$AlphaSynth_Midi_MidiFile.$trackVoiceStats = function(midiEvent, instList, drumList, channelList, noteOnCount) {
		if (midiEvent.get_command() === 144) {
			var chan = midiEvent.get_channel();
			if (channelList.indexOf(chan) === -1) {
				channelList.push(chan);
			}
			noteOnCount++;
		}
		else if (midiEvent.get_command() === 192) {
			var chan1 = midiEvent.get_channel();
			var prog = midiEvent.get_data1();
			if (chan1 === $AlphaSynth_Midi_MidiHelper.drumChannel) {
				if (drumList.indexOf(prog) === -1) {
					drumList.push(prog);
				}
			}
			else if (instList.indexOf(prog) === -1) {
				instList.push(prog);
			}
		}
		return noteOnCount;
	};
	$AlphaSynth_Midi_MidiFile.$readVariableLength = function(input) {
		var value = 0;
		var next;
		do {
			next = input.readByte();
			value = value << 7;
			value = value | next & 127;
		} while ((next & 128) === 128);
		return value;
	};
	$AlphaSynth_Midi_MidiFile.$readString = function(input) {
		var length = $AlphaSynth_Midi_MidiFile.$readVariableLength(input);
		return $AlphaSynth_Util_IOHelper.read8BitChars(input, length);
		// TODO: check for correct string encoding
	};
	global.AlphaSynth.Midi.MidiFile = $AlphaSynth_Midi_MidiFile;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.MidiHelper
	var $AlphaSynth_Midi_MidiHelper = function() {
	};
	$AlphaSynth_Midi_MidiHelper.__typeName = 'AlphaSynth.Midi.MidiHelper';
	global.AlphaSynth.Midi.MidiHelper = $AlphaSynth_Midi_MidiHelper;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.MidiTimeFormat
	var $AlphaSynth_Midi_MidiTimeFormat = function() {
	};
	$AlphaSynth_Midi_MidiTimeFormat.__typeName = 'AlphaSynth.Midi.MidiTimeFormat';
	global.AlphaSynth.Midi.MidiTimeFormat = $AlphaSynth_Midi_MidiTimeFormat;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.MidiTrack
	var $AlphaSynth_Midi_MidiTrack = function(instPrograms, drumPrograms, activeChannels, midiEvents) {
		this.instruments = null;
		this.drumInstruments = null;
		this.activeChannels = null;
		this.midiEvents = null;
		this.noteOnCount = 0;
		this.endTime = 0;
		this.instruments = instPrograms;
		this.drumInstruments = drumPrograms;
		this.activeChannels = activeChannels;
		this.midiEvents = midiEvents;
		this.noteOnCount = 0;
		this.endTime = 0;
	};
	$AlphaSynth_Midi_MidiTrack.__typeName = 'AlphaSynth.Midi.MidiTrack';
	global.AlphaSynth.Midi.MidiTrack = $AlphaSynth_Midi_MidiTrack;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.MidiTrackFormat
	var $AlphaSynth_Midi_MidiTrackFormat = function() {
	};
	$AlphaSynth_Midi_MidiTrackFormat.__typeName = 'AlphaSynth.Midi.MidiTrackFormat';
	global.AlphaSynth.Midi.MidiTrackFormat = $AlphaSynth_Midi_MidiTrackFormat;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.ControllerTypeEnum
	var $AlphaSynth_Midi_Event_ControllerTypeEnum = function() {
	};
	$AlphaSynth_Midi_Event_ControllerTypeEnum.__typeName = 'AlphaSynth.Midi.Event.ControllerTypeEnum';
	global.AlphaSynth.Midi.Event.ControllerTypeEnum = $AlphaSynth_Midi_Event_ControllerTypeEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.MetaDataEvent
	var $AlphaSynth_Midi_Event_MetaDataEvent = function(delta, status, metaId, data) {
		this.data = null;
		$AlphaSynth_Midi_Event_MetaEvent.call(this, delta, status, metaId, 0);
		this.data = data;
	};
	$AlphaSynth_Midi_Event_MetaDataEvent.__typeName = 'AlphaSynth.Midi.Event.MetaDataEvent';
	global.AlphaSynth.Midi.Event.MetaDataEvent = $AlphaSynth_Midi_Event_MetaDataEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.MetaEvent
	var $AlphaSynth_Midi_Event_MetaEvent = function(delta, status, data1, data2) {
		$AlphaSynth_Midi_Event_MidiEvent.call(this, delta, status, data1, data2);
	};
	$AlphaSynth_Midi_Event_MetaEvent.__typeName = 'AlphaSynth.Midi.Event.MetaEvent';
	global.AlphaSynth.Midi.Event.MetaEvent = $AlphaSynth_Midi_Event_MetaEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.MetaEventTypeEnum
	var $AlphaSynth_Midi_Event_MetaEventTypeEnum = function() {
	};
	$AlphaSynth_Midi_Event_MetaEventTypeEnum.__typeName = 'AlphaSynth.Midi.Event.MetaEventTypeEnum';
	global.AlphaSynth.Midi.Event.MetaEventTypeEnum = $AlphaSynth_Midi_Event_MetaEventTypeEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.MetaNumberEvent
	var $AlphaSynth_Midi_Event_MetaNumberEvent = function(delta, status, metaId, number) {
		this.value = 0;
		$AlphaSynth_Midi_Event_MetaEvent.call(this, delta, status, metaId, 0);
		this.value = number;
	};
	$AlphaSynth_Midi_Event_MetaNumberEvent.__typeName = 'AlphaSynth.Midi.Event.MetaNumberEvent';
	global.AlphaSynth.Midi.Event.MetaNumberEvent = $AlphaSynth_Midi_Event_MetaNumberEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.MetaTextEvent
	var $AlphaSynth_Midi_Event_MetaTextEvent = function(delta, status, metaId, text) {
		this.text = null;
		$AlphaSynth_Midi_Event_MetaEvent.call(this, delta, status, metaId, 0);
		this.text = text;
	};
	$AlphaSynth_Midi_Event_MetaTextEvent.__typeName = 'AlphaSynth.Midi.Event.MetaTextEvent';
	global.AlphaSynth.Midi.Event.MetaTextEvent = $AlphaSynth_Midi_Event_MetaTextEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.MidiEvent
	var $AlphaSynth_Midi_Event_MidiEvent = function(delta, status, data1, data2) {
		this.message = 0;
		this.deltaTime = 0;
		this.deltaTime = delta;
		this.message = status | data1 << 8 | data2 << 16;
	};
	$AlphaSynth_Midi_Event_MidiEvent.__typeName = 'AlphaSynth.Midi.Event.MidiEvent';
	global.AlphaSynth.Midi.Event.MidiEvent = $AlphaSynth_Midi_Event_MidiEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.MidiEventTypeEnum
	var $AlphaSynth_Midi_Event_MidiEventTypeEnum = function() {
	};
	$AlphaSynth_Midi_Event_MidiEventTypeEnum.__typeName = 'AlphaSynth.Midi.Event.MidiEventTypeEnum';
	global.AlphaSynth.Midi.Event.MidiEventTypeEnum = $AlphaSynth_Midi_Event_MidiEventTypeEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.RealTimeEvent
	var $AlphaSynth_Midi_Event_RealTimeEvent = function(delta, status, data1, data2) {
		$AlphaSynth_Midi_Event_MidiEvent.call(this, delta, status, data1, data2);
	};
	$AlphaSynth_Midi_Event_RealTimeEvent.__typeName = 'AlphaSynth.Midi.Event.RealTimeEvent';
	global.AlphaSynth.Midi.Event.RealTimeEvent = $AlphaSynth_Midi_Event_RealTimeEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.RealTimeTypeEnum
	var $AlphaSynth_Midi_Event_RealTimeTypeEnum = function() {
	};
	$AlphaSynth_Midi_Event_RealTimeTypeEnum.__typeName = 'AlphaSynth.Midi.Event.RealTimeTypeEnum';
	global.AlphaSynth.Midi.Event.RealTimeTypeEnum = $AlphaSynth_Midi_Event_RealTimeTypeEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.SystemCommonEvent
	var $AlphaSynth_Midi_Event_SystemCommonEvent = function(delta, status, data1, data2) {
		$AlphaSynth_Midi_Event_MidiEvent.call(this, delta, status, data1, data2);
	};
	$AlphaSynth_Midi_Event_SystemCommonEvent.__typeName = 'AlphaSynth.Midi.Event.SystemCommonEvent';
	global.AlphaSynth.Midi.Event.SystemCommonEvent = $AlphaSynth_Midi_Event_SystemCommonEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.SystemCommonTypeEnum
	var $AlphaSynth_Midi_Event_SystemCommonTypeEnum = function() {
	};
	$AlphaSynth_Midi_Event_SystemCommonTypeEnum.__typeName = 'AlphaSynth.Midi.Event.SystemCommonTypeEnum';
	global.AlphaSynth.Midi.Event.SystemCommonTypeEnum = $AlphaSynth_Midi_Event_SystemCommonTypeEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Midi.Event.SystemExclusiveEvent
	var $AlphaSynth_Midi_Event_SystemExclusiveEvent = function(delta, status, id, data) {
		this.data = null;
		$AlphaSynth_Midi_Event_SystemCommonEvent.call(this, delta, status, id & 255, id >> 8);
		this.data = data;
	};
	$AlphaSynth_Midi_Event_SystemExclusiveEvent.__typeName = 'AlphaSynth.Midi.Event.SystemExclusiveEvent';
	global.AlphaSynth.Midi.Event.SystemExclusiveEvent = $AlphaSynth_Midi_Event_SystemExclusiveEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Platform.Platform
	var $AlphaSynth_Platform_Platform = function() {
	};
	$AlphaSynth_Platform_Platform.__typeName = 'AlphaSynth.Platform.Platform';
	$AlphaSynth_Platform_Platform.createOutput = function() {
		return null;
	};
	global.AlphaSynth.Platform.Platform = $AlphaSynth_Platform_Platform;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Platform.Std
	var $AlphaSynth_Platform_Std = function() {
	};
	$AlphaSynth_Platform_Std.__typeName = 'AlphaSynth.Platform.Std';
	$AlphaSynth_Platform_Std.parseInt = function(s) {
		var f = {};
		if (!ss.Int32.tryParse(s, f)) {
			f.$ = 0;
		}
		return f.$;
	};
	$AlphaSynth_Platform_Std.random = function() {
		return Math.random();
	};
	$AlphaSynth_Platform_Std.arrayCopy = function(T) {
		return function(src, srcOffset, dst, dstOffset, count) {
			for (var i = 0; i < count; i++) {
				dst[dstOffset + i] = src[srcOffset + i];
			}
		};
	};
	$AlphaSynth_Platform_Std.reverse = function(array) {
		var i = 0;
		var j = array.length - 1;
		while (i < j) {
			var t = array[i];
			array[i] = array[j];
			array[j] = t;
			i++;
			j--;
		}
	};
	global.AlphaSynth.Platform.Std = $AlphaSynth_Platform_Std;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Platform.TypeUtils
	var $AlphaSynth_Platform_TypeUtils = function() {
	};
	$AlphaSynth_Platform_TypeUtils.__typeName = 'AlphaSynth.Platform.TypeUtils';
	$AlphaSynth_Platform_TypeUtils.clearIntArray = function(array) {
		for (var i = 0; i < array.length; i++) {
			array[i] = 0;
		}
	};
	$AlphaSynth_Platform_TypeUtils.clearShortArray = function(array) {
		for (var i = 0; i < array.length; i++) {
			array[i] = 0;
		}
	};
	global.AlphaSynth.Platform.TypeUtils = $AlphaSynth_Platform_TypeUtils;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Player.ISynthOutput
	var $AlphaSynth_Player_ISynthOutput = function() {
	};
	$AlphaSynth_Player_ISynthOutput.__typeName = 'AlphaSynth.Player.ISynthOutput';
	global.AlphaSynth.Player.ISynthOutput = $AlphaSynth_Player_ISynthOutput;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Player.ISynthPlayerListener
	var $AlphaSynth_Player_ISynthPlayerListener = function() {
	};
	$AlphaSynth_Player_ISynthPlayerListener.__typeName = 'AlphaSynth.Player.ISynthPlayerListener';
	global.AlphaSynth.Player.ISynthPlayerListener = $AlphaSynth_Player_ISynthPlayerListener;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Player.SynthPlayer
	var $AlphaSynth_Player_SynthPlayer = function() {
		this.$_output = null;
		this.$_synth = null;
		this.$_sequencer = null;
		this.$_events = null;
		this.state = 0;
		this.isSoundFontLoaded = false;
		this.isMidiLoaded = false;
		this.$_tickPosition = 0;
		this.$_timePosition = 0;
		$AlphaSynth_Util_Logger.debug('Initializing player');
		this.$_events = new $AlphaSynth_Player_SynthPlayerEventDispatcher();
		this.state = 0;
		this.$firePlayerStateChanged();
		$AlphaSynth_Util_Logger.debug('Opening output');
		this.$_output = $AlphaSynth_Platform_Platform.createOutput();
		this.$_output.addFinishedListener(ss.mkdel(this, function() {
			// stop everything
			this.stop();
			$AlphaSynth_Util_Logger.debug('Finished playback');
			this.$_events.onFinished();
		}));
		this.$_output.addSampleRequestListener(ss.mkdel(this, function() {
			// synthesize buffer
			this.$_sequencer.fillMidiEventQueue();
			this.$_synth.synthesize();
			// send it to output
			this.$_output.addSamples(this.$_synth.sampleBuffer);
		}));
		this.$_output.addPositionChangedListener(ss.mkdel(this, function(pos) {
			// log position
			this.$firePositionChanged(pos);
		}));
		$AlphaSynth_Util_Logger.debug('Creating synthesizer');
		this.$_synth = new $AlphaSynth_Synthesis_Synthesizer($AlphaSynth_Util_SynthConstants.sampleRate, 2, 441, 3, 100);
		this.$_sequencer = new $AlphaSynth_Sequencer_MidiFileSequencer(this.$_synth);
		this.$_sequencer.addFinishedListener(ss.mkdel(this.$_output, this.$_output.sequencerFinished));
	};
	$AlphaSynth_Player_SynthPlayer.__typeName = 'AlphaSynth.Player.SynthPlayer';
	global.AlphaSynth.Player.SynthPlayer = $AlphaSynth_Player_SynthPlayer;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Player.SynthPlayerEventDispatcher
	var $AlphaSynth_Player_SynthPlayerEventDispatcher = function() {
		this.$_listeners = null;
		this.$_listeners = [];
	};
	$AlphaSynth_Player_SynthPlayerEventDispatcher.__typeName = 'AlphaSynth.Player.SynthPlayerEventDispatcher';
	global.AlphaSynth.Player.SynthPlayerEventDispatcher = $AlphaSynth_Player_SynthPlayerEventDispatcher;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Player.SynthPlayerState
	var $AlphaSynth_Player_SynthPlayerState = function() {
	};
	$AlphaSynth_Player_SynthPlayerState.__typeName = 'AlphaSynth.Player.SynthPlayerState';
	global.AlphaSynth.Player.SynthPlayerState = $AlphaSynth_Player_SynthPlayerState;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sequencer.MidiFileSequencer
	var $AlphaSynth_Sequencer_MidiFileSequencer = function(synth) {
		this.$_synthData = null;
		this.$_tempoChanges = null;
		this.$_finished = null;
		this.$_blockList = null;
		this.$_playbackRate = 0;
		this.$_eventIndex = 0;
		this.$_division = 0;
		this.synth = null;
		this.isPlaying = false;
		this.currentTempo = 0;
		this.currentTime = 0;
		this.endTime = 0;
		this.synth = synth;
		this.$_eventIndex = 0;
		this.$_division = 0;
		this.$_playbackRate = 1;
		this.isPlaying = false;
		this.$_blockList = new Array($AlphaSynth_Util_SynthConstants.defaultChannelCount);
		this.$_finished = [];
		synth.addMidiMessageProcessed(ss.mkdel(this, this.$midiEventProcessed));
	};
	$AlphaSynth_Sequencer_MidiFileSequencer.__typeName = 'AlphaSynth.Sequencer.MidiFileSequencer';
	global.AlphaSynth.Sequencer.MidiFileSequencer = $AlphaSynth_Sequencer_MidiFileSequencer;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sequencer.MidiFileSequencerTempoChange
	var $AlphaSynth_Sequencer_MidiFileSequencerTempoChange = function(bpm, ticks, time) {
		this.$1$BpmField = 0;
		this.$1$TicksField = 0;
		this.$1$TimeField = 0;
		this.set_bpm(bpm);
		this.set_ticks(ticks);
		this.set_time(time);
	};
	$AlphaSynth_Sequencer_MidiFileSequencerTempoChange.__typeName = 'AlphaSynth.Sequencer.MidiFileSequencerTempoChange';
	global.AlphaSynth.Sequencer.MidiFileSequencerTempoChange = $AlphaSynth_Sequencer_MidiFileSequencerTempoChange;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.ControllerSourceEnum
	var $AlphaSynth_Sf2_ControllerSourceEnum = function() {
	};
	$AlphaSynth_Sf2_ControllerSourceEnum.__typeName = 'AlphaSynth.Sf2.ControllerSourceEnum';
	global.AlphaSynth.Sf2.ControllerSourceEnum = $AlphaSynth_Sf2_ControllerSourceEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.DirectionEnum
	var $AlphaSynth_Sf2_DirectionEnum = function() {
	};
	$AlphaSynth_Sf2_DirectionEnum.__typeName = 'AlphaSynth.Sf2.DirectionEnum';
	global.AlphaSynth.Sf2.DirectionEnum = $AlphaSynth_Sf2_DirectionEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Generator
	var $AlphaSynth_Sf2_Generator = function(input) {
		this.$_rawAmount = 0;
		this.generatorType = 0;
		this.generatorType = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
		this.$_rawAmount = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
	};
	$AlphaSynth_Sf2_Generator.__typeName = 'AlphaSynth.Sf2.Generator';
	global.AlphaSynth.Sf2.Generator = $AlphaSynth_Sf2_Generator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.GeneratorEnum
	var $AlphaSynth_Sf2_GeneratorEnum = function() {
	};
	$AlphaSynth_Sf2_GeneratorEnum.__typeName = 'AlphaSynth.Sf2.GeneratorEnum';
	global.AlphaSynth.Sf2.GeneratorEnum = $AlphaSynth_Sf2_GeneratorEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Instrument
	var $AlphaSynth_Sf2_Instrument = function() {
		this.name = null;
		this.zones = null;
	};
	$AlphaSynth_Sf2_Instrument.__typeName = 'AlphaSynth.Sf2.Instrument';
	global.AlphaSynth.Sf2.Instrument = $AlphaSynth_Sf2_Instrument;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Modulator
	var $AlphaSynth_Sf2_Modulator = function(input) {
		this.$_sourceModulationData = null;
		this.$_destinationGenerator = 0;
		this.$_amount = 0;
		this.$_sourceModulationAmount = null;
		this.$_sourceTransform = 0;
		this.$_sourceModulationData = new $AlphaSynth_Sf2_ModulatorType(input);
		this.$_destinationGenerator = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
		this.$_amount = $AlphaSynth_Util_IOHelper.readInt16LE(input);
		this.$_sourceModulationAmount = new $AlphaSynth_Sf2_ModulatorType(input);
		this.$_sourceTransform = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
	};
	$AlphaSynth_Sf2_Modulator.__typeName = 'AlphaSynth.Sf2.Modulator';
	global.AlphaSynth.Sf2.Modulator = $AlphaSynth_Sf2_Modulator;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.ModulatorType
	var $AlphaSynth_Sf2_ModulatorType = function(input) {
		this.$_controllerSource = 0;
		this.$1$PolarityField = 0;
		this.$1$DirectionField = 0;
		this.$1$SourceTypeField = 0;
		this.$1$IsMidiContinuousControllerField = false;
		var raw = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
		this.set_polarity((((raw & 512) === 512) ? 1 : 0));
		this.set_direction((((raw & 256) === 256) ? 1 : 0));
		this.set_isMidiContinuousController((raw & 128) === 128);
		this.set_sourceType((raw & 64512) >> 10);
		this.$_controllerSource = raw & 127 & 65535;
	};
	$AlphaSynth_Sf2_ModulatorType.__typeName = 'AlphaSynth.Sf2.ModulatorType';
	global.AlphaSynth.Sf2.ModulatorType = $AlphaSynth_Sf2_ModulatorType;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.PolarityEnum
	var $AlphaSynth_Sf2_PolarityEnum = function() {
	};
	$AlphaSynth_Sf2_PolarityEnum.__typeName = 'AlphaSynth.Sf2.PolarityEnum';
	global.AlphaSynth.Sf2.PolarityEnum = $AlphaSynth_Sf2_PolarityEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.PresetHeader
	var $AlphaSynth_Sf2_PresetHeader = function() {
		this.name = null;
		this.patchNumber = 0;
		this.bankNumber = 0;
		this.library = 0;
		this.genre = 0;
		this.morphology = 0;
		this.zones = null;
	};
	$AlphaSynth_Sf2_PresetHeader.__typeName = 'AlphaSynth.Sf2.PresetHeader';
	global.AlphaSynth.Sf2.PresetHeader = $AlphaSynth_Sf2_PresetHeader;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.SampleHeader
	var $AlphaSynth_Sf2_SampleHeader = function(input) {
		this.name = null;
		this.start = 0;
		this.end = 0;
		this.startLoop = 0;
		this.endLoop = 0;
		this.sampleRate = 0;
		this.rootKey = 0;
		this.tune = 0;
		this.sampleLink = 0;
		this.soundFontSampleLink = 0;
		this.name = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, 20);
		this.start = $AlphaSynth_Util_IOHelper.readInt32LE(input);
		this.end = $AlphaSynth_Util_IOHelper.readInt32LE(input);
		this.startLoop = $AlphaSynth_Util_IOHelper.readInt32LE(input);
		this.endLoop = $AlphaSynth_Util_IOHelper.readInt32LE(input);
		this.sampleRate = $AlphaSynth_Util_IOHelper.readInt32LE(input);
		this.rootKey = input.readByte();
		var $t1 = input.readByte();
		this.tune = (($t1 & 65535) >> 15) * -65536 + ($t1 & 65535);
		this.sampleLink = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
		this.soundFontSampleLink = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
	};
	$AlphaSynth_Sf2_SampleHeader.__typeName = 'AlphaSynth.Sf2.SampleHeader';
	global.AlphaSynth.Sf2.SampleHeader = $AlphaSynth_Sf2_SampleHeader;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Sf2Region
	var $AlphaSynth_Sf2_Sf2Region = function() {
		this.generators = null;
		this.generators = new Array(61);
	};
	$AlphaSynth_Sf2_Sf2Region.__typeName = 'AlphaSynth.Sf2.Sf2Region';
	global.AlphaSynth.Sf2.Sf2Region = $AlphaSynth_Sf2_Sf2Region;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.SFSampleLink
	var $AlphaSynth_Sf2_SFSampleLink = function() {
	};
	$AlphaSynth_Sf2_SFSampleLink.__typeName = 'AlphaSynth.Sf2.SFSampleLink';
	global.AlphaSynth.Sf2.SFSampleLink = $AlphaSynth_Sf2_SFSampleLink;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.SoundFont
	var $AlphaSynth_Sf2_SoundFont = function() {
		this.info = null;
		this.sampleData = null;
		this.presets = null;
	};
	$AlphaSynth_Sf2_SoundFont.__typeName = 'AlphaSynth.Sf2.SoundFont';
	global.AlphaSynth.Sf2.SoundFont = $AlphaSynth_Sf2_SoundFont;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.SoundFontInfo
	var $AlphaSynth_Sf2_SoundFontInfo = function(input) {
		this.romVersionMajor = 0;
		this.romVersionMinor = 0;
		this.sfVersionMajor = 0;
		this.sfVersionMinor = 0;
		this.soundEngine = null;
		this.bankName = null;
		this.dataRom = null;
		this.creationDate = null;
		this.author = null;
		this.targetProduct = null;
		this.copyright = null;
		this.comments = null;
		this.tools = null;
		this.tools = '';
		this.comments = '';
		this.copyright = '';
		this.targetProduct = '';
		this.author = '';
		this.dataRom = '';
		this.creationDate = '';
		this.bankName = '';
		this.soundEngine = '';
		var id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
		var size = $AlphaSynth_Util_IOHelper.readInt32LE(input);
		if (id.toLowerCase() !== 'list') {
			throw new ss.Exception('Invalid soundfont. Could not find INFO LIST chunk.');
		}
		var readTo = input.get_position() + size;
		id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
		if (id.toLowerCase() !== 'info') {
			throw new ss.Exception('Invalid soundfont. The LIST chunk is not of type INFO.');
		}
		while (input.get_position() < readTo) {
			id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
			size = $AlphaSynth_Util_IOHelper.readInt32LE(input);
			switch (id.toLowerCase()) {
				case 'ifil': {
					this.sfVersionMajor = $AlphaSynth_Util_IOHelper.readInt16LE(input);
					this.sfVersionMinor = $AlphaSynth_Util_IOHelper.readInt16LE(input);
					break;
				}
				case 'isng': {
					this.soundEngine = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				case 'inam': {
					this.bankName = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				case 'irom': {
					this.dataRom = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				case 'iver': {
					this.romVersionMajor = $AlphaSynth_Util_IOHelper.readInt16LE(input);
					this.romVersionMinor = $AlphaSynth_Util_IOHelper.readInt16LE(input);
					break;
				}
				case 'icrd': {
					this.creationDate = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				case 'ieng': {
					this.author = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				case 'iprd': {
					this.targetProduct = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				case 'icop': {
					this.copyright = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				case 'icmt': {
					this.comments = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				case 'isft': {
					this.tools = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, size);
					break;
				}
				default: {
					throw new ss.Exception('Invalid soundfont. The Chunk: ' + id + ' was not expected.');
				}
			}
		}
	};
	$AlphaSynth_Sf2_SoundFontInfo.__typeName = 'AlphaSynth.Sf2.SoundFontInfo';
	global.AlphaSynth.Sf2.SoundFontInfo = $AlphaSynth_Sf2_SoundFontInfo;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.SoundFontPresets
	var $AlphaSynth_Sf2_SoundFontPresets = function(input) {
		this.sampleHeaders = null;
		this.presetHeaders = null;
		this.instruments = null;
		var id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
		var size = $AlphaSynth_Util_IOHelper.readInt32LE(input);
		if (id.toLowerCase() !== 'list') {
			throw new ss.Exception('Invalid soundfont. Could not find pdta LIST chunk.');
		}
		var readTo = input.get_position() + size;
		id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
		if (id.toLowerCase() !== 'pdta') {
			throw new ss.Exception('Invalid soundfont. The LIST chunk is not of type pdta.');
		}
		var presetModulators = null;
		var presetGenerators = null;
		var instrumentModulators = null;
		var instrumentGenerators = null;
		var pbag = null;
		var ibag = null;
		var phdr = null;
		var inst = null;
		while (input.get_position() < readTo) {
			id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
			size = $AlphaSynth_Util_IOHelper.readInt32LE(input);
			switch (id.toLowerCase()) {
				case 'phdr': {
					phdr = new $AlphaSynth_Sf2_Chunks_PresetHeaderChunk(id, size, input);
					break;
				}
				case 'pbag': {
					pbag = new $AlphaSynth_Sf2_Chunks_ZoneChunk(id, size, input);
					break;
				}
				case 'pmod': {
					presetModulators = (new $AlphaSynth_Sf2_Chunks_ModulatorChunk(id, size, input)).modulators;
					break;
				}
				case 'pgen': {
					presetGenerators = (new $AlphaSynth_Sf2_Chunks_GeneratorChunk(id, size, input)).generators;
					break;
				}
				case 'inst': {
					inst = new $AlphaSynth_Sf2_Chunks_InstrumentChunk(id, size, input);
					break;
				}
				case 'ibag': {
					ibag = new $AlphaSynth_Sf2_Chunks_ZoneChunk(id, size, input);
					break;
				}
				case 'imod': {
					instrumentModulators = (new $AlphaSynth_Sf2_Chunks_ModulatorChunk(id, size, input)).modulators;
					break;
				}
				case 'igen': {
					instrumentGenerators = (new $AlphaSynth_Sf2_Chunks_GeneratorChunk(id, size, input)).generators;
					break;
				}
				case 'shdr': {
					this.sampleHeaders = (new $AlphaSynth_Sf2_Chunks_SampleHeaderChunk(id, size, input)).sampleHeaders;
					break;
				}
				default: {
					throw new ss.Exception('Invalid soundfont. Unrecognized sub chunk: ' + id);
				}
			}
		}
		var pZones = pbag.toZones(presetModulators, presetGenerators);
		this.presetHeaders = phdr.toPresets(pZones);
		var iZones = ibag.toZones(instrumentModulators, instrumentGenerators);
		this.instruments = inst.toInstruments(iZones);
	};
	$AlphaSynth_Sf2_SoundFontPresets.__typeName = 'AlphaSynth.Sf2.SoundFontPresets';
	global.AlphaSynth.Sf2.SoundFontPresets = $AlphaSynth_Sf2_SoundFontPresets;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.SoundFontSampleData
	var $AlphaSynth_Sf2_SoundFontSampleData = function(input) {
		this.bitsPerSample = 0;
		this.sampleData = null;
		var id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
		var size = $AlphaSynth_Util_IOHelper.readInt32LE(input);
		if (id.toLowerCase() !== 'list') {
			throw new ss.Exception('Invalid soundfont. Could not find sdta LIST chunk.');
		}
		var readTo = input.get_position() + size;
		id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
		if (id.toLowerCase() !== 'sdta') {
			throw new ss.Exception('Invalid soundfont. The LIST chunk is not of type sdta.');
		}
		this.bitsPerSample = 0;
		var rawSampleData = null;
		while (input.get_position() < readTo) {
			var subID = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
			size = $AlphaSynth_Util_IOHelper.readInt32LE(input);
			switch (subID.toLowerCase()) {
				case 'smpl': {
					this.bitsPerSample = 16;
					rawSampleData = $AlphaSynth_Util_IOHelper.readByteArray(input, size);
					break;
				}
				case 'sm24': {
					if (ss.isNullOrUndefined(rawSampleData) || size !== Math.ceil(this.sampleData.length / 2)) {
						//ignore this chunk if wrong size or if it comes first
						input.skip(size);
					}
					else {
						this.bitsPerSample = 24;
						for (var x = 0; x < this.sampleData.length; x++) {
							var b = new Uint8Array(3);
							b[0] = input.readByte();
							b[1] = rawSampleData[2 * x];
							b[2] = rawSampleData[2 * x + 1];
						}
					}
					if (size % 2 === 1) {
						if (input.readByte() !== 0) {
							input.set_position(input.get_position() - 1);
						}
					}
					break;
				}
				default: {
					throw new ss.Exception('Invalid soundfont. Unknown chunk id: ' + subID + '.');
				}
			}
		}
		if (this.bitsPerSample === 16) {
			this.sampleData = rawSampleData;
		}
		else if (this.bitsPerSample !== 24) {
			throw new ss.Exception('Only 16 and 24 bit samples are supported.');
		}
	};
	$AlphaSynth_Sf2_SoundFontSampleData.__typeName = 'AlphaSynth.Sf2.SoundFontSampleData';
	global.AlphaSynth.Sf2.SoundFontSampleData = $AlphaSynth_Sf2_SoundFontSampleData;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.SourceTypeEnum
	var $AlphaSynth_Sf2_SourceTypeEnum = function() {
	};
	$AlphaSynth_Sf2_SourceTypeEnum.__typeName = 'AlphaSynth.Sf2.SourceTypeEnum';
	global.AlphaSynth.Sf2.SourceTypeEnum = $AlphaSynth_Sf2_SourceTypeEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.TransformEnum
	var $AlphaSynth_Sf2_TransformEnum = function() {
	};
	$AlphaSynth_Sf2_TransformEnum.__typeName = 'AlphaSynth.Sf2.TransformEnum';
	global.AlphaSynth.Sf2.TransformEnum = $AlphaSynth_Sf2_TransformEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Zone
	var $AlphaSynth_Sf2_Zone = function() {
		this.modulators = null;
		this.generators = null;
	};
	$AlphaSynth_Sf2_Zone.__typeName = 'AlphaSynth.Sf2.Zone';
	global.AlphaSynth.Sf2.Zone = $AlphaSynth_Sf2_Zone;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.Chunk
	var $AlphaSynth_Sf2_Chunks_Chunk = function(id, size) {
		this.id = null;
		this.size = 0;
		this.id = id;
		this.size = size;
	};
	$AlphaSynth_Sf2_Chunks_Chunk.__typeName = 'AlphaSynth.Sf2.Chunks.Chunk';
	global.AlphaSynth.Sf2.Chunks.Chunk = $AlphaSynth_Sf2_Chunks_Chunk;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.GeneratorChunk
	var $AlphaSynth_Sf2_Chunks_GeneratorChunk = function(id, size, input) {
		this.generators = null;
		$AlphaSynth_Sf2_Chunks_Chunk.call(this, id, size);
		if (size % 4 !== 0) {
			throw new ss.Exception('Invalid SoundFont. The presetzone chunk was invalid');
		}
		this.generators = new Array(ss.Int32.trunc(size / 4 - 1));
		for (var x = 0; x < this.generators.length; x++) {
			this.generators[x] = new $AlphaSynth_Sf2_Generator(input);
		}
		new $AlphaSynth_Sf2_Generator(input);
		// terminal record
	};
	$AlphaSynth_Sf2_Chunks_GeneratorChunk.__typeName = 'AlphaSynth.Sf2.Chunks.GeneratorChunk';
	global.AlphaSynth.Sf2.Chunks.GeneratorChunk = $AlphaSynth_Sf2_Chunks_GeneratorChunk;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.InstrumentChunk
	var $AlphaSynth_Sf2_Chunks_InstrumentChunk = function(id, size, input) {
		this.$_rawInstruments = null;
		$AlphaSynth_Sf2_Chunks_Chunk.call(this, id, size);
		if (size % 22 !== 0) {
			throw new ss.Exception('Invalid SoundFont. The preset chunk was invalid.');
		}
		this.$_rawInstruments = new Array(ss.Int32.trunc(size / 22));
		var lastInstrument = null;
		for (var x = 0; x < this.$_rawInstruments.length; x++) {
			var i = new $AlphaSynth_Sf2_Chunks_RawInstrument();
			i.name = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, 20);
			i.startInstrumentZoneIndex = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
			if (ss.isValue(lastInstrument)) {
				lastInstrument.endInstrumentZoneIndex = i.startInstrumentZoneIndex - 1 & 65535;
			}
			this.$_rawInstruments[x] = i;
			lastInstrument = i;
		}
	};
	$AlphaSynth_Sf2_Chunks_InstrumentChunk.__typeName = 'AlphaSynth.Sf2.Chunks.InstrumentChunk';
	global.AlphaSynth.Sf2.Chunks.InstrumentChunk = $AlphaSynth_Sf2_Chunks_InstrumentChunk;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.ModulatorChunk
	var $AlphaSynth_Sf2_Chunks_ModulatorChunk = function(id, size, input) {
		this.modulators = null;
		$AlphaSynth_Sf2_Chunks_Chunk.call(this, id, size);
		if (size % 10 !== 0) {
			throw new ss.Exception('Invalid SoundFont. The presetzone chunk was invalid.');
		}
		this.modulators = new Array(ss.Int32.div(size, 10) - 1);
		for (var x = 0; x < this.modulators.length; x++) {
			this.modulators[x] = new $AlphaSynth_Sf2_Modulator(input);
		}
		new $AlphaSynth_Sf2_Modulator(input);
	};
	$AlphaSynth_Sf2_Chunks_ModulatorChunk.__typeName = 'AlphaSynth.Sf2.Chunks.ModulatorChunk';
	global.AlphaSynth.Sf2.Chunks.ModulatorChunk = $AlphaSynth_Sf2_Chunks_ModulatorChunk;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.PresetHeaderChunk
	var $AlphaSynth_Sf2_Chunks_PresetHeaderChunk = function(id, size, input) {
		this.$_rawPresets = null;
		$AlphaSynth_Sf2_Chunks_Chunk.call(this, id, size);
		if (size % 38 !== 0) {
			throw new ss.Exception('Invalid SoundFont. The preset chunk was invalid.');
		}
		this.$_rawPresets = new Array(ss.Int32.trunc(size / 38));
		var lastPreset = null;
		for (var x = 0; x < this.$_rawPresets.length; x++) {
			var p = new $AlphaSynth_Sf2_Chunks_RawPreset();
			p.name = $AlphaSynth_Util_IOHelper.read8BitStringLength(input, 20);
			p.patchNumber = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
			p.bankNumber = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
			p.startPresetZoneIndex = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
			p.library = $AlphaSynth_Util_IOHelper.readInt32LE(input);
			p.genre = $AlphaSynth_Util_IOHelper.readInt32LE(input);
			p.morphology = $AlphaSynth_Util_IOHelper.readInt32LE(input);
			if (ss.isValue(lastPreset)) {
				lastPreset.endPresetZoneIndex = p.startPresetZoneIndex - 1 & 65535;
			}
			this.$_rawPresets[x] = p;
			lastPreset = p;
		}
	};
	$AlphaSynth_Sf2_Chunks_PresetHeaderChunk.__typeName = 'AlphaSynth.Sf2.Chunks.PresetHeaderChunk';
	global.AlphaSynth.Sf2.Chunks.PresetHeaderChunk = $AlphaSynth_Sf2_Chunks_PresetHeaderChunk;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.RawInstrument
	var $AlphaSynth_Sf2_Chunks_RawInstrument = function() {
		this.name = null;
		this.startInstrumentZoneIndex = 0;
		this.endInstrumentZoneIndex = 0;
	};
	$AlphaSynth_Sf2_Chunks_RawInstrument.__typeName = 'AlphaSynth.Sf2.Chunks.RawInstrument';
	global.AlphaSynth.Sf2.Chunks.RawInstrument = $AlphaSynth_Sf2_Chunks_RawInstrument;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.RawPreset
	var $AlphaSynth_Sf2_Chunks_RawPreset = function() {
		this.name = null;
		this.patchNumber = 0;
		this.bankNumber = 0;
		this.startPresetZoneIndex = 0;
		this.endPresetZoneIndex = 0;
		this.library = 0;
		this.genre = 0;
		this.morphology = 0;
	};
	$AlphaSynth_Sf2_Chunks_RawPreset.__typeName = 'AlphaSynth.Sf2.Chunks.RawPreset';
	global.AlphaSynth.Sf2.Chunks.RawPreset = $AlphaSynth_Sf2_Chunks_RawPreset;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.RawZoneData
	var $AlphaSynth_Sf2_Chunks_RawZoneData = function() {
		this.generatorIndex = 0;
		this.modulatorIndex = 0;
		this.generatorCount = 0;
		this.modulatorCount = 0;
	};
	$AlphaSynth_Sf2_Chunks_RawZoneData.__typeName = 'AlphaSynth.Sf2.Chunks.RawZoneData';
	global.AlphaSynth.Sf2.Chunks.RawZoneData = $AlphaSynth_Sf2_Chunks_RawZoneData;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.SampleHeaderChunk
	var $AlphaSynth_Sf2_Chunks_SampleHeaderChunk = function(id, size, input) {
		this.sampleHeaders = null;
		$AlphaSynth_Sf2_Chunks_Chunk.call(this, id, size);
		if (size % 46 !== 0) {
			throw new ss.Exception('Invalid SoundFont. The sample header chunk was invalid.');
		}
		this.sampleHeaders = new Array(ss.Int32.trunc(size / 46 - 1));
		for (var x = 0; x < this.sampleHeaders.length; x++) {
			this.sampleHeaders[x] = new $AlphaSynth_Sf2_SampleHeader(input);
		}
		new $AlphaSynth_Sf2_SampleHeader(input);
		//read terminal record
	};
	$AlphaSynth_Sf2_Chunks_SampleHeaderChunk.__typeName = 'AlphaSynth.Sf2.Chunks.SampleHeaderChunk';
	global.AlphaSynth.Sf2.Chunks.SampleHeaderChunk = $AlphaSynth_Sf2_Chunks_SampleHeaderChunk;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Sf2.Chunks.ZoneChunk
	var $AlphaSynth_Sf2_Chunks_ZoneChunk = function(id, size, input) {
		this.$_zoneData = null;
		$AlphaSynth_Sf2_Chunks_Chunk.call(this, id, size);
		this.$_zoneData = new Array(ss.Int32.trunc(size / 4));
		var lastZone = null;
		for (var x = 0; x < this.$_zoneData.length; x++) {
			var z = new $AlphaSynth_Sf2_Chunks_RawZoneData();
			z.generatorIndex = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
			z.modulatorIndex = $AlphaSynth_Util_IOHelper.readUInt16LE(input);
			if (ss.isValue(lastZone)) {
				lastZone.generatorCount = z.generatorIndex - lastZone.generatorIndex & 65535;
				lastZone.modulatorCount = z.modulatorIndex - lastZone.modulatorIndex & 65535;
			}
			this.$_zoneData[x] = z;
			lastZone = z;
		}
	};
	$AlphaSynth_Sf2_Chunks_ZoneChunk.__typeName = 'AlphaSynth.Sf2.Chunks.ZoneChunk';
	global.AlphaSynth.Sf2.Chunks.ZoneChunk = $AlphaSynth_Sf2_Chunks_ZoneChunk;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.CCValue
	var $AlphaSynth_Synthesis_CCValue = function(combined) {
		this.$_coarseValue = 0;
		this.$_fineValue = 0;
		this.$_combined = 0;
		this.$_coarseValue = 0;
		this.$_fineValue = 0;
		this.$_combined = combined;
		this.$updateCoarseFinePair();
	};
	$AlphaSynth_Synthesis_CCValue.__typeName = 'AlphaSynth.Synthesis.CCValue';
	$AlphaSynth_Synthesis_CCValue.$ctor1 = function(coarse, fine) {
		this.$_coarseValue = 0;
		this.$_fineValue = 0;
		this.$_combined = 0;
		this.$_coarseValue = coarse;
		this.$_fineValue = fine;
		this.$_combined = 0;
		this.$updateCombined();
	};
	global.AlphaSynth.Synthesis.CCValue = $AlphaSynth_Synthesis_CCValue;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.Synthesizer
	var $AlphaSynth_Synthesis_Synthesizer = function(sampleRate, audioChannels, bufferSize, bufferCount, polyphony) {
		this.$_voiceManager = null;
		this.$_synthChannels = null;
		this.$_masterVolume = 0;
		this.$_synthGain = 0;
		this.$_midiMessageProcessed = null;
		this.$_layerList = null;
		this.midiEventQueue = null;
		this.midiEventCounts = null;
		this.sampleBuffer = null;
		this.audioChannels = 0;
		this.littleEndian = false;
		this.soundBank = null;
		this.sampleRate = 0;
		this.$1$MicroBufferSizeField = 0;
		this.$1$MicroBufferCountField = 0;
		var MinSampleRate = 8000;
		var MaxSampleRate = 96000;
		if (sampleRate < MinSampleRate || sampleRate > MaxSampleRate) {
			throw new ss.Exception('Invalid paramater: (sampleRate) Valid ranges are ' + MinSampleRate + ' to ' + MaxSampleRate);
		}
		if (audioChannels < 1 || audioChannels > 2) {
			throw new ss.Exception('Invalid paramater: (audioChannels) Valid ranges are ' + 1 + ' to ' + 2);
		}
		this.$_midiMessageProcessed = [];
		//
		// Setup synth parameters
		this.$_masterVolume = 1;
		this.$_synthGain = 0.349999994039536;
		this.sampleRate = sampleRate;
		this.audioChannels = audioChannels;
		this.set_microBufferSize($AlphaSynth_Synthesis_SynthHelper.clampI(bufferSize, ss.Int32.trunc($AlphaSynth_Util_SynthConstants.minBufferSize * sampleRate), ss.Int32.trunc($AlphaSynth_Util_SynthConstants.maxBufferSize * sampleRate)));
		this.set_microBufferSize(ss.Int32.trunc(Math.ceil(this.get_microBufferSize() / 64) * 64));
		//ensure multiple of block size
		this.set_microBufferCount(Math.max(1, bufferCount));
		this.sampleBuffer = new Float32Array(this.get_microBufferSize() * this.get_microBufferCount() * audioChannels);
		this.littleEndian = true;
		//Setup Controllers
		this.$_synthChannels = new Array($AlphaSynth_Util_SynthConstants.defaultChannelCount);
		for (var x = 0; x < this.$_synthChannels.length; x++) {
			this.$_synthChannels[x] = new $AlphaSynth_Synthesis_SynthParameters(this);
		}
		//Create synth voices
		this.$_voiceManager = new $AlphaSynth_Synthesis_VoiceManager($AlphaSynth_Synthesis_SynthHelper.clampI(polyphony, $AlphaSynth_Util_SynthConstants.minPolyphony, $AlphaSynth_Util_SynthConstants.maxPolyphony));
		//Create midi containers
		this.midiEventQueue = new (ss.makeGenericType($AlphaSynth_Ds_LinkedList$1, [$AlphaSynth_Synthesis_SynthEvent]))();
		this.midiEventCounts = new Array(this.get_microBufferCount());
		this.$_layerList = new Array(15);
		this.$_midiMessageProcessed = [];
		this.resetSynthControls();
	};
	$AlphaSynth_Synthesis_Synthesizer.__typeName = 'AlphaSynth.Synthesis.Synthesizer';
	global.AlphaSynth.Synthesis.Synthesizer = $AlphaSynth_Synthesis_Synthesizer;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.SynthEvent
	var $AlphaSynth_Synthesis_SynthEvent = function(e) {
		this.event = null;
		this.delta = 0;
		this.event = e;
	};
	$AlphaSynth_Synthesis_SynthEvent.__typeName = 'AlphaSynth.Synthesis.SynthEvent';
	global.AlphaSynth.Synthesis.SynthEvent = $AlphaSynth_Synthesis_SynthEvent;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.SynthHelper
	var $AlphaSynth_Synthesis_SynthHelper = function() {
	};
	$AlphaSynth_Synthesis_SynthHelper.__typeName = 'AlphaSynth.Synthesis.SynthHelper';
	$AlphaSynth_Synthesis_SynthHelper.clampD = function(value, min, max) {
		if (value <= min) {
			return min;
		}
		else if (value >= max) {
			return max;
		}
		else {
			return value;
		}
	};
	$AlphaSynth_Synthesis_SynthHelper.clampF = function(value, min, max) {
		if (value <= min) {
			return min;
		}
		else if (value >= max) {
			return max;
		}
		else {
			return value;
		}
	};
	$AlphaSynth_Synthesis_SynthHelper.clampI = function(value, min, max) {
		if (value <= min) {
			return min;
		}
		else if (value >= max) {
			return max;
		}
		else {
			return value;
		}
	};
	$AlphaSynth_Synthesis_SynthHelper.clampS = function(value, min, max) {
		if (value <= min) {
			return min;
		}
		else if (value >= max) {
			return max;
		}
		else {
			return value;
		}
	};
	$AlphaSynth_Synthesis_SynthHelper.nearestPowerOfTwo = function(value) {
		return Math.pow(2, ss.round(Math.log(value) / Math.log(2)));
	};
	$AlphaSynth_Synthesis_SynthHelper.samplesFromTime = function(sampleRate, seconds) {
		return sampleRate * seconds;
	};
	$AlphaSynth_Synthesis_SynthHelper.timeFromSamples = function(sampleRate, samples) {
		return samples / sampleRate;
	};
	$AlphaSynth_Synthesis_SynthHelper.dBtoLinear = function(dBvalue) {
		return Math.pow(10, dBvalue / 20);
	};
	$AlphaSynth_Synthesis_SynthHelper.lineartoDB = function(linearvalue) {
		return 20 * (Math.log(linearvalue) / Math.log(10));
	};
	$AlphaSynth_Synthesis_SynthHelper.frequencyToKey = function(frequency, rootkey) {
		return 12 * (Math.log(frequency / 440) / Math.log(2)) + rootkey;
	};
	$AlphaSynth_Synthesis_SynthHelper.keyToFrequency = function(key, rootkey) {
		return Math.pow(2, (key - rootkey) / 12) * 440;
	};
	$AlphaSynth_Synthesis_SynthHelper.semitoneToPitch = function(key) {
		//does not return a frequency, only the 2^(1/12) value.
		if (key < -127) {
			key = -127;
		}
		else if (key > 127) {
			key = 127;
		}
		return $AlphaSynth_Util_Tables.semitoneTable(127 + key);
	};
	$AlphaSynth_Synthesis_SynthHelper.centsToPitch = function(cents) {
		//does not return a frequency, only the 2^(1/12) value.
		var key = ss.Int32.div(cents, 100);
		cents -= key * 100;
		if (key < -127) {
			key = -127;
		}
		else if (key > 127) {
			key = 127;
		}
		return $AlphaSynth_Util_Tables.semitoneTable(127 + key) * $AlphaSynth_Util_Tables.centTable(100 + cents);
	};
	global.AlphaSynth.Synthesis.SynthHelper = $AlphaSynth_Synthesis_SynthHelper;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.SynthParameters
	var $AlphaSynth_Synthesis_SynthParameters = function(synth) {
		this.program = 0;
		this.bankSelect = 0;
		this.channelAfterTouch = 0;
		this.pan = null;
		this.volume = null;
		this.expression = null;
		this.modRange = null;
		this.pitchBend = null;
		this.pitchBendRangeCoarse = 0;
		this.pitchBendRangeFine = 0;
		this.masterCoarseTune = 0;
		this.masterFineTune = null;
		this.holdPedal = false;
		this.legatoPedal = false;
		this.rpn = null;
		this.synth = null;
		this.currentVolume = 0;
		this.currentPitch = 0;
		this.currentMod = 0;
		this.currentPan = null;
		this.synth = synth;
		this.pan = new $AlphaSynth_Synthesis_CCValue(0);
		this.volume = new $AlphaSynth_Synthesis_CCValue(0);
		this.expression = new $AlphaSynth_Synthesis_CCValue(0);
		this.modRange = new $AlphaSynth_Synthesis_CCValue(0);
		this.pitchBend = new $AlphaSynth_Synthesis_CCValue(0);
		this.masterFineTune = new $AlphaSynth_Synthesis_CCValue(0);
		this.rpn = new $AlphaSynth_Synthesis_CCValue(0);
		this.currentPan = new $AlphaSynth_Bank_Components_PanComponent();
		this.resetControllers();
	};
	$AlphaSynth_Synthesis_SynthParameters.__typeName = 'AlphaSynth.Synthesis.SynthParameters';
	global.AlphaSynth.Synthesis.SynthParameters = $AlphaSynth_Synthesis_SynthParameters;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.Voice
	var $AlphaSynth_Synthesis_Voice = function() {
		this.$1$PatchField = null;
		this.$1$VoiceParamsField = null;
		this.set_voiceParams(new $AlphaSynth_Synthesis_VoiceParameters());
	};
	$AlphaSynth_Synthesis_Voice.__typeName = 'AlphaSynth.Synthesis.Voice';
	global.AlphaSynth.Synthesis.Voice = $AlphaSynth_Synthesis_Voice;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.VoiceManager
	var $AlphaSynth_Synthesis_VoiceManager = function(voiceCount) {
		this.$_voicePool = null;
		this.$_vNodes = null;
		this.stealingMethod = 0;
		this.polyphony = 0;
		this.freeVoices = null;
		this.activeVoices = null;
		this.registry = null;
		this.stealingMethod = 1;
		this.polyphony = voiceCount;
		this.$_voicePool = new Array(voiceCount);
		this.$_vNodes = new (ss.makeGenericType($AlphaSynth_Ds_LinkedList$1, [$AlphaSynth_Synthesis_VoiceNode]))();
		this.freeVoices = new (ss.makeGenericType($AlphaSynth_Ds_LinkedList$1, [$AlphaSynth_Synthesis_Voice]))();
		this.activeVoices = new (ss.makeGenericType($AlphaSynth_Ds_LinkedList$1, [$AlphaSynth_Synthesis_Voice]))();
		for (var i = 0; i < voiceCount; i++) {
			var v = new $AlphaSynth_Synthesis_Voice();
			this.$_voicePool[i] = v;
			this.$_vNodes.addLast(new $AlphaSynth_Synthesis_VoiceNode());
			this.freeVoices.addLast(v);
		}
		this.registry = ss.multidimArray(null, $AlphaSynth_Util_SynthConstants.defaultChannelCount, $AlphaSynth_Util_SynthConstants.defaultKeyCount);
	};
	$AlphaSynth_Synthesis_VoiceManager.__typeName = 'AlphaSynth.Synthesis.VoiceManager';
	global.AlphaSynth.Synthesis.VoiceManager = $AlphaSynth_Synthesis_VoiceManager;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.VoiceNode
	var $AlphaSynth_Synthesis_VoiceNode = function() {
		this.value = null;
		this.next = null;
	};
	$AlphaSynth_Synthesis_VoiceNode.__typeName = 'AlphaSynth.Synthesis.VoiceNode';
	global.AlphaSynth.Synthesis.VoiceNode = $AlphaSynth_Synthesis_VoiceNode;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.VoiceParameters
	var $AlphaSynth_Synthesis_VoiceParameters = function() {
		this.$mix1 = 0;
		this.$mix2 = 0;
		this.channel = 0;
		this.note = 0;
		this.velocity = 0;
		this.noteOffPending = false;
		this.state = 0;
		this.pitchOffset = 0;
		this.volOffset = 0;
		this.blockBuffer = null;
		this.pData = null;
		this.synthParams = null;
		this.generatorParams = null;
		this.envelopes = null;
		this.filters = null;
		this.lfos = null;
		this.blockBuffer = new Float32Array($AlphaSynth_Util_SynthConstants.defaultBlockSize);
		//create default number of each component
		this.pData = new Array($AlphaSynth_Util_SynthConstants.maxVoiceComponents);
		this.generatorParams = new Array($AlphaSynth_Util_SynthConstants.maxVoiceComponents);
		this.envelopes = new Array($AlphaSynth_Util_SynthConstants.maxVoiceComponents);
		this.filters = new Array($AlphaSynth_Util_SynthConstants.maxVoiceComponents);
		this.lfos = new Array($AlphaSynth_Util_SynthConstants.maxVoiceComponents);
		//initialize each component
		for (var x = 0; x < $AlphaSynth_Util_SynthConstants.maxVoiceComponents; x++) {
			this.generatorParams[x] = new $AlphaSynth_Bank_Components_Generators_GeneratorParameters();
			this.envelopes[x] = new $AlphaSynth_Bank_Components_Envelope();
			this.filters[x] = new $AlphaSynth_Bank_Components_Filter();
			this.lfos[x] = new $AlphaSynth_Bank_Components_Lfo();
		}
	};
	$AlphaSynth_Synthesis_VoiceParameters.__typeName = 'AlphaSynth.Synthesis.VoiceParameters';
	global.AlphaSynth.Synthesis.VoiceParameters = $AlphaSynth_Synthesis_VoiceParameters;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.VoiceStateEnum
	var $AlphaSynth_Synthesis_VoiceStateEnum = function() {
	};
	$AlphaSynth_Synthesis_VoiceStateEnum.__typeName = 'AlphaSynth.Synthesis.VoiceStateEnum';
	global.AlphaSynth.Synthesis.VoiceStateEnum = $AlphaSynth_Synthesis_VoiceStateEnum;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Synthesis.VoiceStealingMethod
	var $AlphaSynth_Synthesis_VoiceStealingMethod = function() {
	};
	$AlphaSynth_Synthesis_VoiceStealingMethod.__typeName = 'AlphaSynth.Synthesis.VoiceStealingMethod';
	global.AlphaSynth.Synthesis.VoiceStealingMethod = $AlphaSynth_Synthesis_VoiceStealingMethod;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.IOHelper
	var $AlphaSynth_Util_IOHelper = function() {
	};
	$AlphaSynth_Util_IOHelper.__typeName = 'AlphaSynth.Util.IOHelper';
	$AlphaSynth_Util_IOHelper.readInt32LE = function(input) {
		var ch1 = input.readByte();
		var ch2 = input.readByte();
		var ch3 = input.readByte();
		var ch4 = input.readByte();
		return ch4 << 24 | ch3 << 16 | ch2 << 8 | ch1 << 0;
	};
	$AlphaSynth_Util_IOHelper.readUInt16LE = function(input) {
		var ch1 = input.readByte();
		var ch2 = input.readByte();
		return (ch2 << 8 | ch1 << 0) & 65535;
	};
	$AlphaSynth_Util_IOHelper.readInt16LE = function(input) {
		var ch1 = input.readByte();
		var ch2 = input.readByte();
		var $t1 = ch2 << 8 | ch1 << 0;
		return (($t1 & 65535) >> 15) * -65536 + ($t1 & 65535);
	};
	$AlphaSynth_Util_IOHelper.readInt32BE = function(input) {
		var ch1 = input.readByte();
		var ch2 = input.readByte();
		var ch3 = input.readByte();
		var ch4 = input.readByte();
		return ch1 << 24 | ch2 << 16 | ch3 << 8 | ch4 << 0;
	};
	$AlphaSynth_Util_IOHelper.readUInt16BE = function(input) {
		var ch1 = input.readByte();
		var ch2 = input.readByte();
		return (ch1 << 8 | ch2 << 0) & 65535;
	};
	$AlphaSynth_Util_IOHelper.readInt16BE = function(input) {
		var ch1 = input.readByte();
		var ch2 = input.readByte();
		var $t1 = ch1 << 8 | ch2 << 0;
		return (($t1 & 65535) >> 15) * -65536 + ($t1 & 65535);
	};
	$AlphaSynth_Util_IOHelper.readByteArray = function(input, length) {
		var v = new Uint8Array(length);
		input.read(v, 0, length);
		return v;
	};
	$AlphaSynth_Util_IOHelper.read8BitChars = function(input, length) {
		var s = [];
		for (var i = 0; i < length; i++) {
			s.push(String.fromCharCode(input.readByte()));
		}
		return s.join('');
	};
	$AlphaSynth_Util_IOHelper.read8BitString = function(input) {
		var s = [];
		var c = input.readByte();
		while (c !== 0) {
			s.push(String.fromCharCode(c));
			c = input.readByte();
		}
		return s.join('');
	};
	$AlphaSynth_Util_IOHelper.read8BitStringLength = function(input, length) {
		var s = [];
		var z = -1;
		for (var i = 0; i < length; i++) {
			var c = input.readByte();
			if (c === 0 && z === -1) {
				z = i;
			}
			s.push(String.fromCharCode(c));
		}
		var t = s.join('');
		if (z >= 0) {
			return t.substr(0, z);
		}
		return t;
	};
	$AlphaSynth_Util_IOHelper.readSInt8 = function(input) {
		var v = input.readByte();
		return ((v & 255) >> 7) * -256 + (v & 255);
	};
	$AlphaSynth_Util_IOHelper.readUInt32 = function(input) {
		var ch1 = input.readByte();
		var ch2 = input.readByte();
		var ch3 = input.readByte();
		var ch4 = input.readByte();
		return ch1 << 24 | ch2 << 16 | ch3 << 8 | ch4 << 0;
	};
	$AlphaSynth_Util_IOHelper.readInt24 = function(input, index) {
		var i;
		if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
			i = input[index] | input[index + 1] << 8 | input[index + 2] << 16;
			if ((i & 8388608) === 8388608) {
				i = i | -16777216;
			}
		}
		else {
			i = input[index] << 16 | input[index + 1] << 8 | input[index + 2];
			if ((i & 256) === 256) {
				i = i | 255;
			}
		}
		return i;
	};
	$AlphaSynth_Util_IOHelper.readInt16 = function(input, index) {
		if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
			var $t1 = input[index] | input[index + 1] << 8;
			return (($t1 & 65535) >> 15) * -65536 + ($t1 & 65535);
		}
		else {
			var $t2 = input[index] << 8 | input[index + 1];
			return (($t2 & 65535) >> 15) * -65536 + ($t2 & 65535);
		}
	};
	global.AlphaSynth.Util.IOHelper = $AlphaSynth_Util_IOHelper;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.Logger
	var $AlphaSynth_Util_Logger = function() {
	};
	$AlphaSynth_Util_Logger.__typeName = 'AlphaSynth.Util.Logger';
	$AlphaSynth_Util_Logger.get_logLevel = function() {
		return $AlphaSynth_Util_Logger.$1$LogLevelField;
	};
	$AlphaSynth_Util_Logger.set_logLevel = function(value) {
		$AlphaSynth_Util_Logger.$1$LogLevelField = value;
	};
	$AlphaSynth_Util_Logger.debug = function(msg) {
		$AlphaSynth_Util_Logger.$log(1, msg);
	};
	$AlphaSynth_Util_Logger.warning = function(msg) {
		$AlphaSynth_Util_Logger.$log(3, msg);
	};
	$AlphaSynth_Util_Logger.info = function(msg) {
		$AlphaSynth_Util_Logger.$log(2, msg);
	};
	$AlphaSynth_Util_Logger.error = function(msg) {
		$AlphaSynth_Util_Logger.$log(4, msg);
	};
	$AlphaSynth_Util_Logger.$log = function(logLevel, msg) {
		if (logLevel < $AlphaSynth_Util_Logger.get_logLevel()) {
			return;
		}
		var caller = arguments.callee.caller.caller.toString();
		console.log(caller + '-' + msg);
	};
	global.AlphaSynth.Util.Logger = $AlphaSynth_Util_Logger;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.LogLevel
	var $AlphaSynth_Util_LogLevel = function() {
	};
	$AlphaSynth_Util_LogLevel.__typeName = 'AlphaSynth.Util.LogLevel';
	global.AlphaSynth.Util.LogLevel = $AlphaSynth_Util_LogLevel;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.PcmData
	var $AlphaSynth_Util_PcmData = function(bits, pcmData, isDataInLittleEndianFormat) {
		this.data = null;
		this.$1$LengthField = 0;
		this.$1$BytesPerSampleField = 0;
		this.set_bytesPerSample(ss.Int32.div(bits, 8));
		if (pcmData.length % this.get_bytesPerSample() !== 0) {
			throw new ss.Exception('Invalid PCM format. The PCM data was an invalid size.');
		}
		this.data = pcmData;
		this.set_length(ss.Int32.div(this.data.length, this.get_bytesPerSample()));
		if ($AlphaSynth_Platform_TypeUtils.isLittleEndian !== isDataInLittleEndianFormat) {
			$AlphaSynth_Util_WaveHelper.swapEndianess(this.data, bits);
		}
	};
	$AlphaSynth_Util_PcmData.__typeName = 'AlphaSynth.Util.PcmData';
	$AlphaSynth_Util_PcmData.create = function(bits, pcmData, isDataInLittleEndianFormat) {
		switch (bits) {
			case 8: {
				return new $AlphaSynth_Util_PcmData8Bit(bits, pcmData, isDataInLittleEndianFormat);
			}
			case 16: {
				return new $AlphaSynth_Util_PcmData16Bit(bits, pcmData, isDataInLittleEndianFormat);
			}
			case 24: {
				return new $AlphaSynth_Util_PcmData24Bit(bits, pcmData, isDataInLittleEndianFormat);
			}
			case 32: {
				return new $AlphaSynth_Util_PcmData32Bit(bits, pcmData, isDataInLittleEndianFormat);
			}
			default: {
				throw new ss.Exception('Invalid PCM format. ' + bits + 'bit pcm data is not supported.');
			}
		}
	};
	global.AlphaSynth.Util.PcmData = $AlphaSynth_Util_PcmData;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.PcmData16Bit
	var $AlphaSynth_Util_PcmData16Bit = function(bits, pcmData, isDataInLittleEndianFormat) {
		$AlphaSynth_Util_PcmData.call(this, bits, pcmData, isDataInLittleEndianFormat);
	};
	$AlphaSynth_Util_PcmData16Bit.__typeName = 'AlphaSynth.Util.PcmData16Bit';
	global.AlphaSynth.Util.PcmData16Bit = $AlphaSynth_Util_PcmData16Bit;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.PcmData24Bit
	var $AlphaSynth_Util_PcmData24Bit = function(bits, pcmData, isDataInLittleEndianFormat) {
		$AlphaSynth_Util_PcmData.call(this, bits, pcmData, isDataInLittleEndianFormat);
	};
	$AlphaSynth_Util_PcmData24Bit.__typeName = 'AlphaSynth.Util.PcmData24Bit';
	global.AlphaSynth.Util.PcmData24Bit = $AlphaSynth_Util_PcmData24Bit;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.PcmData32Bit
	var $AlphaSynth_Util_PcmData32Bit = function(bits, pcmData, isDataInLittleEndianFormat) {
		$AlphaSynth_Util_PcmData.call(this, bits, pcmData, isDataInLittleEndianFormat);
	};
	$AlphaSynth_Util_PcmData32Bit.__typeName = 'AlphaSynth.Util.PcmData32Bit';
	global.AlphaSynth.Util.PcmData32Bit = $AlphaSynth_Util_PcmData32Bit;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.PcmData8Bit
	var $AlphaSynth_Util_PcmData8Bit = function(bits, pcmData, isDataInLittleEndianFormat) {
		$AlphaSynth_Util_PcmData.call(this, bits, pcmData, isDataInLittleEndianFormat);
	};
	$AlphaSynth_Util_PcmData8Bit.__typeName = 'AlphaSynth.Util.PcmData8Bit';
	global.AlphaSynth.Util.PcmData8Bit = $AlphaSynth_Util_PcmData8Bit;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.SynthConstants
	var $AlphaSynth_Util_SynthConstants = function() {
	};
	$AlphaSynth_Util_SynthConstants.__typeName = 'AlphaSynth.Util.SynthConstants';
	global.AlphaSynth.Util.SynthConstants = $AlphaSynth_Util_SynthConstants;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.Tables
	var $AlphaSynth_Util_Tables = function() {
	};
	$AlphaSynth_Util_Tables.__typeName = 'AlphaSynth.Util.Tables';
	$AlphaSynth_Util_Tables.envelopeTables = function(index) {
		if (!$AlphaSynth_Util_Tables.$_isInitialized) {
			$AlphaSynth_Util_Tables.$init();
		}
		return $AlphaSynth_Util_Tables._envelopeTables[index];
	};
	$AlphaSynth_Util_Tables.semitoneTable = function(index) {
		if (!$AlphaSynth_Util_Tables.$_isInitialized) {
			$AlphaSynth_Util_Tables.$init();
		}
		return $AlphaSynth_Util_Tables._semitoneTable[index];
	};
	$AlphaSynth_Util_Tables.centTable = function(index) {
		if (!$AlphaSynth_Util_Tables.$_isInitialized) {
			$AlphaSynth_Util_Tables.$init();
		}
		return $AlphaSynth_Util_Tables._centTable[index];
	};
	$AlphaSynth_Util_Tables.sincTable = function(index) {
		if (!$AlphaSynth_Util_Tables.$_isInitialized) {
			$AlphaSynth_Util_Tables.$init();
		}
		return $AlphaSynth_Util_Tables._sincTable[index];
	};
	$AlphaSynth_Util_Tables.$init = function() {
		var EnvelopeSize = 64;
		var ExponentialCoeff = 0.0900000035762787;
		$AlphaSynth_Util_Tables._envelopeTables = new Array(4);
		$AlphaSynth_Util_Tables._envelopeTables[0] = $AlphaSynth_Util_Tables.$removeDenormals($AlphaSynth_Util_Tables.$createSustainTable(EnvelopeSize));
		$AlphaSynth_Util_Tables._envelopeTables[1] = $AlphaSynth_Util_Tables.$removeDenormals($AlphaSynth_Util_Tables.$createLinearTable(EnvelopeSize));
		$AlphaSynth_Util_Tables._envelopeTables[2] = $AlphaSynth_Util_Tables.$removeDenormals($AlphaSynth_Util_Tables.$createExponentialTable(EnvelopeSize, ExponentialCoeff));
		$AlphaSynth_Util_Tables._envelopeTables[3] = $AlphaSynth_Util_Tables.$removeDenormals($AlphaSynth_Util_Tables.$createSineTable(EnvelopeSize));
		$AlphaSynth_Util_Tables._centTable = $AlphaSynth_Util_Tables.$createCentTable();
		$AlphaSynth_Util_Tables._semitoneTable = $AlphaSynth_Util_Tables.$createSemitoneTable();
		$AlphaSynth_Util_Tables._sincTable = $AlphaSynth_Util_Tables.$createSincTable($AlphaSynth_Util_SynthConstants.sincWidth, $AlphaSynth_Util_SynthConstants.sincResolution, 0.430000007152557, $AlphaSynth_Util_Tables.$hammingWindow);
		$AlphaSynth_Util_Tables.$_isInitialized = true;
	};
	$AlphaSynth_Util_Tables.$createSquareTable = function(size, k) {
		//Uses Fourier Expansion up to k terms 
		var FourOverPi = 4 / Math.PI;
		var squaretable = new Float32Array(size);
		var inc = 1 / size;
		var phase = 0;
		for (var x = 0; x < size; x++) {
			var value = 0;
			for (var i = 1; i < k + 1; i++) {
				var twokminus1 = 2 * i - 1;
				value += Math.sin($AlphaSynth_Util_SynthConstants.twoPi * twokminus1 * phase) / twokminus1;
			}
			squaretable[x] = $AlphaSynth_Synthesis_SynthHelper.clampF(FourOverPi * value, -1, 1);
			phase += inc;
		}
		return squaretable;
	};
	$AlphaSynth_Util_Tables.$createCentTable = function() {
		//-100 to 100 cents
		var cents = new Float32Array(201);
		for (var x = 0; x < cents.get_length(); x++) {
			cents[x] = Math.pow(2, (x - 100) / 1200);
		}
		return cents;
	};
	$AlphaSynth_Util_Tables.$createSemitoneTable = function() {
		//-127 to 127 semitones
		var table = new Float32Array(255);
		for (var x = 0; x < table.get_length(); x++) {
			table[x] = Math.pow(2, (x - 127) / 12);
		}
		return table;
	};
	$AlphaSynth_Util_Tables.$createSustainTable = function(size) {
		var table = new Float32Array(size);
		for (var x = 0; x < size; x++) {
			table[x] = 1;
		}
		return table;
	};
	$AlphaSynth_Util_Tables.$createLinearTable = function(size) {
		var table = new Float32Array(size);
		for (var x = 0; x < size; x++) {
			table[x] = x / (size - 1);
		}
		return table;
	};
	$AlphaSynth_Util_Tables.$createExponentialTable = function(size, coeff) {
		coeff = $AlphaSynth_Synthesis_SynthHelper.clampF(coeff, 0.00100000004749745, 0.899999976158142);
		var graph = new Float32Array(size);
		var val = 0;
		for (var x = 0; x < size; x++) {
			graph[x] = val;
			val += coeff * (1.58730158730159 - val);
		}
		for (var x1 = 0; x1 < size; x1++) {
			graph[x1] = graph[x1] / graph[graph.get_length() - 1];
		}
		return graph;
	};
	$AlphaSynth_Util_Tables.$createSineTable = function(size) {
		var graph = new Float32Array(size);
		var inc = 3 * Math.PI / 2 / (size - 1);
		var phase = 0;
		for (var x = 0; x < size; x++) {
			graph[x] = Math.abs(Math.sin(phase));
			phase += inc;
		}
		return graph;
	};
	$AlphaSynth_Util_Tables.$removeDenormals = function(data) {
		for (var x = 0; x < data.get_length(); x++) {
			if (Math.abs(data[x]) < $AlphaSynth_Util_SynthConstants.denormLimit) {
				data[x] = 0;
			}
		}
		return data;
	};
	$AlphaSynth_Util_Tables.$vonHannWindow = function(i, size) {
		return 0.5 - 0.5 * Math.cos($AlphaSynth_Util_SynthConstants.twoPi * (0.5 + i / size));
	};
	$AlphaSynth_Util_Tables.$hammingWindow = function(i, size) {
		return 0.54 - 0.46 * Math.cos($AlphaSynth_Util_SynthConstants.twoPi * i / size);
	};
	$AlphaSynth_Util_Tables.$blackmanWindow = function(i, size) {
		return 0.42659 - 0.49656 * Math.cos($AlphaSynth_Util_SynthConstants.twoPi * i / size) + 0.076849 * Math.cos(4 * Math.PI * i / size);
	};
	$AlphaSynth_Util_Tables.$createSincTable = function(windowSize, resolution, cornerRatio, windowFunction) {
		var subWindow = ss.Int32.div(windowSize, 2) + 1;
		var table = new Float32Array(subWindow * resolution);
		var gain = 2 * cornerRatio;
		for (var x = 0; x < subWindow; x++) {
			for (var y = 0; y < resolution; y++) {
				var a = x + y / resolution;
				var sinc = $AlphaSynth_Util_SynthConstants.twoPi * cornerRatio * a;
				if (Math.abs(sinc) > 1E-05) {
					sinc = Math.sin(sinc) / sinc;
				}
				else {
					sinc = 1;
				}
				table[x * $AlphaSynth_Util_SynthConstants.sincResolution + y] = gain * sinc * windowFunction(a, windowSize);
			}
		}
		return table;
	};
	global.AlphaSynth.Util.Tables = $AlphaSynth_Util_Tables;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.UrlLoader
	var $AlphaSynth_Util_UrlLoader = function() {
		this.url = null;
		this.method = null;
		this.progress = null;
		this.complete = null;
	};
	$AlphaSynth_Util_UrlLoader.__typeName = 'AlphaSynth.Util.UrlLoader';
	global.AlphaSynth.Util.UrlLoader = $AlphaSynth_Util_UrlLoader;
	////////////////////////////////////////////////////////////////////////////////
	// AlphaSynth.Util.WaveHelper
	var $AlphaSynth_Util_WaveHelper = function() {
	};
	$AlphaSynth_Util_WaveHelper.__typeName = 'AlphaSynth.Util.WaveHelper';
	$AlphaSynth_Util_WaveHelper.swapEndianess = function(data, bits) {
		bits = ss.Int32.div(bits, 8);
		//get bytes per sample
		var swapArray = new Uint8Array(bits);
		for (var x = 0; x < data.length; x += bits) {
			swapArray.set(data.subarray(x, x + bits), 0);
			$AlphaSynth_Platform_Std.reverse(swapArray);
			data.set(swapArray.subarray(0, 0 + bits), x);
		}
	};
	global.AlphaSynth.Util.WaveHelper = $AlphaSynth_Util_WaveHelper;
	ss.initClass($AlphaSynth_Bank_AssetManager, $asm, {
		findPatch: function(name) {
			for (var i = 0; i < this.patchAssets.length; i++) {
				var patchAsset = this.patchAssets[i];
				if (ss.referenceEquals(patchAsset.name, name)) {
					return patchAsset;
				}
			}
			return null;
		},
		findSample: function(name) {
			for (var i = 0; i < this.sampleAssets.length; i++) {
				var sampleDataAsset = this.sampleAssets[i];
				if (ss.referenceEquals(sampleDataAsset.name, name)) {
					return sampleDataAsset;
				}
			}
			return null;
		}
	});
	ss.initClass($AlphaSynth_Bank_PatchAsset, $asm, {});
	ss.initClass($AlphaSynth_Bank_PatchBank, $asm, {
		reset: function() {
			this.$_bank = {};
			this.$_assets = new $AlphaSynth_Bank_AssetManager();
			this.name = '';
			this.comments = '';
		},
		get_loadedBanks: function() {
			var banks = [];
			var $t1 = Object.keys(this.$_bank);
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var bank = $t1[$t2];
				banks.push($AlphaSynth_Platform_Std.parseInt(bank));
			}
			return banks.slice(0);
		},
		getBank: function(bankNumber) {
			return (this.$_bank.hasOwnProperty(bankNumber) ? this.$_bank[bankNumber] : null);
		},
		getPatchByNumber: function(bankNumber, patchNumber) {
			return (this.$_bank.hasOwnProperty(bankNumber) ? this.$_bank[bankNumber][patchNumber] : null);
		},
		getPatchByName: function(bankNumber, name) {
			if (this.$_bank.hasOwnProperty(bankNumber)) {
				var patches = this.$_bank[bankNumber];
				for (var $t1 = 0; $t1 < patches.length; $t1++) {
					var patch = patches[$t1];
					if (ss.isValue(patch) && ss.referenceEquals(patch.name, name)) {
						return patch;
					}
				}
			}
			return null;
		},
		isBankLoaded: function(bankNumber) {
			return this.$_bank.hasOwnProperty(bankNumber);
		},
		loadSf2: function(input) {
			this.reset();
			$AlphaSynth_Util_Logger.debug('Reading SF2');
			var sf = new $AlphaSynth_Sf2_SoundFont();
			sf.load(input);
			$AlphaSynth_Util_Logger.debug('Building patchbank');
			this.name = sf.info.bankName;
			this.comments = sf.info.comments;
			//load samples
			for (var $t1 = 0; $t1 < sf.presets.sampleHeaders.length; $t1++) {
				var sampleHeader = sf.presets.sampleHeaders[$t1];
				this.$_assets.sampleAssets.push(new $AlphaSynth_Bank_SampleDataAsset(sampleHeader, sf.sampleData));
			}
			//create instrument regions first
			var sfinsts = this.$readSf2Instruments(sf.presets.instruments);
			//load each patch
			for (var $t2 = 0; $t2 < sf.presets.presetHeaders.length; $t2++) {
				var p = sf.presets.presetHeaders[$t2];
				var globalGens = null;
				var i;
				if (p.zones[0].generators.length === 0 || p.zones[0].generators[p.zones[0].generators.length - 1].generatorType !== 41) {
					globalGens = p.zones[0].generators;
					i = 1;
				}
				else {
					i = 0;
				}
				var regionList = [];
				while (i < p.zones.length) {
					var presetLoKey = 0;
					var presetHiKey = 127;
					var presetLoVel = 0;
					var presetHiVel = 127;
					if (p.zones[i].generators[0].generatorType === 43) {
						if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
							presetLoKey = p.zones[i].generators[0].get_amountInt16() & 255 & 255;
							presetHiKey = p.zones[i].generators[0].get_amountInt16() >> 8 & 255 & 255;
						}
						else {
							presetHiKey = p.zones[i].generators[0].get_amountInt16() & 255 & 255;
							presetLoKey = p.zones[i].generators[0].get_amountInt16() >> 8 & 255 & 255;
						}
						if (p.zones[i].generators.length > 1 && p.zones[i].generators[1].generatorType === 44) {
							if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
								presetLoVel = p.zones[i].generators[1].get_amountInt16() & 255 & 255;
								presetHiVel = p.zones[i].generators[1].get_amountInt16() >> 8 & 255 & 255;
							}
							else {
								presetHiVel = p.zones[i].generators[1].get_amountInt16() & 255 & 255;
								presetLoVel = p.zones[i].generators[1].get_amountInt16() >> 8 & 255 & 255;
							}
						}
					}
					else if (p.zones[i].generators[0].generatorType === 44) {
						if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
							presetLoVel = p.zones[i].generators[0].get_amountInt16() & 255 & 255;
							presetHiVel = p.zones[i].generators[0].get_amountInt16() >> 8 & 255 & 255;
						}
						else {
							presetHiVel = p.zones[i].generators[0].get_amountInt16() & 255 & 255;
							presetLoVel = p.zones[i].generators[0].get_amountInt16() >> 8 & 255 & 255;
						}
					}
					if (p.zones[i].generators[p.zones[i].generators.length - 1].generatorType === 41) {
						var insts = sfinsts[p.zones[i].generators[p.zones[i].generators.length - 1].get_amountInt16()];
						for (var $t3 = 0; $t3 < insts.length; $t3++) {
							var inst = insts[$t3];
							var instLoKey;
							var instHiKey;
							var instLoVel;
							var instHiVel;
							if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
								instLoKey = inst.generators[43] & 255 & 255;
								instHiKey = inst.generators[43] >> 8 & 255 & 255;
								instLoVel = inst.generators[44] & 255 & 255;
								instHiVel = inst.generators[44] >> 8 & 255 & 255;
							}
							else {
								instHiKey = inst.generators[43] & 255 & 255;
								instLoKey = inst.generators[43] >> 8 & 255 & 255;
								instHiVel = inst.generators[44] & 255 & 255;
								instLoVel = inst.generators[44] >> 8 & 255 & 255;
							}
							if (instLoKey <= presetHiKey && presetLoKey <= instHiKey && (instLoVel <= presetHiVel && presetLoVel <= instHiVel)) {
								var r = new $AlphaSynth_Sf2_Sf2Region();
								$AlphaSynth_Platform_Std.arrayCopy(ss.Int32).call(null, inst.generators, 0, r.generators, 0, r.generators.length);
								this.$readSf2Region(r, globalGens, p.zones[i].generators, true);
								regionList.push(r);
							}
						}
					}
					i++;
				}
				var mp = new $AlphaSynth_Bank_Patch_MultiPatch(p.name);
				mp.loadSf2(regionList.slice(0), this.$_assets);
				this.$_assets.patchAssets.push(new $AlphaSynth_Bank_PatchAsset(mp.name, mp));
				this.$assignPatchToBank(mp, p.bankNumber, p.patchNumber, p.patchNumber);
			}
		},
		$readSf2Instruments: function(instruments) {
			var regions = new Array(instruments.length);
			for (var x = 0; x < instruments.length; x++) {
				var globalGens = null;
				var i;
				if (instruments[x].zones[0].generators.length === 0 || instruments[x].zones[0].generators[instruments[x].zones[0].generators.length - 1].generatorType !== 53) {
					globalGens = instruments[x].zones[0].generators;
					i = 1;
				}
				else {
					i = 0;
				}
				regions[x] = new Array(instruments[x].zones.length - i);
				for (var j = 0; j < regions[x].length; j++) {
					var r = new $AlphaSynth_Sf2_Sf2Region();
					r.applyDefaultValues();
					this.$readSf2Region(r, globalGens, instruments[x].zones[j + i].generators, false);
					regions[x][j] = r;
				}
			}
			return regions;
		},
		$readSf2Region: function(region, globals, gens, isRelative) {
			if (!isRelative) {
				if (ss.isValue(globals)) {
					for (var x = 0; x < globals.length; x++) {
						region.generators[globals[x].generatorType] = globals[x].get_amountInt16();
					}
				}
				for (var x1 = 0; x1 < gens.length; x1++) {
					region.generators[gens[x1].generatorType] = gens[x1].get_amountInt16();
				}
			}
			else {
				var genList = [];
				for (var $t1 = 0; $t1 < gens.length; $t1++) {
					var generator = gens[$t1];
					genList.push(generator);
				}
				if (ss.isValue(globals)) {
					for (var x2 = 0; x2 < globals.length; x2++) {
						var found = false;
						for (var i = 0; i < genList.length; i++) {
							if (genList[i].generatorType === globals[x2].generatorType) {
								found = true;
								break;
							}
						}
						if (!found) {
							genList.push(globals[x2]);
						}
					}
				}
				for (var x3 = 0; x3 < genList.length; x3++) {
					var value = genList[x3].generatorType;
					if (value < 5 || value === 12 || value === 45 || value === 46 || value === 47 || value === 50 || value === 54 || value === 57 || value === 58) {
						continue;
					}
					else if (value === 43 || value === 44) {
						var lo_a;
						var hi_a;
						var lo_b;
						var hi_b;
						if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
							lo_a = region.generators[value] & 255 & 255;
							hi_a = region.generators[value] >> 8 & 255 & 255;
							lo_b = genList[x3].get_amountInt16() & 255 & 255;
							hi_b = genList[x3].get_amountInt16() >> 8 & 255 & 255;
						}
						else {
							hi_a = region.generators[value] & 255 & 255;
							lo_a = region.generators[value] >> 8 & 255 & 255;
							hi_b = genList[x3].get_amountInt16() & 255 & 255;
							lo_b = genList[x3].get_amountInt16() >> 8 & 255 & 255;
						}
						lo_a = Math.max(lo_a, lo_b);
						hi_a = Math.min(hi_a, hi_b);
						if (lo_a > hi_a) {
							throw new ss.Exception('Invalid sf2 region. The range generators do not intersect.');
						}
						if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
							var $t2 = lo_a | hi_a << 8;
							region.generators[value] = (($t2 & 65535) >> 15) * -65536 + ($t2 & 65535);
						}
						else {
							var $t3 = lo_a << 8 | hi_a;
							region.generators[value] = (($t3 & 65535) >> 15) * -65536 + ($t3 & 65535);
						}
					}
					else {
						var $t5 = region.generators;
						var $t4 = region.generators[value] + genList[x3].get_amountInt16();
						$t5[value] = (($t4 & 65535) >> 15) * -65536 + ($t4 & 65535);
					}
				}
			}
		},
		$assignPatchToBank: function(patch, bankNumber, startRange, endRange) {
			if (bankNumber < 0) {
				return;
			}
			if (startRange > endRange) {
				var range = startRange;
				startRange = endRange;
				endRange = range;
			}
			if (startRange < 0 || startRange >= $AlphaSynth_Bank_PatchBank.bankSize) {
				throw new ss.Exception('startRange out of range');
			}
			if (endRange < 0 || endRange >= $AlphaSynth_Bank_PatchBank.bankSize) {
				throw new ss.Exception('endRange out of range');
			}
			var patches;
			if (this.$_bank.hasOwnProperty(bankNumber)) {
				patches = this.$_bank[bankNumber];
			}
			else {
				patches = new Array($AlphaSynth_Bank_PatchBank.bankSize);
				this.$_bank[bankNumber] = patches;
			}
			for (var x = startRange; x <= endRange; x++) {
				patches[x] = patch;
			}
		}
	});
	ss.initClass($AlphaSynth_Bank_SampleDataAsset, $asm, {});
	ss.initClass($AlphaSynth_Bank_Components_Envelope, $asm, {
		get_value: function() {
			return this.$1$ValueField;
		},
		set_value: function(value) {
			this.$1$ValueField = value;
		},
		get_currentStage: function() {
			return this.$1$CurrentStageField;
		},
		set_currentStage: function(value) {
			this.$1$CurrentStageField = value;
		},
		get_depth: function() {
			return this.$1$DepthField;
		},
		set_depth: function(value) {
			this.$1$DepthField = value;
		},
		quickSetupSf2: function(sampleRate, note, keyNumToHold, keyNumToDecay, isVolumeEnvelope, envelopeInfo) {
			this.set_depth(envelopeInfo.depth);
			// Delay
			this.$_stages[0].offset = 0;
			this.$_stages[0].scale = 0;
			this.$_stages[0].time = Math.max(0, ss.Int32.trunc(sampleRate * envelopeInfo.delayTime));
			// Attack
			this.$_stages[1].offset = envelopeInfo.startLevel;
			this.$_stages[1].scale = envelopeInfo.peakLevel - envelopeInfo.startLevel;
			this.$_stages[1].time = Math.max(0, ss.Int32.trunc(sampleRate * envelopeInfo.attackTime));
			this.$_stages[1].graph = $AlphaSynth_Util_Tables.envelopeTables(envelopeInfo.attackGraph);
			// Hold
			this.$_stages[2].offset = 0;
			this.$_stages[2].scale = envelopeInfo.peakLevel;
			this.$_stages[2].time = ss.Int32.trunc(Math.max(0, sampleRate * envelopeInfo.holdTime * Math.pow(2, (60 - note) * keyNumToHold / 1200)));
			// Decay
			this.$_stages[3].offset = envelopeInfo.sustainLevel;
			this.$_stages[3].scale = envelopeInfo.peakLevel - envelopeInfo.sustainLevel;
			if (envelopeInfo.sustainLevel === envelopeInfo.peakLevel) {
				this.$_stages[3].time = 0;
			}
			else {
				this.$_stages[3].time = Math.max(0, ss.Int32.trunc(sampleRate * envelopeInfo.decayTime * Math.pow(2, (60 - note) * keyNumToDecay / 1200)));
			}
			this.$_stages[3].graph = $AlphaSynth_Util_Tables.envelopeTables(envelopeInfo.decayGraph);
			// Sustain
			this.$_stages[4].offset = 0;
			this.$_stages[4].scale = envelopeInfo.sustainLevel;
			this.$_stages[4].time = ss.Int32.trunc(sampleRate * envelopeInfo.sustainTime);
			// Release
			this.$_stages[5].scale = ((this.$_stages[3].time === 0 && this.$_stages[4].time === 0) ? envelopeInfo.peakLevel : this.$_stages[4].scale);
			if (isVolumeEnvelope) {
				this.$_stages[5].offset = -100;
				this.$_stages[5].scale += 100;
				this.$_stages[6].scale = -100;
			}
			else {
				this.$_stages[5].offset = 0;
				this.$_stages[6].scale = 0;
			}
			this.$_stages[5].time = Math.max(0, ss.Int32.trunc(sampleRate * envelopeInfo.releaseTime));
			this.$_stages[5].graph = $AlphaSynth_Util_Tables.envelopeTables(envelopeInfo.releaseGraph);
			this.$_index = 0;
			this.set_value(0);
			this.set_currentStage(0);
			while (this.$_stages[this.get_currentStage()].time === 0) {
				this.set_currentStage(this.get_currentStage() + 1);
			}
			this.$_stage = this.$_stages[this.get_currentStage()];
		},
		increment: function(samples) {
			do {
				var neededSamples = this.$_stage.time - this.$_index;
				if (neededSamples > samples) {
					this.$_index += samples;
					samples = 0;
				}
				else {
					this.$_index = 0;
					if (this.get_currentStage() !== 6) {
						do {
							var $t2 = this.$_stages;
							var $t1 = this.get_currentStage() + 1;
							this.set_currentStage($t1);
							this.$_stage = $t2[$t1];
						} while (this.$_stage.time === 0);
					}
					samples -= neededSamples;
				}
			} while (samples > 0);
			var i = ss.Int32.trunc(this.$_stage.graph.get_length() * (this.$_index / this.$_stage.time));
			if (this.$_stage.reverse) {
				this.set_value((1 - this.$_stage.graph[i]) * this.$_stage.scale + this.$_stage.offset);
			}
			else {
				this.set_value(this.$_stage.graph[i] * this.$_stage.scale + this.$_stage.offset);
			}
		},
		release: function(lowerLimit) {
			if (this.get_value() <= lowerLimit) {
				this.$_index = 0;
				this.set_currentStage(6);
				this.$_stage = this.$_stages[this.get_currentStage()];
			}
			else if (this.get_currentStage() < 5) {
				this.$_index = 0;
				this.set_currentStage(5);
				this.$_stage = this.$_stages[this.get_currentStage()];
				this.$_stage.scale = this.get_value();
			}
		},
		releaseSf2VolumeEnvelope: function() {
			if (this.get_value() <= -100) {
				this.$_index = 0;
				this.set_currentStage(6);
				this.$_stage = this.$_stages[this.get_currentStage()];
			}
			else if (this.get_currentStage() < 5) {
				this.$_index = 0;
				this.set_currentStage(5);
				this.$_stage = this.$_stages[this.get_currentStage()];
				this.$_stage.offset = -100;
				this.$_stage.scale = 100 + this.get_value();
			}
		}
	});
	ss.initClass($AlphaSynth_Bank_Components_EnvelopeStage, $asm, {});
	ss.initEnum($AlphaSynth_Bank_Components_EnvelopeState, $asm, { delay: 0, attack: 1, hold: 2, decay: 3, sustain: 4, release: 5, none: 6 });
	ss.initClass($AlphaSynth_Bank_Components_Filter, $asm, {
		get_cutOff: function() {
			return this.$_cutOff;
		},
		set_cutOff: function(value) {
			this.$_cutOff = value;
			this.set_coeffNeedsUpdating(true);
		},
		get_resonance: function() {
			return this.$_resonance;
		},
		set_resonance: function(value) {
			this.$_resonance = value;
			this.set_coeffNeedsUpdating(true);
		},
		get_enabled: function() {
			return this.filterMethod !== 0;
		},
		get_coeffNeedsUpdating: function() {
			return this.$1$CoeffNeedsUpdatingField;
		},
		set_coeffNeedsUpdating: function(value) {
			this.$1$CoeffNeedsUpdatingField = value;
		},
		disable: function() {
			this.filterMethod = 0;
		},
		quickSetup: function(sampleRate, note, velocity, filterInfo) {
			this.set_coeffNeedsUpdating(false);
			this.set_cutOff(filterInfo.cutOff);
			this.set_resonance(filterInfo.resonance);
			this.filterMethod = filterInfo.filterMethod;
			this.$_a1 = 0;
			this.$_a2 = 0;
			this.$_b1 = 0;
			this.$_b2 = 0;
			this.$_m1 = 0;
			this.$_m2 = 0;
			this.$_m3 = 0;
			if (this.get_cutOff() <= 0 || this.get_resonance() <= 0) {
				this.filterMethod = 0;
			}
			if (this.filterMethod !== 0) {
				this.set_cutOff(this.get_cutOff() * $AlphaSynth_Synthesis_SynthHelper.centsToPitch((note - filterInfo.rootKey) * filterInfo.keyTrack + ss.Int32.trunc(velocity * filterInfo.velTrack)));
				this.updateCoefficients(sampleRate);
			}
		},
		applyFilter$1: function(sample) {
			switch (this.filterMethod) {
				case 2:
				case 1: {
					this.$_m3 = sample - this.$_a1 * this.$_m1 - this.$_a2 * this.$_m2;
					sample = this.$_b2 * (this.$_m3 + this.$_m2) + this.$_b1 * this.$_m1;
					this.$_m2 = this.$_m1;
					this.$_m1 = this.$_m3;
					return sample;
				}
				case 3: {
					this.$_m1 += this.$_a1 * (sample - this.$_m1);
					return this.$_m1;
				}
				default: {
					return 0;
				}
			}
		},
		applyFilter: function(data) {
			switch (this.filterMethod) {
				case 2:
				case 1: {
					for (var x = 0; x < data.get_length(); x++) {
						this.$_m3 = data[x] - this.$_a1 * this.$_m1 - this.$_a2 * this.$_m2;
						data[x] = this.$_b2 * (this.$_m3 + this.$_m2) + this.$_b1 * this.$_m1;
						this.$_m2 = this.$_m1;
						this.$_m1 = this.$_m3;
					}
					break;
				}
				case 3: {
					for (var x1 = 0; x1 < data.get_length(); x1++) {
						this.$_m1 += this.$_a1 * (data[x1] - this.$_m1);
						data[x1] = this.$_m1;
					}
					break;
				}
			}
		},
		applyFilterInterp: function(data, sampleRate) {
			var ic = this.$generateFilterCoeff(this.get_cutOff() / sampleRate, this.get_resonance());
			var a1_inc = (ic[0] - this.$_a1) / data.get_length();
			var a2_inc = (ic[1] - this.$_a2) / data.get_length();
			var b1_inc = (ic[2] - this.$_b1) / data.get_length();
			var b2_inc = (ic[3] - this.$_b2) / data.get_length();
			switch (this.filterMethod) {
				case 2:
				case 1: {
					for (var x = 0; x < data.get_length(); x++) {
						this.$_a1 += a1_inc;
						this.$_a2 += a2_inc;
						this.$_b1 += b1_inc;
						this.$_b2 += b2_inc;
						this.$_m3 = data[x] - this.$_a1 * this.$_m1 - this.$_a2 * this.$_m2;
						data[x] = this.$_b2 * (this.$_m3 + this.$_m2) + this.$_b1 * this.$_m1;
						this.$_m2 = this.$_m1;
						this.$_m1 = this.$_m3;
					}
					this.$_a1 = ic[0];
					this.$_a2 = ic[1];
					this.$_b1 = ic[2];
					this.$_b2 = ic[3];
					break;
				}
				case 3: {
					for (var x1 = 0; x1 < data.get_length(); x1++) {
						this.$_a1 += a1_inc;
						this.$_m1 += this.$_a1 * (data[x1] - this.$_m1);
						data[x1] = this.$_m1;
					}
					this.$_a1 = ic[0];
					break;
				}
			}
			this.set_coeffNeedsUpdating(false);
		},
		updateCoefficients: function(sampleRate) {
			var coeff = this.$generateFilterCoeff(this.get_cutOff() / sampleRate, this.get_resonance());
			this.$_a1 = coeff[0];
			this.$_a2 = coeff[1];
			this.$_b1 = coeff[2];
			this.$_b2 = coeff[3];
			this.set_coeffNeedsUpdating(false);
		},
		$generateFilterCoeff: function(fc, q) {
			fc = $AlphaSynth_Synthesis_SynthHelper.clampD(fc, $AlphaSynth_Util_SynthConstants.denormLimit, 0.49);
			var coeff = new Array(4);
			switch (this.filterMethod) {
				case 1: {
					{
						var w0 = $AlphaSynth_Util_SynthConstants.twoPi * fc;
						var cosw0 = Math.cos(w0);
						var alpha = Math.sin(w0) / (2 * q);
						var a0inv = 1 / (1 + alpha);
						coeff[0] = -2 * cosw0 * a0inv;
						coeff[1] = (1 - alpha) * a0inv;
						coeff[2] = (1 - cosw0) * a0inv * (1 / Math.sqrt(q));
						coeff[3] = this.$_b1 * 0.5;
					}
					break;
				}
				case 2: {
					{
						var w01 = $AlphaSynth_Util_SynthConstants.twoPi * fc;
						var cosw01 = Math.cos(w01);
						var alpha1 = Math.sin(w01) / (2 * q);
						var a0inv1 = 1 / (1 + alpha1);
						var qinv = 1 / Math.sqrt(q);
						coeff[0] = -2 * cosw01 * a0inv1;
						coeff[1] = (1 - alpha1) * a0inv1;
						coeff[2] = (-1 - cosw01) * a0inv1 * qinv;
						coeff[3] = (1 + cosw01) * a0inv1 * qinv * 0.5;
					}
					break;
				}
				case 3: {
					coeff[0] = 1 - Math.exp(-2 * Math.PI * fc);
					break;
				}
			}
			return coeff;
		}
	});
	ss.initEnum($AlphaSynth_Bank_Components_FilterType, $asm, { none: 0, biquadLowpass: 1, biquadHighpass: 2, onePoleLowpass: 3 });
	ss.initClass($AlphaSynth_Bank_Components_Lfo, $asm, {
		get_frequency: function() {
			return this.$1$FrequencyField;
		},
		set_frequency: function(value) {
			this.$1$FrequencyField = value;
		},
		get_currentState: function() {
			return this.$1$CurrentStateField;
		},
		set_currentState: function(value) {
			this.$1$CurrentStateField = value;
		},
		get_value: function() {
			return this.$1$ValueField;
		},
		set_value: function(value) {
			this.$1$ValueField = value;
		},
		get_depth: function() {
			return this.$1$DepthField;
		},
		set_depth: function(value) {
			this.$1$DepthField = value;
		},
		quickSetup: function(sampleRate, lfoInfo) {
			this.$_generator = lfoInfo.get_generator();
			this.$_delayTime = ss.Int32.trunc(sampleRate * lfoInfo.get_delayTime());
			this.set_frequency(lfoInfo.get_frequency());
			this.$_increment = this.$_generator.period * this.get_frequency() / sampleRate;
			this.set_depth(lfoInfo.get_depth());
			this.reset();
		},
		increment: function(amount) {
			if (this.get_currentState() === 0) {
				this.$_phase -= amount;
				if (this.$_phase <= 0) {
					this.$_phase = this.$_generator.loopStartPhase + this.$_increment * -this.$_phase;
					this.set_value(this.$_generator.getValue(this.$_phase));
					this.set_currentState(1);
				}
			}
			else {
				this.$_phase += this.$_increment * amount;
				if (this.$_phase >= this.$_generator.loopEndPhase) {
					this.$_phase = this.$_generator.loopStartPhase + (this.$_phase - this.$_generator.loopEndPhase) % (this.$_generator.loopEndPhase - this.$_generator.loopStartPhase);
				}
				this.set_value(this.$_generator.getValue(this.$_phase));
			}
		},
		reset: function() {
			this.set_value(0);
			if (this.$_delayTime > 0) {
				this.$_phase = this.$_delayTime;
				this.set_currentState(0);
			}
			else {
				this.$_phase = 0;
				this.set_currentState(1);
			}
		}
	});
	ss.initEnum($AlphaSynth_Bank_Components_LfoState, $asm, { delay: 0, sustain: 1 });
	ss.initClass($AlphaSynth_Bank_Components_PanComponent, $asm, {
		setValue: function(value, formula) {
			value = $AlphaSynth_Synthesis_SynthHelper.clampF(value, -1, 1);
			var dvalue;
			switch (formula) {
				case 0: {
					dvalue = $AlphaSynth_Util_SynthConstants.halfPi * (value + 1) / 2;
					this.left = Math.cos(dvalue);
					this.right = Math.sin(dvalue);
					break;
				}
				case 1: {
					this.left = 0.5 + value * -0.5;
					this.right = 0.5 + value * 0.5;
					break;
				}
				case 2: {
					dvalue = $AlphaSynth_Util_SynthConstants.halfPi * (value + 1) / 2;
					this.left = Math.cos(dvalue) / $AlphaSynth_Util_SynthConstants.inverseSqrtOfTwo;
					this.right = Math.sin(dvalue) / $AlphaSynth_Util_SynthConstants.inverseSqrtOfTwo;
					break;
				}
				default: {
					throw new ss.Exception('Invalid pan law selected.');
				}
			}
		}
	});
	ss.initEnum($AlphaSynth_Bank_Components_PanFormulaEnum, $asm, { neg3dBCenter: 0, neg6dBCenter: 1, zeroCenter: 2 });
	ss.initClass($AlphaSynth_Bank_Components_Generators_DefaultGenerators, $asm, {});
	ss.initClass($AlphaSynth_Bank_Components_Generators_Generator, $asm, {
		release: function(generatorParams) {
			if (this.loopMode === 3) {
				generatorParams.currentState = 2;
				generatorParams.currentStart = this.startPhase;
				generatorParams.currentEnd = this.endPhase;
			}
		},
		getValue: null,
		getValues: function(generatorParams, blockBuffer, increment) {
			var proccessed = 0;
			do {
				var samplesAvailable = ss.Int32.trunc(Math.ceil((generatorParams.currentEnd - generatorParams.phase) / increment));
				if (samplesAvailable > blockBuffer.get_length() - proccessed) {
					while (proccessed < blockBuffer.get_length()) {
						blockBuffer[proccessed++] = this.getValue(generatorParams.phase);
						generatorParams.phase += increment;
					}
				}
				else {
					var endProccessed = proccessed + samplesAvailable;
					while (proccessed < endProccessed) {
						blockBuffer[proccessed++] = this.getValue(generatorParams.phase);
						generatorParams.phase += increment;
					}
					switch (generatorParams.currentState) {
						case 0: {
							generatorParams.currentStart = this.loopStartPhase;
							generatorParams.currentEnd = this.loopEndPhase;
							generatorParams.currentState = 1;
							break;
						}
						case 1: {
							generatorParams.phase += generatorParams.currentStart - generatorParams.currentEnd;
							break;
						}
						case 2: {
							generatorParams.currentState = 3;
							while (proccessed < blockBuffer.get_length()) {
								blockBuffer[proccessed++] = 0;
							}
							break;
						}
					}
				}
			} while (proccessed < blockBuffer.get_length());
		}
	});
	ss.initClass($AlphaSynth_Bank_Components_Generators_GeneratorParameters, $asm, {
		quickSetup: function(generator) {
			this.currentStart = generator.startPhase;
			this.phase = this.currentStart + generator.offset;
			switch (generator.loopMode) {
				case 2:
				case 3: {
					if (this.phase >= generator.endPhase) {
						//phase is greater than the end index so generator is finished
						this.currentState = 3;
					}
					else if (this.phase >= generator.loopEndPhase) {
						//phase is greater than the loop end point so generator is in post loop
						this.currentState = 2;
						this.currentEnd = generator.endPhase;
					}
					else if (this.phase >= generator.loopStartPhase) {
						//phase is greater than loop start so we are inside the loop
						this.currentState = 1;
						this.currentEnd = generator.loopEndPhase;
						this.currentStart = generator.loopStartPhase;
					}
					else {
						//phase is less than the loop so generator is in pre loop
						this.currentState = 0;
						this.currentEnd = generator.loopStartPhase;
					}
					break;
				}
				default: {
					this.currentEnd = generator.endPhase;
					if (this.phase >= this.currentEnd) {
						this.currentState = 3;
					}
					else {
						this.currentState = 2;
					}
					break;
				}
			}
		}
	});
	ss.initEnum($AlphaSynth_Bank_Components_Generators_GeneratorState, $asm, { preLoop: 0, loop: 1, postLoop: 2, finished: 3 });
	ss.initEnum($AlphaSynth_Bank_Components_Generators_Interpolation, $asm, { none: 0, linear: 1, cosine: 2, cubicSpline: 3, sinc: 4 });
	ss.initEnum($AlphaSynth_Bank_Components_Generators_LoopMode, $asm, { noLoop: 0, oneShot: 1, continuous: 2, loopUntilNoteOff: 3 });
	ss.initClass($AlphaSynth_Bank_Components_Generators_SampleGenerator, $asm, {
		getValue: function(phase) {
			return this.samples.get_item(ss.Int32.trunc(phase));
		},
		getValues: function(generatorParams, blockBuffer, increment) {
			var proccessed = 0;
			do {
				var samplesAvailable = ss.Int32.trunc(Math.ceil((generatorParams.currentEnd - generatorParams.phase) / increment));
				if (samplesAvailable > blockBuffer.get_length() - proccessed) {
					this.$interpolate(generatorParams, blockBuffer, increment, proccessed, blockBuffer.get_length());
					return;
					//proccessed = blockBuffer.Length;
				}
				else {
					var endProccessed = proccessed + samplesAvailable;
					this.$interpolate(generatorParams, blockBuffer, increment, proccessed, endProccessed);
					proccessed = endProccessed;
					switch (generatorParams.currentState) {
						case 0: {
							generatorParams.currentStart = this.loopStartPhase;
							generatorParams.currentEnd = this.loopEndPhase;
							generatorParams.currentState = 1;
							break;
						}
						case 1: {
							generatorParams.phase += generatorParams.currentStart - generatorParams.currentEnd;
							break;
						}
						case 2: {
							generatorParams.currentState = 3;
							while (proccessed < blockBuffer.get_length()) {
								blockBuffer[proccessed++] = 0;
							}
							break;
						}
					}
				}
			} while (proccessed < blockBuffer.get_length());
		},
		$interpolate: function(generatorParams, blockBuffer, increment, start, end) {
			switch ($AlphaSynth_Util_SynthConstants.interpolationMode) {
				case 1: {
					{
						var _end = ((generatorParams.currentState === 1) ? (this.loopEndPhase - 1) : (this.endPhase - 1));
						var index;
						var s1, s2, mu;
						while (start < end && generatorParams.phase < _end) {
							index = ss.Int32.trunc(generatorParams.phase);
							s1 = this.samples.get_item(index);
							s2 = this.samples.get_item(index + 1);
							mu = generatorParams.phase - index;
							blockBuffer[start++] = s1 + mu * (s2 - s1);
							generatorParams.phase += increment;
						}
						while (start < end) {
							index = ss.Int32.trunc(generatorParams.phase);
							s1 = this.samples.get_item(index);
							if (generatorParams.currentState === 1) {
								s2 = this.samples.get_item(ss.Int32.trunc(generatorParams.currentStart));
							}
							else {
								s2 = s1;
							}
							mu = generatorParams.phase - index;
							blockBuffer[start++] = s1 + mu * (s2 - s1);
							generatorParams.phase += increment;
						}
					}
					break;
				}
				case 2: {
					{
						var _end1 = ((generatorParams.currentState === 1) ? (this.loopEndPhase - 1) : (this.endPhase - 1));
						var index1;
						var s11, s21, mu1;
						while (start < end && generatorParams.phase < _end1) {
							index1 = ss.Int32.trunc(generatorParams.phase);
							s11 = this.samples.get_item(index1);
							s21 = this.samples.get_item(index1 + 1);
							mu1 = (1 - Math.cos((generatorParams.phase - index1) * Math.PI)) * 0.5;
							blockBuffer[start++] = s11 * (1 - mu1) + s21 * mu1;
							generatorParams.phase += increment;
						}
						while (start < end) {
							index1 = ss.Int32.trunc(generatorParams.phase);
							s11 = this.samples.get_item(index1);
							if (generatorParams.currentState === 1) {
								s21 = this.samples.get_item(ss.Int32.trunc(generatorParams.currentStart));
							}
							else {
								s21 = s11;
							}
							mu1 = (1 - Math.cos((generatorParams.phase - index1) * Math.PI)) * 0.5;
							blockBuffer[start++] = s11 * (1 - mu1) + s21 * mu1;
							generatorParams.phase += increment;
						}
					}
					break;
				}
				case 3: {
					{
						var _end2 = ((generatorParams.currentState === 1) ? (this.loopStartPhase + 1) : (this.startPhase + 1));
						var index2;
						var s0, s12, s22, s3, mu2;
						while (start < end && generatorParams.phase < _end2) {
							index2 = ss.Int32.trunc(generatorParams.phase);
							if (generatorParams.currentState === 1) {
								s0 = this.samples.get_item(ss.Int32.trunc(generatorParams.currentEnd) - 1);
							}
							else {
								s0 = this.samples.get_item(index2);
							}
							s12 = this.samples.get_item(index2);
							s22 = this.samples.get_item(index2 + 1);
							s3 = this.samples.get_item(index2 + 2);
							mu2 = generatorParams.phase - index2;
							blockBuffer[start++] = (-0.5 * s0 + 1.5 * s12 - 1.5 * s22 + 0.5 * s3) * mu2 * mu2 * mu2 + (s0 - 2.5 * s12 + 2 * s22 - 0.5 * s3) * mu2 * mu2 + (-0.5 * s0 + 0.5 * s22) * mu2 + s12;
							generatorParams.phase += increment;
						}
						_end2 = ((generatorParams.currentState === 1) ? (this.loopEndPhase - 2) : (this.endPhase - 2));
						while (start < end && generatorParams.phase < _end2) {
							index2 = ss.Int32.trunc(generatorParams.phase);
							s0 = this.samples.get_item(index2 - 1);
							s12 = this.samples.get_item(index2);
							s22 = this.samples.get_item(index2 + 1);
							s3 = this.samples.get_item(index2 + 2);
							mu2 = generatorParams.phase - index2;
							blockBuffer[start++] = (-0.5 * s0 + 1.5 * s12 - 1.5 * s22 + 0.5 * s3) * mu2 * mu2 * mu2 + (s0 - 2.5 * s12 + 2 * s22 - 0.5 * s3) * mu2 * mu2 + (-0.5 * s0 + 0.5 * s22) * mu2 + s12;
							generatorParams.phase += increment;
						}
						_end2 += 1;
						while (start < end) {
							index2 = ss.Int32.trunc(generatorParams.phase);
							s0 = this.samples.get_item(index2 - 1);
							s12 = this.samples.get_item(index2);
							if (generatorParams.phase < _end2) {
								s22 = this.samples.get_item(index2 + 1);
								if (generatorParams.currentState === 1) {
									s3 = this.samples.get_item(ss.Int32.trunc(generatorParams.currentStart));
								}
								else {
									s3 = s22;
								}
							}
							else if (generatorParams.currentState === 1) {
								s22 = this.samples.get_item(ss.Int32.trunc(generatorParams.currentStart));
								s3 = this.samples.get_item(ss.Int32.trunc(generatorParams.currentStart) + 1);
							}
							else {
								s22 = s12;
								s3 = s12;
							}
							mu2 = generatorParams.phase - index2;
							blockBuffer[start++] = (-0.5 * s0 + 1.5 * s12 - 1.5 * s22 + 0.5 * s3) * mu2 * mu2 * mu2 + (s0 - 2.5 * s12 + 2 * s22 - 0.5 * s3) * mu2 * mu2 + (-0.5 * s0 + 0.5 * s22) * mu2 + s12;
							generatorParams.phase += increment;
						}
					}
					break;
				}
				default: {
					{
						while (start < end) {
							blockBuffer[start++] = this.samples.get_item(ss.Int32.trunc(generatorParams.phase));
							generatorParams.phase += increment;
						}
					}
					break;
				}
			}
		}
	}, $AlphaSynth_Bank_Components_Generators_Generator);
	ss.initClass($AlphaSynth_Bank_Components_Generators_SawGenerator, $asm, {
		getValue: function(phase) {
			return 2 * (phase - Math.floor(phase + 0.5));
		}
	}, $AlphaSynth_Bank_Components_Generators_Generator);
	ss.initClass($AlphaSynth_Bank_Components_Generators_SineGenerator, $asm, {
		getValue: function(phase) {
			return Math.sin(phase);
		}
	}, $AlphaSynth_Bank_Components_Generators_Generator);
	ss.initClass($AlphaSynth_Bank_Components_Generators_SquareGenerator, $asm, {
		getValue: function(phase) {
			var $t1 = Math.sin(phase);
			return (($t1 > 0) ? 1 : (($t1 < 0) ? -1 : 0));
		}
	}, $AlphaSynth_Bank_Components_Generators_Generator);
	ss.initClass($AlphaSynth_Bank_Components_Generators_TriangleGenerator, $asm, {
		getValue: function(phase) {
			return Math.abs(phase - Math.floor(phase + 0.5)) * 4 - 1;
		}
	}, $AlphaSynth_Bank_Components_Generators_Generator);
	ss.initClass($AlphaSynth_Bank_Components_Generators_WhiteNoiseGenerator, $asm, {
		getValue: function(phase) {
			return $AlphaSynth_Platform_Std.random() * 2 - 1;
		}
	}, $AlphaSynth_Bank_Components_Generators_Generator);
	ss.initClass($AlphaSynth_Bank_Descriptors_EnvelopeDescriptor, $asm, {});
	ss.initClass($AlphaSynth_Bank_Descriptors_FilterDescriptor, $asm, {});
	ss.initClass($AlphaSynth_Bank_Descriptors_GeneratorDescriptor, $asm, {});
	ss.initClass($AlphaSynth_Bank_Descriptors_LfoDescriptor, $asm, {
		get_delayTime: function() {
			return this.$1$DelayTimeField;
		},
		set_delayTime: function(value) {
			this.$1$DelayTimeField = value;
		},
		get_frequency: function() {
			return this.$1$FrequencyField;
		},
		set_frequency: function(value) {
			this.$1$FrequencyField = value;
		},
		get_depth: function() {
			return this.$1$DepthField;
		},
		set_depth: function(value) {
			this.$1$DepthField = value;
		},
		get_generator: function() {
			return this.$1$GeneratorField;
		},
		set_generator: function(value) {
			this.$1$GeneratorField = value;
		}
	});
	ss.initEnum($AlphaSynth_Bank_Descriptors_Waveform, $asm, { sine: 0, square: 1, saw: 2, triangle: 3, sampleData: 4, whiteNoise: 5 });
	ss.initEnum($AlphaSynth_Bank_Patch_IntervalType, $asm, { channelKeyVelocity: 0, channelKey: 1, keyVelocity: 2, key: 3 });
	ss.initClass($AlphaSynth_Bank_Patch_Patch, $asm, { start: null, process: null, stop: null });
	ss.initClass($AlphaSynth_Bank_Patch_MultiPatch, $asm, {
		findPatches: function(channel, key, velocity, layers) {
			var count = 0;
			switch (this.$_intervalType) {
				case 0: {
					for (var x = 0; x < this.$_intervalList.length; x++) {
						if (this.$_intervalList[x].checkAllIntervals(channel, key, velocity)) {
							layers[count++] = this.$_intervalList[x].get_patch();
							if (count === layers.length) {
								break;
							}
						}
					}
					break;
				}
				case 1: {
					for (var x1 = 0; x1 < this.$_intervalList.length; x1++) {
						if (this.$_intervalList[x1].checkChannelAndKey(channel, key)) {
							layers[count++] = this.$_intervalList[x1].get_patch();
							if (count === layers.length) {
								break;
							}
						}
					}
					break;
				}
				case 2: {
					for (var x2 = 0; x2 < this.$_intervalList.length; x2++) {
						if (this.$_intervalList[x2].checkKeyAndVelocity(key, velocity)) {
							layers[count++] = this.$_intervalList[x2].get_patch();
							if (count === layers.length) {
								break;
							}
						}
					}
					break;
				}
				case 3: {
					for (var x3 = 0; x3 < this.$_intervalList.length; x3++) {
						if (this.$_intervalList[x3].checkKey(key)) {
							layers[count++] = this.$_intervalList[x3].get_patch();
							if (count === layers.length) {
								break;
							}
						}
					}
					break;
				}
			}
			return count;
		},
		start: function(voiceparams) {
			return false;
		},
		process: function(voiceparams, startIndex, endIndex) {
		},
		stop: function(voiceparams) {
		},
		loadSf2: function(regions, assets) {
			this.$_intervalList = new Array(regions.length);
			for (var x = 0; x < regions.length; x++) {
				var loKey;
				var hiKey;
				var loVel;
				var hiVel;
				if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
					loKey = regions[x].generators[43] & 255 & 255;
					hiKey = regions[x].generators[43] >> 8 & 255 & 255;
					loVel = regions[x].generators[44] & 255 & 255;
					hiVel = regions[x].generators[44] >> 8 & 255 & 255;
				}
				else {
					hiKey = regions[x].generators[43] & 255 & 255;
					loKey = regions[x].generators[43] >> 8 & 255 & 255;
					hiVel = regions[x].generators[44] & 255 & 255;
					loVel = regions[x].generators[44] >> 8 & 255 & 255;
				}
				var sf2 = new $AlphaSynth_Bank_Patch_Sf2Patch(this.name + '_' + x);
				sf2.load(regions[x], assets);
				this.$_intervalList[x] = new $AlphaSynth_Bank_Patch_PatchInterval(sf2, 0, 15, loKey, hiKey, loVel, hiVel);
			}
			this.$determineIntervalType();
		},
		$determineIntervalType: function() {
			var checkChannel = false;
			var checkVelocity = false;
			for (var x = 0; x < this.$_intervalList.length; x++) {
				if (this.$_intervalList[x].get_startChannel() !== 0 || this.$_intervalList[x].get_endChannel() !== 15) {
					checkChannel = true;
					if (checkChannel && checkVelocity) {
						break;
					}
				}
				if (this.$_intervalList[x].get_startVelocity() !== 0 || this.$_intervalList[x].get_endVelocity() !== 127) {
					checkVelocity = true;
					if (checkChannel && checkVelocity) {
						break;
					}
				}
			}
			if (checkChannel & checkVelocity) {
				this.$_intervalType = 0;
			}
			else if (checkChannel) {
				this.$_intervalType = 1;
			}
			else if (checkVelocity) {
				this.$_intervalType = 2;
			}
			else {
				this.$_intervalType = 3;
			}
		}
	}, $AlphaSynth_Bank_Patch_Patch);
	ss.initClass($AlphaSynth_Bank_Patch_PatchInterval, $asm, {
		get_patch: function() {
			return this.$1$PatchField;
		},
		set_patch: function(value) {
			this.$1$PatchField = value;
		},
		get_startChannel: function() {
			return this.$1$StartChannelField;
		},
		set_startChannel: function(value) {
			this.$1$StartChannelField = value;
		},
		get_startKey: function() {
			return this.$1$StartKeyField;
		},
		set_startKey: function(value) {
			this.$1$StartKeyField = value;
		},
		get_startVelocity: function() {
			return this.$1$StartVelocityField;
		},
		set_startVelocity: function(value) {
			this.$1$StartVelocityField = value;
		},
		get_endChannel: function() {
			return this.$1$EndChannelField;
		},
		set_endChannel: function(value) {
			this.$1$EndChannelField = value;
		},
		get_endKey: function() {
			return this.$1$EndKeyField;
		},
		set_endKey: function(value) {
			this.$1$EndKeyField = value;
		},
		get_endVelocity: function() {
			return this.$1$EndVelocityField;
		},
		set_endVelocity: function(value) {
			this.$1$EndVelocityField = value;
		},
		checkAllIntervals: function(channel, key, velocity) {
			return channel >= this.get_startChannel() && channel <= this.get_endChannel() && (key >= this.get_startKey() && key <= this.get_endKey()) && (velocity >= this.get_startVelocity() && velocity <= this.get_endVelocity());
		},
		checkChannelAndKey: function(channel, key) {
			return channel >= this.get_startChannel() && channel <= this.get_endChannel() && (key >= this.get_startKey() && key <= this.get_endKey());
		},
		checkKeyAndVelocity: function(key, velocity) {
			return key >= this.get_startKey() && key <= this.get_endKey() && (velocity >= this.get_startVelocity() && velocity <= this.get_endVelocity());
		},
		checkKey: function(key) {
			return key >= this.get_startKey() && key <= this.get_endKey();
		}
	});
	ss.initClass($AlphaSynth_Bank_Patch_Sf2Patch, $asm, {
		start: function(voiceparams) {
			var note = ((this.$keyOverride > -1) ? this.$keyOverride : voiceparams.note);
			var vel = ((this.$velOverride > -1) ? this.$velOverride : voiceparams.velocity);
			//setup generator
			voiceparams.generatorParams[0].quickSetup(this.$gen);
			//setup envelopes
			voiceparams.envelopes[0].quickSetupSf2(voiceparams.synthParams.synth.sampleRate, note, this.$keynumToModEnvHold, this.$keynumToModEnvDecay, false, this.$mod_env);
			voiceparams.envelopes[1].quickSetupSf2(voiceparams.synthParams.synth.sampleRate, note, this.$keynumToVolEnvHold, this.$keynumToVolEnvDecay, true, this.$vel_env);
			//setup filter
			//voiceparams.pData[0].int1 = iniFilterFc - (int)(2400 * CalculateModulator(SourceTypeEnum.Linear, TransformEnum.Linear, DirectionEnum.MaxToMin, PolarityEnum.Unipolar, voiceparams.velocity, 0, 127)); 
			//if (iniFilterFc >= 13500 && fltr.Resonance <= 1)
			voiceparams.filters[0].disable();
			//else
			//    voiceparams.filters[0].QuickSetup(voiceparams.synthParams.synth.SampleRate, note, 1f, fltr);
			//setup lfos
			voiceparams.lfos[0].quickSetup(voiceparams.synthParams.synth.sampleRate, this.$mod_lfo);
			voiceparams.lfos[1].quickSetup(voiceparams.synthParams.synth.sampleRate, this.$vib_lfo);
			//calculate initial pitch
			voiceparams.pitchOffset = (note - this.$gen.rootKey) * this.$gen.keyTrack + this.$gen.tune;
			voiceparams.pitchOffset += ss.Int32.trunc(100 * (voiceparams.synthParams.masterCoarseTune + (voiceparams.synthParams.masterFineTune.get_combined() - 8192) / 8192));
			//calculate initial volume
			voiceparams.volOffset = this.$initialAttn;
			voiceparams.volOffset -= 96 * $AlphaSynth_Bank_Patch_Sf2Patch.$calculateModulator(1, 0, 1, 0, voiceparams.velocity, 0, 127);
			voiceparams.volOffset -= 96 * $AlphaSynth_Bank_Patch_Sf2Patch.$calculateModulator(1, 0, 1, 0, voiceparams.synthParams.volume.get_coarse(), 0, 127);
			//check if we have finished before we have begun
			return voiceparams.generatorParams[0].currentState !== 3 && voiceparams.envelopes[1].get_currentStage() !== 6;
		},
		stop: function(voiceparams) {
			this.$gen.release(voiceparams.generatorParams[0]);
			if (this.$gen.loopMode !== 1) {
				voiceparams.envelopes[0].release($AlphaSynth_Util_SynthConstants.denormLimit);
				voiceparams.envelopes[1].releaseSf2VolumeEnvelope();
			}
		},
		process: function(voiceparams, startIndex, endIndex) {
			//--Base pitch calculation
			var basePitch = $AlphaSynth_Synthesis_SynthHelper.centsToPitch(voiceparams.pitchOffset + voiceparams.synthParams.currentPitch) * this.$gen.frequency / voiceparams.synthParams.synth.sampleRate;
			var baseVolume = voiceparams.synthParams.currentVolume * voiceparams.synthParams.synth.get_mixGain();
			//--Main Loop
			for (var x = startIndex; x < endIndex; x += $AlphaSynth_Util_SynthConstants.defaultBlockSize * voiceparams.synthParams.synth.audioChannels) {
				voiceparams.envelopes[0].increment($AlphaSynth_Util_SynthConstants.defaultBlockSize);
				voiceparams.envelopes[1].increment($AlphaSynth_Util_SynthConstants.defaultBlockSize);
				voiceparams.lfos[0].increment($AlphaSynth_Util_SynthConstants.defaultBlockSize);
				voiceparams.lfos[1].increment($AlphaSynth_Util_SynthConstants.defaultBlockSize);
				//--Calculate pitch and get next block of samples
				this.$gen.getValues(voiceparams.generatorParams[0], voiceparams.blockBuffer, basePitch * $AlphaSynth_Synthesis_SynthHelper.centsToPitch(ss.Int32.trunc(voiceparams.envelopes[0].get_value() * this.$modEnvToPitch + voiceparams.lfos[0].get_value() * this.$modLfoToPitch + voiceparams.lfos[1].get_value() * this.$vibLfoToPitch)));
				//--Filter
				if (voiceparams.filters[0].get_enabled()) {
					var centsFc = voiceparams.pData[0].getInt32(0, true) + voiceparams.lfos[0].get_value() * this.$modLfoToFilterFc + voiceparams.envelopes[0].get_value() * this.$modEnvToFilterFc;
					if (centsFc > 13500) {
						centsFc = 13500;
					}
					voiceparams.filters[0].set_cutOff($AlphaSynth_Synthesis_SynthHelper.keyToFrequency(centsFc / 100, 69));
					if (voiceparams.filters[0].get_coeffNeedsUpdating()) {
						voiceparams.filters[0].applyFilterInterp(voiceparams.blockBuffer, voiceparams.synthParams.synth.sampleRate);
					}
					else {
						voiceparams.filters[0].applyFilter(voiceparams.blockBuffer);
					}
				}
				//--Volume calculation
				var volume = $AlphaSynth_Synthesis_SynthHelper.dBtoLinear(voiceparams.volOffset + voiceparams.envelopes[1].get_value() + voiceparams.lfos[0].get_value() * this.$modLfoToVolume) * baseVolume;
				//--Mix block based on number of channels
				if (voiceparams.synthParams.synth.audioChannels === 2) {
					voiceparams.mixMonoToStereoInterp(x, volume * this.$pan.left * voiceparams.synthParams.currentPan.left, volume * this.$pan.right * voiceparams.synthParams.currentPan.right);
				}
				else {
					voiceparams.mixMonoToMonoInterp(x, volume);
				}
				//--Check and end early if necessary
				if (voiceparams.envelopes[1].get_currentStage() > 2 && volume <= $AlphaSynth_Util_SynthConstants.nonAudible || voiceparams.generatorParams[0].currentState === 3) {
					voiceparams.state = 0;
					return;
				}
			}
		},
		load: function(region, assets) {
			this.exclusiveGroup = region.generators[57];
			this.exclusiveGroupTarget = this.exclusiveGroup;
			this.$iniFilterFc = region.generators[8];
			this.$filterQ = $AlphaSynth_Synthesis_SynthHelper.dBtoLinear(region.generators[9] / 10);
			this.$initialAttn = -region.generators[48] / 10;
			this.$keyOverride = region.generators[46];
			this.$velOverride = region.generators[47];
			this.$keynumToModEnvHold = region.generators[31];
			this.$keynumToModEnvDecay = region.generators[32];
			this.$keynumToVolEnvHold = region.generators[39];
			this.$keynumToVolEnvDecay = region.generators[40];
			this.$pan = new $AlphaSynth_Bank_Components_PanComponent();
			this.$pan.setValue(region.generators[17] / 500, 0);
			this.$modLfoToPitch = region.generators[5];
			this.$vibLfoToPitch = region.generators[6];
			this.$modEnvToPitch = region.generators[7];
			this.$modLfoToFilterFc = region.generators[10];
			this.$modEnvToFilterFc = region.generators[11];
			this.$modLfoToVolume = region.generators[13] / 10;
			this.$loadGen(region, assets);
			this.$loadEnvelopes(region);
			this.$loadLfos(region);
			this.$loadFilter(region);
		},
		$loadGen: function(region, assets) {
			var sda = assets.sampleAssets[region.generators[53]];
			this.$gen = new $AlphaSynth_Bank_Components_Generators_SampleGenerator();
			this.$gen.endPhase = sda.end + region.generators[1] + 32768 * region.generators[12];
			this.$gen.frequency = sda.sampleRate;
			this.$gen.keyTrack = region.generators[56];
			this.$gen.loopEndPhase = sda.loopEnd + region.generators[3] + 32768 * region.generators[50];
			switch (region.generators[54] & 3) {
				case 0:
				case 2: {
					this.$gen.loopMode = 0;
					break;
				}
				case 1: {
					this.$gen.loopMode = 2;
					break;
				}
				case 3: {
					this.$gen.loopMode = 3;
					break;
				}
			}
			this.$gen.loopStartPhase = sda.loopStart + region.generators[2] + 32768 * region.generators[45];
			this.$gen.offset = 0;
			this.$gen.period = 1;
			if (region.generators[58] > -1) {
				this.$gen.rootKey = region.generators[58];
			}
			else {
				this.$gen.rootKey = sda.rootKey;
			}
			this.$gen.startPhase = sda.start + region.generators[0] + 32768 * region.generators[4];
			this.$gen.tune = sda.tune + region.generators[52] + 100 * region.generators[51];
			this.$gen.velocityTrack = 0;
			ss.cast(this.$gen, $AlphaSynth_Bank_Components_Generators_SampleGenerator).samples = sda.sampleData;
		},
		$loadEnvelopes: function(region) {
			//
			//mod env
			this.$mod_env = new $AlphaSynth_Bank_Descriptors_EnvelopeDescriptor();
			this.$mod_env.attackTime = Math.pow(2, region.generators[26] / 1200);
			this.$mod_env.attackGraph = 3;
			this.$mod_env.decayTime = Math.pow(2, region.generators[28] / 1200);
			this.$mod_env.delayTime = Math.pow(2, region.generators[25] / 1200);
			this.$mod_env.holdTime = Math.pow(2, region.generators[27] / 1200);
			this.$mod_env.peakLevel = 1;
			this.$mod_env.releaseTime = Math.pow(2, region.generators[30] / 1200);
			this.$mod_env.startLevel = 0;
			this.$mod_env.sustainLevel = 1 - $AlphaSynth_Synthesis_SynthHelper.clampS(region.generators[29], 0, 1000) / 1000;
			//checks
			if (this.$mod_env.attackTime < 0.00100000004749745) {
				this.$mod_env.attackTime = 0.00100000004749745;
			}
			else if (this.$mod_env.attackTime > 100) {
				this.$mod_env.attackTime = 100;
			}
			if (this.$mod_env.decayTime < 0.00100000004749745) {
				this.$mod_env.decayTime = 0;
			}
			else if (this.$mod_env.decayTime > 100) {
				this.$mod_env.decayTime = 100;
			}
			if (this.$mod_env.delayTime < 0.00100000004749745) {
				this.$mod_env.delayTime = 0;
			}
			else if (this.$mod_env.delayTime > 20) {
				this.$mod_env.delayTime = 20;
			}
			if (this.$mod_env.holdTime < 0.00100000004749745) {
				this.$mod_env.holdTime = 0;
			}
			else if (this.$mod_env.holdTime > 20) {
				this.$mod_env.holdTime = 20;
			}
			if (this.$mod_env.releaseTime < 0.00100000004749745) {
				this.$mod_env.releaseTime = 0.00100000004749745;
			}
			else if (this.$mod_env.releaseTime > 100) {
				this.$mod_env.releaseTime = 100;
			}
			//
			// volume env
			this.$vel_env = new $AlphaSynth_Bank_Descriptors_EnvelopeDescriptor();
			this.$vel_env.attackTime = Math.pow(2, region.generators[34] / 1200);
			this.$vel_env.attackGraph = 3;
			this.$vel_env.decayTime = Math.pow(2, region.generators[36] / 1200);
			this.$vel_env.delayTime = Math.pow(2, region.generators[33] / 1200);
			this.$vel_env.holdTime = Math.pow(2, region.generators[35] / 1200);
			this.$vel_env.peakLevel = 0;
			this.$vel_env.releaseTime = Math.pow(2, region.generators[38] / 1200);
			this.$vel_env.startLevel = -100;
			this.$vel_env.sustainLevel = $AlphaSynth_Synthesis_SynthHelper.clampS(region.generators[37], 0, 1000) / -10;
			// checks
			if (this.$vel_env.attackTime < 0.00100000004749745) {
				this.$vel_env.attackTime = 0.00100000004749745;
			}
			else if (this.$vel_env.attackTime > 100) {
				this.$vel_env.attackTime = 100;
			}
			if (this.$vel_env.decayTime < 0.00100000004749745) {
				this.$vel_env.decayTime = 0;
			}
			else if (this.$vel_env.decayTime > 100) {
				this.$vel_env.decayTime = 100;
			}
			if (this.$vel_env.delayTime < 0.00100000004749745) {
				this.$vel_env.delayTime = 0;
			}
			else if (this.$vel_env.delayTime > 20) {
				this.$vel_env.delayTime = 20;
			}
			if (this.$vel_env.holdTime < 0.00100000004749745) {
				this.$vel_env.holdTime = 0;
			}
			else if (this.$vel_env.holdTime > 20) {
				this.$vel_env.holdTime = 20;
			}
			if (this.$vel_env.releaseTime < 0.00100000004749745) {
				this.$vel_env.releaseTime = 0.00100000004749745;
			}
			else if (this.$vel_env.releaseTime > 100) {
				this.$vel_env.releaseTime = 100;
			}
		},
		$loadLfos: function(region) {
			this.$mod_lfo = new $AlphaSynth_Bank_Descriptors_LfoDescriptor();
			this.$mod_lfo.set_delayTime(Math.pow(2, region.generators[21] / 1200));
			this.$mod_lfo.set_frequency(Math.pow(2, region.generators[22] / 1200) * 8.176);
			this.$mod_lfo.set_generator($AlphaSynth_Bank_Components_Generators_DefaultGenerators.defaultSine);
			this.$vib_lfo = new $AlphaSynth_Bank_Descriptors_LfoDescriptor();
			this.$vib_lfo.set_delayTime(Math.pow(2, region.generators[23] / 1200));
			this.$vib_lfo.set_frequency(Math.pow(2, region.generators[24] / 1200) * 8.176);
			this.$vib_lfo.set_generator($AlphaSynth_Bank_Components_Generators_DefaultGenerators.defaultSine);
		},
		$loadFilter: function(region) {
			this.$fltr = new $AlphaSynth_Bank_Descriptors_FilterDescriptor();
			this.$fltr.filterMethod = 1;
			this.$fltr.cutOff = $AlphaSynth_Synthesis_SynthHelper.keyToFrequency(region.generators[8] / 100, 69);
			this.$fltr.resonance = $AlphaSynth_Synthesis_SynthHelper.dBtoLinear(region.generators[9] / 10);
		}
	}, $AlphaSynth_Bank_Patch_Patch);
	ss.initClass($AlphaSynth_Ds_CircularSampleBuffer, $asm, {
		get_count: function() {
			return this.$_sampleCount;
		},
		clear: function() {
			this.$_readPosition = 0;
			this.$_writePosition = 0;
			this.$_sampleCount = 0;
			this.$_buffer = new Float32Array(this.$_buffer.get_length());
		},
		write: function(data, offset, count) {
			var samplesWritten = 0;
			if (count > this.$_buffer.get_length() - this.$_sampleCount) {
				count = this.$_buffer.get_length() - this.$_sampleCount;
			}
			var writeToEnd = Math.min(this.$_buffer.get_length() - this.$_writePosition, count);
			data.set(this.$_buffer.subarray(offset, offset + writeToEnd), this.$_writePosition);
			this.$_writePosition += writeToEnd;
			this.$_writePosition %= this.$_buffer.get_length();
			samplesWritten += writeToEnd;
			if (samplesWritten < count) {
				var $t1 = offset + samplesWritten;
				data.set(this.$_buffer.subarray($t1, $t1 + (count - samplesWritten)), this.$_writePosition);
				this.$_writePosition += count - samplesWritten;
				samplesWritten = count;
			}
			this.$_sampleCount += samplesWritten;
			return samplesWritten;
		},
		read: function(data, offset, count) {
			if (count > this.$_sampleCount) {
				count = this.$_sampleCount;
			}
			var samplesRead = 0;
			var readToEnd = Math.min(this.$_buffer.get_length() - this.$_readPosition, count);
			this.$_buffer.set(data.subarray(this.$_readPosition, this.$_readPosition + readToEnd), offset);
			samplesRead += readToEnd;
			this.$_readPosition += readToEnd;
			this.$_readPosition %= this.$_buffer.get_length();
			if (samplesRead < count) {
				this.$_buffer.set(data.subarray(this.$_readPosition, this.$_readPosition + (count - samplesRead)), offset + samplesRead);
				this.$_readPosition += count - samplesRead;
				samplesRead = count;
			}
			this.$_sampleCount -= samplesRead;
			return samplesRead;
		}
	});
	ss.initInterface($AlphaSynth_IO_IWriteable, $asm, { writeByte: null, write: null });
	ss.initInterface($AlphaSynth_IO_IReadable, $asm, { get_position: null, set_position: null, reset: null, skip: null, readByte: null, read: null });
	ss.initClass($AlphaSynth_IO_ByteBuffer, $asm, {
		get_position: function() {
			return this.$1$PositionField;
		},
		set_position: function(value) {
			this.$1$PositionField = value;
		},
		get_length: function() {
			return this.$1$LengthField;
		},
		set_length: function(value) {
			this.$1$LengthField = value;
		},
		getBuffer: function() {
			return this.$_buffer;
		},
		reset: function() {
			this.set_position(0);
		},
		skip: function(offset) {
			this.set_position(this.get_position() + offset);
		},
		$setCapacity: function(value) {
			if (value !== this.$_capacity) {
				if (value > 0) {
					var newBuffer = new Uint8Array(value);
					if (this.get_length() > 0) {
						newBuffer.set(this.$_buffer.subarray(0, 0 + this.get_length()), 0);
					}
					this.$_buffer = newBuffer;
				}
				else {
					this.$_buffer = null;
				}
				this.$_capacity = value;
			}
		},
		readByte: function() {
			var n = this.get_length() - this.get_position();
			if (n <= 0) {
				return -1;
			}
			var $t2 = this.$_buffer;
			var $t1 = this.get_position();
			this.set_position($t1 + 1);
			return $t2[$t1];
		},
		read: function(buffer, offset, count) {
			var n = this.get_length() - this.get_position();
			if (n > count) {
				n = count;
			}
			if (n <= 0) {
				return 0;
			}
			if (n <= 8) {
				var byteCount = n;
				while (--byteCount >= 0) {
					buffer[offset + byteCount] = this.$_buffer[this.get_position() + byteCount];
				}
			}
			else {
				var $t1 = this.$_buffer;
				var $t2 = this.get_position();
				buffer.set($t1.subarray($t2, $t2 + n), offset);
			}
			this.set_position(this.get_position() + n);
			return n;
		},
		writeByte: function(value) {
			var buffer = new Uint8Array(1);
			buffer[0] = value;
			this.write(buffer, 0, 1);
		},
		write: function(buffer, offset, count) {
			var i = this.get_position() + count;
			if (i > this.get_length()) {
				if (i > this.$_capacity) {
					this.$ensureCapacity(i);
				}
				this.set_length(i);
			}
			if (count <= 8 && !ss.referenceEquals(buffer, this.$_buffer)) {
				var byteCount = count;
				while (--byteCount >= 0) {
					this.$_buffer[this.get_position() + byteCount] = buffer[offset + byteCount];
				}
			}
			else {
				this.$_buffer.set(buffer.subarray(offset, offset + count), this.get_position());
			}
			this.set_position(i);
		},
		$ensureCapacity: function(value) {
			if (value > this.$_capacity) {
				var newCapacity = value;
				if (newCapacity < 256) {
					newCapacity = 256;
				}
				if (newCapacity < this.$_capacity * 2) {
					newCapacity = this.$_capacity * 2;
				}
				this.$setCapacity(newCapacity);
			}
		},
		toArray: function() {
			var copy = new Uint8Array(this.get_length());
			copy.set(this.$_buffer.subarray(0, 0 + this.get_length()), 0);
			return copy;
		}
	}, null, [$AlphaSynth_IO_IWriteable, $AlphaSynth_IO_IReadable]);
	$AlphaSynth_IO_ByteBuffer.$ctor2.prototype = $AlphaSynth_IO_ByteBuffer.$ctor1.prototype = $AlphaSynth_IO_ByteBuffer.prototype;
	ss.initInterface($AlphaSynth_Main_IAlphaSynth, $asm, { play: null, pause: null, playPause: null, stop: null, setPositionTick: null, setPositionTime: null, loadSoundFontUrl: null, loadSoundFontBytes: null, loadMidiUrl: null, loadMidiBytes: null, setLogLevel: null });
	ss.initInterface($AlphaSynth_Main_IAlphaSynthAsync, $asm, { isReadyForPlay: null, getState: null, isSoundFontLoaded: null, isMidiLoaded: null, on: null, startup: null }, [$AlphaSynth_Main_IAlphaSynth]);
	ss.initInterface($AlphaSynth_Main_IAlphaSynthSync, $asm, { isReadyForPlay: null, getState: null, isSoundFontLoaded: null, isMidiLoaded: null }, [$AlphaSynth_Main_IAlphaSynth]);
	ss.initClass($AlphaSynth_Midi_MidiFile, $asm, {
		get_division: function() {
			return this.$1$DivisionField;
		},
		set_division: function(value) {
			this.$1$DivisionField = value;
		},
		get_trackFormat: function() {
			return this.$1$TrackFormatField;
		},
		set_trackFormat: function(value) {
			this.$1$TrackFormatField = value;
		},
		get_timingStandard: function() {
			return this.$1$TimingStandardField;
		},
		set_timingStandard: function(value) {
			this.$1$TimingStandardField = value;
		},
		get_tracks: function() {
			return this.$1$TracksField;
		},
		set_tracks: function(value) {
			this.$1$TracksField = value;
		},
		combineTracks: function() {
			var finalTrack = this.mergeTracks();
			var absEvents = new Array(this.get_tracks().length);
			for (var i = 0; i < this.get_tracks().length; i++) {
				absEvents[i] = new Array(this.get_tracks()[i].midiEvents.length);
				var totalDeltaTime = 0;
				for (var j = 0; j < this.get_tracks()[i].midiEvents.length; j++) {
					absEvents[i][j] = this.get_tracks()[i].midiEvents[j];
					totalDeltaTime += absEvents[i][j].deltaTime;
					absEvents[i][j].deltaTime = totalDeltaTime;
				}
			}
			var eventCount = 0;
			var delta = 0;
			var nextdelta = 2147483647;
			var counters = new Array(absEvents.length);
			$AlphaSynth_Platform_TypeUtils.clearIntArray(counters);
			while (eventCount < finalTrack.midiEvents.length) {
				for (var x = 0; x < absEvents.length; x++) {
					while (counters[x] < absEvents[x].length && absEvents[x][counters[x]].deltaTime === delta) {
						finalTrack.midiEvents[eventCount] = absEvents[x][counters[x]];
						eventCount++;
						counters[x]++;
					}
					if (counters[x] < absEvents[x].length && absEvents[x][counters[x]].deltaTime < nextdelta) {
						nextdelta = absEvents[x][counters[x]].deltaTime;
					}
				}
				delta = nextdelta;
				nextdelta = 2147483647;
			}
			finalTrack.endTime = finalTrack.midiEvents[finalTrack.midiEvents.length - 1].deltaTime;
			var deltaDiff = 0;
			for (var x1 = 0; x1 < finalTrack.midiEvents.length; x1++) {
				var oldTime = finalTrack.midiEvents[x1].deltaTime;
				finalTrack.midiEvents[x1].deltaTime -= deltaDiff;
				deltaDiff = oldTime;
			}
			this.set_tracks([finalTrack]);
			this.set_trackFormat(0);
		},
		mergeTracks: function() {
			var eventCount = 0;
			var notesPlayed = 0;
			var programsUsed = [];
			var drumProgramsUsed = [];
			var channelsUsed = [];
			for (var x = 0; x < this.get_tracks().length; x++) {
				eventCount += this.get_tracks()[x].midiEvents.length;
				notesPlayed += this.get_tracks()[x].noteOnCount;
				for (var i = 0; i < this.get_tracks()[x].instruments.length; i++) {
					var p = this.get_tracks()[x].instruments[i];
					if (programsUsed.indexOf(p) === -1) {
						programsUsed.push(p);
					}
				}
				for (var i1 = 0; i1 < this.get_tracks()[x].drumInstruments.length; i1++) {
					var p1 = this.get_tracks()[x].drumInstruments[i1];
					if (drumProgramsUsed.indexOf(p1) === -1) {
						drumProgramsUsed.push(p1);
					}
				}
				for (var i2 = 0; i2 < this.get_tracks()[x].activeChannels.length; i2++) {
					var p2 = this.get_tracks()[x].activeChannels[i2];
					if (channelsUsed.indexOf(p2) === -1) {
						channelsUsed.push(p2);
					}
				}
			}
			var track = new $AlphaSynth_Midi_MidiTrack(new Uint8Array(programsUsed.slice(0)), new Uint8Array(drumProgramsUsed.slice(0)), new Uint8Array(channelsUsed.slice(0)), new Array(eventCount));
			track.noteOnCount = notesPlayed;
			return track;
		},
		load: function(input) {
			if (!this.$findHead(input, 500)) {
				throw new ss.Exception('Invalid midi file : MThd chunk could not be found.');
			}
			this.$readHeader(input);
			for (var x = 0; x < this.get_tracks().length; x++) {
				this.get_tracks()[x] = this.$readTrack(input);
			}
		},
		$findHead: function(input, attempts) {
			var match = 0;
			while (attempts > 0) {
				switch (input.readByte()) {
					case 77: {
						match = 1;
						break;
					}
					case 84: {
						match = ((match === 1) ? 2 : 0);
						break;
					}
					case 104: {
						match = ((match === 2) ? 3 : 0);
						break;
					}
					case 100: {
						if (match === 3) {
							return true;
						}
						match = 0;
						break;
					}
				}
				attempts--;
			}
			return false;
		},
		$readHeader: function(input) {
			if ($AlphaSynth_Util_IOHelper.readInt32BE(input) !== 6) {
				throw new ss.Exception('Midi header is invalid.');
			}
			this.set_trackFormat($AlphaSynth_Util_IOHelper.readInt16BE(input));
			this.set_tracks(new Array($AlphaSynth_Util_IOHelper.readInt16BE(input)));
			var div = $AlphaSynth_Util_IOHelper.readInt16BE(input);
			this.set_division(div & 32767);
			this.set_timingStandard((((div & 32768) > 0) ? 1 : 0));
		},
		$readTrack: function(input) {
			var instList = [];
			var drumList = [];
			var channelList = [];
			var eventList = [];
			var noteOnCount = 0;
			var totalTime = 0;
			while ($AlphaSynth_Util_IOHelper.read8BitChars(input, 4) !== 'MTrk') {
				var length = $AlphaSynth_Util_IOHelper.readInt32BE(input);
				while (length > 0) {
					length--;
					input.readByte();
				}
			}
			var endPosition = $AlphaSynth_Util_IOHelper.readInt32BE(input) + input.get_position();
			var prevStatus = 0;
			while (input.get_position() < endPosition) {
				var delta = $AlphaSynth_Midi_MidiFile.$readVariableLength(input);
				totalTime += delta;
				var status = input.readByte();
				if (status >= 128 && status <= 239) {
					//voice message
					prevStatus = status;
					eventList.push($AlphaSynth_Midi_MidiFile.$readVoiceMessage(input, delta, status, input.readByte()));
					noteOnCount = $AlphaSynth_Midi_MidiFile.$trackVoiceStats(eventList[eventList.length - 1], instList, drumList, channelList, noteOnCount);
				}
				else if (status >= 240 && status <= 247) {
					//system common message
					prevStatus = 0;
					eventList.push($AlphaSynth_Midi_MidiFile.$readSystemCommonMessage(input, delta, status));
				}
				else if (status >= 248 && status <= 255) {
					//realtime message
					eventList.push($AlphaSynth_Midi_MidiFile.$readRealTimeMessage(input, delta, status));
				}
				else {
					//data bytes
					if (prevStatus === 0) {
						//if no running status continue to next status byte
						while ((status & 128) !== 128) {
							status = input.readByte();
						}
						if (status >= 128 && status <= 239) {
							//voice message
							prevStatus = status;
							eventList.push($AlphaSynth_Midi_MidiFile.$readVoiceMessage(input, delta, status, input.readByte()));
							noteOnCount = $AlphaSynth_Midi_MidiFile.$trackVoiceStats(eventList[eventList.length - 1], instList, drumList, channelList, noteOnCount);
						}
						else if (status >= 240 && status <= 247) {
							//system common message
							eventList.push($AlphaSynth_Midi_MidiFile.$readSystemCommonMessage(input, delta, status));
						}
						else if (status >= 248 && status <= 255) {
							//realtime message
							eventList.push($AlphaSynth_Midi_MidiFile.$readRealTimeMessage(input, delta, status));
						}
					}
					else {
						//otherwise apply running status
						eventList.push($AlphaSynth_Midi_MidiFile.$readVoiceMessage(input, delta, prevStatus, status));
						noteOnCount = $AlphaSynth_Midi_MidiFile.$trackVoiceStats(eventList[eventList.length - 1], instList, drumList, channelList, noteOnCount);
					}
				}
			}
			if (input.get_position() !== endPosition) {
				throw new ss.Exception('The track length was invalid for the current MTrk chunk.');
			}
			if (channelList.indexOf(9) !== -1) {
				if (drumList.indexOf(0) === -1) {
					drumList.push(0);
				}
			}
			else if (instList.indexOf(0) === -1) {
				instList.push(0);
			}
			var track = new $AlphaSynth_Midi_MidiTrack(new Uint8Array(instList.slice(0)), new Uint8Array(drumList.slice(0)), new Uint8Array(channelList.slice(0)), eventList.slice(0));
			track.noteOnCount = noteOnCount;
			track.endTime = totalTime;
			return track;
		}
	});
	ss.initClass($AlphaSynth_Midi_MidiHelper, $asm, {});
	ss.initEnum($AlphaSynth_Midi_MidiTimeFormat, $asm, { ticksPerBeat: 0, framesPerSecond: 1 });
	ss.initClass($AlphaSynth_Midi_MidiTrack, $asm, {});
	ss.initEnum($AlphaSynth_Midi_MidiTrackFormat, $asm, { singleTrack: 0, multiTrack: 1, multiSong: 2 });
	ss.initEnum($AlphaSynth_Midi_Event_ControllerTypeEnum, $asm, { bankSelectCoarse: 0, modulationCoarse: 1, breathControllerCoarse: 2, footControllerCoarse: 4, portamentoTimeCoarse: 5, dataEntryCoarse: 6, volumeCoarse: 7, balanceCoarse: 8, panCoarse: 10, expressionControllerCoarse: 11, effectControl1Coarse: 12, effectControl2Coarse: 13, generalPurposeSlider1: 16, generalPurposeSlider2: 17, generalPurposeSlider3: 18, generalPurposeSlider4: 19, bankSelectFine: 32, modulationFine: 33, breathControllerFine: 34, footControllerFine: 36, portamentoTimeFine: 37, dataEntryFine: 38, volumeFine: 39, balanceFine: 40, panFine: 42, expressionControllerFine: 43, effectControl1Fine: 44, effectControl2Fine: 45, holdPedal: 64, portamento: 65, sostenutoPedal: 66, softPedal: 67, legatoPedal: 68, hold2Pedal: 69, soundVariation: 70, soundTimbre: 71, soundReleaseTime: 72, soundAttackTime: 73, soundBrightness: 74, soundControl6: 75, soundControl7: 76, soundControl8: 77, soundControl9: 78, soundControl10: 79, generalPurposeButton1: 80, generalPurposeButton2: 81, generalPurposeButton3: 82, generalPurposeButton4: 83, effectsLevel: 91, tremuloLevel: 92, chorusLevel: 93, celesteLevel: 94, phaseLevel: 95, dataButtonIncrement: 96, dataButtonDecrement: 97, nonRegisteredParameterFine: 98, nonRegisteredParameterCourse: 99, registeredParameterFine: 100, registeredParameterCourse: 101, allSoundOff: 120, resetControllers: 121, localKeyboard: 122, allNotesOff: 123, omniModeOff: 124, omniModeOn: 125, monoMode: 126, polyMode: 127 });
	ss.initClass($AlphaSynth_Midi_Event_MidiEvent, $asm, {
		get_channel: function() {
			return this.message & 15;
		},
		get_command: function() {
			return this.message & 240;
		},
		get_data1: function() {
			return (this.message & 65280) >> 8;
		},
		get_data2: function() {
			return (this.message & 16711680) >> 16;
		}
	});
	ss.initClass($AlphaSynth_Midi_Event_MetaEvent, $asm, {
		get_channel: function() {
			return -1;
		},
		get_command: function() {
			return this.message & 255;
		},
		get_metaStatus: function() {
			return this.get_data1();
		}
	}, $AlphaSynth_Midi_Event_MidiEvent);
	ss.initClass($AlphaSynth_Midi_Event_MetaDataEvent, $asm, {}, $AlphaSynth_Midi_Event_MetaEvent);
	ss.initEnum($AlphaSynth_Midi_Event_MetaEventTypeEnum, $asm, { sequenceNumber: 0, textEvent: 1, copyrightNotice: 2, sequenceOrTrackName: 3, instrumentName: 4, lyricText: 5, markerText: 6, cuePoint: 7, patchName: 8, portName: 9, midiChannel: 32, midiPort: 33, endOfTrack: 47, tempo: 81, smpteOffset: 84, timeSignature: 88, keySignature: 89, sequencerSpecific: 127 });
	ss.initClass($AlphaSynth_Midi_Event_MetaNumberEvent, $asm, {}, $AlphaSynth_Midi_Event_MetaEvent);
	ss.initClass($AlphaSynth_Midi_Event_MetaTextEvent, $asm, {}, $AlphaSynth_Midi_Event_MetaEvent);
	ss.initEnum($AlphaSynth_Midi_Event_MidiEventTypeEnum, $asm, { noteOff: 128, noteOn: 144, noteAftertouch: 160, controller: 176, programChange: 192, channelAftertouch: 208, pitchBend: 224, meta: 255 });
	ss.initClass($AlphaSynth_Midi_Event_RealTimeEvent, $asm, {
		get_channel: function() {
			return -1;
		},
		get_command: function() {
			return this.message & 255;
		}
	}, $AlphaSynth_Midi_Event_MidiEvent);
	ss.initEnum($AlphaSynth_Midi_Event_RealTimeTypeEnum, $asm, { midiClock: 248, midiTick: 249, midiStart: 250, midiContinue: 252, midiStop: 253, activeSense: 254, reset: 255 });
	ss.initClass($AlphaSynth_Midi_Event_SystemCommonEvent, $asm, {
		get_channel: function() {
			return -1;
		},
		get_command: function() {
			return this.message & 255;
		}
	}, $AlphaSynth_Midi_Event_MidiEvent);
	ss.initEnum($AlphaSynth_Midi_Event_SystemCommonTypeEnum, $asm, { systemExclusive: 240, mtcQuarterFrame: 241, songPosition: 242, songSelect: 243, tuneRequest: 246, systemExclusive2: 247 });
	ss.initClass($AlphaSynth_Midi_Event_SystemExclusiveEvent, $asm, {
		get_manufacturerId: function() {
			return this.message >> 8;
		}
	}, $AlphaSynth_Midi_Event_SystemCommonEvent);
	ss.initClass($AlphaSynth_Platform_Platform, $asm, {});
	ss.initClass($AlphaSynth_Platform_Std, $asm, {});
	ss.initClass($AlphaSynth_Platform_TypeUtils, $asm, {});
	ss.initInterface($AlphaSynth_Player_ISynthOutput, $asm, { sequencerFinished: null, addPositionChangedListener: null, addFinishedListener: null, play: null, pause: null, stop: null, addSamples: null, addSampleRequestListener: null, seek: null });
	ss.initInterface($AlphaSynth_Player_ISynthPlayerListener, $asm, { onPositionChanged: null, onPlayerStateChanged: null, onFinished: null, onSoundFontLoad: null, onSoundFontLoaded: null, onSoundFontLoadFailed: null, onMidiLoad: null, onMidiLoaded: null, onMidiLoadFailed: null, onReadyForPlay: null });
	ss.initClass($AlphaSynth_Player_SynthPlayer, $asm, {
		get_tickPosition: function() {
			return this.$_tickPosition;
		},
		set_tickPosition: function(value) {
			this.set_timePosition(this.$_sequencer.ticksToMillis(value));
		},
		get_timePosition: function() {
			return this.$_timePosition;
		},
		set_timePosition: function(value) {
			$AlphaSynth_Util_Logger.debug('Seeking to position ' + value + 'ms');
			if (this.state === 1) {
				this.$_sequencer.pause();
				this.$_output.pause();
			}
			this.$_sequencer.seek(value);
			this.$_output.seek(value);
			if (this.state === 1) {
				this.$_sequencer.play();
				this.$_output.play();
			}
		},
		get_isReady: function() {
			return this.isSoundFontLoaded && this.isMidiLoaded;
		},
		play: function() {
			if (this.state === 1 || !this.get_isReady()) {
				return;
			}
			$AlphaSynth_Util_Logger.debug('Starting playback');
			this.$_sequencer.play();
			this.$_output.play();
			this.state = 1;
			this.$firePlayerStateChanged();
		},
		pause: function() {
			if (this.state !== 1 || !this.get_isReady()) {
				return;
			}
			$AlphaSynth_Util_Logger.debug('Pausing playback');
			this.$_sequencer.pause();
			this.$_output.pause();
			this.state = 2;
			this.$firePlayerStateChanged();
		},
		playPause: function() {
			if (this.state === 1 || !this.get_isReady()) {
				this.pause();
			}
			else {
				this.play();
			}
		},
		stop: function() {
			if (this.state === 0 || !this.get_isReady()) {
				return;
			}
			$AlphaSynth_Util_Logger.debug('Stopping playback');
			this.$_sequencer.stop();
			this.$_synth.stop();
			this.$_output.stop();
			this.state = 0;
			this.$firePlayerStateChanged();
			this.$firePositionChanged(0);
		},
		loadSoundFontUrl: function(url) {
			if (this.state !== 0) {
				return;
			}
			$AlphaSynth_Util_Logger.info('Start loading soundfont from url ' + url);
			var loader = new $AlphaSynth_Util_UrlLoader();
			loader.url = url;
			loader.method = 'GET';
			loader.complete = ss.mkdel(this, this.loadSoundFontBytes);
			loader.progress = ss.mkdel(this, this.$onSoundFontLoad);
			try {
				loader.load();
			}
			catch ($t1) {
				var e = ss.Exception.wrap($t1);
				$AlphaSynth_Util_Logger.error('Could not load soundfont from url: ' + e);
			}
		},
		loadSoundFontBytes: function(data) {
			if (this.state !== 0) {
				return;
			}
			var input = new $AlphaSynth_IO_ByteBuffer.$ctor1(data);
			try {
				$AlphaSynth_Util_Logger.info('Loading soundfont from bytes');
				var bank = new $AlphaSynth_Bank_PatchBank();
				bank.loadSf2(input);
				this.$_synth.loadBank(bank);
				this.isSoundFontLoaded = true;
				this.$_events.onSoundFontLoaded();
				$AlphaSynth_Util_Logger.info('soundFont successfully loaded');
				if (this.get_isReady()) {
					this.$_events.onReadyForPlay();
				}
			}
			catch ($t1) {
				var e = ss.Exception.wrap($t1);
				$AlphaSynth_Util_Logger.error('Could not load soundfont from bytes ' + e);
				this.isSoundFontLoaded = false;
				this.$_synth.unloadBank();
				this.$_events.onSoundFontLoadFailed();
			}
		},
		loadMidiUrl: function(url) {
			if (this.state !== 0) {
				return;
			}
			$AlphaSynth_Util_Logger.info('Start loading midi from url ' + url);
			var loader = new $AlphaSynth_Util_UrlLoader();
			loader.url = url;
			loader.method = 'GET';
			loader.complete = ss.mkdel(this, this.loadMidiBytes);
			loader.progress = ss.mkdel(this, this.$onMidiLoad);
			try {
				loader.load();
			}
			catch ($t1) {
				var e = ss.Exception.wrap($t1);
				$AlphaSynth_Util_Logger.error('Could not load midi from url: ' + e);
			}
		},
		loadMidiBytes: function(data) {
			if (this.state !== 0) {
				return;
			}
			var input = new $AlphaSynth_IO_ByteBuffer.$ctor1(data);
			try {
				$AlphaSynth_Util_Logger.info('Loading midi from bytes');
				var midi = new $AlphaSynth_Midi_MidiFile();
				midi.load(input);
				this.$_sequencer.loadMidi(midi);
				this.isMidiLoaded = true;
				this.$_events.onMidiLoaded();
				$AlphaSynth_Util_Logger.info('Midi successfully loaded');
				if (this.get_isReady()) {
					this.$_events.onReadyForPlay();
				}
			}
			catch ($t1) {
				var e = ss.Exception.wrap($t1);
				$AlphaSynth_Util_Logger.error('Could not load midi from bytes ' + e);
				this.isMidiLoaded = false;
				this.$_sequencer.unloadMidi();
				this.$_events.onMidiLoadFailed();
			}
		},
		$onSoundFontLoad: function(loaded, total) {
			$AlphaSynth_Util_Logger.debug('Soundfont downloading: ' + loaded + '/' + total + ' bytes');
			this.$_events.onSoundFontLoad(loaded, total);
		},
		$onMidiLoad: function(loaded, total) {
			$AlphaSynth_Util_Logger.debug('Midi downloading: ' + loaded + '/' + total + ' bytes');
			this.$_events.onMidiLoad(loaded, total);
		},
		$firePositionChanged: function(pos) {
			var endTime = ss.Int32.div(this.$_sequencer.endTime, this.$_synth.sampleRate) * 1000;
			var currentTime = pos;
			var endTick = this.$_sequencer.millisToTicks(endTime);
			var currentTick = this.$_sequencer.millisToTicks(currentTime);
			this.$_tickPosition = currentTick;
			this.$_timePosition = currentTime;
			$AlphaSynth_Util_Logger.debug('Position changed: (time: ' + currentTime + '/' + endTime + ', tick: ' + currentTick + '/' + endTime + ')');
			this.$_events.onPositionChanged(currentTime, endTime, currentTick, endTick);
		},
		$firePlayerStateChanged: function() {
			this.$_events.onPlayerStateChanged(this.state);
		},
		addEventListener: function(listener) {
			this.$_events.add(listener);
		}
	});
	ss.initClass($AlphaSynth_Player_SynthPlayerEventDispatcher, $asm, {
		onPositionChanged: function(currentTime, endTime, currentTick, endTick) {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onPositionChanged(currentTime, endTime, currentTick, endTick);
			}
		},
		onPlayerStateChanged: function(state) {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onPlayerStateChanged(state);
			}
		},
		onFinished: function() {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onFinished();
			}
		},
		onSoundFontLoad: function(loaded, full) {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onSoundFontLoad(loaded, full);
			}
		},
		onSoundFontLoaded: function() {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onSoundFontLoaded();
			}
		},
		onSoundFontLoadFailed: function() {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onSoundFontLoadFailed();
			}
		},
		onMidiLoad: function(loaded, full) {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onMidiLoad(loaded, full);
			}
		},
		onMidiLoaded: function() {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onMidiLoaded();
			}
		},
		onMidiLoadFailed: function() {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onMidiLoadFailed();
			}
		},
		onReadyForPlay: function() {
			for (var i = 0; i < this.$_listeners.length; i++) {
				this.$_listeners[i].onReadyForPlay();
			}
		},
		add: function(listener) {
			this.$_listeners.push(listener);
		}
	}, null, [$AlphaSynth_Player_ISynthPlayerListener]);
	ss.initEnum($AlphaSynth_Player_SynthPlayerState, $asm, { stopped: 0, playing: 1, paused: 2 });
	ss.initClass($AlphaSynth_Sequencer_MidiFileSequencer, $asm, {
		get_isMidiLoaded: function() {
			return ss.isValue(this.$_synthData);
		},
		get_playSpeed: function() {
			return this.$_playbackRate;
		},
		set_playSpeed: function(value) {
			this.$_playbackRate = $AlphaSynth_Synthesis_SynthHelper.clampF(value, 0.125, 8);
		},
		addFinishedListener: function(listener) {
			this.$_finished.push(listener);
		},
		$fireFinished: function() {
			for (var i = 0; i < this.$_finished.length; i++) {
				var l = this.$_finished[i];
				if (!ss.staticEquals(l, null)) {
					l();
				}
			}
		},
		loadMidi: function(midiFile) {
			if (this.isPlaying) {
				return false;
			}
			this.$loadMidiFile(midiFile);
			return true;
		},
		unloadMidi: function() {
			if (this.isPlaying) {
				return false;
			}
			this.$_synthData = null;
			return true;
		},
		play: function() {
			if (this.isPlaying || ss.isNullOrUndefined(this.$_synthData)) {
				return;
			}
			this.isPlaying = true;
		},
		pause: function() {
			this.isPlaying = false;
		},
		stop: function() {
			this.isPlaying = false;
			this.currentTime = 0;
			this.$_eventIndex = 0;
		},
		isChannelMuted: function(channel) {
			return this.$_blockList[channel];
		},
		muteAllChannels: function() {
			for (var x = 0; x < this.$_blockList.length; x++) {
				this.$_blockList[x] = true;
			}
		},
		unMuteAllChannels: function() {
			for (var x = 0; x < this.$_blockList.length; x++) {
				this.$_blockList[x] = false;
			}
		},
		setMute: function(channel, muteValue) {
			this.$_blockList[channel] = muteValue;
		},
		seek: function(milliseconds) {
			var targetSampleTime = ss.Int32.trunc(this.synth.sampleRate * (milliseconds / 1000));
			if (targetSampleTime > this.currentTime) {
				//process forward
				this.$silentProcess(targetSampleTime - this.currentTime);
			}
			else if (targetSampleTime < this.currentTime) {
				//we have to restart the midi to make sure we get the right state: instruments, volume, pan, etc
				this.currentTime = 0;
				this.$_eventIndex = 0;
				this.synth.noteOffAll(true);
				this.synth.resetPrograms();
				this.synth.resetSynthControls();
				this.$silentProcess(targetSampleTime);
			}
		},
		fillMidiEventQueue: function() {
			if (!this.isPlaying || this.synth.midiEventQueue.length !== 0) {
				return;
			}
			if (this.currentTime >= this.endTime) {
				this.currentTime = 0;
				this.$_eventIndex = 0;
				this.isPlaying = false;
				this.synth.noteOffAll(true);
				this.synth.resetPrograms();
				this.synth.resetSynthControls();
				this.$fireFinished();
				return;
			}
			var newMSize = ss.Int32.trunc(this.synth.get_microBufferSize() * this.$_playbackRate);
			var endSample = this.currentTime + newMSize * this.synth.get_microBufferCount();
			for (var x = 0; x < this.synth.get_microBufferCount(); x++) {
				this.currentTime += newMSize;
				while (this.$_eventIndex < this.$_synthData.length && this.$_synthData[this.$_eventIndex].delta < this.currentTime) {
					if (this.$_synthData[this.$_eventIndex].event.get_command() !== 144 || !this.$_blockList[this.$_synthData[this.$_eventIndex].event.get_channel()]) {
						this.synth.midiEventQueue.addFirst(this.$_synthData[this.$_eventIndex]);
						this.synth.midiEventCounts[x]++;
					}
					this.$_eventIndex++;
				}
			}
		},
		$loadMidiFile: function(midiFile) {
			this.$_tempoChanges = [];
			//Converts midi to sample based format for easy sequencing
			var bpm = 120;
			//Combine all tracks into 1 track that is organized from lowest to highest absolute time
			if (midiFile.get_tracks().length > 1 || midiFile.get_tracks()[0].endTime === 0) {
				midiFile.combineTracks();
			}
			//Convert delta time to sample time
			this.$_synthData = new Array(midiFile.get_tracks()[0].midiEvents.length);
			this.$_division = midiFile.get_division();
			this.$_eventIndex = 0;
			this.currentTime = 0;
			this.currentTempo = ss.Int32.trunc(bpm);
			//Calculate sample based time using double counter and round down to nearest integer sample.
			var absDelta = 0;
			var absTick = 0;
			var absTime = 0;
			for (var x = 0; x < midiFile.get_tracks()[0].midiEvents.length; x++) {
				var mEvent = midiFile.get_tracks()[0].midiEvents[x];
				this.$_synthData[x] = new $AlphaSynth_Synthesis_SynthEvent(mEvent);
				absTick += mEvent.deltaTime;
				absTime += mEvent.deltaTime * (60000 / (bpm * midiFile.get_division()));
				absDelta += this.synth.sampleRate * mEvent.deltaTime * (60 / (bpm * midiFile.get_division()));
				this.$_synthData[x].delta = ss.Int32.trunc(absDelta);
				//Update tempo
				if (this.$isTempoMessage(mEvent.get_command(), mEvent.get_data1())) {
					var meta = ss.cast(mEvent, $AlphaSynth_Midi_Event_MetaNumberEvent);
					bpm = ss.Int32.div($AlphaSynth_Midi_MidiHelper.microSecondsPerMinute, meta.value);
					this.$_tempoChanges.push(new $AlphaSynth_Sequencer_MidiFileSequencerTempoChange(bpm, absTick, ss.Int32.trunc(absTime)));
				}
			}
			this.endTime = this.$_synthData[this.$_synthData.length - 1].delta;
		},
		$midiEventProcessed: function(midiEvent) {
			if (this.$isTempoMessage(midiEvent.get_command(), midiEvent.get_data1())) {
				var meta = ss.cast(midiEvent, $AlphaSynth_Midi_Event_MetaNumberEvent);
				this.currentTempo = ss.Int32.div($AlphaSynth_Midi_MidiHelper.microSecondsPerMinute, meta.value);
			}
		},
		$isTempoMessage: function(command, data1) {
			return command === 255 && data1 === 81;
		},
		millisToTicks: function(time) {
			var ticks = 0;
			var bpm = 120;
			var lastChange = 0;
			// find start and bpm of last tempo change before time
			for (var i = 0; i < this.$_tempoChanges.length; i++) {
				var c = this.$_tempoChanges[i];
				if (time < c.get_time()) {
					break;
				}
				ticks = c.get_ticks();
				bpm = c.get_bpm();
				lastChange = c.get_time();
			}
			// add the missing ticks
			time -= lastChange;
			ticks += ss.Int32.trunc(time / (60000 / (bpm * this.$_division)));
			return ticks;
		},
		ticksToMillis: function(ticks) {
			var time = 0;
			var bpm = 120;
			var lastChange = 0;
			// find start and bpm of last tempo change before time
			for (var i = 0; i < this.$_tempoChanges.length; i++) {
				var c = this.$_tempoChanges[i];
				if (ticks < c.get_ticks()) {
					break;
				}
				time = c.get_time();
				bpm = c.get_bpm();
				lastChange = c.get_ticks();
			}
			// add the missing millis
			ticks -= lastChange;
			time += ss.Int32.trunc(ticks * (60000 / (bpm * this.$_division)));
			return time;
		},
		$silentProcess: function(amount) {
			if (amount <= 0) {
				return;
			}
			while (this.$_eventIndex < this.$_synthData.length && this.$_synthData[this.$_eventIndex].delta < this.currentTime + amount) {
				if (this.$_synthData[this.$_eventIndex].event.get_command() !== 144) {
					var m = this.$_synthData[this.$_eventIndex];
					this.synth.processMidiMessage(m.event);
				}
				this.$_eventIndex++;
			}
			this.currentTime += amount;
		}
	});
	ss.initClass($AlphaSynth_Sequencer_MidiFileSequencerTempoChange, $asm, {
		get_bpm: function() {
			return this.$1$BpmField;
		},
		set_bpm: function(value) {
			this.$1$BpmField = value;
		},
		get_ticks: function() {
			return this.$1$TicksField;
		},
		set_ticks: function(value) {
			this.$1$TicksField = value;
		},
		get_time: function() {
			return this.$1$TimeField;
		},
		set_time: function(value) {
			this.$1$TimeField = value;
		}
	});
	ss.initEnum($AlphaSynth_Sf2_ControllerSourceEnum, $asm, { noController: 0, noteOnVelocity: 2, noteOnKeyNumber: 3, polyPressure: 10, channelPressure: 13, pitchWheel: 14, pitchWheelSensitivity: 16, link: 127 });
	ss.initEnum($AlphaSynth_Sf2_DirectionEnum, $asm, { minToMax: 0, maxToMin: 1 });
	ss.initClass($AlphaSynth_Sf2_Generator, $asm, {
		get_amountInt16: function() {
			return ((this.$_rawAmount & 65535) >> 15) * -65536 + (this.$_rawAmount & 65535);
		},
		set_amountInt16: function(value) {
			this.$_rawAmount = value & 65535;
		},
		get_lowByteAmount: function() {
			return this.$_rawAmount & 255 & 255;
		},
		set_lowByteAmount: function(value) {
			this.$_rawAmount = (this.$_rawAmount & 65280) + (value & 255) & 65535;
		},
		get_highByteAmount: function() {
			return (this.$_rawAmount & 65280) >> 8 & 255;
		},
		set_highByteAmount: function(value) {
			this.$_rawAmount = (this.$_rawAmount & 255) + ((value & 255) << 8) & 65535;
		}
	});
	ss.initEnum($AlphaSynth_Sf2_GeneratorEnum, $asm, { startAddressOffset: 0, endAddressOffset: 1, startLoopAddressOffset: 2, endLoopAddressOffset: 3, startAddressCoarseOffset: 4, modulationLFOToPitch: 5, vibratoLFOToPitch: 6, modulationEnvelopeToPitch: 7, initialFilterCutoffFrequency: 8, initialFilterQ: 9, modulationLFOToFilterCutoffFrequency: 10, modulationEnvelopeToFilterCutoffFrequency: 11, endAddressCoarseOffset: 12, modulationLFOToVolume: 13, unused1: 14, chorusEffectsSend: 15, reverbEffectsSend: 16, pan: 17, unused2: 18, unused3: 19, unused4: 20, delayModulationLFO: 21, frequencyModulationLFO: 22, delayVibratoLFO: 23, frequencyVibratoLFO: 24, delayModulationEnvelope: 25, attackModulationEnvelope: 26, holdModulationEnvelope: 27, decayModulationEnvelope: 28, sustainModulationEnvelope: 29, releaseModulationEnvelope: 30, keyNumberToModulationEnvelopeHold: 31, keyNumberToModulationEnvelopeDecay: 32, delayVolumeEnvelope: 33, attackVolumeEnvelope: 34, holdVolumeEnvelope: 35, decayVolumeEnvelope: 36, sustainVolumeEnvelope: 37, releaseVolumeEnvelope: 38, keyNumberToVolumeEnvelopeHold: 39, keyNumberToVolumeEnvelopeDecay: 40, instrument: 41, reserved1: 42, keyRange: 43, velocityRange: 44, startLoopAddressCoarseOffset: 45, keyNumber: 46, velocity: 47, initialAttenuation: 48, reserved2: 49, endLoopAddressCoarseOffset: 50, coarseTune: 51, fineTune: 52, sampleID: 53, sampleModes: 54, reserved3: 55, scaleTuning: 56, exclusiveClass: 57, overridingRootKey: 58, unused5: 59, unusedEnd: 60 });
	ss.initClass($AlphaSynth_Sf2_Instrument, $asm, {});
	ss.initClass($AlphaSynth_Sf2_Modulator, $asm, {});
	ss.initClass($AlphaSynth_Sf2_ModulatorType, $asm, {
		get_polarity: function() {
			return this.$1$PolarityField;
		},
		set_polarity: function(value) {
			this.$1$PolarityField = value;
		},
		get_direction: function() {
			return this.$1$DirectionField;
		},
		set_direction: function(value) {
			this.$1$DirectionField = value;
		},
		get_sourceType: function() {
			return this.$1$SourceTypeField;
		},
		set_sourceType: function(value) {
			this.$1$SourceTypeField = value;
		},
		get_isMidiContinuousController: function() {
			return this.$1$IsMidiContinuousControllerField;
		},
		set_isMidiContinuousController: function(value) {
			this.$1$IsMidiContinuousControllerField = value;
		}
	});
	ss.initEnum($AlphaSynth_Sf2_PolarityEnum, $asm, { unipolar: 0, bipolar: 1 });
	ss.initClass($AlphaSynth_Sf2_PresetHeader, $asm, {});
	ss.initClass($AlphaSynth_Sf2_SampleHeader, $asm, {});
	ss.initClass($AlphaSynth_Sf2_Sf2Region, $asm, {
		applyDefaultValues: function() {
			this.generators[0] = 0;
			this.generators[1] = 0;
			this.generators[2] = 0;
			this.generators[3] = 0;
			this.generators[4] = 0;
			this.generators[5] = 0;
			this.generators[6] = 0;
			this.generators[7] = 0;
			this.generators[8] = 13500;
			this.generators[9] = 0;
			this.generators[10] = 0;
			this.generators[11] = 0;
			this.generators[12] = 0;
			this.generators[13] = 0;
			this.generators[15] = 0;
			this.generators[16] = 0;
			this.generators[17] = 0;
			this.generators[21] = -12000;
			this.generators[22] = 0;
			this.generators[23] = -12000;
			this.generators[24] = 0;
			this.generators[25] = -12000;
			this.generators[26] = -12000;
			this.generators[27] = -12000;
			this.generators[28] = -12000;
			this.generators[29] = 0;
			this.generators[30] = -12000;
			this.generators[31] = 0;
			this.generators[32] = 0;
			this.generators[33] = -12000;
			this.generators[34] = -12000;
			this.generators[35] = -12000;
			this.generators[36] = -12000;
			this.generators[37] = 0;
			this.generators[38] = -12000;
			this.generators[39] = 0;
			this.generators[40] = 0;
			this.generators[43] = 32512;
			this.generators[44] = 32512;
			this.generators[45] = 0;
			this.generators[46] = -1;
			this.generators[47] = -1;
			this.generators[48] = 0;
			this.generators[50] = 0;
			this.generators[51] = 0;
			this.generators[52] = 0;
			this.generators[54] = 0;
			this.generators[56] = 100;
			this.generators[57] = 0;
			this.generators[58] = -1;
		}
	});
	ss.initEnum($AlphaSynth_Sf2_SFSampleLink, $asm, { monoSample: 1, rightSample: 2, leftSample: 4, linkedSample: 8, romMonoSample: 32769, romRightSample: 32770, romLeftSample: 32772, romLinkedSample: 32776 });
	ss.initClass($AlphaSynth_Sf2_SoundFont, $asm, {
		load: function(input) {
			var id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
			var size = $AlphaSynth_Util_IOHelper.readInt32LE(input);
			if (id.toLowerCase() !== 'riff') {
				throw new ss.Exception('Invalid soundfont. Could not find RIFF header.');
			}
			id = $AlphaSynth_Util_IOHelper.read8BitChars(input, 4);
			if (id.toLowerCase() !== 'sfbk') {
				throw new ss.Exception('Invalid soundfont. Riff type is invalid.');
			}
			$AlphaSynth_Util_Logger.debug('Reading info chunk');
			this.info = new $AlphaSynth_Sf2_SoundFontInfo(input);
			$AlphaSynth_Util_Logger.debug('Reading sampledata chunk');
			this.sampleData = new $AlphaSynth_Sf2_SoundFontSampleData(input);
			$AlphaSynth_Util_Logger.debug('Reading preset chunk');
			this.presets = new $AlphaSynth_Sf2_SoundFontPresets(input);
		}
	});
	ss.initClass($AlphaSynth_Sf2_SoundFontInfo, $asm, {});
	ss.initClass($AlphaSynth_Sf2_SoundFontPresets, $asm, {});
	ss.initClass($AlphaSynth_Sf2_SoundFontSampleData, $asm, {});
	ss.initEnum($AlphaSynth_Sf2_SourceTypeEnum, $asm, { linear: 0, concave: 1, convex: 2, switch$1: 3 });
	ss.initEnum($AlphaSynth_Sf2_TransformEnum, $asm, { linear: 0, absoluteValue: 2 });
	ss.initClass($AlphaSynth_Sf2_Zone, $asm, {});
	ss.initClass($AlphaSynth_Sf2_Chunks_Chunk, $asm, {});
	ss.initClass($AlphaSynth_Sf2_Chunks_GeneratorChunk, $asm, {}, $AlphaSynth_Sf2_Chunks_Chunk);
	ss.initClass($AlphaSynth_Sf2_Chunks_InstrumentChunk, $asm, {
		toInstruments: function(zones) {
			var inst = new Array(this.$_rawInstruments.length - 1);
			for (var x = 0; x < inst.length; x++) {
				var rawInst = this.$_rawInstruments[x];
				var i = new $AlphaSynth_Sf2_Instrument();
				i.name = rawInst.name;
				i.zones = new Array(rawInst.endInstrumentZoneIndex - rawInst.startInstrumentZoneIndex + 1);
				$AlphaSynth_Platform_Std.arrayCopy($AlphaSynth_Sf2_Zone).call(null, zones, rawInst.startInstrumentZoneIndex, i.zones, 0, i.zones.length);
				inst[x] = i;
			}
			return inst;
		}
	}, $AlphaSynth_Sf2_Chunks_Chunk);
	ss.initClass($AlphaSynth_Sf2_Chunks_ModulatorChunk, $asm, {}, $AlphaSynth_Sf2_Chunks_Chunk);
	ss.initClass($AlphaSynth_Sf2_Chunks_PresetHeaderChunk, $asm, {
		toPresets: function(presetZones) {
			var presets = new Array(this.$_rawPresets.length - 1);
			for (var x = 0; x < presets.length; x++) {
				var rawPreset = this.$_rawPresets[x];
				var p = new $AlphaSynth_Sf2_PresetHeader();
				p.bankNumber = rawPreset.bankNumber;
				p.genre = rawPreset.genre;
				p.library = rawPreset.library;
				p.morphology = rawPreset.morphology;
				p.name = rawPreset.name;
				p.patchNumber = rawPreset.patchNumber;
				p.zones = new Array(rawPreset.endPresetZoneIndex - rawPreset.startPresetZoneIndex + 1);
				$AlphaSynth_Platform_Std.arrayCopy($AlphaSynth_Sf2_Zone).call(null, presetZones, rawPreset.startPresetZoneIndex, p.zones, 0, p.zones.length);
				presets[x] = p;
			}
			return presets;
		}
	}, $AlphaSynth_Sf2_Chunks_Chunk);
	ss.initClass($AlphaSynth_Sf2_Chunks_RawInstrument, $asm, {});
	ss.initClass($AlphaSynth_Sf2_Chunks_RawPreset, $asm, {});
	ss.initClass($AlphaSynth_Sf2_Chunks_RawZoneData, $asm, {});
	ss.initClass($AlphaSynth_Sf2_Chunks_SampleHeaderChunk, $asm, {}, $AlphaSynth_Sf2_Chunks_Chunk);
	ss.initClass($AlphaSynth_Sf2_Chunks_ZoneChunk, $asm, {
		toZones: function(modulators, generators) {
			var zones = new Array(this.$_zoneData.length - 1);
			for (var x = 0; x < zones.length; x++) {
				var rawZone = this.$_zoneData[x];
				var zone = new $AlphaSynth_Sf2_Zone();
				zone.generators = new Array(rawZone.generatorCount);
				$AlphaSynth_Platform_Std.arrayCopy($AlphaSynth_Sf2_Generator).call(null, generators, rawZone.generatorIndex, zone.generators, 0, rawZone.generatorCount);
				zone.modulators = new Array(rawZone.modulatorCount);
				$AlphaSynth_Platform_Std.arrayCopy($AlphaSynth_Sf2_Modulator).call(null, modulators, rawZone.modulatorIndex, zone.modulators, 0, rawZone.modulatorCount);
				zones[x] = zone;
			}
			return zones;
		}
	}, $AlphaSynth_Sf2_Chunks_Chunk);
	ss.initClass($AlphaSynth_Synthesis_CCValue, $asm, {
		get_coarse: function() {
			return this.$_coarseValue;
		},
		set_coarse: function(value) {
			this.$_coarseValue = value;
			this.$updateCombined();
		},
		get_fine: function() {
			return this.$_fineValue;
		},
		set_fine: function(value) {
			this.$_fineValue = value;
			this.$updateCombined();
		},
		get_combined: function() {
			return this.$_combined;
		},
		set_combined: function(value) {
			this.$_combined = value;
			this.$updateCoarseFinePair();
		},
		$updateCombined: function() {
			if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
				this.$_combined = this.$_coarseValue << 7 | this.$_fineValue;
			}
			else {
				this.$_combined = this.$_fineValue << 7 | this.$_coarseValue;
			}
		},
		$updateCoarseFinePair: function() {
			if ($AlphaSynth_Platform_TypeUtils.isLittleEndian) {
				this.$_coarseValue = this.$_combined >> 7;
				this.$_fineValue = this.$_combined & 127;
			}
			else {
				this.$_fineValue = this.$_combined >> 7;
				this.$_coarseValue = this.$_combined & 127;
			}
		}
	});
	$AlphaSynth_Synthesis_CCValue.$ctor1.prototype = $AlphaSynth_Synthesis_CCValue.prototype;
	ss.initClass($AlphaSynth_Synthesis_Synthesizer, $asm, {
		get_masterVolume: function() {
			return this.$_masterVolume;
		},
		set_masterVolume: function(value) {
			this.$_masterVolume = $AlphaSynth_Synthesis_SynthHelper.clampF(value, 0, 3);
		},
		get_mixGain: function() {
			return this.$_synthGain;
		},
		set_mixGain: function(value) {
			this.$_synthGain = $AlphaSynth_Synthesis_SynthHelper.clampF(value, 0.5, 1);
		},
		get_microBufferSize: function() {
			return this.$1$MicroBufferSizeField;
		},
		set_microBufferSize: function(value) {
			this.$1$MicroBufferSizeField = value;
		},
		get_microBufferCount: function() {
			return this.$1$MicroBufferCountField;
		},
		set_microBufferCount: function(value) {
			this.$1$MicroBufferCountField = value;
		},
		get_voiceStealMethod: function() {
			return this.$_voiceManager.stealingMethod;
		},
		set_voiceStealMethod: function(value) {
			this.$_voiceManager.stealingMethod = value;
		},
		get_activeVoices: function() {
			return this.$_voiceManager.activeVoices.length;
		},
		get_freeVoices: function() {
			return this.$_voiceManager.freeVoices.length;
		},
		get_rawBufferSize: function() {
			return this.sampleBuffer.get_length() * 2;
		},
		get_workingBufferSize: function() {
			return this.sampleBuffer.get_length();
		},
		get_polyphony: function() {
			return this.$_voiceManager.polyphony;
		},
		loadBank: function(bank) {
			this.unloadBank();
			this.soundBank = bank;
		},
		unloadBank: function() {
			if (ss.isValue(this.soundBank)) {
				this.noteOffAll(true);
				this.$_voiceManager.unloadPatches();
				this.soundBank = null;
			}
		},
		stop: function() {
			this.resetSynthControls();
			this.resetPrograms();
			this.noteOffAll(true);
		},
		resetSynthControls: function() {
			for (var x = 0; x < this.$_synthChannels.length; x++) {
				this.$_synthChannels[x].resetControllers();
			}
			this.$_synthChannels[$AlphaSynth_Midi_MidiHelper.drumChannel].bankSelect = 128;
			this.$releaseAllHoldPedals();
		},
		resetPrograms: function() {
			for (var x = 0; x < this.$_synthChannels.length; x++) {
				this.$_synthChannels[x].program = 0;
			}
		},
		getProgramName: function(channel) {
			var p = this.getProgram(channel);
			if (ss.isNullOrUndefined(p)) {
				return 'null';
			}
			return p.name;
		},
		getProgram: function(channel) {
			if (ss.isValue(this.soundBank)) {
				var sChannel = this.$_synthChannels[channel];
				var inst = this.soundBank.getPatchByNumber(sChannel.bankSelect, sChannel.program);
				if (ss.isValue(inst)) {
					return inst;
				}
			}
			return null;
		},
		setAudioChannelCount: function(channels) {
			channels = $AlphaSynth_Synthesis_SynthHelper.clampI(channels, 1, 2);
			if (this.audioChannels !== channels) {
				this.audioChannels = channels;
				this.sampleBuffer = new Float32Array(this.get_microBufferSize() * this.get_microBufferCount() * this.audioChannels);
			}
		},
		synthesize: function() {
			this.sampleBuffer = new Float32Array();
			this.$fillWorkingBuffer();
		},
		getNext: function(buffer) {
			this.synthesize();
			this.$convertWorkingBuffer(buffer, this.sampleBuffer);
		},
		getChannelVolume: function(channel) {
			return this.$_synthChannels[channel].volume.get_combined() / 16383;
		},
		getChannelExpression: function(channel) {
			return this.$_synthChannels[channel].expression.get_combined() / 16383;
		},
		getChannelPan: function(channel) {
			return (this.$_synthChannels[channel].pan.get_combined() - 8192) / 8192;
		},
		getChannelPitchBend: function(channel) {
			return (this.$_synthChannels[channel].pitchBend.get_combined() - 8192) / 8192;
		},
		getChannelHoldPedalStatus: function(channel) {
			return this.$_synthChannels[channel].holdPedal;
		},
		$fillWorkingBuffer: function() {
			//Break the process loop into sections representing the smallest timeframe before the midi controls need to be updated
			//the bigger the timeframe the more efficent the process is, but playback quality will be reduced.
			var sampleIndex = 0;
			for (var x = 0; x < this.get_microBufferCount(); x++) {
				if (this.midiEventQueue.length > 0) {
					for (var i = 0; i < this.midiEventCounts[x]; i++) {
						var m = this.midiEventQueue.removeLast();
						this.processMidiMessage(m.event);
					}
				}
				//voice processing loop
				var node = this.$_voiceManager.activeVoices.first;
				//node used to traverse the active voices
				while (ss.isValue(node)) {
					node.value.process(sampleIndex, sampleIndex + this.get_microBufferSize() * this.audioChannels);
					//if an active voice has stopped remove it from the list
					if (node.value.get_voiceParams().state === 0) {
						var delnode = node;
						//node used to remove inactive voices
						node = node.get_next();
						this.$_voiceManager.removeVoiceFromRegistry(delnode.value);
						this.$_voiceManager.activeVoices.remove(delnode);
						this.$_voiceManager.freeVoices.addFirst(delnode.value);
					}
					else {
						node = node.get_next();
					}
				}
				sampleIndex += this.get_microBufferSize() * this.audioChannels;
			}
			$AlphaSynth_Platform_TypeUtils.clearIntArray(this.midiEventCounts);
		},
		$convertWorkingBuffer: function(to, from) {
			var i = 0;
			if (this.littleEndian) {
				for (var x = 0; x < from.get_length(); x++) {
					var $t1 = ss.Int32.trunc($AlphaSynth_Synthesis_SynthHelper.clampF(from[x] * this.$_masterVolume, -1, 1) * 32767);
					var s = (($t1 & 65535) >> 15) * -65536 + ($t1 & 65535);
					to[i] = s & 255;
					to[i + 1] = s >> 8 & 255;
					i += 2;
				}
			}
			else {
				for (var x1 = 0; x1 < from.get_length(); x1++) {
					var $t2 = ss.Int32.trunc($AlphaSynth_Synthesis_SynthHelper.clampF(from[x1] * this.$_masterVolume, -1, 1) * 32767);
					var s1 = (($t2 & 65535) >> 15) * -65536 + ($t2 & 65535);
					to[i] = s1 >> 8 & 255;
					to[i + 1] = s1 & 255;
					i += 2;
				}
			}
		},
		noteOn: function(channel, note, velocity) {
			// Get the correct instrument depending if it is a drum or not
			var sChan = this.$_synthChannels[channel];
			var inst = this.soundBank.getPatchByNumber(sChan.bankSelect, sChan.program);
			if (ss.isNullOrUndefined(inst)) {
				return;
			}
			// A NoteOn can trigger multiple voices via layers
			var layerCount;
			if (ss.isInstanceOfType(inst, $AlphaSynth_Bank_Patch_MultiPatch)) {
				layerCount = ss.cast(inst, $AlphaSynth_Bank_Patch_MultiPatch).findPatches(channel, note, velocity, this.$_layerList);
			}
			else {
				layerCount = 1;
				this.$_layerList[0] = inst;
			}
			// If a key with the same note value exists, stop it
			if (ss.isValue(ss.arrayGet(this.$_voiceManager.registry, channel, note))) {
				var node = ss.arrayGet(this.$_voiceManager.registry, channel, note);
				while (ss.isValue(node)) {
					node.value.stop();
					node = node.next;
				}
				this.$_voiceManager.removeFromRegistry(channel, note);
			}
			// Check exclusive groups
			for (var x = 0; x < layerCount; x++) {
				var notseen = true;
				for (var i = x - 1; i >= 0; i--) {
					if (this.$_layerList[x].exclusiveGroupTarget === this.$_layerList[i].exclusiveGroupTarget) {
						notseen = false;
						break;
					}
				}
				if (this.$_layerList[x].exclusiveGroupTarget !== 0 && notseen) {
					var node1 = this.$_voiceManager.activeVoices.first;
					while (ss.isValue(node1)) {
						if (this.$_layerList[x].exclusiveGroupTarget === node1.value.get_patch().exclusiveGroup) {
							node1.value.stop();
							this.$_voiceManager.removeVoiceFromRegistry(node1.value);
						}
						node1 = node1.get_next();
					}
				}
			}
			// Assign a voice to each layer
			for (var x1 = 0; x1 < layerCount; x1++) {
				var voice = this.$_voiceManager.getFreeVoice();
				if (ss.isNullOrUndefined(voice)) {
					break;
				}
				voice.configure(channel, note, velocity, this.$_layerList[x1], this.$_synthChannels[channel]);
				this.$_voiceManager.addToRegistry(voice);
				this.$_voiceManager.activeVoices.addLast(voice);
				voice.start();
			}
			// Clear layer list
			for (var x2 = 0; x2 < layerCount; x2++) {
				this.$_layerList[x2] = null;
			}
		},
		noteOff: function(channel, note) {
			if (this.$_synthChannels[channel].holdPedal) {
				var node = ss.arrayGet(this.$_voiceManager.registry, channel, note);
				while (ss.isValue(node)) {
					node.value.get_voiceParams().noteOffPending = true;
					node = node.next;
				}
			}
			else {
				var node1 = ss.arrayGet(this.$_voiceManager.registry, channel, note);
				while (ss.isValue(node1)) {
					node1.value.stop();
					node1 = node1.next;
				}
				this.$_voiceManager.removeFromRegistry(channel, note);
			}
		},
		noteOffAll: function(immediate) {
			var node = this.$_voiceManager.activeVoices.first;
			if (immediate) {
				//if immediate ignore hold pedals and clear the entire registry
				this.$_voiceManager.clearRegistry();
				while (ss.isValue(node)) {
					node.value.stopImmediately();
					var delnode = node;
					node = node.get_next();
					this.$_voiceManager.activeVoices.remove(delnode);
					this.$_voiceManager.freeVoices.addFirst(delnode.value);
				}
			}
			else {
				//otherwise we have to check for hold pedals and double check the registry before removing the voice
				while (ss.isValue(node)) {
					var voiceParams = node.value.get_voiceParams();
					if (voiceParams.state === 2) {
						//if hold pedal is enabled do not stop the voice
						if (this.$_synthChannels[voiceParams.channel].holdPedal) {
							voiceParams.noteOffPending = true;
						}
						else {
							node.value.stop();
							this.$_voiceManager.removeVoiceFromRegistry(node.value);
						}
					}
					node = node.get_next();
				}
			}
		},
		noteOffAllChannel: function(channel, immediate) {
			var node = this.$_voiceManager.activeVoices.first;
			while (ss.isValue(node)) {
				if (channel === node.value.get_voiceParams().channel) {
					if (immediate) {
						node.value.stopImmediately();
						var delnode = node;
						node = node.get_next();
						this.$_voiceManager.activeVoices.remove(delnode);
						this.$_voiceManager.freeVoices.addFirst(delnode.value);
					}
					else {
						//if hold pedal is enabled do not stop the voice
						if (this.$_synthChannels[channel].holdPedal) {
							node.value.get_voiceParams().noteOffPending = true;
						}
						else {
							node.value.stop();
						}
						node = node.get_next();
					}
				}
			}
		},
		processMidiMessage: function(e) {
			var command = e.get_command();
			var channel = e.get_channel();
			var data1 = e.get_data1();
			var data2 = e.get_data2();
			switch (command) {
				case 128: {
					this.noteOff(channel, data1);
					break;
				}
				case 144: {
					if (data2 === 0) {
						this.noteOff(channel, data1);
					}
					else {
						this.noteOn(channel, data1, data2);
					}
					break;
				}
				case 160: {
					//synth uses channel after touch instead
					break;
				}
				case 176: {
					switch (data1) {
						case 0: {
							//Bank select coarse
							if (channel === $AlphaSynth_Midi_MidiHelper.drumChannel) {
								data2 += $AlphaSynth_Bank_PatchBank.drumBank;
							}
							if (this.soundBank.isBankLoaded(data2)) {
								this.$_synthChannels[channel].bankSelect = data2;
							}
							else {
								this.$_synthChannels[channel].bankSelect = ((channel === $AlphaSynth_Midi_MidiHelper.drumChannel) ? $AlphaSynth_Bank_PatchBank.drumBank : 0);
							}
							break;
						}
						case 1: {
							//Modulation wheel coarse
							this.$_synthChannels[channel].modRange.set_coarse(data2);
							this.$_synthChannels[channel].updateCurrentMod();
							break;
						}
						case 33: {
							//Modulation wheel fine
							this.$_synthChannels[channel].modRange.set_fine(data2);
							this.$_synthChannels[channel].updateCurrentMod();
							break;
						}
						case 7: {
							//Channel volume coarse
							this.$_synthChannels[channel].volume.set_coarse(data2);
							break;
						}
						case 39: {
							//Channel volume fine
							this.$_synthChannels[channel].volume.set_fine(data2);
							break;
						}
						case 10: {
							//Pan coarse
							this.$_synthChannels[channel].pan.set_coarse(data2);
							this.$_synthChannels[channel].updateCurrentPan();
							break;
						}
						case 42: {
							//Pan fine
							this.$_synthChannels[channel].pan.set_fine(data2);
							this.$_synthChannels[channel].updateCurrentPan();
							break;
						}
						case 11: {
							//Expression coarse
							this.$_synthChannels[channel].expression.set_coarse(data2);
							this.$_synthChannels[channel].updateCurrentVolume();
							break;
						}
						case 43: {
							//Expression fine
							this.$_synthChannels[channel].expression.set_fine(data2);
							this.$_synthChannels[channel].updateCurrentVolume();
							break;
						}
						case 64: {
							//Hold pedal
							if (this.$_synthChannels[channel].holdPedal && !(data2 > 63)) {
								this.$releaseHoldPedal(channel);
							}
							this.$_synthChannels[channel].holdPedal = data2 > 63;
							break;
						}
						case 68: {
							//Legato Pedal
							this.$_synthChannels[channel].legatoPedal = data2 > 63;
							break;
						}
						case 99: {
							//NRPN Coarse Select   //fix for invalid DataEntry after unsupported NRPN events
							this.$_synthChannels[channel].rpn.set_combined(16383);
							//todo implement NRPN
							break;
						}
						case 98: {
							//NRPN Fine Select     //fix for invalid DataEntry after unsupported NRPN events
							this.$_synthChannels[channel].rpn.set_combined(16383);
							//todo implement NRPN
							break;
						}
						case 101: {
							//RPN Coarse Select
							this.$_synthChannels[channel].rpn.set_coarse(data2);
							break;
						}
						case 100: {
							//RPN Fine Select
							this.$_synthChannels[channel].rpn.set_fine(data2);
							break;
						}
						case 123: {
							//Note Off All
							this.noteOffAll(false);
							break;
						}
						case 6: {
							//DataEntry Coarse
							switch (this.$_synthChannels[channel].rpn.get_combined()) {
								case 0: {
									//change semitone, pitchwheel
									this.$_synthChannels[channel].pitchBendRangeCoarse = data2;
									this.$_synthChannels[channel].updateCurrentPitch();
									break;
								}
								case 1: {
									//master fine tune coarse
									this.$_synthChannels[channel].masterFineTune.set_coarse(data2);
									break;
								}
								case 2: {
									//master coarse tune coarse
									this.$_synthChannels[channel].masterCoarseTune = data2 - 64;
									break;
								}
							}
							break;
						}
						case 38: {
							//DataEntry Fine
							switch (this.$_synthChannels[channel].rpn.get_combined()) {
								case 0: {
									//change cents, pitchwheel
									this.$_synthChannels[channel].pitchBendRangeFine = data2;
									this.$_synthChannels[channel].updateCurrentPitch();
									break;
								}
								case 1: {
									//master fine tune fine
									this.$_synthChannels[channel].masterFineTune.set_fine(data2);
									break;
								}
							}
							break;
						}
						case 121: {
							//Reset All
							this.$_synthChannels[channel].expression.set_combined(16383);
							this.$_synthChannels[channel].modRange.set_combined(0);
							if (this.$_synthChannels[channel].holdPedal) {
								this.$releaseHoldPedal(channel);
							}
							this.$_synthChannels[channel].holdPedal = false;
							this.$_synthChannels[channel].legatoPedal = false;
							this.$_synthChannels[channel].rpn.set_combined(16383);
							this.$_synthChannels[channel].pitchBend.set_combined(8192);
							this.$_synthChannels[channel].channelAfterTouch = 0;
							this.$_synthChannels[channel].updateCurrentPitch();
							//because pitchBend was reset
							this.$_synthChannels[channel].updateCurrentVolume();
							//because expression was reset
							break;
						}
						default: {
							return;
						}
					}
					break;
				}
				case 192: {
					//Program Change
					this.$_synthChannels[channel].program = data1;
					break;
				}
				case 208: {
					//Channel Aftertouch
					this.$_synthChannels[channel].channelAfterTouch = data2;
					break;
				}
				case 224: {
					//Pitch Bend
					this.$_synthChannels[channel].pitchBend.set_coarse(data2);
					this.$_synthChannels[channel].pitchBend.set_fine(data1);
					this.$_synthChannels[channel].updateCurrentPitch();
					break;
				}
			}
			this.$fireMidiMessageProcessed(e);
		},
		addMidiMessageProcessed: function(listener) {
			this.$_midiMessageProcessed.push(listener);
		},
		$fireMidiMessageProcessed: function(e) {
			for (var i = 0; i < this.$_midiMessageProcessed.length; i++) {
				var l = this.$_midiMessageProcessed[i];
				if (!ss.staticEquals(l, null)) {
					l(e);
				}
			}
		},
		$releaseAllHoldPedals: function() {
			var node = this.$_voiceManager.activeVoices.first;
			while (ss.isValue(node)) {
				if (node.value.get_voiceParams().noteOffPending) {
					node.value.stop();
					this.$_voiceManager.removeVoiceFromRegistry(node.value);
				}
				node = node.get_next();
			}
		},
		$releaseHoldPedal: function(channel) {
			var node = this.$_voiceManager.activeVoices.first;
			while (ss.isValue(node)) {
				if (node.value.get_voiceParams().channel === channel && node.value.get_voiceParams().noteOffPending) {
					node.value.stop();
					this.$_voiceManager.removeVoiceFromRegistry(node.value);
				}
				node = node.get_next();
			}
		}
	});
	ss.initClass($AlphaSynth_Synthesis_SynthEvent, $asm, {});
	ss.initClass($AlphaSynth_Synthesis_SynthHelper, $asm, {});
	ss.initClass($AlphaSynth_Synthesis_SynthParameters, $asm, {
		resetControllers: function() {
			this.program = 0;
			this.bankSelect = 0;
			this.channelAfterTouch = 0;
			//Reset Channel Pressure to 0
			this.pan.set_combined(8192);
			this.volume.set_fine(0);
			this.volume.set_coarse(100);
			//Reset Vol Positions back to 90/127 (GM spec)
			this.expression.set_combined(16383);
			//Reset Expression positions back to 127/127
			this.modRange.set_combined(0);
			this.pitchBend.set_combined(8192);
			this.pitchBendRangeCoarse = 2;
			//Reset pitch wheel to +-2 semitones (GM spec)
			this.pitchBendRangeFine = 0;
			this.masterCoarseTune = 0;
			this.masterFineTune.set_combined(8192);
			//Reset fine tune
			this.holdPedal = false;
			this.legatoPedal = false;
			this.rpn.set_combined(16383);
			//Reset rpn
			this.updateCurrentPan();
			this.updateCurrentPitch();
			this.updateCurrentVolume();
		},
		updateCurrentVolume: function() {
			this.currentVolume = this.expression.get_combined() / 16383;
			this.currentVolume *= this.currentVolume;
		},
		updateCurrentPitch: function() {
			this.currentPitch = ss.Int32.trunc((this.pitchBend.get_combined() - 8192) / 8192 * (100 * this.pitchBendRangeCoarse + this.pitchBendRangeFine));
		},
		updateCurrentMod: function() {
			this.currentMod = ss.Int32.trunc(100 * (this.modRange.get_combined() / 16383));
		},
		updateCurrentPan: function() {
			var value = $AlphaSynth_Util_SynthConstants.halfPi * (this.pan.get_combined() / 16383);
			this.currentPan.left = Math.cos(value);
			this.currentPan.right = Math.sin(value);
		}
	});
	ss.initClass($AlphaSynth_Synthesis_Voice, $asm, {
		get_patch: function() {
			return this.$1$PatchField;
		},
		set_patch: function(value) {
			this.$1$PatchField = value;
		},
		get_voiceParams: function() {
			return this.$1$VoiceParamsField;
		},
		set_voiceParams: function(value) {
			this.$1$VoiceParamsField = value;
		},
		start: function() {
			if (this.get_voiceParams().state !== 0) {
				return;
			}
			if (this.get_patch().start(this.get_voiceParams())) {
				this.get_voiceParams().state = 2;
			}
		},
		stop: function() {
			if (this.get_voiceParams().state !== 2) {
				return;
			}
			this.get_voiceParams().state = 1;
			this.get_patch().stop(this.get_voiceParams());
		},
		stopImmediately: function() {
			this.get_voiceParams().state = 0;
		},
		process: function(startIndex, endIndex) {
			//do not process if the voice is stopped
			if (this.get_voiceParams().state === 0) {
				return;
			}
			//process using the patch's algorithm
			this.get_patch().process(this.get_voiceParams(), startIndex, endIndex);
		},
		configure: function(channel, note, velocity, patch, synthParams) {
			this.get_voiceParams().reset();
			this.get_voiceParams().channel = channel;
			this.get_voiceParams().note = note;
			this.get_voiceParams().velocity = velocity;
			this.get_voiceParams().synthParams = synthParams;
			this.set_patch(patch);
		}
	});
	ss.initClass($AlphaSynth_Synthesis_VoiceManager, $asm, {
		getFreeVoice: function() {
			if (this.freeVoices.length > 0) {
				var voice = this.freeVoices.first.value;
				this.freeVoices.removeFirst();
				return voice;
			}
			switch (this.stealingMethod) {
				case 0: {
					return this.$stealOldest();
				}
				case 1: {
					return this.$stealQuietestVoice();
				}
				default: {
					return null;
				}
			}
		},
		addToRegistry: function(voice) {
			var node = this.$_vNodes.removeLast();
			node.value = voice;
			node.next = ss.arrayGet(this.registry, voice.get_voiceParams().channel, voice.get_voiceParams().note);
			ss.arraySet(this.registry, voice.get_voiceParams().channel, voice.get_voiceParams().note, node);
		},
		removeFromRegistry: function(channel, note) {
			var node = ss.arrayGet(this.registry, channel, note);
			while (ss.isValue(node)) {
				this.$_vNodes.addLast(node);
				node = node.next;
			}
			ss.arraySet(this.registry, channel, note, null);
		},
		removeVoiceFromRegistry: function(voice) {
			var node = ss.arrayGet(this.registry, voice.get_voiceParams().channel, voice.get_voiceParams().note);
			if (ss.isNullOrUndefined(node)) {
				return;
			}
			if (ss.referenceEquals(node.value, voice)) {
				ss.arraySet(this.registry, voice.get_voiceParams().channel, voice.get_voiceParams().note, node.next);
				this.$_vNodes.addLast(node);
			}
			else {
				var node2 = node;
				node = node.next;
				while (ss.isValue(node)) {
					if (ss.referenceEquals(node.value, voice)) {
						node2.next = node.next;
						this.$_vNodes.addLast(node);
						return;
					}
					node2 = node;
					node = node.next;
				}
			}
		},
		clearRegistry: function() {
			var node = this.activeVoices.first;
			while (ss.isValue(node)) {
				var vnode = ss.arrayGet(this.registry, node.value.get_voiceParams().channel, node.value.get_voiceParams().note);
				while (ss.isValue(vnode)) {
					this.$_vNodes.addLast(vnode);
					vnode = vnode.next;
				}
				ss.arraySet(this.registry, node.value.get_voiceParams().channel, node.value.get_voiceParams().note, null);
				node = node.get_next();
			}
		},
		unloadPatches: function() {
			for (var $t1 = 0; $t1 < this.$_voicePool.length; $t1++) {
				var v = this.$_voicePool[$t1];
				v.configure(0, 0, 0, null, null);
				var current = this.$_vNodes.first;
				while (ss.isValue(current)) {
					current.value.value = null;
					current = current.get_next();
				}
			}
		},
		$stealOldest: function() {
			var node = this.activeVoices.first;
			//first look for a voice that is not playing
			while (ss.isValue(node) && node.value.get_voiceParams().state === 2) {
				node = node.get_next();
			}
			//if no stopping voice is found use the oldest
			if (ss.isNullOrUndefined(node)) {
				node = this.activeVoices.first;
			}
			//check and remove from registry
			this.removeVoiceFromRegistry(node.value);
			this.activeVoices.remove(node);
			//stop voice if it is not already
			node.value.get_voiceParams().state = 0;
			return node.value;
		},
		$stealQuietestVoice: function() {
			var voiceVolume = 1000;
			var quietest = null;
			var node = this.activeVoices.first;
			while (ss.isValue(node)) {
				if (node.value.get_voiceParams().state !== 2) {
					var volume = node.value.get_voiceParams().get_combinedVolume();
					if (volume < voiceVolume) {
						quietest = node;
						voiceVolume = volume;
					}
				}
				node = node.get_next();
			}
			if (ss.isNullOrUndefined(quietest)) {
				quietest = this.activeVoices.first;
			}
			//check and remove from registry
			this.removeVoiceFromRegistry(quietest.value);
			this.activeVoices.remove(quietest);
			//stop voice if it is not already
			quietest.value.get_voiceParams().state = 0;
			return quietest.value;
		}
	});
	ss.initClass($AlphaSynth_Synthesis_VoiceNode, $asm, {});
	ss.initClass($AlphaSynth_Synthesis_VoiceParameters, $asm, {
		get_combinedVolume: function() {
			return this.$mix1 + this.$mix2;
		},
		reset: function() {
			this.noteOffPending = false;
			this.pitchOffset = 0;
			this.volOffset = 0;
			for (var i = 0; i < this.pData.length; i++) {
				this.pData[i] = new DataView(new ArrayBuffer(8));
			}
			this.$mix1 = 0;
			this.$mix2 = 0;
		},
		mixMonoToMonoInterp: function(startIndex, volume) {
			var inc = (volume - this.$mix1) / 64;
			for (var i = 0; i < this.blockBuffer.get_length(); i++) {
				this.$mix1 += inc;
				this.synthParams.synth.sampleBuffer[startIndex + i] += this.blockBuffer[i] * this.$mix1;
			}
			this.$mix1 = volume;
		},
		mixMonoToStereoInterp: function(startIndex, leftVol, rightVol) {
			var inc_l = (leftVol - this.$mix1) / 64;
			var inc_r = (rightVol - this.$mix2) / 64;
			for (var i = 0; i < this.blockBuffer.get_length(); i++) {
				this.$mix1 += inc_l;
				this.$mix2 += inc_r;
				this.synthParams.synth.sampleBuffer[startIndex] += this.blockBuffer[i] * this.$mix1;
				this.synthParams.synth.sampleBuffer[startIndex + 1] += this.blockBuffer[i] * this.$mix2;
				startIndex += 2;
			}
			this.$mix1 = leftVol;
			this.$mix2 = rightVol;
		},
		mixStereoToStereoInterp: function(startIndex, leftVol, rightVol) {
			var inc_l = (leftVol - this.$mix1) / 64;
			var inc_r = (rightVol - this.$mix2) / 64;
			for (var i = 0; i < this.blockBuffer.get_length(); i++) {
				this.$mix1 += inc_l;
				this.$mix2 += inc_r;
				this.synthParams.synth.sampleBuffer[startIndex + i] += this.blockBuffer[i] * this.$mix1;
				i++;
				this.synthParams.synth.sampleBuffer[startIndex + i] += this.blockBuffer[i] * this.$mix2;
			}
			this.$mix1 = leftVol;
			this.$mix2 = rightVol;
		}
	});
	ss.initEnum($AlphaSynth_Synthesis_VoiceStateEnum, $asm, { stopped: 0, stopping: 1, playing: 2 });
	ss.initEnum($AlphaSynth_Synthesis_VoiceStealingMethod, $asm, { oldest: 0, quietest: 1 });
	ss.initClass($AlphaSynth_Util_IOHelper, $asm, {});
	ss.initClass($AlphaSynth_Util_Logger, $asm, {});
	ss.initEnum($AlphaSynth_Util_LogLevel, $asm, { none: 0, debug: 1, info: 2, warning: 3, error: 4 });
	ss.initClass($AlphaSynth_Util_PcmData, $asm, {
		get_length: function() {
			return this.$1$LengthField;
		},
		set_length: function(value) {
			this.$1$LengthField = value;
		},
		get_bytesPerSample: function() {
			return this.$1$BytesPerSampleField;
		},
		set_bytesPerSample: function(value) {
			this.$1$BytesPerSampleField = value;
		},
		get_bitsPerSample: function() {
			return this.get_bytesPerSample() * 8;
		},
		get_item: null
	});
	ss.initClass($AlphaSynth_Util_PcmData16Bit, $asm, {
		get_item: function(index) {
			index *= 2;
			return ((this.data[index] | this.data[index + 1] << 8) << 16 >> 16) / 32768;
		}
	}, $AlphaSynth_Util_PcmData);
	ss.initClass($AlphaSynth_Util_PcmData24Bit, $asm, {
		get_item: function(index) {
			index *= 3;
			return ((this.data[index] | this.data[index + 1] << 8 | this.data[index + 2] << 16) << 12 >> 12) / 8388608;
		}
	}, $AlphaSynth_Util_PcmData);
	ss.initClass($AlphaSynth_Util_PcmData32Bit, $asm, {
		get_item: function(index) {
			index *= 4;
			return (this.data[index] | this.data[index + 1] << 8 | this.data[index + 2] << 16 | this.data[index + 3] << 24) / 2147483648;
		}
	}, $AlphaSynth_Util_PcmData);
	ss.initClass($AlphaSynth_Util_PcmData8Bit, $asm, {
		get_item: function(index) {
			return this.data[index] / 255 * 2 - 1;
		}
	}, $AlphaSynth_Util_PcmData);
	ss.initClass($AlphaSynth_Util_SynthConstants, $asm, {});
	ss.initClass($AlphaSynth_Util_Tables, $asm, {});
	ss.initClass($AlphaSynth_Util_UrlLoader, $asm, {
		load: function() {
			var request = new XMLHttpRequest();
			request.open(this.method, this.url, true);
			request.responseType = 'arraybuffer';
			request.onload = ss.mkdel(this, function(e) {
				var buffer = ss.cast(request.response, Uint8Array);
				if (ss.isValue(buffer)) {
					this.$fireComplete(buffer);
				}
			});
			request.onprogress = ss.mkdel(this, function(e1) {
				var progressE = ss.cast(e1, ProgressEvent);
				this.$fireProgress(progressE.loaded, progressE.total);
			});
			request.send();
		},
		$fireProgress: function(loaded, full) {
			if (!ss.staticEquals(this.progress, null)) {
				this.progress(loaded, full);
			}
		},
		$fireComplete: function(data) {
			if (!ss.staticEquals(this.complete, null)) {
				this.complete(data);
			}
		}
	});
	ss.initClass($AlphaSynth_Util_WaveHelper, $asm, {});
	$AlphaSynth_Platform_Std.isLittleEndian = true;
	$AlphaSynth_Util_Logger.$1$LogLevelField = 0;
	$AlphaSynth_Util_Logger.set_logLevel(2);
	$AlphaSynth_Platform_TypeUtils.isLittleEndian = true;
	$AlphaSynth_Util_SynthConstants.interpolationMode = 1;
	$AlphaSynth_Util_SynthConstants.sampleRate = 44100;
	$AlphaSynth_Util_SynthConstants.pi = 3.14159265358979;
	$AlphaSynth_Util_SynthConstants.twoPi = 6.28318530717958;
	$AlphaSynth_Util_SynthConstants.halfPi = 1.5707963267949;
	$AlphaSynth_Util_SynthConstants.inverseSqrtOfTwo = 0.707106781186;
	$AlphaSynth_Util_SynthConstants.defaultLfoFrequency = 8;
	$AlphaSynth_Util_SynthConstants.defaultModDepth = 100;
	$AlphaSynth_Util_SynthConstants.defaultPolyphony = 40;
	$AlphaSynth_Util_SynthConstants.minPolyphony = 5;
	$AlphaSynth_Util_SynthConstants.maxPolyphony = 250;
	$AlphaSynth_Util_SynthConstants.defaultBlockSize = 64;
	$AlphaSynth_Util_SynthConstants.maxBufferSize = 0.05;
	$AlphaSynth_Util_SynthConstants.minBufferSize = 0.001;
	$AlphaSynth_Util_SynthConstants.denormLimit = 1E-38;
	$AlphaSynth_Util_SynthConstants.nonAudible = 1E-05;
	$AlphaSynth_Util_SynthConstants.sincWidth = 16;
	$AlphaSynth_Util_SynthConstants.sincResolution = 64;
	$AlphaSynth_Util_SynthConstants.maxVoiceComponents = 4;
	$AlphaSynth_Util_SynthConstants.defaultChannelCount = 16;
	$AlphaSynth_Util_SynthConstants.defaultKeyCount = 128;
	$AlphaSynth_Util_Tables.$_isInitialized = false;
	$AlphaSynth_Util_Tables._envelopeTables = null;
	$AlphaSynth_Util_Tables._semitoneTable = null;
	$AlphaSynth_Util_Tables._centTable = null;
	$AlphaSynth_Util_Tables._sincTable = null;
	$AlphaSynth_Bank_Components_Generators_DefaultGenerators.defaultSine = new $AlphaSynth_Bank_Components_Generators_SineGenerator(new $AlphaSynth_Bank_Descriptors_GeneratorDescriptor());
	$AlphaSynth_Bank_Components_Generators_DefaultGenerators.defaultSaw = new $AlphaSynth_Bank_Components_Generators_SawGenerator(new $AlphaSynth_Bank_Descriptors_GeneratorDescriptor());
	$AlphaSynth_Bank_Components_Generators_DefaultGenerators.defaultSquare = new $AlphaSynth_Bank_Components_Generators_SquareGenerator(new $AlphaSynth_Bank_Descriptors_GeneratorDescriptor());
	$AlphaSynth_Bank_Components_Generators_DefaultGenerators.defaultTriangle = new $AlphaSynth_Bank_Components_Generators_TriangleGenerator(new $AlphaSynth_Bank_Descriptors_GeneratorDescriptor());
	$AlphaSynth_Bank_PatchBank.drumBank = 128;
	$AlphaSynth_Bank_PatchBank.bankSize = 128;
	$AlphaSynth_Midi_MidiHelper.microSecondsPerMinute = 60000000;
	$AlphaSynth_Midi_MidiHelper.minChannel = 0;
	$AlphaSynth_Midi_MidiHelper.maxChannel = 15;
	$AlphaSynth_Midi_MidiHelper.drumChannel = 9;
})();
