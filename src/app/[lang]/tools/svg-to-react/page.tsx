'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'SVG to React Component', description: 'Convert SVG to React components with JSX syntax, camelCase attributes, and TypeScript support. Runs in your browser.', inputLabel: 'SVG Input', outputLabel: 'React Component', placeholder: '<svg>...</svg>', convert: 'Convert to React', clear: 'Clear', loadSample: 'Load Sample', copyLabel: 'Copy', compName: 'Component Name:', introTitle: 'Free SVG to React Component Converter', introText: 'Paste your SVG code and get a ready-to-use React component. Attributes are automatically converted to camelCase, class becomes className, and xmlns is removed.', howTitle: 'How to Convert SVG to React', step1: 'Paste your SVG markup in the left panel', step2: 'Optionally change the component name', step3: 'Click Convert to React to generate the component', step4: 'Copy the output and use in your React project', featuresTitle: 'Features', feature1: 'SVG attributes converted to camelCase JSX (stroke-width to strokeWidth)', feature2: 'class replaced with className for React', feature3: 'Functional component with TypeScript SVGProps', feature4: 'Props spread for customizable width, height, fill', feature5: 'xmlns removed (not needed in JSX)', faqTitle: 'FAQ', faq1q: 'Why convert SVG to React components?', faq1a: 'React components let you dynamically change SVG colors, sizes via props, more flexible than img tags.', faq2q: 'What attributes are converted?', faq2a: 'stroke-width, stroke-linecap, fill-rule, clip-path, class and more to camelCase equivalents.', faq3q: 'TypeScript support?', faq3a: 'Yes! Generated component includes React.SVGProps type.', faq4q: 'Data sent to server?', faq4a: 'No. All conversion in browser.', faq5q: 'Custom component name?', faq5a: 'Yes, enter preferred name before converting.', relatedTitle: 'Related Tools', errorEmpty: 'Please paste SVG content.', errorInvalid: 'Invalid SVG' },
  zh: { title: 'SVG 转 React 组件', description: '将 SVG 转换为 React 组件。', inputLabel: 'SVG 输入', outputLabel: 'React 组件', placeholder: '<svg>...</svg>', convert: '转换', clear: '清除', loadSample: '示例', copyLabel: '复制', compName: '组件名：', introTitle: '免费 SVG 转 React 转换器', introText: '粘贴 SVG 获取 React 组件。', howTitle: '如何转换', step1: '粘贴 SVG', step2: '改名', step3: '转换', step4: '复制', featuresTitle: '功能', feature1: 'camelCase 转换', feature2: 'className', feature3: 'TypeScript', feature4: 'Props', feature5: 'xmlns 移除', faqTitle: '常见问题', faq1q: '为什么？', faq1a: '动态控制属性。', faq2q: '转换什么？', faq2a: 'camelCase。', faq3q: 'TS？', faq3a: '是。', faq4q: '安全？', faq4a: '浏览器内。', faq5q: '改名？', faq5a: '可以。', relatedTitle: '相关工具', errorEmpty: '请粘贴 SVG。', errorInvalid: 'SVG 无效' },
  ja: { title: 'SVG to React', description: 'SVGをReactコンポーネントに変換。', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: '変換', clear: 'クリア', loadSample: 'サンプル', copyLabel: 'コピー', compName: '名前：', introTitle: '無料SVG to React変換', introText: 'SVGを貼り付けてReactコンポーネント生成。', howTitle: '方法', step1: 'SVG貼付', step2: '名前変更', step3: '変換', step4: 'コピー', featuresTitle: '機能', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns削除', faqTitle: 'FAQ', faq1q: 'なぜ？', faq1a: 'props制御。', faq2q: '何が？', faq2a: 'camelCase。', faq3q: 'TS？', faq3a: 'はい。', faq4q: '安全？', faq4a: 'ブラウザ内。', faq5q: '名前？', faq5a: 'はい。', relatedTitle: '関連', errorEmpty: 'SVGを入力。', errorInvalid: '無効' },
  ko: { title: 'SVG to React', description: 'SVG를 React로.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: '변환', clear: '지우기', loadSample: '샘플', copyLabel: '복사', compName: '이름:', introTitle: '무료 SVG to React', introText: 'SVG 붙여넣기.', howTitle: '방법', step1: 'SVG 붙여넣기', step2: '이름 변경', step3: '변환', step4: '복사', featuresTitle: '기능', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns 제거', faqTitle: 'FAQ', faq1q: '왜?', faq1a: 'props 제어.', faq2q: '무엇?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: '네.', faq4q: '안전?', faq4a: '브라우저.', faq5q: '이름?', faq5a: '네.', relatedTitle: '관련', errorEmpty: 'SVG 입력.', errorInvalid: '무효' },
  fr: { title: 'SVG vers React', description: 'SVG en composant React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Convertir', clear: 'Effacer', loadSample: 'Exemple', copyLabel: 'Copier', compName: 'Nom :', introTitle: 'Convertisseur SVG React', introText: 'Collez SVG pour generer React.', howTitle: 'Comment', step1: 'Collez', step2: 'Nommez', step3: 'Convertir', step4: 'Copier', featuresTitle: 'Fonctions', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Pourquoi?', faq1a: 'Controle dynamique.', faq2q: 'Quoi?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Oui.', faq4q: 'Donnees?', faq4a: 'Navigateur.', faq5q: 'Nom?', faq5a: 'Oui.', relatedTitle: 'Connexes', errorEmpty: 'Collez SVG.', errorInvalid: 'Invalide' },
  de: { title: 'SVG zu React', description: 'SVG zu React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Konvertieren', clear: 'Leeren', loadSample: 'Beispiel', copyLabel: 'Kopieren', compName: 'Name:', introTitle: 'SVG zu React Konverter', introText: 'SVG einfuegen.', howTitle: 'Anleitung', step1: 'SVG einfuegen', step2: 'Name', step3: 'Konvertieren', step4: 'Kopieren', featuresTitle: 'Funktionen', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Warum?', faq1a: 'Props.', faq2q: 'Was?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Ja.', faq4q: 'Daten?', faq4a: 'Browser.', faq5q: 'Name?', faq5a: 'Ja.', relatedTitle: 'Verwandte', errorEmpty: 'SVG einfuegen.', errorInvalid: 'Ungueltig' },
  es: { title: 'SVG a React', description: 'SVG a React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Convertir', clear: 'Limpiar', loadSample: 'Ejemplo', copyLabel: 'Copiar', compName: 'Nombre:', introTitle: 'SVG a React', introText: 'Pega SVG.', howTitle: 'Como', step1: 'Pega', step2: 'Nombre', step3: 'Convertir', step4: 'Copiar', featuresTitle: 'Funciones', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Por que?', faq1a: 'Props.', faq2q: 'Que?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Si.', faq4q: 'Datos?', faq4a: 'Navegador.', faq5q: 'Nombre?', faq5a: 'Si.', relatedTitle: 'Relacionados', errorEmpty: 'Pega SVG.', errorInvalid: 'Invalido' },
  pt: { title: 'SVG para React', description: 'SVG para React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Converter', clear: 'Limpar', loadSample: 'Exemplo', copyLabel: 'Copiar', compName: 'Nome:', introTitle: 'SVG para React', introText: 'Cole SVG.', howTitle: 'Como', step1: 'Cole', step2: 'Nome', step3: 'Converter', step4: 'Copiar', featuresTitle: 'Recursos', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Por que?', faq1a: 'Props.', faq2q: 'O que?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Sim.', faq4q: 'Dados?', faq4a: 'Navegador.', faq5q: 'Nome?', faq5a: 'Sim.', relatedTitle: 'Relacionados', errorEmpty: 'Cole SVG.', errorInvalid: 'Invalido' },
  it: { title: 'SVG in React', description: 'SVG in React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Converti', clear: 'Cancella', loadSample: 'Esempio', copyLabel: 'Copia', compName: 'Nome:', introTitle: 'SVG in React', introText: 'Incolla SVG.', howTitle: 'Come', step1: 'Incolla', step2: 'Nome', step3: 'Converti', step4: 'Copia', featuresTitle: 'Funzioni', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Perche?', faq1a: 'Props.', faq2q: 'Cosa?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Si.', faq4q: 'Dati?', faq4a: 'Browser.', faq5q: 'Nome?', faq5a: 'Si.', relatedTitle: 'Correlati', errorEmpty: 'Incolla SVG.', errorInvalid: 'Non valido' },
  nl: { title: 'SVG naar React', description: 'SVG naar React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Converteren', clear: 'Wissen', loadSample: 'Voorbeeld', copyLabel: 'Kopieren', compName: 'Naam:', introTitle: 'SVG naar React', introText: 'Plak SVG.', howTitle: 'Hoe', step1: 'Plak', step2: 'Naam', step3: 'Converteren', step4: 'Kopieren', featuresTitle: 'Functies', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Waarom?', faq1a: 'Props.', faq2q: 'Wat?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Ja.', faq4q: 'Data?', faq4a: 'Browser.', faq5q: 'Naam?', faq5a: 'Ja.', relatedTitle: 'Gerelateerd', errorEmpty: 'Plak SVG.', errorInvalid: 'Ongeldig' },
  pl: { title: 'SVG na React', description: 'SVG na React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Konwertuj', clear: 'Wyczysc', loadSample: 'Przyklad', copyLabel: 'Kopiuj', compName: 'Nazwa:', introTitle: 'SVG na React', introText: 'Wklej SVG.', howTitle: 'Jak', step1: 'Wklej', step2: 'Nazwa', step3: 'Konwertuj', step4: 'Kopiuj', featuresTitle: 'Funkcje', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Dlaczego?', faq1a: 'Props.', faq2q: 'Co?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Tak.', faq4q: 'Dane?', faq4a: 'Przegladarka.', faq5q: 'Nazwa?', faq5a: 'Tak.', relatedTitle: 'Powiazane', errorEmpty: 'Wklej SVG.', errorInvalid: 'Nieprawidlowy' },
  sv: { title: 'SVG till React', description: 'SVG till React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Konvertera', clear: 'Rensa', loadSample: 'Exempel', copyLabel: 'Kopiera', compName: 'Namn:', introTitle: 'SVG till React', introText: 'Klistra in SVG.', howTitle: 'Hur', step1: 'Klistra', step2: 'Namn', step3: 'Konvertera', step4: 'Kopiera', featuresTitle: 'Funktioner', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Varfor?', faq1a: 'Props.', faq2q: 'Vad?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Ja.', faq4q: 'Data?', faq4a: 'Webblaasare.', faq5q: 'Namn?', faq5a: 'Ja.', relatedTitle: 'Relaterade', errorEmpty: 'Klistra SVG.', errorInvalid: 'Ogiltig' },
  no: { title: 'SVG til React', description: 'SVG til React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Konverter', clear: 'Toom', loadSample: 'Eksempel', copyLabel: 'Kopier', compName: 'Navn:', introTitle: 'SVG til React', introText: 'Lim inn SVG.', howTitle: 'Slik', step1: 'Lim inn', step2: 'Navn', step3: 'Konverter', step4: 'Kopier', featuresTitle: 'Funksjoner', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Hvorfor?', faq1a: 'Props.', faq2q: 'Hva?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Ja.', faq4q: 'Data?', faq4a: 'Nettleser.', faq5q: 'Navn?', faq5a: 'Ja.', relatedTitle: 'Relaterte', errorEmpty: 'Lim inn SVG.', errorInvalid: 'Ugyldig' },
  id: { title: 'SVG ke React', description: 'SVG ke React.', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'Konversi', clear: 'Hapus', loadSample: 'Contoh', copyLabel: 'Salin', compName: 'Nama:', introTitle: 'SVG ke React', introText: 'Tempel SVG.', howTitle: 'Cara', step1: 'Tempel', step2: 'Nama', step3: 'Konversi', step4: 'Salin', featuresTitle: 'Fitur', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'FAQ', faq1q: 'Mengapa?', faq1a: 'Props.', faq2q: 'Apa?', faq2a: 'camelCase.', faq3q: 'TS?', faq3a: 'Ya.', faq4q: 'Data?', faq4a: 'Browser.', faq5q: 'Nama?', faq5a: 'Ya.', relatedTitle: 'Terkait', errorEmpty: 'Tempel SVG.', errorInvalid: 'Tidak valid' },
  th: { title: 'SVG เป็น React', description: 'SVG เป็น React', inputLabel: 'SVG', outputLabel: 'React', placeholder: '<svg>...</svg>', convert: 'แปลง', clear: 'ล้าง', loadSample: 'ตัวอย่าง', copyLabel: 'คัดลอก', compName: 'ชื่อ:', introTitle: 'SVG เป็น React', introText: 'วาง SVG', howTitle: 'วิธี', step1: 'วาง', step2: 'ชื่อ', step3: 'แปลง', step4: 'คัดลอก', featuresTitle: 'คุณสมบัติ', feature1: 'camelCase', feature2: 'className', feature3: 'TS', feature4: 'Props', feature5: 'xmlns', faqTitle: 'คำถาม', faq1q: 'ทำไม?', faq1a: 'Props', faq2q: 'อะไร?', faq2a: 'camelCase', faq3q: 'TS?', faq3a: 'ใช่', faq4q: 'ข้อมูล?', faq4a: 'เบราว์เซอร์', faq5q: 'ชื่อ?', faq5a: 'ได้', relatedTitle: 'เครื่องมือ', errorEmpty: 'วาง SVG', errorInvalid: 'ไม่ถูกต้อง' },
};

const attrMap: Record<string, string> = { 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule', 'clip-path': 'clipPath', 'fill-opacity': 'fillOpacity', 'stroke-opacity': 'strokeOpacity', 'stroke-dasharray': 'strokeDasharray', 'stroke-dashoffset': 'strokeDashoffset', 'font-size': 'fontSize', 'font-family': 'fontFamily', 'font-weight': 'fontWeight', 'text-anchor': 'textAnchor', 'text-decoration': 'textDecoration', 'dominant-baseline': 'dominantBaseline', 'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity', 'pointer-events': 'pointerEvents', 'xlink:href': 'xlinkHref' };

function svgToReact(svg: string, name: string): string {
  let jsx = svg.trim();
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
  jsx = jsx.replace(/\sxmlns="[^"]*"/g, '');
  jsx = jsx.replace(/\sxmlns:xlink="[^"]*"/g, '');
  jsx = jsx.replace(/\sclass="/g, ' className="');
  for (const [from, to] of Object.entries(attrMap)) { if (to) jsx = jsx.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=', 'g'), to + '='); }
  return `import React from 'react';\n\nconst ${name}: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (\n  ${jsx.replace(/<svg/, '<svg {...props}')}\n);\n\nexport default ${name};`;
}

const SAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <circle cx="12" cy="12" r="10"/>\n  <line x1="12" y1="8" x2="12" y2="12"/>\n  <line x1="12" y1="16" x2="12.01" y2="16"/>\n</svg>`;

export default function SvgToReactConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [compName, setCompName] = useState('MyIcon');

  const handleConvert = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    if (!input.trim().includes('<svg')) { setError(t.errorInvalid); setOutput(''); return; }
    try { setOutput(svgToReact(input, compName || 'MyIcon')); } catch(e) { setError(String(e)); setOutput(''); }
  }, [input, compName, t]);

  const handleLoadSample = useCallback(() => { setInput(SAMPLE); setOutput(''); setError(''); }, []);
  const handleClear = useCallback(() => { setInput(''); setOutput(''); setError(''); }, []);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
    { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
    { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
  ]};

  const relatedLinks = [{ href: `/${lang}/tools/svg-to-jsx`, label: 'SVG to JSX' },{ href: `/${lang}/tools/html-to-react`, label: 'HTML to React' },{ href: `/${lang}/tools/html-to-jsx`, label: 'HTML to JSX' }];

  return (
    <ToolLayout title={t.title} description={t.description} toolId="svg-to-react">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleConvert} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
        <button onClick={handleLoadSample} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.loadSample}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 8 }}>{t.compName}</span>
        <input type="text" value={compName} onChange={(e) => setCompName(e.target.value)} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', width: 120 }} />
      </div>
      {error && <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose,#f43f5e)' }}>{'\u2715'} {error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label></div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} spellCheck={false} style={{ flex: 1, minHeight: 360, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label><CopyButton text={output} label={t.copyLabel} /></div>
          <textarea value={output} readOnly spellCheck={false} style={{ flex: 1, minHeight: 360, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6, background: 'var(--bg-card)', opacity: output ? 1 : 0.5, resize: 'vertical' }} />
        </div>
      </div>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li></ol>
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
          {relatedLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
