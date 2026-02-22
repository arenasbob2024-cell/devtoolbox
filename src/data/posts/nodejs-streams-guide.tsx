'use client';

import Link from 'next/link';

export default function NodejsStreamsGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>Node.js Streams: The Complete Guide to Efficient Data Processing</h2>
      <p>
        Streams are one of the most powerful yet underutilized features in Node.js. They allow you to process data piece by piece without loading entire files or payloads into memory. Whether you are building a file upload service, a log processor, or an API that handles large responses, understanding streams is essential for writing performant Node.js applications.
      </p>
      <p>
        This guide covers all four stream types, the pipeline API, backpressure handling, and real-world patterns you can apply immediately.
      </p>

      <h2>Why Use Streams?</h2>
      <p>
        Consider reading a 2GB log file. Without streams, you would need to load the entire file into memory before processing it. With streams, you process chunks as they arrive, keeping memory usage constant regardless of file size.
      </p>
      <pre><code className="language-javascript">{`// WITHOUT streams: loads entire file into memory
const fs = require('fs');
const data = fs.readFileSync('huge-file.log', 'utf8'); // 2GB in memory!
const lines = data.split('\\n').filter(line => line.includes('ERROR'));

// WITH streams: processes line by line, constant memory
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const rl = createInterface({
  input: createReadStream('huge-file.log'),
  crlfDelay: Infinity,
});

const errors = [];
for await (const line of rl) {
  if (line.includes('ERROR')) errors.push(line);
}`}</code></pre>

      <h2>The Four Stream Types</h2>
      <p>
        Node.js provides four fundamental stream types, each serving a specific purpose in data flow.
      </p>
      <table>
        <thead>
          <tr><th>Type</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Readable</strong></td><td>Source of data</td><td>fs.createReadStream, http request</td></tr>
          <tr><td><strong>Writable</strong></td><td>Destination for data</td><td>fs.createWriteStream, http response</td></tr>
          <tr><td><strong>Transform</strong></td><td>Modifies data in transit</td><td>zlib.createGzip, crypto.createCipher</td></tr>
          <tr><td><strong>Duplex</strong></td><td>Both readable and writable</td><td>net.Socket, WebSocket</td></tr>
        </tbody>
      </table>

      <h2>Readable Streams</h2>
      <p>
        Readable streams are data sources. They operate in two modes: flowing (data is pushed automatically) and paused (you must call <code>.read()</code> explicitly). Modern Node.js code uses the <code>for await...of</code> syntax or the pipeline API.
      </p>
      <pre><code className="language-javascript">{`const { Readable } = require('stream');

// Creating a custom Readable stream
class CounterStream extends Readable {
  constructor(max) {
    super({ objectMode: true });
    this.current = 0;
    this.max = max;
  }

  _read() {
    if (this.current < this.max) {
      this.push({ count: this.current++ });
    } else {
      this.push(null); // Signal end of stream
    }
  }
}

// Using it
const counter = new CounterStream(5);
for await (const chunk of counter) {
  console.log(chunk); // { count: 0 }, { count: 1 }, ...
}`}</code></pre>

      <h3>Readable.from() Helper</h3>
      <pre><code className="language-javascript">{`const { Readable } = require('stream');

// Create a readable stream from an iterable
const stream = Readable.from(['hello', ' ', 'world', '\\n']);

// From an async generator
async function* generateData() {
  for (let i = 0; i < 100; i++) {
    yield JSON.stringify({ id: i, timestamp: Date.now() }) + '\\n';
    await new Promise(r => setTimeout(r, 10));
  }
}

const dataStream = Readable.from(generateData());`}</code></pre>

      <h2>Writable Streams</h2>
      <p>
        Writable streams are data destinations. They handle backpressure automatically by returning <code>false</code> from <code>.write()</code> when the internal buffer is full.
      </p>
      <pre><code className="language-javascript">{`const { Writable } = require('stream');

class LogWriter extends Writable {
  constructor(options) {
    super(options);
    this.lineCount = 0;
  }

  _write(chunk, encoding, callback) {
    const line = chunk.toString();
    this.lineCount++;
    // Simulate async write (e.g., to database)
    process.nextTick(() => {
      console.log(\`[\${this.lineCount}] \${line.trim()}\`);
      callback(); // Signal that we're ready for more data
    });
  }

  _final(callback) {
    console.log(\`Total lines processed: \${this.lineCount}\`);
    callback();
  }
}`}</code></pre>

      <h2>Transform Streams</h2>
      <p>
        Transform streams sit between readable and writable streams, modifying data as it flows through. They are the most commonly created custom stream type.
      </p>
      <pre><code className="language-javascript">{`const { Transform } = require('stream');

// CSV to JSON transform
class CsvToJson extends Transform {
  constructor() {
    super({ objectMode: true });
    this.headers = null;
    this.buffer = '';
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();
    const lines = this.buffer.split('\\n');
    this.buffer = lines.pop(); // Keep incomplete last line

    for (const line of lines) {
      if (!line.trim()) continue;
      const values = line.split(',').map(v => v.trim());

      if (!this.headers) {
        this.headers = values;
        continue;
      }

      const obj = {};
      this.headers.forEach((h, i) => { obj[h] = values[i]; });
      this.push(JSON.stringify(obj) + '\\n');
    }
    callback();
  }

  _flush(callback) {
    if (this.buffer.trim() && this.headers) {
      const values = this.buffer.split(',').map(v => v.trim());
      const obj = {};
      this.headers.forEach((h, i) => { obj[h] = values[i]; });
      this.push(JSON.stringify(obj) + '\\n');
    }
    callback();
  }
}`}</code></pre>

      <h2>The Pipeline API</h2>
      <p>
        The <code>stream.pipeline()</code> function is the recommended way to connect streams. It handles errors, cleanup, and backpressure automatically — unlike <code>.pipe()</code> which can leak resources on errors.
      </p>
      <pre><code className="language-javascript">{`const { pipeline } = require('stream/promises');
const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');
const { Transform } = require('stream');

// Compress a file with a filter transform
const filterErrors = new Transform({
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\\n');
    const errorLines = lines.filter(l => l.includes('ERROR'));
    callback(null, errorLines.join('\\n'));
  }
});

async function compressErrorLog() {
  await pipeline(
    createReadStream('app.log'),
    filterErrors,
    createGzip(),
    createWriteStream('errors.log.gz')
  );
  console.log('Pipeline completed successfully');
}

compressErrorLog().catch(console.error);`}</code></pre>

      <h2>Backpressure</h2>
      <p>
        Backpressure occurs when a writable stream cannot process data as fast as a readable stream produces it. Without proper handling, this causes memory to grow unboundedly. The pipeline API handles this automatically, but understanding the mechanism is important.
      </p>
      <pre><code className="language-javascript">{`const { Readable, Writable } = require('stream');

// Manual backpressure handling (educational)
const fast = new Readable({
  read() {
    this.push(Buffer.alloc(1024 * 1024)); // 1MB chunks
  }
});

const slow = new Writable({
  highWaterMark: 1024 * 1024 * 16, // 16MB buffer
  write(chunk, encoding, callback) {
    // Simulate slow consumer
    setTimeout(callback, 100);
  }
});

// .pipe() handles backpressure by pausing the readable
// when the writable buffer is full
fast.pipe(slow);

// With pipeline() — same behavior plus error handling
// pipeline(fast, slow).catch(console.error);`}</code></pre>

      <h2>Real-World Patterns</h2>

      <h3>HTTP File Upload with Progress</h3>
      <pre><code className="language-javascript">{`const http = require('http');
const { pipeline } = require('stream/promises');
const { createWriteStream } = require('fs');
const { Transform } = require('stream');

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') return res.end('POST only');

  const totalSize = parseInt(req.headers['content-length'], 10);
  let uploaded = 0;

  const progress = new Transform({
    transform(chunk, enc, cb) {
      uploaded += chunk.length;
      const pct = ((uploaded / totalSize) * 100).toFixed(1);
      process.stdout.write(\`\\rUploaded: \${pct}%\`);
      cb(null, chunk);
    }
  });

  try {
    await pipeline(req, progress, createWriteStream('upload.bin'));
    res.end('Upload complete');
  } catch (err) {
    res.statusCode = 500;
    res.end('Upload failed');
  }
});`}</code></pre>

      <h3>Streaming JSON Processing</h3>
      <pre><code className="language-javascript">{`const { pipeline } = require('stream/promises');
const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('stream');

// Process NDJSON (newline-delimited JSON) without loading all into memory
const processRecords = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\\n').filter(Boolean);
    for (const line of lines) {
      try {
        const record = JSON.parse(line);
        if (record.status === 'active') {
          record.processedAt = new Date().toISOString();
          this.push(JSON.stringify(record) + '\\n');
        }
      } catch (e) { /* skip invalid lines */ }
    }
    callback();
  }
});

pipeline(
  createReadStream('users.ndjson'),
  processRecords,
  createWriteStream('active-users.ndjson')
).then(() => console.log('Done'));`}</code></pre>

      <h2>Stream Performance Tips</h2>
      <ul>
        <li><strong>Set highWaterMark appropriately</strong>: Default is 16KB for byte streams, 16 objects for objectMode. Increase for throughput, decrease for lower latency.</li>
        <li><strong>Use pipeline(), not pipe()</strong>: pipeline handles cleanup on errors. pipe() leaks resources when errors occur mid-stream.</li>
        <li><strong>Prefer objectMode for structured data</strong>: Avoids repeated serialization/deserialization between transforms.</li>
        <li><strong>Use Readable.from() for iterables</strong>: Cleaner than creating custom Readable classes for simple data sources.</li>
        <li><strong>Avoid synchronous transforms</strong>: Always call callback asynchronously to prevent blocking the event loop.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Streams are the key to building scalable Node.js applications that handle large volumes of data efficiently. The pipeline API, combined with custom Transform streams, gives you a composable architecture for data processing that scales from kilobytes to terabytes without changing your memory profile.
      </p>
      <p>
        Start by replacing <code>fs.readFileSync</code> calls with streams in your existing code — you will see immediate improvements in memory usage and responsiveness.
      </p>

      <p>
        Explore related tools at <Link href={`/${lang}/tools`}>DevToolBox</Link> — try
        our <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> or <Link href={`/${lang}/tools/text-diff`}>Text Diff</Link> tool.
      </p>
    </>
  );
}
