/*
 * This file is part of alphaSynth.
 * Copyright (c) 2014, T3866, PerryCodes, Daniel Kuschny and Contributors, All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.0 of the License, or at your option any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library.
 */
package as.synthesis;

import as.ds.FixedArray.FixedArray;
import as.synthesis.SynthHelper;
import as.ds.LinkedList.LinkedList;
import as.ds.LinkedList.LinkedListNode;
import as.util.SynthConstants;
import haxe.ds.GenericStack.GenericStack;

class VoiceStealingMethod
{
    public static inline var Oldest = 0;
    public static inline var Quietest = 1;
}

class VoiceNode
{
    public var value:Voice;
    public var next:VoiceNode;
    public function new()
    {
        
    }
}

class VoiceManager
{
    private var _voicePool:FixedArray<Voice>;
    private var _vNodes:GenericStack<VoiceNode>;   
    public var stealingMethod:Int;
    public var polyphony:Int;
    public var freeVoices:LinkedList<Voice>;
    public var activeVoices:LinkedList<Voice>;
    public var registry:FixedArray<FixedArray<VoiceNode>>;
    
    public function new(voiceCount:Int, synth:Synthesizer)
    {
        stealingMethod = VoiceStealingMethod.Oldest;
        polyphony = voiceCount;
        
        _voicePool = new FixedArray<Voice>(voiceCount);
        _vNodes = new GenericStack<VoiceNode>();
        freeVoices = new LinkedList<Voice>();
        activeVoices = new LinkedList<Voice>();

        for (i in 0 ... voiceCount)
        {
            var v = new Voice(synth);
            _voicePool[i] = v;
            _vNodes.add(new VoiceNode());
            freeVoices.addLast(v);
        }

        registry = new FixedArray<FixedArray<VoiceNode>>(SynthConstants.DefaultChannelCount);
        for (i in 0 ... registry.length)
        {
            registry[i] = new FixedArray(SynthConstants.DefaultKeyCount);
        }
    }

    public function getFreeVoice() : Voice
    {
        if (freeVoices.length > 0)
        {
            var voice = freeVoices.first.value;
            freeVoices.removeFirst();
            return voice;
        }
        else if (stealingMethod == VoiceStealingMethod.Oldest)
            return stealOldest();
        else
            return stealQuietestVoice();
    }

    public function addToRegistry(voice:Voice) : Void
    {
        var node:VoiceNode = _vNodes.pop();
        node.value = voice;
        node.next = registry[voice.voiceParams.channel][voice.voiceParams.note];
        registry[voice.voiceParams.channel][voice.voiceParams.note] = node;
    }

    public function removeFromRegistry(channel:Int, note:Int) : Void
    {
        var node:VoiceNode = registry[channel][note];
        while (node != null)
        {
            _vNodes.add(node);
            node = node.next;
        }
        registry[channel][note] = null;
    }
    
    public function removeVoiceFromRegistry(voice:Voice) : Void
    {
        var node:VoiceNode = registry[voice.voiceParams.channel][voice.voiceParams.note];
        if (node == null)
            return;
        if (node.value == voice)
        {
            registry[voice.voiceParams.channel][voice.voiceParams.note] = node.next;
            _vNodes.add(node);
            return;
        }
        else
        {
            var node2:VoiceNode = node;
            node = node.next;
            while (node != null)
            {
                if (node.value == voice)
                {
                    node2.next = node.next;
                    _vNodes.add(node);
                    return;
                }
                node2 = node;
                node = node.next;
            }
        }
    }
    
    public function clearRegistry() : Void
    {
        var node:LinkedListNode<Voice> = activeVoices.first;
        while (node != null)
        {
            var vnode:VoiceNode = registry[node.value.voiceParams.channel][node.value.voiceParams.note];
            while (vnode != null)
            {
                _vNodes.add(vnode);
                vnode = vnode.next;
            }
            registry[node.value.voiceParams.channel][node.value.voiceParams.note] = null;
            node = node.next;
        }
    }
    
    public function unloadPatches() : Void
    {
        for (x in 0 ... _voicePool.length)
        {
            _voicePool[x].configure(0, 0, 0, null);
            for (n in _vNodes)
                n.value = null;
        }
    }
    
    private function stealOldest() : Voice
    {
        var node:LinkedListNode<Voice> = activeVoices.first;
        //first look for a voice that is not playing
        while (node != null && node.value.voiceParams.state == VoiceStateEnum.Playing)
            node = node.next; 
        //if no stopping voice is found use the oldest
        if (node == null) 
            node = activeVoices.first;
        //check and remove from registry
        removeVoiceFromRegistry(node.value);
        activeVoices.remove(node);
        //stop voice if it is not already
        node.value.voiceParams.state = VoiceStateEnum.Stopped;
        return node.value;
    }

    private function stealQuietestVoice() : Voice
    {
        var voiceVolume = 1000.0;
        var quietest:LinkedListNode<Voice>  = null;
        var node:LinkedListNode<Voice>  = activeVoices.first;
        while (node != null)
        {
            if (node.value.voiceParams.state != VoiceStateEnum.Playing)
            {
                var volume = node.value.voiceParams.mixing[0] + node.value.voiceParams.mixing[1];
                if (volume < voiceVolume)
                {
                    quietest = node;
                    voiceVolume = volume;
                }
            }
            node = node.next;
        }
        if (quietest == null)
            quietest = activeVoices.first;
        //check and remove from registry
        removeVoiceFromRegistry(quietest.value);
        activeVoices.remove(quietest);
        //stop voice if it is not already
        quietest.value.voiceParams.state = VoiceStateEnum.Stopped;
        return quietest.value;
    }    
}