'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FaqSectionProps {
  title: string;
  faqs: FaqItem[];
  toolId: string;
  lang: string;
}

export default function FaqSection({ title, faqs, toolId, lang }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string' ? faq.answer : 'See answer for details',
      },
    })),
  };

  return (
    <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
      {/* FAQPage JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              overflow: 'hidden',
              background: 'var(--bg-input)',
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              style={{
                width: '100%',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-primary)',
                textAlign: 'left',
              }}
            >
              <span>{faq.question}</span>
              <span style={{
                fontSize: 18,
                transform: openIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                color: 'var(--accent-blue)',
                flexShrink: 0,
                marginLeft: 12,
              }}>+</span>
            </button>
            {openIndex === idx && (
              <div style={{
                padding: '0 16px 14px',
                fontSize: 13,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
