'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'GitHub Copilot vs Cursor: AI Coding Assistant Comparison 2025',
    intro: 'GitHub Copilot pioneered AI-assisted coding, but Cursor has emerged as a formidable challenger with its IDE-first approach. This comprehensive comparison examines features, pricing, code quality, and real-world productivity to help you choose the best AI coding assistant for your workflow.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Cursor offers superior context awareness, multi-file editing, and a more integrated experience with its custom VS Code fork. GitHub Copilot excels in IDE compatibility and enterprise integration. For individual developers seeking maximum productivity, Cursor is the winner. For teams deeply invested in GitHub ecosystem, Copilot remains a solid choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Cursor provides 5x more context window than Copilot for better code understanding',
    takeaway2: 'Cursor supports multi-file editing and refactoring, Copilot is single-file focused',
    takeaway3: 'GitHub Copilot integrates with 10+ IDEs, Cursor is a standalone VS Code fork',
    takeaway4: 'Cursor includes ChatGPT-4o and Claude 3.5 Sonnet, Copilot uses custom models',
    takeaway5: 'Pricing is similar: Cursor Pro at $20/month vs Copilot at $10/month for individuals',
    takeaway6: 'Both tools significantly boost productivity, reducing coding time by 30-50%',
    
    whatIsCursorTitle: 'What is Cursor?',
    whatIsCursorContent: 'Cursor is an AI-first code editor built on a fork of VS Code. Launched in 2023 by a team of former OpenAI researchers, it deeply integrates AI capabilities directly into the editing experience. Unlike plugins, Cursor has native AI features like Cmd+K for inline edits, chat with codebase, and multi-file refactoring.',
    
    whatIsCopilotTitle: 'What is GitHub Copilot?',
    whatIsCopilotContent: 'GitHub Copilot, launched in 2021 by GitHub and OpenAI, is the pioneering AI pair programmer. It integrates as a plugin into popular IDEs and provides real-time code suggestions. With over 1.5 million subscribers, it has become the most widely adopted AI coding assistant in the industry.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost analysis for different user types:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed feature breakdown:',
    
    codeQualityTitle: 'Code Quality & Accuracy',
    codeQualityIntro: 'Real-world code generation quality:',
    
    contextTitle: 'Context & Understanding',
    contextIntro: 'How each tool understands your codebase:',
    
    codeExampleTitle: 'Code Generation Examples',
    codeExampleIntro: 'Side-by-side comparison of code generation:',
    
    cursorExampleTitle: 'Cursor',
    copilotExampleTitle: 'GitHub Copilot',
    
    performanceTitle: 'Performance & Speed',
    performanceIntro: 'Response times and resource usage:',
    
    integrationTitle: 'IDE & Integration',
    integrationIntro: 'Where can you use each tool?',
    
    privacyTitle: 'Privacy & Security',
    privacyIntro: 'Data handling and privacy policies:',
    
    whenToUseTitle: 'When to Use Each Tool',
    cursorBestFor: 'Use Cursor When:',
    copilotBestFor: 'Use Copilot When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Cursor has emerged as the superior choice for individual developers prioritizing productivity and code quality. Its deeper context understanding, multi-file capabilities, and seamless AI integration provide a more powerful experience. However, GitHub Copilot remains excellent for teams already invested in the GitHub ecosystem, those requiring IDE flexibility, or enterprise users with specific compliance needs. For maximum productivity, many developers now use both: Cursor for deep work and Copilot for quick suggestions in other IDEs.',
    
    faq1q: 'Can I use both Cursor and Copilot together?',
    faq1a: 'Yes, you can install the Copilot extension within Cursor. However, most users find Cursor native AI features sufficient and disable Copilot to avoid redundant suggestions.',
    
    faq2q: 'Does Cursor support all VS Code extensions?',
    faq2a: 'Yes, Cursor supports most VS Code extensions since it is built on VS Code. Some extensions may have minor compatibility issues, but the vast majority work perfectly.',
    
    faq3q: 'Which is better for large codebases?',
    faq3a: 'Cursor is better for large codebases due to its larger context window and codebase-wide indexing. It can understand relationships across hundreds of files, while Copilot focuses primarily on the current file.',
    
    faq4q: 'Is my code sent to external servers?',
    faq4a: 'Both tools send code context to their servers for AI processing. Copilot offers enterprise plans with optional privacy mode. Cursor offers a Privacy Mode where code is not stored after processing.',
    
    faq5q: 'Can I use Cursor offline?',
    faq5a: 'No, Cursor requires internet connectivity for AI features. You can still edit code offline, but AI assistance requires a connection.',
    
    faq6q: 'Which supports more programming languages?',
    faq6a: 'Both support all major programming languages. Copilot has broader coverage of niche languages due to its longer training history, but the difference is minimal for practical use.',
    
    faq7q: 'How do they handle sensitive code?',
    faq7a: 'Copilot Business allows excluding specific files from suggestions. Cursor allows .cursorignore files to exclude paths. Both offer enterprise options with enhanced privacy controls.',
    
    faq8q: 'What about code ownership and licensing?',
    faq8a: 'Both tools have been trained on public code and may occasionally suggest code snippets from open source projects. You retain ownership of your code. Both companies have updated their policies to address IP concerns, and Copilot now filters known license-protected code.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'GitHub Copilot vs Cursor：2025年AI编程助手对比',
    intro: 'GitHub Copilot开创了AI辅助编程的先河，但Cursor以其IDE优先的方法成为了强大的挑战者。本全面比较考察功能、定价、代码质量和实际生产力，帮助你为工作流程选择最佳的AI编程助手。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Cursor提供卓越的上下文感知、多文件编辑以及更集成的体验。GitHub Copilot在IDE兼容性和企业集成方面表现出色。对于追求最大生产力的个人开发者，Cursor是赢家。对于深度投资GitHub生态的团队，Copilot仍然是可靠的选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Cursor提供比Copilot大5倍的上下文窗口，更好地理解代码',
    takeaway2: 'Cursor支持多文件编辑和重构，Copilot专注于单文件',
    takeaway3: 'GitHub Copilot支持10多种IDE，Cursor是独立的VS Code分支',
    takeaway4: 'Cursor包含ChatGPT-4o和Claude 3.5 Sonnet，Copilot使用定制模型',
    takeaway5: '定价相似：Cursor Pro每月20美元 vs Copilot个人版每月10美元',
    takeaway6: '两个工具都显著提高生产力，减少30-50%的编程时间',
    
    whatIsCursorTitle: '什么是Cursor？',
    whatIsCursorContent: 'Cursor是基于VS Code分支构建的AI优先代码编辑器。由前OpenAI研究员团队于2023年推出，它将AI功能深度集成到编辑体验中。与插件不同，Cursor具有原生AI功能，如Cmd+K内联编辑、与代码库聊天、多文件重构。',
    
    whatIsCopilotTitle: '什么是GitHub Copilot？',
    whatIsCopilotContent: 'GitHub Copilot由GitHub和OpenAI于2021年推出，是开创性的AI配对程序员。它作为插件集成到流行的IDE中，提供实时代码建议。拥有超过150万订阅者，已成为业界采用最广泛的AI编程助手。',
    
    pricingTitle: '定价对比',
    pricingIntro: '不同用户类型的成本分析：',
    
    featuresTitle: '功能对比',
    featuresIntro: '详细功能分解：',
    
    codeQualityTitle: '代码质量与准确性',
    codeQualityIntro: '真实代码生成质量：',
    
    contextTitle: '上下文与理解',
    contextIntro: '每个工具如何理解你的代码库：',
    
    codeExampleTitle: '代码生成示例',
    codeExampleIntro: '代码生成的并排比较：',
    
    cursorExampleTitle: 'Cursor',
    copilotExampleTitle: 'GitHub Copilot',
    
    performanceTitle: '性能与速度',
    performanceIntro: '响应时间和资源使用：',
    
    integrationTitle: 'IDE与集成',
    integrationIntro: '你可以在哪里使用每个工具？',
    
    privacyTitle: '隐私与安全',
    privacyIntro: '数据处理和隐私政策：',
    
    whenToUseTitle: '何时使用每个工具',
    cursorBestFor: '使用Cursor的场景：',
    copilotBestFor: '使用Copilot的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Cursor已成为优先考虑生产力和代码质量的个人开发者的更佳选择。其更深的上下文理解、多文件能力和无缝的AI集成提供了更强大的体验。然而，GitHub Copilot对于已经投资GitHub生态的团队、需要IDE灵活性或具有特定合规需求的企业用户仍然非常出色。为了最大化生产力，许多开发者现在同时使用两者：Cursor用于深度工作，Copilot用于其他IDE中的快速建议。',
    
    faq1q: '我可以同时使用Cursor和Copilot吗？',
    faq1a: '可以，你可以在Cursor中安装Copilot扩展。然而，大多数用户发现Cursor的原生AI功能已足够，并禁用Copilot以避免冗余建议。',
    
    faq2q: 'Cursor支持所有VS Code扩展吗？',
    faq2a: '是的，Cursor支持大多数VS Code扩展，因为它是基于VS Code构建的。某些扩展可能有轻微的兼容性问题，但绝大多数都能完美运行。',
    
    faq3q: '哪个更适合大型代码库？',
    faq3a: 'Cursor更适合大型代码库，因为它有更大的上下文窗口和代码库范围的索引。它可以理解数百个文件之间的关系，而Copilot主要关注当前文件。',
    
    faq4q: '我的代码会发送到外部服务器吗？',
    faq4a: '两个工具都会将代码上下文发送到其服务器进行AI处理。Copilot提供带有可选隐私模式的企业计划。Cursor提供隐私模式，处理后不存储代码。',
    
    faq5q: '我可以离线使用Cursor吗？',
    faq5a: '不可以，Cursor需要互联网连接才能使用AI功能。你仍然可以离线编辑代码，但AI辅助需要连接。',
    
    faq6q: '哪个支持更多编程语言？',
    faq6a: '两者都支持所有主要编程语言。由于训练历史更长，Copilot对小众语言的覆盖更广，但实际使用的差异微乎其微。',
    
    faq7q: '它们如何处理敏感代码？',
    faq7a: 'Copilot Business允许从建议中排除特定文件。Cursor允许使用.cursorignore文件排除路径。两者都提供具有增强隐私控制的企业选项。',
    
    faq8q: '代码所有权和许可呢？',
    faq8a: '两个工具都在公共代码上训练，可能偶尔建议来自开源项目的代码片段。你保留代码的所有权。两家公司都更新了政策以解决IP问题，Copilot现在过滤已知受许可保护的代码。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function GithubCopilotVsCursor({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsCursorTitle}</h3>
      <p style={pStyle}>{ct.whatIsCursorContent}</p>

      <h3 style={h3Style}>{ct.whatIsCopilotTitle}</h3>
      <p style={pStyle}>{ct.whatIsCopilotContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>GitHub Copilot</th>
              <th style={thStyle}>Cursor</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费版' : 'Free', isZh ? '学生/开源维护者' : 'Students & OSS maintainers', isZh ? '功能有限的 Hobby 计划' : 'Hobby plan with limits'],
              [isZh ? '个人版' : 'Individual', '$10/month', '$20/month (Pro)'],
              [isZh ? '团队版' : 'Team/Business', '$19/user/month', '$40/user/month'],
              [isZh ? '企业版' : 'Enterprise', '$39/user/month', isZh ? '联系销售' : 'Contact sales'],
              [isZh ? '免费试用' : 'Free Trial', '30 days', '14 days'],
            ].map(([plan, copilot, cursor], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{copilot}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{cursor}</td>
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
              <th style={thStyle}>GitHub Copilot</th>
              <th style={thStyle}>Cursor</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '代码补全' : 'Code Completion', '✓', '✓'],
              [isZh ? '内联聊天' : 'Inline Chat', '✓', '✓'],
              [isZh ? '多文件编辑' : 'Multi-file Edit', '✗', '✓'],
              [isZh ? '代码库聊天' : 'Codebase Chat', '✗', '✓'],
              [isZh ? '上下文窗口' : 'Context Window', '~8K tokens', '~40K tokens'],
              [isZh ? '多模型支持' : 'Multiple Models', '✗', '✓ (GPT-4, Claude)'],
              [isZh ? '代码解释' : 'Code Explanation', '✓', '✓'],
              [isZh ? '自动重构' : 'Auto Refactor', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced'],
              [isZh ? '命令面板' : 'Command Palette', '✓', '✓ (Enhanced)'],
              [isZh ? '终端集成' : 'Terminal Integration', '✗', '✓'],
            ].map(([feature, copilot, cursor], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{copilot}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{cursor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.cursorExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Cursor: Multi-file refactoring with context awareness
// Press Cmd+K and type: "Refactor this to use the new UserService"

// Before (user.ts)
export async function getUser(id: string) {
  const response = await fetch('/api/users/' + id);
  return response.json();
}

// Cursor understands your entire codebase and suggests:
// 1. Updates all imports across files
// 2. Maintains type safety
// 3. Updates related test files
// 4. Suggests updating API route handlers

// After (user.ts) - Cursor generated
import { UserService } from './services/UserService';

const userService = new UserService();

export async function getUser(id: string) {
  return userService.findById(id);
}

// Cursor also updates:
// - services/UserService.ts (new file)
// - __tests__/user.test.ts (updated imports)
// - api/users/[id].ts (updated handler)`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.copilotExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// GitHub Copilot: Single-file suggestions
// Type the comment and press Tab for suggestions

// Function to fetch user by ID
export async function getUser(id: string) {
  // Copilot suggests based on current file context:
  const response = await fetch('/api/users/' + id);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

// Copilot works well for:
// - Function completions
// - Boilerplate code
// - Documentation generation
// - Test generation (single file)

// Limitations:
// - Does not update other files
// - Limited cross-file context
// - No codebase-wide refactoring`}</code></pre>

      <h2 style={h2Style}>{ct.contextTitle}</h2>
      <p style={pStyle}>{ct.contextIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '能力' : 'Capability'}</th>
              <th style={thStyle}>GitHub Copilot</th>
              <th style={thStyle}>Cursor</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '当前文件' : 'Current File', '✓', '✓'],
              [isZh ? '打开的标签页' : 'Open Tabs', '✓', '✓'],
              [isZh ? '整个代码库' : 'Entire Codebase', '✗', '✓'],
              [isZh ? 'Git 历史' : 'Git History', '✗', '✓'],
              [isZh ? '文档理解' : 'Documentation', isZh ? '基础' : 'Basic', '✓'],
              [isZh ? '外部依赖' : 'External Dependencies', '✗', '✓'],
            ].map(([cap, copilot, cursor], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{copilot}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{cursor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>GitHub Copilot</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            VS Code, Visual Studio, JetBrains IDEs, Neovim, Azure Data Studio
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Cursor</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '独立应用（VS Code分支），支持所有VS Code扩展' : 'Standalone app (VS Code fork), supports all VS Code extensions'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.privacyTitle}</h2>
      <p style={pStyle}>{ct.privacyIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>GitHub Copilot</th>
              <th style={thStyle}>Cursor</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '代码存储' : 'Code Storage', isZh ? '可能用于训练（可退出）' : 'May use for training (opt-out)', isZh ? '不存储（隐私模式）' : 'No storage (Privacy Mode)'],
              [isZh ? 'SOC 2 合规' : 'SOC 2 Compliant', '✓', '✓'],
              [isZh ? 'GDPR 合规' : 'GDPR Compliant', '✓', '✓'],
              [isZh ? '企业隐私控制' : 'Enterprise Privacy', '✓', '✓'],
              [isZh ? '自托管选项' : 'Self-hosted Option', isZh ? '企业版' : 'Enterprise', '✗'],
            ].map(([feature, copilot, cursor], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{copilot}</td>
                <td style={tdStyle}>{cursor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.cursorBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '个人开发者' : 'Individual developers'}</li>
            <li>{isZh ? '大型代码库' : 'Large codebases'}</li>
            <li>{isZh ? '复杂重构任务' : 'Complex refactoring'}</li>
            <li>{isZh ? '全栈开发' : 'Full-stack development'}</li>
            <li>{isZh ? '多模型需求' : 'Need for multiple AI models'}</li>
            <li>{isZh ? '深度AI集成' : 'Deep AI integration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.copilotBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'GitHub生态用户' : 'GitHub ecosystem users'}</li>
            <li>{isZh ? '多IDE需求' : 'Multiple IDE needs'}</li>
            <li>{isZh ? '企业合规要求' : 'Enterprise compliance'}</li>
            <li>{isZh ? '预算敏感' : 'Budget-conscious'}</li>
            <li>{isZh ? '团队协作' : 'Team collaboration'}</li>
            <li>{isZh ? 'VS Code + 其他IDE混用' : 'VS Code + other IDEs mix'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
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
