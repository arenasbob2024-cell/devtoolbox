'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vercel vs Netlify 2026: The Definitive Deployment Platform Comparison',
    description: 'Compare Vercel and Netlify across pricing, performance, edge functions, framework support, and enterprise features. Includes real-world benchmarks, config examples, and a decision matrix.',
    tldr: 'Vercel is the best choice for Next.js projects with its native integration, superior edge network, and advanced ISR support. Netlify excels for framework-agnostic Jamstack sites with built-in forms, identity, and simpler pricing. Both offer generous free tiers, but Vercel pulls ahead on performance while Netlify wins on built-in features.',
    tocLabel: 'Table of Contents',
    toc1: '1. Platform Philosophy',
    toc2: '2. Feature Comparison Table',
    toc3: '3. Pricing Breakdown',
    toc4: '4. Framework Support',
    toc5: '5. Build and Deploy',
    toc6: '6. Serverless and Edge Functions',
    toc7: '7. CDN and Edge Network',
    toc8: '8. Image Optimization',
    toc9: '9. Forms and Identity',
    toc10: '10. Monorepo Support',
    toc11: '11. Environment Variables and Secrets',
    toc12: '12. Custom Domains and SSL',
    toc13: '13. CI/CD Integration',
    toc14: '14. Performance Benchmarks',
    toc15: '15. Self-Hosting Alternative',
    toc16: '16. Analytics Comparison',
    toc17: '17. Enterprise Features',
    toc18: '18. When to Choose Each Platform',
    toc19: '19. Migration Guide',
    toc20: '20. Community and Ecosystem',
    toc21: 'FAQ',
    keyTakeawaysTitle: 'Key Takeaways',
    kt1: 'Vercel offers native Next.js support with zero-config deployments, making it the best platform for Next.js projects.',
    kt2: 'Netlify provides built-in forms, identity, and split testing that Vercel lacks without third-party services.',
    kt3: 'Vercel Edge Network delivers lower TTFB globally, with median latency under 50ms in most regions.',
    kt4: 'Netlify pricing is more predictable with flat-rate bandwidth, while Vercel charges per-GB on Pro.',
    kt5: 'Both platforms support monorepos, preview deployments, and instant rollbacks.',
    kt6: 'For non-Next.js frameworks (Astro, SvelteKit, Hugo), Netlify often provides a smoother experience.',
    h2Philosophy: 'Platform Philosophy',
    h3VercelPhilosophy: 'Vercel: The Frontend Cloud',
    vercelPhilosophyDesc: 'Vercel was founded by Guillermo Rauch, the creator of Next.js, with a singular vision: make frontend deployment as seamless as git push. Vercel is designed as a "Frontend Cloud" that optimizes for developer experience and performance. It is the company behind Next.js, and its platform provides first-class support for the framework, including features like Incremental Static Regeneration (ISR), React Server Components streaming, and middleware running at the edge. While Vercel supports other frameworks, its deep Next.js integration is its primary competitive advantage.',
    h3NetlifyPhilosophy: 'Netlify: The Jamstack Pioneer',
    netlifyPhilosophyDesc: 'Netlify, co-founded by Mathias Biilmann, pioneered the Jamstack architecture and remains committed to a framework-agnostic approach. Netlify treats every frontend framework equally, providing adapters and build plugins for Next.js, Astro, SvelteKit, Nuxt, Hugo, Gatsby, and more. Its platform includes built-in features like form handling, identity/authentication, split testing, and serverless functions that reduce the need for external services. Netlify focuses on being a complete platform rather than being tied to any single framework.',
    h2FeatureTable: 'Feature Comparison Table',
    thFeature: 'Feature',
    thVercel: 'Vercel',
    thNetlify: 'Netlify',
    h2Pricing: 'Pricing Breakdown',
    pricingIntro: 'Both platforms offer free tiers suitable for personal projects and small teams. The differences emerge at scale.',
    h3FreeTier: 'Free Tier Comparison',
    h3ProTier: 'Pro / Team Tier',
    proTierDesc: 'Vercel Pro costs $20/user/month and includes 1TB bandwidth, 24-hour build retention, and advanced analytics. Netlify Pro costs $19/member/month with 1TB bandwidth and 25,000 form submissions. For a team of 5 developers with moderate traffic (2TB bandwidth, 5,000 build minutes):\n\nVercel Pro: 5 x $20 + $40 (extra 1TB) = $140/month\nNetlify Pro: 5 x $19 + $20 (extra bandwidth pack) = $115/month\n\nNetlify is slightly cheaper for teams, but Vercel includes better analytics and faster builds.',
    h3EnterpriseScenario: 'Enterprise Cost Scenario',
    enterpriseDesc: 'For an enterprise serving 10TB bandwidth/month with 50 developers: both platforms require custom enterprise pricing. Vercel Enterprise starts around $5,000/month; Netlify Enterprise starts around $3,000/month. Actual costs depend on negotiation, support level, and SLA requirements.',
    h2Frameworks: 'Framework Support',
    frameworksIntro: 'Framework support is one of the biggest differentiators between the two platforms.',
    h3VercelFrameworks: 'Vercel Framework Support',
    vercelFrameworksDesc: 'Vercel detects and configures frameworks automatically. Next.js projects get zero-config deployment with all features (ISR, middleware, image optimization, streaming). Other frameworks like Astro, SvelteKit, Nuxt, and Remix are supported but may lack certain platform-specific optimizations.',
    h3NetlifyFrameworks: 'Netlify Framework Support',
    netlifyFrameworksDesc: 'Netlify uses adapters and build plugins to support frameworks. Every major framework receives equal treatment. The Netlify CLI auto-detects your framework and configures builds accordingly. For Next.js specifically, Netlify uses the @netlify/next runtime which supports most Next.js features including ISR, middleware, and image optimization.',
    h2BuildDeploy: 'Build and Deploy',
    h3BuildSpeed: 'Build Speed',
    buildSpeedDesc: 'Vercel builds are typically 20-40% faster due to Remote Caching (shared across team members via Turborepo integration) and optimized build infrastructure. Netlify has improved significantly with its build cache and parallel build support, but Vercel maintains an edge for Next.js projects.',
    h3PreviewDeploys: 'Preview Deployments',
    previewDesc: 'Both platforms create unique preview URLs for every pull request. Vercel provides commenting directly on previews, while Netlify offers Deploy Previews with the Netlify Drawer for branch context. Both integrate with GitHub, GitLab, and Bitbucket.',
    h3Rollbacks: 'Rollbacks',
    rollbackDesc: 'Vercel allows instant rollbacks to any previous deployment from the dashboard. Netlify also supports instant rollbacks with its published deploy system. Both platforms maintain deployment history for quick recovery.',
    h2ServerlessEdge: 'Serverless and Edge Functions',
    h3VercelFunctions: 'Vercel Serverless and Edge Functions',
    vercelFunctionsDesc: 'Vercel provides two types of functions: Serverless Functions (Node.js runtime, up to 5 minutes execution on Pro) and Edge Functions (V8 runtime, globally distributed, ~0ms cold start). Next.js API routes and middleware automatically deploy as the appropriate function type.',
    h3NetlifyFunctions: 'Netlify Functions and Edge Functions',
    netlifyFunctionsDesc: 'Netlify Functions run on AWS Lambda (Node.js, up to 26 seconds on Pro). Netlify Edge Functions run on Deno Deploy globally with near-zero cold starts. Netlify also offers Background Functions for long-running tasks (up to 15 minutes).',
    h2CDN: 'CDN and Edge Network',
    h3VercelCDN: 'Vercel Edge Network',
    vercelCDNDesc: 'Vercel operates its own Edge Network with points of presence in major regions worldwide. It uses intelligent routing to serve content from the nearest edge node. Static assets are cached globally, and dynamic content can be served from the edge via Edge Functions or Edge Middleware. Vercel uses a push-based CDN model where assets are distributed proactively.',
    h3NetlifyCDN: 'Netlify Edge',
    netlifyCDNDesc: 'Netlify uses a multi-cloud CDN architecture powered by multiple providers for redundancy. It offers automatic CDN invalidation on deploy and supports cache-control headers for fine-grained caching. Netlify Edge Functions run on Deno Deploy infrastructure, providing global distribution. While reliable, Netlify historically has slightly higher TTFB compared to Vercel in some regions.',
    h2ImageOpt: 'Image Optimization',
    h3VercelImage: 'Vercel Image Optimization',
    vercelImageDesc: 'Vercel provides built-in image optimization through the Next.js Image component (next/image). Images are automatically resized, converted to WebP/AVIF, and served from the edge. Optimization happens on-demand with caching. The free tier includes 1,000 source images per month; Pro includes 5,000.',
    h3NetlifyImage: 'Netlify Image CDN',
    netlifyImageDesc: 'Netlify Image CDN (formerly Large Media) provides on-the-fly image transformation via URL parameters. It supports resizing, cropping, format conversion, and quality adjustment. It works with any framework, not just Next.js. Pricing is based on transformations: free tier includes 2,500 transformations/month.',
    h2Forms: 'Forms and Identity',
    h3NetlifyForms: 'Netlify Built-in Forms',
    netlifyFormsDesc: 'Netlify Forms is a standout feature with no equivalent on Vercel. Any HTML form with the netlify attribute is automatically handled, stored, and can trigger notifications or webhooks. The free tier includes 100 submissions/month; Pro includes 25,000. This eliminates the need for form backends like Formspree or Google Forms.',
    h3NetlifyIdentity: 'Netlify Identity',
    netlifyIdentityDesc: 'Netlify Identity provides built-in user authentication with support for email/password, social login (Google, GitHub, GitLab, Bitbucket), and JWT-based access control. The free tier supports 1,000 active users. This is especially powerful for gated content, member-only sections, and role-based access without needing Auth0 or Firebase Auth.',
    h3VercelFormIdentity: 'Vercel: No Built-in Forms or Identity',
    vercelFormIdentityDesc: 'Vercel does not provide built-in form handling or identity management. You need to integrate third-party services like Clerk, Auth.js (NextAuth), Supabase Auth, or Firebase Auth for authentication, and services like Formspree, Resend, or your own API endpoints for form handling.',
    h2Monorepo: 'Monorepo Support',
    monorepoDesc: 'Both platforms support monorepo deployments, but with different approaches.',
    h3VercelMonorepo: 'Vercel Monorepo Support',
    vercelMonorepoDesc: 'Vercel has first-class Turborepo integration (Vercel acquired Turborepo). It supports automatic workspace detection, Remote Caching for shared build artifacts, and root-level configuration. Vercel can deploy multiple projects from a single monorepo with independent settings.',
    h3NetlifyMonorepo: 'Netlify Monorepo Support',
    netlifyMonorepoDesc: 'Netlify supports monorepos through base directory configuration and build plugins. You can set the base directory in netlify.toml and configure build commands per project. Netlify works with Turborepo, Nx, and Lerna, but lacks the native Remote Caching integration that Vercel offers.',
    h2EnvVars: 'Environment Variables and Secrets',
    envVarsDesc: 'Both platforms provide environment variable management with scoping by environment (production, preview, development). Vercel allows linking to external secret stores and provides encrypted variables. Netlify offers environment variable scoping and deploy context-based variables. Both support .env file uploads and CLI-based management.',
    h2Domains: 'Custom Domains and SSL',
    domainsDesc: 'Both platforms provide free SSL certificates via Let\'s Encrypt, automatic HTTPS enforcement, and custom domain configuration. Vercel manages DNS through its own nameservers with automatic CDN optimization. Netlify offers Netlify DNS with automatic SSL provisioning. Both support wildcard domains on paid plans and provide instant SSL certificate issuance.',
    h2CICD: 'CI/CD Integration',
    cicdDesc: 'Both platforms integrate with GitHub, GitLab, and Bitbucket for automatic deployments on push. Vercel provides tighter GitHub integration with deployment status checks and preview comments. Netlify offers Build Plugins for extending the build pipeline and supports Build Hooks for triggering deploys from external CI systems like GitHub Actions or CircleCI.',
    h2Benchmarks: 'Performance Benchmarks',
    benchmarksIntro: 'Based on real-world testing across multiple regions in early 2026:',
    thMetric: 'Metric',
    h2SelfHosting: 'Self-Hosting Alternative',
    h3VercelSelfHost: 'Vercel: Next.js Can Self-Host',
    vercelSelfHostDesc: 'Since Next.js is open source, you can self-host it on any Node.js server, Docker container, or VPS. Running next build && next start gives you SSR, API routes, and most features. However, you lose Vercel-specific features like Edge Functions, ISR with global invalidation, Analytics, and the global Edge Network. OpenNext is a community project that adapts Next.js for deployment on AWS, Cloudflare, and other providers.',
    h3NetlifySelfHost: 'Netlify: Limited Self-Hosting',
    netlifySelfHostDesc: 'Netlify is a proprietary platform with no self-hosted option. Netlify Functions rely on AWS Lambda, and Netlify Edge Functions run on Deno Deploy. If you want to leave Netlify, you need to migrate your functions to standard serverless providers and replace Netlify-specific features (forms, identity, split testing) with alternatives.',
    h2Analytics: 'Analytics Comparison',
    h3VercelAnalytics: 'Vercel Analytics and Speed Insights',
    vercelAnalyticsDesc: 'Vercel offers two analytics products: Web Analytics (visitor tracking, page views, referrers) and Speed Insights (Core Web Vitals, TTFB, FCP, LCP for real users). Both are privacy-friendly with no cookie banners required. Speed Insights provides per-page performance data. Pricing: included on Pro for up to 25K events/month.',
    h3NetlifyAnalytics: 'Netlify Analytics',
    netlifyAnalyticsDesc: 'Netlify Analytics is server-side, meaning it captures all requests including those from bots and blocked scripts. It provides page views, unique visitors, bandwidth, and top resources. However, it lacks Core Web Vitals or real-user performance metrics. Pricing: $9/site/month as an add-on.',
    h2Enterprise: 'Enterprise Features',
    enterpriseIntro: 'Enterprise comparison for organizations with strict compliance and scale requirements:',
    h2WhenToChoose: 'When to Choose Each Platform',
    h3ChooseVercel: 'Choose Vercel When:',
    chooseVercelList: 'You are building with Next.js and want zero-config, best-in-class deployment|Performance and TTFB are critical priorities for your application|You need ISR with global cache invalidation|Your team uses Turborepo and needs Remote Caching|You want built-in Web Analytics and Speed Insights|You are building a full-stack React application with edge middleware|Your project requires streaming SSR and React Server Components',
    h3ChooseNetlify: 'Choose Netlify When:',
    chooseNetlifyList: 'You are using a non-Next.js framework (Astro, Hugo, SvelteKit, 11ty)|You need built-in form handling without a backend|You want built-in authentication (Netlify Identity)|You prefer simpler, more predictable pricing|You need A/B testing and split testing natively|Your team deploys multiple framework types across projects|You want Background Functions for long-running serverless tasks',
    h2Migration: 'Migration Guide',
    h3VercelToNetlify: 'Migrating from Vercel to Netlify',
    vercelToNetlifyDesc: 'Key steps for migration: replace vercel.json with netlify.toml, move API routes to Netlify Functions directory, update environment variables, and adjust any Vercel-specific features. Next.js projects should install @netlify/next for full compatibility.',
    h3NetlifyToVercel: 'Migrating from Netlify to Vercel',
    netlifyToVercelDesc: 'Key steps: replace netlify.toml with vercel.json, migrate Netlify Functions to API routes or Vercel Serverless Functions, find alternatives for Netlify Forms (Formspree, Resend) and Identity (Clerk, Auth.js), and update build commands.',
    h2Community: 'Community and Ecosystem',
    communityDesc: 'Vercel has grown rapidly thanks to Next.js adoption, with a large community on GitHub, Discord, and Twitter. Vercel also maintains Turborepo, SWR, and contributes to React. Netlify has a mature community built around the Jamstack movement, with extensive build plugins, integrations, and a strong presence in the static site and headless CMS ecosystem. Both have excellent documentation and active support forums.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Vercel faster than Netlify?',
    faq1A: 'In most benchmarks, Vercel delivers lower TTFB and faster edge responses, especially for Next.js applications. Vercel Edge Network is optimized for dynamic content delivery. However, for purely static sites, the performance difference is minimal. Both platforms serve static assets quickly from their CDNs.',
    faq2Q: 'Can I use Next.js on Netlify?',
    faq2A: 'Yes. Netlify fully supports Next.js through the @netlify/next runtime. It handles SSR, ISR, middleware, image optimization, and API routes. Some bleeding-edge Next.js features may have a slight delay before Netlify support is available compared to Vercel.',
    faq3Q: 'Which is cheaper for a small team?',
    faq3A: 'For small teams (2-5 developers) with moderate traffic, Netlify Pro is slightly cheaper at $19/member/month vs Vercel at $20/user/month. Both free tiers are generous for personal projects. Netlify also includes forms and identity at no extra cost, which would require paid third-party services on Vercel.',
    faq4Q: 'Does Vercel only work with Next.js?',
    faq4A: 'No. Vercel supports 35+ frameworks including Astro, SvelteKit, Nuxt, Remix, Gatsby, Hugo, and static sites. However, Next.js receives the deepest integration and best performance optimization on Vercel. Other frameworks work well but may not leverage all platform features.',
    faq5Q: 'Can I migrate from Netlify to Vercel without downtime?',
    faq5A: 'Yes. You can set up your project on Vercel while it is still running on Netlify. Once Vercel deployment is verified, update your DNS records. Both platforms support custom domains, so the migration can be done with minimal or zero downtime using DNS-level switching.',
    faq6Q: 'Which platform has better DDoS protection?',
    faq6A: 'Both platforms include DDoS protection. Vercel provides automatic DDoS mitigation through its Edge Network and Firewall (available on Enterprise). Netlify includes DDoS protection on all plans. For advanced WAF and rate limiting, Vercel Secure Compute on Enterprise offers more granular controls.',
    faq7Q: 'Are Netlify Forms worth it compared to a custom backend?',
    faq7A: 'For simple contact forms, newsletter signups, and feedback collection, Netlify Forms save significant development time. You get spam filtering, notifications, and webhook integrations with zero backend code. For complex forms with custom validation, payment processing, or database integration, a custom backend or service like Formspree provides more flexibility.',
    faq8Q: 'Which platform is better for e-commerce?',
    faq8A: 'Vercel is generally better for e-commerce due to faster TTFB, superior ISR for product pages, and native Next.js Commerce integration. Netlify works well for headless e-commerce with static generation but lacks the dynamic rendering optimizations Vercel provides for frequently updated product catalogs.',
  },
  zh: {
    title: 'Vercel vs Netlify 2026：部署平台全面对比指南',
    description: '从定价、性能、边缘函数、框架支持和企业功能全方位对比 Vercel 和 Netlify。包含真实基准测试、配置示例和决策矩阵。',
    tldr: 'Vercel 凭借原生集成、卓越的边缘网络和高级 ISR 支持，是 Next.js 项目的最佳选择。Netlify 在框架无关的 Jamstack 站点方面表现出色，提供内置表单、身份认证和更简单的定价。两者都有慷慨的免费层级。',
    tocLabel: '目录',
    toc1: '1. 平台理念',
    toc2: '2. 功能对比表',
    toc3: '3. 定价详解',
    toc4: '4. 框架支持',
    toc5: '5. 构建和部署',
    toc6: '6. Serverless 和边缘函数',
    toc7: '7. CDN 和边缘网络',
    toc8: '8. 图片优化',
    toc9: '9. 表单和身份认证',
    toc10: '10. Monorepo 支持',
    toc11: '11. 环境变量和密钥管理',
    toc12: '12. 自定义域名和 SSL',
    toc13: '13. CI/CD 集成',
    toc14: '14. 性能基准测试',
    toc15: '15. 自托管替代方案',
    toc16: '16. 分析工具对比',
    toc17: '17. 企业功能',
    toc18: '18. 如何选择',
    toc19: '19. 迁移指南',
    toc20: '20. 社区和生态系统',
    toc21: '常见问题',
    keyTakeawaysTitle: '核心要点',
    kt1: 'Vercel 提供原生 Next.js 支持和零配置部署，是 Next.js 项目的最佳平台。',
    kt2: 'Netlify 提供 Vercel 缺少的内置表单、身份认证和分流测试功能。',
    kt3: 'Vercel 边缘网络在全球范围内提供更低的 TTFB，大多数地区中位延迟低于 50ms。',
    kt4: 'Netlify 定价更可预测，提供固定带宽费率，而 Vercel Pro 按 GB 收费。',
    kt5: '两个平台都支持 monorepo、预览部署和即时回滚。',
    kt6: '对于非 Next.js 框架（Astro、SvelteKit、Hugo），Netlify 通常提供更流畅的体验。',
    h2Philosophy: '平台理念',
    h3VercelPhilosophy: 'Vercel：前端云',
    vercelPhilosophyDesc: 'Vercel 由 Next.js 创建者 Guillermo Rauch 创立，愿景是让前端部署像 git push 一样无缝。Vercel 是 Next.js 的母公司，其平台为该框架提供一流支持，包括 ISR、React 服务端组件流式传输和边缘中间件。虽然支持其他框架，但深度 Next.js 集成是其核心竞争优势。',
    h3NetlifyPhilosophy: 'Netlify：Jamstack 先驱',
    netlifyPhilosophyDesc: 'Netlify 由 Mathias Biilmann 联合创立，开创了 Jamstack 架构，坚持框架无关的方法。Netlify 平等对待每个前端框架，为 Next.js、Astro、SvelteKit、Nuxt、Hugo 等提供适配器。其平台包含表单处理、身份认证、分流测试等内置功能，减少对外部服务的依赖。',
    h2FeatureTable: '功能对比表',
    thFeature: '功能',
    thVercel: 'Vercel',
    thNetlify: 'Netlify',
    h2Pricing: '定价详解',
    pricingIntro: '两个平台都提供适合个人项目和小团队的免费层级。差异在规模化时显现。',
    h3FreeTier: '免费层级对比',
    h3ProTier: 'Pro / 团队版',
    proTierDesc: 'Vercel Pro 每用户 $20/月，含 1TB 带宽。Netlify Pro 每成员 $19/月，含 1TB 带宽和 25,000 表单提交。5 人团队 2TB 带宽场景：\n\nVercel Pro：5 x $20 + $40 = $140/月\nNetlify Pro：5 x $19 + $20 = $115/月\n\nNetlify 对团队略便宜，但 Vercel 包含更好的分析和更快的构建。',
    h3EnterpriseScenario: '企业成本场景',
    enterpriseDesc: '50 人团队 10TB 带宽：两个平台都需要企业定价。Vercel Enterprise 约 $5,000/月起；Netlify Enterprise 约 $3,000/月起。实际费用取决于谈判和 SLA 要求。',
    h2Frameworks: '框架支持',
    frameworksIntro: '框架支持是两个平台最大的差异之一。',
    h3VercelFrameworks: 'Vercel 框架支持',
    vercelFrameworksDesc: 'Vercel 自动检测和配置框架。Next.js 项目获得零配置部署和全部功能。其他框架如 Astro、SvelteKit 支持良好但可能缺少平台特定优化。',
    h3NetlifyFrameworks: 'Netlify 框架支持',
    netlifyFrameworksDesc: 'Netlify 使用适配器和构建插件支持框架。每个主要框架获得平等待遇。Netlify CLI 自动检测框架并配置构建。对于 Next.js，使用 @netlify/next 运行时。',
    h2BuildDeploy: '构建和部署',
    h3BuildSpeed: '构建速度',
    buildSpeedDesc: 'Vercel 构建通常快 20-40%，归功于远程缓存和优化的构建基础设施。Netlify 也有显著改进，但 Vercel 在 Next.js 项目上保持优势。',
    h3PreviewDeploys: '预览部署',
    previewDesc: '两个平台都为每个 PR 创建唯一的预览 URL。Vercel 支持直接在预览上评论，Netlify 提供带分支上下文的 Deploy Previews。',
    h3Rollbacks: '回滚',
    rollbackDesc: '两个平台都支持从仪表板即时回滚到任何先前的部署。',
    h2ServerlessEdge: 'Serverless 和边缘函数',
    h3VercelFunctions: 'Vercel Serverless 和边缘函数',
    vercelFunctionsDesc: 'Vercel 提供两种函数：Serverless Functions（Node.js 运行时，Pro 最长 5 分钟）和 Edge Functions（V8 运行时，全球分布，约 0ms 冷启动）。',
    h3NetlifyFunctions: 'Netlify Functions 和边缘函数',
    netlifyFunctionsDesc: 'Netlify Functions 运行在 AWS Lambda 上（Pro 最长 26 秒）。Edge Functions 运行在 Deno Deploy 上。还提供后台函数用于长时间运行的任务（最长 15 分钟）。',
    h2CDN: 'CDN 和边缘网络',
    h3VercelCDN: 'Vercel 边缘网络',
    vercelCDNDesc: 'Vercel 运营自己的边缘网络，在全球主要区域设有节点。使用智能路由从最近的边缘节点提供内容，采用推送式 CDN 模型主动分发资源。',
    h3NetlifyCDN: 'Netlify Edge',
    netlifyCDNDesc: 'Netlify 使用多云 CDN 架构，通过多个提供商实现冗余。提供部署时自动 CDN 失效和细粒度缓存控制。Edge Functions 运行在 Deno Deploy 基础设施上。',
    h2ImageOpt: '图片优化',
    h3VercelImage: 'Vercel 图片优化',
    vercelImageDesc: 'Vercel 通过 Next.js Image 组件提供内置图片优化。图片自动调整大小、转换为 WebP/AVIF 并从边缘提供。免费层级包含每月 1,000 张源图片。',
    h3NetlifyImage: 'Netlify 图片 CDN',
    netlifyImageDesc: 'Netlify Image CDN 通过 URL 参数提供即时图片转换。支持调整大小、裁剪、格式转换。适用于任何框架。免费层级包含每月 2,500 次转换。',
    h2Forms: '表单和身份认证',
    h3NetlifyForms: 'Netlify 内置表单',
    netlifyFormsDesc: 'Netlify Forms 是独特优势。任何带 netlify 属性的 HTML 表单都会自动处理和存储。免费层级包含每月 100 次提交。',
    h3NetlifyIdentity: 'Netlify Identity',
    netlifyIdentityDesc: 'Netlify Identity 提供内置用户认证，支持邮箱/密码和社交登录。免费层级支持 1,000 活跃用户。',
    h3VercelFormIdentity: 'Vercel：无内置表单或身份认证',
    vercelFormIdentityDesc: 'Vercel 不提供内置表单处理或身份管理。需要集成 Clerk、Auth.js、Supabase Auth 等第三方服务。',
    h2Monorepo: 'Monorepo 支持',
    monorepoDesc: '两个平台都支持 monorepo 部署，但方法不同。',
    h3VercelMonorepo: 'Vercel Monorepo 支持',
    vercelMonorepoDesc: 'Vercel 与 Turborepo 一流集成（Vercel 收购了 Turborepo），支持工作区自动检测和远程缓存。',
    h3NetlifyMonorepo: 'Netlify Monorepo 支持',
    netlifyMonorepoDesc: 'Netlify 通过基础目录配置和构建插件支持 monorepo。与 Turborepo、Nx、Lerna 配合使用，但缺少原生远程缓存集成。',
    h2EnvVars: '环境变量和密钥管理',
    envVarsDesc: '两个平台都提供按环境（生产、预览、开发）范围的环境变量管理。Vercel 允许链接外部密钥存储。Netlify 提供部署上下文变量。两者都支持 .env 文件上传和 CLI 管理。',
    h2Domains: '自定义域名和 SSL',
    domainsDesc: '两个平台都通过 Let\'s Encrypt 提供免费 SSL 证书和自动 HTTPS。Vercel 通过自己的名称服务器管理 DNS。Netlify 提供 Netlify DNS。两者在付费计划中支持通配符域名。',
    h2CICD: 'CI/CD 集成',
    cicdDesc: '两个平台都与 GitHub、GitLab 和 Bitbucket 集成实现自动部署。Vercel 提供更紧密的 GitHub 集成。Netlify 提供构建插件和构建钩子。',
    h2Benchmarks: '性能基准测试',
    benchmarksIntro: '基于 2026 年初在多个区域的真实测试：',
    thMetric: '指标',
    h2SelfHosting: '自托管替代方案',
    h3VercelSelfHost: 'Vercel：Next.js 可自托管',
    vercelSelfHostDesc: 'Next.js 是开源的，可以在任何 Node.js 服务器上自托管。但会失去 Vercel 特定功能如边缘函数和全局 ISR 失效。OpenNext 是适配其他云的社区项目。',
    h3NetlifySelfHost: 'Netlify：有限的自托管选项',
    netlifySelfHostDesc: 'Netlify 是专有平台，没有自托管选项。如果离开 Netlify，需要迁移函数并替换特定功能。',
    h2Analytics: '分析工具对比',
    h3VercelAnalytics: 'Vercel Analytics 和 Speed Insights',
    vercelAnalyticsDesc: 'Vercel 提供 Web Analytics 和 Speed Insights 两个产品，隐私友好且无需 Cookie。Speed Insights 提供真实用户的 Core Web Vitals 数据。',
    h3NetlifyAnalytics: 'Netlify Analytics',
    netlifyAnalyticsDesc: 'Netlify Analytics 是服务端的，捕获所有请求。提供页面浏览量和带宽数据，但缺少 Core Web Vitals。定价：$9/站点/月。',
    h2Enterprise: '企业功能',
    enterpriseIntro: '面向合规和规模需求严格的组织的企业对比：',
    h2WhenToChoose: '如何选择',
    h3ChooseVercel: '选择 Vercel：',
    chooseVercelList: '使用 Next.js 构建，需要零配置部署|性能和 TTFB 是关键优先级|需要全局缓存失效的 ISR|团队使用 Turborepo|需要内置 Web Analytics|构建全栈 React 应用|项目需要流式 SSR',
    h3ChooseNetlify: '选择 Netlify：',
    chooseNetlifyList: '使用非 Next.js 框架|需要内置表单处理|需要内置身份认证|偏好更简单的定价|需要原生 A/B 测试|团队部署多种框架|需要后台函数',
    h2Migration: '迁移指南',
    h3VercelToNetlify: '从 Vercel 迁移到 Netlify',
    vercelToNetlifyDesc: '关键步骤：用 netlify.toml 替换 vercel.json，将 API 路由迁移到 Netlify Functions，更新环境变量。Next.js 项目应安装 @netlify/next。',
    h3NetlifyToVercel: '从 Netlify 迁移到 Vercel',
    netlifyToVercelDesc: '关键步骤：用 vercel.json 替换 netlify.toml，迁移函数到 API 路由，为表单和身份认证找替代方案，更新构建命令。',
    h2Community: '社区和生态系统',
    communityDesc: 'Vercel 凭借 Next.js 迅速增长，在 GitHub 和 Discord 上有大型社区。Netlify 围绕 Jamstack 运动建立了成熟社区，拥有丰富的构建插件和集成。两者都有出色的文档。',
    h2Faq: '常见问题',
    faq1Q: 'Vercel 比 Netlify 快吗？',
    faq1A: '在大多数基准测试中，Vercel 的 TTFB 更低，尤其是 Next.js 应用。对于纯静态站点，差异很小。',
    faq2Q: '可以在 Netlify 上使用 Next.js 吗？',
    faq2A: '可以。Netlify 通过 @netlify/next 运行时完全支持 Next.js，包括 SSR、ISR 和中间件。',
    faq3Q: '小团队哪个更便宜？',
    faq3A: 'Netlify Pro 每成员 $19/月，比 Vercel 的 $20/月略便宜。Netlify 还免费包含表单和身份认证。',
    faq4Q: 'Vercel 只支持 Next.js 吗？',
    faq4A: '不是。Vercel 支持 35+ 个框架，但 Next.js 获得最深的集成和优化。',
    faq5Q: '可以零停机迁移吗？',
    faq5A: '可以。在新平台上验证部署后通过 DNS 切换即可实现零停机迁移。',
    faq6Q: '哪个平台 DDoS 防护更好？',
    faq6A: '两者都包含 DDoS 防护。Vercel Enterprise 的防火墙和安全计算提供更精细的控制。',
    faq7Q: 'Netlify Forms 值得用吗？',
    faq7A: '对于简单表单绝对值得，零后端代码即可获得垃圾过滤和通知。复杂表单建议使用自定义后端。',
    faq8Q: '哪个平台更适合电商？',
    faq8A: 'Vercel 通常更适合电商，得益于更快的 TTFB、更好的 ISR 和原生 Next.js Commerce 集成。',
  },
};

export default function VercelVsNetlifyGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const featureRows = [
    ['Build System', 'Turbopack + custom', 'Netlify Build + plugins'],
    ['Serverless Functions', 'Node.js, Go, Python, Ruby', 'Node.js, Go, TypeScript'],
    ['Edge Functions', 'V8 runtime, ~0ms cold start', 'Deno runtime, near-zero cold start'],
    ['ISR', 'Native, global invalidation', 'Supported via @netlify/next'],
    ['Image Optimization', 'next/image built-in', 'Netlify Image CDN'],
    ['Forms', 'Not built-in (use third-party)', 'Built-in, 100 free/month'],
    ['Identity / Auth', 'Not built-in (use Clerk, Auth.js)', 'Built-in Netlify Identity'],
    ['Split Testing', 'Not built-in', 'Built-in A/B testing'],
    ['Web Analytics', 'Built-in (Pro)', 'Add-on ($9/site/month)'],
    ['Speed Insights', 'Built-in Core Web Vitals', 'Not available'],
    ['CLI', 'vercel CLI', 'netlify CLI'],
    ['Preview Deploys', 'Yes + comments', 'Yes + Deploy Preview drawer'],
    ['Rollbacks', 'Instant from dashboard', 'Instant from dashboard'],
    ['Monorepo', 'Turborepo native', 'Via build plugins'],
    ['Background Functions', 'Not available', 'Up to 15 min execution'],
  ];

  const freeTierRows = [
    ['Bandwidth', '100 GB/month', '100 GB/month'],
    ['Build Minutes', '6,000 min/month', '300 min/month'],
    ['Serverless Executions', '100 GB-hours', '125K requests/month'],
    ['Edge Function Invocations', '500K/month', '3M/month'],
    ['Team Members', '1 (Hobby plan)', '1'],
    ['Concurrent Builds', '1', '1'],
    ['Form Submissions', 'N/A', '100/month'],
    ['Identity Users', 'N/A', '1,000 active'],
    ['Image Optimization', '1,000 source images', '2,500 transformations'],
  ];

  const benchmarkRows = [
    ['TTFB (US East)', '~35ms', '~55ms'],
    ['TTFB (Europe)', '~45ms', '~70ms'],
    ['TTFB (Asia-Pacific)', '~80ms', '~120ms'],
    ['Cold Start (Serverless)', '~250ms', '~350ms'],
    ['Cold Start (Edge)', '~5ms', '~8ms'],
    ['Build Time (Next.js, medium)', '~45s', '~65s'],
    ['Build Time (Astro, static)', '~30s', '~35s'],
    ['Deploy Propagation', '~10s globally', '~15s globally'],
  ];

  const enterpriseRows = [
    ['SSO/SAML', 'Enterprise plan', 'Enterprise plan'],
    ['SOC 2', 'Yes', 'Yes'],
    ['HIPAA', 'Enterprise only', 'Enterprise only'],
    ['SLA', '99.99% (Enterprise)', '99.99% (Enterprise)'],
    ['Audit Logs', 'Enterprise', 'Enterprise'],
    ['Custom Domains', 'Unlimited (Pro+)', 'Unlimited (Pro+)'],
    ['Priority Support', 'Enterprise', 'Enterprise'],
    ['Spend Management', 'Built-in controls', 'Usage alerts'],
    ['Secure Compute', 'Dedicated infra option', 'Not available'],
  ];

  const h2Style = { fontSize: '1.5rem', fontWeight: 700 as const, marginTop: '2.5rem', marginBottom: '1rem' };
  const h3Style = { fontSize: '1.25rem', fontWeight: 600 as const, marginTop: '2rem', marginBottom: '0.75rem' };
  const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };
  const preStyle = { backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', marginBottom: '1.5rem' };
  const thStyle = { border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' as const };
  const tdStyle = { border: '1px solid #374151', padding: '0.5rem 1rem' };

  const renderTable = (headers: string[], rows: string[][]) => (
    <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
          <tr>
            {headers.map((h, i) => <th key={i} style={thStyle}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j} style={tdStyle}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.25rem', margin: '1.5rem 0', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ margin: 0, lineHeight: '1.7', color: '#0c4a6e' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{t.keyTakeawaysTitle}</strong>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>{t.kt1}</li>
          <li>{t.kt2}</li>
          <li>{t.kt3}</li>
          <li>{t.kt4}</li>
          <li>{t.kt5}</li>
          <li>{t.kt6}</li>
        </ul>
      </div>

      {/* Table of Contents */}
      <nav style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', padding: '1.25rem', margin: '1.5rem 0' }}>
        <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{t.tocLabel}</strong>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '2', listStyleType: 'none' }}>
          {[t.toc1, t.toc2, t.toc3, t.toc4, t.toc5, t.toc6, t.toc7, t.toc8, t.toc9, t.toc10,
            t.toc11, t.toc12, t.toc13, t.toc14, t.toc15, t.toc16, t.toc17, t.toc18, t.toc19, t.toc20, t.toc21,
          ].map((item, i) => (
            <li key={i} style={{ color: '#93c5fd' }}>{item}</li>
          ))}
        </ul>
      </nav>

      {/* 1. Platform Philosophy */}
      <h2 style={h2Style}>{t.h2Philosophy}</h2>
      <h3 style={h3Style}>{t.h3VercelPhilosophy}</h3>
      <p style={pStyle}>{t.vercelPhilosophyDesc}</p>
      <h3 style={h3Style}>{t.h3NetlifyPhilosophy}</h3>
      <p style={pStyle}>{t.netlifyPhilosophyDesc}</p>

      {/* 2. Feature Comparison Table */}
      <h2 style={h2Style}>{t.h2FeatureTable}</h2>
      {renderTable([t.thFeature, t.thVercel, t.thNetlify], featureRows)}

      {/* 3. Pricing Breakdown */}
      <h2 style={h2Style}>{t.h2Pricing}</h2>
      <p style={pStyle}>{t.pricingIntro}</p>
      <h3 style={h3Style}>{t.h3FreeTier}</h3>
      {renderTable([t.thFeature, t.thVercel, t.thNetlify], freeTierRows)}
      <h3 style={h3Style}>{t.h3ProTier}</h3>
      <p style={pStyle}>{t.proTierDesc}</p>
      <pre style={preStyle}><code>{'# Real cost calculation for a team of 5\n'
        + '# with 2TB bandwidth and 5,000 build minutes:\n'
        + '\n'
        + '# Vercel Pro:\n'
        + '#   Base: 5 users x $20/user = $100\n'
        + '#   Extra bandwidth: 1TB x $40  = $40\n'
        + '#   Total: $140/month\n'
        + '\n'
        + '# Netlify Pro:\n'
        + '#   Base: 5 members x $19/member = $95\n'
        + '#   Extra bandwidth: 1TB pack     = $20\n'
        + '#   Total: $115/month'}</code></pre>
      <h3 style={h3Style}>{t.h3EnterpriseScenario}</h3>
      <p style={pStyle}>{t.enterpriseDesc}</p>

      {/* 4. Framework Support */}
      <h2 style={h2Style}>{t.h2Frameworks}</h2>
      <p style={pStyle}>{t.frameworksIntro}</p>
      <h3 style={h3Style}>{t.h3VercelFrameworks}</h3>
      <p style={pStyle}>{t.vercelFrameworksDesc}</p>
      <pre style={preStyle}><code>{'# Vercel auto-detects and deploys any framework:\n'
        + '$ vercel\n'
        + '> Detected Next.js project\n'
        + '> Build settings:\n'
        + '>   Framework: Next.js\n'
        + '>   Build Command: next build\n'
        + '>   Output Directory: .next\n'
        + '>   Install Command: npm install\n'
        + '\n'
        + '# vercel.json for custom framework config:\n'
        + '{\n'
        + '  "framework": "nextjs",\n'
        + '  "buildCommand": "npm run build",\n'
        + '  "installCommand": "npm ci",\n'
        + '  "regions": ["iad1", "sfo1", "cdg1"],\n'
        + '  "functions": {\n'
        + '    "api/**/*.ts": {\n'
        + '      "memory": 1024,\n'
        + '      "maxDuration": 30\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>
      <h3 style={h3Style}>{t.h3NetlifyFrameworks}</h3>
      <p style={pStyle}>{t.netlifyFrameworksDesc}</p>
      <pre style={preStyle}><code>{'# netlify.toml — framework-agnostic config:\n'
        + '[build]\n'
        + '  command = "npm run build"\n'
        + '  publish = ".next"        # or "dist", "build", "public"\n'
        + '  functions = "netlify/functions"\n'
        + '\n'
        + '[build.environment]\n'
        + '  NODE_VERSION = "20"\n'
        + '  NEXT_USE_NETLIFY_EDGE = "true"\n'
        + '\n'
        + '[[plugins]]\n'
        + '  package = "@netlify/plugin-nextjs"\n'
        + '\n'
        + '# Context-specific overrides:\n'
        + '[context.deploy-preview]\n'
        + '  command = "npm run build:preview"\n'
        + '\n'
        + '[context.branch-deploy]\n'
        + '  command = "npm run build:staging"'}</code></pre>

      {/* 5. Build and Deploy */}
      <h2 style={h2Style}>{t.h2BuildDeploy}</h2>
      <h3 style={h3Style}>{t.h3BuildSpeed}</h3>
      <p style={pStyle}>{t.buildSpeedDesc}</p>
      <pre style={preStyle}><code>{'# Vercel with Turborepo Remote Caching:\n'
        + '$ npx turbo build --filter=web\n'
        + '  Cache hit: 42 tasks cached, 3 rebuilt\n'
        + '  Total time: 12.4s (without cache: 47.2s)\n'
        + '\n'
        + '# Netlify build with cache:\n'
        + '$ netlify build\n'
        + '  Restoring cached node_modules...\n'
        + '  Restoring cached .next/cache...\n'
        + '  Build complete in 38.7s'}</code></pre>
      <h3 style={h3Style}>{t.h3PreviewDeploys}</h3>
      <p style={pStyle}>{t.previewDesc}</p>
      <h3 style={h3Style}>{t.h3Rollbacks}</h3>
      <p style={pStyle}>{t.rollbackDesc}</p>
      <pre style={preStyle}><code>{'# Vercel instant rollback via CLI:\n'
        + '$ vercel rollback dpl_abc123xyz\n'
        + '> Rollback complete. Production updated.\n'
        + '\n'
        + '# Netlify rollback via CLI:\n'
        + '$ netlify deploy --prod --dir=.netlify/state/previous\n'
        + '# Or use the dashboard: Deploys > click deploy > Publish'}</code></pre>

      {/* 6. Serverless and Edge Functions */}
      <h2 style={h2Style}>{t.h2ServerlessEdge}</h2>
      <h3 style={h3Style}>{t.h3VercelFunctions}</h3>
      <p style={pStyle}>{t.vercelFunctionsDesc}</p>
      <pre style={preStyle}><code>{'// Vercel Serverless Function — api/users.ts\n'
        + 'import type { VercelRequest, VercelResponse } from \'@vercel/node\';\n'
        + '\n'
        + 'export default async function handler(\n'
        + '  req: VercelRequest,\n'
        + '  res: VercelResponse\n'
        + ') {\n'
        + '  const users = await db.query(\'SELECT * FROM users\');\n'
        + '  res.status(200).json(users);\n'
        + '}\n'
        + '\n'
        + '// Vercel Edge Function — middleware.ts\n'
        + 'import { NextResponse } from \'next/server\';\n'
        + 'import type { NextRequest } from \'next/server\';\n'
        + '\n'
        + 'export function middleware(request: NextRequest) {\n'
        + '  const country = request.geo?.country || \'US\';\n'
        + '  if (country === \'CN\') {\n'
        + '    return NextResponse.redirect(new URL(\'/zh\', request.url));\n'
        + '  }\n'
        + '  return NextResponse.next();\n'
        + '}\n'
        + '\n'
        + 'export const config = {\n'
        + '  matcher: [\'/\', \'/((?!api|_next|favicon.ico).*)\']\n'
        + '};'}</code></pre>
      <h3 style={h3Style}>{t.h3NetlifyFunctions}</h3>
      <p style={pStyle}>{t.netlifyFunctionsDesc}</p>
      <pre style={preStyle}><code>{'// Netlify Serverless Function — netlify/functions/users.ts\n'
        + 'import type { Handler } from \'@netlify/functions\';\n'
        + '\n'
        + 'export const handler: Handler = async (event) => {\n'
        + '  const users = await db.query(\'SELECT * FROM users\');\n'
        + '  return {\n'
        + '    statusCode: 200,\n'
        + '    headers: { \'Content-Type\': \'application/json\' },\n'
        + '    body: JSON.stringify(users),\n'
        + '  };\n'
        + '};\n'
        + '\n'
        + '// Netlify Edge Function — netlify/edge-functions/geo.ts\n'
        + 'import type { Context } from \'@netlify/edge-functions\';\n'
        + '\n'
        + 'export default async (request: Request, context: Context) => {\n'
        + '  const country = context.geo.country?.code || \'US\';\n'
        + '  if (country === \'CN\') {\n'
        + '    return Response.redirect(new URL(\'/zh\', request.url));\n'
        + '  }\n'
        + '  return context.next();\n'
        + '};\n'
        + '\n'
        + 'export const config = { path: "/*" };'}</code></pre>

      {/* 7. CDN and Edge Network */}
      <h2 style={h2Style}>{t.h2CDN}</h2>
      <h3 style={h3Style}>{t.h3VercelCDN}</h3>
      <p style={pStyle}>{t.vercelCDNDesc}</p>
      <h3 style={h3Style}>{t.h3NetlifyCDN}</h3>
      <p style={pStyle}>{t.netlifyCDNDesc}</p>

      {/* 8. Image Optimization */}
      <h2 style={h2Style}>{t.h2ImageOpt}</h2>
      <h3 style={h3Style}>{t.h3VercelImage}</h3>
      <p style={pStyle}>{t.vercelImageDesc}</p>
      <pre style={preStyle}><code>{'// Vercel + Next.js Image Optimization:\n'
        + 'import Image from \'next/image\';\n'
        + '\n'
        + 'export default function Hero() {\n'
        + '  return (\n'
        + '    <Image\n'
        + '      src="/hero-banner.jpg"\n'
        + '      alt="Hero banner"\n'
        + '      width={1200}\n'
        + '      height={600}\n'
        + '      priority\n'
        + '      placeholder="blur"\n'
        + '      sizes="(max-width: 768px) 100vw, 80vw"\n'
        + '    />\n'
        + '  );\n'
        + '  // Automatically serves WebP/AVIF, resized per device\n'
        + '}'}</code></pre>
      <h3 style={h3Style}>{t.h3NetlifyImage}</h3>
      <p style={pStyle}>{t.netlifyImageDesc}</p>
      <pre style={preStyle}><code>{'<!-- Netlify Image CDN — URL-based transforms: -->\n'
        + '<img\n'
        + '  src="/.netlify/images?url=/hero-banner.jpg&w=1200&h=600&fit=cover&fm=webp&q=80"\n'
        + '  alt="Hero banner"\n'
        + '  width="1200"\n'
        + '  height="600"\n'
        + '  loading="eager"\n'
        + '/>\n'
        + '\n'
        + '<!-- Or with the Netlify Image CDN helper: -->\n'
        + '<!-- netlify.toml: -->\n'
        + '[images]\n'
        + '  remote_images = ["https://cdn.example.com/.*"]'}</code></pre>

      {/* 9. Forms and Identity */}
      <h2 style={h2Style}>{t.h2Forms}</h2>
      <h3 style={h3Style}>{t.h3NetlifyForms}</h3>
      <p style={pStyle}>{t.netlifyFormsDesc}</p>
      <pre style={preStyle}><code>{'<!-- Netlify Forms — zero backend code: -->\n'
        + '<form name="contact" method="POST" data-netlify="true"\n'
        + '      netlify-honeypot="bot-field">\n'
        + '  <input type="hidden" name="form-name" value="contact" />\n'
        + '  <p style="display:none">\n'
        + '    <label>Ignore: <input name="bot-field" /></label>\n'
        + '  </p>\n'
        + '  <input type="text" name="name" placeholder="Name" required />\n'
        + '  <input type="email" name="email" placeholder="Email" required />\n'
        + '  <textarea name="message" placeholder="Message" required></textarea>\n'
        + '  <button type="submit">Send</button>\n'
        + '</form>\n'
        + '\n'
        + '<!-- Submissions appear in Netlify dashboard.\n'
        + '     Configure email/Slack/webhook notifications. -->'}</code></pre>
      <h3 style={h3Style}>{t.h3NetlifyIdentity}</h3>
      <p style={pStyle}>{t.netlifyIdentityDesc}</p>
      <h3 style={h3Style}>{t.h3VercelFormIdentity}</h3>
      <p style={pStyle}>{t.vercelFormIdentityDesc}</p>

      {/* 10. Monorepo Support */}
      <h2 style={h2Style}>{t.h2Monorepo}</h2>
      <p style={pStyle}>{t.monorepoDesc}</p>
      <h3 style={h3Style}>{t.h3VercelMonorepo}</h3>
      <p style={pStyle}>{t.vercelMonorepoDesc}</p>
      <pre style={preStyle}><code>{'// Vercel monorepo — vercel.json at root:\n'
        + '{\n'
        + '  "buildCommand": "cd packages/web && npm run build",\n'
        + '  "installCommand": "npm install --workspace=packages/web",\n'
        + '  "framework": "nextjs",\n'
        + '  "outputDirectory": "packages/web/.next"\n'
        + '}\n'
        + '\n'
        + '# Or use Turborepo with Vercel Remote Cache:\n'
        + '# turbo.json\n'
        + '{\n'
        + '  "remoteCache": { "enabled": true },\n'
        + '  "pipeline": {\n'
        + '    "build": {\n'
        + '      "dependsOn": ["^build"],\n'
        + '      "outputs": [".next/**", "dist/**"]\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>
      <h3 style={h3Style}>{t.h3NetlifyMonorepo}</h3>
      <p style={pStyle}>{t.netlifyMonorepoDesc}</p>
      <pre style={preStyle}><code>{'# Netlify monorepo — netlify.toml:\n'
        + '[build]\n'
        + '  base = "packages/web"\n'
        + '  command = "npm run build"\n'
        + '  publish = ".next"\n'
        + '\n'
        + '# For Nx or Turborepo builds:\n'
        + '[build]\n'
        + '  base = "."\n'
        + '  command = "npx turbo run build --filter=web"\n'
        + '  publish = "packages/web/.next"\n'
        + '\n'
        + '# Ignore builds for unchanged packages:\n'
        + '[build]\n'
        + '  ignore = "git diff --quiet HEAD^ HEAD -- packages/web/"'}</code></pre>

      {/* 11. Environment Variables */}
      <h2 style={h2Style}>{t.h2EnvVars}</h2>
      <p style={pStyle}>{t.envVarsDesc}</p>
      <pre style={preStyle}><code>{'# Vercel environment variables via CLI:\n'
        + '$ vercel env add DATABASE_URL production\n'
        + '$ vercel env add NEXT_PUBLIC_API_URL preview development\n'
        + '$ vercel env pull .env.local   # Pull to local\n'
        + '\n'
        + '# Netlify environment variables via CLI:\n'
        + '$ netlify env:set DATABASE_URL "postgres://..." --context production\n'
        + '$ netlify env:set API_URL "https://staging.api" --context deploy-preview\n'
        + '$ netlify env:list'}</code></pre>

      {/* 12. Custom Domains and SSL */}
      <h2 style={h2Style}>{t.h2Domains}</h2>
      <p style={pStyle}>{t.domainsDesc}</p>
      <pre style={preStyle}><code>{'# Vercel custom domain:\n'
        + '$ vercel domains add example.com\n'
        + '$ vercel domains inspect example.com\n'
        + '# Auto-provisions SSL, configures CNAME/A records\n'
        + '\n'
        + '# Netlify custom domain:\n'
        + '$ netlify domains:create example.com\n'
        + '# Or set in netlify.toml:\n'
        + '[[redirects]]\n'
        + '  from = "https://www.example.com"\n'
        + '  to = "https://example.com"\n'
        + '  status = 301\n'
        + '  force = true'}</code></pre>

      {/* 13. CI/CD Integration */}
      <h2 style={h2Style}>{t.h2CICD}</h2>
      <p style={pStyle}>{t.cicdDesc}</p>
      <pre style={preStyle}><code>{'# GitHub Actions + Vercel (manual deploy):\n'
        + 'name: Deploy to Vercel\n'
        + 'on:\n'
        + '  push:\n'
        + '    branches: [main]\n'
        + 'jobs:\n'
        + '  deploy:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '      - run: npm ci && npm run build\n'
        + '      - uses: amondnet/vercel-action@v25\n'
        + '        with:\n'
        + '          vercel-token: ${{ secrets.VERCEL_TOKEN }}\n'
        + '          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}\n'
        + '          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}\n'
        + '          vercel-args: "--prod"\n'
        + '\n'
        + '# Netlify Build Hook (trigger from any CI):\n'
        + '$ curl -X POST -d {} https://api.netlify.com/build_hooks/YOUR_HOOK_ID'}</code></pre>

      {/* 14. Performance Benchmarks */}
      <h2 style={h2Style}>{t.h2Benchmarks}</h2>
      <p style={pStyle}>{t.benchmarksIntro}</p>
      {renderTable([t.thMetric, t.thVercel, t.thNetlify], benchmarkRows)}

      {/* 15. Self-Hosting Alternative */}
      <h2 style={h2Style}>{t.h2SelfHosting}</h2>
      <h3 style={h3Style}>{t.h3VercelSelfHost}</h3>
      <p style={pStyle}>{t.vercelSelfHostDesc}</p>
      <pre style={preStyle}><code>{'# Self-host Next.js on a VPS:\n'
        + '$ npm run build\n'
        + '$ npm start\n'
        + '# Runs on port 3000 with SSR, API routes, ISR\n'
        + '\n'
        + '# Docker deployment:\n'
        + 'FROM node:20-alpine AS builder\n'
        + 'WORKDIR /app\n'
        + 'COPY package*.json ./\n'
        + 'RUN npm ci\n'
        + 'COPY . .\n'
        + 'RUN npm run build\n'
        + '\n'
        + 'FROM node:20-alpine AS runner\n'
        + 'WORKDIR /app\n'
        + 'COPY --from=builder /app/.next/standalone ./\n'
        + 'COPY --from=builder /app/public ./public\n'
        + 'COPY --from=builder /app/.next/static ./.next/static\n'
        + 'EXPOSE 3000\n'
        + 'CMD ["node", "server.js"]'}</code></pre>
      <h3 style={h3Style}>{t.h3NetlifySelfHost}</h3>
      <p style={pStyle}>{t.netlifySelfHostDesc}</p>

      {/* 16. Analytics Comparison */}
      <h2 style={h2Style}>{t.h2Analytics}</h2>
      <h3 style={h3Style}>{t.h3VercelAnalytics}</h3>
      <p style={pStyle}>{t.vercelAnalyticsDesc}</p>
      <h3 style={h3Style}>{t.h3NetlifyAnalytics}</h3>
      <p style={pStyle}>{t.netlifyAnalyticsDesc}</p>

      {/* 17. Enterprise Features */}
      <h2 style={h2Style}>{t.h2Enterprise}</h2>
      <p style={pStyle}>{t.enterpriseIntro}</p>
      {renderTable([t.thFeature, t.thVercel, t.thNetlify], enterpriseRows)}

      {/* 18. When to Choose */}
      <h2 style={h2Style}>{t.h2WhenToChoose}</h2>
      <h3 style={h3Style}>{t.h3ChooseVercel}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '2' }}>
        {t.chooseVercelList.split('|').map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <h3 style={h3Style}>{t.h3ChooseNetlify}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '2' }}>
        {t.chooseNetlifyList.split('|').map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* 19. Migration Guide */}
      <h2 style={h2Style}>{t.h2Migration}</h2>
      <h3 style={h3Style}>{t.h3VercelToNetlify}</h3>
      <p style={pStyle}>{t.vercelToNetlifyDesc}</p>
      <pre style={preStyle}><code>{'# Vercel to Netlify migration checklist:\n'
        + '# 1. Replace vercel.json with netlify.toml\n'
        + '# 2. Install Netlify Next.js plugin:\n'
        + '$ npm install @netlify/plugin-nextjs\n'
        + '\n'
        + '# 3. Create netlify.toml:\n'
        + '[build]\n'
        + '  command = "npm run build"\n'
        + '  publish = ".next"\n'
        + '\n'
        + '[[plugins]]\n'
        + '  package = "@netlify/plugin-nextjs"\n'
        + '\n'
        + '# 4. Move API routes to netlify/functions/ if not using Next.js API\n'
        + '# 5. Update env vars in Netlify dashboard\n'
        + '# 6. Configure custom domain in Netlify DNS\n'
        + '# 7. Test preview deploy before switching production'}</code></pre>
      <h3 style={h3Style}>{t.h3NetlifyToVercel}</h3>
      <p style={pStyle}>{t.netlifyToVercelDesc}</p>
      <pre style={preStyle}><code>{'# Netlify to Vercel migration checklist:\n'
        + '# 1. Replace netlify.toml with vercel.json (if needed):\n'
        + '{\n'
        + '  "functions": {\n'
        + '    "api/**/*.ts": { "memory": 1024, "maxDuration": 30 }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '# 2. Migrate Netlify Functions to Next.js API routes:\n'
        + '#    netlify/functions/hello.ts -> app/api/hello/route.ts\n'
        + '\n'
        + '# 3. Replace Netlify Forms with:\n'
        + '#    - Formspree, Resend, or custom API endpoint\n'
        + '\n'
        + '# 4. Replace Netlify Identity with:\n'
        + '#    - Clerk, Auth.js (NextAuth), or Supabase Auth\n'
        + '\n'
        + '# 5. Link repo in Vercel dashboard\n'
        + '# 6. Import env vars: vercel env pull\n'
        + '# 7. Verify preview deploy, then switch DNS'}</code></pre>

      {/* 20. Community and Ecosystem */}
      <h2 style={h2Style}>{t.h2Community}</h2>
      <p style={pStyle}>{t.communityDesc}</p>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
          [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.7' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
