'use client';

import { useLang } from '@/i18n/LangContext';

export default function Privacy() {
  const { dict } = useLang();
  const p = dict.privacy;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20 }}>{p.title}</h1>
      <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}>{p.intro}</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{p.dataTitle}</h2>
        <p style={{ marginBottom: 16 }}>{p.dataText}</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{p.cookiesTitle}</h2>
        <p style={{ marginBottom: 16 }}>{p.cookiesText}</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{p.adsTitle}</h2>
        <p style={{ marginBottom: 16 }}>{p.adsText}</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{p.thirdPartyTitle}</h2>
        <p style={{ marginBottom: 16 }}>{p.thirdPartyText}</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          <li style={{ marginBottom: 8 }}>{p.thirdParty1}</li>
          <li style={{ marginBottom: 8 }}>{p.thirdParty2}</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{p.changesTitle}</h2>
        <p style={{ marginBottom: 16 }}>{p.changesText}</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{p.contactTitle}</h2>
        <p>{p.contactText}</p>
      </div>
    </div>
  );
}
