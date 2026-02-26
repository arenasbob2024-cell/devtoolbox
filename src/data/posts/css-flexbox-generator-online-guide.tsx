'use client';

import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr: 'A CSS Flexbox Generator lets you visually build flex layouts by adjusting container and item properties in real time, then copy production-ready CSS. This guide covers every flexbox property, common layout patterns (navbar, card grid, holy grail, sidebar), flexbox vs grid decision rules, responsive techniques, and accessibility best practices.',
    kt1: 'Flexbox is a one-dimensional layout model that distributes space along a single main axis (row or column), controlled via the flex container.',
    kt2: 'Six container properties (display, flex-direction, justify-content, align-items, flex-wrap, gap) define how child items flow, align, and space themselves.',
    kt3: 'Five item properties (flex-grow, flex-shrink, flex-basis, order, align-self) let individual children override container-level behavior.',
    kt4: 'Common patterns like navbars, card grids, holy grail layouts, and sidebars each require just a handful of flexbox declarations.',
    kt5: 'Choose Flexbox for one-dimensional flow; choose CSS Grid for two-dimensional placement. Both can be combined on the same page.',
    kt6: 'Semantic HTML plus ARIA attributes ensures screen readers interpret flex-reordered content correctly.',
    intro_title: 'Why Use a CSS Flexbox Generator?',
    intro_p1: 'CSS Flexbox is one of the most important layout systems in modern front-end development, yet the interplay between container properties, item properties, and axis behavior can be hard to visualize in your head. A <strong>CSS Flexbox Generator</strong> gives you a live visual canvas: tweak a property, see the result immediately, then copy the exact CSS into your project.',
    intro_p2: 'Whether you are prototyping a navigation bar, building a card grid, or constructing a full-page layout, a visual flexbox builder saves time and reduces trial-and-error. Below we cover every flexbox concept you need, starting from the two axes and ending with production-ready responsive patterns.',
    linkTool: 'Try our interactive Flexbox Generator to build layouts visually',

    h2_axes: 'Understanding the Two Axes',
    axes_p1: 'Every flex container has two axes. The <strong>main axis</strong> runs in the direction set by <code>flex-direction</code> (default: row, meaning left to right). The <strong>cross axis</strong> runs perpendicular to it. All justify-* properties work along the main axis; all align-* properties work along the cross axis.',
    axes_p2: 'If you change <code>flex-direction</code> to <code>column</code>, the main axis becomes vertical and the cross axis becomes horizontal. This axis-swap is the source of many beginner mistakes, so keep it in mind whenever you switch directions.',

    h2_container: 'Flex Container Properties',
    container_intro: 'A flex container is any element with <code>display: flex</code> (or <code>inline-flex</code>). The six properties below control how its children (flex items) are arranged.',

    h3_display: 'display: flex | inline-flex',
    display_p: '<code>display: flex</code> creates a block-level flex container that takes up the full width of its parent. <code>display: inline-flex</code> creates an inline-level flex container that only takes the width needed by its children. In most layouts you want <code>flex</code>.',

    h3_direction: 'flex-direction',
    direction_p: 'Sets the main axis direction. Accepts four values: <code>row</code> (default, left-to-right), <code>row-reverse</code> (right-to-left), <code>column</code> (top-to-bottom), <code>column-reverse</code> (bottom-to-top). Row is by far the most common.',

    h3_justify: 'justify-content',
    justify_p: 'Distributes items along the main axis. Common values: <code>flex-start</code> (pack items at start), <code>flex-end</code> (pack at end), <code>center</code> (center items), <code>space-between</code> (equal space between items, no space at edges), <code>space-around</code> (equal space around each item), <code>space-evenly</code> (equal space between and at edges).',

    h3_align: 'align-items',
    align_p: 'Aligns items along the cross axis. Common values: <code>stretch</code> (default, items fill the cross axis), <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>baseline</code> (align by text baseline). This is what you use to vertically center items in a row layout.',

    h3_wrap: 'flex-wrap',
    wrap_p: 'Controls whether items can wrap to new lines. <code>nowrap</code> (default) forces all items on one line. <code>wrap</code> allows wrapping. <code>wrap-reverse</code> wraps in the reverse cross-axis direction. For responsive card grids, you almost always want <code>wrap</code>.',

    h3_gap: 'gap (row-gap, column-gap)',
    gap_p: 'Adds space between items without affecting the outer edges. <code>gap: 16px</code> sets both row and column gap. You can also use <code>row-gap</code> and <code>column-gap</code> independently. This is the recommended modern approach, replacing the old margin-based spacing hacks.',

    h2_item: 'Flex Item Properties',
    item_intro: 'These properties are set on individual flex items (direct children of the container) to override the container-level behavior.',

    h3_grow: 'flex-grow',
    grow_p: 'Defines how much an item should grow when extra space is available. Default is <code>0</code> (do not grow). If one item has <code>flex-grow: 2</code> and another has <code>flex-grow: 1</code>, the first gets twice as much extra space.',

    h3_shrink: 'flex-shrink',
    shrink_p: 'Defines how much an item should shrink when space is insufficient. Default is <code>1</code>. Set to <code>0</code> to prevent an item from shrinking. Useful for fixed-width sidebars.',

    h3_basis: 'flex-basis',
    basis_p: 'Sets the initial main size of an item before flex-grow and flex-shrink distribute remaining space. Accepts any length (<code>200px</code>, <code>30%</code>) or <code>auto</code> (use the item content or width/height). Think of it as the starting point before the flex algorithm kicks in.',

    h3_flex: 'The flex Shorthand',
    flex_p: 'The <code>flex</code> shorthand combines grow, shrink, and basis: <code>flex: 1</code> is shorthand for <code>flex: 1 1 0%</code> (grow equally from a zero base). <code>flex: 0 0 auto</code> means the item is inflexible. Using the shorthand is recommended because it sets intelligent defaults.',

    h3_order: 'order',
    order_p: 'Controls the visual order of items. All items default to <code>order: 0</code>. Items with lower values appear first. This is purely visual and does not change the DOM order, which is what assistive technologies read.',

    h3_align_self: 'align-self',
    align_self_p: 'Overrides the container <code>align-items</code> value for a single item. For example, you can center most items but stick one to the top by setting <code>align-self: flex-start</code> on it.',

    h2_layouts: 'Common Flexbox Layout Patterns',
    layouts_intro: 'Here are the patterns you will use most frequently. Each one is copy-paste ready.',

    h3_navbar: 'Navigation Bar',
    navbar_p: 'A responsive navbar with the logo on the left and links on the right is the most classic flexbox pattern. Use <code>justify-content: space-between</code> on the container and <code>align-items: center</code> for vertical centering.',

    h3_cards: 'Card Grid',
    cards_p: 'Combine <code>flex-wrap: wrap</code> with a fixed <code>flex-basis</code> to create a responsive card grid. Each card uses <code>flex: 0 0 calc(33.333% - 16px)</code> for a 3-column layout with gap. On smaller screens, change the basis to <code>calc(50% - 16px)</code> or <code>100%</code>.',

    h3_holy_grail: 'Holy Grail Layout',
    holy_grail_p: 'The classic three-column layout (left sidebar, main content, right sidebar) with a header and footer. The outer container uses <code>flex-direction: column</code> and <code>min-height: 100vh</code>. The middle row uses a nested flex container with <code>flex-direction: row</code>. The main content area gets <code>flex: 1</code> to fill remaining space.',

    h3_sidebar: 'Sidebar Layout',
    sidebar_p: 'A two-column layout with a fixed-width sidebar and a flexible main area. The sidebar uses <code>flex: 0 0 280px</code> (fixed at 280px, no grow or shrink) while the main content uses <code>flex: 1</code> to fill the rest.',

    h3_center: 'Perfect Centering',
    center_p: 'The simplest pattern: set <code>display: flex; justify-content: center; align-items: center</code> on the container. This centers the child both horizontally and vertically. Add <code>min-height: 100vh</code> for full-page centering.',

    h3_footer: 'Sticky Footer',
    footer_p: 'Wrap your page in a flex container with <code>flex-direction: column</code> and <code>min-height: 100vh</code>. Give the main content <code>flex: 1</code>. The footer will always stick to the bottom, even when content is short.',

    h2_vs_grid: 'Flexbox vs CSS Grid: Decision Guide',
    vs_intro: 'Flexbox and CSS Grid are complementary, not competing. Here is a practical decision framework.',
    vs_flex_title: 'Choose Flexbox when:',
    vs_flex_1: 'You need one-dimensional flow (a single row or column)',
    vs_flex_2: 'Content size should drive the layout (items determine their own width)',
    vs_flex_3: 'You need dynamic wrapping with content-aware sizing',
    vs_flex_4: 'You are building component internals (buttons in a toolbar, items in a nav)',
    vs_grid_title: 'Choose CSS Grid when:',
    vs_grid_1: 'You need two-dimensional placement (rows AND columns simultaneously)',
    vs_grid_2: 'The layout should drive content placement (fixed tracks and areas)',
    vs_grid_3: 'You want named grid areas for complex page layouts',
    vs_grid_4: 'You need precise alignment control on both axes at once',
    vs_combine: 'In practice, most production sites combine both: Grid for page-level layout and Flexbox for component-level alignment.',

    h2_responsive: 'Responsive Flexbox Patterns',
    responsive_intro: 'Flexbox shines in responsive design because items naturally adapt to available space.',
    responsive_1_title: 'Direction Switching',
    responsive_1_p: 'Use <code>flex-direction: row</code> on desktop and <code>flex-direction: column</code> on mobile via media queries. This is the simplest responsive pattern.',
    responsive_2_title: 'Wrapping with flex-basis',
    responsive_2_p: 'Set a minimum flex-basis (e.g., <code>flex: 1 1 300px</code>). Items stay in a row when the container is wide, then wrap to multiple rows when each item cannot maintain 300px. No media queries needed.',
    responsive_3_title: 'Order Reordering',
    responsive_3_p: 'Use the <code>order</code> property in media queries to reorder items on different screen sizes. For instance, move a sidebar below the main content on mobile by giving it <code>order: 2</code>.',

    h2_accessibility: 'Accessibility Considerations',
    a11y_intro: 'Flexbox visual reordering can create accessibility issues if not handled carefully.',
    a11y_1: '<strong>DOM order matters.</strong> Screen readers and keyboard navigation follow the DOM order, not the visual order. Keep the DOM order logical and use CSS order only for minor visual tweaks.',
    a11y_2: '<strong>Use semantic HTML.</strong> A flex container should still use proper elements: <code>&lt;nav&gt;</code> for navigation, <code>&lt;main&gt;</code> for main content, <code>&lt;aside&gt;</code> for sidebars, <code>&lt;ul&gt;</code> for lists.',
    a11y_3: '<strong>Test with keyboard.</strong> Tab through your layout to ensure the focus order matches the reading order. If flex order causes focus to jump around, restructure the DOM instead.',
    a11y_4: '<strong>ARIA landmarks.</strong> Use <code>role</code> attributes when semantic elements are not enough. For example, <code>role="navigation"</code> ensures assistive technologies understand a flex container is a nav area.',
    a11y_5: '<strong>Avoid relying on visual-only cues.</strong> If you use flex ordering to visually group related items, ensure the relationship is also communicated in the HTML structure.',

    h2_tips: 'Performance and Debugging Tips',
    tip_1: '<strong>Use the browser DevTools flexbox overlay.</strong> Chrome, Firefox, and Edge all have built-in flex container highlights that show you main axis, cross axis, and item boundaries in real time.',
    tip_2: '<strong>Set min-width: 0 on items that overflow.</strong> Flex items have min-width: auto by default, which prevents them from shrinking below their content size. This often causes unexpected horizontal scrollbars.',
    tip_3: '<strong>Prefer gap over margin.</strong> The gap property only creates space between items, not on the outer edges. This eliminates the negative-margin hacks that were once common in flexbox layouts.',
    tip_4: '<strong>Use flex shorthand.</strong> Writing <code>flex: 1</code> instead of separate flex-grow, flex-shrink, flex-basis declarations is more readable and sets better defaults.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is a CSS Flexbox Generator and how does it work?',
    faq1_a: 'A CSS Flexbox Generator is a visual tool that lets you configure flex container and item properties through an interactive interface. You adjust settings like flex-direction, justify-content, align-items, gap, flex-grow, and flex-shrink, then see the layout update in real time. Once satisfied, you copy the generated CSS code directly into your project. It eliminates guesswork and speeds up prototyping.',
    faq2_q: 'What is the difference between justify-content and align-items in Flexbox?',
    faq2_a: 'justify-content distributes items along the main axis (horizontal by default with flex-direction: row), while align-items aligns items along the cross axis (vertical by default). If you set flex-direction to column, the axes swap: justify-content controls vertical distribution and align-items controls horizontal alignment.',
    faq3_q: 'When should I use Flexbox instead of CSS Grid?',
    faq3_a: 'Use Flexbox for one-dimensional layouts where items flow in a single row or column and content determines sizing. Use CSS Grid for two-dimensional layouts where you need control over both rows and columns simultaneously. In practice, most projects use both: Grid for page structure and Flexbox for component internals.',
    faq4_q: 'How do I make all flex items equal width?',
    faq4_a: 'Set flex: 1 on all items, which is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%. This makes items grow equally from a zero base. If items still differ in width, also set min-width: 0 to allow them to shrink below their content size.',
    faq5_q: 'Why is my flex item not shrinking below its content size?',
    faq5_a: 'Flex items have min-width: auto by default, which prevents them from becoming narrower than their minimum content width. To fix this, add min-width: 0 to the item (or min-height: 0 for column layouts). Also verify that flex-shrink is not set to 0.',
    faq6_q: 'Can I use the gap property with Flexbox?',
    faq6_a: 'Yes. The gap property is supported in Flexbox across all modern browsers (Chrome 84+, Firefox 63+, Safari 14.1+, Edge 84+). It creates space between items without adding space on the outer edges, making it superior to margin-based approaches. Use gap for both axes, or row-gap and column-gap for independent control.',
    faq7_q: 'How do I create a responsive card grid with Flexbox?',
    faq7_a: 'Set flex-wrap: wrap on the container and give each card a flex-basis with a minimum size, for example flex: 1 1 300px. Cards will stay in a row when the container is wide enough, then wrap to new rows when they cannot maintain the minimum width. Combine with gap for consistent spacing. For more precise column counts, use calc() in flex-basis.',
    faq8_q: 'Does flex order affect screen readers and accessibility?',
    faq8_a: 'The CSS order property only changes the visual order, not the DOM order. Screen readers and keyboard navigation follow the DOM order. This means if you reorder items visually with order, keyboard users may experience confusing tab navigation. Keep the DOM in a logical reading order and only use order for minor visual adjustments.',

    conclusion_title: 'Start Building with Flexbox',
    conclusion_p: 'CSS Flexbox is an essential layout tool that every front-end developer uses daily. Understanding the relationship between the two axes, mastering the six container properties and five item properties, and knowing when to reach for Flexbox versus Grid will make you significantly faster at building responsive UIs. Use our interactive Flexbox Generator to experiment with these properties visually and copy production-ready code.',
    linkToolBottom: 'Open the Flexbox Generator and start building layouts visually',
  },
  zh: {
    tldr: 'CSS Flexbox 生成器让你通过实时调整容器和项目属性来可视化构建弹性布局，然后复制可用于生产的 CSS 代码。本指南涵盖每个 flexbox 属性、常见布局模式（导航栏、卡片网格、圣杯布局、侧边栏）、flexbox 与 grid 的选择规则、响应式技术和无障碍最佳实践。',
    kt1: 'Flexbox 是一维布局模型，沿单一主轴（行或列）分配空间，通过弹性容器控制。',
    kt2: '六个容器属性（display、flex-direction、justify-content、align-items、flex-wrap、gap）定义子项的排列、对齐和间距。',
    kt3: '五个项目属性（flex-grow、flex-shrink、flex-basis、order、align-self）让单个子项覆盖容器级行为。',
    kt4: '导航栏、卡片网格、圣杯布局和侧边栏等常见模式只需少量 flexbox 声明。',
    kt5: '一维流动选 Flexbox；二维布局选 CSS Grid。两者可以在同一页面上组合使用。',
    kt6: '语义化 HTML 加 ARIA 属性确保屏幕阅读器正确理解 flex 重排内容。',
    intro_title: '为什么使用 CSS Flexbox 生成器？',
    intro_p1: 'CSS Flexbox 是现代前端开发中最重要的布局系统之一，但容器属性、项目属性和轴行为之间的交互在脑中很难想象。<strong>CSS Flexbox 生成器</strong>为你提供实时可视化画布：调整属性，立即看到结果，然后将精确的 CSS 复制到你的项目中。',
    intro_p2: '无论你是在设计导航栏、构建卡片网格，还是构造全页面布局，可视化弹性盒布局构建器都能节省时间并减少反复试错。下面我们从两个轴开始，涵盖你需要的每个 flexbox 概念，直到可用于生产的响应式模式。',
    linkTool: '试试我们的交互式 Flexbox 生成器，可视化构建布局',
    h2_axes: '理解两个轴',
    axes_p1: '每个弹性容器都有两个轴。<strong>主轴</strong>沿 <code>flex-direction</code> 设定的方向运行（默认：row，即从左到右）。<strong>交叉轴</strong>与其垂直。所有 justify-* 属性沿主轴工作；所有 align-* 属性沿交叉轴工作。',
    axes_p2: '如果将 <code>flex-direction</code> 改为 <code>column</code>，主轴变为垂直方向，交叉轴变为水平方向。这种轴交换是许多初学者错误的根源，所以在切换方向时请牢记这一点。',
    h2_container: 'Flex 容器属性',
    container_intro: '弹性容器是任何设置了 <code>display: flex</code>（或 <code>inline-flex</code>）的元素。以下六个属性控制其子元素（弹性项目）的排列方式。',
    h3_display: 'display: flex | inline-flex',
    display_p: '<code>display: flex</code> 创建占满父元素宽度的块级弹性容器。<code>display: inline-flex</code> 创建仅占子元素所需宽度的行内级弹性容器。大多数布局中使用 <code>flex</code>。',
    h3_direction: 'flex-direction',
    direction_p: '设置主轴方向。接受四个值：<code>row</code>（默认，从左到右）、<code>row-reverse</code>（从右到左）、<code>column</code>（从上到下）、<code>column-reverse</code>（从下到上）。row 是最常用的。',
    h3_justify: 'justify-content',
    justify_p: '沿主轴分布项目。常用值：<code>flex-start</code>、<code>flex-end</code>、<code>center</code>、<code>space-between</code>（项目间等距，边缘无间距）、<code>space-around</code>（每个项目周围等距）、<code>space-evenly</code>（项目间和边缘等距）。',
    h3_align: 'align-items',
    align_p: '沿交叉轴对齐项目。常用值：<code>stretch</code>（默认）、<code>flex-start</code>、<code>flex-end</code>、<code>center</code>、<code>baseline</code>（按文本基线对齐）。在行布局中用它来垂直居中项目。',
    h3_wrap: 'flex-wrap',
    wrap_p: '控制项目是否可以换行。<code>nowrap</code>（默认）强制所有项目在一行。<code>wrap</code> 允许换行。<code>wrap-reverse</code> 反向换行。响应式卡片网格几乎总是需要 <code>wrap</code>。',
    h3_gap: 'gap（row-gap、column-gap）',
    gap_p: '在项目之间添加间距，不影响外边缘。<code>gap: 16px</code> 同时设置行间距和列间距。也可以独立使用 <code>row-gap</code> 和 <code>column-gap</code>。这是推荐的现代方法，替代了旧的基于 margin 的间距技巧。',
    h2_item: 'Flex 项目属性',
    item_intro: '这些属性设置在单个弹性项目（容器的直接子元素）上，用于覆盖容器级行为。',
    h3_grow: 'flex-grow',
    grow_p: '定义项目在有额外空间时应增长多少。默认值为 <code>0</code>（不增长）。如果一个项目 <code>flex-grow: 2</code>，另一个 <code>flex-grow: 1</code>，前者获得两倍的额外空间。',
    h3_shrink: 'flex-shrink',
    shrink_p: '定义项目在空间不足时应收缩多少。默认值为 <code>1</code>。设为 <code>0</code> 可防止项目收缩。适用于固定宽度的侧边栏。',
    h3_basis: 'flex-basis',
    basis_p: '设置项目在 flex-grow 和 flex-shrink 分配剩余空间之前的初始主轴尺寸。接受任何长度（<code>200px</code>、<code>30%</code>）或 <code>auto</code>。把它想象成 flex 算法启动前的起点。',
    h3_flex: 'flex 简写',
    flex_p: '<code>flex</code> 简写组合了 grow、shrink 和 basis：<code>flex: 1</code> 是 <code>flex: 1 1 0%</code> 的简写（从零基础等比增长）。<code>flex: 0 0 auto</code> 表示项目不伸缩。推荐使用简写，因为它设置了智能默认值。',
    h3_order: 'order',
    order_p: '控制项目的视觉顺序。所有项目默认 <code>order: 0</code>。值越小越靠前。这是纯视觉效果，不改变 DOM 顺序（辅助技术读取的是 DOM 顺序）。',
    h3_align_self: 'align-self',
    align_self_p: '覆盖容器的 <code>align-items</code> 值。例如，你可以将大多数项目居中，但通过设置 <code>align-self: flex-start</code> 让某个项目贴顶。',
    h2_layouts: '常见 Flexbox 布局模式',
    layouts_intro: '以下是你最常用的模式，每个都可以直接复制使用。',
    h3_navbar: '导航栏',
    navbar_p: '左侧 logo、右侧链接的响应式导航栏是最经典的 flexbox 模式。在容器上使用 <code>justify-content: space-between</code>，配合 <code>align-items: center</code> 垂直居中。',
    h3_cards: '卡片网格',
    cards_p: '将 <code>flex-wrap: wrap</code> 与固定 <code>flex-basis</code> 结合，创建响应式卡片网格。每张卡片使用 <code>flex: 0 0 calc(33.333% - 16px)</code> 实现带间距的三列布局。小屏幕上改为 <code>calc(50% - 16px)</code> 或 <code>100%</code>。',
    h3_holy_grail: '圣杯布局',
    holy_grail_p: '经典三列布局（左侧边栏、主内容、右侧边栏）加页头页脚。外层容器使用 <code>flex-direction: column</code> 和 <code>min-height: 100vh</code>。中间行使用嵌套弹性容器 <code>flex-direction: row</code>。主内容区域用 <code>flex: 1</code> 填充剩余空间。',
    h3_sidebar: '侧边栏布局',
    sidebar_p: '固定宽度侧边栏和弹性主内容的两列布局。侧边栏使用 <code>flex: 0 0 280px</code>（固定 280px，不伸缩），主内容使用 <code>flex: 1</code> 填充剩余空间。',
    h3_center: '完美居中',
    center_p: '最简单的模式：在容器上设置 <code>display: flex; justify-content: center; align-items: center</code>。子元素水平和垂直都居中。添加 <code>min-height: 100vh</code> 实现全页居中。',
    h3_footer: '粘性页脚',
    footer_p: '用 <code>flex-direction: column</code> 和 <code>min-height: 100vh</code> 包裹页面。给主内容 <code>flex: 1</code>。页脚始终贴底，即使内容很短。',
    h2_vs_grid: 'Flexbox vs CSS Grid：决策指南',
    vs_intro: 'Flexbox 和 CSS Grid 互补而非竞争。以下是实用的决策框架。',
    vs_flex_title: '选择 Flexbox 的情况：',
    vs_flex_1: '需要一维流动（单行或单列）',
    vs_flex_2: '内容大小应驱动布局（项目决定自身宽度）',
    vs_flex_3: '需要基于内容感知的动态换行',
    vs_flex_4: '构建组件内部结构（工具栏按钮、导航项目）',
    vs_grid_title: '选择 CSS Grid 的情况：',
    vs_grid_1: '需要二维布局（同时控制行和列）',
    vs_grid_2: '布局应驱动内容放置（固定轨道和区域）',
    vs_grid_3: '需要命名网格区域的复杂页面布局',
    vs_grid_4: '需要同时精确控制两个轴的对齐',
    vs_combine: '实际上，大多数生产站点两者兼用：Grid 用于页面级布局，Flexbox 用于组件级对齐。',
    h2_responsive: '响应式 Flexbox 模式',
    responsive_intro: 'Flexbox 在响应式设计中表现出色，因为项目自然适应可用空间。',
    responsive_1_title: '方向切换',
    responsive_1_p: '桌面端使用 <code>flex-direction: row</code>，移动端通过媒体查询切换为 <code>flex-direction: column</code>。这是最简单的响应式模式。',
    responsive_2_title: '使用 flex-basis 换行',
    responsive_2_p: '设置最小 flex-basis（如 <code>flex: 1 1 300px</code>）。容器宽时项目保持一行，每个项目无法维持 300px 时自动换行。无需媒体查询。',
    responsive_3_title: 'Order 重排',
    responsive_3_p: '在媒体查询中使用 <code>order</code> 属性在不同屏幕尺寸上重排项目。例如，通过 <code>order: 2</code> 在移动端将侧边栏移至主内容下方。',
    h2_accessibility: '无障碍考虑',
    a11y_intro: 'Flexbox 的视觉重排如果处理不当，可能会造成无障碍问题。',
    a11y_1: '<strong>DOM 顺序至关重要。</strong>屏幕阅读器和键盘导航遵循 DOM 顺序，而非视觉顺序。保持 DOM 顺序合乎逻辑，仅将 CSS order 用于微小的视觉调整。',
    a11y_2: '<strong>使用语义化 HTML。</strong>弹性容器仍应使用正确的元素：<code>&lt;nav&gt;</code> 用于导航，<code>&lt;main&gt;</code> 用于主内容，<code>&lt;aside&gt;</code> 用于侧边栏。',
    a11y_3: '<strong>键盘测试。</strong>用 Tab 键浏览布局，确保焦点顺序与阅读顺序一致。',
    a11y_4: '<strong>ARIA 地标。</strong>当语义元素不够时使用 <code>role</code> 属性。',
    a11y_5: '<strong>避免仅依赖视觉线索。</strong>如果使用 flex 排序在视觉上分组相关项目，确保 HTML 结构也传达了这种关系。',
    h2_tips: '性能和调试技巧',
    tip_1: '<strong>使用浏览器 DevTools flexbox 覆盖层。</strong>Chrome、Firefox 和 Edge 都有内置的弹性容器高亮显示。',
    tip_2: '<strong>对溢出的项目设置 min-width: 0。</strong>弹性项目默认 min-width: auto，这会阻止它们缩小到内容尺寸以下。',
    tip_3: '<strong>优先使用 gap 而非 margin。</strong>gap 属性只在项目之间创建间距，不在外边缘。',
    tip_4: '<strong>使用 flex 简写。</strong>写 <code>flex: 1</code> 比分别声明更可读且默认值更好。',
    h2_faq: '常见问题',
    faq1_q: '什么是 CSS Flexbox 生成器？它如何工作？',
    faq1_a: 'CSS Flexbox 生成器是一个可视化工具，让你通过交互界面配置弹性容器和项目属性。你调整 flex-direction、justify-content、align-items、gap、flex-grow 和 flex-shrink 等设置，然后实时看到布局更新。满意后，直接将生成的 CSS 代码复制到你的项目中。',
    faq2_q: 'Flexbox 中 justify-content 和 align-items 有什么区别？',
    faq2_a: 'justify-content 沿主轴分布项目（默认 flex-direction: row 时为水平方向），align-items 沿交叉轴对齐项目（默认为垂直方向）。如果设置 flex-direction 为 column，轴互换。',
    faq3_q: '什么时候应该用 Flexbox 而不是 CSS Grid？',
    faq3_a: '一维布局用 Flexbox，二维布局用 CSS Grid。实际项目中通常两者结合：Grid 做页面结构，Flexbox 做组件内部。',
    faq4_q: '如何让所有弹性项目等宽？',
    faq4_a: '所有项目设置 flex: 1（即 flex-grow: 1, flex-shrink: 1, flex-basis: 0%）。如果宽度仍不一致，再加 min-width: 0。',
    faq5_q: '为什么弹性项目不能缩小到内容尺寸以下？',
    faq5_a: '弹性项目默认 min-width: auto，阻止它们缩小到最小内容宽度以下。添加 min-width: 0 即可解决（列布局用 min-height: 0）。',
    faq6_q: 'Flexbox 可以使用 gap 属性吗？',
    faq6_a: '可以。所有现代浏览器都支持 Flexbox 的 gap 属性（Chrome 84+、Firefox 63+、Safari 14.1+、Edge 84+）。它只在项目之间创建间距，优于基于 margin 的方法。',
    faq7_q: '如何用 Flexbox 创建响应式卡片网格？',
    faq7_a: '容器设置 flex-wrap: wrap，每张卡片给一个最小 flex-basis，如 flex: 1 1 300px。宽度足够时保持一行，不够时自动换行。配合 gap 实现一致间距。',
    faq8_q: 'flex order 会影响屏幕阅读器和无障碍吗？',
    faq8_a: 'CSS order 属性只改变视觉顺序，不改变 DOM 顺序。屏幕阅读器和键盘导航遵循 DOM 顺序。保持 DOM 逻辑顺序，仅将 order 用于微小的视觉调整。',
    conclusion_title: '开始使用 Flexbox 构建',
    conclusion_p: 'CSS Flexbox 是每个前端开发者日常使用的必备布局工具。理解两轴关系、掌握六个容器属性和五个项目属性、知道何时选择 Flexbox 与 Grid，将显著提升你构建响应式 UI 的速度。使用我们的交互式 Flexbox 生成器来可视化实验这些属性并复制可用于生产的代码。',
    linkToolBottom: '打开 Flexbox 生成器，开始可视化构建布局',
  },
  ja: {
    tldr: 'CSS Flexbox GeneratorはFlexコンテナとアイテムのプロパティをリアルタイムで調整してレイアウトを視覚的に構築し、本番用CSSをコピーできます。本ガイドでは全Flexboxプロパティ、一般的なレイアウトパターン、FlexboxとGridの使い分け、レスポンシブ手法、アクセシビリティのベストプラクティスを解説します。',
    linkTool: 'インタラクティブFlexbox Generatorでレイアウトを視覚的に構築',
    linkToolBottom: 'Flexbox Generatorを開いてレイアウト構築を始める',
    conclusion_title: 'Flexboxで構築を始めよう',
    conclusion_p: 'CSS Flexboxは全フロントエンド開発者が日常的に使う必須レイアウトツールです。',
  },
  ko: {
    tldr: 'CSS Flexbox Generator는 컨테이너와 아이템 속성을 실시간으로 조정하여 플렉스 레이아웃을 시각적으로 구축하고, 프로덕션용 CSS를 복사할 수 있습니다. 이 가이드에서는 모든 Flexbox 속성, 일반 레이아웃 패턴, Flexbox vs Grid 결정 규칙, 반응형 기법, 접근성 모범 사례를 다룹니다.',
    linkTool: '인터랙티브 Flexbox Generator로 레이아웃을 시각적으로 구축하세요',
    linkToolBottom: 'Flexbox Generator를 열고 레이아웃 구축을 시작하세요',
    conclusion_title: 'Flexbox로 구축 시작하기',
    conclusion_p: 'CSS Flexbox는 모든 프론트엔드 개발자가 매일 사용하는 필수 레이아웃 도구입니다.',
  },
  fr: {
    tldr: 'Un generateur CSS Flexbox vous permet de construire visuellement des layouts flex en ajustant les proprietes du conteneur et des items en temps reel, puis de copier le CSS pret pour la production. Ce guide couvre chaque propriete flexbox, les patterns de layout courants, flexbox vs grid, les techniques responsives et les bonnes pratiques d\'accessibilite.',
    linkTool: 'Essayez notre generateur Flexbox interactif pour construire des layouts visuellement',
    linkToolBottom: 'Ouvrir le generateur Flexbox et commencer a construire des layouts visuellement',
    conclusion_title: 'Commencez a construire avec Flexbox',
    conclusion_p: 'CSS Flexbox est un outil de layout essentiel que chaque developpeur front-end utilise quotidiennement.',
  },
  de: {
    tldr: 'Ein CSS Flexbox Generator ermoeglicht es Ihnen, Flex-Layouts visuell zu erstellen, indem Sie Container- und Item-Eigenschaften in Echtzeit anpassen und dann produktionsfertiges CSS kopieren. Dieser Leitfaden behandelt jede Flexbox-Eigenschaft, gaengige Layout-Muster, Flexbox vs Grid, responsive Techniken und Barrierefreiheit.',
    linkTool: 'Testen Sie unseren interaktiven Flexbox Generator, um Layouts visuell zu erstellen',
    linkToolBottom: 'Flexbox Generator oeffnen und Layouts visuell erstellen',
    conclusion_title: 'Starten Sie mit Flexbox',
    conclusion_p: 'CSS Flexbox ist ein unverzichtbares Layout-Tool, das jeder Frontend-Entwickler taeglich nutzt.',
  },
  es: {
    tldr: 'Un generador CSS Flexbox te permite construir visualmente layouts flex ajustando las propiedades del contenedor y los items en tiempo real, y luego copiar el CSS listo para produccion. Esta guia cubre cada propiedad flexbox, patrones de layout comunes, flexbox vs grid, tecnicas responsive y mejores practicas de accesibilidad.',
    linkTool: 'Prueba nuestro generador Flexbox interactivo para construir layouts visualmente',
    linkToolBottom: 'Abrir el generador Flexbox y empezar a construir layouts visualmente',
    conclusion_title: 'Empieza a construir con Flexbox',
    conclusion_p: 'CSS Flexbox es una herramienta de layout esencial que todo desarrollador front-end usa a diario.',
  },
};

function g(lang: string, key: string): string {
  return t[lang]?.[key] || t['en'][key] || '';
}

/* ---------- reusable inline styles ---------- */
const sectionStyle = { marginBottom: 40 };
const h2Style: React.CSSProperties = { fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 10, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 14 };
const codeBlockStyle: React.CSSProperties = { background: 'var(--bg-secondary)', borderRadius: 8, padding: '16px 20px', fontSize: 14, lineHeight: 1.7, overflowX: 'auto', marginBottom: 20, fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace', whiteSpace: 'pre', display: 'block', border: '1px solid var(--border-color)' };
const linkStyle: React.CSSProperties = { color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 };
const listStyle: React.CSSProperties = { paddingLeft: 24, marginBottom: 16, fontSize: 16, lineHeight: 1.9, color: 'var(--text-secondary)' };

export default function CssFlexboxGeneratorOnlineGuide({ lang }: { lang: string }) {
  const l = (key: string) => g(lang, key);

  const faqItems = [
    { q: l('faq1_q'), a: l('faq1_a') },
    { q: l('faq2_q'), a: l('faq2_a') },
    { q: l('faq3_q'), a: l('faq3_a') },
    { q: l('faq4_q'), a: l('faq4_a') },
    { q: l('faq5_q'), a: l('faq5_a') },
    { q: l('faq6_q'), a: l('faq6_a') },
    { q: l('faq7_q'), a: l('faq7_a') },
    { q: l('faq8_q'), a: l('faq8_a') },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: '20px 24px', marginBottom: 32 }}>
        <strong style={{ fontSize: 15, color: '#0369a1' }}>TL;DR</strong>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#0c4a6e', marginTop: 8, marginBottom: 0 }}>{l('tldr')}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', borderRadius: 10, padding: '20px 24px', marginBottom: 36, border: '1px solid #e2e8f0' }}>
        <strong style={{ fontSize: 15, color: 'var(--text-primary)', display: 'block', marginBottom: 10 }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, lineHeight: 1.9, color: 'var(--text-secondary)' }}>
          <li>{l('kt1')}</li>
          <li>{l('kt2')}</li>
          <li>{l('kt3')}</li>
          <li>{l('kt4')}</li>
          <li>{l('kt5')}</li>
          <li>{l('kt6')}</li>
        </ul>
      </div>

      {/* Tool Link */}
      <div style={{ marginBottom: 36, padding: '14px 20px', background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <Link href={`/${lang}/tools/flexbox-generator`} style={linkStyle}>{l('linkTool')} &rarr;</Link>
      </div>

      {/* 1. Why Use a Flexbox Generator */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('intro_title')}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('intro_p1') }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('intro_p2') }} />
      </section>

      {/* 2. Understanding the Two Axes */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_axes')}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('axes_p1') }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('axes_p2') }} />
        <code style={codeBlockStyle}>{`/* Main axis = horizontal (default) */
.container {
  display: flex;
  flex-direction: row;  /* Main axis: left -> right */
}

/* Main axis = vertical */
.container-column {
  display: flex;
  flex-direction: column;  /* Main axis: top -> bottom */
}`}</code>
      </section>

      {/* 3. Flex Container Properties */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_container')}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('container_intro') }} />

        <h3 style={h3Style}>{l('h3_display')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('display_p') }} />
        <code style={codeBlockStyle}>{`.flex-block  { display: flex; }       /* Block-level flex container */
.flex-inline { display: inline-flex; } /* Inline-level flex container */`}</code>

        <h3 style={h3Style}>{l('h3_direction')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('direction_p') }} />
        <code style={codeBlockStyle}>{`.row     { flex-direction: row; }            /* Default: left to right */
.row-rev { flex-direction: row-reverse; }    /* Right to left */
.col     { flex-direction: column; }         /* Top to bottom */
.col-rev { flex-direction: column-reverse; } /* Bottom to top */`}</code>

        <h3 style={h3Style}>{l('h3_justify')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('justify_p') }} />
        <code style={codeBlockStyle}>{`.container {
  display: flex;
  justify-content: flex-start;     /* Pack items at the start */
  justify-content: flex-end;       /* Pack items at the end */
  justify-content: center;         /* Center items */
  justify-content: space-between;  /* Equal space between, no edges */
  justify-content: space-around;   /* Equal space around each item */
  justify-content: space-evenly;   /* Equal space everywhere */
}`}</code>

        <h3 style={h3Style}>{l('h3_align')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('align_p') }} />
        <code style={codeBlockStyle}>{`.container {
  display: flex;
  align-items: stretch;    /* Default: fill cross axis */
  align-items: flex-start; /* Pack at cross-axis start */
  align-items: flex-end;   /* Pack at cross-axis end */
  align-items: center;     /* Center on cross axis */
  align-items: baseline;   /* Align by text baseline */
}`}</code>

        <h3 style={h3Style}>{l('h3_wrap')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('wrap_p') }} />
        <code style={codeBlockStyle}>{`.container {
  display: flex;
  flex-wrap: nowrap;       /* Default: single line */
  flex-wrap: wrap;         /* Allow wrapping */
  flex-wrap: wrap-reverse; /* Wrap in reverse direction */
}`}</code>

        <h3 style={h3Style}>{l('h3_gap')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('gap_p') }} />
        <code style={codeBlockStyle}>{`.container {
  display: flex;
  gap: 16px;            /* Both row and column gap */
  row-gap: 20px;        /* Only between rows */
  column-gap: 12px;     /* Only between columns */
}`}</code>
      </section>

      {/* 4. Flex Item Properties */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_item')}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('item_intro') }} />

        <h3 style={h3Style}>{l('h3_grow')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('grow_p') }} />
        <code style={codeBlockStyle}>{`.item-a { flex-grow: 0; } /* Default: do not grow */
.item-b { flex-grow: 1; } /* Take 1 share of extra space */
.item-c { flex-grow: 2; } /* Take 2 shares of extra space */`}</code>

        <h3 style={h3Style}>{l('h3_shrink')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('shrink_p') }} />
        <code style={codeBlockStyle}>{`.sidebar { flex-shrink: 0; } /* Never shrink (fixed width) */
.content { flex-shrink: 1; } /* Default: allow shrinking */`}</code>

        <h3 style={h3Style}>{l('h3_basis')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('basis_p') }} />
        <code style={codeBlockStyle}>{`.item { flex-basis: auto; }  /* Use content/width as basis */
.item { flex-basis: 200px; } /* Start at 200px, then grow/shrink */
.item { flex-basis: 30%; }   /* Start at 30% of container */
.item { flex-basis: 0%; }    /* Start at zero, grow equally */`}</code>

        <h3 style={h3Style}>{l('h3_flex')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('flex_p') }} />
        <code style={codeBlockStyle}>{`/* Recommended shorthand values */
.item { flex: 1; }          /* flex: 1 1 0%  -> grow equally */
.item { flex: auto; }       /* flex: 1 1 auto -> grow from content size */
.item { flex: none; }       /* flex: 0 0 auto -> inflexible */
.item { flex: 0 0 200px; }  /* Fixed at 200px, no grow/shrink */`}</code>

        <h3 style={h3Style}>{l('h3_order')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('order_p') }} />
        <code style={codeBlockStyle}>{`.item-first  { order: -1; } /* Moves to the start */
.item-normal { order: 0; }  /* Default position */
.item-last   { order: 1; }  /* Moves to the end */`}</code>

        <h3 style={h3Style}>{l('h3_align_self')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('align_self_p') }} />
        <code style={codeBlockStyle}>{`.container { align-items: center; }
.special-item { align-self: flex-start; } /* Override: stick to top */
.stretched    { align-self: stretch; }    /* Override: fill height */`}</code>
      </section>

      {/* 5. Common Layout Patterns */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_layouts')}</h2>
        <p style={pStyle}>{l('layouts_intro')}</p>

        <h3 style={h3Style}>{l('h3_navbar')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('navbar_p') }} />
        <code style={codeBlockStyle}>{`/* Responsive Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: #1a1a2e;
}
.navbar .logo { font-size: 20px; font-weight: 700; }
.navbar .links {
  display: flex;
  gap: 24px;
  list-style: none;
}`}</code>

        <h3 style={h3Style}>{l('h3_cards')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('cards_p') }} />
        <code style={codeBlockStyle}>{`/* Responsive Card Grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 0 0 calc(33.333% - 16px); /* 3 columns */
  border-radius: 8px;
  padding: 20px;
}

/* Tablet: 2 columns */
@media (max-width: 768px) {
  .card { flex: 0 0 calc(50% - 16px); }
}

/* Mobile: 1 column */
@media (max-width: 480px) {
  .card { flex: 0 0 100%; }
}`}</code>

        <h3 style={h3Style}>{l('h3_holy_grail')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('holy_grail_p') }} />
        <code style={codeBlockStyle}>{`/* Holy Grail Layout */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header, .footer {
  flex: 0 0 auto; /* Fixed height */
}
.middle {
  display: flex;
  flex: 1; /* Fill remaining vertical space */
}
.left-sidebar  { flex: 0 0 200px; }
.main-content  { flex: 1; }
.right-sidebar { flex: 0 0 200px; }

@media (max-width: 768px) {
  .middle { flex-direction: column; }
  .left-sidebar, .right-sidebar { flex: 0 0 auto; }
}`}</code>

        <h3 style={h3Style}>{l('h3_sidebar')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('sidebar_p') }} />
        <code style={codeBlockStyle}>{`/* Sidebar Layout */
.layout {
  display: flex;
  gap: 24px;
}
.sidebar {
  flex: 0 0 280px;  /* Fixed width, no grow or shrink */
}
.main {
  flex: 1;           /* Fill remaining space */
  min-width: 0;      /* Allow shrinking below content size */
}`}</code>

        <h3 style={h3Style}>{l('h3_center')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('center_p') }} />
        <code style={codeBlockStyle}>{`/* Perfect Centering */
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`}</code>

        <h3 style={h3Style}>{l('h3_footer')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('footer_p') }} />
        <code style={codeBlockStyle}>{`/* Sticky Footer */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page-content { flex: 1; } /* Pushes footer to bottom */
.page-footer  { flex-shrink: 0; }`}</code>
      </section>

      {/* 6. Flexbox vs Grid */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_vs_grid')}</h2>
        <p style={pStyle}>{l('vs_intro')}</p>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ flex: '1 1 300px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '16px 20px' }}>
            <strong style={{ color: '#166534', fontSize: 15 }}>{l('vs_flex_title')}</strong>
            <ul style={{ ...listStyle, color: '#15803d', paddingLeft: 20 }}>
              <li>{l('vs_flex_1')}</li>
              <li>{l('vs_flex_2')}</li>
              <li>{l('vs_flex_3')}</li>
              <li>{l('vs_flex_4')}</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 300px', background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 8, padding: '16px 20px' }}>
            <strong style={{ color: '#6b21a8', fontSize: 15 }}>{l('vs_grid_title')}</strong>
            <ul style={{ ...listStyle, color: '#7c3aed', paddingLeft: 20 }}>
              <li>{l('vs_grid_1')}</li>
              <li>{l('vs_grid_2')}</li>
              <li>{l('vs_grid_3')}</li>
              <li>{l('vs_grid_4')}</li>
            </ul>
          </div>
        </div>
        <p style={pStyle}>{l('vs_combine')}</p>

        <code style={codeBlockStyle}>{`/* Combining Grid + Flexbox */
.page {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 250px 1fr;
}

/* Flexbox inside grid areas */
.header {
  grid-area: header;
  display: flex;                     /* Flex for component internals */
  justify-content: space-between;
  align-items: center;
}`}</code>
      </section>

      {/* 7. Responsive Patterns */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_responsive')}</h2>
        <p style={pStyle}>{l('responsive_intro')}</p>

        <h3 style={h3Style}>{l('responsive_1_title')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('responsive_1_p') }} />
        <code style={codeBlockStyle}>{`/* Direction Switching */
.container {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
@media (max-width: 640px) {
  .container { flex-direction: column; }
}`}</code>

        <h3 style={h3Style}>{l('responsive_2_title')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('responsive_2_p') }} />
        <code style={codeBlockStyle}>{`/* Auto-wrapping with flex-basis (no media queries needed) */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.item {
  flex: 1 1 300px;  /* Grow, shrink, min 300px */
}`}</code>

        <h3 style={h3Style}>{l('responsive_3_title')}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l('responsive_3_p') }} />
        <code style={codeBlockStyle}>{`/* Order Reordering on Mobile */
.sidebar { order: 0; }
.content { order: 0; }

@media (max-width: 768px) {
  .sidebar { order: 2; } /* Move sidebar below content */
  .content { order: 1; }
}`}</code>
      </section>

      {/* 8. Accessibility */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_accessibility')}</h2>
        <p style={pStyle}>{l('a11y_intro')}</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('a11y_1') }} />
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('a11y_2') }} />
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('a11y_3') }} />
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('a11y_4') }} />
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('a11y_5') }} />
        </ul>
        <code style={codeBlockStyle}>{`<!-- Semantic HTML with Flexbox -->
<nav style="display: flex; justify-content: space-between; align-items: center;">
  <a href="/" aria-label="Home">Logo</a>
  <ul role="list" style="display: flex; gap: 16px; list-style: none;">
    <li><a href="/about">About</a></li>
    <li><a href="/tools">Tools</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>

<main style="display: flex; gap: 24px;">
  <article style="flex: 1;">Main Content</article>
  <aside style="flex: 0 0 280px;" aria-label="Sidebar">Sidebar</aside>
</main>`}</code>
      </section>

      {/* 9. Performance & Debugging Tips */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_tips')}</h2>
        <ul style={listStyle}>
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('tip_1') }} />
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('tip_2') }} />
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('tip_3') }} />
          <li style={{ marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: l('tip_4') }} />
        </ul>
      </section>

      {/* 10. FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('h2_faq')}</h2>
        {faqItems.map((faq, i) => (
          <div key={i} style={{ marginBottom: 24, padding: '16px 20px', background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{faq.q}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </section>

      {/* Conclusion */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{l('conclusion_title')}</h2>
        <p style={pStyle}>{l('conclusion_p')}</p>
        <div style={{ marginTop: 20, padding: '14px 20px', background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <Link href={`/${lang}/tools/flexbox-generator`} style={linkStyle}>{l('linkToolBottom')} &rarr;</Link>
        </div>
      </section>
    </article>
  );
}
