'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Supabase vs Firebase 2025: Backend-as-a-Service Comparison',
    intro: 'Firebase has long been the go-to backend-as-a-service, but Supabase has emerged as a powerful open-source alternative built on PostgreSQL. This comprehensive comparison examines databases, authentication, real-time features, pricing, and developer experience to help you choose the right BaaS for your project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Supabase offers superior database capabilities with full PostgreSQL, better data portability, and predictable pricing. Firebase excels in rapid prototyping, real-time sync, and Google Cloud integration. For production apps requiring complex queries and data ownership, choose Supabase. For quick MVPs and tight Google ecosystem integration, Firebase remains excellent.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Supabase uses PostgreSQL with full SQL capabilities, Firebase uses NoSQL document store',
    takeaway2: 'Supabase pricing is more predictable, Firebase can get expensive at scale',
    takeaway3: 'Firebase has better real-time sync out of the box',
    takeaway4: 'Supabase offers better data portability and no vendor lock-in',
    takeaway5: 'Both provide authentication, storage, and serverless functions',
    takeaway6: 'Supabase is open source and self-hostable, Firebase is proprietary',
    
    whatIsSupabaseTitle: 'What is Supabase?',
    whatIsSupabaseContent: 'Supabase is an open-source Firebase alternative built on top of PostgreSQL. Launched in 2020, it provides a full backend including database, authentication, real-time subscriptions, storage, and edge functions. Unlike Firebase, Supabase gives you direct access to PostgreSQL with all its features like joins, triggers, and stored procedures.',
    
    whatIsFirebaseTitle: 'What is Firebase?',
    whatIsFirebaseContent: 'Firebase, acquired by Google in 2014, is a comprehensive app development platform. It offers real-time NoSQL database (Firestore), authentication, hosting, cloud functions, storage, and analytics. With millions of apps built on it, Firebase remains one of the most popular backend-as-a-service platforms.',
    
    databaseTitle: 'Database Comparison',
    databaseIntro: 'Core database capabilities:',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost analysis for different project sizes:',
    
    authTitle: 'Authentication Features',
    authIntro: 'Authentication and user management:',
    
    realtimeTitle: 'Real-time Capabilities',
    realtimeIntro: 'Real-time data synchronization:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Implementation comparison:',
    
    supabaseExampleTitle: 'Supabase',
    firebaseExampleTitle: 'Firebase',
    
    storageTitle: 'Storage Comparison',
    storageIntro: 'File storage capabilities:',
    
    functionsTitle: 'Serverless Functions',
    functionsIntro: 'Edge and cloud functions:',
    
    selfHostingTitle: 'Self-Hosting & Portability',
    selfHostingIntro: 'Control over your infrastructure:',
    
    whenToUseTitle: 'When to Use Each Platform',
    supabaseBestFor: 'Use Supabase When:',
    firebaseBestFor: 'Use Firebase When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between Supabase and Firebase depends on your priorities. Supabase is ideal for projects requiring complex data relationships, SQL capabilities, data portability, and cost predictability. It is the clear winner for teams valuing open-source and avoiding vendor lock-in. Firebase excels for rapid prototyping, real-time collaborative apps, and teams deeply integrated with Google Cloud. Both platforms are production-ready and serve millions of users. For most new projects starting fresh, Supabase offers better long-term value.',
    
    faq1q: 'Can I migrate from Firebase to Supabase?',
    faq1a: 'Yes, Supabase provides migration tools and guides for moving from Firebase. The main consideration is converting NoSQL document structure to relational PostgreSQL tables, which often results in a cleaner data model.',
    
    faq2q: 'Which is better for mobile apps?',
    faq2a: 'Both work well for mobile. Firebase has slightly better offline support and SDKs. Supabase has excellent mobile SDKs and its REST API works with any HTTP client. For complex data relationships, Supabase is superior.',
    
    faq3q: 'Does Supabase support offline mode?',
    faq3a: 'Supabase does not have built-in offline support like Firebase. However, you can implement offline-first patterns using local storage and sync when online. Third-party libraries like WatermelonDB integrate well with Supabase.',
    
    faq4q: 'How does pricing compare at scale?',
    faq4a: 'Supabase pricing is more predictable with generous free tier and clear per-GB pricing. Firebase pricing can spike unexpectedly due to document reads/writes. At scale, Supabase typically costs 30-50% less.',
    
    faq5q: 'Can I self-host Supabase?',
    faq5a: 'Yes, Supabase is fully open source and can be self-hosted on any infrastructure. You can use Docker Compose or deploy to AWS, GCP, Azure, or your own servers.',
    
    faq6q: 'Which has better real-time features?',
    faq6a: 'Firebase has more mature real-time sync with automatic conflict resolution. Supabase uses PostgreSQL replication for real-time and is catching up quickly. For most use cases, both work well.',
    
    faq7q: 'What about edge functions?',
    faq7a: 'Both offer serverless functions. Supabase Edge Functions run on Deno Deploy globally. Firebase Cloud Functions run on Google Cloud. Supabase functions have lower cold-start times.',
    
    faq8q: 'Is Supabase production-ready?',
    faq8a: 'Yes, Supabase is production-ready and used by companies like GitHub, 1Password, and PWC. It has SOC2 compliance, 99.9% SLA on Pro plans, and serves billions of requests monthly.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Supabase vs Firebase 2025：后端即服务对比',
    intro: 'Firebase长期以来一直是后端即服务的首选，但Supabase作为基于PostgreSQL构建的强大开源替代品已经崛起。本全面比较考察数据库、认证、实时功能、定价和开发者体验，帮助你为项目选择合适的BaaS。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Supabase通过完整的PostgreSQL提供卓越的数据库能力、更好的数据可移植性和可预测的定价。Firebase在快速原型开发、实时同步和Google Cloud集成方面表现出色。对于需要复杂查询和数据所有权的生产应用，选择Supabase。对于快速MVP和紧密的Google生态系统集成，Firebase仍然非常出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Supabase使用具有完整SQL功能的PostgreSQL，Firebase使用NoSQL文档存储',
    takeaway2: 'Supabase定价更可预测，Firebase在规模扩展时可能变得昂贵',
    takeaway3: 'Firebase开箱即用具有更好的实时同步',
    takeaway4: 'Supabase提供更好的数据可移植性和无供应商锁定',
    takeaway5: '两者都提供认证、存储和无服务器函数',
    takeaway6: 'Supabase是开源且可自托管的，Firebase是专有的',
    
    whatIsSupabaseTitle: '什么是Supabase？',
    whatIsSupabaseContent: 'Supabase是基于PostgreSQL构建的开源Firebase替代品。于2020年推出，它提供完整的后端，包括数据库、认证、实时订阅、存储和边缘函数。与Firebase不同，Supabase让你直接访问PostgreSQL及其所有功能，如连接、触发器和存储过程。',
    
    whatIsFirebaseTitle: '什么是Firebase？',
    whatIsFirebaseContent: 'Firebase于2014年被Google收购，是一个全面的应用开发平台。它提供实时NoSQL数据库（Firestore）、认证、托管、云函数、存储和分析。已有数百万应用在其上构建，Firebase仍然是最受欢迎的后端即服务平台之一。',
    
    databaseTitle: '数据库对比',
    databaseIntro: '核心数据库能力：',
    
    pricingTitle: '定价对比',
    pricingIntro: '不同项目规模的成本分析：',
    
    authTitle: '认证功能',
    authIntro: '认证和用户管理：',
    
    realtimeTitle: '实时能力',
    realtimeIntro: '实时数据同步：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '实现比较：',
    
    supabaseExampleTitle: 'Supabase',
    firebaseExampleTitle: 'Firebase',
    
    storageTitle: '存储对比',
    storageIntro: '文件存储能力：',
    
    functionsTitle: '无服务器函数',
    functionsIntro: '边缘和云函数：',
    
    selfHostingTitle: '自托管与可移植性',
    selfHostingIntro: '对基础设施的控制：',
    
    whenToUseTitle: '何时使用每个平台',
    supabaseBestFor: '使用Supabase的场景：',
    firebaseBestFor: '使用Firebase的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Supabase和Firebase之间的选择取决于你的优先级。Supabase非常适合需要复杂数据关系、SQL能力、数据可移植性和成本可预测性的项目。对于重视开源和避免供应商锁定的团队，它是明显的赢家。Firebase在快速原型开发、实时协作应用和与Google Cloud深度集成的团队方面表现出色。两个平台都已可用于生产，服务数百万用户。对于大多数从头开始的新项目，Supabase提供更好的长期价值。',
    
    faq1q: '我可以从Firebase迁移到Supabase吗？',
    faq1a: '可以，Supabase提供迁移工具和指南用于从Firebase迁移。主要考虑是将NoSQL文档结构转换为关系型PostgreSQL表，这通常会产生更清晰的数据模型。',
    
    faq2q: '哪个更适合移动应用？',
    faq2a: '两者都适用于移动应用。Firebase有稍好的离线支持和SDK。Supabase有出色的移动SDK，其REST API可与任何HTTP客户端一起使用。对于复杂数据关系，Supabase更优。',
    
    faq3q: 'Supabase支持离线模式吗？',
    faq3a: 'Supabase没有像Firebase那样的内置离线支持。但是，你可以使用本地存储实现离线优先模式，并在在线时同步。WatermelonDB等第三方库与Supabase集成良好。',
    
    faq4q: '规模扩展时定价如何比较？',
    faq4a: 'Supabase定价更可预测，有慷慨的免费层和清晰的每GB定价。由于文档读/写，Firebase定价可能会意外飙升。在规模上，Supabase通常便宜30-50%。',
    
    faq5q: '我可以自托管Supabase吗？',
    faq5a: '可以，Supabase是完全开源的，可以在任何基础设施上自托管。你可以使用Docker Compose或部署到AWS、GCP、Azure或你自己的服务器。',
    
    faq6q: '哪个有更好的实时功能？',
    faq6a: 'Firebase具有更成熟的实时同步和自动冲突解决。Supabase使用PostgreSQL复制进行实时，正在快速追赶。对于大多数用例，两者都工作良好。',
    
    faq7q: '边缘函数呢？',
    faq7a: '两者都提供无服务器函数。Supabase边缘函数在Deno Deploy上全局运行。Firebase云函数在Google Cloud上运行。Supabase函数具有更低的冷启动时间。',
    
    faq8q: 'Supabase已经可以用于生产了吗？',
    faq8a: '是的，Supabase已可用于生产，被GitHub、1Password和PWC等公司使用。它具有SOC2合规性，Pro计划有99.9%的SLA，每月服务数十亿请求。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SupabaseVsFirebase2025({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsSupabaseTitle}</h3>
      <p style={pStyle}>{ct.whatIsSupabaseContent}</p>

      <h3 style={h3Style}>{ct.whatIsFirebaseTitle}</h3>
      <p style={pStyle}>{ct.whatIsFirebaseContent}</p>

      <h2 style={h2Style}>{ct.databaseTitle}</h2>
      <p style={pStyle}>{ct.databaseIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Firebase Firestore</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据库类型' : 'Database Type', 'NoSQL Document', 'PostgreSQL (Relational)'],
              [isZh ? '查询能力' : 'Query Capability', isZh ? '基础（无连接）' : 'Basic (no joins)', isZh ? '完整SQL' : 'Full SQL'],
              [isZh ? '复杂查询' : 'Complex Queries', isZh ? '有限' : 'Limited', '✓'],
              [isZh ? '事务' : 'Transactions', '✓', '✓ (ACID)'],
              [isZh ? '全文搜索' : 'Full-text Search', isZh ? '需额外服务' : 'Requires extension', '✓ Built-in'],
              [isZh ? '行级安全' : 'Row Level Security', '✓', '✓'],
              [isZh ? '数据库触发器' : 'Database Triggers', '✗', '✓'],
              [isZh ? '存储过程' : 'Stored Procedures', '✗', '✓'],
            ].map(([feature, firebase, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{firebase}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目规模' : 'Project Size'}</th>
              <th style={thStyle}>Firebase</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', '1GB storage, 50K reads/day', '500MB database, 1GB storage'],
              [isZh ? '小型项目' : 'Small Project', '~$25/month', '$25/month'],
              [isZh ? '中型项目' : 'Medium Project', '~$100-300/month', '$25-75/month'],
              [isZh ? '大型项目' : 'Large Project', '~$500-2000/month', '$75-575/month'],
              [isZh ? '可预测性' : 'Predictability', isZh ? '低（按使用计费）' : 'Low (usage-based)', isZh ? '高' : 'High'],
            ].map(([size, firebase, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{size}</td>
                <td style={tdStyle}>{firebase}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.supabaseExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Supabase: Creating and querying data
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Insert data
const { data, error } = await supabase
  .from('users')
  .insert([
    { email: 'user@example.com', name: 'John' }
  ]);

// Complex query with joins
const { data: posts } = await supabase
  .from('posts')
  .select(\`
    id,
    title,
    content,
    users (
      id,
      name,
      email
    ),
    comments (
      id,
      text
    )
  \`)
  .eq('published', true)
  .order('created_at', { ascending: false })
  .limit(10);

// Real-time subscription
supabase
  .channel('public:posts')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public' },
    (payload) => console.log(payload)
  )
  .subscribe();`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.firebaseExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Firebase: Creating and querying data
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, orderBy, limit } from 'firebase/firestore';

const db = getFirestore(app);

// Insert data
await addDoc(collection(db, 'users'), {
  email: 'user@example.com',
  name: 'John',
  createdAt: serverTimestamp()
});

// Query (no joins - need separate queries or denormalization)
const q = query(
  collection(db, 'posts'),
  where('published', '==', true),
  orderBy('createdAt', 'desc'),
  limit(10)
);

const snapshot = await getDocs(q);
const posts = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));

// Need separate query for user data
const userIds = [...new Set(posts.map(p => p.userId))];
const usersSnapshot = await getDocs(
  query(collection(db, 'users'), where('id', 'in', userIds))
);

// Real-time listener
onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      console.log('New post:', change.doc.data());
    }
  });
});`}</code></pre>

      <h2 style={h2Style}>{ct.authTitle}</h2>
      <p style={pStyle}>{ct.authIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Firebase</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '邮箱/密码' : 'Email/Password', '✓', '✓'],
              [isZh ? 'OAuth (Google, GitHub等)' : 'OAuth (Google, GitHub, etc)', '✓', '✓'],
              [isZh ? '匿名登录' : 'Anonymous Login', '✓', '✓'],
              [isZh ? '手机认证' : 'Phone Auth', '✓', '✓'],
              [isZh ? '魔法链接' : 'Magic Links', '✓', '✓'],
              [isZh ? '多因素认证' : 'MFA', '✓', '✓'],
              [isZh ? 'JWT令牌' : 'JWT Tokens', '✓', '✓'],
              [isZh ? '用户元数据' : 'User Metadata', '✓', '✓'],
            ].map(([feature, firebase, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{firebase}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.realtimeTitle}</h2>
      <p style={pStyle}>{ct.realtimeIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Firebase</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '自动实时同步，内置冲突解决，离线优先设计。所有Firestore数据默认支持实时监听。' : 'Automatic real-time sync, built-in conflict resolution, offline-first design. All Firestore data supports real-time listeners by default.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>Supabase</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '基于PostgreSQL复制，支持INSERT/UPDATE/DELETE事件。需要明确订阅特定表和事件。正在快速发展中。' : 'Based on PostgreSQL replication, supports INSERT/UPDATE/DELETE events. Requires explicit subscription to specific tables and events. Rapidly evolving.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.selfHostingTitle}</h2>
      <p style={pStyle}>{ct.selfHostingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Firebase</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自托管' : 'Self-hosting', '✗', '✓'],
              [isZh ? '开源' : 'Open Source', '✗', '✓ (MIT License)'],
              [isZh ? '数据导出' : 'Data Export', isZh ? '需工具' : 'Requires tools', isZh ? '直接SQL/pg_dump' : 'Direct SQL/pg_dump'],
              [isZh ? '供应商锁定' : 'Vendor Lock-in', isZh ? '高' : 'High', isZh ? '无' : 'None'],
              [isZh ? 'Docker部署' : 'Docker Deploy', '✗', '✓'],
            ].map(([feature, firebase, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{firebase}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.supabaseBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂数据关系' : 'Complex data relationships'}</li>
            <li>{isZh ? 'SQL经验团队' : 'Teams with SQL experience'}</li>
            <li>{isZh ? '成本敏感项目' : 'Cost-sensitive projects'}</li>
            <li>{isZh ? '需要数据所有权' : 'Need data ownership'}</li>
            <li>{isZh ? '自托管需求' : 'Self-hosting needs'}</li>
            <li>{isZh ? '避免供应商锁定' : 'Avoid vendor lock-in'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.firebaseBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '实时协作应用' : 'Real-time collaborative apps'}</li>
            <li>{isZh ? 'Google Cloud用户' : 'Google Cloud users'}</li>
            <li>{isZh ? '简单数据模型' : 'Simple data models'}</li>
            <li>{isZh ? '离线优先移动应用' : 'Offline-first mobile apps'}</li>
            <li>{isZh ? '快速上市时间' : 'Quick time to market'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
