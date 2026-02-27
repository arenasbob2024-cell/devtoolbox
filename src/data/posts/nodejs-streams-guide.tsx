'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Node.js Streams Guide: Readable, Writable, Transform, Duplex, Pipeline, Backpressure & Performance',
    description: 'Master Node.js Streams: Readable, Writable, Transform, Duplex, and PassThrough streams. Learn pipeline API, backpressure handling, object mode, async iterators, HTTP streaming, file streaming, Web Streams API compatibility, and real-world patterns for CSV processing, log parsing, and high-performance data transformation.',
    tldr: 'Node.js Streams process data in chunks rather than loading everything into memory, making them essential for handling large files, HTTP requests, and real-time data. The four stream types (Readable, Writable, Transform, Duplex) compose via pipe() or the pipeline() API which handles error propagation and cleanup. Backpressure is automatic when using pipe but requires manual drain event handling with write(). Object mode streams process JavaScript objects instead of buffers. Async iterators (for await...of) provide the cleanest consumption pattern. The Web Streams API is available in Node.js for cross-platform compatibility.',
    tldrZh: 'Node.js Streams process data in chunks rather than loading everything into memory, making them essential for handling large files, HTTP requests, and real-time data. The four stream types (Readable, Writable, Transform, Duplex) compose via pipe() or the pipeline() API which handles error propagation and cleanup. Backpressure is automatic when using pipe but requires manual drain event handling with write(). Object mode streams process JavaScript objects instead of buffers. Async iterators (for await...of) provide the cleanest consumption pattern. The Web Streams API is available in Node.js for cross-platform compatibility.',
  },
  zh: {
    title: 'Node.js Streams 指南：Readable、Writable、Transform、Duplex、Pipeline、背压与性能',
    description: '全面掌握 Node.js Streams：Readable、Writable、Transform、Duplex 和 PassThrough 流。学习 pipeline API、背压处理、对象模式、异步迭代器、HTTP 流式传输、文件流、Web Streams API 兼容性，以及 CSV 处理、日志解析和高性能数据转换的实战模式。',
    tldr: 'Node.js Streams 以块为单位处理数据，而非将所有内容加载到内存中，这对处理大文件、HTTP 请求和实时数据至关重要。四种流类型（Readable、Writable、Transform、Duplex）通过 pipe() 或 pipeline() API 组合，后者自动处理错误传播和清理。使用 pipe 时背压自动处理，但 write() 需要手动处理 drain 事件。对象模式流处理 JavaScript 对象而非缓冲区。异步迭代器（for await...of）提供最简洁的消费模式。Web Streams API 在 Node.js 中可用，支持跨平台兼容。',
    tldrZh: 'Node.js Streams 以块为单位处理数据，而非将所有内容加载到内存中，这对处理大文件、HTTP 请求和实时数据至关重要。四种流类型（Readable、Writable、Transform、Duplex）通过 pipe() 或 pipeline() API 组合，后者自动处理错误传播和清理。使用 pipe 时背压自动处理，但 write() 需要手动处理 drain 事件。对象模式流处理 JavaScript 对象而非缓冲区。异步迭代器（for await...of）提供最简洁的消费模式。Web Streams API 在 Node.js 中可用，支持跨平台兼容。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the four types of Node.js streams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Node.js has four fundamental stream types: Readable (source of data, e.g., fs.createReadStream), Writable (destination for data, e.g., fs.createWriteStream), Transform (modifies data as it passes through, e.g., zlib.createGzip), and Duplex (both readable and writable independently, e.g., net.Socket). There is also PassThrough, a trivial Transform that passes data unchanged.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is backpressure in Node.js streams and how do you handle it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Backpressure occurs when a writable stream cannot process data as fast as it receives it. When writable.write() returns false, you must pause writing and wait for the drain event before resuming. The pipe() method and pipeline() API handle backpressure automatically. Ignoring backpressure leads to excessive memory usage and potential crashes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between pipe() and pipeline() in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'pipe() chains streams together but does not propagate errors or clean up resources automatically. If a mid-chain stream errors, the source keeps reading and may leak memory. pipeline() (from stream/promises or stream module) propagates errors to all streams, destroys all streams on error, and supports a callback or promise for completion. Always prefer pipeline() in production code.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do async iterators work with Node.js streams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Readable streams implement the async iterable protocol, so you can consume them with for await...of loops. This is the cleanest way to read from a stream: for await (const chunk of readableStream) { process(chunk); }. The loop handles backpressure automatically and the stream is destroyed when the loop exits via break or throw.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is object mode in Node.js streams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'By default, streams operate on Buffer or string data. Object mode (objectMode: true) allows streams to process any JavaScript value (objects, arrays, numbers). Object mode is useful for processing structured data like parsed JSON records, database rows, or CSV lines. The highWaterMark in object mode counts objects rather than bytes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you stream large files in Node.js without running out of memory?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use fs.createReadStream() to read the file in chunks and pipe it to a writable destination. For example: pipeline(fs.createReadStream("large.csv"), transformStream, fs.createWriteStream("output.csv")). This processes the file chunk by chunk with constant memory usage regardless of file size. Never use fs.readFileSync() or fs.readFile() for large files.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you handle errors in Node.js stream pipelines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the pipeline() function which propagates errors to all streams in the chain and calls a single callback on completion or error. With the promise version (from stream/promises), wrap it in try/catch. Also listen for error events on individual streams when using pipe(). Always handle stream errors to avoid unhandled exceptions crashing the process.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Web Streams API in Node.js and how does it differ from Node streams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Web Streams API (ReadableStream, WritableStream, TransformStream) is the WHATWG standard available in Node.js, browsers, Deno, and workers. Node streams are more feature-rich with pipe(), pipeline(), and better backpressure. Web Streams are more portable across runtimes. Node.js provides Readable.toWeb() and Readable.fromWeb() for conversion between the two APIs.',
      },
    },
  ],
};

export default function NodejsStreamsGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '24px',
    fontSize: '0.9rem',
  };

  const thStyle: React.CSSProperties = {
    background: '#f1f5f9',
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '2px solid #e2e8f0',
    color: '#1e293b',
  };

  const tdStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
  };

  const tipBoxStyle: React.CSSProperties = {
    background: '#fefce8',
    borderLeft: '4px solid #eab308',
    padding: '14px 18px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: '#713f12',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>
        {t.title}
      </h1>
      <p style={pStyle}>{t.description}</p>

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1', fontSize: '1.05rem' }}>
          TL;DR
        </strong>
        {isZh ? t.tldrZh : t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#1e293b', fontSize: '1.05rem' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ ...ulStyle, marginTop: '8px', marginBottom: '0' }}>
          <li>{isZh ? 'Streams 以块为单位处理数据，内存占用恒定，与文件大小无关' : 'Streams process data chunk by chunk with constant memory usage regardless of file size'}</li>
          <li>{isZh ? '优先使用 pipeline() 而非 pipe()——它自动处理错误传播和流清理' : 'Prefer pipeline() over pipe() — it handles error propagation and stream cleanup automatically'}</li>
          <li>{isZh ? '背压是关键概念：当 write() 返回 false 时暂停写入并等待 drain 事件' : 'Backpressure is the key concept: pause writing when write() returns false and wait for the drain event'}</li>
          <li>{isZh ? '异步迭代器（for await...of）是消费 Readable 流的最简洁方式' : 'Async iterators (for await...of) are the cleanest way to consume Readable streams'}</li>
          <li>{isZh ? '对象模式让流处理结构化数据而非原始缓冲区' : 'Object mode lets streams process structured data instead of raw buffers'}</li>
          <li>{isZh ? 'Transform 流是构建数据处理管道的基础组件' : 'Transform streams are the building blocks for data processing pipelines'}</li>
          <li>{isZh ? 'Web Streams API 在 Node.js 中可用，实现跨运行时兼容' : 'Web Streams API is available in Node.js for cross-runtime compatibility'}</li>
        </ul>
      </div>

      {/* 1. Stream Fundamentals */}
      <h2 style={h2Style}>{isZh ? '1. Stream 基础概念' : '1. Stream Fundamentals'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Node.js 中的 Stream 是处理流式数据的抽象接口。它们不会一次性将所有数据加载到内存中，而是以小块的方式逐步处理。这使得处理数 GB 甚至数 TB 的数据成为可能，而内存占用仅需几 MB。'
          : 'Streams in Node.js are abstract interfaces for working with streaming data. Instead of loading all data into memory at once, they process it in small chunks incrementally. This makes it possible to handle gigabytes or even terabytes of data with only a few megabytes of memory.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '流类型' : 'Stream Type'}</th>
            <th style={thStyle}>{isZh ? '描述' : 'Description'}</th>
            <th style={thStyle}>{isZh ? '常见示例' : 'Common Examples'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><code style={inlineCodeStyle}>Readable</code></td>
            <td style={tdStyle}>{isZh ? '数据来源，可以读取数据' : 'Source of data you can read from'}</td>
            <td style={tdStyle}>fs.createReadStream, http.IncomingMessage, process.stdin</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={inlineCodeStyle}>Writable</code></td>
            <td style={tdStyle}>{isZh ? '数据目标，可以写入数据' : 'Destination for data you can write to'}</td>
            <td style={tdStyle}>fs.createWriteStream, http.ServerResponse, process.stdout</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={inlineCodeStyle}>Transform</code></td>
            <td style={tdStyle}>{isZh ? '数据通过时进行修改' : 'Modifies data as it passes through'}</td>
            <td style={tdStyle}>zlib.createGzip, crypto.createCipher</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={inlineCodeStyle}>Duplex</code></td>
            <td style={tdStyle}>{isZh ? '独立的可读和可写端' : 'Independent readable and writable sides'}</td>
            <td style={tdStyle}>net.Socket, WebSocket</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={inlineCodeStyle}>PassThrough</code></td>
            <td style={tdStyle}>{isZh ? '不修改数据直接传递' : 'Passes data through without modification'}</td>
            <td style={tdStyle}>{isZh ? '测试、监控、流分支' : 'Testing, monitoring, stream teeing'}</td>
          </tr>
        </tbody>
      </table>

      {/* 2. Creating Custom Streams */}
      <h2 style={h2Style}>{isZh ? '2. 创建自定义流' : '2. Creating Custom Streams'}</h2>

      <h3 style={h3Style}>{isZh ? 'Readable 流' : 'Readable Stream'}</h3>
      <p style={pStyle}>
        {isZh
          ? '自定义 Readable 流需要实现 _read() 方法。当消费者请求更多数据时，Node.js 调用此方法。使用 this.push() 发送数据块，push(null) 表示流结束。'
          : 'Custom Readable streams implement the _read() method. Node.js calls this method when the consumer requests more data. Use this.push() to send chunks, and push(null) to signal the end of the stream.'}
      </p>
      <pre style={preStyle}><code>{'const { Readable } = require(\'stream\');\n\n'
        + 'class CounterStream extends Readable {\n'
        + '  constructor(max) {\n'
        + '    super(); // default: Buffer mode\n'
        + '    this.max = max;\n'
        + '    this.current = 0;\n'
        + '  }\n\n'
        + '  _read() {\n'
        + '    if (this.current <= this.max) {\n'
        + '      this.push(String(this.current++) + \'\\n\');\n'
        + '    } else {\n'
        + '      this.push(null); // signal end of stream\n'
        + '    }\n'
        + '  }\n'
        + '}\n\n'
        + 'const counter = new CounterStream(5);\n'
        + 'counter.pipe(process.stdout);\n'
        + '// Output: 0 1 2 3 4 5'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Writable 流' : 'Writable Stream'}</h3>
      <pre style={preStyle}><code>{'const { Writable } = require(\'stream\');\n\n'
        + 'class LogWriter extends Writable {\n'
        + '  _write(chunk, encoding, callback) {\n'
        + '    const line = chunk.toString().trim();\n'
        + '    const timestamp = new Date().toISOString();\n'
        + '    console.log(`[\\${timestamp}] \\${line}`);\n'
        + '    callback(); // signal done, ready for next chunk\n'
        + '  }\n\n'
        + '  _final(callback) {\n'
        + '    console.log(\'--- Log stream closed ---\');\n'
        + '    callback();\n'
        + '  }\n'
        + '}\n\n'
        + 'const logger = new LogWriter();\n'
        + 'logger.write(\'Server started\\n\');\n'
        + 'logger.end(\'Shutdown complete\\n\');'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Transform 流' : 'Transform Stream'}</h3>
      <pre style={preStyle}><code>{'const { Transform } = require(\'stream\');\n\n'
        + 'class UpperCaseTransform extends Transform {\n'
        + '  _transform(chunk, encoding, callback) {\n'
        + '    this.push(chunk.toString().toUpperCase());\n'
        + '    callback();\n'
        + '  }\n\n'
        + '  _flush(callback) {\n'
        + '    // Called once at end — use for final cleanup\n'
        + '    this.push(\'\\n--- END ---\\n\');\n'
        + '    callback();\n'
        + '  }\n'
        + '}\n\n'
        + '// Usage: stdin → uppercase → stdout\n'
        + 'process.stdin\n'
        + '  .pipe(new UpperCaseTransform())\n'
        + '  .pipe(process.stdout);'}</code></pre>

      {/* 3. Piping and Pipeline */}
      <h2 style={h2Style}>{isZh ? '3. 管道与 Pipeline API' : '3. Piping and Pipeline API'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'pipe() 是连接流的基本方法，但它有一个重大缺陷：不会自动传播错误。如果中间流出错，源流不会被销毁，导致内存泄漏。pipeline() 解决了这些问题。'
          : 'pipe() is the basic method for chaining streams, but it has a critical flaw: it does not propagate errors automatically. If a mid-chain stream errors, the source stream is not destroyed, causing memory leaks. pipeline() solves these problems.'}
      </p>

      <h3 style={h3Style}>pipe() vs pipeline()</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>pipe()</th>
            <th style={thStyle}>pipeline()</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '错误传播' : 'Error propagation'}</td>
            <td style={tdStyle}>{isZh ? '不自动传播' : 'Not automatic'}</td>
            <td style={tdStyle}>{isZh ? '自动传播到所有流' : 'Automatic to all streams'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '流清理' : 'Stream cleanup'}</td>
            <td style={tdStyle}>{isZh ? '出错时不销毁流' : 'Streams not destroyed on error'}</td>
            <td style={tdStyle}>{isZh ? '出错时自动销毁所有流' : 'All streams destroyed on error'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '完成通知' : 'Completion signal'}</td>
            <td style={tdStyle}>{isZh ? '需监听多个事件' : 'Must listen to multiple events'}</td>
            <td style={tdStyle}>{isZh ? '回调/Promise' : 'Callback / Promise'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '推荐场景' : 'Recommended for'}</td>
            <td style={tdStyle}>{isZh ? '简单原型验证' : 'Simple prototyping'}</td>
            <td style={tdStyle}>{isZh ? '生产代码' : 'Production code'}</td>
          </tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'const { pipeline } = require(\'stream/promises\');\n'
        + 'const fs = require(\'fs\');\n'
        + 'const zlib = require(\'zlib\');\n\n'
        + '// pipe() — errors not propagated\n'
        + 'fs.createReadStream(\'input.txt\')\n'
        + '  .pipe(zlib.createGzip())\n'
        + '  .pipe(fs.createWriteStream(\'input.txt.gz\'));\n'
        + '// If gzip errors, readStream keeps reading!\n\n'
        + '// pipeline() — production-ready\n'
        + 'async function compressFile(src, dest) {\n'
        + '  await pipeline(\n'
        + '    fs.createReadStream(src),\n'
        + '    zlib.createGzip(),\n'
        + '    fs.createWriteStream(dest)\n'
        + '  );\n'
        + '  console.log(\'Compression complete\');\n'
        + '}\n\n'
        + 'compressFile(\'input.txt\', \'input.txt.gz\')\n'
        + '  .catch(err => console.error(\'Pipeline failed:\', err));'}</code></pre>

      {/* 4. Backpressure */}
      <h2 style={h2Style}>{isZh ? '4. 背压处理' : '4. Backpressure Handling'}</h2>
      <p style={pStyle}>
        {isZh
          ? '背压发生在可写流无法以接收数据的速度处理数据时。如果忽略背压，数据会在内存中无限累积，最终导致进程崩溃。write() 方法在内部缓冲区满时返回 false——这是暂停写入的信号。'
          : 'Backpressure occurs when a writable stream cannot process data as fast as it receives it. If you ignore backpressure, data accumulates in memory indefinitely, eventually crashing the process. The write() method returns false when the internal buffer is full — this is the signal to pause writing.'}
      </p>
      <pre style={preStyle}><code>{'const fs = require(\'fs\');\n\n'
        + 'const readable = fs.createReadStream(\'huge-file.csv\');\n'
        + 'const writable = fs.createWriteStream(\'output.csv\');\n\n'
        + '// Manual backpressure handling\n'
        + 'readable.on(\'data\', (chunk) => {\n'
        + '  const canContinue = writable.write(chunk);\n'
        + '  if (!canContinue) {\n'
        + '    // Buffer is full — pause reading\n'
        + '    readable.pause();\n'
        + '    writable.once(\'drain\', () => {\n'
        + '      // Buffer drained — resume reading\n'
        + '      readable.resume();\n'
        + '    });\n'
        + '  }\n'
        + '});\n\n'
        + 'readable.on(\'end\', () => writable.end());\n\n'
        + '// BETTER: pipe() handles backpressure automatically\n'
        + '// readable.pipe(writable);'}</code></pre>

      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '永远不要忽略 write() 的返回值。如果持续向返回 false 的流写入数据，highWaterMark 缓冲区会溢出，内存使用量将急剧增加。pipe() 和 pipeline() 自动处理背压——在生产代码中优先使用它们。'
          : 'Never ignore the return value of write(). If you keep writing to a stream that returned false, the highWaterMark buffer overflows and memory usage spikes dramatically. pipe() and pipeline() handle backpressure automatically — prefer them in production code.'}
      </div>

      {/* 5. Object Mode */}
      <h2 style={h2Style}>{isZh ? '5. 对象模式流' : '5. Object Mode Streams'}</h2>
      <p style={pStyle}>
        {isZh
          ? '默认情况下，流操作 Buffer 或字符串数据。对象模式允许流处理任意 JavaScript 值——对象、数组、数字等。highWaterMark 在对象模式下计数对象数量而非字节数。'
          : 'By default, streams operate on Buffer or string data. Object mode allows streams to process any JavaScript value — objects, arrays, numbers, etc. The highWaterMark in object mode counts the number of objects rather than bytes.'}
      </p>
      <pre style={preStyle}><code>{'const { Transform, Readable } = require(\'stream\');\n\n'
        + '// Transform that filters JS objects\n'
        + 'const filterAdults = new Transform({\n'
        + '  objectMode: true,\n'
        + '  transform(user, encoding, callback) {\n'
        + '    if (user.age >= 18) {\n'
        + '      this.push(user);\n'
        + '    }\n'
        + '    callback();\n'
        + '  }\n'
        + '});\n\n'
        + 'const formatJSON = new Transform({\n'
        + '  objectMode: true,\n'
        + '  writableObjectMode: true,\n'
        + '  readableObjectMode: false,\n'
        + '  transform(user, encoding, callback) {\n'
        + '    this.push(JSON.stringify(user) + \'\\n\');\n'
        + '    callback();\n'
        + '  }\n'
        + '});\n\n'
        + '// Feed objects into the pipeline\n'
        + 'const users = Readable.from([\n'
        + '  { name: \'Alice\', age: 25 },\n'
        + '  { name: \'Bob\', age: 16 },\n'
        + '  { name: \'Charlie\', age: 30 }\n'
        + ']);\n\n'
        + 'users.pipe(filterAdults).pipe(formatJSON).pipe(process.stdout);\n'
        + '// {"name":"Alice","age":25}\n'
        + '// {"name":"Charlie","age":30}'}</code></pre>

      {/* 6. Stream Events and Error Handling */}
      <h2 style={h2Style}>{isZh ? '6. 流事件与错误处理' : '6. Stream Events and Error Handling'}</h2>
      <p style={pStyle}>
        {isZh
          ? '每种流类型都会发出特定的事件。正确监听这些事件是编写健壮流代码的关键。未处理的 error 事件会导致进程崩溃。'
          : 'Each stream type emits specific events. Listening for these events correctly is the key to writing robust stream code. Unhandled error events will crash the process.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '事件' : 'Event'}</th>
            <th style={thStyle}>{isZh ? '流类型' : 'Stream Type'}</th>
            <th style={thStyle}>{isZh ? '触发时机' : 'When Emitted'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>data</td><td style={tdStyle}>Readable</td><td style={tdStyle}>{isZh ? '有数据块可读时' : 'When a chunk of data is available'}</td></tr>
          <tr><td style={tdStyle}>end</td><td style={tdStyle}>Readable</td><td style={tdStyle}>{isZh ? '没有更多数据可读时' : 'When there is no more data to read'}</td></tr>
          <tr><td style={tdStyle}>drain</td><td style={tdStyle}>Writable</td><td style={tdStyle}>{isZh ? '缓冲区排空可继续写入时' : 'When buffer is drained and safe to write again'}</td></tr>
          <tr><td style={tdStyle}>finish</td><td style={tdStyle}>Writable</td><td style={tdStyle}>{isZh ? '所有数据已刷新到底层系统' : 'When all data has been flushed to underlying system'}</td></tr>
          <tr><td style={tdStyle}>error</td><td style={tdStyle}>{isZh ? '所有类型' : 'All'}</td><td style={tdStyle}>{isZh ? '发生错误时' : 'When an error occurs'}</td></tr>
          <tr><td style={tdStyle}>close</td><td style={tdStyle}>{isZh ? '所有类型' : 'All'}</td><td style={tdStyle}>{isZh ? '流及其底层资源已关闭' : 'When the stream and its underlying resource are closed'}</td></tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'const { pipeline } = require(\'stream/promises\');\n'
        + 'const { Transform } = require(\'stream\');\n'
        + 'const fs = require(\'fs\');\n\n'
        + 'async function safeProcess() {\n'
        + '  try {\n'
        + '    await pipeline(\n'
        + '      fs.createReadStream(\'data.json\'),\n'
        + '      new Transform({\n'
        + '        transform(chunk, enc, cb) {\n'
        + '          try {\n'
        + '            const parsed = JSON.parse(chunk);\n'
        + '            cb(null, JSON.stringify(parsed) + \'\\n\');\n'
        + '          } catch (e) {\n'
        + '            cb(new Error(\'Invalid JSON: \' + e.message));\n'
        + '          }\n'
        + '        }\n'
        + '      }),\n'
        + '      fs.createWriteStream(\'output.jsonl\')\n'
        + '    );\n'
        + '    console.log(\'Processing complete\');\n'
        + '  } catch (err) {\n'
        + '    // All streams are automatically destroyed\n'
        + '    console.error(\'Pipeline error:\', err.message);\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* 7. File Streaming */}
      <h2 style={h2Style}>{isZh ? '7. 文件流式处理' : '7. File Streaming'}</h2>
      <p style={pStyle}>
        {isZh
          ? '文件流是 Node.js 流最常见的用例。fs.createReadStream() 和 fs.createWriteStream() 以块为单位处理文件，内存占用恒定。对于大文件，这与 readFile/writeFile 的差距是致命的。'
          : 'File streams are the most common use case for Node.js streams. fs.createReadStream() and fs.createWriteStream() process files chunk by chunk with constant memory. For large files, the difference versus readFile/writeFile is dramatic.'}
      </p>
      <pre style={preStyle}><code>{'const fs = require(\'fs\');\n'
        + 'const { pipeline } = require(\'stream/promises\');\n'
        + 'const zlib = require(\'zlib\');\n\n'
        + '// Read a 10GB log file — only ~64KB in memory\n'
        + 'async function processLargeFile() {\n'
        + '  const input = fs.createReadStream(\'server.log\', {\n'
        + '    highWaterMark: 64 * 1024,  // 64KB chunks\n'
        + '    encoding: \'utf8\'\n'
        + '  });\n\n'
        + '  let lineCount = 0;\n'
        + '  let errorCount = 0;\n\n'
        + '  for await (const chunk of input) {\n'
        + '    const lines = chunk.split(\'\\n\');\n'
        + '    lineCount += lines.length;\n'
        + '    errorCount += lines.filter(\n'
        + '      l => l.includes(\'ERROR\')\n'
        + '    ).length;\n'
        + '  }\n\n'
        + '  console.log(`Lines: \\${lineCount}, Errors: \\${errorCount}`);\n'
        + '}\n\n'
        + '// Compress a file with streaming\n'
        + 'async function compressFile(src, dest) {\n'
        + '  await pipeline(\n'
        + '    fs.createReadStream(src),\n'
        + '    zlib.createGzip({ level: 9 }),\n'
        + '    fs.createWriteStream(dest)\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* 8. HTTP Streaming */}
      <h2 style={h2Style}>{isZh ? '8. HTTP 流式传输' : '8. HTTP Streaming'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Node.js 的 HTTP 请求和响应都是流。http.IncomingMessage 是 Readable 流，http.ServerResponse 是 Writable 流。利用这一点可以高效处理大文件上传/下载和请求代理。'
          : 'Node.js HTTP requests and responses are both streams. http.IncomingMessage is a Readable stream and http.ServerResponse is a Writable stream. Leveraging this enables efficient large file uploads/downloads and request proxying.'}
      </p>
      <pre style={preStyle}><code>{'const http = require(\'http\');\n'
        + 'const fs = require(\'fs\');\n'
        + 'const { pipeline } = require(\'stream/promises\');\n\n'
        + 'const server = http.createServer(async (req, res) => {\n'
        + '  if (req.url === \'/download\') {\n'
        + '    // Stream a large file to the client\n'
        + '    res.writeHead(200, {\n'
        + '      \'Content-Type\': \'application/octet-stream\',\n'
        + '      \'Transfer-Encoding\': \'chunked\'\n'
        + '    });\n'
        + '    await pipeline(\n'
        + '      fs.createReadStream(\'large-dataset.csv\'),\n'
        + '      res\n'
        + '    );\n'
        + '  }\n\n'
        + '  if (req.url === \'/upload\' && req.method === \'POST\') {\n'
        + '    // Stream upload directly to disk\n'
        + '    await pipeline(\n'
        + '      req,\n'
        + '      fs.createWriteStream(\'upload.bin\')\n'
        + '    );\n'
        + '    res.end(\'Upload complete\');\n'
        + '  }\n'
        + '});\n\n'
        + 'server.listen(3000);'}</code></pre>

      {/* 9. Async Iterators */}
      <h2 style={h2Style}>{isZh ? '9. 异步迭代器与流' : '9. Async Iterators with Streams'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Readable 流实现了异步可迭代协议。使用 for await...of 循环消费流数据更简洁，且自动处理背压。这是现代 Node.js 中推荐的流消费方式。'
          : 'Readable streams implement the async iterable protocol. Using for await...of loops to consume stream data is cleaner and handles backpressure automatically. This is the recommended way to consume streams in modern Node.js.'}
      </p>
      <pre style={preStyle}><code>{'const fs = require(\'fs\');\n'
        + 'const readline = require(\'readline\');\n\n'
        + '// Read file line by line with async iterators\n'
        + 'async function processLines(filePath) {\n'
        + '  const rl = readline.createInterface({\n'
        + '    input: fs.createReadStream(filePath),\n'
        + '    crlfDelay: Infinity\n'
        + '  });\n\n'
        + '  const stats = { total: 0, errors: 0, warnings: 0 };\n\n'
        + '  for await (const line of rl) {\n'
        + '    stats.total++;\n'
        + '    if (line.includes(\'ERROR\')) stats.errors++;\n'
        + '    if (line.includes(\'WARN\')) stats.warnings++;\n'
        + '  }\n\n'
        + '  return stats;\n'
        + '}\n\n'
        + '// Create a Readable from an async generator\n'
        + 'const { Readable } = require(\'stream\');\n\n'
        + 'async function* generateData() {\n'
        + '  for (let i = 0; i < 1000; i++) {\n'
        + '    yield JSON.stringify({ id: i, ts: Date.now() }) + \'\\n\';\n'
        + '  }\n'
        + '}\n\n'
        + 'const stream = Readable.from(generateData());\n'
        + 'stream.pipe(process.stdout);'}</code></pre>

      {/* 10. Stream Composition */}
      <h2 style={h2Style}>{isZh ? '10. 流组合模式' : '10. Stream Composition Patterns'}</h2>
      <p style={pStyle}>
        {isZh
          ? '将多个 Transform 流组合成可复用的数据处理管道，可以简化复杂的数据处理逻辑。每个 Transform 承担单一职责，通过 pipeline 组合。'
          : 'Combining multiple Transform streams into reusable data processing pipelines simplifies complex logic. Each Transform handles a single responsibility, composed via pipeline.'}
      </p>
      <pre style={preStyle}><code>{'const { Transform } = require(\'stream\');\n'
        + 'const { pipeline } = require(\'stream/promises\');\n'
        + 'const { createReadStream, createWriteStream } = require(\'fs\');\n\n'
        + '// Reusable transforms\n'
        + 'function parseCSVLine() {\n'
        + '  let header = null;\n'
        + '  return new Transform({\n'
        + '    objectMode: true,\n'
        + '    transform(line, enc, cb) {\n'
        + '      const cols = line.toString().trim().split(\',\');\n'
        + '      if (!header) { header = cols; return cb(); }\n'
        + '      const obj = {};\n'
        + '      header.forEach((h, i) => obj[h] = cols[i]);\n'
        + '      cb(null, obj);\n'
        + '    }\n'
        + '  });\n'
        + '}\n\n'
        + 'function filterBy(field, value) {\n'
        + '  return new Transform({\n'
        + '    objectMode: true,\n'
        + '    transform(obj, enc, cb) {\n'
        + '      if (obj[field] === value) this.push(obj);\n'
        + '      cb();\n'
        + '    }\n'
        + '  });\n'
        + '}\n\n'
        + 'function toJSON() {\n'
        + '  return new Transform({\n'
        + '    writableObjectMode: true,\n'
        + '    readableObjectMode: false,\n'
        + '    transform(obj, enc, cb) {\n'
        + '      cb(null, JSON.stringify(obj) + \'\\n\');\n'
        + '    }\n'
        + '  });\n'
        + '}\n\n'
        + '// Compose: CSV → parse → filter → JSON\n'
        + 'await pipeline(\n'
        + '  createReadStream(\'users.csv\'),\n'
        + '  parseCSVLine(),\n'
        + '  filterBy(\'role\', \'admin\'),\n'
        + '  toJSON(),\n'
        + '  createWriteStream(\'admins.jsonl\')\n'
        + ');'}</code></pre>

      {/* 11. Memory and Performance */}
      <h2 style={h2Style}>{isZh ? '11. 内存效率与性能' : '11. Memory Efficiency and Performance'}</h2>
      <p style={pStyle}>
        {isZh
          ? '流的核心价值在于内存效率。以下对比展示了流与非流方式处理大文件的差异。'
          : 'The core value of streams is memory efficiency. The comparison below shows the difference between stream and non-stream approaches for processing large files.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '方法' : 'Approach'}</th>
            <th style={thStyle}>{isZh ? '1GB 文件内存' : '1GB File Memory'}</th>
            <th style={thStyle}>{isZh ? '适用场景' : 'Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>fs.readFileSync()</td>
            <td style={tdStyle}>~1GB+</td>
            <td style={tdStyle}>{isZh ? '仅小配置文件' : 'Tiny config files only'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>fs.readFile()</td>
            <td style={tdStyle}>~1GB+</td>
            <td style={tdStyle}>{isZh ? '小于 100MB 的文件' : 'Files under 100MB'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>createReadStream()</td>
            <td style={tdStyle}>~64KB</td>
            <td style={tdStyle}>{isZh ? '任意大小文件' : 'Any file size'}</td>
          </tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'// Memory comparison: Buffer vs Stream\n'
        + 'const fs = require(\'fs\');\n\n'
        + '// BAD: loads entire file into memory\n'
        + 'async function bufferApproach() {\n'
        + '  const data = await fs.promises.readFile(\'big.csv\', \'utf8\');\n'
        + '  const lines = data.split(\'\\n\'); // 2x memory!\n'
        + '  return lines.filter(l => l.includes(\'ERROR\'));\n'
        + '}\n\n'
        + '// GOOD: constant memory, processes line by line\n'
        + 'async function streamApproach() {\n'
        + '  const rl = require(\'readline\').createInterface({\n'
        + '    input: fs.createReadStream(\'big.csv\')\n'
        + '  });\n'
        + '  const errors = [];\n'
        + '  for await (const line of rl) {\n'
        + '    if (line.includes(\'ERROR\')) errors.push(line);\n'
        + '  }\n'
        + '  return errors;\n'
        + '}\n\n'
        + '// Performance tip: tune highWaterMark\n'
        + '// Default: 16KB for Readable, 16384 bytes\n'
        + '// Increase for sequential reads of large files\n'
        + 'fs.createReadStream(\'data.bin\', {\n'
        + '  highWaterMark: 256 * 1024 // 256KB for throughput\n'
        + '});'}</code></pre>

      {/* 12. Web Streams API */}
      <h2 style={h2Style}>{isZh ? '12. Web Streams API（Node.js 兼容）' : '12. Web Streams API (Node.js Compatibility)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Web Streams API（ReadableStream、WritableStream、TransformStream）是 WHATWG 标准，在浏览器、Deno、Cloudflare Workers 和 Node.js 中通用。Node.js 提供了转换方法实现互操作。'
          : 'The Web Streams API (ReadableStream, WritableStream, TransformStream) is the WHATWG standard available in browsers, Deno, Cloudflare Workers, and Node.js. Node.js provides conversion methods for interoperability.'}
      </p>
      <pre style={preStyle}><code>{'const { Readable } = require(\'stream\');\n\n'
        + '// Convert Node stream → Web stream\n'
        + 'const nodeReadable = Readable.from([\'hello\', \' \', \'world\']);\n'
        + 'const webReadable = Readable.toWeb(nodeReadable);\n\n'
        + '// Consume with Web Streams API\n'
        + 'const reader = webReadable.getReader();\n'
        + 'while (true) {\n'
        + '  const { done, value } = await reader.read();\n'
        + '  if (done) break;\n'
        + '  console.log(value);\n'
        + '}\n\n'
        + '// Convert Web stream → Node stream\n'
        + 'const webStream = new ReadableStream({\n'
        + '  start(controller) {\n'
        + '    controller.enqueue(\'data chunk 1\');\n'
        + '    controller.enqueue(\'data chunk 2\');\n'
        + '    controller.close();\n'
        + '  }\n'
        + '});\n\n'
        + 'const nodeStream = Readable.fromWeb(webStream);\n'
        + 'nodeStream.pipe(process.stdout);'}</code></pre>

      {/* 13. Real-World Patterns */}
      <h2 style={h2Style}>{isZh ? '13. 实战模式' : '13. Real-World Patterns'}</h2>

      <h3 style={h3Style}>{isZh ? 'CSV 处理管道' : 'CSV Processing Pipeline'}</h3>
      <pre style={preStyle}><code>{'const { Transform } = require(\'stream\');\n'
        + 'const { pipeline } = require(\'stream/promises\');\n'
        + 'const fs = require(\'fs\');\n\n'
        + '// Split buffer chunks into individual lines\n'
        + 'function lineSplitter() {\n'
        + '  let buffer = \'\';\n'
        + '  return new Transform({\n'
        + '    transform(chunk, enc, cb) {\n'
        + '      buffer += chunk.toString();\n'
        + '      const lines = buffer.split(\'\\n\');\n'
        + '      buffer = lines.pop(); // keep partial line\n'
        + '      for (const line of lines) {\n'
        + '        if (line.trim()) this.push(line);\n'
        + '      }\n'
        + '      cb();\n'
        + '    },\n'
        + '    flush(cb) {\n'
        + '      if (buffer.trim()) this.push(buffer);\n'
        + '      cb();\n'
        + '    }\n'
        + '  });\n'
        + '}\n\n'
        + 'async function processCSV(input, output) {\n'
        + '  let header = null;\n'
        + '  let count = 0;\n\n'
        + '  await pipeline(\n'
        + '    fs.createReadStream(input),\n'
        + '    lineSplitter(),\n'
        + '    new Transform({\n'
        + '      objectMode: true,\n'
        + '      transform(line, enc, cb) {\n'
        + '        const cols = line.toString().split(\',\');\n'
        + '        if (!header) { header = cols; return cb(); }\n'
        + '        const row = {};\n'
        + '        header.forEach((h, i) => row[h.trim()] = cols[i]);\n'
        + '        count++;\n'
        + '        cb(null, JSON.stringify(row) + \'\\n\');\n'
        + '      }\n'
        + '    }),\n'
        + '    fs.createWriteStream(output)\n'
        + '  );\n\n'
        + '  console.log(`Processed \\${count} rows`);\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '日志解析与聚合' : 'Log Parsing and Aggregation'}</h3>
      <pre style={preStyle}><code>{'const { Transform } = require(\'stream\');\n\n'
        + '// Parse structured log lines into objects\n'
        + 'function logParser() {\n'
        + '  return new Transform({\n'
        + '    objectMode: true,\n'
        + '    transform(line, enc, cb) {\n'
        + '      const match = line.toString().match(\n'
        + '        /^\\[(.*?)\\]\\s+(\\w+)\\s+(.*)/\n'
        + '      );\n'
        + '      if (match) {\n'
        + '        this.push({\n'
        + '          timestamp: new Date(match[1]),\n'
        + '          level: match[2],\n'
        + '          message: match[3]\n'
        + '        });\n'
        + '      }\n'
        + '      cb();\n'
        + '    }\n'
        + '  });\n'
        + '}\n\n'
        + '// Aggregate counts by level\n'
        + 'function aggregator() {\n'
        + '  const counts = {};\n'
        + '  return new Transform({\n'
        + '    objectMode: true,\n'
        + '    transform(entry, enc, cb) {\n'
        + '      counts[entry.level] = (counts[entry.level] || 0) + 1;\n'
        + '      cb();\n'
        + '    },\n'
        + '    flush(cb) {\n'
        + '      this.push(JSON.stringify(counts, null, 2));\n'
        + '      cb();\n'
        + '    }\n'
        + '  });\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Duplex 流示例' : 'Duplex Stream Example'}</h3>
      <pre style={preStyle}><code>{'const { Duplex } = require(\'stream\');\n\n'
        + 'class MessageProtocol extends Duplex {\n'
        + '  constructor() {\n'
        + '    super();\n'
        + '    this._buffer = [];\n'
        + '  }\n\n'
        + '  _write(chunk, encoding, callback) {\n'
        + '    // Writable side: receive raw bytes, frame them\n'
        + '    const msg = chunk.toString().trim();\n'
        + '    const framed = Buffer.from(\n'
        + '      JSON.stringify({ len: msg.length, data: msg }) + \'\\n\'\n'
        + '    );\n'
        + '    this._buffer.push(framed);\n'
        + '    callback();\n'
        + '  }\n\n'
        + '  _read(size) {\n'
        + '    // Readable side: output framed messages\n'
        + '    const item = this._buffer.shift();\n'
        + '    if (item) {\n'
        + '      this.push(item);\n'
        + '    } else {\n'
        + '      setTimeout(() => this._read(size), 10);\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Conclusion */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Conclusion'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Node.js Streams 是处理大规模数据的核心工具。掌握四种流类型（Readable、Writable、Transform、Duplex）及其组合方式，使用 pipeline() 替代 pipe() 确保错误处理和资源清理，理解背压机制避免内存溢出，利用异步迭代器写出更简洁的代码。在需要跨运行时兼容性时，使用 Web Streams API 并通过 toWeb()/fromWeb() 在两种 API 之间转换。流式思维是 Node.js 高性能编程的基础——任何超过几 MB 的数据都应该考虑使用流处理。'
          : 'Node.js Streams are the core tool for handling large-scale data. Master the four stream types (Readable, Writable, Transform, Duplex) and their composition, use pipeline() over pipe() for error handling and resource cleanup, understand backpressure to prevent memory overflow, and leverage async iterators for cleaner code. When you need cross-runtime compatibility, use the Web Streams API and convert between the two APIs with toWeb()/fromWeb(). Stream-oriented thinking is the foundation of high-performance Node.js programming — any data larger than a few MB should be processed with streams.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>

      <h3 style={h3Style}>{isZh ? 'Node.js 的四种流类型是什么？' : 'What are the four types of Node.js streams?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Node.js 有四种基本流类型：Readable（数据源，如 fs.createReadStream）、Writable（数据目标，如 fs.createWriteStream）、Transform（数据经过时修改，如 zlib.createGzip）和 Duplex（独立的可读可写端，如 net.Socket）。还有 PassThrough，一种不修改数据的 Transform。'
          : 'Node.js has four fundamental stream types: Readable (source of data, e.g., fs.createReadStream), Writable (destination for data, e.g., fs.createWriteStream), Transform (modifies data as it passes through, e.g., zlib.createGzip), and Duplex (both readable and writable independently, e.g., net.Socket). There is also PassThrough, a trivial Transform that passes data unchanged.'}
      </p>

      <h3 style={h3Style}>{isZh ? '什么是背压以及如何处理？' : 'What is backpressure and how do you handle it?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '背压发生在可写流无法以接收数据的速度处理数据时。当 write() 返回 false 时需要暂停写入并等待 drain 事件。pipe() 和 pipeline() 自动处理背压。忽略背压会导致内存使用过多甚至崩溃。'
          : 'Backpressure occurs when a writable stream cannot process data as fast as it receives it. When write() returns false, you must pause writing and wait for the drain event. pipe() and pipeline() handle backpressure automatically. Ignoring backpressure leads to excessive memory usage and potential crashes.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'pipe() 和 pipeline() 有什么区别？' : 'What is the difference between pipe() and pipeline()?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'pipe() 连接流但不自动传播错误或清理资源。pipeline() 自动传播错误到所有流、出错时销毁所有流、并支持回调或 Promise 完成通知。生产代码应始终使用 pipeline()。'
          : 'pipe() chains streams but does not propagate errors or clean up resources. If a mid-chain stream errors, the source keeps reading and may leak memory. pipeline() propagates errors to all streams, destroys all streams on error, and supports a callback or promise for completion. Always prefer pipeline() in production code.'}
      </p>

      <h3 style={h3Style}>{isZh ? '异步迭代器如何与流配合使用？' : 'How do async iterators work with streams?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Readable 流实现了异步可迭代协议，可以使用 for await...of 循环消费。自动处理背压，当循环通过 break 或 throw 退出时流会被自动销毁。'
          : 'Readable streams implement the async iterable protocol, so you can consume them with for await...of loops. Backpressure is handled automatically, and the stream is destroyed when the loop exits via break or throw.'}
      </p>

      <h3 style={h3Style}>{isZh ? '什么是对象模式？' : 'What is object mode in Node.js streams?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '默认流处理 Buffer 或字符串。对象模式（objectMode: true）允许处理任意 JavaScript 值。highWaterMark 计数对象数量而非字节。适用于解析后的 JSON 记录、数据库行或 CSV 行。'
          : 'By default, streams operate on Buffer or string data. Object mode (objectMode: true) allows streams to process any JavaScript value. The highWaterMark counts objects rather than bytes. Useful for parsed JSON records, database rows, or CSV lines.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何流式处理大文件？' : 'How do you stream large files without running out of memory?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '使用 fs.createReadStream() 按块读取文件并通过 pipeline 传输到可写目标。无论文件多大，内存占用都是恒定的。永远不要对大文件使用 readFileSync() 或 readFile()。'
          : 'Use fs.createReadStream() to read the file in chunks and pipe it to a writable destination via pipeline(). Memory usage stays constant regardless of file size. Never use readFileSync() or readFile() for large files.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何处理流管道中的错误？' : 'How do you handle errors in stream pipelines?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '使用 pipeline() 函数，它将错误传播到所有流并在完成或出错时调用回调。使用 Promise 版本时用 try/catch 包裹。始终处理流错误以避免未捕获异常导致进程崩溃。'
          : 'Use the pipeline() function which propagates errors to all streams and calls a single callback on completion or error. With the promise version (from stream/promises), wrap it in try/catch. Always handle stream errors to prevent unhandled exceptions from crashing the process.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Web Streams API 与 Node.js 流有什么区别？' : 'What is the Web Streams API and how does it differ?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Web Streams API 是浏览器、Deno、Workers 和 Node.js 通用的 WHATWG 标准。Node.js 流功能更丰富（pipe()、pipeline()、更好的背压），Web Streams 更具移植性。Node.js 提供 Readable.toWeb() 和 Readable.fromWeb() 实现转换。'
          : 'The Web Streams API is the WHATWG standard available in browsers, Deno, Workers, and Node.js. Node streams are more feature-rich with pipe(), pipeline(), and better backpressure. Web Streams are more portable. Node.js provides Readable.toWeb() and Readable.fromWeb() for conversion.'}
      </p>
    </>
  );
}
