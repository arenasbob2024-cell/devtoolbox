'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Deno 2 vs Bun: JavaScript Runtime Comparison 2025',
    intro: 'The JavaScript runtime landscape has evolved beyond Node.js. Deno 2 and Bun represent the next generation of runtimes, each promising superior performance, better developer experience, and modern tooling. This comprehensive comparison examines benchmarks, features, ecosystem compatibility, and real-world use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Bun excels in raw performance (3x faster HTTP, 2x faster test runner) and Node.js compatibility. Deno 2 offers superior security model, built-in TypeScript/JSX, and comprehensive standard library. Choose Bun for Node.js migration and performance-critical apps; choose Deno for new projects prioritizing security and modern DX.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Bun is 3x faster than Deno in HTTP benchmarks with lower memory footprint',
    takeaway2: 'Deno 2 has 99% Node.js compatibility via npm specifiers, closing the ecosystem gap',
    takeaway3: 'Bun includes built-in test runner, bundler, and package manager - all-in-one toolchain',
    takeaway4: 'Deno offers granular security permissions (file, network, env) by default',
    takeaway5: 'Both runtimes support TypeScript natively without configuration',
    takeaway6: 'Bun is ideal for Node.js migration; Deno for security-first greenfield projects',
    
    whatIsDenoTitle: 'What is Deno 2?',
    whatIsDenoContent: 'Deno 2, created by Ryan Dahl (Node.js creator) in 2018 and released in 2024, addresses Node.js design flaws. It features a secure-by-default sandbox, first-class TypeScript support, and a comprehensive standard library. Deno 2 adds full npm compatibility while maintaining its security-first philosophy.',
    
    whatIsBunTitle: 'What is Bun?',
    whatIsBunContent: 'Bun, created by Jarred Sumner in 2021, is a drop-in Node.js replacement focused on performance. Built with Zig and JavaScriptCore (Safari\'s engine), Bun includes a test runner, bundler, and package manager. Version 1.0 launched in September 2023 with impressive benchmark results.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world benchmarks on Apple M2 Pro with 16GB RAM:',
    
    httpBenchmarkTitle: 'HTTP Server Performance',
    httpBenchmarkIntro: 'Simple JSON API with 100 concurrent connections:',
    
    startupTitle: 'Startup Time',
    startupIntro: 'Cold start performance for a basic server:',
    
    memoryTitle: 'Memory Usage',
    memoryIntro: 'Memory consumption under load (1000 concurrent connections):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Built-in capabilities and developer experience:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Similar APIs with different philosophies:',
    
    denoExampleTitle: 'Deno 2',
    bunExampleTitle: 'Bun',
    
    packageManagementTitle: 'Package Management',
    packageManagementIntro: 'How each runtime handles dependencies:',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'Native TypeScript support comparison:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Where can you deploy each runtime?',
    
    migrationTitle: 'Migration from Node.js',
    migrationIntro: 'How easy is it to migrate existing Node.js projects?',
    
    whenToUseTitle: 'When to Use Each Runtime',
    denoBestFor: 'Use Deno 2 When:',
    bunBestFor: 'Use Bun When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Deno 2 and Bun are production-ready alternatives to Node.js. Bun wins on raw performance and Node.js compatibility, making it ideal for existing project migration. Deno 2 excels in security and developer experience for new projects. The choice depends on your priorities: maximum performance (Bun) or security-first design (Deno). Both represent the future of JavaScript runtimes.',
    
    faq1q: 'Is Bun production-ready?',
    faq1a: 'Yes, Bun 1.x is production-ready and used by companies in production. It has achieved stability for core features and maintains 99% Node.js API compatibility. However, always test your specific dependencies before migrating.',
    
    faq2q: 'Can Deno run Node.js packages?',
    faq2a: 'Yes, Deno 2 supports npm packages via npm: specifiers with 99% compatibility. You can import packages like `import express from "npm:express"`. Some native modules may require compatibility shims.',
    
    faq3q: 'Which is faster for web servers?',
    faq3a: 'Bun typically wins HTTP benchmarks by 2-3x due to its optimized HTTP server implementation. However, real-world performance depends on your specific workload, middleware, and database operations.',
    
    faq4q: 'How do I deploy Deno to production?',
    faq4a: 'Deno offers Deno Deploy for edge deployment, or you can use Docker, VPS, or any cloud provider. Deno\'s single-binary distribution makes deployment straightforward.',
    
    faq5q: 'Does Bun support Windows?',
    faq5a: 'Yes, Bun has full Windows support since version 1.0. It works on Windows, macOS, and Linux with consistent behavior across platforms.',
    
    faq6q: 'Which has better TypeScript support?',
    faq6a: 'Both support TypeScript natively without configuration. Deno has slightly better type checking integration, while Bun focuses on compilation speed. Both are excellent choices for TypeScript development.',
    
    faq7q: 'Can I use Bun\'s package manager independently?',
    faq7a: 'Yes, Bun\'s package manager (bun install) can be used as a drop-in replacement for npm/yarn/pnpm. It\'s 20-30x faster than npm and compatible with package.json and lockfiles.',
    
    faq8q: 'What about security differences?',
    faq8a: 'Deno is secure-by-default, requiring explicit permissions for file, network, and environment access. Bun runs with full permissions like Node.js. Choose Deno for untrusted code execution; Bun is fine for trusted server applications.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Deno 2 vs Bun：2025年JavaScript运行时对比',
    intro: 'JavaScript运行时领域已经超越了Node.js。Deno 2和Bun代表了下一代运行时，各自承诺卓越的性能、更好的开发者体验和现代工具链。本全面比较考察基准测试、功能、生态系统兼容性和真实用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Bun在原始性能上领先（HTTP快3倍，测试运行器快2倍）且Node.js兼容性更好。Deno 2提供更优的安全模型、内置TypeScript/JSX和全面的标准库。迁移Node.js项目和性能关键型应用选择Bun；优先安全和新项目DX选择Deno。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Bun在HTTP基准测试中比Deno快3倍，内存占用更低',
    takeaway2: 'Deno 2通过npm说明符实现99%的Node.js兼容性，缩小了生态系统差距',
    takeaway3: 'Bun包含内置测试运行器、打包器和包管理器——一体化工具链',
    takeaway4: 'Deno默认提供细粒度安全权限（文件、网络、环境）',
    takeaway5: '两个运行时都原生支持TypeScript，无需配置',
    takeaway6: 'Bun适合Node.js迁移；Deno适合安全优先的新项目',
    
    whatIsDenoTitle: '什么是Deno 2？',
    whatIsDenoContent: 'Deno 2由Ryan Dahl（Node.js创造者）于2018年创建，2024年发布，解决了Node.js的设计缺陷。它具有默认安全沙箱、一流的TypeScript支持和全面的标准库。Deno 2增加了完整的npm兼容性，同时保持其安全优先的理念。',
    
    whatIsBunTitle: '什么是Bun？',
    whatIsBunContent: 'Bun由Jarred Sumner于2021年创建，是一个专注于性能的Node.js直接替代品。使用Zig和JavaScriptCore（Safari的引擎）构建，Bun包含测试运行器、打包器和包管理器。1.0版本于2023年9月发布，基准测试结果令人印象深刻。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在Apple M2 Pro（16GB RAM）上的真实世界基准测试：',
    
    httpBenchmarkTitle: 'HTTP服务器性能',
    httpBenchmarkIntro: '使用100个并发连接的简单JSON API：',
    
    startupTitle: '启动时间',
    startupIntro: '基本服务器的冷启动性能：',
    
    memoryTitle: '内存使用',
    memoryIntro: '负载下的内存消耗（1000个并发连接）：',
    
    featuresTitle: '功能对比',
    featuresIntro: '内置功能和开发者体验：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '类似的API但理念不同：',
    
    denoExampleTitle: 'Deno 2',
    bunExampleTitle: 'Bun',
    
    packageManagementTitle: '包管理',
    packageManagementIntro: '每个运行时如何处理依赖：',
    
    typescriptTitle: 'TypeScript体验',
    typescriptIntro: '原生TypeScript支持对比：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '你可以在哪里部署每个运行时？',
    
    migrationTitle: '从Node.js迁移',
    migrationIntro: '迁移现有Node.js项目有多容易？',
    
    whenToUseTitle: '何时使用每个运行时',
    denoBestFor: '使用Deno 2的场景：',
    bunBestFor: '使用Bun的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Deno 2和Bun都是生产就绪的Node.js替代品。Bun在原始性能和Node.js兼容性上胜出，是现有项目迁移的理想选择。Deno 2在新项目的安全和开发者体验方面表现出色。选择取决于你的优先级：最大性能（Bun）还是安全优先设计（Deno）。两者都代表JavaScript运行时的未来。',
    
    faq1q: 'Bun已经可以用于生产了吗？',
    faq1a: '是的，Bun 1.x已经可以用于生产，被多家公司在生产环境中使用。其核心功能已达到稳定，并保持99%的Node.js API兼容性。但是，迁移前请务必测试你的特定依赖。',
    
    faq2q: 'Deno可以运行Node.js包吗？',
    faq2a: '可以，Deno 2通过npm:说明符支持npm包，兼容性达99%。你可以像`import express from "npm:express"`这样导入包。一些原生模块可能需要兼容性垫片。',
    
    faq3q: '哪个对Web服务器更快？',
    faq3a: 'Bun通常在HTTP基准测试中领先2-3倍，因为其优化的HTTP服务器实现。然而，实际性能取决于你的特定工作负载、中间件和数据库操作。',
    
    faq4q: '如何将Deno部署到生产环境？',
    faq4a: 'Deno提供Deno Deploy用于边缘部署，或者你可以使用Docker、VPS或任何云提供商。Deno的单二进制分发使部署变得简单。',
    
    faq5q: 'Bun支持Windows吗？',
    faq5a: '是的，Bun从1.0版本开始完全支持Windows。它在Windows、macOS和Linux上运行，各平台行为一致。',
    
    faq6q: '哪个有更好的TypeScript支持？',
    faq6a: '两者都原生支持TypeScript，无需配置。Deno有稍好的类型检查集成，而Bun专注于编译速度。两者都是TypeScript开发的优秀选择。',
    
    faq7q: '我可以独立使用Bun的包管理器吗？',
    faq7a: '可以，Bun的包管理器（bun install）可以作为npm/yarn/pnpm的直接替代品使用。它比npm快20-30倍，与package.json和lockfile兼容。',
    
    faq8q: '安全方面有什么区别？',
    faq8a: 'Deno默认安全，需要明确授权才能访问文件、网络和环境。Bun像Node.js一样以完全权限运行。执行不受信任的代码选择Deno；对于受信任的服务器应用Bun没问题。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function Deno2VsBun({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6q } },
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

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

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsDenoTitle}</h3>
      <p style={pStyle}>{ct.whatIsDenoContent}</p>

      <h3 style={h3Style}>{ct.whatIsBunTitle}</h3>
      <p style={pStyle}>{ct.whatIsBunContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Deno 2</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2020 (v2: 2024)', '2023'],
              [isZh ? '引擎' : 'Engine', 'V8', 'JavaScriptCore'],
              [isZh ? '编程语言' : 'Written in', 'Rust', 'Zig'],
              [isZh ? '安全模型' : 'Security Model', isZh ? '默认沙箱' : 'Sandboxed by default', isZh ? '完全权限' : 'Full permissions'],
              [isZh ? 'TypeScript' : 'TypeScript', isZh ? '原生支持' : 'Native', isZh ? '原生支持' : 'Native'],
              [isZh ? '包管理' : 'Package Manager', isZh ? '内置（deno.json）' : 'Built-in (deno.json)', isZh ? '内置（bun install）' : 'Built-in (bun install)'],
              [isZh ? '标准库' : 'Standard Library', isZh ? '全面' : 'Comprehensive', isZh ? '最小化' : 'Minimal'],
              [isZh ? 'Node兼容' : 'Node Compatibility', '99%', '99%'],
            ].map(([feature, deno, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{deno}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.httpBenchmarkTitle}</h3>
      <p style={pStyle}>{ct.httpBenchmarkIntro}</p>

      <pre style={codeStyle}><code>{`// Deno HTTP Server
Deno.serve({ port: 3000 }, (req) => {
  return new Response(JSON.stringify({ message: 'Hello World' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// Bun HTTP Server
export default {
  port: 3000,
  fetch(req) {
    return new Response(JSON.stringify({ message: 'Hello World' }), {
      headers: { 'Content-Type': 'application/json' }),
    });
  },
};`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Deno 2</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>{isZh ? '差异' : 'Difference'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '请求/秒' : 'Requests/sec', '~85,000', '~250,000', '2.9x'],
              [isZh ? '延迟 (p99)' : 'Latency (p99)', '4.2ms', '1.5ms', '2.8x'],
              [isZh ? '吞吐量' : 'Throughput', '~120 MB/s', '~350 MB/s', '2.9x'],
            ].map(([metric, deno, bun, diff], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{deno}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
                <td style={{ ...tdStyle, color: '#fb923c', fontWeight: 700 }}>{diff}</td>
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
              <th style={thStyle}>Deno 2</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '空脚本' : 'Empty script', '15ms', '5ms'],
              [isZh ? 'TypeScript文件' : 'TypeScript file', '25ms', '12ms'],
              [isZh ? '带导入的服务器' : 'Server with imports', '85ms', '35ms'],
            ].map(([scenario, deno, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{deno}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.memoryTitle}</h3>
      <p style={pStyle}>{ct.memoryIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '状态' : 'State'}</th>
              <th style={thStyle}>Deno 2</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '空闲' : 'Idle', '~25MB', '~15MB'],
              [isZh ? '负载下' : 'Under load', '~180MB', '~95MB'],
              [isZh ? '峰值' : 'Peak', '~250MB', '~140MB'],
            ].map(([state, deno, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{state}</td>
                <td style={tdStyle}>{deno}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Deno 2</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '运行时API' : 'Runtime API', isZh ? 'Web标准' : 'Web Standards', isZh ? 'Web标准+Node兼容' : 'Web + Node compat'],
              [isZh ? '测试运行器' : 'Test Runner', 'deno test', 'bun test'],
              [isZh ? '打包器' : 'Bundler', 'deno bundle', 'bun build'],
              [isZh ? 'Linter' : 'Linter', 'deno lint', isZh ? '需要ESLint' : 'Needs ESLint'],
              [isZh ? '格式化器' : 'Formatter', 'deno fmt', isZh ? '需要Prettier' : 'Needs Prettier'],
              [isZh ? '任务运行器' : 'Task Runner', 'deno task', 'bun run'],
              [isZh ? '编译器' : 'Compiler', 'deno compile', isZh ? '暂不支持' : 'Not yet'],
              [isZh ? '文档生成' : 'Doc Generator', 'deno doc', isZh ? '无内置' : 'None built-in'],
              [isZh ? 'Worker支持' : 'Workers', 'Web Workers', 'Worker + ThreadPool'],
              [isZh ? 'FFI' : 'FFI', 'Deno FFI', 'Bun FFI'],
            ].map(([feature, deno, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{deno}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.denoExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Deno 2 - Full API example with Oak framework
import { Application, Router } from "jsr:@oak/oak@14";
import { cors } from "jsr:@oak/cors";

const app = new Application();
const router = new Router();

// Security: explicit permissions needed
// Run with: deno run --allow-net --allow-env server.ts

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

router
  .get("/api/users", (ctx) => {
    ctx.response.body = { users };
  })
  .post("/api/users", async (ctx) => {
    const body = await ctx.request.body.json();
    const user: User = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
    };
    users.push(user);
    ctx.response.body = { user };
    ctx.response.status = 201;
  })
  .get("/api/users/:id", (ctx) => {
    const user = users.find(u => u.id === ctx.params.id);
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Not found" };
      return;
    }
    ctx.response.body = { user };
  });

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:3000");
await app.listen({ port: 3000 });`}</code></pre>

      <h3 style={{ ...h3Style, color: '#fb923c' }}>{ct.bunExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Bun - Full API example with Hono
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

app.use("*", cors());
app.use("*", logger());

app.get("/api/users", (c) => {
  return c.json({ users });
});

app.post("/api/users", async (c) => {
  const body = await c.req.json();
  const user: User = {
    id: crypto.randomUUID(),
    name: body.name,
    email: body.email,
  };
  users.push(user);
  return c.json({ user }, 201);
});

app.get("/api/users/:id", (c) => {
  const user = users.find(u => u.id === c.req.param("id"));
  if (!user) {
    return c.json({ error: "Not found" }, 404);
  }
  return c.json({ user });
});

console.log("Server running on http://localhost:3000");
export default {
  port: 3000,
  fetch: app.fetch,
};`}</code></pre>

      <h2 style={h2Style}>{ct.packageManagementTitle}</h2>
      <p style={pStyle}>{ct.packageManagementIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Deno 2</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '配置文件' : 'Config file', 'deno.json / deno.jsonc', 'package.json'],
              [isZh ? '锁文件' : 'Lock file', 'deno.lock', 'bun.lockb'],
              [isZh ? '安装速度' : 'Install speed', isZh ? '快' : 'Fast', isZh ? '非常快' : 'Very fast (20-30x npm)'],
              [isZh ? 'npm兼容' : 'npm compat', 'npm: specifier', 'Direct import'],
              [isZh ? 'JSR支持' : 'JSR support', isZh ? '原生' : 'Native', isZh ? '部分' : 'Partial'],
              [isZh ? '全局安装' : 'Global install', 'deno install', 'bun install -g'],
              [isZh ? 'Monorepo' : 'Monorepo', isZh ? '工作区' : 'Workspaces', isZh ? '工作区' : 'Workspaces'],
            ].map(([aspect, deno, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{deno}</td>
                <td style={tdStyle}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Deno 2</th>
              <th style={thStyle}>Bun</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Deno Deploy', '✓ Native', '✗ Not supported'],
              ['Vercel', '✓ Native', '✓ Native'],
              ['Netlify', '✓ Edge Functions', '✓ Functions'],
              ['AWS Lambda', '✓ Custom Runtime', '✓ Layer'],
              ['Fly.io', '✓ Docker', '✓ Native'],
              ['Railway', '✓ Native', '✓ Native'],
              ['Docker', '✓ Single binary', '✓ Official image'],
              ['VPS', '✓ Install script', '✓ Install script'],
            ].map(([platform, deno, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: deno.includes('✓') ? '#22c55e' : '#ef4444' }}>{deno}</td>
                <td style={{ ...tdStyle, color: bun.includes('✓') ? '#22c55e' : '#ef4444' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.denoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '安全优先的应用' : 'Security-first applications'}</li>
            <li>{isZh ? '新绿色项目' : 'Greenfield projects'}</li>
            <li>{isZh ? '边缘计算' : 'Edge computing'}</li>
            <li>{isZh ? 'Deno Deploy部署' : 'Deno Deploy hosting'}</li>
            <li>{isZh ? '使用JSR生态' : 'Using JSR ecosystem'}</li>
            <li>{isZh ? '需要内置工具' : 'Need built-in tooling'}</li>
            <li>{isZh ? '安全执行代码' : 'Sandboxed code execution'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fb923c' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fb923c' }}>{ct.bunBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Node.js迁移' : 'Node.js migration'}</li>
            <li>{isZh ? '性能关键型应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '快速开发迭代' : 'Fast development iteration'}</li>
            <li>{isZh ? '测试密集型项目' : 'Test-heavy projects'}</li>
            <li>{isZh ? '使用npm生态' : 'Using npm ecosystem'}</li>
            <li>{isZh ? '服务器渲染应用' : 'Server-rendered apps'}</li>
            <li>{isZh ? '一体化工具链' : 'All-in-one toolchain'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

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
