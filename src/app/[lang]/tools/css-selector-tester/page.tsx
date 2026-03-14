'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface MatchedElement {
  tag: string;
  content: string;
  html: string;
}

export default function CssSelectorTester() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['css-selector-tester'];

  const [htmlInput, setHtmlInput] = useState('');
  const [selector, setSelector] = useState('');
  const [matchedElements, setMatchedElements] = useState<MatchedElement[]>([]);
  const [error, setError] = useState('');
  const [matchCount, setMatchCount] = useState(0);

  const sampleHtml = `<div id="container" class="main">
  <h1>Welcome</h1>
  <p class="intro">This is the first paragraph.</p>
  <p>This is the second paragraph.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li class="active">Item 3</li>
  </ul>
  <footer>
    <p>Footer content</p>
  </footer>
</div>`;

  const testSelector = useCallback(() => {
    try {
      setError('');
      setMatchedElements([]);
      setMatchCount(0);

      if (!htmlInput.trim()) {
        setError('Please enter HTML');
        return;
      }

      if (!selector.trim()) {
        setError('Please enter a CSS selector');
        return;
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');

      if (doc.body.textContent?.includes('Syntax error') || !doc.documentElement) {
        setError('Invalid HTML');
        return;
      }

      let elements: Element[] = [];
      try {
        elements = Array.from(doc.querySelectorAll(selector));
      } catch (err) {
        setError(`Invalid selector: ${err instanceof Error ? err.message : 'Parse error'}`);
        return;
      }

      if (elements.length === 0) {
        setError('No elements matched');
        setMatchCount(0);
        return;
      }

      const matched: MatchedElement[] = elements.map((el) => ({
        tag: el.tagName.toLowerCase(),
        content: el.textContent || '',
        html: el.outerHTML,
      }));

      setMatchedElements(matched);
      setMatchCount(elements.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test failed');
      setMatchedElements([]);
      setMatchCount(0);
    }
  }, [htmlInput, selector]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      testSelector();
    }
  };

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
    padding: '10px 20px',
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
    padding: '10px 20px',
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
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-selector-tester">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
            HTML Input
          </label>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Paste your HTML markup here..."
            rows={10}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
            CSS Selector
          </label>
          <input
            type="text"
            value={selector}
            onChange={(e) => setSelector(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., .class, #id, div > p, [data-attr], :first-child..."
            style={{ ...inputStyle, marginBottom: 10 }}
          />
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
            Try: <code style={{ background: 'var(--bg-secondary)', padding: '2px 4px', borderRadius: 3 }}>p</code>,
            <code style={{ background: 'var(--bg-secondary)', padding: '2px 4px', borderRadius: 3, marginLeft: 4 }}>
              .intro
            </code>,
            <code style={{ background: 'var(--bg-secondary)', padding: '2px 4px', borderRadius: 3, marginLeft: 4 }}>
              li:nth-child(2)
            </code>
          </div>

          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 6,
            padding: 12,
            minHeight: 200,
            overflowY: 'auto',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--text-secondary)',
          }}>
            {matchCount > 0 ? (
              <div>
                <div style={{ color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: 8 }}>
                  ✓ Matched {matchCount} element{matchCount !== 1 ? 's' : ''}
                </div>
                {matchedElements.slice(0, 5).map((el, i) => (
                  <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--accent-blue)', marginBottom: 4 }}>
                      &lt;{el.tag}&gt;
                    </div>
                    <div style={{ color: 'var(--text-secondary)', wordBreak: 'break-all', fontSize: 10 }}>
                      {el.content.slice(0, 80)}
                      {el.content.length > 80 ? '...' : ''}
                    </div>
                  </div>
                ))}
                {matchedElements.length > 5 && (
                  <div style={{ color: 'var(--text-secondary)', fontSize: 10 }}>
                    ... and {matchedElements.length - 5} more
                  </div>
                )}
              </div>
            ) : (
              <div style={{ color: 'var(--text-secondary)' }}>
                Test results will appear here...
              </div>
            )}
          </div>
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

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={testSelector} style={buttonStyle}>
          Test Selector
        </button>
        <button onClick={() => { setHtmlInput(sampleHtml); setSelector(''); setError(''); setMatchedElements([]); setMatchCount(0); }} style={secondaryButtonStyle}>
          Load Sample
        </button>
        <button onClick={() => { setHtmlInput(''); setSelector(''); setError(''); setMatchedElements([]); setMatchCount(0); }} style={secondaryButtonStyle}>
          Clear All
        </button>
      </div>

      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
          Common CSS Selectors Reference
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          fontSize: 12,
          lineHeight: 1.8,
        }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--accent-blue)', marginBottom: 6 }}>Basic Selectors</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>element</code> - Element by tag</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>.class</code> - By class name</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>#id</code> - By ID</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>[attr]</code> - By attribute</div>
          </div>

          <div>
            <div style={{ fontWeight: 600, color: 'var(--accent-blue)', marginBottom: 6 }}>Combinators</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>A B</code> - Descendant</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>A &gt; B</code> - Child</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>A + B</code> - Adjacent sibling</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>A ~ B</code> - General sibling</div>
          </div>

          <div>
            <div style={{ fontWeight: 600, color: 'var(--accent-blue)', marginBottom: 6 }}>Pseudo-classes</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>:first-child</code></div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>:last-child</code></div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>:nth-child(n)</code></div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>:not(selector)</code></div>
          </div>

          <div>
            <div style={{ fontWeight: 600, color: 'var(--accent-blue)', marginBottom: 6 }}>Attribute Selectors</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>[attr=value]</code> - Exact</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>[attr*=value]</code> - Contains</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>[attr^=value]</code> - Starts with</div>
            <div><code style={{ background: 'var(--bg-secondary)', padding: '2px 4px' }}>[attr$=value]</code> - Ends with</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
