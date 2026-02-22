'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tailwind CSS vs CSS Modules: Which to Choose?',
    intro: 'Choosing a CSS strategy for your next project is one of the most consequential architectural decisions you will make. Tailwind CSS and CSS Modules represent two fundamentally different philosophies: utility-first inline styling versus component-scoped traditional CSS. This guide provides a deep, practical comparison to help you make the right choice based on your team, project size, and technical requirements.',

    tailwindTitle: 'What Is Tailwind CSS?',
    tailwindDesc1: 'Tailwind CSS is a utility-first CSS framework that provides thousands of small, single-purpose classes like flex, pt-4, text-center, and rounded-lg. Instead of writing custom CSS, you compose designs directly in your HTML or JSX by combining utility classes. The framework generates only the CSS your project actually uses through a build-time scanning process.',
    tailwindDesc2: 'Tailwind gained massive adoption because it eliminates the naming problem entirely. You never need to invent class names like .sidebar-inner-wrapper-card-header. Instead, you describe what the element looks like using utilities. With Tailwind v4 (released in 2025), the framework became even faster with a Rust-based engine and zero-configuration setup.',
    tailwindCode: `// Tailwind CSS — React component example
function ProductCard({ product }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200
                    bg-white p-6 shadow-sm transition-all duration-300
                    hover:shadow-xl hover:-translate-y-1
                    dark:border-gray-700 dark:bg-gray-800">
      <div className="aspect-square overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform
                     duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900
                         dark:text-white truncate">
            {product.name}
          </h3>
          <span className="inline-flex items-center rounded-full
                           bg-green-100 px-2.5 py-0.5 text-xs
                           font-medium text-green-800">
            In Stock
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400
                      line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-gray-900
                           dark:text-white">
            \${product.price}
          </span>
          <button className="rounded-lg bg-blue-600 px-4 py-2
                             text-sm font-medium text-white
                             transition-colors hover:bg-blue-700
                             focus:outline-none focus:ring-2
                             focus:ring-blue-500 focus:ring-offset-2
                             active:bg-blue-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}`,

    cssModulesTitle: 'What Are CSS Modules?',
    cssModulesDesc1: 'CSS Modules is a CSS file convention where all class names are scoped locally to the component by default. When you import a CSS Module file, each class name gets a unique hash suffix at build time (e.g., .title becomes .title_a1b2c3), preventing style collisions between components. CSS Modules work with plain CSS, Sass, Less, and PostCSS.',
    cssModulesDesc2: 'CSS Modules are supported natively by Next.js, Vite, webpack, and most modern bundlers without any additional configuration. They provide the familiar CSS writing experience while solving the global scope problem. Your styles are guaranteed to not leak between components, regardless of class naming.',
    cssModulesCode: `/* ProductCard.module.css */
.card {
  position: relative;
  border-radius: 1rem;
  border: 1px solid var(--border-color, #e5e7eb);
  background: var(--bg-card, #ffffff);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.imageContainer {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.75rem;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .image {
  transform: scale(1.1);
}

.content {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary, #111827);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  background: #dcfce7;
  font-size: 0.75rem;
  font-weight: 500;
  color: #166534;
}

.description {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #111827);
}

.button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #2563eb;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: #1d4ed8;
}

// ProductCard.tsx
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{product.name}</h3>
          <span className={styles.badge}>In Stock</span>
        </div>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>\${product.price}</span>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}`,

    comparisonTitle: 'Head-to-Head Comparison',
    comparisonDesc: 'This table summarizes the key differences across dimensions that matter most in real-world projects:',

    dxTitle: 'Developer Experience',
    dxDesc: 'Developer experience is where these two approaches differ most dramatically.',
    dxTailwind: 'Tailwind: Speed Through Co-location',
    dxTailwindDesc: 'Tailwind keeps styles and markup in the same file. You never context-switch between CSS and JSX. With editor extensions (Tailwind CSS IntelliSense), you get autocomplete for every utility, color value previews, and class sorting. The tight feedback loop makes prototyping extremely fast. However, long class strings can reduce readability for complex components.',
    dxModules: 'CSS Modules: Familiarity and Separation',
    dxModulesDesc: 'CSS Modules use standard CSS syntax that every web developer already knows. Styles live in separate files, keeping components focused on logic and structure. You get full access to CSS features like media queries, pseudo-elements, and animations without any abstraction layer. The trade-off is more file switching and the need to invent class names.',

    perfTitle: 'Performance Comparison',
    perfDesc: 'Both approaches produce highly optimized output in production, but through different mechanisms:',
    perfTailwind: 'Tailwind scans your source files at build time and generates only the CSS for utilities you actually use. A typical Tailwind project produces 8-15KB of CSS (gzipped). Because utilities are reused across components, the total CSS size grows very slowly as your application scales. Tailwind v4 further optimizes by using a Rust engine that is 5x faster than the previous JavaScript-based compiler.',
    perfModules: 'CSS Modules output depends on how much CSS you write. Each component gets its own CSS block, so total CSS size grows linearly with the number of components. However, modern bundlers like Vite and webpack perform CSS tree-shaking and deduplication. For most applications, CSS Modules produce slightly larger bundles than Tailwind, but the difference is rarely significant enough to impact user experience.',

    maintTitle: 'Maintainability at Scale',
    maintDesc: 'How well does each approach scale to large codebases with many contributors?',
    maintTailwind: 'Tailwind excels in large teams because it enforces a design system through its configuration. All spacing, colors, font sizes, and breakpoints come from a centralized config file (tailwind.config.js). Developers cannot easily introduce one-off values, which keeps the UI consistent. The downside is that component templates can become verbose, especially for complex responsive layouts with dark mode support.',
    maintModules: 'CSS Modules provide strong isolation, which prevents style conflicts in large codebases. Each component is a self-contained unit with guaranteed non-leaking styles. However, CSS Modules do not enforce a design system by default. Without discipline, developers can introduce inconsistent spacing, colors, and sizing. Design tokens (CSS custom properties) can mitigate this, but they require manual setup and enforcement.',

    responsiveTitle: 'Responsive Design',
    responsiveDesc: 'Both approaches handle responsive design well, but with different ergonomics:',
    responsiveCode: `/* Tailwind — responsive inline */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                gap-4 md:gap-6 lg:gap-8
                p-4 md:p-6 lg:p-8">
  <div className="col-span-1 md:col-span-2 lg:col-span-1">
    {/* Content */}
  </div>
</div>

/* CSS Modules — responsive in stylesheet */
/* Layout.module.css */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 2rem;
  }
}

.featured {
  grid-column: span 1;
}

@media (min-width: 768px) {
  .featured {
    grid-column: span 2;
  }
}

@media (min-width: 1024px) {
  .featured {
    grid-column: span 1;
  }
}`,

    darkModeTitle: 'Dark Mode Implementation',
    darkModeDesc: 'Dark mode is a common requirement, and each approach handles it differently:',
    darkModeCode: `/* Tailwind — dark mode with dark: prefix */
<div className="bg-white text-gray-900
                dark:bg-gray-900 dark:text-gray-100">
  <h2 className="text-blue-600 dark:text-blue-400">Title</h2>
  <p className="text-gray-500 dark:text-gray-400">Description</p>
  <button className="bg-blue-600 hover:bg-blue-700
                     dark:bg-blue-500 dark:hover:bg-blue-600
                     text-white rounded-lg px-4 py-2">
    Action
  </button>
</div>

/* CSS Modules — dark mode with CSS custom properties */
/* theme.css (global) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
}

[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
}

/* Component.module.css */
.container {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.title {
  color: var(--accent);
}

.button {
  background: var(--accent);
  color: white;
}

.button:hover {
  background: var(--accent-hover);
}`,

    whenTailwindTitle: 'When to Choose Tailwind CSS',
    wt1: 'Rapid prototyping and MVPs where speed of development is the top priority.',
    wt2: 'Teams that want a built-in design system with consistent spacing, colors, and typography from day one.',
    wt3: 'Projects where designers and developers work closely together and use the same design tokens.',
    wt4: 'Component-heavy applications (React, Vue, Svelte) where styles are naturally co-located with markup.',
    wt5: 'Teams that want to minimize CSS file management and avoid naming conventions entirely.',
    wt6: 'Projects with extensive responsive and dark mode requirements, where Tailwind modifiers (md:, dark:, hover:) reduce boilerplate.',

    whenModulesTitle: 'When to Choose CSS Modules',
    wm1: 'Teams with strong CSS expertise who prefer writing traditional stylesheets with full CSS power.',
    wm2: 'Projects that need complex CSS features like animations, pseudo-elements, container queries, and CSS grid layouts that benefit from dedicated stylesheet files.',
    wm3: 'Large codebases where style isolation is critical and you want guaranteed non-leaking styles without runtime overhead.',
    wm4: 'Gradual migration from a legacy CSS codebase, since CSS Modules allow incremental adoption alongside existing global styles.',
    wm5: 'Applications where clean, readable JSX templates are prioritized over co-located styles.',
    wm6: 'Projects using server-side rendering (SSR) where zero-JavaScript CSS solutions are preferred for performance.',

    hybridTitle: 'The Hybrid Approach',
    hybridDesc: 'Many successful teams use both Tailwind and CSS Modules in the same project. Tailwind handles layout, spacing, and utility styles, while CSS Modules handle complex component-specific styles like animations and intricate hover effects.',
    hybridCode: `// Hybrid: Tailwind for layout + CSS Module for complex styles
// AnimatedCard.module.css
.card {
  perspective: 1000px;
}

.inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card:hover .inner {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}

// AnimatedCard.tsx
import styles from './AnimatedCard.module.css';

function AnimatedCard({ front, back }) {
  return (
    <div className={\`\${styles.card} w-64 h-80\`}>
      <div className={styles.inner}>
        <div className={\`\${styles.front} rounded-xl bg-white
                         shadow-lg p-6 flex items-center
                         justify-center\`}>
          {front}
        </div>
        <div className={\`\${styles.back} rounded-xl bg-blue-600
                         text-white p-6 flex items-center
                         justify-center\`}>
          {back}
        </div>
      </div>
    </div>
  );
}`,

    bestPracticesTitle: 'Best Practices',
    bp1: 'Tailwind: Extract repeated class patterns into reusable React components, not @apply directives. Components are the abstraction layer in component-based frameworks.',
    bp2: 'Tailwind: Use the Prettier plugin (prettier-plugin-tailwindcss) to automatically sort classes in a consistent order. This makes class strings much easier to read and review.',
    bp3: 'CSS Modules: Use CSS custom properties (design tokens) for colors, spacing, and typography to maintain consistency across components without a framework.',
    bp4: 'CSS Modules: Use the composes keyword to share common styles between modules, avoiding duplication while maintaining scoping.',
    bp5: 'Both: Set up linting. Use eslint-plugin-tailwindcss for Tailwind or stylelint for CSS Modules to catch errors and enforce conventions early.',
    bp6: 'Both: Measure your production CSS bundle size. Use tools like bundlephobia, lighthouse, or webpack-bundle-analyzer to ensure your CSS strategy is not creating unnecessarily large payloads.',

    faq1q: 'Can I use Tailwind CSS and CSS Modules together?',
    faq1a: 'Yes, they work well together in the same project. Next.js and Vite support both out of the box. A common pattern is using Tailwind for layout and spacing utilities, while using CSS Modules for complex component styles like animations, pseudo-elements, or intricate hover effects. Import the CSS Module and combine its classes with Tailwind utilities in className.',
    faq2q: 'Does Tailwind CSS produce larger bundle sizes than CSS Modules?',
    faq2a: 'No, the opposite is usually true. Tailwind scans your code and only generates CSS for utilities you actually use. A typical Tailwind project produces 8-15KB of CSS (gzipped). CSS Modules output grows linearly with the number of components and unique styles. For large applications, Tailwind typically produces smaller CSS bundles because utilities are shared across components.',
    faq3q: 'Is Tailwind CSS harder to maintain than CSS Modules?',
    faq3a: 'It depends on your approach. Long Tailwind class strings can reduce readability, but this is mitigated by extracting them into React components (which you should do anyway). CSS Modules are easier to read initially but require discipline to maintain consistency. Both approaches are maintainable at scale with the right conventions and tooling.',
    faq4q: 'Will Tailwind CSS work with server components in Next.js?',
    faq4a: 'Yes. Tailwind CSS is purely compile-time and produces static CSS. It works perfectly with React Server Components because it adds no client-side JavaScript. CSS Modules also work seamlessly with server components for the same reason.',
    faq5q: 'Should I learn CSS before using Tailwind?',
    faq5a: 'Yes, understanding CSS fundamentals is essential even with Tailwind. Tailwind utility classes map directly to CSS properties (flex maps to display: flex, p-4 maps to padding: 1rem). Without understanding the underlying CSS, you will struggle to debug layout issues, understand responsive breakpoints, or build complex layouts. Learn CSS first, then use Tailwind as a productivity tool on top of that knowledge.',

    tryTools: 'Try our related developer tools',
  },
  zh: {
    title: 'Tailwind CSS vs CSS Modules：如何选择？',
    intro: '为你的下一个项目选择 CSS 策略是最重要的架构决策之一。Tailwind CSS 和 CSS Modules 代表了两种根本不同的理念：实用优先的内联样式 vs 组件作用域的传统 CSS。本指南提供深入、实用的对比分析，帮助你根据团队情况、项目规模和技术需求做出正确选择。',

    tailwindTitle: '什么是 Tailwind CSS？',
    tailwindDesc1: 'Tailwind CSS 是一个实用优先的 CSS 框架，提供数千个单一用途的小类名，如 flex、pt-4、text-center 和 rounded-lg。你不需要编写自定义 CSS，而是通过在 HTML 或 JSX 中组合实用类来直接构建设计。框架通过构建时扫描过程只生成项目实际使用的 CSS。',
    tailwindDesc2: 'Tailwind 获得广泛采用，因为它完全消除了命名问题。你永远不需要发明类似 .sidebar-inner-wrapper-card-header 的类名。Tailwind v4（2025 年发布）通过基于 Rust 的引擎和零配置设置变得更快。',
    tailwindCode: `// Tailwind CSS — React 组件示例
function ProductCard({ product }) {
  return (
    <div className="group relative rounded-2xl border
                    border-gray-200 bg-white p-6 shadow-sm
                    transition-all hover:shadow-xl
                    dark:border-gray-700 dark:bg-gray-800">
      <img src={product.image} alt={product.name}
           className="h-full w-full object-cover
                      group-hover:scale-110" />
      <h3 className="text-lg font-semibold text-gray-900
                     dark:text-white">{product.name}</h3>
      <button className="rounded-lg bg-blue-600 px-4 py-2
                         text-white hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}`,

    cssModulesTitle: '什么是 CSS Modules？',
    cssModulesDesc1: 'CSS Modules 是一种 CSS 文件约定，其中所有类名默认局部作用于组件。当你导入 CSS Module 文件时，每个类名在构建时会获得唯一的哈希后缀（如 .title 变为 .title_a1b2c3），防止组件之间的样式冲突。CSS Modules 可与纯 CSS、Sass、Less 和 PostCSS 配合使用。',
    cssModulesDesc2: 'CSS Modules 被 Next.js、Vite、webpack 和大多数现代打包工具原生支持，无需额外配置。它们提供熟悉的 CSS 编写体验，同时解决了全局作用域问题。无论类名如何命名，你的样式都保证不会泄漏到其他组件。',
    cssModulesCode: `/* ProductCard.module.css */
.card {
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

// ProductCard.tsx
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{product.name}</h3>
    </div>
  );
}`,

    comparisonTitle: '正面对比',
    comparisonDesc: '此表总结了在实际项目中最重要的维度上的关键差异：',

    dxTitle: '开发者体验',
    dxDesc: '开发者体验是这两种方法差异最大的地方。',
    dxTailwind: 'Tailwind：通过共置加速开发',
    dxTailwindDesc: 'Tailwind 将样式和标记放在同一文件中，你永远不需要在 CSS 和 JSX 之间切换上下文。配合编辑器扩展（Tailwind CSS IntelliSense），你可以获得每个实用类的自动补全、颜色值预览和类排序。然而，对于复杂组件，较长的类字符串可能会降低可读性。',
    dxModules: 'CSS Modules：熟悉感和关注点分离',
    dxModulesDesc: 'CSS Modules 使用每个 Web 开发者都已经了解的标准 CSS 语法。样式在单独的文件中，让组件专注于逻辑和结构。你可以完全使用 CSS 特性如媒体查询、伪元素和动画，没有任何抽象层。缺点是需要更多的文件切换和发明类名。',

    perfTitle: '性能对比',
    perfDesc: '两种方法在生产环境中都能产生高度优化的输出，但通过不同的机制：',
    perfTailwind: 'Tailwind 在构建时扫描源文件，只生成你实际使用的实用类的 CSS。典型的 Tailwind 项目产生 8-15KB 的 CSS（gzip 后）。因为实用类在组件间复用，随着应用规模增长，总 CSS 大小增长非常缓慢。',
    perfModules: 'CSS Modules 的输出取决于你写了多少 CSS。每个组件都有自己的 CSS 块，所以总 CSS 大小与组件数量呈线性增长。但现代打包工具（如 Vite 和 webpack）会执行 CSS tree-shaking 和去重。对大多数应用来说，CSS Modules 产生的包略大于 Tailwind，但差异很少大到影响用户体验。',

    maintTitle: '大规模可维护性',
    maintDesc: '每种方法在拥有众多贡献者的大型代码库中表现如何？',
    maintTailwind: 'Tailwind 在大型团队中表现出色，因为它通过配置强制执行设计系统。所有间距、颜色、字体大小和断点都来自一个集中的配置文件。开发者不容易引入一次性值，保持了 UI 的一致性。缺点是组件模板可能变得冗长，尤其是带深色模式的复杂响应式布局。',
    maintModules: 'CSS Modules 提供强隔离性，防止大型代码库中的样式冲突。每个组件都是一个独立单元，保证样式不会泄漏。但 CSS Modules 默认不强制设计系统。没有纪律性，开发者可能引入不一致的间距、颜色和大小。',

    responsiveTitle: '响应式设计',
    responsiveDesc: '两种方法都能很好地处理响应式设计，但人体工程学不同：',
    responsiveCode: `/* Tailwind — 内联响应式 */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                gap-4 md:gap-6 lg:gap-8">
  ...
</div>

/* CSS Modules — 样式表中的响应式 */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
}`,

    darkModeTitle: '深色模式实现',
    darkModeDesc: '深色模式是常见需求，两种方法的处理方式不同：',
    darkModeCode: `/* Tailwind — 使用 dark: 前缀 */
<div className="bg-white dark:bg-gray-900
                text-gray-900 dark:text-gray-100">
  ...
</div>

/* CSS Modules — 使用 CSS 自定义属性 */
:root { --bg-primary: #ffffff; --text-primary: #111827; }
[data-theme="dark"] { --bg-primary: #111827; --text-primary: #f9fafb; }

.container { background: var(--bg-primary); color: var(--text-primary); }`,

    whenTailwindTitle: '何时选择 Tailwind CSS',
    wt1: '快速原型开发和 MVP，开发速度是首要优先级。',
    wt2: '希望从第一天起就有内置设计系统（一致的间距、颜色和排版）的团队。',
    wt3: '设计师和开发者紧密合作且使用相同设计令牌的项目。',
    wt4: '组件密集型应用（React、Vue、Svelte），其中样式自然与标记共置。',
    wt5: '希望最小化 CSS 文件管理并完全避免命名约定的团队。',
    wt6: '具有大量响应式和深色模式需求的项目，Tailwind 的修饰符（md:、dark:、hover:）能减少样板代码。',

    whenModulesTitle: '何时选择 CSS Modules',
    wm1: '拥有强 CSS 专业知识、偏好使用完整 CSS 能力编写传统样式表的团队。',
    wm2: '需要复杂 CSS 特性（如动画、伪元素、容器查询和 CSS 网格布局）的项目，这些特性受益于专门的样式表文件。',
    wm3: '样式隔离至关重要的大型代码库，你需要保证样式不泄漏且无运行时开销。',
    wm4: '从遗留 CSS 代码库逐步迁移，因为 CSS Modules 允许与现有全局样式并存地渐进采用。',
    wm5: '优先考虑干净、可读的 JSX 模板而非共置样式的应用。',
    wm6: '使用服务端渲染（SSR）的项目，偏好零 JavaScript CSS 方案以提高性能。',

    hybridTitle: '混合方案',
    hybridDesc: '许多成功的团队在同一项目中同时使用 Tailwind 和 CSS Modules。Tailwind 处理布局、间距和实用样式，而 CSS Modules 处理复杂的组件特定样式（如动画和复杂的悬停效果）。',
    hybridCode: `// 混合方案：Tailwind 做布局 + CSS Module 做复杂样式
import styles from './AnimatedCard.module.css';

function AnimatedCard({ front, back }) {
  return (
    <div className={\`\${styles.card} w-64 h-80\`}>
      <div className={styles.inner}>
        <div className={\`\${styles.front} rounded-xl bg-white
                         shadow-lg p-6\`}>
          {front}
        </div>
        <div className={\`\${styles.back} rounded-xl bg-blue-600
                         text-white p-6\`}>
          {back}
        </div>
      </div>
    </div>
  );
}`,

    bestPracticesTitle: '最佳实践',
    bp1: 'Tailwind：将重复的类模式提取到可复用的 React 组件中，而非 @apply 指令。在组件框架中，组件本身就是抽象层。',
    bp2: 'Tailwind：使用 Prettier 插件（prettier-plugin-tailwindcss）自动按一致顺序排序类名，使类字符串更易阅读和审查。',
    bp3: 'CSS Modules：使用 CSS 自定义属性（设计令牌）来定义颜色、间距和排版，在没有框架的情况下保持组件间的一致性。',
    bp4: 'CSS Modules：使用 composes 关键字在模块之间共享通用样式，避免重复同时保持作用域。',
    bp5: '两者：设置代码检查。Tailwind 用 eslint-plugin-tailwindcss，CSS Modules 用 stylelint，尽早发现错误并强制执行规范。',
    bp6: '两者：测量生产环境的 CSS 包大小。使用 Lighthouse 或 webpack-bundle-analyzer 等工具确保你的 CSS 策略不会产生不必要的大负载。',

    faq1q: '可以同时使用 Tailwind CSS 和 CSS Modules 吗？',
    faq1a: '可以，它们在同一项目中配合良好。Next.js 和 Vite 开箱即用地支持两者。常见模式是使用 Tailwind 处理布局和间距实用类，使用 CSS Modules 处理复杂的组件样式（如动画、伪元素或复杂的悬停效果）。导入 CSS Module 并在 className 中将其类与 Tailwind 实用类组合使用。',
    faq2q: 'Tailwind CSS 的包体积比 CSS Modules 大吗？',
    faq2a: '通常恰恰相反。Tailwind 扫描代码只生成实际使用的实用类的 CSS。典型项目产生 8-15KB CSS（gzip 后）。CSS Modules 的输出随组件数量和唯一样式线性增长。对于大型应用，Tailwind 通常产生更小的 CSS 包，因为实用类在组件间共享。',
    faq3q: 'Tailwind CSS 比 CSS Modules 更难维护吗？',
    faq3a: '取决于你的方法。长 Tailwind 类字符串可能降低可读性，但通过将其提取到 React 组件中可以缓解。CSS Modules 初始可读性更好，但需要纪律来保持一致性。两种方法在有适当规范和工具的情况下都可以大规模维护。',
    faq4q: 'Tailwind CSS 能与 Next.js 的服务端组件配合使用吗？',
    faq4a: '可以。Tailwind CSS 纯粹是编译时的，生成静态 CSS。它与 React Server Components 完美配合，因为不添加任何客户端 JavaScript。CSS Modules 出于同样原因也能与服务端组件无缝配合。',
    faq5q: '使用 Tailwind 之前需要先学 CSS 吗？',
    faq5a: '是的，即使使用 Tailwind，理解 CSS 基础也至关重要。Tailwind 实用类直接映射到 CSS 属性（flex 映射到 display: flex，p-4 映射到 padding: 1rem）。不理解底层 CSS，你将难以调试布局问题、理解响应式断点或构建复杂布局。先学 CSS，然后将 Tailwind 作为在此知识之上的生产力工具。',

    tryTools: '试试我们相关的开发者工具',
  },
};

export default function TailwindVsCssModules({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* Tailwind */}
      <h2 style={h2Style}>{ct.tailwindTitle}</h2>
      <p style={pStyle}>{ct.tailwindDesc1}</p>
      <p style={pStyle}>{ct.tailwindDesc2}</p>
      <pre style={codeStyle}><code>{ct.tailwindCode}</code></pre>

      {/* CSS Modules */}
      <h2 style={h2Style}>{ct.cssModulesTitle}</h2>
      <p style={pStyle}>{ct.cssModulesDesc1}</p>
      <p style={pStyle}>{ct.cssModulesDesc2}</p>
      <pre style={codeStyle}><code>{ct.cssModulesCode}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={pStyle}>{ct.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Dimension</th>
              <th style={thStyle}>Tailwind CSS</th>
              <th style={thStyle}>CSS Modules</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Styling Paradigm', 'Utility-first, inline in JSX', 'Component-scoped, separate files'],
              ['Learning Curve', 'Learn utility names (1-2 weeks)', 'Standard CSS (minimal if you know CSS)'],
              ['Bundle Size', '8-15KB gzipped (tree-shaken)', 'Grows linearly with components'],
              ['Scoping', 'Global utilities, no conflicts by design', 'Automatic local hashing'],
              ['Design System', 'Built-in via config', 'Manual via CSS custom properties'],
              ['Dark Mode', 'dark: prefix modifier', 'CSS custom properties + data attributes'],
              ['Responsive', 'md:, lg: prefix modifiers', 'Standard @media queries'],
              ['IDE Support', 'Excellent (IntelliSense extension)', 'Good (standard CSS tooling)'],
              ['SSR Compatible', 'Yes (static CSS)', 'Yes (static CSS)'],
              ['Migration Effort', 'High (rewrite all styles)', 'Low (rename .css to .module.css)'],
            ].map(([dim, tailwind, modules], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{dim}</td>
                <td style={tdStyle}>{tailwind}</td>
                <td style={tdStyle}>{modules}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Developer Experience */}
      <h2 style={h2Style}>{ct.dxTitle}</h2>
      <p style={pStyle}>{ct.dxDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4' }}>
          <strong style={{ color: '#06b6d4' }}>{ct.dxTailwind}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.dxTailwindDesc}</p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>{ct.dxModules}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.dxModulesDesc}</p>
        </div>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.perfTitle}</h2>
      <p style={pStyle}>{ct.perfDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ color: '#06b6d4' }}>Tailwind CSS: </strong>{ct.perfTailwind}
        </div>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ color: '#8b5cf6' }}>CSS Modules: </strong>{ct.perfModules}
        </div>
      </div>

      {/* Maintainability */}
      <h2 style={h2Style}>{ct.maintTitle}</h2>
      <p style={pStyle}>{ct.maintDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ color: '#06b6d4' }}>Tailwind: </strong>{ct.maintTailwind}
        </div>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ color: '#8b5cf6' }}>CSS Modules: </strong>{ct.maintModules}
        </div>
      </div>

      {/* Responsive */}
      <h2 style={h2Style}>{ct.responsiveTitle}</h2>
      <p style={pStyle}>{ct.responsiveDesc}</p>
      <pre style={codeStyle}><code>{ct.responsiveCode}</code></pre>

      {/* Dark Mode */}
      <h2 style={h2Style}>{ct.darkModeTitle}</h2>
      <p style={pStyle}>{ct.darkModeDesc}</p>
      <pre style={codeStyle}><code>{ct.darkModeCode}</code></pre>

      {/* When Tailwind */}
      <h2 style={h2Style}>{ct.whenTailwindTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.wt1}</li><li>{ct.wt2}</li><li>{ct.wt3}</li><li>{ct.wt4}</li><li>{ct.wt5}</li><li>{ct.wt6}</li>
      </ul>

      {/* When CSS Modules */}
      <h2 style={h2Style}>{ct.whenModulesTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.wm1}</li><li>{ct.wm2}</li><li>{ct.wm3}</li><li>{ct.wm4}</li><li>{ct.wm5}</li><li>{ct.wm6}</li>
      </ul>

      {/* Hybrid */}
      <h2 style={h2Style}>{ct.hybridTitle}</h2>
      <p style={pStyle}>{ct.hybridDesc}</p>
      <pre style={codeStyle}><code>{ct.hybridCode}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{ct.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.bp1}</li><li>{ct.bp2}</li><li>{ct.bp3}</li><li>{ct.bp4}</li><li>{ct.bp5}</li><li>{ct.bp6}</li>
      </ul>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
