'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Minifier / Beautifier',
    description: 'Minify or beautify CSS code for production or readability. Remove comments, whitespace, and unnecessary characters with size comparison.',
    inputLabel: 'Input CSS',
    outputLabel: 'Output',
    minifyBtn: 'Minify',
    beautifyBtn: 'Beautify',
    loadSample: 'Load Sample',
    clear: 'Clear',
    placeholder: 'Paste your CSS code here...',
    chars: 'characters',
    bytes: 'bytes',
    original: 'Original',
    minified: 'Minified',
    saved: 'Saved',
    introTitle: 'Free Online CSS Minifier',
    introText: 'CSS minification removes unnecessary characters like whitespace, comments, and trailing semicolons to reduce file size. Smaller CSS files load faster, improving website performance and user experience. This tool also offers beautify mode to make minified CSS readable again. All processing happens locally in your browser.',
    howTitle: 'How to Minify CSS',
    step1: 'Paste your CSS code into the input field',
    step2: 'Click Minify to remove whitespace, comments, and unnecessary characters',
    step3: 'Review the size comparison showing original vs minified size',
    step4: 'Copy the minified CSS for production use',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is CSS minification?',
    faq1a: 'CSS minification is the process of removing unnecessary characters from CSS code without changing its functionality. This includes removing whitespace, line breaks, comments, and redundant semicolons. The result is a smaller file that loads faster in web browsers.',
    faq2q: 'Does minification change how my CSS works?',
    faq2a: 'No. CSS minification only removes formatting characters that browsers ignore. The minified CSS produces identical visual results. All selectors, properties, and values remain unchanged.',
    faq3q: 'How much file size can I save?',
    faq3a: 'Typically 20-40% reduction depending on the original formatting and amount of comments. Heavily commented files with verbose formatting may see even greater savings, sometimes up to 60%.',
    faq4q: 'What does the beautifier do?',
    faq4a: 'The beautifier does the opposite of minification. It adds proper indentation, line breaks, and spacing to compressed CSS, making it human-readable for debugging and development. This is useful when working with minified third-party CSS.',
    faq5q: 'Is my CSS data safe?',
    faq5a: 'Yes. All CSS processing happens entirely in your browser using JavaScript. No data is sent to any server. Your CSS code remains completely private.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS 压缩 / 美化工具',
    description: '压缩或美化 CSS 代码。删除注释、空格和不必要的字符，显示大小对比。',
    inputLabel: '输入 CSS',
    outputLabel: '输出',
    minifyBtn: '压缩',
    beautifyBtn: '美化',
    loadSample: '加载示例',
    clear: '清除',
    placeholder: '在此粘贴 CSS 代码...',
    chars: '字符',
    bytes: '字节',
    original: '原始',
    minified: '压缩后',
    saved: '节省',
    introTitle: '免费在线 CSS 压缩工具',
    introText: 'CSS 压缩删除不必要的字符如空格、注释和多余分号以减小文件大小。较小的 CSS 文件加载更快，改善网站性能和用户体验。所有处理在浏览器中完成。',
    howTitle: '如何压缩 CSS',
    step1: '将 CSS 代码粘贴到输入框',
    step2: '点击压缩按钮删除空格、注释和不必要的字符',
    step3: '查看显示原始大小与压缩后大小的对比',
    step4: '复制压缩后的 CSS 用于生产环境',
    faqTitle: '常见问题',
    faq1q: '什么是 CSS 压缩？',
    faq1a: 'CSS 压缩是在不改变功能的情况下从 CSS 代码中删除不必要字符的过程。包括删除空格、换行符、注释和多余分号。',
    faq2q: '压缩会改变 CSS 的工作方式吗？',
    faq2a: '不会。CSS 压缩只删除浏览器忽略的格式字符。压缩后的 CSS 产生完全相同的视觉效果。',
    faq3q: '可以节省多少文件大小？',
    faq3a: '通常减少 20-40%，取决于原始格式和注释量。注释多的文件可能节省更多，有时高达 60%。',
    faq4q: '美化功能做什么？',
    faq4a: '美化功能与压缩相反。它为压缩的 CSS 添加适当的缩进、换行和间距，使其对人类可读。',
    faq5q: 'CSS 数据安全吗？',
    faq5a: '是的。所有 CSS 处理完全在浏览器中使用 JavaScript 完成，不会向任何服务器发送数据。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Minificateur / Embellisseur CSS',
    description: 'Minifiez ou embellissez le code CSS. Supprimez les commentaires, espaces et caracteres inutiles.',
    inputLabel: 'CSS en entree', outputLabel: 'Sortie',
    minifyBtn: 'Minifier', beautifyBtn: 'Embellir', loadSample: 'Charger exemple', clear: 'Effacer',
    placeholder: 'Collez votre code CSS ici...', chars: 'caracteres', bytes: 'octets',
    original: 'Original', minified: 'Minifie', saved: 'Economise',
    introTitle: 'Minificateur CSS gratuit en ligne',
    introText: 'La minification CSS supprime les caracteres inutiles pour reduire la taille du fichier. Tout le traitement se fait dans votre navigateur.',
    howTitle: 'Comment minifier du CSS',
    step1: 'Collez votre code CSS', step2: 'Cliquez sur Minifier', step3: 'Consultez la comparaison de taille', step4: 'Copiez le CSS minifie',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que la minification CSS ?', faq1a: 'La minification CSS supprime les espaces, commentaires et caracteres superflus sans changer le fonctionnement.',
    faq2q: 'La minification change-t-elle le comportement ?', faq2a: 'Non. Elle supprime uniquement le formatage que les navigateurs ignorent.',
    faq3q: 'Combien d\'espace puis-je economiser ?', faq3a: 'Generalement 20 a 40% de reduction selon le formatage original.',
    faq4q: 'Que fait l\'embellisseur ?', faq4a: 'L\'embellisseur ajoute l\'indentation et les espaces pour rendre le CSS lisible.',
    faq5q: 'Mes donnees sont-elles en securite ?', faq5a: 'Oui. Tout le traitement se fait dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'CSS Minifier / Beautifier',
    description: 'Minifizieren oder verschoenern Sie CSS-Code. Entfernen Sie Kommentare, Leerzeichen und unnoetige Zeichen.',
    inputLabel: 'CSS Eingabe', outputLabel: 'Ausgabe',
    minifyBtn: 'Minifizieren', beautifyBtn: 'Verschoenern', loadSample: 'Beispiel laden', clear: 'Loeschen',
    placeholder: 'CSS-Code hier einfuegen...', chars: 'Zeichen', bytes: 'Bytes',
    original: 'Original', minified: 'Minifiziert', saved: 'Gespart',
    introTitle: 'Kostenloser Online CSS Minifier',
    introText: 'CSS-Minifizierung entfernt unnoetige Zeichen um die Dateigroesse zu reduzieren. Alle Verarbeitung erfolgt in Ihrem Browser.',
    howTitle: 'Wie man CSS minifiziert',
    step1: 'Fuegen Sie Ihren CSS-Code ein', step2: 'Klicken Sie auf Minifizieren', step3: 'Pruefen Sie den Groessenvergleich', step4: 'Kopieren Sie das minifizierte CSS',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist CSS-Minifizierung?', faq1a: 'CSS-Minifizierung entfernt Leerzeichen, Kommentare und ueberfluessige Zeichen ohne die Funktionalitaet zu aendern.',
    faq2q: 'Aendert Minifizierung das Verhalten?', faq2a: 'Nein. Es werden nur Formatierungszeichen entfernt, die Browser ignorieren.',
    faq3q: 'Wie viel Platz kann ich sparen?', faq3a: 'Typischerweise 20-40% Reduktion je nach Original-Formatierung.',
    faq4q: 'Was macht der Beautifier?', faq4a: 'Der Beautifier fuegt Einrueckungen und Leerzeichen hinzu um CSS lesbar zu machen.',
    faq5q: 'Sind meine Daten sicher?', faq5a: 'Ja. Alle Verarbeitung erfolgt in Ihrem Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Minificador / Embellecedor CSS',
    description: 'Minifica o embellece codigo CSS. Elimina comentarios, espacios y caracteres innecesarios.',
    inputLabel: 'CSS de entrada', outputLabel: 'Salida',
    minifyBtn: 'Minificar', beautifyBtn: 'Embellecer', loadSample: 'Cargar ejemplo', clear: 'Limpiar',
    placeholder: 'Pega tu codigo CSS aqui...', chars: 'caracteres', bytes: 'bytes',
    original: 'Original', minified: 'Minificado', saved: 'Ahorrado',
    introTitle: 'Minificador CSS gratuito en linea',
    introText: 'La minificacion CSS elimina caracteres innecesarios para reducir el tamano del archivo. Todo el procesamiento ocurre en tu navegador.',
    howTitle: 'Como minificar CSS',
    step1: 'Pega tu codigo CSS', step2: 'Haz clic en Minificar', step3: 'Revisa la comparacion de tamano', step4: 'Copia el CSS minificado',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la minificacion CSS?', faq1a: 'La minificacion CSS elimina espacios, comentarios y caracteres superfluos sin cambiar la funcionalidad.',
    faq2q: 'La minificacion cambia el comportamiento?', faq2a: 'No. Solo elimina formato que los navegadores ignoran.',
    faq3q: 'Cuanto espacio puedo ahorrar?', faq3a: 'Generalmente 20-40% de reduccion dependiendo del formato original.',
    faq4q: 'Que hace el embellecedor?', faq4a: 'El embellecedor agrega indentacion y espacios para hacer el CSS legible.',
    faq5q: 'Son seguros mis datos?', faq5a: 'Si. Todo el procesamiento ocurre en tu navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'CSS 圧縮 / 整形ツール',
    description: 'CSSコードを圧縮または整形。コメント、空白、不要な文字を削除してサイズを比較。',
    inputLabel: 'CSS 入力', outputLabel: '出力',
    minifyBtn: '圧縮', beautifyBtn: '整形', loadSample: 'サンプル読込', clear: 'クリア',
    placeholder: 'CSSコードをここに貼り付け...', chars: '文字', bytes: 'バイト',
    original: '元のサイズ', minified: '圧縮後', saved: '削減',
    introTitle: '無料オンライン CSS 圧縮ツール',
    introText: 'CSS圧縮は不要な文字を削除してファイルサイズを縮小します。すべての処理はブラウザ内で行われます。',
    howTitle: 'CSSを圧縮する方法',
    step1: 'CSSコードを入力欄に貼り付け', step2: '圧縮ボタンをクリック', step3: 'サイズ比較を確認', step4: '圧縮されたCSSをコピー',
    faqTitle: 'よくある質問',
    faq1q: 'CSS圧縮とは？', faq1a: 'CSS圧縮は機能を変えずに不要な文字（空白、コメント等）を削除するプロセスです。',
    faq2q: '圧縮で動作が変わる？', faq2a: 'いいえ。ブラウザが無視するフォーマット文字のみが削除されます。',
    faq3q: 'どれくらいサイズを削減できる？', faq3a: '通常20-40%の削減が可能です。',
    faq4q: '整形機能とは？', faq4a: '整形機能は圧縮されたCSSにインデントとスペースを追加して読みやすくします。',
    faq5q: 'データは安全？', faq5a: 'はい。すべての処理はブラウザ内で行われます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'CSS 압축 / 정리 도구',
    description: 'CSS 코드를 압축하거나 정리합니다. 주석, 공백, 불필요한 문자를 제거하고 크기를 비교합니다.',
    inputLabel: 'CSS 입력', outputLabel: '출력',
    minifyBtn: '압축', beautifyBtn: '정리', loadSample: '샘플 로드', clear: '지우기',
    placeholder: '여기에 CSS 코드를 붙여넣으세요...', chars: '문자', bytes: '바이트',
    original: '원본', minified: '압축됨', saved: '절약',
    introTitle: '무료 온라인 CSS 압축 도구',
    introText: 'CSS 압축은 불필요한 문자를 제거하여 파일 크기를 줄입니다. 모든 처리는 브라우저에서 이루어집니다.',
    howTitle: 'CSS를 압축하는 방법',
    step1: 'CSS 코드를 입력란에 붙여넣기', step2: '압축 버튼 클릭', step3: '크기 비교 확인', step4: '압축된 CSS 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: 'CSS 압축이란?', faq1a: 'CSS 압축은 기능을 변경하지 않고 불필요한 문자(공백, 주석 등)를 제거하는 과정입니다.',
    faq2q: '압축이 동작을 변경하나요?', faq2a: '아니요. 브라우저가 무시하는 포맷 문자만 제거됩니다.',
    faq3q: '얼마나 크기를 줄일 수 있나요?', faq3a: '보통 20-40%의 크기 감소가 가능합니다.',
    faq4q: '정리 기능은 무엇인가요?', faq4a: '정리 기능은 압축된 CSS에 들여쓰기와 공백을 추가하여 읽기 쉽게 만듭니다.',
    faq5q: '데이터가 안전한가요?', faq5a: '네. 모든 처리는 브라우저에서 이루어집니다.',
    relatedTitle: '관련 도구',
  },
};

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function beautifyCss(css: string): string {
  let result = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .trim();

  let indent = 0;
  let output = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (char === '{') {
      indent++;
      output += ' {\n' + '  '.repeat(indent);
    } else if (char === '}') {
      indent--;
      output += '\n' + '  '.repeat(indent) + '}\n' + '  '.repeat(indent);
    } else if (char === ';') {
      output += ';\n' + '  '.repeat(indent);
    } else if (char === ',' && result[i + 1] !== ' ') {
      output += ', ';
    } else {
      output += char;
    }
  }
  return output.replace(/\n\s*\n/g, '\n').trim();
}

const sampleCss = `/* Reset styles */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header with gradient */
.header {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 40px 20px;
  text-align: center;
  border-radius: 12px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

/* Button styles */
.btn {
  display: inline-block;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}`;

export default function CssMinifier() {
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
    <ToolLayout title={t.title} description={t.description} toolId="css-minifier">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setOutput(minifyCss(input))} className="btn btn-primary">{t.minifyBtn}</button>
        <button onClick={() => setOutput(beautifyCss(input))} className="btn btn-secondary">{t.beautifyBtn}</button>
        <button onClick={() => setInput(sampleCss)} className="btn btn-secondary">{t.loadSample}</button>
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
            { href: `/${lang}/tools/js-html-formatter`, label: 'JS/HTML Formatter' },
            { href: `/${lang}/tools/javascript-minifier`, label: 'JavaScript Minifier' },
            { href: `/${lang}/tools/css-to-tailwind`, label: 'CSS to Tailwind' },
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
