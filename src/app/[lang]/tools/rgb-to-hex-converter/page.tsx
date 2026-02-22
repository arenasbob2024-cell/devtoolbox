'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'RGB to HEX Converter', description: 'Convert RGB color values to HEX color codes with real-time preview. Enter R, G, B values (0-255) and get the HEX code instantly.',
    r: 'Red (R)', g: 'Green (G)', b: 'Blue (B)', hexResult: 'HEX Color Code', cssRgb: 'CSS rgb()', preview: 'Color Preview', clear: 'Reset',
    intro: 'Convert RGB (Red, Green, Blue) color values to hexadecimal color codes used in CSS and web design. Each RGB channel ranges from 0 to 255. The HEX equivalent uses two hexadecimal digits per channel, creating a 6-character color code preceded by #. This tool provides real-time conversion with a live color preview.',
    faq1q: 'How do I convert RGB to HEX?', faq1a: 'Each RGB value (0-255) is converted to a two-digit hexadecimal number. For example, RGB(255, 128, 0) becomes #FF8000. The red channel 255 = FF, green 128 = 80, blue 0 = 00.',
    faq2q: 'What is the difference between RGB and HEX colors?', faq2a: 'RGB uses decimal numbers (0-255) for each color channel while HEX uses hexadecimal (00-FF). They represent the same colors in different notation. HEX is more compact and commonly used in CSS, HTML, and design tools.',
    faq3q: 'Why use HEX over RGB in CSS?', faq3a: 'HEX codes are shorter (6 characters vs 3 numbers) and widely supported. However, RGB is easier to read and modify programmatically. CSS supports both rgb(255,0,0) and #FF0000 for the same red color.',
    relatedTools: 'Related Color Tools',
  },
  zh: { title: 'RGB 转 HEX 转换器', description: '将 RGB 颜色值转换为 HEX 颜色代码。', r: '红色 (R)', g: '绿色 (G)', b: '蓝色 (B)', hexResult: 'HEX 颜色代码', cssRgb: 'CSS rgb()', preview: '颜色预览', clear: '重置', intro: '将 RGB 颜色值转换为十六进制颜色代码。每个 RGB 通道范围为 0 到 255。', faq1q: '如何将 RGB 转换为 HEX？', faq1a: '每个 RGB 值转换为两位十六进制数。例如 RGB(255, 128, 0) 变为 #FF8000。', faq2q: 'RGB 和 HEX 颜色有什么区别？', faq2a: 'RGB 使用十进制数 (0-255)，HEX 使用十六进制 (00-FF)。表示相同的颜色。', faq3q: '为什么在 CSS 中使用 HEX？', faq3a: 'HEX 代码更短，广泛支持。但 RGB 更易于阅读和编程修改。', relatedTools: '相关颜色工具' },
  ja: { title: 'RGB to HEX 変換ツール', description: 'RGB カラー値を HEX カラーコードに変換します。', r: '赤 (R)', g: '緑 (G)', b: '青 (B)', hexResult: 'HEX カラーコード', cssRgb: 'CSS rgb()', preview: 'カラープレビュー', clear: 'リセット', intro: 'RGB カラー値を16進数カラーコードに変換します。', faq1q: 'RGB を HEX に変換する方法は？', faq1a: '各 RGB 値を2桁の16進数に変換します。', faq2q: 'RGB と HEX の違いは？', faq2a: 'RGB は10進数を使用し、HEX は16進数を使用します。', faq3q: 'CSS で HEX を使う理由は？', faq3a: 'HEX コードはより短く広くサポートされています。', relatedTools: '関連カラーツール' },
  ko: { title: 'RGB to HEX 변환기', description: 'RGB 색상 값을 HEX 색상 코드로 변환합니다.', r: '빨강 (R)', g: '초록 (G)', b: '파랑 (B)', hexResult: 'HEX 색상 코드', cssRgb: 'CSS rgb()', preview: '색상 미리보기', clear: '초기화', intro: 'RGB 색상 값을 16진수 색상 코드로 변환합니다.', faq1q: 'RGB를 HEX로 변환하는 방법?', faq1a: '각 RGB 값을 2자리 16진수로 변환합니다.', faq2q: 'RGB와 HEX 색상의 차이점?', faq2a: 'RGB는 10진수를, HEX는 16진수를 사용합니다.', faq3q: 'CSS에서 HEX를 사용하는 이유?', faq3a: 'HEX 코드가 더 짧고 널리 지원됩니다.', relatedTools: '관련 색상 도구' },
  fr: { title: 'Convertisseur RGB vers HEX', description: 'Convertissez les valeurs RGB en codes HEX.', r: 'Rouge (R)', g: 'Vert (G)', b: 'Bleu (B)', hexResult: 'Code Couleur HEX', cssRgb: 'CSS rgb()', preview: 'Apercu', clear: 'Reinitialiser', intro: 'Convertissez les valeurs de couleur RGB en codes hexadecimaux.', faq1q: 'Comment convertir RGB en HEX ?', faq1a: 'Chaque valeur RGB est convertie en nombre hexadecimal a 2 chiffres.', faq2q: 'Difference entre RGB et HEX ?', faq2a: 'RGB utilise des decimales, HEX des hexadecimaux.', faq3q: 'Pourquoi utiliser HEX en CSS ?', faq3a: 'Les codes HEX sont plus courts et largement supportes.', relatedTools: 'Outils couleur associes' },
  de: { title: 'RGB zu HEX Konverter', description: 'Konvertieren Sie RGB-Werte in HEX-Codes.', r: 'Rot (R)', g: 'Gruen (G)', b: 'Blau (B)', hexResult: 'HEX Farbcode', cssRgb: 'CSS rgb()', preview: 'Vorschau', clear: 'Zuruecksetzen', intro: 'Konvertieren Sie RGB-Farbwerte in hexadezimale Farbcodes.', faq1q: 'Wie konvertiere ich RGB zu HEX?', faq1a: 'Jeder RGB-Wert wird in eine zweistellige Hexadezimalzahl konvertiert.', faq2q: 'Unterschied RGB und HEX?', faq2a: 'RGB nutzt Dezimalzahlen, HEX Hexadezimalzahlen.', faq3q: 'Warum HEX in CSS?', faq3a: 'HEX-Codes sind kuerzer und weit verbreitet.', relatedTools: 'Verwandte Farbtools' },
  es: { title: 'Convertidor RGB a HEX', description: 'Convierte valores RGB a codigos HEX.', r: 'Rojo (R)', g: 'Verde (G)', b: 'Azul (B)', hexResult: 'Codigo Color HEX', cssRgb: 'CSS rgb()', preview: 'Vista previa', clear: 'Reiniciar', intro: 'Convierte valores de color RGB a codigos hexadecimales.', faq1q: 'Como convertir RGB a HEX?', faq1a: 'Cada valor RGB se convierte en un numero hexadecimal de 2 digitos.', faq2q: 'Diferencia entre RGB y HEX?', faq2a: 'RGB usa decimales, HEX hexadecimales.', faq3q: 'Por que usar HEX en CSS?', faq3a: 'Los codigos HEX son mas cortos y ampliamente soportados.', relatedTools: 'Herramientas de color relacionadas' },
  pt: { title: 'Conversor RGB para HEX', description: 'Converta valores RGB para codigos HEX.', r: 'Vermelho (R)', g: 'Verde (G)', b: 'Azul (B)', hexResult: 'Codigo de Cor HEX', cssRgb: 'CSS rgb()', preview: 'Pre-visualizacao', clear: 'Redefinir', intro: 'Converta valores de cor RGB para codigos hexadecimais.', faq1q: 'Como converter RGB para HEX?', faq1a: 'Cada valor RGB e convertido em um numero hexadecimal de 2 digitos.', faq2q: 'Diferenca entre RGB e HEX?', faq2a: 'RGB usa decimais, HEX usa hexadecimais.', faq3q: 'Por que usar HEX no CSS?', faq3a: 'Codigos HEX sao mais curtos e amplamente suportados.', relatedTools: 'Ferramentas de cor relacionadas' },
  it: { title: 'Convertitore RGB in HEX', description: 'Converti valori RGB in codici HEX.', r: 'Rosso (R)', g: 'Verde (G)', b: 'Blu (B)', hexResult: 'Codice Colore HEX', cssRgb: 'CSS rgb()', preview: 'Anteprima', clear: 'Ripristina', intro: 'Converti valori colore RGB in codici esadecimali.', faq1q: 'Come convertire RGB in HEX?', faq1a: 'Ogni valore RGB viene convertito in un numero esadecimale a 2 cifre.', faq2q: 'Differenza tra RGB e HEX?', faq2a: 'RGB usa decimali, HEX esadecimali.', faq3q: 'Perche usare HEX nel CSS?', faq3a: 'I codici HEX sono piu corti e ampiamente supportati.', relatedTools: 'Strumenti colore correlati' },
  nl: { title: 'RGB naar HEX Converter', description: 'Converteer RGB-waarden naar HEX-codes.', r: 'Rood (R)', g: 'Groen (G)', b: 'Blauw (B)', hexResult: 'HEX Kleurcode', cssRgb: 'CSS rgb()', preview: 'Voorbeeld', clear: 'Reset', intro: 'Converteer RGB-kleurwaarden naar hexadecimale kleurcodes.', faq1q: 'Hoe RGB naar HEX?', faq1a: 'Elke RGB-waarde wordt omgezet naar een 2-cijferig hexadecimaal getal.', faq2q: 'Verschil RGB en HEX?', faq2a: 'RGB gebruikt decimalen, HEX hexadecimalen.', faq3q: 'Waarom HEX in CSS?', faq3a: 'HEX-codes zijn korter en breed ondersteund.', relatedTools: 'Gerelateerde kleurtools' },
  pl: { title: 'Konwerter RGB do HEX', description: 'Konwertuj wartosci RGB na kody HEX.', r: 'Czerwony (R)', g: 'Zielony (G)', b: 'Niebieski (B)', hexResult: 'Kod Koloru HEX', cssRgb: 'CSS rgb()', preview: 'Podglad', clear: 'Resetuj', intro: 'Konwertuj wartosci kolorow RGB na kody szesnastkowe.', faq1q: 'Jak konwertowac RGB na HEX?', faq1a: 'Kazda wartosc RGB jest konwertowana na 2-cyfrowa liczbe szesnastkowa.', faq2q: 'Roznica RGB i HEX?', faq2a: 'RGB uzywa dziesietnych, HEX szesnastkowych.', faq3q: 'Dlaczego HEX w CSS?', faq3a: 'Kody HEX sa krotsze i szeroko obslugiwane.', relatedTools: 'Powiazane narzedzia kolorow' },
  sv: { title: 'RGB till HEX Konverterare', description: 'Konvertera RGB-varden till HEX-koder.', r: 'Rod (R)', g: 'Gron (G)', b: 'Bla (B)', hexResult: 'HEX Fargkod', cssRgb: 'CSS rgb()', preview: 'Forhandsvisning', clear: 'Aterstall', intro: 'Konvertera RGB-fargvarden till hexadecimala fargkoder.', faq1q: 'Hur konvertera RGB till HEX?', faq1a: 'Varje RGB-varde konverteras till ett 2-siffrigt hexadecimalt tal.', faq2q: 'Skillnad RGB och HEX?', faq2a: 'RGB anvaender decimaler, HEX hexadecimaler.', faq3q: 'Varfor HEX i CSS?', faq3a: 'HEX-koder ar kortare och brett stoedda.', relatedTools: 'Relaterade fargverktyg' },
  no: { title: 'RGB til HEX Konverter', description: 'Konverter RGB-verdier til HEX-koder.', r: 'Rod (R)', g: 'Gronn (G)', b: 'Bla (B)', hexResult: 'HEX Fargekode', cssRgb: 'CSS rgb()', preview: 'Forhåndsvisning', clear: 'Tilbakestill', intro: 'Konverter RGB-fargeverdier til heksadesimale fargekoder.', faq1q: 'Hvordan konvertere RGB til HEX?', faq1a: 'Hver RGB-verdi konverteres til et 2-sifret heksadesimalt tall.', faq2q: 'Forskjell RGB og HEX?', faq2a: 'RGB bruker desimaler, HEX heksadesimaler.', faq3q: 'Hvorfor HEX i CSS?', faq3a: 'HEX-koder er kortere og bredt stoettet.', relatedTools: 'Relaterte fargeverktoy' },
  id: { title: 'Konverter RGB ke HEX', description: 'Konversi nilai RGB ke kode HEX.', r: 'Merah (R)', g: 'Hijau (G)', b: 'Biru (B)', hexResult: 'Kode Warna HEX', cssRgb: 'CSS rgb()', preview: 'Pratinjau', clear: 'Reset', intro: 'Konversi nilai warna RGB ke kode warna heksadesimal.', faq1q: 'Cara konversi RGB ke HEX?', faq1a: 'Setiap nilai RGB dikonversi menjadi angka heksadesimal 2 digit.', faq2q: 'Perbedaan RGB dan HEX?', faq2a: 'RGB menggunakan desimal, HEX heksadesimal.', faq3q: 'Kenapa HEX di CSS?', faq3a: 'Kode HEX lebih pendek dan didukung luas.', relatedTools: 'Alat warna terkait' },
  th: { title: 'แปลง RGB เป็น HEX', description: 'แปลงค่าสี RGB เป็นรหัสสี HEX', r: 'แดง (R)', g: 'เขียว (G)', b: 'น้ำเงิน (B)', hexResult: 'รหัสสี HEX', cssRgb: 'CSS rgb()', preview: 'ดูตัวอย่าง', clear: 'รีเซ็ต', intro: 'แปลงค่าสี RGB เป็นรหัสสีฐานสิบหก', faq1q: 'แปลง RGB เป็น HEX อย่างไร?', faq1a: 'แต่ละค่า RGB ถูกแปลงเป็นเลขฐานสิบหก 2 หลัก', faq2q: 'RGB กับ HEX ต่างกันอย่างไร?', faq2a: 'RGB ใช้เลขฐานสิบ HEX ใช้เลขฐานสิบหก', faq3q: 'ทำไมใช้ HEX ใน CSS?', faq3a: 'รหัส HEX สั้นกว่าและรองรับกว้างขวาง', relatedTools: 'เครื่องมือสีที่เกี่ยวข้อง' },
};

function toHex(n: number): string { return Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0'); }

export default function RgbToHexConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [r, setR] = useState(66);
  const [g, setG] = useState(133);
  const [b, setB] = useState(244);

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  const cssRgb = `rgb(${r}, ${g}, ${b})`;

  const handleReset = useCallback(() => { setR(66); setG(133); setB(244); }, []);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  const sliderStyle: React.CSSProperties = { width: '100%', marginTop: 4 };
  const inputStyle: React.CSSProperties = { width: 70, padding: '6px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', fontSize: 14, textAlign: 'center' as const };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="rgb-to-hex-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.intro}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
        <div>
          {[
            { label: t.r, value: r, set: setR, color: '#ef4444' },
            { label: t.g, value: g, set: setG, color: '#22c55e' },
            { label: t.b, value: b, set: setB, color: '#3b82f6' },
          ].map(({ label, value, set, color }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color }}>{label}</label>
                <input type="number" min={0} max={255} value={value} onChange={e => set(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))} style={inputStyle} />
              </div>
              <input type="range" min={0} max={255} value={value} onChange={e => set(parseInt(e.target.value))} style={{ ...sliderStyle, accentColor: color }} />
            </div>
          ))}
          <button onClick={handleReset} className="btn btn-secondary">{t.clear}</button>
        </div>
        <div>
          <div style={{ width: '100%', height: 120, borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 16, background: hex }} />
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.hexResult}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <code style={{ fontSize: 24, fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{hex}</code>
            <CopyButton text={hex} />
          </div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.cssRgb}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <code style={{ fontSize: 16, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{cssRgb}</code>
            <CopyButton text={cssRgb} />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{t.relatedTools}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/hex-to-rgb`, label: 'HEX to RGB' },
            { href: `/${lang}/tools/hex-to-rgb-converter`, label: 'HEX to RGB Converter' },
            { href: `/${lang}/tools/rgb-to-hex`, label: 'RGB to HEX' },
            { href: `/${lang}/tools/color-converter`, label: 'Color Converter' },
            { href: `/${lang}/tools/color-picker-online`, label: 'Color Picker' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: 12, color: 'var(--accent-blue)', textDecoration: 'none', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
