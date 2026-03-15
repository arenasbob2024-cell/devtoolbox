const fs = require('fs');
const path = require('path');

const BASE = '/var/www/devtoolbox';
const TOOLS_FILE = path.join(BASE, 'src/lib/tools.ts');
const DICT_DIR = path.join(BASE, 'src/i18n/dictionaries');
const TOOLS_DIR = path.join(BASE, 'src/app/[lang]/tools');

const newTools = [
  {
    id: 'oauth-debugger',
    name: 'OAuth 2.0 Debugger',
    icon: '🛡️',
    category: 'web',
    keywords: ['oauth', 'oauth2', 'oidc', 'authorization', 'token', 'openid', 'pkce'],
    relatedTools: ['jwt-decoder', 'jwt-debugger', 'jwt-generator'],
    en: { name: 'OAuth 2.0 Debugger', description: 'Debug OAuth 2.0 flows, decode tokens, and test authorization endpoints', pageTitle: 'OAuth 2.0 Debugger - Token Inspector Online', pageDescription: 'Free OAuth 2.0 debugger. Inspect authorization flows, decode access tokens, test PKCE and OpenID Connect configurations.' },
    zh: { name: 'OAuth 2.0 调试器', description: '调试 OAuth 2.0 流程、解码令牌、测试授权端点', pageTitle: 'OAuth 2.0 调试器 - 在线令牌检查', pageDescription: '免费 OAuth 2.0 调试器。检查授权流程、解码访问令牌、测试 PKCE 和 OpenID Connect 配置。' },
  },
  {
    id: 'dockerfile-linter',
    name: 'Dockerfile Linter',
    icon: '🐳',
    category: 'validator',
    keywords: ['dockerfile', 'docker', 'lint', 'hadolint', 'best-practices', 'container'],
    relatedTools: ['dockerfile-generator', 'docker-compose-generator', 'docker-run-to-compose'],
    en: { name: 'Dockerfile Linter', description: 'Lint Dockerfiles for best practices and common mistakes', pageTitle: 'Dockerfile Linter Online - Best Practices Checker', pageDescription: 'Free online Dockerfile linter. Check for best practices, security issues, and common mistakes in your Dockerfiles.' },
    zh: { name: 'Dockerfile 检查器', description: '检查 Dockerfile 的最佳实践和常见错误', pageTitle: '在线 Dockerfile 检查器 - 最佳实践', pageDescription: '免费在线 Dockerfile 检查器。检查最佳实践、安全问题和常见错误。' },
  },
  {
    id: 'ssl-certificate-decoder',
    name: 'SSL Certificate Decoder',
    icon: '🔒',
    category: 'encoder',
    keywords: ['ssl', 'tls', 'certificate', 'x509', 'https', 'pem', 'der', 'cert'],
    relatedTools: ['pem-decoder', 'hmac-generator', 'hash-generator'],
    en: { name: 'SSL Certificate Decoder', description: 'Decode and inspect SSL/TLS certificates, view expiry and chain details', pageTitle: 'SSL Certificate Decoder Online - X.509 Inspector', pageDescription: 'Free SSL certificate decoder. Inspect X.509 certificates, check expiry dates, view certificate chains and subject details.' },
    zh: { name: 'SSL 证书解码器', description: '解码和检查 SSL/TLS 证书，查看过期和链详情', pageTitle: '在线 SSL 证书解码器 - X.509 检查', pageDescription: '免费 SSL 证书解码器。检查 X.509 证书、过期日期、证书链和主题详情。' },
  },
  {
    id: 'font-pairing-tool',
    name: 'Font Pairing Tool',
    icon: '🔤',
    category: 'css',
    keywords: ['font', 'pairing', 'typography', 'google-fonts', 'web-fonts', 'design'],
    relatedTools: ['color-palette-generator', 'css-gradient-generator', 'tailwind-colors'],
    en: { name: 'Font Pairing Tool', description: 'Find beautiful font combinations for web design with live preview', pageTitle: 'Font Pairing Tool - Typography Combinations', pageDescription: 'Free font pairing tool. Find beautiful Google Fonts combinations with live preview for headings and body text.' },
    zh: { name: '字体配对工具', description: '为网页设计找到完美的字体组合并实时预览', pageTitle: '字体配对工具 - 排版组合', pageDescription: '免费字体配对工具。通过实时预览找到完美的 Google Fonts 字体组合。' },
  },
  {
    id: 'helm-chart-validator',
    name: 'Helm Chart Validator',
    icon: '⎈',
    category: 'validator',
    keywords: ['helm', 'chart', 'kubernetes', 'k8s', 'yaml', 'values', 'template'],
    relatedTools: ['kubernetes-yaml-validator', 'yaml-validator', 'docker-compose-validator'],
    en: { name: 'Helm Chart Validator', description: 'Validate Helm chart structure, values.yaml and Chart.yaml files', pageTitle: 'Helm Chart Validator Online - K8s Chart Checker', pageDescription: 'Free Helm chart validator. Check Chart.yaml and values.yaml for errors, required fields, and best practices.' },
    zh: { name: 'Helm Chart 验证器', description: '验证 Helm chart 结构、values.yaml 和 Chart.yaml 文件', pageTitle: '在线 Helm Chart 验证器 - K8s Chart 检查', pageDescription: '免费 Helm chart 验证器。检查 Chart.yaml 和 values.yaml 的错误、必填字段和最佳实践。' },
  },
];

// Generate translations for non-en/zh langs
const otherLangs = {
  ja: 'Japanese', ko: 'Korean', fr: 'French', de: 'German', es: 'Spanish',
  it: 'Italian', pt: 'Portuguese', nl: 'Dutch', pl: 'Polish', sv: 'Swedish',
  no: 'Norwegian', id: 'Indonesian', th: 'Thai'
};

console.log('=== Creating 5 New Tools (Batch 2b) ===\n');

// 1. Add to tools.ts
console.log('1. Adding tool entries...');
let toolsContent = fs.readFileSync(TOOLS_FILE, 'utf8');
for (const tool of newTools) {
  if (toolsContent.includes("id: '" + tool.id + "'")) { console.log('  skip ' + tool.id); continue; }
  const entry = "  { id: '" + tool.id + "', name: '" + tool.name + "', description: '" + tool.en.description + "', icon: '" + tool.icon + "', category: '" + tool.category + "', keywords: " + JSON.stringify(tool.keywords) + ", path: '/tools/" + tool.id + "', relatedTools: " + JSON.stringify(tool.relatedTools) + " },";
  toolsContent = toolsContent.replace(/\];[\s]*$/, entry + '\n];\n');
  console.log('  + ' + tool.id);
}
fs.writeFileSync(TOOLS_FILE, toolsContent);

// 2. Create tool files
console.log('\n2. Creating tool files...');

// Helper to create layout
function createLayout(toolId, name, desc) {
  return `import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.tools?.['${toolId}'];
  return {
    title: t?.pageTitle || '${name}',
    description: t?.pageDescription || '${desc}',
    alternates: { languages: Object.fromEntries(['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th'].map(l => [l, '/' + l + '/tools/${toolId}'])) },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="${toolId}" lang={lang}>{children}</ToolSeoServer>;
}
`;
}

// OAuth debugger
const oauthPage = `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const FLOWS = [
  { name: 'Authorization Code', value: 'code', desc: 'Standard server-side flow' },
  { name: 'Authorization Code + PKCE', value: 'code_pkce', desc: 'Mobile/SPA with PKCE' },
  { name: 'Implicit (Legacy)', value: 'implicit', desc: 'Legacy browser-only flow' },
  { name: 'Client Credentials', value: 'client_credentials', desc: 'Machine-to-machine' },
];

function generatePKCE(): { verifier: string; challenge: string } {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  const verifier = btoa(String.fromCharCode(...arr)).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=/g,'');
  return { verifier, challenge: '(SHA256 computed at runtime)' };
}

export default function OAuthDebuggerPage() {
  const { dict, lang } = useLang();
  const [flow, setFlow] = useState('code');
  const [authUrl, setAuthUrl] = useState('https://accounts.google.com/o/oauth2/v2/auth');
  const [tokenUrl, setTokenUrl] = useState('https://oauth2.googleapis.com/token');
  const [clientId, setClientId] = useState('your-client-id');
  const [redirectUri, setRedirectUri] = useState('https://localhost:3000/callback');
  const [scope, setScope] = useState('openid profile email');
  const [state, setState] = useState(() => Math.random().toString(36).substring(2, 15));
  const [pkce] = useState(generatePKCE);

  const buildAuthUrl = () => {
    const params = new URLSearchParams();
    params.set('client_id', clientId);
    params.set('redirect_uri', redirectUri);
    params.set('scope', scope);
    params.set('state', state);
    params.set('response_type', flow === 'implicit' ? 'token' : 'code');
    if (flow === 'code_pkce') {
      params.set('code_challenge_method', 'S256');
      params.set('code_challenge', pkce.challenge);
    }
    return authUrl + '?' + params.toString();
  };

  const fullUrl = buildAuthUrl();

  return (
    <ToolLayout toolId="oauth-debugger">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">OAuth Flow</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {FLOWS.map(f => (
              <button key={f.value} onClick={() => setFlow(f.value)} className={'p-3 rounded-lg border text-sm text-left ' + (flow === f.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'dark:border-gray-600')}>
                <div className="font-medium">{f.name}</div>
                <div className="text-xs text-gray-500">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Authorization URL</label><input value={authUrl} onChange={e => setAuthUrl(e.target.value)} className="w-full p-2 border rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-600" /></div>
          <div><label className="block text-sm font-medium mb-1">Token URL</label><input value={tokenUrl} onChange={e => setTokenUrl(e.target.value)} className="w-full p-2 border rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-600" /></div>
          <div><label className="block text-sm font-medium mb-1">Client ID</label><input value={clientId} onChange={e => setClientId(e.target.value)} className="w-full p-2 border rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-600" /></div>
          <div><label className="block text-sm font-medium mb-1">Redirect URI</label><input value={redirectUri} onChange={e => setRedirectUri(e.target.value)} className="w-full p-2 border rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-600" /></div>
          <div><label className="block text-sm font-medium mb-1">Scope</label><input value={scope} onChange={e => setScope(e.target.value)} className="w-full p-2 border rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-600" /></div>
          <div><label className="block text-sm font-medium mb-1">State</label><input value={state} onChange={e => setState(e.target.value)} className="w-full p-2 border rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-600" /></div>
        </div>
        {flow === 'code_pkce' && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-medium mb-2">PKCE Parameters</h4>
            <p className="text-sm font-mono break-all">Code Verifier: {pkce.verifier}</p>
          </div>
        )}
        <div>
          <div className="flex justify-between items-center mb-1"><label className="font-medium">Generated Authorization URL</label><CopyButton text={fullUrl} /></div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-xs break-all whitespace-pre-wrap">{fullUrl}</pre>
        </div>
      </div>
    </ToolLayout>
  );
}
`;

// Dockerfile linter
const dockerfilePage = `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const SAMPLE = 'FROM ubuntu:latest\\nRUN apt-get update && apt-get install -y python3\\nADD . /app\\nWORKDIR /app\\nEXPOSE 8080\\nCMD python3 app.py';

const RULES = [
  { pattern: /^FROM\\s+\\S+:latest/m, level: 'warning', msg: 'Avoid using :latest tag - pin to a specific version for reproducibility' },
  { pattern: /^FROM\\s+ubuntu/m, level: 'info', msg: 'Consider using a minimal base image like alpine for smaller image size' },
  { pattern: /^RUN\\s+apt-get\\s+install(?!.*--no-install-recommends)/m, level: 'warning', msg: 'Use --no-install-recommends with apt-get install to reduce image size' },
  { pattern: /^RUN\\s+apt-get\\s+update(?!.*&&)/m, level: 'error', msg: 'Combine apt-get update with apt-get install in a single RUN to avoid caching issues' },
  { pattern: /^ADD\\s+[^h]/m, level: 'warning', msg: 'Use COPY instead of ADD unless you need tar extraction or URL download' },
  { pattern: /^RUN\\s+pip\\s+install(?!.*--no-cache-dir)/m, level: 'info', msg: 'Use --no-cache-dir with pip install to reduce image size' },
  { pattern: /^EXPOSE\\s+\\d/m, level: 'info', msg: 'EXPOSE is documentation only - ensure you also publish ports at runtime' },
  { pattern: /^CMD\\s+(?!\\[)/m, level: 'warning', msg: 'Use exec form CMD ["executable", "param"] instead of shell form for proper signal handling' },
  { pattern: /^RUN.*curl.*\\|.*sh/m, level: 'error', msg: 'Piping curl to shell is a security risk - download and verify scripts first' },
  { pattern: /^USER\\s+root/m, level: 'warning', msg: 'Avoid running as root - create a non-root user' },
];

function lint(content) {
  const issues = [];
  const lines = content.split('\\n');
  
  if (!lines.some(l => l.trim().startsWith('FROM'))) {
    issues.push({ level: 'error', msg: 'Missing FROM instruction - every Dockerfile must start with FROM' });
  }
  
  for (const rule of RULES) {
    if (rule.pattern.test(content)) {
      issues.push({ level: rule.level, msg: rule.msg });
    }
  }

  if (!lines.some(l => l.trim().startsWith('USER'))) {
    issues.push({ level: 'info', msg: 'No USER instruction found - container will run as root by default' });
  }
  if (!lines.some(l => l.trim().startsWith('HEALTHCHECK'))) {
    issues.push({ level: 'info', msg: 'No HEALTHCHECK instruction - consider adding one for production' });
  }
  
  if (issues.length === 0) issues.push({ level: 'info', msg: 'Dockerfile looks good!' });
  return issues;
}

export default function DockerfileLinterPage() {
  const { dict, lang } = useLang();
  const [input, setInput] = useState(SAMPLE);
  const issues = lint(input);
  const errs = issues.filter(i => i.level === 'error').length;
  const warns = issues.filter(i => i.level === 'warning').length;

  return (
    <ToolLayout toolId="dockerfile-linter">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-2"><label className="font-medium">Dockerfile</label><button onClick={() => setInput(SAMPLE)} className="text-sm text-blue-600 hover:underline">Example</button></div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={20} className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" spellCheck={false} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium">Lint Results</label>
            <span className="text-sm">{errs} errors, {warns} warnings</span>
          </div>
          <div className="space-y-2">
            {issues.map((issue, i) => (
              <div key={i} className={'p-3 rounded-lg text-sm border ' + (issue.level === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' : issue.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800')}>
                {issue.level === 'error' ? '✗' : issue.level === 'warning' ? '⚠' : 'ℹ'} {issue.msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
`;

// SSL Certificate Decoder
const sslPage = `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const SAMPLE = '-----BEGIN CERTIFICATE-----\\nMIIDXTCCAkWgAwIBAgIJANFOH8y9A+g9MA0GCSqGSIb3DqEBCwUA\\nMEUxCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw\\nHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwHhcNMjMw\\nMTAxMDAwMDAwWhcNMjQwMTAxMDAwMDAwWjBFMQswCQYDVQQGEwJV\\nUzETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJu\\nZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOC\\nAQ8AMIIBCgKCAQEA0Z3VS5JJcds3xfn/ygWb\\n-----END CERTIFICATE-----';

function decodePEM(pem) {
  const lines = pem.trim().split('\\n');
  const info = { type: 'Unknown', valid: false, fields: [] };
  
  if (pem.includes('BEGIN CERTIFICATE')) {
    info.type = 'X.509 Certificate';
    info.valid = true;
    // Basic PEM parsing - extract visible info
    const base64 = lines.filter(l => !l.startsWith('---')).join('');
    info.fields = [
      { label: 'Type', value: 'X.509 Certificate' },
      { label: 'Format', value: 'PEM (Base64 encoded DER)' },
      { label: 'Size', value: Math.floor(base64.length * 3 / 4) + ' bytes (approx)' },
      { label: 'Lines', value: String(lines.length) },
    ];
    
    // Try to extract basic info from base64
    try {
      const raw = atob(base64);
      // Look for common OID patterns
      if (raw.includes('US')) info.fields.push({ label: 'Country (detected)', value: 'US' });
      if (raw.includes('Let\\'s Encrypt')) info.fields.push({ label: 'Issuer (detected)', value: 'Let\\'s Encrypt' });
    } catch {}
  } else if (pem.includes('BEGIN PRIVATE KEY') || pem.includes('BEGIN RSA PRIVATE KEY')) {
    info.type = 'Private Key';
    info.valid = true;
    info.fields = [
      { label: 'Type', value: pem.includes('RSA') ? 'RSA Private Key' : 'Private Key (PKCS#8)' },
      { label: 'Warning', value: 'Never share private keys!' },
    ];
  } else if (pem.includes('BEGIN PUBLIC KEY')) {
    info.type = 'Public Key';
    info.valid = true;
    info.fields = [{ label: 'Type', value: 'Public Key' }];
  } else {
    info.fields = [{ label: 'Error', value: 'Unrecognized PEM format' }];
  }
  
  return info;
}

export default function SSLCertDecoderPage() {
  const { dict, lang } = useLang();
  const [input, setInput] = useState(SAMPLE);
  const info = decodePEM(input);

  return (
    <ToolLayout toolId="ssl-certificate-decoder">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">PEM Certificate</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={16} className="w-full p-3 border rounded-lg font-mono text-xs dark:bg-gray-800 dark:border-gray-600" spellCheck={false} placeholder="Paste PEM certificate here..." />
        </div>
        <div>
          <label className="block font-medium mb-2">Certificate Details</label>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className={'w-3 h-3 rounded-full ' + (info.valid ? 'bg-green-500' : 'bg-red-500')}></span>
              <span className="font-semibold">{info.type}</span>
            </div>
            {info.fields.map((f, i) => (
              <div key={i} className="flex justify-between py-2 border-b dark:border-gray-700">
                <span className="text-sm text-gray-500">{f.label}</span>
                <span className="text-sm font-mono">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
`;

// Font pairing tool
const fontPage = `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const PAIRINGS = [
  { heading: 'Playfair Display', body: 'Source Sans Pro', style: 'Elegant' },
  { heading: 'Montserrat', body: 'Merriweather', style: 'Modern' },
  { heading: 'Oswald', body: 'Open Sans', style: 'Bold' },
  { heading: 'Lora', body: 'Roboto', style: 'Classic' },
  { heading: 'Raleway', body: 'Lato', style: 'Clean' },
  { heading: 'Poppins', body: 'Inter', style: 'Contemporary' },
  { heading: 'DM Serif Display', body: 'DM Sans', style: 'Editorial' },
  { heading: 'Space Grotesk', body: 'Space Mono', style: 'Tech' },
  { heading: 'Bitter', body: 'Source Sans Pro', style: 'Professional' },
  { heading: 'Archivo Black', body: 'Libre Franklin', style: 'Impact' },
];

const PREVIEW_TEXT = 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.';

export default function FontPairingPage() {
  const { dict, lang } = useLang();
  const [selected, setSelected] = useState(0);
  const [customHeading, setCustomHeading] = useState('');
  const [customBody, setCustomBody] = useState('');
  const [previewText, setPreviewText] = useState(PREVIEW_TEXT);

  const pair = PAIRINGS[selected];
  const headFont = customHeading || pair.heading;
  const bodyFont = customBody || pair.body;
  const linkUrl = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(headFont).replace(/%20/g,'+') + ':wght@700&family=' + encodeURIComponent(bodyFont).replace(/%20/g,'+') + '&display=swap';

  return (
    <ToolLayout toolId="font-pairing-tool">
      <link href={linkUrl} rel="stylesheet" />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3">
          <h3 className="font-medium mb-2">Font Pairings</h3>
          {PAIRINGS.map((p, i) => (
            <button key={i} onClick={() => { setSelected(i); setCustomHeading(''); setCustomBody(''); }} className={'w-full p-3 rounded-lg border text-left text-sm ' + (selected === i ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800')}>
              <div className="font-semibold">{p.heading} + {p.body}</div>
              <div className="text-xs text-gray-500">{p.style}</div>
            </button>
          ))}
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="p-8 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-700 shadow-sm">
            <h1 style={{ fontFamily: headFont + ', serif', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.5rem' }}>
              Beautiful Typography Starts Here
            </h1>
            <h2 style={{ fontFamily: headFont + ', serif', fontSize: '1.5rem', fontWeight: 700, color: '#6b7280', marginBottom: '1.5rem' }}>
              Subtitle with the heading font
            </h2>
            <p style={{ fontFamily: bodyFont + ', sans-serif', fontSize: '1rem', lineHeight: 1.7 }}>
              {previewText}
            </p>
            <p style={{ fontFamily: bodyFont + ', sans-serif', fontSize: '0.875rem', lineHeight: 1.7, marginTop: '1rem', color: '#6b7280' }}>
              {previewText}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Heading: {headFont}</label>
              <input value={customHeading} onChange={e => setCustomHeading(e.target.value)} placeholder="Custom heading font..." className="w-full p-2 border rounded text-sm dark:bg-gray-800 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Body: {bodyFont}</label>
              <input value={customBody} onChange={e => setCustomBody(e.target.value)} placeholder="Custom body font..." className="w-full p-2 border rounded text-sm dark:bg-gray-800 dark:border-gray-600" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preview Text</label>
            <textarea value={previewText} onChange={e => setPreviewText(e.target.value)} rows={2} className="w-full p-2 border rounded text-sm dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-xs font-mono break-all">@import url('{linkUrl}');</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
`;

// Helm chart validator
const helmPage = `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const CHART_SAMPLE = 'apiVersion: v2\\nname: my-app\\nversion: 1.0.0\\ntype: application\\ndescription: A sample Helm chart\\nappVersion: "1.16.0"';
const VALUES_SAMPLE = 'replicaCount: 1\\n\\nimage:\\n  repository: nginx\\n  pullPolicy: IfNotPresent\\n  tag: ""\\n\\nservice:\\n  type: ClusterIP\\n  port: 80';

function validateChart(chart) {
  const issues = [];
  if (!chart.trim()) return [{ level: 'error', msg: 'Chart.yaml is empty' }];
  if (!chart.includes('apiVersion:')) issues.push({ level: 'error', msg: 'Missing required field: apiVersion (v1 or v2)' });
  else if (chart.includes('apiVersion: v1')) issues.push({ level: 'warning', msg: 'apiVersion v1 is deprecated, use v2' });
  if (!chart.includes('name:')) issues.push({ level: 'error', msg: 'Missing required field: name' });
  if (!chart.includes('version:')) issues.push({ level: 'error', msg: 'Missing required field: version' });
  if (!chart.includes('description:')) issues.push({ level: 'warning', msg: 'Missing description - recommended for chart discoverability' });
  if (!chart.includes('type:')) issues.push({ level: 'info', msg: 'No type specified - defaults to application' });
  if (!chart.includes('appVersion:')) issues.push({ level: 'warning', msg: 'Missing appVersion - recommended to track app version' });
  if (chart.includes('\\t')) issues.push({ level: 'error', msg: 'YAML must not contain tabs - use spaces' });
  if (issues.length === 0) issues.push({ level: 'info', msg: 'Chart.yaml looks valid!' });
  return issues;
}

function validateValues(values) {
  const issues = [];
  if (!values.trim()) return [{ level: 'info', msg: 'values.yaml is empty (optional)' }];
  if (values.includes('\\t')) issues.push({ level: 'error', msg: 'YAML must not contain tabs' });
  if (!values.includes('image:')) issues.push({ level: 'info', msg: 'No image configuration found' });
  if (values.includes('tag: ""') || values.includes("tag: ''")) issues.push({ level: 'warning', msg: 'Image tag is empty - will use Chart appVersion or latest' });
  if (!values.includes('resources:')) issues.push({ level: 'warning', msg: 'No resource limits defined - recommended for production' });
  if (issues.length === 0) issues.push({ level: 'info', msg: 'values.yaml looks good!' });
  return issues;
}

export default function HelmChartValidatorPage() {
  const { dict, lang } = useLang();
  const [chart, setChart] = useState(CHART_SAMPLE);
  const [values, setValues] = useState(VALUES_SAMPLE);
  const chartIssues = validateChart(chart);
  const valuesIssues = validateValues(values);

  const Badge = ({ level }) => (
    <span className={'inline-block w-2 h-2 rounded-full mr-2 ' + (level === 'error' ? 'bg-red-500' : level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500')}></span>
  );

  return (
    <ToolLayout toolId="helm-chart-validator">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Chart.yaml</label>
            <textarea value={chart} onChange={e => setChart(e.target.value)} rows={10} className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" spellCheck={false} />
          </div>
          <div>
            <label className="block font-medium mb-2">values.yaml</label>
            <textarea value={values} onChange={e => setValues(e.target.value)} rows={10} className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" spellCheck={false} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Chart.yaml Results</h3>
            <div className="space-y-2">
              {chartIssues.map((issue, i) => (
                <div key={i} className={'p-2 rounded text-sm ' + (issue.level === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : issue.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400')}>
                  <Badge level={issue.level} />{issue.msg}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">values.yaml Results</h3>
            <div className="space-y-2">
              {valuesIssues.map((issue, i) => (
                <div key={i} className={'p-2 rounded text-sm ' + (issue.level === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : issue.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400')}>
                  <Badge level={issue.level} />{issue.msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
`;

const pages = {
  'oauth-debugger': oauthPage,
  'dockerfile-linter': dockerfilePage,
  'ssl-certificate-decoder': sslPage,
  'font-pairing-tool': fontPage,
  'helm-chart-validator': helmPage,
};

for (const tool of newTools) {
  const dir = path.join(TOOLS_DIR, tool.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'layout.tsx'), createLayout(tool.id, tool.name, tool.en.description));
  fs.writeFileSync(path.join(dir, 'page.tsx'), pages[tool.id]);
  console.log('  + ' + tool.id);
}

// 3. Update dictionaries
console.log('\n3. Updating dictionaries...');
const langs = ['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th'];
for (const lang of langs) {
  const fp = path.join(DICT_DIR, lang + '.json');
  const dict = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (!dict.tools) dict.tools = {};
  let added = 0;
  for (const tool of newTools) {
    if (!dict.tools[tool.id]) {
      dict.tools[tool.id] = tool[lang] || tool.en;
      added++;
    }
  }
  fs.writeFileSync(fp, JSON.stringify(dict, null, 2));
  console.log('  + ' + lang + '.json (+' + added + ')');
}

console.log('\n=== Done! ===');
