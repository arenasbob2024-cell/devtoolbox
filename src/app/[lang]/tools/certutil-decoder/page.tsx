'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function CertutilDecoder() {
  const { dict, lang } = useLang();
  const t = dict.tools?.['certutil-decoder'] || {};
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'decode' | 'encode'>('decode');
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      setError('');
      // Clean input: remove certutil headers/footers and whitespace
      let cleaned = input
        .replace(/-----BEGIN CERTIFICATE-----/gi, '')
        .replace(/-----END CERTIFICATE-----/gi, '')
        .replace(/-----BEGIN [A-Z\s]+-----/gi, '')
        .replace(/-----END [A-Z\s]+-----/gi, '')
        .replace(/\r?\n/g, '')
        .replace(/\s/g, '')
        .trim();

      if (!cleaned) {
        setError('Please enter Base64 content to decode');
        return;
      }

      const decoded = atob(cleaned);

      // Check if it's printable text or binary
      const isPrintable = /^[\x20-\x7E\r\n\t]*$/.test(decoded);

      if (isPrintable) {
        setOutput(decoded);
      } else {
        // Show hex dump for binary content
        const hexLines: string[] = [];
        for (let i = 0; i < decoded.length; i += 16) {
          const hex = Array.from(decoded.slice(i, i + 16))
            .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
            .join(' ');
          const ascii = Array.from(decoded.slice(i, i + 16))
            .map(c => (c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126) ? c : '.')
            .join('');
          hexLines.push(`${i.toString(16).padStart(8, '0')}  ${hex.padEnd(48)}  |${ascii}|`);
        }
        setOutput(`[Binary content - ${decoded.length} bytes]\n\nHex dump:\n${hexLines.join('\n')}`);
      }
    } catch (e) {
      setError('Invalid Base64 input. Make sure the content is properly Base64 encoded.');
    }
  };

  const handleEncode = () => {
    try {
      setError('');
      const encoded = btoa(input);
      // Format like certutil output
      const lines: string[] = [];
      for (let i = 0; i < encoded.length; i += 64) {
        lines.push(encoded.slice(i, i + 64));
      }
      setOutput(lines.join('\n'));
    } catch (e) {
      setError('Failed to encode the input text.');
    }
  };

  return (
    <ToolLayout toolId="certutil-decoder" lang={lang}>
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Decode Base64</button>
          <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Encode to Base64</button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {mode === 'decode' ? 'Base64 / Certutil Input' : 'Text to Encode'}
          </label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'decode' ? 'Paste Base64 string, certutil output, or PEM content here...' : 'Enter text to encode to Base64...'} className="w-full h-40 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" spellCheck={false} />
        </div>

        <button onClick={mode === 'decode' ? handleDecode : handleEncode} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          {mode === 'decode' ? '🔓 Decode' : '🔐 Encode'}
        </button>

        {error && <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">{error}</div>}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-300">Output</label>
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-blue-400 hover:text-blue-300">Copy</button>
            </div>
            <pre className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm overflow-auto max-h-80 whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}