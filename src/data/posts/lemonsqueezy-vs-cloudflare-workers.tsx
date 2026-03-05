'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'LemonSqueezy vs Cloudflare Workers: SaaS Payment vs Serverless Platform',
    intro: 'LemonSqueezy and Cloudflare Workers serve different purposes in the software ecosystem. LemonSqueezy is a Merchant of Record (MoR) platform specialized in software payments and tax compliance, while Cloudflare Workers is a serverless compute platform. This comparison examines when each solution fits your needs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose LemonSqueezy if you sell software globally and want tax compliance handled automatically. Choose Cloudflare Workers for serverless functions, APIs, edge computing, and full-stack backend development.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'LemonSqueezy handles global tax/Vat automatically as MoR',
    takeaway2: 'Cloudflare Workers provides global edge computing with 310+ locations',
    takeaway3: 'LemonSqueezy charges 5% + 50c per sale + 2.9% + 30c per transaction',
    takeaway4: 'Cloudflare Workers pricing is usage-based, from free tier up',
    takeaway5: 'LemonSqueezy includes built-in subscription management and takeaway6: 'Cloudflare Workers offers excellent DX and tools for deployment',
    
    whatIsLemonsqueezyTitle: 'What is LemonSqueezy?',
    whatIsLemonsqueezyContent: 'LemonSqueezy, founded in 2015, is a payments platform designed for software companies. As a Merchant of Record, it handles global tax compliance, subscription management, and provides a complete solution for selling software worldwide.',
    
    whatIsCfworkersTitle: 'What is Cloudflare Workers?',
    whatIsCfworkersContent: 'Cloudflare Workers is a serverless platform launched in 2017 that runs code at the edge of Cloudflare global network. It provides a lightweight, fast, and scalable way to run serverless functions without managing servers.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Integration Examples',
    codeExampleIntro: 'Code samples for each platform:',
    
    lemonsqueezyExampleTitle: 'LemonSqueezy Checkout',
    cfworkersExampleTitle: 'Cloudflare Workers Example',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Fee structures and cost analysis:',
    
    useCasesTitle: 'Best Use Cases',
    lemonsqueezyBestFor: 'LemonSqueezy is Best For:',
    cfworkersBestFor: 'Cloudflare Workers is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Choose LemonSqueezy for selling software globally with automatic tax compliance. Choose Cloudflare Workers for APIs, edge computing, full-stack applications. Some businesses use LemonSqueezy for payments and Cloudflare Workers for the serverless compute, handling webhooks and background tasks.',
    
    faq1q: 'Can I use both platforms together?',
    faq1a: 'Yes, you can use LemonSqueezy for payments in some regions and Cloudflare Workers for others. This hybrid approach works well for businesses with global customer bases.',
    
    faq2q: 'Which handles tax better?',
    faq2a: 'LemonSqueezy handles all tax compliance automatically as a Merchant of Record. Cloudflare Workers requires you to handle taxes or use Stripe Tax.',
    
    faq3q: 'What about subscription management?',
    faq3a: 'LemonSqueezy has built-in subscription management. Cloudflare Workers offers KV store and state management but D1.',
    
    faq4q: 'Which has better payout timing?',
    faq4a: 'LemonSqueezy pays monthly by default (weekly for established accounts). Cloudflare Workers pays out faster, 2-7 days typically.',
    
    faq5q: 'Which has better developer experience?',
    faq5a: 'LemonSqueezy has improved documentation significantly. Cloudflare Workers is renowned for excellent developer experience with extensive documentation.',
    
    faq6q: 'What about refund handling?',
    faq6a: 'Both support refunds. LemonSqueezy handles tax adjustments on refunds automatically as a Merchant of Record.
    
    faq7q: 'Which is better for selling software globally?',
    faq7a: 'LemonSqueezy is purpose-built for software sales with automatic tax handling. Cloudflare Workers can be used for any serverless function but is not specifically designed for it.
    
    faq8q: 'What about deployment complexity?',
    faq8a: 'LemonSqueezy deployment is simpler with dashboard-only. Cloudflare Workers can be deployed anywhere but requires more configuration.',
    
    tryTools: 'Try Our related tools',
  },
  zh: {
    title: 'LemonSqueezy vs Cloudflare Workers： SaaS 支付与 Serverless平台对比',
    intro: 'LemonSqueezy 和 Cloudflare Workers 在软件生态系统中扮演不同角色。 LemonSqueezy 是 Merchant of Record (MoR) 平台，专门处理软件支付和税务合规，而 Cloudflare Workers 是无服务器计算平台用于边缘函数和API 才发。本比较帮助你您选择合适的解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 LemonSqueezy 进行全球软件销售并需要税务合规处理。选择 Cloudflare Workers 用于 API、边缘计算以及全栈后端开发。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'LemonSqueezy 是 MoR 平台，自动处理全球税务合规',
    takeaway2: 'Cloudflare Workers 提全球边缘计算能力,覆盖 310+ 个地点'
    takeaway3: 'LemonSqueezy 收取 5% + 50c/每笔销售 + 2.9% + 30c/笔交易',
    takeaway4: 'Cloudflare Workers 按使用量计费，提供免费额度',
    takeaway5: 'LemonSqueezy 内置订阅管理功能',
    takeaway6: 'Cloudflare Workers 提供优秀的部署工具和 DX 支持',
    
    whatIsLemonsqueezyTitle: '什么是 LemonSqueezy？',
    whatIsLemonsqueezyContent: 'LemonSqueezy 成立在2015 年，是一个专注于软件业务的支付平台。作为 Merchant of Record (MoR)，它处理全球税务合规和订阅管理,为销售软件的公司提供一站式解决方案。',
    
    whatIsCfworkersTitle: '什么是 Cloudflare Workers？',
    whatIsCfworkersContent: 'Cloudflare Workers 是 2017 年推出的无服务器计算平台,在 Cloudflare 的全球网络上运行代码。它提供轻量级、高性能的边缘计算能力,非常适合 API 和无服务器函数。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能并排比较:',
    
    codeExampleTitle: '集成示例',
    codeExampleIntro: '各平台的代码示例:',
    
    lemonsqueezyExampleTitle: 'LemonSqueezy Checkout 雰 cfworkersExampleTitle: 'Cloudflare Workers 示例',
    
    pricingTitle: '价格对比',
    pricingIntro: '费用结构和成本分析:',
    
    useCasesTitle: '最佳用例',
    lemonsqueezyBestFor: 'LemonSqueezy 最适合:',
    cfworkersBestFor: 'Cloudflare Workers 最适合',
    
    conclusionTitle: '结论',
    conclusionContent: '选择 LemonSqueezy 用于全球软件销售和自动税务合规。选择 Cloudflare Workers 用于 API 开发和边缘计算和全栈应用。部分企业会同时使用两者：使用 LemonSqueezy 处理支付，使用 Cloudflare Workers 处理服务器逻辑和后台任务。',
    
    faq1q: '我可以同时使用两个平台吗？',
    faq1a: '可以,使用 LemonSqueezy 处理支付,用 Cloudflare Workers 处理其他逻辑.这种混合方案适合有全球客户群的企业。',
    
    faq2q: '哪个处理税务更好?',
    faq2a: 'LemonSqueezy 作为 MoR 自动处理所有税务合规. Cloudflare Workers 需要自己处理税务或使用 Stripe Tax 篔第三方服务.',
    
    faq3q: '订阅管理功能如何?',
    faq3a: '两者都有订阅管理. LemonSqueezy 的订阅功能内置. Cloudflare Workers 通过 D1 提供分布式状态管理.',
    
    faq4q: '支付时间如何?',
    faq4a: 'LemonSqueezy 默认月付,可申请周付. Cloudflare Workers 通常是 2-7 天到账,取决于账户历史.
    
    faq5q: '开发者体验如何?',
    faq5a: 'LemonSqueezy 的文档近年来有显著改进. Cloudflare Workers 以开发者体验闻名,提供业界标杆级的文档和 API.',
    
    faq6q: '退款处理如何?',
    faq6a: '两者都支持退款. LemonSqueezy 作为 MoR 自动处理退款相关的税务调整. Cloudflare Workers 需要手动处理退款流程.',
    
    faq7q: '哪个更适合全球销售软件?',
    faq7a: 'LemonSqueezy 专为全球软件销售设计,自动税务处理. Cloudflare Workers 可用于任何类型的 API,但不需要更多配置.
    
    faq8q: '部署复杂度如何?',
    faq8a: 'LemonSqueezy 鐃简化,提供仪表板管理. Cloudflare Workers 可以部署到任何地方,需要配置 wrangler.toml 或 Cloudflare 的基础设施.',
    
    tryTools: '试试我们的相关工具',
  },
};

