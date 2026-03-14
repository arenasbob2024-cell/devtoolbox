'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

export default function TailwindToCss() {
  const { dict } = useLang();
  const t = dict.tools['tailwind-to-css'];
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [shareCopied, setShareCopied] = useState(false);

  const tailwindMap = {
    'block': 'display: block;',
    'inline-block': 'display: inline-block;',
    'inline': 'display: inline;',
    'flex': 'display: flex;',
    'grid': 'display: grid;',
    'hidden': 'display: none;',
    'flex-row': 'flex-direction: row;',
    'flex-col': 'flex-direction: column;',
    'flex-wrap': 'flex-wrap: wrap;',
    'flex-nowrap': 'flex-wrap: nowrap;',
    'justify-start': 'justify-content: flex-start;',
    'justify-center': 'justify-content: center;',
    'justify-end': 'justify-content: flex-end;',
    'justify-between': 'justify-content: space-between;',
    'items-start': 'align-items: flex-start;',
    'items-center': 'align-items: center;',
    'items-end': 'align-items: flex-end;',
    'gap-1': 'gap: 0.25rem;',
    'gap-2': 'gap: 0.5rem;',
    'gap-4': 'gap: 1rem;',
    'p-1': 'padding: 0.25rem;',
    'p-2': 'padding: 0.5rem;',
    'p-4': 'padding: 1rem;',
    'px-2': 'padding-left: 0.5rem; padding-right: 0.5rem;',
    'py-2': 'padding-top: 0.5rem; padding-bottom: 0.5rem;',
    'm-1': 'margin: 0.25rem;',
    'm-2': 'margin: 0.5rem;',
    'm-4': 'margin: 1rem;',
    'mx-auto': 'margin-left: auto; margin-right: auto;',
    'w-full': 'width: 100%;',
    'w-1/2': 'width: 50%;',
    'h-full': 'height: 100%;',
    'h-32': 'height: 8rem;',
    'h-64': 'height: 16rem;',
    'text-xs': 'font-size: 0.75rem;',
    'text-sm': 'font-size: 0.875rem;',
    'text-base': 'font-size: 1rem;',
    'text-lg': 'font-size: 1.125rem;',
    'text-xl': 'font-size: 1.25rem;',
    'text-2xl': 'font-size: 1.5rem;',
    'font-bold': 'font-weight: 700;',
    'font-semibold': 'font-weight: 600;',
    'font-medium': 'font-weight: 500;',
    'font-normal': 'font-weight: 400;',
    'font-light': 'font-weight: 300;',
    'text-white': 'color: rgb(255, 255, 255);',
    'text-black': 'color: rgb(0, 0, 0);',
    'text-gray-600': 'color: rgb(75, 85, 99);',
    'bg-white': 'background-color: rgb(255, 255, 255);',
    'bg-black': 'background-color: rgb(0, 0, 0);',
    'bg-blue-500': 'background-color: rgb(59, 130, 246);',
    'bg-red-500': 'background-color: rgb(239, 68, 68);',
    'bg-green-500': 'background-color: rgb(34, 197, 94);',
    'bg-gray-100': 'background-color: rgb(243, 244, 246);',
    'border': 'border: 1px solid rgb(209, 213, 219);',
    'border-2': 'border: 2px solid rgb(209, 213, 219);',
    'rounded': 'border-radius: 0.25rem;',
    'rounded-lg': 'border-radius: 0.5rem;',
    'rounded-full': 'border-radius: 9999px;',
    'shadow': 'box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);',
    'shadow-lg': 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);',
    'translate-x-1': 'transform: translateX(0.25rem);',
    'scale-100': 'transform: scale(1);',
    'opacity-50': 'opacity: 0.5;',
    'opacity-100': 'opacity: 1;',
  };

  useEffect(() => {
    const params = getHashParams();
    if (params.tw) {
      const decoded = decodeFromUrl(params.tw);
      if (decoded) {
        setInput(decoded);
        convertTailwind(decoded);
      }
    }
  }, []);

  const convertTailwind = (classes) => {
    if (!classes.trim()) {
      setResults([]);
      return;
    }

    const classNames = classes.split(/\s+/).filter((cls) => cls.length > 0);

    const converted = classNames.map((className) => {
      const css = tailwindMap[className];
      return {
        className,
        css: css || `/* Unknown class: ${className} */`,
        supported: Boolean(css),
      };
    });

    setResults(converted);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    convertTailwind(text);
  };

  const generateFullCss = () => {
    const css = results
      .filter((r) => r.supported)
      .map((r) => `.${r.className.replace(/[:/]/g, '\\$&')} { ${r.css} }`)
      .join('\n\n');
    return css;
  };

  const handleShare = () => {
    if (!input) return;
    const params = { tw: encodeForUrl(input) };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const loadSample = () => {
    const sample = 'flex flex-col justify-center items-center gap-4 p-6 bg-blue-500 rounded-lg shadow-lg text-white text-lg font-bold';
    setInput(sample);
    convertTailwind(sample);
  };

  const fullCss = generateFullCss();
  const unsupported = results.filter((r) => !r.supported).length;

  return (
    <ToolLayout toolId="tailwind-to-css">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">{t.inputLabel || 'Tailwind Classes'}</label>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder={t.inputPlaceholder || 'Enter Tailwind CSS classes (space-separated)...'}
            className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t.outputLabel || 'CSS Output'}</label>
          <div
            className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm overflow-auto relative"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
            }}
          >
            {fullCss ? (
              <>
                <pre className="whitespace-pre-wrap break-words">{fullCss}</pre>
                <CopyButton text={fullCss} />
              </>
            ) : (
              <p className="text-gray-400">{t.outputPlaceholder || 'CSS will appear here...'}</p>
            )}
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{t.breakdown || 'Class Breakdown'}</h3>
            {unsupported > 0 && (
              <span className="text-sm text-orange-600">
                {unsupported} unsupported class{unsupported !== 1 ? 'es' : ''}
              </span>
            )}
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border-l-4 font-mono text-sm ${
                  result.supported
                    ? 'border-green-500 bg-green-50'
                    : 'border-orange-500 bg-orange-50'
                }`}
                style={
                  result.supported
                    ? {}
                    : {
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                      }
                }
              >
                <div className="font-semibold text-blue-600">{result.className}</div>
                <div className="text-gray-600 mt-1">{result.css}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={loadSample} className="btn btn-secondary">
          {t.loadSample || 'Load Sample'}
        </button>
        <button onClick={() => setInput('')} className="btn btn-secondary">
          {t.clear || 'Clear'}
        </button>
        <button onClick={handleShare} className="btn btn-secondary">
          {shareCopied ? '✓ Copied!' : 'Share'}
        </button>
      </div>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">{t.seoTitle || 'Tailwind to CSS Converter'}</h2>
        <p className="text-gray-600 mb-4">{t.seoContent || 'Convert Tailwind CSS utility classes to standard CSS declarations. Perfect for understanding how Tailwind works or integrating classes into non-Tailwind projects.'}</p>

        <h3 className="text-xl font-bold mb-3 mt-6">{t.seoFeaturesTitle || 'Supported Categories'}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>{t.seoFeature1 || 'Display properties (block, flex, grid, hidden)'}</li>
          <li>{t.seoFeature2 || 'Flexbox utilities (justify, items, gap)'}</li>
          <li>{t.seoFeature3 || 'Spacing (padding, margin)'}</li>
          <li>{t.seoFeature4 || 'Size utilities (width, height)'}</li>
          <li>{t.seoFeature5 || 'Typography (font-size, font-weight)'}</li>
          <li>{t.seoFeature6 || 'Colors and backgrounds'}</li>
          <li>{t.seoFeature7 || 'Borders and border-radius'}</li>
          <li>{t.seoFeature8 || 'Shadows and transforms'}</li>
        </ul>

        {t.faqs && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">{t.faqTitle || 'FAQ'}</h3>
            <div className="space-y-4">
              {t.faqs.map((faq, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </ToolLayout>
  );
}
