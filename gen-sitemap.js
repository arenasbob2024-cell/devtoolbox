const fs = require('fs');

// Dynamically read all locales and tools instead of hardcoding
const locales = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th'];

const tools = [
  'json-formatter','base64','url-encoder','hash-generator','uuid-generator',
  'timestamp-converter','color-converter','regex-tester','markdown-preview','jwt-decoder',
  'qrcode-generator','lorem-ipsum','html-entity','css-minifier','number-base',
  'text-diff','word-counter','password-generator','sql-formatter','cron-parser',
  'json-yaml','string-case','slug-generator','chmod-calculator','line-sorter',
  'js-html-formatter','image-base64','git-command-generator',
  'xml-formatter','csv-json','http-status','mime-types','escape-unescape',
  'ip-calculator','fake-data','hmac-generator','url-parser','binary-text',
  'pem-decoder','html-table','bcrypt-generator',
  // P0 new tools
  'json-to-typescript','html-to-jsx','json-to-go','svg-to-jsx','css-to-tailwind','typescript-to-javascript',
  // P1 new tools
  'json-to-graphql','json-to-java','json-to-kotlin','json-to-python','json-to-csharp',
  'markdown-to-html','html-to-markdown','toml-yaml',
  // P2 new tools
  'json-to-zod','json-to-json-schema','css-to-js','graphql-to-typescript','json-to-rust','xml-to-json',
];

const blogPosts = [
  'uuid-v4-vs-v7-vs-ulid-vs-nanoid',
  'cron-schedule-serverless-github-actions-vercel-cloudflare',
  'base64-encoding-real-world-uses',
  'regex-patterns-copy-paste-ready',
  'docker-compose-yaml-errors',
  // New blog posts for code conversion tools
  'json-to-typescript-complete-guide',
  'html-to-jsx-react-migration',
  'json-to-go-struct-guide',
  'css-to-tailwind-migration',
  'svg-optimization-react',
  'json-schema-validation-guide',
  'typescript-vs-javascript-when-to-convert',
  'graphql-type-generation',
];

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
console.log('Generated sitemap.xml with ' + totalUrls + ' URLs (' + locales.length + ' locales × ' + tools.length + ' tools + ' + blogPosts.length + ' blog posts + 4 pages)');
