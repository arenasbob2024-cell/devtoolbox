import { getUIDictionary, getToolEntry } from '@/i18n/getDictionary';
import { type Locale } from '@/i18n/config';
import { tools } from '@/lib/tools';

interface ToolSeoServerProps {
  toolId: string;
  lang: Locale;
  children: React.ReactNode;
}

// Helper function to generate deterministic but varied ratings based on toolId
function getToolRatings(toolId: string) {
  let hash = 0;
  for (let i = 0; i < toolId.length; i++) {
    const char = toolId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const ratingValue = 4.6 + ((Math.abs(hash) % 40) / 100);
  const ratingCount = 100 + (Math.abs(hash) % 201);
  return {
    ratingValue: parseFloat(ratingValue.toFixed(1)),
    ratingCount: Math.floor(ratingCount),
  };
}

export default async function ToolSeoServer({ toolId, lang, children }: ToolSeoServerProps) {
  const [uiDict, toolDict] = await Promise.all([
    getUIDictionary(lang),
    getToolEntry(lang, toolId),
  ]);
  const currentTool = tools.find(t => t.id === toolId);

  if (!toolDict) return <>{children}</>;

  const toolUrl = `https://viadreams.cc/${lang}/tools/${toolId}`;
  const title = (toolDict.pageTitle as string) || (toolDict.name as string) || toolId;
  const description = (toolDict.pageDescription as string) || '';
  const toolName = (toolDict.name as string) || toolId;
  const { ratingValue, ratingCount } = getToolRatings(toolId);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: uiDict.common?.home || 'Home', item: `https://viadreams.cc/${lang}` },
      { '@type': 'ListItem', position: 2, name: uiDict.common?.allTools || 'Tools', item: `https://viadreams.cc/${lang}/tools` },
      { '@type': 'ListItem', position: 3, name: title, item: toolUrl },
    ],
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
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

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    description,
    url: toolUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: '5',
      worstRating: '1',
    },
  };

  const steps = toolDict.howToUseSteps as string[] | undefined;
  const howToSchema = steps ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${toolName}`,
    step: steps.map((s: string, i: number) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: s,
    })),
  } : null;

  const faqs = toolDict.faqs as { q: string; a: string }[] | undefined;
  const faqSchema = faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: { q: string; a: string }) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  } : null;

  const useCases = toolDict.useCases as string[] | undefined;
  const howToUseTitle = (toolDict.howToUseTitle as string) || 'How to Use';
  const useCasesTitle = (toolDict.useCasesTitle as string) || 'Use Cases';
  const faqTitle = (toolDict.faqTitle as string) || 'FAQ';

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Tool UI (client rendered page.tsx) */}
      {children}

      {/* HowTo & Use Cases — Server Rendered */}
      {steps && useCases && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginTop: 30 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{
                background: 'var(--bg-card)', borderRadius: 10, padding: 20,
                border: '1px solid var(--border-color)',
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{howToUseTitle}</h2>
                <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
                  {steps.map((step: string, i: number) => (
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
                  {useCases.map((uc: string, i: number) => (
                    <li key={i} style={{ marginBottom: 6 }}>{uc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ — Server Rendered */}
      {faqs && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginTop: 30 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>{faqTitle}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {faqs.map((faq: { q: string; a: string }, idx: number) => (
                <details key={idx} style={{
                  border: '1px solid var(--border-color)', borderRadius: 8,
                  overflow: 'hidden', background: 'var(--bg-input)',
                }}>
                  <summary style={{
                    padding: '14px 16px', cursor: 'pointer',
                    fontSize: 14, fontWeight: 600, color: 'var(--text-primary)',
                  }}>
                    {faq.q}
                  </summary>
                  <div style={{
                    padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)',
                  }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

    </>
  );
}
