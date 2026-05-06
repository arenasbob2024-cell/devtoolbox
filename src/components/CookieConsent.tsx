'use client';

import { useSyncExternalStore } from 'react';
import type { Locale } from '@/i18n/config';

const STORAGE_KEY = 'cookie-consent';
export const CONSENT_EVENT = 'cookie-consent-changed';

export type ConsentValue = 'accepted' | 'rejected';

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'accepted' || v === 'rejected' ? v : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

/** Hook other components can use to read the current consent state. */
export function useConsent(): ConsentValue | null {
  return useSyncExternalStore(subscribe, getConsent, () => null);
}

const t: Record<Locale, { msg: string; accept: string; reject: string; privacy: string }> = {
  en: { msg: 'We use cookies to display ads and analyze traffic. You can choose what to allow.', accept: 'Accept', reject: 'Reject', privacy: 'Privacy Policy' },
  zh: { msg: '我们使用 Cookie 展示广告并分析流量。您可以自行选择是否允许。', accept: '接受', reject: '拒绝', privacy: '隐私政策' },
  ru: { msg: 'Мы используем файлы cookie для показа рекламы и анализа трафика. Вы можете выбрать, что разрешить.', accept: 'Принять', reject: 'Отклонить', privacy: 'Политика конфиденциальности' },
};

export default function CookieConsent({ lang }: { lang: Locale }) {
  const consent = useConsent();

  const choose = (v: ConsentValue) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {
      // ignore (private mode etc.)
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
  };

  if (consent !== null) return null;
  const s = t[lang] ?? t.en;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(15, 15, 22, 0.97)',
        color: '#e5e7eb',
        borderTop: '1px solid #2a2a35',
        padding: '14px 16px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, flex: '1 1 320px' }}>
          {s.msg}{' '}
          <a
            href={`/${lang}/privacy`}
            style={{ color: '#7dd3fc', textDecoration: 'underline' }}
          >
            {s.privacy}
          </a>
        </p>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => choose('rejected')}
            style={{
              background: 'transparent',
              color: '#e5e7eb',
              border: '1px solid #4b5563',
              borderRadius: 6,
              padding: '8px 16px',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {s.reject}
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            style={{
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {s.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
