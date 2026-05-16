'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPosts, getLocalizedPost } from '@/data/blog-posts';
import { useLang } from '@/i18n/LangContext';
import { i18n, type Locale } from '@/i18n/config';
import AdSlot from '@/components/AdSlot';
import SponsorCta from '@/components/SponsorCta';

export default function BlogListPage() {
  const params = useParams();
  const { lang: contextLang, dict } = useLang();
  // Prefer lang from URL (params) - more reliable for localized content when switching languages
  const lang = (params?.lang && i18n.locales.includes(params.lang as Locale) ? params.lang : contextLang) as Locale;
  const blog = (dict as Record<string, unknown>).blog as Record<string, string> | undefined;
  const blogTitle = blog?.title || 'Blog';
  const blogDescription = blog?.description || 'Developer guides, tutorials, and best practices';
  const readMore = blog?.readMore || 'Read More';

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{
          fontSize: 40,
          fontWeight: 800,
          marginBottom: 12,
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {blogTitle}
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {blogDescription}
        </p>
      </section>

      <AdSlot size="leaderboard" placement="blog-list-top" category="blog" />
      <SponsorCta placement="blog-list-sponsor" id="blog-list-sponsor" />

      {/* Articles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
        {[...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((rawPost) => {
          const post = getLocalizedPost(rawPost.slug, lang) || rawPost;
          return (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 12,
                  padding: 28,
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <time>{post.date}</time>
                  <span>|</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}>
                  {post.title}
                </h2>
                <p style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}>
                  {post.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {post.keywords.slice(0, 3).map(kw => (
                    <span
                      key={kw}
                      style={{
                        fontSize: 11,
                        padding: '3px 10px',
                        borderRadius: 20,
                        background: 'rgba(59,130,246,0.1)',
                        color: 'var(--accent-blue)',
                        fontWeight: 600,
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 16, fontSize: 14, color: 'var(--accent-blue)', fontWeight: 600 }}>
                  {readMore} &rarr;
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <AdSlot
        size="leaderboard"
        placement="blog-list-bottom"
        category="blog"
        fallbackToSponsor
        style={{ marginTop: 30 }}
      />
    </div>
  );
}
