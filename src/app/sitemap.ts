import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';

const BASE_URL = 'https://devtoolbox.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map(tool => ({
    url: `${BASE_URL}${tool.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    ...toolPages,
  ];
}
