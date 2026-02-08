'use client';

import Link from 'next/link';
import { useState } from 'react';
import { tools, categories, searchTools } from '@/lib/tools';
import AdSlot from '@/components/AdSlot';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = search
    ? searchTools(search)
    : activeCategory === 'all'
      ? tools
      : tools.filter(t => t.category === activeCategory);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '50px 0 30px' }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          <span className="gradient-text">Free Online</span>
          <br />
          Developer Tools
        </h1>
        <p style={{
          fontSize: 18,
          color: 'var(--text-secondary)',
          maxWidth: 560,
          margin: '0 auto 30px',
          lineHeight: 1.6,
        }}>
          20+ essential tools for developers. No signup, no limits. All processing happens right in your browser — your data never leaves your device.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search tools... (json, base64, uuid, hash...)"
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
          All Tools ({tools.length})
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
            {cat.icon} {cat.name}
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
        {filteredTools.map(tool => (
          <Link key={tool.id} href={tool.path} className="tool-card">
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
                  {tool.name}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: 18 }}>No tools found for &quot;{search}&quot;</p>
          <p style={{ fontSize: 14 }}>Try a different search term</p>
        </div>
      )}

      {/* Bottom Ad */}
      <AdSlot size="leaderboard" style={{ marginTop: 30 }} />

      {/* Features Section */}
      <section style={{ padding: '50px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40 }}>
          Why <span className="gradient-text">DevToolBox</span>?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {[
            { icon: '🔒', title: 'Privacy First', desc: 'All data is processed locally in your browser. Nothing is sent to any server.' },
            { icon: '⚡', title: 'Instant & Fast', desc: 'No loading, no waiting. Tools work instantly with zero latency.' },
            { icon: '🆓', title: '100% Free', desc: 'No signup, no limits, no hidden fees. Free forever.' },
            { icon: '📱', title: 'Works Everywhere', desc: 'Fully responsive. Use on desktop, tablet, or mobile.' },
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
