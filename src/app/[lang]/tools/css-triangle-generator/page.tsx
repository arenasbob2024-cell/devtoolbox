'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Triangle Generator',
    description: 'Generate pure CSS triangles with customizable direction, color, and size controls. Live preview and instant CSS code output.',
    dirLabel: 'Direction', colorLabel: 'Color', widthLabel: 'Width (px)', heightLabel: 'Height (px)',
    preview: 'Live Preview', cssOutput: 'CSS Output', htmlOutput: 'HTML Output',
    up: 'Up', down: 'Down', left: 'Left', right: 'Right',
    topLeft: 'Top Left', topRight: 'Top Right', bottomLeft: 'Bottom Left', bottomRight: 'Bottom Right',
    introTitle: 'Free CSS Triangle Generator',
    introText: 'Generate pure CSS triangles using the classic CSS border trick. CSS triangles are created by setting an element to zero width and height, then using borders with transparent colors on the sides you want to hide. This technique requires no images and works in all modern browsers. Useful for tooltips, dropdown arrows, speech bubbles, and decorative elements.',
    tipTitle: 'CSS Triangle Tips',
    tip1: 'CSS triangles use the border trick: zero-sized element with colored and transparent borders',
    tip2: 'Use CSS triangles for tooltip arrows, dropdown carets, and decorative dividers',
    tip3: 'For diagonal triangles, set borders on two adjacent sides',
    tip4: 'Combine with CSS ::before or ::after pseudo-elements to attach to elements',
    tip5: 'Use CSS clip-path for more complex polygon shapes if you need more control',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do CSS triangles work?',
    faq1a: 'CSS triangles exploit how browsers render borders. When an element has zero width and height, the borders meet at the center forming triangular shapes. By making some borders transparent and one border colored, you get a triangle pointing in the opposite direction of the colored border.',
    faq2q: 'Which browsers support CSS triangles?',
    faq2a: 'CSS triangles using the border trick work in all modern browsers including Chrome, Firefox, Safari, Edge, and even older browsers like IE8+. They are one of the most compatible CSS techniques available.',
    faq3q: 'How do I center a CSS triangle?',
    faq3a: 'CSS triangles are block-level elements. To center horizontally, use margin: 0 auto; on the triangle element. To center vertically within a container, use flexbox: display: flex; align-items: center; on the parent, or use absolute positioning with transform: translateY(-50%).',
    faq4q: 'Can I animate CSS triangles?',
    faq4a: 'Yes! CSS triangles can be animated with CSS transitions and animations. You can animate the border-width (size), border-color (color), and even use transform to rotate or scale the triangle. Changing the direction with animation is trickier since it requires changing which border is colored.',
    faq5q: 'What are alternatives to CSS triangles?',
    faq5a: 'CSS clip-path: polygon() provides more control for complex shapes. SVG triangles offer the best flexibility for complex or animated shapes. CSS transform: rotate() on a square element can simulate triangles. Unicode characters like ▲▼◀▶ can also work for simple arrow indicators.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS 三角形生成器', description: '生成具有可自定义方向、颜色和大小的纯 CSS 三角形，实时预览。',
    dirLabel: '方向', colorLabel: '颜色', widthLabel: '宽度（像素）', heightLabel: '高度（像素）',
    preview: '实时预览', cssOutput: 'CSS 输出', htmlOutput: 'HTML 输出',
    up: '向上', down: '向下', left: '向左', right: '向右',
    topLeft: '左上', topRight: '右上', bottomLeft: '左下', bottomRight: '右下',
    introTitle: '免费 CSS 三角形生成器', introText: '使用经典 CSS 边框技巧生成纯 CSS 三角形。',
    tipTitle: 'CSS 三角形技巧', tip1: 'CSS 三角形使用边框技巧：零大小元素加彩色和透明边框',
    tip2: '用于工具提示箭头、下拉符号和装饰分隔符', tip3: '对角三角形设置相邻两侧的边框',
    tip4: '结合 ::before 或 ::after 伪元素附加到元素', tip5: '需要更多控制时使用 clip-path',
    faqTitle: '常见问题', faq1q: 'CSS 三角形如何工作？', faq1a: 'CSS 三角形利用浏览器渲染边框的方式，通过透明边框创建三角形形状。',
    faq2q: '哪些浏览器支持 CSS 三角形？', faq2a: '所有现代浏览器包括 IE8+ 都支持。',
    faq3q: '如何居中 CSS 三角形？', faq3a: '水平居中使用 margin: 0 auto，垂直居中使用 flexbox。',
    faq4q: '可以为 CSS 三角形添加动画吗？', faq4a: '是的，可以使用 CSS 过渡和动画对三角形进行动画处理。',
    faq5q: 'CSS 三角形的替代方案？', faq5a: 'CSS clip-path、SVG 或 Unicode 字符（▲▼◀▶）。',
    relatedTitle: '相关工具',
  },
  fr: { title: 'Generateur de Triangles CSS', description: 'Generez des triangles CSS purs avec apercu en direct.',
    dirLabel: 'Direction', colorLabel: 'Couleur', widthLabel: 'Largeur (px)', heightLabel: 'Hauteur (px)',
    preview: 'Apercu', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Haut', down: 'Bas', left: 'Gauche', right: 'Droite',
    topLeft: 'Haut gauche', topRight: 'Haut droite', bottomLeft: 'Bas gauche', bottomRight: 'Bas droite',
    introTitle: 'Generateur de triangles CSS gratuit', introText: 'Generez des triangles CSS purs en utilisant l\'astuce des bordures CSS.',
    tipTitle: 'Conseils triangles CSS', tip1: 'Les triangles CSS utilisent l\'astuce des bordures', tip2: 'Pour les fleches de tooltips et menus deroulants',
    tip3: 'Pour les triangles diagonaux, definissez les bordures sur deux cotes adjacents', tip4: 'Combinez avec ::before ou ::after', tip5: 'Utilisez clip-path pour des formes plus complexes',
    faqTitle: 'Questions frequentes', faq1q: 'Comment fonctionnent les triangles CSS?', faq1a: 'Les triangles CSS exploitent le rendu des bordures du navigateur.',
    faq2q: 'Quels navigateurs supportent les triangles CSS?', faq2a: 'Tous les navigateurs modernes, y compris IE8+.',
    faq3q: 'Comment centrer un triangle CSS?', faq3a: 'Horizontalement avec margin: 0 auto, verticalement avec flexbox.',
    faq4q: 'Peut-on animer les triangles CSS?', faq4a: 'Oui, avec les transitions et animations CSS.',
    faq5q: 'Quelles sont les alternatives?', faq5a: 'CSS clip-path, SVG ou caracteres Unicode comme ▲▼◀▶.',
    relatedTitle: 'Outils connexes' },
  de: { title: 'CSS Dreieck Generator', description: 'Reine CSS-Dreiecke mit Live-Vorschau generieren.',
    dirLabel: 'Richtung', colorLabel: 'Farbe', widthLabel: 'Breite (px)', heightLabel: 'Hoehe (px)',
    preview: 'Vorschau', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Oben', down: 'Unten', left: 'Links', right: 'Rechts',
    topLeft: 'Oben links', topRight: 'Oben rechts', bottomLeft: 'Unten links', bottomRight: 'Unten rechts',
    introTitle: 'Kostenloser CSS Dreieck-Generator', introText: 'CSS-Dreiecke mit dem Rand-Trick erstellen.',
    tipTitle: 'CSS Dreieck Tipps', tip1: 'Dreiecke nutzen den Border-Trick', tip2: 'Fuer Tooltip-Pfeile und Dropdown-Symbole',
    tip3: 'Diagonale Dreiecke benoetigen Raender auf zwei angrenzenden Seiten', tip4: 'Mit ::before oder ::after kombinieren', tip5: 'Clip-path fuer komplexere Formen verwenden',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Wie funktionieren CSS-Dreiecke?', faq1a: 'CSS-Dreiecke nutzen das Rand-Rendering des Browsers.',
    faq2q: 'Welche Browser unterstuetzen CSS-Dreiecke?', faq2a: 'Alle modernen Browser einschliesslich IE8+.',
    faq3q: 'Wie zentriert man ein CSS-Dreieck?', faq3a: 'Horizontal mit margin: 0 auto, vertikal mit Flexbox.',
    faq4q: 'Koennen CSS-Dreiecke animiert werden?', faq4a: 'Ja, mit CSS-Transitionen und -Animationen.',
    faq5q: 'Welche Alternativen gibt es?', faq5a: 'CSS clip-path, SVG oder Unicode-Zeichen wie ▲▼◀▶.',
    relatedTitle: 'Verwandte Tools' },
  es: { title: 'Generador de Triangulos CSS', description: 'Genera triangulos CSS puros con vista previa en vivo.',
    dirLabel: 'Direccion', colorLabel: 'Color', widthLabel: 'Ancho (px)', heightLabel: 'Alto (px)',
    preview: 'Vista previa', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Arriba', down: 'Abajo', left: 'Izquierda', right: 'Derecha',
    topLeft: 'Arriba izquierda', topRight: 'Arriba derecha', bottomLeft: 'Abajo izquierda', bottomRight: 'Abajo derecha',
    introTitle: 'Generador de triangulos CSS gratuito', introText: 'Genera triangulos CSS puros usando el truco de bordes.',
    tipTitle: 'Consejos triangulos CSS', tip1: 'Los triangulos usan el truco de bordes', tip2: 'Para flechas de tooltips y menus',
    tip3: 'Triangulos diagonales necesitan bordes en dos lados adyacentes', tip4: 'Combina con ::before o ::after', tip5: 'Usa clip-path para formas mas complejas',
    faqTitle: 'Preguntas frecuentes', faq1q: 'Como funcionan los triangulos CSS?', faq1a: 'Explotan el renderizado de bordes del navegador.',
    faq2q: 'Que navegadores los soportan?', faq2a: 'Todos los modernos, incluyendo IE8+.',
    faq3q: 'Como centrar un triangulo CSS?', faq3a: 'Horizontalmente con margin: 0 auto, verticalmente con flexbox.',
    faq4q: 'Puedo animar triangulos CSS?', faq4a: 'Si, con transiciones y animaciones CSS.',
    faq5q: 'Cuales son las alternativas?', faq5a: 'CSS clip-path, SVG o caracteres Unicode como ▲▼◀▶.',
    relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Gerador de Triangulos CSS', description: 'Gera triangulos CSS puros com visualizacao ao vivo.',
    dirLabel: 'Direcao', colorLabel: 'Cor', widthLabel: 'Largura (px)', heightLabel: 'Altura (px)',
    preview: 'Visualizacao', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Cima', down: 'Baixo', left: 'Esquerda', right: 'Direita',
    topLeft: 'Cima esquerda', topRight: 'Cima direita', bottomLeft: 'Baixo esquerda', bottomRight: 'Baixo direita',
    introTitle: 'Gerador de triangulos CSS gratuito', introText: 'Gera triangulos CSS puros usando o truque de bordas.',
    tipTitle: 'Dicas triangulos CSS', tip1: 'Triangulos usam o truque de bordas', tip2: 'Para setas de tooltips e menus',
    tip3: 'Triangulos diagonais precisam de bordas em dois lados adjacentes', tip4: 'Combine com ::before ou ::after', tip5: 'Use clip-path para formas mais complexas',
    faqTitle: 'Perguntas frequentes', faq1q: 'Como funcionam os triangulos CSS?', faq1a: 'Exploram a renderizacao de bordas do navegador.',
    faq2q: 'Quais navegadores suportam?', faq2a: 'Todos os modernos, incluindo IE8+.',
    faq3q: 'Como centralizar um triangulo CSS?', faq3a: 'Horizontalmente com margin: 0 auto, verticalmente com flexbox.',
    faq4q: 'Posso animar triangulos CSS?', faq4a: 'Sim, com transicoes e animacoes CSS.',
    faq5q: 'Quais sao as alternativas?', faq5a: 'CSS clip-path, SVG ou caracteres Unicode como ▲▼◀▶.',
    relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Generatore di Triangoli CSS', description: 'Genera triangoli CSS puri con anteprima in tempo reale.',
    dirLabel: 'Direzione', colorLabel: 'Colore', widthLabel: 'Larghezza (px)', heightLabel: 'Altezza (px)',
    preview: 'Anteprima', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Su', down: 'Giu', left: 'Sinistra', right: 'Destra',
    topLeft: 'Alto sinistra', topRight: 'Alto destra', bottomLeft: 'Basso sinistra', bottomRight: 'Basso destra',
    introTitle: 'Generatore di triangoli CSS gratuito', introText: 'Genera triangoli CSS puri usando il trucco dei bordi.',
    tipTitle: 'Suggerimenti triangoli CSS', tip1: 'I triangoli usano il trucco dei bordi', tip2: 'Per frecce di tooltip e menu',
    tip3: 'I triangoli diagonali richiedono bordi su due lati adiacenti', tip4: 'Combina con ::before o ::after', tip5: 'Usa clip-path per forme piu complesse',
    faqTitle: 'Domande frequenti', faq1q: 'Come funzionano i triangoli CSS?', faq1a: 'Sfruttano il rendering dei bordi del browser.',
    faq2q: 'Quali browser li supportano?', faq2a: 'Tutti i moderni, incluso IE8+.',
    faq3q: 'Come centrare un triangolo CSS?', faq3a: 'Orizzontalmente con margin: 0 auto, verticalmente con flexbox.',
    faq4q: 'Posso animare i triangoli CSS?', faq4a: 'Si, con transizioni e animazioni CSS.',
    faq5q: 'Quali sono le alternative?', faq5a: 'CSS clip-path, SVG o caratteri Unicode come ▲▼◀▶.',
    relatedTitle: 'Strumenti correlati' },
  nl: { title: 'CSS Driehoek Generator', description: 'Genereer pure CSS-driehoeken met live preview.',
    dirLabel: 'Richting', colorLabel: 'Kleur', widthLabel: 'Breedte (px)', heightLabel: 'Hoogte (px)',
    preview: 'Preview', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Omhoog', down: 'Omlaag', left: 'Links', right: 'Rechts',
    topLeft: 'Links boven', topRight: 'Rechts boven', bottomLeft: 'Links onder', bottomRight: 'Rechts onder',
    introTitle: 'Gratis CSS driehoek generator', introText: 'Genereer pure CSS-driehoeken met de randtruc.',
    tipTitle: 'CSS driehoek tips', tip1: 'Driehoeken gebruiken de randtruc', tip2: 'Voor tooltip-pijlen en menu-aanduidingen',
    tip3: 'Diagonale driehoeken vereisen randen op twee aangrenzende zijden', tip4: 'Combineer met ::before of ::after', tip5: 'Gebruik clip-path voor complexere vormen',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Hoe werken CSS-driehoeken?', faq1a: 'Ze maken gebruik van de randweergave van de browser.',
    faq2q: 'Welke browsers ondersteunen ze?', faq2a: 'Alle moderne browsers, inclusief IE8+.',
    faq3q: 'Hoe centreer ik een CSS-driehoek?', faq3a: 'Horizontaal met margin: 0 auto, verticaal met flexbox.',
    faq4q: 'Kan ik CSS-driehoeken animeren?', faq4a: 'Ja, met CSS-overgangen en -animaties.',
    faq5q: 'Wat zijn de alternatieven?', faq5a: 'CSS clip-path, SVG of Unicode-tekens zoals ▲▼◀▶.',
    relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Generator Trojkatow CSS', description: 'Generuj czyste trojkaty CSS z podgladem na zywo.',
    dirLabel: 'Kierunek', colorLabel: 'Kolor', widthLabel: 'Szerokosc (px)', heightLabel: 'Wysokosc (px)',
    preview: 'Podglad', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Gora', down: 'Dol', left: 'Lewo', right: 'Prawo',
    topLeft: 'Gora lewo', topRight: 'Gora prawo', bottomLeft: 'Dol lewo', bottomRight: 'Dol prawo',
    introTitle: 'Darmowy generator trojkatow CSS', introText: 'Generuj czyste trojkaty CSS za pomoca sztuczki z obramowaniem.',
    tipTitle: 'Wskazowki trojkaty CSS', tip1: 'Trojkaty uywaja sztuczki z obramowaniem', tip2: 'Do strzalek tooltipu i rozwijanych menu',
    tip3: 'Ukosne trojkaty wymagaja obramowania na dwoch przylegajacych bokach', tip4: 'Kombinuj z ::before lub ::after', tip5: 'Uzywaj clip-path do bardziej zlozonych ksztaltow',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Jak dzialaja trojkaty CSS?', faq1a: 'Wykorzystuja renderowanie obramowania przegladarki.',
    faq2q: 'Jakie przegladarki je obsluguja?', faq2a: 'Wszystkie nowoczesne, w tym IE8+.',
    faq3q: 'Jak wycentrowac trojkat CSS?', faq3a: 'Poziomo z margin: 0 auto, pionowo z flexbox.',
    faq4q: 'Czy moge animowac trojkaty CSS?', faq4a: 'Tak, z przejsciami i animacjami CSS.',
    faq5q: 'Jakie sa alternatywy?', faq5a: 'CSS clip-path, SVG lub znaki Unicode jak ▲▼◀▶.',
    relatedTitle: 'Powiazane narzedzia' },
  sv: { title: 'CSS Triangelgenerator', description: 'Generera rena CSS-trianglar med live forhandsgranskning.',
    dirLabel: 'Riktning', colorLabel: 'Farg', widthLabel: 'Bredd (px)', heightLabel: 'Hojd (px)',
    preview: 'Forhandsgranskning', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Upp', down: 'Ner', left: 'Vanster', right: 'Hoeger',
    topLeft: 'Ovre vanster', topRight: 'Ovre hoeger', bottomLeft: 'Nedre vanster', bottomRight: 'Nedre hoeger',
    introTitle: 'Gratis CSS triangelgenerator', introText: 'Generera rena CSS-trianglar med ramlisttricket.',
    tipTitle: 'CSS triangeltips', tip1: 'Trianglar anvander ramlisttricket', tip2: 'For tooltippiler och rullgardinsmenyer',
    tip3: 'Diagonala trianglar behoever ramar pa tva intilliggande sidor', tip4: 'Kombinera med ::before eller ::after', tip5: 'Anvand clip-path for mer komplexa former',
    faqTitle: 'Vanliga fragor', faq1q: 'Hur fungerar CSS-trianglar?', faq1a: 'De utnyttjar webblaesarens ramlisterendering.',
    faq2q: 'Vilka weblaesare stoder dem?', faq2a: 'Alla moderna weblaesare, inklusive IE8+.',
    faq3q: 'Hur centrerar jag en CSS-triangel?', faq3a: 'Horisontellt med margin: 0 auto, vertikalt med flexbox.',
    faq4q: 'Kan jag animera CSS-trianglar?', faq4a: 'Ja, med CSS-overganger och animationer.',
    faq5q: 'Vad aer alternativen?', faq5a: 'CSS clip-path, SVG eller Unicode-tecken som ▲▼◀▶.',
    relatedTitle: 'Relaterade verktyg' },
  no: { title: 'CSS Trekantgenerator', description: 'Generer rene CSS-trekanter med live forhandsvisning.',
    dirLabel: 'Retning', colorLabel: 'Farge', widthLabel: 'Bredde (px)', heightLabel: 'Hoyde (px)',
    preview: 'Forhandsvisning', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Opp', down: 'Ned', left: 'Venstre', right: 'Hoyre',
    topLeft: 'Ovre venstre', topRight: 'Ovre hoyre', bottomLeft: 'Nedre venstre', bottomRight: 'Nedre hoyre',
    introTitle: 'Gratis CSS trekantgenerator', introText: 'Generer rene CSS-trekanter med kantlisttrikset.',
    tipTitle: 'CSS trekant tips', tip1: 'Trekanter bruker kantlisttrikset', tip2: 'For tooltippiler og rullegardinmenyer',
    tip3: 'Diagonale trekanter trenger kanter pa to tilstotende sider', tip4: 'Kombiner med ::before eller ::after', tip5: 'Bruk clip-path for mer komplekse former',
    faqTitle: 'Vanlige spoersmaal', faq1q: 'Hvordan fungerer CSS-trekanter?', faq1a: 'De utnytter nettleserens kantlistegendering.',
    faq2q: 'Hvilke nettlesere stoetter dem?', faq2a: 'Alle moderne nettlesere, inkludert IE8+.',
    faq3q: 'Hvordan sentrerer jeg en CSS-trekant?', faq3a: 'Horisontalt med margin: 0 auto, vertikalt med flexbox.',
    faq4q: 'Kan jeg animere CSS-trekanter?', faq4a: 'Ja, med CSS-overganger og animasjoner.',
    faq5q: 'Hva er alternativene?', faq5a: 'CSS clip-path, SVG eller Unicode-tegn som ▲▼◀▶.',
    relatedTitle: 'Relaterte verktoy' },
  ja: { title: 'CSS 三角形ジェネレーター', description: 'ライブプレビュー付きで純粋な CSS 三角形を生成します。',
    dirLabel: '方向', colorLabel: '色', widthLabel: '幅 (px)', heightLabel: '高さ (px)',
    preview: 'プレビュー', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: '上', down: '下', left: '左', right: '右',
    topLeft: '左上', topRight: '右上', bottomLeft: '左下', bottomRight: '右下',
    introTitle: '無料 CSS 三角形ジェネレーター', introText: 'CSS ボーダートリックを使用して純粋な CSS 三角形を生成します。',
    tipTitle: 'CSS 三角形のヒント', tip1: '三角形はボーダートリックを使用します', tip2: 'ツールチップの矢印やドロップダウンに', tip3: '対角三角形は2つの隣接する辺にボーダーが必要',
    tip4: '::before または ::after 疑似要素と組み合わせる', tip5: 'より複雑な形状には clip-path を使用',
    faqTitle: 'よくある質問', faq1q: 'CSS 三角形はどう機能しますか？', faq1a: 'ブラウザのボーダーレンダリングを利用します。',
    faq2q: 'どのブラウザが対応していますか？', faq2a: 'IE8+ を含むすべての最新ブラウザ。',
    faq3q: 'CSS 三角形を中央揃えするには？', faq3a: '水平方向は margin: 0 auto、垂直方向は flexbox。',
    faq4q: 'CSS 三角形をアニメーションできますか？', faq4a: 'はい、CSS トランジションとアニメーションで可能です。',
    faq5q: '代替手段は？', faq5a: 'CSS clip-path、SVG、または ▲▼◀▶ のような Unicode 文字。',
    relatedTitle: '関連ツール' },
  ko: { title: 'CSS 삼각형 생성기', description: '실시간 미리보기로 순수 CSS 삼각형을 생성합니다.',
    dirLabel: '방향', colorLabel: '색상', widthLabel: '너비 (px)', heightLabel: '높이 (px)',
    preview: '미리보기', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: '위', down: '아래', left: '왼쪽', right: '오른쪽',
    topLeft: '왼쪽 위', topRight: '오른쪽 위', bottomLeft: '왼쪽 아래', bottomRight: '오른쪽 아래',
    introTitle: '무료 CSS 삼각형 생성기', introText: 'CSS 테두리 트릭을 사용하여 순수 CSS 삼각형을 생성합니다.',
    tipTitle: 'CSS 삼각형 팁', tip1: '삼각형은 테두리 트릭을 사용합니다', tip2: '툴팁 화살표와 드롭다운에 유용',
    tip3: '대각선 삼각형은 인접한 두 면에 테두리 필요', tip4: '::before 또는 ::after 와 결합', tip5: '복잡한 모양에는 clip-path 사용',
    faqTitle: '자주 묻는 질문', faq1q: 'CSS 삼각형은 어떻게 작동하나요?', faq1a: '브라우저의 테두리 렌더링을 활용합니다.',
    faq2q: '어떤 브라우저가 지원하나요?', faq2a: 'IE8+을 포함한 모든 최신 브라우저.',
    faq3q: 'CSS 삼각형을 가운데 정렬하는 방법?', faq3a: '수평은 margin: 0 auto, 수직은 flexbox.',
    faq4q: 'CSS 삼각형을 애니메이션할 수 있나요?', faq4a: '네, CSS 전환과 애니메이션으로 가능합니다.',
    faq5q: '대안은?', faq5a: 'CSS clip-path, SVG 또는 ▲▼◀▶ 같은 유니코드 문자.',
    relatedTitle: '관련 도구' },
  id: { title: 'Generator Segitiga CSS', description: 'Hasilkan segitiga CSS murni dengan pratinjau langsung.',
    dirLabel: 'Arah', colorLabel: 'Warna', widthLabel: 'Lebar (px)', heightLabel: 'Tinggi (px)',
    preview: 'Pratinjau', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'Atas', down: 'Bawah', left: 'Kiri', right: 'Kanan',
    topLeft: 'Kiri atas', topRight: 'Kanan atas', bottomLeft: 'Kiri bawah', bottomRight: 'Kanan bawah',
    introTitle: 'Generator segitiga CSS gratis', introText: 'Hasilkan segitiga CSS murni menggunakan trik batas CSS.',
    tipTitle: 'Tips segitiga CSS', tip1: 'Segitiga menggunakan trik batas', tip2: 'Untuk panah tooltip dan menu dropdown',
    tip3: 'Segitiga diagonal membutuhkan batas pada dua sisi yang berdekatan', tip4: 'Gabungkan dengan ::before atau ::after', tip5: 'Gunakan clip-path untuk bentuk yang lebih kompleks',
    faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Bagaimana segitiga CSS bekerja?', faq1a: 'Memanfaatkan rendering batas browser.',
    faq2q: 'Browser apa yang mendukung?', faq2a: 'Semua browser modern termasuk IE8+.',
    faq3q: 'Bagaimana memusatkan segitiga CSS?', faq3a: 'Horizontal dengan margin: 0 auto, vertikal dengan flexbox.',
    faq4q: 'Bisakah saya menganimasikan segitiga CSS?', faq4a: 'Ya, dengan transisi dan animasi CSS.',
    faq5q: 'Apa alternatifnya?', faq5a: 'CSS clip-path, SVG, atau karakter Unicode seperti ▲▼◀▶.',
    relatedTitle: 'Alat terkait' },
  th: { title: 'เครื่องมือสร้างสามเหลี่ยม CSS', description: 'สร้างสามเหลี่ยม CSS แบบบริสุทธิ์พร้อมตัวอย่างสด',
    dirLabel: 'ทิศทาง', colorLabel: 'สี', widthLabel: 'ความกว้าง (px)', heightLabel: 'ความสูง (px)',
    preview: 'ตัวอย่างสด', cssOutput: 'CSS', htmlOutput: 'HTML',
    up: 'ขึ้น', down: 'ลง', left: 'ซ้าย', right: 'ขวา',
    topLeft: 'ซ้ายบน', topRight: 'ขวาบน', bottomLeft: 'ซ้ายล่าง', bottomRight: 'ขวาล่าง',
    introTitle: 'เครื่องมือสร้างสามเหลี่ยม CSS ฟรี', introText: 'สร้างสามเหลี่ยม CSS แบบบริสุทธิ์โดยใช้เทคนิค CSS border',
    tipTitle: 'เคล็ดลับสามเหลี่ยม CSS', tip1: 'สามเหลี่ยมใช้เทคนิค border', tip2: 'สำหรับลูกศร tooltip และเมนู dropdown',
    tip3: 'สามเหลี่ยมทแยงต้องการขอบบนสองด้านที่อยู่ติดกัน', tip4: 'ใช้ร่วมกับ ::before หรือ ::after', tip5: 'ใช้ clip-path สำหรับรูปทรงที่ซับซ้อนกว่า',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'สามเหลี่ยม CSS ทำงานอย่างไร?', faq1a: 'ใช้ประโยชน์จากการแสดงผลขอบของเบราว์เซอร์',
    faq2q: 'เบราว์เซอร์ใดรองรับ?', faq2a: 'เบราว์เซอร์สมัยใหม่ทั้งหมดรวมถึง IE8+',
    faq3q: 'จะจัดกึ่งกลางสามเหลี่ยม CSS อย่างไร?', faq3a: 'แนวนอนใช้ margin: 0 auto แนวตั้งใช้ flexbox',
    faq4q: 'ฉันสามารถเพิ่มแอนิเมชันให้สามเหลี่ยม CSS ได้ไหม?', faq4a: 'ได้ ด้วย CSS transitions และ animations',
    faq5q: 'ทางเลือกอื่นคืออะไร?', faq5a: 'CSS clip-path, SVG หรืออักขระ Unicode เช่น ▲▼◀▶',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

type Direction = 'up' | 'down' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

function getTriangleCss(dir: Direction, color: string, w: number, h: number): string {
  const transparent = 'transparent';
  const wH = `${w / 2}px`, hH = `${h / 2}px`, wFull = `${w}px`, hFull = `${h}px`;
  switch (dir) {
    case 'up': return `width: 0;\nheight: 0;\nborder-left: ${wH} solid ${transparent};\nborder-right: ${wH} solid ${transparent};\nborder-bottom: ${hFull} solid ${color};`;
    case 'down': return `width: 0;\nheight: 0;\nborder-left: ${wH} solid ${transparent};\nborder-right: ${wH} solid ${transparent};\nborder-top: ${hFull} solid ${color};`;
    case 'left': return `width: 0;\nheight: 0;\nborder-top: ${hH} solid ${transparent};\nborder-bottom: ${hH} solid ${transparent};\nborder-right: ${wFull} solid ${color};`;
    case 'right': return `width: 0;\nheight: 0;\nborder-top: ${hH} solid ${transparent};\nborder-bottom: ${hH} solid ${transparent};\nborder-left: ${wFull} solid ${color};`;
    case 'top-left': return `width: 0;\nheight: 0;\nborder-top: ${hFull} solid ${color};\nborder-right: ${wFull} solid ${transparent};`;
    case 'top-right': return `width: 0;\nheight: 0;\nborder-top: ${hFull} solid ${color};\nborder-left: ${wFull} solid ${transparent};`;
    case 'bottom-left': return `width: 0;\nheight: 0;\nborder-bottom: ${hFull} solid ${color};\nborder-right: ${wFull} solid ${transparent};`;
    case 'bottom-right': return `width: 0;\nheight: 0;\nborder-bottom: ${hFull} solid ${color};\nborder-left: ${wFull} solid ${transparent};`;
  }
}

function getTriangleStyle(dir: Direction, color: string, w: number, h: number): React.CSSProperties {
  const transparent = 'transparent';
  const wH = w / 2, hH = h / 2;
  switch (dir) {
    case 'up': return { width: 0, height: 0, borderLeft: `${wH}px solid ${transparent}`, borderRight: `${wH}px solid ${transparent}`, borderBottom: `${h}px solid ${color}` };
    case 'down': return { width: 0, height: 0, borderLeft: `${wH}px solid ${transparent}`, borderRight: `${wH}px solid ${transparent}`, borderTop: `${h}px solid ${color}` };
    case 'left': return { width: 0, height: 0, borderTop: `${hH}px solid ${transparent}`, borderBottom: `${hH}px solid ${transparent}`, borderRight: `${w}px solid ${color}` };
    case 'right': return { width: 0, height: 0, borderTop: `${hH}px solid ${transparent}`, borderBottom: `${hH}px solid ${transparent}`, borderLeft: `${w}px solid ${color}` };
    case 'top-left': return { width: 0, height: 0, borderTop: `${h}px solid ${color}`, borderRight: `${w}px solid ${transparent}` };
    case 'top-right': return { width: 0, height: 0, borderTop: `${h}px solid ${color}`, borderLeft: `${w}px solid ${transparent}` };
    case 'bottom-left': return { width: 0, height: 0, borderBottom: `${h}px solid ${color}`, borderRight: `${w}px solid ${transparent}` };
    case 'bottom-right': return { width: 0, height: 0, borderBottom: `${h}px solid ${color}`, borderLeft: `${w}px solid ${transparent}` };
  }
}

export default function CssTriangleGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [dir, setDir] = useState<Direction>('up');
  const [color, setColor] = useState('#3b82f6');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(80);

  const directions: { value: Direction; label: string }[] = [
    { value: 'up', label: t.up }, { value: 'down', label: t.down },
    { value: 'left', label: t.left }, { value: 'right', label: t.right },
    { value: 'top-left', label: t.topLeft }, { value: 'top-right', label: t.topRight },
    { value: 'bottom-left', label: t.bottomLeft }, { value: 'bottom-right', label: t.bottomRight },
  ];

  const triangleStyle = useMemo(() => getTriangleStyle(dir, color, width, height), [dir, color, width, height]);
  const cssCode = useMemo(() => `.triangle {\n  ${getTriangleCss(dir, color, width, height).split('\n').join('\n  ')}\n}`, [dir, color, width, height]);
  const htmlCode = `<div class="triangle"></div>`;

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

  return (
    <ToolLayout title={t.title} description={t.description} toolId="css-triangle-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.dirLabel}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {directions.map(d => (
                <button key={d.value} onClick={() => setDir(d.value)}
                  className={d.value === dir ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ fontSize: 12, padding: '6px 8px' }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.colorLabel}</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 50, height: 36, padding: 2, borderRadius: 6, border: '1px solid var(--border-color)', cursor: 'pointer' }} />
              <input value={color} onChange={e => setColor(e.target.value)} style={{ flex: 1, fontFamily: 'monospace' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.widthLabel}</label>
              <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} min="10" max="500" style={{ fontFamily: 'monospace' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.heightLabel}</label>
              <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} min="10" max="500" style={{ fontFamily: 'monospace' }} />
            </div>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.preview}</label>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={triangleStyle} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.cssOutput}</label>
            <CopyButton text={cssCode} />
          </div>
          <pre style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, fontSize: 13, fontFamily: 'monospace', overflowX: 'auto', margin: 0 }}>{cssCode}</pre>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.htmlOutput}</label>
            <CopyButton text={htmlCode} />
          </div>
          <pre style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, fontSize: 13, fontFamily: 'monospace', margin: 0 }}>{htmlCode}</pre>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/box-shadow`, label: 'Box Shadow Generator' },
            { href: `/${lang}/tools/border-radius`, label: 'Border Radius Generator' },
            { href: `/${lang}/tools/color-picker-online`, label: 'Color Picker' },
            { href: `/${lang}/tools/css-gradient-generator`, label: 'CSS Gradient Generator' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
