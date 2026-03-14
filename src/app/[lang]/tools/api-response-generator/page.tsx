'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface Field {
  name: string;
  type: string;
  isArray: boolean;
  count?: number;
}

const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Olivia', 'Robert', 'Sophia'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'test.com'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Japan', 'Brazil'];

export default function ApiResponseGenerator() {
  const { dict } = useLang();
  const t = dict.tools['api-response-generator'];
  const [fields, setFields] = useState<Field[]>([
    { name: 'id', type: 'number', isArray: false },
    { name: 'name', type: 'string', isArray: false },
    { name: 'email', type: 'email', isArray: false },
  ]);
  const [recordCount, setRecordCount] = useState(5);
  const [output, setOutput] = useState('');

  const generateFakeData = (type: string): string | number | boolean => {
    switch (type) {
      case 'string':
        return firstNames[Math.floor(Math.random() * firstNames.length)];
      case 'number':
        return Math.floor(Math.random() * 10000);
      case 'email':
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase();
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${fn}.${Math.floor(Math.random() * 1000)}@${domain}`;
      case 'name':
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${first} ${last}`;
      case 'address':
        const street = Math.floor(Math.random() * 9999) + 1;
        const city = cities[Math.floor(Math.random() * cities.length)];
        return `${street} Main St, ${city}`;
      case 'date':
        const date = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
        return date.toISOString().split('T')[0];
      case 'boolean':
        return Math.random() > 0.5;
      case 'country':
        return countries[Math.floor(Math.random() * countries.length)];
      default:
        return `value_${Math.floor(Math.random() * 1000)}`;
    }
  };

  const generateResponse = () => {
    const data: any[] = [];
    for (let i = 0; i < recordCount; i++) {
      const record: any = {};
      for (const field of fields) {
        if (field.isArray) {
          const arrayLength = field.count || 3;
          record[field.name] = Array.from({ length: arrayLength }, () => generateFakeData(field.type));
        } else {
          record[field.name] = generateFakeData(field.type);
        }
      }
      data.push(record);
    }

    const response = {
      success: true,
      message: 'Data retrieved successfully',
      data: data,
      total: recordCount,
      timestamp: new Date().toISOString(),
    };

    setOutput(JSON.stringify(response, null, 2));
  };

  const addField = () => {
    setFields([...fields, { name: 'field_' + fields.length, type: 'string', isArray: false }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: any) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], [key]: value };
    setFields(updated);
  };

  return (
    <ToolLayout toolId="api-response-generator" title={t.pageTitle} description={t.pageDescription}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-bold mb-4">Schema Definition</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Number of Records</label>
            <input
              type="number"
              min="1"
              max="100"
              value={recordCount}
              onChange={(e) => setRecordCount(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
            />
          </div>

          <div className="mb-4 border-t pt-4">
            <h4 className="font-medium mb-3">Fields</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {fields.map((field, idx) => (
                <div key={idx} className="p-3 border border-gray-300 rounded bg-gray-50">
                  <input
                    type="text"
                    placeholder="Field name"
                    value={field.name}
                    onChange={(e) => updateField(idx, 'name', e.target.value)}
                    className="w-full px-2 py-1 mb-2 border border-gray-300 rounded bg-white text-gray-900 text-sm"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => updateField(idx, 'type', e.target.value)}
                    className="w-full px-2 py-1 mb-2 border border-gray-300 rounded bg-white text-gray-900 text-sm"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="email">Email</option>
                    <option value="name">Full Name</option>
                    <option value="address">Address</option>
                    <option value="date">Date</option>
                    <option value="country">Country</option>
                  </select>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={field.isArray}
                      onChange={(e) => updateField(idx, 'isArray', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Array</span>
                  </label>
                  {field.isArray && (
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Array count"
                      value={field.count || 3}
                      onChange={(e) => updateField(idx, 'count', parseInt(e.target.value))}
                      className="w-full px-2 py-1 mb-2 border border-gray-300 rounded bg-white text-gray-900 text-sm"
                    />
                  )}
                  <button
                    onClick={() => removeField(idx)}
                    className="w-full px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={addField}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              + Add Field
            </button>
            <button
              onClick={generateResponse}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            >
              Generate Response
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">JSON Response Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 font-mono text-sm"
          />
          {output && <CopyButton text={output} className="mt-2" />}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">{t.pageTitle}</h2>
        <p>{t.pageDescription}</p>
      </div>
    </ToolLayout>
  );
}
