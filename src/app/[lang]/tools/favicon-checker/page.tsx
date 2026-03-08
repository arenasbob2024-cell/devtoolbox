'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function FaviconChecker() {
  const { lang } = useLang();
  const [domain, setDomain] = useState('');
  const [color, setColor] = useState('#4F46E5');

  const generateHtml = () => {
    const d = domain || 'example.com';
    return `<!-- Favicon Configuration - Best Practices 2026 -->

<!-- Standard favicon (32x32 ICO for legacy support) -->
<link rel="icon" href="/favicon.ico" sizes="32x32">

<!-- SVG favicon (scalable, supports dark mode) -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">

<!-- Apple Touch Icon (180x180 PNG) -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- Web App Manifest (for PWA and Android) -->
<link rel="manifest" href="/manifest.webmanifest">

<!-- Theme color for browser chrome -->
<meta name="theme-color" content="${color}">
<meta name="theme-color" content="${color}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)">`;
  };

  const generateManifest = () => {
    return JSON.stringify({
      "name": domain || "My Website",
      "short_name": (domain || "Site").split('.')[0],
      "icons": [
        { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
        { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" }
      ],
      "theme_color": color,
      "background_color": "#ffffff",
      "display": "standalone"
    }, null, 2);
  };

  const generateSvg = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="${color}"/>
  <text x="16" y="22" text-anchor="middle" font-size="18" font-family="system-ui" font-weight="bold" fill="white">
    ${(domain || 'D')[0].toUpperCase()}
  </text>
</svg>`;
  };

  return (
    <ToolLayout toolId="favicon-checker" lang={lang}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Domain Name</label>
            <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Theme Color</label>
            <div className="flex gap-2">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-11 w-14 rounded cursor-pointer" />
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm font-medium text-gray-300 mb-2">SVG Favicon Preview:</p>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: generateSvg() }} />
            <div className="w-16 h-16" dangerouslySetInnerHTML={{ __html: generateSvg() }} />
            <div className="w-32 h-32" dangerouslySetInnerHTML={{ __html: generateSvg() }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-300">HTML Head Tags</label>
            <button onClick={() => navigator.clipboard.writeText(generateHtml())} className="text-xs text-blue-400 hover:text-blue-300">Copy</button>
          </div>
          <pre className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-xs overflow-auto">{generateHtml()}</pre>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-300">manifest.webmanifest</label>
            <button onClick={() => navigator.clipboard.writeText(generateManifest())} className="text-xs text-blue-400 hover:text-blue-300">Copy</button>
          </div>
          <pre className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-xs overflow-auto">{generateManifest()}</pre>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-300">favicon.svg</label>
            <button onClick={() => navigator.clipboard.writeText(generateSvg())} className="text-xs text-blue-400 hover:text-blue-300">Copy</button>
          </div>
          <pre className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-xs overflow-auto">{generateSvg()}</pre>
        </div>
      </div>
    </ToolLayout>
  );
}