'use client';

interface AffiliateLink {
  name: string;
  tagline: string;
  url: string;
  categories: string[];
}

const affiliateLinks: AffiliateLink[] = [
  { name: 'Vercel', tagline: 'Deploy your frontend instantly', url: 'https://vercel.com', categories: ['web', 'converter', 'formatter'] },
  { name: 'DigitalOcean', tagline: 'Cloud hosting from $4/mo', url: 'https://www.digitalocean.com', categories: ['web', 'generator'] },
  { name: 'Cloudflare', tagline: 'Free CDN & DDoS protection', url: 'https://www.cloudflare.com', categories: ['web', 'encoder'] },
  { name: 'GitHub Copilot', tagline: 'AI pair programming', url: 'https://github.com/features/copilot', categories: ['converter', 'formatter', 'text', 'json'] },
  { name: 'JetBrains', tagline: 'Smart IDEs for developers', url: 'https://www.jetbrains.com', categories: ['formatter', 'converter', 'text'] },
  { name: 'Tailwind UI', tagline: 'Beautiful UI components', url: 'https://tailwindui.com', categories: ['css', 'web'] },
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
