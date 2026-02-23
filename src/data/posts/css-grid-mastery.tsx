'use client';
import React from 'react';

const codeGridBasics = `/* CSS Grid fundamentals */
.grid-container {
    display: grid;

    /* Define columns */
    grid-template-columns: 200px 1fr 1fr;        /* fixed + flexible */
    grid-template-columns: repeat(3, 1fr);        /* 3 equal columns */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* responsive */

    /* Define rows */
    grid-template-rows: auto 1fr auto;            /* header, content, footer */

    /* Gaps */
    gap: 1rem;            /* both row and column gap */
    row-gap: 0.5rem;
    column-gap: 1.5rem;

    /* Alignment */
    justify-items: stretch;   /* horizontal alignment of cells */
    align-items: start;       /* vertical alignment of cells */
    justify-content: center;  /* horizontal alignment of the grid */
    align-content: center;    /* vertical alignment of the grid */
}

/* Place items */
.item {
    grid-column: 1 / 3;      /* span from column 1 to 3 */
    grid-row: 1 / 2;
    grid-column: span 2;      /* span 2 columns */
    grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}`;

const codeTemplateAreas = `/* grid-template-areas: name regions visually */
.page-layout {
    display: grid;
    grid-template-areas:
        "header  header  header"
        "sidebar main    main"
        "sidebar aside   aside"
        "footer  footer  footer";
    grid-template-columns: 250px 1fr 300px;
    grid-template-rows: 60px 1fr auto 80px;
    min-height: 100vh;
    gap: 1rem;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }

/* Responsive: stack on mobile */
@media (max-width: 768px) {
    .page-layout {
        grid-template-areas:
            "header"
            "main"
            "aside"
            "sidebar"
            "footer";
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
}`;

const codeAutoFill = `/* auto-fill vs auto-fit — the most important Grid distinction */

/* auto-fill: creates as many columns as possible, even if empty */
.gallery-fill {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}
/* Result: always fills the row with tracks, even with empty ones */

/* auto-fit: collapses empty tracks, stretches filled items */
.gallery-fit {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}
/* Result: items expand to fill available space */

/* Practical: responsive card grid (no media queries!) */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    gap: 1.5rem;
}
/* min(300px, 100%) prevents overflow on very small screens */`;

const codeMinmax = `/* minmax() — set minimum and maximum track size */

/* Card layout: minimum 250px, maximum 1fr */
.cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
}

/* Intrinsic sizing with min-content / max-content */
.table-grid {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    /* First and last columns size to content, middle fills rest */
}

/* fit-content() — like minmax(auto, max-content) but capped */
.nav {
    display: grid;
    grid-template-columns: fit-content(200px) 1fr fit-content(200px);
}

/* Dense packing: fill holes left by spanning items */
.masonry-like {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-auto-rows: 150px;
    grid-auto-flow: dense; /* fills gaps automatically */
}

.tall-item {
    grid-row: span 2; /* takes 2 rows */
}
.wide-item {
    grid-column: span 2; /* takes 2 columns */
}`;

const codeSubgrid = `/* Subgrid — CSS Grid Level 2, fully supported in 2026 */
/* Allows nested grids to align to parent grid lines */

/* The problem subgrid solves: */
.card-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

/* Without subgrid: each card's internal layout is independent */
/* Card titles and content don't align across cards */

/* With subgrid: */
.card {
    display: grid;
    grid-row: span 3; /* card spans 3 implicit rows */
    grid-template-rows: subgrid; /* inherits parent row tracks */
}
/* Now all cards share the same row grid — titles align! */

.card .card-header { grid-row: 1; }
.card .card-body   { grid-row: 2; }
.card .card-footer { grid-row: 3; }

/* Subgrid for columns too */
.sidebar-layout {
    display: grid;
    grid-template-columns: 1fr 3fr;
}

.main-content {
    display: grid;
    grid-column: 2;
    grid-template-columns: subgrid; /* aligns to parent columns */
}

/* Browser support: Chrome 117+, Firefox 71+, Safari 16+ — all major browsers */`;

const codeGridAnimation = `/* Grid transitions and animation */

/* Animate grid column width on hover */
.sidebar-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    transition: grid-template-columns 0.3s ease;
}

.sidebar-layout:has(.sidebar:hover) {
    grid-template-columns: 350px 1fr; /* expand on hover */
}

/* CSS-only accordion with Grid */
.accordion-item {
    display: grid;
    grid-template-rows: auto 0fr; /* collapsed: 0 fraction */
    transition: grid-template-rows 0.3s ease;
    overflow: hidden;
}

.accordion-item.open {
    grid-template-rows: auto 1fr; /* expanded: 1 fraction */
}

.accordion-content {
    min-height: 0; /* required for 0fr to work */
}`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Grid Mastery: Template Areas, Auto-Fill, and Subgrid',
    intro: 'CSS Grid is the most powerful layout system ever added to CSS. While Flexbox handles one-dimensional layouts (rows OR columns), Grid handles two-dimensional layouts (rows AND columns simultaneously). In 2026, Grid Level 2 features like subgrid are fully supported across all major browsers, unlocking alignment patterns previously impossible in CSS.',
    basicsTitle: 'Grid Basics: Columns, Rows, and Placement',
    basicsDesc: 'Grid creates a two-dimensional coordinate system. Items are placed by specifying their position in the grid using line numbers, span values, or named areas.',
    areasTitle: 'grid-template-areas: Visual Layout Definition',
    areasDesc: 'grid-template-areas lets you define the layout visually using ASCII art. Each string represents a row; repeated names create spanning areas. A dot (.) creates an empty cell.',
    autoFillTitle: 'auto-fill vs auto-fit: Responsive Without Media Queries',
    autoFillDesc: 'auto-fill and auto-fit with minmax() create responsive grids without any media queries. The difference: auto-fill preserves empty tracks; auto-fit collapses them.',
    minmaxTitle: 'minmax() and Intrinsic Sizing',
    minmaxDesc: 'minmax(min, max) sets the minimum and maximum size of a grid track. Combined with auto-fill and min(), it creates layouts that adapt naturally to any content and viewport.',
    subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)',
    subgridDesc: 'Subgrid allows a nested grid to participate in the parent grid\'s track definition. This solves the "card alignment" problem where content inside separate cards couldn\'t align across cards.',
    animTitle: 'Grid Animations and Transitions',
    animDesc: 'Modern browsers support transitioning grid-template-columns and grid-template-rows. This enables smooth sidebar expansions and CSS-only accordion animations.',
    comparisonTitle: 'CSS Grid vs Flexbox: When to Use Which',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Use Grid for page-level layouts (header/sidebar/main/footer). Use Flexbox for component-level layouts (navigation items, button groups, card content).',
    bp2: 'Prefer repeat(auto-fill, minmax()) over fixed column counts for responsive card grids — eliminates most breakpoints.',
    bp3: 'Name your grid areas with grid-template-areas for complex layouts. Names serve as self-documenting CSS.',
    bp4: 'Use subgrid whenever you need items in separate grid children to align — card footers, table cells, price rows.',
    bp5: 'gap is now universally supported (replacing grid-gap). Use it instead of margins for grid spacing.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'When should I use CSS Grid vs Flexbox?',
    faq1a: 'CSS Grid excels at two-dimensional layouts where you control both rows and columns. Flexbox is better for one-dimensional layouts: a row of navigation links, a vertical stack of items, or content within a card. Many designs use Grid for the macro layout and Flexbox for components within grid cells.',
    faq2q: 'What is the difference between grid-template-columns and grid-auto-columns?',
    faq2a: 'grid-template-columns defines explicit columns you specify upfront. grid-auto-columns sets the size of implicitly created columns (when items overflow the defined grid). Similarly, grid-template-rows vs grid-auto-rows handles explicit vs implicit rows.',
    faq3q: 'How does subgrid differ from nested grid?',
    faq3a: 'A nested grid creates its own independent grid coordinate system. Subgrid inherits the parent\'s track definitions, so child items align to the parent grid\'s lines. This is crucial for multi-column card layouts where titles, content, and footers need to align across separate cards.',
    faq4q: 'What does grid-auto-flow: dense do?',
    faq4a: 'By default, Grid places items in order, leaving holes when a large item can\'t fit. grid-auto-flow: dense makes the browser try to fill those holes with later items. This is useful for image galleries with items of varying sizes, creating a tighter masonry-like layout.',
    faq5q: 'Can I mix Grid and Flexbox?',
    faq5a: 'Absolutely. Grid and Flexbox work at different levels. A typical pattern: CSS Grid for the page layout (header, sidebar, main), Flexbox for the header navigation (logo + links + CTA), and Grid again for a card section inside main. Mixing them is normal and encouraged.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS Grid 精通：模板区域、自动填充和子网格',
    intro: 'CSS Grid 是 CSS 中有史以来最强大的布局系统。虽然 Flexbox 处理一维布局（行或列），Grid 同时处理二维布局（行和列）。2026 年，Grid Level 2 的子网格功能已在所有主流浏览器中完全支持。',
    basicsTitle: 'Grid 基础：列、行和放置',
    basicsDesc: 'Grid 创建一个二维坐标系。通过使用行号、跨度值或命名区域来指定项目在网格中的位置来放置项目。',
    areasTitle: 'grid-template-areas：可视化布局定义',
    areasDesc: 'grid-template-areas 允许使用 ASCII 艺术可视化地定义布局。每个字符串代表一行；重复的名称创建跨区域。点（.）创建空单元格。',
    autoFillTitle: 'auto-fill vs auto-fit：无媒体查询的响应式布局',
    autoFillDesc: 'auto-fill 和 auto-fit 配合 minmax() 可以在没有任何媒体查询的情况下创建响应式网格。区别：auto-fill 保留空轨道；auto-fit 折叠它们。',
    minmaxTitle: 'minmax() 和内在大小调整',
    minmaxDesc: 'minmax(min, max) 设置网格轨道的最小和最大尺寸。结合 auto-fill 和 min()，创建能自然适应任何内容和视口的布局。',
    subgridTitle: '子网格：CSS Grid Level 2（2026）',
    subgridDesc: '子网格允许嵌套网格参与父网格的轨道定义。这解决了"卡片对齐"问题——单独卡片内的内容无法跨卡片对齐。',
    animTitle: 'Grid 动画和过渡',
    animDesc: '现代浏览器支持对 grid-template-columns 和 grid-template-rows 进行过渡。这实现了侧边栏平滑展开和纯 CSS 手风琴动画。',
    comparisonTitle: 'CSS Grid vs Flexbox：何时使用哪个',
    bestPracticesTitle: '最佳实践',
    bp1: '使用 Grid 进行页面级布局（header/sidebar/main/footer）。使用 Flexbox 进行组件级布局（导航项、按钮组、卡片内容）。',
    bp2: '对于响应式卡片网格，优先使用 repeat(auto-fill, minmax()) 而不是固定列数——可以消除大多数断点。',
    bp3: '对复杂布局使用 grid-template-areas 命名网格区域。名称作为自文档化的 CSS。',
    bp4: '当需要独立网格子元素中的项目对齐时使用子网格——卡片页脚、表格单元格、价格行。',
    bp5: 'gap 现在通用支持（替代 grid-gap）。使用它而不是 margins 来设置网格间距。',
    faqTitle: '常见问题',
    faq1q: '什么时候应该使用 CSS Grid vs Flexbox？',
    faq1a: 'CSS Grid 擅长控制行和列的二维布局。Flexbox 更适合一维布局：一排导航链接、项目的垂直堆叠或卡片中的内容。许多设计将 Grid 用于宏观布局，将 Flexbox 用于网格单元格内的组件。',
    faq2q: 'grid-template-columns 和 grid-auto-columns 有什么区别？',
    faq2a: 'grid-template-columns 定义你预先指定的显式列。grid-auto-columns 设置隐式创建的列的大小（当项目溢出定义的网格时）。',
    faq3q: '子网格与嵌套网格有何不同？',
    faq3a: '嵌套网格创建自己独立的网格坐标系。子网格继承父级的轨道定义，所以子项目与父网格的线对齐。这对于多列卡片布局至关重要。',
    faq4q: 'grid-auto-flow: dense 有什么作用？',
    faq4a: '默认情况下，当大项目无法放入时，Grid 按顺序放置项目，留下空洞。grid-auto-flow: dense 让浏览器尝试用后面的项目填充这些空洞。',
    faq5q: '我可以混用 Grid 和 Flexbox 吗？',
    faq5a: '当然可以。Grid 和 Flexbox 在不同层次工作。典型模式：CSS Grid 用于页面布局，Flexbox 用于标题导航。混合使用是正常且被鼓励的。',
    relatedTitle: '相关工具',
  },
  fr: { title: 'Maîtrise de CSS Grid : zones de template, auto-fill et subgrid', intro: 'CSS Grid est le système de mise en page le plus puissant jamais ajouté au CSS. En 2026, les fonctionnalités Grid Level 2 comme subgrid sont entièrement prises en charge.', basicsTitle: 'Bases de Grid : colonnes, lignes et placement', basicsDesc: 'Grid crée un système de coordonnées bidimensionnel.', areasTitle: 'grid-template-areas : définition visuelle de la mise en page', areasDesc: 'grid-template-areas permet de définir la mise en page visuellement en ASCII.', autoFillTitle: 'auto-fill vs auto-fit : responsive sans media queries', autoFillDesc: 'auto-fill et auto-fit avec minmax() créent des grilles responsive sans media queries.', minmaxTitle: 'minmax() et dimensionnement intrinsèque', minmaxDesc: 'minmax(min, max) définit les tailles minimale et maximale d\'une piste de grille.', subgridTitle: 'Subgrid : CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid permet à une grille imbriquée de participer à la définition des pistes de la grille parente.', animTitle: 'Animations et transitions Grid', animDesc: 'Les navigateurs modernes supportent la transition de grid-template-columns et grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox : quand utiliser quoi', bestPracticesTitle: 'Bonnes pratiques', bp1: 'Grid pour les mises en page globales, Flexbox pour les composants.', bp2: 'Préférer repeat(auto-fill, minmax()) pour les grilles de cartes responsive.', bp3: 'Nommer les zones avec grid-template-areas pour les mises en page complexes.', bp4: 'Utiliser subgrid pour aligner les contenus dans des éléments grid séparés.', bp5: 'Utiliser gap au lieu de margins pour l\'espacement.', faqTitle: 'FAQ', faq1q: 'Grid vs Flexbox ?', faq1a: 'Grid excelle pour les mises en page 2D, Flexbox pour les layouts 1D.', faq2q: 'grid-template-columns vs grid-auto-columns ?', faq2a: 'grid-template-columns définit les colonnes explicites, grid-auto-columns les colonnes implicites.', faq3q: 'Subgrid vs grille imbriquée ?', faq3a: 'Subgrid hérite des définitions de pistes du parent, permettant l\'alignement.', faq4q: 'grid-auto-flow: dense ?', faq4a: 'Remplit les trous laissés par les éléments en sautant.', faq5q: 'Peut-on mélanger Grid et Flexbox ?', faq5a: 'Absolument. Ils fonctionnent à différents niveaux et se complètent.', relatedTitle: 'Outils associés' },
  de: { title: 'CSS Grid Meisterschaft: Template-Areas, Auto-Fill und Subgrid', intro: 'CSS Grid ist das mächtigste Layout-System, das jemals zu CSS hinzugefügt wurde. In 2026 werden Grid Level 2 Features wie Subgrid vollständig unterstützt.', basicsTitle: 'Grid-Grundlagen: Spalten, Zeilen und Platzierung', basicsDesc: 'Grid erstellt ein zweidimensionales Koordinatensystem.', areasTitle: 'grid-template-areas: Visuelle Layout-Definition', areasDesc: 'grid-template-areas ermöglicht die visuelle Definition des Layouts mit ASCII.', autoFillTitle: 'auto-fill vs auto-fit: Responsive ohne Media Queries', autoFillDesc: 'auto-fill und auto-fit mit minmax() erstellen responsive Grids ohne Media Queries.', minmaxTitle: 'minmax() und intrinsische Größen', minmaxDesc: 'minmax(min, max) setzt Mindest- und Höchstgröße eines Grid-Tracks.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid ermöglicht verschachtelten Grids, an den Track-Definitionen des Eltern-Grids teilzunehmen.', animTitle: 'Grid-Animationen und Übergänge', animDesc: 'Moderne Browser unterstützen Übergänge für grid-template-columns und grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: Wann was verwenden', bestPracticesTitle: 'Best Practices', bp1: 'Grid für Seitenlayouts, Flexbox für Komponenten.', bp2: 'repeat(auto-fill, minmax()) für responsive Karten-Grids bevorzugen.', bp3: 'Zonen mit grid-template-areas für komplexe Layouts benennen.', bp4: 'Subgrid für Ausrichtung in separaten Grid-Elementen verwenden.', bp5: 'gap statt Margins für Grid-Abstände verwenden.', faqTitle: 'Häufige Fragen', faq1q: 'Grid vs Flexbox?', faq1a: 'Grid für 2D-Layouts, Flexbox für 1D-Layouts.', faq2q: 'grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns definiert explizite Spalten, grid-auto-columns implizite.', faq3q: 'Subgrid vs verschachteltes Grid?', faq3a: 'Subgrid erbt Track-Definitionen vom Elternteil, ermöglicht Ausrichtung.', faq4q: 'grid-auto-flow: dense?', faq4a: 'Füllt Lücken, die von überspringenden Elementen hinterlassen werden.', faq5q: 'Grid und Flexbox mischen?', faq5a: 'Absolut. Sie arbeiten auf verschiedenen Ebenen und ergänzen sich.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Dominio de CSS Grid: áreas de plantilla, auto-fill y subgrid', intro: 'CSS Grid es el sistema de diseño más poderoso jamás añadido a CSS. En 2026, las características de Grid Level 2 como subgrid están totalmente soportadas.', basicsTitle: 'Conceptos básicos de Grid: columnas, filas y colocación', basicsDesc: 'Grid crea un sistema de coordenadas bidimensional.', areasTitle: 'grid-template-areas: definición visual del diseño', areasDesc: 'grid-template-areas permite definir el diseño visualmente en ASCII.', autoFillTitle: 'auto-fill vs auto-fit: responsive sin media queries', autoFillDesc: 'auto-fill y auto-fit con minmax() crean cuadrículas responsivas sin media queries.', minmaxTitle: 'minmax() y dimensionamiento intrínseco', minmaxDesc: 'minmax(min, max) establece los tamaños mínimo y máximo de una pista de cuadrícula.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid permite a una cuadrícula anidada participar en la definición de pistas de la cuadrícula padre.', animTitle: 'Animaciones y transiciones de Grid', animDesc: 'Los navegadores modernos soportan transiciones para grid-template-columns y grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: cuándo usar cuál', bestPracticesTitle: 'Mejores prácticas', bp1: 'Grid para diseños de página, Flexbox para componentes.', bp2: 'Preferir repeat(auto-fill, minmax()) para cuadrículas de tarjetas responsivas.', bp3: 'Nombrar zonas con grid-template-areas para diseños complejos.', bp4: 'Usar subgrid para alinear contenido en elementos de cuadrícula separados.', bp5: 'Usar gap en lugar de márgenes para espaciado.', faqTitle: 'FAQ', faq1q: '¿Grid vs Flexbox?', faq1a: 'Grid para diseños 2D, Flexbox para diseños 1D.', faq2q: '¿grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns define columnas explícitas, grid-auto-columns las implícitas.', faq3q: '¿Subgrid vs cuadrícula anidada?', faq3a: 'Subgrid hereda las definiciones de pista del padre, permitiendo alineación.', faq4q: '¿grid-auto-flow: dense?', faq4a: 'Rellena huecos dejados por elementos que los saltan.', faq5q: '¿Se pueden mezclar Grid y Flexbox?', faq5a: 'Absolutamente. Funcionan en diferentes niveles y se complementan.', relatedTitle: 'Herramientas relacionadas' },
  ja: { title: 'CSSグリッド完全習得：テンプレートエリア、オートフィル、サブグリッド', intro: 'CSSグリッドはCSSに追加された最強のレイアウトシステムです。2026年、サブグリッドなどGrid Level 2機能がすべての主要ブラウザで完全サポートされました。', basicsTitle: 'グリッドの基本：列、行、配置', basicsDesc: 'グリッドは2次元座標系を作成します。', areasTitle: 'grid-template-areas：視覚的なレイアウト定義', areasDesc: 'grid-template-areasを使ってASCIIアートで視覚的にレイアウトを定義できます。', autoFillTitle: 'auto-fill vs auto-fit：メディアクエリなしのレスポンシブ', autoFillDesc: 'auto-fillとauto-fitをminmax()と組み合わせると、メディアクエリなしでレスポンシブグリッドが作成できます。', minmaxTitle: 'minmax()と組み込みサイジング', minmaxDesc: 'minmax(min, max)はグリッドトラックの最小・最大サイズを設定します。', subgridTitle: 'サブグリッド：CSS Grid Level 2（2026）', subgridDesc: 'サブグリッドはネストされたグリッドが親グリッドのトラック定義に参加できるようにします。', animTitle: 'グリッドアニメーションとトランジション', animDesc: '最新ブラウザはgrid-template-columnsとgrid-template-rowsのトランジションをサポートします。', comparisonTitle: 'CSS Grid vs Flexbox：いつどちらを使うか', bestPracticesTitle: 'ベストプラクティス', bp1: 'ページレベルにはGrid、コンポーネントレベルにはFlexbox。', bp2: 'レスポンシブカードグリッドにはrepeat(auto-fill, minmax())を使用。', bp3: '複雑なレイアウトにはgrid-template-areasで領域に名前を付ける。', bp4: '別々のグリッドアイテム内のコンテンツを揃えるにはサブグリッドを使用。', bp5: 'グリッドの間隔にはmarginの代わりにgapを使用。', faqTitle: 'よくある質問', faq1q: 'GridかFlexboxか？', faq1a: 'Gridは行と列を制御する2次元レイアウトに優れています。Flexboxは1次元レイアウトに適しています。', faq2q: 'grid-template-columnsとgrid-auto-columnsの違いは？', faq2a: 'grid-template-columnsは明示的な列を定義し、grid-auto-columnsは暗黙的な列のサイズを設定します。', faq3q: 'サブグリッドとネストされたグリッドの違いは？', faq3a: 'サブグリッドは親のトラック定義を継承し、子アイテムが親グリッドの線に揃います。', faq4q: 'grid-auto-flow: denseとは？', faq4a: 'スキップされたアイテムが残した穴を埋めようとします。', faq5q: 'GridとFlexboxは混在できますか？', faq5a: 'もちろん。両者は異なるレベルで機能し、補完し合います。', relatedTitle: '関連ツール' },
  ko: { title: 'CSS Grid 완전 정복: 템플릿 영역, Auto-Fill, Subgrid', intro: 'CSS Grid는 CSS에 추가된 가장 강력한 레이아웃 시스템입니다. 2026년에 Subgrid 등 Grid Level 2 기능이 모든 주요 브라우저에서 완전히 지원됩니다.', basicsTitle: 'Grid 기본: 열, 행, 배치', basicsDesc: 'Grid는 2차원 좌표 시스템을 생성합니다.', areasTitle: 'grid-template-areas: 시각적 레이아웃 정의', areasDesc: 'grid-template-areas를 사용하여 ASCII로 레이아웃을 시각적으로 정의할 수 있습니다.', autoFillTitle: 'auto-fill vs auto-fit: 미디어 쿼리 없는 반응형', autoFillDesc: 'minmax()와 함께 auto-fill과 auto-fit을 사용하면 미디어 쿼리 없이 반응형 그리드를 만들 수 있습니다.', minmaxTitle: 'minmax()와 내재적 크기 조정', minmaxDesc: 'minmax(min, max)는 그리드 트랙의 최소 및 최대 크기를 설정합니다.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid는 중첩된 그리드가 부모 그리드의 트랙 정의에 참여할 수 있게 합니다.', animTitle: 'Grid 애니메이션과 트랜지션', animDesc: '최신 브라우저는 grid-template-columns와 grid-template-rows의 트랜지션을 지원합니다.', comparisonTitle: 'CSS Grid vs Flexbox: 언제 무엇을 사용할까', bestPracticesTitle: '모범 사례', bp1: '페이지 레이아웃에는 Grid, 컴포넌트에는 Flexbox를 사용하세요.', bp2: '반응형 카드 그리드에는 repeat(auto-fill, minmax())를 선호하세요.', bp3: '복잡한 레이아웃에는 grid-template-areas로 영역에 이름을 붙이세요.', bp4: '별도의 그리드 항목 내 콘텐츠 정렬에는 Subgrid를 사용하세요.', bp5: '그리드 간격에는 margin 대신 gap을 사용하세요.', faqTitle: '자주 묻는 질문', faq1q: 'Grid와 Flexbox 중 언제 무엇을 사용해야 하나요?', faq1a: 'CSS Grid는 행과 열을 모두 제어하는 2차원 레이아웃에 뛰어납니다. Flexbox는 1차원 레이아웃에 더 적합합니다.', faq2q: 'grid-template-columns와 grid-auto-columns의 차이는?', faq2a: 'grid-template-columns는 명시적 열을 정의하고, grid-auto-columns는 암묵적으로 생성된 열의 크기를 설정합니다.', faq3q: 'Subgrid와 중첩 그리드의 차이는?', faq3a: 'Subgrid는 부모의 트랙 정의를 상속하여 자식 항목이 부모 그리드 선에 정렬됩니다.', faq4q: 'grid-auto-flow: dense는 무엇인가요?', faq4a: '순서를 건너뛴 항목이 남긴 구멍을 채우려고 시도합니다.', faq5q: 'Grid와 Flexbox를 혼합할 수 있나요?', faq5a: '물론입니다. 둘은 다른 레벨에서 작동하며 서로 보완합니다.', relatedTitle: '관련 도구' },
  pt: { title: 'Domínio do CSS Grid: áreas de template, auto-fill e subgrid', intro: 'CSS Grid é o sistema de layout mais poderoso já adicionado ao CSS. Em 2026, recursos do Grid Level 2 como subgrid são totalmente suportados.', basicsTitle: 'Básico do Grid: colunas, linhas e posicionamento', basicsDesc: 'Grid cria um sistema de coordenadas bidimensional.', areasTitle: 'grid-template-areas: definição visual do layout', areasDesc: 'grid-template-areas permite definir o layout visualmente em ASCII.', autoFillTitle: 'auto-fill vs auto-fit: responsivo sem media queries', autoFillDesc: 'auto-fill e auto-fit com minmax() criam grids responsivos sem media queries.', minmaxTitle: 'minmax() e dimensionamento intrínseco', minmaxDesc: 'minmax(min, max) define os tamanhos mínimo e máximo de uma faixa de grid.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid permite que um grid aninhado participe da definição de faixas do grid pai.', animTitle: 'Animações e transições do Grid', animDesc: 'Navegadores modernos suportam transições para grid-template-columns e grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: quando usar qual', bestPracticesTitle: 'Boas práticas', bp1: 'Grid para layouts de página, Flexbox para componentes.', bp2: 'Preferir repeat(auto-fill, minmax()) para grids de cartões responsivos.', bp3: 'Nomear zonas com grid-template-areas para layouts complexos.', bp4: 'Usar subgrid para alinhar conteúdo em elementos de grid separados.', bp5: 'Usar gap em vez de margens para espaçamento.', faqTitle: 'Perguntas frequentes', faq1q: 'Grid vs Flexbox?', faq1a: 'CSS Grid para layouts 2D, Flexbox para layouts 1D.', faq2q: 'grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns define colunas explícitas, grid-auto-columns as implícitas.', faq3q: 'Subgrid vs grid aninhado?', faq3a: 'Subgrid herda definições de faixas do pai, permitindo alinhamento.', faq4q: 'grid-auto-flow: dense?', faq4a: 'Preenche lacunas deixadas por itens que as pulam.', faq5q: 'Posso misturar Grid e Flexbox?', faq5a: 'Absolutamente. Funcionam em níveis diferentes e se complementam.', relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Padronanza di CSS Grid: aree template, auto-fill e subgrid', intro: 'CSS Grid è il sistema di layout più potente mai aggiunto al CSS. Nel 2026, le funzionalità Grid Level 2 come subgrid sono completamente supportate.', basicsTitle: 'Basi di Grid: colonne, righe e posizionamento', basicsDesc: 'Grid crea un sistema di coordinate bidimensionale.', areasTitle: 'grid-template-areas: definizione visuale del layout', areasDesc: 'grid-template-areas permette di definire il layout visualmente in ASCII.', autoFillTitle: 'auto-fill vs auto-fit: responsive senza media query', autoFillDesc: 'auto-fill e auto-fit con minmax() creano griglie responsive senza media query.', minmaxTitle: 'minmax() e dimensionamento intrinseco', minmaxDesc: 'minmax(min, max) imposta le dimensioni minima e massima di una traccia della griglia.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid permette a una griglia annidata di partecipare alla definizione delle tracce della griglia padre.', animTitle: 'Animazioni e transizioni di Grid', animDesc: 'I browser moderni supportano le transizioni per grid-template-columns e grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: quando usare quale', bestPracticesTitle: 'Best practice', bp1: 'Grid per i layout di pagina, Flexbox per i componenti.', bp2: 'Preferire repeat(auto-fill, minmax()) per griglie di card responsive.', bp3: 'Nominare le zone con grid-template-areas per layout complessi.', bp4: 'Usare subgrid per allineare i contenuti in elementi grid separati.', bp5: 'Usare gap invece dei margini per la spaziatura.', faqTitle: 'FAQ', faq1q: 'Grid vs Flexbox?', faq1a: 'CSS Grid per i layout 2D, Flexbox per i layout 1D.', faq2q: 'grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns definisce colonne esplicite, grid-auto-columns quelle implicite.', faq3q: 'Subgrid vs griglia annidata?', faq3a: 'Subgrid eredita le definizioni di traccia dal genitore, consentendo l\'allineamento.', faq4q: 'grid-auto-flow: dense?', faq4a: 'Riempie i buchi lasciati dagli elementi che li saltano.', faq5q: 'Si possono mescolare Grid e Flexbox?', faq5a: 'Assolutamente. Funzionano a livelli diversi e si completano a vicenda.', relatedTitle: 'Strumenti correlati' },
  nl: { title: 'CSS Grid beheersing: sjabloongebieden, auto-fill en subgrid', intro: 'CSS Grid is het krachtigste lay-outsysteem dat ooit aan CSS is toegevoegd. In 2026 worden Grid Level 2 functies zoals subgrid volledig ondersteund.', basicsTitle: 'Grid-basis: kolommen, rijen en plaatsing', basicsDesc: 'Grid maakt een tweedimensionaal coördinatensysteem.', areasTitle: 'grid-template-areas: visuele lay-outdefinitie', areasDesc: 'grid-template-areas maakt het visueel definiëren van de lay-out in ASCII mogelijk.', autoFillTitle: 'auto-fill vs auto-fit: responsief zonder mediaquery\'s', autoFillDesc: 'auto-fill en auto-fit met minmax() maken responsieve grids zonder mediaquery\'s.', minmaxTitle: 'minmax() en intrinsieke grootte', minmaxDesc: 'minmax(min, max) stelt de minimale en maximale grootte van een grid-track in.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid staat geneste grids toe deel te nemen aan de track-definitie van het bovenliggende grid.', animTitle: 'Grid-animaties en overgangen', animDesc: 'Moderne browsers ondersteunen overgangen voor grid-template-columns en grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: wanneer wat gebruiken', bestPracticesTitle: 'Best practices', bp1: 'Grid voor paginalay-outs, Flexbox voor componenten.', bp2: 'repeat(auto-fill, minmax()) verkiezen voor responsieve kaartgrids.', bp3: 'Zones benoemen met grid-template-areas voor complexe lay-outs.', bp4: 'Subgrid gebruiken voor uitlijning in afzonderlijke grid-elementen.', bp5: 'gap gebruiken in plaats van marges voor grid-afstand.', faqTitle: 'Veelgestelde vragen', faq1q: 'Grid vs Flexbox?', faq1a: 'CSS Grid voor 2D-lay-outs, Flexbox voor 1D-lay-outs.', faq2q: 'grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns definieert expliciete kolommen, grid-auto-columns de impliciete.', faq3q: 'Subgrid vs genest grid?', faq3a: 'Subgrid erft track-definities van de ouder, waardoor uitlijning mogelijk is.', faq4q: 'grid-auto-flow: dense?', faq4a: 'Vult gaten in die door items worden overgeslagen.', faq5q: 'Grid en Flexbox mengen?', faq5a: 'Absoluut. Ze werken op verschillende niveaus en vullen elkaar aan.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Mistrzostwo CSS Grid: obszary szablonów, auto-fill i subgrid', intro: 'CSS Grid to najpotężniejszy system układu kiedykolwiek dodany do CSS. W 2026 funkcje Grid Level 2 jak subgrid są w pełni obsługiwane.', basicsTitle: 'Podstawy Grid: kolumny, wiersze i rozmieszczenie', basicsDesc: 'Grid tworzy dwuwymiarowy układ współrzędnych.', areasTitle: 'grid-template-areas: wizualna definicja układu', areasDesc: 'grid-template-areas pozwala na wizualne definiowanie układu w ASCII.', autoFillTitle: 'auto-fill vs auto-fit: responsywny bez media queries', autoFillDesc: 'auto-fill i auto-fit z minmax() tworzą responsywne siatki bez zapytań mediowych.', minmaxTitle: 'minmax() i rozmiary wewnętrzne', minmaxDesc: 'minmax(min, max) ustawia minimalne i maksymalne rozmiary toru siatki.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid pozwala zagnieżdżonej siatce uczestniczyć w definicji torów siatki nadrzędnej.', animTitle: 'Animacje i przejścia siatki', animDesc: 'Nowoczesne przeglądarki obsługują przejścia dla grid-template-columns i grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: kiedy co używać', bestPracticesTitle: 'Najlepsze praktyki', bp1: 'Grid dla układów stron, Flexbox dla komponentów.', bp2: 'Preferować repeat(auto-fill, minmax()) dla responsywnych siatek kart.', bp3: 'Nazywać strefy z grid-template-areas dla złożonych układów.', bp4: 'Używać subgrid do wyrównania treści w osobnych elementach siatki.', bp5: 'Używać gap zamiast marginesów do odstępów.', faqTitle: 'FAQ', faq1q: 'Grid vs Flexbox?', faq1a: 'CSS Grid dla układów 2D, Flexbox dla układów 1D.', faq2q: 'grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns definiuje kolumny explicite, grid-auto-columns implicite.', faq3q: 'Subgrid vs zagnieżdżona siatka?', faq3a: 'Subgrid dziedziczy definicje torów od rodzica, umożliwiając wyrównanie.', faq4q: 'grid-auto-flow: dense?', faq4a: 'Wypełnia luki pozostawione przez pomijające elementy.', faq5q: 'Mieszanie Grid i Flexbox?', faq5a: 'Oczywiście. Działają na różnych poziomach i uzupełniają się.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'CSS Grid-mästerskap: mallområden, auto-fill och subgrid', intro: 'CSS Grid är det kraftfullaste layoutsystemet som någonsin lagts till CSS. 2026 stöds Grid Level 2-funktioner som subgrid helt.', basicsTitle: 'Grid-grunder: kolumner, rader och placering', basicsDesc: 'Grid skapar ett tvådimensionellt koordinatsystem.', areasTitle: 'grid-template-areas: visuell layoutdefinition', areasDesc: 'grid-template-areas möjliggör visuell definition av layouten i ASCII.', autoFillTitle: 'auto-fill vs auto-fit: responsiv utan mediafrågor', autoFillDesc: 'auto-fill och auto-fit med minmax() skapar responsiva grids utan mediafrågor.', minmaxTitle: 'minmax() och intrinsisk storlek', minmaxDesc: 'minmax(min, max) anger min- och maxstorlek för ett grid-spår.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid låter kapslade grids delta i det överordnade gridets spårdefinition.', animTitle: 'Grid-animeringar och övergångar', animDesc: 'Moderna webbläsare stöder övergångar för grid-template-columns och grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: när du ska använda vad', bestPracticesTitle: 'Bästa praxis', bp1: 'Grid för sidlayouter, Flexbox för komponenter.', bp2: 'Föredra repeat(auto-fill, minmax()) för responsiva kortgrids.', bp3: 'Namnge zoner med grid-template-areas för komplexa layouter.', bp4: 'Använda subgrid för justering av innehåll i separata grid-element.', bp5: 'Använda gap istället för marginaler för grid-avstånd.', faqTitle: 'Vanliga frågor', faq1q: 'Grid vs Flexbox?', faq1a: 'CSS Grid för 2D-layouter, Flexbox för 1D-layouter.', faq2q: 'grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns definierar explicita kolumner, grid-auto-columns implicita.', faq3q: 'Subgrid vs kapslat grid?', faq3a: 'Subgrid ärver spårdefinitioner från föräldern, vilket möjliggör justering.', faq4q: 'grid-auto-flow: dense?', faq4a: 'Fyller hål som lämnas av överhoppade objekt.', faq5q: 'Blanda Grid och Flexbox?', faq5a: 'Absolut. De fungerar på olika nivåer och kompletterar varandra.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'CSS Grid-mestring: malomr\u00e5der, auto-fill og subgrid', intro: 'CSS Grid er det kraftigste layoutsystemet som noensinne er lagt til CSS. I 2026 st\u00f8ttes Grid Level 2-funksjoner som subgrid fullt ut.', basicsTitle: 'Grid-grunnleggende: kolonner, rader og plassering', basicsDesc: 'Grid oppretter et todimensjonalt koordinatsystem.', areasTitle: 'grid-template-areas: visuell layoutdefinisjon', areasDesc: 'grid-template-areas muliggj\u00f8r visuell definisjon av layouten i ASCII.', autoFillTitle: 'auto-fill vs auto-fit: responsiv uten mediasp\u00f8rringer', autoFillDesc: 'auto-fill og auto-fit med minmax() lager responsive grids uten mediasp\u00f8rringer.', minmaxTitle: 'minmax() og intrinsisk st\u00f8rrelse', minmaxDesc: 'minmax(min, max) angir minimums- og maksimumst\u00f8rrelse for et grid-spor.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid lar nestede grids delta i den overordnede gridens spordefinisjon.', animTitle: 'Grid-animasjoner og overganger', animDesc: 'Moderne nettlesere st\u00f8tter overganger for grid-template-columns og grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: n\u00e5r bruke hva', bestPracticesTitle: 'Beste praksis', bp1: 'Grid for sideoppsettet, Flexbox for komponenter.', bp2: 'Foretrekke repeat(auto-fill, minmax()) for responsive kortgrids.', bp3: 'Navngi soner med grid-template-areas for komplekse oppsett.', bp4: 'Bruke subgrid for justering av innhold i separate grid-elementer.', bp5: 'Bruke gap i stedet for marger for grid-avstand.', faqTitle: 'Ofte stilte sp\u00f8rsm\u00e5l', faq1q: 'Grid vs Flexbox?', faq1a: 'CSS Grid for 2D-oppsett, Flexbox for 1D-oppsett.', faq2q: 'grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns definerer eksplisitte kolonner, grid-auto-columns implisitte.', faq3q: 'Subgrid vs nestet grid?', faq3a: 'Subgrid arver spordefinisjoner fra forelderen, noe som muliggj\u00f8r justering.', faq4q: 'grid-auto-flow: dense?', faq4a: 'Fyller hull etterlatt av hoppende elementer.', faq5q: 'Blande Grid og Flexbox?', faq5a: 'Absolutt. De fungerer p\u00e5 forskjellige niv\u00e5er og utfyller hverandre.', relatedTitle: 'Relaterte verkt\u00f8y' },
  id: { title: 'Penguasaan CSS Grid: Area Template, Auto-Fill, dan Subgrid', intro: 'CSS Grid adalah sistem tata letak paling kuat yang pernah ditambahkan ke CSS. Di 2026, fitur Grid Level 2 seperti subgrid sepenuhnya didukung di semua browser utama.', basicsTitle: 'Dasar Grid: Kolom, Baris, dan Penempatan', basicsDesc: 'Grid membuat sistem koordinat dua dimensi.', areasTitle: 'grid-template-areas: Definisi Tata Letak Visual', areasDesc: 'grid-template-areas memungkinkan mendefinisikan tata letak secara visual dalam ASCII.', autoFillTitle: 'auto-fill vs auto-fit: Responsif Tanpa Media Queries', autoFillDesc: 'auto-fill dan auto-fit dengan minmax() membuat grid responsif tanpa media queries.', minmaxTitle: 'minmax() dan Ukuran Intrinsik', minmaxDesc: 'minmax(min, max) mengatur ukuran minimum dan maksimum dari track grid.', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid memungkinkan grid bersarang berpartisipasi dalam definisi track grid induk.', animTitle: 'Animasi dan Transisi Grid', animDesc: 'Browser modern mendukung transisi untuk grid-template-columns dan grid-template-rows.', comparisonTitle: 'CSS Grid vs Flexbox: Kapan Menggunakan Mana', bestPracticesTitle: 'Praktik Terbaik', bp1: 'Gunakan Grid untuk tata letak halaman, Flexbox untuk komponen.', bp2: 'Pilih repeat(auto-fill, minmax()) untuk grid kartu responsif.', bp3: 'Beri nama zona dengan grid-template-areas untuk tata letak kompleks.', bp4: 'Gunakan subgrid untuk menyelaraskan konten di elemen grid terpisah.', bp5: 'Gunakan gap bukan margin untuk jarak grid.', faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Grid vs Flexbox?', faq1a: 'CSS Grid untuk tata letak 2D, Flexbox untuk tata letak 1D.', faq2q: 'grid-template-columns vs grid-auto-columns?', faq2a: 'grid-template-columns mendefinisikan kolom eksplisit, grid-auto-columns kolom implisit.', faq3q: 'Subgrid vs grid bersarang?', faq3a: 'Subgrid mewarisi definisi track dari induk, memungkinkan penyelarasan.', faq4q: 'grid-auto-flow: dense?', faq4a: 'Mengisi lubang yang ditinggalkan oleh item yang melewatinya.', faq5q: 'Bisakah mencampur Grid dan Flexbox?', faq5a: 'Tentu saja. Keduanya bekerja di level berbeda dan saling melengkapi.', relatedTitle: 'Alat Terkait' },
  th: { title: 'เชี่ยวชาญ CSS Grid: Template Areas, Auto-Fill และ Subgrid', intro: 'CSS Grid คือระบบ layout ที่ทรงพลังที่สุดที่เคยเพิ่มเข้ามาใน CSS ในปี 2026 ฟีเจอร์ Grid Level 2 เช่น subgrid ได้รับการรองรับอย่างสมบูรณ์', basicsTitle: 'พื้นฐาน Grid: Columns, Rows และการวางตำแหน่ง', basicsDesc: 'Grid สร้างระบบพิกัดสองมิติ', areasTitle: 'grid-template-areas: การกำหนด Layout แบบภาพ', areasDesc: 'grid-template-areas ให้กำหนด layout แบบภาพด้วย ASCII', autoFillTitle: 'auto-fill vs auto-fit: Responsive โดยไม่ต้องใช้ Media Queries', autoFillDesc: 'auto-fill และ auto-fit กับ minmax() สร้าง grids ที่ responsive โดยไม่มี media queries', minmaxTitle: 'minmax() และการกำหนดขนาดในตัว', minmaxDesc: 'minmax(min, max) กำหนดขนาดขั้นต่ำและสูงสุดของ grid track', subgridTitle: 'Subgrid: CSS Grid Level 2 (2026)', subgridDesc: 'Subgrid ให้ grid ที่ซ้อนกันเข้าร่วมในการกำหนด track ของ grid แม่', animTitle: 'Grid Animations และ Transitions', animDesc: 'เบราว์เซอร์สมัยใหม่รองรับ transition สำหรับ grid-template-columns และ grid-template-rows', comparisonTitle: 'CSS Grid vs Flexbox: ควรใช้อะไรเมื่อไหร่', bestPracticesTitle: 'แนวปฏิบัติที่ดีที่สุด', bp1: 'ใช้ Grid สำหรับ layout ระดับหน้า Flexbox สำหรับ components', bp2: 'ใช้ repeat(auto-fill, minmax()) สำหรับ card grid แบบ responsive', bp3: 'ตั้งชื่อ zones ด้วย grid-template-areas สำหรับ layouts ที่ซับซ้อน', bp4: 'ใช้ subgrid เพื่อจัดตำแหน่งเนื้อหาใน grid elements แยกกัน', bp5: 'ใช้ gap แทน margin สำหรับระยะห่างของ grid', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'Grid กับ Flexbox ควรใช้อะไร?', faq1a: 'CSS Grid เหมาะสำหรับ layout 2D Flexbox เหมาะสำหรับ layout 1D', faq2q: 'grid-template-columns กับ grid-auto-columns ต่างกันอย่างไร?', faq2a: 'grid-template-columns กำหนด columns แบบ explicit grid-auto-columns กำหนดขนาดของ columns แบบ implicit', faq3q: 'Subgrid กับ nested grid ต่างกันอย่างไร?', faq3a: 'Subgrid สืบทอด track definitions จากแม่ ทำให้ child items จัดตำแหน่งตาม grid lines ของแม่ได้', faq4q: 'grid-auto-flow: dense คืออะไร?', faq4a: 'พยายามเติมช่องว่างที่เหลือจาก items ที่ข้ามไป', faq5q: 'สามารถผสม Grid และ Flexbox ได้ไหม?', faq5a: 'ได้แน่นอน ทั้งสองทำงานในระดับต่างกันและเสริมกัน', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function CssGridMastery({ lang }: { lang: string }) {
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

  const compRows = [
    { scenario: 'Page layout (header/footer/sidebar)', grid: 'Perfect', flex: 'Awkward' },
    { scenario: 'Navigation bar items', grid: 'Works', flex: 'Perfect' },
    { scenario: 'Card grid (equal columns)', grid: 'Perfect', flex: 'Needs JS for equal height' },
    { scenario: 'Centering content', grid: 'Easy (place-items)', flex: 'Easy (align/justify)' },
    { scenario: 'Vertical list of items', grid: 'Works', flex: 'Perfect' },
    { scenario: 'Complex form layout', grid: 'Perfect', flex: 'Complex' },
    { scenario: 'Responsive without breakpoints', grid: 'auto-fill/fit', flex: 'Limited' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.basicsTitle}</h2>
      <p>{t.basicsDesc}</p>
      <pre style={preStyle}><code>{codeGridBasics}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.areasTitle}</h2>
      <p>{t.areasDesc}</p>
      <pre style={preStyle}><code>{codeTemplateAreas}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.autoFillTitle}</h2>
      <p>{t.autoFillDesc}</p>
      <pre style={preStyle}><code>{codeAutoFill}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.minmaxTitle}</h2>
      <p>{t.minmaxDesc}</p>
      <pre style={preStyle}><code>{codeMinmax}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.subgridTitle}</h2>
      <p>{t.subgridDesc}</p>
      <pre style={preStyle}><code>{codeSubgrid}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.animTitle}</h2>
      <p>{t.animDesc}</p>
      <pre style={preStyle}><code>{codeGridAnimation}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Scenario', 'CSS Grid', 'Flexbox'].map(h => (
                <th key={h} style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.scenario}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: row.grid === 'Perfect' ? '#38a169' : undefined }}>{row.grid}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: row.flex === 'Perfect' ? '#38a169' : undefined }}>{row.flex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[[t.faq1q, t.faq1a],[t.faq2q, t.faq2a],[t.faq3q, t.faq3a],[t.faq4q, t.faq4a],[t.faq5q, t.faq5a]].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/css-minifier" style={{ color: '#3182ce' }}>CSS Minifier</a></li>
          <li><a href="/en/tools/color-converter" style={{ color: '#3182ce' }}>Color Converter</a></li>
          <li><a href="/en/tools/regex-tester" style={{ color: '#3182ce' }}>Regex Tester</a></li>
        </ul>
      </div>
    </article>
  );
}
