import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { blogPosts } from '@/data/blog-posts';
import { i18n } from '@/i18n/config';

const BASE_URL = 'https://viadreams.cc';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

function buildAlternates(path: string): { languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }
  languages['x-default'] = `${BASE_URL}/en${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage (15 locales)
  for (const locale of i18n.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 1.0,
      alternates: buildAlternates(''),
    });
  }

  // Tool pages (tools × 15 locales)
  for (const tool of tools) {
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

  // Blog list page (15 locales)
  for (const locale of i18n.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.7,
      alternates: buildAlternates('/blog'),
    });
  }

  // Blog posts (blogPosts × 15 locales)
  for (const post of blogPosts) {
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
