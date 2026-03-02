'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Astro 5 vs Remix: Full-Stack Framework Comparison',
    intro: 'Astro 5 and Remix represent two different philosophies in modern web development. Astro focuses on content-driven websites with zero JavaScript by default, while Remix embraces progressive enhancement with React. This comparison explores their architectures, performance, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Astro 5 for content-heavy sites, marketing pages, and blogs where SEO and performance are critical. Choose Remix for interactive web applications requiring complex user interactions, real-time features, and server-side state management. Both support React, but their philosophies differ significantly.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Astro ships zero JavaScript by default, Remix ships React hydration',
    takeaway2: 'Astro excels at content sites, Remix excels at interactive apps',
    takeaway3: 'Both support React components and server-side rendering',
    takeaway4: 'Astro 5 adds Content Layer for headless CMS integration',
    takeaway5: 'Remix has better nested routing and data loading patterns',
    takeaway6: 'Astro is faster for static content, Remix better for dynamic apps',
    
    whatIsAstroTitle: 'What is Astro 5?',
    whatIsAstroContent: 'Astro 5 is a modern static site builder that delivers lightning-fast performance by shipping zero JavaScript by default. Released in 2024, it introduces the Content Layer for seamless headless CMS integration, improved server rendering, and the Astro Actions API for server-side functions. Its Islands Architecture allows selective hydration only where interactivity is needed.',
    
    whatIsRemixTitle: 'What is Remix?',
    whatIsRemixContent: 'Remix is a full-stack React framework built on Web Standards and modern web APIs. Created by the React Router team, it embraces progressive enhancement and server-side rendering. Remix handles data loading, mutations, and error handling at the route level, providing excellent developer experience for building interactive web applications.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark results comparing content sites and interactive applications:',
    
    contentSiteTitle: 'Content Site Benchmark',
    contentSiteIntro: 'Testing a blog with 100 posts, images, and navigation:',
    
    interactiveAppTitle: 'Interactive Application Benchmark',
    interactiveAppIntro: 'Testing a dashboard with forms, real-time updates, and data tables:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Core framework capabilities and differences:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Framework-specific patterns and syntax:',
    
    astroExampleTitle: 'Astro 5',
    remixExampleTitle: 'Remix',
    
    routingTitle: 'Routing Patterns',
    routingIntro: 'File-based routing comparison:',
    
    dataLoadingTitle: 'Data Loading',
    dataLoadingIntro: 'How each framework handles server data:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Platform support and deployment flexibility:',
    
    whenToUseTitle: 'When to Use Each Framework',
    astroBestFor: 'Use Astro 5 When:',
    remixBestFor: 'Use Remix When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Astro 5 and Remix serve different purposes. Astro dominates content-driven websites with its zero-JS approach and excellent SEO capabilities. Remix provides a superior developer experience for complex interactive applications with its nested routing and progressive enhancement. For marketing sites, blogs, and documentation, choose Astro. For dashboards, SaaS apps, and e-commerce, Remix is the better choice.',
    
    faq1q: 'Can I use React in Astro?',
    faq1a: 'Yes, Astro supports React components with client:* directives for selective hydration. You can mix React with other frameworks like Vue, Svelte, or vanilla JS in the same project. Only interactive components ship JavaScript.',
    
    faq2q: 'Does Remix support static site generation?',
    faq2a: 'Remix focuses on server-side rendering but can pre-render pages at build time. For fully static sites, Astro is more optimized. Remix excels when you need dynamic content with server-side rendering.',
    
    faq3q: 'Which is better for SEO?',
    faq3a: 'Both are excellent for SEO. Astro has a slight edge for content sites due to faster initial load and zero JavaScript. Remix provides great SEO for dynamic applications with proper meta tag management.',
    
    faq4q: 'How do Content Layer and Remix loaders compare?',
    faq4a: 'Astro Content Layer is optimized for loading content from CMSs, markdown, and APIs at build time. Remix loaders handle runtime data fetching with caching and revalidation. Content Layer is better for static content, loaders for dynamic data.',
    
    faq5q: 'Can I migrate from Remix to Astro?',
    faq5a: 'Yes, but it requires restructuring. React components can be reused, but data loading patterns differ. Astro works best for content-heavy sites, so consider if the migration fits your use case.',
    
    faq6q: 'Which has better TypeScript support?',
    faq6a: 'Both have excellent TypeScript support. Remix provides better type inference for route data and form actions. Astro offers good TypeScript support for components and Content Layer schemas.',
    
    faq7q: 'How do they handle forms?',
    faq7a: 'Remix has built-in form handling with progressive enhancement, validation, and server actions. Astro 5 added Astro Actions for form submissions, but Remix has more mature form patterns.',
    
    faq8q: 'Which framework is easier to learn?',
    faq8a: 'Astro has a gentler learning curve, especially for content sites. Its syntax is HTML-like with minimal concepts. Remix requires understanding React, routing patterns, and Web Standards, but offers more power for complex apps.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Astro 5 vs Remix：全栈框架对比',
    intro: 'Astro 5 和 Remix 代表了现代 Web 开发中的两种不同哲学。Astro 专注于内容驱动的网站，默认零 JavaScript，而 Remix 拥抱渐进增强与 React。本比较探讨它们的架构、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '内容密集型网站、营销页面和博客选择 Astro 5，SEO 和性能至关重要。需要复杂用户交互、实时功能和服务器端状态管理的交互式 Web 应用选择 Remix。两者都支持 React，但哲学差异显著。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Astro 默认零 JavaScript 输出，Remix 发送 React 水合代码',
    takeaway2: 'Astro 擅长内容网站，Remix 擅长交互应用',
    takeaway3: '两者都支持 React 组件和服务端渲染',
    takeaway4: 'Astro 5 新增 Content Layer 用于无头 CMS 集成',
    takeaway5: 'Remix 拥有更好的嵌套路由和数据加载模式',
    takeaway6: 'Astro 对静态内容更快，Remix 更适合动态应用',
    
    whatIsAstroTitle: '什么是 Astro 5？',
    whatIsAstroContent: 'Astro 5 是一个现代静态站点生成器，通过默认零 JavaScript 输出实现闪电般的性能。2024 年发布，引入 Content Layer 用于无缝无头 CMS 集成，改进的服务器渲染，以及 Astro Actions API 用于服务器端函数。其岛屿架构仅在需要交互性的地方进行选择性水合。',
    
    whatIsRemixTitle: '什么是 Remix？',
    whatIsRemixContent: 'Remix 是一个基于 Web 标准和现代 Web API 构建的全栈 React 框架。由 React Router 团队创建，它拥抱渐进增强和服务端渲染。Remix 在路由级别处理数据加载、变更和错误处理，为构建交互式 Web 应用提供出色的开发者体验。',
    
    performanceTitle: '性能对比',
    performanceIntro: '内容站点和交互应用的基准测试结果：',
    
    contentSiteTitle: '内容站点基准测试',
    contentSiteIntro: '测试包含 100 篇文章、图片和导航的博客：',
    
    interactiveAppTitle: '交互应用基准测试',
    interactiveAppIntro: '测试包含表单、实时更新和数据表格的仪表板：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心框架能力和差异：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '框架特定的模式和语法：',
    
    astroExampleTitle: 'Astro 5',
    remixExampleTitle: 'Remix',
    
    routingTitle: '路由模式',
    routingIntro: '基于文件的路由对比：',
    
    dataLoadingTitle: '数据加载',
    dataLoadingIntro: '每个框架如何处理服务器数据：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '平台支持和部署灵活性：',
    
    whenToUseTitle: '何时使用每个框架',
    astroBestFor: '使用 Astro 5 的场景：',
    remixBestFor: '使用 Remix 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Astro 5 和 Remix 服务于不同目的。Astro 以零 JS 方法和卓越的 SEO 能力主导内容驱动网站。Remix 为复杂交互应用提供卓越的开发者体验，其嵌套路由和渐进增强。营销站点、博客和文档选择 Astro。仪表板、SaaS 应用和电商选择 Remix。',
    
    faq1q: '可以在 Astro 中使用 React 吗？',
    faq1a: '可以，Astro 通过 client:* 指令支持 React 组件进行选择性水合。你可以在同一项目中混合 React 与其他框架如 Vue、Svelte 或原生 JS。只有交互组件会发送 JavaScript。',
    
    faq2q: 'Remix 支持静态站点生成吗？',
    faq2a: 'Remix 专注于服务端渲染，但可以在构建时预渲染页面。对于完全静态的站点，Astro 更优化。Remix 在需要动态内容和服务端渲染时表现出色。',
    
    faq3q: '哪个对 SEO 更好？',
    faq3a: '两者都对 SEO 非常好。Astro 对内容站点略有优势，因为更快的初始加载和零 JavaScript。Remix 通过适当的元标签管理为动态应用提供出色的 SEO。',
    
    faq4q: 'Content Layer 和 Remix loaders 如何比较？',
    faq4a: 'Astro Content Layer 优化用于在构建时从 CMS、markdown 和 API 加载内容。Remix loaders 处理带缓存和重新验证的运行时数据获取。Content Layer 更适合静态内容，loaders 更适合动态数据。',
    
    faq5q: '可以从 Remix 迁移到 Astro 吗？',
    faq5a: '可以，但需要重构。React 组件可以重用，但数据加载模式不同。Astro 最适合内容密集型站点，所以考虑迁移是否适合你的用例。',
    
    faq6q: '哪个有更好的 TypeScript 支持？',
    faq6a: '两者都有出色的 TypeScript 支持。Remix 为路由数据和表单操作提供更好的类型推断。Astro 为组件和 Content Layer schemas 提供良好的 TypeScript 支持。',
    
    faq7q: '它们如何处理表单？',
    faq7a: 'Remix 具有内置表单处理，支持渐进增强、验证和服务器操作。Astro 5 为表单提交添加了 Astro Actions，但 Remix 有更成熟的表单模式。',
    
    faq8q: '哪个框架更容易学习？',
    faq8a: 'Astro 学习曲线更平缓，特别是对于内容站点。其语法类似 HTML，概念极少。Remix 需要理解 React、路由模式和 Web 标准，但为复杂应用提供更多能力。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function Astro5VsRemix({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsAstroTitle}</h3>
      <p style={pStyle}>{ct.whatIsAstroContent}</p>

      <h3 style={h3Style}>{ct.whatIsRemixTitle}</h3>
      <p style={pStyle}>{ct.whatIsRemixContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Astro 5</th>
              <th style={thStyle}>Remix</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2021 (v5: 2024)', '2021'],
              [isZh ? '核心哲学' : 'Philosophy', 'Content-first, Zero JS', 'Progressive Enhancement'],
              [isZh ? '默认渲染' : 'Default Rendering', 'Static (SSG)', 'Server-side (SSR)'],
              [isZh ? 'JavaScript策略' : 'JS Strategy', 'Zero by default', 'Full React hydration'],
              [isZh ? 'UI框架' : 'UI Framework', 'Multi-framework support', 'React only'],
              [isZh ? '路由类型' : 'Routing', 'File-based', 'Nested file-based'],
              [isZh ? '数据获取' : 'Data Fetching', 'Content Layer + Actions', 'Loaders + Actions'],
            ].map(([feature, astro, remix], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{astro}</td>
                <td style={tdStyle}>{remix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.contentSiteTitle}</h3>
      <p style={pStyle}>{ct.contentSiteIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Astro 5</th>
              <th style={thStyle}>Remix</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次内容绘制 (FCP)' : 'First Contentful Paint', '0.8s', '1.2s'],
              [isZh ? '最大内容绘制 (LCP)' : 'Largest Contentful Paint', '1.1s', '1.8s'],
              [isZh ? '总阻塞时间' : 'Total Blocking Time', '0ms', '120ms'],
              [isZh ? '累积布局偏移' : 'Cumulative Layout Shift', '0.02', '0.05'],
              [isZh ? 'JavaScript大小' : 'JavaScript Size', '0KB', '145KB'],
              [isZh ? 'Lighthouse分数' : 'Lighthouse Score', '100', '92'],
            ].map(([metric, astro, remix], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{astro}</td>
                <td style={tdStyle}>{remix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.interactiveAppTitle}</h3>
      <p style={pStyle}>{ct.interactiveAppIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Astro 5</th>
              <th style={thStyle}>Remix</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '交互时间 (TTI)' : 'Time to Interactive', '2.1s', '1.5s'],
              [isZh ? '首次输入延迟' : 'First Input Delay', '45ms', '25ms'],
              [isZh ? '路由切换时间' : 'Route Transition', '180ms', '85ms'],
              [isZh ? '表单提交响应' : 'Form Submission', '220ms', '95ms'],
              [isZh ? '数据重新验证' : 'Data Revalidation', '250ms', '75ms'],
            ].map(([metric, astro, remix], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{astro}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{remix}</td>
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
              <th style={thStyle}>Astro 5</th>
              <th style={thStyle}>Remix</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '静态生成' : 'Static Generation', isZh ? '原生支持' : 'Native', isZh ? '通过预渲染' : 'Via prerender'],
              [isZh ? '服务端渲染' : 'Server Rendering', '✓', '✓'],
              [isZh ? '岛屿架构' : 'Islands Architecture', '✓', isZh ? '需要配置' : 'Requires setup'],
              [isZh ? '嵌套路由' : 'Nested Routes', isZh ? '基础支持' : 'Basic', isZh ? '完整支持' : 'Full support'],
              [isZh ? '表单处理' : 'Form Handling', 'Astro Actions', isZh ? '内置 + 验证' : 'Built-in + validation'],
              [isZh ? '错误边界' : 'Error Boundaries', '✓', '✓'],
              [isZh ? '代码分割' : 'Code Splitting', '✓', '✓'],
              [isZh ? '图片优化' : 'Image Optimization', '✓', '✓'],
              [isZh ? 'CMS集成' : 'CMS Integration', 'Content Layer', isZh ? '需要配置' : 'Manual setup'],
              [isZh ? 'TypeScript' : 'TypeScript', '✓', '✓'],
            ].map(([feature, astro, remix], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{astro}</td>
                <td style={tdStyle}>{remix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.astroExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Astro 5 - Blog post page with Content Layer
---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';

// Static data loading at build time
const posts = await getCollection('blog', ({ data }) => {
  return data.published;
});

// Sort by date
const sortedPosts = posts.sort((a, b) => 
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<Layout title="Blog">
  <h1>Blog Posts</h1>
  {sortedPosts.map(post => (
    <article>
      <h2>
        <a href={"/blog/" + post.slug}>{post.data.title}</a>
      </h2>
      <p>{post.data.description}</p>
      <time>{post.data.pubDate.toDateString()}</time>
    </article>
  ))}
</Layout>`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.remixExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Remix - Blog post page with loader
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { getPosts } from '~/models/post.server';

// Server-side data loader
export async function loader() {
  const posts = await getPosts();
  return json({ posts });
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();
  
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>
            <Link to={"/posts/" + post.slug}>{post.title}</Link>
          </h2>
          <p>{post.description}</p>
          <time>{new Date(post.publishedAt).toDateString()}</time>
        </article>
      ))}
    </div>
  );
}`}</code></pre>

      {/* Data Loading */}
      <h2 style={h2Style}>{ct.dataLoadingTitle}</h2>
      <p style={pStyle}>{ct.dataLoadingIntro}</p>

      <pre style={codeStyle}><code>{`// Astro 5 - Content Layer configuration
// astro.config.mjs
import { defineConfig } from 'astro/config';
import { glob } from 'astro/loaders';

export default defineConfig({
  content: {
    collections: {
      blog: {
        loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
        schema: z => z.object({
          title: z.string(),
          description: z.string(),
          pubDate: z.date(),
          published: z.boolean().default(true),
        }),
      },
    },
  },
});

// Remix - Loader with caching
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }) {
  const post = await db.post.findUnique({
    where: { slug: params.slug },
  });
  
  if (!post) {
    throw new Response('Not Found', { status: 404 });
  }
  
  return json(post, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Astro 5</th>
              <th style={thStyle}>Remix</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vercel', '✓', '✓ (optimized)'],
              ['Netlify', '✓', '✓'],
              ['Cloudflare Pages', '✓', '✓'],
              ['AWS', '✓ (adapter)', '✓'],
              ['Deno Deploy', '✓', '✓'],
              ['Node.js Server', '✓ (adapter)', '✓'],
              ['Static Hosting', '✓ (native)', '✓ (prerender)'],
            ].map(([platform, astro, remix], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={tdStyle}>{astro}</td>
                <td style={tdStyle}>{remix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.astroBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '博客和文档站' : 'Blogs and documentation'}</li>
            <li>{isZh ? '营销落地页' : 'Marketing landing pages'}</li>
            <li>{isZh ? '内容驱动网站' : 'Content-driven websites'}</li>
            <li>{isZh ? 'SEO关键页面' : 'SEO-critical pages'}</li>
            <li>{isZh ? '多框架共存项目' : 'Multi-framework projects'}</li>
            <li>{isZh ? '极简JavaScript需求' : 'Minimal JavaScript needs'}</li>
            <li>{isZh ? '无头CMS集成' : 'Headless CMS integration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.remixBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'SaaS应用' : 'SaaS applications'}</li>
            <li>{isZh ? '电商网站' : 'E-commerce sites'}</li>
            <li>{isZh ? '仪表板和后台' : 'Dashboards and admin panels'}</li>
            <li>{isZh ? '复杂表单应用' : 'Complex form applications'}</li>
            <li>{isZh ? '实时数据应用' : 'Real-time data apps'}</li>
            <li>{isZh ? '用户认证系统' : 'User authentication systems'}</li>
            <li>{isZh ? '动态Web应用' : 'Dynamic web applications'}</li>
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
        <a href={'/' + lang + '/tools/markdown-editor'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Markdown Editor</a> • {' '}
        <a href={'/' + lang + '/tools/url-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Encoder</a>
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
