import { NextResponse } from 'next/server'
import { tools } from '@/lib/tools'
import { blogPosts } from '@/data/blog-posts'
import { i18n } from '@/i18n/config'

const BASE_URL = 'https://viadreams.cc'
const URLS_PER_SITEMAP = 500

export async function GET() {
  const locales = i18n.locales
  const categoryPages = 12
  const staticPagesPerLocale = 3 // about, privacy, advertise
  const pagesPerLocale = 2 + tools.length + blogPosts.length + categoryPages
  const staticPages = locales.length * staticPagesPerLocale
  const enPages = pagesPerLocale
  const otherLocalePages = (locales.length - 1) * pagesPerLocale
  const totalUrls = enPages + otherLocalePages + staticPages
  const totalChunks = Math.ceil(totalUrls / URLS_PER_SITEMAP)

  const today = new Date().toISOString().split('T')[0]

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (let i = 0; i < totalChunks; i++) {
    xml += `  <sitemap>\n`
    xml += `    <loc>${BASE_URL}/api/sitemap/?id=${i}</loc>\n`
    xml += `    <lastmod>${today}</lastmod>\n`
    xml += `  </sitemap>\n`
  }

  xml += '</sitemapindex>'

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
