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
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}`])),
          'x-default': `${BASE}/en`,
        },
      },
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
        alternates: {
          languages: {
            ...Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${tool.path}`])),
            'x-default': `${BASE}/en${tool.path}`,
          },
        },
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
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/blog`])),
          'x-default': `${BASE}/en/blog`,
        },
      },
    });
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
        alternates: {
          languages: {
            ...Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/blog/${slug}`])),
            'x-default': `${BASE}/en/blog/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
