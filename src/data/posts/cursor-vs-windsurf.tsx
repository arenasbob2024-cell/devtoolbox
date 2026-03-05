'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cursor vs Windsurf: AI Code Editor Comparison',
    intro: 'Cursor and Windsurf represent the new generation of AI-powered code editors. Both leverage large language models to assist developers, but take different approaches to AI integration, pricing, and workflow. This comparison examines their capabilities, AI features, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Cursor for deep IDE integration with VS Code compatibility, Claude/GPT-4 support, and comprehensive AI assistance. Choose Windsurf for a fresh AI-first approach with unique conversation UI, team collaboration features, and simplified workflow. Both offer powerful AI coding assistance but with different philosophies.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Cursor is built on VS Code with full extension compatibility',
    takeaway2: 'Windsurf offers a native AI-first architecture from scratch',
    takeaway3: 'Both support Claude 3.5 Sonnet and GPT-4 models',
    takeaway4: 'Cursor has more mature refactoring and codebase understanding',
    takeaway5: 'Windsurf provides unique conversation-based AI interaction',
    takeaway6: 'Pricing models differ: Cursor per-seat vs Windsurf credit-based',
    
    whatIsCursorTitle: 'What is Cursor?',
    whatIsCursorContent: 'Cursor is an AI-powered code editor built on VS Code foundation, developed by Anysphere. Released in 2023, it provides intelligent code completion, multi-file refactoring, natural language code generation, and deep codebase understanding. Cursor maintains full compatibility with VS Code extensions while adding powerful AI features.',
    
    whatIsWindsurfTitle: 'What is Windsurf?',
    whatIsWindsurfContent: 'Windsurf is an AI-first code editor developed by Codeium, launched in 2024. Built from scratch with AI at its core, it features a unique conversation-driven interface, real-time collaboration tools, and seamless AI integration throughout the development workflow. Windsurf emphasizes simplicity and team productivity.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'AI Integration Examples',
    codeExampleIntro: 'How each editor handles AI assistance:',
    
    cursorExampleTitle: 'Cursor AI Commands',
    windsurfExampleTitle: 'Windsurf AI Commands',
    
    dataSourceTitle: 'AI Model Support',
    dataSourceIntro: 'Supported models and integrations:',
    
    alertingTitle: 'Development Workflow',
    alertingIntro: 'Workflow and productivity features:',
    
    useCasesTitle: 'Best Use Cases',
    cursorBestFor: 'Cursor is Best For:',
    windsurfBestFor: 'Windsurf is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Cursor and Windsurf represent two different philosophies in AI-assisted development. Cursor builds upon VS Code\'s ecosystem, making it ideal for developers who want AI enhancement while keeping their familiar workflow and extensions. Windsurf takes a fresh approach with AI at its core, offering a more integrated conversation experience. Choose Cursor if you need VS Code compatibility and mature AI features; choose Windsurf for an AI-first experience with simpler onboarding.',
    
    faq1q: 'Can I use my VS Code extensions in Cursor?',
    faq1a: 'Yes, Cursor is built on VS Code and supports the vast majority of VS Code extensions. You can install extensions from the VS Code marketplace directly. However, some extensions may conflict with Cursor\'s AI features.',
    
    faq2q: 'Which has better AI model support?',
    faq2a: 'Both support Claude 3.5 Sonnet and GPT-4. Cursor also supports GPT-4o and Claude 3 Opus. Windsurf integrates with Codeium\'s models and third-party providers. For model variety, they are roughly equivalent.',
    
    faq3q: 'How do their pricing models compare?',
    faq3a: 'Cursor offers a Pro plan at $20/month per user with unlimited AI usage. Windsurf uses a credit-based system with free tier credits and paid plans. For heavy AI usage, Cursor\'s flat rate may be more cost-effective.',
    
    faq4q: 'Which is better for team collaboration?',
    faq4a: 'Windsurf has built-in real-time collaboration features similar to Google Docs. Cursor relies on VS Code\'s Live Share extension. For native collaboration, Windsurf has the edge.',
    
    faq5q: 'Can I migrate from VS Code easily?',
    faq5a: 'Yes, both editors support easy migration. Cursor imports your VS Code settings automatically. Windsurf also supports VS Code keybindings and can import some settings. The transition is smooth for both.',
    
    faq6q: 'Which has better code completion?',
    faq6a: 'Both offer excellent AI code completion. Cursor\'s Tab autocomplete is more mature and contextually aware across multiple files. Windsurf\'s completion is newer but improving rapidly. For now, Cursor has a slight edge.',
    
    faq7q: 'Do they work offline?',
    faq7a: 'AI features require internet connectivity in both editors. Basic editing works offline, but AI completion, chat, and refactoring need cloud access. Neither offers fully offline AI capabilities yet.',
    
    faq8q: 'Which is better for large codebases?',
    faq8a: 'Cursor has better multi-file understanding and can reason across large codebases more effectively. It indexes your codebase for contextual AI assistance. Windsurf is improving but Cursor currently handles large projects better.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Cursor vs Windsurf：AI 代码编辑器对比',
    intro: 'Cursor 和 Windsurf 代表了新一代 AI 驱动的代码编辑器。两者都利用大语言模型辅助开发人员，但在 AI 集成、定价和工作流程方面采用了不同的方法。本比较考察它们的功能、AI 特性和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 Cursor 可以获得与 VS Code 兼容的深度 IDE 集成、Claude/GPT-4 支持和全面的 AI 辅助。选择 Windsurf 可以获得全新的 AI 优先方法、独特的对话 UI、团队协作功能和简化工作流程。两者都提供强大的 AI 编码辅助，但理念不同。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Cursor 基于 VS Code 构建，完全兼容扩展',
    takeaway2: 'Windsurf 提供从零开始的原生 AI 优先架构',
    takeaway3: '两者都支持 Claude 3.5 Sonnet 和 GPT-4 模型',
    takeaway4: 'Cursor 在重构和代码库理解方面更成熟',
    takeaway5: 'Windsurf 提供独特的基于对话的 AI 交互',
    takeaway6: '定价模式不同：Cursor 按席位 vs Windsurf 基于积分',
    
    whatIsCursorTitle: '什么是 Cursor？',
    whatIsCursorContent: 'Cursor 是由 Anysphere 开发的基于 VS Code 基础的 AI 驱动代码编辑器。2023 年发布，它提供智能代码补全、多文件重构、自然语言代码生成和深度代码库理解。Cursor 保持与 VS Code 扩展的完全兼容性，同时添加强大的 AI 功能。',
    
    whatIsWindsurfTitle: '什么是 Windsurf？',
    whatIsWindsurfContent: 'Windsurf 是由 Codeium 开发的 AI 优先代码编辑器，于 2024 年推出。从头开始以 AI 为核心构建，它具有独特的对话驱动界面、实时协作工具和贯穿整个开发工作流程的无缝 AI 集成。Windsurf 强调简单性和团队生产力。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: 'AI 集成示例',
    codeExampleIntro: '每个编辑器如何处理 AI 辅助：',
    
    cursorExampleTitle: 'Cursor AI 命令',
    windsurfExampleTitle: 'Windsurf AI 命令',
    
    dataSourceTitle: 'AI 模型支持',
    dataSourceIntro: '支持的模型和集成：',
    
    alertingTitle: '开发工作流程',
    alertingIntro: '工作流程和生产力功能：',
    
    useCasesTitle: '最佳用例',
    cursorBestFor: 'Cursor 最适合：',
    windsurfBestFor: 'Windsurf 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Cursor 和 Windsurf 代表了 AI 辅助开发的两种不同理念。Cursor 基于 VS Code 生态系统构建，非常适合希望在保持熟悉工作流程和扩展的同时获得 AI 增强的开发人员。Windsurf 采用了全新的方法，以 AI 为核心，提供更集成的对话体验。如果你需要 VS Code 兼容性和成熟的 AI 功能，选择 Cursor；如果你想要 AI 优先的体验和更简单的上手流程，选择 Windsurf。',
    
    faq1q: '我可以在 Cursor 中使用我的 VS Code 扩展吗？',
    faq1a: '是的，Cursor 基于 VS Code 构建，支持绝大多数 VS Code 扩展。你可以直接从 VS Code 市场安装扩展。但是，某些扩展可能与 Cursor 的 AI 功能冲突。',
    
    faq2q: '哪个有更好的 AI 模型支持？',
    faq2a: '两者都支持 Claude 3.5 Sonnet 和 GPT-4。Cursor 还支持 GPT-4o 和 Claude 3 Opus。Windsurf 与 Codeium 的模型和第三方提供商集成。在模型多样性方面，它们大致相当。',
    
    faq3q: '它们的定价模式如何比较？',
    faq3a: 'Cursor 提供每月 20 美元的 Pro 计划，每位用户无限 AI 使用。Windsurf 使用基于积分的系统，有免费层积分和付费计划。对于重度 AI 使用，Cursor 的固定费率可能更具成本效益。',
    
    faq4q: '哪个更适合团队协作？',
    faq4a: 'Windsurf 具有类似 Google Docs 的内置实时协作功能。Cursor 依赖 VS Code 的 Live Share 扩展。对于原生协作，Windsurf 有优势。',
    
    faq5q: '我可以轻松从 VS Code 迁移吗？',
    faq5a: '是的，两个编辑器都支持轻松迁移。Cursor 自动导入你的 VS Code 设置。Windsurf 也支持 VS Code 键绑定并可以导入某些设置。两者的过渡都很顺利。',
    
    faq6q: '哪个有更好的代码补全？',
    faq6a: '两者都提供出色的 AI 代码补全。Cursor 的 Tab 自动补全更成熟，在多个文件之间更具上下文意识。Windsurf 的补全较新但正在快速改进。目前，Cursor 略有优势。',
    
    faq7q: '它们可以离线工作吗？',
    faq7a: '两个编辑器中的 AI 功能都需要互联网连接。基本编辑可以离线工作，但 AI 补全、聊天和重构需要云访问。两者都还没有提供完全离线的 AI 功能。',
    
    faq8q: '哪个更适合大型代码库？',
    faq8a: 'Cursor 有更好的多文件理解能力，可以更有效地跨大型代码库进行推理。它索引你的代码库以进行上下文 AI 辅助。Windsurf 正在改进，但 Cursor 目前更好地处理大型项目。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CursorVsWindsurf({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8q } },
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

      <h3 style={h3Style}>{ct.whatIsCursorTitle}</h3>
      <p style={pStyle}>{ct.whatIsCursorContent}</p>

      <h3 style={h3Style}>{ct.whatIsWindsurfTitle}</h3>
      <p style={pStyle}>{ct.whatIsWindsurfContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Cursor</th>
              <th style={thStyle}>Windsurf</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心架构' : 'Core Architecture', isZh ? 'VS Code 基础' : 'VS Code based', isZh ? '原生 AI 优先' : 'Native AI-first'],
              [isZh ? '扩展支持' : 'Extension Support', isZh ? '完整 VS Code 兼容' : 'Full VS Code compatible', isZh ? '有限支持' : 'Limited support'],
              [isZh ? 'AI 补全' : 'AI Completion', isZh ? 'Tab 自动补全' : 'Tab autocomplete', isZh ? '行内补全' : 'Inline completion'],
              [isZh ? '代码库理解' : 'Codebase Understanding', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '对话界面' : 'Chat Interface', isZh ? '侧边栏聊天' : 'Sidebar chat', isZh ? '集成对话 UI' : 'Integrated chat UI'],
              [isZh ? '协作功能' : 'Collaboration', isZh ? 'Live Share' : 'Live Share', isZh ? '原生实时协作' : 'Native real-time'],
              [isZh ? '多文件重构' : 'Multi-file Refactor', isZh ? '强大' : 'Powerful', isZh ? '基础' : 'Basic'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '低（VS Code 用户）' : 'Low (VS Code users)', isZh ? '中等' : 'Medium'],
            ].map(([feature, cursor, windsurf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{cursor}</td>
                <td style={tdStyle}>{windsurf}</td>
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
              <th style={thStyle}>Cursor</th>
              <th style={thStyle}>Windsurf</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自然语言编辑' : 'Natural Language Edit', isZh ? 'Cmd+K' : 'Cmd+K', isZh ? 'Cmd+I' : 'Cmd+I'],
              [isZh ? '代码解释' : 'Code Explanation', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '代码生成' : 'Code Generation', isZh ? '强大' : 'Powerful', isZh ? '良好' : 'Good'],
              [isZh ? '调试辅助' : 'Debugging Help', isZh ? '集成' : 'Integrated', isZh ? '基础' : 'Basic'],
              [isZh ? 'Git 集成' : 'Git Integration', isZh ? '完整' : 'Full', isZh ? '标准' : 'Standard'],
              [isZh ? '终端集成' : 'Terminal Integration', isZh ? '内置终端' : 'Built-in terminal', isZh ? '内置终端' : 'Built-in terminal'],
              [isZh ? '快捷键' : 'Keyboard Shortcuts', isZh ? 'VS Code 标准' : 'VS Code standard', isZh ? 'VS Code 兼容' : 'VS Code compatible'],
              [isZh ? '多光标编辑' : 'Multi-cursor Edit', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
            ].map(([cap, cursor, windsurf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{cursor}</td>
                <td style={tdStyle}>{windsurf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.cursorExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Cursor AI Commands\n\n// Natural Language Code Generation\nCmd+K -> "Create a function to validate email"\n\n// Multi-file Refactoring\nCmd+Shift+K -> "Rename this function across all files"\n\n// Code Explanation\nSelect code -> Right-click -> "Explain this code"\n\n// Debug Assistance\nCmd+L -> "Help me debug this error"\n\n// Example: Generate React component\n// Prompt: "Create a TodoItem component with checkbox and delete button"\n\nfunction TodoItem({ todo, onToggle, onDelete }) {\n  return (\n    <div className="todo-item">\n      <input\n        type="checkbox"\n        checked={todo.completed}\n        onChange={() => onToggle(todo.id)}\n      />\n      <span className={todo.completed ? "completed" : ""}>\n        {todo.text}\n      </span>\n      <button onClick={() => onDelete(todo.id)}>\n        Delete\n      </button>\n    </div>\n  );\n}'}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.windsurfExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Windsurf AI Commands\n\n// Inline AI Chat\nCmd+I -> "Add error handling to this function"\n\n// Code Generation\nCmd+Shift+I -> "Generate unit tests for this module"\n\n// Conversation Mode\nCmd+Shift+C -> Opens conversation panel\n\n// Example: Generate API endpoint\n// Prompt: "Create an Express.js endpoint for user registration"\n\napp.post("/api/register", async (req, res) => {\n  try {\n    const { email, password } = req.body;\n    \n    if (!email || !password) {\n      return res.status(400).json({ \n        error: "Email and password required" \n      });\n    }\n    \n    const hashedPassword = await bcrypt.hash(password, 10);\n    const user = await User.create({\n      email,\n      password: hashedPassword\n    });\n    \n    res.status(201).json({ \n      message: "User created successfully",\n      userId: user.id \n    });\n  } catch (error) {\n    res.status(500).json({ error: error.message });\n  }\n});'}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '模型/集成' : 'Model/Integration'}</th>
              <th style={thStyle}>Cursor</th>
              <th style={thStyle}>Windsurf</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Claude 3.5 Sonnet' : 'Claude 3.5 Sonnet', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'GPT-4/GPT-4o' : 'GPT-4/GPT-4o', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'Claude 3 Opus' : 'Claude 3 Opus', isZh ? '支持' : 'Supported', isZh ? '有限' : 'Limited'],
              [isZh ? 'Codeium 模型' : 'Codeium Models', isZh ? '不支持' : 'No', isZh ? '原生支持' : 'Native support'],
              [isZh ? '自定义模型' : 'Custom Models', isZh ? 'API Key 配置' : 'API Key config', isZh ? '企业版' : 'Enterprise'],
              [isZh ? '本地模型' : 'Local Models', isZh ? '计划中' : 'Planned', isZh ? '不支持' : 'No'],
            ].map(([cat, cursor, windsurf], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{cursor}</td>
                <td style={tdStyle}>{windsurf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>Cursor Workflow</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '熟悉的 VS Code 工作流程，Cmd+K 进行内联编辑，Cmd+L 打开聊天面板，Tab 进行智能补全。支持所有 VS Code 扩展和主题，学习曲线低。' : 'Familiar VS Code workflow with Cmd+K for inline edits, Cmd+L for chat panel, Tab for smart completion. Supports all VS Code extensions and themes with low learning curve.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Windsurf Workflow</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'AI 优先的对话界面，Cmd+I 进行内联 AI 交互，Cmd+Shift+C 打开对话面板。原生实时协作支持，适合团队开发。' : 'AI-first conversation interface with Cmd+I for inline AI interaction, Cmd+Shift+C for conversation panel. Native real-time collaboration support, ideal for team development.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>{ct.cursorBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'VS Code 现有用户' : 'Existing VS Code users'}</li>
            <li>{isZh ? '需要扩展兼容性' : 'Need extension compatibility'}</li>
            <li>{isZh ? '大型代码库项目' : 'Large codebase projects'}</li>
            <li>{isZh ? '重度 AI 辅助使用' : 'Heavy AI assistance usage'}</li>
            <li>{isZh ? '多文件重构需求' : 'Multi-file refactoring needs'}</li>
            <li>{isZh ? '企业开发团队' : 'Enterprise development teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.windsurfBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目从零开始' : 'Starting fresh projects'}</li>
            <li>{isZh ? '团队实时协作' : 'Team real-time collaboration'}</li>
            <li>{isZh ? 'AI 优先开发理念' : 'AI-first development mindset'}</li>
            <li>{isZh ? '简化的开发流程' : 'Simplified development workflow'}</li>
            <li>{isZh ? 'Codeium 生态用户' : 'Codeium ecosystem users'}</li>
            <li>{isZh ? '注重对话式交互' : 'Conversation-focused interaction'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
