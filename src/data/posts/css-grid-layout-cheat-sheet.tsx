'use client';

import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'CSS Grid is the most powerful two-dimensional layout system available in CSS. It lets you control both rows and columns simultaneously, making complex page layouts simple and intuitive. This <strong>complete CSS Grid cheat sheet</strong> covers every property with practical code examples so you can master grid-based layouts for any project.',
    linkTool: 'Build flexbox layouts visually with our Flexbox Generator →',
    linkTool2: 'Convert CSS units easily with our CSS Unit Converter →',
    h2_container: 'Grid Container Properties',
    containerDesc: 'CSS Grid starts with a grid container. Set <code>display: grid</code> on a parent element and its direct children become grid items. You define the structure of rows and columns on the container, and items are placed into the resulting grid cells.',
    h3_display: 'display: grid | inline-grid',
    displayDesc: 'This defines a grid container. <code>grid</code> creates a block-level grid container; <code>inline-grid</code> creates an inline-level one that flows with surrounding text.',
    h3_columns: 'grid-template-columns',
    columnsDesc: 'Defines the number and size of columns in your grid. You can use fixed lengths, percentages, the <code>fr</code> unit, or the <code>repeat()</code> function.',
    h3_rows: 'grid-template-rows',
    rowsDesc: 'Defines the number and size of rows. Works exactly like <code>grid-template-columns</code> but for the vertical axis.',
    h2_fr: 'The fr Unit & repeat()',
    frDesc: 'The <code>fr</code> (fractional) unit represents a fraction of the available space in the grid container. Combined with <code>repeat()</code>, it provides a flexible and concise way to define grid tracks.',
    h3_fr_basic: 'Fractional Units (fr)',
    frBasicDesc: 'The <code>fr</code> unit distributes remaining space after fixed-size tracks are allocated. It is the most important unit in CSS Grid for creating flexible layouts.',
    h3_repeat: 'repeat() Function',
    repeatDesc: 'The <code>repeat()</code> function avoids repetitive track definitions. It accepts a repeat count and a track list.',
    h3_auto_fill_fit: 'auto-fill & auto-fit with minmax()',
    autoFillFitDesc: 'These keywords inside <code>repeat()</code> create responsive grids without media queries. They automatically determine how many tracks can fit in the container.',
    h2_gap: 'Grid Gap',
    gapDesc: 'The <code>gap</code> property (formerly <code>grid-gap</code>) controls spacing between grid tracks. Unlike margins, gaps only appear between items, not on the outer edges of the grid.',
    h3_gap_basic: 'gap, row-gap, column-gap',
    gapBasicDesc: 'You can set gaps uniformly or independently for rows and columns.',
    h2_areas: 'Grid Template Areas',
    areasDesc: 'Grid template areas let you name regions of your grid and place items by referencing those names. This creates a visual, ASCII-art-like representation of your layout directly in CSS.',
    h3_areas_basic: 'Defining Named Areas',
    areasBasicDesc: 'Use <code>grid-template-areas</code> on the container and <code>grid-area</code> on items to assign them to named regions.',
    h3_areas_empty: 'Empty Cells & Complex Layouts',
    areasEmptyDesc: 'Use a dot (<code>.</code>) to denote empty cells. Each row in the template must have the same number of columns.',
    h2_placement: 'Grid Item Placement',
    placementDesc: 'Grid items can be explicitly placed using line numbers, spans, or named areas. Grid lines are numbered starting from 1 at the start edge.',
    h3_col_row: 'grid-column & grid-row',
    colRowDesc: 'These shorthand properties define where an item starts and ends on the column and row axes using grid line numbers.',
    h3_span: 'Spanning Multiple Tracks',
    spanDesc: 'The <code>span</code> keyword lets an item span multiple columns or rows without specifying exact end lines.',
    h3_grid_area: 'grid-area Shorthand',
    gridAreaDesc: 'The <code>grid-area</code> property is a shorthand for <code>grid-row-start</code>, <code>grid-column-start</code>, <code>grid-row-end</code>, and <code>grid-column-end</code> in a single declaration.',
    h2_alignment: 'Alignment',
    alignmentDesc: 'CSS Grid provides six alignment properties that control how items are positioned within their grid cells and how the entire grid is positioned within its container.',
    h3_justify_items: 'justify-items & align-items',
    justifyItemsDesc: 'These properties align all grid items within their cells. <code>justify-items</code> aligns along the inline (row) axis; <code>align-items</code> aligns along the block (column) axis.',
    h3_justify_content: 'justify-content & align-content',
    justifyContentDesc: 'These properties align the entire grid within the grid container when the grid is smaller than the container. <code>justify-content</code> aligns horizontally; <code>align-content</code> aligns vertically.',
    h3_place: 'place-items & place-content',
    placeDesc: 'These are shorthands that combine align and justify in a single declaration.',
    h3_justify_self: 'justify-self & align-self',
    justifySelfDesc: 'These properties override alignment for individual grid items, overriding <code>justify-items</code> and <code>align-items</code> respectively.',
    h2_autoflow: 'Auto Flow & Implicit Grids',
    autoflowDesc: 'When you don\'t explicitly place every item, CSS Grid uses an auto-placement algorithm. The <code>grid-auto-flow</code> property controls how auto-placed items fill the grid.',
    h3_autoflow_basic: 'grid-auto-flow',
    autoflowBasicDesc: 'Controls the direction and packing behavior of auto-placed items.',
    h3_implicit: 'Implicit Grid Tracks',
    implicitDesc: 'When items are placed outside the explicitly defined grid, implicit tracks are created. Use <code>grid-auto-rows</code> and <code>grid-auto-columns</code> to size these implicit tracks.',
    h2_responsive: 'Responsive Grid Patterns',
    responsiveDesc: 'CSS Grid excels at creating responsive layouts. Here are the most common responsive patterns, many of which require zero media queries.',
    h3_autofill_vs_autofit: 'auto-fill vs auto-fit',
    autofillVsAutofitDesc: 'Both create responsive grids, but they differ when there are fewer items than available columns. <code>auto-fill</code> keeps empty tracks; <code>auto-fit</code> collapses them.',
    h3_responsive_minmax: 'Responsive with minmax()',
    responsiveMinmaxDesc: 'The <code>minmax()</code> function sets a minimum and maximum size for grid tracks, enabling fluid responsive behavior.',
    h3_media_queries: 'Grid with Media Queries',
    mediaQueriesDesc: 'For more complex responsive changes, combine CSS Grid with traditional media queries to alter the grid structure at different breakpoints.',
    h2_layouts: 'Common Grid Layouts',
    layoutsDesc: 'Here are production-ready CSS Grid layout patterns that you can use directly in your projects.',
    h3_holy_grail: 'Holy Grail Layout',
    holyGrailDesc: 'The classic page layout with header, footer, main content, and two sidebars — achievable with just a few lines of Grid CSS.',
    h3_dashboard: 'Dashboard Layout',
    dashboardDesc: 'A dashboard with a fixed sidebar, header, and a content area filled with cards of varying sizes.',
    h3_card_grid: 'Responsive Card Grid',
    cardGridDesc: 'An auto-responsive card grid that adapts to any screen width without media queries.',
    h3_masonry: 'Masonry-like Layout',
    masonryDesc: 'While true masonry requires JavaScript or the experimental <code>masonry</code> value, you can approximate it using <code>grid-auto-rows</code> and row spanning.',
    h3_sidebar_content: 'Sidebar + Content',
    sidebarContentDesc: 'A simple two-column layout with a fixed-width sidebar and flexible content area.',
    h2_vs_flexbox: 'Grid vs Flexbox',
    vsFlexboxDesc: 'CSS Grid and Flexbox are complementary layout systems. Understanding when to use each one is essential for efficient CSS architecture.',
    gridBest: 'CSS Grid is best for:',
    flexboxBest: 'Flexbox is best for:',
    vsTableHead1: 'Feature',
    vsTableHead2: 'CSS Grid',
    vsTableHead3: 'Flexbox',
    vsRow1_1: 'Dimensions',
    vsRow1_2: 'Two-dimensional (rows + columns)',
    vsRow1_3: 'One-dimensional (row or column)',
    vsRow2_1: 'Layout approach',
    vsRow2_2: 'Layout-first (define structure, place items)',
    vsRow2_3: 'Content-first (items determine layout)',
    vsRow3_1: 'Track sizing',
    vsRow3_2: 'Explicit row and column tracks',
    vsRow3_3: 'Items size themselves',
    vsRow4_1: 'Overlap',
    vsRow4_2: 'Items can overlap (grid-area)',
    vsRow4_3: 'No built-in overlap',
    vsRow5_1: 'Use case',
    vsRow5_2: 'Page layouts, dashboards, galleries',
    vsRow5_3: 'Nav bars, toolbars, card rows',
    combineDesc: 'In practice, the best approach is to combine both: use Grid for the overall page layout and Flexbox for component-level alignment within grid cells.',
    h2_browser: 'Browser Support & Fallbacks',
    browserDesc: 'CSS Grid has excellent browser support in all modern browsers. Here is a summary of feature support.',
    browserNote: 'CSS Grid has over <strong>97% global browser support</strong>. For the small percentage of older browsers, use <code>@supports</code> to provide fallbacks:',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between CSS Grid and Flexbox?',
    faq1_a: 'CSS Grid is a two-dimensional layout system that controls both rows and columns simultaneously, making it ideal for page-level layouts. Flexbox is one-dimensional, handling either a row or a column at a time, making it ideal for component-level layouts. Grid is layout-first (you define the structure and place items into it), while Flexbox is content-first (items determine their own size and the layout adapts). In practice, you should use both together — Grid for page structure and Flexbox for component internals.',
    faq2_q: 'What does fr mean in CSS Grid?',
    faq2_a: 'The fr unit stands for "fraction" and represents a fraction of the available free space in the grid container. For example, grid-template-columns: 1fr 2fr 1fr creates three columns where the middle column gets twice as much space as each side column. The fr unit only distributes space remaining after fixed-size tracks (px, rem, etc.) have been allocated, making it perfect for flexible, responsive layouts.',
    faq3_q: 'How do I create a responsive grid without media queries?',
    faq3_a: 'Use repeat(auto-fit, minmax(min, 1fr)) or repeat(auto-fill, minmax(min, 1fr)). For example, grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) creates columns that are at least 250px wide and automatically wrap to new rows as the container shrinks. auto-fit collapses empty tracks so items stretch to fill the row, while auto-fill keeps empty tracks.',
    faq4_q: 'What is the difference between auto-fill and auto-fit?',
    faq4_a: 'Both auto-fill and auto-fit create as many tracks as will fit in the container. The difference appears when there are fewer items than available columns: auto-fill keeps the empty tracks, maintaining their width as empty space; auto-fit collapses empty tracks to zero width, allowing existing items to stretch and fill the entire row. Use auto-fit when you want items to expand, and auto-fill when you want consistent column widths regardless of item count.',
    faq5_q: 'Can I use CSS Grid for a masonry layout?',
    faq5_a: 'Native CSS masonry is an experimental feature (grid-template-rows: masonry) currently only supported in Firefox behind a flag. For production, you can approximate masonry with CSS Grid by using grid-auto-rows with small values and spanning items across different numbers of rows, but true masonry where items fill gaps vertically still requires JavaScript libraries like Masonry.js or CSS Columns as an alternative approach. The CSS masonry specification is actively being developed and may reach broader browser support in the future.',
    conclusion: 'CSS Grid is the definitive layout system for modern web development. Combined with Flexbox for component-level alignment, it gives you complete control over any layout. Practice with our interactive tools to solidify your understanding.',
    linkToolBottom: 'Try our Flexbox Generator to complement your Grid layouts →',
    linkToolBottom2: 'Convert between CSS units with our CSS Unit Converter →',
  },
  zh: {
    intro: 'CSS Grid 是 CSS 中最强大的二维布局系统。它允许你同时控制行和列，使复杂的页面布局变得简单直观。本<strong>完整 CSS Grid 速查表</strong>通过实际代码示例涵盖每个属性，帮助你掌握基于网格的布局。',
    linkTool: '使用我们的 Flexbox 生成器可视化构建布局 →',
    linkTool2: '使用我们的 CSS 单位转换器轻松转换 CSS 单位 →',
    h2_container: '网格容器属性',
    containerDesc: 'CSS Grid 从网格容器开始。在父元素上设置 <code>display: grid</code>，其直接子元素就成为网格项。你在容器上定义行和列的结构，项目被放置到生成的网格单元格中。',
    h3_display: 'display: grid | inline-grid',
    displayDesc: '定义网格容器。<code>grid</code> 创建块级网格容器；<code>inline-grid</code> 创建行内级网格容器，与周围文本一起流动。',
    h3_columns: 'grid-template-columns',
    columnsDesc: '定义网格中列的数量和大小。你可以使用固定长度、百分比、<code>fr</code> 单位或 <code>repeat()</code> 函数。',
    h3_rows: 'grid-template-rows',
    rowsDesc: '定义行的数量和大小。与 <code>grid-template-columns</code> 完全相同，但用于垂直轴。',
    h2_fr: 'fr 单位与 repeat()',
    frDesc: '<code>fr</code>（分数）单位表示网格容器中可用空间的一个分数。结合 <code>repeat()</code>，它提供了一种灵活简洁的方式来定义网格轨道。',
    h3_fr_basic: '分数单位 (fr)',
    frBasicDesc: '<code>fr</code> 单位在固定大小的轨道分配完毕后，分配剩余空间。它是 CSS Grid 中创建灵活布局最重要的单位。',
    h3_repeat: 'repeat() 函数',
    repeatDesc: '<code>repeat()</code> 函数避免重复的轨道定义。它接受重复次数和轨道列表。',
    h3_auto_fill_fit: 'auto-fill 与 auto-fit 配合 minmax()',
    autoFillFitDesc: '在 <code>repeat()</code> 中使用这些关键字可以创建无需媒体查询的响应式网格。它们自动确定容器中可以容纳多少个轨道。',
    h2_gap: '网格间距',
    gapDesc: '<code>gap</code> 属性（曾用名 <code>grid-gap</code>）控制网格轨道之间的间距。与 margin 不同，间距仅出现在项目之间，不在网格的外边缘。',
    h3_gap_basic: 'gap、row-gap、column-gap',
    gapBasicDesc: '你可以统一设置间距，也可以分别为行和列设置独立的间距。',
    h2_areas: '网格模板区域',
    areasDesc: '网格模板区域允许你为网格区域命名，并通过引用这些名称来放置项目。这在 CSS 中直接创建了一种可视化的、类似 ASCII 艺术的布局表示。',
    h3_areas_basic: '定义命名区域',
    areasBasicDesc: '在容器上使用 <code>grid-template-areas</code>，在项目上使用 <code>grid-area</code> 将它们分配到命名区域。',
    h3_areas_empty: '空单元格与复杂布局',
    areasEmptyDesc: '使用点号（<code>.</code>）表示空单元格。模板中的每一行必须有相同数量的列。',
    h2_placement: '网格项放置',
    placementDesc: '网格项可以使用行号、跨度或命名区域进行显式放置。网格线从起始边缘的 1 开始编号。',
    h3_col_row: 'grid-column 与 grid-row',
    colRowDesc: '这些简写属性使用网格线编号定义项目在列轴和行轴上的起始和结束位置。',
    h3_span: '跨越多个轨道',
    spanDesc: '<code>span</code> 关键字让项目跨越多列或多行，无需指定确切的结束线。',
    h3_grid_area: 'grid-area 简写',
    gridAreaDesc: '<code>grid-area</code> 属性是 <code>grid-row-start</code>、<code>grid-column-start</code>、<code>grid-row-end</code> 和 <code>grid-column-end</code> 的简写，在一个声明中完成。',
    h2_alignment: '对齐方式',
    alignmentDesc: 'CSS Grid 提供六个对齐属性，控制项目在网格单元格内的定位以及整个网格在容器内的定位。',
    h3_justify_items: 'justify-items 与 align-items',
    justifyItemsDesc: '这些属性在单元格内对齐所有网格项。<code>justify-items</code> 沿行内（行）轴对齐；<code>align-items</code> 沿块（列）轴对齐。',
    h3_justify_content: 'justify-content 与 align-content',
    justifyContentDesc: '当网格小于容器时，这些属性在网格容器内对齐整个网格。<code>justify-content</code> 水平对齐；<code>align-content</code> 垂直对齐。',
    h3_place: 'place-items 与 place-content',
    placeDesc: '这些是将 align 和 justify 合并为单个声明的简写属性。',
    h3_justify_self: 'justify-self 与 align-self',
    justifySelfDesc: '这些属性覆盖单个网格项的对齐方式，分别覆盖 <code>justify-items</code> 和 <code>align-items</code>。',
    h2_autoflow: '自动流与隐式网格',
    autoflowDesc: '当你没有显式放置每个项目时，CSS Grid 使用自动放置算法。<code>grid-auto-flow</code> 属性控制自动放置的项目如何填充网格。',
    h3_autoflow_basic: 'grid-auto-flow',
    autoflowBasicDesc: '控制自动放置项目的方向和填充行为。',
    h3_implicit: '隐式网格轨道',
    implicitDesc: '当项目放置在显式定义的网格之外时，会创建隐式轨道。使用 <code>grid-auto-rows</code> 和 <code>grid-auto-columns</code> 来设置这些隐式轨道的大小。',
    h2_responsive: '响应式网格模式',
    responsiveDesc: 'CSS Grid 擅长创建响应式布局。以下是最常见的响应式模式，其中许多不需要任何媒体查询。',
    h3_autofill_vs_autofit: 'auto-fill vs auto-fit',
    autofillVsAutofitDesc: '两者都可以创建响应式网格，但当项目数少于可用列数时有所不同。<code>auto-fill</code> 保留空轨道；<code>auto-fit</code> 折叠空轨道。',
    h3_responsive_minmax: '使用 minmax() 实现响应式',
    responsiveMinmaxDesc: '<code>minmax()</code> 函数设置网格轨道的最小和最大尺寸，实现流式响应行为。',
    h3_media_queries: 'Grid 配合媒体查询',
    mediaQueriesDesc: '对于更复杂的响应式变化，将 CSS Grid 与传统媒体查询结合，在不同断点改变网格结构。',
    h2_layouts: '常见网格布局',
    layoutsDesc: '以下是可以直接用于项目的生产级 CSS Grid 布局模式。',
    h3_holy_grail: '圣杯布局',
    holyGrailDesc: '经典的页面布局，包含页头、页脚、主内容和两个侧边栏 — 只需几行 Grid CSS 即可实现。',
    h3_dashboard: '仪表盘布局',
    dashboardDesc: '带有固定侧边栏、页头和由不同大小卡片填充的内容区域的仪表盘。',
    h3_card_grid: '响应式卡片网格',
    cardGridDesc: '自动响应的卡片网格，无需媒体查询即可适应任何屏幕宽度。',
    h3_masonry: '瀑布流布局',
    masonryDesc: '虽然真正的瀑布流需要 JavaScript 或实验性的 <code>masonry</code> 值，但你可以使用 <code>grid-auto-rows</code> 和行跨越来近似实现。',
    h3_sidebar_content: '侧边栏 + 内容',
    sidebarContentDesc: '简单的两栏布局，包含固定宽度的侧边栏和灵活的内容区域。',
    h2_vs_flexbox: 'Grid vs Flexbox',
    vsFlexboxDesc: 'CSS Grid 和 Flexbox 是互补的布局系统。理解何时使用哪个对于高效的 CSS 架构至关重要。',
    gridBest: 'CSS Grid 最适合：',
    flexboxBest: 'Flexbox 最适合：',
    vsTableHead1: '特性',
    vsTableHead2: 'CSS Grid',
    vsTableHead3: 'Flexbox',
    vsRow1_1: '维度',
    vsRow1_2: '二维（行 + 列）',
    vsRow1_3: '一维（行或列）',
    vsRow2_1: '布局方式',
    vsRow2_2: '布局优先（定义结构，放置项目）',
    vsRow2_3: '内容优先（项目决定布局）',
    vsRow3_1: '轨道大小',
    vsRow3_2: '显式定义行列轨道',
    vsRow3_3: '项目自行调整大小',
    vsRow4_1: '重叠',
    vsRow4_2: '项目可以重叠（grid-area）',
    vsRow4_3: '无内置重叠',
    vsRow5_1: '使用场景',
    vsRow5_2: '页面布局、仪表盘、画廊',
    vsRow5_3: '导航栏、工具栏、卡片行',
    combineDesc: '在实践中，最佳方法是将两者结合使用：使用 Grid 进行整体页面布局，使用 Flexbox 在网格单元格内进行组件级对齐。',
    h2_browser: '浏览器支持与回退方案',
    browserDesc: 'CSS Grid 在所有现代浏览器中都有出色的支持。以下是功能支持摘要。',
    browserNote: 'CSS Grid 拥有超过 <strong>97% 的全球浏览器支持率</strong>。对于少数旧版浏览器，使用 <code>@supports</code> 提供回退方案：',
    h2_faq: '常见问题',
    faq1_q: 'CSS Grid 和 Flexbox 有什么区别？',
    faq1_a: 'CSS Grid 是二维布局系统，同时控制行和列，非常适合页面级布局。Flexbox 是一维的，一次只处理一行或一列，适合组件级布局。Grid 是布局优先（你定义结构并将项目放入其中），而 Flexbox 是内容优先（项目决定自身大小，布局自适应）。实际中，你应该同时使用两者 — Grid 用于页面结构，Flexbox 用于组件内部。',
    faq2_q: 'CSS Grid 中的 fr 是什么意思？',
    faq2_a: 'fr 单位代表"分数"，表示网格容器中可用自由空间的一个分数。例如，grid-template-columns: 1fr 2fr 1fr 创建三列，中间列获得两侧列两倍的空间。fr 单位仅分配固定大小轨道（px、rem 等）分配完毕后的剩余空间，非常适合创建灵活的响应式布局。',
    faq3_q: '如何在不使用媒体查询的情况下创建响应式网格？',
    faq3_a: '使用 repeat(auto-fit, minmax(min, 1fr)) 或 repeat(auto-fill, minmax(min, 1fr))。例如，grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) 创建至少 250px 宽的列，当容器缩小时自动换行到新行。auto-fit 折叠空轨道使项目拉伸填满行，auto-fill 保留空轨道。',
    faq4_q: 'auto-fill 和 auto-fit 有什么区别？',
    faq4_a: 'auto-fill 和 auto-fit 都创建尽可能多的轨道以适应容器。区别在于当项目数少于可用列数时：auto-fill 保留空轨道，将其宽度维持为空白空间；auto-fit 将空轨道折叠为零宽度，允许现有项目拉伸填满整行。当你希望项目扩展时使用 auto-fit，当你希望列宽一致时使用 auto-fill。',
    faq5_q: '可以用 CSS Grid 实现瀑布流布局吗？',
    faq5_a: '原生 CSS 瀑布流是一个实验性功能（grid-template-rows: masonry），目前仅在 Firefox 中以标志位方式支持。在生产环境中，你可以使用 grid-auto-rows 配合小值，并让项目跨越不同数量的行来近似实现瀑布流，但真正的纵向填充间隙的瀑布流仍然需要 JavaScript 库（如 Masonry.js）或 CSS Columns 作为替代方案。CSS 瀑布流规范正在积极开发中，未来可能获得更广泛的浏览器支持。',
    conclusion: 'CSS Grid 是现代 Web 开发的终极布局系统。结合 Flexbox 进行组件级对齐，你可以完全控制任何布局。使用我们的交互工具来巩固你的理解。',
    linkToolBottom: '试试我们的 Flexbox 生成器来配合你的 Grid 布局 →',
    linkToolBottom2: '使用我们的 CSS 单位转换器进行单位换算 →',
  },
};

export default function CssGridLayoutCheatSheet({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/flexbox-generator`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>
      <p><Link href={`/${lang}/tools/css-unit-converter`} style={{ fontWeight: 600 }}>{s.linkTool2}</Link></p>

      {/* ==================== 1. GRID CONTAINER PROPERTIES ==================== */}
      <h2>{s.h2_container}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.containerDesc }} />

      {/* display */}
      <h3>{s.h3_display}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.displayDesc }} />
      <pre><code>{`.grid-container {
  display: grid;          /* block-level grid container */
}

.inline-grid-container {
  display: inline-grid;   /* inline-level grid container */
}`}</code></pre>

      {/* grid-template-columns */}
      <h3>{s.h3_columns}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.columnsDesc }} />
      <pre><code>{`.container {
  display: grid;

  /* Fixed-width columns */
  grid-template-columns: 200px 200px 200px;

  /* Mixed units */
  grid-template-columns: 200px 1fr 2fr;

  /* Percentage-based */
  grid-template-columns: 25% 50% 25%;

  /* Using repeat() */
  grid-template-columns: repeat(3, 1fr);

  /* Named grid lines */
  grid-template-columns: [start] 1fr [center] 2fr [end];
}`}</code></pre>

      {/* grid-template-rows */}
      <h3>{s.h3_rows}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.rowsDesc }} />
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* Fixed-height rows */
  grid-template-rows: 80px 200px 80px;

  /* Auto-sized rows */
  grid-template-rows: auto 1fr auto;

  /* Using minmax() for flexible rows */
  grid-template-rows: minmax(100px, auto) 1fr minmax(60px, auto);
}`}</code></pre>

      {/* ==================== 2. FR UNIT & REPEAT ==================== */}
      <h2>{s.h2_fr}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.frDesc }} />

      {/* fr basic */}
      <h3>{s.h3_fr_basic}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.frBasicDesc }} />
      <pre><code>{`/* Equal columns */
.container {
  grid-template-columns: 1fr 1fr 1fr;
  /* Each column gets 1/3 of available space */
}

/* Proportional columns */
.container {
  grid-template-columns: 1fr 2fr 1fr;
  /* Middle column is twice as wide: 25% | 50% | 25% */
}

/* Mixed fixed and flexible */
.container {
  grid-template-columns: 250px 1fr;
  /* Fixed 250px sidebar, content fills the rest */
}

/* Multiple fixed + fr */
.container {
  grid-template-columns: 80px 1fr 1fr 80px;
  /* 80px | flexible | flexible | 80px */
}`}</code></pre>

      {/* repeat() */}
      <h3>{s.h3_repeat}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.repeatDesc }} />
      <pre><code>{`/* Basic repeat */
grid-template-columns: repeat(3, 1fr);
/* Equivalent to: 1fr 1fr 1fr */

/* Repeat with fixed size */
grid-template-columns: repeat(4, 200px);
/* Equivalent to: 200px 200px 200px 200px */

/* Repeat a pattern */
grid-template-columns: repeat(3, 1fr 2fr);
/* Equivalent to: 1fr 2fr 1fr 2fr 1fr 2fr */

/* Mix repeat with other values */
grid-template-columns: 100px repeat(3, 1fr) 100px;
/* Equivalent to: 100px 1fr 1fr 1fr 100px */

/* Repeat with minmax() */
grid-template-columns: repeat(3, minmax(200px, 1fr));`}</code></pre>

      {/* auto-fill & auto-fit */}
      <h3>{s.h3_auto_fill_fit}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.autoFillFitDesc }} />
      <pre><code>{`/* auto-fill: create as many 200px+ columns as fit */
.container {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Fills row with columns, empty tracks remain */
}

/* auto-fit: same but collapse empty tracks */
.container {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* Items stretch to fill entire row */
}

/* Practical responsive card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}`}</code></pre>

      {/* ==================== 3. GRID GAP ==================== */}
      <h2>{s.h2_gap}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.gapDesc }} />

      <h3>{s.h3_gap_basic}</h3>
      <p>{s.gapBasicDesc}</p>
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* Equal gap in both directions */
  gap: 16px;

  /* Different row and column gaps */
  gap: 20px 12px;         /* row-gap: 20px, column-gap: 12px */

  /* Individual properties */
  row-gap: 20px;
  column-gap: 12px;
}

/* Legacy syntax (still works) */
.container {
  grid-gap: 16px;
  grid-row-gap: 20px;
  grid-column-gap: 12px;
}

/* Common gap values for different contexts */
.tight-grid   { gap: 8px; }    /* compact UI */
.normal-grid  { gap: 16px; }   /* standard spacing */
.spacious-grid { gap: 24px; }  /* card layouts */
.loose-grid   { gap: 32px; }   /* landing pages */`}</code></pre>

      {/* ==================== 4. GRID TEMPLATE AREAS ==================== */}
      <h2>{s.h2_areas}</h2>
      <p>{s.areasDesc}</p>

      <h3>{s.h3_areas_basic}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.areasBasicDesc }} />
      <pre><code>{`/* Define the grid structure visually */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  min-height: 100vh;
}

/* Assign items to named areas */
.page > header  { grid-area: header; }
.page > aside   { grid-area: sidebar; }
.page > main    { grid-area: content; }
.page > footer  { grid-area: footer; }

/* HTML structure:
   <div class="page">
     <header>Header</header>
     <aside>Sidebar</aside>
     <main>Content</main>
     <footer>Footer</footer>
   </div>
*/`}</code></pre>

      <h3>{s.h3_areas_empty}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.areasEmptyDesc }} />
      <pre><code>{`/* Using dots for empty cells */
.dashboard {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr 1fr auto;
  grid-template-areas:
    "nav    header  header"
    "nav    main    aside"
    "nav    main    ."
    "nav    footer  footer";
  gap: 16px;
  min-height: 100vh;
}

/* Three-column layout with empty corners */
.layout {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    ".      header  ."
    "left   center  right"
    ".      footer  .";
}`}</code></pre>

      {/* ==================== 5. GRID ITEM PLACEMENT ==================== */}
      <h2>{s.h2_placement}</h2>
      <p>{s.placementDesc}</p>

      <h3>{s.h3_col_row}</h3>
      <p>{s.colRowDesc}</p>
      <pre><code>{`/*
  Grid lines are numbered:
  Column lines: 1 | 2 | 3 | 4
  Row lines:    1 -- 2 -- 3 -- 4

  3-column grid has 4 column lines
  3-row grid has 4 row lines
*/

.item {
  /* Start at column line 1, end at column line 3 */
  grid-column-start: 1;
  grid-column-end: 3;

  /* Shorthand: start / end */
  grid-column: 1 / 3;    /* spans columns 1-2 */
  grid-row: 1 / 2;       /* occupies first row */
}

/* Using negative line numbers (count from the end) */
.full-width {
  grid-column: 1 / -1;   /* spans all columns */
}

.last-two-columns {
  grid-column: -3 / -1;  /* last two columns */
}`}</code></pre>

      <h3>{s.h3_span}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.spanDesc }} />
      <pre><code>{`/* Span 2 columns from auto-placement position */
.wide-item {
  grid-column: span 2;
}

/* Span 3 rows */
.tall-item {
  grid-row: span 3;
}

/* Span 2 columns starting from line 2 */
.specific-item {
  grid-column: 2 / span 2;   /* lines 2 to 4 */
}

/* Create a featured card spanning 2x2 */
.featured {
  grid-column: span 2;
  grid-row: span 2;
}`}</code></pre>

      <h3>{s.h3_grid_area}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.gridAreaDesc }} />
      <pre><code>{`/* grid-area: row-start / col-start / row-end / col-end */

.item {
  grid-area: 1 / 1 / 3 / 3;
  /* Equivalent to:
     grid-row-start: 1;
     grid-column-start: 1;
     grid-row-end: 3;
     grid-column-end: 3;
  */
}

/* Span the top-left 2x2 area */
.top-left {
  grid-area: 1 / 1 / 3 / 3;
}

/* Full-width header */
.header {
  grid-area: 1 / 1 / 2 / -1;
}

/* Named area assignment (with grid-template-areas) */
.sidebar {
  grid-area: sidebar;  /* matches name in grid-template-areas */
}`}</code></pre>

      {/* ==================== 6. ALIGNMENT ==================== */}
      <h2>{s.h2_alignment}</h2>
      <p>{s.alignmentDesc}</p>

      <h3>{s.h3_justify_items}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.justifyItemsDesc }} />
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);

  /* Align items horizontally within their cells */
  justify-items: start;     /* items hug the left edge */
  justify-items: end;       /* items hug the right edge */
  justify-items: center;    /* items centered horizontally */
  justify-items: stretch;   /* items fill cell width (default) */

  /* Align items vertically within their cells */
  align-items: start;       /* items hug the top edge */
  align-items: end;         /* items hug the bottom edge */
  align-items: center;      /* items centered vertically */
  align-items: stretch;     /* items fill cell height (default) */
}`}</code></pre>

      <h3>{s.h3_justify_content}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.justifyContentDesc }} />
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  /* Total grid width: 600px, container might be wider */

  /* Horizontal alignment of the entire grid */
  justify-content: start;          /* grid at the left */
  justify-content: end;            /* grid at the right */
  justify-content: center;         /* grid centered */
  justify-content: space-between;  /* equal space between tracks */
  justify-content: space-around;   /* equal space around tracks */
  justify-content: space-evenly;   /* equal space everywhere */

  /* Vertical alignment of the entire grid */
  align-content: start;
  align-content: end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
  align-content: space-evenly;
}`}</code></pre>

      <h3>{s.h3_place}</h3>
      <p>{s.placeDesc}</p>
      <pre><code>{`/* place-items: <align-items> <justify-items> */
.container {
  place-items: center;           /* center in both axes */
  place-items: start end;        /* top-right corner */
  place-items: center stretch;   /* centered vertically, full width */
}

/* place-content: <align-content> <justify-content> */
.container {
  place-content: center;         /* center entire grid */
  place-content: start center;   /* top, centered horizontally */
}

/* Perfect centering of grid items */
.container {
  display: grid;
  place-items: center;
  min-height: 100vh;
}`}</code></pre>

      <h3>{s.h3_justify_self}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.justifySelfDesc }} />
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: start;  /* all items left-aligned */
}

/* Override for a specific item */
.special-item {
  justify-self: center;  /* this item centered in its cell */
  align-self: end;       /* this item at bottom of its cell */
}

/* Values: start | end | center | stretch */
.item-a { justify-self: start; }    /* left */
.item-b { justify-self: center; }   /* center */
.item-c { justify-self: end; }      /* right */
.item-d { justify-self: stretch; }  /* full width */`}</code></pre>

      {/* ==================== 7. AUTO FLOW ==================== */}
      <h2>{s.h2_autoflow}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.autoflowDesc }} />

      <h3>{s.h3_autoflow_basic}</h3>
      <p>{s.autoflowBasicDesc}</p>
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* Fill row by row (default) */
  grid-auto-flow: row;
  /*  [1] [2] [3]
      [4] [5] [6]  */

  /* Fill column by column */
  grid-auto-flow: column;
  /*  [1] [3] [5]
      [2] [4] [6]  */

  /* Dense packing: fill gaps left by larger items */
  grid-auto-flow: row dense;
  /*  Without dense: [wide] [  ] [3]    (gap at position 2)
      With dense:    [wide] [3] [4]    (gap filled)  */

  grid-auto-flow: column dense;
}`}</code></pre>

      <h3>{s.h3_implicit}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.implicitDesc }} />
      <pre><code>{`/* Only 2 rows defined, but we have 9 items */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;

  /* Implicit rows get this height */
  grid-auto-rows: 150px;

  /* Use minmax for flexible implicit rows */
  grid-auto-rows: minmax(100px, auto);
}

/* Implicit columns (when using grid-auto-flow: column) */
.container {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: 200px;
  grid-auto-columns: minmax(150px, 1fr);
}

/* Common pattern: unknown number of rows */
.feed {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(80px, auto);
  gap: 16px;
}`}</code></pre>

      {/* ==================== 8. RESPONSIVE PATTERNS ==================== */}
      <h2>{s.h2_responsive}</h2>
      <p>{s.responsiveDesc}</p>

      <h3>{s.h3_autofill_vs_autofit}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.autofillVsAutofitDesc }} />
      <pre><code>{`/* auto-fill: keeps empty tracks */
.grid-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
/* Container: 800px, items: 2
   Result: [item1] [item2] [empty] [empty]
   4 tracks of ~200px each */

/* auto-fit: collapses empty tracks */
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
/* Container: 800px, items: 2
   Result: [   item1   ] [   item2   ]
   2 tracks of 400px each — items stretch */

/* Rule of thumb:
   - auto-fit → items stretch to fill row (most common)
   - auto-fill → consistent column widths  */`}</code></pre>

      <h3>{s.h3_responsive_minmax}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.responsiveMinmaxDesc }} />
      <pre><code>{`/* minmax(min, max) */
grid-template-columns: minmax(200px, 1fr);   /* 200px to 1fr */
grid-template-columns: minmax(0, 300px);     /* 0 to 300px */
grid-template-rows: minmax(100px, auto);     /* at least 100px */

/* Responsive grid: no media queries needed */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}
/* 1 column on mobile, 2 on tablet, 3+ on desktop */

/* Preventing overflow on small screens */
.safe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 16px;
}
/* min(100%, 300px) ensures items don't overflow on narrow screens */`}</code></pre>

      <h3>{s.h3_media_queries}</h3>
      <p>{s.mediaQueriesDesc}</p>
      <pre><code>{`/* Mobile-first responsive grid */
.page-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "content"
    "sidebar"
    "footer";
  gap: 16px;
}

/* Tablet: sidebar beside content */
@media (min-width: 768px) {
  .page-layout {
    grid-template-columns: 250px 1fr;
    grid-template-areas:
      "header  header"
      "sidebar content"
      "footer  footer";
  }
}

/* Desktop: add right sidebar */
@media (min-width: 1200px) {
  .page-layout {
    grid-template-columns: 250px 1fr 200px;
    grid-template-areas:
      "header  header  header"
      "sidebar content aside"
      "footer  footer  footer";
  }
}`}</code></pre>

      {/* ==================== 9. COMMON LAYOUTS ==================== */}
      <h2>{s.h2_layouts}</h2>
      <p>{s.layoutsDesc}</p>

      {/* Holy Grail */}
      <h3>{s.h3_holy_grail}</h3>
      <p>{s.holyGrailDesc}</p>
      <pre><code>{`/* Holy Grail Layout with CSS Grid */
.holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header  header"
    "left   main    right"
    "footer footer  footer";
  min-height: 100vh;
  gap: 16px;
}

.holy-grail > header { grid-area: header; }
.holy-grail > .left  { grid-area: left; }
.holy-grail > main   { grid-area: main; }
.holy-grail > .right  { grid-area: right; }
.holy-grail > footer { grid-area: footer; }

/* Make it responsive */
@media (max-width: 768px) {
  .holy-grail {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "left"
      "right"
      "footer";
  }
}`}</code></pre>

      {/* Dashboard */}
      <h3>{s.h3_dashboard}</h3>
      <p>{s.dashboardDesc}</p>
      <pre><code>{`/* Dashboard Layout */
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar content";
  min-height: 100vh;
}

.dashboard > .sidebar { grid-area: sidebar; }
.dashboard > .header  { grid-area: header; }
.dashboard > .content { grid-area: content; }

/* Dashboard content area with cards */
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  gap: 20px;
  padding: 20px;
}

/* Featured card spans 2 columns */
.dashboard-cards .featured {
  grid-column: span 2;
}

/* Tall card spans 2 rows */
.dashboard-cards .tall {
  grid-row: span 2;
}`}</code></pre>

      {/* Card Grid */}
      <h3>{s.h3_card_grid}</h3>
      <p>{s.cardGridDesc}</p>
      <pre><code>{`/* Auto-responsive card grid — no media queries */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* Prevent overflow on very small screens */
.card-grid-safe {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 24px;
}

/* Card with internal grid layout */
.card {
  display: grid;
  grid-template-rows: 200px 1fr auto;
  /* image area | content | footer */
}

.card .image    { object-fit: cover; width: 100%; height: 100%; }
.card .body     { padding: 16px; }
.card .footer   { padding: 16px; border-top: 1px solid #eee; }`}</code></pre>

      {/* Masonry-like */}
      <h3>{s.h3_masonry}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.masonryDesc }} />
      <pre><code>{`/* Masonry-like layout using grid-auto-rows */
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 20px;  /* small row height as base unit */
  gap: 16px;
}

/* Items span different numbers of rows */
.masonry .item-small  { grid-row: span 8; }   /* 160px + gaps */
.masonry .item-medium { grid-row: span 12; }  /* 240px + gaps */
.masonry .item-large  { grid-row: span 16; }  /* 320px + gaps */
.masonry .item-tall   { grid-row: span 20; }  /* 400px + gaps */

/* Alternative: CSS Columns for true masonry */
.masonry-columns {
  column-count: 3;
  column-gap: 16px;
}
.masonry-columns .item {
  break-inside: avoid;
  margin-bottom: 16px;
}`}</code></pre>

      {/* Sidebar + Content */}
      <h3>{s.h3_sidebar_content}</h3>
      <p>{s.sidebarContentDesc}</p>
      <pre><code>{`/* Fixed sidebar + flexible content */
.sidebar-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

/* Collapsible sidebar */
.sidebar-layout.collapsed {
  grid-template-columns: 64px 1fr;
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .sidebar-layout {
    grid-template-columns: 1fr;
  }
}

/* Sidebar on the right */
.sidebar-right {
  display: grid;
  grid-template-columns: 1fr 300px;
}

/* Both sidebars */
.three-column {
  display: grid;
  grid-template-columns: 200px 1fr 250px;
  gap: 24px;
}`}</code></pre>

      {/* ==================== 10. GRID VS FLEXBOX ==================== */}
      <h2>{s.h2_vs_flexbox}</h2>
      <p>{s.vsFlexboxDesc}</p>

      <p style={{ fontWeight: 600, marginTop: 16 }}>{s.gridBest}</p>
      <ul>
        <li>Two-dimensional layouts (rows and columns together)</li>
        <li>Layout-driven sizing (the layout dictates item sizes)</li>
        <li>Complex page layouts with header, sidebar, content, footer</li>
        <li>Dashboard-style layouts with varying card sizes</li>
        <li>Overlapping elements in a grid</li>
        <li>When you need precise control over both axes simultaneously</li>
      </ul>

      <p style={{ fontWeight: 600, marginTop: 16 }}>{s.flexboxBest}</p>
      <ul>
        <li>One-dimensional layouts (a single row or column)</li>
        <li>Content-driven sizing (items determine their own width)</li>
        <li>Navigation bars, toolbars, button groups</li>
        <li>Centering elements</li>
        <li>Dynamic, unknown number of items in a single line</li>
        <li>Components where items should wrap naturally</li>
      </ul>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.vsTableHead1}</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.vsTableHead2}</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>{s.vsTableHead3}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>{s.vsRow1_1}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow1_2}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow1_3}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>{s.vsRow2_1}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow2_2}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow2_3}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>{s.vsRow3_1}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow3_2}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow3_3}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>{s.vsRow4_1}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow4_2}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow4_3}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>{s.vsRow5_1}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow5_2}</td>
              <td style={{ padding: '8px 12px' }}>{s.vsRow5_3}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>{s.combineDesc}</p>
      <pre><code>{`/* Best practice: combine Grid + Flexbox */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Flexbox inside grid areas */
.page header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.page main {
  grid-area: main;
}

/* Flexbox for card internals inside a grid layout */
.page main .card {
  display: flex;
  flex-direction: column;
}
.page main .card .body { flex: 1; }
.page main .card .actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}`}</code></pre>

      {/* ==================== 11. BROWSER SUPPORT ==================== */}
      <h2>{s.h2_browser}</h2>
      <p>{s.browserDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Feature</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Chrome</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Firefox</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Safari</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Edge</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Basic Grid</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>57+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>52+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>10.1+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>16+</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>gap (in Grid)</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>66+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>61+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>12+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>16+</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>grid-template-areas</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>57+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>52+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>10.1+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>16+</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>subgrid</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>117+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>71+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>16+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>117+</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>masonry (experimental)</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>--</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>flag</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>--</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>--</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.browserNote }} />
      <pre><code>{`/* Feature detection with @supports */
.container {
  /* Fallback: Flexbox layout */
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
}

/* Progressive enhancement for subgrid */
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

@supports (grid-template-rows: subgrid) {
  .card-grid .card {
    grid-row: span 3;
    grid-template-rows: subgrid;
  }
}`}</code></pre>

      {/* ==================== 12. FAQ ==================== */}
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
      <p><Link href={`/${lang}/tools/flexbox-generator`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
      <p><Link href={`/${lang}/tools/css-unit-converter`} style={{ fontWeight: 600 }}>{s.linkToolBottom2}</Link></p>
    </>
  );
}
