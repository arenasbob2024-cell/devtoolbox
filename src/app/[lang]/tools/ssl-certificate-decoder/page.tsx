'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const SAMPLE = '-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJANFOH8y9A+g9MA0GCSqGSIb3DqEBCwUA\nMEUxCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw\nHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwHhcNMjMw\nMTAxMDAwMDAwWhcNMjQwMTAxMDAwMDAwWjBFMQswCQYDVQQGEwJV\nUzETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJu\nZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOC\nAQ8AMIIBCgKCAQEA0Z3VS5JJcds3xfn/ygWb\n-----END CERTIFICATE-----';

function decodePEM(pem) {
  const lines = pem.trim().split('\n');
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
      if (raw.includes('Let\'s Encrypt')) info.fields.push({ label: 'Issuer (detected)', value: 'Let\'s Encrypt' });
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
