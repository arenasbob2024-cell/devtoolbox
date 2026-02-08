const fs = require('fs');
const locales = ['en','fr','de','it','es','zh','id','th'];
const tools = ['json-formatter','base64','url-encoder','hash-generator','uuid-generator','timestamp-converter','color-converter','regex-tester','markdown-preview','jwt-decoder','qrcode-generator','lorem-ipsum','html-entity','css-minifier','number-base','text-diff','word-counter','password-generator','sql-formatter','cron-parser','json-yaml','string-case','slug-generator','chmod-calculator','line-sorter'];
const blogPosts = ['uuid-v4-vs-v7-vs-ulid-vs-nanoid','cron-schedule-serverless-github-actions-vercel-cloudflare','base64-encoding-real-world-uses','regex-patterns-copy-paste-ready','docker-compose-yaml-errors'];
const BASE = 'https://viadreams.cc';
const date = new Date().toISOString().split('T')[0];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

function addUrl(path, freq, priority) {
  for (const l of locales) {
    const url = path ? `${BASE}/${l}/${path}` : `${BASE}/${l}`;
    xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n`;
    for (const al of locales) {
      const alt = path ? `${BASE}/${al}/${path}` : `${BASE}/${al}`;
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
console.log('Generated sitemap.xml with ' + totalUrls + ' URLs');
