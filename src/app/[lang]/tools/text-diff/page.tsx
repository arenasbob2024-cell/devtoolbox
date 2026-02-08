'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

interface DiffLine {
  type: 'same' | 'add' | 'remove';
  text: string;
  lineNum1?: number;
  lineNum2?: number;
}

function computeDiff(text1: string, text2: string): DiffLine[] {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const result: DiffLine[] = [];

  const maxLen = Math.max(lines1.length, lines2.length);
  let l1 = 0, l2 = 0;

  // Simple line-by-line diff
  for (let i = 0; i < maxLen; i++) {
    const line1 = i < lines1.length ? lines1[i] : undefined;
    const line2 = i < lines2.length ? lines2[i] : undefined;

    if (line1 === line2) {
      l1++; l2++;
      result.push({ type: 'same', text: line1 || '', lineNum1: l1, lineNum2: l2 });
    } else {
      if (line1 !== undefined) {
        l1++;
        result.push({ type: 'remove', text: line1, lineNum1: l1 });
      }
      if (line2 !== undefined) {
        l2++;
        result.push({ type: 'add', text: line2, lineNum2: l2 });
      }
    }
  }

  return result;
}

export default function TextDiff() {
  const { dict } = useLang();
  const t = dict.tools['text-diff'];

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const diff = useMemo(() => {
    if (!showDiff) return [];
    return computeDiff(text1, text2);
  }, [text1, text2, showDiff]);

  const stats = useMemo(() => {
    const added = diff.filter(d => d.type === 'add').length;
    const removed = diff.filter(d => d.type === 'remove').length;
    const same = diff.filter(d => d.type === 'same').length;
    return { added, removed, same };
  }, [diff]);

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="text-diff"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.originalText}</label>
          <textarea value={text1} onChange={e => { setText1(e.target.value); setShowDiff(false); }}
            placeholder={t.originalPlaceholder} style={{ minHeight: 200 }} />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.modifiedText}</label>
          <textarea value={text2} onChange={e => { setText2(e.target.value); setShowDiff(false); }}
            placeholder={t.modifiedPlaceholder} style={{ minHeight: 200 }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setShowDiff(true)} className="btn btn-primary">{dict.common.compare}</button>
        <button onClick={() => { setText1(''); setText2(''); setShowDiff(false); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {showDiff && diff.length > 0 && (
        <>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 13 }}>
            <span style={{ color: 'var(--accent-emerald)' }}>+ {stats.added} {dict.common.added}</span>
            <span style={{ color: 'var(--accent-rose)' }}>- {stats.removed} {dict.common.removed}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{stats.same} {dict.common.unchanged}</span>
          </div>

          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            overflow: 'auto',
            maxHeight: 500,
            fontFamily: 'monospace',
            fontSize: 13,
          }}>
            {diff.map((line, i) => (
              <div key={i} style={{
                display: 'flex',
                background: line.type === 'add' ? 'rgba(16, 185, 129, 0.1)' :
                  line.type === 'remove' ? 'rgba(244, 63, 94, 0.1)' : 'transparent',
                borderBottom: '1px solid rgba(42, 42, 74, 0.3)',
              }}>
                <span style={{
                  width: 30, textAlign: 'right', padding: '4px 6px',
                  color: 'var(--text-secondary)', fontSize: 11,
                  borderRight: '1px solid var(--border-color)',
                  userSelect: 'none', flexShrink: 0,
                }}>{line.lineNum1 || ''}</span>
                <span style={{
                  width: 30, textAlign: 'right', padding: '4px 6px',
                  color: 'var(--text-secondary)', fontSize: 11,
                  borderRight: '1px solid var(--border-color)',
                  userSelect: 'none', flexShrink: 0,
                }}>{line.lineNum2 || ''}</span>
                <span style={{
                  width: 20, textAlign: 'center', padding: '4px 0',
                  color: line.type === 'add' ? 'var(--accent-emerald)' :
                    line.type === 'remove' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                  fontWeight: 700, flexShrink: 0,
                }}>
                  {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
                </span>
                <span style={{
                  padding: '4px 8px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  flex: 1,
                }}>{line.text}</span>
              </div>
            ))}
          </div>
        </>
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
