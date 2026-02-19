#!/usr/bin/env node

/**
 * Generate static sitemap files in public/ directory.
 * Run: node scripts/generate-static-sitemap.js
 *
 * This bypasses Next.js dynamic sitemap issues and produces
 * reliable XML sitemaps for Google Search Console.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://viadreams.cc';
const LOCALES = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th'];
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Parse tool paths from tools.ts
const toolsFile = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'tools.ts'), 'utf8');
const toolPaths = [];
const pathRegex = /path:\s*'([^']+)'/g;
let match;
while ((match = pathRegex.exec(toolsFile)) !== null) {
  toolPaths.push(match[1]);
}

// Parse blog slugs from blog-posts.ts
const blogFile = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'blog-posts.ts'), 'utf8');
const blogSlugs = [];
const slugRegex = /slug:\s*'([^']+)'/g;
while ((match = slugRegex.exec(blogFile)) !== null) {
  blogSlugs.push(match[1]);
}

const today = new Date().toISOString().split('T')[0];

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildXhtmlLinks(pagePath) {
  return LOCALES.map(locale =>
    `      <xhtml:link rel="alternate" hreflang="${locale}" href="${BASE_URL}/${locale}${pagePath}"/>`
  ).join('\n') + '\n' +
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${pagePath}"/>`;
}

function buildUrlEntry(pagePath, priority, changefreq) {
  const entries = [];
  for (const locale of LOCALES) {
    entries.push(`  <url>
    <loc>${BASE_URL}/${locale}${pagePath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${buildXhtmlLinks(pagePath)}
  </url>`);
  }
  return entries.join('\n');
}

function buildSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

function buildSitemapIndex(sitemapFiles) {
  const entries = sitemapFiles.map(f =>
    `  <sitemap>
    <loc>${BASE_URL}/${f}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

// Ensure sitemaps directory exists
const sitemapsDir = path.join(PUBLIC_DIR, 'sitemaps');
if (!fs.existsSync(sitemapsDir)) {
  fs.mkdirSync(sitemapsDir, { recursive: true });
}

const sitemapFiles = [];

// Sitemap 1: Homepages + blog list pages
let urls = buildUrlEntry('', 1.0, 'weekly');
urls += '\n' + buildUrlEntry('/blog', 0.7, 'weekly');
fs.writeFileSync(path.join(sitemapsDir, 'pages.xml'), buildSitemap(urls));
sitemapFiles.push('sitemaps/pages.xml');

// Sitemap 2+: Tool pages (chunk to keep files small)
const TOOLS_PER_FILE = 25;
for (let i = 0; i < toolPaths.length; i += TOOLS_PER_FILE) {
  const chunk = toolPaths.slice(i, i + TOOLS_PER_FILE);
  const urlEntries = chunk.map(p => buildUrlEntry(p, 0.8, 'monthly')).join('\n');
  const fileNum = Math.floor(i / TOOLS_PER_FILE);
  const fileName = `tools-${fileNum}.xml`;
  fs.writeFileSync(path.join(sitemapsDir, fileName), buildSitemap(urlEntries));
  sitemapFiles.push(`sitemaps/${fileName}`);
}

// Blog post sitemaps
const POSTS_PER_FILE = 30;
for (let i = 0; i < blogSlugs.length; i += POSTS_PER_FILE) {
  const chunk = blogSlugs.slice(i, i + POSTS_PER_FILE);
  const urlEntries = chunk.map(slug => buildUrlEntry(`/blog/${slug}`, 0.6, 'monthly')).join('\n');
  const fileNum = Math.floor(i / POSTS_PER_FILE);
  const fileName = `blog-${fileNum}.xml`;
  fs.writeFileSync(path.join(sitemapsDir, fileName), buildSitemap(urlEntries));
  sitemapFiles.push(`sitemaps/${fileName}`);
}

// Generate sitemap index
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemapIndex(sitemapFiles));

// Summary
const totalUrls = (2 + toolPaths.length + blogSlugs.length) * LOCALES.length;
console.log(`Generated sitemap index + ${sitemapFiles.length} sub-sitemaps`);
console.log(`  Tools: ${toolPaths.length}`);
console.log(`  Blog posts: ${blogSlugs.length}`);
console.log(`  Locales: ${LOCALES.length}`);
console.log(`  Total URLs: ${totalUrls}`);
console.log(`  Files: public/sitemap.xml + ${sitemapFiles.length} sub-sitemaps in public/sitemaps/`);
