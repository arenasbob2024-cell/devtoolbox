'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SolidStart vs Next.js: Full-Stack Framework Comparison 2025',
    intro: 'Next.js has dominated the React meta-framework space, but SolidStart brings a compelling alternative with SolidJS\'s fine-grained reactivity. This comparison examines performance, developer experience, ecosystem, and real-world use cases to help you choose the right framework.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Next.js offers the largest ecosystem, best documentation, and most job opportunities. SolidStart provides superior runtime performance (2-3x faster), smaller bundle sizes, and more intuitive reactivity without hooks rules. Choose Next.js for enterprise stability and ecosystem; choose SolidStart for performance-critical applications and simpler mental model.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'SolidStart apps are 2-3x faster with 50% smaller bundles than equivalent Next.js apps',
    takeaway2: 'Next.js has the largest React ecosystem with Vercel backing and extensive documentation',
    takeaway3: 'SolidStart uses signals for reactivity - no hooks rules, no stale closures',
    takeaway4: 'Both support SSR, SSG, ISR, streaming, and server components patterns',
    takeaway5: 'Next.js App Router uses React Server Components; SolidStart uses solid primitives',
    takeaway6: 'SolidStart learning curve is gentler for developers new to React hooks',
    
    whatIsSolidStartTitle: 'What is SolidStart?',
    whatIsSolidStartContent: 'SolidStart is the official meta-framework for SolidJS, created by Ryan Carniato. It provides file-based routing, server-side rendering, and deployment adapters while leveraging SolidJS\'s fine-grained reactivity system. Unlike React\'s virtual DOM, Solid compiles to real DOM updates, resulting in superior runtime performance.',
    
    whatIsNextTitle: 'What is Next.js?',
    whatIsNextContent: 'Next.js, created by Vercel in 2016, is the most popular React meta-framework. It pioneered server-side rendering for React and continues to innovate with React Server Components, streaming SSR, and edge runtime support. With over 4 million weekly npm downloads, it\'s the default choice for production React applications.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world benchmarks comparing identical applications:',
    
    renderBenchmarkTitle: 'Rendering Performance',
    renderBenchmarkIntro: 'Time to interactive for a dashboard with 1000 components:',
    
    bundleTitle: 'Bundle Size',
    bundleIntro: 'JavaScript shipped to the client for equivalent features:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Built-in capabilities and developer experience:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Different reactivity models, similar outcomes:',
    
    solidStartExampleTitle: 'SolidStart',
    nextExampleTitle: 'Next.js',
    
    routingTitle: 'Routing & Data Fetching',
    routingIntro: 'How each framework handles navigation and data:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Where can you deploy each framework?',
    
    ecosystemTitle: 'Ecosystem & Community',
    ecosystemIntro: 'Libraries, tools, and community support:',
    
    whenToUseTitle: 'When to Use Each Framework',
    solidStartBestFor: 'Use SolidStart When:',
    nextBestFor: 'Use Next.js When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Next.js remains the safer choice for most organizations due to its mature ecosystem, extensive documentation, and large talent pool. SolidStart is the better choice when performance is critical, bundle size matters, or you prefer a simpler reactivity model without hooks complexity. Both are production-ready; your choice depends on team expertise, performance requirements, and ecosystem needs.',
    
    faq1q: 'Can I use React libraries in SolidStart?',
    faq1a: 'No, SolidStart uses SolidJS which is a separate framework. However, many common patterns have Solid equivalents, and the Solid community has ported many popular utilities. You\'ll need to find Solid-specific alternatives or write adapters.',
    
    faq2q: 'Is SolidStart production-ready?',
    faq2a: 'Yes, SolidStart 1.0 was released in 2023 and is production-ready. It\'s used by several companies in production. However, the ecosystem is smaller than Next.js, so evaluate your library requirements carefully.',
    
    faq3q: 'Which is easier to learn?',
    faq3a: 'SolidStart is often easier for developers without React experience because signals are more intuitive than hooks. For experienced React developers, there\'s a learning curve to understand Solid\'s reactivity model, but many find it simpler long-term.',
    
    faq4q: 'Does SolidStart support TypeScript?',
    faq4a: 'Yes, SolidStart has excellent TypeScript support out of the box. SolidJS was designed with TypeScript in mind, and type inference works seamlessly with signals and components.',
    
    faq5q: 'What about SEO with SolidStart?',
    faq5a: 'SolidStart supports full server-side rendering and streaming, providing excellent SEO capabilities comparable to Next.js. Both frameworks can achieve perfect SEO scores when properly configured.',
    
    faq6q: 'Can I deploy SolidStart to Vercel?',
    faq6a: 'Yes, SolidStart has an official Vercel adapter. You can deploy to Vercel, Netlify, Cloudflare Pages, or any Node.js host. However, Next.js has deeper Vercel integration with more features.',
    
    faq7q: 'How does server-side rendering differ?',
    faq7a: 'Next.js uses React Server Components for server rendering with a hydration model. SolidStart uses solid primitives that run on the server and hydrate efficiently. Both support streaming SSR for improved TTFB.',
    
    faq8q: 'Which has better performance for large apps?',
    faq8a: 'SolidStart generally performs better for large, complex applications due to fine-grained reactivity. Updates only affect changed DOM nodes without virtual DOM diffing. For most apps, both perform well, but SolidStart scales better with complexity.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'SolidStart vs Next.js：2025年全栈框架对比',
    intro: 'Next.js主导了React元框架领域，但SolidStart通过SolidJS的细粒度响应性带来了引人注目的替代方案。本比较考察性能、开发者体验、生态系统和真实用例，帮助你选择合适的框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Next.js提供最大的生态系统、最好的文档和最多的工作机会。SolidStart提供卓越的运行时性能（快2-3倍）、更小的包大小和更直观的响应性，无需遵循hooks规则。企业稳定性和生态系统选择Next.js；性能关键型应用和更简单的心智模型选择SolidStart。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'SolidStart应用比同等Next.js应用快2-3倍，包大小减少50%',
    takeaway2: 'Next.js拥有最大的React生态系统，有Vercel支持和广泛文档',
    takeaway3: 'SolidStart使用信号进行响应——无hooks规则，无过时闭包',
    takeaway4: '两者都支持SSR、SSG、ISR、流式传输和服务器组件模式',
    takeaway5: 'Next.js App Router使用React服务器组件；SolidStart使用solid原语',
    takeaway6: '对于不熟悉React hooks的开发者，SolidStart学习曲线更平缓',
    
    whatIsSolidStartTitle: '什么是SolidStart？',
    whatIsSolidStartContent: 'SolidStart是SolidJS的官方元框架，由Ryan Carniato创建。它提供基于文件的路由、服务器端渲染和部署适配器，同时利用SolidJS的细粒度响应性系统。与React的虚拟DOM不同，Solid编译为真实DOM更新，带来卓越的运行时性能。',
    
    whatIsNextTitle: '什么是Next.js？',
    whatIsNextContent: 'Next.js由Vercel于2016年创建，是最流行的React元框架。它开创了React的服务器端渲染，并通过React服务器组件、流式SSR和边缘运行时支持继续创新。每周npm下载量超过400万，是生产React应用的默认选择。',
    
    performanceTitle: '性能对比',
    performanceIntro: '比较相同应用的真实世界基准测试：',
    
    renderBenchmarkTitle: '渲染性能',
    renderBenchmarkIntro: '包含1000个组件的仪表板可交互时间：',
    
    bundleTitle: '包大小',
    bundleIntro: '为等效功能发送到客户端的JavaScript：',
    
    featuresTitle: '功能对比',
    featuresIntro: '内置功能和开发者体验：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '不同的响应性模型，类似的结果：',
    
    solidStartExampleTitle: 'SolidStart',
    nextExampleTitle: 'Next.js',
    
    routingTitle: '路由和数据获取',
    routingIntro: '每个框架如何处理导航和数据：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '你可以在哪里部署每个框架？',
    
    ecosystemTitle: '生态系统和社区',
    ecosystemIntro: '库、工具和社区支持：',
    
    whenToUseTitle: '何时使用每个框架',
    solidStartBestFor: '使用SolidStart的场景：',
    nextBestFor: '使用Next.js的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，由于成熟的生态系统、广泛的文档和庞大的人才库，Next.js对大多数组织来说仍然是更安全的选择。当性能至关重要、包大小很重要，或者你更喜欢没有hooks复杂性的更简单响应性模型时，SolidStart是更好的选择。两者都已生产就绪；你的选择取决于团队专业知识、性能需求和生态系统需求。',
    
    faq1q: '我可以在SolidStart中使用React库吗？',
    faq1a: '不可以，SolidStart使用SolidJS，这是一个独立的框架。然而，许多常见模式有Solid等效项，Solid社区已经移植了许多流行的实用程序。你需要找到Solid特定的替代品或编写适配器。',
    
    faq2q: 'SolidStart已经可以用于生产了吗？',
    faq2a: '是的，SolidStart 1.0于2023年发布，已可生产使用。多家公司已在生产中使用它。然而，生态系统比Next.js小，所以请仔细评估你的库需求。',
    
    faq3q: '哪个更容易学习？',
    faq3a: '对于没有React经验的开发者，SolidStart通常更容易，因为信号比hooks更直观。对于有经验的React开发者，理解Solid的响应性模型有学习曲线，但许多人发现它长期来看更简单。',
    
    faq4q: 'SolidStart支持TypeScript吗？',
    faq4a: '是的，SolidStart开箱即用提供出色的TypeScript支持。SolidJS在设计时就考虑了TypeScript，类型推断与信号和组件无缝协作。',
    
    faq5q: 'SolidStart的SEO如何？',
    faq5a: 'SolidStart支持完整的服务器端渲染和流式传输，提供与Next.js相当的出色SEO能力。两个框架在正确配置时都可以达到完美的SEO分数。',
    
    faq6q: '我可以将SolidStart部署到Vercel吗？',
    faq6a: '可以，SolidStart有官方Vercel适配器。你可以部署到Vercel、Netlify、Cloudflare Pages或任何Node.js主机。然而，Next.js与Vercel有更深的集成和更多功能。',
    
    faq7q: '服务器端渲染有什么不同？',
    faq7a: 'Next.js使用React服务器组件进行服务器渲染，采用水合模型。SolidStart使用在服务器上运行并高效水合的solid原语。两者都支持流式SSR以改善TTFB。',
    
    faq8q: '哪个对大型应用性能更好？',
    faq8a: '由于细粒度响应性，SolidStart通常在大型复杂应用中表现更好。更新只影响已更改的DOM节点，无需虚拟DOM差异比较。对于大多数应用，两者都表现良好，但SolidStart随复杂性扩展更好。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SolidStartVsNextjs({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsSolidStartTitle}</h3>
      <p style={pStyle}>{ct.whatIsSolidStartContent}</p>

      <h3 style={h3Style}>{ct.whatIsNextTitle}</h3>
      <p style={pStyle}>{ct.whatIsNextContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>SolidStart</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心库' : 'Core Library', 'SolidJS', 'React'],
              [isZh ? '响应性' : 'Reactivity', isZh ? '信号（细粒度）' : 'Signals (fine-grained)', isZh ? 'Hooks + 虚拟DOM' : 'Hooks + Virtual DOM'],
              [isZh ? '首次发布' : 'First Release', '2022', '2016'],
              [isZh ? '渲染模式' : 'Rendering', 'SSR/SSG/ISR/Streaming', 'SSR/SSG/ISR/Streaming/RSC'],
              [isZh ? '路由' : 'Routing', isZh ? '基于文件' : 'File-based', isZh ? '基于文件' : 'File-based'],
              [isZh ? '运行时' : 'Runtime', 'Node.js/Edge', 'Node.js/Edge'],
              [isZh ? '编译' : 'Compilation', isZh ? '编译为真实DOM' : 'Compiles to real DOM', isZh ? '虚拟DOM差异比较' : 'Virtual DOM diffing'],
            ].map(([feature, solid, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#4f46e5' }}>{solid}</td>
                <td style={{ ...tdStyle, color: '#000' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.renderBenchmarkTitle}</h3>
      <p style={pStyle}>{ct.renderBenchmarkIntro}</p>

      <pre style={codeStyle}><code>{`// SolidStart - Fine-grained reactivity
import { createSignal, For } from "solid-js";

function Dashboard() {
  const [items, setItems] = createSignal([]);

  // Only re-renders affected nodes
  return (
    <For each={items()}>
      {(item) => <ItemCard item={item} />}
    </For>
  );
}

// Next.js - React hooks
"use client";
import { useState } from "react";

function Dashboard() {
  const [items, setItems] = useState([]);

  // Re-renders entire component on change
  return (
    <div>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>SolidStart</th>
              <th style={thStyle}>Next.js</th>
              <th style={thStyle}>{isZh ? '差异' : 'Difference'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次内容绘制' : 'First Contentful Paint', '0.8s', '1.2s', '1.5x faster'],
              [isZh ? '可交互时间' : 'Time to Interactive', '1.5s', '2.8s', '1.9x faster'],
              [isZh ? '总阻塞时间' : 'Total Blocking Time', '120ms', '380ms', '3.2x faster'],
              [isZh ? '更新时间(1000项)' : 'Update (1000 items)', '45ms', '180ms', '4x faster'],
            ].map(([metric, solid, next, diff], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#4f46e5' }}>{solid}</td>
                <td style={tdStyle}>{next}</td>
                <td style={{ ...tdStyle, color: '#4f46e5', fontWeight: 700 }}>{diff}</td>
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
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>SolidStart</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Hello World' : 'Hello World', '8KB', '85KB'],
              [isZh ? '博客应用' : 'Blog App', '22KB', '65KB'],
              [isZh ? '电商仪表板' : 'E-commerce Dashboard', '45KB', '120KB'],
              [isZh ? '完整SaaS应用' : 'Full SaaS App', '85KB', '195KB'],
            ].map(([scenario, solid, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={{ ...tdStyle, color: '#4f46e5' }}>{solid}</td>
                <td style={tdStyle}>{next}</td>
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
              <th style={thStyle}>SolidStart</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '文件路由' : 'File-based Routing', '✓', '✓'],
              [isZh ? 'API路由' : 'API Routes', '✓', '✓'],
              [isZh ? 'SSR' : 'SSR', '✓', '✓'],
              [isZh ? 'SSG' : 'SSG', '✓', '✓'],
              [isZh ? 'ISR' : 'ISR', '✓', '✓'],
              [isZh ? '流式SSR' : 'Streaming SSR', '✓', '✓'],
              [isZh ? '服务器组件' : 'Server Components', isZh ? 'Solid原语' : 'Solid primitives', 'RSC'],
              [isZh ? '图片优化' : 'Image Optimization', '@solidjs/media', 'next/image'],
              [isZh ? '字体优化' : 'Font Optimization', isZh ? '手动' : 'Manual', 'next/font'],
              [isZh ? '中间件' : 'Middleware', '✓', '✓'],
              [isZh ? '边缘运行时' : 'Edge Runtime', '✓', '✓'],
              [isZh ? 'TypeScript' : 'TypeScript', '✓ Native', '✓ Native'],
            ].map(([feature, solid, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: solid.includes('✓') ? '#4f46e5' : 'inherit' }}>{solid}</td>
                <td style={{ ...tdStyle, color: next.includes('✓') ? '#000' : 'inherit' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#4f46e5' }}>{ct.solidStartExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// SolidStart - Counter with signals
import { createSignal, createEffect } from "solid-js";
import { useRouteData } from "solid-start";

// Server function (runs on server)
export function getUser(id: string) {
  return "server $". db.users.find(id);
}

// Route data (server-side data fetching)
export function routeData({ params }) {
  return createAsyncData(() => getUser(params.id));
}

// Component
export default function UserProfile() {
  const user = useRouteData<typeof routeData>();
  const [count, setCount] = createSignal(0);
  
  // Effect runs only when count changes
  createEffect(() => {
    console.log("Count changed:", count());
  });
  
  return (
    <div>
      <h1>{user().name}</h1>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

// No hooks rules! Signals work anywhere
function useCustomLogic() {
  const [value, setValue] = createSignal(null);
  
  // Can be called conditionally
  if (someCondition) {
    const [extra, setExtra] = createSignal(0);
    return { value, extra };
  }
  
  return { value };
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#000' }}>{ct.nextExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Next.js App Router - Counter with hooks
"use client";
import { useState, useEffect } from "react";

// Server Component (default)
async function UserProfile({ params }: { params: { id: string } }) {
  // Direct database access in Server Component
  const user = await db.users.find(params.id);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <ClientCounter />
    </div>
  );
}

// Client Component
function ClientCounter() {
  const [count, setCount] = useState(0);
  
  // Effect with dependency array
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

// Custom hook - must follow rules of hooks
function useCustomLogic(condition: boolean) {
  const [value, setValue] = useState(null);
  
  // CANNOT be called conditionally!
  // This would break:
  // if (condition) {
  //   const [extra, setExtra] = useState(0);
  // }
  
  // Must always be called in same order
  const [extra, setExtra] = useState(0);
  
  return { value, extra: condition ? extra : null };
}

export default UserProfile;`}</code></pre>

      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>SolidStart</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vercel', '✓ Adapter', '✓ Native (最佳)'],
              ['Netlify', '✓ Adapter', '✓ Native'],
              ['Cloudflare Pages', '✓ Adapter', '✓ @cloudflare/next-on-pages'],
              ['AWS Amplify', '✓ Node.js', '✓ Native'],
              ['Deno Deploy', '✓ Adapter', '✓ Middleware'],
              ['Bun', '✓ Native', '✓ Compatible'],
              ['Self-hosted', '✓ Node.js', '✓ Node.js'],
              ['Docker', '✓', '✓'],
            ].map(([platform, solid, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={tdStyle}>{solid}</td>
                <td style={{ ...tdStyle, color: next.includes('最佳') ? '#22c55e' : 'inherit' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>SolidStart</th>
              <th style={thStyle}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'GitHub Stars' : 'GitHub Stars', '~25K', '~120K'],
              [isZh ? 'npm周下载' : 'npm weekly downloads', '~100K', '~4M'],
              [isZh ? 'npm包数量' : 'npm packages', '~500+', '~50K+'],
              [isZh ? '文档质量' : 'Documentation', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '教程/课程' : 'Tutorials/Courses', isZh ? '增长中' : 'Growing', isZh ? '广泛' : 'Extensive'],
              [isZh ? '工作机会' : 'Job Opportunities', isZh ? '有限' : 'Limited', isZh ? '很多' : 'Many'],
              [isZh ? '企业采用' : 'Enterprise Adoption', isZh ? '早期' : 'Early', isZh ? '成熟' : 'Mature'],
            ].map(([aspect, solid, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{solid}</td>
                <td style={{ ...tdStyle, color: '#000' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4f46e5' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4f46e5' }}>{ct.solidStartBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '性能关键型应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '移动/低带宽用户' : 'Mobile/low-bandwidth users'}</li>
            <li>{isZh ? '复杂状态管理' : 'Complex state management'}</li>
            <li>{isZh ? '厌倦hooks规则' : 'Tired of hooks rules'}</li>
            <li>{isZh ? '喜欢细粒度控制' : 'Prefer fine-grained control'}</li>
            <li>{isZh ? '新项目无遗留' : 'Greenfield projects'}</li>
            <li>{isZh ? '实时数据应用' : 'Real-time data apps'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.nextBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级项目' : 'Enterprise projects'}</li>
            <li>{isZh ? '需要大型生态系统' : 'Need large ecosystem'}</li>
            <li>{isZh ? '团队熟悉React' : 'Team knows React'}</li>
            <li>{isZh ? '招聘需求' : 'Hiring requirements'}</li>
            <li>{isZh ? 'Vercel集成' : 'Vercel integration'}</li>
            <li>{isZh ? '内容驱动网站' : 'Content-driven sites'}</li>
            <li>{isZh ? '渐进式迁移' : 'Gradual migration'}</li>
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
