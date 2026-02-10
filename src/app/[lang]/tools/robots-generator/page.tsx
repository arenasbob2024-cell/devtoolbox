'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface RuleGroup {
  id: number;
  userAgent: string;
  customAgent: string;
  allowPaths: string[];
  disallowPaths: string[];
  crawlDelay: string;
}

const USER_AGENTS = ['*', 'Googlebot', 'Bingbot', 'Yandex', 'Baiduspider', 'DuckDuckBot', 'custom'];

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'anthropic-ai',
  'ClaudeBot',
  'Claude-Web',
  'Google-Extended',
  'Bytespider',
  'PerplexityBot',
  'Cohere-ai',
];

let nextId = 1;

function createRuleGroup(overrides?: Partial<RuleGroup>): RuleGroup {
  return {
    id: nextId++,
    userAgent: '*',
    customAgent: '',
    allowPaths: ['/'],
    disallowPaths: [],
    crawlDelay: '',
    ...overrides,
  };
}

export default function RobotsGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['robots-generator'];

  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([createRuleGroup()]);
  const [sitemaps, setSitemaps] = useState<string[]>(['']);
  const [host, setHost] = useState('');

  const updateGroup = useCallback((id: number, updates: Partial<RuleGroup>) => {
    setRuleGroups(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }, []);

  const removeGroup = useCallback((id: number) => {
    setRuleGroups(prev => prev.length > 1 ? prev.filter(g => g.id !== id) : prev);
  }, []);

  const addGroup = useCallback(() => {
    setRuleGroups(prev => [...prev, createRuleGroup()]);
  }, []);

  const addPath = useCallback((groupId: number, type: 'allowPaths' | 'disallowPaths') => {
    setRuleGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return { ...g, [type]: [...g[type], ''] };
    }));
  }, []);

  const updatePath = useCallback((groupId: number, type: 'allowPaths' | 'disallowPaths', index: number, value: string) => {
    setRuleGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      const paths = [...g[type]];
      paths[index] = value;
      return { ...g, [type]: paths };
    }));
  }, []);

  const removePath = useCallback((groupId: number, type: 'allowPaths' | 'disallowPaths', index: number) => {
    setRuleGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      const paths = g[type].filter((_, i) => i !== index);
      return { ...g, [type]: paths };
    }));
  }, []);

  const addSitemap = useCallback(() => {
    setSitemaps(prev => [...prev, '']);
  }, []);

  const updateSitemap = useCallback((index: number, value: string) => {
    setSitemaps(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const removeSitemap = useCallback((index: number) => {
    setSitemaps(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  }, []);

  // Presets
  const applyPreset = useCallback((preset: string) => {
    nextId = 1;
    switch (preset) {
      case 'allow-all':
        setRuleGroups([createRuleGroup({ userAgent: '*', allowPaths: ['/'], disallowPaths: [] })]);
        setSitemaps(['']);
        setHost('');
        break;
      case 'block-all':
        setRuleGroups([createRuleGroup({ userAgent: '*', allowPaths: [], disallowPaths: ['/'] })]);
        setSitemaps(['']);
        setHost('');
        break;
      case 'block-ai':
        setRuleGroups([
          createRuleGroup({ userAgent: '*', allowPaths: ['/'], disallowPaths: [] }),
          ...AI_BOTS.map(bot => createRuleGroup({ userAgent: 'custom', customAgent: bot, allowPaths: [], disallowPaths: ['/'] })),
        ]);
        setSitemaps(['']);
        setHost('');
        break;
      case 'standard':
        setRuleGroups([
          createRuleGroup({
            userAgent: '*',
            allowPaths: ['/'],
            disallowPaths: ['/admin/', '/api/', '/private/', '/tmp/', '/*.json$'],
            crawlDelay: '1',
          }),
        ]);
        setSitemaps(['https://example.com/sitemap.xml']);
        setHost('');
        break;
    }
  }, []);

  // Generate robots.txt
  const output = useMemo(() => {
    const lines: string[] = [];

    for (const group of ruleGroups) {
      const agent = group.userAgent === 'custom' ? group.customAgent.trim() : group.userAgent;
      if (!agent) continue;

      lines.push(`User-agent: ${agent}`);

      for (const path of group.disallowPaths) {
        lines.push(`Disallow: ${path}`);
      }

      for (const path of group.allowPaths) {
        if (path.trim()) {
          lines.push(`Allow: ${path}`);
        }
      }

      if (group.crawlDelay && parseInt(group.crawlDelay) > 0) {
        lines.push(`Crawl-delay: ${group.crawlDelay}`);
      }

      lines.push('');
    }

    for (const sitemap of sitemaps) {
      if (sitemap.trim()) {
        lines.push(`Sitemap: ${sitemap.trim()}`);
      }
    }

    if (host.trim()) {
      lines.push(`Host: ${host.trim()}`);
    }

    return lines.join('\n').trim();
  }, [ruleGroups, sitemaps, host]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output]);

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

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'auto' as const,
  };

  const smallBtnStyle: React.CSSProperties = {
    padding: '4px 10px',
    fontSize: 11,
    fontWeight: 600,
    border: '1px solid var(--border-color)',
    borderRadius: 5,
    background: 'var(--bg-input)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.15s',
  };

  const removeBtnStyle: React.CSSProperties = {
    ...smallBtnStyle,
    color: 'var(--accent-rose)',
    borderColor: 'var(--accent-rose)',
    flexShrink: 0,
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="robots-generator"
    >
      {/* Quick Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Quick Presets
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { key: 'allow-all', label: 'Allow All', color: 'var(--accent-emerald)' },
            { key: 'block-all', label: 'Block All', color: 'var(--accent-rose)' },
            { key: 'block-ai', label: 'Block AI Bots', color: 'var(--accent-orange)' },
            { key: 'standard', label: 'Standard Website', color: 'var(--accent-blue)' },
          ].map(preset => (
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
        </div>
      </div>

      {/* Rule Groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
        {ruleGroups.map((group, groupIndex) => (
          <div
            key={group.id}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              padding: 16,
            }}
          >
            {/* Group Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-blue)' }}>
                Rule Group {groupIndex + 1}
              </div>
              {ruleGroups.length > 1 && (
                <button
                  onClick={() => removeGroup(group.id)}
                  style={removeBtnStyle}
                >
                  Remove Group
                </button>
              )}
            </div>

            {/* User-Agent */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                User-Agent
              </label>
              <select
                value={group.userAgent}
                onChange={e => updateGroup(group.id, { userAgent: e.target.value })}
                style={selectStyle}
              >
                {USER_AGENTS.map(ua => (
                  <option key={ua} value={ua}>
                    {ua === 'custom' ? 'Custom...' : ua}
                  </option>
                ))}
              </select>
              {group.userAgent === 'custom' && (
                <input
                  type="text"
                  value={group.customAgent}
                  onChange={e => updateGroup(group.id, { customAgent: e.target.value })}
                  placeholder="Enter custom user-agent..."
                  style={{ ...inputStyle, marginTop: 6 }}
                />
              )}
            </div>

            {/* Disallow Paths */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Disallow Paths
                </label>
                <button
                  onClick={() => addPath(group.id, 'disallowPaths')}
                  style={smallBtnStyle}
                >
                  + Add Path
                </button>
              </div>
              {group.disallowPaths.length === 0 && (
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic', padding: '6px 0' }}>
                  No disallow rules (everything is allowed)
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {group.disallowPaths.map((path, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input
                      type="text"
                      value={path}
                      onChange={e => updatePath(group.id, 'disallowPaths', i, e.target.value)}
                      placeholder="/admin/"
                      style={inputStyle}
                    />
                    <button
                      onClick={() => removePath(group.id, 'disallowPaths', i)}
                      style={{ ...removeBtnStyle, padding: '6px 8px', fontSize: 13, lineHeight: 1 }}
                      title="Remove"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Allow Paths */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Allow Paths
                </label>
                <button
                  onClick={() => addPath(group.id, 'allowPaths')}
                  style={smallBtnStyle}
                >
                  + Add Path
                </button>
              </div>
              {group.allowPaths.length === 0 && (
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic', padding: '6px 0' }}>
                  No allow rules
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {group.allowPaths.map((path, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input
                      type="text"
                      value={path}
                      onChange={e => updatePath(group.id, 'allowPaths', i, e.target.value)}
                      placeholder="/"
                      style={inputStyle}
                    />
                    <button
                      onClick={() => removePath(group.id, 'allowPaths', i)}
                      style={{ ...removeBtnStyle, padding: '6px 8px', fontSize: 13, lineHeight: 1 }}
                      title="Remove"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Crawl Delay */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Crawl-delay (seconds, optional)
              </label>
              <input
                type="number"
                value={group.crawlDelay}
                onChange={e => updateGroup(group.id, { crawlDelay: e.target.value })}
                placeholder="e.g. 10"
                min={0}
                style={{ ...inputStyle, width: 150 }}
              />
            </div>
          </div>
        ))}

        <button
          onClick={addGroup}
          className="btn btn-secondary"
          style={{ alignSelf: 'flex-start', fontSize: 13 }}
        >
          + Add Rule Group
        </button>
      </div>

      {/* Sitemaps */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)' }}>
            Sitemap URLs
          </label>
          <button onClick={addSitemap} style={smallBtnStyle}>
            + Add Sitemap
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {sitemaps.map((sitemap, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input
                type="text"
                value={sitemap}
                onChange={e => updateSitemap(i, e.target.value)}
                placeholder="https://example.com/sitemap.xml"
                style={inputStyle}
              />
              {sitemaps.length > 1 && (
                <button
                  onClick={() => removeSitemap(i)}
                  style={{ ...removeBtnStyle, padding: '6px 8px', fontSize: 13, lineHeight: 1 }}
                  title="Remove"
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Host */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
      }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)', display: 'block', marginBottom: 6 }}>
          Host (optional)
        </label>
        <input
          type="text"
          value={host}
          onChange={e => setHost(e.target.value)}
          placeholder="https://example.com"
          style={inputStyle}
        />
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
          Used by Yandex to specify the preferred domain.
        </div>
      </div>

      {/* Output Preview */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            Generated robots.txt
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <CopyButton text={output} label="Copy" />
            <button
              onClick={handleDownload}
              className="btn btn-primary"
              style={{ fontSize: 12, padding: '6px 12px' }}
            >
              Download .txt
            </button>
          </div>
        </div>
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
          minHeight: 100,
        }}>
          {output || '# Your robots.txt will appear here...'}
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
