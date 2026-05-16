'use client';

import { useEffect, useRef, useState } from 'react';
import { COPY_SUCCESS_EVENT } from './CopyButton';
import { useConsent } from './CookieConsent';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import type { Locale } from '@/i18n/config';

const COPY_COUNT_KEY = 'devtoolbox-copy-success-count';
const DISMISSED_AT_KEY = 'devtoolbox-copy-success-nudge-dismissed-at';
const COPY_THRESHOLD = 3;
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000;
const PLACEMENT = 'copy-success-nudge';

const copy: Record<Locale, {
  eyebrow: string;
  title: string;
  body: string;
  support: string;
  sponsor: string;
  dismiss: string;
}> = {
  en: {
    eyebrow: 'Free tool saved',
    title: 'This helped? Support DevToolBox',
    body: 'You have copied results a few times. A small contribution keeps these tools fast and ad-light.',
    support: 'Support free tools',
    sponsor: 'Advertise instead',
    dismiss: 'Not now',
  },
  zh: {
    eyebrow: '工具结果已保存',
    title: '这个工具有用吗？支持 DevToolBox',
    body: '你已经多次复制工具结果。一次小额支持可以帮助这些工具持续免费、快速且少广告。',
    support: '支持免费工具',
    sponsor: '广告合作',
    dismiss: '暂不',
  },
  ru: {
    eyebrow: 'Result copied',
    title: 'Helpful? Support DevToolBox',
    body: 'You have copied results a few times. A small contribution keeps these tools fast and ad-light.',
    support: 'Support free tools',
    sponsor: 'Advertise',
    dismiss: 'Not now',
  },
};

function getStoredCopyCount() {
  try {
    const value = window.sessionStorage.getItem(COPY_COUNT_KEY);
    return value ? Number.parseInt(value, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function setStoredCopyCount(count: number) {
  try {
    window.sessionStorage.setItem(COPY_COUNT_KEY, String(count));
  } catch {
    // Ignore private browsing/storage errors.
  }
}

function wasDismissedRecently() {
  try {
    const value = window.localStorage.getItem(DISMISSED_AT_KEY);
    const dismissedAt = value ? Number.parseInt(value, 10) : 0;
    return dismissedAt > 0 && Date.now() - dismissedAt < DISMISS_TTL_MS;
  } catch {
    return false;
  }
}

function storeDismissal() {
  try {
    window.localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
  } catch {
    // Ignore private browsing/storage errors.
  }
}

export default function CopySuccessNudge() {
  const { lang } = useLang();
  const consent = useConsent();
  const impressionTracked = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onCopySuccess = () => {
      if (wasDismissedRecently()) return;

      const nextCount = getStoredCopyCount() + 1;
      setStoredCopyCount(nextCount);

      if (nextCount >= COPY_THRESHOLD) {
        setVisible(true);
      }
    };

    window.addEventListener(COPY_SUCCESS_EVENT, onCopySuccess);
    return () => window.removeEventListener(COPY_SUCCESS_EVENT, onCopySuccess);
  }, []);

  useEffect(() => {
    if (!visible || consent === null || impressionTracked.current) return;

    impressionTracked.current = true;
    trackMonetizationImpression({
      type: 'support',
      id: PLACEMENT,
      category: 'tool-usage',
      placement: PLACEMENT,
    });
  }, [consent, visible]);

  if (!visible || consent === null) return null;

  const text = copy[lang] || copy.en;
  const supportHref = process.env.NEXT_PUBLIC_SUPPORT_URL || 'https://buymeacoffee.com/devtoolbox';
  const sponsorHref = `/${lang}/advertise/?source=${encodeURIComponent(PLACEMENT)}&category=tool-usage`;

  const dismiss = () => {
    storeDismissal();
    setVisible(false);
  };

  return (
    <aside
      role="region"
      aria-label={text.title}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 88,
        zIndex: 9997,
        width: 'min(340px, calc(100vw - 32px))',
        background: 'rgba(15, 15, 22, 0.98)',
        color: '#e5e7eb',
        border: '1px solid #2a2a35',
        borderRadius: 8,
        boxShadow: '0 12px 36px rgba(0,0,0,0.46)',
        padding: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase' }}>
            {text.eyebrow}
          </p>
          <h2 style={{ margin: 0, fontSize: 17, lineHeight: 1.25, fontWeight: 800 }}>
            {text.title}
          </h2>
        </div>
        <button
          type="button"
          aria-label={text.dismiss}
          onClick={dismiss}
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            border: '1px solid #374151',
            background: 'rgba(255,255,255,0.04)',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontSize: 18,
            lineHeight: '24px',
            flexShrink: 0,
          }}
        >
          x
        </button>
      </div>
      <p style={{ margin: '10px 0 14px', fontSize: 13, lineHeight: 1.55, color: '#cbd5e1' }}>
        {text.body}
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a
          href={supportHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackMonetizationClick({
              type: 'support',
              id: 'buy-me-a-coffee',
              category: 'tool-usage',
              placement: PLACEMENT,
            });
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 36,
            padding: '8px 12px',
            borderRadius: 7,
            background: '#3b82f6',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {text.support}
        </a>
        <a
          href={sponsorHref}
          onClick={() => {
            trackMonetizationClick({
              type: 'sponsor',
              id: 'copy-success-sponsor',
              category: 'tool-usage',
              placement: PLACEMENT,
            });
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 36,
            padding: '8px 12px',
            borderRadius: 7,
            border: '1px solid #374151',
            color: '#dbeafe',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {text.sponsor}
        </a>
      </div>
    </aside>
  );
}
