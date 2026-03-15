'use client';
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
  const verifier = btoa(String.fromCharCode(...arr)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
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
