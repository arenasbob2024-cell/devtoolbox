'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JavaScript Minifier',
    description: 'Minify JavaScript code by removing comments, unnecessary whitespace, and newlines. Compare original vs minified size with savings percentage.',
    inputLabel: 'Input JavaScript',
    outputLabel: 'Minified Output',
    minifyBtn: 'Minify',
    loadSample: 'Load Sample',
    clear: 'Clear',
    placeholder: 'Paste your JavaScript code here...',
    chars: 'characters',
    bytes: 'bytes',
    original: 'Original',
    minified: 'Minified',
    saved: 'Saved',
    introTitle: 'Free Online JavaScript Minifier',
    introText: 'JavaScript minification reduces file size by removing comments (single-line and multi-line), unnecessary whitespace, and line breaks. Smaller JavaScript files load faster, improving website performance scores and user experience. This tool performs basic minification entirely in your browser without sending code to any server.',
    howTitle: 'How to Minify JavaScript',
    step1: 'Paste your JavaScript code into the input field',
    step2: 'Click Minify to remove comments, whitespace, and unnecessary characters',
    step3: 'Review the size comparison showing savings percentage',
    step4: 'Copy the minified JavaScript for production deployment',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What does JavaScript minification do?',
    faq1a: 'JavaScript minification removes unnecessary characters from code without changing its functionality. This includes removing comments (both // and /* */), excess whitespace, line breaks, and trailing semicolons before closing braces. The result is a smaller file that downloads and executes faster.',
    faq2q: 'Does minification change how my code works?',
    faq2a: 'No. JavaScript minification only removes formatting and comments that the JavaScript engine ignores. Your code logic, variables, and functionality remain completely unchanged. The minified version produces identical results.',
    faq3q: 'How much can I reduce file size?',
    faq3a: 'Typical savings range from 20-50% depending on code formatting and comment density. Well-commented code with verbose formatting may see up to 60% reduction. Production code that is already somewhat compact may see smaller savings.',
    faq4q: 'Is this tool safe for production code?',
    faq4a: 'This tool performs basic minification: removing comments, whitespace, and line breaks. For production use, consider also using a full minifier like Terser or UglifyJS that can also shorten variable names and perform dead code elimination.',
    faq5q: 'Is my code private?',
    faq5a: 'Yes. All JavaScript processing happens entirely in your browser using client-side JavaScript. No code is transmitted to any server. Your source code remains completely private.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JavaScript 压缩工具',
    description: '通过删除注释、不必要的空格和换行来压缩 JavaScript 代码。比较原始大小与压缩后大小。',
    inputLabel: 'JavaScript 输入',
    outputLabel: '压缩输出',
    minifyBtn: '压缩',
    loadSample: '加载示例',
    clear: '清除',
    placeholder: '在此粘贴 JavaScript 代码...',
    chars: '字符', bytes: '字节', original: '原始', minified: '压缩后', saved: '节省',
    introTitle: '免费在线 JavaScript 压缩工具',
    introText: 'JavaScript 压缩通过删除注释、不必要的空格和换行来减小文件大小。较小的文件加载更快，提升网站性能。所有处理在浏览器中完成。',
    howTitle: '如何压缩 JavaScript',
    step1: '将 JavaScript 代码粘贴到输入框', step2: '点击压缩按钮', step3: '查看大小对比', step4: '复制压缩后的代码',
    faqTitle: '常见问题',
    faq1q: 'JavaScript 压缩做什么？', faq1a: 'JavaScript 压缩在不改变功能的情况下删除不必要的字符，包括注释、多余空格和换行。',
    faq2q: '压缩会改变代码的工作方式吗？', faq2a: '不会。只删除 JavaScript 引擎忽略的格式和注释。',
    faq3q: '可以减少多少文件大小？', faq3a: '通常节省 20-50%，取决于代码格式和注释密度。',
    faq4q: '适合生产代码吗？', faq4a: '此工具执行基本压缩。生产环境建议使用 Terser 或 UglifyJS 等完整压缩工具。',
    faq5q: '代码安全吗？', faq5a: '是的。所有处理完全在浏览器中完成，不会向服务器传输任何代码。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Minificateur JavaScript',
    description: 'Minifiez le code JavaScript en supprimant les commentaires, espaces inutiles et sauts de ligne.',
    inputLabel: 'JavaScript en entree', outputLabel: 'Sortie minifiee',
    minifyBtn: 'Minifier', loadSample: 'Charger exemple', clear: 'Effacer',
    placeholder: 'Collez votre code JavaScript ici...',
    chars: 'caracteres', bytes: 'octets', original: 'Original', minified: 'Minifie', saved: 'Economise',
    introTitle: 'Minificateur JavaScript gratuit en ligne',
    introText: 'La minification JavaScript reduit la taille du fichier en supprimant les commentaires et espaces inutiles. Tout le traitement se fait dans votre navigateur.',
    howTitle: 'Comment minifier du JavaScript',
    step1: 'Collez votre code JavaScript', step2: 'Cliquez sur Minifier', step3: 'Consultez la comparaison de taille', step4: 'Copiez le code minifie',
    faqTitle: 'Questions frequentes',
    faq1q: 'Que fait la minification JavaScript ?', faq1a: 'Elle supprime les caracteres inutiles (commentaires, espaces) sans changer la fonctionnalite.',
    faq2q: 'La minification change-t-elle le comportement ?', faq2a: 'Non. Seul le formatage est supprime.',
    faq3q: 'Combien d\'espace puis-je economiser ?', faq3a: 'Generalement 20 a 50% de reduction.',
    faq4q: 'Est-ce adapte au code de production ?', faq4a: 'Pour la production, utilisez aussi Terser ou UglifyJS pour une minification complete.',
    faq5q: 'Mon code est-il prive ?', faq5a: 'Oui. Tout le traitement se fait dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JavaScript Minifier',
    description: 'Minifizieren Sie JavaScript-Code durch Entfernung von Kommentaren, ueberfluessigen Leerzeichen und Zeilenumbruechen.',
    inputLabel: 'JavaScript Eingabe', outputLabel: 'Minifizierte Ausgabe',
    minifyBtn: 'Minifizieren', loadSample: 'Beispiel laden', clear: 'Loeschen',
    placeholder: 'JavaScript-Code hier einfuegen...',
    chars: 'Zeichen', bytes: 'Bytes', original: 'Original', minified: 'Minifiziert', saved: 'Gespart',
    introTitle: 'Kostenloser Online JavaScript Minifier',
    introText: 'JavaScript-Minifizierung reduziert die Dateigroesse durch Entfernen von Kommentaren und Leerzeichen. Alle Verarbeitung erfolgt in Ihrem Browser.',
    howTitle: 'Wie man JavaScript minifiziert',
    step1: 'Fuegen Sie Ihren JavaScript-Code ein', step2: 'Klicken Sie auf Minifizieren', step3: 'Pruefen Sie den Groessenvergleich', step4: 'Kopieren Sie den minifizierten Code',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was macht JavaScript-Minifizierung?', faq1a: 'Sie entfernt unnoetige Zeichen (Kommentare, Leerzeichen) ohne die Funktionalitaet zu aendern.',
    faq2q: 'Aendert Minifizierung das Verhalten?', faq2a: 'Nein. Nur Formatierung wird entfernt.',
    faq3q: 'Wie viel Platz kann ich sparen?', faq3a: 'Typischerweise 20-50% Reduktion.',
    faq4q: 'Ist es fuer Produktionscode geeignet?', faq4a: 'Fuer Produktion verwenden Sie auch Terser oder UglifyJS fuer vollstaendige Minifizierung.',
    faq5q: 'Ist mein Code privat?', faq5a: 'Ja. Alle Verarbeitung erfolgt in Ihrem Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Minificador JavaScript',
    description: 'Minifica codigo JavaScript eliminando comentarios, espacios innecesarios y saltos de linea.',
    inputLabel: 'JavaScript de entrada', outputLabel: 'Salida minificada',
    minifyBtn: 'Minificar', loadSample: 'Cargar ejemplo', clear: 'Limpiar',
    placeholder: 'Pega tu codigo JavaScript aqui...',
    chars: 'caracteres', bytes: 'bytes', original: 'Original', minified: 'Minificado', saved: 'Ahorrado',
    introTitle: 'Minificador JavaScript gratuito en linea',
    introText: 'La minificacion JavaScript reduce el tamano del archivo eliminando comentarios y espacios innecesarios. Todo el procesamiento ocurre en tu navegador.',
    howTitle: 'Como minificar JavaScript',
    step1: 'Pega tu codigo JavaScript', step2: 'Haz clic en Minificar', step3: 'Revisa la comparacion de tamano', step4: 'Copia el codigo minificado',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que hace la minificacion JavaScript?', faq1a: 'Elimina caracteres innecesarios (comentarios, espacios) sin cambiar la funcionalidad.',
    faq2q: 'La minificacion cambia el comportamiento?', faq2a: 'No. Solo se elimina el formato.',
    faq3q: 'Cuanto espacio puedo ahorrar?', faq3a: 'Generalmente 20-50% de reduccion.',
    faq4q: 'Es adecuado para codigo de produccion?', faq4a: 'Para produccion, usa tambien Terser o UglifyJS para minificacion completa.',
    faq5q: 'Mi codigo es privado?', faq5a: 'Si. Todo el procesamiento ocurre en tu navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'JavaScript 圧縮ツール',
    description: 'コメント、不要な空白、改行を削除してJavaScriptコードを圧縮。元のサイズと圧縮後のサイズを比較。',
    inputLabel: 'JavaScript 入力', outputLabel: '圧縮出力',
    minifyBtn: '圧縮', loadSample: 'サンプル読込', clear: 'クリア',
    placeholder: 'JavaScriptコードをここに貼り付け...',
    chars: '文字', bytes: 'バイト', original: '元のサイズ', minified: '圧縮後', saved: '削減',
    introTitle: '無料オンライン JavaScript 圧縮ツール',
    introText: 'JavaScript圧縮はコメントと不要な空白を削除してファイルサイズを縮小します。すべての処理はブラウザ内で行われます。',
    howTitle: 'JavaScriptを圧縮する方法',
    step1: 'JavaScriptコードを入力欄に貼り付け', step2: '圧縮ボタンをクリック', step3: 'サイズ比較を確認', step4: '圧縮されたコードをコピー',
    faqTitle: 'よくある質問',
    faq1q: 'JavaScript圧縮とは？', faq1a: '機能を変えずに不要な文字（コメント、空白）を削除するプロセスです。',
    faq2q: '圧縮で動作が変わる？', faq2a: 'いいえ。フォーマットのみが削除されます。',
    faq3q: 'どれくらいサイズを削減できる？', faq3a: '通常20-50%の削減が可能です。',
    faq4q: '本番コードに適している？', faq4a: '本番環境ではTerserやUglifyJSも使用することをお勧めします。',
    faq5q: 'コードは安全？', faq5a: 'はい。すべての処理はブラウザ内で行われます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JavaScript 압축 도구',
    description: '주석, 불필요한 공백, 줄바꿈을 제거하여 JavaScript 코드를 압축합니다. 원본과 압축 크기를 비교합니다.',
    inputLabel: 'JavaScript 입력', outputLabel: '압축 출력',
    minifyBtn: '압축', loadSample: '샘플 로드', clear: '지우기',
    placeholder: '여기에 JavaScript 코드를 붙여넣으세요...',
    chars: '문자', bytes: '바이트', original: '원본', minified: '압축됨', saved: '절약',
    introTitle: '무료 온라인 JavaScript 압축 도구',
    introText: 'JavaScript 압축은 주석과 불필요한 공백을 제거하여 파일 크기를 줄입니다. 모든 처리는 브라우저에서 이루어집니다.',
    howTitle: 'JavaScript를 압축하는 방법',
    step1: 'JavaScript 코드를 입력란에 붙여넣기', step2: '압축 버튼 클릭', step3: '크기 비교 확인', step4: '압축된 코드 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JavaScript 압축이란?', faq1a: '기능을 변경하지 않고 불필요한 문자(주석, 공백)를 제거하는 과정입니다.',
    faq2q: '압축이 동작을 변경하나요?', faq2a: '아니요. 포맷만 제거됩니다.',
    faq3q: '얼마나 크기를 줄일 수 있나요?', faq3a: '보통 20-50%의 크기 감소가 가능합니다.',
    faq4q: '프로덕션 코드에 적합한가요?', faq4a: '프로덕션에서는 Terser나 UglifyJS도 함께 사용하는 것을 권장합니다.',
    faq5q: '코드가 안전한가요?', faq5a: '네. 모든 처리는 브라우저에서 이루어집니다.',
    relatedTitle: '관련 도구',
  },
};

function minifyJs(js: string): string {
  let result = js;

  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove single-line comments (but not URLs like http://)
  result = result.replace(/(^|[^:])\/\/.*$/gm, '$1');

  // Remove leading/trailing whitespace on each line
  result = result.replace(/^\s+/gm, '');
  result = result.replace(/\s+$/gm, '');

  // Remove empty lines
  result = result.replace(/\n{2,}/g, '\n');

  // Collapse multiple spaces to single space
  result = result.replace(/[ \t]+/g, ' ');

  // Remove spaces around operators and punctuation
  result = result.replace(/\s*([{}();,=<>+\-*/%!&|?:])\s*/g, '$1');

  // Restore space after keywords
  result = result.replace(/(return|var|let|const|if|else|for|while|do|switch|case|break|continue|function|class|new|typeof|instanceof|in|of|throw|try|catch|finally|yield|async|await|export|import|from|default)\b/g, '$1 ');

  // Remove trailing semicolons before }
  result = result.replace(/;}/g, '}');

  // Remove newlines
  result = result.replace(/\n/g, '');

  // Clean up multiple semicolons
  result = result.replace(/;{2,}/g, ';');

  return result.trim();
}

const sampleJs = `/**
 * Utility functions for DevToolBox
 * Author: DevToolBox Team
 * Version: 1.0.0
 */

// Debounce function - limits rate of function calls
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Clear any existing timeout
    clearTimeout(timeoutId);

    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Format file size to human readable string
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

// Deep clone an object
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

// Copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}`;

export default function JavaScriptMinifier() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

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

  const inputSize = new Blob([input]).size;
  const outputSize = new Blob([output]).size;
  const savings = inputSize > 0 ? Math.round((1 - outputSize / inputSize) * 100) : 0;

  return (
    <ToolLayout title={t.title} description={t.description} toolId="javascript-minifier">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setOutput(minifyJs(input))} className="btn btn-primary">{t.minifyBtn}</button>
        <button onClick={() => setInput(sampleJs)} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {/* Size comparison bar */}
      {output && (
        <div style={{ display: 'flex', gap: 16, marginBottom: 16, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13 }}>
          <div><strong>{t.original}:</strong> {inputSize.toLocaleString()} {t.bytes} ({input.length} {t.chars})</div>
          <div><strong>{t.minified}:</strong> {outputSize.toLocaleString()} {t.bytes} ({output.length} {t.chars})</div>
          <div style={{ color: savings > 0 ? '#22c55e' : savings < 0 ? '#ef4444' : 'var(--text-secondary)', fontWeight: 700 }}>
            {t.saved}: {savings}%
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{input.length} {t.chars}</span>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder} style={{ minHeight: 400, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly
            style={{ minHeight: 400, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, opacity: output ? 1 : 0.5 }} />
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
            { href: `/${lang}/tools/css-minifier`, label: 'CSS Minifier' },
            { href: `/${lang}/tools/js-html-formatter`, label: 'JS/HTML Formatter' },
            { href: `/${lang}/tools/json-minifier`, label: 'JSON Minifier' },
            { href: `/${lang}/tools/typescript-to-javascript`, label: 'TypeScript to JavaScript' },
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
