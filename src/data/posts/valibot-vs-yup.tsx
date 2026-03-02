'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Valibot vs Yup: Schema Validation Library Comparison',
    intro: 'Yup has been the go-to schema validation library for years, but Valibot offers a modern, type-safe alternative with a smaller footprint. This comparison examines bundle size, TypeScript support, API design, and real-world performance to help you choose the right validation solution.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Valibot offers superior TypeScript inference, smaller bundle size (0.6KB vs 6KB), and a functional API. Yup has better ecosystem support and familiar API for existing users. For new TypeScript projects in 2025, Valibot is recommended; choose Yup for legacy projects or when ecosystem packages are needed.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Valibot is 10x smaller than Yup (0.6KB vs 6KB gzipped)',
    takeaway2: 'Valibot has superior TypeScript inference out of the box',
    takeaway3: 'Yup has larger ecosystem and more community resources',
    takeaway4: 'Valibot uses functional API, Yup uses chainable methods',
    takeaway5: 'Both integrate well with React Hook Form and Formik',
    takeaway6: 'Valibot supports tree-shaking, Yup loads as single bundle',
    
    whatIsValibotTitle: 'What is Valibot?',
    whatIsValibotContent: 'Valibot is a modern schema validation library built with TypeScript in mind. Created by Fabian Hiller, it emphasizes type safety, minimal bundle size, and a functional programming approach. Valibot\'s schema definitions double as TypeScript types with perfect inference.',
    
    whatIsYupTitle: 'What is Yup?',
    whatIsYupContent: 'Yup is a JavaScript schema builder for value parsing and validation. It defines a schema via a chainable API, transforms values, and validates them. Yup has been the standard choice for form validation in React applications for many years.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark results for validation operations:',
    
    bundleTitle: 'Bundle Size',
    bundleIntro: 'Size impact on your application:',
    
    validationTitle: 'Validation Speed',
    validationIntro: 'Operations per second (higher is better):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and API design:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'See the API differences in action:',
    
    valibotExampleTitle: 'Valibot',
    yupExampleTitle: 'Yup',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'Type inference comparison:',
    
    integrationTitle: 'Framework Integration',
    integrationIntro: 'Using with popular frameworks:',
    
    whenToUseTitle: 'When to Use Each',
    valibotBestFor: 'Use Valibot When:',
    yupBestFor: 'Use Yup When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Valibot represents the future of schema validation in TypeScript projects. Its superior type inference, minimal footprint, and functional API make it ideal for modern applications. Yup remains a solid choice for existing projects and teams familiar with its chainable API. Choose based on your TypeScript requirements and bundle size priorities.',
    
    faq1q: 'Can Valibot replace Yup completely?',
    faq1a: 'Yes, Valibot covers all common validation patterns that Yup supports. However, some Yup-specific ecosystem packages may not have Valibot equivalents yet. Check your dependencies before migrating.',
    
    faq2q: 'Does Valibot work with React Hook Form?',
    faq2a: 'Yes, Valibot works with React Hook Form via @hookform/resolvers. Import valibotResolver from the package and pass your schema. The integration is seamless.',
    
    faq3q: 'How does Valibot handle async validation?',
    faq3a: 'Valibot supports async validation through the async() wrapper. You can define custom async validators that check databases or APIs. The API remains consistent with sync validation.',
    
    faq4q: 'Can I transform values during validation like in Yup?',
    faq4a: 'Yes, Valibot supports transformations through the transform() function. You can parse, coerce, and modify values as part of the validation pipeline. Transformations compose with validators.',
    
    faq5q: 'What about error message customization?',
    faq5a: 'Both libraries support custom error messages. Valibot uses a functional approach with message functions, while Yup uses string templates. Valibot offers better i18n support through message functions.',
    
    faq6q: 'Is Valibot suitable for form validation?',
    faq6a: 'Absolutely. Valibot excels at form validation with excellent React Hook Form integration, nested object support, and conditional validation. Its type inference makes form handling type-safe.',
    
    faq7q: 'How does bundle size compare at scale?',
    faq7a: 'Valibot\'s tree-shaking means you only bundle what you use. A typical form schema adds ~2KB with Valibot vs ~8KB with Yup. The difference grows with complex schemas.',
    
    faq8q: 'Can I migrate from Yup to Valibot gradually?',
    faq8a: 'Yes, both libraries can coexist in the same project. You can migrate schema by schema. The APIs are different but concepts translate well, making migration straightforward.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Valibot vs Yup：Schema验证库对比',
    intro: 'Yup多年来一直是首选的schema验证库，但Valibot提供了一个现代、类型安全且更小的替代方案。本比较考察包体积、TypeScript支持、API设计和实际性能，帮助你选择合适的验证解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Valibot提供卓越的TypeScript推断、更小的包体积（0.6KB vs 6KB）和函数式API。Yup有更好的生态支持和现有用户熟悉的API。对于2025年的新TypeScript项目，推荐Valibot；对于遗留项目或需要生态包时选择Yup。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Valibot比Yup小10倍（0.6KB vs 6KB gzip压缩后）',
    takeaway2: 'Valibot开箱即用提供卓越的TypeScript类型推断',
    takeaway3: 'Yup拥有更大的生态系统和更多社区资源',
    takeaway4: 'Valibot使用函数式API，Yup使用链式方法',
    takeaway5: '两者都能很好地集成React Hook Form和Formik',
    takeaway6: 'Valibot支持tree-shaking，Yup作为单个包加载',
    
    whatIsValibotTitle: '什么是Valibot？',
    whatIsValibotContent: 'Valibot是一个以TypeScript为核心构建的现代schema验证库。由Fabian Hiller创建，它强调类型安全、最小包体积和函数式编程方法。Valibot的schema定义可以直接作为TypeScript类型使用，推断完美。',
    
    whatIsYupTitle: '什么是Yup？',
    whatIsYupContent: 'Yup是一个用于值解析和验证的JavaScript schema构建器。它通过链式API定义schema，转换值并验证它们。Yup多年来一直是React应用表单验证的标准选择。',
    
    performanceTitle: '性能对比',
    performanceIntro: '验证操作的基准测试结果：',
    
    bundleTitle: '包体积',
    bundleIntro: '对你应用的大小影响：',
    
    validationTitle: '验证速度',
    validationIntro: '每秒操作数（越高越好）：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较能力和API设计：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '看看API的实际区别：',
    
    valibotExampleTitle: 'Valibot',
    yupExampleTitle: 'Yup',
    
    typescriptTitle: 'TypeScript体验',
    typescriptIntro: '类型推断对比：',
    
    integrationTitle: '框架集成',
    integrationIntro: '与流行框架一起使用：',
    
    whenToUseTitle: '何时使用',
    valibotBestFor: '使用Valibot的场景：',
    yupBestFor: '使用Yup的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Valibot代表着TypeScript项目中schema验证的未来。其卓越的类型推断、最小占用和函数式API使其成为现代应用的理想选择。Yup对于现有项目和熟悉其链式API的团队仍然是可靠的选择。根据你的TypeScript需求和包体积优先级选择。',
    
    faq1q: 'Valibot能完全替代Yup吗？',
    faq1a: '可以，Valibot覆盖了Yup支持的所有常见验证模式。然而，一些Yup特定的生态包可能还没有Valibot等效物。迁移前请检查你的依赖。',
    
    faq2q: 'Valibot能与React Hook Form一起使用吗？',
    faq2a: '是的，Valibot通过@hookform/resolvers与React Hook Form配合使用。从包中导入valibotResolver并传入你的schema。集成是无缝的。',
    
    faq3q: 'Valibot如何处理异步验证？',
    faq3a: 'Valibot通过async()包装器支持异步验证。你可以定义检查数据库或API的自定义异步验证器。API与同步验证保持一致。',
    
    faq4q: '我可以像Yup一样在验证时转换值吗？',
    faq4a: '是的，Valibot通过transform()函数支持转换。你可以作为验证管道的一部分解析、强制转换和修改值。转换与验证器组合。',
    
    faq5q: '错误消息自定义呢？',
    faq5a: '两个库都支持自定义错误消息。Valibot使用带有消息函数的函数式方法，而Yup使用字符串模板。Valibot通过消息函数提供更好的i18n支持。',
    
    faq6q: 'Valibot适合表单验证吗？',
    faq6a: '当然。Valibot在表单验证方面表现出色，具有优秀的React Hook Form集成、嵌套对象支持和条件验证。其类型推断使表单处理类型安全。',
    
    faq7q: '大规模时包体积如何比较？',
    faq7a: 'Valibot的tree-shaking意味着你只打包你使用的内容。典型的表单schema用Valibot增加约2KB，而Yup约8KB。复杂schema时差异更大。',
    
    faq8q: '我可以从Yup逐步迁移到Valibot吗？',
    faq8a: '是的，两个库可以在同一项目中共存。你可以逐个schema迁移。API不同但概念转换良好，使迁移变得直接。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ValibotVsYup({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsValibotTitle}</h3>
      <p style={pStyle}>{ct.whatIsValibotContent}</p>

      <h3 style={h3Style}>{ct.whatIsYupTitle}</h3>
      <p style={pStyle}>{ct.whatIsYupContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Yup</th>
              <th style={thStyle}>Valibot</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2014', '2023'],
              [isZh ? '核心体积' : 'Core Size', '6KB (gzipped)', '0.6KB (gzipped)'],
              [isZh ? 'API风格' : 'API Style', isZh ? '链式方法' : 'Chainable methods', isZh ? '函数式' : 'Functional'],
              [isZh ? 'TypeScript' : 'TypeScript', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? 'Tree-shaking' : 'Tree-shaking', isZh ? '有限' : 'Limited', isZh ? '完全支持' : 'Full support'],
              [isZh ? '运行时' : 'Runtime', 'Any JS', 'Any JS'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '平缓' : 'Gentle', isZh ? '平缓' : 'Gentle'],
            ].map(([feature, yup, valibot], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{yup}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{valibot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.bundleTitle}</h3>
      <p style={pStyle}>{ct.bundleIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '配置' : 'Configuration'}</th>
              <th style={thStyle}>Yup</th>
              <th style={thStyle}>Valibot</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心库' : 'Core Library', '6.2KB', '0.6KB'],
              [isZh ? '基础schema' : 'Basic Schema', '6.2KB', '1.1KB'],
              [isZh ? '含日期验证' : 'With Date Validation', '7.8KB', '1.4KB'],
              [isZh ? '完整功能' : 'Full Features', '12KB', '3.2KB'],
            ].map(([config, yup, valibot], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{config}</td>
                <td style={tdStyle}>{yup}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{valibot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.validationTitle}</h3>
      <p style={pStyle}>{ct.validationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '测试' : 'Test'}</th>
              <th style={thStyle}>Yup</th>
              <th style={thStyle}>Valibot</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '简单对象' : 'Simple Object', '450,000 ops/s', '520,000 ops/s'],
              [isZh ? '嵌套对象' : 'Nested Object', '180,000 ops/s', '210,000 ops/s'],
              [isZh ? '数组验证' : 'Array Validation', '95,000 ops/s', '120,000 ops/s'],
              [isZh ? '字符串规则' : 'String Rules', '320,000 ops/s', '380,000 ops/s'],
            ].map(([test, yup, valibot], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{test}</td>
                <td style={tdStyle}>{yup}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{valibot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.valibotExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Valibot - User registration schema
import * as v from 'valibot';
import { email, minLength, maxValue } from 'valibot';

// Define schema with functional API
const UserSchema = v.object({
  email: v.pipe(
    v.string(),
    v.minLength(1, 'Email is required'),
    v.email('Invalid email format')
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8, 'Password must be at least 8 characters'),
    v.regex(/[A-Z]/, 'Must contain uppercase'),
    v.regex(/[0-9]/, 'Must contain number')
  ),
  age: v.optional(
    v.pipe(v.number(), v.minValue(18, 'Must be 18 or older'))
  ),
  preferences: v.object({
    newsletter: v.boolean(),
    theme: v.union([v.literal('light'), v.literal('dark')])
  })
});

// Type is automatically inferred
type User = v.InferInput<typeof UserSchema>;
// { email: string; password: string; age?: number; preferences: { ... } }

// Parse and validate
const result = v.safeParse(UserSchema, input);
if (result.success) {
  console.log(result.output); // Typed output
} else {
  console.log(result.issues); // Validation issues
}

// Async validation
const AsyncUserSchema = v.pipeAsync(
  UserSchema,
  v.asyncCheck(async (user) => {
    const exists = await checkEmailExists(user.email);
    return !exists;
  }, 'Email already registered')
);

// With React Hook Form
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: valibotResolver(UserSchema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.yupExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Yup - User registration schema
import * as yup from 'yup';

// Define schema with chainable API
const UserSchema = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain uppercase')
    .matches(/[0-9]/, 'Must contain number'),
  age: yup.number()
    .min(18, 'Must be 18 or older')
    .optional(),
  preferences: yup.object({
    newsletter: yup.boolean().required(),
    theme: yup.mixed().oneOf(['light', 'dark'] as const)
  }).required()
});

// Type inference (requires InferType)
type User = yup.InferType<typeof UserSchema>;

// Validate
try {
  const validUser = await UserSchema.validate(input, { abortEarly: false });
  console.log(validUser);
} catch (error) {
  if (error instanceof yup.ValidationError) {
    console.log(error.errors);
  }
}

// Sync validation
const syncResult = UserSchema.validateSync(input, { abortEarly: false });

// Custom validation
const UserSchemaWithCheck = UserSchema.test(
  'unique-email',
  'Email already registered',
  async function(value) {
    if (!value?.email) return true;
    const exists = await checkEmailExists(value.email);
    return !exists;
  }
);

// With React Hook Form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(UserSchema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}`}</code></pre>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Yup</th>
              <th style={thStyle}>Valibot</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '基础类型' : 'Basic Types', isZh ? '完整' : 'Complete', isZh ? '完整' : 'Complete'],
              [isZh ? '嵌套对象' : 'Nested Objects', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '条件验证' : 'Conditional', 'when()', isZh ? '条件函数' : 'Conditional fn'],
              [isZh ? '自定义验证' : 'Custom Valid', 'test()', isZh ? 'check()' : 'check()'],
              [isZh ? '值转换' : 'Transform', isZh ? '内置' : 'Built-in', 'transform()'],
              [isZh ? '异步验证' : 'Async', isZh ? '支持' : 'Supported', isZh ? '原生支持' : 'Native'],
              [isZh ? '错误消息' : 'Error Messages', isZh ? '字符串模板' : 'String templates', isZh ? '函数' : 'Functions'],
              [isZh ? 'i18n支持' : 'i18n Support', isZh ? '手动' : 'Manual', isZh ? '原生' : 'Native'],
            ].map(([feature, yup, valibot], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{yup}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{valibot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.typescriptTitle}</h2>
      <p style={pStyle}>{ct.typescriptIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Yup TypeScript</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要InferType工具类型。推断有时不完美，特别是可选字段和联合类型。需要额外配置以获得最佳结果。' : 'Requires InferType utility type. Inference is sometimes imperfect, especially with optional fields and union types. Requires extra configuration for best results.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Valibot TypeScript</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '以TypeScript优先设计。InferInput和InferOutput提供精确类型推断。可选字段、联合类型和转换类型都完美推断。' : 'Designed TypeScript-first. InferInput and InferOutput provide precise type inference. Optional fields, unions, and transformed types all infer perfectly.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.valibotBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新TypeScript项目' : 'New TypeScript projects'}</li>
            <li>{isZh ? '包体积敏感应用' : 'Bundle size sensitive apps'}</li>
            <li>{isZh ? '需要精确类型' : 'Need precise types'}</li>
            <li>{isZh ? '函数式编程偏好' : 'Functional programming preference'}</li>
            <li>{isZh ? '国际化需求' : 'i18n requirements'}</li>
            <li>{isZh ? '现代技术栈' : 'Modern tech stack'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.yupBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '遗留项目' : 'Legacy projects'}</li>
            <li>{isZh ? '团队熟悉Yup' : 'Team familiar with Yup'}</li>
            <li>{isZh ? '需要生态包' : 'Need ecosystem packages'}</li>
            <li>{isZh ? 'JavaScript项目' : 'JavaScript projects'}</li>
            <li>{isZh ? '链式API偏好' : 'Chainable API preference'}</li>
            <li>{isZh ? '丰富文档需求' : 'Need extensive docs'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
