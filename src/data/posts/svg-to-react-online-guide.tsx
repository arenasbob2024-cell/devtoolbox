'use client';
import Link from 'next/link';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'Converting SVG to React components involves transforming HTML attributes to JSX (class to className, stroke-width to strokeWidth), removing unnecessary metadata, and wrapping the SVG in a reusable component with typed props. Tools like SVGR automate this process. Optimize SVGs with SVGO first to reduce file size by 20-60%. For accessibility, add aria-label or aria-hidden depending on whether the icon is decorative or meaningful. Use our free SVG to JSX converter for instant, production-ready React components.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'JSX requires camelCase SVG attributes: stroke-width becomes strokeWidth, fill-rule becomes fillRule, clip-path becomes clipPath.',
    takeaway2: 'SVGR is the industry-standard tool for converting SVG files into React components, used by Create React App and Next.js.',
    takeaway3: 'Always run SVGO before converting to React. It removes editor metadata and can reduce SVG file size by 20-60%.',
    takeaway4: 'Inline SVG components offer full control over styling, animation, and accessibility compared to img tags or CSS backgrounds.',
    takeaway5: 'For icon libraries with 50+ icons, consider SVG sprites or tree-shakable icon packages to minimize bundle size.',
    takeaway6: 'Decorative icons need aria-hidden="true"; meaningful standalone icons need role="img" and aria-label.',
    link_tool: 'Try our free SVG to JSX/React converter',

    h2_why: '1. Why Convert SVG to React Components?',
    why_p1: 'SVG (Scalable Vector Graphics) is the dominant format for icons, logos, and illustrations in modern web applications. Unlike raster images (PNG, JPEG, WebP), SVGs are <strong>resolution-independent</strong>, <strong>style-able with CSS</strong>, and <strong>animatable</strong>. But using SVG in React is not as simple as copying the markup.',
    why_p2: 'There are three ways to use SVG in React: <code>&lt;img src="icon.svg"&gt;</code>, CSS background images, and <strong>inline SVG as JSX</strong>. Inline SVG is the most powerful because it gives you:',
    why_li1: '<strong>Full CSS control</strong>: Style individual paths, groups, and elements with CSS classes or inline styles',
    why_li2: '<strong>Dynamic props</strong>: Change colors, sizes, and stroke widths via React props at runtime',
    why_li3: '<strong>Animation</strong>: Animate specific parts of the SVG using CSS transitions, Framer Motion, or GSAP',
    why_li4: '<strong>Accessibility</strong>: Add ARIA attributes, titles, and descriptions directly to SVG elements',
    why_li5: '<strong>Event handling</strong>: Attach onClick, onHover, and other event handlers to SVG elements',
    why_p3: 'The trade-off is that inline SVG becomes part of your JavaScript bundle. For small icons (under 2KB each), this is negligible. For large, complex illustrations, consider using <code>&lt;img&gt;</code> tags with external SVG files that can be cached separately by the browser.',

    h2_attributes: '2. SVG Attribute Differences in JSX',
    attr_p1: 'The biggest friction when moving SVG into React is <strong>attribute name conversion</strong>. SVG uses kebab-case attributes (as defined in the SVG spec), but JSX requires camelCase because it maps to JavaScript DOM properties. Here is the complete list of attributes you need to convert:',
    attr_table_svg: 'SVG / HTML Attribute',
    attr_table_jsx: 'JSX Equivalent',
    attr_p2: 'Beyond attribute names, there are a few other syntax changes required:',
    attr_li1: '<code>style="fill:red;stroke:blue"</code> must become <code>style={{ fill: "red", stroke: "blue" }}</code> (object syntax)',
    attr_li2: 'Self-closing tags like <code>&lt;path&gt;</code> must use <code>&lt;path /&gt;</code> in JSX',
    attr_li3: '<code>xmlns="http://www.w3.org/2000/svg"</code> is optional in JSX (React adds it automatically)',
    attr_li4: 'Comments <code>&lt;!-- ... --&gt;</code> must use <code>{/* ... */}</code> syntax',
    attr_p3: 'Missing even one attribute conversion will trigger a React console warning like <code>Warning: Invalid DOM property</code> and may cause rendering issues.',

    h2_manual: '3. Converting SVG Manually vs. Automated Tools',
    manual_p1: 'For a single icon, manual conversion is straightforward: rename the attributes, remove unnecessary metadata, and wrap in a component. Here is the step-by-step process:',
    manual_step1: '<strong>Step 1: Copy the SVG markup</strong> from your design tool (Figma, Sketch, Illustrator) or SVG file.',
    manual_step2: '<strong>Step 2: Remove unnecessary attributes</strong> like xmlns, xml:space, editor-specific data attributes, and comments.',
    manual_step3: '<strong>Step 3: Rename kebab-case attributes</strong> to camelCase (see the table above).',
    manual_step4: '<strong>Step 4: Convert inline styles</strong> from strings to JavaScript objects.',
    manual_step5: '<strong>Step 5: Wrap in a React component</strong> with TypeScript props for size, color, and pass-through SVG attributes.',
    manual_p2: 'This works fine for 1-5 icons, but becomes tedious and error-prone for larger sets. Automated tools like <strong>SVGR</strong> handle all these transformations plus optimization in a single step.',
    manual_p3: 'Here is what a manual conversion looks like:',

    h2_svgr: '4. SVGR: The Industry-Standard SVG-to-React Transformer',
    svgr_p1: '<strong>SVGR</strong> is the de-facto standard tool for converting SVG files into React components. It is used internally by Create React App, Next.js, Vite (via plugins), and most major React toolchains. SVGR handles:',
    svgr_li1: 'Attribute conversion (kebab-case to camelCase)',
    svgr_li2: 'Style string to object conversion',
    svgr_li3: 'xmlns removal',
    svgr_li4: 'Title element injection for accessibility',
    svgr_li5: 'Ref forwarding for DOM access',
    svgr_li6: 'TypeScript type generation',
    svgr_li7: 'Integration with SVGO for optimization',
    svgr_p2: 'You can use SVGR in multiple ways:',
    svgr_h3_cli: 'CLI Usage',
    svgr_h3_webpack: 'Webpack / Next.js Integration',
    svgr_h3_vite: 'Vite Integration',
    svgr_p3: 'SVGR also supports custom templates, allowing you to define exactly how the output component should look. This is useful for enforcing consistent patterns across large icon libraries.',

    h2_svgo: '5. SVG Optimization with SVGO Before Converting',
    svgo_p1: '<strong>SVGO</strong> (SVG Optimizer) is a Node.js tool that optimizes SVG files by removing redundant information, collapsing groups, merging paths, and cleaning up metadata. Running SVGO before converting to React components can reduce SVG size by <strong>20-60%</strong>.',
    svgo_p2: 'What SVGO removes and optimizes:',
    svgo_li1: '<strong>Editor metadata</strong>: Inkscape, Illustrator, and Sketch data attributes, comments, and processing instructions',
    svgo_li2: '<strong>Redundant attributes</strong>: Default values that browsers apply automatically (fill="black", stroke="none")',
    svgo_li3: '<strong>Empty elements</strong>: Groups, defs, and containers with no visible content',
    svgo_li4: '<strong>Precision</strong>: Reduces coordinate precision from 15 decimal places to 2-3 without visible quality loss',
    svgo_li5: '<strong>Path optimization</strong>: Merges adjacent path segments and simplifies curves',
    svgo_li6: '<strong>ID cleanup</strong>: Removes or minifies auto-generated IDs that cause conflicts when multiple SVGs are inlined',
    svgo_p3: 'SVGO is built into SVGR, so if you use SVGR, you get optimization for free. You can also use SVGO standalone:',

    h2_reusable: '6. Creating Reusable SVG Icon Components with Props',
    reusable_p1: 'A well-designed SVG icon component should be flexible enough to use anywhere in your application. The key principles are:',
    reusable_li1: '<strong>Accept size prop</strong>: A single number that sets both width and height (icons are typically square)',
    reusable_li2: '<strong>Accept color prop</strong>: Default to currentColor so the icon inherits the parent text color',
    reusable_li3: '<strong>Spread remaining props</strong>: Use <code>...rest</code> to forward className, onClick, aria-label, data attributes, etc.',
    reusable_li4: '<strong>Use TypeScript</strong>: Extend <code>React.SVGProps&lt;SVGSVGElement&gt;</code> for full type safety',
    reusable_li5: '<strong>Forward refs</strong>: Use <code>React.forwardRef</code> when consumers need DOM access for animations or measurements',
    reusable_p2: 'Here is a production-ready icon component pattern:',
    reusable_p3: 'Usage examples:',

    h2_sprites: '7. SVG Sprites vs. Inline SVG vs. img Tags',
    sprites_p1: 'There are three main strategies for using SVG in React applications. Each has distinct trade-offs:',
    sprites_h3_inline: 'Inline SVG Components (Recommended for most apps)',
    sprites_inline_p: 'Each icon is a separate React component with the SVG markup inlined. This is the approach we have been discussing throughout this guide.',
    sprites_inline_pros: '<strong>Pros:</strong> Full styling control, dynamic props, animation support, tree-shakable, great DX',
    sprites_inline_cons: '<strong>Cons:</strong> Adds to JS bundle size, cannot be cached separately from JS',
    sprites_h3_sprite: 'SVG Sprite with symbol and use',
    sprites_sprite_p: 'All icons are defined once in a single SVG sprite file using <code>&lt;symbol&gt;</code> elements. Individual icons reference them with <code>&lt;use href="#icon-name"&gt;</code>.',
    sprites_sprite_pros: '<strong>Pros:</strong> Icons defined once in the DOM, smaller JS bundle, browser caches the sprite',
    sprites_sprite_cons: '<strong>Cons:</strong> Limited styling (no per-instance path colors), more complex setup, no tree-shaking',
    sprites_h3_img: 'img Tag with External SVG Files',
    sprites_img_p: 'SVG files are loaded as static assets, just like PNG or JPEG images.',
    sprites_img_pros: '<strong>Pros:</strong> Cacheable, no JS bundle impact, good for large complex SVGs',
    sprites_img_cons: '<strong>Cons:</strong> No styling control, no animation, extra HTTP requests, no dynamic colors',
    sprites_p2: '<strong>Rule of thumb:</strong> Use inline SVG components for interactive, styled icons (most apps). Use sprites for large icon sets (100+ icons). Use img tags for complex illustrations and decorative images.',

    h2_accessibility: '8. Accessibility: aria-label, role="img", title Element',
    a11y_p1: 'SVG accessibility is often overlooked but is critical for screen reader users. The correct approach depends on the icon context:',
    a11y_h3_decorative: 'Decorative Icons (next to text labels)',
    a11y_decorative_p: 'When an icon appears alongside visible text (like a button with label text), the icon is decorative. Hide it from screen readers:',
    a11y_h3_meaningful: 'Meaningful Icons (standalone, no text)',
    a11y_meaningful_p: 'When an icon conveys meaning without accompanying text (like a standalone close button), it needs an accessible name:',
    a11y_h3_title: 'Using the title Element',
    a11y_title_p: 'The SVG <code>&lt;title&gt;</code> element provides a text description that some screen readers announce. Link it with <code>aria-labelledby</code> for reliable support:',
    a11y_p2: 'A reusable pattern that handles all three cases:',

    h2_animation: '9. SVG Animation in React (CSS, Framer Motion, GSAP)',
    anim_p1: 'One of the biggest advantages of inline SVG is the ability to animate individual elements. Here are the three most common approaches:',
    anim_h3_css: 'CSS Animations',
    anim_css_p: 'The simplest approach. Use CSS keyframes or transitions to animate SVG attributes like opacity, transform, stroke-dashoffset, and fill:',
    anim_h3_framer: 'Framer Motion',
    anim_framer_p: '<strong>Framer Motion</strong> provides the best React-specific SVG animation experience with declarative motion components. It supports path morphing, stagger effects, and spring physics:',
    anim_h3_gsap: 'GSAP (GreenSock)',
    anim_gsap_p: '<strong>GSAP</strong> is the most powerful option for complex, timeline-based SVG animations. It handles SVG transforms consistently across browsers and provides fine-grained control:',
    anim_p2: '<strong>Choose CSS</strong> for simple hover effects and loading spinners. <strong>Choose Framer Motion</strong> for React-idiomatic animations with gestures. <strong>Choose GSAP</strong> for complex, sequenced animations and SVG morphing.',

    h2_performance: '10. Performance: SVG vs. PNG vs. WebP for Icons',
    perf_p1: 'Choosing the right format for icons impacts both performance and visual quality:',
    perf_table_format: 'Format',
    perf_table_size: 'Typical Icon Size',
    perf_table_scalable: 'Scalable',
    perf_table_stylable: 'CSS Stylable',
    perf_table_animate: 'Animatable',
    perf_table_best_for: 'Best For',
    perf_p2: 'For <strong>icons and simple graphics</strong>, SVG is almost always the best choice. A typical icon is 200-800 bytes as optimized SVG, compared to 1-5KB as PNG at multiple resolutions. SVGs also look crisp on any screen density without serving multiple sizes.',
    perf_p3: 'Performance tips for SVG in React:',
    perf_li1: '<strong>Optimize with SVGO</strong>: Remove unnecessary metadata before converting to components',
    perf_li2: '<strong>Lazy load complex SVGs</strong>: Use React.lazy() or dynamic imports for illustrations over 5KB',
    perf_li3: '<strong>Avoid inline SVG for large graphics</strong>: Maps, detailed illustrations, and complex charts should use img tags',
    perf_li4: '<strong>Use currentColor</strong>: Avoids duplicate SVGs with different color variants',
    perf_li5: '<strong>Minimize path complexity</strong>: Simpler paths render faster and produce smaller files',

    h2_treeshaking: '11. Tree-Shaking SVG Icon Libraries',
    tree_p1: 'When using icon libraries in React (Lucide, Heroicons, Phosphor, React Icons), <strong>tree-shaking</strong> ensures only the icons you actually import are included in your production bundle. This is critical because icon libraries can contain thousands of icons totaling several megabytes.',
    tree_p2: 'To enable effective tree-shaking, use named imports from specific module paths:',
    tree_p3: 'Here is how popular React icon libraries compare for tree-shaking:',
    tree_table_library: 'Library',
    tree_table_icons: 'Total Icons',
    tree_table_treeshake: 'Tree-Shakable',
    tree_table_pericon: 'Per-Icon Size',
    tree_p4: 'If your app uses only 10-20 icons from a large library, the difference between tree-shaking and importing the entire library can be <strong>50KB vs. 2MB+</strong> in your production bundle.',
    tree_p5: '<strong>Tip:</strong> Some bundlers (especially older webpack configs) do not tree-shake properly when you use barrel imports like <code>import { Heart } from "react-icons"</code>. Always import from the specific sub-package: <code>import { FaHeart } from "react-icons/fa"</code>.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the easiest way to convert SVG to a React component?',
    faq1_a: 'The easiest way is to use an online SVG to JSX converter tool. Paste your SVG code and get a clean React component instantly. For batch conversion of multiple SVG files, use the SVGR CLI: npx @svgr/cli --out-dir src/icons src/svg/',
    faq2_q: 'Should I use inline SVG or an SVG sprite system in React?',
    faq2_a: 'For most React applications with fewer than 50 icons, inline SVG components are simpler and more flexible. Each icon is a tree-shakable component with full styling and animation control. For large icon sets (100+ icons), consider an SVG sprite to reduce JavaScript bundle size. Both approaches work well with React.',
    faq3_q: 'Does inline SVG increase my JavaScript bundle size significantly?',
    faq3_a: 'For typical icons (200-800 bytes each), the impact is minimal. 20 optimized inline SVG icons add roughly 8-15KB to your bundle before gzip compression. For large complex SVGs (maps, illustrations), use img tags or dynamic imports with React.lazy() to avoid bloating the initial bundle.',
    faq4_q: 'What is the difference between SVGR and SVGO?',
    faq4_a: 'SVGO (SVG Optimizer) is a standalone tool that optimizes SVG files by removing metadata, simplifying paths, and reducing file size. SVGR (SVG to React) is a tool that converts SVG files into React components, handling attribute conversion, TypeScript types, and component wrapping. SVGR uses SVGO internally for optimization. You can use SVGO alone for optimization, but SVGR gives you both optimization and React component generation.',
    faq5_q: 'How do I make SVG icons accessible in React?',
    faq5_a: 'For decorative icons (next to text labels), add aria-hidden="true" and focusable="false" to hide them from screen readers. For meaningful icons (standalone, conveying information), add role="img" and aria-label="description". For icons inside buttons, the button should have the aria-label while the SVG gets aria-hidden="true".',
    faq6_q: 'Can I animate SVG in React? What library should I use?',
    faq6_a: 'Yes, inline SVG in React gives you full access to animate individual paths and elements. Use CSS animations for simple effects (hover, loading spinners). Use Framer Motion for React-idiomatic animations with gesture support. Use GSAP for complex timeline-based animations and SVG morphing. All three approaches work with inline SVG components.',
    faq7_q: 'Why does React show warnings when I paste SVG code?',
    faq7_a: 'React shows "Invalid DOM property" warnings because SVG attributes use kebab-case (stroke-width, fill-rule, clip-path) while JSX requires camelCase (strokeWidth, fillRule, clipPath). You also need to change class to className and for to htmlFor. Use an SVG to JSX converter tool to handle all these transformations automatically.',
    faq8_q: 'How do I use SVGR with Next.js or Vite?',
    faq8_a: 'For Next.js, install @svgr/webpack and add a webpack rule in next.config.js to handle .svg file imports as React components. For Vite, install vite-plugin-svgr and add it to your vite.config.ts plugins array. Both allow you to import SVG files directly as React components: import Logo from "./logo.svg".',
  },
  zh: {
    tldr_title: 'TL;DR',
    tldr: 'SVG 转 React 组件需要将 HTML 属性转换为 JSX (class 变 className, stroke-width 变 strokeWidth), 删除多余元数据, 并包装成带类型 props 的可复用组件. SVGR 等工具可自动完成此过程. 先用 SVGO 优化 SVG 可减小 20-60% 文件大小. 为确保无障碍访问, 根据图标是装饰性还是有意义的来添加 aria-label 或 aria-hidden. 使用我们的免费 SVG 转 JSX 工具即时获取可用于生产的 React 组件.',
    takeaways_title: '核心要点',
    takeaway1: 'JSX 要求驼峰命名的 SVG 属性: stroke-width 变为 strokeWidth, fill-rule 变为 fillRule, clip-path 变为 clipPath.',
    takeaway2: 'SVGR 是将 SVG 文件转换为 React 组件的行业标准工具, Create React App 和 Next.js 都在使用.',
    takeaway3: '在转换为 React 之前务必运行 SVGO. 它可以移除编辑器元数据并将 SVG 文件大小减少 20-60%.',
    takeaway4: '与 img 标签或 CSS 背景相比, 内联 SVG 组件提供对样式, 动画和无障碍的完全控制.',
    takeaway5: '对于 50+ 图标的图标库, 请考虑使用 SVG sprites 或可 tree-shaking 的图标包以最小化包体积.',
    takeaway6: '装饰性图标需要 aria-hidden="true"; 有意义的独立图标需要 role="img" 和 aria-label.',
    link_tool: '使用我们的免费 SVG 转 JSX/React 工具',

    h2_why: '1. 为什么要将 SVG 转换为 React 组件?',
    why_p1: 'SVG (可缩放矢量图形) 是现代 Web 应用中图标, 标志和插图的主流格式. 与光栅图像 (PNG, JPEG, WebP) 不同, SVG <strong>不受分辨率限制</strong>, <strong>可通过 CSS 设置样式</strong>, 且<strong>可动画化</strong>. 但在 React 中使用 SVG 并不像复制粘贴那么简单.',
    why_p2: '在 React 中使用 SVG 有三种方式: <code>&lt;img src="icon.svg"&gt;</code>, CSS 背景图, 以及<strong>内联 SVG 作为 JSX</strong>. 内联 SVG 是最强大的方式, 因为它提供:',
    why_li1: '<strong>完全的 CSS 控制</strong>: 使用 CSS 类或内联样式为单个路径, 组和元素设置样式',
    why_li2: '<strong>动态 props</strong>: 在运行时通过 React props 更改颜色, 大小和描边宽度',
    why_li3: '<strong>动画</strong>: 使用 CSS transitions, Framer Motion 或 GSAP 为 SVG 的特定部分添加动画',
    why_li4: '<strong>无障碍</strong>: 直接向 SVG 元素添加 ARIA 属性, 标题和描述',
    why_li5: '<strong>事件处理</strong>: 向 SVG 元素附加 onClick, onHover 和其他事件处理程序',
    why_p3: '权衡是内联 SVG 会成为 JavaScript 包的一部分. 对于小图标 (每个 2KB 以下), 影响可以忽略. 对于大型复杂插图, 考虑使用 <code>&lt;img&gt;</code> 标签加载外部 SVG 文件.',

    h2_attributes: '2. JSX 中的 SVG 属性差异',
    attr_p1: '将 SVG 移入 React 时最大的障碍是<strong>属性名称转换</strong>. SVG 使用短横线命名 (kebab-case), 但 JSX 要求驼峰命名 (camelCase). 以下是需要转换的完整属性列表:',
    attr_table_svg: 'SVG / HTML 属性',
    attr_table_jsx: 'JSX 等效属性',
    attr_p2: '除了属性名称, 还有其他语法变更:',
    attr_li1: '<code>style="fill:red;stroke:blue"</code> 必须变为 <code>style={{ fill: "red", stroke: "blue" }}</code> (对象语法)',
    attr_li2: '自闭合标签如 <code>&lt;path&gt;</code> 必须使用 <code>&lt;path /&gt;</code>',
    attr_li3: '<code>xmlns="http://www.w3.org/2000/svg"</code> 在 JSX 中是可选的 (React 会自动添加)',
    attr_li4: '注释 <code>&lt;!-- ... --&gt;</code> 必须使用 <code>{/* ... */}</code> 语法',
    attr_p3: '哪怕遗漏一个属性转换, 都会触发 React 控制台警告, 并可能导致渲染问题.',

    h2_manual: '3. 手动转换 vs. 自动化工具',
    manual_p1: '对于单个图标, 手动转换很简单: 重命名属性, 删除不必要的元数据, 然后包装成组件. 步骤如下:',
    manual_step1: '<strong>第 1 步: 复制 SVG 标记</strong>: 从设计工具 (Figma, Sketch, Illustrator) 或 SVG 文件中复制.',
    manual_step2: '<strong>第 2 步: 删除不必要的属性</strong>: 如 xmlns, xml:space, 编辑器特定的 data 属性和注释.',
    manual_step3: '<strong>第 3 步: 将短横线属性重命名</strong>为驼峰命名 (参见上表).',
    manual_step4: '<strong>第 4 步: 转换内联样式</strong>: 从字符串转换为 JavaScript 对象.',
    manual_step5: '<strong>第 5 步: 包装为 React 组件</strong>: 添加 TypeScript props (size, color) 和 SVG 属性透传.',
    manual_p2: '这对 1-5 个图标有效, 但对于更大的集合来说既繁琐又容易出错. <strong>SVGR</strong> 等自动化工具可以在一步中处理所有转换和优化.',
    manual_p3: '手动转换示例:',

    h2_svgr: '4. SVGR: 行业标准的 SVG 转 React 工具',
    svgr_p1: '<strong>SVGR</strong> 是将 SVG 文件转换为 React 组件的事实标准工具. Create React App, Next.js, Vite (通过插件) 和大多数主流 React 工具链都在内部使用它. SVGR 处理:',
    svgr_li1: '属性转换 (短横线到驼峰命名)',
    svgr_li2: 'style 字符串到对象的转换',
    svgr_li3: 'xmlns 移除',
    svgr_li4: 'title 元素注入以提高无障碍性',
    svgr_li5: 'ref 转发以便 DOM 访问',
    svgr_li6: 'TypeScript 类型生成',
    svgr_li7: '集成 SVGO 进行优化',
    svgr_p2: '你可以通过多种方式使用 SVGR:',
    svgr_h3_cli: 'CLI 用法',
    svgr_h3_webpack: 'Webpack / Next.js 集成',
    svgr_h3_vite: 'Vite 集成',
    svgr_p3: 'SVGR 还支持自定义模板, 允许你精确定义输出组件的样式. 这对在大型图标库中实施一致的模式非常有用.',

    h2_svgo: '5. 转换前使用 SVGO 优化 SVG',
    svgo_p1: '<strong>SVGO</strong> (SVG 优化器) 是一个 Node.js 工具, 通过移除冗余信息, 折叠组, 合并路径和清理元数据来优化 SVG 文件. 在转换为 React 组件之前运行 SVGO 可将 SVG 大小减少 <strong>20-60%</strong>.',
    svgo_p2: 'SVGO 移除和优化的内容:',
    svgo_li1: '<strong>编辑器元数据</strong>: Inkscape, Illustrator 和 Sketch 的 data 属性, 注释和处理指令',
    svgo_li2: '<strong>冗余属性</strong>: 浏览器自动应用的默认值 (fill="black", stroke="none")',
    svgo_li3: '<strong>空元素</strong>: 无可见内容的组, defs 和容器',
    svgo_li4: '<strong>精度</strong>: 将坐标精度从 15 位小数减少到 2-3 位, 不会造成可见质量损失',
    svgo_li5: '<strong>路径优化</strong>: 合并相邻路径段并简化曲线',
    svgo_li6: '<strong>ID 清理</strong>: 移除或缩短自动生成的 ID, 避免多个内联 SVG 时的冲突',
    svgo_p3: 'SVGO 内置于 SVGR 中, 所以使用 SVGR 即可免费获得优化. 你也可以单独使用 SVGO:',

    h2_reusable: '6. 创建带 Props 的可复用 SVG 图标组件',
    reusable_p1: '设计良好的 SVG 图标组件应足够灵活以在应用中的任何地方使用. 关键原则:',
    reusable_li1: '<strong>接受 size prop</strong>: 一个数字同时设置宽度和高度 (图标通常是正方形的)',
    reusable_li2: '<strong>接受 color prop</strong>: 默认为 currentColor 以继承父级文字颜色',
    reusable_li3: '<strong>展开剩余 props</strong>: 使用 <code>...rest</code> 转发 className, onClick, aria-label, data 属性等',
    reusable_li4: '<strong>使用 TypeScript</strong>: 扩展 <code>React.SVGProps&lt;SVGSVGElement&gt;</code> 获得完整类型安全',
    reusable_li5: '<strong>转发 refs</strong>: 当使用者需要 DOM 访问来做动画或测量时使用 <code>React.forwardRef</code>',
    reusable_p2: '以下是生产可用的图标组件模式:',
    reusable_p3: '使用示例:',

    h2_sprites: '7. SVG Sprites vs. 内联 SVG vs. img 标签',
    sprites_p1: '在 React 应用中使用 SVG 有三种主要策略, 各有权衡:',
    sprites_h3_inline: '内联 SVG 组件 (大多数应用推荐)',
    sprites_inline_p: '每个图标是一个独立的 React 组件, SVG 标记内联其中.',
    sprites_inline_pros: '<strong>优点:</strong> 完全的样式控制, 动态 props, 动画支持, 可 tree-shake, 良好的开发体验',
    sprites_inline_cons: '<strong>缺点:</strong> 增加 JS 包体积, 无法与 JS 分开缓存',
    sprites_h3_sprite: 'SVG Sprite (symbol + use)',
    sprites_sprite_p: '所有图标使用 <code>&lt;symbol&gt;</code> 元素在一个 SVG sprite 文件中定义一次. 单个图标通过 <code>&lt;use href="#icon-name"&gt;</code> 引用.',
    sprites_sprite_pros: '<strong>优点:</strong> 图标在 DOM 中只定义一次, 更小的 JS 包, 浏览器缓存 sprite',
    sprites_sprite_cons: '<strong>缺点:</strong> 样式受限 (无法为每个实例设置不同路径颜色), 设置更复杂, 无 tree-shaking',
    sprites_h3_img: 'img 标签加载外部 SVG 文件',
    sprites_img_p: 'SVG 文件作为静态资源加载, 就像 PNG 或 JPEG 图片一样.',
    sprites_img_pros: '<strong>优点:</strong> 可缓存, 无 JS 包影响, 适合大型复杂 SVG',
    sprites_img_cons: '<strong>缺点:</strong> 无样式控制, 无动画, 额外 HTTP 请求, 无动态颜色',
    sprites_p2: '<strong>经验法则:</strong> 对交互式的带样式图标使用内联 SVG 组件. 对大型图标集 (100+ 图标) 使用 sprites. 对复杂插图和装饰图像使用 img 标签.',

    h2_accessibility: '8. 无障碍: aria-label, role="img", title 元素',
    a11y_p1: 'SVG 无障碍常被忽视, 但对屏幕阅读器用户至关重要. 正确方法取决于图标上下文:',
    a11y_h3_decorative: '装饰性图标 (在文字标签旁)',
    a11y_decorative_p: '当图标出现在可见文字旁边时, 图标是装饰性的. 对屏幕阅读器隐藏它:',
    a11y_h3_meaningful: '有意义的图标 (独立使用, 无文字)',
    a11y_meaningful_p: '当图标不带文字独立传达含义时, 它需要无障碍名称:',
    a11y_h3_title: '使用 title 元素',
    a11y_title_p: 'SVG <code>&lt;title&gt;</code> 元素提供某些屏幕阅读器会读出的文本描述. 使用 <code>aria-labelledby</code> 关联:',
    a11y_p2: '处理所有三种情况的可复用模式:',

    h2_animation: '9. React 中的 SVG 动画 (CSS, Framer Motion, GSAP)',
    anim_p1: '内联 SVG 的最大优势之一是能为单个元素添加动画. 以下是三种最常见的方法:',
    anim_h3_css: 'CSS 动画',
    anim_css_p: '最简单的方法. 使用 CSS 关键帧或过渡来动画化 SVG 属性 (opacity, transform, stroke-dashoffset, fill):',
    anim_h3_framer: 'Framer Motion',
    anim_framer_p: '<strong>Framer Motion</strong> 通过声明式 motion 组件提供最佳的 React SVG 动画体验. 支持路径变形, 交错效果和弹簧物理:',
    anim_h3_gsap: 'GSAP (GreenSock)',
    anim_gsap_p: '<strong>GSAP</strong> 是复杂时间线 SVG 动画的最强选择. 它在所有浏览器中一致处理 SVG 变换:',
    anim_p2: '<strong>选择 CSS</strong> 处理简单悬停和加载动画. <strong>选择 Framer Motion</strong> 处理 React 风格的手势动画. <strong>选择 GSAP</strong> 处理复杂的序列动画和 SVG 变形.',

    h2_performance: '10. 性能: SVG vs. PNG vs. WebP 图标对比',
    perf_p1: '选择正确的图标格式影响性能和视觉质量:',
    perf_table_format: '格式',
    perf_table_size: '典型图标大小',
    perf_table_scalable: '可缩放',
    perf_table_stylable: 'CSS 可样式化',
    perf_table_animate: '可动画',
    perf_table_best_for: '最适合',
    perf_p2: '对于<strong>图标和简单图形</strong>, SVG 几乎总是最佳选择. 优化后的典型图标 SVG 大小为 200-800 字节, 而 PNG 在多种分辨率下为 1-5KB.',
    perf_p3: 'React 中 SVG 的性能建议:',
    perf_li1: '<strong>用 SVGO 优化</strong>: 转换为组件前移除不必要的元数据',
    perf_li2: '<strong>懒加载复杂 SVG</strong>: 对 5KB 以上的插图使用 React.lazy() 或动态导入',
    perf_li3: '<strong>避免内联大型图形</strong>: 地图, 详细插图和复杂图表应使用 img 标签',
    perf_li4: '<strong>使用 currentColor</strong>: 避免不同颜色变体的重复 SVG',
    perf_li5: '<strong>简化路径复杂度</strong>: 更简单的路径渲染更快, 文件更小',

    h2_treeshaking: '11. Tree-Shaking SVG 图标库',
    tree_p1: '使用 React 图标库 (Lucide, Heroicons, Phosphor, React Icons) 时, <strong>tree-shaking</strong> 确保只有实际导入的图标包含在生产包中. 图标库可能包含数千个图标, 总计数 MB.',
    tree_p2: '要启用有效的 tree-shaking, 请从特定模块路径使用命名导入:',
    tree_p3: '流行 React 图标库的 tree-shaking 对比:',
    tree_table_library: '库名称',
    tree_table_icons: '图标总数',
    tree_table_treeshake: '可 Tree-Shake',
    tree_table_pericon: '单图标大小',
    tree_p4: '如果你的应用只使用大库中的 10-20 个图标, tree-shaking 与导入整个库的差异可达 <strong>50KB vs. 2MB+</strong>.',
    tree_p5: '<strong>提示:</strong> 某些打包器 (特别是旧的 webpack 配置) 在使用桶导入时无法正确 tree-shake. 始终从特定子包导入.',

    h2_faq: '常见问题',
    faq1_q: '将 SVG 转换为 React 组件最简单的方法是什么?',
    faq1_a: '最简单的方法是使用在线 SVG 转 JSX 工具. 粘贴 SVG 代码即可立即获得 React 组件. 对于批量转换多个 SVG 文件, 使用 SVGR CLI: npx @svgr/cli --out-dir src/icons src/svg/',
    faq2_q: '在 React 中应该使用内联 SVG 还是 SVG sprite 系统?',
    faq2_a: '对于少于 50 个图标的大多数 React 应用, 内联 SVG 组件更简单灵活. 对于大型图标集 (100+ 图标), 考虑使用 SVG sprite 减少 JS 包体积. 两种方法都能很好地配合 React.',
    faq3_q: '内联 SVG 会显著增加 JavaScript 包体积吗?',
    faq3_a: '对于典型图标 (每个 200-800 字节), 影响很小. 20 个优化后的内联 SVG 图标在 gzip 前约增加 8-15KB. 对于大型复杂 SVG, 使用 img 标签或 React.lazy() 动态导入.',
    faq4_q: 'SVGR 和 SVGO 有什么区别?',
    faq4_a: 'SVGO 是优化 SVG 文件的独立工具. SVGR 是将 SVG 文件转换为 React 组件的工具, 处理属性转换和 TypeScript 类型. SVGR 内部使用 SVGO 进行优化.',
    faq5_q: '如何在 React 中让 SVG 图标具有无障碍性?',
    faq5_a: '装饰性图标添加 aria-hidden="true" 和 focusable="false". 有意义的独立图标添加 role="img" 和 aria-label. 按钮内的图标, 按钮设置 aria-label, SVG 设置 aria-hidden="true".',
    faq6_q: '可以在 React 中为 SVG 添加动画吗? 应该使用什么库?',
    faq6_a: '可以. CSS 动画适合简单效果. Framer Motion 适合 React 风格的手势动画. GSAP 适合复杂的时间线动画和 SVG 变形.',
    faq7_q: '为什么粘贴 SVG 代码时 React 会显示警告?',
    faq7_a: 'React 显示警告是因为 SVG 属性使用短横线命名而 JSX 需要驼峰命名. 使用 SVG 转 JSX 工具可自动处理所有转换.',
    faq8_q: '如何在 Next.js 或 Vite 中使用 SVGR?',
    faq8_a: 'Next.js 安装 @svgr/webpack 并在 next.config.js 中添加 webpack 规则. Vite 安装 vite-plugin-svgr 并添加到 vite.config.ts 的 plugins 中.',
  },
};

export default function SvgToReactOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
      { '@type': 'Question', name: t.faq7_q, acceptedAnswer: { '@type': 'Answer', text: t.faq7_a } },
      { '@type': 'Question', name: t.faq8_q, acceptedAnswer: { '@type': 'Answer', text: t.faq8_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ display: 'block', marginBottom: 8, fontSize: 16 }}>{t.tldr_title}</strong>
        <p style={{ margin: 0, lineHeight: 1.7 }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', marginBottom: 32 }}>
        <strong style={{ display: 'block', marginBottom: 12, fontSize: 16 }}>{t.takeaways_title}</strong>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>{t.takeaway1}</li>
          <li>{t.takeaway2}</li>
          <li>{t.takeaway3}</li>
          <li>{t.takeaway4}</li>
          <li>{t.takeaway5}</li>
          <li>{t.takeaway6}</li>
        </ul>
      </div>

      <p>
        <Link href={`/${lang}/tools/svg-to-jsx`} style={{ fontWeight: 600, color: '#2563eb' }}>
          {t.link_tool} {'\u2192'}
        </Link>
      </p>

      {/* Section 1: Why Convert SVG to React */}
      <h2>{t.h2_why}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.why_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.why_p2 }} />
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.why_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.why_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.why_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.why_li4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.why_li5 }} />
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t.why_p3 }} />

      {/* Section 2: SVG Attribute Differences */}
      <h2>{t.h2_attributes}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.attr_p1 }} />
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>{t.attr_table_svg}</th>
            <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>{t.attr_table_jsx}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>class</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>className</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stroke-width</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>strokeWidth</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stroke-linecap</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>strokeLinecap</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stroke-linejoin</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>strokeLinejoin</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stroke-dasharray</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>strokeDasharray</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stroke-dashoffset</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>strokeDashoffset</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>fill-rule</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>fillRule</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>fill-opacity</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>fillOpacity</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>clip-path</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>clipPath</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>clip-rule</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>clipRule</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>font-size</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>fontSize</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>text-anchor</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>textAnchor</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>xlink:href</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>xlinkHref</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>xmlns:xlink</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>xmlnsXlink</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>color-interpolation</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>colorInterpolation</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>dominant-baseline</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>dominantBaseline</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stop-color</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stopColor</code></td></tr>
          <tr><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stop-opacity</code></td><td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}><code>stopOpacity</code></td></tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: t.attr_p2 }} />
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.attr_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.attr_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.attr_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.attr_li4 }} />
      </ul>
      <p>{t.attr_p3}</p>

      {/* Section 3: Manual vs Automated */}
      <h2>{t.h2_manual}</h2>
      <p>{t.manual_p1}</p>
      <ol>
        <li dangerouslySetInnerHTML={{ __html: t.manual_step1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.manual_step2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.manual_step3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.manual_step4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.manual_step5 }} />
      </ol>
      <p dangerouslySetInnerHTML={{ __html: t.manual_p2 }} />
      <p>{t.manual_p3}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// Before: Raw SVG from Figma
<svg xmlns="http://www.w3.org/2000/svg" class="icon"
  width="24" height="24" viewBox="0 0 24 24"
  fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round"
  stroke-linejoin="round">
  <path d="M20 6L9 17l-5-5"/>
</svg>

// After: React Component
interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

function CheckIcon({ size = 24, ...props }: CheckIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}`}</code></pre>

      {/* Section 4: SVGR */}
      <h2>{t.h2_svgr}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.svgr_p1 }} />
      <ul>
        <li>{t.svgr_li1}</li>
        <li>{t.svgr_li2}</li>
        <li>{t.svgr_li3}</li>
        <li>{t.svgr_li4}</li>
        <li>{t.svgr_li5}</li>
        <li>{t.svgr_li6}</li>
        <li>{t.svgr_li7}</li>
      </ul>
      <p>{t.svgr_p2}</p>

      <h3>{t.svgr_h3_cli}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`# Install SVGR CLI
npm install -D @svgr/cli

# Convert a single SVG file
npx @svgr/cli icon.svg

# Convert all SVGs in a directory to React components
npx @svgr/cli --out-dir src/components/icons src/assets/svg/

# With TypeScript support
npx @svgr/cli --typescript --out-dir src/icons src/svg/

# With SVGO optimization
npx @svgr/cli --svgo --out-dir src/icons src/svg/`}</code></pre>

      <h3>{t.svgr_h3_webpack}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// next.config.js
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

// Now you can import SVGs as React components:
import Logo from './logo.svg';

function Header() {
  return <Logo width={120} height={40} />;
}`}</code></pre>

      <h3>{t.svgr_h3_vite}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// vite.config.ts
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
});

// Import as React component
import { ReactComponent as Logo } from './logo.svg';
// Or with default export
import Logo from './logo.svg?react';`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.svgr_p3 }} />

      {/* Section 5: SVGO */}
      <h2>{t.h2_svgo}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.svgo_p1 }} />
      <p>{t.svgo_p2}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.svgo_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.svgo_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.svgo_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.svgo_li4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.svgo_li5 }} />
        <li dangerouslySetInnerHTML={{ __html: t.svgo_li6 }} />
      </ul>
      <p>{t.svgo_p3}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`# Install SVGO
npm install -D svgo

# Optimize a single file
npx svgo input.svg -o output.svg

# Optimize all SVGs in a folder
npx svgo -f ./src/assets/svg/ -o ./src/assets/svg-optimized/

# With custom config (svgo.config.js)
module.exports = {
  plugins: [
    'preset-default',
    'removeDimensions',        // Remove width/height, keep viewBox
    'removeXMLNS',             // Remove xmlns for inline use
    { name: 'removeAttrs',     // Remove specific attributes
      params: { attrs: '(data-.*)' }
    },
    { name: 'sortAttrs' },     // Consistent attribute order
  ],
};

# Before SVGO: 2,847 bytes
# After SVGO:    892 bytes (68% reduction)`}</code></pre>

      {/* Section 6: Reusable Components */}
      <h2>{t.h2_reusable}</h2>
      <p>{t.reusable_p1}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.reusable_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.reusable_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.reusable_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.reusable_li4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.reusable_li5 }} />
      </ul>
      <p>{t.reusable_p2}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  title?: string;
}

const HeartIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor', title, ...rest }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title && <title>{title}</title>}
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
);

HeartIcon.displayName = 'HeartIcon';
export default HeartIcon;`}</code></pre>
      <p>{t.reusable_p3}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// Basic usage - inherits parent text color
<HeartIcon />

// Custom size and color
<HeartIcon size={32} color="#ef4444" />

// With accessibility label
<HeartIcon title="Add to favorites" />

// With className for Tailwind
<HeartIcon className="text-red-500 hover:text-red-600 transition-colors" />

// With event handler
<HeartIcon onClick={() => toggleFavorite()} style={{ cursor: 'pointer' }} />

// With ref for animations
const iconRef = useRef<SVGSVGElement>(null);
<HeartIcon ref={iconRef} />`}</code></pre>

      {/* Section 7: Sprites vs Inline vs img */}
      <h2>{t.h2_sprites}</h2>
      <p>{t.sprites_p1}</p>

      <h3>{t.sprites_h3_inline}</h3>
      <p>{t.sprites_inline_p}</p>
      <p dangerouslySetInnerHTML={{ __html: t.sprites_inline_pros }} />
      <p dangerouslySetInnerHTML={{ __html: t.sprites_inline_cons }} />

      <h3>{t.sprites_h3_sprite}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.sprites_sprite_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`<!-- sprites.svg -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-heart" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0..." />
  </symbol>
  <symbol id="icon-star" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87..." />
  </symbol>
</svg>

<!-- Usage -->
<svg width="24" height="24">
  <use href="#icon-heart" />
</svg>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.sprites_sprite_pros }} />
      <p dangerouslySetInnerHTML={{ __html: t.sprites_sprite_cons }} />

      <h3>{t.sprites_h3_img}</h3>
      <p>{t.sprites_img_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// External SVG via img tag
<img src="/icons/logo.svg" alt="Company logo" width={120} height={40} />

// Next.js Image component
import Image from 'next/image';
<Image src="/icons/logo.svg" alt="Logo" width={120} height={40} />`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.sprites_img_pros }} />
      <p dangerouslySetInnerHTML={{ __html: t.sprites_img_cons }} />
      <p dangerouslySetInnerHTML={{ __html: t.sprites_p2 }} />

      {/* Section 8: Accessibility */}
      <h2>{t.h2_accessibility}</h2>
      <p>{t.a11y_p1}</p>

      <h3>{t.a11y_h3_decorative}</h3>
      <p>{t.a11y_decorative_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// Decorative icon next to text - hide from screen readers
<button>
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24">
    <path d="M19 7l-7 7-7-7" />
  </svg>
  <span>Show more</span>
</button>`}</code></pre>

      <h3>{t.a11y_h3_meaningful}</h3>
      <p>{t.a11y_meaningful_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// Meaningful icon - needs accessible name
<button aria-label="Close dialog">
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
</button>

// Standalone meaningful icon (no button wrapper)
<svg role="img" aria-label="Warning: action required" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2L2 22h20L12 2zm0 4l7.5 14h-15L12 6z" />
  <path d="M12 10v4m0 2v2" />
</svg>`}</code></pre>

      <h3>{t.a11y_h3_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.a11y_title_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// Using <title> with aria-labelledby for broadest support
<svg
  role="img"
  aria-labelledby="icon-title-settings"
  width="24" height="24"
  viewBox="0 0 24 24"
>
  <title id="icon-title-settings">Settings</title>
  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l..." />
</svg>`}</code></pre>
      <p>{t.a11y_p2}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`interface AccessibleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  label?: string;          // If provided, icon is "meaningful"
  children: React.ReactNode; // SVG paths
}

function AccessibleIcon({ size = 24, color = 'currentColor', label, children, ...rest }: AccessibleIconProps) {
  const isDecorative = !label;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      role={isDecorative ? undefined : 'img'}
      aria-label={isDecorative ? undefined : label}
      aria-hidden={isDecorative ? true : undefined}
      focusable={isDecorative ? false : undefined}
      {...rest}
    >
      {children}
    </svg>
  );
}`}</code></pre>

      {/* Section 9: Animation */}
      <h2>{t.h2_animation}</h2>
      <p>{t.anim_p1}</p>

      <h3>{t.anim_h3_css}</h3>
      <p>{t.anim_css_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// CSS animation: spinning loader
function SpinnerIcon({ size = 24 }: { size?: number }) {
  return (
    <>
      <style>{\`
        @keyframes spin { to { transform: rotate(360deg); } }
        .svg-spinner { animation: spin 1s linear infinite; }
      \`}</style>
      <svg className="svg-spinner" width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="3" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </>
  );
}

// CSS transition: stroke animation on hover
function AnimatedCheck({ size = 48 }: { size?: number }) {
  return (
    <>
      <style>{\`
        .check-path {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          transition: stroke-dashoffset 0.4s ease;
        }
        .check-icon:hover .check-path {
          stroke-dashoffset: 0;
        }
      \`}</style>
      <svg className="check-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
        <circle cx="12" cy="12" r="10" opacity="0.2" />
        <path className="check-path" d="M8 12l3 3 5-5" strokeLinecap="round" />
      </svg>
    </>
  );
}`}</code></pre>

      <h3>{t.anim_h3_framer}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.anim_framer_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`import { motion } from 'framer-motion';

// Animated path drawing with Framer Motion
function AnimatedHeart() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="#ef4444"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// SVG with hover scale and color change
function InteractiveIcon() {
  return (
    <motion.svg
      width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      whileHover={{ scale: 1.2, stroke: '#3b82f6' }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </motion.svg>
  );
}`}</code></pre>

      <h3>{t.anim_h3_gsap}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.anim_gsap_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function GsapSvgAnimation() {
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.from(pathRef.current, {
      strokeDashoffset: 100,
      strokeDasharray: 100,
      duration: 1.5,
      ease: 'power2.inOut',
    });
    tl.to(circleRef.current, {
      scale: 1.2,
      transformOrigin: 'center',
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.5');
  }, []);

  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <circle ref={circleRef} cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="1.5" />
      <path ref={pathRef} d="M8 12l3 3 5-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.anim_p2 }} />

      {/* Section 10: Performance */}
      <h2>{t.h2_performance}</h2>
      <p>{t.perf_p1}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.perf_table_format}</th>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.perf_table_size}</th>
            <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.perf_table_scalable}</th>
            <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.perf_table_stylable}</th>
            <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.perf_table_animate}</th>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.perf_table_best_for}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SVG</strong></td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>200-800 B</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Yes</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Yes</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Yes</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>Icons, logos, UI graphics</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>PNG</strong></td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>1-5 KB (@2x)</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>No</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>No</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>No</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>Photos, complex images</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>WebP</strong></td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>0.5-3 KB</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>No</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>No</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Limited</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>Photos (smaller than PNG)</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Icon Font</strong></td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>50-200 KB (full set)</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Yes</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Color only</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>No</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>Legacy projects</td>
          </tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: t.perf_p2 }} />
      <p>{t.perf_p3}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.perf_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.perf_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.perf_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.perf_li4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.perf_li5 }} />
      </ul>

      {/* Section 11: Tree-shaking */}
      <h2>{t.h2_treeshaking}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.tree_p1 }} />
      <p>{t.tree_p2}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}><code>{`// GOOD: Tree-shakable named imports
import { Heart, Star, Search } from 'lucide-react';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

// BAD: Barrel import that may include entire library
import * as Icons from 'lucide-react';  // All 1000+ icons bundled

// GOOD: Import from specific sub-package (react-icons)
import { FaHeart } from 'react-icons/fa';
import { HiSearch } from 'react-icons/hi';

// BAD: Import from root (no tree-shaking)
import { FaHeart } from 'react-icons';  // May bundle all icon sets`}</code></pre>
      <p>{t.tree_p3}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.tree_table_library}</th>
            <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.tree_table_icons}</th>
            <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.tree_table_treeshake}</th>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontSize: 13 }}>{t.tree_table_pericon}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>Lucide React</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>1,400+</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Yes</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>~500 B</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>Heroicons</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>300+</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Yes</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>~400 B</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>Phosphor Icons</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>7,000+</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Yes</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>~600 B</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>React Icons</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>40,000+</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Per sub-package</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>~300-800 B</td>
          </tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: t.tree_p4 }} />
      <p dangerouslySetInnerHTML={{ __html: t.tree_p5 }} />

      {/* CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '20px 24px', marginTop: 32, marginBottom: 32 }}>
        <p style={{ margin: 0, fontWeight: 600, marginBottom: 8 }}>
          {t.link_tool}
        </p>
        <Link href={`/${lang}/tools/svg-to-jsx`} style={{ color: '#2563eb', fontWeight: 600 }}>
          {`/${lang}/tools/svg-to-jsx`} {'\u2192'}
        </Link>
      </div>

      {/* FAQ Section */}
      <h2>{t.h2_faq}</h2>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>{t.faq1_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{t.faq1_a}</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>{t.faq2_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{t.faq2_a}</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>{t.faq3_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{t.faq3_a}</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>{t.faq4_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{t.faq4_a}</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>{t.faq5_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{t.faq5_a}</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>{t.faq6_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{t.faq6_a}</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>{t.faq7_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{t.faq7_a}</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>{t.faq8_q}</h3>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{t.faq8_a}</p>
      </div>
    </>
  );
}
