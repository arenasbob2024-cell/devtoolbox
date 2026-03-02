'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'pnpm vs Bun vs Deno: Package Manager/Runtime Comparison 2025',
    intro: 'The JavaScript ecosystem has evolved beyond npm and Node.js. In 2025, developers can choose between pnpm for efficient package management, Bun for all-in-one runtime speed, or Deno for secure TypeScript-first development. This comparison helps you pick the right tool for your workflow.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'pnpm excels at disk space efficiency and monorepo support. Bun offers the fastest package installation and built-in tooling (test, bundle, run). Deno provides the best security model and native TypeScript support. For most developers in 2025: use pnpm for package management, Bun for local development speed, and Deno for secure edge deployments.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'pnpm saves 50-70% disk space with content-addressable storage',
    takeaway2: 'Bun installs packages 20-30x faster than npm and 3x faster than pnpm',
    takeaway3: 'Deno runs TypeScript natively without any configuration',
    takeaway4: 'Bun includes built-in test runner, bundler, and package manager',
    takeaway5: 'Deno has the strongest security model with explicit permissions',
    takeaway6: 'All three support Node.js compatibility to varying degrees',
    
    whatIsPnpmTitle: 'What is pnpm?',
    whatIsPnpmContent: 'pnpm (performant npm) is a fast, disk space efficient package manager. It uses a content-addressable store to save disk space and ensures strict dependency resolution. Created in 2016, pnpm has become the preferred choice for monorepos and large-scale projects.',
    
    whatIsBunTitle: 'What is Bun?',
    whatIsBunContent: 'Bun is an all-in-one JavaScript runtime, bundler, test runner, and package manager. Built with Zig and powered by JavaScriptCore, Bun aims to replace Node.js, npm, and various build tools with a single, fast binary. Created by Jarred Sumner in 2022, it has rapidly gained adoption.',
    
    whatIsDenoTitle: 'What is Deno?',
    whatIsDenoContent: 'Deno is a secure runtime for JavaScript and TypeScript, created by Ryan Dahl (Node.js creator) to fix Node.js design flaws. It features built-in TypeScript support, a security-first permission model, and a standard library. Deno 2.0 brings full npm compatibility while maintaining its core philosophy.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks on macOS with M2 Pro, installing React and 50 dependencies:',
    
    installSpeedTitle: 'Package Installation Speed',
    installSpeedIntro: 'Cold install (no cache) of a medium-sized project:',
    
    diskSpaceTitle: 'Disk Space Usage',
    diskSpaceIntro: 'Storage efficiency for 10 similar projects:',
    
    runtimeSpeedTitle: 'Runtime Performance',
    runtimeSpeedIntro: 'HTTP server requests per second:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities across all three tools:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Basic usage patterns for each tool:',
    
    pnpmExampleTitle: 'pnpm Commands',
    bunExampleTitle: 'Bun Commands',
    denoExampleTitle: 'Deno Commands',
    
    monorepoTitle: 'Monorepo Support',
    monorepoIntro: 'Workspace and monorepo capabilities:',
    
    securityTitle: 'Security Model',
    securityIntro: 'How each tool handles security:',
    
    typescriptTitle: 'TypeScript Support',
    typescriptIntro: 'TypeScript configuration requirements:',
    
    ecosystemTitle: 'Ecosystem & Compatibility',
    ecosystemIntro: 'Package ecosystem and Node.js compatibility:',
    
    whenToUseTitle: 'When to Use Each Tool',
    pnpmBestFor: 'Use pnpm When:',
    bunBestFor: 'Use Bun When:',
    denoBestFor: 'Use Deno When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the JavaScript tooling landscape offers compelling choices. pnpm remains the best package manager for disk efficiency and monorepos. Bun excels as an all-in-one development environment with unmatched speed. Deno leads in security and TypeScript-first development. Many teams now use a combination: pnpm for package management in CI/CD, Bun for local development, and Deno for edge deployments. Choose based on your primary needs: efficiency (pnpm), speed (Bun), or security (Deno).',
    
    faq1q: 'Can I use pnpm with Bun or Deno?',
    faq1a: 'Yes. pnpm can manage dependencies for Bun projects. For Deno, you can use pnpm with the node_modules directory mode, though Deno has its own dependency management. Many teams use pnpm for monorepo management regardless of runtime.',
    
    faq2q: 'Is Bun ready for production?',
    faq2a: 'Bun 1.x is production-ready for many use cases. Major companies use it in production. However, some Node.js APIs are still being implemented. Test thoroughly if migrating from Node.js, especially for edge cases and native modules.',
    
    faq3q: 'Does Deno support npm packages?',
    faq3a: 'Yes, Deno 2.0 has full npm compatibility. You can import npm packages using "npm:" specifiers. Deno also supports package.json for easier migration from Node.js projects. Most popular npm packages work without issues.',
    
    faq4q: 'Which is fastest for CI/CD pipelines?',
    faq4a: 'Bun is typically fastest for CI/CD due to its speed. However, pnpm with its efficient caching can be equally fast in cached scenarios. The best choice depends on your specific CI setup and caching strategy.',
    
    faq5q: 'Can I migrate from npm to pnpm easily?',
    faq5a: 'Yes, migration is straightforward. Run "pnpm import" to convert package-lock.json to pnpm-lock.yaml. The main difference is pnpm strict dependency resolution, which may expose phantom dependencies in your code.',
    
    faq6q: 'Does Bun support all Node.js APIs?',
    faq6a: 'Bun implements most Node.js APIs but not all. It has excellent coverage for common use cases. Check the Bun documentation for compatibility. Node.js native addons may require recompilation or alternatives.',
    
    faq7q: 'Is Deno good for backend APIs?',
    faq7a: 'Absolutely. Deno is excellent for backend APIs, especially with frameworks like Hono or Oak. Its security model, TypeScript support, and built-in tooling make it a strong choice. Deno Deploy also offers easy edge deployment.',
    
    faq8q: 'Which tool has the best monorepo support?',
    faq8a: 'pnpm has the best monorepo support with built-in workspaces. Turborepo and Nx both recommend pnpm. While Bun and Deno support workspaces, pnpm tooling and ecosystem for monorepos is more mature.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'pnpm vs Bun vs Deno：包管理器/运行时对比 2025',
    intro: 'JavaScript生态系统已超越npm和Node.js。2025年，开发者可以选择pnpm进行高效包管理，Bun获得一站式运行时速度，或Deno进行安全的TypeScript优先开发。本对比帮助你为工作流程选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'pnpm在磁盘空间效率和monorepo支持方面表现出色。Bun提供最快的包安装和内置工具（测试、打包、运行）。Deno提供最佳安全模型和原生TypeScript支持。2025年大多数开发者：用pnpm管理包，用Bun加速本地开发，用Deno进行安全边缘部署。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'pnpm通过内容寻址存储节省50-70%磁盘空间',
    takeaway2: 'Bun安装包比npm快20-30倍，比pnpm快3倍',
    takeaway3: 'Deno无需任何配置即可原生运行TypeScript',
    takeaway4: 'Bun包含内置测试运行器、打包器和包管理器',
    takeaway5: 'Deno具有最强的安全模型，需显式权限',
    takeaway6: '三者都在不同程度上支持Node.js兼容性',
    
    whatIsPnpmTitle: '什么是pnpm？',
    whatIsPnpmContent: 'pnpm（高性能npm）是一个快速、磁盘空间高效的包管理器。它使用内容寻址存储来节省磁盘空间并确保严格的依赖解析。pnpm创建于2016年，已成为monorepo和大型项目的首选。',
    
    whatIsBunTitle: '什么是Bun？',
    whatIsBunContent: 'Bun是一个一站式JavaScript运行时、打包器、测试运行器和包管理器。使用Zig构建，由JavaScriptCore驱动，Bun旨在用单个快速二进制文件替代Node.js、npm和各种构建工具。由Jarred Sumner于2022年创建，迅速获得采用。',
    
    whatIsDenoTitle: '什么是Deno？',
    whatIsDenoContent: 'Deno是一个安全的JavaScript和TypeScript运行时，由Ryan Dahl（Node.js创建者）创建以修复Node.js设计缺陷。它具有内置TypeScript支持、安全优先的权限模型和标准库。Deno 2.0带来完整的npm兼容性，同时保持其核心哲学。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在macOS M2 Pro上的基准测试，安装React和50个依赖：',
    
    installSpeedTitle: '包安装速度',
    installSpeedIntro: '中型项目的冷安装（无缓存）：',
    
    diskSpaceTitle: '磁盘空间使用',
    diskSpaceIntro: '10个类似项目的存储效率：',
    
    runtimeSpeedTitle: '运行时性能',
    runtimeSpeedIntro: 'HTTP服务器每秒请求数：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较三个工具的功能：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '每个工具的基本使用模式：',
    
    pnpmExampleTitle: 'pnpm 命令',
    bunExampleTitle: 'Bun 命令',
    denoExampleTitle: 'Deno 命令',
    
    monorepoTitle: 'Monorepo 支持',
    monorepoIntro: '工作区和monorepo功能：',
    
    securityTitle: '安全模型',
    securityIntro: '每个工具如何处理安全：',
    
    typescriptTitle: 'TypeScript 支持',
    typescriptIntro: 'TypeScript配置要求：',
    
    ecosystemTitle: '生态系统与兼容性',
    ecosystemIntro: '包生态系统和Node.js兼容性：',
    
    whenToUseTitle: '何时使用每个工具',
    pnpmBestFor: '使用pnpm的场景：',
    bunBestFor: '使用Bun的场景：',
    denoBestFor: '使用Deno的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '2025年，JavaScript工具生态系统提供了令人信服的选择。pnpm仍然是磁盘效率和monorepo的最佳包管理器。Bun作为一站式开发环境，速度无可匹敌。Deno在安全和TypeScript优先开发方面领先。许多团队现在组合使用：CI/CD中用pnpm管理包，本地开发用Bun，边缘部署用Deno。根据你的主要需求选择：效率（pnpm）、速度（Bun）或安全（Deno）。',
    
    faq1q: '我可以在Bun或Deno中使用pnpm吗？',
    faq1a: '可以。pnpm可以管理Bun项目的依赖。对于Deno，你可以在node_modules目录模式下使用pnpm，尽管Deno有自己的依赖管理。许多团队无论使用什么运行时都用pnpm进行monorepo管理。',
    
    faq2q: 'Bun准备好用于生产了吗？',
    faq2a: 'Bun 1.x对许多用例已经可以用于生产。大公司已在生产中使用它。但是，一些Node.js API仍在实现中。如果从Node.js迁移，请彻底测试，特别是边缘情况和原生模块。',
    
    faq3q: 'Deno支持npm包吗？',
    faq3a: '是的，Deno 2.0具有完整的npm兼容性。你可以使用"npm:"说明符导入npm包。Deno也支持package.json以便从Node.js项目更容易迁移。大多数流行的npm包可以无问题工作。',
    
    faq4q: 'CI/CD管道中哪个最快？',
    faq4a: 'Bun通常因速度在CI/CD中最快。但是，pnpm配合其高效缓存在缓存场景中同样快。最佳选择取决于你的具体CI设置和缓存策略。',
    
    faq5q: '我可以轻松从npm迁移到pnpm吗？',
    faq5a: '是的，迁移很简单。运行"pnpm import"将package-lock.json转换为pnpm-lock.yaml。主要区别是pnpm严格依赖解析，可能会暴露代码中的幽灵依赖。',
    
    faq6q: 'Bun支持所有Node.js API吗？',
    faq6a: 'Bun实现了大多数但不是所有Node.js API。它对常见用例有出色的覆盖。查看Bun文档了解兼容性。Node.js原生插件可能需要重新编译或替代方案。',
    
    faq7q: 'Deno适合后端API吗？',
    faq7a: '当然。Deno非常适合后端API，特别是使用Hono或Oak等框架。其安全模型、TypeScript支持和内置工具使其成为强大的选择。Deno Deploy还提供轻松的边缘部署。',
    
    faq8q: '哪个工具的monorepo支持最好？',
    faq8a: 'pnpm具有最好的monorepo支持，内置工作区。Turborepo和Nx都推荐pnpm。虽然Bun和Deno支持工作区，但pnpm的monorepo工具和生态系统更成熟。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PnpmVsBunVsDeno({ lang }: { lang: string }) {
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

      <h2 style={h2Style}>{isZh ? '工具概述' : 'Tool Overview'}</h2>
      
      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.whatIsPnpmTitle}</h3>
      <p style={pStyle}>{ct.whatIsPnpmContent}</p>

      <h3 style={{ ...h3Style, color: '#fb923c' }}>{ct.whatIsBunTitle}</h3>
      <p style={pStyle}>{ct.whatIsBunContent}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.whatIsDenoTitle}</h3>
      <p style={pStyle}>{ct.whatIsDenoContent}</p>

      <h2 style={h2Style}>{isZh ? '核心对比' : 'Core Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>Deno</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2016', '2022', '2018'],
              [isZh ? '主要功能' : 'Primary Role', 'Package Manager', 'Runtime + Tools', 'Runtime'],
              [isZh ? '编程语言' : 'Written In', 'TypeScript', 'Zig', 'Rust'],
              [isZh ? 'TypeScript原生' : 'Native TypeScript', isZh ? '否（用于配置）' : 'No (for config)', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '安全模型' : 'Security Model', isZh ? '标准' : 'Standard', isZh ? '标准' : 'Standard', isZh ? '权限沙箱' : 'Permission sandbox'],
              [isZh ? '包大小' : 'Binary Size', '~15MB', '~90MB', '~50MB'],
              [isZh ? '内置测试' : 'Built-in Test', isZh ? '否' : 'No', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
            ].map(([feature, pnpm, bun, deno], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{pnpm}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{deno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.installSpeedTitle}</h3>
      <p style={pStyle}>{ct.installSpeedIntro}</p>

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
              [isZh ? '冷安装' : 'Cold Install', '~45s', '~12s', '~1.5s'],
              [isZh ? '热安装（有缓存）' : 'Warm Install (cached)', '~8s', '~2s', '~0.3s'],
              [isZh ? '添加单个包' : 'Add Single Package', '~3s', '~1s', '~0.1s'],
            ].map(([op, npm, pnpm, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={tdStyle}>{npm}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{pnpm}</td>
                <td style={{ ...tdStyle, color: '#fb923c', fontWeight: 700 }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.diskSpaceTitle}</h3>
      <p style={pStyle}>{ct.diskSpaceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>npm</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>{isZh ? '节省' : 'Savings'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '单个项目' : 'Single Project', '500MB', '500MB', '0%'],
              [isZh ? '10个类似项目' : '10 Similar Projects', '5GB', '800MB', '84%'],
              [isZh ? '20个类似项目' : '20 Similar Projects', '10GB', '1.2GB', '88%'],
            ].map(([scenario, npm, pnpm, savings], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{npm}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{pnpm}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.runtimeSpeedTitle}</h3>
      <p style={pStyle}>{ct.runtimeSpeedIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '测试' : 'Test'}</th>
              <th style={thStyle}>Node.js</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>Deno</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'HTTP请求/秒' : 'HTTP req/sec', '~40,000', '~80,000', '~65,000'],
              [isZh ? '启动时间' : 'Startup Time', '~150ms', '~10ms', '~30ms'],
              [isZh ? '内存使用（空闲）' : 'Memory (idle)', '~35MB', '~15MB', '~20MB'],
            ].map(([test, node, bun, deno], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{test}</td>
                <td style={tdStyle}>{node}</td>
                <td style={{ ...tdStyle, color: '#fb923c', fontWeight: 700 }}>{bun}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{deno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.pnpmExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# pnpm - Package Manager Commands

# Install dependencies
pnpm install

# Add a package
pnpm add react react-dom

# Add dev dependency
pnpm add -D typescript

# Run scripts
pnpm dev
pnpm build

# Workspace commands (monorepo)
pnpm --filter @myorg/ui add lodash
pnpm -r build  # Run in all packages

# Global packages
pnpm add -g prettier

# Update packages
pnpm update
pnpm update --latest

# Clean install
pnpm store prune  # Clean store
pnpm install --force`}</code></pre>

      <h3 style={{ ...h3Style, color: '#fb923c' }}>{ct.bunExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Bun - All-in-one Commands

# Install dependencies
bun install

# Add packages
bun add react react-dom
bun add -d typescript

# Run files directly
bun run server.ts
bun server.ts  # "run" is optional

# Run package.json scripts
bun dev
bun build

# Built-in test runner
bun test
bun test --watch

# Built-in bundler
bun build ./src/index.ts --outdir ./dist

# Package manager features
bun pm ls  # List packages
bun pm cache rm  # Clear cache

# Run Node.js scripts faster
bun run script.js`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.denoExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Deno - Secure Runtime Commands

# Run TypeScript directly
deno run server.ts

# Run with permissions
deno run --allow-net --allow-read server.ts

# Run from URL
deno run https://deno.land/std/examples/welcome.ts

# Install executable
deno install -n serve --allow-net server.ts

# Built-in test runner
deno test
deno test --coverage

# Lint and format
deno lint
deno fmt

# Compile to executable
deno compile --output app server.ts

# Add npm package
deno add npm:lodash

# Cache dependencies
deno cache server.ts`}</code></pre>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>Deno</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '包管理器' : 'Package Manager', isZh ? '核心功能' : 'Core Feature', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '运行时' : 'Runtime', isZh ? '否（用Node）' : 'No (uses Node)', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '打包器' : 'Bundler', isZh ? '否' : 'No', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '测试运行器' : 'Test Runner', isZh ? '否' : 'No', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? 'TypeScript' : 'TypeScript', isZh ? '配置文件' : 'Config file', isZh ? '原生' : 'Native', isZh ? '原生' : 'Native'],
              [isZh ? 'Monorepo' : 'Monorepo', isZh ? '优秀' : 'Excellent', isZh ? '基础' : 'Basic', isZh ? '基础' : 'Basic'],
              [isZh ? '安全模型' : 'Security', isZh ? '标准' : 'Standard', isZh ? '标准' : 'Standard', isZh ? '权限沙箱' : 'Sandbox'],
              [isZh ? 'npm兼容' : 'npm Compat', isZh ? '完全' : 'Full', isZh ? '大部分' : 'Most', isZh ? '完全（2.0）' : 'Full (2.0)'],
            ].map(([feature, pnpm, bun, deno], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{pnpm}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{deno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>pnpm</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '标准Node.js安全模型。依赖隔离防止访问未声明的包。无运行时权限系统。' : 'Standard Node.js security model. Dependency isolation prevents access to undeclared packages. No runtime permission system.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #fb923c' }}>
          <strong style={{ color: '#fb923c' }}>Bun</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '标准安全模型，类似Node.js。无内置权限系统。专注于性能而非安全沙箱。' : 'Standard security model, similar to Node.js. No built-in permission system. Focus on performance rather than security sandbox.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>Deno</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '最严格的安全模型。默认无权限，必须显式授予文件、网络、环境变量等访问权限。适合运行不可信代码。' : 'Strictest security model. No permissions by default, must explicitly grant file, network, env access. Ideal for running untrusted code.'}
          </p>
        </div>
      </div>

      <pre style={codeStyle}><code>{`# Deno Permission Examples

# No permissions (most secure)
deno run script.ts

# Allow network access
deno run --allow-net script.ts

# Allow specific domains
deno run --allow-net=api.example.com script.ts

# Allow file system read
deno run --allow-read script.ts

# Allow specific directories
deno run --allow-read=/tmp,/data script.ts

# Allow all permissions (like Node.js)
deno run -A script.ts

# Multiple permissions
deno run --allow-net --allow-read --allow-env server.ts`}</code></pre>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.pnpmBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Monorepo项目' : 'Monorepo projects'}</li>
            <li>{isZh ? '磁盘空间有限' : 'Limited disk space'}</li>
            <li>{isZh ? '企业级项目' : 'Enterprise projects'}</li>
            <li>{isZh ? 'CI/CD优化' : 'CI/CD optimization'}</li>
            <li>{isZh ? '严格依赖管理' : 'Strict dependency management'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fb923c' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fb923c' }}>{ct.bunBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '本地开发速度' : 'Local dev speed'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '测试运行' : 'Test running'}</li>
            <li>{isZh ? '脚本执行' : 'Script execution'}</li>
            <li>{isZh ? '全栈应用' : 'Full-stack apps'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.denoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '安全敏感应用' : 'Security-sensitive apps'}</li>
            <li>{isZh ? '边缘计算' : 'Edge computing'}</li>
            <li>{isZh ? 'TypeScript优先' : 'TypeScript-first'}</li>
            <li>{isZh ? 'Deno Deploy' : 'Deno Deploy'}</li>
            <li>{isZh ? '内部工具' : 'Internal tools'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/uuid-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
