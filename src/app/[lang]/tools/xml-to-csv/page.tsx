'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function XmlToCsv() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['xml-to-csv'];

  const [xmlInput, setXmlInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [quoteAll, setQuoteAll] = useState(false);
  const [error, setError] = useState('');

  const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<employees>
  <employee>
    <id>1</id>
    <name>John Doe</name>
    <department>Engineering</department>
    <salary>75000</salary>
  </employee>
  <employee>
    <id>2</id>
    <name>Jane Smith</name>
    <department>Marketing</department>
    <salary>65000</salary>
  </employee>
  <employee>
    <id>3</id>
    <name>Bob Wilson</name>
    <department>Sales</department>
    <salary>70000</salary>
  </employee>
</employees>`;

  const flattenObject = (obj: Record<string, any>, prefix = ''): Record<string, any> => {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
    return result;
  };

  const xmlToJson = (xmlString: string): Record<string, any> => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    if (xmlDoc.parseError && xmlDoc.parseError.errorCode !== 0) {
      throw new Error(`XML Parse Error: ${xmlDoc.parseError.reason}`);
    }

    const convert = (node: Element): Record<string, any> => {
      const result: Record<string, any> = {};

      if (node.childNodes.length === 0 || (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3)) {
        return (node.textContent || '').trim();
      }

      for (const child of Array.from(node.childNodes)) {
        if (child.nodeType === 1) {
          const tagName = (child as Element).tagName;
          const childValue = convert(child as Element);

          if (result[tagName]) {
            if (!Array.isArray(result[tagName])) {
              result[tagName] = [result[tagName]];
            }
            result[tagName].push(childValue);
          } else {
            result[tagName] = childValue;
          }
        }
      }

      return result;
    };

    return convert(xmlDoc.documentElement);
  };

  const extractRecords = (json: Record<string, any>): Record<string, any>[] => {
    const values = Object.values(json);
    if (values.length > 0 && Array.isArray(values[0])) {
      return values[0] as Record<string, any>[];
    } else if (values.length > 0 && typeof values[0] === 'object') {
      return [json];
    }
    return [];
  };

  const escapeQuotes = (value: string): string => {
    return value.replace(/"/g, '""');
  };

  const formatCsvValue = (value: any): string => {
    const stringValue = String(value);
    if (quoteAll || stringValue.includes(delimiter) || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${escapeQuotes(stringValue)}"`;
    }
    return stringValue;
  };

  const convertXmlToCsv = useCallback(() => {
    try {
      setError('');
      if (!xmlInput.trim()) {
        setError('Please enter XML data');
        return;
      }

      const json = xmlToJson(xmlInput);
      const records = extractRecords(json);

      if (records.length === 0) {
        setError('No records found in XML');
        setCsvOutput('');
        return;
      }

      const flatRecords = records.map(record => flattenObject(record));
      const allKeys = new Set<string>();
      flatRecords.forEach(record => {
        Object.keys(record).forEach(key => allKeys.add(key));
      });

      const headers = Array.from(allKeys);
      let csv = '';

      if (includeHeaders) {
        csv = headers.map(h => formatCsvValue(h)).join(delimiter) + '\n';
      }

      csv += flatRecords
        .map(record => headers.map(header => formatCsvValue(record[header] ?? '')).join(delimiter))
        .join('\n');

      setCsvOutput(csv);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setCsvOutput('');
    }
  }, [xmlInput, delimiter, includeHeaders, quoteAll]);

  const handleDownload = useCallback(() => {
    if (!csvOutput) return;
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [csvOutput]);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: 13,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    fontFamily: "'JetBrains Mono', monospace",
    outline: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: 'var(--accent-blue)',
    color: 'white',
    transition: 'opacity 0.2s',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 6,
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
    background: 'var(--bg-input)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s',
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="xml-to-csv">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
            XML Input
          </label>
          <textarea
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            placeholder="Paste your XML here..."
            rows={12}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
            CSV Output
          </label>
          <textarea
            value={csvOutput}
            readOnly
            placeholder="Converted CSV will appear here..."
            rows={12}
            style={{ ...inputStyle, background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}
          />
        </div>
      </div>

      {error && (
        <div style={{
          padding: 12,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgb(239, 68, 68)',
          borderRadius: 6,
          color: 'rgb(239, 68, 68)',
          fontSize: 12,
          marginBottom: 16,
        }}>
          {error}
        </div>
      )}

      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
          Options
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Delimiter
            </label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', paddingRight: 32 }}
            >
              <option value=",">Comma (,)</option>
              <option value="\t">Tab</option>
              <option value=";">Semicolon (;)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <div />

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Include Headers
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={quoteAll}
              onChange={(e) => setQuoteAll(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Quote All Fields
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={convertXmlToCsv} style={buttonStyle}>
          Convert
        </button>
        <button onClick={() => { setXmlInput(sampleXml); setCsvOutput(''); setError(''); }} style={secondaryButtonStyle}>
          Load Sample
        </button>
        <button onClick={() => { setXmlInput(''); setCsvOutput(''); setError(''); }} style={secondaryButtonStyle}>
          Clear All
        </button>
        {csvOutput && (
          <>
            <CopyButton text={csvOutput} label={dict.common.copy} />
            <button onClick={handleDownload} style={buttonStyle}>
              Download CSV
            </button>
          </>
        )}
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
