import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Tailwind CSS has become one of the most popular CSS frameworks, offering a <strong>utility-first approach</strong> that eliminates the need for custom class names and separate stylesheet files. If you\'re considering migrating an existing project from traditional CSS to Tailwind, this guide walks you through the process.',
    linkTool: 'Convert CSS to Tailwind classes instantly with our free tool \u2192',
    h2Why: 'Why Migrate to Tailwind?',
    whyDesc: 'Traditional CSS tends to grow unbounded over time. Every new feature adds more classes, specificity battles emerge, and dead CSS accumulates. Tailwind solves these problems:',
    whyList: '<ul><li><strong>No naming fatigue</strong> \u2014 stop inventing class names like <code>.card-wrapper-inner-header-left</code></li><li><strong>Automatic dead-code removal</strong> \u2014 Tailwind purges unused classes in production, resulting in tiny CSS bundles</li><li><strong>Consistent spacing and sizing</strong> \u2014 the design system is built into the utility classes</li><li><strong>Co-located styles</strong> \u2014 styles live in the component markup, making refactoring safer</li><li><strong>Responsive design built-in</strong> \u2014 prefix any utility with <code>sm:</code>, <code>md:</code>, <code>lg:</code> for breakpoints</li></ul>',
    h2Common: 'Common Property Mappings',
    commonDesc: 'Here are the most frequently used CSS properties and their Tailwind equivalents:',
    commonTable: '<table><thead><tr><th>CSS</th><th>Tailwind</th></tr></thead><tbody><tr><td><code>display: flex</code></td><td><code>flex</code></td></tr><tr><td><code>display: grid</code></td><td><code>grid</code></td></tr><tr><td><code>display: none</code></td><td><code>hidden</code></td></tr><tr><td><code>position: relative</code></td><td><code>relative</code></td></tr><tr><td><code>position: absolute</code></td><td><code>absolute</code></td></tr><tr><td><code>margin: 0 auto</code></td><td><code>mx-auto</code></td></tr><tr><td><code>padding: 16px</code></td><td><code>p-4</code></td></tr><tr><td><code>font-size: 14px</code></td><td><code>text-sm</code></td></tr><tr><td><code>font-weight: 700</code></td><td><code>font-bold</code></td></tr><tr><td><code>text-align: center</code></td><td><code>text-center</code></td></tr><tr><td><code>border-radius: 8px</code></td><td><code>rounded-lg</code></td></tr><tr><td><code>width: 100%</code></td><td><code>w-full</code></td></tr><tr><td><code>cursor: pointer</code></td><td><code>cursor-pointer</code></td></tr></tbody></table>',
    h2Responsive: 'Responsive Design',
    responsiveDesc: 'One of Tailwind\'s biggest advantages is how intuitive responsive design becomes. Instead of writing media queries, you prefix utilities with breakpoint modifiers:',
    responsiveNote: 'Tailwind uses a <strong>mobile-first</strong> approach. Unprefixed utilities apply to all screen sizes. Breakpoint prefixes (<code>sm:</code>, <code>md:</code>, <code>lg:</code>, <code>xl:</code>, <code>2xl:</code>) apply at that breakpoint <em>and above</em>.',
    h2Colors: 'Colors and Spacing',
    colorsDesc: 'Tailwind provides a consistent spacing scale and color palette out of the box:',
    colorsSpacing: '<strong>Spacing scale:</strong> Tailwind uses a 4px base unit. <code>p-1</code> = 4px, <code>p-2</code> = 8px, <code>p-4</code> = 16px, <code>p-8</code> = 32px. Use arbitrary values with square brackets: <code>p-[13px]</code> for non-standard values.',
    colorsColors: '<strong>Colors:</strong> Use the built-in palette (<code>text-blue-500</code>, <code>bg-gray-100</code>) or arbitrary values (<code>text-[#1a73e8]</code>, <code>bg-[rgb(255,0,0)]</code>). Opacity modifiers work inline: <code>bg-black/50</code> for 50% opacity.',
    h2Flex: 'Flexbox and Grid Conversion',
    flexDesc: 'Flexbox and Grid layouts are where Tailwind really shines. Here\'s how common layout patterns translate:',
    h2When: 'When Not to Convert',
    whenDesc: 'Tailwind is powerful, but there are cases where keeping traditional CSS makes more sense:',
    whenList: '<ul><li><strong>Complex animations</strong> \u2014 multi-step <code>@keyframes</code> animations are better in CSS files</li><li><strong>Highly dynamic styles</strong> \u2014 when style values come from JavaScript variables, inline styles or CSS custom properties may be simpler</li><li><strong>Third-party component libraries</strong> \u2014 overriding styles in libraries like Material UI or Ant Design often requires traditional CSS</li><li><strong>Print stylesheets</strong> \u2014 complex print layouts are easier to manage in dedicated CSS</li><li><strong>Very large legacy projects</strong> \u2014 migrating incrementally (component by component) is better than a big-bang rewrite</li></ul>',
    h2Tool: 'Automate the Conversion',
    toolDesc: 'Manually translating CSS properties to Tailwind classes is time-consuming, especially for large stylesheets. Our <strong>CSS to Tailwind</strong> converter instantly maps your CSS to the equivalent Tailwind utility classes, saving you hours of manual work.',
    linkToolBottom: 'Try the CSS to Tailwind converter now \u2192',
  },
  zh: {
    intro: 'Tailwind CSS 已成为最流行的 CSS 框架之一，它提供了<strong>实用优先的方法</strong>，消除了对自定义类名和独立样式表文件的需求。如果你正在考虑将现有项目从传统 CSS 迁移到 Tailwind，本指南将帮助你完成这个过程。',
    linkTool: '使用我们的免费工具即时将 CSS 转换为 Tailwind 类 \u2192',
    h2Why: '为什么要迁移到 Tailwind？',
    whyDesc: '传统 CSS 往往随时间无限增长。每个新功能都会添加更多类，出现优先级冲突，死代码不断积累。Tailwind 解决了这些问题：',
    whyList: '<ul><li><strong>告别命名疲劳</strong>——不再发明像 <code>.card-wrapper-inner-header-left</code> 这样的类名</li><li><strong>自动移除死代码</strong>——Tailwind 在生产环境中清除未使用的类，生成极小的 CSS 包</li><li><strong>一致的间距和尺寸</strong>——设计系统内置于工具类中</li><li><strong>样式就近放置</strong>——样式在组件标记中，使重构更安全</li><li><strong>内置响应式设计</strong>——用 <code>sm:</code>、<code>md:</code>、<code>lg:</code> 为任何工具类添加断点前缀</li></ul>',
    h2Common: '常见属性映射',
    commonDesc: '以下是最常用的 CSS 属性及其 Tailwind 等价物：',
    commonTable: '<table><thead><tr><th>CSS</th><th>Tailwind</th></tr></thead><tbody><tr><td><code>display: flex</code></td><td><code>flex</code></td></tr><tr><td><code>display: grid</code></td><td><code>grid</code></td></tr><tr><td><code>display: none</code></td><td><code>hidden</code></td></tr><tr><td><code>position: relative</code></td><td><code>relative</code></td></tr><tr><td><code>position: absolute</code></td><td><code>absolute</code></td></tr><tr><td><code>margin: 0 auto</code></td><td><code>mx-auto</code></td></tr><tr><td><code>padding: 16px</code></td><td><code>p-4</code></td></tr><tr><td><code>font-size: 14px</code></td><td><code>text-sm</code></td></tr><tr><td><code>font-weight: 700</code></td><td><code>font-bold</code></td></tr><tr><td><code>text-align: center</code></td><td><code>text-center</code></td></tr><tr><td><code>border-radius: 8px</code></td><td><code>rounded-lg</code></td></tr><tr><td><code>width: 100%</code></td><td><code>w-full</code></td></tr><tr><td><code>cursor: pointer</code></td><td><code>cursor-pointer</code></td></tr></tbody></table>',
    h2Responsive: '响应式设计',
    responsiveDesc: 'Tailwind 最大的优势之一是响应式设计变得非常直观。无需编写媒体查询，只需为工具类添加断点修饰符前缀：',
    responsiveNote: 'Tailwind 采用<strong>移动优先</strong>策略。无前缀的工具类应用于所有屏幕尺寸。断点前缀（<code>sm:</code>、<code>md:</code>、<code>lg:</code>、<code>xl:</code>、<code>2xl:</code>）从该断点<em>及以上</em>生效。',
    h2Colors: '颜色和间距',
    colorsDesc: 'Tailwind 提供了开箱即用的一致间距刻度和颜色调色板：',
    colorsSpacing: '<strong>间距刻度：</strong>Tailwind 使用 4px 基础单位。<code>p-1</code> = 4px，<code>p-2</code> = 8px，<code>p-4</code> = 16px，<code>p-8</code> = 32px。使用方括号设置任意值：<code>p-[13px]</code> 用于非标准值。',
    colorsColors: '<strong>颜色：</strong>使用内置调色板（<code>text-blue-500</code>、<code>bg-gray-100</code>）或任意值（<code>text-[#1a73e8]</code>、<code>bg-[rgb(255,0,0)]</code>）。透明度修饰符可内联使用：<code>bg-black/50</code> 表示 50% 透明度。',
    h2Flex: 'Flexbox 和 Grid 转换',
    flexDesc: 'Flexbox 和 Grid 布局是 Tailwind 真正发光的地方。以下是常见布局模式的转换：',
    h2When: '何时不应转换',
    whenDesc: 'Tailwind 很强大，但在某些情况下保留传统 CSS 更合理：',
    whenList: '<ul><li><strong>复杂动画</strong>——多步 <code>@keyframes</code> 动画在 CSS 文件中更好处理</li><li><strong>高度动态的样式</strong>——当样式值来自 JavaScript 变量时，内联样式或 CSS 自定义属性可能更简单</li><li><strong>第三方组件库</strong>——覆盖 Material UI 或 Ant Design 等库的样式通常需要传统 CSS</li><li><strong>打印样式表</strong>——复杂的打印布局在专用 CSS 中更容易管理</li><li><strong>非常大的遗留项目</strong>——逐步迁移（逐个组件）比一次性重写更好</li></ul>',
    h2Tool: '自动化转换',
    toolDesc: '手动将 CSS 属性转换为 Tailwind 类非常耗时，特别是对于大型样式表。我们的 <strong>CSS to Tailwind</strong> 转换器可以即时将你的 CSS 映射为等效的 Tailwind 工具类，为你节省数小时的手动工作。',
    linkToolBottom: '立即试用 CSS to Tailwind 转换器 \u2192',
  },
};

export default function CssToTailwindMigration({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <p>
        <Link href={`/${lang}/tools/css-to-tailwind`} style={{ fontWeight: 600 }}>
          {s.linkTool}
        </Link>
      </p>

      <h2>{s.h2Why}</h2>
      <p>{s.whyDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.whyList }} />

      <h2>{s.h2Common}</h2>
      <p>{s.commonDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.commonTable }} />

      <pre><code>{`/* Traditional CSS */
.card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 0 auto;
  max-width: 640px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

<!-- Tailwind equivalent -->
<div class="flex flex-col p-4 mx-auto max-w-2xl bg-white rounded-lg shadow-sm">
  ...
</div>`}</code></pre>

      <h2>{s.h2Responsive}</h2>
      <p>{s.responsiveDesc}</p>

      <pre><code>{`/* Traditional CSS */
.container {
  padding: 8px;
  font-size: 14px;
}
@media (min-width: 768px) {
  .container {
    padding: 16px;
    font-size: 16px;
  }
}
@media (min-width: 1024px) {
  .container {
    padding: 24px;
    font-size: 18px;
  }
}

<!-- Tailwind equivalent -->
<div class="p-2 text-sm md:p-4 md:text-base lg:p-6 lg:text-lg">
  ...
</div>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.responsiveNote }} />

      <h2>{s.h2Colors}</h2>
      <p>{s.colorsDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: s.colorsSpacing }} />
      <p dangerouslySetInnerHTML={{ __html: s.colorsColors }} />

      <pre><code>{`/* CSS colors and spacing */
.alert {
  color: #dc2626;
  background-color: #fef2f2;
  padding: 12px 16px;
  border: 1px solid #fca5a5;
  border-radius: 6px;
}

<!-- Tailwind -->
<div class="text-red-600 bg-red-50 py-3 px-4 border border-red-300 rounded-md">
  ...
</div>

<!-- With arbitrary values when needed -->
<div class="text-[#dc2626] bg-[#fef2f2] p-[12px_16px] border border-[#fca5a5] rounded-[6px]">
  ...
</div>`}</code></pre>

      <h2>{s.h2Flex}</h2>
      <p>{s.flexDesc}</p>

      <pre><code>{`/* CSS: Centered flex container */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
<!-- Tailwind -->
<div class="flex justify-center items-center gap-4">

/* CSS: Space-between header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}
<!-- Tailwind -->
<header class="flex justify-between items-center py-4 px-6">

/* CSS: Responsive grid */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
<!-- Tailwind -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`}</code></pre>

      <h2>{s.h2When}</h2>
      <p>{s.whenDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.whenList }} />

      <h2>{s.h2Tool}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.toolDesc }} />

      <p>
        <Link href={`/${lang}/tools/css-to-tailwind`} style={{ fontWeight: 600 }}>
          {s.linkToolBottom}
        </Link>
      </p>
    </>
  );
}
