'use client';

import Link from 'next/link';
import { useState } from 'react';
import { tools, categories } from '@/lib/tools';
import AdSlot from '@/components/AdSlot';
import { useLang } from '@/i18n/LangContext';

export default function HomePageClient() {
  const { lang, dict } = useLang();
  const [search, setSearch] = useState('');

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevToolBox',
    url: `https://viadreams.cc/${lang}`,
    description: dict.meta.homeDescription,
    inLanguage: lang,
    publisher: {
      '@type': 'Organization',
      name: 'DevToolBox',
      url: 'https://viadreams.cc',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://viadreams.cc/${lang}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    url: `https://viadreams.cc/${lang}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: dict.tools[tool.id as keyof typeof dict.tools]?.name || tool.name,
        url: `https://viadreams.cc/${lang}${tool.path}`,
      })),
    },
  };
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = search
    ? tools.filter(t =>
        (dict.tools[t.id as keyof typeof dict.tools]?.name || t.name).toLowerCase().includes(search.toLowerCase()) ||
        t.keywords.some(k => k.includes(search.toLowerCase()))
      )
    : activeCategory === 'all'
      ? tools
      : tools.filter(t => t.category === activeCategory);

  const t = dict.tools;
  const c = dict.categories;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '50px 0 30px' }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 16,
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

      {/* Ad */}
      <AdSlot size="leaderboard" />

      {/* Tools Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
        marginTop: 20,
      }}>
        {filteredTools.map(tool => {
          const toolDict = t[tool.id as keyof typeof t];
          return (
            <Link key={tool.id} href={`/${lang}${tool.path}`} className="tool-card">
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

      {filteredTools.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: 18 }}>{dict.common.noResults} &quot;{search}&quot;</p>
          <p style={{ fontSize: 14 }}>{dict.common.tryDifferent}</p>
        </div>
      )}

      {/* Bottom Ad */}
      <AdSlot size="leaderboard" style={{ marginTop: 30 }} />

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
    </div>
  );
}
