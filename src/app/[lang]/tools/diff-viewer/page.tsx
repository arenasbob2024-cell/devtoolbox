'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function lcs(a: string, b: string): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

function computeDiff(original: string, modified: string, ignoreWs: boolean, ignoreCase: boolean): { type: string; content: string; lineNum: number }[] {
  const origLines = original.split('\n');
  const modLines = modified.split('\n');

  let origProcessed = origLines;
  let modProcessed = modLines;

  if (ignoreCase) {
    origProcessed = origLines.map((l) => l.toLowerCase());
    modProcessed = modLines.map((l) => l.toLowerCase());
  }

  if (ignoreWs) {
    origProcessed = origProcessed.map((l) => l.replace(/\s+/g, ' ').trim());
    modProcessed = modProcessed.map((l) => l.replace(/\s+/g, ' ').trim());
  }

  const dp = lcs(origProcessed.join('\n'), modProcessed.join('\n'));
  const result: { type: string; content: string; lineNum: number }[] = [];

  let i = origProcessed.length;
  let j = modProcessed.length;
  let origLine = origLines.length;
  let modLine = modLines.length;

  const align: { type: string; orig: string; mod: string }[] = [];

  i = origLines.length;
  j = modLines.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && (ignoreWs || ignoreCase ? origProcessed[i - 1] === modProcessed[j - 1] : origLines[i - 1] === modLines[j - 1])) {
      align.unshift({ type: 'context', orig: origLines[i - 1], mod: modLines[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || origProcessed[i - 1] !== modProcessed[j - 1])) {
      align.unshift({ type: 'add', orig: '', mod: modLines[j - 1] });
      j--;
    } else {
      align.unshift({ type: 'remove', orig: origLines[i - 1], mod: '' });
      i--;
    }
  }

  let origIdx = 1;
  let modIdx = 1;

  for (const item of align) {
    if (item.type === 'context') {
      result.push({ type: 'context', content: item.orig, lineNum: origIdx });
      origIdx++;
      modIdx++;
    } else if (item.type === 'remove') {
      result.push({ type: 'remove', content: item.orig, lineNum: origIdx });
      origIdx++;
    } else {
      result.push({ type: 'add', content: item.mod, lineNum: modIdx });
      modIdx++;
    }
  }

  return result;
}

export default function DiffViewer() {
  const { dict } = useLang();
  const t = dict.tools['diff-viewer'];
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [ignoreWs, setIgnoreWs] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);

  const diff = useMemo(() => {
    return computeDiff(original, modified, ignoreWs, ignoreCase);
  }, [original, modified, ignoreWs, ignoreCase]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;
    for (const item of diff) {
      if (item.type === 'add') added++;
      else if (item.type === 'remove') removed++;
      else unchanged++;
    }
    return { added, removed, unchanged };
  }, [diff]);

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="diff-viewer">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Original</label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Enter original text..."
            style={{
              width: '100%',
              height: '300px',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Modified</label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Enter modified text..."
            style={{
              width: '100%',
              height: '300px',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>Options</div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={ignoreWs}
              onChange={(e) => setIgnoreWs(e.target.checked)}
            />
            <span>Ignore Whitespace</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
            />
            <span>Ignore Case</span>
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f8ff', borderRadius: '4px', fontSize: '14px' }}>
        <strong>Stats:</strong> {stats.added} added, {stats.removed} removed, {stats.unchanged} unchanged
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
        {diff.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Enter text to compare</div>
        ) : (
          <div style={{ maxHeight: '500px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '12px' }}>
            {diff.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  backgroundColor:
                    item.type === 'add'
                      ? '#d4edda'
                      : item.type === 'remove'
                        ? '#f8d7da'
                        : '#f5f5f5',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    padding: '4px 8px',
                    backgroundColor:
                      item.type === 'add'
                        ? '#90ee90'
                        : item.type === 'remove'
                          ? '#ffcccb'
                          : '#e8e8e8',
                    color: '#666',
                    fontSize: '11px',
                    textAlign: 'right',
                  }}
                >
                  {item.lineNum}
                </div>
                <div style={{ flex: 1, padding: '4px 8px', color: item.type === 'remove' ? '#721c24' : item.type === 'add' ? '#155724' : '#333' }}>
                  {item.type === 'remove' ? '- ' : item.type === 'add' ? '+ ' : '  '}
                  {item.content || '(empty line)'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '32px', color: '#666', lineHeight: '1.6' }}>
        <h3>{t.featuresTitle || 'Features'}</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li>Line-by-line diff comparison</li>
          <li>Color-coded changes (red for removed, green for added)</li>
          <li>Ignore whitespace option</li>
          <li>Ignore case option</li>
          <li>Line number tracking</li>
          <li>Statistics summary</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
