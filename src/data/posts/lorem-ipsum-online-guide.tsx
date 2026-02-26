'use client';
import Link from 'next/link';
import React from 'react';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'Lorem Ipsum Generator Online Guide: History, Usage, Alternatives & Best Practices',
    intro: 'Lorem Ipsum is the most widely used placeholder text in the design and development world. For over 500 years, it has been the industry standard dummy text used to fill layouts, test typography, and preview designs before final content is ready. This comprehensive guide covers everything you need to know about Lorem Ipsum: its fascinating origins tracing back to Cicero in 45 BC, why designers and developers rely on placeholder text, how to generate Lorem Ipsum programmatically in JavaScript, Python, and Ruby, popular alternatives like Hipster Ipsum and Bacon Ipsum, best practices for using placeholder text effectively, integration with design tools like Figma and Sketch, accessibility considerations, when you should avoid Lorem Ipsum entirely, and how to generate realistic placeholder data for more meaningful prototypes.',

    tldrTitle: 'TL;DR',
    tldr1: 'Lorem Ipsum originated from a work by Cicero written in 45 BC, making it over 2,000 years old.',
    tldr2: 'Designers use it because it mimics natural language patterns without distracting from visual design.',
    tldr3: 'Generate Lorem Ipsum in JavaScript with a simple array of sentences and a random selection function.',
    tldr4: 'Alternatives like Hipster Ipsum, Bacon Ipsum, and Corporate Ipsum add personality to your mockups.',
    tldr5: 'Never use Lorem Ipsum in production. Always replace placeholder text before launching.',
    tldr6: 'For forms and data-heavy UIs, use realistic fake data generators like Faker.js instead.',

    keyTitle: 'Key Takeaways',
    key1: 'Lorem Ipsum has been the typesetting industry standard since the 1500s when an unknown printer scrambled type to make a specimen book.',
    key2: 'Placeholder text lets designers focus on layout, typography, and visual hierarchy without content bias.',
    key3: 'Programmatic generation in JavaScript, Python, and Ruby gives developers fine-grained control over paragraph count, word count, and format.',
    key4: 'Fun alternatives exist for every taste: Hipster Ipsum, Bacon Ipsum, Pirate Ipsum, Corporate Ipsum, and more.',
    key5: 'Accessibility audits should always use real content. Screen readers will read Lorem Ipsum aloud, confusing users.',
    key6: 'For data-intensive prototypes, combine Lorem Ipsum for text blocks with Faker.js for names, emails, addresses, and dates.',

    historyTitle: '1. What Is Lorem Ipsum and Where Does It Come From?',
    historyDesc: 'Lorem Ipsum is dummy text that has been used by the printing and typesetting industry as standard placeholder text since the 1500s. But its roots go much deeper than the Renaissance.',
    historyOrigin: 'The Classical Origins',
    historyOriginP1: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2,000 years old. The text comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Marcus Tullius Cicero. This philosophical work was a treatise on the theory of ethics, very popular during the Renaissance.',
    historyOriginP2: 'The standard Lorem Ipsum passage has been used since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It survived five centuries of typesetting, the transition to electronic typesetting in the 1960s, and the desktop publishing revolution of the 1980s with software like Aldus PageMaker.',
    historyStandard: 'The Standard Passage',
    historyStandardP1: 'The most commonly used Lorem Ipsum passage begins with "Lorem ipsum dolor sit amet, consectetur adipiscing elit." This opening has become so iconic that it is instantly recognized by designers and developers worldwide. The word "Lorem" itself is a truncated form of "dolorem," meaning "pain" in Latin.',
    historyModern: 'Lorem Ipsum in the Digital Age',
    historyModernP1: 'With the rise of web design, Lorem Ipsum found a new home in digital prototyping. Every major design tool, CMS platform, and development framework includes built-in Lorem Ipsum generation or plugin support. It remains the de facto standard for placeholder text because it closely approximates the look and feel of real English text without carrying any distracting meaning.',

    whyTitle: '2. Why Designers and Developers Use Placeholder Text',
    whyDesc: 'Using placeholder text is not laziness. It is a deliberate design strategy that serves multiple important purposes in the development workflow.',
    whyPoint1: 'Focus on Visual Design: Real content can distract stakeholders from evaluating layout, color, typography, and spacing. Lorem Ipsum keeps the focus on design decisions.',
    whyPoint2: 'Test Typography: Placeholder text reveals how different fonts, sizes, line heights, and letter spacing look with realistic text patterns. Single words or "text here" do not test the same way.',
    whyPoint3: 'Prevent Content Bias: When reviewers see real content, they instinctively start editing the words instead of evaluating the design. Dummy text prevents this "content trap."',
    whyPoint4: 'Fill Variable-Length Content Areas: Blog cards, testimonial sections, and product descriptions all have variable content. Lorem Ipsum lets you test both short and long content scenarios.',
    whyPoint5: 'Speed Up Prototyping: Waiting for final copy slows down the design process. Placeholder text lets designers move fast and iterate without content bottlenecks.',
    whyPoint6: 'Maintain Confidentiality: In client work, using placeholder text avoids accidentally sharing sensitive or unreleased content during the review process.',
    whyCta: 'Generate Lorem Ipsum for your next project',

    webdevTitle: '3. Lorem Ipsum in Web Development',
    webdevDesc: 'Web developers use Lorem Ipsum across the entire development lifecycle, from initial wireframes to final QA testing.',
    webdevMockups: 'Wireframes and Mockups',
    webdevMockupsP: 'In the wireframing stage, Lorem Ipsum helps establish content hierarchy. You can see how headings, subheadings, body text, and captions flow together. This is crucial for responsive design where content reflows across breakpoints.',
    webdevPrototypes: 'Interactive Prototypes',
    webdevPrototypesP: 'When building interactive prototypes in tools like Figma, Framer, or Storybook, Lorem Ipsum provides realistic text that fills components at various sizes. This helps validate component behavior with real-world content lengths.',
    webdevTesting: 'Testing and QA',
    webdevTestingP: 'QA teams use Lorem Ipsum to test text overflow, truncation, responsive behavior, and internationalization. By generating paragraphs of varying lengths, testers can verify that layouts handle edge cases like very long words, empty content, and extremely long paragraphs.',
    webdevCms: 'CMS and Template Development',
    webdevCmsP: 'When developing WordPress themes, headless CMS templates, or static site generators, Lorem Ipsum fills content fields so developers can see how templates render with realistic data. This is especially important for blog post templates, product pages, and landing pages.',
    webdevEmmet: 'Quick Generation with Emmet',
    webdevEmmetP: 'Most code editors support Emmet abbreviations. Type "lorem" followed by Tab to generate a paragraph of Lorem Ipsum. Use "lorem10" for 10 words, "lorem100" for 100 words, or "p*3>lorem" for three paragraphs wrapped in <p> tags.',

    codeTitle: '4. Generating Lorem Ipsum Programmatically',
    codeDesc: 'Sometimes you need more control than a simple copy-paste. Here is how to generate Lorem Ipsum in popular programming languages.',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsNote: 'A lightweight Lorem Ipsum generator using a predefined sentence pool:',
    codePyTitle: 'Python',
    codePyNote: 'Python makes Lorem Ipsum generation simple with built-in string methods or the popular lorem-text package:',
    codeRubyTitle: 'Ruby',
    codeRubyNote: 'Ruby provides elegant methods for text generation:',
    codeCta: 'Skip the code and generate Lorem Ipsum instantly',

    altTitle: '5. Lorem Ipsum Alternatives: Fun and Themed Placeholder Text',
    altDesc: 'While Lorem Ipsum is the classic choice, dozens of creative alternatives exist. These themed generators add personality to your mockups and can make design reviews more engaging.',
    altCol1: 'Generator',
    altCol2: 'Theme',
    altCol3: 'Best For',
    altRow1: ['Hipster Ipsum', 'Artisanal, craft, indie culture', 'Trendy brand mockups'],
    altRow2: ['Bacon Ipsum', 'Meat and food terminology', 'Food-related projects, fun demos'],
    altRow3: ['Corporate Ipsum', 'Business jargon and buzzwords', 'Enterprise UI mockups'],
    altRow4: ['Cupcake Ipsum', 'Desserts and sweets', 'Bakery, food, or playful designs'],
    altRow5: ['Pirate Ipsum', 'Pirate speak and nautical terms', 'Fun presentations, games'],
    altRow6: ['Cat Ipsum', 'Cat behaviors and meowing', 'Pet-related projects'],
    altRow7: ['Space Ipsum', 'NASA quotes and space terms', 'Science and tech projects'],
    altRow8: ['Samuel L. Ipsum', 'Movie quotes and dialogue', 'Entertainment mockups'],
    altTip: 'Pro tip: Use themed ipsum generators for internal mockups and demos. For client-facing work, stick with classic Lorem Ipsum to maintain professionalism.',

    bestTitle: '6. Best Practices for Using Placeholder Text',
    bestDesc: 'Effective use of placeholder text requires more than just pasting Lorem Ipsum everywhere. Follow these best practices to get the most value from dummy text.',
    bestLength: 'Match Content Length',
    bestLengthP: 'Use placeholder text that matches the expected real content length. If your blog posts will be 500-800 words, generate that many words of Lorem Ipsum. If your product descriptions are 2-3 sentences, use short placeholder text. Mismatched lengths lead to design decisions that break with real content.',
    bestHierarchy: 'Test Content Hierarchy',
    bestHierarchyP: 'Generate Lorem Ipsum at different lengths for headings, subheadings, body text, and captions. This tests your typographic hierarchy and ensures that visual weight is properly distributed across content levels.',
    bestEdge: 'Test Edge Cases',
    bestEdgeP: 'Generate very short content (1-2 words) and very long content (multiple paragraphs) to stress-test your layouts. Check for overflow, truncation behavior, and responsive breakpoints with extreme content lengths.',
    bestReplace: 'Always Replace Before Launch',
    bestReplaceP: 'Shipping Lorem Ipsum to production is embarrassing and unprofessional. Add placeholder text detection to your build pipeline or QA checklist. Search for "Lorem ipsum" or "dolor sit amet" before every release.',
    bestMix: 'Mix with Real Content',
    bestMixP: 'When possible, use a mix of real headlines with Lorem Ipsum body text. This hybrid approach gives reviewers a sense of the final product while keeping the focus on layout decisions.',
    bestDocument: 'Document Placeholder Usage',
    bestDocumentP: 'In your design system or component library, document where Lorem Ipsum is used as a default and what content should replace it. This helps content teams know exactly what they need to provide.',

    designTitle: '7. Lorem Ipsum in Design Tools',
    designDesc: 'Modern design tools have built-in or plugin-based Lorem Ipsum support that streamlines the placeholder text workflow.',
    designFigma: 'Figma',
    designFigmaP: 'Figma offers Lorem Ipsum through the "Lorem Ipsum" plugin available in the Community plugins. Select a text layer, run the plugin, and choose how many paragraphs, sentences, or words to generate. The "Content Reel" plugin goes further by providing realistic names, avatars, and addresses alongside Lorem Ipsum text.',
    designSketch: 'Sketch',
    designSketchP: 'Sketch includes a built-in text generation feature. Select a text layer, go to Edit > Insert > Lorem Ipsum to fill it with placeholder text. The "Craft" plugin by InVision provides even more control with realistic data population.',
    designXd: 'Adobe XD',
    designXdP: 'Adobe XD supports Lorem Ipsum generation through its built-in "Repeat Grid" feature and the "Lorem Ipsum" plugin from the Plugin Manager. Auto-populate text fields by connecting them to a data source or CSV file.',
    designCanva: 'Canva',
    designCanvaP: 'Canva does not have a built-in Lorem Ipsum generator, but you can copy-paste placeholder text from an online generator. For rapid prototyping in Canva, keep a text file of Lorem Ipsum paragraphs ready to paste.',

    a11yTitle: '8. Accessibility Considerations with Placeholder Text',
    a11yDesc: 'Placeholder text has real implications for accessibility that designers and developers must understand.',
    a11yScreen: 'Screen Reader Impact',
    a11yScreenP: 'Screen readers will read Lorem Ipsum aloud to visually impaired users. During user testing or accessibility audits, this creates a confusing and frustrating experience. Always use real content for accessibility testing, never placeholder text.',
    a11yContrast: 'Color Contrast Testing',
    a11yContrastP: 'When testing color contrast ratios for WCAG compliance, use placeholder text as a stand-in for body copy. The important thing is that the font size, weight, and color are final values. The actual words do not affect contrast calculations.',
    a11yAria: 'ARIA Labels and Alt Text',
    a11yAriaP: 'Never use Lorem Ipsum for ARIA labels, alt text, button labels, or form labels. These accessibility attributes must contain meaningful text that describes the element purpose. Placeholder Latin text in these fields fails accessibility audits and confuses assistive technology users.',
    a11yLang: 'Language Declaration',
    a11yLangP: 'If your page uses Lorem Ipsum extensively, screen readers may try to pronounce the Latin text using English phonetics, producing gibberish sounds. For production sites, ensure the lang attribute matches the actual content language.',
    a11yCta: 'Use our Lorem Ipsum Generator for your design drafts, but always test accessibility with real content.',

    whenNotTitle: '9. When NOT to Use Lorem Ipsum',
    whenNotDesc: 'Despite its usefulness, Lorem Ipsum is not always the right choice. Here are scenarios where you should avoid placeholder text and use real content instead.',
    whenNotUsability: 'Usability Testing',
    whenNotUsabilityP: 'If you are conducting usability tests with real users, always use realistic content. Participants need to understand what they are reading to give meaningful feedback on navigation, content hierarchy, and information architecture.',
    whenNotContent: 'Content-Driven Designs',
    whenNotContentP: 'For designs where content is the primary feature (news sites, documentation, educational platforms), the content structure drives the layout. Using Lorem Ipsum can lead to designs that look great with placeholder text but break with real articles, headlines, and data.',
    whenNotForms: 'Form Design and Validation',
    whenNotFormP: 'Forms require realistic input examples to properly test validation, error messages, and input formatting. Use real names, emails, phone numbers, and addresses (with tools like Faker.js) instead of Lorem Ipsum.',
    whenNotData: 'Data-Heavy Interfaces',
    whenNotDataP: 'Dashboards, tables, charts, and data visualizations need realistic numbers, dates, and metrics. Lorem Ipsum tells you nothing about how a 15-column table or a financial dashboard will look with real data.',
    whenNotMicrocopy: 'Microcopy and UX Writing',
    whenNotMicrocopyP: 'Button labels, error messages, success notifications, tooltips, and empty states need real microcopy from the start. These small text elements have enormous impact on user experience and cannot be designed in isolation.',
    whenNotPresentation: 'Client Presentations',
    whenNotPresentationP: 'When presenting designs to clients, use real content or realistic approximations whenever possible. Clients often struggle to envision the final product with Lorem Ipsum and may approve designs that fail with actual content.',

    realisticTitle: '10. Generating Realistic Placeholder Data vs Lorem Ipsum',
    realisticDesc: 'While Lorem Ipsum is perfect for paragraph-level text, modern UI development often requires structured placeholder data. Here is how to choose between Lorem Ipsum and fake data generators.',
    realisticCol1: 'Use Case',
    realisticCol2: 'Use Lorem Ipsum',
    realisticCol3: 'Use Faker.js / Realistic Data',
    realisticRow1: ['Blog post body text', 'Yes', 'No'],
    realisticRow2: ['User names and avatars', 'No', 'Yes'],
    realisticRow3: ['Email addresses', 'No', 'Yes'],
    realisticRow4: ['Product descriptions', 'Partial (body text)', 'Yes (title, price, SKU)'],
    realisticRow5: ['Street addresses', 'No', 'Yes'],
    realisticRow6: ['Date and time values', 'No', 'Yes'],
    realisticRow7: ['Phone numbers', 'No', 'Yes'],
    realisticRow8: ['Headings and titles', 'Sometimes', 'Preferred'],
    realisticFaker: 'Getting Started with Faker.js',
    realisticFakerP: 'Faker.js is the most popular library for generating realistic fake data. It supports names, addresses, phone numbers, emails, dates, images, commerce data, and much more across 50+ locales.',
    realisticCombine: 'Combining Both Approaches',
    realisticCombineP: 'The best prototypes combine Lorem Ipsum for long-form text content with Faker.js for structured data. Use Lorem Ipsum for blog posts, articles, comments, and descriptions. Use Faker.js for user profiles, product catalogs, transaction histories, and form pre-fills.',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What does "Lorem Ipsum" actually mean?',
    faq1a: 'Lorem Ipsum comes from "de Finibus Bonorum et Malorum" by Cicero, written in 45 BC. The passage deals with the theory of ethics. The opening words "Lorem ipsum dolor sit amet" roughly translate to "pain itself, because it is pain." The text has been modified over centuries with additions, removals, and scrambled words, so the modern version is not perfectly coherent Latin.',
    faq2q: 'Is Lorem Ipsum copyrighted?',
    faq2a: 'No. Lorem Ipsum is based on a text written by Cicero over 2,000 years ago, which is firmly in the public domain. The standard Lorem Ipsum passages that have circulated since the 1500s are also not copyrighted. You can freely use, modify, and distribute Lorem Ipsum text in any project without licensing concerns.',
    faq3q: 'How do I generate Lorem Ipsum in VS Code?',
    faq3a: 'VS Code has built-in Lorem Ipsum generation via Emmet. In any HTML or text file, type "lorem" and press Tab to generate a paragraph. Use "lorem10" for 10 words, "lorem50" for 50 words, or "p*5>lorem" for five paragraphs inside <p> tags. The Emmet abbreviation works in HTML, JSX, PHP, and other supported file types.',
    faq4q: 'Can I use Lorem Ipsum in production websites?',
    faq4a: 'You should never ship Lorem Ipsum to production. Placeholder text in a live website looks unprofessional, confuses users, hurts SEO (search engines may flag it as low-quality content), and can fail accessibility audits. Always replace all Lorem Ipsum with real content before deploying to production.',
    faq5q: 'Why not just use real content from the start instead of Lorem Ipsum?',
    faq5a: 'In an ideal workflow, real content drives the design. However, content is often not ready when design begins. Lorem Ipsum bridges this gap by providing realistic-looking text that lets designers establish layout, typography, and spacing without waiting for copywriters. Many teams use a content-first approach for critical sections while using Lorem Ipsum for secondary areas.',
    faq6q: 'How long is the standard Lorem Ipsum passage?',
    faq6a: 'The most commonly used standard Lorem Ipsum passage (starting with "Lorem ipsum dolor sit amet") contains 69 words in its shortest common form and around 249 words in the extended version. The original Cicero source text in sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" is considerably longer at approximately 430 words total.',
    faq7q: 'What are the best Lorem Ipsum generator tools?',
    faq7a: 'The best online Lorem Ipsum generators let you specify the number of paragraphs, sentences, or words, and offer options for HTML formatting, plain text, and various output styles. Our Lorem Ipsum Generator tool lets you customize the output length, copy with one click, and choose between paragraphs, sentences, and words. For development, Faker.js and the Python lorem-text package provide programmatic generation.',
    faq8q: 'Does using Lorem Ipsum hurt SEO?',
    faq8a: 'Lorem Ipsum itself does not appear in search results because no one searches for Latin placeholder text. However, if Lorem Ipsum accidentally appears on production pages, search engines may classify the page as incomplete or low-quality content, which can negatively affect your overall site quality score. Always audit your site for leftover placeholder text.',
  },
  zh: {
    title: 'Lorem Ipsum 在线生成器指南：历史、用法、替代方案和最佳实践',
    intro: 'Lorem Ipsum 是设计和开发领域最广泛使用的占位文本。500 多年来，它一直是行业标准的虚拟文本，用于填充布局、测试排版和预览设计。本指南涵盖了关于 Lorem Ipsum 你需要知道的一切：追溯到公元前 45 年西塞罗的起源，为什么设计师和开发者依赖占位文本，如何在 JavaScript、Python 和 Ruby 中程序化生成，Hipster Ipsum 和 Bacon Ipsum 等流行替代方案，使用占位文本的最佳实践，在 Figma 和 Sketch 中的集成，可访问性考虑因素，以及如何生成更有意义的原型所需的逼真占位数据。',

    tldrTitle: 'TL;DR',
    tldr1: 'Lorem Ipsum 起源于西塞罗在公元前 45 年撰写的著作，已有 2000 多年的历史。',
    tldr2: '设计师使用它是因为它模仿自然语言模式，不会分散对视觉设计的注意力。',
    tldr3: '在 JavaScript 中用简单的句子数组和随机选择函数生成 Lorem Ipsum。',
    tldr4: 'Hipster Ipsum、Bacon Ipsum 和 Corporate Ipsum 等替代方案为你的原型增添个性。',
    tldr5: '永远不要在生产环境中使用 Lorem Ipsum。始终在发布前替换占位文本。',
    tldr6: '对于表单和数据密集型 UI，使用 Faker.js 等逼真的假数据生成器。',

    keyTitle: '关键要点',
    key1: '自 1500 年代以来，Lorem Ipsum 一直是排版行业的标准，当时一位不知名的印刷工打乱了活字来制作样本书。',
    key2: '占位文本让设计师专注于布局、排版和视觉层次结构，不受内容干扰。',
    key3: '在 JavaScript、Python 和 Ruby 中程序化生成，可以精细控制段落数、字数和格式。',
    key4: '有趣的替代方案适合各种口味：Hipster Ipsum、Bacon Ipsum、Pirate Ipsum、Corporate Ipsum 等。',
    key5: '可访问性审核应始终使用真实内容。屏幕阅读器会朗读 Lorem Ipsum，让用户困惑。',
    key6: '对于数据密集型原型，将 Lorem Ipsum 用于文本块，结合 Faker.js 生成姓名、邮箱、地址和日期。',

    historyTitle: '1. 什么是 Lorem Ipsum？它从何而来？',
    historyDesc: 'Lorem Ipsum 是自 1500 年代以来印刷和排版行业使用的标准占位虚拟文本。但它的根源比文艺复兴还要深远。',
    historyOrigin: '古典起源',
    historyOriginP1: '与普遍看法相反，Lorem Ipsum 不仅仅是随机文本。它源于公元前 45 年的古典拉丁文学作品，已有 2000 多年的历史。该文本来自马库斯-图利乌斯-西塞罗的《de Finibus Bonorum et Malorum》（善与恶的极限）第 1.10.32 和 1.10.33 节。这部哲学著作是关于伦理学理论的论文，在文艺复兴时期非常流行。',
    historyOriginP2: '标准的 Lorem Ipsum 段落自 1500 年代开始使用，当时一位不知名的印刷工取出一排活字并将其打乱以制作样本书。它经历了五个世纪的排版、1960 年代向电子排版的过渡，以及 1980 年代以 Aldus PageMaker 等软件为代表的桌面出版革命。',
    historyStandard: '标准段落',
    historyStandardP1: '最常用的 Lorem Ipsum 段落以"Lorem ipsum dolor sit amet, consectetur adipiscing elit"开头。这个开头已变得如此标志性，全世界的设计师和开发者都能立即识别。"Lorem"这个词本身是"dolorem"的截断形式，在拉丁语中意为"痛苦"。',
    historyModern: '数字时代的 Lorem Ipsum',
    historyModernP1: '随着网页设计的兴起，Lorem Ipsum 在数字原型设计中找到了新家。每个主要设计工具、CMS 平台和开发框架都包含内置的 Lorem Ipsum 生成或插件支持。它仍然是占位文本的事实标准，因为它接近真实英文文本的外观和感觉，而不会携带任何分散注意力的含义。',

    whyTitle: '2. 为什么设计师和开发者使用占位文本',
    whyDesc: '使用占位文本不是偷懒，而是一种深思熟虑的设计策略，在开发工作流中有多个重要目的。',
    whyPoint1: '聚焦视觉设计：真实内容可能会分散利益相关者对布局、颜色、排版和间距的评估。Lorem Ipsum 让焦点保持在设计决策上。',
    whyPoint2: '测试排版：占位文本揭示了不同字体、大小、行高和字间距在逼真文本模式下的表现。单个单词或"此处为文本"无法进行同样的测试。',
    whyPoint3: '防止内容偏见：当审阅者看到真实内容时，他们会本能地开始编辑文字而不是评估设计。虚拟文本可以防止这种"内容陷阱"。',
    whyPoint4: '填充可变长度内容区域：博客卡片、推荐部分和产品描述都有可变内容。Lorem Ipsum 让你测试短内容和长内容场景。',
    whyPoint5: '加速原型设计：等待最终文案会减慢设计过程。占位文本让设计师快速行动和迭代，没有内容瓶颈。',
    whyPoint6: '保持机密性：在客户项目中，使用占位文本可避免在审查过程中意外共享敏感或未发布的内容。',
    whyCta: '为你的下一个项目生成 Lorem Ipsum',

    webdevTitle: '3. Web 开发中的 Lorem Ipsum',
    webdevDesc: 'Web 开发者在整个开发生命周期中使用 Lorem Ipsum，从初始线框图到最终 QA 测试。',
    webdevMockups: '线框图和原型',
    webdevMockupsP: '在线框图阶段，Lorem Ipsum 帮助建立内容层次结构。你可以看到标题、副标题、正文和说明文字如何一起流动。这对响应式设计至关重要，因为内容会在断点间重新排列。',
    webdevPrototypes: '交互原型',
    webdevPrototypesP: '在 Figma、Framer 或 Storybook 等工具中构建交互原型时，Lorem Ipsum 提供逼真的文本来填充各种大小的组件。这有助于验证组件在真实内容长度下的行为。',
    webdevTesting: '测试和 QA',
    webdevTestingP: 'QA 团队使用 Lorem Ipsum 测试文本溢出、截断、响应行为和国际化。通过生成不同长度的段落，测试人员可以验证布局是否处理了极端情况。',
    webdevCms: 'CMS 和模板开发',
    webdevCmsP: '开发 WordPress 主题、无头 CMS 模板或静态站点生成器时，Lorem Ipsum 填充内容字段，以便开发者可以看到模板如何使用逼真数据渲染。',
    webdevEmmet: '使用 Emmet 快速生成',
    webdevEmmetP: '大多数代码编辑器支持 Emmet 缩写。输入"lorem"然后按 Tab 生成一段 Lorem Ipsum。使用"lorem10"生成 10 个单词，"lorem100"生成 100 个单词。',

    codeTitle: '4. 程序化生成 Lorem Ipsum',
    codeDesc: '有时候你需要比简单复制粘贴更多的控制。以下是在流行编程语言中生成 Lorem Ipsum 的方法。',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsNote: '使用预定义句子池的轻量级 Lorem Ipsum 生成器：',
    codePyTitle: 'Python',
    codePyNote: 'Python 可以用内置字符串方法或流行的 lorem-text 包简单生成 Lorem Ipsum：',
    codeRubyTitle: 'Ruby',
    codeRubyNote: 'Ruby 提供优雅的文本生成方法：',
    codeCta: '跳过代码，直接在线生成 Lorem Ipsum',

    altTitle: '5. Lorem Ipsum 替代方案：有趣的主题占位文本',
    altDesc: '虽然 Lorem Ipsum 是经典选择，但存在数十种创意替代方案。这些主题生成器为你的原型增添个性。',
    altCol1: '生成器',
    altCol2: '主题',
    altCol3: '最适合',
    altRow1: ['Hipster Ipsum', '手工、工艺、独立文化', '潮流品牌原型'],
    altRow2: ['Bacon Ipsum', '肉类和食物术语', '食品相关项目、有趣的演示'],
    altRow3: ['Corporate Ipsum', '商业术语和流行语', '企业 UI 原型'],
    altRow4: ['Cupcake Ipsum', '甜点和糖果', '烘焙、食品或有趣的设计'],
    altRow5: ['Pirate Ipsum', '海盗用语和航海术语', '有趣的演示、游戏'],
    altRow6: ['Cat Ipsum', '猫咪行为和喵喵叫', '宠物相关项目'],
    altRow7: ['Space Ipsum', 'NASA 引语和太空术语', '科学和技术项目'],
    altRow8: ['Samuel L. Ipsum', '电影台词和对话', '娱乐原型'],
    altTip: '提示：内部原型和演示使用主题 ipsum 生成器。面向客户的工作请使用经典 Lorem Ipsum 以保持专业性。',

    bestTitle: '6. 使用占位文本的最佳实践',
    bestDesc: '有效使用占位文本不仅仅是到处粘贴 Lorem Ipsum。遵循这些最佳实践来充分利用虚拟文本。',
    bestLength: '匹配内容长度',
    bestLengthP: '使用与预期真实内容长度匹配的占位文本。如果你的博客文章是 500-800 字，就生成那么多的 Lorem Ipsum。长度不匹配会导致设计决策在使用真实内容时失效。',
    bestHierarchy: '测试内容层次结构',
    bestHierarchyP: '为标题、副标题、正文和说明文字生成不同长度的 Lorem Ipsum。这可以测试你的排版层次结构，确保视觉权重在内容级别之间正确分配。',
    bestEdge: '测试边缘情况',
    bestEdgeP: '生成非常短的内容（1-2 个词）和非常长的内容（多段落）来压力测试你的布局。检查极端内容长度下的溢出、截断行为和响应断点。',
    bestReplace: '发布前务必替换',
    bestReplaceP: '将 Lorem Ipsum 发布到生产环境是尴尬和不专业的。在构建管道或 QA 检查清单中添加占位文本检测。每次发布前搜索"Lorem ipsum"。',
    bestMix: '与真实内容混合',
    bestMixP: '尽可能使用真实标题配合 Lorem Ipsum 正文的混合方法。这种方法让审阅者了解最终产品的同时保持对布局决策的关注。',
    bestDocument: '记录占位符使用',
    bestDocumentP: '在你的设计系统或组件库中，记录 Lorem Ipsum 用作默认值的位置以及应该用什么内容替换它。',

    designTitle: '7. 设计工具中的 Lorem Ipsum',
    designDesc: '现代设计工具内置或通过插件支持 Lorem Ipsum，简化了占位文本工作流程。',
    designFigma: 'Figma',
    designFigmaP: 'Figma 通过社区插件中的"Lorem Ipsum"插件提供支持。选择文本图层，运行插件，选择要生成多少段落、句子或单词。',
    designSketch: 'Sketch',
    designSketchP: 'Sketch 包含内置文本生成功能。选择文本图层，转到 Edit > Insert > Lorem Ipsum 来填充占位文本。',
    designXd: 'Adobe XD',
    designXdP: 'Adobe XD 通过内置"重复网格"功能和插件管理器中的"Lorem Ipsum"插件支持 Lorem Ipsum 生成。',
    designCanva: 'Canva',
    designCanvaP: 'Canva 没有内置 Lorem Ipsum 生成器，但可以从在线生成器复制粘贴占位文本。',

    a11yTitle: '8. 占位文本的可访问性考虑',
    a11yDesc: '占位文本对可访问性有实际影响，设计师和开发者必须了解这些。',
    a11yScreen: '屏幕阅读器影响',
    a11yScreenP: '屏幕阅读器会向视觉障碍用户朗读 Lorem Ipsum。在用户测试或可访问性审核期间，这会造成困惑和沮丧的体验。始终使用真实内容进行可访问性测试。',
    a11yContrast: '颜色对比度测试',
    a11yContrastP: '测试 WCAG 合规的颜色对比度时，使用占位文本作为正文替代。重要的是字体大小、粗细和颜色是最终值。实际文字不会影响对比度计算。',
    a11yAria: 'ARIA 标签和 Alt 文本',
    a11yAriaP: '永远不要在 ARIA 标签、alt 文本、按钮标签或表单标签中使用 Lorem Ipsum。这些可访问性属性必须包含描述元素用途的有意义文本。',
    a11yLang: '语言声明',
    a11yLangP: '如果页面大量使用 Lorem Ipsum，屏幕阅读器可能会尝试使用英语音素发音拉丁文本，产生无意义的声音。对于生产站点，确保 lang 属性与实际内容语言匹配。',
    a11yCta: '使用我们的 Lorem Ipsum 生成器制作设计草稿，但始终使用真实内容测试可访问性。',

    whenNotTitle: '9. 何时不应使用 Lorem Ipsum',
    whenNotDesc: '尽管 Lorem Ipsum 很有用，但并不总是正确的选择。以下是应避免使用占位文本而应使用真实内容的场景。',
    whenNotUsability: '可用性测试',
    whenNotUsabilityP: '如果你正在对真实用户进行可用性测试，始终使用逼真的内容。参与者需要理解他们所阅读的内容才能提供有意义的反馈。',
    whenNotContent: '内容驱动设计',
    whenNotContentP: '对于内容是主要特征的设计（新闻站点、文档、教育平台），内容结构驱动布局。使用 Lorem Ipsum 可能导致设计在使用真实文章时失效。',
    whenNotForms: '表单设计和验证',
    whenNotFormP: '表单需要逼真的输入示例来正确测试验证、错误消息和输入格式。使用 Faker.js 等工具的真实姓名、邮箱、电话和地址。',
    whenNotData: '数据密集型界面',
    whenNotDataP: '仪表板、表格、图表和数据可视化需要逼真的数字、日期和指标。Lorem Ipsum 无法告诉你 15 列表格或财务仪表板使用真实数据时的样子。',
    whenNotMicrocopy: '微文案和 UX 写作',
    whenNotMicrocopyP: '按钮标签、错误消息、成功通知、工具提示和空状态从一开始就需要真实的微文案。这些小文本元素对用户体验有巨大影响。',
    whenNotPresentation: '客户演示',
    whenNotPresentationP: '向客户展示设计时，尽可能使用真实内容或逼真的近似值。客户通常很难想象 Lorem Ipsum 的最终产品效果。',

    realisticTitle: '10. 生成逼真的占位数据 vs Lorem Ipsum',
    realisticDesc: '虽然 Lorem Ipsum 非常适合段落级文本，但现代 UI 开发通常需要结构化的占位数据。以下是如何在两者之间选择。',
    realisticCol1: '使用场景',
    realisticCol2: '使用 Lorem Ipsum',
    realisticCol3: '使用 Faker.js / 逼真数据',
    realisticRow1: ['博客正文', '是', '否'],
    realisticRow2: ['用户姓名和头像', '否', '是'],
    realisticRow3: ['电子邮件地址', '否', '是'],
    realisticRow4: ['产品描述', '部分（正文）', '是（标题、价格、SKU）'],
    realisticRow5: ['街道地址', '否', '是'],
    realisticRow6: ['日期和时间值', '否', '是'],
    realisticRow7: ['电话号码', '否', '是'],
    realisticRow8: ['标题和题目', '有时', '推荐'],
    realisticFaker: 'Faker.js 入门',
    realisticFakerP: 'Faker.js 是最流行的逼真假数据生成库。它支持姓名、地址、电话号码、邮箱、日期、图片、商务数据等，覆盖 50 多个地区。',
    realisticCombine: '结合两种方法',
    realisticCombineP: '最好的原型将 Lorem Ipsum 用于长文本内容，将 Faker.js 用于结构化数据。将 Lorem Ipsum 用于博客文章、评论和描述，将 Faker.js 用于用户档案、产品目录和交易历史。',

    faqTitle: '常见问题',
    faq1q: '"Lorem Ipsum" 实际上是什么意思？',
    faq1a: 'Lorem Ipsum 来自西塞罗在公元前 45 年写的《de Finibus Bonorum et Malorum》。这段文字涉及伦理学理论。开头的"Lorem ipsum dolor sit amet"大致翻译为"痛苦本身，因为它是痛苦"。该文本经过几个世纪的修改，因此现代版本并非完美连贯的拉丁语。',
    faq2q: 'Lorem Ipsum 是否受版权保护？',
    faq2a: '不。Lorem Ipsum 基于西塞罗 2000 多年前撰写的文本，该文本完全属于公共领域。自 1500 年代以来流传的标准 Lorem Ipsum 段落也没有版权。你可以在任何项目中自由使用、修改和分发 Lorem Ipsum 文本。',
    faq3q: '如何在 VS Code 中生成 Lorem Ipsum？',
    faq3a: 'VS Code 通过 Emmet 内置了 Lorem Ipsum 生成功能。在任何 HTML 或文本文件中，输入"lorem"并按 Tab 生成一段。使用"lorem10"生成 10 个单词，"lorem50"生成 50 个单词。',
    faq4q: '可以在生产网站中使用 Lorem Ipsum 吗？',
    faq4a: '永远不应该将 Lorem Ipsum 发布到生产环境。实时网站中的占位文本看起来不专业，会让用户困惑，损害 SEO，并可能导致可访问性审核失败。始终在部署前用真实内容替换所有 Lorem Ipsum。',
    faq5q: '为什么不从一开始就使用真实内容而不是 Lorem Ipsum？',
    faq5a: '在理想的工作流中，真实内容驱动设计。然而，内容通常在设计开始时还没准备好。Lorem Ipsum 弥补了这个差距，让设计师可以建立布局、排版和间距而无需等待文案撰写者。',
    faq6q: '标准 Lorem Ipsum 段落有多长？',
    faq6a: '最常用的标准 Lorem Ipsum 段落在最短常见形式中包含 69 个单词，扩展版本约 249 个单词。原始的西塞罗源文本总共约 430 个单词。',
    faq7q: '最好的 Lorem Ipsum 生成工具是什么？',
    faq7a: '最好的在线 Lorem Ipsum 生成器让你指定段落数、句子数或字数，并提供 HTML 格式、纯文本和各种输出样式选项。我们的 Lorem Ipsum 生成工具让你自定义输出长度，一键复制，并在段落、句子和单词之间选择。',
    faq8q: '使用 Lorem Ipsum 会影响 SEO 吗？',
    faq8a: 'Lorem Ipsum 本身不会出现在搜索结果中。但如果 Lorem Ipsum 意外出现在生产页面上，搜索引擎可能会将该页面归类为不完整或低质量内容，这可能会影响你的整体网站质量分数。始终审核你的网站是否有残留的占位文本。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 };
const noteBoxStyle: React.CSSProperties = { background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const warningBoxStyle: React.CSSProperties = { background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const ulStyle: React.CSSProperties = { paddingLeft: 24, margin: '8px 0 16px', color: 'var(--text-secondary)', lineHeight: 1.8 };

export default function LoremIpsumOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map(k => ({
      '@type': 'Question',
      name: t[k + 'q'] as string,
      acceptedAnswer: { '@type': 'Answer', text: t[k + 'a'] as string },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 20, margin: '24px 0' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 12, color: '#0369a1' }}>{t.tldrTitle}</h3>
        <ul style={{ ...ulStyle, margin: 0, color: '#0c4a6e' }}>
          {['tldr1', 'tldr2', 'tldr3', 'tldr4', 'tldr5', 'tldr6'].map(k => (
            <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
          ))}
        </ul>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 8, padding: 20, margin: '24px 0' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 12, color: 'var(--text-primary)' }}>{t.keyTitle}</h3>
        <ul style={{ ...ulStyle, margin: 0 }}>
          {['key1', 'key2', 'key3', 'key4', 'key5', 'key6'].map(k => (
            <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
          ))}
        </ul>
      </div>

      <p style={{ ...pStyle, marginTop: 16 }}>
        <Link href={`/${lang}/tools/lorem-ipsum`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
          {lang === 'zh' ? '立即试用我们的 Lorem Ipsum 生成器' : 'Try our free Lorem Ipsum Generator tool'} &rarr;
        </Link>
      </p>

      {/* Section 1: History */}
      <h2 style={h2Style}>{t.historyTitle}</h2>
      <p style={pStyle}>{t.historyDesc}</p>

      <h3 style={h3Style}>{t.historyOrigin}</h3>
      <p style={pStyle}>{t.historyOriginP1}</p>
      <p style={pStyle}>{t.historyOriginP2}</p>

      <h3 style={h3Style}>{t.historyStandard}</h3>
      <p style={pStyle}>{t.historyStandardP1}</p>

      <h3 style={h3Style}>{t.historyModern}</h3>
      <p style={pStyle}>{t.historyModernP1}</p>

      {/* Section 2: Why Use Placeholder Text */}
      <h2 style={h2Style}>{t.whyTitle}</h2>
      <p style={pStyle}>{t.whyDesc}</p>
      <ul style={ulStyle}>
        {['whyPoint1', 'whyPoint2', 'whyPoint3', 'whyPoint4', 'whyPoint5', 'whyPoint6'].map(k => (
          <li key={k} style={{ marginBottom: 8 }}>{t[k] as string}</li>
        ))}
      </ul>
      <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', borderRadius: 12, padding: 24, margin: '24px 0', textAlign: 'center' }}>
        <p style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>
          {t.whyCta}
        </p>
        <Link
          href={`/${lang}/tools/lorem-ipsum`}
          style={{
            display: 'inline-block',
            background: '#ffffff',
            color: '#2563eb',
            padding: '12px 32px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
          }}
        >
          {lang === 'zh' ? '打开 Lorem Ipsum 生成器' : 'Open Lorem Ipsum Generator'} &rarr;
        </Link>
      </div>

      {/* Section 3: Web Development */}
      <h2 style={h2Style}>{t.webdevTitle}</h2>
      <p style={pStyle}>{t.webdevDesc}</p>

      <h3 style={h3Style}>{t.webdevMockups}</h3>
      <p style={pStyle}>{t.webdevMockupsP}</p>

      <h3 style={h3Style}>{t.webdevPrototypes}</h3>
      <p style={pStyle}>{t.webdevPrototypesP}</p>

      <h3 style={h3Style}>{t.webdevTesting}</h3>
      <p style={pStyle}>{t.webdevTestingP}</p>

      <h3 style={h3Style}>{t.webdevCms}</h3>
      <p style={pStyle}>{t.webdevCmsP}</p>

      <h3 style={h3Style}>{t.webdevEmmet}</h3>
      <p style={pStyle}>{t.webdevEmmetP}</p>

      {/* Section 4: Programmatic Generation */}
      <h2 style={h2Style}>{t.codeTitle}</h2>
      <p style={pStyle}>{t.codeDesc}</p>

      <h3 style={h3Style}>{t.codeJsTitle}</h3>
      <p style={pStyle}>{t.codeJsNote}</p>
      <pre style={codeStyle}><code>{`// Lorem Ipsum Generator in JavaScript
const LOREM_SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum.",
];

function generateLoremIpsum(paragraphs: number = 3, sentencesPerParagraph: number = 4): string {
  const result: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const sentences: string[] = [];
    for (let s = 0; s < sentencesPerParagraph; s++) {
      const idx = Math.floor(Math.random() * LOREM_SENTENCES.length);
      sentences.push(LOREM_SENTENCES[idx]);
    }
    // First paragraph always starts with "Lorem ipsum..."
    if (p === 0 && sentences.length > 0) {
      sentences[0] = LOREM_SENTENCES[0];
    }
    result.push(sentences.join(" "));
  }
  return result.join("\\n\\n");
}

function generateWords(count: number): string {
  const words = LOREM_SENTENCES.join(" ").split(/\\s+/);
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(words[i % words.length]);
  }
  return result.join(" ");
}

// Usage:
// generateLoremIpsum(3, 4)  => 3 paragraphs, 4 sentences each
// generateWords(50)          => 50 words of Lorem Ipsum`}</code></pre>

      <h3 style={h3Style}>{t.codePyTitle}</h3>
      <p style={pStyle}>{t.codePyNote}</p>
      <pre style={codeStyle}><code>{`# Lorem Ipsum Generator in Python
import random

LOREM_SENTENCES = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus.",
]

def generate_lorem(paragraphs: int = 3, sentences_per_paragraph: int = 4) -> str:
    """Generate Lorem Ipsum paragraphs."""
    result = []
    for p in range(paragraphs):
        sentences = random.choices(LOREM_SENTENCES, k=sentences_per_paragraph)
        if p == 0:
            sentences[0] = LOREM_SENTENCES[0]
        result.append(" ".join(sentences))
    return "\\n\\n".join(result)

def generate_words(count: int) -> str:
    """Generate a specific number of Lorem Ipsum words."""
    all_words = " ".join(LOREM_SENTENCES).split()
    return " ".join(all_words[i % len(all_words)] for i in range(count))

# Using the lorem-text package (pip install lorem-text):
# from lorem_text import lorem
# lorem.paragraphs(3)
# lorem.sentences(5)
# lorem.words(50)

# Usage:
# print(generate_lorem(2, 3))  # 2 paragraphs, 3 sentences each
# print(generate_words(30))     # 30 words`}</code></pre>

      <h3 style={h3Style}>{t.codeRubyTitle}</h3>
      <p style={pStyle}>{t.codeRubyNote}</p>
      <pre style={codeStyle}><code>{`# Lorem Ipsum Generator in Ruby
LOREM_SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus.",
].freeze

def generate_lorem(paragraphs: 3, sentences_per_para: 4)
  paragraphs.times.map do |p|
    sents = LOREM_SENTENCES.sample(sentences_per_para)
    sents[0] = LOREM_SENTENCES[0] if p.zero?
    sents.join(" ")
  end.join("\\n\\n")
end

def generate_words(count)
  words = LOREM_SENTENCES.join(" ").split(/\\s+/)
  count.times.map { |i| words[i % words.length] }.join(" ")
end

# Using the faker gem:
# require 'faker'
# Faker::Lorem.paragraphs(number: 3).join("\\n\\n")
# Faker::Lorem.sentences(number: 5).join(" ")
# Faker::Lorem.words(number: 50).join(" ")

# Usage:
# puts generate_lorem(paragraphs: 2, sentences_per_para: 3)
# puts generate_words(25)`}</code></pre>

      <p style={{ ...pStyle, marginTop: 16 }}>
        <Link href={`/${lang}/tools/lorem-ipsum`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
          {t.codeCta as string} &rarr;
        </Link>
      </p>

      {/* Section 5: Alternatives */}
      <h2 style={h2Style}>{t.altTitle}</h2>
      <p style={pStyle}>{t.altDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.altCol1}</th>
              <th style={thStyle}>{t.altCol2}</th>
              <th style={thStyle}>{t.altCol3}</th>
            </tr>
          </thead>
          <tbody>
            {['altRow1', 'altRow2', 'altRow3', 'altRow4', 'altRow5', 'altRow6', 'altRow7', 'altRow8'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={k} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg-input)' }}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={tdStyle}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={noteBoxStyle}>
        <p style={{ ...pStyle, margin: 0, fontWeight: 600, color: '#1d4ed8' }}>{t.altTip}</p>
      </div>

      {/* Section 6: Best Practices */}
      <h2 style={h2Style}>{t.bestTitle}</h2>
      <p style={pStyle}>{t.bestDesc}</p>

      <h3 style={h3Style}>{t.bestLength}</h3>
      <p style={pStyle}>{t.bestLengthP}</p>

      <h3 style={h3Style}>{t.bestHierarchy}</h3>
      <p style={pStyle}>{t.bestHierarchyP}</p>

      <h3 style={h3Style}>{t.bestEdge}</h3>
      <p style={pStyle}>{t.bestEdgeP}</p>

      <h3 style={h3Style}>{t.bestReplace}</h3>
      <p style={pStyle}>{t.bestReplaceP}</p>
      <div style={warningBoxStyle}>
        <p style={{ ...pStyle, margin: 0, fontWeight: 600, color: '#92400e' }}>
          {lang === 'zh'
            ? '警告：在你的 CI/CD 管道中添加检查以检测生产构建中的 Lorem Ipsum。搜索"Lorem ipsum"或"dolor sit amet"并在发现时中断构建。'
            : 'Warning: Add a check to your CI/CD pipeline to detect Lorem Ipsum in production builds. Search for "Lorem ipsum" or "dolor sit amet" and fail the build if found.'}
        </p>
      </div>

      <h3 style={h3Style}>{t.bestMix}</h3>
      <p style={pStyle}>{t.bestMixP}</p>

      <h3 style={h3Style}>{t.bestDocument}</h3>
      <p style={pStyle}>{t.bestDocumentP}</p>

      {/* Section 7: Design Tools */}
      <h2 style={h2Style}>{t.designTitle}</h2>
      <p style={pStyle}>{t.designDesc}</p>

      <h3 style={h3Style}>{t.designFigma}</h3>
      <p style={pStyle}>{t.designFigmaP}</p>

      <h3 style={h3Style}>{t.designSketch}</h3>
      <p style={pStyle}>{t.designSketchP}</p>

      <h3 style={h3Style}>{t.designXd}</h3>
      <p style={pStyle}>{t.designXdP}</p>

      <h3 style={h3Style}>{t.designCanva}</h3>
      <p style={pStyle}>{t.designCanvaP}</p>

      <p style={{ ...pStyle, marginTop: 16 }}>
        <Link href={`/${lang}/tools/lorem-ipsum`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
          {lang === 'zh' ? '使用我们的在线生成器快速获取 Lorem Ipsum' : 'Quickly generate Lorem Ipsum with our online tool'} &rarr;
        </Link>
      </p>

      {/* Section 8: Accessibility */}
      <h2 style={h2Style}>{t.a11yTitle}</h2>
      <p style={pStyle}>{t.a11yDesc}</p>

      <h3 style={h3Style}>{t.a11yScreen}</h3>
      <p style={pStyle}>{t.a11yScreenP}</p>

      <h3 style={h3Style}>{t.a11yContrast}</h3>
      <p style={pStyle}>{t.a11yContrastP}</p>

      <h3 style={h3Style}>{t.a11yAria}</h3>
      <p style={pStyle}>{t.a11yAriaP}</p>

      <h3 style={h3Style}>{t.a11yLang}</h3>
      <p style={pStyle}>{t.a11yLangP}</p>

      <div style={noteBoxStyle}>
        <p style={{ ...pStyle, margin: 0, color: '#1d4ed8' }}>{t.a11yCta}</p>
      </div>

      {/* Section 9: When NOT to Use */}
      <h2 style={h2Style}>{t.whenNotTitle}</h2>
      <p style={pStyle}>{t.whenNotDesc}</p>

      <h3 style={h3Style}>{t.whenNotUsability}</h3>
      <p style={pStyle}>{t.whenNotUsabilityP}</p>

      <h3 style={h3Style}>{t.whenNotContent}</h3>
      <p style={pStyle}>{t.whenNotContentP}</p>

      <h3 style={h3Style}>{t.whenNotForms}</h3>
      <p style={pStyle}>{t.whenNotFormP}</p>

      <h3 style={h3Style}>{t.whenNotData}</h3>
      <p style={pStyle}>{t.whenNotDataP}</p>

      <h3 style={h3Style}>{t.whenNotMicrocopy}</h3>
      <p style={pStyle}>{t.whenNotMicrocopyP}</p>

      <h3 style={h3Style}>{t.whenNotPresentation}</h3>
      <p style={pStyle}>{t.whenNotPresentationP}</p>

      {/* Section 10: Realistic Data vs Lorem Ipsum */}
      <h2 style={h2Style}>{t.realisticTitle}</h2>
      <p style={pStyle}>{t.realisticDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.realisticCol1}</th>
              <th style={thStyle}>{t.realisticCol2}</th>
              <th style={thStyle}>{t.realisticCol3}</th>
            </tr>
          </thead>
          <tbody>
            {['realisticRow1', 'realisticRow2', 'realisticRow3', 'realisticRow4', 'realisticRow5', 'realisticRow6', 'realisticRow7', 'realisticRow8'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={k} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg-input)' }}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={tdStyle}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.realisticFaker}</h3>
      <p style={pStyle}>{t.realisticFakerP}</p>
      <pre style={codeStyle}><code>{`// Faker.js example (npm install @faker-js/faker)
import { faker } from '@faker-js/faker';

// Generate realistic user data
const user = {
  name: faker.person.fullName(),        // "John Smith"
  email: faker.internet.email(),         // "john.smith@example.com"
  avatar: faker.image.avatar(),          // URL to avatar image
  address: faker.location.streetAddress(), // "123 Main St"
  phone: faker.phone.number(),           // "(555) 123-4567"
  company: faker.company.name(),         // "Acme Corp"
  jobTitle: faker.person.jobTitle(),     // "Senior Developer"
};

// Generate Lorem Ipsum with Faker
const text = faker.lorem.paragraphs(3);  // 3 paragraphs
const words = faker.lorem.words(50);     // 50 words
const sentences = faker.lorem.sentences(5); // 5 sentences

// Combine for a realistic blog post mock
const blogPost = {
  title: faker.lorem.sentence(),
  author: faker.person.fullName(),
  date: faker.date.recent().toISOString(),
  body: faker.lorem.paragraphs(5),
  tags: faker.lorem.words(4).split(' '),
  readingTime: Math.ceil(faker.lorem.paragraphs(5).split(/\\s+/).length / 238),
};`}</code></pre>

      <h3 style={h3Style}>{t.realisticCombine}</h3>
      <p style={pStyle}>{t.realisticCombineP}</p>

      {/* Final CTA */}
      <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', borderRadius: 12, padding: 24, margin: '32px 0', textAlign: 'center' }}>
        <p style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>
          {lang === 'zh' ? '立即生成 Lorem Ipsum' : 'Generate Lorem Ipsum Now'}
        </p>
        <Link
          href={`/${lang}/tools/lorem-ipsum`}
          style={{
            display: 'inline-block',
            background: '#ffffff',
            color: '#2563eb',
            padding: '12px 32px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
          }}
        >
          {lang === 'zh' ? '打开 Lorem Ipsum 生成器' : 'Open Lorem Ipsum Generator'} &rarr;
        </Link>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {faqKeys.map(k => (
        <div key={k} style={{ marginBottom: 20 }}>
          <h3 style={{ ...h3Style, marginTop: 20, fontSize: 17 }}>{t[k + 'q'] as string}</h3>
          <p style={pStyle}>{t[k + 'a'] as string}</p>
        </div>
      ))}

      {/* Final link */}
      <div style={{ borderTop: '2px solid var(--border-color)', marginTop: 40, paddingTop: 24 }}>
        <p style={{ ...pStyle, fontSize: 16, fontWeight: 600 }}>
          {lang === 'zh' ? '准备好生成占位文本了吗？' : 'Ready to generate placeholder text?'}
        </p>
        <p style={pStyle}>
          <Link href={`/${lang}/tools/lorem-ipsum`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
            {lang === 'zh' ? '使用我们的免费在线 Lorem Ipsum 生成器' : 'Use our free online Lorem Ipsum Generator'} &rarr;
          </Link>
          {' '}
          {lang === 'zh'
            ? '自定义段落数、句子数和字数，一键复制，支持纯文本和 HTML 格式。'
            : 'Customize paragraph count, sentence count, and word count. Copy with one click. Plain text and HTML output supported.'}
        </p>
      </div>
    </div>
  );
}
