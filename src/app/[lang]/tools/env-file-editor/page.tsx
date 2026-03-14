'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface EnvPair {
  key: string;
  value: string;
  id: string;
}

export default function EnvFileEditor() {
  const { dict } = useLang();
  const t = dict.tools['env-file-editor'];
  const [pairs, setPairs] = useState<EnvPair[]>([]);
  const [rawContent, setRawContent] = useState('');
  const [exportFormat, setExportFormat] = useState<'env' | 'json' | 'shell' | 'docker'>('env');

  const addPair = () => {
    const newId = Date.now().toString();
    setPairs([...pairs, { key: '', value: '', id: newId }]);
  };

  const updatePair = (id: string, field: 'key' | 'value', val: string) => {
    setPairs(pairs.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  const removePair = (id: string) => {
    setPairs(pairs.filter(p => p.id !== id));
  };

  const parseEnvContent = () => {
    if (!rawContent.trim()) return;
    const newPairs: EnvPair[] = [];
    const lines = rawContent.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex !== -1) {
          const key = trimmed.substring(0, eqIndex).trim();
          const value = trimmed.substring(eqIndex + 1).trim();
          newPairs.push({ key, value, id: Date.now().toString() + Math.random() });
        }
      }
    });
    setPairs(newPairs);
    setRawContent('');
  };

  const exportContent = () => {
    let output = '';
    switch (exportFormat) {
      case 'env':
        output = pairs.map(p => `${p.key}=${p.value}`).join('\n');
        break;
      case 'json':
        output = JSON.stringify(Object.fromEntries(pairs.map(p => [p.key, p.value])), null, 2);
        break;
      case 'shell':
        output = pairs.map(p => `export ${p.key}="${p.value}"`).join('\n');
        break;
      case 'docker':
        output = pairs.map(p => `ENV ${p.key}=${p.value}`).join('\n');
        break;
    }
    return output;
  };

  const exportedContent = exportContent();

  const loadSample = () => {
    setPairs([
      { key: 'DATABASE_URL', value: 'postgres://user:pass@localhost:5432/db', id: '1' },
      { key: 'API_KEY', value: 'sk_live_51234567890abcdef', id: '2' },
      { key: 'NODE_ENV', value: 'development', id: '3' },
      { key: 'JWT_SECRET', value: 'your_jwt_secret_key_here', id: '4' },
    ]);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="env-file-editor"
    >
      {/* Format Tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {['env', 'json', 'shell', 'docker'].map(fmt => (
          <button
            key={fmt}
            onClick={() => setExportFormat(fmt as any)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              background: exportFormat === fmt ? 'var(--accent-blue)' : 'var(--bg-secondary)',
              color: exportFormat === fmt ? 'white' : 'var(--text-primary)',
            }}
          >
            {fmt.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={addPair} className="btn btn-primary">{t.addPairBtn || 'Add Pair'}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => setPairs([])} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Editor Mode */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.editorLabel || 'Key-Value Pairs'}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pairs.length === 0 && (
            <div style={{ color: 'var(--text-secondary)', fontSize: 13, padding: 16, textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 6 }}>
              {t.noPairsMsg || 'No pairs added yet. Click "Add Pair" to start.'}
            </div>
          )}
          {pairs.map(pair => (
            <div key={pair.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 8, alignItems: 'center' }}>
              <input
                type="text"
                value={pair.key}
                onChange={e => updatePair(pair.id, 'key', e.target.value)}
                placeholder="KEY_NAME"
                style={{ fontSize: 13 }}
              />
              <input
                type="text"
                value={pair.value}
                onChange={e => updatePair(pair.id, 'value', e.target.value)}
                placeholder="value"
                style={{ fontSize: 13 }}
              />
              <button
                onClick={() => removePair(pair.id)}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(244, 63, 94, 0.1)',
                  color: 'var(--accent-rose)',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {dict.common.remove || 'Remove'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Parse Mode */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.parseLabel || 'Or Paste Existing .env Content'}</h3>
        <textarea
          value={rawContent}
          onChange={e => setRawContent(e.target.value)}
          placeholder=".env file content..."
          style={{ minHeight: 120, marginBottom: 8 }}
        />
        <button onClick={parseEnvContent} className="btn btn-secondary">{t.parseBtn || 'Parse Content'}</button>
      </div>

      {/* Export */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600 }}>{t.exportLabel || `Export as ${exportFormat.toUpperCase()}`}</h3>
          {exportedContent && <CopyButton text={exportedContent} />}
        </div>
        <textarea
          value={exportedContent}
          readOnly
          style={{ minHeight: 200, background: 'var(--bg-secondary)', cursor: 'default' }}
        />
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'What is an .env File Editor?'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'An environment file editor helps you manage configuration variables safely. Convert between .env, JSON, shell export, and Docker ENV formats. Perfect for development, deployment, and configuration management.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Visual key-value pair editor'}</li>
          <li>{t.seoFeature2 || 'Parse existing .env files'}</li>
          <li>{t.seoFeature3 || 'Export to multiple formats (JSON, shell export, Docker)'}</li>
          <li>{t.seoFeature4 || 'Variable expansion support'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
