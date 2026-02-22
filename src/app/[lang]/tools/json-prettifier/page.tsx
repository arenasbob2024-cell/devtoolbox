'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'JSON Prettifier Online', description: 'Format and prettify minified JSON with proper indentation. Free, private, runs entirely in your browser.', inputLabel: 'Input (Raw JSON)', outputLabel: 'Output (Prettified)', placeholder: 'Paste minified or raw JSON here...', convert: 'Prettify', clear: 'Clear', copyLabel: 'Copy', introTitle: 'Free Online JSON Prettifier & Formatter', introText: 'Paste your minified or compact JSON and instantly format it with proper indentation and line breaks. Perfect for debugging APIs, reading config files, or making JSON human-readable. All processing happens locally in your browser.', howTitle: 'How to Use', step1: 'Paste your raw or minified JSON into the input area', step2: 'Click the Prettify button to format with 2-space indentation', step3: 'Copy the formatted output to use anywhere', featuresTitle: 'Features', feature1: 'Format JSON with clean 2-space indentation', feature2: 'Validates JSON structure and reports errors', feature3: 'Handles deeply nested objects and arrays', feature4: 'Supports Unicode, emoji, and special characters', feature5: 'No data sent to servers - 100% client-side', faqTitle: 'FAQ', faq1q: 'What is JSON prettifying?', faq1a: 'JSON prettifying adds whitespace, indentation, and line breaks to compact JSON, making it human-readable while preserving the data structure.', faq2q: 'Does this tool validate my JSON?', faq2a: 'Yes. If your input contains invalid JSON, the tool will display a detailed error message indicating what went wrong.', faq3q: 'What indentation does the prettifier use?', faq3a: 'The tool uses 2-space indentation by default, the most common standard for JSON files.', faq4q: 'Is my data safe?', faq4a: 'Absolutely. All processing happens entirely in your browser using JSON.parse and JSON.stringify. No data is ever sent to any server.', faq5q: 'Can it handle large JSON files?', faq5a: 'Yes. The tool can handle JSON files up to several megabytes. Performance depends on your browser memory.', relatedTitle: 'Related Tools', errorEmpty: 'Please enter JSON to prettify.', errorInvalid: 'Invalid JSON' },
  zh: { title: 'JSON 美化工具', description: '在线格式化和美化压缩的 JSON。免费、私密。', inputLabel: '输入', outputLabel: '输出', placeholder: '粘贴 JSON...', convert: '美化', clear: '清除', copyLabel: '复制', introTitle: '免费 JSON 美化器', introText: '粘贴压缩 JSON，即时格式化。', howTitle: '使用方法', step1: '粘贴 JSON', step2: '点击美化', step3: '复制结果', featuresTitle: '功能', feature1: '2 空格缩进', feature2: 'JSON 验证', feature3: '深层嵌套', feature4: 'Unicode 支持', feature5: '客户端处理', faqTitle: '常见问题', faq1q: '什么是 JSON 美化？', faq1a: '添加缩进使 JSON 可读。', faq2q: '会验证吗？', faq2a: '是的。', faq3q: '什么缩进？', faq3a: '2 空格。', faq4q: '数据安全吗？', faq4a: '浏览器内处理。', faq5q: '大文件？', faq5a: '支持数 MB。', relatedTitle: '相关工具', errorEmpty: '请输入 JSON。', errorInvalid: 'JSON 无效' },
  ja: { title: 'JSON 整形ツール', description: 'JSON を整形。無料、ブラウザ内。', inputLabel: '入力', outputLabel: '出力', placeholder: 'JSON を貼り付け...', convert: '整形', clear: 'クリア', copyLabel: 'コピー', introTitle: '無料 JSON 整形', introText: '圧縮 JSON を整形。', howTitle: '使い方', step1: 'JSON 貼り付け', step2: '整形クリック', step3: 'コピー', featuresTitle: '機能', feature1: '2スペース', feature2: '検証', feature3: 'ネスト対応', feature4: 'Unicode', feature5: 'ローカル', faqTitle: 'FAQ', faq1q: 'JSON 整形とは？', faq1a: 'インデント追加。', faq2q: '検証？', faq2a: 'はい。', faq3q: 'インデント？', faq3a: '2スペース。', faq4q: '安全？', faq4a: 'ブラウザ内。', faq5q: '大きなファイル？', faq5a: '数MB対応。', relatedTitle: '関連ツール', errorEmpty: 'JSON を入力。', errorInvalid: '無効な JSON' },
  ko: { title: 'JSON 정리 도구', description: 'JSON 포맷. 무료.', inputLabel: '입력', outputLabel: '출력', placeholder: 'JSON 붙여넣기...', convert: '정리', clear: '지우기', copyLabel: '복사', introTitle: '무료 JSON 정리', introText: '압축 JSON 포맷.', howTitle: '사용법', step1: 'JSON 붙여넣기', step2: '정리 클릭', step3: '복사', featuresTitle: '기능', feature1: '2칸 들여쓰기', feature2: '검증', feature3: '중첩 지원', feature4: 'Unicode', feature5: '로컬', faqTitle: 'FAQ', faq1q: 'JSON 정리란?', faq1a: '들여쓰기 추가.', faq2q: '검증?', faq2a: '네.', faq3q: '들여쓰기?', faq3a: '2칸.', faq4q: '안전?', faq4a: '브라우저 내.', faq5q: '큰 파일?', faq5a: '수MB 지원.', relatedTitle: '관련 도구', errorEmpty: 'JSON 입력.', errorInvalid: '유효하지 않은 JSON' },
  fr: { title: 'Formateur JSON', description: 'Formater JSON. Gratuit.', inputLabel: 'Entree', outputLabel: 'Sortie', placeholder: 'Collez JSON...', convert: 'Formater', clear: 'Effacer', copyLabel: 'Copier', introTitle: 'Formateur JSON Gratuit', introText: 'Formatez JSON instantanement.', howTitle: 'Utilisation', step1: 'Collez JSON', step2: 'Cliquez Formater', step3: 'Copiez', featuresTitle: 'Fonctionnalites', feature1: '2 espaces', feature2: 'Validation', feature3: 'Imbrication', feature4: 'Unicode', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formatage JSON ?', faq1a: 'Ajoute indentation.', faq2q: 'Validation ?', faq2a: 'Oui.', faq3q: 'Indentation ?', faq3a: '2 espaces.', faq4q: 'Securise ?', faq4a: 'Dans le navigateur.', faq5q: 'Gros fichiers ?', faq5a: 'Plusieurs Mo.', relatedTitle: 'Outils connexes', errorEmpty: 'Entrez JSON.', errorInvalid: 'JSON invalide' },
  de: { title: 'JSON Formatierer', description: 'JSON formatieren. Kostenlos.', inputLabel: 'Eingabe', outputLabel: 'Ausgabe', placeholder: 'JSON einfuegen...', convert: 'Formatieren', clear: 'Leeren', copyLabel: 'Kopieren', introTitle: 'Kostenloser JSON Formatierer', introText: 'JSON sofort formatieren.', howTitle: 'Anleitung', step1: 'JSON einfuegen', step2: 'Formatieren', step3: 'Kopieren', featuresTitle: 'Funktionen', feature1: '2 Leerzeichen', feature2: 'Validierung', feature3: 'Verschachtelung', feature4: 'Unicode', feature5: 'Lokal', faqTitle: 'FAQ', faq1q: 'JSON-Formatierung?', faq1a: 'Einrueckung hinzufuegen.', faq2q: 'Validierung?', faq2a: 'Ja.', faq3q: 'Einrueckung?', faq3a: '2 Leerzeichen.', faq4q: 'Sicher?', faq4a: 'Im Browser.', faq5q: 'Grosse Dateien?', faq5a: 'Mehrere MB.', relatedTitle: 'Verwandte Tools', errorEmpty: 'JSON eingeben.', errorInvalid: 'Ungueltiges JSON' },
  es: { title: 'Formateador JSON', description: 'Formatear JSON. Gratis.', inputLabel: 'Entrada', outputLabel: 'Salida', placeholder: 'Pega JSON...', convert: 'Formatear', clear: 'Limpiar', copyLabel: 'Copiar', introTitle: 'Formateador JSON Gratis', introText: 'Formatea JSON al instante.', howTitle: 'Uso', step1: 'Pega JSON', step2: 'Clic Formatear', step3: 'Copia', featuresTitle: 'Caracteristicas', feature1: '2 espacios', feature2: 'Validacion', feature3: 'Anidacion', feature4: 'Unicode', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formateo JSON?', faq1a: 'Agrega indentacion.', faq2q: 'Validacion?', faq2a: 'Si.', faq3q: 'Indentacion?', faq3a: '2 espacios.', faq4q: 'Seguro?', faq4a: 'En el navegador.', faq5q: 'Archivos grandes?', faq5a: 'Varios MB.', relatedTitle: 'Herramientas relacionadas', errorEmpty: 'Ingresa JSON.', errorInvalid: 'JSON invalido' },
  pt: { title: 'Formatador JSON', description: 'Formatar JSON. Gratis.', inputLabel: 'Entrada', outputLabel: 'Saida', placeholder: 'Cole JSON...', convert: 'Formatar', clear: 'Limpar', copyLabel: 'Copiar', introTitle: 'Formatador JSON Gratis', introText: 'Formate JSON instantaneamente.', howTitle: 'Uso', step1: 'Cole JSON', step2: 'Clique Formatar', step3: 'Copie', featuresTitle: 'Recursos', feature1: '2 espacos', feature2: 'Validacao', feature3: 'Aninhamento', feature4: 'Unicode', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formatacao JSON?', faq1a: 'Adiciona indentacao.', faq2q: 'Validacao?', faq2a: 'Sim.', faq3q: 'Indentacao?', faq3a: '2 espacos.', faq4q: 'Seguro?', faq4a: 'No navegador.', faq5q: 'Arquivos grandes?', faq5a: 'Varios MB.', relatedTitle: 'Ferramentas relacionadas', errorEmpty: 'Insira JSON.', errorInvalid: 'JSON invalido' },
  it: { title: 'Formattatore JSON', description: 'Formattare JSON. Gratuito.', inputLabel: 'Input', outputLabel: 'Output', placeholder: 'Incolla JSON...', convert: 'Formatta', clear: 'Cancella', copyLabel: 'Copia', introTitle: 'Formattatore JSON Gratuito', introText: 'Formatta JSON istantaneamente.', howTitle: 'Uso', step1: 'Incolla JSON', step2: 'Clicca Formatta', step3: 'Copia', featuresTitle: 'Funzionalita', feature1: '2 spazi', feature2: 'Validazione', feature3: 'Nidificazione', feature4: 'Unicode', feature5: 'Locale', faqTitle: 'FAQ', faq1q: 'Formattazione JSON?', faq1a: 'Aggiunge indentazione.', faq2q: 'Validazione?', faq2a: 'Si.', faq3q: 'Indentazione?', faq3a: '2 spazi.', faq4q: 'Sicuro?', faq4a: 'Nel browser.', faq5q: 'File grandi?', faq5a: 'Diversi MB.', relatedTitle: 'Strumenti correlati', errorEmpty: 'Inserisci JSON.', errorInvalid: 'JSON non valido' },
  nl: { title: 'JSON Formatter', description: 'JSON formatteren. Gratis.', inputLabel: 'Invoer', outputLabel: 'Uitvoer', placeholder: 'Plak JSON...', convert: 'Formatteren', clear: 'Wissen', copyLabel: 'Kopieren', introTitle: 'Gratis JSON Formatter', introText: 'Formatteer JSON direct.', howTitle: 'Gebruik', step1: 'Plak JSON', step2: 'Klik Formatteren', step3: 'Kopieer', featuresTitle: 'Functies', feature1: '2 spaties', feature2: 'Validatie', feature3: 'Nesting', feature4: 'Unicode', feature5: 'Lokaal', faqTitle: 'FAQ', faq1q: 'JSON formatteren?', faq1a: 'Inspringen toevoegen.', faq2q: 'Validatie?', faq2a: 'Ja.', faq3q: 'Inspringen?', faq3a: '2 spaties.', faq4q: 'Veilig?', faq4a: 'In de browser.', faq5q: 'Grote bestanden?', faq5a: 'Meerdere MB.', relatedTitle: 'Gerelateerde tools', errorEmpty: 'Voer JSON in.', errorInvalid: 'Ongeldig JSON' },
  pl: { title: 'Formatter JSON', description: 'Formatuj JSON. Darmowy.', inputLabel: 'Wejscie', outputLabel: 'Wyjscie', placeholder: 'Wklej JSON...', convert: 'Formatuj', clear: 'Wyczysc', copyLabel: 'Kopiuj', introTitle: 'Darmowy Formatter JSON', introText: 'Sformatuj JSON natychmiast.', howTitle: 'Uzycie', step1: 'Wklej JSON', step2: 'Kliknij Formatuj', step3: 'Skopiuj', featuresTitle: 'Funkcje', feature1: '2 spacje', feature2: 'Walidacja', feature3: 'Zagniezdz.', feature4: 'Unicode', feature5: 'Lokalnie', faqTitle: 'FAQ', faq1q: 'Formatowanie JSON?', faq1a: 'Dodaje wciecia.', faq2q: 'Walidacja?', faq2a: 'Tak.', faq3q: 'Wciecia?', faq3a: '2 spacje.', faq4q: 'Bezpieczne?', faq4a: 'W przegladarce.', faq5q: 'Duze pliki?', faq5a: 'Kilka MB.', relatedTitle: 'Powiazane', errorEmpty: 'Wprowadz JSON.', errorInvalid: 'Nieprawidlowy JSON' },
  sv: { title: 'JSON Formaterare', description: 'Formatera JSON. Gratis.', inputLabel: 'Indata', outputLabel: 'Utdata', placeholder: 'Klistra in JSON...', convert: 'Formatera', clear: 'Rensa', copyLabel: 'Kopiera', introTitle: 'Gratis JSON Formaterare', introText: 'Formatera JSON direkt.', howTitle: 'Anvaendning', step1: 'Klistra in JSON', step2: 'Klicka Formatera', step3: 'Kopiera', featuresTitle: 'Funktioner', feature1: '2 mellanslag', feature2: 'Validering', feature3: 'Naestling', feature4: 'Unicode', feature5: 'Lokalt', faqTitle: 'FAQ', faq1q: 'JSON-formatering?', faq1a: 'Laegger till indrag.', faq2q: 'Validering?', faq2a: 'Ja.', faq3q: 'Indrag?', faq3a: '2 mellanslag.', faq4q: 'Saekert?', faq4a: 'I webblaesaren.', faq5q: 'Stora filer?', faq5a: 'Flera MB.', relatedTitle: 'Relaterade verktyg', errorEmpty: 'Ange JSON.', errorInvalid: 'Ogiltigt JSON' },
  no: { title: 'JSON Formatterer', description: 'Formater JSON. Gratis.', inputLabel: 'Inndata', outputLabel: 'Utdata', placeholder: 'Lim inn JSON...', convert: 'Formater', clear: 'Toom', copyLabel: 'Kopier', introTitle: 'Gratis JSON Formatterer', introText: 'Formater JSON direkte.', howTitle: 'Bruk', step1: 'Lim inn JSON', step2: 'Klikk Formater', step3: 'Kopier', featuresTitle: 'Funksjoner', feature1: '2 mellomrom', feature2: 'Validering', feature3: 'Nesting', feature4: 'Unicode', feature5: 'Lokalt', faqTitle: 'FAQ', faq1q: 'JSON-formatering?', faq1a: 'Legger til innrykk.', faq2q: 'Validering?', faq2a: 'Ja.', faq3q: 'Innrykk?', faq3a: '2 mellomrom.', faq4q: 'Trygt?', faq4a: 'I nettleseren.', faq5q: 'Store filer?', faq5a: 'Flere MB.', relatedTitle: 'Relaterte verktoy', errorEmpty: 'Skriv inn JSON.', errorInvalid: 'Ugyldig JSON' },
  id: { title: 'JSON Prettifier', description: 'Format JSON. Gratis.', inputLabel: 'Input', outputLabel: 'Output', placeholder: 'Tempel JSON...', convert: 'Percantik', clear: 'Hapus', copyLabel: 'Salin', introTitle: 'JSON Prettifier Gratis', introText: 'Format JSON secara instan.', howTitle: 'Penggunaan', step1: 'Tempel JSON', step2: 'Klik Percantik', step3: 'Salin', featuresTitle: 'Fitur', feature1: '2 spasi', feature2: 'Validasi', feature3: 'Bertingkat', feature4: 'Unicode', feature5: 'Lokal', faqTitle: 'FAQ', faq1q: 'JSON prettifying?', faq1a: 'Menambahkan indentasi.', faq2q: 'Validasi?', faq2a: 'Ya.', faq3q: 'Indentasi?', faq3a: '2 spasi.', faq4q: 'Aman?', faq4a: 'Di browser.', faq5q: 'File besar?', faq5a: 'Beberapa MB.', relatedTitle: 'Alat terkait', errorEmpty: 'Masukkan JSON.', errorInvalid: 'JSON tidak valid' },
  th: { title: 'JSON Prettifier ออนไลน์', description: 'จัดรูปแบบ JSON ฟรี', inputLabel: 'อินพุต', outputLabel: 'เอาต์พุต', placeholder: 'วาง JSON...', convert: 'จัดรูปแบบ', clear: 'ล้าง', copyLabel: 'คัดลอก', introTitle: 'JSON Prettifier ฟรี', introText: 'จัดรูปแบบ JSON ทันที', howTitle: 'วิธีใช้', step1: 'วาง JSON', step2: 'คลิกจัดรูปแบบ', step3: 'คัดลอก', featuresTitle: 'คุณสมบัติ', feature1: '2 ช่องว่าง', feature2: 'ตรวจสอบ', feature3: 'ซ้อน', feature4: 'Unicode', feature5: 'ในเครื่อง', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'JSON prettifying?', faq1a: 'เพิ่มการเยื้อง', faq2q: 'ตรวจสอบ?', faq2a: 'ใช่', faq3q: 'การเยื้อง?', faq3a: '2 ช่องว่าง', faq4q: 'ปลอดภัย?', faq4a: 'ในเบราว์เซอร์', faq5q: 'ไฟล์ใหญ่?', faq5a: 'หลาย MB', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณาป้อน JSON', errorInvalid: 'JSON ไม่ถูกต้อง' },
};

export default function JsonPrettifier() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handlePrettify = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError(`${t.errorInvalid}: ${e instanceof Error ? e.message : String(e)}`);
      setOutput('');
    }
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
    <ToolLayout title={t.title} description={t.description} toolId="json-prettifier">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handlePrettify} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
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
          {[{ href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },{ href: `/${lang}/tools/json-minify-online`, label: 'JSON Minifier' },{ href: `/${lang}/tools/json-validator`, label: 'JSON Validator' }].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
