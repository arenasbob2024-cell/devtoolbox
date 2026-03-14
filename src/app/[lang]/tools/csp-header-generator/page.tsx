'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CspHeaderGenerator() {
  const { dict } = useLang();
  const t = dict.tools['csp-header-generator'];

  const [directives, setDirectives] = useState({
    defaultSrc: ['self'],
    scriptSrc: ['self'],
    styleSrc: ['self', 'unsafe-inline'],
    imgSrc: ['self', 'data', 'https'],
    fontSrc: ['self'],
    connectSrc: ['self'],
    frameSrc: ['none'],
    objectSrc: ['none'],
    mediaSrc: [],
    childSrc: [],
  });

  const [customValues, setCustomValues] = useState({
    defaultSrc: '',
    scriptSrc: '',
    styleSrc: '',
    imgSrc: '',
    fontSrc: '',
    connectSrc: '',
    frameSrc: '',
    objectSrc: '',
    mediaSrc: '',
    childSrc: '',
  });

  const directiveLabels: { [key: string]: string } = {
    defaultSrc: 'Default-Src',
    scriptSrc: 'Script-Src',
    styleSrc: 'Style-Src',
    imgSrc: 'Img-Src',
    fontSrc: 'Font-Src',
    connectSrc: 'Connect-Src',
    frameSrc: 'Frame-Src',
    objectSrc: 'Object-Src',
    mediaSrc: 'Media-Src',
    childSrc: 'Child-Src',
  };

  const possibleValues = ['self', 'unsafe-inline', 'unsafe-eval', 'data', 'https', 'wasm-unsafe-eval', 'strict-dynamic'];

  const toggleValue = (directive: string, value: string) => {
    setDirectives((prev) => {
      const directive_key = directive as keyof typeof prev;
      const current = prev[directive_key];
      if (Array.isArray(current)) {
        if (current.includes(value)) {
          return {
            ...prev,
            [directive]: current.filter((v) => v !== value),
          };
        } else {
          return {
            ...prev,
            [directive]: [...current, value],
          };
        }
      }
      return prev;
    });
  };

  const generateCsp = (): string => {
    const parts: string[] = [];

    Object.entries(directives).forEach(([key, values]) => {
      const directive_key = key as keyof typeof directiveLabels;
      const label = directiveLabels[directive_key];
      let allValues = [...(values as string[])];

      // Add custom values
      const customKey = key as keyof typeof customValues;
      if (customValues[customKey]?.trim()) {
        allValues.push(...customValues[customKey].trim().split(/[\s,]+/));
      }

      if (allValues.length > 0) {
        parts.push(`${label} ${allValues.join(' ')}`);
      }
    });

    return parts.join('; ');
  };

  const getCspHeaderString = (): string => {
    const csp = generateCsp();
    return `Content-Security-Policy: ${csp}`;
  };

  const getMetaTag = (): string => {
    const csp = generateCsp();
    return `<meta http-equiv="Content-Security-Policy" content="${csp}">`;
  };

  const getNginxDirective = (): string => {
    const csp = generateCsp();
    return `add_header Content-Security-Policy "${csp}";`;
  };

  const presets = {
    strict: () => {
      setDirectives({
        defaultSrc: ['self'],
        scriptSrc: ['self'],
        styleSrc: ['self', 'unsafe-inline'],
        imgSrc: ['self', 'data', 'https'],
        fontSrc: ['self'],
        connectSrc: ['self'],
        frameSrc: ['none'],
        objectSrc: ['none'],
        mediaSrc: [],
        childSrc: [],
      });
    },
    moderate: () => {
      setDirectives({
        defaultSrc: ['self'],
        scriptSrc: ['self', 'unsafe-inline'],
        styleSrc: ['self', 'unsafe-inline'],
        imgSrc: ['self', 'data', 'https'],
        fontSrc: ['self', 'https'],
        connectSrc: ['self', 'https'],
        frameSrc: ['self'],
        objectSrc: ['none'],
        mediaSrc: ['self'],
        childSrc: ['self'],
      });
    },
    permissive: () => {
      setDirectives({
        defaultSrc: ['self'],
        scriptSrc: ['self', 'unsafe-inline', 'unsafe-eval'],
        styleSrc: ['self', 'unsafe-inline'],
        imgSrc: ['self', 'data', 'https'],
        fontSrc: ['self', 'https', 'data'],
        connectSrc: ['self', 'https'],
        frameSrc: ['self'],
        objectSrc: ['self'],
        mediaSrc: ['self'],
        childSrc: ['self'],
      });
    },
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="csp-header-generator"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={presets.strict} className="btn btn-secondary" style={{ fontSize: 12 }}>
          Strict
        </button>
        <button onClick={presets.moderate} className="btn btn-secondary" style={{ fontSize: 12 }}>
          Moderate
        </button>
        <button onClick={presets.permissive} className="btn btn-secondary" style={{ fontSize: 12 }}>
          Permissive
        </button>
        <button
          onClick={() => {
            setDirectives({
              defaultSrc: [],
              scriptSrc: [],
              styleSrc: [],
              imgSrc: [],
              fontSrc: [],
              connectSrc: [],
              frameSrc: [],
              objectSrc: [],
              mediaSrc: [],
              childSrc: [],
            });
            setCustomValues({
              defaultSrc: '',
              scriptSrc: '',
              styleSrc: '',
              imgSrc: '',
              fontSrc: '',
              connectSrc: '',
              frameSrc: '',
              objectSrc: '',
              mediaSrc: '',
              childSrc: '',
            });
          }}
          className="btn btn-secondary"
          style={{ fontSize: 12 }}
        >
          {dict.common.clear}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Directives</h3>
          {Object.entries(directiveLabels).map(([key, label]) => (
            <div key={key} style={{ marginBottom: 16, padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                {possibleValues.map((value) => (
                  <button
                    key={value}
                    onClick={() => toggleValue(key, value)}
                    style={{
                      padding: '4px 10px',
                      fontSize: 12,
                      background: (directives[key as keyof typeof directives] as string[]).includes(value)
                        ? 'var(--primary-color)'
                        : 'var(--border-color)',
                      color: (directives[key as keyof typeof directives] as string[]).includes(value) ? 'white' : 'inherit',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Custom value (space or comma separated)"
                value={customValues[key as keyof typeof customValues]}
                onChange={(e) =>
                  setCustomValues((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                style={{ width: '100%', padding: '6px 8px', fontSize: 12 }}
              />
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Output Formats</h3>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>HTTP Header</div>
            <textarea
              value={getCspHeaderString()}
              readOnly
              style={{ width: '100%', minHeight: 60, background: 'var(--bg-secondary)', fontFamily: 'monospace', fontSize: 11, padding: 8, borderRadius: 4 }}
            />
            <CopyButton text={getCspHeaderString()} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>HTML Meta Tag</div>
            <textarea
              value={getMetaTag()}
              readOnly
              style={{ width: '100%', minHeight: 60, background: 'var(--bg-secondary)', fontFamily: 'monospace', fontSize: 11, padding: 8, borderRadius: 4 }}
            />
            <CopyButton text={getMetaTag()} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Nginx Config</div>
            <textarea
              value={getNginxDirective()}
              readOnly
              style={{ width: '100%', minHeight: 60, background: 'var(--bg-secondary)', fontFamily: 'monospace', fontSize: 11, padding: 8, borderRadius: 4 }}
            />
            <CopyButton text={getNginxDirective()} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          {t.seoTitle || 'Content Security Policy Generator'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent ||
            'Generate secure Content Security Policy (CSP) headers to prevent XSS, injection attacks, and other content-based attacks. Create directives for scripts, styles, images, fonts, and more.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
          Features
        </h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Configurable CSP directives (default-src, script-src, style-src, etc.)</li>
          <li>Preset policies: Strict, Moderate, Permissive</li>
          <li>Support for common values: self, unsafe-inline, unsafe-eval, data, https</li>
          <li>Custom directive values</li>
          <li>Multiple output formats: HTTP header, HTML meta tag, Nginx config</li>
          <li>One-click copy to clipboard</li>
          <li>Real-time policy generation</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
