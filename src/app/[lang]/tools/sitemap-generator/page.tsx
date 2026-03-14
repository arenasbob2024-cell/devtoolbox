'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface SitemapEntry {
  url: string;
  changefreq: string;
  priority: string;
  lastmod: string;
}

export default function SitemapGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as any)['sitemap-generator'];
  const [entries, setEntries] = useState<SitemapEntry[]>([{ url: 'https://example.com/', changefreq: 'weekly', priority: '1.0', lastmod: new Date().toISOString().split('T')[0] }]);
  const [bulkUrls, setBulkUrls] = useState('');
  const [output, setOutput] = useState('');

  const addEntry = () => setEntries([...entries, { url: '', changefreq: 'weekly', priority: '0.5', lastmod: new Date().toISOString().split('T')[0] }]);
  const removeEntry = (i: number) => setEntries(entries.filter((_, idx) => idx !== i));
  const updateEntry = (i: number, field: keyof SitemapEntry, value: string) => {
    const updated = [...entries];
    updated[i] = { ...updated[i], [field]: value };
    setEntries(updated);
  };

  const addBulkUrls = () => {
    const urls = bulkUrls.split('\n').map(u => u.trim()).filter(u => u);
    const newEntries = urls.map(url => ({ url, changefreq: 'weekly', priority: '0.5', lastmod: new Date().toISOString().split('T')[0] }));
    setEntries([...entries, ...newEntries]);
    setBulkUrls('');
  };

  const generate = () => {
    const valid = entries.filter(e => e.url);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${valid.map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
    setOutput(xml);
  };

  const download = () => {
    const blob = new Blob([output], { type: 'application/xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sitemap.xml';
    a.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="sitemap-generator">
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={addEntry} className="btn btn-primary">+ Add URL</button>
          <button onClick={generate} className="btn btn-secondary">Generate Sitemap</button>
        </div>

        {entries.map((entry, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.5fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <input value={entry.url} onChange={e => updateEntry(i, 'url', e.target.value)} placeholder="https://example.com/page" style={{ padding: 8, fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            <select value={entry.changefreq} onChange={e => updateEntry(i, 'changefreq', e.target.value)} style={{ padding: 8, fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }}>
              {['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <select value={entry.priority} onChange={e => updateEntry(i, 'priority', e.target.value)} style={{ padding: 8, fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }}>
              {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="date" value={entry.lastmod} onChange={e => updateEntry(i, 'lastmod', e.target.value)} style={{ padding: 8, fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            <button onClick={() => removeEntry(i)} className="btn btn-secondary" style={{ fontSize: 11, padding: '6px 10px', color: 'var(--accent-rose)' }}>✕</button>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Bulk Add URLs (one per line)</div>
        <textarea value={bulkUrls} onChange={e => setBulkUrls(e.target.value)} placeholder={"https://example.com/page1\nhttps://example.com/page2"} style={{ minHeight: 80, marginBottom: 8 }} />
        <button onClick={addBulkUrls} className="btn btn-secondary" style={{ fontSize: 11 }}>Add URLs</button>
      </div>

      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Generated Sitemap XML ({entries.filter(e => e.url).length} URLs)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <CopyButton text={output} />
              <button onClick={download} className="btn btn-secondary" style={{ fontSize: 11 }}>Download XML</button>
            </div>
          </div>
          <textarea value={output} readOnly style={{ minHeight: 300, fontFamily: 'var(--font-jetbrains)', fontSize: 11 }} />
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
