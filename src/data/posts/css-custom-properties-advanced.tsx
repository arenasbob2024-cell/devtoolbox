'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Advanced CSS Custom Properties: Theming, Component Variants, and JavaScript Interop',
    intro: 'CSS Custom Properties (CSS variables) have matured far beyond simple color swapping. In 2026, they power dynamic theming systems, component state management, calculated layouts, and real-time JavaScript interop. This guide explores the <strong>advanced patterns</strong> that make CSS Custom Properties one of the most powerful features in modern CSS.',
    h2Basics: 'Custom Properties Fundamentals',
    basicsP1: 'Custom properties are defined with a -- prefix and accessed with the var() function. They cascade, inherit, and can be overridden at any scope — making them fundamentally different from preprocessor variables like SASS $variables.',
    h2Theming: 'Design Token Theming Systems',
    themingP1: 'The most powerful use of custom properties is building a complete design token system that supports multiple themes with zero JavaScript.',
    h2Components: 'Component Variants with Custom Properties',
    componentsP1: 'Custom properties enable component variant systems that are more flexible than traditional utility class approaches. The component defines sensible defaults; callers override them at the component scope.',
    h2JsInterop: 'JavaScript Interoperability',
    jsInteropP1: 'Custom properties bridge CSS and JavaScript seamlessly. You can read and write them from JavaScript, enabling dynamic animations, real-time updates, and reactive UIs without class toggling.',
    h2Responsive: 'Responsive Design with Custom Properties',
    responsiveP1: 'Custom properties enable fluid typography and spacing systems that go beyond simple breakpoints.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Are CSS Custom Properties the same as SASS variables?',
    faq1A: 'No, they are fundamentally different. SASS variables are compiled at build time and produce static CSS. CSS Custom Properties exist at runtime in the browser, cascade through the DOM like any CSS property, can be changed with JavaScript, and can be inspected in DevTools.',
    faq2Q: 'Can CSS Custom Properties be animated?',
    faq2A: 'Yes, when used with @property (Houdini). The @property rule lets you declare custom properties with a specific type (color, length, integer, etc.), enabling smooth animations. Without @property, custom properties animate by switching values at the start/end, not interpolating.',
    faq3Q: 'What is the fallback value in var()?',
    faq3A: 'The second argument to var() is a fallback used when the property is not defined or invalid. Example: var(--color-primary, #0066cc) will use #0066cc if --color-primary is not set. You can nest var() in fallbacks: var(--spacing-custom, var(--spacing-base, 16px)).',
    faq4Q: 'Do CSS Custom Properties work in all modern browsers?',
    faq4A: 'Yes, CSS Custom Properties have full browser support since 2017 (Chrome 49+, Firefox 31+, Safari 9.1+). The @property Houdini rule has slightly less support but works in all major browsers as of 2024.',
    relatedTitle: 'Related Tools',
  },
  fr: {
    title: 'Propriétés CSS personnalisées avancées : theming, variantes et interop JavaScript',
    intro: 'Les propriétés CSS personnalisées ont évolué bien au-delà du simple remplacement de couleurs. Ce guide explore les <strong>patterns avancés</strong> qui font des propriétés CSS l\'une des fonctionnalités les plus puissantes du CSS moderne.',
    h2Basics: 'Fondamentaux des propriétés personnalisées',
    basicsP1: 'Les propriétés personnalisées sont définies avec le préfixe -- et accédées avec la fonction var(). Elles héritent et peuvent être remplacées dans n\'importe quelle portée.',
    h2Theming: 'Systèmes de theming avec design tokens',
    themingP1: 'L\'utilisation la plus puissante des propriétés personnalisées est la construction d\'un système complet de design tokens supportant plusieurs thèmes sans JavaScript.',
    h2Components: 'Variantes de composants avec propriétés personnalisées',
    componentsP1: 'Les propriétés personnalisées permettent des systèmes de variantes de composants plus flexibles que les classes utilitaires traditionnelles.',
    h2JsInterop: 'Interopérabilité JavaScript',
    jsInteropP1: 'Les propriétés personnalisées servent de pont entre CSS et JavaScript. Vous pouvez les lire et les écrire depuis JavaScript.',
    h2Responsive: 'Design responsive avec propriétés personnalisées',
    responsiveP1: 'Les propriétés personnalisées permettent des systèmes de typographie et d\'espacement fluides.',
    h2Faq: 'Questions fréquentes',
    faq1Q: 'Les propriétés CSS personnalisées sont-elles identiques aux variables SASS ?',
    faq1A: 'Non, elles sont fondamentalement différentes. Les variables SASS sont compilées à la construction. Les propriétés CSS existent à l\'exécution et peuvent être modifiées avec JavaScript.',
    faq2Q: 'Les propriétés CSS personnalisées peuvent-elles être animées ?',
    faq2A: 'Oui, avec @property (Houdini). La règle @property permet de déclarer des propriétés avec un type spécifique, activant des animations fluides.',
    faq3Q: 'Qu\'est-ce que la valeur de repli dans var() ?',
    faq3A: 'Le deuxième argument de var() est un repli utilisé quand la propriété n\'est pas définie. Exemple : var(--color-primary, #0066cc).',
    faq4Q: 'Les propriétés CSS personnalisées fonctionnent-elles dans tous les navigateurs modernes ?',
    faq4A: 'Oui, support complet depuis 2017 dans tous les navigateurs modernes.',
    relatedTitle: 'Outils associés',
  },
  de: {
    title: 'Erweiterte CSS Custom Properties: Theming, Komponentenvarianten und JavaScript-Interop',
    intro: 'CSS Custom Properties sind weit über einfachen Farbwechsel hinausgegangen. Dieser Leitfaden untersucht die <strong>fortgeschrittenen Muster</strong>, die CSS Custom Properties zu einem der mächtigsten Features in modernem CSS machen.',
    h2Basics: 'Grundlagen der Custom Properties',
    basicsP1: 'Custom Properties werden mit dem -- Präfix definiert und mit der var()-Funktion aufgerufen. Sie vererben sich und können in jedem Scope überschrieben werden.',
    h2Theming: 'Design-Token-Theming-Systeme',
    themingP1: 'Die leistungsstärkste Verwendung von Custom Properties ist der Aufbau eines vollständigen Design-Token-Systems, das mehrere Themes ohne JavaScript unterstützt.',
    h2Components: 'Komponentenvarianten mit Custom Properties',
    componentsP1: 'Custom Properties ermöglichen flexiblere Komponentenvarianten-Systeme als traditionelle Utility-Klassen.',
    h2JsInterop: 'JavaScript-Interoperabilität',
    jsInteropP1: 'Custom Properties verbinden CSS und JavaScript nahtlos. Sie können sie von JavaScript aus lesen und schreiben.',
    h2Responsive: 'Responsives Design mit Custom Properties',
    responsiveP1: 'Custom Properties ermöglichen flüssige Typografie- und Abstandssysteme.',
    h2Faq: 'Häufig gestellte Fragen',
    faq1Q: 'Sind CSS Custom Properties dasselbe wie SASS-Variablen?',
    faq1A: 'Nein, sie sind grundlegend verschieden. SASS-Variablen werden zur Build-Zeit kompiliert. CSS Custom Properties existieren zur Laufzeit und können mit JavaScript geändert werden.',
    faq2Q: 'Können CSS Custom Properties animiert werden?',
    faq2A: 'Ja, mit @property (Houdini). Die @property-Regel ermöglicht fließende Animationen.',
    faq3Q: 'Was ist der Fallback-Wert in var()?',
    faq3A: 'Das zweite Argument von var() ist ein Fallback, wenn die Eigenschaft nicht definiert ist.',
    faq4Q: 'Funktionieren CSS Custom Properties in allen modernen Browsern?',
    faq4A: 'Ja, volle Browserunterstützung seit 2017.',
    relatedTitle: 'Verwandte Tools',
  },
  it: { title: 'Proprietà CSS personalizzate avanzate: theming, varianti e interop JavaScript', intro: 'Le proprietà CSS personalizzate sono cresciute ben oltre il semplice cambio di colori. Questa guida esplora i <strong>pattern avanzati</strong> che rendono le proprietà CSS una delle funzionalità più potenti del CSS moderno.', h2Basics: 'Fondamenti delle proprietà personalizzate', basicsP1: 'Le proprietà personalizzate sono definite con il prefisso -- e accessibili con la funzione var().', h2Theming: 'Sistemi di theming con design token', themingP1: 'L\'uso più potente delle proprietà personalizzate è costruire un sistema completo di design token.', h2Components: 'Varianti di componenti con proprietà personalizzate', componentsP1: 'Le proprietà personalizzate abilitano sistemi di varianti di componenti più flessibili.', h2JsInterop: 'Interoperabilità JavaScript', jsInteropP1: 'Le proprietà personalizzate collegano CSS e JavaScript in modo fluido.', h2Responsive: 'Design responsive con proprietà personalizzate', responsiveP1: 'Le proprietà personalizzate abilitano sistemi di tipografia fluida.', h2Faq: 'Domande frequenti', faq1Q: 'Le proprietà CSS personalizzate sono uguali alle variabili SASS?', faq1A: 'No, sono fondamentalmente diverse. Le variabili SASS vengono compilate in fase di build. Le proprietà CSS esistono a runtime.', faq2Q: 'Le proprietà CSS personalizzate possono essere animate?', faq2A: 'Sì, con @property (Houdini).', faq3Q: 'Cos\'è il valore di fallback in var()?', faq3A: 'Il secondo argomento di var() è un fallback usato quando la proprietà non è definita.', faq4Q: 'Funzionano in tutti i browser moderni?', faq4A: 'Sì, supporto completo dal 2017.', relatedTitle: 'Strumenti correlati' },
  es: { title: 'Propiedades CSS personalizadas avanzadas: theming, variantes y interop JavaScript', intro: 'Las propiedades CSS personalizadas han evolucionado mucho mas alla del simple intercambio de colores. Esta guia explora los <strong>patrones avanzados</strong> que hacen de las propiedades CSS una de las caracteristicas mas potentes del CSS moderno.', h2Basics: 'Fundamentos de propiedades personalizadas', basicsP1: 'Las propiedades personalizadas se definen con el prefijo -- y se acceden con la funcion var().', h2Theming: 'Sistemas de theming con design tokens', themingP1: 'El uso mas poderoso de las propiedades personalizadas es construir un sistema completo de design tokens.', h2Components: 'Variantes de componentes con propiedades personalizadas', componentsP1: 'Las propiedades personalizadas habilitan sistemas de variantes de componentes mas flexibles.', h2JsInterop: 'Interoperabilidad JavaScript', jsInteropP1: 'Las propiedades personalizadas conectan CSS y JavaScript sin problemas.', h2Responsive: 'Diseno responsive con propiedades personalizadas', responsiveP1: 'Las propiedades personalizadas habilitan sistemas de tipografia fluida.', h2Faq: 'Preguntas frecuentes', faq1Q: 'Son las propiedades CSS personalizadas lo mismo que las variables SASS?', faq1A: 'No, son fundamentalmente diferentes. Las variables SASS se compilan en tiempo de construccion.', faq2Q: 'Pueden animarse las propiedades CSS personalizadas?', faq2A: 'Si, con @property (Houdini).', faq3Q: 'Que es el valor de respaldo en var()?', faq3A: 'El segundo argumento de var() es un respaldo cuando la propiedad no esta definida.', faq4Q: 'Funcionan en todos los navegadores modernos?', faq4A: 'Si, soporte completo desde 2017.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Propriedades CSS personalizadas avançadas: theming, variantes e interop JavaScript', intro: 'As propriedades CSS personalizadas evoluíram muito além da simples troca de cores. Este guia explora os <strong>padrões avançados</strong> que tornam as propriedades CSS um dos recursos mais poderosos do CSS moderno.', h2Basics: 'Fundamentos das propriedades personalizadas', basicsP1: 'As propriedades personalizadas são definidas com o prefixo -- e acessadas com a função var().', h2Theming: 'Sistemas de theming com design tokens', themingP1: 'O uso mais poderoso das propriedades personalizadas é construir um sistema completo de design tokens.', h2Components: 'Variantes de componentes com propriedades personalizadas', componentsP1: 'As propriedades personalizadas habilitam sistemas de variantes de componentes mais flexíveis.', h2JsInterop: 'Interoperabilidade JavaScript', jsInteropP1: 'As propriedades personalizadas conectam CSS e JavaScript perfeitamente.', h2Responsive: 'Design responsivo com propriedades personalizadas', responsiveP1: 'As propriedades personalizadas habilitam sistemas de tipografia fluida.', h2Faq: 'Perguntas frequentes', faq1Q: 'As propriedades CSS personalizadas são iguais às variáveis SASS?', faq1A: 'Não, são fundamentalmente diferentes. As variáveis SASS são compiladas em tempo de build.', faq2Q: 'As propriedades CSS personalizadas podem ser animadas?', faq2A: 'Sim, com @property (Houdini).', faq3Q: 'O que é o valor de fallback em var()?', faq3A: 'O segundo argumento de var() é um fallback usado quando a propriedade não está definida.', faq4Q: 'Funcionam em todos os navegadores modernos?', faq4A: 'Sim, suporte completo desde 2017.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Geavanceerde CSS Custom Properties: theming, componentvarianten en JavaScript-interop', intro: 'CSS Custom Properties zijn ver voorbij eenvoudige kleurwisseling gegaan. Deze gids verkent de <strong>geavanceerde patronen</strong> die CSS Custom Properties tot een van de krachtigste functies in modern CSS maken.', h2Basics: 'Basisprincipes van Custom Properties', basicsP1: 'Custom Properties worden gedefinieerd met het -- voorvoegsel en benaderd met de var() functie.', h2Theming: 'Design token theming-systemen', themingP1: 'Het krachtigste gebruik van Custom Properties is het bouwen van een compleet design token systeem.', h2Components: 'Componentvarianten met Custom Properties', componentsP1: 'Custom Properties maken flexibelere componentvariant-systemen mogelijk.', h2JsInterop: 'JavaScript-interoperabiliteit', jsInteropP1: 'Custom Properties verbinden CSS en JavaScript naadloos.', h2Responsive: 'Responsief ontwerp met Custom Properties', responsiveP1: 'Custom Properties maken vloeiende typografie- en spatiëringssystemen mogelijk.', h2Faq: 'Veelgestelde vragen', faq1Q: 'Zijn CSS Custom Properties hetzelfde als SASS-variabelen?', faq1A: 'Nee, ze zijn fundamenteel anders. SASS-variabelen worden gecompileerd tijdens de build.', faq2Q: 'Kunnen CSS Custom Properties geanimeerd worden?', faq2A: 'Ja, met @property (Houdini).', faq3Q: 'Wat is de fallbackwaarde in var()?', faq3A: 'Het tweede argument van var() is een fallback wanneer de eigenschap niet is gedefinieerd.', faq4Q: 'Werken ze in alle moderne browsers?', faq4A: 'Ja, volledige browserondersteuning sinds 2017.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Zaawansowane właściwości niestandardowe CSS: theming, warianty komponentów i interop JavaScript', intro: 'Właściwości niestandardowe CSS wykroczyły daleko poza proste zamienianie kolorów. Ten przewodnik bada <strong>zaawansowane wzorce</strong> czyniące je jedną z najpotężniejszych funkcji nowoczesnego CSS.', h2Basics: 'Podstawy właściwości niestandardowych', basicsP1: 'Właściwości niestandardowe są definiowane z prefiksem -- i dostępne przez funkcję var().', h2Theming: 'Systemy themingowe z tokenami projektowymi', themingP1: 'Najpotężniejsze zastosowanie właściwości niestandardowych to budowanie kompletnego systemu tokenów projektowych.', h2Components: 'Warianty komponentów z właściwościami niestandardowymi', componentsP1: 'Właściwości niestandardowe umożliwiają bardziej elastyczne systemy wariantów komponentów.', h2JsInterop: 'Interoperacyjność JavaScript', jsInteropP1: 'Właściwości niestandardowe płynnie łączą CSS i JavaScript.', h2Responsive: 'Responsywny design z właściwościami niestandardowymi', responsiveP1: 'Właściwości niestandardowe umożliwiają płynne systemy typografii.', h2Faq: 'Często zadawane pytania', faq1Q: 'Czy właściwości CSS niestandardowe to to samo co zmienne SASS?', faq1A: 'Nie, są fundamentalnie różne. Zmienne SASS są kompilowane w czasie budowania.', faq2Q: 'Czy właściwości CSS niestandardowe mogą być animowane?', faq2A: 'Tak, z @property (Houdini).', faq3Q: 'Co to jest wartość zastępcza w var()?', faq3A: 'Drugi argument var() to wartość zastępcza gdy właściwość nie jest zdefiniowana.', faq4Q: 'Czy działają we wszystkich nowoczesnych przeglądarkach?', faq4A: 'Tak, pełna obsługa od 2017 roku.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Avancerade CSS Custom Properties: theming, komponentvarianter och JavaScript-interop', intro: 'CSS Custom Properties har gått långt bortom enkelt färgbyte. Den här guiden utforskar de <strong>avancerade mönstren</strong> som gör CSS Custom Properties till en av de mest kraftfulla funktionerna i modern CSS.', h2Basics: 'Grunderna i Custom Properties', basicsP1: 'Custom Properties definieras med -- prefixet och nås med var()-funktionen.', h2Theming: 'Design token-temingssystem', themingP1: 'Den mest kraftfulla användningen av Custom Properties är att bygga ett komplett design token-system.', h2Components: 'Komponentvarianter med Custom Properties', componentsP1: 'Custom Properties möjliggör mer flexibla komponentvariantsystem.', h2JsInterop: 'JavaScript-interoperabilitet', jsInteropP1: 'Custom Properties förbinder CSS och JavaScript sömlöst.', h2Responsive: 'Responsiv design med Custom Properties', responsiveP1: 'Custom Properties möjliggör flytande typografi- och mellanrumssystem.', h2Faq: 'Vanliga frågor', faq1Q: 'Är CSS Custom Properties samma sak som SASS-variabler?', faq1A: 'Nej, de är fundamentalt olika. SASS-variabler kompileras vid byggtid.', faq2Q: 'Kan CSS Custom Properties animeras?', faq2A: 'Ja, med @property (Houdini).', faq3Q: 'Vad är fallback-värdet i var()?', faq3A: 'Det andra argumentet till var() är en fallback när egenskapen inte är definierad.', faq4Q: 'Fungerar de i alla moderna webbläsare?', faq4A: 'Ja, fullt webbläsarstöd sedan 2017.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Avanserte CSS Custom Properties: theming, komponentvarianter og JavaScript-interop', intro: 'CSS Custom Properties har gått langt forbi enkel fargebytting. Denne guiden utforsker de <strong>avanserte mønstrene</strong> som gjør CSS Custom Properties til en av de kraftigste funksjonene i moderne CSS.', h2Basics: 'Grunnleggende om Custom Properties', basicsP1: 'Custom Properties defineres med -- prefikset og nås med var()-funksjonen.', h2Theming: 'Design token-temingssystemer', themingP1: 'Den mest kraftfulle bruken av Custom Properties er å bygge et komplett design token-system.', h2Components: 'Komponentvarianter med Custom Properties', componentsP1: 'Custom Properties muliggjør mer fleksible komponentvariantsystemer.', h2JsInterop: 'JavaScript-interoperabilitet', jsInteropP1: 'Custom Properties kobler CSS og JavaScript sømløst.', h2Responsive: 'Responsivt design med Custom Properties', responsiveP1: 'Custom Properties muliggjør flytende typografi- og avstands systemer.', h2Faq: 'Vanlige spørsmål', faq1Q: 'Er CSS Custom Properties det samme som SASS-variabler?', faq1A: 'Nei, de er fundamentalt forskjellige. SASS-variabler kompileres ved byggetid.', faq2Q: 'Kan CSS Custom Properties animeres?', faq2A: 'Ja, med @property (Houdini).', faq3Q: 'Hva er fallback-verdien i var()?', faq3A: 'Det andre argumentet til var() er en fallback når egenskapen ikke er definert.', faq4Q: 'Fungerer de i alle moderne nettlesere?', faq4A: 'Ja, full nettleserstøtte siden 2017.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: '进阶 CSS 自定义属性：主题系统、组件变体与 JavaScript 互操作', intro: 'CSS 自定义属性（CSS 变量）早已超越简单的颜色替换。本指南探索让 CSS 自定义属性成为现代 CSS 最强大功能之一的<strong>进阶模式</strong>。', h2Basics: '自定义属性基础', basicsP1: '自定义属性以 -- 前缀定义，通过 var() 函数访问。它们会级联、继承，可在任何作用域覆盖。', h2Theming: '设计令牌主题系统', themingP1: '自定义属性最强大的用途是构建完整的设计令牌系统，无需 JavaScript 即可支持多主题。', h2Components: '使用自定义属性实现组件变体', componentsP1: '自定义属性实现比传统工具类更灵活的组件变体系统。', h2JsInterop: 'JavaScript 互操作', jsInteropP1: '自定义属性无缝连接 CSS 和 JavaScript，可从 JS 中读写，实现动态动画和响应式 UI。', h2Responsive: '使用自定义属性实现响应式设计', responsiveP1: '自定义属性支持超越简单断点的流式排版和间距系统。', h2Faq: '常见问题', faq1Q: 'CSS 自定义属性和 SASS 变量相同吗？', faq1A: '不，它们根本不同。SASS 变量在构建时编译，生成静态 CSS。CSS 自定义属性在浏览器运行时存在，可被 JavaScript 修改。', faq2Q: 'CSS 自定义属性可以动画化吗？', faq2A: '可以，通过 @property（Houdini）。@property 规则允许声明带有特定类型的自定义属性，实现平滑动画。', faq3Q: 'var() 中的备用值是什么？', faq3A: 'var() 的第二个参数是属性未定义或无效时的备用值。例如：var(--color-primary, #0066cc)。', faq4Q: 'CSS 自定义属性在所有现代浏览器中都有效吗？', faq4A: '是的，自 2017 年起所有现代浏览器完全支持。', relatedTitle: '相关工具' },
  ja: { title: '高度なCSSカスタムプロパティ: テーミング、コンポーネントバリアント、JavaScriptとの連携', intro: 'CSSカスタムプロパティは単純な色の置き換えをはるかに超えています。このガイドでは、CSSカスタムプロパティをモダンCSSの最も強力な機能の一つにする<strong>高度なパターン</strong>を探ります。', h2Basics: 'カスタムプロパティの基礎', basicsP1: 'カスタムプロパティは--プレフィックスで定義し、var()関数でアクセスします。', h2Theming: 'デザイントークンテーミングシステム', themingP1: 'カスタムプロパティの最も強力な使用法は、JavaScriptなしで複数のテーマをサポートする完全なデザイントークンシステムを構築することです。', h2Components: 'カスタムプロパティによるコンポーネントバリアント', componentsP1: 'カスタムプロパティは従来のユーティリティクラスよりも柔軟なコンポーネントバリアントシステムを可能にします。', h2JsInterop: 'JavaScriptとの相互運用', jsInteropP1: 'カスタムプロパティはCSSとJavaScriptをシームレスに繋ぎます。', h2Responsive: 'カスタムプロパティによるレスポンシブデザイン', responsiveP1: 'カスタムプロパティはシンプルなブレークポイントを超えた流体タイポグラフィシステムを実現します。', h2Faq: 'よくある質問', faq1Q: 'CSSカスタムプロパティはSASS変数と同じですか？', faq1A: 'いいえ、根本的に異なります。SASS変数はビルド時にコンパイルされます。CSSカスタムプロパティはランタイムに存在し、JavaScriptで変更できます。', faq2Q: 'CSSカスタムプロパティはアニメーションできますか？', faq2A: 'はい、@property（Houdini）を使用すると可能です。', faq3Q: 'var()のフォールバック値とは？', faq3A: 'var()の第2引数はプロパティが未定義の場合のフォールバックです。', faq4Q: 'すべての現代のブラウザで動作しますか？', faq4A: 'はい、2017年以降すべての現代のブラウザで完全にサポートされています。', relatedTitle: '関連ツール' },
  ko: { title: '고급 CSS Custom Properties: 테마, 컴포넌트 변형, JavaScript 상호운용', intro: 'CSS Custom Properties는 단순한 색상 교체를 훨씬 넘어섰습니다. 이 가이드는 CSS Custom Properties를 현대 CSS의 가장 강력한 기능 중 하나로 만드는 <strong>고급 패턴</strong>을 탐구합니다.', h2Basics: 'Custom Properties 기초', basicsP1: 'Custom Properties는 -- 접두사로 정의되고 var() 함수로 접근합니다.', h2Theming: 'Design Token 테마 시스템', themingP1: 'Custom Properties의 가장 강력한 사용은 JavaScript 없이 여러 테마를 지원하는 완전한 디자인 토큰 시스템을 구축하는 것입니다.', h2Components: 'Custom Properties를 사용한 컴포넌트 변형', componentsP1: 'Custom Properties는 전통적인 유틸리티 클래스보다 더 유연한 컴포넌트 변형 시스템을 가능하게 합니다.', h2JsInterop: 'JavaScript 상호운용', jsInteropP1: 'Custom Properties는 CSS와 JavaScript를 원활하게 연결합니다.', h2Responsive: 'Custom Properties를 사용한 반응형 디자인', responsiveP1: 'Custom Properties는 단순한 중단점을 넘어선 유동적인 타이포그래피 시스템을 가능하게 합니다.', h2Faq: '자주 묻는 질문', faq1Q: 'CSS Custom Properties는 SASS 변수와 같은가요?', faq1A: '아니요, 근본적으로 다릅니다. SASS 변수는 빌드 시 컴파일됩니다. CSS Custom Properties는 런타임에 존재하며 JavaScript로 변경할 수 있습니다.', faq2Q: 'CSS Custom Properties를 애니메이션할 수 있나요?', faq2A: '예, @property(Houdini)를 사용하면 가능합니다.', faq3Q: 'var()의 폴백 값이란?', faq3A: 'var()의 두 번째 인수는 속성이 정의되지 않았을 때의 폴백입니다.', faq4Q: '모든 현대 브라우저에서 작동하나요?', faq4A: '예, 2017년부터 모든 현대 브라우저에서 완전 지원됩니다.', relatedTitle: '관련 도구' },
  id: { title: 'CSS Custom Properties Tingkat Lanjut: Theming, Varian Komponen, dan Interop JavaScript', intro: 'CSS Custom Properties telah berkembang jauh melampaui penggantian warna sederhana. Panduan ini mengeksplorasi <strong>pola lanjutan</strong> yang menjadikan CSS Custom Properties salah satu fitur paling kuat dalam CSS modern.', h2Basics: 'Dasar-dasar Custom Properties', basicsP1: 'Custom Properties didefinisikan dengan prefiks -- dan diakses dengan fungsi var().', h2Theming: 'Sistem Theming Design Token', themingP1: 'Penggunaan paling kuat dari Custom Properties adalah membangun sistem design token lengkap yang mendukung beberapa tema tanpa JavaScript.', h2Components: 'Varian Komponen dengan Custom Properties', componentsP1: 'Custom Properties memungkinkan sistem varian komponen yang lebih fleksibel dari pendekatan kelas utilitas tradisional.', h2JsInterop: 'Interoperabilitas JavaScript', jsInteropP1: 'Custom Properties menjembatani CSS dan JavaScript dengan mulus.', h2Responsive: 'Desain Responsif dengan Custom Properties', responsiveP1: 'Custom Properties memungkinkan sistem tipografi dan spasi yang fluid.', h2Faq: 'Pertanyaan yang Sering Diajukan', faq1Q: 'Apakah CSS Custom Properties sama dengan variabel SASS?', faq1A: 'Tidak, keduanya berbeda secara fundamental. Variabel SASS dikompilasi saat build. CSS Custom Properties ada saat runtime.', faq2Q: 'Bisakah CSS Custom Properties dianimasikan?', faq2A: 'Ya, dengan @property (Houdini).', faq3Q: 'Apa nilai fallback di var()?', faq3A: 'Argumen kedua var() adalah fallback yang digunakan ketika properti tidak terdefinisi.', faq4Q: 'Apakah berfungsi di semua browser modern?', faq4A: 'Ya, dukungan penuh sejak 2017.', relatedTitle: 'Alat Terkait' },
  th: { title: 'CSS Custom Properties ขั้นสูง: Theming, Component Variants และ JavaScript Interop', intro: 'CSS Custom Properties ได้พัฒนาไปไกลเกินกว่าการเปลี่ยนสีธรรมดา คู่มือนี้สำรวจ<strong>รูปแบบขั้นสูง</strong>ที่ทำให้ CSS Custom Properties เป็นหนึ่งในคุณสมบัติที่ทรงพลังที่สุดใน CSS สมัยใหม่', h2Basics: 'พื้นฐาน Custom Properties', basicsP1: 'Custom Properties ถูกกำหนดด้วยคำนำหน้า -- และเข้าถึงด้วยฟังก์ชัน var()', h2Theming: 'ระบบ Theming แบบ Design Token', themingP1: 'การใช้งาน Custom Properties ที่ทรงพลังที่สุดคือการสร้างระบบ design token ที่สมบูรณ์โดยไม่ต้องใช้ JavaScript', h2Components: 'Component Variants ด้วย Custom Properties', componentsP1: 'Custom Properties ช่วยให้สร้างระบบ component variant ที่ยืดหยุ่นกว่า utility class แบบดั้งเดิม', h2JsInterop: 'การทำงานร่วมกันกับ JavaScript', jsInteropP1: 'Custom Properties เชื่อม CSS และ JavaScript ได้อย่างราบรื่น', h2Responsive: 'Responsive Design ด้วย Custom Properties', responsiveP1: 'Custom Properties ช่วยให้สร้างระบบ typography แบบ fluid ที่เกินกว่า breakpoint ธรรมดา', h2Faq: 'คำถามที่พบบ่อย', faq1Q: 'CSS Custom Properties เหมือนกับตัวแปร SASS หรือไม่?', faq1A: 'ไม่ พวกมันแตกต่างกันโดยพื้นฐาน ตัวแปร SASS ถูก compile ในเวลา build CSS Custom Properties มีอยู่ใน runtime และสามารถเปลี่ยนด้วย JavaScript', faq2Q: 'CSS Custom Properties สามารถทำ animation ได้หรือไม่?', faq2A: 'ได้ เมื่อใช้ร่วมกับ @property (Houdini)', faq3Q: 'ค่า fallback ใน var() คืออะไร?', faq3A: 'อาร์กิวเมนต์ที่สองของ var() คือ fallback ที่ใช้เมื่อ property ไม่ได้ถูกกำหนด', faq4Q: 'ทำงานในทุก browser สมัยใหม่หรือไม่?', faq4A: 'ใช่ รองรับครบถ้วนตั้งแต่ปี 2017', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const basicsCode = `/* CSS Custom Properties — Fundamentals */

/* Define properties on :root for global scope */
:root {
  --color-primary: #0066cc;
  --color-primary-dark: #0052a3;
  --spacing-unit: 8px;
  --font-size-base: 1rem;
  --border-radius: 4px;
}

/* Use with var() */
.button {
  background-color: var(--color-primary);
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
}

/* Override at component scope (not global) */
.button.danger {
  --color-primary: #cc0000;  /* Only affects this button */
  --color-primary-dark: #990000;
}

/* Fallback value (second argument to var) */
.card {
  background: var(--card-bg, white);
  color: var(--card-text, var(--color-text, #333));  /* nested fallback */
  padding: var(--card-padding, var(--spacing-unit, 8px));
}`;

const themingCode = `/* Multi-Theme System with CSS Custom Properties */

/* Light theme (default) */
:root {
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-border: #e2e8f0;
  --color-text-primary: #1a202c;
  --color-text-secondary: #718096;
  --color-accent: #3182ce;
  --color-accent-hover: #2c5282;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition-fast: 150ms ease;
}

/* Dark theme — override only what changes */
[data-theme="dark"] {
  --color-bg: #1a202c;
  --color-surface: #2d3748;
  --color-border: #4a5568;
  --color-text-primary: #f7fafc;
  --color-text-secondary: #a0aec0;
  --color-accent: #63b3ed;
  --color-accent-hover: #90cdf4;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
}

/* High-contrast theme */
[data-theme="high-contrast"] {
  --color-bg: #000000;
  --color-text-primary: #ffffff;
  --color-accent: #ffff00;
  --color-border: #ffffff;
}

/* System preference auto-detection */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #1a202c;
    --color-text-primary: #f7fafc;
    /* ... more overrides */
  }
}

/* Components use semantic tokens — never raw colors */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-fast);
}`;

const jsInteropCode = `// JavaScript \u003c-\u003e CSS Custom Properties

// 1. Read a custom property value
const root = document.documentElement;
const primaryColor = getComputedStyle(root)
  .getPropertyValue('--color-primary')
  .trim();
console.log(primaryColor); // '#0066cc'

// 2. Set a custom property from JavaScript
root.style.setProperty('--color-primary', '#ff6600');

// 3. Remove a custom property
root.style.removeProperty('--color-primary');

// 4. Theme switcher
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}

// 5. Animate with custom properties (requires @property)
// CSS:
// @property --progress {
//   syntax: '\u003cnumber\u003e';
//   initial-value: 0;
//   inherits: false;
// }
// .progress-bar {
//   width: calc(var(--progress) * 1%);
//   transition: --progress 1s ease;
// }

// JavaScript:
function animateProgress(el, from, to) {
  el.style.setProperty('--progress', from);
  requestAnimationFrame(() => {
    el.style.setProperty('--progress', to);
  });
}

// 6. Reactive properties with ResizeObserver
const observer = new ResizeObserver(entries =\u003e {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    entry.target.style.setProperty('--el-width', \`\${width}px\`);
    entry.target.style.setProperty('--el-height', \`\${height}px\`);
  }
});
observer.observe(document.querySelector('.responsive-component'));`;

const componentVariantsCode = `/* Component Variant System */

/* Button component with custom property API */
.btn {
  /* Default values (the component's "API") */
  --btn-bg: var(--color-accent);
  --btn-bg-hover: var(--color-accent-hover);
  --btn-color: white;
  --btn-border: transparent;
  --btn-shadow: var(--shadow-sm);
  --btn-size: 1rem;
  --btn-padding-y: 0.5em;
  --btn-padding-x: 1em;
  --btn-radius: var(--border-radius);

  background: var(--btn-bg);
  color: var(--btn-color);
  border: 1px solid var(--btn-border);
  box-shadow: var(--btn-shadow);
  font-size: var(--btn-size);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  border-radius: var(--btn-radius);
  transition: background var(--transition-fast);
}

.btn:hover {
  background: var(--btn-bg-hover);
}

/* Variants — only override what changes */
.btn-danger {
  --btn-bg: #e53e3e;
  --btn-bg-hover: #c53030;
}

.btn-outline {
  --btn-bg: transparent;
  --btn-bg-hover: var(--color-accent);
  --btn-color: var(--color-accent);
  --btn-border: var(--color-accent);
}

.btn-sm {
  --btn-size: 0.875rem;
  --btn-padding-y: 0.375em;
  --btn-padding-x: 0.75em;
}

.btn-lg {
  --btn-size: 1.125rem;
  --btn-padding-y: 0.75em;
  --btn-padding-x: 1.5em;
}

/* Caller overrides — no need for a new variant class */
.special-hero .btn {
  --btn-bg: gold;
  --btn-color: black;
  --btn-radius: 50px;
}`;

export default function CssCustomPropertiesAdvanced({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Basics}</h2>
      <p>{s.basicsP1}</p>
      <pre><code className="language-css">{basicsCode}</code></pre>

      <h2>{s.h2Theming}</h2>
      <p>{s.themingP1}</p>
      <pre><code className="language-css">{themingCode}</code></pre>

      <h2>{s.h2Components}</h2>
      <p>{s.componentsP1}</p>
      <pre><code className="language-css">{componentVariantsCode}</code></pre>

      <h2>{s.h2JsInterop}</h2>
      <p>{s.jsInteropP1}</p>
      <pre><code className="language-javascript">{jsInteropCode}</code></pre>

      <h2>{s.h2Faq}</h2>
      <h3>{s.faq1Q}</h3>
      <p>{s.faq1A}</p>
      <h3>{s.faq2Q}</h3>
      <p>{s.faq2A}</p>
      <h3>{s.faq3Q}</h3>
      <p>{s.faq3A}</p>
      <h3>{s.faq4Q}</h3>
      <p>{s.faq4A}</p>

      <h2>{s.relatedTitle}</h2>
      <ul>
        <li><Link href={`/${lang}/tools/css-minify`}>CSS Minifier</Link></li>
        <li><Link href={`/${lang}/tools/color-picker`}>Color Picker</Link></li>
        <li><Link href={`/${lang}/blog/webpack-vs-vite-2026`}>Webpack vs Vite 2026</Link></li>
        <li><Link href={`/${lang}/blog/javascript-error-handling`}>JavaScript Error Handling</Link></li>
      </ul>
    </>
  );
}
