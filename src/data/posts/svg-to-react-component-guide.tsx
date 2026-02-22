import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting <strong>SVG to React components</strong> is a critical skill for modern frontend development. SVG (Scalable Vector Graphics) offers resolution-independent graphics that look crisp on every screen, and React provides the component model to make them reusable and interactive. This comprehensive guide covers everything from manual conversion techniques to automated tooling, accessibility best practices, and performance optimization strategies for using SVG in your React applications.',
    linkTool: 'Convert SVG to JSX instantly with our free online tool.',
    h2_why: 'Why Convert SVG to React Components?',
    whyDesc1: 'Using SVG directly as React components gives you several advantages over traditional approaches like <code>&lt;img&gt;</code> tags or CSS background images. You gain <strong>full control over styling</strong> through props and CSS-in-JS, the ability to <strong>animate individual paths</strong> with CSS or libraries like Framer Motion, <strong>dynamic theming</strong> support (light/dark mode), and <strong>tree-shaking</strong> so unused icons are excluded from your bundle.',
    whyDesc2: 'React treats JSX elements as first-class citizens, so SVG components can accept props, respond to events, and participate in the component lifecycle just like any other React element. This makes SVG-based icons, illustrations, and charts far more powerful than static image files.',
    whyDesc3: 'The main challenge is that raw SVG uses <strong>HTML attributes</strong> (like <code>class</code>, <code>fill-rule</code>, <code>clip-path</code>) that must be converted to their <strong>JSX equivalents</strong> (<code>className</code>, <code>fillRule</code>, <code>clipPath</code>). This guide shows you how to handle this conversion reliably.',
    h2_manual: 'Method 1: Manual SVG to React Conversion',
    manualDesc1: 'For a single icon or simple SVG, manual conversion is straightforward. Here is the step-by-step process:',
    manualSteps: '<ol><li>Copy the raw SVG markup from your design tool (Figma, Sketch, Illustrator) or SVG file.</li><li>Replace <code>class</code> with <code>className</code>.</li><li>Convert hyphenated attributes to camelCase: <code>fill-rule</code> becomes <code>fillRule</code>, <code>stroke-width</code> becomes <code>strokeWidth</code>, <code>clip-path</code> becomes <code>clipPath</code>, etc.</li><li>Convert <code>xlink:href</code> to <code>xlinkHref</code> (or remove it for modern SVG).</li><li>Self-close tags without children: <code>&lt;path ... /&gt;</code> instead of <code>&lt;path ...&gt;&lt;/path&gt;</code>.</li><li>Wrap in a React component function and export it.</li></ol>',
    manualDesc2: 'Here is a before-and-after example showing the conversion of a simple checkmark icon:',
    h2_auto: 'Method 2: Automated Conversion with SVGR',
    autoDesc1: '<strong>SVGR</strong> is the industry-standard tool for converting SVG files into React components. It powers the SVG handling in Create React App, Next.js, and Vite. SVGR handles all attribute transformations, adds proper TypeScript types, and can optimize SVG with SVGO in the same pipeline.',
    autoDesc2: 'You can use SVGR in multiple ways: as a CLI tool, a webpack/Vite plugin, or programmatically in Node.js:',
    autoDesc3: 'SVGR supports extensive configuration through <code>.svgrrc.json</code> or the <code>svgr</code> key in <code>package.json</code>. Common options include setting the default export type, enabling TypeScript, controlling whether to include the <code>title</code> element for accessibility, and customizing the component template.',
    h2_inline: 'Inline SVG vs External SVG Files',
    inlineDesc1: 'There are two main approaches to using SVG in React, each with different trade-offs:',
    inlineTitle: 'Inline SVG (as JSX components)',
    inlinePoints: '<ul><li><strong>Pros</strong>: Full CSS/JS control, dynamic props, tree-shakable, no extra HTTP requests</li><li><strong>Cons</strong>: Increases JavaScript bundle size, cannot be cached independently, SSR markup is larger</li><li><strong>Best for</strong>: Icons, logos, small illustrations (under 5KB each)</li></ul>',
    externalTitle: 'External SVG files (via img tag or CSS)',
    externalPoints: '<ul><li><strong>Pros</strong>: Separate caching, smaller JS bundle, browser-native rendering</li><li><strong>Cons</strong>: No dynamic styling, extra HTTP request, no JS interaction</li><li><strong>Best for</strong>: Large illustrations, complex diagrams, decorative backgrounds</li></ul>',
    inlineDesc2: 'A hybrid approach works well: use inline SVG components for interactive icons and UI elements, and external SVG files for large decorative graphics. The threshold is roughly 5KB: below that, inline; above that, external.',
    h2_a11y: 'Accessibility Best Practices for SVG in React',
    a11yDesc1: 'Making SVG components accessible requires attention to a few key details. Decorative SVGs should be hidden from screen readers, while meaningful SVGs need proper labels:',
    a11yDesc2: 'Key accessibility rules for SVG in React:',
    a11yRules: '<ul><li>Add <code>role="img"</code> and <code>aria-label</code> for meaningful SVGs that convey information</li><li>Add <code>aria-hidden="true"</code> for decorative SVGs that do not convey meaning</li><li>Include a <code>&lt;title&gt;</code> element inside the SVG as a fallback description</li><li>Use <code>focusable="false"</code> to prevent keyboard focus on decorative SVGs in older browsers</li><li>Ensure sufficient color contrast for SVG icons (WCAG 2.1 requires 3:1 ratio for UI components)</li></ul>',
    h2_perf: 'Performance Optimization Tips',
    perfDesc1: 'SVG components can impact performance if not handled carefully. Here are strategies to keep your React app fast:',
    perfTip1: '<strong>Optimize SVG before converting</strong>: Use SVGO (SVG Optimizer) to remove unnecessary metadata, comments, editor data, empty groups, and default values. This can reduce SVG size by 30-70%.',
    perfTip2: '<strong>Use React.memo for icon components</strong>: Since icons rarely change based on new props, wrapping them in <code>React.memo()</code> prevents unnecessary re-renders when parent components update.',
    perfTip3: '<strong>Lazy-load large SVG sets</strong>: If your app has hundreds of icons, use <code>React.lazy()</code> with dynamic imports to code-split icon bundles.',
    perfTip4: '<strong>Use SVG sprites for repeated icons</strong>: For icons used across many pages, an SVG sprite sheet with <code>&lt;use&gt;</code> references can be more efficient than individual components.',
    perfTip5: '<strong>Prefer currentColor</strong>: Using <code>fill="currentColor"</code> lets the SVG inherit text color from its parent CSS, eliminating the need for extra style props and enabling theme switching without re-renders.',
    h2_ts: 'TypeScript Support for SVG Components',
    tsDesc1: 'When using TypeScript, proper typing ensures your SVG components integrate seamlessly with your codebase. Here is how to type SVG components correctly:',
    tsDesc2: 'With SVGR and TypeScript, you can also generate <code>.d.ts</code> declaration files for SVG imports. Add this to your project type declarations:',
    h2_next: 'SVG in Next.js Projects',
    nextDesc1: 'Next.js requires a specific setup for SVG-as-component imports. The recommended approach uses <code>@svgr/webpack</code>:',
    nextDesc2: 'After configuration, you can import SVGs as React components directly in your Next.js pages and components. The webpack loader handles the conversion at build time, so there is no runtime overhead.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert SVG to a React component?',
    faq1_a: 'Convert SVG to a React component by transforming HTML attributes to JSX equivalents (class to className, hyphenated attributes to camelCase), wrapping the SVG markup in a function component, and exporting it. Use SVGR for automated conversion, or our free online SVG to JSX converter tool for quick one-off transformations.',
    faq2_q: 'What is the difference between SVG to JSX and SVG to React?',
    faq2_a: 'SVG to JSX converts the attribute syntax (class to className, fill-rule to fillRule, etc.) so the markup is valid JSX. SVG to React goes further by wrapping the JSX in a proper React component with props support, TypeScript types, and export statements. Most tools do both steps together.',
    faq3_q: 'Should I inline SVG or use img tags in React?',
    faq3_a: 'Inline SVG as React components for icons and small graphics (under 5KB) that need styling control or interactivity. Use img tags for large decorative SVGs, complex illustrations, or SVGs that benefit from browser caching. A hybrid approach often works best.',
    faq4_q: 'How do I make SVG components accessible?',
    faq4_a: 'For meaningful SVGs, add role="img" and aria-label with a descriptive label. For decorative SVGs, add aria-hidden="true" and focusable="false". Always include a title element inside the SVG as a fallback.',
    faq5_q: 'Can I use SVG with React Native?',
    faq5_a: 'Yes, but React Native does not support SVG natively. Use the react-native-svg library which provides SVG components (Svg, Path, Circle, etc.) that map to native platform primitives. SVGR also has a React Native mode that generates compatible components.',
    conclusion: 'Converting <strong>SVG to React components</strong> gives you the best of both worlds: resolution-independent graphics with full React interactivity and theming support. For quick conversions, use our online tool. For project-wide SVG handling, set up SVGR in your build pipeline. Always optimize your SVGs with SVGO first, and follow accessibility best practices to ensure your icons work for all users.',
    linkToolBottom: 'Convert SVG to JSX with our free online tool.',
  },
  zh: {
    intro: '将 <strong>SVG 转换为 React 组件</strong>是现代前端开发的关键技能。SVG 提供分辨率无关的图形，在每个屏幕上都清晰锐利，而 React 提供组件模型使其可复用和交互。本指南涵盖手动转换技术、自动化工具、无障碍最佳实践和性能优化策略。',
    linkTool: '使用我们的免费在线工具即时将 SVG 转换为 JSX。',
    h2_why: '为什么要将 SVG 转换为 React 组件？',
    whyDesc1: '将 SVG 作为 React 组件使用比传统的 <code>&lt;img&gt;</code> 标签或 CSS 背景图有诸多优势：通过 props 和 CSS-in-JS 完全控制样式、动画单个路径、动态主题支持（亮/暗模式）以及 tree-shaking。',
    whyDesc2: 'React 将 JSX 元素视为一等公民，因此 SVG 组件可以接受 props、响应事件、参与组件生命周期。这使得基于 SVG 的图标和图表比静态图片文件强大得多。',
    whyDesc3: '主要挑战是原始 SVG 使用 <strong>HTML 属性</strong>（如 <code>class</code>、<code>fill-rule</code>）必须转换为 <strong>JSX 等价属性</strong>（<code>className</code>、<code>fillRule</code>）。',
    h2_manual: '方法一：手动 SVG 转 React 转换',
    manualDesc1: '对于单个图标或简单 SVG，手动转换很简单：',
    manualSteps: '<ol><li>从设计工具复制原始 SVG 标记。</li><li>将 <code>class</code> 替换为 <code>className</code>。</li><li>将连字符属性转为驼峰命名。</li><li>将 <code>xlink:href</code> 转为 <code>xlinkHref</code>。</li><li>自闭合无子元素的标签。</li><li>包装在 React 组件函数中并导出。</li></ol>',
    manualDesc2: '以下是一个简单对勾图标的转换前后示例：',
    h2_auto: '方法二：使用 SVGR 自动转换',
    autoDesc1: '<strong>SVGR</strong> 是将 SVG 文件转换为 React 组件的行业标准工具，支持 CRA、Next.js 和 Vite。',
    autoDesc2: '可通过 CLI、webpack/Vite 插件或 Node.js API 使用 SVGR：',
    autoDesc3: 'SVGR 通过 <code>.svgrrc.json</code> 支持广泛配置，包括默认导出类型、TypeScript 支持、可访问性标题等。',
    h2_inline: '内联 SVG 与外部 SVG 文件',
    inlineDesc1: '在 React 中使用 SVG 有两种主要方式，各有权衡：',
    inlineTitle: '内联 SVG（作为 JSX 组件）',
    inlinePoints: '<ul><li><strong>优点</strong>：完全 CSS/JS 控制、动态 props、可 tree-shake、无额外 HTTP 请求</li><li><strong>缺点</strong>：增加 JS 包大小、不能独立缓存</li><li><strong>适合</strong>：图标、logo、小型插图（5KB 以下）</li></ul>',
    externalTitle: '外部 SVG 文件（通过 img 标签或 CSS）',
    externalPoints: '<ul><li><strong>优点</strong>：独立缓存、更小的 JS 包、浏览器原生渲染</li><li><strong>缺点</strong>：无动态样式、额外 HTTP 请求、无 JS 交互</li><li><strong>适合</strong>：大型插图、复杂图表、装饰性背景</li></ul>',
    inlineDesc2: '混合方式效果最佳：交互图标用内联 SVG 组件，大型装饰图形用外部文件。阈值大约是 5KB。',
    h2_a11y: 'SVG 在 React 中的无障碍最佳实践',
    a11yDesc1: '使 SVG 组件可访问需要注意几个关键细节。装饰性 SVG 应对屏幕阅读器隐藏，有意义的 SVG 需要适当的标签。',
    a11yDesc2: 'SVG 在 React 中的关键无障碍规则：',
    a11yRules: '<ul><li>为有意义的 SVG 添加 <code>role="img"</code> 和 <code>aria-label</code></li><li>为装饰性 SVG 添加 <code>aria-hidden="true"</code></li><li>在 SVG 内部包含 <code>&lt;title&gt;</code> 元素作为备用描述</li><li>使用 <code>focusable="false"</code> 防止键盘聚焦到装饰性 SVG</li><li>确保 SVG 图标有足够的颜色对比度（WCAG 2.1 要求 3:1）</li></ul>',
    h2_perf: '性能优化技巧',
    perfDesc1: '如果处理不当，SVG 组件可能影响性能。以下策略可以保持 React 应用的速度：',
    perfTip1: '<strong>转换前优化 SVG</strong>：使用 SVGO 删除不必要的元数据，可减少 30-70% 的大小。',
    perfTip2: '<strong>对图标组件使用 React.memo</strong>：防止不必要的重新渲染。',
    perfTip3: '<strong>延迟加载大型 SVG 集</strong>：使用 React.lazy() 进行代码分割。',
    perfTip4: '<strong>对重复图标使用 SVG 雪碧图</strong>：通过 <code>&lt;use&gt;</code> 引用更高效。',
    perfTip5: '<strong>优先使用 currentColor</strong>：让 SVG 继承父元素的文本颜色。',
    h2_ts: 'SVG 组件的 TypeScript 支持',
    tsDesc1: '使用 TypeScript 时，正确的类型定义确保 SVG 组件与代码库无缝集成：',
    tsDesc2: '可以为 SVG 导入生成 <code>.d.ts</code> 声明文件。',
    h2_next: 'Next.js 项目中的 SVG',
    nextDesc1: 'Next.js 需要使用 <code>@svgr/webpack</code> 进行特定配置：',
    nextDesc2: '配置后可在 Next.js 页面中直接将 SVG 导入为 React 组件，webpack 加载器在构建时处理转换。',
    h2_faq: '常见问题',
    faq1_q: '如何将 SVG 转换为 React 组件？',
    faq1_a: '通过将 HTML 属性转换为 JSX 等价属性、包装在函数组件中并导出来转换。使用 SVGR 进行自动化转换，或使用我们的免费在线工具快速转换。',
    faq2_q: 'SVG to JSX 和 SVG to React 有什么区别？',
    faq2_a: 'SVG to JSX 转换属性语法使其成为有效的 JSX。SVG to React 更进一步，将 JSX 包装在带有 props 支持和 TypeScript 类型的 React 组件中。',
    faq3_q: '应该在 React 中内联 SVG 还是使用 img 标签？',
    faq3_a: '5KB 以下需要样式控制的用内联 SVG 组件，大型装饰性 SVG 用 img 标签。混合方式通常最佳。',
    faq4_q: '如何使 SVG 组件可访问？',
    faq4_a: '有意义的 SVG 添加 role="img" 和 aria-label，装饰性 SVG 添加 aria-hidden="true" 和 focusable="false"。',
    faq5_q: '可以在 React Native 中使用 SVG 吗？',
    faq5_a: '可以，但需要 react-native-svg 库。SVGR 也有 React Native 模式生成兼容组件。',
    conclusion: '将 <strong>SVG 转换为 React 组件</strong>让您兼得两全：分辨率无关的图形和完整的 React 交互性。快速转换使用在线工具，项目级 SVG 处理使用 SVGR。始终先用 SVGO 优化 SVG，并遵循无障碍最佳实践。',
    linkToolBottom: '使用我们的免费在线工具将 SVG 转换为 JSX。',
  },
  fr: {
    intro: 'Convertir <strong>SVG en composants React</strong> est essentiel pour le developpement frontend moderne. Ce guide couvre la conversion manuelle, les outils automatises, l\'accessibilite et l\'optimisation des performances.',
    linkTool: 'Convertissez SVG en JSX avec notre outil gratuit.',
    h2_why: 'Pourquoi convertir SVG en composants React ?',
    whyDesc1: 'Les composants SVG offrent un controle total du style, des animations, le support des themes et le tree-shaking.',
    whyDesc2: 'React traite les SVG comme des elements de premiere classe avec props, evenements et cycle de vie.',
    whyDesc3: 'Le defi principal est la conversion des attributs HTML en equivalents JSX (camelCase).',
    h2_manual: 'Methode 1 : Conversion manuelle',
    manualDesc1: 'Pour un SVG simple, la conversion manuelle est directe :',
    manualSteps: '<ol><li>Copiez le SVG brut.</li><li>Remplacez class par className.</li><li>Convertissez les attributs en camelCase.</li><li>Encapsulez dans un composant React.</li></ol>',
    manualDesc2: 'Voici un exemple avant/apres :',
    h2_auto: 'Methode 2 : Conversion automatisee avec SVGR',
    autoDesc1: 'SVGR est l\'outil standard pour convertir SVG en composants React.',
    autoDesc2: 'Utilisable en CLI, plugin webpack/Vite, ou API Node.js.',
    autoDesc3: 'SVGR supporte une configuration extensive via .svgrrc.json.',
    h2_inline: 'SVG inline vs fichiers SVG externes',
    inlineDesc1: 'Deux approches principales avec des compromis differents :',
    inlineTitle: 'SVG inline (composants JSX)',
    inlinePoints: '<ul><li>Avantages : Controle CSS/JS complet, props dynamiques, tree-shaking</li><li>Inconvenients : Augmente la taille du bundle JS</li></ul>',
    externalTitle: 'Fichiers SVG externes',
    externalPoints: '<ul><li>Avantages : Cache independant, bundle JS plus petit</li><li>Inconvenients : Pas de style dynamique, requete HTTP supplementaire</li></ul>',
    inlineDesc2: 'Approche hybride recommandee : inline pour les icones, externe pour les grandes illustrations.',
    h2_a11y: 'Accessibilite SVG dans React',
    a11yDesc1: 'Les SVG decoratifs doivent etre caches des lecteurs d\'ecran, les SVG significatifs necessitent des labels.',
    a11yDesc2: 'Regles cles d\'accessibilite :',
    a11yRules: '<ul><li>role="img" et aria-label pour les SVG significatifs</li><li>aria-hidden="true" pour les SVG decoratifs</li><li>Element title comme description de secours</li></ul>',
    h2_perf: 'Optimisation des performances',
    perfDesc1: 'Strategies pour maintenir les performances avec les SVG :',
    perfTip1: '<strong>Optimisez avec SVGO</strong> avant la conversion.',
    perfTip2: '<strong>Utilisez React.memo</strong> pour les composants d\'icones.',
    perfTip3: '<strong>Chargement paresseux</strong> pour les grands ensembles d\'icones.',
    perfTip4: '<strong>Sprites SVG</strong> pour les icones repetees.',
    perfTip5: '<strong>Preferez currentColor</strong> pour l\'heritage de couleur.',
    h2_ts: 'Support TypeScript pour SVG',
    tsDesc1: 'Typage correct des composants SVG avec TypeScript :',
    tsDesc2: 'Generation de fichiers .d.ts pour les imports SVG.',
    h2_next: 'SVG dans les projets Next.js',
    nextDesc1: 'Configuration specifique avec @svgr/webpack pour Next.js.',
    nextDesc2: 'Import direct de SVG comme composants React apres configuration.',
    h2_faq: 'Questions frequentes',
    faq1_q: 'Comment convertir SVG en composant React ?',
    faq1_a: 'Transformez les attributs HTML en JSX, encapsulez dans un composant et exportez. Utilisez SVGR ou notre outil en ligne.',
    faq2_q: 'Quelle difference entre SVG to JSX et SVG to React ?',
    faq2_a: 'SVG to JSX convertit la syntaxe. SVG to React ajoute le wrapper composant avec props et types.',
    faq3_q: 'Inline SVG ou img tag dans React ?',
    faq3_a: 'Inline pour les icones (< 5KB), img pour les grandes illustrations. Approche hybride recommandee.',
    faq4_q: 'Comment rendre les SVG accessibles ?',
    faq4_a: 'role="img" et aria-label pour les SVG significatifs, aria-hidden="true" pour les decoratifs.',
    faq5_q: 'SVG avec React Native ?',
    faq5_a: 'Oui, avec react-native-svg. SVGR a aussi un mode React Native.',
    conclusion: 'Convertir SVG en composants React combine graphiques vectoriels et interactivite React. Utilisez notre outil en ligne ou SVGR.',
    linkToolBottom: 'Convertissez SVG en JSX avec notre outil gratuit.',
  },
};

export default function SvgToReactComponentGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/svg-to-jsx`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Why Convert */}
      <h2>{s.h2_why}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc3 }} />

      {/* Method 1: Manual */}
      <h2>{s.h2_manual}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.manualDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.manualSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.manualDesc2 }} />

      <h3>Raw SVG (before conversion)</h3>
      <pre><code className="language-html">{`<!-- Raw SVG from a design tool -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
     viewBox="0 0 24 24" class="icon-check"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>`}</code></pre>

      <h3>React Component (after conversion)</h3>
      <pre><code className="language-tsx">{`import React from 'react';

interface CheckIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={\`icon-check \${className}\`}
    fill="none"
    stroke={color}
    strokeWidth={2}           // was stroke-width
    strokeLinecap="round"     // was stroke-linecap
    strokeLinejoin="round"    // was stroke-linejoin
    role="img"
    aria-label="Checkmark"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default CheckIcon;`}</code></pre>

      <h3>Common SVG Attribute Conversions</h3>
      <pre><code className="language-text">{`HTML Attribute        JSX Equivalent
─────────────────────────────────────────
class                 className
fill-rule             fillRule
clip-path             clipPath
clip-rule             clipRule
fill-opacity          fillOpacity
stroke-width          strokeWidth
stroke-linecap        strokeLinecap
stroke-linejoin       strokeLinejoin
stroke-dasharray      strokeDasharray
stroke-dashoffset     strokeDashoffset
stroke-miterlimit     strokeMiterlimit
stroke-opacity        strokeOpacity
font-size             fontSize
font-family           fontFamily
text-anchor           textAnchor
text-decoration       textDecoration
dominant-baseline     dominantBaseline
alignment-baseline    alignmentBaseline
xlink:href            xlinkHref (deprecated)
xml:space             xmlSpace`}</code></pre>

      {/* Method 2: SVGR */}
      <h2>{s.h2_auto}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.autoDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.autoDesc2 }} />

      <h3>SVGR CLI</h3>
      <pre><code className="language-bash">{`# Install SVGR
npm install -D @svgr/cli

# Convert a single SVG file to a React component
npx @svgr/cli --icon --typescript icon.svg

# Convert an entire directory of SVGs
npx @svgr/cli --icon --typescript --out-dir src/components/icons src/assets/svg/

# With SVGO optimization included
npx @svgr/cli --icon --svgo --typescript icon.svg`}</code></pre>

      <h3>SVGR with webpack (React/Next.js)</h3>
      <pre><code className="language-javascript">{`// next.config.js (Next.js example)
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                { name: 'removeViewBox', active: false },
                { name: 'removeDimensions', active: true },
              ],
            },
            titleProp: true,    // adds title prop for a11y
            typescript: true,   // generates TypeScript
          },
        },
      ],
    });
    return config;
  },
};

// Usage in your component:
import ArrowIcon from './arrow.svg';

function Button() {
  return (
    <button>
      <ArrowIcon width={20} height={20} title="Navigate" />
      Next
    </button>
  );
}`}</code></pre>

      <h3>SVGR with Vite</h3>
      <pre><code className="language-typescript">{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        typescript: true,
        svgo: true,
      },
    }),
  ],
});

// Usage with named import:
import { ReactComponent as Logo } from './logo.svg';
// or default import depending on config:
import Logo from './logo.svg?react';`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.autoDesc3 }} />

      <h3>.svgrrc.json configuration</h3>
      <pre><code className="language-json">{`{
  "icon": true,
  "typescript": true,
  "svgo": true,
  "titleProp": true,
  "replaceAttrValues": {
    "#000": "currentColor",
    "#000000": "currentColor"
  },
  "svgoConfig": {
    "plugins": [
      { "name": "removeViewBox", "active": false },
      { "name": "removeDimensions", "active": true },
      { "name": "removeTitle", "active": false }
    ]
  },
  "template": null
}`}</code></pre>

      {/* Inline vs External */}
      <h2>{s.h2_inline}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.inlineDesc1 }} />
      <h3>{s.inlineTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: s.inlinePoints }} />
      <h3>{s.externalTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: s.externalPoints }} />
      <p dangerouslySetInnerHTML={{ __html: s.inlineDesc2 }} />

      <pre><code className="language-tsx">{`// Inline SVG as component (best for icons)
import SearchIcon from '@/icons/SearchIcon';

function SearchBar() {
  return (
    <div className="search-bar">
      <SearchIcon size={20} color="var(--text-muted)" />
      <input type="text" placeholder="Search..." />
    </div>
  );
}

// External SVG via img tag (best for large illustrations)
function HeroSection() {
  return (
    <section>
      <h1>Welcome</h1>
      <img
        src="/illustrations/hero-graphic.svg"
        alt="Developer tools illustration"
        width={600}
        height={400}
        loading="lazy"
      />
    </section>
  );
}`}</code></pre>

      {/* Accessibility */}
      <h2>{s.h2_a11y}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.a11yDesc1 }} />

      <pre><code className="language-tsx">{`// Meaningful SVG - conveys information
const WarningIcon = ({ message }: { message: string }) => (
  <svg
    role="img"
    aria-label={message}
    viewBox="0 0 24 24"
    width={24}
    height={24}
  >
    <title>{message}</title>
    <path d="M12 2L1 21h22L12 2zm0 4l7.5 13h-15L12 6z" fill="currentColor" />
    <path d="M11 10h2v5h-2zm0 6h2v2h-2z" fill="currentColor" />
  </svg>
);

// Decorative SVG - hidden from assistive technology
const DividerIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 100 2"
    width={100}
    height={2}
  >
    <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" />
  </svg>
);`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.a11yDesc2 }} />
      <div dangerouslySetInnerHTML={{ __html: s.a11yRules }} />

      {/* Performance */}
      <h2>{s.h2_perf}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.perfDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip5 }} />

      <pre><code className="language-tsx">{`// Memoized icon component - prevents unnecessary re-renders
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const StarIcon = React.memo<IconProps>(({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87
             1.18 6.88L12 17.77l-6.18 3.25L7 14.14
             2 9.27l6.91-1.01L12 2z" />
  </svg>
));
StarIcon.displayName = 'StarIcon';

// Lazy-loaded icon set for code splitting
const ChartIcons = React.lazy(() => import('./ChartIconSet'));

function Dashboard() {
  return (
    <React.Suspense fallback={<div style={{ width: 24, height: 24 }} />}>
      <ChartIcons.BarChart size={32} />
    </React.Suspense>
  );
}

// SVG sprite with <use> for repeated icons
function SpriteIcon({ id, size = 24 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} aria-hidden="true">
      <use href={\`/icons/sprite.svg#\${id}\`} />
    </svg>
  );
}`}</code></pre>

      {/* TypeScript */}
      <h2>{s.h2_ts}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.tsDesc1 }} />

      <pre><code className="language-typescript">{`// types/svg.d.ts - Enable SVG imports as React components
declare module '*.svg' {
  import React from 'react';
  const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}

// For Vite with vite-plugin-svgr:
declare module '*.svg?react' {
  import React from 'react';
  const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}

// Reusable icon component type
interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  title?: string;
}

// Icon factory function with proper types
function createIcon(
  path: string,
  displayName: string
): React.FC<IconComponentProps> {
  const Icon: React.FC<IconComponentProps> = ({
    size = 24,
    color = 'currentColor',
    title,
    ...props
  }) => (
    <svg
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
      aria-hidden={!title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  );
  Icon.displayName = displayName;
  return React.memo(Icon);
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.tsDesc2 }} />

      {/* Next.js */}
      <h2>{s.h2_next}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nextDesc1 }} />

      <pre><code className="language-typescript">{`// next.config.ts (Next.js 13+ with App Router)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: RegExp }) => rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports
      // ending in ?url (e.g. import iconUrl from './icon.svg?url')
      {
        ...fileLoaderRule,
        test: /\\.svg$/i,
        resourceQuery: /url/,
      },
      // Convert all other *.svg imports to React components
      {
        test: /\\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
        },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              svgo: true,
              titleProp: true,
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg
    fileLoaderRule.exclude = /\\.svg$/i;

    return config;
  },
};

export default nextConfig;`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.nextDesc2 }} />

      {/* FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />
      <h3>{s.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq4_a }} />
      <h3>{s.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq5_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/svg-to-jsx`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/svg-to-jsx`}>SVG to JSX Converter</Link> - Convert SVG markup to valid JSX for React</li>
        <li><Link href={`/${lang}/tools/html-to-jsx`}>HTML to JSX Converter</Link> - Convert any HTML to JSX including SVG</li>
        <li><Link href={`/${lang}/tools/svg-optimizer`}>SVG Optimizer</Link> - Optimize and minify SVG files with SVGO</li>
        <li><Link href={`/${lang}/blog/svg-optimization-react`}>SVG Optimization for React</Link> - Advanced SVG optimization techniques</li>
        <li><Link href={`/${lang}/blog/svg-viewbox-width-height-explained`}>SVG viewBox Explained</Link> - Understanding SVG coordinate systems</li>
        <li><Link href={`/${lang}/blog/html-to-jsx-react-migration`}>HTML to JSX Migration Guide</Link> - Complete HTML to JSX conversion reference</li>
        <li><Link href={`/${lang}/blog/css-to-tailwind-migration`}>CSS to Tailwind Migration</Link> - Modernize your styling alongside SVG components</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> - Generate TypeScript types from JSON data</li>
      </ul>
    </>
  );
}
