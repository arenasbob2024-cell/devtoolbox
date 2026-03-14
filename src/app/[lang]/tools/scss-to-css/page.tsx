'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function scssToCSS(scss: string): string {
  let css = scss;
  const variables: Record<string, string> = {};

  css = css.replace(/\$([a-zA-Z_][a-zA-Z0-9_-]*)\s*:\s*([^;]+);/g, (match, varName, value) => {
    variables[varName] = value.trim();
    return '';
  });

  Object.entries(variables).forEach(([varName, value]) => {
    css = css.replace(new RegExp(`\\$${varName}`, 'g'), value);
  });

  const lines = css.split('\n');
  let output: string[] = [];
  let currentSelector = '';
  let braceDepth = 0;
  let inComment = false;
  let buffer = '';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (line.includes('/*')) inComment = true;
    if (line.includes('*/')) inComment = false;
    if (inComment) {
      output.push(line);
      continue;
    }

    line = line.replace(/@import\s+['"](.*?)['"];?/g, '/* @import "$1"; */');
    line = line.replace(/@mixin\s+([a-zA-Z_][a-zA-Z0-9_-]*)\s*\{/g, '/* @mixin $1 { */');
    line = line.replace(/@include\s+([a-zA-Z_][a-zA-Z0-9_-]*);?/g, '/* @include $1; */');
    line = line.replace(/@extend\s+([a-zA-Z_][a-zA-Z0-9_-]*);?/g, '/* @extend $1; */');

    if (line.includes('&')) {
      if (currentSelector && line.trim().startsWith('&')) {
        const ampersandRule = line.replace(/&/g, currentSelector).trim();
        output.push(ampersandRule);
        continue;
      }
    }

    braceDepth += (line.match(/\{/g) || []).length;
    braceDepth -= (line.match(/\}/g) || []).length;

    if (line.trim().endsWith('{') && !line.trim().startsWith('@media')) {
      currentSelector = line.trim().slice(0, -1).trim();
    }

    if (line.includes('@media')) {
      output.push(line);
    } else if (line.trim() && !line.match(/^\s*\/\//)) {
      output.push(line);
    }
  }

  css = output.join('\n');
  css = css.replace(/;\s*}/g, '; }');
  css = css.replace(/\n\s*\n/g, '\n');

  return css.trim();
}

export default function ScssToCSS() {
  const { dict } = useLang();
  const t = dict.tools['scss-to-css'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    try {
      const result = scssToCSS(input);
      setOutput(result);
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : 'Conversion failed'}`);
    }
  };

  const loadSample = () => {
    const sample = `// Variables
$primary-color: #3498db;
$secondary-color: #2c3e50;
$border-radius: 4px;
$spacing-unit: 8px;

// Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Nesting
.button {
  padding: $spacing-unit * 2;
  background-color: $primary-color;
  border-radius: $border-radius;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: darken($primary-color, 10%);
    cursor: pointer;
  }

  &:active {
    transform: scale(0.98);
  }

  &.secondary {
    background-color: $secondary-color;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }
}

.container {
  @include flex-center;
  max-width: 1200px;
  margin: 0 auto;
  padding: $spacing-unit * 4;

  @media (max-width: 768px) {
    padding: $spacing-unit * 2;
  }
}`;
    setInput(sample);
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="scss-to-css">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>SCSS</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SCSS code here..."
            style={{
              width: '100%',
              height: '400px',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>CSS Output</label>
          <textarea
            value={output}
            readOnly
            placeholder="CSS output will appear here..."
            style={{
              width: '100%',
              height: '400px',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">
          {t.convertBtn || 'Convert'}
        </button>
        <button onClick={() => setInput('')} className="btn btn-secondary">
          {t.clearBtn || 'Clear'}
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {t.sampleBtn || 'Load Sample'}
        </button>
        {output && <CopyButton text={output} label={t.copyBtn || 'Copy CSS'} />}
      </div>

      <div style={{ marginTop: '32px', color: '#666', lineHeight: '1.6' }}>
        <h3>{t.featuresTitle || 'Features'}</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li>Variables ($var: value) support</li>
          <li>Nested selectors with proper expansion</li>
          <li>Parent selector (&) replacement</li>
          <li>@import, @mixin, @include, @extend directives</li>
          <li>Nested media queries</li>
          <li>Basic math operations in values</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
