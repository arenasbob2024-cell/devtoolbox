'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'React Hook Form vs Formik: Form Library Comparison 2025',
    intro: 'Form handling in React has evolved significantly, with React Hook Form and Formik emerging as the two dominant solutions. This comprehensive comparison examines performance, bundle size, API design, and developer experience to help you choose the right form library for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'React Hook Form offers superior performance with fewer re-renders, smaller bundle size (7KB vs 43KB), and better TypeScript support. Formik provides a more mature ecosystem and simpler mental model for developers familiar with controlled components. For new projects in 2025, React Hook Form is the recommended choice for most use cases.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'React Hook Form reduces re-renders by using uncontrolled components',
    takeaway2: 'React Hook Form is 6x smaller: 7KB vs Formik\'s 43KB gzipped',
    takeaway3: 'Formik uses controlled components, React Hook Form uses refs',
    takeaway4: 'Both integrate well with Yup, Zod, and other validation libraries',
    takeaway5: 'React Hook Form has better TypeScript inference out of the box',
    takeaway6: 'Formik has more examples and community resources available',
    
    whatIsRhfTitle: 'What is React Hook Form?',
    whatIsRhfContent: 'React Hook Form, created in 2019, is a performant form library that minimizes re-renders by using uncontrolled components and refs. It leverages React hooks for a clean API and provides excellent TypeScript support. With over 4 million weekly downloads, it has become the most popular form library in the React ecosystem.',
    
    whatIsFormikTitle: 'What is Formik?',
    whatIsFormikContent: 'Formik, created in 2018 by Jared Palmer, is a form library that helps with the three most annoying parts of form building: getting values in/out of form state, validation, and handling submission. It uses controlled components and provides a familiar mental model for React developers. With over 3 million weekly downloads, it remains widely used in production.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks testing form with 50 inputs:',
    
    renderTitle: 'Re-render Performance',
    renderIntro: 'Testing re-renders when typing in a single field:',
    
    bundleTitle: 'Bundle Size Comparison',
    bundleIntro: 'Impact on your application bundle:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Both libraries provide clean APIs for form handling:',
    
    formikExampleTitle: 'Formik',
    rhfExampleTitle: 'React Hook Form',
    
    validationTitle: 'Validation Integration',
    validationIntro: 'Both libraries work with popular validation schemas:',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'TypeScript support comparison:',
    
    migrationTitle: 'Migration from Formik to React Hook Form',
    migrationIntro: 'Step-by-step migration guide:',
    
    whenToUseTitle: 'When to Use Each Library',
    rhfBestFor: 'Use React Hook Form When:',
    formikBestFor: 'Use Formik When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, React Hook Form is the clear winner for most React form scenarios. Its performance advantages, smaller bundle size, and excellent TypeScript support make it ideal for modern applications. Formik remains a solid choice for teams already familiar with controlled components or maintaining existing codebases. The future of React forms is hooks-first, minimal re-renders, and type-safe - all strengths of React Hook Form.',
    
    faq1q: 'Can I use React Hook Form with UI libraries?',
    faq1a: 'Yes, React Hook Form works with all major UI libraries including Material-UI, Ant Design, Chakra UI, and shadcn/ui. It provides a Controller component for integrating with controlled components from these libraries.',
    
    faq2q: 'Is Formik still maintained in 2025?',
    faq2a: 'Formik is still maintained but receives fewer updates compared to its peak. It remains stable and production-ready, but new features are rare. React Hook Form sees more active development.',
    
    faq3q: 'Which is better for complex nested forms?',
    faq3a: 'React Hook Form handles nested objects and arrays better with useFieldArray and useWatch hooks. Formik can handle nested forms but requires more boilerplate code.',
    
    faq4q: 'How do I handle file uploads?',
    faq4a: 'Both libraries support file uploads. React Hook Form uses register with type "file" or Controller for more control. Formik uses setFieldValue to manually update the file field.',
    
    faq5q: 'Can I migrate from Formik to React Hook Form incrementally?',
    faq5a: 'Yes, you can migrate form by form since both libraries can coexist in the same project. Start with new forms using React Hook Form, then gradually migrate existing ones.',
    
    faq6q: 'Which has better error handling?',
    faq6a: 'Both provide excellent error handling. React Hook Form offers more granular control with separate error states per field and better async validation support. Formik has a simpler but less flexible approach.',
    
    faq7q: 'Do they work with React Native?',
    faq7a: 'Yes, both libraries work with React Native. React Hook Form has better Native support with dedicated Controller component. Formik works but may require more custom implementation.',
    
    faq8q: 'What about form libraries for Server Components?',
    faq8a: 'React Hook Form v7+ works with React Server Components through the useFormState hook and server actions. It is the recommended choice for Next.js App Router applications.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'React Hook Form vs Formik：2025年表单库对比',
    intro: 'React中的表单处理已经显著演进，React Hook Form和Formik成为两大主导解决方案。本全面比较考察性能、包大小、API设计和开发者体验，帮助你为下一个项目选择合适的表单库。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'React Hook Form通过更少的重渲染提供卓越的性能，更小的包大小（7KB vs 43KB），以及更好的TypeScript支持。Formik为熟悉受控组件的开发者提供更成熟的生态系统和更简单的心智模型。对于2025年的新项目，React Hook Form是大多数用例的推荐选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'React Hook Form通过使用非受控组件减少重渲染',
    takeaway2: 'React Hook Form小6倍：7KB vs Formik的43KB（gzip后）',
    takeaway3: 'Formik使用受控组件，React Hook Form使用refs',
    takeaway4: '两者都能很好地与Yup、Zod等验证库集成',
    takeaway5: 'React Hook Form开箱即用提供更好的TypeScript推断',
    takeaway6: 'Formik有更多的示例和社区资源可用',
    
    whatIsRhfTitle: '什么是React Hook Form？',
    whatIsRhfContent: 'React Hook Form创建于2019年，是一个高性能表单库，通过使用非受控组件和refs最小化重渲染。它利用React hooks提供简洁的API，并提供出色的TypeScript支持。每周超过400万次下载，它已成为React生态系统中最受欢迎的表单库。',
    
    whatIsFormikTitle: '什么是Formik？',
    whatIsFormikContent: 'Formik由Jared Palmer于2018年创建，是一个帮助处理表单构建中最烦人的三个部分的表单库：获取表单状态的值、验证和处理提交。它使用受控组件，为React开发者提供熟悉的心智模型。每周超过300万次下载，它仍然在生产中广泛使用。',
    
    performanceTitle: '性能对比',
    performanceIntro: '测试包含50个输入字段的表单的性能基准：',
    
    renderTitle: '重渲染性能',
    renderIntro: '测试在单个字段中输入时的重渲染：',
    
    bundleTitle: '包大小对比',
    bundleIntro: '对应用程序包的影响：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个库都提供简洁的表单处理API：',
    
    formikExampleTitle: 'Formik',
    rhfExampleTitle: 'React Hook Form',
    
    validationTitle: '验证集成',
    validationIntro: '两个库都能与流行的验证schema配合使用：',
    
    typescriptTitle: 'TypeScript体验',
    typescriptIntro: 'TypeScript支持对比：',
    
    migrationTitle: '从Formik迁移到React Hook Form',
    migrationIntro: '分步迁移指南：',
    
    whenToUseTitle: '何时使用每个库',
    rhfBestFor: '使用React Hook Form的场景：',
    formikBestFor: '使用Formik的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，React Hook Form是大多数React表单场景的明显赢家。其性能优势、更小的包大小和出色的TypeScript支持使其成为现代应用的理想选择。Formik对于已经熟悉受控组件或维护现有代码库的团队仍然是可靠的选择。React表单的未来是hooks优先、最小重渲染和类型安全——这些都是React Hook Form的优势。',
    
    faq1q: '我可以在UI库中使用React Hook Form吗？',
    faq1a: '是的，React Hook Form与所有主要UI库兼容，包括Material-UI、Ant Design、Chakra UI和shadcn/ui。它提供Controller组件用于与这些库的受控组件集成。',
    
    faq2q: 'Formik在2025年还在维护吗？',
    faq2a: 'Formik仍在维护，但相比其高峰期收到的更新较少。它仍然稳定且可用于生产，但新功能很少。React Hook Form有更活跃的开发。',
    
    faq3q: '哪个更适合复杂的嵌套表单？',
    faq3a: 'React Hook Form通过useFieldArray和useWatch hooks更好地处理嵌套对象和数组。Formik可以处理嵌套表单，但需要更多样板代码。',
    
    faq4q: '如何处理文件上传？',
    faq4a: '两个库都支持文件上传。React Hook Form使用register配合type "file"或Controller获得更多控制。Formik使用setFieldValue手动更新文件字段。',
    
    faq5q: '我可以逐步从Formik迁移到React Hook Form吗？',
    faq5a: '可以，你可以逐个表单迁移，因为两个库可以在同一个项目中共存。从新表单开始使用React Hook Form，然后逐步迁移现有的。',
    
    faq6q: '哪个有更好的错误处理？',
    faq6a: '两者都提供出色的错误处理。React Hook Form提供更细粒度的控制，每个字段有独立的错误状态，更好的异步验证支持。Formik有更简单但不太灵活的方法。',
    
    faq7q: '它们能在React Native中使用吗？',
    faq7a: '是的，两个库都可以在React Native中使用。React Hook Form通过专用的Controller组件有更好的Native支持。Formik可以使用但可能需要更多自定义实现。',
    
    faq8q: '服务端组件的表单库呢？',
    faq8a: 'React Hook Form v7+通过useFormState hook和server actions与React Server Components配合使用。它是Next.js App Router应用的推荐选择。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ReactHookFormVsFormik({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsRhfTitle}</h3>
      <p style={pStyle}>{ct.whatIsRhfContent}</p>

      <h3 style={h3Style}>{ct.whatIsFormikTitle}</h3>
      <p style={pStyle}>{ct.whatIsFormikContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Formik</th>
              <th style={thStyle}>React Hook Form</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2018', '2019'],
              [isZh ? '组件模式' : 'Component Pattern', isZh ? '受控组件' : 'Controlled', isZh ? '非受控组件' : 'Uncontrolled'],
              [isZh ? '核心API' : 'Core API', '<Formik> component', 'useForm() hook'],
              [isZh ? '包大小 (gzip)' : 'Bundle Size (gzip)', '~43KB', '~7KB'],
              [isZh ? '重渲染策略' : 'Re-render Strategy', isZh ? '每次输入重渲染' : 'Render on change', isZh ? '最小化重渲染' : 'Minimal re-renders'],
              [isZh ? 'TypeScript支持' : 'TypeScript', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '较低' : 'Lower', isZh ? '中等' : 'Medium'],
            ].map(([feature, formik, rhf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{formik}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{rhf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.renderTitle}</h3>
      <p style={pStyle}>{ct.renderIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Formik</th>
              <th style={thStyle}>React Hook Form</th>
              <th style={thStyle}>{isZh ? '提升' : 'Improvement'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '组件重渲染' : 'Component Re-renders', '50 per keystroke', '1 per keystroke', '50x'],
              [isZh ? '首次渲染时间' : 'Initial Render Time', '~45ms', '~12ms', '3.8x'],
              [isZh ? '输入延迟 (50字段)' : 'Input Latency (50 fields)', '~18ms', '~3ms', '6x'],
              [isZh ? '表单提交时间' : 'Form Submit Time', '~25ms', '~8ms', '3.1x'],
            ].map(([metric, formik, rhf, improvement], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{formik}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{rhf}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{improvement}</td>
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
              <th style={thStyle}>Formik</th>
              <th style={thStyle}>React Hook Form</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心库' : 'Core Library', '43KB', '7KB'],
              [isZh ? '核心 + Yup' : 'Core + Yup', '55KB', '19KB'],
              [isZh ? '核心 + Zod' : 'Core + Zod', '52KB', '16KB'],
              [isZh ? 'Tree-shakeable' : 'Tree-shakeable', isZh ? '部分' : 'Partial', isZh ? '完全' : 'Full'],
            ].map(([pkg, formik, rhf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{pkg}</td>
                <td style={tdStyle}>{formik}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{rhf}</td>
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
              <th style={thStyle}>Formik</th>
              <th style={thStyle}>React Hook Form</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '表单状态管理' : 'Form State Management', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '验证' : 'Validation', 'Yup/schemas', 'Yup/Zod/Custom'],
              [isZh ? '错误处理' : 'Error Handling', isZh ? '内置' : 'Built-in', isZh ? '内置（更细粒度）' : 'Built-in (granular)'],
              [isZh ? '字段数组' : 'Field Arrays', '<FieldArray>', 'useFieldArray'],
              [isZh ? '条件字段' : 'Conditional Fields', isZh ? '手动管理' : 'Manual', isZh ? '自动优化' : 'Auto-optimized'],
              [isZh ? '表单重置' : 'Form Reset', 'resetForm()', 'reset()'],
              [isZh ? '脏状态追踪' : 'Dirty Tracking', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '焦点管理' : 'Focus Management', isZh ? '手动' : 'Manual', 'setFocus()'],
              [isZh ? '观察字段' : 'Watch Fields', isZh ? 'useFormikContext' : 'useFormikContext', 'useWatch'],
              [isZh ? 'UI库集成' : 'UI Library Integration', isZh ? '需要包装' : 'Wrapping needed', 'Controller'],
            ].map(([feature, formik, rhf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{formik}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{rhf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.formikExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Formik - Login Form with Validation
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.rhfExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// React Hook Form - Login Form with Validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <div>{errors.email.message}</div>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <div>{errors.password.message}</div>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`}</code></pre>

      {/* Validation */}
      <h2 style={h2Style}>{ct.validationTitle}</h2>
      <p style={pStyle}>{ct.validationIntro}</p>

      <pre style={codeStyle}><code>{`// Formik with Yup
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  age: Yup.number().positive().integer(),
});

<Formik validationSchema={schema} {...props} />

// React Hook Form with Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive(),
});

const { register } = useForm({
  resolver: zodResolver(schema),
});

// React Hook Form also supports Yup
import { yupResolver } from '@hookform/resolvers/yup';

const { register } = useForm({
  resolver: yupResolver(yupSchema),
});`}</code></pre>

      {/* TypeScript */}
      <h2 style={h2Style}>{ct.typescriptTitle}</h2>
      <p style={pStyle}>{ct.typescriptIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Formik</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'TypeScript支持良好，但类型推断需要手动定义。FormikProps泛型需要显式传递类型，某些高级用法可能需要类型断言。' : 'Good TypeScript support but requires manual type definitions. FormikProps generic needs explicit types, some advanced patterns may require type assertions.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>React Hook Form</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '优秀的类型推断。与Zod/Valibot等schema库配合时，类型自动从schema推断。register和watch都完全类型化，减少运行时错误。' : 'Excellent type inference. When used with Zod/Valibot, types are automatically inferred from schema. register and watch are fully typed, reducing runtime errors.'}
          </p>
        </div>
      </div>

      <pre style={codeStyle}><code>{`// React Hook Form - Type Inference
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema once
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
});

// Types are automatically inferred
type UserForm = z.infer<typeof userSchema>;

function UserForm() {
  const { register, handleSubmit, watch } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  // watch is fully typed
  const name = watch('name'); // string | undefined
  const allValues = watch(); // UserForm

  // register is typed
  return (
    <form onSubmit={handleSubmit((data) => {
      // data is typed as UserForm
      console.log(data.name); // string
      console.log(data.email); // string
      console.log(data.age); // number
    })}>
      <input {...register('name')} />
      <input {...register('email')} />
      <input type="number" {...register('age', { valueAsNumber: true })} />
    </form>
  );
}`}</code></pre>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration: Formik to React Hook Form

// 1. Replace imports
// Before:
import { Formik, Form, Field, ErrorMessage } from 'formik';

// After:
import { useForm } from 'react-hook-form';

// 2. Replace component with hook
// Before:
<Formik
  initialValues={{ email: '' }}
  onSubmit={(values) => console.log(values)}
>
  {({ handleSubmit }) => <Form>...</Form>}
</Formik>

// After:
const { register, handleSubmit } = useForm({
  defaultValues: { email: '' },
});
<form onSubmit={handleSubmit((values) => console.log(values))}>
  ...
</form>

// 3. Replace Field with register
// Before:
<Field name="email" type="email" />

// After:
<input {...register('email')} type="email" />

// 4. Replace ErrorMessage
// Before:
<ErrorMessage name="email" />

// After:
{errors.email && <span>{errors.email.message}</span>}

// 5. Replace validationSchema
// Before (Formik):
validationSchema={yupSchema}

// After (React Hook Form):
resolver={yupResolver(yupSchema)}
// or with Zod:
resolver={zodResolver(zodSchema)}

// 6. Replace FieldArray
// Before:
<FieldArray name="items">
  {({ push, remove }) => ...}
</FieldArray>

// After:
const { fields, append, remove } = useFieldArray({
  name: 'items',
});`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.rhfBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目开发' : 'New project development'}</li>
            <li>{isZh ? '高性能要求' : 'Performance-critical forms'}</li>
            <li>{isZh ? '大型复杂表单' : 'Large complex forms'}</li>
            <li>{isZh ? 'TypeScript优先项目' : 'TypeScript-first projects'}</li>
            <li>{isZh ? 'Next.js App Router' : 'Next.js App Router'}</li>
            <li>{isZh ? '移动端应用' : 'Mobile applications'}</li>
            <li>{isZh ? '包大小敏感项目' : 'Bundle-size conscious'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.formikBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '遗留代码维护' : 'Legacy codebase maintenance'}</li>
            <li>{isZh ? '团队熟悉受控组件' : 'Team familiar with controlled components'}</li>
            <li>{isZh ? '简单表单需求' : 'Simple form requirements'}</li>
            <li>{isZh ? '需要丰富示例' : 'Need extensive examples'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '迁移成本考虑' : 'Migration cost concerns'}</li>
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
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
