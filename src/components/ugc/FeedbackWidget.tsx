'use client';

import { useState } from 'react';
import { getUGCStrings } from './ugcStrings';

interface FeedbackWidgetProps {
  toolId: string;
  lang: string;
}

export default function FeedbackWidget({ toolId, lang }: FeedbackWidgetProps) {
  const t = getUGCStrings(lang);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    try {
      const key = `dtb_ugc_feedback_${toolId}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({ text: text.trim(), ts: Date.now() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {}
    setText('');
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setOpen(false); }, 3000);
  };

  return (
    <div style={{
      marginTop: 8,
      marginBottom: 16,
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      padding: '12px 16px',
    }}>
      {submitted ? (
        <p style={{ fontSize: 14, color: '#10b981', textAlign: 'center', margin: 0 }}>
          {t.thankYou}
        </p>
      ) : !open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 13,
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}
        >
          💬 {t.feedback}
        </button>
      ) : (
        <div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t.feedbackPlaceholder}
            rows={3}
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: 13,
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: 8,
              padding: '6px 16px',
              borderRadius: 6,
              border: 'none',
              background: 'var(--accent-blue)',
              color: '#fff',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {t.submit}
          </button>
        </div>
      )}
    </div>
  );
}
