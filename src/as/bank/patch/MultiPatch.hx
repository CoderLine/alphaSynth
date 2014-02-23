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
package as.bank.patch;

import as.bank.AssetManager;
import as.ds.FixedArray.FixedArray;
import as.platform.Types.Byte;
import as.platform.Types.TypeUtils;
import as.sf2.Enum.GeneratorEnum;
import as.sf2.Sf2Region;
      
class MultiPatch extends Patch
{
    private var _intervalType:Int;
    private var _intervalList:FixedArray<PatchInterval>;

    public function new(name:String) 
    {
        super(name);
        _intervalType = 0;
    }

    public function findPatches(channel:Int, key:Int, velocity:Int, layers:Array<Patch>)
    {
        switch (_intervalType)
        {
            case IntervalType.ChannelKeyVelocity:
                for (x in 0 ... _intervalList.length)
                {
                    if (_intervalList[x].checkAllIntervals(channel, key, velocity))
                        layers.push(_intervalList[x].patch);
                }
            case IntervalType.ChannelKey:
                for (x in 0 ... _intervalList.length)
                {
                    if (_intervalList[x].checkChannelAndKey(channel, key))
                        layers.push(_intervalList[x].patch);
                }
            case IntervalType.KeyVelocity:
                for (x in 0 ... _intervalList.length)
                {
                    if (_intervalList[x].checkKeyAndVelocity(key, velocity))
                        layers.push(_intervalList[x].patch);
                }
            case IntervalType.Key:
                for (x in 0 ... _intervalList.length)
                {
                    if (_intervalList[x].checkKey(key))
                        layers.push(_intervalList[x].patch);
                }
        }
    }    
    
    public function loadSf2(regions:Array<Sf2Region>, assets:AssetManager)
    {
        _intervalList = new FixedArray<PatchInterval>(regions.length);
        for (x in 0 ... regions.length)
        {
            var loKey:Byte;
            var hiKey:Byte;
            var loVel:Byte;
            var hiVel:Byte;
            if(TypeUtils.IsLittleEndian)
            {
                loKey = (regions[x].generators[GeneratorEnum.KeyRange] & 0xFF);
                hiKey = ((regions[x].generators[GeneratorEnum.KeyRange] >> 8) & 0xFF);
                loVel = (regions[x].generators[GeneratorEnum.VelocityRange] & 0xFF);
                hiVel = ((regions[x].generators[GeneratorEnum.VelocityRange] >> 8) & 0xFF);
            }
            else
            {
                hiKey = (regions[x].generators[GeneratorEnum.KeyRange] & 0xFF);
                loKey = ((regions[x].generators[GeneratorEnum.KeyRange] >> 8) & 0xFF);
                hiVel = (regions[x].generators[GeneratorEnum.VelocityRange] & 0xFF);
                loVel = ((regions[x].generators[GeneratorEnum.VelocityRange] >> 8) & 0xFF);
            }
            var sf2 = new Sf2Patch(name + "_" + x);
            sf2.load(regions[x], assets);
            _intervalList[x] = new PatchInterval(sf2, 0, 15, loKey, hiKey, loVel, hiVel);
        }
        determineIntervalType();
    }
    
    private function determineIntervalType()
    {
        var checkChannel = false;
        var checkVelocity = false;
        for (x in 0 ... _intervalList.length)
        {
            if (_intervalList[x].startChannel != 0 || _intervalList[x].endChannel != 15)
            {
                checkChannel = true;
                if (checkChannel && checkVelocity)
                    _intervalType = IntervalType.ChannelKeyVelocity;
            }
            if (_intervalList[x].startVelocity != 0 || _intervalList[x].endVelocity != 127)
            {
                checkVelocity = true;
                if (checkChannel && checkVelocity)
                    _intervalType = IntervalType.ChannelKeyVelocity;
            }
        }
        if (checkChannel)
            _intervalType = IntervalType.ChannelKey;
        else if (checkVelocity)
            _intervalType = IntervalType.KeyVelocity;
        else
            _intervalType = IntervalType.Key;
    }
}

class IntervalType 
{          
    public static inline var ChannelKeyVelocity = 0; 
    public static inline var ChannelKey = 1;
    public static inline var KeyVelocity = 2;
    public static inline var Key = 3;
}

class PatchInterval
{
    public var patch:Patch;
    public var startChannel:Byte;
    public var startKey:Byte;
    public var startVelocity:Byte;
    public var endChannel:Byte;
    public var endKey:Byte;
    public var endVelocity:Byte;

    public function new(patch:Patch, startChannel:Byte, endChannel:Byte, startKey:Byte, endKey:Byte, startVelocity:Byte, endVelocity:Byte)
    {
        this.patch = patch;
        this.startChannel = startChannel;
        this.endChannel = endChannel;
        this.startKey = startKey;
        this.endKey = endKey;
        this.startVelocity = startVelocity;
        this.endVelocity = endVelocity;
    }
    
    public function checkAllIntervals(channel:Int, key:Int, velocity:Int) : Bool
    {
        return (channel >= startChannel && channel <= endChannel) &&
            (key >= startKey && key <= endKey) &&
            (velocity >= startVelocity && velocity <= endVelocity);
    }
    
    public function checkChannelAndKey(channel:Int, key:Int) : Bool
    {
        return (channel >= startChannel && channel <= endChannel) &&
            (key >= startKey && key <= endKey);
    }
    
    public function checkKeyAndVelocity(key:Int, velocity:Int) : Bool
    {
        return (key >= startKey && key <= endKey) &&
            (velocity >= startVelocity && velocity <= endVelocity);
    }
    
    public function checkKey(key:Int) : Bool
    {
        return (key >= startKey && key <= endKey);
    }    
}