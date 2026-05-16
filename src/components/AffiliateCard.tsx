'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick } from '@/lib/analytics';

interface AffiliateLink {
  id: string;
  name: string;
  tagline: string;
  url?: string;
  categories: string[];
}

const affiliateLinks: AffiliateLink[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    tagline: 'Deploy your frontend instantly',
    url: process.env.NEXT_PUBLIC_AFFILIATE_VERCEL_URL,
    categories: ['web', 'developer', 'generator', 'converter', 'formatter'],
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    tagline: 'Cloud hosting from $4/mo',
    url: process.env.NEXT_PUBLIC_AFFILIATE_DIGITALOCEAN_URL,
    categories: ['web', 'developer', 'network', 'generator'],
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    tagline: 'Free CDN & DDoS protection',
    url: process.env.NEXT_PUBLIC_AFFILIATE_CLOUDFLARE_URL,
    categories: ['web', 'security', 'network', 'encoder', 'encoding'],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    tagline: 'AI pair programming',
    url: process.env.NEXT_PUBLIC_AFFILIATE_GITHUB_COPILOT_URL,
    categories: ['developer', 'converter', 'formatter', 'text', 'json', 'markdown', 'regex'],
  },
  {
    id: 'jetbrains',
    name: 'JetBrains',
    tagline: 'Smart IDEs for developers',
    url: process.env.NEXT_PUBLIC_AFFILIATE_JETBRAINS_URL,
    categories: ['developer', 'formatter', 'converter', 'text', 'json', 'regex'],
  },
  {
    id: 'tailwind-ui',
    name: 'Tailwind UI',
    tagline: 'Beautiful UI components',
    url: process.env.NEXT_PUBLIC_AFFILIATE_TAILWIND_UI_URL,
    categories: ['css', 'web'],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    tagline: 'Postgres, auth, and storage',
    url: process.env.NEXT_PUBLIC_AFFILIATE_SUPABASE_URL,
    categories: ['developer', 'web', 'generator', 'converter', 'json'],
  },
  {
    id: 'sentry',
    name: 'Sentry',
    tagline: 'Find and fix production errors',
    url: process.env.NEXT_PUBLIC_AFFILIATE_SENTRY_URL,
    categories: ['developer', 'web', 'formatter', 'json'],
  },
  {
    id: 'postman',
    name: 'Postman',
    tagline: 'Build and test APIs faster',
    url: process.env.NEXT_PUBLIC_AFFILIATE_POSTMAN_URL,
    categories: ['developer', 'web', 'json', 'converter', 'network'],
  },
  {
    id: 'onepassword',
    name: '1Password',
    tagline: 'Secure developer secrets',
    url: process.env.NEXT_PUBLIC_AFFILIATE_1PASSWORD_URL,
    categories: ['security', 'encoder', 'encoding', 'generator', 'developer'],
  },
];

const defaultCategoryOffers = ['github-copilot', 'vercel', 'cloudflare'];

const copy = {
  en: {
    heading: 'Partner Offers',
    sponsorTitle: 'Sponsor this spot',
    sponsorText: 'Reach developers using this workflow',
  },
  zh: {
    heading: '合作推荐',
    sponsorTitle: '赞助这个位置',
    sponsorText: '触达正在使用此工作流的开发者',
  },
  ru: {
    heading: 'Партнерские предложения',
    sponsorTitle: 'Спонсировать этот блок',
    sponsorText: 'Охватите разработчиков в этом рабочем процессе',
  },
};

export default function AffiliateCard({ category }: { category?: string }) {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const configuredLinks = affiliateLinks.filter(link => link.url);
  const categoryMatches = category
    ? configuredLinks.filter(link => link.categories.includes(category))
    : [];
  const defaultMatches = configuredLinks.filter(link => defaultCategoryOffers.includes(link.id));
  const relevant = [...categoryMatches, ...defaultMatches]
    .filter((link, index, all) => all.findIndex(candidate => candidate.id === link.id) === index)
    .slice(0, 2);

  const sponsorHref = `/${lang}/advertise/?source=tool-sidebar-partner-card${
    category ? `&category=${encodeURIComponent(category)}` : ''
  }`;

  return (
    <div className="card" style={{ padding: 16 }}>
      <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0 }}>
        {t.heading}
      </h3>
      {relevant.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener sponsored nofollow"
          onClick={() => trackMonetizationClick({
            type: 'affiliate',
            id: link.id,
            category,
            placement: 'tool-sidebar-partner-card',
          })}
          style={{
            display: 'block',
            padding: '10px 0',
            borderBottom: '1px solid var(--border-color)',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{link.name}</span>
          <span style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{link.tagline}</span>
        </a>
      ))}
      <Link
        href={sponsorHref}
        onClick={() => trackMonetizationClick({
          type: 'sponsor',
          id: 'tool-sidebar-sponsor',
          category,
          placement: 'tool-sidebar-partner-card',
        })}
        style={{
          display: 'block',
          padding: relevant.length > 0 ? '12px 0 0' : '4px 0 0',
          textDecoration: 'none',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)' }}>{t.sponsorTitle}</span>
        <span style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{t.sponsorText}</span>
      </Link>
    </div>
  );
}
