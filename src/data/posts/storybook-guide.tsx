'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Storybook 8 Guide 2026: Component-Driven Development, Testing, and Documentation',
    intro: 'Storybook is the industry-standard UI component workshop for building, testing, and documenting components in isolation. With Storybook 8, teams can develop UI components independently from business logic and backend dependencies, run interaction tests with play functions, catch visual regressions with Chromatic, and generate living documentation automatically. Whether you work with React, Vue, Angular, or Svelte, Storybook provides a unified environment for component-driven development that scales from solo projects to enterprise design systems.',
    tldr: 'Storybook 8 is a UI component workshop that lets you build, test, and document components in isolation. It supports React, Vue, Angular, and Svelte with the CSF3 story format, args and controls for interactive props, play functions for interaction testing, Chromatic for visual regression, the a11y addon for accessibility audits, MDX for rich documentation, and a powerful addons ecosystem. It integrates into CI/CD pipelines and is the foundation for scalable design systems.',
    keyTakeaway1: 'Storybook 8 uses Component Story Format 3 (CSF3) with an object-based syntax that is more concise, type-safe, and composable than previous formats.',
    keyTakeaway2: 'Args and Controls generate an interactive UI panel where designers and QA can manipulate component props in real time without editing code.',
    keyTakeaway3: 'Play functions allow writing interaction tests directly inside stories, simulating user clicks, typing, and assertions using Testing Library.',
    keyTakeaway4: 'Chromatic integration catches visual regressions by comparing screenshots of every story across commits, browsers, and viewports.',
    keyTakeaway5: 'The a11y addon runs automated accessibility audits based on axe-core rules against every story, catching WCAG violations early.',
    keyTakeaway6: 'Storybook generates living documentation from stories and MDX files, keeping docs always in sync with the actual component code.',

    h2WhatIs: 'What Is Storybook and Component-Driven Development?',
    whatIsDesc: 'Storybook is an open-source tool that provides a sandboxed environment for developing UI components in isolation. Instead of navigating through your entire application to see a specific component state, you define stories that render your component with different props, states, and contexts. Each story is a named export that captures a specific variation of your component.',
    whatIsDesc2: 'Component-driven development (CDD) is a methodology where you build UIs from the bottom up, starting with atomic components (buttons, inputs, badges), composing them into molecules (search bars, cards), and assembling molecules into organisms and pages. Storybook is the primary tool that enables this workflow by providing an isolated development environment with hot module replacement, responsive viewport controls, and a rich addon ecosystem.',

    h2Comparison: 'Storybook vs Alternatives',
    comparisonDesc: 'While Storybook dominates the component workshop space, alternatives exist. Ladle is a lightweight alternative built on Vite that focuses on React components with faster startup. Histoire supports Vue and Svelte with a similar story-based approach. Styleguidist generates style guides from JSDoc comments. React Cosmos provides fixtures-based component exploration. However, Storybook has the largest ecosystem with 400+ addons, the most framework support, and the strongest CI/CD integration story through Chromatic.',

    h2Setup: 'Setting Up Storybook for React, Vue, Angular, and Svelte',
    setupDesc: 'Storybook 8 provides a zero-config setup experience. The init command detects your framework, installs dependencies, and generates configuration files automatically. Storybook 8 is built on Vite by default for all frameworks, delivering significantly faster startup and hot module replacement.',
    h3SetupReact: 'React Setup',
    h3SetupVue: 'Vue Setup',
    h3SetupAngular: 'Angular Setup',
    h3SetupSvelte: 'Svelte Setup',
    setupConfigDesc: 'After initialization, Storybook creates a .storybook directory with two key configuration files: main.ts for build configuration and preview.ts for runtime configuration that applies to all stories.',

    h2CSF3: 'Writing Stories with CSF3 Format',
    csf3Desc: 'Component Story Format 3 (CSF3) is the latest story format in Storybook 8. Stories are defined as plain objects instead of functions, making them more concise and composable. Each file has a default export (meta) that describes the component and named exports that define individual stories.',
    csf3Desc2: 'CSF3 introduces the concept of story-level args that automatically generate Controls UI, allowing non-developers to explore component variations interactively. Stories can also extend other stories, reducing duplication when testing variations of the same base state.',

    h2ArgsControls: 'Args, Controls, and ArgTypes',
    argsDesc: 'Args are the mechanism for defining and manipulating component props in Storybook. When you define args on a story, Storybook automatically generates a Controls panel that lets users modify those props interactively. ArgTypes provide metadata about args, allowing you to customize the control type, set valid options, add descriptions, and define default values.',
    argsDesc2: 'Controls support a wide range of input types: text inputs, number inputs, booleans, radio buttons, select dropdowns, color pickers, date pickers, range sliders, and object/array editors. Storybook infers the correct control type from your TypeScript prop types or PropTypes, but you can override them via argTypes.',

    h2Decorators: 'Decorators and Parameters',
    decoratorsDesc: 'Decorators wrap stories with additional rendering logic. They are essential for providing context that components need, such as theme providers, router contexts, internationalization providers, or Redux stores. Decorators can be applied at the story level, component level, or globally in preview.ts.',
    decoratorsDesc2: 'Parameters are static metadata attached to stories that configure addon behavior. For example, you can set the viewport size, background color, disable specific addons, or configure the layout mode. Like decorators, parameters cascade from global to component to story level.',

    h2PlayFunctions: 'Play Functions for Interaction Testing',
    playDesc: 'Play functions are one of the most powerful features in Storybook 8. They let you write interaction tests directly inside stories using Testing Library and expect assertions. When a story with a play function loads, Storybook automatically executes the interactions and reports pass/fail results in the Interactions panel.',
    playDesc2: 'Play functions run in the browser, so they test actual DOM behavior. You can simulate user clicks, keyboard input, form submission, drag and drop, and more. Combined with the test-runner package, play functions can be executed in CI to catch regressions automatically.',

    h2VisualTesting: 'Visual Regression Testing with Chromatic',
    visualDesc: 'Visual regression testing compares screenshots of your components across commits to catch unintended visual changes. Chromatic is the official cloud service built by the Storybook team that captures a screenshot of every story in every browser and viewport, then diffs them against the baseline.',
    visualDesc2: 'When Chromatic detects a visual change, it creates a review for your team. Reviewers can approve intentional changes (updating the baseline) or reject regressions. This workflow integrates with GitHub pull requests, so visual reviews happen alongside code reviews.',

    h2A11y: 'Accessibility Testing with the a11y Addon',
    a11yDesc: 'The a11y addon integrates axe-core accessibility testing into Storybook. It runs automated audits against every story and reports violations, passes, and incomplete checks in a dedicated panel. This catches common WCAG violations like missing alt text, insufficient color contrast, missing form labels, and incorrect ARIA attributes.',
    a11yDesc2: 'You can configure severity levels and rule overrides per story or globally. Combined with play functions, you can test accessibility in interactive states like open dropdowns, focused inputs, and error messages that only appear after user interaction.',

    h2MDX: 'Documentation with MDX',
    mdxDesc: 'Storybook supports MDX (Markdown + JSX) for writing rich documentation pages alongside your stories. MDX docs can embed live story previews, component prop tables (generated from TypeScript types), code snippets, and custom React components. This creates living documentation that stays in sync with your actual components.',
    mdxDesc2: 'Storybook 8 uses autodocs by default, automatically generating a documentation page for each component from its stories and JSDoc comments. You can override this with a custom MDX file when you need more detailed documentation with usage guidelines, design rationale, or complex examples.',

    h2Addons: 'Addons Ecosystem',
    addonsDesc: 'Storybook has the largest addon ecosystem of any component workshop, with over 400 community addons. Official addons include Controls, Actions (event logging), Viewport (responsive preview), Backgrounds, Measure, Outline, and the Accessibility addon. Community addons extend functionality with tools like storybook-dark-mode, storybook-addon-designs (Figma embeds), storybook-addon-performance, and msw-storybook-addon for API mocking.',
    addonsDesc2: 'Addons hook into the Storybook lifecycle through a well-defined API. They can add panels, toolbar buttons, decorators, and custom tabs. Building a custom addon involves creating a manager (toolbar/panel UI) and a decorator (story wrapper) that communicate through a channel API.',

    h2TypeScript: 'TypeScript Integration',
    tsDesc: 'Storybook 8 has first-class TypeScript support. The Meta and StoryObj types provide full type checking for your stories, ensuring args match your component props, play functions have the correct context, and decorators return valid JSX. TypeScript prop types are automatically extracted to generate ArgTypes and Controls.',
    tsDesc2: 'The satisfies operator in TypeScript works especially well with CSF3, providing type checking without widening the type. This ensures your stories are type-safe while still allowing Storybook to infer the specific args for each story.',

    h2CICD: 'CI/CD Integration',
    cicdDesc: 'Storybook integrates into continuous integration pipelines through the test-runner package and Chromatic. The test-runner executes all play functions in a headless browser (Playwright), reporting results in standard test formats. Chromatic runs visual and interaction tests in the cloud, providing parallelized execution across browsers.',
    cicdDesc2: 'A typical CI pipeline runs the Storybook test-runner for interaction tests, publishes to Chromatic for visual regression tests, and deploys the built Storybook as a static site for stakeholder review. GitHub Actions, GitLab CI, and CircleCI all have official guides.',

    h2Performance: 'Performance Optimization and Best Practices',
    perfDesc: 'As your component library grows, Storybook build and startup times can increase. These best practices keep your workflow fast and your stories maintainable.',
    bp1: 'Use the Vite builder (default in Storybook 8) for significantly faster startup and HMR compared to Webpack.',
    bp2: 'Enable lazy compilation in development so only the stories you navigate to are compiled, reducing initial startup time.',
    bp3: 'Write one story file per component and co-locate it next to the component file for discoverability.',
    bp4: 'Use args instead of hardcoded props in stories to make every variation explorable through Controls.',
    bp5: 'Apply decorators at the lowest possible level to avoid unnecessary re-renders when switching stories.',
    bp6: 'Use play functions for interaction tests instead of separate testing files to keep tests close to stories.',
    bp7: 'Configure autodocs for automatic documentation generation instead of manually maintaining MDX files.',
    bp8: 'Mock external dependencies (API calls, routers, stores) using decorators and MSW instead of real backends.',
    bp9: 'Use the composition feature to combine multiple Storybooks from different packages in a monorepo.',
    bp10: 'Set up Chromatic TurboSnap to only capture snapshots of stories affected by code changes, reducing CI time and cost.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Storybook used for?',
    faq1A: 'Storybook is used for developing, testing, and documenting UI components in isolation. It provides a sandbox environment where you can render components with different props, states, and contexts without running your full application. Teams use it for component-driven development, design system maintenance, visual regression testing, accessibility auditing, and generating living documentation.',
    faq2Q: 'What is CSF3 in Storybook?',
    faq2A: 'CSF3 (Component Story Format 3) is the latest story format in Storybook 8. Stories are defined as plain objects with an args property instead of render functions. This makes stories more concise, composable, and type-safe. CSF3 stories automatically generate Controls UI and can extend other stories to reduce duplication.',
    faq3Q: 'How do play functions work in Storybook?',
    faq3A: 'Play functions are async functions attached to stories that simulate user interactions using Testing Library. When a story loads, Storybook executes the play function automatically, running clicks, typing, and assertions in the real browser DOM. Results appear in the Interactions panel. The test-runner package can execute play functions in CI for automated regression testing.',
    faq4Q: 'What is the difference between Storybook and Chromatic?',
    faq4A: 'Storybook is the open-source component workshop that runs locally or is deployed as a static site. Chromatic is a paid cloud service built by the Storybook team that provides visual regression testing, interaction testing in CI, and collaborative review workflows. Chromatic captures screenshots of every story and diffs them across commits to catch visual regressions.',
    faq5Q: 'Does Storybook support Vue and Angular?',
    faq5A: 'Yes. Storybook 8 supports React, Vue 3, Angular, Svelte, Web Components, HTML, and Ember. The setup process is the same for all frameworks: run npx storybook init in your project and Storybook auto-detects the framework. Stories use the same CSF3 format regardless of framework, though the rendering syntax varies.',
    faq6Q: 'How do I test accessibility in Storybook?',
    faq6A: 'Install the a11y addon (@storybook/addon-a11y) which integrates axe-core accessibility testing. It automatically runs audits against every story and displays violations, passes, and incomplete checks in a dedicated panel. You can configure rules globally or per story, and combine a11y with play functions to test accessibility in interactive states.',
    faq7Q: 'Can I generate documentation from Storybook?',
    faq7A: 'Yes. Storybook 8 supports autodocs which automatically generates a documentation page for each component from its stories, TypeScript prop types, and JSDoc comments. You can also write custom MDX documentation pages that embed live story previews, prop tables, and code snippets. The built Storybook serves as a living style guide.',
    faq8Q: 'How do I integrate Storybook into CI/CD?',
    faq8A: 'Use the @storybook/test-runner package to execute all play functions in a headless Playwright browser during CI. For visual regression testing, integrate Chromatic which runs in the cloud and provides GitHub PR status checks. You can also build Storybook as a static site and deploy it to any hosting provider for stakeholder review.',
  },
  zh: {
    title: 'Storybook 8 指南 2026：组件驱动开发、测试与文档',
    intro: 'Storybook 是业界标准的 UI 组件工作台，用于在隔离环境中构建、测试和文档化组件。借助 Storybook 8，团队可以独立于业务逻辑和后端依赖开发 UI 组件，使用 play 函数运行交互测试，通过 Chromatic 捕获视觉回归，并自动生成活文档。无论使用 React、Vue、Angular 还是 Svelte，Storybook 都提供统一的组件驱动开发环境。',
    tldr: 'Storybook 8 是一个 UI 组件工作台，支持在隔离环境中构建、测试和文档化组件。它支持 React、Vue、Angular 和 Svelte，采用 CSF3 故事格式、args 和 controls 交互属性、play 函数交互测试、Chromatic 视觉回归、a11y 插件无障碍审计、MDX 文档和强大的插件生态。',
    keyTakeaway1: 'Storybook 8 使用 CSF3 格式，基于对象语法，比之前的格式更简洁、类型安全且可组合。',
    keyTakeaway2: 'Args 和 Controls 生成交互式面板，设计师和 QA 可以实时操作组件属性而无需编辑代码。',
    keyTakeaway3: 'Play 函数允许直接在故事中编写交互测试，使用 Testing Library 模拟用户点击、输入和断言。',
    keyTakeaway4: 'Chromatic 集成通过跨提交、浏览器和视口比较截图来捕获视觉回归。',
    keyTakeaway5: 'a11y 插件基于 axe-core 规则对每个故事运行自动化无障碍审计，提前发现 WCAG 违规。',
    keyTakeaway6: 'Storybook 从故事和 MDX 文件生成活文档，确保文档始终与实际组件代码同步。',

    h2WhatIs: '什么是 Storybook 和组件驱动开发？',
    whatIsDesc: 'Storybook 是一个开源工具，提供沙盒环境用于在隔离状态下开发 UI 组件。你可以定义故事来渲染具有不同属性、状态和上下文的组件，而不需要浏览整个应用程序。',
    whatIsDesc2: '组件驱动开发（CDD）是一种自下而上构建 UI 的方法论，从原子组件开始，组合成分子组件，最终组装成有机体和页面。Storybook 是支持此工作流的主要工具。',

    h2Comparison: 'Storybook 与替代方案对比',
    comparisonDesc: 'Storybook 在组件工作台领域占主导地位，但也存在替代方案。Ladle 是基于 Vite 的轻量级 React 替代方案。Histoire 支持 Vue 和 Svelte。然而 Storybook 拥有最大的生态系统（400+ 插件）、最多的框架支持和最强的 CI/CD 集成。',

    h2Setup: '为 React、Vue、Angular 和 Svelte 设置 Storybook',
    setupDesc: 'Storybook 8 提供零配置设置体验。init 命令自动检测框架、安装依赖并生成配置文件。Storybook 8 默认使用 Vite 构建，提供更快的启动和热更新。',
    h3SetupReact: 'React 设置',
    h3SetupVue: 'Vue 设置',
    h3SetupAngular: 'Angular 设置',
    h3SetupSvelte: 'Svelte 设置',
    setupConfigDesc: '初始化后，Storybook 创建 .storybook 目录，包含 main.ts（构建配置）和 preview.ts（运行时配置）。',

    h2CSF3: '使用 CSF3 格式编写故事',
    csf3Desc: 'CSF3 是 Storybook 8 中的最新故事格式。故事定义为普通对象而非函数，更简洁且可组合。每个文件有一个默认导出（meta）描述组件，命名导出定义各个故事。',
    csf3Desc2: 'CSF3 引入了故事级 args，自动生成 Controls UI，允许非开发人员交互式探索组件变体。',

    h2ArgsControls: 'Args、Controls 和 ArgTypes',
    argsDesc: 'Args 是在 Storybook 中定义和操作组件属性的机制。定义 args 后，Storybook 自动生成 Controls 面板。ArgTypes 提供关于 args 的元数据，可自定义控件类型、设置有效选项和定义默认值。',
    argsDesc2: 'Controls 支持多种输入类型：文本、数字、布尔值、单选、下拉、颜色选择器、日期选择器、滑块和对象编辑器。',

    h2Decorators: '装饰器和参数',
    decoratorsDesc: '装饰器用额外的渲染逻辑包装故事，可提供主题、路由、国际化等上下文。装饰器可在故事级、组件级或全局级应用。',
    decoratorsDesc2: '参数是附加到故事的静态元数据，用于配置插件行为，如视口大小、背景色和布局模式。',

    h2PlayFunctions: 'Play 函数交互测试',
    playDesc: 'Play 函数是 Storybook 8 最强大的功能之一。可以使用 Testing Library 直接在故事中编写交互测试。故事加载时自动执行交互并在面板中报告结果。',
    playDesc2: 'Play 函数在浏览器中运行，测试实际 DOM 行为。可模拟点击、键盘输入、表单提交等。配合 test-runner 可在 CI 中自动执行。',

    h2VisualTesting: '使用 Chromatic 进行视觉回归测试',
    visualDesc: '视觉回归测试通过跨提交比较组件截图来捕获意外的视觉变化。Chromatic 是 Storybook 团队构建的官方云服务。',
    visualDesc2: '当 Chromatic 检测到视觉变化时，会创建审查流程。审查者可批准或拒绝变更，该流程与 GitHub PR 集成。',

    h2A11y: '使用 a11y 插件进行无障碍测试',
    a11yDesc: 'a11y 插件将 axe-core 无障碍测试集成到 Storybook 中，自动对每个故事运行审计并报告违规。',
    a11yDesc2: '可按故事或全局配置严重级别和规则覆盖。配合 play 函数可测试交互状态下的无障碍性。',

    h2MDX: '使用 MDX 编写文档',
    mdxDesc: 'Storybook 支持 MDX 编写富文档页面。MDX 文档可嵌入实时故事预览、组件属性表、代码片段和自定义组件。',
    mdxDesc2: 'Storybook 8 默认使用 autodocs，自动从故事和 JSDoc 注释生成文档页面。也可用自定义 MDX 文件覆盖。',

    h2Addons: '插件生态系统',
    addonsDesc: 'Storybook 拥有最大的插件生态系统，超过 400 个社区插件。官方插件包括 Controls、Actions、Viewport、Backgrounds 等。',
    addonsDesc2: '插件通过定义良好的 API 接入 Storybook 生命周期，可添加面板、工具栏按钮、装饰器和自定义标签。',

    h2TypeScript: 'TypeScript 集成',
    tsDesc: 'Storybook 8 具有一流的 TypeScript 支持。Meta 和 StoryObj 类型为故事提供完整的类型检查。TypeScript 属性类型自动提取以生成 ArgTypes 和 Controls。',
    tsDesc2: 'TypeScript 的 satisfies 操作符与 CSF3 配合良好，提供类型检查同时允许 Storybook 推断每个故事的具体 args。',

    h2CICD: 'CI/CD 集成',
    cicdDesc: 'Storybook 通过 test-runner 包和 Chromatic 集成到 CI 流程。test-runner 在无头浏览器中执行所有 play 函数。',
    cicdDesc2: '典型的 CI 流程：运行 test-runner 进行交互测试，发布到 Chromatic 进行视觉回归测试，部署构建后的 Storybook 供评审。',

    h2Performance: '性能优化与最佳实践',
    perfDesc: '随着组件库增长，Storybook 构建和启动时间可能增加。以下最佳实践帮助保持工作流高效。',
    bp1: '使用 Vite 构建器（Storybook 8 默认）获得更快的启动和 HMR。',
    bp2: '启用懒编译，只编译导航到的故事，减少初始启动时间。',
    bp3: '每个组件一个故事文件，与组件文件放在一起便于发现。',
    bp4: '使用 args 而非硬编码属性，使每个变体可通过 Controls 探索。',
    bp5: '在尽可能低的层级应用装饰器，避免切换故事时不必要的重渲染。',
    bp6: '使用 play 函数进行交互测试，保持测试靠近故事。',
    bp7: '配置 autodocs 自动生成文档，而非手动维护 MDX 文件。',
    bp8: '使用装饰器和 MSW 模拟外部依赖，而非真实后端。',
    bp9: '使用组合功能在 monorepo 中合并多个 Storybook。',
    bp10: '设置 Chromatic TurboSnap 只捕获受代码变更影响的故事快照，减少 CI 时间和成本。',

    h2Faq: '常见问题',
    faq1Q: 'Storybook 用来做什么？',
    faq1A: 'Storybook 用于在隔离环境中开发、测试和文档化 UI 组件。团队用它进行组件驱动开发、设计系统维护、视觉回归测试、无障碍审计和生成活文档。',
    faq2Q: '什么是 Storybook 中的 CSF3？',
    faq2A: 'CSF3 是 Storybook 8 中的最新故事格式。故事定义为带有 args 属性的普通对象，更简洁、可组合且类型安全。',
    faq3Q: 'Storybook 中的 play 函数如何工作？',
    faq3A: 'Play 函数是附加到故事的异步函数，使用 Testing Library 模拟用户交互。故事加载时自动执行，test-runner 可在 CI 中执行。',
    faq4Q: 'Storybook 和 Chromatic 有什么区别？',
    faq4A: 'Storybook 是开源组件工作台，Chromatic 是付费云服务，提供视觉回归测试和协作审查工作流。',
    faq5Q: 'Storybook 支持 Vue 和 Angular 吗？',
    faq5A: '支持。Storybook 8 支持 React、Vue 3、Angular、Svelte、Web Components 等。',
    faq6Q: '如何在 Storybook 中测试无障碍性？',
    faq6A: '安装 a11y 插件，它集成 axe-core 自动运行无障碍审计并在面板中显示违规。',
    faq7Q: '可以从 Storybook 生成文档吗？',
    faq7A: '可以。Storybook 8 的 autodocs 自动从故事和类型生成文档页面，也支持自定义 MDX 文档。',
    faq8Q: '如何将 Storybook 集成到 CI/CD？',
    faq8A: '使用 test-runner 在 CI 中执行 play 函数，集成 Chromatic 进行视觉回归测试，部署静态 Storybook 供评审。',
  },
};

export default function StorybookGuide({ lang }: { lang: string }) {
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

  const sectionTitle: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const subTitle: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const para: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const codeBlock: React.CSSProperties = { backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem', color: '#e5e7eb' };
  const listItem: React.CSSProperties = { marginBottom: '0.5rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>Key Takeaways</strong>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
          <li style={listItem}>{t.keyTakeaway1}</li>
          <li style={listItem}>{t.keyTakeaway2}</li>
          <li style={listItem}>{t.keyTakeaway3}</li>
          <li style={listItem}>{t.keyTakeaway4}</li>
          <li style={listItem}>{t.keyTakeaway5}</li>
          <li style={listItem}>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* What Is Storybook */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>

      {/* Comparison */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <pre style={codeBlock}><code>{'Feature Comparison: Storybook vs Alternatives\n'
        + '┌──────────────────┬────────────┬────────┬──────────┬──────────────┐\n'
        + '│ Feature          │ Storybook  │ Ladle  │ Histoire │ React Cosmos │\n'
        + '├──────────────────┼────────────┼────────┼──────────┼──────────────┤\n'
        + '│ React            │ Yes        │ Yes    │ No       │ Yes          │\n'
        + '│ Vue              │ Yes        │ No     │ Yes      │ No           │\n'
        + '│ Angular          │ Yes        │ No     │ No       │ No           │\n'
        + '│ Svelte           │ Yes        │ No     │ Yes      │ No           │\n'
        + '│ Addons           │ 400+       │ ~10    │ ~20      │ ~15          │\n'
        + '│ Visual Testing   │ Chromatic  │ Manual │ Manual   │ Manual       │\n'
        + '│ Play Functions   │ Yes        │ No     │ No       │ No           │\n'
        + '│ MDX Docs         │ Yes        │ No     │ Yes      │ No           │\n'
        + '│ CI Test Runner   │ Yes        │ No     │ No       │ No           │\n'
        + '│ Build Tool       │ Vite       │ Vite   │ Vite     │ Webpack      │\n'
        + '└──────────────────┴────────────┴────────┴──────────┴──────────────┘'}</code></pre>

      {/* Setup */}
      <h2 style={sectionTitle}>{t.h2Setup}</h2>
      <p style={para}>{t.setupDesc}</p>

      <h3 style={subTitle}>{t.h3SetupReact}</h3>
      <pre style={codeBlock}><code>{'# Initialize Storybook in a React project\n'
        + 'npx storybook@latest init\n'
        + '\n'
        + '# Or create a new React project with Storybook\n'
        + 'npx create-react-app my-app --template typescript\n'
        + 'cd my-app\n'
        + 'npx storybook@latest init'}</code></pre>

      <h3 style={subTitle}>{t.h3SetupVue}</h3>
      <pre style={codeBlock}><code>{'# Initialize Storybook in a Vue 3 project\n'
        + 'npm create vue@latest my-vue-app\n'
        + 'cd my-vue-app\n'
        + 'npx storybook@latest init'}</code></pre>

      <h3 style={subTitle}>{t.h3SetupAngular}</h3>
      <pre style={codeBlock}><code>{'# Initialize Storybook in an Angular project\n'
        + 'ng new my-angular-app\n'
        + 'cd my-angular-app\n'
        + 'npx storybook@latest init'}</code></pre>

      <h3 style={subTitle}>{t.h3SetupSvelte}</h3>
      <pre style={codeBlock}><code>{'# Initialize Storybook in a SvelteKit project\n'
        + 'npx sv create my-svelte-app\n'
        + 'cd my-svelte-app\n'
        + 'npx storybook@latest init'}</code></pre>

      <p style={para}>{t.setupConfigDesc}</p>
      <pre style={codeBlock}><code>{'// .storybook/main.ts\n'
        + 'import type { StorybookConfig } from "@storybook/react-vite";\n'
        + '\n'
        + 'const config: StorybookConfig = {\n'
        + '  stories: [\n'
        + '    "../src/**/*.mdx",\n'
        + '    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",\n'
        + '  ],\n'
        + '  addons: [\n'
        + '    "@storybook/addon-onboarding",\n'
        + '    "@storybook/addon-essentials",\n'
        + '    "@storybook/addon-interactions",\n'
        + '    "@storybook/addon-a11y",\n'
        + '  ],\n'
        + '  framework: {\n'
        + '    name: "@storybook/react-vite",\n'
        + '    options: {},\n'
        + '  },\n'
        + '};\n'
        + 'export default config;\n'
        + '\n'
        + '// .storybook/preview.ts\n'
        + 'import type { Preview } from "@storybook/react";\n'
        + '\n'
        + 'const preview: Preview = {\n'
        + '  parameters: {\n'
        + '    controls: {\n'
        + '      matchers: {\n'
        + '        color: /(background|color)/i,\n'
        + '        date: /Date$/i,\n'
        + '      },\n'
        + '    },\n'
        + '  },\n'
        + '};\n'
        + 'export default preview;'}</code></pre>

      {/* CSF3 */}
      <h2 style={sectionTitle}>{t.h2CSF3}</h2>
      <p style={para}>{t.csf3Desc}</p>
      <p style={para}>{t.csf3Desc2}</p>
      <pre style={codeBlock}><code>{'// src/components/Button.stories.ts\n'
        + 'import type { Meta, StoryObj } from "@storybook/react";\n'
        + 'import { Button } from "./Button";\n'
        + '\n'
        + '// Meta describes the component\n'
        + 'const meta = {\n'
        + '  title: "Components/Button",\n'
        + '  component: Button,\n'
        + '  tags: ["autodocs"],\n'
        + '  argTypes: {\n'
        + '    variant: {\n'
        + '      control: "select",\n'
        + '      options: ["primary", "secondary", "danger"],\n'
        + '    },\n'
        + '    size: {\n'
        + '      control: "radio",\n'
        + '      options: ["sm", "md", "lg"],\n'
        + '    },\n'
        + '  },\n'
        + '} satisfies Meta<typeof Button>;\n'
        + '\n'
        + 'export default meta;\n'
        + 'type Story = StoryObj<typeof meta>;\n'
        + '\n'
        + '// Each named export is a story\n'
        + 'export const Primary: Story = {\n'
        + '  args: {\n'
        + '    variant: "primary",\n'
        + '    size: "md",\n'
        + '    children: "Click me",\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + 'export const Secondary: Story = {\n'
        + '  args: {\n'
        + '    ...Primary.args,\n'
        + '    variant: "secondary",\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + 'export const Danger: Story = {\n'
        + '  args: {\n'
        + '    ...Primary.args,\n'
        + '    variant: "danger",\n'
        + '    children: "Delete",\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + 'export const Large: Story = {\n'
        + '  args: {\n'
        + '    ...Primary.args,\n'
        + '    size: "lg",\n'
        + '    children: "Large Button",\n'
        + '  },\n'
        + '};'}</code></pre>

      {/* Args and Controls */}
      <h2 style={sectionTitle}>{t.h2ArgsControls}</h2>
      <p style={para}>{t.argsDesc}</p>
      <p style={para}>{t.argsDesc2}</p>
      <pre style={codeBlock}><code>{'// src/components/Card.stories.ts\n'
        + 'import type { Meta, StoryObj } from "@storybook/react";\n'
        + 'import { Card } from "./Card";\n'
        + '\n'
        + 'const meta = {\n'
        + '  title: "Components/Card",\n'
        + '  component: Card,\n'
        + '  argTypes: {\n'
        + '    title: { control: "text", description: "Card heading" },\n'
        + '    description: { control: "text" },\n'
        + '    imageUrl: { control: "text" },\n'
        + '    variant: {\n'
        + '      control: "select",\n'
        + '      options: ["default", "elevated", "outlined"],\n'
        + '      table: {\n'
        + '        defaultValue: { summary: "default" },\n'
        + '      },\n'
        + '    },\n'
        + '    isLoading: { control: "boolean" },\n'
        + '    rating: {\n'
        + '      control: { type: "range", min: 0, max: 5, step: 0.5 },\n'
        + '    },\n'
        + '    backgroundColor: { control: "color" },\n'
        + '    publishedAt: { control: "date" },\n'
        + '    tags: { control: "object" },\n'
        + '    onClick: { action: "clicked" },\n'
        + '  },\n'
        + '} satisfies Meta<typeof Card>;\n'
        + '\n'
        + 'export default meta;\n'
        + 'type Story = StoryObj<typeof meta>;\n'
        + '\n'
        + 'export const Default: Story = {\n'
        + '  args: {\n'
        + '    title: "Getting Started with Storybook",\n'
        + '    description: "Learn how to build components in isolation.",\n'
        + '    variant: "default",\n'
        + '    isLoading: false,\n'
        + '    rating: 4.5,\n'
        + '    tags: ["tutorial", "react"],\n'
        + '  },\n'
        + '};'}</code></pre>

      {/* Decorators and Parameters */}
      <h2 style={sectionTitle}>{t.h2Decorators}</h2>
      <p style={para}>{t.decoratorsDesc}</p>
      <p style={para}>{t.decoratorsDesc2}</p>
      <pre style={codeBlock}><code>{'// .storybook/preview.tsx - Global decorators\n'
        + 'import type { Preview } from "@storybook/react";\n'
        + 'import { ThemeProvider } from "../src/theme";\n'
        + 'import { MemoryRouter } from "react-router-dom";\n'
        + 'import "../src/globals.css";\n'
        + '\n'
        + 'const preview: Preview = {\n'
        + '  decorators: [\n'
        + '    // Wrap all stories with ThemeProvider\n'
        + '    (Story) => (\n'
        + '      <ThemeProvider>\n'
        + '        <Story />\n'
        + '      </ThemeProvider>\n'
        + '    ),\n'
        + '    // Wrap all stories with Router\n'
        + '    (Story) => (\n'
        + '      <MemoryRouter initialEntries={["/"]}>\n'
        + '        <Story />\n'
        + '      </MemoryRouter>\n'
        + '    ),\n'
        + '  ],\n'
        + '  parameters: {\n'
        + '    layout: "centered",\n'
        + '    backgrounds: {\n'
        + '      default: "light",\n'
        + '      values: [\n'
        + '        { name: "light", value: "#ffffff" },\n'
        + '        { name: "dark", value: "#1a1a2e" },\n'
        + '        { name: "gray", value: "#f5f5f5" },\n'
        + '      ],\n'
        + '    },\n'
        + '    viewport: {\n'
        + '      viewports: {\n'
        + '        mobile: { name: "Mobile", styles: { width: "375px", height: "667px" } },\n'
        + '        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },\n'
        + '        desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } },\n'
        + '      },\n'
        + '    },\n'
        + '  },\n'
        + '};\n'
        + 'export default preview;'}</code></pre>

      {/* Play Functions */}
      <h2 style={sectionTitle}>{t.h2PlayFunctions}</h2>
      <p style={para}>{t.playDesc}</p>
      <p style={para}>{t.playDesc2}</p>
      <pre style={codeBlock}><code>{'// src/components/LoginForm.stories.ts\n'
        + 'import type { Meta, StoryObj } from "@storybook/react";\n'
        + 'import { within, userEvent, expect } from "@storybook/test";\n'
        + 'import { LoginForm } from "./LoginForm";\n'
        + '\n'
        + 'const meta = {\n'
        + '  title: "Forms/LoginForm",\n'
        + '  component: LoginForm,\n'
        + '} satisfies Meta<typeof LoginForm>;\n'
        + '\n'
        + 'export default meta;\n'
        + 'type Story = StoryObj<typeof meta>;\n'
        + '\n'
        + 'export const FilledForm: Story = {\n'
        + '  play: async ({ canvasElement }) => {\n'
        + '    const canvas = within(canvasElement);\n'
        + '\n'
        + '    // Type into the email field\n'
        + '    await userEvent.type(\n'
        + '      canvas.getByLabelText("Email"),\n'
        + '      "user@example.com"\n'
        + '    );\n'
        + '\n'
        + '    // Type into the password field\n'
        + '    await userEvent.type(\n'
        + '      canvas.getByLabelText("Password"),\n'
        + '      "securePassword123"\n'
        + '    );\n'
        + '\n'
        + '    // Click the submit button\n'
        + '    await userEvent.click(\n'
        + '      canvas.getByRole("button", { name: /sign in/i })\n'
        + '    );\n'
        + '\n'
        + '    // Assert the success message appears\n'
        + '    await expect(\n'
        + '      canvas.getByText("Welcome back!")\n'
        + '    ).toBeInTheDocument();\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + 'export const ValidationError: Story = {\n'
        + '  play: async ({ canvasElement }) => {\n'
        + '    const canvas = within(canvasElement);\n'
        + '\n'
        + '    // Submit without filling fields\n'
        + '    await userEvent.click(\n'
        + '      canvas.getByRole("button", { name: /sign in/i })\n'
        + '    );\n'
        + '\n'
        + '    // Assert validation errors\n'
        + '    await expect(\n'
        + '      canvas.getByText("Email is required")\n'
        + '    ).toBeInTheDocument();\n'
        + '  },\n'
        + '};'}</code></pre>

      {/* Visual Testing */}
      <h2 style={sectionTitle}>{t.h2VisualTesting}</h2>
      <p style={para}>{t.visualDesc}</p>
      <p style={para}>{t.visualDesc2}</p>
      <pre style={codeBlock}><code>{'# Install Chromatic\n'
        + 'npm install --save-dev chromatic\n'
        + '\n'
        + '# Run visual tests (first time creates baselines)\n'
        + 'npx chromatic --project-token=YOUR_TOKEN\n'
        + '\n'
        + '# In CI (GitHub Actions example)\n'
        + '# .github/workflows/chromatic.yml\n'
        + 'name: Chromatic\n'
        + 'on: push\n'
        + 'jobs:\n'
        + '  chromatic:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '        with:\n'
        + '          fetch-depth: 0\n'
        + '      - uses: actions/setup-node@v4\n'
        + '      - run: npm ci\n'
        + '      - uses: chromaui/action@latest\n'
        + '        with:\n'
        + '          projectToken: \\${{ secrets.CHROMATIC_PROJECT_TOKEN }}\n'
        + '          # Enable TurboSnap for faster builds\n'
        + '          onlyChanged: true'}</code></pre>

      {/* Accessibility */}
      <h2 style={sectionTitle}>{t.h2A11y}</h2>
      <p style={para}>{t.a11yDesc}</p>
      <p style={para}>{t.a11yDesc2}</p>
      <pre style={codeBlock}><code>{'# Install the a11y addon\n'
        + 'npm install --save-dev @storybook/addon-a11y\n'
        + '\n'
        + '// .storybook/main.ts - Add to addons\n'
        + 'addons: [\n'
        + '  "@storybook/addon-essentials",\n'
        + '  "@storybook/addon-a11y",\n'
        + '],\n'
        + '\n'
        + '// Configure a11y rules per story\n'
        + 'export const DarkMode: Story = {\n'
        + '  args: { theme: "dark" },\n'
        + '  parameters: {\n'
        + '    a11y: {\n'
        + '      config: {\n'
        + '        rules: [\n'
        + '          // Disable a specific rule for this story\n'
        + '          { id: "color-contrast", enabled: false },\n'
        + '        ],\n'
        + '      },\n'
        + '    },\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + '// Combine a11y with play function\n'
        + 'export const DropdownOpen: Story = {\n'
        + '  play: async ({ canvasElement }) => {\n'
        + '    const canvas = within(canvasElement);\n'
        + '    // Open dropdown so a11y addon audits the open state\n'
        + '    await userEvent.click(canvas.getByRole("button"));\n'
        + '    await expect(canvas.getByRole("listbox")).toBeVisible();\n'
        + '  },\n'
        + '};'}</code></pre>

      {/* MDX Documentation */}
      <h2 style={sectionTitle}>{t.h2MDX}</h2>
      <p style={para}>{t.mdxDesc}</p>
      <p style={para}>{t.mdxDesc2}</p>
      <pre style={codeBlock}><code>{'// src/components/Button.mdx\n'
        + 'import { Meta, Story, Canvas, Controls } from "@storybook/blocks";\n'
        + 'import * as ButtonStories from "./Button.stories";\n'
        + '\n'
        + '<Meta of={ButtonStories} />\n'
        + '\n'
        + '# Button\n'
        + '\n'
        + 'The Button component is the primary interactive element\n'
        + 'in our design system. Use it for actions and navigation.\n'
        + '\n'
        + '## Usage Guidelines\n'
        + '\n'
        + '- Use **Primary** for the main call to action\n'
        + '- Use **Secondary** for supporting actions\n'
        + '- Use **Danger** only for destructive actions\n'
        + '\n'
        + '## Interactive Demo\n'
        + '\n'
        + '<Canvas of={ButtonStories.Primary} />\n'
        + '<Controls of={ButtonStories.Primary} />\n'
        + '\n'
        + '## All Variants\n'
        + '\n'
        + '<Canvas>\n'
        + '  <Story of={ButtonStories.Primary} />\n'
        + '  <Story of={ButtonStories.Secondary} />\n'
        + '  <Story of={ButtonStories.Danger} />\n'
        + '</Canvas>'}</code></pre>

      {/* Addons */}
      <h2 style={sectionTitle}>{t.h2Addons}</h2>
      <p style={para}>{t.addonsDesc}</p>
      <p style={para}>{t.addonsDesc2}</p>
      <pre style={codeBlock}><code>{'# Essential addons (included by default)\n'
        + 'npm install @storybook/addon-essentials\n'
        + '# Includes: Controls, Actions, Viewport, Backgrounds,\n'
        + '#   Toolbars, Measure, Outline, Docs\n'
        + '\n'
        + '# Popular community addons\n'
        + 'npm install storybook-dark-mode           # Dark mode toggle\n'
        + 'npm install @storybook/addon-designs      # Figma embeds\n'
        + 'npm install msw-storybook-addon           # API mocking with MSW\n'
        + 'npm install storybook-addon-performance   # Performance profiling\n'
        + 'npm install @storybook/addon-coverage      # Code coverage\n'
        + '\n'
        + '// .storybook/main.ts\n'
        + 'const config: StorybookConfig = {\n'
        + '  addons: [\n'
        + '    "@storybook/addon-essentials",\n'
        + '    "@storybook/addon-a11y",\n'
        + '    "@storybook/addon-interactions",\n'
        + '    "storybook-dark-mode",\n'
        + '    "@storybook/addon-designs",\n'
        + '  ],\n'
        + '};'}</code></pre>

      <pre style={codeBlock}><code>{'// Using MSW addon to mock API calls in stories\n'
        + 'import { http, HttpResponse } from "msw";\n'
        + '\n'
        + 'export const WithData: Story = {\n'
        + '  parameters: {\n'
        + '    msw: {\n'
        + '      handlers: [\n'
        + '        http.get("/api/users", () => {\n'
        + '          return HttpResponse.json([\n'
        + '            { id: 1, name: "Alice", role: "admin" },\n'
        + '            { id: 2, name: "Bob", role: "user" },\n'
        + '          ]);\n'
        + '        }),\n'
        + '      ],\n'
        + '    },\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + 'export const WithError: Story = {\n'
        + '  parameters: {\n'
        + '    msw: {\n'
        + '      handlers: [\n'
        + '        http.get("/api/users", () => {\n'
        + '          return HttpResponse.json(\n'
        + '            { error: "Internal Server Error" },\n'
        + '            { status: 500 }\n'
        + '          );\n'
        + '        }),\n'
        + '      ],\n'
        + '    },\n'
        + '  },\n'
        + '};'}</code></pre>

      {/* TypeScript */}
      <h2 style={sectionTitle}>{t.h2TypeScript}</h2>
      <p style={para}>{t.tsDesc}</p>
      <p style={para}>{t.tsDesc2}</p>
      <pre style={codeBlock}><code>{'// Full TypeScript example with strict typing\n'
        + 'import type { Meta, StoryObj } from "@storybook/react";\n'
        + 'import { DataTable, type DataTableProps } from "./DataTable";\n'
        + '\n'
        + 'type User = {\n'
        + '  id: number;\n'
        + '  name: string;\n'
        + '  email: string;\n'
        + '  role: "admin" | "editor" | "viewer";\n'
        + '};\n'
        + '\n'
        + '// satisfies provides type checking without widening\n'
        + 'const meta = {\n'
        + '  title: "Data/DataTable",\n'
        + '  component: DataTable<User>,\n'
        + '  tags: ["autodocs"],\n'
        + '  argTypes: {\n'
        + '    sortDirection: {\n'
        + '      control: "radio",\n'
        + '      options: ["asc", "desc"] as const,\n'
        + '    },\n'
        + '    onRowClick: { action: "row-clicked" },\n'
        + '  },\n'
        + '} satisfies Meta<DataTableProps<User>>;\n'
        + '\n'
        + 'export default meta;\n'
        + 'type Story = StoryObj<typeof meta>;\n'
        + '\n'
        + 'const sampleUsers: User[] = [\n'
        + '  { id: 1, name: "Alice", email: "alice@co.com", role: "admin" },\n'
        + '  { id: 2, name: "Bob", email: "bob@co.com", role: "editor" },\n'
        + '];\n'
        + '\n'
        + 'export const Default: Story = {\n'
        + '  args: {\n'
        + '    data: sampleUsers,\n'
        + '    columns: ["name", "email", "role"],\n'
        + '    sortable: true,\n'
        + '    sortDirection: "asc",\n'
        + '  },\n'
        + '};'}</code></pre>

      {/* CI/CD */}
      <h2 style={sectionTitle}>{t.h2CICD}</h2>
      <p style={para}>{t.cicdDesc}</p>
      <p style={para}>{t.cicdDesc2}</p>
      <pre style={codeBlock}><code>{'# Install the test runner\n'
        + 'npm install --save-dev @storybook/test-runner\n'
        + '\n'
        + '# Run interaction tests locally\n'
        + 'npx test-storybook\n'
        + '\n'
        + '# Run with coverage\n'
        + 'npx test-storybook --coverage\n'
        + '\n'
        + '# package.json scripts\n'
        + '"scripts": {\n'
        + '  "storybook": "storybook dev -p 6006",\n'
        + '  "build-storybook": "storybook build",\n'
        + '  "test-storybook": "test-storybook",\n'
        + '  "test-storybook:ci": "concurrently -k -s first \\\n'
        + '    \\"npx http-server storybook-static -p 6006\\" \\\n'
        + '    \\"npx wait-on tcp:6006 && test-storybook\\""\n'
        + '}\n'
        + '\n'
        + '# GitHub Actions workflow\n'
        + '# .github/workflows/storybook.yml\n'
        + 'name: Storybook Tests\n'
        + 'on: [push, pull_request]\n'
        + 'jobs:\n'
        + '  test:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '      - uses: actions/setup-node@v4\n'
        + '      - run: npm ci\n'
        + '      - run: npm run build-storybook\n'
        + '      - run: npm run test-storybook:ci\n'
        + '      - uses: chromaui/action@latest\n'
        + '        with:\n'
        + '          projectToken: \\${{ secrets.CHROMATIC_TOKEN }}'}</code></pre>

      {/* Performance */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.perfDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.bp1}</li>
        <li style={listItem}>{t.bp2}</li>
        <li style={listItem}>{t.bp3}</li>
        <li style={listItem}>{t.bp4}</li>
        <li style={listItem}>{t.bp5}</li>
        <li style={listItem}>{t.bp6}</li>
        <li style={listItem}>{t.bp7}</li>
        <li style={listItem}>{t.bp8}</li>
        <li style={listItem}>{t.bp9}</li>
        <li style={listItem}>{t.bp10}</li>
      </ul>

      <pre style={codeBlock}><code>{'// Recommended project structure\n'
        + 'src/\n'
        + '  components/\n'
        + '    Button/\n'
        + '      Button.tsx            # Component\n'
        + '      Button.stories.ts     # Stories (co-located)\n'
        + '      Button.test.ts        # Unit tests\n'
        + '      Button.mdx            # Custom docs (optional)\n'
        + '      Button.module.css     # Styles\n'
        + '      index.ts              # Barrel export\n'
        + '    Card/\n'
        + '      Card.tsx\n'
        + '      Card.stories.ts\n'
        + '      index.ts\n'
        + '  .storybook/\n'
        + '    main.ts                 # Build config\n'
        + '    preview.ts              # Runtime config\n'
        + '    manager.ts              # UI customization'}</code></pre>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A },
        { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A },
        { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A },
        { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A },
        { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.7' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
