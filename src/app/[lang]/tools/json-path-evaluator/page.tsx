'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function evaluateJsonPath(data: any, path: string): any[] {
  const results: any[] = [];

  function navigate(obj: any, pathParts: string[], index: number) {
    if (index >= pathParts.length) {
      results.push(obj);
      return;
    }

    const part = pathParts[index];

    if (part === '$') {
      navigate(obj, pathParts, index + 1);
      return;
    }

    if (part === '*') {
      if (Array.isArray(obj)) {
        obj.forEach((item) => navigate(item, pathParts, index + 1));
      } else if (typeof obj === 'object' && obj !== null) {
        Object.values(obj).forEach((val) => navigate(val, pathParts, index + 1));
      }
      return;
    }

    if (part === '..') {
      navigate(obj, pathParts, index + 1);
      if (Array.isArray(obj)) {
        obj.forEach((item) => navigate(item, ['..', ...pathParts.slice(index + 1)], 1));
      } else if (typeof obj === 'object' && obj !== null) {
        Object.values(obj).forEach((val) => navigate(val, ['..', ...pathParts.slice(index + 1)], 1));
      }
      return;
    }

    if (part.startsWith('[') && part.endsWith(']')) {
      const indexStr = part.slice(1, -1);
      if (!isNaN(Number(indexStr))) {
        const idx = Number(indexStr);
        if (Array.isArray(obj) && obj[idx] !== undefined) {
          navigate(obj[idx], pathParts, index + 1);
        }
      } else {
        const key = indexStr.replace(/^["']|["']$/g, '');
        if (obj && obj[key] !== undefined) {
          navigate(obj[key], pathParts, index + 1);
        }
      }
      return;
    }

    if (obj && typeof obj === 'object' && part in obj) {
      navigate(obj[part], pathParts, index + 1);
    }
  }

  const normalized = path.replace(/^(\$\.?)/, '').split('.').filter(p => p);
  navigate(data, ['$', ...normalized], 0);
  return results;
}

export default function JsonPathEvaluator() {
  const { dict } = useLang();
  const t = dict.tools['json-path-evaluator'];
  const [jsonInput, setJsonInput] = useState('');
  const [pathInput, setPathInput] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const evaluate = () => {
    try {
      const data = JSON.parse(jsonInput);
      const matches = evaluateJsonPath(data, pathInput);
      setResults(matches);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON or path');
      setResults([]);
    }
  };

  const loadSample = () => {
    const sample = {
      store: {
        name: 'Tech Store',
        books: [
          { id: 1, title: 'Learning Rust', author: 'Alice', price: 29.99 },
          { id: 2, title: 'Web Dev Basics', author: 'Bob', price: 19.99 },
        ],
      },
      members: [
        { id: 101, name: 'Charlie' },
        { id: 102, name: 'Diana' },
      ],
    };
    setJsonInput(JSON.stringify(sample, null, 2));
    setPathInput('$.store.books[0].title');
  };

  const resultText = results.map(r => JSON.stringify(r, null, 2)).join('\n---\n');

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-path-evaluator"
    >
      {/* Input Area */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.jsonLabel || 'JSON Data'}
            </label>
            <textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder={t.jsonPlaceholder || 'Paste JSON here...'}
              style={{ minHeight: 250, fontFamily: 'monospace', fontSize: 12 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.pathLabel || 'JSONPath Expression'}
            </label>
            <textarea
              value={pathInput}
              onChange={e => setPathInput(e.target.value)}
              placeholder={t.pathPlaceholder || '$.store.books[0].title\n$.store.*\n$..author'}
              style={{ minHeight: 250, fontFamily: 'monospace', fontSize: 12 }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={evaluate} className="btn btn-primary">{t.evaluateBtn || 'Evaluate'}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setJsonInput(''); setPathInput(''); setResults([]); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Error */}
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

      {/* Results */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>
            {t.resultsLabel || 'Results'} ({results.length})
          </label>
          <CopyButton text={resultText} />
        </div>
        <textarea
          value={resultText}
          readOnly
          placeholder={t.resultsPlaceholder || 'Results will appear here...'}
          style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 12, opacity: resultText ? 1 : 0.5 }}
        />
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'Evaluate JSONPath Expressions'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Query JSON documents using JSONPath expressions. Extract specific values, arrays, and nested objects with powerful path selectors.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Support for basic path selectors ($.field.nested)'}</li>
          <li>{t.seoFeature2 || 'Array index access ([0], [1])'}</li>
          <li>{t.seoFeature3 || 'Wildcard operators (* and ..)'}</li>
          <li>{t.seoFeature4 || 'Multiple results display with export'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
