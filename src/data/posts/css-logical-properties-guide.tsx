'use client';
import React from 'react';

const codeBasicMappings = `/* CSS Logical Properties vs Physical Properties */

/* PHYSICAL (old way) — tied to top/right/bottom/left */
.box {
  margin-top: 1rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;

  padding-left: 1.5rem;
  padding-right: 1.5rem;

  border-left: 2px solid blue;

  width: 300px;
  height: 200px;
}

/* LOGICAL (new way) — relative to writing direction */
.box {
  margin-block: 1rem;        /* top + bottom  → block start + end */
  margin-inline: 2rem;       /* left + right  → inline start + end */

  padding-inline: 1.5rem;    /* horizontal padding in any direction */

  border-inline-start: 2px solid blue;  /* 'left' in LTR, 'right' in RTL */

  inline-size: 300px;        /* width  in horizontal writing */
  block-size: 200px;         /* height in horizontal writing */
}`;

const codeInlineBlock = `/* Understanding inline vs block axes */

/*
  Horizontal writing mode (default English):
  - inline axis → left ←→ right  (text flows horizontally)
  - block axis  → top ↕ bottom   (blocks stack vertically)

  Vertical writing mode (Japanese, for example):
  - inline axis → top ↕ bottom   (text flows vertically)
  - block axis  → left ←→ right  (blocks stack horizontally)
*/

/* Logical shorthand properties */
.element {
  /* block = top/bottom, inline = left/right */
  margin-block: 1rem 2rem;      /* block-start: 1rem, block-end: 2rem */
  margin-inline: auto;          /* center horizontally (in LTR or RTL!) */

  padding-block-start: 0.5rem;  /* padding-top in LTR */
  padding-block-end: 0.5rem;    /* padding-bottom in LTR */
  padding-inline-start: 1rem;   /* padding-left in LTR, padding-right in RTL */
  padding-inline-end: 1rem;     /* padding-right in LTR, padding-left in RTL */

  /* Size */
  inline-size: 100%;            /* width in horizontal writing */
  min-inline-size: 200px;       /* min-width */
  max-inline-size: 800px;       /* max-width */
  block-size: auto;             /* height */

  /* Position (for position: absolute) */
  inset-block-start: 0;         /* top */
  inset-inline-start: 0;        /* left */
  inset: 0;                     /* all four sides */
}`;

const codeRTLSupport = `/* RTL support without duplicate CSS */

/* OLD WAY: separate RTL stylesheet */
/* main.css */
.sidebar {
  margin-left: 0;
  margin-right: 280px;
  padding-left: 1rem;
  border-right: 1px solid #ccc;
}

/* rtl.css (or [dir="rtl"] overrides) */
[dir="rtl"] .sidebar {
  margin-left: 280px;  /* override */
  margin-right: 0;
  padding-left: 0;
  padding-right: 1rem;
  border-right: none;
  border-left: 1px solid #ccc;
}

/* --------------------------------------- */

/* NEW WAY: logical properties handle it automatically */
.sidebar {
  /* No [dir="rtl"] override needed! */
  margin-inline-start: 0;
  margin-inline-end: 280px;       /* gap before main content */
  padding-inline-start: 1rem;
  border-inline-end: 1px solid #ccc;
  /* In RTL: margin-inline-start becomes right side automatically */
}

/* Example: icon + label that works in any direction */
.icon-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-label .icon {
  margin-inline-end: 0.5rem;  /* space between icon and label */
  /* In LTR: margin-right: 0.5rem */
  /* In RTL: margin-left: 0.5rem  — automatic! */
}`;

const codeBorders = `/* Borders with logical properties */

/* Physical */
.card {
  border-top: 2px solid blue;
  border-bottom: 1px solid gray;
  border-left: 4px solid red;    /* accent border */
  border-right: none;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

/* Logical */
.card {
  border-block-start: 2px solid blue;   /* top */
  border-block-end: 1px solid gray;     /* bottom */
  border-inline-start: 4px solid red;   /* left in LTR, right in RTL */
  border-inline-end: none;

  border-start-start-radius: 8px;  /* top-left in LTR */
  border-start-end-radius: 8px;    /* top-right in LTR */
}

/* Shorthand */
.card {
  border-block: 1px solid #eee;     /* top AND bottom */
  border-inline: 2px solid #ccc;    /* left AND right */
}`;

const codeMigration = `/* Migration strategy: replace physical with logical */

/* Step 1: Search & Replace mapping */
/*
  margin-top     → margin-block-start
  margin-bottom  → margin-block-end
  margin-left    → margin-inline-start
  margin-right   → margin-inline-end
  margin: T R B L → margin-block: T B; margin-inline: L R;

  padding-top    → padding-block-start
  padding-bottom → padding-block-end
  padding-left   → padding-inline-start
  padding-right  → padding-inline-end

  width          → inline-size
  height         → block-size
  min-width      → min-inline-size
  max-width      → max-inline-size
  min-height     → min-block-size
  max-height     → max-block-size

  top            → inset-block-start
  bottom         → inset-block-end
  left           → inset-inline-start
  right          → inset-inline-end
*/

/* Step 2: Enable writing mode for testing */
.test-rtl {
  direction: rtl;   /* test RTL layout without changing HTML */
}

.test-vertical {
  writing-mode: vertical-rl;  /* test vertical layout */
}

/* Step 3: Keep physical for TRULY physical things */
.avatar {
  /* These should stay physical — they don't relate to text direction */
  border-radius: 50%;        /* always round */
  width: 48px;               /* OR inline-size: 48px for consistency */
  height: 48px;
}`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Logical Properties Guide: Inline/Block, RTL Support, and Migration',
    intro: 'CSS Logical Properties replace physical directional keywords (top, right, bottom, left) with logical equivalents that adapt to the writing mode and text direction. Instead of margin-left, you write margin-inline-start — and it automatically becomes the correct side in both left-to-right and right-to-left layouts. This makes building truly internationalized UIs dramatically simpler.',
    conceptTitle: 'Physical vs Logical: The Core Concept',
    conceptDesc: 'Physical properties are tied to the screen coordinates. Logical properties are relative to the document\'s writing mode and text direction.',
    axesTitle: 'Understanding Inline and Block Axes',
    axesDesc: 'Logical properties use two axes: inline (the direction text flows) and block (the direction blocks are stacked). In English, inline is horizontal and block is vertical. In vertical Japanese text, they swap.',
    rtlTitle: 'RTL Support Without Duplicate CSS',
    rtlDesc: 'The killer use case for logical properties: writing one set of CSS that works for both LTR (English, French) and RTL (Arabic, Hebrew) without any direction-specific overrides.',
    bordersTitle: 'Borders and Border Radius',
    bordersDesc: 'All border properties have logical equivalents, including the somewhat verbose border-radius logical properties.',
    migrationTitle: 'Migration Guide',
    migrationDesc: 'How to systematically convert an existing codebase from physical to logical properties.',
    comparisonTitle: 'Complete Property Mapping Reference',
    browserSupportTitle: 'Browser Support (2026)',
    supportDesc: 'All CSS Logical Properties have full browser support in 2026. The basic properties (margin-block, margin-inline, padding-block, padding-inline) have been supported since Chrome 87, Firefox 66, and Safari 14.1. Only the border-radius logical variants (border-start-start-radius, etc.) required Safari 15+ for full support.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Should I migrate all physical properties to logical properties?',
    faq1a: 'Not necessarily. For properties that are truly physical (like border-radius, or explicit width constraints), physical properties are fine. Logical properties shine when the property relates to text flow direction. Prioritize: margin/padding on flex/grid items, border-start/end accents, and inline-size/block-size on text containers.',
    faq2q: 'What is the difference between inline-size and width?',
    faq2a: 'In horizontal writing mode (the default), inline-size is equivalent to width. In vertical writing mode (writing-mode: vertical-rl), inline-size maps to height. Using inline-size future-proofs your layout for vertical writing mode support without rewriting CSS.',
    faq3q: 'Can I use logical properties in Tailwind CSS?',
    faq3a: 'Yes! Tailwind CSS v3.3+ added logical property utilities. Use ms-* for margin-inline-start (instead of ml-*), me-* for margin-inline-end, ps-* for padding-inline-start, pe-* for padding-inline-end. Tailwind also added start/end variants for things like text-start, float-start, etc.',
    faq4q: 'How do logical properties affect flexbox and grid?',
    faq4a: 'Flexbox and CSS Grid already use logical terms: justify-content (inline axis) and align-items (block axis). When using flex/grid with logical properties, everything is consistent — margin-inline-end adds space after a flex item in the inline direction, regardless of writing mode.',
    faq5q: 'Are there any gotchas when mixing physical and logical properties?',
    faq5a: 'Yes. If you set both margin-left and margin-inline-start on the same element, the behavior depends on order. The last one wins in the same specificity. This can cause confusing conflicts during migration. Best practice: fully migrate a component\'s properties to one system rather than mixing both.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS 逻辑属性指南：内联/块级、RTL 支持和迁移',
    intro: 'CSS 逻辑属性将物理方向关键字（top、right、bottom、left）替换为适应书写模式和文本方向的逻辑等价物。不再使用 margin-left，而是使用 margin-inline-start——在从左到右和从右到左的布局中，它会自动变成正确的方向。这使构建真正国际化的用户界面变得简单得多。',
    conceptTitle: '物理 vs 逻辑：核心概念',
    conceptDesc: '物理属性与屏幕坐标绑定。逻辑属性相对于文档的书写模式和文本方向。',
    axesTitle: '理解内联和块级轴',
    axesDesc: '逻辑属性使用两个轴：内联轴（文本流方向）和块级轴（块叠加方向）。在英文中，内联轴是水平的，块级轴是垂直的。在垂直的日文文本中，两者互换。',
    rtlTitle: '无需重复 CSS 的 RTL 支持',
    rtlDesc: '逻辑属性的杀手级用例：编写一套适用于从左到右（英语、法语）和从右到左（阿拉伯语、希伯来语）布局的 CSS，无需任何方向特定的覆盖。',
    bordersTitle: '边框和圆角',
    bordersDesc: '所有边框属性都有逻辑等价物，包括有些冗长的 border-radius 逻辑属性。',
    migrationTitle: '迁移指南',
    migrationDesc: '如何系统地将现有代码库从物理属性转换为逻辑属性。',
    comparisonTitle: '完整属性映射参考',
    browserSupportTitle: '浏览器支持（2026年）',
    supportDesc: '所有 CSS 逻辑属性在 2026 年都有完整的浏览器支持。基本属性（margin-block、margin-inline、padding-block、padding-inline）自 Chrome 87、Firefox 66 和 Safari 14.1 起就已支持。只有 border-radius 逻辑变体（border-start-start-radius 等）需要 Safari 15+ 才能完全支持。',
    faqTitle: '常见问题',
    faq1q: '我应该将所有物理属性迁移到逻辑属性吗？',
    faq1a: '不一定。对于真正的物理属性（如 border-radius 或明确的宽度约束），物理属性是可以的。当属性与文本流方向相关时，逻辑属性才能发挥优势。优先考虑：flex/grid 项目上的 margin/padding、border-start/end 强调和文本容器上的 inline-size/block-size。',
    faq2q: 'inline-size 和 width 有什么区别？',
    faq2a: '在水平书写模式（默认）中，inline-size 等同于 width。在垂直书写模式（writing-mode: vertical-rl）中，inline-size 映射到 height。使用 inline-size 为垂直书写模式支持提供前瞻性布局，无需重写 CSS。',
    faq3q: '我可以在 Tailwind CSS 中使用逻辑属性吗？',
    faq3a: '可以！Tailwind CSS v3.3+ 添加了逻辑属性实用类。使用 ms-* 表示 margin-inline-start（而不是 ml-*），me-* 表示 margin-inline-end，ps-* 表示 padding-inline-start，pe-* 表示 padding-inline-end。Tailwind 还为 text-start、float-start 等添加了 start/end 变体。',
    faq4q: '逻辑属性如何影响 flexbox 和 grid？',
    faq4a: 'Flexbox 和 CSS Grid 已经使用逻辑术语：justify-content（内联轴）和 align-items（块级轴）。在使用逻辑属性的 flex/grid 时，一切都是一致的——margin-inline-end 在内联方向上为 flex 项目添加间距，无论书写模式如何。',
    faq5q: '混合使用物理和逻辑属性有什么陷阱吗？',
    faq5a: '有。如果在同一元素上同时设置 margin-left 和 margin-inline-start，行为取决于顺序。在相同特异性下，后者优先。这在迁移期间可能导致令人困惑的冲突。最佳实践：将组件的属性完全迁移到一个系统，而不是混合使用两者。',
    relatedTitle: '相关工具',
  },
};

export default function CssLogicalPropertiesGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const mappingRows = [
    { physical: 'margin-top', logical: 'margin-block-start', shorthand: 'margin-block (first value)' },
    { physical: 'margin-bottom', logical: 'margin-block-end', shorthand: 'margin-block (second value)' },
    { physical: 'margin-left', logical: 'margin-inline-start', shorthand: 'margin-inline (first value)' },
    { physical: 'margin-right', logical: 'margin-inline-end', shorthand: 'margin-inline (second value)' },
    { physical: 'padding-top', logical: 'padding-block-start', shorthand: 'padding-block' },
    { physical: 'padding-bottom', logical: 'padding-block-end', shorthand: 'padding-block' },
    { physical: 'padding-left', logical: 'padding-inline-start', shorthand: 'padding-inline' },
    { physical: 'padding-right', logical: 'padding-inline-end', shorthand: 'padding-inline' },
    { physical: 'width', logical: 'inline-size', shorthand: '-' },
    { physical: 'height', logical: 'block-size', shorthand: '-' },
    { physical: 'min-width', logical: 'min-inline-size', shorthand: '-' },
    { physical: 'max-width', logical: 'max-inline-size', shorthand: '-' },
    { physical: 'top', logical: 'inset-block-start', shorthand: 'inset' },
    { physical: 'bottom', logical: 'inset-block-end', shorthand: 'inset' },
    { physical: 'left', logical: 'inset-inline-start', shorthand: 'inset' },
    { physical: 'right', logical: 'inset-inline-end', shorthand: 'inset' },
    { physical: 'border-top', logical: 'border-block-start', shorthand: 'border-block' },
    { physical: 'border-left', logical: 'border-inline-start', shorthand: 'border-inline' },
    { physical: 'border-top-left-radius', logical: 'border-start-start-radius', shorthand: '-' },
    { physical: 'border-top-right-radius', logical: 'border-start-end-radius', shorthand: '-' },
    { physical: 'text-align: left', logical: 'text-align: start', shorthand: '-' },
    { physical: 'float: left', logical: 'float: inline-start', shorthand: '-' },
    { physical: 'resize: vertical', logical: 'resize: block', shorthand: '-' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.conceptTitle}</h2>
      <p>{t.conceptDesc}</p>
      <pre style={preStyle}><code>{codeBasicMappings}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.axesTitle}</h2>
      <p>{t.axesDesc}</p>
      <pre style={preStyle}><code>{codeInlineBlock}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.rtlTitle}</h2>
      <p>{t.rtlDesc}</p>
      <pre style={preStyle}><code>{codeRTLSupport}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bordersTitle}</h2>
      <p>{t.bordersDesc}</p>
      <pre style={preStyle}><code>{codeBorders}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.migrationTitle}</h2>
      <p>{t.migrationDesc}</p>
      <pre style={preStyle}><code>{codeMigration}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Physical Property</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Logical Equivalent</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Shorthand</th>
            </tr>
          </thead>
          <tbody>
            {mappingRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem', color: '#c53030' }}>{row.physical}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem', color: '#276749' }}>{row.logical}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem', color: '#6c757d' }}>{row.shorthand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.browserSupportTitle}</h2>
      <p>{t.supportDesc}</p>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #805ad5' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/css-flexbox-generator" style={{ color: '#3182ce' }}>CSS Flexbox Generator</a></li>
          <li><a href="/en/tools/css-grid-generator" style={{ color: '#3182ce' }}>CSS Grid Generator</a></li>
          <li><a href="/en/tools/css-to-tailwind" style={{ color: '#3182ce' }}>CSS to Tailwind Converter</a></li>
        </ul>
      </div>
    </article>
  );
}
