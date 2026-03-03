'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'VS Code vs WebStorm 2025: JavaScript IDE Comparison',
    intro: 'Visual Studio Code and WebStorm are the two leading JavaScript IDEs in 2025. This comprehensive comparison examines performance, features, pricing, developer experience, and real-world use cases to help you choose the right IDE for your development workflow.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'VS Code is free, lightweight, and has the largest extension ecosystem. WebStorm offers superior out-of-the-box JavaScript intelligence, better refactoring tools, and deeper framework integration. For individual developers and startups, VS Code is ideal. For enterprise teams working with complex JavaScript projects, WebStorm provides better productivity.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'VS Code is free and open source; WebStorm costs $69/year for individuals',
    takeaway2: 'WebStorm has better built-in JavaScript intelligence and refactoring',
    takeaway3: 'VS Code has 40,000+ extensions vs WebStorm plugin ecosystem',
    takeaway4: 'Both support all major frameworks: React, Vue, Angular, Node.js',
    takeaway5: 'WebStorm uses 2-3x more memory but offers more features out of the box',
    takeaway6: 'VS Code starts in 1-2 seconds; WebStorm takes 10-15 seconds',
    
    whatIsVSCVodeTitle: 'What is Visual Studio Code?',
    whatIsVSCVodeContent: 'VS Code is a free, open-source code editor developed by Microsoft. Launched in 2015, it has become the most popular code editor with over 70% market share among developers. Built on Electron, it runs on Windows, macOS, and Linux. Its extension-based architecture allows customization for any programming language or workflow.',
    
    whatIsWebStormTitle: 'What is WebStorm?',
    whatIsWebStormContent: 'WebStorm is a commercial JavaScript IDE by JetBrains, first released in 2010. Built on the IntelliJ platform, it offers deep code intelligence, advanced refactoring, and built-in tools for modern JavaScript development. It is designed specifically for JavaScript and TypeScript development with first-class framework support.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost is often the deciding factor for many developers:',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'System resource usage and startup time benchmarks on macOS (M2 Pro, 16GB RAM):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed comparison of core IDE capabilities:',
    
    codeIntelligenceTitle: 'Code Intelligence',
    codeIntelligenceIntro: 'JavaScript and TypeScript support comparison:',
    
    refactoringTitle: 'Refactoring Capabilities',
    refactoringIntro: 'Code transformation and cleanup features:',
    
    debuggingTitle: 'Debugging Experience',
    debuggingIntro: 'Built-in debugging and testing tools:',
    
    frameworkSupportTitle: 'Framework Support',
    frameworkSupportIntro: 'Built-in support for popular frameworks:',
    
    extensionTitle: 'Extensions vs Plugins',
    extensionIntro: 'Ecosystem and customization options:',
    
    teamFeaturesTitle: 'Team Features',
    teamFeaturesIntro: 'Collaboration and enterprise capabilities:',
    
    whenToUseTitle: 'When to Use Each IDE',
    vsCodeBestFor: 'Use VS Code When:',
    webStormBestFor: 'Use WebStorm When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between VS Code and WebStorm depends on your specific needs and budget. VS Code excels as a lightweight, free, and highly customizable editor with an unmatched extension ecosystem. WebStorm provides a more complete out-of-the-box experience with superior JavaScript intelligence, especially valuable for large enterprise projects. For individual developers and small teams, VS Code offers excellent value. For teams with budget and complex JavaScript projects, WebStorm can significantly boost productivity.',
    
    faq1q: 'Is WebStorm worth the money in 2025?',
    faq1a: 'Yes, if you work primarily with JavaScript/TypeScript and value deep code intelligence, advanced refactoring, and minimal setup time. The productivity gains often justify the cost for professional developers. However, if you are a hobbyist or work with multiple languages, VS Code may be more suitable.',
    
    faq2q: 'Can VS Code match WebStorm features with extensions?',
    faq2a: 'VS Code can match many WebStorm features with the right extensions, but requires more setup and configuration. Extensions like ESLint, Prettier, and various language servers provide similar functionality, but WebStorm offers more cohesive, integrated experience out of the box.',
    
    faq3q: 'Which IDE is better for React development?',
    faq3a: 'Both are excellent for React. VS Code with ES7+ React snippets and React Native Tools is very capable. WebStorm has built-in React support with component navigation, props validation, and hooks assistance. WebStorm edges ahead for complex React projects.',
    
    faq4q: 'Does WebStorm work well with TypeScript?',
    faq4a: 'WebStorm has exceptional TypeScript support, matching or exceeding VS Code. It provides better type inference, faster completion, and more reliable refactoring. Both IDEs use similar language server technology, but WebStorm integration is more polished.',
    
    faq5q: 'Can I use VS Code for enterprise development?',
    faq5a: 'Absolutely. Many large enterprises use VS Code as their primary editor. It supports enterprise features like settings sync, workspace trust, and can be configured for corporate environments. Microsoft also offers VS Code Server for secure remote development.',
    
    faq6q: 'Which IDE uses less memory?',
    faq6a: 'VS Code is significantly lighter, using 200-500MB RAM for typical projects. WebStorm uses 800MB-2GB depending on project size. However, WebStorm caches more data, which improves performance for large codebases.',
    
    faq7q: 'Can I open VS Code projects in WebStorm?',
    faq7a: 'Yes, both IDEs work with standard project structures. You can open the same project in either IDE without issues. Configuration files are different (.vscode vs .idea), but your code remains unchanged.',
    
    faq8q: 'Which has better Git integration?',
    faq8a: 'Both have excellent Git support. VS Code has built-in source control with a clean UI. WebStorm offers more advanced features like Git blame in editor, better merge conflict resolution, and deeper GitHub integration. For complex Git workflows, WebStorm has the edge.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'VS Code vs WebStorm 2025：JavaScript IDE对比',
    intro: 'Visual Studio Code 和 WebStorm 是2025年两大主流JavaScript IDE。本全面对比考察性能、功能、定价、开发者体验和真实用例，帮助你为开发工作流程选择合适的IDE。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'VS Code免费、轻量，拥有最大的扩展生态系统。WebStorm提供更出色的开箱即用JavaScript智能、更好的重构工具和更深入的框架集成。对于个人开发者和初创公司，VS Code是理想选择。对于处理复杂JavaScript项目的企业团队，WebStorm提供更好的生产力。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'VS Code免费开源；WebStorm个人版售价69美元/年',
    takeaway2: 'WebStorm内置更好的JavaScript智能和重构功能',
    takeaway3: 'VS Code有40,000+扩展 vs WebStorm插件生态系统',
    takeaway4: '两者都支持所有主流框架：React、Vue、Angular、Node.js',
    takeaway5: 'WebStorm内存使用多2-3倍，但开箱即提供更多功能',
    takeaway6: 'VS Code启动时间1-2秒；WebStorm需要10-15秒',
    
    whatIsVSCVodeTitle: '什么是Visual Studio Code？',
    whatIsVSCVodeContent: 'VS Code是微软开发的免费开源代码编辑器。2015年发布以来，它已成为最受欢迎的代码编辑器，在开发者中占有超过70%的市场份额。基于Electron构建，可在Windows、macOS和Linux上运行。其扩展架构允许为任何编程语言或工作流程进行定制。',
    
    whatIsWebStormTitle: '什么是WebStorm？',
    whatIsWebStormContent: 'WebStorm是JetBrains的商业JavaScript IDE，首次发布于2010年。基于IntelliJ平台构建，提供深度代码智能、高级重构和现代JavaScript开发的内置工具。专为JavaScript和TypeScript开发设计，提供一流的框架支持。',
    
    pricingTitle: '定价对比',
    pricingIntro: '成本往往是许多开发者的决定因素：',
    
    performanceTitle: '性能对比',
    performanceIntro: 'macOS上的系统资源使用和启动时间基准测试（M2 Pro，16GB RAM）：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心IDE能力的详细对比：',
    
    codeIntelligenceTitle: '代码智能',
    codeIntelligenceIntro: 'JavaScript和TypeScript支持对比：',
    
    refactoringTitle: '重构能力',
    refactoringIntro: '代码转换和清理功能：',
    
    debuggingTitle: '调试体验',
    debuggingIntro: '内置调试和测试工具：',
    
    frameworkSupportTitle: '框架支持',
    frameworkSupportIntro: '对流行框架的内置支持：',
    
    extensionTitle: '扩展 vs 插件',
    extensionIntro: '生态系统和定制选项：',
    
    teamFeaturesTitle: '团队功能',
    teamFeaturesIntro: '协作和企业能力：',
    
    whenToUseTitle: '何时使用每个IDE',
    vsCodeBestFor: '使用VS Code的场景：',
    webStormBestFor: '使用WebStorm的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，VS Code和WebStorm之间的选择取决于你的具体需求和预算。VS Code作为轻量级、免费且高度可定制的编辑器，拥有无与伦比的扩展生态系统。WebStorm提供更完整的开箱即用体验和更优越的JavaScript智能，对于大型企业项目尤其有价值。对于个人开发者和小团队，VS Code提供出色的价值。对于有预算和复杂JavaScript项目的团队，WebStorm可以显著提升生产力。',
    
    faq1q: '2025年WebStorm值得购买吗？',
    faq1a: '值得，如果你主要使用JavaScript/TypeScript工作，并且重视深度代码智能、高级重构和最少的设置时间。对于专业开发者来说，生产力提升往往可以证明成本合理。但是，如果你是业余爱好者或使用多种语言，VS Code可能更适合。',
    
    faq2q: 'VS Code可以通过扩展匹配WebStorm功能吗？',
    faq2a: 'VS Code可以通过合适的扩展匹配许多WebStorm功能，但需要更多的设置和配置。ESLint、Prettier和各种语言服务器等扩展提供类似功能，但WebStorm开箱即用提供更一致、集成的体验。',
    
    faq3q: '哪个IDE更适合React开发？',
    faq3a: '两者都非常适合React。VS Code配合ES7+ React snippets和React Native Tools非常强大。WebStorm内置React支持，包括组件导航、props验证和hooks辅助。对于复杂React项目，WebStorm略胜一筹。',
    
    faq4q: 'WebStorm对TypeScript支持好吗？',
    faq4a: 'WebStorm对TypeScript有出色的支持，匹配或超过VS Code。它提供更好的类型推断、更快的补全和更可靠的重构。两个IDE使用类似的语言服务器技术，但WebStorm的集成更加完善。',
    
    faq5q: '我可以用VS Code进行企业开发吗？',
    faq5a: '当然可以。许多大型企业使用VS Code作为主要编辑器。它支持企业功能，如设置同步、工作区信任，并可为企业环境配置。微软还提供VS Code Server用于安全的远程开发。',
    
    faq6q: '哪个IDE内存使用更少？',
    faq6a: 'VS Code明显更轻量，典型项目使用200-500MB RAM。WebStorm使用800MB-2GB，取决于项目大小。然而，WebStorm缓存更多数据，这提高了大型代码库的性能。',
    
    faq7q: '我可以在WebStorm中打开VS Code项目吗？',
    faq7a: '可以，两个IDE都使用标准项目结构。你可以在任一IDE中打开同一项目而不会出现问题。配置文件不同（.vscode vs .idea），但你的代码保持不变。',
    
    faq8q: '哪个Git集成更好？',
    faq8a: '两者都有出色的Git支持。VS Code有内置源代码管理和清晰的UI。WebStorm提供更高级的功能，如编辑器中的Git blame、更好的合并冲突解决和更深入的GitHub集成。对于复杂的Git工作流程，WebStorm更胜一筹。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function VSCodeVsWebStorm2025({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsVSCVodeTitle}</h3>
      <p style={pStyle}>{ct.whatIsVSCVodeContent}</p>

      <h3 style={h3Style}>{ct.whatIsWebStormTitle}</h3>
      <p style={pStyle}>{ct.whatIsWebStormContent}</p>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '个人使用' : 'Individual', isZh ? '免费' : 'Free', '$69/年'],
              [isZh ? '企业使用' : 'Enterprise', isZh ? '免费' : 'Free', '$159/用户/年'],
              [isZh ? '开源项目' : 'Open Source', isZh ? '免费' : 'Free', isZh ? '免费申请' : 'Free (on request)'],
              [isZh ? '学生/教师' : 'Students/Teachers', isZh ? '免费' : 'Free', isZh ? '免费' : 'Free'],
              [isZh ? '商业使用许可' : 'Commercial License', 'MIT', isZh ? '专有' : 'Proprietary'],
            ].map(([plan, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{vscode}</td>
                <td style={tdStyle}>{webstorm}</td>
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
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动时间（冷启动）' : 'Startup Time (cold)', '1-2秒', '10-15秒'],
              [isZh ? '启动时间（热启动）' : 'Startup Time (warm)', '0.5-1秒', '5-8秒'],
              [isZh ? '空闲内存使用' : 'Idle Memory', '200-300MB', '600-800MB'],
              [isZh ? '中型项目内存' : 'Medium Project Memory', '400-600MB', '1-1.5GB'],
              [isZh ? '大型项目内存' : 'Large Project Memory', '800MB-1.2GB', '1.5-2.5GB'],
              [isZh ? '索引时间（新项目）' : 'Indexing (new project)', '5-10秒', '30-60秒'],
              [isZh ? '安装大小' : 'Installation Size', '~300MB', '~1.2GB'],
            ].map(([metric, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{vscode}</td>
                <td style={tdStyle}>{webstorm}</td>
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
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '智能代码补全' : 'IntelliSense', isZh ? '通过扩展' : 'Via extensions', isZh ? '内置高级' : 'Built-in advanced'],
              [isZh ? '代码导航' : 'Code Navigation', '✓', '✓+'],
              [isZh ? '重构工具' : 'Refactoring', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced'],
              [isZh ? '调试器' : 'Debugger', '✓', '✓+'],
              [isZh ? '版本控制' : 'Version Control', 'Git内置', 'Git/SVN/Mercurial'],
              [isZh ? '终端集成' : 'Terminal', '✓', '✓'],
              [isZh ? '实时协作' : 'Live Share', '✓', isZh ? '通过Code With Me' : 'Via Code With Me'],
              [isZh ? '数据库工具' : 'Database Tools', isZh ? '通过扩展' : 'Via extension', isZh ? '内置' : 'Built-in'],
              [isZh ? 'HTTP客户端' : 'HTTP Client', isZh ? '通过扩展' : 'Via extension', isZh ? '内置' : 'Built-in'],
              [isZh ? '性能分析' : 'Profiling', isZh ? '有限' : 'Limited', isZh ? '内置' : 'Built-in'],
            ].map(([feature, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{vscode}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{webstorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Intelligence */}
      <h2 style={h2Style}>{ct.codeIntelligenceTitle}</h2>
      <p style={pStyle}>{ct.codeIntelligenceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '能力' : 'Capability'}</th>
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '类型推断' : 'Type Inference', 'TypeScript Server', 'TypeScript Server+'],
              [isZh ? '自动导入' : 'Auto Import', '✓', '✓+'],
              [isZh ? '参数提示' : 'Parameter Hints', '✓', '✓'],
              [isZh ? '调用层次' : 'Call Hierarchy', '✓', '✓+'],
              [isZh ? '实现查看' : 'Go to Implementation', '✓', '✓'],
              [isZh ? '类型定义跳转' : 'Go to Type Definition', '✓', '✓'],
              [isZh ? '错误检测' : 'Error Detection', 'ESLint扩展', isZh ? '内置+ESLint' : 'Built-in+ESLint'],
              [isZh ? '代码建议' : 'Code Suggestions', isZh ? 'GitHub Copilot' : 'GitHub Copilot', isZh ? 'GitHub Copilot+AI Assistant' : 'GitHub Copilot+AI Assistant'],
            ].map(([cap, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{vscode}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{webstorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Refactoring */}
      <h2 style={h2Style}>{ct.refactoringTitle}</h2>
      <p style={pStyle}>{ct.refactoringIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '重构操作' : 'Refactoring'}</th>
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '重命名' : 'Rename Symbol', '✓', '✓+'],
              [isZh ? '提取方法' : 'Extract Method', '✓', '✓+'],
              [isZh ? '提取变量' : 'Extract Variable', '✓', '✓'],
              [isZh ? '提取接口' : 'Extract Interface', '✓', '✓'],
              [isZh ? '内联变量' : 'Inline Variable', '✓', '✓'],
              [isZh ? '移动文件/类' : 'Move File/Class', isZh ? '基础' : 'Basic', isZh ? '高级（更新导入）' : 'Advanced (update imports)'],
              [isZh ? '更改签名' : 'Change Signature', '✗', '✓'],
              [isZh ? '安全删除' : 'Safe Delete', '✗', '✓'],
              [isZh ? '代码清理' : 'Code Cleanup', isZh ? '通过扩展' : 'Via extension', isZh ? '内置' : 'Built-in'],
            ].map(([ref, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{ref}</td>
                <td style={tdStyle}>{vscode}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{webstorm}</td>
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
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['React', '✓ (扩展)', '✓ (内置)'],
              ['Vue.js', '✓ (Volar)', '✓ (内置)'],
              ['Angular', '✓ (扩展)', '✓ (内置)'],
              ['Svelte', '✓ (扩展)', '✓ (内置)'],
              ['Next.js', '✓ (扩展)', '✓ (内置)'],
              ['Nuxt.js', '✓ (扩展)', '✓ (内置)'],
              ['Express.js', '✓', '✓+'],
              ['NestJS', '✓ (扩展)', '✓ (内置)'],
              ['Node.js', '✓', '✓+'],
            ].map(([fw, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{fw}</td>
                <td style={tdStyle}>{vscode}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{webstorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Extensions */}
      <h2 style={h2Style}>{ct.extensionTitle}</h2>
      <p style={pStyle}>{ct.extensionIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #007ACC' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#007ACC' }}>VS Code</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>40,000+ {isZh ? '扩展' : 'extensions'}</li>
            <li>ESLint, Prettier</li>
            <li>GitLens, GitHub Copilot</li>
            <li>Thunder Client, REST Client</li>
            <li>Live Share, Docker</li>
            <li>{isZh ? '免费安装所有扩展' : 'All extensions free'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>WebStorm</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>5,000+ {isZh ? '插件' : 'plugins'}</li>
            <li>{isZh ? '大多数功能内置' : 'Most features built-in'}</li>
            <li>JetBrains AI Assistant</li>
            <li>{isZh ? '数据库插件' : 'Database plugins'}</li>
            <li>{isZh ? '部分插件付费' : 'Some plugins paid'}</li>
            <li>{isZh ? 'IntelliJ平台兼容' : 'IntelliJ platform compatible'}</li>
          </ul>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #007ACC' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#007ACC' }}>{ct.vsCodeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '预算有限' : 'Limited budget'}</li>
            <li>{isZh ? '多语言开发' : 'Multi-language development'}</li>
            <li>{isZh ? '喜欢轻量级工具' : 'Prefer lightweight tools'}</li>
            <li>{isZh ? '需要大量扩展' : 'Need extensive extensions'}</li>
            <li>{isZh ? '远程/云端开发' : 'Remote/cloud development'}</li>
            <li>{isZh ? '个人/开源项目' : 'Personal/open source projects'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.webStormBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '专业JavaScript/TypeScript开发' : 'Professional JS/TS development'}</li>
            <li>{isZh ? '大型复杂项目' : 'Large complex projects'}</li>
            <li>{isZh ? '需要高级重构' : 'Need advanced refactoring'}</li>
            <li>{isZh ? '企业团队开发' : 'Enterprise team development'}</li>
            <li>{isZh ? '需要开箱即用体验' : 'Need out-of-box experience'}</li>
            <li>{isZh ? '已使用JetBrains生态系统' : 'Already using JetBrains ecosystem'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/regex-tester'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a>
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
