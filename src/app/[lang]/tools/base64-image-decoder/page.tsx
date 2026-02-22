'use client';

import { useState, useCallback, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 Image Decoder & Encoder',
    description: 'Decode Base64 strings to images and encode images to Base64. Drag and drop images or paste Base64 strings for instant conversion.',
    decodeTab: 'Base64 to Image',
    encodeTab: 'Image to Base64',
    pasteLabel: 'Paste Base64 or Data URI',
    pastePlaceholder: 'Paste a Base64 string or data:image/...;base64,... here',
    decodeBtn: 'Decode',
    clear: 'Clear',
    dropText: 'Drop an image here or click to select',
    supported: 'Supports PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'File',
    fileSize: 'Size',
    fileType: 'Type',
    b64Length: 'Base64 length',
    chars: 'chars',
    b64String: 'Base64 String',
    dataUri: 'Data URI',
    htmlTag: 'HTML <img> Tag',
    cssBg: 'CSS Background',
    downloadBtn: 'Download Image',
    imageInfo: 'Image Info',
    width: 'Width',
    height: 'Height',
    introTitle: 'Free Base64 Image Decoder & Encoder Online',
    introText: 'Decode Base64 strings to preview images or encode images to Base64 for embedding in HTML, CSS, or JSON. Drag and drop any image file or paste a Base64 string. All processing happens in your browser with zero server uploads.',
    howTitle: 'How to Use',
    step1: 'To decode: Paste a Base64 string or data URI, then click Decode to see the image',
    step2: 'To encode: Drop an image file or click to select, and get the Base64 output instantly',
    step3: 'Copy the Base64 string, Data URI, HTML tag, or CSS background snippet',
    step4: 'Download the decoded image or use the encoded string in your code',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is Base64 image decoding?',
    faq1a: 'Base64 image decoding converts a Base64-encoded text string back into its original binary image data. This allows you to preview and download images that were embedded as Base64 strings in HTML, CSS, emails, or API responses.',
    faq2q: 'What image formats are supported?',
    faq2a: 'This tool supports all common image formats including PNG, JPEG, GIF, SVG, WebP, BMP, and ICO. The format is auto-detected from the data URI prefix or file header when encoding.',
    faq3q: 'What is the maximum file size?',
    faq3a: 'Since all processing happens in your browser, the limit depends on your available memory. Typically, images up to 10-20 MB work smoothly. For very large images, the encoding may take a moment.',
    faq4q: 'Is my data sent to a server?',
    faq4a: 'No. All encoding and decoding happens entirely in your browser using JavaScript. Your images and Base64 strings never leave your device.',
    faq5q: 'How do I embed a Base64 image in HTML?',
    faq5a: 'Use the Data URI format in an img tag: <img src="data:image/png;base64,..." />. This tool provides ready-to-use HTML and CSS snippets. Base64 images are best for small icons and logos under 10 KB.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Base64 图片解码器和编码器',
    description: '将 Base64 字符串解码为图片，或将图片编码为 Base64。拖放图片或粘贴 Base64 字符串即时转换。',
    decodeTab: 'Base64 转图片',
    encodeTab: '图片转 Base64',
    pasteLabel: '粘贴 Base64 或 Data URI',
    pastePlaceholder: '粘贴 Base64 字符串或 data:image/...;base64,... 到这里',
    decodeBtn: '解码',
    clear: '清除',
    dropText: '拖放图片到此处或点击选择',
    supported: '支持 PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: '文件',
    fileSize: '大小',
    fileType: '类型',
    b64Length: 'Base64 长度',
    chars: '字符',
    b64String: 'Base64 字符串',
    dataUri: 'Data URI',
    htmlTag: 'HTML <img> 标签',
    cssBg: 'CSS 背景',
    downloadBtn: '下载图片',
    imageInfo: '图片信息',
    width: '宽度',
    height: '高度',
    introTitle: '免费在线 Base64 图片解码器和编码器',
    introText: '将 Base64 字符串解码为预览图片，或将图片编码为 Base64 用于 HTML、CSS 或 JSON 嵌入。拖放任何图片文件或粘贴 Base64 字符串。所有处理在浏览器中完成。',
    howTitle: '使用方法',
    step1: '解码：粘贴 Base64 字符串或 Data URI，点击解码查看图片',
    step2: '编码：拖放图片文件或点击选择，即时获取 Base64 输出',
    step3: '复制 Base64 字符串、Data URI、HTML 标签或 CSS 背景代码',
    step4: '下载解码后的图片或在代码中使用编码字符串',
    faqTitle: '常见问题',
    faq1q: '什么是 Base64 图片解码？',
    faq1a: 'Base64 图片解码将 Base64 编码的文本字符串转换回原始二进制图片数据。这允许你预览和下载嵌入在 HTML、CSS、邮件或 API 响应中的 Base64 字符串图片。',
    faq2q: '支持哪些图片格式？',
    faq2a: '支持所有常见图片格式，包括 PNG、JPEG、GIF、SVG、WebP、BMP 和 ICO。格式从 Data URI 前缀或文件头自动检测。',
    faq3q: '最大文件大小是多少？',
    faq3a: '由于所有处理在浏览器中进行，限制取决于可用内存。通常 10-20 MB 的图片可以正常处理。',
    faq4q: '数据会发送到服务器吗？',
    faq4a: '不会。所有编码和解码完全在浏览器中使用 JavaScript 进行。你的图片和 Base64 字符串永远不会离开你的设备。',
    faq5q: '如何在 HTML 中嵌入 Base64 图片？',
    faq5a: '在 img 标签中使用 Data URI 格式。本工具提供即用的 HTML 和 CSS 代码片段。Base64 图片最适合 10 KB 以下的小图标和 Logo。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'Base64 画像デコーダー＆エンコーダー',
    description: 'Base64文字列を画像にデコード、画像をBase64にエンコード。ドラッグ＆ドロップまたは貼り付けで即座に変換。',
    decodeTab: 'Base64 → 画像',
    encodeTab: '画像 → Base64',
    pasteLabel: 'Base64またはData URIを貼り付け',
    pastePlaceholder: 'Base64文字列またはdata:image/...;base64,...をここに貼り付け',
    decodeBtn: 'デコード',
    clear: 'クリア',
    dropText: '画像をここにドロップまたはクリックして選択',
    supported: 'PNG, JPG, GIF, SVG, WebP, BMP, ICO 対応',
    fileName: 'ファイル', fileSize: 'サイズ', fileType: 'タイプ',
    b64Length: 'Base64長さ', chars: '文字',
    b64String: 'Base64文字列', dataUri: 'Data URI', htmlTag: 'HTML <img> タグ', cssBg: 'CSS背景',
    downloadBtn: '画像をダウンロード', imageInfo: '画像情報', width: '幅', height: '高さ',
    introTitle: '無料オンラインBase64画像デコーダー＆エンコーダー',
    introText: 'Base64文字列を画像にデコード、または画像をBase64にエンコードしてHTML、CSS、JSONに埋め込み。すべての処理はブラウザ内で完結。',
    howTitle: '使い方',
    step1: 'デコード：Base64文字列またはData URIを貼り付けて、デコードをクリック',
    step2: 'エンコード：画像ファイルをドロップまたはクリックして選択、即座にBase64出力を取得',
    step3: 'Base64文字列、Data URI、HTMLタグ、CSS背景スニペットをコピー',
    step4: 'デコードした画像をダウンロード、またはコードにエンコード文字列を使用',
    faqTitle: 'よくある質問',
    faq1q: 'Base64画像デコードとは？', faq1a: 'Base64エンコードされたテキスト文字列を元のバイナリ画像データに変換します。HTML、CSS、メール、APIレスポンスに埋め込まれた画像を表示・ダウンロードできます。',
    faq2q: 'どの画像形式に対応？', faq2a: 'PNG、JPEG、GIF、SVG、WebP、BMP、ICOなど主要な形式すべてに対応。Data URIプレフィックスまたはファイルヘッダーから自動検出。',
    faq3q: '最大ファイルサイズは？', faq3a: 'ブラウザ内で処理するため、利用可能メモリに依存します。通常10〜20MBの画像は問題なく処理可能。',
    faq4q: 'データはサーバーに送信される？', faq4a: 'いいえ、すべてのエンコード・デコードはブラウザ内のJavaScriptで行われます。',
    faq5q: 'HTMLにBase64画像を埋め込むには？', faq5a: 'imgタグにData URI形式を使用。このツールでHTML・CSSスニペットを即座に取得できます。10KB以下の小アイコンに最適。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Base64 이미지 디코더 & 인코더',
    description: 'Base64 문자열을 이미지로 디코딩하고, 이미지를 Base64로 인코딩합니다. 드래그 앤 드롭 또는 붙여넣기로 즉시 변환.',
    decodeTab: 'Base64 → 이미지',
    encodeTab: '이미지 → Base64',
    pasteLabel: 'Base64 또는 Data URI 붙여넣기',
    pastePlaceholder: 'Base64 문자열 또는 data:image/...;base64,...를 여기에 붙여넣으세요',
    decodeBtn: '디코딩', clear: '지우기',
    dropText: '이미지를 여기에 드롭하거나 클릭하여 선택',
    supported: 'PNG, JPG, GIF, SVG, WebP, BMP, ICO 지원',
    fileName: '파일', fileSize: '크기', fileType: '유형',
    b64Length: 'Base64 길이', chars: '문자',
    b64String: 'Base64 문자열', dataUri: 'Data URI', htmlTag: 'HTML <img> 태그', cssBg: 'CSS 배경',
    downloadBtn: '이미지 다운로드', imageInfo: '이미지 정보', width: '너비', height: '높이',
    introTitle: '무료 온라인 Base64 이미지 디코더 & 인코더',
    introText: 'Base64 문자열을 이미지로 디코딩하거나, 이미지를 Base64로 인코딩하여 HTML, CSS, JSON에 삽입하세요. 모든 처리는 브라우저에서 수행됩니다.',
    howTitle: '사용 방법',
    step1: '디코딩: Base64 문자열 또는 Data URI를 붙여넣고 디코딩 클릭',
    step2: '인코딩: 이미지 파일을 드롭하거나 클릭하여 선택, 즉시 Base64 출력 획득',
    step3: 'Base64 문자열, Data URI, HTML 태그, CSS 배경 스니펫 복사',
    step4: '디코딩된 이미지를 다운로드하거나 코드에 인코딩 문자열 사용',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Base64 이미지 디코딩이란?', faq1a: 'Base64로 인코딩된 텍스트 문자열을 원래 바이너리 이미지 데이터로 변환합니다. HTML, CSS, 이메일, API 응답에 포함된 이미지를 미리보기하고 다운로드할 수 있습니다.',
    faq2q: '어떤 이미지 형식을 지원하나요?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP, ICO 등 모든 일반 이미지 형식을 지원합니다.',
    faq3q: '최대 파일 크기는?', faq3a: '브라우저에서 처리하므로 사용 가능한 메모리에 따라 다릅니다. 보통 10-20MB 이미지는 원활하게 처리됩니다.',
    faq4q: '데이터가 서버로 전송되나요?', faq4a: '아니요, 모든 인코딩/디코딩은 브라우저의 JavaScript로 수행됩니다.',
    faq5q: 'HTML에 Base64 이미지를 삽입하려면?', faq5a: 'img 태그에 Data URI 형식을 사용하세요. 이 도구에서 HTML과 CSS 스니펫을 바로 복사할 수 있습니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Decodeur et Encodeur Image Base64',
    description: 'Decodez des chaines Base64 en images et encodez des images en Base64. Glissez-deposez ou collez pour une conversion instantanee.',
    decodeTab: 'Base64 vers Image', encodeTab: 'Image vers Base64',
    pasteLabel: 'Collez Base64 ou Data URI', pastePlaceholder: 'Collez une chaine Base64 ou data:image/...;base64,...',
    decodeBtn: 'Decoder', clear: 'Effacer',
    dropText: 'Deposez une image ici ou cliquez pour selectionner', supported: 'Supporte PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'Fichier', fileSize: 'Taille', fileType: 'Type', b64Length: 'Longueur Base64', chars: 'caracteres',
    b64String: 'Chaine Base64', dataUri: 'Data URI', htmlTag: 'Balise HTML <img>', cssBg: 'CSS Background',
    downloadBtn: 'Telecharger image', imageInfo: 'Info image', width: 'Largeur', height: 'Hauteur',
    introTitle: 'Decodeur et Encodeur Image Base64 Gratuit',
    introText: 'Decodez des chaines Base64 en images ou encodez des images en Base64 pour HTML, CSS ou JSON. Tout se passe dans votre navigateur.',
    howTitle: 'Comment utiliser',
    step1: 'Decoder : Collez une chaine Base64, cliquez Decoder pour voir l\'image',
    step2: "Encoder : Deposez une image ou cliquez pour selectionner",
    step3: 'Copiez la chaine Base64, Data URI, balise HTML ou CSS',
    step4: "Telechargez l'image decodee ou utilisez la chaine encodee",
    faqTitle: 'Questions frequentes',
    faq1q: "Qu'est-ce que le decodage d'image Base64 ?", faq1a: "Le decodage convertit une chaine Base64 en donnees binaires d'image originales pour l'apercu et le telechargement.",
    faq2q: 'Quels formats sont supportes ?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP et ICO. Le format est auto-detecte.',
    faq3q: 'Quelle est la taille maximale ?', faq3a: 'La limite depend de votre memoire disponible. Typiquement jusqu\'a 10-20 Mo.',
    faq4q: 'Mes donnees sont-elles envoyees a un serveur ?', faq4a: 'Non, tout se passe dans votre navigateur avec JavaScript.',
    faq5q: 'Comment integrer une image Base64 en HTML ?', faq5a: 'Utilisez le format Data URI dans une balise img. Cet outil fournit des snippets HTML et CSS prets a l\'emploi.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Base64 Bild Decoder & Encoder',
    description: 'Dekodieren Sie Base64-Strings zu Bildern und kodieren Sie Bilder zu Base64. Drag & Drop oder Einfuegen fuer sofortige Konvertierung.',
    decodeTab: 'Base64 zu Bild', encodeTab: 'Bild zu Base64',
    pasteLabel: 'Base64 oder Data URI einfuegen', pastePlaceholder: 'Base64-String oder data:image/...;base64,... einfuegen',
    decodeBtn: 'Dekodieren', clear: 'Loeschen',
    dropText: 'Bild hierher ziehen oder klicken zum Auswaehlen', supported: 'Unterstuetzt PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'Datei', fileSize: 'Groesse', fileType: 'Typ', b64Length: 'Base64-Laenge', chars: 'Zeichen',
    b64String: 'Base64-String', dataUri: 'Data URI', htmlTag: 'HTML <img> Tag', cssBg: 'CSS Hintergrund',
    downloadBtn: 'Bild herunterladen', imageInfo: 'Bildinformation', width: 'Breite', height: 'Hoehe',
    introTitle: 'Kostenloser Online Base64 Bild Decoder & Encoder',
    introText: 'Dekodieren Sie Base64-Strings zu Bildern oder kodieren Sie Bilder zu Base64 fuer HTML, CSS oder JSON. Alles laeuft in Ihrem Browser.',
    howTitle: 'So verwenden Sie das Tool',
    step1: 'Dekodieren: Base64-String einfuegen, Dekodieren klicken',
    step2: 'Kodieren: Bild per Drag & Drop oder Klick auswaehlen',
    step3: 'Base64-String, Data URI, HTML-Tag oder CSS kopieren',
    step4: 'Dekodiertes Bild herunterladen oder kodierten String verwenden',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist Base64-Bilddekodierung?', faq1a: 'Base64-Dekodierung konvertiert einen Base64-kodierten String zurueck in binaere Bilddaten zur Vorschau und zum Download.',
    faq2q: 'Welche Formate werden unterstuetzt?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP und ICO. Das Format wird automatisch erkannt.',
    faq3q: 'Was ist die maximale Dateigroesse?', faq3a: 'Die Grenze haengt von Ihrem verfuegbaren Speicher ab. Typischerweise bis zu 10-20 MB.',
    faq4q: 'Werden Daten an einen Server gesendet?', faq4a: 'Nein, alles laeuft in Ihrem Browser mit JavaScript.',
    faq5q: 'Wie bette ich ein Base64-Bild in HTML ein?', faq5a: 'Verwenden Sie das Data-URI-Format in einem img-Tag. Dieses Tool liefert fertige HTML- und CSS-Snippets.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Decodificador y Codificador de Imagen Base64',
    description: 'Decodifica cadenas Base64 a imagenes y codifica imagenes a Base64. Arrastra y suelta o pega para conversion instantanea.',
    decodeTab: 'Base64 a Imagen', encodeTab: 'Imagen a Base64',
    pasteLabel: 'Pegar Base64 o Data URI', pastePlaceholder: 'Pega una cadena Base64 o data:image/...;base64,...',
    decodeBtn: 'Decodificar', clear: 'Limpiar',
    dropText: 'Suelta una imagen aqui o haz clic para seleccionar', supported: 'Soporta PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'Archivo', fileSize: 'Tamano', fileType: 'Tipo', b64Length: 'Longitud Base64', chars: 'caracteres',
    b64String: 'Cadena Base64', dataUri: 'Data URI', htmlTag: 'Etiqueta HTML <img>', cssBg: 'CSS Background',
    downloadBtn: 'Descargar imagen', imageInfo: 'Info de imagen', width: 'Ancho', height: 'Alto',
    introTitle: 'Decodificador y Codificador de Imagen Base64 Gratuito',
    introText: 'Decodifica cadenas Base64 a imagenes o codifica imagenes a Base64 para HTML, CSS o JSON. Todo se procesa en tu navegador.',
    howTitle: 'Como usar', step1: 'Decodificar: Pega una cadena Base64, clic en Decodificar', step2: 'Codificar: Arrastra una imagen o clic para seleccionar',
    step3: 'Copia la cadena Base64, Data URI, etiqueta HTML o CSS', step4: 'Descarga la imagen decodificada o usa la cadena codificada',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la decodificacion de imagen Base64?', faq1a: 'Convierte una cadena Base64 de vuelta a datos binarios de imagen para vista previa y descarga.',
    faq2q: 'Que formatos se soportan?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP e ICO. El formato se detecta automaticamente.',
    faq3q: 'Cual es el tamano maximo?', faq3a: 'El limite depende de tu memoria disponible. Tipicamente hasta 10-20 MB.',
    faq4q: 'Se envian mis datos a un servidor?', faq4a: 'No, todo se procesa en tu navegador con JavaScript.',
    faq5q: 'Como incrustar una imagen Base64 en HTML?', faq5a: 'Usa el formato Data URI en una etiqueta img. Esta herramienta proporciona snippets HTML y CSS listos para usar.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Decodificador e Codificador de Imagem Base64', description: 'Decodifique strings Base64 em imagens e codifique imagens em Base64. Arraste e solte ou cole para conversao instantanea.',
    decodeTab: 'Base64 para Imagem', encodeTab: 'Imagem para Base64', pasteLabel: 'Colar Base64 ou Data URI', pastePlaceholder: 'Cole uma string Base64 ou data:image/...;base64,...',
    decodeBtn: 'Decodificar', clear: 'Limpar', dropText: 'Solte uma imagem aqui ou clique para selecionar', supported: 'Suporta PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'Arquivo', fileSize: 'Tamanho', fileType: 'Tipo', b64Length: 'Comprimento Base64', chars: 'caracteres',
    b64String: 'String Base64', dataUri: 'Data URI', htmlTag: 'Tag HTML <img>', cssBg: 'CSS Background',
    downloadBtn: 'Baixar imagem', imageInfo: 'Info da imagem', width: 'Largura', height: 'Altura',
    introTitle: 'Decodificador e Codificador de Imagem Base64 Gratuito', introText: 'Decodifique strings Base64 para imagens ou codifique imagens para Base64 para HTML, CSS ou JSON. Processamento no navegador.',
    howTitle: 'Como usar', step1: 'Decodificar: Cole uma string Base64, clique em Decodificar', step2: 'Codificar: Arraste uma imagem ou clique para selecionar',
    step3: 'Copie a string Base64, Data URI, tag HTML ou CSS', step4: 'Baixe a imagem decodificada ou use a string codificada',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e decodificacao de imagem Base64?', faq1a: 'Converte uma string Base64 de volta para dados binarios de imagem para visualizacao e download.',
    faq2q: 'Quais formatos sao suportados?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP e ICO. O formato e detectado automaticamente.',
    faq3q: 'Qual o tamanho maximo?', faq3a: 'O limite depende da memoria disponivel. Tipicamente ate 10-20 MB.',
    faq4q: 'Meus dados sao enviados a um servidor?', faq4a: 'Nao, tudo e processado no navegador com JavaScript.',
    faq5q: 'Como incorporar imagem Base64 em HTML?', faq5a: 'Use o formato Data URI em uma tag img. Esta ferramenta fornece snippets HTML e CSS prontos.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Decodificatore e Codificatore Immagini Base64', description: 'Decodifica stringhe Base64 in immagini e codifica immagini in Base64. Trascina e rilascia o incolla per conversione istantanea.',
    decodeTab: 'Base64 in Immagine', encodeTab: 'Immagine in Base64', pasteLabel: 'Incolla Base64 o Data URI', pastePlaceholder: 'Incolla una stringa Base64 o data:image/...;base64,...',
    decodeBtn: 'Decodifica', clear: 'Cancella', dropText: 'Rilascia un\'immagine qui o clicca per selezionare', supported: 'Supporta PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'File', fileSize: 'Dimensione', fileType: 'Tipo', b64Length: 'Lunghezza Base64', chars: 'caratteri',
    b64String: 'Stringa Base64', dataUri: 'Data URI', htmlTag: 'Tag HTML <img>', cssBg: 'CSS Background',
    downloadBtn: 'Scarica immagine', imageInfo: 'Info immagine', width: 'Larghezza', height: 'Altezza',
    introTitle: 'Decodificatore e Codificatore Immagini Base64 Gratuito', introText: 'Decodifica stringhe Base64 in immagini o codifica immagini in Base64 per HTML, CSS o JSON. Tutto nel browser.',
    howTitle: 'Come usare', step1: 'Decodifica: Incolla una stringa Base64, clicca Decodifica', step2: 'Codifica: Trascina un\'immagine o clicca per selezionare',
    step3: 'Copia la stringa Base64, Data URI, tag HTML o CSS', step4: 'Scarica l\'immagine decodificata o usa la stringa codificata',
    faqTitle: 'Domande frequenti',
    faq1q: "Cos'e la decodifica immagine Base64?", faq1a: 'Converte una stringa Base64 nei dati binari originali dell\'immagine per anteprima e download.',
    faq2q: 'Quali formati sono supportati?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP e ICO. Il formato e rilevato automaticamente.',
    faq3q: 'Qual e la dimensione massima?', faq3a: 'Il limite dipende dalla memoria disponibile. Tipicamente fino a 10-20 MB.',
    faq4q: 'I dati vengono inviati a un server?', faq4a: 'No, tutto avviene nel browser con JavaScript.',
    faq5q: 'Come incorporare un\'immagine Base64 in HTML?', faq5a: 'Usa il formato Data URI in un tag img. Questo strumento fornisce snippet HTML e CSS pronti all\'uso.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'Base64 Afbeelding Decoder & Encoder', description: 'Decodeer Base64 strings naar afbeeldingen en codeer afbeeldingen naar Base64. Sleep en plak voor directe conversie.',
    decodeTab: 'Base64 naar Afbeelding', encodeTab: 'Afbeelding naar Base64', pasteLabel: 'Plak Base64 of Data URI', pastePlaceholder: 'Plak een Base64 string of data:image/...;base64,...',
    decodeBtn: 'Decoderen', clear: 'Wissen', dropText: 'Sleep een afbeelding hierheen of klik om te selecteren', supported: 'Ondersteunt PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'Bestand', fileSize: 'Grootte', fileType: 'Type', b64Length: 'Base64 lengte', chars: 'tekens',
    b64String: 'Base64 String', dataUri: 'Data URI', htmlTag: 'HTML <img> Tag', cssBg: 'CSS Achtergrond',
    downloadBtn: 'Afbeelding downloaden', imageInfo: 'Afbeelding info', width: 'Breedte', height: 'Hoogte',
    introTitle: 'Gratis Online Base64 Afbeelding Decoder & Encoder', introText: 'Decodeer Base64 strings naar afbeeldingen of codeer afbeeldingen naar Base64 voor HTML, CSS of JSON. Alles in uw browser.',
    howTitle: 'Hoe te gebruiken', step1: 'Decoderen: Plak een Base64 string, klik Decoderen', step2: 'Coderen: Sleep een afbeelding of klik om te selecteren',
    step3: 'Kopieer de Base64 string, Data URI, HTML tag of CSS', step4: 'Download de gedecodeerde afbeelding of gebruik de gecodeerde string',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is Base64 afbeelding decodering?', faq1a: 'Converteert een Base64 string terug naar originele binaire beeldgegevens voor voorbeeld en download.',
    faq2q: 'Welke formaten worden ondersteund?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP en ICO. Het formaat wordt automatisch gedetecteerd.',
    faq3q: 'Wat is de maximale bestandsgrootte?', faq3a: 'De limiet hangt af van uw beschikbaar geheugen. Meestal tot 10-20 MB.',
    faq4q: 'Worden mijn gegevens naar een server gestuurd?', faq4a: 'Nee, alles gebeurt in uw browser met JavaScript.',
    faq5q: 'Hoe een Base64 afbeelding in HTML opnemen?', faq5a: 'Gebruik het Data URI formaat in een img tag. Deze tool biedt kant-en-klare HTML en CSS snippets.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Dekoder i Koder Obrazow Base64', description: 'Dekoduj ciagi Base64 na obrazy i koduj obrazy na Base64. Przeciagnij i upusc lub wklej do natychmiastowej konwersji.',
    decodeTab: 'Base64 na Obraz', encodeTab: 'Obraz na Base64', pasteLabel: 'Wklej Base64 lub Data URI', pastePlaceholder: 'Wklej ciag Base64 lub data:image/...;base64,...',
    decodeBtn: 'Dekoduj', clear: 'Wyczysc', dropText: 'Upusc obraz tutaj lub kliknij aby wybrac', supported: 'Obsluguje PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'Plik', fileSize: 'Rozmiar', fileType: 'Typ', b64Length: 'Dlugosc Base64', chars: 'znakow',
    b64String: 'Ciag Base64', dataUri: 'Data URI', htmlTag: 'Tag HTML <img>', cssBg: 'CSS Background',
    downloadBtn: 'Pobierz obraz', imageInfo: 'Info o obrazie', width: 'Szerokosc', height: 'Wysokosc',
    introTitle: 'Darmowy Dekoder i Koder Obrazow Base64 Online', introText: 'Dekoduj ciagi Base64 na obrazy lub koduj obrazy na Base64 dla HTML, CSS lub JSON. Wszystko w przegladarce.',
    howTitle: 'Jak uzywac', step1: 'Dekodowanie: Wklej ciag Base64, kliknij Dekoduj', step2: 'Kodowanie: Przeciagnij obraz lub kliknij aby wybrac',
    step3: 'Kopiuj ciag Base64, Data URI, tag HTML lub CSS', step4: 'Pobierz zdekodowany obraz lub uzyj zakodowanego ciagu',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Co to jest dekodowanie obrazow Base64?', faq1a: 'Konwertuje ciag Base64 z powrotem na oryginalne dane binarne obrazu do podgladu i pobrania.',
    faq2q: 'Jakie formaty sa obslugiwane?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP i ICO. Format jest wykrywany automatycznie.',
    faq3q: 'Jaki jest maksymalny rozmiar pliku?', faq3a: 'Limit zalezy od dostepnej pamieci. Typowo do 10-20 MB.',
    faq4q: 'Czy dane sa wysylane na serwer?', faq4a: 'Nie, wszystko odbywa sie w przegladarce za pomoca JavaScript.',
    faq5q: 'Jak osadzic obraz Base64 w HTML?', faq5a: 'Uzyj formatu Data URI w tagu img. To narzedzie dostarcza gotowe snippety HTML i CSS.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Base64 Bild Avkodare & Kodare', description: 'Avkoda Base64-strangar till bilder och koda bilder till Base64. Dra och slapp eller klistra in for omedelbar konvertering.',
    decodeTab: 'Base64 till Bild', encodeTab: 'Bild till Base64', pasteLabel: 'Klistra in Base64 eller Data URI', pastePlaceholder: 'Klistra in en Base64-strang eller data:image/...;base64,...',
    decodeBtn: 'Avkoda', clear: 'Rensa', dropText: 'Slapp en bild har eller klicka for att valja', supported: 'Stodjer PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'Fil', fileSize: 'Storlek', fileType: 'Typ', b64Length: 'Base64-langd', chars: 'tecken',
    b64String: 'Base64-strang', dataUri: 'Data URI', htmlTag: 'HTML <img> Tagg', cssBg: 'CSS Bakgrund',
    downloadBtn: 'Ladda ner bild', imageInfo: 'Bildinformation', width: 'Bredd', height: 'Hojd',
    introTitle: 'Gratis Base64 Bild Avkodare & Kodare Online', introText: 'Avkoda Base64-strangar till bilder eller koda bilder till Base64 for HTML, CSS eller JSON. Allt i din webblasare.',
    howTitle: 'Hur man anvander', step1: 'Avkoda: Klistra in en Base64-strang, klicka Avkoda', step2: 'Koda: Dra en bild eller klicka for att valja',
    step3: 'Kopiera Base64-strangen, Data URI, HTML-tagg eller CSS', step4: 'Ladda ner den avkodade bilden eller anvand den kodade strangen',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad ar Base64 bildavkodning?', faq1a: 'Konverterar en Base64-strang tillbaka till originala binara bilddata for forhandsgranskning och nedladdning.',
    faq2q: 'Vilka format stods?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP och ICO. Formatet detekteras automatiskt.',
    faq3q: 'Vad ar den maximala filstorleken?', faq3a: 'Gransen beror pa ditt tillgangliga minne. Typiskt upp till 10-20 MB.',
    faq4q: 'Skickas mina data till en server?', faq4a: 'Nej, allt sker i din webblasare med JavaScript.',
    faq5q: 'Hur baddar jag in en Base64-bild i HTML?', faq5a: 'Anvand Data URI-formatet i en img-tagg. Detta verktyg ger fardiga HTML- och CSS-snippets.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Base64 Bilde Dekoder & Koder', description: 'Dekod Base64-strenger til bilder og kod bilder til Base64. Dra og slipp eller lim inn for umiddelbar konvertering.',
    decodeTab: 'Base64 til Bilde', encodeTab: 'Bilde til Base64', pasteLabel: 'Lim inn Base64 eller Data URI', pastePlaceholder: 'Lim inn en Base64-streng eller data:image/...;base64,...',
    decodeBtn: 'Dekod', clear: 'Toom', dropText: 'Slipp et bilde her eller klikk for a velge', supported: 'Stotter PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'Fil', fileSize: 'Storrelse', fileType: 'Type', b64Length: 'Base64-lengde', chars: 'tegn',
    b64String: 'Base64-streng', dataUri: 'Data URI', htmlTag: 'HTML <img> Tag', cssBg: 'CSS Bakgrunn',
    downloadBtn: 'Last ned bilde', imageInfo: 'Bildeinformasjon', width: 'Bredde', height: 'Hoyde',
    introTitle: 'Gratis Base64 Bilde Dekoder & Koder Online', introText: 'Dekod Base64-strenger til bilder eller kod bilder til Base64 for HTML, CSS eller JSON. Alt i nettleseren din.',
    howTitle: 'Slik bruker du', step1: 'Dekod: Lim inn en Base64-streng, klikk Dekod', step2: 'Kod: Dra et bilde eller klikk for a velge',
    step3: 'Kopier Base64-strengen, Data URI, HTML-tag eller CSS', step4: 'Last ned det dekodede bildet eller bruk den kodede strengen',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hva er Base64 bildedekoding?', faq1a: 'Konverterer en Base64-streng tilbake til originale binaere bildedata for forhandsvisning og nedlasting.',
    faq2q: 'Hvilke formater stettes?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP og ICO. Formatet oppdages automatisk.',
    faq3q: 'Hva er den maksimale filstorrelsen?', faq3a: 'Grensen avhenger av tilgjengelig minne. Typisk opp til 10-20 MB.',
    faq4q: 'Sendes dataene mine til en server?', faq4a: 'Nei, alt skjer i nettleseren din med JavaScript.',
    faq5q: 'Hvordan bygge inn et Base64-bilde i HTML?', faq5a: 'Bruk Data URI-formatet i en img-tag. Dette verktooyet gir ferdige HTML- og CSS-snippets.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Dekoder & Enkoder Gambar Base64', description: 'Dekode string Base64 menjadi gambar dan enkode gambar menjadi Base64. Seret dan lepas atau tempel untuk konversi instan.',
    decodeTab: 'Base64 ke Gambar', encodeTab: 'Gambar ke Base64', pasteLabel: 'Tempel Base64 atau Data URI', pastePlaceholder: 'Tempel string Base64 atau data:image/...;base64,...',
    decodeBtn: 'Dekode', clear: 'Hapus', dropText: 'Lepas gambar di sini atau klik untuk memilih', supported: 'Mendukung PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'File', fileSize: 'Ukuran', fileType: 'Tipe', b64Length: 'Panjang Base64', chars: 'karakter',
    b64String: 'String Base64', dataUri: 'Data URI', htmlTag: 'Tag HTML <img>', cssBg: 'CSS Background',
    downloadBtn: 'Unduh gambar', imageInfo: 'Info gambar', width: 'Lebar', height: 'Tinggi',
    introTitle: 'Dekoder & Enkoder Gambar Base64 Online Gratis', introText: 'Dekode string Base64 menjadi gambar atau enkode gambar menjadi Base64 untuk HTML, CSS, atau JSON. Semua di browser Anda.',
    howTitle: 'Cara menggunakan', step1: 'Dekode: Tempel string Base64, klik Dekode', step2: 'Enkode: Seret gambar atau klik untuk memilih',
    step3: 'Salin string Base64, Data URI, tag HTML atau CSS', step4: 'Unduh gambar yang didekode atau gunakan string yang dienkode',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu dekoding gambar Base64?', faq1a: 'Mengonversi string Base64 kembali ke data biner gambar asli untuk pratinjau dan unduhan.',
    faq2q: 'Format apa yang didukung?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP dan ICO. Format terdeteksi otomatis.',
    faq3q: 'Berapa ukuran file maksimum?', faq3a: 'Batas tergantung pada memori yang tersedia. Biasanya hingga 10-20 MB.',
    faq4q: 'Apakah data dikirim ke server?', faq4a: 'Tidak, semuanya terjadi di browser dengan JavaScript.',
    faq5q: 'Bagaimana menyematkan gambar Base64 di HTML?', faq5a: 'Gunakan format Data URI dalam tag img. Alat ini menyediakan snippet HTML dan CSS siap pakai.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวถอดรหัสและเข้ารหัสภาพ Base64', description: 'ถอดรหัสสตริง Base64 เป็นรูปภาพและเข้ารหัสรูปภาพเป็น Base64 ลากและวางหรือวางสำหรับการแปลงทันที',
    decodeTab: 'Base64 เป็นรูปภาพ', encodeTab: 'รูปภาพเป็น Base64', pasteLabel: 'วาง Base64 หรือ Data URI', pastePlaceholder: 'วางสตริง Base64 หรือ data:image/...;base64,...',
    decodeBtn: 'ถอดรหัส', clear: 'ล้าง', dropText: 'วางรูปภาพที่นี่หรือคลิกเพื่อเลือก', supported: 'รองรับ PNG, JPG, GIF, SVG, WebP, BMP, ICO',
    fileName: 'ไฟล์', fileSize: 'ขนาด', fileType: 'ชนิด', b64Length: 'ความยาว Base64', chars: 'ตัวอักษร',
    b64String: 'สตริง Base64', dataUri: 'Data URI', htmlTag: 'แท็ก HTML <img>', cssBg: 'CSS Background',
    downloadBtn: 'ดาวน์โหลดรูปภาพ', imageInfo: 'ข้อมูลรูปภาพ', width: 'ความกว้าง', height: 'ความสูง',
    introTitle: 'ตัวถอดรหัสและเข้ารหัสภาพ Base64 ออนไลน์ฟรี', introText: 'ถอดรหัสสตริง Base64 เป็นรูปภาพหรือเข้ารหัสรูปภาพเป็น Base64 สำหรับ HTML, CSS หรือ JSON ทุกอย่างในเบราว์เซอร์ของคุณ',
    howTitle: 'วิธีใช้', step1: 'ถอดรหัส: วางสตริง Base64 คลิกถอดรหัส', step2: 'เข้ารหัส: ลากรูปภาพหรือคลิกเพื่อเลือก',
    step3: 'คัดลอกสตริง Base64, Data URI, แท็ก HTML หรือ CSS', step4: 'ดาวน์โหลดรูปภาพที่ถอดรหัสหรือใช้สตริงที่เข้ารหัส',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การถอดรหัสภาพ Base64 คืออะไร?', faq1a: 'แปลงสตริง Base64 กลับเป็นข้อมูลไบนารีภาพดั้งเดิมเพื่อดูตัวอย่างและดาวน์โหลด',
    faq2q: 'รองรับรูปแบบใดบ้าง?', faq2a: 'PNG, JPEG, GIF, SVG, WebP, BMP และ ICO รูปแบบจะตรวจจับอัตโนมัติ',
    faq3q: 'ขนาดไฟล์สูงสุดเท่าไร?', faq3a: 'ขีดจำกัดขึ้นอยู่กับหน่วยความจำที่มีอยู่ โดยทั่วไปถึง 10-20 MB',
    faq4q: 'ข้อมูลถูกส่งไปยังเซิร์ฟเวอร์หรือไม่?', faq4a: 'ไม่ ทุกอย่างเกิดขึ้นในเบราว์เซอร์ด้วย JavaScript',
    faq5q: 'วิธีฝังรูปภาพ Base64 ใน HTML?', faq5a: 'ใช้รูปแบบ Data URI ในแท็ก img เครื่องมือนี้ให้สนิปเปต HTML และ CSS พร้อมใช้งาน',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function Base64ImageDecoder() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [mode, setMode] = useState<'decode' | 'encode'>('decode');
  const [decodeInput, setDecodeInput] = useState('');
  const [decodedPreview, setDecodedPreview] = useState('');
  const [imageSize, setImageSize] = useState<{ w: number; h: number } | null>(null);
  const [base64, setBase64] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [mimeType, setMimeType] = useState('');
  const [preview, setPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDecode = useCallback(() => {
    let input = decodeInput.trim();
    if (!input) return;
    let dataUri: string;
    if (input.startsWith('data:image')) {
      dataUri = input;
    } else {
      dataUri = `data:image/png;base64,${input}`;
    }
    setDecodedPreview(dataUri);
    const img = new Image();
    img.onload = () => setImageSize({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => setImageSize(null);
    img.src = dataUri;
  }, [decodeInput]);

  const handleDownload = useCallback(() => {
    if (!decodedPreview) return;
    const a = document.createElement('a');
    a.href = decodedPreview;
    const ext = decodedPreview.match(/data:image\/(\w+)/)?.[1] || 'png';
    a.download = `decoded-image.${ext}`;
    a.click();
  }, [decodedPreview]);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      setBase64(result.split(',')[1] || '');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const dataUri = preview;
  const cssSnippet = preview ? `background-image: url('${preview}');` : '';
  const htmlSnippet = preview ? `<img src="${preview}" alt="${fileName}" />` : '';

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
    <ToolLayout title={t.title} description={t.description} toolId="base64-image-decoder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-input)', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {(['decode', 'encode'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: '6px 18px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: mode === m ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'transparent',
            color: mode === m ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
          }}>
            {m === 'decode' ? t.decodeTab : t.encodeTab}
          </button>
        ))}
      </div>

      {mode === 'decode' ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.pasteLabel}</label>
            <textarea value={decodeInput} onChange={e => setDecodeInput(e.target.value)}
              placeholder={t.pastePlaceholder} style={{ minHeight: 180, fontFamily: 'monospace', fontSize: 12 }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button onClick={handleDecode} className="btn btn-primary">{t.decodeBtn}</button>
            <button onClick={() => { setDecodeInput(''); setDecodedPreview(''); setImageSize(null); }} className="btn btn-secondary">{t.clear}</button>
          </div>
          {decodedPreview && (
            <div style={{ background: 'var(--bg-input)', borderRadius: 12, padding: 24, border: '1px solid var(--border-color)' }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={decodedPreview} alt="Decoded" style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8 }}
                  onError={() => setDecodedPreview('')} />
              </div>
              {imageSize && (
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 12 }}>
                  <strong>{t.imageInfo}:</strong> {t.width}: {imageSize.w}px, {t.height}: {imageSize.h}px
                </div>
              )}
              <div style={{ textAlign: 'center' }}>
                <button onClick={handleDownload} className="btn btn-primary" style={{ fontSize: 13 }}>{t.downloadBtn}</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${isDragging ? 'var(--accent-blue)' : 'var(--border-color)'}`,
              borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer',
              transition: 'all 0.2s', background: isDragging ? 'rgba(59,130,246,0.05)' : 'var(--bg-input)', marginBottom: 20,
            }}
          >
            <input ref={fileInputRef} type="file" accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }} style={{ display: 'none' }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{t.dropText}</p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.supported}</p>
          </div>

          {preview && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, marginBottom: 20 }}>
                <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt={fileName} style={{ maxWidth: '100%', maxHeight: 160, borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 2 }}>
                  <div><strong style={{ color: 'var(--text-primary)' }}>{t.fileName}:</strong> {fileName}</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>{t.fileSize}:</strong> {(fileSize / 1024).toFixed(1)} KB</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>{t.fileType}:</strong> {mimeType}</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>{t.b64Length}:</strong> {base64.length.toLocaleString()} {t.chars}</div>
                </div>
              </div>
              {[
                { label: t.b64String, value: base64 },
                { label: t.dataUri, value: dataUri },
                { label: t.htmlTag, value: htmlSnippet },
                { label: t.cssBg, value: cssSnippet },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</label>
                    <CopyButton text={item.value} />
                  </div>
                  <textarea value={item.value} readOnly style={{ minHeight: 80, fontSize: 11, fontFamily: 'monospace' }} />
                </div>
              ))}
            </>
          )}
        </>
      )}

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
            { href: `/${lang}/tools/base64-image-converter`, label: 'Base64 Image Converter' },
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/image-base64`, label: 'Image Base64' },
            { href: `/${lang}/tools/base64-encoder`, label: 'Base64 Encoder' },
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
