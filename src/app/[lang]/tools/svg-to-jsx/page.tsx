'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function svgToJsx(svg: string, componentName: string, wrapComponent: boolean): string {
  let jsx = svg;

  const attrMap: Record<string, string> = {
    'clip-path': 'clipPath', 'clip-rule': 'clipRule', 'fill-opacity': 'fillOpacity',
    'fill-rule': 'fillRule', 'font-family': 'fontFamily', 'font-size': 'fontSize',
    'font-weight': 'fontWeight', 'letter-spacing': 'letterSpacing', 'line-height': 'lineHeight',
    'marker-end': 'markerEnd', 'marker-mid': 'markerMid', 'marker-start': 'markerStart',
    'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity', 'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset', 'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin', 'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-opacity': 'strokeOpacity', 'stroke-width': 'strokeWidth',
    'text-anchor': 'textAnchor', 'text-decoration': 'textDecoration',
    'dominant-baseline': 'dominantBaseline', 'flood-color': 'floodColor',
    'flood-opacity': 'floodOpacity', 'pointer-events': 'pointerEvents',
    'shape-rendering': 'shapeRendering', 'image-rendering': 'imageRendering',
    'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace',
    'color-interpolation': 'colorInterpolation', 'color-interpolation-filters': 'colorInterpolationFilters',
  };

  for (const [from, to] of Object.entries(attrMap)) {
    jsx = jsx.replace(new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=`, 'g'), `${to}=`);
  }

  jsx = jsx.replace(/\bclass=/g, 'className=');

  jsx = jsx.replace(/style="([^"]*)"/g, (_, styleStr: string) => {
    const props = styleStr.split(';').filter(Boolean).map(prop => {
      const [key, ...vals] = prop.split(':');
      if (!key || vals.length === 0) return '';
      const camelKey = key.trim().replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
      return `${camelKey}: "${vals.join(':').trim()}"`;
    }).filter(Boolean);
    return `style={{${props.join(', ')}}}`;
  });

  if (wrapComponent) {
    jsx = jsx.replace(/\s*xmlns="[^"]*"/g, '');
    return `const ${componentName} = (props) => (\n  ${jsx.split('\n').join('\n  ')}\n);\n\nexport default ${componentName};`;
  }

  return jsx;
}

export default function SvgToJsx() {
  const { dict } = useLang();
  const t = dict.tools['svg-to-jsx'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [componentName, setComponentName] = useState('Icon');
  const [wrapComponent, setWrapComponent] = useState(true);

  const convert = () => { try { setOutput(svgToJsx(input, componentName, wrapComponent)); } catch { setOutput('Error converting SVG'); } };

  const loadSample = () => {
    setInput(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
  <circle cx="12" cy="12" r="10" fill-opacity="0.5" />
  <path d="M8 12l2 2 4-4" stroke-dasharray="10" />
</svg>`);
  };

  return (
    <ToolLayout title={(t.pageTitle as string) || 'SVG to JSX Converter'} description={(t.pageDescription as string) || 'Convert SVG to JSX React components'} toolId="svg-to-jsx">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Component:</label>
            <input value={componentName} onChange={e => setComponentName(e.target.value || 'Icon')} style={{ width: 80, padding: '4px 8px', fontSize: 12 }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={wrapComponent} onChange={e => setWrapComponent(e.target.checked)} /> Wrap as Component
          </label>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>SVG</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='<svg>...</svg>' style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSX / React</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={common.resultPlaceholder} style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
      {typeof t.seoTitle === 'string' && (<div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2><p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p></div>)}
    </ToolLayout>
  );
}
