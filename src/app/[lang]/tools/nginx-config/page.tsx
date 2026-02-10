'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type PresetKey = 'static' | 'reverse-proxy' | 'php' | 'spa' | 'wordpress' | 'load-balancer';

interface NginxSettings {
  serverName: string;
  listenPort: string;
  rootDir: string;
  proxyPassUrl: string;
  upstreamServers: string;
  sslEnabled: boolean;
  sslCertPath: string;
  sslKeyPath: string;
  gzipEnabled: boolean;
  securityHeaders: boolean;
  accessLog: string;
  errorLog: string;
  clientMaxBodySize: string;
  corsEnabled: boolean;
}

const defaultSettings: NginxSettings = {
  serverName: 'example.com',
  listenPort: '80',
  rootDir: '/var/www/html',
  proxyPassUrl: 'http://127.0.0.1:3000',
  upstreamServers: '127.0.0.1:3000\n127.0.0.1:3001\n127.0.0.1:3002',
  sslEnabled: false,
  sslCertPath: '/etc/letsencrypt/live/example.com/fullchain.pem',
  sslKeyPath: '/etc/letsencrypt/live/example.com/privkey.pem',
  gzipEnabled: true,
  securityHeaders: true,
  accessLog: '/var/log/nginx/access.log',
  errorLog: '/var/log/nginx/error.log',
  clientMaxBodySize: '10',
  corsEnabled: false,
};

const presets: { key: PresetKey; label: string; color: string }[] = [
  { key: 'static', label: 'Static Site', color: 'var(--accent-emerald)' },
  { key: 'reverse-proxy', label: 'Reverse Proxy', color: 'var(--accent-blue)' },
  { key: 'php', label: 'PHP (FastCGI)', color: 'var(--accent-purple)' },
  { key: 'spa', label: 'SPA (React/Vue)', color: 'var(--accent-orange)' },
  { key: 'wordpress', label: 'WordPress', color: 'var(--accent-rose)' },
  { key: 'load-balancer', label: 'Load Balancer', color: 'var(--accent-amber)' },
];

function getPresetSettings(preset: PresetKey): Partial<NginxSettings> {
  switch (preset) {
    case 'static':
      return {
        rootDir: '/var/www/html',
        proxyPassUrl: '',
        gzipEnabled: true,
        securityHeaders: true,
        corsEnabled: false,
      };
    case 'reverse-proxy':
      return {
        rootDir: '',
        proxyPassUrl: 'http://127.0.0.1:3000',
        gzipEnabled: true,
        securityHeaders: true,
        corsEnabled: false,
      };
    case 'php':
      return {
        rootDir: '/var/www/html',
        proxyPassUrl: '',
        gzipEnabled: true,
        securityHeaders: true,
        corsEnabled: false,
      };
    case 'spa':
      return {
        rootDir: '/var/www/app/dist',
        proxyPassUrl: 'http://127.0.0.1:3000',
        gzipEnabled: true,
        securityHeaders: true,
        corsEnabled: true,
      };
    case 'wordpress':
      return {
        rootDir: '/var/www/wordpress',
        proxyPassUrl: '',
        clientMaxBodySize: '64',
        gzipEnabled: true,
        securityHeaders: true,
        corsEnabled: false,
      };
    case 'load-balancer':
      return {
        rootDir: '',
        proxyPassUrl: '',
        upstreamServers: '127.0.0.1:3000\n127.0.0.1:3001\n127.0.0.1:3002',
        gzipEnabled: true,
        securityHeaders: true,
        corsEnabled: false,
      };
    default:
      return {};
  }
}

function generateConfig(settings: NginxSettings, activePreset: PresetKey): string {
  const lines: string[] = [];
  const ind = '    ';

  // Load balancer upstream block
  if (activePreset === 'load-balancer') {
    const servers = settings.upstreamServers
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
    lines.push('# Upstream backend servers');
    lines.push(`upstream backend {`);
    for (const server of servers) {
      lines.push(`${ind}server ${server};`);
    }
    lines.push('}');
    lines.push('');
  }

  // SSL redirect block
  if (settings.sslEnabled) {
    lines.push('# HTTP to HTTPS redirect');
    lines.push('server {');
    lines.push(`${ind}listen 80;`);
    lines.push(`${ind}listen [::]:80;`);
    lines.push(`${ind}server_name ${settings.serverName};`);
    lines.push('');
    lines.push(`${ind}return 301 https://$host$request_uri;`);
    lines.push('}');
    lines.push('');
  }

  // Main server block
  lines.push('server {');

  // Listen directives
  if (settings.sslEnabled) {
    lines.push(`${ind}listen 443 ssl;`);
    lines.push(`${ind}listen [::]:443 ssl;`);
  } else {
    lines.push(`${ind}listen ${settings.listenPort};`);
    lines.push(`${ind}listen [::]:${settings.listenPort};`);
  }
  lines.push('');

  // Server name
  lines.push(`${ind}server_name ${settings.serverName};`);
  lines.push('');

  // SSL configuration
  if (settings.sslEnabled) {
    lines.push(`${ind}# SSL configuration`);
    lines.push(`${ind}ssl_certificate ${settings.sslCertPath};`);
    lines.push(`${ind}ssl_certificate_key ${settings.sslKeyPath};`);
    lines.push(`${ind}ssl_protocols TLSv1.2 TLSv1.3;`);
    lines.push(`${ind}ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;`);
    lines.push(`${ind}ssl_prefer_server_ciphers off;`);
    lines.push(`${ind}ssl_session_cache shared:SSL:10m;`);
    lines.push(`${ind}ssl_session_timeout 10m;`);
    lines.push('');
  }

  // Root & index (for presets that need it)
  if (['static', 'php', 'spa', 'wordpress'].includes(activePreset) && settings.rootDir) {
    lines.push(`${ind}root ${settings.rootDir};`);
    if (activePreset === 'php' || activePreset === 'wordpress') {
      lines.push(`${ind}index index.php index.html index.htm;`);
    } else {
      lines.push(`${ind}index index.html index.htm;`);
    }
    lines.push('');
  }

  // Access & Error logs
  if (settings.accessLog) {
    lines.push(`${ind}access_log ${settings.accessLog};`);
  }
  if (settings.errorLog) {
    lines.push(`${ind}error_log ${settings.errorLog};`);
  }
  if (settings.accessLog || settings.errorLog) {
    lines.push('');
  }

  // Client max body size
  if (settings.clientMaxBodySize) {
    lines.push(`${ind}client_max_body_size ${settings.clientMaxBodySize}m;`);
    lines.push('');
  }

  // Security headers
  if (settings.securityHeaders) {
    lines.push(`${ind}# Security headers`);
    lines.push(`${ind}add_header X-Frame-Options "SAMEORIGIN" always;`);
    lines.push(`${ind}add_header X-Content-Type-Options "nosniff" always;`);
    lines.push(`${ind}add_header X-XSS-Protection "1; mode=block" always;`);
    lines.push(`${ind}add_header Referrer-Policy "no-referrer-when-downgrade" always;`);
    if (settings.sslEnabled) {
      lines.push(`${ind}add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;`);
    }
    lines.push('');
  }

  // CORS headers
  if (settings.corsEnabled) {
    lines.push(`${ind}# CORS headers`);
    lines.push(`${ind}add_header Access-Control-Allow-Origin "*" always;`);
    lines.push(`${ind}add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;`);
    lines.push(`${ind}add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization" always;`);
    lines.push('');
    lines.push(`${ind}if ($request_method = OPTIONS) {`);
    lines.push(`${ind}${ind}return 204;`);
    lines.push(`${ind}}`);
    lines.push('');
  }

  // Gzip
  if (settings.gzipEnabled) {
    lines.push(`${ind}# Gzip compression`);
    lines.push(`${ind}gzip on;`);
    lines.push(`${ind}gzip_vary on;`);
    lines.push(`${ind}gzip_proxied any;`);
    lines.push(`${ind}gzip_comp_level 6;`);
    lines.push(`${ind}gzip_min_length 256;`);
    lines.push(`${ind}gzip_types`);
    lines.push(`${ind}${ind}text/plain`);
    lines.push(`${ind}${ind}text/css`);
    lines.push(`${ind}${ind}text/javascript`);
    lines.push(`${ind}${ind}application/json`);
    lines.push(`${ind}${ind}application/javascript`);
    lines.push(`${ind}${ind}application/xml`);
    lines.push(`${ind}${ind}application/xml+rss`);
    lines.push(`${ind}${ind}image/svg+xml;`);
    lines.push('');
  }

  // Preset-specific location blocks
  switch (activePreset) {
    case 'static':
      lines.push(`${ind}location / {`);
      lines.push(`${ind}${ind}try_files $uri $uri/ =404;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}# Cache static assets`);
      lines.push(`${ind}location ~* \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {`);
      lines.push(`${ind}${ind}expires 30d;`);
      lines.push(`${ind}${ind}add_header Cache-Control "public, immutable";`);
      lines.push(`${ind}}`);
      break;

    case 'reverse-proxy':
      lines.push(`${ind}location / {`);
      lines.push(`${ind}${ind}proxy_pass ${settings.proxyPassUrl};`);
      lines.push(`${ind}${ind}proxy_http_version 1.1;`);
      lines.push(`${ind}${ind}proxy_set_header Upgrade $http_upgrade;`);
      lines.push(`${ind}${ind}proxy_set_header Connection "upgrade";`);
      lines.push(`${ind}${ind}proxy_set_header Host $host;`);
      lines.push(`${ind}${ind}proxy_set_header X-Real-IP $remote_addr;`);
      lines.push(`${ind}${ind}proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`);
      lines.push(`${ind}${ind}proxy_set_header X-Forwarded-Proto $scheme;`);
      lines.push(`${ind}${ind}proxy_cache_bypass $http_upgrade;`);
      lines.push(`${ind}}`);
      break;

    case 'php':
      lines.push(`${ind}location / {`);
      lines.push(`${ind}${ind}try_files $uri $uri/ /index.php?$query_string;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}# PHP-FPM configuration`);
      lines.push(`${ind}location ~ \\.php$ {`);
      lines.push(`${ind}${ind}fastcgi_pass unix:/run/php/php-fpm.sock;`);
      lines.push(`${ind}${ind}fastcgi_index index.php;`);
      lines.push(`${ind}${ind}fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;`);
      lines.push(`${ind}${ind}include fastcgi_params;`);
      lines.push(`${ind}${ind}fastcgi_buffers 16 16k;`);
      lines.push(`${ind}${ind}fastcgi_buffer_size 32k;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}# Deny access to .ht files`);
      lines.push(`${ind}location ~ /\\.ht {`);
      lines.push(`${ind}${ind}deny all;`);
      lines.push(`${ind}}`);
      break;

    case 'spa':
      lines.push(`${ind}location / {`);
      lines.push(`${ind}${ind}try_files $uri $uri/ /index.html;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}# API proxy`);
      lines.push(`${ind}location /api/ {`);
      lines.push(`${ind}${ind}proxy_pass ${settings.proxyPassUrl};`);
      lines.push(`${ind}${ind}proxy_http_version 1.1;`);
      lines.push(`${ind}${ind}proxy_set_header Upgrade $http_upgrade;`);
      lines.push(`${ind}${ind}proxy_set_header Connection "upgrade";`);
      lines.push(`${ind}${ind}proxy_set_header Host $host;`);
      lines.push(`${ind}${ind}proxy_set_header X-Real-IP $remote_addr;`);
      lines.push(`${ind}${ind}proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`);
      lines.push(`${ind}${ind}proxy_set_header X-Forwarded-Proto $scheme;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}# Cache static assets`);
      lines.push(`${ind}location ~* \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {`);
      lines.push(`${ind}${ind}expires 30d;`);
      lines.push(`${ind}${ind}add_header Cache-Control "public, immutable";`);
      lines.push(`${ind}}`);
      break;

    case 'wordpress':
      lines.push(`${ind}location / {`);
      lines.push(`${ind}${ind}try_files $uri $uri/ /index.php?$args;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}# PHP-FPM configuration`);
      lines.push(`${ind}location ~ \\.php$ {`);
      lines.push(`${ind}${ind}fastcgi_pass unix:/run/php/php-fpm.sock;`);
      lines.push(`${ind}${ind}fastcgi_index index.php;`);
      lines.push(`${ind}${ind}fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;`);
      lines.push(`${ind}${ind}include fastcgi_params;`);
      lines.push(`${ind}${ind}fastcgi_buffers 16 16k;`);
      lines.push(`${ind}${ind}fastcgi_buffer_size 32k;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}# WordPress: deny access to sensitive files`);
      lines.push(`${ind}location ~ /\\.ht {`);
      lines.push(`${ind}${ind}deny all;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}location = /wp-login.php {`);
      lines.push(`${ind}${ind}limit_req zone=one burst=1 nodelay;`);
      lines.push(`${ind}${ind}fastcgi_pass unix:/run/php/php-fpm.sock;`);
      lines.push(`${ind}${ind}fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;`);
      lines.push(`${ind}${ind}include fastcgi_params;`);
      lines.push(`${ind}}`);
      lines.push('');
      lines.push(`${ind}# Cache static assets`);
      lines.push(`${ind}location ~* \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {`);
      lines.push(`${ind}${ind}expires 30d;`);
      lines.push(`${ind}${ind}add_header Cache-Control "public, immutable";`);
      lines.push(`${ind}}`);
      break;

    case 'load-balancer':
      lines.push(`${ind}location / {`);
      lines.push(`${ind}${ind}proxy_pass http://backend;`);
      lines.push(`${ind}${ind}proxy_http_version 1.1;`);
      lines.push(`${ind}${ind}proxy_set_header Upgrade $http_upgrade;`);
      lines.push(`${ind}${ind}proxy_set_header Connection "upgrade";`);
      lines.push(`${ind}${ind}proxy_set_header Host $host;`);
      lines.push(`${ind}${ind}proxy_set_header X-Real-IP $remote_addr;`);
      lines.push(`${ind}${ind}proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`);
      lines.push(`${ind}${ind}proxy_set_header X-Forwarded-Proto $scheme;`);
      lines.push(`${ind}${ind}proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;`);
      lines.push(`${ind}}`);
      break;
  }

  lines.push('}');

  return lines.join('\n');
}

function highlightNginx(config: string): React.ReactNode[] {
  const keywords = [
    'server', 'location', 'upstream', 'listen', 'server_name', 'root', 'index',
    'ssl_certificate', 'ssl_certificate_key', 'ssl_protocols', 'ssl_ciphers',
    'ssl_prefer_server_ciphers', 'ssl_session_cache', 'ssl_session_timeout',
    'proxy_pass', 'proxy_http_version', 'proxy_set_header', 'proxy_cache_bypass',
    'proxy_next_upstream', 'fastcgi_pass', 'fastcgi_index', 'fastcgi_param',
    'fastcgi_buffers', 'fastcgi_buffer_size', 'include', 'try_files', 'return',
    'gzip', 'gzip_vary', 'gzip_proxied', 'gzip_comp_level', 'gzip_min_length',
    'gzip_types', 'add_header', 'expires', 'deny', 'limit_req',
    'access_log', 'error_log', 'client_max_body_size', 'if',
  ];

  return config.split('\n').map((line, i) => {
    // Comment lines
    if (line.trim().startsWith('#')) {
      return (
        <span key={i}>
          <span style={{ color: '#6a9955' }}>{line}</span>
          {'\n'}
        </span>
      );
    }

    let highlighted = line;
    let parts: React.ReactNode[] = [];

    // Simple approach: find keyword at start of trimmed line
    const trimmed = line.trim();
    let matched = false;
    for (const kw of keywords) {
      if (trimmed.startsWith(kw + ' ') || trimmed.startsWith(kw + ';') || trimmed === kw) {
        const idx = line.indexOf(kw);
        const before = line.substring(0, idx);
        const after = line.substring(idx + kw.length);
        parts = [
          <span key={`${i}-pre`}>{before}</span>,
          <span key={`${i}-kw`} style={{ color: 'var(--accent-blue)' }}>{kw}</span>,
          <span key={`${i}-post`}>{after}</span>,
        ];
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Check for block openers like "server {", "upstream backend {"
      if (trimmed.endsWith('{') || trimmed === '}') {
        const blockKeywords = ['server', 'location', 'upstream', 'if'];
        for (const bk of blockKeywords) {
          if (trimmed.startsWith(bk + ' ') || trimmed === bk) {
            const idx = line.indexOf(bk);
            const before = line.substring(0, idx);
            const after = line.substring(idx + bk.length);
            parts = [
              <span key={`${i}-pre`}>{before}</span>,
              <span key={`${i}-kw`} style={{ color: 'var(--accent-blue)' }}>{bk}</span>,
              <span key={`${i}-post`}>{after}</span>,
            ];
            matched = true;
            break;
          }
        }
      }
    }

    if (!matched) {
      parts = [<span key={i}>{highlighted}</span>];
    }

    return (
      <span key={i}>
        {parts}
        {'\n'}
      </span>
    );
  });
}

export default function NginxConfig() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['nginx-config'];

  const [activePreset, setActivePreset] = useState<PresetKey>('static');
  const [settings, setSettings] = useState<NginxSettings>({ ...defaultSettings });

  const updateSettings = useCallback((updates: Partial<NginxSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const applyPreset = useCallback((preset: PresetKey) => {
    setActivePreset(preset);
    const presetOverrides = getPresetSettings(preset);
    setSettings(prev => ({ ...prev, ...presetOverrides }));
  }, []);

  const config = useMemo(() => {
    return generateConfig(settings, activePreset);
  }, [settings, activePreset]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${settings.serverName}.conf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [config, settings.serverName]);

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

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    display: 'block',
    marginBottom: 4,
  };

  const sectionStyle: React.CSSProperties = {
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  };

  const toggleStyle = (enabled: boolean): React.CSSProperties => ({
    width: 44,
    height: 24,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    background: enabled ? 'var(--accent-blue)' : 'var(--border-color)',
    transition: 'background 0.2s',
    flexShrink: 0,
  });

  const toggleKnobStyle = (enabled: boolean): React.CSSProperties => ({
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: 'white',
    position: 'absolute',
    top: 3,
    left: enabled ? 23 : 3,
    transition: 'left 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  });

  const ToggleSwitch = ({ enabled, onChange, label }: { enabled: boolean; onChange: (v: boolean) => void; label: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        style={toggleStyle(enabled)}
        type="button"
      >
        <div style={toggleKnobStyle(enabled)} />
      </button>
    </div>
  );

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="nginx-config"
    >
      {/* Preset Templates */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Preset Templates
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {presets.map(preset => (
            <button
              key={preset.key}
              onClick={() => applyPreset(preset.key)}
              style={{
                padding: '7px 16px',
                borderRadius: 6,
                border: `1px solid ${activePreset === preset.key ? preset.color : 'var(--border-color)'}`,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                background: activePreset === preset.key ? `${preset.color}20` : 'var(--bg-input)',
                color: activePreset === preset.key ? preset.color : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Server Settings */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 14 }}>
          Server Settings
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>Server Name (Domain)</label>
            <input
              type="text"
              value={settings.serverName}
              onChange={e => updateSettings({ serverName: e.target.value })}
              placeholder="example.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Listen Port</label>
            <input
              type="text"
              value={settings.listenPort}
              onChange={e => updateSettings({ listenPort: e.target.value })}
              placeholder="80"
              style={inputStyle}
            />
          </div>
          {['static', 'php', 'spa', 'wordpress'].includes(activePreset) && (
            <div>
              <label style={labelStyle}>Root Directory</label>
              <input
                type="text"
                value={settings.rootDir}
                onChange={e => updateSettings({ rootDir: e.target.value })}
                placeholder="/var/www/html"
                style={inputStyle}
              />
            </div>
          )}
          {['reverse-proxy', 'spa'].includes(activePreset) && (
            <div>
              <label style={labelStyle}>Proxy Pass URL</label>
              <input
                type="text"
                value={settings.proxyPassUrl}
                onChange={e => updateSettings({ proxyPassUrl: e.target.value })}
                placeholder="http://127.0.0.1:3000"
                style={inputStyle}
              />
            </div>
          )}
          <div>
            <label style={labelStyle}>Client Max Body Size (MB)</label>
            <input
              type="text"
              value={settings.clientMaxBodySize}
              onChange={e => updateSettings({ clientMaxBodySize: e.target.value })}
              placeholder="10"
              style={inputStyle}
            />
          </div>
        </div>

        {activePreset === 'load-balancer' && (
          <div style={{ marginTop: 14 }}>
            <label style={labelStyle}>Upstream Servers (one per line)</label>
            <textarea
              value={settings.upstreamServers}
              onChange={e => updateSettings({ upstreamServers: e.target.value })}
              placeholder={'127.0.0.1:3000\n127.0.0.1:3001\n127.0.0.1:3002'}
              rows={4}
              style={{
                ...inputStyle,
                resize: 'vertical',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />
          </div>
        )}
      </div>

      {/* Logging */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 14 }}>
          Logging
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>Access Log Path</label>
            <input
              type="text"
              value={settings.accessLog}
              onChange={e => updateSettings({ accessLog: e.target.value })}
              placeholder="/var/log/nginx/access.log"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Error Log Path</label>
            <input
              type="text"
              value={settings.errorLog}
              onChange={e => updateSettings({ errorLog: e.target.value })}
              placeholder="/var/log/nginx/error.log"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* SSL Configuration */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 14 }}>
          SSL / TLS
        </div>
        <ToggleSwitch
          enabled={settings.sslEnabled}
          onChange={v => updateSettings({ sslEnabled: v })}
          label="Enable SSL (HTTPS)"
        />
        {settings.sslEnabled && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 10 }}>
            <div>
              <label style={labelStyle}>SSL Certificate Path</label>
              <input
                type="text"
                value={settings.sslCertPath}
                onChange={e => updateSettings({ sslCertPath: e.target.value })}
                placeholder="/etc/letsencrypt/live/example.com/fullchain.pem"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>SSL Key Path</label>
              <input
                type="text"
                value={settings.sslKeyPath}
                onChange={e => updateSettings({ sslKeyPath: e.target.value })}
                placeholder="/etc/letsencrypt/live/example.com/privkey.pem"
                style={inputStyle}
              />
            </div>
          </div>
        )}
      </div>

      {/* Feature Toggles */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 14 }}>
          Features
        </div>
        <ToggleSwitch
          enabled={settings.gzipEnabled}
          onChange={v => updateSettings({ gzipEnabled: v })}
          label="Gzip Compression"
        />
        <div style={{ borderTop: '1px solid var(--border-color)' }} />
        <ToggleSwitch
          enabled={settings.securityHeaders}
          onChange={v => updateSettings({ securityHeaders: v })}
          label="Security Headers"
        />
        <div style={{ borderTop: '1px solid var(--border-color)' }} />
        <ToggleSwitch
          enabled={settings.corsEnabled}
          onChange={v => updateSettings({ corsEnabled: v })}
          label="CORS Headers"
        />
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
            Generated Nginx Configuration
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <CopyButton text={config} label={dict.common.copy} />
            <button
              onClick={handleDownload}
              className="btn btn-primary"
              style={{ fontSize: 12, padding: '6px 12px' }}
            >
              Download .conf
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
          minHeight: 200,
          maxHeight: 600,
        }}>
          {highlightNginx(config)}
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
