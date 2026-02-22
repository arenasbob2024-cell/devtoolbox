'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 Image Converter',
    description: 'Convert images to Base64 strings and Base64 back to images. Drag & drop or paste to encode any image format instantly.',
    encodeTab: 'Image to Base64',
    decodeTab: 'Base64 to Image',
    dropText: 'Drop an image here or click to select',
    supported: 'Supports PNG, JPG, GIF, SVG, WebP, ICO, BMP',
    fileName: 'File',
    fileSize: 'Size',
    fileType: 'Type',
    b64Length: 'Base64 length',
    chars: 'chars',
    b64String: 'Base64 String',
    dataUri: 'Data URI',
    htmlTag: 'HTML <img> Tag',
    cssBg: 'CSS Background',
    pasteLabel: 'Paste Base64 or Data URI',
    pastePlaceholder: 'Paste a Base64 string or data:image/png;base64,... URI here',
    decodeBtn: 'Decode to Image',
    clear: 'Clear',
    introTitle: 'Free Online Base64 Image Converter',
    introText: 'This tool converts images to Base64-encoded strings and decodes Base64 strings back to images. Base64 encoding lets you embed images directly in HTML, CSS, or JavaScript without external file requests. Simply drag and drop your image or paste a Base64 string to convert.',
    howTitle: 'How to Convert Image to Base64',
    step1: 'Drag and drop your image file onto the upload area, or click to browse',
    step2: 'The tool instantly encodes the image to a Base64 string',
    step3: 'Copy the Base64 string, Data URI, HTML tag, or CSS background snippet',
    step4: 'To decode, switch to "Base64 to Image" tab and paste your Base64 string',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is Base64 image encoding?',
    faq1a: 'Base64 image encoding converts binary image data into an ASCII text string. This allows images to be embedded directly in HTML, CSS, or JSON without requiring separate HTTP requests. The encoded string is about 33% larger than the original binary data, but eliminates the need for additional file downloads.',
    faq2q: 'When should I use Base64 images?',
    faq2a: 'Base64 images are best for small icons, logos, and UI elements under 10KB. They reduce HTTP requests and can improve initial page load for small assets. Avoid Base64 for large images as the encoded size is ~33% larger than the original, and large Base64 strings cannot be cached separately by the browser.',
    faq3q: 'What image formats can be converted to Base64?',
    faq3a: 'Any image format can be converted to Base64, including PNG, JPEG, GIF, SVG, WebP, ICO, and BMP. The resulting Base64 string includes the MIME type in the data URI prefix (e.g., data:image/png;base64,...), so the browser knows how to render it correctly.',
    faq4q: 'Does Base64 encoding affect image quality?',
    faq4a: 'No, Base64 encoding is lossless. It is simply a different representation of the same binary data. The decoded image is identical to the original. However, if you compress the image before encoding (e.g., JPEG compression), that compression quality applies regardless of Base64 encoding.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Base64 图片转换器',
    description: '将图片转换为 Base64 字符串，或将 Base64 转换回图片。拖放或粘贴即可即时编码任何图片格式。',
    encodeTab: '图片转 Base64',
    decodeTab: 'Base64 转图片',
    dropText: '拖放图片到此处或点击选择',
    supported: '支持 PNG, JPG, GIF, SVG, WebP, ICO, BMP',
    fileName: '文件',
    fileSize: '大小',
    fileType: '类型',
    b64Length: 'Base64 长度',
    chars: '字符',
    b64String: 'Base64 字符串',
    dataUri: 'Data URI',
    htmlTag: 'HTML <img> 标签',
    cssBg: 'CSS 背景',
    pasteLabel: '粘贴 Base64 或 Data URI',
    pastePlaceholder: '粘贴 Base64 字符串或 data:image/png;base64,... URI',
    decodeBtn: '解码为图片',
    clear: '清除',
    introTitle: '免费在线 Base64 图片转换器',
    introText: '此工具将图片转换为 Base64 编码字符串，也可将 Base64 字符串解码为图片。Base64 编码可以直接在 HTML、CSS 或 JavaScript 中嵌入图片，无需额外的文件请求。',
    howTitle: '如何将图片转换为 Base64',
    step1: '将图片文件拖放到上传区域，或点击浏览选择',
    step2: '工具会即时将图片编码为 Base64 字符串',
    step3: '复制 Base64 字符串、Data URI、HTML 标签或 CSS 背景代码',
    step4: '要解码，切换到"Base64 转图片"标签页并粘贴 Base64 字符串',
    faqTitle: '常见问题',
    faq1q: '什么是 Base64 图片编码？',
    faq1a: 'Base64 图片编码将二进制图片数据转换为 ASCII 文本字符串。这允许在 HTML、CSS 或 JSON 中直接嵌入图片，无需额外的 HTTP 请求。编码后的字符串比原始二进制数据大约大 33%。',
    faq2q: '什么时候应该使用 Base64 图片？',
    faq2a: 'Base64 图片最适合 10KB 以下的小图标、Logo 和 UI 元素。它们减少 HTTP 请求并可以改善小资源的初始页面加载。避免对大图片使用 Base64。',
    faq3q: '哪些图片格式可以转换为 Base64？',
    faq3a: '任何图片格式都可以转换为 Base64，包括 PNG、JPEG、GIF、SVG、WebP、ICO 和 BMP。',
    faq4q: 'Base64 编码会影响图片质量吗？',
    faq4a: '不会，Base64 编码是无损的。它只是同一二进制数据的不同表示方式。解码后的图片与原始图片完全相同。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur Image Base64',
    description: 'Convertissez des images en chaines Base64 et inversement. Glissez-deposez ou collez pour encoder instantanement.',
    encodeTab: 'Image vers Base64',
    decodeTab: 'Base64 vers Image',
    dropText: 'Deposez une image ici ou cliquez pour selectionner',
    supported: 'Supporte PNG, JPG, GIF, SVG, WebP, ICO, BMP',
    fileName: 'Fichier', fileSize: 'Taille', fileType: 'Type',
    b64Length: 'Longueur Base64', chars: 'caracteres',
    b64String: 'Chaine Base64', dataUri: 'Data URI',
    htmlTag: 'Balise HTML <img>', cssBg: 'CSS Background',
    pasteLabel: 'Collez Base64 ou Data URI',
    pastePlaceholder: 'Collez une chaine Base64 ou data:image/png;base64,...',
    decodeBtn: 'Decoder en image', clear: 'Effacer',
    introTitle: 'Convertisseur Image Base64 gratuit',
    introText: 'Cet outil convertit les images en chaines Base64 et decode les chaines Base64 en images. Glissez et deposez votre image ou collez une chaine Base64.',
    howTitle: 'Comment convertir une image en Base64',
    step1: 'Glissez-deposez votre fichier image sur la zone de telechargement',
    step2: "L'outil encode instantanement l'image en chaine Base64",
    step3: 'Copiez la chaine Base64, le Data URI, la balise HTML ou le CSS',
    step4: 'Pour decoder, passez a l\'onglet "Base64 vers Image" et collez',
    faqTitle: 'Questions frequentes',
    faq1q: "Qu'est-ce que l'encodage Base64 d'image ?",
    faq1a: "L'encodage Base64 convertit les donnees binaires d'image en texte ASCII, permettant d'integrer des images directement dans HTML, CSS ou JSON.",
    faq2q: 'Quand utiliser les images Base64 ?',
    faq2a: 'Les images Base64 sont ideales pour les petites icones et logos de moins de 10 Ko. Elles reduisent les requetes HTTP.',
    faq3q: 'Quels formats sont supportes ?',
    faq3a: 'Tous les formats : PNG, JPEG, GIF, SVG, WebP, ICO et BMP.',
    faq4q: "L'encodage Base64 affecte-t-il la qualite ?",
    faq4a: "Non, l'encodage Base64 est sans perte. L'image decodee est identique a l'originale.",
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Base64 Bild Konverter',
    description: 'Konvertieren Sie Bilder in Base64-Strings und umgekehrt. Drag & Drop oder Einfuegen zum sofortigen Kodieren.',
    encodeTab: 'Bild zu Base64', decodeTab: 'Base64 zu Bild',
    dropText: 'Bild hierher ziehen oder klicken zum Auswaehlen',
    supported: 'Unterstuetzt PNG, JPG, GIF, SVG, WebP, ICO, BMP',
    fileName: 'Datei', fileSize: 'Groesse', fileType: 'Typ',
    b64Length: 'Base64-Laenge', chars: 'Zeichen',
    b64String: 'Base64-String', dataUri: 'Data URI',
    htmlTag: 'HTML <img> Tag', cssBg: 'CSS Hintergrund',
    pasteLabel: 'Base64 oder Data URI einfuegen',
    pastePlaceholder: 'Base64-String oder data:image/png;base64,... einfuegen',
    decodeBtn: 'Als Bild dekodieren', clear: 'Loeschen',
    introTitle: 'Kostenloser Online Base64 Bild Konverter',
    introText: 'Dieses Tool konvertiert Bilder in Base64-kodierte Strings und dekodiert Base64-Strings zurueck in Bilder.',
    howTitle: 'Wie konvertiert man ein Bild zu Base64',
    step1: 'Ziehen Sie Ihre Bilddatei in den Upload-Bereich',
    step2: 'Das Tool kodiert das Bild sofort in einen Base64-String',
    step3: 'Kopieren Sie den Base64-String, Data URI, HTML-Tag oder CSS',
    step4: 'Zum Dekodieren wechseln Sie zum Tab "Base64 zu Bild"',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist Base64-Bildkodierung?',
    faq1a: 'Base64-Bildkodierung konvertiert binaere Bilddaten in ASCII-Text, um Bilder direkt in HTML, CSS oder JSON einzubetten.',
    faq2q: 'Wann sollte man Base64-Bilder verwenden?',
    faq2a: 'Base64-Bilder eignen sich am besten fuer kleine Icons und Logos unter 10 KB.',
    faq3q: 'Welche Formate werden unterstuetzt?',
    faq3a: 'Alle Formate: PNG, JPEG, GIF, SVG, WebP, ICO und BMP.',
    faq4q: 'Beeinflusst Base64-Kodierung die Bildqualitaet?',
    faq4a: 'Nein, Base64-Kodierung ist verlustfrei. Das dekodierte Bild ist identisch mit dem Original.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor de Imagen Base64',
    description: 'Convierte imagenes a cadenas Base64 y viceversa. Arrastra y suelta o pega para codificar al instante.',
    encodeTab: 'Imagen a Base64', decodeTab: 'Base64 a Imagen',
    dropText: 'Suelta una imagen aqui o haz clic para seleccionar',
    supported: 'Soporta PNG, JPG, GIF, SVG, WebP, ICO, BMP',
    fileName: 'Archivo', fileSize: 'Tamano', fileType: 'Tipo',
    b64Length: 'Longitud Base64', chars: 'caracteres',
    b64String: 'Cadena Base64', dataUri: 'Data URI',
    htmlTag: 'Etiqueta HTML <img>', cssBg: 'CSS Background',
    pasteLabel: 'Pegar Base64 o Data URI',
    pastePlaceholder: 'Pega una cadena Base64 o data:image/png;base64,...',
    decodeBtn: 'Decodificar a imagen', clear: 'Limpiar',
    introTitle: 'Convertidor de Imagen Base64 gratuito',
    introText: 'Esta herramienta convierte imagenes en cadenas Base64 y decodifica cadenas Base64 de vuelta a imagenes.',
    howTitle: 'Como convertir una imagen a Base64',
    step1: 'Arrastra y suelta tu archivo de imagen en el area de carga',
    step2: 'La herramienta codifica instantaneamente la imagen a Base64',
    step3: 'Copia la cadena Base64, Data URI, etiqueta HTML o CSS',
    step4: 'Para decodificar, cambia a la pestana "Base64 a Imagen"',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la codificacion Base64 de imagenes?',
    faq1a: 'La codificacion Base64 convierte datos binarios de imagen en texto ASCII para incrustar imagenes directamente en HTML, CSS o JSON.',
    faq2q: 'Cuando usar imagenes Base64?',
    faq2a: 'Las imagenes Base64 son ideales para iconos pequenos y logos de menos de 10 KB.',
    faq3q: 'Que formatos se soportan?',
    faq3a: 'Todos los formatos: PNG, JPEG, GIF, SVG, WebP, ICO y BMP.',
    faq4q: 'La codificacion Base64 afecta la calidad?',
    faq4a: 'No, la codificacion Base64 es sin perdida. La imagen decodificada es identica a la original.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'Base64 画像変換ツール',
    description: '画像をBase64文字列に変換、またはBase64を画像に変換。ドラッグ&ドロップまたは貼り付けで即座にエンコード。',
    encodeTab: '画像 → Base64', decodeTab: 'Base64 → 画像',
    dropText: '画像をここにドロップまたはクリックして選択',
    supported: 'PNG, JPG, GIF, SVG, WebP, ICO, BMP 対応',
    fileName: 'ファイル', fileSize: 'サイズ', fileType: 'タイプ',
    b64Length: 'Base64長さ', chars: '文字',
    b64String: 'Base64文字列', dataUri: 'Data URI',
    htmlTag: 'HTML <img> タグ', cssBg: 'CSS背景',
    pasteLabel: 'Base64またはData URIを貼り付け',
    pastePlaceholder: 'Base64文字列またはdata:image/png;base64,...を貼り付け',
    decodeBtn: '画像にデコード', clear: 'クリア',
    introTitle: '無料オンラインBase64画像変換ツール',
    introText: 'このツールは画像をBase64エンコード文字列に変換し、Base64文字列を画像にデコードします。',
    howTitle: '画像をBase64に変換する方法',
    step1: '画像ファイルをアップロードエリアにドラッグ&ドロップ',
    step2: 'ツールが即座に画像をBase64文字列にエンコード',
    step3: 'Base64文字列、Data URI、HTMLタグ、CSSをコピー',
    step4: 'デコードするには「Base64 → 画像」タブに切り替え',
    faqTitle: 'よくある質問',
    faq1q: 'Base64画像エンコードとは？',
    faq1a: 'Base64画像エンコードはバイナリ画像データをASCIIテキスト文字列に変換し、HTML、CSS、JSONに直接埋め込みます。',
    faq2q: 'Base64画像はいつ使うべき？',
    faq2a: '10KB以下の小さなアイコンやロゴに最適です。HTTPリクエストを削減できます。',
    faq3q: 'どの画像形式に対応？',
    faq3a: 'PNG、JPEG、GIF、SVG、WebP、ICO、BMPすべてに対応しています。',
    faq4q: 'Base64エンコードは画質に影響する？',
    faq4a: 'いいえ、Base64エンコードはロスレスです。デコードされた画像は元と同一です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Base64 이미지 변환기',
    description: '이미지를 Base64 문자열로 변환하거나 Base64를 이미지로 변환합니다. 드래그 앤 드롭 또는 붙여넣기로 즉시 인코딩.',
    encodeTab: '이미지 → Base64', decodeTab: 'Base64 → 이미지',
    dropText: '이미지를 여기에 드롭하거나 클릭하여 선택',
    supported: 'PNG, JPG, GIF, SVG, WebP, ICO, BMP 지원',
    fileName: '파일', fileSize: '크기', fileType: '유형',
    b64Length: 'Base64 길이', chars: '문자',
    b64String: 'Base64 문자열', dataUri: 'Data URI',
    htmlTag: 'HTML <img> 태그', cssBg: 'CSS 배경',
    pasteLabel: 'Base64 또는 Data URI 붙여넣기',
    pastePlaceholder: 'Base64 문자열 또는 data:image/png;base64,...를 붙여넣으세요',
    decodeBtn: '이미지로 디코딩', clear: '지우기',
    introTitle: '무료 온라인 Base64 이미지 변환기',
    introText: '이 도구는 이미지를 Base64 인코딩 문자열로 변환하고 Base64 문자열을 이미지로 디코딩합니다.',
    howTitle: '이미지를 Base64로 변환하는 방법',
    step1: '이미지 파일을 업로드 영역에 드래그 앤 드롭',
    step2: '도구가 즉시 이미지를 Base64 문자열로 인코딩',
    step3: 'Base64 문자열, Data URI, HTML 태그, CSS를 복사',
    step4: '디코딩하려면 "Base64 → 이미지" 탭으로 전환',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Base64 이미지 인코딩이란?',
    faq1a: 'Base64 이미지 인코딩은 바이너리 이미지 데이터를 ASCII 텍스트 문자열로 변환하여 HTML, CSS, JSON에 직접 포함시킵니다.',
    faq2q: 'Base64 이미지는 언제 사용해야 하나요?',
    faq2a: '10KB 이하의 작은 아이콘과 로고에 가장 적합합니다. HTTP 요청을 줄일 수 있습니다.',
    faq3q: '어떤 이미지 형식을 지원하나요?',
    faq3a: 'PNG, JPEG, GIF, SVG, WebP, ICO, BMP 모두 지원합니다.',
    faq4q: 'Base64 인코딩이 이미지 품질에 영향을 주나요?',
    faq4a: '아니요, Base64 인코딩은 무손실입니다. 디코딩된 이미지는 원본과 동일합니다.',
    relatedTitle: '관련 도구',
  },
};

export default function Base64ImageConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [base64, setBase64] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [mimeType, setMimeType] = useState('');
  const [preview, setPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [decodeInput, setDecodeInput] = useState('');
  const [decodedPreview, setDecodedPreview] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDecode = () => {
    let input = decodeInput.trim();
    if (input.startsWith('data:image')) {
      setDecodedPreview(input);
    } else {
      setDecodedPreview(`data:image/png;base64,${input}`);
    }
  };

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
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="base64-image-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-input)', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {(['encode', 'decode'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '6px 18px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
              background: mode === m ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'transparent',
              color: mode === m ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {m === 'encode' ? t.encodeTab : t.decodeTab}
          </button>
        ))}
      </div>

      {mode === 'encode' ? (
        <>
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${isDragging ? 'var(--accent-blue)' : 'var(--border-color)'}`,
              borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer',
              transition: 'all 0.2s',
              background: isDragging ? 'rgba(59,130,246,0.05)' : 'var(--bg-input)',
              marginBottom: 20,
            }}
          >
            <input ref={fileInputRef} type="file" accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }}
              style={{ display: 'none' }} />
            <div style={{ fontSize: 40, marginBottom: 12 }}>{'🖼️'}</div>
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
                  <div><strong style={{ color: 'var(--text-primary)' }}>{t.b64Length}:</strong> {base64.length.toLocaleString()} {t.chars} ({(base64.length * 0.75 / 1024).toFixed(1)} KB)</div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>{t.b64String}</label>
                  <CopyButton text={base64} />
                </div>
                <textarea value={base64} readOnly style={{ minHeight: 120, fontSize: 11 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>{t.dataUri}</label>
                  <CopyButton text={dataUri} />
                </div>
                <textarea value={dataUri} readOnly style={{ minHeight: 80, fontSize: 11 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>{t.htmlTag}</label>
                  <CopyButton text={htmlSnippet} />
                </div>
                <textarea value={htmlSnippet} readOnly style={{ minHeight: 60, fontSize: 12 }} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>{t.cssBg}</label>
                  <CopyButton text={cssSnippet} />
                </div>
                <textarea value={cssSnippet} readOnly style={{ minHeight: 60, fontSize: 12 }} />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.pasteLabel}</label>
            <textarea value={decodeInput} onChange={e => setDecodeInput(e.target.value)}
              placeholder={t.pastePlaceholder} style={{ minHeight: 180 }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button onClick={handleDecode} className="btn btn-primary">{t.decodeBtn}</button>
            <button onClick={() => { setDecodeInput(''); setDecodedPreview(''); }} className="btn btn-secondary">{t.clear}</button>
          </div>
          {decodedPreview && (
            <div style={{ background: 'var(--bg-input)', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid var(--border-color)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={decodedPreview} alt="Decoded" style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8 }}
                onError={() => setDecodedPreview('')} />
            </div>
          )}
        </>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

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
            { href: `/${lang}/tools/image-base64`, label: 'Image Base64 Converter' },
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/base64-encoder`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/base64-decoder`, label: 'Base64 Decoder' },
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
