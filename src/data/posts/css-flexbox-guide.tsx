'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'CSS Flexbox is the go-to layout system for modern web development. Whether you are building a navigation bar, centering content, or creating complex responsive layouts, Flexbox makes it simple and intuitive. This <strong>complete CSS Flexbox guide</strong> covers everything from the basics to advanced patterns with practical code examples you can use in your projects today.',
    link_tool: 'Build flexbox layouts visually with our CSS Gradient Generator \u2192',

    h2_1: '1. What Is Flexbox and When to Use It',
    p_1: 'Flexbox (Flexible Box Layout) is a <strong>one-dimensional layout model</strong> designed for distributing space and aligning items within a container. Unlike CSS Grid (which handles two dimensions), Flexbox works along a single axis at a time \u2014 either horizontal (row) or vertical (column).',
    h2_2: '2. Flex Container: The Parent Element',
    p_2: 'Everything starts with the flex container. Setting <code>display: flex</code> on an element turns its direct children into flex items and activates the flexbox layout model.',
    h2_3: '3. Main Axis vs Cross Axis',
    p_3: 'Understanding the two axes is the key to mastering Flexbox. The <strong>main axis</strong> runs in the direction of <code>flex-direction</code>, and the <strong>cross axis</strong> runs perpendicular to it.',
    h2_4: '4. Justify Content: Aligning Along the Main Axis',
    p_4: '<code>justify-content</code> controls how flex items are distributed along the main axis. This is the property you use for horizontal alignment (in the default row direction).',
    h2_5: '5. Align Items: Aligning Along the Cross Axis',
    p_5: '<code>align-items</code> controls how flex items are positioned along the cross axis. This is the property you use for vertical alignment (in the default row direction).',
    h2_6: '6. Flex Item Properties: grow, shrink, basis',
    p_6: 'The three flex item properties control how items share available space. Understanding these is essential for responsive layouts.',
    h2_7: '7. Flex Wrap and Multi-Line Layouts',
    p_7: 'By default, flex items are squeezed onto a single line. <code>flex-wrap</code> allows items to wrap to the next line when they run out of space.',
    h2_8: '8. The gap Property',
    p_8: 'The <code>gap</code> property adds space between flex items without adding margins to the outer edges. It is the modern, clean way to handle spacing.',
    h2_9: '9. Common Flexbox Layout Patterns',
    p_9: 'Here are the most frequently used Flexbox patterns you will encounter in real-world projects. Each one is production-ready and responsive.',
    h2_10: '10. Flexbox vs CSS Grid: When to Use Each',
    p_10: 'Flexbox and CSS Grid are complementary tools. Choosing the right one depends on whether your layout is one-dimensional or two-dimensional.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I center a div with Flexbox?',
    faq1_a: 'Set the parent to display: flex, then use justify-content: center for horizontal centering and align-items: center for vertical centering. For both axes at once: display: flex; justify-content: center; align-items: center; height: 100vh. This is the simplest and most reliable centering method in CSS.',
    faq2_q: 'What is the difference between flex: 1 and flex: auto?',
    faq2_a: 'flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%. Items grow equally from a zero base. flex: auto is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: auto. Items grow from their content size. Use flex: 1 for equal-width columns, flex: auto when items should grow proportionally to their content.',
    faq3_q: 'Why is my flex item overflowing its container?',
    faq3_a: 'Flex items have min-width: auto by default, which prevents them from shrinking below their content size. To fix overflow, add min-width: 0 to the flex item. For text overflow, also add overflow: hidden and text-overflow: ellipsis. For flex-direction: column, use min-height: 0 instead.',
    faq4_q: 'Can I use Flexbox for a full page layout?',
    faq4_a: 'Yes. Set the body to display: flex; flex-direction: column; min-height: 100vh. The header and footer get flex-shrink: 0, and the main content gets flex: 1 to fill remaining space. This creates a sticky footer layout. For more complex page layouts with sidebars, CSS Grid is often a better choice.',
    faq5_q: 'Is Flexbox supported in all browsers?',
    faq5_a: 'Yes, Flexbox has over 99% browser support globally, including all modern browsers. The gap property for Flexbox specifically requires Chrome 84+, Firefox 63+, Safari 14.1+, and Edge 84+. For older browser support, use margins instead of gap.',

    p_conclusion: 'Flexbox is an essential skill for every front-end developer. Practice these patterns and they will become second nature. For experimenting with layouts visually, try our tools below.',
    link_tool_bottom: 'Try the CSS Gradient Generator \u2192',
  },
  zh: {
    intro: 'CSS Flexbox 是现代 Web 开发中的首选布局系统。无论是构建导航栏、居中内容还是创建复杂的响应式布局，Flexbox 都能使其简单直观。本<strong>完整 CSS Flexbox 指南</strong>涵盖了从基础到高级模式的所有内容。',
    link_tool: '使用 CSS 渐变生成器可视化构建布局 \u2192',
    h2_1: '1. 什么是 Flexbox 以及何时使用',
    p_1: 'Flexbox（弹性盒布局）是一种<strong>一维布局模型</strong>，用于在容器内分配空间和对齐项目。与处理二维的 CSS Grid 不同，Flexbox 一次沿一个轴工作。',
    h2_2: '2. Flex 容器：父元素',
    p_2: '一切从 flex 容器开始。在元素上设置 <code>display: flex</code> 会将其直接子元素变为 flex 项目。',
    h2_3: '3. 主轴与交叉轴',
    p_3: '理解两个轴是掌握 Flexbox 的关键。<strong>主轴</strong>沿着 <code>flex-direction</code> 方向运行，<strong>交叉轴</strong>与之垂直。',
    h2_4: '4. justify-content：沿主轴对齐',
    p_4: '<code>justify-content</code> 控制 flex 项目在主轴上的分布方式。',
    h2_5: '5. align-items：沿交叉轴对齐',
    p_5: '<code>align-items</code> 控制 flex 项目在交叉轴上的定位方式。',
    h2_6: '6. Flex 项目属性：grow、shrink、basis',
    p_6: '三个 flex 项目属性控制项目如何共享可用空间。理解这些对于响应式布局至关重要。',
    h2_7: '7. Flex Wrap 和多行布局',
    p_7: '默认情况下，flex 项目被挤在一行。<code>flex-wrap</code> 允许项目在空间不足时换行。',
    h2_8: '8. gap 属性',
    p_8: '<code>gap</code> 属性在 flex 项目之间添加间距，而不在外边缘添加边距。',
    h2_9: '9. 常见 Flexbox 布局模式',
    p_9: '以下是实际项目中最常用的 Flexbox 模式，均可直接用于生产环境。',
    h2_10: '10. Flexbox 与 CSS Grid：何时使用',
    p_10: 'Flexbox 和 CSS Grid 是互补的工具。选择取决于布局是一维还是二维的。',
    h2_faq: '常见问题',
    faq1_q: '如何用 Flexbox 居中 div？', faq1_a: '父元素设置 display: flex; justify-content: center; align-items: center; height: 100vh。这是 CSS 中最简单可靠的居中方法。',
    faq2_q: 'flex: 1 和 flex: auto 有什么区别？', faq2_a: 'flex: 1 从零基础等比增长，flex: auto 从内容大小增长。等宽列用 flex: 1。',
    faq3_q: '为什么 flex 项目溢出容器？', faq3_a: 'flex 项目默认有 min-width: auto。添加 min-width: 0 来修复溢出。',
    faq4_q: 'Flexbox 可以做整页布局吗？', faq4_a: '可以。body 设置 display: flex; flex-direction: column; min-height: 100vh。主内容设 flex: 1。',
    faq5_q: '所有浏览器都支持 Flexbox 吗？', faq5_a: '是的，Flexbox 全球浏览器支持率超过 99%。gap 属性需要较新的浏览器版本。',
    p_conclusion: 'Flexbox 是每个前端开发者的必备技能。使用我们的工具来实验布局。',
    link_tool_bottom: '试试 CSS 渐变生成器 \u2192',
  },
  fr: {
    intro: 'CSS Flexbox est le systeme de mise en page incontournable du developpement web moderne. Ce <strong>guide complet CSS Flexbox</strong> couvre tout, des bases aux patterns avances avec des exemples pratiques.',
    link_tool: 'Construisez des layouts visuellement avec notre Generateur CSS \u2192',
    h2_1: '1. Qu\'est-ce que Flexbox et quand l\'utiliser', p_1: 'Flexbox est un <strong>modele de mise en page unidimensionnel</strong> pour distribuer l\'espace et aligner les elements.',
    h2_2: '2. Conteneur Flex : l\'element parent', p_2: 'Tout commence avec le conteneur flex. <code>display: flex</code> transforme les enfants directs en elements flex.',
    h2_3: '3. Axe principal vs axe transversal', p_3: 'Comprendre les deux axes est la cle pour maitriser Flexbox.',
    h2_4: '4. justify-content : alignement sur l\'axe principal', p_4: '<code>justify-content</code> controle la distribution des elements le long de l\'axe principal.',
    h2_5: '5. align-items : alignement sur l\'axe transversal', p_5: '<code>align-items</code> controle le positionnement sur l\'axe transversal.',
    h2_6: '6. Proprietes des elements flex : grow, shrink, basis', p_6: 'Les trois proprietes controlent comment les elements partagent l\'espace disponible.',
    h2_7: '7. Flex Wrap et layouts multi-lignes', p_7: '<code>flex-wrap</code> permet aux elements de passer a la ligne suivante.',
    h2_8: '8. La propriete gap', p_8: '<code>gap</code> ajoute de l\'espace entre les elements sans marges exterieures.',
    h2_9: '9. Patterns de layout Flexbox courants', p_9: 'Les patterns Flexbox les plus utilises dans les projets reels.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox et CSS Grid sont complementaires. Le choix depend de la dimensionnalite du layout.',
    h2_faq: 'Questions frequentes',
    faq1_q: 'Comment centrer un div avec Flexbox ?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Difference entre flex: 1 et flex: auto ?', faq2_a: 'flex: 1 grandit depuis une base zero, flex: auto depuis la taille du contenu.',
    faq3_q: 'Pourquoi mon element flex deborde ?', faq3_a: 'Ajoutez min-width: 0 pour corriger le debordement.',
    faq4_q: 'Flexbox pour un layout pleine page ?', faq4_a: 'Oui, avec flex-direction: column et min-height: 100vh sur le body.',
    faq5_q: 'Support navigateur de Flexbox ?', faq5_a: 'Plus de 99% de support global. gap necessite des navigateurs recents.',
    p_conclusion: 'Flexbox est une competence essentielle. Pratiquez avec nos outils.',
    link_tool_bottom: 'Essayez le Generateur CSS \u2192',
  },
  de: {
    intro: 'CSS Flexbox ist das bevorzugte Layoutsystem fur moderne Webentwicklung. Dieser <strong>vollstandige CSS Flexbox Guide</strong> deckt alles ab, von den Grundlagen bis zu fortgeschrittenen Patterns.',
    link_tool: 'Layouts visuell erstellen mit unserem CSS Generator \u2192',
    h2_1: '1. Was ist Flexbox und wann verwenden', p_1: 'Flexbox ist ein <strong>eindimensionales Layoutmodell</strong> zum Verteilen von Raum und Ausrichten von Elementen.',
    h2_2: '2. Flex Container: Das Elternelement', p_2: 'Alles beginnt mit dem Flex Container. <code>display: flex</code> macht direkte Kinder zu Flex Items.',
    h2_3: '3. Hauptachse vs Querachse', p_3: 'Das Verstandnis der zwei Achsen ist der Schlussel zur Flexbox-Beherrschung.',
    h2_4: '4. justify-content: Ausrichtung auf der Hauptachse', p_4: '<code>justify-content</code> steuert die Verteilung entlang der Hauptachse.',
    h2_5: '5. align-items: Ausrichtung auf der Querachse', p_5: '<code>align-items</code> steuert die Positionierung auf der Querachse.',
    h2_6: '6. Flex Item Eigenschaften: grow, shrink, basis', p_6: 'Die drei Eigenschaften steuern, wie Items den verfugbaren Raum teilen.',
    h2_7: '7. Flex Wrap und mehrzeilige Layouts', p_7: '<code>flex-wrap</code> erlaubt Items, in die nachste Zeile umzubrechen.',
    h2_8: '8. Die gap Eigenschaft', p_8: '<code>gap</code> fugt Abstande zwischen Items ohne aussere Margins hinzu.',
    h2_9: '9. Haufige Flexbox Layout-Patterns', p_9: 'Die am haufigsten verwendeten Flexbox-Patterns in realen Projekten.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox und CSS Grid sind komplementar. Die Wahl hangt von der Dimensionalitat ab.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Wie zentriere ich ein div mit Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Unterschied zwischen flex: 1 und flex: auto?', faq2_a: 'flex: 1 wachst von null, flex: auto von der Inhaltsgrosse.',
    faq3_q: 'Warum lauft mein Flex Item uber?', faq3_a: 'Fugen Sie min-width: 0 hinzu.',
    faq4_q: 'Flexbox fur Ganzseitenlayout?', faq4_a: 'Ja, mit flex-direction: column und min-height: 100vh.',
    faq5_q: 'Browser-Support fur Flexbox?', faq5_a: 'Uber 99% globaler Support. gap benotigt neuere Browser.',
    p_conclusion: 'Flexbox ist eine unverzichtbare Fahigkeit. Uben Sie mit unseren Tools.',
    link_tool_bottom: 'CSS Generator testen \u2192',
  },
  es: {
    intro: 'CSS Flexbox es el sistema de layout predilecto del desarrollo web moderno. Esta <strong>guia completa de CSS Flexbox</strong> cubre todo, desde los basicos hasta patrones avanzados.',
    link_tool: 'Construye layouts visualmente con nuestro Generador CSS \u2192',
    h2_1: '1. Que es Flexbox y cuando usarlo', p_1: 'Flexbox es un <strong>modelo de layout unidimensional</strong> para distribuir espacio y alinear elementos.',
    h2_2: '2. Contenedor Flex: el elemento padre', p_2: 'Todo comienza con el contenedor flex. <code>display: flex</code> convierte los hijos directos en elementos flex.',
    h2_3: '3. Eje principal vs eje transversal', p_3: 'Entender los dos ejes es clave para dominar Flexbox.',
    h2_4: '4. justify-content: alineacion en el eje principal', p_4: '<code>justify-content</code> controla la distribucion en el eje principal.',
    h2_5: '5. align-items: alineacion en el eje transversal', p_5: '<code>align-items</code> controla el posicionamiento en el eje transversal.',
    h2_6: '6. Propiedades de items flex: grow, shrink, basis', p_6: 'Las tres propiedades controlan como los items comparten el espacio disponible.',
    h2_7: '7. Flex Wrap y layouts multilinea', p_7: '<code>flex-wrap</code> permite que los items pasen a la siguiente linea.',
    h2_8: '8. La propiedad gap', p_8: '<code>gap</code> agrega espacio entre items sin margenes exteriores.',
    h2_9: '9. Patrones de layout Flexbox comunes', p_9: 'Los patrones Flexbox mas usados en proyectos reales.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox y CSS Grid son complementarios. La eleccion depende de la dimensionalidad.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Como centrar un div con Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Diferencia entre flex: 1 y flex: auto?', faq2_a: 'flex: 1 crece desde cero, flex: auto desde el tamano del contenido.',
    faq3_q: 'Por que mi item flex se desborda?', faq3_a: 'Agregue min-width: 0 para corregir el desbordamiento.',
    faq4_q: 'Flexbox para layout de pagina completa?', faq4_a: 'Si, con flex-direction: column y min-height: 100vh.',
    faq5_q: 'Soporte de navegador para Flexbox?', faq5_a: 'Mas del 99% de soporte global. gap requiere navegadores recientes.',
    p_conclusion: 'Flexbox es una habilidad esencial. Practica con nuestras herramientas.',
    link_tool_bottom: 'Prueba el Generador CSS \u2192',
  },
  it: {
    intro: 'CSS Flexbox e il sistema di layout preferito nello sviluppo web moderno. Questa <strong>guida completa CSS Flexbox</strong> copre tutto, dalle basi ai pattern avanzati.',
    link_tool: 'Costruisci layout visivamente con il nostro Generatore CSS \u2192',
    h2_1: '1. Cos\'e Flexbox e quando usarlo', p_1: 'Flexbox e un <strong>modello di layout unidimensionale</strong> per distribuire spazio e allineare elementi.',
    h2_2: '2. Contenitore Flex: l\'elemento padre', p_2: 'Tutto inizia con il contenitore flex. <code>display: flex</code> trasforma i figli diretti in elementi flex.',
    h2_3: '3. Asse principale vs asse trasversale', p_3: 'Comprendere i due assi e la chiave per padroneggiare Flexbox.',
    h2_4: '4. justify-content: allineamento sull\'asse principale', p_4: '<code>justify-content</code> controlla la distribuzione lungo l\'asse principale.',
    h2_5: '5. align-items: allineamento sull\'asse trasversale', p_5: '<code>align-items</code> controlla il posizionamento sull\'asse trasversale.',
    h2_6: '6. Proprieta degli item flex: grow, shrink, basis', p_6: 'Le tre proprieta controllano come gli item condividono lo spazio disponibile.',
    h2_7: '7. Flex Wrap e layout multilinea', p_7: '<code>flex-wrap</code> permette agli item di andare a capo.',
    h2_8: '8. La proprieta gap', p_8: '<code>gap</code> aggiunge spazio tra gli item senza margini esterni.',
    h2_9: '9. Pattern di layout Flexbox comuni', p_9: 'I pattern Flexbox piu utilizzati nei progetti reali.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox e CSS Grid sono complementari.',
    h2_faq: 'Domande frequenti',
    faq1_q: 'Come centrare un div con Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Differenza tra flex: 1 e flex: auto?', faq2_a: 'flex: 1 cresce da zero, flex: auto dalla dimensione del contenuto.',
    faq3_q: 'Perche il mio item flex trabocca?', faq3_a: 'Aggiungi min-width: 0.',
    faq4_q: 'Flexbox per layout a pagina intera?', faq4_a: 'Si, con flex-direction: column e min-height: 100vh.',
    faq5_q: 'Supporto browser per Flexbox?', faq5_a: 'Oltre il 99% di supporto globale.',
    p_conclusion: 'Flexbox e una competenza essenziale. Pratica con i nostri strumenti.',
    link_tool_bottom: 'Prova il Generatore CSS \u2192',
  },
  pt: {
    intro: 'CSS Flexbox e o sistema de layout preferido no desenvolvimento web moderno. Este <strong>guia completo de CSS Flexbox</strong> cobre tudo, do basico aos padroes avancados.',
    link_tool: 'Construa layouts visualmente com nosso Gerador CSS \u2192',
    h2_1: '1. O que e Flexbox e quando usar', p_1: 'Flexbox e um <strong>modelo de layout unidimensional</strong> para distribuir espaco e alinhar elementos.',
    h2_2: '2. Container Flex: o elemento pai', p_2: 'Tudo comeca com o container flex. <code>display: flex</code> transforma filhos diretos em itens flex.',
    h2_3: '3. Eixo principal vs eixo transversal', p_3: 'Entender os dois eixos e a chave para dominar Flexbox.',
    h2_4: '4. justify-content: alinhamento no eixo principal', p_4: '<code>justify-content</code> controla a distribuicao ao longo do eixo principal.',
    h2_5: '5. align-items: alinhamento no eixo transversal', p_5: '<code>align-items</code> controla o posicionamento no eixo transversal.',
    h2_6: '6. Propriedades de itens flex: grow, shrink, basis', p_6: 'As tres propriedades controlam como itens compartilham espaco disponivel.',
    h2_7: '7. Flex Wrap e layouts multilinhas', p_7: '<code>flex-wrap</code> permite que itens quebrem para a proxima linha.',
    h2_8: '8. A propriedade gap', p_8: '<code>gap</code> adiciona espaco entre itens sem margens externas.',
    h2_9: '9. Padroes de layout Flexbox comuns', p_9: 'Os padroes Flexbox mais usados em projetos reais.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox e CSS Grid sao complementares.',
    h2_faq: 'Perguntas frequentes',
    faq1_q: 'Como centralizar uma div com Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Diferenca entre flex: 1 e flex: auto?', faq2_a: 'flex: 1 cresce do zero, flex: auto do tamanho do conteudo.',
    faq3_q: 'Por que meu item flex transborda?', faq3_a: 'Adicione min-width: 0.',
    faq4_q: 'Flexbox para layout de pagina inteira?', faq4_a: 'Sim, com flex-direction: column e min-height: 100vh.',
    faq5_q: 'Suporte de navegador para Flexbox?', faq5_a: 'Mais de 99% de suporte global.',
    p_conclusion: 'Flexbox e uma habilidade essencial. Pratique com nossas ferramentas.',
    link_tool_bottom: 'Experimente o Gerador CSS \u2192',
  },
  nl: {
    intro: 'CSS Flexbox is het go-to layoutsysteem voor moderne webontwikkeling. Deze <strong>complete CSS Flexbox gids</strong> behandelt alles van de basis tot geavanceerde patterns.',
    link_tool: 'Bouw layouts visueel met onze CSS Generator \u2192',
    h2_1: '1. Wat is Flexbox en wanneer gebruiken', p_1: 'Flexbox is een <strong>eendimensionaal layoutmodel</strong> voor het verdelen van ruimte en uitlijnen van elementen.',
    h2_2: '2. Flex Container: het ouderelement', p_2: 'Alles begint met de flex container. <code>display: flex</code> maakt directe kinderen tot flex items.',
    h2_3: '3. Hoofdas vs dwarsas', p_3: 'De twee assen begrijpen is de sleutel tot Flexbox.',
    h2_4: '4. justify-content: uitlijning op de hoofdas', p_4: '<code>justify-content</code> bestuurt de verdeling langs de hoofdas.',
    h2_5: '5. align-items: uitlijning op de dwarsas', p_5: '<code>align-items</code> bestuurt de positionering op de dwarsas.',
    h2_6: '6. Flex item eigenschappen: grow, shrink, basis', p_6: 'De drie eigenschappen bepalen hoe items beschikbare ruimte delen.',
    h2_7: '7. Flex Wrap en meerregelige layouts', p_7: '<code>flex-wrap</code> laat items doorlopen naar de volgende regel.',
    h2_8: '8. De gap eigenschap', p_8: '<code>gap</code> voegt ruimte toe tussen items zonder buitenste marges.',
    h2_9: '9. Veelgebruikte Flexbox layout patterns', p_9: 'De meest gebruikte Flexbox patterns in echte projecten.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox en CSS Grid zijn complementair.',
    h2_faq: 'Veelgestelde vragen',
    faq1_q: 'Hoe centreer ik een div met Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Verschil tussen flex: 1 en flex: auto?', faq2_a: 'flex: 1 groeit vanaf nul, flex: auto vanaf de inhoudsgrootte.',
    faq3_q: 'Waarom loopt mijn flex item over?', faq3_a: 'Voeg min-width: 0 toe.',
    faq4_q: 'Flexbox voor een volledige paginalayout?', faq4_a: 'Ja, met flex-direction: column en min-height: 100vh.',
    faq5_q: 'Browserondersteuning voor Flexbox?', faq5_a: 'Meer dan 99% wereldwijde ondersteuning.',
    p_conclusion: 'Flexbox is een essenti\u00eble vaardigheid. Oefen met onze tools.',
    link_tool_bottom: 'Probeer de CSS Generator \u2192',
  },
  pl: {
    intro: 'CSS Flexbox to preferowany system layoutu w nowoczesnym tworzeniu stron. Ten <strong>kompletny przewodnik po CSS Flexbox</strong> obejmuje wszystko od podstaw po zaawansowane wzorce.',
    link_tool: 'Buduj layouty wizualnie z naszym Generatorem CSS \u2192',
    h2_1: '1. Czym jest Flexbox i kiedy go uzywac', p_1: 'Flexbox to <strong>jednowymiarowy model layoutu</strong> do dystrybucji przestrzeni i wyrownywania elementow.',
    h2_2: '2. Kontener Flex: element rodzic', p_2: 'Wszystko zaczyna sie od kontenera flex. <code>display: flex</code> zamienia bezposrednie dzieci w elementy flex.',
    h2_3: '3. Os glowna vs os poprzeczna', p_3: 'Zrozumienie dwoch osi jest kluczem do opanowania Flexbox.',
    h2_4: '4. justify-content: wyrownanie na osi glownej', p_4: '<code>justify-content</code> kontroluje dystrybucje wzdluz osi glownej.',
    h2_5: '5. align-items: wyrownanie na osi poprzecznej', p_5: '<code>align-items</code> kontroluje pozycjonowanie na osi poprzecznej.',
    h2_6: '6. Wlasciwosci elementow flex: grow, shrink, basis', p_6: 'Trzy wlasciwosci kontroluja jak elementy dziela dostepna przestrzen.',
    h2_7: '7. Flex Wrap i layouty wieloliniowe', p_7: '<code>flex-wrap</code> pozwala elementom przechodzic do nastepnej linii.',
    h2_8: '8. Wlasciwosc gap', p_8: '<code>gap</code> dodaje odstepy miedzy elementami bez zewnetrznych margesow.',
    h2_9: '9. Popularne wzorce layoutu Flexbox', p_9: 'Najczesciej uzywane wzorce Flexbox w rzeczywistych projektach.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox i CSS Grid sa komplementarne.',
    h2_faq: 'Czesto zadawane pytania',
    faq1_q: 'Jak wycentrowac div za pomoca Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Roznica miedzy flex: 1 a flex: auto?', faq2_a: 'flex: 1 rosnie od zera, flex: auto od rozmiaru zawartosci.',
    faq3_q: 'Dlaczego moj element flex wychodzi poza kontener?', faq3_a: 'Dodaj min-width: 0.',
    faq4_q: 'Flexbox do layoutu calej strony?', faq4_a: 'Tak, z flex-direction: column i min-height: 100vh.',
    faq5_q: 'Wsparcie przegladarek dla Flexbox?', faq5_a: 'Ponad 99% globalnego wsparcia.',
    p_conclusion: 'Flexbox to niezbedna umiejetnosc. Cwicz z naszymi narzedziami.',
    link_tool_bottom: 'Wyprobuj Generator CSS \u2192',
  },
  sv: {
    intro: 'CSS Flexbox ar det forstahands layoutsystemet for modern webbutveckling. Denna <strong>kompletta CSS Flexbox-guide</strong> tacker allt fran grunderna till avancerade monster.',
    link_tool: 'Bygg layouts visuellt med var CSS Generator \u2192',
    h2_1: '1. Vad ar Flexbox och nar anvanda det', p_1: 'Flexbox ar en <strong>endimensionell layoutmodell</strong> for att fordela utrymme och justera element.',
    h2_2: '2. Flex Container: foralderelementet', p_2: '<code>display: flex</code> gor direkta barn till flex items.',
    h2_3: '3. Huvudaxel vs tvarsaxel', p_3: 'Att forsta de tva axlarna ar nyckeln till Flexbox.',
    h2_4: '4. justify-content: justering langs huvudaxeln', p_4: '<code>justify-content</code> styr fordelningen langs huvudaxeln.',
    h2_5: '5. align-items: justering langs tvarsaxeln', p_5: '<code>align-items</code> styr positioneringen pa tvarsaxeln.',
    h2_6: '6. Flex item-egenskaper: grow, shrink, basis', p_6: 'De tre egenskaperna styr hur items delar tillgangligt utrymme.',
    h2_7: '7. Flex Wrap och flerradslayouter', p_7: '<code>flex-wrap</code> later items bryta till nasta rad.',
    h2_8: '8. Egenskapen gap', p_8: '<code>gap</code> lagger till utrymme mellan items utan yttre marginaler.',
    h2_9: '9. Vanliga Flexbox layoutmonster', p_9: 'De mest anvanda Flexbox-monsteren i verkliga projekt.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox och CSS Grid ar komplementara.',
    h2_faq: 'Vanliga fragor',
    faq1_q: 'Hur centrerar jag en div med Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Skillnad mellan flex: 1 och flex: auto?', faq2_a: 'flex: 1 vaxer fran noll, flex: auto fran inneh\u00e5llsstorleken.',
    faq3_q: 'Varfor svammar mitt flex item over?', faq3_a: 'Lagg till min-width: 0.',
    faq4_q: 'Flexbox for helsideslayout?', faq4_a: 'Ja, med flex-direction: column och min-height: 100vh.',
    faq5_q: 'Webblasar-support for Flexbox?', faq5_a: 'Over 99% global support.',
    p_conclusion: 'Flexbox ar en oumbarlig fardighet. Ova med vara verktyg.',
    link_tool_bottom: 'Testa CSS Generator \u2192',
  },
  no: {
    intro: 'CSS Flexbox er det foretrukne layoutsystemet for moderne webutvikling. Denne <strong>komplette CSS Flexbox-guiden</strong> dekker alt fra grunnleggende til avanserte monster.',
    link_tool: 'Bygg layouts visuelt med var CSS Generator \u2192',
    h2_1: '1. Hva er Flexbox og nar bruke det', p_1: 'Flexbox er en <strong>endimensjonal layoutmodell</strong> for a fordele plass og justere elementer.',
    h2_2: '2. Flex Container: foreldreelementet', p_2: '<code>display: flex</code> gjor direkte barn til flex items.',
    h2_3: '3. Hovedakse vs tverrakse', p_3: 'A forsta de to aksene er nokelen til Flexbox.',
    h2_4: '4. justify-content: justering langs hovedaksen', p_4: '<code>justify-content</code> styrer fordelingen langs hovedaksen.',
    h2_5: '5. align-items: justering langs tverraksen', p_5: '<code>align-items</code> styrer posisjonering pa tverraksen.',
    h2_6: '6. Flex item-egenskaper: grow, shrink, basis', p_6: 'De tre egenskapene styrer hvordan items deler tilgjengelig plass.',
    h2_7: '7. Flex Wrap og flerlinjelayouter', p_7: '<code>flex-wrap</code> lar items bryte til neste linje.',
    h2_8: '8. Egenskapen gap', p_8: '<code>gap</code> legger til mellomrom mellom items uten ytre marginer.',
    h2_9: '9. Vanlige Flexbox layoutmonstre', p_9: 'De mest brukte Flexbox-monstrene i virkelige prosjekter.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox og CSS Grid er komplementaere.',
    h2_faq: 'Vanlige sporsmal',
    faq1_q: 'Hvordan sentrer jeg en div med Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Forskjell mellom flex: 1 og flex: auto?', faq2_a: 'flex: 1 vokser fra null, flex: auto fra innholdsstorrelsen.',
    faq3_q: 'Hvorfor renner flex-elementet mitt over?', faq3_a: 'Legg til min-width: 0.',
    faq4_q: 'Flexbox for helsidelayout?', faq4_a: 'Ja, med flex-direction: column og min-height: 100vh.',
    faq5_q: 'Nettleserstotte for Flexbox?', faq5_a: 'Over 99% global stotte.',
    p_conclusion: 'Flexbox er en uunnvaerlig ferdighet. Ov med verktoyene vare.',
    link_tool_bottom: 'Prov CSS Generator \u2192',
  },
  ja: {
    intro: 'CSS Flexboxは、モダンWeb開発における定番レイアウトシステムです。この<strong>完全なCSS Flexboxガイド</strong>は、基礎から高度なパターンまですべてをカバーします。',
    link_tool: 'CSSグラデーションジェネレーターでレイアウトをビジュアルに構築 \u2192',
    h2_1: '1. Flexboxとは何か、いつ使うか', p_1: 'Flexboxは<strong>1次元レイアウトモデル</strong>で、スペースの配分と要素の整列に使用します。',
    h2_2: '2. Flexコンテナ：親要素', p_2: '<code>display: flex</code>で直接の子要素がフレックスアイテムになります。',
    h2_3: '3. 主軸と交差軸', p_3: '2つの軸を理解することがFlexboxマスターの鍵です。',
    h2_4: '4. justify-content：主軸に沿った配置', p_4: '<code>justify-content</code>は主軸に沿ったアイテムの配分を制御します。',
    h2_5: '5. align-items：交差軸に沿った配置', p_5: '<code>align-items</code>は交差軸上の位置決めを制御します。',
    h2_6: '6. Flexアイテム属性：grow、shrink、basis', p_6: '3つの属性がアイテムの利用可能スペースの共有方法を制御します。',
    h2_7: '7. Flex Wrapとマルチラインレイアウト', p_7: '<code>flex-wrap</code>でアイテムを次の行に折り返せます。',
    h2_8: '8. gapプロパティ', p_8: '<code>gap</code>は外側マージンなしにアイテム間にスペースを追加します。',
    h2_9: '9. 一般的なFlexboxレイアウトパターン', p_9: '実際のプロジェクトで最もよく使われるFlexboxパターン。',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'FlexboxとCSS Gridは補完的なツールです。',
    h2_faq: 'よくある質問',
    faq1_q: 'Flexboxでdivを中央揃えするには？', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh。',
    faq2_q: 'flex: 1とflex: autoの違い？', faq2_a: 'flex: 1はゼロから成長、flex: autoはコンテンツサイズから成長。',
    faq3_q: 'なぜフレックスアイテムがオーバーフローする？', faq3_a: 'min-width: 0を追加してください。',
    faq4_q: 'Flexboxでフルページレイアウト？', faq4_a: 'はい、flex-direction: columnとmin-height: 100vhで可能です。',
    faq5_q: 'Flexboxのブラウザサポート？', faq5_a: 'グローバルで99%以上のサポート。',
    p_conclusion: 'Flexboxはすべてのフロントエンド開発者に不可欠なスキルです。',
    link_tool_bottom: 'CSSグラデーションジェネレーターを試す \u2192',
  },
  ko: {
    intro: 'CSS Flexbox는 현대 웹 개발의 필수 레이아웃 시스템입니다. 이 <strong>완전한 CSS Flexbox 가이드</strong>는 기초부터 고급 패턴까지 모든 것을 다룹니다.',
    link_tool: 'CSS 그라디언트 생성기로 레이아웃을 시각적으로 구축하세요 \u2192',
    h2_1: '1. Flexbox란 무엇이며 언제 사용하나', p_1: 'Flexbox는 공간 배분과 요소 정렬을 위한 <strong>1차원 레이아웃 모델</strong>입니다.',
    h2_2: '2. Flex 컨테이너: 부모 요소', p_2: '<code>display: flex</code>로 직접 자식을 플렉스 아이템으로 만듭니다.',
    h2_3: '3. 주축 vs 교차축', p_3: '두 축을 이해하는 것이 Flexbox 마스터의 핵심입니다.',
    h2_4: '4. justify-content: 주축 정렬', p_4: '<code>justify-content</code>는 주축을 따른 배분을 제어합니다.',
    h2_5: '5. align-items: 교차축 정렬', p_5: '<code>align-items</code>는 교차축의 위치를 제어합니다.',
    h2_6: '6. Flex 아이템 속성: grow, shrink, basis', p_6: '세 가지 속성이 아이템의 가용 공간 공유 방법을 제어합니다.',
    h2_7: '7. Flex Wrap과 다중 행 레이아웃', p_7: '<code>flex-wrap</code>으로 아이템을 다음 줄로 넘길 수 있습니다.',
    h2_8: '8. gap 속성', p_8: '<code>gap</code>은 외부 여백 없이 아이템 사이에 공간을 추가합니다.',
    h2_9: '9. 일반적인 Flexbox 레이아웃 패턴', p_9: '실제 프로젝트에서 가장 많이 사용되는 Flexbox 패턴.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox와 CSS Grid는 보완적인 도구입니다.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Flexbox로 div를 중앙 정렬하려면?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'flex: 1과 flex: auto의 차이?', faq2_a: 'flex: 1은 0에서 성장, flex: auto는 콘텐츠 크기에서 성장.',
    faq3_q: '왜 플렉스 아이템이 넘치나요?', faq3_a: 'min-width: 0을 추가하세요.',
    faq4_q: 'Flexbox로 전체 페이지 레이아웃?', faq4_a: '네, flex-direction: column과 min-height: 100vh로 가능합니다.',
    faq5_q: 'Flexbox 브라우저 지원?', faq5_a: '전 세계 99% 이상 지원.',
    p_conclusion: 'Flexbox는 모든 프론트엔드 개발자에게 필수 스킬입니다.',
    link_tool_bottom: 'CSS 그라디언트 생성기 사용해보기 \u2192',
  },
  id: {
    intro: 'CSS Flexbox adalah sistem layout utama dalam pengembangan web modern. <strong>Panduan lengkap CSS Flexbox</strong> ini mencakup semuanya dari dasar hingga pola lanjutan.',
    link_tool: 'Bangun layout secara visual dengan CSS Generator kami \u2192',
    h2_1: '1. Apa itu Flexbox dan kapan menggunakannya', p_1: 'Flexbox adalah <strong>model layout satu dimensi</strong> untuk mendistribusikan ruang dan menyelaraskan elemen.',
    h2_2: '2. Flex Container: elemen induk', p_2: '<code>display: flex</code> mengubah anak langsung menjadi flex item.',
    h2_3: '3. Sumbu utama vs sumbu silang', p_3: 'Memahami dua sumbu adalah kunci menguasai Flexbox.',
    h2_4: '4. justify-content: penyelarasan pada sumbu utama', p_4: '<code>justify-content</code> mengontrol distribusi sepanjang sumbu utama.',
    h2_5: '5. align-items: penyelarasan pada sumbu silang', p_5: '<code>align-items</code> mengontrol posisi pada sumbu silang.',
    h2_6: '6. Properti flex item: grow, shrink, basis', p_6: 'Tiga properti mengontrol bagaimana item berbagi ruang yang tersedia.',
    h2_7: '7. Flex Wrap dan layout multi-baris', p_7: '<code>flex-wrap</code> memungkinkan item berpindah ke baris berikutnya.',
    h2_8: '8. Properti gap', p_8: '<code>gap</code> menambahkan jarak antar item tanpa margin luar.',
    h2_9: '9. Pola layout Flexbox umum', p_9: 'Pola Flexbox yang paling sering digunakan dalam proyek nyata.',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox dan CSS Grid saling melengkapi.',
    h2_faq: 'Pertanyaan yang sering diajukan',
    faq1_q: 'Cara memusatkan div dengan Flexbox?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'Perbedaan flex: 1 dan flex: auto?', faq2_a: 'flex: 1 tumbuh dari nol, flex: auto dari ukuran konten.',
    faq3_q: 'Kenapa flex item saya meluap?', faq3_a: 'Tambahkan min-width: 0.',
    faq4_q: 'Flexbox untuk layout halaman penuh?', faq4_a: 'Ya, dengan flex-direction: column dan min-height: 100vh.',
    faq5_q: 'Dukungan browser untuk Flexbox?', faq5_a: 'Lebih dari 99% dukungan global.',
    p_conclusion: 'Flexbox adalah keterampilan penting. Latihan dengan alat kami.',
    link_tool_bottom: 'Coba CSS Generator \u2192',
  },
  th: {
    intro: 'CSS Flexbox เป็นระบบ layout หลักสำหรับการพัฒนาเว็บสมัยใหม่ <strong>คู่มือ CSS Flexbox ฉบับสมบูรณ์</strong>นี้ครอบคลุมทุกอย่างตั้งแต่พื้นฐานจนถึงรูปแบบขั้นสูง',
    link_tool: 'สร้าง layout ด้วย CSS Generator ของเรา \u2192',
    h2_1: '1. Flexbox คืออะไรและใช้เมื่อไหร่', p_1: 'Flexbox เป็น<strong>โมเดล layout หนึ่งมิติ</strong>สำหรับกระจายพื้นที่และจัดเรียงอิลิเมนต์',
    h2_2: '2. Flex Container: อิลิเมนต์แม่', p_2: '<code>display: flex</code> ทำให้ลูกตรงกลายเป็น flex item',
    h2_3: '3. แกนหลัก vs แกนตัด', p_3: 'การเข้าใจสองแกนเป็นกุญแจสำคัญ',
    h2_4: '4. justify-content: การจัดเรียงบนแกนหลัก', p_4: '<code>justify-content</code> ควบคุมการกระจายตามแกนหลัก',
    h2_5: '5. align-items: การจัดเรียงบนแกนตัด', p_5: '<code>align-items</code> ควบคุมตำแหน่งบนแกนตัด',
    h2_6: '6. คุณสมบัติ Flex item: grow, shrink, basis', p_6: 'สามคุณสมบัติควบคุมการแชร์พื้นที่ของ item',
    h2_7: '7. Flex Wrap และ layout หลายแถว', p_7: '<code>flex-wrap</code> อนุญาตให้ item ตัดไปแถวถัดไป',
    h2_8: '8. คุณสมบัติ gap', p_8: '<code>gap</code> เพิ่มระยะห่างระหว่าง item โดยไม่มี margin ด้านนอก',
    h2_9: '9. รูปแบบ layout Flexbox ที่พบบ่อย', p_9: 'รูปแบบ Flexbox ที่ใช้บ่อยที่สุดในโปรเจกต์จริง',
    h2_10: '10. Flexbox vs CSS Grid', p_10: 'Flexbox และ CSS Grid เสริมกัน',
    h2_faq: 'คำถามที่พบบ่อย',
    faq1_q: 'จัดกึ่งกลาง div ด้วย Flexbox ได้อย่างไร?', faq1_a: 'display: flex; justify-content: center; align-items: center; height: 100vh.',
    faq2_q: 'ความแตกต่างระหว่าง flex: 1 กับ flex: auto?', faq2_a: 'flex: 1 โตจากศูนย์ flex: auto โตจากขนาดเนื้อหา',
    faq3_q: 'ทำไม flex item ล้น?', faq3_a: 'เพิ่ม min-width: 0',
    faq4_q: 'Flexbox สำหรับ layout เต็มหน้า?', faq4_a: 'ได้ ด้วย flex-direction: column และ min-height: 100vh',
    faq5_q: 'การรองรับ Flexbox ของเบราว์เซอร์?', faq5_a: 'รองรับมากกว่า 99% ทั่วโลก',
    p_conclusion: 'Flexbox เป็นทักษะจำเป็นสำหรับนักพัฒนา frontend ทุกคน',
    link_tool_bottom: 'ลอง CSS Generator \u2192',
  },
};

export default function CssFlexboxGuide({ lang }: { lang: string }) {
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

      {/* ==================== 1. WHAT IS FLEXBOX ==================== */}
      <h2>{t.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_1 }} />
      <pre><code>{`/* Use Flexbox when you need: */

/* 1. One-dimensional alignment (row OR column) */
.toolbar { display: flex; gap: 8px; }

/* 2. Content-driven sizing */
.tabs { display: flex; }
.tab { flex: 1; }  /* equal-width tabs */

/* 3. Dynamic ordering */
.card { display: flex; flex-direction: column; }
.card-footer { order: 3; margin-top: auto; }

/* Use CSS Grid instead when you need: */
/* - Two-dimensional control (rows AND columns) */
/* - Layout-driven sizing (template areas) */
/* - Complex page-level layouts */`}</code></pre>

      {/* ==================== 2. FLEX CONTAINER ==================== */}
      <h2>{t.h2_2}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_2 }} />
      <pre><code>{`/* Block-level flex container */
.container {
  display: flex;
}

/* Inline-level flex container */
.inline-container {
  display: inline-flex;
}

/* flex-direction: controls the main axis direction */
.row      { flex-direction: row; }          /* left to right (default) */
.row-rev  { flex-direction: row-reverse; }  /* right to left */
.col      { flex-direction: column; }       /* top to bottom */
.col-rev  { flex-direction: column-reverse; } /* bottom to top */

/* flex-flow: shorthand for direction + wrap */
.container {
  flex-flow: row wrap;
  /* same as: flex-direction: row; flex-wrap: wrap; */
}`}</code></pre>

      {/* ==================== 3. AXES ==================== */}
      <h2>{t.h2_3}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_3 }} />
      <pre><code>{`/*
 * flex-direction: row (default)
 * ┌──────────────────────────────────────────┐
 * │ ← ← ← ← ← ← MAIN AXIS → → → → → → →  │
 * │                                          │
 * │  ↑   ┌────┐  ┌────┐  ┌────┐             │
 * │  │   │ 1  │  │ 2  │  │ 3  │   CROSS     │
 * │  │   └────┘  └────┘  └────┘   AXIS      │
 * │  ↓                                       │
 * └──────────────────────────────────────────┘
 *
 * flex-direction: column
 * ┌──────────────────┐
 * │ ←CROSS AXIS→     │
 * │                  │
 * │  ↑  ┌────────┐   │
 * │  │  │   1    │   │
 * │  │  └────────┘   │
 * │  │  ┌────────┐   │  MAIN
 * │  │  │   2    │   │  AXIS
 * │  │  └────────┘   │
 * │  │  ┌────────┐   │
 * │  ↓  │   3    │   │
 * │     └────────┘   │
 * └──────────────────┘
 *
 * KEY INSIGHT:
 * - justify-content = main axis
 * - align-items     = cross axis
 * - When flex-direction changes, the axes swap!
 */`}</code></pre>

      {/* ==================== 4. JUSTIFY CONTENT ==================== */}
      <h2>{t.h2_4}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_4 }} />
      <pre><code>{`.container {
  display: flex;

  /* Pack items to the start (default) */
  justify-content: flex-start;
  /* [1][2][3]                    */

  /* Center items */
  justify-content: center;
  /*         [1][2][3]            */

  /* Pack items to the end */
  justify-content: flex-end;
  /*                    [1][2][3] */

  /* Equal space between items */
  justify-content: space-between;
  /* [1]        [2]        [3]   */

  /* Equal space around items */
  justify-content: space-around;
  /*   [1]     [2]     [3]      */

  /* Equal space everywhere */
  justify-content: space-evenly;
  /*    [1]    [2]    [3]       */
}`}</code></pre>

      {/* ==================== 5. ALIGN ITEMS ==================== */}
      <h2>{t.h2_5}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_5 }} />
      <pre><code>{`.container {
  display: flex;
  height: 200px;

  align-items: stretch;     /* Items fill container height (default) */
  align-items: flex-start;  /* Items at the top */
  align-items: center;      /* Items vertically centered */
  align-items: flex-end;    /* Items at the bottom */
  align-items: baseline;    /* Items aligned by text baseline */
}

/* Override for a single item */
.special-item {
  align-self: center;  /* This item centered, others follow container */
}

/* align-content: controls spacing between LINES (only with wrap) */
.multi-line {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;    /* lines packed to top */
  align-content: center;        /* lines centered */
  align-content: space-between; /* equal space between lines */
}`}</code></pre>

      {/* ==================== 6. FLEX ITEM PROPERTIES ==================== */}
      <h2>{t.h2_6}</h2>
      <p>{t.p_6}</p>
      <pre><code>{`/* flex-grow: how much an item GROWS when extra space exists */
.item { flex-grow: 0; }  /* default: don't grow */
.item { flex-grow: 1; }  /* grow to fill available space */
.item { flex-grow: 2; }  /* grow twice as much as flex-grow: 1 items */

/* flex-shrink: how much an item SHRINKS when space is tight */
.item { flex-shrink: 1; }  /* default: shrink proportionally */
.item { flex-shrink: 0; }  /* never shrink (fixed size) */

/* flex-basis: the STARTING SIZE before grow/shrink */
.item { flex-basis: auto; }   /* use content width (default) */
.item { flex-basis: 0; }      /* start from zero, grow equally */
.item { flex-basis: 200px; }  /* start from 200px */
.item { flex-basis: 25%; }    /* start from 25% of container */`}</code></pre>

      <pre><code>{`/* flex shorthand (recommended) */
.item { flex: 1; }
/* = flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
/* Items grow equally from zero — equal widths */

.item { flex: auto; }
/* = flex-grow: 1, flex-shrink: 1, flex-basis: auto */
/* Items grow from content size — proportional widths */

.item { flex: none; }
/* = flex-grow: 0, flex-shrink: 0, flex-basis: auto */
/* Items are inflexible — use content width only */

.item { flex: 0 0 200px; }
/* = flex-grow: 0, flex-shrink: 0, flex-basis: 200px */
/* Fixed 200px item that never grows or shrinks */`}</code></pre>

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
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>flex: 1</code></td><td style={{ padding: '8px 12px' }}>1 1 0%</td><td style={{ padding: '8px 12px' }}>Equal-width columns</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>flex: auto</code></td><td style={{ padding: '8px 12px' }}>1 1 auto</td><td style={{ padding: '8px 12px' }}>Proportional to content</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>flex: none</code></td><td style={{ padding: '8px 12px' }}>0 0 auto</td><td style={{ padding: '8px 12px' }}>Fixed content size</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>flex: 0 0 200px</code></td><td style={{ padding: '8px 12px' }}>0 0 200px</td><td style={{ padding: '8px 12px' }}>Fixed pixel width</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>flex: 1 0 300px</code></td><td style={{ padding: '8px 12px' }}>1 0 300px</td><td style={{ padding: '8px 12px' }}>Responsive card (min 300px)</td></tr>
          </tbody>
        </table>
      </div>

      {/* ==================== 7. FLEX WRAP ==================== */}
      <h2>{t.h2_7}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_7 }} />
      <pre><code>{`.container {
  display: flex;

  flex-wrap: nowrap;        /* default — single line, may overflow */
  flex-wrap: wrap;          /* wrap to next line when needed */
  flex-wrap: wrap-reverse;  /* wrap in reverse order */
}

/* Practical example: responsive card grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 300px;   /* grow, shrink, min-width 300px */
  max-width: 400px;  /* cap maximum width */
}
/* Result:
 * Wide screen:  [card] [card] [card] [card]
 * Medium:       [card] [card] [card]
 *               [card]
 * Narrow:       [card]
 *               [card]
 *               [card]
 *               [card]
 */`}</code></pre>

      {/* ==================== 8. GAP ==================== */}
      <h2>{t.h2_8}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_8 }} />
      <pre><code>{`.container {
  display: flex;
  flex-wrap: wrap;

  gap: 16px;              /* equal gap in both directions */
  gap: 20px 12px;         /* row-gap: 20px, column-gap: 12px */
  row-gap: 20px;          /* vertical spacing only */
  column-gap: 12px;       /* horizontal spacing only */
}

/* Why gap is better than margins: */

/* Old approach (margins) - awkward edge spacing */
.item { margin: 8px; }
/* Creates 8px margin on ALL sides, including outer edges */
/* Need negative margins on container to compensate */

/* Modern approach (gap) - clean spacing */
.container { display: flex; gap: 16px; }
/* Space ONLY between items, not on outer edges */`}</code></pre>

      {/* ==================== 9. COMMON PATTERNS ==================== */}
      <h2>{t.h2_9}</h2>
      <p>{t.p_9}</p>

      <h3>Perfect Centering</h3>
      <pre><code>{`/* Center anything horizontally and vertically */
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  /* or any fixed height */
}

/* Alternative: margin auto trick */
.parent { display: flex; height: 100vh; }
.child  { margin: auto; }  /* centers in both axes */`}</code></pre>

      <h3>Navigation Bar</h3>
      <pre><code>{`/* Logo left, links right */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

/* Logo left, links center, actions right */
.navbar-3-section {
  display: flex;
  align-items: center;
}
.navbar-3-section .logo    { flex: 1; }
.navbar-3-section .links   { flex: 0; display: flex; gap: 24px; }
.navbar-3-section .actions { flex: 1; display: flex; justify-content: flex-end; }`}</code></pre>

      <h3>Sticky Footer</h3>
      <pre><code>{`/* Footer stays at bottom even with short content */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

header { flex-shrink: 0; }   /* fixed height */
main   { flex: 1; }          /* fills all remaining space */
footer { flex-shrink: 0; }   /* fixed height, stays at bottom */`}</code></pre>

      <h3>Sidebar Layout</h3>
      <pre><code>{`/* Fixed sidebar + fluid main content */
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 280px;  /* fixed 280px, never grow or shrink */
}

.main-content {
  flex: 1;          /* takes remaining space */
  min-width: 0;     /* prevents overflow */
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .layout { flex-direction: column; }
  .sidebar { flex-basis: auto; }
}`}</code></pre>

      <h3>Equal-Height Cards</h3>
      <pre><code>{`/* Cards in a row, all same height, button at bottom */
.card-row {
  display: flex;
  gap: 24px;
}

.card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1;  /* fills remaining space, pushing footer down */
}

.card-footer {
  margin-top: auto;  /* always at the bottom */
}`}</code></pre>

      {/* ==================== 10. FLEXBOX VS GRID ==================== */}
      <h2>{t.h2_10}</h2>
      <p>{t.p_10}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Feature</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Flexbox</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>CSS Grid</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}>Dimensions</td><td style={{ padding: '8px 12px' }}>One (row OR column)</td><td style={{ padding: '8px 12px' }}>Two (rows AND columns)</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}>Sizing</td><td style={{ padding: '8px 12px' }}>Content-driven</td><td style={{ padding: '8px 12px' }}>Layout-driven</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}>Best for</td><td style={{ padding: '8px 12px' }}>Components, navbars, centering</td><td style={{ padding: '8px 12px' }}>Page layouts, dashboards</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}>Item placement</td><td style={{ padding: '8px 12px' }}>Sequential (order property)</td><td style={{ padding: '8px 12px' }}>Any cell (grid-area)</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}>Gap support</td><td style={{ padding: '8px 12px' }}>Yes (modern browsers)</td><td style={{ padding: '8px 12px' }}>Yes (all grid browsers)</td></tr>
          </tbody>
        </table>
      </div>
      <pre><code>{`/* Use BOTH together for best results: */

/* Grid for page layout */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}

/* Flexbox for components inside grid areas */
.header {
  grid-area: header;
  display: flex;              /* Flexbox inside Grid */
  justify-content: space-between;
  align-items: center;
}`}</code></pre>

      {/* ==================== FAQ ==================== */}
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

      {/* ==================== TLDR ==================== */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid #334155', borderRadius: 8, padding: '20px 24px', margin: '32px 0' }}>
        <h3 style={{ marginTop: 0 }}>TL;DR</h3>
        <ul style={{ marginBottom: 0 }}>
          <li><code>display: flex</code> on the parent activates Flexbox</li>
          <li><code>justify-content</code> = main axis alignment</li>
          <li><code>align-items</code> = cross axis alignment</li>
          <li><code>flex: 1</code> = equal-width items that fill available space</li>
          <li><code>flex-wrap: wrap</code> = responsive multi-line layouts</li>
          <li><code>gap</code> = clean spacing between items (no outer margins)</li>
          <li>Use <code>min-width: 0</code> to fix overflow issues</li>
          <li>Flexbox for components, CSS Grid for page layouts</li>
          <li>Combine both for the best results</li>
        </ul>
      </div>

      <p>{t.p_conclusion}</p>
    </>
  );
}
