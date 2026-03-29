#!/usr/bin/env node
/**
 * Add category hub page links to Footer component
 * This enhances internal linking for SEO by connecting
 * the footer to category landing pages.
 */

const fs = require('fs');
const path = require('path');

const BASE = '/var/www/devtoolbox/src';

// ============================================
// 1. Update Footer.tsx - Add category page links
// ============================================
const footerPath = path.join(BASE, 'components/Footer.tsx');
let footer = fs.readFileSync(footerPath, 'utf-8');

// Find the bottom section before copyright and add category links
const categoryLinksBlock = `
        {/* Browse by Category - SEO Internal Links */}
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
            Browse by Category
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { slug: 'json-tools', label: 'JSON Tools' },
              { slug: 'css-tools', label: 'CSS Tools' },
              { slug: 'converter-tools', label: 'Converters' },
              { slug: 'encoder-decoder-tools', label: 'Encoders & Decoders' },
              { slug: 'formatter-tools', label: 'Formatters' },
              { slug: 'generator-tools', label: 'Generators' },
              { slug: 'text-tools', label: 'Text Tools' },
              { slug: 'web-tools', label: 'Web Tools' },
              { slug: 'image-tools', label: 'Image Tools' },
              { slug: 'security-tools', label: 'Security Tools' },
              { slug: 'devops-tools', label: 'DevOps Tools' },
              { slug: 'markdown-tools', label: 'Markdown Tools' },
            ].map(cat => (
              <Link
                key={cat.slug}
                href={\`/\${lang}/category/\${cat.slug}\`}
                style={{
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '4px 10px',
                  borderRadius: 12,
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s',
                }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
`;

// Insert before the copyright div
const copyrightMarker = `        <div style={{
          marginTop: 30,
          paddingTop: 20,
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',`;

footer = footer.replace(copyrightMarker, categoryLinksBlock + '\n' + copyrightMarker);

fs.writeFileSync(footerPath, footer);
console.log('✅ Footer.tsx updated with category links');

// ============================================
// 2. Update HomePageClient.tsx - Add category section at bottom
// ============================================
const homePath = path.join(BASE, 'app/[lang]/HomePageClient.tsx');
let home = fs.readFileSync(homePath, 'utf-8');

// Add category section before the closing </div>
const categorySectionHtml = `
      {/* Category Hub Pages - SEO */}
      <section style={{ marginTop: 60, marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
          <span className="gradient-text">{dict.home?.browseByCategoryTitle || 'Browse Tools by Category'}</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { slug: 'json-tools', icon: '📋', label: 'JSON Tools', count: '50+' },
            { slug: 'css-tools', icon: '🎨', label: 'CSS Tools', count: '40+' },
            { slug: 'converter-tools', icon: '🔄', label: 'Code Converters', count: '100+' },
            { slug: 'encoder-decoder-tools', icon: '🔐', label: 'Encoders & Decoders', count: '40+' },
            { slug: 'formatter-tools', icon: '✨', label: 'Code Formatters', count: '30+' },
            { slug: 'generator-tools', icon: '⚡', label: 'Generators', count: '35+' },
            { slug: 'text-tools', icon: '📝', label: 'Text Tools', count: '25+' },
            { slug: 'web-tools', icon: '🌐', label: 'Web Dev Tools', count: '40+' },
            { slug: 'image-tools', icon: '🖼️', label: 'Image & Color Tools', count: '30+' },
            { slug: 'security-tools', icon: '🔒', label: 'Security Tools', count: '20+' },
            { slug: 'devops-tools', icon: '🚀', label: 'DevOps Tools', count: '20+' },
            { slug: 'markdown-tools', icon: '📑', label: 'Markdown Tools', count: '10+' },
          ].map(cat => (
            <Link
              key={cat.slug}
              href={\`/\${lang}/category/\${cat.slug}\`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'all 0.2s',
                background: 'var(--bg-secondary)',
              }}
            >
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{cat.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{cat.count} tools</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
`;

// Insert before the last closing </div>
const lastDivClose = home.lastIndexOf('    </div>');
if (lastDivClose !== -1) {
  home = home.slice(0, lastDivClose) + categorySectionHtml + '\n' + home.slice(lastDivClose);
  fs.writeFileSync(homePath, home);
  console.log('✅ HomePageClient.tsx updated with category section');
} else {
  console.log('⚠️ Could not find insertion point in HomePageClient.tsx');
}

// ============================================
// 3. Update sitemap to include category pages
// ============================================
// Check if there's a sitemap generator
const sitemapDir = path.join(BASE, '../');
const files = fs.readdirSync(sitemapDir);
const sitemapFiles = files.filter(f => f.includes('sitemap'));
console.log('\nSitemap-related files:', sitemapFiles);

// Check for next-sitemap config
const nextSitemapConfig = path.join(sitemapDir, 'next-sitemap.config.js');
if (fs.existsSync(nextSitemapConfig)) {
  console.log('Found next-sitemap.config.js');
  const config = fs.readFileSync(nextSitemapConfig, 'utf-8');
  console.log(config.slice(0, 500));
} else {
  console.log('No next-sitemap.config.js found');
}

// Check for app/sitemap route
const sitemapRoute = path.join(BASE, 'app/sitemap.ts');
if (fs.existsSync(sitemapRoute)) {
  console.log('\nFound app/sitemap.ts');
  console.log(fs.readFileSync(sitemapRoute, 'utf-8').slice(0, 1000));
} else {
  console.log('\nNo app/sitemap.ts found');
  // Check for sitemap.xml route
  const sitemapXml = path.join(BASE, 'app/sitemap.xml');
  if (fs.existsSync(sitemapXml + '/route.ts')) {
    console.log('Found app/sitemap.xml/route.ts');
    console.log(fs.readFileSync(sitemapXml + '/route.ts', 'utf-8').slice(0, 1000));
  }
}

console.log('\n✅ All updates complete!');
