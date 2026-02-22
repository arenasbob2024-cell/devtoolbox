'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'CSS Formatter Online', description: 'Beautify and format minified CSS with proper indentation. Free, private, browser-based.', inputLabel: 'Input (Minified CSS)', outputLabel: 'Output (Formatted CSS)', placeholder: 'Paste minified CSS here...', convert: 'Format CSS', clear: 'Clear', copyLabel: 'Copy', introTitle: 'Free Online CSS Formatter & Beautifier', introText: 'Paste your minified CSS and instantly format it with proper indentation and line breaks. All processing runs locally in your browser.', howTitle: 'How to Use', step1: 'Paste your minified CSS into the input area', step2: 'Click Format CSS to beautify with proper indentation', step3: 'Copy the formatted output for your project', featuresTitle: 'Features', feature1: 'Adds line breaks after { } and ; for readability', feature2: 'Proper 2-space indentation for nested rules', feature3: 'Handles media queries and nested at-rules', feature4: 'Preserves comments in the output', feature5: 'All processing in your browser - no server', faqTitle: 'FAQ', faq1q: 'What does CSS formatting do?', faq1a: 'CSS formatting takes minified CSS and adds back indentation, line breaks, and spacing to make it human-readable.', faq2q: 'Will formatting change how my CSS works?', faq2a: 'No. Formatting only adds whitespace characters. It does not change selectors, properties, or values.', faq3q: 'Does it handle preprocessor syntax?', faq3a: 'This tool formats standard CSS. Preprocessor syntax may partially work.', faq4q: 'Is my CSS sent to a server?', faq4a: 'No. Everything is processed locally in your browser.', faq5q: 'Can I use this for production CSS?', faq5a: 'Yes, but for production you typically want minified CSS for performance.', relatedTitle: 'Related Tools', errorEmpty: 'Please enter CSS to format.' },
  zh: { title: 'CSS 格式化工具', description: '在线美化 CSS。免费。', inputLabel: '输入', outputLabel: '输出', placeholder: '粘贴 CSS...', convert: '格式化', clear: '清除', copyLabel: '复制', introTitle: '免费 CSS 格式化', introText: '粘贴压缩 CSS 即时格式化。', howTitle: '使用方法', step1: '粘贴 CSS', step2: '点击格式化', step3: '复制结果', featuresTitle: '功能', feature1: '添加换行', feature2: '2 空格缩进', feature3: '媒体查询', feature4: '保留注释', feature5: '浏览器内', faqTitle: '常见问题', faq1q: 'CSS 格式化？', faq1a: '添加缩进和换行。', faq2q: '改变功能吗？', faq2a: '不会。', faq3q: '预处理器？', faq3a: '标准 CSS。', faq4q: '安全吗？', faq4a: '浏览器内。', faq5q: '生产环境？', faq5a: '可以但建议压缩。', relatedTitle: '相关工具', errorEmpty: '请输入 CSS。' },
  ja: { title: 'CSS フォーマッター', description: 'CSS 整形。無料。', inputLabel: '入力', outputLabel: '出力', placeholder: 'CSS を貼り付け...', convert: 'フォーマット', clear: 'クリア', copyLabel: 'コピー', introTitle: '無料 CSS フォーマッター', introText: '圧縮 CSS を整形。', howTitle: '使い方', step1: 'CSS 貼り付け', step2: 'フォーマット', step3: 'コピー', featuresTitle: '機能', feature1: '改行追加', feature2: '2スペース', feature3: 'メディアクエリ', feature4: 'コメント保持', feature5: 'ローカル', faqTitle: 'FAQ', faq1q: 'CSS フォーマット？', faq1a: 'インデント追加。', faq2q: '動作変更？', faq2a: 'いいえ。', faq3q: 'プリプロセッサ？', faq3a: '標準 CSS。', faq4q: '安全？', faq4a: 'ブラウザ内。', faq5q: '本番？', faq5a: '可能だが圧縮推奨。', relatedTitle: '関連ツール', errorEmpty: 'CSS を入力。' },
  ko: { title: 'CSS 포맷터', description: 'CSS 포맷. 무료.', inputLabel: '입력', outputLabel: '출력', placeholder: 'CSS 붙여넣기...', convert: '포맷', clear: '지우기', copyLabel: '복사', introTitle: '무료 CSS 포맷터', introText: '압축 CSS 포맷.', howTitle: '사용법', step1: 'CSS 붙여넣기', step2: '포맷 클릭', step3: '복사', featuresTitle: '기능', feature1: '줄바꿈', feature2: '2칸', feature3: '미디어 쿼리', feature4: '주석 유지', feature5: '로컬', faqTitle: 'FAQ', faq1q: 'CSS 포맷?', faq1a: '들여쓰기 추가.', faq2q: '동작 변경?', faq2a: '아니요.', faq3q: '전처리기?', faq3a: '표준 CSS.', faq4q: '안전?', faq4a: '브라우저 내.', faq5q: '프로덕션?', faq5a: '가능하지만 압축 권장.', relatedTitle: '관련 도구', errorEmpty: 'CSS 입력.' },
  fr: { title: 'Formateur CSS', description: 'Formater CSS. Gratuit.', inputLabel: 'Entree', outputLabel: 'Sortie', placeholder: 'Collez CSS...', convert: 'Formater', clear: 'Effacer', copyLabel: 'Copier', introTitle: 'Formateur CSS Gratuit', introText: 'Formatez CSS minifie.', howTitle: 'Utilisation', step1: 'Collez CSS', step2: 'Formater', step3: 'Copiez', featuresTitle: 'Fonctionnalites', feature1: 'Sauts de ligne', feature2: '2 espaces', feature3: 'Media queries', feature4: 'Commentaires', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formatage CSS ?', faq1a: 'Ajoute indentation.', faq2q: 'Comportement ?', faq2a: 'Non.', faq3q: 'Preprocesseurs ?', faq3a: 'CSS standard.', faq4q: 'Securise ?', faq4a: 'Navigateur.', faq5q: 'Production ?', faq5a: 'Oui mais minifier.', relatedTitle: 'Outils connexes', errorEmpty: 'Entrez CSS.' },
  de: { title: 'CSS Formatierer', description: 'CSS formatieren. Kostenlos.', inputLabel: 'Eingabe', outputLabel: 'Ausgabe', placeholder: 'CSS einfuegen...', convert: 'Formatieren', clear: 'Leeren', copyLabel: 'Kopieren', introTitle: 'Kostenloser CSS Formatierer', introText: 'CSS sofort formatieren.', howTitle: 'Anleitung', step1: 'CSS einfuegen', step2: 'Formatieren', step3: 'Kopieren', featuresTitle: 'Funktionen', feature1: 'Zeilenumbrueche', feature2: '2 Leerzeichen', feature3: 'Media Queries', feature4: 'Kommentare', feature5: 'Lokal', faqTitle: 'FAQ', faq1q: 'CSS-Formatierung?', faq1a: 'Einrueckung hinzufuegen.', faq2q: 'Verhalten?', faq2a: 'Nein.', faq3q: 'Praeprozessoren?', faq3a: 'Standard-CSS.', faq4q: 'Sicher?', faq4a: 'Browser.', faq5q: 'Produktion?', faq5a: 'Ja aber Minifizierung.', relatedTitle: 'Verwandte Tools', errorEmpty: 'CSS eingeben.' },
  es: { title: 'Formateador CSS', description: 'Formatear CSS. Gratis.', inputLabel: 'Entrada', outputLabel: 'Salida', placeholder: 'Pega CSS...', convert: 'Formatear', clear: 'Limpiar', copyLabel: 'Copiar', introTitle: 'Formateador CSS Gratis', introText: 'Formatea CSS minificado.', howTitle: 'Uso', step1: 'Pega CSS', step2: 'Formatear', step3: 'Copia', featuresTitle: 'Caracteristicas', feature1: 'Saltos de linea', feature2: '2 espacios', feature3: 'Media queries', feature4: 'Comentarios', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formateo CSS?', faq1a: 'Agrega indentacion.', faq2q: 'Comportamiento?', faq2a: 'No.', faq3q: 'Preprocesadores?', faq3a: 'CSS estandar.', faq4q: 'Seguro?', faq4a: 'Navegador.', faq5q: 'Produccion?', faq5a: 'Si pero minificar.', relatedTitle: 'Herramientas relacionadas', errorEmpty: 'Ingresa CSS.' },
  pt: { title: 'Formatador CSS', description: 'Formatar CSS. Gratis.', inputLabel: 'Entrada', outputLabel: 'Saida', placeholder: 'Cole CSS...', convert: 'Formatar', clear: 'Limpar', copyLabel: 'Copiar', introTitle: 'Formatador CSS Gratis', introText: 'Formate CSS minificado.', howTitle: 'Uso', step1: 'Cole CSS', step2: 'Formatar', step3: 'Copie', featuresTitle: 'Recursos', feature1: 'Quebras de linha', feature2: '2 espacos', feature3: 'Media queries', feature4: 'Comentarios', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formatacao CSS?', faq1a: 'Adiciona indentacao.', faq2q: 'Comportamento?', faq2a: 'Nao.', faq3q: 'Preprocessadores?', faq3a: 'CSS padrao.', faq4q: 'Seguro?', faq4a: 'Navegador.', faq5q: 'Producao?', faq5a: 'Sim mas minificar.', relatedTitle: 'Ferramentas relacionadas', errorEmpty: 'Insira CSS.' },
  it: { title: 'Formattatore CSS', description: 'Formattare CSS. Gratuito.', inputLabel: 'Input', outputLabel: 'Output', placeholder: 'Incolla CSS...', convert: 'Formatta', clear: 'Cancella', copyLabel: 'Copia', introTitle: 'Formattatore CSS Gratuito', introText: 'Formatta CSS minificato.', howTitle: 'Uso', step1: 'Incolla CSS', step2: 'Formatta', step3: 'Copia', featuresTitle: 'Funzionalita', feature1: 'Interruzioni', feature2: '2 spazi', feature3: 'Media queries', feature4: 'Commenti', feature5: 'Locale', faqTitle: 'FAQ', faq1q: 'Formattazione CSS?', faq1a: 'Aggiunge indentazione.', faq2q: 'Comportamento?', faq2a: 'No.', faq3q: 'Preprocessori?', faq3a: 'CSS standard.', faq4q: 'Sicuro?', faq4a: 'Browser.', faq5q: 'Produzione?', faq5a: 'Si ma minificare.', relatedTitle: 'Strumenti correlati', errorEmpty: 'Inserisci CSS.' },
  nl: { title: 'CSS Formatter', description: 'CSS formatteren. Gratis.', inputLabel: 'Invoer', outputLabel: 'Uitvoer', placeholder: 'Plak CSS...', convert: 'Formatteren', clear: 'Wissen', copyLabel: 'Kopieren', introTitle: 'Gratis CSS Formatter', introText: 'Formatteer CSS.', howTitle: 'Gebruik', step1: 'Plak CSS', step2: 'Formatteren', step3: 'Kopieer', featuresTitle: 'Functies', feature1: 'Regelonderbrekingen', feature2: '2 spaties', feature3: 'Media queries', feature4: 'Opmerkingen', feature5: 'Lokaal', faqTitle: 'FAQ', faq1q: 'CSS formatteren?', faq1a: 'Inspringen toevoegen.', faq2q: 'Gedrag?', faq2a: 'Nee.', faq3q: 'Preprocessors?', faq3a: 'Standaard CSS.', faq4q: 'Veilig?', faq4a: 'Browser.', faq5q: 'Productie?', faq5a: 'Ja maar minificatie.', relatedTitle: 'Gerelateerde tools', errorEmpty: 'Voer CSS in.' },
  pl: { title: 'Formatter CSS', description: 'Formatuj CSS. Darmowy.', inputLabel: 'Wejscie', outputLabel: 'Wyjscie', placeholder: 'Wklej CSS...', convert: 'Formatuj', clear: 'Wyczysc', copyLabel: 'Kopiuj', introTitle: 'Darmowy Formatter CSS', introText: 'Sformatuj CSS.', howTitle: 'Uzycie', step1: 'Wklej CSS', step2: 'Formatuj', step3: 'Skopiuj', featuresTitle: 'Funkcje', feature1: 'Nowe linie', feature2: '2 spacje', feature3: 'Media queries', feature4: 'Komentarze', feature5: 'Lokalnie', faqTitle: 'FAQ', faq1q: 'Formatowanie CSS?', faq1a: 'Dodaje wciecia.', faq2q: 'Zachowanie?', faq2a: 'Nie.', faq3q: 'Preprocesory?', faq3a: 'Standardowy CSS.', faq4q: 'Bezpieczne?', faq4a: 'Przegladarka.', faq5q: 'Produkcja?', faq5a: 'Tak ale minifikacja.', relatedTitle: 'Powiazane', errorEmpty: 'Wprowadz CSS.' },
  sv: { title: 'CSS Formaterare', description: 'Formatera CSS. Gratis.', inputLabel: 'Indata', outputLabel: 'Utdata', placeholder: 'Klistra in CSS...', convert: 'Formatera', clear: 'Rensa', copyLabel: 'Kopiera', introTitle: 'Gratis CSS Formaterare', introText: 'Formatera CSS.', howTitle: 'Anvaendning', step1: 'Klistra in CSS', step2: 'Formatera', step3: 'Kopiera', featuresTitle: 'Funktioner', feature1: 'Radbrytningar', feature2: '2 mellanslag', feature3: 'Media queries', feature4: 'Kommentarer', feature5: 'Lokalt', faqTitle: 'FAQ', faq1q: 'CSS-formatering?', faq1a: 'Laegger till indrag.', faq2q: 'Beteende?', faq2a: 'Nej.', faq3q: 'Preprocessorer?', faq3a: 'Standard-CSS.', faq4q: 'Saekert?', faq4a: 'Webblaesare.', faq5q: 'Produktion?', faq5a: 'Ja men minifiera.', relatedTitle: 'Relaterade verktyg', errorEmpty: 'Ange CSS.' },
  no: { title: 'CSS Formatterer', description: 'Formater CSS. Gratis.', inputLabel: 'Inndata', outputLabel: 'Utdata', placeholder: 'Lim inn CSS...', convert: 'Formater', clear: 'Toom', copyLabel: 'Kopier', introTitle: 'Gratis CSS Formatterer', introText: 'Formater CSS.', howTitle: 'Bruk', step1: 'Lim inn CSS', step2: 'Formater', step3: 'Kopier', featuresTitle: 'Funksjoner', feature1: 'Linjeskift', feature2: '2 mellomrom', feature3: 'Media queries', feature4: 'Kommentarer', feature5: 'Lokalt', faqTitle: 'FAQ', faq1q: 'CSS-formatering?', faq1a: 'Legger til innrykk.', faq2q: 'Oppfoersel?', faq2a: 'Nei.', faq3q: 'Preprocessorer?', faq3a: 'Standard CSS.', faq4q: 'Trygt?', faq4a: 'Nettleser.', faq5q: 'Produksjon?', faq5a: 'Ja men minifiser.', relatedTitle: 'Relaterte verktoy', errorEmpty: 'Skriv inn CSS.' },
  id: { title: 'CSS Formatter', description: 'Format CSS. Gratis.', inputLabel: 'Input', outputLabel: 'Output', placeholder: 'Tempel CSS...', convert: 'Format', clear: 'Hapus', copyLabel: 'Salin', introTitle: 'CSS Formatter Gratis', introText: 'Format CSS yang diminifikasi.', howTitle: 'Penggunaan', step1: 'Tempel CSS', step2: 'Format', step3: 'Salin', featuresTitle: 'Fitur', feature1: 'Baris baru', feature2: '2 spasi', feature3: 'Media queries', feature4: 'Komentar', feature5: 'Lokal', faqTitle: 'FAQ', faq1q: 'Format CSS?', faq1a: 'Menambahkan indentasi.', faq2q: 'Perilaku?', faq2a: 'Tidak.', faq3q: 'Preprocessor?', faq3a: 'CSS standar.', faq4q: 'Aman?', faq4a: 'Browser.', faq5q: 'Produksi?', faq5a: 'Ya tapi minifikasi.', relatedTitle: 'Alat terkait', errorEmpty: 'Masukkan CSS.' },
  th: { title: 'CSS Formatter ออนไลน์', description: 'จัดรูปแบบ CSS ฟรี', inputLabel: 'อินพุต', outputLabel: 'เอาต์พุต', placeholder: 'วาง CSS...', convert: 'จัดรูปแบบ', clear: 'ล้าง', copyLabel: 'คัดลอก', introTitle: 'CSS Formatter ฟรี', introText: 'จัดรูปแบบ CSS ที่ย่อแล้ว', howTitle: 'วิธีใช้', step1: 'วาง CSS', step2: 'จัดรูปแบบ', step3: 'คัดลอก', featuresTitle: 'คุณสมบัติ', feature1: 'บรรทัดใหม่', feature2: '2 ช่องว่าง', feature3: 'Media queries', feature4: 'คอมเมนต์', feature5: 'ในเครื่อง', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'การจัดรูปแบบ CSS?', faq1a: 'เพิ่มการเยื้อง', faq2q: 'เปลี่ยนพฤติกรรม?', faq2a: 'ไม่', faq3q: 'Preprocessor?', faq3a: 'CSS มาตรฐาน', faq4q: 'ปลอดภัย?', faq4a: 'เบราว์เซอร์', faq5q: 'โปรดักชัน?', faq5a: 'ได้แต่แนะนำย่อ', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณาป้อน CSS' },
};

function formatCSS(css: string): string {
  let result = '';
  let indent = 0;
  const chars = css.trim();
  let i = 0;
  while (i < chars.length) {
    const ch = chars[i];
    if (ch === '/' && chars[i + 1] === '*') {
      const end = chars.indexOf('*/', i + 2);
      const comment = end === -1 ? chars.slice(i) : chars.slice(i, end + 2);
      result += '  '.repeat(indent) + comment + '\n';
      i = end === -1 ? chars.length : end + 2;
      continue;
    }
    if (ch === '{') {
      result = result.trimEnd() + ' {\n';
      indent++;
      i++;
      continue;
    }
    if (ch === '}') {
      indent = Math.max(0, indent - 1);
      result += '  '.repeat(indent) + '}\n\n';
      i++;
      continue;
    }
    if (ch === ';') {
      result += ';\n';
      i++;
      continue;
    }
    if (ch === '\n' || ch === '\r') { i++; continue; }
    if ((ch === ' ' || ch === '\t') && (result.endsWith('\n') || result === '')) { i++; continue; }
    if (result.endsWith('\n') || result === '') { result += '  '.repeat(indent); }
    result += ch;
    i++;
  }
  return result.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

export default function CssFormatterTool() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    try { setOutput(formatCSS(input)); } catch (e) { setError(String(e)); setOutput(''); }
  }, [input, t]);

  const handleClear = useCallback(() => { setInput(''); setOutput(''); setError(''); }, []);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
    { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
    { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
  ]};

  return (
    <ToolLayout title={t.title} description={t.description} toolId="css-formatter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleFormat} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
      </div>
      {error && <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose,#f43f5e)' }}>{'\u2715'} {error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label></div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} spellCheck={false} style={{ flex: 1, minHeight: 300, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label><CopyButton text={output} label={t.copyLabel} /></div>
          <textarea value={output} readOnly spellCheck={false} style={{ flex: 1, minHeight: 300, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, background: 'var(--bg-card)', opacity: output ? 1 : 0.5, resize: 'vertical' }} />
        </div>
      </div>
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li></ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li></ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[{ q: t.faq1q, a: t.faq1a },{ q: t.faq2q, a: t.faq2a },{ q: t.faq3q, a: t.faq3a },{ q: t.faq4q, a: t.faq4a },{ q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/css-minifier`, label: 'CSS Minifier' },{ href: `/${lang}/tools/css-specificity-calculator`, label: 'CSS Specificity' },{ href: `/${lang}/tools/tailwind-to-css`, label: 'Tailwind to CSS' }].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
