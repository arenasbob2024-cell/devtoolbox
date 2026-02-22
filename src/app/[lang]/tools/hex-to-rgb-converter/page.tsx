'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HEX to RGB Converter', description: 'Convert HEX color codes to RGB values with real-time preview. Enter a hex code like #FF5733 and get RGB values instantly.',
    hexLabel: 'HEX Color Code', rgbResult: 'RGB Values', cssRgb: 'CSS rgb()', preview: 'Color Preview', convert: 'Convert', clear: 'Clear',
    placeholder: '#FF5733',
    intro: 'Convert hexadecimal color codes to RGB (Red, Green, Blue) values used in CSS, design tools, and programming. HEX codes use 6 hexadecimal digits (e.g., #FF5733) while RGB uses decimal values 0-255 for each channel. This converter supports 3-digit shorthand (#F53) and 6-digit (#FF5533) HEX formats.',
    faq1q: 'How do I convert HEX to RGB?', faq1a: 'Split the 6-digit hex code into 3 pairs (RR, GG, BB) and convert each pair from hexadecimal to decimal. For example, #FF5733: FF = 255 (red), 57 = 87 (green), 33 = 51 (blue), resulting in RGB(255, 87, 51).',
    faq2q: 'What is a 3-digit HEX color?', faq2a: 'A 3-digit hex code like #F53 is a shorthand where each digit is doubled: #F53 becomes #FF5533. This works the same way in CSS and is more compact for colors with repeated hex digits.',
    faq3q: 'Can I use HEX colors with alpha transparency?', faq3a: 'Yes, 8-digit hex codes (e.g., #FF573380) include alpha transparency. The last two digits represent opacity from 00 (fully transparent) to FF (fully opaque). In CSS, you can also use rgba() for transparency.',
    relatedTools: 'Related Color Tools', errorMsg: 'Invalid HEX color code. Use format #RRGGBB or #RGB.',
  },
  zh: { title: 'HEX 转 RGB 转换器', description: '将 HEX 颜色代码转换为 RGB 值。', hexLabel: 'HEX 颜色代码', rgbResult: 'RGB 值', cssRgb: 'CSS rgb()', preview: '颜色预览', convert: '转换', clear: '清除', placeholder: '#FF5733', intro: '将十六进制颜色代码转换为 RGB 值。', faq1q: '如何将 HEX 转换为 RGB？', faq1a: '将 6 位十六进制代码分为 3 对，每对转换为十进制。', faq2q: '什么是 3 位 HEX 颜色？', faq2a: '3 位十六进制代码如 #F53 是简写形式，每位重复：#FF5533。', faq3q: 'HEX 颜色可以带透明度吗？', faq3a: '可以，8 位十六进制代码包含透明度。', relatedTools: '相关颜色工具', errorMsg: '无效的 HEX 颜色代码。' },
  ja: { title: 'HEX to RGB 変換ツール', description: 'HEX カラーコードを RGB 値に変換します。', hexLabel: 'HEX カラーコード', rgbResult: 'RGB 値', cssRgb: 'CSS rgb()', preview: 'カラープレビュー', convert: '変換', clear: 'クリア', placeholder: '#FF5733', intro: '16進数カラーコードを RGB 値に変換します。', faq1q: 'HEX を RGB に変換する方法は？', faq1a: '6桁の16進数コードを3ペアに分割して各ペアを10進数に変換します。', faq2q: '3桁の HEX カラーとは？', faq2a: '#F53 のような3桁コードは各桁を繰り返した短縮形です。', faq3q: 'HEX カラーに透明度を設定できますか？', faq3a: '8桁の16進数コードで透明度を含められます。', relatedTools: '関連カラーツール', errorMsg: '無効な HEX カラーコードです。' },
  ko: { title: 'HEX to RGB 변환기', description: 'HEX 색상 코드를 RGB 값으로 변환합니다.', hexLabel: 'HEX 색상 코드', rgbResult: 'RGB 값', cssRgb: 'CSS rgb()', preview: '색상 미리보기', convert: '변환', clear: '지우기', placeholder: '#FF5733', intro: '16진수 색상 코드를 RGB 값으로 변환합니다.', faq1q: 'HEX를 RGB로 변환하는 방법?', faq1a: '6자리 16진수 코드를 3쌍으로 나누어 각 쌍을 10진수로 변환합니다.', faq2q: '3자리 HEX 색상이란?', faq2a: '#F53과 같은 3자리 코드는 각 자리가 반복된 축약형입니다.', faq3q: 'HEX 색상에 투명도를 설정할 수 있나요?', faq3a: '8자리 16진수 코드로 투명도를 포함할 수 있습니다.', relatedTools: '관련 색상 도구', errorMsg: '잘못된 HEX 색상 코드입니다.' },
  fr: { title: 'Convertisseur HEX vers RGB', description: 'Convertissez les codes HEX en valeurs RGB.', hexLabel: 'Code Couleur HEX', rgbResult: 'Valeurs RGB', cssRgb: 'CSS rgb()', preview: 'Apercu', convert: 'Convertir', clear: 'Effacer', placeholder: '#FF5733', intro: 'Convertissez les codes couleur hexadecimaux en valeurs RGB.', faq1q: 'Comment convertir HEX en RGB ?', faq1a: 'Divisez le code hex en 3 paires et convertissez chacune en decimal.', faq2q: 'Qu\'est-ce qu\'un code HEX a 3 chiffres ?', faq2a: 'Un code comme #F53 est une forme abregee ou chaque chiffre est double.', faq3q: 'Transparence avec HEX ?', faq3a: 'Oui, les codes hex a 8 chiffres incluent la transparence.', relatedTools: 'Outils couleur associes', errorMsg: 'Code HEX invalide.' },
  de: { title: 'HEX zu RGB Konverter', description: 'Konvertieren Sie HEX-Codes in RGB-Werte.', hexLabel: 'HEX Farbcode', rgbResult: 'RGB Werte', cssRgb: 'CSS rgb()', preview: 'Vorschau', convert: 'Konvertieren', clear: 'Loeschen', placeholder: '#FF5733', intro: 'Konvertieren Sie hexadezimale Farbcodes in RGB-Werte.', faq1q: 'Wie konvertiere ich HEX zu RGB?', faq1a: 'Teilen Sie den Hex-Code in 3 Paare auf und konvertieren Sie jedes in Dezimal.', faq2q: 'Was ist ein 3-stelliger HEX-Code?', faq2a: 'Ein Code wie #F53 ist eine Kurzform, bei der jede Ziffer verdoppelt wird.', faq3q: 'HEX mit Transparenz?', faq3a: 'Ja, 8-stellige Hex-Codes enthalten Transparenz.', relatedTools: 'Verwandte Farbtools', errorMsg: 'Ungueltiger HEX-Farbcode.' },
  es: { title: 'Convertidor HEX a RGB', description: 'Convierte codigos HEX a valores RGB.', hexLabel: 'Codigo Color HEX', rgbResult: 'Valores RGB', cssRgb: 'CSS rgb()', preview: 'Vista previa', convert: 'Convertir', clear: 'Limpiar', placeholder: '#FF5733', intro: 'Convierte codigos de color hexadecimales a valores RGB.', faq1q: 'Como convertir HEX a RGB?', faq1a: 'Divide el codigo hex en 3 pares y convierte cada uno a decimal.', faq2q: 'Que es un codigo HEX de 3 digitos?', faq2a: 'Un codigo como #F53 es una forma abreviada donde cada digito se duplica.', faq3q: 'HEX con transparencia?', faq3a: 'Si, los codigos hex de 8 digitos incluyen transparencia.', relatedTools: 'Herramientas de color', errorMsg: 'Codigo HEX invalido.' },
  pt: { title: 'Conversor HEX para RGB', description: 'Converta codigos HEX para valores RGB.', hexLabel: 'Codigo de Cor HEX', rgbResult: 'Valores RGB', cssRgb: 'CSS rgb()', preview: 'Pre-visualizacao', convert: 'Converter', clear: 'Limpar', placeholder: '#FF5733', intro: 'Converta codigos de cor hexadecimais para valores RGB.', faq1q: 'Como converter HEX para RGB?', faq1a: 'Divida o codigo hex em 3 pares e converta cada um para decimal.', faq2q: 'O que e um codigo HEX de 3 digitos?', faq2a: 'Um codigo como #F53 e uma forma abreviada.', faq3q: 'HEX com transparencia?', faq3a: 'Sim, codigos hex de 8 digitos incluem transparencia.', relatedTools: 'Ferramentas de cor', errorMsg: 'Codigo HEX invalido.' },
  it: { title: 'Convertitore HEX in RGB', description: 'Converti codici HEX in valori RGB.', hexLabel: 'Codice Colore HEX', rgbResult: 'Valori RGB', cssRgb: 'CSS rgb()', preview: 'Anteprima', convert: 'Converti', clear: 'Cancella', placeholder: '#FF5733', intro: 'Converti codici colore esadecimali in valori RGB.', faq1q: 'Come convertire HEX in RGB?', faq1a: 'Dividi il codice hex in 3 coppie e converti ognuna in decimale.', faq2q: 'Cos\'e un codice HEX a 3 cifre?', faq2a: 'Un codice come #F53 e una forma abbreviata.', faq3q: 'HEX con trasparenza?', faq3a: 'Si, i codici hex a 8 cifre includono la trasparenza.', relatedTools: 'Strumenti colore', errorMsg: 'Codice HEX non valido.' },
  nl: { title: 'HEX naar RGB Converter', description: 'Converteer HEX-codes naar RGB-waarden.', hexLabel: 'HEX Kleurcode', rgbResult: 'RGB Waarden', cssRgb: 'CSS rgb()', preview: 'Voorbeeld', convert: 'Converteren', clear: 'Wissen', placeholder: '#FF5733', intro: 'Converteer hexadecimale kleurcodes naar RGB-waarden.', faq1q: 'Hoe HEX naar RGB?', faq1a: 'Splits de hex-code in 3 paren en converteer elk naar decimaal.', faq2q: 'Wat is een 3-cijferige HEX-code?', faq2a: 'Een code zoals #F53 is een afkorting.', faq3q: 'HEX met transparantie?', faq3a: 'Ja, 8-cijferige hex-codes bevatten transparantie.', relatedTools: 'Gerelateerde kleurtools', errorMsg: 'Ongeldige HEX-code.' },
  pl: { title: 'Konwerter HEX do RGB', description: 'Konwertuj kody HEX na wartosci RGB.', hexLabel: 'Kod Koloru HEX', rgbResult: 'Wartosci RGB', cssRgb: 'CSS rgb()', preview: 'Podglad', convert: 'Konwertuj', clear: 'Wyczysc', placeholder: '#FF5733', intro: 'Konwertuj szesnastkowe kody kolorow na wartosci RGB.', faq1q: 'Jak konwertowac HEX na RGB?', faq1a: 'Podziel kod hex na 3 pary i konwertuj kazda na dziesietna.', faq2q: 'Co to 3-cyfrowy kod HEX?', faq2a: 'Kod jak #F53 to forma skrocona.', faq3q: 'HEX z przezroczystoscia?', faq3a: 'Tak, 8-cyfrowe kody hex zawieraja przezroczystosc.', relatedTools: 'Powiazane narzedzia kolorow', errorMsg: 'Nieprawidlowy kod HEX.' },
  sv: { title: 'HEX till RGB Konverterare', description: 'Konvertera HEX-koder till RGB-varden.', hexLabel: 'HEX Fargkod', rgbResult: 'RGB Varden', cssRgb: 'CSS rgb()', preview: 'Forhandsvisning', convert: 'Konvertera', clear: 'Rensa', placeholder: '#FF5733', intro: 'Konvertera hexadecimala fargkoder till RGB-varden.', faq1q: 'Hur konvertera HEX till RGB?', faq1a: 'Dela hex-koden i 3 par och konvertera varje till decimal.', faq2q: 'Vad ar en 3-siffrig HEX-kod?', faq2a: 'En kod som #F53 ar en forkortning.', faq3q: 'HEX med transparens?', faq3a: 'Ja, 8-siffriga hex-koder innehaller transparens.', relatedTools: 'Relaterade fargverktyg', errorMsg: 'Ogiltig HEX-kod.' },
  no: { title: 'HEX til RGB Konverter', description: 'Konverter HEX-koder til RGB-verdier.', hexLabel: 'HEX Fargekode', rgbResult: 'RGB Verdier', cssRgb: 'CSS rgb()', preview: 'Forhåndsvisning', convert: 'Konverter', clear: 'Slett', placeholder: '#FF5733', intro: 'Konverter heksadesimale fargekoder til RGB-verdier.', faq1q: 'Hvordan konvertere HEX til RGB?', faq1a: 'Del hex-koden i 3 par og konverter hvert til desimal.', faq2q: 'Hva er en 3-sifret HEX-kode?', faq2a: 'En kode som #F53 er en forkortning.', faq3q: 'HEX med gjennomsiktighet?', faq3a: 'Ja, 8-sifrede hex-koder inkluderer gjennomsiktighet.', relatedTools: 'Relaterte fargeverktoy', errorMsg: 'Ugyldig HEX-kode.' },
  id: { title: 'Konverter HEX ke RGB', description: 'Konversi kode HEX ke nilai RGB.', hexLabel: 'Kode Warna HEX', rgbResult: 'Nilai RGB', cssRgb: 'CSS rgb()', preview: 'Pratinjau', convert: 'Konversi', clear: 'Hapus', placeholder: '#FF5733', intro: 'Konversi kode warna heksadesimal ke nilai RGB.', faq1q: 'Cara konversi HEX ke RGB?', faq1a: 'Bagi kode hex menjadi 3 pasang dan konversi masing-masing ke desimal.', faq2q: 'Apa itu kode HEX 3 digit?', faq2a: 'Kode seperti #F53 adalah bentuk singkat.', faq3q: 'HEX dengan transparansi?', faq3a: 'Ya, kode hex 8 digit menyertakan transparansi.', relatedTools: 'Alat warna terkait', errorMsg: 'Kode HEX tidak valid.' },
  th: { title: 'แปลง HEX เป็น RGB', description: 'แปลงรหัสสี HEX เป็นค่า RGB', hexLabel: 'รหัสสี HEX', rgbResult: 'ค่า RGB', cssRgb: 'CSS rgb()', preview: 'ดูตัวอย่าง', convert: 'แปลง', clear: 'ล้าง', placeholder: '#FF5733', intro: 'แปลงรหัสสีฐานสิบหกเป็นค่า RGB', faq1q: 'แปลง HEX เป็น RGB อย่างไร?', faq1a: 'แบ่งรหัส hex เป็น 3 คู่แล้วแปลงแต่ละคู่เป็นเลขฐานสิบ', faq2q: 'รหัส HEX 3 หลักคืออะไร?', faq2a: 'รหัสเช่น #F53 เป็นรูปแบบย่อ', faq3q: 'HEX มีความโปร่งใสได้ไหม?', faq3a: 'ได้ รหัส hex 8 หลักมีค่าความโปร่งใส', relatedTools: 'เครื่องมือสีที่เกี่ยวข้อง', errorMsg: 'รหัส HEX ไม่ถูกต้อง' },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return { r: parseInt(clean[0] + clean[0], 16), g: parseInt(clean[1] + clean[1], 16), b: parseInt(clean[2] + clean[2], 16) };
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return { r: parseInt(clean.slice(0, 2), 16), g: parseInt(clean.slice(2, 4), 16), b: parseInt(clean.slice(4, 6), 16) };
  }
  return null;
}

export default function HexToRgbConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [hex, setHex] = useState('#FF5733');
  const [error, setError] = useState('');

  const rgb = hexToRgb(hex);

  const handleChange = useCallback((val: string) => {
    setHex(val);
    const clean = val.replace(/^#/, '');
    if (clean.length > 0 && !/^[0-9a-fA-F]{3}$/.test(clean) && !/^[0-9a-fA-F]{6}$/.test(clean)) {
      setError(t.errorMsg);
    } else {
      setError('');
    }
  }, [t.errorMsg]);

  const cssRgb = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
  const rgbText = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '';

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="hex-to-rgb-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.intro}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.hexLabel}</label>
          <input type="text" value={hex} onChange={e => handleChange(e.target.value)} placeholder={t.placeholder} style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', fontSize: 20, fontFamily: 'monospace', fontWeight: 700 }} />
          {error && <div style={{ marginTop: 8, fontSize: 13, color: 'var(--accent-rose)' }}>{error}</div>}
          <button onClick={() => { setHex('#FF5733'); setError(''); }} className="btn btn-secondary" style={{ marginTop: 12 }}>{t.clear}</button>
        </div>
        <div>
          {rgb && (
            <>
              <div style={{ width: '100%', height: 100, borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 16, background: `rgb(${rgb.r},${rgb.g},${rgb.b})` }} />
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.rgbResult}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <code style={{ fontSize: 20, fontWeight: 700, fontFamily: 'monospace' }}>R: {rgb.r} &nbsp; G: {rgb.g} &nbsp; B: {rgb.b}</code>
              </div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.cssRgb}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <code style={{ fontSize: 16, fontFamily: 'monospace' }}>{cssRgb}</code>
                <CopyButton text={cssRgb} />
              </div>
            </>
          )}
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{t.relatedTools}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/rgb-to-hex`, label: 'RGB to HEX' },
            { href: `/${lang}/tools/rgb-to-hex-converter`, label: 'RGB to HEX Converter' },
            { href: `/${lang}/tools/hex-to-rgb`, label: 'HEX to RGB' },
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
