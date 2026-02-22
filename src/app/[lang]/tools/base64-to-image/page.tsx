'use client';

import { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 to Image Converter',
    description: 'Decode Base64 strings to images online. Paste a Base64-encoded image and instantly preview and download it.',
    inputLabel: 'Base64 Input',
    inputPlaceholder: 'Paste your Base64-encoded image string here (with or without data URI prefix)...',
    preview: 'Image Preview',
    noPreview: 'Paste a Base64 string to see the image preview',
    decodeBtn: 'Decode & Preview',
    clear: 'Clear',
    download: 'Download Image',
    loadSample: 'Load Sample',
    imgInfo: 'Image Info',
    format: 'Format',
    size: 'Data Size',
    dimensions: 'Dimensions',
    dataUri: 'Data URI',
    error: 'Error',
    invalidBase64: 'Invalid Base64 image string. Make sure it contains valid image data.',
    introTitle: 'Free Online Base64 to Image Converter',
    introText: 'Decode Base64-encoded image strings back to viewable images. This tool accepts raw Base64 strings or full data URIs (data:image/png;base64,...) and renders the image instantly. Supports PNG, JPEG, GIF, WebP, SVG, and BMP formats. Ideal for debugging email templates, inspecting embedded images, and converting API responses containing Base64 image data.',
    cheatTitle: 'Base64 Image Formats',
    ruleCol: 'Format', descCol: 'Data URI Prefix', exampleCol: 'Usage',
    rule1: 'PNG', rule1Desc: 'data:image/png;base64,...', rule1Ex: 'Lossless, transparency',
    rule2: 'JPEG', rule2Desc: 'data:image/jpeg;base64,...', rule2Ex: 'Photos, smaller size',
    rule3: 'GIF', rule3Desc: 'data:image/gif;base64,...', rule3Ex: 'Animations, simple graphics',
    rule4: 'WebP', rule4Desc: 'data:image/webp;base64,...', rule4Ex: 'Modern, best compression',
    rule5: 'SVG', rule5Desc: 'data:image/svg+xml;base64,...', rule5Ex: 'Vector graphics, scalable',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a Base64 encoded image?',
    faq1a: 'A Base64 encoded image is binary image data that has been converted to an ASCII text string using the Base64 encoding scheme. This allows images to be embedded directly in HTML, CSS, JSON, or transmitted via text-based protocols like email and APIs.',
    faq2q: 'Do I need to include the data URI prefix?',
    faq2a: 'No, the converter works with both raw Base64 strings and full data URIs. If you paste a raw Base64 string without the prefix, the tool will attempt to auto-detect the image format. For best results, include the full data URI prefix.',
    faq3q: 'What image formats are supported?',
    faq3a: 'The converter supports all common image formats including PNG, JPEG, GIF, WebP, SVG, and BMP. Any format that can be displayed in a web browser can be decoded from Base64.',
    faq4q: 'Is there a file size limit?',
    faq4a: 'The tool processes images entirely in your browser, so there is no server-side limit. However, very large Base64 strings (over 5MB) may cause slow performance depending on your device.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Base64 转图片转换器',
    description: '在线将 Base64 字符串解码为图片。粘贴 Base64 编码的图片，即时预览和下载。',
    inputLabel: 'Base64 输入', inputPlaceholder: '在此粘贴 Base64 编码的图片字符串...',
    preview: '图片预览', noPreview: '粘贴 Base64 字符串查看图片预览',
    decodeBtn: '解码并预览', clear: '清除', download: '下载图片', loadSample: '加载示例',
    imgInfo: '图片信息', format: '格式', size: '数据大小', dimensions: '尺寸', dataUri: 'Data URI', error: '错误',
    invalidBase64: '无效的 Base64 图片字符串。请确保包含有效的图片数据。',
    introTitle: '免费在线 Base64 转图片转换器',
    introText: '将 Base64 编码的图片字符串解码回可查看的图片。支持 PNG、JPEG、GIF、WebP、SVG 和 BMP 格式。',
    cheatTitle: 'Base64 图片格式', ruleCol: '格式', descCol: 'Data URI 前缀', exampleCol: '用途',
    rule1: 'PNG', rule1Desc: 'data:image/png;base64,...', rule1Ex: '无损、支持透明',
    rule2: 'JPEG', rule2Desc: 'data:image/jpeg;base64,...', rule2Ex: '照片、体积更小',
    rule3: 'GIF', rule3Desc: 'data:image/gif;base64,...', rule3Ex: '动画、简单图形',
    rule4: 'WebP', rule4Desc: 'data:image/webp;base64,...', rule4Ex: '现代格式、最佳压缩',
    rule5: 'SVG', rule5Desc: 'data:image/svg+xml;base64,...', rule5Ex: '矢量图形、可缩放',
    faqTitle: '常见问题',
    faq1q: '什么是 Base64 编码图片？', faq1a: 'Base64 编码图片是使用 Base64 编码方案将二进制图片数据转换为 ASCII 文本字符串。',
    faq2q: '需要包含 data URI 前缀吗？', faq2a: '不需要，转换器可以处理原始 Base64 字符串和完整 data URI。',
    faq3q: '支持哪些图片格式？', faq3a: '支持 PNG、JPEG、GIF、WebP、SVG 和 BMP 等所有常见图片格式。',
    faq4q: '有文件大小限制吗？', faq4a: '工具在浏览器中处理，没有服务器端限制。但超大字符串可能导致性能下降。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur Base64 vers Image',
    description: 'Decodez les chaines Base64 en images en ligne. Previsualiser et telecharger instantanement.',
    inputLabel: 'Entree Base64', inputPlaceholder: 'Collez votre chaine Base64 ici...',
    preview: 'Apercu de l\'image', noPreview: 'Collez une chaine Base64 pour voir l\'apercu',
    decodeBtn: 'Decoder et previsualiser', clear: 'Effacer', download: 'Telecharger', loadSample: 'Charger un exemple',
    imgInfo: 'Info image', format: 'Format', size: 'Taille', dimensions: 'Dimensions', dataUri: 'Data URI', error: 'Erreur',
    invalidBase64: 'Chaine Base64 invalide.',
    introTitle: 'Convertisseur Base64 vers Image gratuit', introText: 'Decodez les chaines Base64 en images. Supporte PNG, JPEG, GIF, WebP, SVG.',
    cheatTitle: 'Formats Base64', ruleCol: 'Format', descCol: 'Prefixe Data URI', exampleCol: 'Usage',
    rule1: 'PNG', rule1Desc: 'data:image/png;base64,...', rule1Ex: 'Sans perte, transparence',
    rule2: 'JPEG', rule2Desc: 'data:image/jpeg;base64,...', rule2Ex: 'Photos, taille reduite',
    rule3: 'GIF', rule3Desc: 'data:image/gif;base64,...', rule3Ex: 'Animations',
    rule4: 'WebP', rule4Desc: 'data:image/webp;base64,...', rule4Ex: 'Moderne, meilleure compression',
    rule5: 'SVG', rule5Desc: 'data:image/svg+xml;base64,...', rule5Ex: 'Graphiques vectoriels',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'une image encodee en Base64 ?', faq1a: 'Une image Base64 est une image binaire convertie en texte ASCII via l\'encodage Base64.',
    faq2q: 'Faut-il inclure le prefixe data URI ?', faq2a: 'Non, le convertisseur fonctionne avec les deux formats.',
    faq3q: 'Quels formats d\'image sont supportes ?', faq3a: 'PNG, JPEG, GIF, WebP, SVG et BMP sont supportes.',
    faq4q: 'Y a-t-il une limite de taille ?', faq4a: 'Pas de limite serveur. Les fichiers tres volumineux peuvent etre lents.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Base64 zu Bild Konverter',
    description: 'Base64-Strings online in Bilder dekodieren. Sofort anzeigen und herunterladen.',
    inputLabel: 'Base64-Eingabe', inputPlaceholder: 'Base64-kodierten String hier einfuegen...',
    preview: 'Bildvorschau', noPreview: 'Base64-String einfuegen fuer Vorschau',
    decodeBtn: 'Dekodieren & Vorschau', clear: 'Loeschen', download: 'Herunterladen', loadSample: 'Beispiel laden',
    imgInfo: 'Bildinformationen', format: 'Format', size: 'Groesse', dimensions: 'Abmessungen', dataUri: 'Data URI', error: 'Fehler',
    invalidBase64: 'Ungueltiger Base64-Bild-String.',
    introTitle: 'Kostenloser Base64 zu Bild Konverter', introText: 'Base64-kodierte Bilder in sichtbare Bilder dekodieren. Unterstuetzt PNG, JPEG, GIF, WebP, SVG.',
    cheatTitle: 'Base64-Bildformate', ruleCol: 'Format', descCol: 'Data URI Praefix', exampleCol: 'Verwendung',
    rule1: 'PNG', rule1Desc: 'data:image/png;base64,...', rule1Ex: 'Verlustfrei, Transparenz',
    rule2: 'JPEG', rule2Desc: 'data:image/jpeg;base64,...', rule2Ex: 'Fotos, kleinere Groesse',
    rule3: 'GIF', rule3Desc: 'data:image/gif;base64,...', rule3Ex: 'Animationen',
    rule4: 'WebP', rule4Desc: 'data:image/webp;base64,...', rule4Ex: 'Modern, beste Kompression',
    rule5: 'SVG', rule5Desc: 'data:image/svg+xml;base64,...', rule5Ex: 'Vektorgrafiken',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein Base64-kodiertes Bild?', faq1a: 'Ein Base64-kodiertes Bild ist binaere Bilddaten, die in ASCII-Text umgewandelt wurden.',
    faq2q: 'Muss ich das Data-URI-Praefix angeben?', faq2a: 'Nein, der Konverter funktioniert mit beiden Formaten.',
    faq3q: 'Welche Bildformate werden unterstuetzt?', faq3a: 'PNG, JPEG, GIF, WebP, SVG und BMP werden unterstuetzt.',
    faq4q: 'Gibt es eine Groessenbeschraenkung?', faq4a: 'Keine serverseitige Beschraenkung. Sehr grosse Dateien koennen langsam sein.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor Base64 a Imagen',
    description: 'Decodifique cadenas Base64 a imagenes en linea. Previsualize y descargue al instante.',
    inputLabel: 'Entrada Base64', inputPlaceholder: 'Pegue su cadena Base64 aqui...',
    preview: 'Vista previa', noPreview: 'Pegue una cadena Base64 para ver la vista previa',
    decodeBtn: 'Decodificar y previsualizar', clear: 'Limpiar', download: 'Descargar', loadSample: 'Cargar ejemplo',
    imgInfo: 'Info de imagen', format: 'Formato', size: 'Tamano', dimensions: 'Dimensiones', dataUri: 'Data URI', error: 'Error',
    invalidBase64: 'Cadena Base64 invalida.',
    introTitle: 'Convertidor Base64 a Imagen gratuito', introText: 'Decodifique cadenas Base64 a imagenes. Soporta PNG, JPEG, GIF, WebP, SVG.',
    cheatTitle: 'Formatos Base64', ruleCol: 'Formato', descCol: 'Prefijo Data URI', exampleCol: 'Uso',
    rule1: 'PNG', rule1Desc: 'data:image/png;base64,...', rule1Ex: 'Sin perdida, transparencia',
    rule2: 'JPEG', rule2Desc: 'data:image/jpeg;base64,...', rule2Ex: 'Fotos, menor tamano',
    rule3: 'GIF', rule3Desc: 'data:image/gif;base64,...', rule3Ex: 'Animaciones',
    rule4: 'WebP', rule4Desc: 'data:image/webp;base64,...', rule4Ex: 'Moderno, mejor compresion',
    rule5: 'SVG', rule5Desc: 'data:image/svg+xml;base64,...', rule5Ex: 'Graficos vectoriales',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es una imagen codificada en Base64?', faq1a: 'Es datos de imagen binarios convertidos a texto ASCII mediante codificacion Base64.',
    faq2q: 'Necesito incluir el prefijo data URI?', faq2a: 'No, el convertidor funciona con ambos formatos.',
    faq3q: 'Que formatos de imagen son soportados?', faq3a: 'PNG, JPEG, GIF, WebP, SVG y BMP son soportados.',
    faq4q: 'Hay limite de tamano?', faq4a: 'Sin limite del servidor. Archivos muy grandes pueden ser lentos.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'Base64 から画像コンバーター',
    description: 'Base64 文字列をオンラインで画像にデコード。プレビューしてダウンロード。',
    inputLabel: 'Base64 入力', inputPlaceholder: 'Base64 エンコードされた画像文字列を貼り付け...',
    preview: '画像プレビュー', noPreview: 'Base64 文字列を貼り付けてプレビュー',
    decodeBtn: 'デコード & プレビュー', clear: 'クリア', download: 'ダウンロード', loadSample: 'サンプル読込',
    imgInfo: '画像情報', format: 'フォーマット', size: 'サイズ', dimensions: '寸法', dataUri: 'Data URI', error: 'エラー',
    invalidBase64: '無効な Base64 画像文字列です。',
    introTitle: '無料 Base64 から画像コンバーター', introText: 'Base64 エンコードされた画像を表示可能な画像にデコード。PNG、JPEG、GIF、WebP、SVG をサポート。',
    cheatTitle: 'Base64 画像フォーマット', ruleCol: 'フォーマット', descCol: 'Data URI プレフィックス', exampleCol: '用途',
    rule1: 'PNG', rule1Desc: 'data:image/png;base64,...', rule1Ex: '可逆圧縮、透明度',
    rule2: 'JPEG', rule2Desc: 'data:image/jpeg;base64,...', rule2Ex: '写真、小さいサイズ',
    rule3: 'GIF', rule3Desc: 'data:image/gif;base64,...', rule3Ex: 'アニメーション',
    rule4: 'WebP', rule4Desc: 'data:image/webp;base64,...', rule4Ex: 'モダン、最高圧縮',
    rule5: 'SVG', rule5Desc: 'data:image/svg+xml;base64,...', rule5Ex: 'ベクターグラフィックス',
    faqTitle: 'よくある質問',
    faq1q: 'Base64 エンコードされた画像とは？', faq1a: 'Base64 エンコードされた画像は、バイナリ画像データを ASCII テキストに変換したものです。',
    faq2q: 'Data URI プレフィックスは必要ですか？', faq2a: 'いいえ、両方の形式で動作します。',
    faq3q: 'どの画像フォーマットがサポートされていますか？', faq3a: 'PNG、JPEG、GIF、WebP、SVG、BMP がサポートされています。',
    faq4q: 'ファイルサイズの制限はありますか？', faq4a: 'サーバー側の制限はありません。非常に大きなファイルは遅くなる場合があります。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Base64 to 이미지 변환기',
    description: 'Base64 문자열을 온라인에서 이미지로 디코딩. 미리보기 및 다운로드.',
    inputLabel: 'Base64 입력', inputPlaceholder: 'Base64 인코딩된 이미지 문자열을 붙여넣기...',
    preview: '이미지 미리보기', noPreview: 'Base64 문자열을 붙여넣어 미리보기',
    decodeBtn: '디코드 & 미리보기', clear: '지우기', download: '다운로드', loadSample: '샘플 로드',
    imgInfo: '이미지 정보', format: '형식', size: '크기', dimensions: '크기', dataUri: 'Data URI', error: '오류',
    invalidBase64: '유효하지 않은 Base64 이미지 문자열입니다.',
    introTitle: '무료 Base64 to 이미지 변환기', introText: 'Base64 인코딩된 이미지를 볼 수 있는 이미지로 디코딩. PNG, JPEG, GIF, WebP, SVG를 지원합니다.',
    cheatTitle: 'Base64 이미지 형식', ruleCol: '형식', descCol: 'Data URI 접두사', exampleCol: '용도',
    rule1: 'PNG', rule1Desc: 'data:image/png;base64,...', rule1Ex: '무손실, 투명도',
    rule2: 'JPEG', rule2Desc: 'data:image/jpeg;base64,...', rule2Ex: '사진, 작은 크기',
    rule3: 'GIF', rule3Desc: 'data:image/gif;base64,...', rule3Ex: '애니메이션',
    rule4: 'WebP', rule4Desc: 'data:image/webp;base64,...', rule4Ex: '현대적, 최고 압축',
    rule5: 'SVG', rule5Desc: 'data:image/svg+xml;base64,...', rule5Ex: '벡터 그래픽',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Base64 인코딩된 이미지란?', faq1a: 'Base64 인코딩된 이미지는 바이너리 이미지 데이터를 ASCII 텍스트로 변환한 것입니다.',
    faq2q: 'Data URI 접두사가 필요한가요?', faq2a: '아니요, 두 가지 형식 모두 작동합니다.',
    faq3q: '어떤 이미지 형식이 지원되나요?', faq3a: 'PNG, JPEG, GIF, WebP, SVG, BMP가 지원됩니다.',
    faq4q: '파일 크기 제한이 있나요?', faq4a: '서버 측 제한은 없습니다. 매우 큰 파일은 느려질 수 있습니다.',
    relatedTitle: '관련 도구',
  },
};

// tiny 1x1 red PNG for sample
const SAMPLE_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhElEQVRYR+2WMQ6AMAxDm4r7X5kKJhYGFqRUHZgS/7z8DFV9vOr4/CoAd8ABuIM7IMB/FXgGI8MaeBT4LOA0cWTVGHBaeyrgKHFk1b8KOKJqFjgyawz4Wns64MiqjwLOaI8FR1aNAae1Z4Gjss6BI7PGgM/aA+1B9b+PIBjYFBAM7ODzF3hOICF2c7WKAAAAAElFTkSuQmCC';

export default function Base64ToImage() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [error, setError] = useState('');
  const [imgFormat, setImgFormat] = useState('');
  const [imgDims, setImgDims] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  const decode = () => {
    if (!input.trim()) return;
    setError('');
    setImgDims('');
    let src = input.trim();

    // If it's a raw base64 without data URI, try to add prefix
    if (!src.startsWith('data:')) {
      // Try to detect format from magic bytes
      if (src.startsWith('iVBOR')) src = `data:image/png;base64,${src}`;
      else if (src.startsWith('/9j/')) src = `data:image/jpeg;base64,${src}`;
      else if (src.startsWith('R0lGOD')) src = `data:image/gif;base64,${src}`;
      else if (src.startsWith('UklGR')) src = `data:image/webp;base64,${src}`;
      else if (src.startsWith('PHN2Zy')) src = `data:image/svg+xml;base64,${src}`;
      else src = `data:image/png;base64,${src}`;
    }

    // Extract format
    const match = src.match(/data:image\/([^;]+);/);
    setImgFormat(match ? match[1].toUpperCase() : 'Unknown');
    setImgSrc(src);
  };

  const handleImgLoad = () => {
    if (imgRef.current) {
      setImgDims(`${imgRef.current.naturalWidth} x ${imgRef.current.naturalHeight}`);
    }
  };

  const handleImgError = () => {
    setError(t.invalidBase64);
    setImgSrc('');
    setImgDims('');
  };

  const handleDownload = () => {
    if (!imgSrc) return;
    const a = document.createElement('a');
    a.href = imgSrc;
    a.download = `image.${imgFormat.toLowerCase() || 'png'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const dataSize = input.trim().length > 0 ? `${(input.trim().length * 0.75 / 1024).toFixed(1)} KB` : '';

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
    <ToolLayout title={t.title} description={t.description} toolId="base64-to-image">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={decode} className="btn btn-primary">{t.decodeBtn}</button>
        <button onClick={() => { setInput(''); setImgSrc(''); setError(''); setImgDims(''); setImgFormat(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={() => { setInput(SAMPLE_B64); setImgSrc(''); setError(''); }} className="btn btn-secondary">{t.loadSample}</button>
        {imgSrc && <button onClick={handleDownload} className="btn btn-secondary">{t.download}</button>}
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {t.error}: {error}
        </div>
      )}

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 150 }} />
      </div>

      {/* Image info bar */}
      {imgSrc && !error && (
        <div style={{ display: 'flex', gap: 20, padding: '10px 16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, marginBottom: 16, fontSize: 13, flexWrap: 'wrap' }}>
          <div><span style={{ color: 'var(--text-secondary)' }}>{t.format}: </span><strong>{imgFormat}</strong></div>
          <div><span style={{ color: 'var(--text-secondary)' }}>{t.size}: </span><strong>{dataSize}</strong></div>
          {imgDims && <div><span style={{ color: 'var(--text-secondary)' }}>{t.dimensions}: </span><strong>{imgDims}</strong></div>}
          <div style={{ marginLeft: 'auto' }}><CopyButton text={imgSrc} /></div>
        </div>
      )}

      {/* Preview */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.preview}</label>
        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          borderRadius: 10,
          padding: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
          overflow: 'hidden',
        }}>
          {imgSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Decoded from Base64"
              onLoad={handleImgLoad}
              onError={handleImgError}
              style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }}
            />
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t.noPreview}</p>
          )}
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
            { href: `/${lang}/tools/image-to-base64`, label: 'Image to Base64' },
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/base64-image-converter`, label: 'Base64 Image Converter' },
            { href: `/${lang}/tools/image-compressor`, label: 'Image Compressor' },
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
