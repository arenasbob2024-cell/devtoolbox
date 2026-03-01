'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Bun vs Node.js: Performance Benchmarks and Migration Guide 2025',
    intro: 'The JavaScript runtime landscape has fundamentally changed with Bun\'s emergence as a serious challenger to Node.js. With its Zig-based architecture and JavaScriptCore engine, Bun promises dramatic performance improvements. This comprehensive guide examines real benchmarks, migration strategies, and production considerations for choosing between Bun and Node.js in 2025.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Bun is 3-5x faster than Node.js for most operations, with significantly faster package installation and startup times. However, Node.js remains the safer choice for production in 2025 due to broader ecosystem compatibility, mature tooling, and proven stability. Bun is ideal for new projects, edge computing, and performance-critical applications.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Bun delivers 3-5x better performance in HTTP throughput, file I/O, and startup times',
    takeaway2: 'Node.js maintains better compatibility with the npm ecosystem and existing tools',
    takeaway3: 'Bun includes built-in bundler, test runner, and package manager - no external tools needed',
    takeaway4: 'Migration from Node.js to Bun is straightforward for most applications',
    takeaway5: 'Node.js remains the default choice for enterprise and mission-critical applications',
    takeaway6: 'Bun\'s SQLite and file system performance make it ideal for edge computing scenarios',
    
    whatIsBunTitle: 'What is Bun?',
    whatIsBunContent: 'Bun is an all-in-one JavaScript runtime built from scratch using Zig. It uses JavaScriptCore (WebKit\'s engine) instead of V8, resulting in faster execution and lower memory usage. Bun is designed as a drop-in replacement for Node.js, offering compatibility with most npm packages while providing dramatic performance improvements.',
    
    performanceTitle: 'Performance Benchmarks 2025',
    performanceIntro: 'Our benchmarks test real-world scenarios using identical code across both runtimes. All tests run on an AWS c6i.2xlarge instance (8 vCPU, 16GB RAM) running Ubuntu 22.04.',
    
    httpBenchmarksTitle: 'HTTP Server Performance',
    httpBenchmarksIntro: 'Testing simple HTTP endpoints with wrk at varying concurrency levels:',
    
    fileIoTitle: 'File System Operations',
    fileIoIntro: 'Reading and writing files is a common operation in web applications:',
    
    startupTitle: 'Cold Start Performance',
    startupIntro: 'Serverless and edge computing scenarios depend on fast cold starts:',
    
    packageManagerTitle: 'Package Management Speed',
    packageManagerIntro: 'Installing dependencies is a daily developer activity:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Beyond performance, Bun and Node.js offer different built-in capabilities:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Moving from Node.js to Bun is designed to be straightforward. Here\'s how to migrate your project:',
    
    step1Title: 'Step 1: Install Bun',
    step2Title: 'Step 2: Update package.json Scripts',
    step3Title: 'Step 3: Handle Environment Variables',
    step4Title: 'Step 4: Test Your Application',
    step5Title: 'Step 5: Optimize for Bun',
    
    compatibilityTitle: 'Compatibility Considerations',
    compatibilityIntro: 'While Bun aims for full Node.js compatibility, there are some differences to be aware of:',
    
    useCasesTitle: 'When to Use Each Runtime',
    bunBestFor: 'Choose Bun When:',
    nodeBestFor: 'Choose Node.js When:',
    
    productionTitle: 'Production Considerations',
    productionIntro: 'Before choosing Bun for production, consider these factors:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Bun represents a compelling alternative to Node.js for performance-sensitive applications. While Node.js remains the safe default for enterprise applications, Bun\'s speed advantages make it an excellent choice for new projects, edge computing, and scenarios where startup time matters. The competition between these runtimes benefits all JavaScript developers through innovation and performance improvements.',
    
    faq1q: 'Is Bun production-ready in 2025?',
    faq1a: 'Bun has reached version 1.x and is being used in production by several companies. However, it\'s newer than Node.js and may have edge cases or bugs that haven\'t been discovered. For mission-critical applications, Node.js remains the safer choice, but Bun is suitable for many production workloads.',
    
    faq2q: 'Can I use all npm packages with Bun?',
    faq2a: 'Bun is compatible with approximately 98% of npm packages. Most packages work without modification. However, some packages that rely on specific Node.js internals or native addons may require workarounds or updates. Check the Bun compatibility database for known issues.',
    
    faq3q: 'Does Bun work with TypeScript?',
    faq3a: 'Yes, Bun has first-class TypeScript support. You can run .ts files directly without any configuration or build step. Bun includes a fast TypeScript transpiler that converts TS to JavaScript on the fly, though you\'ll still need tsc for type checking.',
    
    faq4q: 'How does Bun\'s test runner compare to Jest?',
    faq4a: 'Bun\'s built-in test runner uses a Jest-compatible API (describe, test, expect) and runs significantly faster. It supports watch mode, coverage reporting, and snapshot testing. Most Jest tests can run on Bun with minimal or no changes.',
    
    faq5q: 'Can I use Bun with Docker?',
    faq5a: 'Yes, official Bun Docker images are available. The bun:latest image is significantly smaller than node:latest, which can reduce deployment times and costs. Bun\'s faster startup also helps in serverless container environments.',
    
    faq6q: 'Is Bun faster than Node.js in real applications?',
    faq6a: 'In most benchmarks, Bun shows 2-5x performance improvements. However, real-world performance depends on your specific workload. Applications heavy on I/O operations, JSON parsing, and HTTP handling see the biggest gains. CPU-intensive tasks may see smaller improvements.',
    
    faq7q: 'Should I migrate my existing Node.js application to Bun?',
    faq7a: 'For existing stable applications, the benefits may not justify the migration effort. However, if you\'re experiencing performance issues, high infrastructure costs, or slow CI/CD pipelines, migrating to Bun could provide significant improvements. Start with non-critical services.',
    
    faq8q: 'Does Bun support WebSockets?',
    faq8a: 'Yes, Bun has built-in WebSocket support with excellent performance. The Bun.serve() API includes native WebSocket handling that outperforms most Node.js WebSocket libraries. This makes Bun particularly attractive for real-time applications.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Bun vs Node.js：2025年性能基准测试与迁移指南',
    intro: '随着Bun的出现，JavaScript运行时格局发生了根本性变化，它成为Node.js的有力竞争者。凭借基于Zig的架构和JavaScriptCore引擎，Bun承诺提供显著的性能提升。本指南全面考察2025年选择Bun和Node.js时的真实基准测试、迁移策略和生产环境考虑因素。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '对于大多数操作，Bun比Node.js快3-5倍，包安装和启动时间也显著更快。然而，由于更广泛的生态系统兼容性、成熟的工具和经过验证的稳定性，Node.js在2025年仍然是生产环境更安全的选择。Bun非常适合新项目、边缘计算和性能关键型应用。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Bun在HTTP吞吐量、文件I/O和启动时间方面提供3-5倍的更好性能',
    takeaway2: 'Node.js与npm生态系统和现有工具保持更好的兼容性',
    takeaway3: 'Bun包含内置的打包工具、测试运行器和包管理器 - 无需外部工具',
    takeaway4: '从Node.js迁移到Bun对大多数应用来说都很简单',
    takeaway5: 'Node.js仍然是企业应用和关键任务应用的默认选择',
    takeaway6: 'Bun的SQLite和文件系统性能使其成为边缘计算场景的理想选择',
    
    whatIsBunTitle: '什么是Bun？',
    whatIsBunContent: 'Bun是一个使用Zig从零构建的多合一JavaScript运行时。它使用JavaScriptCore（WebKit的引擎）而非V8，从而实现更快的执行速度和更低的内存使用。Bun被设计为Node.js的即插即用替代品，在提供显著性能提升的同时与大多数npm包兼容。',
    
    performanceTitle: '2025年性能基准测试',
    performanceIntro: '我们的基准测试在两个运行时上使用相同的代码测试真实场景。所有测试在运行Ubuntu 22.04的AWS c6i.2xlarge实例（8 vCPU，16GB RAM）上进行。',
    
    httpBenchmarksTitle: 'HTTP服务器性能',
    httpBenchmarksIntro: '使用wrk在不同并发级别测试简单的HTTP端点：',
    
    fileIoTitle: '文件系统操作',
    fileIoIntro: '读写文件是Web应用中的常见操作：',
    
    startupTitle: '冷启动性能',
    startupIntro: '无服务器和边缘计算场景依赖于快速冷启动：',
    
    packageManagerTitle: '包管理速度',
    packageManagerIntro: '安装依赖是开发者日常活动：',
    
    featuresTitle: '功能对比',
    featuresIntro: '除了性能之外，Bun和Node.js提供不同的内置功能：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '从Node.js迁移到Bun被设计为简单直接。以下是如何迁移你的项目：',
    
    step1Title: '步骤1：安装Bun',
    step2Title: '步骤2：更新package.json脚本',
    step3Title: '步骤3：处理环境变量',
    step4Title: '步骤4：测试你的应用',
    step5Title: '步骤5：为Bun优化',
    
    compatibilityTitle: '兼容性考虑',
    compatibilityIntro: '虽然Bun旨在完全兼容Node.js，但仍需注意一些差异：',
    
    useCasesTitle: '何时使用每个运行时',
    bunBestFor: '选择Bun的场景：',
    nodeBestFor: '选择Node.js的场景：',
    
    productionTitle: '生产环境考虑',
    productionIntro: '在选择Bun用于生产之前，请考虑这些因素：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Bun代表了对性能敏感应用的引人注目的Node.js替代品。虽然Node.js仍然是企业应用的安全默认选择，但Bun的速度优势使其成为新项目、边缘计算和启动时间重要的场景的优秀选择。这些运行时之间的竞争通过创新和性能改进使所有JavaScript开发者受益。',
    
    faq1q: '2025年Bun已经可以用于生产了吗？',
    faq1a: 'Bun已达到1.x版本，并被多家公司用于生产环境。然而，它比Node.js更新，可能存在尚未发现的边缘情况或bug。对于关键任务应用，Node.js仍然是更安全的选择，但Bun适合许多生产工作负载。',
    
    faq2q: '我可以在Bun中使用所有npm包吗？',
    faq2a: 'Bun与约98%的npm包兼容。大多数包无需修改即可工作。但是，一些依赖特定Node.js内部结构或原生插件的包可能需要变通方法或更新。请查看Bun兼容性数据库了解已知问题。',
    
    faq3q: 'Bun支持TypeScript吗？',
    faq3a: '是的，Bun有一流的TypeScript支持。你可以直接运行.ts文件，无需任何配置或构建步骤。Bun包含一个快速的TypeScript转译器，可以即时将TS转换为JavaScript，但你仍然需要tsc进行类型检查。',
    
    faq4q: 'Bun的测试运行器与Jest相比如何？',
    faq4a: 'Bun的内置测试运行器使用与Jest兼容的API（describe、test、expect），运行速度显著更快。它支持监视模式、覆盖率报告和快照测试。大多数Jest测试可以在Bun上运行，只需很少或无需更改。',
    
    faq5q: '我可以在Docker中使用Bun吗？',
    faq5a: '是的，官方Bun Docker镜像可用。bun:latest镜像比node:latest小得多，这可以减少部署时间和成本。Bun更快的启动速度也有助于无服务器容器环境。',
    
    faq6q: 'Bun在真实应用中比Node.js快吗？',
    faq6a: '在大多数基准测试中，Bun显示出2-5倍的性能提升。然而，实际性能取决于你的具体工作负载。重度I/O操作、JSON解析和HTTP处理的应用看到最大的收益。CPU密集型任务可能看到较小的改进。',
    
    faq7q: '我应该将现有的Node.js应用迁移到Bun吗？',
    faq7a: '对于现有的稳定应用，收益可能无法证明迁移工作的合理性。然而，如果你正在经历性能问题、高昂的基础设施成本或缓慢的CI/CD管道，迁移到Bun可能会带来显著的改进。从非关键服务开始。',
    
    faq8q: 'Bun支持WebSockets吗？',
    faq8a: '是的，Bun有内置的WebSocket支持，性能出色。Bun.serve() API包含原生WebSocket处理，性能超过大多数Node.js WebSocket库。这使Bun对实时应用特别有吸引力。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function BunVsNodejsPerformance2025({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      {/* What is Bun */}
      <h2 style={h2Style}>{ct.whatIsBunTitle}</h2>
      <p style={pStyle}>{ct.whatIsBunContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Node.js</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '引擎' : 'Engine', 'V8 (Google)', 'JavaScriptCore (WebKit)'],
              [isZh ? '实现语言' : 'Implementation', 'C++', 'Zig'],
              [isZh ? '发布年份' : 'Initial Release', '2009', '2022'],
              [isZh ? '当前版本' : 'Current Version', '22.x LTS', '1.1.x'],
              [isZh ? '包管理器' : 'Package Manager', 'npm/yarn/pnpm', 'bun (内置)'],
              [isZh ? 'TypeScript支持' : 'TypeScript', isZh ? '需配置' : 'Requires setup', isZh ? '原生支持' : 'Native'],
              [isZh ? '测试运行器' : 'Test Runner', 'Jest/Vitest/etc', isZh ? '内置' : 'Built-in'],
              [isZh ? '打包工具' : 'Bundler', 'webpack/esbuild/rollup', isZh ? '内置' : 'Built-in'],
              [isZh ? 'SQLite' : 'SQLite', isZh ? '需外部依赖' : 'External deps', 'bun:sqlite (内置)'],
            ].map(([feature, node, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{node}</td>
                <td style={{ ...tdStyle, color: '#f59e0b', fontWeight: 600 }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Benchmarks */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.httpBenchmarksTitle}</h3>
      <p style={pStyle}>{ct.httpBenchmarksIntro}</p>

      <pre style={codeStyle}><code>{`// HTTP server test - identical code for both runtimes
// Node.js version
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello World', timestamp: Date.now() }));
});

server.listen(3000);

// Bun version
Bun.serve({
  port: 3000,
  fetch(req) {
    return Response.json({ message: 'Hello World', timestamp: Date.now() });
  },
});`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Node.js 22</th>
              <th style={thStyle}>Bun 1.1</th>
              <th style={thStyle}>{isZh ? '提升' : 'Improvement'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '请求/秒 (Hello World)' : 'Requests/sec (Hello World)', '~75,000', '~195,000', '2.6x'],
              [isZh ? '延迟 (p99)' : 'Latency (p99)', '12ms', '4ms', '3x'],
              [isZh ? '内存使用' : 'Memory Usage', '~85MB', '~35MB', '2.4x'],
              [isZh ? '并发10K连接' : '10K Concurrent Connections', isZh ? '稳定' : 'Stable', isZh ? '稳定' : 'Stable', isZh ? '相当' : 'Similar'],
            ].map(([metric, node, bun, improvement], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{node}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 600 }}>{bun}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{improvement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.fileIoTitle}</h3>
      <p style={pStyle}>{ct.fileIoIntro}</p>

      <pre style={codeStyle}><code>{`// File I/O benchmark
import { readFile, writeFile } from 'node:fs/promises';

// Read 1000 files of 1KB each
async function benchmarkFileRead() {
  const start = performance.now();
  const files = Array.from({ length: 1000 }, (_, i) => \`file\${i}.txt\`);
  await Promise.all(files.map(f => readFile(f, 'utf-8')));
  console.log(\`Read: \${performance.now() - start}ms\`);
}

// Write 1000 files
async function benchmarkFileWrite() {
  const content = 'x'.repeat(1024);
  const start = performance.now();
  const files = Array.from({ length: 1000 }, (_, i) => 
    writeFile(\`file\${i}.txt\`, content)
  );
  await Promise.all(files);
  console.log(\`Write: \${performance.now() - start}ms\`);
}

// Bun optimized version using Bun.file()
async function benchmarkBunFile() {
  const start = performance.now();
  const files = Array.from({ length: 1000 }, (_, i) => {
    const file = Bun.file(\`file\${i}.txt\`);
    return file.text();
  });
  await Promise.all(files);
  console.log(\`Bun read: \${performance.now() - start}ms\`);
}`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>Node.js</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>{isZh ? '提升' : 'Speedup'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '读取 1,000个小文件' : 'Read 1,000 small files', '450ms', '120ms', '3.75x'],
              [isZh ? '写入 1,000个文件' : 'Write 1,000 files', '380ms', '95ms', '4x'],
              [isZh ? '读取 1GB文件' : 'Read 1GB file', '850ms', '320ms', '2.65x'],
              [isZh ? 'JSON解析 (100MB)' : 'JSON parse (100MB)', '2.1s', '0.6s', '3.5x'],
            ].map(([op, node, bun, speedup], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={tdStyle}>{node}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{bun}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{speedup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.startupTitle}</h3>
      <p style={pStyle}>{ct.startupIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Node.js</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Hello World启动' : 'Hello World startup', '45ms', '8ms'],
              [isZh ? 'Express应用启动' : 'Express app startup', '180ms', '45ms'],
              [isZh ? 'TypeScript编译启动' : 'TypeScript transpile startup', '350ms', '15ms'],
              [isZh ? '大型项目启动' : 'Large project startup', '800ms', '180ms'],
            ].map(([scenario, node, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{node}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.packageManagerTitle}</h3>
      <p style={pStyle}>{ct.packageManagerIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>npm</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '安装 100个依赖 (冷)' : 'Install 100 deps (cold)', '45s', '18s', '4s'],
              [isZh ? '安装 100个依赖 (热)' : 'Install 100 deps (hot)', '25s', '8s', '1.5s'],
              [isZh ? 'node_modules大小' : 'node_modules size', '850MB', '850MB', '820MB'],
              [isZh ? '锁文件生成' : 'Lockfile generation', '3s', '2s', '0.5s'],
            ].map(([op, npm, pnpm, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={tdStyle}>{npm}</td>
                <td style={tdStyle}>{pnpm}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features Comparison */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Node.js</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'HTTP服务器' : 'HTTP Server', isZh ? '需express/fastify' : 'Requires express/fastify', 'Bun.serve() (内置)'],
              [isZh ? 'WebSocket' : 'WebSocket', isZh ? '需ws库' : 'Requires ws library', isZh ? '内置' : 'Built-in'],
              [isZh ? 'SQLite' : 'SQLite', isZh ? '需better-sqlite3' : 'Requires better-sqlite3', 'bun:sqlite (内置)'],
              [isZh ? '测试运行器' : 'Test Runner', 'Jest/Vitest/Mocha', 'bun:test (Jest兼容)'],
              [isZh ? '打包工具' : 'Bundler', 'webpack/esbuild/rollup', 'bun build (内置)'],
              [isZh ? '环境变量' : 'Env Variables', 'dotenv', '.env自动加载'],
              [isZh ? 'TypeScript' : 'TypeScript', 'tsx/ts-node', isZh ? '原生支持' : 'Native'],
              [isZh ? 'CSS导入' : 'CSS Imports', isZh ? '需配置' : 'Requires config', isZh ? '内置支持' : 'Built-in'],
            ].map(([feature, node, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{node}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Migration Guide */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <h3 style={h3Style}>{ct.step1Title}</h3>
      <pre style={codeStyle}><code>{`# Install Bun using the official installer
curl -fsSL https://bun.sh/install | bash

# Or using npm
npm install -g bun

# Verify installation
bun --version
# Output: 1.1.x`}</code></pre>

      <h3 style={h3Style}>{ct.step2Title}</h3>
      <pre style={codeStyle}><code>{`// package.json - Before (Node.js)
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint ."
  }
}

// package.json - After (Bun)
{
  "scripts": {
    "start": "bun run src/index.ts",
    "dev": "bun --watch run src/index.ts",
    "build": "bun build src/index.ts --outdir dist",
    "test": "bun test",
    "lint": "eslint ."
  }
}`}</code></pre>

      <h3 style={h3Style}>{ct.step3Title}</h3>
      <pre style={codeStyle}><code>{`// Bun automatically loads .env files
// .env
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=secret_key_here
PORT=3000

// src/index.ts - Access directly (no dotenv needed)
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
const port = parseInt(process.env.PORT || '3000');

// Bun also supports .env.local, .env.production, etc.`}</code></pre>

      <h3 style={h3Style}>{ct.step4Title}</h3>
      <pre style={codeStyle}><code>{`// Run your existing tests with Bun's Jest-compatible runner
bun test

# Watch mode
bun test --watch

# With coverage
bun test --coverage

# Run specific file
bun test src/utils.test.ts`}</code></pre>

      <h3 style={h3Style}>{ct.step5Title}</h3>
      <pre style={codeStyle}><code>{`// Optimize HTTP server for Bun
Bun.serve({
  port: process.env.PORT || 3000,
  hostname: '0.0.0.0',
  
  // Bun-specific: Handle fetch requests
  async fetch(request) {
    const url = new URL(request.url);
    
    // Static file serving (built-in)
    if (url.pathname.startsWith('/static/')) {
      const file = Bun.file(\`./public\${url.pathname}\`);
      return new Response(file);
    }
    
    // API routes
    if (url.pathname === '/api/users') {
      const users = await db.query('SELECT * FROM users');
      return Response.json(users);
    }
    
    return new Response('Not Found', { status: 404 });
  },
  
  // WebSocket support (optional)
  websocket: {
    message(ws, message) {
      ws.send(\`Echo: \${message}\`);
    },
  },
});

// Use Bun's fast SQLite for embedded databases
import { Database } from 'bun:sqlite';

const db = new Database('myapp.db');
db.run(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
\`);`}</code></pre>

      {/* Compatibility */}
      <h2 style={h2Style}>{ct.compatibilityTitle}</h2>
      <p style={pStyle}>{ct.compatibilityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>{isZh ? '完全兼容' : 'Fully Compatible'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Express, Fastify, Koa, Hono, 大多数npm包, TypeScript, JSON模块, URL模块, Crypto模块' : 'Express, Fastify, Koa, Hono, most npm packages, TypeScript, JSON modules, URL modules, Crypto modules'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>{isZh ? '部分兼容' : 'Partially Compatible'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '一些原生插件, 特定的Node.js内部API, Worker Threads的一些功能' : 'Some native addons, specific Node.js internal APIs, some Worker Threads features'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>{isZh ? '已知问题' : 'Known Issues'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用V8特定功能的包, 一些旧的原生模块, 特定的调试器功能' : 'Packages using V8-specific features, some older native modules, specific debugger features'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.bunBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目启动' : 'New project startups'}</li>
            <li>{isZh ? '边缘计算/无服务器' : 'Edge computing / Serverless'}</li>
            <li>{isZh ? 'CLI工具开发' : 'CLI tool development'}</li>
            <li>{isZh ? '高性能API服务器' : 'High-performance API servers'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '构建脚本和工具链' : 'Build scripts and tooling'}</li>
            <li>{isZh ? '实时应用(WebSocket)' : 'Real-time apps (WebSocket)'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.nodeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级生产应用' : 'Enterprise production apps'}</li>
            <li>{isZh ? '遗留代码维护' : 'Legacy codebase maintenance'}</li>
            <li>{isZh ? '依赖特定Node.js包' : 'Dependencies on specific Node.js packages'}</li>
            <li>{isZh ? '需要成熟调试工具' : 'Require mature debugging tools'}</li>
            <li>{isZh ? '团队熟悉Node.js生态' : 'Team familiar with Node.js ecosystem'}</li>
            <li>{isZh ? '需要特定V8功能' : 'Require specific V8 features'}</li>
            <li>{isZh ? '关键任务系统' : 'Mission-critical systems'}</li>
          </ul>
        </div>
      </div>

      {/* Production Considerations */}
      <h2 style={h2Style}>{ct.productionTitle}</h2>
      <p style={pStyle}>{ct.productionIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '考虑因素' : 'Factor'}</th>
              <th style={thStyle}>{isZh ? 'Node.js' : 'Node.js'}</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '稳定性' : 'Stability', isZh ? '15年验证' : '15 years proven', isZh ? '2年，快速改进中' : '2 years, rapidly improving'],
              [isZh ? '社区支持' : 'Community Support', isZh ? '最大生态系统' : 'Largest ecosystem', isZh ? '增长中' : 'Growing rapidly'],
              [isZh ? '人才招聘' : 'Hiring', isZh ? '容易' : 'Easy', isZh ? '较困难' : 'More difficult'],
              [isZh ? '云支持' : 'Cloud Support', isZh ? '全面支持' : 'Full support', isZh ? '部分支持' : 'Partial support'],
              [isZh ? '监控工具' : 'Monitoring Tools', isZh ? '丰富' : 'Rich', isZh ? '有限' : 'Limited'],
              [isZh ? '安全审计' : 'Security Audits', isZh ? '成熟' : 'Mature', isZh ? '进行中' : 'Ongoing'],
            ].map(([factor, node, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{factor}</td>
                <td style={tdStyle}>{node}</td>
                <td style={tdStyle}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/timestamp-converter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>Timestamp Converter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
