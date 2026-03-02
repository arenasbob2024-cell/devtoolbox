'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Railway vs Render: PaaS Platform Comparison 2025',
    intro: 'Railway and Render are two leading Platform-as-a-Service providers that simplify application deployment. This comprehensive comparison examines pricing, features, performance, database options, and developer experience to help you choose the right PaaS for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Railway offers more flexible pricing with per-resource billing and faster deployments. Render provides more generous free tier and built-in background workers. For cost-conscious developers with variable workloads, Railway is ideal. For teams wanting predictable costs and managed services, Render excels.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Railway uses per-resource billing, Render uses per-service pricing',
    takeaway2: 'Render offers more generous free tier for hobby projects',
    takeaway3: 'Railway has faster cold starts and deployment times',
    takeaway4: 'Both support Docker, multiple languages, and managed databases',
    takeaway5: 'Railway provides better observability with resource graphs',
    takeaway6: 'Render has native background workers without extra configuration',
    
    whatIsRailwayTitle: 'What is Railway?',
    whatIsRailwayContent: 'Railway is an infrastructure platform that makes it easy to deploy code and databases. Founded in 2020, it focuses on developer experience with a beautiful CLI and dashboard. Railway uses a unique per-resource pricing model where you only pay for what you use, measured by CPU, memory, and network.',
    
    whatIsRenderTitle: 'What is Render?',
    whatIsRenderContent: 'Render is a unified cloud platform to build and run apps and websites. Founded in 2018 by former Google engineers, it positions itself as a Heroku alternative with modern features. Render offers managed databases, background workers, cron jobs, and static site hosting all in one platform.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Detailed cost analysis:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Platform capabilities side-by-side:',
    
    deploymentTitle: 'Deployment Experience',
    deploymentIntro: 'How easy is it to deploy?',
    
    codeExampleTitle: 'Deployment Configuration',
    codeExampleIntro: 'Configuration examples:',
    
    railwayExampleTitle: 'Railway',
    renderExampleTitle: 'Render',
    
    databaseTitle: 'Database Options',
    databaseIntro: 'Managed database capabilities:',
    
    performanceTitle: 'Performance & Reliability',
    performanceIntro: 'Speed and uptime comparison:',
    
    observabilityTitle: 'Observability & Monitoring',
    observabilityIntro: 'Built-in monitoring tools:',
    
    whenToUseTitle: 'When to Use Each Platform',
    railwayBestFor: 'Use Railway When:',
    renderBestFor: 'Use Render When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Railway and Render are excellent PaaS choices with distinct strengths. Railway wins on pricing flexibility and deployment speed, making it ideal for variable workloads and cost optimization. Render excels with its generous free tier, built-in background workers, and predictable service-based pricing. For developers migrating from Heroku, both offer smooth transitions. Choose Railway for flexible scaling and cost control, or Render for simplicity and managed services.',
    
    faq1q: 'Can I use custom domains on both platforms?',
    faq1a: 'Yes, both Railway and Render support custom domains with automatic SSL certificates. Railway allows unlimited custom domains on all plans. Render also supports custom domains with automatic HTTPS.',
    
    faq2q: 'Which platform has better free tier?',
    faq2a: 'Render has a more generous free tier with 750 free hours per month for web services, free static sites, and free managed PostgreSQL. Railway offers $5 free credit monthly but services cost money after that.',
    
    faq3q: 'How do cold starts compare?',
    faq3a: 'Railway generally has faster cold starts (2-5 seconds) compared to Render (5-15 seconds). Both offer paid plans to eliminate cold starts with always-on services.',
    
    faq4q: 'Can I deploy Docker containers?',
    faq4a: 'Yes, both platforms support Docker deployments. You can either provide a Dockerfile or use pre-built images from registries like Docker Hub.',
    
    faq5q: 'Which is better for databases?',
    faq5a: 'Both offer managed PostgreSQL, MySQL, and Redis. Railway also offers MongoDB. Render provides free PostgreSQL on starter tier. Railway allows connecting external databases easily.',
    
    faq6q: 'Do they support auto-scaling?',
    faq6a: 'Railway offers horizontal scaling with multiple replicas. Render supports auto-scaling on paid plans. Both allow manual scaling of resources.',
    
    faq7q: 'What about CI/CD integration?',
    faq7a: 'Both platforms integrate with GitHub and GitLab for automatic deployments on push. Render also supports Bitbucket. Both support preview deployments for pull requests.',
    
    faq8q: 'Can I migrate from Heroku easily?',
    faq8a: 'Yes, both platforms offer Heroku migration guides and support similar deployment patterns. Railway has a Heroku importer tool. Render supports Procfile and Heroku buildpacks.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Railway vs Render：2025年PaaS平台对比',
    intro: 'Railway和Render是两个领先的平台即服务提供商，简化了应用部署。本全面比较考察定价、功能、性能、数据库选项和开发者体验，帮助你为下一个项目选择合适的PaaS。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Railway提供更灵活的按资源计费定价和更快的部署速度。Render提供更慷慨的免费层和内置后台工作进程。对于工作负载可变的成本敏感开发者，Railway是理想选择。对于希望成本可预测和托管服务的团队，Render表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Railway使用按资源计费，Render使用按服务定价',
    takeaway2: 'Render为业余项目提供更慷慨的免费层',
    takeaway3: 'Railway具有更快的冷启动和部署时间',
    takeaway4: '两者都支持Docker、多种语言和托管数据库',
    takeaway5: 'Railway通过资源图表提供更好的可观察性',
    takeaway6: 'Render具有原生后台工作进程，无需额外配置',
    
    whatIsRailwayTitle: '什么是Railway？',
    whatIsRailwayContent: 'Railway是一个基础设施平台，使部署代码和数据库变得容易。成立于2020年，它专注于开发者体验，拥有漂亮的CLI和仪表板。Railway使用独特的按资源计费模式，你只需为使用的CPU、内存和网络付费。',
    
    whatIsRenderTitle: '什么是Render？',
    whatIsRenderContent: 'Render是一个统一的云平台，用于构建和运行应用及网站。由前Google工程师于2018年创立，它定位为具有现代功能的Heroku替代品。Render在一个平台中提供托管数据库、后台工作进程、定时任务和静态网站托管。',
    
    pricingTitle: '定价对比',
    pricingIntro: '详细成本分析：',
    
    featuresTitle: '功能对比',
    featuresIntro: '平台能力并排比较：',
    
    deploymentTitle: '部署体验',
    deploymentIntro: '部署有多容易？',
    
    codeExampleTitle: '部署配置',
    codeExampleIntro: '配置示例：',
    
    railwayExampleTitle: 'Railway',
    renderExampleTitle: 'Render',
    
    databaseTitle: '数据库选项',
    databaseIntro: '托管数据库能力：',
    
    performanceTitle: '性能与可靠性',
    performanceIntro: '速度和正常运行时间比较：',
    
    observabilityTitle: '可观察性与监控',
    observabilityIntro: '内置监控工具：',
    
    whenToUseTitle: '何时使用每个平台',
    railwayBestFor: '使用Railway的场景：',
    renderBestFor: '使用Render的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Railway和Render都是具有明显优势的优秀PaaS选择。Railway在定价灵活性和部署速度方面胜出，非常适合可变工作负载和成本优化。Render以其慷慨的免费层、内置后台工作进程和可预测的基于服务的定价脱颖而出。对于从Heroku迁移的开发者，两者都提供平滑过渡。选择Railway获得灵活扩展和成本控制，或选择Render获得简单性和托管服务。',
    
    faq1q: '我可以在两个平台上使用自定义域名吗？',
    faq1a: '可以，Railway和Render都支持带有自动SSL证书的自定义域名。Railway在所有计划上允许无限自定义域名。Render也支持带有自动HTTPS的自定义域名。',
    
    faq2q: '哪个平台的免费层更好？',
    faq2a: 'Render有更慷慨的免费层，每月750小时免费Web服务、免费静态网站和免费托管PostgreSQL。Railway提供每月5美元免费额度，但之后服务需要付费。',
    
    faq3q: '冷启动如何比较？',
    faq3a: 'Railway通常有更快的冷启动（2-5秒）相比Render（5-15秒）。两者都提供付费计划以通过始终运行的服务消除冷启动。',
    
    faq4q: '我可以部署Docker容器吗？',
    faq4a: '可以，两个平台都支持Docker部署。你可以提供Dockerfile或使用Docker Hub等注册表中的预构建镜像。',
    
    faq5q: '哪个更适合数据库？',
    faq5a: '两者都提供托管PostgreSQL、MySQL和Redis。Railway还提供MongoDB。Render在入门层提供免费PostgreSQL。Railway允许轻松连接外部数据库。',
    
    faq6q: '它们支持自动扩展吗？',
    faq6a: 'Railway提供具有多个副本的水平扩展。Render在付费计划上支持自动扩展。两者都允许手动扩展资源。',
    
    faq7q: 'CI/CD集成呢？',
    faq7a: '两个平台都与GitHub和GitLab集成，用于推送时自动部署。Render还支持Bitbucket。两者都支持拉取请求的预览部署。',
    
    faq8q: '我可以轻松从Heroku迁移吗？',
    faq8a: '可以，两个平台都提供Heroku迁移指南并支持类似的部署模式。Railway有Heroku导入工具。Render支持Procfile和Heroku buildpacks。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function RailwayVsRender2025({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsRailwayTitle}</h3>
      <p style={pStyle}>{ct.whatIsRailwayContent}</p>

      <h3 style={h3Style}>{ct.whatIsRenderTitle}</h3>
      <p style={pStyle}>{ct.whatIsRenderContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目' : 'Item'}</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费额度' : 'Free Tier', '$5/month credit', '750 hours/month free'],
              [isZh ? 'Web服务起步价' : 'Web Service Start', '~$5/month', '$7/month'],
              [isZh ? '数据库起步价' : 'Database Start', '$5/month', '$7/month (free starter)'],
              [isZh ? '计费方式' : 'Billing Model', isZh ? '按资源使用' : 'Per-resource usage', isZh ? '按服务' : 'Per-service'],
              [isZh ? '带宽' : 'Bandwidth', '$0.10/GB', '100GB free, then $0.10/GB'],
              [isZh ? '休眠服务' : 'Sleeping Services', isZh ? '极低成本' : 'Minimal cost', 'Free on free tier'],
            ].map(([item, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{item}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{railway}</td>
                <td style={tdStyle}>{render}</td>
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
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Web服务' : 'Web Services', '✓', '✓'],
              [isZh ? '后台工作进程' : 'Background Workers', isZh ? '作为服务运行' : 'Run as service', '✓ Native'],
              [isZh ? '定时任务' : 'Cron Jobs', '✓', '✓'],
              [isZh ? '静态网站' : 'Static Sites', '✓', '✓'],
              [isZh ? 'Docker支持' : 'Docker Support', '✓', '✓'],
              [isZh ? '预览部署' : 'Preview Deployments', '✓', '✓'],
              [isZh ? '自动SSL' : 'Auto SSL', '✓', '✓'],
              [isZh ? '私有网络' : 'Private Networking', '✓', '✓'],
              [isZh ? '环境变量' : 'Environment Variables', '✓', '✓'],
              [isZh ? '日志流' : 'Log Streaming', '✓', '✓'],
            ].map(([feature, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{railway}</td>
                <td style={tdStyle}>{render}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.railwayExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Railway: railway.toml or railway.json
# Most apps auto-detect, but you can customize:

[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "on_failure"

# Or use nixpacks.toml for custom builds:
[phases.setup]
nixPkgs = ["nodejs-18_x", "yarn"]

[phases.install]
cmds = ["yarn install --frozen-lockfile"]

[phases.build]
cmds = ["yarn build"]

[start]
cmd = "yarn start"

# Deploy with CLI:
# railway init
# railway up
# railway open`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.renderExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Render: render.yaml (Infrastructure as Code)
# Or use dashboard for manual setup

services:
  - type: web
    name: my-app
    env: node
    region: oregon
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: my-db
          property: connectionString

  - type: worker
    name: background-worker
    env: node
    buildCommand: npm install
    startCommand: npm run worker

databases:
  - name: my-db
    databaseName: myapp
    plan: starter

# Deploy by:
# 1. Connect GitHub repo to Render
# 2. Add render.yaml to repo root
# 3. Create new Blueprint instance`}</code></pre>

      <h2 style={h2Style}>{ct.databaseTitle}</h2>
      <p style={pStyle}>{ct.databaseIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '数据库' : 'Database'}</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PostgreSQL', '✓', '✓'],
              ['MySQL', '✓', '✓'],
              ['Redis', '✓', '✓'],
              ['MongoDB', '✓', '✗'],
              [isZh ? '免费层' : 'Free Tier', '$5 credit', '90-day free PostgreSQL'],
              [isZh ? '自动备份' : 'Auto Backups', '✓', '✓'],
              [isZh ? '连接池' : 'Connection Pooling', '✓', '✓'],
            ].map(([db, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{db}</td>
                <td style={tdStyle}>{railway}</td>
                <td style={tdStyle}>{render}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷启动' : 'Cold Start', '2-5 seconds', '5-15 seconds'],
              [isZh ? '部署时间' : 'Deploy Time', '1-3 minutes', '2-5 minutes'],
              [isZh ? 'SLA' : 'SLA', '99.9% (Pro)', '99.9% (Pro)'],
              [isZh ? '区域' : 'Regions', 'US West, US East, EU West', 'Oregon, Frankfurt, Singapore'],
              [isZh ? 'CDN' : 'CDN', 'Cloudflare', 'Cloudflare'],
            ].map(([metric, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{railway}</td>
                <td style={tdStyle}>{render}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.observabilityTitle}</h2>
      <p style={pStyle}>{ct.observabilityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Railway</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '实时资源图表、日志流、部署历史、项目模板、指标仪表板。可视化CPU/内存/网络使用情况。' : 'Real-time resource graphs, log streaming, deployment history, project templates, metrics dashboard. Visual CPU/memory/network usage.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Render</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '日志流、指标、告警、部署历史。支持Datadog、New Relic集成。基础监控在所有计划上可用。' : 'Log streaming, metrics, alerts, deployment history. Supports Datadog, New Relic integration. Basic monitoring available on all plans.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.railwayBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '可变工作负载' : 'Variable workloads'}</li>
            <li>{isZh ? '成本优化' : 'Cost optimization'}</li>
            <li>{isZh ? '需要MongoDB' : 'Need MongoDB'}</li>
            <li>{isZh ? '快速部署' : 'Fast deployments'}</li>
            <li>{isZh ? '精细资源控制' : 'Fine-grained resource control'}</li>
            <li>{isZh ? '开发/测试环境' : 'Dev/test environments'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.renderBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '业余项目（免费层）' : 'Hobby projects (free tier)'}</li>
            <li>{isZh ? '后台工作进程' : 'Background workers'}</li>
            <li>{isZh ? '可预测成本' : 'Predictable costs'}</li>
            <li>{isZh ? '团队协作' : 'Team collaboration'}</li>
            <li>{isZh ? '需要免费数据库' : 'Need free database'}</li>
            <li>{isZh ? '静态网站+后端' : 'Static sites + backend'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={'/' + lang + '/tools/url-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Encoder</a>
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
