'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';

function countStats(text: string) {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? (text.match(/[.!?]+[\s$]/g) || []).length + (text.trim().match(/[.!?]$/) ? 1 : (text.trim().length > 0 && !/[.!?]$/.test(text.trim()) ? 1 : 0)) : 0;
  const sentenceCount = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
  const lines = text.trim() ? text.split('\n').length : 0;
  const bytes = new TextEncoder().encode(text).length;

  // Average reading speed: 200-250 wpm, speaking: 130 wpm
  const readingTimeMin = Math.ceil(words / 225);
  const speakingTimeMin = Math.ceil(words / 130);

  // Character frequency
  const freq: Record<string, number> = {};
  for (const ch of text.toLowerCase()) {
    if (/[a-z0-9]/.test(ch)) {
      freq[ch] = (freq[ch] || 0) + 1;
    }
  }
  const topChars = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences: sentenceCount,
    paragraphs,
    lines,
    bytes,
    readingTimeMin,
    speakingTimeMin,
    topChars,
  };
}

const ui = {
  pageTitle: 'Text Counter & Statistics',
  pageDescription: 'Count words, characters, sentences, paragraphs, lines, bytes, reading time, and speaking time from any text.',
  inputLabel: 'Enter your text',
  inputPlaceholder: 'Type or paste your text here to see statistics...',
  characters: 'Characters',
  charactersNoSpaces: 'Characters (no spaces)',
  words: 'Words',
  sentences: 'Sentences',
  paragraphs: 'Paragraphs',
  lines: 'Lines',
  bytes: 'Bytes',
  readingTime: 'Reading Time',
  speakingTime: 'Speaking Time',
  minutes: 'min',
  lessThan1: '< 1 min',
  charFrequency: 'Top Character Frequency',
  character: 'Character',
  count: 'Count',
  percentage: 'Percentage',
  clear: 'Clear',
  seoTitle: 'About Text Counter',
  seoContent: 'This text counter provides comprehensive statistics about your text in real time. It counts characters (with and without spaces), words, sentences, paragraphs, lines, and bytes. It also estimates reading time (based on 225 words per minute) and speaking time (based on 130 words per minute), making it useful for writers, students, and content creators.',
};

export default function TextCounterPage() {
  const [input, setInput] = useState('');

  const stats = useMemo(() => countStats(input), [input]);

  const statCards = [
    { label: ui.characters, value: stats.characters.toLocaleString(), color: '#3b82f6' },
    { label: ui.charactersNoSpaces, value: stats.charactersNoSpaces.toLocaleString(), color: '#6366f1' },
    { label: ui.words, value: stats.words.toLocaleString(), color: '#8b5cf6' },
    { label: ui.sentences, value: stats.sentences.toLocaleString(), color: '#a855f7' },
    { label: ui.paragraphs, value: stats.paragraphs.toLocaleString(), color: '#ec4899' },
    { label: ui.lines, value: stats.lines.toLocaleString(), color: '#f43f5e' },
    { label: ui.bytes, value: stats.bytes.toLocaleString(), color: '#f97316' },
    { label: ui.readingTime, value: stats.readingTimeMin > 0 ? `${stats.readingTimeMin} ${ui.minutes}` : ui.lessThan1, color: '#14b8a6' },
    { label: ui.speakingTime, value: stats.speakingTimeMin > 0 ? `${stats.speakingTimeMin} ${ui.minutes}` : ui.lessThan1, color: '#22c55e' },
  ];

  return (
    <ToolLayout
      title={ui.pageTitle}
      description={ui.pageDescription}
      toolId="text-counter"
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{ui.inputLabel}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={ui.inputPlaceholder}
          style={{ minHeight: 160 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={() => setInput('')} className="btn btn-secondary">{ui.clear}</button>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        {statCards.map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'var(--bg-input)',
            borderRadius: 10,
            padding: '16px 18px',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1.2, marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Character Frequency */}
      {stats.topChars.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{ui.charFrequency}</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '6px 12px', textAlign: 'left' }}>{ui.character}</th>
                  <th style={{ padding: '6px 12px', textAlign: 'left' }}>{ui.count}</th>
                  <th style={{ padding: '6px 12px', textAlign: 'left' }}>{ui.percentage}</th>
                  <th style={{ padding: '6px 12px', textAlign: 'left' }}></th>
                </tr>
              </thead>
              <tbody>
                {stats.topChars.map(([ch, cnt]) => {
                  const pct = stats.charactersNoSpaces > 0 ? ((cnt / stats.charactersNoSpaces) * 100).toFixed(1) : '0';
                  const barWidth = stats.topChars.length > 0 ? (cnt / stats.topChars[0][1]) * 100 : 0;
                  return (
                    <tr key={ch} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontWeight: 700 }}>{ch.toUpperCase()}</td>
                      <td style={{ padding: '6px 12px' }}>{cnt}</td>
                      <td style={{ padding: '6px 12px' }}>{pct}%</td>
                      <td style={{ padding: '6px 12px', width: '40%' }}>
                        <div style={{ background: 'var(--border-color)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                          <div style={{ background: 'var(--accent-blue)', height: '100%', width: `${barWidth}%`, borderRadius: 4 }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{ui.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{ui.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
