import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { i18n } from '@/i18n/config';

const BASE_URL = 'https://viadreams.cc';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  for (const locale of i18n.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${BASE_URL}/${l}`])
        ),
      },
    });
  }

  // Tool pages for each locale
  for (const tool of tools) {
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${tool.path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map((l) => [l, `${BASE_URL}/${l}${tool.path}`])
          ),
        },
      });
    }
  }

  // About pages
  for (const locale of i18n.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${BASE_URL}/${l}/about`])
        ),
      },
    });
  }

  // Privacy pages
  for (const locale of i18n.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${BASE_URL}/${l}/privacy`])
        ),
      },
    });
  }

  return entries;
}
