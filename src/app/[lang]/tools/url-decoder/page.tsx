'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'URL Decoder',
    description: 'Decode URL-encoded strings back to readable text. Supports decodeURIComponent and decodeURI with automatic detection.',
    inputLabel: 'Encoded Input',
    outputLabel: 'Decoded Output',
    inputPlaceholder: 'Paste URL-encoded text here, e.g. hello%20world or https%3A%2F%2Fexample.com',
    decode: 'Decode',
    clear: 'Clear',
    autoDetect: 'Auto-detect mode',
    modeComponent: 'decodeURIComponent',
    modeFull: 'decodeURI',
    beforeAfter: 'Before / After Comparison',
    before: 'Before (encoded)',
    after: 'After (decoded)',
    cheatTitle: 'Common URL-Encoded Characters',
    cheatDesc: 'Reference table of commonly percent-encoded characters in URLs. These characters must be encoded when used as data in URL components.',
    charCol: 'Character',
    encodedCol: 'Encoded',
    nameCol: 'Name',
    whenCol: 'When to Encode',
    intro: 'URL decoding converts percent-encoded characters (%XX) back to their original form. This free online URL decoder handles all standard URL encoding, including UTF-8 multi-byte characters. Paste any URL-encoded text or full URL to decode it instantly in your browser.',
    faq1q: 'What is URL decoding?',
    faq1a: 'URL decoding (also called percent decoding) is the reverse process of URL encoding. It converts percent-encoded sequences like %20 back to their original characters (space). Browsers automatically decode URLs for display, but developers often need to decode URL components manually when processing query parameters or form data.',
    faq2q: 'When are URLs encoded?',
    faq2a: 'URLs are encoded when they contain characters outside the allowed ASCII set, or reserved characters used as data rather than delimiters. Spaces become %20, special characters like & become %26, and non-ASCII characters (Chinese, emoji, etc.) are encoded as multi-byte UTF-8 sequences. Form submissions with application/x-www-form-urlencoded also encode data.',
    faq3q: 'What is the difference between decodeURIComponent and decodeURI?',
    faq3a: 'decodeURIComponent decodes ALL percent-encoded characters, including reserved URI characters like / (%2F), : (%3A), and ? (%3F). decodeURI only decodes characters that would not form valid URI components, preserving the URL structure. Use decodeURIComponent for query parameter values; use decodeURI for complete URLs.',
    crossLinks: 'Related URL Tools',
    errorMsg: 'Decoding error. The input may contain invalid percent-encoded sequences.',
    detected: 'Detected',
    fullUrl: 'full URL',
    encodedText: 'encoded text',
  },
  zh: {
    title: 'URL 解码器',
    description: '将 URL 编码字符串解码回可读文本。支持 decodeURIComponent 和 decodeURI，自动检测模式。',
    inputLabel: '编码输入',
    outputLabel: '解码输出',
    inputPlaceholder: '粘贴 URL 编码文本，例如 hello%20world 或 https%3A%2F%2Fexample.com',
    decode: '解码',
    clear: '清除',
    autoDetect: '自动检测模式',
    modeComponent: 'decodeURIComponent',
    modeFull: 'decodeURI',
    beforeAfter: '编码前后对比',
    before: '编码前',
    after: '解码后',
    cheatTitle: '常见 URL 编码字符',
    cheatDesc: 'URL 中常见百分号编码字符参考表。这些字符在 URL 组件中作为数据使用时必须编码。',
    charCol: '字符',
    encodedCol: '编码形式',
    nameCol: '名称',
    whenCol: '何时编码',
    intro: 'URL 解码将百分号编码字符（%XX）转换回原始形式。此免费在线 URL 解码器处理所有标准 URL 编码，包括 UTF-8 多字节字符。',
    faq1q: '什么是 URL 解码？',
    faq1a: 'URL 解码（也称百分号解码）是 URL 编码的逆过程。它将 %20 这样的百分号编码序列转换回原始字符（空格）。浏览器会自动解码 URL 用于显示，但开发者在处理查询参数或表单数据时常需要手动解码。',
    faq2q: 'URL 什么时候会被编码？',
    faq2a: '当 URL 包含超出允许 ASCII 集的字符或作为数据而非分隔符的保留字符时会被编码。空格变为 %20，& 变为 %26，非 ASCII 字符（中文、表情符号等）编码为多字节 UTF-8 序列。',
    faq3q: 'decodeURIComponent 和 decodeURI 有什么区别？',
    faq3a: 'decodeURIComponent 解码所有百分号编码字符，包括 /（%2F）、:（%3A）和 ?（%3F）等保留 URI 字符。decodeURI 只解码不会形成有效 URI 组件的字符，保持 URL 结构。对查询参数值使用 decodeURIComponent，对完整 URL 使用 decodeURI。',
    crossLinks: '相关 URL 工具',
    errorMsg: '解码错误。输入可能包含无效的百分号编码序列。',
    detected: '检测到',
    fullUrl: '完整 URL',
    encodedText: '编码文本',
  },
  fr: { title: 'Decodeur URL', description: 'Decodez les chaines URL en texte lisible.', inputLabel: 'Entree encodee', outputLabel: 'Sortie decodee', inputPlaceholder: 'Collez le texte encode ici...', decode: 'Decoder', clear: 'Effacer', autoDetect: 'Detection automatique', modeComponent: 'decodeURIComponent', modeFull: 'decodeURI', beforeAfter: 'Comparaison avant / apres', before: 'Avant', after: 'Apres', cheatTitle: 'Caracteres URL encodes courants', cheatDesc: 'Table de reference des caracteres percent-encodes dans les URLs.', charCol: 'Caractere', encodedCol: 'Encode', nameCol: 'Nom', whenCol: 'Quand encoder', intro: 'Le decodage URL convertit les caracteres percent-encodes (%XX) en leur forme originale. Cet outil gratuit gere tout l\'encodage URL standard.', faq1q: 'Qu\'est-ce que le decodage URL ?', faq1a: 'Le decodage URL est le processus inverse de l\'encodage URL. Il convertit les sequences percent-encodees comme %20 en leurs caracteres originaux.', faq2q: 'Quand les URLs sont-elles encodees ?', faq2a: 'Les URLs sont encodees quand elles contiennent des caracteres en dehors de l\'ensemble ASCII autorise ou des caracteres reserves utilises comme donnees.', faq3q: 'Difference entre decodeURIComponent et decodeURI ?', faq3a: 'decodeURIComponent decode tous les caracteres percent-encodes. decodeURI preserve la structure de l\'URL en ne decodant que les caracteres non reserves.', crossLinks: 'Outils URL associes', errorMsg: 'Erreur de decodage.', detected: 'Detecte', fullUrl: 'URL complete', encodedText: 'texte encode' },
  de: { title: 'URL Decoder', description: 'URL-kodierte Zeichenfolgen in lesbaren Text dekodieren.', inputLabel: 'Kodierte Eingabe', outputLabel: 'Dekodierte Ausgabe', inputPlaceholder: 'Kodierten Text hier einfugen...', decode: 'Dekodieren', clear: 'Loschen', autoDetect: 'Automatische Erkennung', modeComponent: 'decodeURIComponent', modeFull: 'decodeURI', beforeAfter: 'Vorher / Nachher Vergleich', before: 'Vorher', after: 'Nachher', cheatTitle: 'Haufig URL-kodierte Zeichen', cheatDesc: 'Referenztabelle haufig prozentkodierter Zeichen in URLs.', charCol: 'Zeichen', encodedCol: 'Kodiert', nameCol: 'Name', whenCol: 'Wann kodieren', intro: 'URL-Dekodierung konvertiert prozentkodierte Zeichen (%XX) zuruck in ihre ursprungliche Form.', faq1q: 'Was ist URL-Dekodierung?', faq1a: 'URL-Dekodierung ist der umgekehrte Prozess der URL-Kodierung. Sie konvertiert prozentkodierte Sequenzen wie %20 zuruck in ihre ursprunglichen Zeichen.', faq2q: 'Wann werden URLs kodiert?', faq2a: 'URLs werden kodiert, wenn sie Zeichen ausserhalb des erlaubten ASCII-Zeichensatzes enthalten oder reservierte Zeichen als Daten verwenden.', faq3q: 'Unterschied zwischen decodeURIComponent und decodeURI?', faq3a: 'decodeURIComponent dekodiert alle prozentkodierten Zeichen. decodeURI bewahrt die URL-Struktur und dekodiert nur nicht-reservierte Zeichen.', crossLinks: 'Verwandte URL-Tools', errorMsg: 'Dekodierungsfehler.', detected: 'Erkannt', fullUrl: 'vollstandige URL', encodedText: 'kodierter Text' },
  es: { title: 'Decodificador URL', description: 'Decodifica cadenas URL a texto legible.', inputLabel: 'Entrada codificada', outputLabel: 'Salida decodificada', inputPlaceholder: 'Pega texto codificado aqui...', decode: 'Decodificar', clear: 'Limpiar', autoDetect: 'Deteccion automatica', modeComponent: 'decodeURIComponent', modeFull: 'decodeURI', beforeAfter: 'Comparacion antes / despues', before: 'Antes', after: 'Despues', cheatTitle: 'Caracteres URL codificados comunes', cheatDesc: 'Tabla de referencia de caracteres percent-codificados en URLs.', charCol: 'Caracter', encodedCol: 'Codificado', nameCol: 'Nombre', whenCol: 'Cuando codificar', intro: 'La decodificacion URL convierte caracteres percent-codificados (%XX) a su forma original. Esta herramienta gratuita maneja toda la codificacion URL estandar.', faq1q: 'Que es la decodificacion URL?', faq1a: 'La decodificacion URL es el proceso inverso de la codificacion URL. Convierte secuencias como %20 en sus caracteres originales.', faq2q: 'Cuando se codifican las URLs?', faq2a: 'Las URLs se codifican cuando contienen caracteres fuera del conjunto ASCII permitido o caracteres reservados usados como datos.', faq3q: 'Diferencia entre decodeURIComponent y decodeURI?', faq3a: 'decodeURIComponent decodifica todos los caracteres percent-codificados. decodeURI preserva la estructura de la URL.', crossLinks: 'Herramientas URL relacionadas', errorMsg: 'Error de decodificacion.', detected: 'Detectado', fullUrl: 'URL completa', encodedText: 'texto codificado' },
  ja: { title: 'URL デコーダー', description: 'URLエンコードされた文字列を読み取り可能なテキストにデコード。', inputLabel: 'エンコード入力', outputLabel: 'デコード出力', inputPlaceholder: 'URLエンコードされたテキストを貼り付け...', decode: 'デコード', clear: 'クリア', autoDetect: '自動検出', modeComponent: 'decodeURIComponent', modeFull: 'decodeURI', beforeAfter: 'ビフォー/アフター比較', before: 'ビフォー', after: 'アフター', cheatTitle: '一般的なURLエンコード文字', cheatDesc: 'URLでよく使われるパーセントエンコード文字の参照表。', charCol: '文字', encodedCol: 'エンコード', nameCol: '名前', whenCol: 'エンコードが必要な場合', intro: 'URLデコードは、パーセントエンコードされた文字（%XX）を元の形式に変換します。この無料オンラインURLデコーダーをご利用ください。', faq1q: 'URLデコードとは？', faq1a: 'URLデコードはURLエンコードの逆プロセスです。%20のようなパーセントエンコードシーケンスを元の文字に変換します。', faq2q: 'URLはいつエンコードされますか？', faq2a: 'URLが許可されたASCIIセット外の文字を含む場合や、データとして使用される予約文字がある場合にエンコードされます。', faq3q: 'decodeURIComponentとdecodeURIの違いは？', faq3a: 'decodeURIComponentはすべてのパーセントエンコード文字をデコードします。decodeURIはURL構造を保持します。', crossLinks: '関連URLツール', errorMsg: 'デコードエラー。', detected: '検出', fullUrl: '完全なURL', encodedText: 'エンコードテキスト' },
  ko: { title: 'URL 디코더', description: 'URL 인코딩된 문자열을 읽을 수 있는 텍스트로 디코딩합니다.', inputLabel: '인코딩된 입력', outputLabel: '디코딩된 출력', inputPlaceholder: 'URL 인코딩된 텍스트를 붙여넣으세요...', decode: '디코딩', clear: '지우기', autoDetect: '자동 감지', modeComponent: 'decodeURIComponent', modeFull: 'decodeURI', beforeAfter: '전후 비교', before: '이전', after: '이후', cheatTitle: '일반적인 URL 인코딩 문자', cheatDesc: 'URL에서 자주 사용되는 퍼센트 인코딩 문자 참조 테이블.', charCol: '문자', encodedCol: '인코딩', nameCol: '이름', whenCol: '인코딩 시기', intro: 'URL 디코딩은 퍼센트 인코딩된 문자(%XX)를 원래 형태로 변환합니다. 이 무료 온라인 URL 디코더를 사용하세요.', faq1q: 'URL 디코딩이란?', faq1a: 'URL 디코딩은 URL 인코딩의 역과정입니다. %20과 같은 퍼센트 인코딩 시퀀스를 원래 문자로 변환합니다.', faq2q: 'URL은 언제 인코딩되나요?', faq2a: 'URL이 허용된 ASCII 세트 외의 문자를 포함하거나 데이터로 사용되는 예약 문자가 있을 때 인코딩됩니다.', faq3q: 'decodeURIComponent와 decodeURI의 차이점은?', faq3a: 'decodeURIComponent는 모든 퍼센트 인코딩 문자를 디코딩합니다. decodeURI는 URL 구조를 유지합니다.', crossLinks: '관련 URL 도구', errorMsg: '디코딩 오류.', detected: '감지됨', fullUrl: '전체 URL', encodedText: '인코딩된 텍스트' },
};

const commonEncodings = [
  { char: ' ', encoded: '%20', name: 'Space', when: 'Always in path/query' },
  { char: '/', encoded: '%2F', name: 'Forward slash', when: 'In query values' },
  { char: ':', encoded: '%3A', name: 'Colon', when: 'In query values' },
  { char: '&', encoded: '%26', name: 'Ampersand', when: 'In query values (to avoid param separator)' },
  { char: '=', encoded: '%3D', name: 'Equals sign', when: 'In query values (to avoid key=value separator)' },
  { char: '?', encoded: '%3F', name: 'Question mark', when: 'In path or query values' },
  { char: '#', encoded: '%23', name: 'Hash/Fragment', when: 'In path or query (to avoid fragment)' },
  { char: '+', encoded: '%2B', name: 'Plus sign', when: 'In query values (+ can mean space)' },
  { char: '@', encoded: '%40', name: 'At sign', when: 'In query values' },
  { char: '%', encoded: '%25', name: 'Percent sign', when: 'Always (to avoid encoding ambiguity)' },
  { char: '\\n', encoded: '%0A', name: 'Newline (LF)', when: 'Always' },
  { char: '\\t', encoded: '%09', name: 'Tab', when: 'Always' },
];

export default function UrlDecoderPage() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [detectedType, setDetectedType] = useState<'url' | 'text' | null>(null);
  const [usedMethod, setUsedMethod] = useState<string>('');

  const isFullUrl = useCallback((s: string): boolean => {
    try {
      const decoded = decodeURIComponent(s);
      return /^https?:\/\//i.test(decoded) || /^https?:\/\//i.test(s);
    } catch {
      return /^https?:\/\//i.test(s) || /^https?%3A%2F%2F/i.test(s);
    }
  }, []);

  const handleDecode = () => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); setDetectedType(null); return; }

      const isUrl = isFullUrl(input.trim());
      setDetectedType(isUrl ? 'url' : 'text');

      let result: string;
      if (isUrl) {
        try {
          result = decodeURI(input.trim());
          setUsedMethod('decodeURI');
        } catch {
          result = decodeURIComponent(input.trim());
          setUsedMethod('decodeURIComponent');
        }
      } else {
        try {
          result = decodeURIComponent(input.trim());
          setUsedMethod('decodeURIComponent');
        } catch {
          result = decodeURI(input.trim());
          setUsedMethod('decodeURI');
        }
      }
      setOutput(result);
    } catch {
      setError(ui.errorMsg);
      setOutput('');
      setDetectedType(null);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setDetectedType(null);
    setUsedMethod('');
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ui.faq1q, acceptedAnswer: { '@type': 'Answer', text: ui.faq1a } },
      { '@type': 'Question', name: ui.faq2q, acceptedAnswer: { '@type': 'Answer', text: ui.faq2a } },
      { '@type': 'Question', name: ui.faq3q, acceptedAnswer: { '@type': 'Answer', text: ui.faq3a } },
    ],
  };

  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="url-decoder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Intro */}
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        {ui.intro}
      </p>

      {/* Tool UI */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={handleDecode} className="btn btn-primary">&larr; {ui.decode}</button>
        <button onClick={handleClear} className="btn btn-secondary">{ui.clear}</button>
        {detectedType && (
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', background: 'var(--bg-input)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)' }}>
            {ui.detected}: {detectedType === 'url' ? ui.fullUrl : ui.encodedText} &rarr; {usedMethod}
          </span>
        )}
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{ui.inputLabel}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleDecode(); }}
            placeholder={ui.inputPlaceholder}
            style={{ minHeight: 200 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 200, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* Before/After Comparison */}
      {output && input.trim() !== output && (
        <div style={{ marginTop: 20, background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)', padding: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{ui.beforeAfter}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: 1 }}>{ui.before}</span>
              <div style={{ fontFamily: 'monospace', fontSize: 13, marginTop: 6, padding: 10, background: 'var(--bg-card)', borderRadius: 6, wordBreak: 'break-all', border: '1px solid var(--border-color)' }}>
                {input.trim()}
              </div>
            </div>
            <div>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: 1 }}>{ui.after}</span>
              <div style={{ fontFamily: 'monospace', fontSize: 13, marginTop: 6, padding: 10, background: 'var(--bg-card)', borderRadius: 6, wordBreak: 'break-all', border: '1px solid var(--border-color)' }}>
                {output}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cheat Sheet */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{ui.cheatTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>{ui.cheatDesc}</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.charCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.encodedCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.nameCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.whenCol}</th>
              </tr>
            </thead>
            <tbody>
              {commonEncodings.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)' }}>{row.char}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)' }}>{row.encoded}</td>
                  <td style={{ padding: '8px 12px' }}>{row.name}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cross Links */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{ui.crossLinks}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/url-encoder`, label: 'URL Encoder/Decoder' },
            { href: `/${lang}/tools/url-encode-online`, label: 'URL Encode Online' },
            { href: `/${lang}/tools/percent-encoding-tool`, label: 'Percent Encoding Tool' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
            { href: `/${lang}/tools/base64-decoder`, label: 'Base64 Decoder' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: 12, color: 'var(--accent-blue)', textDecoration: 'none', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { q: ui.faq1q, a: ui.faq1a },
            { q: ui.faq2q, a: ui.faq2a },
            { q: ui.faq3q, a: ui.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                {faq.q}
              </summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
