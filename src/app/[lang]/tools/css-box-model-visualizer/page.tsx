'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Box Model Visualizer',
    description: 'Interactive CSS box model visualizer. Adjust margin, border, padding, and content dimensions to understand and generate CSS box model code.',
    margin: 'Margin',
    border: 'Border',
    padding: 'Padding',
    content: 'Content',
    width: 'Width',
    height: 'Height',
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left',
    borderWidth: 'Border Width',
    borderStyle: 'Border Style',
    borderColor: 'Border Color',
    borderRadius: 'Border Radius',
    bgColor: 'Background',
    boxSizing: 'Box Sizing',
    contentBox: 'content-box',
    borderBox: 'border-box',
    cssOutput: 'CSS Output',
    totalSize: 'Total Size',
    reset: 'Reset',
    introTitle: 'Free CSS Box Model Visualizer',
    introText: 'This interactive CSS box model visualizer helps you understand and experiment with the CSS box model. Adjust margin, border, padding, and content dimensions to see how they affect the total element size. Generate ready-to-use CSS code instantly.',
    howTitle: 'How to Use the Box Model Visualizer',
    step1: 'Set the content width and height using the input fields',
    step2: 'Adjust padding values (top, right, bottom, left) to add inner spacing',
    step3: 'Set border width, style, color, and border-radius',
    step4: 'Adjust margin values to add outer spacing and copy the generated CSS',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the CSS box model?',
    faq1a: 'The CSS box model describes the rectangular boxes generated for elements. Every element has four areas: content (the actual content), padding (space between content and border), border (the border around padding), and margin (space outside the border). Understanding the box model is fundamental to CSS layout.',
    faq2q: 'What is the difference between content-box and border-box?',
    faq2a: 'With content-box (default), width and height apply only to the content area. Padding and border are added on top, making the total size larger. With border-box, width and height include padding and border, so the total size equals the specified dimensions. Most developers prefer border-box for predictable sizing.',
    faq3q: 'How is the total element size calculated?',
    faq3a: 'For content-box: total width = content width + left padding + right padding + left border + right border + left margin + right margin. For border-box: total width = specified width + left margin + right margin (padding and border are included in the specified width).',
    faq4q: 'Can I use different values for each side?',
    faq4a: 'Yes, CSS allows you to set different values for top, right, bottom, and left for margin, padding, and border-width. This visualizer supports individual side values for complete control over your layout.',
    faq5q: 'What border styles are available?',
    faq5a: 'CSS supports several border styles: solid, dashed, dotted, double, groove, ridge, inset, outset, and none. The most commonly used styles are solid, dashed, and dotted. Each style creates a different visual appearance for the border.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS 盒模型可视化工具',
    description: '交互式 CSS 盒模型可视化工具。调整外边距、边框、内边距和内容尺寸，理解并生成 CSS 盒模型代码。',
    margin: '外边距',
    border: '边框',
    padding: '内边距',
    content: '内容',
    width: '宽度',
    height: '高度',
    top: '上',
    right: '右',
    bottom: '下',
    left: '左',
    borderWidth: '边框宽度',
    borderStyle: '边框样式',
    borderColor: '边框颜色',
    borderRadius: '圆角',
    bgColor: '背景色',
    boxSizing: '盒模型类型',
    contentBox: 'content-box',
    borderBox: 'border-box',
    cssOutput: 'CSS 输出',
    totalSize: '总尺寸',
    reset: '重置',
    introTitle: '免费 CSS 盒模型可视化工具',
    introText: '这个交互式 CSS 盒模型可视化工具帮助你理解和实验 CSS 盒模型。调整外边距、边框、内边距和内容尺寸，查看它们如何影响元素总大小。即时生成可用的 CSS 代码。',
    howTitle: '如何使用盒模型可视化工具',
    step1: '使用输入框设置内容宽度和高度',
    step2: '调整内边距值（上、右、下、左）添加内部间距',
    step3: '设置边框宽度、样式、颜色和圆角',
    step4: '调整外边距值添加外部间距，复制生成的 CSS',
    faqTitle: '常见问题',
    faq1q: '什么是 CSS 盒模型？',
    faq1a: 'CSS 盒模型描述了为元素生成的矩形框。每个元素有四个区域：内容、内边距（内容和边框之间的空间）、边框和外边距（边框外的空间）。理解盒模型是 CSS 布局的基础。',
    faq2q: 'content-box 和 border-box 有什么区别？',
    faq2a: 'content-box（默认）中，宽度和高度只应用于内容区域，内边距和边框会额外增加。border-box 中，宽度和高度包含内边距和边框。大多数开发者更喜欢 border-box。',
    faq3q: '如何计算元素总大小？',
    faq3a: 'content-box：总宽度 = 内容宽度 + 左内边距 + 右内边距 + 左边框 + 右边框 + 左外边距 + 右外边距。border-box：总宽度 = 指定宽度 + 左外边距 + 右外边距。',
    faq4q: '可以为每边设置不同的值吗？',
    faq4a: '可以，CSS 允许为外边距、内边距和边框宽度分别设置上、右、下、左的值。本工具支持各边单独设置。',
    faq5q: '有哪些边框样式？',
    faq5a: 'CSS 支持多种边框样式：solid、dashed、dotted、double、groove、ridge、inset、outset 和 none。最常用的是 solid、dashed 和 dotted。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'CSS ボックスモデル ビジュアライザー',
    description: 'インタラクティブなCSSボックスモデルビジュアライザー。マージン、ボーダー、パディング、コンテンツの寸法を調整。',
    margin: 'マージン', border: 'ボーダー', padding: 'パディング', content: 'コンテンツ',
    width: '幅', height: '高さ', top: '上', right: '右', bottom: '下', left: '左',
    borderWidth: 'ボーダー幅', borderStyle: 'ボーダースタイル', borderColor: 'ボーダー色', borderRadius: 'ボーダー半径',
    bgColor: '背景色', boxSizing: 'ボックスサイジング', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS出力', totalSize: '合計サイズ', reset: 'リセット',
    introTitle: '無料CSSボックスモデルビジュアライザー',
    introText: 'このインタラクティブなCSSボックスモデルビジュアライザーで、マージン、ボーダー、パディング、コンテンツの寸法を調整し、要素の合計サイズへの影響を確認できます。',
    howTitle: 'ボックスモデルビジュアライザーの使い方',
    step1: '入力フィールドでコンテンツの幅と高さを設定', step2: 'パディング値を調整して内側の余白を追加',
    step3: 'ボーダーの幅、スタイル、色、半径を設定', step4: 'マージン値を調整して外側の余白を追加し、CSSをコピー',
    faqTitle: 'よくある質問',
    faq1q: 'CSSボックスモデルとは？', faq1a: 'CSSボックスモデルは要素の矩形ボックスを記述します。各要素にはコンテンツ、パディング、ボーダー、マージンの4つの領域があります。',
    faq2q: 'content-boxとborder-boxの違いは？', faq2a: 'content-box（デフォルト）では幅と高さはコンテンツのみに適用。border-boxではパディングとボーダーを含みます。',
    faq3q: '要素の合計サイズの計算方法は？', faq3a: 'content-box: 合計幅 = コンテンツ幅 + パディング左右 + ボーダー左右 + マージン左右。border-box: 合計幅 = 指定幅 + マージン左右。',
    faq4q: '各辺に異なる値を設定できますか？', faq4a: 'はい、マージン、パディング、ボーダー幅で上下左右に個別の値を設定できます。',
    faq5q: 'どのボーダースタイルが利用可能？', faq5a: 'solid、dashed、dotted、double、groove、ridge、inset、outset、noneが利用可能です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'CSS 박스 모델 시각화 도구',
    description: '인터랙티브 CSS 박스 모델 시각화 도구. 마진, 보더, 패딩, 콘텐츠 크기를 조절하여 CSS 박스 모델 코드를 생성합니다.',
    margin: '마진', border: '보더', padding: '패딩', content: '콘텐츠',
    width: '너비', height: '높이', top: '상', right: '우', bottom: '하', left: '좌',
    borderWidth: '보더 너비', borderStyle: '보더 스타일', borderColor: '보더 색상', borderRadius: '보더 반경',
    bgColor: '배경색', boxSizing: '박스 사이징', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS 출력', totalSize: '총 크기', reset: '초기화',
    introTitle: '무료 CSS 박스 모델 시각화 도구',
    introText: '이 인터랙티브 CSS 박스 모델 시각화 도구로 마진, 보더, 패딩, 콘텐츠 크기를 조절하고 총 요소 크기에 미치는 영향을 확인하세요.',
    howTitle: '박스 모델 시각화 도구 사용 방법',
    step1: '입력 필드에서 콘텐츠 너비와 높이 설정', step2: '패딩 값 조절로 내부 간격 추가',
    step3: '보더 너비, 스타일, 색상, 반경 설정', step4: '마진 값 조절로 외부 간격 추가 후 CSS 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: 'CSS 박스 모델이란?', faq1a: 'CSS 박스 모델은 요소의 직사각형 상자를 설명합니다. 각 요소에는 콘텐츠, 패딩, 보더, 마진의 4개 영역이 있습니다.',
    faq2q: 'content-box와 border-box의 차이는?', faq2a: 'content-box(기본값)에서는 너비와 높이가 콘텐츠에만 적용됩니다. border-box에서는 패딩과 보더를 포함합니다.',
    faq3q: '총 요소 크기 계산 방법은?', faq3a: 'content-box: 총 너비 = 콘텐츠 너비 + 패딩 좌우 + 보더 좌우 + 마진 좌우. border-box: 총 너비 = 지정 너비 + 마진 좌우.',
    faq4q: '각 면에 다른 값을 설정할 수 있나요?', faq4a: '네, 마진, 패딩, 보더 너비에 상하좌우 개별 값을 설정할 수 있습니다.',
    faq5q: '어떤 보더 스타일이 사용 가능한가요?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset, none을 사용할 수 있습니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Visualiseur de Modele de Boite CSS',
    description: 'Visualiseur interactif du modele de boite CSS. Ajustez marge, bordure, rembourrage et contenu pour comprendre et generer du code CSS.',
    margin: 'Marge', border: 'Bordure', padding: 'Rembourrage', content: 'Contenu',
    width: 'Largeur', height: 'Hauteur', top: 'Haut', right: 'Droite', bottom: 'Bas', left: 'Gauche',
    borderWidth: 'Largeur bordure', borderStyle: 'Style bordure', borderColor: 'Couleur bordure', borderRadius: 'Rayon bordure',
    bgColor: 'Arriere-plan', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS genere', totalSize: 'Taille totale', reset: 'Reinitialiser',
    introTitle: 'Visualiseur de Modele de Boite CSS Gratuit',
    introText: 'Ce visualiseur interactif vous aide a comprendre le modele de boite CSS. Ajustez les marges, bordures, rembourrages et dimensions du contenu.',
    howTitle: 'Comment utiliser le visualiseur',
    step1: 'Definissez la largeur et la hauteur du contenu', step2: 'Ajustez le rembourrage pour ajouter l\'espacement interieur',
    step3: 'Definissez la bordure (largeur, style, couleur, rayon)', step4: 'Ajustez les marges et copiez le CSS genere',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que le modele de boite CSS ?', faq1a: 'Le modele de boite CSS decrit les boites rectangulaires des elements. Chaque element a quatre zones : contenu, rembourrage, bordure et marge.',
    faq2q: 'Quelle est la difference entre content-box et border-box ?', faq2a: 'Avec content-box, largeur et hauteur s\'appliquent au contenu seul. Avec border-box, elles incluent le rembourrage et la bordure.',
    faq3q: 'Comment calculer la taille totale ?', faq3a: 'content-box : largeur totale = contenu + rembourrage + bordure + marge. border-box : largeur totale = largeur specifiee + marge.',
    faq4q: 'Peut-on utiliser des valeurs differentes par cote ?', faq4a: 'Oui, CSS permet des valeurs individuelles pour haut, droite, bas et gauche.',
    faq5q: 'Quels styles de bordure sont disponibles ?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset et none.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'CSS Box-Modell Visualisierer',
    description: 'Interaktiver CSS Box-Modell Visualisierer. Passen Sie Margin, Border, Padding und Content an, um CSS-Code zu generieren.',
    margin: 'Margin', border: 'Border', padding: 'Padding', content: 'Content',
    width: 'Breite', height: 'Hoehe', top: 'Oben', right: 'Rechts', bottom: 'Unten', left: 'Links',
    borderWidth: 'Border-Breite', borderStyle: 'Border-Stil', borderColor: 'Border-Farbe', borderRadius: 'Border-Radius',
    bgColor: 'Hintergrund', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS-Ausgabe', totalSize: 'Gesamtgroesse', reset: 'Zuruecksetzen',
    introTitle: 'Kostenloser CSS Box-Modell Visualisierer',
    introText: 'Dieser interaktive CSS Box-Modell Visualisierer hilft Ihnen, das Box-Modell zu verstehen. Passen Sie Margin, Border, Padding und Content an.',
    howTitle: 'So verwenden Sie den Visualisierer',
    step1: 'Content-Breite und -Hoehe einstellen', step2: 'Padding-Werte anpassen',
    step3: 'Border (Breite, Stil, Farbe, Radius) einstellen', step4: 'Margin-Werte anpassen und CSS kopieren',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist das CSS Box-Modell?', faq1a: 'Das CSS Box-Modell beschreibt die rechteckigen Boxen von Elementen mit Content, Padding, Border und Margin.',
    faq2q: 'Unterschied zwischen content-box und border-box?', faq2a: 'Bei content-box gilt Breite/Hoehe nur fuer Content. Bei border-box sind Padding und Border eingeschlossen.',
    faq3q: 'Wie berechnet man die Gesamtgroesse?', faq3a: 'content-box: Gesamt = Content + Padding + Border + Margin. border-box: Gesamt = angegebene Breite + Margin.',
    faq4q: 'Verschiedene Werte pro Seite moeglich?', faq4a: 'Ja, CSS erlaubt individuelle Werte fuer oben, rechts, unten und links.',
    faq5q: 'Welche Border-Stile gibt es?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset und none.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Visualizador del Modelo de Caja CSS',
    description: 'Visualizador interactivo del modelo de caja CSS. Ajusta margen, borde, relleno y contenido para entender y generar codigo CSS.',
    margin: 'Margen', border: 'Borde', padding: 'Relleno', content: 'Contenido',
    width: 'Ancho', height: 'Alto', top: 'Arriba', right: 'Derecha', bottom: 'Abajo', left: 'Izquierda',
    borderWidth: 'Ancho borde', borderStyle: 'Estilo borde', borderColor: 'Color borde', borderRadius: 'Radio borde',
    bgColor: 'Fondo', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS generado', totalSize: 'Tamano total', reset: 'Reiniciar',
    introTitle: 'Visualizador del Modelo de Caja CSS Gratuito',
    introText: 'Este visualizador interactivo te ayuda a entender el modelo de caja CSS. Ajusta margenes, bordes, relleno y dimensiones del contenido.',
    howTitle: 'Como usar el visualizador', step1: 'Establece el ancho y alto del contenido', step2: 'Ajusta el relleno para espaciado interno',
    step3: 'Configura el borde (ancho, estilo, color, radio)', step4: 'Ajusta los margenes y copia el CSS generado',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es el modelo de caja CSS?', faq1a: 'El modelo de caja CSS describe las cajas rectangulares de los elementos con contenido, relleno, borde y margen.',
    faq2q: 'Diferencia entre content-box y border-box?', faq2a: 'En content-box, ancho y alto aplican solo al contenido. En border-box incluyen relleno y borde.',
    faq3q: 'Como calcular el tamano total?', faq3a: 'content-box: total = contenido + relleno + borde + margen. border-box: total = ancho especificado + margen.',
    faq4q: 'Valores diferentes por lado?', faq4a: 'Si, CSS permite valores individuales para arriba, derecha, abajo e izquierda.',
    faq5q: 'Que estilos de borde hay?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset y none.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Visualizador do Modelo de Caixa CSS', description: 'Visualizador interativo do modelo de caixa CSS. Ajuste margem, borda, preenchimento e conteudo para gerar codigo CSS.',
    margin: 'Margem', border: 'Borda', padding: 'Preenchimento', content: 'Conteudo', width: 'Largura', height: 'Altura', top: 'Topo', right: 'Direita', bottom: 'Baixo', left: 'Esquerda',
    borderWidth: 'Largura borda', borderStyle: 'Estilo borda', borderColor: 'Cor borda', borderRadius: 'Raio borda', bgColor: 'Fundo', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS gerado', totalSize: 'Tamanho total', reset: 'Resetar',
    introTitle: 'Visualizador do Modelo de Caixa CSS Gratuito', introText: 'Este visualizador interativo ajuda a entender o modelo de caixa CSS.',
    howTitle: 'Como usar', step1: 'Defina largura e altura do conteudo', step2: 'Ajuste o preenchimento', step3: 'Configure a borda', step4: 'Ajuste as margens e copie o CSS',
    faqTitle: 'Perguntas frequentes', faq1q: 'O que e o modelo de caixa CSS?', faq1a: 'O modelo de caixa descreve as caixas retangulares dos elementos com conteudo, preenchimento, borda e margem.',
    faq2q: 'Diferenca entre content-box e border-box?', faq2a: 'Em content-box, largura e altura aplicam-se ao conteudo. Em border-box incluem preenchimento e borda.',
    faq3q: 'Como calcular o tamanho total?', faq3a: 'content-box: total = conteudo + preenchimento + borda + margem. border-box: total = largura especificada + margem.',
    faq4q: 'Valores diferentes por lado?', faq4a: 'Sim, CSS permite valores individuais para topo, direita, baixo e esquerda.',
    faq5q: 'Quais estilos de borda existem?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset e none.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Visualizzatore Modello a Scatola CSS', description: 'Visualizzatore interattivo del modello a scatola CSS. Regola margine, bordo, padding e contenuto per generare codice CSS.',
    margin: 'Margine', border: 'Bordo', padding: 'Padding', content: 'Contenuto', width: 'Larghezza', height: 'Altezza', top: 'Alto', right: 'Destra', bottom: 'Basso', left: 'Sinistra',
    borderWidth: 'Larghezza bordo', borderStyle: 'Stile bordo', borderColor: 'Colore bordo', borderRadius: 'Raggio bordo', bgColor: 'Sfondo', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS generato', totalSize: 'Dimensione totale', reset: 'Ripristina',
    introTitle: 'Visualizzatore Modello a Scatola CSS Gratuito', introText: 'Questo visualizzatore interattivo ti aiuta a capire il modello a scatola CSS.',
    howTitle: 'Come usare', step1: 'Imposta larghezza e altezza del contenuto', step2: 'Regola il padding', step3: 'Configura il bordo', step4: 'Regola i margini e copia il CSS',
    faqTitle: 'Domande frequenti', faq1q: "Cos'e il modello a scatola CSS?", faq1a: 'Il modello a scatola descrive le scatole rettangolari degli elementi con contenuto, padding, bordo e margine.',
    faq2q: 'Differenza tra content-box e border-box?', faq2a: 'In content-box, larghezza e altezza si applicano al contenuto. In border-box includono padding e bordo.',
    faq3q: 'Come calcolare la dimensione totale?', faq3a: 'content-box: totale = contenuto + padding + bordo + margine. border-box: totale = larghezza specificata + margine.',
    faq4q: 'Valori diversi per lato?', faq4a: 'Si, CSS permette valori individuali per alto, destra, basso e sinistra.',
    faq5q: 'Quali stili di bordo sono disponibili?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset e none.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'CSS Box Model Visualiseerder', description: 'Interactieve CSS box model visualiseerder. Pas marge, rand, padding en inhoud aan om CSS-code te genereren.',
    margin: 'Marge', border: 'Rand', padding: 'Padding', content: 'Inhoud', width: 'Breedte', height: 'Hoogte', top: 'Boven', right: 'Rechts', bottom: 'Onder', left: 'Links',
    borderWidth: 'Randbreedte', borderStyle: 'Randstijl', borderColor: 'Randkleur', borderRadius: 'Randradius', bgColor: 'Achtergrond', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS uitvoer', totalSize: 'Totale grootte', reset: 'Resetten',
    introTitle: 'Gratis CSS Box Model Visualiseerder', introText: 'Deze interactieve visualiseerder helpt u het CSS box model te begrijpen.',
    howTitle: 'Hoe te gebruiken', step1: 'Stel inhoudsbreedte en -hoogte in', step2: 'Pas padding aan', step3: 'Configureer de rand', step4: 'Pas marges aan en kopieer de CSS',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Wat is het CSS box model?', faq1a: 'Het CSS box model beschrijft de rechthoekige dozen van elementen met inhoud, padding, rand en marge.',
    faq2q: 'Verschil tussen content-box en border-box?', faq2a: 'Bij content-box gelden breedte en hoogte voor inhoud. Bij border-box inclusief padding en rand.',
    faq3q: 'Hoe bereken je de totale grootte?', faq3a: 'content-box: totaal = inhoud + padding + rand + marge. border-box: totaal = opgegeven breedte + marge.',
    faq4q: 'Verschillende waarden per zijde?', faq4a: 'Ja, CSS staat individuele waarden toe voor boven, rechts, onder en links.',
    faq5q: 'Welke randstijlen zijn beschikbaar?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset en none.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Wizualizator Modelu Pudelkowego CSS', description: 'Interaktywny wizualizator modelu pudelkowego CSS. Dostosuj margines, obramowanie, padding i zawartosc.',
    margin: 'Margines', border: 'Obramowanie', padding: 'Padding', content: 'Zawartosc', width: 'Szerokosc', height: 'Wysokosc', top: 'Gora', right: 'Prawa', bottom: 'Dol', left: 'Lewa',
    borderWidth: 'Szerokosc obramowania', borderStyle: 'Styl obramowania', borderColor: 'Kolor obramowania', borderRadius: 'Promien obramowania', bgColor: 'Tlo', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'Wyjscie CSS', totalSize: 'Calkowity rozmiar', reset: 'Resetuj',
    introTitle: 'Darmowy Wizualizator Modelu Pudelkowego CSS', introText: 'Ten interaktywny wizualizator pomaga zrozumiec model pudelkowy CSS.',
    howTitle: 'Jak uzywac', step1: 'Ustaw szerokosc i wysokosc zawartosci', step2: 'Dostosuj padding', step3: 'Skonfiguruj obramowanie', step4: 'Dostosuj marginesy i skopiuj CSS',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Co to jest model pudelkowy CSS?', faq1a: 'Model pudelkowy opisuje prostokatne pudla elementow z zawartoscia, paddingiem, obramowaniem i marginesem.',
    faq2q: 'Roznica miedzy content-box a border-box?', faq2a: 'W content-box szerokosc i wysokosc dotycza zawartosci. W border-box obejmuja padding i obramowanie.',
    faq3q: 'Jak obliczyc calkowity rozmiar?', faq3a: 'content-box: total = zawartosc + padding + obramowanie + margines. border-box: total = podana szerokosc + margines.',
    faq4q: 'Rozne wartosci na kazdym boku?', faq4a: 'Tak, CSS pozwala na indywidualne wartosci dla gory, prawej, dolu i lewej.',
    faq5q: 'Jakie style obramowania sa dostepne?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset i none.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'CSS Boxmodell Visualiserare', description: 'Interaktiv CSS boxmodell visualiserare. Justera marginal, ram, padding och innehall for att generera CSS-kod.',
    margin: 'Marginal', border: 'Ram', padding: 'Padding', content: 'Innehall', width: 'Bredd', height: 'Hojd', top: 'Ovan', right: 'Hoger', bottom: 'Under', left: 'Vanster',
    borderWidth: 'Rambredd', borderStyle: 'Ramstil', borderColor: 'Ramfarg', borderRadius: 'Ramradie', bgColor: 'Bakgrund', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS-utdata', totalSize: 'Total storlek', reset: 'Aterstall',
    introTitle: 'Gratis CSS Boxmodell Visualiserare', introText: 'Denna interaktiva visualiserare hjalper dig forsta CSS boxmodellen.',
    howTitle: 'Hur man anvander', step1: 'Stall in innehallets bredd och hojd', step2: 'Justera padding', step3: 'Konfigurera ramen', step4: 'Justera marginaler och kopiera CSS',
    faqTitle: 'Vanliga fragor', faq1q: 'Vad ar CSS boxmodellen?', faq1a: 'CSS boxmodellen beskriver de rektangulara ladornas innehall, padding, ram och marginal.',
    faq2q: 'Skillnad mellan content-box och border-box?', faq2a: 'Med content-box galler bredd och hojd for innehallet. Med border-box inkluderas padding och ram.',
    faq3q: 'Hur beraknas total storlek?', faq3a: 'content-box: total = innehall + padding + ram + marginal. border-box: total = angiven bredd + marginal.',
    faq4q: 'Olika varden per sida?', faq4a: 'Ja, CSS tillater individuella varden for ovan, hoger, under och vanster.',
    faq5q: 'Vilka ramstilar finns?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset och none.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'CSS Boksmodell Visualiserer', description: 'Interaktiv CSS boksmodell visualiserer. Juster marg, ramme, padding og innhold for a generere CSS-kode.',
    margin: 'Marg', border: 'Ramme', padding: 'Padding', content: 'Innhold', width: 'Bredde', height: 'Hoyde', top: 'Topp', right: 'Hoyre', bottom: 'Bunn', left: 'Venstre',
    borderWidth: 'Rammebredde', borderStyle: 'Rammestil', borderColor: 'Rammefarge', borderRadius: 'Rammeradius', bgColor: 'Bakgrunn', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'CSS-utdata', totalSize: 'Total storrelse', reset: 'Tilbakestill',
    introTitle: 'Gratis CSS Boksmodell Visualiserer', introText: 'Denne interaktive visualisereren hjelper deg a forsta CSS boksmodellen.',
    howTitle: 'Slik bruker du', step1: 'Sett innholdets bredde og hoyde', step2: 'Juster padding', step3: 'Konfigurer rammen', step4: 'Juster margene og kopier CSS',
    faqTitle: 'Ofte stilte sporsmal', faq1q: 'Hva er CSS boksmodellen?', faq1a: 'CSS boksmodellen beskriver de rektangulaere boksene med innhold, padding, ramme og marg.',
    faq2q: 'Forskjell mellom content-box og border-box?', faq2a: 'Med content-box gjelder bredde og hoyde for innholdet. Med border-box inkluderes padding og ramme.',
    faq3q: 'Hvordan beregne total storrelse?', faq3a: 'content-box: total = innhold + padding + ramme + marg. border-box: total = angitt bredde + marg.',
    faq4q: 'Forskjellige verdier per side?', faq4a: 'Ja, CSS tillater individuelle verdier for topp, hoyre, bunn og venstre.',
    faq5q: 'Hvilke rammestiler finnes?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset og none.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Visualisator Model Kotak CSS', description: 'Visualisator model kotak CSS interaktif. Sesuaikan margin, border, padding, dan konten untuk menghasilkan kode CSS.',
    margin: 'Margin', border: 'Border', padding: 'Padding', content: 'Konten', width: 'Lebar', height: 'Tinggi', top: 'Atas', right: 'Kanan', bottom: 'Bawah', left: 'Kiri',
    borderWidth: 'Lebar border', borderStyle: 'Gaya border', borderColor: 'Warna border', borderRadius: 'Radius border', bgColor: 'Latar belakang', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'Output CSS', totalSize: 'Ukuran total', reset: 'Reset',
    introTitle: 'Visualisator Model Kotak CSS Gratis', introText: 'Visualisator interaktif ini membantu Anda memahami model kotak CSS.',
    howTitle: 'Cara menggunakan', step1: 'Atur lebar dan tinggi konten', step2: 'Sesuaikan padding', step3: 'Konfigurasi border', step4: 'Sesuaikan margin dan salin CSS',
    faqTitle: 'Pertanyaan yang sering diajukan', faq1q: 'Apa itu model kotak CSS?', faq1a: 'Model kotak CSS menjelaskan kotak persegi panjang elemen dengan konten, padding, border, dan margin.',
    faq2q: 'Perbedaan content-box dan border-box?', faq2a: 'Pada content-box, lebar dan tinggi berlaku untuk konten. Pada border-box termasuk padding dan border.',
    faq3q: 'Bagaimana menghitung ukuran total?', faq3a: 'content-box: total = konten + padding + border + margin. border-box: total = lebar yang ditentukan + margin.',
    faq4q: 'Nilai berbeda per sisi?', faq4a: 'Ya, CSS memungkinkan nilai individu untuk atas, kanan, bawah, dan kiri.',
    faq5q: 'Gaya border apa yang tersedia?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset, dan none.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือแสดงภาพ CSS Box Model', description: 'เครื่องมือแสดงภาพ CSS Box Model แบบอินเทอร์แอคทีฟ ปรับ margin, border, padding และ content เพื่อสร้างโค้ด CSS',
    margin: 'Margin', border: 'Border', padding: 'Padding', content: 'Content', width: 'ความกว้าง', height: 'ความสูง', top: 'บน', right: 'ขวา', bottom: 'ล่าง', left: 'ซ้าย',
    borderWidth: 'ความกว้าง border', borderStyle: 'สไตล์ border', borderColor: 'สี border', borderRadius: 'รัศมี border', bgColor: 'พื้นหลัง', boxSizing: 'Box Sizing', contentBox: 'content-box', borderBox: 'border-box',
    cssOutput: 'เอาต์พุต CSS', totalSize: 'ขนาดรวม', reset: 'รีเซ็ต',
    introTitle: 'เครื่องมือแสดงภาพ CSS Box Model ฟรี', introText: 'เครื่องมือแบบอินเทอร์แอคทีฟนี้ช่วยให้คุณเข้าใจ CSS Box Model',
    howTitle: 'วิธีใช้', step1: 'ตั้งค่าความกว้างและความสูงของ content', step2: 'ปรับค่า padding', step3: 'กำหนดค่า border', step4: 'ปรับค่า margin และคัดลอก CSS',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'CSS Box Model คืออะไร?', faq1a: 'CSS Box Model อธิบายกล่องสี่เหลี่ยมของอิลิเมนต์ที่มี content, padding, border และ margin',
    faq2q: 'ความแตกต่างระหว่าง content-box และ border-box?', faq2a: 'content-box ความกว้างและความสูงใช้กับ content เท่านั้น border-box รวม padding และ border',
    faq3q: 'คำนวณขนาดรวมอย่างไร?', faq3a: 'content-box: รวม = content + padding + border + margin border-box: รวม = ความกว้างที่กำหนด + margin',
    faq4q: 'ตั้งค่าแต่ละด้านต่างกันได้ไหม?', faq4a: 'ได้ CSS อนุญาตให้ตั้งค่าแยกสำหรับบน ขวา ล่าง และซ้าย',
    faq5q: 'มีสไตล์ border อะไรบ้าง?', faq5a: 'solid, dashed, dotted, double, groove, ridge, inset, outset และ none',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none'];

interface BoxValues { top: number; right: number; bottom: number; left: number; }

export default function CssBoxModelVisualizer() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [contentW, setContentW] = useState(200);
  const [contentH, setContentH] = useState(150);
  const [pd, setPd] = useState<BoxValues>({ top: 20, right: 20, bottom: 20, left: 20 });
  const [mg, setMg] = useState<BoxValues>({ top: 10, right: 10, bottom: 10, left: 10 });
  const [bw, setBw] = useState<BoxValues>({ top: 2, right: 2, bottom: 2, left: 2 });
  const [bStyle, setBStyle] = useState('solid');
  const [bColor, setBColor] = useState('#3b82f6');
  const [bRadius, setBRadius] = useState(0);
  const [bgColor, setBgColor] = useState('#f0f9ff');
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('content-box');

  const resetAll = useCallback(() => {
    setContentW(200); setContentH(150);
    setPd({ top: 20, right: 20, bottom: 20, left: 20 });
    setMg({ top: 10, right: 10, bottom: 10, left: 10 });
    setBw({ top: 2, right: 2, bottom: 2, left: 2 });
    setBStyle('solid'); setBColor('#3b82f6'); setBRadius(0); setBgColor('#f0f9ff');
    setBoxSizing('content-box');
  }, []);

  const totalW = boxSizing === 'content-box'
    ? contentW + pd.left + pd.right + bw.left + bw.right + mg.left + mg.right
    : contentW + mg.left + mg.right;
  const totalH = boxSizing === 'content-box'
    ? contentH + pd.top + pd.bottom + bw.top + bw.bottom + mg.top + mg.bottom
    : contentH + mg.top + mg.bottom;

  const cssCode = `box-sizing: ${boxSizing};
width: ${contentW}px;
height: ${contentH}px;
margin: ${mg.top}px ${mg.right}px ${mg.bottom}px ${mg.left}px;
padding: ${pd.top}px ${pd.right}px ${pd.bottom}px ${pd.left}px;
border-width: ${bw.top}px ${bw.right}px ${bw.bottom}px ${bw.left}px;
border-style: ${bStyle};
border-color: ${bColor};
border-radius: ${bRadius}px;
background-color: ${bgColor};`;

  const numInput = (value: number, onChange: (v: number) => void, label: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <label style={{ fontSize: 11, color: 'var(--text-secondary)', width: 40 }}>{label}</label>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value) || 0)}
        style={{ width: 56, padding: '3px 6px', borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 12, textAlign: 'center' }} />
    </div>
  );

  const boxInputGroup = (label: string, values: BoxValues, onChange: (v: BoxValues) => void) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{label}</label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        {numInput(values.top, v => onChange({ ...values, top: v }), t.top)}
        {numInput(values.right, v => onChange({ ...values, right: v }), t.right)}
        {numInput(values.bottom, v => onChange({ ...values, bottom: v }), t.bottom)}
        {numInput(values.left, v => onChange({ ...values, left: v }), t.left)}
      </div>
    </div>
  );

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const scale = 0.6;

  return (
    <ToolLayout title={t.title} description={t.description} toolId="css-box-model-visualizer">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, marginBottom: 20 }}>
        {/* Controls */}
        <div style={{ padding: 16, borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
          {/* Content */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.content}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {numInput(contentW, setContentW, t.width)}
              {numInput(contentH, setContentH, t.height)}
            </div>
          </div>

          {boxInputGroup(t.padding, pd, setPd)}
          {boxInputGroup(t.margin, mg, setMg)}
          {boxInputGroup(t.borderWidth, bw, setBw)}

          {/* Border style */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.borderStyle}</label>
            <select value={bStyle} onChange={e => setBStyle(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 12 }}>
              {borderStyles.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Colors and radius */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>{t.borderColor}</label>
              <input type="color" value={bColor} onChange={e => setBColor(e.target.value)}
                style={{ width: '100%', height: 28, border: '1px solid var(--border-color)', borderRadius: 4, cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>{t.bgColor}</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                style={{ width: '100%', height: 28, border: '1px solid var(--border-color)', borderRadius: 4, cursor: 'pointer' }} />
            </div>
          </div>

          {numInput(bRadius, setBRadius, t.borderRadius)}

          {/* Box sizing */}
          <div style={{ marginTop: 12, marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.boxSizing}</label>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['content-box', 'border-box'] as const).map(bs => (
                <button key={bs} onClick={() => setBoxSizing(bs)} style={{
                  flex: 1, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)', fontSize: 11, cursor: 'pointer',
                  background: boxSizing === bs ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--bg-input)',
                  color: boxSizing === bs ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
                }}>
                  {bs}
                </button>
              ))}
            </div>
          </div>

          <button onClick={resetAll} className="btn btn-secondary" style={{ width: '100%', fontSize: 12 }}>{t.reset}</button>
        </div>

        {/* Visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg-card)', minHeight: 400, overflow: 'auto' }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            {/* Margin box */}
            <div style={{
              background: 'rgba(249,168,37,0.15)',
              padding: `${mg.top}px ${mg.right}px ${mg.bottom}px ${mg.left}px`,
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>{t.margin}</div>
              <div style={{ position: 'absolute', top: '50%', left: 4, transform: 'translateY(-50%)', fontSize: 10, color: '#f59e0b' }}>{mg.left}</div>
              <div style={{ position: 'absolute', top: '50%', right: 4, transform: 'translateY(-50%)', fontSize: 10, color: '#f59e0b' }}>{mg.right}</div>
              <div style={{ position: 'absolute', top: mg.top > 20 ? 16 : 2, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: '#f59e0b' }}>{mg.top}</div>
              <div style={{ position: 'absolute', bottom: mg.bottom > 20 ? 16 : 2, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: '#f59e0b' }}>{mg.bottom}</div>

              {/* Border box */}
              <div style={{
                borderTop: `${bw.top}px ${bStyle} ${bColor}`,
                borderRight: `${bw.right}px ${bStyle} ${bColor}`,
                borderBottom: `${bw.bottom}px ${bStyle} ${bColor}`,
                borderLeft: `${bw.left}px ${bStyle} ${bColor}`,
                borderRadius: `${bRadius}px`,
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: bColor, fontWeight: 600 }}>{t.border}</div>

                {/* Padding box */}
                <div style={{
                  background: 'rgba(74,222,128,0.2)',
                  padding: `${pd.top}px ${pd.right}px ${pd.bottom}px ${pd.left}px`,
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: '#22c55e', fontWeight: 600 }}>{t.padding}</div>
                  <div style={{ position: 'absolute', top: '50%', left: 4, transform: 'translateY(-50%)', fontSize: 10, color: '#22c55e' }}>{pd.left}</div>
                  <div style={{ position: 'absolute', top: '50%', right: 4, transform: 'translateY(-50%)', fontSize: 10, color: '#22c55e' }}>{pd.right}</div>

                  {/* Content box */}
                  <div style={{
                    width: contentW,
                    height: contentH,
                    background: bgColor,
                    borderRadius: Math.max(0, bRadius - Math.max(pd.top, pd.left)),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                  }}>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>{t.content}</div>
                    <div>{contentW} x {contentH}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
            <strong>{t.totalSize}:</strong> {totalW}px x {totalH}px
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.cssOutput}</label>
          <CopyButton text={cssCode} />
        </div>
        <textarea value={cssCode} readOnly style={{ minHeight: 160, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }} />
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li>
        </ol>
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
            { href: `/${lang}/tools/box-shadow`, label: 'Box Shadow Generator' },
            { href: `/${lang}/tools/border-radius`, label: 'Border Radius Generator' },
            { href: `/${lang}/tools/color-converter`, label: 'Color Converter' },
            { href: `/${lang}/tools/css-gradient`, label: 'CSS Gradient Generator' },
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
