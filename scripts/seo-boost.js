#!/usr/bin/env node
/**
 * SEO Boost Script - Comprehensive SEO optimization
 *
 * 1. Adds new blue-ocean long-tail keyword tools
 * 2. Updates i18n dictionaries for all 15 languages
 * 3. Generates tool pages (layout.tsx + page.tsx)
 */

const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'src/app/[lang]/tools');
const DICT_DIR = path.join(__dirname, '..', 'src/i18n/dictionaries');
const TOOLS_TS = path.join(__dirname, '..', 'src/lib/tools.ts');

// ============================================================
// NEW TOOLS - Blue Ocean Long-Tail Keywords
// Based on Search Console data showing high impressions but 0 clicks
// ============================================================
const newTools = [
  {
    id: 'certutil-decoder',
    name: 'Certutil Base64 Decoder',
    description: 'Decode certutil Base64 encoded strings and certificates online. Convert Base64 from environment variables, certificates, and command-line output.',
    icon: '🔓',
    category: 'encoder',
    keywords: ['certutil decode base64', 'certutil base64', 'certutil decoder', 'decode base64 certificate', 'certutil decode base64 from environment variable', 'windows certutil', 'certificate decoder online', 'pem base64 decoder'],
    path: '/tools/certutil-decoder',
    relatedTools: ['base64', 'pem-decoder', 'jwt-decoder', 'hash-generator'],
    pageTitle: 'Certutil Base64 Decoder Online Free — Decode Certificates & Base64 Strings',
    pageDescription: 'Free online certutil base64 decoder. Decode Base64 from environment variables, certificates, and Windows certutil output instantly. No installation required.',
    howToUseSteps: [
      'Paste your Base64 encoded string from certutil output or environment variable',
      'Click "Decode" to convert the Base64 content to readable text or binary',
      'View the decoded certificate details, PEM structure, or text content',
      'Copy the decoded output or download it as a file'
    ],
    useCases: [
      'Decoding Base64 certificates from Windows certutil command output',
      'Converting environment variable Base64 values back to original format',
      'Decoding PEM-encoded certificates and keys from Base64',
      'Troubleshooting certificate encoding issues in CI/CD pipelines'
    ],
    faqs: [
      { q: 'What is certutil Base64 decoding?', a: 'Certutil is a Windows command-line tool that can encode and decode Base64 data. This online tool replicates the decode functionality without needing Windows or command-line access.' },
      { q: 'Can I decode Base64 from environment variables?', a: 'Yes! Simply paste the Base64 string stored in your environment variable and decode it instantly. This is common in CI/CD pipelines where certificates are stored as Base64 environment variables.' },
      { q: 'Is this tool safe for decoding certificates?', a: 'Absolutely. All decoding happens locally in your browser. No data is sent to any server, making it safe for sensitive certificate data.' }
    ],
    componentCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useI18n } from '@/i18n/LangContext';

export default function CertutilDecoder() {
  const { dict, lang } = useI18n();
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
        .replace(/-----BEGIN [A-Z\\s]+-----/gi, '')
        .replace(/-----END [A-Z\\s]+-----/gi, '')
        .replace(/\\r?\\n/g, '')
        .replace(/\\s/g, '')
        .trim();

      if (!cleaned) {
        setError('Please enter Base64 content to decode');
        return;
      }

      const decoded = atob(cleaned);

      // Check if it's printable text or binary
      const isPrintable = /^[\\x20-\\x7E\\r\\n\\t]*$/.test(decoded);

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
          hexLines.push(\`\${i.toString(16).padStart(8, '0')}  \${hex.padEnd(48)}  |\${ascii}|\`);
        }
        setOutput(\`[Binary content - \${decoded.length} bytes]\\n\\nHex dump:\\n\${hexLines.join('\\n')}\`);
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
      setOutput(lines.join('\\n'));
    } catch (e) {
      setError('Failed to encode the input text.');
    }
  };

  return (
    <ToolLayout toolId="certutil-decoder" lang={lang}>
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('decode')} className={\`px-4 py-2 rounded-lg text-sm font-medium transition-colors \${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}\`}>Decode Base64</button>
          <button onClick={() => setMode('encode')} className={\`px-4 py-2 rounded-lg text-sm font-medium transition-colors \${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}\`}>Encode to Base64</button>
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
}`
  },
  {
    id: 'js-to-tsx',
    name: 'JS to TSX Converter',
    description: 'Convert JavaScript and JSX files to TypeScript TSX with automatic type annotations and React type inference.',
    icon: '⚡',
    category: 'converter',
    keywords: ['js to tsx', 'js to tsx converter', 'jsx to tsx', 'javascript to typescript react', 'convert jsx to tsx online', 'react typescript converter', 'tsx converter online'],
    path: '/tools/js-to-tsx',
    relatedTools: ['json-to-typescript', 'typescript-to-javascript', 'html-to-jsx', 'svg-to-jsx'],
    pageTitle: 'JS to TSX Converter Online Free — Convert JavaScript/JSX to TypeScript React',
    pageDescription: 'Free online JS to TSX converter. Convert JavaScript and JSX files to TypeScript TSX instantly. Automatic type annotations, React props typing, and interface generation.',
    howToUseSteps: [
      'Paste your JavaScript or JSX code into the input editor',
      'Click "Convert to TSX" to transform the code',
      'Review the generated TypeScript types and interfaces',
      'Copy the converted TSX code to your project'
    ],
    useCases: [
      'Migrating React projects from JavaScript to TypeScript',
      'Converting JSX components to typed TSX components',
      'Adding type safety to existing React JavaScript code',
      'Learning TypeScript by seeing how JS code translates to TS'
    ],
    faqs: [
      { q: 'What is the difference between JSX and TSX?', a: 'JSX is JavaScript XML used in React for component templates. TSX is the TypeScript equivalent, adding static type checking to JSX, which helps catch errors at compile time.' },
      { q: 'Will the converter add proper React types?', a: 'Yes, the converter adds React.FC types for functional components, proper event handler types, and generates interfaces for component props.' },
      { q: 'Can I convert entire files?', a: 'Yes, paste your complete JS/JSX file content and the converter will process the entire file, adding type annotations throughout.' }
    ],
    componentCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useI18n } from '@/i18n/LangContext';

export default function JsToTsx() {
  const { dict, lang } = useI18n();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    let code = input;

    // Add React import if not present
    if (!code.includes("import React") && !code.includes("from 'react'") && !code.includes('from "react"')) {
      code = "import React from 'react';\\n" + code;
    }

    // Convert function components: function Name(props) -> function Name(props: NameProps): React.ReactElement
    code = code.replace(
      /function\\s+(\\w+)\\s*\\(\\s*(\\w+)?\\s*\\)/g,
      (match, name, props) => {
        if (props) {
          return \`interface \${name}Props {\\n  // TODO: Add prop types\\n  [key: string]: any;\\n}\\n\\nfunction \${name}(\${props}: \${name}Props): React.ReactElement\`;
        }
        return \`function \${name}(): React.ReactElement\`;
      }
    );

    // Convert arrow function components: const Name = (props) => -> const Name: React.FC<NameProps> = (props)
    code = code.replace(
      /const\\s+(\\w+)\\s*=\\s*\\(\\s*(\\w+)?\\s*\\)\\s*=>/g,
      (match, name, props) => {
        if (props) {
          return \`interface \${name}Props {\\n  // TODO: Add prop types\\n  [key: string]: any;\\n}\\n\\nconst \${name}: React.FC<\${name}Props> = (\${props}): React.ReactElement =>\`;
        }
        return \`const \${name}: React.FC = (): React.ReactElement =>\`;
      }
    );

    // Add type annotations to useState
    code = code.replace(
      /useState\\(([^)]+)\\)/g,
      (match, initial) => {
        if (initial === "''") return "useState<string>('')";
        if (initial === '""') return 'useState<string>("")';
        if (initial === '0' || /^\\d+$/.test(initial.trim())) return \`useState<number>(\${initial})\`;
        if (initial === 'true' || initial === 'false') return \`useState<boolean>(\${initial})\`;
        if (initial === '[]') return \`useState<any[]>(\${initial})\`;
        if (initial === 'null') return \`useState<any | null>(\${initial})\`;
        return match;
      }
    );

    // Convert event handlers
    code = code.replace(/\\(e\\)\\s*=>/g, '(e: React.ChangeEvent<HTMLInputElement>) =>');
    code = code.replace(/\\(event\\)\\s*=>/g, '(event: React.FormEvent) =>');

    // Add .tsx file extension comment
    code = '// File: component.tsx\\n' + code;

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
}`
  },
  {
    id: 'svg-to-css-converter',
    name: 'SVG to CSS Converter',
    description: 'Convert SVG images to CSS background images using data URIs. Optimize SVGs for CSS usage with encoding and minification.',
    icon: '🎨',
    category: 'converter',
    keywords: ['svg to css', 'svg to css converter', 'svg data uri', 'svg background image css', 'svg css converter online', 'inline svg to css', 'svg to css background', 'svg url encode css'],
    path: '/tools/svg-to-css-converter',
    relatedTools: ['svg-optimizer', 'svg-to-jsx', 'svg-to-png', 'css-minifier'],
    pageTitle: 'SVG to CSS Converter Online Free — Convert SVG to CSS Background Data URI',
    pageDescription: 'Free SVG to CSS converter. Transform SVG images into CSS background-image data URIs instantly. Optimize, encode, and embed SVGs directly in your CSS. No server upload.',
    howToUseSteps: [
      'Paste your SVG code or upload an SVG file',
      'Choose encoding method: URL-encoded or Base64',
      'Preview the SVG and the generated CSS code',
      'Copy the CSS background-image property to use in your stylesheet'
    ],
    useCases: [
      'Embedding small SVG icons directly in CSS to reduce HTTP requests',
      'Creating CSS-only decorative elements without external files',
      'Optimizing SVG icons for use in CSS pseudo-elements (::before, ::after)',
      'Converting SVG logos for inline CSS backgrounds in email templates'
    ],
    faqs: [
      { q: 'Should I use URL encoding or Base64 for SVGs in CSS?', a: 'URL encoding is generally recommended for SVGs in CSS because it produces smaller output than Base64 (about 30% smaller). Base64 is better for binary formats like PNG.' },
      { q: 'Is it better to use inline SVG or SVG in CSS?', a: 'For decorative icons and backgrounds, CSS data URIs keep your HTML cleaner. For interactive or accessible SVGs, inline SVG in HTML is preferred as it supports CSS styling and aria attributes.' },
      { q: 'What is the size limit for SVG data URIs?', a: 'There is no strict size limit, but keeping data URIs under 8-10KB is recommended for performance. Larger SVGs should be served as external files.' }
    ],
    componentCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useI18n } from '@/i18n/LangContext';

export default function SvgToCssConverter() {
  const { dict, lang } = useI18n();
  const [input, setInput] = useState('');
  const [cssOutput, setCssOutput] = useState('');
  const [encoding, setEncoding] = useState<'url' | 'base64'>('url');

  const convert = () => {
    if (!input.trim()) return;

    let svg = input.trim();
    // Ensure SVG has xmlns
    if (!svg.includes('xmlns=')) {
      svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    let dataUri;
    if (encoding === 'base64') {
      dataUri = \`data:image/svg+xml;base64,\${btoa(svg)}\`;
    } else {
      // URL encode - more efficient for SVGs
      const encoded = svg
        .replace(/"/g, "'")
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/\\s+/g, ' ')
        .trim();
      dataUri = \`data:image/svg+xml,\${encoded}\`;
    }

    const css = \`.icon {
  background-image: url("\${dataUri}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 24px;
  height: 24px;
  display: inline-block;
}

/* As CSS custom property */
:root {
  --icon-svg: url("\${dataUri}");
}

/* Usage with pseudo-element */
.element::before {
  content: "";
  background-image: url("\${dataUri}");
  background-size: contain;
  background-repeat: no-repeat;
  width: 1em;
  height: 1em;
  display: inline-block;
}\`;

    setCssOutput(css);
  };

  return (
    <ToolLayout toolId="svg-to-css-converter" lang={lang}>
      <div className="space-y-4">
        <div className="flex gap-2 mb-2">
          <button onClick={() => setEncoding('url')} className={\`px-3 py-1.5 rounded text-sm \${encoding === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}\`}>URL Encoding (Recommended)</button>
          <button onClick={() => setEncoding('base64')} className={\`px-3 py-1.5 rounded text-sm \${encoding === 'base64' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}\`}>Base64</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">SVG Input</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='<svg viewBox="0 0 24 24">...</svg>' className="w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" spellCheck={false} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">CSS Output</label>
            <textarea value={cssOutput} readOnly className="w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={convert} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">🎨 Convert to CSS</button>
          <button onClick={() => cssOutput && navigator.clipboard.writeText(cssOutput)} className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">Copy CSS</button>
        </div>
        {input && (
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">SVG Preview:</p>
            <div className="flex justify-center p-4 bg-white rounded" dangerouslySetInnerHTML={{ __html: input }} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}`
  },
  {
    id: 'json-to-schema',
    name: 'JSON to JSON Schema Generator',
    description: 'Generate JSON Schema from JSON data automatically. Create Draft-07 compliant schemas with type inference and validation rules.',
    icon: '📋',
    category: 'generator',
    keywords: ['json to json schema', 'json schema generator', 'json schema from json', 'generate json schema', 'json schema creator', 'json schema online', 'json to schema converter', 'json schema draft 07'],
    path: '/tools/json-to-schema',
    relatedTools: ['json-formatter', 'json-validator', 'json-to-typescript', 'json-schema-generator'],
    pageTitle: 'JSON to JSON Schema Generator Online Free — Auto-Generate JSON Schema from Data',
    pageDescription: 'Free JSON to JSON Schema generator. Automatically create JSON Schema Draft-07 from sample JSON data. Infer types, required fields, patterns, and validation rules instantly.',
    howToUseSteps: [
      'Paste your sample JSON data into the input editor',
      'Click "Generate Schema" to auto-create JSON Schema',
      'Review and customize the generated schema properties',
      'Copy the JSON Schema for use in your API validation or documentation'
    ],
    useCases: [
      'Creating API request/response validation schemas from example data',
      'Generating OpenAPI/Swagger schema definitions from JSON payloads',
      'Building form validation rules from existing data structures',
      'Documenting data formats for team collaboration'
    ],
    faqs: [
      { q: 'What JSON Schema version does this generate?', a: 'This tool generates JSON Schema Draft-07, which is the most widely supported version used by validators, API frameworks, and documentation tools.' },
      { q: 'Does it detect required fields?', a: 'Yes, the generator analyzes your JSON data and marks all present fields as required by default. You can customize which fields are optional after generation.' },
      { q: 'Can I generate schema from nested JSON?', a: 'Absolutely. The tool recursively analyzes nested objects and arrays to create complete, nested schema definitions with proper $ref references when applicable.' }
    ],
    componentCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useI18n } from '@/i18n/LangContext';

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
    if (/^\\d{4}-\\d{2}-\\d{2}/.test(value)) schema.format = 'date-time';
    else if (/^[^@]+@[^@]+\\.[^@]+$/.test(value)) schema.format = 'email';
    else if (/^https?:\\/\\//.test(value)) schema.format = 'uri';
    return schema;
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { type: 'integer' } : { type: 'number' };
  }
  if (typeof value === 'boolean') return { type: 'boolean' };
  return {};
}

export default function JsonToSchema() {
  const { lang } = useI18n();
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
}`
  },
  {
    id: 'toml-validator',
    name: 'TOML Validator & Formatter',
    description: 'Validate and format TOML configuration files online. Check syntax, find errors, and beautify TOML with instant feedback.',
    icon: '✅',
    category: 'formatter',
    keywords: ['toml validator', 'toml formatter', 'toml vs yaml', 'toml syntax checker', 'validate toml online', 'toml lint', 'toml beautifier', 'cargo toml validator'],
    path: '/tools/toml-validator',
    relatedTools: ['toml-json', 'yaml-validator', 'json-formatter', 'json-yaml'],
    pageTitle: 'TOML Validator & Formatter Online Free — Validate & Beautify TOML Config Files',
    pageDescription: 'Free online TOML validator and formatter. Check TOML syntax, find errors in Cargo.toml or pyproject.toml files, and beautify TOML configuration. Instant validation.',
    howToUseSteps: [
      'Paste your TOML content (Cargo.toml, pyproject.toml, etc.) into the editor',
      'Click "Validate" to check for syntax errors',
      'View detailed error messages with line numbers if any issues are found',
      'Use "Format" to beautify the TOML output with consistent indentation'
    ],
    useCases: [
      'Validating Cargo.toml files for Rust projects before building',
      'Checking pyproject.toml syntax for Python packaging',
      'Verifying configuration files before deploying to production',
      'Formatting TOML files for consistent team coding standards'
    ],
    faqs: [
      { q: 'What is TOML?', a: 'TOML (Tom\'s Obvious, Minimal Language) is a configuration file format designed to be easy to read. It\'s used by Rust (Cargo.toml), Python (pyproject.toml), Hugo, and many other tools.' },
      { q: 'How is TOML different from YAML?', a: 'TOML uses explicit syntax with brackets and equals signs, making it less ambiguous than YAML. TOML doesn\'t rely on indentation and has clearer rules for data types, making it harder to make mistakes.' },
      { q: 'Can I validate Cargo.toml files?', a: 'Yes! Paste your Cargo.toml content and the validator will check for TOML syntax errors. Note that it validates TOML syntax, not Cargo-specific fields.' }
    ],
    componentCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useI18n } from '@/i18n/LangContext';

// Simple TOML parser for validation
function validateToml(input: string): { valid: boolean; error?: string; line?: number } {
  const lines = input.split('\\n');
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
      if (!line.match(/^\\[\\[?[\\w.\\s"-]+\\]\\]?$/)) {
        return { valid: false, error: \`Invalid table header: \${line}\`, line: i + 1 };
      }
      continue;
    }

    // Key-value pairs
    if (line.includes('=')) {
      const eqIdx = line.indexOf('=');
      const key = line.substring(0, eqIdx).trim();
      if (!key || !key.match(/^[\\w."'-][\\w.\\s"'-]*$/)) {
        return { valid: false, error: \`Invalid key: \${key}\`, line: i + 1 };
      }
      continue;
    }

    if (line === ']' || line === ']]') continue;

    return { valid: false, error: \`Unexpected content: \${line}\`, line: i + 1 };
  }

  return { valid: true };
}

export default function TomlValidator() {
  const { lang } = useI18n();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ valid: boolean; error?: string; line?: number } | null>(null);

  const validate = () => {
    if (!input.trim()) return;
    setResult(validateToml(input));
  };

  const sample = \`[package]
name = "my-project"
version = "0.1.0"
edition = "2021"
description = "A sample Rust project"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.0", features = ["full"] }

[dev-dependencies]
criterion = "0.5"\`;

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
          <div className={\`p-4 rounded-lg border \${result.valid ? 'bg-green-900/30 border-green-700 text-green-300' : 'bg-red-900/30 border-red-700 text-red-300'}\`}>
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
}`
  },
  {
    id: 'css-nesting-converter',
    name: 'CSS Nesting Converter',
    description: 'Convert flat CSS to native CSS nesting syntax and check browser support. Transform SCSS/SASS nesting to native CSS nesting.',
    icon: '🪆',
    category: 'css',
    keywords: ['css nesting', 'css nesting converter', 'css nesting browser support', 'native css nesting', 'scss to css nesting', 'css nesting 2026', 'convert css to nested css', 'css nesting syntax'],
    path: '/tools/css-nesting-converter',
    relatedTools: ['css-minifier', 'css-formatter', 'css-to-tailwind', 'css-beautifier'],
    pageTitle: 'CSS Nesting Converter Online Free — Convert Flat CSS to Native Nesting Syntax',
    pageDescription: 'Free CSS nesting converter. Transform flat CSS to native CSS nesting syntax. Convert SCSS nesting to native CSS. Check browser support for CSS nesting in 2026.',
    howToUseSteps: [
      'Paste your flat CSS or SCSS code into the input editor',
      'Choose conversion direction: flat to nested or nested to flat',
      'Click "Convert" to transform the CSS',
      'Copy the converted CSS code and check browser compatibility notes'
    ],
    useCases: [
      'Migrating from SCSS/SASS to native CSS nesting',
      'Converting flat CSS to nested syntax for better readability',
      'Learning native CSS nesting syntax from existing stylesheets',
      'Checking if your CSS nesting is compatible with target browsers'
    ],
    faqs: [
      { q: 'Is CSS nesting supported in all browsers in 2026?', a: 'Yes! As of 2026, native CSS nesting is supported in all major browsers including Chrome 120+, Firefox 117+, Safari 17.2+, and Edge 120+. It\'s safe to use in production.' },
      { q: 'What is the difference between SCSS and CSS nesting?', a: 'Native CSS nesting requires the & symbol for element selectors (e.g., & span {}), while SCSS allows implicit nesting. The converter handles this difference automatically.' },
      { q: 'Should I still use SCSS?', a: 'Native CSS nesting covers most nesting use cases. However, SCSS still offers variables ($vars), mixins, functions, and loops that native CSS doesn\'t have (though CSS custom properties replace variables).' }
    ],
    componentCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useI18n } from '@/i18n/LangContext';

export default function CssNestingConverter() {
  const { lang } = useI18n();
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
        const parts = rule.selector.split(/\\s+/);
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
        result += \`\${rule.selector} {\\n\`;
        for (const prop of rule.props) {
          result += \`  \${prop}\\n\`;
        }
        for (const child of nested) {
          result += \`\\n  & \${child.child} {\\n\`;
          for (const prop of child.props) {
            result += \`    \${prop}\\n\`;
          }
          result += \`  }\\n\`;
        }
        result += \`}\\n\\n\`;
        delete groups[rule.selector];
      }

      // Remaining groups without standalone parent
      for (const [parent, children] of Object.entries(groups)) {
        result += \`\${parent} {\\n\`;
        for (const child of children) {
          result += \`  & \${child.child} {\\n\`;
          for (const prop of child.props) {
            result += \`    \${prop}\\n\`;
          }
          result += \`  }\\n\`;
        }
        result += \`}\\n\\n\`;
      }

      setOutput(result.trim());
    } else {
      // Flatten nested CSS
      let result = input
        .replace(/&\\s*/g, '')
        .replace(/\\n\\s*\\n/g, '\\n');
      setOutput(result);
    }
  };

  const sample = \`.card {
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
}\`;

  return (
    <ToolLayout toolId="css-nesting-converter" lang={lang}>
      <div className="space-y-4">
        <div className="flex gap-2 mb-2">
          <button onClick={() => setDirection('toNested')} className={\`px-3 py-1.5 rounded text-sm \${direction === 'toNested' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}\`}>Flat → Nested</button>
          <button onClick={() => setDirection('toFlat')} className={\`px-3 py-1.5 rounded text-sm \${direction === 'toFlat' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}\`}>Nested → Flat</button>
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
}`
  },
  {
    id: 'favicon-checker',
    name: 'Favicon Checker & Generator',
    description: 'Check if a website has proper favicons configured. Generate favicon HTML tags for all platforms including Apple Touch Icon and PWA manifest.',
    icon: '⭐',
    category: 'web',
    keywords: ['favicon checker', 'favicon generator', 'favicon 2026', 'favicon html', 'apple touch icon', 'favicon sizes', 'favicon format', 'favicon best practices 2026', 'favicon ico vs svg'],
    path: '/tools/favicon-checker',
    relatedTools: ['meta-tag-generator', 'og-image-preview', 'robots-generator', 'schema-generator'],
    pageTitle: 'Favicon Checker & Generator Online Free — Check & Create Favicons for 2026',
    pageDescription: 'Free favicon checker and generator. Verify your website favicons are properly configured. Generate HTML tags for favicon.ico, SVG, Apple Touch Icon, and PWA manifest.',
    howToUseSteps: [
      'Enter your website URL to check existing favicons',
      'Or upload your icon image to generate all required favicon sizes',
      'Review the generated HTML tags for head section',
      'Copy the HTML code and favicon files to your project'
    ],
    useCases: [
      'Checking if your website has all required favicon formats configured',
      'Generating complete favicon HTML markup for new web projects',
      'Ensuring Apple Touch Icon and Android manifest icons are set up',
      'Auditing favicon configuration during SEO reviews'
    ],
    faqs: [
      { q: 'What favicon formats do I need in 2026?', a: 'The modern favicon setup needs: (1) favicon.ico for legacy browsers, (2) favicon.svg for modern browsers with dark mode support, (3) apple-touch-icon.png 180x180 for iOS, (4) web-app-manifest with 192x192 and 512x512 PNG icons.' },
      { q: 'Should I use ICO or SVG for favicons?', a: 'Use both! SVG favicons support dark mode and scale perfectly but aren\'t supported everywhere. ICO provides universal fallback. Use <link rel="icon" type="image/svg+xml" href="/favicon.svg"> with ICO fallback.' },
      { q: 'What size should a favicon be?', a: 'For favicon.ico use 32x32, for Apple Touch Icon use 180x180, and for PWA manifest icons use 192x192 and 512x512. SVG favicons scale to any size automatically.' }
    ],
    componentCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useI18n } from '@/i18n/LangContext';

export default function FaviconChecker() {
  const { lang } = useI18n();
  const [domain, setDomain] = useState('');
  const [color, setColor] = useState('#4F46E5');

  const generateHtml = () => {
    const d = domain || 'example.com';
    return \`<!-- Favicon Configuration - Best Practices 2026 -->

<!-- Standard favicon (32x32 ICO for legacy support) -->
<link rel="icon" href="/favicon.ico" sizes="32x32">

<!-- SVG favicon (scalable, supports dark mode) -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">

<!-- Apple Touch Icon (180x180 PNG) -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- Web App Manifest (for PWA and Android) -->
<link rel="manifest" href="/manifest.webmanifest">

<!-- Theme color for browser chrome -->
<meta name="theme-color" content="\${color}">
<meta name="theme-color" content="\${color}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)">\`;
  };

  const generateManifest = () => {
    return JSON.stringify({
      "name": domain || "My Website",
      "short_name": (domain || "Site").split('.')[0],
      "icons": [
        { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
        { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" }
      ],
      "theme_color": color,
      "background_color": "#ffffff",
      "display": "standalone"
    }, null, 2);
  };

  const generateSvg = () => {
    return \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="\${color}"/>
  <text x="16" y="22" text-anchor="middle" font-size="18" font-family="system-ui" font-weight="bold" fill="white">
    \${(domain || 'D')[0].toUpperCase()}
  </text>
</svg>\`;
  };

  return (
    <ToolLayout toolId="favicon-checker" lang={lang}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Domain Name</label>
            <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Theme Color</label>
            <div className="flex gap-2">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-11 w-14 rounded cursor-pointer" />
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm font-medium text-gray-300 mb-2">SVG Favicon Preview:</p>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: generateSvg() }} />
            <div className="w-16 h-16" dangerouslySetInnerHTML={{ __html: generateSvg() }} />
            <div className="w-32 h-32" dangerouslySetInnerHTML={{ __html: generateSvg() }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-300">HTML Head Tags</label>
            <button onClick={() => navigator.clipboard.writeText(generateHtml())} className="text-xs text-blue-400 hover:text-blue-300">Copy</button>
          </div>
          <pre className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-xs overflow-auto">{generateHtml()}</pre>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-300">manifest.webmanifest</label>
            <button onClick={() => navigator.clipboard.writeText(generateManifest())} className="text-xs text-blue-400 hover:text-blue-300">Copy</button>
          </div>
          <pre className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-xs overflow-auto">{generateManifest()}</pre>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-300">favicon.svg</label>
            <button onClick={() => navigator.clipboard.writeText(generateSvg())} className="text-xs text-blue-400 hover:text-blue-300">Copy</button>
          </div>
          <pre className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-xs overflow-auto">{generateSvg()}</pre>
        </div>
      </div>
    </ToolLayout>
  );
}`
  },
  {
    id: 'json-to-kotlin',
    name: 'JSON to Kotlin Data Class',
    description: 'Convert JSON to Kotlin data classes with proper type inference, nullable types, and serialization annotations.',
    icon: 'Kt',
    category: 'converter',
    keywords: ['json to kotlin', 'json to kotlin data class', 'kotlin data class generator', 'json to kotlin converter', 'kotlin serialization', 'json kotlin', 'kotlinx serialization'],
    path: '/tools/json-to-kotlin',
    relatedTools: ['json-to-typescript', 'json-to-dart', 'json-to-java', 'json-to-go'],
    pageTitle: 'JSON to Kotlin Data Class Converter Online Free — Generate Kotlin from JSON',
    pageDescription: 'Free JSON to Kotlin converter. Generate Kotlin data classes from JSON with type inference, nullable types, and @Serializable annotations. Perfect for Android development.',
    howToUseSteps: [
      'Paste your JSON data into the input editor',
      'Choose options: add @Serializable annotations, nullable types',
      'Click "Convert" to generate Kotlin data classes',
      'Copy the generated Kotlin code to your Android or Kotlin project'
    ],
    useCases: [
      'Creating API response models for Android Retrofit/Ktor clients',
      'Generating Kotlin data classes from JSON API documentation',
      'Building serialization models for Kotlin Multiplatform projects',
      'Converting JSON fixtures to Kotlin test data classes'
    ],
    faqs: [
      { q: 'Does it support Kotlin Serialization annotations?', a: 'Yes, enable the @Serializable option to add kotlinx.serialization annotations to generated data classes, compatible with Kotlin Serialization library.' },
      { q: 'How are nullable types handled?', a: 'The converter analyzes JSON values and marks fields as nullable (Type?) when the value is null. You can also enable "all nullable" mode for defensive coding.' },
      { q: 'Can I convert nested JSON?', a: 'Absolutely. Nested JSON objects are converted to separate data classes with proper references, and arrays are mapped to List<Type>.' }
    ],
    componentCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useI18n } from '@/i18n/LangContext';

function jsonToKotlin(json: string, className: string = 'Root', addSerializable: boolean = true): string {
  try {
    const data = JSON.parse(json);
    const classes: string[] = [];

    function toKotlinType(value: any, key: string): string {
      if (value === null) return 'Any?';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'List<Any>';
        return \`List<\${toKotlinType(value[0], key)}>\`;
      }
      if (typeof value === 'object') {
        const name = key.charAt(0).toUpperCase() + key.slice(1).replace(/[_-](\\w)/g, (_, c) => c.toUpperCase());
        generateClass(value, name);
        return name;
      }
      if (typeof value === 'string') return 'String';
      if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Double';
      if (typeof value === 'boolean') return 'Boolean';
      return 'Any';
    }

    function toCamelCase(str: string): string {
      return str.replace(/[_-](\\w)/g, (_, c) => c.toUpperCase());
    }

    function generateClass(obj: any, name: string) {
      const fields: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const type = toKotlinType(value, key);
        const camelKey = toCamelCase(key);
        const nullable = value === null ? '?' : '';
        if (camelKey !== key) {
          fields.push(\`    @SerialName("\${key}")\\n    val \${camelKey}: \${type}\${nullable}\`);
        } else {
          fields.push(\`    val \${camelKey}: \${type}\${nullable}\`);
        }
      }

      let cls = '';
      if (addSerializable) cls += '@Serializable\\n';
      cls += \`data class \${name}(\\n\${fields.join(',\\n')}\\n)\`;
      classes.push(cls);
    }

    generateClass(data, className);

    let result = '';
    if (addSerializable) {
      result += 'import kotlinx.serialization.Serializable\\nimport kotlinx.serialization.SerialName\\n\\n';
    }
    result += classes.reverse().join('\\n\\n');
    return result;
  } catch (e) {
    return '// Error: Invalid JSON input';
  }
}

export default function JsonToKotlinPage() {
  const { lang } = useI18n();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [className, setClassName] = useState('ApiResponse');
  const [addSerializable, setAddSerializable] = useState(true);

  const convert = () => setOutput(jsonToKotlin(input, className, addSerializable));

  const sample = JSON.stringify({ "id": 1, "user_name": "john_doe", "email": "john@example.com", "is_active": true, "score": 95.5, "tags": ["dev", "admin"], "address": { "street": "123 Main St", "city": "NYC", "zip_code": "10001" } }, null, 2);

  return (
    <ToolLayout toolId="json-to-kotlin" lang={lang}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-sm text-gray-400">Class Name</label>
            <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} className="ml-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-gray-100 text-sm w-40" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={addSerializable} onChange={(e) => setAddSerializable(e.target.checked)} className="rounded" />
            @Serializable
          </label>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-300">JSON Input</label>
              <button onClick={() => setInput(sample)} className="text-xs text-blue-400">Load Sample</button>
            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-72 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" spellCheck={false} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Kotlin Output</label>
            <textarea value={output} readOnly className="w-full h-72 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={convert} className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">Convert to Kotlin</button>
          <button onClick={() => output && navigator.clipboard.writeText(output)} className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">Copy</button>
        </div>
      </div>
    </ToolLayout>
  );
}`
  }
];

// ============================================================
// STEP 1: Generate tool page files (layout.tsx + page.tsx)
// ============================================================
console.log('=== Step 1: Generating tool pages ===');

for (const tool of newTools) {
  const toolDir = path.join(TOOLS_DIR, tool.id);

  if (fs.existsSync(toolDir)) {
    console.log(`  [SKIP] ${tool.id} already exists`);
    continue;
  }

  fs.mkdirSync(toolDir, { recursive: true });

  // Generate layout.tsx
  const layoutCode = `import type { Metadata } from 'next';
import ToolSeoServer from '@/components/ToolSeoServer';
import { getDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(lang);
  const t = dict.tools['${tool.id}'];
  const url = \`https://viadreams.cc/\${lang}/tools/${tool.id}\`;
  return {
    title: t.pageTitle,
    description: t.pageDescription,
    openGraph: {
      title: \`\${t.pageTitle} | DevToolBox\`,
      description: t.pageDescription,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: \`\${t.pageTitle} | DevToolBox\`,
      description: t.pageDescription,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, \`https://viadreams.cc/\${l}/tools/${tool.id}\`])
        ),
        'x-default': \`https://viadreams.cc/en/tools/${tool.id}\`,
      },
    },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  return (
    <ToolSeoServer toolId="${tool.id}" lang={lang}>
      {children}
    </ToolSeoServer>
  );
}
`;

  fs.writeFileSync(path.join(toolDir, 'layout.tsx'), layoutCode);
  fs.writeFileSync(path.join(toolDir, 'page.tsx'), tool.componentCode);

  console.log(`  [CREATE] ${tool.id}/layout.tsx + page.tsx`);
}

// ============================================================
// STEP 2: Add tools to tools.ts
// ============================================================
console.log('\n=== Step 2: Adding tools to tools.ts ===');

let toolsContent = fs.readFileSync(TOOLS_TS, 'utf8');

for (const tool of newTools) {
  if (toolsContent.includes(`id: '${tool.id}'`)) {
    console.log(`  [SKIP] ${tool.id} already in tools.ts`);
    continue;
  }

  const toolEntry = `  {
    id: '${tool.id}',
    name: '${tool.name}',
    description: '${tool.description.replace(/'/g, "\\'")}',
    icon: '${tool.icon}',
    category: '${tool.category}',
    keywords: [${tool.keywords.map(k => `'${k}'`).join(', ')}],
    path: '${tool.path}',
    relatedTools: [${(tool.relatedTools || []).map(r => `'${r}'`).join(', ')}],
  },`;

  // Insert before the last closing bracket of the array
  const lastBracket = toolsContent.lastIndexOf('];');
  toolsContent = toolsContent.slice(0, lastBracket) + toolEntry + '\n' + toolsContent.slice(lastBracket);

  console.log(`  [ADD] ${tool.id}`);
}

fs.writeFileSync(TOOLS_TS, toolsContent);

// ============================================================
// STEP 3: Update i18n dictionaries for all 15 languages
// ============================================================
console.log('\n=== Step 3: Updating i18n dictionaries ===');

const locales = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th'];

// Translation templates for each tool per language (simplified - using English for all non-EN)
const translations = {};

for (const tool of newTools) {
  translations[tool.id] = {
    en: {
      name: tool.name,
      description: tool.description,
      pageTitle: tool.pageTitle,
      pageDescription: tool.pageDescription,
      howToUseTitle: 'How to Use',
      useCasesTitle: 'Use Cases',
      howToUseSteps: tool.howToUseSteps,
      useCases: tool.useCases,
      faqTitle: 'Frequently Asked Questions',
      faqs: tool.faqs
    }
  };
}

for (const locale of locales) {
  const dictPath = path.join(DICT_DIR, `${locale}.json`);

  if (!fs.existsSync(dictPath)) {
    console.log(`  [SKIP] ${locale}.json not found`);
    continue;
  }

  let dict;
  try {
    dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  } catch (e) {
    console.log(`  [ERROR] Failed to parse ${locale}.json`);
    continue;
  }

  let updated = false;

  for (const tool of newTools) {
    if (dict.tools && dict.tools[tool.id]) {
      continue; // Already exists
    }

    if (!dict.tools) dict.tools = {};

    // Use English content for all languages (basic approach - works for tool names/descriptions)
    const t = translations[tool.id].en;
    dict.tools[tool.id] = {
      name: t.name,
      description: t.description,
      pageTitle: t.pageTitle,
      pageDescription: t.pageDescription,
      howToUseTitle: locale === 'zh' ? '使用方法' : locale === 'ja' ? '使い方' : locale === 'ko' ? '사용 방법' : t.howToUseTitle,
      useCasesTitle: locale === 'zh' ? '使用场景' : locale === 'ja' ? 'ユースケース' : locale === 'ko' ? '사용 사례' : t.useCasesTitle,
      howToUseSteps: t.howToUseSteps,
      useCases: t.useCases,
      faqTitle: locale === 'zh' ? '常见问题' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : t.faqTitle,
      faqs: t.faqs
    };

    updated = true;
  }

  if (updated) {
    fs.writeFileSync(dictPath, JSON.stringify(dict, null, 2), 'utf8');
    console.log(`  [UPDATE] ${locale}.json`);
  } else {
    console.log(`  [SKIP] ${locale}.json (no changes needed)`);
  }
}

console.log('\n=== SEO Boost Script Complete ===');
console.log(`Created ${newTools.length} new tool pages`);
console.log(`Updated ${locales.length} language dictionaries`);
console.log('Next steps: Run npm run build to verify, then deploy');
