'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

export default function HtmlToJsx() {
  const { dict } = useLang();
  const t = dict.tools['html-to-jsx'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const params = getHashParams();
    if (params.html) {
      const decoded = decodeFromUrl(params.html);
      if (decoded) {
        setInput(decoded);
        convertHtmlToJsx(decoded);
      }
    }
  }, []);

  const convertHtmlToJsx = (html: string) => {
    try {
      let jsx = html
        .replace(/\bclass=/g, 'className=')
        .replace(/\bfor=/g, 'htmlFor=')
        .replace(/style="([^"]+)"/g, (match, styleStr) => {
          const styles = styleStr.split(';').filter((s) => s.trim());
          const styleObj = {};
          styles.forEach((style) => {
            const [key, value] = style.split(':').map((s) => s.trim());
            if (key && value) {
              const camelKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
              styleObj[camelKey] = value;
            }
          });
          return `style={{ ${Object.entries(styleObj)
            .map(([k, v]) => `${k}: '${v}'`)
            .join(', ')} }}`;
        })
        .replace(/(<(?:img|input|br|hr|meta|link)[^>]*?)>/g, '$1 />')
        .replace(/\bon(\w+)=/g, (match, event) => {
          const camelEvent = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
          return camelEvent + '=';
        });

      setOutput(jsx);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion error');
      setOutput('');
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError(t.inputRequired || 'Input required');
      return;
    }
    convertHtmlToJsx(input);
  };

  const handleShare = () => {
    if (!input) return;
    const params = { html: encodeForUrl(input) };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const loadSample = () => {
    const sample = `<div class="container">
  <h1>Hello JSX</h1>
  <label for="name">Name:</label>
  <input type="text" id="name" style="padding: 8px; border: 1px solid #ccc;" />
  <button onclick="handleClick()">Click me</button>
  <img src="image.png" alt="Sample" />
</div>`;
    setInput(sample);
    convertHtmlToJsx(sample);
  };

  return (
    <ToolLayout toolId="html-to-jsx">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">{t.inputLabel || 'Input HTML'}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || 'Paste your HTML here...'}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t.outputLabel || 'Output JSX'}</label>
          <div
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm overflow-auto relative"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
            }}
          >
            {output ? (
              <>
                <pre className="whitespace-pre-wrap break-words">{output}</pre>
                <CopyButton text={output} />
              </>
            ) : (
              <p className="text-gray-400">{t.outputPlaceholder || 'Output will appear here...'}</p>
            )}
          </div>
        </div>
      </div>

      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={handleConvert} className="btn btn-primary">
          {t.convert || 'Convert to JSX'}
        </button>
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
        <h2 className="text-2xl font-bold mb-4">{t.seoTitle || 'What is HTML to JSX Conversion?'}</h2>
        <p className="text-gray-600 mb-4">{t.seoContent || 'Convert HTML markup to JSX syntax for React development. Automatically handles className, htmlFor, event handlers, style objects, and self-closing tags.'}</p>

        <h3 className="text-xl font-bold mb-3 mt-6">{t.seoFeaturesTitle || 'Key Features'}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>{t.seoFeature1 || 'Convert class attributes to className'}</li>
          <li>{t.seoFeature2 || 'Convert for attributes to htmlFor for labels'}</li>
          <li>{t.seoFeature3 || 'Transform style strings to style objects'}</li>
          <li>{t.seoFeature4 || 'Handle event handlers (onclick → onClick)'}</li>
          <li>{t.seoFeature5 || 'Support data-* attributes (pass-through)'}</li>
          <li>{t.seoFeature6 || '100% client-side — your code stays private'}</li>
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
