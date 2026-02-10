'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface Redirect {
  id: number;
  from: string;
  to: string;
}

let nextRedirectId = 1;

export default function HtaccessGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['htaccess-generator'];

  // --- Redirects ---
  const [enableRedirects, setEnableRedirects] = useState(false);
  const [forceHttps, setForceHttps] = useState(true);
  const [wwwHandling, setWwwHandling] = useState<'none' | 'www-to-non' | 'non-to-www'>('none');
  const [customRedirects, setCustomRedirects] = useState<Redirect[]>([]);

  // --- Security ---
  const [enableSecurity, setEnableSecurity] = useState(false);
  const [disableDirBrowsing, setDisableDirBrowsing] = useState(true);
  const [disableServerSig, setDisableServerSig] = useState(true);
  const [protectDotFiles, setProtectDotFiles] = useState(true);
  const [enableHotlinkProtection, setEnableHotlinkProtection] = useState(false);
  const [hotlinkDomain, setHotlinkDomain] = useState('');

  // --- Caching ---
  const [enableCaching, setEnableCaching] = useState(false);
  const [cacheImages, setCacheImages] = useState('2592000');
  const [cacheCss, setCacheCss] = useState('604800');
  const [cacheJs, setCacheJs] = useState('604800');
  const [cacheFonts, setCacheFonts] = useState('2592000');

  // --- Compression ---
  const [enableCompression, setEnableCompression] = useState(false);

  // --- Error Pages ---
  const [enableErrorPages, setEnableErrorPages] = useState(false);
  const [error404, setError404] = useState('/404.html');
  const [error403, setError403] = useState('/403.html');
  const [error500, setError500] = useState('/500.html');

  // --- CORS ---
  const [enableCors, setEnableCors] = useState(false);
  const [corsOrigin, setCorsOrigin] = useState('*');

  // --- URL Rewriting ---
  const [enableUrlRewriting, setEnableUrlRewriting] = useState(false);
  const [trailingSlash, setTrailingSlash] = useState<'none' | 'add' | 'remove'>('none');
  const [removeExtension, setRemoveExtension] = useState<'none' | 'php' | 'html'>('none');

  // --- Redirect helpers ---
  const addRedirect = useCallback(() => {
    setCustomRedirects(prev => [...prev, { id: nextRedirectId++, from: '', to: '' }]);
  }, []);

  const updateRedirect = useCallback((id: number, field: 'from' | 'to', value: string) => {
    setCustomRedirects(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  }, []);

  const removeRedirect = useCallback((id: number) => {
    setCustomRedirects(prev => prev.filter(r => r.id !== id));
  }, []);

  // --- Generate output ---
  const output = useMemo(() => {
    const sections: string[] = [];

    // Redirects
    if (enableRedirects) {
      const lines: string[] = [];
      lines.push('# ==============================');
      lines.push('# Redirects');
      lines.push('# ==============================');

      if (forceHttps) {
        lines.push('');
        lines.push('# Force HTTPS');
        lines.push('RewriteEngine On');
        lines.push('RewriteCond %{HTTPS} off');
        lines.push('RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]');
      }

      if (wwwHandling === 'www-to-non') {
        lines.push('');
        lines.push('# Redirect www to non-www');
        lines.push('RewriteEngine On');
        lines.push('RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]');
        lines.push('RewriteRule ^(.*)$ https://%1/$1 [R=301,L]');
      } else if (wwwHandling === 'non-to-www') {
        lines.push('');
        lines.push('# Redirect non-www to www');
        lines.push('RewriteEngine On');
        lines.push('RewriteCond %{HTTP_HOST} !^www\\. [NC]');
        lines.push('RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]');
      }

      const validRedirects = customRedirects.filter(r => r.from.trim() && r.to.trim());
      if (validRedirects.length > 0) {
        lines.push('');
        lines.push('# Custom 301 Redirects');
        for (const r of validRedirects) {
          lines.push(`Redirect 301 ${r.from} ${r.to}`);
        }
      }

      sections.push(lines.join('\n'));
    }

    // Security
    if (enableSecurity) {
      const lines: string[] = [];
      lines.push('# ==============================');
      lines.push('# Security');
      lines.push('# ==============================');

      if (disableDirBrowsing) {
        lines.push('');
        lines.push('# Disable directory browsing');
        lines.push('Options -Indexes');
      }

      if (disableServerSig) {
        lines.push('');
        lines.push('# Disable server signature');
        lines.push('ServerSignature Off');
      }

      if (protectDotFiles) {
        lines.push('');
        lines.push('# Protect sensitive files (.env, .git, .htaccess, etc.)');
        lines.push('<FilesMatch "^\\.(env|git|htaccess|htpasswd|ini|log|sh|sql)">');
        lines.push('  Order allow,deny');
        lines.push('  Deny from all');
        lines.push('</FilesMatch>');
      }

      if (enableHotlinkProtection && hotlinkDomain.trim()) {
        lines.push('');
        lines.push('# Hotlink protection');
        lines.push('RewriteEngine On');
        lines.push(`RewriteCond %{HTTP_REFERER} !^$`);
        lines.push(`RewriteCond %{HTTP_REFERER} !^https?://(www\\.)?${hotlinkDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/ [NC]`);
        lines.push('RewriteRule \\.(jpg|jpeg|png|gif|svg|webp)$ - [F,NC,L]');
      }

      sections.push(lines.join('\n'));
    }

    // Caching
    if (enableCaching) {
      const lines: string[] = [];
      lines.push('# ==============================');
      lines.push('# Browser Caching');
      lines.push('# ==============================');
      lines.push('');
      lines.push('<IfModule mod_expires.c>');
      lines.push('  ExpiresActive On');
      lines.push('');
      lines.push('  # Images');
      lines.push(`  ExpiresByType image/jpeg "access plus ${cacheImages} seconds"`);
      lines.push(`  ExpiresByType image/png "access plus ${cacheImages} seconds"`);
      lines.push(`  ExpiresByType image/gif "access plus ${cacheImages} seconds"`);
      lines.push(`  ExpiresByType image/svg+xml "access plus ${cacheImages} seconds"`);
      lines.push(`  ExpiresByType image/webp "access plus ${cacheImages} seconds"`);
      lines.push('');
      lines.push('  # CSS');
      lines.push(`  ExpiresByType text/css "access plus ${cacheCss} seconds"`);
      lines.push('');
      lines.push('  # JavaScript');
      lines.push(`  ExpiresByType application/javascript "access plus ${cacheJs} seconds"`);
      lines.push(`  ExpiresByType text/javascript "access plus ${cacheJs} seconds"`);
      lines.push('');
      lines.push('  # Fonts');
      lines.push(`  ExpiresByType font/woff2 "access plus ${cacheFonts} seconds"`);
      lines.push(`  ExpiresByType font/woff "access plus ${cacheFonts} seconds"`);
      lines.push(`  ExpiresByType application/font-woff2 "access plus ${cacheFonts} seconds"`);
      lines.push(`  ExpiresByType application/font-woff "access plus ${cacheFonts} seconds"`);
      lines.push('');
      lines.push('</IfModule>');

      sections.push(lines.join('\n'));
    }

    // Compression
    if (enableCompression) {
      const lines: string[] = [];
      lines.push('# ==============================');
      lines.push('# GZIP Compression');
      lines.push('# ==============================');
      lines.push('');
      lines.push('<IfModule mod_deflate.c>');
      lines.push('  AddOutputFilterByType DEFLATE text/html');
      lines.push('  AddOutputFilterByType DEFLATE text/css');
      lines.push('  AddOutputFilterByType DEFLATE text/javascript');
      lines.push('  AddOutputFilterByType DEFLATE application/javascript');
      lines.push('  AddOutputFilterByType DEFLATE application/json');
      lines.push('  AddOutputFilterByType DEFLATE application/xml');
      lines.push('  AddOutputFilterByType DEFLATE text/xml');
      lines.push('  AddOutputFilterByType DEFLATE text/plain');
      lines.push('  AddOutputFilterByType DEFLATE image/svg+xml');
      lines.push('  AddOutputFilterByType DEFLATE application/font-woff');
      lines.push('  AddOutputFilterByType DEFLATE application/font-woff2');
      lines.push('</IfModule>');

      sections.push(lines.join('\n'));
    }

    // Error Pages
    if (enableErrorPages) {
      const lines: string[] = [];
      lines.push('# ==============================');
      lines.push('# Custom Error Pages');
      lines.push('# ==============================');
      if (error404.trim()) {
        lines.push(`ErrorDocument 404 ${error404.trim()}`);
      }
      if (error403.trim()) {
        lines.push(`ErrorDocument 403 ${error403.trim()}`);
      }
      if (error500.trim()) {
        lines.push(`ErrorDocument 500 ${error500.trim()}`);
      }

      sections.push(lines.join('\n'));
    }

    // CORS
    if (enableCors) {
      const lines: string[] = [];
      lines.push('# ==============================');
      lines.push('# CORS Headers');
      lines.push('# ==============================');
      lines.push('');
      lines.push('<IfModule mod_headers.c>');
      lines.push(`  Header set Access-Control-Allow-Origin "${corsOrigin.trim() || '*'}"`);
      lines.push('  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"');
      lines.push('  Header set Access-Control-Allow-Headers "Content-Type, Authorization"');
      lines.push('</IfModule>');

      sections.push(lines.join('\n'));
    }

    // URL Rewriting
    if (enableUrlRewriting) {
      const lines: string[] = [];
      lines.push('# ==============================');
      lines.push('# URL Rewriting');
      lines.push('# ==============================');
      lines.push('RewriteEngine On');

      if (trailingSlash === 'add') {
        lines.push('');
        lines.push('# Add trailing slash');
        lines.push('RewriteCond %{REQUEST_FILENAME} !-f');
        lines.push('RewriteCond %{REQUEST_URI} !(.*)/$');
        lines.push('RewriteRule ^(.*)$ /$1/ [L,R=301]');
      } else if (trailingSlash === 'remove') {
        lines.push('');
        lines.push('# Remove trailing slash');
        lines.push('RewriteCond %{REQUEST_FILENAME} !-d');
        lines.push('RewriteCond %{REQUEST_URI} (.+)/$');
        lines.push('RewriteRule ^(.+)/$ /$1 [L,R=301]');
      }

      if (removeExtension === 'php') {
        lines.push('');
        lines.push('# Remove .php extension');
        lines.push('RewriteCond %{REQUEST_FILENAME} !-d');
        lines.push('RewriteCond %{REQUEST_FILENAME}\\.php -f');
        lines.push('RewriteRule ^(.*)$ $1.php [L]');
      } else if (removeExtension === 'html') {
        lines.push('');
        lines.push('# Remove .html extension');
        lines.push('RewriteCond %{REQUEST_FILENAME} !-d');
        lines.push('RewriteCond %{REQUEST_FILENAME}\\.html -f');
        lines.push('RewriteRule ^(.*)$ $1.html [L]');
      }

      sections.push(lines.join('\n'));
    }

    if (sections.length === 0) {
      return '';
    }

    return sections.join('\n\n');
  }, [
    enableRedirects, forceHttps, wwwHandling, customRedirects,
    enableSecurity, disableDirBrowsing, disableServerSig, protectDotFiles, enableHotlinkProtection, hotlinkDomain,
    enableCaching, cacheImages, cacheCss, cacheJs, cacheFonts,
    enableCompression,
    enableErrorPages, error404, error403, error500,
    enableCors, corsOrigin,
    enableUrlRewriting, trailingSlash, removeExtension,
  ]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.htaccess';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output]);

  // --- Styles ---
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

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  };

  const cardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--text-primary)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    display: 'block',
    marginBottom: 4,
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

  const toggleStyle = (enabled: boolean): React.CSSProperties => ({
    width: 40,
    height: 22,
    borderRadius: 11,
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    background: enabled ? 'var(--accent-blue)' : 'var(--border-color)',
    transition: 'background 0.2s',
    flexShrink: 0,
  });

  const toggleDotStyle = (enabled: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: 3,
    left: enabled ? 21 : 3,
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: '#fff',
    transition: 'left 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  });

  const checkboxRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '6px 0',
  };

  const cacheOptions = [
    { label: '1 hour', value: '3600' },
    { label: '1 day', value: '86400' },
    { label: '1 week', value: '604800' },
    { label: '1 month', value: '2592000' },
    { label: '1 year', value: '31536000' },
  ];

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={toggleStyle(enabled)}
      type="button"
      aria-pressed={enabled}
    >
      <span style={toggleDotStyle(enabled)} />
    </button>
  );

  const Checkbox = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
    <label style={checkboxRowStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ accentColor: 'var(--accent-blue)', width: 16, height: 16, cursor: 'pointer' }}
      />
      <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{label}</span>
    </label>
  );

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="htaccess-generator"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* ===== 1. Redirects ===== */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={sectionTitleStyle}>Redirects</span>
            <Toggle enabled={enableRedirects} onToggle={() => setEnableRedirects(v => !v)} />
          </div>
          {enableRedirects && (
            <div style={{ marginTop: 14 }}>
              <Checkbox checked={forceHttps} onChange={setForceHttps} label="Force HTTPS (HTTP to HTTPS)" />

              <div style={{ marginTop: 8 }}>
                <label style={labelStyle}>WWW Handling</label>
                <select
                  value={wwwHandling}
                  onChange={e => setWwwHandling(e.target.value as 'none' | 'www-to-non' | 'non-to-www')}
                  style={{ ...selectStyle, width: 260 }}
                >
                  <option value="none">No change</option>
                  <option value="www-to-non">www to non-www</option>
                  <option value="non-to-www">non-www to www</option>
                </select>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Custom 301 Redirects</label>
                  <button onClick={addRedirect} style={smallBtnStyle}>+ Add Redirect</button>
                </div>
                {customRedirects.length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic', padding: '4px 0' }}>
                    No custom redirects configured.
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {customRedirects.map(r => (
                    <div key={r.id} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <input
                        type="text"
                        value={r.from}
                        onChange={e => updateRedirect(r.id, 'from', e.target.value)}
                        placeholder="/old-page"
                        style={inputStyle}
                      />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', flexShrink: 0 }}>to</span>
                      <input
                        type="text"
                        value={r.to}
                        onChange={e => updateRedirect(r.id, 'to', e.target.value)}
                        placeholder="/new-page"
                        style={inputStyle}
                      />
                      <button
                        onClick={() => removeRedirect(r.id)}
                        style={{ ...removeBtnStyle, padding: '6px 8px', fontSize: 13, lineHeight: 1 }}
                        title="Remove"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== 2. Security ===== */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={sectionTitleStyle}>Security</span>
            <Toggle enabled={enableSecurity} onToggle={() => setEnableSecurity(v => !v)} />
          </div>
          {enableSecurity && (
            <div style={{ marginTop: 14 }}>
              <Checkbox checked={disableDirBrowsing} onChange={setDisableDirBrowsing} label="Disable directory browsing" />
              <Checkbox checked={disableServerSig} onChange={setDisableServerSig} label="Disable server signature" />
              <Checkbox checked={protectDotFiles} onChange={setProtectDotFiles} label="Protect sensitive files (.env, .git, etc.)" />
              <Checkbox checked={enableHotlinkProtection} onChange={setEnableHotlinkProtection} label="Hotlink protection" />
              {enableHotlinkProtection && (
                <div style={{ marginTop: 6, paddingLeft: 26 }}>
                  <label style={labelStyle}>Your domain (without https://)</label>
                  <input
                    type="text"
                    value={hotlinkDomain}
                    onChange={e => setHotlinkDomain(e.target.value)}
                    placeholder="example.com"
                    style={{ ...inputStyle, width: 280 }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== 3. Caching ===== */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={sectionTitleStyle}>Browser Caching</span>
            <Toggle enabled={enableCaching} onToggle={() => setEnableCaching(v => !v)} />
          </div>
          {enableCaching && (
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Images (JPG, PNG, GIF, SVG, WebP)</label>
                <select value={cacheImages} onChange={e => setCacheImages(e.target.value)} style={selectStyle}>
                  {cacheOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>CSS</label>
                <select value={cacheCss} onChange={e => setCacheCss(e.target.value)} style={selectStyle}>
                  {cacheOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>JavaScript</label>
                <select value={cacheJs} onChange={e => setCacheJs(e.target.value)} style={selectStyle}>
                  {cacheOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Fonts (WOFF, WOFF2)</label>
                <select value={cacheFonts} onChange={e => setCacheFonts(e.target.value)} style={selectStyle}>
                  {cacheOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* ===== 4. Compression ===== */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={sectionTitleStyle}>GZIP / Deflate Compression</span>
            <Toggle enabled={enableCompression} onToggle={() => setEnableCompression(v => !v)} />
          </div>
          {enableCompression && (
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Enables mod_deflate for text/html, text/css, application/javascript, application/json, application/xml, text/xml, text/plain, image/svg+xml, and font files.
            </div>
          )}
        </div>

        {/* ===== 5. Error Pages ===== */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={sectionTitleStyle}>Custom Error Pages</span>
            <Toggle enabled={enableErrorPages} onToggle={() => setEnableErrorPages(v => !v)} />
          </div>
          {enableErrorPages && (
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={labelStyle}>404 Not Found</label>
                <input type="text" value={error404} onChange={e => setError404(e.target.value)} placeholder="/404.html" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>403 Forbidden</label>
                <input type="text" value={error403} onChange={e => setError403(e.target.value)} placeholder="/403.html" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>500 Internal Server Error</label>
                <input type="text" value={error500} onChange={e => setError500(e.target.value)} placeholder="/500.html" style={inputStyle} />
              </div>
            </div>
          )}
        </div>

        {/* ===== 6. CORS ===== */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={sectionTitleStyle}>CORS Headers</span>
            <Toggle enabled={enableCors} onToggle={() => setEnableCors(v => !v)} />
          </div>
          {enableCors && (
            <div style={{ marginTop: 14 }}>
              <label style={labelStyle}>Access-Control-Allow-Origin</label>
              <input
                type="text"
                value={corsOrigin}
                onChange={e => setCorsOrigin(e.target.value)}
                placeholder="* or https://example.com"
                style={{ ...inputStyle, width: 320 }}
              />
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                Use * to allow all origins, or specify a domain like https://example.com
              </div>
            </div>
          )}
        </div>

        {/* ===== 7. URL Rewriting ===== */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={sectionTitleStyle}>URL Rewriting</span>
            <Toggle enabled={enableUrlRewriting} onToggle={() => setEnableUrlRewriting(v => !v)} />
          </div>
          {enableUrlRewriting && (
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Trailing Slash</label>
                <select
                  value={trailingSlash}
                  onChange={e => setTrailingSlash(e.target.value as 'none' | 'add' | 'remove')}
                  style={selectStyle}
                >
                  <option value="none">No change</option>
                  <option value="add">Add trailing slash</option>
                  <option value="remove">Remove trailing slash</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Remove Extension</label>
                <select
                  value={removeExtension}
                  onChange={e => setRemoveExtension(e.target.value as 'none' | 'php' | 'html')}
                  style={selectStyle}
                >
                  <option value="none">No change</option>
                  <option value="php">Remove .php</option>
                  <option value="html">Remove .html</option>
                </select>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ===== Output ===== */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginTop: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            Generated .htaccess
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <CopyButton text={output} label="Copy" />
            <button
              onClick={handleDownload}
              className="btn btn-primary"
              style={{ fontSize: 12, padding: '6px 12px' }}
              disabled={!output}
            >
              Download .htaccess
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
          {output || '# Enable sections above to generate your .htaccess file...'}
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
