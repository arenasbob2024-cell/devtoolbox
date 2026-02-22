const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Container Queries: The Complete Guide for 2026',
    intro: 'CSS Container Queries represent the most significant advancement in responsive design since media queries. While media queries respond to the viewport size, container queries respond to the size of a parent container, enabling truly reusable, context-aware components. This guide covers everything from basic syntax to advanced patterns, helping you build components that adapt to their container rather than the entire viewport.',
    whatTitle: 'What Are Container Queries?',
    whatDesc: 'Container queries allow you to apply styles to an element based on the size of its containing element rather than the viewport. This means a component can adapt its layout whether it is placed in a narrow sidebar, a wide main content area, or a full-width hero section — all without JavaScript or media queries.',
    vsMediaTitle: 'Container Queries vs Media Queries',
    vsMediaDesc: 'Media queries have been the foundation of responsive design for over a decade. However, they have a fundamental limitation: they only respond to the viewport size, not the actual space available to a component.',
    containmentTitle: 'Understanding Containment',
    containmentDesc: 'Container queries require containment — you must explicitly define which elements are containers. Containment tells the browser that the internal layout of an element is independent of its surroundings, enabling the browser to optimize rendering and calculate container dimensions.',
    containmentTypesTitle: 'Containment Types',
    syntaxTitle: 'Container Query Syntax',
    syntaxDesc: 'The basic syntax involves two parts: defining a container with container-type, and writing queries with @container.',
    containerNameTitle: 'Named Containers',
    containerNameDesc: 'You can name containers to target specific ancestors instead of the nearest container. This is useful when you have nested containers and need to query a specific one.',
    shorthandTitle: 'The container Shorthand',
    shorthandDesc: 'The container shorthand property combines container-type and container-name in a single declaration.',
    unitsTitle: 'Container Query Units',
    unitsDesc: 'Container queries introduce new CSS units relative to the container dimensions. These units work similarly to viewport units (vw, vh) but are relative to the query container.',
    practicalTitle: 'Practical Examples',
    cardTitle: 'Responsive Card Component',
    cardDesc: 'A card component that adapts its layout based on the available space in its container.',
    navTitle: 'Responsive Navigation',
    navDesc: 'A navigation component that switches between horizontal and vertical layouts based on its container width.',
    gridTitle: 'Adaptive Grid Items',
    gridDesc: 'Grid items that change their internal layout based on the grid column width.',
    sidebarTitle: 'Sidebar-Aware Components',
    sidebarDesc: 'Components that adapt when placed in a sidebar versus the main content area.',
    styleQueriesTitle: 'Style Container Queries',
    styleQueriesDesc: 'Style container queries let you query the computed style values of a container, not just its dimensions. This allows you to create variations based on custom properties or other style values.',
    nestingTitle: 'Nesting Container Queries',
    nestingDesc: 'Container queries can be nested to create complex responsive behavior based on multiple ancestor containers.',
    patternsTitle: 'Design Patterns',
    intrinsicTitle: 'Intrinsic Design with Container Queries',
    intrinsicDesc: 'Combine container queries with modern CSS layout techniques like CSS Grid auto-fit for truly intrinsic responsive design.',
    dashboardTitle: 'Dashboard Widget Pattern',
    dashboardDesc: 'A common pattern for dashboards where widgets adapt based on the grid cell they occupy.',
    themingTitle: 'Container-Based Theming',
    themingDesc: 'Use style container queries to create components that inherit their visual theme from a container custom property.',
    browserTitle: 'Browser Support',
    browserDesc: 'Container queries have excellent browser support as of 2026. All major browsers support both size and style container queries.',
    fallbackTitle: 'Fallback Strategies',
    fallbackDesc: 'For environments that may not support container queries, use @supports to provide graceful fallbacks.',
    perfTitle: 'Performance Considerations',
    perfDesc: 'Container queries are designed to be performant, but understanding containment helps you avoid common pitfalls.',
    perf1: 'Containment creates a new stacking context — be aware of z-index implications.',
    perf2: 'Avoid setting container-type on deeply nested elements unnecessarily.',
    perf3: 'Use container-type: inline-size instead of size when you only need width-based queries.',
    perf4: 'Container queries do not cause additional layout passes compared to equivalent media query setups.',
    perf5: 'Use named containers to explicitly control which container is being queried.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Use container queries for component-level responsiveness and media queries for page-level layout.',
    bp2: 'Start with container-type: inline-size — you rarely need size (which includes block dimension).',
    bp3: 'Name your containers for clarity, especially with nested containers.',
    bp4: 'Use container query units (cqw, cqh) for fluid typography and spacing within containers.',
    bp5: 'Combine container queries with CSS Grid and Flexbox for maximum flexibility.',
    bp6: 'Design components from smallest to largest — mobile-first works for containers too.',
    bp7: 'Use @supports for fallback styles when supporting older browsers.',
    migrationTitle: 'Migrating from Media Queries',
    migrationDesc: 'You do not need to replace all media queries with container queries. Use this decision guide to determine which approach to use:',
    conclusionTitle: 'Conclusion',
    conclusionText: 'CSS Container Queries fundamentally change how we think about responsive design. Instead of designing pages that respond to viewport sizes, we can now design components that respond to their container context. This makes components truly reusable across different layout contexts without modification. Start by identifying components in your design system that need to adapt based on available space rather than viewport width — cards, navigation, sidebars, and dashboard widgets are prime candidates. Combine container queries with modern CSS layout techniques like Grid and Flexbox, and use container query units for fluid sizing within containers. The result is a more modular, maintainable, and truly responsive design system.',
    faqTitle: 'FAQ',
    faq1q: 'What is the difference between container queries and media queries?',
    faq1a: 'Media queries respond to the viewport (browser window) size. Container queries respond to the size of a parent container element. This makes components responsive to their context, not the entire page.',
    faq2q: 'Do I need to set container-type on every parent element?',
    faq2a: 'No. Only set container-type on elements you want to use as query containers. The @container rule will query the nearest ancestor with containment. You only need containment on the elements you actually want to query against.',
    faq3q: 'Can I use container queries with CSS Grid and Flexbox?',
    faq3a: 'Yes. Container queries work seamlessly with CSS Grid and Flexbox. The container wrapping element participates in grid or flex layout normally, and child elements can use @container to respond to the container size.',
    faq4q: 'What is the difference between container-type: inline-size and size?',
    faq4a: 'inline-size creates containment only on the inline axis (width in horizontal writing modes). size creates containment on both inline and block axes (width and height). Use inline-size in most cases, as size containment can interfere with auto-height behavior.',
  },
  zh: {
    title: 'CSS 容器查询：2026 完整指南',
    intro: 'CSS 容器查询是自媒体查询以来响应式设计中最重要的进步。媒体查询响应视口大小，而容器查询响应父容器的大小，实现了真正可复用、上下文感知的组件。本指南涵盖从基本语法到高级模式的所有内容。',
    whatTitle: '什么是容器查询？',
    whatDesc: '容器查询允许你根据包含元素的大小而不是视口来应用样式。组件可以根据放置位置自适应布局。',
    vsMediaTitle: '容器查询 vs 媒体查询',
    vsMediaDesc: '媒体查询只响应视口大小，而不是组件实际可用的空间。容器查询解决了这个根本性限制。',
    containmentTitle: '理解包含',
    containmentDesc: '容器查询需要包含 — 你必须显式定义哪些元素是容器。',
    containmentTypesTitle: '包含类型',
    syntaxTitle: '容器查询语法',
    syntaxDesc: '基本语法包括两部分：用 container-type 定义容器，用 @container 编写查询。',
    containerNameTitle: '命名容器',
    containerNameDesc: '可以命名容器以定位特定的祖先元素，而不是最近的容器。',
    shorthandTitle: 'container 简写',
    shorthandDesc: 'container 简写属性将 container-type 和 container-name 合并在一个声明中。',
    unitsTitle: '容器查询单位',
    unitsDesc: '容器查询引入了相对于容器尺寸的新 CSS 单位，类似于视口单位。',
    practicalTitle: '实际示例',
    cardTitle: '响应式卡片组件', cardDesc: '根据容器可用空间自适应布局的卡片组件。',
    navTitle: '响应式导航', navDesc: '根据容器宽度切换水平和垂直布局的导航组件。',
    gridTitle: '自适应网格项', gridDesc: '根据网格列宽度改变内部布局的网格项。',
    sidebarTitle: '侧边栏感知组件', sidebarDesc: '在侧边栏和主内容区域中自适应的组件。',
    styleQueriesTitle: '样式容器查询',
    styleQueriesDesc: '样式容器查询允许查询容器的计算样式值，而不仅仅是尺寸。',
    nestingTitle: '嵌套容器查询',
    nestingDesc: '容器查询可以嵌套以创建基于多个祖先容器的复杂响应行为。',
    patternsTitle: '设计模式',
    intrinsicTitle: '固有响应式设计', intrinsicDesc: '结合容器查询和 CSS Grid auto-fit 实现真正的固有响应式设计。',
    dashboardTitle: '仪表板小部件模式', dashboardDesc: '小部件根据占据的网格单元自适应。',
    themingTitle: '基于容器的主题', themingDesc: '使用样式容器查询从容器自定义属性继承视觉主题。',
    browserTitle: '浏览器支持', browserDesc: '容器查询在 2026 年有出色的浏览器支持。',
    fallbackTitle: '回退策略', fallbackDesc: '使用 @supports 提供优雅的回退。',
    perfTitle: '性能考虑', perfDesc: '了解包含有助于避免常见陷阱。',
    perf1: '包含创建新的堆叠上下文。', perf2: '避免在深层嵌套元素上不必要地设置 container-type。',
    perf3: '仅需要宽度查询时使用 inline-size。', perf4: '容器查询不会导致额外的布局过程。',
    perf5: '使用命名容器明确控制查询目标。',
    bestPracticesTitle: '最佳实践',
    bp1: '组件级使用容器查询，页面级使用媒体查询。', bp2: '从 inline-size 开始。',
    bp3: '命名容器以提高清晰度。', bp4: '使用容器查询单位实现流式排版。',
    bp5: '结合 CSS Grid 和 Flexbox。', bp6: '从最小到最大设计组件。',
    bp7: '使用 @supports 提供回退样式。',
    migrationTitle: '从媒体查询迁移', migrationDesc: '不需要替换所有媒体查询。使用此决策指南来确定使用哪种方法。',
    conclusionTitle: '总结',
    conclusionText: 'CSS 容器查询从根本上改变了我们对响应式设计的思考方式。我们现在可以设计响应容器上下文的组件。结合现代 CSS 布局技术，构建更模块化、可维护和真正响应式的设计系统。',
    faqTitle: '常见问题',
    faq1q: '容器查询和媒体查询有什么区别？', faq1a: '媒体查询响应视口大小，容器查询响应父容器元素的大小。',
    faq2q: '需要在每个父元素上设置 container-type 吗？', faq2a: '不需要。只在你想用作查询容器的元素上设置。',
    faq3q: '可以与 CSS Grid 和 Flexbox 一起使用吗？', faq3a: '可以。容器查询与它们无缝配合。',
    faq4q: 'inline-size 和 size 有什么区别？', faq4a: 'inline-size 仅在行内轴上创建包含，size 在两个轴上都创建包含。大多数情况下使用 inline-size。',
  },
  ja: {
    title: 'CSS コンテナクエリ：2026 完全ガイド',
    intro: 'CSS コンテナクエリはメディアクエリ以来のレスポンシブデザインにおける最も重要な進歩です。ビューポートサイズではなく、親コンテナのサイズに応答するコンポーネントを構築できます。',
    whatTitle: 'コンテナクエリとは？', whatDesc: 'コンテナクエリはビューポートではなく、コンテナ要素のサイズに基づいてスタイルを適用します。',
    vsMediaTitle: 'コンテナクエリ vs メディアクエリ', vsMediaDesc: 'メディアクエリはビューポートサイズにのみ応答します。コンテナクエリはこの制限を解決します。',
    containmentTitle: 'コンテインメントの理解', containmentDesc: 'コンテナクエリにはコンテインメントが必要です。',
    containmentTypesTitle: 'コンテインメントタイプ',
    syntaxTitle: 'コンテナクエリ構文', syntaxDesc: '基本構文は container-type でコンテナを定義し、@container でクエリを記述します。',
    containerNameTitle: '名前付きコンテナ', containerNameDesc: '特定の祖先をターゲットにするためにコンテナに名前を付けられます。',
    shorthandTitle: 'container ショートハンド', shorthandDesc: 'container-type と container-name を1つの宣言にまとめます。',
    unitsTitle: 'コンテナクエリ単位', unitsDesc: 'コンテナ寸法に相対的な新しい CSS 単位が導入されました。',
    practicalTitle: '実践例',
    cardTitle: 'レスポンシブカード', cardDesc: 'コンテナの空間に適応するカードコンポーネント。',
    navTitle: 'レスポンシブナビ', navDesc: 'コンテナ幅に基づいてレイアウトを切り替えるナビゲーション。',
    gridTitle: '適応グリッドアイテム', gridDesc: 'グリッド列幅に基づいてレイアウトを変更。',
    sidebarTitle: 'サイドバー対応コンポーネント', sidebarDesc: 'サイドバーとメインコンテンツで適応するコンポーネント。',
    styleQueriesTitle: 'スタイルコンテナクエリ', styleQueriesDesc: 'コンテナの計算されたスタイル値をクエリできます。',
    nestingTitle: 'ネストされたコンテナクエリ', nestingDesc: '複数の祖先コンテナに基づく複雑なレスポンシブ動作。',
    patternsTitle: 'デザインパターン',
    intrinsicTitle: '固有レスポンシブデザイン', intrinsicDesc: 'CSS Grid auto-fit と組み合わせます。',
    dashboardTitle: 'ダッシュボードウィジェット', dashboardDesc: 'グリッドセルに適応するウィジェットパターン。',
    themingTitle: 'コンテナベースのテーマ', themingDesc: 'カスタムプロパティからテーマを継承。',
    browserTitle: 'ブラウザサポート', browserDesc: '2026年時点で優れたブラウザサポート。',
    fallbackTitle: 'フォールバック戦略', fallbackDesc: '@supports で優雅なフォールバックを提供。',
    perfTitle: 'パフォーマンス考慮事項', perfDesc: 'コンテインメントの理解が重要です。',
    perf1: '新しいスタッキングコンテキストを作成。', perf2: '不要なネストを避ける。',
    perf3: '幅のみの場合は inline-size を使用。', perf4: '追加のレイアウトパスは発生しない。',
    perf5: '名前付きコンテナで制御。',
    bestPracticesTitle: 'ベストプラクティス',
    bp1: 'コンポーネントにコンテナクエリ、ページにメディアクエリ。', bp2: 'inline-size から始める。',
    bp3: 'コンテナに名前を付ける。', bp4: 'コンテナクエリ単位を使用。',
    bp5: 'Grid と Flexbox と組み合わせる。', bp6: 'モバイルファーストで設計。',
    bp7: '@supports でフォールバック。',
    migrationTitle: 'メディアクエリからの移行', migrationDesc: 'すべてのメディアクエリを置き換える必要はありません。',
    conclusionTitle: '結論',
    conclusionText: 'CSS コンテナクエリはレスポンシブデザインの考え方を根本的に変えます。モダンな CSS レイアウトテクニックと組み合わせて、よりモジュラーで保守しやすいデザインシステムを構築しましょう。',
    faqTitle: 'FAQ',
    faq1q: 'コンテナクエリとメディアクエリの違いは？', faq1a: 'メディアクエリはビューポート、コンテナクエリは親コンテナに応答します。',
    faq2q: 'すべての親要素に container-type が必要？', faq2a: 'いいえ。クエリコンテナにしたい要素のみに設定します。',
    faq3q: 'Grid や Flexbox と使える？', faq3a: 'はい、シームレスに動作します。',
    faq4q: 'inline-size と size の違いは？', faq4a: 'inline-size はインライン軸のみ、size は両軸にコンテインメントを作成します。',
  },
  ko: {
    title: 'CSS 컨테이너 쿼리: 2026 완전 가이드',
    intro: 'CSS 컨테이너 쿼리는 미디어 쿼리 이후 반응형 디자인에서 가장 중요한 발전입니다. 뷰포트 크기가 아닌 부모 컨테이너의 크기에 응답하는 컴포넌트를 구축할 수 있습니다.',
    whatTitle: '컨테이너 쿼리란?', whatDesc: '컨테이너 쿼리는 뷰포트가 아닌 포함 요소의 크기에 기반하여 스타일을 적용합니다.',
    vsMediaTitle: '컨테이너 쿼리 vs 미디어 쿼리', vsMediaDesc: '미디어 쿼리는 뷰포트 크기에만 응답합니다. 컨테이너 쿼리는 이 근본적 제한을 해결합니다.',
    containmentTitle: '컨테인먼트 이해', containmentDesc: '컨테이너 쿼리에는 컨테인먼트가 필요합니다.',
    containmentTypesTitle: '컨테인먼트 유형',
    syntaxTitle: '컨테이너 쿼리 구문', syntaxDesc: '기본 구문은 container-type으로 컨테이너를 정의하고 @container로 쿼리합니다.',
    containerNameTitle: '명명된 컨테이너', containerNameDesc: '특정 조상을 대상으로 컨테이너에 이름을 지정할 수 있습니다.',
    shorthandTitle: 'container 축약형', shorthandDesc: 'container-type과 container-name을 하나로 결합합니다.',
    unitsTitle: '컨테이너 쿼리 단위', unitsDesc: '컨테이너 크기에 상대적인 새로운 CSS 단위가 도입되었습니다.',
    practicalTitle: '실제 예제',
    cardTitle: '반응형 카드 컴포넌트', cardDesc: '컨테이너 공간에 적응하는 카드 컴포넌트.',
    navTitle: '반응형 내비게이션', navDesc: '컨테이너 너비에 따라 레이아웃을 전환하는 내비게이션.',
    gridTitle: '적응형 그리드 아이템', gridDesc: '그리드 열 너비에 따라 레이아웃을 변경.',
    sidebarTitle: '사이드바 인식 컴포넌트', sidebarDesc: '사이드바와 메인 콘텐츠에서 적응하는 컴포넌트.',
    styleQueriesTitle: '스타일 컨테이너 쿼리', styleQueriesDesc: '컨테이너의 계산된 스타일 값을 쿼리할 수 있습니다.',
    nestingTitle: '중첩된 컨테이너 쿼리', nestingDesc: '여러 조상 컨테이너에 기반한 복잡한 반응형 동작.',
    patternsTitle: '디자인 패턴',
    intrinsicTitle: '고유 반응형 디자인', intrinsicDesc: 'CSS Grid auto-fit과 결합합니다.',
    dashboardTitle: '대시보드 위젯 패턴', dashboardDesc: '그리드 셀에 적응하는 위젯 패턴.',
    themingTitle: '컨테이너 기반 테마', themingDesc: '커스텀 프로퍼티에서 테마를 상속.',
    browserTitle: '브라우저 지원', browserDesc: '2026년 기준 우수한 브라우저 지원.',
    fallbackTitle: '폴백 전략', fallbackDesc: '@supports로 우아한 폴백을 제공.',
    perfTitle: '성능 고려사항', perfDesc: '컨테인먼트 이해가 중요합니다.',
    perf1: '새로운 스태킹 컨텍스트를 생성.', perf2: '불필요한 중첩을 피함.',
    perf3: '너비만 필요하면 inline-size 사용.', perf4: '추가 레이아웃 패스 없음.',
    perf5: '명명된 컨테이너로 제어.',
    bestPracticesTitle: '모범 사례',
    bp1: '컴포넌트에 컨테이너 쿼리, 페이지에 미디어 쿼리.', bp2: 'inline-size부터 시작.',
    bp3: '컨테이너에 이름 지정.', bp4: '컨테이너 쿼리 단위 사용.',
    bp5: 'Grid와 Flexbox와 결합.', bp6: '모바일 퍼스트로 설계.',
    bp7: '@supports로 폴백.',
    migrationTitle: '미디어 쿼리에서 마이그레이션', migrationDesc: '모든 미디어 쿼리를 대체할 필요는 없습니다.',
    conclusionTitle: '결론',
    conclusionText: 'CSS 컨테이너 쿼리는 반응형 디자인에 대한 사고 방식을 근본적으로 변경합니다. 현대 CSS 레이아웃 기법과 결합하여 더 모듈화되고 유지보수 가능한 디자인 시스템을 구축하세요.',
    faqTitle: 'FAQ',
    faq1q: '컨테이너 쿼리와 미디어 쿼리의 차이는?', faq1a: '미디어 쿼리는 뷰포트, 컨테이너 쿼리는 부모 컨테이너에 응답합니다.',
    faq2q: '모든 부모 요소에 container-type이 필요한가요?', faq2a: '아닙니다. 쿼리 컨테이너로 사용할 요소에만 설정합니다.',
    faq3q: 'Grid나 Flexbox와 함께 사용할 수 있나요?', faq3a: '네, 완벽하게 작동합니다.',
    faq4q: 'inline-size와 size의 차이는?', faq4a: 'inline-size는 인라인 축만, size는 두 축 모두에 컨테인먼트를 생성합니다.',
  },
  fr: {
    title: 'CSS Container Queries : Le guide complet pour 2026',
    intro: 'Les CSS Container Queries représentent l\'avancée la plus significative en design responsive depuis les media queries. Les composants répondent à la taille de leur conteneur plutôt qu\'au viewport.',
    whatTitle: 'Qu\'est-ce que les Container Queries ?', whatDesc: 'Les container queries appliquent des styles basés sur la taille du conteneur parent, pas du viewport.',
    vsMediaTitle: 'Container Queries vs Media Queries', vsMediaDesc: 'Les media queries ne répondent qu\'à la taille du viewport.',
    containmentTitle: 'Comprendre le Containment', containmentDesc: 'Les container queries nécessitent un containment explicite.',
    containmentTypesTitle: 'Types de containment',
    syntaxTitle: 'Syntaxe des Container Queries', syntaxDesc: 'Deux parties : définir un conteneur et écrire des requêtes.',
    containerNameTitle: 'Conteneurs nommés', containerNameDesc: 'Nommez les conteneurs pour cibler des ancêtres spécifiques.',
    shorthandTitle: 'Raccourci container', shorthandDesc: 'Combine container-type et container-name.',
    unitsTitle: 'Unités Container Query', unitsDesc: 'Nouvelles unités CSS relatives au conteneur.',
    practicalTitle: 'Exemples pratiques',
    cardTitle: 'Carte responsive', cardDesc: 'Une carte qui s\'adapte à l\'espace disponible.',
    navTitle: 'Navigation responsive', navDesc: 'Navigation qui change de layout selon la largeur du conteneur.',
    gridTitle: 'Éléments de grille adaptatifs', gridDesc: 'Éléments qui changent selon la largeur de colonne.',
    sidebarTitle: 'Composants sensibles au sidebar', sidebarDesc: 'Composants qui s\'adaptent au contexte.',
    styleQueriesTitle: 'Style Container Queries', styleQueriesDesc: 'Interrogez les valeurs de style calculées.',
    nestingTitle: 'Container Queries imbriquées', nestingDesc: 'Comportement responsive complexe avec plusieurs conteneurs.',
    patternsTitle: 'Modèles de design',
    intrinsicTitle: 'Design intrinsèque', intrinsicDesc: 'Combinez avec CSS Grid auto-fit.',
    dashboardTitle: 'Widgets de dashboard', dashboardDesc: 'Widgets qui s\'adaptent à leur cellule.',
    themingTitle: 'Thème basé sur le conteneur', themingDesc: 'Héritez du thème via des propriétés personnalisées.',
    browserTitle: 'Support navigateur', browserDesc: 'Excellent support en 2026.',
    fallbackTitle: 'Stratégies de fallback', fallbackDesc: 'Utilisez @supports pour les fallbacks.',
    perfTitle: 'Performance', perfDesc: 'Comprendre le containment est important.',
    perf1: 'Crée un nouveau contexte d\'empilement.', perf2: 'Évitez le nesting inutile.',
    perf3: 'Utilisez inline-size quand possible.', perf4: 'Pas de passes de layout supplémentaires.',
    perf5: 'Utilisez des conteneurs nommés.',
    bestPracticesTitle: 'Bonnes pratiques',
    bp1: 'Container queries pour composants, media queries pour pages.', bp2: 'Commencez par inline-size.',
    bp3: 'Nommez vos conteneurs.', bp4: 'Utilisez les unités container query.',
    bp5: 'Combinez avec Grid et Flexbox.', bp6: 'Concevez du plus petit au plus grand.',
    bp7: 'Fallbacks avec @supports.',
    migrationTitle: 'Migration depuis les media queries', migrationDesc: 'Pas besoin de tout remplacer.',
    conclusionTitle: 'Conclusion',
    conclusionText: 'Les Container Queries changent fondamentalement le design responsive. Construisez des systèmes de design modulaires et maintenables.',
    faqTitle: 'FAQ',
    faq1q: 'Différence entre container et media queries ?', faq1a: 'Media queries : viewport. Container queries : conteneur parent.',
    faq2q: 'container-type sur chaque parent ?', faq2a: 'Non, seulement sur les éléments conteneurs.',
    faq3q: 'Compatible avec Grid/Flexbox ?', faq3a: 'Oui, parfaitement.',
    faq4q: 'inline-size vs size ?', faq4a: 'inline-size : axe inline uniquement. size : les deux axes.',
  },
  de: {
    title: 'CSS Container Queries: Der vollständige Guide für 2026',
    intro: 'CSS Container Queries sind der bedeutendste Fortschritt im responsiven Design seit Media Queries. Komponenten reagieren auf die Größe ihres Containers statt des Viewports.',
    whatTitle: 'Was sind Container Queries?', whatDesc: 'Container Queries wenden Styles basierend auf der Container-Größe an.',
    vsMediaTitle: 'Container Queries vs Media Queries', vsMediaDesc: 'Media Queries reagieren nur auf die Viewport-Größe.',
    containmentTitle: 'Containment verstehen', containmentDesc: 'Container Queries erfordern explizites Containment.',
    containmentTypesTitle: 'Containment-Typen',
    syntaxTitle: 'Container Query Syntax', syntaxDesc: 'Zwei Teile: Container definieren und Queries schreiben.',
    containerNameTitle: 'Benannte Container', containerNameDesc: 'Container benennen für gezielte Ancestor-Abfragen.',
    shorthandTitle: 'container Kurzschreibweise', shorthandDesc: 'Kombiniert container-type und container-name.',
    unitsTitle: 'Container Query Einheiten', unitsDesc: 'Neue CSS-Einheiten relativ zum Container.',
    practicalTitle: 'Praktische Beispiele',
    cardTitle: 'Responsive Karte', cardDesc: 'Eine Karte, die sich an den verfügbaren Platz anpasst.',
    navTitle: 'Responsive Navigation', navDesc: 'Navigation, die ihr Layout nach Container-Breite ändert.',
    gridTitle: 'Adaptive Grid-Elemente', gridDesc: 'Elemente, die ihr Layout nach Spaltenbreite ändern.',
    sidebarTitle: 'Sidebar-bewusste Komponenten', sidebarDesc: 'Komponenten, die sich an den Kontext anpassen.',
    styleQueriesTitle: 'Style Container Queries', styleQueriesDesc: 'Berechnete Stilwerte abfragen.',
    nestingTitle: 'Verschachtelte Container Queries', nestingDesc: 'Komplexes responsives Verhalten mit mehreren Containern.',
    patternsTitle: 'Design-Muster',
    intrinsicTitle: 'Intrinsisches Design', intrinsicDesc: 'Mit CSS Grid auto-fit kombinieren.',
    dashboardTitle: 'Dashboard-Widgets', dashboardDesc: 'Widgets, die sich an ihre Zelle anpassen.',
    themingTitle: 'Container-basiertes Theming', themingDesc: 'Theme über Custom Properties erben.',
    browserTitle: 'Browser-Unterstützung', browserDesc: 'Hervorragender Support im Jahr 2026.',
    fallbackTitle: 'Fallback-Strategien', fallbackDesc: '@supports für Fallbacks verwenden.',
    perfTitle: 'Performance', perfDesc: 'Containment-Verständnis ist wichtig.',
    perf1: 'Erstellt neuen Stacking Context.', perf2: 'Unnötiges Nesting vermeiden.',
    perf3: 'inline-size wenn möglich.', perf4: 'Keine zusätzlichen Layout-Passes.',
    perf5: 'Benannte Container verwenden.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Container Queries für Komponenten, Media Queries für Seiten.', bp2: 'Mit inline-size beginnen.',
    bp3: 'Container benennen.', bp4: 'Container Query Einheiten nutzen.',
    bp5: 'Mit Grid und Flexbox kombinieren.', bp6: 'Mobile-first designen.',
    bp7: 'Fallbacks mit @supports.',
    migrationTitle: 'Migration von Media Queries', migrationDesc: 'Nicht alle Media Queries müssen ersetzt werden.',
    conclusionTitle: 'Fazit',
    conclusionText: 'CSS Container Queries verändern responsives Design grundlegend. Bauen Sie modulare, wartbare Designsysteme.',
    faqTitle: 'FAQ',
    faq1q: 'Unterschied Container vs Media Queries?', faq1a: 'Media Queries: Viewport. Container Queries: Eltern-Container.',
    faq2q: 'container-type auf jedem Eltern-Element?', faq2a: 'Nein, nur auf Container-Elementen.',
    faq3q: 'Mit Grid/Flexbox kompatibel?', faq3a: 'Ja, nahtlos.',
    faq4q: 'inline-size vs size?', faq4a: 'inline-size: nur Inline-Achse. size: beide Achsen.',
  },
  es: {
    title: 'CSS Container Queries: La guía completa para 2026',
    intro: 'CSS Container Queries representan el avance más significativo en diseño responsive desde los media queries. Los componentes responden al tamaño de su contenedor, no del viewport.',
    whatTitle: '¿Qué son los Container Queries?', whatDesc: 'Los container queries aplican estilos basados en el tamaño del contenedor padre.',
    vsMediaTitle: 'Container Queries vs Media Queries', vsMediaDesc: 'Los media queries solo responden al tamaño del viewport.',
    containmentTitle: 'Entendiendo el Containment', containmentDesc: 'Los container queries requieren containment explícito.',
    containmentTypesTitle: 'Tipos de containment',
    syntaxTitle: 'Sintaxis de Container Queries', syntaxDesc: 'Dos partes: definir un contenedor y escribir queries.',
    containerNameTitle: 'Contenedores nombrados', containerNameDesc: 'Nombrar contenedores para apuntar a ancestros específicos.',
    shorthandTitle: 'Atajo container', shorthandDesc: 'Combina container-type y container-name.',
    unitsTitle: 'Unidades Container Query', unitsDesc: 'Nuevas unidades CSS relativas al contenedor.',
    practicalTitle: 'Ejemplos prácticos',
    cardTitle: 'Tarjeta responsive', cardDesc: 'Una tarjeta que se adapta al espacio disponible.',
    navTitle: 'Navegación responsive', navDesc: 'Navegación que cambia su layout según el ancho del contenedor.',
    gridTitle: 'Elementos de grid adaptativos', gridDesc: 'Elementos que cambian según el ancho de columna.',
    sidebarTitle: 'Componentes conscientes del sidebar', sidebarDesc: 'Componentes que se adaptan al contexto.',
    styleQueriesTitle: 'Style Container Queries', styleQueriesDesc: 'Consultar valores de estilo calculados.',
    nestingTitle: 'Container Queries anidados', nestingDesc: 'Comportamiento responsive complejo con múltiples contenedores.',
    patternsTitle: 'Patrones de diseño',
    intrinsicTitle: 'Diseño intrínseco', intrinsicDesc: 'Combinar con CSS Grid auto-fit.',
    dashboardTitle: 'Widgets de dashboard', dashboardDesc: 'Widgets que se adaptan a su celda.',
    themingTitle: 'Temas basados en contenedor', themingDesc: 'Heredar tema de propiedades personalizadas.',
    browserTitle: 'Soporte del navegador', browserDesc: 'Excelente soporte en 2026.',
    fallbackTitle: 'Estrategias de fallback', fallbackDesc: 'Usar @supports para fallbacks.',
    perfTitle: 'Rendimiento', perfDesc: 'Entender el containment es importante.',
    perf1: 'Crea nuevo contexto de apilamiento.', perf2: 'Evitar anidamiento innecesario.',
    perf3: 'Usar inline-size cuando sea posible.', perf4: 'Sin pases de layout adicionales.',
    perf5: 'Usar contenedores nombrados.',
    bestPracticesTitle: 'Mejores prácticas',
    bp1: 'Container queries para componentes, media queries para páginas.', bp2: 'Empezar con inline-size.',
    bp3: 'Nombrar contenedores.', bp4: 'Usar unidades container query.',
    bp5: 'Combinar con Grid y Flexbox.', bp6: 'Diseñar de menor a mayor.',
    bp7: 'Fallbacks con @supports.',
    migrationTitle: 'Migración desde media queries', migrationDesc: 'No es necesario reemplazar todos los media queries.',
    conclusionTitle: 'Conclusión',
    conclusionText: 'CSS Container Queries cambian fundamentalmente el diseño responsive. Construya sistemas de diseño modulares y mantenibles.',
    faqTitle: 'FAQ',
    faq1q: '¿Diferencia entre container y media queries?', faq1a: 'Media queries: viewport. Container queries: contenedor padre.',
    faq2q: '¿container-type en cada padre?', faq2a: 'No, solo en los elementos contenedor.',
    faq3q: '¿Compatible con Grid/Flexbox?', faq3a: 'Sí, perfectamente.',
    faq4q: '¿inline-size vs size?', faq4a: 'inline-size: solo eje inline. size: ambos ejes.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };

export default function CssContainerQueriesGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <article style={{ maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={pStyle}>{t.intro}</p>

      {/* What Are Container Queries */}
      <h2 style={h2Style}>{t.whatTitle}</h2>
      <p style={pStyle}>{t.whatDesc}</p>
      <pre style={codeStyle}><code>{`/* The Problem: A card component in different contexts */

/* In main content (800px wide) → horizontal layout */
/* In sidebar (300px wide) → vertical layout */
/* In footer (200px wide) → minimal layout */

/* With media queries, you cannot distinguish these contexts
   because they all exist at the same viewport width.

   With container queries, each container context triggers
   different styles automatically. */`}</code></pre>

      {/* vs Media Queries */}
      <h2 style={h2Style}>{t.vsMediaTitle}</h2>
      <p style={pStyle}>{t.vsMediaDesc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>Media Queries</th>
            <th style={thStyle}>Container Queries</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Responds to', 'Viewport size', 'Container size'],
            ['Scope', 'Global (page-level)', 'Local (component-level)'],
            ['Reusability', 'Breaks in different contexts', 'Works in any context'],
            ['Use case', 'Page layout', 'Component layout'],
            ['Units', 'vw, vh, vmin, vmax', 'cqw, cqh, cqi, cqb'],
            ['Browser support', 'Universal', 'All modern browsers (2023+)'],
          ].map(([feature, mq, cq], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
              <td style={tdStyle}>{mq}</td>
              <td style={tdStyle}>{cq}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Containment */}
      <h2 style={h2Style}>{t.containmentTitle}</h2>
      <p style={pStyle}>{t.containmentDesc}</p>
      <h3 style={h3Style}>{t.containmentTypesTitle}</h3>
      <pre style={codeStyle}><code>{`/* container-type values */

/* inline-size: Containment on the inline axis only (width) */
/* Most common — use this in most cases */
.card-wrapper {
  container-type: inline-size;
}

/* size: Containment on both inline and block axes (width + height) */
/* Use when you need to query both dimensions */
.widget-wrapper {
  container-type: size;
}

/* normal (default): No containment — cannot be queried */
.regular-div {
  container-type: normal; /* This is the default */
}

/* IMPORTANT: container-type: size prevents auto-height behavior.
   The element will not grow to fit its content on the block axis.
   Use inline-size unless you specifically need height queries. */`}</code></pre>

      {/* Syntax */}
      <h2 style={h2Style}>{t.syntaxTitle}</h2>
      <p style={pStyle}>{t.syntaxDesc}</p>
      <pre style={codeStyle}><code>{`/* Step 1: Define a container */
.card-container {
  container-type: inline-size;
}

/* Step 2: Write container queries */
.card {
  /* Default styles (smallest) */
  display: grid;
  gap: 12px;
  padding: 16px;
}

.card__image {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  object-fit: cover;
}

.card__title {
  font-size: 1rem;
  font-weight: 700;
}

/* When container is at least 400px wide */
@container (min-width: 400px) {
  .card {
    grid-template-columns: 200px 1fr;
    align-items: center;
  }
  .card__title {
    font-size: 1.25rem;
  }
}

/* When container is at least 600px wide */
@container (min-width: 600px) {
  .card {
    grid-template-columns: 280px 1fr;
    gap: 24px;
    padding: 24px;
  }
  .card__title {
    font-size: 1.5rem;
  }
  .card__description {
    display: block; /* Show description only in wide containers */
  }
}`}</code></pre>

      {/* Named Containers */}
      <h2 style={h2Style}>{t.containerNameTitle}</h2>
      <p style={pStyle}>{t.containerNameDesc}</p>
      <pre style={codeStyle}><code>{`/* Name containers to target specific ancestors */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

.main-content {
  container-type: inline-size;
  container-name: main;
}

/* Query a specific named container */
@container sidebar (max-width: 300px) {
  .widget {
    font-size: 0.875rem;
  }
}

@container main (min-width: 800px) {
  .article-card {
    grid-template-columns: 1fr 1fr;
  }
}

/* Without a name, @container queries the NEAREST ancestor
   with containment. Named queries skip to the named container. */`}</code></pre>

      {/* Shorthand */}
      <h3 style={h3Style}>{t.shorthandTitle}</h3>
      <p style={pStyle}>{t.shorthandDesc}</p>
      <pre style={codeStyle}><code>{`/* Shorthand: container: <name> / <type> */
.sidebar {
  container: sidebar / inline-size;
}

/* Equivalent to: */
.sidebar {
  container-name: sidebar;
  container-type: inline-size;
}

/* Multiple names (for querying by either name) */
.widget-area {
  container: widget-area panel / inline-size;
}`}</code></pre>

      {/* Container Query Units */}
      <h2 style={h2Style}>{t.unitsTitle}</h2>
      <p style={pStyle}>{t.unitsDesc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Unit</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Equivalent</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['cqw', '1% of container width', 'Similar to vw for viewport'],
            ['cqh', '1% of container height', 'Similar to vh for viewport'],
            ['cqi', '1% of container inline size', 'Width in horizontal writing'],
            ['cqb', '1% of container block size', 'Height in horizontal writing'],
            ['cqmin', 'Smaller of cqi and cqb', 'Similar to vmin'],
            ['cqmax', 'Larger of cqi and cqb', 'Similar to vmax'],
          ].map(([unit, desc, equiv], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{unit}</td>
              <td style={tdStyle}>{desc}</td>
              <td style={tdStyle}>{equiv}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre style={codeStyle}><code>{`/* Fluid typography with container query units */
.card-title {
  /* Font size scales with container width */
  /* Minimum 1rem, maximum 2rem, scales at 5cqi */
  font-size: clamp(1rem, 5cqi, 2rem);
}

.card-padding {
  /* Responsive padding based on container */
  padding: clamp(12px, 4cqi, 32px);
}

.hero-text {
  /* Large text that scales with its container */
  font-size: clamp(2rem, 8cqi, 5rem);
  line-height: 1.1;
}`}</code></pre>

      {/* Practical Examples */}
      <h2 style={h2Style}>{t.practicalTitle}</h2>

      <h3 style={h3Style}>{t.cardTitle}</h3>
      <p style={pStyle}>{t.cardDesc}</p>
      <pre style={codeStyle}><code>{`/* Responsive card component */
.card-container {
  container: card / inline-size;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
}

.card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
}

.card__meta {
  display: none; /* Hidden in small containers */
}

.card__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Medium card (400px+) — side-by-side layout */
@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    align-items: flex-start;
  }
  .card__image {
    width: 180px;
    flex-shrink: 0;
    aspect-ratio: 1;
  }
  .card__meta {
    display: flex;
    gap: 12px;
    font-size: 0.875rem;
    color: var(--text-muted);
  }
}

/* Large card (700px+) — featured layout */
@container card (min-width: 700px) {
  .card {
    flex-direction: column;
    padding: 0;
    overflow: hidden;
  }
  .card__image {
    width: 100%;
    height: 300px;
    border-radius: 0;
  }
  .card__content {
    padding: 24px;
  }
  .card__title {
    font-size: 1.75rem;
  }
}`}</code></pre>

      <h3 style={h3Style}>{t.navTitle}</h3>
      <p style={pStyle}>{t.navDesc}</p>
      <pre style={codeStyle}><code>{`/* Navigation that adapts to its container */
.nav-container {
  container: nav / inline-size;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav__item {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
}

.nav__item-icon {
  display: none;
}

/* Horizontal layout when container is wide enough */
@container nav (min-width: 500px) {
  .nav {
    flex-direction: row;
    gap: 8px;
  }
  .nav__item {
    white-space: nowrap;
  }
}

/* Show icons when there is more space */
@container nav (min-width: 700px) {
  .nav__item-icon {
    display: inline-flex;
    margin-right: 6px;
  }
  .nav__item {
    padding: 10px 16px;
  }
}`}</code></pre>

      <h3 style={h3Style}>{t.gridTitle}</h3>
      <p style={pStyle}>{t.gridDesc}</p>
      <pre style={codeStyle}><code>{`/* Grid items that adapt to their column width */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

/* Each grid item is a container */
.grid__item {
  container: grid-item / inline-size;
}

.product {
  text-align: center;
  padding: 16px;
}

.product__price {
  font-size: 1.5rem;
  font-weight: 700;
}

.product__details {
  display: none;
}

@container grid-item (min-width: 350px) {
  .product {
    display: grid;
    grid-template-columns: 120px 1fr;
    text-align: left;
    gap: 16px;
  }
  .product__details {
    display: block;
  }
}`}</code></pre>

      {/* Style Queries */}
      <h2 style={h2Style}>{t.styleQueriesTitle}</h2>
      <p style={pStyle}>{t.styleQueriesDesc}</p>
      <pre style={codeStyle}><code>{`/* Style container queries — query computed style values */

/* Define a container with a custom property */
.theme-container {
  container-type: normal; /* No size containment needed for style queries */
  --theme: light;
}

.theme-container.dark {
  --theme: dark;
}

/* Query the custom property value */
@container style(--theme: dark) {
  .card {
    background: #1a1a2e;
    color: #e0e0e0;
    border-color: #333;
  }
  .button {
    background: #4a90d9;
    color: white;
  }
}

@container style(--theme: light) {
  .card {
    background: #ffffff;
    color: #333;
    border-color: #e0e0e0;
  }
}

/* Practical use: component variants via CSS properties */
.alert-container {
  --variant: info;
}

@container style(--variant: error) {
  .alert {
    background: #fef2f2;
    border-left: 4px solid #ef4444;
    color: #991b1b;
  }
}

@container style(--variant: success) {
  .alert {
    background: #f0fdf4;
    border-left: 4px solid #22c55e;
    color: #166534;
  }
}`}</code></pre>

      {/* Nesting */}
      <h2 style={h2Style}>{t.nestingTitle}</h2>
      <p style={pStyle}>{t.nestingDesc}</p>
      <pre style={codeStyle}><code>{`/* Nested container queries */
.page {
  container: page / inline-size;
}

.sidebar {
  container: sidebar / inline-size;
}

/* Different behavior based on multiple container sizes */
@container page (min-width: 1200px) {
  .sidebar {
    width: 350px;
  }
}

@container sidebar (max-width: 250px) {
  .sidebar-widget {
    font-size: 0.875rem;
    padding: 8px;
  }
  .sidebar-widget__title {
    font-size: 1rem;
  }
}

@container sidebar (min-width: 300px) {
  .sidebar-widget {
    padding: 16px;
  }
  .sidebar-widget__chart {
    display: block;
  }
}`}</code></pre>

      {/* Design Patterns */}
      <h2 style={h2Style}>{t.patternsTitle}</h2>

      <h3 style={h3Style}>{t.intrinsicTitle}</h3>
      <p style={pStyle}>{t.intrinsicDesc}</p>
      <pre style={codeStyle}><code>{`/* Intrinsic design: Grid + Container Queries */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.auto-grid > * {
  container-type: inline-size;
}

/* Items automatically adapt as the grid reflows */
/* No breakpoints needed — the grid column width drives the layout */
@container (min-width: 400px) {
  .feature-card {
    grid-template-columns: auto 1fr;
  }
}

@container (min-width: 500px) {
  .feature-card__description {
    font-size: 1.125rem;
  }
}`}</code></pre>

      <h3 style={h3Style}>{t.dashboardTitle}</h3>
      <p style={pStyle}>{t.dashboardDesc}</p>
      <pre style={codeStyle}><code>{`/* Dashboard widget pattern */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.dashboard__cell {
  container: widget / inline-size;
}

.widget {
  padding: 16px;
  border-radius: 12px;
  background: var(--widget-bg);
}

.widget__chart {
  height: 150px;
}

.widget__table {
  display: none; /* Hidden in small widgets */
}

@container widget (min-width: 400px) {
  .widget__chart {
    height: 200px;
  }
  .widget__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
}

@container widget (min-width: 600px) {
  .widget {
    padding: 24px;
  }
  .widget__table {
    display: table;
  }
  .widget__chart {
    height: 280px;
  }
}`}</code></pre>

      {/* Browser Support and Fallbacks */}
      <h2 style={h2Style}>{t.browserTitle}</h2>
      <p style={pStyle}>{t.browserDesc}</p>

      <h3 style={h3Style}>{t.fallbackTitle}</h3>
      <p style={pStyle}>{t.fallbackDesc}</p>
      <pre style={codeStyle}><code>{`/* Graceful fallback with @supports */
.card-container {
  /* Fallback: use media queries */
}

@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
  }
}

/* Fallback styles using media queries */
@media (min-width: 768px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}

/* Container query override (when supported) */
@container (min-width: 400px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}`}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{t.perfTitle}</h2>
      <p style={pStyle}>{t.perfDesc}</p>
      <ul style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: 24 }}>
        <li>{t.perf1}</li>
        <li>{t.perf2}</li>
        <li>{t.perf3}</li>
        <li>{t.perf4}</li>
        <li>{t.perf5}</li>
      </ul>

      {/* Best Practices */}
      <h2 style={h2Style}>{t.bestPracticesTitle}</h2>
      <ol style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: 24 }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
        <li>{t.bp6}</li>
        <li>{t.bp7}</li>
      </ol>

      {/* Migration */}
      <h2 style={h2Style}>{t.migrationTitle}</h2>
      <p style={pStyle}>{t.migrationDesc}</p>
      <pre style={codeStyle}><code>{`/* Decision Guide: Container Query vs Media Query */

/* USE CONTAINER QUERIES when:
   ✅ Component is reused in different layout contexts
   ✅ Component goes in sidebars, modals, grids, etc.
   ✅ You need component-level responsive behavior
   ✅ The component's layout depends on available space

   USE MEDIA QUERIES when:
   ✅ Changing the overall page layout
   ✅ Showing/hiding entire sections
   ✅ Adjusting global typography or spacing
   ✅ Changing navigation from desktop to mobile
   ✅ Print stylesheets

   USE BOTH when:
   ✅ Page layout switches at viewport breakpoints (media query)
   ✅ Components within the layout adapt to their containers (container query)
*/`}</code></pre>

      {/* Conclusion */}
      <h2 style={h2Style}>{t.conclusionTitle}</h2>
      <p style={pStyle}>{t.conclusionText}</p>

      {/* FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </article>
  );
}
