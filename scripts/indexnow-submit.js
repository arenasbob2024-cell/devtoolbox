/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = '18c23d4fa0c24bb2b5765783a90c0f4d';
const HOST = 'viadreams.cc';
// Active locales only (all others 301'd to /en/ via middleware)
const LOCALES = ['en', 'zh', 'ru'];

// Get all tool directories
const toolsDir = path.join(__dirname, '..', 'src', 'app', '[lang]', 'tools');
const toolIds = fs.readdirSync(toolsDir).filter(f => 
  fs.statSync(path.join(toolsDir, f)).isDirectory()
);

console.log(`Found ${toolIds.length} tools, ${LOCALES.length} locales`);

// Build URL list - homepage + tools for each locale
const urls = [];
LOCALES.forEach(lang => {
  urls.push(`https://${HOST}/${lang}`);
  urls.push(`https://${HOST}/${lang}/tools`);
  toolIds.forEach(toolId => {
    urls.push(`https://${HOST}/${lang}/tools/${toolId}`);
  });
});

console.log(`Total URLs to submit: ${urls.length}`);

// IndexNow API accepts max 10000 URLs per request
const BATCH_SIZE = 10000;
let submitted = 0;

// Push to all three IndexNow-compatible endpoints in parallel for redundancy.
// Bing and Yandex both accept IndexNow but their direct endpoints are usually
// faster than the central api.indexnow.org relay, especially for new domains.
const ENDPOINTS = ['api.indexnow.org', 'www.bing.com', 'yandex.com'];

function submitToEndpoint(endpoint, batch, batchNum) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: batch
    });

    const options = {
      hostname: endpoint,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`Batch ${batchNum} [${endpoint}]: HTTP ${res.statusCode} - ${batch.length} URLs`);
        resolve(res.statusCode);
      });
    });

    req.on('error', (e) => {
      console.error(`Batch ${batchNum} [${endpoint}] error:`, e.message);
      resolve(0);
    });

    req.write(body);
    req.end();
  });
}

async function submitBatch(batch, batchNum) {
  const results = await Promise.all(
    ENDPOINTS.map(ep => submitToEndpoint(ep, batch, batchNum))
  );
  if (results.some(c => c === 200 || c === 202)) {
    submitted += batch.length;
  }
}

async function main() {
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    await submitBatch(batch, batchNum);
  }
  console.log(`\nDone! Submitted ${submitted}/${urls.length} URLs to IndexNow (Bing + Yandex + relay)`);
}

main().catch(console.error);
