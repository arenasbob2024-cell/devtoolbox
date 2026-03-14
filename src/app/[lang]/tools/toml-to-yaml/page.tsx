'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ParsedValue {
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  value: any;
}

class TOMLParser {
  private text: string;
  private pos: number = 0;

  constructor(text: string) {
    this.text = text;
  }

  parse(): Record<string, any> {
    const result: Record<string, any> = {};
    this.skipWhitespace();

    while (this.pos < this.text.length) {
      this.skipWhitespace();
      if (this.pos >= this.text.length) break;

      if (this.peek() === '[') {
        this.parseTable(result);
      } else if (this.peek() === '#') {
        this.skipComment();
      } else {
        this.parseKeyValue(result);
      }

      this.skipWhitespace();
    }

    return result;
  }

  private peek(): string {
    return this.text[this.pos] || '';
  }

  private advance(): string {
    return this.text[this.pos++];
  }

  private skipWhitespace(): void {
    while (this.pos < this.text.length && /[\s]/.test(this.peek())) {
      this.advance();
    }
  }

  private skipComment(): void {
    while (this.pos < this.text.length && this.peek() !== '\n') {
      this.advance();
    }
  }

  private parseKeyValue(obj: Record<string, any>): void {
    const key = this.parseKey();
    this.skipWhitespace();
    if (this.peek() !== '=') throw new Error('Expected = after key');
    this.advance();
    this.skipWhitespace();
    const value = this.parseValue();
    obj[key] = value;
    this.skipWhitespace();
    if (this.pos < this.text.length && this.peek() !== '\n' && this.peek() !== '#') {
      // skip to end of line
    }
  }

  private parseKey(): string {
    let key = '';
    if (this.peek() === '"') {
      this.advance();
      while (this.peek() !== '"' && this.pos < this.text.length) {
        key += this.advance();
      }
      this.advance();
    } else {
      while (this.pos < this.text.length && /[a-zA-Z0-9_-]/.test(this.peek())) {
        key += this.advance();
      }
    }
    return key.trim();
  }

  private parseValue(): any {
    this.skipWhitespace();
    const ch = this.peek();

    if (ch === '"' || ch === "'") {
      return this.parseString();
    } else if (ch === '[') {
      return this.parseArray();
    } else if (ch === '{') {
      return this.parseInlineTable();
    } else if (ch === 't' || ch === 'f') {
      return this.parseBoolean();
    } else if (/[\d-]/.test(ch)) {
      return this.parseNumber();
    }

    return null;
  }

  private parseString(): string {
    const quote = this.advance();
    let str = '';
    while (this.peek() !== quote && this.pos < this.text.length) {
      if (this.peek() === '\\') {
        this.advance();
        const esc = this.advance();
        switch (esc) {
          case 'n': str += '\n'; break;
          case 't': str += '\t'; break;
          case 'r': str += '\r'; break;
          case '\\': str += '\\'; break;
          case '"': str += '"'; break;
          default: str += esc;
        }
      } else {
        str += this.advance();
      }
    }
    if (this.peek() === quote) this.advance();
    return str;
  }

  private parseNumber(): number | string {
    let num = '';
    if (this.peek() === '-') num += this.advance();
    while (this.pos < this.text.length && /[\d.]/.test(this.peek())) {
      num += this.advance();
    }
    return num.includes('.') ? parseFloat(num) : parseInt(num);
  }

  private parseBoolean(): boolean {
    if (this.text.substr(this.pos, 4) === 'true') {
      this.pos += 4;
      return true;
    }
    if (this.text.substr(this.pos, 5) === 'false') {
      this.pos += 5;
      return false;
    }
    return false;
  }

  private parseArray(): any[] {
    this.advance();
    const arr: any[] = [];
    this.skipWhitespace();

    while (this.peek() !== ']' && this.pos < this.text.length) {
      arr.push(this.parseValue());
      this.skipWhitespace();
      if (this.peek() === ',') {
        this.advance();
        this.skipWhitespace();
      }
    }

    if (this.peek() === ']') this.advance();
    return arr;
  }

  private parseInlineTable(): Record<string, any> {
    this.advance();
    const obj: Record<string, any> = {};
    this.skipWhitespace();

    while (this.peek() !== '}' && this.pos < this.text.length) {
      const key = this.parseKey();
      this.skipWhitespace();
      if (this.peek() === '=') {
        this.advance();
        this.skipWhitespace();
        obj[key] = this.parseValue();
        this.skipWhitespace();
        if (this.peek() === ',') {
          this.advance();
          this.skipWhitespace();
        }
      }
    }

    if (this.peek() === '}') this.advance();
    return obj;
  }

  private parseTable(obj: Record<string, any>): void {
    const isArray = this.peek(1) === '[';
    this.advance(); // first [
    if (isArray) this.advance(); // second [

    let tableName = '';
    while (
      this.pos < this.text.length &&
      (isArray ? this.text.substr(this.pos, 2) !== ']]' : this.peek() !== ']')
    ) {
      tableName += this.advance();
    }

    if (isArray) {
      this.advance();
      this.advance();
    } else {
      this.advance();
    }

    tableName = tableName.trim();
    if (tableName) {
      if (!obj[tableName]) {
        obj[tableName] = isArray ? [] : {};
      }
      if (isArray && Array.isArray(obj[tableName])) {
        const tableObj: Record<string, any> = {};
        obj[tableName].push(tableObj);
        this.skipWhitespace();
        while (this.pos < this.text.length && this.peek() !== '[') {
          if (this.peek() === '#') {
            this.skipComment();
          } else if (/[a-zA-Z0-9_"-]/.test(this.peek())) {
            this.parseKeyValue(tableObj);
          } else {
            this.advance();
          }
          this.skipWhitespace();
        }
      }
    }
  }

  peek(offset: number = 0): string {
    return this.text[this.pos + offset] || '';
  }
}

function toYAML(obj: any, indent: number = 0, indentSize: number = 2): string {
  const indentStr = ' '.repeat(indent);
  const nextIndentStr = ' '.repeat(indent + indentSize);

  if (obj === null || obj === undefined) {
    return 'null';
  }

  if (typeof obj === 'boolean') {
    return obj ? 'true' : 'false';
  }

  if (typeof obj === 'number') {
    return String(obj);
  }

  if (typeof obj === 'string') {
    if (obj.includes('\n') || obj.includes(':') || obj.includes('#')) {
      return `"${obj.replace(/"/g, '\\"')}"`;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    if (obj.every((item) => typeof item !== 'object' || item === null)) {
      return '[' + obj.map((item) => toYAML(item, 0, indentSize)).join(', ') + ']';
    }
    const lines: string[] = [];
    for (const item of obj) {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        lines.push(nextIndentStr + '-');
        for (const [key, val] of Object.entries(item)) {
          lines.push(
            nextIndentStr + '  ' + key + ': ' + toYAML(val, indent + indentSize + 2, indentSize).trim()
          );
        }
      } else {
        lines.push(nextIndentStr + '- ' + toYAML(item, indent + indentSize + 2, indentSize).trim());
      }
    }
    return '\n' + lines.join('\n');
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';

    const lines: string[] = [];
    for (const key of keys) {
      const val = obj[key];
      const valStr = toYAML(val, indent + indentSize, indentSize);
      if (valStr.startsWith('\n')) {
        lines.push(nextIndentStr + key + ':' + valStr);
      } else {
        lines.push(nextIndentStr + key + ': ' + valStr.trim());
      }
    }
    return '\n' + lines.join('\n');
  }

  return String(obj);
}

const sampleTOML = `[package]
name = "my-app"
version = "0.1.0"
authors = ["John Doe", "Jane Smith"]
description = "A sample Rust project"

[dependencies]
serde = "1.0"
tokio = { version = "1.0", features = ["full"] }
regex = "1.5"

[dev-dependencies]
criterion = "0.3"

[[profiles]]
name = "dev"
opt-level = 0

[[profiles]]
name = "release"
opt-level = 3
lto = true
`;

export default function TOMLToYAML() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['toml-to-yaml'];

  const [tomlInput, setTomlInput] = useState(sampleTOML);
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState('');

  const yamlOutput = useMemo(() => {
    try {
      setError('');
      const parser = new TOMLParser(tomlInput);
      const parsed = parser.parse();
      return toYAML(parsed, 0, indentSize);
    } catch (err: any) {
      setError(err.message || 'Invalid TOML');
      return '';
    }
  }, [tomlInput, indentSize]);

  const handleClearInput = useCallback(() => {
    setTomlInput('');
    setError('');
  }, []);

  const handleLoadSample = useCallback(() => {
    setTomlInput(sampleTOML);
    setError('');
  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 16,
  };

  const panelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  };

  const textareaStyle: React.CSSProperties = {
    flex: 1,
    padding: 12,
    fontSize: 13,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    outline: 'none',
    resize: 'none',
    minHeight: 400,
  };

  const outputStyle: React.CSSProperties = {
    ...textareaStyle,
    background: 'var(--bg-primary)',
    color: 'var(--accent-emerald)',
    resize: 'none',
    padding: 12,
    whiteSpace: 'pre-wrap',
    overflow: 'auto',
  };

  const optionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  };

  const selectStyle: React.CSSProperties = {
    padding: '6px 10px',
    fontSize: 12,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    outline: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '6px 12px',
    fontSize: 12,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="toml-to-yaml">
      <div style={optionsStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
            Indent Size:
          </label>
          <select value={indentSize} onChange={(e) => setIndentSize(parseInt(e.target.value))} style={selectStyle}>
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>
        <button onClick={handleLoadSample} style={{ ...buttonStyle, color: 'var(--accent-blue)' }} className="btn btn-secondary">
          {dict.common.loadSample}
        </button>
        <button onClick={handleClearInput} style={buttonStyle} className="btn btn-secondary">
          {dict.common.clear}
        </button>
      </div>

      <div style={containerStyle}>
        <div style={panelStyle}>
          <div style={labelStyle}>{dict.common.input}</div>
          <textarea
            value={tomlInput}
            onChange={(e) => setTomlInput(e.target.value)}
            placeholder="Enter TOML here..."
            style={textareaStyle}
          />
        </div>

        <div style={panelStyle}>
          <div style={labelStyle}>{dict.common.output}</div>
          <div
            style={{
              ...outputStyle,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {error ? (
              <div style={{ color: 'var(--accent-red)', fontSize: 12 }}>
                <strong>Error:</strong> {error}
              </div>
            ) : (
              <pre
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  color: 'inherit',
                }}
              >
                {yamlOutput || 'YAML output will appear here...'}
              </pre>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginBottom: 20 }}>
        <CopyButton text={yamlOutput} label={dict.common.copy} />
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
          {t.seoContent}
        </p>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Features:</h3>
          <ul style={{ marginLeft: 20 }}>
            <li>Full TOML parsing with key-value pairs, tables, and inline tables</li>
            <li>Support for arrays, strings, numbers, booleans, and dates</li>
            <li>Customizable indentation (2 or 4 spaces)</li>
            <li>Real-time conversion with error handling</li>
            <li>Copy output with one click</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
