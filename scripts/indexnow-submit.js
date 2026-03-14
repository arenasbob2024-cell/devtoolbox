const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = '18c23d4fa0c24bb2b5765783a90c0f4d';
const HOST = 'viadreams.cc';
const LOCALES = ['en','fr','de','it','es','pt','nl','pl','sv','no','zh','ja','ko','id','th'];

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

function submitBatch(batch, batchNum) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: batch
    });

    const options = {
      hostname: 'api.indexnow.org',
      path: '/IndexNow',
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
        console.log(`Batch ${batchNum}: HTTP ${res.statusCode} - ${batch.length} URLs`);
        if (res.statusCode === 200 || res.statusCode === 202) {
          submitted += batch.length;
        }
        resolve(res.statusCode);
      });
    });

    req.on('error', (e) => {
      console.error(`Batch ${batchNum} error:`, e.message);
      reject(e);
    });

    req.write(body);
    req.end();
  });
}

async function main() {
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    await submitBatch(batch, batchNum);
  }
  console.log(`\nDone! Submitted ${submitted}/${urls.length} URLs to IndexNow`);
}

main().catch(console.error);
