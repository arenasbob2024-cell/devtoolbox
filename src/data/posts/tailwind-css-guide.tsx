'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tailwind CSS Complete Guide: Utility-First CSS, JIT, v4, and React Integration (2025)',
    description: 'A comprehensive Tailwind CSS guide covering utility-first principles, JIT compiler, responsive prefixes, dark mode, custom configuration, Flexbox and Grid utilities, Tailwind v4 changes, React/Next.js integration with cn() and shadcn/ui, and a full comparison with Bootstrap, CSS Modules, and Styled Components.',
    tldr: 'Tailwind CSS is a utility-first CSS framework that lets you build designs directly in HTML/JSX by composing small, single-purpose utility classes. The JIT (Just-In-Time) compiler generates only the CSS you actually use, resulting in tiny production bundles. Responsive design is handled with mobile-first breakpoint prefixes (sm:, md:, lg:, xl:). Dark mode works with the dark: prefix. Tailwind v4 (2025) switches to a CSS-first configuration model — no more tailwind.config.js. For React/Next.js, the cn() utility from clsx+tailwind-merge is essential for conditional class merging. Tailwind is best for teams that want rapid UI development with a consistent design system without writing custom CSS.',
    keyTakeaway1: 'Tailwind is utility-first — you style elements by composing small single-purpose classes like flex, pt-4, text-center, and rotate-90 directly in HTML/JSX, rather than writing custom CSS.',
    keyTakeaway2: 'The JIT (Just-In-Time) compiler scans your source files and generates only the CSS for classes you actually use — production bundles are typically under 10KB even for large apps.',
    keyTakeaway3: 'Responsive design uses mobile-first breakpoint prefixes: sm: (640px), md: (768px), lg: (1024px), xl: (1280px), 2xl: (1536px). Unprefixed utilities apply to all screen sizes.',
    keyTakeaway4: 'Dark mode is supported natively with the dark: variant prefix. You can configure class-based (class="dark" on html) or media-based (prefers-color-scheme) strategy.',
    keyTakeaway5: 'Tailwind v4 (2025) introduces CSS-first configuration: import Tailwind in CSS, define your theme as CSS custom properties, and eliminate tailwind.config.js entirely.',
    keyTakeaway6: 'For React/Next.js, use cn() from clsx + tailwind-merge to safely merge conditional classes, and consider shadcn/ui or cva for building reusable typed component variants.',
    intro: 'Tailwind CSS has fundamentally changed how developers write CSS. Instead of crafting hand-rolled stylesheets or fighting framework overrides, you compose designs from hundreds of low-level utility classes directly in your HTML or JSX. Created by Adam Wathan and released in 2017, Tailwind CSS now powers the UIs of companies like GitHub, Shopify, OpenAI, and hundreds of thousands of projects worldwide. With the release of Tailwind CSS v4 in early 2025, the framework has evolved dramatically — moving to a CSS-first configuration model, introducing a faster Rust-based engine, and simplifying the developer experience further. This guide is your complete reference for mastering Tailwind CSS in 2025, covering everything from the core utility-first philosophy to advanced React integration patterns, custom configuration, and a detailed comparison with alternative CSS approaches.',
    h2What: '1. What Is Tailwind CSS? The Utility-First Philosophy',
    whatDesc: 'Tailwind CSS is a utility-first CSS framework. Instead of providing pre-built components like Bootstrap\'s .btn or .card, Tailwind gives you thousands of small, single-purpose utility classes — each mapping directly to a specific CSS property and value. To build a UI, you compose these classes directly in your markup. This is a fundamentally different mental model: styles are co-located with the HTML element they affect, there are no class naming decisions to make, and every utility is constrained to a design system scale.',
    whatJit: 'How Tailwind Handles Unused CSS — The JIT Compiler',
    whatJitDesc: 'The most common question about Tailwind is: "Won\'t all those classes make a huge CSS file?" The answer is no — and the JIT (Just-In-Time) compiler is why. Tailwind scans your configured content files (HTML, JSX, TSX, Vue, etc.) and generates CSS only for the classes you actually use. A typical production bundle is 5–15KB — smaller than Bootstrap\'s minified CSS which is ~22KB before gzip. With JIT, you also unlock arbitrary value support: use any value with square bracket syntax like w-[237px], text-[#1a73e8], or top-[117px] without configuring anything.',
    h2Core: '2. Core Concepts: Spacing, Colors, Typography, and Responsive Prefixes',
    coreSpacing: 'Spacing Scale',
    coreSpacingDesc: 'Tailwind uses a 4px-base spacing scale. The number after the prefix multiplies by 4px: p-1 = 4px, p-2 = 8px, p-4 = 16px, p-8 = 32px, p-16 = 64px. This scale applies to padding (p-, px-, py-, pt-, pr-, pb-, pl-), margin (m-, mx-, my-, mt-, mr-, mb-, ml-), width (w-), height (h-), gap, and more. For values outside the scale, use arbitrary values: p-[13px], mt-[3.25rem]. Negative margins are supported with a minus prefix: -mt-4.',
    coreColors: 'Color Palette',
    coreColorsDesc: 'Tailwind ships with a curated palette of 22 colors, each with 11 shades (50 through 950). You apply colors to text (text-blue-500), background (bg-gray-100), border (border-red-300), and more. Use the opacity modifier for transparent variants: bg-blue-500/50 for 50% opacity, text-black/80 for 80% opacity. For custom colors, use arbitrary values: text-[#1a73e8] or bg-[rgb(59,130,246)].',
    coreTypography: 'Typography',
    coreTypographyDesc: 'Typography utilities control font size (text-xs, text-sm, text-base, text-lg, text-xl, text-2xl up to text-9xl), font weight (font-thin through font-black), line height (leading-tight, leading-normal, leading-relaxed), letter spacing (tracking-tight, tracking-wide), and text alignment (text-left, text-center, text-right, text-justify). The @tailwindcss/typography plugin adds a prose class that applies beautiful typographic defaults to raw HTML content like Markdown.',
    coreResponsive: 'Responsive Prefixes',
    coreResponsiveDesc: 'Tailwind uses a mobile-first responsive system. Every utility can be prefixed with a breakpoint modifier: sm: (min-width: 640px), md: (min-width: 768px), lg: (min-width: 1024px), xl: (min-width: 1280px), 2xl: (min-width: 1536px). Unprefixed classes apply at all screen sizes. This means you design for mobile first, then progressively enhance for larger screens. You can also use max-width variants like max-sm: to apply styles only below a breakpoint.',
    h2Flex: '3. Flexbox and Grid with Tailwind',
    flexDesc: 'Flexbox and CSS Grid are where Tailwind\'s utility-first approach truly shines. Common multi-property layout patterns collapse into a few readable utility classes.',
    flexboxTitle: 'Flexbox Utilities',
    flexboxDesc: 'Enable flexbox with flex. Control direction with flex-row (default) or flex-col. Use justify-start, justify-center, justify-end, justify-between, justify-around, justify-evenly for main-axis alignment, and items-start, items-center, items-end, items-stretch, items-baseline for cross-axis alignment. The gap utility replaces margins between flex items: gap-4 (gap: 16px), gap-x-8 (column gap), gap-y-2 (row gap). flex-wrap enables multi-line flex layouts. Use flex-1 for equal-width growing items, flex-none to prevent growth/shrink.',
    gridTitle: 'Grid Utilities',
    gridDesc: 'Enable CSS Grid with grid. Define column count with grid-cols-1 through grid-cols-12 or grid-cols-none. Items can span multiple columns with col-span-2, col-span-full. Use grid-rows-N for explicit row definitions. The gap utility works identically for grid. For responsive grids: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 creates a fully responsive multi-column layout without a single media query.',
    h2Dark: '4. Dark Mode with Tailwind',
    darkDesc: 'Tailwind has first-class dark mode support via the dark: variant prefix. Prefix any utility with dark: to apply it only in dark mode. There are two configuration strategies: the class strategy (default in v3, activated when class="dark" is on the <html> element) and the media strategy (activated by the user\'s OS prefers-color-scheme preference). The class strategy is recommended for apps that let users toggle dark mode manually.',
    darkClassDesc: 'With class strategy, add dark to your <html> element (typically via JavaScript based on user preference or localStorage) and Tailwind will activate all dark: variants. Common patterns: bg-white dark:bg-gray-900 for backgrounds, text-gray-900 dark:text-gray-100 for text, border-gray-200 dark:border-gray-700 for borders. In Tailwind v4, the dark: variant works the same way but the strategy is configured in CSS rather than a config file.',
    h2Config: '5. Custom Configuration (tailwind.config.js)',
    configDesc: 'Tailwind is designed to be fully customized via tailwind.config.js (Tailwind v3) or CSS custom properties (Tailwind v4). You can extend the default theme, override colors, add custom fonts, define custom breakpoints, and register plugins.',
    configV3Desc: 'In Tailwind v3, the configuration lives in tailwind.config.js or tailwind.config.ts. The theme.extend key lets you add to the default theme without removing defaults. Use theme (without extend) to replace defaults entirely. The content array tells Tailwind where to scan for class names — it must cover all files that use Tailwind classes.',
    configPlugins: 'Official Plugins',
    configPluginsDesc: 'Tailwind provides official plugins for common patterns: @tailwindcss/typography (prose class for rich text), @tailwindcss/forms (opinionated form resets), @tailwindcss/aspect-ratio (aspect-ratio utilities before native CSS support), and @tailwindcss/container-queries (container query variants). Third-party plugins like tailwind-animate and daisyUI extend Tailwind further with animations and pre-built component classes.',
    h2Components: '6. Components and Reusability: @apply, cva, and Design Patterns',
    componentsDesc: 'One of the common criticisms of utility-first CSS is that long class strings become hard to read and maintain. Tailwind provides several approaches to component extraction and reusability.',
    applyDesc: 'The @apply directive lets you compose utility classes into a custom CSS class. This is useful for third-party HTML you cannot control, or for extracting truly reusable component styles. However, for React/Vue/Svelte component-based architectures, the recommended approach is to extract a component (a JSX/Vue file) rather than using @apply, since component files provide better encapsulation, props-based variants, and IDE support.',
    cvaDesc: 'The cva (Class Variance Authority) library provides a TypeScript-first API for defining component variants using Tailwind classes. Combined with the cn() utility (clsx + tailwind-merge), it enables fully typed, composable component APIs similar to Stitches or Vanilla Extract but using Tailwind as the styling layer. This is the approach used by shadcn/ui — the most popular React UI component library built on Tailwind.',
    h2V4: '7. Tailwind CSS v4: CSS-First Configuration and New Features',
    v4Desc: 'Tailwind CSS v4 (released in early 2025) is the biggest evolution of the framework since its initial release. The headline feature is CSS-first configuration: instead of tailwind.config.js, you configure Tailwind directly in your CSS file using the new @import "tailwindcss" directive and @theme block.',
    v4Features: 'Key Changes in Tailwind v4',
    v4FeaturesDesc: 'Tailwind v4 introduces: CSS-first configuration (no more tailwind.config.js), a new Rust-based engine (Oxide) that is up to 5x faster for full builds and 100x faster for incremental builds, native CSS cascade layers, CSS custom properties for all design tokens (colors, spacing, fonts are exposed as var(--color-blue-500) etc.), new 3D transform utilities (rotate-x, rotate-y, perspective), inset-shadow and text-shadow utilities, expanded container query support with @min and @max variants, and a new @starting-style variant for entry animations. The content configuration is now automatic — Tailwind uses CSS to detect template files without explicit content paths.',
    v4Migration: 'Migrating from v3 to v4',
    v4MigrationDesc: 'Tailwind provides an automated migration tool: npx @tailwindcss/upgrade. Breaking changes include: tailwind.config.js is replaced by CSS @theme configuration, the @tailwind base/components/utilities directives are replaced by @import "tailwindcss", some utilities have been renamed (shadow-sm is now shadow-xs, ring becomes ring-1 by default), and the PostCSS plugin has been split into a separate @tailwindcss/postcss package. For most projects, the automated migration tool handles the majority of changes.',
    h2React: '8. Integration with React and Next.js',
    reactDesc: 'Tailwind CSS integrates seamlessly with React and Next.js. In a Next.js 14+ project, Tailwind is installed via npx create-next-app which includes Tailwind setup by default. The integration requires adding Tailwind to PostCSS config and importing the Tailwind CSS file in your root layout.',
    cnDesc: 'The cn() Utility',
    cnUtilityDesc: 'The cn() utility function is a thin wrapper around clsx (conditional class joining) and tailwind-merge (intelligent Tailwind class conflict resolution). It is essential for building component libraries with Tailwind because it safely merges classes: cn("px-4 py-2", condition && "bg-blue-500", className) will apply the conditional class only when true, and tailwind-merge ensures that conflicting classes like p-4 and px-2 are resolved correctly (px-2 wins if it comes last, similar to CSS specificity).',
    shadcnDesc: 'shadcn/ui and Headless UI',
    shadcnDetails: 'shadcn/ui (shadcn.com/ui) is a collection of copy-paste React components built with Tailwind CSS and Radix UI primitives. Unlike traditional UI libraries, shadcn/ui components are added directly to your project — you own the code and can customize everything. Each component is typed with TypeScript and uses cva for variant management. Headless UI (headlessui.com) by the Tailwind Labs team provides unstyled, fully accessible UI components (dialog, menu, listbox, etc.) designed to be styled with Tailwind. For 2025 projects, the recommended stack is Next.js + Tailwind CSS + shadcn/ui + cva for a fully typed, accessible component system.',
    h2Comparison: '9. Tailwind vs Bootstrap vs CSS Modules vs Styled Components',
    comparisonDesc: 'Choosing the right CSS approach depends on team size, project scale, design system requirements, and developer preference. Here is a detailed comparison of the four most popular approaches.',
    h2FAQ: '10. Frequently Asked Questions',
    faq1Q: 'Does Tailwind CSS produce a large CSS bundle?',
    faq1A: 'No — the JIT compiler generates only the CSS for classes you actually use. A typical Tailwind production bundle is 5–15KB gzipped, which is significantly smaller than Bootstrap (about 22KB) or other component frameworks. The unused class purging works by scanning your content files for class name strings and only generating CSS for found classes. With Tailwind v4, the engine is even more efficient and the content detection is automatic.',
    faq2Q: 'How do I handle class conflicts in Tailwind (e.g., p-4 and px-2 on the same element)?',
    faq2A: 'In raw HTML, the last class in the stylesheet wins (not the last class in the HTML attribute). In React, use the tailwind-merge library (or the cn() utility from clsx + tailwind-merge). tailwind-merge intelligently resolves conflicts: cn("p-4 px-2") results in p-4 py-4 (px-2 overrides the horizontal part of p-4). This is especially important in component libraries where parent code passes className props that may conflict with internal defaults.',
    faq3Q: 'Does Tailwind CSS work with PurgeCSS?',
    faq3A: 'Tailwind v3+ has built-in unused CSS removal through its JIT engine — you do not need to configure PurgeCSS separately. The content configuration in tailwind.config.js (v3) or the automatic detection in v4 tells Tailwind which files to scan. Tailwind\'s built-in purging is faster and more accurate than PurgeCSS for Tailwind classes because it understands the Tailwind class name format natively. For non-Tailwind CSS in the same project, you can still use PurgeCSS in your build pipeline.',
    faq4Q: 'Can I use Tailwind CSS without a build step?',
    faq4A: 'Yes — Tailwind provides a standalone CLI executable and a CDN play version for prototyping. The CDN version (cdn.tailwindcss.com) generates all possible utilities on demand in the browser using the new v4 engine, which makes it suitable for demos and quick prototypes. However, for production, a build step is always recommended to generate a minimal, optimized CSS file. The Vite + Tailwind integration is the fastest build setup for new projects.',
    faq5Q: 'How do I customize Tailwind\'s color palette?',
    faq5A: 'In Tailwind v3, extend colors in tailwind.config.js under theme.extend.colors. You can add new color names, override existing ones, or add additional shades. In Tailwind v4, define custom colors as CSS custom properties in your @theme block: --color-brand: #6d28d9 makes brand-500 available. The new v4 approach uses native CSS variables, so your custom colors are also accessible in JavaScript via getComputedStyle.',
    faq6Q: 'How does Tailwind CSS affect performance compared to hand-written CSS?',
    faq6A: 'For runtime performance, Tailwind generates static CSS with no JavaScript overhead — it is as fast as any static CSS file. The utility classes avoid specificity issues that require !important overrides, making cascade management predictable. For large applications, Tailwind\'s small and consistent CSS bundle actually improves initial page load compared to growing bespoke stylesheets. The consistency of the design system also reduces the chance of one-off style experiments that grow CSS over time.',
    faq7Q: 'What is the difference between @apply and extracting a component?',
    faq7A: '@apply lets you compose Tailwind utilities into a CSS class. It is appropriate for styling third-party HTML content you cannot modify (like Markdown output or CMS content). For components you control (React/Vue/Svelte), it is almost always better to extract a component file — you get props-based variants, TypeScript types, co-located logic, and better IDE support. Overuse of @apply defeats the purpose of utility-first CSS and can lead to CSS that is hard to maintain.',
    faq8Q: 'Should I use Tailwind CSS v3 or v4 for a new project in 2025?',
    faq8A: 'For new projects started in 2025, use Tailwind v4. The new CSS-first configuration model is simpler, the Oxide engine is dramatically faster, and v4 aligns better with modern CSS standards. If you are on an existing v3 project, the migration tool handles most breaking changes automatically. The ecosystem (shadcn/ui, Headless UI, plugins) has largely updated to support v4. The only reason to stay on v3 would be a strict dependency on a plugin that has not yet been updated for v4.',
    conclusion: 'Tailwind CSS has earned its place as the most popular utility-first CSS framework for a reason: it is fast to write, predictable to debug, trivially tree-shakable, and deeply customizable. Whether you are building a simple landing page or a complex SaaS dashboard, Tailwind\'s constraints enforce consistency while its escape hatches (arbitrary values, CSS variables) handle any edge case. With Tailwind v4\'s CSS-first configuration and the Oxide engine, the developer experience has reached a new level of speed and simplicity. The combination of Next.js + Tailwind CSS + shadcn/ui + cva represents the most productive React styling stack available today.',
  },
  zh: {
    title: 'Tailwind CSS 完全指南：实用优先 CSS、JIT、v4 与 React 集成（2025）',
    description: '全面的 Tailwind CSS 指南，涵盖实用优先原则、JIT 编译器、响应式前缀、暗黑模式、自定义配置、Flexbox 和 Grid 工具类、Tailwind v4 变更、React/Next.js 集成（cn() 和 shadcn/ui），以及与 Bootstrap、CSS Modules 和 Styled Components 的详细对比。',
    tldr: 'Tailwind CSS 是一个实用优先的 CSS 框架，通过在 HTML/JSX 中组合小型、单一用途的工具类来构建设计。JIT（即时）编译器只生成实际使用的 CSS，生产包体积极小。响应式设计通过移动端优先的断点前缀（sm:、md:、lg:、xl:）处理。暗黑模式通过 dark: 前缀实现。Tailwind v4（2025年）切换到 CSS 优先配置模型——不再需要 tailwind.config.js。在 React/Next.js 中，cn() 工具函数对于条件类合并至关重要。Tailwind 最适合希望在统一设计系统下快速开发 UI 而无需编写自定义 CSS 的团队。',
    keyTakeaway1: 'Tailwind 是实用优先的——通过在 HTML/JSX 中直接组合 flex、pt-4、text-center 等小型单一用途类来为元素添加样式，而不是编写自定义 CSS。',
    keyTakeaway2: 'JIT（即时）编译器扫描你的源文件，只为实际使用的类生成 CSS——即使对于大型应用，生产包通常也在 10KB 以下。',
    keyTakeaway3: '响应式设计使用移动端优先的断点前缀：sm:（640px）、md:（768px）、lg:（1024px）、xl:（1280px）、2xl:（1536px）。无前缀的工具类应用于所有屏幕尺寸。',
    keyTakeaway4: '暗黑模式通过 dark: 变体前缀原生支持。可配置基于类（html 上的 class="dark"）或基于媒体查询（prefers-color-scheme）的策略。',
    keyTakeaway5: 'Tailwind v4（2025年）引入了 CSS 优先配置：在 CSS 中导入 Tailwind，以 CSS 自定义属性定义主题，完全消除 tailwind.config.js。',
    keyTakeaway6: '在 React/Next.js 中，使用 clsx + tailwind-merge 提供的 cn() 来安全合并条件类，并考虑使用 shadcn/ui 或 cva 构建可复用的类型化组件变体。',
    intro: 'Tailwind CSS 从根本上改变了开发者编写 CSS 的方式。不再需要手工制作样式表或与框架覆盖规则斗争，而是直接在 HTML 或 JSX 中通过数百个低级工具类来组合设计。由 Adam Wathan 创建并于 2017 年发布，Tailwind CSS 如今驱动着 GitHub、Shopify、OpenAI 以及全球数十万个项目的 UI。随着 2025 年初 Tailwind CSS v4 的发布，框架发生了巨大演变——转向 CSS 优先配置模型，引入更快的基于 Rust 的引擎，并进一步简化开发者体验。本指南是你 2025 年掌握 Tailwind CSS 的完整参考，涵盖从核心实用优先理念到高级 React 集成模式、自定义配置，以及与其他 CSS 方案的详细对比。',
    h2What: '1. 什么是 Tailwind CSS？实用优先理念',
    whatDesc: 'Tailwind CSS 是一个实用优先的 CSS 框架。它不提供 Bootstrap 的 .btn 或 .card 等预构建组件，而是提供数千个小型、单一用途的工具类——每个类直接映射到特定的 CSS 属性和值。构建 UI 时，你直接在标记中组合这些类。这是一种根本不同的思维模型：样式与它们影响的 HTML 元素共处，无需做类命名决定，每个工具类都受设计系统比例约束。',
    whatJit: '如何处理未使用的 CSS——JIT 编译器',
    whatJitDesc: '关于 Tailwind 最常见的问题是："所有那些类不会让 CSS 文件变得很大吗？"答案是否定的——JIT（即时）编译器就是原因。Tailwind 扫描你配置的内容文件（HTML、JSX、TSX、Vue 等），只为你实际使用的类生成 CSS。典型的生产包是 5-15KB——比 Bootstrap 最小化 CSS（约 22KB，未 gzip）还小。JIT 还解锁了任意值支持：使用方括号语法如 w-[237px]、text-[#1a73e8] 或 top-[117px] 不需要任何配置。',
    h2Core: '2. 核心概念：间距、颜色、排版和响应式前缀',
    coreSpacing: '间距比例',
    coreSpacingDesc: 'Tailwind 使用以 4px 为基础的间距比例。前缀后的数字乘以 4px：p-1 = 4px，p-2 = 8px，p-4 = 16px，p-8 = 32px，p-16 = 64px。此比例适用于内边距（p-、px-、py-、pt-、pr-、pb-、pl-）、外边距（m-、mx-、my-、mt-、mr-、mb-、ml-）、宽度（w-）、高度（h-）、间隙等。超出比例的值使用任意值：p-[13px]、mt-[3.25rem]。负外边距使用减号前缀：-mt-4。',
    coreColors: '颜色调色板',
    coreColorsDesc: 'Tailwind 提供了 22 种精选颜色，每种颜色有 11 个色调（50 到 950）。颜色应用于文字（text-blue-500）、背景（bg-gray-100）、边框（border-red-300）等。使用透明度修饰符：bg-blue-500/50 表示 50% 透明度，text-black/80 表示 80% 透明度。自定义颜色使用任意值：text-[#1a73e8] 或 bg-[rgb(59,130,246)]。',
    coreTypography: '排版',
    coreTypographyDesc: '排版工具类控制字体大小（text-xs 到 text-9xl）、字体粗细（font-thin 到 font-black）、行高（leading-tight、leading-normal、leading-relaxed）、字母间距（tracking-tight、tracking-wide）和文字对齐（text-left、text-center、text-right、text-justify）。@tailwindcss/typography 插件添加了 prose 类，为 Markdown 等原始 HTML 内容应用美观的排版默认值。',
    coreResponsive: '响应式前缀',
    coreResponsiveDesc: 'Tailwind 使用移动端优先的响应式系统。每个工具类都可以加断点修饰符前缀：sm:（min-width: 640px）、md:（min-width: 768px）、lg:（min-width: 1024px）、xl:（min-width: 1280px）、2xl:（min-width: 1536px）。无前缀类适用于所有屏幕尺寸。这意味着先为移动端设计，再逐步增强到更大屏幕。也可以使用最大宽度变体如 max-sm: 只在断点以下应用样式。',
    h2Flex: '3. Tailwind 中的 Flexbox 和 Grid',
    flexDesc: 'Flexbox 和 CSS Grid 是 Tailwind 实用优先方法真正发光的地方。常见的多属性布局模式简化为几个可读的工具类。',
    flexboxTitle: 'Flexbox 工具类',
    flexboxDesc: '用 flex 启用 flexbox。用 flex-row（默认）或 flex-col 控制方向。使用 justify-start/center/end/between/around/evenly 进行主轴对齐，使用 items-start/center/end/stretch/baseline 进行交叉轴对齐。gap 工具类替代 flex 项目间的外边距：gap-4（16px 间隙）、gap-x-8（列间隙）、gap-y-2（行间隙）。flex-wrap 启用多行 flex 布局。flex-1 用于等宽增长项目，flex-none 防止增长/收缩。',
    gridTitle: 'Grid 工具类',
    gridDesc: '用 grid 启用 CSS Grid。用 grid-cols-1 到 grid-cols-12 或 grid-cols-none 定义列数。项目可以用 col-span-2、col-span-full 跨越多列。grid-rows-N 用于显式行定义。gap 工具类对 grid 同样有效。响应式网格：grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 不需要任何媒体查询就能创建完全响应式的多列布局。',
    h2Dark: '4. Tailwind 暗黑模式',
    darkDesc: 'Tailwind 通过 dark: 变体前缀原生支持暗黑模式。任何工具类前加 dark: 使其只在暗黑模式下生效。有两种配置策略：类策略（v3 默认，当 <html> 元素上有 class="dark" 时激活）和媒体策略（由用户操作系统的 prefers-color-scheme 偏好激活）。对于允许用户手动切换暗黑模式的应用，推荐使用类策略。',
    darkClassDesc: '使用类策略时，将 dark 添加到 <html> 元素（通常通过 JavaScript 根据用户偏好或 localStorage 实现），Tailwind 将激活所有 dark: 变体。常见模式：bg-white dark:bg-gray-900 用于背景，text-gray-900 dark:text-gray-100 用于文字，border-gray-200 dark:border-gray-700 用于边框。在 Tailwind v4 中，dark: 变体的工作方式相同，但策略在 CSS 中配置而不是配置文件中。',
    h2Config: '5. 自定义配置（tailwind.config.js）',
    configDesc: 'Tailwind 通过 tailwind.config.js（Tailwind v3）或 CSS 自定义属性（Tailwind v4）实现完全自定义。可以扩展默认主题、覆盖颜色、添加自定义字体、定义自定义断点和注册插件。',
    configV3Desc: '在 Tailwind v3 中，配置位于 tailwind.config.js 或 tailwind.config.ts。theme.extend 键让你在不移除默认值的情况下添加到默认主题。直接使用 theme（不带 extend）可完全替换默认值。content 数组告诉 Tailwind 在哪里扫描类名——必须覆盖所有使用 Tailwind 类的文件。',
    configPlugins: '官方插件',
    configPluginsDesc: 'Tailwind 为常见模式提供官方插件：@tailwindcss/typography（富文本的 prose 类）、@tailwindcss/forms（有主见的表单重置）、@tailwindcss/aspect-ratio（aspect-ratio 工具类）和 @tailwindcss/container-queries（容器查询变体）。第三方插件如 tailwind-animate 和 daisyUI 通过动画和预构建组件类进一步扩展 Tailwind。',
    h2Components: '6. 组件与复用性：@apply、cva 和设计模式',
    componentsDesc: '实用优先 CSS 的常见批评之一是长类字符串难以阅读和维护。Tailwind 提供了几种组件提取和复用方法。',
    applyDesc: '@apply 指令让你将工具类组合成自定义 CSS 类。适用于无法控制的第三方 HTML，或提取真正可复用的组件样式。但对于可以控制的组件（React/Vue/Svelte），推荐的做法是提取一个组件文件（JSX/Vue 文件），而不是使用 @apply，因为组件文件提供更好的封装、基于 props 的变体和 IDE 支持。',
    cvaDesc: 'cva（Class Variance Authority）库为使用 Tailwind 类定义组件变体提供了 TypeScript 优先的 API。与 cn() 工具函数（clsx + tailwind-merge）结合，它支持完全类型化、可组合的组件 API，类似于 Stitches 或 Vanilla Extract，但使用 Tailwind 作为样式层。这是 shadcn/ui 使用的方法——最流行的基于 Tailwind 构建的 React UI 组件库。',
    h2V4: '7. Tailwind CSS v4：CSS 优先配置和新特性',
    v4Desc: 'Tailwind CSS v4（2025年初发布）是框架自初始发布以来最大的演变。标志性特性是 CSS 优先配置：不再使用 tailwind.config.js，而是使用新的 @import "tailwindcss" 指令和 @theme 块直接在 CSS 文件中配置 Tailwind。',
    v4Features: 'Tailwind v4 关键变更',
    v4FeaturesDesc: 'Tailwind v4 引入：CSS 优先配置（不再需要 tailwind.config.js）、基于 Rust 的新引擎（Oxide，全量构建最高快 5 倍，增量构建最高快 100 倍）、原生 CSS 级联层、所有设计令牌的 CSS 自定义属性（颜色、间距、字体以 var(--color-blue-500) 等形式暴露）、新的 3D 变换工具类（rotate-x、rotate-y、perspective）、inset-shadow 和 text-shadow 工具类、扩展的容器查询支持（@min 和 @max 变体），以及用于入场动画的新 @starting-style 变体。内容配置现已自动化——Tailwind 使用 CSS 检测模板文件，无需显式内容路径。',
    v4Migration: '从 v3 迁移到 v4',
    v4MigrationDesc: 'Tailwind 提供自动迁移工具：npx @tailwindcss/upgrade。破坏性变更包括：tailwind.config.js 被 CSS @theme 配置替代，@tailwind base/components/utilities 指令被 @import "tailwindcss" 替代，部分工具类已重命名（shadow-sm 现为 shadow-xs，ring 默认变为 ring-1），PostCSS 插件分拆为单独的 @tailwindcss/postcss 包。对于大多数项目，自动迁移工具处理大部分变更。',
    h2React: '8. 与 React 和 Next.js 集成',
    reactDesc: 'Tailwind CSS 与 React 和 Next.js 无缝集成。在 Next.js 14+ 项目中，npx create-next-app 默认包含 Tailwind 设置。集成需要将 Tailwind 添加到 PostCSS 配置并在根布局中导入 Tailwind CSS 文件。',
    cnDesc: 'cn() 工具函数',
    cnUtilityDesc: 'cn() 工具函数是 clsx（条件类合并）和 tailwind-merge（智能 Tailwind 类冲突解决）的轻量封装。在使用 Tailwind 构建组件库时必不可少，因为它能安全合并类：cn("px-4 py-2", condition && "bg-blue-500", className) 只在条件为真时应用条件类，而 tailwind-merge 确保 p-4 和 px-2 等冲突类正确解决（如果 px-2 在后面则优先，类似 CSS 优先级）。',
    shadcnDesc: 'shadcn/ui 和 Headless UI',
    shadcnDetails: 'shadcn/ui（shadcn.com/ui）是基于 Tailwind CSS 和 Radix UI 原语构建的复制粘贴 React 组件集合。与传统 UI 库不同，shadcn/ui 组件直接添加到你的项目中——你拥有代码并可以自定义一切。每个组件都用 TypeScript 类型化，并使用 cva 进行变体管理。Headless UI（headlessui.com）由 Tailwind Labs 团队提供无样式、完全可访问的 UI 组件（对话框、菜单、列表框等），专为用 Tailwind 样式化而设计。对于 2025 年的项目，推荐技术栈是 Next.js + Tailwind CSS + shadcn/ui + cva，构成完全类型化、可访问的组件系统。',
    h2Comparison: '9. Tailwind vs Bootstrap vs CSS Modules vs Styled Components',
    comparisonDesc: '选择合适的 CSS 方案取决于团队规模、项目规模、设计系统需求和开发者偏好。以下是四种最流行方案的详细对比。',
    h2FAQ: '10. 常见问题',
    faq1Q: 'Tailwind CSS 会产生很大的 CSS 包吗？',
    faq1A: '不会——JIT 编译器只为你实际使用的类生成 CSS。典型的 Tailwind 生产包在 gzip 后是 5-15KB，远小于 Bootstrap（约 22KB）或其他组件框架。未使用类的清除通过扫描内容文件中的类名字符串实现，只为找到的类生成 CSS。Tailwind v4 的引擎效率更高，内容检测也是自动的。',
    faq2Q: '如何处理 Tailwind 中的类冲突（例如同一元素上的 p-4 和 px-2）？',
    faq2A: '在原始 HTML 中，样式表中的最后一个类优先（不是 HTML 属性中的最后一个类）。在 React 中，使用 tailwind-merge 库（或 clsx + tailwind-merge 提供的 cn() 工具函数）。tailwind-merge 智能解决冲突：cn("p-4 px-2") 结果为 p-4 py-4（px-2 覆盖了 p-4 的水平部分）。在组件库中，当父代码传递可能与内部默认值冲突的 className props 时，这一点尤为重要。',
    faq3Q: 'Tailwind CSS 与 PurgeCSS 一起工作吗？',
    faq3A: 'Tailwind v3+ 通过其 JIT 引擎内置了未使用 CSS 的移除——不需要单独配置 PurgeCSS。tailwind.config.js（v3）中的 content 配置或 v4 中的自动检测告诉 Tailwind 扫描哪些文件。Tailwind 的内置清除比 PurgeCSS 对 Tailwind 类更快、更准确，因为它原生理解 Tailwind 类名格式。对于同一项目中的非 Tailwind CSS，仍可在构建管道中使用 PurgeCSS。',
    faq4Q: '可以不使用构建步骤来使用 Tailwind CSS 吗？',
    faq4A: '可以——Tailwind 提供独立的 CLI 可执行文件和 CDN 版本用于原型开发。CDN 版本（cdn.tailwindcss.com）使用新的 v4 引擎在浏览器中按需生成所有可能的工具类，适合演示和快速原型。但对于生产环境，始终建议使用构建步骤生成最小化的优化 CSS 文件。Vite + Tailwind 集成是新项目最快的构建设置。',
    faq5Q: '如何自定义 Tailwind 的颜色调色板？',
    faq5A: '在 Tailwind v3 中，在 tailwind.config.js 的 theme.extend.colors 下扩展颜色。可以添加新颜色名称、覆盖现有颜色或添加额外色调。在 Tailwind v4 中，在 @theme 块中将自定义颜色定义为 CSS 自定义属性：--color-brand: #6d28d9 使 brand-500 可用。新的 v4 方法使用原生 CSS 变量，因此自定义颜色也可通过 getComputedStyle 在 JavaScript 中访问。',
    faq6Q: 'Tailwind CSS 与手写 CSS 相比对性能有何影响？',
    faq6A: '就运行时性能而言，Tailwind 生成静态 CSS，没有 JavaScript 开销——与任何静态 CSS 文件一样快。工具类避免了需要 !important 覆盖的优先级问题，使级联管理可预测。对于大型应用，Tailwind 小而一致的 CSS 包实际上比不断增长的定制样式表改善了初始页面加载。设计系统的一致性也减少了随时间增长 CSS 的一次性样式实验的可能性。',
    faq7Q: '@apply 和提取组件有什么区别？',
    faq7A: '@apply 让你将 Tailwind 工具类组合成 CSS 类。适用于无法修改的第三方 HTML 内容（如 Markdown 输出或 CMS 内容）的样式化。对于你控制的组件（React/Vue/Svelte），提取组件文件几乎总是更好——你可以获得基于 props 的变体、TypeScript 类型、共处的逻辑和更好的 IDE 支持。过度使用 @apply 违背了实用优先 CSS 的目的，可能导致难以维护的 CSS。',
    faq8Q: '2025 年的新项目应该使用 Tailwind CSS v3 还是 v4？',
    faq8A: '对于 2025 年启动的新项目，使用 Tailwind v4。新的 CSS 优先配置模型更简单，Oxide 引擎速度显著更快，v4 更符合现代 CSS 标准。如果你在现有的 v3 项目上，迁移工具自动处理大多数破坏性变更。生态系统（shadcn/ui、Headless UI、插件）已大量更新支持 v4。留在 v3 的唯一原因是严格依赖尚未更新到 v4 的插件。',
    conclusion: 'Tailwind CSS 赢得最流行的实用优先 CSS 框架的地位是有原因的：编写速度快，调试可预测，可轻松进行 tree-shaking，并且深度可定制。无论是构建简单的落地页还是复杂的 SaaS 仪表盘，Tailwind 的约束强制一致性，而其逃生舱口（任意值、CSS 变量）处理任何边缘情况。Tailwind v4 的 CSS 优先配置和 Oxide 引擎让开发者体验达到了新的速度和简洁水平。Next.js + Tailwind CSS + shadcn/ui + cva 的组合代表了当今最具生产力的 React 样式技术栈。',
  },
};

export default function TailwindCssGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations['en'];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: translations['en']['faq1Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq1A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq2Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq2A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq3Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq3A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq4Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq4A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq5Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq5A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq6Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq6A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq7Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq7A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq8Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq8A'] },
      },
    ],
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: '1.7' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', lineHeight: '1.25' }}>
        {t.title}
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem' }}>{t.description}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '0 8px 8px 0', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, color: '#0369a1', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '1rem' }}>
          {lang === 'zh' ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <li style={{ color: '#334155' }}>{t.keyTakeaway1}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway2}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway3}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway4}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway5}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* Intro */}
      <p style={{ fontSize: '1.05rem', color: '#334155', marginBottom: '2.5rem' }}>{t.intro}</p>

      {/* Section 1: What is Tailwind CSS */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2What}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.whatDesc}</p>

      {/* Code: traditional vs utility-first */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '/* Traditional CSS approach */\n' +
            '.card {\n' +
            '  display: flex;\n' +
            '  flex-direction: column;\n' +
            '  padding: 1.5rem;\n' +
            '  background-color: #ffffff;\n' +
            '  border-radius: 0.5rem;\n' +
            '  box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n' +
            '  max-width: 24rem;\n' +
            '}\n\n' +
            '/* Tailwind CSS utility-first approach */\n' +
            '<div class="flex flex-col p-6 bg-white rounded-lg shadow-sm max-w-sm">\n' +
            '  ...\n' +
            '</div>\n\n' +
            '<!-- No CSS file needed — styles live in the markup -->'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.whatJit}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.whatJitDesc}</p>

      {/* Code: JIT arbitrary values */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- JIT Arbitrary values — any CSS value with square brackets -->\n' +
            '<div class="w-[237px] h-[117px] bg-[#1a73e8] top-[117px]">\n' +
            '  Exact pixel control when needed\n' +
            '</div>\n\n' +
            '<!-- Arbitrary properties — full CSS escape hatch -->\n' +
            '<div class="[mask-image:linear-gradient(to_bottom,black,transparent)]">\n' +
            '  Fade out effect\n' +
            '</div>\n\n' +
            '<!-- Opacity modifier (slash syntax) -->\n' +
            '<div class="bg-blue-500/50 text-white/80">\n' +
            '  50% opacity background, 80% opacity text\n' +
            '</div>'
          }</code>
        </pre>
      </div>

      {/* Section 2: Core Concepts */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Core}
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.coreSpacing}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.coreSpacingDesc}</p>

      {/* Code: spacing */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- Padding: p-{n} = n * 4px -->\n' +
            '<div class="p-4">       /* padding: 16px all sides */\n' +
            '<div class="px-6 py-3"> /* padding: 12px top/bottom, 24px left/right */\n' +
            '<div class="pt-2 pb-8"> /* padding-top: 8px, padding-bottom: 32px */\n\n' +
            '<!-- Margin -->\n' +
            '<div class="mx-auto">   /* margin: 0 auto (centering) */\n' +
            '<div class="mt-4 mb-8"> /* margin-top: 16px, margin-bottom: 32px */\n' +
            '<div class="-mt-4">     /* negative margin: margin-top: -16px */\n\n' +
            '<!-- Arbitrary values -->\n' +
            '<div class="p-[13px] mt-[3.25rem]"> /* exact values */\n' +
            '<div class="w-[calc(100%-2rem)]">    /* CSS calc() support */'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.coreColors}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.coreColorsDesc}</p>

      {/* Code: colors */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- Named palette colors (50 through 950 shades) -->\n' +
            '<p class="text-blue-500">            /* color: #3b82f6 */\n' +
            '<div class="bg-gray-100">            /* background: #f3f4f6 */\n' +
            '<div class="border border-red-300">  /* border: 1px solid #fca5a5 */\n' +
            '<div class="text-emerald-600">       /* color: #059669 */\n\n' +
            '<!-- Opacity modifier (slash) -->\n' +
            '<div class="bg-blue-500/50">         /* opacity: 0.5 */\n' +
            '<div class="bg-black/10">            /* black at 10% opacity */\n\n' +
            '<!-- Arbitrary color values -->\n' +
            '<p class="text-[#1a73e8]">           /* exact hex */\n' +
            '<div class="bg-[rgb(59,130,246)]">   /* rgb values */\n' +
            '<div class="border-[hsl(220,90%,56%)]"> /* hsl values */'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.coreTypography}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.coreTypographyDesc}</p>

      {/* Code: typography */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- Font sizes -->\n' +
            '<p class="text-xs">   /* 12px */\n' +
            '<p class="text-sm">   /* 14px */\n' +
            '<p class="text-base"> /* 16px */\n' +
            '<p class="text-lg">   /* 18px */\n' +
            '<p class="text-xl">   /* 20px */\n' +
            '<p class="text-2xl">  /* 24px */\n' +
            '<h1 class="text-4xl font-bold"> /* 36px, font-weight: 700 */\n\n' +
            '<!-- Font weight -->\n' +
            '<p class="font-thin">       /* 100 */\n' +
            '<p class="font-normal">     /* 400 */\n' +
            '<p class="font-semibold">   /* 600 */\n' +
            '<p class="font-bold">       /* 700 */\n' +
            '<p class="font-extrabold">  /* 800 */\n\n' +
            '<!-- Line height, tracking, alignment -->\n' +
            '<p class="leading-relaxed tracking-wide text-center">'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.coreResponsive}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.coreResponsiveDesc}</p>

      {/* Code: responsive */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- Mobile-first responsive design -->\n' +
            '<!-- No prefix = all screen sizes (mobile) -->\n' +
            '<!-- sm: = 640px+, md: = 768px+, lg: = 1024px+, xl: = 1280px+ -->\n\n' +
            '<div class="p-2 md:p-4 lg:p-6">\n' +
            '  8px on mobile, 16px on md, 24px on lg\n' +
            '</div>\n\n' +
            '<p class="text-sm md:text-base lg:text-lg">\n' +
            '  Font grows with screen size\n' +
            '</p>\n\n' +
            '<!-- Responsive grid: 1 col → 2 cols → 3 cols → 4 cols -->\n' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">\n' +
            '  <div>Card 1</div>\n' +
            '  <div>Card 2</div>\n' +
            '  <div>Card 3</div>\n' +
            '</div>\n\n' +
            '<!-- Hide/show at breakpoints -->\n' +
            '<div class="hidden md:block">Only visible on md and above</div>\n' +
            '<div class="block md:hidden">Only visible below md</div>'
          }</code>
        </pre>
      </div>

      {/* Section 3: Flexbox and Grid */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Flex}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.flexDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.flexboxTitle}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.flexboxDesc}</p>

      {/* Code: Flexbox */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- Centered flex container -->\n' +
            '<div class="flex justify-center items-center min-h-screen">\n' +
            '  Perfectly centered content\n' +
            '</div>\n\n' +
            '<!-- Navigation bar: logo left, links right -->\n' +
            '<nav class="flex justify-between items-center px-6 py-4">\n' +
            '  <div>Logo</div>\n' +
            '  <div class="flex gap-6">\n' +
            '    <a>Home</a>\n' +
            '    <a>About</a>\n' +
            '    <a>Contact</a>\n' +
            '  </div>\n' +
            '</nav>\n\n' +
            '<!-- Sidebar layout: sidebar + main content -->\n' +
            '<div class="flex gap-8">\n' +
            '  <aside class="w-64 flex-none">Sidebar</aside>\n' +
            '  <main class="flex-1">Main content grows to fill</main>\n' +
            '</div>\n\n' +
            '<!-- Vertical stack with equal spacing -->\n' +
            '<div class="flex flex-col gap-4">\n' +
            '  <div>Item 1</div>\n' +
            '  <div>Item 2</div>\n' +
            '  <div>Item 3</div>\n' +
            '</div>\n\n' +
            '<!-- Wrapping tag list -->\n' +
            '<div class="flex flex-wrap gap-2">\n' +
            '  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">React</span>\n' +
            '  <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full">TypeScript</span>\n' +
            '  <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Tailwind</span>\n' +
            '</div>'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.gridTitle}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.gridDesc}</p>

      {/* Code: Grid */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- Responsive card grid -->\n' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">\n' +
            '  <div class="bg-white rounded-lg shadow p-4">Card 1</div>\n' +
            '  <div class="bg-white rounded-lg shadow p-4">Card 2</div>\n' +
            '  <div class="bg-white rounded-lg shadow p-4">Card 3</div>\n' +
            '</div>\n\n' +
            '<!-- 12-column layout with spanning -->\n' +
            '<div class="grid grid-cols-12 gap-4">\n' +
            '  <aside class="col-span-3">Sidebar (3/12)</aside>\n' +
            '  <main class="col-span-9">Content (9/12)</main>\n' +
            '</div>\n\n' +
            '<!-- Full-width featured item + 3 cards -->\n' +
            '<div class="grid grid-cols-2 md:grid-cols-4 gap-4">\n' +
            '  <div class="col-span-2">Featured item (2 cols)</div>\n' +
            '  <div>Card 1</div>\n' +
            '  <div>Card 2</div>\n' +
            '</div>\n\n' +
            '<!-- Auto-fit columns (CSS subgrid-like) -->\n' +
            '<div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">\n' +
            '  <!-- Items auto-fill available space -->\n' +
            '</div>'
          }</code>
        </pre>
      </div>

      {/* Section 4: Dark Mode */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Dark}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.darkDesc}</p>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.darkClassDesc}</p>

      {/* Code: Dark mode */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '/* tailwind.config.js — v3 dark mode strategy */\n' +
            'module.exports = {\n' +
            '  darkMode: "class",  // or "media"\n' +
            '  // ...\n' +
            '};\n\n' +
            '<!-- HTML: add "dark" class to html element -->\n' +
            '<html class="dark">\n\n' +
            '<!-- Component with dark mode variants -->\n' +
            '<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100\n' +
            '            border border-gray-200 dark:border-gray-700\n' +
            '            rounded-lg p-6">\n' +
            '  <h2 class="text-xl font-bold text-gray-900 dark:text-white">Title</h2>\n' +
            '  <p class="text-gray-600 dark:text-gray-400">Body text</p>\n' +
            '  <button class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700\n' +
            '                 dark:hover:bg-blue-400 text-white px-4 py-2 rounded">\n' +
            '    Action\n' +
            '  </button>\n' +
            '</div>\n\n' +
            '// Toggle dark mode in JavaScript\n' +
            'function toggleDarkMode() {\n' +
            '  document.documentElement.classList.toggle("dark");\n' +
            '  localStorage.setItem("theme",\n' +
            '    document.documentElement.classList.contains("dark") ? "dark" : "light"\n' +
            '  );\n' +
            '}'
          }</code>
        </pre>
      </div>

      {/* Tailwind v4 dark mode note */}
      <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '2rem' }}>
        <p style={{ margin: 0, color: '#713f12', fontSize: '0.9rem' }}>
          <strong>Tailwind v4:</strong> {lang === 'zh'
            ? '在 v4 中，使用 CSS @variant dark (&:where(.dark, .dark *)) 自定义暗黑策略，或使用 @import "tailwindcss" 中内置的 @media (prefers-color-scheme: dark) 变体。'
            : 'In v4, dark mode strategy is configured via @variant dark (&:where(.dark, .dark *)) in your CSS, or use the built-in @media (prefers-color-scheme: dark) variant from @import "tailwindcss".'}
        </p>
      </div>

      {/* Section 5: Custom Configuration */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Config}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.configDesc}</p>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.configV3Desc}</p>

      {/* Code: tailwind.config.js v3 */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '// tailwind.config.js — Tailwind v3\n' +
            '/** @type {import("tailwindcss").Config} */\n' +
            'module.exports = {\n' +
            '  content: [\n' +
            '    "./src/**/*.{js,ts,jsx,tsx,mdx}",\n' +
            '    "./pages/**/*.{js,ts,jsx,tsx,mdx}",\n' +
            '    "./components/**/*.{js,ts,jsx,tsx,mdx}",\n' +
            '  ],\n' +
            '  darkMode: "class",\n' +
            '  theme: {\n' +
            '    extend: {\n' +
            '      colors: {\n' +
            '        brand: {\n' +
            '          50:  "#eff6ff",\n' +
            '          500: "#3b82f6",\n' +
            '          900: "#1e3a8a",\n' +
            '        },\n' +
            '        primary: "#6d28d9",\n' +
            '      },\n' +
            '      fontFamily: {\n' +
            '        sans: ["Inter", "system-ui", "sans-serif"],\n' +
            '        mono: ["Fira Code", "monospace"],\n' +
            '      },\n' +
            '      screens: {\n' +
            '        "3xl": "1920px",  // custom breakpoint\n' +
            '      },\n' +
            '      borderRadius: {\n' +
            '        "4xl": "2rem",\n' +
            '      },\n' +
            '      spacing: {\n' +
            '        "128": "32rem",  // w-128 = 512px\n' +
            '      },\n' +
            '      animation: {\n' +
            '        "fade-in": "fadeIn 0.3s ease-out",\n' +
            '      },\n' +
            '      keyframes: {\n' +
            '        fadeIn: {\n' +
            '          "0%": { opacity: "0", transform: "translateY(-8px)" },\n' +
            '          "100%": { opacity: "1", transform: "translateY(0)" },\n' +
            '        },\n' +
            '      },\n' +
            '    },\n' +
            '  },\n' +
            '  plugins: [\n' +
            '    require("@tailwindcss/typography"),\n' +
            '    require("@tailwindcss/forms"),\n' +
            '    require("@tailwindcss/container-queries"),\n' +
            '  ],\n' +
            '};'
          }</code>
        </pre>
      </div>

      {/* Code: Tailwind v4 CSS-first config */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '/* globals.css — Tailwind v4 CSS-first configuration */\n' +
            '@import "tailwindcss";\n\n' +
            '@theme {\n' +
            '  /* Custom colors — exposed as var(--color-brand-500) */\n' +
            '  --color-brand-50:  #eff6ff;\n' +
            '  --color-brand-500: #3b82f6;\n' +
            '  --color-brand-900: #1e3a8a;\n' +
            '  --color-primary:   #6d28d9;\n\n' +
            '  /* Custom fonts */\n' +
            '  --font-sans: "Inter", system-ui, sans-serif;\n' +
            '  --font-mono: "Fira Code", monospace;\n\n' +
            '  /* Custom breakpoints */\n' +
            '  --breakpoint-3xl: 1920px;\n\n' +
            '  /* Custom spacing */\n' +
            '  --spacing-128: 32rem;\n' +
            '}\n\n' +
            '/* No tailwind.config.js needed! */\n' +
            '/* Custom variants */\n' +
            '@variant dark (&:where(.dark, .dark *));\n\n' +
            '/* Component styles using @apply */\n' +
            '@layer components {\n' +
            '  .btn-primary {\n' +
            '    @apply bg-brand-500 text-white px-4 py-2 rounded-lg\n' +
            '           hover:bg-brand-600 transition-colors;\n' +
            '  }\n' +
            '}'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.configPlugins}</h3>
      <p style={{ color: '#334155', marginBottom: '2rem' }}>{t.configPluginsDesc}</p>

      {/* Section 6: Components and Reusability */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Components}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.componentsDesc}</p>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.applyDesc}</p>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.cvaDesc}</p>

      {/* Code: @apply and cva */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '/* @apply: composing utilities into a CSS class */\n' +
            '@layer components {\n' +
            '  .prose-content h1 {\n' +
            '    @apply text-3xl font-bold text-gray-900 mb-4 mt-8;\n' +
            '  }\n' +
            '  .prose-content p {\n' +
            '    @apply text-gray-700 leading-relaxed mb-4;\n' +
            '  }\n' +
            '}'
          }</code>
        </pre>
      </div>

      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '// Button component with cva (Class Variance Authority)\n' +
            'import { cva, type VariantProps } from "cva";\n' +
            'import { cn } from "@/lib/utils";\n\n' +
            'const buttonVariants = cva(\n' +
            '  // Base classes\n' +
            '  "inline-flex items-center justify-center rounded-md font-medium\n' +
            '   transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2\n' +
            '   disabled:opacity-50 disabled:pointer-events-none",\n' +
            '  {\n' +
            '    variants: {\n' +
            '      variant: {\n' +
            '        default:     "bg-blue-600 text-white hover:bg-blue-700",\n' +
            '        destructive: "bg-red-600 text-white hover:bg-red-700",\n' +
            '        outline:     "border border-gray-300 bg-white hover:bg-gray-50",\n' +
            '        ghost:       "hover:bg-gray-100 hover:text-gray-900",\n' +
            '        link:        "underline-offset-4 hover:underline text-blue-600",\n' +
            '      },\n' +
            '      size: {\n' +
            '        sm:      "h-8  px-3 text-sm",\n' +
            '        default: "h-10 px-4 py-2",\n' +
            '        lg:      "h-12 px-8 text-lg",\n' +
            '        icon:    "h-10 w-10",\n' +
            '      },\n' +
            '    },\n' +
            '    defaultVariants: {\n' +
            '      variant: "default",\n' +
            '      size: "default",\n' +
            '    },\n' +
            '  }\n' +
            ');\n\n' +
            'interface ButtonProps\n' +
            '  extends React.ButtonHTMLAttributes<HTMLButtonElement>,\n' +
            '    VariantProps<typeof buttonVariants> {}\n\n' +
            'export function Button({ className, variant, size, ...props }: ButtonProps) {\n' +
            '  return (\n' +
            '    <button\n' +
            '      className={cn(buttonVariants({ variant, size }), className)}\n' +
            '      {...props}\n' +
            '    />\n' +
            '  );\n' +
            '}\n\n' +
            '// Usage — fully typed\n' +
            '<Button variant="outline" size="lg">Click me</Button>\n' +
            '<Button variant="destructive">Delete</Button>'
          }</code>
        </pre>
      </div>

      {/* Section 7: Tailwind v4 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2V4}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.v4Desc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.v4Features}</h3>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.v4FeaturesDesc}</p>

      {/* Code: v4 new features */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '/* Tailwind v4 — New 3D transform utilities */\n' +
            '<div class="rotate-x-45 rotate-y-12 perspective-500">\n' +
            '  3D rotated card\n' +
            '</div>\n\n' +
            '/* Text shadow and inset shadow (new in v4) */\n' +
            '<h1 class="text-shadow-lg text-shadow-black/20">\n' +
            '  Heading with text shadow\n' +
            '</h1>\n' +
            '<div class="inset-shadow-sm inset-shadow-black/10 rounded-lg">\n' +
            '  Inset shadow container\n' +
            '</div>\n\n' +
            '/* Container queries — @min and @max variants */\n' +
            '<div class="@container">\n' +
            '  <div class="@min-sm:grid-cols-2 @min-lg:grid-cols-3 grid gap-4">\n' +
            '    Responds to container width, not viewport\n' +
            '  </div>\n' +
            '</div>\n\n' +
            '/* @starting-style for entry animations */\n' +
            '.toast {\n' +
            '  opacity: 1;\n' +
            '  transform: translateY(0);\n' +
            '  transition: all 0.3s;\n\n' +
            '  @starting-style {\n' +
            '    opacity: 0;\n' +
            '    transform: translateY(1rem);\n' +
            '  }\n' +
            '}'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.v4Migration}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.v4MigrationDesc}</p>

      {/* Code: v4 migration */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '# Run the automated migration tool\n' +
            'npx @tailwindcss/upgrade\n\n' +
            '# Install Tailwind v4 + PostCSS plugin\n' +
            'npm install tailwindcss@next @tailwindcss/postcss@next\n\n' +
            '/* Before (v3 globals.css) */\n' +
            '@tailwind base;\n' +
            '@tailwind components;\n' +
            '@tailwind utilities;\n\n' +
            '/* After (v4 globals.css) */\n' +
            '@import "tailwindcss";\n\n' +
            '/* Before (postcss.config.js v3) */\n' +
            'module.exports = {\n' +
            '  plugins: { tailwindcss: {}, autoprefixer: {} },\n' +
            '};\n\n' +
            '/* After (postcss.config.js v4) */\n' +
            'module.exports = {\n' +
            '  plugins: { "@tailwindcss/postcss": {} },\n' +
            '};\n\n' +
            '// Key class renames in v4\n' +
            '// shadow-sm   → shadow-xs\n' +
            '// shadow       → shadow-sm\n' +
            '// ring         → ring-1 (ring defaults to 1px now)\n' +
            '// overflow-ellipsis → text-ellipsis\n' +
            '// decoration-slice  → box-decoration-slice'
          }</code>
        </pre>
      </div>

      {/* Section 8: React/Next.js Integration */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2React}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.reactDesc}</p>

      {/* Code: Next.js setup */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '# Create Next.js 14+ project with Tailwind (auto-configured)\n' +
            'npx create-next-app@latest my-app --typescript --tailwind\n\n' +
            '# Install cn utility dependencies\n' +
            'npm install clsx tailwind-merge\n\n' +
            '// lib/utils.ts — the cn() utility\n' +
            'import { clsx, type ClassValue } from "clsx";\n' +
            'import { twMerge } from "tailwind-merge";\n\n' +
            'export function cn(...inputs: ClassValue[]) {\n' +
            '  return twMerge(clsx(inputs));\n' +
            '}\n\n' +
            '// Usage in a React component\n' +
            'import { cn } from "@/lib/utils";\n\n' +
            'interface CardProps {\n' +
            '  className?: string;\n' +
            '  highlighted?: boolean;\n' +
            '}\n\n' +
            'export function Card({ className, highlighted }: CardProps) {\n' +
            '  return (\n' +
            '    <div\n' +
            '      className={cn(\n' +
            '        "rounded-lg border bg-white p-6 shadow-sm",\n' +
            '        highlighted && "border-blue-500 ring-2 ring-blue-500/20",\n' +
            '        className  // consumer can override\n' +
            '      )}\n' +
            '    />\n' +
            '  );\n' +
            '}'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.cnDesc}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.cnUtilityDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>{t.shadcnDesc}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.shadcnDetails}</p>

      {/* Code: shadcn/ui setup */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '# Initialize shadcn/ui in a Next.js + Tailwind project\n' +
            'npx shadcn@latest init\n\n' +
            '# Add components — code is copied to your project\n' +
            'npx shadcn@latest add button\n' +
            'npx shadcn@latest add card\n' +
            'npx shadcn@latest add dialog\n' +
            'npx shadcn@latest add dropdown-menu\n\n' +
            '// Usage — fully typed, Tailwind-styled\n' +
            'import { Button } from "@/components/ui/button";\n' +
            'import { Card, CardHeader, CardContent } from "@/components/ui/card";\n\n' +
            'export default function Page() {\n' +
            '  return (\n' +
            '    <Card className="max-w-md">\n' +
            '      <CardHeader>\n' +
            '        <h2 className="text-xl font-semibold">Plan</h2>\n' +
            '      </CardHeader>\n' +
            '      <CardContent>\n' +
            '        <p>Includes all features</p>\n' +
            '        <Button variant="default" size="lg" className="w-full mt-4">\n' +
            '          Get Started\n' +
            '        </Button>\n' +
            '      </CardContent>\n' +
            '    </Card>\n' +
            '  );\n' +
            '}'
          }</code>
        </pre>
      </div>

      {/* Section 9: Comparison Table */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Comparison}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.5rem' }}>{t.comparisonDesc}</p>

      {/* Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e2e8f0' }}>
                {lang === 'zh' ? '维度' : 'Dimension'}
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#0369a1', borderBottom: '2px solid #e2e8f0' }}>
                Tailwind CSS
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e2e8f0' }}>
                Bootstrap
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e2e8f0' }}>
                CSS Modules
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e2e8f0' }}>
                Styled Components
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                dim: lang === 'zh' ? '开发范式' : 'Paradigm',
                tw: lang === 'zh' ? '实用优先，HTML内联' : 'Utility-first, inline in HTML',
                bs: lang === 'zh' ? '组件优先，预构建类' : 'Component-first, pre-built',
                cm: lang === 'zh' ? '作用域CSS，类似CSS' : 'Scoped CSS, CSS-like',
                sc: lang === 'zh' ? 'CSS-in-JS，标签模板' : 'CSS-in-JS, tagged templates',
              },
              {
                dim: lang === 'zh' ? '包体积（gzip）' : 'Bundle size (gzipped)',
                tw: '5–15 KB',
                bs: '~22 KB min CSS',
                cm: lang === 'zh' ? '取决于使用量' : 'Depends on usage',
                sc: lang === 'zh' ? '运行时 ~13KB' : '~13KB runtime',
              },
              {
                dim: lang === 'zh' ? 'TypeScript 支持' : 'TypeScript support',
                tw: lang === 'zh' ? '通过 cva/tailwind-merge 实现' : 'Via cva/tailwind-merge',
                bs: lang === 'zh' ? '通过 @types 实现' : 'Via @types',
                cm: lang === 'zh' ? '原生，类型化模块' : 'Native, typed modules',
                sc: lang === 'zh' ? '内置，全类型化' : 'Built-in, fully typed',
              },
              {
                dim: lang === 'zh' ? '运行时性能' : 'Runtime performance',
                tw: lang === 'zh' ? '零运行时，纯静态CSS' : 'Zero runtime, pure static CSS',
                bs: lang === 'zh' ? '零运行时（CSS）' : 'Zero runtime (CSS only)',
                cm: lang === 'zh' ? '零运行时（构建时）' : 'Zero runtime (build time)',
                sc: lang === 'zh' ? '有运行时开销' : 'Runtime overhead',
              },
              {
                dim: lang === 'zh' ? '学习曲线' : 'Learning curve',
                tw: lang === 'zh' ? '中（需学习工具类）' : 'Medium (learn utilities)',
                bs: lang === 'zh' ? '低（熟悉类名）' : 'Low (familiar class names)',
                cm: lang === 'zh' ? '低（纯CSS）' : 'Low (just CSS)',
                sc: lang === 'zh' ? '中（JS中写CSS）' : 'Medium (CSS in JS)',
              },
              {
                dim: lang === 'zh' ? '设计系统' : 'Design system',
                tw: lang === 'zh' ? '内置，高度可定制' : 'Built-in, highly customizable',
                bs: lang === 'zh' ? '内置，较难覆盖' : 'Built-in, hard to override',
                cm: lang === 'zh' ? '手动构建' : 'Manual — build your own',
                sc: lang === 'zh' ? '手动构建' : 'Manual — build your own',
              },
              {
                dim: lang === 'zh' ? '响应式设计' : 'Responsive design',
                tw: lang === 'zh' ? '断点前缀（sm:/md:/lg:）' : 'Breakpoint prefixes (sm:/md:/lg:)',
                bs: lang === 'zh' ? '网格类（col-md-6）' : 'Grid classes (col-md-6)',
                cm: lang === 'zh' ? '标准媒体查询' : 'Standard media queries',
                sc: lang === 'zh' ? '标准媒体查询' : 'Standard media queries',
              },
              {
                dim: lang === 'zh' ? '暗黑模式' : 'Dark mode',
                tw: lang === 'zh' ? 'dark: 前缀，内置' : 'dark: prefix, built-in',
                bs: lang === 'zh' ? 'v5.3+ 内置支持' : 'v5.3+ built-in support',
                cm: lang === 'zh' ? '媒体查询（手动）' : 'Media queries (manual)',
                sc: lang === 'zh' ? 'ThemeProvider（运行时）' : 'ThemeProvider (runtime)',
              },
              {
                dim: lang === 'zh' ? '最适合' : 'Best for',
                tw: lang === 'zh' ? '快速迭代，设计系统' : 'Rapid iteration, design systems',
                bs: lang === 'zh' ? '原型，内部工具' : 'Prototypes, admin tools',
                cm: lang === 'zh' ? '传统项目，精细控制' : 'Legacy projects, fine control',
                sc: lang === 'zh' ? '动态主题，组件库' : 'Dynamic theming, libraries',
              },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: '#374151' }}>{row.dim}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#0369a1', fontWeight: 500 }}>{row.tw}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{row.bs}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{row.cm}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{row.sc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 10: FAQ */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {t.h2FAQ}
      </h2>

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
        <div key={i} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ color: '#475569', margin: 0, lineHeight: '1.7' }}>{faq.a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1.5rem', marginTop: '2rem' }}>
        <p style={{ margin: 0, color: '#14532d', lineHeight: '1.7' }}>{t.conclusion}</p>
      </div>
    </article>
  );
}
