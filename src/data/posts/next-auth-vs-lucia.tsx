'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'NextAuth vs Lucia: Authentication Library Comparison',
    intro: 'NextAuth (now Auth.js) and Lucia are two popular authentication solutions for modern web applications. NextAuth is the established choice for Next.js, while Lucia offers a newer, framework-agnostic approach. This comparison covers features, flexibility, developer experience, and real-world implementation.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'NextAuth (Auth.js) provides out-of-the-box authentication with extensive provider support but less flexibility. Lucia offers more control and framework freedom with a learning curve. For Next.js projects needing quick auth setup, NextAuth excels. For custom auth flows and multi-framework apps, Lucia is ideal.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'NextAuth has 50+ OAuth providers built-in; Lucia requires manual setup',
    takeaway2: 'Lucia supports any framework; NextAuth is optimized for Next.js',
    takeaway3: 'NextAuth uses JWT or database sessions; Lucia uses database sessions only',
    takeaway4: 'Lucia offers more granular control over auth flows',
    takeaway5: 'NextAuth has larger community and more resources',
    takeaway6: 'Lucia is lighter weight and more transparent',
    
    whatIsNextAuthTitle: 'What is NextAuth (Auth.js)?',
    whatIsNextAuthContent: 'NextAuth.js (rebranded as Auth.js in v5) is a complete authentication solution for Next.js applications. Created in 2020, it handles OAuth, email magic links, and credentials authentication with minimal configuration. It integrates deeply with Next.js middleware and supports multiple database adapters.',
    
    whatIsLuciaTitle: 'What is Lucia?',
    whatIsLuciaContent: 'Lucia is a flexible authentication library created in 2022, designed to work with any JavaScript framework. It provides the core authentication logic while giving developers full control over implementation. Lucia supports various database adapters and session management strategies, focusing on transparency and customization.',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing authentication capabilities:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Setup and usage patterns:',
    
    nextAuthExampleTitle: 'NextAuth (Auth.js)',
    luciaExampleTitle: 'Lucia',
    
    providersTitle: 'OAuth Providers',
    providersIntro: 'Social login integration:',
    
    sessionManagementTitle: 'Session Management',
    sessionManagementIntro: 'How sessions are handled:',
    
    securityTitle: 'Security Features',
    securityIntro: 'Built-in security measures:',
    
    whenToUseTitle: 'When to Use Each',
    nextAuthBestFor: 'Use NextAuth When:',
    luciaBestFor: 'Use Lucia When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, NextAuth (Auth.js) remains the go-to choice for Next.js applications needing quick authentication setup with OAuth providers. Its extensive provider library and Next.js integration make it hard to beat for common use cases. Lucia shines when you need full control over authentication flows, want framework independence, or are building custom auth implementations. Consider your project needs: quick setup vs. flexibility, Next.js vs. framework-agnostic, standard OAuth vs. custom flows.',
    
    faq1q: 'Is NextAuth v5 (Auth.js) stable?',
    faq1a: 'Auth.js v5 is stable and recommended for new projects. It includes improvements like better Edge runtime support, improved TypeScript support, and database session support. Migration from v4 is straightforward with a codemod available.',
    
    faq2q: 'Can I use Lucia with Next.js App Router?',
    faq2a: 'Yes, Lucia works with Next.js App Router. It provides an adapter for Next.js and examples for App Router integration. You will need to handle middleware and session verification manually, which gives you more control.',
    
    faq3q: 'Which is better for self-hosted auth?',
    faq3a: 'Lucia is better for self-hosted authentication because it gives you complete control over the auth flow. NextAuth can be self-hosted but abstracts many details. If you need fine-grained control over user management, sessions, and security, Lucia is the choice.',
    
    faq4q: 'How do they handle passwordless authentication?',
    faq4a: 'NextAuth has built-in magic link (email) authentication. Lucia requires you to implement the email sending logic but provides the token generation and verification. Both support WebAuthn/passkeys with additional setup.',
    
    faq5q: 'What about database requirements?',
    faq5a: 'NextAuth supports PostgreSQL, MySQL, MongoDB, and more through adapters. It can also work without a database using JWT sessions. Lucia requires a database and supports PostgreSQL, MySQL, SQLite, MongoDB, and others through adapters.',
    
    faq6q: 'Which has better TypeScript support?',
    faq6a: 'Both have good TypeScript support. NextAuth v5 significantly improved types with better inference. Lucia is written in TypeScript and provides good type safety. Lucia may have slightly better type inference for custom implementations.',
    
    faq7q: 'Can I migrate from NextAuth to Lucia?',
    faq7a: 'Yes, migration is possible but requires rewriting auth logic. You will need to migrate user data, recreate sessions, and update protected routes. Plan for 2-4 days depending on complexity. Many teams do this when they outgrow NextAuth abstractions.',
    
    faq8q: 'What about middleware protection?',
    faq8a: 'NextAuth provides built-in middleware for route protection with "withAuth" helper. Lucia requires you to implement middleware logic using session validation. NextAuth is more convenient; Lucia offers more customization.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'NextAuth vs Lucia：认证库对比',
    intro: 'NextAuth（现Auth.js）和Lucia是现代Web应用的两个流行认证解决方案。NextAuth是Next.js的成熟选择，而Lucia提供更新的、框架无关的方法。本比较涵盖功能、灵活性、开发者体验和实际实现。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'NextAuth（Auth.js）提供开箱即用的认证和广泛的提供商支持，但灵活性较低。Lucia提供更多控制和框架自由度，但有学习曲线。对于需要快速认证设置的Next.js项目，NextAuth表现出色。对于自定义认证流程和多框架应用，Lucia是理想选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'NextAuth内置50+OAuth提供商；Lucia需要手动设置',
    takeaway2: 'Lucia支持任何框架；NextAuth专为Next.js优化',
    takeaway3: 'NextAuth使用JWT或数据库会话；Lucia仅使用数据库会话',
    takeaway4: 'Lucia对认证流程提供更细粒度的控制',
    takeaway5: 'NextAuth有更大的社区和更多资源',
    takeaway6: 'Lucia更轻量且更透明',
    
    whatIsNextAuthTitle: '什么是NextAuth（Auth.js）？',
    whatIsNextAuthContent: 'NextAuth.js（在v5中更名为Auth.js）是Next.js应用的完整认证解决方案。创建于2020年，它以最少的配置处理OAuth、邮件魔法链接和凭据认证。它与Next.js中间件深度集成，支持多种数据库适配器。',
    
    whatIsLuciaTitle: '什么是Lucia？',
    whatIsLuciaContent: 'Lucia是一个灵活的认证库，创建于2022年，设计用于任何JavaScript框架。它提供核心认证逻辑，同时让开发者完全控制实现。Lucia支持各种数据库适配器和会话管理策略，专注于透明性和自定义。',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较认证功能：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '设置和使用模式：',
    
    nextAuthExampleTitle: 'NextAuth (Auth.js)',
    luciaExampleTitle: 'Lucia',
    
    providersTitle: 'OAuth提供商',
    providersIntro: '社交登录集成：',
    
    sessionManagementTitle: '会话管理',
    sessionManagementIntro: '如何处理会话：',
    
    securityTitle: '安全功能',
    securityIntro: '内置安全措施：',
    
    whenToUseTitle: '何时使用',
    nextAuthBestFor: '使用NextAuth的场景：',
    luciaBestFor: '使用Lucia的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，NextAuth（Auth.js）仍是Next.js应用快速认证设置的首选。其广泛的提供商库和Next.js集成使其在常见用例中难以超越。当你需要完全控制认证流程、想要框架独立性或构建自定义认证实现时，Lucia表现出色。考虑你的项目需求：快速设置vs灵活性、Next.js vs框架无关、标准OAuth vs自定义流程。',
    
    faq1q: 'NextAuth v5 (Auth.js) 稳定吗？',
    faq1a: 'Auth.js v5稳定且推荐用于新项目。它包括Edge运行时支持改进、更好的TypeScript支持和数据库会话支持。从v4迁移很简单，有可用的codemod。',
    
    faq2q: '我可以在Next.js App Router中使用Lucia吗？',
    faq2a: '可以，Lucia与Next.js App Router兼容。它为Next.js提供适配器和App Router集成示例。你需要手动处理中间件和会话验证，这给你更多控制。',
    
    faq3q: '哪个更适合自托管认证？',
    faq3a: 'Lucia更适合自托管认证，因为它让你完全控制认证流程。NextAuth可以自托管但抽象了很多细节。如果你需要对用户管理、会话和安全的细粒度控制，Lucia是选择。',
    
    faq4q: '它们如何处理无密码认证？',
    faq4a: 'NextAuth内置魔法链接（邮件）认证。Lucia需要你实现邮件发送逻辑，但提供令牌生成和验证。两者都通过额外设置支持WebAuthn/passkeys。',
    
    faq5q: '数据库需求呢？',
    faq5a: 'NextAuth通过适配器支持PostgreSQL、MySQL、MongoDB等。它也可以使用JWT会话无数据库工作。Lucia需要数据库，通过适配器支持PostgreSQL、MySQL、SQLite、MongoDB等。',
    
    faq6q: '哪个TypeScript支持更好？',
    faq6a: '两者都有良好的TypeScript支持。NextAuth v5显著改进了类型，有更好的推断。Lucia用TypeScript编写，提供良好的类型安全。Lucia对自定义实现可能有稍好的类型推断。',
    
    faq7q: '我可以从NextAuth迁移到Lucia吗？',
    faq7a: '可以，迁移可能但需要重写认证逻辑。你需要迁移用户数据、重建会话并更新受保护路由。根据复杂性计划2-4天。许多团队在超出NextAuth抽象时会这样做。',
    
    faq8q: '中间件保护呢？',
    faq8a: 'NextAuth为路由保护提供内置中间件和"withAuth"辅助函数。Lucia需要你使用会话验证实现中间件逻辑。NextAuth更方便；Lucia提供更多自定义。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function NextAuthVsLucia({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsNextAuthTitle}</h3>
      <p style={pStyle}>{ct.whatIsNextAuthContent}</p>

      <h3 style={h3Style}>{ct.whatIsLuciaTitle}</h3>
      <p style={pStyle}>{ct.whatIsLuciaContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{isZh ? '对比概览' : 'Comparison Overview'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>NextAuth (Auth.js)</th>
              <th style={thStyle}>Lucia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2020', '2022'],
              [isZh ? '框架支持' : 'Framework Support', 'Next.js (v5: SvelteKit, SolidStart)', 'Any framework'],
              [isZh ? 'OAuth提供商' : 'OAuth Providers', '50+ built-in', 'Manual setup'],
              [isZh ? '会话类型' : 'Session Type', 'JWT / Database', 'Database only'],
              [isZh ? '包大小' : 'Package Size', '~90KB', '~35KB'],
              [isZh ? '抽象级别' : 'Abstraction Level', 'High', 'Low'],
              [isZh ? '自定义控制' : 'Customization', 'Moderate', 'High'],
              [isZh ? '社区规模' : 'Community Size', 'Large', 'Growing'],
            ].map(([feature, nextauth, lucia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{nextauth}</td>
                <td style={tdStyle}>{lucia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.nextAuthExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (user && user.password === credentials?.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// Using in Client Component
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </>
  );
}

// Middleware protection
// middleware.ts
export { auth as middleware } from "@/auth";`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f472b6' }}>{ct.luciaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// lib/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import "lucia/polyfill/node";

export const auth = lucia({
  adapter: prismaAdapter(prisma, {
    user: "user",
    key: "authKey",
    session: "session",
  }),
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (data) => {
    return {
      email: data.email,
      name: data.name,
    };
  },
});

export type Auth = typeof auth;

// app/api/login/route.ts
import { auth } from "@/lib/lucia";
import { LuciaError } from "lucia";
import { Scrypt } from "lucia/dist/password-scrypt";

const scrypt = new Scrypt();

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const key = await auth.useKey("email", email, password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  } catch (error) {
    if (
      error instanceof LuciaError &&
      error.message === "AUTH_INVALID_KEY_ID"
    ) {
      return new Response("Invalid email or password", { status: 400 });
    }
    return new Response("An error occurred", { status: 500 });
  }
}

// OAuth with Lucia
import { github } from "@lucia-auth/oauth/providers";
import { oauth } from "@lucia-auth/oauth";

const githubAuth = oauth(github, {
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
});

// app/api/login/github/route.ts
export async function GET() {
  const [url, state] = await githubAuth.getAuthorizationUrl();
  // Store state in cookie for CSRF protection
  return new Response(null, {
    status: 302,
    headers: { Location: url.toString() },
  });
}

// Using in Server Component
import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";

export default async function Page() {
  const session = await auth.handleRequest(request).validate();
  
  if (!session) {
    return <a href="/login">Sign in</a>;
  }

  return (
    <div>
      <p>Signed in as {session.user.email}</p>
      <form action="/api/logout" method="POST">
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}

// Middleware protection
// middleware.ts
import { auth } from "@/lib/lucia";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const session = await auth.handleRequest(request).validate();
  
  if (!session) {
    const url = request.url;
    return NextResponse.redirect(new URL("/login", url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"],
};`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>NextAuth</th>
              <th style={thStyle}>Lucia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'OAuth 2.0' : 'OAuth 2.0', '✓ 50+ providers', '✓ Manual setup'],
              [isZh ? '邮件魔法链接' : 'Email Magic Links', '✓ Built-in', '✗ Manual'],
              [isZh ? '凭据认证' : 'Credentials Auth', '✓', '✓'],
              [isZh ? 'JWT会话' : 'JWT Sessions', '✓', '✗'],
              [isZh ? '数据库会话' : 'Database Sessions', '✓', '✓'],
              [isZh ? '多因素认证' : 'MFA Support', '✓ @next-auth/mfa', '✓ Manual'],
              [isZh ? 'WebAuthn/Passkeys' : 'WebAuthn/Passkeys', '✓', '✓'],
              [isZh ? '中间件保护' : 'Middleware Protection', '✓ Built-in', '✓ Manual'],
              [isZh ? '角色/权限' : 'Role/Permissions', '✓ Manual', '✓ Manual'],
              [isZh ? '账户关联' : 'Account Linking', '✓ Automatic', '✓ Manual'],
              [isZh ? '用户管理' : 'User Management', '✓ Basic', '✓ Full control'],
              [isZh ? '审计日志' : 'Audit Logs', '✗ Manual', '✗ Manual'],
            ].map(([feature, nextauth, lucia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{nextauth}</td>
                <td style={tdStyle}>{lucia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security */}
      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #6366f1' }}>
          <strong style={{ color: '#6366f1' }}>NextAuth</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '内置CSRF保护、状态参数验证、PKCE支持。JWT签名使用RS256/HS256。自动处理令牌刷新和会话过期。支持安全cookie设置。' : 'Built-in CSRF protection, state parameter validation, PKCE support. JWT signing with RS256/HS256. Automatic token refresh and session expiration handling. Supports secure cookie settings.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f472b6' }}>
          <strong style={{ color: '#f472b6' }}>Lucia</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '透明的安全实现。会话令牌使用cryptographically secure随机生成。需要手动实现CSRF保护。完全控制密码哈希算法（推荐Scrypt/Argon2）。' : 'Transparent security implementation. Session tokens use cryptographically secure random generation. CSRF protection requires manual implementation. Full control over password hashing algorithm (Scrypt/Argon2 recommended).'}
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.nextAuthBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Next.js项目' : 'Next.js projects'}</li>
            <li>{isZh ? '需要快速OAuth集成' : 'Quick OAuth integration needed'}</li>
            <li>{isZh ? '标准认证流程' : 'Standard auth flows'}</li>
            <li>{isZh ? '团队较小，需要开箱即用' : 'Small teams, out-of-box solution'}</li>
            <li>{isZh ? '需要多种OAuth提供商' : 'Multiple OAuth providers needed'}</li>
            <li>{isZh ? '邮件魔法链接认证' : 'Email magic link auth'}</li>
            <li>{isZh ? 'JWT会话偏好' : 'JWT session preference'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f472b6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f472b6' }}>{ct.luciaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多框架应用' : 'Multi-framework apps'}</li>
            <li>{isZh ? '自定义认证流程' : 'Custom auth flows'}</li>
            <li>{isZh ? '需要完全控制' : 'Need full control'}</li>
            <li>{isZh ? '复杂用户管理' : 'Complex user management'}</li>
            <li>{isZh ? '非Next.js框架' : 'Non-Next.js frameworks'}</li>
            <li>{isZh ? '轻量级解决方案' : 'Lightweight solution'}</li>
            <li>{isZh ? '自托管认证' : 'Self-hosted authentication'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
        <a href={'/' + lang + '/tools/hash-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
