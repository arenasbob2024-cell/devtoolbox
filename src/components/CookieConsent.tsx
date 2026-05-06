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
  fr: { msg: 'Nous utilisons des cookies pour afficher des publicités et analyser le trafic.', accept: 'Accepter', reject: 'Refuser', privacy: 'Politique de confidentialité' },
  de: { msg: 'Wir verwenden Cookies, um Anzeigen anzuzeigen und den Datenverkehr zu analysieren.', accept: 'Akzeptieren', reject: 'Ablehnen', privacy: 'Datenschutzerklärung' },
  it: { msg: 'Utilizziamo i cookie per mostrare annunci e analizzare il traffico.', accept: 'Accetta', reject: 'Rifiuta', privacy: 'Privacy Policy' },
  es: { msg: 'Usamos cookies para mostrar anuncios y analizar el tráfico.', accept: 'Aceptar', reject: 'Rechazar', privacy: 'Política de privacidad' },
  pt: { msg: 'Usamos cookies para exibir anúncios e analisar o tráfego.', accept: 'Aceitar', reject: 'Recusar', privacy: 'Política de privacidade' },
  zh: { msg: '我们使用 Cookie 展示广告并分析流量。您可以自行选择是否允许。', accept: '接受', reject: '拒绝', privacy: '隐私政策' },
  ja: { msg: '広告の表示とトラフィック分析のためにCookieを使用します。', accept: '同意する', reject: '拒否', privacy: 'プライバシーポリシー' },
  ko: { msg: '광고 표시 및 트래픽 분석을 위해 쿠키를 사용합니다.', accept: '동의', reject: '거부', privacy: '개인정보 처리방침' },
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
