'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function HtaccessGenerator() {
  const { dict } = useLang();
  const t = dict.tools['htaccess-generator'];
  const [ruleType, setRuleType] = useState('https');
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState({
    forceHttps: false,
    www: '',
    oldUrl: '',
    newUrl: '',
    statusCode: '301',
    blockIp: '',
    cacheControl: 'week',
    enableModRewrite: true,
  });

  const generateRules = () => {
    let rules = '';

    if (ruleType === 'https' && options.forceHttps) {
      rules += `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

`;
    }

    if (ruleType === 'www') {
      if (options.www === 'add') {
        rules += `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} !^www\\.
  RewriteRule ^(.*)$ http://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

`;
      } else if (options.www === 'remove') {
        rules += `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} ^www\\.
  RewriteRule ^(.*)$ http://%{HTTP_HOST:4}%{REQUEST_URI} [L,R=301]
</IfModule>

`;
      }
    }

    if (ruleType === 'redirect' && options.oldUrl && options.newUrl) {
      rules += `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_URI} ^${escapeRegex(options.oldUrl)}$
  RewriteRule ^(.*)$ ${options.newUrl} [L,R=${options.statusCode}]
</IfModule>

`;
    }

    if (ruleType === 'blockIp' && options.blockIp) {
      rules += `<Limit GET POST>
  Order allow,deny
  Allow from all
  Deny from ${options.blockIp}
</Limit>

`;
    }

    if (ruleType === 'cache') {
      const cacheTime = getCacheExpire(options.cacheControl);
      rules += `<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus ${cacheTime}"
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
</IfModule>

`;
    }

    if (ruleType === 'errorPages') {
      rules += `ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
ErrorDocument 403 /403.html

`;
    }

    setOutput(rules || '# Add your rules above');
  };

  const escapeRegex = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const getCacheExpire = (type: string): string => {
    const times: Record<string, string> = {
      hour: '1 hour',
      day: '1 day',
      week: '1 week',
      month: '1 month',
      year: '1 year',
    };
    return times[type] || '1 week';
  };

  return (
    <ToolLayout toolId="htaccess-generator" title={t.pageTitle} description={t.pageDescription}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Rule Type</label>
          <select
            value={ruleType}
            onChange={(e) => setRuleType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
          >
            <option value="https">Force HTTPS</option>
            <option value="www">Manage WWW</option>
            <option value="redirect">301/302 Redirect</option>
            <option value="blockIp">Block IP Address</option>
            <option value="cache">Browser Caching</option>
            <option value="errorPages">Error Pages</option>
          </select>

          <div className="mt-4 space-y-3">
            {ruleType === 'https' && (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.forceHttps}
                  onChange={(e) => setOptions({ ...options, forceHttps: e.target.checked })}
                  className="mr-2"
                />
                Force HTTPS redirect
              </label>
            )}

            {ruleType === 'www' && (
              <>
                <label className="block text-sm">WWW Handling</label>
                <select
                  value={options.www}
                  onChange={(e) => setOptions({ ...options, www: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
                >
                  <option value="">Select option</option>
                  <option value="add">Add WWW to all URLs</option>
                  <option value="remove">Remove WWW from all URLs</option>
                </select>
              </>
            )}

            {ruleType === 'redirect' && (
              <>
                <input
                  type="text"
                  placeholder="Old URL path (e.g., /old-page)"
                  value={options.oldUrl}
                  onChange={(e) => setOptions({ ...options, oldUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
                />
                <input
                  type="text"
                  placeholder="New URL (e.g., /new-page or https://example.com)"
                  value={options.newUrl}
                  onChange={(e) => setOptions({ ...options, newUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
                />
                <select
                  value={options.statusCode}
                  onChange={(e) => setOptions({ ...options, statusCode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
                >
                  <option value="301">301 Permanent Redirect</option>
                  <option value="302">302 Temporary Redirect</option>
                </select>
              </>
            )}

            {ruleType === 'blockIp' && (
              <input
                type="text"
                placeholder="IP address (e.g., 192.168.1.1)"
                value={options.blockIp}
                onChange={(e) => setOptions({ ...options, blockIp: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
              />
            )}

            {ruleType === 'cache' && (
              <select
                value={options.cacheControl}
                onChange={(e) => setOptions({ ...options, cacheControl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
              >
                <option value="hour">1 Hour</option>
                <option value="day">1 Day</option>
                <option value="week">1 Week</option>
                <option value="month">1 Month</option>
                <option value="year">1 Year</option>
              </select>
            )}
          </div>

          <button onClick={generateRules} className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Generate Rules
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">.htaccess Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 font-mono text-sm"
          />
          {output && output !== '# Add your rules above' && <CopyButton text={output} className="mt-2" />}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">{t.pageTitle}</h2>
        <p>{t.pageDescription}</p>
      </div>
    </ToolLayout>
  );
}
