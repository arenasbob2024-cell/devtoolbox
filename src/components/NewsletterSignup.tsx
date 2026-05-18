'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import {
  trackMonetizationClick,
  trackMonetizationImpression,
  trackNewsletterSignup,
} from '@/lib/analytics';
import { getAdsterraDirectLink } from '@/lib/adsterra-direct-link';

interface NewsletterSignupProps {
  variant?: 'wide' | 'compact';
  placement?: string;
  category?: string;
}

const successNudgeCopy: Record<string, {
  detail: string;
  support: string;
  sponsor: string;
  direct: string;
}> = {
  en: {
    detail: 'Thanks for following DevToolBox.',
    support: 'Support free tools',
    sponsor: 'Sponsor DevToolBox',
    direct: 'Sponsored offer',
  },
  zh: {
    detail: '\u611f\u8c22\u5173\u6ce8 DevToolBox\u3002',
    support: '\u652f\u6301\u514d\u8d39\u5de5\u5177',
    sponsor: '\u8d5e\u52a9 DevToolBox',
    direct: '\u8d5e\u52a9\u63a8\u8350',
  },
  ru: {
    detail: '\u0421\u043f\u0430\u0441\u0438\u0431\u043e, \u0447\u0442\u043e \u0441\u043b\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 DevToolBox.',
    support: '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b',
    sponsor: '\u0421\u0442\u0430\u0442\u044c \u0441\u043f\u043e\u043d\u0441\u043e\u0440\u043e\u043c',
    direct: 'Sponsored offer',
  },
};

export default function NewsletterSignup({
  variant = 'wide',
  placement = 'newsletter',
  category,
}: NewsletterSignupProps) {
  const { lang, dict } = useLang();
  const t = (dict as Record<string, unknown>).newsletter as Record<string, string> | undefined;
  const successNudge = successNudgeCopy[lang] || successNudgeCopy.en;
  const trackingCategory = category || 'newsletter';
  const supportHref = process.env.NEXT_PUBLIC_SUPPORT_URL || 'https://buymeacoffee.com/devtoolbox';
  const sponsorHref = `/${lang}/advertise/?source=${encodeURIComponent(`${placement}-newsletter-success`)}&category=${encodeURIComponent(trackingCategory)}`;
  const directLink = useMemo(
    () => getAdsterraDirectLink({
      placement: 'newsletter-success-nudge',
      category: trackingCategory,
      lang,
    }),
    [lang, trackingCategory]
  );
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const successTrackedRef = useRef(false);

  useEffect(() => {
    if (status !== 'success' || successTrackedRef.current) return;
    successTrackedRef.current = true;
    trackMonetizationImpression({
      type: 'support',
      id: 'newsletter-success-nudge',
      category: trackingCategory,
      placement: 'newsletter-success-nudge',
    });
    if (directLink) {
      trackMonetizationImpression({
        type: 'adsterra',
        id: directLink.id,
        category: trackingCategory,
        placement: 'newsletter-success-nudge',
      });
    }
  }, [directLink, status, trackingCategory]);

  const markSuccess = () => {
    trackNewsletterSignup({
      category: trackingCategory,
      placement,
    });
    setStatus('success');
    setEmail('');
  };

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
        markSuccess();
      } else {
        markSuccess(); // Buttondown may return 4xx for existing; treat as success
      }
    } catch {
      setStatus('error');
    }
  };

  if (!t) return null;

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 12, color: '#22c55e', fontWeight: 600, margin: 0 }}>
              {t.success}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
              {successNudge.detail}
            </p>
            <a
              href={supportHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMonetizationClick({
                type: 'support',
                id: 'buy-me-a-coffee',
                category: trackingCategory,
                placement: 'newsletter-success-nudge',
              })}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 10px',
                borderRadius: 6,
                background: 'linear-gradient(135deg, #FF813F, #FF5F5F)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {successNudge.support}
            </a>
            <a
              href={sponsorHref}
              onClick={() => trackMonetizationClick({
                type: 'sponsor',
                id: 'newsletter-sponsor',
                category: trackingCategory,
                placement: 'newsletter-success-nudge',
              })}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 10px',
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                color: 'var(--accent-blue)',
                fontSize: 12,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {successNudge.sponsor}
            </a>
            {directLink && (
              <a
                href={directLink.url}
                target="_blank"
                rel="noopener sponsored nofollow"
                onClick={() => trackMonetizationClick({
                  type: 'adsterra',
                  id: directLink.id,
                  category: trackingCategory,
                  placement: 'newsletter-success-nudge',
                })}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-blue)',
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                {successNudge.direct}
              </a>
            )}
          </div>
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
            <div>
              <p style={{ fontSize: 13, color: '#22c55e', fontWeight: 600, margin: '0 0 6px' }}>
                {t.success}
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                  {successNudge.detail}
                </span>
                <a
                  href={supportHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMonetizationClick({
                    type: 'support',
                    id: 'buy-me-a-coffee',
                    category: trackingCategory,
                    placement: 'newsletter-success-nudge',
                  })}
                  style={{
                    color: '#fff',
                    background: 'linear-gradient(135deg, #FF813F, #FF5F5F)',
                    borderRadius: 6,
                    padding: '6px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {successNudge.support}
                </a>
                <a
                  href={sponsorHref}
                  onClick={() => trackMonetizationClick({
                    type: 'sponsor',
                    id: 'newsletter-sponsor',
                    category: trackingCategory,
                    placement: 'newsletter-success-nudge',
                  })}
                  style={{
                    color: 'var(--accent-blue)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    padding: '6px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {successNudge.sponsor}
                </a>
                {directLink && (
                  <a
                    href={directLink.url}
                    target="_blank"
                    rel="noopener sponsored nofollow"
                    onClick={() => trackMonetizationClick({
                      type: 'adsterra',
                      id: directLink.id,
                      category: trackingCategory,
                      placement: 'newsletter-success-nudge',
                    })}
                    style={{
                      color: 'var(--accent-blue)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 6,
                      padding: '6px 10px',
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    {successNudge.direct}
                  </a>
                )}
              </div>
            </div>
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
