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
using AlphaSynth.Platform;

namespace AlphaSynth.IO
{
    public class ByteBuffer : IReadable
    {
        private byte[] _buffer;
        private int _capacity;

        public int Length { get; private set; }

        public int Position { get; set; }

        public virtual byte[] GetBuffer()
        {
            return _buffer;
        }


        public static ByteBuffer Empty()
        {
            return WithCapactiy(0);
        }

        public static ByteBuffer WithCapactiy(int capacity)
        {
            ByteBuffer buffer = new ByteBuffer();
            buffer._buffer = new byte[capacity];
            buffer._capacity = capacity;
            return buffer;
        }

        public static ByteBuffer FromBuffer(byte[] data)
        {
            ByteBuffer buffer = new ByteBuffer();
            buffer._buffer = data;
            buffer._capacity = buffer.Length = data.Length;
            return buffer;
        }

        private ByteBuffer()
        {
        }

        public void Reset()
        {
            Position = 0;
        }

        public void Skip(int offset)
        {
            Position += offset;
        }

        private void SetCapacity(int value)
        {
            if (value != _capacity)
            {
                if (value > 0)
                {
                    var newBuffer = new byte[value];
                    if (Length > 0) Std.BlockCopy(_buffer, 0, newBuffer, 0, Length);
                    _buffer = newBuffer;
                }
                else
                {
                    _buffer = null;
                }
                _capacity = value;
            }
        }

        public int ReadByte()
        {
            int n = Length - Position;
            if (n <= 0)
                return -1;

            var b = _buffer[Position];
            Position++;
            return b;
        }

        public int Read(byte[] buffer, int offset, int count)
        {
            int n = Length - Position;
            if (n > count) n = count;
            if (n <= 0)
                return 0;

            if (n <= 8)
            {
                int byteCount = n;
                while (--byteCount >= 0)
                    buffer[offset + byteCount] = _buffer[Position + byteCount];
            }
            else
                Std.BlockCopy(_buffer, Position, buffer, offset, n);
            Position += n;

            return n;
        }

        public virtual byte[] ToArray()
        {
            byte[] copy = new byte[Length];
            Std.BlockCopy(_buffer, 0, copy, 0, Length);
            return copy;
        }
    }
}
