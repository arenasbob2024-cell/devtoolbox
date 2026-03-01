'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Fresh vs Astro: Deno\'s Islands Architecture vs Modern Static Sites',
    intro: 'Fresh (Deno\'s framework) and Astro represent two innovative approaches to modern web development. Fresh brings islands architecture to Deno with zero-config TypeScript, while Astro pioneered content-focused static sites. This comparison helps you choose the right framework for your 2025 projects.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Fresh offers real-time SSR with islands architecture on Deno, perfect for dynamic apps needing edge deployment. Astro excels at content-heavy sites with partial hydration and multiple framework support. Choose Fresh for Deno projects and real-time features; choose Astro for blogs, docs, and marketing sites.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Fresh uses islands architecture with Preact by default - no client-side JavaScript by default',
    takeaway2: 'Astro supports React, Vue, Svelte, and more with zero JS unless interactive',
    takeaway3: 'Fresh runs exclusively on Deno with edge-first design',
    takeaway4: 'Astro offers better static site generation and content collections',
    takeaway5: 'Both prioritize performance with minimal JavaScript to client',
    takeaway6: 'Fresh is ideal for apps; Astro is ideal for content sites',
    
    whatIsFreshTitle: 'What is Fresh?',
    whatIsFreshContent: 'Fresh is Deno\'s next-generation web framework created in 2022. It features islands architecture for automatic partial hydration, file-system routing, and zero-configuration TypeScript. Built on Preact by default, Fresh ships zero JavaScript to the client unless interactivity is needed via islands.',
    
    whatIsAstroTitle: 'What is Astro?',
    whatIsAstroContent: 'Astro, launched in 2021, is a modern static site builder that pioneered the islands architecture concept. It allows using any UI framework (React, Vue, Svelte, etc.) while shipping zero JavaScript by default. Astro excels at content-focused sites with its powerful content collections and partial hydration.',
    
    performanceTitle: 'Performance & Bundle Size',
    performanceIntro: 'Performance benchmarks and bundle size comparison:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comprehensive feature comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'See how both frameworks structure applications:',
    
    freshExample: 'Fresh (Deno)',
    astroExample: 'Astro',
    
    islandsTitle: 'Islands Architecture',
    islandsIntro: 'How each framework handles interactive components:',
    
    deploymentTitle: 'Deployment & Ecosystem',
    deploymentIntro: 'Deployment options and ecosystem support:',
    
    whenToUseTitle: 'When to Use Each',
    freshBestFor: 'Use Fresh When:',
    astroBestFor: 'Use Astro When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Fresh and Astro serve different needs in 2025. Fresh is ideal for Deno-first projects requiring real-time SSR and edge deployment. It\'s perfect for dynamic applications with selective interactivity. Astro dominates for content-heavy sites, blogs, and documentation where multiple framework support and static generation shine. Both represent the future of performance-first web development with minimal JavaScript payloads.',
    
    faq1q: 'Can I use React with Fresh?',
    faq1a: 'Fresh uses Preact by default, but you can use React with @preact/preset-react-compat or use the React Preact compatibility layer. However, you lose some of Fresh\'s optimizations. For React-first projects, consider Astro or Next.js.',
    
    faq2q: 'Does Astro support SSR?',
    faq2a: 'Yes! Astro now supports SSR with adapters for Node.js, Deno, Bun, Vercel, Netlify, and Cloudflare. You can choose static generation, SSR, or hybrid mode. SSR in Astro is mature and production-ready.',
    
    faq3q: 'Which is faster - Fresh or Astro?',
    faq3a: 'Both are extremely fast. Fresh has an edge in SSR performance due to Deno\'s runtime. Astro excels in static site generation with near-zero JavaScript. For Lighthouse scores, both easily achieve 100/100 when used correctly.',
    
    faq4q: 'Can I deploy Fresh to Vercel or Netlify?',
    faq4a: 'Fresh is optimized for Deno Deploy. While you can run it elsewhere with Deno runtime, you lose edge optimizations. For Vercel/Netlify, Astro or Next.js might be better choices. Deno Deploy offers free tier with excellent performance.',
    
    faq5q: 'Does Fresh have good TypeScript support?',
    faq5a: 'Fresh has first-class TypeScript support - it\'s actually the default. Deno\'s built-in TypeScript support means zero configuration. Type checking, autocompletion, and type safety work out of the box.',
    
    faq6q: 'Can I use multiple frameworks in Astro?',
    faq6a: 'Yes! Astro\'s main selling point is framework agnosticism. You can use React, Vue, Svelte, Solid, Preact, and even mix them in the same project. Each component can use a different framework.',
    
    faq7q: 'Which is better for blogging?',
    faq7a: 'Astro is superior for blogging and content sites. Its content collections, Markdown support, and static generation are purpose-built for content. Fresh can handle blogs but requires more setup and is better suited for dynamic applications.',
    
    faq8q: 'What about learning curve?',
    faq8a: 'Fresh has a moderate learning curve if you know Preact. Astro is easier if you\'re familiar with any UI framework. Astro\'s documentation is more comprehensive. Both are simpler than Next.js for their respective use cases.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Fresh vs Astro：Deno的岛屿架构 vs 现代静态站点',
    intro: 'Fresh（Deno的框架）和Astro代表了现代Web开发的两种创新方法。Fresh为Deno带来了岛屿架构和零配置TypeScript，而Astro开创了以内容为中心的静态站点。本比较帮助你为2025年的项目选择合适的框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Fresh在Deno上提供实时SSR和岛屿架构，非常适合需要边缘部署的动态应用。Astro在内容丰富的站点方面表现出色，支持部分水合和多框架支持。Deno项目和实时功能选择Fresh；博客、文档和营销站点选择Astro。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Fresh默认使用岛屿架构和Preact - 默认不发送客户端JavaScript',
    takeaway2: 'Astro支持React、Vue、Svelte等，除非交互否则零JS',
    takeaway3: 'Fresh仅在Deno上运行，具有边缘优先设计',
    takeaway4: 'Astro提供更好的静态站点生成和内容集合',
    takeaway5: '两者都优先考虑性能，向客户端发送最少的JavaScript',
    takeaway6: 'Fresh适合应用；Astro适合内容站点',
    
    whatIsFreshTitle: '什么是Fresh？',
    whatIsFreshContent: 'Fresh是Deno的下一代Web框架，于2022年创建。它具有岛屿架构用于自动部分水合、文件系统路由和零配置TypeScript。默认基于Preact构建，除非通过islands需要交互性，否则Fresh不会向客户端发送任何JavaScript。',
    
    whatIsAstroTitle: '什么是Astro？',
    whatIsAstroContent: 'Astro于2021年推出，是一个开创了岛屿架构概念的现代静态站点构建器。它允许使用任何UI框架（React、Vue、Svelte等），同时默认发送零JavaScript。Astro以其强大的内容集合和部分水合在以内容为中心的站点方面表现出色。',
    
    performanceTitle: '性能与包大小',
    performanceIntro: '性能基准测试和包大小对比：',
    
    featuresTitle: '功能对比',
    featuresIntro: '全面的功能比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '看看两个框架如何构建应用：',
    
    freshExample: 'Fresh (Deno)',
    astroExample: 'Astro',
    
    islandsTitle: '岛屿架构',
    islandsIntro: '每个框架如何处理交互组件：',
    
    deploymentTitle: '部署与生态系统',
    deploymentIntro: '部署选项和生态系统支持：',
    
    whenToUseTitle: '何时使用每种方案',
    freshBestFor: '使用Fresh的场景：',
    astroBestFor: '使用Astro的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Fresh和Astro在2025年服务于不同的需求。Fresh非常适合需要实时SSR和边缘部署的Deno优先项目。它非常适合具有选择性交互性的动态应用。Astro在内容丰富的站点、博客和文档方面占主导地位，多框架支持和静态生成表现出色。两者都代表了性能优先、最小JavaScript负载的Web开发的未来。',
    
    faq1q: '我可以在Fresh中使用React吗？',
    faq1a: 'Fresh默认使用Preact，但你可以通过@preact/preset-react-compat使用React或使用React Preact兼容层。但是，你会失去Fresh的一些优化。对于React优先的项目，考虑Astro或Next.js。',
    
    faq2q: 'Astro支持SSR吗？',
    faq2a: '支持！Astro现在通过适配器支持SSR，支持Node.js、Deno、Bun、Vercel、Netlify和Cloudflare。你可以选择静态生成、SSR或混合模式。Astro的SSR已经成熟且可以用于生产。',
    
    faq3q: '哪个更快 - Fresh还是Astro？',
    faq3a: '两者都非常快。Fresh在SSR性能方面有优势，因为Deno的运行时。Astro在静态站点生成方面表现出色，几乎零JavaScript。对于Lighthouse分数，正确使用时两者都可以轻松达到100/100。',
    
    faq4q: '我可以将Fresh部署到Vercel或Netlify吗？',
    faq4a: 'Fresh为Deno Deploy优化。虽然你可以在其他地方使用Deno运行时运行它，但你会失去边缘优化。对于Vercel/Netlify，Astro或Next.js可能是更好的选择。Deno Deploy提供免费层，性能出色。',
    
    faq5q: 'Fresh的TypeScript支持好吗？',
    faq5a: 'Fresh有一流的TypeScript支持 - 实际上是默认的。Deno的内置TypeScript支持意味着零配置。类型检查、自动补全和类型安全开箱即用。',
    
    faq6q: '我可以在Astro中使用多个框架吗？',
    faq6a: '可以！Astro的主要卖点是框架无关性。你可以使用React、Vue、Svelte、Solid、Preact，甚至在同一个项目中混合使用。每个组件可以使用不同的框架。',
    
    faq7q: '哪个更适合博客？',
    faq7a: 'Astro更适合博客和内容站点。它的内容集合、Markdown支持和静态生成是专为内容构建的。Fresh可以处理博客，但需要更多设置，更适合动态应用。',
    
    faq8q: '学习曲线如何？',
    faq8a: '如果你了解Preact，Fresh有中等的学习曲线。如果你熟悉任何UI框架，Astro更容易。Astro的文档更全面。对于各自的用例，两者都比Next.js简单。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function FreshVSAstro({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsFreshTitle}</h3>
      <p style={pStyle}>{ct.whatIsFreshContent}</p>

      <h3 style={h3Style}>{ct.whatIsAstroTitle}</h3>
      <p style={pStyle}>{ct.whatIsAstroContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Fresh</th>
              <th style={thStyle}>Astro</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2022', '2021'],
              [isZh ? '运行时' : 'Runtime', 'Deno only', 'Node.js, Deno, Bun'],
              [isZh ? '默认UI框架' : 'Default UI Framework', 'Preact', 'None (bring your own)'],
              [isZh ? '支持框架' : 'Framework Support', 'Preact (React compat)', 'React, Vue, Svelte, etc.'],
              [isZh ? '渲染模式' : 'Rendering Mode', 'SSR + Islands', 'SSG/SSR + Islands'],
              [isZh ? '路由' : 'Routing', 'File-based', 'File-based'],
              [isZh ? 'TypeScript' : 'TypeScript', 'Zero-config', 'Zero-config'],
              [isZh ? '包管理器' : 'Package Manager', 'Deno (no package.json)', 'npm/pnpm/yarn'],
            ].map(([feature, fresh, astro], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#fbbf24' }}>{fresh}</td>
                <td style={tdStyle}>{astro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Fresh</th>
              <th style={thStyle}>Astro</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次加载JS (基础)' : 'First Load JS (basic)', '0KB', '0KB'],
              [isZh ? '首次加载JS (带island)' : 'First Load JS (with island)', '~5KB', '~5KB'],
              [isZh ? 'TTFB (SSR)' : 'TTFB (SSR)', '~50ms', '~100ms'],
              [isZh ? '构建时间' : 'Build Time', 'No build step', '~2-5s'],
              [isZh ? 'Lighthouse (优化后)' : 'Lighthouse (optimized)', '100/100', '100/100'],
              [isZh ? '边缘部署' : 'Edge Deployment', 'Native (Deno Deploy)', 'Via adapters'],
            ].map(([metric, fresh, astro], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{fresh}</td>
                <td style={tdStyle}>{astro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#fbbf24' }}>{ct.freshExample}</h3>
      <pre style={codeStyle}><code>{`// Fresh - File Structure
// routes/index.tsx - Main page (SSR by default)
import { Head } from '$fresh/runtime.ts';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-gray-900">
        <h1>Welcome to Fresh</h1>
        <Counter /> {/* Interactive island */}
      </div>
    </>
  );
}

// islands/Counter.tsx - Interactive component
import { useState } from 'preact/hooks';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// routes/api/users.ts - API route
import { Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  async GET() {
    const users = await db.users.findMany();
    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

// routes/users/[id].tsx - Dynamic route
import { Handlers, PageProps } from '$fresh/server.ts';

interface User {
  id: string;
  name: string;
}

export const handler: Handlers<User> = {
  async GET(_req, ctx) {
    const user = await db.users.find(ctx.params.id);
    if (!user) return ctx.renderNotFound();
    return ctx.render(user);
  },
};

export default function UserPage({ data }: PageProps<User>) {
  return <div>User: {data.name}</div>;
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ff5d01' }}>{ct.astroExample}</h3>
      <pre style={codeStyle}><code>{`// Astro - File Structure
// src/pages/index.astro - Main page
---
import Layout from '../layouts/Layout.astro';
import Counter from '../components/Counter.jsx';
---

<Layout title="Astro App">
  <h1>Welcome to Astro</h1>
  <Counter client:load /> {/* Interactive island */}
</Layout>

// src/components/Counter.jsx - React component
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// src/pages/api/users.ts - API endpoint
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const users = await db.users.findMany();
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
};

// src/pages/users/[id].astro - Dynamic route
---
import Layout from '../../layouts/Layout.astro';

const { id } = Astro.params;
const user = await db.users.find(id);

if (!user) return Astro.redirect('/404');
---

<Layout title={user.name}>
  <h1>User: {user.name}</h1>
</Layout>

// src/content/config.ts - Content Collections
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
  }),
});

export const collections = { blog };`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Fresh</th>
              <th style={thStyle}>Astro</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '岛屿架构' : 'Islands Architecture', '✓', '✓'],
              [isZh ? '零JS默认' : 'Zero JS by Default', '✓', '✓'],
              [isZh ? '文件路由' : 'File-based Routing', '✓', '✓'],
              [isZh ? 'SSR' : 'SSR', '✓ Always', '✓ Optional'],
              [isZh ? 'SSG' : 'SSG', '✗', '✓ Primary'],
              [isZh ? '多框架支持' : 'Multi-framework', '✗', '✓'],
              [isZh ? '内容集合' : 'Content Collections', '✗', '✓'],
              [isZh ? 'MDX支持' : 'MDX Support', '✗', '✓'],
              [isZh ? '边缘部署' : 'Edge Deployment', '✓ Native', '✓ Via adapter'],
              [isZh ? '构建步骤' : 'Build Step', 'None', 'Yes'],
              [isZh ? '插件生态' : 'Plugin Ecosystem', 'Growing', 'Mature'],
            ].map(([feature, fresh, astro], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{fresh}</td>
                <td style={tdStyle}>{astro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fbbf24' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fbbf24' }}>{ct.freshBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Deno生态项目' : 'Deno ecosystem projects'}</li>
            <li>{isZh ? '实时SSR应用' : 'Real-time SSR applications'}</li>
            <li>{isZh ? '边缘优先部署' : 'Edge-first deployment'}</li>
            <li>{isZh ? 'Preact爱好者' : 'Preact enthusiasts'}</li>
            <li>{isZh ? '无构建步骤偏好' : 'No build step preference'}</li>
            <li>{isZh ? '动态交互应用' : 'Dynamic interactive apps'}</li>
            <li>{isZh ? 'Deno Deploy托管' : 'Deno Deploy hosting'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff5d01' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff5d01' }}>{ct.astroBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '博客和文档站点' : 'Blogs and documentation'}</li>
            <li>{isZh ? '营销和着陆页' : 'Marketing and landing pages'}</li>
            <li>{isZh ? '多框架需求' : 'Multi-framework needs'}</li>
            <li>{isZh ? '内容丰富的站点' : 'Content-heavy sites'}</li>
            <li>{isZh ? 'SEO关键页面' : 'SEO-critical pages'}</li>
            <li>{isZh ? '静态站点生成' : 'Static site generation'}</li>
            <li>{isZh ? 'MDX内容' : 'MDX content'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
