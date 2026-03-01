'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Valibot vs Zod: Schema Validation Library Comparison',
    intro: 'Schema validation is essential for type-safe JavaScript applications. Zod has been the dominant validation library, but Valibot offers a new approach with modularity and bundle size optimization. This guide compares both libraries to help you choose the right validation solution for your project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Valibot offers a modular architecture with tree-shaking support, resulting in smaller bundle sizes (as low as 300 bytes for single validation). Zod provides a more mature ecosystem and simpler API with better IDE support. Choose Valibot for bundle size optimization; choose Zod for simplicity and ecosystem maturity.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Valibot\'s modular design enables tree-shaking, reducing bundle sizes significantly',
    takeaway2: 'Zod has a larger ecosystem and more community resources',
    takeaway3: 'Both offer excellent TypeScript inference and type safety',
    takeaway4: 'Valibot requires importing individual methods; Zod uses method chaining',
    takeaway5: 'Zod has more built-in features out of the box',
    takeaway6: 'Valibot can be as small as 300 bytes for a single validation',
    
    whatIsValibotTitle: 'What is Valibot?',
    whatIsValibotContent: 'Valibot is a modular schema validation library built with bundle size in mind. Created by Fabian Hiller in 2023, it takes a functional approach to validation. Instead of a chainable API, Valibot uses composable functions that can be tree-shaken, resulting in minimal bundle impact.',
    
    whatIsZodTitle: 'What is Zod?',
    whatIsZodContent: 'Zod is a TypeScript-first schema validation and static type inference library. Created by Colin McDonnell in 2020, it has become the standard for schema validation in the TypeScript ecosystem. Zod uses a fluent, chainable API that makes schema definitions intuitive and readable.',
    
    bundleSizeTitle: 'Bundle Size Comparison',
    bundleSizeIntro: 'One of Valibot\'s main selling points is its modular architecture:',
    
    performanceTitle: 'Performance',
    performanceIntro: 'Runtime validation performance comparison:',
    
    apiStyleTitle: 'API Style Comparison',
    apiStyleIntro: 'Different approaches to defining schemas:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities across key areas:',
    
    ecosystemTitle: 'Ecosystem and Integrations',
    ecosystemIntro: 'Available integrations and community support:',
    
    migrationTitle: 'Migration Between Libraries',
    migrationIntro: 'Moving from Zod to Valibot or vice versa:',
    
    useCasesTitle: 'When to Use Each Library',
    valibotBestFor: 'Valibot is Best For:',
    zodBestFor: 'Zod is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Both Valibot and Zod are excellent schema validation libraries that provide type-safe development. Valibot\'s modular approach is innovative and delivers on its promise of smaller bundle sizes, making it ideal for performance-conscious applications. Zod\'s maturity, ecosystem, and familiar chainable API make it the safe default for most projects. The good news is that both libraries produce standard output that can be easily converted, making it possible to start with one and migrate to the other if needed.',
    
    faq1q: 'Is Valibot API compatible with Zod?',
    faq1a: 'No, Valibot uses a completely different API approach. While schemas can often be converted between libraries, the APIs are not drop-in replacements. Migration requires updating your schema definitions and validation code.',
    
    faq2q: 'Does Valibot support all Zod features?',
    faq2a: 'Valibot covers most common validation scenarios, but Zod has a more extensive feature set including effects (transformations, refinements), recursive schemas, and more built-in types. Valibot is catching up but may not have every Zod feature yet.',
    
    faq3q: 'Which library is better for React forms?',
    faq3a: 'Both work well with React Hook Form. Zod has a longer history of integration and more examples available. Valibot\'s smaller size is beneficial for client-side forms. Both can be used with react-hook-form\'s resolver pattern.',
    
    faq4q: 'Can I use Valibot with tRPC?',
    faq4a: 'tRPC has first-class Zod support. While Valibot can work with tRPC, it may require additional configuration. Zod remains the recommended choice for tRPC applications.',
    
    faq5q: 'Is Valibot production-ready?',
    faq5a: 'Valibot has reached version 0.30+ and is being used in production. While newer than Zod, it has proven stable. For critical applications, evaluate based on your specific needs and risk tolerance.',
    
    faq6q: 'Does bundle size really matter that much?',
    faq6a: 'For most applications, the difference is negligible. However, for libraries, edge functions, or applications where every kilobyte matters, Valibot\'s tree-shaking can provide meaningful savings. Server-side applications typically won\'t notice the difference.',
    
    faq7q: 'Can I mix Valibot and Zod in the same project?',
    faq7a: 'Yes, you can use both libraries in the same project. This might be useful during migration or when different parts of your application have different requirements. However, it\'s generally better to standardize on one library.',
    
    faq8q: 'Which library should I choose for a new project?',
    faq8a: 'Start with Zod if you want maximum ecosystem compatibility and examples. Choose Valibot if bundle size is a concern or if you prefer the functional, modular approach. Both are excellent choices.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Valibot vs Zod：模式验证库对比',
    intro: '模式验证对于类型安全的JavaScript应用至关重要。Zod一直是主导的验证库，但Valibot提供了一种新的方法，具有模块化和包大小优化。本指南比较两个库，帮助你为项目选择正确的验证解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Valibot提供模块化架构和tree-shaking支持，从而产生更小的包大小（单个验证可低至300字节）。Zod提供更成熟的生态系统和更简单的API，具有更好的IDE支持。选择Valibot以优化包大小；选择Zod以获得简单性和生态系统成熟度。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Valibot的模块化设计支持tree-shaking，显著减少包大小',
    takeaway2: 'Zod拥有更大的生态系统和更多社区资源',
    takeaway3: '两者都提供出色的TypeScript推断和类型安全',
    takeaway4: 'Valibot需要导入单独的方法；Zod使用方法链',
    takeaway5: 'Zod开箱即有更多内置功能',
    takeaway6: 'Valibot单个验证可以小至300字节',
    
    whatIsValibotTitle: '什么是Valibot？',
    whatIsValibotContent: 'Valibot是一个以包大小为考虑因素构建的模块化模式验证库。由Fabian Hiller于2023年创建，它采用函数式方法进行验证。Valibot不使用可链式API，而是使用可组合的可tree-shaken函数，从而产生最小的包影响。',
    
    whatIsZodTitle: '什么是Zod？',
    whatIsZodContent: 'Zod是一个TypeScript优先的模式验证和静态类型推断库。由Colin McDonnell于2020年创建，它已成为TypeScript生态系统中模式验证的标准。Zod使用流畅的、可链式的API，使模式定义直观且可读。',
    
    bundleSizeTitle: '包大小对比',
    bundleSizeIntro: 'Valibot的主要卖点之一是其模块化架构：',
    
    performanceTitle: '性能',
    performanceIntro: '运行时验证性能对比：',
    
    apiStyleTitle: 'API风格对比',
    apiStyleIntro: '定义模式的不同方法：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较关键领域的能力：',
    
    ecosystemTitle: '生态系统和集成',
    ecosystemIntro: '可用的集成和社区支持：',
    
    migrationTitle: '库之间迁移',
    migrationIntro: '从Zod迁移到Valibot或反之：',
    
    useCasesTitle: '何时使用每个库',
    valibotBestFor: 'Valibot 最适合：',
    zodBestFor: 'Zod 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Valibot和Zod都是提供类型安全开发的优秀模式验证库。Valibot的模块化方法具有创新性，实现了更小包大小的承诺，使其成为性能敏感应用的理想选择。Zod的成熟度、生态系统和熟悉的可链式API使其成为大多数项目的安全默认选择。好消息是两个库都产生可以轻松转换的标准输出，如果需要，可以从一个开始并迁移到另一个。',
    
    faq1q: 'Valibot API与Zod兼容吗？',
    faq1a: '不，Valibot使用完全不同的API方法。虽然模式通常可以在库之间转换，但API不是即插即用的替代品。迁移需要更新你的模式定义和验证代码。',
    
    faq2q: 'Valibot支持所有Zod功能吗？',
    faq2a: 'Valibot涵盖大多数常见的验证场景，但Zod具有更丰富的功能集，包括effects（转换、细化）、递归模式和更多内置类型。Valibot正在迎头赶上，但可能还没有每个Zod功能。',
    
    faq3q: '哪个库更适合React表单？',
    faq3a: '两者都与React Hook Form配合良好。Zod有更长的集成历史和更多可用示例。Valibot更小的尺寸对客户端表单有益。两者都可以与react-hook-form的resolver模式一起使用。',
    
    faq4q: '我可以将Valibot与tRPC一起使用吗？',
    faq4a: 'tRPC有一流的Zod支持。虽然Valibot可以与tRPC一起使用，但可能需要额外配置。Zod仍然是tRPC应用的推荐选择。',
    
    faq5q: 'Valibot已经可以用于生产了吗？',
    faq5a: 'Valibot已达到0.30+版本，并正在用于生产环境。虽然比Zod新，但它已经证明了稳定性。对于关键应用，根据你的具体需求和风险承受能力进行评估。',
    
    faq6q: '包大小真的那么重要吗？',
    faq6a: '对于大多数应用，差异可以忽略不计。然而，对于库、边缘函数或每千字节都重要的应用，Valibot的tree-shaking可以提供有意义的节省。服务器端应用通常不会注意到差异。',
    
    faq7q: '我可以在同一个项目中混合使用Valibot和Zod吗？',
    faq7a: '是的，你可以在同一个项目中使用两个库。这在迁移期间或当应用的不同部分有不同需求时可能有用。然而，通常最好标准化到一个库。',
    
    faq8q: '我应该为新项目选择哪个库？',
    faq8a: '如果你想要最大的生态系统兼容性和示例，从Zod开始。如果包大小是问题，或者你更喜欢函数式、模块化的方法，选择Valibot。两者都是优秀的选择。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ValibotVsZodValidation({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '库概述' : 'Library Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.whatIsValibotTitle}</h3>
      <p style={pStyle}>{ct.whatIsValibotContent}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.whatIsZodTitle}</h3>
      <p style={pStyle}>{ct.whatIsZodContent}</p>

      {/* Bundle Size */}
      <h2 style={h2Style}>{ct.bundleSizeTitle}</h2>
      <p style={pStyle}>{ct.bundleSizeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '使用场景' : 'Use Case'}</th>
              <th style={thStyle}>Valibot</th>
              <th style={thStyle}>Zod</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '单个字符串验证' : 'Single string validation', '~300 B', '~12 KB'],
              [isZh ? '对象验证' : 'Object validation', '~500 B', '~12 KB'],
              [isZh ? '完整表单验证' : 'Full form validation', '~1.5 KB', '~12 KB'],
              [isZh ? '完整库导入' : 'Full library import', '~8 KB', '~12 KB'],
              [isZh ? 'gzip压缩后' : 'After gzip (typical)', '~3 KB', '~4 KB'],
            ].map(([useCase, valibot, zod], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{useCase}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{valibot}</td>
                <td style={tdStyle}>{zod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* API Style */}
      <h2 style={h2Style}>{ct.apiStyleTitle}</h2>
      <p style={pStyle}>{ct.apiStyleIntro}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>Valibot</h3>
      <pre style={codeStyle}><code>{`// Valibot - Functional approach
import * as v from 'valibot'

// String schema
const StringSchema = v.string()

// Object schema
const UserSchema = v.object({
  name: v.string(),
  email: v.pipe(v.string(), v.email()),
  age: v.optional(v.number()),
})

// Array schema
const UsersSchema = v.array(UserSchema)

// Validation
const result = v.safeParse(UserSchema, {
  name: 'John',
  email: 'john@example.com',
  age: 30,
})

if (result.success) {
  console.log(result.output) // Typed as { name: string, email: string, age?: number }
} else {
  console.log(result.issues)
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>Zod</h3>
      <pre style={codeStyle}><code>{`// Zod - Chainable approach
import { z } from 'zod'

// String schema
const StringSchema = z.string()

// Object schema
const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
})

// Array schema
const UsersSchema = z.array(UserSchema)

// Validation
const result = UserSchema.safeParse({
  name: 'John',
  email: 'john@example.com',
  age: 30,
})

if (result.success) {
  console.log(result.data) // Typed as { name: string, email: string, age?: number }
} else {
  console.log(result.error)
}`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Valibot</th>
              <th style={thStyle}>Zod</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Type推断' : 'Type inference', isZh ? '是 (Input/Output)' : 'Yes (Input/Output)', isZh ? '是 (infer)' : 'Yes (infer)'],
              [isZh ? '可选字段' : 'Optional fields', 'v.optional()', '.optional()'],
              [isZh ? '默认值' : 'Default values', 'v.optional(_, default)', '.default()'],
              [isZh ? '自定义验证' : 'Custom validation', 'v.check()', '.refine()'],
              [isZh ? '转换' : 'Transformations', 'v.transform()', '.transform()'],
              [isZh ? '联合类型' : 'Union types', 'v.union()', 'z.union()'],
              [isZh ? '交叉类型' : 'Intersection', 'v.intersect()', 'z.intersection()'],
              [isZh ? '枚举' : 'Enums', 'v.picklist()', 'z.enum()'],
              [isZh ? '递归模式' : 'Recursive schemas', isZh ? '有限支持' : 'Limited', 'z.lazy()'],
              [isZh ? '品牌类型' : 'Branded types', isZh ? '否' : 'No', 'z.brand()'],
            ].map(([feature, valibot, zod], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{valibot}</td>
                <td style={tdStyle}>{zod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ecosystem */}
      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '集成' : 'Integration'}</th>
              <th style={thStyle}>Valibot</th>
              <th style={thStyle}>Zod</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['React Hook Form', isZh ? '是 (resolver)' : 'Yes (resolver)', isZh ? '是 (原生)' : 'Yes (native)'],
              ['tRPC', isZh ? '社区支持' : 'Community', isZh ? '原生支持' : 'Native'],
              ['Prisma', isZh ? '可扩展' : 'Extensible', isZh ? 'zod-prisma' : 'zod-prisma'],
              ['OpenAPI', isZh ? '可转换' : 'Convertible', isZh ? 'zod-to-openapi' : 'zod-to-openapi'],
              ['Drizzle ORM', isZh ? 'drizzle-zod' : 'drizzle-zod', isZh ? 'drizzle-zod' : 'drizzle-zod'],
            ].map(([integration, valibot, zod], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{integration}</td>
                <td style={tdStyle}>{valibot}</td>
                <td style={tdStyle}>{zod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.valibotBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '包大小敏感应用' : 'Bundle size sensitive apps'}</li>
            <li>{isZh ? '边缘函数/Workers' : 'Edge functions / Workers'}</li>
            <li>{isZh ? '库开发' : 'Library development'}</li>
            <li>{isZh ? '函数式编程偏好' : 'Functional programming preference'}</li>
            <li>{isZh ? '性能关键验证' : 'Performance-critical validation'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.zodBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'tRPC集成' : 'tRPC integration'}</li>
            <li>{isZh ? '成熟生态系统' : 'Mature ecosystem'}</li>
            <li>{isZh ? '团队熟悉度' : 'Team familiarity'}</li>
            <li>{isZh ? '复杂转换' : 'Complex transformations'}</li>
            <li>{isZh ? '递归模式' : 'Recursive schemas'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))', borderRadius: 12, border: '1px solid rgba(139,92,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#8b5cf6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/json-to-typescript`} style={{ color: '#8b5cf6', textDecoration: 'none' }}>JSON to TypeScript</a>
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
