'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function generateSlug(text: string, options: { lowercase: boolean; separator: string; maxLength: number; removeStopWords: boolean }): string {
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'it', 'as', 'be', 'this', 'that', 'are', 'was', 'were', 'been'];
  
  let slug = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (options.removeStopWords) {
    slug = slug.split(' ').filter(w => !stopWords.includes(w.toLowerCase())).join(' ');
  }

  if (options.lowercase) slug = slug.toLowerCase();
  slug = slug.replace(/\s+/g, options.separator).replace(new RegExp(`[${options.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+`, 'g'), options.separator);
  
  if (options.maxLength > 0 && slug.length > options.maxLength) {
    slug = slug.substring(0, options.maxLength).replace(new RegExp(`${options.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), '');
  }

  return slug;
}

export default function SlugGenerator() {
  const { dict } = useLang();
  const t = dict.tools['slug-generator'];

  const [input, setInput] = useState('');
  const [lowercase, setLowercase] = useState(true);
  const [separator, setSeparator] = useState('-');
  const [maxLength, setMaxLength] = useState(0);
  const [removeStopWords, setRemoveStopWords] = useState(false);

  const slug = useMemo(() => {
    if (!input.trim()) return '';
    return generateSlug(input, { lowercase, separator, maxLength, removeStopWords });
  }, [input, lowercase, separator, maxLength, removeStopWords]);

  const loadSample = () => {
    setInput('How to Build a REST API with Node.js & Express in 2025!');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="slug-generator"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>{t.inputLabel}</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.inputPlaceholder}
              style={{ minHeight: 100 }}
            />
          </div>

          <div style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '16px',
            border: '1px solid var(--border-color)', marginBottom: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.resultLabel}</label>
              {slug && <CopyButton text={slug} />}
            </div>
            <code style={{
              fontSize: 15, fontFamily: 'monospace', wordBreak: 'break-all',
              color: slug ? 'var(--accent-emerald)' : 'var(--text-secondary)',
            }}>
              {slug || t.resultPlaceholder}
            </code>
          </div>

          {slug && (
            <div style={{
              background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
              border: '1px solid var(--border-color)', fontSize: 13,
            }}>
              <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{t.previewUrl}</div>
              <code style={{ color: 'var(--accent-blue)' }}>https://example.com/blog/{slug}</code>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 13, cursor: 'pointer', padding: '8px 12px',
            background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)',
          }}>
            <span>{t.lowercase}</span>
            <input type="checkbox" checked={lowercase} onChange={e => setLowercase(e.target.checked)} style={{ accentColor: 'var(--accent-blue)' }} />
          </label>

          <label style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 13, cursor: 'pointer', padding: '8px 12px',
            background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)',
          }}>
            <span>{t.removeStopWords}</span>
            <input type="checkbox" checked={removeStopWords} onChange={e => setRemoveStopWords(e.target.checked)} style={{ accentColor: 'var(--accent-blue)' }} />
          </label>

          <div style={{ padding: '8px 12px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.separator}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['-', '_', '.'].map(s => (
                <button key={s} onClick={() => setSeparator(s)}
                  className={separator === s ? 'btn btn-primary' : 'btn btn-ghost'}
                  style={{ padding: '4px 12px', fontSize: 13, minWidth: 40 }}>
                  {s === '-' ? '- (dash)' : s === '_' ? '_ (underscore)' : '. (dot)'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '8px 12px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.maxLength}</label>
              <span style={{ fontSize: 13, color: 'var(--accent-blue)', fontWeight: 700 }}>{maxLength || '∞'}</span>
            </div>
            <input type="range" min={0} max={100} value={maxLength} onChange={e => setMaxLength(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-blue)' }} />
          </div>

          <button onClick={loadSample} className="btn btn-ghost" style={{ width: '100%' }}>{dict.common.loadSample}</button>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
