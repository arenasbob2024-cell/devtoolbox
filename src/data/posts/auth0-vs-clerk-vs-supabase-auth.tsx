'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Auth0 vs Clerk vs Supabase Auth: Authentication Platform Comparison',
    intro: 'Auth0, Clerk, and Supabase Auth are three leading authentication platforms for modern applications. Each offers unique approaches to identity management, from enterprise-grade solutions to developer-friendly APIs. This comparison examines their features, pricing, and ideal use cases to help you choose the right auth solution.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Auth0 for enterprise features and compliance requirements. Choose Clerk for the best developer experience and quick integration. Choose Supabase Auth when using Supabase ecosystem or need open-source flexibility with PostgreSQL backend.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Auth0 offers enterprise features like SSO, MFA, and compliance out of the box',
    takeaway2: 'Clerk provides the fastest integration with pre-built UI components',
    takeaway3: 'Supabase Auth is open-source with PostgreSQL integration',
    takeaway4: 'Auth0 has the highest enterprise adoption and compliance certifications',
    takeaway5: 'Clerk excels in React/Next.js ecosystem with great DX',
    takeaway6: 'Supabase Auth offers Row Level Security for database-level auth',
    
    whatIsAuth0Title: 'What is Auth0?',
    whatIsAuth0Content: 'Auth0 (now part of Okta) is an enterprise-grade identity platform launched in 2013. It provides comprehensive authentication and authorization services with support for social logins, SSO, MFA, and compliance standards like SOC2, HIPAA, and GDPR. Auth0 is widely used by enterprises for its flexibility and security features.',
    
    whatIsClerkTitle: 'What is Clerk?',
    whatIsClerkContent: 'Clerk is a modern authentication platform focused on developer experience. Founded in 2020, it offers pre-built UI components, user management, and organization features specifically designed for React and Next.js applications. Clerk emphasizes quick integration and beautiful, customizable interfaces.',
    
    whatIsSupabaseAuthTitle: 'What is Supabase Auth?',
    whatIsSupabaseAuthContent: 'Supabase Auth is the authentication component of Supabase, an open-source Firebase alternative. Built on top of PostgreSQL, it offers authentication with Row Level Security (RLS) integration, social logins, and real-time capabilities. It is part of the larger Supabase ecosystem including database, storage, and edge functions.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Implementation Examples',
    codeExampleIntro: 'Authentication setup and usage:',
    
    auth0ExampleTitle: 'Auth0 Configuration',
    clerkExampleTitle: 'Clerk Configuration',
    supabaseExampleTitle: 'Supabase Auth Configuration',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost structure and free tier limits:',
    
    useCasesTitle: 'Best Use Cases',
    auth0BestFor: 'Auth0 is Best For:',
    clerkBestFor: 'Clerk is Best For:',
    supabaseBestFor: 'Supabase Auth is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Auth0, Clerk, and Supabase Auth serve different needs. Auth0 is ideal for enterprises requiring compliance, SSO, and complex identity workflows. Clerk excels for startups and developers wanting the fastest integration with beautiful UI. Supabase Auth is perfect for those invested in the Supabase ecosystem or needing open-source solutions with database-level security. Your choice depends on your project requirements, tech stack, and scale.',
    
    faq1q: 'Which platform is easiest to integrate?',
    faq1a: 'Clerk is the easiest to integrate, especially for React/Next.js applications. It provides pre-built components that can be added with minimal code. Auth0 requires more configuration but offers comprehensive SDKs. Supabase Auth is straightforward if using the Supabase client library.',
    
    faq2q: 'Which is best for enterprise compliance?',
    faq2a: 'Auth0 is the clear winner for enterprise compliance with SOC2, HIPAA, ISO 27001, and GDPR certifications. It offers enterprise SSO, advanced MFA, and audit logs. Clerk and Supabase Auth are improving but do not yet match Auth0 compliance coverage.',
    
    faq3q: 'Can I use Supabase Auth without Supabase database?',
    faq3a: 'Technically yes, but you lose the main benefit of Row Level Security integration. Supabase Auth works best when used with Supabase PostgreSQL database. If you need standalone auth, Auth0 or Clerk might be better choices.',
    
    faq4q: 'How do pricing models compare?',
    faq4a: 'Auth0 offers a free tier (7,000 MAU) then scales based on MAU. Clerk has a generous free tier (5,000 MAU) with affordable scaling. Supabase Auth is free within Supabase database limits. For high-volume applications, calculate total cost including overage fees.',
    
    faq5q: 'Which has the best UI components?',
    faq5a: 'Clerk offers the most polished, ready-to-use UI components with beautiful design and customization options. Auth0 provides Universal Login but requires more customization. Supabase Auth offers basic UI with @supabase/auth-ui package.',
    
    faq6q: 'What about self-hosting options?',
    faq6a: 'Supabase Auth can be self-hosted as it is open-source. Auth0 can be self-hosted with Auth0 Private Cloud (enterprise plan). Clerk is cloud-only with no self-hosting option currently available.',
    
    faq7q: 'Which supports the most social providers?',
    faq7a: 'Auth0 supports 50+ social identity providers out of the box. Clerk supports major providers (Google, GitHub, Facebook, etc.) with more being added. Supabase Auth supports about 15 providers including popular options.',
    
    faq8q: 'What about machine-to-machine authentication?',
    faq8a: 'Auth0 has excellent support for M2M with Client Credentials flow and API authorization. Clerk focuses on user authentication with limited M2M support. Supabase Auth supports service role keys for server-side operations.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Auth0 vs Clerk vs Supabase Auth：认证平台对比',
    intro: 'Auth0、Clerk 和 Supabase Auth 是现代应用中三个领先的身份认证平台。每个平台都提供了独特的身份管理方法，从企业级解决方案到开发者友好的 API。本比较将考察它们的功能、定价和理想用例，帮助你选择合适的认证解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为企业功能、合规要求选择 Auth0。为最佳开发体验和快速集成选择 Clerk。使用 Supabase 生态或需要开源灵活性和 PostgreSQL 后端时选择 Supabase Auth。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Auth0 提供企业级功能如 SSO、MFA 和合规认证',
    takeaway2: 'Clerk 提供最快的集成速度和预构建 UI 组件',
    takeaway3: 'Supabase Auth 是开源的，具有 PostgreSQL 集成',
    takeaway4: 'Auth0 拥有最高的企业采用率和合规认证',
    takeaway5: 'Clerk 在 React/Next.js 生态中表现出色，DX 优秀',
    takeaway6: 'Supabase Auth 提供行级安全（RLS）用于数据库级认证',
    
    whatIsAuth0Title: '什么是 Auth0？',
    whatIsAuth0Content: 'Auth0（现为 Okta 的一部分）是 2013 年推出的企业级身份平台。它提供全面的身份认证和授权服务，支持社交登录、SSO、MFA 以及 SOC2、HIPAA、GDPR 等合规标准。Auth0 因其灵活性和安全功能被企业广泛使用。',
    
    whatIsClerkTitle: '什么是 Clerk？',
    whatIsClerkContent: 'Clerk 是一个专注于开发体验的现代身份认证平台。成立于 2020 年，它提供预构建的 UI 组件、用户管理和组织功能，专为 React 和 Next.js 应用设计。Clerk 强调快速集成和美观、可定制的界面。',
    
    whatIsSupabaseAuthTitle: '什么是 Supabase Auth？',
    whatIsSupabaseAuthContent: 'Supabase Auth 是 Supabase（开源 Firebase 替代方案）的认证组件。基于 PostgreSQL 构建，提供与行级安全（RLS）集成的认证、社交登录和实时功能。它是包括数据库、存储和边缘函数在内的更大 Supabase 生态系统的一部分。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '实现示例',
    codeExampleIntro: '认证设置和使用：',
    
    auth0ExampleTitle: 'Auth0 配置',
    clerkExampleTitle: 'Clerk 配置',
    supabaseExampleTitle: 'Supabase Auth 配置',
    
    pricingTitle: '定价对比',
    pricingIntro: '成本结构和免费层限制：',
    
    useCasesTitle: '最佳用例',
    auth0BestFor: 'Auth0 最适合：',
    clerkBestFor: 'Clerk 最适合：',
    supabaseBestFor: 'Supabase Auth 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Auth0、Clerk 和 Supabase Auth 服务于不同需求。Auth0 适合需要合规、SSO 和复杂身份流程的企业。Clerk 适合希望最快集成和美观 UI 的初创公司和开发者。Supabase Auth 非常适合投资于 Supabase 生态或需要具有数据库级安全的开源解决方案的用户。选择取决于你的项目需求、技术栈和规模。',
    
    faq1q: '哪个平台最容易集成？',
    faq1a: 'Clerk 最容易集成，特别是对于 React/Next.js 应用。它提供可以用最少代码添加的预构建组件。Auth0 需要更多配置但提供全面的 SDK。如果使用 Supabase 客户端库，Supabase Auth 很直接。',
    
    faq2q: '哪个最适合企业合规？',
    faq2a: 'Auth0 在企业合规方面是明显的赢家，拥有 SOC2、HIPAA、ISO 27001 和 GDPR 认证。它提供企业 SSO、高级 MFA 和审计日志。Clerk 和 Supabase Auth 正在改进但尚未匹配 Auth0 的合规覆盖。',
    
    faq3q: '我可以在不使用 Supabase 数据库的情况下使用 Supabase Auth 吗？',
    faq3a: '技术上可以，但你失去了行级安全集成的主要好处。Supabase Auth 在与 Supabase PostgreSQL 数据库一起使用时效果最好。如果需要独立认证，Auth0 或 Clerk 可能是更好的选择。',
    
    faq4q: '定价模型如何比较？',
    faq4a: 'Auth0 提供免费层（7,000 MAU）然后基于 MAU 扩展。Clerk 有慷慨的免费层（5,000 MAU）和可负担的扩展。Supabase Auth 在 Supabase 数据库限制内免费。对于高流量应用，计算包括超限费用的总成本。',
    
    faq5q: '哪个有最好的 UI 组件？',
    faq5a: 'Clerk 提供最精致、即用的 UI 组件，具有美观的设计和自定义选项。Auth0 提供通用登录但需要更多自定义。Supabase Auth 通过 @supabase/auth-ui 包提供基本 UI。',
    
    faq6q: '自托管选项怎么样？',
    faq6a: 'Supabase Auth 可以自托管，因为它是开源的。Auth0 可以通过 Auth0 私有云（企业计划）自托管。Clerk 目前仅限云端，没有自托管选项。',
    
    faq7q: '哪个支持最多的社交提供商？',
    faq7a: 'Auth0 开箱即支持 50+ 社交身份提供商。Clerk 支持主要提供商（Google、GitHub、Facebook 等）并不断增加。Supabase Auth 支持约 15 个提供商，包括流行选项。',
    
    faq8q: '机器对机器认证怎么样？',
    faq8a: 'Auth0 通过客户端凭证流和 API 授权对 M2M 有出色支持。Clerk 专注于用户认证，M2M 支持有限。Supabase Auth 支持服务角色密钥用于服务器端操作。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function Auth0VsClerkVsSupabaseAuth({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsAuth0Title}</h3>
      <p style={pStyle}>{ct.whatIsAuth0Content}</p>

      <h3 style={h3Style}>{ct.whatIsClerkTitle}</h3>
      <p style={pStyle}>{ct.whatIsClerkContent}</p>

      <h3 style={h3Style}>{ct.whatIsSupabaseAuthTitle}</h3>
      <p style={pStyle}>{ct.whatIsSupabaseAuthContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Auth0</th>
              <th style={thStyle}>Clerk</th>
              <th style={thStyle}>Supabase Auth</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '类型' : 'Type', isZh ? '企业级' : 'Enterprise', isZh ? '开发者友好' : 'Developer-friendly', isZh ? '开源' : 'Open-source'],
              [isZh ? 'SSO' : 'SSO', isZh ? '完整支持' : 'Full support', isZh ? '有限' : 'Limited', isZh ? '基础' : 'Basic'],
              [isZh ? 'MFA' : 'MFA', isZh ? '多种方式' : 'Multiple methods', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? 'UI 组件' : 'UI Components', isZh ? '通用登录' : 'Universal Login', isZh ? '丰富预构建' : 'Rich pre-built', isZh ? '基础' : 'Basic'],
              [isZh ? '社交登录' : 'Social Logins', '50+', '10+', '15+'],
              [isZh ? '自托管' : 'Self-hosted', isZh ? '企业版' : 'Enterprise', isZh ? '不支持' : 'No', isZh ? '支持' : 'Yes'],
              [isZh ? '合规认证' : 'Compliance', 'SOC2, HIPAA, GDPR', isZh ? '基础' : 'Basic', isZh ? '基础' : 'Basic'],
            ].map(([feature, auth0, clerk, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{auth0}</td>
                <td style={tdStyle}>{clerk}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#eb5424' }}>{ct.auth0ExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Auth0 React SDK Setup
import { Auth0Provider } from \\u0060@auth0/auth0-react\\u0060;

function App() {
  return (
    <Auth0Provider
      domain="your-domain.auth0.com"
      clientId="your-client-id"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <YourApp />
    </Auth0Provider>
  );
}

// Using authentication in components
import { useAuth0 } from \\u0060@auth0/auth0-react\\u0060;

function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  
  if (isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <span>{user.email}</span>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log Out
        </button>
      </div>
    );
  }
  
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

// API call with token
import { getAccessTokenSilently } from \\u0060@auth0/auth0-react\\u0060;

async function callApi() {
  const token = await getAccessTokenSilently();
  const response = await fetch('https://api.example.com/data', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  return response.json();
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#6c47ff' }}>{ct.clerkExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Clerk React SDK Setup
import { ClerkProvider } from \\u0060@clerk/clerk-react\\u0060;

function App() {
  return (
    <ClerkProvider publishableKey="pk_test_...">
      <YourApp />
    </ClerkProvider>
  );
}

// Pre-built components
import { SignIn, SignUp, UserButton } from \\u0060@clerk/clerk-react\\u0060;

function App() {
  return (
    <div>
      <header>
        <UserButton afterSignOutUrl="/sign-in" />
      </header>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

// Using authentication state
import { useAuth, useUser } from \\u0060@clerk/clerk-react\\u0060;

function ProtectedContent() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3ecf8e' }}>{ct.supabaseExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Supabase Auth Setup
import { createClient } from \\u0060@supabase/supabase-js\\u0060;

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);

// Sign up
async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Sign in
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// OAuth sign in
async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
}

// Get current user
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});

// Using Row Level Security (RLS)
// Database policy example:
/*
CREATE POLICY "Users can only see their own data"
ON user_data FOR ALL
USING (auth.uid() = user_id);
*/`}</code></pre>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>Auth0</th>
              <th style={thStyle}>Clerk</th>
              <th style={thStyle}>Supabase Auth</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', '7,000 MAU', '5,000 MAU', isZh ? '数据库限制内免费' : 'Free within DB limits'],
              [isZh ? '开发/Pro' : 'Developer/Pro', '$240/月', '$25/月', '$25/月'],
              [isZh ? '企业' : 'Enterprise', isZh ? '联系销售' : 'Contact sales', isZh ? '联系销售' : 'Contact sales', isZh ? '联系销售' : 'Contact sales'],
              [isZh ? 'MFA' : 'MFA', isZh ? '免费层可用' : 'Available in free', isZh ? '免费层可用' : 'Available in free', isZh ? '免费层可用' : 'Available in free'],
              [isZh ? 'SSO' : 'SSO', isZh ? 'Pro 及以上' : 'Pro and above', isZh ? '企业版' : 'Enterprise', isZh ? '有限' : 'Limited'],
            ].map(([plan, auth0, clerk, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{auth0}</td>
                <td style={tdStyle}>{clerk}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #eb5424' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#eb5424' }}>{ct.auth0BestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '需要合规的场景' : 'Compliance requirements'}</li>
            <li>{isZh ? 'B2B SaaS（SSO）' : 'B2B SaaS with SSO'}</li>
            <li>{isZh ? '复杂身份流程' : 'Complex identity flows'}</li>
            <li>{isZh ? '大型团队' : 'Large teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6c47ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6c47ff' }}>{ct.clerkBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'React/Next.js 应用' : 'React/Next.js apps'}</li>
            <li>{isZh ? '初创公司' : 'Startups'}</li>
            <li>{isZh ? '快速原型' : 'Quick prototyping'}</li>
            <li>{isZh ? '需要美观 UI' : 'Beautiful UI needed'}</li>
            <li>{isZh ? '开发者体验优先' : 'Developer experience first'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3ecf8e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3ecf8e' }}>{ct.supabaseBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Supabase 生态用户' : 'Supabase ecosystem users'}</li>
            <li>{isZh ? '开源项目' : 'Open-source projects'}</li>
            <li>{isZh ? '需要 RLS' : 'Row Level Security needed'}</li>
            <li>{isZh ? 'PostgreSQL 后端' : 'PostgreSQL backend'}</li>
            <li>{isZh ? '自托管需求' : 'Self-hosting required'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
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
