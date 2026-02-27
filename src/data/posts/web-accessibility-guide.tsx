'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Web Accessibility (A11y) Guide: WCAG 2.2, ARIA, Semantic HTML, Screen Readers, Keyboard Navigation & Inclusive Design',
    intro: 'Web accessibility ensures that websites and applications are usable by everyone, including people with visual, auditory, motor, or cognitive disabilities. With over 1.3 billion people worldwide living with some form of disability, accessibility is not just a legal requirement — it is a moral imperative and a business advantage. This guide covers WCAG 2.2 conformance levels, semantic HTML, ARIA attributes, keyboard navigation, screen reader optimization, and testing strategies with practical code examples.',
    tldr: 'Use semantic HTML as your foundation, add ARIA only when native elements fall short, ensure 4.5:1 color contrast, support full keyboard navigation with visible focus indicators, label all form inputs, provide meaningful alt text, and test with axe-core plus real screen readers. WCAG 2.2 AA is the legal baseline for most jurisdictions.',
    keyTitle: 'Key Takeaways',
    key1: 'Semantic HTML provides 80% of accessibility for free — use native elements before reaching for ARIA.',
    key2: 'WCAG 2.2 introduces new success criteria for focus appearance, dragging alternatives, and target size.',
    key3: 'Color contrast ratios must be at least 4.5:1 for normal text and 3:1 for large text (AA level).',
    key4: 'Every interactive element must be keyboard accessible with a visible focus indicator.',
    key5: 'Forms need associated labels, clear error messages, and programmatic validation announcements.',
    key6: 'Test with automated tools (axe, Lighthouse) AND manual testing with screen readers (NVDA, VoiceOver).',
    s1Title: '1. WCAG 2.2 Guidelines & Conformance Levels',
    s1p1: 'The Web Content Accessibility Guidelines (WCAG) 2.2, published by the W3C in October 2023, is the current standard for web accessibility. It builds on WCAG 2.1 with nine new success criteria focused on users with cognitive disabilities, low vision, and mobile device users. WCAG is organized around four principles known as POUR: Perceivable, Operable, Understandable, and Robust.',
    s1p2: 'WCAG defines three conformance levels. Level A covers the minimum baseline — without these, content is fundamentally inaccessible. Level AA is the standard target for most organizations and is referenced by most accessibility laws. Level AAA represents the highest level of accessibility but is not required as a general policy because some content cannot satisfy all AAA criteria.',
    s1p3: 'New in WCAG 2.2: Focus Not Obscured (AA) ensures focused elements are at least partially visible. Dragging Movements (AA) requires alternatives for drag interactions. Target Size Minimum (AA) sets 24x24 CSS pixel minimum for pointer targets. Consistent Help (A) mandates help mechanisms appear in the same relative order. Redundant Entry (A) prevents users from re-entering previously submitted information.',
    s2Title: '2. Semantic HTML Elements & Landmarks',
    s2p1: 'Semantic HTML is the foundation of accessible web development. Native HTML elements carry implicit roles, states, and keyboard behaviors that assistive technologies understand without additional ARIA attributes. A button element is focusable, activatable with Enter and Space, and announced as a button — a div with an onclick handler provides none of these behaviors automatically.',
    s2p2: 'HTML5 landmark elements map directly to ARIA landmark roles and help screen reader users navigate the page structure. The header element maps to role banner, nav to role navigation, main to role main, aside to role complementary, and footer to role contentinfo. Screen readers provide shortcuts to jump between landmarks, making proper use of these elements critical for efficient navigation.',
    s2p3: 'Heading hierarchy communicates document structure. Start with a single h1 per page, then use h2 through h6 in sequential order without skipping levels. Screen reader users often scan pages by heading level — 67.5% of screen reader users report using headings as their primary navigation method according to the WebAIM survey.',
    s3Title: '3. ARIA Roles, States & Properties',
    s3p1: 'Accessible Rich Internet Applications (ARIA) provides attributes that define the role, state, and properties of elements when native HTML semantics are insufficient. The first rule of ARIA is: do not use ARIA if a native HTML element with equivalent semantics exists. ARIA overrides or supplements native semantics but does not change element behavior — adding role button to a div does not make it focusable or keyboard-interactive.',
    s3p2: 'ARIA roles fall into six categories: landmark roles (banner, navigation, main), widget roles (button, tab, dialog, slider), document structure roles (article, heading, list), live region roles (alert, status, log, timer), window roles (dialog, alertdialog), and abstract roles (never use these directly). Common widget roles include tablist/tab/tabpanel for tab interfaces and menu/menuitem for application menus.',
    s3p3: 'ARIA states and properties communicate dynamic information. aria-expanded indicates whether a collapsible section is open. aria-selected marks the active tab. aria-live announces dynamic content updates to screen readers — use polite for non-urgent updates and assertive for critical alerts. aria-describedby links elements to additional descriptive text, such as form field instructions or error messages.',
    s4Title: '4. Keyboard Navigation & Focus Management',
    s4p1: 'All interactive elements must be operable with a keyboard alone. Native interactive elements (a, button, input, select, textarea) are in the tab order by default. Custom interactive elements need tabindex 0 to be added to the natural tab order. Never use tabindex values greater than 0 as they disrupt the natural tab sequence and create a confusing navigation experience.',
    s4p2: 'Focus management is critical for single-page applications and dynamic content. When content changes (route transitions, modal dialogs, form submissions), programmatically move focus to the new content or announcement. Use tabindex negative one to make elements programmatically focusable without adding them to the tab order. Focus trapping in modals prevents keyboard users from tabbing behind the dialog overlay.',
    s4p3: 'A visible focus indicator is required by WCAG 2.2 Focus Appearance (AA). The default browser outline must not be removed without a custom replacement. Focus indicators should have at least a 2px solid outline with a 3:1 contrast ratio against adjacent colors. Consider using :focus-visible instead of :focus to show focus styles only for keyboard navigation, not mouse clicks.',
    s5Title: '5. Screen Reader Optimization',
    s5p1: 'Screen readers translate visual content into speech or braille output. Major screen readers include NVDA (free, Windows), JAWS (commercial, Windows), VoiceOver (built-in, macOS/iOS), and TalkBack (built-in, Android). Each has different interaction modes — NVDA and JAWS use browse mode for reading content and forms/focus mode for interactive elements.',
    s5p2: 'Screen readers announce elements based on their role, name, and state. The accessible name is computed from: content (text inside the element), associated label, aria-label, aria-labelledby, title attribute, or alt attribute. The aria-labelledby attribute takes the highest priority and can reference multiple elements by their IDs. Always ensure every interactive element has an accessible name.',
    s5p3: 'Live regions notify screen readers about dynamic content changes without moving focus. Add aria-live to a container before content changes. The polite value waits for the user to finish their current action before announcing. The assertive value interrupts immediately and should only be used for critical information like error alerts. For status messages, use role status which implies aria-live polite.',
    s6Title: '6. Color Contrast & Visual Accessibility',
    s6p1: 'WCAG 2.2 requires a minimum contrast ratio of 4.5:1 for normal text (under 18pt or 14pt bold) and 3:1 for large text (18pt+ or 14pt+ bold) at Level AA. Level AAA raises these to 7:1 and 4.5:1 respectively. Non-text elements like icons, borders, and focus indicators need at least 3:1 contrast against adjacent colors.',
    s6p2: 'Never rely on color alone to convey information. Links within text need an additional visual indicator beyond color — an underline is the most recognizable. Form validation errors should combine a red color with an icon and text message. Charts and graphs should use patterns or labels in addition to colors to distinguish data series.',
    s6p3: 'Support user preferences with CSS media queries. The prefers-reduced-motion media query allows you to disable or reduce animations for users with vestibular disorders. The prefers-contrast media query lets you increase contrast for users who need it. The prefers-color-scheme query supports dark mode, which many low-vision users prefer.',
    s7Title: '7. Form Accessibility',
    s7p1: 'Every form input must have a programmatically associated label. Use the label element with a for attribute matching the input id, or wrap the input inside the label element. Placeholder text is not a substitute for labels — it disappears when the user types, has low contrast by default, and is not universally supported by assistive technologies.',
    s7p2: 'Group related fields with fieldset and legend elements. Radio buttons and checkboxes within a group should share a fieldset with a descriptive legend. This gives screen reader users context about what the group represents. For complex forms, use aria-describedby to link instructions and help text to their corresponding inputs.',
    s7p3: 'Accessible error handling requires three things: identify the field in error, describe the error clearly, and help the user fix it. Use aria-invalid true on erroneous fields, associate error messages with aria-describedby, and use aria-live or role alert for dynamically displayed errors. Move focus to the first error field on form submission to guide users to the problem.',
    s8Title: '8. Image Alt Text Best Practices',
    s8p1: 'All images must have an alt attribute. Informative images need descriptive alt text that conveys the same information the image provides visually. Decorative images should have an empty alt attribute (alt equals empty string) so screen readers skip them entirely. Never omit the alt attribute — this causes screen readers to announce the file name.',
    s8p2: 'Write effective alt text by describing the content and function, not the appearance. Keep it concise (typically under 125 characters). For complex images like charts or infographics, provide a brief alt text summary and a longer description via aria-describedby or a nearby text element. Background images added via CSS should have their text equivalent in the HTML.',
    s8p3: 'Icon buttons and linked images need alt text that describes the action or destination, not the icon appearance. A search icon button should have alt text like Search, not Magnifying glass. Linked logos should describe the destination: Company Name Home Page. SVG icons should use role img with an aria-label or include a title element inside the SVG.',
    s9Title: '9. Responsive & Mobile Accessibility',
    s9p1: 'WCAG 2.2 requires content to be usable at 320 CSS pixels width without horizontal scrolling (reflow criterion). Text must be resizable up to 200% without loss of content or functionality. Use relative units (rem, em, percentages) instead of fixed pixels for text sizing. Viewport meta tags should not disable user scaling — never use maximum-scale=1 or user-scalable=no.',
    s9p2: 'Touch targets should be at least 44x44 CSS pixels for comfortable use, with a 24x24 minimum per WCAG 2.2. Provide adequate spacing between targets to prevent accidental taps. Gestures that require complex paths (swipe, pinch) must have simple alternatives (buttons, links). Orientation should not be locked unless essential for the application.',
    s9p3: 'Mobile screen readers use touch-based gestures instead of keyboard shortcuts. VoiceOver users swipe left and right to navigate elements, double-tap to activate, and use the rotor for heading and landmark navigation. Ensure all custom components work with these touch gestures. Use native HTML form controls whenever possible as they have the best mobile accessibility support.',
    s10Title: '10. Accessible Tables & Data Visualization',
    s10p1: 'Data tables need proper header markup for screen readers to announce cell context. Use th elements with scope attribute (col or row) to associate headers with cells. Complex tables with multi-level headers should use the id and headers attributes to create explicit associations. Add a caption element or aria-label to describe the table purpose.',
    s10p2: 'Never use tables for layout — use CSS Grid or Flexbox instead. Layout tables confuse screen readers by implying data relationships where none exist. If you must use a table for layout, add role presentation to strip the table semantics. Data tables should include a summary of data trends or provide alternative text representations for screen reader users.',
    s10p3: 'Charts and data visualizations should provide text alternatives. Use aria-label on SVG chart containers. Include a data table as an alternative view that screen readers can access. For interactive charts, ensure keyboard navigation of data points with aria-roledescription and accessible tooltips. Consider using aria-live regions to announce data changes in real-time dashboards.',
    s11Title: '11. Testing with axe, Lighthouse & Screen Readers',
    s11p1: 'Automated testing catches about 30-50% of accessibility issues. Use axe-core (via browser extension or CI integration) as the primary automated testing tool — it has zero false positives and covers WCAG 2.2 criteria. Lighthouse accessibility audit in Chrome DevTools provides a quick overview. pa11y and Tenon are additional CLI-based options for CI pipelines.',
    s11p2: 'Manual testing is essential for catching issues automated tools miss. Test keyboard navigation by using only Tab, Shift+Tab, Enter, Space, Escape, and Arrow keys. Verify focus order is logical and focus indicators are visible. Test with at least one screen reader — VoiceOver on macOS or NVDA on Windows are both free. Check that all interactive elements are announced with correct roles and names.',
    s11p3: 'Build accessibility into your development workflow. Run axe checks in your CI pipeline to catch regressions. Include accessibility acceptance criteria in user stories. Conduct regular audits with real users who use assistive technologies. Use the accessibility tree in Chrome DevTools (Elements panel) to inspect how the browser exposes elements to assistive technologies.',
    s12Title: '12. Common Accessibility Anti-Patterns',
    s12p1: 'Using div or span for interactive elements without adding role, tabindex, and keyboard event handlers is the most common anti-pattern. Div buttons lack keyboard support, screen reader announcements, and native browser behaviors. The fix is simple: use the native button element. Similarly, use native a elements for navigation instead of clickable divs.',
    s12p2: 'Removing the outline on focus (:focus outline none) without providing a custom focus indicator makes keyboard navigation impossible. Autoplaying media with sound violates WCAG. Using tabindex values greater than 0 creates a confusing tab order. Hiding content with display none when it should be available to screen readers (use visually hidden CSS instead).',
    s12p3: 'ARIA overuse is a significant anti-pattern. Adding aria-label to every element, using redundant roles (role button on a button element), or using aria-hidden true on visible interactive elements all degrade the experience. Remember: no ARIA is better than bad ARIA. Use the accessibility tree to verify your ARIA attributes produce the expected result.',
    s13Title: '13. Legal Requirements (ADA, Section 508, EAA)',
    s13p1: 'In the United States, the Americans with Disabilities Act (ADA) Title III has been interpreted by courts to apply to websites as places of public accommodation. Section 508 of the Rehabilitation Act requires federal agencies to make electronic and information technology accessible, explicitly referencing WCAG 2.0 Level AA. The Department of Justice finalized rules in April 2024 requiring state and local governments to meet WCAG 2.1 AA.',
    s13p2: 'The European Accessibility Act (EAA), effective June 2025, requires products and services sold in the EU to be accessible, including websites and mobile applications. EN 301 549 is the European harmonized standard that maps to WCAG 2.1 AA. Canada has the Accessible Canada Act, and Australia enforces the Disability Discrimination Act with WCAG 2.0 as the benchmark.',
    s13p3: 'Web accessibility lawsuits have increased dramatically — over 4,000 ADA-related digital accessibility lawsuits were filed in the US in 2023 alone. Proactive accessibility compliance is significantly cheaper than reactive remediation after a lawsuit. Most accessibility regulations converge on WCAG 2.1 Level AA as the minimum standard, making it the practical target for global compliance.',
    conclusionTitle: 'Conclusion',
    conclusionText: 'Web accessibility is a continuous practice, not a one-time checklist. Start with semantic HTML, add ARIA only when needed, ensure keyboard and screen reader compatibility, maintain color contrast standards, and test regularly with both automated tools and real users. WCAG 2.2 AA should be your minimum target. Accessible websites are not just legally compliant — they are faster, more usable, and reach a broader audience. Every improvement you make benefits all users, not just those with disabilities.',
    faqTitle: 'FAQ',
    faq1q: 'What is the difference between WCAG 2.1 and WCAG 2.2?',
    faq1a: 'WCAG 2.2 adds nine new success criteria to WCAG 2.1, including Focus Not Obscured (AA), Dragging Movements (AA), Target Size Minimum (AA), Consistent Help (A), and Redundant Entry (A). It also removes 4.1.1 Parsing. Sites that meet WCAG 2.2 also meet 2.1 and 2.0.',
    faq2q: 'Is ARIA better than semantic HTML for accessibility?',
    faq2a: 'No. Semantic HTML should always be your first choice. ARIA supplements HTML when native elements are insufficient (custom widgets, live regions). The first rule of ARIA is to not use ARIA if a native HTML element with equivalent behavior exists. ARIA changes semantics but does not add behavior.',
    faq3q: 'What is the minimum color contrast ratio required by WCAG?',
    faq3a: 'WCAG 2.2 Level AA requires 4.5:1 contrast for normal text and 3:1 for large text (18pt+ regular or 14pt+ bold). Level AAA requires 7:1 for normal text and 4.5:1 for large text. Non-text UI components need at least 3:1 contrast.',
    faq4q: 'Do I need to test with a screen reader?',
    faq4a: 'Yes. Automated tools catch only 30-50% of accessibility issues. Manual screen reader testing is essential to verify proper reading order, dynamic content announcements, focus management, and overall user experience. Use VoiceOver on macOS or NVDA on Windows (both free).',
    faq5q: 'Can I use tabindex to control tab order?',
    faq5a: 'Use tabindex 0 to add elements to the natural tab order and tabindex negative one for programmatic focus without tab access. Never use positive tabindex values as they override the DOM order and create confusing navigation. Fix tab order by rearranging DOM elements instead.',
    faq6q: 'How do I make single-page applications accessible?',
    faq6a: 'Manage focus on route changes by moving it to the new content or page heading. Announce route changes with aria-live regions. Ensure browser back button works. Update the document title on each route. Lazy-loaded content should not break tab order or reading flow.',
    faq7q: 'What are the legal consequences of an inaccessible website?',
    faq7a: 'In the US, ADA lawsuits can result in settlements of tens of thousands of dollars plus attorney fees and mandatory remediation. In Europe, the EAA can impose fines from national regulators. Beyond legal risk, inaccessible sites lose an estimated 15-20% of potential customers.',
    faq8q: 'How do I handle accessibility for dynamic content and AJAX updates?',
    faq8a: 'Use aria-live regions to announce dynamic content changes without moving focus. Set aria-live to polite for non-urgent updates (search results updating) and assertive for critical alerts (error messages). Add the aria-live attribute to the container before the content change occurs.',
  },
  zh: {
    title: 'Web 无障碍 (A11y) 指南：WCAG 2.2、ARIA、语义化 HTML、屏幕阅读器、键盘导航与包容性设计',
    intro: 'Web 无障碍确保网站和应用程序对所有人可用，包括视觉、听觉、运动或认知障碍的用户。全球超过13亿人生活在某种形式的残障中，无障碍不仅是法律要求，也是道德义务和商业优势。本指南涵盖 WCAG 2.2 合规级别、语义化 HTML、ARIA 属性、键盘导航、屏幕阅读器优化和测试策略。',
    tldr: '以语义化 HTML 为基础，仅在原生元素不足时添加 ARIA，确保 4.5:1 颜色对比度，支持完整的键盘导航和可见焦点指示器，为所有表单输入添加标签，提供有意义的 alt 文本，并使用 axe-core 和真实屏幕阅读器进行测试。WCAG 2.2 AA 是大多数法律管辖区的基准。',
    keyTitle: '关键要点',
    key1: '语义化 HTML 免费提供 80% 的无障碍能力——先使用原生元素，再考虑 ARIA。',
    key2: 'WCAG 2.2 引入了关于焦点外观、拖拽替代方案和目标尺寸的新成功标准。',
    key3: '颜色对比度至少为 4.5:1（普通文本）和 3:1（大文本），AA 级别。',
    key4: '每个交互元素必须支持键盘操作并有可见的焦点指示器。',
    key5: '表单需要关联标签、清晰的错误消息和程序化的验证公告。',
    key6: '使用自动化工具（axe、Lighthouse）和手动屏幕阅读器（NVDA、VoiceOver）进行测试。',
    s1Title: '1. WCAG 2.2 指南与合规级别',
    s1p1: 'WCAG 2.2 由 W3C 于 2023 年 10 月发布，是当前的 Web 无障碍标准。它在 WCAG 2.1 的基础上增加了九个新的成功标准，围绕四个原则组织：可感知、可操作、可理解和健壮。',
    s1p2: 'WCAG 定义三个合规级别：A 级覆盖最低基线，AA 级是大多数组织的标准目标，AAA 级代表最高级别但不作为通用要求。',
    s1p3: 'WCAG 2.2 新增：焦点不被遮挡（AA）、拖拽动作替代（AA）、最小目标尺寸 24x24 像素（AA）、一致的帮助（A）、冗余输入（A）。',
    s2Title: '2. 语义化 HTML 元素与地标',
    s2p1: '语义化 HTML 是无障碍 Web 开发的基础。原生 HTML 元素携带隐式角色、状态和键盘行为。button 元素可聚焦、可通过 Enter 和 Space 激活——div 加 onclick 不具备这些行为。',
    s2p2: 'HTML5 地标元素直接映射到 ARIA 地标角色：header 对应 banner，nav 对应 navigation，main 对应 main，aside 对应 complementary，footer 对应 contentinfo。',
    s2p3: '标题层次传达文档结构。每页一个 h1，然后按顺序使用 h2 到 h6。67.5% 的屏幕阅读器用户使用标题作为主要导航方式。',
    s3Title: '3. ARIA 角色、状态和属性',
    s3p1: 'ARIA 在原生 HTML 语义不足时提供角色、状态和属性。ARIA 第一规则：如果存在具有等效语义的原生 HTML 元素，就不要使用 ARIA。',
    s3p2: 'ARIA 角色分为六类：地标角色、部件角色、文档结构角色、实时区域角色、窗口角色和抽象角色。',
    s3p3: 'ARIA 状态和属性传达动态信息：aria-expanded 指示折叠区域状态，aria-live 向屏幕阅读器宣告动态内容更新。',
    s4Title: '4. 键盘导航与焦点管理',
    s4p1: '所有交互元素必须仅通过键盘即可操作。使用 tabindex 0 将元素添加到自然 Tab 序列。永远不要使用大于 0 的 tabindex 值。',
    s4p2: '焦点管理对单页应用至关重要。内容变化时需程序化移动焦点。使用 tabindex -1 使元素可编程聚焦。模态框需要焦点陷阱。',
    s4p3: 'WCAG 2.2 要求可见的焦点指示器，至少 2px 实线轮廓，3:1 对比度。考虑使用 :focus-visible 替代 :focus。',
    s5Title: '5. 屏幕阅读器优化',
    s5p1: '主要屏幕阅读器：NVDA（Windows免费）、JAWS（商业）、VoiceOver（macOS/iOS内置）、TalkBack（Android内置）。',
    s5p2: '无障碍名称计算顺序：aria-labelledby > aria-label > label > 内容 > title > alt。确保每个交互元素都有无障碍名称。',
    s5p3: '实时区域在不移动焦点的情况下通知屏幕阅读器。polite 等待用户完成当前操作，assertive 立即中断。',
    s6Title: '6. 颜色对比度与视觉无障碍',
    s6p1: 'AA 级要求普通文本 4.5:1、大文本 3:1 对比度。AAA 级提高到 7:1 和 4.5:1。非文本元素至少需要 3:1。',
    s6p2: '不要仅依靠颜色传达信息。链接需要额外的视觉指示器。表单错误应结合颜色、图标和文本。',
    s6p3: '使用 CSS 媒体查询支持用户偏好：prefers-reduced-motion、prefers-contrast、prefers-color-scheme。',
    s7Title: '7. 表单无障碍',
    s7p1: '每个表单输入必须有程序化关联的标签。占位符文本不能替代标签。',
    s7p2: '使用 fieldset 和 legend 对相关字段分组。使用 aria-describedby 链接说明文本。',
    s7p3: '无障碍错误处理：识别错误字段、描述错误、帮助用户修复。使用 aria-invalid 和 aria-live 通告错误。',
    s8Title: '8. 图片 Alt 文本最佳实践',
    s8p1: '所有图片必须有 alt 属性。信息性图片需要描述性文本，装饰性图片使用空 alt。',
    s8p2: '描述内容和功能而非外观。保持简洁（通常不超过125个字符）。',
    s8p3: '图标按钮描述操作而非图标：搜索按钮的 alt 应为"搜索"而非"放大镜"。',
    s9Title: '9. 响应式与移动端无障碍',
    s9p1: 'WCAG 2.2 要求内容在 320px 宽度下无需水平滚动。文本可放大至 200%。不要禁用用户缩放。',
    s9p2: '触摸目标至少 44x44 像素，最低 24x24。复杂手势需提供简单替代方案。',
    s9p3: '移动屏幕阅读器使用触摸手势。VoiceOver 用户左右滑动导航、双击激活。确保自定义组件支持这些手势。',
    s10Title: '10. 无障碍表格与数据可视化',
    s10p1: '数据表格需要正确的表头标记。使用 th 加 scope 属性。为表格添加 caption 或 aria-label。',
    s10p2: '不要用表格布局。图表和可视化需提供文本替代。',
    s10p3: '交互图表需要键盘导航和无障碍工具提示。考虑使用 aria-live 在实时仪表板中通告数据变化。',
    s11Title: '11. 使用 axe、Lighthouse 和屏幕阅读器测试',
    s11p1: '自动化测试发现 30-50% 的问题。使用 axe-core 作为主要工具。Lighthouse 提供快速概览。',
    s11p2: '手动测试：仅用 Tab、Enter、Space、Escape 和方向键。至少使用一个屏幕阅读器测试。',
    s11p3: '在 CI 管道中运行 axe 检查。在用户故事中包含无障碍验收标准。定期与使用辅助技术的真实用户一起审计。',
    s12Title: '12. 常见无障碍反模式',
    s12p1: '用 div/span 做交互元素是最常见的反模式。解决方案：使用原生 button 和 a 元素。',
    s12p2: '移除焦点轮廓而不提供替代；自动播放有声媒体；使用大于 0 的 tabindex；用 display:none 隐藏屏幕阅读器需要的内容。',
    s12p3: 'ARIA 过度使用：为每个元素添加 aria-label、在 button 上添加冗余的 role=button、对可见元素使用 aria-hidden=true。',
    s13Title: '13. 法律要求（ADA、508条款、EAA）',
    s13p1: '美国 ADA 第三条适用于网站。508 条款要求联邦机构遵循 WCAG 2.0 AA。2024年DOJ规则要求州和地方政府遵循 WCAG 2.1 AA。',
    s13p2: '欧洲无障碍法案（EAA）2025年6月生效，要求网站和移动应用无障碍。EN 301 549 对应 WCAG 2.1 AA。',
    s13p3: '2023年美国提起超过4000起数字无障碍诉讼。主动合规远比被动补救便宜。WCAG 2.1 AA 是全球合规的实际目标。',
    conclusionTitle: '总结',
    conclusionText: 'Web 无障碍是持续的实践，而非一次性清单。从语义化 HTML 开始，仅在需要时添加 ARIA，确保键盘和屏幕阅读器兼容性，保持颜色对比标准，并定期测试。WCAG 2.2 AA 应是最低目标。无障碍网站不仅合法合规，而且更快、更易用、覆盖更广泛的受众。',
    faqTitle: '常见问题',
    faq1q: 'WCAG 2.1 和 2.2 有什么区别？',
    faq1a: 'WCAG 2.2 增加了九个新成功标准，包括焦点不被遮挡、拖拽动作替代和最小目标尺寸。满足 2.2 即满足 2.1 和 2.0。',
    faq2q: 'ARIA 比语义化 HTML 更好吗？',
    faq2a: '不。语义化 HTML 始终是首选。ARIA 在原生元素不足时作为补充。第一规则是如果存在等效的原生元素就不要使用 ARIA。',
    faq3q: '最低颜色对比度要求是多少？',
    faq3a: 'AA 级要求普通文本 4.5:1、大文本 3:1。AAA 级要求 7:1 和 4.5:1。非文本 UI 组件至少 3:1。',
    faq4q: '我需要用屏幕阅读器测试吗？',
    faq4a: '需要。自动化工具仅发现 30-50% 的问题。使用 VoiceOver（macOS）或 NVDA（Windows）进行手动测试。',
    faq5q: '可以用 tabindex 控制 Tab 顺序吗？',
    faq5a: '使用 tabindex=0 和 tabindex=-1。永远不要使用正值 tabindex，通过调整 DOM 顺序来修复 Tab 顺序。',
    faq6q: '如何让单页应用无障碍？',
    faq6a: '在路由变化时管理焦点，使用 aria-live 通告路由变化，确保浏览器返回按钮工作，每次路由更新文档标题。',
    faq7q: '网站不无障碍有什么法律后果？',
    faq7a: '在美国，ADA 诉讼可能导致数万美元赔偿加律师费和强制补救。在欧洲，EAA 可处以罚款。不可访问的网站会损失 15-20% 的潜在客户。',
    faq8q: '如何处理动态内容和 AJAX 更新的无障碍？',
    faq8a: '使用 aria-live 区域通告动态内容变化。非紧急使用 polite，紧急警报使用 assertive。在内容变化前添加 aria-live 属性。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' as const, fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left' as const, padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };

export default function WebAccessibilityGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
      { '@type': 'Question', name: t.faq7q, acceptedAnswer: { '@type': 'Answer', text: t.faq7a } },
      { '@type': 'Question', name: t.faq8q, acceptedAnswer: { '@type': 'Answer', text: t.faq8a } },
    ],
  };

  return (
    <article style={{ maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px 20px', marginBottom: 24, borderRadius: '0 8px 8px 0' }}>
        <strong style={{ color: '#0369a1' }}>TL;DR: </strong>
        <span style={{ color: '#0c4a6e' }}>{t.tldr}</span>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px 20px', marginBottom: 24, borderRadius: 8 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>{t.keyTitle}</h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-secondary)', lineHeight: 1.9 }}>
          <li>{t.key1}</li><li>{t.key2}</li><li>{t.key3}</li>
          <li>{t.key4}</li><li>{t.key5}</li><li>{t.key6}</li>
        </ul>
      </div>

      <p style={pStyle}>{t.intro}</p>

      {/* Section 1: WCAG 2.2 */}
      <h2 style={h2Style}>{t.s1Title}</h2>
      <p style={pStyle}>{t.s1p1}</p>
      <p style={pStyle}>{t.s1p2}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Level</th>
            <th style={thStyle}>Criteria Count</th>
            <th style={thStyle}>Target Audience</th>
            <th style={thStyle}>Legal Requirement</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['A', '30', 'Minimum baseline', 'Required everywhere'],
            ['AA', '24', 'Standard target', 'ADA, Section 508, EAA'],
            ['AAA', '33', 'Enhanced accessibility', 'Not generally required'],
          ].map(([level, count, audience, legal], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{level}</td>
              <td style={tdStyle}>{count}</td>
              <td style={tdStyle}>{audience}</td>
              <td style={tdStyle}>{legal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={pStyle}>{t.s1p3}</p>

      {/* Section 2: Semantic HTML */}
      <h2 style={h2Style}>{t.s2Title}</h2>
      <p style={pStyle}>{t.s2p1}</p>
      <h3 style={h3Style}>Semantic vs Non-Semantic HTML</h3>
      <pre style={codeStyle}><code>{'<!-- BAD: Non-semantic (inaccessible) -->\n'
        + '<div class="header">\n'
        + '  <div class="nav">\n'
        + '    <div onclick="navigate(\'/home\')">Home</div>\n'
        + '    <div onclick="navigate(\'/about\')">About</div>\n'
        + '  </div>\n'
        + '</div>\n'
        + '<div class="main">\n'
        + '  <div class="title">Page Title</div>\n'
        + '  <div class="btn" onclick="submit()">Submit</div>\n'
        + '</div>\n\n'
        + '<!-- GOOD: Semantic (accessible) -->\n'
        + '<header>\n'
        + '  <nav aria-label="Main navigation">\n'
        + '    <a href="/home">Home</a>\n'
        + '    <a href="/about">About</a>\n'
        + '  </nav>\n'
        + '</header>\n'
        + '<main>\n'
        + '  <h1>Page Title</h1>\n'
        + '  <button type="submit">Submit</button>\n'
        + '</main>'}</code></pre>
      <p style={pStyle}>{t.s2p2}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>HTML Element</th>
            <th style={thStyle}>ARIA Landmark Role</th>
            <th style={thStyle}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['<header>', 'banner', 'Site-wide header content'],
            ['<nav>', 'navigation', 'Navigation links'],
            ['<main>', 'main', 'Primary page content'],
            ['<aside>', 'complementary', 'Supporting content'],
            ['<footer>', 'contentinfo', 'Site-wide footer content'],
            ['<section>', 'region (with label)', 'Thematic grouping'],
            ['<form>', 'form (with label)', 'User input form'],
          ].map(([el, role, purpose], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{el}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{role}</td>
              <td style={tdStyle}>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={pStyle}>{t.s2p3}</p>

      {/* Section 3: ARIA */}
      <h2 style={h2Style}>{t.s3Title}</h2>
      <p style={pStyle}>{t.s3p1}</p>
      <h3 style={h3Style}>ARIA Tab Interface Example</h3>
      <pre style={codeStyle}><code>{'<!-- Accessible tab component with ARIA -->\n'
        + '<div role="tablist" aria-label="Product info">\n'
        + '  <button role="tab"\n'
        + '    id="tab-details"\n'
        + '    aria-selected="true"\n'
        + '    aria-controls="panel-details"\n'
        + '    tabindex="0">Details</button>\n'
        + '  <button role="tab"\n'
        + '    id="tab-reviews"\n'
        + '    aria-selected="false"\n'
        + '    aria-controls="panel-reviews"\n'
        + '    tabindex="-1">Reviews</button>\n'
        + '  <button role="tab"\n'
        + '    id="tab-shipping"\n'
        + '    aria-selected="false"\n'
        + '    aria-controls="panel-shipping"\n'
        + '    tabindex="-1">Shipping</button>\n'
        + '</div>\n\n'
        + '<div role="tabpanel"\n'
        + '  id="panel-details"\n'
        + '  aria-labelledby="tab-details"\n'
        + '  tabindex="0">\n'
        + '  <p>Product details content here.</p>\n'
        + '</div>\n\n'
        + '<!-- Keyboard: Arrow keys between tabs,\n'
        + '     Tab key moves into active panel -->'}</code></pre>
      <p style={pStyle}>{t.s3p2}</p>
      <p style={pStyle}>{t.s3p3}</p>
      <h3 style={h3Style}>aria-live Regions</h3>
      <pre style={codeStyle}><code>{'<!-- Status message (polite) -->\n'
        + '<div aria-live="polite" aria-atomic="true">\n'
        + '  3 results found for "accessibility"\n'
        + '</div>\n\n'
        + '<!-- Error alert (assertive) -->\n'
        + '<div role="alert">\n'
        + '  <!-- role="alert" implies assertive -->\n'
        + '  Payment failed. Check your card details.\n'
        + '</div>\n\n'
        + '<!-- Progress update -->\n'
        + '<div role="status">\n'
        + '  <!-- role="status" implies polite -->\n'
        + '  Uploading: 67% complete\n'
        + '</div>'}</code></pre>

      {/* Section 4: Keyboard Navigation */}
      <h2 style={h2Style}>{t.s4Title}</h2>
      <p style={pStyle}>{t.s4p1}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Key</th>
            <th style={thStyle}>Action</th>
            <th style={thStyle}>Element Type</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Tab', 'Move to next focusable element', 'All interactive'],
            ['Shift + Tab', 'Move to previous element', 'All interactive'],
            ['Enter', 'Activate link or button', 'Links, buttons'],
            ['Space', 'Toggle button/checkbox', 'Buttons, checkboxes'],
            ['Escape', 'Close dialog or dropdown', 'Modals, menus'],
            ['Arrow keys', 'Navigate within widget', 'Tabs, menus, radios'],
          ].map(([key, action, type], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600, fontFamily: 'monospace' }}>{key}</td>
              <td style={tdStyle}>{action}</td>
              <td style={tdStyle}>{type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={pStyle}>{t.s4p2}</p>
      <h3 style={h3Style}>Focus Trap for Modal Dialog</h3>
      <pre style={codeStyle}><code>{'function trapFocus(dialog) {\n'
        + '  const focusable = dialog.querySelectorAll(\n'
        + '    \'button, [href], input, select,\' +\n'
        + '    \' textarea, [tabindex]:not([tabindex="-1"])\'\n'
        + '  );\n'
        + '  const first = focusable[0];\n'
        + '  const last = focusable[focusable.length - 1];\n\n'
        + '  dialog.addEventListener(\'keydown\', (e) => {\n'
        + '    if (e.key !== \'Tab\') return;\n\n'
        + '    if (e.shiftKey) {\n'
        + '      if (document.activeElement === first) {\n'
        + '        e.preventDefault();\n'
        + '        last.focus();\n'
        + '      }\n'
        + '    } else {\n'
        + '      if (document.activeElement === last) {\n'
        + '        e.preventDefault();\n'
        + '        first.focus();\n'
        + '      }\n'
        + '    }\n'
        + '  });\n\n'
        + '  first.focus();\n'
        + '}'}</code></pre>
      <p style={pStyle}>{t.s4p3}</p>
      <h3 style={h3Style}>Focus Indicator CSS</h3>
      <pre style={codeStyle}><code>{'/* Custom focus indicator (WCAG 2.2) */\n'
        + ':focus-visible {\n'
        + '  outline: 2px solid #2563eb;\n'
        + '  outline-offset: 2px;\n'
        + '  border-radius: 2px;\n'
        + '}\n\n'
        + '/* High contrast for dark backgrounds */\n'
        + '.dark-section :focus-visible {\n'
        + '  outline: 2px solid #fbbf24;\n'
        + '  outline-offset: 2px;\n'
        + '}'}</code></pre>

      {/* Section 5: Screen Readers */}
      <h2 style={h2Style}>{t.s5Title}</h2>
      <p style={pStyle}>{t.s5p1}</p>
      <p style={pStyle}>{t.s5p2}</p>
      <h3 style={h3Style}>Visually Hidden (Screen Reader Only)</h3>
      <pre style={codeStyle}><code>{'.sr-only {\n'
        + '  position: absolute;\n'
        + '  width: 1px;\n'
        + '  height: 1px;\n'
        + '  padding: 0;\n'
        + '  margin: -1px;\n'
        + '  overflow: hidden;\n'
        + '  clip: rect(0, 0, 0, 0);\n'
        + '  white-space: nowrap;\n'
        + '  border: 0;\n'
        + '}\n\n'
        + '/* Usage: visible to screen readers only */\n'
        + '<button>\n'
        + '  <svg aria-hidden="true"><!-- icon --></svg>\n'
        + '  <span class="sr-only">Close dialog</span>\n'
        + '</button>'}</code></pre>
      <p style={pStyle}>{t.s5p3}</p>

      {/* Section 6: Color Contrast */}
      <h2 style={h2Style}>{t.s6Title}</h2>
      <p style={pStyle}>{t.s6p1}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>WCAG Level</th>
            <th style={thStyle}>Normal Text</th>
            <th style={thStyle}>Large Text</th>
            <th style={thStyle}>UI Components</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['AA (required)', '4.5:1', '3:1', '3:1'],
            ['AAA (enhanced)', '7:1', '4.5:1', 'N/A'],
          ].map(([level, normal, large, ui], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{level}</td>
              <td style={tdStyle}>{normal}</td>
              <td style={tdStyle}>{large}</td>
              <td style={tdStyle}>{ui}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={pStyle}>{t.s6p2}</p>
      <p style={pStyle}>{t.s6p3}</p>
      <h3 style={h3Style}>Respecting User Preferences</h3>
      <pre style={codeStyle}><code>{'/* Reduce or disable animations */\n'
        + '@media (prefers-reduced-motion: reduce) {\n'
        + '  *, *::before, *::after {\n'
        + '    animation-duration: 0.01ms !important;\n'
        + '    transition-duration: 0.01ms !important;\n'
        + '    scroll-behavior: auto !important;\n'
        + '  }\n'
        + '}\n\n'
        + '/* Increase contrast when requested */\n'
        + '@media (prefers-contrast: more) {\n'
        + '  :root {\n'
        + '    --text-color: #000000;\n'
        + '    --bg-color: #ffffff;\n'
        + '    --border-color: #000000;\n'
        + '  }\n'
        + '}\n\n'
        + '/* Dark mode support */\n'
        + '@media (prefers-color-scheme: dark) {\n'
        + '  :root {\n'
        + '    --text-color: #f1f5f9;\n'
        + '    --bg-color: #0f172a;\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Section 7: Form Accessibility */}
      <h2 style={h2Style}>{t.s7Title}</h2>
      <p style={pStyle}>{t.s7p1}</p>
      <h3 style={h3Style}>Accessible Form Example</h3>
      <pre style={codeStyle}><code>{'<form novalidate>\n'
        + '  <fieldset>\n'
        + '    <legend>Contact Information</legend>\n\n'
        + '    <label for="email">Email address</label>\n'
        + '    <input\n'
        + '      type="email"\n'
        + '      id="email"\n'
        + '      name="email"\n'
        + '      required\n'
        + '      aria-describedby="email-hint email-error"\n'
        + '      aria-invalid="false"\n'
        + '    />\n'
        + '    <span id="email-hint">\n'
        + '      We will never share your email.\n'
        + '    </span>\n'
        + '    <span id="email-error" role="alert"></span>\n'
        + '  </fieldset>\n\n'
        + '  <fieldset>\n'
        + '    <legend>Preferred contact method</legend>\n'
        + '    <label>\n'
        + '      <input type="radio" name="contact"\n'
        + '        value="email" /> Email\n'
        + '    </label>\n'
        + '    <label>\n'
        + '      <input type="radio" name="contact"\n'
        + '        value="phone" /> Phone\n'
        + '    </label>\n'
        + '  </fieldset>\n\n'
        + '  <button type="submit">Send message</button>\n'
        + '</form>'}</code></pre>
      <p style={pStyle}>{t.s7p2}</p>
      <p style={pStyle}>{t.s7p3}</p>
      <h3 style={h3Style}>Error Handling Pattern</h3>
      <pre style={codeStyle}><code>{'function handleSubmit(form) {\n'
        + '  const errors = validate(form);\n'
        + '  if (errors.length === 0) return true;\n\n'
        + '  // Clear previous errors\n'
        + '  form.querySelectorAll(\'[aria-invalid]\').forEach(\n'
        + '    el => el.setAttribute(\'aria-invalid\', \'false\')\n'
        + '  );\n\n'
        + '  // Mark fields with errors\n'
        + '  errors.forEach(({ fieldId, message }) => {\n'
        + '    const field = document.getElementById(fieldId);\n'
        + '    const errorEl = document.getElementById(\n'
        + '      fieldId + \'-error\'\n'
        + '    );\n'
        + '    field.setAttribute(\'aria-invalid\', \'true\');\n'
        + '    errorEl.textContent = message;\n'
        + '  });\n\n'
        + '  // Focus first error field\n'
        + '  document.getElementById(\n'
        + '    errors[0].fieldId\n'
        + '  ).focus();\n'
        + '  return false;\n'
        + '}'}</code></pre>

      {/* Section 8: Image Alt Text */}
      <h2 style={h2Style}>{t.s8Title}</h2>
      <p style={pStyle}>{t.s8p1}</p>
      <p style={pStyle}>{t.s8p2}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Image Type</th>
            <th style={thStyle}>Alt Text Approach</th>
            <th style={thStyle}>Example</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Informative', 'Describe content/function', 'alt="Bar chart: 40% Q4 revenue increase"'],
            ['Decorative', 'Empty alt attribute', 'alt=""'],
            ['Linked image', 'Describe destination', 'alt="Company Name - Homepage"'],
            ['Icon button', 'Describe action', 'alt="Search" (not "Magnifying glass")'],
            ['Complex chart', 'Brief summary + long desc', 'alt="Q4 sales" + aria-describedby'],
            ['Text in image', 'Reproduce the text', 'alt="50% OFF Summer Sale"'],
          ].map(([type, approach, example], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
              <td style={tdStyle}>{approach}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={pStyle}>{t.s8p3}</p>
      <pre style={codeStyle}><code>{'<!-- SVG icon with accessibility -->\n'
        + '<button>\n'
        + '  <svg role="img" aria-label="Delete item"\n'
        + '    viewBox="0 0 24 24">\n'
        + '    <title>Delete item</title>\n'
        + '    <path d="M6 19c0 1.1.9 2 2 2h8..." />\n'
        + '  </svg>\n'
        + '</button>\n\n'
        + '<!-- Decorative SVG (hidden from AT) -->\n'
        + '<svg aria-hidden="true" focusable="false">\n'
        + '  <use href="#decorative-divider" />\n'
        + '</svg>'}</code></pre>

      {/* Section 9: Responsive & Mobile */}
      <h2 style={h2Style}>{t.s9Title}</h2>
      <p style={pStyle}>{t.s9p1}</p>
      <p style={pStyle}>{t.s9p2}</p>
      <pre style={codeStyle}><code>{'<!-- BAD: Prevents user from zooming -->\n'
        + '<meta name="viewport"\n'
        + '  content="width=device-width,\n'
        + '  initial-scale=1, maximum-scale=1,\n'
        + '  user-scalable=no" />\n\n'
        + '<!-- GOOD: Allows user zoom -->\n'
        + '<meta name="viewport"\n'
        + '  content="width=device-width,\n'
        + '  initial-scale=1" />\n\n'
        + '/* Touch target sizing */\n'
        + '.touch-target {\n'
        + '  min-width: 44px;\n'
        + '  min-height: 44px;\n'
        + '  padding: 12px;\n'
        + '}\n\n'
        + '/* Ensure text reflows at 320px */\n'
        + '.content {\n'
        + '  max-width: 100%;\n'
        + '  overflow-wrap: break-word;\n'
        + '}'}</code></pre>
      <p style={pStyle}>{t.s9p3}</p>

      {/* Section 10: Tables & Data Viz */}
      <h2 style={h2Style}>{t.s10Title}</h2>
      <p style={pStyle}>{t.s10p1}</p>
      <h3 style={h3Style}>Accessible Data Table</h3>
      <pre style={codeStyle}><code>{'<table>\n'
        + '  <caption>\n'
        + '    Quarterly Revenue (USD millions)\n'
        + '  </caption>\n'
        + '  <thead>\n'
        + '    <tr>\n'
        + '      <th scope="col">Quarter</th>\n'
        + '      <th scope="col">Revenue</th>\n'
        + '      <th scope="col">Growth</th>\n'
        + '    </tr>\n'
        + '  </thead>\n'
        + '  <tbody>\n'
        + '    <tr>\n'
        + '      <th scope="row">Q1 2025</th>\n'
        + '      <td>12.4</td>\n'
        + '      <td>+8%</td>\n'
        + '    </tr>\n'
        + '    <tr>\n'
        + '      <th scope="row">Q2 2025</th>\n'
        + '      <td>14.1</td>\n'
        + '      <td>+13.7%</td>\n'
        + '    </tr>\n'
        + '  </tbody>\n'
        + '</table>'}</code></pre>
      <p style={pStyle}>{t.s10p2}</p>
      <p style={pStyle}>{t.s10p3}</p>

      {/* Section 11: Testing */}
      <h2 style={h2Style}>{t.s11Title}</h2>
      <p style={pStyle}>{t.s11p1}</p>
      <h3 style={h3Style}>Automated Testing with axe-core</h3>
      <pre style={codeStyle}><code>{'// axe-core in Cypress E2E tests\n'
        + 'describe(\'Accessibility\', () => {\n'
        + '  it(\'has no a11y violations\', () => {\n'
        + '    cy.visit(\'/\');\n'
        + '    cy.injectAxe();\n'
        + '    cy.checkA11y(null, {\n'
        + '      runOnly: {\n'
        + '        type: \'tag\',\n'
        + '        values: [\'wcag2a\', \'wcag2aa\',\n'
        + '          \'wcag22aa\']\n'
        + '      }\n'
        + '    });\n'
        + '  });\n'
        + '});\n\n'
        + '// axe-core in Jest unit tests\n'
        + 'import { axe, toHaveNoViolations }\n'
        + '  from \'jest-axe\';\n'
        + 'expect.extend(toHaveNoViolations);\n\n'
        + 'test(\'form is accessible\', async () => {\n'
        + '  const { container } = render(<LoginForm />);\n'
        + '  const results = await axe(container);\n'
        + '  expect(results).toHaveNoViolations();\n'
        + '});'}</code></pre>
      <p style={pStyle}>{t.s11p2}</p>
      <p style={pStyle}>{t.s11p3}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Tool</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Platform</th>
            <th style={thStyle}>Best For</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['axe DevTools', 'Extension', 'Chrome/Firefox', 'Quick page audits'],
            ['axe-core', 'CI/CD lib', 'Node.js', 'Regression testing'],
            ['Lighthouse', 'Built-in', 'Chrome DevTools', 'Quick audit scores'],
            ['NVDA', 'Screen reader', 'Windows (free)', 'Manual SR testing'],
            ['VoiceOver', 'Screen reader', 'macOS/iOS', 'Mac/mobile testing'],
            ['pa11y', 'CLI tool', 'Node.js', 'CI pipeline'],
          ].map(([tool, type, platform, best], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{tool}</td>
              <td style={tdStyle}>{type}</td>
              <td style={tdStyle}>{platform}</td>
              <td style={tdStyle}>{best}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 12: Anti-Patterns */}
      <h2 style={h2Style}>{t.s12Title}</h2>
      <p style={pStyle}>{t.s12p1}</p>
      <h3 style={h3Style}>Common Mistakes & Fixes</h3>
      <pre style={codeStyle}><code>{'<!-- Anti-pattern: clickable div -->\n'
        + '<div class="btn" onclick="save()">\n'
        + '  Save\n'
        + '</div>\n'
        + '<!-- Fix: use native button -->\n'
        + '<button type="button" onclick="save()">\n'
        + '  Save\n'
        + '</button>\n\n'
        + '<!-- Anti-pattern: missing label -->\n'
        + '<input type="text" placeholder="Search..." />\n'
        + '<!-- Fix: add associated label -->\n'
        + '<label for="search">Search</label>\n'
        + '<input type="text" id="search"\n'
        + '  placeholder="Search..." />\n\n'
        + '<!-- Anti-pattern: redundant ARIA -->\n'
        + '<button role="button"\n'
        + '  aria-label="Submit button">\n'
        + '  Submit\n'
        + '</button>\n'
        + '<!-- Fix: remove unnecessary ARIA -->\n'
        + '<button type="submit">Submit</button>'}</code></pre>
      <p style={pStyle}>{t.s12p2}</p>
      <p style={pStyle}>{t.s12p3}</p>

      {/* Section 13: Legal */}
      <h2 style={h2Style}>{t.s13Title}</h2>
      <p style={pStyle}>{t.s13p1}</p>
      <p style={pStyle}>{t.s13p2}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Regulation</th>
            <th style={thStyle}>Region</th>
            <th style={thStyle}>Standard</th>
            <th style={thStyle}>Effective</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['ADA Title III', 'United States', 'WCAG 2.1 AA', 'Active'],
            ['Section 508', 'US Federal', 'WCAG 2.0 AA', 'Active'],
            ['EAA', 'European Union', 'WCAG 2.1 AA', 'June 2025'],
            ['AODA', 'Ontario, Canada', 'WCAG 2.0 AA', 'Active'],
            ['DDA', 'Australia', 'WCAG 2.0 AA', 'Active'],
          ].map(([reg, region, standard, effective], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{reg}</td>
              <td style={tdStyle}>{region}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{standard}</td>
              <td style={tdStyle}>{effective}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={pStyle}>{t.s13p3}</p>

      {/* Conclusion */}
      <h2 style={h2Style}>{t.conclusionTitle}</h2>
      <p style={pStyle}>{t.conclusionText}</p>

      {/* FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a], [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a], [t.faq6q, t.faq6a], [t.faq7q, t.faq7a], [t.faq8q, t.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3 style={h3Style}>{q}</h3>
          <p style={pStyle}>{a}</p>
        </div>
      ))}
    </article>
  );
}
