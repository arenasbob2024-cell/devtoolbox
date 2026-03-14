'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ParsedType {
  name: string;
  body: string;
  isEnum: boolean;
  isInterface: boolean;
  isType: boolean;
}

export default function TypeScriptToZod() {
  const { dict } = useLang();
  const t = dict.tools['typescript-to-zod'] as Record<string, unknown>;
  const common = dict.common;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [addDescriptions, setAddDescriptions] = useState(false);
  const [strictMode, setStrictMode] = useState(false);

  const tokenize = (code: string): string[] => {
    const tokens: string[] = [];
    let current = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inMultilineComment = false;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const next = code[i + 1];

      if (inMultilineComment) {
        if (char === '*' && next === '/') {
          inMultilineComment = false;
          i++;
        }
        continue;
      }

      if (inComment) {
        if (char === '\n') {
          inComment = false;
        }
        continue;
      }

      if (char === '/' && next === '/') {
        inComment = true;
        i++;
        continue;
      }

      if (char === '/' && next === '*') {
        inMultilineComment = true;
        i++;
        continue;
      }

      if ((char === '"' || char === "'" || char === '`') && !inString) {
        inString = true;
        stringChar = char;
        current += char;
        continue;
      }

      if (char === stringChar && inString) {
        inString = false;
        current += char;
        continue;
      }

      if (inString) {
        current += char;
        continue;
      }

      if (/\s/.test(char)) {
        if (current) tokens.push(current);
        current = '';
      } else if (/[{}[\](),;:<>=?&|]/.test(char)) {
        if (current) tokens.push(current);
        tokens.push(char);
        current = '';
      } else {
        current += char;
      }
    }

    if (current) tokens.push(current);
    return tokens;
  };

  const parseType = (typeStr: string): string => {
    const normalized = typeStr.replace(/\s+/g, ' ').trim();

    if (normalized === 'string' || normalized === 'String') return 'z.string()';
    if (normalized === 'number' || normalized === 'Number') return 'z.number()';
    if (normalized === 'boolean' || normalized === 'Boolean') return 'z.boolean()';
    if (normalized === 'null') return 'z.null()';
    if (normalized === 'undefined') return 'z.undefined()';
    if (normalized === 'Date') return 'z.date()';
    if (normalized === 'any') return 'z.any()';
    if (normalized === 'unknown') return 'z.unknown()';
    if (normalized === 'void') return 'z.void()';
    if (normalized === 'never') return 'z.never()';

    if (normalized.endsWith('[]')) {
      const innerType = parseType(normalized.slice(0, -2));
      return `z.array(${innerType})`;
    }

    if (normalized.startsWith('Record<')) {
      const match = normalized.match(/Record<([^,]+),\s*(.+)>/);
      if (match) {
        const keyType = parseType(match[1].trim());
        const valueType = parseType(match[2].trim());
        return `z.record(${valueType})`;
      }
    }

    if (normalized.includes('|')) {
      const parts = normalized.split('|').map(p => parseType(p.trim()));
      return `z.union([${parts.join(', ')}])`;
    }

    if (normalized.includes('&')) {
      const parts = normalized.split('&').map(p => parseType(p.trim()));
      return `z.intersection(${parts[0]}, ${parts[1]})`;
    }

    if (normalized.startsWith('"') || normalized.startsWith("'")) {
      return `z.literal(${normalized})`;
    }

    if (normalized === 'true' || normalized === 'false') {
      return `z.literal(${normalized})`;
    }

    return 'z.any()';
  };

  const extractProperty = (tokens: string[], startIdx: number): { name: string; type: string; isOptional: boolean; endIdx: number } | null => {
    let idx = startIdx;

    while (idx < tokens.length && (tokens[idx] === 'readonly' || tokens[idx] === 'public' || tokens[idx] === 'private' || tokens[idx] === 'protected')) {
      idx++;
    }

    if (idx >= tokens.length || !isValidIdentifier(tokens[idx])) {
      return null;
    }

    const name = tokens[idx];
    idx++;

    let isOptional = false;
    if (idx < tokens.length && tokens[idx] === '?') {
      isOptional = true;
      idx++;
    }

    if (idx >= tokens.length || tokens[idx] !== ':') {
      return null;
    }
    idx++;

    const typeTokens: string[] = [];
    let bracketDepth = 0;
    let angleDepth = 0;

    while (idx < tokens.length) {
      const token = tokens[idx];

      if (token === '{' || token === '[') bracketDepth++;
      if (token === '}' || token === ']') {
        if (bracketDepth === 0) break;
        bracketDepth--;
      }
      if (token === '<') angleDepth++;
      if (token === '>') angleDepth--;

      if ((token === ';' || token === ',') && bracketDepth === 0 && angleDepth === 0) {
        idx++;
        break;
      }

      typeTokens.push(token);
      idx++;
    }

    const type = typeTokens.join('').trim();
    return { name, type, isOptional, endIdx: idx };
  };

  const convertProperties = (body: string): { [key: string]: string } => {
    const properties: { [key: string]: string } = {};
    const tokens = tokenize(body);
    let idx = 0;

    while (idx < tokens.length) {
      const prop = extractProperty(tokens, idx);
      if (!prop) break;

      let zodType = parseType(prop.type);

      if (prop.isOptional) {
        zodType = `${zodType}.optional()`;
      }

      if (addDescriptions && !zodType.includes('.describe(')) {
        const description = `${prop.name} field`;
        zodType = `${zodType}.describe("${description}")`;
      }

      properties[prop.name] = zodType;
      idx = prop.endIdx;
    }

    return properties;
  };

  const parseTypeDefinition = (code: string): ParsedType | null => {
    const tokens = tokenize(code);
    let idx = 0;

    while (idx < tokens.length && (tokens[idx] === 'export' || tokens[idx] === 'declare')) {
      idx++;
    }

    if (idx >= tokens.length) return null;

    let isInterface = false;
    let isType = false;
    let isEnum = false;
    let defIdx = idx;

    if (tokens[idx] === 'interface') {
      isInterface = true;
      idx++;
    } else if (tokens[idx] === 'type') {
      isType = true;
      idx++;
    } else if (tokens[idx] === 'enum') {
      isEnum = true;
      idx++;
    } else {
      return null;
    }

    if (idx >= tokens.length || !isValidIdentifier(tokens[idx])) {
      return null;
    }

    const name = tokens[idx];
    idx++;

    while (idx < tokens.length && tokens[idx] !== '=' && tokens[idx] !== '{') {
      idx++;
    }

    if (isType && idx < tokens.length && tokens[idx] === '=') {
      idx++;
      const typeTokens: string[] = [];
      let bracketDepth = 0;
      let angleDepth = 0;

      while (idx < tokens.length) {
        const token = tokens[idx];
        if (token === '<') angleDepth++;
        if (token === '>') angleDepth--;
        if (token === '{') bracketDepth++;
        if (token === '}' && bracketDepth > 0) {
          bracketDepth--;
          typeTokens.push(token);
          idx++;
          break;
        }
        if (token === '}' && bracketDepth === 0 && angleDepth === 0) break;
        if (token === ';') {
          idx++;
          break;
        }
        typeTokens.push(token);
        idx++;
      }

      const body = typeTokens.join('').trim();
      return { name, body, isEnum, isInterface, isType };
    }

    if (idx < tokens.length && tokens[idx] === '{') {
      idx++;
      const bodyTokens: string[] = [];
      let bracketDepth = 1;

      while (idx < tokens.length && bracketDepth > 0) {
        if (tokens[idx] === '{') bracketDepth++;
        if (tokens[idx] === '}') {
          bracketDepth--;
          if (bracketDepth === 0) break;
        }
        bodyTokens.push(tokens[idx]);
        idx++;
      }

      const body = bodyTokens.join('').trim();
      return { name, body, isEnum, isInterface, isType };
    }

    return null;
  };

  const convertToZod = (code: string): string => {
    const lines = code.split('\n');
    const results: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

      const def = parseTypeDefinition(trimmed);
      if (!def) continue;

      if (def.isEnum) {
        const enumValues = def.body.split(',').map(v => v.trim()).filter(v => v && !v.startsWith('/'));
        const literals = enumValues.map(v => {
          const parts = v.split('=');
          const key = parts[0].trim();
          return `z.literal("${key}")`;
        });
        if (literals.length > 0) {
          const zodDef = `export const ${def.name}Schema = z.union([${literals.join(', ')}]);`;
          results.push(zodDef);
        }
      } else {
        const properties = convertProperties(def.body);
        const propLines = Object.entries(properties).map(([key, type]) => {
          return `  ${key}: ${type}`;
        });

        const shape = propLines.join(',\n');
        const zodDef = `export const ${def.name}Schema = z.object({\n${shape}\n})${strictMode ? '.strict()' : ''};`;
        results.push(zodDef);
      }
    }

    return results.join('\n\n');
  };

  const isValidIdentifier = (str: string): boolean => {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(str);
  };

  const handleConvert = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please paste TypeScript code');
      return;
    }

    try {
      const result = convertToZod(input);
      if (!result) {
        setError('No valid type definitions found. Please paste TypeScript interfaces, types, or enums.');
        return;
      }
      setOutput(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Conversion error';
      setError(msg);
    }
  };

  const loadSample = () => {
    const sample = `interface Address {
  street: string;
  city: string;
  zipCode?: string;
  country: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  address: Address;
  active?: boolean;
  roles: string[];
}

enum Role {
  Admin = "admin",
  User = "user",
  Guest = "guest"
}`;
    setInput(sample);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="typescript-to-zod"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleConvert} className="btn btn-primary">{t.convertBtn as string}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={handleClear} className="btn btn-secondary">{common.clear}</button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={addDescriptions}
            onChange={(e) => setAddDescriptions(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          {t.addDescriptionsLabel as string}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={strictMode}
            onChange={(e) => setStrictMode(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          {t.strictModeLabel as string}
        </label>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel as string}</label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder as string}
            style={{ minHeight: 380, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{common.output}</label>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={common.resultPlaceholder as string}
            style={{ minHeight: 380, fontFamily: 'monospace', fontSize: 12, background: 'var(--bg-secondary)' }}
          />
          {output && <CopyButton text={output} />}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle as string}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 as string}</li>
          <li>{t.seoFeature2 as string}</li>
          <li>{t.seoFeature3 as string}</li>
          <li>{t.seoFeature4 as string}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
