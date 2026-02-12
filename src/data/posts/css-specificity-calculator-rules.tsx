'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'CSS specificity is the algorithm browsers use to decide which CSS rule applies when multiple rules target the same element. Understanding <strong>CSS specificity</strong> is essential for writing maintainable stylesheets, debugging layout issues, and avoiding the dreaded <code>!important</code> hack. This comprehensive guide covers the specificity hierarchy, calculation methods, cascade layers, modern pseudo-classes, and battle-tested best practices.',
    linkCssMinifier: 'Optimize your CSS with our CSS Minifier tool →',
    linkTailwind: 'Explore colors for utility-first CSS with our Tailwind Colors tool →',

    h2_what: '1. What Is CSS Specificity?',
    whatDesc: 'Specificity is a weight assigned to a CSS selector that determines which declaration takes effect when multiple rules match the same element. It is NOT about source order alone — a more specific selector always wins, regardless of where it appears in the stylesheet.',
    whatExample: 'Consider this example where two rules target the same element:',
    whatExplain: 'Even though the second rule comes later in the source, the first rule wins because an ID selector (<code>#header</code>) has higher specificity than a class selector (<code>.site-header</code>). The browser calculates a specificity value for each selector and applies the declaration with the highest value.',

    h2_hierarchy: '2. The Specificity Hierarchy',
    hierarchyDesc: 'CSS specificity follows a strict hierarchy with four levels. From highest to lowest priority:',
    hierarchyInline: '<strong>Inline styles</strong> — Written directly in the HTML <code>style</code> attribute. Specificity: <code>(1,0,0,0)</code>',
    hierarchyId: '<strong>ID selectors</strong> — e.g., <code>#navbar</code>, <code>#main-content</code>. Specificity: <code>(0,1,0,0)</code>',
    hierarchyClass: '<strong>Class selectors, attribute selectors, pseudo-classes</strong> — e.g., <code>.btn</code>, <code>[type="text"]</code>, <code>:hover</code>, <code>:focus</code>, <code>:nth-child()</code>. Specificity: <code>(0,0,1,0)</code>',
    hierarchyElement: '<strong>Element selectors and pseudo-elements</strong> — e.g., <code>h1</code>, <code>div</code>, <code>::before</code>, <code>::after</code>. Specificity: <code>(0,0,0,1)</code>',
    hierarchyUniversal: 'The universal selector (<code>*</code>), combinators (<code>+</code>, <code>~</code>, <code>></code>, space), and the negation pseudo-class (<code>:not()</code>) itself do NOT add specificity. However, selectors inside <code>:not()</code> DO count.',

    h2_calculating: '3. Calculating Specificity — The (a,b,c) Notation',
    calculatingDesc: 'Specificity is commonly expressed as a tuple <code>(a, b, c)</code> where <strong>a</strong> = number of ID selectors, <strong>b</strong> = number of class selectors, attribute selectors, and pseudo-classes, and <strong>c</strong> = number of element selectors and pseudo-elements. Some documentation uses a four-part notation <code>(i, a, b, c)</code> where <strong>i</strong> represents inline styles.',
    calculatingExamples: 'Here are examples showing how to calculate specificity step by step:',
    calculatingCompare: '<strong>Comparing specificity:</strong> Compare from left to right. A higher number in an earlier position always wins. <code>(1,0,0)</code> beats <code>(0,15,15)</code> because 1 ID outweighs any number of classes or elements. There is no "carry over" — 15 classes do NOT equal 1 ID.',

    h2_table: '4. Specificity Examples Table — 15+ Selectors Ranked',
    tableDesc: 'The following table ranks common CSS selectors from lowest to highest specificity:',
    tableHeader: '<table><thead><tr><th>#</th><th>Selector</th><th>Specificity (a,b,c)</th><th>Category</th></tr></thead><tbody>',
    tableRows: '<tr><td>1</td><td><code>*</code></td><td>(0,0,0)</td><td>Universal</td></tr><tr><td>2</td><td><code>div</code></td><td>(0,0,1)</td><td>Element</td></tr><tr><td>3</td><td><code>ul li</code></td><td>(0,0,2)</td><td>2 elements</td></tr><tr><td>4</td><td><code>ul ol + li</code></td><td>(0,0,3)</td><td>3 elements</td></tr><tr><td>5</td><td><code>h1 + p::first-line</code></td><td>(0,0,3)</td><td>2 elements + 1 pseudo-element</td></tr><tr><td>6</td><td><code>.btn</code></td><td>(0,1,0)</td><td>1 class</td></tr><tr><td>7</td><td><code>li.active</code></td><td>(0,1,1)</td><td>1 class + 1 element</td></tr><tr><td>8</td><td><code>[type="text"]</code></td><td>(0,1,0)</td><td>1 attribute</td></tr><tr><td>9</td><td><code>a:hover</code></td><td>(0,1,1)</td><td>1 pseudo-class + 1 element</td></tr><tr><td>10</td><td><code>div.container p.text</code></td><td>(0,2,2)</td><td>2 classes + 2 elements</td></tr><tr><td>11</td><td><code>.nav .nav-item .nav-link</code></td><td>(0,3,0)</td><td>3 classes</td></tr><tr><td>12</td><td><code>#header</code></td><td>(1,0,0)</td><td>1 ID</td></tr><tr><td>13</td><td><code>#header .logo</code></td><td>(1,1,0)</td><td>1 ID + 1 class</td></tr><tr><td>14</td><td><code>#header nav ul li.active a</code></td><td>(1,1,4)</td><td>1 ID + 1 class + 4 elements</td></tr><tr><td>15</td><td><code>#main #sidebar .widget</code></td><td>(2,1,0)</td><td>2 IDs + 1 class</td></tr><tr><td>16</td><td><code>#a #b #c .x .y .z</code></td><td>(3,3,0)</td><td>3 IDs + 3 classes</td></tr></tbody></table>',

    h2_important: '5. !important — What It Does, Why to Avoid, When Acceptable',
    importantDesc: 'The <code>!important</code> declaration overrides normal specificity calculations entirely. A rule with <code>!important</code> beats any rule without it, regardless of specificity scores.',
    importantSyntax: 'Syntax:',
    importantWhy: '<strong>Why to avoid <code>!important</code>:</strong>',
    importantReasons: '<ul><li>It breaks the natural cascade and makes debugging extremely difficult.</li><li>It creates an escalation war — once you use <code>!important</code>, the only way to override it is with another <code>!important</code> combined with equal or higher specificity.</li><li>It makes refactoring dangerous because removing one <code>!important</code> can break styles elsewhere.</li><li>It makes stylesheets unmaintainable at scale.</li></ul>',
    importantWhen: '<strong>When <code>!important</code> is acceptable:</strong>',
    importantAcceptable: '<ul><li><strong>Utility classes:</strong> Frameworks like Tailwind CSS use <code>!important</code> on utility classes to ensure they always override component styles (e.g., <code>.hidden { display: none !important; }</code>).</li><li><strong>Overriding third-party CSS:</strong> When you cannot modify vendor styles and specificity alone is not sufficient.</li><li><strong>Accessibility overrides:</strong> User stylesheets for high contrast or large text may legitimately use <code>!important</code>.</li><li><strong>Email HTML:</strong> Some email clients require <code>!important</code> to override their default styles.</li></ul>',
    importantOrder: '<strong>Priority order with <code>!important</code>:</strong> Normal author styles → <code>!important</code> author styles → <code>!important</code> user styles → <code>!important</code> user-agent (browser) styles. Transition declarations and animation declarations have their own special handling in the cascade.',

    h2_layers: '6. Cascade Layers — @layer',
    layersDesc: 'CSS Cascade Layers (introduced in 2022, supported in all modern browsers) add a new dimension to the cascade that sits between specificity and source order. Layers let you control which groups of styles take priority without wrestling with specificity.',
    layersSyntax: 'Basic Syntax:',
    layersOrder: '<strong>Layer order matters:</strong> Layers declared later have higher priority. In the example above, <code>utilities</code> styles override <code>components</code> styles, which override <code>base</code> styles — regardless of specificity within each layer.',
    layersInteraction: '<strong>How layers interact with specificity:</strong>',
    layersRules: '<ul><li>Styles in a higher-priority layer always beat styles in a lower-priority layer, even if the lower layer has higher specificity.</li><li>Within the same layer, normal specificity rules apply.</li><li>Unlayered styles have the highest priority among normal (non-<code>!important</code>) styles.</li><li>With <code>!important</code>, the order reverses: <code>!important</code> in an earlier (lower-priority) layer beats <code>!important</code> in a later (higher-priority) layer.</li></ul>',
    layersExample: 'Practical example:',

    h2_where_is: '7. :where() and :is() — Specificity Control',
    whereIsDesc: 'The <code>:where()</code> and <code>:is()</code> pseudo-classes accept a selector list and match any element that matches at least one of the selectors. The critical difference is how they affect specificity.',
    whereTitle: '<strong>:where() — Zero Specificity</strong>',
    whereDesc: '<code>:where()</code> always contributes <strong>zero specificity</strong>, no matter what selectors are inside it. This makes it perfect for writing easily-overridable base styles.',
    isTitle: '<strong>:is() — Takes the Highest Argument\'s Specificity</strong>',
    isDesc: '<code>:is()</code> takes the specificity of its <strong>most specific argument</strong>. If one of the selectors inside <code>:is()</code> is an ID, the entire <code>:is()</code> gets ID-level specificity.',
    whereIsComparison: 'Comparison example:',
    whereIsUseCase: '<strong>When to use which:</strong> Use <code>:where()</code> for reset styles, default themes, and library CSS that consumers should easily override. Use <code>:is()</code> for grouping selectors when you want to maintain normal specificity.',

    h2_not_has: '8. :not() and :has() — Specificity of Negation and Relational Pseudo-Classes',
    notDesc: '<code>:not()</code> itself adds zero specificity, but its argument contributes its full specificity. This is the same behavior as <code>:is()</code>.',
    hasDesc: '<code>:has()</code> (the "parent selector") also contributes the specificity of its most specific argument, just like <code>:is()</code> and <code>:not()</code>.',
    notHasExamples: 'Examples:',
    notHasWarning: '<strong>Important:</strong> A common mistake is thinking <code>:not()</code> adds no specificity. In fact, <code>div:not(.active)</code> has specificity <code>(0,1,1)</code> — the <code>.active</code> inside <code>:not()</code> adds class-level specificity.',

    h2_inline: '9. Inline Styles vs Stylesheet — Specificity Value (1,0,0,0)',
    inlineDesc: 'Inline styles written directly in the HTML <code>style</code> attribute have a specificity of <code>(1,0,0,0)</code> in the four-part notation. This means they override any selector-based rule, no matter how many IDs, classes, or elements it contains.',
    inlineExample: 'Example:',
    inlineOverride: '<strong>How to override inline styles from a stylesheet:</strong>',
    inlineOverrideList: '<ul><li>Use <code>!important</code> in your stylesheet rule (generally discouraged).</li><li>Use JavaScript to remove or modify the inline style.</li><li>Use a cascade layer with <code>!important</code> for controlled overriding.</li><li>Avoid inline styles in the first place — use classes instead.</li></ul>',
    inlineWarning: '<strong>Why to avoid inline styles:</strong> They cannot be overridden without <code>!important</code>, they mix concerns (HTML structure with CSS presentation), they cannot use pseudo-classes or pseudo-elements, they cannot use media queries, and they are difficult to maintain at scale.',

    h2_battles: '10. Common Specificity Battles',
    battlesDesc: 'In real-world projects, you frequently encounter specificity conflicts. Here are the most common scenarios and how to resolve them:',
    battle1Title: 'Overriding Framework Styles (Bootstrap, Material UI)',
    battle1Desc: 'CSS frameworks often use moderately specific selectors. When your custom styles do not apply, it is usually because the framework selector has higher specificity.',
    battle2Title: 'Third-Party Widget CSS',
    battle2Desc: 'Embedded widgets (chat plugins, payment forms, social embeds) often inject highly specific CSS. Strategies for overriding:',
    battle3Title: 'Specificity in CSS-in-JS',
    battle3Desc: 'Libraries like styled-components and Emotion generate unique class names with specificity <code>(0,1,0)</code>. When these conflict with global styles:',
    battle4Title: 'Dark Mode Toggle Battles',
    battle4Desc: 'Dark mode implementations often create specificity issues when theme selectors compete with component selectors:',

    h2_best: '11. Best Practices for Managing Specificity',
    bestDesc: 'Follow these proven strategies to keep specificity manageable across projects of any size:',
    best1Title: 'BEM Methodology',
    best1Desc: 'BEM (Block, Element, Modifier) keeps specificity flat by using single-class selectors. Every selector has specificity <code>(0,1,0)</code>.',
    best2Title: 'Avoid Deep Nesting',
    best2Desc: 'Deeply nested selectors create high specificity and fragile styles. Keep your selector depth to a maximum of 3 levels.',
    best3Title: 'Utility-First Approach',
    best3Desc: 'Utility-first CSS (Tailwind, UnoCSS) avoids specificity issues entirely by applying single-purpose classes directly in HTML. Every utility has specificity <code>(0,1,0)</code>, and ordering is controlled by the stylesheet generation order.',
    best4Title: 'Use Cascade Layers',
    best4Desc: 'Organize your CSS into layers to create predictable override behavior without increasing specificity:',
    best5Title: 'Specificity Audit Checklist',
    best5List: '<ul><li>Avoid ID selectors in stylesheets — use classes instead.</li><li>Keep selector depth to 3 or fewer levels.</li><li>Never use <code>!important</code> unless in a utility class or for third-party overrides.</li><li>Use <code>:where()</code> for base/reset styles.</li><li>Use cascade layers (<code>@layer</code>) for large projects.</li><li>Prefer single-class selectors (BEM pattern).</li><li>Use your browser DevTools specificity indicators to debug conflicts.</li></ul>',

    h2_faq: '12. Frequently Asked Questions',
    faq1_q: 'How is CSS specificity calculated?',
    faq1_a: 'CSS specificity is calculated as a tuple (a, b, c): count the number of ID selectors (a), class selectors, attribute selectors, and pseudo-classes (b), and element selectors and pseudo-elements (c). Compare from left to right — a higher number in an earlier position always wins. For example, one ID selector (1,0,0) beats any number of class selectors (0,n,0).',
    faq2_q: 'Does !important override specificity?',
    faq2_a: 'Yes, !important overrides normal specificity entirely. A rule with !important beats any rule without it, regardless of selector specificity. However, when two rules both have !important, the normal specificity comparison applies between them. Cascade layers add another dimension: !important in an earlier layer beats !important in a later layer.',
    faq3_q: 'What is the specificity of :where() vs :is()?',
    faq3_a: ':where() always has zero specificity, regardless of its arguments. :is() takes the specificity of its most specific argument. For example, :where(#id, .class) has specificity (0,0,0), while :is(#id, .class) has specificity (1,0,0) because the #id argument has the highest specificity among its arguments.',
    faq4_q: 'Can 256 classes override one ID selector?',
    faq4_a: 'No. This is a common myth. In all modern browsers, specificity categories do not overflow into each other. No number of class selectors can ever override a single ID selector. The (a,b,c) values are compared independently from left to right, not as a single concatenated number. Older browsers (IE6 era) had a bug where 256 classes could overflow, but this has not been the case since approximately 2012.',
    faq5_q: 'How do cascade layers affect specificity?',
    faq5_a: 'Cascade layers (@layer) introduce a priority system that sits above specificity in the cascade. Styles in a higher-priority layer always win over styles in a lower-priority layer, regardless of specificity. Within the same layer, normal specificity rules apply. Unlayered styles beat all layered styles. For !important rules, the order reverses: earlier layers beat later layers.',

    conclusion: 'Mastering CSS specificity is fundamental to writing clean, predictable stylesheets. Use flat selectors, avoid IDs in CSS, leverage cascade layers and :where() for override control, and reserve !important for true edge cases. With these principles, specificity battles become a thing of the past.',
    linkCssMinifierBottom: 'Minify and optimize your CSS with our CSS Minifier →',
    linkTailwindBottom: 'Browse Tailwind color palettes with our Tailwind Colors tool →',
  },
  zh: {
    intro: 'CSS 特异性（Specificity）是浏览器用来决定当多条规则作用于同一元素时，哪条 CSS 规则生效的算法。理解 <strong>CSS 特异性</strong>对于编写可维护的样式表、调试布局问题以及避免滥用 <code>!important</code> 至关重要。本综合指南涵盖特异性层级、计算方法、级联层、现代伪类以及经过实战验证的最佳实践。',
    linkCssMinifier: '使用我们的 CSS 压缩工具优化你的 CSS →',
    linkTailwind: '使用我们的 Tailwind 颜色工具探索实用优先 CSS 的颜色 →',

    h2_what: '1. 什么是 CSS 特异性？',
    whatDesc: '特异性是分配给 CSS 选择器的一个权重值，当多条规则匹配同一元素时，它决定哪个声明生效。它不仅仅取决于源码顺序 —— 更具体的选择器始终胜出，无论它在样式表中的位置如何。',
    whatExample: '看这个两条规则针对同一元素的例子：',
    whatExplain: '尽管第二条规则在源码中出现得更晚，但第一条规则胜出，因为 ID 选择器（<code>#header</code>）的特异性高于类选择器（<code>.site-header</code>）。浏览器会为每个选择器计算一个特异性值，并应用具有最高值的声明。',

    h2_hierarchy: '2. 特异性层级',
    hierarchyDesc: 'CSS 特异性遵循严格的四级层次结构。从最高到最低优先级：',
    hierarchyInline: '<strong>内联样式</strong> —— 直接写在 HTML <code>style</code> 属性中。特异性：<code>(1,0,0,0)</code>',
    hierarchyId: '<strong>ID 选择器</strong> —— 如 <code>#navbar</code>、<code>#main-content</code>。特异性：<code>(0,1,0,0)</code>',
    hierarchyClass: '<strong>类选择器、属性选择器、伪类</strong> —— 如 <code>.btn</code>、<code>[type="text"]</code>、<code>:hover</code>、<code>:focus</code>、<code>:nth-child()</code>。特异性：<code>(0,0,1,0)</code>',
    hierarchyElement: '<strong>元素选择器和伪元素</strong> —— 如 <code>h1</code>、<code>div</code>、<code>::before</code>、<code>::after</code>。特异性：<code>(0,0,0,1)</code>',
    hierarchyUniversal: '通配符选择器（<code>*</code>）、组合器（<code>+</code>、<code>~</code>、<code>></code>、空格）以及否定伪类（<code>:not()</code>）本身不增加特异性。但是，<code>:not()</code> 内部的选择器会计算在内。',

    h2_calculating: '3. 计算特异性 —— (a,b,c) 表示法',
    calculatingDesc: '特异性通常表示为元组 <code>(a, b, c)</code>，其中 <strong>a</strong> = ID 选择器的数量，<strong>b</strong> = 类选择器、属性选择器和伪类的数量，<strong>c</strong> = 元素选择器和伪元素的数量。部分文档使用四部分表示法 <code>(i, a, b, c)</code>，其中 <strong>i</strong> 代表内联样式。',
    calculatingExamples: '以下示例展示如何逐步计算特异性：',
    calculatingCompare: '<strong>比较特异性：</strong>从左到右比较。靠前位置的更高数值总是胜出。<code>(1,0,0)</code> 胜过 <code>(0,15,15)</code>，因为 1 个 ID 的权重超过任意数量的类或元素。没有"进位"机制 —— 15 个类不等于 1 个 ID。',

    h2_table: '4. 特异性示例表 —— 15+ 选择器排序',
    tableDesc: '下表将常见的 CSS 选择器从低到高排列：',
    tableHeader: '<table><thead><tr><th>#</th><th>选择器</th><th>特异性 (a,b,c)</th><th>类别</th></tr></thead><tbody>',
    tableRows: '<tr><td>1</td><td><code>*</code></td><td>(0,0,0)</td><td>通配符</td></tr><tr><td>2</td><td><code>div</code></td><td>(0,0,1)</td><td>元素</td></tr><tr><td>3</td><td><code>ul li</code></td><td>(0,0,2)</td><td>2 个元素</td></tr><tr><td>4</td><td><code>ul ol + li</code></td><td>(0,0,3)</td><td>3 个元素</td></tr><tr><td>5</td><td><code>h1 + p::first-line</code></td><td>(0,0,3)</td><td>2 个元素 + 1 个伪元素</td></tr><tr><td>6</td><td><code>.btn</code></td><td>(0,1,0)</td><td>1 个类</td></tr><tr><td>7</td><td><code>li.active</code></td><td>(0,1,1)</td><td>1 个类 + 1 个元素</td></tr><tr><td>8</td><td><code>[type="text"]</code></td><td>(0,1,0)</td><td>1 个属性</td></tr><tr><td>9</td><td><code>a:hover</code></td><td>(0,1,1)</td><td>1 个伪类 + 1 个元素</td></tr><tr><td>10</td><td><code>div.container p.text</code></td><td>(0,2,2)</td><td>2 个类 + 2 个元素</td></tr><tr><td>11</td><td><code>.nav .nav-item .nav-link</code></td><td>(0,3,0)</td><td>3 个类</td></tr><tr><td>12</td><td><code>#header</code></td><td>(1,0,0)</td><td>1 个 ID</td></tr><tr><td>13</td><td><code>#header .logo</code></td><td>(1,1,0)</td><td>1 个 ID + 1 个类</td></tr><tr><td>14</td><td><code>#header nav ul li.active a</code></td><td>(1,1,4)</td><td>1 个 ID + 1 个类 + 4 个元素</td></tr><tr><td>15</td><td><code>#main #sidebar .widget</code></td><td>(2,1,0)</td><td>2 个 ID + 1 个类</td></tr><tr><td>16</td><td><code>#a #b #c .x .y .z</code></td><td>(3,3,0)</td><td>3 个 ID + 3 个类</td></tr></tbody></table>',

    h2_important: '5. !important —— 作用、为何避免、何时可接受',
    importantDesc: '<code>!important</code> 声明完全覆盖正常的特异性计算。带有 <code>!important</code> 的规则会击败任何没有它的规则，无论特异性分数如何。',
    importantSyntax: '语法：',
    importantWhy: '<strong>为什么要避免 <code>!important</code>：</strong>',
    importantReasons: '<ul><li>它破坏了自然的级联机制，使调试变得极其困难。</li><li>它会引发升级战争 —— 一旦使用了 <code>!important</code>，唯一覆盖它的方式是使用另一个 <code>!important</code> 加上相同或更高的特异性。</li><li>重构变得危险，因为移除一个 <code>!important</code> 可能破坏其他地方的样式。</li><li>在大规模项目中使样式表变得不可维护。</li></ul>',
    importantWhen: '<strong>何时可以使用 <code>!important</code>：</strong>',
    importantAcceptable: '<ul><li><strong>工具类：</strong>像 Tailwind CSS 这样的框架在工具类上使用 <code>!important</code> 以确保它们始终覆盖组件样式（如 <code>.hidden { display: none !important; }</code>）。</li><li><strong>覆盖第三方 CSS：</strong>当你无法修改供应商样式且仅靠特异性不够时。</li><li><strong>无障碍覆盖：</strong>用于高对比度或大字体的用户样式表可以合理使用 <code>!important</code>。</li><li><strong>邮件 HTML：</strong>某些邮件客户端需要 <code>!important</code> 来覆盖其默认样式。</li></ul>',
    importantOrder: '<strong>带 <code>!important</code> 的优先级顺序：</strong>普通作者样式 → <code>!important</code> 作者样式 → <code>!important</code> 用户样式 → <code>!important</code> 用户代理（浏览器）样式。过渡声明和动画声明在级联中有自己的特殊处理方式。',

    h2_layers: '6. 级联层 —— @layer',
    layersDesc: 'CSS 级联层（2022 年引入，所有现代浏览器均支持）为级联增添了一个新维度，位于特异性和源码顺序之间。层让你无需与特异性较量即可控制哪组样式优先。',
    layersSyntax: '基本语法：',
    layersOrder: '<strong>层的顺序很重要：</strong>后声明的层具有更高优先级。在上面的例子中，<code>utilities</code> 样式覆盖 <code>components</code> 样式，而后者覆盖 <code>base</code> 样式 —— 与每层内部的特异性无关。',
    layersInteraction: '<strong>层如何与特异性交互：</strong>',
    layersRules: '<ul><li>更高优先级层中的样式始终胜过更低优先级层中的样式，即使低优先级层有更高的特异性。</li><li>在同一层内，正常的特异性规则适用。</li><li>未分层的样式在正常（非 <code>!important</code>）样式中具有最高优先级。</li><li>使用 <code>!important</code> 时，顺序反转：较早（低优先级）层中的 <code>!important</code> 胜过较晚（高优先级）层中的 <code>!important</code>。</li></ul>',
    layersExample: '实际示例：',

    h2_where_is: '7. :where() 和 :is() —— 特异性控制',
    whereIsDesc: '<code>:where()</code> 和 <code>:is()</code> 伪类接受选择器列表，匹配至少满足其中一个选择器的元素。关键区别在于它们如何影响特异性。',
    whereTitle: '<strong>:where() —— 零特异性</strong>',
    whereDesc: '<code>:where()</code> 始终贡献<strong>零特异性</strong>，无论其内部有什么选择器。这使其非常适合编写易于覆盖的基础样式。',
    isTitle: '<strong>:is() —— 取最高参数的特异性</strong>',
    isDesc: '<code>:is()</code> 取其<strong>最高特异性参数</strong>的特异性。如果 <code>:is()</code> 内部的某个选择器是 ID，则整个 <code>:is()</code> 获得 ID 级别的特异性。',
    whereIsComparison: '对比示例：',
    whereIsUseCase: '<strong>何时使用哪个：</strong>对重置样式、默认主题和库 CSS 使用 <code>:where()</code>，使消费者可以轻松覆盖。对选择器分组使用 <code>:is()</code>，以保持正常的特异性。',

    h2_not_has: '8. :not() 和 :has() —— 否定和关系伪类的特异性',
    notDesc: '<code>:not()</code> 本身不增加特异性，但其参数贡献完整的特异性。这与 <code>:is()</code> 的行为相同。',
    hasDesc: '<code>:has()</code>（"父选择器"）也贡献其最高特异性参数的特异性，与 <code>:is()</code> 和 <code>:not()</code> 相同。',
    notHasExamples: '示例：',
    notHasWarning: '<strong>重要提示：</strong>一个常见误区是认为 <code>:not()</code> 不增加特异性。实际上，<code>div:not(.active)</code> 的特异性为 <code>(0,1,1)</code> —— <code>:not()</code> 内部的 <code>.active</code> 增加了类级别的特异性。',

    h2_inline: '9. 内联样式 vs 样式表 —— 特异性值 (1,0,0,0)',
    inlineDesc: '直接写在 HTML <code>style</code> 属性中的内联样式在四部分表示法中的特异性为 <code>(1,0,0,0)</code>。这意味着它们会覆盖任何基于选择器的规则，无论它包含多少个 ID、类或元素。',
    inlineExample: '示例：',
    inlineOverride: '<strong>如何从样式表覆盖内联样式：</strong>',
    inlineOverrideList: '<ul><li>在样式表规则中使用 <code>!important</code>（通常不推荐）。</li><li>使用 JavaScript 移除或修改内联样式。</li><li>使用带 <code>!important</code> 的级联层进行受控覆盖。</li><li>从一开始就避免内联样式 —— 改用类。</li></ul>',
    inlineWarning: '<strong>为什么要避免内联样式：</strong>不使用 <code>!important</code> 就无法覆盖，将关注点混合（HTML 结构与 CSS 表现），无法使用伪类或伪元素，无法使用媒体查询，在大规模项目中难以维护。',

    h2_battles: '10. 常见特异性冲突',
    battlesDesc: '在实际项目中，你会频繁遇到特异性冲突。以下是最常见的场景及其解决方案：',
    battle1Title: '覆盖框架样式（Bootstrap、Material UI）',
    battle1Desc: 'CSS 框架通常使用中等特异性的选择器。当你的自定义样式不生效时，通常是因为框架选择器的特异性更高。',
    battle2Title: '第三方组件 CSS',
    battle2Desc: '嵌入式组件（聊天插件、支付表单、社交嵌入）通常注入高特异性的 CSS。覆盖策略：',
    battle3Title: 'CSS-in-JS 中的特异性',
    battle3Desc: 'styled-components 和 Emotion 等库会生成特异性为 <code>(0,1,0)</code> 的唯一类名。当它们与全局样式冲突时：',
    battle4Title: '深色模式切换冲突',
    battle4Desc: '深色模式实现在主题选择器与组件选择器竞争时经常产生特异性问题：',

    h2_best: '11. 管理特异性的最佳实践',
    bestDesc: '遵循这些经过验证的策略，使任何规模的项目都能保持可管理的特异性：',
    best1Title: 'BEM 方法论',
    best1Desc: 'BEM（块、元素、修饰符）通过使用单类选择器保持特异性扁平。每个选择器的特异性都是 <code>(0,1,0)</code>。',
    best2Title: '避免深层嵌套',
    best2Desc: '深层嵌套的选择器会产生高特异性和脆弱的样式。将选择器深度控制在最多 3 层。',
    best3Title: '工具优先方法',
    best3Desc: '工具优先 CSS（Tailwind、UnoCSS）通过直接在 HTML 中应用单一用途的类来完全避免特异性问题。每个工具类的特异性都是 <code>(0,1,0)</code>，顺序由样式表生成顺序控制。',
    best4Title: '使用级联层',
    best4Desc: '将 CSS 组织到层中，创建可预测的覆盖行为而无需增加特异性：',
    best5Title: '特异性审查清单',
    best5List: '<ul><li>避免在样式表中使用 ID 选择器 —— 改用类。</li><li>将选择器深度控制在 3 层或更少。</li><li>除非在工具类中或用于覆盖第三方样式，否则不要使用 <code>!important</code>。</li><li>对基础/重置样式使用 <code>:where()</code>。</li><li>对大型项目使用级联层（<code>@layer</code>）。</li><li>优先使用单类选择器（BEM 模式）。</li><li>使用浏览器开发者工具的特异性指示器调试冲突。</li></ul>',

    h2_faq: '12. 常见问题',
    faq1_q: 'CSS 特异性是如何计算的？',
    faq1_a: 'CSS 特异性被计算为元组 (a, b, c)：计算 ID 选择器的数量 (a)、类选择器、属性选择器和伪类的数量 (b)，以及元素选择器和伪元素的数量 (c)。从左到右比较 —— 靠前位置的更高数值总是胜出。例如，一个 ID 选择器 (1,0,0) 击败任意数量的类选择器 (0,n,0)。',
    faq2_q: '!important 会覆盖特异性吗？',
    faq2_a: '是的，!important 完全覆盖正常的特异性。带有 !important 的规则会击败任何没有它的规则，无论选择器特异性如何。但是，当两条规则都有 !important 时，它们之间适用正常的特异性比较。级联层增加了另一个维度：较早层中的 !important 胜过较晚层中的 !important。',
    faq3_q: ':where() 和 :is() 的特异性是什么？',
    faq3_a: ':where() 始终具有零特异性，与其参数无关。:is() 取其最高特异性参数的特异性。例如，:where(#id, .class) 的特异性为 (0,0,0)，而 :is(#id, .class) 的特异性为 (1,0,0)，因为 #id 参数在其参数中具有最高特异性。',
    faq4_q: '256 个类可以覆盖一个 ID 选择器吗？',
    faq4_a: '不能。这是一个常见误区。在所有现代浏览器中，特异性类别之间不会溢出。任何数量的类选择器都无法覆盖单个 ID 选择器。(a,b,c) 值是从左到右独立比较的，而非作为单个连接数字。旧浏览器（IE6 时代）曾有 256 个类可以溢出的 bug，但自约 2012 年以来已不再如此。',
    faq5_q: '级联层如何影响特异性？',
    faq5_a: '级联层（@layer）引入了一个位于级联中特异性之上的优先级系统。更高优先级层中的样式始终胜过更低优先级层中的样式，无论特异性如何。在同一层内，正常的特异性规则适用。未分层的样式胜过所有分层样式。对于 !important 规则，顺序反转：较早的层胜过较晚的层。',

    conclusion: '掌握 CSS 特异性是编写整洁、可预测样式表的基础。使用扁平选择器、避免在 CSS 中使用 ID、利用级联层和 :where() 控制覆盖、将 !important 留给真正的边缘情况。有了这些原则，特异性冲突将成为过去。',
    linkCssMinifierBottom: '使用我们的 CSS 压缩工具压缩和优化你的 CSS →',
    linkTailwindBottom: '使用我们的 Tailwind 颜色工具浏览 Tailwind 调色板 →',
  },
};

export default function CssSpecificityCalculatorRules({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />
      <p><Link href={`/${lang}/tools/css-minifier`} style={{ fontWeight: 600 }}>{t.linkCssMinifier}</Link></p>

      {/* Section 1: What Is CSS Specificity? */}
      <h2>{t.h2_what}</h2>
      <p>{t.whatDesc}</p>
      <p>{t.whatExample}</p>
      <pre><code>{`<!-- HTML -->
<header id="header" class="site-header">My Website</header>

/* CSS */
#header {
  color: blue;     /* Specificity: (1,0,0) — wins! */
}

.site-header {
  color: red;      /* Specificity: (0,1,0) — loses */
}

/* Result: text is blue, because #header (1,0,0) > .site-header (0,1,0) */`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.whatExplain }} />

      {/* Section 2: The Specificity Hierarchy */}
      <h2>{t.h2_hierarchy}</h2>
      <p>{t.hierarchyDesc}</p>
      <ol>
        <li dangerouslySetInnerHTML={{ __html: t.hierarchyInline }} />
        <li dangerouslySetInnerHTML={{ __html: t.hierarchyId }} />
        <li dangerouslySetInnerHTML={{ __html: t.hierarchyClass }} />
        <li dangerouslySetInnerHTML={{ __html: t.hierarchyElement }} />
      </ol>
      <p dangerouslySetInnerHTML={{ __html: t.hierarchyUniversal }} />
      <pre><code>{`/* Hierarchy demonstration */

/* Level 4: Element selector — (0,0,1) */
p { color: black; }

/* Level 3: Class selector — (0,1,0) — overrides element */
.text { color: gray; }

/* Level 3: Attribute selector — (0,1,0) — same level as class */
[data-theme="dark"] { color: white; }

/* Level 3: Pseudo-class — (0,1,0) — same level as class */
p:hover { color: blue; }

/* Level 2: ID selector — (1,0,0) — overrides all above */
#intro { color: green; }

/* Level 1: Inline style — (1,0,0,0) — overrides everything */
/* <p id="intro" style="color: red;">This is red</p> */`}</code></pre>

      {/* Section 3: Calculating Specificity */}
      <h2>{t.h2_calculating}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.calculatingDesc }} />
      <p>{t.calculatingExamples}</p>
      <pre><code>{`/* Example 1: p.intro */
/* Elements: p = 1 → c = 1 */
/* Classes:  .intro = 1 → b = 1 */
/* IDs:      none → a = 0 */
/* Specificity: (0, 1, 1) */

/* Example 2: #main .content p */
/* Elements: p = 1 → c = 1 */
/* Classes:  .content = 1 → b = 1 */
/* IDs:      #main = 1 → a = 1 */
/* Specificity: (1, 1, 1) */

/* Example 3: div#sidebar ul li.active a:hover */
/* Elements: div, ul, li, a = 4 → c = 4 */
/* Classes:  .active, :hover = 2 → b = 2 */
/* IDs:      #sidebar = 1 → a = 1 */
/* Specificity: (1, 2, 4) */

/* Example 4: body > main#content div.wrapper p.text span */
/* Elements: body, main, div, p, span = 5 → c = 5 */
/* Classes:  .wrapper, .text = 2 → b = 2 */
/* IDs:      #content = 1 → a = 1 */
/* Specificity: (1, 2, 5) */

/* Example 5: .nav .dropdown .dropdown-item:first-child::after */
/* Elements: none (but ::after = 1) → c = 1 */
/* Classes:  .nav, .dropdown, .dropdown-item, :first-child = 4 → b = 4 */
/* IDs:      none → a = 0 */
/* Specificity: (0, 4, 1) */`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.calculatingCompare }} />

      {/* Section 4: Specificity Examples Table */}
      <h2>{t.h2_table}</h2>
      <p>{t.tableDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: t.tableHeader + t.tableRows }} />

      {/* Section 5: !important */}
      <h2>{t.h2_important}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.importantDesc }} />
      <p>{t.importantSyntax}</p>
      <pre><code>{`/* Normal rule */
.button {
  background: blue;     /* Specificity: (0,1,0) */
}

/* !important overrides everything without !important */
p {
  background: red !important;   /* Wins over ANY non-!important rule */
}

/* When two rules both have !important, specificity decides */
#main .button {
  background: green !important;  /* Specificity: (1,1,0) — wins */
}
.button {
  background: red !important;    /* Specificity: (0,1,0) — loses */
}

/* The !important escalation problem */
.header { color: blue !important; }
/* Now you need this to override: */
#header.header { color: red !important; }
/* And then someone adds this: */
#page #header.header { color: green !important; }
/* This quickly becomes unmaintainable! */`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.importantWhy }} />
      <div dangerouslySetInnerHTML={{ __html: t.importantReasons }} />
      <p dangerouslySetInnerHTML={{ __html: t.importantWhen }} />
      <div dangerouslySetInnerHTML={{ __html: t.importantAcceptable }} />
      <p dangerouslySetInnerHTML={{ __html: t.importantOrder }} />

      {/* Section 6: Cascade Layers */}
      <h2>{t.h2_layers}</h2>
      <p>{t.layersDesc}</p>
      <p>{t.layersSyntax}</p>
      <pre><code>{`/* Declare layer order (layers listed first have lowest priority) */
@layer base, components, utilities;

/* Add styles to each layer */
@layer base {
  h1 { color: black; font-size: 2rem; }
  a { color: blue; text-decoration: underline; }
}

@layer components {
  .card h1 { color: navy; }       /* Higher priority than base */
  .btn { padding: 8px 16px; background: blue; color: white; }
}

@layer utilities {
  .text-red { color: red; }       /* Highest priority among layers */
  .hidden { display: none; }
}

/* Unlayered styles (highest priority for non-!important) */
h1 { font-family: Georgia, serif; }`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.layersOrder }} />
      <p dangerouslySetInnerHTML={{ __html: t.layersInteraction }} />
      <div dangerouslySetInnerHTML={{ __html: t.layersRules }} />
      <p>{t.layersExample}</p>
      <pre><code>{`@layer base, theme, components;

@layer base {
  /* Even with #id selector (1,0,0), this loses to a class in 'components' */
  #sidebar { background: white; }
}

@layer components {
  /* This wins because 'components' layer has higher priority */
  .sidebar { background: gray; }
}

/* !important reversal: earlier layer wins with !important */
@layer base {
  #sidebar { background: white !important; }  /* WINS with !important */
}

@layer components {
  .sidebar { background: gray !important; }   /* Loses despite later layer */
}`}</code></pre>

      {/* Section 7: :where() and :is() */}
      <h2>{t.h2_where_is}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.whereIsDesc }} />

      <h3 dangerouslySetInnerHTML={{ __html: t.whereTitle }} />
      <p dangerouslySetInnerHTML={{ __html: t.whereDesc }} />
      <pre><code>{`/* :where() — zero specificity regardless of arguments */

/* Specificity: (0,0,1) — only the 'a' element counts */
:where(#nav, .menu, header) a {
  color: blue;
  text-decoration: none;
}

/* This easily overrides the above because (0,1,0) > (0,0,1) */
.custom-link {
  color: red;  /* Wins! */
}

/* Great for CSS resets that should be easy to override */
:where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  font-weight: bold;
}

/* Any class can override the reset */
.light-heading {
  font-weight: 300;  /* Easily overrides :where() */
}`}</code></pre>

      <h3 dangerouslySetInnerHTML={{ __html: t.isTitle }} />
      <p dangerouslySetInnerHTML={{ __html: t.isDesc }} />
      <pre><code>{`/* :is() — takes the specificity of the most specific argument */

/* Specificity: (1,0,1) — #nav is the highest argument, plus 'a' */
:is(#nav, .menu, header) a {
  color: blue;
}

/* This does NOT override because (0,1,0) < (1,0,1) */
.custom-link {
  color: red;  /* Loses! */
}

/* :is() for grouping with consistent specificity */
/* Before (repetitive): */
.card h1, .card h2, .card h3 { color: navy; }

/* After (clean): */
.card :is(h1, h2, h3) { color: navy; }
/* Specificity: (0,1,1) — .card + highest arg (h1/h2/h3 = element) */`}</code></pre>
      <p>{t.whereIsComparison}</p>
      <pre><code>{`/* Side-by-side comparison */

/* :where() version — Specificity: (0,0,1) */
:where(.alert, .warning, .error) p { color: red; }

/* :is() version — Specificity: (0,1,1) */
:is(.alert, .warning, .error) p { color: red; }

/* A simple class easily overrides :where() but not :is() */
.normal-text { color: black; }
/* ✓ Overrides :where() version — (0,1,0) > (0,0,1) */
/* ✗ Does NOT override :is() version — (0,1,0) < (0,1,1) */`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.whereIsUseCase }} />

      {/* Section 8: :not() and :has() */}
      <h2>{t.h2_not_has}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.notDesc }} />
      <p dangerouslySetInnerHTML={{ __html: t.hasDesc }} />
      <p>{t.notHasExamples}</p>
      <pre><code>{`/* :not() specificity examples */

/* div:not(.active) — Specificity: (0,1,1) */
/* :not() itself = 0, but .active inside = (0,1,0), plus div = (0,0,1) */
div:not(.active) {
  opacity: 0.5;
}

/* p:not(#hero) — Specificity: (1,0,1) */
/* :not() = 0, but #hero inside = (1,0,0), plus p = (0,0,1) */
p:not(#hero) {
  font-size: 1rem;
}

/* :not() with multiple arguments (selector list) */
/* a:not(.btn, .link) — Specificity: (0,1,1) */
/* Takes highest argument: .btn and .link are both (0,1,0) */
a:not(.btn, .link) {
  text-decoration: underline;
}


/* :has() specificity examples */

/* article:has(img) — Specificity: (0,0,2) */
/* :has() = 0, img inside = (0,0,1), plus article = (0,0,1) */
article:has(img) {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

/* .card:has(> .featured) — Specificity: (0,2,0) */
/* :has() = 0, .featured inside = (0,1,0), plus .card = (0,1,0) */
.card:has(> .featured) {
  border: 2px solid gold;
}

/* div:has(#special) — Specificity: (1,0,1) */
/* :has() = 0, #special inside = (1,0,0), plus div = (0,0,1) */
div:has(#special) {
  background: lightyellow;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.notHasWarning }} />

      {/* Section 9: Inline Styles vs Stylesheet */}
      <h2>{t.h2_inline}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.inlineDesc }} />
      <p>{t.inlineExample}</p>
      <pre><code>{`<!-- Inline style beats everything except !important -->
<p id="intro" class="text hero-text"
   style="color: red;">
  This text is RED
</p>

/* None of these can override the inline style */
p { color: black; }                        /* (0,0,1) — loses */
.text { color: black; }                    /* (0,1,0) — loses */
.text.hero-text { color: black; }          /* (0,2,0) — loses */
#intro { color: black; }                   /* (1,0,0) — loses */
#intro.text.hero-text { color: black; }    /* (1,2,0) — loses */

/* Only !important can override inline styles */
#intro { color: black !important; }        /* Wins! */`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.inlineOverride }} />
      <div dangerouslySetInnerHTML={{ __html: t.inlineOverrideList }} />
      <p dangerouslySetInnerHTML={{ __html: t.inlineWarning }} />

      {/* Section 10: Common Specificity Battles */}
      <h2>{t.h2_battles}</h2>
      <p>{t.battlesDesc}</p>

      <h3>{t.battle1Title}</h3>
      <p>{t.battle1Desc}</p>
      <pre><code>{`/* Bootstrap button has specificity (0,1,0) */
.btn-primary {
  background-color: #0d6efd;
}

/* Your custom style — same specificity, but source order wins */
/* PROBLEM: If Bootstrap CSS loads AFTER yours, it overrides you */
.btn-primary {
  background-color: #7c3aed;  /* May or may not work! */
}

/* SOLUTION 1: Increase specificity slightly */
.my-theme .btn-primary {
  background-color: #7c3aed;  /* (0,2,0) — always wins */
}

/* SOLUTION 2: Use :where() in your base + normal class for overrides */
:where(.btn-primary) {
  background-color: #0d6efd;  /* (0,0,0) — easy to override */
}
.btn-primary {
  background-color: #7c3aed;  /* (0,1,0) — wins */
}

/* SOLUTION 3: Use @layer */
@layer framework, custom;

@layer framework {
  .btn-primary { background-color: #0d6efd; }
}
@layer custom {
  .btn-primary { background-color: #7c3aed; }  /* Always wins */
}`}</code></pre>

      <h3>{t.battle2Title}</h3>
      <p>{t.battle2Desc}</p>
      <pre><code>{`/* Third-party widget uses highly specific selectors */
/* e.g., #chat-widget .chat-container .message-bubble { color: black; } */
/* Specificity: (1,2,0) */

/* Strategy 1: Match or exceed their specificity */
#chat-widget .chat-container .message-bubble {
  color: white;  /* (1,2,0) — same specificity, your CSS loads later */
}

/* Strategy 2: Use !important as last resort */
.message-bubble {
  color: white !important;  /* Overrides non-!important rules */
}

/* Strategy 3: Shadow DOM encapsulation (for your own widgets) */
/* Styles inside shadow DOM don't compete with outer specificity */

/* Strategy 4: @layer the third-party CSS */
@layer vendor, custom;

@layer vendor {
  @import url('third-party-widget.css');
}
@layer custom {
  .message-bubble { color: white; }  /* Layer priority wins */
}`}</code></pre>

      <h3>{t.battle3Title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.battle3Desc }} />
      <pre><code>{`/* styled-components generates: .sc-abc123 { color: blue; } */
/* Specificity: (0,1,0) */

/* Global style that might conflict */
p { color: black; }  /* (0,0,1) — styled-component wins */

/* But if global CSS uses a class: */
.dark-theme p { color: white; }  /* (0,1,1) — beats styled-component */

/* Solution: Use && to double specificity in styled-components */
const Button = styled.button\`
  && {
    color: blue;  /* Generates .sc-abc123.sc-abc123 → (0,2,0) */
  }
\`;

/* Solution: Use @layer for global styles */
@layer globals;

@layer globals {
  .dark-theme p { color: white; }
}
/* styled-components (unlayered) will win over layered globals */`}</code></pre>

      <h3>{t.battle4Title}</h3>
      <p>{t.battle4Desc}</p>
      <pre><code>{`/* Common dark mode specificity issue */
.card { background: white; color: #333; }  /* (0,1,0) */

/* Dark mode with attribute selector */
[data-theme="dark"] .card {
  background: #1a1a2e; color: #e0e0e0;    /* (0,2,0) */
}

/* Now a modifier class cannot override dark mode! */
.card.highlighted {
  background: yellow;  /* (0,2,0) — TIES with dark mode */
  /* Winner depends on source order — fragile! */
}

/* SOLUTION: Use consistent nesting depth */
[data-theme="dark"] .card.highlighted {
  background: #ffd700;  /* (0,3,0) — reliably wins */
}

/* BETTER SOLUTION: Use CSS custom properties */
:root {
  --card-bg: white;
  --card-color: #333;
}
[data-theme="dark"] {
  --card-bg: #1a1a2e;
  --card-color: #e0e0e0;
}
.card {
  background: var(--card-bg);
  color: var(--card-color);
}
.card.highlighted {
  --card-bg: yellow;  /* Works in both themes! */
}
[data-theme="dark"] .card.highlighted {
  --card-bg: #ffd700;
}`}</code></pre>

      {/* Section 11: Best Practices */}
      <h2>{t.h2_best}</h2>
      <p>{t.bestDesc}</p>

      <h3>{t.best1Title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.best1Desc }} />
      <pre><code>{`/* BEM: flat specificity — every selector is (0,1,0) */

/* Block */
.card { padding: 16px; border: 1px solid #ddd; }

/* Element (block__element) */
.card__title { font-size: 1.5rem; font-weight: bold; }
.card__body { padding: 8px 0; }
.card__footer { border-top: 1px solid #eee; }

/* Modifier (block--modifier) */
.card--featured { border-color: gold; }
.card--compact { padding: 8px; }

/* Element + Modifier */
.card__title--large { font-size: 2rem; }

/* All selectors have specificity (0,1,0) — no conflicts!
   Override order is controlled purely by source order. */`}</code></pre>

      <h3>{t.best2Title}</h3>
      <p>{t.best2Desc}</p>
      <pre><code>{`/* BAD: Deep nesting creates high specificity */
/* Specificity: (0,0,6) — hard to override */
header nav ul li a span {
  color: blue;
}

/* BAD: Nesting with classes makes it worse */
/* Specificity: (1,3,2) — very hard to override */
#page .header .nav-container ul.menu li.active a {
  color: red;
}

/* GOOD: Flat, single-class selectors */
/* Specificity: (0,1,0) — easy to override */
.nav-link {
  color: blue;
}

.nav-link--active {
  color: red;
}

/* ACCEPTABLE: Maximum 3 levels when truly needed */
/* Specificity: (0,2,0) */
.nav .nav-link {
  color: blue;
}`}</code></pre>

      <h3>{t.best3Title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.best3Desc }} />
      <pre><code>{`<!-- Utility-first: all specificity is (0,1,0) -->
<div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
  <img class="w-12 h-12 rounded-full" src="avatar.jpg" alt="Avatar" />
  <div>
    <h3 class="text-lg font-semibold text-gray-900">Jane Doe</h3>
    <p class="text-sm text-gray-500">Software Engineer</p>
  </div>
</div>

<!-- No specificity conflicts because:
  1. Each utility = one class = (0,1,0)
  2. Order is determined by the stylesheet, not HTML
  3. No nesting, no IDs, no !important needed -->

<!-- Tailwind important mode (adds !important to all utilities) -->
<!-- tailwind.config.js: { important: true } -->
<!-- .text-red-500 { color: #ef4444 !important; } -->`}</code></pre>

      <h3>{t.best4Title}</h3>
      <p>{t.best4Desc}</p>
      <pre><code>{`/* Recommended layer structure for large projects */
@layer reset, base, tokens, components, layouts, utilities, overrides;

@layer reset {
  /* CSS reset / normalize — :where() for zero specificity */
  :where(*, *::before, *::after) { box-sizing: border-box; margin: 0; }
  :where(body) { line-height: 1.5; }
}

@layer base {
  /* Base element styles */
  :where(h1) { font-size: 2.5rem; }
  :where(a) { color: var(--color-link); }
}

@layer tokens {
  /* Design tokens / CSS variables */
  :root { --color-primary: #3b82f6; --color-link: #2563eb; }
  [data-theme="dark"] { --color-primary: #60a5fa; --color-link: #93c5fd; }
}

@layer components {
  /* Component styles */
  .btn { padding: 8px 16px; background: var(--color-primary); }
  .card { padding: 16px; border-radius: 8px; }
}

@layer utilities {
  /* Utility overrides */
  .text-center { text-align: center; }
  .hidden { display: none; }
}

@layer overrides {
  /* Third-party overrides, edge cases */
}`}</code></pre>

      <h3>{t.best5Title}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.best5List }} />

      {/* Section 12: FAQ */}
      <h2>{t.h2_faq}</h2>
      <h3>{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>
      <h3>{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>
      <h3>{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>
      <h3>{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>
      <h3>{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>

      <p style={{ marginTop: 32 }}>{t.conclusion}</p>
      <p><Link href={`/${lang}/tools/css-minifier`} style={{ fontWeight: 600 }}>{t.linkCssMinifierBottom}</Link></p>
      <p><Link href={`/${lang}/tools/tailwind-colors`} style={{ fontWeight: 600 }}>{t.linkTailwindBottom}</Link></p>
    </>
  );
}
