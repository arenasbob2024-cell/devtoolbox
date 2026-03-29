#!/usr/bin/env node
/**
 * Update the sitemap generator to include category pages,
 * then regenerate all sitemaps.
 */

const fs = require('fs');
const path = require('path');

const BASE = '/var/www/devtoolbox';
const scriptPath = path.join(BASE, 'scripts/generate-static-sitemap.js');

let script = fs.readFileSync(scriptPath, 'utf-8');

// Check if category pages are already included
if (script.includes('category')) {
  console.log('Category pages already in sitemap generator');
} else {
  // Add category pages before blog sitemaps section
  const categoryBlock = `
// Category hub pages
const categorySlugs = [
  'json-tools', 'css-tools', 'converter-tools', 'encoder-decoder-tools',
  'formatter-tools', 'generator-tools', 'text-tools', 'web-tools',
  'image-tools', 'security-tools', 'devops-tools', 'markdown-tools',
];
const categoryUrls = categorySlugs.map(slug => buildUrlEntry('/category/' + slug, 0.7, 'weekly')).join('\\n');
const categoryFileName = 'categories.xml';
fs.writeFileSync(path.join(sitemapsDir, categoryFileName), buildSitemap(categoryUrls));
sitemapFiles.push('sitemaps/' + categoryFileName);

`;

  // Insert before "// Blog post sitemaps"
  script = script.replace('// Blog post sitemaps', categoryBlock + '// Blog post sitemaps');

  // Update total URL count to include categories
  script = script.replace(
    'const totalUrls = (2 + toolPaths.length + blogSlugs.length) * LOCALES.length;',
    'const totalUrls = (2 + toolPaths.length + blogSlugs.length + categorySlugs.length) * LOCALES.length;'
  );

  fs.writeFileSync(scriptPath, script);
  console.log('✅ Sitemap generator updated with category pages');
}

console.log('\nNow regenerating sitemaps...');
