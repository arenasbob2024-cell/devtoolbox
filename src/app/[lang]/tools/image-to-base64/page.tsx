'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Image to Base64 Converter', description: 'Convert images to Base64 data URI encoding. Upload any image and get the Base64 string for use in HTML, CSS, or JavaScript.',
    dropZone: 'Drop an image here or click to upload', supportedFormats: 'Supported: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP',
    outputLabel: 'Base64 Output', outputType: 'Output Format', dataUri: 'Full Data URI (HTML/CSS)', base64Only: 'Base64 Only', cssFormat: 'CSS background-image', imgTag: 'HTML <img> tag',
    fileInfo: 'File Info', fileName: 'File Name', fileSize: 'File Size', fileType: 'File Type', b64Size: 'Base64 Size',
    preview: 'Preview', clear: 'Clear',
    introTitle: 'Free Image to Base64 Encoder Online',
    introText: 'Convert any image file to Base64 encoding with this free online tool. Base64 encoding is commonly used to embed images directly in HTML, CSS, and JavaScript without separate image file requests. This is useful for small icons, email templates, and reducing HTTP requests. The tool supports all common image formats including PNG, JPG, GIF, WebP, SVG, ICO, and BMP.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is Base64 image encoding?', faq1a: 'Base64 is a binary-to-text encoding scheme that converts binary data (like images) into ASCII text characters. When an image is encoded in Base64, it can be embedded directly in HTML, CSS, or JavaScript as a data URI, eliminating the need for a separate HTTP request to load the image.',
    faq2q: 'When should I use Base64 images?', faq2a: 'Use Base64 for small images (under 5-10KB) where the HTTP request overhead would be significant. Good use cases include small icons in email templates (which cannot reference external URLs), inline SVG icons, loading spinners, and images that are always needed on page load. Avoid Base64 for large images as it increases file size by ~33%.',
    faq3q: 'How does Base64 affect performance?', faq3a: 'Base64 encoding increases file size by approximately 33% compared to the original binary. This means larger CSS/HTML files that take longer to download, but eliminates separate image HTTP requests. For large images, the trade-off is negative. For small icons used on every page load, embedding as Base64 can improve performance by reducing round-trip requests.',
    faq4q: 'How do I use a Base64 image in HTML?', faq4a: 'You can use a Base64 encoded image in an img tag: <img src="data:image/png;base64,iVBORw0KG..." alt="description">. In CSS: background-image: url("data:image/png;base64,iVBORw0KG..."). The data URI includes the MIME type and the Base64 encoded binary data.',
    faq5q: 'Are my images processed on the server?', faq5a: 'No, this tool performs all image conversion entirely in your browser using the FileReader API and Canvas API. Your images are never uploaded to any server, ensuring your privacy and security. The conversion happens locally on your device.',
  },
  fr: {
    title: 'Convertisseur Image en Base64', description: 'Convertissez des images en encodage data URI Base64.',
    dropZone: 'Deposez une image ici ou cliquez pour telecharger', supportedFormats: 'Supporte: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP',
    outputLabel: 'Sortie Base64', outputType: 'Format de Sortie', dataUri: 'Data URI complet (HTML/CSS)', base64Only: 'Base64 Seulement', cssFormat: 'CSS background-image', imgTag: 'Balise HTML <img>',
    fileInfo: 'Infos Fichier', fileName: 'Nom du Fichier', fileSize: 'Taille du Fichier', fileType: 'Type de Fichier', b64Size: 'Taille Base64',
    preview: 'Apercu', clear: 'Effacer',
    introTitle: 'Encodeur Base64 d\'Image Gratuit en Ligne',
    introText: 'Convertissez n\'importe quelle image en encodage Base64 avec cet outil gratuit.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Qu\'est-ce que l\'encodage Base64?', faq1a: 'Base64 convertit des donnees binaires (comme des images) en caracteres ASCII.',
    faq2q: 'Quand utiliser des images Base64?', faq2a: 'Pour les petites images (moins de 5-10 Ko) dans les templates email et les petites icones.',
    faq3q: 'Comment Base64 affecte-t-il les performances?', faq3a: 'Base64 augmente la taille du fichier d\'environ 33%, mais elimine les requetes HTTP separees.',
    faq4q: 'Comment utiliser une image Base64 en HTML?', faq4a: '<img src="data:image/png;base64,..."> ou en CSS: background-image: url("data:image/png;base64,...").',
    faq5q: 'Les images sont-elles traitees sur le serveur?', faq5a: 'Non, tout est fait dans votre navigateur. Vos images ne sont jamais uploadees.',
  },
  de: {
    title: 'Bild zu Base64 Konverter', description: 'Bilder in Base64-Data-URI-Kodierung umwandeln.',
    dropZone: 'Bild hier ablegen oder klicken zum Hochladen', supportedFormats: 'Unterstuetzt: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP',
    outputLabel: 'Base64 Ausgabe', outputType: 'Ausgabeformat', dataUri: 'Vollstaendige Data URI (HTML/CSS)', base64Only: 'Nur Base64', cssFormat: 'CSS background-image', imgTag: 'HTML <img>-Tag',
    fileInfo: 'Dateiinfo', fileName: 'Dateiname', fileSize: 'Dateigroesse', fileType: 'Dateityp', b64Size: 'Base64-Groesse',
    preview: 'Vorschau', clear: 'Loeschen',
    introTitle: 'Kostenloser Online-Bild-zu-Base64-Encoder',
    introText: 'Konvertieren Sie beliebige Bilddateien mit diesem kostenlosen Online-Tool in Base64-Kodierung.',
    faqTitle: 'Haeufig Gestellte Fragen',
    faq1q: 'Was ist Base64-Bildkodierung?', faq1a: 'Base64 konvertiert binaere Daten (wie Bilder) in ASCII-Textzeichen.',
    faq2q: 'Wann sollte ich Base64-Bilder verwenden?', faq2a: 'Fuer kleine Bilder (unter 5-10 KB) in E-Mail-Vorlagen und kleine Symbole.',
    faq3q: 'Wie beeinflusst Base64 die Leistung?', faq3a: 'Base64 erhoht die Dateigroesse um etwa 33%, eliminiert aber separate HTTP-Anfragen.',
    faq4q: 'Wie verwende ich ein Base64-Bild in HTML?', faq4a: '<img src="data:image/png;base64,..."> oder in CSS: background-image: url("data:...").',
    faq5q: 'Werden Bilder auf dem Server verarbeitet?', faq5a: 'Nein, alles wird in Ihrem Browser durchgefuehrt. Ihre Bilder werden niemals hochgeladen.',
  },
  it: { title: 'Convertitore Immagine in Base64', description: 'Converti immagini in codifica data URI Base64.', dropZone: 'Rilascia un\'immagine qui o clicca per caricare', supportedFormats: 'Supporta: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'Output Base64', outputType: 'Formato di Output', dataUri: 'Data URI Completo (HTML/CSS)', base64Only: 'Solo Base64', cssFormat: 'CSS background-image', imgTag: 'Tag HTML <img>', fileInfo: 'Info File', fileName: 'Nome File', fileSize: 'Dimensione File', fileType: 'Tipo File', b64Size: 'Dimensione Base64', preview: 'Anteprima', clear: 'Cancella', introTitle: 'Encoder Base64 Immagine Gratuito Online', introText: 'Converti qualsiasi file immagine in codifica Base64 con questo strumento gratuito.', faqTitle: 'Domande Frequenti', faq1q: 'Cos\'e la codifica Base64?', faq1a: 'Base64 converte dati binari (come immagini) in caratteri ASCII.', faq2q: 'Quando usare immagini Base64?', faq2a: 'Per immagini piccole (meno di 5-10 KB) nei template email e piccole icone.', faq3q: 'Come influisce sulle prestazioni?', faq3a: 'Base64 aumenta la dimensione del file di circa il 33%, ma elimina richieste HTTP separate.', faq4q: 'Come usare un\'immagine Base64 in HTML?', faq4a: '<img src="data:image/png;base64,..."> o in CSS: background-image: url("data:...").', faq5q: 'Le immagini vengono elaborate sul server?', faq5a: 'No, tutto viene fatto nel browser. Le immagini non vengono mai caricate.' },
  es: { title: 'Convertidor de Imagen a Base64', description: 'Convierte imagenes a codificacion data URI Base64.', dropZone: 'Suelta una imagen aqui o haz clic para subir', supportedFormats: 'Compatible: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'Salida Base64', outputType: 'Formato de Salida', dataUri: 'Data URI Completo (HTML/CSS)', base64Only: 'Solo Base64', cssFormat: 'CSS background-image', imgTag: 'Etiqueta HTML <img>', fileInfo: 'Info de Archivo', fileName: 'Nombre de Archivo', fileSize: 'Tamano de Archivo', fileType: 'Tipo de Archivo', b64Size: 'Tamano Base64', preview: 'Vista Previa', clear: 'Limpiar', introTitle: 'Codificador Base64 de Imagenes Gratuito en Linea', introText: 'Convierte cualquier archivo de imagen a codificacion Base64 con esta herramienta gratuita.', faqTitle: 'Preguntas Frecuentes', faq1q: '¿Que es la codificacion Base64?', faq1a: 'Base64 convierte datos binarios (como imagenes) en caracteres ASCII.', faq2q: '¿Cuando usar imagenes Base64?', faq2a: 'Para imagenes pequenas (menos de 5-10 KB) en plantillas de email e iconos pequenos.', faq3q: '¿Como afecta al rendimiento?', faq3a: 'Base64 aumenta el tamano del archivo en un 33%, pero elimina solicitudes HTTP separadas.', faq4q: '¿Como usar una imagen Base64 en HTML?', faq4a: '<img src="data:image/png;base64,..."> o en CSS: background-image: url("data:...").', faq5q: '¿Las imagenes se procesan en el servidor?', faq5a: 'No, todo se hace en el navegador. Las imagenes nunca se suben.' },
  pt: { title: 'Conversor de Imagem para Base64', description: 'Converta imagens para codificacao data URI Base64.', dropZone: 'Solte uma imagem aqui ou clique para carregar', supportedFormats: 'Suportado: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'Saida Base64', outputType: 'Formato de Saida', dataUri: 'Data URI Completo (HTML/CSS)', base64Only: 'Somente Base64', cssFormat: 'CSS background-image', imgTag: 'Tag HTML <img>', fileInfo: 'Info do Arquivo', fileName: 'Nome do Arquivo', fileSize: 'Tamanho do Arquivo', fileType: 'Tipo de Arquivo', b64Size: 'Tamanho Base64', preview: 'Visualizacao', clear: 'Limpar', introTitle: 'Codificador Base64 de Imagens Gratuito Online', introText: 'Converta qualquer arquivo de imagem para codificacao Base64 com esta ferramenta gratuita.', faqTitle: 'Perguntas Frequentes', faq1q: 'O que e codificacao Base64?', faq1a: 'Base64 converte dados binarios (como imagens) em caracteres ASCII.', faq2q: 'Quando usar imagens Base64?', faq2a: 'Para imagens pequenas (menos de 5-10 KB) em templates de email e icones pequenos.', faq3q: 'Como afeta o desempenho?', faq3a: 'Base64 aumenta o tamanho do arquivo em cerca de 33%, mas elimina requisicoes HTTP separadas.', faq4q: 'Como usar uma imagem Base64 em HTML?', faq4a: '<img src="data:image/png;base64,..."> ou em CSS: background-image: url("data:...").', faq5q: 'As imagens sao processadas no servidor?', faq5a: 'Nao, tudo e feito no navegador. Suas imagens nunca sao enviadas.' },
  nl: { title: 'Afbeelding naar Base64 Converter', description: 'Converteer afbeeldingen naar Base64 data URI codering.', dropZone: 'Sleep hier een afbeelding of klik om te uploaden', supportedFormats: 'Ondersteund: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'Base64 Uitvoer', outputType: 'Uitvoerformaat', dataUri: 'Volledige Data URI (HTML/CSS)', base64Only: 'Alleen Base64', cssFormat: 'CSS background-image', imgTag: 'HTML <img> Tag', fileInfo: 'Bestandsinfo', fileName: 'Bestandsnaam', fileSize: 'Bestandsgrootte', fileType: 'Bestandstype', b64Size: 'Base64 Grootte', preview: 'Voorbeeld', clear: 'Wissen', introTitle: 'Gratis Online Afbeelding naar Base64 Encoder', introText: 'Converteer elk afbeeldingsbestand naar Base64-codering met dit gratis online hulpmiddel.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Wat is Base64-afbeeldingscodering?', faq1a: 'Base64 converteert binaire gegevens (zoals afbeeldingen) naar ASCII-teksttekens.', faq2q: 'Wanneer Base64-afbeeldingen gebruiken?', faq2a: 'Voor kleine afbeeldingen (minder dan 5-10 KB) in e-mailsjablonen en kleine pictogrammen.', faq3q: 'Hoe beinvloedt Base64 de prestaties?', faq3a: 'Base64 vergroot de bestandsgrootte met ongeveer 33%, maar elimineert afzonderlijke HTTP-verzoeken.', faq4q: 'Hoe gebruik ik een Base64-afbeelding in HTML?', faq4a: '<img src="data:image/png;base64,..."> of in CSS: background-image: url("data:...").', faq5q: 'Worden afbeeldingen op de server verwerkt?', faq5a: 'Nee, alles wordt in uw browser gedaan. Uw afbeeldingen worden nooit geupload.' },
  pl: { title: 'Konwerter Obrazu do Base64', description: 'Konwertuj obrazy do kodowania data URI Base64.', dropZone: 'Upusc obraz tutaj lub kliknij, aby przeslac', supportedFormats: 'Obsluguje: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'Wyjscie Base64', outputType: 'Format Wyjscia', dataUri: 'Pelne Data URI (HTML/CSS)', base64Only: 'Tylko Base64', cssFormat: 'CSS background-image', imgTag: 'Tag HTML <img>', fileInfo: 'Info o Pliku', fileName: 'Nazwa Pliku', fileSize: 'Rozmiar Pliku', fileType: 'Typ Pliku', b64Size: 'Rozmiar Base64', preview: 'Podglad', clear: 'Wyczysc', introTitle: 'Darmowy Encoder Base64 Obrazow Online', introText: 'Konwertuj dowolny plik obrazu do kodowania Base64 za pomoca tego darmowego narzedzia.', faqTitle: 'FAQ', faq1q: 'Co to jest kodowanie Base64?', faq1a: 'Base64 konwertuje dane binarne (takie jak obrazy) na znaki ASCII.', faq2q: 'Kiedy uzywac obrazow Base64?', faq2a: 'Dla malych obrazow (ponizej 5-10 KB) w szablonach email i malych ikonach.', faq3q: 'Jak Base64 wplywa na wydajnosc?', faq3a: 'Base64 zwieksza rozmiar pliku o ok. 33%, ale eliminuje oddzielne zadania HTTP.', faq4q: 'Jak uzywac obrazu Base64 w HTML?', faq4a: '<img src="data:image/png;base64,..."> lub w CSS: background-image: url("data:...").', faq5q: 'Czy obrazy sa przetwarzane na serwerze?', faq5a: 'Nie, wszystko jest robione w przegladarce. Twoje obrazy nigdy nie sa przesylane.' },
  sv: { title: 'Bild till Base64 Konverterare', description: 'Konvertera bilder till Base64 data URI-kodning.', dropZone: 'Slapp en bild har eller klicka for att ladda upp', supportedFormats: 'Stodjer: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'Base64 Utdata', outputType: 'Utdataformat', dataUri: 'Fullstandig Data URI (HTML/CSS)', base64Only: 'Endast Base64', cssFormat: 'CSS background-image', imgTag: 'HTML <img>-Tagg', fileInfo: 'Filinformation', fileName: 'Filnamn', fileSize: 'Filstorlek', fileType: 'Filtyp', b64Size: 'Base64 Storlek', preview: 'Foerhandsvisning', clear: 'Rensa', introTitle: 'Gratis Online Bild till Base64 Encoder', introText: 'Konvertera valfri bildfil till Base64-kodning med detta gratis onlineverktyg.', faqTitle: 'Vanliga Fragor', faq1q: 'Vad ar Base64-bildkodning?', faq1a: 'Base64 konverterar binaerdata (som bilder) till ASCII-texttecken.', faq2q: 'Nar bor man anvanda Base64-bilder?', faq2a: 'For sma bilder (under 5-10 KB) i e-postmallar och sma ikoner.', faq3q: 'Hur paverkar Base64 prestandan?', faq3a: 'Base64 okar filstorleken med ungefaer 33%, men eliminerar separata HTTP-forfragan.', faq4q: 'Hur anvander jag en Base64-bild i HTML?', faq4a: '<img src="data:image/png;base64,..."> eller i CSS: background-image: url("data:...").', faq5q: 'Behandlas bilder pa servern?', faq5a: 'Nej, allt gors i din webblaesare. Dina bilder laddas aldrig upp.' },
  no: { title: 'Bilde til Base64 Konverter', description: 'Konverter bilder til Base64 data URI-koding.', dropZone: 'Slipp et bilde her eller klikk for a laste opp', supportedFormats: 'Stotter: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'Base64 Utdata', outputType: 'Utdataformat', dataUri: 'Full Data URI (HTML/CSS)', base64Only: 'Kun Base64', cssFormat: 'CSS background-image', imgTag: 'HTML <img>-Tag', fileInfo: 'Filinformasjon', fileName: 'Filnavn', fileSize: 'Filstorrelse', fileType: 'Filtype', b64Size: 'Base64 Storrelse', preview: 'Forhandsvisning', clear: 'Tom', introTitle: 'Gratis Online Bilde til Base64 Encoder', introText: 'Konverter vilkarlige bildefiler til Base64-koding med dette gratis onlineverktøyet.', faqTitle: 'Vanlige Sporsmal', faq1q: 'Hva er Base64-bildekoding?', faq1a: 'Base64 konverterer binaerdata (som bilder) til ASCII-teksttegn.', faq2q: 'Nar bor jeg bruke Base64-bilder?', faq2a: 'For sma bilder (under 5-10 KB) i e-postmaler og sma ikoner.', faq3q: 'Hvordan pavirker Base64 ytelsen?', faq3a: 'Base64 oker filstorrelen med ca. 33%, men eliminerer separate HTTP-forsporsler.', faq4q: 'Hvordan bruker jeg et Base64-bilde i HTML?', faq4a: '<img src="data:image/png;base64,..."> eller i CSS: background-image: url("data:...").', faq5q: 'Behandles bilder pa serveren?', faq5a: 'Nei, alt gjores i nettleseren din. Bildene dine lastes aldri opp.' },
  zh: {
    title: '图片转 Base64 工具', description: '将图片转换为 Base64 data URI 编码，支持 PNG、JPG、GIF、WebP、SVG 等格式。',
    dropZone: '将图片拖放到此处或点击上传', supportedFormats: '支持格式：PNG、JPG、JPEG、GIF、WebP、SVG、ICO、BMP',
    outputLabel: 'Base64 输出', outputType: '输出格式', dataUri: '完整 Data URI（HTML/CSS）', base64Only: '仅 Base64', cssFormat: 'CSS background-image', imgTag: 'HTML <img> 标签',
    fileInfo: '文件信息', fileName: '文件名', fileSize: '文件大小', fileType: '文件类型', b64Size: 'Base64 大小',
    preview: '预览', clear: '清除',
    introTitle: '免费在线图片转 Base64 编码工具',
    introText: '使用此免费在线工具将任意图片文件转换为 Base64 编码。Base64 编码常用于将图片直接嵌入 HTML、CSS 和 JavaScript，无需额外的图片文件请求，适合小图标和电子邮件模板。',
    faqTitle: '常见问题',
    faq1q: '什么是 Base64 图片编码？', faq1a: 'Base64 是一种将二进制数据（如图片）转换为 ASCII 文本字符的编码方案，允许将图片直接嵌入 HTML/CSS/JS 中。',
    faq2q: '什么时候应该使用 Base64 图片？', faq2a: '适用于小图片（5-10KB 以下），如电子邮件模板中的图标和页面必用的小图标。',
    faq3q: 'Base64 对性能有什么影响？', faq3a: 'Base64 编码会使文件大小增加约 33%，但能消除额外的 HTTP 请求。大图片不建议使用 Base64。',
    faq4q: '如何在 HTML 中使用 Base64 图片？', faq4a: '在 img 标签中：<img src="data:image/png;base64,...">，或在 CSS 中：background-image: url("data:image/png;base64,...")。',
    faq5q: '图片会被上传到服务器吗？', faq5a: '不会，此工具完全在您的浏览器中进行转换，您的图片不会被上传到任何服务器。',
  },
  ja: {
    title: '画像を Base64 に変換', description: '画像を Base64 データ URI エンコーディングに変換します。',
    dropZone: 'ここに画像をドロップするかクリックしてアップロード', supportedFormats: 'サポート: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP',
    outputLabel: 'Base64 出力', outputType: '出力形式', dataUri: '完全な Data URI (HTML/CSS)', base64Only: 'Base64 のみ', cssFormat: 'CSS background-image', imgTag: 'HTML <img> タグ',
    fileInfo: 'ファイル情報', fileName: 'ファイル名', fileSize: 'ファイルサイズ', fileType: 'ファイルタイプ', b64Size: 'Base64 サイズ',
    preview: 'プレビュー', clear: 'クリア',
    introTitle: '無料オンライン画像から Base64 エンコーダー',
    introText: '任意の画像ファイルを Base64 エンコーディングに変換します。HTML、CSS、JavaScript に画像を直接埋め込むのに便利です。',
    faqTitle: 'よくある質問',
    faq1q: 'Base64 画像エンコーディングとは？', faq1a: 'Base64 はバイナリデータ（画像など）を ASCII テキスト文字に変換するエンコーディングスキームです。',
    faq2q: 'Base64 画像を使うべき場合は？', faq2a: '小さな画像（5-10KB 未満）のメールテンプレートやアイコンに使用してください。',
    faq3q: 'Base64 はパフォーマンスにどう影響しますか？', faq3a: 'Base64 はファイルサイズを約 33% 増加させますが、別の HTTP リクエストを不要にします。',
    faq4q: 'HTML で Base64 画像を使う方法は？', faq4a: '<img src="data:image/png;base64,..."> または CSS: background-image: url("data:...")。',
    faq5q: '画像はサーバーで処理されますか？', faq5a: 'いいえ、すべてブラウザ内で処理されます。画像がアップロードされることはありません。',
  },
  ko: {
    title: '이미지를 Base64로 변환', description: '이미지를 Base64 data URI 인코딩으로 변환하세요.',
    dropZone: '이미지를 여기에 드롭하거나 클릭하여 업로드', supportedFormats: '지원 형식: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP',
    outputLabel: 'Base64 출력', outputType: '출력 형식', dataUri: '전체 Data URI (HTML/CSS)', base64Only: 'Base64만', cssFormat: 'CSS background-image', imgTag: 'HTML <img> 태그',
    fileInfo: '파일 정보', fileName: '파일 이름', fileSize: '파일 크기', fileType: '파일 유형', b64Size: 'Base64 크기',
    preview: '미리보기', clear: '초기화',
    introTitle: '무료 온라인 이미지 to Base64 인코더',
    introText: '이 무료 온라인 도구로 모든 이미지 파일을 Base64 인코딩으로 변환하세요.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Base64 이미지 인코딩이란?', faq1a: 'Base64는 이진 데이터(이미지 등)를 ASCII 텍스트 문자로 변환하는 인코딩 방식입니다.',
    faq2q: 'Base64 이미지는 언제 사용해야 하나요?', faq2a: '작은 이미지(5-10KB 미만)의 이메일 템플릿이나 아이콘에 사용하세요.',
    faq3q: 'Base64가 성능에 어떤 영향을 미치나요?', faq3a: 'Base64는 파일 크기를 약 33% 증가시키지만 별도의 HTTP 요청을 제거합니다.',
    faq4q: 'HTML에서 Base64 이미지를 어떻게 사용하나요?', faq4a: '<img src="data:image/png;base64,..."> 또는 CSS: background-image: url("data:...").',
    faq5q: '이미지가 서버에서 처리되나요?', faq5a: '아니요, 모든 것이 브라우저에서 처리됩니다. 이미지는 절대 업로드되지 않습니다.',
  },
  id: { title: 'Konverter Gambar ke Base64', description: 'Konversi gambar ke pengkodean data URI Base64.', dropZone: 'Jatuhkan gambar di sini atau klik untuk mengunggah', supportedFormats: 'Didukung: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'Output Base64', outputType: 'Format Output', dataUri: 'Data URI Lengkap (HTML/CSS)', base64Only: 'Hanya Base64', cssFormat: 'CSS background-image', imgTag: 'Tag HTML <img>', fileInfo: 'Info File', fileName: 'Nama File', fileSize: 'Ukuran File', fileType: 'Jenis File', b64Size: 'Ukuran Base64', preview: 'Pratinjau', clear: 'Bersihkan', introTitle: 'Encoder Base64 Gambar Gratis Online', introText: 'Konversi file gambar apapun ke pengkodean Base64 dengan alat gratis ini.', faqTitle: 'FAQ', faq1q: 'Apa itu pengkodean Base64?', faq1a: 'Base64 mengubah data biner (seperti gambar) menjadi karakter teks ASCII.', faq2q: 'Kapan menggunakan gambar Base64?', faq2a: 'Untuk gambar kecil (kurang dari 5-10 KB) dalam template email dan ikon kecil.', faq3q: 'Bagaimana Base64 mempengaruhi kinerja?', faq3a: 'Base64 meningkatkan ukuran file sekitar 33%, tetapi menghilangkan permintaan HTTP terpisah.', faq4q: 'Cara menggunakan gambar Base64 di HTML?', faq4a: '<img src="data:image/png;base64,..."> atau di CSS: background-image: url("data:...").', faq5q: 'Apakah gambar diproses di server?', faq5a: 'Tidak, semuanya dilakukan di browser Anda. Gambar Anda tidak pernah diunggah.' },
  th: { title: 'แปลงรูปภาพเป็น Base64', description: 'แปลงรูปภาพเป็นการเข้ารหัส Base64 data URI', dropZone: 'วางรูปภาพที่นี่หรือคลิกเพื่ออัปโหลด', supportedFormats: 'รองรับ: PNG, JPG, JPEG, GIF, WebP, SVG, ICO, BMP', outputLabel: 'เอาต์พุต Base64', outputType: 'รูปแบบเอาต์พุต', dataUri: 'Data URI สมบูรณ์ (HTML/CSS)', base64Only: 'เฉพาะ Base64', cssFormat: 'CSS background-image', imgTag: 'HTML <img> tag', fileInfo: 'ข้อมูลไฟล์', fileName: 'ชื่อไฟล์', fileSize: 'ขนาดไฟล์', fileType: 'ประเภทไฟล์', b64Size: 'ขนาด Base64', preview: 'ตัวอย่าง', clear: 'ล้าง', introTitle: 'ตัวเข้ารหัส Base64 รูปภาพฟรีออนไลน์', introText: 'แปลงไฟล์รูปภาพใดก็ได้เป็นการเข้ารหัส Base64 ด้วยเครื่องมือฟรีนี้', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'การเข้ารหัส Base64 คืออะไร?', faq1a: 'Base64 แปลงข้อมูลไบนารี (เช่น รูปภาพ) เป็นอักขระข้อความ ASCII', faq2q: 'ควรใช้รูปภาพ Base64 เมื่อไหร่?', faq2a: 'สำหรับรูปภาพขนาดเล็ก (น้อยกว่า 5-10 KB) ในเทมเพลตอีเมลและไอคอนเล็ก', faq3q: 'Base64 ส่งผลต่อประสิทธิภาพอย่างไร?', faq3a: 'Base64 เพิ่มขนาดไฟล์ประมาณ 33% แต่ลดคำขอ HTTP แยก', faq4q: 'วิธีใช้รูปภาพ Base64 ใน HTML?', faq4a: '<img src="data:image/png;base64,..."> หรือใน CSS: background-image: url("data:...")', faq5q: 'รูปภาพถูกประมวลผลบนเซิร์ฟเวอร์หรือไม่?', faq5a: 'ไม่ ทุกอย่างทำในเบราว์เซอร์ของคุณ รูปภาพของคุณจะไม่ถูกอัปโหลด' },
};

type OutFmt = 'dataUri' | 'base64Only' | 'cssFormat' | 'imgTag';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageToBase64() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [result, setResult] = useState<{
    dataUri: string; fileName: string; fileSize: number; fileType: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [outputFmt, setOutputFmt] = useState<OutFmt>('dataUri');

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      setResult({ dataUri, fileName: file.name, fileSize: file.size, fileType: file.type });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) processFile(file);
  }, [processFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const getOutput = () => {
    if (!result) return '';
    const b64 = result.dataUri.split(',')[1] || '';
    switch (outputFmt) {
      case 'dataUri': return result.dataUri;
      case 'base64Only': return b64;
      case 'cssFormat': return `background-image: url("${result.dataUri}");`;
      case 'imgTag': return `<img src="${result.dataUri}" alt="${result.fileName}" />`;
    }
  };

  const output = getOutput();
  const b64Size = result ? formatBytes(Math.ceil(result.dataUri.length * 0.75)) : '';

  return (
    <ToolLayout title={t.title} description={t.description} toolId="image-to-base64">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => document.getElementById('img-file-input')?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-blue)' : 'var(--border-color)'}`,
          borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer',
          background: isDragging ? 'rgba(59,130,246,0.05)' : 'var(--bg-input)',
          transition: 'all 0.2s', marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{t.dropZone}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.supportedFormats}</div>
        <input id="img-file-input" type="file" accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} />
      </div>

      {result && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, marginBottom: 20 }}>
            {/* Preview */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.preview}</div>
              <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', background: 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 0 0 / 16px 16px', padding: 8 }}>
                <img src={result.dataUri} alt="preview" style={{ maxWidth: '100%', maxHeight: 150, display: 'block', margin: '0 auto' }} />
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div><strong>{t.fileName}:</strong> {result.fileName}</div>
                <div><strong>{t.fileSize}:</strong> {formatBytes(result.fileSize)}</div>
                <div><strong>{t.fileType}:</strong> {result.fileType}</div>
                <div><strong>{t.b64Size}:</strong> ~{b64Size}</div>
              </div>
              <button onClick={() => setResult(null)} className="btn btn-secondary" style={{ marginTop: 12, fontSize: 12, width: '100%' }}>{t.clear}</button>
            </div>

            {/* Output */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</div>
                <CopyButton text={output} />
              </div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                {(['dataUri', 'base64Only', 'cssFormat', 'imgTag'] as OutFmt[]).map(fmt => (
                  <button key={fmt} onClick={() => setOutputFmt(fmt)} style={{
                    padding: '3px 10px', fontSize: 11, borderRadius: 4, border: '1px solid var(--border-color)',
                    background: outputFmt === fmt ? 'var(--accent-blue)' : 'var(--bg-input)',
                    color: outputFmt === fmt ? 'white' : 'var(--text-primary)', cursor: 'pointer',
                  }}>{t[fmt as keyof typeof t]}</button>
                ))}
              </div>
              <textarea value={output} readOnly style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 11, wordBreak: 'break-all' }} />
            </div>
          </div>
        </>
      )}

      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{t.faqTitle}</h2>
        {[1, 2, 3, 4, 5].map(n => (
          <details key={n} style={{ border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              {t[`faq${n}q` as keyof typeof t]}
            </summary>
            <div style={{ padding: '0 16px 12px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {t[`faq${n}a` as keyof typeof t]}
            </div>
          </details>
        ))}
      </div>
    </ToolLayout>
  );
}
