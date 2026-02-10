'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdSlot from './AdSlot';
import { tools } from '@/lib/tools';
import { useLang } from '@/i18n/LangContext';
import NewsletterSignup from './NewsletterSignup';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  toolId: string;
}

export default function ToolLayout({ title, description, children, toolId }: ToolLayoutProps) {
  const { lang, dict } = useLang();
  const t = dict.tools;
  const currentTool = tools.find(t => t.id === toolId);
  const relatedTools = currentTool?.relatedTools
    ? currentTool.relatedTools.map(id => tools.find(t => t.id === id)).filter((t): t is NonNullable<typeof t> => t != null).slice(0, 4)
    : tools.filter(t => t.id !== toolId).slice(0, 4);
  const toolUrl = `https://viadreams.cc/${lang}/tools/${toolId}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.common.home, item: `https://viadreams.cc/${lang}` },
      { '@type': 'ListItem', position: 2, name: title, item: toolUrl },
    ],
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description,
    url: toolUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    softwareVersion: '1.0',
    inLanguage: lang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: 'DevToolBox', url: 'https://viadreams.cc' },
    keywords: currentTool?.keywords.join(', ') || '',
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link href={`/${lang}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>{dict.common.home}</Link>
        <span>/</span>
        <span>{title}</span>
      </nav>

      {/* Top Ad */}
      <AdSlot size="leaderboard" />

      {/* Title */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          marginBottom: 8,
          background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>{title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{description}</p>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="card">
            {children}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <AdSlot size="rectangle" />

          {/* Related Tools */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>
              {dict.common.moreTools}
            </h3>
            {relatedTools.map(tool => {
              const toolDict = t[tool.id as keyof typeof t];
              return (
                <Link
                  key={tool.id}
                  href={`/${lang}${tool.path}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 0',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 14, width: 30, textAlign: 'center' }}>{tool.icon}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{toolDict?.name || tool.name}</span>
                </Link>
              );
            })}
          </div>

          <NewsletterSignup variant="compact" />
        </div>
      </div>

      {/* How to Use Section */}
      <HowToUseSection toolId={toolId} />

      {/* FAQ Section */}
      <FaqAccordion toolId={toolId} />

      {/* Bottom Ad */}
      <AdSlot size="leaderboard" style={{ marginTop: 30 }} />
    </div>
  );
}

function HowToUseSection({ toolId }: { toolId: string }) {
  const { lang, dict } = useLang();
  const toolDict = dict.tools[toolId as keyof typeof dict.tools] as Record<string, unknown> | undefined;
  if (!toolDict?.howToUseSteps || !toolDict?.useCases) return null;

  const steps = toolDict.howToUseSteps as string[];
  const useCases = toolDict.useCases as string[];
  const howToUseTitle = (toolDict.howToUseTitle as string) || 'How to Use';
  const useCasesTitle = (toolDict.useCasesTitle as string) || 'Use Cases';
  const toolName = (toolDict.name as string) || toolId;

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${toolName}`,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: s,
    })),
  };

  return (
    <div style={{ marginTop: 30 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{
          background: 'var(--bg-card)', borderRadius: 10, padding: 20,
          border: '1px solid var(--border-color)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{howToUseTitle}</h2>
          <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            {steps.map((step, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{step}</li>
            ))}
          </ol>
        </div>
        <div style={{
          background: 'var(--bg-card)', borderRadius: 10, padding: 20,
          border: '1px solid var(--border-color)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{useCasesTitle}</h2>
          <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            {useCases.map((uc, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{uc}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FaqAccordion({ toolId }: { toolId: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { dict } = useLang();
  const toolDict = dict.tools[toolId as keyof typeof dict.tools] as Record<string, unknown> | undefined;
  if (!toolDict?.faqs) return null;

  const faqs = toolDict.faqs as { q: string; a: string }[];
  const faqTitle = (toolDict.faqTitle as string) || 'FAQ';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div style={{ marginTop: 30 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>{faqTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{
            border: '1px solid var(--border-color)', borderRadius: 8,
            overflow: 'hidden', background: 'var(--bg-input)',
          }}>
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              style={{
                width: '100%', padding: '14px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left',
              }}
            >
              <span>{faq.q}</span>
              <span style={{
                fontSize: 18, transform: openIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s', color: 'var(--accent-blue)', flexShrink: 0, marginLeft: 12,
              }}>+</span>
            </button>
            {openIndex === idx && (
              <div style={{
                padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)',
              }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
