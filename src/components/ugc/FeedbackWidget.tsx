'use client';

import { useState } from 'react';
import { getUgcStrings } from './ugcStrings';

interface FeedbackWidgetProps {
  toolId: string;
  lang: string;
}

export default function FeedbackWidget({ toolId, lang }: FeedbackWidgetProps) {
  const t = getUgcStrings(lang).feedback;
  const [state, setState] = useState<'collapsed' | 'expanded' | 'submitted'>('collapsed');
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    try {
      const key = `dtb_ugc_feedback_${toolId}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({ text: text.trim(), ts: Date.now() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {}
    setText('');
    setState('submitted');
    setTimeout(() => setState('collapsed'), 3000);
  };

  if (state === 'submitted') {
    return (
      <div style={{
        marginTop: 16,
        padding: '14px 20px',
        background: 'rgba(16,185,129,0.08)',
        border: '1px solid var(--accent-emerald)',
        borderRadius: 10,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-emerald)', margin: 0 }}>
          {t.thankYou}
        </p>
      </div>
    );
  }

  if (state === 'collapsed') {
    return (
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <button
          onClick={() => setState('expanded')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 20px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {t.expand}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
    }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>
        {t.prompt}
      </p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={t.placeholder}
        rows={3}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: 14,
          borderRadius: 8,
          border: '1px solid var(--border-color)',
          background: 'var(--bg-input)',
          color: 'var(--text-primary)',
          resize: 'vertical',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
        <button
          onClick={() => { setState('collapsed'); setText(''); }}
          style={{
            padding: '7px 16px',
            borderRadius: 6,
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          ✕
        </button>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          style={{
            padding: '7px 20px',
            borderRadius: 6,
            border: 'none',
            background: text.trim() ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'var(--border-color)',
            color: '#fff',
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {t.submit}
        </button>
      </div>
    </div>
  );
}
