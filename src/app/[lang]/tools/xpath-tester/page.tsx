'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title lang="en">Harry Potter</title>
    <author>J.K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  <book category="non-fiction">
    <title lang="en">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
  <book category="fiction">
    <title lang="fr">Le Petit Prince</title>
    <author>Antoine de Saint-Exupéry</author>
    <year>1943</year>
    <price>15.99</price>
  </book>
</bookstore>`;

const EXAMPLE_XPATHS = [
  '//book',
  '//book[@category="fiction"]',
  '//title/text()',
  '//book[price>30]/title',
  '//book/author',
  '/bookstore/book[1]',
  '//title[@lang="en"]',
  'count(//book)',
];

export default function XPathTesterTool() {
  const { dict } = useLang();
  const t = dict.tools['xpath-tester'];
  const [xml, setXml] = useState(SAMPLE_XML);
  const [xpath, setXpath] = useState('//book/title/text()');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [matchCount, setMatchCount] = useState(0);

  const evaluateXPath = () => {
    setError('');
    setResults([]);
    setMatchCount(0);
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const parseError = doc.querySelector('parsererror');
      if (parseError) {
        setError(t.xmlParseError || 'XML Parse Error: ' + parseError.textContent);
        return;
      }

      const result = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
      const matches: string[] = [];

      switch (result.resultType) {
        case XPathResult.NUMBER_TYPE:
          matches.push(String(result.numberValue));
          break;
        case XPathResult.STRING_TYPE:
          matches.push(result.stringValue);
          break;
        case XPathResult.BOOLEAN_TYPE:
          matches.push(String(result.booleanValue));
          break;
        default: {
          let node = result.iterateNext();
          while (node) {
            if (node.nodeType === Node.TEXT_NODE) {
              matches.push(node.textContent || '');
            } else if (node.nodeType === Node.ATTRIBUTE_NODE) {
              matches.push(`${(node as Attr).name}="${(node as Attr).value}"`);
            } else {
              const serializer = new XMLSerializer();
              matches.push(serializer.serializeToString(node));
            }
            node = result.iterateNext();
          }
        }
      }

      setResults(matches);
      setMatchCount(matches.length);
    } catch (e: unknown) {
      setError(t.xpathError || `XPath Error: ${e instanceof Error ? e.message : 'Invalid XPath expression'}`);
    }
  };

  useEffect(() => {
    evaluateXPath();
  }, []);

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="xpath-tester">
      {/* XPath Input */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.xpathExpression || 'XPath Expression'}</label>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            {matchCount > 0 && `(${matchCount} ${t.matchesFound || 'matches found'})`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={xpath}
            onChange={e => setXpath(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') evaluateXPath(); }}
            placeholder={t.xpathPlaceholder || 'Enter XPath expression, e.g. //book/title'}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 8,
              border: '1px solid var(--border-color)', background: 'var(--bg-input)',
              fontSize: 14, fontFamily: 'monospace', color: 'var(--text-primary)',
            }}
          />
          <button onClick={evaluateXPath} className="btn btn-primary">
            {t.evaluate || 'Evaluate'}
          </button>
          <button onClick={() => { setXml(SAMPLE_XML); setXpath('//book/title/text()'); }} className="btn btn-secondary">
            {t.loadSample || 'Sample'}
          </button>
        </div>
      </div>

      {/* Quick examples */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: '28px' }}>{t.examples || 'Examples'}:</span>
        {EXAMPLE_XPATHS.map(xp => (
          <button
            key={xp}
            onClick={() => { setXpath(xp); }}
            style={{
              padding: '4px 10px', borderRadius: 6, fontSize: 11, fontFamily: 'monospace',
              border: '1px solid var(--border-color)', background: 'var(--bg-input)',
              color: 'var(--text-secondary)', cursor: 'pointer',
            }}
          >
            {xp}
          </button>
        ))}
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)',
        }}>
          ✕ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.xmlInput || 'XML Input'}</label>
          </div>
          <textarea
            value={xml}
            onChange={e => setXml(e.target.value)}
            placeholder={t.xmlPlaceholder || 'Paste your XML here...'}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.results || 'Results'}</label>
            <CopyButton text={results.join('\n')} />
          </div>
          <div style={{
            minHeight: 350, borderRadius: 8, border: '1px solid var(--border-color)',
            background: 'var(--bg-input)', padding: 14, overflow: 'auto', fontFamily: 'monospace', fontSize: 12,
          }}>
            {results.length > 0 ? results.map((r, i) => (
              <div key={i} style={{
                padding: '6px 10px', marginBottom: 4, borderRadius: 6,
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                whiteSpace: 'pre-wrap', wordBreak: 'break-all',
              }}>
                <span style={{ color: 'var(--text-tertiary)', marginRight: 8 }}>[{i + 1}]</span>
                {r}
              </div>
            )) : (
              <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', paddingTop: 100 }}>
                {t.noResults || 'No matches found'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About XPath Tester'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'XPath (XML Path Language) is a query language for selecting nodes from XML documents. This online XPath tester lets you evaluate XPath expressions against your XML data in real-time. Supports XPath 1.0 functions including text(), count(), contains(), and more. Perfect for debugging XSLT transformations, web scraping selectors, and XML data extraction.'}
        </p>
      </div>
    </ToolLayout>
  );
}
