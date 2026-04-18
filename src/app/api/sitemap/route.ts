import { NextRequest, NextResponse } from 'next/server'
import { tools } from '@/lib/tools'
import { blogPosts } from '@/data/blog-posts'
import { i18n } from '@/i18n/config'

const BASE_URL = 'https://viadreams.cc'
const URLS_PER_SITEMAP = 500

// Category collection pages (high-value aggregate landing pages).
// Each category targets a competitive long-tail query (e.g. "Free JSON Tools 2026").
const CATEGORY_SLUGS = [
  'json-tools',
  'css-tools',
  'converter-tools',
  'encoder-decoder-tools',
  'formatter-tools',
  'generator-tools',
  'text-tools',
  'web-tools',
  'image-tools',
  'security-tools',
  'devops-tools',
  'markdown-tools',
]

interface SitemapEntry {
  url: string
  lastmod: string
  changefreq: string
  priority: number
  alternates?: { locale: string; url: string }[]
}

// Priority order for locales: English first, then major European, then Asian
const LOCALE_PRIORITY: string[] = ['en', 'es', 'fr', 'de', 'pt', 'it', 'zh', 'ja', 'ko']

function buildAllUrls(): SitemapEntry[] {
  const locales = i18n.locales
  const entries: SitemapEntry[] = []
  const today = new Date().toISOString().split('T')[0]

  // Helper: generate hreflang alternates for a given path pattern
  function getAlternates(pathFn: (l: string) => string) {
    return locales.map(l => ({
      locale: l,
      url: `${BASE_URL}${pathFn(l)}`,
    }))
  }

  // === SECTION 1: English pages first (highest crawl priority) ===

  // EN Homepage
  entries.push({
    url: `${BASE_URL}/en/`,
    lastmod: today,
    changefreq: 'daily',
    priority: 1.0,
    alternates: getAlternates(l => `/${l}/`),
  })

  // EN Tool pages (sorted by most likely to rank)
  for (const tool of tools) {
    entries.push({
      url: `${BASE_URL}/en/tools/${tool.id}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
      alternates: getAlternates(l => `/${l}/tools/${tool.id}/`),
    })
  }

  // EN Blog pages (sorted by date, newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
  for (const post of sortedPosts) {
    entries.push({
      url: `${BASE_URL}/en/blog/${post.slug}/`,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: 0.8,
      alternates: getAlternates(l => `/${l}/blog/${post.slug}/`),
    })
  }

  // EN Category pages (high-priority aggregate landing pages)
  for (const slug of CATEGORY_SLUGS) {
    entries.push({
      url: `${BASE_URL}/en/category/${slug}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.85,
      alternates: getAlternates(l => `/${l}/category/${slug}/`),
    })
  }

  // EN Blog index
  entries.push({
    url: `${BASE_URL}/en/blog/`,
    lastmod: today,
    changefreq: 'daily',
    priority: 0.7,
    alternates: getAlternates(l => `/${l}/blog/`),
  })

  // === SECTION 2: Other locales (grouped by locale priority) ===
  const otherLocales = LOCALE_PRIORITY.filter(l => l !== 'en')

  for (const locale of otherLocales) {
    // Homepage
    entries.push({
      url: `${BASE_URL}/${locale}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.8,
      alternates: getAlternates(l => `/${l}/`),
    })

    // Tool pages
    for (const tool of tools) {
      entries.push({
        url: `${BASE_URL}/${locale}/tools/${tool.id}/`,
        lastmod: '2026-03-31',
        changefreq: 'weekly',
        priority: 0.6,
        alternates: getAlternates(l => `/${l}/tools/${tool.id}/`),
      })
    }

    // Blog pages
    for (const post of sortedPosts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}/`,
        lastmod: post.date,
        changefreq: 'monthly',
        priority: 0.5,
        alternates: getAlternates(l => `/${l}/blog/${post.slug}/`),
      })
    }

    // Category pages for non-English locales
    for (const slug of CATEGORY_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/category/${slug}/`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.55,
        alternates: getAlternates(l => `/${l}/category/${slug}/`),
      })
    }

    // Blog index
    entries.push({
      url: `${BASE_URL}/${locale}/blog/`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.5,
    })
  }

  // === SECTION 3: Low-priority static pages (about, privacy) ===
  for (const locale of LOCALE_PRIORITY) {
    entries.push({
      url: `${BASE_URL}/${locale}/about/`,
      lastmod: '2026-03-31',
      changefreq: 'monthly',
      priority: 0.2,
    })
    entries.push({
      url: `${BASE_URL}/${locale}/privacy/`,
      lastmod: '2026-03-31',
      changefreq: 'monthly',
      priority: 0.1,
    })
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
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
  xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

  for (const entry of entries) {
    xml += '  <url>\n'
    xml += `    <loc>${entry.url}</loc>\n`
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`
    xml += `    <priority>${entry.priority}</priority>\n`

    // Add xhtml:link hreflang annotations
    if (entry.alternates) {
      for (const alt of entry.alternates) {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.locale}" href="${alt.url}"/>\n`
      }
      // x-default points to English
      const enAlt = entry.alternates.find(a => a.locale === 'en')
      if (enAlt) {
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${enAlt.url}"/>\n`
      }
    }

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
