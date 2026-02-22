'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, and CMYK formats with live preview. Auto-detect input format and convert to all formats instantly.',
    hexLabel: 'HEX',
    rgbLabel: 'RGB',
    hslLabel: 'HSL',
    cmykLabel: 'CMYK',
    convertBtn: 'Convert',
    randomBtn: 'Random Color',
    colorPicker: 'Color Picker',
    emptyState: 'Enter a color value and click Convert to see all formats',
    introTitle: 'Free Online Color Converter',
    introText: 'Convert colors between HEX, RGB, HSL, and CMYK formats instantly. This tool auto-detects the input format and converts to all other formats with a live color preview. Perfect for web designers, CSS developers, and graphic artists who need to switch between color notation systems.',
    howTitle: 'How to Convert Colors',
    step1: 'Enter a color value in any format (HEX, RGB, HSL, or use the color picker)',
    step2: 'Click Convert or use the color picker for instant conversion',
    step3: 'All color formats update automatically with live preview',
    step4: 'Click the copy button next to any format to copy the value',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What color formats are supported?',
    faq1a: 'This tool supports HEX (#FF5733), RGB (rgb(255, 87, 51)), HSL (hsl(11, 100%, 60%)), and CMYK (0%, 66%, 80%, 0%). It auto-detects the input format and converts to all others simultaneously.',
    faq2q: 'What is the difference between RGB and CMYK?',
    faq2a: 'RGB (Red, Green, Blue) is an additive color model used for screens and digital displays. CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive model used for printing. RGB creates colors by adding light, while CMYK creates colors by absorbing light with ink.',
    faq3q: 'When should I use HEX vs RGB in CSS?',
    faq3a: 'HEX (#FF5733) is more compact and commonly used in CSS. RGB (rgb(255,87,51)) is easier to read and adjust programmatically. HSL (hsl(11,100%,60%)) is most intuitive for adjusting hue, saturation, and lightness. All three are valid in CSS.',
    faq4q: 'How accurate is the CMYK conversion?',
    faq4a: 'The CMYK conversion provides a mathematical approximation. Actual printed colors may vary depending on the printer, paper, and ICC color profile. For print-critical work, consult your printer\'s color management system.',
    faq5q: 'Can I use the color picker?',
    faq5a: 'Yes. Click the color picker to visually select any color. All format values (HEX, RGB, HSL, CMYK) will update automatically in real-time.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '颜色转换器',
    description: '在 HEX、RGB、HSL 和 CMYK 格式之间转换颜色，支持实时预览。自动检测输入格式并即时转换。',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    convertBtn: '转换', randomBtn: '随机颜色', colorPicker: '拾色器',
    emptyState: '输入颜色值并点击转换以查看所有格式',
    introTitle: '免费在线颜色转换器',
    introText: '在 HEX、RGB、HSL 和 CMYK 格式之间即时转换颜色。自动检测输入格式并转换为所有其他格式，带有实时颜色预览。',
    howTitle: '如何转换颜色',
    step1: '输入任何格式的颜色值（HEX、RGB、HSL 或使用拾色器）',
    step2: '点击转换或使用拾色器即时转换',
    step3: '所有颜色格式自动更新并实时预览',
    step4: '点击任何格式旁的复制按钮复制值',
    faqTitle: '常见问题',
    faq1q: '支持哪些颜色格式？', faq1a: '支持 HEX、RGB、HSL 和 CMYK 格式。自动检测输入格式并同时转换为所有其他格式。',
    faq2q: 'RGB 和 CMYK 有什么区别？', faq2a: 'RGB 是加色模型，用于屏幕显示。CMYK 是减色模型，用于印刷。',
    faq3q: 'CSS 中应该使用 HEX 还是 RGB？', faq3a: 'HEX 更紧凑，RGB 更易于编程调整，HSL 最直观。三者在 CSS 中都有效。',
    faq4q: 'CMYK 转换准确吗？', faq4a: 'CMYK 转换提供数学近似值。实际印刷颜色可能因打印机和纸张而异。',
    faq5q: '可以使用拾色器吗？', faq5a: '可以。点击拾色器视觉选择颜色，所有格式值会自动实时更新。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur de Couleurs',
    description: 'Convertissez les couleurs entre HEX, RGB, HSL et CMYK avec apercu en direct.',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMJN',
    convertBtn: 'Convertir', randomBtn: 'Couleur aleatoire', colorPicker: 'Pipette',
    emptyState: 'Entrez une valeur de couleur et cliquez sur Convertir',
    introTitle: 'Convertisseur de couleurs gratuit', introText: 'Convertissez les couleurs entre HEX, RGB, HSL et CMYK instantanement.',
    howTitle: 'Comment convertir les couleurs',
    step1: 'Entrez une valeur de couleur', step2: 'Cliquez sur Convertir', step3: 'Tous les formats se mettent a jour', step4: 'Copiez la valeur souhaitee',
    faqTitle: 'Questions frequentes',
    faq1q: 'Quels formats sont supportes ?', faq1a: 'HEX, RGB, HSL et CMYK avec detection automatique.',
    faq2q: 'Difference entre RGB et CMYK ?', faq2a: 'RGB est additif (ecrans), CMYK est soustractif (impression).',
    faq3q: 'HEX ou RGB en CSS ?', faq3a: 'HEX est compact, RGB est flexible, HSL est intuitif. Tous sont valides en CSS.',
    faq4q: 'La conversion CMYK est-elle precise ?', faq4a: 'C\'est une approximation mathematique. Les couleurs imprimees peuvent varier.',
    faq5q: 'Puis-je utiliser la pipette ?', faq5a: 'Oui, cliquez sur la pipette pour selectionner visuellement une couleur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Farbkonverter',
    description: 'Konvertieren Sie Farben zwischen HEX, RGB, HSL und CMYK mit Live-Vorschau.',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    convertBtn: 'Konvertieren', randomBtn: 'Zufaellige Farbe', colorPicker: 'Farbwaehler',
    emptyState: 'Geben Sie einen Farbwert ein und klicken Sie auf Konvertieren',
    introTitle: 'Kostenloser Online Farbkonverter', introText: 'Konvertieren Sie Farben zwischen HEX, RGB, HSL und CMYK sofort.',
    howTitle: 'Wie man Farben konvertiert',
    step1: 'Geben Sie einen Farbwert ein', step2: 'Klicken Sie auf Konvertieren', step3: 'Alle Formate aktualisieren sich', step4: 'Kopieren Sie den gewuenschten Wert',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Welche Formate werden unterstuetzt?', faq1a: 'HEX, RGB, HSL und CMYK mit automatischer Erkennung.',
    faq2q: 'Unterschied zwischen RGB und CMYK?', faq2a: 'RGB ist additiv (Bildschirme), CMYK ist subtraktiv (Druck).',
    faq3q: 'HEX oder RGB in CSS?', faq3a: 'HEX ist kompakt, RGB flexibel, HSL intuitiv. Alle sind in CSS gueltig.',
    faq4q: 'Ist die CMYK-Konvertierung genau?', faq4a: 'Es ist eine mathematische Naeherung. Druckfarben koennen variieren.',
    faq5q: 'Kann ich den Farbwaehler verwenden?', faq5a: 'Ja, klicken Sie auf den Farbwaehler fuer visuelle Auswahl.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor de Colores',
    description: 'Convierte colores entre HEX, RGB, HSL y CMYK con vista previa en vivo.',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    convertBtn: 'Convertir', randomBtn: 'Color aleatorio', colorPicker: 'Selector de color',
    emptyState: 'Ingresa un valor de color y haz clic en Convertir',
    introTitle: 'Convertidor de colores gratuito', introText: 'Convierte colores entre HEX, RGB, HSL y CMYK al instante.',
    howTitle: 'Como convertir colores',
    step1: 'Ingresa un valor de color', step2: 'Haz clic en Convertir', step3: 'Todos los formatos se actualizan', step4: 'Copia el valor deseado',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que formatos se soportan?', faq1a: 'HEX, RGB, HSL y CMYK con deteccion automatica.',
    faq2q: 'Diferencia entre RGB y CMYK?', faq2a: 'RGB es aditivo (pantallas), CMYK es sustractivo (impresion).',
    faq3q: 'HEX o RGB en CSS?', faq3a: 'HEX es compacto, RGB flexible, HSL intuitivo. Todos son validos en CSS.',
    faq4q: 'Es precisa la conversion CMYK?', faq4a: 'Es una aproximacion matematica. Los colores impresos pueden variar.',
    faq5q: 'Puedo usar el selector de color?', faq5a: 'Si, haz clic en el selector para elegir visualmente un color.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'カラーコンバーター',
    description: 'HEX、RGB、HSL、CMYK間でカラーを変換。ライブプレビュー付き。',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    convertBtn: '変換', randomBtn: 'ランダム色', colorPicker: 'カラーピッカー',
    emptyState: 'カラー値を入力して変換をクリック',
    introTitle: '無料オンラインカラーコンバーター', introText: 'HEX、RGB、HSL、CMYK間でカラーを即座に変換します。',
    howTitle: 'カラーの変換方法',
    step1: 'カラー値を入力', step2: '変換をクリック', step3: '全フォーマットが自動更新', step4: '値をコピー',
    faqTitle: 'よくある質問',
    faq1q: '対応フォーマットは？', faq1a: 'HEX、RGB、HSL、CMYKに対応。自動検出機能付き。',
    faq2q: 'RGBとCMYKの違いは？', faq2a: 'RGBは加法混色（画面用）、CMYKは減法混色（印刷用）。',
    faq3q: 'CSSではHEXかRGBか？', faq3a: 'HEXはコンパクト、RGBは柔軟、HSLは直感的。すべてCSSで有効。',
    faq4q: 'CMYK変換は正確？', faq4a: '数学的近似です。実際の印刷色は異なる場合があります。',
    faq5q: 'カラーピッカーは使える？', faq5a: 'はい。クリックして視覚的に色を選択できます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '색상 변환기',
    description: 'HEX, RGB, HSL, CMYK 간 색상 변환. 실시간 미리보기 지원.',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    convertBtn: '변환', randomBtn: '랜덤 색상', colorPicker: '색상 선택기',
    emptyState: '색상 값을 입력하고 변환을 클릭하세요',
    introTitle: '무료 온라인 색상 변환기', introText: 'HEX, RGB, HSL, CMYK 간 색상을 즉시 변환합니다.',
    howTitle: '색상 변환 방법',
    step1: '색상 값 입력', step2: '변환 클릭', step3: '모든 형식 자동 업데이트', step4: '값 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: '지원 형식은?', faq1a: 'HEX, RGB, HSL, CMYK를 자동 감지하여 지원합니다.',
    faq2q: 'RGB와 CMYK의 차이는?', faq2a: 'RGB는 가산혼합(화면용), CMYK는 감산혼합(인쇄용)입니다.',
    faq3q: 'CSS에서 HEX vs RGB?', faq3a: 'HEX는 간결, RGB는 유연, HSL은 직관적. 모두 CSS에서 유효합니다.',
    faq4q: 'CMYK 변환이 정확한가요?', faq4a: '수학적 근사치입니다. 실제 인쇄 색상은 다를 수 있습니다.',
    faq5q: '색상 선택기를 사용할 수 있나요?', faq5a: '네. 클릭하여 시각적으로 색상을 선택할 수 있습니다.',
    relatedTitle: '관련 도구',
  },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  let full = clean;
  if (clean.length === 3) full = clean[0]+clean[0]+clean[1]+clean[1]+clean[2]+clean[2];
  const match = full.match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  const c = Math.round(((1 - rr - k) / (1 - k)) * 100);
  const m = Math.round(((1 - gg - k) / (1 - k)) * 100);
  const y = Math.round(((1 - bb - k) / (1 - k)) * 100);
  return { c, m, y, k: Math.round(k * 100) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('');
}

interface AllColors {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
  r: number; g: number; b: number;
}

export default function ColorConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbInput, setRgbInput] = useState('');
  const [color, setColor] = useState<AllColors | null>(null);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    const cmyk = rgbToCmyk(r, g, b);
    setColor({
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
      r, g, b,
    });
  }, []);

  const fromHex = (hex?: string) => {
    const h = hex || hexInput;
    const rgb = hexToRgb(h);
    if (!rgb) return;
    setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
    setHexInput(h.startsWith('#') ? h : '#' + h);
    updateFromRgb(rgb.r, rgb.g, rgb.b);
  };

  const fromRgb = () => {
    const parts = rgbInput.replace(/rgb\(|\)/g, '').split(',').map(s => parseInt(s.trim()));
    if (parts.length !== 3 || parts.some(isNaN)) return;
    const [r, g, b] = parts;
    setHexInput(rgbToHex(r, g, b));
    updateFromRgb(r, g, b);
  };

  const randomColor = () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setHexInput(hex);
    fromHex(hex);
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
    <ToolLayout title={t.title} description={t.description} toolId="color-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Input side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.hexLabel}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" value={hexInput} onChange={e => setHexInput(e.target.value)} placeholder="#3b82f6" style={{ flex: 1 }} />
              <button onClick={() => fromHex()} className="btn btn-primary" style={{ flexShrink: 0 }}>{t.convertBtn}</button>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.rgbLabel}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" value={rgbInput} onChange={e => setRgbInput(e.target.value)} placeholder="59, 130, 246" style={{ flex: 1 }} />
              <button onClick={fromRgb} className="btn btn-primary" style={{ flexShrink: 0 }}>{t.convertBtn}</button>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.colorPicker}</label>
            <input type="color" value={hexInput.match(/^#[0-9a-fA-F]{6}$/) ? hexInput : '#3b82f6'}
              onChange={e => { setHexInput(e.target.value); fromHex(e.target.value); }}
              style={{ width: '100%', height: 44, border: 'none', cursor: 'pointer', borderRadius: 8 }} />
          </div>
          <button onClick={randomColor} className="btn btn-secondary" style={{ width: '100%' }}>{t.randomBtn}</button>
        </div>

        {/* Preview side */}
        <div>
          {color ? (
            <>
              <div style={{
                width: '100%', height: 140, borderRadius: 12, background: color.hex,
                marginBottom: 16, border: '1px solid var(--border-color)',
                boxShadow: `0 8px 32px ${color.hex}40`,
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: t.hexLabel, value: color.hex },
                  { label: t.rgbLabel, value: color.rgb },
                  { label: t.hslLabel, value: color.hsl },
                  { label: t.cmykLabel, value: color.cmyk },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'var(--bg-input)', borderRadius: 6, padding: '8px 12px',
                    border: '1px solid var(--border-color)',
                  }}>
                    <div>
                      <span style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700 }}>{label}: </span>
                      <code style={{ fontSize: 13 }}>{value}</code>
                    </div>
                    <CopyButton text={value} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>
              {t.emptyState}
            </div>
          )}
        </div>
      </div>

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
          {[
            { q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a },
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
            { href: `/${lang}/tools/color-palette`, label: 'Color Palette Generator' },
            { href: `/${lang}/tools/color-name-to-hex`, label: 'Color Name to HEX' },
            { href: `/${lang}/tools/tailwind-colors`, label: 'Tailwind CSS Colors' },
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
