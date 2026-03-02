'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Figma vs Sketch: Design Tool Comparison 2025',
    intro: 'Figma and Sketch have been the dominant forces in UI/UX design tools. While Sketch pioneered the modern design tool category for Mac, Figma revolutionized collaboration with its browser-based approach. This comprehensive comparison helps designers and developers choose the right tool for their workflow.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Figma wins for team collaboration, cross-platform support, and real-time editing. Sketch excels on macOS with better performance and native integrations. For teams and cross-platform workflows, Figma is the clear choice. For individual Mac-based designers, Sketch remains a powerful option.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Figma is browser-based and cross-platform; Sketch is Mac-only',
    takeaway2: 'Figma offers real-time collaboration and multiplayer editing',
    takeaway3: 'Sketch has better macOS performance and native integrations',
    takeaway4: 'Figma includes prototyping and developer handoff built-in',
    takeaway5: 'Both have extensive plugin ecosystems',
    takeaway6: 'Figma is free for individuals; Sketch requires paid license',
    
    whatIsFigmaTitle: 'What is Figma?',
    whatIsFigmaContent: 'Figma is a browser-based design and prototyping tool launched in 2016. It pioneered real-time collaboration in design tools, allowing multiple designers to work on the same file simultaneously. Built on WebAssembly and WebGL, it runs in any modern browser without installation. Acquired by Adobe in 2022, it continues to lead in collaborative design.',
    
    whatIsSketchTitle: 'What is Sketch?',
    whatIsSketchContent: 'Sketch is a macOS-only vector design tool launched in 2010. It pioneered the modern UI design tool category, replacing Photoshop for many designers. Built natively for Mac using Cocoa frameworks, it offers superior performance and macOS integration. Its plugin ecosystem and symbol-based design system influenced all modern design tools.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the cost structure for both tools:',
    
    platformTitle: 'Platform & System Requirements',
    platformIntro: 'Where and how you can use each tool:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed comparison of core design capabilities:',
    
    collaborationTitle: 'Collaboration Features',
    collaborationIntro: 'Team and sharing capabilities:',
    
    componentsTitle: 'Components & Design Systems',
    componentsIntro: 'How each tool handles reusable design elements:',
    
    prototypingTitle: 'Prototyping Capabilities',
    prototypingIntro: 'Interactive prototype features:',
    
    developerHandoffTitle: 'Developer Handoff',
    developerHandoffIntro: 'Features for design-to-development workflow:',
    
    performanceTitle: 'Performance & System Impact',
    performanceIntro: 'Speed and resource usage comparison:',
    
    whenToUseTitle: 'When to Use Each Tool',
    figmaBestFor: 'Use Figma When:',
    sketchBestFor: 'Use Sketch When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Figma has become the industry standard for most design teams due to its collaboration features and cross-platform support. Sketch remains relevant for Mac-based designers who prioritize performance and native integrations. The choice often depends on team composition and existing workflows. For new teams, Figma offers the most flexibility. For individual Mac designers in Apple-centric environments, Sketch still provides an excellent experience.',
    
    faq1q: 'Can I switch from Sketch to Figma easily?',
    faq1a: 'Yes, Figma can import Sketch files directly. Most elements, including symbols, layer styles, and text styles, are preserved. Some complex features may need adjustment. The transition is generally smooth, and many teams have successfully migrated.',
    
    faq2q: 'Is Sketch dead in 2025?',
    faq2a: 'No, Sketch remains active with regular updates. While Figma has grown market share, Sketch maintains a loyal user base, especially among Mac-based designers. It continues to innovate with features like Sketch for Teams and improved prototyping.',
    
    faq3q: 'Can I use Figma offline?',
    faq3a: 'Figma has limited offline support. You can view and present files offline, but editing requires an internet connection. For offline work, Sketch is the better choice as it works entirely locally.',
    
    faq4q: 'Which is better for large design systems?',
    faq4a: 'Both handle large design systems well. Figma offers better team libraries and real-time updates. Sketch has robust symbol and shared style systems. For distributed teams, Figma is easier to manage. For local teams, both work excellently.',
    
    faq5q: 'Can developers access Figma files for free?',
    faq5a: 'Yes, developers can view, inspect, and export from Figma files for free with a viewer account. They only need a paid seat if they need editing capabilities. This makes developer handoff very cost-effective.',
    
    faq6q: 'Does Sketch have real-time collaboration?',
    faq6a: 'Sketch for Teams offers cloud-based collaboration, but it is not as seamless as Figma real-time editing. Sketch uses a file-based sync approach rather than live multiplayer editing. For real-time collaboration, Figma is superior.',
    
    faq7q: 'Which has better plugin ecosystem?',
    faq7a: 'Both have extensive plugin ecosystems. Sketch pioneered design tool plugins and has mature options. Figma plugins are easier to develop and install. For specific workflows, check if your required plugins exist on your preferred platform.',
    
    faq8q: 'Can I run Sketch on Windows or Linux?',
    faq8a: 'No, Sketch is Mac-only. You can view Sketch files on other platforms using third-party tools or by converting to Figma. For cross-platform teams, this is a significant limitation of Sketch.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Figma vs Sketch：2025设计工具对比',
    intro: 'Figma和Sketch一直是UI/UX设计工具领域的主导力量。Sketch为Mac开创了现代设计工具类别，而Figma通过基于浏览器的方式彻底改变了协作。本全面对比帮助设计师和开发者为工作流程选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Figma在团队协作、跨平台支持和实时编辑方面胜出。Sketch在macOS上以更好的性能和原生集成脱颖而出。对于团队和跨平台工作流程，Figma是明确的选择。对于基于Mac的个人设计师，Sketch仍然是一个强大的选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Figma基于浏览器且跨平台；Sketch仅限Mac',
    takeaway2: 'Figma提供实时协作和多人编辑',
    takeaway3: 'Sketch有更好的macOS性能和原生集成',
    takeaway4: 'Figma内置原型和开发者交付功能',
    takeaway5: '两者都有丰富的插件生态系统',
    takeaway6: 'Figma对个人免费；Sketch需要付费许可证',
    
    whatIsFigmaTitle: '什么是Figma？',
    whatIsFigmaContent: 'Figma是2016年推出的基于浏览器的设计和原型工具。它在设计工具中开创了实时协作，允许多个设计师同时处理同一文件。基于WebAssembly和WebGL构建，无需安装即可在任何现代浏览器中运行。2022年被Adobe收购后，它继续在协作设计领域领先。',
    
    whatIsSketchTitle: '什么是Sketch？',
    whatIsSketchContent: 'Sketch是2010年推出的macOS专用矢量设计工具。它开创了现代UI设计工具类别，为许多设计师取代了Photoshop。使用Cocoa框架为Mac原生构建，提供卓越的性能和macOS集成。其插件生态系统和基于符号的设计系统影响了所有现代设计工具。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解两个工具的成本结构：',
    
    platformTitle: '平台与系统要求',
    platformIntro: '你可以在哪里以及如何使用每个工具：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心设计能力详细对比：',
    
    collaborationTitle: '协作功能',
    collaborationIntro: '团队和共享能力：',
    
    componentsTitle: '组件与设计系统',
    componentsIntro: '每个工具如何处理可复用设计元素：',
    
    prototypingTitle: '原型能力',
    prototypingIntro: '交互原型功能：',
    
    developerHandoffTitle: '开发者交付',
    developerHandoffIntro: '设计到开发工作流程的功能：',
    
    performanceTitle: '性能与系统影响',
    performanceIntro: '速度和资源使用对比：',
    
    whenToUseTitle: '何时使用每个工具',
    figmaBestFor: '使用Figma的场景：',
    sketchBestFor: '使用Sketch的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Figma因其协作功能和跨平台支持已成为大多数设计团队的行业标准。对于优先考虑性能和原生集成的Mac设计师来说，Sketch仍然相关。选择往往取决于团队组成和现有工作流程。对于新团队，Figma提供最大的灵活性。对于Apple为中心环境中的个人Mac设计师，Sketch仍然提供出色的体验。',
    
    faq1q: '我可以轻松从Sketch切换到Figma吗？',
    faq1a: '可以，Figma可以直接导入Sketch文件。大多数元素，包括符号、图层样式和文本样式都会保留。一些复杂功能可能需要调整。转换通常很顺利，许多团队已成功迁移。',
    
    faq2q: '2025年Sketch死了吗？',
    faq2a: '没有，Sketch仍然活跃，定期更新。虽然Figma市场份额增长，但Sketch保持忠实的用户群，特别是在Mac设计师中。它继续通过Sketch for Teams和改进的原型等功能创新。',
    
    faq3q: '我可以离线使用Figma吗？',
    faq3a: 'Figma有有限的离线支持。你可以离线查看和演示文件，但编辑需要网络连接。对于离线工作，Sketch是更好的选择，因为它完全在本地工作。',
    
    faq4q: '哪个更适合大型设计系统？',
    faq4a: '两者都能很好地处理大型设计系统。Figma提供更好的团队库和实时更新。Sketch有强大的符号和共享样式系统。对于分布式团队，Figma更容易管理。对于本地团队，两者都很出色。',
    
    faq5q: '开发者可以免费访问Figma文件吗？',
    faq5a: '可以，开发者可以使用查看者账户免费查看、检查和导出Figma文件。只有需要编辑功能才需要付费席位。这使得开发者交付非常具有成本效益。',
    
    faq6q: 'Sketch有实时协作吗？',
    faq6a: 'Sketch for Teams提供基于云的协作，但不如Figma实时编辑那样无缝。Sketch使用基于文件的同步方法，而不是实时多人编辑。对于实时协作，Figma更胜一筹。',
    
    faq7q: '哪个插件生态系统更好？',
    faq7a: '两者都有丰富的插件生态系统。Sketch开创了设计工具插件，有成熟的选项。Figma插件更容易开发和安装。对于特定工作流程，请检查你需要的插件是否存在于你喜欢的平台上。',
    
    faq8q: '我可以在Windows或Linux上运行Sketch吗？',
    faq8a: '不可以，Sketch仅限Mac。你可以使用第三方工具或转换为Figma在其他平台上查看Sketch文件。对于跨平台团队，这是Sketch的一个重大限制。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function FigmaVsSketch({ lang }: { lang: string }) {
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
      <div style={{ ...boxStyle, borderLeft: '4px solid #a259ff', background: 'linear-gradient(135deg, rgba(162,89,255,0.1), rgba(242,78,30,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#a259ff' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsFigmaTitle}</h3>
      <p style={pStyle}>{ct.whatIsFigmaContent}</p>

      <h3 style={h3Style}>{ct.whatIsSketchTitle}</h3>
      <p style={pStyle}>{ct.whatIsSketchContent}</p>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费版' : 'Free', isZh ? '个人免费（3个项目）' : 'Free for personal (3 projects)', isZh ? '30天试用' : '30-day trial'],
              [isZh ? '专业版' : 'Professional', '$15/编辑者/月', '$99/年/设备'],
              [isZh ? '团队版' : 'Team', '$15-45/编辑者/月', '$99/年/编辑者'],
              [isZh ? '企业版' : 'Enterprise', isZh ? '联系销售' : 'Contact sales', '$299/年/编辑者'],
              [isZh ? '教育版' : 'Education', isZh ? '免费' : 'Free', isZh ? '免费' : 'Free'],
              [isZh ? '查看者' : 'Viewer', isZh ? '免费' : 'Free', isZh ? '免费（iOS/网页）' : 'Free (iOS/Web)'],
            ].map(([plan, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{figma}</td>
                <td style={tdStyle}>{sketch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Platform */}
      <h2 style={h2Style}>{ct.platformTitle}</h2>
      <p style={pStyle}>{ct.platformIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['macOS', isZh ? '浏览器/桌面应用' : 'Browser/Desktop app', '✓ 原生'],
              ['Windows', isZh ? '浏览器/桌面应用' : 'Browser/Desktop app', '✗'],
              ['Linux', isZh ? '浏览器' : 'Browser', '✗'],
              ['iOS', isZh ? '查看应用' : 'Viewer app', isZh ? '查看/镜像应用' : 'Viewer/Mirror app'],
              ['Android', isZh ? '查看应用' : 'Viewer app', '✗'],
              [isZh ? '浏览器' : 'Web Browser', '✓ 主要界面', isZh ? '查看项目' : 'View projects'],
              [isZh ? '离线工作' : 'Offline Work', isZh ? '有限' : 'Limited', '✓'],
            ].map(([platform, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{figma}</td>
                <td style={tdStyle}>{sketch}</td>
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
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '矢量编辑' : 'Vector Editing', '✓', '✓'],
              [isZh ? '布尔运算' : 'Boolean Operations', '✓', '✓'],
              [isZh ? '网格布局' : 'Grid Layout', '✓', '✓'],
              [isZh ? '自动布局' : 'Auto Layout', '✓✓', '✓'],
              [isZh ? '组件' : 'Components', '✓', '✓'],
              [isZh ? '变体' : 'Variants', '✓', '✓'],
              [isZh ? '样式' : 'Styles', '✓', '✓'],
              [isZh ? '图层效果' : 'Layer Effects', '✓', '✓'],
              [isZh ? '图片编辑' : 'Image Editing', isZh ? '基础' : 'Basic', isZh ? '基础' : 'Basic'],
              [isZh ? '3D变换' : '3D Transforms', '✓', '✗'],
            ].map(([feature, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: figma.includes('✓') ? '#22c55e' : undefined }}>{figma}</td>
                <td style={{ ...tdStyle, color: sketch.includes('✓') ? '#22c55e' : undefined }}>{sketch}</td>
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
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '实时协作' : 'Real-time Collaboration', '✓✓✓', isZh ? '有限（云同步）' : 'Limited (cloud sync)'],
              [isZh ? '多人编辑' : 'Multiplayer Editing', '✓', '✗'],
              [isZh ? '评论' : 'Comments', '✓', '✓'],
              [isZh ? '光标显示' : 'Cursor Presence', '✓', '✗'],
              [isZh ? '版本历史' : 'Version History', '✓', '✓'],
              [isZh ? '分支' : 'Branching', '✓', '✗'],
              [isZh ? '共享库' : 'Shared Libraries', '✓✓', '✓'],
              [isZh ? '团队空间' : 'Team Spaces', '✓', '✓'],
              [isZh ? '权限控制' : 'Permission Control', isZh ? '细粒度' : 'Granular', isZh ? '基本' : 'Basic'],
            ].map(([feature, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{figma}</td>
                <td style={tdStyle}>{sketch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Components */}
      <h2 style={h2Style}>{ct.componentsTitle}</h2>
      <p style={pStyle}>{ct.componentsIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #a259ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#a259ff' }}>Figma</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '组件变体' : 'Component variants'}</li>
            <li>{isZh ? '组件属性' : 'Component properties'}</li>
            <li>{isZh ? '实例覆盖' : 'Instance overrides'}</li>
            <li>{isZh ? '团队库' : 'Team libraries'}</li>
            <li>{isZh ? '自动布局组件' : 'Auto-layout components'}</li>
            <li>{isZh ? '组件集' : 'Component sets'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f7b500' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f7b500' }}>Sketch</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '符号系统' : 'Symbol system'}</li>
            <li>{isZh ? '覆盖' : 'Overrides'}</li>
            <isZh ? '嵌套符号' : 'Nested symbols'}</li>
            <li>{isZh ? '共享样式' : 'Shared styles'}</li>
            <li>{isZh ? '符号库' : 'Symbol libraries'}</li>
            <li>{isZh ? '响应式调整' : 'Responsive resizing'}</li>
          </ul>
        </div>
      </div>

      {/* Prototyping */}
      <h2 style={h2Style}>{ct.prototypingTitle}</h2>
      <p style={pStyle}>{ct.prototypingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '交互原型' : 'Interactive Prototypes', '✓', '✓'],
              [isZh ? '智能动画' : 'Smart Animate', '✓', '✓'],
              [isZh ? '过渡效果' : 'Transitions', '✓✓', '✓'],
              [isZh ? '滚动区域' : 'Scrollable Areas', '✓', isZh ? '有限' : 'Limited'],
              [isZh ? '条件逻辑' : 'Conditional Logic', '✓', '✗'],
              [isZh ? '变量' : 'Variables', '✓', '✗'],
              [isZh ? '设备预览' : 'Device Preview', '✓', '✓'],
              [isZh ? '原型分享' : 'Prototype Sharing', '✓', '✓'],
            ].map(([feature, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{figma}</td>
                <td style={tdStyle}>{sketch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Developer Handoff */}
      <h2 style={h2Style}>{ct.developerHandoffTitle}</h2>
      <p style={pStyle}>{ct.developerHandoffIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '代码导出' : 'Code Export', '✓ CSS/iOS/Android', '✓ CSS/iOS/Android'],
              [isZh ? '标注' : 'Measurements', '✓', '✓'],
              [isZh ? '资源导出' : 'Asset Export', '✓', '✓'],
              [isZh ? '开发者模式' : 'Dev Mode', '✓✓', isZh ? '基础' : 'Basic'],
              [isZh ? 'CSS检查器' : 'CSS Inspector', '✓', '✓'],
              [isZh ? 'Zeplin集成' : 'Zeplin Integration', '✓', '✓'],
              [isZh ? 'Storybook集成' : 'Storybook Integration', '✓', '✓'],
              [isZh ? '设计令牌' : 'Design Tokens', '✓', '✓ (插件)'],
            ].map(([feature, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{figma}</td>
                <td style={tdStyle}>{sketch}</td>
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
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动时间' : 'Startup Time', '3-5秒', '1-2秒'],
              [isZh ? '内存使用（空闲）' : 'Memory (idle)', '500-800MB', '200-400MB'],
              [isZh ? '内存使用（大型项目）' : 'Memory (large project)', '1-2GB', '500MB-1GB'],
              [isZh ? 'CPU使用' : 'CPU Usage', isZh ? '中等（依赖网络）' : 'Medium (network)', isZh ? '低' : 'Low'],
              [isZh ? '离线能力' : 'Offline Capability', isZh ? '有限' : 'Limited', isZh ? '完全' : 'Full'],
              [isZh ? '大文件性能' : 'Large File Performance', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '网络依赖' : 'Network Dependency', isZh ? '高' : 'High', isZh ? '低' : 'Low'],
            ].map(([metric, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{figma}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{sketch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #a259ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#a259ff' }}>{ct.figmaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '团队协作设计' : 'Team collaboration'}</li>
            <li>{isZh ? '跨平台团队' : 'Cross-platform teams'}</li>
            <li>{isZh ? '远程/分布式团队' : 'Remote/distributed teams'}</li>
            <li>{isZh ? '需要实时反馈' : 'Need real-time feedback'}</li>
            <li>{isZh ? '预算有限（个人免费）' : 'Budget conscious (free tier)'}</li>
            <li>{isZh ? '需要内置原型' : 'Need built-in prototyping'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f7b500' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f7b500' }}>{ct.sketchBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Mac优先工作流程' : 'Mac-first workflows'}</li>
            <li>{isZh ? '个人设计师' : 'Individual designers'}</li>
            <li>{isZh ? '需要离线工作' : 'Need offline work'}</li>
            <li>{isZh ? 'Apple生态系统集成' : 'Apple ecosystem integration'}</li>
            <li>{isZh ? '性能优先' : 'Performance priority'}</li>
            <li>{isZh ? '现有Sketch工作流程' : 'Existing Sketch workflows'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(162,89,255,0.1), rgba(242,78,30,0.1))', borderRadius: 12, border: '1px solid rgba(162,89,255,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/color-palette-generator'} style={{ color: '#a259ff', textDecoration: 'none' }}>Color Palette Generator</a> • {' '}
        <a href={'/' + lang + '/tools/svg-optimizer'} style={{ color: '#a259ff', textDecoration: 'none' }}>SVG Optimizer</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#a259ff', textDecoration: 'none' }}>Base64 Encoder</a>
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
