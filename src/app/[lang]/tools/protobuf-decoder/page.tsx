'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface DecodedField {
  fieldNumber: number;
  wireType: number;
  wireTypeName: string;
  value: string | number | bigint | DecodedField[];
}

function decodeVarint(bytes: Uint8Array, offset: number): [bigint, number] {
  let result = 0n;
  let shift = 0n;
  let pos = offset;
  while (pos < bytes.length) {
    const b = bytes[pos];
    result |= BigInt(b & 0x7f) << shift;
    pos++;
    if ((b & 0x80) === 0) break;
    shift += 7n;
  }
  return [result, pos];
}

function decodeProtobuf(bytes: Uint8Array, offset = 0, end?: number): DecodedField[] {
  const fields: DecodedField[] = [];
  const limit = end ?? bytes.length;
  let pos = offset;

  while (pos < limit) {
    const [tag, newPos] = decodeVarint(bytes, pos);
    pos = newPos;
    const fieldNumber = Number(tag >> 3n);
    const wireType = Number(tag & 7n);

    const wireTypeNames = ['Varint', '64-bit', 'Length-delimited', 'Start group', 'End group', '32-bit'];
    const wireTypeName = wireTypeNames[wireType] || 'Unknown';

    if (fieldNumber === 0) break;

    switch (wireType) {
      case 0: { // Varint
        const [value, np] = decodeVarint(bytes, pos);
        pos = np;
        fields.push({ fieldNumber, wireType, wireTypeName, value: value <= Number.MAX_SAFE_INTEGER ? Number(value) : value });
        break;
      }
      case 1: { // 64-bit
        if (pos + 8 > limit) break;
        const view = new DataView(bytes.buffer, bytes.byteOffset + pos, 8);
        const value = view.getFloat64(0, true);
        pos += 8;
        fields.push({ fieldNumber, wireType, wireTypeName, value: Number.isFinite(value) ? value : `0x${Array.from(bytes.slice(pos - 8, pos)).map(b => b.toString(16).padStart(2, '0')).join('')}` });
        break;
      }
      case 2: { // Length-delimited
        const [length, np] = decodeVarint(bytes, pos);
        pos = np;
        const len = Number(length);
        const data = bytes.slice(pos, pos + len);
        pos += len;
        // Try to decode as nested message
        try {
          const nested = decodeProtobuf(data, 0, data.length);
          if (nested.length > 0 && nested.every(f => f.fieldNumber > 0 && f.fieldNumber < 1000)) {
            fields.push({ fieldNumber, wireType, wireTypeName: 'Embedded message', value: nested });
            break;
          }
        } catch { /* not a nested message */ }
        // Try as UTF-8 string
        try {
          const str = new TextDecoder('utf-8', { fatal: true }).decode(data);
          if (/^[\x20-\x7e\t\n\r]*$/.test(str) && str.length > 0) {
            fields.push({ fieldNumber, wireType, wireTypeName: 'String', value: str });
            break;
          }
        } catch { /* not valid utf8 */ }
        // Raw bytes
        fields.push({ fieldNumber, wireType, wireTypeName: 'Bytes', value: `[${len} bytes] ${Array.from(data.slice(0, 32)).map(b => b.toString(16).padStart(2, '0')).join(' ')}${len > 32 ? '...' : ''}` });
        break;
      }
      case 5: { // 32-bit
        if (pos + 4 > limit) break;
        const view = new DataView(bytes.buffer, bytes.byteOffset + pos, 4);
        const value = view.getFloat32(0, true);
        pos += 4;
        fields.push({ fieldNumber, wireType, wireTypeName, value: Number.isFinite(value) ? value : `0x${Array.from(bytes.slice(pos - 4, pos)).map(b => b.toString(16).padStart(2, '0')).join('')}` });
        break;
      }
      default:
        fields.push({ fieldNumber, wireType, wireTypeName: 'Unknown', value: '???' });
        return fields;
    }
  }
  return fields;
}

function renderFields(fields: DecodedField[], indent = 0): string {
  let out = '';
  for (const f of fields) {
    const pad = '  '.repeat(indent);
    if (Array.isArray(f.value)) {
      out += `${pad}Field #${f.fieldNumber} [${f.wireTypeName}]:\n`;
      out += renderFields(f.value, indent + 1);
    } else {
      out += `${pad}Field #${f.fieldNumber} [${f.wireTypeName}]: ${f.value}\n`;
    }
  }
  return out;
}

export default function ProtobufDecoderTool() {
  const { dict } = useLang();
  const t = dict.tools['protobuf-decoder'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [inputFormat, setInputFormat] = useState<'hex' | 'base64'>('hex');

  const decode = () => {
    setError('');
    setOutput('');
    try {
      let bytes: Uint8Array;
      if (inputFormat === 'hex') {
        const hex = input.replace(/[\s\n\r,0x]/g, '');
        if (!/^[0-9a-fA-F]*$/.test(hex)) throw new Error('Invalid hex string');
        bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(b => parseInt(b, 16)));
      } else {
        const binary = atob(input.trim());
        bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      }
      const fields = decodeProtobuf(bytes);
      if (fields.length === 0) throw new Error('No valid protobuf fields found');
      setOutput(renderFields(fields));
    } catch (e: unknown) {
      setError(t.decodingError || `Decoding error: ${e instanceof Error ? e.message : 'Invalid input'}`);
    }
  };

  const loadSample = () => {
    setInputFormat('hex');
    setInput('08 96 01 12 0b 48 65 6c 6c 6f 57 6f 72 6c 64 21 1a 0e 0a 04 4a 6f 68 6e 10 1e 1d 00 00 c8 42');
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="protobuf-decoder">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', background: 'var(--bg-input)', borderRadius: 8,
          border: '1px solid var(--border-color)', overflow: 'hidden',
        }}>
          <button onClick={() => setInputFormat('hex')} style={{ padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: inputFormat === 'hex' ? 'var(--accent-blue)' : 'transparent', color: inputFormat === 'hex' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s' }}>Hex</button>
          <button onClick={() => setInputFormat('base64')} style={{ padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: inputFormat === 'base64' ? 'var(--accent-blue)' : 'transparent', color: inputFormat === 'base64' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s' }}>Base64</button>
        </div>
        <button onClick={decode} className="btn btn-primary">{dict.common.decode} →</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample || 'Sample'}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.encodedInput || 'Encoded Protobuf'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={inputFormat === 'hex' ? (t.hexPlaceholder || 'Paste hex bytes here, e.g. 08 96 01...') : (t.base64Placeholder || 'Paste Base64 encoded protobuf...')} style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.decodedOutput || 'Decoded Fields'}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder} style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About Protobuf Decoder'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Protocol Buffers (protobuf) is a binary serialization format developed by Google. This tool decodes raw protobuf binary data without requiring a .proto schema file. It identifies field numbers, wire types, and attempts to interpret values as strings, numbers, or nested messages. Supports hex and Base64 input formats.'}
        </p>
      </div>
    </ToolLayout>
  );
}
