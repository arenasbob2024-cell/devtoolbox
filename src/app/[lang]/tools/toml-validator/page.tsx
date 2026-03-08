'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

// Simple TOML parser for validation
function validateToml(input: string): { valid: boolean; error?: string; line?: number } {
  const lines = input.split('\n');
  let inMultilineString = false;
  let inArray = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;

    if (inMultilineString) {
      if (line.includes('"""') || line.includes("'''")) inMultilineString = false;
      continue;
    }

    if (line.includes('"""') || line.includes("'''")) {
      const count = (line.match(/"""/g) || []).length + (line.match(/'''/g) || []).length;
      if (count % 2 !== 0) inMultilineString = true;
      continue;
    }

    // Table headers
    if (line.startsWith('[')) {
      if (!line.match(/^\[\[?[\w.\s"-]+\]\]?$/)) {
        return { valid: false, error: `Invalid table header: ${line}`, line: i + 1 };
      }
      continue;
    }

    // Key-value pairs
    if (line.includes('=')) {
      const eqIdx = line.indexOf('=');
      const key = line.substring(0, eqIdx).trim();
      if (!key || !key.match(/^[\w."'-][\w.\s"'-]*$/)) {
        return { valid: false, error: `Invalid key: ${key}`, line: i + 1 };
      }
      continue;
    }

    if (line === ']' || line === ']]') continue;

    return { valid: false, error: `Unexpected content: ${line}`, line: i + 1 };
  }

  return { valid: true };
}

export default function TomlValidator() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ valid: boolean; error?: string; line?: number } | null>(null);

  const validate = () => {
    if (!input.trim()) return;
    setResult(validateToml(input));
  };

  const sample = `[package]
name = "my-project"
version = "0.1.0"
edition = "2021"
description = "A sample Rust project"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.0", features = ["full"] }

[dev-dependencies]
criterion = "0.5"`;

  return (
    <ToolLayout toolId="toml-validator" lang={lang}>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-300">TOML Input</label>
          <button onClick={() => setInput(sample)} className="text-xs text-blue-400 hover:text-blue-300">Load Sample</button>
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your TOML content here..." className="w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" spellCheck={false} />

        <div className="flex gap-2">
          <button onClick={validate} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">✅ Validate TOML</button>
          <button onClick={() => input && navigator.clipboard.writeText(input)} className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">Copy</button>
        </div>

        {result && (
          <div className={`p-4 rounded-lg border ${result.valid ? 'bg-green-900/30 border-green-700 text-green-300' : 'bg-red-900/30 border-red-700 text-red-300'}`}>
            {result.valid ? (
              <p>✅ Valid TOML! No syntax errors found.</p>
            ) : (
              <p>❌ Error on line {result.line}: {result.error}</p>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}