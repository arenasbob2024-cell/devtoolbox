'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tailwind CSS Cheat Sheet: Complete Class Reference Guide',
    intro: 'Tailwind CSS is a utility-first CSS framework that lets you build designs directly in your markup. Instead of writing custom CSS, you apply pre-built utility classes. This <strong>complete Tailwind CSS cheat sheet</strong> covers every major category of classes with their CSS output, so you can quickly look up any utility you need.',
    whyTitle: 'Why Tailwind CSS and Why a Cheat Sheet?',
    whyDesc: 'Tailwind CSS has hundreds of utility classes. While the naming convention is intuitive, having a quick-reference cheat sheet saves time and boosts productivity. This guide organizes all essential classes by category with exact CSS output.',
    h2_spacing: 'Spacing: Padding & Margin',
    spacingDesc: 'Tailwind uses a consistent spacing scale. The number after <code>p-</code> or <code>m-</code> maps to a rem value (multiply by 0.25rem). Negative margins use <code>-m-</code> prefix.',
    h2_typography: 'Typography',
    typographyDesc: 'Tailwind provides utilities for font size, weight, line height, letter spacing, text alignment, and text color.',
    h3_fontSize: 'Font Size',
    h3_fontWeight: 'Font Weight',
    h3_lineHeight: 'Line Height',
    h3_letterSpacing: 'Letter Spacing',
    h3_textAlign: 'Text Alignment',
    h3_textColor: 'Text Color',
    h2_colors: 'Colors',
    colorsDesc: 'Tailwind uses a numeric color scale from 50 (lightest) to 950 (darkest). Colors are applied with prefixes: <code>bg-</code> for background, <code>text-</code> for text, and <code>border-</code> for borders.',
    h2_flexbox: 'Flexbox',
    flexboxDesc: 'Tailwind provides comprehensive flexbox utilities for building flexible layouts.',
    h2_grid: 'Grid',
    gridDesc: 'CSS Grid utilities for creating two-dimensional layouts.',
    h2_layout: 'Layout: Width, Height & Container',
    layoutDesc: 'Utilities for controlling element dimensions and layout containers.',
    h2_borders: 'Borders & Rounded Corners',
    bordersDesc: 'Utilities for border width, style, radius, and ring (outline) effects.',
    h2_shadows: 'Shadows & Effects',
    shadowsDesc: 'Utilities for box shadows, opacity, and blur effects.',
    h2_transitions: 'Transitions & Animation',
    transitionsDesc: 'Utilities for CSS transitions and keyframe animations.',
    h2_responsive: 'Responsive Prefixes',
    responsiveDesc: 'Tailwind uses mobile-first responsive design. Prefix any utility with a breakpoint to apply it at that screen size and above.',
    h2_states: 'State Variants',
    statesDesc: 'Apply styles conditionally using state variant prefixes.',
    h2_tips: 'Tips & Advanced Usage',
    tipsDesc: 'Power-user features for when the built-in utilities are not enough.',
    h3_arbitrary: 'Arbitrary Values',
    arbitraryDesc: 'Use square brackets to specify any custom value:',
    h3_important: 'Important Modifier',
    importantDesc: 'Prefix any utility with <code>!</code> to add <code>!important</code>:',
    h3_apply: '@apply Directive',
    applyDesc: 'Extract repeated utility patterns into custom CSS classes:',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between Tailwind CSS and regular CSS?',
    faq1_a: 'Tailwind CSS is a utility-first framework that provides pre-built CSS classes you apply directly in HTML. Unlike regular CSS where you write custom stylesheets, Tailwind lets you style elements inline using class names like p-4, text-lg, and bg-blue-500. This approach eliminates the need to switch between HTML and CSS files and avoids naming CSS classes.',
    faq2_q: 'How does the Tailwind CSS spacing scale work?',
    faq2_a: 'Tailwind uses a consistent spacing scale where each unit equals 0.25rem (4px). So p-1 is 0.25rem (4px), p-2 is 0.5rem (8px), p-4 is 1rem (16px), and so on. The scale goes from 0 to 96 (24rem/384px). You can also use arbitrary values like p-[13px] for custom spacing.',
    faq3_q: 'How do responsive breakpoints work in Tailwind CSS?',
    faq3_a: 'Tailwind uses a mobile-first approach. Unprefixed utilities apply to all screen sizes. Prefixed utilities like md:flex only apply at that breakpoint and above. The default breakpoints are sm (640px), md (768px), lg (1024px), xl (1280px), and 2xl (1536px). You stack prefixes to create responsive designs, e.g., w-full md:w-1/2 lg:w-1/3.',
    faq4_q: 'Can I use custom colors in Tailwind CSS?',
    faq4_a: 'Yes. You can extend the default color palette in tailwind.config.js under theme.extend.colors. You can also use arbitrary values like bg-[#1a2b3c] or text-[rgb(255,100,50)] directly in your markup for one-off colors without modifying the config.',
    faq5_q: 'What is the @apply directive and when should I use it?',
    faq5_a: 'The @apply directive lets you extract repeated utility patterns into custom CSS classes. For example, if you use "px-4 py-2 bg-blue-500 text-white rounded" on many buttons, you can create a .btn class with @apply. Use it sparingly - Tailwind recommends using utilities directly and only extracting components when you have true duplication across many files.',
    faq6_q: 'How do I make Tailwind CSS work with dark mode?',
    faq6_a: 'Tailwind supports dark mode via the dark: variant. Prefix any utility with dark: to apply it when dark mode is active, e.g., bg-white dark:bg-gray-900. Configure dark mode strategy in tailwind.config.js as "media" (follows OS preference) or "class" (toggle via a class on the html element).',
  },
  zh: {
    title: 'Tailwind CSS 速查表：完整类名参考指南',
    intro: 'Tailwind CSS 是一个实用优先的 CSS 框架，让你直接在标记中构建设计。无需编写自定义 CSS，你只需应用预构建的实用类。本<strong>完整的 Tailwind CSS 速查表</strong>涵盖每个主要类别的类及其 CSS 输出，方便你快速查找任何实用工具类。',
    whyTitle: '为什么选择 Tailwind CSS？为什么需要速查表？',
    whyDesc: 'Tailwind CSS 有数百个实用类。虽然命名约定很直观，但拥有一份快速参考表可以节省时间并提高生产力。本指南按类别组织所有核心类，并附带精确的 CSS 输出。',
    h2_spacing: '间距：内边距和外边距',
    spacingDesc: 'Tailwind 使用一致的间距比例。<code>p-</code> 或 <code>m-</code> 后的数字映射到 rem 值（乘以 0.25rem）。负外边距使用 <code>-m-</code> 前缀。',
    h2_typography: '排版',
    typographyDesc: 'Tailwind 提供字体大小、字重、行高、字间距、文本对齐和文本颜色的实用工具。',
    h3_fontSize: '字体大小',
    h3_fontWeight: '字体粗细',
    h3_lineHeight: '行高',
    h3_letterSpacing: '字间距',
    h3_textAlign: '文本对齐',
    h3_textColor: '文本颜色',
    h2_colors: '颜色',
    colorsDesc: 'Tailwind 使用 50（最浅）到 950（最深）的数字颜色比例。颜色通过前缀应用：<code>bg-</code> 用于背景，<code>text-</code> 用于文本，<code>border-</code> 用于边框。',
    h2_flexbox: 'Flexbox 弹性布局',
    flexboxDesc: 'Tailwind 提供全面的 flexbox 实用工具来构建弹性布局。',
    h2_grid: 'Grid 网格布局',
    gridDesc: '用于创建二维布局的 CSS Grid 实用工具。',
    h2_layout: '布局：宽度、高度和容器',
    layoutDesc: '控制元素尺寸和布局容器的实用工具。',
    h2_borders: '边框和圆角',
    bordersDesc: '边框宽度、样式、圆角和轮廓环效果的实用工具。',
    h2_shadows: '阴影和效果',
    shadowsDesc: '盒阴影、不透明度和模糊效果的实用工具。',
    h2_transitions: '过渡和动画',
    transitionsDesc: 'CSS 过渡和关键帧动画的实用工具。',
    h2_responsive: '响应式前缀',
    responsiveDesc: 'Tailwind 使用移动优先的响应式设计。在任何实用类前加上断点前缀，即可在该屏幕尺寸及以上应用。',
    h2_states: '状态变体',
    statesDesc: '使用状态变体前缀有条件地应用样式。',
    h2_tips: '技巧和高级用法',
    tipsDesc: '当内置实用工具不够用时的高级功能。',
    h3_arbitrary: '任意值',
    arbitraryDesc: '使用方括号指定任何自定义值：',
    h3_important: 'Important 修饰符',
    importantDesc: '在任何实用类前加 <code>!</code> 以添加 <code>!important</code>：',
    h3_apply: '@apply 指令',
    applyDesc: '将重复的实用工具模式提取为自定义 CSS 类：',
    h2_faq: '常见问题',
    faq1_q: 'Tailwind CSS 和普通 CSS 有什么区别？',
    faq1_a: 'Tailwind CSS 是一个实用优先的框架，提供预构建的 CSS 类，直接在 HTML 中应用。与编写自定义样式表的普通 CSS 不同，Tailwind 让你使用 p-4、text-lg、bg-blue-500 等类名内联样式化元素。这种方法消除了在 HTML 和 CSS 文件之间切换的需要。',
    faq2_q: 'Tailwind CSS 的间距比例如何工作？',
    faq2_a: 'Tailwind 使用一致的间距比例，每个单位等于 0.25rem（4px）。p-1 是 0.25rem（4px），p-2 是 0.5rem（8px），p-4 是 1rem（16px），以此类推。比例从 0 到 96（24rem/384px）。你也可以使用任意值如 p-[13px]。',
    faq3_q: 'Tailwind CSS 的响应式断点如何工作？',
    faq3_a: 'Tailwind 使用移动优先方法。无前缀的实用类适用于所有屏幕尺寸。带前缀的如 md:flex 仅在该断点及以上生效。默认断点为 sm（640px）、md（768px）、lg（1024px）、xl（1280px）和 2xl（1536px）。',
    faq4_q: '可以在 Tailwind CSS 中使用自定义颜色吗？',
    faq4_a: '可以。你可以在 tailwind.config.js 的 theme.extend.colors 下扩展默认调色板。也可以直接在标记中使用任意值如 bg-[#1a2b3c] 或 text-[rgb(255,100,50)]。',
    faq5_q: '@apply 指令是什么？何时使用？',
    faq5_a: '@apply 指令让你将重复的实用工具模式提取为自定义 CSS 类。当多个按钮使用相同的类组合时，可以创建一个 .btn 类并用 @apply。但应谨慎使用 - Tailwind 推荐直接使用实用类。',
    faq6_q: '如何让 Tailwind CSS 支持暗色模式？',
    faq6_a: 'Tailwind 通过 dark: 变体支持暗色模式。在任何实用类前加 dark: 前缀，如 bg-white dark:bg-gray-900。在 tailwind.config.js 中配置暗色模式策略为 "media"（跟随系统偏好）或 "class"（通过 html 元素上的类切换）。',
  },
  ja: {
    title: 'Tailwind CSS チートシート：完全クラスリファレンスガイド',
    intro: 'Tailwind CSS はユーティリティファーストの CSS フレームワークで、マークアップ内で直接デザインを構築できます。カスタム CSS を書く代わりに、事前構築されたユーティリティクラスを適用します。この<strong>完全な Tailwind CSS チートシート</strong>は、すべての主要カテゴリのクラスとその CSS 出力をカバーしています。',
    whyTitle: 'なぜ Tailwind CSS？なぜチートシート？',
    whyDesc: 'Tailwind CSS には何百ものユーティリティクラスがあります。命名規則は直感的ですが、クイックリファレンスがあれば時間を節約し生産性を向上させます。',
    h2_spacing: 'スペーシング：パディングとマージン',
    spacingDesc: 'Tailwind は一貫したスペーシングスケールを使用します。<code>p-</code> または <code>m-</code> の後の数字は rem 値にマッピングされます（0.25rem を掛ける）。負のマージンは <code>-m-</code> プレフィックスを使用します。',
    h2_typography: 'タイポグラフィ',
    typographyDesc: 'フォントサイズ、太さ、行の高さ、文字間隔、テキスト配置、テキストカラーのユーティリティ。',
    h3_fontSize: 'フォントサイズ', h3_fontWeight: 'フォントウェイト', h3_lineHeight: '行の高さ',
    h3_letterSpacing: '文字間隔', h3_textAlign: 'テキスト配置', h3_textColor: 'テキストカラー',
    h2_colors: 'カラー',
    colorsDesc: 'Tailwind は 50（最も明るい）から 950（最も暗い）の数値カラースケールを使用します。プレフィックス：<code>bg-</code> は背景、<code>text-</code> はテキスト、<code>border-</code> はボーダー。',
    h2_flexbox: 'Flexbox',
    flexboxDesc: '柔軟なレイアウトを構築するための包括的な flexbox ユーティリティ。',
    h2_grid: 'Grid',
    gridDesc: '2次元レイアウトを作成するための CSS Grid ユーティリティ。',
    h2_layout: 'レイアウト：幅、高さ、コンテナ',
    layoutDesc: '要素の寸法とレイアウトコンテナを制御するユーティリティ。',
    h2_borders: 'ボーダーと角丸',
    bordersDesc: 'ボーダー幅、スタイル、角丸、リングエフェクトのユーティリティ。',
    h2_shadows: 'シャドウとエフェクト',
    shadowsDesc: 'ボックスシャドウ、不透明度、ブラーエフェクトのユーティリティ。',
    h2_transitions: 'トランジションとアニメーション',
    transitionsDesc: 'CSS トランジションとキーフレームアニメーションのユーティリティ。',
    h2_responsive: 'レスポンシブプレフィックス',
    responsiveDesc: 'Tailwind はモバイルファーストのレスポンシブデザインを使用します。任意のユーティリティにブレークポイントプレフィックスを付けて適用します。',
    h2_states: 'ステートバリアント',
    statesDesc: 'ステートバリアントプレフィックスを使用して条件付きでスタイルを適用します。',
    h2_tips: 'ヒントと高度な使い方',
    tipsDesc: '組み込みユーティリティでは不十分な場合のパワーユーザー機能。',
    h3_arbitrary: '任意の値', arbitraryDesc: '角括弧を使用してカスタム値を指定：',
    h3_important: 'Important 修飾子', importantDesc: '任意のユーティリティの前に <code>!</code> を付けて <code>!important</code> を追加：',
    h3_apply: '@apply ディレクティブ', applyDesc: '繰り返しのユーティリティパターンをカスタム CSS クラスに抽出：',
    h2_faq: 'よくある質問',
    faq1_q: 'Tailwind CSS と通常の CSS の違いは何ですか？',
    faq1_a: 'Tailwind CSS はユーティリティファーストのフレームワークで、HTML に直接適用する事前構築された CSS クラスを提供します。カスタムスタイルシートを書く通常の CSS とは異なり、p-4、text-lg、bg-blue-500 などのクラス名を使用して要素をスタイリングします。',
    faq2_q: 'Tailwind CSS のスペーシングスケールはどう機能しますか？',
    faq2_a: '各単位は 0.25rem（4px）です。p-1 は 0.25rem、p-4 は 1rem（16px）です。スケールは 0 から 96（24rem/384px）まであり、p-[13px] のような任意の値も使用できます。',
    faq3_q: 'レスポンシブブレークポイントはどう機能しますか？',
    faq3_a: 'モバイルファーストアプローチです。プレフィックスなしのユーティリティは全画面サイズに適用。md:flex のようなプレフィックス付きはそのブレークポイント以上で適用されます。デフォルト：sm(640px)、md(768px)、lg(1024px)、xl(1280px)、2xl(1536px)。',
    faq4_q: 'カスタムカラーを使用できますか？',
    faq4_a: 'はい。tailwind.config.js の theme.extend.colors で拡張するか、bg-[#1a2b3c] のような任意の値を直接使用できます。',
    faq5_q: '@apply ディレクティブとは何ですか？',
    faq5_a: '@apply は繰り返しのユーティリティパターンをカスタム CSS クラスに抽出できます。多くのボタンで同じクラスの組み合わせを使う場合に便利ですが、控えめに使用してください。',
    faq6_q: 'ダークモードに対応するには？',
    faq6_a: 'dark: バリアントを使用します。bg-white dark:bg-gray-900 のように任意のユーティリティに dark: プレフィックスを付けます。tailwind.config.js で "media" または "class" 戦略を設定します。',
  },
  ko: {
    title: 'Tailwind CSS 치트 시트: 완전한 클래스 레퍼런스 가이드',
    intro: 'Tailwind CSS는 마크업에서 직접 디자인을 구축할 수 있는 유틸리티 우선 CSS 프레임워크입니다. 커스텀 CSS를 작성하는 대신 미리 구축된 유틸리티 클래스를 적용합니다. 이 <strong>완전한 Tailwind CSS 치트 시트</strong>는 모든 주요 카테고리의 클래스와 CSS 출력을 다룹니다.',
    whyTitle: '왜 Tailwind CSS인가? 왜 치트 시트가 필요한가?',
    whyDesc: 'Tailwind CSS에는 수백 개의 유틸리티 클래스가 있습니다. 명명 규칙이 직관적이지만, 빠른 참조 시트가 있으면 시간을 절약하고 생산성을 높일 수 있습니다.',
    h2_spacing: '간격: 패딩과 마진',
    spacingDesc: 'Tailwind는 일관된 간격 스케일을 사용합니다. <code>p-</code> 또는 <code>m-</code> 뒤의 숫자는 rem 값에 매핑됩니다(0.25rem 곱하기). 음수 마진은 <code>-m-</code> 접두사를 사용합니다.',
    h2_typography: '타이포그래피',
    typographyDesc: '글꼴 크기, 굵기, 줄 높이, 자간, 텍스트 정렬, 텍스트 색상 유틸리티.',
    h3_fontSize: '글꼴 크기', h3_fontWeight: '글꼴 굵기', h3_lineHeight: '줄 높이',
    h3_letterSpacing: '자간', h3_textAlign: '텍스트 정렬', h3_textColor: '텍스트 색상',
    h2_colors: '색상',
    colorsDesc: 'Tailwind는 50(가장 밝음)에서 950(가장 어두움)까지의 숫자 색상 스케일을 사용합니다. 접두사: <code>bg-</code>는 배경, <code>text-</code>는 텍스트, <code>border-</code>는 테두리.',
    h2_flexbox: 'Flexbox',
    flexboxDesc: '유연한 레이아웃을 구축하기 위한 포괄적인 flexbox 유틸리티.',
    h2_grid: 'Grid',
    gridDesc: '2차원 레이아웃을 만들기 위한 CSS Grid 유틸리티.',
    h2_layout: '레이아웃: 너비, 높이, 컨테이너',
    layoutDesc: '요소 크기와 레이아웃 컨테이너를 제어하는 유틸리티.',
    h2_borders: '테두리와 모서리 둥글기',
    bordersDesc: '테두리 너비, 스타일, 둥근 모서리, 링 효과 유틸리티.',
    h2_shadows: '그림자와 효과',
    shadowsDesc: '박스 그림자, 불투명도, 블러 효과 유틸리티.',
    h2_transitions: '트랜지션과 애니메이션',
    transitionsDesc: 'CSS 트랜지션과 키프레임 애니메이션 유틸리티.',
    h2_responsive: '반응형 접두사',
    responsiveDesc: 'Tailwind는 모바일 우선 반응형 디자인을 사용합니다. 유틸리티에 브레이크포인트 접두사를 붙여 적용합니다.',
    h2_states: '상태 변형',
    statesDesc: '상태 변형 접두사를 사용하여 조건부로 스타일을 적용합니다.',
    h2_tips: '팁과 고급 사용법',
    tipsDesc: '내장 유틸리티로 충분하지 않을 때의 고급 기능.',
    h3_arbitrary: '임의 값', arbitraryDesc: '대괄호를 사용하여 커스텀 값 지정:',
    h3_important: 'Important 수정자', importantDesc: '유틸리티 앞에 <code>!</code>를 붙여 <code>!important</code> 추가:',
    h3_apply: '@apply 지시어', applyDesc: '반복되는 유틸리티 패턴을 커스텀 CSS 클래스로 추출:',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Tailwind CSS와 일반 CSS의 차이점은 무엇인가요?',
    faq1_a: 'Tailwind CSS는 HTML에 직접 적용하는 미리 구축된 CSS 클래스를 제공하는 유틸리티 우선 프레임워크입니다. p-4, text-lg, bg-blue-500 같은 클래스명으로 요소를 스타일링합니다.',
    faq2_q: 'Tailwind CSS 간격 스케일은 어떻게 작동하나요?',
    faq2_a: '각 단위는 0.25rem(4px)입니다. p-1은 0.25rem, p-4는 1rem(16px)입니다. 스케일은 0에서 96(24rem/384px)까지이며 p-[13px] 같은 임의 값도 사용 가능합니다.',
    faq3_q: '반응형 브레이크포인트는 어떻게 작동하나요?',
    faq3_a: '모바일 우선 접근 방식입니다. 접두사 없는 유틸리티는 모든 화면에 적용됩니다. md:flex 같은 접두사는 해당 브레이크포인트 이상에서 적용됩니다. 기본값: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px).',
    faq4_q: '커스텀 색상을 사용할 수 있나요?',
    faq4_a: '네. tailwind.config.js의 theme.extend.colors에서 확장하거나 bg-[#1a2b3c] 같은 임의 값을 직접 사용할 수 있습니다.',
    faq5_q: '@apply 지시어란 무엇인가요?',
    faq5_a: '@apply는 반복되는 유틸리티 패턴을 커스텀 CSS 클래스로 추출합니다. 여러 버튼에서 같은 클래스 조합을 사용할 때 유용하지만 절제하여 사용하세요.',
    faq6_q: '다크 모드를 지원하려면 어떻게 하나요?',
    faq6_a: 'dark: 변형을 사용합니다. bg-white dark:bg-gray-900처럼 유틸리티에 dark: 접두사를 붙입니다. tailwind.config.js에서 "media" 또는 "class" 전략을 설정합니다.',
  },
  fr: {
    title: 'Tailwind CSS Cheat Sheet : Guide de reference complet des classes',
    intro: 'Tailwind CSS est un framework CSS utilitaire qui vous permet de construire des designs directement dans votre balisage. Au lieu d\'ecrire du CSS personnalise, vous appliquez des classes utilitaires preconstruites. Ce <strong>memento complet Tailwind CSS</strong> couvre toutes les categories principales de classes avec leur sortie CSS.',
    whyTitle: 'Pourquoi Tailwind CSS et pourquoi un memento ?',
    whyDesc: 'Tailwind CSS possede des centaines de classes utilitaires. Bien que la convention de nommage soit intuitive, un memento rapide fait gagner du temps et ameliore la productivite.',
    h2_spacing: 'Espacement : Padding et Margin',
    spacingDesc: 'Tailwind utilise une echelle d\'espacement coherente. Le nombre apres <code>p-</code> ou <code>m-</code> correspond a une valeur rem (multiplier par 0.25rem). Les marges negatives utilisent le prefixe <code>-m-</code>.',
    h2_typography: 'Typographie',
    typographyDesc: 'Utilitaires pour la taille de police, graisse, hauteur de ligne, espacement des lettres, alignement et couleur du texte.',
    h3_fontSize: 'Taille de police', h3_fontWeight: 'Graisse de police', h3_lineHeight: 'Hauteur de ligne',
    h3_letterSpacing: 'Espacement des lettres', h3_textAlign: 'Alignement du texte', h3_textColor: 'Couleur du texte',
    h2_colors: 'Couleurs',
    colorsDesc: 'Tailwind utilise une echelle de couleurs numerique de 50 (le plus clair) a 950 (le plus fonce). Prefixes : <code>bg-</code> pour le fond, <code>text-</code> pour le texte, <code>border-</code> pour les bordures.',
    h2_flexbox: 'Flexbox',
    flexboxDesc: 'Utilitaires flexbox complets pour construire des mises en page flexibles.',
    h2_grid: 'Grid',
    gridDesc: 'Utilitaires CSS Grid pour creer des mises en page bidimensionnelles.',
    h2_layout: 'Mise en page : Largeur, Hauteur et Conteneur',
    layoutDesc: 'Utilitaires pour controler les dimensions des elements et les conteneurs.',
    h2_borders: 'Bordures et coins arrondis',
    bordersDesc: 'Utilitaires pour la largeur des bordures, le style, le rayon et les effets de ring.',
    h2_shadows: 'Ombres et effets',
    shadowsDesc: 'Utilitaires pour les ombres, l\'opacite et les effets de flou.',
    h2_transitions: 'Transitions et animations',
    transitionsDesc: 'Utilitaires pour les transitions CSS et les animations keyframe.',
    h2_responsive: 'Prefixes responsifs',
    responsiveDesc: 'Tailwind utilise une approche mobile-first. Prefixez n\'importe quel utilitaire avec un breakpoint pour l\'appliquer a cette taille et au-dessus.',
    h2_states: 'Variantes d\'etat',
    statesDesc: 'Appliquez des styles conditionnellement avec les prefixes de variantes d\'etat.',
    h2_tips: 'Astuces et utilisation avancee',
    tipsDesc: 'Fonctionnalites avancees quand les utilitaires integres ne suffisent pas.',
    h3_arbitrary: 'Valeurs arbitraires', arbitraryDesc: 'Utilisez des crochets pour specifier une valeur personnalisee :',
    h3_important: 'Modificateur Important', importantDesc: 'Prefixez un utilitaire avec <code>!</code> pour ajouter <code>!important</code> :',
    h3_apply: 'Directive @apply', applyDesc: 'Extrayez les patterns repetes en classes CSS personnalisees :',
    h2_faq: 'Questions frequentes',
    faq1_q: 'Quelle est la difference entre Tailwind CSS et le CSS classique ?',
    faq1_a: 'Tailwind CSS est un framework utilitaire qui fournit des classes CSS preconstruites a appliquer directement en HTML. Contrairement au CSS classique, Tailwind utilise des noms de classes comme p-4, text-lg, bg-blue-500.',
    faq2_q: 'Comment fonctionne l\'echelle d\'espacement ?',
    faq2_a: 'Chaque unite vaut 0.25rem (4px). p-1 = 0.25rem, p-4 = 1rem (16px). L\'echelle va de 0 a 96 (24rem/384px). Les valeurs arbitraires comme p-[13px] sont aussi supportees.',
    faq3_q: 'Comment fonctionnent les breakpoints responsifs ?',
    faq3_a: 'Approche mobile-first. Les utilitaires sans prefixe s\'appliquent a toutes les tailles. md:flex s\'applique a partir de 768px. Breakpoints : sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px).',
    faq4_q: 'Peut-on utiliser des couleurs personnalisees ?',
    faq4_a: 'Oui. Etendez la palette dans tailwind.config.js sous theme.extend.colors ou utilisez des valeurs arbitraires comme bg-[#1a2b3c].',
    faq5_q: 'Qu\'est-ce que la directive @apply ?',
    faq5_a: '@apply permet d\'extraire des patterns de classes repetes en classes CSS personnalisees. Utilisez-la avec parcimonie - Tailwind recommande d\'utiliser les utilitaires directement.',
    faq6_q: 'Comment supporter le mode sombre ?',
    faq6_a: 'Utilisez la variante dark:, par exemple bg-white dark:bg-gray-900. Configurez la strategie dans tailwind.config.js comme "media" ou "class".',
  },
  de: {
    title: 'Tailwind CSS Cheat Sheet: Vollstandige Klassenreferenz',
    intro: 'Tailwind CSS ist ein Utility-First CSS-Framework, mit dem Sie Designs direkt im Markup erstellen konnen. Statt benutzerdefiniertes CSS zu schreiben, wenden Sie vorgefertigte Utility-Klassen an. Dieses <strong>vollstandige Tailwind CSS Cheat Sheet</strong> deckt alle wichtigen Klassenkategorien mit ihrer CSS-Ausgabe ab.',
    whyTitle: 'Warum Tailwind CSS und warum ein Cheat Sheet?',
    whyDesc: 'Tailwind CSS hat Hunderte von Utility-Klassen. Obwohl die Namenskonvention intuitiv ist, spart ein Nachschlagewerk Zeit und steigert die Produktivitat.',
    h2_spacing: 'Abstande: Padding und Margin',
    spacingDesc: 'Tailwind verwendet eine konsistente Abstandsskala. Die Zahl nach <code>p-</code> oder <code>m-</code> wird auf einen rem-Wert abgebildet (mal 0.25rem). Negative Margins verwenden das Prafix <code>-m-</code>.',
    h2_typography: 'Typografie',
    typographyDesc: 'Utilities fur Schriftgrosse, Schriftstarke, Zeilenhohe, Zeichenabstand, Textausrichtung und Textfarbe.',
    h3_fontSize: 'Schriftgrosse', h3_fontWeight: 'Schriftstarke', h3_lineHeight: 'Zeilenhohe',
    h3_letterSpacing: 'Zeichenabstand', h3_textAlign: 'Textausrichtung', h3_textColor: 'Textfarbe',
    h2_colors: 'Farben',
    colorsDesc: 'Tailwind verwendet eine numerische Farbskala von 50 (hellste) bis 950 (dunkelste). Prafixe: <code>bg-</code> fur Hintergrund, <code>text-</code> fur Text, <code>border-</code> fur Rahmen.',
    h2_flexbox: 'Flexbox',
    flexboxDesc: 'Umfassende Flexbox-Utilities zum Erstellen flexibler Layouts.',
    h2_grid: 'Grid',
    gridDesc: 'CSS Grid Utilities zum Erstellen zweidimensionaler Layouts.',
    h2_layout: 'Layout: Breite, Hohe und Container',
    layoutDesc: 'Utilities zur Steuerung von Elementdimensionen und Layout-Containern.',
    h2_borders: 'Rahmen und abgerundete Ecken',
    bordersDesc: 'Utilities fur Rahmenbreite, Stil, Radius und Ring-Effekte.',
    h2_shadows: 'Schatten und Effekte',
    shadowsDesc: 'Utilities fur Box-Schatten, Deckkraft und Unschaerfe-Effekte.',
    h2_transitions: 'Ubergange und Animationen',
    transitionsDesc: 'Utilities fur CSS-Ubergange und Keyframe-Animationen.',
    h2_responsive: 'Responsive Prafixe',
    responsiveDesc: 'Tailwind verwendet ein Mobile-First-Responsiv-Design. Stellen Sie jedem Utility ein Breakpoint-Prafix voran.',
    h2_states: 'Zustandsvarianten',
    statesDesc: 'Wenden Sie Styles bedingt mit Zustandsvarianten-Prafixen an.',
    h2_tips: 'Tipps und fortgeschrittene Nutzung',
    tipsDesc: 'Power-User-Funktionen wenn die integrierten Utilities nicht ausreichen.',
    h3_arbitrary: 'Beliebige Werte', arbitraryDesc: 'Verwenden Sie eckige Klammern fur benutzerdefinierte Werte:',
    h3_important: 'Important-Modifikator', importantDesc: 'Stellen Sie <code>!</code> voran um <code>!important</code> hinzuzufugen:',
    h3_apply: '@apply-Direktive', applyDesc: 'Extrahieren Sie wiederholte Utility-Muster in benutzerdefinierte CSS-Klassen:',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was ist der Unterschied zwischen Tailwind CSS und normalem CSS?',
    faq1_a: 'Tailwind CSS ist ein Utility-First-Framework mit vorgefertigten CSS-Klassen, die direkt im HTML angewendet werden. Statt benutzerdefinierte Stylesheets zu schreiben, verwenden Sie Klassennamen wie p-4, text-lg, bg-blue-500.',
    faq2_q: 'Wie funktioniert die Abstandsskala?',
    faq2_a: 'Jede Einheit entspricht 0.25rem (4px). p-1 = 0.25rem, p-4 = 1rem (16px). Die Skala reicht von 0 bis 96 (24rem/384px). Beliebige Werte wie p-[13px] sind ebenfalls moglich.',
    faq3_q: 'Wie funktionieren responsive Breakpoints?',
    faq3_a: 'Mobile-First-Ansatz. Utilities ohne Prafix gelten fur alle Bildschirmgrossen. md:flex gilt ab 768px. Standard-Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px).',
    faq4_q: 'Kann man benutzerdefinierte Farben verwenden?',
    faq4_a: 'Ja. Erweitern Sie die Palette in tailwind.config.js unter theme.extend.colors oder verwenden Sie beliebige Werte wie bg-[#1a2b3c].',
    faq5_q: 'Was ist die @apply-Direktive?',
    faq5_a: '@apply ermoglicht es, wiederholte Utility-Muster in benutzerdefinierte CSS-Klassen zu extrahieren. Verwenden Sie es sparsam - Tailwind empfiehlt die direkte Nutzung von Utilities.',
    faq6_q: 'Wie unterstutzt man den Dunkelmodus?',
    faq6_a: 'Verwenden Sie die dark:-Variante, z.B. bg-white dark:bg-gray-900. Konfigurieren Sie die Strategie in tailwind.config.js als "media" oder "class".',
  },
  es: {
    title: 'Tailwind CSS Cheat Sheet: Guia completa de referencia de clases',
    intro: 'Tailwind CSS es un framework CSS de utilidades que te permite construir disenos directamente en tu marcado. En lugar de escribir CSS personalizado, aplicas clases de utilidad preconstruidas. Esta <strong>hoja de referencia completa de Tailwind CSS</strong> cubre todas las categorias principales de clases con su salida CSS.',
    whyTitle: 'Por que Tailwind CSS y por que una hoja de referencia?',
    whyDesc: 'Tailwind CSS tiene cientos de clases de utilidad. Aunque la convencion de nombres es intuitiva, tener una referencia rapida ahorra tiempo y aumenta la productividad.',
    h2_spacing: 'Espaciado: Padding y Margin',
    spacingDesc: 'Tailwind usa una escala de espaciado consistente. El numero despues de <code>p-</code> o <code>m-</code> se mapea a un valor rem (multiplicar por 0.25rem). Los margenes negativos usan el prefijo <code>-m-</code>.',
    h2_typography: 'Tipografia',
    typographyDesc: 'Utilidades para tamano de fuente, peso, altura de linea, espaciado de letras, alineacion y color de texto.',
    h3_fontSize: 'Tamano de fuente', h3_fontWeight: 'Peso de fuente', h3_lineHeight: 'Altura de linea',
    h3_letterSpacing: 'Espaciado de letras', h3_textAlign: 'Alineacion de texto', h3_textColor: 'Color de texto',
    h2_colors: 'Colores',
    colorsDesc: 'Tailwind usa una escala de color numerica de 50 (mas claro) a 950 (mas oscuro). Prefijos: <code>bg-</code> para fondo, <code>text-</code> para texto, <code>border-</code> para bordes.',
    h2_flexbox: 'Flexbox',
    flexboxDesc: 'Utilidades flexbox completas para construir layouts flexibles.',
    h2_grid: 'Grid',
    gridDesc: 'Utilidades CSS Grid para crear layouts bidimensionales.',
    h2_layout: 'Layout: Ancho, Alto y Contenedor',
    layoutDesc: 'Utilidades para controlar dimensiones de elementos y contenedores de layout.',
    h2_borders: 'Bordes y esquinas redondeadas',
    bordersDesc: 'Utilidades para ancho de borde, estilo, radio y efectos de ring.',
    h2_shadows: 'Sombras y efectos',
    shadowsDesc: 'Utilidades para sombras de caja, opacidad y efectos de desenfoque.',
    h2_transitions: 'Transiciones y animaciones',
    transitionsDesc: 'Utilidades para transiciones CSS y animaciones keyframe.',
    h2_responsive: 'Prefijos responsivos',
    responsiveDesc: 'Tailwind usa un diseno responsivo mobile-first. Prefijar cualquier utilidad con un breakpoint la aplica en ese tamano y superiores.',
    h2_states: 'Variantes de estado',
    statesDesc: 'Aplica estilos condicionalmente usando prefijos de variantes de estado.',
    h2_tips: 'Consejos y uso avanzado',
    tipsDesc: 'Funciones avanzadas cuando las utilidades integradas no son suficientes.',
    h3_arbitrary: 'Valores arbitrarios', arbitraryDesc: 'Usa corchetes para especificar cualquier valor personalizado:',
    h3_important: 'Modificador Important', importantDesc: 'Prefija cualquier utilidad con <code>!</code> para agregar <code>!important</code>:',
    h3_apply: 'Directiva @apply', applyDesc: 'Extrae patrones de utilidades repetidos en clases CSS personalizadas:',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Cual es la diferencia entre Tailwind CSS y CSS normal?',
    faq1_a: 'Tailwind CSS es un framework de utilidades que proporciona clases CSS preconstruidas para aplicar directamente en HTML. En vez de escribir hojas de estilo personalizadas, usas nombres de clase como p-4, text-lg, bg-blue-500.',
    faq2_q: 'Como funciona la escala de espaciado?',
    faq2_a: 'Cada unidad equivale a 0.25rem (4px). p-1 = 0.25rem, p-4 = 1rem (16px). La escala va de 0 a 96 (24rem/384px). Tambien se soportan valores arbitrarios como p-[13px].',
    faq3_q: 'Como funcionan los breakpoints responsivos?',
    faq3_a: 'Enfoque mobile-first. Utilidades sin prefijo aplican a todos los tamanos. md:flex aplica desde 768px en adelante. Breakpoints por defecto: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px).',
    faq4_q: 'Se pueden usar colores personalizados?',
    faq4_a: 'Si. Extiende la paleta en tailwind.config.js bajo theme.extend.colors o usa valores arbitrarios como bg-[#1a2b3c] directamente.',
    faq5_q: 'Que es la directiva @apply?',
    faq5_a: '@apply permite extraer patrones de utilidades repetidos en clases CSS personalizadas. Usala con moderacion - Tailwind recomienda usar utilidades directamente.',
    faq6_q: 'Como soportar el modo oscuro?',
    faq6_a: 'Usa la variante dark:, por ejemplo bg-white dark:bg-gray-900. Configura la estrategia en tailwind.config.js como "media" o "class".',
  },
};

const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, fontSize: 14 };
const thStyle = { padding: '8px 12px', textAlign: 'left' as const };
const tdStyle = { padding: '8px 12px' };
const headRow = { borderBottom: '2px solid #334155' };
const bodyRow = { borderBottom: '1px solid #334155' };

function T({ rows, headers }: { rows: string[][]; headers: string[] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={tableStyle}>
        <thead>
          <tr style={headRow}>
            {headers.map((h, i) => <th key={i} style={thStyle}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={bodyRow}>
              {row.map((cell, j) => (
                <td key={j} style={tdStyle}>{j === 0 ? <code>{cell}</code> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TailwindCssCheatSheet({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqItems = [
    { q: t.faq1_q, a: t.faq1_a },
    { q: t.faq2_q, a: t.faq2_a },
    { q: t.faq3_q, a: t.faq3_a },
    { q: t.faq4_q, a: t.faq4_a },
    { q: t.faq5_q, a: t.faq5_a },
    { q: t.faq6_q, a: t.faq6_a },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <h2 className="text-2xl font-bold mt-10 mb-4">{t.whyTitle}</h2>
      <p>{t.whyDesc}</p>

      {/* ===== 1. SPACING ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_spacing}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.spacingDesc }} />

      <T headers={['Class', 'CSS Output', 'Value']} rows={[
        ['p-0', 'padding: 0px', '0px'],
        ['p-1', 'padding: 0.25rem', '4px'],
        ['p-2', 'padding: 0.5rem', '8px'],
        ['p-3', 'padding: 0.75rem', '12px'],
        ['p-4', 'padding: 1rem', '16px'],
        ['p-5', 'padding: 1.25rem', '20px'],
        ['p-6', 'padding: 1.5rem', '24px'],
        ['p-8', 'padding: 2rem', '32px'],
        ['p-10', 'padding: 2.5rem', '40px'],
        ['p-12', 'padding: 3rem', '48px'],
        ['p-16', 'padding: 4rem', '64px'],
        ['p-20', 'padding: 5rem', '80px'],
        ['p-24', 'padding: 6rem', '96px'],
        ['p-32', 'padding: 8rem', '128px'],
        ['p-40', 'padding: 10rem', '160px'],
        ['p-48', 'padding: 12rem', '192px'],
        ['p-64', 'padding: 16rem', '256px'],
        ['p-96', 'padding: 24rem', '384px'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Directional Padding & Margin</h3>
      <T headers={['Prefix', 'CSS Property', 'Description']} rows={[
        ['p-*', 'padding', 'All sides'],
        ['px-*', 'padding-left + padding-right', 'Horizontal'],
        ['py-*', 'padding-top + padding-bottom', 'Vertical'],
        ['pt-*', 'padding-top', 'Top'],
        ['pr-*', 'padding-right', 'Right'],
        ['pb-*', 'padding-bottom', 'Bottom'],
        ['pl-*', 'padding-left', 'Left'],
        ['m-*', 'margin', 'All sides'],
        ['mx-*', 'margin-left + margin-right', 'Horizontal'],
        ['my-*', 'margin-top + margin-bottom', 'Vertical'],
        ['-m-4', 'margin: -1rem', 'Negative margin'],
        ['m-auto', 'margin: auto', 'Auto margin'],
      ]} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Spacing examples -->
<div class="p-4">padding 1rem all sides</div>
<div class="px-6 py-3">horizontal 1.5rem, vertical 0.75rem</div>
<div class="mt-8 mb-4">top margin 2rem, bottom margin 1rem</div>
<div class="mx-auto max-w-lg">centered container</div>
<div class="-mt-4">negative top margin (overlap)</div>
<div class="space-x-4">children spaced 1rem horizontally</div>
<div class="space-y-2">children spaced 0.5rem vertically</div>`}</code></pre>

      {/* ===== 2. TYPOGRAPHY ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_typography}</h2>
      <p>{t.typographyDesc}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_fontSize}</h3>
      <T headers={['Class', 'CSS Output', 'Size']} rows={[
        ['text-xs', 'font-size: 0.75rem; line-height: 1rem', '12px'],
        ['text-sm', 'font-size: 0.875rem; line-height: 1.25rem', '14px'],
        ['text-base', 'font-size: 1rem; line-height: 1.5rem', '16px'],
        ['text-lg', 'font-size: 1.125rem; line-height: 1.75rem', '18px'],
        ['text-xl', 'font-size: 1.25rem; line-height: 1.75rem', '20px'],
        ['text-2xl', 'font-size: 1.5rem; line-height: 2rem', '24px'],
        ['text-3xl', 'font-size: 1.875rem; line-height: 2.25rem', '30px'],
        ['text-4xl', 'font-size: 2.25rem; line-height: 2.5rem', '36px'],
        ['text-5xl', 'font-size: 3rem; line-height: 1', '48px'],
        ['text-6xl', 'font-size: 3.75rem; line-height: 1', '60px'],
        ['text-7xl', 'font-size: 4.5rem; line-height: 1', '72px'],
        ['text-8xl', 'font-size: 6rem; line-height: 1', '96px'],
        ['text-9xl', 'font-size: 8rem; line-height: 1', '128px'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_fontWeight}</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['font-thin', 'font-weight: 100'],
        ['font-extralight', 'font-weight: 200'],
        ['font-light', 'font-weight: 300'],
        ['font-normal', 'font-weight: 400'],
        ['font-medium', 'font-weight: 500'],
        ['font-semibold', 'font-weight: 600'],
        ['font-bold', 'font-weight: 700'],
        ['font-extrabold', 'font-weight: 800'],
        ['font-black', 'font-weight: 900'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_lineHeight}</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['leading-none', 'line-height: 1'],
        ['leading-tight', 'line-height: 1.25'],
        ['leading-snug', 'line-height: 1.375'],
        ['leading-normal', 'line-height: 1.5'],
        ['leading-relaxed', 'line-height: 1.625'],
        ['leading-loose', 'line-height: 2'],
        ['leading-3', 'line-height: 0.75rem'],
        ['leading-6', 'line-height: 1.5rem'],
        ['leading-8', 'line-height: 2rem'],
        ['leading-10', 'line-height: 2.5rem'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_letterSpacing}</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['tracking-tighter', 'letter-spacing: -0.05em'],
        ['tracking-tight', 'letter-spacing: -0.025em'],
        ['tracking-normal', 'letter-spacing: 0em'],
        ['tracking-wide', 'letter-spacing: 0.025em'],
        ['tracking-wider', 'letter-spacing: 0.05em'],
        ['tracking-widest', 'letter-spacing: 0.1em'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_textAlign}</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['text-left', 'text-align: left'],
        ['text-center', 'text-align: center'],
        ['text-right', 'text-align: right'],
        ['text-justify', 'text-align: justify'],
        ['text-start', 'text-align: start'],
        ['text-end', 'text-align: end'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_textColor}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Text color examples -->
<p class="text-black">text-black → color: #000</p>
<p class="text-white">text-white → color: #fff</p>
<p class="text-gray-500">text-gray-500 → color: #6b7280</p>
<p class="text-red-600">text-red-600 → color: #dc2626</p>
<p class="text-blue-500">text-blue-500 → color: #3b82f6</p>
<p class="text-green-700">text-green-700 → color: #15803d</p>
<p class="text-transparent">text-transparent → color: transparent</p>
<p class="text-current">text-current → color: currentColor</p>`}</code></pre>

      {/* ===== 3. COLORS ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_colors}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.colorsDesc }} />

      <T headers={['Shade', 'bg-blue-*', 'Hex Value', 'Usage']} rows={[
        ['50', 'bg-blue-50', '#eff6ff', 'Lightest background'],
        ['100', 'bg-blue-100', '#dbeafe', 'Light background'],
        ['200', 'bg-blue-200', '#bfdbfe', 'Hover states, light borders'],
        ['300', 'bg-blue-300', '#93c5fd', 'Active states'],
        ['400', 'bg-blue-400', '#60a5fa', 'Icons, secondary elements'],
        ['500', 'bg-blue-500', '#3b82f6', 'Primary brand color'],
        ['600', 'bg-blue-600', '#2563eb', 'Primary buttons, links'],
        ['700', 'bg-blue-700', '#1d4ed8', 'Hover on primary'],
        ['800', 'bg-blue-800', '#1e40af', 'Dark accents'],
        ['900', 'bg-blue-900', '#1e3a8a', 'Darkest accent'],
        ['950', 'bg-blue-950', '#172554', 'Near-black backgrounds'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Color Prefixes</h3>
      <T headers={['Prefix', 'CSS Property', 'Example']} rows={[
        ['bg-*', 'background-color', 'bg-red-500'],
        ['text-*', 'color', 'text-blue-600'],
        ['border-*', 'border-color', 'border-gray-300'],
        ['ring-*', 'box-shadow (ring)', 'ring-indigo-500'],
        ['divide-*', 'border-color (dividers)', 'divide-gray-200'],
        ['placeholder-*', 'placeholder color', 'placeholder-gray-400'],
        ['from-*', 'gradient start', 'from-purple-500'],
        ['via-*', 'gradient middle', 'via-pink-500'],
        ['to-*', 'gradient end', 'to-red-500'],
      ]} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Available color palettes -->
slate, gray, zinc, neutral, stone    <!-- Grays -->
red, orange, amber, yellow           <!-- Warm -->
lime, green, emerald, teal           <!-- Green -->
cyan, sky, blue, indigo              <!-- Blue -->
violet, purple, fuchsia, pink, rose  <!-- Purple/Pink -->

<!-- Gradient example -->
<div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  Gradient background
</div>`}</code></pre>

      {/* ===== 4. FLEXBOX ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_flexbox}</h2>
      <p>{t.flexboxDesc}</p>

      <T headers={['Class', 'CSS Output']} rows={[
        ['flex', 'display: flex'],
        ['inline-flex', 'display: inline-flex'],
        ['flex-row', 'flex-direction: row'],
        ['flex-row-reverse', 'flex-direction: row-reverse'],
        ['flex-col', 'flex-direction: column'],
        ['flex-col-reverse', 'flex-direction: column-reverse'],
        ['flex-wrap', 'flex-wrap: wrap'],
        ['flex-wrap-reverse', 'flex-wrap: wrap-reverse'],
        ['flex-nowrap', 'flex-wrap: nowrap'],
        ['flex-1', 'flex: 1 1 0%'],
        ['flex-auto', 'flex: 1 1 auto'],
        ['flex-initial', 'flex: 0 1 auto'],
        ['flex-none', 'flex: none'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Justify & Align</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['justify-start', 'justify-content: flex-start'],
        ['justify-end', 'justify-content: flex-end'],
        ['justify-center', 'justify-content: center'],
        ['justify-between', 'justify-content: space-between'],
        ['justify-around', 'justify-content: space-around'],
        ['justify-evenly', 'justify-content: space-evenly'],
        ['items-start', 'align-items: flex-start'],
        ['items-end', 'align-items: flex-end'],
        ['items-center', 'align-items: center'],
        ['items-baseline', 'align-items: baseline'],
        ['items-stretch', 'align-items: stretch'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Gap</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['gap-0', 'gap: 0px'],
        ['gap-1', 'gap: 0.25rem (4px)'],
        ['gap-2', 'gap: 0.5rem (8px)'],
        ['gap-4', 'gap: 1rem (16px)'],
        ['gap-6', 'gap: 1.5rem (24px)'],
        ['gap-8', 'gap: 2rem (32px)'],
        ['gap-x-4', 'column-gap: 1rem'],
        ['gap-y-4', 'row-gap: 1rem'],
      ]} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Flexbox layout examples -->
<!-- Centered content -->
<div class="flex items-center justify-center h-screen">
  <div>Perfectly centered</div>
</div>

<!-- Navbar: logo left, links right -->
<nav class="flex justify-between items-center p-4">
  <div class="text-xl font-bold">Logo</div>
  <div class="flex gap-4">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>

<!-- Responsive cards -->
<div class="flex flex-wrap gap-4">
  <div class="flex-1 min-w-[300px]">Card 1</div>
  <div class="flex-1 min-w-[300px]">Card 2</div>
  <div class="flex-1 min-w-[300px]">Card 3</div>
</div>`}</code></pre>

      {/* ===== 5. GRID ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_grid}</h2>
      <p>{t.gridDesc}</p>

      <T headers={['Class', 'CSS Output']} rows={[
        ['grid', 'display: grid'],
        ['grid-cols-1', 'grid-template-columns: repeat(1, minmax(0, 1fr))'],
        ['grid-cols-2', 'grid-template-columns: repeat(2, minmax(0, 1fr))'],
        ['grid-cols-3', 'grid-template-columns: repeat(3, minmax(0, 1fr))'],
        ['grid-cols-4', 'grid-template-columns: repeat(4, minmax(0, 1fr))'],
        ['grid-cols-6', 'grid-template-columns: repeat(6, minmax(0, 1fr))'],
        ['grid-cols-12', 'grid-template-columns: repeat(12, minmax(0, 1fr))'],
        ['grid-cols-none', 'grid-template-columns: none'],
        ['grid-rows-1', 'grid-template-rows: repeat(1, minmax(0, 1fr))'],
        ['grid-rows-3', 'grid-template-rows: repeat(3, minmax(0, 1fr))'],
        ['grid-rows-6', 'grid-template-rows: repeat(6, minmax(0, 1fr))'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Column & Row Span</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['col-span-1', 'grid-column: span 1 / span 1'],
        ['col-span-2', 'grid-column: span 2 / span 2'],
        ['col-span-3', 'grid-column: span 3 / span 3'],
        ['col-span-4', 'grid-column: span 4 / span 4'],
        ['col-span-6', 'grid-column: span 6 / span 6'],
        ['col-span-full', 'grid-column: 1 / -1'],
        ['row-span-1', 'grid-row: span 1 / span 1'],
        ['row-span-2', 'grid-row: span 2 / span 2'],
        ['row-span-3', 'grid-row: span 3 / span 3'],
        ['row-span-full', 'grid-row: 1 / -1'],
        ['auto-cols-auto', 'grid-auto-columns: auto'],
        ['auto-cols-fr', 'grid-auto-columns: minmax(0, 1fr)'],
        ['auto-rows-auto', 'grid-auto-rows: auto'],
        ['auto-rows-fr', 'grid-auto-rows: minmax(0, 1fr)'],
      ]} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Grid layout examples -->
<!-- 3-column grid -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>  <div>2</div>  <div>3</div>
  <div>4</div>  <div>5</div>  <div>6</div>
</div>

<!-- Responsive grid: 1 col mobile, 2 tablet, 3 desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

<!-- Dashboard layout with spanning -->
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-4">Header (full width)</div>
  <div class="col-span-1">Sidebar</div>
  <div class="col-span-3">Main content</div>
  <div class="col-span-2">Half width</div>
  <div class="col-span-2">Half width</div>
</div>`}</code></pre>

      {/* ===== 6. LAYOUT ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_layout}</h2>
      <p>{t.layoutDesc}</p>

      <T headers={['Class', 'CSS Output']} rows={[
        ['w-0', 'width: 0px'],
        ['w-1', 'width: 0.25rem (4px)'],
        ['w-4', 'width: 1rem (16px)'],
        ['w-8', 'width: 2rem (32px)'],
        ['w-16', 'width: 4rem (64px)'],
        ['w-32', 'width: 8rem (128px)'],
        ['w-64', 'width: 16rem (256px)'],
        ['w-1/2', 'width: 50%'],
        ['w-1/3', 'width: 33.333%'],
        ['w-2/3', 'width: 66.667%'],
        ['w-1/4', 'width: 25%'],
        ['w-3/4', 'width: 75%'],
        ['w-full', 'width: 100%'],
        ['w-screen', 'width: 100vw'],
        ['w-auto', 'width: auto'],
        ['w-fit', 'width: fit-content'],
        ['w-min', 'width: min-content'],
        ['w-max', 'width: max-content'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Height & Max/Min</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['h-0', 'height: 0px'],
        ['h-4', 'height: 1rem (16px)'],
        ['h-16', 'height: 4rem (64px)'],
        ['h-64', 'height: 16rem (256px)'],
        ['h-full', 'height: 100%'],
        ['h-screen', 'height: 100vh'],
        ['h-auto', 'height: auto'],
        ['min-h-0', 'min-height: 0px'],
        ['min-h-full', 'min-height: 100%'],
        ['min-h-screen', 'min-height: 100vh'],
        ['max-w-sm', 'max-width: 24rem (384px)'],
        ['max-w-md', 'max-width: 28rem (448px)'],
        ['max-w-lg', 'max-width: 32rem (512px)'],
        ['max-w-xl', 'max-width: 36rem (576px)'],
        ['max-w-2xl', 'max-width: 42rem (672px)'],
        ['max-w-4xl', 'max-width: 56rem (896px)'],
        ['max-w-6xl', 'max-width: 72rem (1152px)'],
        ['max-w-7xl', 'max-width: 80rem (1280px)'],
        ['max-w-full', 'max-width: 100%'],
        ['max-w-none', 'max-width: none'],
        ['container', 'width: 100% (responsive max-width)'],
      ]} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Layout examples -->
<div class="container mx-auto px-4">
  Centered responsive container
</div>

<div class="max-w-2xl mx-auto">
  Max-width 672px, centered
</div>

<div class="w-full h-screen">
  Full width, full viewport height
</div>

<div class="min-h-screen flex flex-col">
  <main class="flex-1">Content</main>
  <footer>Footer always at bottom</footer>
</div>`}</code></pre>

      {/* ===== 7. BORDERS ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_borders}</h2>
      <p>{t.bordersDesc}</p>

      <T headers={['Class', 'CSS Output']} rows={[
        ['border', 'border-width: 1px'],
        ['border-0', 'border-width: 0px'],
        ['border-2', 'border-width: 2px'],
        ['border-4', 'border-width: 4px'],
        ['border-8', 'border-width: 8px'],
        ['border-t', 'border-top-width: 1px'],
        ['border-r-2', 'border-right-width: 2px'],
        ['border-b-4', 'border-bottom-width: 4px'],
        ['border-l', 'border-left-width: 1px'],
        ['border-solid', 'border-style: solid'],
        ['border-dashed', 'border-style: dashed'],
        ['border-dotted', 'border-style: dotted'],
        ['border-none', 'border-style: none'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Border Radius</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['rounded-none', 'border-radius: 0px'],
        ['rounded-sm', 'border-radius: 0.125rem (2px)'],
        ['rounded', 'border-radius: 0.25rem (4px)'],
        ['rounded-md', 'border-radius: 0.375rem (6px)'],
        ['rounded-lg', 'border-radius: 0.5rem (8px)'],
        ['rounded-xl', 'border-radius: 0.75rem (12px)'],
        ['rounded-2xl', 'border-radius: 1rem (16px)'],
        ['rounded-3xl', 'border-radius: 1.5rem (24px)'],
        ['rounded-full', 'border-radius: 9999px'],
        ['rounded-t-lg', 'border-top-left/right-radius: 0.5rem'],
        ['rounded-b-lg', 'border-bottom-left/right-radius: 0.5rem'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Ring (Outline)</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['ring-0', 'box-shadow: 0 0 0 0px ...'],
        ['ring-1', 'box-shadow: 0 0 0 1px ...'],
        ['ring-2', 'box-shadow: 0 0 0 2px ...'],
        ['ring-4', 'box-shadow: 0 0 0 4px ...'],
        ['ring', 'box-shadow: 0 0 0 3px ...'],
        ['ring-inset', 'box-shadow: inset ...'],
        ['ring-blue-500', 'ring color: #3b82f6'],
        ['ring-offset-2', 'ring offset: 2px'],
        ['ring-offset-white', 'ring offset color: #fff'],
      ]} />

      {/* ===== 8. SHADOWS & EFFECTS ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_shadows}</h2>
      <p>{t.shadowsDesc}</p>

      <T headers={['Class', 'CSS Output']} rows={[
        ['shadow-sm', 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)'],
        ['shadow', 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'],
        ['shadow-md', 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)'],
        ['shadow-lg', 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1)'],
        ['shadow-xl', 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1)'],
        ['shadow-2xl', 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)'],
        ['shadow-inner', 'box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'],
        ['shadow-none', 'box-shadow: 0 0 #0000'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Opacity & Blur</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['opacity-0', 'opacity: 0'],
        ['opacity-25', 'opacity: 0.25'],
        ['opacity-50', 'opacity: 0.5'],
        ['opacity-75', 'opacity: 0.75'],
        ['opacity-100', 'opacity: 1'],
        ['blur-none', 'filter: blur(0)'],
        ['blur-sm', 'filter: blur(4px)'],
        ['blur', 'filter: blur(8px)'],
        ['blur-md', 'filter: blur(12px)'],
        ['blur-lg', 'filter: blur(16px)'],
        ['blur-xl', 'filter: blur(24px)'],
        ['blur-2xl', 'filter: blur(40px)'],
        ['blur-3xl', 'filter: blur(64px)'],
        ['backdrop-blur-sm', 'backdrop-filter: blur(4px)'],
        ['backdrop-blur', 'backdrop-filter: blur(8px)'],
        ['backdrop-blur-md', 'backdrop-filter: blur(12px)'],
        ['backdrop-blur-lg', 'backdrop-filter: blur(16px)'],
        ['backdrop-blur-xl', 'backdrop-filter: blur(24px)'],
      ]} />

      {/* ===== 9. TRANSITIONS & ANIMATION ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_transitions}</h2>
      <p>{t.transitionsDesc}</p>

      <T headers={['Class', 'CSS Output']} rows={[
        ['transition-none', 'transition-property: none'],
        ['transition-all', 'transition-property: all'],
        ['transition', 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter'],
        ['transition-colors', 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke'],
        ['transition-opacity', 'transition-property: opacity'],
        ['transition-shadow', 'transition-property: box-shadow'],
        ['transition-transform', 'transition-property: transform'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Duration & Easing</h3>
      <T headers={['Class', 'CSS Output']} rows={[
        ['duration-75', 'transition-duration: 75ms'],
        ['duration-100', 'transition-duration: 100ms'],
        ['duration-150', 'transition-duration: 150ms'],
        ['duration-200', 'transition-duration: 200ms'],
        ['duration-300', 'transition-duration: 300ms'],
        ['duration-500', 'transition-duration: 500ms'],
        ['duration-700', 'transition-duration: 700ms'],
        ['duration-1000', 'transition-duration: 1000ms'],
        ['ease-linear', 'transition-timing-function: linear'],
        ['ease-in', 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1)'],
        ['ease-out', 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1)'],
        ['ease-in-out', 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)'],
      ]} />

      <h3 className="text-xl font-semibold mt-8 mb-3">Animations</h3>
      <T headers={['Class', 'Description']} rows={[
        ['animate-none', 'No animation'],
        ['animate-spin', 'Continuous rotation (loading spinners)'],
        ['animate-ping', 'Scale + fade out (notification dot)'],
        ['animate-pulse', 'Gentle fade in/out (skeleton loaders)'],
        ['animate-bounce', 'Bouncing motion (scroll indicator)'],
      ]} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Transition examples -->
<button class="bg-blue-500 hover:bg-blue-700 transition-colors duration-200">
  Smooth color change on hover
</button>

<div class="hover:scale-105 transition-transform duration-300 ease-out">
  Scale up on hover
</div>

<div class="hover:shadow-xl transition-shadow duration-300">
  Shadow appears on hover
</div>

<!-- Animation examples -->
<svg class="animate-spin h-5 w-5">...</svg>  <!-- Loading spinner -->
<span class="animate-ping absolute">...</span> <!-- Notification dot -->
<div class="animate-pulse bg-gray-300 h-4 rounded">...</div> <!-- Skeleton -->`}</code></pre>

      {/* ===== 10. RESPONSIVE ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_responsive}</h2>
      <p>{t.responsiveDesc}</p>

      <T headers={['Prefix', 'Min Width', 'CSS Media Query']} rows={[
        ['(none)', '0px', 'No media query (applies to all)'],
        ['sm:', '640px', '@media (min-width: 640px) { ... }'],
        ['md:', '768px', '@media (min-width: 768px) { ... }'],
        ['lg:', '1024px', '@media (min-width: 1024px) { ... }'],
        ['xl:', '1280px', '@media (min-width: 1280px) { ... }'],
        ['2xl:', '1536px', '@media (min-width: 1536px) { ... }'],
      ]} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Mobile-first responsive design -->

<!-- Stack on mobile, side-by-side on tablet+ -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-1/3">Sidebar</div>
  <div class="w-full md:w-2/3">Main</div>
</div>

<!-- Responsive text size -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

<!-- Responsive grid columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <div>Card</div>
  <div>Card</div>
  <div>Card</div>
  <div>Card</div>
</div>

<!-- Hide/show at breakpoints -->
<div class="hidden md:block">Visible on md and above</div>
<div class="block md:hidden">Visible only below md</div>

<!-- Responsive padding -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  Padding grows with screen size
</div>`}</code></pre>

      {/* ===== 11. STATE VARIANTS ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_states}</h2>
      <p>{t.statesDesc}</p>

      <T headers={['Variant', 'CSS Selector / Condition', 'Example']} rows={[
        ['hover:', ':hover', 'hover:bg-blue-700'],
        ['focus:', ':focus', 'focus:outline-none focus:ring-2'],
        ['focus-within:', ':focus-within', 'focus-within:border-blue-500'],
        ['focus-visible:', ':focus-visible', 'focus-visible:ring-2'],
        ['active:', ':active', 'active:bg-blue-800'],
        ['disabled:', ':disabled', 'disabled:opacity-50'],
        ['visited:', ':visited', 'visited:text-purple-600'],
        ['first:', ':first-child', 'first:mt-0'],
        ['last:', ':last-child', 'last:mb-0'],
        ['odd:', ':nth-child(odd)', 'odd:bg-gray-100'],
        ['even:', ':nth-child(even)', 'even:bg-gray-50'],
        ['group-hover:', '.group:hover &', 'group-hover:text-white'],
        ['peer-focus:', '.peer:focus ~ &', 'peer-focus:text-blue-500'],
        ['dark:', 'prefers-color-scheme: dark', 'dark:bg-gray-900'],
        ['placeholder:', '::placeholder', 'placeholder:text-gray-400'],
        ['before:', '::before', 'before:content-[""]'],
        ['after:', '::after', 'after:content-[""]'],
      ]} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- State variant examples -->

<!-- Button with multiple states -->
<button class="bg-blue-500 hover:bg-blue-700 active:bg-blue-800
               focus:outline-none focus:ring-2 focus:ring-blue-300
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-colors duration-200">
  Click me
</button>

<!-- Group hover: parent hover affects child -->
<div class="group p-4 hover:bg-blue-50 rounded-lg">
  <h3 class="group-hover:text-blue-600">Title</h3>
  <p class="group-hover:text-blue-400">Description</p>
</div>

<!-- Dark mode -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  Adapts to light/dark mode
</div>

<!-- Peer: input state affects sibling -->
<input class="peer" type="text" placeholder="Email" />
<p class="invisible peer-invalid:visible text-red-500">
  Invalid email address
</p>`}</code></pre>

      {/* ===== 12. TIPS ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_tips}</h2>
      <p>{t.tipsDesc}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_arbitrary}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.arbitraryDesc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Arbitrary values with square brackets -->
<div class="w-[120px]">width: 120px</div>
<div class="h-[calc(100vh-80px)]">height: calc(100vh - 80px)</div>
<div class="bg-[#1a2b3c]">background: #1a2b3c</div>
<div class="text-[22px]">font-size: 22px</div>
<div class="grid-cols-[200px_1fr_200px]">custom grid template</div>
<div class="p-[clamp(1rem,3vw,3rem)]">responsive clamp padding</div>
<div class="text-[color:var(--brand)]">CSS variable color</div>
<div class="top-[var(--header-h)]">CSS variable position</div>`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_important}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.importantDesc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Important modifier with ! prefix -->
<div class="!p-4">padding: 1rem !important</div>
<div class="!mt-0">margin-top: 0 !important</div>
<div class="!text-red-500">color: #ef4444 !important</div>

<!-- Useful for overriding third-party styles -->
<div class="external-widget !bg-transparent !border-none">
  Override library styles
</div>`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_apply}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.applyDesc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`/* In your CSS file — use @apply to extract components */
.btn {
  @apply px-4 py-2 rounded-lg font-semibold transition-colors duration-200;
}

.btn-primary {
  @apply btn bg-blue-500 text-white hover:bg-blue-700;
}

.btn-secondary {
  @apply btn bg-gray-200 text-gray-800 hover:bg-gray-300;
}

.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-transparent;
}

.card {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-md p-6
         hover:shadow-lg transition-shadow duration-300;
}

/* Note: Tailwind recommends using utilities directly in HTML
   and only extracting with @apply for truly repeated patterns. */`}</code></pre>

      {/* ===== 13. FAQ ===== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>
      {faqItems.map((faq, i) => (
        <div key={i}>
          <h3 className="text-xl font-semibold mt-8 mb-3">{faq.q}</h3>
          <p>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
