'use client';

import Link from 'next/link';
import { categories, tools } from '@/lib/tools';
import { useLang } from '@/i18n/LangContext';
import NewsletterSignup from './NewsletterSignup';
import SupportButton from './SupportButton';

export default function Footer() {
  const { lang, dict } = useLang();
  const t = dict.tools;
  const c = dict.categories;

  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      marginTop: 60,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 30 }}>
          {/* Brand */}
          <div>
            <h3 style={{
              fontSize: 20,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 12,
            }}>DevToolBox</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {dict.footer.tagline}
            </p>
            <div style={{ marginTop: 16 }}>
              <NewsletterSignup variant="compact" />
            </div>
            <div style={{ marginTop: 12 }}>
              <SupportButton />
            </div>
          </div>

          {/* Tool Categories */}
          {categories.map(cat => (
            <div key={cat.id}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                {cat.icon} {c[cat.id as keyof typeof c] || cat.name}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {tools.filter(tool => tool.category === cat.id).slice(0, 5).map(tool => {
                  const toolDict = t[tool.id as keyof typeof t];
                  return (
                    <li key={tool.id} style={{ marginBottom: 6 }}>
                      <Link href={`/${lang}${tool.path}`} style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>
                        {toolDict?.name || tool.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 30,
          paddingTop: 20,
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href={`/${lang}/privacy`} style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none' }}>{dict.common.privacyPolicy}</Link>
            <Link href={`/${lang}/about`} style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none' }}>{dict.common.about}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
