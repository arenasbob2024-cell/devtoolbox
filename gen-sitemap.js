const fs = require('fs');
const path = require('path');

const locales = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th'];
const BASE = 'https://viadreams.cc';
const date = new Date().toISOString().split('T')[0];
const SITEMAP_DIR = path.join(__dirname, 'public', 'sitemaps');
const MAX_URLS_PER_SITEMAP = 5000;

// Configuration: Number of sitemap files per category
const SITEMAP_CONFIG = {
  tools: 2,     // Split tools into 2 files
  blog: 1,      // Split blog into 1 file
  pages: 1,     // Static pages in 1 file
};

// Ensure sitemaps directory exists
if (!fs.existsSync(SITEMAP_DIR)) {
  fs.mkdirSync(SITEMAP_DIR, { recursive: true });
}

// Auto-discover tools from directory structure
const toolsDir = path.join(__dirname, 'src/app/[lang]/tools');
const tools = fs.readdirSync(toolsDir).filter(d => {
  const p = path.join(toolsDir, d, 'page.tsx');
  return fs.existsSync(p) && fs.statSync(path.join(toolsDir, d)).isDirectory();
}).sort();

// Auto-discover blog posts from blog-posts.ts
const blogPostsFile = fs.readFileSync(path.join(__dirname, 'src/data/blog-posts.ts'), 'utf8');
const slugMatches = blogPostsFile.match(/slug:\s*'([^']+)'/g) || [];
const blogPosts = slugMatches.map(m => m.match(/slug:\s*'([^']+)'/)[1]).sort();

// Static pages configuration
const staticPages = [
  { path: '', freq: 'weekly', priority: '1.0' },
  { path: 'blog', freq: 'weekly', priority: '0.7' },
  { path: 'about', freq: 'monthly', priority: '0.3' },
  { path: 'privacy', freq: 'monthly', priority: '0.2' },
];

// Helper: Create a single URL entry with all alternate languages
function createUrlEntry(urlPath, freq, priority) {
  const entries = [];
  for (const l of locales) {
    const url = urlPath ? `${BASE}/${l}/${urlPath}` : `${BASE}/${l}`;
    let xml = `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>${freq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    
    // Add alternate language links
    for (const al of locales) {
      const alt = urlPath ? `${BASE}/${al}/${urlPath}` : `${BASE}/${al}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${al}" href="${alt}" />\n`;
    }
    // Add x-default
    const defaultUrl = urlPath ? `${BASE}/en/${urlPath}` : `${BASE}/en`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
    
    xml += `  </url>\n`;
    entries.push(xml);
  }
  return entries;
}

// Helper: Write a sitemap file
function writeSitemap(filename, urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  xml += urls.join('');
  xml += '</urlset>\n';
  
  fs.writeFileSync(path.join(SITEMAP_DIR, filename), xml);
  const pageCount = urls.length / locales.length;
  console.log(`  ✓ ${filename}: ${pageCount} pages (${urls.length} URLs, ${(xml.length / 1024).toFixed(1)} KB)`);
  return urls.length;
}

// Helper: Split items into chunks
function splitIntoChunks(items, numChunks) {
  const chunks = [];
  const chunkSize = Math.ceil(items.length / numChunks);
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  // Pad with empty arrays if needed
  while (chunks.length < numChunks) {
    chunks.push([]);
  }
  return chunks;
}

// Helper: Write sitemap index
function writeSitemapIndex(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const sitemap of sitemaps) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${BASE}/sitemaps/${sitemap.filename}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }
  
  xml += '</sitemapindex>\n';
  
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap-index.xml'), xml);
  console.log(`\n✓ sitemap-index.xml created with ${sitemaps.length} sitemaps`);
}

// Generate all URLs
console.log('Generating sitemap files...\n');

const allSitemaps = [];

// 1. Generate Tools Sitemaps
console.log('Tools:');
const toolChunks = splitIntoChunks(tools, SITEMAP_CONFIG.tools);
for (let i = 0; i < toolChunks.length; i++) {
  const chunk = toolChunks[i];
  if (chunk.length === 0) continue;
  
  const urls = [];
  for (const tool of chunk) {
    const entries = createUrlEntry('tools/' + tool, 'monthly', '0.8');
    urls.push(...entries);
  }
  
  // Auto-split if exceeds MAX_URLS_PER_SITEMAP
  if (urls.length > MAX_URLS_PER_SITEMAP) {
    console.log(`  ⚠ tools-${i}.xml exceeds ${MAX_URLS_PER_SITEMAP} URLs, auto-splitting...`);
    for (let j = 0; j < urls.length; j += MAX_URLS_PER_SITEMAP) {
      const subChunk = urls.slice(j, j + MAX_URLS_PER_SITEMAP);
      const filename = `tools-${i}-${j / MAX_URLS_PER_SITEMAP}.xml`;
      writeSitemap(filename, subChunk);
      allSitemaps.push({ filename });
    }
  } else {
    const filename = `tools-${i}.xml`;
    writeSitemap(filename, urls);
    allSitemaps.push({ filename });
  }
}

// 2. Generate Blog Sitemaps
console.log('\nBlog:');
const blogChunks = splitIntoChunks(blogPosts, SITEMAP_CONFIG.blog);
for (let i = 0; i < blogChunks.length; i++) {
  const chunk = blogChunks[i];
  if (chunk.length === 0) continue;
  
  const urls = [];
  for (const post of chunk) {
    const entries = createUrlEntry('blog/' + post, 'monthly', '0.6');
    urls.push(...entries);
  }
  
  // Auto-split if exceeds MAX_URLS_PER_SITEMAP
  if (urls.length > MAX_URLS_PER_SITEMAP) {
    console.log(`  ⚠ blog-${i}.xml exceeds ${MAX_URLS_PER_SITEMAP} URLs, auto-splitting...`);
    for (let j = 0; j < urls.length; j += MAX_URLS_PER_SITEMAP) {
      const subChunk = urls.slice(j, j + MAX_URLS_PER_SITEMAP);
      const filename = `blog-${i}-${j / MAX_URLS_PER_SITEMAP}.xml`;
      writeSitemap(filename, subChunk);
      allSitemaps.push({ filename });
    }
  } else {
    const filename = `blog-${i}.xml`;
    writeSitemap(filename, urls);
    allSitemaps.push({ filename });
  }
}

// 3. Generate Pages Sitemap
console.log('\nStatic Pages:');
const pageUrls = [];
for (const page of staticPages) {
  const entries = createUrlEntry(page.path, page.freq, page.priority);
  pageUrls.push(...entries);
}
writeSitemap('pages.xml', pageUrls);
allSitemaps.push({ filename: 'pages.xml' });

// 4. Generate Sitemap Index
writeSitemapIndex(allSitemaps);

// Summary
const totalToolUrls = tools.length * locales.length;
const totalBlogUrls = blogPosts.length * locales.length;
const totalPageUrls = staticPages.length * locales.length;
const totalUrls = totalToolUrls + totalBlogUrls + totalPageUrls;

console.log(`\n=== Summary ===`);
console.log(`Tools: ${tools.length} tools × ${locales.length} locales = ${totalToolUrls} URLs`);
console.log(`Blog: ${blogPosts.length} posts × ${locales.length} locales = ${totalBlogUrls} URLs`);
console.log(`Pages: ${staticPages.length} pages × ${locales.length} locales = ${totalPageUrls} URLs`);
console.log(`Total: ${totalUrls} URLs in ${allSitemaps.length} sitemap files`);
console.log(`\nSitemap Index: https://viadreams.cc/sitemap-index.xml`);
