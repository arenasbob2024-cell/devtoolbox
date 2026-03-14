'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface HtaccessConfig {
  redirects: boolean;
  urlRewrite: boolean;
  accessControl: boolean;
  mimeTypes: boolean;
  caching: boolean;
  securityHeaders: boolean;
  forceHttps: boolean;
  errorPages: boolean;
}

export default function HtaccessGenerator() {
  const { dict } = useLang();
  const t = dict.tools['htaccess-generator'];
  
  const [config, setConfig] = useState<HtaccessConfig>({
    redirects: false,
    urlRewrite: false,
    accessControl: false,
    mimeTypes: false,
    caching: false,
    securityHeaders: false,
    forceHttps: false,
    errorPages: false,
  });

  const [redirectSource, setRedirectSource] = useState('');
  const [redirectTarget, setRedirectTarget] = useState('');
  const [redirectCode, setRedirectCode] = useState('301');
  const [rewriteRule, setRewriteRule] = useState('');
  const [blockIp, setBlockIp] = useState('');
  const [customPattern, setCustomPattern] = useState('');

  const generateHtaccess = () => {
    let content = '# Generated .htaccess configuration\n# Last updated: ' + new Date().toISOString().split('T')[0] + '\n\n';

    if (config.forceHttps) {
      content += `# Force HTTPS redirect\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{HTTPS} off\n  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n</IfModule>\n\n`;
    }

    if (config.redirects && redirectSource && redirectTarget) {
      content += `# Redirect Rules\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteRule ^${redirectSource}$ ${redirectTarget} [R=${redirectCode},L]\n</IfModule>\n\n`;
    }

    if (config.urlRewrite && rewriteRule) {
      content += `# URL Rewriting\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  ${rewriteRule}\n</IfModule>\n\n`;
    }

    if (config.accessControl) {
      if (blockIp) {
        content += `# Block IPs\n<IfModule mod_authz_core.c>\n  Require all granted\n  Require not ip ${blockIp}\n</IfModule>\n\n`;
      }
      content += `# Basic Authentication\n<IfModule mod_auth_basic.c>\n  # AuthType Basic\n  # AuthName "Restricted Area"\n  # AuthUserFile /path/to/.htpasswd\n  # Require valid-user\n</IfModule>\n\n`;
    }

    if (config.mimeTypes) {
      content += `# MIME Types\n<IfModule mod_mime.c>\n  AddType application/javascript .js\n  AddType application/json .json\n  AddType text/css .css\n  AddType image/svg+xml .svg\n  AddType font/ttf .ttf\n  AddType font/woff .woff\n  AddType font/woff2 .woff2\n</IfModule>\n\n`;
    }

    if (config.caching) {
      content += `# Browser Caching\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresDefault "access plus 1 day"\n  ExpiresByType text/html "access plus 1 hour"\n  ExpiresByType text/css "access plus 1 year"\n  ExpiresByType application/javascript "access plus 1 year"\n  ExpiresByType image/* "access plus 1 month"\n  ExpiresByType font/* "access plus 1 year"\n</IfModule>\n\n`;
      content += `# Cache Control Headers\n<IfModule mod_headers.c>\n  <FilesMatch "\\.(jpg|jpeg|png|gif|ico|css|js|pdf|txt)$">\n    Header set Cache-Control "max-age=31536000, public"\n  </FilesMatch>\n  <FilesMatch "\\.html$">\n    Header set Cache-Control "max-age=3600, public"\n  </FilesMatch>\n</IfModule>\n\n`;
    }

    if (config.securityHeaders) {
      content += `# Security Headers\n<IfModule mod_headers.c>\n  Header set X-Frame-Options "SAMEORIGIN"\n  Header set X-Content-Type-Options "nosniff"\n  Header set X-XSS-Protection "1; mode=block"\n  Header set Referrer-Policy "strict-origin-when-cross-origin"\n  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"\n  # Uncomment below for strict CSP\n  # Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"\n</IfModule>\n\n`;
    }

    if (config.errorPages) {
      content += `# Custom Error Pages\nErrorDocument 400 "Bad Request - The server cannot process the request."\nErrorDocument 403 "Forbidden - You do not have permission to access this resource."\nErrorDocument 404 "Not Found - The requested page does not exist."\nErrorDocument 500 "Internal Server Error - The server encountered an unexpected condition."\nErrorDocument 503 "Service Unavailable - The server is temporarily down for maintenance."\n\n`;
    }

    if (customPattern) {
      content += `# Custom Rules\n${customPattern}\n\n`;
    }

    return content || '# .htaccess - Add rules using the toggles above\n';
  };

  const output = generateHtaccess();

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="htaccess-generator"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Controls Panel */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
            {t.configLabel || 'Configuration'}
          </h3>

          {/* Section Toggles */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
              {t.sectionsLabel || 'Enabled Sections'}
            </h4>
            {[
              { key: 'forceHttps' as const, label: t.forceHttpsLabel || 'Force HTTPS' },
              { key: 'redirects' as const, label: t.redirectsLabel || 'Redirects' },
              { key: 'urlRewrite' as const, label: t.rewriteLabel || 'URL Rewriting' },
              { key: 'accessControl' as const, label: t.accessLabel || 'Access Control' },
              { key: 'mimeTypes' as const, label: t.mimeLabel || 'MIME Types' },
              { key: 'caching' as const, label: t.cachingLabel || 'Caching' },
              { key: 'securityHeaders' as const, label: t.securityLabel || 'Security Headers' },
              { key: 'errorPages' as const, label: t.errorLabel || 'Error Pages' },
            ].map(({ key, label }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, cursor: 'pointer', fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={config[key]}
                  onChange={(e) => setConfig({ ...config, [key]: e.target.checked })}
                  style={{ cursor: 'pointer' }}
                />
                {label}
              </label>
            ))}
          </div>

          {/* Conditional Input Fields */}
          {config.redirects && (
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>
                {t.redirectConfigLabel || 'Redirect Configuration'}
              </h4>
              <input
                type="text"
                value={redirectSource}
                onChange={(e) => setRedirectSource(e.target.value)}
                placeholder={t.sourcePlaceholder || 'Source pattern (e.g., old-page)'}
                style={{ marginBottom: 10 }}
              />
              <input
                type="text"
                value={redirectTarget}
                onChange={(e) => setRedirectTarget(e.target.value)}
                placeholder={t.targetPlaceholder || 'Target URL (e.g., /new-page)'}
                style={{ marginBottom: 10 }}
              />
              <select value={redirectCode} onChange={(e) => setRedirectCode(e.target.value)} style={{ marginBottom: 0 }}>
                <option value="301">301 (Permanent)</option>
                <option value="302">302 (Temporary)</option>
                <option value="307">307 (Temporary Redirect)</option>
              </select>
            </div>
          )}

          {config.urlRewrite && (
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>
                {t.rewriteRuleLabel || 'RewriteRule'}
              </h4>
              <textarea
                value={rewriteRule}
                onChange={(e) => setRewriteRule(e.target.value)}
                placeholder={t.rewritePlaceholder || 'RewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^(.*)$ index.php?url=$1 [QSA,L]'}
                style={{ minHeight: 80, marginBottom: 0 }}
              />
            </div>
          )}

          {config.accessControl && (
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>
                {t.blockIpLabel || 'Block IP Address'}
              </h4>
              <input
                type="text"
                value={blockIp}
                onChange={(e) => setBlockIp(e.target.value)}
                placeholder={t.ipPlaceholder || '192.168.1.1 or 192.168.1.0/24'}
                style={{ marginBottom: 0 }}
              />
            </div>
          )}

          {/* Custom Rules */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>
              {t.customRulesLabel || 'Custom Rules'}
            </h4>
            <textarea
              value={customPattern}
              onChange={(e) => setCustomPattern(e.target.value)}
              placeholder={t.customPlaceholder || 'Add any custom .htaccess rules here...'}
              style={{ minHeight: 100, marginBottom: 0 }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              {t.outputLabel || 'Generated .htaccess'}
            </h3>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 'calc(100vh - 400px)', fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About .htaccess Generator'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
          {t.seoContent || 'Create Apache .htaccess configurations for URL redirects, security headers, caching, and more. This generator helps you configure common Apache web server rules without manual syntax errors.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Key Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Generate 301/302 redirects and URL rewrites'}</li>
          <li>{t.seoFeature2 || 'Configure HTTPS enforcement and security headers'}</li>
          <li>{t.seoFeature3 || 'Set browser caching and expires headers'}</li>
          <li>{t.seoFeature4 || 'Manage IP blocking and authentication rules'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
