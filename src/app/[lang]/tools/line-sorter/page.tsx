'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function LineSorter() {
  const { dict } = useLang();
  const t = dict.tools['line-sorter'];

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const getLines = () => input.split('\n').filter(l => l.trim() !== '');

  const sortAsc = () => {
    const lines = getLines();
    lines.sort((a, b) => a.localeCompare(b));
    setOutput(lines.join('\n'));
  };

  const sortDesc = () => {
    const lines = getLines();
    lines.sort((a, b) => b.localeCompare(a));
    setOutput(lines.join('\n'));
  };

  const sortNumeric = () => {
    const lines = getLines();
    lines.sort((a, b) => {
      const na = parseFloat(a) || 0;
      const nb = parseFloat(b) || 0;
      return na - nb;
    });
    setOutput(lines.join('\n'));
  };

  const sortByLength = () => {
    const lines = getLines();
    lines.sort((a, b) => a.length - b.length);
    setOutput(lines.join('\n'));
  };

  const removeDuplicates = () => {
    const lines = getLines();
    const unique = [...new Set(lines)];
    setOutput(unique.join('\n'));
  };

  const reverse = () => {
    const lines = getLines();
    lines.reverse();
    setOutput(lines.join('\n'));
  };

  const shuffle = () => {
    const lines = getLines();
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutput(lines.join('\n'));
  };

  const trimLines = () => {
    const lines = input.split('\n').map(l => l.trim()).filter(l => l !== '');
    setOutput(lines.join('\n'));
  };

  const addLineNumbers = () => {
    const lines = getLines();
    setOutput(lines.map((l, i) => `${i + 1}. ${l}`).join('\n'));
  };

  const inputLineCount = input ? input.split('\n').filter(l => l.trim()).length : 0;
  const outputLineCount = output ? output.split('\n').filter(l => l.trim()).length : 0;

  const buttons = [
    { label: t.sortAsc, fn: sortAsc, color: 'var(--accent-blue)' },
    { label: t.sortDesc, fn: sortDesc, color: 'var(--accent-blue)' },
    { label: t.sortNumeric, fn: sortNumeric, color: 'var(--accent-purple)' },
    { label: t.sortByLength, fn: sortByLength, color: 'var(--accent-purple)' },
    { label: t.removeDups, fn: removeDuplicates, color: 'var(--accent-emerald)' },
    { label: t.reverse, fn: reverse, color: 'var(--accent-orange)' },
    { label: t.shuffle, fn: shuffle, color: 'var(--accent-orange)' },
    { label: t.trimLines, fn: trimLines, color: 'var(--accent-rose)' },
    { label: t.addNumbers, fn: addLineNumbers, color: 'var(--accent-rose)' },
  ];

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="line-sorter"
    >
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {buttons.map(({ label, fn }) => (
          <button key={label} onClick={fn} className="btn btn-secondary" style={{ fontSize: 12 }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.input} <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>({inputLineCount} {t.linesLabel})</span></label>
            <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-ghost" style={{ fontSize: 11, padding: '2px 8px' }}>{dict.common.clear}</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.output} <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>({outputLineCount} {t.linesLabel})</span></label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={dict.common.resultPlaceholder}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
