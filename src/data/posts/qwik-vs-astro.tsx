'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Qwik vs Astro: Resumability vs Islands Architecture in 2025',
    intro: 'Both Qwik and Astro challenge traditional JavaScript frameworks with innovative approaches to performance. Qwik offers resumability with zero hydration, while Astro pioneered Islands Architecture for partial hydration. This comparison examines their philosophies, performance, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Astro excels for content-driven sites with its Islands Architecture and multi-framework support. Qwik delivers the best initial load performance with resumability - no hydration needed. Choose Astro for blogs, marketing sites, and multi-framework projects; choose Qwik for highly interactive apps that need instant loading.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Qwik ships zero JavaScript initially - only loads on interaction (resumability)',
    takeaway2: 'Astro allows mixing React, Vue, Svelte, and more in one project',
    takeaway3: 'Both achieve excellent Core Web Vitals through different approaches',
    takeaway4: 'Qwik has steeper learning curve; Astro feels familiar if you know HTML/CSS',
    takeaway5: 'Astro\'s ecosystem is more mature with 4x more GitHub stars',
    takeaway6: 'Qwik Optimizer serializes app state into HTML for instant resumption',
    
    whatIsQwikTitle: 'What is Qwik?',
    whatIsQwikContent: 'Qwik, created by Miško Hevery (Angular creator) in 2022, introduces "resumability" - applications pause on the server and resume on the client without hydration. The Qwik Optimizer breaks code into tiny chunks, loading only what\'s needed for each interaction. This achieves near-instant Time to Interactive regardless of application complexity.',
    
    whatIsAstroTitle: 'What is Astro?',
    whatIsAstroContent: 'Astro, created by Fred K. Schott in 2021, pioneered Islands Architecture for web development. It ships zero JavaScript by default, hydrating only interactive "islands" when needed. Astro is framework-agnostic, letting you use React, Vue, Svelte, or other components in the same project. It excels at content-driven websites.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Head-to-head benchmarks for different application types:',
    
    loadBenchmarkTitle: 'Initial Load Performance',
    loadBenchmarkIntro: 'Time to Interactive for a blog with interactive components:',
    
    interactivityTitle: 'Interaction Response',
    interactivityIntro: 'Time to respond to first user interaction:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Built-in capabilities and architectural differences:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Component patterns in each framework:',
    
    qwikExampleTitle: 'Qwik',
    astroExampleTitle: 'Astro',
    
    hydrationTitle: 'Hydration Strategies',
    hydrationIntro: 'How each framework handles JavaScript loading:',
    
    ecosystemTitle: 'Ecosystem & Framework Support',
    ecosystemIntro: 'Libraries, integrations, and community:',
    
    whenToUseTitle: 'When to Use Each Framework',
    qwikBestFor: 'Use Qwik When:',
    astroBestFor: 'Use Astro When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Qwik and Astro represent the future of performant web development, but for different use cases. Astro is the best choice for content-driven sites, blogs, and marketing pages where you want flexibility with framework choice. Qwik shines for complex interactive applications where instant loading is critical. Both avoid the traditional hydration penalty - Astro through islands, Qwik through resumability. Choose based on your project type: content sites (Astro) vs interactive apps (Qwik).',
    
    faq1q: 'Can I use React components in both frameworks?',
    faq1a: 'Yes for Astro - it natively supports React, Vue, Svelte, and more. Qwik uses Qwik City with its own component model, though you can use Qwik React to wrap React components. Astro has better multi-framework support.',
    
    faq2q: 'Which has better SEO?',
    faq2a: 'Both have excellent SEO. Astro and Qwik both server-render HTML by default. Astro may have a slight edge for content sites with its built-in SEO features and simpler static site generation.',
    
    faq3q: 'Is Qwik\'s resumability just lazy loading?',
    faq3a: 'No. Resumability is fundamentally different. Qwik serializes the application state into HTML, allowing the browser to "resume" exactly where the server left off. Lazy loading is just one part - the real magic is zero hydration with full interactivity preserved.',
    
    faq4q: 'Can I build a full web application with Astro?',
    faq4a: 'Yes. While Astro excels at content sites, you can build full applications using View Transitions, islands for interactivity, and Astro DB. However, for highly complex SPAs, Qwik or traditional frameworks may be better.',
    
    faq5q: 'How does Qwik handle state management?',
    faq5a: 'Qwik has built-in reactive state with useStore, useSignal, and useContext. State is automatically serialized and resumed. No external state library is needed for most cases, unlike React where Redux/Zustand are common.',
    
    faq6q: 'What\'s the learning curve for each?',
    faq6a: 'Astro is easier if you know HTML/CSS - it feels like enhanced HTML. Qwik has a steeper curve due to its novel concepts (resumability, $ optimizer, serialized closures). Both have good documentation.',
    
    faq7q: 'Which is better for e-commerce?',
    faq7a: 'Both work well. Astro is great for storefronts with mostly static content and interactive cart/checkout islands. Qwik excels for complex product configurators or highly interactive shopping experiences. Consider Astro for typical stores, Qwik for unique interactive features.',
    
    faq8q: 'How do deployment options compare?',
    faq8a: 'Both deploy to Vercel, Netlify, Cloudflare Pages, and Node.js hosts. Astro has slightly broader adapter support. Qwik City provides similar deployment flexibility. Both support edge deployment.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Qwik vs Astro：2025年可恢复性与群岛架构对比',
    intro: 'Qwik和Astro都通过创新的性能方法挑战传统JavaScript框架。Qwik提供零水合的可恢复性，而Astro开创了部分水合的群岛架构。本比较考察它们的理念、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Astro在内容驱动网站方面表现出色，具有群岛架构和多框架支持。Qwik通过可恢复性提供最佳初始加载性能——无需水合。博客、营销网站和多框架项目选择Astro；需要即时加载的高度交互应用选择Qwik。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Qwik初始发送零JavaScript——仅在交互时加载（可恢复性）',
    takeaway2: 'Astro允许在一个项目中混合React、Vue、Svelte等',
    takeaway3: '两者通过不同方法实现出色的Core Web Vitals',
    takeaway4: 'Qwik学习曲线较陡；如果你了解HTML/CSS，Astro感觉很熟悉',
    takeaway5: 'Astro的生态系统更成熟，GitHub星标多4倍',
    takeaway6: 'Qwik优化器将应用状态序列化到HTML中以实现即时恢复',
    
    whatIsQwikTitle: '什么是Qwik？',
    whatIsQwikContent: 'Qwik由Miško Hevery（Angular创造者）于2022年创建，引入了"可恢复性"——应用程序在服务器上暂停，在客户端恢复，无需水合。Qwik优化器将代码分解为小块，仅为每次交互加载所需内容。无论应用复杂性如何，都能实现近乎即时的可交互时间。',
    
    whatIsAstroTitle: '什么是Astro？',
    whatIsAstroContent: 'Astro由Fred K. Schott于2021年创建，开创了Web开发的群岛架构。默认发送零JavaScript，仅在需要时水合交互"群岛"。Astro与框架无关，让你在同一项目中使用React、Vue、Svelte或其他组件。它在内容驱动网站方面表现出色。',
    
    performanceTitle: '性能对比',
    performanceIntro: '不同应用类型的直接基准测试：',
    
    loadBenchmarkTitle: '初始加载性能',
    loadBenchmarkIntro: '带有交互组件的博客的可交互时间：',
    
    interactivityTitle: '交互响应',
    interactivityIntro: '首次用户交互响应时间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '内置功能和架构差异：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '每个框架中的组件模式：',
    
    qwikExampleTitle: 'Qwik',
    astroExampleTitle: 'Astro',
    
    hydrationTitle: '水合策略',
    hydrationIntro: '每个框架如何处理JavaScript加载：',
    
    ecosystemTitle: '生态系统和框架支持',
    ecosystemIntro: '库、集成和社区：',
    
    whenToUseTitle: '何时使用每个框架',
    qwikBestFor: '使用Qwik的场景：',
    astroBestFor: '使用Astro的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Qwik和Astro都代表了高性能Web开发的未来，但针对不同的用例。Astro是内容驱动网站、博客和营销页面的最佳选择，你希望灵活选择框架。Qwik在复杂交互应用中表现出色，即时加载至关重要。两者都避免了传统的水合惩罚——Astro通过群岛，Qwik通过可恢复性。根据项目类型选择：内容网站（Astro）vs交互应用（Qwik）。',
    
    faq1q: '我可以在两个框架中使用React组件吗？',
    faq1a: 'Astro可以——它原生支持React、Vue、Svelte等。Qwik使用Qwik City及其自己的组件模型，尽管你可以使用Qwik React包装React组件。Astro有更好的多框架支持。',
    
    faq2q: '哪个SEO更好？',
    faq2a: '两者都有出色的SEO。Astro和Qwik都默认服务器渲染HTML。对于内容网站，Astro可能因其内置SEO功能和更简单的静态站点生成而略有优势。',
    
    faq3q: 'Qwik的可恢复性只是懒加载吗？',
    faq3a: '不是。可恢复性根本不同。Qwik将应用程序状态序列化到HTML中，允许浏览器准确从服务器停止的地方"恢复"。懒加载只是一部分——真正的魔力是在保持完全交互性的同时零水合。',
    
    faq4q: '我可以用Astro构建完整的Web应用吗？',
    faq4a: '可以。虽然Astro在内容网站方面表现出色，但你可以使用View Transitions、交互群岛和Astro DB构建完整应用。然而，对于高度复杂的SPA，Qwik或传统框架可能更好。',
    
    faq5q: 'Qwik如何处理状态管理？',
    faq5a: 'Qwik有内置的响应式状态，包括useStore、useSignal和useContext。状态自动序列化和恢复。大多数情况下不需要外部状态库，不像React中Redux/Zustand很常见。',
    
    faq6q: '每个的学习曲线如何？',
    faq6a: '如果你知道HTML/CSS，Astro更容易——感觉像增强的HTML。由于其新颖概念（可恢复性、$优化器、序列化闭包），Qwik曲线更陡。两者都有良好的文档。',
    
    faq7q: '哪个更适合电商？',
    faq7a: '两者都很好。Astro适合大多数静态内容和交互式购物车/结账群岛的店面。Qwik在复杂产品配置器或高度交互购物体验方面表现出色。典型商店考虑Astro，独特交互功能考虑Qwik。',
    
    faq8q: '部署选项如何比较？',
    faq8a: '两者都部署到Vercel、Netlify、Cloudflare Pages和Node.js主机。Astro有稍广泛的适配器支持。Qwik City提供类似的部署灵活性。两者都支持边缘部署。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function QwikVsAstro({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsQwikTitle}</h3>
      <p style={pStyle}>{ct.whatIsQwikContent}</p>

      <h3 style={h3Style}>{ct.whatIsAstroTitle}</h3>
      <p style={pStyle}>{ct.whatIsAstroContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Qwik</th>
              <th style={thStyle}>Astro</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心创新' : 'Core Innovation', isZh ? '可恢复性' : 'Resumability', isZh ? '群岛架构' : 'Islands Architecture'],
              [isZh ? '水合策略' : 'Hydration Strategy', isZh ? '零水合' : 'Zero hydration', isZh ? '部分水合' : 'Partial hydration'],
              [isZh ? '首次发布' : 'First Release', '2022', '2021'],
              [isZh ? '框架支持' : 'Framework Support', isZh ? 'Qwik原生（可包装React）' : 'Qwik native (React wrap)', isZh ? '多框架' : 'Multi-framework'],
              [isZh ? '路由' : 'Routing', 'Qwik City', 'File-based'],
              [isZh ? '状态管理' : 'State Management', isZh ? '内置响应式' : 'Built-in reactive', isZh ? '岛屿内' : 'Within islands'],
              [isZh ? '服务端渲染' : 'SSR', isZh ? '默认+序列化状态' : 'Default + serialized state', isZh ? '默认/SSG/SSR' : 'Default/SSG/SSR'],
            ].map(([feature, qwik, astro], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#18b6f6' }}>{qwik}</td>
                <td style={{ ...tdStyle, color: '#ff5d01' }}>{astro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.loadBenchmarkTitle}</h3>
      <p style={pStyle}>{ct.loadBenchmarkIntro}</p>

      <pre style={codeStyle}><code>{`// Qwik - Zero hydration, instant interactive
import { component$, useStore } from '@builder.io/qwik';

export default component$(() => {
  const state = useStore({ count: 0 });
  
  // No JavaScript loaded until this is clicked!
  return (
    <button onClick$={() => state.count++}>
      Count: {state.count}
    </button>
  );
});

// Astro - Island with client:visible
---
import ReactCounter from '../components/Counter';
---

<!-- No JS until island visible in viewport -->
<ReactCounter client:visible />`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Qwik</th>
              <th style={thStyle}>Astro</th>
              <th style={thStyle}>{isZh ? '注释' : 'Note'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次内容绘制' : 'First Contentful Paint', '0.5s', '0.5s', isZh ? '相似（SSR）' : 'Similar (SSR)'],
              [isZh ? '可交互时间' : 'Time to Interactive', '0.6s', '0.8s', isZh ? 'Qwik零水合' : 'Qwik zero hydration'],
              [isZh ? '总阻塞时间' : 'Total Blocking Time', '0ms', '15ms', isZh ? 'Qwik无主线程阻塞' : 'Qwik no main thread block'],
              [isZh ? '首次交互JS' : 'JS on first interaction', '~1KB', '~15KB', isZh ? '仅处理程序代码' : 'Handler code only'],
              [isZh ? '完全交互JS' : 'JS for full interactivity', '~5KB', '~45KB', isZh ? '渐进加载' : 'Progressive load'],
            ].map(([metric, qwik, astro, note], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#18b6f6' }}>{qwik}</td>
                <td style={tdStyle}>{astro}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: 'var(--text-secondary)' }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.interactivityTitle}</h3>
      <p style={pStyle}>{ct.interactivityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #18b6f6' }}>
          <strong style={{ color: '#18b6f6' }}>Qwik</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '首次点击加载处理程序（~1KB）。状态已在HTML中序列化，无需重放。后续交互按需加载更多代码。应用感觉"已加载"因为框架准备好恢复。' : 'First click loads the handler (~1KB). State already serialized in HTML, no replay needed. Subsequent interactions load more code as needed. App feels "loaded" because framework is ready to resume.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ff5d01' }}>
          <strong style={{ color: '#ff5d01' }}>Astro</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '岛屿进入视口时加载。水合特定组件，不影响页面其余部分。交互时间取决于岛屿策略（client:load、client:visible等）。' : 'Islands load when entering viewport. Hydrates specific component, not affecting rest of page. Interaction time depends on island strategy (client:load, client:visible, etc.).'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.hydrationTitle}</h2>
      <p style={pStyle}>{ct.hydrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '策略' : 'Strategy'}</th>
              <th style={thStyle}>Qwik</th>
              <th style={thStyle}>Astro</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '默认行为' : 'Default', isZh ? '零JS' : 'Zero JS', isZh ? '零JS' : 'Zero JS'],
              [isZh ? '交互组件' : 'Interactive Components', isZh ? '点击时加载' : 'Load on click', isZh ? '基于指令加载' : 'Directive-based'],
              [isZh ? '状态处理' : 'State Handling', isZh ? '序列化到HTML' : 'Serialized to HTML', isZh ? '水合时重建' : 'Rebuilt on hydration'],
              [isZh ? '水合时机' : 'Hydration Timing', isZh ? '无水合' : 'No hydration', isZh ? '配置（load/idle/visible）' : 'Configurable (load/idle/visible)'],
              [isZh ? '代码分割' : 'Code Splitting', isZh ? '自动细粒度' : 'Auto fine-grained', isZh ? '按岛屿' : 'Per island'],
            ].map(([strategy, qwik, astro], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{strategy}</td>
                <td style={tdStyle}>{qwik}</td>
                <td style={tdStyle}>{astro}</td>
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
              <th style={thStyle}>Qwik</th>
              <th style={thStyle}>Astro</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '文件路由' : 'File-based Routing', '✓ Qwik City', '✓'],
              [isZh ? 'API端点' : 'API Endpoints', '✓', '✓'],
              [isZh ? 'SSG' : 'SSG', '✓', '✓ (最佳)'],
              [isZh ? 'SSR' : 'SSR', '✓', '✓'],
              [isZh ? 'ISR' : 'ISR', '✓', '✓'],
              [isZh ? '流式SSR' : 'Streaming SSR', '✓', '✓'],
              [isZh ? '多框架' : 'Multi-framework', isZh ? '有限（Qwik React）' : 'Limited (Qwik React)', '✓ React/Vue/Svelte/etc'],
              [isZh ? 'MDX支持' : 'MDX Support', '✓', '✓ (最佳)'],
              [isZh ? '图片优化' : 'Image Optimization', '@builder.io/qwik-image', '@astrojs/image'],
              [isZh ? 'View Transitions' : 'View Transitions', isZh ? '自定义' : 'Custom', '✓ @astrojs/view-transitions'],
              [isZh ? '边缘部署' : 'Edge Deployment', '✓', '✓'],
            ].map(([feature, qwik, astro], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: qwik.includes('✓') ? '#18b6f6' : 'inherit' }}>{qwik}</td>
                <td style={{ ...tdStyle, color: astro.includes('✓') ? '#ff5d01' : 'inherit' }}>{astro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#18b6f6' }}>{ct.qwikExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Qwik - Counter with resumability
import { component$, useStore, useSignal } from '@builder.io/qwik';

// $ suffix tells optimizer to extract this
export const increment$ = $((count: number) => count + 1);

export default component$(() => {
  // useSignal for primitive reactive values
  const count = useSignal(0);
  
  // useStore for object state
  const state = useStore({
    items: [] as string[],
    loading: false,
  });
  
  // This handler code is NOT loaded until first click!
  // Qwik serializes state in HTML, no hydration needed
  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>
        Increment
      </button>
      
      <button 
        onClick$={async () => {
          state.loading = true;
          // Dynamic import - only loads when clicked
          const data = await fetch('/api/items').then(r => r.json());
          state.items = data;
          state.loading = false;
        }}
      >
        {state.loading ? 'Loading...' : 'Load Items'}
      </button>
      
      <ul>
        {state.items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
});

// Server-side route handler
// routes/api/items/index.ts
import { routeLoader$ } from '@builder.io/qwik-city';

export const useItems = routeLoader$(async () => {
  return await db.items.findAll();
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ff5d01' }}>{ct.astroExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Astro - Counter with Islands
---
// This runs on the server at build time or request
import ReactCounter from '../components/Counter';
import { loadItems } from '../data/items';

const staticItems = await loadItems();
---

<html>
<head>
  <title>Astro App</title>
</head>
<body>
  <!-- Static content - zero JS -->
  <h1>My Store</h1>
  
  <ul>
    {'{staticItems.map(item => ('}
      <li>{'{item.name}'}: {'\\$'}{'{item.price}'}</li>
    {'))}'}
  </ul>
  
  <!-- Interactive island - hydrates when visible -->
  <ReactCounter client:visible />
  
  <!-- Or load immediately for critical interactivity -->
  <ShoppingCart client:load />
  
  <!-- Or hydrate when browser is idle -->
  <Newsletter client:idle />
  
  <!-- Mix frameworks! -->
  <SvelteComponent client:visible />
  <VueWidget client:visible />
</body>
</html>

// React Counter Component
// components/Counter.tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  // This hydrates and becomes interactive
  // based on client: directive
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

// Client directives:
// client:load    - Load immediately (critical)
// client:idle    - Load when browser idle
// client:visible - Load when in viewport
// client:media   - Load when media query matches
// client:only    - Skip SSR, client-only`}</code></pre>

      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Qwik</th>
              <th style={thStyle}>Astro</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'GitHub Stars' : 'GitHub Stars', '~22K', '~45K'],
              [isZh ? 'npm周下载' : 'npm weekly downloads', '~80K', '~300K'],
              [isZh ? '集成数量' : 'Integrations', '~30', '~100+'],
              [isZh ? 'UI库' : 'UI Libraries', isZh ? '有限（需适配）' : 'Limited (needs adapter)', isZh ? '任何框架的库' : 'Any framework\'s libs'],
              [isZh ? '文档' : 'Documentation', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '模板数量' : 'Templates', '~15', '~50+'],
              [isZh ? '社区活跃度' : 'Community Activity', isZh ? '增长中' : 'Growing', isZh ? '非常活跃' : 'Very active'],
            ].map(([aspect, qwik, astro], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{qwik}</td>
                <td style={{ ...tdStyle, color: '#ff5d01' }}>{astro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #18b6f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#18b6f6' }}>{ct.qwikBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂交互应用' : 'Complex interactive apps'}</li>
            <li>{isZh ? '需要即时加载' : 'Need instant loading'}</li>
            <li>{isZh ? '移动优先体验' : 'Mobile-first experience'}</li>
            <li>{isZh ? '单页应用' : 'Single-page apps'}</li>
            <li>{isZh ? '渐进增强' : 'Progressive enhancement'}</li>
            <li>{isZh ? '大型应用扩展' : 'Large app scaling'}</li>
            <li>{isZh ? '实验性项目' : 'Experimental projects'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff5d01' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff5d01' }}>{ct.astroBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '博客/文档网站' : 'Blogs/docs sites'}</li>
            <li>{isZh ? '营销页面' : 'Marketing pages'}</li>
            <li>{isZh ? '电商店面' : 'E-commerce storefronts'}</li>
            <li>{isZh ? '内容驱动网站' : 'Content-driven sites'}</li>
            <li>{isZh ? '多框架项目' : 'Multi-framework projects'}</li>
            <li>{isZh ? 'SEO关键页面' : 'SEO-critical pages'}</li>
            <li>{isZh ? '快速开发' : 'Rapid development'}</li>
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
