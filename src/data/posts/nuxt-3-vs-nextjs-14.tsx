'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Nuxt 3 vs Next.js 14: Vue vs React Meta Framework Comparison',
    intro: 'Nuxt 3 and Next.js 14 are the leading meta-frameworks for Vue and React respectively. Both offer server-side rendering, file-based routing, and full-stack capabilities. This comparison examines performance, developer experience, features, and ecosystem to help you choose.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Next.js 14 leads in ecosystem size, server components adoption, and enterprise adoption. Nuxt 3 excels in developer experience, auto-imports, and Vue 3 composition API. Choose Next.js for React teams and maximum job opportunities; choose Nuxt for Vue developers seeking the best DX.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Next.js has larger ecosystem and more enterprise adoption',
    takeaway2: 'Nuxt 3 offers better developer experience with auto-imports',
    takeaway3: 'Both support SSR, SSG, ISR, and hybrid rendering',
    takeaway4: 'Next.js 14 introduces Server Actions and improved caching',
    takeaway5: 'Nuxt 3 has Nitro engine for deployment flexibility',
    takeaway6: 'Both have excellent TypeScript support',
    
    whatIsNuxtTitle: 'What is Nuxt 3?',
    whatIsNuxtContent: 'Nuxt 3 is a Vue.js meta-framework built on Vue 3 and the Composition API. It features automatic imports, file-based routing, server routes, and the Nitro server engine. Created by the NuxtLabs team, it provides an intuitive developer experience with powerful conventions.',
    
    whatIsNextTitle: 'What is Next.js 14?',
    whatIsNextContent: 'Next.js 14 is a React meta-framework by Vercel. It pioneered many modern web features including hybrid rendering, API routes, and server components. With strong enterprise adoption and continuous innovation, it is the most popular React framework.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks and rendering performance:',
    
    renderingTitle: 'Rendering Strategies',
    renderingIntro: 'Available rendering methods:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Built-in capabilities comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Similar patterns with different syntax:',
    
    nuxtExampleTitle: 'Nuxt 3',
    nextExampleTitle: 'Next.js 14',
    
    routingTitle: 'Routing Systems',
    routingIntro: 'File-based routing comparison:',
    
    dataFetchingTitle: 'Data Fetching',
    dataFetchingIntro: 'How to fetch and manage data:',
    
    serverComponentsTitle: 'Server Components',
    serverComponentsIntro: 'Component architecture differences:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Where can you deploy?',
    
    ecosystemTitle: 'Ecosystem & Community',
    ecosystemIntro: 'Module and plugin availability:',
    
    whenToUseTitle: 'When to Use Each Framework',
    nuxtBestFor: 'Use Nuxt 3 When:',
    nextBestFor: 'Use Next.js 14 When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both frameworks are mature and production-ready. Next.js 14 is the safe choice for React teams and those seeking maximum job opportunities. Nuxt 3 is ideal for Vue developers who value developer experience and the Composition API. Neither is "better" - choose based on your team\'s expertise and project requirements.',
    
    faq1q: 'Can I use TypeScript with both frameworks?',
    faq1a: 'Yes, both have excellent TypeScript support. Nuxt 3 auto-generates types; Next.js has full type safety. Both frameworks are written in TypeScript.',
    
    faq2q: 'Which has better SEO?',
    faq2a: 'Both provide excellent SEO through SSR/SSG. Next.js 14 has slightly better streaming and metadata APIs. Nuxt 3 has useSeoMeta composable. Both handle SEO equally well in practice.',
    
    faq3q: 'Can I migrate from Nuxt to Next.js or vice versa?',
    faq3a: 'Migration is possible but requires rewriting components. The underlying Vue/React differences mean you cannot directly migrate. Business logic and API calls can be reused.',
    
    faq4q: 'Which is faster at runtime?',
    faq4a: 'Both have similar performance. Next.js 14 with Server Components can reduce client JS. Nuxt 3 with Nitro is extremely fast on the server. Real differences are negligible.',
    
    faq5q: 'What about learning curve?',
    faq5a: 'Nuxt 3 has more "magic" and conventions, making it easier to start. Next.js 14 requires understanding React fundamentals. If you know Vue, Nuxt is easier; if React, Next.js is easier.',
    
    faq6q: 'How do they compare for e-commerce?',
    faq6a: 'Both are excellent for e-commerce. Next.js has more Shopify integrations. Nuxt has great commerce modules. Both support all required features: SSR, cart, checkout, etc.',
    
    faq7q: 'Which has better documentation?',
    faq7a: 'Both have excellent documentation. Next.js docs are more comprehensive. Nuxt docs are very beginner-friendly with great examples. Both communities are active and helpful.',
    
    faq8q: 'Can I use Tailwind CSS with both?',
    faq8a: 'Yes, both integrate seamlessly with Tailwind CSS. Nuxt has @nuxtjs/tailwindcss module; Next.js works with tailwindcss package directly. Setup is equally simple.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Nuxt 3 vs Next.js 14：Vue vs React元框架对比',
    intro: 'Nuxt 3和Next.js 14分别是Vue和React的领先元框架。两者都提供服务端渲染、基于文件的路由和全栈能力。本比较考察性能、开发者体验、功能和生态系统，帮助你做出选择。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Next.js 14在生态系统规模、服务器组件采用和企业采用方面领先。Nuxt 3在开发者体验、自动导入和Vue 3组合式API方面表现出色。React团队和追求最多工作机会的选择Next.js；Vue开发者追求最佳DX的选择Nuxt。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Next.js拥有更大的生态系统和更多企业采用',
    takeaway2: 'Nuxt 3通过自动导入提供更好的开发者体验',
    takeaway3: '两者都支持SSR、SSG、ISR和混合渲染',
    takeaway4: 'Next.js 14引入服务器操作和改进的缓存',
    takeaway5: 'Nuxt 3有Nitro引擎提供部署灵活性',
    takeaway6: '两者都有出色的TypeScript支持',
    
    whatIsNuxtTitle: '什么是Nuxt 3？',
    whatIsNuxtContent: 'Nuxt 3是一个基于Vue 3和组合式API的Vue.js元框架。它具有自动导入、基于文件的路由、服务端路由和Nitro服务器引擎。由NuxtLabs团队创建，它通过强大的约定提供直观的开发者体验。',
    
    whatIsNextTitle: '什么是Next.js 14？',
    whatIsNextContent: 'Next.js 14是Vercel推出的React元框架。它开创了许多现代Web功能，包括混合渲染、API路由和服务器组件。拥有强大的企业采用和持续创新，它是最流行的React框架。',
    
    performanceTitle: '性能对比',
    performanceIntro: '基准测试和渲染性能：',
    
    renderingTitle: '渲染策略',
    renderingIntro: '可用的渲染方法：',
    
    featuresTitle: '功能对比',
    featuresIntro: '内置能力比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '不同语法实现相似模式：',
    
    nuxtExampleTitle: 'Nuxt 3',
    nextExampleTitle: 'Next.js 14',
    
    routingTitle: '路由系统',
    routingIntro: '基于文件的路由比较：',
    
    dataFetchingTitle: '数据获取',
    dataFetchingIntro: '如何获取和管理数据：',
    
    serverComponentsTitle: '服务器组件',
    serverComponentsIntro: '组件架构差异：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '可以部署到哪里？',
    
    ecosystemTitle: '生态系统与社区',
    ecosystemIntro: '模块和插件可用性：',
    
    whenToUseTitle: '何时使用每个框架',
    nuxtBestFor: '使用Nuxt 3的场景：',
    nextBestFor: '使用Next.js 14的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，两个框架都已成熟并可用于生产。Next.js 14是React团队和追求最多工作机会的安全选择。Nuxt 3非常适合重视开发者体验和组合式API的Vue开发者。没有哪个"更好"——根据团队专业知识和项目需求选择。',
    
    faq1q: '我可以在两个框架中使用TypeScript吗？',
    faq1a: '可以，两者都有出色的TypeScript支持。Nuxt 3自动生成类型；Next.js有完整的类型安全。两个框架都用TypeScript编写。',
    
    faq2q: '哪个SEO更好？',
    faq2a: '两者都通过SSR/SSG提供出色的SEO。Next.js 14在流式传输和元数据API方面略好。Nuxt 3有useSeoMeta组合函数。在实践中两者处理SEO同样出色。',
    
    faq3q: '我可以从Nuxt迁移到Next.js或反之吗？',
    faq3a: '迁移是可能的但需要重写组件。底层的Vue/React差异意味着你不能直接迁移。业务逻辑和API调用可以复用。',
    
    faq4q: '哪个运行时更快？',
    faq4a: '两者性能相似。带服务器组件的Next.js 14可以减少客户端JS。带Nitro的Nuxt 3在服务器上非常快。实际差异微乎其微。',
    
    faq5q: '学习曲线如何？',
    faq5a: 'Nuxt 3有更多"魔法"和约定，更容易上手。Next.js 14需要理解React基础。如果你懂Vue，Nuxt更容易；如果懂React，Next.js更容易。',
    
    faq6q: '电商场景对比如何？',
    faq6a: '两者都非常适合电商。Next.js有更多Shopify集成。Nuxt有很棒的电商模块。两者都支持所有必需功能：SSR、购物车、结账等。',
    
    faq7q: '哪个文档更好？',
    faq7a: '两者都有出色的文档。Next.js文档更全面。Nuxt文档对初学者非常友好，有很好的示例。两个社区都很活跃和乐于助人。',
    
    faq8q: '我可以在两者中使用Tailwind CSS吗？',
    faq8a: '可以，两者都与Tailwind CSS无缝集成。Nuxt有@nuxtjs/tailwindcss模块；Next.js直接与tailwindcss包配合使用。设置同样简单。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function Nuxt3VsNextjs14({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #00dc82', background: 'linear-gradient(135deg, rgba(0,220,130,0.1), rgba(0,0,0,0.05))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#00dc82' }}>{ct.tldrTitle}</h3>
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

      <h3 style={{ ...h3Style, color: '#00dc82' }}>{ct.whatIsNuxtTitle}</h3>
      <p style={pStyle}>{ct.whatIsNuxtContent}</p>

      <h3 style={{ ...h3Style, color: '#000000' }}>{ct.whatIsNextTitle}</h3>
      <p style={pStyle}>{ct.whatIsNextContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Nuxt 3</th>
              <th style={thStyle}>Next.js 14</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '底层框架' : 'Base Framework', 'Vue 3', 'React 18'],
              [isZh ? '服务器引擎' : 'Server Engine', 'Nitro', 'Node.js / Edge'],
              [isZh ? '自动导入' : 'Auto Imports', '✓ Built-in', '✗ (need explicit)'],
              [isZh ? '服务器组件' : 'Server Components', 'Nuxt Island', 'React Server Components'],
              [isZh ? 'API路由' : 'API Routes', 'server/ directory', 'app/api/ directory'],
              [isZh ? '状态管理' : 'State Management', 'useState / Pinia', 'Context / Zustand'],
              [isZh ? '表单处理' : 'Form Handling', 'Form actions', 'Server Actions'],
            ].map(([feature, nuxt, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#00dc82' }}>{nuxt}</td>
                <td style={tdStyle}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.renderingTitle}</h2>
      <p style={pStyle}>{ct.renderingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '渲染方式' : 'Rendering'}</th>
              <th style={thStyle}>Nuxt 3</th>
              <th style={thStyle}>Next.js 14</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['SSR', '✓', '✓'],
              ['SSG', '✓', '✓'],
              ['ISR', '✓ SWR', '✓ (revalidate)'],
              ['SPA', '✓', '✓'],
              ['Hybrid', '✓', '✓'],
              ['Edge SSR', '✓ Nitro', '✓ Edge Runtime'],
              ['Streaming', '✓', '✓'],
            ].map(([render, nuxt, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{render}</td>
                <td style={{ ...tdStyle, color: '#00dc82' }}>{nuxt}</td>
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
              <th style={thStyle}>Nuxt 3</th>
              <th style={thStyle}>Next.js 14</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '文件路由' : 'File-based Routing', 'pages/ directory', 'app/ directory'],
              [isZh ? '布局系统' : 'Layouts', 'layouts/ directory', 'Manual (components)'],
              [isZh ? '中间件' : 'Middleware', 'middleware/', 'middleware.ts'],
              [isZh ? '插件' : 'Plugins', 'plugins/ (auto-load)', 'Manual setup'],
              [isZh ? '模块' : 'Modules', 'Nuxt Modules', 'npm packages'],
              [isZh ? '图片优化' : 'Image Optimization', '@nuxt/image', 'next/image'],
              [isZh ? '字体优化' : 'Font Optimization', '@nuxtjs/google-fonts', 'next/font'],
              [isZh ? '分析工具' : 'Analytics', '@nuxtjs/plausible', '@next/bundle-analyzer'],
            ].map(([feature, nuxt, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#00dc82' }}>{nuxt}</td>
                <td style={tdStyle}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#00dc82' }}>{ct.nuxtExampleTitle}</h3>
      <pre style={codeStyle}><code>{`<!-- Nuxt 3 - pages/index.vue -->
<script setup>
// Auto-imported composables - no imports needed!
const { data: posts } = await useFetch('/api/posts');
const count = useState('count', () => 0);

// SEO
useSeoMeta({
  title: 'My Blog',
  description: 'A blog built with Nuxt 3'
});

// Route params auto-typed
const route = useRoute();
</script>

<template>
  <div>
    <h1>Blog Posts</h1>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
    
    <div v-if="posts.pending">Loading...</div>
    <div v-else-if="posts.error">Error!</div>
    <ul v-else>
      <li v-for="post in posts.data" :key="post.id">
        <NuxtLink :to="'/posts/' + post.id">
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<!-- server/api/posts.ts -->
export default defineEventHandler(async (event) => {
  const posts = await db.posts.findMany();
  return posts;
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#000000' }}>{ct.nextExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Next.js 14 - app/page.tsx
import Link from 'next/link';
import { useState } from 'react';

// Server Component by default
async function getPosts() {
  const res = await fetch('/api/posts', { 
    cache: 'no-store' 
  });
  return res.json();
}

// Metadata for SEO
export const metadata = {
  title: 'My Blog',
  description: 'A blog built with Next.js 14'
};

// Client Component for interactivity
function Counter() {
  'use client';
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// Page Component
export default async function Home() {
  const posts = await getPosts();
  
  return (
    <div>
      <h1>Blog Posts</h1>
      <Counter />
      
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={'/posts/' + post.id}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await db.posts.findMany();
  return NextResponse.json(posts);
}`}</code></pre>

      <h2 style={h2Style}>{ct.routingTitle}</h2>
      <p style={pStyle}>{ct.routingIntro}</p>

      <pre style={codeStyle}><code>{`# Nuxt 3 Routing
pages/
├── index.vue              # /
├── about.vue              # /about
├── posts/
│   ├── index.vue          # /posts
│   └── [id].vue           # /posts/:id
└── user-[name]/           # /user-:name
    └── [id].vue           # /user-:name/:id

# Next.js 14 App Router
app/
├── page.tsx               # /
├── about/
│   └── page.tsx           # /about
├── posts/
│   ├── page.tsx           # /posts
│   └── [id]/
│       └── page.tsx       # /posts/:id
└── layout.tsx             # Root layout`}</code></pre>

      <h2 style={h2Style}>{ct.dataFetchingTitle}</h2>
      <p style={pStyle}>{ct.dataFetchingIntro}</p>

      <pre style={codeStyle}><code>{`// Nuxt 3 Data Fetching
// useFetch - SSR-friendly fetch
const { data, pending, error } = await useFetch('/api/data');

// useAsyncData - custom async data
const { data } = await useAsyncData('key', () => 
  $fetch('/api/data')
);

// useLazyFetch - client-side lazy loading
const { data } = useLazyFetch('/api/data');

// Next.js 14 Data Fetching
// Server Component - direct fetch
async function Page() {
  const data = await fetch('/api/data', { 
    cache: 'no-store' 
  }).then(r => r.json());
  return <div>{data.title}</div>;
}

// Client Component - SWR or React Query
'use client';
import useSWR from 'swr';

function Page() {
  const { data, error, isLoading } = useSWR('/api/data', fetcher);
  if (isLoading) return <div>Loading...</div>;
  return <div>{data.title}</div>;
}`}</code></pre>

      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Nuxt 3</th>
              <th style={thStyle}>Next.js 14</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vercel', '✓', '✓ (Native)'],
              ['Netlify', '✓', '✓'],
              ['Cloudflare Pages', '✓ (Nitro preset)', '✓'],
              ['AWS', '✓ (Nitro preset)', '✓'],
              ['Docker', '✓', '✓'],
              ['Node.js Server', '✓', '✓'],
              ['Static Hosting', '✓', '✓'],
            ].map(([platform, nuxt, next], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#00dc82' }}>{nuxt}</td>
                <td style={tdStyle}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00dc82' }}>
          <strong style={{ color: '#00dc82' }}>Nuxt 3 Ecosystem</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '50+官方模块，社区模块众多。主要模块：@nuxtjs/tailwindcss、@nuxt/image、@nuxtjs/i18n、@nuxtjs/supabase、@pinia/nuxt。Vue生态系统完全可用。' : '50+ official modules, many community modules. Key modules: @nuxtjs/tailwindcss, @nuxt/image, @nuxtjs/i18n, @nuxtjs/supabase, @pinia/nuxt. Full Vue ecosystem available.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #000000' }}>
          <strong style={{ color: '#000000' }}>Next.js 14 Ecosystem</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '最大的React生态系统。Vercel模板、大量示例、企业集成。几乎所有React库都兼容。Prisma、tRPC、NextAuth.js深度集成。' : 'Largest React ecosystem. Vercel templates, extensive examples, enterprise integrations. Nearly all React libraries compatible. Deep Prisma, tRPC, NextAuth.js integration.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00dc82' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00dc82' }}>{ct.nuxtBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '团队熟悉Vue' : 'Team familiar with Vue'}</li>
            <li>{isZh ? '重视开发者体验' : 'Value developer experience'}</li>
            <li>{isZh ? '需要约定优于配置' : 'Want convention over configuration'}</li>
            <li>{isZh ? '喜欢组合式API' : 'Prefer Composition API'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '灵活部署目标' : 'Flexible deployment targets'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000000' }}>{ct.nextBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '团队熟悉React' : 'Team familiar with React'}</li>
            <li>{isZh ? '最大生态系统需求' : 'Need largest ecosystem'}</li>
            <li>{isZh ? '服务器组件优先' : 'Server Components priority'}</li>
            <li>{isZh ? 'Vercel部署' : 'Vercel deployment'}</li>
            <li>{isZh ? '企业级项目' : 'Enterprise projects'}</li>
            <li>{isZh ? '最多工作机会' : 'Maximum job opportunities'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(0,220,130,0.1), rgba(0,0,0,0.05))', borderRadius: 12, border: '1px solid rgba(0,220,130,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#00dc82', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#00dc82', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#00dc82', textDecoration: 'none' }}>JWT Decoder</a>
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
