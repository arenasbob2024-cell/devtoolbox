'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Pixel to REM Converter',
    description: 'Convert between px, rem, and em CSS units. Set a custom base font size and see an instant conversion table.',
    baseFontSize: 'Base Font Size (px)',
    pxValue: 'Pixel Value (px)',
    remValue: 'REM Value',
    emValue: 'EM Value',
    convert: 'Convert',
    clear: 'Clear',
    conversionTable: 'Conversion Table',
    px: 'px',
    rem: 'rem',
    em: 'em',
    commonSizes: 'Common Sizes',
    introTitle: 'Free Pixel to REM Converter',
    introText: 'REM (root em) is a CSS unit relative to the root element font size, while EM is relative to the parent element font size. Converting pixels to relative units is essential for responsive web design. The default root font size in most browsers is 16px. This tool lets you set a custom base font size and instantly converts between px, rem, and em values with a handy reference table.',
    tipTitle: 'CSS Unit Tips',
    tip1: 'REM is relative to the root (html) element font size, typically 16px',
    tip2: 'EM is relative to the parent element font size, making it context-dependent',
    tip3: 'Using rem for font sizes and layout creates more consistent responsive designs',
    tip4: 'Formula: rem = pixels / base font size (e.g., 24px / 16 = 1.5rem)',
    tip5: 'Set html { font-size: 62.5%; } to make 1rem = 10px for easier calculations',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between px, rem, and em?',
    faq1a: 'PX (pixels) is an absolute unit that does not scale with user settings. REM (root em) is relative to the root HTML element font size. EM is relative to the font size of the parent element. Using relative units like rem and em creates more accessible and responsive designs.',
    faq2q: 'What is the default base font size?',
    faq2a: 'Most browsers default to 16px as the root font size. So 1rem = 16px by default. Users can change this in their browser settings, which is why using rem is more accessible than fixed px values.',
    faq3q: 'How do I convert px to rem?',
    faq3a: 'Divide the pixel value by the base font size. For example: 24px / 16px = 1.5rem. If you change the base font size to 10px (by setting html { font-size: 62.5% }), then 24px / 10px = 2.4rem.',
    faq4q: 'When should I use rem vs em?',
    faq4a: 'Use rem for global elements like font sizes, margins, and paddings to maintain consistency across the design. Use em for component-level sizing where you want elements to scale relative to their parent context, such as button padding relative to button text size.',
    faq5q: 'What does 62.5% base font size mean?',
    faq5a: 'Setting html { font-size: 62.5% } makes the root font size 10px (62.5% of 16px = 10px). This makes rem calculations easier: 1.6rem = 16px, 2.4rem = 24px, etc. It is a popular CSS trick for simplifying rem arithmetic.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Pixel 转 REM 转换器',
    description: '在 px、rem 和 em CSS 单位之间转换。设置自定义基础字体大小并查看转换对照表。',
    baseFontSize: '基础字体大小 (px)',
    pxValue: '像素值 (px)',
    remValue: 'REM 值',
    emValue: 'EM 值',
    convert: '转换', clear: '清除', conversionTable: '转换对照表', px: 'px', rem: 'rem', em: 'em',
    commonSizes: '常用尺寸',
    introTitle: '免费 Pixel 转 REM 转换器',
    introText: 'REM 是相对于根元素字体大小的 CSS 单位，EM 则相对于父元素。将像素转换为相对单位对响应式设计至关重要。',
    tipTitle: 'CSS 单位提示',
    tip1: 'REM 相对于根(html)元素字体大小，通常为16px', tip2: 'EM 相对于父元素字体大小，受上下文影响',
    tip3: '使用rem作为字体和布局单位可创建更一致的响应式设计', tip4: '公式: rem = 像素值 / 基础字体大小 (如 24px / 16 = 1.5rem)',
    tip5: '设置 html { font-size: 62.5%; } 可使 1rem = 10px，便于计算',
    faqTitle: '常见问题',
    faq1q: 'px、rem 和 em 有什么区别？', faq1a: 'px 是绝对单位，不随用户设置缩放。rem 相对于根 HTML 元素字体大小。em 相对于父元素字体大小。使用相对单位可创建更易访问和响应式的设计。',
    faq2q: '默认基础字体大小是多少？', faq2a: '大多数浏览器默认根字体大小为16px，即 1rem = 16px。用户可以在浏览器设置中更改，因此使用 rem 比固定 px 更易访问。',
    faq3q: '如何将 px 转换为 rem？', faq3a: '用像素值除以基础字体大小。例如：24px / 16px = 1.5rem。',
    faq4q: '什么时候用 rem，什么时候用 em？', faq4a: '全局元素（字体大小、边距）使用 rem 保持一致性。组件级尺寸使用 em，使元素相对于父级上下文缩放。',
    faq5q: '62.5% 基础字体大小是什么意思？', faq5a: '设置 html { font-size: 62.5% } 使根字体大小为 10px（62.5% x 16px），简化 rem 计算：1.6rem = 16px。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur Pixel en REM',
    description: 'Convertissez entre px, rem et em. Definissez une taille de police de base et consultez le tableau de conversion.',
    baseFontSize: 'Taille de police de base (px)', pxValue: 'Valeur en pixels (px)', remValue: 'Valeur REM', emValue: 'Valeur EM',
    convert: 'Convertir', clear: 'Effacer', conversionTable: 'Tableau de conversion', px: 'px', rem: 'rem', em: 'em',
    commonSizes: 'Tailles courantes',
    introTitle: 'Convertisseur Pixel en REM gratuit', introText: 'Convertissez entre px, rem et em pour un design web responsive.',
    tipTitle: 'Conseils', tip1: 'REM est relatif a la taille de police de la racine (html)', tip2: 'EM est relatif a la taille de police du parent',
    tip3: 'Utilisez rem pour la mise en page responsive', tip4: 'Formule: rem = pixels / taille de police de base', tip5: 'html { font-size: 62.5% } rend 1rem = 10px',
    faqTitle: 'Questions frequentes',
    faq1q: 'Difference entre px, rem, em?', faq1a: 'PX est absolu. REM est relatif a la racine HTML. EM est relatif au parent.',
    faq2q: 'Quelle est la taille par defaut?', faq2a: 'La plupart des navigateurs utilisent 16px par defaut, donc 1rem = 16px.',
    faq3q: 'Comment convertir px en rem?', faq3a: 'Divisez la valeur en pixels par la taille de police de base. Ex: 24/16 = 1.5rem.',
    faq4q: 'Quand utiliser rem vs em?', faq4a: 'rem pour les elements globaux, em pour les composants relatifs au parent.',
    faq5q: 'Que signifie 62.5% de taille de police?', faq5a: 'html font-size 62.5% rend la police racine 10px, simplifiant les calculs rem.',
    relatedTitle: 'Outils connexes',
  },
  ja: {
    title: 'ピクセルからREMへのコンバーター',
    description: 'px、rem、em CSS単位を変換。カスタムベースフォントサイズを設定し、変換表を確認できます。',
    baseFontSize: 'ベースフォントサイズ (px)', pxValue: 'ピクセル値 (px)', remValue: 'REM値', emValue: 'EM値',
    convert: '変換', clear: 'クリア', conversionTable: '変換テーブル', px: 'px', rem: 'rem', em: 'em',
    commonSizes: 'よく使うサイズ',
    introTitle: '無料ピクセル→REM変換ツール', introText: 'レスポンシブウェブデザインのためにpx、rem、em間で変換します。',
    tipTitle: 'ヒント', tip1: 'REMはルート(html)要素のフォントサイズに対する相対値', tip2: 'EMは親要素のフォントサイズに対する相対値',
    tip3: 'フォントとレイアウトにremを使用するとより一貫したデザインに', tip4: '計算式: rem = ピクセル / ベースフォントサイズ', tip5: 'html { font-size: 62.5% } で 1rem = 10px',
    faqTitle: 'よくある質問',
    faq1q: 'px、rem、emの違いは？', faq1a: 'pxは絶対単位。REMはルートHTML要素に対する相対値。EMは親要素に対する相対値。',
    faq2q: 'デフォルトのベースフォントサイズは？', faq2a: 'ほとんどのブラウザはデフォルト16px（1rem=16px）。',
    faq3q: 'pxをremに変換するには？', faq3a: 'ピクセル値をベースフォントサイズで割る。例：24/16=1.5rem。',
    faq4q: 'remとemはどう使い分ける？', faq4a: 'グローバル要素にはrem、コンポーネントの相対サイズにはem。',
    faq5q: '62.5%とは？', faq5a: 'html font-size 62.5%でルートフォント10px、計算が楽になります。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '픽셀을 REM으로 변환기',
    description: 'px, rem, em CSS 단위를 변환합니다. 기본 글꼴 크기를 설정하고 변환 테이블을 확인하세요.',
    baseFontSize: '기본 글꼴 크기 (px)', pxValue: '픽셀 값 (px)', remValue: 'REM 값', emValue: 'EM 값',
    convert: '변환', clear: '지우기', conversionTable: '변환 테이블', px: 'px', rem: 'rem', em: 'em',
    commonSizes: '일반 크기',
    introTitle: '무료 픽셀-REM 변환기', introText: '반응형 웹 디자인을 위해 px, rem, em 단위를 변환합니다.',
    tipTitle: '팁', tip1: 'REM은 루트(html) 요소 글꼴 크기에 상대적', tip2: 'EM은 부모 요소 글꼴 크기에 상대적',
    tip3: '반응형 디자인을 위해 rem을 사용하세요', tip4: '계산식: rem = 픽셀 / 기본 글꼴 크기', tip5: 'html { font-size: 62.5% }로 1rem = 10px 설정',
    faqTitle: '자주 묻는 질문',
    faq1q: 'px, rem, em의 차이는?', faq1a: 'px는 절대 단위입니다. REM은 루트 HTML 요소에 상대적입니다. EM은 부모 요소에 상대적입니다.',
    faq2q: '기본 글꼴 크기는?', faq2a: '대부분의 브라우저는 기본 16px(1rem=16px)입니다.',
    faq3q: 'px를 rem으로 변환하려면?', faq3a: '픽셀 값을 기본 글꼴 크기로 나눕니다. 예: 24/16=1.5rem.',
    faq4q: 'rem과 em은 언제 사용하나요?', faq4a: '전역 요소에는 rem, 컴포넌트 상대 크기에는 em을 사용합니다.',
    faq5q: '62.5%는 무엇인가요?', faq5a: 'html font-size 62.5%로 루트 폰트 10px를 만들어 rem 계산을 쉽게 합니다.',
    relatedTitle: '관련 도구',
  },
};

const TABLE_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 32, 36, 48, 64, 80, 96];
const COMMON_SIZES = [12, 14, 16, 18, 20, 24, 32, 48];

export default function PixelToRemConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [pxInput, setPxInput] = useState('');

  const convertPxToRem = (px: number, base: number) => (px / base).toFixed(4).replace(/\.?0+$/, '');
  const convertPxToEm = (px: number, base: number) => (px / base).toFixed(4).replace(/\.?0+$/, '');
  const convertRemToPx = (rem: number, base: number) => (rem * base).toFixed(2).replace(/\.?0+$/, '');

  const inputPx = parseFloat(pxInput);
  const remResult = !isNaN(inputPx) ? convertPxToRem(inputPx, baseFontSize) : '';
  const emResult = !isNaN(inputPx) ? convertPxToEm(inputPx, baseFontSize) : '';

  const tableRows = useMemo(() => TABLE_SIZES.map(px => ({
    px,
    rem: convertPxToRem(px, baseFontSize),
    em: convertPxToEm(px, baseFontSize),
  })), [baseFontSize]);

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
    <ToolLayout title={t.title} description={t.description} toolId="pixel-to-rem-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Base font size */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.baseFontSize}</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="range" min={8} max={32} value={baseFontSize} onChange={e => setBaseFontSize(Number(e.target.value))} style={{ flex: 1 }} />
          <input type="number" min={1} value={baseFontSize} onChange={e => setBaseFontSize(Math.max(1, Number(e.target.value)))}
            style={{ width: 70, padding: '6px 8px', fontSize: 14, textAlign: 'center', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>px</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {[10, 14, 16, 18, 20].map(v => (
            <button key={v} onClick={() => setBaseFontSize(v)} className="btn btn-ghost"
              style={{ fontSize: 12, padding: '4px 10px', background: baseFontSize === v ? 'rgba(59,130,246,0.1)' : undefined, border: baseFontSize === v ? '1px solid var(--accent-blue)' : undefined }}>
              {v}px
            </button>
          ))}
        </div>
      </div>

      {/* Converter */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.pxValue}</label>
          <input type="number" value={pxInput} onChange={e => setPxInput(e.target.value)} placeholder="16"
            style={{ padding: '10px 12px', fontSize: 16, fontFamily: 'monospace', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.remValue}</label>
          <div style={{ display: 'flex', gap: 4 }}>
            <input readOnly value={remResult ? `${remResult}rem` : ''} placeholder="1rem"
              style={{ flex: 1, padding: '10px 12px', fontSize: 16, fontFamily: 'monospace', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: '#22c55e' }} />
            {remResult && <CopyButton text={`${remResult}rem`} />}
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.emValue}</label>
          <div style={{ display: 'flex', gap: 4 }}>
            <input readOnly value={emResult ? `${emResult}em` : ''} placeholder="1em"
              style={{ flex: 1, padding: '10px 12px', fontSize: 16, fontFamily: 'monospace', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: '#8b5cf6' }} />
            {emResult && <CopyButton text={`${emResult}em`} />}
          </div>
        </div>
      </div>

      {/* Common sizes quick-pick */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.commonSizes}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {COMMON_SIZES.map(px => (
            <button key={px} onClick={() => setPxInput(String(px))} className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 10px' }}>
              {px}px
            </button>
          ))}
        </div>
      </div>

      {/* Conversion table */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{t.conversionTable}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                {[t.px, t.rem, t.em].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={row.px} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg-input)' }}>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', color: '#3b82f6' }}>{row.px}px</td>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', color: '#22c55e' }}>{row.rem}rem</td>
                  <td style={{ padding: '8px 14px', fontFamily: 'monospace', color: '#8b5cf6' }}>{row.em}em</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
            { href: `/${lang}/tools/css-minifier`, label: 'CSS Minifier' },
            { href: `/${lang}/tools/color-converter`, label: 'Color Converter' },
            { href: `/${lang}/tools/css-gradient-generator`, label: 'CSS Gradient Generator' },
            { href: `/${lang}/tools/color-palette-generator`, label: 'Color Palette Generator' },
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
