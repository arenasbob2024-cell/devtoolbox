'use client';

import { useState, useCallback } from 'react';
import yaml from 'js-yaml';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const sampleYaml = `# Server Configuration
server:
  host: localhost
  port: 8080
  ssl: true
  cors:
    origins:
      - https://example.com
      - https://api.example.com
    methods:
      - GET
      - POST
      - PUT

database:
  driver: postgresql
  host: db.example.com
  port: 5432
  name: myapp
  pool_size: 10
  ssl_mode: require

logging:
  level: info
  format: json
  outputs:
    - stdout
    - file

features:
  authentication: true
  rate_limiting: true
  caching: false
`;

const sampleJson = `{
  "server": {
    "host": "localhost",
    "port": 8080,
    "ssl": true,
    "cors": {
      "origins": [
        "https://example.com",
        "https://api.example.com"
      ],
      "methods": [
        "GET",
        "POST",
        "PUT"
      ]
    }
  },
  "database": {
    "driver": "postgresql",
    "host": "db.example.com",
    "port": 5432,
    "name": "myapp",
    "pool_size": 10,
    "ssl_mode": "require"
  },
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": [
      "stdout",
      "file"
    ]
  },
  "features": {
    "authentication": true,
    "rate_limiting": true,
    "caching": false
  }
}`;

type Direction = 'yaml-to-json' | 'json-to-yaml';

export default function YamlJsonConverter() {
  const { dict } = useLang();
  const t = dict.tools['yaml-json-converter'];

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<Direction>('yaml-to-json');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const convert = useCallback(() => {
    setError('');
    setSuccess('');
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      if (direction === 'yaml-to-json') {
        const parsed = yaml.load(input);
        setOutput(JSON.stringify(parsed, null, indent));
      } else {
        const parsed = JSON.parse(input);
        setOutput(yaml.dump(parsed, { indent: 2, lineWidth: -1 }));
      }
      setSuccess(t.conversionSuccess);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '';
      setError(direction === 'yaml-to-json' ? `${t.invalidYaml}: ${msg}` : `${t.invalidJson}: ${msg}`);
      setOutput('');
    }
  }, [input, direction, indent, t]);

  const toggleDirection = () => {
    setDirection(d => d === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json');
    setInput('');
    setOutput('');
    setError('');
    setSuccess('');
  };

  const swapInputOutput = () => {
    if (!output) return;
    setInput(output);
    setOutput('');
    setDirection(d => d === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json');
    setError('');
    setSuccess('');
  };

  const loadSample = () => {
    if (direction === 'yaml-to-json') {
      setInput(sampleYaml);
    } else {
      setInput(sampleJson);
    }
    setOutput('');
    setError('');
    setSuccess('');
  };

  const inputLabel = direction === 'yaml-to-json' ? (t.yamlInput || 'YAML Input') : (t.jsonInput || 'JSON Input');
  const outputLabel = direction === 'yaml-to-json' ? (t.jsonOutput || 'JSON Output') : (t.yamlOutput || 'YAML Output');
  const inputPlaceholder = direction === 'yaml-to-json' ? t.yamlPlaceholder : t.jsonPlaceholder;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="yaml-json-converter">
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={toggleDirection}
          className="btn btn-primary"
        >
          {direction === 'yaml-to-json' ? t.yamlToJson : t.jsonToYaml}
        </button>
        <button onClick={convert} className="btn btn-secondary">
          {t.convert}
        </button>
        <button onClick={swapInputOutput} className="btn btn-ghost">
          {t.swap}
        </button>
        <button onClick={loadSample} className="btn btn-ghost">
          {t.loadSample}
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setSuccess(''); }} className="btn btn-ghost">
          {dict.common.clear}
        </button>

        {direction === 'yaml-to-json' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
            <label style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t.indentSize}:</label>
            <select
              value={indent}
              onChange={e => setIndent(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: 13,
              }}
            >
              <option value={2}>2 {t.spaces}</option>
              <option value={4}>4 {t.spaces}</option>
            </select>
          </div>
        )}
      </div>

      {/* Error / Success messages */}
      {error && (
        <div style={{ color: 'var(--accent-rose)', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(244,63,94,0.1)', borderRadius: 6 }}>
          {error}
        </div>
      )}
      {success && !error && (
        <div style={{ color: 'var(--accent-green, #22c55e)', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(34,197,94,0.1)', borderRadius: 6 }}>
          {success}
        </div>
      )}

      {/* Editor panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{inputLabel}</label>
            <CopyButton text={input} />
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            spellCheck={false}
            style={{
              minHeight: 400,
              fontFamily: 'monospace',
              fontSize: 13,
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              resize: 'vertical',
            }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={direction === 'yaml-to-json' ? t.jsonPlaceholder : t.yamlPlaceholder}
            spellCheck={false}
            style={{
              minHeight: 400,
              fontFamily: 'monospace',
              fontSize: 13,
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              resize: 'vertical',
              opacity: output ? 1 : 0.5,
            }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
