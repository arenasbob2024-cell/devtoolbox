'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vercel vs Cloudflare Pages: Static Hosting Comparison',
    intro: 'Vercel and Cloudflare Pages are leading platforms for deploying static sites and serverless functions. Vercel, created by the Next.js team, offers seamless Next.js integration. Cloudflare Pages leverages Cloudflares global edge network for exceptional performance. This comparison helps you choose the right platform for your deployment needs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Vercel offers the best Next.js experience with automatic optimizations and preview deployments. Cloudflare Pages provides superior global performance with unlimited bandwidth on free tier. For Next.js projects, Vercel is ideal. For maximum performance and cost-effective scaling, Cloudflare Pages wins.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Vercel has native Next.js optimization; Cloudflare Pages requires adapters',
    takeaway2: 'Cloudflare Pages offers unlimited bandwidth on all plans including free',
    takeaway3: 'Both support edge functions, but with different runtimes',
    takeaway4: 'Vercel preview deployments integrate better with GitHub PRs',
    takeaway5: 'Cloudflare has larger edge network (300+ locations vs 100+)',
    takeaway6: 'Both offer generous free tiers for personal projects',
    
    whatIsVercelTitle: 'What is Vercel?',
    whatIsVercelContent: 'Vercel is a frontend cloud platform created by the team behind Next.js. Launched in 2015 as ZEIT, it rebranded to Vercel in 2020. It specializes in deploying React, Next.js, Vue, and other modern frameworks with zero configuration. Its edge network and build infrastructure are optimized specifically for frontend applications.',
    
    whatIsCloudflarePagesTitle: 'What is Cloudflare Pages?',
    whatIsCloudflarePagesContent: 'Cloudflare Pages is a JAMstack platform launched in 2020, built on Cloudflares global edge network. It deploys static sites with unlimited bandwidth and offers Cloudflare Workers for serverless functions. Integrated with Cloudflare DNS, CDN, and security products, it provides a comprehensive edge computing solution.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the cost structure for both platforms:',
    
    performanceTitle: 'Performance & Edge Network',
    performanceIntro: 'Global distribution and speed comparison:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed comparison of core hosting capabilities:',
    
    frameworkSupportTitle: 'Framework Support',
    frameworkSupportIntro: 'Built-in support for popular frameworks:',
    
    serverlessTitle: 'Serverless Functions',
    serverlessIntro: 'Edge and serverless computing capabilities:',
    
    buildDeployTitle: 'Build & Deploy',
    buildDeployIntro: 'CI/CD and deployment workflow:',
    
    developerExperienceTitle: 'Developer Experience',
    developerExperienceIntro: 'Tools and workflow for developers:',
    
    whenToUseTitle: 'When to Use Each Platform',
    vercelBestFor: 'Use Vercel When:',
    cloudflareBestFor: 'Use Cloudflare Pages When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Vercel and Cloudflare Pages excel in different areas. Vercel provides the best Next.js experience with automatic optimizations, great DX, and seamless GitHub integration. Cloudflare Pages offers unmatched global performance, unlimited bandwidth, and excellent value at scale. For Next.js-heavy projects, Vercel is hard to beat. For high-traffic static sites or cost-conscious scaling, Cloudflare Pages is the smarter choice.',
    
    faq1q: 'Can I deploy Next.js on Cloudflare Pages?',
    faq1a: 'Yes, using the @cloudflare/next-on-pages adapter. However, some Next.js features like ISR and Image Optimization require workarounds. The experience is not as seamless as Vercel. For full Next.js support, Vercel remains the recommended choice.',
    
    faq2q: 'Does Vercel charge for bandwidth?',
    faq2a: 'Vercel charges for bandwidth on paid plans after included limits. The Pro plan includes 1TB, then $40 per 100GB. Cloudflare Pages offers unlimited bandwidth on all plans, making it more cost-effective for high-traffic sites.',
    
    faq3q: 'Which is faster globally?',
    faq3a: 'Cloudflare has a larger edge network with 300+ locations vs Verces 100+. For global audiences, Cloudflare typically delivers lower latency. For US/EU-focused traffic, both perform similarly. Real-world difference depends on your specific audience.',
    
    faq4q: 'Can I use custom domains on free plans?',
    faq4a: 'Yes, both platforms allow unlimited custom domains on free plans. You can connect your own domain with SSL certificates automatically provisioned. This makes both platforms excellent for personal projects and portfolios.',
    
    faq5q: 'How do preview deployments compare?',
    faq5a: 'Both offer automatic preview deployments for GitHub PRs. Vercel provides more detailed deployment comments and faster build times for Next.js. Cloudflare Pages offers similar functionality with slightly different UI. Both are excellent for team collaboration.',
    
    faq6q: 'What about environment variables?',
    faq6a: 'Both support environment variables with similar functionality. Vercel offers preview-specific environment variables. Cloudflare allows encrypted environment variables for production. Both support secrets management for sensitive data.',
    
    faq7q: 'Can I use Cloudflare CDN with Vercel?',
    faq7a: 'Yes, you can use Cloudflare as a CDN in front of Vercel, but it adds complexity. You lose some Vercel optimizations and add latency for dynamic content. For most users, choosing one platform is better than combining them.',
    
    faq8q: 'Which has better analytics?',
    faq8a: 'Vercel Analytics provides real-time web vitals and user analytics. Cloudflare Web Analytics is free and privacy-focused. Vercel analytics are more integrated with deployment insights. Cloudflare offers more detailed network analytics. Both are excellent for different needs.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Vercel vs Cloudflare Pages：静态托管对比',
    intro: 'Vercel和Cloudflare Pages是部署静态站点和无服务器函数的领先平台。Vercel由Next.js团队创建，提供无缝的Next.js集成。Cloudflare Pages利用Cloudflare的全球边缘网络实现卓越性能。本对比帮助你为部署需求选择合适的平台。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Vercel提供最佳Next.js体验，具有自动优化和预览部署。Cloudflare Pages提供卓越的全球性能，免费层包含无限带宽。对于Next.js项目，Vercel是理想选择。对于最大性能和成本效益扩展，Cloudflare Pages胜出。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Vercel有原生Next.js优化；Cloudflare Pages需要适配器',
    takeaway2: 'Cloudflare Pages在所有计划（包括免费）提供无限带宽',
    takeaway3: '两者都支持边缘函数，但运行时不同',
    takeaway4: 'Vercel预览部署与GitHub PR集成更好',
    takeaway5: 'Cloudflare有更大的边缘网络（300+位置 vs 100+）',
    takeaway6: '两者都为个人项目提供慷慨的免费层',
    
    whatIsVercelTitle: '什么是Vercel？',
    whatIsVercelContent: 'Vercel是由Next.js背后团队创建的前端云平台。2015年以ZEIT名义推出，2020年更名为Vercel。专门用于零配置部署React、Next.js、Vue和其他现代框架。其边缘网络和构建基础设施专门为前端应用优化。',
    
    whatIsCloudflarePagesTitle: '什么是Cloudflare Pages？',
    whatIsCloudflarePagesContent: 'Cloudflare Pages是2020年推出的JAMstack平台，基于Cloudflare的全球边缘网络构建。它部署具有无限带宽的静态站点，并提供Cloudflare Workers用于无服务器函数。与Cloudflare DNS、CDN和安全产品集成，提供全面的边缘计算解决方案。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解两个平台的成本结构：',
    
    performanceTitle: '性能与边缘网络',
    performanceIntro: '全球分布和速度对比：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心托管能力详细对比：',
    
    frameworkSupportTitle: '框架支持',
    frameworkSupportIntro: '对流行框架的内置支持：',
    
    serverlessTitle: '无服务器函数',
    serverlessIntro: '边缘和无服务器计算能力：',
    
    buildDeployTitle: '构建与部署',
    buildDeployIntro: 'CI/CD和部署工作流程：',
    
    developerExperienceTitle: '开发者体验',
    developerExperienceIntro: '面向开发者的工具和工作流程：',
    
    whenToUseTitle: '何时使用每个平台',
    vercelBestFor: '使用Vercel的场景：',
    cloudflareBestFor: '使用Cloudflare Pages的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Vercel和Cloudflare Pages在不同领域表现出色。Vercel提供最佳Next.js体验，具有自动优化、出色的DX和无缝GitHub集成。Cloudflare Pages提供无与伦比的全球性能、无限带宽和规模化时的卓越价值。对于重Next.js项目，Vercel难以超越。对于高流量静态站点或注重成本的扩展，Cloudflare Pages是更明智的选择。',
    
    faq1q: '我可以在Cloudflare Pages上部署Next.js吗？',
    faq1a: '可以，使用@cloudflare/next-on-pages适配器。但是，一些Next.js功能如ISR和图像优化需要变通方案。体验不如Vercel无缝。对于完整的Next.js支持，Vercel仍然是推荐选择。',
    
    faq2q: 'Vercel对带宽收费吗？',
    faq2a: 'Vercel在付费计划中超出包含限制后对带宽收费。Pro计划包含1TB，之后每100GB收费40美元。Cloudflare Pages在所有计划中提供无限带宽，对于高流量站点更具成本效益。',
    
    faq3q: '哪个在全球更快？',
    faq3a: 'Cloudflare有更大的边缘网络，拥有300+位置，而Vercel有100+。对于全球受众，Cloudflare通常提供更低的延迟。对于美国/欧盟为主的流量，两者表现相似。实际差异取决于你的特定受众。',
    
    faq4q: '我可以在免费计划上使用自定义域名吗？',
    faq4a: '可以，两个平台都允许在免费计划上使用无限自定义域名。你可以连接自己的域名，SSL证书自动配置。这使得两个平台都非常适合个人项目和作品集。',
    
    faq5q: '预览部署如何比较？',
    faq5a: '两者都为GitHub PR提供自动预览部署。Vercel为Next.js提供更详细的部署评论和更快的构建时间。Cloudflare Pages提供类似功能，UI略有不同。两者都非常适合团队协作。',
    
    faq6q: '环境变量呢？',
    faq6a: '两者都支持类似功能的环境变量。Vercel提供预览特定的环境变量。Cloudflare允许为生产环境使用加密环境变量。两者都支持敏感数据的密钥管理。',
    
    faq7q: '我可以将Cloudflare CDN与Vercel一起使用吗？',
    faq7a: '可以，你可以将Cloudflare作为CDN放在Vercel前面，但这增加了复杂性。你会失去一些Vercel优化并为动态内容增加延迟。对于大多数用户，选择一个平台比组合它们更好。',
    
    faq8q: '哪个分析更好？',
    faq8a: 'Vercel Analytics提供实时Web核心指标和用户分析。Cloudflare Web Analytics是免费且注重隐私的。Vercel分析与部署洞察更集成。Cloudflare提供更详细的网络分析。两者在不同需求下都很出色。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function VercelVsCloudflarePages({ lang }: { lang: string }) {
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
      <div style={{ ...boxStyle, borderLeft: '4px solid #000', background: 'linear-gradient(135deg, rgba(0,0,0,0.05), rgba(243,128,32,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsVercelTitle}</h3>
      <p style={pStyle}>{ct.whatIsVercelContent}</p>

      <h3 style={h3Style}>{ct.whatIsCloudflarePagesTitle}</h3>
      <p style={pStyle}>{ct.whatIsCloudflarePagesContent}</p>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>Vercel</th>
              <th style={thStyle}>Cloudflare Pages</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费版' : 'Free', isZh ? '个人/ hobby项目' : 'Personal/hobby', isZh ? '无限项目' : 'Unlimited projects'],
              [isZh ? '带宽' : 'Bandwidth', '100GB/月', isZh ? '无限' : 'Unlimited'],
              [isZh ? '构建分钟数' : 'Build Minutes', '6,000分钟/月', '500次构建/月'],
              [isZh ? '专业版' : 'Pro', '$20/用户/月', isZh ? '免费（Workers付费）' : 'Free (Workers paid)'],
              [isZh ? '团队版' : 'Team', '$20/用户/月', '$5/用户/月'],
              [isZh ? '企业版' : 'Enterprise', isZh ? '联系销售' : 'Contact sales', isZh ? '联系销售' : 'Contact sales'],
            ].map(([plan, vercel, cf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{vercel}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{cf}</td>
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
              <th style={thStyle}>Vercel</th>
              <th style={thStyle}>Cloudflare Pages</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '边缘位置' : 'Edge Locations', '100+', '300+'],
              [isZh ? '全球延迟（中位数）' : 'Global Latency (median)', '~50ms', '~30ms'],
              [isZh ? 'TTFB（首字节时间）' : 'TTFB', isZh ? '快速' : 'Fast', isZh ? '非常快' : 'Very fast'],
              [isZh ? '冷启动（边缘函数）' : 'Cold Start (edge)', '0-50ms', '0-10ms'],
              [isZh ? 'DDoS保护' : 'DDoS Protection', '✓', '✓✓'],
              [isZh ? 'WAF' : 'WAF', isZh ? '企业版' : 'Enterprise', '✓'],
              [isZh ? 'HTTP/3' : 'HTTP/3', '✓', '✓'],
              [isZh ? 'Brotli压缩' : 'Brotli Compression', '✓', '✓'],
            ].map(([metric, vercel, cf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{vercel}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{cf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Vercel</th>
              <th style={thStyle}>Cloudflare Pages</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '静态站点托管' : 'Static Hosting', '✓', '✓'],
              [isZh ? '边缘函数' : 'Edge Functions', '✓', '✓ (Workers)'],
              [isZh ? '无服务器函数' : 'Serverless Functions', '✓', '✓ (Workers)'],
              [isZh ? '自动HTTPS' : 'Automatic HTTPS', '✓', '✓'],
              [isZh ? '自定义域名' : 'Custom Domains', '✓', '✓'],
              [isZh ? '预览部署' : 'Preview Deployments', '✓✓', '✓'],
              [isZh ? '回滚' : 'Rollbacks', '✓', '✓'],
              [isZh ? '日志' : 'Logs', '✓', '✓'],
              [isZh ? '分析' : 'Analytics', '✓', '✓'],
              [isZh ? '实时日志' : 'Real-time Logs', '✓', isZh ? '有限' : 'Limited'],
            ].map(([feature, vercel, cf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: vercel.includes('✓') ? '#22c55e' : undefined }}>{vercel}</td>
                <td style={{ ...tdStyle, color: cf.includes('✓') ? '#22c55e' : undefined }}>{cf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Framework Support */}
      <h2 style={h2Style}>{ct.frameworkSupportTitle}</h2>
      <p style={pStyle}>{ct.frameworkSupportIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '框架' : 'Framework'}</th>
              <th style={thStyle}>Vercel</th>
              <th style={thStyle}>Cloudflare Pages</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Next.js', '✓✓✓', '✓ (适配器)'],
              ['React', '✓', '✓'],
              ['Vue.js', '✓', '✓'],
              ['Nuxt.js', '✓', '✓'],
              ['Svelte', '✓', '✓'],
              ['SvelteKit', '✓', '✓ (适配器)'],
              ['Astro', '✓', '✓'],
              ['Hugo', '✓', '✓'],
              ['Gatsby', '✓', '✓'],
              ['Remix', '✓', '✓ (适配器)'],
            ].map(([fw, vercel, cf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{fw}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{vercel}</td>
                <td style={tdStyle}>{cf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Serverless */}
      <h2 style={h2Style}>{ct.serverlessTitle}</h2>
      <p style={pStyle}>{ct.serverlessIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>Vercel</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Edge Runtime（V8）' : 'Edge Runtime (V8)'}</li>
            <li>{isZh ? 'Node.js无服务器函数' : 'Node.js Serverless Functions'}</li>
            <li>{isZh ? '执行限制：60秒' : 'Execution limit: 60s'}</li>
            <li>{isZh ? '包大小：50MB' : 'Bundle size: 50MB'}</li>
            <li>{isZh ? 'Next.js API路由' : 'Next.js API Routes'}</li>
            <li>{isZh ? '自动扩展' : 'Auto-scaling'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f38020' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f38020' }}>Cloudflare Pages</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Cloudflare Workers' : 'Cloudflare Workers'}</li>
            <li>{isZh ? 'V8隔离运行时' : 'V8 Isolate runtime'}</li>
            <li>{isZh ? '执行限制：30秒' : 'Execution limit: 30s'}</li>
            <li>{isZh ? '包大小：1MB' : 'Bundle size: 1MB'}</li>
            <li>{isZh ? 'Pages Functions' : 'Pages Functions'}</li>
            <li>{isZh ? '全球分布式' : 'Globally distributed'}</li>
          </ul>
        </div>
      </div>

      {/* Build & Deploy */}
      <h2 style={h2Style}>{ct.buildDeployTitle}</h2>
      <p style={pStyle}>{ct.buildDeployIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Vercel</th>
              <th style={thStyle}>Cloudflare Pages</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Git集成' : 'Git Integration', 'GitHub/GitLab/Bitbucket', 'GitHub/GitLab'],
              [isZh ? '自动部署' : 'Auto Deploy', '✓', '✓'],
              [isZh ? '分支预览' : 'Branch Previews', '✓', '✓'],
              [isZh ? 'PR评论' : 'PR Comments', '✓✓', '✓'],
              [isZh ? 'CLI部署' : 'CLI Deploy', '✓', '✓'],
              [isZh ? 'API部署' : 'API Deploy', '✓', '✓'],
              [isZh ? 'Monorepo支持' : 'Monorepo Support', '✓✓', '✓'],
              [isZh ? '构建缓存' : 'Build Caching', '✓', '✓'],
              [isZh ? '自定义构建命令' : 'Custom Build Command', '✓', '✓'],
            ].map(([feature, vercel, cf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{vercel}</td>
                <td style={tdStyle}>{cf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Developer Experience */}
      <h2 style={h2Style}>{ct.developerExperienceTitle}</h2>
      <p style={pStyle}>{ct.developerExperienceIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>Vercel</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'vercel CLI' : 'vercel CLI'}</li>
            <li>{isZh ? '本地开发服务器' : 'Local dev server'}</li>
            <li>{isZh ? 'VS Code扩展' : 'VS Code extension'}</li>
            <li>{isZh ? '详细部署日志' : 'Detailed deployment logs'}</li>
            <li>{isZh ? '部署评论' : 'Deployment comments'}</li>
            <li>{isZh ? '实时协作' : 'Live collaboration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f38020' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f38020' }}>Cloudflare Pages</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'wrangler CLI' : 'wrangler CLI'}</li>
            <li>{isZh ? '本地开发（wrangler pages）' : 'Local dev (wrangler pages)'}</li>
            <li>{isZh ? 'Cloudflare仪表盘' : 'Cloudflare dashboard'}</li>
            <li>{isZh ? '部署历史' : 'Deployment history'}</li>
            <li>{isZh ? 'Webhook集成' : 'Webhook integrations'}</li>
            <li>{isZh ? 'Access策略' : 'Access policies'}</li>
          </ul>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.vercelBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Next.js项目' : 'Next.js projects'}</li>
            <li>{isZh ? '需要ISR' : 'Need ISR'}</li>
            <li>{isZh ? '团队协作' : 'Team collaboration'}</li>
            <li>{isZh ? '复杂API路由' : 'Complex API routes'}</li>
            <li>{isZh ? '重视开发者体验' : 'Value developer experience'}</li>
            <li>{isZh ? '需要详细分析' : 'Need detailed analytics'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f38020' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f38020' }}>{ct.cloudflareBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高流量站点' : 'High-traffic sites'}</li>
            <li>{isZh ? '成本敏感项目' : 'Cost-sensitive projects'}</li>
            <li>{isZh ? '全球受众' : 'Global audiences'}</li>
            <li>{isZh ? '静态站点' : 'Static sites'}</li>
            <li>{isZh ? '需要DDoS保护' : 'Need DDoS protection'}</li>
            <li>{isZh ? '现有Cloudflare用户' : 'Existing Cloudflare users'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(0,0,0,0.05), rgba(243,128,32,0.1))', borderRadius: 12, border: '1px solid rgba(0,0,0,0.2)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#000', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/html-minifier'} style={{ color: '#000', textDecoration: 'none' }}>HTML Minifier</a> • {' '}
        <a href={'/' + lang + '/tools/curl-to-code'} style={{ color: '#000', textDecoration: 'none' }}>Curl to Code</a>
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
