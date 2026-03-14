'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface NginxConfig {
  serverName: string;
  proxyPass: string;
  proxyHost: string;
  proxyPort: string;
  enableSSL: boolean;
  certPath: string;
  keyPath: string;
  enableGzip: boolean;
  enableCache: boolean;
  cacheTime: string;
  clientMaxBodySize: string;
}

export default function NginxConfigGenerator() {
  const { dict } = useLang();
  const t = dict.tools['nginx-config-generator'];
  const [config, setConfig] = useState<NginxConfig>({
    serverName: 'example.com www.example.com',
    proxyPass: 'http://localhost:3000',
    proxyHost: '$host',
    proxyPort: '80',
    enableSSL: false,
    certPath: '/etc/ssl/certs/example.crt',
    keyPath: '/etc/ssl/private/example.key',
    enableGzip: true,
    enableCache: false,
    cacheTime: '1h',
    clientMaxBodySize: '100m',
  });

  const updateConfig = (key: keyof NginxConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const generateNginxConfig = (): string => {
    let conf = '';

    if (config.enableSSL) {
      conf += `# HTTP to HTTPS redirect\nserver {\n  listen 80;\n  server_name ${config.serverName};\n  return 301 https://$server_name$request_uri;\n}\n\n`;
    }

    conf += `server {\n`;
    conf += `  listen ${config.enableSSL ? '443 ssl' : '80'};\n`;
    conf += `  server_name ${config.serverName};\n\n`;

    if (config.enableSSL) {
      conf += `  ssl_certificate ${config.certPath};\n`;
      conf += `  ssl_certificate_key ${config.keyPath};\n`;
      conf += `  ssl_protocols TLSv1.2 TLSv1.3;\n`;
      conf += `  ssl_ciphers HIGH:!aNULL:!MD5;\n\n`;
    }

    if (config.enableGzip) {
      conf += `  gzip on;\n`;
      conf += `  gzip_types text/plain text/css text/javascript application/json application/javascript;\n`;
      conf += `  gzip_min_length 1024;\n\n`;
    }

    if (config.enableCache) {
      conf += `  proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=${config.cacheTime};\n`;
      conf += `  proxy_cache my_cache;\n`;
      conf += `  proxy_cache_valid 200 ${config.cacheTime};\n\n`;
    }

    conf += `  client_max_body_size ${config.clientMaxBodySize};\n\n`;

    conf += `  location / {\n`;
    conf += `    proxy_pass ${config.proxyPass};\n`;
    conf += `    proxy_set_header Host ${config.proxyHost};\n`;
    conf += `    proxy_set_header X-Real-IP $remote_addr;\n`;
    conf += `    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n`;
    conf += `    proxy_set_header X-Forwarded-Proto $scheme;\n`;
    conf += `    proxy_read_timeout 90;\n`;
    conf += `  }\n`;

    conf += `}\n`;
    return conf;
  };

  const nginxCode = generateNginxConfig();

  const loadSample = () => {
    setConfig({
      serverName: 'api.example.com',
      proxyPass: 'http://localhost:3000',
      proxyHost: '$host',
      proxyPort: '3000',
      enableSSL: true,
      certPath: '/etc/letsencrypt/live/api.example.com/fullchain.pem',
      keyPath: '/etc/letsencrypt/live/api.example.com/privkey.pem',
      enableGzip: true,
      enableCache: true,
      cacheTime: '1h',
      clientMaxBodySize: '50m',
    });
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="nginx-config-generator"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => {
          setConfig({
            serverName: 'example.com www.example.com',
            proxyPass: 'http://localhost:3000',
            proxyHost: '$host',
            proxyPort: '80',
            enableSSL: false,
            certPath: '/etc/ssl/certs/example.crt',
            keyPath: '/etc/ssl/private/example.key',
            enableGzip: true,
            enableCache: false,
            cacheTime: '1h',
            clientMaxBodySize: '100m',
          });
        }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Configuration Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* Column 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.serverNameLabel || 'Server Name'}</label>
            <input
              type="text"
              value={config.serverName}
              onChange={e => updateConfig('serverName', e.target.value)}
              placeholder="example.com www.example.com"
              style={{ fontSize: 13 }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.proxyPassLabel || 'Proxy Pass (Backend URL)'}</label>
            <input
              type="text"
              value={config.proxyPass}
              onChange={e => updateConfig('proxyPass', e.target.value)}
              placeholder="http://localhost:3000"
              style={{ fontSize: 13 }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.proxyHostLabel || 'Proxy Host Header'}</label>
            <input
              type="text"
              value={config.proxyHost}
              onChange={e => updateConfig('proxyHost', e.target.value)}
              placeholder="$host"
              style={{ fontSize: 13 }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.clientMaxBodySizeLabel || 'Client Max Body Size'}</label>
            <input
              type="text"
              value={config.clientMaxBodySize}
              onChange={e => updateConfig('clientMaxBodySize', e.target.value)}
              placeholder="100m"
              style={{ fontSize: 13 }}
            />
          </div>
        </div>

        {/* Column 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={config.enableSSL}
                onChange={e => updateConfig('enableSSL', e.target.checked)}
              />
              {t.enableSSLLabel || 'Enable SSL/TLS'}
            </label>
          </div>

          {config.enableSSL && (
            <>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.certPathLabel || 'Certificate Path'}</label>
                <input
                  type="text"
                  value={config.certPath}
                  onChange={e => updateConfig('certPath', e.target.value)}
                  style={{ fontSize: 13 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.keyPathLabel || 'Key Path'}</label>
                <input
                  type="text"
                  value={config.keyPath}
                  onChange={e => updateConfig('keyPath', e.target.value)}
                  style={{ fontSize: 13 }}
                />
              </div>
            </>
          )}

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={config.enableGzip}
                onChange={e => updateConfig('enableGzip', e.target.checked)}
              />
              {t.enableGzipLabel || 'Enable Gzip Compression'}
            </label>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={config.enableCache}
                onChange={e => updateConfig('enableCache', e.target.checked)}
              />
              {t.enableCacheLabel || 'Enable Caching'}
            </label>
          </div>

          {config.enableCache && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.cacheTimeLabel || 'Cache Duration'}</label>
              <input
                type="text"
                value={config.cacheTime}
                onChange={e => updateConfig('cacheTime', e.target.value)}
                placeholder="1h"
                style={{ fontSize: 13 }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Output */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600 }}>{t.configOutputLabel || 'Nginx Configuration'}</h3>
          <CopyButton text={nginxCode} />
        </div>
        <textarea
          value={nginxCode}
          readOnly
          style={{ minHeight: 400, background: 'var(--bg-secondary)', cursor: 'default', fontFamily: 'monospace', fontSize: 12 }}
        />
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'Nginx Configuration Generator'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Generate production-ready Nginx server configurations. Create reverse proxy setups, SSL/TLS configurations, gzip compression, and caching rules with ease.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Reverse proxy configuration with upstream backend'}</li>
          <li>{t.seoFeature2 || 'SSL/TLS with automatic HTTP to HTTPS redirect'}</li>
          <li>{t.seoFeature3 || 'Gzip compression and caching settings'}</li>
          <li>{t.seoFeature4 || 'Production-ready output'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
