'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Linear vs Jira: Project Management Tool Comparison',
    intro: 'Linear and Jira represent two generations of project management tools. Jira has been the enterprise standard for years, while Linear is redefining what modern issue tracking can be. This comprehensive comparison helps teams choose the right tool for their development workflow.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Linear is faster, more intuitive, and designed for modern software teams. Jira is more customizable and established in enterprise environments. For startups and modern tech teams, Linear offers superior UX. For large enterprises with complex workflows, Jira remains the safe choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Linear is 10x faster with keyboard-first navigation and instant UI',
    takeaway2: 'Jira offers more customization and enterprise features',
    takeaway3: 'Linear has better GitHub/GitLab integration out of the box',
    takeaway4: 'Jira pricing scales with team size; Linear has per-user pricing',
    takeaway5: 'Both support Scrum, Kanban, and custom workflows',
    takeaway6: 'Linear is designed for software teams; Jira serves all departments',
    
    whatIsLinearTitle: 'What is Linear?',
    whatIsLinearContent: 'Linear is a modern issue tracking and project management tool launched in 2019 by ex-Uber, Airbnb, and Microsoft engineers. Built with performance as a core principle, it offers sub-50ms interactions and a keyboard-first interface. It focuses specifically on software development workflows with deep integrations to GitHub, GitLab, and Slack.',
    
    whatIsJiraTitle: 'What is Jira?',
    whatIsJiraContent: 'Jira is Atlassians flagship project management tool launched in 2002. Originally designed for bug tracking, it has evolved into a comprehensive platform supporting various methodologies. With extensive customization options and enterprise features, it serves millions of users across industries. It is part of the Atlassian suite including Confluence and Bitbucket.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the cost structure for both tools:',
    
    performanceTitle: 'Performance & User Experience',
    performanceIntro: 'Speed and interface comparison:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed comparison of core project management capabilities:',
    
    workflowTitle: 'Workflow & Customization',
    workflowIntro: 'How each tool handles custom workflows:',
    
    integrationsTitle: 'Integrations',
    integrationsIntro: 'Third-party tool connections:',
    
    reportingTitle: 'Reporting & Analytics',
    reportingIntro: 'Data visualization and insights:',
    
    teamFeaturesTitle: 'Team Collaboration',
    teamFeaturesIntro: 'Communication and collaboration features:',
    
    whenToUseTitle: 'When to Use Each Tool',
    linearBestFor: 'Use Linear When:',
    jiraBestFor: 'Use Jira When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Linear and Jira serve different audiences. Linear excels for modern software teams that prioritize speed, clean UX, and developer experience. Its keyboard-first approach and instant performance make it a joy to use. Jira remains the choice for enterprises needing extensive customization, compliance features, and cross-department support. For most startups and tech companies, Linear offers a better experience. For large organizations with complex requirements, Jira provides the flexibility needed.',
    
    faq1q: 'Can I migrate from Jira to Linear?',
    faq1a: 'Yes, Linear provides migration tools to import issues, projects, and users from Jira. The process preserves most data including comments, attachments, and history. Some custom fields and complex workflows may need manual adjustment. Most teams complete migration within a few days.',
    
    faq2q: 'Does Linear support Scrum?',
    faq2a: 'Yes, Linear fully supports Scrum with cycles (sprints), velocity tracking, burndown charts, and backlog management. It also supports Kanban and hybrid approaches. The interface is designed to work seamlessly with any methodology.',
    
    faq3q: 'Is Jira too complex for small teams?',
    faq3a: 'Jira can be complex, but Jira Work Management (formerly Jira Core) offers a simpler experience for small teams. However, for software teams under 50 people, Linear is generally easier to adopt and provides better value. The learning curve for Jira is steeper.',
    
    faq4q: 'Does Linear have a mobile app?',
    faq4a: 'Yes, Linear has native iOS and Android apps with full functionality. The mobile experience is excellent, maintaining the speed and clean design of the desktop version. You can manage issues, view projects, and collaborate on the go.',
    
    faq5q: 'Can Jira integrate with GitHub?',
    faq5a: 'Yes, Jira has robust GitHub integration through the Jira Development Integration. You can link commits, branches, and pull requests to issues, view development activity, and automate status updates. Setup requires more configuration than Linear.',
    
    faq6q: 'Which is better for remote teams?',
    faq6a: 'Both work well for remote teams. Linear has built-in Slack/Discord integration and real-time updates. Jira works with various communication tools but requires more setup. For distributed teams prioritizing async communication, Linear often feels more natural.',
    
    faq7q: 'Does Linear support custom fields?',
    faq7a: 'Yes, Linear supports custom fields including text, number, date, and dropdown types. While not as extensive as Jiras field options, it covers most needs without overwhelming users. Custom fields integrate with views and filters.',
    
    faq8q: 'What about security and compliance?',
    faq8a: 'Both tools take security seriously. Linear offers SSO, SAML, audit logs, and SOC 2 compliance. Jira provides additional enterprise features like data residency controls, advanced permissions, and extensive compliance certifications. For highly regulated industries, Jira may have an edge.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Linear vs Jira：项目管理工具对比',
    intro: 'Linear和Jira代表了两代项目管理工具。Jira多年来一直是企业标准，而Linear正在重新定义现代问题追踪。本全面对比帮助团队为其开发工作流程选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Linear更快、更直观，专为现代软件团队设计。Jira更可定制，在企业环境中更成熟。对于初创公司和现代技术团队，Linear提供卓越的用户体验。对于具有复杂工作流程的大型企业，Jira仍然是安全的选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Linear快10倍，具有键盘优先导航和即时UI',
    takeaway2: 'Jira提供更多定制和企业功能',
    takeaway3: 'Linear开箱即用有更好的GitHub/GitLab集成',
    takeaway4: 'Jira定价随团队规模扩展；Linear按用户定价',
    takeaway5: '两者都支持Scrum、看板和自定义工作流程',
    takeaway6: 'Linear专为软件团队设计；Jira服务所有部门',
    
    whatIsLinearTitle: '什么是Linear？',
    whatIsLinearContent: 'Linear是2019年由前Uber、Airbnb和Microsoft工程师推出的现代问题追踪和项目管理工具。以性能为核心原则构建，提供50毫秒以下的交互和键盘优先界面。专注于软件开发工作流程，与GitHub、GitLab和Slack深度集成。',
    
    whatIsJiraTitle: '什么是Jira？',
    whatIsJiraContent: 'Jira是Atlassian于2002年推出的旗舰项目管理工具。最初专为错误追踪设计，已发展为支持各种方法论的综合平台。具有广泛的定制选项和企业功能，服务各行业数百万用户。它是包括Confluence和Bitbucket的Atlassian套件的一部分。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解两个工具的成本结构：',
    
    performanceTitle: '性能与用户体验',
    performanceIntro: '速度和界面对比：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心项目管理能力详细对比：',
    
    workflowTitle: '工作流程与定制',
    workflowIntro: '每个工具如何处理自定义工作流程：',
    
    integrationsTitle: '集成',
    integrationsIntro: '第三方工具连接：',
    
    reportingTitle: '报告与分析',
    reportingIntro: '数据可视化和洞察：',
    
    teamFeaturesTitle: '团队协作',
    teamFeaturesIntro: '沟通和协作功能：',
    
    whenToUseTitle: '何时使用每个工具',
    linearBestFor: '使用Linear的场景：',
    jiraBestFor: '使用Jira的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Linear和Jira服务于不同受众。Linear为优先考虑速度、简洁用户体验和开发者体验的现代软件团队表现出色。其键盘优先方法和即时性能使其使用起来令人愉悦。Jira仍然是需要广泛定制、合规功能和跨部门支持的企业的选择。对于大多数初创公司和技术公司，Linear提供更好的体验。对于有复杂需求的大型组织，Jira提供所需的灵活性。',
    
    faq1q: '我可以从Jira迁移到Linear吗？',
    faq1a: '可以，Linear提供迁移工具从Jira导入问题、项目和用户。该过程保留大多数数据，包括评论、附件和历史记录。一些自定义字段和复杂工作流程可能需要手动调整。大多数团队在几天内完成迁移。',
    
    faq2q: 'Linear支持Scrum吗？',
    faq2a: '支持，Linear完全支持Scrum，包括周期（冲刺）、速度追踪、燃尽图和待办事项管理。它还支持看板和混合方法。界面设计为与任何方法论无缝配合。',
    
    faq3q: 'Jira对小团队来说太复杂吗？',
    faq3a: 'Jira可能很复杂，但Jira Work Management（原Jira Core）为小团队提供更简单的体验。但是，对于50人以下的软件团队，Linear通常更容易采用并提供更好的价值。Jira的学习曲线更陡峭。',
    
    faq4q: 'Linear有移动应用吗？',
    faq4a: '有，Linear有功能完整的原生iOS和Android应用。移动体验出色，保持了桌面版的速度和简洁设计。你可以在移动中管理问题、查看项目和协作。',
    
    faq5q: 'Jira可以与GitHub集成吗？',
    faq5a: '可以，Jira通过Jira Development Integration与GitHub有强大的集成。你可以将提交、分支和拉取请求链接到问题，查看开发活动，并自动化状态更新。设置比Linear需要更多配置。',
    
    faq6q: '哪个更适合远程团队？',
    faq6a: '两者都适合远程团队。Linear有内置Slack/Discord集成和实时更新。Jira可与各种沟通工具配合，但需要更多设置。对于优先考虑异步沟通的分布式团队，Linear通常感觉更自然。',
    
    faq7q: 'Linear支持自定义字段吗？',
    faq7a: '支持，Linear支持自定义字段，包括文本、数字、日期和下拉类型。虽然不如Jira的字段选项广泛，但它覆盖了大多数需求而不会让用户不知所措。自定义字段与视图和过滤器集成。',
    
    faq8q: '安全和合规性如何？',
    faq8a: '两个工具都认真对待安全。Linear提供SSO、SAML、审计日志和SOC 2合规。Jira提供额外的企业功能，如数据驻留控制、高级权限和广泛的合规认证。对于高度监管的行业，Jira可能有优势。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function LinearVsJira({ lang }: { lang: string }) {
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
      <div style={{ ...boxStyle, borderLeft: '4px solid #5e6ad2', background: 'linear-gradient(135deg, rgba(94,106,210,0.1), rgba(0,184,235,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#5e6ad2' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsLinearTitle}</h3>
      <p style={pStyle}>{ct.whatIsLinearContent}</p>

      <h3 style={h3Style}>{ct.whatIsJiraTitle}</h3>
      <p style={pStyle}>{ct.whatIsJiraContent}</p>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>Linear</th>
              <th style={thStyle}>Jira</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费版' : 'Free', isZh ? '最多10用户' : 'Up to 10 users', isZh ? '最多10用户' : 'Up to 10 users'],
              [isZh ? '标准版' : 'Standard', '$10/用户/月', '$7.75/用户/月'],
              [isZh ? '专业版' : 'Premium', '$14/用户/月', '$15.25/用户/月'],
              [isZh ? '企业版' : 'Enterprise', isZh ? '联系销售' : 'Contact sales', isZh ? '联系销售' : 'Contact sales'],
              [isZh ? '按年付费折扣' : 'Annual Discount', '20%', '17%'],
              [isZh ? '非营利/教育' : 'Nonprofit/Education', isZh ? '50%折扣' : '50% off', isZh ? '免费/折扣' : 'Free/discounted'],
            ].map(([plan, linear, jira], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{linear}</td>
                <td style={tdStyle}>{jira}</td>
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
              <th style={thStyle}>Linear</th>
              <th style={thStyle}>Jira</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '交互响应' : 'Interaction Response', '<50ms', '200-500ms'],
              [isZh ? '页面加载' : 'Page Load', '<1秒', '2-5秒'],
              [isZh ? '搜索速度' : 'Search Speed', isZh ? '即时' : 'Instant', isZh ? '中等' : 'Medium'],
              [isZh ? '键盘导航' : 'Keyboard Navigation', isZh ? '全面' : 'Full', isZh ? '有限' : 'Limited'],
              [isZh ? '离线支持' : 'Offline Support', isZh ? '有限' : 'Limited', isZh ? '无' : 'None'],
              [isZh ? 'UI响应性' : 'UI Responsiveness', isZh ? '原生应用感' : 'Native app feel', isZh ? '传统Web' : 'Traditional web'],
              [isZh ? '移动应用体验' : 'Mobile App Experience', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
            ].map(([metric, linear, jira], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{linear}</td>
                <td style={tdStyle}>{jira}</td>
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
              <th style={thStyle}>Linear</th>
              <th style={thStyle}>Jira</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '看板' : 'Kanban Boards', '✓', '✓'],
              [isZh ? '冲刺/周期' : 'Sprints/Cycles', '✓', '✓'],
              [isZh ? '待办事项' : 'Backlog', '✓', '✓'],
              [isZh ? '时间线/甘特图' : 'Timeline/Gantt', '✓', '✓'],
              [isZh ? '自定义工作流' : 'Custom Workflows', '✓', '✓✓'],
              [isZh ? '自定义字段' : 'Custom Fields', '✓', '✓✓✓'],
              [isZh ? '自动化' : 'Automation', '✓', '✓✓'],
              [isZh ? '子任务' : 'Subtasks', '✓', '✓'],
              [isZh ? '模板' : 'Templates', '✓', '✓'],
              [isZh ? 'API访问' : 'API Access', '✓ GraphQL', '✓ REST'],
            ].map(([feature, linear, jira], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: linear.includes('✓') ? '#22c55e' : undefined }}>{linear}</td>
                <td style={{ ...tdStyle, color: jira.includes('✓') ? '#22c55e' : undefined }}>{jira}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Workflow */}
      <h2 style={h2Style}>{ct.workflowTitle}</h2>
      <p style={pStyle}>{ct.workflowIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #5e6ad2' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#5e6ad2' }}>Linear</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '简洁的默认工作流' : 'Clean default workflows'}</li>
            <li>{isZh ? '拖拽状态更改' : 'Drag-drop status changes'}</li>
            <li>{isZh ? '可配置状态类型' : 'Configurable status types'}</li>
            <li>{isZh ? '自动化规则' : 'Automation rules'}</li>
            <li>{isZh ? '工作流模板' : 'Workflow templates'}</li>
            <li>{isZh ? '约定优于配置' : 'Convention over configuration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #0052cc' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#0052cc' }}>Jira</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高度可定制工作流' : 'Highly customizable workflows'}</li>
            <li>{isZh ? '复杂状态转换' : 'Complex status transitions'}</li>
            <li>{isZh ? '权限控制' : 'Permission controls'}</li>
            <li>{isZh ? 'Jira自动化' : 'Jira Automation'}</li>
            <li>{isZh ? '脚本功能（ScriptRunner）' : 'Scripting (ScriptRunner)'}</li>
            <li>{isZh ? '企业流程支持' : 'Enterprise process support'}</li>
          </ul>
        </div>
      </div>

      {/* Integrations */}
      <h2 style={h2Style}>{ct.integrationsTitle}</h2>
      <p style={pStyle}>{ct.integrationsIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '集成' : 'Integration'}</th>
              <th style={thStyle}>Linear</th>
              <th style={thStyle}>Jira</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['GitHub', '✓✓', '✓'],
              ['GitLab', '✓✓', '✓'],
              ['Slack', '✓✓', '✓'],
              ['Figma', '✓', '✓'],
              ['Confluence', isZh ? '通过API' : 'Via API', '✓✓✓'],
              ['VS Code', '✓', '✓'],
              ['Zapier', '✓', '✓'],
              ['Intercom', '✓', '✓'],
              ['LaTeX', '✓', isZh ? '有限' : 'Limited'],
              [isZh ? '开放API' : 'Open API', '✓ GraphQL', '✓ REST'],
            ].map(([integration, linear, jira], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{integration}</td>
                <td style={{ ...tdStyle, color: linear.includes('✓') ? '#22c55e' : undefined }}>{linear}</td>
                <td style={{ ...tdStyle, color: jira.includes('✓') ? '#22c55e' : undefined }}>{jira}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reporting */}
      <h2 style={h2Style}>{ct.reportingTitle}</h2>
      <p style={pStyle}>{ct.reportingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Linear</th>
              <th style={thStyle}>Jira</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '燃尽图' : 'Burndown Charts', '✓', '✓'],
              [isZh ? '速度追踪' : 'Velocity Tracking', '✓', '✓'],
              [isZh ? '累积流图' : 'Cumulative Flow', '✓', '✓'],
              [isZh ? '自定义仪表盘' : 'Custom Dashboards', '✓', '✓✓'],
              [isZh ? '高级报告' : 'Advanced Reports', isZh ? '基础' : 'Basic', '✓✓✓'],
              [isZh ? '导出数据' : 'Export Data', 'CSV/JSON', 'CSV/Excel/JSON'],
              [isZh ? '实时洞察' : 'Real-time Insights', '✓', '✓'],
              [isZh ? '项目概览' : 'Project Overview', '✓', '✓'],
            ].map(([feature, linear, jira], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{linear}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{jira}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Team Collaboration */}
      <h2 style={h2Style}>{ct.teamFeaturesTitle}</h2>
      <p style={pStyle}>{ct.teamFeaturesIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Linear</th>
              <th style={thStyle}>Jira</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '评论/提及' : 'Comments/Mentions', '✓', '✓'],
              [isZh ? '通知' : 'Notifications', '✓', '✓'],
              [isZh ? '分配问题' : 'Issue Assignment', '✓', '✓'],
              [isZh ? '团队视图' : 'Team Views', '✓', '✓'],
              [isZh ? '共享视图' : 'Shared Views', '✓', '✓'],
              [isZh ? '权限控制' : 'Permission Control', isZh ? '基本' : 'Basic', isZh ? '高级' : 'Advanced'],
              [isZh ? '活动流' : 'Activity Stream', '✓', '✓'],
              [isZh ? '@提及' : '@ Mentions', '✓', '✓'],
            ].map(([feature, linear, jira], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{linear}</td>
                <td style={tdStyle}>{jira}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #5e6ad2' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#5e6ad2' }}>{ct.linearBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '现代软件团队' : 'Modern software teams'}</li>
            <li>{isZh ? '初创公司' : 'Startups'}</li>
            <li>{isZh ? '重视速度和UX' : 'Value speed & UX'}</li>
            <li>{isZh ? 'GitHub/GitLab重度用户' : 'Heavy GitHub/GitLab users'}</li>
            <li>{isZh ? '远程优先团队' : 'Remote-first teams'}</li>
            <li>{isZh ? '希望简洁设置' : 'Want simple setup'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #0052cc' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#0052cc' }}>{ct.jiraBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型企业' : 'Large enterprises'}</li>
            <li>{isZh ? '复杂工作流需求' : 'Complex workflow needs'}</li>
            <li>{isZh ? '跨部门团队' : 'Cross-department teams'}</li>
            <li>{isZh ? '合规要求' : 'Compliance requirements'}</li>
            <li>{isZh ? '现有Atlassian用户' : 'Existing Atlassian users'}</li>
            <li>{isZh ? '需要高级报告' : 'Need advanced reporting'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(94,106,210,0.1), rgba(0,184,235,0.1))', borderRadius: 12, border: '1px solid rgba(94,106,210,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/cron-expression-generator'} style={{ color: '#5e6ad2', textDecoration: 'none' }}>Cron Expression Generator</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#5e6ad2', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#5e6ad2', textDecoration: 'none' }}>UUID Generator</a>
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
