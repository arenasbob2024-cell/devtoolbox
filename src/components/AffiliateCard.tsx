'use client';

import { trackMonetizationClick } from '@/lib/analytics';

interface AffiliateLink {
  id: string;
  name: string;
  tagline: string;
  url: string;
  categories: string[];
}

const affiliateLinks: AffiliateLink[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    tagline: 'Deploy your frontend instantly',
    url: process.env.NEXT_PUBLIC_AFFILIATE_VERCEL_URL || 'https://vercel.com',
    categories: ['web', 'converter', 'formatter'],
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    tagline: 'Cloud hosting from $4/mo',
    url: process.env.NEXT_PUBLIC_AFFILIATE_DIGITALOCEAN_URL || 'https://www.digitalocean.com',
    categories: ['web', 'generator'],
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    tagline: 'Free CDN & DDoS protection',
    url: process.env.NEXT_PUBLIC_AFFILIATE_CLOUDFLARE_URL || 'https://www.cloudflare.com',
    categories: ['web', 'encoder'],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    tagline: 'AI pair programming',
    url: process.env.NEXT_PUBLIC_AFFILIATE_GITHUB_COPILOT_URL || 'https://github.com/features/copilot',
    categories: ['converter', 'formatter', 'text', 'json'],
  },
  {
    id: 'jetbrains',
    name: 'JetBrains',
    tagline: 'Smart IDEs for developers',
    url: process.env.NEXT_PUBLIC_AFFILIATE_JETBRAINS_URL || 'https://www.jetbrains.com',
    categories: ['formatter', 'converter', 'text'],
  },
  {
    id: 'tailwind-ui',
    name: 'Tailwind UI',
    tagline: 'Beautiful UI components',
    url: process.env.NEXT_PUBLIC_AFFILIATE_TAILWIND_UI_URL || 'https://tailwindui.com',
    categories: ['css', 'web'],
  },
];

export default function AffiliateCard({ category }: { category?: string }) {
  const relevant = category
    ? affiliateLinks.filter(l => l.categories.includes(category)).slice(0, 2)
    : affiliateLinks.slice(0, 2);

  if (relevant.length === 0) return null;

  return (
    <div className="card" style={{ padding: 16 }}>
      <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>
        Recommended
      </h3>
      {relevant.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener sponsored"
          onClick={() => trackMonetizationClick({
            type: 'affiliate',
            id: link.id,
            category,
            placement: 'tool-sidebar',
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
    </div>
  );
}
