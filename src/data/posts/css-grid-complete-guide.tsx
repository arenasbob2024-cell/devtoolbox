'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Grid Complete Guide: Layout Mastery with Grid vs Flexbox 2026',
    intro: `CSS Grid is the most powerful layout system ever added to CSS. It enables two-dimensional layouts — controlling both rows and columns simultaneously — that were previously impossible without JavaScript. This complete CSS Grid tutorial covers everything from basic syntax to advanced grid techniques, with clear comparisons to Flexbox so you know when to use each.`,
    s1Title: 'CSS Grid Fundamentals',
    s2Title: 'Placing Items on the Grid',
    s3Title: 'Responsive Grid Layouts',
    s4Title: 'CSS Grid vs Flexbox: When to Use Each',
    s5Title: 'Advanced Grid Techniques',
    s6Title: 'Real-World Grid Patterns',
    faqTitle: 'Frequently Asked Questions',
    conclusionTitle: 'Conclusion',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'Guide complet CSS Grid', intro: 'CSS Grid est le système de mise en page le plus puissant jamais ajouté au CSS.', s1Title: 'Fondamentaux de CSS Grid', s2Title: 'Placer des éléments sur la grille', s3Title: 'Mises en page réactives avec Grid', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Techniques avancées de Grid', s6Title: 'Modèles Grid du monde réel', faqTitle: 'Questions fréquentes', conclusionTitle: 'Conclusion', relatedTitle: 'Outils associés' },
  de: { title: 'CSS Grid Komplettleitfaden', intro: 'CSS Grid ist das leistungsstärkste Layout-System, das je zu CSS hinzugefügt wurde.', s1Title: 'CSS Grid Grundlagen', s2Title: 'Elemente im Grid platzieren', s3Title: 'Responsive Grid-Layouts', s4Title: 'CSS Grid vs. Flexbox', s5Title: 'Erweiterte Grid-Techniken', s6Title: 'Real-World Grid-Muster', faqTitle: 'Häufig gestellte Fragen', conclusionTitle: 'Fazit', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Guía completa de CSS Grid', intro: 'CSS Grid es el sistema de diseño más poderoso jamás añadido a CSS.', s1Title: 'Fundamentos de CSS Grid', s2Title: 'Colocar elementos en la cuadrícula', s3Title: 'Diseños de cuadrícula responsivos', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Técnicas avanzadas de Grid', s6Title: 'Patrones Grid del mundo real', faqTitle: 'Preguntas frecuentes', conclusionTitle: 'Conclusión', relatedTitle: 'Herramientas relacionadas' },
  it: { title: 'Guida completa a CSS Grid', intro: 'CSS Grid è il sistema di layout più potente mai aggiunto ai CSS.', s1Title: 'Fondamentali di CSS Grid', s2Title: 'Posizionare elementi nella griglia', s3Title: 'Layout grid responsivi', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Tecniche avanzate di Grid', s6Title: 'Pattern Grid del mondo reale', faqTitle: 'Domande frequenti', conclusionTitle: 'Conclusione', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Guia completo de CSS Grid', intro: 'CSS Grid é o sistema de layout mais poderoso já adicionado ao CSS.', s1Title: 'Fundamentos do CSS Grid', s2Title: 'Posicionando itens na grade', s3Title: 'Layouts de grade responsivos', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Técnicas avançadas de Grid', s6Title: 'Padrões Grid do mundo real', faqTitle: 'Perguntas frequentes', conclusionTitle: 'Conclusão', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Complete CSS Grid gids', intro: 'CSS Grid is het krachtigste layoutsysteem dat ooit aan CSS is toegevoegd.', s1Title: 'CSS Grid fundamenten', s2Title: 'Items op het raster plaatsen', s3Title: 'Responsieve rasterlayouts', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Geavanceerde Grid-technieken', s6Title: 'Echte wereld Grid-patronen', faqTitle: 'Veelgestelde vragen', conclusionTitle: 'Conclusie', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Kompletny przewodnik po CSS Grid', intro: 'CSS Grid to najpotężniejszy system układu, jaki kiedykolwiek dodano do CSS.', s1Title: 'Podstawy CSS Grid', s2Title: 'Umieszczanie elementów na siatce', s3Title: 'Responsywne układy siatki', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Zaawansowane techniki Grid', s6Title: 'Wzorce Grid w prawdziwym świecie', faqTitle: 'Często zadawane pytania', conclusionTitle: 'Podsumowanie', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Komplett guide till CSS Grid', intro: 'CSS Grid är det kraftfullaste layoutsystemet som någonsin lagts till i CSS.', s1Title: 'CSS Grid grunderna', s2Title: 'Placera objekt i rutnätet', s3Title: 'Responsiva rutnätslayouter', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Avancerade Grid-tekniker', s6Title: 'Grid-mönster i verkliga projekt', faqTitle: 'Vanliga frågor', conclusionTitle: 'Slutsats', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Komplett guide til CSS Grid', intro: 'CSS Grid er det kraftigste layoutsystemet som noen gang er lagt til CSS.', s1Title: 'CSS Grid grunnleggende', s2Title: 'Plassere elementer på rutenettet', s3Title: 'Responsive rutenettlayouter', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Avanserte Grid-teknikker', s6Title: 'Grid-mønstre i virkelige prosjekter', faqTitle: 'Ofte stilte spørsmål', conclusionTitle: 'Konklusjon', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'CSS Grid 完整指南：网格布局与 Flexbox 对比 2026', intro: 'CSS Grid 是有史以来最强大的布局系统，可以同时控制行和列的二维布局。', s1Title: 'CSS Grid 基础', s2Title: '在网格上放置元素', s3Title: '响应式网格布局', s4Title: 'CSS Grid 与 Flexbox：何时使用各自', s5Title: '高级网格技术', s6Title: '实际项目中的网格模式', faqTitle: '常见问题', conclusionTitle: '总结', relatedTitle: '相关工具' },
  ja: { title: 'CSS Grid 完全ガイド', intro: 'CSS Grid は CSS に追加された最も強力なレイアウトシステムです。', s1Title: 'CSS Grid の基礎', s2Title: 'グリッド上にアイテムを配置する', s3Title: 'レスポンシブグリッドレイアウト', s4Title: 'CSS Grid vs Flexbox', s5Title: '高度なグリッドテクニック', s6Title: '実際のグリッドパターン', faqTitle: 'よくある質問', conclusionTitle: 'まとめ', relatedTitle: '関連ツール' },
  ko: { title: 'CSS Grid 완벽 가이드', intro: 'CSS Grid는 CSS에 추가된 가장 강력한 레이아웃 시스템입니다.', s1Title: 'CSS Grid 기초', s2Title: '그리드에 항목 배치하기', s3Title: '반응형 그리드 레이아웃', s4Title: 'CSS Grid vs Flexbox', s5Title: '고급 그리드 기법', s6Title: '실제 그리드 패턴', faqTitle: '자주 묻는 질문', conclusionTitle: '결론', relatedTitle: '관련 도구' },
  id: { title: 'Panduan Lengkap CSS Grid', intro: 'CSS Grid adalah sistem tata letak paling kuat yang pernah ditambahkan ke CSS.', s1Title: 'Dasar-dasar CSS Grid', s2Title: 'Menempatkan Item di Grid', s3Title: 'Layout Grid Responsif', s4Title: 'CSS Grid vs Flexbox', s5Title: 'Teknik Grid Lanjutan', s6Title: 'Pola Grid Dunia Nyata', faqTitle: 'Pertanyaan yang Sering Diajukan', conclusionTitle: 'Kesimpulan', relatedTitle: 'Alat Terkait' },
  th: { title: 'คู่มือ CSS Grid ฉบับสมบูรณ์', intro: 'CSS Grid เป็นระบบเลย์เอาต์ที่ทรงพลังที่สุดที่เคยเพิ่มเข้ามาใน CSS', s1Title: 'พื้นฐาน CSS Grid', s2Title: 'การวางรายการบน Grid', s3Title: 'เลย์เอาต์ Grid แบบ Responsive', s4Title: 'CSS Grid vs Flexbox', s5Title: 'เทคนิค Grid ขั้นสูง', s6Title: 'รูปแบบ Grid ในโลกจริง', faqTitle: 'คำถามที่พบบ่อย', conclusionTitle: 'สรุป', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function CssGridCompleteGuide({ lang = 'en' }: { lang?: string }) {
  const s = t[lang] || t['en'];

  const gridFundamentals = `.container {
  display: grid;

  /* Define columns: 3 equal columns */
  grid-template-columns: 1fr 1fr 1fr;
  /* Shorthand: repeat(3, 1fr) */

  /* Define rows: auto height or fixed */
  grid-template-rows: auto 200px auto;

  /* Gap between cells */
  gap: 16px;          /* both row and column gap */
  row-gap: 16px;      /* rows only */
  column-gap: 24px;   /* columns only */
}

/* Named template areas */
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`;

  const placingItems = `.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 100px);
}

/* Place by line numbers */
.item-a {
  grid-column: 1 / 4;     /* span columns 1 to 4 */
  grid-row: 1 / 3;        /* span rows 1 to 3 */
}

/* Using span keyword */
.item-b {
  grid-column: span 2;    /* span 2 columns */
  grid-row: span 3;       /* span 3 rows */
}

/* Shorthand: grid-area: row-start / col-start / row-end / col-end */
.item-c {
  grid-area: 2 / 3 / 4 / 6;
}

/* Alignment */
.container {
  justify-items: center;  /* align items horizontally within cell */
  align-items: center;    /* align items vertically within cell */
  justify-content: space-between; /* align grid horizontally in container */
  align-content: center;          /* align grid vertically in container */
}

/* Per-item alignment */
.item-d {
  justify-self: end;
  align-self: start;
}`;

  const responsiveGrid = `/* Responsive without media queries using auto-fill/auto-fit */
.card-grid {
  display: grid;

  /* auto-fill: creates as many columns as fit */
  /* minmax(min, max): min width 250px, max is 1fr */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

/* auto-fit vs auto-fill:
   - auto-fill: keeps empty columns (tracks exist, cells empty)
   - auto-fit: collapses empty columns (tracks collapse to 0)
   Use auto-fit when you want items to stretch to fill the row */

.stretch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* Media query approach for more control */
.responsive-layout {
  display: grid;
  grid-template-columns: 1fr;     /* mobile: 1 column */
  gap: 16px;
}

@media (min-width: 640px) {
  .responsive-layout {
    grid-template-columns: repeat(2, 1fr); /* tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .responsive-layout {
    grid-template-columns: repeat(3, 1fr); /* desktop: 3 columns */
  }
}`;

  const gridVsFlexbox = `/* Flexbox: 1-dimensional (row OR column) */
.flex-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* Perfect for: navbars, button groups, centering single items */
}

/* Grid: 2-dimensional (rows AND columns) */
.grid-dashboard {
  display: grid;
  grid-template-columns: 200px 1fr 300px;
  grid-template-rows: 60px 1fr;
  /* Perfect for: page layouts, card grids, complex UI */
}

/* When to use Flexbox:
   - Aligning items in a single row or column
   - Navigation bars
   - Centering content
   - Distributing space between items
   - Components where item count is unknown

   When to use Grid:
   - Two-dimensional page layouts
   - Card grids where alignment across rows matters
   - Complex UI with overlapping elements
   - When you need items to align to a fixed track structure
*/

/* Modern approach: use both together */
.page {
  display: grid;                          /* outer: grid layout */
  grid-template-columns: 250px 1fr;
}
.sidebar-nav {
  display: flex;                          /* inner: flex for list items */
  flex-direction: column;
  gap: 8px;
}`;

  const advancedGrid = `/* Subgrid - align nested grids to parent grid (CSS 2023+) */
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.child {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid; /* inherits parent's column tracks */
}

/* Masonry layout (experimental, Chrome 2024+) */
.masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;
}

/* Dense auto-placement to fill gaps */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-flow: dense; /* fills gaps with smaller items */
}
.large-item {
  grid-column: span 2;
  grid-row: span 2;
}

/* CSS Grid animation */
@keyframes expandCol {
  from { grid-template-columns: 0fr 1fr; }
  to   { grid-template-columns: 1fr 1fr; }
}`;

  const realWorldPatterns = `/* Holy Grail Layout */
.holy-grail {
  display: grid;
  grid-template:
    "header" 60px
    "nav main aside" 1fr
    "footer" 50px
    / 200px 1fr 200px;
  min-height: 100vh;
}

/* Magazine/Editorial Layout */
.magazine {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
.featured { grid-column: 1 / 9; }
.sidebar  { grid-column: 9 / 13; }
.wide     { grid-column: 1 / -1; } /* full width */

/* Card grid with consistent row heights */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 320px; /* fixed row height for alignment */
  gap: 20px;
}

/* Centered content with max-width */
.content-grid {
  display: grid;
  grid-template-columns:
    [full-start] minmax(16px, 1fr)
    [content-start] min(1200px, calc(100% - 32px))
    [content-end] minmax(16px, 1fr)
    [full-end];
}
.content-grid > * { grid-column: content; }
.full-bleed       { grid-column: full; }`;

  const faqs = [
    {
      q: 'What is the difference between grid-template-columns and grid-auto-columns?',
      a: 'grid-template-columns defines explicit column tracks that you set in advance. grid-auto-columns defines the size of implicitly created columns — columns that are created when items overflow the explicit grid. For example, if you have 3 template columns but 5 items, the 4th and 5th items create implicit tracks sized by grid-auto-columns.'
    },
    {
      q: 'What does the fr unit mean in CSS Grid?',
      a: 'fr stands for "fraction" and represents a fraction of the available space in the grid container. After fixed-size tracks (px, %, min-content, etc.) are measured, the remaining space is divided among fr units. 1fr 2fr gives the first column one third and the second column two thirds of available space.'
    },
    {
      q: 'When should I use auto-fill vs auto-fit in repeat()?',
      a: 'Both create as many columns as fit. The difference appears when items don\'t fill a complete row: auto-fill keeps the empty track space (items don\'t stretch beyond their defined max), while auto-fit collapses empty tracks to 0 (causing existing items to stretch and fill the full row width). Use auto-fit when you want items to fill the row; auto-fill when you want consistent column widths.'
    },
    {
      q: 'Can CSS Grid elements overlap?',
      a: 'Yes! This is one of Grid\'s superpowers. Place two items at the same grid coordinates and they will overlap. Control the stacking order with z-index. This enables pure-CSS image-text overlays, decorative layouts, and complex UI without absolute positioning.'
    },
    {
      q: 'Is CSS Grid supported in all modern browsers?',
      a: 'Yes. CSS Grid has full support across all modern browsers (Chrome, Firefox, Safari, Edge) with 97%+ global coverage. Subgrid (the ability for children to participate in the parent grid) landed in all browsers by 2023. The experimental masonry layout is still behind flags in most browsers as of 2026.'
    },
    {
      q: 'How do I center a single item both vertically and horizontally with Grid?',
      a: 'The simplest approach: set display: grid on the parent, then place: center on the child. The longhand is justify-self: center; align-self: center; on the child. Or use place-items: center on the parent to center all children. This is often simpler than the flexbox approach.'
    },
  ];

  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold mb-4">{s.title}</h1>
      <p className="text-lg text-gray-700 mb-8">{s.intro}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s1Title}</h2>
        <p className="mb-4">
          CSS Grid creates a two-dimensional grid container. You define the column and row tracks, and place items into the resulting cells. The <code>fr</code> (fraction) unit distributes remaining space proportionally.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{gridFundamentals}</code>
        </pre>
        <p>Named template areas are one of Grid's most powerful features — they make complex layouts readable and self-documenting.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s2Title}</h2>
        <p className="mb-4">
          Grid items can be precisely placed by specifying their start and end lines. Lines are numbered from 1 (or -1 from the end). The <code>span</code> keyword makes items stretch across multiple tracks.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{placingItems}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s3Title}</h2>
        <p className="mb-4">
          The killer feature of CSS Grid for responsive design is <code>repeat(auto-fill, minmax())</code>. It creates responsive columns without a single media query.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{responsiveGrid}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s4Title}</h2>
        <p className="mb-4">
          The question isn't "which is better" but "which is right for this task." Grid and Flexbox are complementary tools, and modern UIs use both together.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{gridVsFlexbox}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s5Title}</h2>
        <p className="mb-4">
          Subgrid, dense auto-placement, and masonry layouts represent the cutting edge of CSS Grid capabilities available in 2026.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{advancedGrid}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s6Title}</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{realWorldPatterns}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.faqTitle}</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.conclusionTitle}</h2>
        <p className="mb-4">
          CSS Grid has matured into an essential layout tool. The combination of explicit placement, auto-placement, named areas, and the fr unit makes it the best solution for complex two-dimensional layouts. Start with the named template areas pattern for your page structure, then use <code>repeat(auto-fill, minmax())</code> for your card grids.
        </p>
        <p>Use the CSS Formatter tool below to clean up and inspect your grid CSS as you experiment with these patterns.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">{s.relatedTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Link href="/tools/css-formatter" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">CSS Formatter</Link>
          <Link href="/tools/html-formatter" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">HTML Formatter</Link>
          <Link href="/tools/regex-tester" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Regex Tester</Link>
          <Link href="/tools/json-formatter" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Formatter</Link>
          <Link href="/tools/markdown-to-html" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Markdown to HTML</Link>
          <Link href="/tools/base64-decoder" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Base64 Decoder</Link>
        </div>
      </section>
    </article>
  );
}
