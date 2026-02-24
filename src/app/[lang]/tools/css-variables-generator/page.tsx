'use client';

import React, { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Variables Generator',
    description: 'Generate CSS custom properties and :root variables from color palettes and design tokens. Export clean CSS code instantly.',
    addVar: 'Add Variable',
    varName: 'Variable Name',
    varValue: 'Value',
    varType: 'Type',
    remove: 'Remove',
    generate: 'Generate CSS',
    clear: 'Clear All',
    loadSample: 'Load Sample',
    outputLabel: 'Generated CSS',
    namePlaceholder: '--primary-color',
    valuePlaceholder: '#3b82f6',
    typeColor: 'Color',
    typeSize: 'Size',
    typeFont: 'Font',
    typeNumber: 'Number',
    typeOther: 'Other',
    selector: 'CSS Selector',
    includeComments: 'Include comments',
    introTitle: 'Free CSS Variables Generator',
    introText: 'Generate CSS custom properties (CSS variables) for your design system. CSS custom properties defined in :root are globally accessible throughout your stylesheet, enabling consistent theming, easy dark mode switching, and centralized design token management. This tool lets you define multiple variables with types and generates clean, ready-to-use CSS code.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are CSS variables (custom properties)?',
    faq1a: 'CSS custom properties (variables) are entities defined with a double-dash prefix (--variable-name) that store values you can reuse throughout a CSS document. Defined in :root, they are accessible by all elements. They can store colors, sizes, fonts, and any other CSS values.',
    faq2q: 'How do I use CSS variables in my stylesheet?',
    faq2a: 'Define variables in :root { --color: #fff; } and use them anywhere with var(--color). You can also provide fallback values: var(--color, #000). CSS variables can be changed with JavaScript using element.style.setProperty("--color", "red").',
    faq3q: 'What is the difference between CSS variables and preprocessor variables?',
    faq3a: 'CSS custom properties are native browser features that work at runtime, can be changed with JavaScript, and cascade through the DOM like regular CSS. Preprocessor variables (Sass $var, Less @var) are compiled away before reaching the browser and cannot be changed at runtime.',
    faq4q: 'How do CSS variables help with dark mode?',
    faq4a: 'CSS variables make dark mode trivial: define light-mode colors in :root, then override them inside @media (prefers-color-scheme: dark) or a .dark class. All elements automatically pick up the new values with no additional CSS needed.',
    relatedTitle: 'Related Tools',
  },
  fr: {
    title: 'Generateur de Variables CSS',
    description: 'Generez des proprietes personnalisees CSS et des variables :root. Exportez du code CSS propre instantanement.',
    addVar: 'Ajouter Variable', varName: 'Nom', varValue: 'Valeur', varType: 'Type',
    remove: 'Supprimer', generate: 'Generer CSS', clear: 'Tout effacer', loadSample: 'Exemple',
    outputLabel: 'CSS Genere', namePlaceholder: '--couleur-principale', valuePlaceholder: '#3b82f6',
    typeColor: 'Couleur', typeSize: 'Taille', typeFont: 'Police', typeNumber: 'Nombre', typeOther: 'Autre',
    selector: 'Selecteur CSS', includeComments: 'Inclure commentaires',
    introTitle: 'Generateur de Variables CSS Gratuit', introText: 'Generez des proprietes personnalisees CSS pour votre systeme de design. Les variables CSS permettent une theming coherente et la gestion centralisee des tokens.',
    faqTitle: 'Questions Frequentes',
    faq1q: 'Que sont les variables CSS?', faq1a: 'Les proprietes personnalisees CSS stockent des valeurs reutilisables dans toute la feuille de style, definies avec un prefixe double tiret.',
    faq2q: 'Comment utiliser les variables CSS?', faq2a: 'Definissez dans :root { --couleur: #fff; } et utilisez avec var(--couleur). Valeur de secours: var(--couleur, #000).',
    faq3q: 'Difference avec les variables preprocesseur?', faq3a: 'Les variables CSS natives fonctionnent au moment de l\'execution et peuvent etre modifiees avec JavaScript, contrairement aux variables Sass/Less.',
    faq4q: 'Comment aident-elles pour le mode sombre?', faq4a: 'Definissez les couleurs dans :root, puis remplacez-les dans @media (prefers-color-scheme: dark) pour basculer automatiquement.',
    relatedTitle: 'Outils Connexes',
  },
  de: {
    title: 'CSS-Variablen-Generator',
    description: 'Generieren Sie CSS-Benutzereigenschaften und :root-Variablen. Exportieren Sie sauberen CSS-Code.',
    addVar: 'Variable hinzufuegen', varName: 'Name', varValue: 'Wert', varType: 'Typ',
    remove: 'Entfernen', generate: 'CSS generieren', clear: 'Alles loeschen', loadSample: 'Beispiel laden',
    outputLabel: 'Generiertes CSS', namePlaceholder: '--primaerfarbe', valuePlaceholder: '#3b82f6',
    typeColor: 'Farbe', typeSize: 'Groesse', typeFont: 'Schrift', typeNumber: 'Zahl', typeOther: 'Andere',
    selector: 'CSS-Selektor', includeComments: 'Kommentare einschliessen',
    introTitle: 'Kostenloser CSS-Variablen-Generator', introText: 'Generieren Sie CSS-Benutzereigenschaften fuer Ihr Design-System. CSS-Variablen ermoglichen konsistentes Theming und zentrales Design-Token-Management.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was sind CSS-Variablen?', faq1a: 'CSS-Benutzereigenschaften speichern wiederverwendbare Werte mit einem Doppelstreifen-Praefix in der gesamten Stylesheet.',
    faq2q: 'Wie verwendet man CSS-Variablen?', faq2a: 'Definieren in :root { --farbe: #fff; } und verwenden mit var(--farbe). Fallback: var(--farbe, #000).',
    faq3q: 'Unterschied zu Praeprozessor-Variablen?', faq3a: 'Native CSS-Variablen arbeiten zur Laufzeit und koennen mit JavaScript geaendert werden, im Gegensatz zu Sass/Less-Variablen.',
    faq4q: 'Wie helfen sie beim Dunkelmodus?', faq4a: 'Farben in :root definieren und in @media (prefers-color-scheme: dark) ueberschreiben fuer automatischen Wechsel.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Variables CSS',
    description: 'Genere propiedades personalizadas CSS y variables :root. Exporte codigo CSS limpio instantaneamente.',
    addVar: 'Agregar Variable', varName: 'Nombre', varValue: 'Valor', varType: 'Tipo',
    remove: 'Eliminar', generate: 'Generar CSS', clear: 'Limpiar todo', loadSample: 'Cargar ejemplo',
    outputLabel: 'CSS Generado', namePlaceholder: '--color-primario', valuePlaceholder: '#3b82f6',
    typeColor: 'Color', typeSize: 'Tamano', typeFont: 'Fuente', typeNumber: 'Numero', typeOther: 'Otro',
    selector: 'Selector CSS', includeComments: 'Incluir comentarios',
    introTitle: 'Generador de Variables CSS Gratuito', introText: 'Genere propiedades personalizadas CSS para su sistema de diseno. Las variables CSS permiten theming consistente y gestion centralizada de tokens de diseno.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Que son las variables CSS?', faq1a: 'Las propiedades personalizadas CSS almacenan valores reutilizables con prefijo doble guion en toda la hoja de estilos.',
    faq2q: 'Como usar variables CSS?', faq2a: 'Definir en :root { --color: #fff; } y usar con var(--color). Valor alternativo: var(--color, #000).',
    faq3q: 'Diferencia con variables de preprocesador?', faq3a: 'Las variables CSS nativas funcionan en tiempo de ejecucion y se pueden cambiar con JavaScript, a diferencia de Sass/Less.',
    faq4q: 'Como ayudan con el modo oscuro?', faq4a: 'Definir colores en :root y sobreescribirlos en @media (prefers-color-scheme: dark) para cambio automatico.',
    relatedTitle: 'Herramientas Relacionadas',
  },
  it: {
    title: 'Generatore di Variabili CSS',
    description: 'Genera proprieta personalizzate CSS e variabili :root. Esporta codice CSS pulito istantaneamente.',
    addVar: 'Aggiungi Variabile', varName: 'Nome', varValue: 'Valore', varType: 'Tipo',
    remove: 'Rimuovi', generate: 'Genera CSS', clear: 'Cancella tutto', loadSample: 'Carica esempio',
    outputLabel: 'CSS Generato', namePlaceholder: '--colore-primario', valuePlaceholder: '#3b82f6',
    typeColor: 'Colore', typeSize: 'Dimensione', typeFont: 'Font', typeNumber: 'Numero', typeOther: 'Altro',
    selector: 'Selettore CSS', includeComments: 'Includi commenti',
    introTitle: 'Generatore di Variabili CSS Gratuito', introText: 'Genera proprieta personalizzate CSS per il tuo sistema di design. Le variabili CSS permettono theming coerente e gestione centralizzata dei token di design.',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Cosa sono le variabili CSS?', faq1a: 'Le proprieta personalizzate CSS memorizzano valori riutilizzabili con prefisso doppio trattino in tutto il foglio di stile.',
    faq2q: 'Come usare le variabili CSS?', faq2a: 'Definire in :root { --colore: #fff; } e usare con var(--colore). Valore alternativo: var(--colore, #000).',
    faq3q: 'Differenza con le variabili preprocessore?', faq3a: 'Le variabili CSS native funzionano a runtime e possono essere modificate con JavaScript, diversamente da Sass/Less.',
    faq4q: 'Come aiutano con la modalita scura?', faq4a: 'Definire colori in :root e sovrascriverli in @media (prefers-color-scheme: dark) per cambio automatico.',
    relatedTitle: 'Strumenti Correlati',
  },
  pt: {
    title: 'Gerador de Variaveis CSS',
    description: 'Gere propriedades personalizadas CSS e variaveis :root. Exporte codigo CSS limpo instantaneamente.',
    addVar: 'Adicionar Variavel', varName: 'Nome', varValue: 'Valor', varType: 'Tipo',
    remove: 'Remover', generate: 'Gerar CSS', clear: 'Limpar tudo', loadSample: 'Carregar exemplo',
    outputLabel: 'CSS Gerado', namePlaceholder: '--cor-primaria', valuePlaceholder: '#3b82f6',
    typeColor: 'Cor', typeSize: 'Tamanho', typeFont: 'Fonte', typeNumber: 'Numero', typeOther: 'Outro',
    selector: 'Seletor CSS', includeComments: 'Incluir comentarios',
    introTitle: 'Gerador de Variaveis CSS Gratuito', introText: 'Gere propriedades personalizadas CSS para seu sistema de design. Variaveis CSS permitem theming consistente e gestao centralizada de tokens de design.',
    faqTitle: 'Perguntas Frequentes',
    faq1q: 'O que sao variaveis CSS?', faq1a: 'Propriedades personalizadas CSS armazenam valores reutilizaveis com prefixo duplo traco em toda a folha de estilo.',
    faq2q: 'Como usar variaveis CSS?', faq2a: 'Definir em :root { --cor: #fff; } e usar com var(--cor). Valor alternativo: var(--cor, #000).',
    faq3q: 'Diferenca com variaveis de preprocessador?', faq3a: 'Variaveis CSS nativas funcionam em tempo de execucao e podem ser alteradas com JavaScript, diferente de Sass/Less.',
    faq4q: 'Como ajudam com o modo escuro?', faq4a: 'Definir cores em :root e sobrescreve-las em @media (prefers-color-scheme: dark) para troca automatica.',
    relatedTitle: 'Ferramentas Relacionadas',
  },
  nl: {
    title: 'CSS Variabelen Generator',
    description: 'Genereer CSS aangepaste eigenschappen en :root variabelen. Exporteer schone CSS code direct.',
    addVar: 'Variabele toevoegen', varName: 'Naam', varValue: 'Waarde', varType: 'Type',
    remove: 'Verwijderen', generate: 'CSS genereren', clear: 'Alles wissen', loadSample: 'Voorbeeld laden',
    outputLabel: 'Gegenereerde CSS', namePlaceholder: '--primaire-kleur', valuePlaceholder: '#3b82f6',
    typeColor: 'Kleur', typeSize: 'Grootte', typeFont: 'Lettertype', typeNumber: 'Getal', typeOther: 'Andere',
    selector: 'CSS Selector', includeComments: 'Commentaar opnemen',
    introTitle: 'Gratis CSS Variabelen Generator', introText: 'Genereer CSS aangepaste eigenschappen voor uw ontwerpsysteem. CSS variabelen maken consistent theming en gecentraliseerd beheer van ontwerptokens mogelijk.',
    faqTitle: 'Veelgestelde Vragen',
    faq1q: 'Wat zijn CSS variabelen?', faq1a: 'CSS aangepaste eigenschappen slaan herbruikbare waarden op met een dubbel streepje prefix in het hele stylesheet.',
    faq2q: 'Hoe gebruik je CSS variabelen?', faq2a: 'Definieer in :root { --kleur: #fff; } en gebruik met var(--kleur). Alternatief: var(--kleur, #000).',
    faq3q: 'Verschil met preprocessor variabelen?', faq3a: 'Native CSS variabelen werken tijdens runtime en kunnen worden gewijzigd met JavaScript, anders dan Sass/Less.',
    faq4q: 'Hoe helpen ze bij donkere modus?', faq4a: 'Kleuren definieen in :root en overschrijven in @media (prefers-color-scheme: dark) voor automatisch wisselen.',
    relatedTitle: 'Gerelateerde Tools',
  },
  pl: {
    title: 'Generator Zmiennych CSS',
    description: 'Generuj wlasciwosci niestandardowe CSS i zmienne :root. Eksportuj czysty kod CSS natychmiast.',
    addVar: 'Dodaj Zmienna', varName: 'Nazwa', varValue: 'Wartosc', varType: 'Typ',
    remove: 'Usun', generate: 'Generuj CSS', clear: 'Wyczysc wszystko', loadSample: 'Zaladuj przyklad',
    outputLabel: 'Wygenerowany CSS', namePlaceholder: '--kolor-podstawowy', valuePlaceholder: '#3b82f6',
    typeColor: 'Kolor', typeSize: 'Rozmiar', typeFont: 'Czcionka', typeNumber: 'Liczba', typeOther: 'Inne',
    selector: 'Selektor CSS', includeComments: 'Dodaj komentarze',
    introTitle: 'Darmowy Generator Zmiennych CSS', introText: 'Generuj wlasciwosci niestandardowe CSS dla swojego systemu projektowania. Zmienne CSS umozliwiaja spojny theming i zarzadzanie tokenami projektowymi.',
    faqTitle: 'Czesto Zadawane Pytania',
    faq1q: 'Czym sa zmienne CSS?', faq1a: 'Wlasciwosci niestandardowe CSS przechowuja wielokrotnie uzywane wartosci z prefiksem podwojnego myslnika w calym arkuszu stylow.',
    faq2q: 'Jak uzywac zmiennych CSS?', faq2a: 'Definicja w :root { --kolor: #fff; } i uzycie z var(--kolor). Wartosc awaryjna: var(--kolor, #000).',
    faq3q: 'Roznica z zmiennymi preprocesora?', faq3a: 'Natywne zmienne CSS dzialaja w czasie wykonania i moga byc zmieniane przez JavaScript, inaczej niz Sass/Less.',
    faq4q: 'Jak pomagaja w trybie ciemnym?', faq4a: 'Zdefiniuj kolory w :root i nadpisz je w @media (prefers-color-scheme: dark) dla automatycznego przelaczania.',
    relatedTitle: 'Powiazane Narzedzia',
  },
  sv: {
    title: 'CSS Variabler Generator',
    description: 'Generera CSS anpassade egenskaper och :root-variabler. Exportera ren CSS-kod direkt.',
    addVar: 'Lagg till variabel', varName: 'Namn', varValue: 'Vaerde', varType: 'Typ',
    remove: 'Ta bort', generate: 'Generera CSS', clear: 'Rensa allt', loadSample: 'Ladda exempel',
    outputLabel: 'Genererad CSS', namePlaceholder: '--primaer-faerg', valuePlaceholder: '#3b82f6',
    typeColor: 'Faerg', typeSize: 'Storlek', typeFont: 'Typsnitt', typeNumber: 'Nummer', typeOther: 'Annat',
    selector: 'CSS-vaeljare', includeComments: 'Inkludera kommentarer',
    introTitle: 'Gratis CSS Variabler Generator', introText: 'Generera CSS anpassade egenskaper foer ditt designsystem. CSS-variabler moejliggoer konsekvent tematisering och centraliserad hantering av designtokens.',
    faqTitle: 'Vanliga Fragor',
    faq1q: 'Vad aer CSS-variabler?', faq1a: 'CSS anpassade egenskaper lagrar aateanvaendbara vaerden med ett dubbelstreck-prefix i hela stilmallen.',
    faq2q: 'Hur anvaender man CSS-variabler?', faq2a: 'Definiera i :root { --faerg: #fff; } och anvaend med var(--faerg). Alternativvaerde: var(--faerg, #000).',
    faq3q: 'Skillnad mot preprocessorvariabler?', faq3a: 'Inbyggda CSS-variabler fungerar vid korning och kan aendras med JavaScript, till skillnad fran Sass/Less.',
    faq4q: 'Hur hjaelper de med moerkt laege?', faq4a: 'Definiera faerger i :root och aaerskrid dem i @media (prefers-color-scheme: dark) foer automatisk vaexling.',
    relatedTitle: 'Relaterade Verktyg',
  },
  no: {
    title: 'CSS Variabler Generator',
    description: 'Generer CSS tilpassede egenskaper og :root variabler. Eksporter ren CSS kode direkte.',
    addVar: 'Legg til variabel', varName: 'Navn', varValue: 'Verdi', varType: 'Type',
    remove: 'Fjern', generate: 'Generer CSS', clear: 'Toemme alt', loadSample: 'Last eksempel',
    outputLabel: 'Generert CSS', namePlaceholder: '--primaer-farge', valuePlaceholder: '#3b82f6',
    typeColor: 'Farge', typeSize: 'Stoerrelse', typeFont: 'Skrifttype', typeNumber: 'Nummer', typeOther: 'Annet',
    selector: 'CSS-velger', includeComments: 'Inkluder kommentarer',
    introTitle: 'Gratis CSS Variabler Generator', introText: 'Generer CSS tilpassede egenskaper for designsystemet ditt. CSS-variabler muliggjor konsistent tematisering og sentralisert administrasjon av designtokens.',
    faqTitle: 'Vanlige Spoersmaal',
    faq1q: 'Hva er CSS-variabler?', faq1a: 'CSS tilpassede egenskaper lagrer gjenbrukbare verdier med dobbeltstrek-prefiks i hele stilarket.',
    faq2q: 'Hvordan bruke CSS-variabler?', faq2a: 'Definer i :root { --farge: #fff; } og bruk med var(--farge). Alternativverdi: var(--farge, #000).',
    faq3q: 'Forskjell fra preprosesorvariabler?', faq3a: 'Innebygde CSS-variabler fungerer ved kjoering og kan endres med JavaScript, ulikt Sass/Less.',
    faq4q: 'Hvordan hjelper de med mork modus?', faq4a: 'Definer farger i :root og overstyr dem i @media (prefers-color-scheme: dark) for automatisk bytte.',
    relatedTitle: 'Relaterte Verktoy',
  },
  zh: {
    title: 'CSS 变量生成器',
    description: '从调色板和设计令牌生成 CSS 自定义属性和 :root 变量。立即导出干净的 CSS 代码。',
    addVar: '添加变量', varName: '变量名', varValue: '值', varType: '类型',
    remove: '删除', generate: '生成 CSS', clear: '清除全部', loadSample: '加载示例',
    outputLabel: '生成的 CSS', namePlaceholder: '--primary-color', valuePlaceholder: '#3b82f6',
    typeColor: '颜色', typeSize: '尺寸', typeFont: '字体', typeNumber: '数值', typeOther: '其他',
    selector: 'CSS 选择器', includeComments: '包含注释',
    introTitle: '免费 CSS 变量生成器', introText: '为您的设计系统生成 CSS 自定义属性。在 :root 中定义的 CSS 变量可在整个样式表中全局访问，实现一致的主题化和深色模式切换。',
    faqTitle: '常见问题',
    faq1q: '什么是 CSS 变量（自定义属性）？', faq1a: 'CSS 自定义属性是以双破折号前缀定义的实体（--变量名），用于存储可在整个 CSS 文档中复用的值。',
    faq2q: '如何在样式表中使用 CSS 变量？', faq2a: '在 :root { --color: #fff; } 中定义，然后用 var(--color) 使用。可提供回退值：var(--color, #000)。',
    faq3q: 'CSS 变量与预处理器变量有何不同？', faq3a: 'CSS 自定义属性是原生浏览器功能，可在运行时更改，而 Sass/Less 变量在编译时就被替换。',
    faq4q: 'CSS 变量如何帮助实现深色模式？', faq4a: '在 :root 中定义颜色，然后在 @media (prefers-color-scheme: dark) 或 .dark 类中覆盖它们即可自动切换。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'CSS 変数ジェネレーター',
    description: 'カラーパレットとデザイントークンから CSS カスタムプロパティと :root 変数を生成。即座にクリーンな CSS を出力。',
    addVar: '変数を追加', varName: '変数名', varValue: '値', varType: 'タイプ',
    remove: '削除', generate: 'CSS 生成', clear: 'すべてクリア', loadSample: 'サンプル読込',
    outputLabel: '生成された CSS', namePlaceholder: '--primary-color', valuePlaceholder: '#3b82f6',
    typeColor: 'カラー', typeSize: 'サイズ', typeFont: 'フォント', typeNumber: '数値', typeOther: 'その他',
    selector: 'CSS セレクター', includeComments: 'コメントを含める',
    introTitle: '無料 CSS 変数ジェネレーター', introText: 'デザインシステム用の CSS カスタムプロパティを生成します。:root に定義した CSS 変数はスタイルシート全体でアクセス可能で、一貫したテーマ化とダークモード切替を可能にします。',
    faqTitle: 'よくある質問',
    faq1q: 'CSS 変数（カスタムプロパティ）とは？', faq1a: 'CSS カスタムプロパティは二重ダッシュ（--変数名）で定義し、CSS ドキュメント全体で再利用できる値を格納します。',
    faq2q: 'CSS 変数の使い方は？', faq2a: ':root { --color: #fff; } で定義し、var(--color) で使用。フォールバック値: var(--color, #000)。',
    faq3q: 'プリプロセッサ変数との違いは？', faq3a: 'CSS カスタムプロパティはネイティブブラウザ機能で実行時に変更可能。Sass/Less 変数はコンパイル時に置換されます。',
    faq4q: 'ダークモードへの活用法は？', faq4a: ':root でライトモードの色を定義し、@media (prefers-color-scheme: dark) でオーバーライドするだけで自動切替可能です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'CSS 변수 생성기',
    description: '색상 팔레트와 디자인 토큰에서 CSS 커스텀 프로퍼티와 :root 변수를 생성. 깔끔한 CSS 코드를 즉시 내보내세요.',
    addVar: '변수 추가', varName: '변수명', varValue: '값', varType: '타입',
    remove: '제거', generate: 'CSS 생성', clear: '모두 지우기', loadSample: '샘플 로드',
    outputLabel: '생성된 CSS', namePlaceholder: '--primary-color', valuePlaceholder: '#3b82f6',
    typeColor: '색상', typeSize: '크기', typeFont: '폰트', typeNumber: '숫자', typeOther: '기타',
    selector: 'CSS 선택자', includeComments: '주석 포함',
    introTitle: '무료 CSS 변수 생성기', introText: '디자인 시스템을 위한 CSS 커스텀 프로퍼티를 생성합니다. :root에 정의된 CSS 변수는 스타일시트 전체에서 접근 가능하며 일관된 테마와 다크 모드 전환을 가능하게 합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'CSS 변수(커스텀 프로퍼티)란?', faq1a: 'CSS 커스텀 프로퍼티는 이중 대시 접두사(--변수명)로 정의하며 CSS 문서 전체에서 재사용할 수 있는 값을 저장합니다.',
    faq2q: 'CSS 변수 사용 방법은?', faq2a: ':root { --color: #fff; }에서 정의하고 var(--color)로 사용. 대체값: var(--color, #000).',
    faq3q: '전처리기 변수와의 차이점은?', faq3a: 'CSS 커스텀 프로퍼티는 네이티브 브라우저 기능으로 런타임에 변경 가능. Sass/Less 변수는 컴파일 시 치환됩니다.',
    faq4q: '다크 모드에 어떻게 활용하나요?', faq4a: ':root에서 색상을 정의하고 @media (prefers-color-scheme: dark)에서 오버라이드하면 자동으로 전환됩니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Generator Variabel CSS',
    description: 'Buat properti kustom CSS dan variabel :root dari palet warna dan token desain. Ekspor kode CSS bersih secara instan.',
    addVar: 'Tambah Variabel', varName: 'Nama', varValue: 'Nilai', varType: 'Tipe',
    remove: 'Hapus', generate: 'Buat CSS', clear: 'Hapus Semua', loadSample: 'Muat Contoh',
    outputLabel: 'CSS yang Dibuat', namePlaceholder: '--warna-utama', valuePlaceholder: '#3b82f6',
    typeColor: 'Warna', typeSize: 'Ukuran', typeFont: 'Font', typeNumber: 'Angka', typeOther: 'Lainnya',
    selector: 'Selektor CSS', includeComments: 'Sertakan komentar',
    introTitle: 'Generator Variabel CSS Gratis', introText: 'Buat properti kustom CSS untuk sistem desain Anda. Variabel CSS di :root dapat diakses di seluruh stylesheet, memungkinkan theming konsisten dan manajemen token desain terpusat.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Apa itu variabel CSS?', faq1a: 'Properti kustom CSS menyimpan nilai yang dapat digunakan ulang dengan awalan dua tanda hubung di seluruh stylesheet.',
    faq2q: 'Cara menggunakan variabel CSS?', faq2a: 'Definisikan di :root { --warna: #fff; } dan gunakan dengan var(--warna). Nilai fallback: var(--warna, #000).',
    faq3q: 'Perbedaan dengan variabel preprocessor?', faq3a: 'Variabel CSS asli bekerja saat runtime dan dapat diubah dengan JavaScript, berbeda dengan Sass/Less.',
    faq4q: 'Bagaimana membantu mode gelap?', faq4a: 'Definisikan warna di :root dan timpa di @media (prefers-color-scheme: dark) untuk pergantian otomatis.',
    relatedTitle: 'Alat Terkait',
  },
  th: {
    title: 'ตัวสร้างตัวแปร CSS',
    description: 'สร้าง CSS custom properties และตัวแปร :root จากจานสีและ design tokens ส่งออกโค้ด CSS ที่สะอาดทันที',
    addVar: 'เพิ่มตัวแปร', varName: 'ชื่อตัวแปร', varValue: 'ค่า', varType: 'ประเภท',
    remove: 'ลบ', generate: 'สร้าง CSS', clear: 'ล้างทั้งหมด', loadSample: 'โหลดตัวอย่าง',
    outputLabel: 'CSS ที่สร้าง', namePlaceholder: '--primary-color', valuePlaceholder: '#3b82f6',
    typeColor: 'สี', typeSize: 'ขนาด', typeFont: 'ฟอนต์', typeNumber: 'ตัวเลข', typeOther: 'อื่นๆ',
    selector: 'CSS Selector', includeComments: 'รวมคอมเมนต์',
    introTitle: 'ตัวสร้างตัวแปร CSS ฟรี', introText: 'สร้าง CSS custom properties สำหรับระบบการออกแบบของคุณ ตัวแปร CSS ที่กำหนดใน :root เข้าถึงได้ทั่วทั้ง stylesheet ช่วยให้การ theming สอดคล้องกัน',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'CSS variables คืออะไร?', faq1a: 'CSS custom properties เก็บค่าที่นำกลับมาใช้ซ้ำได้ด้วยคำนำหน้าขีดคั่นสองตัว (--ชื่อตัวแปร) ตลอดทั้ง stylesheet',
    faq2q: 'วิธีใช้ CSS variables?', faq2a: 'กำหนดใน :root { --สี: #fff; } และใช้ด้วย var(--สี) ค่าสำรอง: var(--สี, #000)',
    faq3q: 'ต่างจากตัวแปร preprocessor อย่างไร?', faq3a: 'CSS custom properties ทำงานในขณะรันและเปลี่ยนได้ด้วย JavaScript ต่างจาก Sass/Less ที่ถูกแทนที่ตอน compile',
    faq4q: 'ช่วยเรื่อง dark mode อย่างไร?', faq4a: 'กำหนดสีใน :root และ override ใน @media (prefers-color-scheme: dark) เพื่อสลับอัตโนมัติ',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface CssVar {
  id: number;
  name: string;
  value: string;
  type: string;
  comment: string;
}

const SAMPLE_VARS: CssVar[] = [
  { id: 1, name: '--primary-color', value: '#3b82f6', type: 'color', comment: 'Primary brand color' },
  { id: 2, name: '--secondary-color', value: '#10b981', type: 'color', comment: 'Secondary accent color' },
  { id: 3, name: '--bg-color', value: '#ffffff', type: 'color', comment: 'Background color' },
  { id: 4, name: '--text-color', value: '#1f2937', type: 'color', comment: 'Main text color' },
  { id: 5, name: '--font-size-base', value: '16px', type: 'size', comment: 'Base font size' },
  { id: 6, name: '--border-radius', value: '8px', type: 'size', comment: 'Default border radius' },
  { id: 7, name: '--font-family', value: 'Inter, system-ui, sans-serif', type: 'font', comment: 'Primary font stack' },
  { id: 8, name: '--spacing-unit', value: '8px', type: 'size', comment: 'Base spacing unit' },
];

let nextId = 100;

export default function CssVariablesGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [vars, setVars] = useState<CssVar[]>([
    { id: 1, name: '--primary-color', value: '#3b82f6', type: 'color', comment: 'Primary brand color' },
    { id: 2, name: '--text-color', value: '#1f2937', type: 'color', comment: 'Main text color' },
  ]);
  const [selector, setSelector] = useState(':root');
  const [includeComments, setIncludeComments] = useState(true);
  const [output, setOutput] = useState('');

  const generate = useCallback((varList: CssVar[], sel: string, comments: boolean) => {
    if (varList.length === 0) { setOutput(''); return; }
    const indent = '  ';
    const lines: string[] = [`${sel} {`];
    varList.forEach(v => {
      if (comments && v.comment) lines.push(`${indent}/* ${v.comment} */`);
      lines.push(`${indent}${v.name || '--unnamed'}: ${v.value || 'unset'};`);
    });
    lines.push('}');
    setOutput(lines.join('\n'));
  }, []);

  const updateVar = (id: number, field: keyof CssVar, value: string) => {
    const updated = vars.map(v => v.id === id ? { ...v, [field]: value } : v);
    setVars(updated);
    generate(updated, selector, includeComments);
  };

  const addVar = () => {
    const newVar: CssVar = { id: nextId++, name: '--new-variable', value: '', type: 'other', comment: '' };
    const updated = [...vars, newVar];
    setVars(updated);
    generate(updated, selector, includeComments);
  };

  const removeVar = (id: number) => {
    const updated = vars.filter(v => v.id !== id);
    setVars(updated);
    generate(updated, selector, includeComments);
  };

  const loadSample = () => {
    setVars(SAMPLE_VARS);
    generate(SAMPLE_VARS, selector, includeComments);
  };

  const clearAll = () => { setVars([]); setOutput(''); };

  const handleSelector = (val: string) => {
    setSelector(val);
    generate(vars, val, includeComments);
  };

  const handleComments = (val: boolean) => {
    setIncludeComments(val);
    generate(vars, selector, val);
  };

  const typeOptions = [
    { value: 'color', label: t.typeColor },
    { value: 'size', label: t.typeSize },
    { value: 'font', label: t.typeFont },
    { value: 'number', label: t.typeNumber },
    { value: 'other', label: t.typeOther },
  ];

  return (
    <ToolLayout title={t.title} description={t.description} toolId="css-variables-generator">
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{t.selector}:</label>
          <input
            value={selector}
            onChange={e => handleSelector(e.target.value)}
            style={{ width: 120, fontFamily: 'monospace', fontSize: 13, padding: '4px 8px' }}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={includeComments} onChange={e => handleComments(e.target.checked)} />
          {t.includeComments}
        </label>
        <button onClick={loadSample} className="btn btn-secondary" style={{ marginLeft: 'auto' }}>{t.loadSample}</button>
        <button onClick={clearAll} className="btn btn-secondary">{t.clear}</button>
      </div>

      {/* Variable rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {vars.map(v => (
          <div key={v.id} style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)' }}>
            <select
              value={v.type}
              onChange={e => updateVar(v.id, 'type', e.target.value)}
              style={{ width: 80, fontSize: 12, padding: '4px 4px' }}
            >
              {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <input
              value={v.name}
              onChange={e => updateVar(v.id, 'name', e.target.value)}
              placeholder={t.namePlaceholder}
              style={{ flex: '1 1 160px', fontFamily: 'monospace', fontSize: 13, padding: '4px 8px' }}
            />
            {v.type === 'color' ? (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <input
                  type="color"
                  value={v.value.startsWith('#') ? v.value : '#000000'}
                  onChange={e => updateVar(v.id, 'value', e.target.value)}
                  style={{ width: 36, height: 30, padding: 1, cursor: 'pointer', border: '1px solid var(--border-color)', borderRadius: 4 }}
                />
                <input
                  value={v.value}
                  onChange={e => updateVar(v.id, 'value', e.target.value)}
                  placeholder={t.valuePlaceholder}
                  style={{ width: 96, fontFamily: 'monospace', fontSize: 13, padding: '4px 8px' }}
                />
              </div>
            ) : (
              <input
                value={v.value}
                onChange={e => updateVar(v.id, 'value', e.target.value)}
                placeholder={t.valuePlaceholder}
                style={{ flex: '1 1 120px', fontFamily: 'monospace', fontSize: 13, padding: '4px 8px' }}
              />
            )}
            <input
              value={v.comment}
              onChange={e => updateVar(v.id, 'comment', e.target.value)}
              placeholder="comment..."
              style={{ flex: '1 1 140px', fontSize: 12, padding: '4px 8px', color: 'var(--text-secondary)' }}
            />
            <button onClick={() => removeVar(v.id)} style={{ color: '#ef4444', background: 'none', border: '1px solid #ef4444', borderRadius: 6, padding: '3px 8px', fontSize: 12, cursor: 'pointer' }}>
              {t.remove}
            </button>
          </div>
        ))}
      </div>

      <button onClick={addVar} className="btn btn-secondary" style={{ marginBottom: 16 }}>+ {t.addVar}</button>
      <button onClick={() => generate(vars, selector, includeComments)} className="btn btn-primary" style={{ marginLeft: 8, marginBottom: 16 }}>{t.generate}</button>

      {/* Output */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
          {output && <CopyButton text={output} />}
        </div>
        <textarea
          value={output}
          readOnly
          style={{ minHeight: 180, fontFamily: 'monospace', fontSize: 13, background: 'var(--bg-input)' }}
        />
      </div>

      {/* SEO content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{t.faqTitle}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
              <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 12px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{t.relatedTitle}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/css-gradient-generator`, label: 'CSS Gradient Generator' },
            { href: `/${lang}/tools/css-flexbox-generator`, label: 'CSS Flexbox Generator' },
            { href: `/${lang}/tools/css-grid-generator`, label: 'CSS Grid Generator' },
            { href: `/${lang}/tools/color-picker-online`, label: 'Color Picker Online' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
