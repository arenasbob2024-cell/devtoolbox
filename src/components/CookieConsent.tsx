'use client';

import { useSyncExternalStore } from 'react';
import type { Locale } from '@/i18n/config';

/**
 * Lightweight cookie notice.
 * --------------------------------------------------
 * Shows a one-time informational banner at the bottom of the page until the
 * user dismisses it. Crucially, this notice does NOT block the Adsterra
 * invoke.js script — Adsterra handles EU GDPR personalization on its server
 * side automatically. Our banner is here purely so the user knows cookies are
 * in use and where to read more.
 *
 * Once dismissed (close button), the banner stays hidden across visits via
 * localStorage. The "consent" hook is kept for forward-compatibility with any
 * cookie-gated third-party scripts we may add in the future.
 */

const STORAGE_KEY = 'cookie-consent';
export const CONSENT_EVENT = 'cookie-consent-changed';

export type ConsentValue = 'accepted' | 'rejected' | 'dismissed';

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'accepted' || v === 'rejected' || v === 'dismissed' ? v : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

/** Hook for components that want to react to consent changes. */
export function useConsent(): ConsentValue | null {
  return useSyncExternalStore(subscribe, getConsent, () => null);
}

const t: Partial<Record<Locale, { msg: string; ok: string; privacy: string }>> = {
  en: { msg: 'This site uses cookies for analytics and to display ads. By continuing to browse, you agree.', ok: 'Got it', privacy: 'Privacy Policy' },
  zh: { msg: '本站使用 Cookie 进行流量分析与广告展示。继续浏览即视为同意。', ok: '我知道了', privacy: '隐私政策' },
  ru: { msg: 'Этот сайт использует cookie для аналитики и показа рекламы. Продолжая просмотр, вы соглашаетесь.', ok: 'Понятно', privacy: 'Политика конфиденциальности' },
};

export default function CookieConsent({ lang }: { lang: Locale }) {
  const consent = useConsent();

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'dismissed');
    } catch {
      // ignore (private mode etc.)
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: 'dismissed' }));
  };

  if (consent !== null) return null;
  const s = t[lang] ?? t.en;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9999,
        maxWidth: 720,
        margin: '0 auto',
        background: 'rgba(15, 15, 22, 0.97)',
        color: '#e5e7eb',
        border: '1px solid #2a2a35',
        borderRadius: 12,
        padding: '12px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, flex: 1 }}>
        {s.msg}{' '}
        <a
          href={`/${lang}/privacy`}
          style={{ color: '#7dd3fc', textDecoration: 'underline' }}
        >
          {s.privacy}
        </a>
      </p>
      <button
        type="button"
        onClick={dismiss}
        style={{
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '6px 14px',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {s.ok}
      </button>
    </div>
  );
}
