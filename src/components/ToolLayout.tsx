'use client';

import Link from 'next/link';
import AdSlot from './AdSlot';
import AdsterraNativeBanner from './AdsterraNativeBanner';
import { tools } from '@/lib/tools';
import { useLang } from '@/i18n/LangContext';
import NewsletterSignup from './NewsletterSignup';
import SupportButton from './SupportButton';
import ToolRating from './ugc/ToolRating';
import ShareBar from './ugc/ShareBar';
import AffiliateCard from './AffiliateCard';
import CommentSection from './CommentSection';

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
  // Show 6 related tools: declared relatedTools first, then top up from same category, finally any others.
  // More related links = more internal link juice flowing into this page = better SEO.
  const relatedTools = (() => {
    const declared = (currentTool?.relatedTools || [])
      .map(id => tools.find(t => t.id === id))
      .filter((t): t is NonNullable<typeof t> => t != null);
    if (declared.length >= 6) return declared.slice(0, 6);
    const sameCat = currentTool
      ? tools.filter(t =>
          t.id !== toolId &&
          t.category === currentTool.category &&
          !declared.some(d => d.id === t.id)
        )
      : [];
    const filled = [...declared, ...sameCat].slice(0, 6);
    if (filled.length >= 6) return filled;
    const others = tools.filter(t => t.id !== toolId && !filled.some(d => d.id === t.id));
    return [...filled, ...others].slice(0, 6);
  })();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link href={`/${lang}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>{dict.common.home}</Link>
        <span>/</span>
        <Link href={`/${lang}/tools`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>{dict.common.allTools}</Link>
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
          <ShareBar url={`https://viadreams.cc/${lang}/tools/${toolId}`} title={title} lang={lang} />
          <CommentSection toolId={toolId} />
        </div>

        {/* Sidebar */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <AdSlot size="rectangle" />

          {/* Sidebar Adsterra Native Banner — only renders if SIDEBAR env vars are set.
              Configure NEXT_PUBLIC_ADSTERRA_SIDEBAR_SCRIPT + KEY in Vercel after creating
              the second ad unit in the Adsterra dashboard. */}
          <AdsterraNativeBanner
            scriptSrc={process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_SCRIPT}
            containerKey={process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY}
            style={{ margin: 0, maxWidth: '100%', minHeight: 250 }}
          />

          <ToolRating toolId={toolId} lang={lang} />

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
            <Link
              href={`/${lang}/tools`}
              style={{
                display: 'block',
                marginTop: 10,
                padding: '8px 0 0',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--accent-blue)',
                textDecoration: 'none',
              }}
            >
              {dict.common.allTools} ({tools.length}) →
            </Link>
          </div>

          <AffiliateCard category={currentTool?.category} />
          <NewsletterSignup variant="compact" />

          {/* Support */}
          <div className="card" style={{ padding: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>
              Enjoy these free tools?
            </p>
            <SupportButton />
          </div>
        </div>
      </div>

      {/* Bottom Ad */}
      <AdSlot size="leaderboard" style={{ marginTop: 30 }} />
    </div>
  );
}
