'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Effect-TS vs Zod: Functional Programming vs Schema Validation in 2025',
    intro: 'Zod has become the standard for TypeScript schema validation, but Effect-TS offers a broader approach combining validation, error handling, and async operations in a functional programming paradigm. This comparison examines when to use each approach and how they can work together.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Zod excels at simple schema validation with an intuitive API and excellent TypeScript inference. Effect-TS provides a comprehensive functional programming toolkit including validation, error handling, dependency injection, and concurrency. Use Zod for validation-only needs; consider Effect-TS for complex business logic requiring composability and error handling.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Zod is simpler and more focused on schema validation with 1.5M+ weekly npm downloads',
    takeaway2: 'Effect-TS offers validation plus error handling, async, and dependency injection in one package',
    takeaway3: 'Zod has better ecosystem integration (React Hook Form, tRPC, Next.js)',
    takeaway4: 'Effect-TS uses functional programming patterns (Result types, pipeable operations)',
    takeaway5: 'Both provide excellent TypeScript inference and type safety',
    takeaway6: 'You can use Zod schemas within Effect-TS pipelines for the best of both worlds',
    
    whatIsEffectTitle: 'What is Effect-TS?',
    whatIsEffectContent: 'Effect-TS is a powerful functional programming library for TypeScript that provides a unified approach to handling errors, async operations, and side effects. It introduces the Effect monad pattern, allowing you to compose complex operations while maintaining type safety and explicit error handling. Think of it as "Promise + Result + AsyncIterator + Context" all in one.',
    
    whatIsZodTitle: 'What is Zod?',
    whatIsZodContent: 'Zod is a TypeScript-first schema declaration and validation library. Created by Colin McDonnell, it emphasizes type inference - you define a schema and Zod automatically infers the TypeScript type. With over 1.5 million weekly downloads, it\'s become the de facto standard for runtime type checking in the TypeScript ecosystem.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks for schema validation on 100,000 iterations:',
    
    validationBenchmarkTitle: 'Validation Performance',
    validationBenchmarkIntro: 'Simple object validation benchmark:',
    
    bundleTitle: 'Bundle Size',
    bundleIntro: 'Impact on your application bundle:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Built-in capabilities and use cases:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Different philosophies, different approaches:',
    
    effectExampleTitle: 'Effect-TS',
    zodExampleTitle: 'Zod',
    
    integrationTitle: 'Framework Integration',
    integrationIntro: 'How well each integrates with popular frameworks:',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'Type inference and developer experience:',
    
    errorHandlingTitle: 'Error Handling',
    errorHandlingIntro: 'How each library approaches errors:',
    
    whenToUseTitle: 'When to Use Each Library',
    effectBestFor: 'Use Effect-TS When:',
    zodBestFor: 'Use Zod When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Zod remains the best choice for pure schema validation needs - it\'s simple, widely adopted, and has excellent framework integration. Effect-TS shines when you need comprehensive error handling, async composition, and functional programming patterns. For most projects, start with Zod for validation. Consider Effect-TS when building complex services where validation is just one part of a larger error-handling and business logic strategy.',
    
    faq1q: 'Can I use Zod schemas with Effect-TS?',
    faq1a: 'Yes! Effect-TS provides @effect/schema which is inspired by Zod, or you can use Zod schemas within Effect pipelines. Many teams use Zod for API validation and Effect-TS for internal business logic composition.',
    
    faq2q: 'Is Effect-TS harder to learn than Zod?',
    faq2a: 'Yes, Effect-TS has a steeper learning curve due to functional programming concepts like monads, pipes, and effect composition. Zod is more straightforward for developers familiar with traditional TypeScript.',
    
    faq3q: 'Which is faster for validation?',
    faq3a: 'Zod is generally faster for simple validation tasks. Effect-TS has more overhead due to its effect system, but the performance difference is negligible for most applications unless validating millions of objects.',
    
    faq4q: 'Does Effect-TS replace all of Zod\'s use cases?',
    faq4a: 'No. Effect-TS can do validation, but Zod\'s focused API and ecosystem integrations make it better for form validation, API schema definition, and configuration parsing. Effect-TS is better for complex business logic orchestration.',
    
    faq5q: 'How does error handling differ between them?',
    faq5a: 'Zod returns a ZodError object with detailed validation issues. Effect-TS uses a Result type pattern where errors are typed and must be explicitly handled, preventing uncaught exceptions at the type level.',
    
    faq6q: 'Can I use Effect-TS with React?',
    faq6a: 'Yes, but it requires more setup. Zod integrates seamlessly with React Hook Form and other form libraries. Effect-TS is typically used in business logic layers rather than directly in components.',
    
    faq7q: 'What\'s the @effect/schema package?',
    faq7a: '@effect/schema is Effect-TS\'s schema validation library, providing Zod-like functionality with Effect integration. It offers similar features but with Effect\'s error handling and composition patterns.',
    
    faq8q: 'Should I migrate from Zod to Effect-TS?',
    faq8a: 'Not necessarily. If Zod meets your validation needs, there\'s no urgency to migrate. Consider Effect-TS for new services requiring complex async flows and error handling. Both can coexist in the same project.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Effect-TS vs Zod：2025年函数式编程与模式验证对比',
    intro: 'Zod已成为TypeScript模式验证的标准，但Effect-TS提供了更广泛的方法，在函数式编程范式中结合了验证、错误处理和异步操作。本比较探讨了何时使用每种方法以及它们如何协同工作。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Zod以直观的API和出色的TypeScript推断在简单模式验证方面表现出色。Effect-TS提供全面的函数式编程工具包，包括验证、错误处理、依赖注入和并发。仅需要验证时使用Zod；需要可组合性和错误处理的复杂业务逻辑时考虑Effect-TS。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Zod更简单，专注于模式验证，npm每周下载量超过150万',
    takeaway2: 'Effect-TS在一个包中提供验证加错误处理、异步和依赖注入',
    takeaway3: 'Zod有更好的生态系统集成（React Hook Form、tRPC、Next.js）',
    takeaway4: 'Effect-TS使用函数式编程模式（Result类型、可管道化操作）',
    takeaway5: '两者都提供出色的TypeScript推断和类型安全',
    takeaway6: '你可以在Effect-TS管道中使用Zod模式，获得两者的优点',
    
    whatIsEffectTitle: '什么是Effect-TS？',
    whatIsEffectContent: 'Effect-TS是一个强大的TypeScript函数式编程库，提供统一的方法来处理错误、异步操作和副作用。它引入了Effect monad模式，允许你在保持类型安全和显式错误处理的同时组合复杂操作。可以把它想象成"Promise + Result + AsyncIterator + Context"的集合。',
    
    whatIsZodTitle: '什么是Zod？',
    whatIsZodContent: 'Zod是一个TypeScript优先的模式声明和验证库。由Colin McDonnell创建，它强调类型推断——你定义一个模式，Zod自动推断TypeScript类型。每周超过150万次下载，它已成为TypeScript生态系统中运行时类型检查的事实标准。',
    
    performanceTitle: '性能对比',
    performanceIntro: '100,000次迭代的模式验证基准测试：',
    
    validationBenchmarkTitle: '验证性能',
    validationBenchmarkIntro: '简单对象验证基准：',
    
    bundleTitle: '包大小',
    bundleIntro: '对应用包的影响：',
    
    featuresTitle: '功能对比',
    featuresIntro: '内置功能和使用场景：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '不同的理念，不同的方法：',
    
    effectExampleTitle: 'Effect-TS',
    zodExampleTitle: 'Zod',
    
    integrationTitle: '框架集成',
    integrationIntro: '与流行框架的集成程度：',
    
    typescriptTitle: 'TypeScript体验',
    typescriptIntro: '类型推断和开发者体验：',
    
    errorHandlingTitle: '错误处理',
    errorHandlingIntro: '每个库如何处理错误：',
    
    whenToUseTitle: '何时使用每个库',
    effectBestFor: '使用Effect-TS的场景：',
    zodBestFor: '使用Zod的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Zod仍然是纯模式验证需求的最佳选择——它简单、广泛采用，并具有出色的框架集成。当你需要全面的错误处理、异步组合和函数式编程模式时，Effect-TS大放异彩。对于大多数项目，从Zod开始进行验证。在构建验证只是更大错误处理和业务逻辑策略一部分的复杂服务时考虑Effect-TS。',
    
    faq1q: '我可以在Effect-TS中使用Zod模式吗？',
    faq1a: '可以！Effect-TS提供受Zod启发的@effect/schema，或者你可以在Effect管道中使用Zod模式。许多团队使用Zod进行API验证，使用Effect-TS进行内部业务逻辑组合。',
    
    faq2q: 'Effect-TS比Zod更难学吗？',
    faq2a: '是的，由于函数式编程概念如monad、管道和effect组合，Effect-TS学习曲线更陡峭。对于熟悉传统TypeScript的开发者来说，Zod更直接。',
    
    faq3q: '哪个验证更快？',
    faq3a: 'Zod通常在简单验证任务中更快。由于其effect系统，Effect-TS有更多开销，但对于大多数应用来说，性能差异可以忽略不计，除非验证数百万个对象。',
    
    faq4q: 'Effect-TS能取代Zod的所有用例吗？',
    faq4a: '不能。Effect-TS可以进行验证，但Zod专注的API和生态系统集成使其更适合表单验证、API模式定义和配置解析。Effect-TS更适合复杂的业务逻辑编排。',
    
    faq5q: '它们的错误处理有什么不同？',
    faq5a: 'Zod返回带有详细验证问题的ZodError对象。Effect-TS使用Result类型模式，错误被类型化且必须显式处理，在类型级别防止未捕获的异常。',
    
    faq6q: '我可以在React中使用Effect-TS吗？',
    faq6a: '可以，但需要更多设置。Zod与React Hook Form和其他表单库无缝集成。Effect-TS通常用于业务逻辑层而不是直接在组件中。',
    
    faq7q: '@effect/schema包是什么？',
    faq7a: '@effect/schema是Effect-TS的模式验证库，提供类似Zod的功能但具有Effect集成。它提供类似的功能但使用Effect的错误处理和组合模式。',
    
    faq8q: '我应该从Zod迁移到Effect-TS吗？',
    faq8a: '不一定。如果Zod满足你的验证需求，就没有紧迫的迁移需求。为需要复杂异步流程和错误处理的新服务考虑Effect-TS。两者可以在同一个项目中共存。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function EffectTsVsZod({ lang }: { lang: string }) {
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

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsEffectTitle}</h3>
      <p style={pStyle}>{ct.whatIsEffectContent}</p>

      <h3 style={h3Style}>{ct.whatIsZodTitle}</h3>
      <p style={pStyle}>{ct.whatIsZodContent}</p>

      <h2 style={h2Style}>{isZh ? '对比概览' : 'Comparison Overview'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Effect-TS</th>
              <th style={thStyle}>Zod</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '主要用途' : 'Primary Use', isZh ? '全面FP工具包' : 'Full FP toolkit', isZh ? '模式验证' : 'Schema validation'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '陡峭' : 'Steep', isZh ? '平缓' : 'Gentle'],
              [isZh ? '包大小' : 'Package Size', '~80KB', '~45KB'],
              [isZh ? '每周下载' : 'Weekly Downloads', '~200K', '~1.5M'],
              [isZh ? '首次发布' : 'First Release', '2022', '2020'],
              [isZh ? '类型推断' : 'Type Inference', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '错误处理' : 'Error Handling', isZh ? 'Result类型' : 'Result types', isZh ? 'ZodError对象' : 'ZodError object'],
            ].map(([feature, effect, zod], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{effect}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{zod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.validationBenchmarkTitle}</h3>
      <p style={pStyle}>{ct.validationBenchmarkIntro}</p>

      <pre style={codeStyle}><code>{`// Zod Schema
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

type User = z.infer<typeof UserSchema>;

const result = UserSchema.safeParse(input);
if (result.success) {
  // result.data is typed
}

// Effect-TS Schema
import { Schema } from "@effect/schema";

const UserSchema = Schema.Struct({
  name: Schema.String.pipe(Schema.minLength(1)),
  email: Schema.String.pipe(Schema.pattern(/^email$/)),
  age: Schema.optional(Schema.Number.pipe(Schema.int(), Schema.positive())),
});

type User = Schema.Schema.Type<typeof UserSchema>;

const result = Schema.decodeUnknown(UserSchema)(input);
// Effect<never, ParseError, User>`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>Zod</th>
              <th style={thStyle}>Effect-TS</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '简单对象验证' : 'Simple object validation', '45ms', '65ms'],
              [isZh ? '嵌套对象验证' : 'Nested object validation', '120ms', '145ms'],
              [isZh ? '数组验证(1000项)' : 'Array validation (1000 items)', '85ms', '110ms'],
              [isZh ? '带转换的验证' : 'Validation with transforms', '95ms', '130ms'],
            ].map(([op, zod, effect], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{zod}</td>
                <td style={tdStyle}>{effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.bundleTitle}</h3>
      <p style={pStyle}>{ct.bundleIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '包' : 'Package'}</th>
              <th style={thStyle}>{isZh ? '大小（压缩）' : 'Size (min+gzip)'}</th>
              <th style={thStyle}>{isZh ? '依赖' : 'Dependencies'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['zod', '~45KB', '0'],
              ['effect', '~80KB', '0'],
              ['@effect/schema', '~35KB', '1 (effect)'],
              ['zod + effect', '~125KB', '0'],
            ].map(([pkg, size, deps], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{pkg}</td>
                <td style={tdStyle}>{size}</td>
                <td style={tdStyle}>{deps}</td>
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
              <th style={thStyle}>Effect-TS</th>
              <th style={thStyle}>Zod</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '模式验证' : 'Schema Validation', '✓', '✓'],
              [isZh ? '类型推断' : 'Type Inference', '✓', '✓'],
              [isZh ? '自定义错误消息' : 'Custom Error Messages', '✓', '✓'],
              [isZh ? '异步验证' : 'Async Validation', '✓ Built-in', '✓ .refine async'],
              [isZh ? '错误处理' : 'Error Handling', isZh ? 'Result类型' : 'Result types', isZh ? 'try/catch' : 'try/catch'],
              [isZh ? '依赖注入' : 'Dependency Injection', '✓ Layers', '✗'],
              [isZh ? '并发' : 'Concurrency', '✓ Fibers', '✗'],
              [isZh ? '重试逻辑' : 'Retry Logic', '✓ Built-in', '✗'],
              [isZh ? '可观察性' : 'Observability', '✓ Tracing', '✗'],
              [isZh ? '表单集成' : 'Form Integration', isZh ? '需要适配器' : 'Needs adapter', isZh ? '原生支持' : 'Native'],
            ].map(([feature, effect, zod], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: effect.includes('✓') ? '#8b5cf6' : 'inherit' }}>{effect}</td>
                <td style={{ ...tdStyle, color: zod.includes('✓') ? '#3b82f6' : 'inherit' }}>{zod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.effectExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Effect-TS - Complex business logic with validation
import { Effect, Context, Layer } from "effect";
import { Schema } from "@effect/schema";

// Define domain types with schemas
const UserSchema = Schema.Struct({
  id: Schema.String,
  email: Schema.String,
  name: Schema.String,
});

type User = Schema.Schema.Type<typeof UserSchema>;

// Define service interface
interface UserRepository {
  readonly findById: (id: string) => Effect.Effect<never, "NotFound", User>;
  readonly save: (user: User) => Effect.Effect<never, "DbError", void>;
}

// Create service tag
const UserRepository = Context.GenericTag<UserRepository>("UserRepository");

// Business logic with error handling and dependency injection
const updateUserEmail = (userId: string, newEmail: string) =>
  Effect.gen(function* (_) {
    const repo = yield* _(UserRepository);
    
    // Find user - error automatically propagated
    const user = yield* _(repo.findById(userId));
    
    // Validate email
    const email = yield* _(
      Schema.decodeUnknown(Schema.String.pipe(Schema.pattern(/^\\S+@\\S+$/)))(newEmail),
      Effect.mapError(() => "InvalidEmail" as const)
    );
    
    // Save changes - error automatically propagated
    yield* _(repo.save({ ...user, email }));
    
    return { success: true };
  });

// Compose with retry and timeout
const program = updateUserEmail("123", "new@email.com").pipe(
  Effect.retry({ times: 3 }),
  Effect.timeout("5 seconds"),
  Effect.catchAll((error) => 
    Effect.succeed({ success: false, error })
  )
);`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.zodExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Zod - Focused validation with transform
import { z } from "zod";

// Define schema with transformations
const CreateUserSchema = z.object({
  email: z.string()
    .email("Invalid email format")
    .transform(email => email.toLowerCase()),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .transform(name => name.trim()),
  age: z.number()
    .int()
    .positive()
    .optional(),
  role: z.enum(["admin", "user", "guest"]).default("user"),
});

type CreateUserInput = z.input<typeof CreateUserSchema>;
type CreateUserOutput = z.output<typeof CreateUserSchema>;

// Validation function with detailed errors
async function validateUser(input: unknown): Promise<CreateUserOutput> {
  const result = await CreateUserSchema.safeParseAsync(input);
  
  if (!result.success) {
    // Format errors for display
    const errors = result.error.issues.map(issue => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    throw new Error(\`Validation failed: \${JSON.stringify(errors)}\`);
  }
  
  return result.data;
}

// Usage with async refinement
const AsyncUserSchema = CreateUserSchema.refine(
  async (data) => {
    // Check if email is unique
    const exists = await checkEmailExists(data.email);
    return !exists;
  },
  { message: "Email already exists" }
);

// React Hook Form integration
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(CreateUserSchema),
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      {/* ... */}
    </form>
  );
}`}</code></pre>

      <h2 style={h2Style}>{ct.errorHandlingTitle}</h2>
      <p style={pStyle}>{ct.errorHandlingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Effect-TS</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用Result类型模式，所有错误在类型级别编码。必须在类型系统中显式处理错误，防止运行时意外。支持错误组合、恢复和转换。' : 'Uses Result type pattern where all errors are encoded at the type level. Errors must be explicitly handled in the type system, preventing runtime surprises. Supports error composition, recovery, and transformation.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Zod</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '返回ZodError对象，包含详细的验证问题数组。使用safeParse避免异常，或使用parse抛出错误。错误消息可自定义和本地化。' : 'Returns ZodError object with detailed array of validation issues. Use safeParse to avoid exceptions, or parse to throw. Error messages are customizable and localizable.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '框架/工具' : 'Framework/Tool'}</th>
              <th style={thStyle}>Effect-TS</th>
              <th style={thStyle}>Zod</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['React Hook Form', isZh ? '需要适配器' : 'Needs adapter', isZh ? '官方支持' : 'Official'],
              ['tRPC', isZh ? '需要适配器' : 'Needs adapter', isZh ? '原生支持' : 'Native'],
              ['Next.js API', '✓', '✓'],
              ['Express.js', '✓', '✓'],
              ['Hono', '✓', '✓ @hono/zod-validator'],
              ['TanStack Query', '✓', '✓'],
              ['Prisma', isZh ? '需要转换' : 'Needs transform', isZh ? '社区包' : 'Community pkg'],
              ['OpenAPI/Swagger', '@effect/platform', 'zod-to-openapi'],
            ].map(([framework, effect, zod], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{framework}</td>
                <td style={tdStyle}>{effect}</td>
                <td style={{ ...tdStyle, color: zod.includes('官方') || zod.includes('Native') || zod.includes('Official') ? '#22c55e' : 'inherit' }}>{zod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.effectBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂业务逻辑' : 'Complex business logic'}</li>
            <li>{isZh ? '需要重试和恢复' : 'Retry and recovery needed'}</li>
            <li>{isZh ? '依赖注入需求' : 'Dependency injection'}</li>
            <li>{isZh ? '并发操作' : 'Concurrent operations'}</li>
            <li>{isZh ? '函数式编程爱好者' : 'FP enthusiasts'}</li>
            <li>{isZh ? '类型级错误处理' : 'Type-level error handling'}</li>
            <li>{isZh ? '可观察性和追踪' : 'Observability and tracing'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.zodBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '表单验证' : 'Form validation'}</li>
            <li>{isZh ? 'API请求/响应验证' : 'API request/response validation'}</li>
            <li>{isZh ? '配置解析' : 'Config parsing'}</li>
            <li>{isZh ? '环境变量验证' : 'Environment variable validation'}</li>
            <li>{isZh ? '快速原型开发' : 'Quick prototyping'}</li>
            <li>{isZh ? '团队熟悉度' : 'Team familiarity'}</li>
            <li>{isZh ? '框架集成优先' : 'Framework integration priority'}</li>
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
