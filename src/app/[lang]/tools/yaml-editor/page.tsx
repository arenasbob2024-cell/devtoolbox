'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function YamlEditor() {
  const { dict } = useLang();
  const t = dict.tools['yaml-editor'];
  const [yamlInput, setYamlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [errorLine, setErrorLine] = useState<number | null>(null);

  // Simple YAML parser
  const parseYaml = (yaml: string): any => {
    const lines = yaml.split('\n');
    const result: any = {};
    const stack: any[] = [result];
    let currentIndent = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim() || line.trim().startsWith('#')) continue;

      const indent = line.search(/\S/);
      const content = line.trim();

      if (indent < currentIndent) {
        while (stack.length > 1 && currentIndent > indent) {
          stack.pop();
          currentIndent -= 2;
        }
      }

      if (content.includes(':')) {
        const [key, ...valueParts] = content.split(':');
        const value = valueParts.join(':').trim();
        const trimmedKey = key.trim();

        if (value === '' || value === null) {
          const obj: any = {};
          stack[stack.length - 1][trimmedKey] = obj;
          stack.push(obj);
          currentIndent = indent;
        } else {
          // Try to parse value
          let parsedValue: any = value;
          if (value === 'true') parsedValue = true;
          else if (value === 'false') parsedValue = false;
          else if (value === 'null') parsedValue = null;
          else if (!isNaN(Number(value))) parsedValue = Number(value);
          else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            parsedValue = value.slice(1, -1);
          }
          stack[stack.length - 1][trimmedKey] = parsedValue;
        }
      } else if (content.startsWith('- ')) {
        // Array item
        const value = content.substring(2).trim();
        if (!Array.isArray(stack[stack.length - 1])) {
          stack[stack.length - 1] = [];
        }
        let parsedValue: any = value;
        if (value === 'true') parsedValue = true;
        else if (value === 'false') parsedValue = false;
        else if (value === 'null') parsedValue = null;
        else if (!isNaN(Number(value))) parsedValue = Number(value);
        stack[stack.length - 1].push(parsedValue);
      }
    }

    return result;
  };

  // Convert JSON to YAML
  const jsonToYaml = (obj: any, indent = 0): string => {
    const padding = ' '.repeat(indent);
    const nextPadding = ' '.repeat(indent + 2);

    if (obj === null || obj === undefined) return 'null';
    if (typeof obj === 'boolean') return String(obj);
    if (typeof obj === 'number') return String(obj);
    if (typeof obj === 'string') {
      return obj.includes('\n') ? `|\n${nextPadding}${obj.split('\n').join('\n' + nextPadding)}` : `"${obj}"`;
    }
    if (Array.isArray(obj)) {
      return obj.map((item, idx) => {
        const itemYaml = jsonToYaml(item, indent);
        if (itemYaml.includes('\n')) {
          return `${padding}- ${itemYaml}`;
        }
        return `${padding}- ${itemYaml}`;
      }).join('\n');
    }
    if (typeof obj === 'object') {
      return Object.entries(obj).map(([key, value]) => {
        const valueYaml = jsonToYaml(value, indent + 2);
        if (valueYaml.includes('\n')) {
          return `${padding}${key}:\n${valueYaml}`;
        }
        return `${padding}${key}: ${valueYaml}`;
      }).join('\n');
    }
    return String(obj);
  };

  const validate = () => {
    setValidationError('');
    setErrorLine(null);
    setJsonOutput('');
    setYamlOutput('');

    if (!yamlInput.trim()) {
      setValidationError('YAML input is required');
      return;
    }

    try {
      const parsed = parseYaml(yamlInput);
      const jsonStr = JSON.stringify(parsed, null, 2);
      setJsonOutput(jsonStr);
      setYamlOutput(jsonToYaml(parsed));
    } catch (e: unknown) {
      const lines = yamlInput.split('\n');
      const errorIdx = lines.length - 1;
      setErrorLine(errorIdx);
      const errorMsg = e instanceof Error ? e.message : 'Parse error';
      setValidationError(`Line ${errorIdx + 1}: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sample = `# Application Configuration
app:
  name: "DevToolBox"
  version: "1.0.0"
  debug: true

database:
  host: "localhost"
  port: 5432
  username: "admin"
  password: "secret"

features:
  - json-tools
  - code-generators
  - converters

settings:
  theme: "dark"
  language: "en"`;
    setYamlInput(sample);
    setTimeout(() => {
      setJsonOutput(JSON.stringify(parseYaml(sample), null, 2));
      setYamlOutput(jsonToYaml(parseYaml(sample)));
    }, 0);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="yaml-editor"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={validate} className="btn btn-primary">{dict.common.validate}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setYamlInput(''); setJsonOutput(''); setYamlOutput(''); setValidationError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Error */}
      {validationError && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {validationError}
        </div>
      )}

      {/* Input/Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{t.yamlInputLabel}</label>
          <textarea
            value={yamlInput}
            onChange={e => setYamlInput(e.target.value)}
            placeholder={t.yamlInputPlaceholder}
            style={{
              minHeight: 350,
              borderColor: errorLine !== null ? 'var(--accent-rose)' : undefined,
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>JSON Output</label>
          <textarea
            value={jsonOutput}
            readOnly
            placeholder="JSON output will appear here"
            style={{ minHeight: 350, background: 'var(--bg-secondary)' }}
          />
          {jsonOutput && <CopyButton text={jsonOutput} />}
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{t.yamlOutputLabel}</label>
          <textarea
            value={yamlOutput}
            readOnly
            placeholder="Formatted YAML output will appear here"
            style={{ minHeight: 350, background: 'var(--bg-secondary)' }}
          />
          {yamlOutput && <CopyButton text={yamlOutput} />}
        </div>
      </div>

      {/* SEO Content */}
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
