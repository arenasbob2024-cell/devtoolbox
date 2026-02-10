import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'CSS Flexbox is the most widely used layout system in modern web development. It provides a powerful, efficient way to align, distribute, and reorder elements within a container — even when their sizes are unknown or dynamic. This <strong>complete CSS Flexbox cheat sheet</strong> explains every property with practical code examples so you can master flexible layouts.',
    linkTool: 'Build flexbox layouts visually with our Flexbox Generator →',
    h2_container: 'Container Properties',
    containerDesc: 'Flexbox starts with a flex container. Set <code>display: flex</code> on a parent element and its direct children become flex items.',
    h3_display: 'display: flex | inline-flex',
    displayDesc: 'This defines a flex container. <code>flex</code> creates a block-level flex container; <code>inline-flex</code> creates an inline-level one.',
    h3_direction: 'flex-direction',
    directionDesc: 'Establishes the main axis direction. This determines how flex items are laid out in the container.',
    h3_justify: 'justify-content',
    justifyDesc: 'Controls how items are distributed along the main axis (horizontal by default).',
    h3_align_items: 'align-items',
    alignItemsDesc: 'Controls how items are aligned along the cross axis (vertical by default).',
    h3_wrap: 'flex-wrap',
    wrapDesc: 'Controls whether items are forced into a single line or can wrap to multiple lines.',
    h3_align_content: 'align-content',
    alignContentDesc: 'Controls spacing between lines when items wrap to multiple lines. Has no effect on single-line flex containers.',
    h3_gap: 'gap, row-gap, column-gap',
    gapDesc: 'Controls the spacing between flex items. Unlike margins, gaps only apply between items, not on the outer edges.',
    h2_item: 'Item Properties',
    itemDesc: 'These properties are set on individual flex items (children of the flex container) to control their sizing and positioning.',
    h3_order: 'order',
    orderDesc: 'Controls the visual order of items. Items with lower values appear first. Default is 0.',
    h3_grow: 'flex-grow',
    growDesc: 'Defines how much an item should grow relative to siblings when extra space is available. Default is 0 (do not grow).',
    h3_shrink: 'flex-shrink',
    shrinkDesc: 'Defines how much an item should shrink relative to siblings when space is insufficient. Default is 1.',
    h3_basis: 'flex-basis',
    basisDesc: 'Sets the initial main size of an item before space distribution. It can be a length, percentage, or <code>auto</code>.',
    h3_flex: 'flex (shorthand)',
    flexDesc: 'Shorthand for <code>flex-grow</code>, <code>flex-shrink</code>, and <code>flex-basis</code>. The recommended way to set flex item sizing.',
    h3_align_self: 'align-self',
    alignSelfDesc: 'Overrides the container\'s <code>align-items</code> value for a specific item.',
    h2_patterns: 'Common Layout Patterns',
    patternsDesc: 'Here are the most frequently used flexbox layout patterns you\'ll encounter in real projects.',
    h3_centering: 'Centering Elements',
    centeringDesc: 'Flexbox makes centering trivial — no more margin hacks or absolute positioning.',
    h3_navbar: 'Navigation Bar',
    navbarDesc: 'A classic responsive navbar with logo on the left and links on the right.',
    h3_cards: 'Card Grid',
    cardsDesc: 'A responsive card layout that wraps and distributes evenly.',
    h3_sticky_footer: 'Sticky Footer',
    stickyFooterDesc: 'Footer stays at the bottom of the viewport even when content is short.',
    h3_holy_grail: 'Holy Grail Layout',
    holyGrailDesc: 'The classic three-column layout with header and footer.',
    h2_vs_grid: 'Flexbox vs Grid: When to Use Each',
    vsGridDesc: 'Both Flexbox and CSS Grid are powerful layout tools, but they solve different problems.',
    flexboxBest: 'Flexbox is best for:',
    gridBest: 'CSS Grid is best for:',
    h2_browser: 'Browser Support',
    browserDesc: 'Flexbox has excellent browser support across all modern browsers.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between justify-content and align-items?',
    faq1_a: 'justify-content controls distribution along the main axis (horizontal by default with flex-direction: row), while align-items controls alignment along the cross axis (vertical by default). If you change flex-direction to column, these axes swap: justify-content becomes vertical and align-items becomes horizontal.',
    faq2_q: 'When should I use Flexbox instead of CSS Grid?',
    faq2_a: 'Use Flexbox for one-dimensional layouts (either a row OR a column), content-driven sizing, and dynamic layouts where items determine their own size. Use CSS Grid for two-dimensional layouts (rows AND columns simultaneously), layout-driven sizing, and when you need precise control over both axes at once. They can also be combined: Grid for page layout, Flexbox for component internals.',
    faq3_q: 'How do I make flex items equal width?',
    faq3_a: 'Set flex: 1 on all items. This is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%, which makes all items grow equally from a zero base. If items still have different widths, also set min-width: 0 to allow them to shrink below their content size.',
    faq4_q: 'Why is my flex item not shrinking?',
    faq4_a: 'Flex items have min-width: auto by default, which prevents them from shrinking below their minimum content size. To fix this, set min-width: 0 (or min-height: 0 for column layouts) on the item. Also check if flex-shrink is set to 0 or if the item has a fixed width that prevents shrinking.',
    faq5_q: 'Can I use gap with Flexbox?',
    faq5_a: 'Yes, the gap property works with Flexbox in all modern browsers (Chrome 84+, Firefox 63+, Safari 14.1+, Edge 84+). It is the recommended way to add spacing between flex items because, unlike margins, gap only creates space between items and not on the outer edges. You can use gap for both axes, or row-gap and column-gap individually.',
    conclusion: 'CSS Flexbox is an essential tool for modern web layouts. With these properties and patterns, you can build any UI layout efficiently. Practice with our interactive tool to reinforce your understanding.',
    linkToolBottom: 'Try our interactive Flexbox Generator to build layouts visually →',
  },
  zh: {
    intro: 'CSS Flexbox 是现代 Web 开发中使用最广泛的布局系统。它提供了一种强大、高效的方式来对齐、分布和重新排列容器内的元素 — 即使元素大小未知或动态变化。本<strong>完整 CSS Flexbox 速查表</strong>通过实际代码示例解释每个属性，帮助你掌握弹性布局。',
    linkTool: '使用我们的 Flexbox 生成器可视化构建弹性布局 →',
    h2_container: '容器属性',
    containerDesc: 'Flexbox 从弹性容器开始。在父元素上设置 <code>display: flex</code>，其直接子元素就成为弹性项目。',
    h3_display: 'display: flex | inline-flex',
    displayDesc: '定义弹性容器。<code>flex</code> 创建块级弹性容器；<code>inline-flex</code> 创建行内级弹性容器。',
    h3_direction: 'flex-direction',
    directionDesc: '设定主轴方向，决定弹性项目在容器中的排列方式。',
    h3_justify: 'justify-content',
    justifyDesc: '控制项目在主轴上的分布方式（默认为水平方向）。',
    h3_align_items: 'align-items',
    alignItemsDesc: '控制项目在交叉轴上的对齐方式（默认为垂直方向）。',
    h3_wrap: 'flex-wrap',
    wrapDesc: '控制项目是强制在单行显示还是可以换行到多行。',
    h3_align_content: 'align-content',
    alignContentDesc: '当项目换行到多行时，控制行之间的间距。对单行弹性容器无效。',
    h3_gap: 'gap, row-gap, column-gap',
    gapDesc: '控制弹性项目之间的间距。与 margin 不同，gap 仅在项目之间生效，不作用于外边缘。',
    h2_item: '项目属性',
    itemDesc: '这些属性设置在弹性项目（弹性容器的子元素）上，控制它们的尺寸和定位。',
    h3_order: 'order',
    orderDesc: '控制项目的视觉顺序。值越小越靠前。默认为 0。',
    h3_grow: 'flex-grow',
    growDesc: '定义当有多余空间时，项目相对于兄弟元素的增长比例。默认为 0（不增长）。',
    h3_shrink: 'flex-shrink',
    shrinkDesc: '定义当空间不足时，项目相对于兄弟元素的收缩比例。默认为 1。',
    h3_basis: 'flex-basis',
    basisDesc: '设置项目在空间分配前的初始主尺寸。可以是长度、百分比或 <code>auto</code>。',
    h3_flex: 'flex（简写）',
    flexDesc: '<code>flex-grow</code>、<code>flex-shrink</code> 和 <code>flex-basis</code> 的简写形式。推荐使用此方式设置弹性项目尺寸。',
    h3_align_self: 'align-self',
    alignSelfDesc: '覆盖容器的 <code>align-items</code> 值，针对特定项目单独设置对齐方式。',
    h2_patterns: '常见布局模式',
    patternsDesc: '以下是实际项目中最常用的 Flexbox 布局模式。',
    h3_centering: '居中元素',
    centeringDesc: 'Flexbox 使居中变得简单 — 不再需要 margin hack 或绝对定位。',
    h3_navbar: '导航栏',
    navbarDesc: '经典的响应式导航栏，logo 在左，链接在右。',
    h3_cards: '卡片网格',
    cardsDesc: '响应式卡片布局，自动换行并均匀分布。',
    h3_sticky_footer: '粘性页脚',
    stickyFooterDesc: '即使内容较少，页脚也始终固定在视口底部。',
    h3_holy_grail: '圣杯布局',
    holyGrailDesc: '经典的三栏布局，带页头和页脚。',
    h2_vs_grid: 'Flexbox 与 Grid：何时使用',
    vsGridDesc: 'Flexbox 和 CSS Grid 都是强大的布局工具，但它们解决不同的问题。',
    flexboxBest: 'Flexbox 最适合：',
    gridBest: 'CSS Grid 最适合：',
    h2_browser: '浏览器支持',
    browserDesc: 'Flexbox 在所有现代浏览器中都有出色的支持。',
    h2_faq: '常见问题',
    faq1_q: 'justify-content 和 align-items 有什么区别？',
    faq1_a: 'justify-content 控制主轴方向的分布（flex-direction: row 时默认为水平方向），align-items 控制交叉轴方向的对齐（默认为垂直方向）。如果将 flex-direction 改为 column，这两个轴会互换。',
    faq2_q: '什么时候应该用 Flexbox 而不是 CSS Grid？',
    faq2_a: 'Flexbox 适合一维布局（行或列）、内容驱动的尺寸、动态布局。CSS Grid 适合二维布局（同时控制行和列）、布局驱动的尺寸。两者可以结合使用：Grid 做页面布局，Flexbox 做组件内部布局。',
    faq3_q: '如何让 flex 项目等宽？',
    faq3_a: '给所有项目设置 flex: 1。这是 flex-grow: 1, flex-shrink: 1, flex-basis: 0% 的简写，使所有项目从零基础等比增长。如果仍然不等宽，还需设置 min-width: 0。',
    faq4_q: '为什么我的 flex 项目不会缩小？',
    faq4_a: 'flex 项目默认有 min-width: auto，阻止它们缩小到内容最小尺寸以下。解决方法是设置 min-width: 0（列布局则设 min-height: 0）。同时检查 flex-shrink 是否为 0。',
    faq5_q: '可以在 Flexbox 中使用 gap 吗？',
    faq5_a: '可以，gap 属性在所有现代浏览器中均支持 Flexbox（Chrome 84+、Firefox 63+、Safari 14.1+、Edge 84+）。推荐使用 gap 来添加项目间距，因为与 margin 不同，gap 仅在项目之间创建间距。',
    conclusion: 'CSS Flexbox 是现代 Web 布局的必备工具。掌握这些属性和模式，你可以高效构建任何 UI 布局。使用我们的交互工具来加深理解。',
    linkToolBottom: '试试我们的 Flexbox 生成器，可视化构建布局 →',
  },
  fr: {
    intro: 'CSS Flexbox est le systeme de mise en page le plus utilise dans le developpement web moderne. Il offre un moyen puissant d\'aligner, distribuer et reorganiser les elements. Ce <strong>memento complet CSS Flexbox</strong> explique chaque propriete avec des exemples pratiques.',
    linkTool: 'Construisez des mises en page flexbox visuellement avec notre Generateur Flexbox →',
    h2_container: 'Proprietes du conteneur',
    containerDesc: 'Flexbox commence avec un conteneur flex. Definissez <code>display: flex</code> sur un element parent.',
    h3_display: 'display: flex | inline-flex', displayDesc: 'Definit un conteneur flex. <code>flex</code> cree un conteneur bloc ; <code>inline-flex</code> cree un conteneur en ligne.',
    h3_direction: 'flex-direction', directionDesc: 'Etablit la direction de l\'axe principal.',
    h3_justify: 'justify-content', justifyDesc: 'Controle la distribution des elements le long de l\'axe principal.',
    h3_align_items: 'align-items', alignItemsDesc: 'Controle l\'alignement des elements le long de l\'axe transversal.',
    h3_wrap: 'flex-wrap', wrapDesc: 'Controle si les elements restent sur une seule ligne ou passent a la ligne.',
    h3_align_content: 'align-content', alignContentDesc: 'Controle l\'espacement entre les lignes quand les elements passent a la ligne.',
    h3_gap: 'gap, row-gap, column-gap', gapDesc: 'Controle l\'espacement entre les elements flex.',
    h2_item: 'Proprietes des elements',
    itemDesc: 'Ces proprietes s\'appliquent aux elements flex individuels.',
    h3_order: 'order', orderDesc: 'Controle l\'ordre visuel des elements. Par defaut 0.',
    h3_grow: 'flex-grow', growDesc: 'Definit comment un element grandit. Par defaut 0.',
    h3_shrink: 'flex-shrink', shrinkDesc: 'Definit comment un element retrecit. Par defaut 1.',
    h3_basis: 'flex-basis', basisDesc: 'Definit la taille initiale d\'un element avant la distribution de l\'espace.',
    h3_flex: 'flex (raccourci)', flexDesc: 'Raccourci pour <code>flex-grow</code>, <code>flex-shrink</code> et <code>flex-basis</code>.',
    h3_align_self: 'align-self', alignSelfDesc: 'Remplace <code>align-items</code> du conteneur pour un element specifique.',
    h2_patterns: 'Modeles de mise en page courants',
    patternsDesc: 'Les modeles flexbox les plus utilises dans les projets reels.',
    h3_centering: 'Centrage des elements', centeringDesc: 'Flexbox rend le centrage trivial.',
    h3_navbar: 'Barre de navigation', navbarDesc: 'Une navbar responsive classique.',
    h3_cards: 'Grille de cartes', cardsDesc: 'Une mise en page de cartes responsive avec retour a la ligne.',
    h3_sticky_footer: 'Pied de page fixe', stickyFooterDesc: 'Le pied de page reste en bas meme avec peu de contenu.',
    h3_holy_grail: 'Mise en page Saint Graal', holyGrailDesc: 'La classique mise en page a trois colonnes.',
    h2_vs_grid: 'Flexbox vs Grid : quand utiliser chacun',
    vsGridDesc: 'Flexbox et CSS Grid resolvent des problemes differents.',
    flexboxBest: 'Flexbox est ideal pour :', gridBest: 'CSS Grid est ideal pour :',
    h2_browser: 'Support navigateurs', browserDesc: 'Flexbox a un excellent support dans tous les navigateurs modernes.',
    h2_faq: 'Questions frequentes',
    faq1_q: 'Quelle difference entre justify-content et align-items ?', faq1_a: 'justify-content controle l\'axe principal, align-items controle l\'axe transversal. Si flex-direction change, les axes s\'inversent.',
    faq2_q: 'Quand utiliser Flexbox plutot que Grid ?', faq2_a: 'Flexbox pour les mises en page 1D, Grid pour les mises en page 2D. Combinez-les pour de meilleurs resultats.',
    faq3_q: 'Comment rendre les elements flex egaux en largeur ?', faq3_a: 'Utilisez flex: 1 sur tous les elements et min-width: 0 si necessaire.',
    faq4_q: 'Pourquoi mon element flex ne retrecit pas ?', faq4_a: 'Par defaut min-width: auto empeche le retrecissement. Ajoutez min-width: 0.',
    faq5_q: 'Peut-on utiliser gap avec Flexbox ?', faq5_a: 'Oui, gap fonctionne avec Flexbox dans tous les navigateurs modernes.',
    conclusion: 'CSS Flexbox est un outil essentiel pour les mises en page modernes. Pratiquez avec notre outil interactif.',
    linkToolBottom: 'Essayez notre Generateur Flexbox interactif →',
  },
  de: {
    intro: 'CSS Flexbox ist das am meisten verwendete Layout-System in der modernen Webentwicklung. Es bietet eine leistungsstarke Moglichkeit, Elemente auszurichten und zu verteilen. Dieses <strong>vollstandige CSS Flexbox Cheat Sheet</strong> erklart jede Eigenschaft mit Beispielen.',
    linkTool: 'Erstellen Sie Flexbox-Layouts visuell mit unserem Flexbox Generator →',
    h2_container: 'Container-Eigenschaften',
    containerDesc: 'Flexbox beginnt mit einem Flex-Container. Setzen Sie <code>display: flex</code> auf ein Elternelement.',
    h3_display: 'display: flex | inline-flex', displayDesc: 'Definiert einen Flex-Container.',
    h3_direction: 'flex-direction', directionDesc: 'Legt die Richtung der Hauptachse fest.',
    h3_justify: 'justify-content', justifyDesc: 'Steuert die Verteilung entlang der Hauptachse.',
    h3_align_items: 'align-items', alignItemsDesc: 'Steuert die Ausrichtung entlang der Querachse.',
    h3_wrap: 'flex-wrap', wrapDesc: 'Steuert ob Elemente umbrechen konnen.',
    h3_align_content: 'align-content', alignContentDesc: 'Steuert den Abstand zwischen Zeilen bei Umbruch.',
    h3_gap: 'gap, row-gap, column-gap', gapDesc: 'Steuert den Abstand zwischen Flex-Elementen.',
    h2_item: 'Element-Eigenschaften',
    itemDesc: 'Diese Eigenschaften werden auf einzelne Flex-Elemente angewendet.',
    h3_order: 'order', orderDesc: 'Steuert die visuelle Reihenfolge. Standard ist 0.',
    h3_grow: 'flex-grow', growDesc: 'Definiert das Wachstum eines Elements. Standard ist 0.',
    h3_shrink: 'flex-shrink', shrinkDesc: 'Definiert das Schrumpfen eines Elements. Standard ist 1.',
    h3_basis: 'flex-basis', basisDesc: 'Setzt die anfangliche Grosse vor der Verteilung.',
    h3_flex: 'flex (Kurzschreibweise)', flexDesc: 'Kurzschreibweise fur <code>flex-grow</code>, <code>flex-shrink</code> und <code>flex-basis</code>.',
    h3_align_self: 'align-self', alignSelfDesc: 'Uberschreibt <code>align-items</code> des Containers fur ein Element.',
    h2_patterns: 'Haufige Layout-Muster',
    patternsDesc: 'Die am haufigsten verwendeten Flexbox-Layoutmuster.',
    h3_centering: 'Elemente zentrieren', centeringDesc: 'Flexbox macht Zentrierung einfach.',
    h3_navbar: 'Navigationsleiste', navbarDesc: 'Klassische responsive Navbar.',
    h3_cards: 'Karten-Raster', cardsDesc: 'Responsives Karten-Layout mit Umbruch.',
    h3_sticky_footer: 'Fester Footer', stickyFooterDesc: 'Footer bleibt unten auch bei wenig Inhalt.',
    h3_holy_grail: 'Holy Grail Layout', holyGrailDesc: 'Klassisches Drei-Spalten-Layout.',
    h2_vs_grid: 'Flexbox vs Grid: Wann welches nutzen',
    vsGridDesc: 'Beide losen unterschiedliche Probleme.',
    flexboxBest: 'Flexbox eignet sich fur:', gridBest: 'CSS Grid eignet sich fur:',
    h2_browser: 'Browser-Unterstutzung', browserDesc: 'Flexbox hat hervorragende Browser-Unterstutzung.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was ist der Unterschied zwischen justify-content und align-items?', faq1_a: 'justify-content steuert die Hauptachse, align-items die Querachse. Bei flex-direction: column tauschen die Achsen.',
    faq2_q: 'Wann Flexbox statt Grid?', faq2_a: 'Flexbox fur 1D-Layouts, Grid fur 2D-Layouts. Kombinieren Sie beide.',
    faq3_q: 'Wie macht man Flex-Elemente gleich breit?', faq3_a: 'Setzen Sie flex: 1 und min-width: 0 auf alle Elemente.',
    faq4_q: 'Warum schrumpft mein Flex-Element nicht?', faq4_a: 'Standard min-width: auto verhindert das Schrumpfen. Setzen Sie min-width: 0.',
    faq5_q: 'Kann man gap mit Flexbox nutzen?', faq5_a: 'Ja, gap funktioniert mit Flexbox in allen modernen Browsern.',
    conclusion: 'CSS Flexbox ist unverzichtbar fur moderne Layouts. Uben Sie mit unserem Tool.',
    linkToolBottom: 'Testen Sie unseren interaktiven Flexbox Generator →',
  },
  es: {
    intro: 'CSS Flexbox es el sistema de diseno mas utilizado en el desarrollo web moderno. Proporciona una forma poderosa de alinear y distribuir elementos. Esta <strong>hoja de referencia completa de CSS Flexbox</strong> explica cada propiedad con ejemplos.',
    linkTool: 'Construye layouts flexbox visualmente con nuestro Generador Flexbox →',
    h2_container: 'Propiedades del contenedor',
    containerDesc: 'Flexbox comienza con un contenedor flex. Establece <code>display: flex</code> en un elemento padre.',
    h3_display: 'display: flex | inline-flex', displayDesc: 'Define un contenedor flex.',
    h3_direction: 'flex-direction', directionDesc: 'Establece la direccion del eje principal.',
    h3_justify: 'justify-content', justifyDesc: 'Controla la distribucion a lo largo del eje principal.',
    h3_align_items: 'align-items', alignItemsDesc: 'Controla la alineacion a lo largo del eje transversal.',
    h3_wrap: 'flex-wrap', wrapDesc: 'Controla si los elementos se ajustan a varias lineas.',
    h3_align_content: 'align-content', alignContentDesc: 'Controla el espaciado entre lineas cuando hay ajuste de linea.',
    h3_gap: 'gap, row-gap, column-gap', gapDesc: 'Controla el espaciado entre elementos flex.',
    h2_item: 'Propiedades de los elementos',
    itemDesc: 'Estas propiedades se aplican a elementos flex individuales.',
    h3_order: 'order', orderDesc: 'Controla el orden visual. Por defecto 0.',
    h3_grow: 'flex-grow', growDesc: 'Define cuanto crece un elemento. Por defecto 0.',
    h3_shrink: 'flex-shrink', shrinkDesc: 'Define cuanto se encoge un elemento. Por defecto 1.',
    h3_basis: 'flex-basis', basisDesc: 'Establece el tamano inicial antes de la distribucion.',
    h3_flex: 'flex (abreviatura)', flexDesc: 'Abreviatura para <code>flex-grow</code>, <code>flex-shrink</code> y <code>flex-basis</code>.',
    h3_align_self: 'align-self', alignSelfDesc: 'Anula <code>align-items</code> del contenedor para un elemento especifico.',
    h2_patterns: 'Patrones de diseno comunes',
    patternsDesc: 'Los patrones de layout flexbox mas utilizados en proyectos reales.',
    h3_centering: 'Centrar elementos', centeringDesc: 'Flexbox hace que centrar sea trivial.',
    h3_navbar: 'Barra de navegacion', navbarDesc: 'Una navbar responsive clasica.',
    h3_cards: 'Cuadricula de tarjetas', cardsDesc: 'Layout de tarjetas responsive con ajuste de linea.',
    h3_sticky_footer: 'Pie de pagina fijo', stickyFooterDesc: 'El footer se queda abajo aunque haya poco contenido.',
    h3_holy_grail: 'Layout Santo Grial', holyGrailDesc: 'El clasico layout de tres columnas.',
    h2_vs_grid: 'Flexbox vs Grid: cuando usar cada uno',
    vsGridDesc: 'Ambos resuelven problemas diferentes.',
    flexboxBest: 'Flexbox es mejor para:', gridBest: 'CSS Grid es mejor para:',
    h2_browser: 'Soporte de navegadores', browserDesc: 'Flexbox tiene excelente soporte en todos los navegadores modernos.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Cual es la diferencia entre justify-content y align-items?', faq1_a: 'justify-content controla el eje principal, align-items el eje transversal. Con flex-direction: column, los ejes se intercambian.',
    faq2_q: 'Cuando usar Flexbox en vez de Grid?', faq2_a: 'Flexbox para layouts 1D, Grid para 2D. Combinelos para mejores resultados.',
    faq3_q: 'Como hacer elementos flex de igual ancho?', faq3_a: 'Use flex: 1 en todos los elementos y min-width: 0 si es necesario.',
    faq4_q: 'Por que mi elemento flex no se encoge?', faq4_a: 'Por defecto min-width: auto lo impide. Agregue min-width: 0.',
    faq5_q: 'Se puede usar gap con Flexbox?', faq5_a: 'Si, gap funciona con Flexbox en todos los navegadores modernos.',
    conclusion: 'CSS Flexbox es esencial para layouts modernos. Practica con nuestra herramienta interactiva.',
    linkToolBottom: 'Prueba nuestro Generador Flexbox interactivo →',
  },
  ja: {
    intro: 'CSS Flexboxは、モダンWeb開発で最も広く使用されているレイアウトシステムです。要素の整列、配置、並べ替えを強力かつ効率的に行えます。この<strong>完全なCSS Flexboxチートシート</strong>は、すべてのプロパティを実践的なコード例で解説します。',
    linkTool: 'Flexboxジェネレーターでレイアウトをビジュアルに構築 →',
    h2_container: 'コンテナプロパティ',
    containerDesc: 'Flexboxはフレックスコンテナから始まります。親要素に<code>display: flex</code>を設定します。',
    h3_display: 'display: flex | inline-flex', displayDesc: 'フレックスコンテナを定義します。',
    h3_direction: 'flex-direction', directionDesc: '主軸の方向を設定します。',
    h3_justify: 'justify-content', justifyDesc: '主軸に沿った要素の配置を制御します。',
    h3_align_items: 'align-items', alignItemsDesc: '交差軸に沿った要素の整列を制御します。',
    h3_wrap: 'flex-wrap', wrapDesc: '要素の折り返しを制御します。',
    h3_align_content: 'align-content', alignContentDesc: '複数行の場合の行間スペースを制御します。',
    h3_gap: 'gap, row-gap, column-gap', gapDesc: 'フレックス要素間のスペースを制御します。',
    h2_item: 'アイテムプロパティ',
    itemDesc: 'これらのプロパティは個々のフレックスアイテムに設定します。',
    h3_order: 'order', orderDesc: '視覚的な順序を制御します。デフォルトは0。',
    h3_grow: 'flex-grow', growDesc: '要素の拡大比率を定義します。デフォルトは0。',
    h3_shrink: 'flex-shrink', shrinkDesc: '要素の縮小比率を定義します。デフォルトは1。',
    h3_basis: 'flex-basis', basisDesc: 'スペース配分前の初期サイズを設定します。',
    h3_flex: 'flex（ショートハンド）', flexDesc: '<code>flex-grow</code>、<code>flex-shrink</code>、<code>flex-basis</code>のショートハンド。',
    h3_align_self: 'align-self', alignSelfDesc: 'コンテナの<code>align-items</code>を個別に上書きします。',
    h2_patterns: '一般的なレイアウトパターン',
    patternsDesc: '実際のプロジェクトで最もよく使われるFlexboxレイアウトパターン。',
    h3_centering: '要素のセンタリング', centeringDesc: 'Flexboxでセンタリングが簡単に。',
    h3_navbar: 'ナビゲーションバー', navbarDesc: 'クラシックなレスポンシブナビバー。',
    h3_cards: 'カードグリッド', cardsDesc: '折り返し付きのレスポンシブカードレイアウト。',
    h3_sticky_footer: 'スティッキーフッター', stickyFooterDesc: 'コンテンツが少なくてもフッターが画面下部に。',
    h3_holy_grail: 'ホーリーグレイルレイアウト', holyGrailDesc: 'クラシックな3カラムレイアウト。',
    h2_vs_grid: 'Flexbox vs Grid：使い分け',
    vsGridDesc: '両方とも強力ですが、異なる問題を解決します。',
    flexboxBest: 'Flexboxが最適：', gridBest: 'CSS Gridが最適：',
    h2_browser: 'ブラウザサポート', browserDesc: 'Flexboxはすべてのモダンブラウザで優れたサポート。',
    h2_faq: 'よくある質問',
    faq1_q: 'justify-contentとalign-itemsの違いは？', faq1_a: 'justify-contentは主軸、align-itemsは交差軸を制御します。flex-directionがcolumnの場合、軸が入れ替わります。',
    faq2_q: 'FlexboxとGridの使い分けは？', faq2_a: 'Flexboxは1Dレイアウト、Gridは2Dレイアウト向け。組み合わせも効果的です。',
    faq3_q: 'フレックス要素を等幅にするには？', faq3_a: '全要素にflex: 1を設定。必要に応じてmin-width: 0も追加。',
    faq4_q: 'フレックス要素が縮小しないのはなぜ？', faq4_a: 'デフォルトのmin-width: autoが縮小を防ぎます。min-width: 0を設定してください。',
    faq5_q: 'Flexboxでgapは使えますか？', faq5_a: 'はい、すべてのモダンブラウザでFlexboxのgapがサポートされています。',
    conclusion: 'CSS Flexboxはモダンレイアウトに不可欠です。インタラクティブツールで練習しましょう。',
    linkToolBottom: 'インタラクティブFlexboxジェネレーターを試す →',
  },
  ko: {
    intro: 'CSS Flexbox는 현대 웹 개발에서 가장 널리 사용되는 레이아웃 시스템입니다. 요소를 정렬, 배치, 재정렬하는 강력한 방법을 제공합니다. 이 <strong>완전한 CSS Flexbox 치트 시트</strong>는 모든 속성을 실용적인 코드 예제와 함께 설명합니다.',
    linkTool: 'Flexbox 생성기로 레이아웃을 시각적으로 구축하기 →',
    h2_container: '컨테이너 속성',
    containerDesc: 'Flexbox는 플렉스 컨테이너에서 시작합니다. 부모 요소에 <code>display: flex</code>를 설정하세요.',
    h3_display: 'display: flex | inline-flex', displayDesc: '플렉스 컨테이너를 정의합니다.',
    h3_direction: 'flex-direction', directionDesc: '주축 방향을 설정합니다.',
    h3_justify: 'justify-content', justifyDesc: '주축을 따른 요소 배치를 제어합니다.',
    h3_align_items: 'align-items', alignItemsDesc: '교차축을 따른 요소 정렬을 제어합니다.',
    h3_wrap: 'flex-wrap', wrapDesc: '요소의 줄 바꿈을 제어합니다.',
    h3_align_content: 'align-content', alignContentDesc: '여러 줄일 때 줄 간격을 제어합니다.',
    h3_gap: 'gap, row-gap, column-gap', gapDesc: '플렉스 요소 간의 간격을 제어합니다.',
    h2_item: '아이템 속성',
    itemDesc: '이러한 속성은 개별 플렉스 아이템에 설정됩니다.',
    h3_order: 'order', orderDesc: '시각적 순서를 제어합니다. 기본값 0.',
    h3_grow: 'flex-grow', growDesc: '요소의 확장 비율을 정의합니다. 기본값 0.',
    h3_shrink: 'flex-shrink', shrinkDesc: '요소의 축소 비율을 정의합니다. 기본값 1.',
    h3_basis: 'flex-basis', basisDesc: '공간 분배 전 초기 크기를 설정합니다.',
    h3_flex: 'flex (단축 속성)', flexDesc: '<code>flex-grow</code>, <code>flex-shrink</code>, <code>flex-basis</code>의 단축 속성.',
    h3_align_self: 'align-self', alignSelfDesc: '컨테이너의 <code>align-items</code>를 개별적으로 재정의합니다.',
    h2_patterns: '일반적인 레이아웃 패턴',
    patternsDesc: '실제 프로젝트에서 가장 많이 사용되는 Flexbox 레이아웃 패턴.',
    h3_centering: '요소 중앙 정렬', centeringDesc: 'Flexbox로 중앙 정렬이 간단해집니다.',
    h3_navbar: '내비게이션 바', navbarDesc: '클래식 반응형 내비바.',
    h3_cards: '카드 그리드', cardsDesc: '줄 바꿈이 있는 반응형 카드 레이아웃.',
    h3_sticky_footer: '스티키 푸터', stickyFooterDesc: '콘텐츠가 적어도 푸터가 화면 하단에.',
    h3_holy_grail: '홀리 그레일 레이아웃', holyGrailDesc: '클래식 3단 레이아웃.',
    h2_vs_grid: 'Flexbox vs Grid: 언제 사용할까',
    vsGridDesc: '둘 다 강력하지만 다른 문제를 해결합니다.',
    flexboxBest: 'Flexbox가 최적:', gridBest: 'CSS Grid가 최적:',
    h2_browser: '브라우저 지원', browserDesc: 'Flexbox는 모든 최신 브라우저에서 우수한 지원.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'justify-content와 align-items의 차이는?', faq1_a: 'justify-content는 주축, align-items는 교차축을 제어합니다. flex-direction이 column이면 축이 바뀝니다.',
    faq2_q: 'Flexbox와 Grid 중 언제 어떤 것을?', faq2_a: 'Flexbox는 1D 레이아웃, Grid는 2D 레이아웃에 적합. 함께 사용하면 효과적.',
    faq3_q: '플렉스 요소를 같은 너비로 만들려면?', faq3_a: '모든 요소에 flex: 1을 설정. 필요하면 min-width: 0도 추가.',
    faq4_q: '플렉스 요소가 축소되지 않는 이유는?', faq4_a: '기본 min-width: auto가 축소를 방지합니다. min-width: 0을 설정하세요.',
    faq5_q: 'Flexbox에서 gap을 사용할 수 있나요?', faq5_a: '네, 모든 최신 브라우저에서 Flexbox gap을 지원합니다.',
    conclusion: 'CSS Flexbox는 현대 레이아웃에 필수입니다. 인터랙티브 도구로 연습하세요.',
    linkToolBottom: '인터랙티브 Flexbox 생성기 사용하기 →',
  },
};

export default function CssFlexboxCheatSheet({ lang }: { lang: string }) {
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

      {/* ==================== CONTAINER PROPERTIES ==================== */}
      <h2>{s.h2_container}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.containerDesc }} />

      {/* display */}
      <h3>{s.h3_display}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.displayDesc }} />
      <pre><code>{`.flex-container {
  display: flex;        /* block-level flex container */
}

.inline-flex-container {
  display: inline-flex;  /* inline-level flex container */
}`}</code></pre>

      {/* flex-direction */}
      <h3>{s.h3_direction}</h3>
      <p>{s.directionDesc}</p>
      <pre><code>{`.container {
  /* Main axis: left to right (default) */
  flex-direction: row;

  /* Main axis: right to left */
  flex-direction: row-reverse;

  /* Main axis: top to bottom */
  flex-direction: column;

  /* Main axis: bottom to top */
  flex-direction: column-reverse;
}`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Value</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Main Axis</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Visual Layout</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>row</code></td>
              <td style={{ padding: '8px 12px' }}>Horizontal (left to right)</td>
              <td style={{ padding: '8px 12px' }}>[1] [2] [3]</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>row-reverse</code></td>
              <td style={{ padding: '8px 12px' }}>Horizontal (right to left)</td>
              <td style={{ padding: '8px 12px' }}>[3] [2] [1]</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>column</code></td>
              <td style={{ padding: '8px 12px' }}>Vertical (top to bottom)</td>
              <td style={{ padding: '8px 12px' }}>[1] / [2] / [3]</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>column-reverse</code></td>
              <td style={{ padding: '8px 12px' }}>Vertical (bottom to top)</td>
              <td style={{ padding: '8px 12px' }}>[3] / [2] / [1]</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* justify-content */}
      <h3>{s.h3_justify}</h3>
      <p>{s.justifyDesc}</p>
      <pre><code>{`.container {
  display: flex;

  /* Pack items to the start (default) */
  justify-content: flex-start;
  /* Result: [1][2][3]              */

  /* Center items */
  justify-content: center;
  /* Result:       [1][2][3]        */

  /* Pack items to the end */
  justify-content: flex-end;
  /* Result:              [1][2][3] */

  /* Equal space between items */
  justify-content: space-between;
  /* Result: [1]     [2]     [3]   */

  /* Equal space around items */
  justify-content: space-around;
  /* Result:  [1]   [2]   [3]     */

  /* Equal space between and around items */
  justify-content: space-evenly;
  /* Result:   [1]   [2]   [3]    */
}`}</code></pre>

      {/* align-items */}
      <h3>{s.h3_align_items}</h3>
      <p>{s.alignItemsDesc}</p>
      <pre><code>{`.container {
  display: flex;
  height: 200px;

  /* Stretch to fill container (default) */
  align-items: stretch;

  /* Align to the top */
  align-items: flex-start;

  /* Align to the center */
  align-items: center;

  /* Align to the bottom */
  align-items: flex-end;

  /* Align by text baseline */
  align-items: baseline;
}`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Value</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>stretch</code></td>
              <td style={{ padding: '8px 12px' }}>Items stretch to fill the container height (default)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>flex-start</code></td>
              <td style={{ padding: '8px 12px' }}>Items align to the top of the container</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>center</code></td>
              <td style={{ padding: '8px 12px' }}>Items are vertically centered</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>flex-end</code></td>
              <td style={{ padding: '8px 12px' }}>Items align to the bottom of the container</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>baseline</code></td>
              <td style={{ padding: '8px 12px' }}>Items align by their text baseline</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* flex-wrap */}
      <h3>{s.h3_wrap}</h3>
      <p>{s.wrapDesc}</p>
      <pre><code>{`.container {
  display: flex;

  /* All items on one line (default) — may overflow */
  flex-wrap: nowrap;

  /* Items wrap to next line when needed */
  flex-wrap: wrap;

  /* Items wrap in reverse order */
  flex-wrap: wrap-reverse;
}

/* Shorthand: flex-flow combines direction + wrap */
.container {
  flex-flow: row wrap;         /* same as flex-direction: row + flex-wrap: wrap */
  flex-flow: column nowrap;    /* column direction, no wrapping */
}`}</code></pre>

      {/* align-content */}
      <h3>{s.h3_align_content}</h3>
      <p>{s.alignContentDesc}</p>
      <pre><code>{`.container {
  display: flex;
  flex-wrap: wrap;
  height: 400px;

  /* Pack lines to the start */
  align-content: flex-start;

  /* Center lines */
  align-content: center;

  /* Pack lines to the end */
  align-content: flex-end;

  /* Equal space between lines */
  align-content: space-between;

  /* Equal space around lines */
  align-content: space-around;

  /* Lines stretch to fill container (default) */
  align-content: stretch;
}`}</code></pre>

      {/* gap */}
      <h3>{s.h3_gap}</h3>
      <p>{s.gapDesc}</p>
      <pre><code>{`.container {
  display: flex;
  flex-wrap: wrap;

  /* Equal gap in both directions */
  gap: 16px;

  /* Different row and column gaps */
  gap: 20px 12px;         /* row-gap: 20px, column-gap: 12px */

  /* Individual properties */
  row-gap: 20px;
  column-gap: 12px;
}

/* Example: card grid with gap */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.card-grid > .card {
  flex: 1 1 300px;  /* grow, shrink, min 300px */
}`}</code></pre>

      {/* ==================== ITEM PROPERTIES ==================== */}
      <h2>{s.h2_item}</h2>
      <p>{s.itemDesc}</p>

      {/* order */}
      <h3>{s.h3_order}</h3>
      <p>{s.orderDesc}</p>
      <pre><code>{`.item-a { order: 2; }  /* appears third */
.item-b { order: -1; } /* appears first */
.item-c { order: 0; }  /* appears second (default) */

/* Visual result: [B] [C] [A]
   DOM order:     A    B    C
   Sorted order: -1    0    2  */`}</code></pre>

      {/* flex-grow */}
      <h3>{s.h3_grow}</h3>
      <p>{s.growDesc}</p>
      <pre><code>{`/* All items same size — share space equally */
.item { flex-grow: 1; }

/* Item B takes twice the extra space */
.item-a { flex-grow: 1; }
.item-b { flex-grow: 2; }
.item-c { flex-grow: 1; }
/* If 200px extra: A gets 50px, B gets 100px, C gets 50px */

/* Only item B grows to fill remaining space */
.item-a { flex-grow: 0; width: 100px; }
.item-b { flex-grow: 1; }
.item-c { flex-grow: 0; width: 100px; }
/* Result: [100px][    fill    ][100px] */`}</code></pre>

      {/* flex-shrink */}
      <h3>{s.h3_shrink}</h3>
      <p>{s.shrinkDesc}</p>
      <pre><code>{`/* Default: all items shrink equally */
.item { flex-shrink: 1; }

/* Prevent an item from shrinking */
.sidebar {
  flex-shrink: 0;
  width: 250px;  /* stays at 250px even when container is small */
}

/* Item A shrinks twice as fast */
.item-a { flex-shrink: 2; width: 300px; }
.item-b { flex-shrink: 1; width: 300px; }
/* If 100px must be removed: A loses ~67px, B loses ~33px */`}</code></pre>

      {/* flex-basis */}
      <h3>{s.h3_basis}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.basisDesc }} />
      <pre><code>{`.item {
  /* Use item's content size (default) */
  flex-basis: auto;

  /* Fixed starting size */
  flex-basis: 200px;

  /* Percentage of container */
  flex-basis: 25%;

  /* Use content's intrinsic size */
  flex-basis: content;

  /* Zero basis — ignore content size for space distribution */
  flex-basis: 0;
}

/* flex-basis vs width:
   - flex-basis sets the initial size BEFORE grow/shrink
   - width sets a fixed size
   - flex-basis is relative to the main axis
   - If both are set, flex-basis wins */`}</code></pre>

      {/* flex shorthand */}
      <h3>{s.h3_flex}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.flexDesc }} />
      <pre><code>{`/* flex: <grow> <shrink> <basis> */

.item { flex: 0 1 auto; }    /* default: don't grow, can shrink, auto basis */
.item { flex: 1; }           /* same as flex: 1 1 0%  — grow equally */
.item { flex: auto; }        /* same as flex: 1 1 auto — grow based on content */
.item { flex: none; }        /* same as flex: 0 0 auto — fully inflexible */
.item { flex: 2; }           /* same as flex: 2 1 0%  — grows 2x */
.item { flex: 1 0 300px; }   /* grow, don't shrink, start at 300px */`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Shorthand</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Equivalent</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>flex: 1</code></td>
              <td style={{ padding: '8px 12px' }}><code>flex: 1 1 0%</code></td>
              <td style={{ padding: '8px 12px' }}>Equal-width items</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>flex: auto</code></td>
              <td style={{ padding: '8px 12px' }}><code>flex: 1 1 auto</code></td>
              <td style={{ padding: '8px 12px' }}>Items size by content then share space</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>flex: none</code></td>
              <td style={{ padding: '8px 12px' }}><code>flex: 0 0 auto</code></td>
              <td style={{ padding: '8px 12px' }}>Fixed-size item (no grow or shrink)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>flex: 0 1 auto</code></td>
              <td style={{ padding: '8px 12px' }}>default</td>
              <td style={{ padding: '8px 12px' }}>Default behavior</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>flex: 1 0 300px</code></td>
              <td style={{ padding: '8px 12px' }}>grow from 300px, never shrink</td>
              <td style={{ padding: '8px 12px' }}>Responsive card with min-width</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* align-self */}
      <h3>{s.h3_align_self}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.alignSelfDesc }} />
      <pre><code>{`.container {
  display: flex;
  align-items: flex-start;  /* all items at top */
  height: 200px;
}

.special-item {
  align-self: center;       /* this item centered vertically */
}

/* Values: auto | flex-start | flex-end | center | baseline | stretch */
.item-a { align-self: flex-start; }  /* top */
.item-b { align-self: center; }      /* middle */
.item-c { align-self: flex-end; }    /* bottom */
.item-d { align-self: stretch; }     /* full height */`}</code></pre>

      {/* ==================== COMMON LAYOUT PATTERNS ==================== */}
      <h2>{s.h2_patterns}</h2>
      <p>{s.patternsDesc}</p>

      {/* Centering */}
      <h3>{s.h3_centering}</h3>
      <p>{s.centeringDesc}</p>
      <pre><code>{`/* Horizontal centering */
.center-horizontal {
  display: flex;
  justify-content: center;
}

/* Vertical centering */
.center-vertical {
  display: flex;
  align-items: center;
  height: 100vh;
}

/* Perfect centering (both axes) */
.center-both {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Alternative: center with margin auto */
.center-auto {
  display: flex;
  height: 100vh;
}
.center-auto > .child {
  margin: auto;  /* centers in both axes */
}`}</code></pre>

      {/* Navigation Bar */}
      <h3>{s.h3_navbar}</h3>
      <p>{s.navbarDesc}</p>
      <pre><code>{`/* Basic navbar: logo left, links right */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

.navbar .logo {
  flex-shrink: 0;
}

.navbar .nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}

/* Navbar with center section */
.navbar-3 {
  display: flex;
  align-items: center;
  padding: 0 24px;
}
.navbar-3 .left   { flex: 1; }
.navbar-3 .center { flex: 0; white-space: nowrap; }
.navbar-3 .right  { flex: 1; display: flex; justify-content: flex-end; }`}</code></pre>

      {/* Card Grid */}
      <h3>{s.h3_cards}</h3>
      <p>{s.cardsDesc}</p>
      <pre><code>{`/* Responsive card grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 300px;   /* grow, shrink, min 300px */
  max-width: 400px;
}

/* Cards with equal height */
.card-grid-equal {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card-equal {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
}

.card-equal .card-body {
  flex: 1;           /* body fills remaining height */
}

.card-equal .card-footer {
  margin-top: auto;  /* footer pushed to bottom */
}`}</code></pre>

      {/* Sticky Footer */}
      <h3>{s.h3_sticky_footer}</h3>
      <p>{s.stickyFooterDesc}</p>
      <pre><code>{`/* Sticky footer layout */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

header {
  flex-shrink: 0;  /* fixed height header */
}

main {
  flex: 1;         /* takes all remaining space */
}

footer {
  flex-shrink: 0;  /* fixed height footer */
}

/* HTML structure:
   <body>
     <header>...</header>
     <main>...</main>
     <footer>...</footer>
   </body>
*/`}</code></pre>

      {/* Holy Grail */}
      <h3>{s.h3_holy_grail}</h3>
      <p>{s.holyGrailDesc}</p>
      <pre><code>{`/* Holy grail layout */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page > header,
.page > footer {
  flex-shrink: 0;
}

.page > .content {
  flex: 1;
  display: flex;
}

.page .sidebar-left {
  flex: 0 0 200px;   /* fixed 200px left sidebar */
  order: -1;         /* appears first visually */
}

.page .main {
  flex: 1;           /* main content fills remaining space */
  min-width: 0;      /* prevent overflow */
}

.page .sidebar-right {
  flex: 0 0 200px;   /* fixed 200px right sidebar */
}

/* HTML structure:
   <div class="page">
     <header>Header</header>
     <div class="content">
       <main class="main">Main Content</main>
       <aside class="sidebar-left">Left</aside>
       <aside class="sidebar-right">Right</aside>
     </div>
     <footer>Footer</footer>
   </div>
*/`}</code></pre>

      {/* ==================== FLEXBOX VS GRID ==================== */}
      <h2>{s.h2_vs_grid}</h2>
      <p>{s.vsGridDesc}</p>

      <p style={{ fontWeight: 600, marginTop: 16 }}>{s.flexboxBest}</p>
      <ul>
        <li>One-dimensional layouts (a single row or column)</li>
        <li>Content-driven sizing (items determine their own width)</li>
        <li>Dynamic, unknown number of items</li>
        <li>Navigation bars and toolbars</li>
        <li>Centering elements</li>
        <li>Components where items should wrap naturally</li>
      </ul>

      <p style={{ fontWeight: 600, marginTop: 16 }}>{s.gridBest}</p>
      <ul>
        <li>Two-dimensional layouts (rows and columns together)</li>
        <li>Layout-driven sizing (the layout dictates item sizes)</li>
        <li>Complex page layouts with header, sidebar, content, footer</li>
        <li>Overlapping elements in a grid</li>
        <li>When you need precise control over both axes simultaneously</li>
        <li>Dashboard-style layouts with varying card sizes</li>
      </ul>

      <pre><code>{`/* Combining Flexbox and Grid */
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

/* Use Flexbox inside grid areas */
.page header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page main {
  grid-area: main;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-content: flex-start;
}`}</code></pre>

      {/* ==================== BROWSER SUPPORT ==================== */}
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
              <td style={{ padding: '8px 12px' }}>Basic Flexbox</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>29+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>28+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>9+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>12+</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>flex-wrap</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>29+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>28+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>9+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>12+</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>gap (in Flexbox)</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>84+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>63+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>14.1+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>84+</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>row-gap / column-gap</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>84+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>63+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>14.1+</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>84+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Flexbox has over <strong>99% global browser support</strong>. The only consideration is the <code>gap</code> property in flex contexts, which requires slightly newer browsers. For older browser support, use margins as a fallback:</p>
      <pre><code>{`/* Fallback for gap */
.container {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;       /* negative margin to offset item margins */
}
.container > .item {
  margin: 8px;        /* acts like gap: 16px */
}

/* Modern approach with @supports */
@supports (gap: 16px) {
  .container {
    gap: 16px;
    margin: 0;
  }
  .container > .item {
    margin: 0;
  }
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
      <p><Link href={`/${lang}/tools/flexbox-generator`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
