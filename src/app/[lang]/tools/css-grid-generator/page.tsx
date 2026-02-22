'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Grid Generator',
    description: 'Visual CSS Grid layout builder. Create grid layouts interactively and get ready-to-use CSS code.',
    columns: 'Columns',
    rows: 'Rows',
    colGap: 'Column Gap',
    rowGap: 'Row Gap',
    unitLabel: 'Unit',
    addColumn: 'Add Column',
    addRow: 'Add Row',
    removeColumn: 'Remove Column',
    removeRow: 'Remove Row',
    previewLabel: 'Grid Preview',
    codeLabel: 'Generated CSS',
    htmlLabel: 'Generated HTML',
    resetBtn: 'Reset',
    colWidth: 'Col Width',
    rowHeight: 'Row Height',
    justifyItems: 'Justify Items',
    alignItems: 'Align Items',
    justifyContent: 'Justify Content',
    alignContent: 'Align Content',
    presetsTitle: 'Quick Presets',
    preset12col: '12-Column Grid',
    presetHolyGrail: 'Holy Grail Layout',
    presetDashboard: 'Dashboard',
    presetGallery: 'Photo Gallery',
    introTitle: 'Free CSS Grid Generator',
    introText: 'Build CSS Grid layouts visually with this interactive generator. Adjust columns, rows, gaps, and alignment properties in real-time. Get clean, production-ready CSS and HTML code instantly. Perfect for creating responsive web layouts, dashboards, photo galleries, and complex page structures.',
    propTitle: 'CSS Grid Properties Reference',
    propCol: 'Property', propDesc: 'Description', propExample: 'Example',
    p1n: 'grid-template-columns', p1d: 'Defines column track sizes', p1e: '1fr 1fr 1fr',
    p2n: 'grid-template-rows', p2d: 'Defines row track sizes', p2e: 'auto 1fr auto',
    p3n: 'gap', p3d: 'Sets row and column gaps', p3e: '16px 16px',
    p4n: 'justify-items', p4d: 'Aligns items horizontally in cells', p4e: 'start | center | end | stretch',
    p5n: 'align-items', p5d: 'Aligns items vertically in cells', p5e: 'start | center | end | stretch',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is CSS Grid?',
    faq1a: 'CSS Grid is a two-dimensional layout system that allows you to create complex layouts using rows and columns. Unlike Flexbox which is one-dimensional, Grid handles both horizontal and vertical layouts simultaneously, making it ideal for page-level layouts.',
    faq2q: 'What is the difference between CSS Grid and Flexbox?',
    faq2a: 'CSS Grid is two-dimensional (rows AND columns) while Flexbox is one-dimensional (row OR column). Use Grid for page layouts and complex 2D arrangements. Use Flexbox for component-level layouts, navigation bars, and one-directional content flow.',
    faq3q: 'What does "fr" unit mean in CSS Grid?',
    faq3a: 'The "fr" unit represents a fraction of the available space in the grid container. For example, "1fr 2fr" creates two columns where the second is twice as wide as the first. It is similar to flex-grow in Flexbox.',
    faq4q: 'Is CSS Grid supported in all browsers?',
    faq4a: 'Yes, CSS Grid is supported in all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It has been widely supported since 2017 with over 97% global browser support.',
    faq5q: 'Can I use CSS Grid and Flexbox together?',
    faq5a: 'Absolutely. A common pattern is to use CSS Grid for the overall page layout and Flexbox for individual components within grid cells. They complement each other perfectly.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS Grid 生成器',
    description: '可视化 CSS Grid 布局构建器。交互式创建网格布局并获取可用的 CSS 代码。',
    columns: '列数', rows: '行数', colGap: '列间距', rowGap: '行间距', unitLabel: '单位',
    addColumn: '添加列', addRow: '添加行', removeColumn: '移除列', removeRow: '移除行',
    previewLabel: '网格预览', codeLabel: '生成的 CSS', htmlLabel: '生成的 HTML', resetBtn: '重置',
    colWidth: '列宽', rowHeight: '行高', justifyItems: '水平对齐项', alignItems: '垂直对齐项',
    justifyContent: '水平对齐内容', alignContent: '垂直对齐内容',
    presetsTitle: '快速预设', preset12col: '12 列网格', presetHolyGrail: '圣杯布局', presetDashboard: '仪表盘', presetGallery: '照片画廊',
    introTitle: '免费 CSS Grid 生成器', introText: '使用此交互式生成器可视化构建 CSS Grid 布局。实时调整列、行、间距和对齐属性，即时获取生产就绪的 CSS 和 HTML 代码。',
    propTitle: 'CSS Grid 属性参考',
    propCol: '属性', propDesc: '描述', propExample: '示例',
    p1n: 'grid-template-columns', p1d: '定义列轨道大小', p1e: '1fr 1fr 1fr',
    p2n: 'grid-template-rows', p2d: '定义行轨道大小', p2e: 'auto 1fr auto',
    p3n: 'gap', p3d: '设置行列间距', p3e: '16px 16px',
    p4n: 'justify-items', p4d: '水平对齐单元格内项目', p4e: 'start | center | end | stretch',
    p5n: 'align-items', p5d: '垂直对齐单元格内项目', p5e: 'start | center | end | stretch',
    faqTitle: '常见问题',
    faq1q: '什么是 CSS Grid？', faq1a: 'CSS Grid 是一个二维布局系统，可以使用行和列创建复杂布局。',
    faq2q: 'CSS Grid 和 Flexbox 有什么区别？', faq2a: 'CSS Grid 是二维的（行和列），Flexbox 是一维的（行或列）。',
    faq3q: '"fr" 单位是什么意思？', faq3a: '"fr" 代表网格容器中可用空间的一个分数。',
    faq4q: 'CSS Grid 支持所有浏览器吗？', faq4a: '是的，CSS Grid 在所有现代浏览器中都受支持，全球浏览器支持率超过 97%。',
    faq5q: '可以同时使用 Grid 和 Flexbox 吗？', faq5a: '当然可以。常见的模式是用 Grid 做页面布局，Flexbox 做组件布局。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur CSS Grid',
    description: 'Constructeur visuel de mise en page CSS Grid.',
    columns: 'Colonnes', rows: 'Lignes', colGap: 'Espacement colonnes', rowGap: 'Espacement lignes', unitLabel: 'Unite',
    addColumn: 'Ajouter colonne', addRow: 'Ajouter ligne', removeColumn: 'Supprimer colonne', removeRow: 'Supprimer ligne',
    previewLabel: 'Apercu', codeLabel: 'CSS genere', htmlLabel: 'HTML genere', resetBtn: 'Reinitialiser',
    colWidth: 'Largeur', rowHeight: 'Hauteur', justifyItems: 'Justifier elements', alignItems: 'Aligner elements',
    justifyContent: 'Justifier contenu', alignContent: 'Aligner contenu',
    presetsTitle: 'Presets', preset12col: 'Grille 12 colonnes', presetHolyGrail: 'Holy Grail', presetDashboard: 'Tableau de bord', presetGallery: 'Galerie',
    introTitle: 'Generateur CSS Grid gratuit', introText: 'Construisez des mises en page CSS Grid visuellement.',
    propTitle: 'Reference des proprietes', propCol: 'Propriete', propDesc: 'Description', propExample: 'Exemple',
    p1n: 'grid-template-columns', p1d: 'Definit les colonnes', p1e: '1fr 1fr 1fr',
    p2n: 'grid-template-rows', p2d: 'Definit les lignes', p2e: 'auto 1fr auto',
    p3n: 'gap', p3d: 'Espacement', p3e: '16px', p4n: 'justify-items', p4d: 'Alignement horizontal', p4e: 'stretch',
    p5n: 'align-items', p5d: 'Alignement vertical', p5e: 'stretch',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que CSS Grid ?', faq1a: 'CSS Grid est un systeme de mise en page bidimensionnel.',
    faq2q: 'Grid vs Flexbox ?', faq2a: 'Grid est 2D, Flexbox est 1D.',
    faq3q: 'Que signifie "fr" ?', faq3a: '"fr" represente une fraction de l\'espace disponible.',
    faq4q: 'Support navigateur ?', faq4a: 'Oui, supporte par tous les navigateurs modernes.',
    faq5q: 'Grid et Flexbox ensemble ?', faq5a: 'Oui, ils se completent parfaitement.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'CSS Grid Generator',
    description: 'Visueller CSS Grid Layout Builder.',
    columns: 'Spalten', rows: 'Zeilen', colGap: 'Spaltenabstand', rowGap: 'Zeilenabstand', unitLabel: 'Einheit',
    addColumn: 'Spalte hinzufuegen', addRow: 'Zeile hinzufuegen', removeColumn: 'Spalte entfernen', removeRow: 'Zeile entfernen',
    previewLabel: 'Vorschau', codeLabel: 'Generiertes CSS', htmlLabel: 'Generiertes HTML', resetBtn: 'Zuruecksetzen',
    colWidth: 'Spaltenbreite', rowHeight: 'Zeilenhoehe', justifyItems: 'Elemente horizontal', alignItems: 'Elemente vertikal',
    justifyContent: 'Inhalt horizontal', alignContent: 'Inhalt vertikal',
    presetsTitle: 'Vorlagen', preset12col: '12-Spalten', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galerie',
    introTitle: 'Kostenloser CSS Grid Generator', introText: 'Erstellen Sie CSS Grid Layouts visuell.',
    propTitle: 'Eigenschaftenreferenz', propCol: 'Eigenschaft', propDesc: 'Beschreibung', propExample: 'Beispiel',
    p1n: 'grid-template-columns', p1d: 'Spaltengroessen', p1e: '1fr 1fr 1fr',
    p2n: 'grid-template-rows', p2d: 'Zeilengroessen', p2e: 'auto 1fr auto',
    p3n: 'gap', p3d: 'Abstand', p3e: '16px', p4n: 'justify-items', p4d: 'Horizontale Ausrichtung', p4e: 'stretch',
    p5n: 'align-items', p5d: 'Vertikale Ausrichtung', p5e: 'stretch',
    faqTitle: 'FAQ',
    faq1q: 'Was ist CSS Grid?', faq1a: 'CSS Grid ist ein zweidimensionales Layoutsystem.',
    faq2q: 'Grid vs Flexbox?', faq2a: 'Grid ist 2D, Flexbox ist 1D.',
    faq3q: 'Was bedeutet "fr"?', faq3a: '"fr" steht fuer einen Bruchteil des verfuegbaren Platzes.',
    faq4q: 'Browser-Support?', faq4a: 'Ja, von allen modernen Browsern unterstuetzt.',
    faq5q: 'Grid und Flexbox zusammen?', faq5a: 'Ja, sie ergaenzen sich perfekt.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador CSS Grid', description: 'Constructor visual de CSS Grid.',
    columns: 'Columnas', rows: 'Filas', colGap: 'Espaciado columnas', rowGap: 'Espaciado filas', unitLabel: 'Unidad',
    addColumn: 'Agregar columna', addRow: 'Agregar fila', removeColumn: 'Eliminar columna', removeRow: 'Eliminar fila',
    previewLabel: 'Vista previa', codeLabel: 'CSS generado', htmlLabel: 'HTML generado', resetBtn: 'Reiniciar',
    colWidth: 'Ancho', rowHeight: 'Alto', justifyItems: 'Justificar', alignItems: 'Alinear',
    justifyContent: 'Justificar contenido', alignContent: 'Alinear contenido',
    presetsTitle: 'Presets', preset12col: '12 Columnas', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galeria',
    introTitle: 'Generador CSS Grid gratuito', introText: 'Construya layouts CSS Grid visualmente.',
    propTitle: 'Referencia', propCol: 'Propiedad', propDesc: 'Descripcion', propExample: 'Ejemplo',
    p1n: 'grid-template-columns', p1d: 'Define columnas', p1e: '1fr 1fr 1fr',
    p2n: 'grid-template-rows', p2d: 'Define filas', p2e: 'auto 1fr auto',
    p3n: 'gap', p3d: 'Espaciado', p3e: '16px', p4n: 'justify-items', p4d: 'Alineacion horizontal', p4e: 'stretch',
    p5n: 'align-items', p5d: 'Alineacion vertical', p5e: 'stretch',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es CSS Grid?', faq1a: 'CSS Grid es un sistema de layout bidimensional.',
    faq2q: 'Grid vs Flexbox?', faq2a: 'Grid es 2D, Flexbox es 1D.',
    faq3q: 'Que significa "fr"?', faq3a: '"fr" representa una fraccion del espacio disponible.',
    faq4q: 'Soporte de navegadores?', faq4a: 'Si, soportado por todos los navegadores modernos.',
    faq5q: 'Grid y Flexbox juntos?', faq5a: 'Si, se complementan perfectamente.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: { title: 'Generatore CSS Grid', description: 'Costruttore visuale CSS Grid.', columns: 'Colonne', rows: 'Righe', colGap: 'Gap colonne', rowGap: 'Gap righe', unitLabel: 'Unita', addColumn: 'Aggiungi colonna', addRow: 'Aggiungi riga', removeColumn: 'Rimuovi colonna', removeRow: 'Rimuovi riga', previewLabel: 'Anteprima', codeLabel: 'CSS generato', htmlLabel: 'HTML generato', resetBtn: 'Reset', colWidth: 'Larghezza', rowHeight: 'Altezza', justifyItems: 'Giustifica', alignItems: 'Allinea', justifyContent: 'Giustifica contenuto', alignContent: 'Allinea contenuto', presetsTitle: 'Preset', preset12col: '12 Colonne', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galleria', introTitle: 'Generatore CSS Grid gratuito', introText: 'Costruisci layout CSS Grid visivamente.', propTitle: 'Riferimento', propCol: 'Proprieta', propDesc: 'Descrizione', propExample: 'Esempio', p1n: 'grid-template-columns', p1d: 'Definisce colonne', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: 'Definisce righe', p2e: 'auto 1fr auto', p3n: 'gap', p3d: 'Spaziatura', p3e: '16px', p4n: 'justify-items', p4d: 'Allineamento orizzontale', p4e: 'stretch', p5n: 'align-items', p5d: 'Allineamento verticale', p5e: 'stretch', faqTitle: 'FAQ', faq1q: 'Cos\'e CSS Grid?', faq1a: 'CSS Grid e un sistema di layout bidimensionale.', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid e 2D, Flexbox e 1D.', faq3q: 'Cosa significa "fr"?', faq3a: '"fr" rappresenta una frazione dello spazio disponibile.', faq4q: 'Supporto browser?', faq4a: 'Si, supportato da tutti i browser moderni.', faq5q: 'Grid e Flexbox insieme?', faq5a: 'Si, si completano perfettamente.', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Gerador CSS Grid', description: 'Construtor visual CSS Grid.', columns: 'Colunas', rows: 'Linhas', colGap: 'Gap colunas', rowGap: 'Gap linhas', unitLabel: 'Unidade', addColumn: 'Adicionar coluna', addRow: 'Adicionar linha', removeColumn: 'Remover coluna', removeRow: 'Remover linha', previewLabel: 'Pre-visualizacao', codeLabel: 'CSS gerado', htmlLabel: 'HTML gerado', resetBtn: 'Resetar', colWidth: 'Largura', rowHeight: 'Altura', justifyItems: 'Justificar', alignItems: 'Alinhar', justifyContent: 'Justificar conteudo', alignContent: 'Alinhar conteudo', presetsTitle: 'Presets', preset12col: '12 Colunas', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galeria', introTitle: 'Gerador CSS Grid gratuito', introText: 'Construa layouts CSS Grid visualmente.', propTitle: 'Referencia', propCol: 'Propriedade', propDesc: 'Descricao', propExample: 'Exemplo', p1n: 'grid-template-columns', p1d: 'Define colunas', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: 'Define linhas', p2e: 'auto 1fr auto', p3n: 'gap', p3d: 'Espacamento', p3e: '16px', p4n: 'justify-items', p4d: 'Alinhamento horizontal', p4e: 'stretch', p5n: 'align-items', p5d: 'Alinhamento vertical', p5e: 'stretch', faqTitle: 'Perguntas frequentes', faq1q: 'O que e CSS Grid?', faq1a: 'CSS Grid e um sistema de layout bidimensional.', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid e 2D, Flexbox e 1D.', faq3q: 'O que significa "fr"?', faq3a: '"fr" representa uma fracao do espaco disponivel.', faq4q: 'Suporte de navegadores?', faq4a: 'Sim, suportado por todos os navegadores modernos.', faq5q: 'Grid e Flexbox juntos?', faq5a: 'Sim, se complementam perfeitamente.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'CSS Grid Generator', description: 'Visuele CSS Grid bouwer.', columns: 'Kolommen', rows: 'Rijen', colGap: 'Kolom gap', rowGap: 'Rij gap', unitLabel: 'Eenheid', addColumn: 'Kolom toevoegen', addRow: 'Rij toevoegen', removeColumn: 'Kolom verwijderen', removeRow: 'Rij verwijderen', previewLabel: 'Voorbeeld', codeLabel: 'CSS', htmlLabel: 'HTML', resetBtn: 'Reset', colWidth: 'Breedte', rowHeight: 'Hoogte', justifyItems: 'Uitlijnen', alignItems: 'Uitlijnen', justifyContent: 'Inhoud', alignContent: 'Inhoud', presetsTitle: 'Presets', preset12col: '12 Kolommen', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galerij', introTitle: 'Gratis CSS Grid Generator', introText: 'Bouw CSS Grid layouts visueel.', propTitle: 'Referentie', propCol: 'Eigenschap', propDesc: 'Beschrijving', propExample: 'Voorbeeld', p1n: 'grid-template-columns', p1d: 'Kolommen', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: 'Rijen', p2e: 'auto 1fr auto', p3n: 'gap', p3d: 'Afstand', p3e: '16px', p4n: 'justify-items', p4d: 'Horizontaal', p4e: 'stretch', p5n: 'align-items', p5d: 'Verticaal', p5e: 'stretch', faqTitle: 'FAQ', faq1q: 'Wat is CSS Grid?', faq1a: 'CSS Grid is een tweedimensionaal layout systeem.', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid is 2D, Flexbox is 1D.', faq3q: 'Wat betekent "fr"?', faq3a: '"fr" staat voor een fractie van de beschikbare ruimte.', faq4q: 'Browser ondersteuning?', faq4a: 'Ja, alle moderne browsers.', faq5q: 'Grid en Flexbox samen?', faq5a: 'Ja, ze vullen elkaar aan.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Generator CSS Grid', description: 'Wizualny kreator CSS Grid.', columns: 'Kolumny', rows: 'Wiersze', colGap: 'Odstep kolumn', rowGap: 'Odstep wierszy', unitLabel: 'Jednostka', addColumn: 'Dodaj kolumne', addRow: 'Dodaj wiersz', removeColumn: 'Usun kolumne', removeRow: 'Usun wiersz', previewLabel: 'Podglad', codeLabel: 'CSS', htmlLabel: 'HTML', resetBtn: 'Reset', colWidth: 'Szerokosc', rowHeight: 'Wysokosc', justifyItems: 'Wyrownaj', alignItems: 'Wyrownaj', justifyContent: 'Zawartosc', alignContent: 'Zawartosc', presetsTitle: 'Szablony', preset12col: '12 Kolumn', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galeria', introTitle: 'Darmowy CSS Grid Generator', introText: 'Tworzenie ukladow CSS Grid wizualnie.', propTitle: 'Referencja', propCol: 'Wlasciwosc', propDesc: 'Opis', propExample: 'Przyklad', p1n: 'grid-template-columns', p1d: 'Kolumny', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: 'Wiersze', p2e: 'auto 1fr auto', p3n: 'gap', p3d: 'Odstep', p3e: '16px', p4n: 'justify-items', p4d: 'Poziomo', p4e: 'stretch', p5n: 'align-items', p5d: 'Pionowo', p5e: 'stretch', faqTitle: 'FAQ', faq1q: 'Co to CSS Grid?', faq1a: 'CSS Grid to dwuwymiarowy system ukladow.', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid jest 2D, Flexbox 1D.', faq3q: 'Co oznacza "fr"?', faq3a: '"fr" to ulamek dostepnej przestrzeni.', faq4q: 'Wsparcie przegladarek?', faq4a: 'Tak, wszystkie nowoczesne przegladarki.', faq5q: 'Grid i Flexbox razem?', faq5a: 'Tak, swietnie sie uzupelniaja.', relatedTitle: 'Powiazane narzedzia' },
  sv: { title: 'CSS Grid Generator', description: 'Visuell CSS Grid-byggare.', columns: 'Kolumner', rows: 'Rader', colGap: 'Kolumnavstand', rowGap: 'Radavstand', unitLabel: 'Enhet', addColumn: 'Lagg till kolumn', addRow: 'Lagg till rad', removeColumn: 'Ta bort kolumn', removeRow: 'Ta bort rad', previewLabel: 'Forhandsvisning', codeLabel: 'CSS', htmlLabel: 'HTML', resetBtn: 'Aterstall', colWidth: 'Bredd', rowHeight: 'Hojd', justifyItems: 'Justera', alignItems: 'Justera', justifyContent: 'Innehall', alignContent: 'Innehall', presetsTitle: 'Mallar', preset12col: '12 Kolumner', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galleri', introTitle: 'Gratis CSS Grid Generator', introText: 'Bygg CSS Grid-layouts visuellt.', propTitle: 'Referens', propCol: 'Egenskap', propDesc: 'Beskrivning', propExample: 'Exempel', p1n: 'grid-template-columns', p1d: 'Kolumner', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: 'Rader', p2e: 'auto 1fr auto', p3n: 'gap', p3d: 'Avstand', p3e: '16px', p4n: 'justify-items', p4d: 'Horisontellt', p4e: 'stretch', p5n: 'align-items', p5d: 'Vertikalt', p5e: 'stretch', faqTitle: 'FAQ', faq1q: 'Vad ar CSS Grid?', faq1a: 'CSS Grid ar ett tvadimensionellt layoutsystem.', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid ar 2D, Flexbox ar 1D.', faq3q: 'Vad betyder "fr"?', faq3a: '"fr" star for en del av det tillgangliga utrymmet.', faq4q: 'Webblasarstod?', faq4a: 'Ja, alla moderna webblasare.', faq5q: 'Grid och Flexbox tillsammans?', faq5a: 'Ja, de kompletterar varandra.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'CSS Grid Generator', description: 'Visuell CSS Grid-bygger.', columns: 'Kolonner', rows: 'Rader', colGap: 'Kolonneavstand', rowGap: 'Radavstand', unitLabel: 'Enhet', addColumn: 'Legg til kolonne', addRow: 'Legg til rad', removeColumn: 'Fjern kolonne', removeRow: 'Fjern rad', previewLabel: 'Forhandsvisning', codeLabel: 'CSS', htmlLabel: 'HTML', resetBtn: 'Tilbakestill', colWidth: 'Bredde', rowHeight: 'Hoyde', justifyItems: 'Juster', alignItems: 'Juster', justifyContent: 'Innhold', alignContent: 'Innhold', presetsTitle: 'Maler', preset12col: '12 Kolonner', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galleri', introTitle: 'Gratis CSS Grid Generator', introText: 'Bygg CSS Grid-layouts visuelt.', propTitle: 'Referanse', propCol: 'Egenskap', propDesc: 'Beskrivelse', propExample: 'Eksempel', p1n: 'grid-template-columns', p1d: 'Kolonner', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: 'Rader', p2e: 'auto 1fr auto', p3n: 'gap', p3d: 'Avstand', p3e: '16px', p4n: 'justify-items', p4d: 'Horisontalt', p4e: 'stretch', p5n: 'align-items', p5d: 'Vertikalt', p5e: 'stretch', faqTitle: 'FAQ', faq1q: 'Hva er CSS Grid?', faq1a: 'CSS Grid er et todimensjonalt layoutsystem.', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid er 2D, Flexbox er 1D.', faq3q: 'Hva betyr "fr"?', faq3a: '"fr" star for en brukdel av tilgjengelig plass.', faq4q: 'Nettleserstotte?', faq4a: 'Ja, alle moderne nettlesere.', faq5q: 'Grid og Flexbox sammen?', faq5a: 'Ja, de utfyller hverandre.', relatedTitle: 'Relaterte verktoy' },
  ja: { title: 'CSS Grid ジェネレーター', description: 'ビジュアルCSS Gridレイアウトビルダー。', columns: '列', rows: '行', colGap: '列間隔', rowGap: '行間隔', unitLabel: '単位', addColumn: '列追加', addRow: '行追加', removeColumn: '列削除', removeRow: '行削除', previewLabel: 'プレビュー', codeLabel: 'CSS', htmlLabel: 'HTML', resetBtn: 'リセット', colWidth: '幅', rowHeight: '高さ', justifyItems: '横揃え', alignItems: '縦揃え', justifyContent: 'コンテンツ横', alignContent: 'コンテンツ縦', presetsTitle: 'プリセット', preset12col: '12列', presetHolyGrail: 'Holy Grail', presetDashboard: 'ダッシュボード', presetGallery: 'ギャラリー', introTitle: '無料 CSS Grid ジェネレーター', introText: 'インタラクティブにCSS Gridレイアウトを構築。', propTitle: 'プロパティ参照', propCol: 'プロパティ', propDesc: '説明', propExample: '例', p1n: 'grid-template-columns', p1d: '列サイズ', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: '行サイズ', p2e: 'auto 1fr auto', p3n: 'gap', p3d: '間隔', p3e: '16px', p4n: 'justify-items', p4d: '水平配置', p4e: 'stretch', p5n: 'align-items', p5d: '垂直配置', p5e: 'stretch', faqTitle: 'FAQ', faq1q: 'CSS Gridとは？', faq1a: 'CSS Gridは二次元レイアウトシステムです。', faq2q: 'GridとFlexboxの違い？', faq2a: 'Gridは2D、Flexboxは1Dです。', faq3q: '"fr"の意味は？', faq3a: '"fr"は利用可能なスペースの一部を表します。', faq4q: 'ブラウザサポート？', faq4a: 'はい、全てのモダンブラウザで対応。', faq5q: 'GridとFlexboxの併用？', faq5a: 'はい、完璧に補完し合います。', relatedTitle: '関連ツール' },
  ko: { title: 'CSS Grid 생성기', description: '비주얼 CSS Grid 레이아웃 빌더.', columns: '열', rows: '행', colGap: '열 간격', rowGap: '행 간격', unitLabel: '단위', addColumn: '열 추가', addRow: '행 추가', removeColumn: '열 제거', removeRow: '행 제거', previewLabel: '미리보기', codeLabel: 'CSS', htmlLabel: 'HTML', resetBtn: '초기화', colWidth: '너비', rowHeight: '높이', justifyItems: '수평 정렬', alignItems: '수직 정렬', justifyContent: '콘텐츠 수평', alignContent: '콘텐츠 수직', presetsTitle: '프리셋', preset12col: '12열', presetHolyGrail: 'Holy Grail', presetDashboard: '대시보드', presetGallery: '갤러리', introTitle: '무료 CSS Grid 생성기', introText: 'CSS Grid 레이아웃을 시각적으로 구축합니다.', propTitle: '속성 참조', propCol: '속성', propDesc: '설명', propExample: '예제', p1n: 'grid-template-columns', p1d: '열 크기', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: '행 크기', p2e: 'auto 1fr auto', p3n: 'gap', p3d: '간격', p3e: '16px', p4n: 'justify-items', p4d: '수평 정렬', p4e: 'stretch', p5n: 'align-items', p5d: '수직 정렬', p5e: 'stretch', faqTitle: 'FAQ', faq1q: 'CSS Grid란?', faq1a: 'CSS Grid는 2차원 레이아웃 시스템입니다.', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid는 2D, Flexbox는 1D입니다.', faq3q: '"fr"이란?', faq3a: '"fr"은 사용 가능한 공간의 비율입니다.', faq4q: '브라우저 지원?', faq4a: '네, 모든 최신 브라우저에서 지원됩니다.', faq5q: 'Grid와 Flexbox 함께?', faq5a: '네, 완벽하게 보완합니다.', relatedTitle: '관련 도구' },
  id: { title: 'Generator CSS Grid', description: 'Pembuat layout CSS Grid visual.', columns: 'Kolom', rows: 'Baris', colGap: 'Gap kolom', rowGap: 'Gap baris', unitLabel: 'Unit', addColumn: 'Tambah kolom', addRow: 'Tambah baris', removeColumn: 'Hapus kolom', removeRow: 'Hapus baris', previewLabel: 'Pratinjau', codeLabel: 'CSS', htmlLabel: 'HTML', resetBtn: 'Reset', colWidth: 'Lebar', rowHeight: 'Tinggi', justifyItems: 'Rata', alignItems: 'Rata', justifyContent: 'Konten', alignContent: 'Konten', presetsTitle: 'Preset', preset12col: '12 Kolom', presetHolyGrail: 'Holy Grail', presetDashboard: 'Dashboard', presetGallery: 'Galeri', introTitle: 'Generator CSS Grid Gratis', introText: 'Bangun layout CSS Grid secara visual.', propTitle: 'Referensi', propCol: 'Properti', propDesc: 'Deskripsi', propExample: 'Contoh', p1n: 'grid-template-columns', p1d: 'Kolom', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: 'Baris', p2e: 'auto 1fr auto', p3n: 'gap', p3d: 'Jarak', p3e: '16px', p4n: 'justify-items', p4d: 'Horizontal', p4e: 'stretch', p5n: 'align-items', p5d: 'Vertikal', p5e: 'stretch', faqTitle: 'FAQ', faq1q: 'Apa itu CSS Grid?', faq1a: 'CSS Grid adalah sistem layout dua dimensi.', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid 2D, Flexbox 1D.', faq3q: 'Apa arti "fr"?', faq3a: '"fr" adalah pecahan ruang yang tersedia.', faq4q: 'Dukungan browser?', faq4a: 'Ya, semua browser modern.', faq5q: 'Grid dan Flexbox bersama?', faq5a: 'Ya, saling melengkapi.', relatedTitle: 'Alat terkait' },
  th: { title: 'เครื่องสร้าง CSS Grid', description: 'ตัวสร้างเลย์เอาต์ CSS Grid แบบวิชวล', columns: 'คอลัมน์', rows: 'แถว', colGap: 'ช่องว่างคอลัมน์', rowGap: 'ช่องว่างแถว', unitLabel: 'หน่วย', addColumn: 'เพิ่มคอลัมน์', addRow: 'เพิ่มแถว', removeColumn: 'ลบคอลัมน์', removeRow: 'ลบแถว', previewLabel: 'ตัวอย่าง', codeLabel: 'CSS', htmlLabel: 'HTML', resetBtn: 'รีเซ็ต', colWidth: 'ความกว้าง', rowHeight: 'ความสูง', justifyItems: 'จัดแนว', alignItems: 'จัดแนว', justifyContent: 'เนื้อหา', alignContent: 'เนื้อหา', presetsTitle: 'พรีเซ็ต', preset12col: '12 คอลัมน์', presetHolyGrail: 'Holy Grail', presetDashboard: 'แดชบอร์ด', presetGallery: 'แกลเลอรี', introTitle: 'เครื่องสร้าง CSS Grid ฟรี', introText: 'สร้างเลย์เอาต์ CSS Grid แบบวิชวล', propTitle: 'อ้างอิง', propCol: 'คุณสมบัติ', propDesc: 'คำอธิบาย', propExample: 'ตัวอย่าง', p1n: 'grid-template-columns', p1d: 'คอลัมน์', p1e: '1fr 1fr 1fr', p2n: 'grid-template-rows', p2d: 'แถว', p2e: 'auto 1fr auto', p3n: 'gap', p3d: 'ช่องว่าง', p3e: '16px', p4n: 'justify-items', p4d: 'แนวนอน', p4e: 'stretch', p5n: 'align-items', p5d: 'แนวตั้ง', p5e: 'stretch', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'CSS Grid คืออะไร?', faq1a: 'CSS Grid เป็นระบบเลย์เอาต์สองมิติ', faq2q: 'Grid vs Flexbox?', faq2a: 'Grid เป็น 2D, Flexbox เป็น 1D', faq3q: '"fr" หมายถึงอะไร?', faq3a: '"fr" แทนสัดส่วนของพื้นที่ที่มี', faq4q: 'รองรับเบราว์เซอร์?', faq4a: 'ใช่ ทุกเบราว์เซอร์สมัยใหม่', faq5q: 'Grid และ Flexbox ด้วยกัน?', faq5a: 'ใช่ เสริมซึ่งกันและกัน', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const alignOptions = ['stretch', 'start', 'center', 'end'];

export default function CssGridGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [cols, setCols] = useState<string[]>(['1fr', '1fr', '1fr']);
  const [rows, setRows] = useState<string[]>(['auto', 'auto']);
  const [colGap, setColGap] = useState('16');
  const [rowGap, setRowGap] = useState('16');
  const [justifyItems, setJustifyItems] = useState('stretch');
  const [alignItemsVal, setAlignItemsVal] = useState('stretch');

  const totalCells = cols.length * rows.length;

  const cssCode = useMemo(() => {
    const lines = ['.grid-container {', '  display: grid;'];
    lines.push(`  grid-template-columns: ${cols.join(' ')};`);
    lines.push(`  grid-template-rows: ${rows.join(' ')};`);
    if (colGap === rowGap) {
      lines.push(`  gap: ${colGap}px;`);
    } else {
      lines.push(`  gap: ${rowGap}px ${colGap}px;`);
    }
    if (justifyItems !== 'stretch') lines.push(`  justify-items: ${justifyItems};`);
    if (alignItemsVal !== 'stretch') lines.push(`  align-items: ${alignItemsVal};`);
    lines.push('}');
    lines.push('');
    lines.push('.grid-item {');
    lines.push('  padding: 16px;');
    lines.push('  background: #e2e8f0;');
    lines.push('  border-radius: 8px;');
    lines.push('}');
    return lines.join('\n');
  }, [cols, rows, colGap, rowGap, justifyItems, alignItemsVal]);

  const htmlCode = useMemo(() => {
    const lines = ['<div class="grid-container">'];
    for (let i = 1; i <= totalCells; i++) {
      lines.push(`  <div class="grid-item">${i}</div>`);
    }
    lines.push('</div>');
    return lines.join('\n');
  }, [totalCells]);

  const applyPreset = (preset: string) => {
    switch (preset) {
      case '12col':
        setCols(Array(12).fill('1fr'));
        setRows(['auto']);
        setColGap('8');
        setRowGap('8');
        break;
      case 'holy-grail':
        setCols(['200px', '1fr', '200px']);
        setRows(['auto', '1fr', 'auto']);
        setColGap('16');
        setRowGap('16');
        break;
      case 'dashboard':
        setCols(['1fr', '1fr', '1fr']);
        setRows(['auto', '1fr', '1fr']);
        setColGap('16');
        setRowGap('16');
        break;
      case 'gallery':
        setCols(['1fr', '1fr', '1fr', '1fr']);
        setRows(['1fr', '1fr', '1fr']);
        setColGap('8');
        setRowGap('8');
        break;
    }
  };

  const reset = () => {
    setCols(['1fr', '1fr', '1fr']);
    setRows(['auto', 'auto']);
    setColGap('16');
    setRowGap('16');
    setJustifyItems('stretch');
    setAlignItemsVal('stretch');
  };

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16', '#06b6d4', '#e11d48'];

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
    <ToolLayout title={t.title} description={t.description} toolId="css-grid-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Presets */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontWeight: 600, lineHeight: '32px' }}>{t.presetsTitle}:</span>
        <button onClick={() => applyPreset('12col')} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 12px' }}>{t.preset12col}</button>
        <button onClick={() => applyPreset('holy-grail')} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 12px' }}>{t.presetHolyGrail}</button>
        <button onClick={() => applyPreset('dashboard')} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 12px' }}>{t.presetDashboard}</button>
        <button onClick={() => applyPreset('gallery')} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 12px' }}>{t.presetGallery}</button>
        <button onClick={reset} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 12px', marginLeft: 'auto' }}>{t.resetBtn}</button>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 20, padding: 16, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)' }}>
        {/* Columns */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.columns} ({cols.length})</label>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {cols.map((c, i) => (
              <input key={i} value={c} onChange={e => { const n = [...cols]; n[i] = e.target.value; setCols(n); }}
                style={{ width: 60, padding: '4px 6px', fontSize: 12, border: '1px solid var(--border-color)', borderRadius: 4 }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <button onClick={() => setCols([...cols, '1fr'])} className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px' }}>+</button>
            {cols.length > 1 && <button onClick={() => setCols(cols.slice(0, -1))} className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px' }}>-</button>}
          </div>
        </div>
        {/* Rows */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.rows} ({rows.length})</label>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {rows.map((r, i) => (
              <input key={i} value={r} onChange={e => { const n = [...rows]; n[i] = e.target.value; setRows(n); }}
                style={{ width: 60, padding: '4px 6px', fontSize: 12, border: '1px solid var(--border-color)', borderRadius: 4 }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <button onClick={() => setRows([...rows, 'auto'])} className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px' }}>+</button>
            {rows.length > 1 && <button onClick={() => setRows(rows.slice(0, -1))} className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px' }}>-</button>}
          </div>
        </div>
        {/* Gaps */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.colGap}: {colGap}px</label>
          <input type="range" min="0" max="40" value={colGap} onChange={e => setColGap(e.target.value)} style={{ width: '100%' }} />
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4, marginTop: 8 }}>{t.rowGap}: {rowGap}px</label>
          <input type="range" min="0" max="40" value={rowGap} onChange={e => setRowGap(e.target.value)} style={{ width: '100%' }} />
        </div>
        {/* Alignment */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.justifyItems}</label>
          <select value={justifyItems} onChange={e => setJustifyItems(e.target.value)} style={{ width: '100%', padding: '4px 6px', fontSize: 12 }}>
            {alignOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4, marginTop: 8 }}>{t.alignItems}</label>
          <select value={alignItemsVal} onChange={e => setAlignItemsVal(e.target.value)} style={{ width: '100%', padding: '4px 6px', fontSize: 12 }}>
            {alignOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Preview */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.previewLabel}</label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: cols.join(' '),
          gridTemplateRows: rows.join(' '),
          gap: `${rowGap}px ${colGap}px`,
          justifyItems: justifyItems as React.CSSProperties['justifyItems'],
          alignItems: alignItemsVal as React.CSSProperties['alignItems'],
          padding: 16,
          border: '2px dashed var(--border-color)',
          borderRadius: 8,
          minHeight: 200,
          background: 'var(--bg-card)',
        }}>
          {Array.from({ length: totalCells }, (_, i) => (
            <div key={i} style={{
              background: colors[i % colors.length] + '20',
              border: `2px solid ${colors[i % colors.length]}`,
              borderRadius: 8,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: colors[i % colors.length],
              minHeight: 50,
              width: justifyItems !== 'stretch' ? 'auto' : undefined,
            }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Code output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.codeLabel}</label>
            <CopyButton text={cssCode} />
          </div>
          <textarea value={cssCode} readOnly style={{ minHeight: 220, fontFamily: 'monospace', fontSize: 12, background: 'var(--bg-input)' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.htmlLabel}</label>
            <CopyButton text={htmlCode} />
          </div>
          <textarea value={htmlCode} readOnly style={{ minHeight: 220, fontFamily: 'monospace', fontSize: 12, background: 'var(--bg-input)' }} />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.propTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.propCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.propDesc}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.propExample}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.p1n, t.p1d, t.p1e],
                [t.p2n, t.p2d, t.p2e],
                [t.p3n, t.p3d, t.p3e],
                [t.p4n, t.p4d, t.p4e],
                [t.p5n, t.p5d, t.p5e],
              ].map(([p, d, e], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, fontFamily: 'monospace' }}>{p}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{d}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
            { q: t.faq5q, a: t.faq5a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/css-flexbox-generator`, label: 'CSS Flexbox Generator' },
            { href: `/${lang}/tools/css-gradient`, label: 'CSS Gradient Generator' },
            { href: `/${lang}/tools/css-shadow`, label: 'CSS Shadow Generator' },
            { href: `/${lang}/tools/em-px-converter`, label: 'Em/Px Converter' },
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
