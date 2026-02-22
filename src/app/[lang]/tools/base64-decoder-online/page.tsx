'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 Decoder Online',
    description: 'Decode Base64 strings, files, and images online for free. Fast, secure client-side Base64 decoding tool.',
    inputLabel: 'Base64 Input',
    inputPlaceholder: 'Paste Base64 encoded string here...',
    outputLabel: 'Decoded Output',
    decodeBtn: 'Decode',
    clear: 'Clear',
    fileMode: 'File / Image Mode',
    textMode: 'Text Mode',
    downloadFile: 'Download File',
    detectedType: 'Detected Type',
    imagePreview: 'Image Preview',
    invalidBase64: 'Invalid Base64 string',
    dropHint: 'Or drag & drop a .txt file with Base64 content',
    sampleBtn: 'Load Sample',
    charCount: 'characters',
    introTitle: 'Free Online Base64 Decoder',
    introText: 'Decode any Base64-encoded string back to its original text, binary data, or image. This tool runs entirely in your browser -- your data never leaves your device. Supports standard Base64 (RFC 4648), URL-safe Base64, and data URI decoding for images.',
    featureTitle: 'Supported Decoding Modes',
    feat1: 'Text Decoding -- Decode Base64 to plain text (UTF-8)',
    feat2: 'File Decoding -- Decode Base64 to binary files with download',
    feat3: 'Image Preview -- Automatically detect and preview Base64 encoded images',
    feat4: 'URL-Safe -- Handles both standard and URL-safe Base64 variants',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is Base64 encoding?',
    faq1a: 'Base64 is a binary-to-text encoding scheme that converts binary data into a string of ASCII characters. It uses 64 characters (A-Z, a-z, 0-9, +, /) plus = for padding. It is commonly used to embed images in HTML/CSS, transmit binary data over text protocols like email (MIME), and encode data in URLs and APIs.',
    faq2q: 'How does Base64 decoding work?',
    faq2a: 'Base64 decoding reverses the encoding process. Each Base64 character maps to a 6-bit value. Four Base64 characters decode to three bytes of binary data. The decoder reads 4 characters at a time, converts them to their 6-bit values, concatenates the bits, and splits them into 8-bit bytes.',
    faq3q: 'Is my data safe when using this tool?',
    faq3a: 'Yes, absolutely. All decoding happens locally in your browser using JavaScript. No data is ever sent to any server. You can verify this by disconnecting from the internet and using the tool offline.',
    faq4q: 'Can I decode Base64 images?',
    faq4a: 'Yes. If the Base64 string represents an image (detected via data URI prefix like data:image/png;base64, or by MIME type magic bytes), the tool will automatically show a preview and allow you to download the image file.',
    faq5q: 'What is the difference between Base64 and URL-safe Base64?',
    faq5a: 'Standard Base64 uses + and / characters which have special meaning in URLs. URL-safe Base64 replaces + with - and / with _ to make the encoded string safe for use in URLs and filenames. This tool handles both formats automatically.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Base64 在线解码器',
    description: '免费在线解码 Base64 字符串、文件和图片。快速、安全的客户端 Base64 解码工具。',
    inputLabel: 'Base64 输入',
    inputPlaceholder: '在此粘贴 Base64 编码的字符串...',
    outputLabel: '解码输出',
    decodeBtn: '解码',
    clear: '清除',
    fileMode: '文件/图片模式',
    textMode: '文本模式',
    downloadFile: '下载文件',
    detectedType: '检测到的类型',
    imagePreview: '图片预览',
    invalidBase64: '无效的 Base64 字符串',
    dropHint: '或拖放包含 Base64 内容的 .txt 文件',
    sampleBtn: '加载示例',
    charCount: '个字符',
    introTitle: '免费在线 Base64 解码器',
    introText: '将任何 Base64 编码的字符串解码回原始文本、二进制数据或图片。此工具完全在浏览器中运行，数据不会离开您的设备。',
    featureTitle: '支持的解码模式',
    feat1: '文本解码 -- 将 Base64 解码为纯文本 (UTF-8)',
    feat2: '文件解码 -- 将 Base64 解码为二进制文件并下载',
    feat3: '图片预览 -- 自动检测并预览 Base64 编码的图片',
    feat4: 'URL 安全 -- 同时处理标准和 URL 安全的 Base64 变体',
    faqTitle: '常见问题',
    faq1q: '什么是 Base64 编码？',
    faq1a: 'Base64 是一种将二进制数据转换为 ASCII 字符串的编码方案，使用 64 个字符（A-Z、a-z、0-9、+、/）加上 = 作为填充。',
    faq2q: 'Base64 解码如何工作？',
    faq2a: 'Base64 解码是编码的逆过程。每个 Base64 字符映射到一个 6 位值，四个字符解码为三个字节。',
    faq3q: '使用此工具我的数据安全吗？',
    faq3a: '完全安全。所有解码都在浏览器中本地进行，不会向任何服务器发送数据。',
    faq4q: '我可以解码 Base64 图片吗？',
    faq4a: '可以。如果 Base64 字符串代表图片，工具会自动显示预览并允许下载图片文件。',
    faq5q: '标准 Base64 和 URL 安全 Base64 有什么区别？',
    faq5a: '标准 Base64 使用 + 和 / 字符，URL 安全 Base64 用 - 和 _ 替换它们，使编码字符串可安全用于 URL。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Decodeur Base64 en Ligne',
    description: 'Decodez des chaines Base64, fichiers et images en ligne gratuitement. Outil de decodage Base64 rapide et securise.',
    inputLabel: 'Entree Base64', inputPlaceholder: 'Collez la chaine Base64 ici...', outputLabel: 'Sortie decodee',
    decodeBtn: 'Decoder', clear: 'Effacer', fileMode: 'Mode Fichier/Image', textMode: 'Mode Texte',
    downloadFile: 'Telecharger', detectedType: 'Type detecte', imagePreview: 'Apercu image',
    invalidBase64: 'Chaine Base64 invalide', dropHint: 'Ou glissez-deposez un fichier .txt', sampleBtn: 'Exemple',
    charCount: 'caracteres',
    introTitle: 'Decodeur Base64 gratuit', introText: 'Decodez toute chaine Base64 en texte, donnees binaires ou image. Tout se passe dans votre navigateur.',
    featureTitle: 'Modes de decodage', feat1: 'Decodage texte', feat2: 'Decodage fichier', feat3: 'Apercu image', feat4: 'URL-Safe Base64',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que l\'encodage Base64 ?', faq1a: 'Base64 est un schema d\'encodage binaire vers texte utilisant 64 caracteres ASCII.',
    faq2q: 'Comment fonctionne le decodage ?', faq2a: 'Chaque caractere Base64 correspond a une valeur de 6 bits. Quatre caracteres decodent en trois octets.',
    faq3q: 'Mes donnees sont-elles en securite ?', faq3a: 'Oui, tout le decodage se fait localement dans votre navigateur.',
    faq4q: 'Puis-je decoder des images ?', faq4a: 'Oui, l\'outil detecte automatiquement les images et affiche un apercu.',
    faq5q: 'Difference entre Base64 standard et URL-safe ?', faq5a: 'URL-safe Base64 remplace + par - et / par _ pour une utilisation sure dans les URLs.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Base64 Decoder Online',
    description: 'Base64-Strings, Dateien und Bilder online kostenlos dekodieren. Schnelles, sicheres clientseitiges Tool.',
    inputLabel: 'Base64 Eingabe', inputPlaceholder: 'Base64-String hier einfuegen...', outputLabel: 'Dekodierte Ausgabe',
    decodeBtn: 'Dekodieren', clear: 'Loeschen', fileMode: 'Datei-/Bildmodus', textMode: 'Textmodus',
    downloadFile: 'Herunterladen', detectedType: 'Erkannter Typ', imagePreview: 'Bildvorschau',
    invalidBase64: 'Ungueltiger Base64-String', dropHint: 'Oder .txt-Datei hierher ziehen', sampleBtn: 'Beispiel laden',
    charCount: 'Zeichen',
    introTitle: 'Kostenloser Online Base64 Decoder', introText: 'Dekodieren Sie jeden Base64-kodierten String zurueck in Text, Binaerdaten oder Bilder. Alles laeuft in Ihrem Browser.',
    featureTitle: 'Unterstuetzte Modi', feat1: 'Textdekodierung', feat2: 'Dateidekodierung', feat3: 'Bildvorschau', feat4: 'URL-Safe Base64',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist Base64-Kodierung?', faq1a: 'Base64 ist ein Binaer-zu-Text-Kodierungsschema mit 64 ASCII-Zeichen.',
    faq2q: 'Wie funktioniert die Dekodierung?', faq2a: 'Jedes Base64-Zeichen wird einem 6-Bit-Wert zugeordnet. Vier Zeichen ergeben drei Bytes.',
    faq3q: 'Sind meine Daten sicher?', faq3a: 'Ja, alle Berechnungen erfolgen lokal in Ihrem Browser.',
    faq4q: 'Kann ich Base64-Bilder dekodieren?', faq4a: 'Ja, das Tool erkennt Bilder automatisch und zeigt eine Vorschau an.',
    faq5q: 'Unterschied zwischen Standard und URL-Safe Base64?', faq5a: 'URL-Safe Base64 ersetzt + durch - und / durch _ fuer sichere Verwendung in URLs.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Decodificador Base64 en Linea',
    description: 'Decodifique cadenas Base64, archivos e imagenes en linea gratis. Herramienta rapida y segura.',
    inputLabel: 'Entrada Base64', inputPlaceholder: 'Pegue la cadena Base64 aqui...', outputLabel: 'Salida decodificada',
    decodeBtn: 'Decodificar', clear: 'Limpiar', fileMode: 'Modo Archivo/Imagen', textMode: 'Modo Texto',
    downloadFile: 'Descargar', detectedType: 'Tipo detectado', imagePreview: 'Vista previa',
    invalidBase64: 'Cadena Base64 invalida', dropHint: 'O arrastre un archivo .txt', sampleBtn: 'Cargar ejemplo',
    charCount: 'caracteres',
    introTitle: 'Decodificador Base64 gratuito', introText: 'Decodifique cualquier cadena Base64 a texto, datos binarios o imagen. Todo se procesa en su navegador.',
    featureTitle: 'Modos soportados', feat1: 'Decodificacion de texto', feat2: 'Decodificacion de archivos', feat3: 'Vista previa de imagenes', feat4: 'Base64 URL-Safe',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la codificacion Base64?', faq1a: 'Base64 es un esquema de codificacion binario a texto que usa 64 caracteres ASCII.',
    faq2q: 'Como funciona la decodificacion?', faq2a: 'Cada caracter Base64 se asigna a un valor de 6 bits. Cuatro caracteres decodifican en tres bytes.',
    faq3q: 'Mis datos estan seguros?', faq3a: 'Si, toda la decodificacion se realiza localmente en su navegador.',
    faq4q: 'Puedo decodificar imagenes?', faq4a: 'Si, la herramienta detecta imagenes automaticamente y muestra una vista previa.',
    faq5q: 'Diferencia entre Base64 estandar y URL-safe?', faq5a: 'URL-safe Base64 reemplaza + por - y / por _ para uso seguro en URLs.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Decodificatore Base64 Online',
    description: 'Decodifica stringhe Base64, file e immagini online gratis. Strumento veloce e sicuro.',
    inputLabel: 'Input Base64', inputPlaceholder: 'Incolla la stringa Base64 qui...', outputLabel: 'Output decodificato',
    decodeBtn: 'Decodifica', clear: 'Cancella', fileMode: 'Modalita File/Immagine', textMode: 'Modalita Testo',
    downloadFile: 'Scarica', detectedType: 'Tipo rilevato', imagePreview: 'Anteprima immagine',
    invalidBase64: 'Stringa Base64 non valida', dropHint: 'O trascina un file .txt', sampleBtn: 'Carica esempio',
    charCount: 'caratteri',
    introTitle: 'Decodificatore Base64 gratuito', introText: 'Decodifica qualsiasi stringa Base64 in testo, dati binari o immagini. Tutto avviene nel tuo browser.',
    featureTitle: 'Modalita supportate', feat1: 'Decodifica testo', feat2: 'Decodifica file', feat3: 'Anteprima immagini', feat4: 'URL-Safe Base64',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e la codifica Base64?', faq1a: 'Base64 e uno schema di codifica binario-testo che usa 64 caratteri ASCII.',
    faq2q: 'Come funziona la decodifica?', faq2a: 'Ogni carattere Base64 corrisponde a un valore di 6 bit. Quattro caratteri decodificano in tre byte.',
    faq3q: 'I miei dati sono al sicuro?', faq3a: 'Si, tutta la decodifica avviene localmente nel tuo browser.',
    faq4q: 'Posso decodificare immagini?', faq4a: 'Si, lo strumento rileva automaticamente le immagini e mostra un\'anteprima.',
    faq5q: 'Differenza tra Base64 standard e URL-safe?', faq5a: 'URL-safe Base64 sostituisce + con - e / con _ per l\'uso sicuro negli URL.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Decodificador Base64 Online',
    description: 'Decodifique strings Base64, ficheiros e imagens online gratuitamente.',
    inputLabel: 'Entrada Base64', inputPlaceholder: 'Cole a string Base64 aqui...', outputLabel: 'Saida decodificada',
    decodeBtn: 'Decodificar', clear: 'Limpar', fileMode: 'Modo Ficheiro/Imagem', textMode: 'Modo Texto',
    downloadFile: 'Descarregar', detectedType: 'Tipo detetado', imagePreview: 'Pre-visualizacao',
    invalidBase64: 'String Base64 invalida', dropHint: 'Ou arraste um ficheiro .txt', sampleBtn: 'Carregar exemplo',
    charCount: 'caracteres',
    introTitle: 'Decodificador Base64 gratuito', introText: 'Decodifique qualquer string Base64. Tudo e processado no seu navegador.',
    featureTitle: 'Modos suportados', feat1: 'Decodificacao de texto', feat2: 'Decodificacao de ficheiros', feat3: 'Pre-visualizacao de imagens', feat4: 'URL-Safe Base64',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e codificacao Base64?', faq1a: 'Base64 e um esquema de codificacao binario-texto com 64 caracteres ASCII.',
    faq2q: 'Como funciona a decodificacao?', faq2a: 'Cada caractere Base64 mapeia para um valor de 6 bits.',
    faq3q: 'Os meus dados estao seguros?', faq3a: 'Sim, toda a decodificacao e feita localmente no seu navegador.',
    faq4q: 'Posso decodificar imagens?', faq4a: 'Sim, a ferramenta deteta imagens automaticamente.',
    faq5q: 'Diferenca entre Base64 padrao e URL-safe?', faq5a: 'URL-safe Base64 substitui + por - e / por _.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Base64 Decoder Online',
    description: 'Decodeer Base64-strings, bestanden en afbeeldingen online gratis.',
    inputLabel: 'Base64 Invoer', inputPlaceholder: 'Plak Base64-string hier...', outputLabel: 'Gedecodeerde Uitvoer',
    decodeBtn: 'Decoderen', clear: 'Wissen', fileMode: 'Bestand/Afbeelding', textMode: 'Tekstmodus',
    downloadFile: 'Downloaden', detectedType: 'Gedetecteerd type', imagePreview: 'Afbeelding voorbeeld',
    invalidBase64: 'Ongeldige Base64-string', dropHint: 'Of sleep een .txt-bestand', sampleBtn: 'Voorbeeld laden',
    charCount: 'tekens',
    introTitle: 'Gratis Online Base64 Decoder', introText: 'Decodeer elke Base64-string terug naar tekst, binaire gegevens of afbeeldingen. Alles draait in uw browser.',
    featureTitle: 'Ondersteunde modi', feat1: 'Tekstdecodering', feat2: 'Bestandsdecodering', feat3: 'Afbeelding voorbeeld', feat4: 'URL-Safe Base64',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is Base64-codering?', faq1a: 'Base64 is een binair-naar-tekst coderingsschema met 64 ASCII-tekens.',
    faq2q: 'Hoe werkt decodering?', faq2a: 'Elk Base64-teken wordt omgezet naar een 6-bits waarde.',
    faq3q: 'Zijn mijn gegevens veilig?', faq3a: 'Ja, alle decodering gebeurt lokaal in uw browser.',
    faq4q: 'Kan ik afbeeldingen decoderen?', faq4a: 'Ja, de tool detecteert automatisch afbeeldingen.',
    faq5q: 'Verschil tussen standaard en URL-safe Base64?', faq5a: 'URL-safe Base64 vervangt + door - en / door _.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Dekoder Base64 Online',
    description: 'Dekoduj ciagi Base64, pliki i obrazy online za darmo.',
    inputLabel: 'Wejscie Base64', inputPlaceholder: 'Wklej ciag Base64 tutaj...', outputLabel: 'Zdekodowane wyjscie',
    decodeBtn: 'Dekoduj', clear: 'Wyczysc', fileMode: 'Tryb plik/obraz', textMode: 'Tryb tekstowy',
    downloadFile: 'Pobierz', detectedType: 'Wykryty typ', imagePreview: 'Podglad obrazu',
    invalidBase64: 'Nieprawidlowy ciag Base64', dropHint: 'Lub przeciagnij plik .txt', sampleBtn: 'Zaladuj przyklad',
    charCount: 'znakow',
    introTitle: 'Darmowy dekoder Base64', introText: 'Dekoduj dowolny ciag Base64 z powrotem na tekst, dane binarne lub obraz. Wszystko dziala w przegladarce.',
    featureTitle: 'Obslugiwane tryby', feat1: 'Dekodowanie tekstu', feat2: 'Dekodowanie plikow', feat3: 'Podglad obrazow', feat4: 'URL-Safe Base64',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Co to jest kodowanie Base64?', faq1a: 'Base64 to schemat kodowania binarnego na tekst uzywajacy 64 znakow ASCII.',
    faq2q: 'Jak dziala dekodowanie?', faq2a: 'Kazdy znak Base64 odpowiada wartosci 6-bitowej.',
    faq3q: 'Czy moje dane sa bezpieczne?', faq3a: 'Tak, wszystko odbywa sie lokalnie w przegladarce.',
    faq4q: 'Czy moge dekodowac obrazy?', faq4a: 'Tak, narzedzie automatycznie wykrywa obrazy.',
    faq5q: 'Roznica miedzy standardowym a URL-safe Base64?', faq5a: 'URL-safe Base64 zamienia + na - i / na _.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Base64 Avkodare Online',
    description: 'Avkoda Base64-strangar, filer och bilder online gratis.',
    inputLabel: 'Base64 Indata', inputPlaceholder: 'Klistra in Base64-strang har...', outputLabel: 'Avkodad utdata',
    decodeBtn: 'Avkoda', clear: 'Rensa', fileMode: 'Fil/Bild-lage', textMode: 'Textlage',
    downloadFile: 'Ladda ner', detectedType: 'Detekterad typ', imagePreview: 'Bildforhandsvisning',
    invalidBase64: 'Ogiltig Base64-strang', dropHint: 'Eller dra en .txt-fil', sampleBtn: 'Ladda exempel',
    charCount: 'tecken',
    introTitle: 'Gratis Base64 Avkodare', introText: 'Avkoda valfri Base64-strang tillbaka till text, binardata eller bilder. Allt kor i din webblasare.',
    featureTitle: 'Stodda lagen', feat1: 'Textavkodning', feat2: 'Filavkodning', feat3: 'Bildforhandsvisning', feat4: 'URL-Safe Base64',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad ar Base64-kodning?', faq1a: 'Base64 ar ett binar-till-text-kodningsschema med 64 ASCII-tecken.',
    faq2q: 'Hur fungerar avkodning?', faq2a: 'Varje Base64-tecken mappar till ett 6-bitars varde.',
    faq3q: 'Ar mina data sakra?', faq3a: 'Ja, all avkodning sker lokalt i din webblasare.',
    faq4q: 'Kan jag avkoda bilder?', faq4a: 'Ja, verktyget detekterar bilder automatiskt.',
    faq5q: 'Skillnad mellan standard och URL-safe Base64?', faq5a: 'URL-safe Base64 ersatter + med - och / med _.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Base64 Dekoder Online',
    description: 'Dekod Base64-strenger, filer og bilder online gratis.',
    inputLabel: 'Base64 Inndata', inputPlaceholder: 'Lim inn Base64-streng her...', outputLabel: 'Dekodet utdata',
    decodeBtn: 'Dekod', clear: 'Toemm', fileMode: 'Fil/Bilde-modus', textMode: 'Tekstmodus',
    downloadFile: 'Last ned', detectedType: 'Oppdaget type', imagePreview: 'Bildeforhandsvisning',
    invalidBase64: 'Ugyldig Base64-streng', dropHint: 'Eller dra en .txt-fil', sampleBtn: 'Last eksempel',
    charCount: 'tegn',
    introTitle: 'Gratis Base64 Dekoder', introText: 'Dekod enhver Base64-streng tilbake til tekst, binardata eller bilder. Alt kjorer i nettleseren din.',
    featureTitle: 'Stottede moduser', feat1: 'Tekstdekoding', feat2: 'Fildekoding', feat3: 'Bildeforhandsvisning', feat4: 'URL-Safe Base64',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hva er Base64-koding?', faq1a: 'Base64 er et binar-til-tekst-kodingsskjema med 64 ASCII-tegn.',
    faq2q: 'Hvordan fungerer dekoding?', faq2a: 'Hvert Base64-tegn tilordnes en 6-bits verdi.',
    faq3q: 'Er dataene mine trygge?', faq3a: 'Ja, all dekoding skjer lokalt i nettleseren din.',
    faq4q: 'Kan jeg dekode bilder?', faq4a: 'Ja, verktoeyet oppdager bilder automatisk.',
    faq5q: 'Forskjell mellom standard og URL-safe Base64?', faq5a: 'URL-safe Base64 erstatter + med - og / med _.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'Base64 オンラインデコーダー',
    description: 'Base64文字列、ファイル、画像を無料でオンラインデコード。高速で安全なクライアントサイドツール。',
    inputLabel: 'Base64 入力', inputPlaceholder: 'Base64エンコードされた文字列を貼り付け...', outputLabel: 'デコード出力',
    decodeBtn: 'デコード', clear: 'クリア', fileMode: 'ファイル/画像モード', textMode: 'テキストモード',
    downloadFile: 'ダウンロード', detectedType: '検出されたタイプ', imagePreview: '画像プレビュー',
    invalidBase64: '無効なBase64文字列', dropHint: 'または.txtファイルをドラッグ', sampleBtn: 'サンプル読込',
    charCount: '文字',
    introTitle: '無料オンラインBase64デコーダー', introText: 'Base64エンコードされた文字列をテキスト、バイナリデータ、画像にデコード。すべてブラウザで実行されます。',
    featureTitle: 'サポートモード', feat1: 'テキストデコード', feat2: 'ファイルデコード', feat3: '画像プレビュー', feat4: 'URL-Safe Base64',
    faqTitle: 'よくある質問',
    faq1q: 'Base64エンコードとは？', faq1a: 'Base64は64のASCII文字を使用するバイナリ-テキスト変換スキームです。',
    faq2q: 'デコードの仕組みは？', faq2a: '各Base64文字は6ビット値にマッピングされます。',
    faq3q: 'データは安全ですか？', faq3a: 'はい、すべてのデコードはブラウザ内でローカルに実行されます。',
    faq4q: '画像をデコードできますか？', faq4a: 'はい、ツールは画像を自動的に検出してプレビューを表示します。',
    faq5q: '標準とURL-safe Base64の違いは？', faq5a: 'URL-safe Base64は+を-に、/を_に置き換えます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Base64 온라인 디코더',
    description: 'Base64 문자열, 파일, 이미지를 무료로 온라인 디코딩.',
    inputLabel: 'Base64 입력', inputPlaceholder: 'Base64 인코딩된 문자열을 붙여넣기...', outputLabel: '디코딩 출력',
    decodeBtn: '디코딩', clear: '지우기', fileMode: '파일/이미지 모드', textMode: '텍스트 모드',
    downloadFile: '다운로드', detectedType: '감지된 유형', imagePreview: '이미지 미리보기',
    invalidBase64: '잘못된 Base64 문자열', dropHint: '또는 .txt 파일을 드래그', sampleBtn: '예제 로드',
    charCount: '문자',
    introTitle: '무료 온라인 Base64 디코더', introText: 'Base64 인코딩된 문자열을 텍스트, 바이너리 데이터 또는 이미지로 디코딩합니다. 모두 브라우저에서 실행됩니다.',
    featureTitle: '지원 모드', feat1: '텍스트 디코딩', feat2: '파일 디코딩', feat3: '이미지 미리보기', feat4: 'URL-Safe Base64',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Base64 인코딩이란?', faq1a: 'Base64는 64개의 ASCII 문자를 사용하는 바이너리-텍스트 인코딩 체계입니다.',
    faq2q: '디코딩은 어떻게 작동하나요?', faq2a: '각 Base64 문자는 6비트 값에 매핑됩니다.',
    faq3q: '데이터는 안전한가요?', faq3a: '네, 모든 디코딩은 브라우저에서 로컬로 수행됩니다.',
    faq4q: '이미지를 디코딩할 수 있나요?', faq4a: '네, 도구가 자동으로 이미지를 감지하여 미리보기를 표시합니다.',
    faq5q: '표준과 URL-safe Base64의 차이점은?', faq5a: 'URL-safe Base64는 +를 -로, /를 _로 대체합니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Dekoder Base64 Online',
    description: 'Dekode string Base64, file, dan gambar online gratis.',
    inputLabel: 'Input Base64', inputPlaceholder: 'Tempel string Base64 di sini...', outputLabel: 'Output yang didekode',
    decodeBtn: 'Dekode', clear: 'Hapus', fileMode: 'Mode File/Gambar', textMode: 'Mode Teks',
    downloadFile: 'Unduh', detectedType: 'Tipe terdeteksi', imagePreview: 'Pratinjau gambar',
    invalidBase64: 'String Base64 tidak valid', dropHint: 'Atau seret file .txt', sampleBtn: 'Muat contoh',
    charCount: 'karakter',
    introTitle: 'Dekoder Base64 Gratis', introText: 'Dekode string Base64 apa pun kembali ke teks, data biner, atau gambar. Semua berjalan di browser Anda.',
    featureTitle: 'Mode yang didukung', feat1: 'Dekode teks', feat2: 'Dekode file', feat3: 'Pratinjau gambar', feat4: 'URL-Safe Base64',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu encoding Base64?', faq1a: 'Base64 adalah skema encoding biner-ke-teks menggunakan 64 karakter ASCII.',
    faq2q: 'Bagaimana decoding bekerja?', faq2a: 'Setiap karakter Base64 dipetakan ke nilai 6-bit.',
    faq3q: 'Apakah data saya aman?', faq3a: 'Ya, semua decoding dilakukan secara lokal di browser Anda.',
    faq4q: 'Bisakah saya mendekode gambar?', faq4a: 'Ya, alat ini mendeteksi gambar secara otomatis.',
    faq5q: 'Perbedaan antara Base64 standar dan URL-safe?', faq5a: 'URL-safe Base64 mengganti + dengan - dan / dengan _.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวถอดรหัส Base64 ออนไลน์',
    description: 'ถอดรหัสสตริง Base64 ไฟล์ และรูปภาพออนไลน์ฟรี',
    inputLabel: 'อินพุต Base64', inputPlaceholder: 'วางสตริง Base64 ที่นี่...', outputLabel: 'เอาต์พุตที่ถอดรหัส',
    decodeBtn: 'ถอดรหัส', clear: 'ล้าง', fileMode: 'โหมดไฟล์/รูปภาพ', textMode: 'โหมดข้อความ',
    downloadFile: 'ดาวน์โหลด', detectedType: 'ประเภทที่ตรวจพบ', imagePreview: 'ตัวอย่างรูปภาพ',
    invalidBase64: 'สตริง Base64 ไม่ถูกต้อง', dropHint: 'หรือลากไฟล์ .txt', sampleBtn: 'โหลดตัวอย่าง',
    charCount: 'อักขระ',
    introTitle: 'ตัวถอดรหัส Base64 ฟรี', introText: 'ถอดรหัสสตริง Base64 กลับเป็นข้อความ ข้อมูลไบนารี หรือรูปภาพ ทุกอย่างทำงานในเบราว์เซอร์ของคุณ',
    featureTitle: 'โหมดที่รองรับ', feat1: 'ถอดรหัสข้อความ', feat2: 'ถอดรหัสไฟล์', feat3: 'ตัวอย่างรูปภาพ', feat4: 'URL-Safe Base64',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การเข้ารหัส Base64 คืออะไร?', faq1a: 'Base64 เป็นรูปแบบการเข้ารหัสไบนารีเป็นข้อความที่ใช้อักขระ ASCII 64 ตัว',
    faq2q: 'การถอดรหัสทำงานอย่างไร?', faq2a: 'อักขระ Base64 แต่ละตัวจะถูกจับคู่กับค่า 6 บิต',
    faq3q: 'ข้อมูลของฉันปลอดภัยหรือไม่?', faq3a: 'ใช่ การถอดรหัสทั้งหมดทำในเบราว์เซอร์ของคุณ',
    faq4q: 'ฉันสามารถถอดรหัสรูปภาพได้หรือไม่?', faq4a: 'ได้ เครื่องมือจะตรวจจับรูปภาพโดยอัตโนมัติ',
    faq5q: 'ความแตกต่างระหว่าง Base64 มาตรฐานและ URL-safe?', faq5a: 'URL-safe Base64 แทนที่ + ด้วย - และ / ด้วย _',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function Base64DecoderOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'text' | 'file'>('text');
  const [fileDataUrl, setFileDataUrl] = useState('');
  const [detectedMime, setDetectedMime] = useState('');

  const decode = useCallback(() => {
    setError('');
    setFileDataUrl('');
    setDetectedMime('');
    if (!input.trim()) { setOutput(''); return; }

    try {
      let cleaned = input.trim();
      // Handle data URI prefix
      let mimeFromUri = '';
      if (cleaned.startsWith('data:')) {
        const match = cleaned.match(/^data:([^;]+);base64,([\s\S]+)$/);
        if (match) {
          mimeFromUri = match[1];
          cleaned = match[2];
        }
      }
      // Normalize URL-safe base64
      cleaned = cleaned.replace(/-/g, '+').replace(/_/g, '/');
      // Add padding if needed
      while (cleaned.length % 4 !== 0) cleaned += '=';

      if (mode === 'text') {
        const decoded = atob(cleaned);
        const bytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) bytes[i] = decoded.charCodeAt(i);
        const text = new TextDecoder('utf-8').decode(bytes);
        setOutput(text);
      } else {
        const decoded = atob(cleaned);
        const bytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) bytes[i] = decoded.charCodeAt(i);
        // Detect MIME type from magic bytes or URI
        let mime = mimeFromUri || 'application/octet-stream';
        if (!mimeFromUri) {
          if (bytes[0] === 0x89 && bytes[1] === 0x50) mime = 'image/png';
          else if (bytes[0] === 0xFF && bytes[1] === 0xD8) mime = 'image/jpeg';
          else if (bytes[0] === 0x47 && bytes[1] === 0x49) mime = 'image/gif';
          else if (bytes[0] === 0x25 && bytes[1] === 0x50) mime = 'application/pdf';
          else if (bytes[0] === 0x50 && bytes[1] === 0x4B) mime = 'application/zip';
        }
        setDetectedMime(mime);
        const blob = new Blob([bytes], { type: mime });
        const url = URL.createObjectURL(blob);
        setFileDataUrl(url);
        if (mime.startsWith('image/')) {
          setOutput('');
        } else {
          setOutput(`[Binary data: ${bytes.length} bytes]`);
        }
      }
    } catch {
      setError(t.invalidBase64);
      setOutput('');
    }
  }, [input, mode, t.invalidBase64]);

  const downloadFile = () => {
    if (!fileDataUrl) return;
    const ext = detectedMime.split('/')[1] || 'bin';
    const a = document.createElement('a');
    a.href = fileDataUrl;
    a.download = `decoded.${ext}`;
    a.click();
  };

  const loadSample = () => {
    setInput('SGVsbG8gV29ybGQhIFRoaXMgaXMgYSBCYXNlNjQgZW5jb2RlZCBzdHJpbmcu');
    setOutput('');
    setError('');
    setFileDataUrl('');
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
    <ToolLayout title={t.title} description={t.description} toolId="base64-decoder-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={decode} className="btn btn-primary">{t.decodeBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setFileDataUrl(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.sampleBtn}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={() => setMode('text')} className={`btn ${mode === 'text' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: 12, padding: '4px 12px' }}>{t.textMode}</button>
          <button onClick={() => setMode('file')} className={`btn ${mode === 'file' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: 12, padding: '4px 12px' }}>{t.fileMode}</button>
        </div>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          style={{ minHeight: 140, fontFamily: 'monospace', fontSize: 13 }}
        />
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{input.length} {t.charCount}</div>
      </div>

      {/* Error */}
      {error && <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#b91c1c', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>}

      {/* Output */}
      {output && mode === 'text' && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly style={{ minHeight: 140, fontFamily: 'monospace', fontSize: 13, background: 'var(--bg-input)' }} />
        </div>
      )}

      {/* File output */}
      {fileDataUrl && (
        <div style={{ marginBottom: 16 }}>
          {detectedMime && (
            <div style={{ fontSize: 13, marginBottom: 8 }}>
              <strong>{t.detectedType}:</strong> {detectedMime}
            </div>
          )}
          {detectedMime.startsWith('image/') && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.imagePreview}</label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fileDataUrl} alt="Decoded" style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8, border: '1px solid var(--border-color)' }} />
            </div>
          )}
          <button onClick={downloadFile} className="btn btn-primary">{t.downloadFile}</button>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.featureTitle}</h3>
        <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, paddingLeft: 20 }}>
          <li>{t.feat1}</li>
          <li>{t.feat2}</li>
          <li>{t.feat3}</li>
          <li>{t.feat4}</li>
        </ul>

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
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/base64-encoder`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/base64-decoder`, label: 'Base64 Decoder' },
            { href: `/${lang}/tools/base64-image-converter`, label: 'Base64 Image Converter' },
            { href: `/${lang}/tools/url-encoder`, label: 'URL Encoder' },
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
