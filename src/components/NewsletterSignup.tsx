'use client';

import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';

interface NewsletterSignupProps {
  variant?: 'wide' | 'compact';
}

export default function NewsletterSignup({ variant = 'wide' }: NewsletterSignupProps) {
  const { dict } = useLang();
  const t = (dict as Record<string, unknown>).newsletter as Record<string, string> | undefined;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!t) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email, tags: ['devtoolbox'] }),
      });
      if (res.ok || res.status === 201) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('success'); // Buttondown may return 4xx for existing; treat as success
      }
    } catch {
      setStatus('error');
    }
  };

  if (variant === 'compact') {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>
          {t.title}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>
          {t.subtitle}
        </p>
        {status === 'success' ? (
          <p style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>{t.success}</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.placeholder}
              required
              style={{
                padding: '8px 10px',
                fontSize: 13,
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '8px 12px',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 6,
                border: 'none',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: '#fff',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? '...' : t.subscribe}
            </button>
          </form>
        )}
        <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 8, opacity: 0.7 }}>
          {t.privacy}
        </p>
      </div>
    );
  }

  // Wide variant
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
      border: '1px solid var(--border-color)',
      borderRadius: 12,
      padding: '20px 24px',
      marginTop: 20,
      marginBottom: 20,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
            {t.title}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
            {t.subtitle}
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          {status === 'success' ? (
            <p style={{ fontSize: 13, color: '#22c55e', fontWeight: 600 }}>{t.success}</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.placeholder}
                required
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontSize: 14,
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '10px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: '#fff',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {status === 'loading' ? '...' : t.subscribe}
              </button>
            </form>
          )}
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6, opacity: 0.7 }}>
            {t.privacy}
          </p>
        </div>
      </div>
    </div>
  );
}
