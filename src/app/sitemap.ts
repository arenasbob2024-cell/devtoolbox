import type { MetadataRoute } from 'next';
import { i18n } from '@/i18n/config';
import { tools } from '@/lib/tools';
import { getAllSlugs } from '@/data/blog-posts';

const BASE = 'https://viadreams.cc';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = i18n.locales;
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const lang of locales) {
    entries.push({
      url: `${BASE}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });
  }

  // Tool pages
  for (const tool of tools) {
    for (const lang of locales) {
      entries.push({
        url: `${BASE}/${lang}${tool.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // Blog list pages
  for (const lang of locales) {
    entries.push({
      url: `${BASE}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // About and Privacy pages
  for (const page of ['about', 'privacy']) {
    for (const lang of locales) {
      entries.push({
        url: `${BASE}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      });
    }
  }

  // Blog post pages
  const slugs = getAllSlugs();
  for (const slug of slugs) {
    for (const lang of locales) {
      entries.push({
        url: `${BASE}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
