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
package as.ds;

@:allow(as.ds)
class LinkedListNode<T>
{
    private var _list:LinkedList<T>;
    private var _next:LinkedListNode<T>;
    private var _prev:LinkedListNode<T>;
    
    public var value:T;
    public var next(get, null):LinkedListNode<T>;
    public var prev(get, null):LinkedListNode<T>;
    
    private function get_next() : LinkedListNode<T>
    {
        return _next == null || _list.first == _next ? null : _next;        
    }
    
    private function get_prev() : LinkedListNode<T>
    {
        return _prev == null || this == _list.first  ? null : _prev;        
    }
    
    public function new()
    {
        
    }
    
    public function invalidate()
    {
        _list = null;
        _next = null;
        _prev = null;
    }
}

@:access(as.ds)
class LinkedList<T>
{
    public var first:LinkedListNode<T>;
    
    public var length(default, null):Int;
    
    public function new() 
    {
        length = 0;
    }
    
    public function addFirst(v:T)
    {
        var node = new LinkedListNode<T>();
        node.value = v;
        if (first == null)
        {
            insertNodeToEmptyList(node);
        }
        else
        {
            insertNodeBefore(first, node);
            first = node;
        }
    }
    
    public function addLast(v:T)
    {
        var node = new LinkedListNode<T>();
        node.value = v;
        if (first == null)
        {
            insertNodeToEmptyList(node);
        }
        else
        {
            insertNodeBefore(first, node);
        }
    }
    
    public function removeFirst() : T
    {
        if (first == null) return null;
        var v = first.value;
        remove(first);
        return v;
    }
    
    public function removeLast() : T
    {
        if (first == null) return null;
        var v = first._prev != null ? first._prev.value : null;
        remove(first._prev);
        return v;
    }
    
    public function remove(n:LinkedListNode<T>)
    {
        if (n._next == n)
        {
            first = null;
        }
        else
        {
            n._next._prev = n._prev;
            n._prev._next = n._next;
            if (first == n)
            {
                first = n._next;
            }
        }
        n.invalidate();
        length--;
    }
    
    private function insertNodeBefore(node:LinkedListNode<T>, newNode:LinkedListNode<T>)
    {
        newNode._next = node;
        newNode._prev = node._prev;
        node._prev._next = newNode;
        node._prev = newNode;
        newNode._list = this;
        length++;
    }
    
    private function insertNodeToEmptyList(node:LinkedListNode<T>)
    {
        node._next = node;
        node._prev = node;
        node._list = this;
        first = node;
        length++;
    }
}