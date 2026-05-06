#!/usr/bin/env node
/**
 * Submit priority canonical URLs to IndexNow API.
 * Active locales only (en/zh/ru), canonical trailing-slash URLs, top tools first.
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');

const HOST = 'viadreams.cc';
const KEY = '20f1b836f28044618a828be72fb2fdff';
const BASE = `https://${HOST}`;

// Active locales only (all others are 301'd to /en/ via middleware)
const LOCALES = ['en', 'zh', 'ru'];

// Top priority tools for indexing (high-search-volume keywords)
const PRIORITY_TOOLS = [
  'json-formatter', 'base64', 'url-encoder', 'jwt-decoder', 'regex-tester',
  'uuid-generator', 'password-generator', 'hash-generator', 'timestamp-converter',
  'cron-parser', 'json-yaml', 'xml-formatter', 'csv-json', 'markdown-preview',
  'color-converter', 'ip-calculator', 'qr-generator', 'number-base',
  'string-case', 'text-diff', 'sql-formatter', 'html-entity', 'hmac-generator',
  'url-parser', 'http-status', 'image-base64', 'bcrypt-generator',
  'escape-unescape', 'fake-data', 'pem-decoder',
];

// Top priority blog posts
const PRIORITY_BLOG = [
  'ollama-guide', 'coolify-guide', 'langchain-guide', 'rag-introduction',
  'vector-databases-guide', 'cursor-vs-copilot', 'caddy-web-server',
  'docker-compose-guide', 'git-cheatsheet', 'nextjs-app-router',
];

const urls = [];
// Homepages (most important)
for (const loc of LOCALES) urls.push(`${BASE}/${loc}/`);
// Tools
for (const tool of PRIORITY_TOOLS) {
  for (const loc of LOCALES) urls.push(`${BASE}/${loc}/tools/${tool}/`);
}
// Blog
for (const slug of PRIORITY_BLOG) {
  for (const loc of LOCALES) urls.push(`${BASE}/${loc}/blog/${slug}/`);
}
// Blog index
for (const loc of LOCALES) urls.push(`${BASE}/${loc}/blog/`);

console.log(`Total URLs: ${urls.length}`);

function submit(endpoint) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls
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
  for (const ep of ['api.indexnow.org', 'www.bing.com', 'yandex.com']) {
    try { console.log(await submit(ep)); }
    catch (e) { console.log(e); }
  }
})();
