'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

export default function JsonToProto() {
  const { dict } = useLang();
  const t = dict.tools['json-to-proto'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [messageName, setMessageName] = useState('Data');
  const [protoVersion, setProtoVersion] = useState('proto3');
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const params = getHashParams();
    if (params.json) {
      const decoded = decodeFromUrl(params.json);
      if (decoded) {
        setInput(decoded);
        convertJsonToProto(decoded);
      }
    }
  }, []);

  const detectType = (value) => {
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'bool';
    if (typeof value === 'number') {
      return Number.isInteger(value) ? 'int32' : 'double';
    }
    if (Array.isArray(value) && value.length > 0) {
      return detectType(value[0]);
    }
    return 'string';
  };

  const toPascalCase = (str) => {
    return str
      .replace(/[\s_-]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
      .replace(/^./, (char) => char.toUpperCase());
  };

  const generateProtoMessages = (obj, name = messageName, depth = 0) => {
    const indent = '  '.repeat(depth);
    const nextIndent = '  '.repeat(depth + 1);
    let proto = `${indent}message ${name} {\n`;
    let fieldNumber = 1;
    let nestedMessages = '';

    const entries = Object.entries(obj).filter(([key]) => !key.startsWith('_'));

    for (const [key, value] of entries) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const msgName = toPascalCase(key);
        nestedMessages += generateProtoMessages(value, msgName, depth + 1) + '\n';
        proto += `${nextIndent}${msgName} ${key} = ${fieldNumber++};\n`;
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          const msgName = toPascalCase(key.replace(/s$/, ''));
          nestedMessages += generateProtoMessages(value[0], msgName, depth + 1) + '\n';
          proto += `${nextIndent}repeated ${msgName} ${key} = ${fieldNumber++};\n`;
        } else {
          const itemType = value.length > 0 ? detectType(value[0]) : 'string';
          proto += `${nextIndent}repeated ${itemType} ${key} = ${fieldNumber++};\n`;
        }
      } else {
        const type = detectType(value);
        proto += `${nextIndent}${type} ${key} = ${fieldNumber++};\n`;
      }
    }

    proto += `${indent}}\n`;
    return nestedMessages + proto;
  };

  const convertJsonToProto = (json, msg = messageName, version = protoVersion) => {
    try {
      const parsed = JSON.parse(json);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('Top-level must be a JSON object');
      }

      const messages = generateProtoMessages(parsed, msg);
      const header = `syntax = "${version}";\n\n`;
      const full = header + messages;

      setOutput(full);
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
    convertJsonToProto(input, messageName, protoVersion);
  };

  const handleShare = () => {
    if (!input) return;
    const params = { json: encodeForUrl(input) };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const loadSample = () => {
    const sample = JSON.stringify({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      age: 30,
      active: true,
      tags: ['admin', 'user'],
      address: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001',
      },
    }, null, 2);
    setInput(sample);
    convertJsonToProto(sample);
  };

  return (
    <ToolLayout toolId="json-to-proto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">{t.inputLabel || 'Input JSON'}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || 'Paste your JSON object here...'}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t.outputLabel || 'Output .proto'}</label>
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

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t.messageName || 'Message Name'}</label>
          <input
            type="text"
            value={messageName}
            onChange={(e) => setMessageName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t.protoVersion || 'Proto Version'}</label>
          <select
            value={protoVersion}
            onChange={(e) => setProtoVersion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <option value="proto3">proto3</option>
            <option value="proto2">proto2</option>
          </select>
        </div>
      </div>

      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={handleConvert} className="btn btn-primary">
          {t.convert || 'Convert'}
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
        <h2 className="text-2xl font-bold mb-4">{t.seoTitle || 'JSON to Protocol Buffer Generator'}</h2>
        <p className="text-gray-600 mb-4">{t.seoContent || 'Convert JSON objects into Protocol Buffer (.proto) message definitions. Automatically detect field types, handle nested messages, and generate proto3 or proto2 syntax.'}</p>

        <h3 className="text-xl font-bold mb-3 mt-6">{t.seoFeaturesTitle || 'Features'}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>{t.seoFeature1 || 'Automatic type detection (string, int32, bool, double)'}</li>
          <li>{t.seoFeature2 || 'Generate nested message definitions'}</li>
          <li>{t.seoFeature3 || 'Handle JSON arrays as repeated fields'}</li>
          <li>{t.seoFeature4 || 'Support proto3 and proto2 syntax'}</li>
          <li>{t.seoFeature5 || 'Customizable message name'}</li>
          <li>{t.seoFeature6 || '100% client-side processing'}</li>
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
