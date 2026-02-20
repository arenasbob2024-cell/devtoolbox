'use client';

import { useState, useMemo, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

interface Match {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const { dict } = useLang();
  const t = dict.tools['regex-tester'];

  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testStr, setTestStr] = useState('');
  const [error, setError] = useState('');
  const [shareCopied, setShareCopied] = useState(false);

  // Restore state from URL hash on mount
  useEffect(() => {
    const params = getHashParams();
    if (params.pattern) {
      const decodedPattern = decodeFromUrl(params.pattern);
      if (decodedPattern) setPattern(decodedPattern);
    }
    if (params.flags) {
      setFlags(decodeURIComponent(params.flags));
    }
    if (params.text) {
      const decodedText = decodeFromUrl(params.text);
      if (decodedText) setTestStr(decodedText);
    }
  }, []);

  const handleShare = () => {
    if (!pattern) return;
    const params: Record<string, string> = { pattern: encodeForUrl(pattern) };
    if (flags) params.flags = encodeURIComponent(flags);
    if (testStr) params.text = encodeForUrl(testStr);
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const matches = useMemo((): Match[] => {
    if (!pattern || !testStr) { setError(''); return []; }
    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      const results: Match[] = [];
      let match;
      if (flags.includes('g')) {
        while ((match = regex.exec(testStr)) !== null) {
          results.push({ text: match[0], index: match.index, groups: match.slice(1) });
          if (!match[0]) break; // prevent infinite loop for zero-length matches
        }
      } else {
        match = regex.exec(testStr);
        if (match) {
          results.push({ text: match[0], index: match.index, groups: match.slice(1) });
        }
      }
      return results;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.invalidRegex);
      return [];
    }
  }, [pattern, flags, testStr, t.invalidRegex]);

  const highlightedText = useMemo(() => {
    if (!pattern || !testStr || error) return testStr;
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(testStr)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testStr.slice(lastIndex, match.index), isMatch: false });
        }
        parts.push({ text: match[0], isMatch: true });
        lastIndex = match.index + match[0].length;
        if (!match[0]) break;
      }
      if (lastIndex < testStr.length) {
        parts.push({ text: testStr.slice(lastIndex), isMatch: false });
      }
      return parts;
    } catch {
      return testStr;
    }
  }, [pattern, flags, testStr, error]);

  const flagOptions = [
    { value: 'g', label: t.globalFlag },
    { value: 'i', label: t.caseFlag },
    { value: 'm', label: t.multilineFlag },
    { value: 's', label: t.dotallFlag },
  ];

  const toggleFlag = (f: string) => {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="regex-tester"
    >
      {/* Pattern */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.regex}</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 18, color: 'var(--text-secondary)' }}>/</span>
          <input type="text" value={pattern} onChange={e => setPattern(e.target.value)}
            placeholder="[a-zA-Z0-9]+" style={{ flex: 1, fontFamily: 'monospace' }} />
          <span style={{ fontSize: 18, color: 'var(--text-secondary)' }}>/</span>
          <code style={{ fontSize: 14, color: 'var(--accent-blue)', minWidth: 40 }}>{flags}</code>
        </div>
      </div>

      {/* Flags */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {flagOptions.map(f => (
          <label key={f.value} style={{
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 12,
            color: flags.includes(f.value) ? 'var(--accent-blue)' : 'var(--text-secondary)',
            cursor: 'pointer', padding: '4px 10px', borderRadius: 6,
            background: flags.includes(f.value) ? 'rgba(59,130,246,0.1)' : 'transparent',
            border: `1px solid ${flags.includes(f.value) ? 'var(--accent-blue)' : 'var(--border-color)'}`,
          }}>
            <input type="checkbox" checked={flags.includes(f.value)} onChange={() => toggleFlag(f.value)} style={{ display: 'none' }} />
            {f.label}
          </label>
        ))}
        <button onClick={handleShare} className="btn btn-secondary" style={{ marginLeft: 'auto', fontSize: 12, padding: '4px 12px' }} title="Share via URL">
          {shareCopied ? '\u2713 Link Copied!' : '\uD83D\uDD17 Share'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)',
        }}>✕ {error}</div>
      )}

      {/* Test String */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.testString}</label>
        <textarea value={testStr} onChange={e => setTestStr(e.target.value)}
          placeholder={t.testPlaceholder} style={{ minHeight: 150 }} />
      </div>

      {/* Highlighted output */}
      {typeof highlightedText !== 'string' && highlightedText.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.highlightedMatches}</label>
          <div style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
            border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: 13,
            lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
          }}>
            {highlightedText.map((part, i) => (
              <span key={i} style={{
                background: part.isMatch ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                borderRadius: part.isMatch ? 3 : 0,
                padding: part.isMatch ? '1px 2px' : 0,
              }}>{part.text}</span>
            ))}
          </div>
        </div>
      )}

      {/* Matches */}
      {matches.length > 0 && (
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            {matches.length} {matches.length > 1 ? t.matchesFound : t.matchFound}
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {matches.map((m, i) => (
              <div key={i} style={{
                background: 'var(--bg-input)', borderRadius: 6, padding: '8px 12px',
                border: '1px solid var(--border-color)', fontSize: 12, fontFamily: 'monospace',
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>#{i + 1} </span>
                <span style={{ color: 'var(--accent-blue)' }}>&quot;{m.text}&quot;</span>
                <span style={{ color: 'var(--text-secondary)' }}> {t.atIndex} {m.index}</span>
                {m.groups.length > 0 && (
                  <span style={{ color: 'var(--accent-emerald)' }}> {t.groups}: [{m.groups.join(', ')}]</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
