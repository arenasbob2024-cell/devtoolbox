'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function JsToTsx() {
  const { dict, lang } = useLang();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    let code = input;

    // Add React import if not present
    if (!code.includes("import React") && !code.includes("from 'react'") && !code.includes('from "react"')) {
      code = "import React from 'react';\n" + code;
    }

    // Convert function components: function Name(props) -> function Name(props: NameProps): React.ReactElement
    code = code.replace(
      /function\s+(\w+)\s*\(\s*(\w+)?\s*\)/g,
      (match, name, props) => {
        if (props) {
          return `interface ${name}Props {\n  // TODO: Add prop types\n  [key: string]: any;\n}\n\nfunction ${name}(${props}: ${name}Props): React.ReactElement`;
        }
        return `function ${name}(): React.ReactElement`;
      }
    );

    // Convert arrow function components: const Name = (props) => -> const Name: React.FC<NameProps> = (props)
    code = code.replace(
      /const\s+(\w+)\s*=\s*\(\s*(\w+)?\s*\)\s*=>/g,
      (match, name, props) => {
        if (props) {
          return `interface ${name}Props {\n  // TODO: Add prop types\n  [key: string]: any;\n}\n\nconst ${name}: React.FC<${name}Props> = (${props}): React.ReactElement =>`;
        }
        return `const ${name}: React.FC = (): React.ReactElement =>`;
      }
    );

    // Add type annotations to useState
    code = code.replace(
      /useState\(([^)]+)\)/g,
      (match, initial) => {
        if (initial === "''") return "useState<string>('')";
        if (initial === '""') return 'useState<string>("")';
        if (initial === '0' || /^\d+$/.test(initial.trim())) return `useState<number>(${initial})`;
        if (initial === 'true' || initial === 'false') return `useState<boolean>(${initial})`;
        if (initial === '[]') return `useState<any[]>(${initial})`;
        if (initial === 'null') return `useState<any | null>(${initial})`;
        return match;
      }
    );

    // Convert event handlers
    code = code.replace(/\(e\)\s*=>/g, '(e: React.ChangeEvent<HTMLInputElement>) =>');
    code = code.replace(/\(event\)\s*=>/g, '(event: React.FormEvent) =>');

    // Add .tsx file extension comment
    code = '// File: component.tsx\n' + code;

    setOutput(code);
  };

  return (
    <ToolLayout toolId="js-to-tsx" lang={lang}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">JavaScript / JSX Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your JS/JSX code here..." className="w-full h-72 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500" spellCheck={false} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">TypeScript / TSX Output</label>
          <textarea value={output} readOnly className="w-full h-72 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={convert} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">⚡ Convert to TSX</button>
        <button onClick={() => output && navigator.clipboard.writeText(output)} className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">Copy Output</button>
      </div>
    </ToolLayout>
  );
}