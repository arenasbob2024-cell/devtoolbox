'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Beautifier & Formatter',
    description: 'Format and beautify CSS code online. Indent, organize, and clean up your CSS instantly.',
    inputLabel: 'Input CSS',
    outputLabel: 'Formatted CSS',
    formatBtn: 'Beautify CSS',
    minifyBtn: 'Minify CSS',
    clearBtn: 'Clear',
    loadSampleBtn: 'Load Sample',
    placeholder: 'Paste your CSS here...\n\nbody{margin:0;padding:0;font-family:sans-serif;}',
    indentLabel: 'Indent',
    spaces2: '2 spaces',
    spaces4: '4 spaces',
    tab: 'Tab',
    stats: 'Stats',
    lines: 'lines',
    chars: 'chars',
    saved: 'saved',
  },
  fr: {
    title: 'Embellisseur CSS',
    description: 'Formatez et embellissez votre code CSS en ligne.',
    inputLabel: 'CSS en entrée', outputLabel: 'CSS formaté', formatBtn: 'Embellir CSS', minifyBtn: 'Minifier CSS',
    clearBtn: 'Effacer', loadSampleBtn: 'Exemple', placeholder: 'Collez votre CSS ici...',
    indentLabel: 'Indentation', spaces2: '2 espaces', spaces4: '4 espaces', tab: 'Tabulation',
    stats: 'Stats', lines: 'lignes', chars: 'caractères', saved: 'économisés',
  },
  de: {
    title: 'CSS Beautifier & Formatierer',
    description: 'CSS-Code online formatieren und verschönern.',
    inputLabel: 'CSS Eingabe', outputLabel: 'Formatiertes CSS', formatBtn: 'CSS Formatieren', minifyBtn: 'CSS Minifizieren',
    clearBtn: 'Löschen', loadSampleBtn: 'Beispiel laden', placeholder: 'CSS hier einfügen...',
    indentLabel: 'Einrückung', spaces2: '2 Leerzeichen', spaces4: '4 Leerzeichen', tab: 'Tab',
    stats: 'Statistik', lines: 'Zeilen', chars: 'Zeichen', saved: 'gespart',
  },
  it: {
    title: 'Abbellitore CSS',
    description: 'Formatta e abbellisci il codice CSS online.',
    inputLabel: 'CSS input', outputLabel: 'CSS formattato', formatBtn: 'Abbellisci CSS', minifyBtn: 'Minifica CSS',
    clearBtn: 'Cancella', loadSampleBtn: 'Esempio', placeholder: 'Incolla qui il CSS...',
    indentLabel: 'Rientro', spaces2: '2 spazi', spaces4: '4 spazi', tab: 'Tab',
    stats: 'Statistiche', lines: 'righe', chars: 'caratteri', saved: 'salvati',
  },
  es: {
    title: 'Embellecedor de CSS',
    description: 'Formatea y embellece código CSS online.',
    inputLabel: 'CSS de entrada', outputLabel: 'CSS formateado', formatBtn: 'Embellecer CSS', minifyBtn: 'Minificar CSS',
    clearBtn: 'Limpiar', loadSampleBtn: 'Ejemplo', placeholder: 'Pega tu CSS aquí...',
    indentLabel: 'Sangría', spaces2: '2 espacios', spaces4: '4 espacios', tab: 'Tab',
    stats: 'Estadísticas', lines: 'líneas', chars: 'caracteres', saved: 'ahorrados',
  },
  pt: {
    title: 'Embelezador de CSS',
    description: 'Formate e embeleze código CSS online.',
    inputLabel: 'CSS entrada', outputLabel: 'CSS formatado', formatBtn: 'Embelezar CSS', minifyBtn: 'Minificar CSS',
    clearBtn: 'Limpar', loadSampleBtn: 'Exemplo', placeholder: 'Cole seu CSS aqui...',
    indentLabel: 'Indentação', spaces2: '2 espaços', spaces4: '4 espaços', tab: 'Tab',
    stats: 'Estatísticas', lines: 'linhas', chars: 'caracteres', saved: 'economizados',
  },
  nl: {
    title: 'CSS Beautifier', description: 'Formatteer en verfraai CSS-code online.',
    inputLabel: 'CSS invoer', outputLabel: 'Geformatteerde CSS', formatBtn: 'CSS verfraaien', minifyBtn: 'CSS minifiëren',
    clearBtn: 'Wissen', loadSampleBtn: 'Voorbeeld', placeholder: 'Plak hier CSS...',
    indentLabel: 'Inspringing', spaces2: '2 spaties', spaces4: '4 spaties', tab: 'Tab',
    stats: 'Stats', lines: 'regels', chars: 'tekens', saved: 'bespaard',
  },
  pl: {
    title: 'Upiększacz CSS', description: 'Formatuj i upiększaj kod CSS online.',
    inputLabel: 'Wejście CSS', outputLabel: 'Sformatowane CSS', formatBtn: 'Upiększ CSS', minifyBtn: 'Minifikuj CSS',
    clearBtn: 'Wyczyść', loadSampleBtn: 'Przykład', placeholder: 'Wklej CSS tutaj...',
    indentLabel: 'Wcięcie', spaces2: '2 spacje', spaces4: '4 spacje', tab: 'Tab',
    stats: 'Statystyki', lines: 'linie', chars: 'znaki', saved: 'oszczędzone',
  },
  sv: {
    title: 'CSS Beautifier', description: 'Formatera och förbättra CSS-kod online.',
    inputLabel: 'CSS indata', outputLabel: 'Formaterad CSS', formatBtn: 'Förbättra CSS', minifyBtn: 'Minifiera CSS',
    clearBtn: 'Rensa', loadSampleBtn: 'Exempel', placeholder: 'Klistra in CSS här...',
    indentLabel: 'Indrag', spaces2: '2 mellanslag', spaces4: '4 mellanslag', tab: 'Tab',
    stats: 'Stats', lines: 'rader', chars: 'tecken', saved: 'sparade',
  },
  no: {
    title: 'CSS Beautifier', description: 'Formater og forbedre CSS-kode online.',
    inputLabel: 'CSS inndata', outputLabel: 'Formatert CSS', formatBtn: 'Forbedre CSS', minifyBtn: 'Minifiser CSS',
    clearBtn: 'Tøm', loadSampleBtn: 'Eksempel', placeholder: 'Lim inn CSS her...',
    indentLabel: 'Innrykk', spaces2: '2 mellomrom', spaces4: '4 mellomrom', tab: 'Tab',
    stats: 'Stats', lines: 'linjer', chars: 'tegn', saved: 'spart',
  },
  zh: {
    title: 'CSS 美化器', description: '在线格式化和美化 CSS 代码。',
    inputLabel: 'CSS 输入', outputLabel: '格式化后的 CSS', formatBtn: '美化 CSS', minifyBtn: '压缩 CSS',
    clearBtn: '清除', loadSampleBtn: '加载示例', placeholder: '在此粘贴 CSS...',
    indentLabel: '缩进', spaces2: '2空格', spaces4: '4空格', tab: 'Tab',
    stats: '统计', lines: '行', chars: '字符', saved: '已节省',
  },
  ja: {
    title: 'CSS Beautifier', description: 'CSSコードをオンラインでフォーマット・整形。',
    inputLabel: 'CSS 入力', outputLabel: 'フォーマット済み CSS', formatBtn: 'CSS 整形', minifyBtn: 'CSS 圧縮',
    clearBtn: 'クリア', loadSampleBtn: 'サンプル', placeholder: 'CSSをここに貼り付け...',
    indentLabel: 'インデント', spaces2: '2スペース', spaces4: '4スペース', tab: 'タブ',
    stats: '統計', lines: '行', chars: '文字', saved: '節約',
  },
  ko: {
    title: 'CSS Beautifier', description: 'CSS 코드를 온라인으로 포맷하고 정리.',
    inputLabel: 'CSS 입력', outputLabel: '포맷된 CSS', formatBtn: 'CSS 정리', minifyBtn: 'CSS 압축',
    clearBtn: '지우기', loadSampleBtn: '샘플', placeholder: 'CSS를 여기에 붙여넣기...',
    indentLabel: '들여쓰기', spaces2: '2칸', spaces4: '4칸', tab: '탭',
    stats: '통계', lines: '줄', chars: '문자', saved: '절약',
  },
  id: {
    title: 'CSS Beautifier', description: 'Format dan percantik kode CSS online.',
    inputLabel: 'CSS Input', outputLabel: 'CSS Terformat', formatBtn: 'Percantik CSS', minifyBtn: 'Minifikasi CSS',
    clearBtn: 'Hapus', loadSampleBtn: 'Contoh', placeholder: 'Tempel CSS di sini...',
    indentLabel: 'Indentasi', spaces2: '2 spasi', spaces4: '4 spasi', tab: 'Tab',
    stats: 'Statistik', lines: 'baris', chars: 'karakter', saved: 'dihemat',
  },
  th: {
    title: 'CSS Beautifier', description: 'จัดรูปแบบและปรับปรุงโค้ด CSS ออนไลน์',
    inputLabel: 'CSS นำเข้า', outputLabel: 'CSS ที่จัดรูปแบบแล้ว', formatBtn: 'จัดรูปแบบ CSS', minifyBtn: 'บีบอัด CSS',
    clearBtn: 'ล้าง', loadSampleBtn: 'ตัวอย่าง', placeholder: 'วาง CSS ที่นี่...',
    indentLabel: 'การเยื้อง', spaces2: '2 ช่องว่าง', spaces4: '4 ช่องว่าง', tab: 'แท็บ',
    stats: 'สถิติ', lines: 'บรรทัด', chars: 'อักขระ', saved: 'ประหยัด',
  },
};

const SAMPLE_CSS = `body{margin:0;padding:0;font-family:sans-serif;background:#fff;color:#333;}h1,h2,h3{margin-top:0;font-weight:700;}a{color:#0070f3;text-decoration:none;}a:hover{text-decoration:underline;}.container{max-width:1200px;margin:0 auto;padding:0 24px;}`;

function beautifyCSS(css: string, indent: string): string {
  if (!css.trim()) return '';
  let result = '';
  let depth = 0;
  const indentStr = indent === 'tab' ? '\t' : indent === '4' ? '    ' : '  ';

  // Remove existing whitespace normalization
  const tokens = css
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m) // preserve comments
    .replace(/\s*\{\s*/g, ' {\n')
    .replace(/\s*\}\s*/g, '\n}\n')
    .replace(/\s*;\s*/g, ';\n')
    .replace(/\s*,\s*/g, ', ')
    .split('\n');

  for (const rawLine of tokens) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line === '}') {
      depth = Math.max(0, depth - 1);
      result += indentStr.repeat(depth) + '}\n\n';
    } else if (line.endsWith('{')) {
      result += indentStr.repeat(depth) + line + '\n';
      depth++;
    } else {
      result += indentStr.repeat(depth) + line + '\n';
    }
  }
  return result.trim();
}

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*\{\s*/g, '{')
    .replace(/\s*\}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*,\s*/g, ',')
    .trim();
}

export default function CssBeautifier() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState('2');

  const handleBeautify = () => {
    if (!input.trim()) return;
    setOutput(beautifyCSS(input, indent));
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    setOutput(minifyCSS(input));
  };

  const inputLines = input.split('\n').length;
  const outputLines = output.split('\n').length;
  const savedChars = input.length - output.length;

  return (
    <ToolLayout title={t.title} description={t.description} toolId="css-beautifier">
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>{t.indentLabel}:</label>
        {[{ key: '2', label: t.spaces2 }, { key: '4', label: t.spaces4 }, { key: 'tab', label: t.tab }].map(opt => (
          <button key={opt.key} onClick={() => setIndent(opt.key)}
            className={indent === opt.key ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ fontSize: 12, padding: '5px 12px' }}>
            {opt.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleBeautify} className="btn btn-primary">{t.formatBtn}</button>
        <button onClick={handleMinify} className="btn btn-secondary">{t.minifyBtn}</button>
        <button onClick={() => setInput(SAMPLE_CSS)} className="btn btn-secondary">{t.loadSampleBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clearBtn}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder}
            style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 12 }}
          />
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
            {inputLines} {t.lines} · {input.length} {t.chars}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 12 }}
          />
          {output && (
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
              {outputLines} {t.lines} · {output.length} {t.chars}
              {savedChars > 0 && <span style={{ color: 'var(--accent-green)', marginLeft: 8 }}>-{savedChars} {t.saved}</span>}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
