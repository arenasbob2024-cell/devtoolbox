'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
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

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  return {
    c: Math.round(((1 - rr - k) / (1 - k)) * 100),
    m: Math.round(((1 - gg - k) / (1 - k)) * 100),
    y: Math.round(((1 - bb - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HEX Color Picker & Converter',
    description: 'Pick any color and get its HEX, RGB, HSL, and CMYK values. Use the visual color picker or enter a HEX code to convert between formats.',
    hexLabel: 'HEX',
    rgbLabel: 'RGB',
    hslLabel: 'HSL',
    cmykLabel: 'CMYK',
    pickerLabel: 'Color Picker',
    preview: 'Preview',
    randomBtn: 'Random Color',
    introTitle: 'Free Online HEX Color Picker',
    introText: 'This HEX color picker lets you select any color visually and instantly get its equivalent in HEX, RGB, HSL, and CMYK formats. HEX colors are the most common color notation in web development, using a six-character hexadecimal code (e.g., #FF5733) to represent red, green, and blue channels. This tool is essential for web designers, CSS developers, and UI/UX professionals who need to convert between different color systems.',
    howTitle: 'How to Use the HEX Color Picker',
    step1: 'Click the color picker to select any color visually',
    step2: 'Or enter a HEX color code directly (e.g., #3B82F6)',
    step3: 'All color formats (HEX, RGB, HSL, CMYK) update instantly',
    step4: 'Click the copy button next to any format to copy its value',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a HEX color code?',
    faq1a: 'A HEX color code is a six-digit hexadecimal number preceded by a hash sign (#). It represents a color using the RGB model, where the first two digits represent red (00-FF), the middle two represent green, and the last two represent blue. For example, #FF0000 is pure red, #00FF00 is pure green, and #0000FF is pure blue. HEX codes are the standard for specifying colors in HTML and CSS.',
    faq2q: 'How do I convert HEX to RGB?',
    faq2a: 'To convert HEX to RGB, split the six-digit HEX code into three pairs of two digits. Convert each pair from hexadecimal to decimal. For example, #3B82F6 becomes R=59 (3B), G=130 (82), B=246 (F6), giving rgb(59, 130, 246). This tool does this conversion automatically and also provides HSL and CMYK values.',
    faq3q: 'What is the difference between HEX and RGB?',
    faq3a: 'HEX and RGB represent the same color model but use different notation. HEX uses a compact six-character hexadecimal format (e.g., #FF5733), while RGB uses decimal values for each channel (e.g., rgb(255, 87, 51)). HEX is more common in CSS, while RGB is useful when you need to manipulate individual color channels programmatically.',
    faq4q: 'Can I use a 3-digit HEX code?',
    faq4a: 'Yes, CSS supports 3-digit shorthand HEX codes where each digit is doubled. For example, #F80 is equivalent to #FF8800. The shorthand is useful for common colors but limits you to 4,096 colors instead of the full 16.7 million available with 6-digit codes.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'HEX 颜色选择器和转换器',
    description: '选择任意颜色，获取其 HEX、RGB、HSL 和 CMYK 值。使用可视颜色选择器或输入 HEX 代码进行转换。',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    pickerLabel: '颜色选择器', preview: '预览', randomBtn: '随机颜色',
    introTitle: '免费在线 HEX 颜色选择器',
    introText: '这个 HEX 颜色选择器让您直观地选择颜色并即时获取 HEX、RGB、HSL 和 CMYK 格式的值。HEX 颜色是网页开发中最常见的颜色表示法。',
    howTitle: '如何使用 HEX 颜色选择器',
    step1: '点击颜色选择器直观选择颜色', step2: '或直接输入 HEX 颜色代码',
    step3: '所有颜色格式即时更新', step4: '点击复制按钮复制任何格式的值',
    faqTitle: '常见问题',
    faq1q: '什么是 HEX 颜色代码？', faq1a: 'HEX 颜色代码是以 # 开头的六位十六进制数。前两位代表红色，中间两位代表绿色，后两位代表蓝色。',
    faq2q: '如何将 HEX 转换为 RGB？', faq2a: '将六位 HEX 代码分为三对两位数，每对从十六进制转换为十进制。例如 #3B82F6 变为 rgb(59, 130, 246)。',
    faq3q: 'HEX 和 RGB 有什么区别？', faq3a: 'HEX 和 RGB 代表相同的颜色模型，但使用不同的表示法。HEX 更简洁，RGB 更直观。',
    faq4q: '可以使用 3 位 HEX 代码吗？', faq4a: '是的，CSS 支持 3 位简写 HEX 代码，每位数字重复。例如 #F80 等于 #FF8800。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Selecteur de Couleur HEX',
    description: 'Selectionnez une couleur et obtenez ses valeurs HEX, RGB, HSL et CMYK. Utilisez le selecteur visuel ou entrez un code HEX.',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    pickerLabel: 'Selecteur de couleur', preview: 'Apercu', randomBtn: 'Couleur aleatoire',
    introTitle: 'Selecteur de couleur HEX gratuit', introText: 'Ce selecteur de couleur HEX vous permet de selectionner visuellement une couleur et d\'obtenir ses equivalents HEX, RGB, HSL et CMYK instantanement.',
    howTitle: 'Comment utiliser le selecteur HEX',
    step1: 'Cliquez sur le selecteur pour choisir une couleur', step2: 'Ou entrez un code HEX directement',
    step3: 'Tous les formats de couleur se mettent a jour', step4: 'Cliquez sur copier pour copier la valeur',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'un code couleur HEX ?', faq1a: 'Un code couleur HEX est un nombre hexadecimal a six chiffres precede de #. Il represente une couleur RGB.',
    faq2q: 'Comment convertir HEX en RGB ?', faq2a: 'Divisez le code HEX en trois paires et convertissez chaque paire en decimal.',
    faq3q: 'Difference entre HEX et RGB ?', faq3a: 'HEX et RGB representent le meme modele de couleur avec des notations differentes.',
    faq4q: 'Peut-on utiliser un code HEX a 3 chiffres ?', faq4a: 'Oui, CSS supporte les codes HEX abreges a 3 chiffres.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'HEX Farbwaehler & Konverter',
    description: 'Waehlen Sie eine Farbe und erhalten Sie HEX, RGB, HSL und CMYK Werte. Verwenden Sie den visuellen Farbwaehler oder geben Sie einen HEX-Code ein.',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    pickerLabel: 'Farbwaehler', preview: 'Vorschau', randomBtn: 'Zufaellige Farbe',
    introTitle: 'Kostenloser HEX Farbwaehler', introText: 'Dieser HEX Farbwaehler ermoeglicht die visuelle Farbauswahl mit sofortiger Umrechnung in HEX, RGB, HSL und CMYK.',
    howTitle: 'Anleitung',
    step1: 'Klicken Sie auf den Farbwaehler', step2: 'Oder geben Sie einen HEX-Code ein',
    step3: 'Alle Farbformate aktualisieren sich sofort', step4: 'Klicken Sie auf Kopieren fuer den gewuenschten Wert',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein HEX-Farbcode?', faq1a: 'Ein HEX-Farbcode ist eine sechsstellige Hexadezimalzahl mit vorangestelltem #.',
    faq2q: 'Wie konvertiert man HEX zu RGB?', faq2a: 'Teilen Sie den HEX-Code in drei Paare und konvertieren Sie jedes in Dezimal.',
    faq3q: 'Unterschied zwischen HEX und RGB?', faq3a: 'HEX und RGB stellen dasselbe Farbmodell mit unterschiedlicher Notation dar.',
    faq4q: 'Kann man 3-stellige HEX-Codes verwenden?', faq4a: 'Ja, CSS unterstuetzt 3-stellige HEX-Kurzschreibweise.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Selector de Color HEX',
    description: 'Selecciona cualquier color y obtiene sus valores HEX, RGB, HSL y CMYK. Usa el selector visual o ingresa un codigo HEX.',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    pickerLabel: 'Selector de color', preview: 'Vista previa', randomBtn: 'Color aleatorio',
    introTitle: 'Selector de color HEX gratuito', introText: 'Este selector de color HEX te permite seleccionar visualmente un color y obtener sus valores HEX, RGB, HSL y CMYK al instante.',
    howTitle: 'Como usar el selector HEX',
    step1: 'Haz clic en el selector para elegir un color', step2: 'O ingresa un codigo HEX directamente',
    step3: 'Todos los formatos de color se actualizan', step4: 'Haz clic en copiar para copiar el valor',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es un codigo de color HEX?', faq1a: 'Un codigo HEX es un numero hexadecimal de seis digitos precedido por #.',
    faq2q: 'Como convertir HEX a RGB?', faq2a: 'Divide el codigo HEX en tres pares y convierte cada par a decimal.',
    faq3q: 'Diferencia entre HEX y RGB?', faq3a: 'HEX y RGB representan el mismo modelo de color con notaciones diferentes.',
    faq4q: 'Se puede usar un codigo HEX de 3 digitos?', faq4a: 'Si, CSS soporta codigos HEX abreviados de 3 digitos.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'HEX カラーピッカー＆変換ツール',
    description: '色を選択して HEX、RGB、HSL、CMYK の値を取得。ビジュアルカラーピッカーまたは HEX コード入力で変換。',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    pickerLabel: 'カラーピッカー', preview: 'プレビュー', randomBtn: 'ランダム色',
    introTitle: '無料オンライン HEX カラーピッカー', introText: 'この HEX カラーピッカーで色を選択し、HEX、RGB、HSL、CMYK 形式の値を即座に取得できます。',
    howTitle: '使い方',
    step1: 'カラーピッカーをクリックして色を選択', step2: 'または HEX コードを直接入力',
    step3: 'すべてのカラー形式が即時更新', step4: 'コピーボタンで値をコピー',
    faqTitle: 'よくある質問',
    faq1q: 'HEX カラーコードとは？', faq1a: 'HEX カラーコードは # に続く6桁の16進数で RGB 色を表します。',
    faq2q: 'HEX を RGB に変換するには？', faq2a: 'HEX コードを3つのペアに分割し、各ペアを10進数に変換します。',
    faq3q: 'HEX と RGB の違いは？', faq3a: 'HEX と RGB は同じカラーモデルを異なる表記法で表現します。',
    faq4q: '3桁の HEX コードは使える？', faq4a: 'はい、CSS は3桁の短縮 HEX コードをサポートしています。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'HEX 컬러 피커 & 변환기',
    description: '색상을 선택하여 HEX, RGB, HSL, CMYK 값을 얻으세요. 비주얼 컬러 피커 또는 HEX 코드 입력으로 변환.',
    hexLabel: 'HEX', rgbLabel: 'RGB', hslLabel: 'HSL', cmykLabel: 'CMYK',
    pickerLabel: '컬러 피커', preview: '미리보기', randomBtn: '랜덤 색상',
    introTitle: '무료 온라인 HEX 컬러 피커', introText: '이 HEX 컬러 피커로 색상을 선택하고 HEX, RGB, HSL, CMYK 형식의 값을 즉시 얻을 수 있습니다.',
    howTitle: '사용 방법',
    step1: '컬러 피커를 클릭하여 색상 선택', step2: '또는 HEX 코드를 직접 입력',
    step3: '모든 색상 형식이 즉시 업데이트', step4: '복사 버튼으로 값 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: 'HEX 색상 코드란?', faq1a: 'HEX 색상 코드는 #으로 시작하는 6자리 16진수로 RGB 색상을 나타냅니다.',
    faq2q: 'HEX를 RGB로 변환하는 방법은?', faq2a: 'HEX 코드를 세 쌍으로 나누고 각 쌍을 10진수로 변환합니다.',
    faq3q: 'HEX와 RGB의 차이점은?', faq3a: 'HEX와 RGB는 같은 색상 모델을 다른 표기법으로 표현합니다.',
    faq4q: '3자리 HEX 코드를 사용할 수 있나요?', faq4a: '네, CSS는 3자리 단축 HEX 코드를 지원합니다.',
    relatedTitle: '관련 도구',
  },
};

export default function HexColorPicker() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [hex, setHex] = useState('#3B82F6');

  const handlePickerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value.toUpperCase());
  }, []);

  const handleHexInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('#')) val = '#' + val;
    setHex(val.toUpperCase());
  }, []);

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setHex('#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase());
  };

  const rgb = hexToRgb(hex);
  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '';
  const cmyk = rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null;
  const cmykStr = cmyk ? `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` : '';

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
    <ToolLayout title={t.title} description={t.description} toolId="hex-color-picker">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Left: Picker + Preview */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.pickerLabel}</label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <input type="color" value={hex.length === 7 ? hex : '#3B82F6'} onChange={handlePickerChange}
              style={{ width: 64, height: 64, border: 'none', cursor: 'pointer', borderRadius: 8, padding: 0 }} />
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.hexLabel}</label>
              <input type="text" value={hex} onChange={handleHexInput} maxLength={7}
                style={{ width: '100%', padding: '8px 12px', fontSize: 16, fontFamily: 'monospace', fontWeight: 700 }} />
            </div>
          </div>
          <button onClick={randomColor} className="btn btn-secondary" style={{ marginBottom: 16 }}>{t.randomBtn}</button>

          <div style={{ width: '100%', height: 120, borderRadius: 12, border: '1px solid var(--border-color)', background: hex.length === 7 ? hex : '#3B82F6', marginBottom: 8 }} />
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>{t.preview}: {hex}</p>
        </div>

        {/* Right: Color values */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: t.hexLabel, value: hex },
            { label: t.rgbLabel, value: rgbStr },
            { label: t.hslLabel, value: hslStr },
            { label: t.cmykLabel, value: cmykStr },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>{label}</div>
                <code style={{ fontSize: 14, fontWeight: 600, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{value || '—'}</code>
              </div>
              {value && <CopyButton text={value} />}
            </div>
          ))}
        </div>
      </div>

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
            { href: `/${lang}/tools/color-converter`, label: 'Color Converter' },
            { href: `/${lang}/tools/hex-to-rgb`, label: 'Hex to RGB' },
            { href: `/${lang}/tools/color-palette`, label: 'Color Palette Generator' },
            { href: `/${lang}/tools/css-gradient`, label: 'CSS Gradient Generator' },
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
