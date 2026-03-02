'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SvelteKit vs Next.js: Full-Stack Framework Battle',
    intro: 'SvelteKit and Next.js represent competing visions for full-stack web development. Next.js dominates with React ecosystem maturity, while SvelteKit offers compile-time optimization and simpler syntax. This comparison examines performance, developer experience, and real-world tradeoffs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Next.js offers ecosystem maturity, extensive documentation, and React compatibility. SvelteKit provides better performance through compile-time optimization, smaller bundle sizes, and simpler syntax. Choose Next.js for team familiarity and React ecosystem. Choose SvelteKit for greenfield projects prioritizing performance and developer experience.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'SvelteKit compiles to vanilla JS, Next.js ships React runtime',
    takeaway2: 'SvelteKit bundles are 50-70% smaller than equivalent Next.js apps',
    takeaway3: 'Next.js has larger ecosystem, more tutorials, and community support',
    takeaway4: 'SvelteKit offers simpler syntax with less boilerplate code',
    takeaway5: 'Both support SSR, SSG, ISR, and API routes',
    takeaway6: 'SvelteKit 2.0 adds improved server hooks and enhanced types',
    
    whatIsSvelteKitTitle: 'What is SvelteKit?',
    whatIsSvelteKitContent: 'SvelteKit is the official application framework for Svelte, a radical new compiler that turns declarative components into efficient imperative code. Unlike React which ships a runtime, Svelte compiles at build time, producing highly optimized vanilla JavaScript. SvelteKit provides file-based routing, server-side rendering, and API endpoints with minimal configuration.',
    
    whatIsNextjsTitle: 'What is Next.js?',
    whatIsNextjsContent: 'Next.js by Vercel is the production-ready React framework that pioneered hybrid static and server rendering. With over 4 million weekly npm downloads, it provides the most mature full-stack React development experience. Next.js 15 introduces Turbopack for faster builds, improved caching, and enhanced server components support.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world benchmarks comparing identical applications:',
    
    bundleSizeTitle: 'Bundle Size Comparison',
    bundleSizeIntro: 'JavaScript shipped to the browser for equivalent apps:',
    
    runtimePerformanceTitle: 'Runtime Performance',
    runtimePerformanceIntro: 'Client-side interaction benchmarks:',
    
    buildTimeTitle: 'Build Performance',
    buildTimeIntro: 'Development and production build times:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Core capabilities and framework features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Framework syntax and patterns comparison:',
    
    svelteKitExampleTitle: 'SvelteKit',
    nextjsExampleTitle: 'Next.js',
    
    routingTitle: 'Routing Patterns',
    routingIntro: 'File-based routing implementation:',
    
    dataFetchingTitle: 'Data Fetching',
    dataFetchingIntro: 'Server data loading strategies:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Platform support and adapters:',
    
    whenToUseTitle: 'When to Use Each Framework',
    svelteKitBestFor: 'Use SvelteKit When:',
    nextjsBestFor: 'Use Next.js When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'SvelteKit and Next.js cater to different priorities. SvelteKit wins on performance, bundle size, and developer experience with its compiler approach. Next.js dominates in ecosystem, enterprise adoption, and team familiarity with React. For performance-critical applications and teams open to new paradigms, SvelteKit is compelling. For enterprise stability and React ecosystem access, Next.js remains the safe choice.',
    
    faq1q: 'Can I use React libraries in SvelteKit?',
    faq1a: 'Not directly. SvelteKit uses Svelte components, but you can wrap React components using svelte-fragment-component. However, this defeats the bundle size benefits. For most cases, find Svelte equivalents or build custom components.',
    
    faq2q: 'Is SvelteKit production-ready?',
    faq2a: 'Yes, SvelteKit 2.0 is production-ready with stable APIs. Major companies like The New York Times, Rakuten, and 1Password use SvelteKit in production. The ecosystem is smaller than React but growing rapidly.',
    
    faq3q: 'Which has better SEO?',
    faq3a: 'Both provide excellent SEO through server-side rendering. SvelteKit has a slight edge due to smaller JavaScript payloads and faster initial renders. Next.js offers mature meta tag management with next-seo package.',
    
    faq4q: 'How do Server Components compare?',
    faq4a: 'Next.js has React Server Components (RSC) with streaming. SvelteKit uses a simpler model where all components can run on server or client. RSC offers more granular control, but SvelteKit approach is easier to understand.',
    
    faq5q: 'Can I migrate from Next.js to SvelteKit?',
    faq5a: 'Migration requires rewriting components from React to Svelte. Business logic and API routes can be reused. The syntax is simpler, so developers typically adapt quickly. Plan for 2-4 weeks for a medium-sized application.',
    
    faq6q: 'Which has better TypeScript support?',
    faq6a: 'Both have excellent TypeScript support. SvelteKit provides better type inference for routes and stores with less configuration. Next.js requires more setup but has extensive type definitions available.',
    
    faq7q: 'How do they handle animations?',
    faq7a: 'Svelte has built-in animation and transition directives, making animations simpler. Next.js requires external libraries like Framer Motion. SvelteKit animation syntax is more concise and integrated.',
    
    faq8q: 'Which framework is easier to learn?',
    faq8a: 'SvelteKit is generally easier to learn. Svelte syntax is closer to vanilla HTML/CSS/JS. Next.js requires understanding React hooks, state management, and the React ecosystem. Beginners often pick up SvelteKit faster.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'SvelteKit vs Next.js：全栈框架之战',
    intro: 'SvelteKit 和 Next.js 代表了全栈 Web 开发的竞争愿景。Next.js 以 React 生态系统成熟度占主导，而 SvelteKit 通过编译时优化和更简单的语法提供优势。本比较考察性能、开发者体验和实际权衡。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Next.js 提供生态系统成熟度、丰富文档和 React 兼容性。SvelteKit 通过编译时优化、更小的包体积和更简单的语法提供更好的性能。团队熟悉 React 生态系统选择 Next.js。新项目优先考虑性能和开发者体验选择 SvelteKit。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'SvelteKit 编译为原生 JS，Next.js 发送 React 运行时',
    takeaway2: 'SvelteKit 包体积比同等 Next.js 应用小 50-70%',
    takeaway3: 'Next.js 拥有更大的生态系统、更多教程和社区支持',
    takeaway4: 'SvelteKit 提供更简单的语法，样板代码更少',
    takeaway5: '两者都支持 SSR、SSG、ISR 和 API 路由',
    takeaway6: 'SvelteKit 2.0 增加改进的服务器钩子和增强类型',
    
    whatIsSvelteKitTitle: '什么是 SvelteKit？',
    whatIsSvelteKitContent: 'SvelteKit 是 Svelte 的官方应用框架，Svelte 是一个革命性的编译器，将声明式组件转换为高效的原生代码。不同于 React 发送运行时，Svelte 在构建时编译，生成高度优化的原生 JavaScript。SvelteKit 提供基于文件的路由、服务端渲染和 API 端点，配置极少。',
    
    whatIsNextjsTitle: '什么是 Next.js？',
    whatIsNextjsContent: 'Vercel 的 Next.js 是生产就绪的 React 框架，开创了混合静态和服务器渲染。npm 每周下载量超过 400 万，提供最成熟的全栈 React 开发体验。Next.js 15 引入 Turbopack 实现更快构建、改进缓存和增强服务器组件支持。',
    
    performanceTitle: '性能对比',
    performanceIntro: '相同应用的实际基准测试：',
    
    bundleSizeTitle: '包体积对比',
    bundleSizeIntro: '同等应用发送到浏览器的 JavaScript：',
    
    runtimePerformanceTitle: '运行时性能',
    runtimePerformanceIntro: '客户端交互基准测试：',
    
    buildTimeTitle: '构建性能',
    buildTimeIntro: '开发和生产构建时间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心能力和框架功能：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '框架语法和模式对比：',
    
    svelteKitExampleTitle: 'SvelteKit',
    nextjsExampleTitle: 'Next.js',
    
    routingTitle: '路由模式',
    routingIntro: '基于文件的路由实现：',
    
    dataFetchingTitle: '数据获取',
    dataFetchingIntro: '服务器数据加载策略：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '平台支持和适配器：',
    
    whenToUseTitle: '何时使用每个框架',
    svelteKitBestFor: '使用 SvelteKit 的场景：',
    nextjsBestFor: '使用 Next.js 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'SvelteKit 和 Next.js 迎合不同优先级。SvelteKit 通过编译器方法在性能、包体积和开发者体验上胜出。Next.js 在生态系统、企业采用和团队 React 熟悉度上占主导。对于性能关键型应用和愿意接受新范式的团队，SvelteKit 很有吸引力。对于企业稳定性和 React 生态系统访问，Next.js 仍是安全选择。',
    
    faq1q: '可以在 SvelteKit 中使用 React 库吗？',
    faq1a: '不能直接使用。SvelteKit 使用 Svelte 组件，但可以使用 svelte-fragment-component 包装 React 组件。然而，这会抵消包体积优势。大多数情况下，找 Svelte 等价物或构建自定义组件。',
    
    faq2q: 'SvelteKit 可以用于生产吗？',
    faq2a: '可以，SvelteKit 2.0 已可用于生产，API 稳定。《纽约时报》、乐天和 1Password 等大公司在生产中使用 SvelteKit。生态系统比 React 小但快速增长。',
    
    faq3q: '哪个对 SEO 更好？',
    faq3a: '两者通过服务端渲染提供出色的 SEO。SvelteKit 因更小的 JavaScript 负载和更快的初始渲染略有优势。Next.js 通过 next-seo 包提供成熟的元标签管理。',
    
    faq4q: '服务器组件如何比较？',
    faq4a: 'Next.js 有 React Server Components (RSC) 支持流式传输。SvelteKit 使用更简单的模型，所有组件可以在服务器或客户端运行。RSC 提供更细粒度控制，但 SvelteKit 方法更容易理解。',
    
    faq5q: '可以从 Next.js 迁移到 SvelteKit 吗？',
    faq5a: '迁移需要将组件从 React 重写为 Svelte。业务逻辑和 API 路由可以重用。语法更简单，开发者通常快速适应。中型应用计划 2-4 周。',
    
    faq6q: '哪个有更好的 TypeScript 支持？',
    faq6a: '两者都有出色的 TypeScript 支持。SvelteKit 为路由和 store 提供更好的类型推断，配置更少。Next.js 需要更多设置但有丰富的类型定义可用。',
    
    faq7q: '它们如何处理动画？',
    faq7a: 'Svelte 有内置动画和过渡指令，使动画更简单。Next.js 需要外部库如 Framer Motion。SvelteKit 动画语法更简洁和集成。',
    
    faq8q: '哪个框架更容易学习？',
    faq8a: 'SvelteKit 通常更容易学习。Svelte 语法更接近原生 HTML/CSS/JS。Next.js 需要理解 React hooks、状态管理和 React 生态系统。初学者通常更快掌握 SvelteKit。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SvelteKitVsNextjs({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '框架概述' : 'Framework Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsSvelteKitTitle}</h3>
      <p style={pStyle}>{ct.whatIsSvelteKitContent}</p>

      <h3 style={h3Style}>{ct.whatIsNextjsTitle}</h3>
      <p style={pStyle}>{ct.whatIsNextjsContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>SvelteKit</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2021', '2016'],
              [isZh ? '编译方式' : 'Compilation', 'Compile to vanilla JS', 'Runtime with React'],
              [isZh ? 'UI框架' : 'UI Framework', 'Svelte', 'React'],
              [isZh ? '渲染策略' : 'Rendering', 'SSR/SSG/CSR adaptive', 'SSR/SSG/ISR/RSC'],
              [isZh ? '路由类型' : 'Routing', 'File-based', 'File-based (App Router)'],
              [isZh ? '状态管理' : 'State Management', 'Built-in stores', 'External libraries'],
              [isZh ? '样式方案' : 'Styling', 'Scoped CSS built-in', 'CSS Modules/Tailwind/etc'],
            ].map(([feature, sveltekit, nextjs], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{sveltekit}</td>
                <td style={tdStyle}>{nextjs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.bundleSizeTitle}</h3>
      <p style={pStyle}>{ct.bundleSizeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '应用类型' : 'App Type'}</th>
              <th style={thStyle}>SvelteKit</th>
              <th style={thStyle}>Next.js</th>
              <th style={thStyle}>{isZh ? '减少' : 'Reduction'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Hello World' : 'Hello World', '8KB', '85KB', '90%'],
              [isZh ? '博客应用' : 'Blog App', '22KB', '145KB', '85%'],
              [isZh ? '电商仪表板' : 'E-commerce Dashboard', '68KB', '195KB', '65%'],
              [isZh ? '复杂SPA' : 'Complex SPA', '120KB', '280KB', '57%'],
            ].map(([type, sveltekit, nextjs, reduction], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{sveltekit}</td>
                <td style={tdStyle}>{nextjs}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{reduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.runtimePerformanceTitle}</h3>
      <p style={pStyle}>{ct.runtimePerformanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>SvelteKit</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次内容绘制' : 'First Contentful Paint', '0.9s', '1.3s'],
              [isZh ? '交互时间' : 'Time to Interactive', '1.2s', '1.9s'],
              [isZh ? '列表渲染 (1000项)' : 'List Render (1000 items)', '12ms', '28ms'],
              [isZh ? '状态更新' : 'State Update', '3ms', '8ms'],
              [isZh ? '路由切换' : 'Route Transition', '85ms', '145ms'],
            ].map(([metric, sveltekit, nextjs], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{sveltekit}</td>
                <td style={tdStyle}>{nextjs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.buildTimeTitle}</h3>
      <p style={pStyle}>{ct.buildTimeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '构建类型' : 'Build Type'}</th>
              <th style={thStyle}>SvelteKit</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开发启动' : 'Dev Startup', '1.2s', '2.8s'],
              [isZh ? '热更新' : 'Hot Reload', '180ms', '320ms'],
              [isZh ? '生产构建 (小项目)' : 'Production Build (small)', '8s', '15s'],
              [isZh ? '生产构建 (大项目)' : 'Production Build (large)', '45s', '120s'],
            ].map(([type, sveltekit, nextjs], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{sveltekit}</td>
                <td style={tdStyle}>{nextjs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>SvelteKit</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '服务端渲染' : 'Server Rendering', '✓', '✓'],
              [isZh ? '静态生成' : 'Static Generation', '✓', '✓'],
              [isZh ? '增量静态再生' : 'ISR', '✓', '✓'],
              [isZh ? '服务器组件' : 'Server Components', isZh ? '所有组件' : 'All components', 'RSC'],
              [isZh ? 'API路由' : 'API Routes', '✓', '✓'],
              [isZh ? '表单处理' : 'Form Actions', '✓', '✓'],
              [isZh ? '图片优化' : 'Image Optimization', '@sveltejs/enhanced-img', 'next/image'],
              [isZh ? '内置动画' : 'Built-in Animations', '✓', '需要库'],
              [isZh ? 'TypeScript' : 'TypeScript', '✓', '✓'],
              [isZh ? '适配器' : 'Adapters', 'Multiple', 'Vercel-focused'],
            ].map(([feature, sveltekit, nextjs], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{sveltekit}</td>
                <td style={tdStyle}>{nextjs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.svelteKitExampleTitle}</h3>
      <pre style={codeStyle}><code>{`<!-- SvelteKit - Counter component -->
<script>
  let count = 0;
  
  function increment() {
    count += 1;
  }
  
  function decrement() {
    count -= 1;
  }
</script>

<button on:click={decrement}>-</button>
<span>{count}</span>
<button on:click={increment}>+</button>

<style>
  button {
    padding: 8px 16px;
    background: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  span {
    margin: 0 16px;
    font-size: 24px;
    font-weight: bold;
  }
</style>`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.nextjsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Next.js - Counter component
'use client';

import { useState } from 'react';
import styles from './Counter.module.css';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return (
    <div>
      <button onClick={decrement} className={styles.button}>-</button>
      <span className={styles.count}>{count}</span>
      <button onClick={increment} className={styles.button}>+</button>
    </div>
  );
}

// Counter.module.css
.button {
  padding: 8px 16px;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
}

.count {
  margin: 0 16px;
  font-size: 24px;
  font-weight: bold;
}`}</code></pre>

      {/* Data Fetching */}
      <h2 style={h2Style}>{ct.dataFetchingTitle}</h2>
      <p style={pStyle}>{ct.dataFetchingIntro}</p>

      <pre style={codeStyle}><code>{`// SvelteKit - Server-side data loading
// +page.server.ts
export async function load({ params, fetch }) {
  const post = await fetch('/api/posts/' + params.slug);
  const comments = await fetch('/api/posts/' + params.slug + '/comments');
  
  return {
    post: await post.json(),
    comments: await comments.json(),
  };
}

// +page.svelte
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>{data.post.content}</p>

{#each data.comments as comment}
  <div class="comment">{comment.text}</div>
{/each}

// Next.js - Server-side data loading
// app/posts/[slug]/page.tsx
async function getPost(slug) {
  const res = await fetch('/api/posts/' + slug);
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>SvelteKit</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vercel', '✓ (adapter)', '✓ (native)'],
              ['Netlify', '✓', '✓'],
              ['Cloudflare Pages', '✓', '✓'],
              ['AWS', '✓', '✓'],
              ['Deno Deploy', '✓', '✓'],
              ['Node.js', '✓ (adapter)', '✓'],
              ['Static', '✓ (adapter)', '✓'],
            ].map(([platform, sveltekit, nextjs], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={tdStyle}>{sveltekit}</td>
                <td style={tdStyle}>{nextjs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.svelteKitBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '性能关键应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '移动优先项目' : 'Mobile-first projects'}</li>
            <li>{isZh ? '小团队快速开发' : 'Small teams, fast development'}</li>
            <li>{isZh ? '喜欢简洁语法' : 'Prefer concise syntax'}</li>
            <li>{isZh ? '内容网站和博客' : 'Content sites and blogs'}</li>
            <li>{isZh ? '轻量级Web应用' : 'Lightweight web apps'}</li>
            <li>{isZh ? '愿意尝试新技术' : 'Open to new paradigms'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.nextjsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '团队熟悉React' : 'Teams familiar with React'}</li>
            <li>{isZh ? '需要React生态系统' : 'Need React ecosystem'}</li>
            <li>{isZh ? '大型复杂应用' : 'Large complex apps'}</li>
            <li>{isZh ? '已验证的生产方案' : 'Proven production solutions'}</li>
            <li>{isZh ? '丰富教程需求' : 'Extensive tutorials needed'}</li>
            <li>{isZh ? 'Vercel深度集成' : 'Deep Vercel integration'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a>
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
