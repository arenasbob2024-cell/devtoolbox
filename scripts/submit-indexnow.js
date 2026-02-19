#!/usr/bin/env node

/**
 * Submit URLs to IndexNow API (Bing, Yandex, etc.)
 * Run: node scripts/submit-indexnow.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://viadreams.cc';
const KEY = '20f1b836f28044618a828be72fb2fdff';
const LOCALES = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th'];

// Parse tool paths
const toolsFile = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'tools.ts'), 'utf8');
const toolPaths = [];
const pathRegex = /path:\s*'([^']+)'/g;
let match;
while ((match = pathRegex.exec(toolsFile)) !== null) {
  toolPaths.push(match[1]);
}

// Parse blog slugs
const blogFile = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'blog-posts.ts'), 'utf8');
const blogSlugs = [];
const slugRegex = /slug:\s*'([^']+)'/g;
while ((match = slugRegex.exec(blogFile)) !== null) {
  blogSlugs.push(match[1]);
}

// Build all URLs
const urls = [];

// Homepages
for (const locale of LOCALES) {
  urls.push(`${BASE_URL}/${locale}`);
}

// Tool pages
for (const toolPath of toolPaths) {
  for (const locale of LOCALES) {
    urls.push(`${BASE_URL}/${locale}${toolPath}`);
  }
}

// Blog pages
for (const locale of LOCALES) {
  urls.push(`${BASE_URL}/${locale}/blog`);
}
for (const slug of blogSlugs) {
  for (const locale of LOCALES) {
    urls.push(`${BASE_URL}/${locale}/blog/${slug}`);
  }
}

console.log(`Total URLs to submit: ${urls.length}`);

// IndexNow API allows max 10,000 URLs per request
const BATCH_SIZE = 10000;

function submitBatch(urlBatch, batchNum, endpoint) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: 'viadreams.cc',
      key: KEY,
      keyLocation: `${BASE_URL}/${KEY}.txt`,
      urlList: urlBatch
    });

    const url = new URL(`https://${endpoint}/indexnow`);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`  [${endpoint}] Batch ${batchNum}: HTTP ${res.statusCode} ${data || '(empty)'}`);
        resolve(res.statusCode);
      });
    });

    req.on('error', (e) => {
      console.log(`  [${endpoint}] Batch ${batchNum}: ERROR ${e.message}`);
      resolve(-1);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  const endpoints = ['api.indexnow.org', 'www.bing.com', 'yandex.com'];

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    console.log(`\nSubmitting batch ${batchNum} (${batch.length} URLs)...`);

    for (const endpoint of endpoints) {
      await submitBatch(batch, batchNum, endpoint);
    }
  }

  console.log('\nDone! URLs submitted to IndexNow.');
}

main();
