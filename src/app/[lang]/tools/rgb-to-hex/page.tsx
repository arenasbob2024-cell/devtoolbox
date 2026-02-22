'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'RGB to HEX Converter',
    description: 'Convert RGB color values to HEX codes with interactive sliders and live color preview. Also shows HSL values.',
    red: 'Red (R)',
    green: 'Green (G)',
    blue: 'Blue (B)',
    hexOutput: 'HEX Code',
    rgbOutput: 'RGB Value',
    hslOutput: 'HSL Value',
    cssOutput: 'CSS Color',
    preview: 'Color Preview',
    rgbInput: 'Or enter RGB values',
    rgbPlaceholder: 'e.g., rgb(59, 130, 246) or 59, 130, 246',
    parseBtn: 'Parse RGB',
    randomBtn: 'Random Color',
    introTitle: 'Free Online RGB to HEX Converter',
    introText: 'This RGB to HEX converter lets you convert RGB color values to hexadecimal color codes using interactive sliders with live preview. RGB (Red, Green, Blue) is the color model used by screens, where each channel ranges from 0 to 255. HEX codes represent the same values in hexadecimal format, commonly used in CSS and HTML. The tool also calculates HSL values for complete color format coverage.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do I convert RGB to HEX?',
    faq1a: 'To convert RGB to HEX, take each RGB channel value (0-255) and convert it to a two-digit hexadecimal number. For example, RGB(59, 130, 246) becomes #3B82F6 where 59 = 3B, 130 = 82, and 246 = F6. This tool does the conversion automatically as you adjust the sliders or enter values.',
    faq2q: 'What is the RGB color model?',
    faq2a: 'RGB stands for Red, Green, Blue. It is an additive color model where colors are created by combining different intensities of red, green, and blue light. Each channel ranges from 0 (none) to 255 (maximum intensity). When all channels are 0, the result is black; when all are 255, the result is white. RGB is the standard color model for digital displays.',
    faq3q: 'Why use HEX codes instead of RGB?',
    faq3a: 'HEX codes are more compact than RGB notation (e.g., #3B82F6 vs rgb(59, 130, 246)) and are the most common color format in CSS. They are also easier to share and copy-paste. However, RGB values are more intuitive for programmatic color manipulation since you can easily modify individual channels.',
    faq4q: 'What is the formula for RGB to HEX conversion?',
    faq4a: 'The formula is straightforward: convert each decimal RGB value (0-255) to its hexadecimal equivalent (00-FF), then concatenate them with a # prefix. In JavaScript: "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0"). The padStart ensures single-digit hex values like 0 become 00.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'RGB 转 HEX 转换器',
    description: '使用交互式滑块和实时颜色预览将 RGB 颜色值转换为 HEX 代码。同时显示 HSL 值。',
    red: '红色 (R)',
    green: '绿色 (G)',
    blue: '蓝色 (B)',
    hexOutput: 'HEX 代码',
    rgbOutput: 'RGB 值',
    hslOutput: 'HSL 值',
    cssOutput: 'CSS 颜色',
    preview: '颜色预览',
    rgbInput: '或输入 RGB 值',
    rgbPlaceholder: '如 rgb(59, 130, 246) 或 59, 130, 246',
    parseBtn: '解析 RGB',
    randomBtn: '随机颜色',
    introTitle: '免费在线 RGB 转 HEX 工具',
    introText: '这个 RGB 转 HEX 工具可以使用交互式滑块将 RGB 颜色值转换为十六进制颜色代码。RGB 是屏幕使用的颜色模型，每个通道范围 0-255。HEX 用十六进制格式表示相同的值。',
    faqTitle: '常见问题',
    faq1q: '如何将 RGB 转换为 HEX？',
    faq1a: '将每个 RGB 通道值 (0-255) 转换为两位十六进制数。例如 RGB(59, 130, 246) 变为 #3B82F6。此工具自动完成转换。',
    faq2q: '什么是 RGB 颜色模型？',
    faq2a: 'RGB 代表红、绿、蓝。每个通道范围 0-255。所有通道为 0 时是黑色，所有通道为 255 时是白色。',
    faq3q: '为什么使用 HEX 代码而不是 RGB？',
    faq3a: 'HEX 代码比 RGB 更紧凑，是 CSS 中最常见的颜色格式，更容易分享和复制粘贴。',
    faq4q: 'RGB 转 HEX 的公式是什么？',
    faq4a: '将每个十进制 RGB 值转换为十六进制等价物，然后用 # 前缀连接。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur RGB vers HEX',
    description: 'Convertissez les valeurs RGB en codes HEX avec des curseurs interactifs et un apercu de couleur en temps reel.',
    red: 'Rouge (R)', green: 'Vert (G)', blue: 'Bleu (B)',
    hexOutput: 'Code HEX', rgbOutput: 'Valeur RGB', hslOutput: 'Valeur HSL', cssOutput: 'Couleur CSS',
    preview: 'Apercu de couleur',
    rgbInput: 'Ou entrez des valeurs RGB', rgbPlaceholder: 'ex: rgb(59, 130, 246)', parseBtn: 'Analyser RGB', randomBtn: 'Couleur aleatoire',
    introTitle: 'Convertisseur RGB vers HEX gratuit', introText: 'Ce convertisseur permet de convertir les valeurs RGB en codes hexadecimaux avec des curseurs interactifs et un apercu en temps reel.',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment convertir RGB en HEX ?', faq1a: 'Convertissez chaque valeur RGB (0-255) en un nombre hexadecimal a deux chiffres et concatenez-les avec #.',
    faq2q: 'Qu\'est-ce que le modele RGB ?', faq2a: 'RGB signifie Rouge, Vert, Bleu. Chaque canal va de 0 a 255 pour creer des couleurs.',
    faq3q: 'Pourquoi utiliser HEX plutot que RGB ?', faq3a: 'Les codes HEX sont plus compacts et sont le format le plus courant en CSS.',
    faq4q: 'Quelle est la formule RGB vers HEX ?', faq4a: 'Convertir chaque valeur decimale en hexadecimal et les concatener avec le prefixe #.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'RGB zu HEX Konverter',
    description: 'RGB-Farbwerte in HEX-Codes umwandeln mit interaktiven Schiebereglern und Live-Farbvorschau.',
    red: 'Rot (R)', green: 'Gruen (G)', blue: 'Blau (B)',
    hexOutput: 'HEX-Code', rgbOutput: 'RGB-Wert', hslOutput: 'HSL-Wert', cssOutput: 'CSS-Farbe',
    preview: 'Farbvorschau',
    rgbInput: 'Oder RGB-Werte eingeben', rgbPlaceholder: 'z.B. rgb(59, 130, 246)', parseBtn: 'RGB analysieren', randomBtn: 'Zufaellige Farbe',
    introTitle: 'Kostenloser RGB zu HEX Konverter', introText: 'Dieser Konverter wandelt RGB-Farbwerte mit interaktiven Schiebereglern und Live-Vorschau in Hexadezimalcodes um.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie konvertiert man RGB zu HEX?', faq1a: 'Jeden RGB-Kanalwert (0-255) in eine zweistellige Hexadezimalzahl umwandeln und mit # zusammenfuegen.',
    faq2q: 'Was ist das RGB-Farbmodell?', faq2a: 'RGB steht fuer Rot, Gruen, Blau. Jeder Kanal geht von 0 bis 255.',
    faq3q: 'Warum HEX statt RGB?', faq3a: 'HEX-Codes sind kompakter und das gaengigste Farbformat in CSS.',
    faq4q: 'Was ist die Formel fuer RGB zu HEX?', faq4a: 'Jeden Dezimalwert in Hexadezimal konvertieren und mit # verketten.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor RGB a HEX',
    description: 'Convierte valores de color RGB a codigos HEX con controles deslizantes interactivos y vista previa en vivo.',
    red: 'Rojo (R)', green: 'Verde (G)', blue: 'Azul (B)',
    hexOutput: 'Codigo HEX', rgbOutput: 'Valor RGB', hslOutput: 'Valor HSL', cssOutput: 'Color CSS',
    preview: 'Vista previa',
    rgbInput: 'O ingresa valores RGB', rgbPlaceholder: 'ej: rgb(59, 130, 246)', parseBtn: 'Analizar RGB', randomBtn: 'Color aleatorio',
    introTitle: 'Convertidor RGB a HEX gratuito', introText: 'Este convertidor permite convertir valores RGB a codigos hexadecimales con controles deslizantes interactivos y vista previa en tiempo real.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como convertir RGB a HEX?', faq1a: 'Convierte cada valor RGB (0-255) a un numero hexadecimal de dos digitos y concatena con #.',
    faq2q: 'Que es el modelo de color RGB?', faq2a: 'RGB significa Rojo, Verde, Azul. Cada canal va de 0 a 255.',
    faq3q: 'Por que usar HEX en lugar de RGB?', faq3a: 'Los codigos HEX son mas compactos y el formato mas comun en CSS.',
    faq4q: 'Cual es la formula de RGB a HEX?', faq4a: 'Convertir cada valor decimal a hexadecimal y concatenar con el prefijo #.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'RGB から HEX 変換ツール',
    description: 'インタラクティブスライダーとリアルタイムプレビューで RGB カラー値を HEX コードに変換。',
    red: '赤 (R)', green: '緑 (G)', blue: '青 (B)',
    hexOutput: 'HEX コード', rgbOutput: 'RGB 値', hslOutput: 'HSL 値', cssOutput: 'CSS カラー',
    preview: 'カラープレビュー',
    rgbInput: 'または RGB 値を入力', rgbPlaceholder: '例: rgb(59, 130, 246)', parseBtn: 'RGB 解析', randomBtn: 'ランダム色',
    introTitle: '無料オンライン RGB から HEX 変換', introText: 'インタラクティブスライダーとリアルタイムプレビューで RGB カラー値を16進数コードに変換するツール。',
    faqTitle: 'よくある質問',
    faq1q: 'RGB を HEX に変換するには？', faq1a: '各 RGB チャンネル値 (0-255) を2桁の16進数に変換し、# で連結します。',
    faq2q: 'RGB カラーモデルとは？', faq2a: 'RGB は赤、緑、青。各チャンネルは 0 から 255 の範囲です。',
    faq3q: 'なぜ RGB でなく HEX？', faq3a: 'HEX コードはよりコンパクトで CSS で最も一般的なカラー形式です。',
    faq4q: 'RGB から HEX の公式は？', faq4a: '各10進数値を16進数に変換し、# プレフィックスで連結します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'RGB에서 HEX 변환기',
    description: '대화형 슬라이더와 실시간 색상 미리보기로 RGB 색상 값을 HEX 코드로 변환.',
    red: '빨강 (R)', green: '초록 (G)', blue: '파랑 (B)',
    hexOutput: 'HEX 코드', rgbOutput: 'RGB 값', hslOutput: 'HSL 값', cssOutput: 'CSS 색상',
    preview: '색상 미리보기',
    rgbInput: '또는 RGB 값 입력', rgbPlaceholder: '예: rgb(59, 130, 246)', parseBtn: 'RGB 분석', randomBtn: '랜덤 색상',
    introTitle: '무료 온라인 RGB에서 HEX 변환', introText: '대화형 슬라이더와 실시간 미리보기로 RGB 색상 값을 16진수 코드로 변환하는 도구입니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'RGB를 HEX로 변환하는 방법은?', faq1a: '각 RGB 채널 값(0-255)을 2자리 16진수로 변환하고 #으로 연결합니다.',
    faq2q: 'RGB 색상 모델이란?', faq2a: 'RGB는 빨강, 초록, 파랑. 각 채널은 0에서 255 범위입니다.',
    faq3q: '왜 RGB 대신 HEX를 사용하나요?', faq3a: 'HEX 코드는 더 간결하고 CSS에서 가장 일반적인 색상 형식입니다.',
    faq4q: 'RGB에서 HEX 공식은?', faq4a: '각 10진수 값을 16진수로 변환하고 # 접두사로 연결합니다.',
    relatedTitle: '관련 도구',
  },
};

export default function RgbToHexConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);
  const [rgbInput, setRgbInput] = useState('');

  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  const rgbStr = `rgb(${r}, ${g}, ${b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const parseRgbInput = useCallback(() => {
    const match = rgbInput.match(/(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/);
    if (match) {
      setR(Math.min(255, parseInt(match[1])));
      setG(Math.min(255, parseInt(match[2])));
      setB(Math.min(255, parseInt(match[3])));
    }
  }, [rgbInput]);

  const randomColor = () => {
    setR(Math.floor(Math.random() * 256));
    setG(Math.floor(Math.random() * 256));
    setB(Math.floor(Math.random() * 256));
  };

  const sliderStyle = (color: string, value: number): React.CSSProperties => ({
    width: '100%', height: 8, appearance: 'none' as const, borderRadius: 4, outline: 'none', cursor: 'pointer',
    background: `linear-gradient(to right, ${color === 'r' ? `rgb(0,${g},${b})` : color === 'g' ? `rgb(${r},0,${b})` : `rgb(${r},${g},0)`}, ${color === 'r' ? `rgb(255,${g},${b})` : color === 'g' ? `rgb(${r},255,${b})` : `rgb(${r},${g},255)`})`,
    accentColor: color === 'r' ? '#ef4444' : color === 'g' ? '#22c55e' : '#3b82f6',
  });

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
    <ToolLayout title={t.title} description={t.description} toolId="rgb-to-hex">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Left: RGB Sliders */}
        <div>
          {/* Red slider */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}>{t.red}</label>
              <input type="number" value={r} onChange={e => setR(Math.min(255, Math.max(0, Number(e.target.value))))} min={0} max={255}
                style={{ width: 64, padding: '4px 8px', fontSize: 14, fontFamily: 'monospace', textAlign: 'center', fontWeight: 700 }} />
            </div>
            <input type="range" min={0} max={255} value={r} onChange={e => setR(Number(e.target.value))} style={sliderStyle('r', r)} />
          </div>

          {/* Green slider */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#22c55e' }}>{t.green}</label>
              <input type="number" value={g} onChange={e => setG(Math.min(255, Math.max(0, Number(e.target.value))))} min={0} max={255}
                style={{ width: 64, padding: '4px 8px', fontSize: 14, fontFamily: 'monospace', textAlign: 'center', fontWeight: 700 }} />
            </div>
            <input type="range" min={0} max={255} value={g} onChange={e => setG(Number(e.target.value))} style={sliderStyle('g', g)} />
          </div>

          {/* Blue slider */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#3b82f6' }}>{t.blue}</label>
              <input type="number" value={b} onChange={e => setB(Math.min(255, Math.max(0, Number(e.target.value))))} min={0} max={255}
                style={{ width: 64, padding: '4px 8px', fontSize: 14, fontFamily: 'monospace', textAlign: 'center', fontWeight: 700 }} />
            </div>
            <input type="range" min={0} max={255} value={b} onChange={e => setB(Number(e.target.value))} style={sliderStyle('b', b)} />
          </div>

          {/* RGB text input */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.rgbInput}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" value={rgbInput} onChange={e => setRgbInput(e.target.value)} placeholder={t.rgbPlaceholder}
                style={{ flex: 1, padding: '8px 12px', fontSize: 13, fontFamily: 'monospace' }}
                onKeyDown={e => e.key === 'Enter' && parseRgbInput()} />
              <button onClick={parseRgbInput} className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>{t.parseBtn}</button>
            </div>
          </div>
          <button onClick={randomColor} className="btn btn-secondary">{t.randomBtn}</button>
        </div>

        {/* Right: Color preview + outputs */}
        <div>
          {/* Color preview */}
          <div style={{ width: '100%', height: 140, borderRadius: 12, border: '1px solid var(--border-color)', background: hex, marginBottom: 16, boxShadow: `0 4px 20px ${hex}40` }} />
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 16 }}>{t.preview}</p>

          {/* Color values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: t.hexOutput, value: hex },
              { label: t.rgbOutput, value: rgbStr },
              { label: t.hslOutput, value: hslStr },
              { label: t.cssOutput, value: `background-color: ${hex};` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>{label}</div>
                  <code style={{ fontSize: 14, fontWeight: 600, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{value}</code>
                </div>
                <CopyButton text={value} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Direction indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, margin: '20px 0', padding: '12px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <span style={{ padding: '6px 16px', borderRadius: 6, background: 'rgba(59,130,246,0.1)', color: '#3b82f6', fontWeight: 700, fontSize: 14 }}>RGB</span>
        <span style={{ fontSize: 20, color: 'var(--text-secondary)' }}>&rarr;</span>
        <span style={{ padding: '6px 16px', borderRadius: 6, background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', fontWeight: 700, fontSize: 14 }}>HEX</span>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

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
            { href: `/${lang}/tools/hex-to-rgb`, label: 'HEX to RGB' },
            { href: `/${lang}/tools/color-converter`, label: 'Color Converter' },
            { href: `/${lang}/tools/hex-color-picker`, label: 'HEX Color Picker' },
            { href: `/${lang}/tools/color-palette`, label: 'Color Palette Generator' },
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
