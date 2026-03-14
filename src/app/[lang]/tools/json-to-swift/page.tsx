'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

export default function JsonToSwift() {
  const { dict } = useLang();
  const t = dict.tools['json-to-swift'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [structName, setStructName] = useState('ResponseData');

  useEffect(() => {
    const params = getHashParams();
    if (params.json) {
      const decoded = decodeFromUrl(params.json);
      if (decoded) {
        setInput(decoded);
      }
    }
  }, []);

  const handleShare = () => {
    if (!input) return;
    const params = { json: encodeForUrl(input) };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href);
  };

  const convertToSwift = () => {
    try {
      const parsed = JSON.parse(input);
      const swift = generateSwiftCode(parsed, structName);
      setOutput(swift);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const generateSwiftCode = (obj: any, name: string): string => {
    let code = `// Generated Swift Codable struct\nstruct ${name}: Codable {\n`;
    const properties = generateProperties(obj, 1);
    code += properties;
    code += '}\n';
    return code;
  };

  const generateProperties = (obj: any, indent: number): string => {
    const indentStr = '  '.repeat(indent);
    let code = '';
    
    for (const [key, value] of Object.entries(obj)) {
      const swiftKey = escapeSwiftKeyword(key);
      const type = getSwiftType(value);
      code += `${indentStr}let ${swiftKey}: ${type}\n`;
      
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        code += generateNestedStruct(value, key, indent);
      }
    }
    
    return code;
  };

  const generateNestedStruct = (obj: any, name: string, indent: number): string => {
    const indentStr = '  '.repeat(indent);
    const structName = capitalize(name);
    let code = `\n${indentStr}struct ${structName}: Codable {\n`;
    
    for (const [key, value] of Object.entries(obj)) {
      const swiftKey = escapeSwiftKeyword(key);
      const type = getSwiftType(value);
      code += `${indentStr}  let ${swiftKey}: ${type}\n`;
    }
    
    code += `${indentStr}}\n`;
    return code;
  };

  const getSwiftType = (value: any): string => {
    if (value === null) return 'String?';
    if (typeof value === 'string') return 'String';
    if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Double';
    if (typeof value === 'boolean') return 'Bool';
    if (Array.isArray(value)) {
      if (value.length === 0) return '[String]';
      return `[${getSwiftType(value[0])}]`;
    }
    if (typeof value === 'object') return 'Codable';
    return 'String';
  };

  const escapeSwiftKeyword = (key: string): string => {
    const keywords = ['class', 'struct', 'enum', 'protocol', 'func', 'var', 'let', 'init', 'self', 'type', 'for', 'if', 'else', 'while', 'do', 'try', 'catch', 'throw', 'return', 'break', 'continue'];
    const lower = key.toLowerCase();
    if (keywords.includes(lower)) return `\`${key}\``;
    return key.replace(/[^a-zA-Z0-9_]/g, '_');
  };

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, (m) => m.toUpperCase());
  };

  const loadSample = () => {
    const sample = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      active: true,
      tags: ["developer", "swift"],
      address: {
        street: "123 Main St",
        city: "San Francisco",
        country: "USA"
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout toolId="json-to-swift" title={t.pageTitle} description={t.pageDescription}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here..."
            className="w-full h-96 p-3 border border-gray-300 rounded bg-white text-gray-900 font-mono text-sm"
          />
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={structName}
              onChange={(e) => setStructName(e.target.value)}
              placeholder="Struct name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
            />
            <button onClick={convertToSwift} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Convert
            </button>
            <button onClick={loadSample} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Sample
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Swift Codable Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 font-mono text-sm"
          />
          {output && <CopyButton text={output} className="mt-2" />}
        </div>
      </div>

      {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">{t.pageTitle}</h2>
        <p>{t.pageDescription}</p>
      </div>
    </ToolLayout>
  );
}
