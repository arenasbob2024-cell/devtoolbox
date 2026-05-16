export interface AffiliateLink {
  id: string;
  name: string;
  tagline: string;
  url?: string;
  categories: string[];
}

export const affiliateLinks: AffiliateLink[] = [
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

export const defaultCategoryOffers = ['github-copilot', 'vercel', 'cloudflare'];

export function getConfiguredAffiliateLinks() {
  return affiliateLinks.filter(link => link.url);
}

export function getRelevantAffiliateLinks({
  category,
  keywords = [],
  limit = 2,
}: {
  category?: string;
  keywords?: string[];
  limit?: number;
}) {
  const configuredLinks = getConfiguredAffiliateLinks();
  const haystack = [category, ...keywords].filter(Boolean).join(' ').toLowerCase();

  const directMatches = configuredLinks.filter((link) => {
    const idNeedles = [link.id, link.name, ...link.categories].map(value => value.toLowerCase());
    return idNeedles.some(needle => haystack.includes(needle));
  });
  const defaultMatches = configuredLinks.filter(link => defaultCategoryOffers.includes(link.id));

  return [...directMatches, ...defaultMatches]
    .filter((link, index, all) => all.findIndex(candidate => candidate.id === link.id) === index)
    .slice(0, limit);
}
