'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Notion vs Confluence: Team Documentation Tool Comparison 2025',
    intro: 'Notion and Confluence are two of the most popular team documentation and collaboration tools. Notion offers a flexible, all-in-one workspace with modern design, while Confluence provides enterprise-grade documentation with deep Atlassian integration. This comprehensive comparison helps you choose the right tool for your team.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Notion is ideal for startups, small teams, and companies wanting a modern, flexible workspace that combines docs, wikis, and databases. Confluence excels for large enterprises, Jira-heavy teams, and organizations requiring advanced permissions and compliance features. For most startups in 2025, Notion offers better value and user experience.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Notion is more flexible with databases, views, and customizable templates',
    takeaway2: 'Confluence has superior integration with Jira and Atlassian suite',
    takeaway3: 'Notion has better mobile apps and offline support',
    takeaway4: 'Confluence offers more granular permissions and enterprise compliance',
    takeaway5: 'Notion is easier to learn; Confluence has steeper learning curve',
    takeaway6: 'Confluence has better page versioning and history features',
    
    whatIsNotionTitle: 'What is Notion?',
    whatIsNotionContent: 'Notion, launched in 2018, is an all-in-one workspace that combines notes, documents, wikis, databases, and project management. Its block-based editor and flexible database views make it highly customizable. Notion has gained massive popularity among startups and creative teams for its modern interface and versatility.',
    
    whatIsConfluenceTitle: 'What is Confluence?',
    whatIsConfluenceContent: 'Confluence, created by Atlassian in 2004, is a professional team workspace designed for enterprise documentation. It excels at creating structured documentation, technical specs, and knowledge bases. Deep integration with Jira makes it the default choice for software development teams using Atlassian tools.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the cost structure for both platforms:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Side-by-side feature comparison:',
    
    collaborationTitle: 'Collaboration Features',
    collaborationIntro: 'Real-time collaboration and editing capabilities:',
    
    integrationsTitle: 'Integrations',
    integrationsIntro: 'Third-party integrations and ecosystem:',
    
    securityTitle: 'Security & Compliance',
    securityIntro: 'Enterprise security and compliance features:',
    
    whenToUseTitle: 'When to Use Each Tool',
    notionBestFor: 'Use Notion When:',
    confluenceBestFor: 'Use Confluence When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Notion and Confluence serve different audiences effectively. Notion wins for teams wanting flexibility, modern UX, and an all-in-one solution that can replace multiple tools. Confluence remains the enterprise standard for documentation-heavy organizations, especially those invested in the Atlassian ecosystem. The best choice depends on your team size, existing tools, and documentation needs.',
    
    faq1q: 'Can I migrate from Confluence to Notion?',
    faq1a: 'Yes, Notion supports importing Confluence pages via HTML export. However, complex formatting and macros may not transfer perfectly. Plan for manual cleanup and restructuring. For large Confluence instances, consider a phased migration approach.',
    
    faq2q: 'Which is better for technical documentation?',
    faq2a: 'Confluence has better support for technical documentation with features like code blocks with syntax highlighting, draw.io integration, and better version control. Notion can handle technical docs but lacks some advanced features.',
    
    faq3q: 'Does Notion support offline access?',
    faq3a: 'Notion has limited offline support - you can view cached pages but editing requires connectivity. Confluence Data Center offers full offline access. This can be a dealbreaker for teams with unreliable internet.',
    
    faq4q: 'Which has better search functionality?',
    faq4a: 'Confluence has more powerful search with filters, custom fields, and better indexing of large content bases. Notion search has improved but can be slow with large workspaces. For enterprises with massive documentation, Confluence search is superior.',
    
    faq5q: 'Can I use Notion for project management?',
    faq5a: 'Yes, Notion databases with views (Kanban, calendar, timeline) make it excellent for project management. Many teams use Notion as their sole tool for docs and projects. However, it lacks advanced PM features like resource management.',
    
    faq6q: 'How do they handle large files?',
    faq6a: 'Confluence handles attachments better with preview support for many file types. Notion has file size limits (5MB free, unlimited paid) but lacks robust attachment management. For heavy file usage, Confluence is better.',
    
    faq7q: 'Which is better for knowledge base?',
    faq7a: 'Both work well for knowledge bases. Notion offers more visual customization and database views. Confluence provides better structure, templates, and search for large knowledge bases. Choose based on team preference and size.',
    
    faq8q: 'What about customer support?',
    faq8a: 'Confluence offers comprehensive enterprise support with SLAs. Notion support is primarily email-based with community forums. For mission-critical documentation, Confluence enterprise support is more reliable.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Notion vs Confluence：2025年团队文档工具对比',
    intro: 'Notion和Confluence是最受欢迎的团队文档和协作工具中的两个。Notion提供灵活、现代化设计的一体化工作空间，而Confluence提供企业级文档和深度Atlassian集成。本全面对比帮你为团队选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Notion适合初创企业、小团队和想要结合文档、Wiki和数据库的现代化灵活工作空间的公司。Confluence适合大型企业、重度Jira用户和需要高级权限及合规功能的组织。对于2025年大多数初创企业，Notion提供更好的价值和用户体验。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Notion更灵活，支持数据库、视图和可自定义模板',
    takeaway2: 'Confluence与Jira和Atlassian套件集成更优',
    takeaway3: 'Notion有更好的移动应用和离线支持',
    takeaway4: 'Confluence提供更精细的权限和企业合规功能',
    takeaway5: 'Notion更易学习；Confluence学习曲线更陡峭',
    takeaway6: 'Confluence有更好的页面版本控制和历史功能',
    
    whatIsNotionTitle: '什么是Notion？',
    whatIsNotionContent: 'Notion于2018年推出，是一个结合笔记、文档、Wiki、数据库和项目管理的一体化工作空间。其基于块的编辑器和灵活的数据库视图使其高度可定制。Notion因其现代化界面和多功能性在初创企业和创意团队中获得了巨大人气。',
    
    whatIsConfluenceTitle: '什么是Confluence？',
    whatIsConfluenceContent: 'Confluence由Atlassian于2004年创建，是专为企业文档设计的专业团队工作空间。它擅长创建结构化文档、技术规范和知识库。与Jira的深度集成使其成为使用Atlassian工具的软件开发团队的默认选择。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解两个平台的成本结构：',
    
    featuresTitle: '功能对比',
    featuresIntro: '并排功能比较：',
    
    collaborationTitle: '协作功能',
    collaborationIntro: '实时协作和编辑能力：',
    
    integrationsTitle: '集成',
    integrationsIntro: '第三方集成和生态系统：',
    
    securityTitle: '安全与合规',
    securityIntro: '企业安全和合规功能：',
    
    whenToUseTitle: '何时使用每个工具',
    notionBestFor: '使用Notion的场景：',
    confluenceBestFor: '使用Confluence的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Notion和Confluence有效地服务于不同的受众。Notion适合想要灵活性、现代化UX和可替代多个工具的一体化解决方案的团队。Confluence仍然是文档密集型组织的企业标准，特别是那些投资于Atlassian生态系统的组织。最佳选择取决于你的团队规模、现有工具和文档需求。',
    
    faq1q: '可以从Confluence迁移到Notion吗？',
    faq1a: '可以，Notion支持通过HTML导出导入Confluence页面。但复杂格式和宏可能无法完美转移。计划手动清理和重构。对于大型Confluence实例，考虑分阶段迁移方法。',
    
    faq2q: '哪个更适合技术文档？',
    faq2a: 'Confluence对技术文档支持更好，具有语法高亮代码块、draw.io集成和更好的版本控制等功能。Notion可以处理技术文档但缺乏一些高级功能。',
    
    faq3q: 'Notion支持离线访问吗？',
    faq3a: 'Notion离线支持有限 - 你可以查看缓存页面但编辑需要联网。Confluence数据中心版提供完整离线访问。对于网络不可靠的团队，这可能是决定性因素。',
    
    faq4q: '哪个搜索功能更好？',
    faq4a: 'Confluence搜索更强大，具有过滤器、自定义字段和更好的大型内容库索引。Notion搜索已改进但在大型工作空间可能较慢。对于拥有大量文档的企业，Confluence搜索更优。',
    
    faq5q: '可以用Notion做项目管理吗？',
    faq5a: '可以，Notion数据库与视图（看板、日历、时间线）使其非常适合项目管理。许多团队将Notion作为文档和项目的唯一工具。但它缺乏资源管理等高级PM功能。',
    
    faq6q: '大文件处理如何？',
    faq6a: 'Confluence处理附件更好，支持多种文件类型预览。Notion有文件大小限制（免费5MB，付费无限制）但缺乏强大的附件管理。对于重度文件使用，Confluence更好。',
    
    faq7q: '哪个更适合知识库？',
    faq7a: '两者都适合知识库。Notion提供更多视觉自定义和数据库视图。Confluence为大型知识库提供更好的结构、模板和搜索。根据团队偏好和规模选择。',
    
    faq8q: '客户支持如何？',
    faq8a: 'Confluence提供带SLA的全面企业支持。Notion支持主要是基于电子邮件和社区论坛。对于关键任务文档，Confluence企业支持更可靠。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function NotionVsConfluence({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #000', background: 'linear-gradient(135deg, rgba(0,0,0,0.05), rgba(59,130,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.tldrTitle}</h3>
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

      <h2 style={h2Style}>{isZh ? '平台概览' : 'Platform Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsNotionTitle}</h3>
      <p style={pStyle}>{ct.whatIsNotionContent}</p>

      <h3 style={h3Style}>{ct.whatIsConfluenceTitle}</h3>
      <p style={pStyle}>{ct.whatIsConfluenceContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '定价项目' : 'Pricing Plan'}</th>
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Confluence</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', isZh ? '个人无限，团队限制' : 'Personal unlimited, team limited', '10 users free'],
              [isZh ? '标准版' : 'Standard Plan', '$10/user/month', '$5.75/user/month'],
              [isZh ? '高级版' : 'Premium Plan', '$18/user/month', '$11/user/month'],
              [isZh ? '企业版' : 'Enterprise', isZh ? '联系销售' : 'Contact sales', isZh ? '联系销售' : 'Contact sales'],
              [isZh ? '存储' : 'Storage', isZh ? '无限（付费）' : 'Unlimited (paid)', '250GB - Unlimited'],
              [isZh ? '访客访问' : 'Guest Access', '✓ Free', isZh ? '需付费' : 'Paid feature'],
              [isZh ? '自托管' : 'Self-hosted', '✗', '✓ Data Center'],
            ].map(([feature, notion, confluence], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{notion}</td>
                <td style={tdStyle}>{confluence}</td>
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
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Confluence</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '富文本编辑器' : 'Rich Text Editor', '✓ Block-based', '✓ Traditional'],
              [isZh ? '数据库/表格' : 'Databases/Tables', '✓ Advanced views', isZh ? '基本表格' : 'Basic tables'],
              [isZh ? '模板系统' : 'Template System', '✓ Extensive', '✓ Enterprise-focused'],
              [isZh ? '版本历史' : 'Version History', '30 days - Unlimited', isZh ? '无限' : 'Unlimited'],
              [isZh ? '页面层级' : 'Page Hierarchy', '✓ Unlimited', '✓ Unlimited'],
              [isZh ? '实时协作' : 'Real-time Collab', '✓', '✓'],
              [isZh ? '评论/批注' : 'Comments/Annotations', '✓', '✓ Advanced'],
              [isZh ? 'AI功能' : 'AI Features', '✓ Notion AI ($10)', '✓ Atlassian Intelligence'],
              [isZh ? '移动应用' : 'Mobile Apps', '✓ Excellent', '✓ Good'],
              [isZh ? '离线支持' : 'Offline Support', isZh ? '有限' : 'Limited', '✓ Data Center'],
            ].map(([feature, notion, confluence], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{notion}</td>
                <td style={tdStyle}>{confluence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.integrationsTitle}</h2>
      <p style={pStyle}>{ct.integrationsIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '集成' : 'Integration'}</th>
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Confluence</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Jira', isZh ? '基本' : 'Basic', '✓ Deep'],
              ['Slack', '✓', '✓'],
              ['GitHub', '✓', '✓'],
              ['Figma', '✓', '✓'],
              ['Google Drive', '✓', '✓'],
              ['Microsoft 365', isZh ? '有限' : 'Limited', '✓'],
              ['Zapier', '✓', '✓'],
              ['API', '✓ Public API', '✓ REST API'],
              [isZh ? '市场应用' : 'Marketplace Apps', '100+', '3000+'],
            ].map(([integration, notion, confluence], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{integration}</td>
                <td style={tdStyle}>{notion}</td>
                <td style={tdStyle}>{confluence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #000' }}>
          <strong style={{ color: '#000' }}>Notion</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'SOC 2 Type II认证，数据静态和传输加密。企业版提供SSO、SCIM、高级审核日志。但无自托管选项。' : 'SOC 2 Type II certified, data encrypted at rest and in transit. Enterprise offers SSO, SCIM, advanced audit logs. No self-hosting option.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #0052cc' }}>
          <strong style={{ color: '#0052cc' }}>Confluence</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'SOC 2、SOC 3、ISO 27001、FedRAMP认证。数据中心版支持自托管。企业级权限、数据驻留、合规报告。' : 'SOC 2, SOC 3, ISO 27001, FedRAMP certified. Data Center supports self-hosting. Enterprise permissions, data residency, compliance reporting.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.notionBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '初创企业和小团队' : 'Startups and small teams'}</li>
            <li>{isZh ? '需要灵活性的团队' : 'Teams needing flexibility'}</li>
            <li>{isZh ? '一体化工作空间需求' : 'All-in-one workspace needs'}</li>
            <li>{isZh ? '创意和设计团队' : 'Creative and design teams'}</li>
            <li>{isZh ? '轻量项目管理' : 'Light project management'}</li>
            <li>{isZh ? '个人知识管理' : 'Personal knowledge management'}</li>
            <li>{isZh ? '预算有限的团队' : 'Budget-conscious teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #0052cc' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#0052cc' }}>{ct.confluenceBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型企业' : 'Large enterprises'}</li>
            <li>{isZh ? 'Jira/Atlassian用户' : 'Jira/Atlassian users'}</li>
            <li>{isZh ? '严格合规要求' : 'Strict compliance needs'}</li>
            <li>{isZh ? '软件开发团队' : 'Software development teams'}</li>
            <li>{isZh ? '技术文档密集' : 'Technical documentation heavy'}</li>
            <li>{isZh ? '需要自托管' : 'Self-hosting required'}</li>
            <li>{isZh ? '复杂权限结构' : 'Complex permission structures'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(0,0,0,0.05), rgba(0,82,204,0.1))', borderRadius: 12, border: '1px solid rgba(0,0,0,0.2)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> •{' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> •{' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
