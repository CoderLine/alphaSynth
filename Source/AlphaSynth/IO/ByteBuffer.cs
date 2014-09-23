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
    public class ByteBuffer : IWriteable, IReadable
    {
        private ByteArray _buffer;
        private int _capacity;

        public int Position { get; set; }
        public int Length { get; private set; }

        public virtual ByteArray GetBuffer()
        {
            return _buffer;
        }

        public ByteBuffer()
            : this(0)
        {
        }

        public ByteBuffer(int capacity)
        {
            _buffer = new ByteArray(capacity);
            _capacity = capacity;
        }

        public ByteBuffer(ByteArray buffer)
        {
            _buffer = buffer;
            Length = _capacity = buffer.Length;
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
                    var newBuffer = new ByteArray(value);
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

            return _buffer[Position++];
        }

        public int Read(ByteArray buffer, int offset, int count)
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

        public void WriteByte(byte value)
        {
            ByteArray buffer = new ByteArray(1);
            buffer[0] = value;
            Write(buffer, 0, 1);
        }

        public void Write(ByteArray buffer, int offset, int count)
        {
            int i = Position + count;

            if (i > Length)
            {
                if (i > _capacity)
                {
                    EnsureCapacity(i);
                }
                Length = i;
            }
            if ((count <= 8) && (buffer != _buffer))
            {
                int byteCount = count;
                while (--byteCount >= 0)
                    _buffer[Position + byteCount] = buffer[offset + byteCount];
            }
            else
                Std.BlockCopy(buffer, offset, _buffer, Position, count);
            Position = i;
        }

        private void EnsureCapacity(int value)
        {
            if (value > _capacity)
            {
                int newCapacity = value;
                if (newCapacity < 256)
                    newCapacity = 256;
                if (newCapacity < _capacity * 2)
                    newCapacity = _capacity * 2;
                SetCapacity(newCapacity);
            }
        }

        public virtual ByteArray ToArray()
        {
            ByteArray copy = new ByteArray(Length);
            Std.BlockCopy(_buffer, 0, copy, 0, Length);
            return copy;
        }
    }

}
