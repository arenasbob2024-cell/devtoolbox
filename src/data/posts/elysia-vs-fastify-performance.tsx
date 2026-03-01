'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Elysia vs Fastify: High-Performance Node.js Framework Battle',
    intro: 'Performance-focused web frameworks have become essential for modern JavaScript applications. Elysia, built on Bun\'s runtime, and Fastify, the established performance leader for Node.js, represent two approaches to building high-speed APIs. This guide compares both frameworks across performance, developer experience, and ecosystem.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Elysia delivers the absolute best performance when running on Bun, with type-safe validation built-in and a minimal footprint. Fastify offers the best cross-runtime compatibility and mature ecosystem across Node.js, Deno, and Bun. Choose Elysia for maximum speed on Bun runtime; choose Fastify for ecosystem maturity and runtime flexibility.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Elysia on Bun is the fastest JavaScript web framework, significantly outpacing Fastify',
    takeaway2: 'Fastify has a much larger ecosystem of plugins and middleware',
    takeaway3: 'Elysia includes built-in type-safe validation using TypeBox',
    takeaway4: 'Fastify runs on Node.js, Deno, and Bun with consistent performance',
    takeaway5: 'Both frameworks have similar plugin architectures and hook systems',
    takeaway6: 'Elysia\'s Eden Treaty enables end-to-end type safety for client-server communication',
    
    whatIsElysiaTitle: 'What is Elysia?',
    whatIsElysiaContent: 'Elysia is a TypeScript-first web framework built on Bun\'s runtime. Released in 2023, it leverages Bun\'s performance characteristics to deliver exceptional speed. Elysia features built-in type-safe validation, end-to-end type safety with Eden Treaty, and a minimal core that stays fast even as your application grows.',
    
    whatIsFastifyTitle: 'What is Fastify?',
    whatIsFastifyContent: 'Fastify is a fast and low-overhead web framework for Node.js. Created in 2016, it has become the performance standard for Node.js applications. Fastify features a powerful plugin architecture, built-in JSON schema validation, and an extensive ecosystem of plugins maintained by the community.',
    
    performanceTitle: 'Performance Benchmarks',
    performanceIntro: 'HTTP throughput benchmarks comparing both frameworks:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities across key areas:',
    
    validationTitle: 'Type-Safe Validation',
    validationIntro: 'How each framework handles request/response validation:',
    
    ecosystemTitle: 'Ecosystem and Plugins',
    ecosystemIntro: 'Available plugins and community support:',
    
    typeSafetyTitle: 'End-to-End Type Safety',
    typeSafetyIntro: 'Elysia\'s Eden Treaty vs Fastify type plugins:',
    
    useCasesTitle: 'When to Use Each Framework',
    elysiaBestFor: 'Elysia is Best For:',
    fastifyBestFor: 'Fastify is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Elysia and Fastify represent two excellent but different approaches to high-performance web development. Elysia pushes the boundaries of what\'s possible with JavaScript performance on Bun, making it ideal for new projects where speed is paramount. Fastify\'s maturity, ecosystem, and runtime flexibility make it the safer choice for enterprise applications and teams that value stability. Both frameworks demonstrate that JavaScript can compete with traditionally faster languages when the right tools are chosen.',
    
    faq1q: 'Can Elysia run on Node.js?',
    faq1a: 'Elysia is specifically designed for and requires Bun runtime. It uses Bun-specific APIs and cannot run on Node.js. If you need Node.js compatibility, Fastify is the better choice.',
    
    faq2q: 'Is Fastify slower than Express?',
    faq2a: 'No, Fastify is significantly faster than Express (2-3x in most benchmarks) while providing similar or better developer experience. Fastify\'s use of fast-json-stringify and efficient hook system contributes to its performance advantage.',
    
    faq3q: 'Does Elysia support WebSocket?',
    faq3a: 'Yes, Elysia has built-in WebSocket support that leverages Bun\'s native WebSocket implementation for excellent performance. The API is straightforward and type-safe.',
    
    faq4q: 'Can I migrate from Express to these frameworks?',
    faq4a: 'Migrating from Express to Fastify is well-documented and relatively straightforward. Migrating to Elysia requires switching to Bun runtime first, which may involve more significant changes to your deployment infrastructure.',
    
    faq5q: 'Which has better TypeScript support?',
    faq5a: 'Both have excellent TypeScript support. Elysia is TypeScript-first with validation and types deeply integrated. Fastify has strong TypeScript support through @fastify/type-provider-typebox and similar packages.',
    
    faq6q: 'Is Elysia production-ready?',
    faq6a: 'Elysia has reached version 1.x and is being used in production. However, being newer than Fastify, its ecosystem is smaller. Evaluate both your performance requirements and ecosystem needs when choosing.',
    
    faq7q: 'How do plugin systems compare?',
    faq7a: 'Both use similar plugin architectures. Fastify has a much larger ecosystem of community plugins. Elysia\'s plugin system is simpler but newer, with fewer third-party options available.',
    
    faq8q: 'Which framework should I choose for a new project?',
    faq8a: 'Choose Elysia if you\'re starting fresh on Bun and want maximum performance with type safety. Choose Fastify if you need runtime flexibility, mature ecosystem, or may need to run on Node.js in the future.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Elysia vs Fastify：高性能Node.js框架之战',
    intro: '以性能为重点的Web框架已成为现代JavaScript应用的必需品。Elysia构建于Bun运行时之上，Fastify是Node.js公认的性能领导者，两者代表了构建高速API的两种方法。本指南在性能、开发者体验和生态系统方面比较这两个框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '在Bun上运行时，Elysia提供绝对最佳的性能，内置类型安全验证和最小占用空间。Fastify提供最佳的跨运行时兼容性和成熟的生态系统，可在Node.js、Deno和Bun上运行。选择Elysia以获得Bun运行时的最大速度；选择Fastify以获得生态系统成熟度和运行灵活性。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '在Bun上，Elysia是最快的JavaScript Web框架，明显超过Fastify',
    takeaway2: 'Fastify拥有更大的插件和中间件生态系统',
    takeaway3: 'Elysia使用TypeBox内置类型安全验证',
    takeaway4: 'Fastify在Node.js、Deno和Bun上以一致的性能运行',
    takeaway5: '两个框架都有类似的插件架构和钩子系统',
    takeaway6: 'Elysia的Eden Treaty为客户端-服务器通信提供端到端类型安全',
    
    whatIsElysiaTitle: '什么是Elysia？',
    whatIsElysiaContent: 'Elysia是一个TypeScript优先的Web框架，构建于Bun运行时之上。于2023年发布，它利用Bun的性能特性提供卓越的速度。Elysia具有内置的类型安全验证、使用Eden Treaty的端到端类型安全，以及随着应用增长仍保持快速的最小核心。',
    
    whatIsFastifyTitle: '什么是Fastify？',
    whatIsFastifyContent: 'Fastify是一个快速且低开销的Node.js Web框架。创建于2016年，它已成为Node.js应用的性能标准。Fastify具有强大的插件架构、内置JSON模式验证和社区维护的广泛插件生态系统。',
    
    performanceTitle: '性能基准测试',
    performanceIntro: '比较两个框架的HTTP吞吐量基准测试：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较关键领域的能力：',
    
    validationTitle: '类型安全验证',
    validationIntro: '每个框架如何处理请求/响应验证：',
    
    ecosystemTitle: '生态系统和插件',
    ecosystemIntro: '可用插件和社区支持：',
    
    typeSafetyTitle: '端到端类型安全',
    typeSafetyIntro: 'Elysia的Eden Treaty vs Fastify类型插件：',
    
    useCasesTitle: '何时使用每个框架',
    elysiaBestFor: 'Elysia 最适合：',
    fastifyBestFor: 'Fastify 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Elysia和Fastify代表了高性能Web开发的两种出色但不同的方法。Elysia推动了Bun上JavaScript性能的可能边界，使其成为速度至上的新项目的理想选择。Fastify的成熟度、生态系统和运行灵活性使其成为企业应用和重视稳定性的团队的更安全选择。两个框架都证明了当选择正确的工具时，JavaScript可以与传统上更快的语言竞争。',
    
    faq1q: 'Elysia可以在Node.js上运行吗？',
    faq1a: 'Elysia专为Bun运行时设计和要求。它使用Bun特定的API，无法在Node.js上运行。如果你需要Node.js兼容性，Fastify是更好的选择。',
    
    faq2q: 'Fastify比Express慢吗？',
    faq2a: '不，Fastify明显比Express快（大多数基准测试中快2-3倍），同时提供相似或更好的开发者体验。Fastify使用fast-json-stringify和高效的钩子系统贡献了其性能优势。',
    
    faq3q: 'Elysia支持WebSocket吗？',
    faq3a: '是的，Elysia有内置的WebSocket支持，利用Bun的原生WebSocket实现提供出色的性能。API简单且类型安全。',
    
    faq4q: '我可以从Express迁移到这些框架吗？',
    faq4a: '从Express迁移到Fastify有很好的文档记录，相对简单直接。迁移到Elysia需要先切换到Bun运行时，这可能涉及部署基础设施的更重大更改。',
    
    faq5q: '哪个有更好的TypeScript支持？',
    faq5a: '两者都有出色的TypeScript支持。Elysia是TypeScript优先，验证和类型深度集成。Fastify通过@fastify/type-provider-typebox和类似包提供强大的TypeScript支持。',
    
    faq6q: 'Elysia已经可以用于生产了吗？',
    faq6a: 'Elysia已达到1.x版本，并正在用于生产环境。然而，由于比Fastify新，其生态系统较小。选择时请评估你的性能需求和生态系统需求。',
    
    faq7q: '插件系统如何比较？',
    faq7a: '两者使用类似的插件架构。Fastify拥有更大的社区插件生态系统。Elysia的插件系统更简单但更新，可用的第三方选项较少。',
    
    faq8q: '我应该为新项目选择哪个框架？',
    faq8a: '如果你在Bun上全新开始并想要最大性能和类型安全，选择Elysia。如果你需要运行灵活性、成熟的生态系统，或将来可能需要在Node.js上运行，选择Fastify。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ElysiaVsFastifyPerformance({ lang }: { lang: string }) {
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

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.whatIsElysiaTitle}</h3>
      <p style={pStyle}>{ct.whatIsElysiaContent}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.whatIsFastifyTitle}</h3>
      <p style={pStyle}>{ct.whatIsFastifyContent}</p>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '框架/运行时' : 'Framework/Runtime'}</th>
              <th style={thStyle}>{isZh ? '请求/秒' : 'Requests/sec'}</th>
              <th style={thStyle}>{isZh ? '延迟 (p99)' : 'Latency (p99)'}</th>
              <th style={thStyle}>{isZh ? '内存' : 'Memory'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Elysia (Bun)', '~220,000', '~2ms', '~25MB'],
              ['Fastify (Node.js)', '~75,000', '~8ms', '~45MB'],
              ['Fastify (Bun)', '~120,000', '~5ms', '~35MB'],
              ['Express (Node.js)', '~25,000', '~25ms', '~55MB'],
            ].map(([framework, reqs, latency, memory], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{framework}</td>
                <td style={tdStyle}>{reqs}</td>
                <td style={tdStyle}>{latency}</td>
                <td style={tdStyle}>{memory}</td>
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
              <th style={thStyle}>Elysia</th>
              <th style={thStyle}>Fastify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '运行时支持' : 'Runtime Support', 'Bun only', 'Node.js, Deno, Bun'],
              [isZh ? '内置验证' : 'Built-in Validation', 'TypeBox (type-safe)', 'JSON Schema'],
              [isZh ? '路由' : 'Routing', isZh ? '声明式 + 链式' : 'Declarative + Chained', isZh ? '声明式' : 'Declarative'],
              [isZh ? '插件系统' : 'Plugin System', isZh ? '简单 + 类型安全' : 'Simple + type-safe', isZh ? '成熟 + 丰富' : 'Mature + extensive'],
              [isZh ? '钩子/生命周期' : 'Hooks/Lifecycle', isZh ? '是' : 'Yes', isZh ? '是 (更丰富)' : 'Yes (richer)'],
              [isZh ? 'WebSocket' : 'WebSocket', isZh ? '内置' : 'Built-in', isZh ? '需插件' : 'Plugin required'],
              [isZh ? 'GraphQL支持' : 'GraphQL Support', 'Yoga Elysia', 'mercurius'],
              [isZh ? 'TypeScript优先' : 'TypeScript First', isZh ? '是 (核心)' : 'Yes (core)', isZh ? '是 (良好)' : 'Yes (good)'],
              [isZh ? '包大小' : 'Package Size', '~15KB', '~100KB'],
            ].map(([feature, elysia, fastify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{elysia}</td>
                <td style={tdStyle}>{fastify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{isZh ? '代码示例' : 'Code Examples'}</h2>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Elysia</h3>
      <pre style={codeStyle}><code>{`import { Elysia, t } from 'elysia'

// Type-safe API with validation
const app = new Elysia()
  .get('/', () => 'Hello Elysia!')
  .get('/user/:id', ({ params: { id } }) => ({ 
    id, 
    name: 'John' 
  }))
  .post('/user', 
    ({ body }) => {
      // body is typed as { name: string, email: string }
      return { created: body }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: 'email' })
      })
    }
  )
  .listen(3000)

console.log(\`Running at \${app.server?.hostname}:\${app.server?.port}\`)`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Fastify</h3>
      <pre style={codeStyle}><code>{`import Fastify from 'fastify'
import typeProvider from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'

const app = Fastify({
  logger: true
}).withTypeProvider<typeProvider>()

// Routes
app.get('/', async () => 'Hello Fastify!')

app.get('/user/:id', async (request) => {
  const { id } = request.params
  return { id, name: 'John' }
})

app.post('/user', {
  schema: {
    body: Type.Object({
      name: Type.String(),
      email: Type.String({ format: 'email' })
    })
  }
}, async (request) => {
  // body is type-safe
  return { created: request.body }
})

// Start server
await app.listen({ port: 3000 })`}</code></pre>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.elysiaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Bun运行时项目' : 'Bun runtime projects'}</li>
            <li>{isZh ? '极致性能需求' : 'Maximum performance requirements'}</li>
            <li>{isZh ? '类型安全优先' : 'Type safety first'}</li>
            <li>{isZh ? '新项目启动' : 'New project startups'}</li>
            <li>{isZh ? 'WebSocket实时应用' : 'WebSocket real-time apps'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.fastifyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要Node.js兼容性' : 'Need Node.js compatibility'}</li>
            <li>{isZh ? '丰富的插件生态' : 'Rich plugin ecosystem'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '从Express迁移' : 'Migrating from Express'}</li>
            <li>{isZh ? '成熟稳定优先' : 'Maturity and stability first'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(34,197,94,0.1))', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#f59e0b', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#f59e0b', textDecoration: 'none' }}>JWT Decoder</a>
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
