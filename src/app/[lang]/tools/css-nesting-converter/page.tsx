'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function CssNestingConverter() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<'toNested' | 'toFlat'>('toNested');

  const convert = () => {
    if (!input.trim()) return;

    if (direction === 'toNested') {
      // Group selectors by their parent
      const rules: Array<{ selector: string; props: string[] }> = [];
      const lines = input.split('}');

      for (const block of lines) {
        const parts = block.split('{');
        if (parts.length === 2) {
          const selector = parts[0].trim();
          const props = parts[1].trim().split(';').filter(p => p.trim()).map(p => p.trim() + ';');
          if (selector && props.length) {
            rules.push({ selector, props });
          }
        }
      }

      // Group by parent selector
      const groups: Record<string, Array<{ child: string; props: string[] }>> = {};
      const standalone: typeof rules = [];

      for (const rule of rules) {
        const parts = rule.selector.split(/\s+/);
        if (parts.length > 1) {
          const parent = parts[0];
          const child = parts.slice(1).join(' ');
          if (!groups[parent]) groups[parent] = [];
          groups[parent].push({ child, props: rule.props });
        } else {
          standalone.push(rule);
        }
      }

      let result = '';
      for (const rule of standalone) {
        const nested = groups[rule.selector] || [];
        result += `${rule.selector} {\n`;
        for (const prop of rule.props) {
          result += `  ${prop}\n`;
        }
        for (const child of nested) {
          result += `\n  & ${child.child} {\n`;
          for (const prop of child.props) {
            result += `    ${prop}\n`;
          }
          result += `  }\n`;
        }
        result += `}\n\n`;
        delete groups[rule.selector];
      }

      // Remaining groups without standalone parent
      for (const [parent, children] of Object.entries(groups)) {
        result += `${parent} {\n`;
        for (const child of children) {
          result += `  & ${child.child} {\n`;
          for (const prop of child.props) {
            result += `    ${prop}\n`;
          }
          result += `  }\n`;
        }
        result += `}\n\n`;
      }

      setOutput(result.trim());
    } else {
      // Flatten nested CSS
      let result = input
        .replace(/&\s*/g, '')
        .replace(/\n\s*\n/g, '\n');
      setOutput(result);
    }
  };

  const sample = `.card {
  padding: 1rem;
  border-radius: 8px;
}

.card .title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card .content {
  margin-top: 0.5rem;
  color: #666;
}

.card .footer {
  margin-top: 1rem;
  border-top: 1px solid #eee;
}`;

  return (
    <ToolLayout toolId="css-nesting-converter" lang={lang}>
      <div className="space-y-4">
        <div className="flex gap-2 mb-2">
          <button onClick={() => setDirection('toNested')} className={`px-3 py-1.5 rounded text-sm ${direction === 'toNested' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Flat → Nested</button>
          <button onClick={() => setDirection('toFlat')} className={`px-3 py-1.5 rounded text-sm ${direction === 'toFlat' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Nested → Flat</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-300">{direction === 'toNested' ? 'Flat CSS Input' : 'Nested CSS Input'}</label>
              <button onClick={() => setInput(sample)} className="text-xs text-blue-400 hover:text-blue-300">Load Sample</button>
            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" spellCheck={false} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{direction === 'toNested' ? 'Nested CSS Output' : 'Flat CSS Output'}</label>
            <textarea value={output} readOnly className="w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={convert} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">🪆 Convert</button>
          <button onClick={() => output && navigator.clipboard.writeText(output)} className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">Copy</button>
        </div>
        <div className="p-3 bg-gray-800 rounded-lg text-sm text-gray-400">
          <p className="font-medium text-gray-300 mb-1">Browser Support (2026):</p>
          <p>✅ Chrome 120+ · ✅ Firefox 117+ · ✅ Safari 17.2+ · ✅ Edge 120+</p>
        </div>
      </div>
    </ToolLayout>
  );
}