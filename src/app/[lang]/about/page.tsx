'use client';

import { useLang } from '@/i18n/LangContext';

export default function About() {
  const { dict } = useLang();
  const a = dict.about;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20 }}>{a.title}</h1>
      <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}>
          <strong style={{ color: 'var(--text-primary)' }}>DevToolBox</strong> {a.intro}
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{a.missionTitle}</h2>
        <p style={{ marginBottom: 16 }}>
          {a.missionText}
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{a.featuresTitle}</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          <li style={{ marginBottom: 8 }}>{a.feature1}</li>
          <li style={{ marginBottom: 8 }}>{a.feature2}</li>
          <li style={{ marginBottom: 8 }}>{a.feature3}</li>
          <li style={{ marginBottom: 8 }}>{a.feature4}</li>
          <li style={{ marginBottom: 8 }}>{a.feature5}</li>
        </ul>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>{a.contactTitle}</h2>
        <p>
          {a.contactText} <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>GitHub</a>.
        </p>
      </div>
    </div>
  );
}
