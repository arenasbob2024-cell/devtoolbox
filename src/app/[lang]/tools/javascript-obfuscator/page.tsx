'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JavaScriptObfuscator() {
  const { dict } = useLang();
  const t = dict.tools['javascript-obfuscator'];
  const [jsInput, setJsInput] = useState('');
  const [jsOutput, setJsOutput] = useState('');
  const [error, setError] = useState('');
  const [renameVars, setRenameVars] = useState(true);
  const [encodeStrings, setEncodeStrings] = useState(true);
  const [removeComments, setRemoveComments] = useState(true);

  const obfuscateCode = () => {
    setError('');
    setJsOutput('');

    if (!jsInput.trim()) {
      setError('JavaScript code is required');
      return;
    }

    try {
      let output = jsInput;

      // Remove comments
      if (removeComments) {
        output = output
          .replace(/\/\/.*$/gm, '')
          .replace(/\/\*[\s\S]*?\*\//g, '');
      }

      // Minify whitespace
      output = output
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}();,])\s*/g, '$1');

      // Rename variables (simple approach - replace common var names)
      if (renameVars) {
        const varMap: { [key: string]: string } = {};
        let varCounter = 0;
        const generateName = () => {
          const names = ['_0x' + varCounter.toString(16)];
          varCounter++;
          return names[0];
        };

        // Find all variable declarations
        const varRegex = /\b(var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
        const vars = new Set<string>();
        let match;

        const regex = new RegExp(varRegex);
        while ((match = regex.exec(output)) !== null) {
          vars.add(match[2]);
        }

        // Replace variables (skip common ones like console, document, etc.)
        const reserved = new Set([
          'console',
          'document',
          'window',
          'location',
          'Math',
          'JSON',
          'String',
          'Array',
          'Object',
          'function',
          'return',
        ]);

        vars.forEach((varName) => {
          if (!reserved.has(varName)) {
            if (!varMap[varName]) {
              varMap[varName] = generateName();
            }
            output = output.replace(new RegExp(`\\b${varName}\\b`, 'g'), varMap[varName]);
          }
        });
      }

      // Encode strings
      if (encodeStrings) {
        output = output.replace(/'([^']*)'/g, (match, str) => {
          const encoded = btoa(str);
          return `atob('${encoded}')`;
        });
      }

      setJsOutput(output);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Error';
      setError(`Obfuscation Error: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sample = `function greet(name) {
  // This is a greeting function
  const message = "Hello, " + name + "!";
  console.log(message);
  return message;
}

const user = "Alice";
greet(user);`;
    setJsInput(sample);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="javascript-obfuscator"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={obfuscateCode} className="btn btn-primary">
          Obfuscate
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {dict.common.loadSample}
        </button>
        <button
          onClick={() => {
            setJsInput('');
            setJsOutput('');
            setError('');
          }}
          className="btn btn-secondary"
        >
          {dict.common.clear}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
          <input
            type="checkbox"
            checked={renameVars}
            onChange={(e) => setRenameVars(e.target.checked)}
          />
          Rename Variables
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
          <input
            type="checkbox"
            checked={encodeStrings}
            onChange={(e) => setEncodeStrings(e.target.checked)}
          />
          Encode Strings (Base64)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
          <input
            type="checkbox"
            checked={removeComments}
            onChange={(e) => setRemoveComments(e.target.checked)}
          />
          Remove Comments
        </label>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: 'var(--accent-rose)',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Original JavaScript
          </label>
          <textarea
            value={jsInput}
            onChange={(e) => setJsInput(e.target.value)}
            placeholder="Paste JavaScript code here..."
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Obfuscated Output
          </label>
          <textarea
            value={jsOutput}
            readOnly
            style={{ minHeight: 350, background: 'var(--bg-secondary)' }}
          />
          {jsOutput && <CopyButton text={jsOutput} />}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          {t.seoTitle || 'JavaScript Code Obfuscation'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent ||
            'Obfuscate JavaScript code to make it difficult to reverse-engineer. This tool removes comments, renames variables, encodes strings, and minifies your code while maintaining functionality.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
          Features
        </h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Remove comments from code</li>
          <li>Rename variables to obfuscated names</li>
          <li>Encode strings using Base64</li>
          <li>Minify whitespace and formatting</li>
          <li>Preserve functionality of obfuscated code</li>
          <li>No external dependencies required</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
