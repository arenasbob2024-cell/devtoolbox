'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Gradient Generator',
    description: 'Create beautiful CSS gradients with a visual editor. Supports linear, radial, and conic gradients with live preview.',
    type: 'Gradient Type',
    linear: 'Linear',
    radial: 'Radial',
    conic: 'Conic',
    angle: 'Angle',
    shape: 'Shape',
    circle: 'Circle',
    ellipse: 'Ellipse',
    colors: 'Color Stops',
    addColor: 'Add Color',
    remove: 'Remove',
    position: 'Position',
    preview: 'Preview',
    cssOutput: 'CSS Output',
    randomize: 'Random',
    reset: 'Reset',
    presets: 'Presets',
    introTitle: 'Free Online CSS Gradient Generator',
    introText: 'Design stunning CSS gradients visually with this free tool. Choose between linear, radial, and conic gradient types, add multiple color stops, adjust angles and positions, and get production-ready CSS code instantly. Perfect for web designers and front-end developers who want to create eye-catching backgrounds, buttons, and UI elements without writing CSS by hand.',
    tipTitle: 'CSS Gradient Tips',
    tip1: 'Use at least 2-3 color stops for smooth, professional-looking gradients',
    tip2: 'Linear gradients work great for backgrounds and hero sections',
    tip3: 'Radial gradients create natural spotlight or glow effects',
    tip4: 'Conic gradients are perfect for pie charts and color wheels',
    tip5: 'Always include a fallback background-color for older browsers',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a CSS gradient?',
    faq1a: 'A CSS gradient is a smooth transition between two or more colors rendered by the browser without using images. CSS supports three types: linear-gradient (colors transition along a straight line), radial-gradient (colors radiate from a center point), and conic-gradient (colors rotate around a center point). Gradients reduce page load times compared to image backgrounds.',
    faq2q: 'What is the difference between linear, radial, and conic gradients?',
    faq2a: 'Linear gradients flow in a straight line at a specified angle. Radial gradients emanate from a center point outward in a circular or elliptical shape. Conic gradients sweep around a center point like a color wheel. Each type is suited for different visual effects.',
    faq3q: 'How do I use the generated CSS?',
    faq3a: 'Copy the CSS output and paste it as the background property of any HTML element. For example: .my-element { background: linear-gradient(90deg, #ff0000, #0000ff); }. The gradient will fill the entire element.',
    faq4q: 'Can I use multiple color stops?',
    faq4a: 'Yes, you can add as many color stops as you want. Each stop can have a specific position (percentage) along the gradient. More stops allow for more complex and nuanced color transitions.',
    faq5q: 'Are CSS gradients supported in all browsers?',
    faq5a: 'Linear and radial gradients are supported in all modern browsers (Chrome, Firefox, Safari, Edge). Conic gradients have slightly less support but work in all recent browser versions. It is good practice to include a solid background-color fallback for maximum compatibility.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS 渐变生成器',
    description: '使用可视化编辑器创建 CSS 渐变。支持线性、径向和锥形渐变，实时预览。',
    type: '渐变类型', linear: '线性', radial: '径向', conic: '锥形',
    angle: '角度', shape: '形状', circle: '圆形', ellipse: '椭圆形',
    colors: '色标', addColor: '添加颜色', remove: '删除', position: '位置',
    preview: '预览', cssOutput: 'CSS 输出', randomize: '随机', reset: '重置', presets: '预设',
    introTitle: '免费在线 CSS 渐变生成器',
    introText: '可视化设计 CSS 渐变，支持线性、径向和锥形渐变类型，多个色标，角度和位置调整，即时获取可用的 CSS 代码。',
    tipTitle: 'CSS 渐变技巧',
    tip1: '使用至少 2-3 个色标以获得平滑的渐变效果', tip2: '线性渐变适合背景和首屏区域',
    tip3: '径向渐变可创建自然的聚光灯或发光效果', tip4: '锥形渐变适合饼图和色轮',
    tip5: '始终为旧浏览器包含 background-color 回退',
    faqTitle: '常见问题',
    faq1q: '什么是 CSS 渐变？', faq1a: 'CSS 渐变是浏览器渲染的两种或多种颜色之间的平滑过渡，无需使用图片。支持三种类型：linear-gradient、radial-gradient 和 conic-gradient。',
    faq2q: '线性、径向和锥形渐变有什么区别？', faq2a: '线性渐变沿直线方向过渡，径向渐变从中心点向外辐射，锥形渐变围绕中心点旋转。',
    faq3q: '如何使用生成的 CSS？', faq3a: '复制 CSS 输出并将其作为任何 HTML 元素的 background 属性粘贴即可。',
    faq4q: '可以使用多个色标吗？', faq4a: '可以，您可以添加任意数量的色标，每个色标可以设置沿渐变的特定位置百分比。',
    faq5q: '所有浏览器都支持 CSS 渐变吗？', faq5a: '线性和径向渐变在所有现代浏览器中都受支持。锥形渐变在所有最新版本的浏览器中也可正常工作。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur de Degrades CSS',
    description: 'Creez des degrades CSS avec un editeur visuel. Supporte les degrades lineaires, radiaux et coniques.',
    type: 'Type de degrade', linear: 'Lineaire', radial: 'Radial', conic: 'Conique',
    angle: 'Angle', shape: 'Forme', circle: 'Cercle', ellipse: 'Ellipse',
    colors: 'Arrets de couleur', addColor: 'Ajouter couleur', remove: 'Supprimer', position: 'Position',
    preview: 'Apercu', cssOutput: 'Sortie CSS', randomize: 'Aleatoire', reset: 'Reinitialiser', presets: 'Predefinis',
    introTitle: 'Generateur de degrades CSS gratuit', introText: 'Concevez visuellement des degrades CSS avec des types lineaires, radiaux et coniques.',
    tipTitle: 'Conseils pour les degrades CSS',
    tip1: 'Utilisez au moins 2-3 arrets de couleur', tip2: 'Les degrades lineaires sont parfaits pour les arriere-plans',
    tip3: 'Les degrades radiaux creent des effets de lumiere', tip4: 'Les degrades coniques conviennent aux graphiques circulaires',
    tip5: 'Incluez toujours un background-color de secours',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'un degrade CSS?', faq1a: 'Un degrade CSS est une transition douce entre deux couleurs ou plus rendue par le navigateur sans utiliser d\'images.',
    faq2q: 'Quelle difference entre lineaire, radial et conique?', faq2a: 'Lineaire suit une ligne droite, radial emane d\'un point central, conique tourne autour d\'un point central.',
    faq3q: 'Comment utiliser le CSS genere?', faq3a: 'Copiez la sortie CSS et collez-la comme propriete background de n\'importe quel element HTML.',
    faq4q: 'Peut-on utiliser plusieurs arrets de couleur?', faq4a: 'Oui, vous pouvez ajouter autant d\'arrets que vous le souhaitez avec des positions specifiques.',
    faq5q: 'Tous les navigateurs supportent les degrades CSS?', faq5a: 'Les degrades lineaires et radiaux sont supportes par tous les navigateurs modernes. Les coniques fonctionnent dans les versions recentes.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'CSS Farbverlauf Generator',
    description: 'Erstellen Sie CSS-Farbverlaeufe mit einem visuellen Editor. Unterstuetzt lineare, radiale und konische Verlaeufe.',
    type: 'Verlaufstyp', linear: 'Linear', radial: 'Radial', conic: 'Konisch',
    angle: 'Winkel', shape: 'Form', circle: 'Kreis', ellipse: 'Ellipse',
    colors: 'Farbstopps', addColor: 'Farbe hinzufuegen', remove: 'Entfernen', position: 'Position',
    preview: 'Vorschau', cssOutput: 'CSS Ausgabe', randomize: 'Zufaellig', reset: 'Zuruecksetzen', presets: 'Voreinstellungen',
    introTitle: 'Kostenloser CSS Farbverlauf Generator', introText: 'Erstellen Sie visuell CSS-Farbverlaeufe mit linearen, radialen und konischen Typen.',
    tipTitle: 'CSS Farbverlauf Tipps',
    tip1: 'Verwenden Sie mindestens 2-3 Farbstopps', tip2: 'Lineare Verlaeufe eignen sich fuer Hintergruende',
    tip3: 'Radiale Verlaeufe erzeugen Leuchteffekte', tip4: 'Konische Verlaeufe eignen sich fuer Kreisdiagramme',
    tip5: 'Fuegen Sie immer eine background-color als Fallback hinzu',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein CSS Farbverlauf?', faq1a: 'Ein CSS Farbverlauf ist ein fliessender Uebergang zwischen zwei oder mehr Farben, der vom Browser ohne Bilder gerendert wird.',
    faq2q: 'Unterschied linear, radial und konisch?', faq2a: 'Linear folgt einer geraden Linie, radial strahlt von einem Mittelpunkt aus, konisch dreht sich um einen Mittelpunkt.',
    faq3q: 'Wie verwende ich das generierte CSS?', faq3a: 'Kopieren Sie die CSS-Ausgabe und fuegen Sie sie als background-Eigenschaft ein.',
    faq4q: 'Kann man mehrere Farbstopps verwenden?', faq4a: 'Ja, Sie koennen beliebig viele Farbstopps mit bestimmten Positionen hinzufuegen.',
    faq5q: 'Unterstuetzen alle Browser CSS-Verlaeufe?', faq5a: 'Lineare und radiale Verlaeufe werden von allen modernen Browsern unterstuetzt. Konische funktionieren in aktuellen Versionen.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Degradados CSS',
    description: 'Cree degradados CSS con un editor visual. Soporta degradados lineales, radiales y conicos.',
    type: 'Tipo de degradado', linear: 'Lineal', radial: 'Radial', conic: 'Conico',
    angle: 'Angulo', shape: 'Forma', circle: 'Circulo', ellipse: 'Elipse',
    colors: 'Paradas de color', addColor: 'Agregar color', remove: 'Eliminar', position: 'Posicion',
    preview: 'Vista previa', cssOutput: 'Salida CSS', randomize: 'Aleatorio', reset: 'Reiniciar', presets: 'Predefinidos',
    introTitle: 'Generador de degradados CSS gratuito', introText: 'Disene degradados CSS visualmente con tipos lineales, radiales y conicos.',
    tipTitle: 'Consejos para degradados CSS',
    tip1: 'Use al menos 2-3 paradas de color', tip2: 'Los degradados lineales funcionan bien para fondos',
    tip3: 'Los degradados radiales crean efectos de brillo', tip4: 'Los degradados conicos son ideales para graficos circulares',
    tip5: 'Incluya siempre un background-color de respaldo',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es un degradado CSS?', faq1a: 'Un degradado CSS es una transicion suave entre dos o mas colores renderizada por el navegador sin usar imagenes.',
    faq2q: 'Diferencia entre lineal, radial y conico?', faq2a: 'Lineal sigue una linea recta, radial emana desde un punto central, conico gira alrededor de un punto central.',
    faq3q: 'Como uso el CSS generado?', faq3a: 'Copie la salida CSS y peguela como propiedad background de cualquier elemento HTML.',
    faq4q: 'Se pueden usar multiples paradas de color?', faq4a: 'Si, puede agregar tantas paradas como desee con posiciones especificas.',
    faq5q: 'Todos los navegadores soportan degradados CSS?', faq5a: 'Los degradados lineales y radiales son soportados por todos los navegadores modernos. Los conicos funcionan en versiones recientes.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'CSS グラデーションジェネレーター',
    description: 'ビジュアルエディターで CSS グラデーションを作成。線形、放射、円錐グラデーションに対応。',
    type: 'グラデーションタイプ', linear: '線形', radial: '放射', conic: '円錐',
    angle: '角度', shape: '形状', circle: '円', ellipse: '楕円',
    colors: 'カラーストップ', addColor: '色を追加', remove: '削除', position: '位置',
    preview: 'プレビュー', cssOutput: 'CSS 出力', randomize: 'ランダム', reset: 'リセット', presets: 'プリセット',
    introTitle: '無料 CSS グラデーションジェネレーター', introText: '線形、放射、円錐グラデーションを視覚的にデザインし、CSS コードを即座に取得できます。',
    tipTitle: 'CSS グラデーションのコツ',
    tip1: '滑らかなグラデーションには 2-3 個のカラーストップを使用', tip2: '線形グラデーションは背景に最適',
    tip3: '放射グラデーションは光のエフェクトに', tip4: '円錐グラデーションは円グラフに最適',
    tip5: '常に background-color のフォールバックを含める',
    faqTitle: 'よくある質問',
    faq1q: 'CSS グラデーションとは？', faq1a: 'CSS グラデーションは、画像を使わずにブラウザがレンダリングする 2 色以上のスムーズな遷移です。',
    faq2q: '線形、放射、円錐の違いは？', faq2a: '線形は直線方向、放射は中心点から外側、円錐は中心点を回転します。',
    faq3q: '生成した CSS の使い方は？', faq3a: 'CSS 出力をコピーして HTML 要素の background プロパティとして貼り付けてください。',
    faq4q: '複数のカラーストップを使えますか？', faq4a: 'はい、任意の数のカラーストップを特定の位置に追加できます。',
    faq5q: 'すべてのブラウザで対応していますか？', faq5a: '線形と放射はすべてのモダンブラウザで対応。円錐も最新バージョンで動作します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'CSS 그라데이션 생성기',
    description: '비주얼 에디터로 CSS 그라데이션을 만드세요. 선형, 방사형, 원뿔형 그라데이션 지원.',
    type: '그라데이션 유형', linear: '선형', radial: '방사형', conic: '원뿔형',
    angle: '각도', shape: '모양', circle: '원', ellipse: '타원',
    colors: '색상 정지점', addColor: '색상 추가', remove: '제거', position: '위치',
    preview: '미리보기', cssOutput: 'CSS 출력', randomize: '무작위', reset: '초기화', presets: '프리셋',
    introTitle: '무료 CSS 그라데이션 생성기', introText: '선형, 방사형, 원뿔형 그라데이션을 시각적으로 디자인하고 CSS 코드를 즉시 얻으세요.',
    tipTitle: 'CSS 그라데이션 팁',
    tip1: '부드러운 효과를 위해 2-3개의 색상 정지점 사용', tip2: '선형 그라데이션은 배경에 적합',
    tip3: '방사형 그라데이션은 빛 효과 생성', tip4: '원뿔형 그라데이션은 원형 차트에 적합',
    tip5: '항상 background-color 대체값 포함',
    faqTitle: '자주 묻는 질문',
    faq1q: 'CSS 그라데이션이란?', faq1a: 'CSS 그라데이션은 이미지 없이 브라우저가 렌더링하는 2개 이상의 색상 간 부드러운 전환입니다.',
    faq2q: '선형, 방사형, 원뿔형의 차이점은?', faq2a: '선형은 직선 방향, 방사형은 중심에서 외부로, 원뿔형은 중심을 회전합니다.',
    faq3q: '생성된 CSS 사용법은?', faq3a: 'CSS 출력을 복사하여 HTML 요소의 background 속성으로 붙여넣으세요.',
    faq4q: '여러 색상 정지점을 사용할 수 있나요?', faq4a: '네, 원하는 만큼 특정 위치에 색상 정지점을 추가할 수 있습니다.',
    faq5q: '모든 브라우저에서 지원되나요?', faq5a: '선형과 방사형은 모든 모던 브라우저에서 지원됩니다. 원뿔형도 최신 버전에서 작동합니다.',
    relatedTitle: '관련 도구',
  },
  pt: {
    title: 'Gerador de Gradientes CSS',
    description: 'Crie gradientes CSS com um editor visual. Suporta gradientes lineares, radiais e conicos.',
    type: 'Tipo de gradiente', linear: 'Linear', radial: 'Radial', conic: 'Conico',
    angle: 'Angulo', shape: 'Forma', circle: 'Circulo', ellipse: 'Elipse',
    colors: 'Paradas de cor', addColor: 'Adicionar cor', remove: 'Remover', position: 'Posicao',
    preview: 'Pre-visualizacao', cssOutput: 'Saida CSS', randomize: 'Aleatorio', reset: 'Reiniciar', presets: 'Predefinidos',
    introTitle: 'Gerador de gradientes CSS gratis', introText: 'Projete gradientes CSS visualmente com tipos lineares, radiais e conicos.',
    tipTitle: 'Dicas de gradientes CSS',
    tip1: 'Use pelo menos 2-3 paradas de cor', tip2: 'Gradientes lineares sao otimos para fundos',
    tip3: 'Gradientes radiais criam efeitos de brilho', tip4: 'Gradientes conicos sao ideais para graficos circulares',
    tip5: 'Inclua sempre um background-color como fallback',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e um gradiente CSS?', faq1a: 'Um gradiente CSS e uma transicao suave entre duas ou mais cores renderizada pelo navegador sem usar imagens.',
    faq2q: 'Diferenca entre linear, radial e conico?', faq2a: 'Linear segue uma linha reta, radial emana de um ponto central, conico gira ao redor de um ponto central.',
    faq3q: 'Como uso o CSS gerado?', faq3a: 'Copie a saida CSS e cole como propriedade background de qualquer elemento HTML.',
    faq4q: 'Posso usar multiplas paradas de cor?', faq4a: 'Sim, voce pode adicionar quantas paradas desejar com posicoes especificas.',
    faq5q: 'Todos os navegadores suportam gradientes CSS?', faq5a: 'Gradientes lineares e radiais sao suportados por todos os navegadores modernos. Conicos funcionam em versoes recentes.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Generatore di Gradienti CSS',
    description: 'Crea gradienti CSS con un editor visuale. Supporta gradienti lineari, radiali e conici.',
    type: 'Tipo di gradiente', linear: 'Lineare', radial: 'Radiale', conic: 'Conico',
    angle: 'Angolo', shape: 'Forma', circle: 'Cerchio', ellipse: 'Ellisse',
    colors: 'Fermate colore', addColor: 'Aggiungi colore', remove: 'Rimuovi', position: 'Posizione',
    preview: 'Anteprima', cssOutput: 'Uscita CSS', randomize: 'Casuale', reset: 'Ripristina', presets: 'Predefiniti',
    introTitle: 'Generatore gradienti CSS gratuito', introText: 'Progetta visivamente gradienti CSS con tipi lineari, radiali e conici.',
    tipTitle: 'Consigli per i gradienti CSS',
    tip1: 'Usa almeno 2-3 fermate colore', tip2: 'I gradienti lineari sono ottimi per gli sfondi',
    tip3: 'I gradienti radiali creano effetti luminosi', tip4: 'I gradienti conici sono ideali per grafici a torta',
    tip5: 'Includi sempre un background-color come fallback',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e un gradiente CSS?', faq1a: 'Un gradiente CSS e una transizione fluida tra due o piu colori renderizzata dal browser senza usare immagini.',
    faq2q: 'Differenza tra lineare, radiale e conico?', faq2a: 'Lineare segue una linea retta, radiale emana da un punto centrale, conico ruota attorno a un punto centrale.',
    faq3q: 'Come uso il CSS generato?', faq3a: 'Copia l\'uscita CSS e incollala come proprieta background di qualsiasi elemento HTML.',
    faq4q: 'Posso usare piu fermate colore?', faq4a: 'Si, puoi aggiungere quante fermate desideri con posizioni specifiche.',
    faq5q: 'Tutti i browser supportano i gradienti CSS?', faq5a: 'Gradienti lineari e radiali sono supportati da tutti i browser moderni. I conici funzionano nelle versioni recenti.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'CSS Gradient Generator',
    description: 'Maak CSS-gradients met een visuele editor. Ondersteunt lineaire, radiale en conische gradients.',
    type: 'Gradienttype', linear: 'Lineair', radial: 'Radiaal', conic: 'Conisch',
    angle: 'Hoek', shape: 'Vorm', circle: 'Cirkel', ellipse: 'Ellips',
    colors: 'Kleurstops', addColor: 'Kleur toevoegen', remove: 'Verwijderen', position: 'Positie',
    preview: 'Voorbeeld', cssOutput: 'CSS Uitvoer', randomize: 'Willekeurig', reset: 'Reset', presets: 'Voorinstellingen',
    introTitle: 'Gratis CSS Gradient Generator', introText: 'Ontwerp visueel CSS-gradients met lineaire, radiale en conische typen.',
    tipTitle: 'CSS Gradient Tips',
    tip1: 'Gebruik minstens 2-3 kleurstops', tip2: 'Lineaire gradients zijn geweldig voor achtergronden',
    tip3: 'Radiale gradients creeren glanseffecten', tip4: 'Conische gradients zijn ideaal voor cirkeldiagrammen',
    tip5: 'Voeg altijd een background-color fallback toe',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is een CSS gradient?', faq1a: 'Een CSS gradient is een vloeiende overgang tussen twee of meer kleuren, gerenderd door de browser zonder afbeeldingen.',
    faq2q: 'Verschil lineair, radiaal en conisch?', faq2a: 'Lineair volgt een rechte lijn, radiaal straalt uit vanuit een middelpunt, conisch draait rond een middelpunt.',
    faq3q: 'Hoe gebruik ik de gegenereerde CSS?', faq3a: 'Kopieer de CSS-uitvoer en plak deze als background-eigenschap van elk HTML-element.',
    faq4q: 'Kan ik meerdere kleurstops gebruiken?', faq4a: 'Ja, u kunt zoveel kleurstops toevoegen als u wilt met specifieke posities.',
    faq5q: 'Ondersteunen alle browsers CSS gradients?', faq5a: 'Lineaire en radiale gradients worden ondersteund door alle moderne browsers. Conische werken in recente versies.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Generator Gradientow CSS',
    description: 'Tworzenie gradientow CSS z edytorem wizualnym. Obsluguje gradienty liniowe, radialne i stozkowe.',
    type: 'Typ gradientu', linear: 'Liniowy', radial: 'Radialny', conic: 'Stozkowy',
    angle: 'Kat', shape: 'Ksztalt', circle: 'Kolo', ellipse: 'Elipsa',
    colors: 'Punkty kolorystyczne', addColor: 'Dodaj kolor', remove: 'Usun', position: 'Pozycja',
    preview: 'Podglad', cssOutput: 'Wyjscie CSS', randomize: 'Losowy', reset: 'Reset', presets: 'Predefiniowane',
    introTitle: 'Darmowy generator gradientow CSS', introText: 'Projektuj wizualnie gradienty CSS z typami liniowymi, radialnymi i stozkowymi.',
    tipTitle: 'Wskazowki dotyczace gradientow CSS',
    tip1: 'Uzyj co najmniej 2-3 punktow kolorystycznych', tip2: 'Gradienty liniowe sa swietne na tla',
    tip3: 'Gradienty radialne tworza efekty swietlne', tip4: 'Gradienty stozkowe sa idealne do wykresow kolowych',
    tip5: 'Zawsze dolacz background-color jako fallback',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym jest gradient CSS?', faq1a: 'Gradient CSS to plynne przejscie miedzy dwoma lub wiecej kolorami renderowane przez przegladarke bez uzycia obrazow.',
    faq2q: 'Roznica miedzy liniowym, radialnym a stozkowym?', faq2a: 'Liniowy podaza linia prosta, radialny emanuje z punktu centralnego, stozkowy obraca sie wokol punktu.',
    faq3q: 'Jak uzyc wygenerowanego CSS?', faq3a: 'Skopiuj wyjscie CSS i wklej jako wlasciwosc background dowolnego elementu HTML.',
    faq4q: 'Czy moge uzyc wielu punktow kolorystycznych?', faq4a: 'Tak, mozesz dodac dowolna liczbe punktow z okreslonymi pozycjami.',
    faq5q: 'Czy wszystkie przegladarki obsluguja gradienty CSS?', faq5a: 'Gradienty liniowe i radialne sa obslugiwane przez wszystkie nowoczesne przegladarki. Stozkowe dzialaja w najnowszych wersjach.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'CSS Gradient Generator',
    description: 'Skapa CSS-gradienter med en visuell editor. Stoeder lineaera, radiella och koniska gradienter.',
    type: 'Gradienttyp', linear: 'Lineaer', radial: 'Radiell', conic: 'Konisk',
    angle: 'Vinkel', shape: 'Form', circle: 'Cirkel', ellipse: 'Ellips',
    colors: 'Faergstop', addColor: 'Laegg till faerg', remove: 'Ta bort', position: 'Position',
    preview: 'Foerhandsvisning', cssOutput: 'CSS Utdata', randomize: 'Slumpa', reset: 'Aterstaell', presets: 'Foerval',
    introTitle: 'Gratis CSS Gradient Generator', introText: 'Designa CSS-gradienter visuellt med lineaera, radiella och koniska typer.',
    tipTitle: 'CSS Gradient Tips',
    tip1: 'Anvaend minst 2-3 faergstop', tip2: 'Lineaera gradienter aer bra foer bakgrunder',
    tip3: 'Radiella gradienter skapar ljuseffekter', tip4: 'Koniska gradienter aer perfekta foer cirkeldiagram',
    tip5: 'Inkludera alltid en background-color som fallback',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer en CSS gradient?', faq1a: 'En CSS gradient aer en mjuk oevergaang mellan tvaa eller fler faerger som renderas av webblaesaren utan bilder.',
    faq2q: 'Skillnad mellan lineaer, radiell och konisk?', faq2a: 'Lineaer foeljer en raet linje, radiell straaalar fraan en mittpunkt, konisk roterar runt en mittpunkt.',
    faq3q: 'Hur anvaender jag den genererade CSS:en?', faq3a: 'Kopiera CSS-utdata och klistra in som background-egenskap paa valfritt HTML-element.',
    faq4q: 'Kan jag anvaenda flera faergstop?', faq4a: 'Ja, du kan laegga till saa maanga faergstop du vill med specifika positioner.',
    faq5q: 'Stoeder alla webblaesare CSS gradienter?', faq5a: 'Lineaera och radiella gradienter stoeds av alla moderna webblaesare. Koniska fungerar i senaste versionerna.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'CSS Gradient Generator',
    description: 'Lag CSS-gradienter med en visuell editor. Stoetter lineaere, radielle og koniske gradienter.',
    type: 'Gradienttype', linear: 'Lineaer', radial: 'Radiell', conic: 'Konisk',
    angle: 'Vinkel', shape: 'Form', circle: 'Sirkel', ellipse: 'Ellipse',
    colors: 'Fargestopp', addColor: 'Legg til farge', remove: 'Fjern', position: 'Posisjon',
    preview: 'Foerhandsvisning', cssOutput: 'CSS Utdata', randomize: 'Tilfeldig', reset: 'Tilbakestill', presets: 'Forhåndsvalg',
    introTitle: 'Gratis CSS Gradient Generator', introText: 'Design CSS-gradienter visuelt med lineaere, radielle og koniske typer.',
    tipTitle: 'CSS Gradient Tips',
    tip1: 'Bruk minst 2-3 fargestopp', tip2: 'Lineaere gradienter er flotte for bakgrunner',
    tip3: 'Radielle gradienter skaper lyseffekter', tip4: 'Koniske gradienter er perfekte for sektordiagram',
    tip5: 'Inkluder alltid en background-color som fallback',
    faqTitle: 'Vanlige spoersmaal',
    faq1q: 'Hva er en CSS gradient?', faq1a: 'En CSS gradient er en myk overgang mellom to eller flere farger som renderes av nettleseren uten bilder.',
    faq2q: 'Forskjell mellom lineaer, radiell og konisk?', faq2a: 'Lineaer foelger en rett linje, radiell straaaler fra et midtpunkt, konisk roterer rundt et midtpunkt.',
    faq3q: 'Hvordan bruker jeg den genererte CSS-en?', faq3a: 'Kopier CSS-utdata og lim inn som background-egenskap paa et HTML-element.',
    faq4q: 'Kan jeg bruke flere fargestopp?', faq4a: 'Ja, du kan legge til saa mange fargestopp du vil med spesifikke posisjoner.',
    faq5q: 'Stoetter alle nettlesere CSS gradienter?', faq5a: 'Lineaere og radielle gradienter stoettes av alle moderne nettlesere. Koniske fungerer i nyeste versjoner.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Generator Gradien CSS',
    description: 'Buat gradien CSS dengan editor visual. Mendukung gradien linear, radial, dan kerucut.',
    type: 'Jenis Gradien', linear: 'Linear', radial: 'Radial', conic: 'Kerucut',
    angle: 'Sudut', shape: 'Bentuk', circle: 'Lingkaran', ellipse: 'Elips',
    colors: 'Titik Warna', addColor: 'Tambah Warna', remove: 'Hapus', position: 'Posisi',
    preview: 'Pratinjau', cssOutput: 'Output CSS', randomize: 'Acak', reset: 'Reset', presets: 'Preset',
    introTitle: 'Generator Gradien CSS Gratis', introText: 'Desain gradien CSS secara visual dengan tipe linear, radial, dan kerucut.',
    tipTitle: 'Tips Gradien CSS',
    tip1: 'Gunakan minimal 2-3 titik warna', tip2: 'Gradien linear cocok untuk latar belakang',
    tip3: 'Gradien radial menciptakan efek cahaya', tip4: 'Gradien kerucut ideal untuk diagram lingkaran',
    tip5: 'Selalu sertakan background-color sebagai fallback',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Apa itu gradien CSS?', faq1a: 'Gradien CSS adalah transisi halus antara dua atau lebih warna yang dirender oleh browser tanpa menggunakan gambar.',
    faq2q: 'Perbedaan linear, radial, dan kerucut?', faq2a: 'Linear mengikuti garis lurus, radial memancar dari titik pusat, kerucut berputar mengelilingi titik pusat.',
    faq3q: 'Bagaimana cara menggunakan CSS yang dihasilkan?', faq3a: 'Salin output CSS dan tempel sebagai properti background elemen HTML apa pun.',
    faq4q: 'Bisakah menggunakan banyak titik warna?', faq4a: 'Ya, Anda dapat menambahkan sebanyak mungkin titik warna dengan posisi tertentu.',
    faq5q: 'Apakah semua browser mendukung gradien CSS?', faq5a: 'Gradien linear dan radial didukung oleh semua browser modern. Kerucut bekerja di versi terbaru.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวสร้างไล่ระดับสี CSS',
    description: 'สร้างไล่ระดับสี CSS ด้วยตัวแก้ไขแบบเห็นภาพ รองรับแบบเชิงเส้น รัศมี และกรวย',
    type: 'ประเภทไล่ระดับ', linear: 'เชิงเส้น', radial: 'รัศมี', conic: 'กรวย',
    angle: 'มุม', shape: 'รูปร่าง', circle: 'วงกลม', ellipse: 'วงรี',
    colors: 'จุดหยุดสี', addColor: 'เพิ่มสี', remove: 'ลบ', position: 'ตำแหน่ง',
    preview: 'ดูตัวอย่าง', cssOutput: 'ผลลัพธ์ CSS', randomize: 'สุ่ม', reset: 'รีเซ็ต', presets: 'พรีเซ็ต',
    introTitle: 'ตัวสร้างไล่ระดับสี CSS ฟรี', introText: 'ออกแบบไล่ระดับสี CSS แบบเห็นภาพ รองรับแบบเชิงเส้น รัศมี และกรวย',
    tipTitle: 'เคล็ดลับไล่ระดับสี CSS',
    tip1: 'ใช้จุดหยุดสีอย่างน้อย 2-3 จุด', tip2: 'แบบเชิงเส้นเหมาะสำหรับพื้นหลัง',
    tip3: 'แบบรัศมีสร้างเอฟเฟกต์แสง', tip4: 'แบบกรวยเหมาะสำหรับแผนภูมิวงกลม',
    tip5: 'ใส่ background-color สำรองเสมอ',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'ไล่ระดับสี CSS คืออะไร?', faq1a: 'ไล่ระดับสี CSS คือการเปลี่ยนสีที่ราบรื่นระหว่างสองสีขึ้นไปที่เบราว์เซอร์เรนเดอร์โดยไม่ใช้ภาพ',
    faq2q: 'ความแตกต่างระหว่างเชิงเส้น รัศมี และกรวย?', faq2a: 'เชิงเส้นตามเส้นตรง รัศมีแผ่จากจุดศูนย์กลาง กรวยหมุนรอบจุดศูนย์กลาง',
    faq3q: 'ใช้ CSS ที่สร้างขึ้นอย่างไร?', faq3a: 'คัดลอก CSS output และวางเป็นคุณสมบัติ background ขององค์ประกอบ HTML ใดก็ได้',
    faq4q: 'ใช้จุดหยุดสีหลายจุดได้ไหม?', faq4a: 'ได้ คุณสามารถเพิ่มจุดหยุดสีได้มากเท่าที่ต้องการพร้อมตำแหน่งที่กำหนด',
    faq5q: 'เบราว์เซอร์ทั้งหมดรองรับไล่ระดับสี CSS หรือไม่?', faq5a: 'แบบเชิงเส้นและรัศมีรองรับโดยเบราว์เซอร์ที่ทันสมัยทั้งหมด แบบกรวยใช้ได้ในเวอร์ชันล่าสุด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface ColorStop {
  color: string;
  position: number;
}

const PRESETS: { name: string; type: string; angle: number; colors: ColorStop[] }[] = [
  { name: 'Sunset', type: 'linear', angle: 135, colors: [{ color: '#ff6b6b', position: 0 }, { color: '#feca57', position: 50 }, { color: '#ff9ff3', position: 100 }] },
  { name: 'Ocean', type: 'linear', angle: 90, colors: [{ color: '#0052D4', position: 0 }, { color: '#65C7F7', position: 50 }, { color: '#9CECFB', position: 100 }] },
  { name: 'Forest', type: 'linear', angle: 45, colors: [{ color: '#134E5E', position: 0 }, { color: '#71B280', position: 100 }] },
  { name: 'Purple Haze', type: 'radial', angle: 0, colors: [{ color: '#7303c0', position: 0 }, { color: '#ec38bc', position: 50 }, { color: '#fdeff9', position: 100 }] },
  { name: 'Rainbow', type: 'conic', angle: 0, colors: [{ color: '#ff0000', position: 0 }, { color: '#ff8800', position: 17 }, { color: '#ffff00', position: 33 }, { color: '#00ff00', position: 50 }, { color: '#0000ff', position: 67 }, { color: '#8800ff', position: 83 }, { color: '#ff0000', position: 100 }] },
];

function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export default function CssGradientGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [shape, setShape] = useState('circle');
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 },
  ]);

  const buildCSS = useCallback(() => {
    const stops = colorStops.map(s => `${s.color} ${s.position}%`).join(', ');
    if (gradientType === 'linear') return `linear-gradient(${angle}deg, ${stops})`;
    if (gradientType === 'radial') return `radial-gradient(${shape}, ${stops})`;
    return `conic-gradient(from ${angle}deg, ${stops})`;
  }, [gradientType, angle, shape, colorStops]);

  const cssValue = buildCSS();
  const cssCode = `background: ${cssValue};`;

  const updateColor = (index: number, color: string) => {
    const newStops = [...colorStops];
    newStops[index] = { ...newStops[index], color };
    setColorStops(newStops);
  };

  const updatePosition = (index: number, position: number) => {
    const newStops = [...colorStops];
    newStops[index] = { ...newStops[index], position };
    setColorStops(newStops);
  };

  const addColor = () => {
    setColorStops([...colorStops, { color: randomColor(), position: 50 }]);
  };

  const removeColor = (index: number) => {
    if (colorStops.length <= 2) return;
    setColorStops(colorStops.filter((_, i) => i !== index));
  };

  const handleRandomize = () => {
    const count = 2 + Math.floor(Math.random() * 3);
    const newStops: ColorStop[] = [];
    for (let i = 0; i < count; i++) {
      newStops.push({ color: randomColor(), position: Math.round((i / (count - 1)) * 100) });
    }
    setColorStops(newStops);
    setAngle(Math.floor(Math.random() * 360));
  };

  const handleReset = () => {
    setGradientType('linear');
    setAngle(90);
    setShape('circle');
    setColorStops([{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }]);
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    setColorStops([...preset.colors]);
  };

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
    <ToolLayout title={t.title} description={t.description} toolId="css-gradient-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Gradient Type Selection */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginRight: 4 }}>{t.type}:</label>
        {(['linear', 'radial', 'conic'] as const).map(tp => (
          <button key={tp} onClick={() => setGradientType(tp)}
            className={gradientType === tp ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ fontSize: 12, padding: '6px 14px' }}>
            {t[tp]}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={handleRandomize} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.randomize}</button>
          <button onClick={handleReset} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.reset}</button>
        </div>
      </div>

      {/* Angle / Shape control */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        {(gradientType === 'linear' || gradientType === 'conic') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.angle}:</label>
            <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))} style={{ width: 120 }} />
            <span style={{ fontSize: 13, fontFamily: 'monospace', minWidth: 40 }}>{angle}deg</span>
          </div>
        )}
        {gradientType === 'radial' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.shape}:</label>
            <select value={shape} onChange={e => setShape(e.target.value)} style={{ padding: '4px 8px', fontSize: 12 }}>
              <option value="circle">{t.circle}</option>
              <option value="ellipse">{t.ellipse}</option>
            </select>
          </div>
        )}
      </div>

      {/* Color Stops */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.colors}</label>
          <button onClick={addColor} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.addColor}</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {colorStops.map((stop, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '8px 12px' }}>
              <input
                type="color"
                value={stop.color}
                onChange={e => updateColor(idx, e.target.value)}
                style={{ width: 36, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }}
              />
              <input
                type="text"
                value={stop.color}
                onChange={e => updateColor(idx, e.target.value)}
                style={{ width: 90, fontFamily: 'monospace', fontSize: 13, padding: '4px 8px' }}
              />
              <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.position}:</label>
              <input
                type="range" min={0} max={100} value={stop.position}
                onChange={e => updatePosition(idx, Number(e.target.value))}
                style={{ width: 100 }}
              />
              <span style={{ fontSize: 12, fontFamily: 'monospace', minWidth: 30 }}>{stop.position}%</span>
              {colorStops.length > 2 && (
                <button onClick={() => removeColor(idx)} className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px', color: 'var(--accent-rose)' }}>{t.remove}</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.preview}</label>
        <div style={{
          height: 200,
          borderRadius: 10,
          border: '1px solid var(--border-color)',
          background: cssValue,
        }} />
      </div>

      {/* CSS Output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.cssOutput}</label>
          <CopyButton text={cssCode} />
        </div>
        <textarea value={cssCode} readOnly style={{ minHeight: 60, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      {/* Presets */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.presets}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PRESETS.map((preset, idx) => {
            const stops = preset.colors.map(s => `${s.color} ${s.position}%`).join(', ');
            const bg = preset.type === 'linear' ? `linear-gradient(${preset.angle}deg, ${stops})`
              : preset.type === 'radial' ? `radial-gradient(circle, ${stops})`
              : `conic-gradient(from ${preset.angle}deg, ${stops})`;
            return (
              <button key={idx} onClick={() => applyPreset(preset)}
                style={{
                  width: 80, height: 50, borderRadius: 8, border: '1px solid var(--border-color)',
                  background: bg, cursor: 'pointer', position: 'relative', overflow: 'hidden',
                }}>
                <span style={{
                  position: 'absolute', bottom: 2, left: 0, right: 0,
                  fontSize: 10, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.7)', textAlign: 'center',
                }}>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEO Content */}
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
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/css-grid-generator`, label: 'CSS Grid Generator' },
            { href: `/${lang}/tools/css-flexbox-generator`, label: 'CSS Flexbox Generator' },
            { href: `/${lang}/tools/box-shadow`, label: 'Box Shadow Generator' },
            { href: `/${lang}/tools/color-converter`, label: 'Color Converter' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
