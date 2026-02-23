'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'SVG to PNG Converter',
    description: 'Convert SVG code to PNG images online. Preview SVG in browser and download as PNG with custom dimensions.',
    inputLabel: 'SVG Code',
    inputPlaceholder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" fill="#3b82f6"/>\n  <text x="50" y="55" text-anchor="middle" fill="white" font-size="20">SVG</text>\n</svg>',
    previewLabel: 'SVG Preview',
    convertBtn: 'Convert to PNG',
    downloadBtn: 'Download PNG',
    clear: 'Clear',
    loadSample: 'Load Sample',
    width: 'Width (px)',
    height: 'Height (px)',
    quality: 'Scale Factor',
    outputLabel: 'PNG Output',
    copyAsSvg: 'Copy SVG',
    converting: 'Converting...',
    introTitle: 'Free SVG to PNG Converter',
    introText: 'This tool converts SVG (Scalable Vector Graphics) code to PNG (Portable Network Graphics) images directly in your browser using the HTML5 Canvas API. Paste your SVG code, preview it, set desired dimensions, and download the PNG. No file upload required — everything processes locally.',
    tipTitle: 'SVG to PNG Tips',
    tip1: 'SVG is vector-based and scales losslessly; PNG is raster with fixed resolution',
    tip2: 'Use a higher scale factor for better quality PNG output (2x or 3x for retina)',
    tip3: 'SVG must include xmlns="http://www.w3.org/2000/svg" attribute for proper rendering',
    tip4: 'Transparent backgrounds in SVG are preserved in the PNG output',
    tip5: 'For best results, ensure SVG has explicit width/height or viewBox attributes',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does SVG to PNG conversion work?',
    faq1a: 'The conversion works by creating an SVG Blob URL, loading it into an HTML Image element, drawing it onto an HTML5 Canvas with your specified dimensions, and then exporting the canvas as a PNG data URL. All processing happens client-side in your browser without any server.',
    faq2q: 'When should I use SVG vs PNG?',
    faq2a: 'Use SVG for logos, icons, and illustrations that need to scale at any size without quality loss. Use PNG when you need a raster image for platforms that do not support SVG (some email clients, older systems) or when you need a single fixed-size image.',
    faq3q: 'Why does my SVG not render correctly?',
    faq3a: 'Common issues include: missing xmlns attribute, external fonts or images not loading (cross-origin restrictions), unsupported SVG features, or invalid SVG syntax. Ensure your SVG is self-contained with inline styles and no external dependencies.',
    faq4q: 'What is the maximum size I can export?',
    faq4a: 'The maximum canvas size is limited by your browser and device memory. Modern browsers typically support canvases up to 4096x4096 or larger. For very large exports, the canvas may fail silently or produce a blank output.',
    faq5q: 'Does this tool support animated SVGs?',
    faq5a: 'The PNG export captures a single frame (typically the initial state) of animated SVGs, since PNG is a static format. For animated output, consider exporting as GIF or using a video format.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'SVG 转 PNG 转换器',
    description: '在线将 SVG 代码转换为 PNG 图片。在浏览器中预览 SVG 并以自定义尺寸下载为 PNG。',
    inputLabel: 'SVG 代码', inputPlaceholder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" fill="#3b82f6"/>\n</svg>',
    previewLabel: 'SVG 预览', convertBtn: '转换为 PNG', downloadBtn: '下载 PNG', clear: '清除', loadSample: '加载示例',
    width: '宽度 (px)', height: '高度 (px)', quality: '缩放因子', outputLabel: 'PNG 输出', copyAsSvg: '复制 SVG', converting: '转换中...',
    introTitle: '免费 SVG 转 PNG 转换器',
    introText: '此工具使用 HTML5 Canvas API 在浏览器中将 SVG 代码转换为 PNG 图片。粘贴 SVG 代码，预览后设置尺寸并下载 PNG，无需文件上传，全程本地处理。',
    tipTitle: 'SVG 转 PNG 提示', tip1: 'SVG 是矢量图，可无损缩放；PNG 是固定分辨率的光栅图',
    tip2: '使用更高缩放因子获得更好的 PNG 输出质量（视网膜屏幕建议2x或3x）',
    tip3: 'SVG 必须包含 xmlns="http://www.w3.org/2000/svg" 属性才能正确渲染',
    tip4: 'SVG 中的透明背景在 PNG 输出中得以保留', tip5: '为获得最佳效果，确保 SVG 具有明确的 width/height 或 viewBox 属性',
    faqTitle: '常见问题',
    faq1q: 'SVG 转 PNG 如何工作？', faq1a: '通过创建 SVG Blob URL，将其加载到 HTML Image 元素中，在 Canvas 上绘制并导出为 PNG 数据 URL。所有处理在浏览器客户端进行。',
    faq2q: '何时使用 SVG 和 PNG？', faq2a: 'SVG 适用于需要任意尺寸无损缩放的徽标、图标和插图。PNG 适用于不支持 SVG 的平台或需要固定尺寸图像时。',
    faq3q: '为什么我的 SVG 渲染不正确？', faq3a: '常见问题包括：缺少 xmlns 属性、外部字体或图像无法加载、不支持的 SVG 功能或无效的 SVG 语法。',
    faq4q: '最大可导出多大尺寸？', faq4a: '最大 Canvas 尺寸受浏览器和设备内存限制，现代浏览器通常支持最多 4096x4096 或更大。',
    faq5q: '此工具支持动态 SVG 吗？', faq5a: 'PNG 导出捕获动态 SVG 的单帧（通常是初始状态），因为 PNG 是静态格式。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'SVGからPNGへのコンバーター',
    description: 'SVGコードをオンラインでPNG画像に変換。ブラウザでプレビューしてカスタムサイズでダウンロード。',
    inputLabel: 'SVGコード', inputPlaceholder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" fill="#3b82f6"/>\n</svg>',
    previewLabel: 'SVGプレビュー', convertBtn: 'PNGに変換', downloadBtn: 'PNG ダウンロード', clear: 'クリア', loadSample: 'サンプル',
    width: '幅 (px)', height: '高さ (px)', quality: '倍率', outputLabel: 'PNG出力', copyAsSvg: 'SVGをコピー', converting: '変換中...',
    introTitle: '無料SVGからPNGへのコンバーター', introText: 'HTML5 Canvas APIを使用してブラウザ内でSVGコードをPNG画像に変換します。',
    tipTitle: 'ヒント', tip1: 'SVGはベクターで無損失スケール、PNGは固定解像度のラスター',
    tip2: 'より良いPNG品質のために高い倍率を使用（レティナには2xか3x）',
    tip3: 'SVGにはxmlns属性が必要', tip4: 'SVGの透明背景はPNGで保持されます', tip5: 'SVGにはwidth/heightかviewBoxを指定すると良い',
    faqTitle: 'よくある質問',
    faq1q: 'SVGからPNGへの変換はどう機能しますか？', faq1a: 'SVG Blob URLを作成し、HTML Image要素に読み込み、Canvasに描画してPNGとしてエクスポートします。',
    faq2q: 'SVGとPNGはいつ使い分けますか？', faq2a: 'SVGはロゴやアイコンなど任意サイズで品質を失わない必要がある場合。PNGはSVGをサポートしないプラットフォームや固定サイズが必要な場合。',
    faq3q: 'SVGが正しく表示されない理由は？', faq3a: 'xmlns属性がない、外部フォントや画像が読み込めない、サポートされていない機能、または無効なSVG構文が原因として考えられます。',
    faq4q: '最大エクスポートサイズは？', faq4a: '最大Canvasサイズはブラウザとデバイスメモリに依存。通常4096x4096以上をサポート。',
    faq5q: 'アニメーションSVGはサポートされますか？', faq5a: 'PNGエクスポートはアニメーションSVGの単一フレームをキャプチャします（PNGは静的形式のため）。',
    relatedTitle: '関連ツール',
  },
};

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="20" fill="url(#grad)"/>
  <circle cx="100" cy="80" r="35" fill="white" opacity="0.9"/>
  <rect x="60" y="125" width="80" height="10" rx="5" fill="white" opacity="0.8"/>
  <rect x="70" y="145" width="60" height="10" rx="5" fill="white" opacity="0.6"/>
  <text x="100" y="87" text-anchor="middle" fill="#3b82f6" font-size="22" font-weight="bold" font-family="Arial">D</text>
</svg>`;

export default function SvgToPngConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [svgCode, setSvgCode] = useState('');
  const [pngDataUrl, setPngDataUrl] = useState('');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [scale, setScale] = useState(2);
  const [converting, setConverting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const previewSvgUrl = svgCode
    ? URL.createObjectURL(new Blob([svgCode], { type: 'image/svg+xml' }))
    : '';

  const handleConvert = useCallback(async () => {
    if (!svgCode.trim()) return;
    setConverting(true);
    setPngDataUrl('');

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = width * scale;
      canvas.height = height * scale;

      const svgBlob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load SVG')); };
        img.src = url;
      });

      setPngDataUrl(canvas.toDataURL('image/png'));
    } catch {
      // silently fail - SVG may be invalid
    } finally {
      setConverting(false);
    }
  }, [svgCode, width, height, scale]);

  const handleDownload = () => {
    if (!pngDataUrl) return;
    const a = document.createElement('a');
    a.href = pngDataUrl;
    a.download = 'converted.png';
    a.click();
  };

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

  return (
    <ToolLayout title={t.title} description={t.description} toolId="svg-to-png-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {[
          { label: t.width, val: width, set: setWidth },
          { label: t.height, val: height, set: setHeight },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{label}</label>
            <input type="number" min={1} max={4096} value={val} onChange={e => set(Number(e.target.value))}
              style={{ width: 100, padding: '8px 10px', fontSize: 13, textAlign: 'center', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
          </div>
        ))}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.quality}</label>
          <select value={scale} onChange={e => setScale(Number(e.target.value))}
            style={{ padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
            {[1, 1.5, 2, 3, 4].map(s => <option key={s} value={s}>{s}x</option>)}
          </select>
        </div>
        <button onClick={handleConvert} className="btn btn-primary" disabled={converting || !svgCode.trim()}>
          {converting ? t.converting : t.convertBtn}
        </button>
        <button onClick={() => { setSvgCode(SAMPLE_SVG); setPngDataUrl(''); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setSvgCode(''); setPngDataUrl(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {/* SVG Input */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
            {svgCode && <CopyButton text={svgCode} label={t.copyAsSvg} />}
          </div>
          <textarea value={svgCode} onChange={e => { setSvgCode(e.target.value); setPngDataUrl(''); }}
            placeholder={t.inputPlaceholder}
            style={{ minHeight: 280, fontFamily: 'monospace', fontSize: 11, resize: 'vertical' }} />
        </div>

        {/* Preview */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.previewLabel}</label>
          <div style={{ minHeight: 280, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {svgCode ? (
              <div dangerouslySetInnerHTML={{ __html: svgCode }}
                style={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            ) : (
              <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>SVG preview will appear here</span>
            )}
          </div>
        </div>
      </div>

      {/* PNG Output */}
      {pngDataUrl && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel} ({width * scale} x {height * scale}px)</label>
            <button onClick={handleDownload} className="btn btn-primary" style={{ fontSize: 12, padding: '6px 14px' }}>{t.downloadBtn}</button>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'repeating-conic-gradient(#80808020 0% 25%, transparent 0% 50%) 0 0 / 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <img src={pngDataUrl} alt="PNG output" style={{ maxWidth: '100%', maxHeight: 300 }} />
          </div>
        </div>
      )}

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
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/color-converter`, label: 'Color Converter' },
            { href: `/${lang}/tools/color-palette-generator`, label: 'Color Palette Generator' },
            { href: `/${lang}/tools/css-gradient-generator`, label: 'CSS Gradient Generator' },
            { href: `/${lang}/tools/image-base64`, label: 'Image to Base64' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
