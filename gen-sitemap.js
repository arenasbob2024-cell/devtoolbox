const fs = require('fs');
const path = require('path');

const locales = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th'];
const BASE = 'https://viadreams.cc';
const date = new Date().toISOString().split('T')[0];

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

// Generate sitemap XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

function addUrl(urlPath, freq, priority) {
  for (const l of locales) {
    const url = urlPath ? `${BASE}/${l}/${urlPath}` : `${BASE}/${l}`;
    xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n`;
    for (const al of locales) {
      const alt = urlPath ? `${BASE}/${al}/${urlPath}` : `${BASE}/${al}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${al}" href="${alt}" />\n`;
    }
    xml += '  </url>\n';
  }
}

addUrl('', 'weekly', '1.0');
tools.forEach(t => addUrl('tools/' + t, 'monthly', '0.8'));
addUrl('blog', 'weekly', '0.7');
blogPosts.forEach(p => addUrl('blog/' + p, 'monthly', '0.6'));
addUrl('about', 'monthly', '0.3');
addUrl('privacy', 'monthly', '0.2');
xml += '</urlset>';

const totalUrls = locales.length * (tools.length + blogPosts.length + 4);
fs.writeFileSync('public/sitemap.xml', xml);
console.log(`Generated sitemap.xml with ${totalUrls} URLs (${locales.length} locales × ${tools.length} tools + ${blogPosts.length} blog posts + 4 pages)`);
