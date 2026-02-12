'use client';

import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'The CSS <code>position</code> property is fundamental to every web layout. It determines how an element is placed in the document and how it interacts with surrounding elements. Understanding <strong>css position sticky</strong>, fixed, absolute, and relative is essential for building navbars, modals, tooltips, and scroll-aware UI. This comprehensive guide covers all five position values with practical code examples, common patterns, and debugging tips.',
    linkFlexbox: 'Build layouts visually with our Flexbox Generator →',
    linkUnit: 'Convert CSS units with our CSS Unit Converter →',

    h2_static: 'position: static — The Default',
    staticDesc: 'Every element starts with <code>position: static</code>. Static elements follow the normal document flow and are placed in the order they appear in the HTML. The properties <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, and <code>z-index</code> have <strong>no effect</strong> on statically positioned elements.',
    staticNote: 'Since static is the default, you only need to declare it explicitly when overriding another position value.',

    h2_relative: 'position: relative — Offset from Normal Position',
    relativeDesc: 'A relatively positioned element still occupies its original space in the document flow, but you can offset it visually using <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code>. The element is shifted relative to where it <em>would have been</em>. Importantly, <code>position: relative</code> creates a new <strong>stacking context</strong> for z-index and serves as the positioning reference for any absolutely positioned descendants.',
    relativeKey: 'Key characteristics:',
    relativeKey1: 'Remains in normal document flow (space is reserved)',
    relativeKey2: 'Offset with top/right/bottom/left is relative to its original position',
    relativeKey3: 'Creates a containing block for absolute children',
    relativeKey4: 'Creates a stacking context when z-index is set',

    h2_absolute: 'position: absolute — Removed from Flow',
    absoluteDesc: 'An absolutely positioned element is completely removed from the normal document flow — other elements act as if it does not exist. It is positioned relative to its <strong>nearest positioned ancestor</strong> (any ancestor with position other than static). If no positioned ancestor exists, it positions relative to the initial containing block (the <code>&lt;html&gt;</code> element).',
    absoluteKey: 'Key characteristics:',
    absoluteKey1: 'Removed from normal flow (no space is reserved)',
    absoluteKey2: 'Positioned relative to nearest positioned ancestor',
    absoluteKey3: 'Can use top/right/bottom/left and z-index',
    absoluteKey4: 'Width shrinks to fit content (no longer block-level stretching)',
    absoluteKey5: 'Setting both left and right (or top and bottom) stretches the element',

    h2_fixed: 'position: fixed — Relative to Viewport',
    fixedDesc: 'A fixed element is removed from the normal document flow and positioned relative to the <strong>viewport</strong> (the browser window). It stays in the same place even when the page is scrolled. This makes it ideal for persistent UI elements like navbars, floating action buttons, and cookie banners.',
    fixedKey: 'Key characteristics:',
    fixedKey1: 'Removed from normal flow',
    fixedKey2: 'Positioned relative to the viewport',
    fixedKey3: 'Stays in place during scrolling',
    fixedKey4: 'Width shrinks to fit content',
    fixedKey5: 'Caution: a transform, filter, or perspective on an ancestor creates a new containing block, breaking fixed positioning',

    h2_sticky: 'position: sticky — Hybrid Relative + Fixed',
    stickyDesc: 'Sticky positioning is a hybrid between relative and fixed. The element behaves as <code>position: relative</code> until it crosses a specified scroll threshold (defined by <code>top</code>, <code>bottom</code>, <code>left</code>, or <code>right</code>), at which point it becomes <code>position: fixed</code> — but only within its containing block. This is the most powerful and commonly used approach for <strong>css position sticky</strong> headers and sidebars.',
    stickyKey: 'Key characteristics:',
    stickyKey1: 'Stays in normal flow until scroll threshold is reached',
    stickyKey2: 'Requires at least one of top, right, bottom, or left to be set',
    stickyKey3: 'Sticks within its parent container bounds (stops at parent edge)',
    stickyKey4: 'Creates a stacking context',
    stickyKey5: 'Will not work if any ancestor has overflow: hidden, scroll, or auto',

    h2_comparison: 'Comparison Table — All 5 Position Values',
    comparisonDesc: 'Here is a quick reference comparing all CSS position values:',

    th_property: 'Property',
    th_flow: 'In Flow?',
    th_reference: 'Reference Point',
    th_scroll: 'Scroll Behavior',
    th_zindex: 'z-index',
    th_usecase: 'Common Use Case',

    comp_static_flow: 'Yes',
    comp_static_ref: 'N/A',
    comp_static_scroll: 'Scrolls with page',
    comp_static_z: 'No effect',
    comp_static_use: 'Default for all elements',

    comp_relative_flow: 'Yes (space preserved)',
    comp_relative_ref: 'Own original position',
    comp_relative_scroll: 'Scrolls with page',
    comp_relative_z: 'Works',
    comp_relative_use: 'Offset, z-index parent, anchor for absolute',

    comp_absolute_flow: 'No',
    comp_absolute_ref: 'Nearest positioned ancestor',
    comp_absolute_scroll: 'Scrolls with positioned parent',
    comp_absolute_z: 'Works',
    comp_absolute_use: 'Tooltips, dropdowns, badges',

    comp_fixed_flow: 'No',
    comp_fixed_ref: 'Viewport',
    comp_fixed_scroll: 'Stays fixed on screen',
    comp_fixed_z: 'Works',
    comp_fixed_use: 'Navbars, FABs, cookie banners',

    comp_sticky_flow: 'Yes (until stuck)',
    comp_sticky_ref: 'Scrollport / parent container',
    comp_sticky_scroll: 'Scrolls then sticks',
    comp_sticky_z: 'Works',
    comp_sticky_use: 'Sticky headers, sticky sidebars',

    h2_stacking: 'Stacking Context and z-index',
    stackingDesc: 'The <code>z-index</code> property controls the stacking order of positioned elements (any position except static). However, z-index only works within the same <strong>stacking context</strong>. A stacking context is created by several CSS properties:',
    stackingList1: 'position: relative/absolute/fixed/sticky with a z-index value other than auto',
    stackingList2: 'opacity less than 1',
    stackingList3: 'transform, filter, perspective, clip-path, mask',
    stackingList4: 'isolation: isolate (explicitly creates a new context)',
    stackingList5: 'will-change with a value that creates a stacking context',
    stackingTip: 'Use <code>isolation: isolate</code> to create a stacking context boundary without any visual side effects. This is the cleanest way to contain z-index wars:',

    h2_sticky_header: 'Sticky Header Pattern — CSS-Only Navbar',
    stickyHeaderDesc: 'A sticky header is one of the most common uses of <code>position: sticky</code>. The navbar scrolls normally with the page until it reaches the top, then sticks in place:',
    stickyHeaderNote: 'The <code>top: 0</code> value is required — it tells the browser the scroll threshold where the element should stick. Without it, sticky positioning will not activate.',

    h2_sticky_sidebar: 'Sticky Sidebar — Scrolls Then Sticks',
    stickySidebarDesc: 'A sticky sidebar scrolls with the main content but sticks when it reaches the top of the viewport. It stops sticking when it reaches the bottom of its parent container:',
    stickySidebarNote: 'The sidebar stops being sticky when the bottom of the <code>.layout</code> container is reached. This is automatic — sticky elements are constrained to their parent.',

    h2_fixed_modal: 'Fixed Modal / Overlay Pattern',
    fixedModalDesc: 'Modals and overlays use <code>position: fixed</code> to cover the entire viewport. The backdrop stays in place while the page may be scrolled underneath:',
    fixedModalScroll: 'Scroll lock: When a modal is open, add <code>overflow: hidden</code> to the body to prevent background scrolling:',

    h2_absolute_patterns: 'Absolute Positioning Patterns',
    absolutePatternsDesc: 'Absolute positioning is essential for layered UI elements like tooltips, dropdowns, and notification badges. The key is always having a positioned parent (<code>position: relative</code>) as the anchor.',
    h3_tooltip: 'Tooltip',
    h3_dropdown: 'Dropdown Menu',
    h3_badge: 'Badge on Avatar',

    h2_bugs: 'Common Bugs and Fixes',
    bugsDesc: 'CSS positioning has several well-known gotchas. Here are the most common issues and their solutions:',
    h3_bug_sticky: 'Sticky Not Working',
    bugStickyDesc: 'The most common reason <code>position: sticky</code> fails is an ancestor with <code>overflow: hidden</code>, <code>overflow: auto</code>, or <code>overflow: scroll</code>. Sticky elements need an uninterrupted overflow chain to the scrollport.',
    h3_bug_zindex: 'z-index Wars',
    bugZindexDesc: 'Increasing z-index to absurd values (z-index: 9999999) is a sign of stacking context confusion. The fix is to understand which stacking context each element belongs to.',
    h3_bug_fixed: 'Fixed Element Not Fixed',
    bugFixedDesc: 'If a fixed element scrolls with the page, check if any ancestor has <code>transform</code>, <code>filter</code>, or <code>perspective</code>. These properties create a new containing block, causing <code>position: fixed</code> to behave like <code>position: absolute</code>.',
    h3_bug_absolute_overflow: 'Absolute Element Clipped',
    bugAbsoluteOverflowDesc: 'If your absolutely positioned element is clipped or hidden, check the parent for <code>overflow: hidden</code>. The absolute element is contained within the nearest positioned ancestor, and if that ancestor clips overflow, the element will be hidden.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Why is my position: sticky not working?',
    faq1_a: 'The most common cause is an ancestor element with overflow: hidden, overflow: auto, or overflow: scroll. Sticky positioning requires an uninterrupted scrollable overflow from the element to the scroll container (usually the viewport). Also ensure you have set a threshold value like top: 0 — without it, the browser does not know when to activate the sticky behavior. Additionally, check that the sticky element\'s parent has enough height for it to actually scroll within.',
    faq2_q: 'What is the difference between position: fixed and position: sticky?',
    faq2_a: 'Fixed elements are always positioned relative to the viewport and stay in place during scrolling. Sticky elements start in the normal flow and only become fixed when a scroll threshold is crossed (e.g., top: 0). Critically, sticky elements are constrained to their parent container — they stop being sticky when the parent scrolls out of view. Fixed elements have no such constraint and remain on screen permanently.',
    faq3_q: 'How does z-index work with positioned elements?',
    faq3_a: 'z-index only works on positioned elements (relative, absolute, fixed, or sticky — NOT static). Elements with a higher z-index appear on top of elements with a lower z-index, but only within the same stacking context. A stacking context is created by certain CSS properties like position with z-index, opacity < 1, transform, and filter. An element can never appear above another element in a higher stacking context, regardless of its z-index value.',
    faq4_q: 'Can I use position: sticky for horizontal scrolling?',
    faq4_a: 'Yes, sticky positioning works on both axes. For horizontal scrolling, use left instead of top. For example, a sticky first column in a horizontally scrollable table can be achieved with position: sticky and left: 0 on the first column cells. The same overflow restrictions apply — the horizontally scrollable container should not have overflow: hidden on any ancestor in the relevant axis.',
    faq5_q: 'How do I center an absolutely positioned element?',
    faq5_a: 'The modern approach is to use inset: 0 with margin: auto. Set position: absolute, then inset: 0 (shorthand for top: 0, right: 0, bottom: 0, left: 0), and finally margin: auto. The element must have explicit width and height. Alternatively, use top: 50% and left: 50% with transform: translate(-50%, -50%), which works without knowing the element\'s dimensions.',

    conclusion: 'Understanding CSS position values is critical for building any non-trivial web layout. Master these five values — static, relative, absolute, fixed, and sticky — and you can build navbars, modals, tooltips, sticky sidebars, and any layered UI with confidence. Use the tools below to experiment with layouts interactively.',
    linkFlexboxBottom: 'Build layouts with our Flexbox Generator →',
    linkUnitBottom: 'Convert CSS units with our CSS Unit Converter →',
  },
  zh: {
    intro: 'CSS <code>position</code> 属性是所有网页布局的基础。它决定了元素在文档中的放置方式以及与周围元素的交互方式。理解 <strong>css position sticky</strong>、fixed、absolute 和 relative 对于构建导航栏、模态框、工具提示和滚动感知 UI 至关重要。本完整指南涵盖所有五个 position 值，包含实用代码示例、常见模式和调试技巧。',
    linkFlexbox: '使用我们的 Flexbox 生成器可视化构建布局 →',
    linkUnit: '使用我们的 CSS 单位转换器转换 CSS 单位 →',

    h2_static: 'position: static — 默认值',
    staticDesc: '每个元素默认都是 <code>position: static</code>。静态元素遵循正常的文档流，按照 HTML 中的顺序排列。<code>top</code>、<code>right</code>、<code>bottom</code>、<code>left</code> 和 <code>z-index</code> 属性对静态定位的元素<strong>没有效果</strong>。',
    staticNote: '由于 static 是默认值，只有在覆盖其他 position 值时才需要显式声明。',

    h2_relative: 'position: relative — 相对原位偏移',
    relativeDesc: '相对定位的元素仍然占据其在文档流中的原始空间，但你可以通过 <code>top</code>、<code>right</code>、<code>bottom</code> 和 <code>left</code> 进行视觉偏移。元素相对于它<em>本来应该在的位置</em>进行偏移。重要的是，<code>position: relative</code> 会创建新的<strong>层叠上下文</strong>（用于 z-index），并作为绝对定位子元素的定位参考。',
    relativeKey: '关键特性：',
    relativeKey1: '保留在正常文档流中（空间被保留）',
    relativeKey2: '通过 top/right/bottom/left 偏移是相对于原始位置',
    relativeKey3: '为绝对定位的子元素创建包含块',
    relativeKey4: '设置 z-index 时创建层叠上下文',

    h2_absolute: 'position: absolute — 脱离文档流',
    absoluteDesc: '绝对定位的元素完全脱离正常文档流 — 其他元素会表现得好像它不存在一样。它相对于<strong>最近的已定位祖先</strong>（任何 position 不是 static 的祖先）进行定位。如果没有已定位的祖先，它将相对于初始包含块（<code>&lt;html&gt;</code> 元素）进行定位。',
    absoluteKey: '关键特性：',
    absoluteKey1: '脱离正常文档流（不保留空间）',
    absoluteKey2: '相对于最近的已定位祖先进行定位',
    absoluteKey3: '可以使用 top/right/bottom/left 和 z-index',
    absoluteKey4: '宽度收缩以适应内容（不再是块级拉伸）',
    absoluteKey5: '同时设置 left 和 right（或 top 和 bottom）可以拉伸元素',

    h2_fixed: 'position: fixed — 相对于视口',
    fixedDesc: '固定定位的元素脱离正常文档流，相对于<strong>视口</strong>（浏览器窗口）进行定位。即使页面滚动，它也保持在同一位置。非常适合持久性 UI 元素，如导航栏、悬浮操作按钮和 Cookie 横幅。',
    fixedKey: '关键特性：',
    fixedKey1: '脱离正常文档流',
    fixedKey2: '相对于视口定位',
    fixedKey3: '滚动时保持固定',
    fixedKey4: '宽度收缩以适应内容',
    fixedKey5: '注意：祖先元素的 transform、filter 或 perspective 会创建新的包含块，破坏固定定位',

    h2_sticky: 'position: sticky — 相对与固定的混合体',
    stickyDesc: '粘性定位是相对定位和固定定位的混合体。元素表现为 <code>position: relative</code>，直到它越过指定的滚动阈值（由 <code>top</code>、<code>bottom</code>、<code>left</code> 或 <code>right</code> 定义），此时它变为 <code>position: fixed</code> — 但仅在其包含块内有效。这是实现 <strong>css position sticky</strong> 头部和侧边栏最强大且最常用的方法。',
    stickyKey: '关键特性：',
    stickyKey1: '在达到滚动阈值之前保持在正常文档流中',
    stickyKey2: '必须设置 top、right、bottom 或 left 中的至少一个',
    stickyKey3: '在父容器范围内粘附（到达父边缘时停止）',
    stickyKey4: '创建层叠上下文',
    stickyKey5: '如果任何祖先元素有 overflow: hidden、scroll 或 auto，则不会生效',

    h2_comparison: '对比表 — 所有 5 种 Position 值',
    comparisonDesc: '以下是所有 CSS position 值的快速参考对比：',

    th_property: '属性',
    th_flow: '在文档流中？',
    th_reference: '参考点',
    th_scroll: '滚动行为',
    th_zindex: 'z-index',
    th_usecase: '常见用途',

    comp_static_flow: '是',
    comp_static_ref: '不适用',
    comp_static_scroll: '随页面滚动',
    comp_static_z: '无效果',
    comp_static_use: '所有元素的默认值',

    comp_relative_flow: '是（保留空间）',
    comp_relative_ref: '自身原始位置',
    comp_relative_scroll: '随页面滚动',
    comp_relative_z: '有效',
    comp_relative_use: '偏移、z-index 父级、absolute 锚点',

    comp_absolute_flow: '否',
    comp_absolute_ref: '最近的已定位祖先',
    comp_absolute_scroll: '随已定位父级滚动',
    comp_absolute_z: '有效',
    comp_absolute_use: '工具提示、下拉菜单、徽章',

    comp_fixed_flow: '否',
    comp_fixed_ref: '视口',
    comp_fixed_scroll: '固定在屏幕上',
    comp_fixed_z: '有效',
    comp_fixed_use: '导航栏、悬浮按钮、Cookie 横幅',

    comp_sticky_flow: '是（粘附前）',
    comp_sticky_ref: '滚动容器 / 父容器',
    comp_sticky_scroll: '先滚动后粘附',
    comp_sticky_z: '有效',
    comp_sticky_use: '粘性头部、粘性侧边栏',

    h2_stacking: '层叠上下文与 z-index',
    stackingDesc: '<code>z-index</code> 属性控制已定位元素（除 static 外的任何 position）的堆叠顺序。然而，z-index 只在同一个<strong>层叠上下文</strong>中起作用。层叠上下文由以下 CSS 属性创建：',
    stackingList1: 'position: relative/absolute/fixed/sticky 配合非 auto 的 z-index 值',
    stackingList2: 'opacity 小于 1',
    stackingList3: 'transform、filter、perspective、clip-path、mask',
    stackingList4: 'isolation: isolate（显式创建新上下文）',
    stackingList5: 'will-change 设置为会创建层叠上下文的值',
    stackingTip: '使用 <code>isolation: isolate</code> 创建层叠上下文边界，且不会产生任何视觉副作用。这是解决 z-index 冲突最干净的方式：',

    h2_sticky_header: '粘性头部模式 — 纯 CSS 导航栏',
    stickyHeaderDesc: '粘性头部是 <code>position: sticky</code> 最常见的用途之一。导航栏随页面正常滚动，直到到达顶部后就固定在原位：',
    stickyHeaderNote: '<code>top: 0</code> 值是必需的 — 它告诉浏览器元素应该粘附的滚动阈值。没有它，粘性定位不会激活。',

    h2_sticky_sidebar: '粘性侧边栏 — 滚动后粘附',
    stickySidebarDesc: '粘性侧边栏随主要内容滚动，但在到达视口顶部时粘附。当它到达父容器底部时停止粘附：',
    stickySidebarNote: '当 <code>.layout</code> 容器的底部被到达时，侧边栏停止粘附。这是自动的 — 粘性元素受其父容器约束。',

    h2_fixed_modal: '固定模态框 / 遮罩层模式',
    fixedModalDesc: '模态框和遮罩层使用 <code>position: fixed</code> 覆盖整个视口。背景层保持固定，而页面可能在下方滚动：',
    fixedModalScroll: '滚动锁定：当模态框打开时，给 body 添加 <code>overflow: hidden</code> 以防止背景滚动：',

    h2_absolute_patterns: '绝对定位模式',
    absolutePatternsDesc: '绝对定位对于分层 UI 元素如工具提示、下拉菜单和通知徽章至关重要。关键是始终有一个已定位的父元素（<code>position: relative</code>）作为锚点。',
    h3_tooltip: '工具提示',
    h3_dropdown: '下拉菜单',
    h3_badge: '头像徽章',

    h2_bugs: '常见问题与修复',
    bugsDesc: 'CSS 定位有几个众所周知的陷阱。以下是最常见的问题及其解决方案：',
    h3_bug_sticky: 'Sticky 不生效',
    bugStickyDesc: '<code>position: sticky</code> 失效最常见的原因是祖先元素有 <code>overflow: hidden</code>、<code>overflow: auto</code> 或 <code>overflow: scroll</code>。粘性元素需要到滚动容器的不间断溢出链。',
    h3_bug_zindex: 'z-index 大战',
    bugZindexDesc: '将 z-index 增加到荒谬的值（z-index: 9999999）是层叠上下文混乱的表现。解决方法是理解每个元素属于哪个层叠上下文。',
    h3_bug_fixed: '固定元素不固定',
    bugFixedDesc: '如果固定元素随页面滚动，检查是否有祖先元素设置了 <code>transform</code>、<code>filter</code> 或 <code>perspective</code>。这些属性会创建新的包含块，导致 <code>position: fixed</code> 表现得像 <code>position: absolute</code>。',
    h3_bug_absolute_overflow: '绝对定位元素被裁切',
    bugAbsoluteOverflowDesc: '如果绝对定位的元素被裁切或隐藏，检查父元素是否有 <code>overflow: hidden</code>。绝对元素包含在最近的已定位祖先中，如果该祖先裁切溢出，元素就会被隐藏。',

    h2_faq: '常见问题',
    faq1_q: '为什么我的 position: sticky 不生效？',
    faq1_a: '最常见的原因是祖先元素设置了 overflow: hidden、overflow: auto 或 overflow: scroll。粘性定位需要从元素到滚动容器（通常是视口）的不间断可滚动溢出。同时确保设置了阈值如 top: 0 — 没有它，浏览器不知道何时激活粘性行为。另外，检查粘性元素的父元素是否有足够的高度让它实际滚动。',
    faq2_q: 'position: fixed 和 position: sticky 有什么区别？',
    faq2_a: '固定元素始终相对于视口定位，在滚动期间保持不动。粘性元素从正常文档流开始，只有在越过滚动阈值时（如 top: 0）才变为固定。关键是，粘性元素受其父容器约束 — 当父元素滚出视图时停止粘附。固定元素没有这种约束，会永久留在屏幕上。',
    faq3_q: 'z-index 如何与定位元素配合工作？',
    faq3_a: 'z-index 只对已定位元素有效（relative、absolute、fixed 或 sticky — 不包括 static）。z-index 值较高的元素显示在较低值元素的上方，但仅在同一层叠上下文中。层叠上下文由某些 CSS 属性创建，如带 z-index 的 position、opacity < 1、transform 和 filter。无论 z-index 值多大，元素都无法显示在更高层叠上下文中的元素之上。',
    faq4_q: '可以用 position: sticky 实现水平滚动吗？',
    faq4_a: '可以，粘性定位在两个轴上都有效。对于水平滚动，使用 left 代替 top。例如，在水平可滚动的表格中实现粘性第一列，可以在第一列单元格上设置 position: sticky 和 left: 0。同样的 overflow 限制也适用 — 水平可滚动容器的祖先在相关轴上不应有 overflow: hidden。',
    faq5_q: '如何居中一个绝对定位的元素？',
    faq5_a: '现代方法是使用 inset: 0 配合 margin: auto。设置 position: absolute，然后 inset: 0（是 top: 0, right: 0, bottom: 0, left: 0 的简写），最后 margin: auto。元素必须有明确的宽度和高度。或者使用 top: 50% 和 left: 50% 配合 transform: translate(-50%, -50%)，这种方法不需要知道元素的尺寸。',

    conclusion: '理解 CSS position 值对于构建任何复杂的网页布局都至关重要。掌握这五个值 — static、relative、absolute、fixed 和 sticky — 你就能自信地构建导航栏、模态框、工具提示、粘性侧边栏以及任何分层 UI。使用下面的工具来交互式地实验布局。',
    linkFlexboxBottom: '使用我们的 Flexbox 生成器构建布局 →',
    linkUnitBottom: '使用我们的 CSS 单位转换器转换单位 →',
  },
};

export default function CssPositionStickyFixedAbsolute({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/flexbox-generator`} style={{ fontWeight: 600 }}>{s.linkFlexbox}</Link></p>
      <p><Link href={`/${lang}/tools/css-unit-converter`} style={{ fontWeight: 600 }}>{s.linkUnit}</Link></p>

      {/* ==================== POSITION: STATIC ==================== */}
      <h2>{s.h2_static}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.staticDesc }} />
      <pre><code>{`/* position: static is the default — no need to declare */
.element {
  position: static;

  /* These have NO effect on static elements: */
  top: 10px;      /* ignored */
  left: 20px;     /* ignored */
  z-index: 100;   /* ignored */
}

/* When to use static explicitly: */
.override-positioned {
  position: static;  /* reset a previously set position */
}

/* Example: element in normal flow */
.box-a { background: #3b82f6; height: 80px; }
.box-b { background: #10b981; height: 80px; }
.box-c { background: #f59e0b; height: 80px; }
/* Result: three boxes stacked vertically in source order */`}</code></pre>
      <p><em>{s.staticNote}</em></p>

      {/* ==================== POSITION: RELATIVE ==================== */}
      <h2>{s.h2_relative}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.relativeDesc }} />
      <p style={{ fontWeight: 600 }}>{s.relativeKey}</p>
      <ul>
        <li>{s.relativeKey1}</li>
        <li>{s.relativeKey2}</li>
        <li>{s.relativeKey3}</li>
        <li>{s.relativeKey4}</li>
      </ul>
      <pre><code>{`/* Offset an element from its normal position */
.shifted {
  position: relative;
  top: 20px;     /* moves DOWN 20px from original position */
  left: 30px;    /* moves RIGHT 30px from original position */
}

/* The element's original space is still reserved in the flow.
   Surrounding elements do NOT move to fill the gap. */

/* Common use: create positioning context for absolute children */
.parent {
  position: relative;  /* becomes anchor for .child */
}
.child {
  position: absolute;
  top: 0;
  right: 0;           /* positioned at parent's top-right corner */
}

/* Common use: adjust z-index stacking */
.card {
  position: relative;
  z-index: 1;         /* now participates in z-index stacking */
}
.card:hover {
  z-index: 10;        /* bring to front on hover */
}`}</code></pre>

      {/* ==================== POSITION: ABSOLUTE ==================== */}
      <h2>{s.h2_absolute}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.absoluteDesc }} />
      <p style={{ fontWeight: 600 }}>{s.absoluteKey}</p>
      <ul>
        <li>{s.absoluteKey1}</li>
        <li>{s.absoluteKey2}</li>
        <li>{s.absoluteKey3}</li>
        <li>{s.absoluteKey4}</li>
        <li>{s.absoluteKey5}</li>
      </ul>
      <pre><code>{`/* Basic absolute positioning */
.parent {
  position: relative;   /* creates containing block */
  width: 400px;
  height: 300px;
}

.child {
  position: absolute;
  top: 10px;            /* 10px from parent's top edge */
  right: 10px;          /* 10px from parent's right edge */
  width: 100px;
  height: 50px;
}

/* Stretch to fill parent */
.overlay {
  position: absolute;
  inset: 0;             /* same as top:0; right:0; bottom:0; left:0 */
  /* Element fills entire parent */
}

/* Center absolutely positioned element */
.centered {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 200px;
  height: 100px;
}

/* Alternative centering with transform */
.centered-alt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Pin to corners */
.top-left     { position: absolute; top: 0; left: 0; }
.top-right    { position: absolute; top: 0; right: 0; }
.bottom-left  { position: absolute; bottom: 0; left: 0; }
.bottom-right { position: absolute; bottom: 0; right: 0; }`}</code></pre>

      {/* ==================== POSITION: FIXED ==================== */}
      <h2>{s.h2_fixed}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.fixedDesc }} />
      <p style={{ fontWeight: 600 }}>{s.fixedKey}</p>
      <ul>
        <li>{s.fixedKey1}</li>
        <li>{s.fixedKey2}</li>
        <li>{s.fixedKey3}</li>
        <li>{s.fixedKey4}</li>
        <li>{s.fixedKey5}</li>
      </ul>
      <pre><code>{`/* Fixed navbar at top */
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;              /* or width: 100% */
  height: 64px;
  background: #1e293b;
  z-index: 1000;
}

/* IMPORTANT: add padding to body so content isn't hidden behind navbar */
body {
  padding-top: 64px;
}

/* Fixed floating action button (FAB) */
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #3b82f6;
  z-index: 900;
}

/* Fixed back-to-top button */
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  opacity: 0;
  transition: opacity 0.3s;
}
.back-to-top.visible {
  opacity: 1;
}

/* Fixed cookie banner at bottom */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: #1e293b;
  z-index: 1000;
}`}</code></pre>

      {/* ==================== POSITION: STICKY ==================== */}
      <h2>{s.h2_sticky}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.stickyDesc }} />
      <p style={{ fontWeight: 600 }}>{s.stickyKey}</p>
      <ul>
        <li>{s.stickyKey1}</li>
        <li>{s.stickyKey2}</li>
        <li>{s.stickyKey3}</li>
        <li>{s.stickyKey4}</li>
        <li>{s.stickyKey5}</li>
      </ul>
      <pre><code>{`/* Basic sticky element */
.sticky-element {
  position: sticky;
  top: 0;               /* sticks when top edge reaches viewport top */
}

/* Sticky with offset */
.sticky-below-navbar {
  position: sticky;
  top: 64px;            /* sticks 64px from top (below a fixed navbar) */
}

/* Sticky bottom */
.sticky-footer-bar {
  position: sticky;
  bottom: 0;            /* sticks when bottom edge reaches viewport bottom */
}

/* Sticky table header */
table thead th {
  position: sticky;
  top: 0;
  background: #1e293b;  /* background needed to cover scrolling content */
  z-index: 10;
}

/* Sticky section headers (like iOS-style grouped lists) */
.section-header {
  position: sticky;
  top: 0;
  background: #f1f5f9;
  padding: 8px 16px;
  font-weight: 700;
}
/* Each section header pushes the previous one away as you scroll */`}</code></pre>

      {/* ==================== COMPARISON TABLE ==================== */}
      <h2>{s.h2_comparison}</h2>
      <p>{s.comparisonDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.th_property}</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.th_flow}</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.th_reference}</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.th_scroll}</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.th_zindex}</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.th_usecase}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>static</code></td>
              <td style={{ padding: '8px 12px' }}>{s.comp_static_flow}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_static_ref}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_static_scroll}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_static_z}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_static_use}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>relative</code></td>
              <td style={{ padding: '8px 12px' }}>{s.comp_relative_flow}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_relative_ref}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_relative_scroll}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_relative_z}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_relative_use}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>absolute</code></td>
              <td style={{ padding: '8px 12px' }}>{s.comp_absolute_flow}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_absolute_ref}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_absolute_scroll}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_absolute_z}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_absolute_use}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>fixed</code></td>
              <td style={{ padding: '8px 12px' }}>{s.comp_fixed_flow}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_fixed_ref}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_fixed_scroll}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_fixed_z}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_fixed_use}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>sticky</code></td>
              <td style={{ padding: '8px 12px' }}>{s.comp_sticky_flow}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_sticky_ref}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_sticky_scroll}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_sticky_z}</td>
              <td style={{ padding: '8px 12px' }}>{s.comp_sticky_use}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ==================== STACKING CONTEXT ==================== */}
      <h2>{s.h2_stacking}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.stackingDesc }} />
      <ul>
        <li>{s.stackingList1}</li>
        <li>{s.stackingList2}</li>
        <li>{s.stackingList3}</li>
        <li>{s.stackingList4}</li>
        <li>{s.stackingList5}</li>
      </ul>
      <pre><code>{`/* z-index only works on positioned elements */
.element {
  position: relative;   /* or absolute, fixed, sticky */
  z-index: 10;          /* now this element stacks above z-index: 5 siblings */
}

/* Stacking context example — child can NEVER escape parent's context */
.parent-a {
  position: relative;
  z-index: 1;           /* creates stacking context */
}
.parent-a .child {
  position: relative;
  z-index: 9999;        /* still behind .parent-b if parent-b has z-index: 2 */
}
.parent-b {
  position: relative;
  z-index: 2;           /* parent-b and all children are above parent-a */
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.stackingTip }} />
      <pre><code>{`/* isolation: isolate — cleanest way to create stacking context */
.component {
  isolation: isolate;   /* creates new stacking context */
}

/* Now z-index inside .component is scoped — cannot leak out */
.component .dropdown {
  position: absolute;
  z-index: 10;          /* only competes with siblings inside .component */
}

/* Real-world example: card with overlapping elements */
.card {
  position: relative;
  isolation: isolate;   /* contain z-index to this card */
}
.card .badge {
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 1;           /* safe — won't interfere with other cards */
}
.card .image {
  position: relative;
  z-index: 0;
}`}</code></pre>

      {/* ==================== STICKY HEADER PATTERN ==================== */}
      <h2>{s.h2_sticky_header}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.stickyHeaderDesc }} />
      <pre><code>{`/* CSS-only sticky navbar */
.navbar {
  position: sticky;
  top: 0;                /* sticks when scrolled to top edge */
  z-index: 100;          /* stay above page content */
  background: #1e293b;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Optional: shadow appears only when stuck */
  box-shadow: none;
  transition: box-shadow 0.2s;
}

/* HTML structure:
   <header class="navbar">
     <div class="logo">Logo</div>
     <nav>
       <a href="#">Home</a>
       <a href="#">About</a>
       <a href="#">Contact</a>
     </nav>
   </header>
   <main>
     ... long scrollable content ...
   </main>
*/

/* Add shadow when scrolled (using IntersectionObserver or scroll sentinel) */
/* CSS-only approach with a sentinel element: */
.scroll-sentinel {
  position: absolute;
  top: 0;
  height: 1px;
  width: 100%;
}

/* With JavaScript — add class when scrolled: */
/* navbar.classList.toggle('scrolled', window.scrollY > 0); */
.navbar.scrolled {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Transparent-to-solid navbar on scroll */
.navbar-transparent {
  position: sticky;
  top: 0;
  background: transparent;
  transition: background 0.3s;
}
.navbar-transparent.scrolled {
  background: #1e293b;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.stickyHeaderNote }} />

      {/* ==================== STICKY SIDEBAR ==================== */}
      <h2>{s.h2_sticky_sidebar}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.stickySidebarDesc }} />
      <pre><code>{`/* Sticky sidebar layout */
.layout {
  display: flex;
  align-items: flex-start;  /* IMPORTANT: prevents sidebar from stretching */
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
}

.main-content {
  flex: 1;
  min-width: 0;            /* prevent overflow */
}

.sidebar {
  position: sticky;
  top: 80px;               /* stick 80px from top (below navbar) */
  width: 280px;
  flex-shrink: 0;
  max-height: calc(100vh - 100px);  /* prevent sidebar from exceeding viewport */
  overflow-y: auto;        /* scroll if sidebar content is tall */
}

/* HTML structure:
   <div class="layout">
     <main class="main-content">
       ... long article content ...
     </main>
     <aside class="sidebar">
       <nav class="toc">Table of Contents</nav>
       <div class="ads">Sidebar Ads</div>
     </aside>
   </div>
*/

/* Sticky sidebar with table of contents */
.toc {
  position: sticky;
  top: 80px;
  padding: 16px;
  border-left: 2px solid #3b82f6;
}

.toc a {
  display: block;
  padding: 4px 0;
  color: #94a3b8;
  text-decoration: none;
}

.toc a.active {
  color: #3b82f6;
  font-weight: 600;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.stickySidebarNote }} />

      {/* ==================== FIXED MODAL ==================== */}
      <h2>{s.h2_fixed_modal}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.fixedModalDesc }} />
      <pre><code>{`/* Fixed modal overlay */
.modal-backdrop {
  position: fixed;
  inset: 0;                /* covers entire viewport */
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #1e293b;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;      /* for close button positioning */
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 24px;
  cursor: pointer;
}

/* HTML structure:
   <div class="modal-backdrop">
     <div class="modal">
       <button class="modal-close">&times;</button>
       <h2>Modal Title</h2>
       <p>Modal content...</p>
     </div>
   </div>
*/

/* Animation for modal appearance */
.modal-backdrop {
  opacity: 0;
  transition: opacity 0.2s;
}
.modal-backdrop.active {
  opacity: 1;
}

.modal {
  transform: scale(0.95) translateY(10px);
  transition: transform 0.2s;
}
.modal-backdrop.active .modal {
  transform: scale(1) translateY(0);
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.fixedModalScroll }} />
      <pre><code>{`/* Scroll lock when modal is open */
body.modal-open {
  overflow: hidden;        /* prevent background scrolling */
}

/* Better scroll lock that preserves scroll position */
body.modal-open {
  overflow: hidden;
  position: fixed;         /* prevents iOS Safari bounce */
  width: 100%;
  top: calc(-1 * var(--scroll-y, 0px));
}

/* JavaScript to save and restore scroll position:
   // On open:
   document.documentElement.style.setProperty('--scroll-y', window.scrollY + 'px');
   document.body.classList.add('modal-open');

   // On close:
   document.body.classList.remove('modal-open');
   window.scrollTo(0, parseInt(getComputedStyle(document.documentElement)
     .getPropertyValue('--scroll-y')));
*/`}</code></pre>

      {/* ==================== ABSOLUTE POSITIONING PATTERNS ==================== */}
      <h2>{s.h2_absolute_patterns}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.absolutePatternsDesc }} />

      {/* Tooltip */}
      <h3>{s.h3_tooltip}</h3>
      <pre><code>{`/* Tooltip using absolute positioning */
.tooltip-wrapper {
  position: relative;      /* anchor for tooltip */
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);  /* 8px above the element */
  left: 50%;
  transform: translateX(-50%);  /* center horizontally */
  padding: 8px 12px;
  background: #1e293b;
  color: #f8fafc;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

/* Arrow */
.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1e293b;
}

/* Show on hover */
.tooltip-wrapper:hover .tooltip {
  opacity: 1;
}

/* Tooltip positions */
.tooltip.top    { bottom: calc(100% + 8px); top: auto; }
.tooltip.bottom { top: calc(100% + 8px); bottom: auto; }
.tooltip.left   { right: calc(100% + 8px); left: auto; top: 50%; transform: translateY(-50%); }
.tooltip.right  { left: calc(100% + 8px); right: auto; top: 50%; transform: translateY(-50%); }`}</code></pre>

      {/* Dropdown */}
      <h3>{s.h3_dropdown}</h3>
      <pre><code>{`/* Dropdown menu */
.dropdown {
  position: relative;      /* anchor for dropdown menu */
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;               /* directly below trigger */
  left: 0;
  min-width: 200px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 4px 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  z-index: 50;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
}

.dropdown:hover .dropdown-menu,
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu a {
  display: block;
  padding: 8px 16px;
  color: #e2e8f0;
  text-decoration: none;
}

.dropdown-menu a:hover {
  background: #334155;
}

/* Right-aligned dropdown */
.dropdown-menu.right {
  left: auto;
  right: 0;
}`}</code></pre>

      {/* Badge */}
      <h3>{s.h3_badge}</h3>
      <pre><code>{`/* Badge on avatar */
.avatar-wrapper {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 48px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  background: #ef4444;
  color: white;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  border: 2px solid #0f172a;  /* border matches background */
}

/* Status indicator (online/offline dot) */
.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #0f172a;
}
.status-dot.online  { background: #22c55e; }
.status-dot.offline { background: #6b7280; }
.status-dot.busy    { background: #ef4444; }

/* Corner ribbon on a card */
.card {
  position: relative;
  overflow: hidden;
}
.ribbon {
  position: absolute;
  top: 16px;
  right: -30px;
  transform: rotate(45deg);
  background: #3b82f6;
  color: white;
  padding: 4px 40px;
  font-size: 12px;
  font-weight: 700;
}`}</code></pre>

      {/* ==================== COMMON BUGS ==================== */}
      <h2>{s.h2_bugs}</h2>
      <p>{s.bugsDesc}</p>

      {/* Bug: Sticky not working */}
      <h3>{s.h3_bug_sticky}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.bugStickyDesc }} />
      <pre><code>{`/* PROBLEM: sticky not working */
.page-wrapper {
  overflow: hidden;         /* THIS breaks sticky! */
}
.page-wrapper .sticky-nav {
  position: sticky;
  top: 0;                   /* will NOT stick */
}

/* FIX 1: remove overflow: hidden from ancestors */
.page-wrapper {
  overflow: visible;        /* or just remove the overflow property */
}

/* FIX 2: if overflow is needed for layout, restructure HTML */
/* Move sticky element outside the overflow container: */
/*
  <nav class="sticky-nav">...</nav>     <!-- outside -->
  <div class="page-wrapper overflow-hidden">
    ... content ...
  </div>
*/

/* FIX 3: use overflow: clip instead (modern browsers) */
.page-wrapper {
  overflow: clip;           /* clips like hidden but doesn't break sticky */
}

/* CHECKLIST for debugging sticky: */
/* 1. Is top/bottom/left/right set?                    */
/* 2. Any ancestor with overflow: hidden/auto/scroll?  */
/* 3. Does the parent have enough height?              */
/* 4. Is the sticky element's height == parent height? */`}</code></pre>

      {/* Bug: z-index wars */}
      <h3>{s.h3_bug_zindex}</h3>
      <p>{s.bugZindexDesc}</p>
      <pre><code>{`/* PROBLEM: z-index: 9999 and it's still behind */
.modal    { z-index: 9999; }  /* still behind .dropdown?! */
.dropdown { z-index: 99999; } /* arms race! */

/* ROOT CAUSE: elements are in different stacking contexts */
.sidebar {
  position: relative;
  z-index: 1;               /* creates stacking context */
}
.sidebar .dropdown {
  z-index: 99999;           /* trapped inside sidebar's context */
}
.main {
  position: relative;
  z-index: 2;               /* main is above sidebar's ENTIRE context */
}

/* FIX: establish a clear z-index scale */
:root {
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-fixed:    300;
  --z-modal-backdrop: 400;
  --z-modal:    500;
  --z-tooltip:  600;
  --z-toast:    700;
}

/* FIX: use isolation: isolate to scope z-index */
.component {
  isolation: isolate;       /* z-index inside won't leak out */
}`}</code></pre>

      {/* Bug: Fixed not fixed */}
      <h3>{s.h3_bug_fixed}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.bugFixedDesc }} />
      <pre><code>{`/* PROBLEM: fixed element scrolls with the page */
.animated-parent {
  transform: scale(1);      /* THIS breaks fixed children! */
}
.animated-parent .fixed-toolbar {
  position: fixed;
  top: 0;                   /* behaves like absolute, not fixed */
}

/* Other properties that break fixed: */
.parent {
  filter: blur(0);          /* breaks fixed */
  perspective: 1000px;      /* breaks fixed */
  backdrop-filter: blur(5px); /* breaks fixed */
  will-change: transform;   /* breaks fixed */
  contain: paint;           /* breaks fixed */
}

/* FIX: move fixed element outside the transformed ancestor */
/*
  <div class="animated-parent">
    ... content ...
  </div>
  <div class="fixed-toolbar">   <!-- move outside -->
    ... toolbar ...
  </div>
*/

/* FIX: if you must keep the structure, use a portal (React/Vue) */`}</code></pre>

      {/* Bug: Absolute element clipped */}
      <h3>{s.h3_bug_absolute_overflow}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.bugAbsoluteOverflowDesc }} />
      <pre><code>{`/* PROBLEM: dropdown menu is clipped by parent */
.card {
  position: relative;
  overflow: hidden;         /* clips the dropdown! */
}
.card .dropdown-menu {
  position: absolute;
  top: 100%;                /* extends outside .card — gets clipped */
}

/* FIX 1: remove overflow: hidden if possible */
.card {
  overflow: visible;
}

/* FIX 2: use a portal to render dropdown outside the parent DOM */

/* FIX 3: use position: fixed instead of absolute for the dropdown */
.card .dropdown-menu {
  position: fixed;          /* now relative to viewport, not clipped */
  /* Calculate position with JavaScript */
}`}</code></pre>

      {/* ==================== FAQ ==================== */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p>{s.faq1_a}</p>
      <h3>{s.faq2_q}</h3>
      <p>{s.faq2_a}</p>
      <h3>{s.faq3_q}</h3>
      <p>{s.faq3_a}</p>
      <h3>{s.faq4_q}</h3>
      <p>{s.faq4_a}</p>
      <h3>{s.faq5_q}</h3>
      <p>{s.faq5_a}</p>

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/flexbox-generator`} style={{ fontWeight: 600 }}>{s.linkFlexboxBottom}</Link></p>
      <p><Link href={`/${lang}/tools/css-unit-converter`} style={{ fontWeight: 600 }}>{s.linkUnitBottom}</Link></p>
    </>
  );
}
