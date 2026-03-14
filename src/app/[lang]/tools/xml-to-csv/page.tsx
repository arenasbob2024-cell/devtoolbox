'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function XmlToCsvPage() {
  const { dict } = useLang();
  const t = dict.tools['xml-to-csv'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [rowElement, setRowElement] = useState('row');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [error, setError] = useState('');

  const convertXmlToCsv = useCallback(() => {
    try {
      setError('');
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, 'text/xml');
      
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        setError('Invalid XML format');
        setOutput('');
        return;
      }

      const rows = xmlDoc.getElementsByTagName(rowElement);
      if (rows.length === 0) {
        setError(`No elements found with tag name: ${rowElement}`);
        setOutput('');
        return;
      }

      const headers = new Set<string>();
      const data: Record<string, string>[] = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const record: Record<string, string> = {};
        
        for (let j = 0; j < row.children.length; j++) {
          const child = row.children[j];
          const key = child.tagName;
          const value = child.textContent || '';
          headers.add(key);
          record[key] = value.replace(/"/g, '""').includes(delimiter) || value.includes('\n') ? `"${value}"` : value;
        }
        data.push(record);
      }

      const headerArray = Array.from(headers);
      let csv = '';

      if (includeHeaders) {
        csv = headerArray.map(h => h.includes(delimiter) || h.includes('\n') ? `"${h}"` : h).join(delimiter) + '\n';
      }

      csv += data.map(record => 
        headerArray.map(header => record[header] || '').join(delimiter)
      ).join('\n');

      setOutput(csv);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion error');
      setOutput('');
    }
  }, [input, rowElement, delimiter, includeHeaders]);

  const loadSample = useCallback(() => {
    const sample = `<?xml version="1.0"?>
<data>
  <row>
    <name>John Doe</name>
    <email>john@example.com</email>
    <age>30</age>
  </row>
  <row>
    <name>Jane Smith</name>
    <email>jane@example.com</email>
    <age>28</age>
  </row>
  <row>
    <name>Bob Johnson</name>
    <email>bob@example.com</email>
    <age>35</age>
  </row>
</data>`;
    setInput(sample);
    setOutput('');
    setError('');
  }, []);

  return (
    <ToolLayout toolId="xml-to-csv">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
            {t.inputLabel || 'Input XML'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || 'Paste your XML here...'}
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
            {t.outputLabel || 'Output CSV'}
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
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{t.rowElement || 'Row Element'}:</span>
            <input
              type="text"
              value={rowElement}
              onChange={(e) => setRowElement(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                width: '120px',
              }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{t.delimiter || 'Delimiter'}:</span>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="|">Pipe (|)</option>
              <option value="\t">Tab</option>
            </select>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
            />
            <span>{t.includeHeaders || 'Include Headers'}</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={convertXmlToCsv}
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
          {t.seoTitle || 'What is XML to CSV Converter?'}
        </h2>
        <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {t.seoContent || 'Convert XML data into CSV (Comma-Separated Values) format easily. This tool parses your XML structure, extracts rows from a specified element, and outputs them as CSV. Perfect for data migration and spreadsheet conversion. Customize delimiters and include/exclude headers.'}
        </p>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoFeaturesTitle || 'Features'}
        </h3>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <li>{t.seoFeature1 || 'Parse XML and extract data to CSV format'}</li>
          <li>{t.seoFeature2 || 'Customize row element name and delimiters'}</li>
          <li>{t.seoFeature3 || 'Option to include or exclude CSV headers'}</li>
          <li>{t.seoFeature4 || '100% client-side processing — your data never leaves your browser'}</li>
        </ul>
      </section>
    </ToolLayout>
  );
}
