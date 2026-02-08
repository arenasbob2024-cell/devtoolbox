'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

function generateWords(count: number): string {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
}

function generateSentences(count: number): string {
  const sentences = [];
  for (let i = 0; i < count; i++) {
    const wordCount = 8 + Math.floor(Math.random() * 12);
    sentences.push(generateWords(wordCount) + '.');
  }
  return sentences.join(' ');
}

function generateParagraphs(count: number): string {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = 3 + Math.floor(Math.random() * 4);
    paragraphs.push(generateSentences(sentenceCount));
  }
  return paragraphs.join('\n\n');
}

export default function LoremIpsum() {
  const { dict } = useLang();
  const t = dict.tools['lorem-ipsum'];
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);

  const generate = () => {
    let text = '';
    switch (mode) {
      case 'paragraphs': text = generateParagraphs(count); break;
      case 'sentences': text = generateSentences(count); break;
      case 'words': text = generateWords(count); break;
    }
    if (startWithLorem && text.length > 0) {
      text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + text.slice(text.indexOf(' ') + 1);
    }
    setOutput(text);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="lorem-ipsum"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={mode} onChange={e => setMode(e.target.value as typeof mode)}
          style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}>
          <option value="paragraphs">{t.paragraphs}</option>
          <option value="sentences">{t.sentences}</option>
          <option value="words">{dict.common.words}</option>
        </select>
        <input type="number" value={count}
          onChange={e => setCount(Math.max(1, parseInt(e.target.value) || 1))}
          style={{ width: 70, padding: '8px 12px', fontSize: 13 }} min={1} max={100} />
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={startWithLorem} onChange={e => setStartWithLorem(e.target.checked)} />
          {t.startWithLorem}
        </label>
        <button onClick={generate} className="btn btn-primary">{dict.common.generate}</button>
        {output && <CopyButton text={output} label={dict.common.copyAll} />}
      </div>

      <textarea
        value={output}
        readOnly
        placeholder={t.placeholder}
        style={{ minHeight: 300, opacity: output ? 1 : 0.5 }}
      />

      {output && (
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
          {output.split(/\s+/).length} {dict.common.words} | {output.length} {dict.common.characters}
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
