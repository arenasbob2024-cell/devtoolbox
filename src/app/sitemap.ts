import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { blogPosts } from '@/data/blog-posts';
import { i18n } from '@/i18n/config';

const BASE_URL = 'https://viadreams.cc';
const TOOLS_PER_SITEMAP = 20;
const POSTS_PER_SITEMAP = 30;

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

function buildAlternates(path: string): { languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }
  languages['x-default'] = `${BASE_URL}/en${path}`;
  return { languages };
}

// Split into multiple sitemaps for faster crawling
// id 0: homepages + blog list pages
// id 1..N: tool pages (TOOLS_PER_SITEMAP tools × 15 locales each)
// id N+1..: blog post pages (POSTS_PER_SITEMAP posts × 15 locales each)
const toolSitemapCount = Math.ceil(tools.length / TOOLS_PER_SITEMAP);
const blogSitemapCount = Math.ceil(blogPosts.length / POSTS_PER_SITEMAP);

export async function generateSitemaps() {
  const total = 1 + toolSitemapCount + blogSitemapCount;
  return Array.from({ length: total }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Sitemap 0: homepages + blog list
  if (id === 0) {
    const entries: MetadataRoute.Sitemap = [];
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as ChangeFrequency,
        priority: 1.0,
        alternates: buildAlternates(''),
      });
    }
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as ChangeFrequency,
        priority: 0.7,
        alternates: buildAlternates('/blog'),
      });
    }
    return entries;
  }

  // Sitemap 1..toolSitemapCount: tool pages
  if (id <= toolSitemapCount) {
    const toolIndex = id - 1;
    const start = toolIndex * TOOLS_PER_SITEMAP;
    const chunk = tools.slice(start, start + TOOLS_PER_SITEMAP);
    const entries: MetadataRoute.Sitemap = [];
    for (const tool of chunk) {
      for (const locale of i18n.locales) {
        entries.push({
          url: `${BASE_URL}/${locale}${tool.path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as ChangeFrequency,
          priority: 0.8,
          alternates: buildAlternates(tool.path),
        });
      }
    }
    return entries;
  }

  // Remaining: blog post pages
  const blogIndex = id - 1 - toolSitemapCount;
  const start = blogIndex * POSTS_PER_SITEMAP;
  const chunk = blogPosts.slice(start, start + POSTS_PER_SITEMAP);
  const entries: MetadataRoute.Sitemap = [];
  for (const post of chunk) {
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as ChangeFrequency,
        priority: 0.6,
        alternates: buildAlternates(`/blog/${post.slug}`),
      });
    }
  }
  return entries;
}
