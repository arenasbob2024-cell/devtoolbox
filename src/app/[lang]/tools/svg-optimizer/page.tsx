'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface OptimizationOptions {
  removeXmlDeclaration: boolean;
  removeComments: boolean;
  removeMetadata: boolean;
  removeEditorAttrs: boolean;
  removeEmptyAttrs: boolean;
  removeDefaultAttrs: boolean;
  minifyWhitespace: boolean;
  removeUnusedXmlns: boolean;
}

const defaultOptions: OptimizationOptions = {
  removeXmlDeclaration: true,
  removeComments: true,
  removeMetadata: true,
  removeEditorAttrs: true,
  removeEmptyAttrs: true,
  removeDefaultAttrs: true,
  minifyWhitespace: true,
  removeUnusedXmlns: true,
};

const optionLabels: Record<keyof OptimizationOptions, string> = {
  removeXmlDeclaration: 'Remove XML declaration & DOCTYPE',
  removeComments: 'Remove comments',
  removeMetadata: 'Remove metadata elements (<metadata>, <title>, <desc>)',
  removeEditorAttrs: 'Remove editor attributes (inkscape:*, sodipodi:*, sketch:*)',
  removeEmptyAttrs: 'Remove empty attributes',
  removeDefaultAttrs: 'Remove default/unused attributes',
  minifyWhitespace: 'Minify (remove whitespace between tags)',
  removeUnusedXmlns: 'Remove unnecessary xmlns declarations',
};

function optimizeSvg(svgInput: string, options: OptimizationOptions): string {
  let svg = svgInput;

  // Step 1: Remove XML declaration and DOCTYPE
  if (options.removeXmlDeclaration) {
    svg = svg.replace(/<\?xml[^?]*\?>\s*/gi, '');
    svg = svg.replace(/<!DOCTYPE[^>]*>\s*/gi, '');
  }

  // Step 2: Remove comments
  if (options.removeComments) {
    svg = svg.replace(/<!--[\s\S]*?-->/g, '');
  }

  // Parse SVG with DOMParser for DOM-level optimizations
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, 'image/svg+xml');

  // Check for parse errors
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    // If parsing fails, attempt regex-only approach on original input
    return regexOnlyOptimize(svgInput, options);
  }

  const svgEl = doc.querySelector('svg');
  if (!svgEl) {
    return regexOnlyOptimize(svgInput, options);
  }

  // Step 3: Remove metadata elements
  if (options.removeMetadata) {
    const metaTags = ['metadata', 'title', 'desc'];
    metaTags.forEach(tag => {
      const els = svgEl.getElementsByTagName(tag);
      while (els.length > 0) {
        els[0].parentNode?.removeChild(els[0]);
      }
    });
  }

  // Walk the DOM tree for attribute-level optimizations
  walkDom(svgEl, options);

  // Serialize back to string
  const serializer = new XMLSerializer();
  let result = serializer.serializeToString(svgEl);

  // Step 8: Remove unnecessary xmlns declarations (keep the main SVG one)
  if (options.removeUnusedXmlns) {
    // Remove xmlns:inkscape, xmlns:sodipodi, xmlns:sketch, xmlns:rdf, xmlns:cc, xmlns:dc
    result = result.replace(/\s+xmlns:(inkscape|sodipodi|sketch|rdf|cc|dc)="[^"]*"/g, '');
    // Remove xmlns:xlink if xlink:href is not used in the result
    if (!result.includes('xlink:href')) {
      result = result.replace(/\s+xmlns:xlink="[^"]*"/g, '');
    }
  }

  // Step 7: Minify whitespace
  if (options.minifyWhitespace) {
    // Remove whitespace between tags
    result = result.replace(/>\s+</g, '><');
    // Collapse multiple spaces to one within tags
    result = result.replace(/\s{2,}/g, ' ');
    result = result.trim();
  }

  return result;
}

function walkDom(el: Element, options: OptimizationOptions) {
  // Process attributes on this element
  const attrsToRemove: string[] = [];

  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes[i];

    // Step 4: Remove editor-specific attributes
    if (options.removeEditorAttrs) {
      if (
        attr.name.startsWith('inkscape:') ||
        attr.name.startsWith('sodipodi:') ||
        attr.name.startsWith('sketch:') ||
        attr.name.startsWith('xmlns:inkscape') ||
        attr.name.startsWith('xmlns:sodipodi') ||
        attr.name.startsWith('xmlns:sketch')
      ) {
        attrsToRemove.push(attr.name);
        continue;
      }
    }

    // Step 5: Remove empty attributes
    if (options.removeEmptyAttrs) {
      if (attr.value === '' && attr.name !== 'viewBox') {
        attrsToRemove.push(attr.name);
        continue;
      }
    }

    // Step 6: Remove default/unused attributes
    if (options.removeDefaultAttrs) {
      const tag = el.tagName.toLowerCase();
      // fill="none" on group elements is often unnecessary
      if (tag === 'g' && attr.name === 'fill' && attr.value === 'none') {
        attrsToRemove.push(attr.name);
        continue;
      }
      // opacity="1" is default
      if (attr.name === 'opacity' && attr.value === '1') {
        attrsToRemove.push(attr.name);
        continue;
      }
      // fill-opacity="1" is default
      if (attr.name === 'fill-opacity' && attr.value === '1') {
        attrsToRemove.push(attr.name);
        continue;
      }
      // stroke-opacity="1" is default
      if (attr.name === 'stroke-opacity' && attr.value === '1') {
        attrsToRemove.push(attr.name);
        continue;
      }
      // stroke-width="1" is default
      if (attr.name === 'stroke-width' && attr.value === '1') {
        attrsToRemove.push(attr.name);
        continue;
      }
      // display="inline" is default
      if (attr.name === 'display' && attr.value === 'inline') {
        attrsToRemove.push(attr.name);
        continue;
      }
      // visibility="visible" is default
      if (attr.name === 'visibility' && attr.value === 'visible') {
        attrsToRemove.push(attr.name);
        continue;
      }
      // overflow="visible" is default on most SVG elements
      if (attr.name === 'overflow' && attr.value === 'visible') {
        attrsToRemove.push(attr.name);
        continue;
      }
    }
  }

  attrsToRemove.forEach(name => el.removeAttribute(name));

  // Remove editor-specific child elements (sodipodi:*, inkscape:*)
  if (options.removeEditorAttrs) {
    const childrenToRemove: Element[] = [];
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i];
      const tagName = child.tagName.toLowerCase();
      if (
        tagName.startsWith('sodipodi:') ||
        tagName.startsWith('inkscape:') ||
        tagName.startsWith('sketch:') ||
        tagName === 'sodipodi:namedview' ||
        tagName === 'inkscape:perspective'
      ) {
        childrenToRemove.push(child);
      }
    }
    childrenToRemove.forEach(child => child.parentNode?.removeChild(child));
  }

  // Recurse into children
  for (let i = 0; i < el.children.length; i++) {
    walkDom(el.children[i], options);
  }
}

function regexOnlyOptimize(svg: string, options: OptimizationOptions): string {
  let result = svg;

  if (options.removeXmlDeclaration) {
    result = result.replace(/<\?xml[^?]*\?>\s*/gi, '');
    result = result.replace(/<!DOCTYPE[^>]*>\s*/gi, '');
  }

  if (options.removeComments) {
    result = result.replace(/<!--[\s\S]*?-->/g, '');
  }

  if (options.removeMetadata) {
    result = result.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
    result = result.replace(/<title[\s\S]*?<\/title>/gi, '');
    result = result.replace(/<desc[\s\S]*?<\/desc>/gi, '');
  }

  if (options.removeEditorAttrs) {
    result = result.replace(/\s+(inkscape|sodipodi|sketch):[a-zA-Z-]+="[^"]*"/g, '');
    result = result.replace(/<(sodipodi|inkscape|sketch):[^>]*\/>/g, '');
    result = result.replace(/<(sodipodi|inkscape|sketch):[^>]*>[\s\S]*?<\/\1:[^>]*>/g, '');
  }

  if (options.removeEmptyAttrs) {
    result = result.replace(/\s+[a-zA-Z-]+=""/g, '');
  }

  if (options.removeDefaultAttrs) {
    result = result.replace(/\s+opacity="1"/g, '');
    result = result.replace(/\s+fill-opacity="1"/g, '');
    result = result.replace(/\s+stroke-opacity="1"/g, '');
    result = result.replace(/\s+stroke-width="1"/g, '');
    result = result.replace(/\s+display="inline"/g, '');
    result = result.replace(/\s+visibility="visible"/g, '');
    result = result.replace(/\s+overflow="visible"/g, '');
  }

  if (options.removeUnusedXmlns) {
    result = result.replace(/\s+xmlns:(inkscape|sodipodi|sketch|rdf|cc|dc)="[^"]*"/g, '');
    if (!result.includes('xlink:href')) {
      result = result.replace(/\s+xmlns:xlink="[^"]*"/g, '');
    }
  }

  if (options.minifyWhitespace) {
    result = result.replace(/>\s+</g, '><');
    result = result.replace(/\s{2,}/g, ' ');
    result = result.trim();
  }

  return result;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  return (bytes / 1024).toFixed(2) + ' KB';
}

const sampleSvg = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.0.dtd"
  width="200" height="200" viewBox="0 0 200 200" fill="none"
  inkscape:version="1.2" sodipodi:docname="icon.svg">
  <metadata>
    <rdf:RDF>
      <cc:Work rdf:about="">
        <dc:title>Sample Icon</dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <title>Sample SVG</title>
  <desc>A sample SVG for optimization testing</desc>
  <sodipodi:namedview id="namedview1" />
  <g opacity="1" fill-opacity="1" display="inline" visibility="visible">
    <circle cx="100" cy="100" r="80" fill="#3b82f6" stroke="#1e40af" stroke-width="4" class="" />
    <path d="M60 100 L85 125 L140 75" stroke="white" stroke-width="8"
      stroke-linecap="round" stroke-linejoin="round" fill="none"
      inkscape:connector-curvature="0" />
  </g>
  <!-- This group is decorative -->
  <g fill="none">
    <circle cx="100" cy="100" r="90" stroke="#3b82f6" stroke-width="2" stroke-dasharray="8 4" overflow="visible" />
  </g>
</svg>`;

export default function SvgOptimizer() {
  const { dict } = useLang();
  const t = dict.tools['svg-optimizer'] as Record<string, unknown>;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState<OptimizationOptions>({ ...defaultOptions });
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleOption = (key: keyof OptimizationOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOptimize = () => {
    if (!input.trim()) return;
    setError('');
    try {
      const result = optimizeSvg(input, options);
      setOutput(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Optimization failed');
      setOutput('');
    }
  };

  const handleFileRead = useCallback((file: File) => {
    if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setInput(text);
      setOutput('');
      setError('');
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileRead(file);
  }, [handleFileRead]);

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(sampleSvg);
    setOutput('');
    setError('');
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const originalSize = new Blob([input]).size;
  const optimizedSize = output ? new Blob([output]).size : 0;
  const savings = originalSize > 0 && output ? ((1 - optimizedSize / originalSize) * 100) : 0;

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'SVG Optimizer'}
      description={(t.pageDescription as string) || 'Optimize and minify SVG files'}
      toolId="svg-optimizer"
    >
      {/* File upload drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-blue)' : 'var(--border-color)'}`,
          borderRadius: 12,
          padding: 24,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: isDragging ? 'rgba(59,130,246,0.05)' : 'var(--bg-input)',
          marginBottom: 16,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg,image/svg+xml"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFileRead(f); }}
          style={{ display: 'none' }}
        />
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
          Drop an SVG file here or click to upload
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
          Or paste SVG code in the textarea below
        </p>
      </div>

      {/* Optimization options */}
      <div style={{
        background: 'var(--bg-input)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>
          Optimization Options
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
          {(Object.keys(optionLabels) as (keyof OptimizationOptions)[]).map(key => (
            <label
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => toggleOption(key)}
                style={{ accentColor: 'var(--accent-blue)' }}
              />
              {optionLabels[key]}
            </label>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleOptimize} className="btn btn-primary">Optimize</button>
        <button onClick={loadSample} className="btn btn-secondary">Load Sample</button>
        <button onClick={clearAll} className="btn btn-secondary">Clear</button>
      </div>

      {/* Error display */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          Error: {error}
        </div>
      )}

      {/* Stats bar */}
      {output && (
        <div style={{
          display: 'flex',
          gap: 20,
          padding: '10px 16px',
          background: savings > 0 ? 'rgba(34,197,94,0.08)' : 'var(--bg-input)',
          border: `1px solid ${savings > 0 ? 'rgba(34,197,94,0.3)' : 'var(--border-color)'}`,
          borderRadius: 8,
          marginBottom: 16,
          fontSize: 13,
          flexWrap: 'wrap',
        }}>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Original: </span>
            <strong style={{ color: 'var(--text-primary)' }}>{formatBytes(originalSize)}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Optimized: </span>
            <strong style={{ color: 'var(--text-primary)' }}>{formatBytes(optimizedSize)}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Savings: </span>
            <strong style={{ color: savings > 0 ? '#22c55e' : 'var(--text-primary)' }}>
              {savings.toFixed(1)}%
            </strong>
          </div>
        </div>
      )}

      {/* Side-by-side code areas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Original SVG
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your SVG code here..."
            style={{ minHeight: 300, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
          />
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {formatBytes(originalSize)}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Optimized SVG</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <CopyButton text={output} />
              <button
                onClick={handleDownload}
                className="btn btn-secondary"
                style={{ fontSize: 12, padding: '6px 12px' }}
                disabled={!output}
              >
                Download
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Optimized SVG will appear here..."
            style={{
              minHeight: 300,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              opacity: output ? 1 : 0.5,
            }}
          />
          {output && (
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              {formatBytes(optimizedSize)}
            </div>
          )}
        </div>
      </div>

      {/* SVG Preview */}
      {output && (
        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            SVG Preview
          </label>
          <div
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
              overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </div>
      )}

      {/* SEO Section */}
      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {t.seoContent as string}
          </p>
        </div>
      )}
    </ToolLayout>
  );
}
