'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Notion vs Obsidian: Note-Taking App Comparison for Developers',
    intro: 'Notion and Obsidian represent two different philosophies in note-taking and knowledge management. Notion is a cloud-based collaborative workspace, while Obsidian is a local-first markdown editor with powerful linking capabilities. This comparison helps developers choose the right tool for their workflow.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Notion excels at team collaboration, databases, and all-in-one workspace features. Obsidian wins for personal knowledge management, privacy, and markdown purity. For team projects and documentation, choose Notion. For personal notes and Zettelkasten method, choose Obsidian.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Notion is cloud-based; Obsidian stores files locally as plain markdown',
    takeaway2: 'Notion has superior collaboration and database features',
    takeaway3: 'Obsidian offers better linking, graph view, and plugin ecosystem',
    takeaway4: 'Notion has monthly subscription; Obsidian is free for personal use',
    takeaway5: 'Obsidian is faster and works offline; Notion requires internet',
    takeaway6: 'Both support markdown, but Obsidian is markdown-native',
    
    whatIsNotionTitle: 'What is Notion?',
    whatIsNotionContent: 'Notion is an all-in-one workspace launched in 2016. It combines notes, databases, kanban boards, wikis, calendars, and reminders. Built on a block-based architecture, everything in Notion is a block that can be moved, nested, and transformed. It is designed for both personal and team use with real-time collaboration.',
    
    whatIsObsidianTitle: 'What is Obsidian?',
    whatIsObsidianContent: 'Obsidian is a local-first note-taking app launched in 2020. It focuses on linking ideas through bidirectional links and visualizes connections with a graph view. Built on plain markdown files stored locally, it emphasizes data ownership, privacy, and longevity. Its plugin system allows extensive customization.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the cost structure for both tools:',
    
    storageTitle: 'Data Storage & Privacy',
    storageIntro: 'How each tool handles your data:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed comparison of core capabilities:',
    
    collaborationTitle: 'Collaboration Features',
    collaborationIntro: 'Team and sharing capabilities:',
    
    linkingTitle: 'Note Linking & Knowledge Management',
    linkingIntro: 'How each tool connects ideas:',
    
    developerFeaturesTitle: 'Developer-Specific Features',
    developerFeaturesIntro: 'Features relevant to software developers:',
    
    performanceTitle: 'Performance & Offline Access',
    performanceIntro: 'Speed and offline capabilities:',
    
    extensibilityTitle: 'Extensibility',
    extensibilityIntro: 'Customization and integration options:',
    
    whenToUseTitle: 'When to Use Each Tool',
    notionBestFor: 'Use Notion When:',
    obsidianBestFor: 'Use Obsidian When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Notion and Obsidian serve different purposes. Notion is ideal for teams needing a collaborative workspace with databases, project management, and document sharing. Obsidian is perfect for individuals building a personal knowledge base, valuing privacy, and wanting complete data ownership. Many developers use both: Notion for team documentation and project management, Obsidian for personal learning notes and research.',
    
    faq1q: 'Can I use both Notion and Obsidian together?',
    faq1a: 'Yes, many developers use both. Notion for team collaboration and project management, Obsidian for personal knowledge management and research. You can export from one to the other, though some formatting may need adjustment.',
    
    faq2q: 'Is Obsidian completely free?',
    faq2a: 'Obsidian is free for personal use with all core features. Paid plans include Sync (4/month) for cloud sync across devices, Publish (8/month) for publishing notes as a website, and Catalyst (one-time) for early access to new versions. The free version is fully functional for local use.',
    
    faq3q: 'Can Notion work offline?',
    faq3a: 'Notion has limited offline support. It caches recently viewed pages for offline access, but you cannot create new pages or edit extensively without internet. Changes sync when back online. For reliable offline access, Obsidian is the better choice.',
    
    faq4q: 'Which is better for code snippets?',
    faq4a: 'Both support code blocks with syntax highlighting. Notion offers inline code and better visual formatting. Obsidian uses standard markdown code blocks and integrates well with external tools. For heavy code documentation, both work well, but Obsidian integrates better with developer workflows.',
    
    faq5q: 'Can I migrate from Notion to Obsidian?',
    faq5a: 'Yes, you can export Notion pages as markdown and import them into Obsidian. However, Notion databases do not translate directly. You may need to restructure some content. The Obsidian community provides migration scripts and guides.',
    
    faq6q: 'Is Notion secure for sensitive information?',
    faq6a: 'Notion encrypts data in transit and at rest, but does not offer end-to-end encryption. For highly sensitive information, Obsidian local storage is more secure. Notion is suitable for most business documentation but not for passwords or highly confidential data.',
    
    faq7q: 'Which has better search functionality?',
    faq7a: 'Both have good search. Notion offers database-style filtering and saved searches. Obsidian has fast full-text search with regex support via plugins. For large knowledge bases, Obsidian search is typically faster due to local processing.',
    
    faq8q: 'Can I publish notes as a website?',
    faq8a: 'Both support publishing. Notion allows publishing any page as a public website instantly. Obsidian Publish is a paid add-on that creates a website from your vault. For quick public sharing, Notion is easier. For full control and customization, Obsidian Publish offers more flexibility.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Notion vs Obsidian：开发者笔记应用对比',
    intro: 'Notion和Obsidian代表了笔记和知识管理的两种不同理念。Notion是基于云的协作工作空间，而Obsidian是本地优先的Markdown编辑器，具有强大的链接功能。本对比帮助开发者为其工作流程选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Notion在团队协作、数据库和一体化工作空间功能方面表现出色。Obsidian在个人知识管理、隐私和Markdown纯粹性方面胜出。对于团队项目和文档，选择Notion。对于个人笔记和卡片盒笔记法，选择Obsidian。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Notion基于云端；Obsidian将文件以纯Markdown存储在本地',
    takeaway2: 'Notion拥有更优越的协作和数据库功能',
    takeaway3: 'Obsidian提供更好的链接、图谱视图和插件生态系统',
    takeaway4: 'Notion需要月度订阅；Obsidian个人使用免费',
    takeaway5: 'Obsidian更快且可离线工作；Notion需要网络',
    takeaway6: '两者都支持Markdown，但Obsidian是Markdown原生',
    
    whatIsNotionTitle: '什么是Notion？',
    whatIsNotionContent: 'Notion是2016年推出的一体化工作空间。它结合了笔记、数据库、看板、维基、日历和提醒。基于块架构构建，Notion中的一切都是可以移动、嵌套和转换的块。它专为个人和团队使用设计，支持实时协作。',
    
    whatIsObsidianTitle: '什么是Obsidian？',
    whatIsObsidianContent: 'Obsidian是2020年推出的本地优先笔记应用。它专注于通过双向链接连接想法，并通过图谱视图可视化连接。基于本地存储的纯Markdown文件构建，强调数据所有权、隐私和持久性。其插件系统允许广泛定制。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解两个工具的成本结构：',
    
    storageTitle: '数据存储与隐私',
    storageIntro: '每个工具如何处理你的数据：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心能力详细对比：',
    
    collaborationTitle: '协作功能',
    collaborationIntro: '团队和共享能力：',
    
    linkingTitle: '笔记链接与知识管理',
    linkingIntro: '每个工具如何连接想法：',
    
    developerFeaturesTitle: '开发者特定功能',
    developerFeaturesIntro: '与软件开发者相关的功能：',
    
    performanceTitle: '性能与离线访问',
    performanceIntro: '速度和离线能力：',
    
    extensibilityTitle: '可扩展性',
    extensibilityIntro: '定制和集成选项：',
    
    whenToUseTitle: '何时使用每个工具',
    notionBestFor: '使用Notion的场景：',
    obsidianBestFor: '使用Obsidian的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Notion和Obsidian服务于不同目的。Notion非常适合需要协作工作空间、数据库、项目管理和文档共享的团队。Obsidian非常适合构建个人知识库、重视隐私并希望完全拥有数据的个人。许多开发者同时使用两者：Notion用于团队文档和项目管理，Obsidian用于个人学习笔记和研究。',
    
    faq1q: '我可以同时使用Notion和Obsidian吗？',
    faq1a: '可以，许多开发者两者都用。Notion用于团队协作和项目管理，Obsidian用于个人知识管理和研究。你可以从一个导出到另一个，尽管某些格式可能需要调整。',
    
    faq2q: 'Obsidian完全免费吗？',
    faq2a: 'Obsidian个人使用包含所有核心功能是免费的。付费计划包括Sync（4美元/月）用于跨设备云同步，Publish（8美元/月）用于将笔记发布为网站，以及Catalyst（一次性付费）用于抢先体验新版本。免费版本对于本地使用功能完整。',
    
    faq3q: 'Notion可以离线工作吗？',
    faq3a: 'Notion有有限的离线支持。它会缓存最近查看的页面以供离线访问，但如果没有网络，你无法创建新页面或进行大量编辑。重新联网时更改会同步。对于可靠的离线访问，Obsidian是更好的选择。',
    
    faq4q: '哪个更适合代码片段？',
    faq4a: '两者都支持带语法高亮的代码块。Notion提供内联代码和更好的视觉格式。Obsidian使用标准Markdown代码块，与外部工具集成良好。对于大量代码文档，两者都不错，但Obsidian与开发者工作流程集成更好。',
    
    faq5q: '我可以从Notion迁移到Obsidian吗？',
    faq5a: '可以，你可以将Notion页面导出为Markdown并导入Obsidian。但是，Notion数据库不能直接转换。你可能需要重新组织一些内容。Obsidian社区提供迁移脚本和指南。',
    
    faq6q: 'Notion对敏感信息安全吗？',
    faq6a: 'Notion对传输中和静态数据进行加密，但不提供端到端加密。对于高度敏感的信息，Obsidian本地存储更安全。Notion适合大多数商业文档，但不适合密码或高度机密数据。',
    
    faq7q: '哪个搜索功能更好？',
    faq7a: '两者都有良好的搜索。Notion提供数据库风格的过滤和保存的搜索。Obsidian通过插件支持正则表达式的快速全文搜索。对于大型知识库，由于本地处理，Obsidian搜索通常更快。',
    
    faq8q: '我可以将笔记发布为网站吗？',
    faq8a: '两者都支持发布。Notion允许即时将任何页面发布为公共网站。Obsidian Publish是一个付费附加功能，可以从你的vault创建网站。对于快速公开分享，Notion更容易。对于完全控制和定制，Obsidian Publish提供更多灵活性。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function NotionVsObsidian({ lang }: { lang: string }) {
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
      <div style={{ ...boxStyle, borderLeft: '4px solid #7c3aed', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#7c3aed' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsNotionTitle}</h3>
      <p style={pStyle}>{ct.whatIsNotionContent}</p>

      <h3 style={h3Style}>{ct.whatIsObsidianTitle}</h3>
      <p style={pStyle}>{ct.whatIsObsidianContent}</p>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Obsidian</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费版' : 'Free', isZh ? '个人免费' : 'Free for personal', isZh ? '永久免费' : 'Free forever'],
              [isZh ? '个人付费' : 'Personal Paid', '$10/月', isZh ? '免费（本地使用）' : 'Free (local use)'],
              [isZh ? '团队/专业' : 'Team/Plus', '$10-18/用户/月', isZh ? '不适用' : 'N/A'],
              [isZh ? '云同步' : 'Cloud Sync', isZh ? '包含' : 'Included', '$4/月 (可选)'],
              [isZh ? '发布网站' : 'Publish Website', isZh ? '免费公开页面' : 'Free public pages', '$8/月 (可选)'],
              [isZh ? '企业版' : 'Enterprise', isZh ? '联系销售' : 'Contact sales', isZh ? '不适用' : 'N/A'],
            ].map(([plan, notion, obsidian], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{notion}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{obsidian}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Storage & Privacy */}
      <h2 style={h2Style}>{ct.storageTitle}</h2>
      <p style={pStyle}>{ct.storageIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Obsidian</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据存储' : 'Data Storage', isZh ? '云端（Notion服务器）' : 'Cloud (Notion servers)', isZh ? '本地（你的设备）' : 'Local (your device)'],
              [isZh ? '文件格式' : 'File Format', isZh ? '专有块格式' : 'Proprietary blocks', isZh ? '纯Markdown文件' : 'Plain Markdown files'],
              [isZh ? '数据所有权' : 'Data Ownership', isZh ? '托管在Notion' : 'Hosted by Notion', isZh ? '100%自有' : '100% yours'],
              [isZh ? '加密' : 'Encryption', isZh ? '传输和静态加密' : 'Transit & rest encryption', isZh ? '你控制安全' : 'You control security'],
              [isZh ? '离线访问' : 'Offline Access', isZh ? '有限' : 'Limited', isZh ? '完全' : 'Full'],
              [isZh ? '数据导出' : 'Data Export', 'PDF/HTML/Markdown', isZh ? '原始文件（可复制）' : 'Raw files (copyable)'],
              [isZh ? '备份' : 'Backup', isZh ? 'Notion管理' : 'Managed by Notion', isZh ? '你控制（git/云）' : 'You control (git/cloud)'],
            ].map(([aspect, notion, obsidian], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{notion}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{obsidian}</td>
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
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Obsidian</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Markdown支持' : 'Markdown Support', isZh ? '部分' : 'Partial', isZh ? '原生完整' : 'Native full'],
              [isZh ? '数据库/表格' : 'Databases/Tables', '✓✓✓', isZh ? '通过插件' : 'Via plugin'],
              [isZh ? '看板视图' : 'Kanban View', '✓', isZh ? '通过插件' : 'Via plugin'],
              [isZh ? '日历视图' : 'Calendar View', '✓', isZh ? '通过插件' : 'Via plugin'],
              [isZh ? '双向链接' : 'Bidirectional Links', '✓', '✓✓✓'],
              [isZh ? '图谱视图' : 'Graph View', '✗', '✓'],
              [isZh ? '标签系统' : 'Tag System', '✓', '✓'],
              [isZh ? '模板' : 'Templates', '✓', isZh ? '通过插件' : 'Via plugin'],
              [isZh ? '嵌入内容' : 'Embed Content', '✓✓✓', isZh ? '有限' : 'Limited'],
              [isZh ? '移动应用' : 'Mobile Apps', '✓', '✓'],
            ].map(([feature, notion, obsidian], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: notion.includes('✓') ? '#22c55e' : undefined }}>{notion}</td>
                <td style={{ ...tdStyle, color: obsidian.includes('✓') ? '#22c55e' : undefined }}>{obsidian}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Collaboration */}
      <h2 style={h2Style}>{ct.collaborationTitle}</h2>
      <p style={pStyle}>{ct.collaborationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Obsidian</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '实时协作' : 'Real-time Collaboration', '✓', isZh ? '通过Sync（付费）' : 'Via Sync (paid)'],
              [isZh ? '评论' : 'Comments', '✓', isZh ? '通过插件' : 'Via plugin'],
              [isZh ? '权限控制' : 'Permission Control', isZh ? '细粒度' : 'Granular', isZh ? '基本' : 'Basic'],
              [isZh ? '公开分享' : 'Public Sharing', '✓', isZh ? '通过Publish' : 'Via Publish'],
              [isZh ? '工作区' : 'Workspaces', '✓', isZh ? '多个Vault' : 'Multiple vaults'],
              [isZh ? '团队成员' : 'Team Members', isZh ? '无限' : 'Unlimited', isZh ? '不适用' : 'N/A'],
              [isZh ? '版本历史' : 'Version History', '✓ (付费)', isZh ? '通过git/插件' : 'Via git/plugins'],
            ].map(([feature, notion, obsidian], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{notion}</td>
                <td style={tdStyle}>{obsidian}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Linking & Knowledge Management */}
      <h2 style={h2Style}>{ct.linkingTitle}</h2>
      <p style={pStyle}>{ct.linkingIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>Notion</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '页面链接 [[page name]]' : 'Page links [[page name]]'}</li>
            <li>{isZh ? '反向链接面板' : 'Backlinks panel'}</li>
            <li>{isZh ? '关联数据库' : 'Relation databases'}</li>
            <li>{isZh ? '同步块' : 'Synced blocks'}</li>
            <li>{isZh ? '无图谱视图' : 'No graph view'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #7c3aed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#7c3aed' }}>Obsidian</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '双向 [[wiki链接]]' : 'Bidirectional [[wiki links]]'}</li>
            <li>{isZh ? '交互式图谱视图' : 'Interactive graph view'}</li>
            <li>{isZh ? '反向链接（实时）' : 'Backlinks (live)'}</li>
            <li>{isZh ? '标签 #tag' : 'Tags #tag'}</li>
            <li>{isZh ? 'Zettelkasten支持' : 'Zettelkasten support'}</li>
          </ul>
        </div>
      </div>

      {/* Developer Features */}
      <h2 style={h2Style}>{ct.developerFeaturesTitle}</h2>
      <p style={pStyle}>{ct.developerFeaturesIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Obsidian</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '代码块' : 'Code Blocks', '✓ 语法高亮', '✓ 语法高亮'],
              [isZh ? 'API访问' : 'API Access', '✓ 官方API', isZh ? '通过插件' : 'Via plugins'],
              [isZh ? 'Git集成' : 'Git Integration', '✗', '✓ 原生/插件'],
              [isZh ? '本地文件系统' : 'Local File System', '✗', '✓'],
              [isZh ? 'Vim模式' : 'Vim Mode', '✗', '✓'],
              [isZh ? '自定义CSS' : 'Custom CSS', isZh ? '有限' : 'Limited', '✓'],
              [isZh ? '命令面板' : 'Command Palette', '✓', '✓'],
              [isZh ? '快捷键' : 'Keyboard Shortcuts', '✓', '✓ 可自定义'],
              [isZh ? '插件开发' : 'Plugin Development', '✗', '✓ (JS/TS)'],
            ].map(([feature, notion, obsidian], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{notion}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{obsidian}</td>
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
              <th style={thStyle}>Notion</th>
              <th style={thStyle}>Obsidian</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动时间' : 'Startup Time', '3-5秒', '1-2秒'],
              [isZh ? '搜索速度' : 'Search Speed', isZh ? '中等（依赖网络）' : 'Medium (network)', isZh ? '快（本地）' : 'Fast (local)'],
              [isZh ? '离线访问' : 'Offline Access', isZh ? '有限' : 'Limited', isZh ? '完全' : 'Full'],
              [isZh ? '内存使用' : 'Memory Usage', '300-600MB', '100-300MB'],
              [isZh ? '移动应用性能' : 'Mobile Performance', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '大数据集' : 'Large Datasets', isZh ? '可变慢' : 'Can slow down', isZh ? '快速' : 'Fast'],
            ].map(([metric, notion, obsidian], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{notion}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{obsidian}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Extensibility */}
      <h2 style={h2Style}>{ct.extensibilityTitle}</h2>
      <p style={pStyle}>{ct.extensibilityIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>Notion</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '官方API' : 'Official API'}</li>
            <li>{isZh ? 'Notion模板库' : 'Notion template gallery'}</li>
            <li>{isZh ? '第三方集成（Zapier等）' : 'Third-party integrations (Zapier)'}</li>
            <li>{isZh ? '有限定制' : 'Limited customization'}</li>
            <li>{isZh ? '无插件系统' : 'No plugin system'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #7c3aed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#7c3aed' }}>Obsidian</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>1,500+ {isZh ? '社区插件' : 'community plugins'}</li>
            <li>{isZh ? '主题系统' : 'Theme system'}</li>
            <li>{isZh ? '自定义CSS片段' : 'Custom CSS snippets'}</li>
            <li>{isZh ? '插件开发SDK' : 'Plugin development SDK'}</li>
            <li>{isZh ? '完全可定制' : 'Fully customizable'}</li>
          </ul>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.notionBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '团队协作' : 'Team collaboration'}</li>
            <li>{isZh ? '项目管理' : 'Project management'}</li>
            <li>{isZh ? '公司维基' : 'Company wiki'}</li>
            <li>{isZh ? '数据库需求' : 'Database needs'}</li>
            <li>{isZh ? '需要嵌入外部内容' : 'Need embedded content'}</li>
            <li>{isZh ? '非技术团队成员' : 'Non-technical team members'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #7c3aed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#7c3aed' }}>{ct.obsidianBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '个人知识管理' : 'Personal knowledge management'}</li>
            <li>{isZh ? 'Zettelkasten方法' : 'Zettelkasten method'}</li>
            <li>{isZh ? '学习笔记' : 'Learning notes'}</li>
            <li>{isZh ? '需要隐私和数据所有权' : 'Need privacy & data ownership'}</li>
            <li>{isZh ? '离线工作' : 'Offline work'}</li>
            <li>{isZh ? '高度定制需求' : 'High customization needs'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(124,58,237,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/markdown-to-html'} style={{ color: '#7c3aed', textDecoration: 'none' }}>Markdown to HTML</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#7c3aed', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/regex-tester'} style={{ color: '#7c3aed', textDecoration: 'none' }}>Regex Tester</a>
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
