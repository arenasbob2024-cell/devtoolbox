#!/usr/bin/env node
/**
 * Submit priority canonical URLs to IndexNow API.
 * Active locales only (en/zh/ru), canonical trailing-slash URLs, top tools first.
 *
 * Options:
 *   --dry-run       Print the canonical URL set without submitting.
 *   --no-preflight  Skip live HEAD checks before submitting.
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');

const HOST = 'viadreams.cc';
const KEY = process.env.INDEXNOW_KEY || '20f1b836f28044618a828be72fb2fdff';
const BASE = `https://${HOST}`;
const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const PREFLIGHT = !args.has('--no-preflight');

// Active locales only (all others are 301'd to /en/ via middleware)
const LOCALES = ['en', 'zh', 'ru'];

// Top priority tools for indexing (high-search-volume keywords)
const PRIORITY_TOOLS = [
  'json-formatter', 'base64', 'url-encoder', 'jwt-decoder', 'regex-tester',
  'uuid-generator', 'password-generator', 'hash-generator', 'timestamp-converter',
  'cron-parser', 'json-yaml', 'xml-formatter', 'csv-json', 'markdown-preview',
  'color-converter', 'ip-calculator', 'qrcode-generator', 'number-base',
  'string-case', 'text-diff', 'sql-formatter', 'html-entity', 'hmac-generator',
  'url-parser', 'http-status', 'image-base64', 'bcrypt-generator',
  'escape-unescape', 'fake-data', 'pem-decoder',
];

// Top priority blog posts
const PRIORITY_BLOG = [
  'ollama-guide', 'coolify-guide', 'github-actions-secrets-guide',
  'git-rebase-vs-merge-explained', 'rag-guide', 'langchain-guide',
  'vector-database-guide', 'cursor-vs-copilot-guide', 'caddy-server-guide',
  'docker-compose-cheat-sheet', 'nextjs-app-router-guide',
  'docker-volumes-bind-mounts-guide', 'css-nesting-native-2026',
  'yaml-multiline-string-block-folded', 'tailwind-v4-new-features',
  'tauri-guide', 'word-counter-online-guide',
];

const PRIORITY_CATEGORIES = [
  'json-tools',
  'css-tools',
  'converter-tools',
  'encoder-decoder-tools',
  'formatter-tools',
  'generator-tools',
  'text-tools',
  'web-tools',
  'image-tools',
  'security-tools',
  'devops-tools',
  'markdown-tools',
];

const urls = new Set();
// Homepages (most important)
for (const loc of LOCALES) urls.add(`${BASE}/${loc}/`);
// Tools
for (const tool of PRIORITY_TOOLS) {
  for (const loc of LOCALES) urls.add(`${BASE}/${loc}/tools/${tool}/`);
}
// Blog
for (const slug of PRIORITY_BLOG) {
  for (const loc of LOCALES) urls.add(`${BASE}/${loc}/blog/${slug}/`);
}
// Blog index
for (const loc of LOCALES) urls.add(`${BASE}/${loc}/blog/`);
// Category landing pages and media-kit funnel are useful monetization entry points.
for (const slug of PRIORITY_CATEGORIES) {
  for (const loc of LOCALES) urls.add(`${BASE}/${loc}/category/${slug}/`);
}
for (const loc of LOCALES) urls.add(`${BASE}/${loc}/advertise/`);

const allUrls = Array.from(urls).sort();

console.log(`Total canonical priority URLs: ${allUrls.length}`);

function requestStatus(url, method = 'HEAD') {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const req = https.request({
      hostname: parsed.hostname,
      path: `${parsed.pathname}${parsed.search}`,
      method,
      headers: { 'User-Agent': 'DevToolBox-IndexNow-Preflight/1.0' },
    }, (res) => {
      res.resume();
      res.on('end', () => resolve(res.statusCode || 0));
    });
    req.on('error', () => resolve(0));
    req.end();
  });
}

async function preflightUrls(candidateUrls, concurrency = 12) {
  const accepted = [];
  const rejected = [];
  let index = 0;

  async function worker() {
    while (index < candidateUrls.length) {
      const url = candidateUrls[index++];
      let status = await requestStatus(url);
      if (status === 405 || status === 403 || status === 0) {
        status = await requestStatus(url, 'GET');
      }

      if (status >= 200 && status < 300) {
        accepted.push(url);
      } else {
        rejected.push({ url, status });
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, candidateUrls.length) }, () => worker())
  );

  return {
    accepted: accepted.sort(),
    rejected: rejected.sort((a, b) => a.url.localeCompare(b.url)),
  };
}

function submit(endpoint, urlList) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList
    });
    const req = https.request({
      hostname: endpoint, path: '/indexnow', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(`[${endpoint}] ${res.statusCode} ${data.substring(0, 200)}`));
    });
    req.on('error', e => reject(`[${endpoint}] ERROR: ${e.message}`));
    req.write(body); req.end();
  });
}

(async () => {
  let urlsToSubmit = allUrls;

  if (PREFLIGHT) {
    const { accepted, rejected } = await preflightUrls(allUrls);
    urlsToSubmit = accepted;
    console.log(`Preflight accepted: ${accepted.length}`);
    console.log(`Preflight rejected: ${rejected.length}`);
    for (const item of rejected.slice(0, 20)) {
      console.log(`  - ${item.status} ${item.url}`);
    }
  }

  if (DRY_RUN) {
    for (const url of urlsToSubmit) console.log(url);
    return;
  }

  if (urlsToSubmit.length === 0) {
    console.log('No canonical URLs passed preflight; skipping IndexNow submission.');
    process.exitCode = 1;
    return;
  }

  for (const ep of ['api.indexnow.org', 'www.bing.com', 'yandex.com']) {
    try { console.log(await submit(ep, urlsToSubmit)); }
    catch (e) { console.log(e); }
  }
})();
