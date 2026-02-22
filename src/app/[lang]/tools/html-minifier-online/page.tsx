'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTML Minifier Online',
    description: 'Minify and compress HTML code to reduce file size and improve page load speed.',
    inputLabel: 'HTML Input',
    inputPlaceholder: 'Paste your HTML code here...',
    outputLabel: 'Minified HTML',
    minifyBtn: 'Minify HTML',
    clear: 'Clear',
    loadSample: 'Load Sample',
    removeComments: 'Remove comments',
    removeWhitespace: 'Collapse whitespace',
    removeEmptyAttrs: 'Remove empty attributes',
    removeOptionalTags: 'Remove optional closing tags',
    originalSize: 'Original',
    minifiedSize: 'Minified',
    savings: 'Savings',
    introTitle: 'Free Online HTML Minifier & Compressor',
    introText: 'Reduce your HTML file size by removing unnecessary whitespace, comments, and redundant code. HTML minification is a key performance optimization technique that reduces bandwidth usage and improves page load times. This tool processes HTML entirely in your browser with no server upload required, making it safe for proprietary code. Works with HTML5, inline CSS, and inline JavaScript.',
    cheatTitle: 'What Gets Removed',
    ruleCol: 'Optimization', descCol: 'Description', exampleCol: 'Savings',
    rule1: 'Comments', rule1Desc: '<!-- HTML comments --> are removed', rule1Ex: '5-20%',
    rule2: 'Whitespace', rule2Desc: 'Multiple spaces/newlines collapsed to one', rule2Ex: '10-30%',
    rule3: 'Empty attributes', rule3Desc: 'class="" and style="" removed', rule3Ex: '1-5%',
    rule4: 'Optional tags', rule4Desc: '</li>, </td>, </p> can be omitted', rule4Ex: '2-8%',
    rule5: 'Line breaks', rule5Desc: 'Newlines between tags removed', rule5Ex: '5-15%',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Does HTML minification affect how my page renders?',
    faq1a: 'No, properly minified HTML renders identically to the original. Minification only removes characters that browsers ignore during rendering, such as extra whitespace, comments, and optional closing tags. The visual output and functionality remain exactly the same.',
    faq2q: 'How much file size reduction can I expect?',
    faq2a: 'Typical HTML minification achieves 10-40% size reduction depending on the original code style. Code with lots of comments, indentation, and whitespace will see the largest improvements. When combined with gzip compression on the server, the total reduction can reach 60-80%.',
    faq3q: 'Should I minify HTML for production?',
    faq3a: 'Yes, HTML minification is a best practice for production websites. It reduces bandwidth costs, improves Time to First Byte (TTFB), and contributes to better Core Web Vitals scores. Most build tools like webpack, Vite, and Next.js can automate HTML minification in the build process.',
    faq4q: 'Is my HTML code uploaded to a server?',
    faq4a: 'No, this tool processes everything locally in your browser using JavaScript. Your HTML code never leaves your device, making it safe to use with proprietary or sensitive code.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'HTML 在线压缩器',
    description: '压缩 HTML 代码，减小文件大小，提高页面加载速度。',
    inputLabel: 'HTML 输入', inputPlaceholder: '在此粘贴 HTML 代码...',
    outputLabel: '压缩后的 HTML', minifyBtn: '压缩 HTML', clear: '清除', loadSample: '加载示例',
    removeComments: '删除注释', removeWhitespace: '折叠空白',
    removeEmptyAttrs: '删除空属性', removeOptionalTags: '删除可选闭合标签',
    originalSize: '原始大小', minifiedSize: '压缩后', savings: '节省',
    introTitle: '免费在线 HTML 压缩器',
    introText: '删除不必要的空白、注释和冗余代码来减小 HTML 文件大小。HTML 压缩是关键的性能优化技术，可减少带宽使用和加快页面加载。',
    cheatTitle: '删除内容', ruleCol: '优化', descCol: '描述', exampleCol: '节省',
    rule1: '注释', rule1Desc: '<!-- HTML 注释 --> 被删除', rule1Ex: '5-20%',
    rule2: '空白', rule2Desc: '多个空格/换行折叠为一个', rule2Ex: '10-30%',
    rule3: '空属性', rule3Desc: 'class="" 和 style="" 被删除', rule3Ex: '1-5%',
    rule4: '可选标签', rule4Desc: '</li>、</td>、</p> 可省略', rule4Ex: '2-8%',
    rule5: '换行符', rule5Desc: '标签间的换行被删除', rule5Ex: '5-15%',
    faqTitle: '常见问题',
    faq1q: 'HTML 压缩会影响页面渲染吗？', faq1a: '不会，正确压缩的 HTML 与原始内容渲染完全相同。压缩只删除浏览器忽略的字符。',
    faq2q: '能减少多少文件大小？', faq2a: '通常 HTML 压缩可减少 10-40% 的大小，配合服务器 gzip 可达 60-80%。',
    faq3q: '生产环境应该压缩 HTML 吗？', faq3a: '是的，HTML 压缩是生产网站的最佳实践，可减少带宽成本并改善核心 Web 指标。',
    faq4q: 'HTML 代码会上传到服务器吗？', faq4a: '不会，本工具完全在浏览器中本地处理，代码不会离开您的设备。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Minificateur HTML en Ligne',
    description: 'Minifiez et compressez le code HTML pour reduire la taille des fichiers et ameliorer la vitesse de chargement.',
    inputLabel: 'HTML d\'entree', inputPlaceholder: 'Collez votre code HTML ici...',
    outputLabel: 'HTML minifie', minifyBtn: 'Minifier HTML', clear: 'Effacer', loadSample: 'Charger un exemple',
    removeComments: 'Supprimer les commentaires', removeWhitespace: 'Reduire les espaces',
    removeEmptyAttrs: 'Supprimer les attributs vides', removeOptionalTags: 'Supprimer les balises optionnelles',
    originalSize: 'Original', minifiedSize: 'Minifie', savings: 'Economies',
    introTitle: 'Minificateur HTML gratuit en ligne', introText: 'Reduisez la taille de vos fichiers HTML en supprimant les espaces inutiles, commentaires et code redondant.',
    cheatTitle: 'Ce qui est supprime', ruleCol: 'Optimisation', descCol: 'Description', exampleCol: 'Economies',
    rule1: 'Commentaires', rule1Desc: '<!-- commentaires --> supprimes', rule1Ex: '5-20%',
    rule2: 'Espaces', rule2Desc: 'Espaces/sauts de ligne reduits', rule2Ex: '10-30%',
    rule3: 'Attributs vides', rule3Desc: 'class="" et style="" supprimes', rule3Ex: '1-5%',
    rule4: 'Balises optionnelles', rule4Desc: '</li>, </td>, </p> omissibles', rule4Ex: '2-8%',
    rule5: 'Sauts de ligne', rule5Desc: 'Retours a la ligne entre balises supprimes', rule5Ex: '5-15%',
    faqTitle: 'Questions frequentes',
    faq1q: 'La minification affecte-t-elle le rendu ?', faq1a: 'Non, le HTML minifie s\'affiche de maniere identique. Seuls les caracteres ignores par le navigateur sont supprimes.',
    faq2q: 'Quelle reduction de taille attendre ?', faq2a: 'Typiquement 10-40%, jusqu\'a 60-80% avec gzip.',
    faq3q: 'Faut-il minifier en production ?', faq3a: 'Oui, c\'est une bonne pratique pour reduire les couts de bande passante.',
    faq4q: 'Le code est-il envoye a un serveur ?', faq4a: 'Non, tout est traite localement dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'HTML Minifier Online',
    description: 'HTML-Code online minifizieren und komprimieren. Leerzeichen, Kommentare und Tags entfernen.',
    inputLabel: 'HTML-Eingabe', inputPlaceholder: 'HTML-Code hier einfuegen...',
    outputLabel: 'Minifiziertes HTML', minifyBtn: 'HTML minifizieren', clear: 'Loeschen', loadSample: 'Beispiel laden',
    removeComments: 'Kommentare entfernen', removeWhitespace: 'Leerzeichen reduzieren',
    removeEmptyAttrs: 'Leere Attribute entfernen', removeOptionalTags: 'Optionale Tags entfernen',
    originalSize: 'Original', minifiedSize: 'Minifiziert', savings: 'Ersparnis',
    introTitle: 'Kostenloser HTML Minifier Online', introText: 'Reduzieren Sie die HTML-Dateigroesse durch Entfernen von Leerzeichen, Kommentaren und redundantem Code.',
    cheatTitle: 'Was entfernt wird', ruleCol: 'Optimierung', descCol: 'Beschreibung', exampleCol: 'Ersparnis',
    rule1: 'Kommentare', rule1Desc: '<!-- Kommentare --> werden entfernt', rule1Ex: '5-20%',
    rule2: 'Leerzeichen', rule2Desc: 'Mehrfache Leerzeichen werden reduziert', rule2Ex: '10-30%',
    rule3: 'Leere Attribute', rule3Desc: 'class="" und style="" entfernt', rule3Ex: '1-5%',
    rule4: 'Optionale Tags', rule4Desc: '</li>, </td>, </p> koennen entfallen', rule4Ex: '2-8%',
    rule5: 'Zeilenumbrueche', rule5Desc: 'Umbrueche zwischen Tags entfernt', rule5Ex: '5-15%',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Beeinflusst Minifizierung die Darstellung?', faq1a: 'Nein, korrekt minifiziertes HTML wird identisch dargestellt.',
    faq2q: 'Wie viel Groessenreduktion?', faq2a: 'Typisch 10-40%, mit gzip bis zu 60-80%.',
    faq3q: 'Sollte man HTML in Produktion minifizieren?', faq3a: 'Ja, es ist eine Best Practice fuer Produktionswebseiten.',
    faq4q: 'Wird der Code hochgeladen?', faq4a: 'Nein, alles wird lokal im Browser verarbeitet.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Minificador HTML en Linea',
    description: 'Minifique y comprima codigo HTML para reducir el tamano del archivo y mejorar la velocidad de carga.',
    inputLabel: 'Entrada HTML', inputPlaceholder: 'Pegue su codigo HTML aqui...',
    outputLabel: 'HTML minificado', minifyBtn: 'Minificar HTML', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    removeComments: 'Eliminar comentarios', removeWhitespace: 'Reducir espacios',
    removeEmptyAttrs: 'Eliminar atributos vacios', removeOptionalTags: 'Eliminar etiquetas opcionales',
    originalSize: 'Original', minifiedSize: 'Minificado', savings: 'Ahorro',
    introTitle: 'Minificador HTML gratuito en linea', introText: 'Reduzca el tamano de sus archivos HTML eliminando espacios, comentarios y codigo redundante.',
    cheatTitle: 'Que se elimina', ruleCol: 'Optimizacion', descCol: 'Descripcion', exampleCol: 'Ahorro',
    rule1: 'Comentarios', rule1Desc: '<!-- comentarios --> eliminados', rule1Ex: '5-20%',
    rule2: 'Espacios', rule2Desc: 'Multiples espacios reducidos', rule2Ex: '10-30%',
    rule3: 'Atributos vacios', rule3Desc: 'class="" y style="" eliminados', rule3Ex: '1-5%',
    rule4: 'Etiquetas opcionales', rule4Desc: '</li>, </td>, </p> omisibles', rule4Ex: '2-8%',
    rule5: 'Saltos de linea', rule5Desc: 'Saltos entre etiquetas eliminados', rule5Ex: '5-15%',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'La minificacion afecta el renderizado?', faq1a: 'No, el HTML minificado se renderiza de forma identica.',
    faq2q: 'Cuanta reduccion esperar?', faq2a: 'Tipicamente 10-40%, con gzip hasta 60-80%.',
    faq3q: 'Debo minificar en produccion?', faq3a: 'Si, es una mejor practica para sitios en produccion.',
    faq4q: 'El codigo se sube a un servidor?', faq4a: 'No, todo se procesa localmente en su navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'HTML 圧縮ツール オンライン',
    description: 'HTML コードを圧縮してファイルサイズを削減し、ページ読み込み速度を向上。',
    inputLabel: 'HTML 入力', inputPlaceholder: 'HTML コードをここに貼り付け...',
    outputLabel: '圧縮後の HTML', minifyBtn: 'HTML を圧縮', clear: 'クリア', loadSample: 'サンプル読込',
    removeComments: 'コメント削除', removeWhitespace: '空白を折りたたむ',
    removeEmptyAttrs: '空の属性を削除', removeOptionalTags: 'オプションの閉じタグを削除',
    originalSize: '元のサイズ', minifiedSize: '圧縮後', savings: '節約',
    introTitle: '無料 HTML 圧縮ツール', introText: '不要な空白、コメント、冗長なコードを削除して HTML ファイルサイズを削減します。',
    cheatTitle: '削除される内容', ruleCol: '最適化', descCol: '説明', exampleCol: '節約',
    rule1: 'コメント', rule1Desc: '<!-- コメント --> を削除', rule1Ex: '5-20%',
    rule2: '空白', rule2Desc: '複数のスペース/改行を1つに', rule2Ex: '10-30%',
    rule3: '空の属性', rule3Desc: 'class="" や style="" を削除', rule3Ex: '1-5%',
    rule4: 'オプションタグ', rule4Desc: '</li>, </td>, </p> を省略可能', rule4Ex: '2-8%',
    rule5: '改行', rule5Desc: 'タグ間の改行を削除', rule5Ex: '5-15%',
    faqTitle: 'よくある質問',
    faq1q: 'HTML 圧縮はレンダリングに影響しますか？', faq1a: 'いいえ、正しく圧縮された HTML は元と同じにレンダリングされます。',
    faq2q: 'どのくらいサイズ削減できますか？', faq2a: '通常 10-40%、gzip と組み合わせると 60-80%。',
    faq3q: '本番環境で圧縮すべきですか？', faq3a: 'はい、本番サイトのベストプラクティスです。',
    faq4q: 'コードはサーバーにアップロードされますか？', faq4a: 'いいえ、すべてブラウザ内でローカルに処理されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'HTML 압축기 온라인',
    description: 'HTML 코드를 압축하여 파일 크기를 줄이고 페이지 로딩 속도를 개선합니다.',
    inputLabel: 'HTML 입력', inputPlaceholder: 'HTML 코드를 여기에 붙여넣기...',
    outputLabel: '압축된 HTML', minifyBtn: 'HTML 압축', clear: '지우기', loadSample: '샘플 로드',
    removeComments: '주석 제거', removeWhitespace: '공백 축소',
    removeEmptyAttrs: '빈 속성 제거', removeOptionalTags: '선택적 닫기 태그 제거',
    originalSize: '원본', minifiedSize: '압축 후', savings: '절약',
    introTitle: '무료 HTML 압축기 온라인', introText: '불필요한 공백, 주석, 중복 코드를 제거하여 HTML 파일 크기를 줄입니다.',
    cheatTitle: '제거되는 내용', ruleCol: '최적화', descCol: '설명', exampleCol: '절약',
    rule1: '주석', rule1Desc: '<!-- 주석 --> 제거', rule1Ex: '5-20%',
    rule2: '공백', rule2Desc: '여러 공백/줄바꿈을 하나로', rule2Ex: '10-30%',
    rule3: '빈 속성', rule3Desc: 'class=""와 style="" 제거', rule3Ex: '1-5%',
    rule4: '선택적 태그', rule4Desc: '</li>, </td>, </p> 생략 가능', rule4Ex: '2-8%',
    rule5: '줄바꿈', rule5Desc: '태그 사이 줄바꿈 제거', rule5Ex: '5-15%',
    faqTitle: '자주 묻는 질문',
    faq1q: 'HTML 압축이 렌더링에 영향을 미치나요?', faq1a: '아니요, 올바르게 압축된 HTML은 원본과 동일하게 렌더링됩니다.',
    faq2q: '얼마나 크기가 줄어드나요?', faq2a: '보통 10-40%, gzip과 함께 60-80%까지.',
    faq3q: '프로덕션에서 압축해야 하나요?', faq3a: '네, 프로덕션 사이트의 모범 사례입니다.',
    faq4q: '코드가 서버에 업로드되나요?', faq4a: '아니요, 모든 처리가 브라우저에서 로컬로 수행됩니다.',
    relatedTitle: '관련 도구',
  },
  pt: {
    title: 'Minificador HTML Online',
    description: 'Minifique e comprima codigo HTML para reduzir o tamanho do arquivo e melhorar a velocidade de carregamento.',
    inputLabel: 'Entrada HTML', inputPlaceholder: 'Cole seu codigo HTML aqui...',
    outputLabel: 'HTML minificado', minifyBtn: 'Minificar HTML', clear: 'Limpar', loadSample: 'Carregar exemplo',
    removeComments: 'Remover comentarios', removeWhitespace: 'Reduzir espacos',
    removeEmptyAttrs: 'Remover atributos vazios', removeOptionalTags: 'Remover tags opcionais',
    originalSize: 'Original', minifiedSize: 'Minificado', savings: 'Economia',
    introTitle: 'Minificador HTML gratis online', introText: 'Reduza o tamanho dos seus arquivos HTML removendo espacos, comentarios e codigo redundante.',
    cheatTitle: 'O que e removido', ruleCol: 'Otimizacao', descCol: 'Descricao', exampleCol: 'Economia',
    rule1: 'Comentarios', rule1Desc: '<!-- comentarios --> removidos', rule1Ex: '5-20%',
    rule2: 'Espacos', rule2Desc: 'Multiplos espacos reduzidos', rule2Ex: '10-30%',
    rule3: 'Atributos vazios', rule3Desc: 'class="" e style="" removidos', rule3Ex: '1-5%',
    rule4: 'Tags opcionais', rule4Desc: '</li>, </td>, </p> omissiveis', rule4Ex: '2-8%',
    rule5: 'Quebras de linha', rule5Desc: 'Quebras entre tags removidas', rule5Ex: '5-15%',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'A minificacao afeta a renderizacao?', faq1a: 'Nao, HTML minificado renderiza de forma identica.',
    faq2q: 'Quanta reducao esperar?', faq2a: 'Tipicamente 10-40%, com gzip ate 60-80%.',
    faq3q: 'Devo minificar em producao?', faq3a: 'Sim, e uma boa pratica para sites em producao.',
    faq4q: 'O codigo e enviado para um servidor?', faq4a: 'Nao, tudo e processado localmente no seu navegador.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'HTML Minifier Online',
    description: 'Minificeer en comprimeer HTML-code om bestandsgrootte te verminderen en laadsnelheid te verbeteren.',
    inputLabel: 'HTML Invoer', inputPlaceholder: 'Plak uw HTML-code hier...',
    outputLabel: 'Geminificeerde HTML', minifyBtn: 'HTML minificeren', clear: 'Wissen', loadSample: 'Voorbeeld laden',
    removeComments: 'Opmerkingen verwijderen', removeWhitespace: 'Witruimte verminderen',
    removeEmptyAttrs: 'Lege attributen verwijderen', removeOptionalTags: 'Optionele tags verwijderen',
    originalSize: 'Origineel', minifiedSize: 'Geminificeerd', savings: 'Besparing',
    introTitle: 'Gratis HTML Minifier Online', introText: 'Verminder uw HTML-bestandsgrootte door onnodige witruimte, opmerkingen en redundante code te verwijderen.',
    cheatTitle: 'Wat wordt verwijderd', ruleCol: 'Optimalisatie', descCol: 'Beschrijving', exampleCol: 'Besparing',
    rule1: 'Opmerkingen', rule1Desc: '<!-- opmerkingen --> verwijderd', rule1Ex: '5-20%',
    rule2: 'Witruimte', rule2Desc: 'Meerdere spaties/regels verminderd', rule2Ex: '10-30%',
    rule3: 'Lege attributen', rule3Desc: 'class="" en style="" verwijderd', rule3Ex: '1-5%',
    rule4: 'Optionele tags', rule4Desc: '</li>, </td>, </p> weglaatbaar', rule4Ex: '2-8%',
    rule5: 'Regelafbrekingen', rule5Desc: 'Afbrekingen tussen tags verwijderd', rule5Ex: '5-15%',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Beinvloedt minificatie de weergave?', faq1a: 'Nee, correct geminificeerde HTML wordt identiek weergegeven.',
    faq2q: 'Hoeveel reductie verwachten?', faq2a: 'Typisch 10-40%, met gzip tot 60-80%.',
    faq3q: 'Moet ik HTML minificeren voor productie?', faq3a: 'Ja, het is een best practice voor productiewebsites.',
    faq4q: 'Wordt de code geupload?', faq4a: 'Nee, alles wordt lokaal in uw browser verwerkt.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Minifikator HTML Online',
    description: 'Minifikuj i kompresuj kod HTML, aby zmniejszyc rozmiar pliku i poprawic szybkosc ladowania.',
    inputLabel: 'Wejscie HTML', inputPlaceholder: 'Wklej swoj kod HTML tutaj...',
    outputLabel: 'Zminifikowany HTML', minifyBtn: 'Minifikuj HTML', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad',
    removeComments: 'Usun komentarze', removeWhitespace: 'Zredukuj spacje',
    removeEmptyAttrs: 'Usun puste atrybuty', removeOptionalTags: 'Usun opcjonalne tagi',
    originalSize: 'Oryginal', minifiedSize: 'Zminifikowany', savings: 'Oszczednosc',
    introTitle: 'Darmowy minifikator HTML online', introText: 'Zmniejsz rozmiar plikow HTML usuwajac niepotrzebne spacje, komentarze i nadmiarowy kod.',
    cheatTitle: 'Co jest usuwane', ruleCol: 'Optymalizacja', descCol: 'Opis', exampleCol: 'Oszczednosc',
    rule1: 'Komentarze', rule1Desc: '<!-- komentarze --> usuniete', rule1Ex: '5-20%',
    rule2: 'Spacje', rule2Desc: 'Wielokrotne spacje zredukowane', rule2Ex: '10-30%',
    rule3: 'Puste atrybuty', rule3Desc: 'class="" i style="" usuniete', rule3Ex: '1-5%',
    rule4: 'Opcjonalne tagi', rule4Desc: '</li>, </td>, </p> pomijalne', rule4Ex: '2-8%',
    rule5: 'Lamania linii', rule5Desc: 'Lamania miedzy tagami usuniete', rule5Ex: '5-15%',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czy minifikacja wplywa na renderowanie?', faq1a: 'Nie, prawidlowo zminifikowany HTML renderuje sie identycznie.',
    faq2q: 'Jaka redukcja rozmiaru?', faq2a: 'Zazwyczaj 10-40%, z gzip do 60-80%.',
    faq3q: 'Czy minifikowac w produkcji?', faq3a: 'Tak, to najlepsza praktyka dla stron produkcyjnych.',
    faq4q: 'Czy kod jest wysylany na serwer?', faq4a: 'Nie, wszystko jest przetwarzane lokalnie w przegladarce.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'HTML Minifierare Online',
    description: 'Minifiera och komprimera HTML-kod foer att minska filstorlek och foerbaettra laddningshastighet.',
    inputLabel: 'HTML Indata', inputPlaceholder: 'Klistra in din HTML-kod haer...',
    outputLabel: 'Minifierad HTML', minifyBtn: 'Minifiera HTML', clear: 'Rensa', loadSample: 'Ladda exempel',
    removeComments: 'Ta bort kommentarer', removeWhitespace: 'Minska blanksteg',
    removeEmptyAttrs: 'Ta bort tomma attribut', removeOptionalTags: 'Ta bort valfria taggar',
    originalSize: 'Original', minifiedSize: 'Minifierad', savings: 'Besparing',
    introTitle: 'Gratis HTML Minifierare Online', introText: 'Minska HTML-filstorleken genom att ta bort onoediga blanksteg, kommentarer och redundant kod.',
    cheatTitle: 'Vad tas bort', ruleCol: 'Optimering', descCol: 'Beskrivning', exampleCol: 'Besparing',
    rule1: 'Kommentarer', rule1Desc: '<!-- kommentarer --> tas bort', rule1Ex: '5-20%',
    rule2: 'Blanksteg', rule2Desc: 'Flera blanksteg reduceras', rule2Ex: '10-30%',
    rule3: 'Tomma attribut', rule3Desc: 'class="" och style="" tas bort', rule3Ex: '1-5%',
    rule4: 'Valfria taggar', rule4Desc: '</li>, </td>, </p> kan utelaemnas', rule4Ex: '2-8%',
    rule5: 'Radbrytningar', rule5Desc: 'Radbrytningar mellan taggar tas bort', rule5Ex: '5-15%',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Paverkar minifiering renderingen?', faq1a: 'Nej, korrekt minifierad HTML renderas identiskt.',
    faq2q: 'Hur mycket storleksminskning?', faq2a: 'Typiskt 10-40%, med gzip upp till 60-80%.',
    faq3q: 'Bor man minifiera i produktion?', faq3a: 'Ja, det aer baesta praxis foer produktionssajter.',
    faq4q: 'Laddas koden upp?', faq4a: 'Nej, allt bearbetas lokalt i din webblaesare.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'HTML Minifier Online',
    description: 'Minifiser og komprimer HTML-kode for aa redusere filstoerrelse og forbedre lastehastighet.',
    inputLabel: 'HTML Inndata', inputPlaceholder: 'Lim inn HTML-koden din her...',
    outputLabel: 'Minifisert HTML', minifyBtn: 'Minifiser HTML', clear: 'Toemme', loadSample: 'Last eksempel',
    removeComments: 'Fjern kommentarer', removeWhitespace: 'Reduser mellomrom',
    removeEmptyAttrs: 'Fjern tomme attributter', removeOptionalTags: 'Fjern valgfrie tagger',
    originalSize: 'Original', minifiedSize: 'Minifisert', savings: 'Besparelse',
    introTitle: 'Gratis HTML Minifier Online', introText: 'Reduser HTML-filstoerrelsen ved aa fjerne unoedvendige mellomrom, kommentarer og overfloedig kode.',
    cheatTitle: 'Hva fjernes', ruleCol: 'Optimalisering', descCol: 'Beskrivelse', exampleCol: 'Besparelse',
    rule1: 'Kommentarer', rule1Desc: '<!-- kommentarer --> fjernes', rule1Ex: '5-20%',
    rule2: 'Mellomrom', rule2Desc: 'Flere mellomrom reduseres', rule2Ex: '10-30%',
    rule3: 'Tomme attributter', rule3Desc: 'class="" og style="" fjernes', rule3Ex: '1-5%',
    rule4: 'Valgfrie tagger', rule4Desc: '</li>, </td>, </p> kan utelates', rule4Ex: '2-8%',
    rule5: 'Linjeskift', rule5Desc: 'Linjeskift mellom tagger fjernes', rule5Ex: '5-15%',
    faqTitle: 'Vanlige spoersmaal',
    faq1q: 'Pavirker minifisering gjengivelsen?', faq1a: 'Nei, korrekt minifisert HTML gjengis identisk.',
    faq2q: 'Hvor mye stoerrelseresreduksjon?', faq2a: 'Typisk 10-40%, med gzip opptil 60-80%.',
    faq3q: 'Bor man minifisere i produksjon?', faq3a: 'Ja, det er beste praksis for produksjonssider.',
    faq4q: 'Lastes koden opp?', faq4a: 'Nei, alt behandles lokalt i nettleseren din.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'HTML Minifier Online',
    description: 'Minifikasi dan kompres kode HTML untuk mengurangi ukuran file dan meningkatkan kecepatan muat halaman.',
    inputLabel: 'Input HTML', inputPlaceholder: 'Tempel kode HTML Anda di sini...',
    outputLabel: 'HTML Terminifikasi', minifyBtn: 'Minifikasi HTML', clear: 'Hapus', loadSample: 'Muat Contoh',
    removeComments: 'Hapus komentar', removeWhitespace: 'Kurangi spasi',
    removeEmptyAttrs: 'Hapus atribut kosong', removeOptionalTags: 'Hapus tag opsional',
    originalSize: 'Asli', minifiedSize: 'Terminifikasi', savings: 'Penghematan',
    introTitle: 'HTML Minifier Online Gratis', introText: 'Kurangi ukuran file HTML dengan menghapus spasi, komentar, dan kode yang tidak perlu.',
    cheatTitle: 'Apa yang dihapus', ruleCol: 'Optimasi', descCol: 'Deskripsi', exampleCol: 'Penghematan',
    rule1: 'Komentar', rule1Desc: '<!-- komentar --> dihapus', rule1Ex: '5-20%',
    rule2: 'Spasi', rule2Desc: 'Spasi ganda dikurangi', rule2Ex: '10-30%',
    rule3: 'Atribut kosong', rule3Desc: 'class="" dan style="" dihapus', rule3Ex: '1-5%',
    rule4: 'Tag opsional', rule4Desc: '</li>, </td>, </p> bisa dihilangkan', rule4Ex: '2-8%',
    rule5: 'Baris baru', rule5Desc: 'Baris baru antar tag dihapus', rule5Ex: '5-15%',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Apakah minifikasi mempengaruhi rendering?', faq1a: 'Tidak, HTML yang diminifikasi dengan benar dirender secara identik.',
    faq2q: 'Berapa pengurangan ukuran?', faq2a: 'Biasanya 10-40%, dengan gzip hingga 60-80%.',
    faq3q: 'Haruskah diminifikasi di produksi?', faq3a: 'Ya, ini adalah praktik terbaik untuk situs produksi.',
    faq4q: 'Apakah kode diunggah ke server?', faq4a: 'Tidak, semua diproses secara lokal di browser Anda.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'บีบอัด HTML ออนไลน์',
    description: 'บีบอัดและลดขนาดโค้ด HTML เพื่อลดขนาดไฟล์และเพิ่มความเร็วในการโหลดหน้า',
    inputLabel: 'HTML นำเข้า', inputPlaceholder: 'วางโค้ด HTML ที่นี่...',
    outputLabel: 'HTML ที่บีบอัดแล้ว', minifyBtn: 'บีบอัด HTML', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง',
    removeComments: 'ลบคอมเมนต์', removeWhitespace: 'ลดช่องว่าง',
    removeEmptyAttrs: 'ลบแอตทริบิวต์ว่าง', removeOptionalTags: 'ลบแท็กปิดที่ไม่จำเป็น',
    originalSize: 'ต้นฉบับ', minifiedSize: 'บีบอัดแล้ว', savings: 'ประหยัด',
    introTitle: 'เครื่องมือบีบอัด HTML ฟรี', introText: 'ลดขนาดไฟล์ HTML โดยลบช่องว่าง คอมเมนต์ และโค้ดที่ไม่จำเป็น',
    cheatTitle: 'สิ่งที่ถูกลบ', ruleCol: 'การเพิ่มประสิทธิภาพ', descCol: 'คำอธิบาย', exampleCol: 'ประหยัด',
    rule1: 'คอมเมนต์', rule1Desc: '<!-- คอมเมนต์ --> ถูกลบ', rule1Ex: '5-20%',
    rule2: 'ช่องว่าง', rule2Desc: 'ช่องว่างหลายตัวถูกลด', rule2Ex: '10-30%',
    rule3: 'แอตทริบิวต์ว่าง', rule3Desc: 'class="" และ style="" ถูกลบ', rule3Ex: '1-5%',
    rule4: 'แท็กที่ไม่จำเป็น', rule4Desc: '</li>, </td>, </p> สามารถละได้', rule4Ex: '2-8%',
    rule5: 'การขึ้นบรรทัดใหม่', rule5Desc: 'การขึ้นบรรทัดใหม่ระหว่างแท็กถูกลบ', rule5Ex: '5-15%',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การบีบอัดส่งผลต่อการแสดงผลหรือไม่?', faq1a: 'ไม่ HTML ที่บีบอัดอย่างถูกต้องจะแสดงผลเหมือนกันทุกประการ',
    faq2q: 'ลดขนาดได้เท่าไหร่?', faq2a: 'โดยทั่วไป 10-40% รวมกับ gzip ได้ถึง 60-80%',
    faq3q: 'ควรบีบอัดใน production หรือไม่?', faq3a: 'ใช่ เป็นแนวทางปฏิบัติที่ดีสำหรับเว็บไซต์ production',
    faq4q: 'โค้ดถูกอัปโหลดไปเซิร์ฟเวอร์หรือไม่?', faq4a: 'ไม่ ทุกอย่างถูกประมวลผลในเบราว์เซอร์ของคุณ',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
  it: {
    title: 'Minificatore HTML Online',
    description: 'Minifica e comprimi il codice HTML per ridurre le dimensioni del file e migliorare la velocita di caricamento.',
    inputLabel: 'Input HTML', inputPlaceholder: 'Incolla il tuo codice HTML qui...',
    outputLabel: 'HTML minificato', minifyBtn: 'Minifica HTML', clear: 'Cancella', loadSample: 'Carica esempio',
    removeComments: 'Rimuovi commenti', removeWhitespace: 'Riduci spazi',
    removeEmptyAttrs: 'Rimuovi attributi vuoti', removeOptionalTags: 'Rimuovi tag opzionali',
    originalSize: 'Originale', minifiedSize: 'Minificato', savings: 'Risparmio',
    introTitle: 'Minificatore HTML gratuito online', introText: 'Riduci le dimensioni dei file HTML rimuovendo spazi, commenti e codice ridondante.',
    cheatTitle: 'Cosa viene rimosso', ruleCol: 'Ottimizzazione', descCol: 'Descrizione', exampleCol: 'Risparmio',
    rule1: 'Commenti', rule1Desc: '<!-- commenti --> rimossi', rule1Ex: '5-20%',
    rule2: 'Spazi', rule2Desc: 'Spazi multipli ridotti', rule2Ex: '10-30%',
    rule3: 'Attributi vuoti', rule3Desc: 'class="" e style="" rimossi', rule3Ex: '1-5%',
    rule4: 'Tag opzionali', rule4Desc: '</li>, </td>, </p> omissibili', rule4Ex: '2-8%',
    rule5: 'A capo', rule5Desc: 'A capo tra tag rimossi', rule5Ex: '5-15%',
    faqTitle: 'Domande frequenti',
    faq1q: 'La minificazione influisce sul rendering?', faq1a: 'No, l\'HTML correttamente minificato si visualizza in modo identico.',
    faq2q: 'Quanta riduzione aspettarsi?', faq2a: 'Tipicamente 10-40%, con gzip fino a 60-80%.',
    faq3q: 'Si deve minificare in produzione?', faq3a: 'Si, e una best practice per i siti in produzione.',
    faq4q: 'Il codice viene caricato su un server?', faq4a: 'No, tutto viene elaborato localmente nel browser.',
    relatedTitle: 'Strumenti correlati',
  },
};

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <!-- This is a comment that will be removed -->
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>

    <!-- Main content -->
    <main>
        <h1>Welcome to My Website</h1>
        <p>This is a sample HTML page with comments,
           extra whitespace, and empty attributes
           that can be removed by minification.</p>
        <div style="">
            <p>Another paragraph with content.</p>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <p>Copyright 2024</p>
    </footer>
</body>
</html>`;

function minifyHTML(html: string, options: { removeComments: boolean; removeWhitespace: boolean; removeEmptyAttrs: boolean; removeOptionalTags: boolean }): string {
  let result = html;

  // Remove HTML comments (but keep conditional comments)
  if (options.removeComments) {
    result = result.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');
  }

  // Remove empty attributes
  if (options.removeEmptyAttrs) {
    result = result.replace(/\s+(class|style|id|title|lang|dir)\s*=\s*""\s*/gi, ' ');
    result = result.replace(/\s+(class|style|id|title|lang|dir)\s*=\s*''\s*/gi, ' ');
  }

  // Remove optional closing tags
  if (options.removeOptionalTags) {
    result = result.replace(/<\/li>/gi, '');
    result = result.replace(/<\/dt>/gi, '');
    result = result.replace(/<\/dd>/gi, '');
    result = result.replace(/<\/p>(\s*<(?:address|article|aside|blockquote|details|div|dl|fieldset|figcaption|figure|footer|form|h[1-6]|header|hgroup|hr|main|menu|nav|ol|p|pre|section|table|ul))/gi, '$1');
    result = result.replace(/<\/td>(\s*<(?:td|th))/gi, '$1');
    result = result.replace(/<\/th>(\s*<(?:td|th))/gi, '$1');
    result = result.replace(/<\/tr>(\s*<(?:tr))/gi, '$1');
    result = result.replace(/<\/option>(\s*<(?:option))/gi, '$1');
  }

  // Collapse whitespace
  if (options.removeWhitespace) {
    // Collapse multiple whitespace to single space
    result = result.replace(/\s+/g, ' ');
    // Remove whitespace between tags
    result = result.replace(/>\s+</g, '><');
    // Remove leading/trailing whitespace
    result = result.trim();
  }

  return result;
}

export default function HtmlMinifierOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [removeComments, setRemoveComments] = useState(true);
  const [removeWhitespace, setRemoveWhitespace] = useState(true);
  const [removeEmptyAttrs, setRemoveEmptyAttrs] = useState(true);
  const [removeOptionalTags, setRemoveOptionalTags] = useState(false);

  const handleMinify = useCallback(() => {
    if (!input.trim()) { setOutput(''); return; }
    const minified = minifyHTML(input, { removeComments, removeWhitespace, removeEmptyAttrs, removeOptionalTags });
    setOutput(minified);
  }, [input, removeComments, removeWhitespace, removeEmptyAttrs, removeOptionalTags]);

  const originalSize = new Blob([input]).size;
  const minifiedSize = output ? new Blob([output]).size : 0;
  const savings = originalSize > 0 && minifiedSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : '0';

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

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
    <ToolLayout title={t.title} description={t.description} toolId="html-minifier-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Options */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={removeComments} onChange={e => setRemoveComments(e.target.checked)} />
          {t.removeComments}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={removeWhitespace} onChange={e => setRemoveWhitespace(e.target.checked)} />
          {t.removeWhitespace}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={removeEmptyAttrs} onChange={e => setRemoveEmptyAttrs(e.target.checked)} />
          {t.removeEmptyAttrs}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={removeOptionalTags} onChange={e => setRemoveOptionalTags(e.target.checked)} />
          {t.removeOptionalTags}
        </label>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleMinify} className="btn btn-primary">{t.minifyBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={() => { setInput(SAMPLE_HTML); setOutput(''); }} className="btn btn-secondary">{t.loadSample}</button>
      </div>

      {/* Stats */}
      {output && (
        <div style={{ display: 'flex', gap: 20, padding: '10px 16px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, marginBottom: 16, fontSize: 13, flexWrap: 'wrap' }}>
          <div><span style={{ color: 'var(--text-secondary)' }}>{t.originalSize}: </span><strong>{formatSize(originalSize)}</strong></div>
          <div><span style={{ color: 'var(--text-secondary)' }}>{t.minifiedSize}: </span><strong>{formatSize(minifiedSize)}</strong></div>
          <div><span style={{ color: 'var(--text-secondary)' }}>{t.savings}: </span><strong style={{ color: 'var(--accent-green, #10b981)' }}>{savings}%</strong></div>
        </div>
      )}

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      {/* Output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
          {output && <CopyButton text={output} />}
        </div>
        <textarea value={output} readOnly style={{ minHeight: 120, fontFamily: 'monospace', fontSize: 13 }} />
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
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.ruleCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.descCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.exampleCol}</th>
              </tr>
            </thead>
            <tbody>
              {[[t.rule1, t.rule1Desc, t.rule1Ex], [t.rule2, t.rule2Desc, t.rule2Ex], [t.rule3, t.rule3Desc, t.rule3Ex], [t.rule4, t.rule4Desc, t.rule4Ex], [t.rule5, t.rule5Desc, t.rule5Ex]].map(([r, d, e], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{r}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{d}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/html-formatter`, label: 'HTML Formatter' },
            { href: `/${lang}/tools/html-to-markdown`, label: 'HTML to Markdown' },
            { href: `/${lang}/tools/html-entity`, label: 'HTML Entity Encoder' },
            { href: `/${lang}/tools/css-minifier`, label: 'CSS Minifier' },
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
