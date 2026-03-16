'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function parsePlistXml(xml: string): unknown {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) throw new Error('Invalid XML: ' + errorNode.textContent?.substring(0, 100));

  const plist = doc.querySelector('plist');
  if (!plist) throw new Error('Not a valid plist: missing <plist> root element');

  const firstChild = plist.children[0];
  if (!firstChild) throw new Error('Empty plist');
  return parsePlistNode(firstChild);
}

function parsePlistNode(node: Element): unknown {
  const tag = node.tagName;
  switch (tag) {
    case 'dict': {
      const obj: Record<string, unknown> = {};
      const children = Array.from(node.children);
      for (let i = 0; i < children.length; i += 2) {
        if (children[i].tagName !== 'key') continue;
        const key = children[i].textContent || '';
        const val = children[i + 1] ? parsePlistNode(children[i + 1]) : null;
        obj[key] = val;
      }
      return obj;
    }
    case 'array':
      return Array.from(node.children).map(c => parsePlistNode(c));
    case 'string':
      return node.textContent || '';
    case 'integer':
      return parseInt(node.textContent || '0', 10);
    case 'real':
      return parseFloat(node.textContent || '0');
    case 'true':
      return true;
    case 'false':
      return false;
    case 'date':
      return node.textContent || '';
    case 'data':
      return node.textContent?.trim() || '';
    default:
      return node.textContent || '';
  }
}

function jsonToPlist(obj: unknown, indent = 2): string {
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
  ];
  lines.push(jsonValueToPlist(obj, indent));
  lines.push('</plist>');
  return lines.join('\n');
}

function jsonValueToPlist(val: unknown, indent: number): string {
  const pad = ' '.repeat(indent);
  if (val === null || val === undefined) return `${pad}<string></string>`;
  if (typeof val === 'boolean') return `${pad}<${val}/>`;
  if (typeof val === 'number') {
    return Number.isInteger(val) ? `${pad}<integer>${val}</integer>` : `${pad}<real>${val}</real>`;
  }
  if (typeof val === 'string') {
    const escaped = val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `${pad}<string>${escaped}</string>`;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return `${pad}<array/>`;
    const items = val.map(v => jsonValueToPlist(v, indent + 2)).join('\n');
    return `${pad}<array>\n${items}\n${pad}</array>`;
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>);
    if (entries.length === 0) return `${pad}<dict/>`;
    const items = entries.map(([k, v]) => {
      const escaped = k.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `${pad}  <key>${escaped}</key>\n${jsonValueToPlist(v, indent + 2)}`;
    }).join('\n');
    return `${pad}<dict>\n${items}\n${pad}</dict>`;
  }
  return `${pad}<string>${String(val)}</string>`;
}

export default function PlistToJsonConverter() {
  const { dict } = useLang();
  const t = dict.tools['plist-to-json'] as Record<string, string>;

  const [plistInput, setPlistInput] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const convertToJson = () => {
    try {
      const parsed = parsePlistXml(plistInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid Plist XML');
    }
  };

  const convertToPlist = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setPlistInput(jsonToPlist(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const loadSample = () => {
    setPlistInput(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key>
  <string>MyApp</string>
  <key>CFBundleVersion</key>
  <string>1.0.0</string>
  <key>CFBundleIdentifier</key>
  <string>com.example.myapp</string>
  <key>LSRequiresIPhoneOS</key>
  <true/>
  <key>UIRequiredDeviceCapabilities</key>
  <array>
    <string>armv7</string>
    <string>arm64</string>
  </array>
  <key>UISupportedInterfaceOrientations</key>
  <array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationLandscapeLeft</string>
  </array>
  <key>MinimumOSVersion</key>
  <string>14.0</string>
  <key>BuildNumber</key>
  <integer>42</integer>
</dict>
</plist>`);
    setJsonInput('');
    setError('');
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="plist-to-json">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convertToJson} className="btn btn-primary">{t.plistToJson || 'Plist → JSON'}</button>
        <button onClick={convertToPlist} className="btn btn-secondary">{t.jsonToPlist || 'JSON → Plist'}</button>
        <button onClick={loadSample} className="btn btn-ghost">{dict.common.loadSample}</button>
        <button onClick={() => { setPlistInput(''); setJsonInput(''); setError(''); }} className="btn btn-ghost">{dict.common.clear}</button>
      </div>

      {error && (
        <div style={{ color: 'var(--accent-rose)', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(244,63,94,0.1)', borderRadius: 6 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Plist (XML)</label>
            <CopyButton text={plistInput} />
          </div>
          <textarea
            value={plistInput}
            onChange={e => setPlistInput(e.target.value)}
            placeholder={t.plistPlaceholder || 'Paste your Apple Plist XML here...'}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON</label>
            <CopyButton text={jsonInput} />
          </div>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder={t.jsonPlaceholder || 'Paste your JSON here...'}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
