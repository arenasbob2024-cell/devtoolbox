'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Bun vs Deno: Modern JavaScript Runtime Comparison',
    intro: 'Node.js has dominated JavaScript server-side development for over a decade, but two new challengers have emerged: Bun and Deno. Both offer modern approaches to JavaScript runtimes with built-in TypeScript support, security features, and improved developer experience. This guide compares both runtimes to help you choose the right one for your projects.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Bun prioritizes speed and drop-in Node.js compatibility, featuring a JavaScriptCore engine and built-in bundler/test runner. Deno focuses on security, standards compliance, and first-class TypeScript support with granular permissions. Choose Bun for performance and ease of migration; choose Deno for security-first applications and modern web standards.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Bun is significantly faster in most benchmarks, especially for I/O operations',
    takeaway2: 'Deno has a more robust security model with explicit permissions',
    takeaway3: 'Both have native TypeScript support without additional configuration',
    takeaway4: 'Bun has better Node.js npm compatibility',
    takeaway5: 'Deno has a more mature standard library and web API support',
    takeaway6: 'Bun includes more built-in tools (bundler, test runner, package manager)',
    
    whatIsBunTitle: 'What is Bun?',
    whatIsBunContent: 'Bun is an all-in-one JavaScript runtime built from scratch using Zig and JavaScriptCore. Released in 2022 by Oven, it aims to be a faster, more complete replacement for Node.js. Bun includes a runtime, bundler, test runner, and package manager in a single binary.',
    
    whatIsDenoTitle: 'What is Deno?',
    whatIsDenoContent: 'Deno is a secure runtime for JavaScript and TypeScript created by Ryan Dahl, the original creator of Node.js. First released in 2020, Deno was designed to address Node.js design regrets. It features a secure-by-default model, built-in TypeScript support, and a standard library of reviewed modules.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks comparing execution speed and resource usage:',
    
    securityTitle: 'Security Model',
    securityIntro: 'How each runtime handles security:',
    
    compatibilityTitle: 'Node.js and npm Compatibility',
    compatibilityIntro: 'How well each runtime works with existing Node.js code:',
    
    toolingTitle: 'Built-in Tooling',
    toolingIntro: 'What tools come built-in with each runtime:',
    
    typescriptTitle: 'TypeScript Support',
    typescriptIntro: 'How TypeScript is handled in each runtime:',
    
    ecosystemTitle: 'Ecosystem and Standard Library',
    ecosystemIntro: 'Available modules and standard library comparison:',
    
    useCasesTitle: 'When to Use Each Runtime',
    bunBestFor: 'Bun is Best For:',
    denoBestFor: 'Deno is Best For:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Where can you deploy each runtime?',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Both Bun and Deno represent exciting advancements in JavaScript runtime technology. Bun excels when you need maximum performance and easy migration from Node.js, with its all-in-one tooling approach reducing complexity. Deno shines in security-conscious environments and when working with modern web standards, its explicit permission model providing defense in depth. In 2025, both are production-ready options, with the choice depending on your specific requirements around performance, security, and ecosystem compatibility.',
    
    faq1q: 'Can Bun and Deno run Node.js code?',
    faq1a: 'Bun aims for drop-in Node.js compatibility and runs most Node.js code without changes. Deno requires some modifications to Node.js code, though compatibility has improved significantly with Deno 2.0. Both can use npm packages to varying degrees.',
    
    faq2q: 'Is Deno more secure than Node.js and Bun?',
    faq2a: 'Deno\'s security model is more explicit, requiring permissions for file system access, network, and environment variables. Bun and Node.js run with full permissions by default. However, all three can be secure when properly configured and deployed.',
    
    faq3q: 'Which runtime is better for TypeScript?',
    faq3a: 'Both have excellent TypeScript support without configuration. Deno\'s type checking is more strict by default. Bun focuses on fast transpilation without type checking, leaving that to your IDE or tsc. The choice depends on your preference for strictness vs speed.',
    
    faq4q: 'Can I use npm packages with Deno?',
    faq4a: 'Yes, Deno 2.0 significantly improved npm compatibility. You can import npm packages using npm: specifiers or import maps. However, not all npm packages work perfectly, especially those with native addons or Node.js-specific internals.',
    
    faq5q: 'Is Bun production-ready?',
    faq5a: 'Bun reached version 1.0 in 2023 and is being used in production by several companies. While newer than Deno, it has proven stable for many use cases. For critical applications, evaluate both based on your specific requirements.',
    
    faq6q: 'Which has better web standards support?',
    faq6a: 'Deno generally has better web standards support, implementing APIs like fetch, WebSocket, and others earlier and more completely. Bun also supports these APIs but focuses more on Node.js compatibility.',
    
    faq7q: 'Can I migrate my Node.js app to these runtimes?',
    faq7a: 'Migrating to Bun is generally easier due to its Node.js compatibility goals. Migrating to Deno may require more changes, particularly around module imports and file system operations. Start with non-critical services when migrating.',
    
    faq8q: 'Do these runtimes work with Docker?',
    faq8a: 'Yes, both have official Docker images. Bun\'s image is significantly smaller than Node.js, which can reduce deployment sizes. Deno also offers slim Docker images. Both work well in containerized environments.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Bun vs Deno：现代JavaScript运行时对比',
    intro: 'Node.js十多年来一直主导着JavaScript服务端开发，但两个新的挑战者已经出现：Bun和Deno。两者都提供了JavaScript运行时的现代方法，具有内置的TypeScript支持、安全功能和改进的开发者体验。本指南比较这两个运行时，帮助你为项目选择合适的一个。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Bun优先考虑速度和即插即用的Node.js兼容性，具有JavaScriptCore引擎和内置的打包器/测试运行器。Deno专注于安全性、标准合规性和一流的TypeScript支持，具有细粒度权限。选择Bun以获得性能和易于迁移；选择Deno以获得安全优先的应用和现代Web标准。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Bun在大多数基准测试中明显更快，特别是对于I/O操作',
    takeaway2: 'Deno具有更强大的安全模型，具有显式权限',
    takeaway3: '两者都有原生TypeScript支持，无需额外配置',
    takeaway4: 'Bun有更好的Node.js npm兼容性',
    takeaway5: 'Deno有更成熟的标准库和Web API支持',
    takeaway6: 'Bun包含更多内置工具（打包器、测试运行器、包管理器）',
    
    whatIsBunTitle: '什么是Bun？',
    whatIsBunContent: 'Bun是一个使用Zig和JavaScriptCore从零构建的多合一JavaScript运行时。由Oven于2022年发布，它旨在成为更快、更完整的Node.js替代品。Bun在单个二进制文件中包含运行时、打包器、测试运行器和包管理器。',
    
    whatIsDenoTitle: '什么是Deno？',
    whatIsDenoContent: 'Deno是由Ryan Dahl（Node.js的原始创建者）创建的JavaScript和TypeScript安全运行时。于2020年首次发布，Deno旨在解决Node.js的设计遗憾。它具有默认安全模型、内置TypeScript支持和经过审查模块的标准库。',
    
    performanceTitle: '性能对比',
    performanceIntro: '比较执行速度和资源使用的基准测试：',
    
    securityTitle: '安全模型',
    securityIntro: '每个运行时如何处理安全性：',
    
    compatibilityTitle: 'Node.js和npm兼容性',
    compatibilityIntro: '每个运行时与现有Node.js代码的配合程度：',
    
    toolingTitle: '内置工具',
    toolingIntro: '每个运行时附带哪些工具：',
    
    typescriptTitle: 'TypeScript支持',
    typescriptIntro: '每个运行时如何处理TypeScript：',
    
    ecosystemTitle: '生态系统和标准库',
    ecosystemIntro: '可用模块和标准库对比：',
    
    useCasesTitle: '何时使用每个运行时',
    bunBestFor: 'Bun 最适合：',
    denoBestFor: 'Deno 最适合：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '你可以在哪里部署每个运行时？',
    
    conclusionTitle: '结论',
    conclusionContent: 'Bun和Deno都代表了JavaScript运行时技术的令人兴奋的进步。当你需要最大性能和从Node.js轻松迁移时，Bun表现出色，其多合一工具方法减少了复杂性。Deno在安全敏感的环境和与现代Web标准配合时表现出色，其显式权限模型提供深度防御。在2025年，两者都是可用于生产的选项，选择取决于你对性能、安全和生态系统兼容性的具体要求。',
    
    faq1q: 'Bun和Deno可以运行Node.js代码吗？',
    faq1a: 'Bun旨在实现即插即用的Node.js兼容性，无需更改即可运行大多数Node.js代码。Deno需要对Node.js代码进行一些修改，尽管Deno 2.0显著提高了兼容性。两者都可以在不同程度上使用npm包。',
    
    faq2q: 'Deno比Node.js和Bun更安全吗？',
    faq2a: 'Deno的安全模型更加显式，需要文件系统访问、网络和环境变量的权限。Bun和Node.js默认以完全权限运行。然而，当正确配置和部署时，三者都可以是安全的。',
    
    faq3q: '哪个运行时更适合TypeScript？',
    faq3a: '两者都有出色的TypeScript支持，无需配置。Deno的类型检查默认更严格。Bun专注于快速转译而不进行类型检查，将其留给你的IDE或tsc。选择取决于你对严格性与速度的偏好。',
    
    faq4q: '我可以在Deno中使用npm包吗？',
    faq4a: '是的，Deno 2.0显著提高了npm兼容性。你可以使用npm:标识符或导入映射来导入npm包。然而，并非所有npm包都能完美工作，特别是那些具有原生插件或Node.js特定内部结构的包。',
    
    faq5q: 'Bun已经可以用于生产了吗？',
    faq5a: 'Bun于2023年达到1.0版本，并被多家公司用于生产环境。虽然比Deno新，但它已在许多用例中证明了稳定性。对于关键应用，根据你的具体要求评估两者。',
    
    faq6q: '哪个有更好的Web标准支持？',
    faq6a: 'Deno通常有更好的Web标准支持，更早、更完整地实现fetch、WebSocket等API。Bun也支持这些API，但更专注于Node.js兼容性。',
    
    faq7q: '我可以将Node.js应用迁移到这些运行时吗？',
    faq7a: '由于Bun的Node.js兼容性目标，迁移到Bun通常更容易。迁移到Deno可能需要更多更改，特别是在模块导入和文件系统操作方面。迁移时从非关键服务开始。',
    
    faq8q: '这些运行时可以在Docker中工作吗？',
    faq8a: '是的，两者都有官方Docker镜像。Bun的镜像比Node.js小得多，可以减少部署大小。Deno也提供精简的Docker镜像。两者都在容器化环境中工作良好。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function BunVsDenoRuntime({ lang }: { lang: string }) {
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '运行时概述' : 'Runtime Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.whatIsBunTitle}</h3>
      <p style={pStyle}>{ct.whatIsBunContent}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.whatIsDenoTitle}</h3>
      <p style={pStyle}>{ct.whatIsDenoContent}</p>

      {/* Architecture */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>Deno</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '引擎' : 'Engine', 'JavaScriptCore (WebKit)', 'V8'],
              [isZh ? '实现语言' : 'Implementation Language', 'Zig', 'Rust'],
              [isZh ? '首次发布' : 'First Released', '2022', '2020'],
              [isZh ? '包管理' : 'Package Management', 'Built-in (bun)', 'URL imports + npm:'],
              [isZh ? 'TypeScript' : 'TypeScript', 'Built-in (fast transpile)', 'Built-in (type checking)'],
              [isZh ? '安全模型' : 'Security Model', 'Open by default', 'Permissions required'],
              [isZh ? '标准库' : 'Standard Library', 'Minimal', 'Extensive (deno.land/std)'],
              [isZh ? '配置文件' : 'Config File', 'bunfig.toml', 'deno.json'],
            ].map(([feature, bun, deno], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{bun}</td>
                <td style={tdStyle}>{deno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '基准测试' : 'Benchmark'}</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>Deno</th>
              <th style={thStyle}>{isZh ? '胜出' : 'Winner'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'HTTP请求/秒' : 'HTTP requests/sec', '~190K', '~100K', 'Bun'],
              [isZh ? 'JSON解析' : 'JSON parsing', '~600K ops/s', '~450K ops/s', 'Bun'],
              [isZh ? '文件I/O' : 'File I/O', '~60ms (100MB)', '~110ms (100MB)', 'Bun'],
              [isZh ? '启动时间' : 'Startup time', '~8ms', '~40ms', 'Bun'],
              [isZh ? '内存使用' : 'Memory usage', '~35MB', '~45MB', 'Bun'],
            ].map(([benchmark, bun, deno, winner], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{benchmark}</td>
                <td style={tdStyle}>{bun}</td>
                <td style={tdStyle}>{deno}</td>
                <td style={{ ...tdStyle, color: winner === 'Bun' ? '#f59e0b' : '#3b82f6', fontWeight: 700 }}>{winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security */}
      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Bun</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '默认开放权限。代码可以无限制地访问文件系统、网络和环境变量。这种设计优先考虑兼容性和易用性，与Node.js行为类似。' : 'Open permissions by default. Code can access filesystem, network, and environment variables without restriction. This design prioritizes compatibility and ease of use, similar to Node.js behavior.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Deno</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '安全优先设计。默认情况下，代码在没有显式权限的情况下无法访问文件系统、网络或环境变量。使用--allow-read、--allow-net等标志授予权限。' : 'Security-first design. Code cannot access filesystem, network, or environment without explicit permissions by default. Use --allow-read, --allow-net flags to grant permissions.'}
          </p>
        </div>
      </div>

      <pre style={codeStyle}><code>{`# Deno - Explicit permissions required
deno run --allow-read --allow-net --allow-env app.ts

# Deno - Granular permissions
deno run --allow-read=/data --allow-net=api.example.com app.ts

# Bun - No permissions needed (runs with full access)
bun run app.ts

# Bun - Can be run with restricted permissions via container/sandbox`}</code></pre>

      {/* Tooling */}
      <h2 style={h2Style}>{ct.toolingTitle}</h2>
      <p style={pStyle}>{ct.toolingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '工具' : 'Tool'}</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>Deno</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '包管理器' : 'Package Manager', 'bun install (built-in)', 'deno cache (URL-based)'],
              [isZh ? '测试运行器' : 'Test Runner', 'bun:test (Jest-like)', 'Deno.test (built-in)'],
              [isZh ? '打包器' : 'Bundler', 'bun build (built-in)', 'deno bundle (built-in)'],
              [isZh ? '格式化工具' : 'Formatter', 'N/A (use Prettier)', 'deno fmt (built-in)'],
              [isZh ? 'Linter' : 'Linter', 'N/A (use ESLint)', 'deno lint (built-in)'],
              [isZh ? '任务运行器' : 'Task Runner', 'bun run (package.json)', 'deno task (deno.json)'],
              [isZh ? 'REPL' : 'REPL', 'bun repl', 'deno repl'],
              [isZh ? '文档生成' : 'Doc Generator', 'N/A', 'deno doc (built-in)'],
            ].map(([tool, bun, deno], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{tool}</td>
                <td style={tdStyle}>{bun}</td>
                <td style={tdStyle}>{deno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.bunBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '从Node.js迁移' : 'Migrating from Node.js'}</li>
            <li>{isZh ? '性能关键型应用' : 'Performance-critical applications'}</li>
            <li>{isZh ? '需要npm包兼容性' : 'Need npm package compatibility'}</li>
            <li>{isZh ? '全合一工具链' : 'All-in-one toolchain'}</li>
            <li>{isZh ? '快速启动时间' : 'Fast startup times'}</li>
            <li>{isZh ? '大型文件I/O' : 'Large file I/O'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.denoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '安全敏感应用' : 'Security-sensitive applications'}</li>
            <li>{isZh ? '现代Web标准优先' : 'Modern web standards first'}</li>
            <li>{isZh ? '需要内置工具' : 'Need built-in tools (fmt, lint)'}</li>
            <li>{isZh ? 'URL-based导入' : 'URL-based imports'}</li>
            <li>{isZh ? '审查过的标准库' : 'Audited standard library'}</li>
            <li>{isZh ? '边缘部署' : 'Edge deployments'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(59,130,246,0.1))', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#f59e0b', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/timestamp-converter`} style={{ color: '#f59e0b', textDecoration: 'none' }}>Timestamp Converter</a>
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
