'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

export default function TextCaseConverter() {
  const { dict } = useLang();
  const t = dict.tools['text-case-converter'];
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState([]);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const params = getHashParams();
    if (params.text) {
      const decoded = decodeFromUrl(params.text);
      if (decoded) {
        setInput(decoded);
        convertText(decoded);
      }
    }
  }, []);

  const toCamelCase = (str) => {
    return str
      .replace(/[\s_-]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
      .replace(/^./, (char) => char.toLowerCase());
  };

  const toPascalCase = (str) => {
    return str
      .replace(/[\s_-]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
      .replace(/^./, (char) => char.toUpperCase());
  };

  const toSnakeCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  };

  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  };

  const toConstantCase = (str) => {
    return toSnakeCase(str).toUpperCase();
  };

  const toTitleCase = (str) => {
    return str
      .replace(/[\s_-]+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const toLowerCase = (str) => {
    return str.toLowerCase();
  };

  const toUpperCase = (str) => {
    return str.toUpperCase();
  };

  const toDotCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1.$2')
      .replace(/[\s_-]+/g, '.')
      .toLowerCase();
  };

  const toPathCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1/$2')
      .replace(/[\s_.-]+/g, '/')
      .toLowerCase();
  };

  const convertText = (text) => {
    if (!text.trim()) {
      setOutputs([]);
      return;
    }

    const results = [
      { label: 'camelCase', value: toCamelCase(text), key: 'camel' },
      { label: 'PascalCase', value: toPascalCase(text), key: 'pascal' },
      { label: 'snake_case', value: toSnakeCase(text), key: 'snake' },
      { label: 'kebab-case', value: toKebabCase(text), key: 'kebab' },
      { label: 'CONSTANT_CASE', value: toConstantCase(text), key: 'constant' },
      { label: 'Title Case', value: toTitleCase(text), key: 'title' },
      { label: 'lowercase', value: toLowerCase(text), key: 'lower' },
      { label: 'UPPERCASE', value: toUpperCase(text), key: 'upper' },
      { label: 'dot.case', value: toDotCase(text), key: 'dot' },
      { label: 'path/case', value: toPathCase(text), key: 'path' },
    ];

    setOutputs(results);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    convertText(text);
  };

  const handleShare = () => {
    if (!input) return;
    const params = { text: encodeForUrl(input) };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  return (
    <ToolLayout toolId="text-case-converter">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">{t.inputLabel || 'Enter Text'}</label>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder={t.inputPlaceholder || 'Enter your text here and see all case conversions...'}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
            }}
          />
        </div>

        {outputs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outputs.map((output) => (
              <div
                key={output.key}
                className="p-4 border border-gray-300 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">{output.label}</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={output.value}
                    readOnly
                    className="w-full px-3 py-2 font-mono text-sm bg-gray-50 border border-gray-200 rounded"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(output.value);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 text-xs font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!input.trim() && (
          <div className="text-center py-12 text-gray-400">
            <p>{t.placeholderMessage || 'Start typing to see all case conversions...'}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setInput('');
              setOutputs([]);
            }}
            className="btn btn-secondary"
          >
            {t.clear || 'Clear'}
          </button>
          <button onClick={handleShare} className="btn btn-secondary">
            {shareCopied ? '✓ Copied!' : 'Share'}
          </button>
        </div>
      </div>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">{t.seoTitle || 'Text Case Converter Guide'}</h2>
        <p className="text-gray-600 mb-4">{t.seoContent || 'Instantly convert text between 10 different case styles. Perfect for coding, variable naming, and text formatting. All conversions happen instantly in your browser.'}</p>

        <h3 className="text-xl font-bold mb-3 mt-6">{t.seoFeaturesTitle || 'Supported Case Styles'}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>{t.seoFeature1 || 'camelCase — first word lowercase, subsequent words capitalized'}</li>
          <li>{t.seoFeature2 || 'PascalCase — each word capitalized, no spaces'}</li>
          <li>{t.seoFeature3 || 'snake_case — words separated by underscores, lowercase'}</li>
          <li>{t.seoFeature4 || 'kebab-case — words separated by hyphens, lowercase'}</li>
          <li>{t.seoFeature5 || 'CONSTANT_CASE — all uppercase with underscores'}</li>
          <li>{t.seoFeature6 || 'Title Case — each word capitalized with spaces'}</li>
          <li>{t.seoFeature7 || 'dot.case — words separated by dots, lowercase'}</li>
          <li>{t.seoFeature8 || 'path/case — words separated by slashes, lowercase'}</li>
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
