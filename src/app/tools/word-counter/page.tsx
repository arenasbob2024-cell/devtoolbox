'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    if (!text.trim()) return { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, lines: 0, readingTime: '0 sec' };

    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const lines = text.split('\n').length;
    const minutes = Math.floor(words / 200);
    const seconds = Math.round((words % 200) / 200 * 60);
    const readingTime = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;

    return { words, chars, charsNoSpaces, sentences, paragraphs, lines, readingTime };
  }, [text]);

  const topWords = useMemo(() => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [text]);

  const statCards = [
    { label: 'Words', value: stats.words, color: 'var(--accent-blue)' },
    { label: 'Characters', value: stats.chars, color: 'var(--accent-purple)' },
    { label: 'No Spaces', value: stats.charsNoSpaces, color: 'var(--accent-emerald)' },
    { label: 'Sentences', value: stats.sentences, color: 'var(--accent-orange)' },
    { label: 'Paragraphs', value: stats.paragraphs, color: 'var(--accent-rose)' },
    { label: 'Lines', value: stats.lines, color: 'var(--text-secondary)' },
  ];

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and estimate reading time."
      toolId="word-counter"
    >
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 16 }}>
        {statCards.map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '12px 8px',
            textAlign: 'center', border: '1px solid var(--border-color)',
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'var(--bg-input)', borderRadius: 8, padding: '8px 14px',
        fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16,
        border: '1px solid var(--border-color)',
      }}>
        ⏱ Estimated reading time: <strong style={{ color: 'var(--accent-blue)' }}>{stats.readingTime}</strong> (at 200 words/min)
      </div>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Start typing or paste your text here to see word count, character count, and more..."
        style={{ minHeight: 250 }}
      />

      {topWords.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Top Words</h3>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {topWords.map(([word, count]) => (
              <span key={word} style={{
                background: 'var(--bg-input)', borderRadius: 6, padding: '4px 10px',
                fontSize: 12, border: '1px solid var(--border-color)',
              }}>
                {word} <span style={{ color: 'var(--accent-blue)' }}>({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About Word Counter</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          This word counter tool provides detailed text statistics including word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. Perfect for writers, students, and content creators who need to meet word count requirements.
        </p>
      </div>
    </ToolLayout>
  );
}
