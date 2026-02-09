'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const cssToTwMap: Record<string, (v: string) => string> = {
  'display': (v) => ({ flex: 'flex', grid: 'grid', block: 'block', 'inline-block': 'inline-block', inline: 'inline', none: 'hidden', 'inline-flex': 'inline-flex' }[v] || ''),
  'position': (v) => ({ relative: 'relative', absolute: 'absolute', fixed: 'fixed', sticky: 'sticky', static: 'static' }[v] || ''),
  'text-align': (v) => ({ left: 'text-left', center: 'text-center', right: 'text-right', justify: 'text-justify' }[v] || ''),
  'font-weight': (v) => ({ '100': 'font-thin', '200': 'font-extralight', '300': 'font-light', '400': 'font-normal', '500': 'font-medium', '600': 'font-semibold', '700': 'font-bold', '800': 'font-extrabold', '900': 'font-black', 'bold': 'font-bold', 'normal': 'font-normal' }[v] || ''),
  'font-size': (v) => ({ '12px': 'text-xs', '14px': 'text-sm', '16px': 'text-base', '18px': 'text-lg', '20px': 'text-xl', '24px': 'text-2xl', '30px': 'text-3xl', '36px': 'text-4xl', '0.75rem': 'text-xs', '0.875rem': 'text-sm', '1rem': 'text-base', '1.125rem': 'text-lg', '1.25rem': 'text-xl', '1.5rem': 'text-2xl' }[v] || `text-[${v}]`),
  'margin': (v) => v === '0' ? 'm-0' : v === '0 auto' ? 'mx-auto' : `m-[${v}]`,
  'padding': (v) => v === '0' ? 'p-0' : `p-[${v}]`,
  'width': (v) => ({ '100%': 'w-full', '50%': 'w-1/2', 'auto': 'w-auto', 'fit-content': 'w-fit', 'min-content': 'w-min', 'max-content': 'w-max' }[v] || `w-[${v}]`),
  'height': (v) => ({ '100%': 'h-full', '100vh': 'h-screen', 'auto': 'h-auto', 'fit-content': 'h-fit' }[v] || `h-[${v}]`),
  'overflow': (v) => ({ hidden: 'overflow-hidden', auto: 'overflow-auto', scroll: 'overflow-scroll', visible: 'overflow-visible' }[v] || ''),
  'cursor': (v) => ({ pointer: 'cursor-pointer', default: 'cursor-default', 'not-allowed': 'cursor-not-allowed', wait: 'cursor-wait', text: 'cursor-text' }[v] || ''),
  'border-radius': (v) => ({ '0': 'rounded-none', '2px': 'rounded-sm', '4px': 'rounded', '6px': 'rounded-md', '8px': 'rounded-lg', '12px': 'rounded-xl', '16px': 'rounded-2xl', '9999px': 'rounded-full', '50%': 'rounded-full' }[v] || `rounded-[${v}]`),
  'flex-direction': (v) => ({ row: 'flex-row', column: 'flex-col', 'row-reverse': 'flex-row-reverse', 'column-reverse': 'flex-col-reverse' }[v] || ''),
  'justify-content': (v) => ({ 'flex-start': 'justify-start', 'flex-end': 'justify-end', center: 'justify-center', 'space-between': 'justify-between', 'space-around': 'justify-around', 'space-evenly': 'justify-evenly' }[v] || ''),
  'align-items': (v) => ({ 'flex-start': 'items-start', 'flex-end': 'items-end', center: 'items-center', baseline: 'items-baseline', stretch: 'items-stretch' }[v] || ''),
  'opacity': (v) => `opacity-${Math.round(parseFloat(v) * 100)}`,
  'z-index': (v) => `z-${v}`,
  'gap': (v) => `gap-[${v}]`,
  'background-color': (v) => `bg-[${v}]`,
  'color': (v) => `text-[${v}]`,
  'border': (v) => v === 'none' ? 'border-0' : `border-[${v}]`,
};

function cssToTailwind(css: string): string {
  const results: string[] = [];
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;

  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const declarations = match[2].trim();
    const classes: string[] = [];
    const unconverted: string[] = [];

    declarations.split(';').filter(Boolean).forEach(decl => {
      const [prop, ...vals] = decl.split(':');
      if (!prop || vals.length === 0) return;
      const property = prop.trim().toLowerCase();
      const value = vals.join(':').trim();
      const converter = cssToTwMap[property];
      if (converter) {
        const tw = converter(value);
        if (tw) classes.push(tw); else unconverted.push(`  ${property}: ${value};`);
      } else unconverted.push(`  ${property}: ${value};`);
    });

    results.push(`/* ${selector} */`);
    if (classes.length) results.push(`class="${classes.join(' ')}"`);
    if (unconverted.length) results.push(`/* Unconverted:\n${unconverted.join('\n')}\n*/`);
    results.push('');
  }

  if (results.length === 0) {
    const classes: string[] = [];
    const unconverted: string[] = [];
    css.split(';').filter(Boolean).forEach(decl => {
      const [prop, ...vals] = decl.split(':');
      if (!prop || vals.length === 0) return;
      const property = prop.trim().toLowerCase();
      const value = vals.join(':').trim();
      const converter = cssToTwMap[property];
      if (converter) {
        const tw = converter(value);
        if (tw) classes.push(tw); else unconverted.push(`${property}: ${value}`);
      } else unconverted.push(`${property}: ${value}`);
    });
    if (classes.length) results.push(`class="${classes.join(' ')}"`);
    if (unconverted.length) results.push(`\n/* Unconverted:\n${unconverted.map(u => `  ${u};`).join('\n')}\n*/`);
  }

  return results.join('\n');
}

export default function CssToTailwind() {
  const { dict } = useLang();
  const t = dict.tools['css-to-tailwind'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => { try { setOutput(cssToTailwind(input)); } catch { setOutput('Error converting CSS'); } };

  const loadSample = () => {
    setInput(`.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}`);
  };

  return (
    <ToolLayout title={(t.pageTitle as string) || 'CSS to Tailwind Converter'} description={(t.pageDescription as string) || 'Convert CSS to Tailwind utility classes'} toolId="css-to-tailwind">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>CSS</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder=".class { display: flex; }" style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Tailwind Classes</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={common.resultPlaceholder} style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
      {typeof t.seoTitle === 'string' && (<div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2><p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p></div>)}
    </ToolLayout>
  );
}
