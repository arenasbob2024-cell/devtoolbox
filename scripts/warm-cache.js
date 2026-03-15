#!/usr/bin/env node

/**
 * Warm ISR cache by sending HEAD requests to all sitemap URLs.
 * Run after deployment: node scripts/warm-cache.js
 *
 * This ensures all pages are pre-rendered in the ISR cache
 * before Googlebot visits them, improving indexing speed.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://viadreams.cc';
const CONCURRENCY = 5; // parallel requests
const DELAY_MS = 200; // delay between batches to avoid overloading

const sitemapsDir = path.join(__dirname, '..', 'public', 'sitemaps');

function extractUrls(xmlContent) {
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }
  // Deduplicate (xhtml:link hrefs also have URLs)
  return [...new Set(urls)];
}

function warmUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', timeout: 10000 }, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ url, status: 'error', error: err.message });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'timeout' });
    });
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Read all sitemap XML files
  const files = fs.readdirSync(sitemapsDir).filter(f => f.endsWith('.xml'));
  console.log(`Found ${files.length} sitemap files`);

  let allUrls = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(sitemapsDir, file), 'utf8');
    const urls = extractUrls(content);
    allUrls.push(...urls);
  }

  // Deduplicate
  allUrls = [...new Set(allUrls)];
  console.log(`Total unique URLs to warm: ${allUrls.length}`);

  let success = 0;
  let errors = 0;
  let redirects = 0;

  for (let i = 0; i < allUrls.length; i += CONCURRENCY) {
    const batch = allUrls.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(warmUrl));

    for (const r of results) {
      if (r.status === 200) success++;
      else if (r.status >= 300 && r.status < 400) redirects++;
      else errors++;
    }

    const progress = Math.min(i + CONCURRENCY, allUrls.length);
    process.stdout.write(`\r  Progress: ${progress}/${allUrls.length} (${success} ok, ${redirects} redirect, ${errors} error)`);

    if (i + CONCURRENCY < allUrls.length) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n\nCache warming complete:`);
  console.log(`  Success: ${success}`);
  console.log(`  Redirects: ${redirects}`);
  console.log(`  Errors: ${errors}`);

  if (redirects > 0) {
    console.log(`\n⚠️  ${redirects} URLs returned redirects - these should be removed from sitemaps`);
  }
}

main().catch(console.error);
