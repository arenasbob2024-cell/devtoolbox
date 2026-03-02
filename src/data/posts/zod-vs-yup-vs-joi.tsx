'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Zod vs Yup vs Joi: Validation Library Triple Comparison',
    intro: 'Choosing the right validation library can significantly impact your development experience. Zod, Yup, and Joi each offer unique advantages. This comprehensive comparison examines TypeScript support, bundle size, API design, and real-world performance.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Zod offers the best TypeScript experience with zero-dependency runtime. Joi is powerful for Node.js backends with rich features. Yup excels in browser environments with React integration. For new TypeScript projects, choose Zod. For Node.js backends, choose Joi. For React forms, Yup remains solid.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Zod provides the best TypeScript inference and smallest runtime',
    takeaway2: 'Joi is feature-rich but Node.js only, not for browsers',
    takeaway3: 'Yup has the best React ecosystem integration',
    takeaway4: 'Zod and Yup work in both browser and Node.js',
    takeaway5: 'Joi has the most built-in validation methods',
    takeaway6: 'Zod\'s functional API is most composable',
    
    whatIsZodTitle: 'What is Zod?',
    whatIsZodContent: 'Zod is a TypeScript-first schema declaration and validation library created by Colin McDonnell. It features zero dependencies, excellent type inference, and works in both browser and Node.js environments. Zod schemas double as TypeScript types.',
    
    whatIsYupTitle: 'What is Yup?',
    whatIsYupContent: 'Yup is a JavaScript schema builder for value parsing and validation. It uses a chainable API to define schemas and has been the standard choice for React form validation. Yup works in browsers and Node.js.',
    
    whatIsJoiTitle: 'What is Joi?',
    whatIsJoiContent: 'Joi is a powerful schema description and data validation library for JavaScript, created by the Hapi.js team. It offers extensive built-in validators but is designed for Node.js server-side use only.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Comprehensive benchmark results:',
    
    bundleTitle: 'Bundle Size',
    bundleIntro: 'Impact on your application size:',
    
    validationTitle: 'Validation Speed',
    validationIntro: 'Operations per second benchmark:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed capability comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Compare the three APIs:',
    
    typescriptTitle: 'TypeScript Support',
    typescriptIntro: 'Type inference capabilities:',
    
    ecosystemTitle: 'Ecosystem & Integration',
    ecosystemIntro: 'Framework and tool support:',
    
    whenToUseTitle: 'When to Use Each',
    recommendationTitle: 'Recommendation Matrix',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Each library excels in different scenarios. Zod is the best choice for TypeScript projects with its superior type inference and zero dependencies. Joi remains the powerhouse for Node.js backends needing extensive validation. Yup continues to be a solid choice for React applications with excellent form library integration. Consider your runtime environment, TypeScript needs, and ecosystem requirements when choosing.',
    
    faq1q: 'Which library is fastest?',
    faq1a: 'In benchmarks, Zod and Yup have similar performance for basic validation. Joi is fastest for complex schemas on Node.js. However, all three are fast enough for most applications. Choose based on features, not raw speed.',
    
    faq2q: 'Can I use Joi in the browser?',
    faq2a: 'Not recommended. Joi is designed for Node.js and has a large bundle size. For browser validation, use Zod or Yup instead. They are specifically optimized for browser environments.',
    
    faq3q: 'Does Zod support async validation?',
    faq3a: 'Yes, Zod supports async validation through refine() with async functions and the z.promise() type. You can validate against databases or APIs seamlessly.',
    
    faq4q: 'Which has the best error messages?',
    faq4a: 'All three support custom error messages. Joi has the most detailed error structure by default. Zod offers the most flexible error customization through error maps. Yup provides simple string-based customization.',
    
    faq5q: 'Can I use these with React Hook Form?',
    faq5a: 'Yes, all three have @hookform/resolvers support. Zod and Yup have first-class support. Joi works but is less common in React applications due to its Node.js focus.',
    
    faq6q: 'Which is best for API validation?',
    faq6a: 'Joi is excellent for Node.js APIs with extensive built-in validators. Zod works well for TypeScript APIs with tRPC. For Express.js, any of them work with appropriate middleware.',
    
    faq7q: 'How do they handle nested objects?',
    faq7a: 'All three handle nested objects well. Zod and Yup have similar syntax. Joi offers the most options for nested validation. Type inference for nested objects is best in Zod.',
    
    faq8q: 'Which library should I learn first?',
    faq8a: 'Start with Zod if you use TypeScript. Its type inference makes learning easier. Start with Yup if you work mainly with React forms. Start with Joi if you build Node.js backends exclusively.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Zod vs Yup vs Joi：验证库三重比较',
    intro: '选择正确的验证库会显著影响你的开发体验。Zod、Yup和Joi各有独特优势。本全面比较考察TypeScript支持、包体积、API设计和实际性能。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Zod提供最好的TypeScript体验和零依赖运行时。Joi对于Node.js后端功能强大。Yup在浏览器环境中与React集成方面表现出色。对于新TypeScript项目选择Zod。对于Node.js后端选择Joi。对于React表单，Yup仍然可靠。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Zod提供最好的TypeScript类型推断和最小运行时',
    takeaway2: 'Joi功能丰富但仅限Node.js，不适用于浏览器',
    takeaway3: 'Yup有最好的React生态系统集成',
    takeaway4: 'Zod和Yup都可在浏览器和Node.js中工作',
    takeaway5: 'Joi有最多的内置验证方法',
    takeaway6: 'Zod的函数式API最可组合',
    
    whatIsZodTitle: '什么是Zod？',
    whatIsZodContent: 'Zod是一个TypeScript优先的schema声明和验证库，由Colin McDonnell创建。它具有零依赖、出色的类型推断，在浏览器和Node.js环境中都能工作。Zod schema可以直接作为TypeScript类型使用。',
    
    whatIsYupTitle: '什么是Yup？',
    whatIsYupContent: 'Yup是一个用于值解析和验证的JavaScript schema构建器。它使用链式API定义schema，一直是React表单验证的标准选择。Yup在浏览器和Node.js中都能工作。',
    
    whatIsJoiTitle: '什么是Joi？',
    whatIsJoiContent: 'Joi是一个强大的schema描述和数据验证JavaScript库，由Hapi.js团队创建。它提供广泛的内置验证器，但专为Node.js服务器端使用设计。',
    
    performanceTitle: '性能对比',
    performanceIntro: '综合基准测试结果：',
    
    bundleTitle: '包体积',
    bundleIntro: '对你应用大小的影响：',
    
    validationTitle: '验证速度',
    validationIntro: '每秒操作数基准测试：',
    
    featuresTitle: '功能对比',
    featuresIntro: '详细能力比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '比较三种API：',
    
    typescriptTitle: 'TypeScript支持',
    typescriptIntro: '类型推断能力：',
    
    ecosystemTitle: '生态与集成',
    ecosystemIntro: '框架和工具支持：',
    
    whenToUseTitle: '何时使用',
    recommendationTitle: '推荐矩阵',
    
    conclusionTitle: '结论',
    conclusionContent: '每个库在不同场景下都有优势。Zod是TypeScript项目的最佳选择，具有卓越的类型推断和零依赖。Joi仍然是需要广泛验证的Node.js后端的强大选择。Yup继续是具有出色表单库集成的React应用的可靠选择。选择时考虑你的运行时环境、TypeScript需求和生态系统要求。',
    
    faq1q: '哪个库最快？',
    faq1a: '在基准测试中，Zod和Yup在基本验证上性能相似。Joi在Node.js上复杂schema最快。然而，这三个对大多数应用都足够快。根据功能选择，而不是原始速度。',
    
    faq2q: '我可以在浏览器中使用Joi吗？',
    faq2a: '不推荐。Joi专为Node.js设计，包体积大。对于浏览器验证，改用Zod或Yup。它们专门为浏览器环境优化。',
    
    faq3q: 'Zod支持异步验证吗？',
    faq3a: '是的，Zod通过refine()和异步函数以及z.promise()类型支持异步验证。你可以无缝地对数据库或API进行验证。',
    
    faq4q: '哪个有最好的错误消息？',
    faq4a: '三个都支持自定义错误消息。Joi默认有最详细的错误结构。Zod通过错误映射提供最灵活的错误自定义。Yup提供简单的基于字符串的自定义。',
    
    faq5q: '这些可以与React Hook Form一起使用吗？',
    faq5a: '是的，三个都有@hookform/resolvers支持。Zod和Yup有一流支持。Joi可以使用，但在React应用中较少见，因为其Node.js专注。',
    
    faq6q: '哪个最适合API验证？',
    faq6a: 'Joi对于Node.js API非常出色，有广泛的内置验证器。Zod与tRPC配合良好用于TypeScript API。对于Express.js，任何都可以配合适当的中间件使用。',
    
    faq7q: '它们如何处理嵌套对象？',
    faq7a: '三个都能很好地处理嵌套对象。Zod和Yup语法相似。Joi为嵌套验证提供最多选项。嵌套对象的类型推断Zod最好。',
    
    faq8q: '我应该先学哪个库？',
    faq8a: '如果你使用TypeScript，从Zod开始。其类型推断使学习更容易。如果你主要使用React表单，从Yup开始。如果你专门构建Node.js后端，从Joi开始。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ZodVsYupVsJoi({ lang }: { lang: string }) {
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

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.whatIsZodTitle}</h3>
      <p style={pStyle}>{ct.whatIsZodContent}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.whatIsYupTitle}</h3>
      <p style={pStyle}>{ct.whatIsYupContent}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.whatIsJoiTitle}</h3>
      <p style={pStyle}>{ct.whatIsJoiContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Zod</th>
              <th style={thStyle}>Yup</th>
              <th style={thStyle}>Joi</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2020', '2014', '2012'],
              [isZh ? '包体积' : 'Bundle Size', '11KB', '6KB', '130KB'],
              [isZh ? '依赖数' : 'Dependencies', '0', '4', '4'],
              [isZh ? '运行时' : 'Runtime', isZh ? '通用' : 'Universal', isZh ? '通用' : 'Universal', 'Node.js only'],
              [isZh ? 'TypeScript' : 'TypeScript', isZh ? '原生' : 'Native', isZh ? '良好' : 'Good', isZh ? '有限' : 'Limited'],
              [isZh ? 'API风格' : 'API Style', isZh ? '函数式' : 'Functional', isZh ? '链式' : 'Chainable', isZh ? '链式' : 'Chainable'],
            ].map(([feature, zod, yup, joi], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{zod}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{yup}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{joi}</td>
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
              <th style={thStyle}>Zod</th>
              <th style={thStyle}>Yup</th>
              <th style={thStyle}>Joi</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心库' : 'Core Library', '11.2KB', '6.2KB', '130KB'],
              [isZh ? '含React集成' : 'With React', '12KB', '7KB', 'N/A'],
              [isZh ? 'Tree-shake后' : 'After Tree-shake', '8KB', '6KB', 'N/A'],
              [isZh ? '解析时间' : 'Parse Time', '2ms', '3ms', '15ms'],
            ].map(([config, zod, yup, joi], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{config}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{zod}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{yup}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{joi}</td>
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
              <th style={thStyle}>Zod</th>
              <th style={thStyle}>Yup</th>
              <th style={thStyle}>Joi</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '简单对象' : 'Simple Object', '480K ops/s', '450K ops/s', '520K ops/s'],
              [isZh ? '嵌套对象' : 'Nested Object', '195K ops/s', '180K ops/s', '240K ops/s'],
              [isZh ? '数组验证' : 'Array Validation', '110K ops/s', '95K ops/s', '130K ops/s'],
              [isZh ? '复杂schema' : 'Complex Schema', '75K ops/s', '60K ops/s', '95K ops/s'],
            ].map(([test, zod, yup, joi], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{test}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{zod}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{yup}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{joi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>Zod</h3>
      <pre style={codeStyle}><code>{`// Zod - User schema
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  age: z.number().int().positive().optional(),
  role: z.enum(['admin', 'user', 'guest']),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean()
  })
});

// Type inference
type User = z.infer<typeof UserSchema>;

// Parse with error handling
const result = UserSchema.safeParse(input);
if (result.success) {
  console.log(result.data); // Typed!
} else {
  console.log(result.error.issues);
}

// Async validation
const AsyncSchema = z.object({
  email: z.string().email().refine(async (email) => {
    const exists = await checkEmail(email);
    return !exists;
  }, 'Email already taken')
});

// With tRPC
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure.input(UserSchema);`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>Yup</h3>
      <pre style={codeStyle}><code>{`// Yup - User schema
import * as yup from 'yup';

const UserSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(100).required(),
  age: yup.number().integer().positive().optional(),
  role: yup.mixed().oneOf(['admin', 'user', 'guest'] as const),
  preferences: yup.object({
    theme: yup.mixed().oneOf(['light', 'dark'] as const),
    notifications: yup.boolean()
  })
});

// Type inference
type User = yup.InferType<typeof UserSchema>;

// Validate
try {
  const validUser = await UserSchema.validate(input, { abortEarly: false });
} catch (error) {
  if (error instanceof yup.ValidationError) {
    console.log(error.errors);
  }
}

// With React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function MyForm() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(UserSchema)
  });
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Joi</h3>
      <pre style={codeStyle}><code>{`// Joi - User schema (Node.js only)
const Joi = require('joi');

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  age: Joi.number().integer().positive().optional(),
  role: Joi.string().valid('admin', 'user', 'guest'),
  preferences: Joi.object({
    theme: Joi.string().valid('light', 'dark'),
    notifications: Joi.boolean()
  })
});

// Validate
const { error, value } = UserSchema.validate(input, {
  abortEarly: false,
  allowUnknown: false
});

if (error) {
  console.log(error.details);
} else {
  console.log(value);
}

// With Express
const validateUser = (req, res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  next();
};

app.post('/users', validateUser, (req, res) => {
  // req.body is validated
});`}</code></pre>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Zod</th>
              <th style={thStyle}>Yup</th>
              <th style={thStyle}>Joi</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '基础类型' : 'Basic Types', isZh ? '完整' : 'Complete', isZh ? '完整' : 'Complete', isZh ? '完整' : 'Complete'],
              [isZh ? '条件验证' : 'Conditional', 'refine()', 'when()', 'when()'],
              [isZh ? '异步验证' : 'Async', isZh ? '原生' : 'Native', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '值转换' : 'Transform', 'transform()', isZh ? '内置' : 'Built-in', isZh ? '有限' : 'Limited'],
              [isZh ? '自定义验证' : 'Custom', 'refine()', 'test()', 'custom()'],
              [isZh ? '错误格式' : 'Error Format', 'ZodError', 'ValidationError', isZh ? '详细' : 'Detailed'],
              [isZh ? '浏览器支持' : 'Browser', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
              [isZh ? '内置验证器' : 'Built-in Validators', '~20', '~15', '50+'],
            ].map(([feature, zod, yup, joi], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{zod}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{yup}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{joi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.typescriptTitle}</h2>
      <p style={pStyle}>{ct.typescriptIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Zod TypeScript</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '以TypeScript优先设计，提供完美类型推断。z.infer自动推断输入和输出类型。与tRPC、Next.js等现代框架深度集成。' : 'Designed TypeScript-first with perfect type inference. z.infer automatically infers input and output types. Deep integration with modern frameworks like tRPC, Next.js.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Yup TypeScript</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '良好的TypeScript支持，需要InferType工具类型。可选字段和联合类型推断有时不完美。需要@types/yup。' : 'Good TypeScript support, requires InferType utility. Optional fields and union types sometimes infer imperfectly. Requires @types/yup.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>Joi TypeScript</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '有限的TypeScript支持。没有内置类型推断，需要手动定义接口。有@types/joi但体验一般。' : 'Limited TypeScript support. No built-in type inference, requires manual interface definitions. Has @types/joi but experience is average.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{isZh ? '使用Zod' : 'Use Zod'}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'TypeScript项目' : 'TypeScript projects'}</li>
            <li>{isZh ? 'tRPC/Next.js' : 'tRPC/Next.js'}</li>
            <li>{isZh ? '全栈类型共享' : 'Full-stack type sharing'}</li>
            <li>{isZh ? '零依赖需求' : 'Zero dependency needs'}</li>
            <li>{isZh ? '现代技术栈' : 'Modern tech stack'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{isZh ? '使用Yup' : 'Use Yup'}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'React表单' : 'React forms'}</li>
            <li>{isZh ? 'Formik集成' : 'Formik integration'}</li>
            <li>{isZh ? '团队熟悉' : 'Team familiarity'}</li>
            <li>{isZh ? '最小包体积' : 'Minimal bundle size'}</li>
            <li>{isZh ? '链式API偏好' : 'Chainable API preference'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{isZh ? '使用Joi' : 'Use Joi'}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Node.js后端' : 'Node.js backends'}</li>
            <li>{isZh ? 'Hapi.js框架' : 'Hapi.js framework'}</li>
            <li>{isZh ? '复杂验证规则' : 'Complex validation rules'}</li>
            <li>{isZh ? '丰富内置方法' : 'Rich built-in methods'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
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
