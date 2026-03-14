'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function EnvToJson() {
  const { dict } = useLang();
  const t = dict.tools['env-to-json'] as Record<string, unknown>;
  const common = dict.common;

  const [mode, setMode] = useState<'env-to-json' | 'json-to-env'>('env-to-json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [sortKeys, setSortKeys] = useState(true);
  const [includeEmpty, setIncludeEmpty] = useState(true);
  const [quoteStyle, setQuoteStyle] = useState<'none' | 'single' | 'double'>('double');

  const sampleEnv = `DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
API_KEY=sk-1234567890abcdef
NODE_ENV=development
DEBUG=true
REACT_APP_API_BASE=https://api.example.com
SECRET_TOKEN="secret with spaces"
MULTI_LINE_VALUE='This is a \\
multiline value'
EMPTY_VALUE=
FEATURE_FLAG=enabled`;

  const parseEnv = (envText: string): Record<string, string> => {
    const result: Record<string, string> = {};
    const lines = envText.split('\n');
    let i = 0;

    while (i < lines.length) {
      let line = lines[i].trim();
      i++;

      if (!line || line.startsWith('#')) continue;

      while (line.endsWith('\\') && i < lines.length) {
        line = line.slice(0, -1).trim() + lines[i].trim();
        i++;
      }

      const eqIndex = line.indexOf('=');
      if (eqIndex === -1) continue;

      const key = line.substring(0, eqIndex).trim();
      let value = line.substring(eqIndex + 1).trim();

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }

      if (value || includeEmpty) {
        result[key] = value;
      }
    }

    return result;
  };

  const convertEnvToJson = () => {
    try {
      setError('');
      const parsed = parseEnv(input);
      const sorted = sortKeys ? Object.keys(parsed).sort().reduce((acc, key) => {
        acc[key] = parsed[key];
        return acc;
      }, {} as Record<string, string>) : parsed;
      setOutput(JSON.stringify(sorted, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  const convertJsonToEnv = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);

      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        setError('Input must be a flat JSON object');
        return;
      }

      let lines: string[] = [];
      const keys = sortKeys ? Object.keys(parsed).sort() : Object.keys(parsed);

      keys.forEach(key => {
        const value = parsed[key];

        if (typeof value === 'object' && value !== null) {
          lines.push(`# ${key}=<nested object - cannot convert>`);
          return;
        }

        const strValue = String(value);
        let formattedValue = strValue;

        if (quoteStyle === 'double' && (strValue.includes(' ') || strValue.includes('='))) {
          formattedValue = `"${strValue.replace(/"/g, '\\"')}"`;
        } else if (quoteStyle === 'single' && (strValue.includes(' ') || strValue.includes('='))) {
          formattedValue = `'${strValue.replace(/'/g, "\\'")}'`;
        }

        lines.push(`${key}=${formattedValue}`);
      });

      setOutput(lines.join('\n'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  const handleConvert = () => {
    if (mode === 'env-to-json') {
      convertEnvToJson();
    } else {
      convertJsonToEnv();
    }
  };

  const handleLoadSample = () => {
    setInput(sampleEnv);
    setOutput('');
    setError('');
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
      toolId="env-to-json"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Mode Toggle */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button
              onClick={() => { setMode('env-to-json'); setOutput(''); setError(''); }}
              className={`btn ${mode === 'env-to-json' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              {t.envToJsonBtn || '.env → JSON'}
            </button>
            <button
              onClick={() => { setMode('json-to-env'); setOutput(''); setError(''); }}
              className={`btn ${mode === 'json-to-env' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              {t.jsonToEnvBtn || 'JSON → .env'}
            </button>
          </div>

          {/* Options */}
          <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 12, marginBottom: 16, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <input
                type="checkbox"
                id="sortKeys"
                checked={sortKeys}
                onChange={e => setSortKeys(e.target.checked)}
              />
              <label htmlFor="sortKeys" style={{ fontSize: 13, cursor: 'pointer' }}>
                {t.sortKeysLabel || 'Sort Keys'}
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <input
                type="checkbox"
                id="includeEmpty"
                checked={includeEmpty}
                onChange={e => setIncludeEmpty(e.target.checked)}
              />
              <label htmlFor="includeEmpty" style={{ fontSize: 13, cursor: 'pointer' }}>
                {t.includeEmptyLabel || 'Include Empty Values'}
              </label>
            </div>

            {mode === 'json-to-env' && (
              <div style={{ marginTop: 10 }}>
                <label style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
                  {t.quoteStyleLabel || 'Quote Style'}
                </label>
                <select
                  value={quoteStyle}
                  onChange={e => setQuoteStyle(e.target.value as 'none' | 'single' | 'double')}
                  style={{ width: '100%' }}
                >
                  <option value="none">{t.quoteNone || 'None'}</option>
                  <option value="single">{t.quoteSingle || 'Single'}</option>
                  <option value="double">{t.quoteDouble || 'Double'}</option>
                </select>
              </div>
            )}
          </div>

          {/* Input */}
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>
            {mode === 'env-to-json' ? (t.envInputLabel || '.env Input') : (t.jsonInputLabel || 'JSON Input')}
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'env-to-json' ? (t.envPlaceholder || 'KEY=VALUE\nAPI_KEY=secret') : (t.jsonPlaceholder || '{"KEY": "VALUE"}')}
            style={{
              flex: 1,
              fontFamily: 'monospace',
              fontSize: 12,
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              resize: 'none',
              minHeight: 300,
            }}
          />

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={handleConvert} className="btn btn-primary" style={{ flex: 1 }}>
              {common.convert}
            </button>
            <button onClick={handleLoadSample} className="btn btn-secondary">
              {common.loadSample}
            </button>
            <button onClick={handleClear} className="btn btn-secondary">
              {common.clear}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>
            {common.output}
          </label>

          {error && (
            <div style={{
              background: '#fee2e2',
              color: '#991b1b',
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
              fontSize: 13,
              border: '1px solid #fca5a5',
            }}>
              <strong>{common.error}:</strong> {error}
            </div>
          )}

          <textarea
            value={output}
            readOnly
            placeholder={common.resultPlaceholder as string}
            style={{
              flex: 1,
              fontFamily: 'monospace',
              fontSize: 12,
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              resize: 'none',
              minHeight: 300,
            }}
          />

          {output && (
            <div style={{ marginTop: 12 }}>
              <CopyButton text={output} />
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          {t.seoTitle || 'What is .env to JSON Converter?'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'The .env to JSON converter tool helps you seamlessly convert environment variable files to JSON format and vice versa. Easily parse .env files with support for quoted values, multiline strings, and comments, then convert them to structured JSON. Perfect for configuration management, deployment automation, and development workflows.'}
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
          {t.seoFeaturesTitle || 'Features'}
        </h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Convert .env files to JSON with full support for quoted values'}</li>
          <li>{t.seoFeature2 || 'Convert JSON objects back to .env format'}</li>
          <li>{t.seoFeature3 || 'Handle multiline values with backslash continuation'}</li>
          <li>{t.seoFeature4 || 'Sort keys and filter empty values with toggleable options'}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
          {t.faqTitle || 'Frequently Asked Questions'}
        </h3>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <div style={{ marginBottom: 12 }}>
            <strong>{t.faq1q || 'What is a .env file?'}</strong>
            <p style={{ margin: '4px 0 0 0' }}>
              {t.faq1a || 'A .env file is a text file that stores environment variables in KEY=VALUE format. It\'s commonly used in development to store sensitive configuration like database credentials and API keys.'}
            </p>
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>{t.faq2q || 'Why convert .env to JSON?'}</strong>
            <p style={{ margin: '4px 0 0 0' }}>
              {t.faq2a || 'JSON format is more structured and easier to parse programmatically. It\'s useful for configuration management tools, CI/CD pipelines, and development workflows.'}
            </p>
          </div>
          <div>
            <strong>{t.faq3q || 'Is my data secure?'}</strong>
            <p style={{ margin: '4px 0 0 0' }}>
              {t.faq3a || 'Yes, 100% secure. All conversion happens locally in your browser. Your environment variables are never sent to any server.'}
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
