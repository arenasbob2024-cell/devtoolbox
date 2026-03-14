'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CspGenerator() {
  const { dict } = useLang();
  const t = dict.tools['csp-generator'];

  const [directives, setDirectives] = useState({
    'default-src': { enabled: true, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
    'script-src': { enabled: true, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
    'style-src': { enabled: true, sources: { 'self': true, 'unsafe-inline': true, 'unsafe-eval': false, 'none': false }, custom: '' },
    'img-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
    'font-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
    'connect-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
    'frame-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
    'media-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
  } as any);

  const toggleDirective = (directive: string) => {
    setDirectives({
      ...directives,
      [directive]: { ...directives[directive], enabled: !directives[directive].enabled },
    });
  };

  const toggleSource = (directive: string, source: string) => {
    setDirectives({
      ...directives,
      [directive]: {
        ...directives[directive],
        sources: { ...directives[directive].sources, [source]: !directives[directive].sources[source] },
      },
    });
  };

  const setCustom = (directive: string, value: string) => {
    setDirectives({
      ...directives,
      [directive]: { ...directives[directive], custom: value },
    });
  };

  const generateCSP = () => {
    const parts: string[] = [];

    for (const [directive, config] of Object.entries(directives)) {
      if (!config.enabled) continue;

      const sources: string[] = [];
      for (const [source, enabled] of Object.entries(config.sources)) {
        if (enabled) sources.push(`'${source}'`);
      }
      if (config.custom.trim()) {
        sources.push(...config.custom.split(',').map(s => s.trim()).filter(Boolean));
      }

      if (sources.length > 0) {
        parts.push(`${directive} ${sources.join(' ')}`);
      }
    }

    return parts.join('; ');
  };

  const cspHeader = generateCSP();

  const downloadAsHeader = () => {
    const content = `Content-Security-Policy: ${cspHeader}`;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'csp-header.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="csp-generator"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setDirectives({ ...directives })} className="btn btn-primary">Update Preview</button>
        <button onClick={downloadAsHeader} className="btn btn-secondary">Download Header</button>
        <button onClick={() => { 
          setDirectives({
            'default-src': { enabled: true, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
            'script-src': { enabled: true, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
            'style-src': { enabled: true, sources: { 'self': true, 'unsafe-inline': true, 'unsafe-eval': false, 'none': false }, custom: '' },
            'img-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
            'font-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
            'connect-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
            'frame-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
            'media-src': { enabled: false, sources: { 'self': true, 'unsafe-inline': false, 'unsafe-eval': false, 'none': false }, custom: '' },
          });
        }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 20 }}>
        {Object.entries(directives).map(([directive, config]) => (
          <div key={directive} style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={() => toggleDirective(directive)}
              />
              <label style={{ fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{directive}</label>
            </div>

            {config.enabled && (
              <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {Object.entries(config.sources).map(([source, enabled]) => (
                    <div key={source} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => toggleSource(directive, source)}
                        id={`${directive}-${source}`}
                      />
                      <label htmlFor={`${directive}-${source}`} style={{ fontSize: 12, cursor: 'pointer' }}>'{source}'</label>
                    </div>
                  ))}
                </div>

                <div>
                  <input
                    type="text"
                    value={config.custom}
                    onChange={e => setCustom(directive, e.target.value)}
                    placeholder="Custom sources (comma-separated, e.g., https://example.com, *.example.com)"
                    style={{ width: '100%', fontSize: 12 }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>CSP Header Output</h3>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: 14,
          fontFamily: 'monospace',
          fontSize: 12,
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
          maxHeight: 200,
          overflowY: 'auto',
        }}>
          {cspHeader || 'No directives enabled'}
          {cspHeader && <CopyButton text={cspHeader} />}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Meta Tag Format</h3>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: 14,
          fontFamily: 'monospace',
          fontSize: 11,
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
          maxHeight: 150,
          overflowY: 'auto',
        }}>
          {`<meta http-equiv="Content-Security-Policy" content="${cspHeader}" />`}
          {cspHeader && <CopyButton text={`<meta http-equiv="Content-Security-Policy" content="${cspHeader}" />`} />}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
