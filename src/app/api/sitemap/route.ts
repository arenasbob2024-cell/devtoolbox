import { NextRequest, NextResponse } from 'next/server'
import { tools } from '@/lib/tools'
import { blogPosts } from '@/data/blog-posts'
import { i18n } from '@/i18n/config'

const BASE_URL = 'https://viadreams.cc'
const URLS_PER_SITEMAP = 500

interface SitemapEntry {
  url: string
  lastmod: string
  changefreq: string
  priority: number
}

function buildAllUrls(): SitemapEntry[] {
  const locales = i18n.locales
  const entries: SitemapEntry[] = []
  const today = new Date().toISOString().split('T')[0]

  // Pages (home, about, privacy)
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0,
    })
    entries.push({
      url: `${BASE_URL}/${locale}/about/`,
      lastmod: '2026-03-31',
      changefreq: 'monthly',
      priority: 0.3,
    })
    entries.push({
      url: `${BASE_URL}/${locale}/privacy/`,
      lastmod: '2026-03-31',
      changefreq: 'monthly',
      priority: 0.2,
    })
  }

  // Tool pages
  for (const tool of tools) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/tools/${tool.id}/`,
        lastmod: '2026-03-31',
        changefreq: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Blog pages
  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}/`,
        lastmod: post.date,
        changefreq: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const idParam = searchParams.get('id')

  const allUrls = buildAllUrls()

  // If no id param, return ALL urls as a single sitemap (fallback)
  if (idParam === null) {
    return generateSitemapXml(allUrls)
  }

  const id = parseInt(idParam, 10)
  if (isNaN(id) || id < 0) {
    return new NextResponse('Invalid sitemap id', { status: 400 })
  }

  const start = id * URLS_PER_SITEMAP
  const end = start + URLS_PER_SITEMAP
  const chunk = allUrls.slice(start, end)

  if (chunk.length === 0) {
    return new NextResponse('Sitemap chunk not found', { status: 404 })
  }

  return generateSitemapXml(chunk)
}

function generateSitemapXml(entries: SitemapEntry[]): NextResponse {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const entry of entries) {
    xml += '  <url>\n'
    xml += `    <loc>${entry.url}</loc>\n`
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`
    xml += `    <priority>${entry.priority}</priority>\n`
    xml += '  </url>\n'
  }

  xml += '</urlset>'

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
