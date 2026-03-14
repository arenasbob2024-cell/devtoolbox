'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ParsedGraphQL {
  formatted: string;
  valid: boolean;
  error?: string;
}

function parseAndFormat(input: string, indent: number, sortFields: boolean): ParsedGraphQL {
  if (!input.trim()) return { formatted: '', valid: true };

  try {
    let normalized = input.replace(/\r\n/g, '\n').trim();
    normalized = removeComments(normalized);
    normalized = tokenizeAndFormat(normalized, indent, sortFields);
    return { formatted: normalized, valid: true };
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : 'Invalid GraphQL syntax';
    return { formatted: '', valid: false, error: errorMsg };
  }
}

function removeComments(text: string): string {
  let result = '';
  let inString = false;
  let stringChar = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
      result += char;
      i++;
    } else if (inString && char === stringChar && text[i - 1] !== '\\') {
      inString = false;
      result += char;
      i++;
    } else if (!inString && char === '#') {
      i = text.indexOf('\n', i) === -1 ? text.length : text.indexOf('\n', i) + 1;
    } else {
      result += char;
      i++;
    }
  }

  return result;
}

function tokenizeAndFormat(input: string, indent: number, sortFields: boolean): string {
  const tokens = tokenize(input);
  return formatTokens(tokens, indent, sortFields);
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (!inString && (char === '"' || char === "'")) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      inString = true;
      stringChar = char;
      current = char;
    } else if (inString && char === stringChar && input[i - 1] !== '\\') {
      current += char;
      tokens.push(current);
      current = '';
      inString = false;
    } else if (!inString && /[\s(){}[\]:,|&!=@$]/.test(char)) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      if (!/\s/.test(char)) {
        tokens.push(char);
      }
    } else {
      current += char;
    }
  }

  if (current) tokens.push(current);
  return tokens;
}

function formatTokens(tokens: string[], indentSize: number, sortFields: boolean): string {
  let result = '';
  let depth = 0;
  const indentStr = ' '.repeat(indentSize);
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token === '{') {
      result += ' {\n';
      depth++;
      i++;
      let fieldLines: string[] = [];

      while (i < tokens.length && tokens[i] !== '}') {
        let fieldLine = '';
        let fieldDepth = depth;

        while (i < tokens.length && tokens[i] !== '}' && tokens[i] !== ',') {
          if (tokens[i] === '{') {
            let innerBlock = '';
            let innerDepth = 0;
            while (i < tokens.length && (innerDepth > 0 || tokens[i] !== ',')) {
              if (tokens[i] === '{') innerDepth++;
              if (tokens[i] === '}') innerDepth--;
              innerBlock += tokens[i];
              i++;
              if (innerDepth === 0 && (tokens[i] === ',' || tokens[i] === '}')) break;
            }
            fieldLine += innerBlock;
          } else {
            fieldLine += tokens[i];
            i++;
          }
        }

        fieldLine = fieldLine.trim();
        if (fieldLine) {
          fieldLines.push(indentStr.repeat(fieldDepth) + fieldLine);
        }

        if (tokens[i] === ',') i++;
      }

      if (sortFields) {
        fieldLines.sort();
      }

      result += fieldLines.join('\n') + '\n';
      depth--;
      if (tokens[i] === '}') {
        result += indentStr.repeat(depth) + '}';
        i++;
      }
    } else if (token === '[') {
      result += '[';
      i++;
      let bracketContent = '';
      while (i < tokens.length && tokens[i] !== ']') {
        bracketContent += tokens[i];
        i++;
      }
      result += bracketContent.trim();
      if (tokens[i] === ']') {
        result += ']';
        i++;
      }
    } else if (token === '(' || token === ')' || token === ':' || token === '@') {
      result += token;
      i++;
    } else if (token === ',') {
      result += token;
      i++;
    } else if (/^(query|mutation|subscription|fragment|on|extends|type|interface|scalar|enum|union|input|directive|schema)$/i.test(token)) {
      if (result && !result.endsWith('\n')) result += '\n';
      result += indentStr.repeat(depth) + token;
      i++;
    } else {
      result += token;
      i++;
    }
  }

  return result.replace(/\s+/g, ' ').split(';').map(s => s.trim()).filter(s => s).join(';\n');
}

function minifyGraphQL(input: string): string {
  let result = input.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
  let inString = false;
  let stringChar = '';
  let minified = '';

  for (let i = 0; i < result.length; i++) {
    const char = result[i];

    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
      minified += char;
    } else if (inString && char === stringChar && result[i - 1] !== '\\') {
      inString = false;
      minified += char;
    } else if (!inString && /\s/.test(char)) {
      if (!/[\s{}()[\]:,]/.test(minified[minified.length - 1])) {
        minified += ' ';
      }
    } else {
      minified += char;
    }
  }

  return minified.replace(/\s+/g, ' ').trim();
}

export default function GraphQLFormatter() {
  const { dict } = useLang();
  const t = dict.tools['graphql-formatter'] as Record<string, unknown>;
  const common = dict.common as Record<string, unknown>;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);
  const [sortFields, setSortFields] = useState(false);

  const format = () => {
    const result = parseAndFormat(input, indent, sortFields);
    if (result.valid) {
      setOutput(result.formatted);
      setError('');
    } else {
      setError(result.error || 'Invalid GraphQL');
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const minified = minifyGraphQL(input);
      setOutput(minified);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to minify');
      setOutput('');
    }
  };

  const loadSample = () => {
    const sample = `query GetUserPosts($userId: ID!, $limit: Int = 10) {
  user(id: $userId) {
    id
    name
    email
    posts(first: $limit) {
      ...postFragment
      author {
        id
        name
      }
    }
  }
}

fragment postFragment on Post {
  id
  title
  content
  createdAt
  tags
}`;
    setInput(sample);
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="graphql-formatter"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={format} className="btn btn-primary">{t.formatBtn || common.format}</button>
        <button onClick={minify} className="btn btn-secondary">{common.minify}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent || 'Indent'}:</label>
            <select
              value={indent}
              onChange={e => setIndent(Number(e.target.value))}
              style={{ width: 60, padding: '4px 8px', fontSize: 12 }}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={sortFields}
              onChange={e => setSortFields(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            {t.sortFields || 'Sort Fields'}
          </label>
        </div>
      </div>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel || common.input}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || 'Paste your GraphQL query here...'}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel || common.output}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder || 'Formatted output will appear here...'}
            style={{ minHeight: 350, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
