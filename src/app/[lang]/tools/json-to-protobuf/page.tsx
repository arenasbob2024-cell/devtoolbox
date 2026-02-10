'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function toPascalCase(s: string): string {
  return s
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/(^|[\s_-])([a-z])/g, (_, __, c) => c.toUpperCase())
    .replace(/\s+/g, '');
}

function toSnakeCase(s: string): string {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

interface ConvertOptions {
  rootName: string;
  packageName: string;
  syntax: 'proto3' | 'proto2';
  addComments: boolean;
  useWrappers: boolean;
}

function jsonToProtobuf(json: string, options: ConvertOptions): string {
  const parsed = JSON.parse(json);
  const messages: string[] = [];
  const messageNames = new Set<string>();
  let needsWrapperImport = false;
  let needsValueImport = false;

  function uniqueMessageName(base: string): string {
    let name = toPascalCase(base);
    if (!name) name = 'Message';
    let candidate = name;
    let counter = 2;
    while (messageNames.has(candidate)) {
      candidate = name + counter;
      counter++;
    }
    messageNames.add(candidate);
    return candidate;
  }

  function getProtoType(value: unknown, key: string, indent: string): string {
    if (value === null || value === undefined) {
      if (options.useWrappers) {
        needsValueImport = true;
        return 'google.protobuf.Value';
      }
      needsValueImport = true;
      return 'google.protobuf.Value';
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return 'string'; // default for empty arrays
      const firstItem = value[0];
      if (typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
        const nestedName = uniqueMessageName(key);
        generateMessage(firstItem as Record<string, unknown>, nestedName, indent);
        return nestedName;
      }
      return getProtoType(firstItem, key, indent);
    }

    switch (typeof value) {
      case 'string':
        if (options.useWrappers) {
          needsWrapperImport = true;
          return 'google.protobuf.StringValue';
        }
        return 'string';
      case 'number':
        if (Number.isInteger(value)) {
          if (options.useWrappers) {
            needsWrapperImport = true;
            return 'google.protobuf.Int32Value';
          }
          return 'int32';
        }
        if (options.useWrappers) {
          needsWrapperImport = true;
          return 'google.protobuf.DoubleValue';
        }
        return 'double';
      case 'boolean':
        if (options.useWrappers) {
          needsWrapperImport = true;
          return 'google.protobuf.BoolValue';
        }
        return 'bool';
      case 'object': {
        const nestedName = uniqueMessageName(key);
        generateMessage(value as Record<string, unknown>, nestedName, indent);
        return nestedName;
      }
      default:
        return 'string';
    }
  }

  function generateMessage(obj: Record<string, unknown>, name: string, indent: string): void {
    const lines: string[] = [];
    lines.push(`${indent}message ${name} {`);

    const entries = Object.entries(obj);
    entries.forEach(([key, value], index) => {
      const fieldNum = index + 1;
      const snakeKey = toSnakeCase(key);
      const commentPart = options.addComments && snakeKey !== key ? `  // original: "${key}"` : '';

      if (Array.isArray(value)) {
        const itemType = getProtoType(value, key, indent + '  ');
        if (options.syntax === 'proto2') {
          lines.push(`${indent}  repeated ${itemType} ${snakeKey} = ${fieldNum};${commentPart}`);
        } else {
          lines.push(`${indent}  repeated ${itemType} ${snakeKey} = ${fieldNum};${commentPart}`);
        }
      } else {
        const protoType = getProtoType(value, key, indent + '  ');
        if (options.syntax === 'proto2' && typeof value !== 'object') {
          lines.push(`${indent}  optional ${protoType} ${snakeKey} = ${fieldNum};${commentPart}`);
        } else {
          lines.push(`${indent}  ${protoType} ${snakeKey} = ${fieldNum};${commentPart}`);
        }
      }
    });

    lines.push(`${indent}}`);
    messages.push(lines.join('\n'));
  }

  // Handle root
  const rootName = toPascalCase(options.rootName) || 'MyMessage';
  messageNames.add(rootName);

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateMessage(parsed[0] as Record<string, unknown>, rootName, '');
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateMessage(parsed as Record<string, unknown>, rootName, '');
  }

  // Build header
  const headerLines: string[] = [];
  headerLines.push(`syntax = "${options.syntax}";`);
  headerLines.push('');

  if (options.packageName.trim()) {
    headerLines.push(`package ${options.packageName.trim()};`);
    headerLines.push('');
  }

  if (needsWrapperImport) {
    headerLines.push('import "google/protobuf/wrappers.proto";');
  }
  if (needsValueImport) {
    headerLines.push('import "google/protobuf/struct.proto";');
  }
  if (needsWrapperImport || needsValueImport) {
    headerLines.push('');
  }

  return headerLines.join('\n') + messages.reverse().join('\n\n') + '\n';
}

// Simple syntax highlighting for protobuf
function highlightProtobuf(code: string): React.ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    // Highlight comments
    const commentIdx = remaining.indexOf('//');
    let comment = '';
    if (commentIdx !== -1) {
      comment = remaining.slice(commentIdx);
      remaining = remaining.slice(0, commentIdx);
    }

    // Highlight keywords
    const keywordPattern = /\b(syntax|package|import|message|enum|service|rpc|returns|repeated|optional|required|oneof|map|reserved|option)\b/g;
    const typePattern = /\b(string|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|double|float|bool|bytes)\b/g;
    const numberPattern = /\b(\d+)\b/g;

    let lastIndex = 0;
    const tokens: { start: number; end: number; text: string; color: string }[] = [];

    let match: RegExpExecArray | null;
    while ((match = keywordPattern.exec(remaining)) !== null) {
      tokens.push({ start: match.index, end: match.index + match[0].length, text: match[0], color: '#c792ea' });
    }
    while ((match = typePattern.exec(remaining)) !== null) {
      tokens.push({ start: match.index, end: match.index + match[0].length, text: match[0], color: '#82aaff' });
    }
    while ((match = numberPattern.exec(remaining)) !== null) {
      // Only highlight field numbers (after =)
      const before = remaining.slice(0, match.index).trimEnd();
      if (before.endsWith('=') || remaining.slice(0, match.index).match(/=\s*$/)) {
        tokens.push({ start: match.index, end: match.index + match[0].length, text: match[0], color: '#f78c6c' });
      }
    }

    // Highlight string literals
    const stringPattern = /"[^"]*"/g;
    while ((match = stringPattern.exec(remaining)) !== null) {
      tokens.push({ start: match.index, end: match.index + match[0].length, text: match[0], color: '#c3e88d' });
    }

    // Sort by position and remove overlaps
    tokens.sort((a, b) => a.start - b.start);
    const filtered: typeof tokens = [];
    let lastEnd = 0;
    for (const tok of tokens) {
      if (tok.start >= lastEnd) {
        filtered.push(tok);
        lastEnd = tok.end;
      }
    }

    lastIndex = 0;
    for (const tok of filtered) {
      if (tok.start > lastIndex) {
        parts.push(<span key={key++}>{remaining.slice(lastIndex, tok.start)}</span>);
      }
      parts.push(<span key={key++} style={{ color: tok.color }}>{tok.text}</span>);
      lastIndex = tok.end;
    }
    if (lastIndex < remaining.length) {
      parts.push(<span key={key++}>{remaining.slice(lastIndex)}</span>);
    }

    if (comment) {
      parts.push(<span key={key++} style={{ color: '#546e7a' }}>{comment}</span>);
    }

    return (
      <div key={i} style={{ minHeight: '1.4em' }}>
        {parts.length > 0 ? parts : '\u00A0'}
      </div>
    );
  });
}

export default function JsonToProtobuf() {
  const { dict } = useLang();
  const t = dict.tools['json-to-protobuf'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('MyMessage');
  const [packageName, setPackageName] = useState('');
  const [syntax, setSyntax] = useState<'proto3' | 'proto2'>('proto3');
  const [addComments, setAddComments] = useState(false);
  const [useWrappers, setUseWrappers] = useState(false);

  const convert = () => {
    try {
      const result = jsonToProtobuf(input, {
        rootName,
        packageName,
        syntax,
        addComments,
        useWrappers,
      });
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      is_active: true,
      score: 95.5,
      tags: ["developer", "protobuf"],
      address: {
        street: "123 Main St",
        city: "Springfield",
        zip_code: "62701",
        country: "US"
      },
      orders: [
        {
          order_id: 1001,
          product: "Widget",
          quantity: 3,
          price: 29.99
        }
      ]
    }, null, 2));
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to Protobuf Converter'}
      description={(t.pageDescription as string) || 'Convert JSON to Protocol Buffers schema'}
      toolId="json-to-protobuf"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={clearAll} className="btn btn-secondary">{common.clear}</button>
      </div>

      {/* Options */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 16,
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'var(--bg-input)',
        borderRadius: 8,
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Root Message:</label>
          <input
            value={rootName}
            onChange={e => setRootName(e.target.value || 'MyMessage')}
            style={{ width: 110, padding: '4px 8px', fontSize: 12 }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Package:</label>
          <input
            value={packageName}
            onChange={e => setPackageName(e.target.value)}
            placeholder="e.g. myapp.v1"
            style={{ width: 120, padding: '4px 8px', fontSize: 12 }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Syntax:</label>
          <select
            value={syntax}
            onChange={e => setSyntax(e.target.value as 'proto3' | 'proto2')}
            style={{ padding: '4px 8px', fontSize: 12 }}
          >
            <option value="proto3">proto3</option>
            <option value="proto2">proto2</option>
          </select>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={addComments} onChange={e => setAddComments(e.target.checked)} />
          Comments
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={useWrappers} onChange={e => setUseWrappers(e.target.checked)} />
          Wrapper Types
        </label>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {common.error}: {error}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>JSON</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Protobuf Schema</label>
            <CopyButton text={output} />
          </div>
          {output ? (
            <div style={{
              minHeight: 350,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13,
              lineHeight: 1.4,
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '12px 14px',
              overflow: 'auto',
              whiteSpace: 'pre',
              color: 'var(--text-primary)',
            }}>
              {highlightProtobuf(output)}
            </div>
          ) : (
            <textarea
              value=""
              readOnly
              placeholder={common.resultPlaceholder}
              style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: 0.5 }}
            />
          )}
        </div>
      </div>

      {/* SEO Content */}
      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
        </div>
      )}
    </ToolLayout>
  );
}
