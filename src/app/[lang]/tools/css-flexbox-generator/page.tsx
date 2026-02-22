'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Flexbox Generator & Playground',
    description: 'Visual CSS Flexbox generator with live preview. Configure flex container and item properties, then copy the generated CSS code.',
    container: 'Container Properties',
    items: 'Item Properties',
    preview: 'Live Preview',
    generatedCss: 'Generated CSS',
    generatedHtml: 'Generated HTML',
    direction: 'flex-direction',
    justifyContent: 'justify-content',
    alignItems: 'align-items',
    flexWrap: 'flex-wrap',
    alignContent: 'align-content',
    gap: 'gap',
    itemCount: 'Items',
    flexGrow: 'flex-grow',
    flexShrink: 'flex-shrink',
    flexBasis: 'flex-basis',
    alignSelf: 'align-self',
    order: 'order',
    addItem: 'Add Item',
    removeItem: 'Remove',
    reset: 'Reset',
    px: 'px',
    auto: 'auto',
    introTitle: 'Free CSS Flexbox Generator & Playground',
    introText: 'Build complex CSS Flexbox layouts visually without writing code. Adjust container properties like flex-direction, justify-content, align-items, flex-wrap, and gap. Customize individual flex items with flex-grow, flex-shrink, flex-basis, align-self, and order. See changes instantly in the live preview and copy the generated CSS and HTML code.',
    cheatTitle: 'Flexbox Properties Reference',
    propCol: 'Property',
    valuesCol: 'Values',
    descCol: 'Description',
    prop1: 'flex-direction', prop1Values: 'row | column | row-reverse | column-reverse', prop1Desc: 'Main axis direction of flex items',
    prop2: 'justify-content', prop2Values: 'flex-start | center | flex-end | space-between | space-around | space-evenly', prop2Desc: 'Alignment along the main axis',
    prop3: 'align-items', prop3Values: 'stretch | flex-start | center | flex-end | baseline', prop3Desc: 'Alignment along the cross axis',
    prop4: 'flex-wrap', prop4Values: 'nowrap | wrap | wrap-reverse', prop4Desc: 'Whether items wrap to new lines',
    prop5: 'gap', prop5Values: '<length>', prop5Desc: 'Space between flex items',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is CSS Flexbox?',
    faq1a: 'CSS Flexbox (Flexible Box Layout) is a one-dimensional layout model that distributes space among items in a container and provides powerful alignment capabilities. It works along a single axis (row or column) and is ideal for components like navigation bars, card layouts, centering content, and responsive designs.',
    faq2q: 'When should I use Flexbox vs CSS Grid?',
    faq2a: 'Use Flexbox for one-dimensional layouts (single row or column) and CSS Grid for two-dimensional layouts (rows AND columns). Flexbox is ideal for navigation bars, toolbars, and aligning items in a row. Grid is better for full page layouts, image galleries, and complex grid structures. They can also be combined.',
    faq3q: 'What does flex: 1 mean?',
    faq3a: 'The shorthand flex: 1 is equivalent to flex-grow: 1, flex-shrink: 1, flex-basis: 0%. It means the item will grow to fill available space equally with other flex: 1 items, can shrink if needed, and starts with a base size of 0. This is the most common way to make items share space equally.',
    faq4q: 'How do I center an element with Flexbox?',
    faq4a: 'To center an element both horizontally and vertically, set the parent container to display: flex; justify-content: center; align-items: center. justify-content centers along the main axis (horizontal by default), and align-items centers along the cross axis (vertical by default).',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS Flexbox \u751f\u6210\u5668 & \u6f14\u7ec3\u573a',
    description: '\u53ef\u89c6\u5316 CSS Flexbox \u751f\u6210\u5668\uff0c\u5b9e\u65f6\u9884\u89c8\u3002\u914d\u7f6e flex \u5bb9\u5668\u548c\u9879\u76ee\u5c5e\u6027\uff0c\u590d\u5236\u751f\u6210\u7684 CSS \u4ee3\u7801\u3002',
    container: '\u5bb9\u5668\u5c5e\u6027',
    items: '\u9879\u76ee\u5c5e\u6027',
    preview: '\u5b9e\u65f6\u9884\u89c8',
    generatedCss: '\u751f\u6210\u7684 CSS',
    generatedHtml: '\u751f\u6210\u7684 HTML',
    direction: 'flex-direction',
    justifyContent: 'justify-content',
    alignItems: 'align-items',
    flexWrap: 'flex-wrap',
    alignContent: 'align-content',
    gap: 'gap',
    itemCount: '\u9879\u76ee\u6570',
    flexGrow: 'flex-grow',
    flexShrink: 'flex-shrink',
    flexBasis: 'flex-basis',
    alignSelf: 'align-self',
    order: 'order',
    addItem: '\u6dfb\u52a0\u9879\u76ee',
    removeItem: '\u5220\u9664',
    reset: '\u91cd\u7f6e',
    px: 'px',
    auto: 'auto',
    introTitle: '\u514d\u8d39 CSS Flexbox \u751f\u6210\u5668',
    introText: '\u53ef\u89c6\u5316\u6784\u5efa CSS Flexbox \u5e03\u5c40\uff0c\u65e0\u9700\u7f16\u5199\u4ee3\u7801\u3002\u8c03\u6574\u5bb9\u5668\u548c\u9879\u76ee\u5c5e\u6027\uff0c\u5b9e\u65f6\u9884\u89c8\u5e76\u590d\u5236\u751f\u6210\u7684 CSS \u548c HTML \u4ee3\u7801\u3002',
    cheatTitle: 'Flexbox \u5c5e\u6027\u53c2\u8003',
    propCol: '\u5c5e\u6027', valuesCol: '\u503c', descCol: '\u8bf4\u660e',
    prop1: 'flex-direction', prop1Values: 'row | column | row-reverse | column-reverse', prop1Desc: '\u4e3b\u8f74\u65b9\u5411',
    prop2: 'justify-content', prop2Values: 'flex-start | center | flex-end | space-between | space-around | space-evenly', prop2Desc: '\u4e3b\u8f74\u5bf9\u9f50',
    prop3: 'align-items', prop3Values: 'stretch | flex-start | center | flex-end | baseline', prop3Desc: '\u4ea4\u53c9\u8f74\u5bf9\u9f50',
    prop4: 'flex-wrap', prop4Values: 'nowrap | wrap | wrap-reverse', prop4Desc: '\u662f\u5426\u6362\u884c',
    prop5: 'gap', prop5Values: '<length>', prop5Desc: '\u9879\u76ee\u95f4\u8ddd',
    faqTitle: '\u5e38\u89c1\u95ee\u9898',
    faq1q: '\u4ec0\u4e48\u662f CSS Flexbox\uff1f',
    faq1a: 'CSS Flexbox\uff08\u5f39\u6027\u76d2\u5e03\u5c40\uff09\u662f\u4e00\u7ef4\u5e03\u5c40\u6a21\u578b\uff0c\u7528\u4e8e\u5728\u5bb9\u5668\u4e2d\u5206\u914d\u7a7a\u95f4\u5e76\u63d0\u4f9b\u5f3a\u5927\u7684\u5bf9\u9f50\u529f\u80fd\u3002\u9002\u7528\u4e8e\u5bfc\u822a\u680f\u3001\u5361\u7247\u5e03\u5c40\u3001\u5c45\u4e2d\u5185\u5bb9\u548c\u54cd\u5e94\u5f0f\u8bbe\u8ba1\u3002',
    faq2q: 'Flexbox \u548c CSS Grid \u4f55\u65f6\u4f7f\u7528\uff1f',
    faq2a: 'Flexbox \u7528\u4e8e\u4e00\u7ef4\u5e03\u5c40\uff08\u5355\u884c\u6216\u5355\u5217\uff09\uff0cCSS Grid \u7528\u4e8e\u4e8c\u7ef4\u5e03\u5c40\u3002\u4e24\u8005\u53ef\u4ee5\u7ed3\u5408\u4f7f\u7528\u3002',
    faq3q: 'flex: 1 \u662f\u4ec0\u4e48\u610f\u601d\uff1f',
    faq3a: 'flex: 1 \u7b49\u4ef7\u4e8e flex-grow: 1, flex-shrink: 1, flex-basis: 0%\u3002\u9879\u76ee\u5c06\u5e73\u5747\u5206\u914d\u53ef\u7528\u7a7a\u95f4\u3002',
    faq4q: '\u5982\u4f55\u7528 Flexbox \u5c45\u4e2d\u5143\u7d20\uff1f',
    faq4a: '\u8bbe\u7f6e\u7236\u5bb9\u5668 display: flex; justify-content: center; align-items: center; \u5373\u53ef\u6c34\u5e73\u548c\u5782\u76f4\u5c45\u4e2d\u3002',
    relatedTitle: '\u76f8\u5173\u5de5\u5177',
  },
  fr: {
    title: 'Generateur CSS Flexbox & Playground',
    description: 'Generateur visuel CSS Flexbox avec apercu en direct. Configurez les proprietes du conteneur et des elements flex.',
    container: 'Proprietes du conteneur', items: 'Proprietes des elements', preview: 'Apercu en direct',
    generatedCss: 'CSS genere', generatedHtml: 'HTML genere',
    direction: 'flex-direction', justifyContent: 'justify-content', alignItems: 'align-items',
    flexWrap: 'flex-wrap', alignContent: 'align-content', gap: 'gap',
    itemCount: 'Elements', flexGrow: 'flex-grow', flexShrink: 'flex-shrink',
    flexBasis: 'flex-basis', alignSelf: 'align-self', order: 'order',
    addItem: 'Ajouter', removeItem: 'Supprimer', reset: 'Reinitialiser', px: 'px', auto: 'auto',
    introTitle: 'Generateur CSS Flexbox gratuit', introText: 'Construisez visuellement des mises en page Flexbox complexes. Ajustez les proprietes et copiez le code genere.',
    cheatTitle: 'Reference des proprietes Flexbox', propCol: 'Propriete', valuesCol: 'Valeurs', descCol: 'Description',
    prop1: 'flex-direction', prop1Values: 'row | column | row-reverse | column-reverse', prop1Desc: 'Direction de l\'axe principal',
    prop2: 'justify-content', prop2Values: 'flex-start | center | flex-end | space-between | space-around | space-evenly', prop2Desc: 'Alignement sur l\'axe principal',
    prop3: 'align-items', prop3Values: 'stretch | flex-start | center | flex-end | baseline', prop3Desc: 'Alignement sur l\'axe transversal',
    prop4: 'flex-wrap', prop4Values: 'nowrap | wrap | wrap-reverse', prop4Desc: 'Retour a la ligne des elements',
    prop5: 'gap', prop5Values: '<length>', prop5Desc: 'Espacement entre les elements',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que CSS Flexbox ?', faq1a: 'CSS Flexbox est un modele de mise en page unidimensionnel pour distribuer l\'espace et aligner les elements.',
    faq2q: 'Flexbox ou CSS Grid ?', faq2a: 'Flexbox pour les mises en page unidimensionnelles, Grid pour les bidimensionnelles.',
    faq3q: 'Que signifie flex: 1 ?', faq3a: 'flex: 1 equivaut a flex-grow: 1, flex-shrink: 1, flex-basis: 0%. Les elements partagent l\'espace equitablement.',
    faq4q: 'Comment centrer avec Flexbox ?', faq4a: 'Utilisez display: flex; justify-content: center; align-items: center;',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'CSS Flexbox Generator & Playground',
    description: 'Visueller CSS Flexbox Generator mit Live-Vorschau. Konfigurieren Sie Flex-Container und Element-Eigenschaften.',
    container: 'Container-Eigenschaften', items: 'Element-Eigenschaften', preview: 'Live-Vorschau',
    generatedCss: 'Generiertes CSS', generatedHtml: 'Generiertes HTML',
    direction: 'flex-direction', justifyContent: 'justify-content', alignItems: 'align-items',
    flexWrap: 'flex-wrap', alignContent: 'align-content', gap: 'gap',
    itemCount: 'Elemente', flexGrow: 'flex-grow', flexShrink: 'flex-shrink',
    flexBasis: 'flex-basis', alignSelf: 'align-self', order: 'order',
    addItem: 'Hinzufuegen', removeItem: 'Entfernen', reset: 'Zuruecksetzen', px: 'px', auto: 'auto',
    introTitle: 'Kostenloser CSS Flexbox Generator', introText: 'Erstellen Sie visuell komplexe Flexbox-Layouts. Passen Sie Eigenschaften an und kopieren Sie den generierten Code.',
    cheatTitle: 'Flexbox-Eigenschaftsreferenz', propCol: 'Eigenschaft', valuesCol: 'Werte', descCol: 'Beschreibung',
    prop1: 'flex-direction', prop1Values: 'row | column | row-reverse | column-reverse', prop1Desc: 'Hauptachsenrichtung',
    prop2: 'justify-content', prop2Values: 'flex-start | center | flex-end | space-between | space-around | space-evenly', prop2Desc: 'Ausrichtung auf der Hauptachse',
    prop3: 'align-items', prop3Values: 'stretch | flex-start | center | flex-end | baseline', prop3Desc: 'Ausrichtung auf der Querachse',
    prop4: 'flex-wrap', prop4Values: 'nowrap | wrap | wrap-reverse', prop4Desc: 'Umbruch der Elemente',
    prop5: 'gap', prop5Values: '<length>', prop5Desc: 'Abstand zwischen Elementen',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist CSS Flexbox?', faq1a: 'CSS Flexbox ist ein eindimensionales Layoutmodell fuer Platzverteilung und Ausrichtung.',
    faq2q: 'Flexbox oder CSS Grid?', faq2a: 'Flexbox fuer eindimensionale Layouts, Grid fuer zweidimensionale.',
    faq3q: 'Was bedeutet flex: 1?', faq3a: 'flex: 1 entspricht flex-grow: 1, flex-shrink: 1, flex-basis: 0%. Elemente teilen sich den Platz gleichmaessig.',
    faq4q: 'Wie zentriere ich mit Flexbox?', faq4a: 'Verwenden Sie display: flex; justify-content: center; align-items: center;',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador CSS Flexbox & Playground',
    description: 'Generador visual de CSS Flexbox con vista previa en vivo. Configure propiedades del contenedor y elementos flex.',
    container: 'Propiedades del contenedor', items: 'Propiedades de elementos', preview: 'Vista previa',
    generatedCss: 'CSS generado', generatedHtml: 'HTML generado',
    direction: 'flex-direction', justifyContent: 'justify-content', alignItems: 'align-items',
    flexWrap: 'flex-wrap', alignContent: 'align-content', gap: 'gap',
    itemCount: 'Elementos', flexGrow: 'flex-grow', flexShrink: 'flex-shrink',
    flexBasis: 'flex-basis', alignSelf: 'align-self', order: 'order',
    addItem: 'Agregar', removeItem: 'Eliminar', reset: 'Reiniciar', px: 'px', auto: 'auto',
    introTitle: 'Generador CSS Flexbox gratuito', introText: 'Construya visualmente layouts Flexbox complejos. Ajuste propiedades y copie el codigo generado.',
    cheatTitle: 'Referencia de propiedades Flexbox', propCol: 'Propiedad', valuesCol: 'Valores', descCol: 'Descripcion',
    prop1: 'flex-direction', prop1Values: 'row | column | row-reverse | column-reverse', prop1Desc: 'Direccion del eje principal',
    prop2: 'justify-content', prop2Values: 'flex-start | center | flex-end | space-between | space-around | space-evenly', prop2Desc: 'Alineacion en el eje principal',
    prop3: 'align-items', prop3Values: 'stretch | flex-start | center | flex-end | baseline', prop3Desc: 'Alineacion en el eje transversal',
    prop4: 'flex-wrap', prop4Values: 'nowrap | wrap | wrap-reverse', prop4Desc: 'Ajuste de linea de elementos',
    prop5: 'gap', prop5Values: '<length>', prop5Desc: 'Espacio entre elementos',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es CSS Flexbox?', faq1a: 'CSS Flexbox es un modelo de diseno unidimensional para distribuir espacio y alinear elementos.',
    faq2q: 'Flexbox o CSS Grid?', faq2a: 'Flexbox para layouts unidimensionales, Grid para bidimensionales.',
    faq3q: 'Que significa flex: 1?', faq3a: 'flex: 1 equivale a flex-grow: 1, flex-shrink: 1, flex-basis: 0%. Los elementos comparten espacio equitativamente.',
    faq4q: 'Como centrar con Flexbox?', faq4a: 'Use display: flex; justify-content: center; align-items: center;',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'CSS Flexbox \u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc & \u30d7\u30ec\u30a4\u30b0\u30e9\u30a6\u30f3\u30c9',
    description: '\u30e9\u30a4\u30d6\u30d7\u30ec\u30d3\u30e5\u30fc\u4ed8\u304d\u306e\u30d3\u30b8\u30e5\u30a2\u30eb CSS Flexbox \u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc\u3002Flex \u30b3\u30f3\u30c6\u30ca\u3068\u30a2\u30a4\u30c6\u30e0\u306e\u30d7\u30ed\u30d1\u30c6\u30a3\u3092\u8a2d\u5b9a\u3002',
    container: '\u30b3\u30f3\u30c6\u30ca\u30d7\u30ed\u30d1\u30c6\u30a3', items: '\u30a2\u30a4\u30c6\u30e0\u30d7\u30ed\u30d1\u30c6\u30a3', preview: '\u30e9\u30a4\u30d6\u30d7\u30ec\u30d3\u30e5\u30fc',
    generatedCss: '\u751f\u6210\u3055\u308c\u305f CSS', generatedHtml: '\u751f\u6210\u3055\u308c\u305f HTML',
    direction: 'flex-direction', justifyContent: 'justify-content', alignItems: 'align-items',
    flexWrap: 'flex-wrap', alignContent: 'align-content', gap: 'gap',
    itemCount: '\u30a2\u30a4\u30c6\u30e0\u6570', flexGrow: 'flex-grow', flexShrink: 'flex-shrink',
    flexBasis: 'flex-basis', alignSelf: 'align-self', order: 'order',
    addItem: '\u8ffd\u52a0', removeItem: '\u524a\u9664', reset: '\u30ea\u30bb\u30c3\u30c8', px: 'px', auto: 'auto',
    introTitle: '\u7121\u6599 CSS Flexbox \u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc', introText: '\u30b3\u30fc\u30c9\u3092\u66f8\u304b\u305a\u306b\u8907\u96d1\u306a Flexbox \u30ec\u30a4\u30a2\u30a6\u30c8\u3092\u30d3\u30b8\u30e5\u30a2\u30eb\u306b\u69cb\u7bc9\u3002\u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u30d7\u30ec\u30d3\u30e5\u30fc\u3067\u78ba\u8a8d\u3057\u3001\u30b3\u30fc\u30c9\u3092\u30b3\u30d4\u30fc\u3002',
    cheatTitle: 'Flexbox \u30d7\u30ed\u30d1\u30c6\u30a3\u30ea\u30d5\u30a1\u30ec\u30f3\u30b9', propCol: '\u30d7\u30ed\u30d1\u30c6\u30a3', valuesCol: '\u5024', descCol: '\u8aac\u660e',
    prop1: 'flex-direction', prop1Values: 'row | column | row-reverse | column-reverse', prop1Desc: '\u4e3b\u8ef8\u306e\u65b9\u5411',
    prop2: 'justify-content', prop2Values: 'flex-start | center | flex-end | space-between | space-around | space-evenly', prop2Desc: '\u4e3b\u8ef8\u306e\u914d\u7f6e',
    prop3: 'align-items', prop3Values: 'stretch | flex-start | center | flex-end | baseline', prop3Desc: '\u4ea4\u5dee\u8ef8\u306e\u914d\u7f6e',
    prop4: 'flex-wrap', prop4Values: 'nowrap | wrap | wrap-reverse', prop4Desc: '\u6298\u308a\u8fd4\u3057',
    prop5: 'gap', prop5Values: '<length>', prop5Desc: '\u30a2\u30a4\u30c6\u30e0\u9593\u306e\u9593\u9694',
    faqTitle: '\u3088\u304f\u3042\u308b\u8cea\u554f',
    faq1q: 'CSS Flexbox \u3068\u306f\uff1f', faq1a: 'CSS Flexbox \u306f\u4e00\u6b21\u5143\u30ec\u30a4\u30a2\u30a6\u30c8\u30e2\u30c7\u30eb\u3067\u3001\u30b9\u30da\u30fc\u30b9\u914d\u5206\u3068\u30a2\u30e9\u30a4\u30e1\u30f3\u30c8\u6a5f\u80fd\u3092\u63d0\u4f9b\u3057\u307e\u3059\u3002',
    faq2q: 'Flexbox \u3068 CSS Grid \u306e\u4f7f\u3044\u5206\u3051\u306f\uff1f', faq2a: 'Flexbox \u306f\u4e00\u6b21\u5143\u3001Grid \u306f\u4e8c\u6b21\u5143\u30ec\u30a4\u30a2\u30a6\u30c8\u306b\u4f7f\u7528\u3057\u307e\u3059\u3002',
    faq3q: 'flex: 1 \u306e\u610f\u5473\u306f\uff1f', faq3a: 'flex-grow: 1, flex-shrink: 1, flex-basis: 0% \u306b\u76f8\u5f53\u3057\u3001\u30a2\u30a4\u30c6\u30e0\u304c\u5747\u7b49\u306b\u30b9\u30da\u30fc\u30b9\u3092\u5206\u914d\u3057\u307e\u3059\u3002',
    faq4q: 'Flexbox \u3067\u4e2d\u592e\u914d\u7f6e\u3059\u308b\u306b\u306f\uff1f', faq4a: 'display: flex; justify-content: center; align-items: center; \u3092\u4f7f\u7528\u3057\u307e\u3059\u3002',
    relatedTitle: '\u95a2\u9023\u30c4\u30fc\u30eb',
  },
  ko: {
    title: 'CSS Flexbox \uc0dd\uc131\uae30 & \ud50c\ub808\uc774\uadf8\ub77c\uc6b4\ub4dc',
    description: '\ub77c\uc774\ube0c \ubbf8\ub9ac\ubcf4\uae30\uac00 \uc788\ub294 \ube44\uc8fc\uc5bc CSS Flexbox \uc0dd\uc131\uae30. Flex \ucee8\ud14c\uc774\ub108\uc640 \uc544\uc774\ud15c \uc18d\uc131\uc744 \uad6c\uc131\ud558\uc138\uc694.',
    container: '\ucee8\ud14c\uc774\ub108 \uc18d\uc131', items: '\uc544\uc774\ud15c \uc18d\uc131', preview: '\ub77c\uc774\ube0c \ubbf8\ub9ac\ubcf4\uae30',
    generatedCss: '\uc0dd\uc131\ub41c CSS', generatedHtml: '\uc0dd\uc131\ub41c HTML',
    direction: 'flex-direction', justifyContent: 'justify-content', alignItems: 'align-items',
    flexWrap: 'flex-wrap', alignContent: 'align-content', gap: 'gap',
    itemCount: '\uc544\uc774\ud15c \uc218', flexGrow: 'flex-grow', flexShrink: 'flex-shrink',
    flexBasis: 'flex-basis', alignSelf: 'align-self', order: 'order',
    addItem: '\ucd94\uac00', removeItem: '\uc81c\uac70', reset: '\ucd08\uae30\ud654', px: 'px', auto: 'auto',
    introTitle: '\ubb34\ub8cc CSS Flexbox \uc0dd\uc131\uae30', introText: '\ucf54\ub4dc \uc5c6\uc774 \ubcf5\uc7a1\ud55c Flexbox \ub808\uc774\uc544\uc6c3\uc744 \uc2dc\uac01\uc801\uc73c\ub85c \uad6c\uc131\ud569\ub2c8\ub2e4. \uc2e4\uc2dc\uac04 \ubbf8\ub9ac\ubcf4\uae30\ub85c \ud655\uc778\ud558\uace0 \ucf54\ub4dc\ub97c \ubcf5\uc0ac\ud558\uc138\uc694.',
    cheatTitle: 'Flexbox \uc18d\uc131 \ucc38\uc870', propCol: '\uc18d\uc131', valuesCol: '\uac12', descCol: '\uc124\uba85',
    prop1: 'flex-direction', prop1Values: 'row | column | row-reverse | column-reverse', prop1Desc: '\uc8fc\ucd95 \ubc29\ud5a5',
    prop2: 'justify-content', prop2Values: 'flex-start | center | flex-end | space-between | space-around | space-evenly', prop2Desc: '\uc8fc\ucd95 \uc815\ub82c',
    prop3: 'align-items', prop3Values: 'stretch | flex-start | center | flex-end | baseline', prop3Desc: '\uad50\ucc28\ucd95 \uc815\ub82c',
    prop4: 'flex-wrap', prop4Values: 'nowrap | wrap | wrap-reverse', prop4Desc: '\uc904\ubc14\uafbc \uc5ec\ubd80',
    prop5: 'gap', prop5Values: '<length>', prop5Desc: '\uc544\uc774\ud15c \uac04 \uac04\uaca9',
    faqTitle: '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    faq1q: 'CSS Flexbox\ub780?', faq1a: 'CSS Flexbox\ub294 \uacf5\uac04 \ubd84\ubc30\uc640 \uc815\ub82c \uae30\ub2a5\uc744 \uc81c\uacf5\ud558\ub294 1\ucc28\uc6d0 \ub808\uc774\uc544\uc6c3 \ubaa8\ub378\uc785\ub2c8\ub2e4.',
    faq2q: 'Flexbox\uc640 CSS Grid\uc758 \ucc28\uc774\uc810\uc740?', faq2a: 'Flexbox\ub294 1\ucc28\uc6d0, Grid\ub294 2\ucc28\uc6d0 \ub808\uc774\uc544\uc6c3\uc5d0 \uc0ac\uc6a9\ud569\ub2c8\ub2e4.',
    faq3q: 'flex: 1\uc758 \uc758\ubbf8\ub294?', faq3a: 'flex-grow: 1, flex-shrink: 1, flex-basis: 0%\uc640 \uac19\uc73c\uba70, \uc544\uc774\ud15c\uc774 \uade0\ub4f1\ud558\uac8c \uacf5\uac04\uc744 \ubd84\ubc30\ud569\ub2c8\ub2e4.',
    faq4q: 'Flexbox\ub85c \uc911\uc559 \uc815\ub82c\ud558\ub824\uba74?', faq4a: 'display: flex; justify-content: center; align-items: center;\ub97c \uc0ac\uc6a9\ud558\uc138\uc694.',
    relatedTitle: '\uad00\ub828 \ub3c4\uad6c',
  },
};

interface FlexItem {
  id: number;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  alignSelf: string;
  order: number;
}

const colors = ['#4F46E5', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1'];

export default function CssFlexboxGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [alignContent, setAlignContent] = useState('stretch');
  const [gap, setGap] = useState(8);
  const [items, setItems] = useState<FlexItem[]>([
    { id: 1, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 },
    { id: 2, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 },
    { id: 3, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 },
  ]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const addItem = () => {
    const newId = Math.max(0, ...items.map(i => i.id)) + 1;
    setItems([...items, { id: newId, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length <= 1) return;
    setItems(items.filter(i => i.id !== id));
    if (selectedItem === id) setSelectedItem(null);
  };

  const updateItem = (id: number, field: keyof FlexItem, value: string | number) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const reset = () => {
    setFlexDirection('row'); setJustifyContent('flex-start'); setAlignItems('stretch');
    setFlexWrap('nowrap'); setAlignContent('stretch'); setGap(8);
    setItems([
      { id: 1, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 },
      { id: 2, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 },
      { id: 3, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 },
    ]);
    setSelectedItem(null);
  };

  // Generate CSS
  const containerCss = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};${flexWrap !== 'nowrap' ? `\n  align-content: ${alignContent};` : ''}
  gap: ${gap}px;
}`;

  const itemsCss = items.map((item, idx) => {
    const props: string[] = [];
    if (item.flexGrow !== 0) props.push(`  flex-grow: ${item.flexGrow};`);
    if (item.flexShrink !== 1) props.push(`  flex-shrink: ${item.flexShrink};`);
    if (item.flexBasis !== 'auto') props.push(`  flex-basis: ${item.flexBasis};`);
    if (item.alignSelf !== 'auto') props.push(`  align-self: ${item.alignSelf};`);
    if (item.order !== 0) props.push(`  order: ${item.order};`);
    if (props.length === 0) return null;
    return `.flex-item-${idx + 1} {\n${props.join('\n')}\n}`;
  }).filter(Boolean).join('\n\n');

  const fullCss = itemsCss ? `${containerCss}\n\n${itemsCss}` : containerCss;

  const htmlCode = `<div class="flex-container">\n${items.map((_, i) => `  <div class="flex-item-${i + 1}">Item ${i + 1}</div>`).join('\n')}\n</div>`;

  const selectStyle = { padding: '4px 8px', fontSize: 12, borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', width: '100%' };
  const labelStyle = { fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace', display: 'block', marginBottom: 4 };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="css-flexbox-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
        {/* Sidebar controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Container properties */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 14, background: 'var(--bg-input)' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{t.container}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={labelStyle}>{t.direction}</label>
                <select value={flexDirection} onChange={e => setFlexDirection(e.target.value)} style={selectStyle}>
                  <option value="row">row</option>
                  <option value="row-reverse">row-reverse</option>
                  <option value="column">column</option>
                  <option value="column-reverse">column-reverse</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>{t.justifyContent}</label>
                <select value={justifyContent} onChange={e => setJustifyContent(e.target.value)} style={selectStyle}>
                  {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>{t.alignItems}</label>
                <select value={alignItems} onChange={e => setAlignItems(e.target.value)} style={selectStyle}>
                  {['stretch', 'flex-start', 'center', 'flex-end', 'baseline'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>{t.flexWrap}</label>
                <select value={flexWrap} onChange={e => setFlexWrap(e.target.value)} style={selectStyle}>
                  {['nowrap', 'wrap', 'wrap-reverse'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              {flexWrap !== 'nowrap' && (
                <div>
                  <label style={labelStyle}>{t.alignContent}</label>
                  <select value={alignContent} onChange={e => setAlignContent(e.target.value)} style={selectStyle}>
                    {['stretch', 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label style={labelStyle}>{t.gap}: {gap}{t.px}</label>
                <input type="range" min={0} max={40} value={gap} onChange={e => setGap(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Item properties */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 14, background: 'var(--bg-input)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700 }}>{t.items} ({items.length})</h3>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={addItem} className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px' }}>{t.addItem}</button>
                <button onClick={reset} className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px' }}>{t.reset}</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map((item, idx) => (
                <div key={item.id}
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  style={{
                    padding: '8px 10px', borderRadius: 6, cursor: 'pointer',
                    border: `2px solid ${selectedItem === item.id ? colors[idx % colors.length] : 'transparent'}`,
                    background: selectedItem === item.id ? 'rgba(79,70,229,0.05)' : 'transparent',
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: colors[idx % colors.length] }}>Item {idx + 1}</span>
                    {items.length > 1 && (
                      <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                        style={{ fontSize: 10, color: 'var(--accent-rose)', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {t.removeItem}
                      </button>
                    )}
                  </div>
                  {selectedItem === item.id && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        <div>
                          <label style={labelStyle}>{t.flexGrow}</label>
                          <input type="number" min={0} value={item.flexGrow} onChange={e => updateItem(item.id, 'flexGrow', Number(e.target.value))} style={{ ...selectStyle, width: '100%' }} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t.flexShrink}</label>
                          <input type="number" min={0} value={item.flexShrink} onChange={e => updateItem(item.id, 'flexShrink', Number(e.target.value))} style={{ ...selectStyle, width: '100%' }} />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>{t.flexBasis}</label>
                        <input type="text" value={item.flexBasis} onChange={e => updateItem(item.id, 'flexBasis', e.target.value)} placeholder="auto, 100px, 50%" style={{ ...selectStyle, width: '100%' }} />
                      </div>
                      <div>
                        <label style={labelStyle}>{t.alignSelf}</label>
                        <select value={item.alignSelf} onChange={e => updateItem(item.id, 'alignSelf', e.target.value)} style={selectStyle}>
                          {['auto', 'flex-start', 'center', 'flex-end', 'stretch', 'baseline'].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>{t.order}</label>
                        <input type="number" value={item.order} onChange={e => updateItem(item.id, 'order', Number(e.target.value))} style={{ ...selectStyle, width: '100%' }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Live preview */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, background: 'var(--bg-card)', minHeight: 250 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{t.preview}</h3>
            <div style={{
              display: 'flex',
              flexDirection: flexDirection as 'row' | 'column' | 'row-reverse' | 'column-reverse',
              justifyContent,
              alignItems,
              flexWrap: flexWrap as 'nowrap' | 'wrap' | 'wrap-reverse',
              alignContent,
              gap: `${gap}px`,
              minHeight: 200,
              border: '2px dashed var(--border-color)',
              borderRadius: 8,
              padding: 12,
              background: 'rgba(79,70,229,0.03)',
            }}>
              {items.map((item, idx) => (
                <div key={item.id}
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  style={{
                    flexGrow: item.flexGrow,
                    flexShrink: item.flexShrink,
                    flexBasis: item.flexBasis,
                    alignSelf: item.alignSelf !== 'auto' ? item.alignSelf as 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' : undefined,
                    order: item.order,
                    background: colors[idx % colors.length],
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    minWidth: 60,
                    textAlign: 'center',
                    border: selectedItem === item.id ? '3px solid white' : '3px solid transparent',
                    boxShadow: selectedItem === item.id ? `0 0 0 2px ${colors[idx % colors.length]}` : 'none',
                    transition: 'all 0.15s ease',
                  }}>
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Generated code */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>{t.generatedCss}</label>
                <CopyButton text={fullCss} />
              </div>
              <textarea value={fullCss} readOnly style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 12 }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>{t.generatedHtml}</label>
                <CopyButton text={htmlCode} />
              </div>
              <textarea value={htmlCode} readOnly style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 12 }} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.cheatTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.propCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.valuesCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.descCol}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.prop1, t.prop1Values, t.prop1Desc],
                [t.prop2, t.prop2Values, t.prop2Desc],
                [t.prop3, t.prop3Values, t.prop3Desc],
                [t.prop4, t.prop4Values, t.prop4Desc],
                [t.prop5, t.prop5Values, t.prop5Desc],
              ].map(([prop, values, desc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{prop}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{values}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
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
            { href: `/${lang}/tools/css-minifier`, label: 'CSS Minifier' },
            { href: `/${lang}/tools/color-converter`, label: 'Color Converter' },
            { href: `/${lang}/tools/html-preview`, label: 'HTML Preview' },
            { href: `/${lang}/tools/tailwind-to-css`, label: 'Tailwind to CSS' },
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
