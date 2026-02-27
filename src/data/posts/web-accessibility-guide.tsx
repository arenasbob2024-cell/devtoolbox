'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Web Accessibility Guide 2026: WCAG, ARIA, Semantic HTML, and Testing',
    description: 'A comprehensive web accessibility guide covering WCAG 2.1/2.2 guidelines, semantic HTML, ARIA roles and landmarks, keyboard navigation, color contrast, screen reader testing with NVDA/JAWS/VoiceOver, accessible forms, alt text best practices, accessible React components, and testing tools like axe-core, Lighthouse, and WAVE.',
    tldr: 'Web accessibility (a11y) means building websites usable by everyone — including people with visual, motor, auditory, and cognitive disabilities. Follow WCAG 2.1 AA as your baseline: perceivable, operable, understandable, and robust. Use semantic HTML first (nav, main, button, label), add ARIA only when native semantics fall short, ensure 4.5:1 color contrast for normal text, make every interaction keyboard-navigable, and test with real screen readers (NVDA + Firefox, VoiceOver + Safari). Run axe-core in CI to catch 40–60% of issues automatically.',
  },
  zh: {
    title: 'Web 无障碍指南 2026：WCAG、ARIA、语义化 HTML 与测试',
    description: '全面的 Web 无障碍指南，涵盖 WCAG 2.1/2.2 标准、语义化 HTML、ARIA 角色与地标、键盘导航、色彩对比度、屏幕阅读器测试（NVDA/JAWS/VoiceOver）、无障碍表单、替代文本最佳实践、无障碍 React 组件以及 axe-core、Lighthouse、WAVE 等测试工具。',
    tldr: 'Web 无障碍（a11y）是指构建每个人都能使用的网站——包括视觉、运动、听觉和认知障碍用户。以 WCAG 2.1 AA 为基准：可感知、可操作、可理解、健壮。优先使用语义化 HTML（nav、main、button、label），仅在原生语义不足时使用 ARIA，确保普通文本 4.5:1 色彩对比度，使每个交互都可通过键盘操作，并用真实屏幕阅读器（NVDA + Firefox、VoiceOver + Safari）测试。在 CI 中运行 axe-core 可自动发现 40-60% 的问题。',
  },
};

export default function WebAccessibilityGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const faqData = [
    {
      question: isZh ? '什么是 Web 无障碍，为什么它很重要？' : 'What is web accessibility and why does it matter?',
      answer: isZh
        ? 'Web 无障碍（a11y）是指设计和开发网站，使所有人都能平等访问，包括视觉、听觉、运动和认知障碍用户。全球约 15% 的人口患有某种形式的残疾。无障碍不仅是道德责任，在许多国家也是法律要求（如 ADA、WCAG 合规）。同时，无障碍实践通常也能改善所有用户的体验（SEO、移动端可用性、老年用户友好性）。'
        : 'Web accessibility (a11y) means designing and developing websites so that all people can use them equally, including those with visual, auditory, motor, and cognitive disabilities. Approximately 15% of the global population has some form of disability. Accessibility is not only an ethical responsibility but a legal requirement in many countries (ADA, WCAG compliance). Accessibility practices also typically improve the experience for all users — better SEO, mobile usability, and support for aging users.',
    },
    {
      question: isZh ? 'WCAG 2.1 AA 和 WCAG 2.2 有什么区别？' : 'What is the difference between WCAG 2.1 AA and WCAG 2.2?',
      answer: isZh
        ? 'WCAG 2.1（2018年）在 2.0 基础上新增了 17 条标准，重点关注移动端和认知障碍。WCAG 2.2（2023年）在 2.1 基础上新增 9 条标准，包括：焦点外观（Focus Appearance）、拖拽替代方案（Dragging Movements）、目标尺寸（Target Size，AA 要求至少 24x24 CSS 像素）、认知无障碍改进和一致帮助（Consistent Help）。2.2 移除了 4.1.1 解析（Parsing）标准，因为现代浏览器已处理 HTML 错误。大多数法律要求基于 WCAG 2.1 AA 合规。'
        : 'WCAG 2.1 (2018) added 17 criteria to 2.0, focusing on mobile accessibility and cognitive disabilities. WCAG 2.2 (2023) added 9 more criteria including: Focus Appearance, Dragging Movements, Target Size (AA requires at least 24x24 CSS pixels), cognitive accessibility improvements, and Consistent Help. WCAG 2.2 also removed the 4.1.1 Parsing criterion because modern browsers handle HTML errors. Most legal requirements are based on WCAG 2.1 AA compliance.',
    },
    {
      question: isZh ? '什么是 ARIA，什么时候应该使用它？' : 'What is ARIA and when should I use it?',
      answer: isZh
        ? 'ARIA（Accessible Rich Internet Applications）是一组 HTML 属性，用于在原生 HTML 语义不足时向辅助技术传达角色、状态和属性信息。ARIA 使用的首要规则是：尽量使用原生 HTML 元素（如使用 <button> 而非 <div role="button">）。需要 ARIA 的场景：自定义组件（模态框、选项卡、下拉菜单）、动态内容更新（使用 aria-live）、复杂部件（如树形视图、数据网格）、需要额外说明时（aria-describedby）。错误使用 ARIA 比不使用更糟糕。'
        : 'ARIA (Accessible Rich Internet Applications) is a set of HTML attributes that communicate roles, states, and properties to assistive technologies when native HTML semantics are insufficient. The first rule of ARIA is: always use native HTML elements when possible (use <button> not <div role="button">). Use ARIA for: custom components (modals, tabs, dropdowns), dynamic content updates (aria-live), complex widgets (tree views, data grids), and additional descriptions (aria-describedby). Incorrect ARIA is worse than no ARIA.',
    },
    {
      question: isZh ? '色彩对比度要求是什么？' : 'What are the color contrast requirements for accessibility?',
      answer: isZh
        ? 'WCAG 2.1 AA 要求：普通文本（小于 18pt 或 14pt 粗体）对比度至少 4.5:1；大文本（至少 18pt 或 14pt 粗体）对比度至少 3:1；UI 组件和图形对比度至少 3:1。AAA 级别要求普通文本 7:1，大文本 4.5:1。装饰性元素、禁用控件和品牌 Logo 无对比度要求。推荐工具：WebAIM Contrast Checker、Colour Contrast Analyser 桌面应用、浏览器开发工具中的颜色选取器。'
        : 'WCAG 2.1 AA requires: normal text (below 18pt or 14pt bold) at least 4.5:1 contrast ratio; large text (at least 18pt or 14pt bold) at least 3:1; UI components and graphics at least 3:1. AAA level requires 7:1 for normal text and 4.5:1 for large text. Decorative elements, disabled controls, and brand logos have no contrast requirements. Recommended tools: WebAIM Contrast Checker, Colour Contrast Analyser desktop app, and browser DevTools color picker.',
    },
    {
      question: isZh ? '如何使自定义键盘导航可用？' : 'How do I make custom components keyboard accessible?',
      answer: isZh
        ? '键盘导航的关键原则：1) 使用焦点可达的原生元素（button、a、input）或添加 tabindex="0"；2) 为自定义控件实现合适的键盘模式（按钮用 Enter/Space，链接用 Enter，下拉菜单用箭头键）；3) 管理焦点——当模态框打开时移入焦点，关闭时归还焦点，使用焦点陷阱防止 Tab 离开模态框；4) 提供跳过导航链接（skip navigation link）让键盘用户跳过重复内容；5) 确保所有悬停（hover）交互也支持焦点（focus）触发；6) 焦点指示器必须可见（不能使用 outline: none）。'
        : 'Key principles for keyboard navigation: 1) Use focusable native elements (button, a, input) or add tabindex="0"; 2) Implement correct keyboard patterns for custom controls (Enter/Space for buttons, Enter for links, arrow keys for menus); 3) Manage focus — move focus into modals when opened, return it when closed, use focus traps to prevent Tab from leaving the modal; 4) Provide skip navigation links so keyboard users can bypass repeated content; 5) Ensure all hover interactions also trigger on focus; 6) Focus indicators must be visible — never use outline: none.',
    },
    {
      question: isZh ? '如何为图片写好替代文本？' : 'How do I write good alt text for images?',
      answer: isZh
        ? '替代文本规则：1) 信息性图片：描述图片传达的内容（不要以"图片显示"开头，屏幕阅读器会自动宣告这是图片）；2) 装饰性图片：使用空 alt=""，让屏幕阅读器跳过；3) 功能性图片（按钮或链接中的图片）：描述功能，如"关闭对话框"；4) 复杂图片（图表、图形）：提供简短 alt 文本加上详细的长描述；5) 文字图片：alt 文本应包含图片中的文字；6) 不要在 alt 文本中堆砌关键词——对用户和 SEO 都有害。'
        : 'Alt text rules: 1) Informational images: describe what the image conveys (do not start with "image of" — screen readers announce that automatically); 2) Decorative images: use empty alt="" so screen readers skip them; 3) Functional images (in buttons or links): describe the function, e.g. "Close dialog"; 4) Complex images (charts, graphs): provide short alt text plus a detailed long description; 5) Text images: alt text should match the text in the image; 6) Never keyword-stuff alt text — harmful to both users and SEO.',
    },
    {
      question: isZh ? '哪些屏幕阅读器最值得测试？' : 'Which screen readers should I test with?',
      answer: isZh
        ? '推荐测试组合：NVDA（免费，Windows）+ Firefox 是 Windows 上最受欢迎的组合，测试必选；JAWS（Windows，商业软件）是企业环境中使用最广泛的；VoiceOver + Safari 用于 macOS/iOS 测试，Apple 设备内置；TalkBack + Chrome 用于 Android 测试。测试时使用真实的屏幕阅读器，不要只依赖自动化工具。重点检查：标题层级是否合理、表单标签是否清晰、动态内容更新是否宣告、模态框焦点管理、列表和表格的正确读取。'
        : 'Recommended testing combinations: NVDA (free, Windows) + Firefox is the most popular combination on Windows and essential for testing; JAWS (Windows, commercial) is the most widely used in enterprise environments; VoiceOver + Safari for macOS/iOS testing (built into Apple devices); TalkBack + Chrome for Android testing. Always test with real screen readers, not only automated tools. Key areas to check: heading hierarchy, form label clarity, dynamic content announcements, modal focus management, and correct reading of lists and tables.',
    },
    {
      question: isZh ? 'axe-core、WAVE 和 Lighthouse 哪个最好？' : 'Which is better: axe-core, WAVE, or Lighthouse for accessibility testing?',
      answer: isZh
        ? '这三个工具互补而非互斥：axe-core（Deque）是最全面的自动化引擎，误报率低，可集成到 CI/CD 管道（Jest、Cypress、Playwright），最适合日常开发。WAVE 是浏览器扩展，提供最直观的可视化叠加层，帮助识别问题在页面的位置，最适合快速视觉审计。Lighthouse 内置在 Chrome DevTools 中，提供综合性能+无障碍+SEO 评分，方便追踪总体得分趋势。没有任何自动化工具能发现所有问题——自动化测试约能捕获 40-60% 的无障碍问题，其余需要手动测试和屏幕阅读器测试。'
        : 'These three tools are complementary, not competing: axe-core (Deque) is the most comprehensive automated engine with low false positives and integrates into CI/CD pipelines (Jest, Cypress, Playwright) — best for day-to-day development. WAVE is a browser extension providing the most intuitive visual overlay to identify where issues appear on the page — best for quick visual audits. Lighthouse is built into Chrome DevTools and provides an integrated performance + accessibility + SEO score, convenient for tracking overall score trends. No automated tool finds all issues — automation catches about 40–60% of accessibility problems; the rest require manual testing and screen reader testing.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: '1.7' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '优先使用语义化 HTML——它是无障碍的基础，原生元素自带角色、状态和键盘行为。' : 'Semantic HTML first — it is the foundation of accessibility; native elements come with built-in roles, states, and keyboard behaviors.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '遵循 WCAG 2.1 AA 合规标准：4 个原则（POUR）和 50+ 条成功标准，普通文本至少 4.5:1 对比度。' : 'Target WCAG 2.1 AA compliance: 4 principles (POUR) and 50+ success criteria, including at least 4.5:1 contrast for normal text.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'ARIA 是增强工具而非替代品——仅在语义 HTML 无法表达时使用，错误的 ARIA 比没有 ARIA 更有害。' : 'ARIA is an enhancement, not a replacement — use it only when semantic HTML cannot express the needed semantics; incorrect ARIA is worse than no ARIA.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '键盘可访问性是基础——每个交互必须可用键盘完成，焦点指示器必须可见，不要使用 outline: none。' : 'Keyboard accessibility is non-negotiable — every interaction must be operable by keyboard, and focus indicators must always be visible.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '在 CI/CD 中集成 axe-core 进行自动化测试，用真实屏幕阅读器（NVDA、VoiceOver）补充手动测试。' : 'Integrate axe-core in CI/CD for automated testing, supplement with manual testing using real screen readers (NVDA, VoiceOver).'}</li>
          <li style={{ marginBottom: '0', color: '#334155' }}>{isZh ? '无障碍是持续过程而非一次性检查——在设计、开发、QA 的每个阶段都应考虑无障碍性。' : 'Accessibility is an ongoing process, not a one-time audit — consider it at every stage of design, development, and QA.'}</li>
        </ul>
      </div>

      {/* Section 1 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '1. 什么是 Web 无障碍？为何重要？' : '1. What Is Web Accessibility and Why Does It Matter?'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Web 无障碍（Accessibility，缩写 a11y）是指设计和开发网站、Web 应用及数字内容，使所有人都能平等访问和使用，无论其能力、残疾状况或所用辅助技术如何。根据世界卫生组织数据，全球约有 13 亿人（占全球人口约 16%）患有某种形式的残疾，其中包括：视觉障碍（失明、低视力、色盲）、听觉障碍（耳聋、听力损失）、运动障碍（无法使用鼠标，依赖键盘或开关）、认知障碍（阅读障碍、注意力缺陷、记忆障碍）、言语障碍，以及多重障碍组合。'
          : 'Web accessibility (a11y) means designing and developing websites, web applications, and digital content so that all people can access and use them equally, regardless of their abilities, disabilities, or the assistive technologies they use. According to the World Health Organization, approximately 1.3 billion people globally (about 16% of the world population) live with some form of disability, including: visual disabilities (blindness, low vision, color blindness), auditory disabilities (deafness, hearing loss), motor disabilities (inability to use a mouse, reliance on keyboard or switch access), cognitive disabilities (dyslexia, attention deficit, memory impairment), speech disabilities, and combinations of multiple disabilities.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '法律要求' : 'Legal Requirements'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '无障碍在许多国家已成为法律要求。美国《美国残疾人法》（ADA）要求公共场所（包括网站）对残疾人无障碍，多起诉讼已将 WCAG 2.1 AA 确立为实际合规标准。欧盟《无障碍法》（EAA）要求到 2025 年 6 月公共和私营组织的网站和移动应用符合 WCAG 2.1 AA。英国《平等法》、加拿大《无障碍法》（AODA）、澳大利亚《残疾歧视法》等也有类似要求。'
          : 'Accessibility is a legal requirement in many countries. In the United States, the Americans with Disabilities Act (ADA) requires public places, including websites, to be accessible to people with disabilities, and numerous lawsuits have established WCAG 2.1 AA as the de facto compliance standard. The European Union Accessibility Act (EAA) requires websites and mobile apps of public and private organizations to meet WCAG 2.1 AA by June 2025. Similar requirements exist under the UK Equality Act, Canada\'s AODA, and Australia\'s Disability Discrimination Act.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '商业价值' : 'Business Case for Accessibility'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '无障碍带来的商业价值不容忽视：扩大用户群（残疾人群体拥有数万亿美元的消费能力）；改善 SEO（语义化 HTML、替代文本、清晰的结构对搜索引擎友好）；提升所有用户体验（无障碍功能如字幕、键盘导航也让普通用户受益）；减少法律风险（避免昂贵的诉讼和罚款）；提升品牌声誉（展示对包容性的承诺）。研究表明，无障碍网站的整体可用性指标通常也更高。'
          : 'The business case for accessibility is compelling: expanded user base (people with disabilities have trillions of dollars in collective spending power); improved SEO (semantic HTML, alt text, and clear structure benefit search engines); better experience for all users (captions, keyboard navigation, and clear layouts also help general users); reduced legal risk (avoiding costly lawsuits and fines); and improved brand reputation (demonstrating commitment to inclusion). Research consistently shows that accessible websites also have higher overall usability metrics.'}
      </p>

      {/* Section 2 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '2. WCAG 2.1/2.2 标准概览' : '2. WCAG 2.1/2.2 Guidelines Overview'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Web 内容无障碍指南（WCAG）是由 W3C 的 Web 无障碍倡议（WAI）发布的国际标准，为使 Web 内容对残疾人更易访问提供了详细的成功标准。WCAG 基于四个核心原则（POUR）：可感知（Perceivable）、可操作（Operable）、可理解（Understandable）和健壮（Robust）。'
          : 'The Web Content Accessibility Guidelines (WCAG) are international standards published by the W3C\'s Web Accessibility Initiative (WAI), providing detailed success criteria for making web content more accessible to people with disabilities. WCAG is built on four core principles (POUR): Perceivable, Operable, Understandable, and Robust.'}
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700, color: '#1e293b' }}>{isZh ? '原则' : 'Principle'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700, color: '#1e293b' }}>{isZh ? '说明' : 'Description'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700, color: '#1e293b' }}>{isZh ? '关键示例' : 'Key Examples'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { principle: isZh ? '可感知（P）' : 'Perceivable (P)', desc: isZh ? '信息和界面组件必须以用户能感知的方式呈现' : 'Information must be presentable in ways users can perceive', examples: isZh ? '图片 alt 文本、视频字幕、色彩对比度、文本可缩放' : 'Alt text, captions, color contrast, text resize' },
              { principle: isZh ? '可操作（O）' : 'Operable (O)', desc: isZh ? '界面组件和导航必须可操作' : 'UI components and navigation must be operable', examples: isZh ? '键盘访问、无时间限制、无闪烁内容、跳过导航' : 'Keyboard access, no time limits, no seizures, skip links' },
              { principle: isZh ? '可理解（U）' : 'Understandable (U)', desc: isZh ? '信息和界面操作必须可理解' : 'Information and UI operation must be understandable', examples: isZh ? '可读性、可预期行为、输入辅助、错误提示' : 'Readability, predictable behavior, error identification' },
              { principle: isZh ? '健壮（R）' : 'Robust (R)', desc: isZh ? '内容必须足够健壮，能被各种用户代理和辅助技术解析' : 'Content must be robust enough to work with assistive technologies', examples: isZh ? '有效 HTML、ARIA 角色/属性/值正确、兼容性' : 'Valid HTML, correct ARIA usage, compatibility' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a', verticalAlign: 'top' }}>{row.principle}</td>
                <td style={{ padding: '10px 14px', color: '#334155', verticalAlign: 'top' }}>{row.desc}</td>
                <td style={{ padding: '10px 14px', color: '#475569', fontSize: '0.85rem', verticalAlign: 'top' }}>{row.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '合规级别：A、AA、AAA' : 'Conformance Levels: A, AA, and AAA'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'WCAG 定义了三个合规级别。A 级（最低要求）：必须满足，否则某些用户组无法访问内容，共 30 项标准。AA 级（推荐最低要求）：大多数法律和政策要求的级别，共 50 项标准（包含所有 A 级）。AAA 级（最高标准）：提供最佳无障碍体验，但 W3C 不建议将 AAA 作为整站要求，因为某些内容类型无法满足所有 AAA 标准。大多数项目应将 WCAG 2.1 AA 作为最低目标。'
          : 'WCAG defines three conformance levels. Level A (minimum): must be satisfied, otherwise some groups of users cannot access the content at all — 30 criteria total. Level AA (recommended minimum): the level required by most laws and policies — 50 criteria total (includes all Level A criteria). Level AAA (highest): provides the best accessibility, but W3C does not recommend requiring AAA conformance for entire sites since some content types cannot satisfy all AAA criteria. Most projects should target WCAG 2.1 AA as their minimum.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'WCAG 2.2 新增标准' : 'WCAG 2.2 New Criteria'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'WCAG 2.2 于 2023 年 10 月发布，新增了以下关键标准：2.4.11 焦点外观（AA）——焦点指示器必须满足最小尺寸和对比度要求；2.4.12 焦点外观增强（AAA）；2.5.7 拖拽动作（AA）——所有拖拽操作都必须提供替代方法；2.5.8 目标尺寸（AA）——交互目标至少 24x24 CSS 像素；3.2.6 一致帮助（AA）——在多页面中帮助机制的位置必须一致；3.3.7 冗余输入（A）——避免用户在同一会话中重复输入相同信息；3.3.8 无障碍身份验证（AA）；4.1.1 解析已被移除。'
          : 'WCAG 2.2 was published in October 2023, adding key criteria: 2.4.11 Focus Appearance (AA) — focus indicators must meet minimum size and contrast requirements; 2.4.12 Focus Appearance (AAA); 2.5.7 Dragging Movements (AA) — all drag-and-drop operations must have a pointer alternative; 2.5.8 Target Size (AA) — interactive targets must be at least 24x24 CSS pixels; 3.2.6 Consistent Help (AA) — help mechanism placement must be consistent across pages; 3.3.7 Redundant Entry (A) — avoid requiring users to re-enter info in the same session; 3.3.8 Accessible Authentication (AA); and 4.1.1 Parsing has been removed.'}
      </p>

      {/* Section 3 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '3. 无障碍的语义化 HTML' : '3. Semantic HTML for Accessibility'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '语义化 HTML 是 Web 无障碍的基础。原生 HTML 元素自带内置的无障碍功能：正确的角色（role）、可聚焦性（focusability）和键盘交互，无需额外的 JavaScript 或 ARIA。使用语义化元素不仅使代码对辅助技术更友好，也让代码更易于维护和理解。'
          : 'Semantic HTML is the foundation of web accessibility. Native HTML elements come with built-in accessibility features: the correct role, focusability, and keyboard interactions, all without extra JavaScript or ARIA. Using semantic elements makes code more accessible to assistive technologies and also more maintainable and understandable.'}
      </p>

      <pre><code className="language-html">{`<!-- Bad: non-semantic markup -->
<div class="header">
  <div class="nav">
    <div onclick="navigate()">Home</div>
  </div>
</div>
<div class="content">
  <div class="heading">Welcome</div>
  <div class="button" onclick="submit()">Submit</div>
</div>

<!-- Good: semantic HTML -->
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <h1>Welcome</h1>
  <button type="submit">Submit</button>
</main>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '正确的标题层级' : 'Correct Heading Hierarchy'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '标题（h1–h6）是屏幕阅读器用户导航页面的主要方式之一。许多屏幕阅读器提供"标题列表"功能，用户可以快速跳转到特定章节。标题规则：1) 每页只有一个 h1，通常是页面主标题；2) 不要跳过层级（如从 h2 直接跳到 h4）；3) 不要仅因为视觉样式需要而使用标题标签，也不要因为不想要标题样式而避免使用标题标签；4) 用 CSS 控制标题的视觉样式，而非用标题级别控制大小。'
          : 'Headings (h1–h6) are one of the primary ways screen reader users navigate pages. Many screen readers offer a "headings list" feature to jump quickly to specific sections. Heading rules: 1) Only one h1 per page, typically the main page title; 2) Never skip levels (e.g., jumping from h2 to h4); 3) Do not use heading tags purely for visual styling, and do not avoid heading tags because you dislike the default styling; 4) Use CSS to control heading visual style rather than choosing heading levels by size.'}
      </p>

      <pre><code className="language-html">{`<!-- Bad: skipping heading levels -->
<h1>Page Title</h1>
<h3>Section Title</h3>  <!-- skipped h2! -->
<h5>Subsection</h5>    <!-- skipped h4! -->

<!-- Good: logical heading hierarchy -->
<h1>Web Accessibility Guide</h1>
  <h2>WCAG Guidelines</h2>
    <h3>Level A Criteria</h3>
    <h3>Level AA Criteria</h3>
  <h2>Semantic HTML</h2>
    <h3>Heading Hierarchy</h3>
    <h3>Landmark Regions</h3>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'HTML 地标区域' : 'HTML Landmark Regions'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '地标区域为页面提供结构性导航，让屏幕阅读器用户可以跳转到页面的主要区域，而无需逐个 Tab 浏览所有元素。关键地标元素：<header>（页眉）、<nav>（导航）、<main>（主要内容，每页唯一）、<aside>（侧边栏/辅助内容）、<footer>（页脚）、<section>（带标题的内容区块）、<article>（独立内容单元）。当页面有多个同类地标时，用 aria-label 或 aria-labelledby 区分它们。'
          : 'Landmark regions provide structural navigation for pages, allowing screen reader users to jump to major regions without tabbing through every element. Key landmark elements: <header> (page header), <nav> (navigation), <main> (primary content — unique per page), <aside> (sidebar/complementary content), <footer> (page footer), <section> (themed content with a heading), <article> (self-contained content unit). When a page has multiple landmarks of the same type, distinguish them with aria-label or aria-labelledby.'}
      </p>

      <pre><code className="language-html">{`<!-- Complete landmark structure -->
<body>
  <header>
    <nav aria-label="Primary"><!-- main navigation --></nav>
  </header>

  <main id="main-content">
    <h1>Page Title</h1>
    <article>
      <h2>Article Title</h2>
      <p>Content...</p>
    </article>
    <aside aria-label="Related links">
      <!-- sidebar content -->
    </aside>
  </main>

  <footer>
    <nav aria-label="Footer links"><!-- footer navigation --></nav>
  </footer>
</body>`}</code></pre>

      {/* Section 4 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '4. ARIA 角色、属性和地标' : '4. ARIA Roles, Attributes, and Landmarks'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'WAI-ARIA（Accessible Rich Internet Applications）规范定义了一套 HTML 属性，用于增强辅助技术理解动态内容和高级用户界面控件的能力。ARIA 不改变元素的视觉外观或行为，只影响辅助技术如何解读和呈现元素。'
          : 'WAI-ARIA (Accessible Rich Internet Applications) defines a set of HTML attributes that enhance the ability of assistive technologies to understand dynamic content and advanced user interface controls. ARIA does not change the visual appearance or behavior of elements — it only affects how assistive technologies interpret and present them.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'ARIA 使用的五条黄金规则' : 'Five Golden Rules of ARIA Usage'}
      </h3>

      <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: '8px', padding: '16px', marginBottom: '1.5rem' }}>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', color: '#713f12' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '规则 1' : 'Rule 1'}:</strong> {isZh ? '如果可以使用原生 HTML 元素或属性并具有所需的语义和行为，优先使用它。' : 'If you can use a native HTML element with the required semantics and behavior, use it instead of ARIA.'}</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '规则 2' : 'Rule 2'}:</strong> {isZh ? '不要更改原生语义，除非绝对必要。' : 'Do not change native semantics unless absolutely necessary.'}</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '规则 3' : 'Rule 3'}:</strong> {isZh ? '所有交互式 ARIA 控件必须支持键盘操作。' : 'All interactive ARIA controls must be usable with a keyboard.'}</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '规则 4' : 'Rule 4'}:</strong> {isZh ? '不要在可聚焦元素上使用 role="presentation" 或 aria-hidden="true"。' : 'Do not use role="presentation" or aria-hidden="true" on focusable elements.'}</li>
          <li style={{ marginBottom: '0' }}><strong>{isZh ? '规则 5' : 'Rule 5'}:</strong> {isZh ? '所有交互式元素必须有可访问名称（accessible name）。' : 'All interactive elements must have an accessible name.'}</li>
        </ol>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '常用 ARIA 属性' : 'Essential ARIA Attributes'}
      </h3>

      <pre><code className="language-html">{`<!-- aria-label: provide accessible name when visible text is insufficient -->
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>

<!-- aria-labelledby: reference another element as the label -->
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">Confirm Deletion</h2>
  ...
</div>

<!-- aria-describedby: reference additional description -->
<input
  type="password"
  aria-describedby="pwd-requirements"
/>
<p id="pwd-requirements">
  Password must be 8+ characters with a number and symbol.
</p>

<!-- aria-expanded: toggle state -->
<button aria-expanded="false" aria-controls="submenu">
  Products
</button>
<ul id="submenu" hidden>...</ul>

<!-- aria-live: announce dynamic updates -->
<div aria-live="polite" aria-atomic="true">
  <!-- Changes here will be announced -->
</div>

<!-- aria-hidden: hide decorative elements from screen readers -->
<span aria-hidden="true">🎉</span> Congratulations!

<!-- aria-invalid + aria-errormessage: form errors -->
<input aria-invalid="true" aria-errormessage="email-error" />
<p id="email-error" role="alert">Please enter a valid email.</p>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '常用 ARIA 角色' : 'Common ARIA Roles'}
      </h3>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '角色' : 'Role'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '用途' : 'Purpose'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '键盘交互' : 'Keyboard Interaction'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { role: 'alert', purpose: isZh ? '紧急通知，立即宣告' : 'Urgent notification, announced immediately', kb: isZh ? '无（自动宣告）' : 'None (auto-announced)' },
              { role: 'dialog', purpose: isZh ? '对话框/模态框' : 'Dialog / modal', kb: isZh ? 'Tab 循环，Escape 关闭' : 'Tab cycles, Escape closes' },
              { role: 'tablist/tab/tabpanel', purpose: isZh ? '选项卡控件' : 'Tab control', kb: isZh ? '左右箭头切换选项卡' : 'Left/Right arrows switch tabs' },
              { role: 'combobox', purpose: isZh ? '组合框/自动完成' : 'Combobox / autocomplete', kb: isZh ? '箭头导航，Enter 选择' : 'Arrow keys navigate, Enter selects' },
              { role: 'menu/menuitem', purpose: isZh ? '菜单/菜单项' : 'Menu / menu item', kb: isZh ? '箭头导航，Escape 关闭' : 'Arrow keys navigate, Escape closes' },
              { role: 'tree/treeitem', purpose: isZh ? '树形视图' : 'Tree view', kb: isZh ? '箭头展开/折叠' : 'Arrows expand/collapse' },
              { role: 'status', purpose: isZh ? '非紧急状态更新' : 'Non-urgent status update', kb: isZh ? '无（礼貌宣告）' : 'None (polite announcement)' },
              { role: 'progressbar', purpose: isZh ? '进度指示器' : 'Progress indicator', kb: isZh ? '不可聚焦，仅展示' : 'Not focusable, display only' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#7c3aed' }}>{row.role}</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>{row.purpose}</td>
                <td style={{ padding: '10px 14px', color: '#475569', fontSize: '0.85rem' }}>{row.kb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 5 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '5. 键盘导航和焦点管理' : '5. Keyboard Navigation and Focus Management'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '键盘可访问性对于运动障碍用户、使用屏幕阅读器的视觉障碍用户以及偏好键盘操作的高级用户至关重要。所有运动设备、屏幕阅读器都以某种形式模拟键盘输入，因此键盘可访问性是最基础的无障碍要求之一。'
          : 'Keyboard accessibility is essential for users with motor disabilities, visually impaired users who use screen readers, and power users who prefer keyboard navigation. All pointing devices and screen readers simulate keyboard input in some form, making keyboard accessibility one of the most fundamental accessibility requirements.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '跳过导航链接' : 'Skip Navigation Links'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '跳过导航链接允许键盘用户跳过页面顶部重复的导航区域，直接访问主要内容。这对于每页都有相同长导航栏的网站尤其重要。跳过链接通常在视觉上隐藏，但在获得键盘焦点时显示。'
          : 'Skip navigation links allow keyboard users to bypass repeated navigation regions at the top of the page and jump directly to the main content. This is especially important for sites with long navigation bars that repeat on every page. Skip links are typically visually hidden but become visible on keyboard focus.'}
      </p>

      <pre><code className="language-html">{`<!-- Skip link in HTML (place as first element in body) -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
<main id="main-content" tabindex="-1">
  <!-- main content -->
</main>`}</code></pre>

      <pre><code className="language-css">{`/* Skip link CSS: visually hidden until focused */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: #0ea5e9;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  z-index: 9999;
  border-radius: 0 0 4px 4px;
}

.skip-link:focus {
  top: 0;  /* visible when focused */
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '焦点管理模式' : 'Focus Management Patterns'}
      </h3>

      <pre><code className="language-typescript">{`// Focus trap for modal dialogs
function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  element.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift+Tab: backwards
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      // Tab: forwards
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
}

// Move focus when modal opens
function openModal(modal: HTMLElement, triggerButton: HTMLElement) {
  modal.removeAttribute('hidden');
  trapFocus(modal);
  // Focus the first interactive element or the modal heading
  const firstFocusable = modal.querySelector('button, [href], input') as HTMLElement;
  firstFocusable?.focus();

  // Return focus to trigger when closed
  modal.addEventListener('close', () => {
    triggerButton.focus();
  }, { once: true });
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '可见焦点指示器' : 'Visible Focus Indicators'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'WCAG 2.4.7（AA）要求任何键盘可操作的界面都必须有可见的焦点指示器。绝对不要使用 outline: none 或 outline: 0 隐藏焦点轮廓，除非提供了同样可见的替代方案。WCAG 2.2 新增的 2.4.11 焦点外观（AA）要求焦点指示器满足最小尺寸（与组件周长至少 2 CSS 像素的区域）和最小对比度（3:1 相对于相邻颜色）要求。'
          : 'WCAG 2.4.7 (AA) requires any keyboard-operable interface to have a visible focus indicator. Never use outline: none or outline: 0 to remove the focus outline unless providing an equally visible alternative. WCAG 2.2\'s new 2.4.11 Focus Appearance (AA) requires focus indicators to meet minimum size (at least a 2 CSS pixel area around the component perimeter) and contrast (3:1 against adjacent colors) requirements.'}
      </p>

      <pre><code className="language-css">{`/* Accessible focus styles */
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Custom focus style that matches design system */
.btn:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(0, 95, 204, 0.25);
}

/* Remove outline only when using mouse (not keyboard) */
/* :focus-visible handles this automatically in modern browsers */
.btn:focus:not(:focus-visible) {
  outline: none;
}`}</code></pre>

      {/* Section 6 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '6. 色彩对比度和视觉设计' : '6. Color Contrast and Visual Design'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '视觉设计中的无障碍考量远不止色彩对比度，还包括文字大小、间距、运动效果和布局等。但色彩对比度是最常被违反的 WCAG 标准之一，也是最容易自动检测的。'
          : 'Accessibility in visual design goes far beyond color contrast to include text size, spacing, motion, and layout. But color contrast is one of the most frequently violated WCAG criteria and one of the easiest to detect automatically.'}
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '内容类型' : 'Content Type'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? 'AA 要求' : 'AA Requirement'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? 'AAA 要求' : 'AAA Requirement'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: isZh ? '普通文本（<18pt 或 <14pt 粗体）' : 'Normal text (below 18pt or 14pt bold)', aa: '4.5:1', aaa: '7:1' },
              { type: isZh ? '大文本（≥18pt 或 ≥14pt 粗体）' : 'Large text (18pt+ or 14pt+ bold)', aa: '3:1', aaa: '4.5:1' },
              { type: isZh ? 'UI 组件（按钮边框、输入框边框）' : 'UI components (button borders, input borders)', aa: '3:1', aaa: '—' },
              { type: isZh ? '信息性图形（图标、图表）' : 'Informational graphics (icons, charts)', aa: '3:1', aaa: '—' },
              { type: isZh ? '装饰性元素、Logo、禁用控件' : 'Decorative elements, logos, disabled controls', aa: isZh ? '无要求' : 'None', aaa: isZh ? '无要求' : 'None' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px 14px', color: '#334155' }}>{row.type}</td>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{row.aa}</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>{row.aaa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '颜色不是唯一信息载体' : 'Color Must Not Be the Only Visual Cue'}
      </h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'WCAG 1.4.1 要求不能仅用颜色来传达信息（例如红色 = 错误）。色盲用户（约 8% 的男性）可能无法区分颜色。解决方案：除颜色外，还要使用图标、文字说明、下划线、图案等视觉差异来传达信息。例如：表单错误不仅用红色边框，还需错误图标和错误文字；图表中不仅用颜色区分数据系列，还需不同图案或标记形状；链接不仅靠颜色区分，还需下划线。'
          : 'WCAG 1.4.1 requires that color must not be the only visual means of conveying information (e.g., red = error). Users with color blindness (approximately 8% of males) cannot distinguish certain colors. Solutions: in addition to color, use icons, text labels, underlines, patterns, or other visual differences to convey information. Examples: form errors need both a red border AND an error icon with error text; charts need both colors AND different patterns or marker shapes for data series; links need both color AND underline.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '减少动态效果（prefers-reduced-motion）' : 'Respecting prefers-reduced-motion'}
      </h3>

      <pre><code className="language-css">{`/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Or target specific animations */
.spinner {
  animation: spin 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    /* provide alternative static indicator */
  }
}`}</code></pre>

      {/* Section 7 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '7. 屏幕阅读器测试：NVDA、JAWS、VoiceOver' : '7. Screen Reader Testing: NVDA, JAWS, and VoiceOver'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '自动化测试工具最多只能发现约 40-60% 的无障碍问题。真实的屏幕阅读器测试是发现剩余问题不可替代的方法。不同屏幕阅读器的实现细节不同，同一段代码在不同屏幕阅读器中的表现可能有很大差异。'
          : 'Automated testing tools catch at most about 40–60% of accessibility issues. Real screen reader testing is the only way to discover the remaining problems. Different screen readers have different implementation details, and the same code can behave very differently across screen readers.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          {
            name: 'NVDA',
            subtitle: isZh ? 'Windows，免费开源' : 'Windows, Free & Open Source',
            combo: isZh ? '推荐配合 Firefox' : 'Recommended with Firefox',
            commands: ['Insert+Space (speech on/off)', 'H / Shift+H (next/prev heading)', 'F / Shift+F (next/prev form field)', 'B / Shift+B (next/prev button)', 'Insert+F7 (elements list)'],
            color: '#dbeafe',
            border: '#3b82f6',
          },
          {
            name: 'VoiceOver',
            subtitle: isZh ? 'macOS/iOS，内置' : 'macOS/iOS, Built-in',
            combo: isZh ? '推荐配合 Safari' : 'Recommended with Safari',
            commands: ['Cmd+F5 (toggle)', 'VO+A (read all)', 'VO+Right/Left (navigate)', 'VO+U (rotor)', 'VO+Space (activate)'],
            color: '#dcfce7',
            border: '#22c55e',
          },
          {
            name: 'JAWS',
            subtitle: isZh ? 'Windows，商业软件' : 'Windows, Commercial',
            combo: isZh ? '推荐配合 Chrome/Edge' : 'Recommended with Chrome/Edge',
            commands: ['Insert+F5 (forms list)', 'Insert+F6 (headings list)', 'Insert+F7 (links list)', 'H / Shift+H (headings)', 'Tab / Shift+Tab (form fields)'],
            color: '#fef3c7',
            border: '#f59e0b',
          },
        ].map((sr) => (
          <div key={sr.name} style={{ background: sr.color, border: '1px solid ' + sr.border, borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px', color: '#0f172a' }}>{sr.name}</div>
            <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>{sr.subtitle}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>{sr.combo}</div>
            <div style={{ fontSize: '0.8rem', color: '#334155', fontWeight: 600, marginBottom: '4px' }}>{isZh ? '常用快捷键：' : 'Key commands:'}</div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#475569' }}>
              {sr.commands.map((cmd) => (
                <li key={cmd} style={{ marginBottom: '2px' }}><code style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.7)', padding: '1px 4px', borderRadius: '3px' }}>{cmd}</code></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '屏幕阅读器测试清单' : 'Screen Reader Testing Checklist'}
      </h3>

      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '1.5rem' }}>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#334155' }}>
          {(isZh ? [
            '页面标题是否唯一且具有描述性（每个页面不同）',
            '标题层级是否合理（h1→h2→h3，不跳级）',
            '所有图片是否有合适的 alt 文本（装饰性图片使用 alt=""）',
            '表单字段是否有关联的 <label>',
            '错误提示是否被宣告（aria-live 或 role="alert"）',
            '模态框打开时焦点是否移入，关闭时焦点是否返回触发按钮',
            '链接文本是否具有描述性（不要用"点击这里"）',
            '动态内容更新是否通过 aria-live 宣告',
            '表格是否有 <th> 和适当的 scope 属性',
            '使用 Tab 键能否访问所有交互元素',
          ] : [
            'Page title is unique and descriptive (different per page)',
            'Heading hierarchy is logical (h1→h2→h3, no skipping)',
            'All images have appropriate alt text (decorative images use alt="")',
            'Form fields have associated <label> elements',
            'Error messages are announced (aria-live or role="alert")',
            'Modal focus moves in on open, returns to trigger on close',
            'Link text is descriptive (never "click here")',
            'Dynamic content updates are announced via aria-live',
            'Tables have <th> with appropriate scope attributes',
            'All interactive elements are reachable via Tab key',
          ]).map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Section 8 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '8. 无障碍表单：标签、错误和必填字段' : '8. Accessible Forms: Labels, Errors, and Required Fields'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '表单是 Web 上最常见的交互模式，也是最容易出现无障碍问题的地方。无障碍表单需要：清晰的标签、有用的错误提示、必填字段指示、合理的 Tab 顺序以及当前位置的上下文信息。'
          : 'Forms are one of the most common interaction patterns on the web and also one of the most error-prone areas for accessibility. Accessible forms require: clear labels, helpful error messages, required field indicators, logical tab order, and contextual information about the current location in the form.'}
      </p>

      <pre><code className="language-html">{`<!-- Fully accessible form example -->
<form novalidate>
  <!-- Fieldset groups related fields -->
  <fieldset>
    <legend>Personal Information</legend>

    <!-- Explicit label association via for/id -->
    <div>
      <label for="first-name">
        First name
        <span aria-hidden="true" style="color:red">*</span>
        <span class="sr-only">(required)</span>
      </label>
      <input
        type="text"
        id="first-name"
        name="firstName"
        required
        aria-required="true"
        autocomplete="given-name"
      />
    </div>

    <!-- Input with description and error -->
    <div>
      <label for="email">Email address</label>
      <input
        type="email"
        id="email"
        name="email"
        aria-describedby="email-hint email-error"
        aria-invalid="true"
        autocomplete="email"
      />
      <p id="email-hint">We will send a confirmation to this address.</p>
      <p id="email-error" role="alert">
        Please enter a valid email address (e.g. name@example.com).
      </p>
    </div>
  </fieldset>

  <!-- Hidden label for screen-reader-only context -->
  <style>
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  </style>
</form>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '表单错误处理模式' : 'Form Error Handling Patterns'}
      </h3>

      <pre><code className="language-typescript">{`// React accessible form with error handling
import { useState } from 'react';

function AccessibleForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (values: Record<string, string>) => {
    const newErrors: Record<string, string> = {};
    if (!values.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    return newErrors;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const values = Object.fromEntries(new FormData(form));
        const newErrors = validate(values as Record<string, string>);
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          // Move focus to error summary
          document.getElementById('error-summary')?.focus();
        } else {
          setSubmitted(true);
        }
      }}
    >
      {/* Error summary announced on submit */}
      {Object.keys(errors).length > 0 && (
        <div
          id="error-summary"
          role="alert"
          tabIndex={-1}
          style={{ border: '2px solid red', padding: '16px' }}
        >
          <h2>There are {Object.keys(errors).length} errors in this form.</h2>
          <ul>
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>
                <a href={'#' + field}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <label htmlFor="email">Email address</label>
      <input
        type="email"
        id="email"
        name="email"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
      {errors.email && (
        <p id="email-error" style={{ color: 'red' }}>
          {errors.email}
        </p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}`}</code></pre>

      {/* Section 9 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '9. 图片和 Alt 文本最佳实践' : '9. Images and Alt Text Best Practices'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'WCAG 1.1.1（A 级）要求所有非文本内容都必须有文字替代方案。图片 alt 文本的目标是传达图片在当前上下文中传递的信息或功能，而非描述图片本身。不同类型的图片有不同的 alt 文本策略。'
          : 'WCAG 1.1.1 (Level A) requires that all non-text content must have a text alternative. The goal of alt text is to convey the information or function that the image provides in its context, not to describe the image itself. Different types of images require different alt text strategies.'}
      </p>

      <pre><code className="language-html">{`<!-- 1. Informational image: describe what it conveys -->
<img
  src="chart.png"
  alt="Bar chart showing sales growth: Q1 $1.2M, Q2 $1.5M, Q3 $1.8M, Q4 $2.1M"
/>

<!-- 2. Decorative image: empty alt, screen reader skips it -->
<img src="divider-wave.svg" alt="" role="presentation" />

<!-- 3. Functional image (in a link or button) -->
<a href="/home">
  <img src="logo.svg" alt="DevToolBox — go to homepage" />
</a>
<button>
  <img src="search-icon.svg" alt="Search" />
</button>

<!-- 4. Complex image: short alt + long description -->
<figure>
  <img
    src="org-chart.png"
    alt="Company organizational chart — see text description below"
    aria-describedby="org-chart-desc"
  />
  <figcaption id="org-chart-desc">
    The CEO reports to the Board. Direct reports include CTO, CFO, and CMO.
    The CTO oversees Engineering and Design. Engineering has 3 teams...
  </figcaption>
</figure>

<!-- 5. Text in image: alt text matches the text exactly -->
<img src="sale-banner.png" alt="50% off all items — this weekend only" />

<!-- 6. Icon fonts (use aria-label or visually hidden text) -->
<button>
  <span class="icon icon-delete" aria-hidden="true"></span>
  <span class="sr-only">Delete item</span>
</button>

<!-- 7. SVG inline: use title + aria-labelledby -->
<svg aria-labelledby="svg-title" role="img">
  <title id="svg-title">Warning: unsaved changes</title>
  <path d="..." />
</svg>`}</code></pre>

      {/* Section 10 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '10. 无障碍 React 组件' : '10. Accessible React Components'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'React 组件的无障碍性需要在编写时主动考虑。常见的无障碍 React 模式包括：无障碍对话框（Modal）、无障碍下拉菜单（Dropdown）、无障碍选项卡（Tabs）和无障碍通知（Toast/Alert）。'
          : 'Accessibility in React components requires active consideration during development. Common accessible React patterns include accessible modals, accessible dropdown menus, accessible tabs, and accessible toast notifications.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '无障碍模态框（Dialog）' : 'Accessible Modal Dialog'}
      </h3>

      <pre><code className="language-tsx">{`import { useEffect, useRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function AccessibleDialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the element that triggered the dialog
      triggerRef.current = document.activeElement as HTMLElement;
      // Focus the dialog
      dialogRef.current?.focus();
    } else {
      // Return focus to trigger element
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white', padding: '24px',
          borderRadius: '8px', maxWidth: '500px', width: '90%',
        }}
      >
        <h2 id="dialog-title" style={{ marginTop: 0 }}>{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close dialog">
          Close
        </button>
      </div>
    </>
  );
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '无障碍选项卡（Tabs）' : 'Accessible Tabs Component'}
      </h3>

      <pre><code className="language-tsx">{`import { useState, useRef } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

function AccessibleTabs({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const tabCount = tabs.length;
    let nextIndex: number;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabCount;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabCount) % tabCount;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabCount - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    // Move focus to newly active tab
    const tabButtons = tabListRef.current?.querySelectorAll('[role="tab"]');
    (tabButtons?.[nextIndex] as HTMLElement)?.focus();
  };

  return (
    <div>
      <div role="tablist" ref={tabListRef} aria-label="Content sections">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={'tab-' + tab.id}
            aria-selected={activeTab === tab.id}
            aria-controls={'panel-' + tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={'panel-' + tab.id}
          aria-labelledby={'tab-' + tab.id}
          hidden={activeTab !== tab.id}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}`}</code></pre>

      {/* Section 11 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '11. 测试工具：axe-core、Lighthouse 和 WAVE' : '11. Testing Tools: axe-core, Lighthouse, and WAVE'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '建立完善的无障碍测试工具链至关重要。自动化工具、手动测试和屏幕阅读器测试三者缺一不可。以下是主要工具的详细介绍。'
          : 'Building a comprehensive accessibility testing toolchain is essential. Automated tools, manual testing, and screen reader testing are all necessary and complementary. Here is a detailed look at the primary tools.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'axe-core 集成' : 'axe-core Integration'}
      </h3>

      <pre><code className="language-bash">{`# Install axe-core packages
npm install --save-dev @axe-core/react    # React integration
npm install --save-dev jest-axe          # Jest integration
npm install --save-dev @axe-core/playwright  # Playwright integration
npm install --save-dev @axe-core/cli     # CLI scanner`}</code></pre>

      <pre><code className="language-typescript">{`// Jest + jest-axe: unit test accessibility
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <button type="button">Submit form</button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('icon-only button must have accessible name', async () => {
    const { container } = render(
      <button type="button" aria-label="Close dialog">
        <svg aria-hidden="true">...</svg>
      </button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// Playwright + axe-core: end-to-end accessibility testing
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no critical accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'React 开发环境中的 axe-core' : 'axe-core in React Development'}
      </h3>

      <pre><code className="language-typescript">{`// src/main.tsx or src/index.tsx — dev-only a11y logging
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(({ default: axe }) => {
    import('react-dom').then((ReactDOM) => {
      axe(React, ReactDOM, 1000);
      // Violations will appear in browser console
    });
  });
}`}</code></pre>

      {/* Section 12 - Comparison table */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '12. 测试工具对比：axe vs WAVE vs Lighthouse vs Deque' : '12. Testing Tool Comparison: axe vs WAVE vs Lighthouse vs Deque'}
      </h2>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '工具' : 'Tool'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '类型' : 'Type'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? 'CI 集成' : 'CI Integration'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '误报率' : 'False Positives'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '最适合' : 'Best For'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{isZh ? '免费？' : 'Free?'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                tool: 'axe-core',
                type: isZh ? 'JS 引擎 / CLI / 扩展' : 'JS engine / CLI / extension',
                ci: isZh ? '完美支持（Jest、Playwright、Cypress）' : 'Excellent (Jest, Playwright, Cypress)',
                fp: isZh ? '低' : 'Low',
                best: isZh ? 'CI/CD 自动化测试' : 'CI/CD automated testing',
                free: isZh ? '核心免费，axe Pro 收费' : 'Core free, axe Pro paid',
              },
              {
                tool: 'WAVE',
                type: isZh ? '浏览器扩展 / API' : 'Browser extension / API',
                ci: isZh ? '有 API 但不便捷' : 'API available, less convenient',
                fp: isZh ? '中' : 'Medium',
                best: isZh ? '可视化审计、快速检查' : 'Visual audit, quick checks',
                free: isZh ? '扩展免费，API 收费' : 'Extension free, API paid',
              },
              {
                tool: 'Lighthouse',
                type: isZh ? 'DevTools / CLI / CI' : 'DevTools / CLI / CI',
                ci: isZh ? '良好（lighthouse-ci）' : 'Good (lighthouse-ci)',
                fp: isZh ? '低' : 'Low',
                best: isZh ? '整体评分追踪、综合审计' : 'Overall score tracking, combined audits',
                free: isZh ? '完全免费（Google）' : 'Fully free (Google)',
              },
              {
                tool: 'Deque WorldSpace',
                type: isZh ? '企业平台' : 'Enterprise platform',
                ci: isZh ? '支持（企业级）' : 'Supported (enterprise)',
                fp: isZh ? '低' : 'Low',
                best: isZh ? '企业级合规、专业审计' : 'Enterprise compliance, professional audit',
                free: isZh ? '收费' : 'Paid',
              },
              {
                tool: 'IBM Equal Access',
                type: isZh ? '扩展 / npm 包' : 'Extension / npm package',
                ci: isZh ? '支持' : 'Supported',
                fp: isZh ? '中' : 'Medium',
                best: isZh ? 'WCAG 全面覆盖、IBM 标准' : 'WCAG full coverage, IBM standards',
                free: isZh ? '完全免费' : 'Fully free',
              },
              {
                tool: 'Pa11y',
                type: isZh ? 'CLI / Node.js API' : 'CLI / Node.js API',
                ci: isZh ? '良好' : 'Good',
                fp: isZh ? '低' : 'Low',
                best: isZh ? '批量页面测试、CI 管道' : 'Batch page testing, CI pipelines',
                free: isZh ? '开源免费' : 'Open source free',
              },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>{row.tool}</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>{row.type}</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>{row.ci}</td>
                <td style={{ padding: '10px 14px', color: row.fp === 'Low' || row.fp === '低' ? '#16a34a' : '#b45309' }}>{row.fp}</td>
                <td style={{ padding: '10px 14px', color: '#475569', fontSize: '0.85rem' }}>{row.best}</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>{row.free}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 13 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '13. 常见无障碍错误及修复方法' : '13. Common Accessibility Mistakes and How to Fix Them'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'WebAIM 每年发布的百万用户调查（WebAIM Million）显示，超过 95% 的主要网站存在可检测的 WCAG 失败。以下是最常见的无障碍错误及其解决方案。'
          : 'The WebAIM Million annual survey shows that over 95% of major websites have detectable WCAG failures. Here are the most common accessibility mistakes and their solutions.'}
      </p>

      {[
        {
          mistake: isZh ? '缺少图片 alt 文本' : 'Missing image alt text',
          impact: isZh ? '屏幕阅读器读出文件名或宣告"图片"，对视觉障碍用户无意义' : 'Screen reader reads filename or announces "image", meaningless to visually impaired users',
          fix: isZh ? '为所有信息性图片添加描述性 alt 文本，装饰性图片使用 alt=""' : 'Add descriptive alt text to all informational images; use alt="" for decorative images',
        },
        {
          mistake: isZh ? '色彩对比度不足' : 'Insufficient color contrast',
          impact: isZh ? '低视力用户、老年用户、强光下使用的用户无法阅读文字' : 'Hard to read for low vision users, elderly users, or users in bright light',
          fix: isZh ? '使用 WebAIM Contrast Checker 验证，确保文本至少 4.5:1，大文本至少 3:1' : 'Verify with WebAIM Contrast Checker; ensure at least 4.5:1 for normal text, 3:1 for large text',
        },
        {
          mistake: isZh ? '表单字段没有标签' : 'Form fields without labels',
          impact: isZh ? '屏幕阅读器用户不知道输入框的用途，placeholder 不能替代 label' : 'Screen reader users do not know the purpose of the input; placeholder is not a substitute for label',
          fix: isZh ? '始终使用 <label for="id"> 关联标签，或使用 aria-label/aria-labelledby' : 'Always use <label for="id"> to associate labels, or use aria-label/aria-labelledby',
        },
        {
          mistake: isZh ? '空的或无意义的链接文字' : 'Empty or non-descriptive link text',
          impact: isZh ? '"点击这里""更多""阅读"等链接文字在屏幕阅读器链接列表中毫无意义' : '"Click here", "more", "read" are meaningless in screen reader link lists',
          fix: isZh ? '链接文字应描述目标："阅读 Web 无障碍指南"而非"点击这里"' : 'Link text should describe the destination: "Read Web Accessibility Guide" not "click here"',
        },
        {
          mistake: isZh ? '键盘陷阱（无法用 Tab 离开）' : 'Keyboard traps (can\'t Tab away)',
          impact: isZh ? '键盘用户卡在某个组件中无法继续导航页面' : 'Keyboard users get stuck in a component and cannot navigate the rest of the page',
          fix: isZh ? '确保 Escape 键关闭模态框和弹出层，并正确实现焦点管理' : 'Ensure Escape closes modals and overlays, and implement correct focus management',
        },
        {
          mistake: isZh ? '动态内容不宣告' : 'Dynamic content not announced',
          impact: isZh ? '屏幕阅读器用户不知道页面已更新（如错误消息、成功通知、搜索结果）' : 'Screen reader users do not know the page updated (error messages, success notifications, search results)',
          fix: isZh ? '使用 aria-live="polite" 或 role="alert" 宣告动态内容更新' : 'Use aria-live="polite" or role="alert" to announce dynamic content updates',
        },
        {
          mistake: isZh ? '禁用焦点指示器（outline: none）' : 'Disabled focus indicators (outline: none)',
          impact: isZh ? '键盘用户无法看到焦点位置，无法知道自己在页面的哪个位置' : 'Keyboard users cannot see where focus is, unable to know their position on the page',
          fix: isZh ? '移除 outline: none，改用 :focus-visible 伪类提供美观的焦点样式' : 'Remove outline: none; use :focus-visible pseudo-class to provide attractive focus styles',
        },
        {
          mistake: isZh ? '使用 <div> 作为按钮' : 'Using <div> as a button',
          impact: isZh ? 'div 不可键盘聚焦，没有语义角色，屏幕阅读器不会将其识别为按钮' : 'div is not keyboard focusable, has no semantic role, screen readers do not identify it as a button',
          fix: isZh ? '始终使用原生 <button> 元素；如果必须用 div，添加 role="button"、tabindex="0" 和键盘事件处理' : 'Always use native <button>; if div must be used, add role="button", tabindex="0", and keyboard event handling',
        },
      ].map((item, i) => (
        <div key={i} style={{ background: '#fafafa', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ background: '#fee2e2', color: '#dc2626', fontWeight: 700, fontSize: '0.8rem', padding: '2px 8px', borderRadius: '4px' }}>{isZh ? '错误' : 'Mistake'}</span>
            <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>{item.mistake}</strong>
          </div>
          <p style={{ margin: '0 0 6px 0', color: '#475569', fontSize: '0.9rem' }}><strong>{isZh ? '影响：' : 'Impact: '}</strong>{item.impact}</p>
          <p style={{ margin: 0, color: '#334155', fontSize: '0.9rem' }}><strong style={{ color: '#16a34a' }}>{isZh ? '修复：' : 'Fix: '}</strong>{item.fix}</p>
        </div>
      ))}

      {/* Section 14 - FAQ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '常见问题（FAQ）' : 'Frequently Asked Questions (FAQ)'}
      </h2>
      <div style={{ marginBottom: '1.5rem' }}>
        {faqData.map((item, i) => (
          <details key={i} style={{ borderBottom: '1px solid #e2e8f0', padding: '12px 0' }}>
            <summary style={{ fontWeight: 600, color: '#1e293b', cursor: 'pointer', fontSize: '1rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {item.question}
              <span style={{ color: '#94a3b8', marginLeft: '8px', fontSize: '1.2rem' }}>+</span>
            </summary>
            <p style={{ margin: '12px 0 0 0', color: '#334155', lineHeight: '1.7' }}>{item.answer}</p>
          </details>
        ))}
      </div>

      {/* Conclusion */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Web 无障碍不是一项可以推后的"锦上添花"功能，而是构建包容性数字产品的基础。从使用语义化 HTML 开始，遵循 WCAG 2.1 AA 标准，在 CI/CD 中集成 axe-core 自动检测，用真实屏幕阅读器测试，并在整个开发流程中将无障碍性作为必检项。记住：好的无障碍实践通常也是好的开发实践——它使代码更清晰、更易维护、对 SEO 更友好、对所有用户体验更佳。'
          : 'Web accessibility is not an optional "nice-to-have" feature to be added later, but a foundation for building inclusive digital products. Start with semantic HTML, target WCAG 2.1 AA compliance, integrate axe-core in CI/CD for automated detection, test with real screen readers, and make accessibility a required checklist item throughout your entire development process. Remember: good accessibility practice is usually good development practice — it makes code cleaner, more maintainable, better for SEO, and a better experience for all users.'}
      </p>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '无障碍是一个持续改进的过程。不要等到发布前才检查——把无障碍考量融入设计阶段（颜色对比度、焦点状态、键盘流程）、开发阶段（语义化 HTML、ARIA、axe-core）和 QA 阶段（屏幕阅读器测试、键盘测试）。每一小步改进都会产生实质性影响，使真实用户的生活更美好。'
          : 'Accessibility is a journey of continuous improvement. Do not wait until just before launch to check — embed accessibility into the design phase (color contrast, focus states, keyboard flows), the development phase (semantic HTML, ARIA, axe-core), and the QA phase (screen reader testing, keyboard testing). Every small improvement makes a real difference in the lives of real users.'}
      </p>

      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '20px', margin: '24px 0' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 700, color: '#15803d' }}>
          {isZh ? '无障碍实施路线图' : 'Accessibility Implementation Roadmap'}
        </h3>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', color: '#166534' }}>
          <li style={{ marginBottom: '6px' }}><strong>{isZh ? '第 1 周：' : 'Week 1: '}</strong>{isZh ? '运行 axe-core 或 Lighthouse 获取基线分数，修复所有 A 级违规' : 'Run axe-core or Lighthouse for a baseline score; fix all Level A violations'}</li>
          <li style={{ marginBottom: '6px' }}><strong>{isZh ? '第 2 周：' : 'Week 2: '}</strong>{isZh ? '修复色彩对比度问题和表单标签，通过键盘完整测试应用' : 'Fix color contrast issues and form labels; complete keyboard-only test of the app'}</li>
          <li style={{ marginBottom: '6px' }}><strong>{isZh ? '第 3 周：' : 'Week 3: '}</strong>{isZh ? '用 NVDA/VoiceOver 进行屏幕阅读器测试，修复宣告问题' : 'Screen reader test with NVDA/VoiceOver; fix announcement issues'}</li>
          <li style={{ marginBottom: '6px' }}><strong>{isZh ? '第 4 周：' : 'Week 4: '}</strong>{isZh ? '将 axe-core 集成到 CI/CD 管道，防止回归' : 'Integrate axe-core into CI/CD pipeline to prevent regressions'}</li>
          <li style={{ marginBottom: '0' }}><strong>{isZh ? '持续：' : 'Ongoing: '}</strong>{isZh ? '将无障碍审查纳入设计和代码 review，定期进行手动测试' : 'Include accessibility review in design and code reviews; conduct regular manual testing'}</li>
        </ol>
      </div>
    </article>
  );
}
