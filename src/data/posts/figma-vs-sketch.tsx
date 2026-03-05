'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Figma vs Sketch: Design Tool Comparison',
    intro: 'Figma and Sketch are two leading design tools for UI/UX designers. Sketch pioneered the modern design tool on macOS, while Figma revolutionized the space with browser-based collaboration. This comparison examines their features, collaboration capabilities, and suitability for different design workflows.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Figma for real-time collaboration, cross-platform access, and built-in prototyping. Choose Sketch if you are macOS-only, prefer native performance, and work with an established plugin ecosystem. Figma leads in team collaboration; Sketch excels in macOS-native experience.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Figma is browser-based and cross-platform',
    takeaway2: 'Sketch is macOS-only with native performance',
    takeaway3: 'Figma has superior real-time collaboration',
    takeaway4: 'Sketch has a mature plugin ecosystem',
    takeaway5: 'Figma includes built-in prototyping and Dev Mode',
    takeaway6: 'Sketch has better offline capabilities',
    
    whatIsFigmaTitle: 'What is Figma?',
    whatIsFigmaContent: 'Figma is a cloud-based design and prototyping tool launched in 2016. It runs in the browser with optional desktop apps, enabling real-time collaboration similar to Google Docs. Figma offers design, prototyping, design systems, and developer handoff in one platform, used by companies like Uber, Netflix, and Microsoft.',
    
    whatIsSketchTitle: 'What is Sketch?',
    whatIsSketchContent: 'Sketch is a macOS-only vector graphics editor launched in 2010. It pioneered modern UI design tools with features like symbols, artboards, and shared styles. Sketch is known for its native macOS performance, extensive plugin ecosystem, and is widely used in iOS/macOS design workflows.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core design capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Design System Examples',
    codeExampleIntro: 'How each tool handles design systems:',
    
    figmaExampleTitle: 'Figma Design Tokens',
    sketchExampleTitle: 'Sketch Shared Styles',
    
    dataSourceTitle: 'Platform and Performance',
    dataSourceIntro: 'Platform support and performance characteristics:',
    
    alertingTitle: 'Collaboration and Handoff',
    alertingIntro: 'Team collaboration and developer handoff:',
    
    useCasesTitle: 'Best Use Cases',
    figmaBestFor: 'Figma is Best For:',
    sketchBestFor: 'Sketch is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Figma and Sketch represent different philosophies in design tools. Figma excels in collaboration with its browser-based, real-time editing capabilities, making it ideal for distributed teams and cross-platform workflows. Sketch offers a polished macOS-native experience with mature plugins, favored by designers who prefer desktop performance and Apple ecosystem integration. For team collaboration and modern workflows, Figma is the choice. For macOS-centric designers who value native performance, Sketch remains competitive.',
    
    faq1q: 'Can Sketch open Figma files?',
    faq1a: 'Not directly. You need to export Figma designs as SVG or use third-party conversion tools. There are plugins like "Figma to Sketch" that help with migration, but complex designs may not convert perfectly. Consider rebuilding complex components in Sketch.',
    
    faq2q: 'Is Figma free to use?',
    faq2a: 'Figma offers a free Starter plan with up to 3 projects and 30-day version history. Professional plan is $15/editor/month with unlimited projects. Organization and Enterprise plans add advanced features. For individuals and small teams, the free tier is often sufficient.',
    
    faq3q: 'Does Sketch work on Windows or Linux?',
    faq3a: 'No, Sketch is macOS-only. It relies on Apple\'s native technologies and frameworks. For Windows or Linux, designers typically use Figma, Adobe XD, or Lunacy. Sketch has no announced plans for other platforms.',
    
    faq4q: 'Which has better prototyping?',
    faq4a: 'Figma has more comprehensive built-in prototyping with smart animate, interactive components, and advanced transitions. Sketch added prototyping features but relies more on plugins like ProtoPie for advanced interactions. For integrated prototyping, Figma leads.',
    
    faq5q: 'Can I use both tools offline?',
    faq5a: 'Sketch works fully offline as a native app. Figma requires internet for collaboration but has limited offline support in desktop apps. You can view and make limited edits offline in Figma, but full functionality needs connectivity.',
    
    faq6q: 'How do they handle version control?',
    faq6a: 'Figma has built-in version history with named versions and 30-day to unlimited retention depending on plan. Sketch added version history in Sketch 70 but relies more on external version control or iCloud. Figma\'s version control is more accessible.',
    
    faq7q: 'Which has better developer handoff?',
    faq7a: 'Figma Dev Mode provides built-in code generation, specs, and asset export. Developers can inspect designs without a Figma account. Sketch relies on tools like Zeplin or Avocode for handoff, though Sketch has improved its built-in inspect features. Figma has the edge for integrated handoff.',
    
    faq8q: 'What about plugin ecosystems?',
    faq8a: 'Sketch has a more mature plugin ecosystem with thousands of plugins built over a decade. Figma\'s plugin ecosystem is younger but growing rapidly with official plugin API. Both have strong communities, but Sketch plugins cover more niche use cases currently.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Figma vs Sketch：设计工具对比',
    intro: 'Figma 和 Sketch 是 UI/UX 设计师的两个领先设计工具。Sketch 在 macOS 上开创了现代设计工具，而 Figma 通过基于浏览器的协作彻底改变了这个领域。本比较考察它们的功能、协作能力和对不同设计工作流程的适用性。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 Figma 用于实时协作、跨平台访问和内置原型设计。选择 Sketch 如果你仅使用 macOS、喜欢原生性能，并与成熟的插件生态系统一起工作。Figma 在团队协作方面领先；Sketch 在 macOS 原生体验方面表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Figma 基于浏览器且跨平台',
    takeaway2: 'Sketch 仅限 macOS，具有原生性能',
    takeaway3: 'Figma 具有卓越的实时协作',
    takeaway4: 'Sketch 有成熟的插件生态系统',
    takeaway5: 'Figma 包括内置原型设计和开发者模式',
    takeaway6: 'Sketch 有更好的离线能力',
    
    whatIsFigmaTitle: '什么是 Figma？',
    whatIsFigmaContent: 'Figma 是一个基于云的设计和原型工具，于 2016 年推出。它在浏览器中运行，有可选的桌面应用，实现类似 Google Docs 的实时协作。Figma 在一个平台中提供设计、原型设计、设计系统和开发者交付，被 Uber、Netflix 和 Microsoft 等公司使用。',
    
    whatIsSketchTitle: '什么是 Sketch？',
    whatIsSketchContent: 'Sketch 是一个仅限 macOS 的矢量图形编辑器，于 2010 年推出。它通过符号、画板和共享样式等功能开创了现代 UI 设计工具。Sketch 以其原生 macOS 性能、广泛的插件生态系统而闻名，广泛用于 iOS/macOS 设计工作流程。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心设计能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '设计系统示例',
    codeExampleIntro: '每个工具如何处理设计系统：',
    
    figmaExampleTitle: 'Figma 设计令牌',
    sketchExampleTitle: 'Sketch 共享样式',
    
    dataSourceTitle: '平台和性能',
    dataSourceIntro: '平台支持和性能特征：',
    
    alertingTitle: '协作和交付',
    alertingIntro: '团队协作和开发者交付：',
    
    useCasesTitle: '最佳用例',
    figmaBestFor: 'Figma 最适合：',
    sketchBestFor: 'Sketch 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Figma 和 Sketch 代表了设计工具的不同理念。Figma 通过基于浏览器的实时编辑功能在协作方面表现出色，非常适合分布式团队和跨平台工作流程。Sketch 提供精致的原生 macOS 体验和成熟的插件，受到喜欢桌面性能和 Apple 生态系统集成的设计师青睐。对于团队协作和现代工作流程，Figma 是选择。对于以 macOS 为中心并重视原生性能的设计师，Sketch 仍然具有竞争力。',
    
    faq1q: 'Sketch 可以打开 Figma 文件吗？',
    faq1a: '不能直接打开。你需要将 Figma 设计导出为 SVG 或使用第三方转换工具。有像"Figma to Sketch"这样的插件可以帮助迁移，但复杂的设计可能无法完美转换。考虑在 Sketch 中重建复杂的组件。',
    
    faq2q: 'Figma 免费使用吗？',
    faq2a: 'Figma 提供免费的 Starter 计划，最多 3 个项目和 30 天版本历史。专业计划是每编辑者每月 15 美元，项目无限制。组织和企业计划添加高级功能。对于个人和小团队，免费层通常足够。',
    
    faq3q: 'Sketch 可以在 Windows 或 Linux 上工作吗？',
    faq3a: '不可以，Sketch 仅限 macOS。它依赖 Apple 的原生技术和框架。对于 Windows 或 Linux，设计师通常使用 Figma、Adobe XD 或 Lunacy。Sketch 没有宣布其他平台的计划。',
    
    faq4q: '哪个有更好的原型设计？',
    faq4a: 'Figma 有更全面的内置原型设计，具有智能动画、交互式组件和高级过渡。Sketch 添加了原型设计功能，但更多依赖 ProtoPie 等插件进行高级交互。对于集成原型设计，Figma 领先。',
    
    faq5q: '我可以离线使用两个工具吗？',
    faq5a: 'Sketch 作为原生应用可以完全离线工作。Figma 需要互联网进行协作，但桌面应用有有限的离线支持。你可以在 Figma 中离线查看和进行有限的编辑，但完整功能需要连接。',
    
    faq6q: '它们如何处理版本控制？',
    faq6a: 'Figma 具有内置版本历史，带命名版本和 30 天到无限保留期，具体取决于计划。Sketch 在 Sketch 70 中添加了版本历史，但更多依赖外部版本控制或 iCloud。Figma 的版本控制更易于访问。',
    
    faq7q: '哪个有更好的开发者交付？',
    faq7a: 'Figma 开发者模式提供内置代码生成、规格和资源导出。开发者可以在没有 Figma 账户的情况下检查设计。Sketch 依赖 Zeplin 或 Avocode 等工具进行交付，尽管 Sketch 改进了其内置检查功能。对于集成交付，Figma 有优势。',
    
    faq8q: '插件生态系统怎么样？',
    faq8a: 'Sketch 有更成熟的插件生态系统，十年来构建了数千个插件。Figma 的插件生态系统较年轻，但随着官方插件 API 快速增长。两者都有强大的社区，但 Sketch 插件目前覆盖更多小众用例。',
    
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

      <h3 style={h3Style}>{ct.whatIsFigmaTitle}</h3>
      <p style={pStyle}>{ct.whatIsFigmaContent}</p>

      <h3 style={h3Style}>{ct.whatIsSketchTitle}</h3>
      <p style={pStyle}>{ct.whatIsSketchContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '平台支持' : 'Platform', isZh ? '浏览器 + 桌面（跨平台）' : 'Browser + Desktop (cross-platform)', 'macOS only'],
              [isZh ? '实时协作' : 'Real-time Collaboration', isZh ? '内置优秀' : 'Built-in excellent', isZh ? '通过 Sketch Cloud' : 'Via Sketch Cloud'],
              [isZh ? '原型设计' : 'Prototyping', isZh ? '内置强大' : 'Built-in powerful', isZh ? '基础内置' : 'Basic built-in'],
              [isZh ? '组件/符号' : 'Components/Symbols', isZh ? '组件 + 变体' : 'Components + Variants', isZh ? '符号 + 替代' : 'Symbols + Overrides'],
              [isZh ? '自动布局' : 'Auto Layout', isZh ? '强大原生' : 'Powerful native', isZh ? '插件支持' : 'Plugin support'],
              [isZh ? '插件数量' : 'Plugin Count', '1000+', '5000+'],
              [isZh ? '离线工作' : 'Offline Work', isZh ? '有限' : 'Limited', isZh ? '完全支持' : 'Full support'],
              [isZh ? '开发者模式' : 'Dev Mode', isZh ? '内置' : 'Built-in', isZh ? '检查面板' : 'Inspect panel'],
            ].map(([feature, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{figma}</td>
                <td style={tdStyle}>{sketch}</td>
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
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '矢量网络' : 'Vector Networks', isZh ? '支持' : 'Supported', isZh ? '贝塞尔曲线' : 'Bezier curves'],
              [isZh ? '布尔运算' : 'Boolean Operations', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '网格和约束' : 'Grids & Constraints', isZh ? '强大' : 'Powerful', isZh ? '支持' : 'Supported'],
              [isZh ? '库/团队库' : 'Libraries/Team Libraries', isZh ? '团队库' : 'Team Libraries', isZh ? '共享库' : 'Shared Libraries'],
              [isZh ? '版本历史' : 'Version History', isZh ? '内置（30天-无限）' : 'Built-in (30d-unlimited)', isZh ? 'Sketch 70+' : 'Sketch 70+'],
              [isZh ? '评论功能' : 'Comments', isZh ? '内置' : 'Built-in', isZh ? 'Sketch Cloud' : 'Sketch Cloud'],
              [isZh ? '资源导出' : 'Asset Export', isZh ? '多种格式' : 'Multiple formats', isZh ? '多种格式' : 'Multiple formats'],
              [isZh ? '智能动画' : 'Smart Animate', isZh ? '支持' : 'Supported', isZh ? '插件' : 'Plugin'],
            ].map(([cap, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{figma}</td>
                <td style={tdStyle}>{sketch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f24e1e' }}>{ct.figmaExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Figma Design Tokens (via Figma API)\n// Figma uses Team Libraries for design systems\n\n// Example: Color Variables in Figma\n// Create in Figma UI: Local Styles > Colors\n\n// Figma API - Get color styles\n{\n  "meta": {\n    "styles": [\n      {\n        "id": "Primary-500",\n        "name": "Primary/500",\n        "description": "Primary brand color",\n        "styleType": "FILL",\n        "sortPosition": 0\n      },\n      {\n        "id": "Gray-100",\n        "name": "Gray/100",\n        "description": "Light background",\n        "styleType": "FILL",\n        "sortPosition": 1\n      }\n    ]\n  }\n}\n\n// Figma Component with Variants\n// Created in Figma UI using Component Sets\n\n// Button Component Variants:\n// - Button/Primary/Default\n// - Button/Primary/Hover\n// - Button/Primary/Disabled\n// - Button/Secondary/Default\n// - Button/Secondary/Hover\n\n// Figma Auto Layout properties (simplified)\n{\n  "layoutMode": "HORIZONTAL",\n  "primaryAxisSizingMode": "AUTO",\n  "counterAxisSizingMode": "AUTO",\n  "paddingLeft": 16,\n  "paddingRight": 16,\n  "paddingTop": 12,\n  "paddingBottom": 12,\n  "itemSpacing": 8,\n  "primaryAxisAlignItems": "CENTER",\n  "counterAxisAlignItems": "CENTER"\n}'}</code></pre>

      <h3 style={{ ...h3Style, color: '#fdad00' }}>{ct.sketchExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Sketch Shared Styles and Symbols\n// Sketch uses Shared Styles for design systems\n\n// Example: Shared Color Styles\n// Defined in Sketch UI: Layer > Create Shared Style\n\n// Sketch file format (simplified JSON structure)\n{\n  "_class": "document",\n  "do_objectID": "abc-123",\n  "layerStyles": {\n    "_class": "sharedStyleContainer",\n    "objects": [\n      {\n        "_class": "sharedStyle",\n        "do_objectID": "color-primary",\n        "name": "Primary/500",\n        "value": {\n          "_class": "style",\n          "fills": [\n            {\n              "_class": "fill",\n              "color": {\n                "_class": "color",\n                "red": 0.231,\n                "green": 0.510,\n                "blue": 0.965,\n                "alpha": 1\n              }\n            }\n          ]\n        }\n      }\n    ]\n  },\n  "layerSymbols": {\n    "_class": "symbolContainer",\n    "objects": [\n      {\n        "_class": "symbolMaster",\n        "do_objectID": "button-symbol",\n        "name": "Button/Primary",\n        "frame": {\n          "_class": "rect",\n          "width": 120,\n          "height": 44\n        },\n        "overrides": [\n          {\n            "_class": "overrideValue",\n            "overrideName": "buttonText_value",\n            "value": "Click Me"\n          }\n        ]\n      }\n    ]\n  }\n}\n\n// Sketch Library usage\n// Enable in: Preferences > Libraries > Add Library\n\n// Shared Text Styles\n// Create: Type > Create Shared Style\n{\n  "name": "Heading/1",\n  "style": {\n    "fontFamily": "Inter",\n    "fontSize": 32,\n    "fontWeight": 700,\n    "lineHeight": 40,\n    "letterSpacing": 0\n  }\n}'}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f24e1e' }}>
          <strong style={{ color: '#f24e1e' }}>Figma Platform</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '基于浏览器，支持 Windows、macOS、Linux。桌面应用基于 Electron。性能依赖网络，大型文件可能较慢。自动保存到云端，实时同步。' : 'Browser-based, supports Windows, macOS, Linux. Desktop app built on Electron. Performance depends on network, large files may be slow. Auto-saves to cloud with real-time sync.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #fdad00' }}>
          <strong style={{ color: '#fdad00' }}>Sketch Platform</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '仅限 macOS，原生性能。利用 Metal 图形和 Apple 框架。快速流畅，即使大型文件也表现良好。可离线工作，通过 iCloud 或 Sketch Cloud 同步。' : 'macOS-only with native performance. Uses Metal graphics and Apple frameworks. Fast and smooth even with large files. Works offline, syncs via iCloud or Sketch Cloud.'}
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
              <th style={thStyle}>Figma</th>
              <th style={thStyle}>Sketch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '实时编辑' : 'Real-time Editing', isZh ? '多人同时编辑' : 'Multi-user live editing', isZh ? 'Sketch Cloud（有限）' : 'Sketch Cloud (limited)'],
              [isZh ? '评论和反馈' : 'Comments/Feedback', isZh ? '内置评论线程' : 'Built-in comment threads', isZh ? 'Sketch Cloud 评论' : 'Sketch Cloud comments'],
              [isZh ? '开发者检查' : 'Developer Inspect', isZh ? 'Dev Mode 内置' : 'Dev Mode built-in', isZh ? '检查面板' : 'Inspect panel'],
              [isZh ? '代码生成' : 'Code Generation', 'CSS, iOS, Android', isZh ? '基础导出' : 'Basic export'],
              [isZh ? '设计交付' : 'Design Handoff', isZh ? '内置链接分享' : 'Built-in link sharing', isZh ? 'Sketch Cloud + Zeplin' : 'Sketch Cloud + Zeplin'],
              [isZh ? '团队库' : 'Team Libraries', isZh ? '实时更新' : 'Real-time updates', isZh ? '共享库同步' : 'Shared library sync'],
            ].map(([cat, figma, sketch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{figma}</td>
                <td style={tdStyle}>{sketch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f24e1e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f24e1e' }}>{ct.figmaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '分布式团队协作' : 'Distributed team collaboration'}</li>
            <li>{isZh ? '跨平台工作环境' : 'Cross-platform work environments'}</li>
            <li>{isZh ? '需要实时协作' : 'Need real-time collaboration'}</li>
            <li>{isZh ? '集成原型和设计' : 'Integrated prototyping and design'}</li>
            <li>{isZh ? '快速开发者交付' : 'Quick developer handoff'}</li>
            <li>{isZh ? '基于 Web 的设计系统' : 'Web-based design systems'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fdad00' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fdad00' }}>{ct.sketchBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'macOS 和 iOS 设计师' : 'macOS and iOS designers'}</li>
            <li>{isZh ? '需要原生性能' : 'Need native performance'}</li>
            <li>{isZh ? '离线工作需求' : 'Offline work requirements'}</li>
            <li>{isZh ? '成熟插件生态' : 'Mature plugin ecosystem'}</li>
            <li>{isZh ? 'Apple 生态集成' : 'Apple ecosystem integration'}</li>
            <li>{isZh ? '本地化工作流程' : 'Local-based workflow'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/color-converter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Color Converter</a> • {' '}
        <a href={"/" + lang + "/tools/svg-optimizer"} style={{ color: '#3b82f6', textDecoration: 'none' }}>SVG Optimizer</a> • {' '}
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a>
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
