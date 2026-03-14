'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function EnvToJsonPage() {
  const dict = useLang();
  const t = dict.tools['env-to-json'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const parseEnvToJson = useCallback(() => {
    try {
      setError('');
      const lines = input.split('\n');
      const json: Record<string, string> = {};
      let multilineKey = '';
      let multilineValue = '';

      for (let line of lines) {
        line = line.trim();

        if (!line || line.startsWith('#')) {
          continue;
        }

        if (multilineKey) {
          if (line.endsWith('"') && !line.endsWith('\\"')) {
            multilineValue += '\n' + line.slice(0, -1);
            json[multilineKey] = multilineValue;
            multilineKey = '';
            multilineValue = '';
          } else {
            multilineValue += '\n' + line;
          }
          continue;
        }

        const eqIndex = line.indexOf('=');
        if (eqIndex === -1) continue;

        const key = line.slice(0, eqIndex).trim();
        let value = line.slice(eqIndex + 1).trim();

        if (!key) continue;

        if (value.startsWith('"')) {
          if (value.endsWith('"') && !value.endsWith('\\"')) {
            json[key] = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
          } else {
            multilineKey = key;
            multilineValue = value.slice(1);
          }
        } else if (value.startsWith("'")) {
          if (value.endsWith("'")) {
            json[key] = value.slice(1, -1);
          } else {
            multilineKey = key;
            multilineValue = value.slice(1);
          }
        } else {
          json[key] = value;
        }
      }

      if (multilineKey) {
        json[multilineKey] = multilineValue;
      }

      const jsonStr = JSON.stringify(json, null, 2);
      setOutput(jsonStr);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Parse error');
      setOutput('');
    }
  }, [input]);

  const loadSample = useCallback(() => {
    const sample = `# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=admin
DB_PASSWORD=secret123

# API Configuration
API_KEY=your-api-key-here
API_URL=https://api.example.com
DEBUG=true

# Multiline Example
DESCRIPTION="This is a
multiline
description"`;
    setInput(sample);
    setOutput('');
    setError('');
  }, []);

  const formatAsMinified = useCallback(() => {
    if (output) {
      try {
        const json = JSON.parse(output);
        const minified = JSON.stringify(json);
        setOutput(minified);
      } catch (err) {
        setError('Could not minify JSON');
      }
    }
  }, [output]);

  return (
    <ToolLayout toolId="env-to-json">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
            {t.inputLabel || 'Input .env'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || 'Paste your .env content here...\n\nKEY=value\nAPI_KEY=secret123'}
            style={{
              width: '100%',
              minHeight: '300px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              resize: 'vertical',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
            {t.outputLabel || 'Output JSON'}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder={dict.common.resultPlaceholder}
            style={{
              width: '100%',
              minHeight: '300px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={parseEnvToJson}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {dict.common.convert}
          </button>
          <button
            onClick={formatAsMinified}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-purple)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {dict.common.minify}
          </button>
          <button
            onClick={loadSample}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-orange)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {dict.common.loadSample}
          </button>
          <button
            onClick={() => { setInput(''); setOutput(''); setError(''); }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-gray)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {dict.common.clearAll}
          </button>
          {output && <CopyButton text={output} />}
        </div>

        {error && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--error-bg)', color: 'var(--error)', borderRadius: '0.5rem' }}>
            {error}
          </div>
        )}
      </div>

      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoTitle || 'What is .env to JSON Converter?'}
        </h2>
        <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {t.seoContent || 'Convert environment variable files (.env) to JSON format instantly. Parse KEY=VALUE pairs, handle comments, quoted values, and multiline strings. Perfect for configuration management and environment setup documentation.'}
        </p>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoFeaturesTitle || 'Features'}
        </h3>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <li>{t.seoFeature1 || 'Parse .env format to JSON objects'}</li>
          <li>{t.seoFeature2 || 'Support for comments, quoted strings, and multiline values'}</li>
          <li>{t.seoFeature3 || 'Format output as beautified or minified JSON'}</li>
          <li>{t.seoFeature4 || '100% client-side processing — your data never leaves your browser'}</li>
        </ul>
      </section>
    </ToolLayout>
  );
}
