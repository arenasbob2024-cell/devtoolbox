'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// ---------------------------------------------------------------------------
// Custom YAML parser / validator / formatter
// Handles: key-value pairs, nested objects, arrays (block sequences),
//          strings (plain, single-quoted, double-quoted), numbers, booleans,
//          null (~, null, empty), comments (#), and multi-line scalars (basic).
// Does NOT handle anchors/aliases, tags, flow collections beyond [] / {}.
// ---------------------------------------------------------------------------

interface ParseError {
  line: number;
  message: string;
}

function stripComment(raw: string): string {
  // Remove inline comments that are not inside quotes
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    if (ch === '"' && !inSingle) inDouble = !inDouble;
    if (ch === '#' && !inSingle && !inDouble) {
      return raw.slice(0, i).trimEnd();
    }
  }
  return raw;
}

function indentOf(line: string): number {
  const m = line.match(/^( *)/);
  return m ? m[1].length : 0;
}

function parseScalar(raw: string): unknown {
  const s = raw.trim();
  if (s === '' || s === 'null' || s === '~') return null;
  if (s === 'true' || s === 'True' || s === 'TRUE') return true;
  if (s === 'false' || s === 'False' || s === 'FALSE') return false;
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d+\.\d+([eE][+-]?\d+)?$/.test(s)) return parseFloat(s);
  if (/^0x[0-9a-fA-F]+$/.test(s)) return parseInt(s, 16);
  if (/^0o[0-7]+$/.test(s)) return parseInt(s, 8);
  if (s === '.inf' || s === '.Inf' || s === '.INF') return Infinity;
  if (s === '-.inf' || s === '-.Inf' || s === '-.INF') return -Infinity;
  if (s === '.nan' || s === '.NaN' || s === '.NAN') return NaN;
  if (s === '[]') return [];
  if (s === '{}') return {};
  // Quoted strings
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return s;
}

interface Line {
  raw: string;
  content: string;      // after comment stripping
  indent: number;
  num: number;          // 1-based line number
  isBlank: boolean;
  isComment: boolean;
}

function prepareLines(yaml: string): Line[] {
  const raws = yaml.split('\n');
  return raws.map((raw, i) => {
    const trimmed = raw.trimStart();
    const isBlank = trimmed === '';
    const isComment = trimmed.startsWith('#');
    const content = isBlank || isComment ? '' : stripComment(raw);
    return {
      raw,
      content,
      indent: indentOf(raw),
      num: i + 1,
      isBlank,
      isComment,
    };
  });
}

function validateAndParse(yaml: string): { value: unknown; errors: ParseError[] } {
  const errors: ParseError[] = [];
  const lines = prepareLines(yaml);

  // Filter to meaningful lines
  const meaningful = lines.filter(l => !l.isBlank && !l.isComment);
  if (meaningful.length === 0) return { value: null, errors: [] };

  // Check for tab characters
  for (const l of lines) {
    if (l.raw.includes('\t')) {
      errors.push({ line: l.num, message: 'Tabs are not allowed in YAML; use spaces for indentation' });
    }
  }

  // Check consistent indentation
  let indentUnit = 0;
  for (let i = 1; i < meaningful.length; i++) {
    const diff = meaningful[i].indent - meaningful[i - 1].indent;
    if (diff > 0) {
      if (indentUnit === 0) {
        indentUnit = diff;
      } else if (diff % indentUnit !== 0) {
        errors.push({ line: meaningful[i].num, message: `Inconsistent indentation (expected multiple of ${indentUnit}, got ${diff})` });
      }
    }
  }

  try {
    const result = parseBlock(meaningful, 0, meaningful.length, errors);
    return { value: result, errors };
  } catch (e) {
    errors.push({ line: 1, message: e instanceof Error ? e.message : 'Parse error' });
    return { value: null, errors };
  }
}

function parseBlock(lines: Line[], start: number, end: number, errors: ParseError[]): unknown {
  if (start >= end) return null;
  const firstLine = lines[start];

  // Detect if this block is a sequence (starts with "- ")
  if (firstLine.content.trimStart().startsWith('- ')) {
    return parseSequence(lines, start, end, firstLine.indent, errors);
  }

  // Otherwise treat as mapping
  return parseMapping(lines, start, end, firstLine.indent, errors);
}

function parseMapping(lines: Line[], start: number, end: number, baseIndent: number, errors: ParseError[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  let i = start;

  while (i < end) {
    const line = lines[i];
    if (line.indent < baseIndent) break;
    if (line.indent > baseIndent) {
      errors.push({ line: line.num, message: 'Unexpected indentation' });
      i++;
      continue;
    }

    const trimmed = line.content.trimStart();

    // Skip sequence items at the same level (shouldn't happen in mapping)
    if (trimmed.startsWith('- ')) {
      errors.push({ line: line.num, message: 'Unexpected sequence item in mapping context' });
      i++;
      continue;
    }

    // Match key: value
    const kvMatch = trimmed.match(/^(.+?):\s*(.*)/);
    if (!kvMatch) {
      errors.push({ line: line.num, message: `Expected key-value pair, got: "${trimmed}"` });
      i++;
      continue;
    }

    let key = kvMatch[1].trim();
    // Unquote key
    if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
      key = key.slice(1, -1);
    }
    const valStr = kvMatch[2].trim();

    if (valStr === '' || valStr === '|' || valStr === '>' || valStr === '|+' || valStr === '|-' || valStr === '>+' || valStr === '>-') {
      // Block scalar or nested block
      const childStart = i + 1;
      if (childStart < end && lines[childStart].indent > baseIndent) {
        const childIndent = lines[childStart].indent;
        let childEnd = childStart;
        while (childEnd < end && (lines[childEnd].indent >= childIndent || lines[childEnd].isBlank || lines[childEnd].isComment)) {
          if (childEnd > childStart && !lines[childEnd].isBlank && !lines[childEnd].isComment && lines[childEnd].indent < childIndent) break;
          childEnd++;
        }

        if (valStr === '|' || valStr === '|+' || valStr === '|-' || valStr === '>' || valStr === '>+' || valStr === '>-') {
          // Literal / folded block scalar
          const blockLines: string[] = [];
          for (let j = childStart; j < childEnd; j++) {
            blockLines.push(lines[j].raw.slice(childIndent));
          }
          const joiner = (valStr.startsWith('>')) ? ' ' : '\n';
          obj[key] = blockLines.join(joiner);
        } else {
          obj[key] = parseBlock(
            lines.filter((l, idx) => idx >= childStart && idx < childEnd && !l.isBlank && !l.isComment),
            0,
            lines.filter((l, idx) => idx >= childStart && idx < childEnd && !l.isBlank && !l.isComment).length,
            errors
          );
        }
        i = childEnd;
        continue;
      } else {
        obj[key] = null;
      }
    } else {
      obj[key] = parseScalar(valStr);
    }
    i++;
  }

  return obj;
}

function parseSequence(lines: Line[], start: number, end: number, baseIndent: number, errors: ParseError[]): unknown[] {
  const arr: unknown[] = [];
  let i = start;

  while (i < end) {
    const line = lines[i];
    if (line.indent < baseIndent) break;
    if (line.indent > baseIndent) {
      // Could be continuation of previous item
      i++;
      continue;
    }

    const trimmed = line.content.trimStart();
    if (!trimmed.startsWith('- ')) {
      // Not a sequence item at this level
      break;
    }

    const afterDash = trimmed.slice(2).trim();

    // Check if the value after dash is a key-value (inline mapping start)
    const kvMatch = afterDash.match(/^(.+?):\s*(.*)/);

    if (afterDash === '' || (kvMatch && kvMatch[2].trim() === '')) {
      // The item has children on subsequent lines
      const childStart = i + 1;
      let childIndent: number | null = null;

      if (afterDash !== '' && kvMatch) {
        // e.g. "- name:" — first key is on the same line
        // Gather child lines: the rest of the same item
        let childEnd = childStart;
        if (childStart < end) {
          childIndent = lines[childStart].indent;
          while (childEnd < end && (lines[childEnd].indent >= childIndent || lines[childEnd].isBlank || lines[childEnd].isComment)) {
            if (childEnd > childStart && !lines[childEnd].isBlank && !lines[childEnd].isComment && lines[childEnd].indent < childIndent) break;
            childEnd++;
          }
        }

        // Build an object starting with the inline key
        const inlineKey = kvMatch[1].trim().replace(/^["']|["']$/g, '');
        const obj: Record<string, unknown> = {};

        // Check if inline key has nested children
        if (childStart < end && childEnd > childStart) {
          const childLines = lines.filter((l, idx) => idx >= childStart && idx < childEnd && !l.isBlank && !l.isComment);
          // Check if child lines belong to this key's value
          if (childLines.length > 0 && childLines[0].indent > baseIndent + 2) {
            obj[inlineKey] = parseBlock(childLines, 0, childLines.length, errors);
          } else {
            obj[inlineKey] = null;
            // Parse remaining keys
            const subObj = parseMapping(childLines, 0, childLines.length, childLines[0]?.indent ?? baseIndent + 2, errors);
            Object.assign(obj, subObj);
          }
        } else {
          obj[inlineKey] = null;
        }

        arr.push(obj);
        i = childEnd;
        continue;
      } else {
        // "- " with value on next lines
        if (childStart < end && lines[childStart].indent > baseIndent) {
          childIndent = lines[childStart].indent;
          let childEnd = childStart;
          while (childEnd < end && (lines[childEnd].indent >= childIndent || lines[childEnd].isBlank || lines[childEnd].isComment)) {
            if (childEnd > childStart && !lines[childEnd].isBlank && !lines[childEnd].isComment && lines[childEnd].indent < childIndent) break;
            childEnd++;
          }
          const childLines = lines.filter((l, idx) => idx >= childStart && idx < childEnd && !l.isBlank && !l.isComment);
          arr.push(parseBlock(childLines, 0, childLines.length, errors));
          i = childEnd;
          continue;
        } else {
          arr.push(null);
        }
      }
    } else if (kvMatch) {
      // Inline mapping item: "- key: value" possibly with more keys below
      const childStart = i + 1;
      let childEnd = childStart;
      if (childStart < end && lines[childStart].indent > baseIndent) {
        const childIndent = lines[childStart].indent;
        while (childEnd < end && (lines[childEnd].indent >= childIndent || lines[childEnd].isBlank || lines[childEnd].isComment)) {
          if (childEnd > childStart && !lines[childEnd].isBlank && !lines[childEnd].isComment && lines[childEnd].indent < childIndent) break;
          childEnd++;
        }
      }

      const inlineKey = kvMatch[1].trim().replace(/^["']|["']$/g, '');
      const inlineVal = kvMatch[2].trim();
      const obj: Record<string, unknown> = {};
      obj[inlineKey] = parseScalar(inlineVal);

      if (childEnd > childStart) {
        const childLines = lines.filter((l, idx) => idx >= childStart && idx < childEnd && !l.isBlank && !l.isComment);
        if (childLines.length > 0) {
          const subObj = parseMapping(childLines, 0, childLines.length, childLines[0].indent, errors);
          Object.assign(obj, subObj);
        }
      }

      arr.push(obj);
      i = childEnd > childStart ? childEnd : i + 1;
      continue;
    } else {
      // Simple scalar item: "- value"
      arr.push(parseScalar(afterDash));
    }
    i++;
  }

  return arr;
}

// ---------------------------------------------------------------------------
// Formatter: takes a parsed value and outputs formatted YAML
// ---------------------------------------------------------------------------

function formatValue(val: unknown, indent: number): string {
  const pad = '  '.repeat(indent);
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') {
    if (val === Infinity) return '.inf';
    if (val === -Infinity) return '-.inf';
    if (isNaN(val)) return '.nan';
    return String(val);
  }
  if (typeof val === 'string') {
    if (val === '') return '""';
    if (
      val.includes('\n') ||
      val.includes(':') ||
      val.includes('#') ||
      val.includes('"') ||
      val.includes("'") ||
      val.startsWith(' ') ||
      val.endsWith(' ') ||
      /^[\[\]{}>|*&!%@,`]/.test(val) ||
      val === 'true' || val === 'false' || val === 'null' ||
      /^-?\d+(\.\d+)?$/.test(val)
    ) {
      return `"${val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }
    return val;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    return val.map(item => {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const entries = Object.entries(item as Record<string, unknown>);
        if (entries.length === 0) return `${pad}- {}`;
        const firstLine = `${pad}- ${entries[0][0]}: ${formatValue(entries[0][1], indent + 1)}`;
        const rest = entries.slice(1).map(([k, v]) => {
          if (typeof v === 'object' && v !== null) {
            return `${pad}  ${k}:\n${formatValue(v, indent + 2)}`;
          }
          return `${pad}  ${k}: ${formatValue(v, indent + 1)}`;
        });
        return [firstLine, ...rest].join('\n');
      }
      if (Array.isArray(item)) {
        return `${pad}-\n${formatValue(item, indent + 1)}`;
      }
      return `${pad}- ${formatValue(item, indent + 1)}`;
    }).join('\n');
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return entries.map(([k, v]) => {
      const safeKey = /[:\s#\[\]{}>,|*&!%@'"`]/.test(k) ? `"${k}"` : k;
      if (typeof v === 'object' && v !== null) {
        return `${pad}${safeKey}:\n${formatValue(v, indent + 1)}`;
      }
      return `${pad}${safeKey}: ${formatValue(v, indent)}`;
    }).join('\n');
  }
  return String(val);
}

// ---------------------------------------------------------------------------
// Minifier: strips comments, blank lines, normalises to minimal whitespace
// ---------------------------------------------------------------------------

function minifyYaml(yaml: string): string {
  const lines = yaml.split('\n');
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed === '' || trimmed.startsWith('#')) continue;
    // Preserve the structural indentation but remove trailing whitespace
    const indent = indentOf(line);
    const content = stripComment(line).trimEnd();
    if (content.trim() === '') continue;
    result.push(' '.repeat(indent) + content.trimStart());
  }
  return result.join('\n');
}

// ---------------------------------------------------------------------------
// Statistics
// ---------------------------------------------------------------------------

interface YamlStats {
  lines: number;
  keys: number;
  depth: number;
}

function computeStats(yaml: string): YamlStats {
  const allLines = yaml.split('\n');
  const nonEmpty = allLines.filter(l => l.trim() !== '' && !l.trim().startsWith('#'));
  let keys = 0;
  let maxDepth = 0;

  for (const line of nonEmpty) {
    const trimmed = line.trimStart();
    const indent = indentOf(line);
    // Count key-value pairs (lines with ":" that are not just "- value")
    if (trimmed.match(/^[^-].*?:\s*/)) {
      keys++;
    }
    // Also count "- key: val" style
    if (trimmed.match(/^- .+?:\s*/)) {
      keys++;
    }
    const depth = Math.floor(indent / 2) + 1;
    if (depth > maxDepth) maxDepth = depth;
  }

  return { lines: allLines.length, keys, depth: maxDepth };
}

// ---------------------------------------------------------------------------
// Sample YAML
// ---------------------------------------------------------------------------

const SAMPLE_YAML = `# Application configuration
app:
  name: my-service
  version: "2.1.0"
  debug: false

server:
  host: 0.0.0.0
  port: 8080
  ssl:
    enabled: true
    cert: /etc/ssl/cert.pem
    key: /etc/ssl/key.pem

database:
  driver: postgresql
  host: db.example.com
  port: 5432
  name: myapp_production
  pool_size: 25
  options:
    timeout: 30
    retry: true

features:
  - authentication
  - logging
  - rate-limiting
  - caching

users:
  - name: admin
    role: superadmin
    active: true
  - name: deploy
    role: deployer
    active: true

logging:
  level: info
  format: json
  outputs:
    - stdout
    - /var/log/app.log`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function YamlValidator() {
  const { dict } = useLang();
  const t = dict.tools['yaml-validator'];

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [stats, setStats] = useState<YamlStats | null>(null);

  const updateStats = (yaml: string) => {
    if (yaml.trim()) {
      setStats(computeStats(yaml));
    } else {
      setStats(null);
    }
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    updateStats(val);
  };

  const handleValidate = () => {
    if (!input.trim()) {
      setStatus(null);
      setOutput('');
      return;
    }
    const { errors } = validateAndParse(input);
    if (errors.length === 0) {
      setStatus({ type: 'success', message: 'Valid YAML — no errors found' });
      setOutput('');
    } else {
      const messages = errors.map(e => `Line ${e.line}: ${e.message}`).join('\n');
      setStatus({ type: 'error', message: messages });
      setOutput('');
    }
  };

  const handleFormat = () => {
    if (!input.trim()) return;
    const { value, errors } = validateAndParse(input);
    if (errors.length > 0) {
      const messages = errors.map(e => `Line ${e.line}: ${e.message}`).join('\n');
      setStatus({ type: 'error', message: messages });
      setOutput('');
      return;
    }
    const formatted = formatValue(value, 0);
    setOutput(formatted);
    setStatus({ type: 'success', message: 'Formatted successfully' });
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    const { errors } = validateAndParse(input);
    if (errors.length > 0) {
      const messages = errors.map(e => `Line ${e.line}: ${e.message}`).join('\n');
      setStatus({ type: 'error', message: messages });
      setOutput('');
      return;
    }
    setOutput(minifyYaml(input));
    setStatus({ type: 'success', message: 'Minified successfully' });
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_YAML);
    setOutput('');
    setStatus(null);
    updateStats(SAMPLE_YAML);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setStatus(null);
    setStats(null);
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="yaml-validator">
      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleValidate} className="btn btn-primary">{dict.common.validate}</button>
        <button onClick={handleFormat} className="btn btn-secondary">{dict.common.format} / {dict.common.beautify}</button>
        <button onClick={handleMinify} className="btn btn-secondary">{dict.common.minify}</button>
        <button onClick={handleLoadSample} className="btn btn-ghost">{dict.common.loadSample}</button>
        <button onClick={handleClear} className="btn btn-ghost">{dict.common.clear}</button>
      </div>

      {/* Status message */}
      {status && (
        <div
          style={{
            background: status.type === 'success'
              ? 'rgba(34, 197, 94, 0.1)'
              : 'rgba(244, 63, 94, 0.1)',
            border: `1px solid ${status.type === 'success'
              ? 'rgba(34, 197, 94, 0.3)'
              : 'rgba(244, 63, 94, 0.3)'}`,
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: status.type === 'success' ? 'var(--accent-green)' : 'var(--accent-rose)',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
          }}
        >
          {status.type === 'success' ? '\u2713 ' : '\u2715 '}{status.message}
        </div>
      )}

      {/* Statistics bar */}
      {stats && (
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginBottom: 16,
            padding: '8px 14px',
            background: 'var(--bg-input)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            fontSize: 12,
            color: 'var(--text-secondary)',
            fontFamily: 'monospace',
          }}
        >
          <span>Lines: <strong style={{ color: 'var(--text-primary)' }}>{stats.lines}</strong></span>
          <span>Keys: <strong style={{ color: 'var(--text-primary)' }}>{stats.keys}</strong></span>
          <span>Depth: <strong style={{ color: 'var(--text-primary)' }}>{stats.depth}</strong></span>
        </div>
      )}

      {/* Two-panel layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Input panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.input}</label>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>YAML</span>
          </div>
          <textarea
            value={input}
            onChange={e => handleInputChange(e.target.value)}
            placeholder="Paste your YAML here..."
            style={{
              minHeight: 380,
              fontFamily: 'monospace',
              fontSize: 13,
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Output panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.output}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={dict.common.resultPlaceholder}
            style={{
              minHeight: 380,
              fontFamily: 'monospace',
              fontSize: 13,
              lineHeight: 1.6,
              opacity: output ? 1 : 0.5,
            }}
          />
        </div>
      </div>

      {/* SEO content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
