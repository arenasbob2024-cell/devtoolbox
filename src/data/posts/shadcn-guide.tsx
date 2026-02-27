'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'shadcn/ui Complete Guide: Beautiful, Accessible React Components',
    description: 'Learn how to use shadcn/ui to build beautiful, accessible React components. Covers installation, theming, forms, data tables, customization, and best practices.',
    intro: 'shadcn/ui has changed how developers think about component libraries in React. Instead of installing a traditional npm package, shadcn/ui lets you copy beautifully designed, accessible components directly into your project. You own the code, you can customize everything, and there is no dependency lock-in. Built on Radix UI primitives and styled with Tailwind CSS, shadcn/ui has become the go-to choice for building production-grade React interfaces in 2026.',
    tldr: 'shadcn/ui is a collection of reusable, accessible React components that you copy into your project rather than install as a dependency. Built on Radix UI and Tailwind CSS, it gives you full control over your component code. Use the CLI to add components, customize with CSS variables for theming, pair with React Hook Form + Zod for forms, and TanStack Table for data tables.',
    keyTakeaways: 'Key Takeaways',
    kt1: 'shadcn/ui is NOT a component library — it is a collection of copy-paste components you own',
    kt2: 'Built on Radix UI primitives for accessibility and Tailwind CSS for styling',
    kt3: 'Use the CLI (npx shadcn@latest add) to add components to your project',
    kt4: 'Theming is done through CSS variables — supports dark mode out of the box',
    kt5: 'Pair with React Hook Form + Zod for type-safe form validation',
    kt6: 'TanStack Table integration for powerful, flexible data tables',
    kt7: 'components.json configures paths, styling, and component aliases',
    kt8: 'Full customization — you can modify any component since you own the source code',
    h2WhatIs: 'What Is shadcn/ui?',
    whatIsP1: 'shadcn/ui is not a traditional component library. You do not install it as a dependency in your package.json. Instead, it provides a CLI and a registry of beautifully designed components that you copy directly into your project. This means you own every line of code and can customize anything without fighting library abstractions.',
    whatIsP2: 'Each component is built on top of Radix UI — a headless, unstyled, accessible component library — and styled with Tailwind CSS. This combination gives you WAI-ARIA compliant components with a modern, clean design that you can adapt to any brand or design system.',
    whatIsP3: 'The key philosophy is: use what you need, change what you want. There is no theming API to learn, no wrapper components to deal with, and no breaking changes from library updates.',
    h2Installation: 'Installation and Setup',
    installDesc: 'shadcn/ui supports multiple React frameworks. The CLI handles the initial setup including creating a components.json configuration file, setting up Tailwind CSS, and creating utility directories.',
    h3NextJs: 'Next.js Installation',
    h3Vite: 'Vite Installation',
    h3Remix: 'Remix Installation',
    h2ComponentsJson: 'Understanding components.json',
    componentsJsonDesc: 'The components.json file is the central configuration for shadcn/ui in your project. It tells the CLI where to put components, how to handle styling, and what import aliases to use.',
    componentsJsonFields: 'Key fields in components.json: style selects the visual style (default or new-york), tailwind.config points to your Tailwind config file, tailwind.css points to your global CSS file, aliases.components maps the import path for components, and aliases.utils maps the path for utility functions like cn().',
    h2UsingComponents: 'Using Components',
    usingDesc: 'Adding a component is as simple as running a CLI command. The component files are copied into your project at the path specified in components.json.',
    h3Button: 'Button Component',
    buttonDesc: 'The Button component supports multiple variants (default, destructive, outline, secondary, ghost, link) and sizes (default, sm, lg, icon).',
    h3Dialog: 'Dialog Component',
    dialogDesc: 'The Dialog component provides an accessible modal dialog built on Radix UI Dialog. It handles focus trapping, keyboard navigation, and screen reader announcements.',
    h3Form: 'Form Component',
    formDesc: 'The Form component integrates React Hook Form with shadcn/ui form fields. It provides automatic accessibility attributes, error messages, and form state management.',
    h3Table: 'Table Component',
    tableDesc: 'The Table component provides a clean, styled table with support for headers, body rows, footers, and captions.',
    h3Command: 'Command (cmdk) Component',
    commandDesc: 'The Command component is a command palette interface built on cmdk. It provides a searchable list of items with keyboard navigation — perfect for command menus, search dialogs, and comboboxes.',
    h2Theming: 'Theming and Dark Mode',
    themingDesc: 'shadcn/ui uses CSS variables for theming, which makes it easy to create custom color schemes and support dark mode. All colors are defined using HSL values in your global CSS file.',
    themingDarkDesc: 'Dark mode is handled by defining a second set of CSS variables inside a .dark class. When you toggle the dark class on the html or body element, all components automatically switch to dark mode colors.',
    h3ThemeProvider: 'Setting Up a Theme Provider',
    themeProviderDesc: 'Use next-themes (for Next.js) or a custom provider to toggle between light and dark mode. The provider wraps your application and manages the theme state.',
    h2Customization: 'Customization with CSS Variables',
    customizationDesc: 'Since you own the component code, customization is straightforward. You can modify CSS variables for global changes or edit individual component files for specific changes.',
    customizationP2: 'The CSS variable approach means you can create entirely new themes by changing a few HSL values. The naming convention uses semantic names like background, foreground, primary, secondary, muted, accent, and destructive.',
    h2Forms: 'Forms with React Hook Form and Zod',
    formsDesc: 'shadcn/ui provides a powerful form system that integrates React Hook Form for state management and Zod for schema-based validation. This gives you type-safe forms with automatic error handling.',
    formsSteps: 'Steps to build a form: 1) Define your Zod schema, 2) Create a form with useForm and zodResolver, 3) Use FormField components to connect fields to the form state, 4) Handle submission with the onSubmit callback.',
    h2DataTables: 'Data Tables with TanStack Table',
    dataTablesDesc: 'The DataTable component combines shadcn/ui Table with TanStack Table (formerly React Table) for powerful, flexible data table functionality including sorting, filtering, pagination, and row selection.',
    dataTablesSteps: 'Building a data table involves: 1) Defining column definitions with accessorKey and header, 2) Creating a DataTable component that uses useReactTable, 3) Rendering table headers and rows using the flexRender utility.',
    h2Accessibility: 'Accessibility Features',
    a11yDesc: 'Because shadcn/ui is built on Radix UI primitives, every component follows WAI-ARIA guidelines out of the box. This includes proper roles, keyboard navigation, focus management, and screen reader support.',
    a11yList1: 'All interactive components support full keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)',
    a11yList2: 'Focus is trapped inside modal dialogs and returned to the trigger on close',
    a11yList3: 'ARIA attributes (role, aria-expanded, aria-selected, aria-label) are managed automatically',
    a11yList4: 'Screen readers announce component state changes (open/closed, selected, checked)',
    a11yList5: 'Color contrast meets WCAG 2.1 AA standards in the default theme',
    a11yList6: 'Components handle touch targets and responsive behavior for mobile devices',
    h2CustomComponents: 'Creating Custom Components',
    customComponentsDesc: 'You can create your own components following the shadcn/ui pattern: use Radix UI (or another headless library) for behavior, Tailwind CSS for styling, and the cn() utility for conditional classes. This keeps your custom components consistent with the rest of your shadcn/ui components.',
    h2TailwindIntegration: 'Tailwind CSS Integration',
    tailwindDesc: 'shadcn/ui is designed to work seamlessly with Tailwind CSS. The cn() utility function (built on clsx and tailwind-merge) is essential for combining component classes with custom classes without conflicts.',
    tailwindP2: 'tailwind-merge intelligently resolves class conflicts. For example, if a component has bg-primary and you pass bg-red-500, tailwind-merge ensures only bg-red-500 is applied, avoiding Tailwind CSS specificity issues.',
    h2Migration: 'Migrating from Other UI Libraries',
    migrationDesc: 'If you are migrating from Material UI, Chakra UI, Ant Design, or another component library, shadcn/ui offers a gradual migration path. You can add shadcn/ui components alongside your existing library and migrate one component at a time.',
    migrationSteps: 'Migration strategy: 1) Install shadcn/ui alongside your existing library, 2) Replace one component at a time starting with the simplest ones (Button, Input, Badge), 3) Update form components using shadcn/ui Form with React Hook Form, 4) Migrate complex components (DataTable, Combobox, Command) last, 5) Remove the old library once all components are replaced.',
    h2BestPractices: 'Best Practices',
    bp1: 'Use the CLI to add components — do not copy files manually from GitHub',
    bp2: 'Keep components.json in version control so the CLI works for all team members',
    bp3: 'Use the cn() utility for all conditional class logic instead of manual string concatenation',
    bp4: 'Customize CSS variables in globals.css for consistent theming across all components',
    bp5: 'Do not modify the Radix UI primitive behavior unless you understand the accessibility implications',
    bp6: 'Use React Hook Form with Zod for all forms — it provides type safety and automatic error handling',
    bp7: 'Wrap shadcn/ui components in your own components for project-specific defaults and abstractions',
    bp8: 'Keep your components directory organized — group related components in subdirectories',
    bp9: 'Update components periodically by re-running the CLI add command and reviewing the diff',
    bp10: 'Use the new-york style variant for a more polished, compact design',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is shadcn/ui a component library?',
    faq1A: 'No, shadcn/ui is not a component library in the traditional sense. It is a collection of reusable components that you copy and paste into your project. You do not install it as an npm dependency. This means you own the code, can customize anything, and are not affected by breaking changes in library updates.',
    faq2Q: 'How do I update shadcn/ui components?',
    faq2A: 'Since components are copied into your project, updating is manual. Run the CLI add command again for the component you want to update, then review the diff to merge changes with your customizations. The CLI will warn you if the file already exists and let you overwrite or skip.',
    faq3Q: 'Can I use shadcn/ui without Tailwind CSS?',
    faq3A: 'shadcn/ui is designed specifically for Tailwind CSS. While you could theoretically restyle the components with regular CSS or CSS-in-JS, this would require significant effort and defeat the purpose of using shadcn/ui. If you do not use Tailwind CSS, consider using Radix UI directly with your own styling solution.',
    faq4Q: 'Is shadcn/ui production-ready?',
    faq4A: 'Yes, shadcn/ui is widely used in production. The components are built on battle-tested Radix UI primitives. Major companies and open-source projects use shadcn/ui. Since you own the code, you have full control over stability and can freeze components at any version.',
    faq5Q: 'How does shadcn/ui compare to Material UI or Chakra UI?',
    faq5A: 'Unlike Material UI and Chakra UI, shadcn/ui is not installed as a dependency. MUI and Chakra provide their own styling systems and theming APIs. shadcn/ui uses Tailwind CSS and gives you the actual source code. The trade-off is more control and flexibility with shadcn/ui, but less out-of-the-box theming infrastructure.',
    faq6Q: 'Does shadcn/ui support React Server Components?',
    faq6A: 'Many shadcn/ui components work with React Server Components. Static components like Table, Badge, and Card can be server components. Interactive components that use Radix UI (Dialog, Popover, Select) require the use client directive because they manage state and DOM events.',
    faq7Q: 'Can I use shadcn/ui with other frameworks like Vue or Svelte?',
    faq7A: 'shadcn/ui is built specifically for React. However, the concept has been ported to other frameworks. shadcn-vue provides a similar experience for Vue, and shadcn-svelte for Svelte. These are separate projects maintained by the community but follow the same copy-paste philosophy.',
    faq8Q: 'How do I handle component dependencies in shadcn/ui?',
    faq8A: 'When you add a component that depends on other components, the CLI automatically installs the dependencies. For example, adding the Combobox installs Popover, Command, and Button. Each component has its own npm dependencies (like Radix UI packages) which are added to your package.json automatically.',
  },
  zh: {
    title: 'shadcn/ui 完全指南：美观、无障碍的 React 组件',
    description: '学习如何使用 shadcn/ui 构建美观、无障碍的 React 组件。涵盖安装、主题、表单、数据表格、自定义和最佳实践。',
    intro: 'shadcn/ui 改变了开发者对 React 组件库的认知。它不是传统的 npm 包，而是让你将精心设计的无障碍组件直接复制到项目中。你拥有代码所有权，可以自定义一切，没有依赖锁定。基于 Radix UI 原语和 Tailwind CSS 构建，shadcn/ui 已成为 2026 年构建生产级 React 界面的首选。',
    tldr: 'shadcn/ui 是一组可复用的无障碍 React 组件，你将它们复制到项目中而非作为依赖安装。基于 Radix UI 和 Tailwind CSS，完全掌控组件代码。使用 CLI 添加组件，通过 CSS 变量自定义主题，配合 React Hook Form + Zod 构建表单，配合 TanStack Table 构建数据表格。',
    keyTakeaways: '核心要点',
    kt1: 'shadcn/ui 不是组件库 — 它是你拥有的复制粘贴组件集合',
    kt2: '基于 Radix UI 原语实现无障碍，使用 Tailwind CSS 进行样式设计',
    kt3: '使用 CLI（npx shadcn@latest add）向项目添加组件',
    kt4: '通过 CSS 变量实现主题 — 开箱支持暗黑模式',
    kt5: '配合 React Hook Form + Zod 实现类型安全的表单验证',
    kt6: 'TanStack Table 集成实现强大灵活的数据表格',
    kt7: 'components.json 配置路径、样式和组件别名',
    kt8: '完全自定义 — 因为你拥有源代码，可以修改任何组件',
    h2WhatIs: '什么是 shadcn/ui？',
    whatIsP1: 'shadcn/ui 不是传统的组件库。你不需要在 package.json 中安装它。它提供 CLI 和组件注册表，你可以将组件直接复制到项目中，拥有每一行代码。',
    whatIsP2: '每个组件基于 Radix UI 构建 — 一个无头的、无样式的无障碍组件库 — 并用 Tailwind CSS 设计样式。',
    whatIsP3: '核心理念是：用你需要的，改你想改的。没有主题 API、没有包装组件、没有库更新带来的破坏性变更。',
    h2Installation: '安装和设置',
    installDesc: 'shadcn/ui 支持多种 React 框架。CLI 处理初始设置，包括创建 components.json 配置文件、设置 Tailwind CSS 和创建工具目录。',
    h3NextJs: 'Next.js 安装',
    h3Vite: 'Vite 安装',
    h3Remix: 'Remix 安装',
    h2ComponentsJson: '理解 components.json',
    componentsJsonDesc: 'components.json 是项目中 shadcn/ui 的核心配置文件。它告诉 CLI 在哪里放置组件、如何处理样式以及使用什么导入别名。',
    componentsJsonFields: '关键字段：style 选择视觉风格，tailwind.config 指向 Tailwind 配置，tailwind.css 指向全局 CSS，aliases 映射导入路径。',
    h2UsingComponents: '使用组件',
    usingDesc: '添加组件只需运行 CLI 命令。组件文件会被复制到 components.json 中指定的路径。',
    h3Button: 'Button 按钮组件',
    buttonDesc: 'Button 组件支持多种变体（default、destructive、outline、secondary、ghost、link）和尺寸（default、sm、lg、icon）。',
    h3Dialog: 'Dialog 对话框组件',
    dialogDesc: 'Dialog 组件基于 Radix UI Dialog 构建，提供无障碍的模态对话框，处理焦点陷阱、键盘导航和屏幕阅读器播报。',
    h3Form: 'Form 表单组件',
    formDesc: 'Form 组件将 React Hook Form 与 shadcn/ui 表单字段集成，提供自动无障碍属性、错误消息和表单状态管理。',
    h3Table: 'Table 表格组件',
    tableDesc: 'Table 组件提供简洁的样式表格，支持表头、主体行、页脚和标题。',
    h3Command: 'Command 命令面板组件',
    commandDesc: 'Command 组件基于 cmdk 构建，提供可搜索的命令面板界面，支持键盘导航 — 适用于命令菜单、搜索对话框和组合框。',
    h2Theming: '主题和暗黑模式',
    themingDesc: 'shadcn/ui 使用 CSS 变量进行主题设置，轻松创建自定义配色方案并支持暗黑模式。所有颜色使用 HSL 值定义。',
    themingDarkDesc: '暗黑模式通过在 .dark 类中定义第二组 CSS 变量实现。切换 dark 类时，所有组件自动切换到暗黑模式颜色。',
    h3ThemeProvider: '设置主题提供器',
    themeProviderDesc: '使用 next-themes（Next.js）或自定义提供器在明暗模式间切换。',
    h2Customization: 'CSS 变量自定义',
    customizationDesc: '因为你拥有组件代码，自定义很简单。修改 CSS 变量进行全局更改，或编辑单个组件文件进行特定更改。',
    customizationP2: 'CSS 变量方法意味着只需更改几个 HSL 值就能创建全新主题。命名约定使用语义名称如 background、foreground、primary 等。',
    h2Forms: 'React Hook Form + Zod 表单',
    formsDesc: 'shadcn/ui 提供强大的表单系统，集成 React Hook Form 进行状态管理和 Zod 进行基于模式的验证，实现类型安全的表单和自动错误处理。',
    formsSteps: '构建表单的步骤：1) 定义 Zod 模式，2) 使用 useForm 和 zodResolver 创建表单，3) 使用 FormField 连接字段，4) 处理提交。',
    h2DataTables: 'TanStack Table 数据表格',
    dataTablesDesc: 'DataTable 组件将 shadcn/ui Table 与 TanStack Table 结合，提供排序、筛选、分页和行选择功能。',
    dataTablesSteps: '构建数据表格：1) 定义列，2) 创建使用 useReactTable 的 DataTable 组件，3) 使用 flexRender 渲染。',
    h2Accessibility: '无障碍特性',
    a11yDesc: '基于 Radix UI 原语构建，每个组件都遵循 WAI-ARIA 指南，包括正确的角色、键盘导航、焦点管理和屏幕阅读器支持。',
    a11yList1: '所有交互组件支持完整键盘导航（Tab、Enter、Space、方向键、Escape）',
    a11yList2: '焦点在模态对话框内被捕获，关闭时返回触发元素',
    a11yList3: 'ARIA 属性自动管理',
    a11yList4: '屏幕阅读器播报组件状态变化',
    a11yList5: '默认主题的颜色对比度符合 WCAG 2.1 AA 标准',
    a11yList6: '组件处理触摸目标和移动设备的响应行为',
    h2CustomComponents: '创建自定义组件',
    customComponentsDesc: '你可以按照 shadcn/ui 模式创建自己的组件：使用 Radix UI 处理行为，Tailwind CSS 处理样式，cn() 工具处理条件类名。',
    h2TailwindIntegration: 'Tailwind CSS 集成',
    tailwindDesc: 'shadcn/ui 与 Tailwind CSS 无缝配合。cn() 工具函数（基于 clsx 和 tailwind-merge）是组合类名的关键。',
    tailwindP2: 'tailwind-merge 智能解决类名冲突，确保自定义类正确覆盖组件默认类。',
    h2Migration: '从其他 UI 库迁移',
    migrationDesc: '从 Material UI、Chakra UI 或 Ant Design 迁移时，shadcn/ui 支持渐进式迁移，可以逐个组件替换。',
    migrationSteps: '迁移策略：1) 并行安装，2) 从简单组件开始替换，3) 迁移表单组件，4) 最后迁移复杂组件，5) 移除旧库。',
    h2BestPractices: '最佳实践',
    bp1: '使用 CLI 添加组件 — 不要从 GitHub 手动复制',
    bp2: '将 components.json 纳入版本控制',
    bp3: '使用 cn() 工具处理所有条件类名逻辑',
    bp4: '在 globals.css 中自定义 CSS 变量以保持主题一致',
    bp5: '除非理解无障碍影响，否则不要修改 Radix UI 原语行为',
    bp6: '所有表单使用 React Hook Form + Zod',
    bp7: '用自己的组件包装 shadcn/ui 组件以设置项目默认值',
    bp8: '保持组件目录整洁 — 将相关组件分组到子目录',
    bp9: '定期重新运行 CLI add 命令更新组件',
    bp10: '使用 new-york 样式变体获得更精致紧凑的设计',
    h2Faq: '常见问题',
    faq1Q: 'shadcn/ui 是组件库吗？',
    faq1A: '不是传统意义上的组件库。它是你复制粘贴到项目中的可复用组件集合，不作为 npm 依赖安装。你拥有代码，可以自定义一切。',
    faq2Q: '如何更新 shadcn/ui 组件？',
    faq2A: '由于组件被复制到项目中，更新是手动的。重新运行 CLI add 命令，然后审查差异以合并更改。',
    faq3Q: '可以不用 Tailwind CSS 使用 shadcn/ui 吗？',
    faq3A: 'shadcn/ui 专为 Tailwind CSS 设计。如果不用 Tailwind，建议直接使用 Radix UI 配合你自己的样式方案。',
    faq4Q: 'shadcn/ui 可以用于生产环境吗？',
    faq4A: '可以，shadcn/ui 广泛用于生产环境。组件基于经过实战检验的 Radix UI 原语构建。',
    faq5Q: 'shadcn/ui 与 Material UI 或 Chakra UI 有何不同？',
    faq5A: 'MUI 和 Chakra 作为依赖安装并提供自己的样式系统。shadcn/ui 使用 Tailwind CSS 并给你实际的源代码，提供更多控制和灵活性。',
    faq6Q: 'shadcn/ui 支持 React Server Components 吗？',
    faq6A: '静态组件如 Table、Badge 和 Card 可以作为服务器组件。交互组件需要 use client 指令。',
    faq7Q: '可以在 Vue 或 Svelte 中使用 shadcn/ui 吗？',
    faq7A: 'shadcn/ui 专为 React 构建，但社区已移植到 Vue（shadcn-vue）和 Svelte（shadcn-svelte）。',
    faq8Q: '如何处理 shadcn/ui 中的组件依赖？',
    faq8A: '添加依赖其他组件的组件时，CLI 会自动安装依赖。例如添加 Combobox 会自动安装 Popover、Command 和 Button。',
  },
};

export default function ShadcnGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '2rem', borderRadius: '0.5rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{t.keyTakeaways}</strong>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[t.kt1, t.kt2, t.kt3, t.kt4, t.kt5, t.kt6, t.kt7, t.kt8].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* What Is shadcn/ui */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2WhatIs}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.whatIsP1}</p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.whatIsP2}</p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.whatIsP3}</p>

      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'# The shadcn/ui approach:\n' +
          '# 1. You run the CLI to add a component\n' +
          'npx shadcn@latest add button\n\n' +
          '# 2. The component is copied into your project\n' +
          '# src/components/ui/button.tsx is created\n\n' +
          '# 3. You import and use it like any local component\n' +
          'import { Button } from "@/components/ui/button"\n\n' +
          '# 4. You own the code - edit it however you want\n' +
          '# No library dependency, no version conflicts'}</code>
      </pre>

      {/* Installation and Setup */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Installation}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.installDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3NextJs}</h3>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'# Create a new Next.js project\n' +
          'npx create-next-app@latest my-app --typescript --tailwind --eslint\n' +
          'cd my-app\n\n' +
          '# Initialize shadcn/ui\n' +
          'npx shadcn@latest init\n\n' +
          '# The CLI will ask you:\n' +
          '# - Which style? (default / new-york)\n' +
          '# - Which color? (slate / gray / zinc / neutral / stone)\n' +
          '# - Use CSS variables for colors? (yes)\n\n' +
          '# Add your first component\n' +
          'npx shadcn@latest add button\n\n' +
          '# Add multiple components at once\n' +
          'npx shadcn@latest add button card dialog input label'}</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Vite}</h3>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'# Create a Vite + React + TypeScript project\n' +
          'npm create vite@latest my-app -- --template react-ts\n' +
          'cd my-app\n\n' +
          '# Install Tailwind CSS\n' +
          'npm install -D tailwindcss @tailwindcss/vite\n\n' +
          '# Update vite.config.ts to include the plugin\n' +
          '# import tailwindcss from "@tailwindcss/vite"\n' +
          '# plugins: [react(), tailwindcss()]\n\n' +
          '# Configure path aliases in tsconfig.json\n' +
          '# "paths": { "@/*": ["./src/*"] }\n\n' +
          '# Initialize shadcn/ui\n' +
          'npx shadcn@latest init'}</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Remix}</h3>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'# Create a Remix project with Vite\n' +
          'npx create-remix@latest my-app\n' +
          'cd my-app\n\n' +
          '# Install and configure Tailwind CSS\n' +
          'npm install -D tailwindcss @tailwindcss/vite\n\n' +
          '# Initialize shadcn/ui\n' +
          'npx shadcn@latest init\n\n' +
          '# Add components as needed\n' +
          'npx shadcn@latest add button dialog form'}</code>
      </pre>

      {/* components.json */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2ComponentsJson}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.componentsJsonDesc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}>
        <code>{'// components.json\n' +
          '{\n' +
          '  "\\$schema": "https://ui.shadcn.com/schema.json",\n' +
          '  "style": "new-york",\n' +
          '  "rsc": true,\n' +
          '  "tsx": true,\n' +
          '  "tailwind": {\n' +
          '    "config": "tailwind.config.ts",\n' +
          '    "css": "src/app/globals.css",\n' +
          '    "baseColor": "zinc",\n' +
          '    "cssVariables": true,\n' +
          '    "prefix": ""\n' +
          '  },\n' +
          '  "aliases": {\n' +
          '    "components": "@/components",\n' +
          '    "utils": "@/lib/utils",\n' +
          '    "ui": "@/components/ui",\n' +
          '    "lib": "@/lib",\n' +
          '    "hooks": "@/hooks"\n' +
          '  }\n' +
          '}'}</code>
      </pre>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>{t.componentsJsonFields}</p>

      {/* Using Components */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2UsingComponents}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.usingDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Button}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.buttonDesc}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// Install: npx shadcn@latest add button\n' +
          'import { Button } from "@/components/ui/button"\n\n' +
          'export function ButtonExamples() {\n' +
          '  return (\n' +
          '    <div>\n' +
          '      {/* Variants */}\n' +
          '      <Button variant="default">Default</Button>\n' +
          '      <Button variant="destructive">Delete</Button>\n' +
          '      <Button variant="outline">Outline</Button>\n' +
          '      <Button variant="secondary">Secondary</Button>\n' +
          '      <Button variant="ghost">Ghost</Button>\n' +
          '      <Button variant="link">Link</Button>\n\n' +
          '      {/* Sizes */}\n' +
          '      <Button size="sm">Small</Button>\n' +
          '      <Button size="default">Default</Button>\n' +
          '      <Button size="lg">Large</Button>\n' +
          '      <Button size="icon"><IconComponent /></Button>\n\n' +
          '      {/* With loading state */}\n' +
          '      <Button disabled>\n' +
          '        <Loader2 style={{ animation: "spin 1s linear infinite" }} />\n' +
          '        Please wait\n' +
          '      </Button>\n' +
          '    </div>\n' +
          '  )\n' +
          '}'}</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Dialog}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.dialogDesc}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// Install: npx shadcn@latest add dialog\n' +
          'import {\n' +
          '  Dialog,\n' +
          '  DialogContent,\n' +
          '  DialogDescription,\n' +
          '  DialogFooter,\n' +
          '  DialogHeader,\n' +
          '  DialogTitle,\n' +
          '  DialogTrigger,\n' +
          '} from "@/components/ui/dialog"\n\n' +
          'export function DialogExample() {\n' +
          '  return (\n' +
          '    <Dialog>\n' +
          '      <DialogTrigger asChild>\n' +
          '        <Button variant="outline">Edit Profile</Button>\n' +
          '      </DialogTrigger>\n' +
          '      <DialogContent>\n' +
          '        <DialogHeader>\n' +
          '          <DialogTitle>Edit profile</DialogTitle>\n' +
          '          <DialogDescription>\n' +
          '            Make changes to your profile here.\n' +
          '          </DialogDescription>\n' +
          '        </DialogHeader>\n' +
          '        <div>\n' +
          '          <Label htmlFor="name">Name</Label>\n' +
          '          <Input id="name" defaultValue="John Doe" />\n' +
          '        </div>\n' +
          '        <DialogFooter>\n' +
          '          <Button type="submit">Save changes</Button>\n' +
          '        </DialogFooter>\n' +
          '      </DialogContent>\n' +
          '    </Dialog>\n' +
          '  )\n' +
          '}'}</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Command}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.commandDesc}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// Install: npx shadcn@latest add command\n' +
          'import {\n' +
          '  Command,\n' +
          '  CommandDialog,\n' +
          '  CommandEmpty,\n' +
          '  CommandGroup,\n' +
          '  CommandInput,\n' +
          '  CommandItem,\n' +
          '  CommandList,\n' +
          '  CommandSeparator,\n' +
          '} from "@/components/ui/command"\n\n' +
          'export function CommandMenu() {\n' +
          '  return (\n' +
          '    <Command>\n' +
          '      <CommandInput placeholder="Type a command..." />\n' +
          '      <CommandList>\n' +
          '        <CommandEmpty>No results found.</CommandEmpty>\n' +
          '        <CommandGroup heading="Suggestions">\n' +
          '          <CommandItem>Calendar</CommandItem>\n' +
          '          <CommandItem>Search</CommandItem>\n' +
          '          <CommandItem>Calculator</CommandItem>\n' +
          '        </CommandGroup>\n' +
          '        <CommandSeparator />\n' +
          '        <CommandGroup heading="Settings">\n' +
          '          <CommandItem>Profile</CommandItem>\n' +
          '          <CommandItem>Billing</CommandItem>\n' +
          '          <CommandItem>Settings</CommandItem>\n' +
          '        </CommandGroup>\n' +
          '      </CommandList>\n' +
          '    </Command>\n' +
          '  )\n' +
          '}'}</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Table}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.tableDesc}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// Install: npx shadcn@latest add table\n' +
          'import {\n' +
          '  Table, TableBody, TableCaption,\n' +
          '  TableCell, TableHead, TableHeader, TableRow,\n' +
          '} from "@/components/ui/table"\n\n' +
          'export function TableExample() {\n' +
          '  return (\n' +
          '    <Table>\n' +
          '      <TableCaption>A list of recent invoices.</TableCaption>\n' +
          '      <TableHeader>\n' +
          '        <TableRow>\n' +
          '          <TableHead>Invoice</TableHead>\n' +
          '          <TableHead>Status</TableHead>\n' +
          '          <TableHead>Method</TableHead>\n' +
          '          <TableHead>Amount</TableHead>\n' +
          '        </TableRow>\n' +
          '      </TableHeader>\n' +
          '      <TableBody>\n' +
          '        <TableRow>\n' +
          '          <TableCell>INV001</TableCell>\n' +
          '          <TableCell>Paid</TableCell>\n' +
          '          <TableCell>Credit Card</TableCell>\n' +
          '          <TableCell>\\$250.00</TableCell>\n' +
          '        </TableRow>\n' +
          '      </TableBody>\n' +
          '    </Table>\n' +
          '  )\n' +
          '}'}</code>
      </pre>

      {/* Theming and Dark Mode */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Theming}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.themingDesc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}>
        <code>{'/* globals.css - CSS Variables for theming */\n' +
          '@layer base {\n' +
          '  :root {\n' +
          '    --background: 0 0% 100%;\n' +
          '    --foreground: 222.2 84% 4.9%;\n' +
          '    --card: 0 0% 100%;\n' +
          '    --card-foreground: 222.2 84% 4.9%;\n' +
          '    --popover: 0 0% 100%;\n' +
          '    --popover-foreground: 222.2 84% 4.9%;\n' +
          '    --primary: 222.2 47.4% 11.2%;\n' +
          '    --primary-foreground: 210 40% 98%;\n' +
          '    --secondary: 210 40% 96.1%;\n' +
          '    --secondary-foreground: 222.2 47.4% 11.2%;\n' +
          '    --muted: 210 40% 96.1%;\n' +
          '    --muted-foreground: 215.4 16.3% 46.9%;\n' +
          '    --accent: 210 40% 96.1%;\n' +
          '    --accent-foreground: 222.2 47.4% 11.2%;\n' +
          '    --destructive: 0 84.2% 60.2%;\n' +
          '    --destructive-foreground: 210 40% 98%;\n' +
          '    --border: 214.3 31.8% 91.4%;\n' +
          '    --input: 214.3 31.8% 91.4%;\n' +
          '    --ring: 222.2 84% 4.9%;\n' +
          '    --radius: 0.5rem;\n' +
          '  }\n\n' +
          '  .dark {\n' +
          '    --background: 222.2 84% 4.9%;\n' +
          '    --foreground: 210 40% 98%;\n' +
          '    --primary: 210 40% 98%;\n' +
          '    --primary-foreground: 222.2 47.4% 11.2%;\n' +
          '    --secondary: 217.2 32.6% 17.5%;\n' +
          '    --secondary-foreground: 210 40% 98%;\n' +
          '    --muted: 217.2 32.6% 17.5%;\n' +
          '    --muted-foreground: 215 20.2% 65.1%;\n' +
          '    --accent: 217.2 32.6% 17.5%;\n' +
          '    --accent-foreground: 210 40% 98%;\n' +
          '    --destructive: 0 62.8% 30.6%;\n' +
          '    --destructive-foreground: 210 40% 98%;\n' +
          '    --border: 217.2 32.6% 17.5%;\n' +
          '    --input: 217.2 32.6% 17.5%;\n' +
          '    --ring: 212.7 26.8% 83.9%;\n' +
          '  }\n' +
          '}'}</code>
      </pre>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>{t.themingDarkDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ThemeProvider}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.themeProviderDesc}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// npm install next-themes\n' +
          '// components/theme-provider.tsx\n' +
          '"use client"\n\n' +
          'import { ThemeProvider as NextThemesProvider } from "next-themes"\n' +
          'import { type ThemeProviderProps } from "next-themes"\n\n' +
          'export function ThemeProvider({\n' +
          '  children, ...props\n' +
          '}: ThemeProviderProps) {\n' +
          '  return (\n' +
          '    <NextThemesProvider {...props}>\n' +
          '      {children}\n' +
          '    </NextThemesProvider>\n' +
          '  )\n' +
          '}\n\n' +
          '// app/layout.tsx\n' +
          'import { ThemeProvider } from "@/components/theme-provider"\n\n' +
          'export default function RootLayout({ children }) {\n' +
          '  return (\n' +
          '    <html lang="en" suppressHydrationWarning>\n' +
          '      <body>\n' +
          '        <ThemeProvider\n' +
          '          attribute="class"\n' +
          '          defaultTheme="system"\n' +
          '          enableSystem\n' +
          '          disableTransitionOnChange\n' +
          '        >\n' +
          '          {children}\n' +
          '        </ThemeProvider>\n' +
          '      </body>\n' +
          '    </html>\n' +
          '  )\n' +
          '}'}</code>
      </pre>

      {/* Customization with CSS Variables */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Customization}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.customizationDesc}</p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.customizationP2}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'/* Example: Creating a custom blue theme */\n' +
          '@layer base {\n' +
          '  :root {\n' +
          '    --primary: 221.2 83.2% 53.3%;    /* Blue */\n' +
          '    --primary-foreground: 210 40% 98%;\n' +
          '    --ring: 221.2 83.2% 53.3%;\n' +
          '    --radius: 0.75rem;  /* Rounder corners */\n' +
          '  }\n' +
          '}\n\n' +
          '/* Example: Creating a brand-colored theme */\n' +
          '@layer base {\n' +
          '  :root {\n' +
          '    /* Convert your brand color to HSL */\n' +
          '    /* Brand color: #6366f1 = 239 84% 67% */\n' +
          '    --primary: 239 84% 67%;\n' +
          '    --primary-foreground: 0 0% 100%;\n' +
          '    --ring: 239 84% 67%;\n' +
          '  }\n' +
          '}'}</code>
      </pre>

      {/* Forms with React Hook Form + Zod */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Forms}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.formsDesc}</p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.formsSteps}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// Install dependencies:\n' +
          '// npx shadcn@latest add form input button\n' +
          '// npm install zod @hookform/resolvers\n\n' +
          '"use client"\n\n' +
          'import { zodResolver } from "@hookform/resolvers/zod"\n' +
          'import { useForm } from "react-hook-form"\n' +
          'import { z } from "zod"\n' +
          'import { Button } from "@/components/ui/button"\n' +
          'import {\n' +
          '  Form, FormControl, FormDescription,\n' +
          '  FormField, FormItem, FormLabel, FormMessage,\n' +
          '} from "@/components/ui/form"\n' +
          'import { Input } from "@/components/ui/input"\n\n' +
          '// Step 1: Define Zod schema\n' +
          'const formSchema = z.object({\n' +
          '  username: z.string().min(2, {\n' +
          '    message: "Username must be at least 2 characters.",\n' +
          '  }),\n' +
          '  email: z.string().email({\n' +
          '    message: "Please enter a valid email address.",\n' +
          '  }),\n' +
          '})\n\n' +
          '// Step 2: Create the form component\n' +
          'export function ProfileForm() {\n' +
          '  const form = useForm<z.infer<typeof formSchema>>({\n' +
          '    resolver: zodResolver(formSchema),\n' +
          '    defaultValues: {\n' +
          '      username: "",\n' +
          '      email: "",\n' +
          '    },\n' +
          '  })\n\n' +
          '  function onSubmit(values: z.infer<typeof formSchema>) {\n' +
          '    console.log(values)\n' +
          '  }\n\n' +
          '  // Step 3: Render form fields\n' +
          '  return (\n' +
          '    <Form {...form}>\n' +
          '      <form onSubmit={form.handleSubmit(onSubmit)}>\n' +
          '        <FormField\n' +
          '          control={form.control}\n' +
          '          name="username"\n' +
          '          render={({ field }) => (\n' +
          '            <FormItem>\n' +
          '              <FormLabel>Username</FormLabel>\n' +
          '              <FormControl>\n' +
          '                <Input placeholder="shadcn" {...field} />\n' +
          '              </FormControl>\n' +
          '              <FormDescription>\n' +
          '                Your public display name.\n' +
          '              </FormDescription>\n' +
          '              <FormMessage />\n' +
          '            </FormItem>\n' +
          '          )}\n' +
          '        />\n' +
          '        <Button type="submit">Submit</Button>\n' +
          '      </form>\n' +
          '    </Form>\n' +
          '  )\n' +
          '}'}</code>
      </pre>

      {/* Data Tables with TanStack Table */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2DataTables}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.dataTablesDesc}</p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.dataTablesSteps}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// Install: npx shadcn@latest add table\n' +
          '// npm install @tanstack/react-table\n\n' +
          'import {\n' +
          '  ColumnDef,\n' +
          '  flexRender,\n' +
          '  getCoreRowModel,\n' +
          '  getPaginationRowModel,\n' +
          '  getSortedRowModel,\n' +
          '  SortingState,\n' +
          '  useReactTable,\n' +
          '} from "@tanstack/react-table"\n' +
          'import {\n' +
          '  Table, TableBody, TableCell,\n' +
          '  TableHead, TableHeader, TableRow,\n' +
          '} from "@/components/ui/table"\n\n' +
          '// Step 1: Define columns\n' +
          'type Payment = {\n' +
          '  id: string\n' +
          '  amount: number\n' +
          '  status: "pending" | "processing" | "success" | "failed"\n' +
          '  email: string\n' +
          '}\n\n' +
          'const columns: ColumnDef<Payment>[] = [\n' +
          '  {\n' +
          '    accessorKey: "status",\n' +
          '    header: "Status",\n' +
          '  },\n' +
          '  {\n' +
          '    accessorKey: "email",\n' +
          '    header: "Email",\n' +
          '  },\n' +
          '  {\n' +
          '    accessorKey: "amount",\n' +
          '    header: () => <div>Amount</div>,\n' +
          '    cell: ({ row }) => {\n' +
          '      const amount = parseFloat(row.getValue("amount"))\n' +
          '      const formatted = new Intl.NumberFormat("en-US", {\n' +
          '        style: "currency",\n' +
          '        currency: "USD",\n' +
          '      }).format(amount)\n' +
          '      return <div>{formatted}</div>\n' +
          '    },\n' +
          '  },\n' +
          ']\n\n' +
          '// Step 2: Create DataTable component\n' +
          'function DataTable<TData, TValue>({\n' +
          '  columns, data,\n' +
          '}: {\n' +
          '  columns: ColumnDef<TData, TValue>[]\n' +
          '  data: TData[]\n' +
          '}) {\n' +
          '  const [sorting, setSorting] = React.useState<SortingState>([])\n' +
          '  const table = useReactTable({\n' +
          '    data,\n' +
          '    columns,\n' +
          '    getCoreRowModel: getCoreRowModel(),\n' +
          '    getPaginationRowModel: getPaginationRowModel(),\n' +
          '    onSortingChange: setSorting,\n' +
          '    getSortedRowModel: getSortedRowModel(),\n' +
          '    state: { sorting },\n' +
          '  })\n\n' +
          '  return (\n' +
          '    <Table>\n' +
          '      <TableHeader>\n' +
          '        {table.getHeaderGroups().map((hg) => (\n' +
          '          <TableRow key={hg.id}>\n' +
          '            {hg.headers.map((header) => (\n' +
          '              <TableHead key={header.id}>\n' +
          '                {flexRender(\n' +
          '                  header.column.columnDef.header,\n' +
          '                  header.getContext()\n' +
          '                )}\n' +
          '              </TableHead>\n' +
          '            ))}\n' +
          '          </TableRow>\n' +
          '        ))}\n' +
          '      </TableHeader>\n' +
          '      <TableBody>\n' +
          '        {table.getRowModel().rows.map((row) => (\n' +
          '          <TableRow key={row.id}>\n' +
          '            {row.getVisibleCells().map((cell) => (\n' +
          '              <TableCell key={cell.id}>\n' +
          '                {flexRender(\n' +
          '                  cell.column.columnDef.cell,\n' +
          '                  cell.getContext()\n' +
          '                )}\n' +
          '              </TableCell>\n' +
          '            ))}\n' +
          '          </TableRow>\n' +
          '        ))}\n' +
          '      </TableBody>\n' +
          '    </Table>\n' +
          '  )\n' +
          '}'}</code>
      </pre>

      {/* Accessibility Features */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Accessibility}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.a11yDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.a11yList1, t.a11yList2, t.a11yList3, t.a11yList4, t.a11yList5, t.a11yList6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// Accessibility is built-in with Radix UI\n' +
          '// Example: Dialog with proper focus management\n' +
          '<Dialog>\n' +
          '  <DialogTrigger asChild>\n' +
          '    {/* Trigger receives focus on close */}\n' +
          '    <Button>Open Dialog</Button>\n' +
          '  </DialogTrigger>\n' +
          '  <DialogContent>\n' +
          '    {/* Focus is trapped inside */}\n' +
          '    {/* Escape key closes the dialog */}\n' +
          '    {/* aria-describedby auto-set */}\n' +
          '    <DialogTitle>Accessible Dialog</DialogTitle>\n' +
          '    <DialogDescription>\n' +
          '      Screen readers announce this description.\n' +
          '    </DialogDescription>\n' +
          '    <Button>First focusable element</Button>\n' +
          '  </DialogContent>\n' +
          '</Dialog>'}</code>
      </pre>

      {/* Creating Custom Components */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2CustomComponents}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.customComponentsDesc}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// Example: Custom StatusBadge component\n' +
          '// following the shadcn/ui pattern\n' +
          'import * as React from "react"\n' +
          'import { cva, type VariantProps } from "class-variance-authority"\n' +
          'import { cn } from "@/lib/utils"\n\n' +
          'const statusBadgeVariants = cva(\n' +
          '  "inline-flex items-center rounded-full px-2.5 py-0.5 ' +
          'text-xs font-semibold transition-colors ' +
          'focus:outline-none focus:ring-2 focus:ring-ring",\n' +
          '  {\n' +
          '    variants: {\n' +
          '      status: {\n' +
          '        online: "bg-green-100 text-green-800 ' +
          'dark:bg-green-900 dark:text-green-300",\n' +
          '        offline: "bg-gray-100 text-gray-800 ' +
          'dark:bg-gray-800 dark:text-gray-300",\n' +
          '        busy: "bg-red-100 text-red-800 ' +
          'dark:bg-red-900 dark:text-red-300",\n' +
          '        away: "bg-yellow-100 text-yellow-800 ' +
          'dark:bg-yellow-900 dark:text-yellow-300",\n' +
          '      },\n' +
          '    },\n' +
          '    defaultVariants: {\n' +
          '      status: "offline",\n' +
          '    },\n' +
          '  }\n' +
          ')\n\n' +
          'interface StatusBadgeProps\n' +
          '  extends React.HTMLAttributes<HTMLDivElement>,\n' +
          '    VariantProps<typeof statusBadgeVariants> {}\n\n' +
          'function StatusBadge({ status, ...props }: StatusBadgeProps) {\n' +
          '  return (\n' +
          '    <div\n' +
          '      {...props}\n' +
          '      // cn() merges classes without conflicts\n' +
          '    />\n' +
          '  )\n' +
          '}\n\n' +
          'export { StatusBadge, statusBadgeVariants }'}</code>
      </pre>

      {/* Tailwind CSS Integration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2TailwindIntegration}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.tailwindDesc}</p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.tailwindP2}</p>
      <pre style={{ backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <code>{'// src/lib/utils.ts - The cn() utility\n' +
          'import { type ClassValue, clsx } from "clsx"\n' +
          'import { twMerge } from "tailwind-merge"\n\n' +
          'export function cn(...inputs: ClassValue[]) {\n' +
          '  return twMerge(clsx(inputs))\n' +
          '}\n\n' +
          '// Usage: combining component + custom classes\n' +
          'import { cn } from "@/lib/utils"\n\n' +
          '// Without cn(): "bg-primary bg-red-500"\n' +
          '// Both classes applied = unpredictable result\n\n' +
          '// With cn(): "bg-red-500"\n' +
          '// tailwind-merge resolves the conflict\n\n' +
          'function MyComponent({ isActive }: { isActive: boolean }) {\n' +
          '  return (\n' +
          '    <div\n' +
          '      // cn() handles conditional classes cleanly\n' +
          '    >\n' +
          '      Content\n' +
          '    </div>\n' +
          '  )\n' +
          '}'}</code>
      </pre>

      {/* Migration from Other UI Libraries */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Migration}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.migrationDesc}</p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.migrationSteps}</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f2937' }}>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>shadcn/ui</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Material UI</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Chakra UI</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Installation', 'Copy to project', 'npm dependency', 'npm dependency'],
              ['Styling', 'Tailwind CSS', 'Emotion / styled', 'Emotion / styled'],
              ['Code ownership', 'Full ownership', 'Library-owned', 'Library-owned'],
              ['Bundle size', 'Only what you use', 'Tree-shakeable', 'Tree-shakeable'],
              ['Customization', 'Edit source directly', 'Theme API + sx prop', 'Theme API + style props'],
              ['Accessibility', 'Radix UI (WAI-ARIA)', 'Built-in (WAI-ARIA)', 'Built-in (WAI-ARIA)'],
              ['Update strategy', 'Manual (re-run CLI)', 'npm update', 'npm update'],
              ['Dark mode', 'CSS variables', 'ThemeProvider', 'ColorModeProvider'],
            ].map(([feature, shadcn, mui, chakra], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{feature}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{shadcn}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{mui}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{chakra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.bp1, t.bp2, t.bp3, t.bp4, t.bp5, t.bp6, t.bp7, t.bp8, t.bp9, t.bp10].map((bp, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{bp}</li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
          [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
