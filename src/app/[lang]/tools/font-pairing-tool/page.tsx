'use client';
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
