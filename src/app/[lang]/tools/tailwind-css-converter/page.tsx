'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const cssToTailwindMap: Record<string, Record<string, string>> = {
  'color': {
    'red': 'text-red-500',
    'blue': 'text-blue-500',
    'green': 'text-green-500',
    'black': 'text-black',
    'white': 'text-white',
  },
  'background-color': {
    'red': 'bg-red-500',
    'blue': 'bg-blue-500',
    'green': 'bg-green-500',
    'black': 'bg-black',
    'white': 'bg-white',
  },
  'font-size': {
    '12px': 'text-xs',
    '14px': 'text-sm',
    '16px': 'text-base',
    '18px': 'text-lg',
    '20px': 'text-xl',
    '24px': 'text-2xl',
  },
  'font-weight': {
    '400': 'font-normal',
    '600': 'font-semibold',
    '700': 'font-bold',
    '800': 'font-black',
  },
  'padding': {
    '8px': 'p-2',
    '12px': 'p-3',
    '16px': 'p-4',
    '20px': 'p-5',
    '24px': 'p-6',
  },
  'margin': {
    '8px': 'm-2',
    '12px': 'm-3',
    '16px': 'm-4',
    '20px': 'm-5',
    '24px': 'm-6',
  },
  'border-radius': {
    '4px': 'rounded',
    '8px': 'rounded-lg',
    '12px': 'rounded-xl',
  },
  'display': {
    'flex': 'flex',
    'grid': 'grid',
    'block': 'block',
    'inline-block': 'inline-block',
    'none': 'hidden',
  },
};

export default function TailwindCssConverter() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['tailwind-css-converter'];

  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const parseCSS = (css: string): Array<[string, string]> => {
    const declarations: Array<[string, string]> = [];
    const rules = css.replace(/\/\*.*?\*\//g, '').split(';');

    for (const rule of rules) {
      const [property, value] = rule.split(':').map(s => s.trim());
      if (property && value) {
        declarations.push([property.toLowerCase(), value.toLowerCase()]);
      }
    }
    return declarations;
  };

  const convertToTailwind = (css: string): string[] => {
    const declarations = parseCSS(css);
    const tailwindClasses: string[] = [];

    for (const [property, value] of declarations) {
      if (cssToTailwindMap[property] && cssToTailwindMap[property][value]) {
        tailwindClasses.push(cssToTailwindMap[property][value]);
      } else if (property === 'width' && value.endsWith('%')) {
        const percent = parseInt(value);
        const widthMap: Record<number, string> = {
          25: 'w-1/4', 33: 'w-1/3', 50: 'w-1/2', 66: 'w-2/3', 75: 'w-3/4', 100: 'w-full'
        };
        if (widthMap[percent]) {
          tailwindClasses.push(widthMap[percent]);
        }
      } else if (property === 'height') {
        if (value === '100%') {
          tailwindClasses.push('h-full');
        } else if (value === 'auto') {
          tailwindClasses.push('h-auto');
        }
      } else if (property === 'text-align') {
        const alignMap: Record<string, string> = { 'left': 'text-left', 'center': 'text-center', 'right': 'text-right' };
        if (alignMap[value]) tailwindClasses.push(alignMap[value]);
      }
    }

    return tailwindClasses;
  };

  const output = useMemo(() => {
    if (!input.trim()) {
      setError('');
      return '';
    }

    try {
      const classes = convertToTailwind(input);
      setError('');
      return classes.join(' ');
    } catch {
      setError('Error parsing CSS');
      return '';
    }
  }, [input]);

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 16,
  };

  const panelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    padding: 12,
    borderBottom: '1px solid var(--border-color)',
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--text-primary)',
  };

  const textareaStyle: React.CSSProperties = {
    flex: 1,
    padding: 12,
    fontSize: 13,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    background: 'var(--bg-primary)',
    border: 'none',
    color: 'var(--text-primary)',
    outline: 'none',
    resize: 'none',
    minHeight: 400,
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="tailwind-css-converter"
    >
      <div style={containerStyle}>
        <div style={panelStyle}>
          <div style={headerStyle}>CSS Input</div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={'color: red;\nbackground-color: blue;\npadding: 16px;\nfont-size: 18px;'}
            style={textareaStyle}
          />
        </div>

        <div style={panelStyle}>
          <div style={{ ...headerStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Tailwind Classes</span>
            {output && <CopyButton text={output} label={dict.common.copy} />}
          </div>
          <pre style={{
            flex: 1,
            padding: 12,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            background: 'var(--bg-primary)',
            color: 'var(--accent-emerald)',
            border: 'none',
            margin: 0,
            overflow: 'auto',
            minHeight: 400,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}>
            {output || (dict.common.resultPlaceholder || 'Result will appear here...')}
          </pre>
        </div>
      </div>

      {error && (
        <div style={{
          padding: 12,
          borderRadius: 6,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgb(239, 68, 68)',
          color: 'rgb(239, 68, 68)',
          fontSize: 13,
          marginBottom: 16,
        }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
