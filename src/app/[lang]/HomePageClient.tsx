'use client';

import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { tools, categories } from '@/lib/tools';
import { useLang } from '@/i18n/LangContext';
import SponsorCta from '@/components/SponsorCta';
import AdSlot from '@/components/AdSlot';
import MobileRectangleAd from '@/components/MobileRectangleAd';
import { trackToolSearchNoResults } from '@/lib/analytics';

// 8 most-loved developer tools — surfaced at the top of the homepage so
// users see actionable entry points within the first viewport (instead of
// hunting through the 88-tool grid). IDs verified against src/lib/tools.ts.
const POPULAR_TOOL_IDS = [
  'json-formatter',
  'base64',
  'url-encoder',
  'uuid-generator',
  'jwt-decoder',
  'hash-generator',
  'regex-tester',
  'timestamp-converter',
] as const;

export default function HomePageClient() {
  const { lang, dict } = useLang();
  const [search, setSearch] = useState('');
  const lastNoResultTrackedRef = useRef('');

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevToolBox',
    url: `https://viadreams.cc/${lang}/`,
    description: dict.meta.homeDescription,
    inLanguage: lang,
    publisher: {
      '@type': 'Organization',
      name: 'DevToolBox',
      url: 'https://viadreams.cc',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://viadreams.cc/${lang}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    url: `https://viadreams.cc/${lang}/`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: dict.tools[tool.id as keyof typeof dict.tools]?.name || tool.name,
        url: `https://viadreams.cc/${lang}${tool.path}/`,
      })),
    },
  };
  const [activeCategory, setActiveCategory] = useState('all');

  const normalizedSearch = search.trim().toLowerCase();
  const filteredTools = normalizedSearch
    ? tools.filter(t =>
        (dict.tools[t.id as keyof typeof dict.tools]?.name || t.name).toLowerCase().includes(normalizedSearch) ||
        t.keywords.some(k => k.toLowerCase().includes(normalizedSearch))
      )
    : activeCategory === 'all'
      ? tools
      : tools.filter(t => t.category === activeCategory);

  const t = dict.tools;
  const c = dict.categories;

  useEffect(() => {
    if (!normalizedSearch || filteredTools.length > 0) return;

    const trackingKey = `${lang}:${normalizedSearch}`;
    const timeout = window.setTimeout(() => {
      if (lastNoResultTrackedRef.current === trackingKey) return;
      lastNoResultTrackedRef.current = trackingKey;
      trackToolSearchNoResults({
        queryLength: normalizedSearch.length,
        language: lang,
        placement: 'home-search',
      });
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [filteredTools.length, lang, normalizedSearch]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '32px 0 20px' }}>
        <h1 style={{
          fontSize: 44,
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 14,
        }}>
          <span className="gradient-text">{dict.home.heroTitle1}</span>
          <br />
          {dict.home.heroTitle2}
        </h1>
        <p style={{
          fontSize: 18,
          color: 'var(--text-secondary)',
          maxWidth: 560,
          margin: '0 auto 30px',
          lineHeight: 1.6,
        }}>
          {dict.home.heroDescription}
        </p>

        {/* Search */}
        <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative' }}>
          <input
            type="text"
            placeholder={dict.home.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px 14px 46px',
              fontSize: 15,
              borderRadius: 12,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </section>

      <MobileRectangleAd
        placement="home-mobile-rectangle"
        category={activeCategory === 'all' ? 'home' : activeCategory}
      />

      {/* Popular Tools — surfaced at the top to drive immediate engagement */}
      {!search && activeCategory === 'all' && (
        <section style={{ marginBottom: 40 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 24 }}>🔥</span>
              <span className="gradient-text">{dict.home.popularTitle}</span>
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
              {dict.home.popularSubtitle}
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 14,
          }}>
            {POPULAR_TOOL_IDS.map((toolId, idx) => {
              const tool = tools.find(x => x.id === toolId);
              if (!tool) return null;
              const toolDict = t[tool.id as keyof typeof t];
              return (
                <Link
                  key={tool.id}
                  href={`/${lang}${tool.path}`}
                  className="tool-card"
                  style={{
                    position: 'relative',
                    borderColor: 'rgba(59,130,246,0.35)',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06))',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: 8,
                    right: 10,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'rgba(34,197,94,0.18)',
                    color: '#22c55e',
                    letterSpacing: 0.4,
                  }}>
                    #{idx + 1}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 17,
                      fontWeight: 800,
                      fontFamily: 'monospace',
                      flexShrink: 0,
                      color: 'var(--accent-blue)',
                    }}>
                      {tool.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
                        {toolDict?.name || tool.name}
                      </h3>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 8px' }}>
                        {toolDict?.description || tool.description}
                      </p>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--accent-blue)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                        {dict.home.tryNow} →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {!search && activeCategory === 'all' && (
        <AdSlot
          size="leaderboard"
          placement="home-inline"
          category="home"
          fallbackToSponsor
          style={{ marginTop: 0, marginBottom: 30 }}
        />
      )}

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 30,
      }}>
        <button
          onClick={() => { setActiveCategory('all'); setSearch(''); }}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            background: activeCategory === 'all' ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--bg-card)',
            color: activeCategory === 'all' ? 'white' : 'var(--text-secondary)',
            transition: 'all 0.2s',
          }}
        >
          {dict.common.allTools} ({tools.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setSearch(''); }}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              background: activeCategory === cat.id ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--bg-card)',
              color: activeCategory === cat.id ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {cat.icon} {c[cat.id as keyof typeof c] || cat.name}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
        marginTop: 20,
      }}>
        {filteredTools.map((tool, index) => {
          const toolDict = t[tool.id as keyof typeof t];
          return (
            <Fragment key={tool.id}>
              {index === 12 && !normalizedSearch && filteredTools.length > 18 && (
                <div key="home-tools-grid-ad" style={{ gridColumn: '1 / -1' }}>
                  <AdSlot
                    size="leaderboard"
                    placement="home-tools-grid"
                    category={activeCategory === 'all' ? 'home' : activeCategory}
                    fallbackToSponsor
                    style={{ marginTop: 4, marginBottom: 4 }}
                  />
                </div>
              )}
              <Link href={`/${lang}${tool.path}`} className="tool-card">
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
            </Fragment>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: 18 }}>{dict.common.noResults} &quot;{search}&quot;</p>
          <p style={{ fontSize: 14 }}>{dict.common.tryDifferent}</p>
          <SponsorCta
            placement="home-search-no-results"
            category="search-no-results"
            id="home-search-no-results-sponsor"
          />
        </div>
      )}

      {/* Features Section */}
      <section style={{ padding: '50px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40 }}>
          {dict.home.whyTitle} <span className="gradient-text">{dict.home.whyBrand}</span>?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {[
            { icon: '🔒', title: dict.home.privacyTitle, desc: dict.home.privacyDesc },
            { icon: '⚡', title: dict.home.fastTitle, desc: dict.home.fastDesc },
            { icon: '🆓', title: dict.home.freeTitle, desc: dict.home.freeDesc },
            { icon: '📱', title: dict.home.responsiveTitle, desc: dict.home.responsiveDesc },
          ].map((f, i) => (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Hub Pages - SEO */}
      <section style={{ marginTop: 60, marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
          <span className="gradient-text">{dict.home?.browseByCategoryTitle || 'Browse Tools by Category'}</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { slug: 'json-tools', icon: '📋', label: 'JSON Tools', count: '50+' },
            { slug: 'css-tools', icon: '🎨', label: 'CSS Tools', count: '40+' },
            { slug: 'converter-tools', icon: '🔄', label: 'Code Converters', count: '100+' },
            { slug: 'encoder-decoder-tools', icon: '🔐', label: 'Encoders & Decoders', count: '40+' },
            { slug: 'formatter-tools', icon: '✨', label: 'Code Formatters', count: '30+' },
            { slug: 'generator-tools', icon: '⚡', label: 'Generators', count: '35+' },
            { slug: 'text-tools', icon: '📝', label: 'Text Tools', count: '25+' },
            { slug: 'web-tools', icon: '🌐', label: 'Web Dev Tools', count: '40+' },
            { slug: 'image-tools', icon: '🖼️', label: 'Image & Color Tools', count: '30+' },
            { slug: 'security-tools', icon: '🔒', label: 'Security Tools', count: '20+' },
            { slug: 'devops-tools', icon: '🚀', label: 'DevOps Tools', count: '20+' },
            { slug: 'markdown-tools', icon: '📑', label: 'Markdown Tools', count: '10+' },
          ].map(cat => (
            <Link
              key={cat.slug}
              href={`/${lang}/category/${cat.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'all 0.2s',
                background: 'var(--bg-secondary)',
              }}
            >
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{cat.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{cat.count} tools</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
