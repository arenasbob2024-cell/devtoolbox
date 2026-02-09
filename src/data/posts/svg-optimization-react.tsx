import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'SVG is the preferred format for icons, illustrations, and logos in modern web apps. But dropping raw SVG files into a React project often leads to <strong>broken attributes, bloated markup, and accessibility issues</strong>. This guide walks you through the full journey from raw SVG to optimized, reusable React components.',
    try_tool: 'Convert SVG to JSX instantly with our tool \u2192',
    h2_1: '1. Why Inline SVG in React?',
    p1_1: 'There are three common ways to use SVG in React: <code>&lt;img&gt;</code> tags, CSS backgrounds, and <strong>inline SVG</strong>. Inline SVG is often the best choice because it gives you full control over styling, animation, and accessibility.',
    p1_2: '<strong>Inline SVG advantages:</strong> You can style individual paths with CSS or Tailwind classes, animate parts of the SVG, change colors dynamically via props, and add proper ARIA attributes for screen readers.',
    p1_3: '<strong>When to use <code>&lt;img&gt;</code> instead:</strong> Large, complex SVGs (maps, detailed illustrations) that don\'t need dynamic styling. The browser can cache these separately and they won\'t bloat your JS bundle.',
    h2_2: '2. Attribute Conversion: HTML to JSX',
    p2_1: 'The biggest pain point when moving SVG into JSX is <strong>attribute name conversion</strong>. HTML attributes use kebab-case, but JSX requires camelCase. Here are the most common ones:',
    p2_table_from: 'SVG / HTML',
    p2_table_to: 'JSX',
    p2_2: 'Missing even one of these conversions will trigger a React warning in the console and may cause rendering issues.',
    h2_3: '3. Removing Unnecessary Attributes',
    p3_1: 'SVG files exported from design tools like Figma, Sketch, or Illustrator often include <strong>metadata and editor-specific attributes</strong> that serve no purpose in the browser:',
    p3_list: '<li><code>xmlns</code> \u2014 not needed when SVG is inline in HTML5</li><li><code>xml:space</code> \u2014 deprecated, use CSS white-space instead</li><li><code>data-name</code> \u2014 editor layer names</li><li><code>&lt;!-- comments --&gt;</code> \u2014 editor comments</li><li><code>id</code> attributes \u2014 often auto-generated and may cause conflicts</li><li><code>style</code> attributes \u2014 better converted to className or Tailwind</li>',
    p3_2: 'Removing this bloat can reduce SVG size by <strong>20\u201340%</strong> in many cases.',
    h2_4: '4. Creating Reusable SVG Components',
    p4_1: 'Once your SVG is cleaned up, wrap it in a proper React component. A good SVG component should accept <code>size</code>, <code>color</code>, and standard SVG props:',
    p4_2: 'This pattern lets you use the icon like any other component: <code>&lt;CheckIcon size={24} className="text-green-500" /&gt;</code>.',
    h2_5: '5. Props Forwarding and Flexibility',
    p5_1: 'Using <code>React.SVGProps&lt;SVGSVGElement&gt;</code> and the spread operator lets consumers pass <strong>any valid SVG attribute</strong> to your component \u2014 event handlers, data attributes, ARIA props, and more:',
    p5_2: '<strong>Tip:</strong> Always put the spread <code>{{...props}}</code> after your default attributes so consumers can override defaults when needed.',
    h2_6: '6. Accessibility Best Practices',
    p6_1: 'SVG icons are often invisible to screen readers unless you add proper ARIA attributes. Follow these rules:',
    p6_list: '<li><strong>Decorative icons</strong> (next to text labels): Add <code>aria-hidden="true"</code> and <code>focusable="false"</code></li><li><strong>Meaningful icons</strong> (standalone, no text): Add <code>role="img"</code> and <code>aria-label="description"</code></li><li><strong>Interactive icons</strong> (inside buttons): The button should have <code>aria-label</code>; the SVG gets <code>aria-hidden="true"</code></li>',
    p6_2: 'A well-structured accessible icon component handles this automatically:',
    h2_7: '7. Tool Recommendation: SVG to JSX Converter',
    p7_1: 'Manually converting SVG attributes and cleaning up markup is tedious and error-prone. Our <strong>SVG to JSX converter</strong> handles all of this automatically:',
    p7_list: '<li>Converts all HTML attributes to camelCase JSX equivalents</li><li>Removes unnecessary metadata and editor attributes</li><li>Formats the output as a clean React component</li><li>Preserves viewBox and essential SVG structure</li>',
    p7_2: 'Paste your raw SVG and get a production-ready JSX component in seconds.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Should I use inline SVG or an SVG sprite system?',
    faq1_a: 'For small to medium projects (under 50 icons), inline SVG components are simpler and more flexible. For large icon libraries, consider an SVG sprite with <code>&lt;use&gt;</code> references to reduce bundle size. Both approaches work well with React.',
    faq2_q: 'Does inline SVG increase my JavaScript bundle size?',
    faq2_a: 'Yes, each inline SVG adds to your component\'s JS bundle. For small icons (under 1KB each), this is negligible. For large, complex SVGs, consider using <code>&lt;img&gt;</code> tags or dynamic imports to keep the initial bundle small.',
    faq3_q: 'Can I animate inline SVG in React?',
    faq3_a: 'Absolutely. Inline SVG gives you full access to individual elements. You can use CSS transitions, CSS animations, Framer Motion, or React Spring to animate paths, groups, and attributes. This is one of the key advantages over <code>&lt;img&gt;</code>-based SVG.',
  },
  zh: {
    intro: 'SVG \u662f\u73b0\u4ee3 Web \u5e94\u7528\u4e2d\u56fe\u6807\u3001\u63d2\u56fe\u548c Logo \u7684\u9996\u9009\u683c\u5f0f\u3002\u4f46\u5c06\u539f\u59cb SVG \u6587\u4ef6\u76f4\u63a5\u653e\u5165 React \u9879\u76ee\u901a\u5e38\u4f1a\u5bfc\u81f4<strong>\u5c5e\u6027\u62a5\u9519\u3001\u6807\u8bb0\u81c3\u80bf\u548c\u65e0\u969c\u788d\u95ee\u9898</strong>\u3002\u672c\u6307\u5357\u5e26\u60a8\u5b8c\u6210\u4ece\u539f\u59cb SVG \u5230\u4f18\u5316\u3001\u53ef\u590d\u7528 React \u7ec4\u4ef6\u7684\u5168\u90e8\u6d41\u7a0b\u3002',
    try_tool: '\u4f7f\u7528\u6211\u4eec\u7684\u5de5\u5177\u5373\u65f6\u5c06 SVG \u8f6c\u6362\u4e3a JSX \u2192',
    h2_1: '1. \u4e3a\u4ec0\u4e48\u5728 React \u4e2d\u4f7f\u7528\u5185\u8054 SVG\uff1f',
    p1_1: '\u5728 React \u4e2d\u4f7f\u7528 SVG \u6709\u4e09\u79cd\u5e38\u89c1\u65b9\u5f0f\uff1a<code>&lt;img&gt;</code> \u6807\u7b7e\u3001CSS \u80cc\u666f\u548c<strong>\u5185\u8054 SVG</strong>\u3002\u5185\u8054 SVG \u901a\u5e38\u662f\u6700\u4f73\u9009\u62e9\uff0c\u56e0\u4e3a\u5b83\u8ba9\u60a8\u5b8c\u5168\u63a7\u5236\u6837\u5f0f\u3001\u52a8\u753b\u548c\u65e0\u969c\u788d\u8bbf\u95ee\u3002',
    p1_2: '<strong>\u5185\u8054 SVG \u4f18\u52bf\uff1a</strong>\u53ef\u4ee5\u7528 CSS \u6216 Tailwind \u7c7b\u5355\u72ec\u8bbe\u7f6e\u8def\u5f84\u6837\u5f0f\uff0c\u52a8\u753b SVG \u7684\u5404\u90e8\u5206\uff0c\u901a\u8fc7 props \u52a8\u6001\u66f4\u6539\u989c\u8272\uff0c\u6dfb\u52a0\u6b63\u786e\u7684 ARIA \u5c5e\u6027\u4ee5\u4f9b\u5c4f\u5e55\u9605\u8bfb\u5668\u4f7f\u7528\u3002',
    p1_3: '<strong>\u4f55\u65f6\u4f7f\u7528 <code>&lt;img&gt;</code>\uff1a</strong>\u5927\u578b\u3001\u590d\u6742\u7684 SVG\uff08\u5730\u56fe\u3001\u8be6\u7ec6\u63d2\u56fe\uff09\u4e0d\u9700\u8981\u52a8\u6001\u6837\u5f0f\u65f6\u3002\u6d4f\u89c8\u5668\u53ef\u4ee5\u5355\u72ec\u7f13\u5b58\u8fd9\u4e9b\u6587\u4ef6\uff0c\u4e14\u4e0d\u4f1a\u589e\u5927 JS \u5305\u4f53\u79ef\u3002',
    h2_2: '2. \u5c5e\u6027\u8f6c\u6362\uff1aHTML \u5230 JSX',
    p2_1: '\u5c06 SVG \u79fb\u5165 JSX \u65f6\u6700\u5927\u7684\u75db\u70b9\u662f<strong>\u5c5e\u6027\u540d\u79f0\u8f6c\u6362</strong>\u3002HTML \u5c5e\u6027\u4f7f\u7528\u77ed\u6a2a\u7ebf\u5f0f\uff0c\u4f46 JSX \u9700\u8981\u9a7c\u5cf0\u547d\u540d\u3002\u4ee5\u4e0b\u662f\u6700\u5e38\u89c1\u7684\u8f6c\u6362\uff1a',
    p2_table_from: 'SVG / HTML',
    p2_table_to: 'JSX',
    p2_2: '\u54ea\u6015\u9057\u6f0f\u4e00\u4e2a\u8f6c\u6362\u90fd\u4f1a\u89e6\u53d1 React \u63a7\u5236\u53f0\u8b66\u544a\uff0c\u5e76\u53ef\u80fd\u5bfc\u81f4\u6e32\u67d3\u95ee\u9898\u3002',
    h2_3: '3. \u5220\u9664\u4e0d\u5fc5\u8981\u7684\u5c5e\u6027',
    p3_1: '\u4ece Figma\u3001Sketch \u6216 Illustrator \u7b49\u8bbe\u8ba1\u5de5\u5177\u5bfc\u51fa\u7684 SVG \u6587\u4ef6\u901a\u5e38\u5305\u542b\u5728\u6d4f\u89c8\u5668\u4e2d\u6beb\u65e0\u7528\u5904\u7684<strong>\u5143\u6570\u636e\u548c\u7f16\u8f91\u5668\u7279\u5b9a\u5c5e\u6027</strong>\uff1a',
    p3_list: '<li><code>xmlns</code> \u2014 \u5728 HTML5 \u5185\u8054 SVG \u65f6\u4e0d\u9700\u8981</li><li><code>xml:space</code> \u2014 \u5df2\u5e9f\u5f03\uff0c\u7528 CSS white-space \u4ee3\u66ff</li><li><code>data-name</code> \u2014 \u7f16\u8f91\u5668\u56fe\u5c42\u540d\u79f0</li><li><code>&lt;!-- \u6ce8\u91ca --&gt;</code> \u2014 \u7f16\u8f91\u5668\u6ce8\u91ca</li><li><code>id</code> \u5c5e\u6027 \u2014 \u901a\u5e38\u662f\u81ea\u52a8\u751f\u6210\u7684\uff0c\u53ef\u80fd\u5bfc\u81f4\u51b2\u7a81</li><li><code>style</code> \u5c5e\u6027 \u2014 \u6700\u597d\u8f6c\u6362\u4e3a className \u6216 Tailwind</li>',
    p3_2: '\u5220\u9664\u8fd9\u4e9b\u5197\u4f59\u5185\u5bb9\u5728\u5f88\u591a\u60c5\u51b5\u4e0b\u53ef\u4ee5\u5c06 SVG \u5927\u5c0f\u51cf\u5c11 <strong>20\u201340%</strong>\u3002',
    h2_4: '4. \u521b\u5efa\u53ef\u590d\u7528\u7684 SVG \u7ec4\u4ef6',
    p4_1: '\u6e05\u7406\u5b8c SVG \u540e\uff0c\u5c06\u5176\u5305\u88c5\u5728\u6b63\u786e\u7684 React \u7ec4\u4ef6\u4e2d\u3002\u4e00\u4e2a\u597d\u7684 SVG \u7ec4\u4ef6\u5e94\u8be5\u63a5\u53d7 <code>size</code>\u3001<code>color</code> \u548c\u6807\u51c6 SVG \u5c5e\u6027\uff1a',
    p4_2: '\u8fd9\u79cd\u6a21\u5f0f\u8ba9\u60a8\u50cf\u4f7f\u7528\u5176\u4ed6\u7ec4\u4ef6\u4e00\u6837\u4f7f\u7528\u56fe\u6807\uff1a<code>&lt;CheckIcon size={24} className="text-green-500" /&gt;</code>\u3002',
    h2_5: '5. Props \u8f6c\u53d1\u548c\u7075\u6d3b\u6027',
    p5_1: '\u4f7f\u7528 <code>React.SVGProps&lt;SVGSVGElement&gt;</code> \u548c\u5c55\u5f00\u8fd0\u7b97\u7b26\u8ba9\u4f7f\u7528\u8005\u53ef\u4ee5\u5411\u7ec4\u4ef6\u4f20\u9012<strong>\u4efb\u4f55\u6709\u6548\u7684 SVG \u5c5e\u6027</strong>\u2014\u2014\u4e8b\u4ef6\u5904\u7406\u5668\u3001data \u5c5e\u6027\u3001ARIA \u5c5e\u6027\u7b49\uff1a',
    p5_2: '<strong>\u63d0\u793a\uff1a</strong>\u59cb\u7ec8\u5c06\u5c55\u5f00\u7684 <code>{{...props}}</code> \u653e\u5728\u9ed8\u8ba4\u5c5e\u6027\u4e4b\u540e\uff0c\u8fd9\u6837\u4f7f\u7528\u8005\u53ef\u4ee5\u5728\u9700\u8981\u65f6\u8986\u76d6\u9ed8\u8ba4\u503c\u3002',
    h2_6: '6. \u65e0\u969c\u788d\u8bbf\u95ee\u6700\u4f73\u5b9e\u8df5',
    p6_1: 'SVG \u56fe\u6807\u901a\u5e38\u5bf9\u5c4f\u5e55\u9605\u8bfb\u5668\u4e0d\u53ef\u89c1\uff0c\u9664\u975e\u60a8\u6dfb\u52a0\u6b63\u786e\u7684 ARIA \u5c5e\u6027\u3002\u8bf7\u9075\u5faa\u4ee5\u4e0b\u89c4\u5219\uff1a',
    p6_list: '<li><strong>\u88c5\u9970\u6027\u56fe\u6807</strong>\uff08\u6587\u5b57\u6807\u7b7e\u65c1\uff09\uff1a\u6dfb\u52a0 <code>aria-hidden="true"</code> \u548c <code>focusable="false"</code></li><li><strong>\u6709\u610f\u4e49\u7684\u56fe\u6807</strong>\uff08\u72ec\u7acb\u4f7f\u7528\uff0c\u65e0\u6587\u5b57\uff09\uff1a\u6dfb\u52a0 <code>role="img"</code> \u548c <code>aria-label="\u63cf\u8ff0"</code></li><li><strong>\u4ea4\u4e92\u5f0f\u56fe\u6807</strong>\uff08\u5728\u6309\u94ae\u5185\uff09\uff1a\u6309\u94ae\u5e94\u6709 <code>aria-label</code>\uff0cSVG \u8bbe\u7f6e <code>aria-hidden="true"</code></li>',
    p6_2: '\u4e00\u4e2a\u7ed3\u6784\u826f\u597d\u7684\u65e0\u969c\u788d\u56fe\u6807\u7ec4\u4ef6\u4f1a\u81ea\u52a8\u5904\u7406\u8fd9\u4e9b\uff1a',
    h2_7: '7. \u5de5\u5177\u63a8\u8350\uff1aSVG \u8f6c JSX \u8f6c\u6362\u5668',
    p7_1: '\u624b\u52a8\u8f6c\u6362 SVG \u5c5e\u6027\u548c\u6e05\u7406\u6807\u8bb0\u65e2\u7e41\u7410\u53c8\u5bb9\u6613\u51fa\u9519\u3002\u6211\u4eec\u7684 <strong>SVG \u8f6c JSX \u8f6c\u6362\u5668</strong>\u81ea\u52a8\u5904\u7406\u6240\u6709\u8fd9\u4e9b\uff1a',
    p7_list: '<li>\u5c06\u6240\u6709 HTML \u5c5e\u6027\u8f6c\u6362\u4e3a\u9a7c\u5cf0\u547d\u540d\u7684 JSX \u7b49\u6548\u5c5e\u6027</li><li>\u5220\u9664\u4e0d\u5fc5\u8981\u7684\u5143\u6570\u636e\u548c\u7f16\u8f91\u5668\u5c5e\u6027</li><li>\u5c06\u8f93\u51fa\u683c\u5f0f\u5316\u4e3a\u5e72\u51c0\u7684 React \u7ec4\u4ef6</li><li>\u4fdd\u7559 viewBox \u548c\u5fc5\u8981\u7684 SVG \u7ed3\u6784</li>',
    p7_2: '\u7c98\u8d34\u539f\u59cb SVG\uff0c\u51e0\u79d2\u5185\u5373\u53ef\u83b7\u5f97\u53ef\u7528\u4e8e\u751f\u4ea7\u7684 JSX \u7ec4\u4ef6\u3002',
    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: '\u5e94\u8be5\u4f7f\u7528\u5185\u8054 SVG \u8fd8\u662f SVG sprite \u7cfb\u7edf\uff1f',
    faq1_a: '\u5bf9\u4e8e\u4e2d\u5c0f\u578b\u9879\u76ee\uff0850 \u4e2a\u56fe\u6807\u4ee5\u4e0b\uff09\uff0c\u5185\u8054 SVG \u7ec4\u4ef6\u66f4\u7b80\u5355\u3001\u66f4\u7075\u6d3b\u3002\u5bf9\u4e8e\u5927\u578b\u56fe\u6807\u5e93\uff0c\u53ef\u4ee5\u8003\u8651\u4f7f\u7528 SVG sprite \u914d\u5408 <code>&lt;use&gt;</code> \u5f15\u7528\u6765\u51cf\u5c0f\u5305\u4f53\u79ef\u3002\u4e24\u79cd\u65b9\u6cd5\u90fd\u80fd\u4e0e React \u5f88\u597d\u5730\u914d\u5408\u3002',
    faq2_q: '\u5185\u8054 SVG \u4f1a\u589e\u52a0 JavaScript \u5305\u4f53\u79ef\u5417\uff1f',
    faq2_a: '\u662f\u7684\uff0c\u6bcf\u4e2a\u5185\u8054 SVG \u90fd\u4f1a\u589e\u52a0\u7ec4\u4ef6\u7684 JS \u5305\u5927\u5c0f\u3002\u5bf9\u4e8e\u5c0f\u56fe\u6807\uff08\u6bcf\u4e2a 1KB \u4ee5\u4e0b\uff09\u5f71\u54cd\u53ef\u4ee5\u5ffd\u7565\u3002\u5bf9\u4e8e\u5927\u578b\u3001\u590d\u6742\u7684 SVG\uff0c\u8003\u8651\u4f7f\u7528 <code>&lt;img&gt;</code> \u6807\u7b7e\u6216\u52a8\u6001\u5bfc\u5165\u4ee5\u4fdd\u6301\u521d\u59cb\u5305\u4f53\u79ef\u8f83\u5c0f\u3002',
    faq3_q: '\u53ef\u4ee5\u5728 React \u4e2d\u5bf9\u5185\u8054 SVG \u505a\u52a8\u753b\u5417\uff1f',
    faq3_a: '\u5f53\u7136\u53ef\u4ee5\u3002\u5185\u8054 SVG \u8ba9\u60a8\u5b8c\u5168\u8bbf\u95ee\u6bcf\u4e2a\u5143\u7d20\u3002\u60a8\u53ef\u4ee5\u4f7f\u7528 CSS transitions\u3001CSS animations\u3001Framer Motion \u6216 React Spring \u6765\u52a8\u753b\u5316\u8def\u5f84\u3001\u7ec4\u548c\u5c5e\u6027\u3002\u8fd9\u662f\u76f8\u6bd4 <code>&lt;img&gt;</code> \u65b9\u5f0f\u7684\u5173\u952e\u4f18\u52bf\u4e4b\u4e00\u3002',
  },
};

export default function SvgOptimizationReact({ lang }: { lang: string }) {
  const tx = t[lang] || t['en'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: tx.faq1_q, acceptedAnswer: { '@type': 'Answer', text: tx.faq1_a } },
      { '@type': 'Question', name: tx.faq2_q, acceptedAnswer: { '@type': 'Answer', text: tx.faq2_a } },
      { '@type': 'Question', name: tx.faq3_q, acceptedAnswer: { '@type': 'Answer', text: tx.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: tx.intro }} />

      <p>
        <Link href={`/${lang}/tools/svg-to-jsx`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      <h2>{tx.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_1 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_2 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_3 }} />

      <h2>{tx.h2_2}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_1 }} />
      <table>
        <thead>
          <tr><th>{tx.p2_table_from}</th><th>{tx.p2_table_to}</th></tr>
        </thead>
        <tbody>
          <tr><td><code>class</code></td><td><code>className</code></td></tr>
          <tr><td><code>fill-rule</code></td><td><code>fillRule</code></td></tr>
          <tr><td><code>clip-path</code></td><td><code>clipPath</code></td></tr>
          <tr><td><code>clip-rule</code></td><td><code>clipRule</code></td></tr>
          <tr><td><code>stroke-width</code></td><td><code>strokeWidth</code></td></tr>
          <tr><td><code>stroke-linecap</code></td><td><code>strokeLinecap</code></td></tr>
          <tr><td><code>stroke-linejoin</code></td><td><code>strokeLinejoin</code></td></tr>
          <tr><td><code>font-size</code></td><td><code>fontSize</code></td></tr>
          <tr><td><code>text-anchor</code></td><td><code>textAnchor</code></td></tr>
          <tr><td><code>xlink:href</code></td><td><code>xlinkHref</code></td></tr>
        </tbody>
      </table>
      <p>{tx.p2_2}</p>

      <h2>{tx.h2_3}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_1 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p3_list }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p3_2 }} />

      <h2>{tx.h2_4}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_1 }} />
      <pre><code>{`interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

function CheckIcon({ size = 24, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_2 }} />

      <h2>{tx.h2_5}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_1 }} />
      <pre><code>{`<CheckIcon
  size={32}
  color="#22c55e"
  onClick={() => console.log('clicked')}
  data-testid="check-icon"
  aria-label="Confirmed"
  role="img"
/>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_2 }} />

      <h2>{tx.h2_6}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p6_1 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p6_list }} />
      <p>{tx.p6_2}</p>
      <pre><code>{`function Icon({ label, ...props }: IconProps & { label?: string }) {
  if (label) {
    return (
      <svg role="img" aria-label={label} {...props}>
        {/* paths */}
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" focusable="false" {...props}>
      {/* paths */}
    </svg>
  );
}`}</code></pre>

      <h2>{tx.h2_7}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p7_1 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p7_list }} />
      <p>{tx.p7_2}</p>
      <p>
        <Link href={`/${lang}/tools/svg-to-jsx`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      <h2>{tx.h2_faq}</h2>
      <h3>{tx.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.faq1_a }} />
      <h3>{tx.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.faq2_a }} />
      <h3>{tx.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.faq3_a }} />
    </>
  );
}
