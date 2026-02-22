'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'XML Formatter Online', description: 'Format and prettify minified XML with proper indentation. Free, private, browser-based.', inputLabel: 'Input (Raw XML)', outputLabel: 'Output (Formatted XML)', placeholder: 'Paste minified XML here...', convert: 'Format XML', clear: 'Clear', copyLabel: 'Copy', introTitle: 'Free Online XML Formatter & Prettifier', introText: 'Paste your minified XML and instantly format it with proper indentation and line breaks. Great for SOAP responses, config files, or any XML data. All processing happens locally in your browser.', howTitle: 'How to Use', step1: 'Paste your raw or minified XML into the input area', step2: 'Click Format XML to prettify with 2-space indentation', step3: 'Copy the formatted output for your project', featuresTitle: 'Features', feature1: 'Pretty-print XML with clean 2-space indentation', feature2: 'Validates XML structure using DOMParser', feature3: 'Handles self-closing tags and CDATA sections', feature4: 'Preserves XML declarations and processing instructions', feature5: '100% client-side - no data sent to servers', faqTitle: 'FAQ', faq1q: 'What is XML formatting?', faq1a: 'XML formatting adds whitespace, indentation, and line breaks to compact XML, making the hierarchical structure visible and easier to read.', faq2q: 'Does it validate my XML?', faq2a: 'Yes. The tool uses DOMParser to parse your XML. If the input is not well-formed, you will see a parse error.', faq3q: 'Can it handle large XML files?', faq3a: 'Yes. The tool can handle XML documents up to several megabytes.', faq4q: 'Is my XML data safe?', faq4a: 'Absolutely. All processing happens in your browser. No data is transmitted to any server.', faq5q: 'Does it preserve CDATA?', faq5a: 'Yes. CDATA sections, comments, and processing instructions are preserved.', relatedTitle: 'Related Tools', errorEmpty: 'Please enter XML to format.', errorInvalid: 'Invalid XML' },
  zh: { title: 'XML 在线格式化', description: '在线格式化 XML。免费。', inputLabel: '输入', outputLabel: '输出', placeholder: '粘贴 XML...', convert: '格式化', clear: '清除', copyLabel: '复制', introTitle: '免费 XML 格式化', introText: '粘贴压缩 XML 即时格式化。', howTitle: '使用方法', step1: '粘贴 XML', step2: '点击格式化', step3: '复制结果', featuresTitle: '功能', feature1: '2 空格缩进', feature2: 'DOMParser 验证', feature3: '自闭合标签', feature4: 'XML 声明保留', feature5: '客户端处理', faqTitle: '常见问题', faq1q: 'XML 格式化？', faq1a: '添加缩进使 XML 可读。', faq2q: '验证？', faq2a: '使用 DOMParser。', faq3q: '大文件？', faq3a: '数 MB。', faq4q: '安全？', faq4a: '浏览器内。', faq5q: 'CDATA？', faq5a: '保留。', relatedTitle: '相关工具', errorEmpty: '请输入 XML。', errorInvalid: 'XML 无效' },
  ja: { title: 'XML フォーマッター', description: 'XML 整形。無料。', inputLabel: '入力', outputLabel: '出力', placeholder: 'XML を貼り付け...', convert: 'フォーマット', clear: 'クリア', copyLabel: 'コピー', introTitle: '無料 XML フォーマッター', introText: '圧縮 XML を整形。', howTitle: '使い方', step1: 'XML 貼り付け', step2: 'フォーマット', step3: 'コピー', featuresTitle: '機能', feature1: '2スペース', feature2: 'DOMParser', feature3: '自己終了タグ', feature4: 'XML 宣言', feature5: 'クライアント', faqTitle: 'FAQ', faq1q: 'XML フォーマット？', faq1a: 'インデント追加。', faq2q: '検証？', faq2a: 'DOMParser。', faq3q: '大ファイル？', faq3a: '数MB。', faq4q: '安全？', faq4a: 'ブラウザ内。', faq5q: 'CDATA？', faq5a: '保持。', relatedTitle: '関連ツール', errorEmpty: 'XML を入力。', errorInvalid: '無効な XML' },
  ko: { title: 'XML 포맷터', description: 'XML 포맷. 무료.', inputLabel: '입력', outputLabel: '출력', placeholder: 'XML 붙여넣기...', convert: '포맷', clear: '지우기', copyLabel: '복사', introTitle: '무료 XML 포맷터', introText: '압축 XML 포맷.', howTitle: '사용법', step1: 'XML 붙여넣기', step2: '포맷 클릭', step3: '복사', featuresTitle: '기능', feature1: '2칸', feature2: 'DOMParser', feature3: '자체 닫기 태그', feature4: 'XML 선언', feature5: '클라이언트', faqTitle: 'FAQ', faq1q: 'XML 포맷?', faq1a: '들여쓰기 추가.', faq2q: '검증?', faq2a: 'DOMParser.', faq3q: '큰 파일?', faq3a: '수MB.', faq4q: '안전?', faq4a: '브라우저.', faq5q: 'CDATA?', faq5a: '유지.', relatedTitle: '관련 도구', errorEmpty: 'XML 입력.', errorInvalid: '유효하지 않은 XML' },
  fr: { title: 'Formateur XML', description: 'Formater XML. Gratuit.', inputLabel: 'Entree', outputLabel: 'Sortie', placeholder: 'Collez XML...', convert: 'Formater', clear: 'Effacer', copyLabel: 'Copier', introTitle: 'Formateur XML Gratuit', introText: 'Formatez XML.', howTitle: 'Utilisation', step1: 'Collez XML', step2: 'Formater', step3: 'Copiez', featuresTitle: 'Fonctionnalites', feature1: '2 espaces', feature2: 'DOMParser', feature3: 'Auto-fermantes', feature4: 'Declarations XML', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formatage XML ?', faq1a: 'Ajoute indentation.', faq2q: 'Validation ?', faq2a: 'DOMParser.', faq3q: 'Gros fichiers ?', faq3a: 'Plusieurs Mo.', faq4q: 'Securise ?', faq4a: 'Navigateur.', faq5q: 'CDATA ?', faq5a: 'Preserve.', relatedTitle: 'Outils connexes', errorEmpty: 'Entrez XML.', errorInvalid: 'XML invalide' },
  de: { title: 'XML Formatierer', description: 'XML formatieren. Kostenlos.', inputLabel: 'Eingabe', outputLabel: 'Ausgabe', placeholder: 'XML einfuegen...', convert: 'Formatieren', clear: 'Leeren', copyLabel: 'Kopieren', introTitle: 'Kostenloser XML Formatierer', introText: 'XML formatieren.', howTitle: 'Anleitung', step1: 'XML einfuegen', step2: 'Formatieren', step3: 'Kopieren', featuresTitle: 'Funktionen', feature1: '2 Leerzeichen', feature2: 'DOMParser', feature3: 'Selbstschliessend', feature4: 'XML-Deklarationen', feature5: 'Lokal', faqTitle: 'FAQ', faq1q: 'XML-Formatierung?', faq1a: 'Einrueckung hinzufuegen.', faq2q: 'Validierung?', faq2a: 'DOMParser.', faq3q: 'Grosse Dateien?', faq3a: 'Mehrere MB.', faq4q: 'Sicher?', faq4a: 'Browser.', faq5q: 'CDATA?', faq5a: 'Erhalten.', relatedTitle: 'Verwandte Tools', errorEmpty: 'XML eingeben.', errorInvalid: 'Ungueltiges XML' },
  es: { title: 'Formateador XML', description: 'Formatear XML. Gratis.', inputLabel: 'Entrada', outputLabel: 'Salida', placeholder: 'Pega XML...', convert: 'Formatear', clear: 'Limpiar', copyLabel: 'Copiar', introTitle: 'Formateador XML Gratis', introText: 'Formatea XML.', howTitle: 'Uso', step1: 'Pega XML', step2: 'Formatear', step3: 'Copia', featuresTitle: 'Caracteristicas', feature1: '2 espacios', feature2: 'DOMParser', feature3: 'Auto-cerradas', feature4: 'Declaraciones XML', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formateo XML?', faq1a: 'Agrega indentacion.', faq2q: 'Validacion?', faq2a: 'DOMParser.', faq3q: 'Archivos grandes?', faq3a: 'Varios MB.', faq4q: 'Seguro?', faq4a: 'Navegador.', faq5q: 'CDATA?', faq5a: 'Preservado.', relatedTitle: 'Herramientas relacionadas', errorEmpty: 'Ingresa XML.', errorInvalid: 'XML invalido' },
  pt: { title: 'Formatador XML', description: 'Formatar XML. Gratis.', inputLabel: 'Entrada', outputLabel: 'Saida', placeholder: 'Cole XML...', convert: 'Formatar', clear: 'Limpar', copyLabel: 'Copiar', introTitle: 'Formatador XML Gratis', introText: 'Formate XML.', howTitle: 'Uso', step1: 'Cole XML', step2: 'Formatar', step3: 'Copie', featuresTitle: 'Recursos', feature1: '2 espacos', feature2: 'DOMParser', feature3: 'Auto-fechantes', feature4: 'Declaracoes XML', feature5: 'Local', faqTitle: 'FAQ', faq1q: 'Formatacao XML?', faq1a: 'Adiciona indentacao.', faq2q: 'Validacao?', faq2a: 'DOMParser.', faq3q: 'Arquivos grandes?', faq3a: 'Varios MB.', faq4q: 'Seguro?', faq4a: 'Navegador.', faq5q: 'CDATA?', faq5a: 'Preservado.', relatedTitle: 'Ferramentas relacionadas', errorEmpty: 'Insira XML.', errorInvalid: 'XML invalido' },
  it: { title: 'Formattatore XML', description: 'Formattare XML. Gratuito.', inputLabel: 'Input', outputLabel: 'Output', placeholder: 'Incolla XML...', convert: 'Formatta', clear: 'Cancella', copyLabel: 'Copia', introTitle: 'Formattatore XML Gratuito', introText: 'Formatta XML.', howTitle: 'Uso', step1: 'Incolla XML', step2: 'Formatta', step3: 'Copia', featuresTitle: 'Funzionalita', feature1: '2 spazi', feature2: 'DOMParser', feature3: 'Auto-chiudenti', feature4: 'Dichiarazioni XML', feature5: 'Locale', faqTitle: 'FAQ', faq1q: 'Formattazione XML?', faq1a: 'Aggiunge indentazione.', faq2q: 'Validazione?', faq2a: 'DOMParser.', faq3q: 'File grandi?', faq3a: 'Diversi MB.', faq4q: 'Sicuro?', faq4a: 'Browser.', faq5q: 'CDATA?', faq5a: 'Preservato.', relatedTitle: 'Strumenti correlati', errorEmpty: 'Inserisci XML.', errorInvalid: 'XML non valido' },
  nl: { title: 'XML Formatter', description: 'XML formatteren. Gratis.', inputLabel: 'Invoer', outputLabel: 'Uitvoer', placeholder: 'Plak XML...', convert: 'Formatteren', clear: 'Wissen', copyLabel: 'Kopieren', introTitle: 'Gratis XML Formatter', introText: 'Formatteer XML.', howTitle: 'Gebruik', step1: 'Plak XML', step2: 'Formatteren', step3: 'Kopieer', featuresTitle: 'Functies', feature1: '2 spaties', feature2: 'DOMParser', feature3: 'Zelfsluitend', feature4: 'XML-declaraties', feature5: 'Lokaal', faqTitle: 'FAQ', faq1q: 'XML formatteren?', faq1a: 'Inspringen toevoegen.', faq2q: 'Validatie?', faq2a: 'DOMParser.', faq3q: 'Grote bestanden?', faq3a: 'Meerdere MB.', faq4q: 'Veilig?', faq4a: 'Browser.', faq5q: 'CDATA?', faq5a: 'Behouden.', relatedTitle: 'Gerelateerde tools', errorEmpty: 'Voer XML in.', errorInvalid: 'Ongeldig XML' },
  pl: { title: 'Formatter XML', description: 'Formatuj XML. Darmowy.', inputLabel: 'Wejscie', outputLabel: 'Wyjscie', placeholder: 'Wklej XML...', convert: 'Formatuj', clear: 'Wyczysc', copyLabel: 'Kopiuj', introTitle: 'Darmowy Formatter XML', introText: 'Sformatuj XML.', howTitle: 'Uzycie', step1: 'Wklej XML', step2: 'Formatuj', step3: 'Skopiuj', featuresTitle: 'Funkcje', feature1: '2 spacje', feature2: 'DOMParser', feature3: 'Samozamykajace', feature4: 'Deklaracje XML', feature5: 'Lokalnie', faqTitle: 'FAQ', faq1q: 'Formatowanie XML?', faq1a: 'Dodaje wciecia.', faq2q: 'Walidacja?', faq2a: 'DOMParser.', faq3q: 'Duze pliki?', faq3a: 'Kilka MB.', faq4q: 'Bezpieczne?', faq4a: 'Przegladarka.', faq5q: 'CDATA?', faq5a: 'Zachowane.', relatedTitle: 'Powiazane', errorEmpty: 'Wprowadz XML.', errorInvalid: 'Nieprawidlowy XML' },
  sv: { title: 'XML Formaterare', description: 'Formatera XML. Gratis.', inputLabel: 'Indata', outputLabel: 'Utdata', placeholder: 'Klistra in XML...', convert: 'Formatera', clear: 'Rensa', copyLabel: 'Kopiera', introTitle: 'Gratis XML Formaterare', introText: 'Formatera XML.', howTitle: 'Anvaendning', step1: 'Klistra in XML', step2: 'Formatera', step3: 'Kopiera', featuresTitle: 'Funktioner', feature1: '2 mellanslag', feature2: 'DOMParser', feature3: 'Sjaelvstaengande', feature4: 'XML-deklarationer', feature5: 'Lokalt', faqTitle: 'FAQ', faq1q: 'XML-formatering?', faq1a: 'Laegger till indrag.', faq2q: 'Validering?', faq2a: 'DOMParser.', faq3q: 'Stora filer?', faq3a: 'Flera MB.', faq4q: 'Saekert?', faq4a: 'Webblaesare.', faq5q: 'CDATA?', faq5a: 'Bevarat.', relatedTitle: 'Relaterade verktyg', errorEmpty: 'Ange XML.', errorInvalid: 'Ogiltigt XML' },
  no: { title: 'XML Formatterer', description: 'Formater XML. Gratis.', inputLabel: 'Inndata', outputLabel: 'Utdata', placeholder: 'Lim inn XML...', convert: 'Formater', clear: 'Toom', copyLabel: 'Kopier', introTitle: 'Gratis XML Formatterer', introText: 'Formater XML.', howTitle: 'Bruk', step1: 'Lim inn XML', step2: 'Formater', step3: 'Kopier', featuresTitle: 'Funksjoner', feature1: '2 mellomrom', feature2: 'DOMParser', feature3: 'Selvlukkende', feature4: 'XML-deklarasjoner', feature5: 'Lokalt', faqTitle: 'FAQ', faq1q: 'XML-formatering?', faq1a: 'Legger til innrykk.', faq2q: 'Validering?', faq2a: 'DOMParser.', faq3q: 'Store filer?', faq3a: 'Flere MB.', faq4q: 'Trygt?', faq4a: 'Nettleser.', faq5q: 'CDATA?', faq5a: 'Bevart.', relatedTitle: 'Relaterte verktoy', errorEmpty: 'Skriv inn XML.', errorInvalid: 'Ugyldig XML' },
  id: { title: 'XML Formatter', description: 'Format XML. Gratis.', inputLabel: 'Input', outputLabel: 'Output', placeholder: 'Tempel XML...', convert: 'Format', clear: 'Hapus', copyLabel: 'Salin', introTitle: 'XML Formatter Gratis', introText: 'Format XML.', howTitle: 'Penggunaan', step1: 'Tempel XML', step2: 'Format', step3: 'Salin', featuresTitle: 'Fitur', feature1: '2 spasi', feature2: 'DOMParser', feature3: 'Self-closing', feature4: 'Deklarasi XML', feature5: 'Lokal', faqTitle: 'FAQ', faq1q: 'Format XML?', faq1a: 'Menambahkan indentasi.', faq2q: 'Validasi?', faq2a: 'DOMParser.', faq3q: 'File besar?', faq3a: 'Beberapa MB.', faq4q: 'Aman?', faq4a: 'Browser.', faq5q: 'CDATA?', faq5a: 'Dipertahankan.', relatedTitle: 'Alat terkait', errorEmpty: 'Masukkan XML.', errorInvalid: 'XML tidak valid' },
  th: { title: 'XML Formatter ออนไลน์', description: 'จัดรูปแบบ XML ฟรี', inputLabel: 'อินพุต', outputLabel: 'เอาต์พุต', placeholder: 'วาง XML...', convert: 'จัดรูปแบบ', clear: 'ล้าง', copyLabel: 'คัดลอก', introTitle: 'XML Formatter ฟรี', introText: 'จัดรูปแบบ XML ทันที', howTitle: 'วิธีใช้', step1: 'วาง XML', step2: 'จัดรูปแบบ', step3: 'คัดลอก', featuresTitle: 'คุณสมบัติ', feature1: '2 ช่องว่าง', feature2: 'DOMParser', feature3: 'แท็กปิดตัวเอง', feature4: 'การประกาศ XML', feature5: 'ในเครื่อง', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'การจัดรูปแบบ XML?', faq1a: 'เพิ่มการเยื้อง', faq2q: 'ตรวจสอบ?', faq2a: 'DOMParser', faq3q: 'ไฟล์ใหญ่?', faq3a: 'หลาย MB', faq4q: 'ปลอดภัย?', faq4a: 'เบราว์เซอร์', faq5q: 'CDATA?', faq5a: 'รักษาไว้', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณาป้อน XML', errorInvalid: 'XML ไม่ถูกต้อง' },
};

function formatXML(xml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml.trim(), 'application/xml');
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    throw new Error(errorNode.textContent || 'XML parse error');
  }
  let indent = 0;
  const lines: string[] = [];
  function processNode(node: Node) {
    if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
      const pi = node as ProcessingInstruction;
      lines.push('  '.repeat(indent) + `<?${pi.target} ${pi.data}?>`);
    } else if (node.nodeType === Node.COMMENT_NODE) {
      lines.push('  '.repeat(indent) + `<!--${node.nodeValue}-->`);
    } else if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.nodeValue || '').trim();
      if (text) lines.push('  '.repeat(indent) + text);
    } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
      lines.push('  '.repeat(indent) + `<![CDATA[${node.nodeValue}]]>`);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      let attrs = '';
      for (let i = 0; i < el.attributes.length; i++) {
        const a = el.attributes[i];
        attrs += ` ${a.name}="${a.value}"`;
      }
      if (el.childNodes.length === 0) {
        lines.push('  '.repeat(indent) + `<${el.tagName}${attrs}/>`);
      } else if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        const text = (el.childNodes[0].nodeValue || '').trim();
        lines.push('  '.repeat(indent) + `<${el.tagName}${attrs}>${text}</${el.tagName}>`);
      } else {
        lines.push('  '.repeat(indent) + `<${el.tagName}${attrs}>`);
        indent++;
        for (let i = 0; i < el.childNodes.length; i++) { processNode(el.childNodes[i]); }
        indent--;
        lines.push('  '.repeat(indent) + `</${el.tagName}>`);
      }
    }
  }
  for (let i = 0; i < doc.childNodes.length; i++) { processNode(doc.childNodes[i]); }
  let result = lines.join('\n');
  if (xml.trim().startsWith('<?xml') && !result.startsWith('<?xml')) {
    result = '<?xml version="1.0" encoding="UTF-8"?>\n' + result;
  }
  return result;
}

export default function XmlFormatterOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    try { setOutput(formatXML(input)); } catch (e) { setError(`${t.errorInvalid}: ${e instanceof Error ? e.message : String(e)}`); setOutput(''); }
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
    <ToolLayout title={t.title} description={t.description} toolId="xml-formatter-online">
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
          {[{ href: `/${lang}/tools/xml-formatter`, label: 'XML Formatter' },{ href: `/${lang}/tools/json-to-xml`, label: 'JSON to XML' },{ href: `/${lang}/tools/html-to-jsx`, label: 'HTML to JSX' }].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
