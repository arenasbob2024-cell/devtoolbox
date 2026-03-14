'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface Match {
  full: string;
  start: number;
  end: number;
  groups: string[];
}

export default function RegexVisualizer() {
  const { dict } = useLang();
  const t = dict.tools['regex-visualizer'];
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    setError('');
    setMatches([]);

    if (!pattern.trim()) {
      setError('Regex pattern is empty');
      return;
    }

    if (!testString.trim()) {
      setError('Test string is empty');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: Match[] = [];

      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push({
            full: match[0],
            start: match.index,
            end: match.index + match[0].length,
            groups: match.slice(1),
          });
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          allMatches.push({
            full: match[0],
            start: match.index,
            end: match.index + match[0].length,
            groups: match.slice(1),
          });
        }
      }

      setMatches(allMatches);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid regex pattern';
      setError(msg);
    }
  };

  const loadSampleRegex = () => {
    setPattern('\\b[A-Z][a-z]+\\b');
    setTestString('The Quick Brown Fox Jumps Over The Lazy Dog');
    setFlags('g');
    setMatches([]);
    setError('');
  };

  const highlightMatches = () => {
    if (matches.length === 0) return <>{testString}</>;

    const parts = [];
    let lastIndex = 0;

    for (const match of matches) {
      if (lastIndex < match.start) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {testString.substring(lastIndex, match.start)}
          </span>
        );
      }

      parts.push(
        <span
          key={`match-${match.start}`}
          style={{
            background: 'rgba(34, 197, 94, 0.3)',
            color: 'var(--accent-green)',
            fontWeight: 600,
            borderRadius: 3,
            padding: '2px 4px',
          }}
        >
          {match.full}
        </span>
      );

      lastIndex = match.end;
    }

    if (lastIndex < testString.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {testString.substring(lastIndex)}
        </span>
      );
    }

    return <>{parts}</>;
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="regex-visualizer"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={testRegex} className="btn btn-primary">Test Regex</button>
        <button onClick={loadSampleRegex} className="btn btn-secondary">Load Sample</button>
        <button
          onClick={() => {
            setPattern('');
            setTestString('');
            setMatches([]);
            setError('');
          }}
          className="btn btn-secondary"
        >
          Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '12px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {error}
        </div>
      )}

      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Regex Pattern</label>
          <textarea
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern (e.g., \d+)"
            style={{ minHeight: 100 }}
          />
          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 12, marginBottom: 4, display: 'block' }}>Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m, s, u, y"
              maxLength={10}
              style={{
                width: '100%',
                padding: '6px 8px',
                borderRadius: 4,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test the regex against..."
            style={{ minHeight: 130 }}
          />
        </div>
      </div>

      {/* Results */}
      {matches.length > 0 && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--accent-green)' }}>
            ✓ Found {matches.length} match{matches.length !== 1 ? 'es' : ''}
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 6,
            padding: 12,
            marginBottom: 12,
            fontSize: 14,
            color: 'var(--text-primary)',
            fontFamily: 'monospace',
            lineHeight: 1.8,
            wordBreak: 'break-word',
          }}>
            {highlightMatches()}
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Matches:</div>
          {matches.map((match, i) => (
            <div key={i} style={{
              background: 'var(--bg-primary)',
              borderRadius: 4,
              padding: 10,
              marginBottom: 8,
              fontSize: 12,
              fontFamily: 'monospace',
              border: '1px solid var(--border-color)',
            }}>
              <div>Match {i + 1}: <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>"{match.full}"</span></div>
              <div style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Position: {match.start}-{match.end}</div>
              {match.groups.length > 0 && (
                <div style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                  Groups: {match.groups.map((g, gi) => `$${gi + 1}="${g}"`).join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About Regex Visualizer</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Test and visualize regular expressions with real-time match highlighting. See capture groups, match positions, and test your regex patterns against sample strings.
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Features</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Real-time regex testing with match highlighting</li>
          <li>Support for all JavaScript regex flags (g, i, m, s, u, y)</li>
          <li>Display of capture groups and match positions</li>
          <li>Visual highlighting of all matches in the test string</li>
          <li>Error reporting for invalid patterns</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
