'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type DirectiveKey =
  | 'default-src'
  | 'script-src'
  | 'style-src'
  | 'img-src'
  | 'font-src'
  | 'connect-src'
  | 'media-src'
  | 'frame-src'
  | 'object-src'
  | 'base-uri'
  | 'form-action'
  | 'frame-ancestors';

interface DirectiveState {
  sources: string[];
  customDomains: string[];
}

type DirectivesMap = Record<DirectiveKey, DirectiveState>;

const DIRECTIVE_KEYS: DirectiveKey[] = [
  'default-src',
  'script-src',
  'style-src',
  'img-src',
  'font-src',
  'connect-src',
  'media-src',
  'frame-src',
  'object-src',
  'base-uri',
  'form-action',
  'frame-ancestors',
];

const KEYWORD_SOURCES = [
  "'self'",
  "'none'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "'strict-dynamic'",
  "'unsafe-hashes'",
];

const SCHEME_SOURCES = [
  'https:',
  'http:',
  'data:',
  'blob:',
  'mediastream:',
];

type OutputFormat = 'header' | 'meta' | 'nginx' | 'apache';

function createEmptyDirectives(): DirectivesMap {
  const map = {} as DirectivesMap;
  for (const key of DIRECTIVE_KEYS) {
    map[key] = { sources: [], customDomains: [] };
  }
  return map;
}

function createPreset(preset: 'strict' | 'moderate' | 'relaxed' | 'api'): {
  directives: DirectivesMap;
  upgradeInsecure: boolean;
  blockMixed: boolean;
} {
  const directives = createEmptyDirectives();
  let upgradeInsecure = false;
  let blockMixed = false;

  switch (preset) {
    case 'strict':
      directives['default-src'].sources = ["'none'"];
      directives['script-src'].sources = ["'self'"];
      directives['style-src'].sources = ["'self'"];
      directives['img-src'].sources = ["'self'"];
      directives['font-src'].sources = ["'self'"];
      directives['connect-src'].sources = ["'self'"];
      directives['frame-ancestors'].sources = ["'none'"];
      directives['base-uri'].sources = ["'self'"];
      directives['form-action'].sources = ["'self'"];
      upgradeInsecure = true;
      blockMixed = true;
      break;
    case 'moderate':
      directives['default-src'].sources = ["'self'"];
      directives['script-src'].sources = ["'self'", "'unsafe-inline'"];
      directives['style-src'].sources = ["'self'", "'unsafe-inline'"];
      directives['img-src'].sources = ["'self'", 'https:', 'data:'];
      directives['font-src'].sources = ["'self'", 'https:'];
      directives['connect-src'].sources = ["'self'", 'https:'];
      directives['frame-ancestors'].sources = ["'self'"];
      directives['base-uri'].sources = ["'self'"];
      directives['form-action'].sources = ["'self'"];
      upgradeInsecure = true;
      break;
    case 'relaxed':
      directives['default-src'].sources = ["'self'", 'https:', 'http:'];
      directives['script-src'].sources = ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https:'];
      directives['style-src'].sources = ["'self'", "'unsafe-inline'", 'https:'];
      directives['img-src'].sources = ["'self'", 'https:', 'http:', 'data:', 'blob:'];
      directives['font-src'].sources = ["'self'", 'https:', 'data:'];
      directives['connect-src'].sources = ["'self'", 'https:'];
      directives['media-src'].sources = ["'self'", 'https:', 'blob:'];
      directives['frame-src'].sources = ["'self'", 'https:'];
      break;
    case 'api':
      directives['default-src'].sources = ["'none'"];
      directives['connect-src'].sources = ["'self'"];
      directives['frame-ancestors'].sources = ["'none'"];
      directives['base-uri'].sources = ["'none'"];
      directives['form-action'].sources = ["'none'"];
      upgradeInsecure = true;
      blockMixed = true;
      break;
  }

  return { directives, upgradeInsecure, blockMixed };
}

export default function CspGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['csp-generator'];

  const [directives, setDirectives] = useState<DirectivesMap>(createEmptyDirectives);
  const [upgradeInsecure, setUpgradeInsecure] = useState(false);
  const [blockMixed, setBlockMixed] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('header');
  const [customInputs, setCustomInputs] = useState<Record<DirectiveKey, string>>(
    () => DIRECTIVE_KEYS.reduce((acc, key) => ({ ...acc, [key]: '' }), {} as Record<DirectiveKey, string>)
  );
  const [expandedDirective, setExpandedDirective] = useState<DirectiveKey | null>('default-src');

  const toggleSource = useCallback((directive: DirectiveKey, source: string) => {
    setDirectives(prev => {
      const current = prev[directive];
      const has = current.sources.includes(source);
      // If selecting 'none', clear other sources
      if (source === "'none'" && !has) {
        return {
          ...prev,
          [directive]: { ...current, sources: ["'none'"], customDomains: [] },
        };
      }
      // If selecting anything else while 'none' is active, remove 'none'
      const filtered = has
        ? current.sources.filter(s => s !== source)
        : [...current.sources.filter(s => s !== "'none'"), source];
      return {
        ...prev,
        [directive]: { ...current, sources: filtered },
      };
    });
  }, []);

  const addCustomDomain = useCallback((directive: DirectiveKey) => {
    const value = customInputs[directive].trim();
    if (!value) return;
    setDirectives(prev => {
      const current = prev[directive];
      if (current.customDomains.includes(value)) return prev;
      return {
        ...prev,
        [directive]: {
          ...current,
          sources: current.sources.filter(s => s !== "'none'"),
          customDomains: [...current.customDomains, value],
        },
      };
    });
    setCustomInputs(prev => ({ ...prev, [directive]: '' }));
  }, [customInputs]);

  const removeCustomDomain = useCallback((directive: DirectiveKey, domain: string) => {
    setDirectives(prev => {
      const current = prev[directive];
      return {
        ...prev,
        [directive]: { ...current, customDomains: current.customDomains.filter(d => d !== domain) },
      };
    });
  }, []);

  const applyPreset = useCallback((preset: 'strict' | 'moderate' | 'relaxed' | 'api') => {
    const result = createPreset(preset);
    setDirectives(result.directives);
    setUpgradeInsecure(result.upgradeInsecure);
    setBlockMixed(result.blockMixed);
  }, []);

  const clearAll = useCallback(() => {
    setDirectives(createEmptyDirectives());
    setUpgradeInsecure(false);
    setBlockMixed(false);
  }, []);

  // Generate the raw CSP policy string
  const policyString = useMemo(() => {
    const parts: string[] = [];

    for (const key of DIRECTIVE_KEYS) {
      const d = directives[key];
      const allSources = [...d.sources, ...d.customDomains];
      if (allSources.length === 0) continue;
      parts.push(`${key} ${allSources.join(' ')}`);
    }

    if (upgradeInsecure) parts.push('upgrade-insecure-requests');
    if (blockMixed) parts.push('block-all-mixed-content');

    return parts.join('; ');
  }, [directives, upgradeInsecure, blockMixed]);

  // Format the output based on selected format
  const formattedOutput = useMemo(() => {
    if (!policyString) return '';
    switch (outputFormat) {
      case 'header':
        return `Content-Security-Policy: ${policyString}`;
      case 'meta':
        return `<meta http-equiv="Content-Security-Policy" content="${policyString}">`;
      case 'nginx':
        return `add_header Content-Security-Policy "${policyString}";`;
      case 'apache':
        return `Header set Content-Security-Policy "${policyString}"`;
      default:
        return policyString;
    }
  }, [policyString, outputFormat]);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    fontSize: 13,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    outline: 'none',
  };

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 12px',
    borderRadius: 20,
    border: `1px solid ${active ? 'var(--accent-blue)' : 'var(--border-color)'}`,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    background: active ? 'var(--accent-blue)' : 'var(--bg-input)',
    color: active ? '#fff' : 'var(--text-secondary)',
    transition: 'all 0.15s',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    whiteSpace: 'nowrap' as const,
  });

  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    position: 'relative' as const,
    width: 44,
    height: 24,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    background: active ? 'var(--accent-blue)' : 'var(--border-color)',
    transition: 'background 0.2s',
    flexShrink: 0,
  });

  const toggleKnobStyle = (active: boolean): React.CSSProperties => ({
    position: 'absolute' as const,
    top: 2,
    left: active ? 22 : 2,
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#fff',
    transition: 'left 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  });

  const directiveHasValues = (key: DirectiveKey) => {
    const d = directives[key];
    return d.sources.length > 0 || d.customDomains.length > 0;
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="csp-generator"
    >
      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Presets
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {([
            { key: 'strict' as const, label: 'Strict', color: 'var(--accent-rose)' },
            { key: 'moderate' as const, label: 'Moderate', color: 'var(--accent-blue)' },
            { key: 'relaxed' as const, label: 'Relaxed', color: 'var(--accent-emerald)' },
            { key: 'api' as const, label: 'API-only', color: 'var(--accent-orange)' },
          ]).map(preset => (
            <button
              key={preset.key}
              onClick={() => applyPreset(preset.key)}
              style={{
                padding: '7px 16px',
                borderRadius: 6,
                border: `1px solid ${preset.color}`,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                background: `${preset.color}15`,
                color: preset.color,
                transition: 'all 0.2s',
              }}
            >
              {preset.label}
            </button>
          ))}
          <button
            onClick={clearAll}
            style={{
              padding: '7px 16px',
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              background: 'var(--bg-input)',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Directives */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Directives
        </div>
        {DIRECTIVE_KEYS.map(key => {
          const isExpanded = expandedDirective === key;
          const hasValues = directiveHasValues(key);
          const d = directives[key];

          return (
            <div
              key={key}
              style={{
                background: 'var(--bg-input)',
                border: `1px solid ${hasValues ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                borderRadius: 8,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              {/* Directive Header */}
              <button
                onClick={() => setExpandedDirective(isExpanded ? null : key)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <code style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: hasValues ? 'var(--accent-blue)' : 'var(--text-primary)',
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  }}>
                    {key}
                  </code>
                  {hasValues && (
                    <span style={{
                      fontSize: 11,
                      color: 'var(--text-secondary)',
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      maxWidth: 300,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {[...d.sources, ...d.customDomains].join(' ')}
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: 18,
                  transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  color: 'var(--accent-blue)',
                  flexShrink: 0,
                  marginLeft: 12,
                }}>+</span>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div style={{ padding: '0 16px 16px' }}>
                  {/* Keyword Sources */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Keywords
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {KEYWORD_SOURCES.map(source => (
                        <button
                          key={source}
                          onClick={() => toggleSource(key, source)}
                          style={chipStyle(d.sources.includes(source))}
                        >
                          {source}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scheme Sources */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Schemes
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {SCHEME_SOURCES.map(source => (
                        <button
                          key={source}
                          onClick={() => toggleSource(key, source)}
                          style={chipStyle(d.sources.includes(source))}
                        >
                          {source}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Domains */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Custom Domains
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                      <input
                        type="text"
                        value={customInputs[key]}
                        onChange={e => setCustomInputs(prev => ({ ...prev, [key]: e.target.value }))}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addCustomDomain(key);
                          }
                        }}
                        placeholder="*.googleapis.com"
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <button
                        onClick={() => addCustomDomain(key)}
                        className="btn btn-secondary"
                        style={{ fontSize: 12, padding: '6px 14px', flexShrink: 0 }}
                      >
                        Add
                      </button>
                    </div>
                    {d.customDomains.length > 0 && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {d.customDomains.map(domain => (
                          <span
                            key={domain}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              padding: '4px 10px',
                              borderRadius: 20,
                              background: 'var(--accent-blue)',
                              color: '#fff',
                              fontSize: 12,
                              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            }}
                          >
                            {domain}
                            <button
                              onClick={() => removeCustomDomain(key, domain)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: 14,
                                fontWeight: 700,
                                lineHeight: 1,
                                padding: 0,
                                opacity: 0.7,
                              }}
                            >
                              x
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Boolean Directives */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Additional Directives
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <code style={{
              fontSize: 13,
              fontWeight: 700,
              color: upgradeInsecure ? 'var(--accent-blue)' : 'var(--text-primary)',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}>
              upgrade-insecure-requests
            </code>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
              Instructs browsers to upgrade HTTP requests to HTTPS
            </div>
          </div>
          <button
            onClick={() => setUpgradeInsecure(!upgradeInsecure)}
            style={toggleBtnStyle(upgradeInsecure)}
            aria-label="Toggle upgrade-insecure-requests"
          >
            <div style={toggleKnobStyle(upgradeInsecure)} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <code style={{
              fontSize: 13,
              fontWeight: 700,
              color: blockMixed ? 'var(--accent-blue)' : 'var(--text-primary)',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}>
              block-all-mixed-content
            </code>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
              Prevents loading any mixed content (HTTP on HTTPS pages)
            </div>
          </div>
          <button
            onClick={() => setBlockMixed(!blockMixed)}
            style={toggleBtnStyle(blockMixed)}
            aria-label="Toggle block-all-mixed-content"
          >
            <div style={toggleKnobStyle(blockMixed)} />
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
      }}>
        {/* Format Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', borderRadius: 8, padding: 3 }}>
            {([
              { key: 'header' as const, label: 'HTTP Header' },
              { key: 'meta' as const, label: 'Meta Tag' },
              { key: 'nginx' as const, label: 'Nginx' },
              { key: 'apache' as const, label: 'Apache' },
            ]).map(fmt => (
              <button
                key={fmt.key}
                onClick={() => setOutputFormat(fmt.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: outputFormat === fmt.key ? 'var(--accent-blue)' : 'transparent',
                  color: outputFormat === fmt.key ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.15s',
                }}
              >
                {fmt.label}
              </button>
            ))}
          </div>
          <CopyButton text={formattedOutput} label="Copy" />
        </div>

        {/* Output */}
        <pre style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: 16,
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: 'var(--accent-emerald)',
          lineHeight: 1.6,
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          margin: 0,
          minHeight: 80,
        }}>
          {formattedOutput || '# Configure directives above to generate your CSP header...'}
        </pre>
      </div>

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
