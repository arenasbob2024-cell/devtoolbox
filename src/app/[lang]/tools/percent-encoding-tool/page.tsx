'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Percent Encoding Tool',
    description: 'Complete percent encoding converter and RFC 3986 reference. View character-by-character breakdown and explore reserved vs unreserved character sets.',
    inputLabel: 'Input Text',
    outputLabel: 'Percent-Encoded Output',
    inputPlaceholder: 'Enter text to see percent encoding breakdown, e.g. Hello World! /path?key=value',
    clear: 'Clear',
    breakdownTitle: 'Character-by-Character Breakdown',
    charCol: 'Char',
    hexCol: 'Hex Code',
    percentCol: 'Percent-Encoded',
    needsCol: 'Needs Encoding?',
    yes: 'Yes',
    no: 'No',
    reserved: 'Reserved',
    unreserved: 'Unreserved',
    cheatTitle: 'RFC 3986 Percent Encoding Reference',
    cheatDesc: 'RFC 3986 defines which characters are allowed in URIs without encoding. All other characters must be percent-encoded as %XX where XX is the hex value of each byte.',
    reservedTitle: 'Reserved Characters (have special meaning in URIs)',
    unreservedTitle: 'Unreserved Characters (never need encoding)',
    mustEncodeTitle: 'Must-Encode Characters (common examples)',
    charHeader: 'Character',
    encodedHeader: 'Encoded Form',
    purposeHeader: 'Purpose in URI',
    intro: 'Percent encoding (also called URL encoding) is defined by RFC 3986 as the mechanism to encode arbitrary data in a URI. Each byte is represented as a percent sign (%) followed by two hexadecimal digits. This tool shows the percent-encoded form of every character in your input and provides a complete RFC 3986 reference.',
    faq1q: 'What is percent encoding?',
    faq1a: 'Percent encoding is the standard mechanism for encoding characters in URIs, defined by RFC 3986. Characters that are not allowed in a URI component are represented as %XX, where XX is the hexadecimal value of each byte. For multi-byte UTF-8 characters, each byte is separately percent-encoded (e.g., the Chinese character for "good" becomes %E5%A5%BD).',
    faq2q: 'What is the difference between RFC 3986 and RFC 2396?',
    faq2a: 'RFC 3986 (2005) obsoletes RFC 2396 (1998). The main difference is that RFC 3986 removed the distinction between "mark" and "unreserved" characters, simplified the unreserved set to A-Z a-z 0-9 - _ . ~, and made tilde (~) unreserved instead of reserved. RFC 3986 also updated the definition of reserved characters and clarified when percent-encoding is required.',
    faq3q: 'Why is space encoded as %20 and not +?',
    faq3a: 'In RFC 3986 percent encoding, space is always encoded as %20. The + representation for spaces comes from the application/x-www-form-urlencoded format used in HTML forms, which is a separate encoding standard. While + for space is valid in query strings submitted by HTML forms, %20 is the universal standard that works everywhere in URIs. The encodeURIComponent function uses %20, not +.',
    crossLinks: 'Related URL Tools',
    errorMsg: 'Encoding error.',
  },
  zh: {
    title: '百分号编码工具',
    description: '完整的百分号编码转换器和 RFC 3986 参考。查看逐字符分解，探索保留字符和非保留字符集。',
    inputLabel: '输入文本',
    outputLabel: '百分号编码输出',
    inputPlaceholder: '输入文本查看百分号编码分解，例如 Hello World! /path?key=value',
    clear: '清除',
    breakdownTitle: '逐字符分解',
    charCol: '字符',
    hexCol: '十六进制',
    percentCol: '百分号编码',
    needsCol: '需要编码？',
    yes: '是',
    no: '否',
    reserved: '保留',
    unreserved: '非保留',
    cheatTitle: 'RFC 3986 百分号编码参考',
    cheatDesc: 'RFC 3986 定义了 URI 中哪些字符无需编码。所有其他字符必须百分号编码为 %XX，其中 XX 是每个字节的十六进制值。',
    reservedTitle: '保留字符（在 URI 中有特殊含义）',
    unreservedTitle: '非保留字符（永远不需要编码）',
    mustEncodeTitle: '必须编码的字符（常见示例）',
    charHeader: '字符',
    encodedHeader: '编码形式',
    purposeHeader: 'URI 中的用途',
    intro: '百分号编码（也称 URL 编码）由 RFC 3986 定义为在 URI 中编码任意数据的机制。每个字节表示为百分号（%）后跟两个十六进制数字。此工具显示输入中每个字符的百分号编码形式，并提供完整的 RFC 3986 参考。',
    faq1q: '什么是百分号编码？',
    faq1a: '百分号编码是 RFC 3986 定义的在 URI 中编码字符的标准机制。不允许在 URI 组件中出现的字符表示为 %XX，其中 XX 是每个字节的十六进制值。对于多字节 UTF-8 字符，每个字节单独百分号编码。',
    faq2q: 'RFC 3986 和 RFC 2396 有什么区别？',
    faq2a: 'RFC 3986（2005）取代了 RFC 2396（1998）。主要区别是 RFC 3986 移除了"mark"和"unreserved"字符的区分，将非保留字符集简化为 A-Z a-z 0-9 - _ . ~，并将波浪号（~）从保留变为非保留。',
    faq3q: '为什么空格编码为 %20 而不是 +？',
    faq3a: '在 RFC 3986 百分号编码中，空格始终编码为 %20。空格的 + 表示来自 HTML 表单使用的 application/x-www-form-urlencoded 格式，这是一个独立的编码标准。%20 是在 URI 中任何地方都有效的通用标准。encodeURIComponent 使用 %20，而不是 +。',
    crossLinks: '相关 URL 工具',
    errorMsg: '编码错误。',
  },
  fr: { title: 'Outil Percent Encoding', description: 'Convertisseur percent encoding complet et reference RFC 3986.', inputLabel: 'Texte d\'entree', outputLabel: 'Sortie percent-encodee', inputPlaceholder: 'Entrez du texte pour voir le percent encoding...', clear: 'Effacer', breakdownTitle: 'Decomposition caractere par caractere', charCol: 'Car.', hexCol: 'Code Hex', percentCol: 'Percent-Encode', needsCol: 'Encodage requis ?', yes: 'Oui', no: 'Non', reserved: 'Reserve', unreserved: 'Non reserve', cheatTitle: 'Reference Percent Encoding RFC 3986', cheatDesc: 'RFC 3986 definit les caracteres autorises dans les URI sans encodage.', reservedTitle: 'Caracteres reserves', unreservedTitle: 'Caracteres non reserves', mustEncodeTitle: 'Caracteres a encoder obligatoirement', charHeader: 'Caractere', encodedHeader: 'Forme encodee', purposeHeader: 'Role dans l\'URI', intro: 'Le percent encoding est defini par RFC 3986 comme le mecanisme d\'encodage des donnees dans un URI.', faq1q: 'Qu\'est-ce que le percent encoding ?', faq1a: 'Le percent encoding est le mecanisme standard pour encoder les caracteres dans les URI, defini par RFC 3986.', faq2q: 'Difference entre RFC 3986 et RFC 2396 ?', faq2a: 'RFC 3986 (2005) remplace RFC 2396 (1998) avec un ensemble de caracteres non reserves simplifie.', faq3q: 'Pourquoi l\'espace est %20 et non + ?', faq3a: 'Dans RFC 3986, l\'espace est toujours %20. Le + vient du format application/x-www-form-urlencoded des formulaires HTML.', crossLinks: 'Outils URL associes', errorMsg: 'Erreur d\'encodage.' },
  de: { title: 'Prozent-Encoding Tool', description: 'Vollstandiger Prozent-Encoding-Konverter und RFC 3986-Referenz.', inputLabel: 'Eingabetext', outputLabel: 'Prozentkodierte Ausgabe', inputPlaceholder: 'Text eingeben fur Prozent-Encoding...', clear: 'Loschen', breakdownTitle: 'Zeichen-fur-Zeichen-Aufschlusselung', charCol: 'Zch.', hexCol: 'Hex-Code', percentCol: 'Prozentkodiert', needsCol: 'Kodierung notig?', yes: 'Ja', no: 'Nein', reserved: 'Reserviert', unreserved: 'Nicht reserviert', cheatTitle: 'RFC 3986 Prozent-Encoding Referenz', cheatDesc: 'RFC 3986 definiert welche Zeichen in URIs ohne Kodierung erlaubt sind.', reservedTitle: 'Reservierte Zeichen', unreservedTitle: 'Nicht reservierte Zeichen', mustEncodeTitle: 'Muss-kodieren Zeichen', charHeader: 'Zeichen', encodedHeader: 'Kodierte Form', purposeHeader: 'Zweck in URI', intro: 'Prozent-Encoding wird durch RFC 3986 als Mechanismus zur Kodierung von Daten in URIs definiert.', faq1q: 'Was ist Prozent-Encoding?', faq1a: 'Prozent-Encoding ist der Standardmechanismus zur Kodierung von Zeichen in URIs, definiert durch RFC 3986.', faq2q: 'Unterschied zwischen RFC 3986 und RFC 2396?', faq2a: 'RFC 3986 (2005) ersetzt RFC 2396 (1998) mit einem vereinfachten Satz nicht reservierter Zeichen.', faq3q: 'Warum ist Leerzeichen %20 und nicht +?', faq3a: 'In RFC 3986 ist Leerzeichen immer %20. Das + kommt vom application/x-www-form-urlencoded Format.', crossLinks: 'Verwandte URL-Tools', errorMsg: 'Kodierungsfehler.' },
  es: { title: 'Herramienta Percent Encoding', description: 'Convertidor de percent encoding completo y referencia RFC 3986.', inputLabel: 'Texto de entrada', outputLabel: 'Salida percent-encoded', inputPlaceholder: 'Ingresa texto para ver el percent encoding...', clear: 'Limpiar', breakdownTitle: 'Desglose caracter por caracter', charCol: 'Car.', hexCol: 'Codigo Hex', percentCol: 'Percent-Encoded', needsCol: 'Necesita codificacion?', yes: 'Si', no: 'No', reserved: 'Reservado', unreserved: 'No reservado', cheatTitle: 'Referencia Percent Encoding RFC 3986', cheatDesc: 'RFC 3986 define que caracteres estan permitidos en URIs sin codificacion.', reservedTitle: 'Caracteres reservados', unreservedTitle: 'Caracteres no reservados', mustEncodeTitle: 'Caracteres que deben codificarse', charHeader: 'Caracter', encodedHeader: 'Forma codificada', purposeHeader: 'Proposito en URI', intro: 'El percent encoding esta definido por RFC 3986 como el mecanismo para codificar datos en un URI.', faq1q: 'Que es el percent encoding?', faq1a: 'El percent encoding es el mecanismo estandar para codificar caracteres en URIs, definido por RFC 3986.', faq2q: 'Diferencia entre RFC 3986 y RFC 2396?', faq2a: 'RFC 3986 (2005) reemplaza RFC 2396 (1998) con un conjunto simplificado de caracteres no reservados.', faq3q: 'Por que el espacio es %20 y no +?', faq3a: 'En RFC 3986, el espacio siempre es %20. El + viene del formato application/x-www-form-urlencoded.', crossLinks: 'Herramientas URL relacionadas', errorMsg: 'Error de codificacion.' },
  ja: { title: 'パーセントエンコーディングツール', description: '完全なパーセントエンコーディングコンバーターとRFC 3986リファレンス。', inputLabel: '入力テキスト', outputLabel: 'パーセントエンコード出力', inputPlaceholder: 'テキストを入力してパーセントエンコーディングを表示...', clear: 'クリア', breakdownTitle: '文字ごとの分解', charCol: '文字', hexCol: '16進コード', percentCol: 'パーセントエンコード', needsCol: 'エンコード必要？', yes: 'はい', no: 'いいえ', reserved: '予約済み', unreserved: '非予約', cheatTitle: 'RFC 3986 パーセントエンコーディング参照', cheatDesc: 'RFC 3986はURIでエンコードなしで使用できる文字を定義しています。', reservedTitle: '予約文字', unreservedTitle: '非予約文字', mustEncodeTitle: 'エンコード必須文字', charHeader: '文字', encodedHeader: 'エンコード形式', purposeHeader: 'URI内の目的', intro: 'パーセントエンコーディングはRFC 3986でURIにデータをエンコードするメカニズムとして定義されています。', faq1q: 'パーセントエンコーディングとは？', faq1a: 'パーセントエンコーディングはRFC 3986で定義されたURIで文字をエンコードする標準メカニズムです。', faq2q: 'RFC 3986とRFC 2396の違いは？', faq2a: 'RFC 3986（2005）はRFC 2396（1998）を簡素化された非予約文字セットで置き換えました。', faq3q: 'なぜスペースは%20であり+ではないのですか？', faq3a: 'RFC 3986ではスペースは常に%20です。+はapplication/x-www-form-urlencoded形式に由来します。', crossLinks: '関連URLツール', errorMsg: 'エンコードエラー。' },
  ko: { title: '퍼센트 인코딩 도구', description: '완전한 퍼센트 인코딩 변환기와 RFC 3986 레퍼런스.', inputLabel: '입력 텍스트', outputLabel: '퍼센트 인코딩 출력', inputPlaceholder: '텍스트를 입력하여 퍼센트 인코딩을 확인하세요...', clear: '지우기', breakdownTitle: '문자별 분석', charCol: '문자', hexCol: '16진 코드', percentCol: '퍼센트 인코딩', needsCol: '인코딩 필요?', yes: '예', no: '아니오', reserved: '예약됨', unreserved: '비예약', cheatTitle: 'RFC 3986 퍼센트 인코딩 참조', cheatDesc: 'RFC 3986은 URI에서 인코딩 없이 허용되는 문자를 정의합니다.', reservedTitle: '예약 문자', unreservedTitle: '비예약 문자', mustEncodeTitle: '반드시 인코딩해야 하는 문자', charHeader: '문자', encodedHeader: '인코딩 형식', purposeHeader: 'URI에서의 목적', intro: '퍼센트 인코딩은 RFC 3986에서 URI에 데이터를 인코딩하는 메커니즘으로 정의됩니다.', faq1q: '퍼센트 인코딩이란?', faq1a: '퍼센트 인코딩은 RFC 3986에서 정의된 URI에서 문자를 인코딩하는 표준 메커니즘입니다.', faq2q: 'RFC 3986과 RFC 2396의 차이점은?', faq2a: 'RFC 3986(2005)은 RFC 2396(1998)을 단순화된 비예약 문자 세트로 대체했습니다.', faq3q: '왜 공백은 %20이고 +가 아닌가요?', faq3a: 'RFC 3986에서 공백은 항상 %20입니다. +는 application/x-www-form-urlencoded 형식에서 유래합니다.', crossLinks: '관련 URL 도구', errorMsg: '인코딩 오류.' },
};

const UNRESERVED = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~'.split(''));
const RESERVED = new Set(':/?#[]@!$&\'()*+,;='.split(''));

const reservedCharsRef = [
  { char: ':', encoded: '%3A', purpose: 'Scheme/port separator (http:, :8080)' },
  { char: '/', encoded: '%2F', purpose: 'Path segment separator (/path/to)' },
  { char: '?', encoded: '%3F', purpose: 'Query string start (?key=value)' },
  { char: '#', encoded: '%23', purpose: 'Fragment identifier (#section)' },
  { char: '[', encoded: '%5B', purpose: 'IPv6 address bracket' },
  { char: ']', encoded: '%5D', purpose: 'IPv6 address bracket' },
  { char: '@', encoded: '%40', purpose: 'User info separator (user@host)' },
  { char: '!', encoded: '%21', purpose: 'Sub-delimiter' },
  { char: '$', encoded: '%24', purpose: 'Sub-delimiter' },
  { char: '&', encoded: '%26', purpose: 'Query parameter separator (&key=value)' },
  { char: "'", encoded: '%27', purpose: 'Sub-delimiter' },
  { char: '(', encoded: '%28', purpose: 'Sub-delimiter' },
  { char: ')', encoded: '%29', purpose: 'Sub-delimiter' },
  { char: '*', encoded: '%2A', purpose: 'Sub-delimiter' },
  { char: '+', encoded: '%2B', purpose: 'Sub-delimiter (also space in forms)' },
  { char: ',', encoded: '%2C', purpose: 'Sub-delimiter' },
  { char: ';', encoded: '%3B', purpose: 'Sub-delimiter (path parameters)' },
  { char: '=', encoded: '%3D', purpose: 'Key-value separator (key=value)' },
];

const mustEncodeExamples = [
  { char: 'space', encoded: '%20', purpose: 'Not allowed in URIs' },
  { char: '"', encoded: '%22', purpose: 'Not allowed (delimiter in HTML)' },
  { char: '<', encoded: '%3C', purpose: 'Not allowed (HTML tag)' },
  { char: '>', encoded: '%3E', purpose: 'Not allowed (HTML tag)' },
  { char: '{', encoded: '%7B', purpose: 'Not allowed (URI template)' },
  { char: '}', encoded: '%7D', purpose: 'Not allowed (URI template)' },
  { char: '|', encoded: '%7C', purpose: 'Not allowed' },
  { char: '\\', encoded: '%5C', purpose: 'Not allowed (escape char)' },
  { char: '^', encoded: '%5E', purpose: 'Not allowed' },
  { char: '`', encoded: '%60', purpose: 'Not allowed' },
  { char: '%', encoded: '%25', purpose: 'Percent sign itself (to avoid ambiguity)' },
];

function getCharBreakdown(char: string): { hex: string; percent: string; needsEncoding: boolean; category: 'reserved' | 'unreserved' | 'encode' } {
  const bytes = new TextEncoder().encode(char);
  const hex = Array.from(bytes).map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
  const percent = Array.from(bytes).map(b => '%' + b.toString(16).toUpperCase().padStart(2, '0')).join('');

  if (UNRESERVED.has(char)) return { hex, percent: char, needsEncoding: false, category: 'unreserved' };
  if (RESERVED.has(char)) return { hex, percent, needsEncoding: true, category: 'reserved' };
  return { hex, percent, needsEncoding: true, category: 'encode' };
}

export default function PercentEncodingToolPage() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const [input, setInput] = useState('');

  const encoded = useMemo(() => {
    if (!input) return '';
    try {
      return encodeURIComponent(input);
    } catch {
      return '';
    }
  }, [input]);

  const breakdown = useMemo(() => {
    if (!input) return [];
    return [...input].map(char => ({
      char: char === ' ' ? '\u2423' : char,
      rawChar: char,
      ...getCharBreakdown(char),
    }));
  }, [input]);

  const handleClear = () => {
    setInput('');
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
    <ToolLayout title={ui.title} description={ui.description} toolId="percent-encoding-tool">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Intro */}
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        {ui.intro}
      </p>

      {/* Tool UI */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={handleClear} className="btn btn-secondary">{ui.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{ui.inputLabel}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={ui.inputPlaceholder}
            style={{ minHeight: 150 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.outputLabel}</label>
            <CopyButton text={encoded} />
          </div>
          <textarea
            value={encoded}
            readOnly
            style={{ minHeight: 150, opacity: encoded ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* Character-by-character breakdown */}
      {breakdown.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{ui.breakdownTitle}</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.charCol}</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.hexCol}</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.percentCol}</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.needsCol}</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 700, fontSize: 15 }}>{row.char}</td>
                    <td style={{ padding: '6px 10px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>0x{row.hex}</td>
                    <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 600, color: row.needsEncoding ? 'var(--accent-blue)' : 'var(--text-secondary)' }}>{row.percent}</td>
                    <td style={{ padding: '6px 10px' }}>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                        background: row.category === 'unreserved' ? 'rgba(16,185,129,0.1)' : row.category === 'reserved' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)',
                        color: row.category === 'unreserved' ? 'var(--accent-emerald)' : row.category === 'reserved' ? '#f59e0b' : 'var(--accent-blue)',
                      }}>
                        {row.category === 'unreserved' ? `${ui.no} (${ui.unreserved})` : row.category === 'reserved' ? `${ui.yes} (${ui.reserved})` : ui.yes}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RFC 3986 Reference */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{ui.cheatTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>{ui.cheatDesc}</p>

        {/* Unreserved characters */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: 'var(--accent-emerald)' }}>{ui.unreservedTitle}</h3>
          <div style={{ background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)', padding: 16 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~'.split('').map((char, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: 4, fontSize: 13, fontFamily: 'monospace', fontWeight: 600,
                  background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--accent-emerald)',
                }}>
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reserved characters table */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#f59e0b' }}>{ui.reservedTitle}</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.charHeader}</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.encodedHeader}</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.purposeHeader}</th>
                </tr>
              </thead>
              <tbody>
                {reservedCharsRef.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontWeight: 700, fontSize: 15, color: '#f59e0b' }}>{row.char}</td>
                    <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)' }}>{row.encoded}</td>
                    <td style={{ padding: '6px 12px', color: 'var(--text-secondary)' }}>{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Must-encode characters */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: 'var(--accent-rose)' }}>{ui.mustEncodeTitle}</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.charHeader}</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.encodedHeader}</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.purposeHeader}</th>
                </tr>
              </thead>
              <tbody>
                {mustEncodeExamples.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontWeight: 700, fontSize: 15, color: 'var(--accent-rose)' }}>{row.char}</td>
                    <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)' }}>{row.encoded}</td>
                    <td style={{ padding: '6px 12px', color: 'var(--text-secondary)' }}>{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cross Links */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{ui.crossLinks}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/url-encoder`, label: 'URL Encoder/Decoder' },
            { href: `/${lang}/tools/url-decoder`, label: 'URL Decoder' },
            { href: `/${lang}/tools/url-encode-online`, label: 'URL Encode Online' },
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
