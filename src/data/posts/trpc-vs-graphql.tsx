'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'tRPC vs GraphQL: End-to-End Type Safety vs Flexible Query Language',
    intro: 'GraphQL revolutionized API development with its flexible query language, but tRPC offers a compelling alternative for TypeScript projects with zero-setup type safety. This comparison examines performance, developer experience, and when to choose each approach.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'tRPC provides automatic end-to-end type safety without schema definitions, ideal for TypeScript monorepos. GraphQL offers language-agnostic flexibility and powerful tooling. Choose tRPC for TypeScript-only full-stack apps; choose GraphQL for public APIs, microservices, or multi-client applications.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'tRPC requires zero schema definition - types flow automatically from server to client',
    takeaway2: 'GraphQL provides superior flexibility for public APIs and multi-client scenarios',
    takeaway3: 'tRPC has 10x smaller bundle size and simpler setup',
    takeaway4: 'GraphQL offers better caching with normalized stores (Apollo, Relay)',
    takeaway5: 'tRPC is TypeScript-only; GraphQL works with any language',
    takeaway6: 'Both provide excellent autocompletion and type safety in TypeScript',
    
    whatIsTRPC: 'What is tRPC?',
    whatIsTRPCContent: 'tRPC (TypeScript Remote Procedure Call) is a library for building end-to-end typesafe APIs without schemas or code generation. Created by Alex Johansson in 2021, it leverages TypeScript\'s inference capabilities to automatically share types between server and client code.',
    
    whatIsGraphQLTitle: 'What is GraphQL?',
    whatIsGraphQLContent: 'GraphQL, created by Facebook in 2015, is a query language for APIs and a runtime for executing queries. It provides a complete description of data in your API, giving clients the power to ask for exactly what they need, making it easier to evolve APIs over time.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks across different metrics:',
    
    devExperienceTitle: 'Developer Experience',
    devExperienceIntro: 'Setup complexity and daily workflow comparison:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comprehensive feature comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'See how both approaches handle typical API operations:',
    
    trpcExample: 'tRPC Implementation',
    graphqlExample: 'GraphQL Implementation',
    
    cachingTitle: 'Caching & Performance',
    cachingIntro: 'How each handles data caching:',
    
    ecosystemTitle: 'Ecosystem & Tooling',
    ecosystemIntro: 'Available tools and integrations:',
    
    whenToUseTitle: 'When to Use Each',
    trpcBestFor: 'Use tRPC When:',
    graphqlBestFor: 'Use GraphQL When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, tRPC and GraphQL serve different needs. tRPC excels for TypeScript monorepos and internal APIs where development speed and type safety are paramount. GraphQL remains the choice for public APIs, complex data graphs, and multi-client applications. Many teams use both: GraphQL for external APIs and tRPC for internal communication.',
    
    faq1q: 'Can I use tRPC with non-TypeScript clients?',
    faq1a: 'tRPC is TypeScript-first. While you can use it with JavaScript, you lose type safety. For non-TypeScript clients, consider using tRPC\'s OpenAPI integration or stick with GraphQL/REST.',
    
    faq2q: 'Is GraphQL slower than tRPC?',
    faq2a: 'Raw performance is similar, but tRPC often feels faster in development due to zero build step. GraphQL\'s flexibility can lead to over-fetching if queries aren\'t optimized. Both can be optimized for production.',
    
    faq3q: 'Can I migrate from tRPC to GraphQL later?',
    faq3a: 'Yes, but it requires defining a GraphQL schema and rewriting resolvers. Consider your long-term API strategy: if you\'ll need GraphQL\'s flexibility later, starting with GraphQL may be easier.',
    
    faq4q: 'Does tRPC work with Next.js App Router?',
    faq4a: 'Yes! tRPC has excellent Next.js integration with both Pages and App Router support. The team maintains official integration packages with streaming and RSC support.',
    
    faq5q: 'Which has better caching?',
    faq5a: 'GraphQL has more mature caching solutions (Apollo, Relay, URQL) with normalized caching. tRPC relies more on React Query\'s caching. For complex caching needs, GraphQL often has better tooling.',
    
    faq6q: 'Is tRPC production-ready?',
    faq6a: 'Absolutely. Companies like Netflix, TikTok, and Vercel use tRPC in production. It has over 2M weekly downloads on npm and is actively maintained with regular updates.',
    
    faq7q: 'Can I use both tRPC and GraphQL together?',
    faq7a: 'Yes, they can coexist. Use tRPC for internal TypeScript-to-TypeScript communication and GraphQL for external/public APIs. Many teams adopt this hybrid approach.',
    
    faq8q: 'What about learning curve?',
    faq8a: 'tRPC is simpler if you know TypeScript. GraphQL has more concepts (schema, resolvers, fragments) but is language-agnostic. tRPC learning curve is 1-2 days; GraphQL takes 1-2 weeks to master.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'tRPC vs GraphQL：端到端类型安全 vs 灵活查询语言',
    intro: 'GraphQL以其灵活的查询语言革新了API开发，但tRPC为TypeScript项目提供了无需配置类型安全的替代方案。本比较考察性能、开发者体验以及何时选择每种方法。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'tRPC无需schema定义即可提供自动的端到端类型安全，非常适合TypeScript monorepo。GraphQL提供语言无关的灵活性和强大的工具。TypeScript全栈应用选择tRPC；公共API、微服务或多客户端应用选择GraphQL。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'tRPC无需schema定义 - 类型自动从服务端流向客户端',
    takeaway2: 'GraphQL为公共API和多客户端场景提供卓越的灵活性',
    takeaway3: 'tRPC的包体积小10倍，设置更简单',
    takeaway4: 'GraphQL通过规范化存储提供更好的缓存（Apollo、Relay）',
    takeaway5: 'tRPC仅支持TypeScript；GraphQL支持任何语言',
    takeaway6: '两者都在TypeScript中提供出色的自动补全和类型安全',
    
    whatIsTRPC: '什么是tRPC？',
    whatIsTRPCContent: 'tRPC（TypeScript远程过程调用）是一个用于构建端到端类型安全API的库，无需schema或代码生成。由Alex Johansson于2021年创建，它利用TypeScript的推断能力在服务端和客户端代码之间自动共享类型。',
    
    whatIsGraphQLTitle: '什么是GraphQL？',
    whatIsGraphQLContent: 'GraphQL由Facebook于2015年创建，是一种用于API的查询语言和执行查询的运行时。它提供API中数据的完整描述，让客户端能够准确请求所需内容，使API更容易随时间演进。',
    
    performanceTitle: '性能对比',
    performanceIntro: '不同指标的性能基准测试：',
    
    devExperienceTitle: '开发者体验',
    devExperienceIntro: '设置复杂性和日常工作流对比：',
    
    featuresTitle: '功能对比',
    featuresIntro: '全面的功能比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '看看两种方法如何处理典型API操作：',
    
    trpcExample: 'tRPC实现',
    graphqlExample: 'GraphQL实现',
    
    cachingTitle: '缓存与性能',
    cachingIntro: '各自如何处理数据缓存：',
    
    ecosystemTitle: '生态系统与工具',
    ecosystemIntro: '可用的工具和集成：',
    
    whenToUseTitle: '何时使用每种方案',
    trpcBestFor: '使用tRPC的场景：',
    graphqlBestFor: '使用GraphQL的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，tRPC和GraphQL服务于不同的需求。tRPC在TypeScript monorepo和内部API方面表现出色，开发速度和类型安全至关重要。GraphQL仍然是公共API、复杂数据图和多客户端应用的选择。许多团队同时使用两者：GraphQL用于外部API，tRPC用于内部通信。',
    
    faq1q: '我可以在非TypeScript客户端使用tRPC吗？',
    faq1a: 'tRPC是TypeScript优先的。虽然可以在JavaScript中使用，但会失去类型安全。对于非TypeScript客户端，考虑使用tRPC的OpenAPI集成或坚持使用GraphQL/REST。',
    
    faq2q: 'GraphQL比tRPC慢吗？',
    faq2a: '原始性能相似，但tRPC在开发中通常感觉更快，因为没有构建步骤。如果查询未优化，GraphQL的灵活性可能导致过度获取。两者都可以为生产进行优化。',
    
    faq3q: '我可以稍后从tRPC迁移到GraphQL吗？',
    faq3a: '可以，但需要定义GraphQL schema并重写resolver。考虑你的长期API策略：如果以后需要GraphQL的灵活性，从GraphQL开始可能更容易。',
    
    faq4q: 'tRPC支持Next.js App Router吗？',
    faq4a: '支持！tRPC与Next.js集成出色，支持Pages和App Router。团队维护官方集成包，支持流式传输和RSC。',
    
    faq5q: '哪个缓存更好？',
    faq5a: 'GraphQL有更成熟的缓存解决方案（Apollo、Relay、URQL），具有规范化缓存。tRPC更多依赖React Query的缓存。对于复杂的缓存需求，GraphQL通常有更好的工具。',
    
    faq6q: 'tRPC已经可以用于生产了吗？',
    faq6a: '当然。Netflix、TikTok和Vercel等公司在生产中使用tRPC。它在npm上每周有超过200万次下载，积极维护并定期更新。',
    
    faq7q: '我可以同时使用tRPC和GraphQL吗？',
    faq7a: '可以，它们可以共存。使用tRPC进行内部TypeScript到TypeScript的通信，GraphQL用于外部/公共API。许多团队采用这种混合方法。',
    
    faq8q: '学习曲线如何？',
    faq8a: '如果你了解TypeScript，tRPC更简单。GraphQL有更多概念（schema、resolver、fragment），但与语言无关。tRPC学习曲线为1-2天；GraphQL需要1-2周掌握。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TRPCvsGraphQL({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsTRPC}</h3>
      <p style={pStyle}>{ct.whatIsTRPCContent}</p>

      <h3 style={h3Style}>{ct.whatIsGraphQLTitle}</h3>
      <p style={pStyle}>{ct.whatIsGraphQLContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>tRPC</th>
              <th style={thStyle}>GraphQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2021', '2015'],
              [isZh ? '类型系统' : 'Type System', 'TypeScript inference', 'Schema Definition Language'],
              [isZh ? '语言支持' : 'Language Support', 'TypeScript only', 'Any language'],
              [isZh ? 'Schema定义' : 'Schema Required', 'No', 'Yes'],
              [isZh ? '代码生成' : 'Code Generation', 'Not required', 'Optional'],
              [isZh ? '学习曲线' : 'Learning Curve', '1-2 days', '1-2 weeks'],
              [isZh ? '客户端包大小' : 'Client Bundle', '~10KB', '~100KB+'],
              [isZh ? '运行时' : 'Runtime', 'HTTP/WebSocket', 'HTTP'],
            ].map(([feature, trpc, graphql], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#10b981' }}>{trpc}</td>
                <td style={tdStyle}>{graphql}</td>
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
              <th style={thStyle}>tRPC</th>
              <th style={thStyle}>GraphQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '设置时间' : 'Setup Time', '~5 minutes', '~1-2 hours'],
              [isZh ? '开发速度' : 'Development Speed', 'Very fast', 'Fast'],
              [isZh ? '类型安全' : 'Type Safety', 'Automatic', 'Schema-based'],
              [isZh ? '网络请求' : 'Network Requests', 'Batched automatically', 'Single query'],
              [isZh ? '缓存策略' : 'Caching', 'React Query', 'Apollo/Relay/URQL'],
              [isZh ? '订阅支持' : 'Subscriptions', 'WebSocket', 'WebSocket/SSE'],
              [isZh ? '错误处理' : 'Error Handling', 'Type-safe', 'Schema-defined'],
            ].map(([metric, trpc, graphql], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#10b981' }}>{trpc}</td>
                <td style={tdStyle}>{graphql}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.trpcExample}</h3>
      <pre style={codeStyle}><code>{`// Server - tRPC Router
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await db.user.findUnique({
        where: { id: input.id }
      });
      return user;
    }),
    
  createUser: t.procedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const user = await db.user.create({
        data: input
      });
      return user;
    }),
    
  getUsers: t.procedure
    .query(async () => {
      return db.user.findMany();
    }),
});

export type AppRouter = typeof appRouter;

// Client - React Component
import { trpc } from '../utils/trpc';

function UserList() {
  const users = trpc.getUsers.useQuery();
  const createUser = trpc.createUser.useMutation();
  
  const handleCreate = async () => {
    await createUser.mutateAsync({
      name: 'John Doe',
      email: 'john@example.com',
    });
  };
  
  // TypeScript knows the exact shape of users.data!
  return (
    <div>
      {users.data?.map(user => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
      <button onClick={handleCreate}>Create User</button>
    </div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#e535ab' }}>{ct.graphqlExample}</h3>
      <pre style={codeStyle}><code>{`// GraphQL Schema
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  getUser(id: ID!): User
  getUsers: [User!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
}

// Resolvers
const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return db.user.findUnique({ where: { id } });
    },
    getUsers: async () => {
      return db.user.findMany();
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return db.user.create({
        data: { name, email }
      });
    },
  },
};

// Client - React Component with Apollo
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_USERS = gql\`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
\`;

const CREATE_USER = gql\`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
\`;

function UserList() {
  const { data, loading } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  
  const handleCreate = async () => {
    await createUser({
      variables: {
        name: 'John Doe',
        email: 'john@example.com',
      }
    });
  };
  
  return (
    <div>
      {data?.getUsers.map(user => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
      <button onClick={handleCreate}>Create User</button>
    </div>
  );
}`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>tRPC</th>
              <th style={thStyle}>GraphQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自动类型推断' : 'Auto Type Inference', '✓', '✗ (requires codegen)'],
              [isZh ? 'Schema定义' : 'Schema Definition', 'Not needed', 'Required'],
              [isZh ? '多语言支持' : 'Multi-language', '✗', '✓'],
              [isZh ? '规范化缓存' : 'Normalized Cache', '✗', '✓'],
              [isZh ? '批量请求' : 'Request Batching', '✓ Automatic', '✓ Manual'],
              [isZh ? '实时订阅' : 'Live Subscriptions', '✓', '✓'],
              [isZh ? '工具生态' : 'Tooling Ecosystem', 'Growing', 'Mature'],
              [isZh ? '学习曲线' : 'Learning Curve', 'Low', 'Medium'],
              [isZh ? '公开API' : 'Public APIs', '✗', '✓'],
              [isZh ? '开发工具' : 'DevTools', 'Browser DevTools', 'Apollo DevTools'],
            ].map(([feature, trpc, graphql], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{trpc}</td>
                <td style={tdStyle}>{graphql}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ecosystem */}
      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>tRPC Ecosystem</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>@trpc/client</li>
            <li>@trpc/server</li>
            <li>@trpc/react-query</li>
            <li>@trpc/next</li>
            <li>@trpc/superjson (JSON serialization)</li>
            <li>Zod integration</li>
            <li>Prisma integration</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #e535ab' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#e535ab' }}>GraphQL Ecosystem</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>Apollo Client & Server</li>
            <li>Relay Modern</li>
            <li>URQL</li>
            <li>GraphQL Code Generator</li>
            <li>GraphQL Playground</li>
            <li>Hasura (instant GraphQL)</li>
            <li>Prisma (GraphQL integration)</li>
          </ul>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>{ct.trpcBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'TypeScript全栈项目' : 'TypeScript full-stack apps'}</li>
            <li>{isZh ? '内部API' : 'Internal APIs'}</li>
            <li>{isZh ? 'Monorepo架构' : 'Monorepo architecture'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '小团队开发' : 'Small team development'}</li>
            <li>{isZh ? 'Next.js应用' : 'Next.js applications'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #e535ab' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#e535ab' }}>{ct.graphqlBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '公共API' : 'Public APIs'}</li>
            <li>{isZh ? '多客户端应用' : 'Multi-client applications'}</li>
            <li>{isZh ? '复杂数据图' : 'Complex data graphs'}</li>
            <li>{isZh ? '微服务架构' : 'Microservices architecture'}</li>
            <li>{isZh ? '第三方集成' : 'Third-party integrations'}</li>
            <li>{isZh ? '多语言团队' : 'Multi-language teams'}</li>
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
