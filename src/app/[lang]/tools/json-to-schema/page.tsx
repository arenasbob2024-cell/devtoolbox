'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

function inferSchema(value: any): any {
  if (value === null) return { type: 'null' };
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: 'array', items: {} };
    const itemSchemas = value.map(inferSchema);
    return { type: 'array', items: itemSchemas[0] };
  }
  if (typeof value === 'object') {
    const properties: any = {};
    const required: string[] = [];
    for (const [key, val] of Object.entries(value)) {
      properties[key] = inferSchema(val);
      required.push(key);
    }
    return { type: 'object', properties, required };
  }
  if (typeof value === 'string') {
    const schema: any = { type: 'string' };
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) schema.format = 'date-time';
    else if (/^[^@]+@[^@]+\.[^@]+$/.test(value)) schema.format = 'email';
    else if (/^https?:\/\//.test(value)) schema.format = 'uri';
    return schema;
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { type: 'integer' } : { type: 'number' };
  }
  if (typeof value === 'boolean') return { type: 'boolean' };
  return {};
}

export default function JsonToSchema() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const generate = () => {
    try {
      setError('');
      const data = JSON.parse(input);
      const schema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'Generated Schema',
        description: 'Auto-generated JSON Schema from sample data',
        ...inferSchema(data)
      };
      setOutput(JSON.stringify(schema, null, 2));
    } catch (e) {
      setError('Invalid JSON input. Please check your JSON syntax.');
    }
  };

  const sample = JSON.stringify({
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "isActive": true,
    "address": { "street": "123 Main St", "city": "Anytown", "zipCode": "12345" },
    "tags": ["developer", "designer"],
    "website": "https://example.com"
  }, null, 2);

  return (
    <ToolLayout toolId="json-to-schema" lang={lang}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-300">JSON Input</label>
            <button onClick={() => setInput(sample)} className="text-xs text-blue-400 hover:text-blue-300">Load Sample</button>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key": "value"}' className="w-full h-80 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" spellCheck={false} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">JSON Schema Output</label>
          <textarea value={output} readOnly className="w-full h-80 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" />
        </div>
      </div>
      {error && <div className="mt-2 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">{error}</div>}
      <div className="flex gap-2 mt-4">
        <button onClick={generate} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">📋 Generate Schema</button>
        <button onClick={() => output && navigator.clipboard.writeText(output)} className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">Copy Schema</button>
      </div>
    </ToolLayout>
  );
}