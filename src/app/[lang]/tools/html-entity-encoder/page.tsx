'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

const namedEntities: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  '\u00a0': '&nbsp;', '\u00a9': '&copy;', '\u00ae': '&reg;', '\u2122': '&trade;',
  '\u20ac': '&euro;', '\u00a3': '&pound;', '\u00a5': '&yen;', '\u00a2': '&cent;',
  '\u2014': '&mdash;', '\u2013': '&ndash;', '\u2026': '&hellip;',
  '\u2018': '&lsquo;', '\u2019': '&rsquo;', '\u201c': '&ldquo;', '\u201d': '&rdquo;',
  '\u00d7': '&times;', '\u00f7': '&divide;', '\u00b1': '&plusmn;',
  '\u2264': '&le;', '\u2265': '&ge;', '\u2260': '&ne;',
  '\u2190': '&larr;', '\u2192': '&rarr;', '\u2191': '&uarr;', '\u2193': '&darr;',
};

const reverseEntities: Record<string, string> = {};
Object.entries(namedEntities).forEach(([char, entity]) => { reverseEntities[entity] = char; });

const referenceTable = [
  { char: '&', named: '&amp;', numeric: '&#38;', desc: 'Ampersand' },
  { char: '<', named: '&lt;', numeric: '&#60;', desc: 'Less than' },
  { char: '>', named: '&gt;', numeric: '&#62;', desc: 'Greater than' },
  { char: '"', named: '&quot;', numeric: '&#34;', desc: 'Double quote' },
  { char: "'", named: '&#39;', numeric: '&#39;', desc: 'Single quote' },
  { char: '\u00a0', named: '&nbsp;', numeric: '&#160;', desc: 'Non-breaking space' },
  { char: '\u00a9', named: '&copy;', numeric: '&#169;', desc: 'Copyright' },
  { char: '\u00ae', named: '&reg;', numeric: '&#174;', desc: 'Registered' },
  { char: '\u2122', named: '&trade;', numeric: '&#8482;', desc: 'Trademark' },
  { char: '\u20ac', named: '&euro;', numeric: '&#8364;', desc: 'Euro sign' },
  { char: '\u00a3', named: '&pound;', numeric: '&#163;', desc: 'Pound sign' },
  { char: '\u00a5', named: '&yen;', numeric: '&#165;', desc: 'Yen sign' },
  { char: '\u2014', named: '&mdash;', numeric: '&#8212;', desc: 'Em dash' },
  { char: '\u2013', named: '&ndash;', numeric: '&#8211;', desc: 'En dash' },
  { char: '\u2026', named: '&hellip;', numeric: '&#8230;', desc: 'Ellipsis' },
  { char: '\u00d7', named: '&times;', numeric: '&#215;', desc: 'Multiplication' },
  { char: '\u00f7', named: '&divide;', numeric: '&#247;', desc: 'Division' },
  { char: '\u2190', named: '&larr;', numeric: '&#8592;', desc: 'Left arrow' },
  { char: '\u2192', named: '&rarr;', numeric: '&#8594;', desc: 'Right arrow' },
  { char: '\u2191', named: '&uarr;', numeric: '&#8593;', desc: 'Up arrow' },
  { char: '\u2193', named: '&darr;', numeric: '&#8595;', desc: 'Down arrow' },
];

function encodeHtmlEntities(text: string, mode: 'named' | 'numeric'): string {
  return text.split('').map(ch => {
    if (mode === 'named' && namedEntities[ch]) return namedEntities[ch];
    if (mode === 'numeric' && ch.charCodeAt(0) > 127) return `&#${ch.charCodeAt(0)};`;
    if (ch === '&') return '&amp;';
    if (ch === '<') return '&lt;';
    if (ch === '>') return '&gt;';
    if (ch === '"') return '&quot;';
    return ch;
  }).join('');
}

function decodeHtmlEntities(text: string): string {
  let result = text;
  // Decode named entities
  Object.entries(reverseEntities).forEach(([entity, char]) => {
    result = result.split(entity).join(char);
  });
  // Decode numeric entities
  result = result.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
  return result;
}

const ui = {
  pageTitle: 'HTML Entity Encoder / Decoder',
  pageDescription: 'Encode and decode HTML entities. Convert special characters to named or numeric HTML entities and back.',
  inputLabel: 'Input Text',
  inputPlaceholder: 'Paste text to encode or HTML entities to decode...',
  outputLabel: 'Output',
  encodeNamed: 'Encode (Named)',
  encodeNumeric: 'Encode (Numeric)',
  decode: 'Decode',
  clear: 'Clear',
  referenceTitle: 'Common HTML Entities Reference',
  character: 'Character',
  named: 'Named',
  numeric: 'Numeric',
  description: 'Description',
  seoTitle: 'What Are HTML Entities?',
  seoContent: 'HTML entities are special codes used to represent characters that have special meaning in HTML or that cannot be easily typed. For example, < and > must be encoded as &lt; and &gt; to display correctly. This tool converts between plain text and HTML entity formats, supporting both named entities (like &amp;) and numeric entities (like &#38;).',
};

export default function HtmlEntityEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolLayout
      title={ui.pageTitle}
      description={ui.pageDescription}
      toolId="html-entity-encoder"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{ui.inputLabel}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={ui.inputPlaceholder}
            style={{ minHeight: 180 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.outputLabel}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 180, background: 'var(--bg-input)' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        <button onClick={() => setOutput(encodeHtmlEntities(input, 'named'))} className="btn btn-primary">{ui.encodeNamed}</button>
        <button onClick={() => setOutput(encodeHtmlEntities(input, 'numeric'))} className="btn btn-primary">{ui.encodeNumeric}</button>
        <button onClick={() => setOutput(decodeHtmlEntities(input))} className="btn btn-primary">{ui.decode}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{ui.clear}</button>
      </div>

      {/* Reference Table */}
      <div style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{ui.referenceTitle}</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{ui.character}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{ui.named}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{ui.numeric}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{ui.description}</th>
              </tr>
            </thead>
            <tbody>
              {referenceTable.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontSize: 16 }}>{row.char}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {row.named} <CopyButton text={row.named} />
                    </span>
                  </td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {row.numeric} <CopyButton text={row.numeric} />
                    </span>
                  </td>
                  <td style={{ padding: '6px 12px', color: 'var(--text-secondary)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{ui.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{ui.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
