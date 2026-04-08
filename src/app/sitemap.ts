import { MetadataRoute } from 'next'
import { tools } from '@/lib/tools'
import { blogPosts } from '@/data/blog-posts'
import { i18n } from '@/i18n/config'

const BASE_URL = 'https://viadreams.cc'
const URLS_PER_SITEMAP = 500

// Calculate total number of sitemap chunks needed
function getTotalChunks(): number {
  const locales = i18n.locales
  const totalUrls = locales.length * (3 + tools.length + blogPosts.length) // 3 = home + about + privacy
  return Math.ceil(totalUrls / URLS_PER_SITEMAP)
}

export async function generateSitemaps() {
  const totalChunks = getTotalChunks()
  return Array.from({ length: totalChunks }, (_, i) => ({ id: i }))
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const locales = i18n.locales
  const allUrls: MetadataRoute.Sitemap = []

  // Build all URLs in order: pages → tools → blog
  // Pages (home, about, privacy)
  for (const locale of locales) {
    allUrls.push({
      url: `${BASE_URL}/${locale}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })
    allUrls.push({
      url: `${BASE_URL}/${locale}/about/`,
      lastModified: new Date('2026-03-31'),
      changeFrequency: 'monthly',
      priority: 0.3,
    })
    allUrls.push({
      url: `${BASE_URL}/${locale}/privacy/`,
      lastModified: new Date('2026-03-31'),
      changeFrequency: 'monthly',
      priority: 0.2,
    })
  }

  // Tool pages
  for (const tool of tools) {
    for (const locale of locales) {
      allUrls.push({
        url: `${BASE_URL}/${locale}/tools/${tool.id}/`,
        lastModified: new Date('2026-03-31'),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Blog pages
  for (const post of blogPosts) {
    for (const locale of locales) {
      allUrls.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}/`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // Return the chunk for this sitemap id
  const start = id * URLS_PER_SITEMAP
  const end = start + URLS_PER_SITEMAP
  return allUrls.slice(start, end)
}
