'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Clerk vs NextAuth vs Supabase Auth: Authentication Comparison 2025',
    intro: 'Authentication is critical for modern applications, and choosing the right solution impacts security, user experience, and development velocity. This comprehensive comparison examines Clerk, NextAuth.js (Auth.js), and Supabase Auth across features, pricing, developer experience, and real-world use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Clerk offers the best developer experience with beautiful pre-built UI components and excellent React/Next.js integration. NextAuth is free and flexible but requires more setup. Supabase Auth provides great value if you\'re already using Supabase\'s database. For React apps in 2025, Clerk is recommended for its DX; for cost-conscious projects, NextAuth; for full-stack apps, Supabase.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Clerk provides pre-built UI components and the best out-of-box experience',
    takeaway2: 'NextAuth is completely free and open-source with maximum flexibility',
    takeaway3: 'Supabase Auth integrates seamlessly with Supabase database and real-time features',
    takeaway4: 'All three support OAuth providers, MFA, and session management',
    takeaway5: 'Clerk has the most generous free tier for production apps (5,000 MAU)',
    takeaway6: 'NextAuth requires self-hosting session management and more configuration',
    
    whatIsClerkTitle: 'What is Clerk?',
    whatIsClerkContent: 'Clerk is a modern authentication platform designed specifically for React and Next.js applications. Founded in 2020, it provides drop-in authentication components, user management, and organization features. Clerk handles everything from sign-up flows to user profiles with beautiful, customizable UI components.',
    
    whatIsNextAuthTitle: 'What is NextAuth.js?',
    whatIsNextAuthContent: 'NextAuth.js (now called Auth.js) is an open-source authentication solution for Next.js, SvelteKit, and other frameworks. Created in 2020, it provides flexible authentication without vendor lock-in. NextAuth supports multiple database adapters, various OAuth providers, and gives you full control over your auth implementation.',
    
    whatIsSupabaseAuthTitle: 'What is Supabase Auth?',
    whatIsSupabaseAuthContent: 'Supabase Auth is part of the Supabase open-source Firebase alternative. Built on top of PostgreSQL with Row Level Security, it provides authentication with deep database integration. Supabase Auth supports magic links, OAuth, phone auth, and integrates with Supabase\'s real-time and storage features.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the pricing models for each solution:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing authentication capabilities across platforms:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Implementation patterns for each solution:',
    
    clerkExampleTitle: 'Clerk Implementation',
    nextAuthExampleTitle: 'NextAuth Implementation',
    supabaseExampleTitle: 'Supabase Auth Implementation',
    
    oauthSupportTitle: 'OAuth Provider Support',
    oauthSupportIntro: 'Social login provider comparison:',
    
    developerExperienceTitle: 'Developer Experience',
    developerExperienceIntro: 'How each solution impacts development workflow:',
    
    useCasesTitle: 'Best Use Cases',
    clerkBestFor: 'Choose Clerk For:',
    nextAuthBestFor: 'Choose NextAuth For:',
    supabaseBestFor: 'Choose Supabase Auth For:',
    
    migrationTitle: 'Migration Considerations',
    migrationIntro: 'Key points when migrating between solutions:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the best authentication solution depends on your priorities. Clerk is ideal for teams wanting the fastest time-to-market with beautiful UI and excellent React integration. NextAuth is perfect for cost-conscious projects needing maximum flexibility and no vendor lock-in. Supabase Auth is the best choice if you\'re already using Supabase\'s database or need deep database-level security. Consider your team\'s expertise, budget, and long-term needs when choosing.',
    
    faq1q: 'Can I use Clerk with non-React frameworks?',
    faq1a: 'Clerk is optimized for React and Next.js. While you can use Clerk\'s APIs directly, you\'ll lose the pre-built UI components. For Vue, Svelte, or other frameworks, NextAuth or Supabase Auth might be better choices.',
    
    faq2q: 'Is NextAuth production-ready?',
    faq2a: 'Yes, NextAuth is used in production by thousands of applications. However, you\'re responsible for securing your session secrets, managing database adapters, and implementing security best practices.',
    
    faq3q: 'Can I use Supabase Auth without the database?',
    faq3a: 'Supabase Auth is designed to work with Supabase\'s PostgreSQL database. While you can use the auth service standalone, you\'ll miss out on Row Level Security and real-time features that make it powerful.',
    
    faq4q: 'Which has the best free tier?',
    faq4a: 'Clerk offers 5,000 MAU free, Supabase offers 50,000 MAU free, and NextAuth is completely free (self-hosted). For production apps, Clerk\'s free tier is most generous for the features included.',
    
    faq5q: 'Do they all support multi-tenant/organization features?',
    faq5a: 'Clerk has built-in Organizations feature. Supabase supports this via database design. NextAuth requires custom implementation. For B2B SaaS, Clerk\'s Organizations is the most complete solution.',
    
    faq6q: 'How do they handle session management?',
    faq6a: 'Clerk and Supabase use JWTs with managed session handling. NextAuth supports both JWT and database sessions. Clerk\'s session management is most seamless; NextAuth gives you the most control.',
    
    faq7q: 'Can I customize the auth UI?',
    faq7a: 'Clerk provides customizable components with theming. Supabase Auth UI is customizable but requires more work. NextAuth requires building your own UI from scratch or using community components.',
    
    faq8q: 'Which is best for mobile apps?',
    faq8a: 'Supabase Auth has excellent mobile SDKs (React Native, Flutter). Clerk supports React Native via their Expo integration. NextAuth works with any mobile framework via OAuth flows. For mobile-first, Supabase is often the best choice.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Clerk vs NextAuth vs Supabase Auth：2025年认证方案对比',
    intro: '认证对现代应用至关重要，选择正确的解决方案会影响安全性、用户体验和开发速度。本全面比较从功能、定价、开发者体验和实际用例等方面考察Clerk、NextAuth.js（Auth.js）和Supabase Auth。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Clerk凭借精美的预构建UI组件和出色的React/Next.js集成提供最佳开发者体验。NextAuth免费且灵活但需要更多设置。如果你已经在使用Supabase数据库，Supabase Auth提供极佳价值。对于2025年的React应用，追求DX推荐Clerk；成本敏感选NextAuth；全栈应用选Supabase。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Clerk提供预构建UI组件和最佳开箱即用体验',
    takeaway2: 'NextAuth完全免费开源，具有最大灵活性',
    takeaway3: 'Supabase Auth与Supabase数据库和实时功能无缝集成',
    takeaway4: '三者都支持OAuth提供商、MFA和会话管理',
    takeaway5: 'Clerk的生产应用免费套餐最慷慨（5,000 MAU）',
    takeaway6: 'NextAuth需要自行托管会话管理和更多配置',
    
    whatIsClerkTitle: '什么是Clerk？',
    whatIsClerkContent: 'Clerk是一个专为React和Next.js应用设计的现代认证平台。成立于2020年，提供即用型认证组件、用户管理和组织功能。Clerk处理从注册流程到用户资料的所有事务，提供精美、可定制的UI组件。',
    
    whatIsNextAuthTitle: '什么是NextAuth.js？',
    whatIsNextAuthContent: 'NextAuth.js（现名Auth.js）是一个为Next.js、SvelteKit和其他框架提供的开源认证解决方案。创建于2020年，提供灵活的认证而无供应商锁定。NextAuth支持多种数据库适配器、各种OAuth提供商，让你完全控制认证实现。',
    
    whatIsSupabaseAuthTitle: '什么是Supabase Auth？',
    whatIsSupabaseAuthContent: 'Supabase Auth是Supabase开源Firebase替代方案的一部分。基于PostgreSQL和行级安全构建，提供与数据库深度集成的认证。Supabase Auth支持魔术链接、OAuth、手机认证，并与Supabase的实时和存储功能集成。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解每个解决方案的定价模型：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较各平台的认证能力：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '每个解决方案的实现模式：',
    
    clerkExampleTitle: 'Clerk实现',
    nextAuthExampleTitle: 'NextAuth实现',
    supabaseExampleTitle: 'Supabase Auth实现',
    
    oauthSupportTitle: 'OAuth提供商支持',
    oauthSupportIntro: '社交登录提供商对比：',
    
    developerExperienceTitle: '开发者体验',
    developerExperienceIntro: '每个解决方案如何影响开发工作流：',
    
    useCasesTitle: '最佳用例',
    clerkBestFor: '选择Clerk的场景：',
    nextAuthBestFor: '选择NextAuth的场景：',
    supabaseBestFor: '选择Supabase Auth的场景：',
    
    migrationTitle: '迁移注意事项',
    migrationIntro: '在解决方案之间迁移时的关键点：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，最佳认证解决方案取决于你的优先级。Clerk适合想要最快上市时间、精美UI和出色React集成的团队。NextAuth是成本敏感项目需要最大灵活性和无供应商锁定的完美选择。如果你已经在使用Supabase数据库或需要数据库级安全，Supabase Auth是最佳选择。选择时请考虑团队专业知识、预算和长期需求。',
    
    faq1q: '我可以在非React框架中使用Clerk吗？',
    faq1a: 'Clerk针对React和Next.js进行了优化。虽然你可以直接使用Clerk的API，但会失去预构建的UI组件。对于Vue、Svelte或其他框架，NextAuth或Supabase Auth可能是更好的选择。',
    
    faq2q: 'NextAuth可以用于生产吗？',
    faq2a: '是的，NextAuth被数千个应用程序在生产中使用。然而，你需要负责保护会话密钥、管理数据库适配器和实施安全最佳实践。',
    
    faq3q: '我可以在不使用数据库的情况下使用Supabase Auth吗？',
    faq3a: 'Supabase Auth设计为与Supabase的PostgreSQL数据库一起工作。虽然你可以独立使用认证服务，但会错过使其强大的行级安全和实时功能。',
    
    faq4q: '哪个免费套餐最好？',
    faq4a: 'Clerk提供5,000 MAU免费，Supabase提供50,000 MAU免费，NextAuth完全免费（自托管）。对于生产应用，Clerk的免费套餐在包含的功能方面最慷慨。',
    
    faq5q: '它们都支持多租户/组织功能吗？',
    faq5a: 'Clerk有内置的Organizations功能。Supabase通过数据库设计支持。NextAuth需要自定义实现。对于B2B SaaS，Clerk的Organizations是最完整的解决方案。',
    
    faq6q: '它们如何处理会话管理？',
    faq6a: 'Clerk和Supabase使用JWT和托管会话处理。NextAuth支持JWT和数据库会话。Clerk的会话管理最无缝；NextAuth给你最多控制权。',
    
    faq7q: '我可以自定义认证UI吗？',
    faq7a: 'Clerk提供可定制的组件和主题。Supabase Auth UI可定制但需要更多工作。NextAuth需要从头构建自己的UI或使用社区组件。',
    
    faq8q: '哪个最适合移动应用？',
    faq8a: 'Supabase Auth有出色的移动SDK（React Native、Flutter）。Clerk通过Expo集成支持React Native。NextAuth通过OAuth流程适用于任何移动框架。对于移动优先的应用，Supabase通常是最佳选择。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function AuthenticationComparison({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsClerkTitle}</h3>
      <p style={pStyle}>{ct.whatIsClerkContent}</p>

      <h3 style={h3Style}>{ct.whatIsNextAuthTitle}</h3>
      <p style={pStyle}>{ct.whatIsNextAuthContent}</p>

      <h3 style={h3Style}>{ct.whatIsSupabaseAuthTitle}</h3>
      <p style={pStyle}>{ct.whatIsSupabaseAuthContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Clerk</th>
              <th style={thStyle}>NextAuth</th>
              <th style={thStyle}>Supabase Auth</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开源' : 'Open Source', '✗', '✓', '✓'],
              [isZh ? '免费套餐' : 'Free Tier', '5,000 MAU', isZh ? '无限' : 'Unlimited', '50,000 MAU'],
              [isZh ? '付费起步' : 'Paid Starts', '$25/month', '$0', '$25/month'],
              [isZh ? '每MAU成本' : 'Cost per MAU', '$0.02', '$0', '$0.00325'],
              [isZh ? '托管服务' : 'Managed Service', '✓', '✗', '✓'],
              [isZh ? '自托管选项' : 'Self-hosted Option', '✗', '✓', '✓'],
              [isZh ? '企业版' : 'Enterprise', '✓', isZh ? '社区支持' : 'Community', '✓'],
            ].map(([aspect, clerk, nextauth, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{clerk}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{nextauth}</td>
                <td style={tdStyle}>{supabase}</td>
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
              <th style={thStyle}>Clerk</th>
              <th style={thStyle}>NextAuth</th>
              <th style={thStyle}>Supabase Auth</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '预构建UI' : 'Pre-built UI', '✓ Excellent', '✗', '✓ Basic'],
              [isZh ? '邮箱/密码' : 'Email/Password', '✓', '✓', '✓'],
              [isZh ? 'OAuth提供商' : 'OAuth Providers', '✓ 20+', '✓ 50+', '✓ 15+'],
              [isZh ? '魔术链接' : 'Magic Links', '✓', '✓', '✓'],
              [isZh ? '手机/SMS' : 'Phone/SMS', '✓', '✓', '✓'],
              [isZh ? 'MFA/2FA' : 'MFA/2FA', '✓', '✓', '✓'],
              [isZh ? 'Passkeys' : 'Passkeys', '✓', isZh ? '需实现' : 'Manual', isZh ? '实验性' : 'Experimental'],
              [isZh ? 'SSO/SAML' : 'SSO/SAML', '✓', '✓', '✓'],
              [isZh ? '组织/团队' : 'Organizations', '✓ Built-in', '✗', isZh ? '通过数据库' : 'Via DB'],
              [isZh ? '用户管理' : 'User Management', '✓ Dashboard', '✗', '✓ Dashboard'],
              [isZh ? 'Webhooks' : 'Webhooks', '✓', isZh ? '需实现' : 'Manual', '✓'],
              [isZh ? '角色/权限' : 'Roles/Permissions', '✓', '✓', '✓ RLS'],
            ].map(([feature, clerk, nextauth, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: clerk.includes('✓') ? '#22c55e' : undefined }}>{clerk}</td>
                <td style={tdStyle}>{nextauth}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#6c47ff' }}>{ct.clerkExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Clerk - Easiest setup with pre-built components
// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = { matcher: ['/((?!.*\\..*).*)'] };

// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}

// app/page.tsx - Pre-built sign-in component
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

// app/dashboard/page.tsx - Protected route
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  const user = await currentUser();
  
  return <div>Welcome, {user?.firstName}!</div>;
}

// Organizations (B2B SaaS)
import { OrganizationSwitcher, useOrganization } from '@clerk/nextjs';

function App() {
  const { organization } = useOrganization();
  
  return (
    <>
      <OrganizationSwitcher />
      <p>Current org: {organization?.name}</p>
    </>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3178c6' }}>{ct.nextAuthExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// NextAuth - Maximum flexibility, more setup
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});

export const { GET, POST } = handlers;

// middleware.ts
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard');
  
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
});

export const config = { matcher: ['/dashboard/:path*'] };

// app/auth/signin/page.tsx - Custom sign-in UI
import { signIn } from '@/app/api/auth/[...nextauth]/route';
import { providers } from '@/lib/auth-providers';

export default function SignIn() {
  return (
    <div>
      {providers.map((provider) => (
        <button key={provider.id} onClick={() => signIn(provider.id)}>
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
}

// app/dashboard/page.tsx
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return <div>Welcome, {session.user?.name}!</div>;
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3ecf8e' }}>{ct.supabaseExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Supabase Auth - Database-integrated auth
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}

// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse.cookies.set(name, value);
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return supabaseResponse;
}

// app/auth/login/page.tsx
'use client';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export default function Login() {
  const supabase = createClient();
  const [email, setEmail] = useState('');

  const handleMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) alert('Check your email!');
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/auth/callback' },
    });
  };

  return (
    <div>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={handleMagicLink}>Send Magic Link</button>
      <button onClick={handleGoogle}>Sign in with Google</button>
    </div>
  );
}

// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  // Row Level Security automatically filters data
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id);
  
  return <div>Welcome, {user.email}! Posts: {posts?.length}</div>;
}`}</code></pre>

      <h2 style={h2Style}>{ct.oauthSupportTitle}</h2>
      <p style={pStyle}>{ct.oauthSupportIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '提供商' : 'Provider'}</th>
              <th style={thStyle}>Clerk</th>
              <th style={thStyle}>NextAuth</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Google', '✓', '✓', '✓'],
              ['GitHub', '✓', '✓', '✓'],
              ['Apple', '✓', '✓', '✓'],
              ['Microsoft', '✓', '✓', '✓'],
              ['Discord', '✓', '✓', '✓'],
              ['Twitter/X', '✓', '✓', '✓'],
              ['LinkedIn', '✓', '✓', '✓'],
              ['Facebook', '✓', '✓', '✓'],
              ['GitLab', '✓', '✓', '✗'],
              ['Spotify', '✓', '✓', '✓'],
              ['Twitch', '✓', '✓', '✓'],
              ['Custom OIDC', '✓', '✓', '✓'],
            ].map(([provider, clerk, nextauth, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{provider}</td>
                <td style={tdStyle}>{clerk}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{nextauth}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.developerExperienceTitle}</h2>
      <p style={pStyle}>{ct.developerExperienceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #6c47ff' }}>
          <strong style={{ color: '#6c47ff' }}>Clerk</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '最佳开箱即用体验。预构建UI组件、内置用户管理仪表板、一键部署。5分钟即可完成完整认证系统。缺点是供应商锁定。' : 'Best out-of-box experience. Pre-built UI components, built-in user management dashboard, one-click deployment. Full auth system in 5 minutes. Trade-off is vendor lock-in.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3178c6' }}>
          <strong style={{ color: '#3178c6' }}>NextAuth</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '最大灵活性和控制权。无供应商锁定，完全自定义，但需要更多配置。适合想要完全控制认证流程的团队。' : 'Maximum flexibility and control. No vendor lock-in, fully customizable, but requires more setup. Best for teams wanting full control over auth flow.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3ecf8e' }}>
          <strong style={{ color: '#3ecf8e' }}>Supabase Auth</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '与Supabase生态系统深度集成。行级安全自动过滤数据，实时订阅用户状态。如果你使用Supabase数据库，这是自然选择。' : 'Deep integration with Supabase ecosystem. Row Level Security auto-filters data, real-time user status subscriptions. Natural choice if using Supabase database.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6c47ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6c47ff' }}>{ct.clerkBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'React/Next.js应用' : 'React/Next.js apps'}</li>
            <li>{isZh ? '快速MVP开发' : 'Rapid MVP development'}</li>
            <li>{isZh ? 'B2B SaaS（组织功能）' : 'B2B SaaS (Organizations)'}</li>
            <li>{isZh ? '需要精美UI' : 'Beautiful UI required'}</li>
            <li>{isZh ? '团队无认证经验' : 'Teams without auth expertise'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3178c6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3178c6' }}>{ct.nextAuthBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '成本敏感项目' : 'Cost-sensitive projects'}</li>
            <li>{isZh ? '需要完全控制' : 'Full control required'}</li>
            <li>{isZh ? '无供应商锁定' : 'No vendor lock-in'}</li>
            <li>{isZh ? '自定义认证流程' : 'Custom auth flows'}</li>
            <li>{isZh ? '非React框架' : 'Non-React frameworks'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3ecf8e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3ecf8e' }}>{ct.supabaseBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '使用Supabase数据库' : 'Using Supabase database'}</li>
            <li>{isZh ? '需要实时功能' : 'Real-time features needed'}</li>
            <li>{isZh ? '移动应用' : 'Mobile applications'}</li>
            <li>{isZh ? '需要行级安全' : 'Row Level Security needed'}</li>
            <li>{isZh ? '开源优先' : 'Open-source first'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration Considerations

// 1. Data Migration
// - Clerk: Use Clerk's user import API
// - NextAuth: Migrate via database adapter
// - Supabase: Direct SQL import to auth.users table

// 2. Session Handling Differences
// Clerk: Managed JWT sessions
// NextAuth: JWT or database sessions
// Supabase: JWT with refresh tokens

// 3. Password Migration
// All three use bcrypt, but with different salts
// Users will need to reset passwords or use migration tools

// 4. OAuth Account Linking
// OAuth IDs are provider-specific
// Users may need to re-link OAuth accounts

// Example: NextAuth to Clerk migration
// 1. Export users from NextAuth database
// 2. Transform to Clerk's user format
// 3. Import via Clerk API
// 4. Update environment variables
// 5. Replace NextAuth components with Clerk components

// Example migration script
const migrateUsers = async () => {
  const nextAuthUsers = await prisma.user.findMany();
  
  for (const user of nextAuthUsers) {
    await clerkClient.users.createUser({
      emailAddress: [user.email],
      firstName: user.name?.split(' ')[0],
      lastName: user.name?.split(' ')[1],
      externalId: user.id, // Keep reference
    });
  }
};`}</code></pre>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
        <a href={`/${lang}/tools/base64-encoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a>
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
