'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function XpathTester() {
  const { dict } = useLang();
  const t = dict.tools['xpath-tester'];

  const [xmlInput, setXmlInput] = useState('');
  const [xpathQuery, setXpathQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  const parseXml = (xmlString: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      if (xmlDoc.getElementsByTagName('parsererror').length) {
        return null;
      }
      return xmlDoc;
    } catch {
      return null;
    }
  };

  const evaluateXPath = () => {
    setError('');
    setResults([]);

    if (!xmlInput.trim() || !xpathQuery.trim()) {
      setError('Both XML and XPath query are required');
      return;
    }

    const xmlDoc = parseXml(xmlInput);
    if (!xmlDoc) {
      setError('Invalid XML format');
      return;
    }

    try {
      const xpath = xpathQuery;
      const result = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      const matches: string[] = [];

      for (let i = 0; i < result.snapshotLength; i++) {
        const node = result.snapshotItem(i);
        if (node) {
          matches.push(node.textContent || node.toString());
        }
      }

      if (matches.length === 0) {
        setError('No matches found for the XPath query');
      } else {
        setResults(matches);
      }
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Error evaluating XPath';
      setError(`XPath Error: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sample = `<?xml version="1.0"?>
<books>
  <book id="1">
    <title>The Hobbit</title>
    <author>J.R.R. Tolkien</author>
    <year>1937</year>
  </book>
  <book id="2">
    <title>1984</title>
    <author>George Orwell</author>
    <year>1949</year>
  </book>
  <book id="3">
    <title>Brave New World</title>
    <author>Aldous Huxley</author>
    <year>1932</year>
  </book>
</books>`;
    setXmlInput(sample);
    setXpathQuery('//book/title/text()');
  };

  const loadSampleQuery = (query: string) => {
    setXpathQuery(query);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="xpath-tester"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={evaluateXPath} className="btn btn-primary">Evaluate XPath</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setXmlInput(''); setXpathQuery(''); setResults([]); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      <div style={{ marginBottom: 16, padding: 12, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 8, fontSize: 12 }}>
        <strong>Common XPath Examples:</strong>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          <button onClick={() => loadSampleQuery('//book')} className="btn btn-secondary" style={{ fontSize: 11 }}>All elements</button>
          <button onClick={() => loadSampleQuery('//book/title/text()')} className="btn btn-secondary" style={{ fontSize: 11 }}>All titles</button>
          <button onClick={() => loadSampleQuery('//book[@id="1"]')} className="btn btn-secondary" style={{ fontSize: 11 }}>By attribute</button>
          <button onClick={() => loadSampleQuery('//book[1]')} className="btn btn-secondary" style={{ fontSize: 11 }}>First element</button>
          <button onClick={() => loadSampleQuery('count(//book)')} className="btn btn-secondary" style={{ fontSize: 11 }}>Count</button>
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
          ✕ {dict.common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>XML Input</label>
          <textarea
            value={xmlInput}
            onChange={e => setXmlInput(e.target.value)}
            placeholder="Paste your XML here..."
            style={{ minHeight: 300 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>XPath Query</label>
          <textarea
            value={xpathQuery}
            onChange={e => setXpathQuery(e.target.value)}
            placeholder="Enter XPath expression (e.g., //element/text())"
            style={{ minHeight: 60, marginBottom: 12 }}
          />
          {results.length > 0 && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Results ({results.length} matches)</label>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                padding: 10,
                maxHeight: 200,
                overflowY: 'auto',
                fontSize: 12,
              }}>
                {results.map((res, i) => (
                  <div key={i} style={{ padding: '6px 0', borderBottom: i < results.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <code style={{ wordBreak: 'break-word' }}>{res}</code>
                  </div>
                ))}
              </div>
              <CopyButton text={results.join('\n')} />
            </div>
          )}
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
