'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Postman vs Insomnia: API Testing Tool Comparison',
    intro: 'Postman and Insomnia are two leading API development and testing platforms. Both help developers design, test, and document APIs, but they differ in approach, features, and pricing. This comparison examines their capabilities for REST, GraphQL, and API workflow management.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Postman for comprehensive API lifecycle management, team collaboration, and extensive integrations. Choose Insomnia for a simpler, more focused experience with excellent GraphQL support and cleaner UI. Postman is more feature-rich; Insomnia is more streamlined.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Postman offers more features and enterprise capabilities',
    takeaway2: 'Insomnia has better native GraphQL support and UX',
    takeaway3: 'Both support REST, GraphQL, gRPC, and WebSockets',
    takeaway4: 'Postman has larger community and more learning resources',
    takeaway5: 'Insomnia is free for individuals, Postman has free tier',
    takeaway6: 'Postman includes mock servers and API monitoring',
    
    whatIsPostmanTitle: 'What is Postman?',
    whatIsPostmanContent: 'Postman is a complete API development platform launched in 2012. Starting as a Chrome extension, it evolved into a full-featured desktop app with API design, testing, documentation, mocking, and monitoring capabilities. Postman serves over 25 million developers and 500,000 organizations worldwide.',
    
    whatIsInsomniaTitle: 'What is Insomnia?',
    whatIsInsomniaContent: 'Insomnia is a cross-platform REST and GraphQL client developed by Kong, launched in 2016. Known for its clean interface and developer-friendly design, it focuses on API testing and debugging. Insomnia was acquired by Kong in 2019 and integrates well with Kong\'s API gateway ecosystem.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core API testing capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'API Request Examples',
    codeExampleIntro: 'How to create and test API requests:',
    
    postmanExampleTitle: 'Postman Collection',
    insomniaExampleTitle: 'Insomnia Workspace',
    
    dataSourceTitle: 'API Protocol Support',
    dataSourceIntro: 'Supported protocols and formats:',
    
    alertingTitle: 'Collaboration Features',
    alertingIntro: 'Team and collaboration capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    postmanBestFor: 'Postman is Best For:',
    insomniaBestFor: 'Insomnia is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Postman and Insomnia both excel at API development but serve different needs. Postman is a comprehensive platform ideal for teams needing full API lifecycle management, collaboration, and enterprise features. Insomnia offers a cleaner, more focused experience that many developers prefer for daily API testing, especially with GraphQL. For individual developers or small teams, Insomnia may be more pleasant to use. For large organizations with complex API workflows, Postman provides more depth.',
    
    faq1q: 'Can I import Postman collections to Insomnia?',
    faq1a: 'Yes, Insomnia can import Postman collections (v2.0 and v2.1 formats). Go to Application > Preferences > Data > Import Data and select your Postman export. Most requests and environments import successfully, though some advanced Postman features may not translate.',
    
    faq2q: 'Which is better for GraphQL?',
    faq2a: 'Insomnia has better native GraphQL support with schema explorer, auto-completion, and query building tools built directly into the interface. Postman supports GraphQL but requires more setup. For GraphQL-heavy workloads, Insomnia has the edge.',
    
    faq3q: 'Is Postman free to use?',
    faq3a: 'Postman offers a generous free tier for individuals and small teams (up to 3 users). The free plan includes most core features but limits collaboration, monitoring, and advanced features. Paid plans start at $12/user/month for teams.',
    
    faq4q: 'Does Insomnia have mock servers?',
    faq4a: 'Insomnia does not have built-in mock servers like Postman. You would need to use external mocking solutions or Kong\'s mock services. Postman includes mock servers as part of its platform.',
    
    faq5q: 'Can I use environment variables in both?',
    faq5a: 'Yes, both tools support environment variables. Postman uses environments and globals with a powerful variable system. Insomnia uses environments and folders with JSONPath support. Both allow dynamic variables in requests.',
    
    faq6q: 'Which has better automation features?',
    faq6a: 'Postman has more comprehensive automation with Newman CLI for CI/CD, visual test builders, collection runners, and scheduled monitors. Insomnia supports CLI testing but has less extensive automation capabilities.',
    
    faq7q: 'How do they handle authentication?',
    faq7a: 'Both support OAuth 1.0/2.0, API keys, Basic Auth, Bearer tokens, and custom auth. Postman has more pre-built auth helpers and supports AWS Signature, Hawk, and others. Insomnia handles common auth well but has fewer built-in options.',
    
    faq8q: 'Can I generate code from requests?',
    faq8a: 'Yes, both generate code snippets in multiple languages. Postman supports 20+ languages including JavaScript, Python, Java, cURL, and Go. Insomnia also generates code but supports fewer languages. Both cover the most common options.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Postman vs Insomnia：API 测试工具对比',
    intro: 'Postman 和 Insomnia 是两个领先的 API 开发和测试平台。两者都帮助开发者设计、测试和文档化 API，但在方法、功能和定价方面有所不同。本比较考察它们在 REST、GraphQL 和 API 工作流管理方面的能力。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 Postman 用于全面的 API 生命周期管理、团队协作和广泛的集成。选择 Insomnia 用于更简单、更专注的体验，具有出色的 GraphQL 支持和更清晰的 UI。Postman 功能更丰富；Insomnia 更精简。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Postman 提供更多功能和企业能力',
    takeaway2: 'Insomnia 有更好的原生 GraphQL 支持和用户体验',
    takeaway3: '两者都支持 REST、GraphQL、gRPC 和 WebSockets',
    takeaway4: 'Postman 有更大的社区和更多学习资源',
    takeaway5: 'Insomnia 对个人免费，Postman 有免费层',
    takeaway6: 'Postman 包含模拟服务器和 API 监控',
    
    whatIsPostmanTitle: '什么是 Postman？',
    whatIsPostmanContent: 'Postman 是一个完整的 API 开发平台，于 2012 年推出。从 Chrome 扩展开始，它发展成为一个功能齐全的桌面应用，具有 API 设计、测试、文档、模拟和监控功能。Postman 服务于全球超过 2500 万开发者和 50 万组织。',
    
    whatIsInsomniaTitle: '什么是 Insomnia？',
    whatIsInsomniaContent: 'Insomnia 是由 Kong 开发的跨平台 REST 和 GraphQL 客户端，于 2016 年推出。以其干净的界面和对开发者友好的设计而闻名，它专注于 API 测试和调试。Insomnia 于 2019 年被 Kong 收购，与 Kong 的 API 网关生态系统良好集成。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心 API 测试能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: 'API 请求示例',
    codeExampleIntro: '如何创建和测试 API 请求：',
    
    postmanExampleTitle: 'Postman 集合',
    insomniaExampleTitle: 'Insomnia 工作区',
    
    dataSourceTitle: 'API 协议支持',
    dataSourceIntro: '支持的协议和格式：',
    
    alertingTitle: '协作功能',
    alertingIntro: '团队和协作能力：',
    
    useCasesTitle: '最佳用例',
    postmanBestFor: 'Postman 最适合：',
    insomniaBestFor: 'Insomnia 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Postman 和 Insomnia 都在 API 开发方面表现出色，但满足不同的需求。Postman 是一个全面的平台，非常适合需要完整 API 生命周期管理、协作和企业功能的团队。Insomnia 提供更干净、更专注的体验，许多开发者更喜欢用于日常 API 测试，特别是 GraphQL。对于个人开发者或小团队，Insomnia 可能更令人愉悦。对于具有复杂 API 工作流的大型组织，Postman 提供更多深度。',
    
    faq1q: '我可以将 Postman 集合导入 Insomnia 吗？',
    faq1a: '是的，Insomnia 可以导入 Postman 集合（v2.0 和 v2.1 格式）。转到 Application > Preferences > Data > Import Data 并选择你的 Postman 导出。大多数请求和环境可以成功导入，尽管一些高级 Postman 功能可能无法转换。',
    
    faq2q: '哪个更适合 GraphQL？',
    faq2a: 'Insomnia 有更好的原生 GraphQL 支持，具有直接内置在界面中的架构探索器、自动补全和查询构建工具。Postman 支持 GraphQL 但需要更多设置。对于重度 GraphQL 工作负载，Insomnia 有优势。',
    
    faq3q: 'Postman 免费使用吗？',
    faq3a: 'Postman 为个人和小团队（最多 3 个用户）提供慷慨的免费层。免费计划包括大多数核心功能，但限制协作、监控和高级功能。付费计划从每用户每月 12 美元开始。',
    
    faq4q: 'Insomnia 有模拟服务器吗？',
    faq4a: 'Insomnia 没有像 Postman 那样的内置模拟服务器。你需要使用外部模拟解决方案或 Kong 的模拟服务。Postman 将模拟服务器作为其平台的一部分。',
    
    faq5q: '我可以在两者中使用环境变量吗？',
    faq5a: '是的，两个工具都支持环境变量。Postman 使用环境和全局变量，具有强大的变量系统。Insomnia 使用环境和文件夹，支持 JSONPath。两者都允许在请求中使用动态变量。',
    
    faq6q: '哪个有更好的自动化功能？',
    faq6a: 'Postman 有更全面的自动化，包括用于 CI/CD 的 Newman CLI、可视化测试构建器、集合运行器和计划监控。Insomnia 支持 CLI 测试但自动化功能不那么广泛。',
    
    faq7q: '它们如何处理认证？',
    faq7a: '两者都支持 OAuth 1.0/2.0、API 密钥、Basic Auth、Bearer 令牌和自定义认证。Postman 有更多预构建的认证助手，支持 AWS Signature、Hawk 等。Insomnia 处理常见认证良好，但内置选项较少。',
    
    faq8q: '我可以从请求生成代码吗？',
    faq8a: '是的，两者都生成多种语言的代码片段。Postman 支持 20 多种语言，包括 JavaScript、Python、Java、cURL 和 Go。Insomnia 也生成代码但支持较少的语言。两者都涵盖最常见的选项。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PostmanVsInsomnia({ lang }: { lang: string }) {
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

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsPostmanTitle}</h3>
      <p style={pStyle}>{ct.whatIsPostmanContent}</p>

      <h3 style={h3Style}>{ct.whatIsInsomniaTitle}</h3>
      <p style={pStyle}>{ct.whatIsInsomniaContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Postman</th>
              <th style={thStyle}>Insomnia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '界面设计' : 'Interface Design', isZh ? '功能丰富、复杂' : 'Feature-rich, complex', isZh ? '简洁、开发者友好' : 'Clean, developer-friendly'],
              [isZh ? 'GraphQL 支持' : 'GraphQL Support', isZh ? '支持' : 'Supported', isZh ? '原生优秀支持' : 'Native excellent support'],
              [isZh ? '团队协作' : 'Team Collaboration', isZh ? '强大' : 'Powerful', isZh ? '基础' : 'Basic'],
              [isZh ? 'API 文档' : 'API Documentation', isZh ? '自动生成' : 'Auto-generated', isZh ? '基础' : 'Basic'],
              [isZh ? '模拟服务器' : 'Mock Servers', isZh ? '内置' : 'Built-in', isZh ? '无' : 'No'],
              [isZh ? '监控' : 'Monitoring', isZh ? '计划监控' : 'Scheduled monitoring', isZh ? '无' : 'No'],
              [isZh ? 'CLI 工具' : 'CLI Tool', 'Newman', 'Insomnia CLI'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '中等' : 'Medium', isZh ? '低' : 'Low'],
            ].map(([feature, postman, insomnia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{postman}</td>
                <td style={tdStyle}>{insomnia}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Postman</th>
              <th style={thStyle}>Insomnia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '环境变量' : 'Environment Variables', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '请求历史' : 'Request History', isZh ? '完整' : 'Full', isZh ? '支持' : 'Supported'],
              [isZh ? '代码生成' : 'Code Generation', '20+ languages', '15+ languages'],
              [isZh ? '测试脚本' : 'Test Scripts', 'JavaScript (Chai)', 'JavaScript'],
              [isZh ? '集合运行' : 'Collection Runner', isZh ? '可视化 + CLI' : 'Visual + CLI', isZh ? '基础' : 'Basic'],
              [isZh ? '工作区' : 'Workspaces', isZh ? '团队 + 个人' : 'Team + Personal', isZh ? '支持' : 'Supported'],
              [isZh ? '插件/扩展' : 'Plugins/Extensions', isZh ? 'Postman API' : 'Postman API', isZh ? '插件系统' : 'Plugin system'],
              [isZh ? '导入/导出' : 'Import/Export', 'Postman, OpenAPI, RAML', 'Insomnia, Postman, OpenAPI'],
            ].map(([cap, postman, insomnia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{postman}</td>
                <td style={tdStyle}>{insomnia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ff6c37' }}>{ct.postmanExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Postman Collection JSON Example\n{\n  "info": {\n    "name": "User API",\n    "description": "User management endpoints",\n    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/"\n  },\n  "item": [\n    {\n      "name": "Get Users",\n      "request": {\n        "method": "GET",\n        "header": [\n          {\n            "key": "Authorization",\n            "value": "Bearer {{api_token}}"\n          }\n        ],\n        "url": {\n          "raw": "{{base_url}}/api/users?page=1",\n          "host": ["{{base_url}}"],\n          "path": ["api", "users"],\n          "query": [\n            {\n              "key": "page",\n              "value": "1"\n            }\n          ]\n        }\n      },\n      "response": []\n    },\n    {\n      "name": "Create User",\n      "request": {\n        "method": "POST",\n        "header": [\n          {\n            "key": "Content-Type",\n            "value": "application/json"\n          }\n        ],\n        "body": {\n          "mode": "raw",\n          "raw": "{\\n  \\"name\\": \\"John Doe\\",\\n  \\"email\\": \\"john@example.com\\",\\n  \\"role\\": \\"admin\\"\\n}"\n        },\n        "url": {\n          "raw": "{{base_url}}/api/users",\n          "host": ["{{base_url}}"],\n          "path": ["api", "users"]\n        }\n      }\n    }\n  ],\n  "variable": [\n    {\n      "key": "base_url",\n      "value": "https://api.example.com"\n    },\n    {\n      "key": "api_token",\n      "value": "your-token-here"\n    }\n  ]\n}\n\n// Postman Test Script (Tests tab)\npm.test("Status code is 200", function () {\n  pm.response.to.have.status(200);\n});\n\npm.test("Response has users array", function () {\n  var jsonData = pm.response.json();\n  pm.expect(jsonData).to.have.property("users");\n  pm.expect(jsonData.users).to.be.an("array");\n});'}</code></pre>

      <h3 style={{ ...h3Style, color: '#5849be' }}>{ct.insomniaExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Insomnia Export (YAML-like structure)\n// insomnia-workspace.yaml\n\n_type: export\n__export_format: 4\n__export_date: 2024-01-15T00:00:00.000Z\n__export_source: insomnia.desktop.app:v8.0.0\nresources:\n  - _id: req_wrk_123\n    parentId: wrk_456\n    modified: 1705276800000\n    created: 1705276800000\n    url: "{{ base_url }}/api/users"\n    name: Get Users\n    description: ""\n    method: GET\n    body: {}\n    parameters:\n      - name: page\n        value: "1"\n    headers:\n      - name: Authorization\n        value: Bearer {{ api_token }}\n    authentication: {}\n    metaSortKey: -1705276800000\n    isPrivate: false\n    settingStoreCookies: true\n    settingSendCookies: true\n    settingDisableRenderRequestBody: false\n\n  - _id: req_wrk_789\n    parentId: wrk_456\n    modified: 1705276900000\n    created: 1705276900000\n    url: "{{ base_url }}/api/users"\n    name: Create User\n    method: POST\n    body:\n      mimeType: application/json\n      text: |\n        {\n          "name": "John Doe",\n          "email": "john@example.com",\n          "role": "admin"\n        }\n    headers:\n      - name: Content-Type\n        value: application/json\n    \nenvironments:\n  - name: Development\n    data:\n      base_url: https://api.example.com\n      api_token: your-dev-token\n  - name: Production  \n    data:\n      base_url: https://api.prod.example.com\n      api_token: your-prod-token'}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ff6c37' }}>
          <strong style={{ color: '#ff6c37' }}>Postman Protocol Support</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'REST、GraphQL、gRPC、WebSocket、SOAP、Webhook。支持 OpenAPI、RAML、AsyncAPI 导入。内置 API 设计工具，可视化编辑器。' : 'REST, GraphQL, gRPC, WebSocket, SOAP, Webhook. OpenAPI, RAML, AsyncAPI import support. Built-in API design tools with visual editor.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #5849be' }}>
          <strong style={{ color: '#5849be' }}>Insomnia Protocol Support</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'REST、GraphQL（优秀支持）、gRPC、WebSocket、MQTT。支持 OpenAPI 导入。GraphQL 架构探索器，自动补全。' : 'REST, GraphQL (excellent support), gRPC, WebSocket, MQTT. OpenAPI import support. GraphQL schema explorer with auto-completion.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '协作功能' : 'Collaboration Feature'}</th>
              <th style={thStyle}>Postman</th>
              <th style={thStyle}>Insomnia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '团队工作区' : 'Team Workspaces', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '版本控制' : 'Version Control', 'Git-like sync', isZh ? 'Git 集成' : 'Git integration'],
              [isZh ? '实时协作' : 'Real-time Collab', isZh ? '支持' : 'Supported', isZh ? '无' : 'No'],
              [isZh ? '权限管理' : 'Permission Mgmt', isZh ? '细粒度' : 'Fine-grained', isZh ? '基础' : 'Basic'],
              [isZh ? 'API 文档发布' : 'API Doc Publishing', isZh ? '公开文档' : 'Public docs', isZh ? '无' : 'No'],
              [isZh ? '评论和反馈' : 'Comments/Feedback', isZh ? '支持' : 'Supported', isZh ? '无' : 'No'],
            ].map(([cat, postman, insomnia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{postman}</td>
                <td style={tdStyle}>{insomnia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff6c37' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff6c37' }}>{ct.postmanBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型开发团队' : 'Large development teams'}</li>
            <li>{isZh ? '完整 API 生命周期' : 'Full API lifecycle management'}</li>
            <li>{isZh ? '需要 API 文档发布' : 'Need API documentation publishing'}</li>
            <li>{isZh ? '自动化测试和监控' : 'Automated testing and monitoring'}</li>
            <li>{isZh ? '企业级需求' : 'Enterprise requirements'}</li>
            <li>{isZh ? '需要 Mock 服务器' : 'Need mock servers'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #5849be' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#5849be' }}>{ct.insomniaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '个人开发者' : 'Individual developers'}</li>
            <li>{isZh ? 'GraphQL 重度用户' : 'GraphQL-heavy users'}</li>
            <li>{isZh ? '喜欢简洁界面' : 'Prefer clean interface'}</li>
            <li>{isZh ? '小型团队' : 'Small teams'}</li>
            <li>{isZh ? '快速 API 测试' : 'Quick API testing'}</li>
            <li>{isZh ? 'Kong 生态用户' : 'Kong ecosystem users'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/url-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Encoder</a>
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
