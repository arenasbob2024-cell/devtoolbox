'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const { dict, lang } = useLang();
  const t = dict.tools['uuid-generator'];
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => {
      let uuid = generateUUID();
      if (noDashes) uuid = uuid.replace(/-/g, '');
      if (uppercase) uuid = uuid.toUpperCase();
      return uuid;
    });
    setUuids(newUuids);
  };

  const allText = uuids.join('\n');

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="uuid-generator"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateUuids}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.count}:</label>
          <input
            type="number"
            value={count}
            onChange={e => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{ width: 60, padding: '6px 10px', fontSize: 13 }}
            min={1}
            max={100}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
          {t.uppercase}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={noDashes} onChange={e => setNoDashes(e.target.checked)} />
          {t.noDashes}
        </label>
        {uuids.length > 0 && <CopyButton text={allText} label={dict.common.copyAll} />}
      </div>

      {uuids.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {uuids.map((uuid, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-input)',
              borderRadius: 6,
              padding: '8px 14px',
              border: '1px solid var(--border-color)',
            }}>
              <code style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{uuid}</code>
              <CopyButton text={uuid} label={dict.common.copy} />
            </div>
          ))}
        </div>
      )}

      {uuids.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          <p>{t.emptyState}</p>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>What are UUID versions and which should I use?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>UUID v4 is random and the most commonly used for general purposes (like database IDs). UUID v7 is time-based and sortable, making it better for databases that benefit from ordering. This tool generates v4 by default. For distributed systems, v7 provides better performance because it's sortable by timestamp.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>What's the probability of UUID collision?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>For UUID v4 (128-bit random), the collision probability is astronomically low—you'd need to generate 5.3 × 10^36 UUIDs to have a 50% chance of one collision. In practical terms, you'll never encounter collisions for any real-world application.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>UUID vs Auto-Increment: which is better?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>Auto-increment is smaller and faster for single-database systems. UUIDs are better for distributed systems, microservices, and when you need unique IDs across multiple databases or servers. UUIDs don't leak information about data growth or insertion patterns.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>What is ULID and how does it compare to UUID?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>ULID (Universally Unique Lexicographically Sortable Identifier) is similar to UUID v7 but more compact (128 bits) and uses a different encoding. Like UUID v7, it's sortable by timestamp, making it ideal for databases. See <a href={`/${lang}/tools/timestamp-converter`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Timestamp Converter</a> for time-based ID generation.</div>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What are UUID versions and which should I use?", "acceptedAnswer": { "@type": "Answer", "text": "UUID v4 is random and most commonly used. UUID v7 is time-based and sortable, better for databases. This tool generates v4 by default, but v7 provides better performance for ordered data." } },
            { "@type": "Question", "name": "What's the probability of UUID collision?", "acceptedAnswer": { "@type": "Answer", "text": "For UUID v4 (128-bit random), collision probability is astronomically low. You'd need 5.3 × 10^36 UUIDs for a 50% chance of collision. Collisions never occur in real-world applications." } },
            { "@type": "Question", "name": "UUID vs Auto-Increment: which is better?", "acceptedAnswer": { "@type": "Answer", "text": "Auto-increment is smaller and faster for single databases. UUIDs are better for distributed systems, microservices, and don't leak information about data patterns." } },
            { "@type": "Question", "name": "What is ULID and how does it compare to UUID?", "acceptedAnswer": { "@type": "Answer", "text": "ULID is similar to UUID v7 but more compact and uses different encoding. Like UUID v7, it's sortable by timestamp, ideal for databases." } }
          ]
        }) }} />
      </div>
    </ToolLayout>
  );
}
