/**
 * Round 2: Add 7 new tool entries + newsletter section to all 15 language dictionaries
 */
const fs = require('fs');
const path = require('path');

const dictDir = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries');

const locales = ['en','fr','de','it','es','pt','nl','pl','sv','no','zh','ja','ko','id','th'];

// Tool entries per language (en is source, others are translations)
const toolEntries = {
  en: {
    'color-palette': {
      name: 'Color Palette Generator',
      description: 'Generate harmonious color palettes from any base color',
      pageTitle: 'Color Palette Generator — Complementary, Analogous, Triadic',
      pageDescription: 'Generate beautiful color palettes with complementary, analogous, triadic, and tetradic color schemes. Export as HEX, RGB, or HSL.',
      seoTitle: 'What is a Color Palette Generator?',
      seoContent: 'A color palette generator creates harmonious color schemes based on color theory. Input a base color and get complementary, analogous, triadic, and tetradic palettes instantly.',
      howToUseTitle: 'How to Use',
      howToUseSteps: ['Enter or pick a base color', 'Choose a harmony type (complementary, analogous, etc.)', 'Preview generated palettes', 'Click any color to copy its value', 'Export all colors as JSON or CSS variables'],
      useCasesTitle: 'Use Cases',
      useCases: ['Web and app UI design', 'Brand color selection', 'Data visualization coloring', 'CSS theme creation'],
      faqTitle: 'FAQ',
      faqs: [
        { q: 'What color harmonies are available?', a: 'Complementary, analogous, triadic, tetradic, and split-complementary schemes.' },
        { q: 'What formats can I export?', a: 'HEX, RGB, and HSL values. You can also export as JSON or CSS custom properties.' }
      ]
    },
    'flexbox-generator': {
      name: 'Flexbox Generator',
      description: 'Visual Flexbox layout builder with live preview',
      pageTitle: 'CSS Flexbox Generator — Visual Layout Builder',
      pageDescription: 'Build CSS Flexbox layouts visually. Configure direction, justify-content, align-items, wrap, and gap with real-time preview and code output.',
      seoTitle: 'What is a Flexbox Generator?',
      seoContent: 'A Flexbox generator lets you visually configure CSS Flexbox container properties like direction, justify-content, align-items, and gap. See the layout update in real-time and copy the CSS code.',
      howToUseTitle: 'How to Use',
      howToUseSteps: ['Set flex-direction (row or column)', 'Choose justify-content and align-items', 'Adjust wrap and gap settings', 'See the live preview update', 'Copy the generated CSS code'],
      useCasesTitle: 'Use Cases',
      useCases: ['Learning CSS Flexbox', 'Rapid layout prototyping', 'Generating boilerplate CSS', 'Teaching web development'],
      faqTitle: 'FAQ',
      faqs: [
        { q: 'Does this support all Flexbox properties?', a: 'Yes — direction, justify-content, align-items, flex-wrap, and gap are all configurable.' },
        { q: 'Can I add or remove flex items?', a: 'Yes, you can add 3 to 12 items and see how the layout responds.' }
      ]
    },
    'emoji-picker': {
      name: 'Emoji Picker & Search',
      description: 'Browse and search emojis, copy Unicode and HTML entities',
      pageTitle: 'Emoji Picker & Search — Copy Unicode, HTML Entity, CSS',
      pageDescription: 'Browse emojis by category, search by name, and copy Unicode code points, HTML entities, and CSS escapes with one click.',
      seoTitle: 'What is an Emoji Picker?',
      seoContent: 'An emoji picker lets you browse and search emojis by category or keyword. Click any emoji to see its Unicode code point, HTML entity, and CSS escape, then copy with one click.',
      howToUseTitle: 'How to Use',
      howToUseSteps: ['Browse categories or search by keyword', 'Click an emoji to select it', 'View Unicode, HTML entity, and CSS values', 'Click copy to copy any format'],
      useCasesTitle: 'Use Cases',
      useCases: ['Finding the right emoji for social media', 'Getting HTML entities for web pages', 'Unicode code points for programming', 'CSS content property values'],
      faqTitle: 'FAQ',
      faqs: [
        { q: 'How many emojis are included?', a: 'Over 100 commonly used emojis across 9 categories.' },
        { q: 'Can I copy different formats?', a: 'Yes — Unicode character, code point, HTML entity, and CSS escape.' }
      ]
    },
    'border-radius': {
      name: 'Border Radius Generator',
      description: 'Design CSS border-radius with independent corner control',
      pageTitle: 'CSS Border Radius Generator — Visual Corner Editor',
      pageDescription: 'Design CSS border-radius with independent control for each corner. Live preview, presets, and instant CSS code output.',
      seoTitle: 'What is a Border Radius Generator?',
      seoContent: 'A CSS border-radius generator lets you visually design rounded corners for HTML elements. Control each corner independently and copy the CSS code.',
      howToUseTitle: 'How to Use',
      howToUseSteps: ['Adjust sliders for each corner', 'Toggle link mode to sync all corners', 'Choose your preferred unit (px, %, em)', 'Preview the shape in real-time', 'Copy the CSS code'],
      useCasesTitle: 'Use Cases',
      useCases: ['Rounding card corners', 'Creating pill-shaped buttons', 'Making circular avatars', 'Designing organic blob shapes'],
      faqTitle: 'FAQ',
      faqs: [
        { q: 'Can I control each corner independently?', a: 'Yes, each corner has its own slider. You can also link them to move together.' },
        { q: 'What presets are available?', a: 'Circle, rounded, pill, and blob shapes are included as presets.' }
      ]
    },
    'css-unit-converter': {
      name: 'CSS Unit Converter',
      description: 'Convert between px, rem, em, vw, vh, pt, and %',
      pageTitle: 'CSS Unit Converter — px, rem, em, vw, vh, pt, %',
      pageDescription: 'Convert CSS units between px, rem, em, vw, vh, pt, and percentage. Configure root font-size and viewport dimensions for accurate conversions.',
      seoTitle: 'What is a CSS Unit Converter?',
      seoContent: 'A CSS unit converter helps you translate between different CSS length units like px, rem, em, vw, vh, pt, and %. Configure base font-size and viewport for accurate results.',
      howToUseTitle: 'How to Use',
      howToUseSteps: ['Enter a value and select the source unit', 'Set root font-size (default 16px)', 'Set viewport dimensions if using vw/vh', 'See all conversions instantly', 'Copy any converted value'],
      useCasesTitle: 'Use Cases',
      useCases: ['Converting px designs to rem', 'Responsive design calculations', 'Understanding relative units', 'Design system unit standardization'],
      faqTitle: 'FAQ',
      faqs: [
        { q: 'Why does root font-size matter for rem?', a: '1rem equals the root font-size (usually 16px). Changing it affects all rem conversions.' },
        { q: 'What viewport size is used for vw/vh?', a: 'Default is 1920x1080. You can change it to match your target viewport.' }
      ]
    },
    'og-image-preview': {
      name: 'Open Graph Image Preview',
      description: 'Preview how your page looks when shared on social media',
      pageTitle: 'Open Graph Image Preview — Social Share Card Tester',
      pageDescription: 'Preview how your page looks when shared on Facebook, Twitter/X, LinkedIn, and Discord. Generate og:tags and twitter:card meta tags.',
      seoTitle: 'What is Open Graph Preview?',
      seoContent: 'Open Graph tags control how your page appears when shared on social media. This tool previews your share cards on Facebook, Twitter, LinkedIn, and Discord.',
      howToUseTitle: 'How to Use',
      howToUseSteps: ['Enter your page title, description, and image URL', 'Set your site name and page URL', 'Preview cards for each platform', 'Copy the generated meta tags'],
      useCasesTitle: 'Use Cases',
      useCases: ['Testing social share appearance', 'Optimizing click-through rates', 'Generating Open Graph meta tags', 'Previewing Discord embeds'],
      faqTitle: 'FAQ',
      faqs: [
        { q: 'What platforms are previewed?', a: 'Facebook, Twitter/X, LinkedIn, and Discord card previews.' },
        { q: 'What is the recommended og:image size?', a: '1200x630 pixels for optimal display across all platforms.' }
      ]
    },
    'tailwind-colors': {
      name: 'Tailwind CSS Color Picker',
      description: 'Browse the full Tailwind CSS color palette',
      pageTitle: 'Tailwind CSS Color Picker — Full Palette Browser',
      pageDescription: 'Browse all Tailwind CSS v3 colors. Search by name or hex, copy class names, HEX, RGB, and HSL values instantly.',
      seoTitle: 'What is the Tailwind CSS Color Picker?',
      seoContent: 'Browse the complete Tailwind CSS color palette with all 22 color groups and shades from 50 to 950. Search, preview, and copy color values in any format.',
      howToUseTitle: 'How to Use',
      howToUseSteps: ['Browse colors by group or search', 'Click a swatch to view details', 'Copy the Tailwind class name', 'Copy HEX, RGB, or HSL values'],
      useCasesTitle: 'Use Cases',
      useCases: ['Finding Tailwind color classes', 'Getting hex values for Tailwind colors', 'Comparing color shades', 'Designing Tailwind CSS themes'],
      faqTitle: 'FAQ',
      faqs: [
        { q: 'Is this the official Tailwind palette?', a: 'Yes, all colors match the Tailwind CSS v3 default color palette.' },
        { q: 'What formats can I copy?', a: 'Tailwind class name, HEX, RGB, and HSL values.' }
      ]
    }
  },
  zh: {
    'color-palette': { name: '调色板生成器', description: '从任意基础色生成和谐配色方案', pageTitle: '调色板生成器 — 互补、类似、三色配色', pageDescription: '生成互补、类似、三色、四色等和谐配色方案，支持导出 HEX、RGB、HSL 格式。' },
    'flexbox-generator': { name: 'Flexbox 生成器', description: '可视化 Flexbox 布局构建器', pageTitle: 'CSS Flexbox 生成器 — 可视化布局构建', pageDescription: '可视化构建 CSS Flexbox 布局，配置方向、对齐、换行和间距，实时预览并复制代码。' },
    'emoji-picker': { name: 'Emoji 选择器', description: '浏览搜索表情符号，复制 Unicode 和 HTML 实体', pageTitle: 'Emoji 选择器 — 复制 Unicode、HTML 实体、CSS', pageDescription: '按分类浏览表情符号，按名称搜索，一键复制 Unicode 码点、HTML 实体和 CSS 转义。' },
    'border-radius': { name: '圆角生成器', description: '独立控制四角的 CSS 圆角设计器', pageTitle: 'CSS 圆角生成器 — 可视化圆角编辑', pageDescription: '独立控制每个角的 CSS border-radius，实时预览、预设形状和即时代码输出。' },
    'css-unit-converter': { name: 'CSS 单位转换器', description: 'px、rem、em、vw、vh、pt、% 互转', pageTitle: 'CSS 单位转换器 — px/rem/em/vw/vh/pt/%', pageDescription: '在 px、rem、em、vw、vh、pt 和百分比之间转换 CSS 单位，支持自定义根字体大小。' },
    'og-image-preview': { name: 'OG 图片预览', description: '预览页面在社交媒体上的分享效果', pageTitle: 'Open Graph 图片预览 — 社交分享卡片测试', pageDescription: '预览页面在 Facebook、Twitter/X、LinkedIn 和 Discord 上的分享效果，生成 og 标签。' },
    'tailwind-colors': { name: 'Tailwind 颜色选择器', description: '浏览完整的 Tailwind CSS 调色板', pageTitle: 'Tailwind CSS 颜色选择器 — 完整色板浏览', pageDescription: '浏览所有 Tailwind CSS v3 颜色，按名称或色值搜索，一键复制类名和颜色值。' }
  },
  fr: {
    'color-palette': { name: 'Générateur de palette', description: 'Générer des palettes de couleurs harmonieuses', pageTitle: 'Générateur de palette de couleurs', pageDescription: 'Générez des palettes complémentaires, analogues et triadiques. Exportez en HEX, RGB ou HSL.' },
    'flexbox-generator': { name: 'Générateur Flexbox', description: 'Constructeur de mise en page Flexbox visuel', pageTitle: 'Générateur CSS Flexbox — Constructeur visuel', pageDescription: 'Construisez des mises en page CSS Flexbox visuellement avec aperçu en temps réel et code CSS.' },
    'emoji-picker': { name: 'Sélecteur d\'emoji', description: 'Parcourir et rechercher des emojis', pageTitle: 'Sélecteur d\'emoji — Copier Unicode et HTML', pageDescription: 'Parcourez les emojis par catégorie, recherchez par nom et copiez les codes Unicode et HTML.' },
    'border-radius': { name: 'Générateur border-radius', description: 'Éditeur CSS border-radius avec contrôle par coin', pageTitle: 'Générateur CSS Border Radius', pageDescription: 'Concevez des coins arrondis CSS avec contrôle indépendant de chaque coin.' },
    'css-unit-converter': { name: 'Convertisseur d\'unités CSS', description: 'Convertir entre px, rem, em, vw, vh, pt et %', pageTitle: 'Convertisseur d\'unités CSS — px/rem/em/vw/vh', pageDescription: 'Convertissez entre les unités CSS px, rem, em, vw, vh, pt et pourcentage.' },
    'og-image-preview': { name: 'Aperçu Open Graph', description: 'Prévisualiser le partage social de votre page', pageTitle: 'Aperçu Open Graph — Test de carte sociale', pageDescription: 'Prévisualisez l\'apparence de votre page sur Facebook, Twitter, LinkedIn et Discord.' },
    'tailwind-colors': { name: 'Couleurs Tailwind CSS', description: 'Parcourir la palette Tailwind CSS complète', pageTitle: 'Sélecteur de couleurs Tailwind CSS', pageDescription: 'Parcourez toutes les couleurs Tailwind CSS v3, recherchez et copiez les valeurs.' }
  },
  de: {
    'color-palette': { name: 'Farbpaletten-Generator', description: 'Harmonische Farbpaletten generieren', pageTitle: 'Farbpaletten-Generator — Komplementär, Analog, Triade', pageDescription: 'Erzeugen Sie harmonische Farbpaletten und exportieren Sie als HEX, RGB oder HSL.' },
    'flexbox-generator': { name: 'Flexbox-Generator', description: 'Visueller Flexbox-Layout-Builder', pageTitle: 'CSS Flexbox-Generator — Visueller Layout-Builder', pageDescription: 'Erstellen Sie CSS Flexbox-Layouts visuell mit Live-Vorschau und Code-Ausgabe.' },
    'emoji-picker': { name: 'Emoji-Auswahl', description: 'Emojis durchsuchen und Unicode kopieren', pageTitle: 'Emoji-Auswahl — Unicode und HTML kopieren', pageDescription: 'Durchsuchen Sie Emojis nach Kategorie und kopieren Sie Unicode-Codepunkte und HTML-Entitäten.' },
    'border-radius': { name: 'Border-Radius-Generator', description: 'CSS-Eckenradius visuell gestalten', pageTitle: 'CSS Border-Radius-Generator', pageDescription: 'Gestalten Sie CSS border-radius mit unabhängiger Steuerung jeder Ecke.' },
    'css-unit-converter': { name: 'CSS-Einheitenumrechner', description: 'Zwischen px, rem, em, vw, vh umrechnen', pageTitle: 'CSS-Einheitenumrechner — px/rem/em/vw/vh', pageDescription: 'Rechnen Sie CSS-Einheiten zwischen px, rem, em, vw, vh, pt und Prozent um.' },
    'og-image-preview': { name: 'Open Graph Vorschau', description: 'Social-Media-Vorschau Ihrer Seite', pageTitle: 'Open Graph Vorschau — Social-Share-Test', pageDescription: 'Vorschau Ihrer Seite auf Facebook, Twitter, LinkedIn und Discord.' },
    'tailwind-colors': { name: 'Tailwind CSS Farben', description: 'Vollständige Tailwind CSS Farbpalette', pageTitle: 'Tailwind CSS Farbauswahl', pageDescription: 'Durchsuchen Sie alle Tailwind CSS v3 Farben und kopieren Sie Werte.' }
  },
  es: {
    'color-palette': { name: 'Generador de paleta', description: 'Generar paletas de colores armoniosas', pageTitle: 'Generador de paleta de colores', pageDescription: 'Genere paletas complementarias, análogas y triádicas. Exporte en HEX, RGB o HSL.' },
    'flexbox-generator': { name: 'Generador Flexbox', description: 'Constructor visual de diseño Flexbox', pageTitle: 'Generador CSS Flexbox — Constructor visual', pageDescription: 'Construya diseños CSS Flexbox visualmente con vista previa en tiempo real.' },
    'emoji-picker': { name: 'Selector de emoji', description: 'Buscar y copiar emojis con Unicode', pageTitle: 'Selector de emoji — Copiar Unicode y HTML', pageDescription: 'Explore emojis por categoría y copie puntos de código Unicode y entidades HTML.' },
    'border-radius': { name: 'Generador border-radius', description: 'Editor visual de esquinas CSS', pageTitle: 'Generador CSS Border Radius', pageDescription: 'Diseñe esquinas redondeadas CSS con control independiente de cada esquina.' },
    'css-unit-converter': { name: 'Convertidor de unidades CSS', description: 'Convertir entre px, rem, em, vw, vh', pageTitle: 'Convertidor de unidades CSS — px/rem/em/vw/vh', pageDescription: 'Convierta unidades CSS entre px, rem, em, vw, vh, pt y porcentaje.' },
    'og-image-preview': { name: 'Vista previa Open Graph', description: 'Previsualizar cómo se comparte su página', pageTitle: 'Vista previa Open Graph — Test de tarjeta social', pageDescription: 'Previsualice su página en Facebook, Twitter, LinkedIn y Discord.' },
    'tailwind-colors': { name: 'Colores Tailwind CSS', description: 'Explorar la paleta completa de Tailwind CSS', pageTitle: 'Selector de colores Tailwind CSS', pageDescription: 'Explore todos los colores de Tailwind CSS v3 y copie los valores.' }
  },
  ja: {
    'color-palette': { name: 'カラーパレットジェネレーター', description: '調和のとれたカラーパレットを生成', pageTitle: 'カラーパレットジェネレーター — 補色・類似色・三色配色', pageDescription: '補色、類似色、三色、四色の調和パレットを生成。HEX、RGB、HSL形式でエクスポート。' },
    'flexbox-generator': { name: 'Flexboxジェネレーター', description: 'ビジュアルFlexboxレイアウトビルダー', pageTitle: 'CSS Flexboxジェネレーター — ビジュアルレイアウト', pageDescription: 'CSS Flexboxレイアウトをビジュアルに構築。リアルタイムプレビューとコード出力。' },
    'emoji-picker': { name: '絵文字ピッカー', description: '絵文字を検索してUnicodeをコピー', pageTitle: '絵文字ピッカー — Unicode・HTMLエンティティをコピー', pageDescription: 'カテゴリ別に絵文字を閲覧、名前で検索、Unicodeコードポイントをワンクリックコピー。' },
    'border-radius': { name: 'ボーダー角丸ジェネレーター', description: 'CSS角丸を個別に制御', pageTitle: 'CSS角丸ジェネレーター — ビジュアルエディター', pageDescription: '各コーナーを独立制御するCSS border-radius。リアルタイムプレビュー付き。' },
    'css-unit-converter': { name: 'CSS単位変換', description: 'px・rem・em・vw・vh・ptを変換', pageTitle: 'CSS単位変換ツール — px/rem/em/vw/vh/pt/%', pageDescription: 'CSS単位をpx、rem、em、vw、vh、pt、%間で変換。ルートフォントサイズ設定対応。' },
    'og-image-preview': { name: 'OG画像プレビュー', description: 'SNSでの共有表示をプレビュー', pageTitle: 'Open Graphプレビュー — SNS共有カードテスト', pageDescription: 'Facebook、Twitter/X、LinkedIn、Discordでのページ表示をプレビュー。' },
    'tailwind-colors': { name: 'Tailwind CSSカラー', description: 'Tailwind CSS全カラーパレット', pageTitle: 'Tailwind CSSカラーピッカー — 全色一覧', pageDescription: 'Tailwind CSS v3の全カラーを閲覧、検索、コピー。' }
  },
  ko: {
    'color-palette': { name: '색상 팔레트 생성기', description: '조화로운 색상 팔레트 생성', pageTitle: '색상 팔레트 생성기 — 보색, 유사색, 삼색 배색', pageDescription: '보색, 유사색, 삼색 배색 등 조화로운 팔레트를 생성합니다. HEX, RGB, HSL로 내보내기.' },
    'flexbox-generator': { name: 'Flexbox 생성기', description: '시각적 Flexbox 레이아웃 빌더', pageTitle: 'CSS Flexbox 생성기 — 시각적 레이아웃', pageDescription: 'CSS Flexbox 레이아웃을 시각적으로 구축. 실시간 미리보기 및 코드 출력.' },
    'emoji-picker': { name: '이모지 선택기', description: '이모지 검색 및 유니코드 복사', pageTitle: '이모지 선택기 — 유니코드, HTML 엔티티 복사', pageDescription: '카테고리별 이모지 탐색, 이름 검색, 유니코드 코드포인트 원클릭 복사.' },
    'border-radius': { name: '테두리 둥글기 생성기', description: 'CSS 모서리 둥글기를 개별 제어', pageTitle: 'CSS 테두리 둥글기 생성기', pageDescription: '각 모서리를 독립적으로 제어하는 CSS border-radius 생성기.' },
    'css-unit-converter': { name: 'CSS 단위 변환기', description: 'px, rem, em, vw, vh, pt, % 변환', pageTitle: 'CSS 단위 변환기 — px/rem/em/vw/vh/pt/%', pageDescription: 'CSS 단위를 px, rem, em, vw, vh, pt, % 간에 변환합니다.' },
    'og-image-preview': { name: 'OG 이미지 미리보기', description: 'SNS 공유 시 페이지 모습 미리보기', pageTitle: 'Open Graph 미리보기 — 소셜 공유 카드 테스트', pageDescription: 'Facebook, Twitter/X, LinkedIn, Discord에서 페이지 표시를 미리봅니다.' },
    'tailwind-colors': { name: 'Tailwind CSS 색상', description: 'Tailwind CSS 전체 색상 팔레트', pageTitle: 'Tailwind CSS 색상 선택기 — 전체 팔레트', pageDescription: 'Tailwind CSS v3 전체 색상을 탐색, 검색, 복사합니다.' }
  }
};

// Newsletter translations
const newsletter = {
  en: { title: 'Stay Updated', subtitle: 'Get weekly dev tips and new tool announcements.', placeholder: 'your@email.com', subscribe: 'Subscribe', success: 'Thanks! Check your inbox to confirm.', privacy: 'No spam. Unsubscribe anytime.' },
  zh: { title: '保持更新', subtitle: '获取每周开发技巧和新工具通知。', placeholder: 'your@email.com', subscribe: '订阅', success: '感谢！请查收邮箱确认。', privacy: '无垃圾邮件，随时退订。' },
  fr: { title: 'Restez informé', subtitle: 'Recevez des astuces dev et les nouveaux outils chaque semaine.', placeholder: 'votre@email.com', subscribe: "S'abonner", success: 'Merci ! Vérifiez votre boîte mail.', privacy: 'Pas de spam. Désabonnez-vous à tout moment.' },
  de: { title: 'Bleiben Sie informiert', subtitle: 'Wöchentliche Dev-Tipps und neue Tools.', placeholder: 'ihre@email.com', subscribe: 'Abonnieren', success: 'Danke! Überprüfen Sie Ihren Posteingang.', privacy: 'Kein Spam. Jederzeit abbestellbar.' },
  es: { title: 'Mantente actualizado', subtitle: 'Recibe consejos de desarrollo y nuevas herramientas.', placeholder: 'tu@email.com', subscribe: 'Suscribirse', success: '¡Gracias! Revisa tu bandeja de entrada.', privacy: 'Sin spam. Cancela cuando quieras.' },
  it: { title: 'Resta aggiornato', subtitle: 'Ricevi consigli dev e nuovi strumenti ogni settimana.', placeholder: 'tua@email.com', subscribe: 'Iscriviti', success: 'Grazie! Controlla la tua casella.', privacy: 'Niente spam. Cancella quando vuoi.' },
  pt: { title: 'Fique atualizado', subtitle: 'Receba dicas de dev e novos ferramentas semanalmente.', placeholder: 'seu@email.com', subscribe: 'Inscrever-se', success: 'Obrigado! Verifique sua caixa de entrada.', privacy: 'Sem spam. Cancele a qualquer momento.' },
  nl: { title: 'Blijf op de hoogte', subtitle: 'Ontvang wekelijkse dev-tips en nieuwe tools.', placeholder: 'uw@email.com', subscribe: 'Abonneren', success: 'Bedankt! Controleer uw inbox.', privacy: 'Geen spam. Altijd opzegbaar.' },
  pl: { title: 'Bądź na bieżąco', subtitle: 'Otrzymuj cotygodniowe porady i nowe narzędzia.', placeholder: 'twoj@email.com', subscribe: 'Subskrybuj', success: 'Dzięki! Sprawdź swoją skrzynkę.', privacy: 'Bez spamu. Zrezygnuj kiedy chcesz.' },
  sv: { title: 'Håll dig uppdaterad', subtitle: 'Få veckovisa dev-tips och nya verktyg.', placeholder: 'din@email.com', subscribe: 'Prenumerera', success: 'Tack! Kolla din inkorg.', privacy: 'Ingen spam. Avsluta när som helst.' },
  no: { title: 'Hold deg oppdatert', subtitle: 'Få ukentlige dev-tips og nye verktøy.', placeholder: 'din@email.com', subscribe: 'Abonner', success: 'Takk! Sjekk innboksen din.', privacy: 'Ingen spam. Avslutt når som helst.' },
  ja: { title: '最新情報を受け取る', subtitle: '毎週の開発ヒントと新ツール情報。', placeholder: 'your@email.com', subscribe: '購読', success: 'ありがとうございます！受信箱を確認してください。', privacy: 'スパムなし。いつでも解除可能。' },
  ko: { title: '최신 소식 받기', subtitle: '주간 개발 팁과 새 도구 알림을 받으세요.', placeholder: 'your@email.com', subscribe: '구독', success: '감사합니다! 받은편지함을 확인하세요.', privacy: '스팸 없음. 언제든 구독 해지 가능.' },
  id: { title: 'Tetap Update', subtitle: 'Dapatkan tips dev mingguan dan tool baru.', placeholder: 'email@anda.com', subscribe: 'Berlangganan', success: 'Terima kasih! Cek inbox Anda.', privacy: 'Tanpa spam. Berhenti kapan saja.' },
  th: { title: 'อัปเดตข่าวสาร', subtitle: 'รับเคล็ดลับการพัฒนาและเครื่องมือใหม่ทุกสัปดาห์', placeholder: 'your@email.com', subscribe: 'สมัครสมาชิก', success: 'ขอบคุณ! ตรวจสอบกล่องจดหมายของคุณ', privacy: 'ไม่มีสแปม ยกเลิกได้ตลอดเวลา' }
};

for (const locale of locales) {
  const filePath = path.join(dictDir, `${locale}.json`);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add tool entries
  const toolData = toolEntries[locale] || toolEntries.en;
  for (const [toolId, entry] of Object.entries(toolData)) {
    if (!dict.tools[toolId]) {
      // For non-en locales that only have name/description/pageTitle/pageDescription,
      // merge with en for the extra fields
      if (locale !== 'en' && !entry.seoTitle) {
        dict.tools[toolId] = { ...toolEntries.en[toolId], ...entry };
      } else {
        dict.tools[toolId] = entry;
      }
    }
  }

  // Add newsletter section
  dict.newsletter = newsletter[locale] || newsletter.en;

  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2) + '\n', 'utf8');
  console.log(`Updated: ${locale}.json`);
}

console.log('Done! All 15 dictionaries updated.');
