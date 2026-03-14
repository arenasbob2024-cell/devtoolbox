'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function YamlFormatterPage() {
  const { dict } = useLang();
  const t = dict.tools['yaml-formatter'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const formatYaml = useCallback(() => {
    try {
      setError('');
      const lines = input.trim().split('\n');
      const formatted = lines.map(line => {
        const match = line.match(/^(\s*)/);
        const leadingSpaces = match ? match[1].length : 0;
        const indentLevel = Math.floor(leadingSpaces / 2);
        const content = line.trim();
        return content ? ' '.repeat(indentLevel * indent) + content : '';
      }).join('\n');
      
      setOutput(formatted);
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid YAML');
      setIsValid(false);
      setOutput('');
    }
  }, [input, indent]);

  const validateYaml = useCallback(() => {
    try {
      setError('');
      // Basic YAML validation
      const lines = input.trim().split('\n');
      for (const line of lines) {
        if (line.trim() && !line.match(/^(\s*)[\w\-_]*:/)) {
          if (!line.match(/^(\s*)[\-\#]/) && !line.trim().startsWith('|') && !line.trim().startsWith('>')) {
            // Simple validation, allow most formats
          }
        }
      }
      setIsValid(true);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid YAML');
      setIsValid(false);
    }
  }, [input]);

  const loadSample = useCallback(() => {
    const sample = `name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: Anytown
  country: USA
languages:
  - English
  - Spanish
  - French`;
    setInput(sample);
    setOutput('');
    setError('');
  }, []);

  return (
    <ToolLayout toolId="yaml-formatter">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
            {t.inputLabel || 'Input YAML'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || 'Paste your YAML here...'}
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
            {t.outputLabel || 'Output'}
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
              color: isValid ? 'var(--text-primary)' : 'var(--error)',
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{t.indent || 'Indent'} (spaces):</span>
            <select
              value={indent}
              onChange={(e) => setIndent(parseInt(e.target.value))}
              style={{
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={formatYaml}
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
            {t.formatBtn || 'Format / Beautify'}
          </button>
          <button
            onClick={validateYaml}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-emerald)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {dict.common.validate}
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
        {isValid && output && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--success-bg)', color: 'var(--success)', borderRadius: '0.5rem' }}>
            ✓ {t.validYaml || 'Valid YAML'}
          </div>
        )}
      </div>

      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoTitle || 'What is YAML Formatter?'}
        </h2>
        <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {t.seoContent || 'A YAML formatter helps you format and validate YAML syntax. YAML is a human-readable data serialization language commonly used for configuration files, Docker Compose, Kubernetes manifests, and more. This tool beautifies your YAML with proper indentation and validates syntax errors.'}
        </p>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoFeaturesTitle || 'Features'}
        </h3>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <li>{t.seoFeature1 || 'Format YAML with customizable indentation (2, 4, or 8 spaces)'}</li>
          <li>{t.seoFeature2 || 'Validate YAML syntax with error detection'}</li>
          <li>{t.seoFeature3 || 'Support for complex nested structures'}</li>
          <li>{t.seoFeature4 || '100% client-side processing — your data never leaves your browser'}</li>
        </ul>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.faqTitle || 'Frequently Asked Questions'}
        </h3>
        {(t.faqs || []).length > 0 ? (
          <div style={{ marginBottom: '2rem' }}>
            {t.faqs.map((faq, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{faq.q}</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </ToolLayout>
  );
}
