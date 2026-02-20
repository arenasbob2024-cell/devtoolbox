'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'URL Encode Online',
    description: 'Encode text for safe use in URLs. Toggle between encodeURIComponent and encodeURI modes with real-time encoding as you type.',
    inputLabel: 'Text to Encode',
    outputLabel: 'Encoded Output',
    inputPlaceholder: 'Type or paste text to encode, e.g. hello world, path/to/file, key=value&other=data',
    clear: 'Clear',
    modeComponent: 'encodeURIComponent',
    modeFull: 'encodeURI',
    charsBefore: 'chars before',
    charsAfter: 'chars after',
    cheatTitle: 'encodeURI vs encodeURIComponent',
    cheatDesc: 'JavaScript provides two functions for URL encoding. They differ in which characters they encode. Choose the right one based on your use case.',
    charCol: 'Character',
    encodeURICol: 'encodeURI',
    encodeComponentCol: 'encodeURIComponent',
    encoded: 'Encoded',
    notEncoded: 'Not encoded',
    useCase: 'Use Case',
    useCaseURI: 'Encode a complete URL (preserves structure: ://?#&=)',
    useCaseComponent: 'Encode a URL component (query parameter value, path segment)',
    intro: 'URL encoding (percent encoding) converts characters that are not allowed in URLs into percent-encoded format (%XX). This free online URL encoder supports both encodeURIComponent (for query values, path segments) and encodeURI (for complete URLs). Characters are encoded in real-time as you type.',
    faq1q: 'Why do URLs need to be encoded?',
    faq1a: 'URLs can only contain a limited set of ASCII characters. Characters like spaces, non-ASCII characters (Chinese, Arabic, emoji), and reserved characters (&, =, ?, #) used as data must be percent-encoded to be safely transmitted. Without encoding, these characters could break URL parsing or cause ambiguity.',
    faq2q: 'What is the difference between encodeURI and encodeURIComponent?',
    faq2a: 'encodeURI encodes a complete URL while preserving URL structure characters like :, /, ?, #, &, and =. encodeURIComponent encodes everything except A-Z, a-z, 0-9, -, _, ., !, ~, *, \', (, and ). Use encodeURI for full URLs; use encodeURIComponent for individual query parameter values or path segments.',
    faq3q: 'How are spaces encoded in URLs?',
    faq3a: 'In standard URL encoding (RFC 3986), spaces are encoded as %20. In HTML form data (application/x-www-form-urlencoded), spaces can also be represented as +. The encodeURIComponent function always encodes spaces as %20. When building query strings manually, %20 is the safer choice for maximum compatibility.',
    crossLinks: 'Related URL Tools',
    errorMsg: 'Encoding error. Please check your input.',
  },
  zh: {
    title: 'URL 在线编码',
    description: '将文本编码为安全的 URL 格式。在 encodeURIComponent 和 encodeURI 模式之间切换，输入时实时编码。',
    inputLabel: '待编码文本',
    outputLabel: '编码输出',
    inputPlaceholder: '输入或粘贴文本进行编码，例如 hello world, path/to/file',
    clear: '清除',
    modeComponent: 'encodeURIComponent',
    modeFull: 'encodeURI',
    charsBefore: '编码前字符',
    charsAfter: '编码后字符',
    cheatTitle: 'encodeURI 与 encodeURIComponent 对比',
    cheatDesc: 'JavaScript 提供两个 URL 编码函数，它们编码的字符不同。根据使用场景选择正确的函数。',
    charCol: '字符',
    encodeURICol: 'encodeURI',
    encodeComponentCol: 'encodeURIComponent',
    encoded: '编码',
    notEncoded: '不编码',
    useCase: '使用场景',
    useCaseURI: '编码完整 URL（保持结构：://?#&=）',
    useCaseComponent: '编码 URL 组件（查询参数值、路径片段）',
    intro: 'URL 编码（百分号编码）将 URL 中不允许的字符转换为百分号编码格式（%XX）。此免费在线 URL 编码器同时支持 encodeURIComponent 和 encodeURI，输入时实时编码。',
    faq1q: 'URL 为什么需要编码？',
    faq1a: 'URL 只能包含有限的 ASCII 字符集。空格、非 ASCII 字符（中文、阿拉伯语、表情符号）和作为数据使用的保留字符（&、=、?、#）必须进行百分号编码才能安全传输。',
    faq2q: 'encodeURI 和 encodeURIComponent 有什么区别？',
    faq2a: 'encodeURI 编码完整 URL，同时保留 URL 结构字符如 :、/、?、#、& 和 =。encodeURIComponent 编码除 A-Z、a-z、0-9、-、_、.、!、~、*、\'、(、) 之外的所有字符。对完整 URL 使用 encodeURI，对单个查询参数值使用 encodeURIComponent。',
    faq3q: 'URL 中空格怎么编码？',
    faq3a: '在标准 URL 编码（RFC 3986）中，空格编码为 %20。在 HTML 表单数据中，空格也可以表示为 +。encodeURIComponent 总是将空格编码为 %20。手动构建查询字符串时，%20 是最安全的选择。',
    crossLinks: '相关 URL 工具',
    errorMsg: '编码错误，请检查输入。',
  },
  fr: { title: 'Encodage URL en Ligne', description: 'Encodez du texte pour une utilisation sure dans les URLs.', inputLabel: 'Texte a encoder', outputLabel: 'Sortie encodee', inputPlaceholder: 'Tapez ou collez le texte a encoder...', clear: 'Effacer', modeComponent: 'encodeURIComponent', modeFull: 'encodeURI', charsBefore: 'caracteres avant', charsAfter: 'caracteres apres', cheatTitle: 'encodeURI vs encodeURIComponent', cheatDesc: 'JavaScript fournit deux fonctions d\'encodage URL qui different dans les caracteres encodes.', charCol: 'Caractere', encodeURICol: 'encodeURI', encodeComponentCol: 'encodeURIComponent', encoded: 'Encode', notEncoded: 'Non encode', useCase: 'Cas d\'utilisation', useCaseURI: 'Encoder une URL complete', useCaseComponent: 'Encoder un composant URL', intro: 'L\'encodage URL convertit les caracteres non autorises en format percent-encode (%XX). Cet outil gratuit supporte encodeURIComponent et encodeURI.', faq1q: 'Pourquoi encoder les URLs ?', faq1a: 'Les URLs ne peuvent contenir qu\'un ensemble limite de caracteres ASCII. Les espaces et caracteres speciaux doivent etre percent-encodes.', faq2q: 'Difference entre encodeURI et encodeURIComponent ?', faq2a: 'encodeURI preserve la structure de l\'URL. encodeURIComponent encode tous les caracteres sauf les lettres, chiffres et quelques symboles.', faq3q: 'Comment les espaces sont-ils encodes ?', faq3a: 'Les espaces sont encodes en %20 dans l\'encodage URL standard. Dans les formulaires HTML, + peut aussi representer un espace.', crossLinks: 'Outils URL associes', errorMsg: 'Erreur d\'encodage.' },
  de: { title: 'URL Online Kodieren', description: 'Text fur sichere URL-Verwendung kodieren.', inputLabel: 'Text zum Kodieren', outputLabel: 'Kodierte Ausgabe', inputPlaceholder: 'Text zum Kodieren eingeben...', clear: 'Loschen', modeComponent: 'encodeURIComponent', modeFull: 'encodeURI', charsBefore: 'Zeichen vorher', charsAfter: 'Zeichen nachher', cheatTitle: 'encodeURI vs encodeURIComponent', cheatDesc: 'JavaScript bietet zwei URL-Kodierungsfunktionen mit unterschiedlichen Zeichensatzen.', charCol: 'Zeichen', encodeURICol: 'encodeURI', encodeComponentCol: 'encodeURIComponent', encoded: 'Kodiert', notEncoded: 'Nicht kodiert', useCase: 'Anwendungsfall', useCaseURI: 'Vollstandige URL kodieren', useCaseComponent: 'URL-Komponente kodieren', intro: 'URL-Kodierung konvertiert nicht erlaubte Zeichen in prozentkodiertes Format (%XX). Dieses Tool unterstutzt encodeURIComponent und encodeURI.', faq1q: 'Warum mussen URLs kodiert werden?', faq1a: 'URLs konnen nur einen begrenzten Satz von ASCII-Zeichen enthalten. Leerzeichen und Sonderzeichen mussen prozentkodiert werden.', faq2q: 'Unterschied zwischen encodeURI und encodeURIComponent?', faq2a: 'encodeURI bewahrt die URL-Struktur. encodeURIComponent kodiert alle Zeichen ausser Buchstaben, Ziffern und einigen Symbolen.', faq3q: 'Wie werden Leerzeichen kodiert?', faq3a: 'Leerzeichen werden als %20 in der Standard-URL-Kodierung kodiert. In HTML-Formularen kann + auch ein Leerzeichen darstellen.', crossLinks: 'Verwandte URL-Tools', errorMsg: 'Kodierungsfehler.' },
  es: { title: 'Codificar URL Online', description: 'Codifica texto para uso seguro en URLs.', inputLabel: 'Texto a codificar', outputLabel: 'Salida codificada', inputPlaceholder: 'Escribe o pega texto para codificar...', clear: 'Limpiar', modeComponent: 'encodeURIComponent', modeFull: 'encodeURI', charsBefore: 'caracteres antes', charsAfter: 'caracteres despues', cheatTitle: 'encodeURI vs encodeURIComponent', cheatDesc: 'JavaScript proporciona dos funciones de codificacion URL que difieren en los caracteres codificados.', charCol: 'Caracter', encodeURICol: 'encodeURI', encodeComponentCol: 'encodeURIComponent', encoded: 'Codificado', notEncoded: 'No codificado', useCase: 'Caso de uso', useCaseURI: 'Codificar URL completa', useCaseComponent: 'Codificar componente URL', intro: 'La codificacion URL convierte caracteres no permitidos en formato percent-codificado (%XX). Esta herramienta soporta encodeURIComponent y encodeURI.', faq1q: 'Por que codificar URLs?', faq1a: 'Las URLs solo pueden contener un conjunto limitado de caracteres ASCII. Los espacios y caracteres especiales deben ser percent-codificados.', faq2q: 'Diferencia entre encodeURI y encodeURIComponent?', faq2a: 'encodeURI preserva la estructura de la URL. encodeURIComponent codifica todos los caracteres excepto letras, numeros y algunos simbolos.', faq3q: 'Como se codifican los espacios?', faq3a: 'Los espacios se codifican como %20 en la codificacion URL estandar. En formularios HTML, + tambien puede representar un espacio.', crossLinks: 'Herramientas URL relacionadas', errorMsg: 'Error de codificacion.' },
  ja: { title: 'URL オンラインエンコード', description: 'テキストを安全なURL用にエンコードします。', inputLabel: 'エンコードするテキスト', outputLabel: 'エンコード出力', inputPlaceholder: 'エンコードするテキストを入力...', clear: 'クリア', modeComponent: 'encodeURIComponent', modeFull: 'encodeURI', charsBefore: '文字（前）', charsAfter: '文字（後）', cheatTitle: 'encodeURI vs encodeURIComponent', cheatDesc: 'JavaScriptはエンコードする文字が異なる2つのURLエンコード関数を提供します。', charCol: '文字', encodeURICol: 'encodeURI', encodeComponentCol: 'encodeURIComponent', encoded: 'エンコード', notEncoded: '非エンコード', useCase: 'ユースケース', useCaseURI: '完全なURLをエンコード', useCaseComponent: 'URLコンポーネントをエンコード', intro: 'URLエンコーディングは許可されていない文字をパーセントエンコード形式（%XX）に変換します。このツールはencodeURIComponentとencodeURIをサポートします。', faq1q: 'なぜURLをエンコードする必要がありますか？', faq1a: 'URLは限られたASCII文字セットしか含められません。スペースや特殊文字はパーセントエンコードする必要があります。', faq2q: 'encodeURIとencodeURIComponentの違いは？', faq2a: 'encodeURIはURL構造を保持します。encodeURIComponentは文字、数字、一部の記号を除くすべてをエンコードします。', faq3q: 'スペースはどのようにエンコードされますか？', faq3a: '標準URLエンコーディングではスペースは%20にエンコードされます。HTMLフォームでは+もスペースを表せます。', crossLinks: '関連URLツール', errorMsg: 'エンコードエラー。' },
  ko: { title: 'URL 온라인 인코딩', description: '텍스트를 안전한 URL 사용을 위해 인코딩합니다.', inputLabel: '인코딩할 텍스트', outputLabel: '인코딩된 출력', inputPlaceholder: '인코딩할 텍스트를 입력하세요...', clear: '지우기', modeComponent: 'encodeURIComponent', modeFull: 'encodeURI', charsBefore: '문자 (전)', charsAfter: '문자 (후)', cheatTitle: 'encodeURI vs encodeURIComponent', cheatDesc: 'JavaScript는 인코딩하는 문자가 다른 두 가지 URL 인코딩 함수를 제공합니다.', charCol: '문자', encodeURICol: 'encodeURI', encodeComponentCol: 'encodeURIComponent', encoded: '인코딩됨', notEncoded: '인코딩 안됨', useCase: '사용 사례', useCaseURI: '전체 URL 인코딩', useCaseComponent: 'URL 구성요소 인코딩', intro: 'URL 인코딩은 허용되지 않는 문자를 퍼센트 인코딩 형식(%XX)으로 변환합니다. 이 도구는 encodeURIComponent와 encodeURI를 지원합니다.', faq1q: 'URL을 왜 인코딩해야 하나요?', faq1a: 'URL은 제한된 ASCII 문자 세트만 포함할 수 있습니다. 공백과 특수 문자는 퍼센트 인코딩해야 합니다.', faq2q: 'encodeURI와 encodeURIComponent의 차이점은?', faq2a: 'encodeURI는 URL 구조를 유지합니다. encodeURIComponent는 문자, 숫자, 일부 기호를 제외한 모든 것을 인코딩합니다.', faq3q: '공백은 어떻게 인코딩되나요?', faq3a: '표준 URL 인코딩에서 공백은 %20으로 인코딩됩니다. HTML 폼에서는 +도 공백을 나타낼 수 있습니다.', crossLinks: '관련 URL 도구', errorMsg: '인코딩 오류.' },
};

const comparisonChars = [
  { char: ' ', component: '%20', uri: '%20' },
  { char: '!', component: '!', uri: '!' },
  { char: '#', component: '%23', uri: '#' },
  { char: '$', component: '%24', uri: '$' },
  { char: '&', component: '%26', uri: '&' },
  { char: '+', component: '%2B', uri: '+' },
  { char: ',', component: '%2C', uri: ',' },
  { char: '/', component: '%2F', uri: '/' },
  { char: ':', component: '%3A', uri: ':' },
  { char: ';', component: '%3B', uri: ';' },
  { char: '=', component: '%3D', uri: '=' },
  { char: '?', component: '%3F', uri: '?' },
  { char: '@', component: '%40', uri: '@' },
];

export default function UrlEncodeOnlinePage() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'component' | 'full'>('component');
  const [error, setError] = useState('');

  // Real-time encoding
  useEffect(() => {
    if (!input) { setOutput(''); setError(''); return; }
    try {
      setError('');
      setOutput(mode === 'component' ? encodeURIComponent(input) : encodeURI(input));
    } catch {
      setError(ui.errorMsg);
      setOutput('');
    }
  }, [input, mode, ui.errorMsg]);

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
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
    <ToolLayout title={ui.title} description={ui.description} toolId="url-encode-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Intro */}
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        {ui.intro}
      </p>

      {/* Mode Toggle + Clear */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', background: 'var(--bg-input)', borderRadius: 8,
          border: '1px solid var(--border-color)', overflow: 'hidden',
        }}>
          <button onClick={() => setMode('component')} style={{
            padding: '8px 16px', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'monospace',
            background: mode === 'component' ? 'var(--accent-blue)' : 'transparent',
            color: mode === 'component' ? 'white' : 'var(--text-secondary)',
          }}>{ui.modeComponent}</button>
          <button onClick={() => setMode('full')} style={{
            padding: '8px 16px', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'monospace',
            background: mode === 'full' ? 'var(--accent-blue)' : 'transparent',
            color: mode === 'full' ? 'white' : 'var(--text-secondary)',
          }}>{ui.modeFull}</button>
        </div>
        <button onClick={handleClear} className="btn btn-secondary">{ui.clear}</button>
        {input && (
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 'auto' }}>
            {input.length} {ui.charsBefore} &rarr; {output.length} {ui.charsAfter}
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
            placeholder={ui.inputPlaceholder}
            style={{ minHeight: 220 }}
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
            style={{ minHeight: 220, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* Which characters get encoded indicator */}
      {input && output && (
        <div style={{ marginTop: 16, background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)', padding: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: 'var(--text-secondary)' }}>
            {mode === 'component' ? 'encodeURIComponent' : 'encodeURI'} {ui.encoded}:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {[...input].map((char, i) => {
              const encoded = mode === 'component' ? encodeURIComponent(char) : encodeURI(char);
              const wasEncoded = encoded !== char;
              return (
                <span key={i} style={{
                  display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                  padding: '4px 6px', borderRadius: 4, fontSize: 11, fontFamily: 'monospace',
                  background: wasEncoded ? 'rgba(59,130,246,0.1)' : 'transparent',
                  border: wasEncoded ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                }}>
                  <span style={{ color: wasEncoded ? 'var(--accent-blue)' : 'var(--text-secondary)' }}>{char === ' ' ? '\u2423' : char}</span>
                  {wasEncoded && <span style={{ fontSize: 9, color: 'var(--accent-emerald)', marginTop: 2 }}>{encoded}</span>}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Cheat Sheet: encodeURI vs encodeURIComponent */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{ui.cheatTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>{ui.cheatDesc}</p>

        {/* Use case summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 14, border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: 'var(--accent-blue)', marginBottom: 6 }}>encodeURI()</div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{ui.useCaseURI}</p>
          </div>
          <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 14, border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: 'var(--accent-emerald)', marginBottom: 6 }}>encodeURIComponent()</div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{ui.useCaseComponent}</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.charCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.encodeURICol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.encodeComponentCol}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonChars.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)' }}>
                    {row.char === ' ' ? 'space' : row.char}
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', textAlign: 'center', color: row.uri === row.char ? 'var(--text-secondary)' : 'var(--accent-emerald)' }}>
                    {row.uri === row.char ? row.char : row.uri}
                    <span style={{ fontSize: 10, marginLeft: 4, color: 'var(--text-secondary)' }}>
                      ({row.uri === row.char ? ui.notEncoded : ui.encoded})
                    </span>
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', textAlign: 'center', color: row.component === row.char ? 'var(--text-secondary)' : 'var(--accent-emerald)' }}>
                    {row.component === row.char ? row.char : row.component}
                    <span style={{ fontSize: 10, marginLeft: 4, color: 'var(--text-secondary)' }}>
                      ({row.component === row.char ? ui.notEncoded : ui.encoded})
                    </span>
                  </td>
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
            { href: `/${lang}/tools/url-decoder`, label: 'URL Decoder' },
            { href: `/${lang}/tools/percent-encoding-tool`, label: 'Percent Encoding Tool' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
            { href: `/${lang}/tools/html-entity`, label: 'HTML Entity Encoder' },
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
