import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools, categories } from '@/lib/tools';
import { getDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';
import SponsorCta from '@/components/SponsorCta';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function ToolsIndexPage({ params }: PageProps) {
  const { lang } = await params;

  if (!i18n.locales.includes(lang as Locale)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);
  const t = dict.tools;
  const c = dict.categories;

  // Group tools by category
  const toolsByCategory = categories.map((cat) => ({
    ...cat,
    localizedName: (c as Record<string, string>)[cat.id] || cat.name,
    tools: tools.filter((tool) => tool.category === cat.id),
  })).filter((cat) => cat.tools.length > 0);

  const pageTitle = dict.meta?.toolsIndexTitle || 'All Developer Tools';
  const pageDescription = dict.meta?.toolsIndexDescription ||
    'Browse all free online developer tools. JSON formatter, Base64 encoder, hash generator, CSS tools, and more.';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDescription,
    url: `https://viadreams.cc/${lang}/tools`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: (t as Record<string, { name?: string }>)[tool.id]?.name || tool.name,
        url: `https://viadreams.cc/${lang}${tool.path}`,
      })),
    },
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Header */}
      <section style={{ textAlign: 'center', padding: '50px 0 30px' }}>
        <h1 style={{
          fontSize: 40,
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: 16,
        }}>
          <span className="gradient-text">{dict.common.allTools}</span>
        </h1>
        <p style={{
          fontSize: 17,
          color: 'var(--text-secondary)',
          maxWidth: 600,
          margin: '0 auto 10px',
          lineHeight: 1.6,
        }}>
          {pageDescription}
        </p>
        <p style={{
          fontSize: 14,
          color: 'var(--text-secondary)',
          margin: '0 auto',
        }}>
          {tools.length} {dict.common.allTools?.toLowerCase().includes('tool') ? '' : 'tools'}
        </p>
      </section>

      <SponsorCta placement="tools-index-sponsor" category="tools-index" id="tools-index-sponsor" />

      {/* Category Sections */}
      {toolsByCategory.map((cat) => (
        <section key={cat.id} style={{ marginBottom: 48 }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span>{cat.icon}</span>
            <span>{cat.localizedName}</span>
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginLeft: 4,
            }}>
              ({cat.tools.length})
            </span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {cat.tools.map((tool) => {
              const toolDict = (t as Record<string, { name?: string; description?: string }>)[tool.id];
              return (
                <Link
                  key={tool.id}
                  href={`/${lang}${tool.path}`}
                  className="tool-card"
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      fontWeight: 800,
                      fontFamily: 'monospace',
                      flexShrink: 0,
                      color: 'var(--accent-blue)',
                    }}>
                      {tool.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
                        {toolDict?.name || tool.name}
                      </h3>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {toolDict?.description || tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
