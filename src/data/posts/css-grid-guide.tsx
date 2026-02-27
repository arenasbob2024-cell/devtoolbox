'use client';

import React from 'react';

const translations = {
  en: {
    title: 'CSS Grid Guide: Complete Layout Tutorial with Flexbox Comparison',
    description: 'Master CSS Grid Layout from basics to advanced techniques. Learn grid-template-columns, fr units, named areas, subgrid, auto-placement, and when to use Grid vs Flexbox with real-world examples.',
    content: 'en',
  },
  zh: {
    title: 'CSS Grid 完全指南：布局教程与 Flexbox 对比',
    description: '从基础到高级技术全面掌握 CSS Grid 布局。学习 grid-template-columns、fr 单位、命名区域、子网格、自动放置，以及何时使用 Grid 与 Flexbox 的真实案例。',
    content: 'zh',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is CSS Grid and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CSS Grid is a two-dimensional layout system for the web. Use it when you need to control both rows and columns simultaneously — for example, full-page layouts, dashboards, photo galleries, and magazine-style designs. Unlike Flexbox (which is one-dimensional), Grid lets you place items precisely in both directions at once.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the fr unit mean in CSS Grid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The fr (fraction) unit represents a fraction of the available free space in the grid container. For example, grid-template-columns: 1fr 2fr 1fr creates three columns where the middle column is twice as wide as the outer columns. The browser calculates fr after fixed-size tracks (px, em, %) are allocated.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between auto-fill and auto-fit in CSS Grid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both auto-fill and auto-fit create as many tracks as fit the container. The difference appears with fewer items than available tracks: auto-fill keeps empty tracks, preserving their space; auto-fit collapses empty tracks to zero width, allowing items to stretch and fill the container. Use auto-fit for responsive card grids and auto-fill when you want to maintain a consistent column count.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do grid-column and grid-row shorthand properties work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'grid-column is shorthand for grid-column-start / grid-column-end, and grid-row is shorthand for grid-row-start / grid-row-end. You can use line numbers (grid-column: 1 / 3), named lines, or the span keyword (grid-column: span 2). Negative values count from the end of the explicit grid, so grid-column: 1 / -1 spans the full width.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are CSS Grid named template areas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Named template areas let you assign string names to grid cells using grid-template-areas on the container, then reference those names on items with grid-area. This creates a visual ASCII-art representation of your layout in CSS. Use a period (.) for empty cells. Named areas must be rectangular and cannot be repeated in non-adjacent cells.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is subgrid in CSS Grid Level 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subgrid (grid-template-columns: subgrid or grid-template-rows: subgrid) allows a nested grid item to participate in and inherit track sizing from its ancestor grid. This solves the classic "card alignment" problem where inner elements of different cards need to align across card boundaries. Subgrid is supported in all modern browsers as of 2023.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use CSS Grid or Flexbox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Grid for two-dimensional layouts where you need to control both rows and columns simultaneously (page layouts, dashboards, galleries). Use Flexbox for one-dimensional layouts where items flow in a single direction (navbars, button groups, centering). They complement each other — a Grid-based page layout with Flexbox-based components is the most common and effective combination.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I debug CSS Grid layouts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chrome, Firefox, and Edge DevTools all have dedicated CSS Grid inspectors. In Firefox, click the grid badge next to the container in the Elements panel to toggle a grid overlay. In Chrome, use the Layout panel to see grid line numbers and area names. The most common debugging technique is to add outline: 1px solid red to grid items or use background colors to visualize each cell.',
      },
    },
  ],
};

export default function CssGridGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  return (
    <>
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1.5px solid #0ea5e9',
          borderRadius: '10px',
          padding: '20px 24px',
          marginBottom: '28px',
        }}
      >
        <strong style={{ color: '#0369a1', fontSize: '15px', display: 'block', marginBottom: '8px' }}>
          TL;DR
        </strong>
        {isZh ? (
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>CSS Grid 是二维布局系统，Flexbox 是一维系统</li>
            <li><code>fr</code> 单位按比例分配剩余空间</li>
            <li>用 <code>grid-template-areas</code> 创建可视化布局</li>
            <li><code>minmax()</code> + <code>auto-fit</code> 实现无媒体查询响应式</li>
            <li>子网格（Subgrid）解决跨卡片对齐问题</li>
            <li>Grid + Flexbox 组合使用效果最佳</li>
          </ul>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>CSS Grid is two-dimensional; Flexbox is one-dimensional</li>
            <li>The <code>fr</code> unit distributes free space proportionally</li>
            <li>Use <code>grid-template-areas</code> for visual, named layouts</li>
            <li><code>minmax()</code> + <code>auto-fit</code> enables responsive grids with zero media queries</li>
            <li>Subgrid solves cross-card alignment problems</li>
            <li>Grid and Flexbox complement each other — use both</li>
          </ul>
        )}
      </div>

      {/* Introduction */}
      <p>
        {isZh ? (
          <>
            <strong>CSS Grid 布局</strong>是 CSS 中最强大的布局系统。它是一个二维网格系统，意味着它可以同时处理列和行。
            与处理单一维度的 Flexbox 不同，Grid 让你能够构建复杂的网页布局，精确控制每个元素的放置位置。
            本完整指南涵盖从基础概念到高级技术的一切内容，包括与 Flexbox 的对比、真实案例和调试技巧。
          </>
        ) : (
          <>
            <strong>CSS Grid Layout</strong> is the most powerful layout system in CSS. It is a two-dimensional grid-based system,
            meaning it handles both columns and rows simultaneously. Unlike Flexbox, which deals with a single dimension at a time,
            Grid enables you to build complex web layouts with precise control over where every element is placed.
            This complete guide covers everything from fundamentals to advanced techniques including Flexbox comparison, real-world patterns, and debugging tips.
          </>
        )}
      </p>

      <p>
        {isZh ? (
          <>
            CSS Grid 于 2017 年在所有主流浏览器中获得原生支持，现已成为构建仪表盘、照片画廊、杂志风格页面、
            定价表格和完整页面布局的首选方法。掌握 CSS Grid 是现代前端开发的核心技能。
          </>
        ) : (
          <>
            CSS Grid gained native browser support across all major browsers in 2017 and has become the go-to method for building dashboards,
            photo galleries, magazine-style pages, pricing tables, and full-page layouts. Mastering CSS Grid is a core skill
            for modern front-end development.
          </>
        )}
      </p>

      {/* Section 1: CSS Grid Basics */}
      <h2>{isZh ? '1. CSS Grid 基础：启用网格布局' : '1. CSS Grid Basics: Enabling Grid Layout'}</h2>
      <p>
        {isZh ? (
          <>要创建网格容器，只需在父元素上设置 <code>display: grid</code> 或 <code>display: inline-grid</code>。
          所有直接子元素自动成为网格项目。</>
        ) : (
          <>To create a grid container, set <code>display: grid</code> or <code>display: inline-grid</code> on a parent element.
          All direct children automatically become grid items.</>
        )}
      </p>

      <pre><code className="language-css">{`/* Block-level grid container */
.container {
  display: grid;
}

/* Inline grid container */
.container {
  display: inline-grid;
}

/* Children become grid items automatically */
.container > * {
  /* These are now grid items */
}`}</code></pre>

      <h3>{isZh ? 'grid-template-columns 和 grid-template-rows' : 'grid-template-columns and grid-template-rows'}</h3>
      <p>
        {isZh ? (
          <>这两个属性定义网格轨道的数量和大小。你可以混合使用任何 CSS 长度单位、百分比，以及强大的 <code>fr</code> 分数单位。</>
        ) : (
          <>These properties define the number and size of grid tracks. You can mix any CSS length units, percentages, and the powerful <code>fr</code> fractional unit.</>
        )}
      </p>

      <pre><code className="language-css">{`/* Three equal columns */
.grid {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}

/* Three columns: fixed, flexible, fixed */
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}

/* Two rows: header 80px, content fills rest */
.grid {
  display: grid;
  grid-template-rows: 80px 1fr;
  height: 100vh;
}

/* Named grid lines for easier placement */
.grid {
  display: grid;
  grid-template-columns: [sidebar-start] 250px [sidebar-end content-start] 1fr [content-end];
}`}</code></pre>

      <h3>{isZh ? 'fr 单位：分数空间' : 'The fr Unit: Fractional Space'}</h3>
      <p>
        {isZh ? (
          <>
            <code>fr</code> 单位代表网格容器中可用自由空间的一个分数。浏览器在分配固定尺寸轨道（px、em、%）后计算 fr 值。
            这让你可以创建真正灵活的布局，无需计算百分比。
          </>
        ) : (
          <>
            The <code>fr</code> unit represents one fraction of the available free space in the grid container. The browser calculates
            fr values after fixed-size tracks (px, em, %) have been allocated. This allows truly flexible layouts without
            calculating percentages.
          </>
        )}
      </p>

      <pre><code className="language-css">{`/* 1fr = all available space */
.grid { grid-template-columns: 1fr; }

/* Equal columns (each gets 1/3 of space) */
.grid { grid-template-columns: 1fr 1fr 1fr; }

/* Middle column is twice as wide */
.grid { grid-template-columns: 1fr 2fr 1fr; }

/* Mixed: fixed sidebar, flexible content */
.grid { grid-template-columns: 300px 1fr; }

/* Three equal columns + one double-width */
.grid { grid-template-columns: 1fr 1fr 2fr 1fr; }
/* Total: 5 parts — each 1fr = 20%, 2fr = 40% */`}</code></pre>

      {/* Visual ASCII art for fr unit */}
      <div
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: '8px',
          padding: '16px 20px',
          fontFamily: 'monospace',
          fontSize: '13px',
          marginBottom: '20px',
          overflowX: 'auto',
        }}
      >
        <div style={{ color: '#94a3b8', marginBottom: '8px' }}>{isZh ? '# grid-template-columns: 1fr 2fr 1fr 可视化' : '# grid-template-columns: 1fr 2fr 1fr visualized'}</div>
        <div style={{ color: '#38bdf8' }}>{'┌──────────┬────────────────────┬──────────┐'}</div>
        <div style={{ color: '#38bdf8' }}>{'│   1fr    │        2fr         │   1fr    │'}</div>
        <div style={{ color: '#38bdf8' }}>{'│  ~25%    │        ~50%        │  ~25%    │'}</div>
        <div style={{ color: '#38bdf8' }}>{'└──────────┴────────────────────┴──────────┘'}</div>
      </div>

      <h3>repeat()</h3>
      <p>
        {isZh ? (
          <>
            <code>repeat()</code> 函数可以避免重复写相同的轨道定义。第一个参数是重复次数（或关键词 <code>auto-fill</code> / <code>auto-fit</code>），第二个参数是轨道大小。
          </>
        ) : (
          <>
            The <code>repeat()</code> function avoids repeating the same track definition. The first argument is the number of repetitions
            (or the keywords <code>auto-fill</code> / <code>auto-fit</code>), the second is the track size.
          </>
        )}
      </p>

      <pre><code className="language-css">{`/* 3 equal columns — verbose */
.grid { grid-template-columns: 1fr 1fr 1fr; }

/* 3 equal columns — with repeat() */
.grid { grid-template-columns: repeat(3, 1fr); }

/* 12-column grid (like Bootstrap) */
.grid { grid-template-columns: repeat(12, 1fr); }

/* Mixed: 2 fixed sidebar + repeat columns */
.grid { grid-template-columns: 200px repeat(3, 1fr) 200px; }

/* Responsive: as many 200px columns as fit */
.grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }`}</code></pre>

      {/* Section 2: Grid Placement */}
      <h2>{isZh ? '2. 网格放置：控制元素位置' : '2. Grid Placement: Controlling Item Positions'}</h2>
      <p>
        {isZh ? (
          <>默认情况下，网格项目按源顺序自动放置。但你可以使用 <code>grid-column</code>、<code>grid-row</code> 和 <code>grid-area</code> 属性精确控制每个元素的位置和跨度。</>
        ) : (
          <>By default, grid items are placed automatically in source order. But you can use <code>grid-column</code>, <code>grid-row</code>, and <code>grid-area</code> to precisely control each element's position and span.</>
        )}
      </p>

      <h3>grid-column &amp; grid-row</h3>
      <pre><code className="language-css">{`/* grid-column: start / end (line numbers) */
.item {
  grid-column: 1 / 3;   /* spans columns 1 to 3 (2 columns wide) */
  grid-row: 1 / 2;      /* occupies row line 1 to 2 (1 row tall) */
}

/* Using span keyword */
.item {
  grid-column: 2 / span 2;  /* starts at line 2, spans 2 columns */
  grid-row: span 3;          /* spans 3 rows from auto-placed position */
}

/* Negative values count from the end */
.item {
  grid-column: 1 / -1;  /* full width across all columns */
  grid-row: 2 / -1;     /* from row 2 to the last row line */
}

/* Shorthand: grid-column is grid-column-start / grid-column-end */
.item { grid-column: 1 / 3; }
/* equivalent to: */
.item {
  grid-column-start: 1;
  grid-column-end: 3;
}`}</code></pre>

      <h3>grid-area</h3>
      <p>
        {isZh ? (
          <><code>grid-area</code> 是 <code>grid-row-start / grid-column-start / grid-row-end / grid-column-end</code> 的简写，也可以引用命名模板区域中的名称。</>
        ) : (
          <><code>grid-area</code> is shorthand for <code>grid-row-start / grid-column-start / grid-row-end / grid-column-end</code>, and can also reference a name from named template areas.</>
        )}
      </p>

      <pre><code className="language-css">{`/* Longhand equivalent */
.item {
  grid-area: 1 / 1 / 3 / 3;
  /* row-start=1, col-start=1, row-end=3, col-end=3 */
}

/* Named area reference (see grid-template-areas below) */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`}</code></pre>

      {/* Section 3: Named Template Areas */}
      <h2>{isZh ? '3. 命名网格线和模板区域' : '3. Named Grid Lines and Template Areas'}</h2>
      <p>
        {isZh ? (
          <>
            <code>grid-template-areas</code> 是 CSS Grid 最直观的特性之一。它允许你使用字符串名称来定义布局，创建一种类似 ASCII 艺术的视觉布局表示。
          </>
        ) : (
          <>
            <code>grid-template-areas</code> is one of the most intuitive features in CSS Grid. It lets you define your layout
            using string names, creating an ASCII-art-like visual representation of your layout directly in CSS.
          </>
        )}
      </p>

      <pre><code className="language-css">{`/* Holy Grail layout with named areas */
.page {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header  header  header"
    "sidebar main    aside"
    "footer  footer  footer";
  min-height: 100vh;
}

/* Assign items to areas */
.page-header  { grid-area: header; }
.page-sidebar { grid-area: sidebar; }
.page-main    { grid-area: main; }
.page-aside   { grid-area: aside; }
.page-footer  { grid-area: footer; }

/* Use period for empty cells */
.grid {
  grid-template-areas:
    "header header ."
    "sidebar main  main";
}

/* Responsive: collapse sidebar on mobile */
@media (max-width: 768px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
  }
}`}</code></pre>

      {/* Visual layout representation */}
      <div
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: '8px',
          padding: '16px 20px',
          fontFamily: 'monospace',
          fontSize: '13px',
          marginBottom: '20px',
          overflowX: 'auto',
        }}
      >
        <div style={{ color: '#94a3b8', marginBottom: '8px' }}>{isZh ? '# Holy Grail 布局可视化' : '# Holy Grail Layout Visualization'}</div>
        <div style={{ color: '#38bdf8' }}>{'┌────────────────────────────────────┐'}</div>
        <div style={{ color: '#38bdf8' }}>{'│           HEADER (3 cols)          │'}</div>
        <div style={{ color: '#38bdf8' }}>{'├───────────┬────────────┬───────────┤'}</div>
        <div style={{ color: '#38bdf8' }}>{'│  SIDEBAR  │    MAIN    │   ASIDE   │'}</div>
        <div style={{ color: '#38bdf8' }}>{'│  200px    │    1fr     │   200px   │'}</div>
        <div style={{ color: '#38bdf8' }}>{'├───────────┴────────────┴───────────┤'}</div>
        <div style={{ color: '#38bdf8' }}>{'│           FOOTER (3 cols)          │'}</div>
        <div style={{ color: '#38bdf8' }}>{'└────────────────────────────────────┘'}</div>
      </div>

      {/* Section 4: Grid Alignment */}
      <h2>{isZh ? '4. 网格对齐：justify 和 align 属性' : '4. Grid Alignment: justify and align Properties'}</h2>
      <p>
        {isZh ? (
          <>CSS Grid 提供了一套完整的对齐属性，分别作用于容器和单个项目。理解行轴（水平）和块轴（垂直）对于精通对齐至关重要。</>
        ) : (
          <>CSS Grid provides a complete set of alignment properties that apply to both containers and individual items. Understanding the inline axis (horizontal) and block axis (vertical) is key to mastering alignment.</>
        )}
      </p>

      <pre><code className="language-css">{`/* ─── Container-level alignment ─── */

/* justify-items: aligns items along inline (row) axis */
.grid {
  justify-items: start;    /* left-align all items */
  justify-items: end;      /* right-align all items */
  justify-items: center;   /* center all items */
  justify-items: stretch;  /* fill cell width (default) */
}

/* align-items: aligns items along block (column) axis */
.grid {
  align-items: start;      /* top-align all items */
  align-items: end;        /* bottom-align all items */
  align-items: center;     /* vertically center all items */
  align-items: stretch;    /* fill cell height (default) */
  align-items: baseline;   /* align by text baseline */
}

/* Shorthand: place-items = align-items / justify-items */
.grid {
  place-items: center;           /* center both axes */
  place-items: center stretch;   /* vertical center, horizontal stretch */
}

/* justify-content: distributes columns when grid is smaller than container */
.grid {
  justify-content: start | end | center | stretch |
                   space-between | space-around | space-evenly;
}

/* align-content: distributes rows when grid is smaller than container */
.grid {
  align-content: start | end | center | stretch |
                 space-between | space-around | space-evenly;
}

/* Shorthand: place-content = align-content / justify-content */
.grid { place-content: center; }

/* ─── Individual item alignment ─── */
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
  place-self: center;  /* shorthand: align-self / justify-self */
}`}</code></pre>

      <h3>gap ({isZh ? '行列间距' : 'Gutters'})</h3>
      <pre><code className="language-css">{`/* gap shorthand (row-gap / column-gap) */
.grid {
  gap: 16px;           /* same gap for rows and columns */
  gap: 20px 10px;      /* row-gap=20px, column-gap=10px */
}

/* Individual gap control */
.grid {
  row-gap: 24px;
  column-gap: 12px;
}

/* Old syntax (still works, but gap is preferred) */
.grid {
  grid-gap: 16px;
  grid-row-gap: 24px;
  grid-column-gap: 12px;
}`}</code></pre>

      {/* Section 5: Auto Placement and minmax */}
      <h2>{isZh ? '5. 自动放置：grid-auto-flow 和 minmax()' : '5. Auto Placement: grid-auto-flow and minmax()'}</h2>

      <h3>grid-auto-flow</h3>
      <p>
        {isZh ? (
          <>当网格项目没有明确放置时，浏览器使用自动放置算法。<code>grid-auto-flow</code> 控制自动放置的方向和行为。</>
        ) : (
          <>When grid items have no explicit placement, the browser uses the auto-placement algorithm. <code>grid-auto-flow</code> controls the direction and behavior of auto-placement.</>
        )}
      </p>

      <pre><code className="language-css">{`/* Default: fill row by row, then add new rows */
.grid { grid-auto-flow: row; }

/* Fill column by column, then add new columns */
.grid { grid-auto-flow: column; }

/* Dense packing: fill gaps left by large items */
.grid { grid-auto-flow: row dense; }
.grid { grid-auto-flow: dense; }  /* same as row dense */

/* Control size of auto-generated rows/columns */
.grid {
  grid-auto-rows: 100px;        /* fixed height for implicit rows */
  grid-auto-rows: minmax(100px, auto); /* min 100px, grow to fit */
  grid-auto-columns: 200px;
}`}</code></pre>

      <h3>minmax()</h3>
      <p>
        {isZh ? (
          <>
            <code>minmax(min, max)</code> 定义轨道的最小和最大尺寸范围。这是实现无媒体查询响应式网格的关键。
          </>
        ) : (
          <>
            <code>minmax(min, max)</code> defines a size range for a track — setting both a minimum and maximum size. This is the key to responsive grids without media queries.
          </>
        )}
      </p>

      <pre><code className="language-css">{`/* Column is at least 200px, can grow to fill space */
.grid {
  grid-template-columns: minmax(200px, 1fr);
}

/* Three columns: each at least 150px, at most equal thirds */
.grid {
  grid-template-columns: repeat(3, minmax(150px, 1fr));
}

/* Rows: at least 80px tall, expand for content */
.grid {
  grid-auto-rows: minmax(80px, auto);
}

/* The "holy grail" responsive card pattern */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}
/* ↑ Creates as many 250px+ columns as fit, then stretches them equally */`}</code></pre>

      <h3>{isZh ? 'auto-fill vs auto-fit' : 'auto-fill vs auto-fit'}</h3>
      <pre><code className="language-css">{`/* auto-fill: creates as many tracks as fit, keeps empty tracks */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* auto-fit: creates as many tracks as fit, COLLAPSES empty tracks */
.grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Difference is visible when items < available columns:

   Container: 900px, min-item: 200px → 4 potential columns

   auto-fill (3 items):
   ┌──────┬──────┬──────┬──────┐
   │  #1  │  #2  │  #3  │      │  ← empty column preserved
   └──────┴──────┴──────┴──────┘

   auto-fit (3 items):
   ┌────────────┬────────────┬────────────┐
   │     #1     │     #2     │     #3     │  ← empty column collapsed
   └────────────┴────────────┴────────────┘
*/`}</code></pre>

      {/* Section 6: Responsive Grid Patterns */}
      <h2>{isZh ? '6. 响应式网格模式' : '6. Responsive Grid Patterns'}</h2>

      <h3>{isZh ? '无媒体查询的响应式卡片网格' : 'Responsive Card Grid (Zero Media Queries)'}</h3>
      <pre><code className="language-css">{`/* Cards that automatically reflow at any screen size */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 24px;
  padding: 24px;
}

/* The min(100%, 300px) prevents overflow on very small screens:
   - On wide screens: columns are at least 300px, max 1fr
   - On narrow screens: min(100%, 300px) = 100% → single column */`}</code></pre>

      <h3>{isZh ? '杂志/Pinterest 风格布局' : 'Magazine/Pinterest-style Layout'}</h3>
      <pre><code className="language-css">{`/* Masonry-like layout with varying row spans */
.magazine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
  gap: 16px;
}

/* Items take different row amounts */
.magazine .featured   { grid-row: span 3; grid-column: span 2; }
.magazine .tall       { grid-row: span 2; }
.magazine .wide       { grid-column: span 2; }
.magazine .normal     { /* defaults: 1 row, 1 col */ }`}</code></pre>

      <h3>{isZh ? '仪表盘布局' : 'Dashboard Layout'}</h3>
      <pre><code className="language-css">{`/* Full dashboard with fixed sidebar */
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "nav     topbar"
    "nav     content";
  min-height: 100vh;
}

.dashboard-nav     { grid-area: nav; }
.dashboard-topbar  { grid-area: topbar; }
.dashboard-content { grid-area: content; }

/* Dashboard content with metric cards */
.dashboard-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 1fr 1fr;
  gap: 20px;
  padding: 24px;
}

.metric-card    { /* 1 col × 1 row */ }
.chart-main     { grid-column: span 3; grid-row: span 2; }
.chart-side     { grid-row: span 2; }

@media (max-width: 1024px) {
  .dashboard-content {
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-main { grid-column: span 2; }
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-areas:
      "topbar"
      "content";
  }
  .dashboard-nav { display: none; } /* or transform into drawer */
}`}</code></pre>

      <h3>{isZh ? '照片画廊布局' : 'Photo Gallery Layout'}</h3>
      <pre><code className="language-css">{`/* Auto-filling image gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 4px;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Feature every 5th image */
.gallery .feature {
  grid-column: span 2;
  grid-row: span 2;
}

/* Landscape portrait mix with dense packing */
.gallery { grid-auto-flow: dense; }
.landscape { grid-column: span 2; }
.portrait  { grid-row: span 2; }`}</code></pre>

      <h3>{isZh ? '定价表格布局' : 'Pricing Table Layout'}</h3>
      <pre><code className="language-css">{`/* 3-column pricing table */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-radius: 16px;
  overflow: hidden;
}

/* Highlight the middle (recommended) plan */
.pricing-grid .plan-featured {
  grid-row: 1 / -1;
  transform: scaleY(1.02);
  z-index: 1;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .pricing-grid .plan-featured {
    transform: none;
    order: -1; /* show featured plan first on mobile */
  }
}`}</code></pre>

      {/* Section 7: Subgrid */}
      <h2>{isZh ? '7. 子网格 (Subgrid) — CSS Grid Level 2' : '7. Subgrid — CSS Grid Level 2'}</h2>
      <p>
        {isZh ? (
          <>
            子网格（<code>grid-template-columns: subgrid</code> 或 <code>grid-template-rows: subgrid</code>）允许嵌套的网格项目参与并继承其祖先网格的轨道尺寸。
            这解决了长期存在的"跨卡片对齐"问题：让不同卡片内的子元素跨卡片边界对齐。
            子网格在 Firefox 71、Chrome 117、Safari 16 中获得支持，截至 2023 年已在所有现代浏览器中可用。
          </>
        ) : (
          <>
            Subgrid (<code>grid-template-columns: subgrid</code> or <code>grid-template-rows: subgrid</code>) allows a nested grid item
            to participate in and inherit track sizing from its ancestor grid. This solves the classic "cross-card alignment" problem
            where child elements inside different cards need to align across card boundaries.
            Subgrid landed in Firefox 71, Chrome 117, and Safari 16 — available in all modern browsers as of 2023.
          </>
        )}
      </p>

      <pre><code className="language-css">{`/* PROBLEM: Card titles/descriptions don't align across cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.card { display: flex; flex-direction: column; }
/* ↑ Each card has its own layout context — no cross-card alignment */

/* SOLUTION: Subgrid for cross-card alignment */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto 1fr auto; /* img, title, body, button */
  gap: 20px 20px;
}

.card {
  display: grid;
  grid-row: span 4;           /* card spans 4 rows */
  grid-template-rows: subgrid; /* inherit row tracks from parent! */
}

/* Now .card-image, .card-title, .card-body, .card-button
   in ALL cards share the SAME row tracks → perfect alignment */
.card-image  { grid-row: 1; }
.card-title  { grid-row: 2; }
.card-body   { grid-row: 3; }
.card-button { grid-row: 4; }

/* Subgrid can be used for columns too */
.nested-grid {
  display: grid;
  grid-column: 2 / 5;
  grid-template-columns: subgrid; /* inherits 3 parent columns */
}
`}</code></pre>

      <div
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: '8px',
          padding: '16px 20px',
          fontFamily: 'monospace',
          fontSize: '13px',
          marginBottom: '20px',
          overflowX: 'auto',
        }}
      >
        <div style={{ color: '#94a3b8', marginBottom: '8px' }}>{isZh ? '# Subgrid 解决跨卡片对齐' : '# Subgrid solves cross-card alignment'}</div>
        <div style={{ color: '#f87171' }}>{'Without subgrid:           With subgrid:'}</div>
        <div style={{ color: '#e2e8f0' }}>{'┌──────────┐ ┌──────────┐  ┌──────────┐ ┌──────────┐'}</div>
        <div style={{ color: '#e2e8f0' }}>{'│  [img]   │ │  [img]   │  │  [img]   │ │  [img]   │'}</div>
        <div style={{ color: '#e2e8f0' }}>{'│ Short    │ │ A Very   │  │ Short    │ │ A Very   │'}</div>
        <div style={{ color: '#e2e8f0' }}>{'│ Title    │ │ Long     │  │ Title    │ │ Long     │'}</div>
        <div style={{ color: '#f87171' }}>{'│ Body... │ │ Title    │  '}<span style={{ color: '#4ade80' }}>{'│ Body...  │ │ Title    │'}</span></div>
        <div style={{ color: '#f87171' }}>{'│ [btn]   │ │ Body...  │  '}<span style={{ color: '#4ade80' }}>{'│          │ │          │'}</span></div>
        <div style={{ color: '#f87171' }}>{'└──────────┘ │ [btn]    │  '}<span style={{ color: '#4ade80' }}>{'│ [btn]    │ │ Body...  │'}</span></div>
        <div style={{ color: '#f87171' }}>{' misaligned  └──────────┘  '}<span style={{ color: '#4ade80' }}>{'└──────────┘ │ [btn]    │'}</span></div>
        <div style={{ color: '#f87171' }}>{''}<span style={{ color: '#4ade80' }}>{'            perfectly     └──────────┘'}</span></div>
        <div style={{ color: '#4ade80' }}>{'             aligned!'}</div>
      </div>

      {/* Section 8: CSS Grid vs Flexbox Comparison */}
      <h2>{isZh ? '8. CSS Grid vs Flexbox：完整对比' : '8. CSS Grid vs Flexbox: Complete Comparison'}</h2>
      <p>
        {isZh ? (
          <>Grid 和 Flexbox 不是竞争关系，而是互补关系。理解何时使用哪个是高级 CSS 的标志。</>
        ) : (
          <>Grid and Flexbox are not competing technologies — they complement each other. Knowing when to use each is a hallmark of advanced CSS proficiency.</>
        )}
      </p>

      {/* Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', border: '1px solid #334155', minWidth: '140px' }}>{isZh ? '维度' : 'Dimension'}</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', border: '1px solid #334155', minWidth: '160px' }}>CSS Grid</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', border: '1px solid #334155', minWidth: '160px' }}>Flexbox</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                dim: isZh ? '维度' : 'Dimensions',
                grid: isZh ? '二维（行 + 列）' : 'Two-dimensional (rows + columns)',
                flex: isZh ? '一维（行 或 列）' : 'One-dimensional (row OR column)',
              },
              {
                dim: isZh ? '适用场景' : 'Best for',
                grid: isZh ? '页面布局、复杂网格、仪表盘' : 'Page layouts, complex grids, dashboards',
                flex: isZh ? '导航栏、按钮组、居中元素' : 'Navbars, button groups, centering',
              },
              {
                dim: isZh ? '控制方式' : 'Control from',
                grid: isZh ? '主要从容器控制' : 'Primarily from container',
                flex: isZh ? '容器和项目均可控制' : 'Both container and items',
              },
              {
                dim: isZh ? '内容适应' : 'Content adaptation',
                grid: isZh ? '布局先行，内容填充网格' : 'Layout-first, content fills tracks',
                flex: isZh ? '内容先行，项目适应空间' : 'Content-first, items adapt to space',
              },
              {
                dim: isZh ? '重叠元素' : 'Overlapping items',
                grid: isZh ? '原生支持（同一网格区域）' : 'Native support (same grid area)',
                flex: isZh ? '需要负 margin 或 position' : 'Requires negative margin or position',
              },
              {
                dim: isZh ? '轨道对齐' : 'Track alignment',
                grid: isZh ? '强大（行和列对齐）' : 'Powerful (row and column alignment)',
                flex: isZh ? '单轴对齐' : 'Single-axis alignment',
              },
              {
                dim: isZh ? '响应式设计' : 'Responsive design',
                grid: isZh ? '自动放置 + minmax() 极其强大' : 'Auto-placement + minmax() is very powerful',
                flex: isZh ? '需要媒体查询控制换行' : 'Requires media queries for wrapping control',
              },
              {
                dim: isZh ? '命名布局' : 'Named layouts',
                grid: isZh ? '支持 grid-template-areas' : 'grid-template-areas supported',
                flex: isZh ? '不支持' : 'Not supported',
              },
              {
                dim: isZh ? '浏览器支持' : 'Browser support',
                grid: isZh ? '所有现代浏览器（2017+）' : 'All modern browsers (2017+)',
                flex: isZh ? '所有现代浏览器（2012+）' : 'All modern browsers (2012+)',
              },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                <td style={{ padding: '10px 16px', border: '1px solid #e2e8f0', fontWeight: 600 }}>{row.dim}</td>
                <td style={{ padding: '10px 16px', border: '1px solid #e2e8f0' }}>{row.grid}</td>
                <td style={{ padding: '10px 16px', border: '1px solid #e2e8f0' }}>{row.flex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{isZh ? '何时选择 Grid' : 'When to Choose Grid'}</h3>
      <pre><code className="language-css">{`/* Use Grid for:
   ✓ Full-page layouts (header/sidebar/main/footer)
   ✓ Card grids with consistent row heights
   ✓ Dashboard interfaces with multiple panels
   ✓ Magazine-style layouts with varying cell sizes
   ✓ Any layout where rows AND columns matter simultaneously
   ✓ When you need items to span multiple tracks
   ✓ Named area layouts for clarity and responsiveness
*/

/* Classic Grid use case: */
.page-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "sidebar header"
    "sidebar content"
    "sidebar footer";
  min-height: 100vh;
}`}</code></pre>

      <h3>{isZh ? '何时选择 Flexbox' : 'When to Choose Flexbox'}</h3>
      <pre><code className="language-css">{`/* Use Flexbox for:
   ✓ Navigation bars (horizontal list of links)
   ✓ Button groups and toolbars
   ✓ Centering a single element
   ✓ Card internals (icon + text layout)
   ✓ Form layouts with labels and inputs
   ✓ Any layout where items flow in one direction
   ✓ When content size should drive layout
*/

/* Classic Flexbox use case: */
.navbar {
  display: flex;
  align-items: center;
  gap: 16px;
}

.navbar .logo   { margin-right: auto; } /* push nav links to right */
.navbar .links  { display: flex; gap: 8px; }
.navbar .button { /* stays at far right */ }`}</code></pre>

      <h3>{isZh ? '最佳实践：Grid + Flexbox 组合' : 'Best Practice: Combining Grid and Flexbox'}</h3>
      <pre><code className="language-css">{`/* Use Grid for the outer page structure,
   Flexbox for inner component layouts */

/* OUTER: Grid layout */
.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  min-height: 100vh;
}

/* INNER: Flexbox components */
.header {
  grid-area: header;
  display: flex;          /* flex for navbar */
  align-items: center;
  padding: 0 24px;
  gap: 16px;
}

/* Even deeper: Grid card layout → Flexbox card content */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  display: flex;           /* flex for vertical card content */
  flex-direction: column;
}

.card-body { flex: 1; }   /* pushes footer to bottom */`}</code></pre>

      {/* Section 9: CSS Grid with CSS Variables */}
      <h2>{isZh ? '9. CSS Grid 与 CSS 自定义属性' : '9. CSS Grid with CSS Custom Properties'}</h2>
      <p>
        {isZh ? (
          <>CSS 自定义属性（变量）与 CSS Grid 配合使用非常强大，可以创建可配置的、主题化的网格系统。</>
        ) : (
          <>CSS custom properties (variables) work powerfully with CSS Grid, enabling configurable and themeable grid systems.</>
        )}
      </p>

      <pre><code className="language-css">{`/* Define a configurable grid system */
:root {
  --grid-columns: 12;
  --grid-gap: 24px;
  --grid-max-width: 1200px;
  --sidebar-width: 280px;
  --card-min-width: 260px;
}

/* Base grid using variables */
.grid-container {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
  max-width: var(--grid-max-width);
  margin: 0 auto;
}

/* Responsive overrides via custom properties */
@media (max-width: 1024px) {
  :root { --grid-columns: 8; --grid-gap: 16px; }
}

@media (max-width: 768px) {
  :root { --grid-columns: 4; --grid-gap: 12px; }
}

/* Theming: dark mode changes gap/sizing */
@media (prefers-color-scheme: dark) {
  :root { --grid-gap: 20px; }
}

/* Component-level overrides */
.hero-grid {
  --grid-columns: 2;
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
}

/* Dynamic inline grid (controlled by JS or inline styles) */
.dynamic-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 3), 1fr);
}
/* In HTML: <div class="dynamic-grid" style="--cols: 4"> */`}</code></pre>

      {/* Section 10: Browser Support and Fallbacks */}
      <h2>{isZh ? '10. 浏览器支持与降级处理' : '10. Browser Support and Fallbacks'}</h2>
      <p>
        {isZh ? (
          <>
            CSS Grid 在所有现代浏览器中的支持率超过 97%（截至 2024 年）。对于需要支持旧版浏览器的项目，可以使用特性检测和优雅降级。
          </>
        ) : (
          <>
            CSS Grid has over 97% browser support across modern browsers as of 2024. For projects requiring legacy browser support, use feature detection and progressive enhancement.
          </>
        )}
      </p>

      <pre><code className="language-css">{`/* Browser support (caniuse.com as of 2024):
   Chrome 57+    ✓ (2017)
   Firefox 52+   ✓ (2017)
   Safari 10.1+  ✓ (2017)
   Edge 16+      ✓ (2017)
   IE 11         partial (old syntax, -ms- prefix)
   Global support: ~97%+ */

/* Progressive enhancement: Flexbox fallback → Grid enhancement */
.container {
  display: flex;          /* Flexbox for old browsers */
  flex-wrap: wrap;
}

@supports (display: grid) {
  .container {
    display: grid;        /* Grid for modern browsers */
    grid-template-columns: repeat(3, 1fr);
  }
}

/* @supports for specific Grid features */
@supports (grid-template-areas: "a") {
  /* Named areas supported */
}

@supports (grid-template-rows: subgrid) {
  /* Subgrid supported */
  .card {
    grid-template-rows: subgrid;
  }
}

/* IE 11 fallback with -ms- prefix */
.ie-compat {
  display: -ms-grid;
  -ms-grid-columns: 200px 1fr;
  -ms-grid-rows: 60px 1fr;
}

/* Modern equivalent */
.ie-compat {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr;
}`}</code></pre>

      {/* Section 11: Common Mistakes and Debugging */}
      <h2>{isZh ? '11. 常见错误与调试技巧' : '11. Common Mistakes and Debugging Tips'}</h2>

      <h3>{isZh ? '常见错误' : 'Common Mistakes'}</h3>
      <pre><code className="language-css">{`/* MISTAKE 1: Setting display:grid on items (not container) */
.item { display: grid; } /* Wrong: this creates a new grid context */
.container { display: grid; } /* Correct */

/* MISTAKE 2: Forgetting grid-template-columns defaults to single column */
.container { display: grid; }
/* ↑ All items stack vertically — add grid-template-columns! */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Now 3 columns */
}

/* MISTAKE 3: gap vs padding confusion */
.container { gap: 20px; }  /* Space between items */
.container { padding: 20px; } /* Space inside container (not between items) */

/* MISTAKE 4: Forgetting grid-column/row auto-placement resets */
/* When you explicitly place some items, auto-placed items fill remaining cells */

/* MISTAKE 5: Using % width on grid items (usually wrong) */
.item { width: 33%; } /* Wrong: grid already controls width via fr */
.item { } /* Correct: let grid track sizing do the work */

/* MISTAKE 6: grid-gap (old) vs gap (new) */
.grid { grid-gap: 16px; }  /* Old — still works but deprecated */
.grid { gap: 16px; }       /* Modern — preferred */

/* MISTAKE 7: Overlapping items without z-index */
.item-1 { grid-area: 1 / 1 / 3 / 3; }
.item-2 { grid-area: 2 / 2 / 4 / 4; } /* overlaps item-1 */
/* Add z-index to control stacking: */
.item-1 { z-index: 1; }
.item-2 { z-index: 2; }`}</code></pre>

      <h3>{isZh ? '调试技巧' : 'Debugging Tips'}</h3>
      <pre><code className="language-css">{`/* TIP 1: Visualize grid with outline */
.container > * {
  outline: 2px solid red;
}

/* TIP 2: Background color different cells */
.item:nth-child(odd)  { background: rgba(100, 200, 255, 0.2); }
.item:nth-child(even) { background: rgba(255, 150, 100, 0.2); }

/* TIP 3: DevTools Grid Inspector
   - Firefox: Elements → grid badge → Layout panel
   - Chrome: Elements → grid badge → Layout panel
   Shows: line numbers, track sizes, area names, gaps */

/* TIP 4: Temporarily add grid-template-rows to see all rows */
.debug {
  grid-template-rows: 50px 50px 50px; /* see row boundaries */
}

/* TIP 5: Use grid-template-areas to debug layout visually */
.debug {
  grid-template-areas:
    "A A B"
    "C D B"
    "C E E";
  /* Every letter is a named area — easy to visualize */
}`}</code></pre>

      {/* Section 12: Real-World Example - Full Dashboard */}
      <h2>{isZh ? '12. 真实案例：完整仪表盘 + 定价页面' : '12. Real-World Examples: Full Dashboard + Pricing Page'}</h2>

      <h3>{isZh ? '完整仪表盘 HTML + CSS' : 'Full Dashboard HTML + CSS'}</h3>
      <pre><code className="language-css">{`/* ═══════════════════════════════════
   Complete Dashboard Grid Layout
   ═══════════════════════════════════ */

/* 1. App Shell */
.app {
  display: grid;
  grid-template-columns: var(--sidebar-width, 240px) 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "sidebar topbar"
    "sidebar content";
  height: 100vh;
  overflow: hidden;
}

/* 2. Sidebar: flex column internally */
.sidebar {
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* 3. Top Bar: flex row */
.topbar {
  grid-area: topbar;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

/* 4. Content area: nested grid */
.content {
  grid-area: content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: minmax(120px, auto);
  gap: 20px;
  padding: 24px;
  overflow-y: auto;
  align-content: start;
}

/* 5. KPI metric cards */
.metric-card { /* default: 1×1 */ }

/* 6. Main chart: spans 3 columns × 2 rows */
.chart-primary {
  grid-column: span 3;
  grid-row: span 2;
}

/* 7. Activity feed: 1 col × 2 rows */
.activity-feed {
  grid-row: span 2;
}

/* 8. Wide table: full width */
.data-table {
  grid-column: 1 / -1;
}`}</code></pre>

      <pre><code className="language-html">{`<!-- Dashboard HTML Structure -->
<div class="app">
  <nav class="sidebar">...</nav>
  <header class="topbar">...</header>
  <main class="content">
    <div class="metric-card">Revenue</div>
    <div class="metric-card">Users</div>
    <div class="metric-card">Orders</div>
    <div class="metric-card">Churn</div>
    <div class="chart-primary">Main Chart</div>
    <div class="activity-feed">Activity</div>
    <div class="data-table">Data Table</div>
  </main>
</div>`}</code></pre>

      <h3>{isZh ? '响应式定价表格' : 'Responsive Pricing Table'}</h3>
      <pre><code className="language-css">{`/* Three-tier pricing: Starter / Pro / Enterprise */
.pricing {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  max-width: 900px;
  margin: 0 auto;
}

.pricing-plan {
  background: #fff;
  padding: 40px 32px;
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
  gap: 16px;
}

.pricing-plan.featured {
  background: #1e293b;
  color: #f8fafc;
  transform: scaleY(1.02);
  z-index: 1;
}

.plan-name    { font-size: 20px; font-weight: 700; }
.plan-price   { font-size: 48px; font-weight: 800; }
.plan-period  { font-size: 14px; opacity: 0.6; }
.plan-features{ /* fills remaining space */ }
.plan-cta     { /* sticks to bottom */ }

@media (max-width: 768px) {
  .pricing {
    grid-template-columns: 1fr;
    gap: 16px;
    background: transparent;
  }
  .pricing-plan.featured {
    transform: none;
    order: -1;
    border-radius: 12px;
  }
  .pricing-plan { border-radius: 12px; }
}`}</code></pre>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1.5px solid #e2e8f0',
          borderRadius: '10px',
          padding: '20px 24px',
          marginTop: '32px',
          marginBottom: '28px',
        }}
      >
        <strong style={{ color: '#1e293b', fontSize: '15px', display: 'block', marginBottom: '12px' }}>
          {isZh ? 'Key Takeaways — 核心要点' : 'Key Takeaways'}
        </strong>
        <ol style={{ margin: 0, paddingLeft: '20px', lineHeight: '2' }}>
          {isZh ? (
            <>
              <li><code>display: grid</code> 激活二维布局；<code>grid-template-columns/rows</code> 定义轨道</li>
              <li><code>fr</code> 单位分配剩余空间；<code>repeat()</code> 避免重复轨道定义</li>
              <li><code>grid-template-areas</code> 创建可读的、可视化的布局定义</li>
              <li><code>minmax() + auto-fit</code> 是实现零媒体查询响应式网格的最佳方案</li>
              <li><code>auto-fit</code> 折叠空轨道（项目拉伸），<code>auto-fill</code> 保留空轨道</li>
              <li><code>place-items: center</code> 是在网格单元中完美居中的快捷方式</li>
              <li>Subgrid 解决跨卡片对齐问题（Chrome 117+, Firefox 71+, Safari 16+）</li>
              <li>用 Grid 做页面结构，用 Flexbox 做组件内部布局——组合使用效果最佳</li>
              <li>CSS 自定义属性使网格系统可配置且易于主题化</li>
              <li>浏览器 DevTools 的 Grid 检查器是调试网格的最佳工具</li>
            </>
          ) : (
            <>
              <li><code>display: grid</code> enables two-dimensional layout; <code>grid-template-columns/rows</code> define tracks</li>
              <li>The <code>fr</code> unit distributes remaining space; <code>repeat()</code> avoids repetitive track definitions</li>
              <li><code>grid-template-areas</code> creates readable, visual layout definitions</li>
              <li><code>minmax() + auto-fit</code> is the best way to achieve responsive grids with zero media queries</li>
              <li><code>auto-fit</code> collapses empty tracks (items stretch); <code>auto-fill</code> preserves empty tracks</li>
              <li><code>place-items: center</code> is the shortcut for perfect centering in a grid cell</li>
              <li>Subgrid solves cross-card alignment (Chrome 117+, Firefox 71+, Safari 16+)</li>
              <li>Use Grid for page structure, Flexbox for component internals — combine both</li>
              <li>CSS custom properties make grid systems configurable and easy to theme</li>
              <li>Browser DevTools Grid Inspector is your best friend for debugging layouts</li>
            </>
          )}
        </ol>
      </div>

      {/* Section 13: FAQs */}
      <h2>{isZh ? '常见问题 (FAQ)' : 'Frequently Asked Questions'}</h2>

      <h3>{isZh ? 'CSS Grid 是什么？什么时候应该使用它？' : 'What is CSS Grid and when should I use it?'}</h3>
      <p>
        {isZh ? (
          <>CSS Grid 是 CSS 中的二维布局系统。当你需要同时控制行和列时使用它——例如完整页面布局、仪表盘、照片画廊和杂志风格设计。与 Flexbox（一维）不同，Grid 让你可以同时在两个方向上精确放置元素。</>
        ) : (
          <>CSS Grid is a two-dimensional layout system for the web. Use it when you need to control both rows and columns simultaneously — for example, full-page layouts, dashboards, photo galleries, and magazine-style designs. Unlike Flexbox (which is one-dimensional), Grid lets you place items precisely in both directions at once.</>
        )}
      </p>

      <h3>{isZh ? 'CSS Grid 中的 fr 单位是什么意思？' : 'What does the fr unit mean in CSS Grid?'}</h3>
      <p>
        {isZh ? (
          <><code>fr</code>（fraction，分数）单位代表网格容器中可用自由空间的一个分数。例如，<code>grid-template-columns: 1fr 2fr 1fr</code> 创建三列，中间列是外侧列的两倍宽。浏览器在分配固定尺寸轨道（px、em、%）后计算 fr 值。</>
        ) : (
          <>The <code>fr</code> (fraction) unit represents a fraction of the available free space in the grid container. For example, <code>grid-template-columns: 1fr 2fr 1fr</code> creates three columns where the middle column is twice as wide as the outer columns. The browser calculates fr after fixed-size tracks (px, em, %) are allocated.</>
        )}
      </p>

      <h3>{isZh ? 'CSS Grid 中 auto-fill 和 auto-fit 有什么区别？' : 'What is the difference between auto-fill and auto-fit in CSS Grid?'}</h3>
      <p>
        {isZh ? (
          <>两者都会创建尽可能多的适合容器的轨道。区别在于项目数量少于可用列数时：<code>auto-fill</code> 保留空轨道，维持其空间；<code>auto-fit</code> 将空轨道折叠为零宽度，允许项目拉伸填满容器。响应式卡片网格用 <code>auto-fit</code>，需要保持固定列数时用 <code>auto-fill</code>。</>
        ) : (
          <>Both create as many tracks as fit the container. The difference appears with fewer items than available tracks: <code>auto-fill</code> keeps empty tracks, preserving their space; <code>auto-fit</code> collapses empty tracks to zero width, allowing items to stretch and fill the container. Use <code>auto-fit</code> for responsive card grids and <code>auto-fill</code> when you want to maintain a consistent column count.</>
        )}
      </p>

      <h3>{isZh ? 'grid-column 和 grid-row 简写属性如何工作？' : 'How do grid-column and grid-row shorthand properties work?'}</h3>
      <p>
        {isZh ? (
          <><code>grid-column</code> 是 <code>grid-column-start / grid-column-end</code> 的简写，<code>grid-row</code> 是 <code>grid-row-start / grid-row-end</code> 的简写。可以使用行号（<code>grid-column: 1 / 3</code>）、命名行或 span 关键词（<code>grid-column: span 2</code>）。负值从显式网格末尾开始计数，所以 <code>grid-column: 1 / -1</code> 跨越全部宽度。</>
        ) : (
          <><code>grid-column</code> is shorthand for <code>grid-column-start / grid-column-end</code>, and <code>grid-row</code> is shorthand for <code>grid-row-start / grid-row-end</code>. You can use line numbers (<code>grid-column: 1 / 3</code>), named lines, or the span keyword (<code>grid-column: span 2</code>). Negative values count from the end of the explicit grid, so <code>grid-column: 1 / -1</code> spans the full width.</>
        )}
      </p>

      <h3>{isZh ? 'CSS Grid 命名模板区域是什么？' : 'What are CSS Grid named template areas?'}</h3>
      <p>
        {isZh ? (
          <>命名模板区域通过在容器上使用 <code>grid-template-areas</code> 为网格单元分配字符串名称，然后在项目上用 <code>grid-area</code> 引用这些名称。这在 CSS 中创建了一个类似 ASCII 艺术的布局视觉表示。用句点（.）表示空单元。命名区域必须是矩形的，不能在非相邻单元中重复。</>
        ) : (
          <>Named template areas let you assign string names to grid cells using <code>grid-template-areas</code> on the container, then reference those names on items with <code>grid-area</code>. This creates a visual ASCII-art representation of your layout in CSS. Use a period (.) for empty cells. Named areas must be rectangular and cannot be repeated in non-adjacent cells.</>
        )}
      </p>

      <h3>{isZh ? 'CSS Grid Level 2 中的 Subgrid 是什么？' : 'What is subgrid in CSS Grid Level 2?'}</h3>
      <p>
        {isZh ? (
          <>Subgrid（<code>grid-template-columns: subgrid</code> 或 <code>grid-template-rows: subgrid</code>）允许嵌套网格项目参与并继承其祖先网格的轨道尺寸。这解决了经典的"卡片对齐"问题：不同卡片内的子元素需要跨卡片边界对齐。自 2023 年起，所有现代浏览器均已支持 Subgrid。</>
        ) : (
          <>Subgrid (<code>grid-template-columns: subgrid</code> or <code>grid-template-rows: subgrid</code>) allows a nested grid item to participate in and inherit track sizing from its ancestor grid. This solves the classic "card alignment" problem where inner elements of different cards need to align across card boundaries. Subgrid is supported in all modern browsers as of 2023.</>
        )}
      </p>

      <h3>{isZh ? '我应该用 CSS Grid 还是 Flexbox？' : 'Should I use CSS Grid or Flexbox?'}</h3>
      <p>
        {isZh ? (
          <>当你需要同时控制行和列的二维布局时（页面布局、仪表盘、画廊）用 Grid。当元素沿单一方向流动时（导航栏、按钮组、居中）用 Flexbox。它们相辅相成——基于 Grid 的页面布局搭配基于 Flexbox 的组件是最常见也最有效的组合。</>
        ) : (
          <>Use Grid for two-dimensional layouts where you need to control both rows and columns simultaneously (page layouts, dashboards, galleries). Use Flexbox for one-dimensional layouts where items flow in a single direction (navbars, button groups, centering). They complement each other — a Grid-based page layout with Flexbox-based components is the most common and effective combination.</>
        )}
      </p>

      <h3>{isZh ? '如何调试 CSS Grid 布局？' : 'How do I debug CSS Grid layouts?'}</h3>
      <p>
        {isZh ? (
          <>Chrome、Firefox 和 Edge 的 DevTools 都有专用的 CSS Grid 检查器。在 Firefox 中，点击 Elements 面板中容器旁的 grid 徽章可切换网格叠加层。在 Chrome 中，使用 Layout 面板查看网格行号和区域名称。最常用的调试技巧是为网格项目添加 <code>outline: 1px solid red</code> 或使用背景色来可视化每个单元格。</>
        ) : (
          <>Chrome, Firefox, and Edge DevTools all have dedicated CSS Grid inspectors. In Firefox, click the grid badge next to the container in the Elements panel to toggle a grid overlay. In Chrome, use the Layout panel to see grid line numbers and area names. The most common debugging technique is to add <code>outline: 1px solid red</code> to grid items or use background colors to visualize each cell.</>
        )}
      </p>

      {/* Conclusion */}
      <h2>{isZh ? '总结' : 'Conclusion'}</h2>
      <p>
        {isZh ? (
          <>
            CSS Grid 是现代 web 布局的基础。掌握 <code>fr</code> 单位、<code>grid-template-areas</code>、<code>minmax()</code>、<code>auto-fit</code> 和 Subgrid
            这些核心概念，你就能构建几乎任何布局——通常只需几行代码，而无需使用复杂的 hack 或过多的媒体查询。
            配合 CSS 自定义属性和现代 DevTools，CSS Grid 让复杂布局的创建和维护变得前所未有的简单。
          </>
        ) : (
          <>
            CSS Grid is foundational to modern web layout. Master the core concepts — the <code>fr</code> unit, <code>grid-template-areas</code>,
            <code> minmax()</code>, <code>auto-fit</code>, and Subgrid — and you can build virtually any layout in just a few lines of CSS,
            without complex hacks or excessive media queries.
            Paired with CSS custom properties and modern DevTools, CSS Grid makes creating and maintaining complex layouts easier than ever before.
          </>
        )}
      </p>
      <p>
        {isZh ? (
          <>记住最重要的一点：<strong>Grid 用于页面结构，Flexbox 用于组件内部</strong>。将两者结合使用，你就拥有了构建任何现代 web UI 所需的全部工具。</>
        ) : (
          <>Remember the most important takeaway: <strong>Grid for page structure, Flexbox for component internals</strong>. Use them together and you have all the tools needed to build any modern web UI.</>
        )}
      </p>
    </>
  );
}
