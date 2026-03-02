'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Backstage vs Mia-Platform: Developer Portal Comparison',
    intro: 'Backstage and Mia-Platform are both powerful developer portal solutions, but they serve different organizational needs. This comprehensive comparison examines architecture, features, ecosystem, and real-world implementation to help you choose the right internal developer platform.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Backstage is an open-source CNCF project with a massive plugin ecosystem, ideal for organizations wanting customization and community support. Mia-Platform is a commercial product offering managed services and enterprise features out of the box. Choose Backstage for flexibility and cost control; choose Mia-Platform for faster deployment and enterprise support.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Backstage is open-source (CNCF) with 200+ community plugins',
    takeaway2: 'Mia-Platform offers managed hosting and enterprise support',
    takeaway3: 'Backstage requires more setup but offers unlimited customization',
    takeaway4: 'Mia-Platform provides faster time-to-value with built-in features',
    takeaway5: 'Both support software catalogs, templates, and documentation',
    takeaway6: 'Backstage is better for large enterprises with dedicated platform teams',
    
    whatIsBackstageTitle: 'What is Backstage?',
    whatIsBackstageContent: 'Backstage is an open-source developer portal created by Spotify in 2020 and donated to the CNCF. It provides a unified frontend for all infrastructure tooling, services, and documentation. Backstage\'s plugin architecture allows organizations to extend functionality while maintaining a consistent developer experience.',
    
    whatIsMiaTitle: 'What is Mia-Platform?',
    whatIsMiaContent: 'Mia-Platform is a commercial Internal Developer Platform (IDP) that combines a developer portal with microservices management capabilities. Founded in 2016 and backed by Mia srl, it offers both self-hosted and cloud options with built-in features for API management, microservices orchestration, and observability.',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'Core architectural differences:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Setup Examples',
    codeExampleIntro: 'See how each platform is configured:',
    
    backstageExampleTitle: 'Backstage Setup',
    miaExampleTitle: 'Mia-Platform Configuration',
    
    whenToUseTitle: 'When to Use Each Platform',
    backstageBestFor: 'Use Backstage When:',
    miaBestFor: 'Use Mia-Platform When:',
    
    pricingTitle: 'Pricing & Licensing',
    pricingIntro: 'Cost considerations:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Backstage and Mia-Platform represent different approaches to developer portals. Backstage excels in flexibility, community support, and cost-effectiveness for organizations with strong platform engineering teams. Mia-Platform offers a more turnkey solution with enterprise support and managed services. Your choice depends on budget, in-house expertise, time-to-market requirements, and customization needs. Many large enterprises start with Backstage, while mid-size companies often prefer the faster deployment of Mia-Platform.',
    
    faq1q: 'Is Backstage really free?',
    faq1a: 'Yes, Backstage is completely free and open-source under the Apache 2.0 license. However, you will incur costs for hosting, maintenance, and development resources to customize and maintain it. The total cost of ownership can still be lower than commercial alternatives.',
    
    faq2q: 'Can I migrate from Mia-Platform to Backstage?',
    faq2a: 'Yes, migration is possible but requires effort. You will need to export your service catalog, recreate templates, and rebuild custom integrations. Backstage\'s plugin architecture makes it possible to replicate most Mia-Platform functionality over time.',
    
    faq3q: 'Does Backstage require Kubernetes?',
    faq3a: 'No, Backstage can run on any Node.js environment. While many organizations deploy it on Kubernetes for scalability, it can run on VMs, Docker containers, or platform-as-a-service offerings like Heroku or Vercel.',
    
    faq4q: 'What is the learning curve for Backstage?',
    faq4a: 'Expect 2-4 weeks to understand core concepts and deploy a basic instance. Creating custom plugins and advanced configurations may take 2-3 months. Organizations with existing React/TypeScript expertise will have an easier time.',
    
    faq5q: 'Does Mia-Platform support custom plugins?',
    faq5a: 'Mia-Platform supports customization through its extension system and API marketplace. However, the plugin ecosystem is smaller than Backstage. Contact their sales team for specific customization requirements.',
    
    faq6q: 'Can both platforms integrate with CI/CD tools?',
    faq6a: 'Yes, both platforms integrate with popular CI/CD tools. Backstage has plugins for GitHub Actions, GitLab CI, Jenkins, CircleCI, and more. Mia-Platform has native integrations with major CI/CD providers.',
    
    faq7q: 'Which has better documentation?',
    faq7a: 'Backstage has extensive community documentation and many tutorials. Mia-Platform offers professional documentation with dedicated support. Both are well-documented, but Backstage benefits from community contributions.',
    
    faq8q: 'What about enterprise security features?',
    faq8a: 'Both platforms support enterprise security. Backstage offers RBAC, SSO, and audit logging through plugins. Mia-Platform includes these features out of the box with enterprise-grade security compliance.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Backstage vs Mia-Platform：开发者门户对比',
    intro: 'Backstage和Mia-Platform都是强大的开发者门户解决方案，但服务于不同的组织需求。本全面比较考察架构、功能、生态系统和实际实施，帮助你选择合适的内部开发者平台。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Backstage是一个开源CNCF项目，拥有庞大的插件生态系统，适合希望定制化和社区支持的组织。Mia-Platform是一个商业产品，提供托管服务和企业级功能开箱即用。追求灵活性和成本控制选择Backstage；追求更快部署和企业支持选择Mia-Platform。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Backstage是开源（CNCF）项目，拥有200+社区插件',
    takeaway2: 'Mia-Platform提供托管托管和企业支持',
    takeaway3: 'Backstage需要更多设置，但提供无限定制',
    takeaway4: 'Mia-Platform提供内置功能，更快实现价值',
    takeaway5: '两者都支持软件目录、模板和文档',
    takeaway6: 'Backstage更适合有专门平台团队的大型企业',
    
    whatIsBackstageTitle: '什么是Backstage？',
    whatIsBackstageContent: 'Backstage是Spotify在2020年创建并捐赠给CNCF的开源开发者门户。它为所有基础设施工具、服务和文档提供统一前端。Backstage的插件架构允许组织扩展功能，同时保持一致的开发者体验。',
    
    whatIsMiaTitle: '什么是Mia-Platform？',
    whatIsMiaContent: 'Mia-Platform是一个商业内部开发者平台（IDP），将开发者门户与微服务管理能力结合。成立于2016年，由Mia srl支持，提供自托管和云选项，内置API管理、微服务编排和可观测性功能。',
    
    architectureTitle: '架构对比',
    architectureIntro: '核心架构差异：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置能力和生态系统：',
    
    codeExampleTitle: '设置示例',
    codeExampleIntro: '查看每个平台的配置：',
    
    backstageExampleTitle: 'Backstage设置',
    miaExampleTitle: 'Mia-Platform配置',
    
    whenToUseTitle: '何时使用每个平台',
    backstageBestFor: '使用Backstage的场景：',
    miaBestFor: '使用Mia-Platform的场景：',
    
    pricingTitle: '定价与许可',
    pricingIntro: '成本考虑：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Backstage和Mia-Platform代表了开发者门户的不同方法。Backstage在灵活性、社区支持和成本效益方面表现出色，适合有强大平台工程团队的组织。Mia-Platform提供更多交钥匙解决方案，具有企业支持和托管服务。你的选择取决于预算、内部专业知识、上市时间要求和定制需求。许多大型企业从Backstage开始，而中型公司通常更喜欢Mia-Platform的更快部署。',
    
    faq1q: 'Backstage真的免费吗？',
    faq1a: '是的，Backstage完全免费，采用Apache 2.0许可证。但是，你需要支付托管、维护和开发资源来自定义和维护它。总拥有成本仍可能低于商业替代方案。',
    
    faq2q: '可以从Mia-Platform迁移到Backstage吗？',
    faq2a: '可以，迁移是可能的但需要努力。你需要导出服务目录、重新创建模板并重建自定义集成。Backstage的插件架构使随时间复制大多数Mia-Platform功能成为可能。',
    
    faq3q: 'Backstage需要Kubernetes吗？',
    faq3a: '不需要，Backstage可以在任何Node.js环境中运行。虽然许多组织在Kubernetes上部署以实现可扩展性，但它可以在VM、Docker容器或Heroku或Vercel等平台即服务上运行。',
    
    faq4q: 'Backstage的学习曲线如何？',
    faq4a: '预计需要2-4周理解核心概念并部署基本实例。创建自定义插件和高级配置可能需要2-3个月。拥有现有React/TypeScript专业知识的组织会更容易。',
    
    faq5q: 'Mia-Platform支持自定义插件吗？',
    faq5a: 'Mia-Platform通过其扩展系统和API市场支持定制。但是，插件生态系统比Backstage小。联系他们的销售团队了解具体定制需求。',
    
    faq6q: '两个平台都可以与CI/CD工具集成吗？',
    faq6a: '可以，两个平台都与流行的CI/CD工具集成。Backstage有GitHub Actions、GitLab CI、Jenkins、CircleCI等插件。Mia-Platform与主要CI/CD提供商原生集成。',
    
    faq7q: '哪个文档更好？',
    faq7a: 'Backstage有广泛的社区文档和许多教程。Mia-Platform提供专业文档和专门支持。两者都有良好的文档，但Backstage受益于社区贡献。',
    
    faq8q: '企业安全功能如何？',
    faq8a: '两个平台都支持企业安全。Backstage通过插件提供RBAC、SSO和审计日志。Mia-Platform开箱即用地包含这些功能，具有企业级安全合规性。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function BackstageVsMiaPlatform({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsBackstageTitle}</h3>
      <p style={pStyle}>{ct.whatIsBackstageContent}</p>

      <h3 style={h3Style}>{ct.whatIsMiaTitle}</h3>
      <p style={pStyle}>{ct.whatIsMiaContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Backstage</th>
              <th style={thStyle}>Mia-Platform</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '类型' : 'Type', 'Open Source (CNCF)', 'Commercial'],
              [isZh ? '开发方' : 'Developed By', 'Spotify / CNCF', 'Mia srl'],
              [isZh ? '许可' : 'License', 'Apache 2.0', 'Proprietary + Free Tier'],
              [isZh ? '托管选项' : 'Hosting', 'Self-hosted', 'Self-hosted / Cloud'],
              [isZh ? '核心技术' : 'Core Tech', 'React + Node.js', 'React + Node.js + MongoDB'],
              [isZh ? '数据库' : 'Database', 'PostgreSQL / SQLite', 'MongoDB'],
              [isZh ? '插件架构' : 'Plugin Architecture', 'Extensive (200+ plugins)', 'Extension System'],
              [isZh ? '企业支持' : 'Enterprise Support', 'Via Partners / Spotify', 'Included'],
            ].map(([feature, backstage, mia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{backstage}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{mia}</td>
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
              <th style={thStyle}>Backstage</th>
              <th style={thStyle}>Mia-Platform</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '软件目录' : 'Software Catalog', '✓ Core', '✓ Core'],
              [isZh ? '服务模板' : 'Service Templates', '✓ Software Templates', '✓ Mia Templates'],
              [isZh ? '技术文档' : 'Tech Docs', '✓ TechDocs (MkDocs)', '✓ Documentation Portal'],
              [isZh ? 'API管理' : 'API Management', 'Via Plugin', '✓ Built-in'],
              [isZh ? '微服务编排' : 'Microservices Orchestration', 'Via Plugin', '✓ Built-in'],
              [isZh ? 'Kubernetes集成' : 'Kubernetes Integration', '✓ Via Plugin', '✓ Native'],
              [isZh ? 'CI/CD集成' : 'CI/CD Integration', '✓ Many Plugins', '✓ Native'],
              [isZh ? '搜索' : 'Search', '✓ Elastic/Lunr', '✓ Built-in'],
              [isZh ? 'RBAC' : 'RBAC', 'Via Plugin', '✓ Built-in'],
              [isZh ? 'SSO' : 'SSO', 'Via Plugin', '✓ Built-in'],
              [isZh ? '可观测性' : 'Observability', 'Via Plugins', '✓ Built-in'],
              [isZh ? '成本管理' : 'Cost Management', 'Via Plugin', '✓ Built-in'],
            ].map(([feature, backstage, mia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{backstage}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{mia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#4a4aed' }}>{ct.backstageExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Create a new Backstage app
npx @backstage/create-app@latest

# Directory structure
my-backstage-app/
├── packages/
│   ├── app/                    # Frontend
│   └── backend/                # Backend
├── plugins/                    # Custom plugins
├── app-config.yaml            # Configuration
└── catalog-info.yaml          # Entity descriptors

# app-config.yaml
app:
  title: My Developer Portal
  baseUrl: http://localhost:3000

organization:
  name: My Company

backend:
  baseUrl: http://localhost:7007
  listen:
    port: 7007
  database:
    client: pg
    connection:
      host: localhost
      port: 5432
      user: backstage
      password: secret

integrations:
  github:
    - host: github.com
      token: ghp_xxxx

catalog:
  rules:
    - allow: [Component, System, API, Resource, Location]
  locations:
    - type: url
      target: https://github.com/org/repo/catalog-info.yaml

# catalog-info.yaml (Service Template)
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-service
  description: My awesome service
  annotations:
    github.com/project-slug: org/my-service
spec:
  type: service
  lifecycle: production
  owner: team-a
  system: core-system
  providesApis:
    - my-api`}</code></pre>

      <h3 style={{ ...h3Style, color: '#6b5aed' }}>{ct.miaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Mia-Platform Console Configuration
# Configuration via Console UI or API

# Project configuration (console-project.json)
{
  "projectId": "my-project",
  "name": "My Developer Portal",
  "description": "Internal developer platform",
  "configuration": {
    "deploy": {
      "provider": "kubernetes",
      "namespace": "mia-platform"
    },
    "services": {
      "api-gateway": {
        "type": "api-gateway",
        "routes": [
          {
            "path": "/api/users",
            "service": "user-service"
          }
        ]
      },
      "user-service": {
        "type": "microservice",
        "runtime": "nodejs",
        "replicas": 2
      }
    }
  }
}

# Microservice configuration
{
  "name": "user-service",
  "version": "1.0.0",
  "endpoints": [
    {
      "path": "/users",
      "method": "GET",
      "description": "List all users"
    }
  ],
  "environmentVariables": {
    "DATABASE_URL": "mongodb://mongo:27017/users"
  },
  "resources": {
    "cpu": "100m",
    "memory": "256Mi"
  }
}

# Deploy via Mia-Platform Console
# or using mia-platform CLI:
# mia deploy --project my-project --env production`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4a4aed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4a4aed' }}>{ct.backstageBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要完全定制' : 'Need complete customization'}</li>
            <li>{isZh ? '有专门平台团队' : 'Have dedicated platform team'}</li>
            <li>{isZh ? '预算有限' : 'Limited budget'}</li>
            <li>{isZh ? '需要社区插件' : 'Need community plugins'}</li>
            <li>{isZh ? '大型企业' : 'Large enterprises'}</li>
            <li>{isZh ? 'CNCF生态集成' : 'CNCF ecosystem integration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6b5aed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6b5aed' }}>{ct.miaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速部署需求' : 'Need quick deployment'}</li>
            <li>{isZh ? '需要企业支持' : 'Require enterprise support'}</li>
            <li>{isZh ? '中小型团队' : 'Small to medium teams'}</li>
            <li>{isZh ? '需要托管服务' : 'Need managed services'}</li>
            <li>{isZh ? 'API管理优先' : 'API management priority'}</li>
            <li>{isZh ? '合规要求' : 'Compliance requirements'}</li>
          </ul>
        </div>
      </div>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '成本因素' : 'Cost Factor'}</th>
              <th style={thStyle}>Backstage</th>
              <th style={thStyle}>Mia-Platform</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '许可费' : 'License Fee', 'Free', 'Contact Sales'],
              [isZh ? '托管成本' : 'Hosting Costs', 'Variable (self-managed)', 'Included (cloud)'],
              [isZh ? '开发时间' : 'Development Time', '2-4 months', '1-2 weeks'],
              [isZh ? '维护成本' : 'Maintenance', 'Internal team', 'Included'],
              [isZh ? '支持' : 'Support', 'Community / Paid Partners', 'Included'],
              [isZh ? '插件开发' : 'Plugin Development', 'Custom (your cost)', 'Via extensions'],
            ].map(([factor, backstage, mia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{factor}</td>
                <td style={tdStyle}>{backstage}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{mia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
