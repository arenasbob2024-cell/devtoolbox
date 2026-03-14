'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

const htmlEntities: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&nbsp;': ' ',
  '&cent;': '¢',
  '&pound;': '£',
  '&yen;': '¥',
  '&euro;': '€',
  '&copy;': '©',
  '&reg;': '®',
  '&trade;': '™',
  '&times;': '×',
  '&divide;': '÷',
  '&deg;': '°',
  '&plusmn;': '±',
  '&frac14;': '¼',
  '&frac12;': '½',
  '&frac34;': '¾',
  '&lsquo;': '\u2018',
  '&rsquo;': '\u2019',
  '&ldquo;': '\u201C',
  '&rdquo;': '\u201D',
  '&ndash;': '–',
  '&mdash;': '—',
  '&hellip;': '…',
  '&larr;': '←',
  '&rarr;': '→',
  '&uarr;': '↑',
  '&darr;': '↓',
  '&harr;': '↔',
  '&bull;': '•',
  '&middot;': '·',
  '&permil;': '‰',
  '&dagger;': '†',
  '&Dagger;': '‡',
  '&loz;': '◊',
  '&spades;': '♠',
  '&clubs;': '♣',
  '&hearts;': '♥',
  '&diams;': '♦',
};

export default function HtmlEntityDecoder() {
  const { dict } = useLang();
  const t = dict.tools['html-entity-decoder'];
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState('');
  const [encoded, setEncoded] = useState('');
  const [mode, setMode] = useState<'decode' | 'encode'>('decode');

  useEffect(() => {
    const params = getHashParams();
    if (params.text) {
      const decodedText = decodeFromUrl(params.text);
      if (decodedText) {
        setInput(decodedText);
      }
    }
  }, []);

  const handleShare = () => {
    if (!input) return;
    const params = { text: encodeForUrl(input) };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href);
  };

  const decode = () => {
    let result = input;
    // Decode named entities
    for (const [entity, char] of Object.entries(htmlEntities)) {
      result = result.split(entity).join(char);
    }
    // Decode numeric entities &#123;
    result = result.replace(/&#(\d+);/g, (match, code) => String.fromCharCode(parseInt(code, 10)));
    // Decode hex entities &#x7B;
    result = result.replace(/&#[xX]([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
    
    setDecoded(result);
  };

  const encode = () => {
    let result = input;
    const charsToEncode: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };
    
    for (const [char, entity] of Object.entries(charsToEncode)) {
      result = result.split(char).join(entity);
    }
    
    setEncoded(result);
  };

  const handleDecode = () => {
    decode();
  };

  const handleEncode = () => {
    encode();
  };

  const loadSample = () => {
    setInput('&lt;div&gt;&amp;nbsp;&lt;p&gt;Hello &amp; welcome!&lt;/p&gt;&lt;/div&gt;');
  };

  return (
    <ToolLayout toolId="html-entity-decoder" title={t.pageTitle} description={t.pageDescription}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">HTML Entity Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste HTML entities here..."
            className="w-full h-64 p-3 border border-gray-300 rounded bg-white text-gray-900 font-mono text-sm"
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleDecode}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Decode
            </button>
            <button
              onClick={handleEncode}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Encode
            </button>
            <button
              onClick={loadSample}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Sample
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Output</label>
          {decoded && (
            <>
              <textarea
                value={decoded}
                readOnly
                className="w-full h-32 p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 font-mono text-sm mb-2"
              />
              <CopyButton text={decoded} className="mb-3" />
            </>
          )}
          {encoded && (
            <>
              <textarea
                value={encoded}
                readOnly
                className="w-full h-32 p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 font-mono text-sm mb-2"
              />
              <CopyButton text={encoded} />
            </>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Common HTML Entities Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(htmlEntities).slice(0, 16).map(([entity, char]) => (
            <div key={entity} className="p-2 border border-gray-300 rounded bg-gray-50">
              <div className="text-sm font-mono">{entity}</div>
              <div className="text-lg font-bold">{char}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">{t.pageTitle}</h2>
        <p>{t.pageDescription}</p>
      </div>
    </ToolLayout>
  );
}
