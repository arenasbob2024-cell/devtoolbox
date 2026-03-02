'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tailwind CSS vs Styled Components: CSS-in-JS Comparison',
    intro: "The debate between utility-first CSS and CSS-in-JS continues to divide the frontend community. Tailwind CSS and Styled Components represent fundamentally different approaches to styling React applications. This comprehensive comparison examines performance, developer experience, and best use cases.",
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: "Tailwind CSS offers superior performance with minimal runtime overhead and excellent purging capabilities. Styled Components provides a more component-centric approach with dynamic styling capabilities. For new projects in 2025, Tailwind is recommended for performance-critical applications, while Styled Components suits teams preferring traditional CSS-in-JS patterns.",
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: "Tailwind generates smaller production bundles with effective purging",
    takeaway2: "Styled Components has runtime overhead from style injection",
    takeaway3: "Tailwind requires learning utility classes but offers rapid development",
    takeaway4: "Styled Components enables dynamic props-based styling",
    takeaway5: "Both integrate well with modern React tooling",
    takeaway6: "Tailwind has better SSR/SSG performance characteristics",
    
    whatIsTailwindTitle: 'What is Tailwind CSS?',
    whatIsTailwindContent: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup. Instead of writing custom CSS, you compose designs using pre-existing classes like flex, pt-4, text-center, and rotate-90. Tailwind processes your files and generates only the CSS you actually use.",
    
    whatIsStyledTitle: 'What is Styled Components?',
    whatIsStyledContent: "Styled Components is a CSS-in-JS library that allows you to write actual CSS code within your JavaScript files. It leverages tagged template literals to style components, automatically handling vendor prefixes, scoping styles to components, and enabling dynamic styling based on props.",
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world performance benchmarks:',
    
    bundleTitle: 'Bundle Size Impact',
    bundleIntro: 'Production bundle analysis:',
    
    runtimeTitle: 'Runtime Performance',
    runtimeIntro: 'Client-side performance metrics:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Core styling capabilities:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Styling patterns comparison:',
    
    tailwindExampleTitle: 'Tailwind CSS',
    styledExampleTitle: 'Styled Components',
    
    themingTitle: 'Theming and Customization',
    themingIntro: 'How each handles design systems:',
    
    ssrTitle: 'SSR/SSG Support',
    ssrIntro: 'Server-side rendering considerations:',
    
    whenToUseTitle: 'When to Use Each Tool',
    tailwindBestFor: 'Use Tailwind CSS When:',
    styledBestFor: 'Use Styled Components When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: "Tailwind CSS and Styled Components represent valid approaches to styling with different trade-offs. Tailwind excels in performance, bundle size, and rapid prototyping with its utility-first approach. Styled Components offers a more traditional CSS experience with powerful dynamic styling. For most new projects in 2025, Tailwind's performance advantages and growing ecosystem make it the preferred choice, but teams already comfortable with CSS-in-JS can continue with Styled Components.",
    
    faq1q: 'Can I use Tailwind with Styled Components together?',
    faq1a: "Yes, you can use both in the same project. Some teams use Tailwind for layout and spacing utilities while using Styled Components for complex component-specific styles. However, this adds complexity and is generally not recommended unless migrating incrementally.",
    
    faq2q: 'Does Tailwind work with any React framework?',
    faq2a: "Yes, Tailwind is framework-agnostic and works with React, Vue, Angular, Svelte, and plain HTML. It integrates seamlessly with Next.js, Remix, Vite, and other modern build tools.",
    
    faq3q: 'How does Styled Components handle theming?',
    faq3a: "Styled Components has built-in theming support via a ThemeProvider. You wrap your app with the provider and access theme values in any styled component. It supports dynamic theme switching at runtime.",
    
    faq4q: 'Is Tailwind CSS harder to read?',
    faq4a: "Initially, long class strings can look cluttered. However, most developers adapt quickly. Tailwind IntelliSense in VS Code helps significantly. You can also extract components or use @apply for frequently used patterns.",
    
    faq5q: 'What about CSS-in-JS performance issues?',
    faq5a: "Styled Components has runtime overhead from injecting styles. This can cause issues at scale, particularly with SSR. Newer CSS-in-JS solutions like compiled or vanilla-extract offer zero-runtime alternatives.",
    
    faq6q: 'Does Tailwind support dark mode?',
    faq6a: "Yes, Tailwind has excellent dark mode support. Use dark: prefix (dark:bg-gray-800) and configure the strategy (class or media). It works with CSS custom properties for dynamic theming.",
    
    faq7q: 'Can Styled Components work with SSR?',
    faq7a: "Yes, Styled Components supports SSR through ServerStyleSheet. You collect styles during render and inject them into the HTML. However, it adds complexity and can impact performance compared to static CSS.",
    
    faq8q: 'Which has better TypeScript support?',
    faq8a: "Both have good TypeScript support. Styled Components allows typing theme and props. Tailwind works with TypeScript naturally since it uses className strings. Both integrate well with typed component libraries.",
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Tailwind CSS vs Styled Components：CSS-in-JS 对比',
    intro: '实用优先 CSS 和 CSS-in-JS 之间的争论继续分化着前端社区。Tailwind CSS 和 Styled Components 代表了两种根本不同的 React 应用样式方法。本文全面比较性能、开发者体验和最佳用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Tailwind CSS 提供卓越的性能，运行时开销最小，清除能力出色。Styled Components 提供更以组件为中心的方法和动态样式能力。对于 2025 年的新项目，推荐 Tailwind 用于性能关键型应用，而 Styled Components 适合喜欢传统 CSS-in-JS 模式的团队。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Tailwind 通过有效清除生成更小的生产包',
    takeaway2: 'Styled Components 因样式注入有运行时开销',
    takeaway3: 'Tailwind 需要学习实用类但开发速度快',
    takeaway4: 'Styled Components 支持基于 props 的动态样式',
    takeaway5: '两者都与现代 React 工具良好集成',
    takeaway6: 'Tailwind 有更好的 SSR/SSG 性能特征',
    
    whatIsTailwindTitle: '什么是 Tailwind CSS？',
    whatIsTailwindContent: 'Tailwind CSS 是一个实用优先的 CSS 框架，提供低级实用类来直接在标记中构建自定义设计。不用编写自定义 CSS，而是使用预存在的类（如 flex、pt-4、text-center 和 rotate-90）组合设计。Tailwind 处理你的文件并仅生成你实际使用的 CSS。',
    
    whatIsStyledTitle: '什么是 Styled Components？',
    whatIsStyledContent: 'Styled Components 是一个 CSS-in-JS 库，允许你在 JavaScript 文件中编写实际的 CSS 代码。它利用标记模板字面量为组件设置样式，自动处理供应商前缀、将样式范围限定到组件，并支持基于 props 的动态样式。',
    
    performanceTitle: '性能对比',
    performanceIntro: '真实世界的性能基准测试：',
    
    bundleTitle: '包大小影响',
    bundleIntro: '生产包分析：',
    
    runtimeTitle: '运行时性能',
    runtimeIntro: '客户端性能指标：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心样式能力：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '样式模式对比：',
    
    tailwindExampleTitle: 'Tailwind CSS',
    styledExampleTitle: 'Styled Components',
    
    themingTitle: '主题和自定义',
    themingIntro: '每个如何处理设计系统：',
    
    ssrTitle: 'SSR/SSG 支持',
    ssrIntro: '服务端渲染考虑：',
    
    whenToUseTitle: '何时使用每个工具',
    tailwindBestFor: '使用 Tailwind CSS 的场景：',
    styledBestFor: '使用 Styled Components 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Tailwind CSS 和 Styled Components 代表了有效的样式方法，各有权衡。Tailwind 在性能、包大小和快速原型设计方面表现出色，采用实用优先方法。Styled Components 提供更传统的 CSS 体验和强大的动态样式。对于 2025 年的大多数新项目，Tailwind 的性能优势和不断增长的生态系统使其成为首选，但已经熟悉 CSS-in-JS 的团队可以继续使用 Styled Components。',
    
    faq1q: '可以同时使用 Tailwind 和 Styled Components 吗？',
    faq1a: '可以，你可以在同一项目中使用两者。一些团队使用 Tailwind 处理布局和间距实用类，同时使用 Styled Components 处理复杂的组件特定样式。但这增加了复杂性，通常不建议这样做，除非是增量迁移。',
    
    faq2q: 'Tailwind 适用于任何 React 框架吗？',
    faq2a: '是的，Tailwind 与框架无关，适用于 React、Vue、Angular、Svelte 和纯 HTML。它与 Next.js、Remix、Vite 和其他现代构建工具无缝集成。',
    
    faq3q: 'Styled Components 如何处理主题？',
    faq3a: 'Styled Components 通过 ThemeProvider 内置主题支持。你用 provider 包裹应用并在任何样式组件中访问主题值。它支持运行时动态主题切换。',
    
    faq4q: 'Tailwind CSS 更难阅读吗？',
    faq4a: '最初，长类字符串可能看起来杂乱。但大多数开发者很快适应。VS Code 中的 Tailwind IntelliSense 有很大帮助。你也可以提取组件或对常用模式使用 @apply。',
    
    faq5q: 'CSS-in-JS 性能问题呢？',
    faq5a: 'Styled Components 因注入样式有运行时开销。这在规模化时可能导致问题，特别是 SSR。较新的 CSS-in-JS 解决方案如 compiled 或 vanilla-extract 提供零运行时替代方案。',
    
    faq6q: 'Tailwind 支持深色模式吗？',
    faq6a: '是的，Tailwind 有出色的深色模式支持。使用 dark: 前缀（dark:bg-gray-800）并配置策略（class 或 media）。它支持 CSS 自定义属性进行动态主题化。',
    
    faq7q: 'Styled Components 可以用于 SSR 吗？',
    faq7a: '是的，Styled Components 通过 ServerStyleSheet 支持 SSR。你在渲染期间收集样式并将它们注入 HTML。但这增加了复杂性，与静态 CSS 相比可能影响性能。',
    
    faq8q: '哪个有更好的 TypeScript 支持？',
    faq8a: '两者都有良好的 TypeScript 支持。Styled Components 允许类型化主题和 props。Tailwind 自然地与 TypeScript 配合工作，因为它使用 className 字符串。两者都与类型化组件库良好集成。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TailwindVsStyledComponents({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsTailwindTitle}</h3>
      <p style={pStyle}>{ct.whatIsTailwindContent}</p>

      <h3 style={h3Style}>{ct.whatIsStyledTitle}</h3>
      <p style={pStyle}>{ct.whatIsStyledContent}</p>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.bundleTitle}</h3>
      <p style={pStyle}>{ct.bundleIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Tailwind CSS</th>
              <th style={thStyle}>Styled Components</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '库大小 (gzip)' : 'Library Size (gzip)', '~10KB', '~12KB'],
              [isZh ? '生产 CSS (小型项目)' : 'Prod CSS (small)', '~5KB', '~8KB'],
              [isZh ? '生产 CSS (大型项目)' : 'Prod CSS (large)', '~15KB', '~40KB'],
              [isZh ? '运行时 JS 开销' : 'Runtime JS Overhead', '0', '~8KB'],
              [isZh ? '样式重复' : 'Style Deduplication', isZh ? '自动清除' : 'Auto-purged', isZh ? '类名去重' : 'Class deduped'],
            ].map(([metric, tailwind, styled], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{tailwind}</td>
                <td style={tdStyle}>{styled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.runtimeTitle}</h3>
      <p style={pStyle}>{ct.runtimeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Tailwind CSS</th>
              <th style={thStyle}>Styled Components</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '初始渲染' : 'Initial Render', '16ms', '22ms'],
              [isZh ? '样式注入时间' : 'Style Injection', '0ms', '~5ms'],
              [isZh ? '主题切换' : 'Theme Switch', '0ms', '~3ms'],
              [isZh ? '1000个组件渲染' : '1000 Components', '45ms', '78ms'],
              [isZh ? '内存使用' : 'Memory Usage', isZh ? '基线' : 'Baseline', '+15MB'],
            ].map(([metric, tailwind, styled], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{tailwind}</td>
                <td style={tdStyle}>{styled}</td>
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
              <th style={thStyle}>Tailwind CSS</th>
              <th style={thStyle}>Styled Components</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '作用域样式' : 'Scoped Styles', isZh ? '通过类名' : 'Via classes', isZh ? '自动' : 'Automatic'],
              [isZh ? '动态样式' : 'Dynamic Styles', isZh ? 'CSS 变量' : 'CSS Variables', isZh ? 'Props 驱动' : 'Props-driven'],
              [isZh ? '主题支持' : 'Theming', isZh ? '配置 + CSS 变量' : 'Config + CSS vars', 'ThemeProvider'],
              [isZh ? '响应式设计' : 'Responsive', isZh ? '内置前缀' : 'Built-in prefixes', isZh ? '手动媒体查询' : 'Manual media queries'],
              [isZh ? '深色模式' : 'Dark Mode', 'dark: 前缀', isZh ? '手动实现' : 'Manual'],
              [isZh ? '自动前缀' : 'Autoprefixing', '✓', '✓'],
              [isZh ? 'TypeScript 支持' : 'TypeScript', '✓', '✓'],
              [isZh ? 'SSR 支持' : 'SSR Support', isZh ? '原生' : 'Native', isZh ? '需配置' : 'Requires setup'],
              [isZh ? '样式复用' : 'Style Reuse', isZh ? '组件提取' : 'Component extraction', isZh ? '混合/继承' : 'Mixins/inheritance'],
              [isZh ? '零运行时' : 'Zero Runtime', '✓', '-'],
            ].map(([feature, tailwind, styled], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{tailwind}</td>
                <td style={tdStyle}>{styled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.tailwindExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Button with Tailwind CSS
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      onClick={onClick}
      className={baseClasses + ' ' + variantClasses[variant] + ' ' + sizeClasses[size]}
    >
      {children}
    </button>
  );
}

// Card Component
function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// Responsive Layout
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Logo</span>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Users" description="Manage user accounts" />
          <Card title="Settings" description="Configure your preferences" />
          <Card title="Reports" description="View analytics and reports" />
        </div>
      </main>
    </div>
  );
}

// Dark mode support
function DarkModeExample() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#db7093' }}>{ct.styledExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Button with Styled Components
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const getSizeStyles = (size: string) => {
  const sizes = {
    sm: css\`
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    \`,
    md: css\`
      padding: 0.5rem 1rem;
      font-size: 1rem;
    \`,
    lg: css\`
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    \`,
  };
  return sizes[size as keyof typeof sizes];
};

const StyledButton = styled.button<ButtonProps>\`
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  
  \${props => props.variant === 'primary' && css\`
    background-color: #2563eb;
    color: white;
    &:hover {
      background-color: #1d4ed8;
    }
    &:focus {
      ring: 2px;
      ring-color: #3b82f6;
    }
  \`}
  
  \${props => props.variant === 'secondary' && css\`
    background-color: #e5e7eb;
    color: #111827;
    &:hover {
      background-color: #d1d5db;
    }
  \`}
  
  \${props => getSizeStyles(props.size || 'md')}
\`;

function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
}

// Card with dynamic theming
const CardContainer = styled.div\`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
\`;

const CardTitle = styled.h3\`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
\`;

const CardDescription = styled.p\`
  color: #4b5563;
  line-height: 1.6;
\`;

function Card({ title, description }: { title: string; description: string }) {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardContainer>
  );
}

// Theming
const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    background: '#ffffff',
    text: '#111827',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
};

// Usage with ThemeProvider
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}`}</code></pre>

      {/* Theming */}
      <h2 style={h2Style}>{ct.themingTitle}</h2>
      <p style={pStyle}>{ct.themingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>Tailwind CSS</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '通过 tailwind.config.js 配置主题。使用 CSS 变量实现动态主题切换。dark: 前缀内置支持深色模式。设计令牌与 Tailwind 类直接集成。' : 'Configure themes through tailwind.config.js. Use CSS variables for dynamic theme switching. dark: prefix provides built-in dark mode. Design tokens integrate directly with Tailwind classes.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #db7093' }}>
          <strong style={{ color: '#db7093' }}>Styled Components</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'ThemeProvider 包裹应用提供主题。通过 props.theme 访问主题值。支持运行时动态主题切换。主题完全在 JavaScript 中定义。' : 'ThemeProvider wraps app with theme. Access theme values via props.theme. Supports runtime dynamic theme switching. Themes defined entirely in JavaScript.'}
          </p>
        </div>
      </div>

      {/* SSR */}
      <h2 style={h2Style}>{ct.ssrTitle}</h2>
      <p style={pStyle}>{ct.ssrIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Tailwind CSS</th>
              <th style={thStyle}>Styled Components</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Next.js', '✓ Native', '✓ with config'],
              ['Remix', '✓ Native', '✓ with config'],
              ['Gatsby', '✓ Native', '✓ Plugin'],
              ['Vite SSR', '✓ Native', '✓ Manual setup'],
              [isZh ? '流式 SSR' : 'Streaming SSR', '✓', isZh ? '复杂' : 'Complex'],
              [isZh ? '样式闪烁' : 'Flash of Unstyled', '-', isZh ? '需处理' : 'Needs handling'],
            ].map(([platform, tailwind, styled], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{tailwind}</td>
                <td style={tdStyle}>{styled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.tailwindBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '性能关键应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? 'SSR/SSG 项目' : 'SSR/SSG projects'}</li>
            <li>{isZh ? '小包大小需求' : 'Small bundle size requirements'}</li>
            <li>{isZh ? '设计系统实现' : 'Design system implementation'}</li>
            <li>{isZh ? '团队协作标准化' : 'Team standardization'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #db7093' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#db7093' }}>{ct.styledBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '动态样式需求' : 'Dynamic styling needs'}</li>
            <li>{isZh ? '基于 props 的主题' : 'Props-based theming'}</li>
            <li>{isZh ? 'CSS-in-JS 团队偏好' : 'Team prefers CSS-in-JS'}</li>
            <li>{isZh ? '组件封装优先' : 'Component encapsulation priority'}</li>
            <li>{isZh ? '遗留项目迁移' : 'Legacy project migration'}</li>
            <li>{isZh ? '复杂样式逻辑' : 'Complex style logic'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/css-minifier'} style={{ color: '#3b82f6', textDecoration: 'none' }}>CSS Minifier</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a>
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
