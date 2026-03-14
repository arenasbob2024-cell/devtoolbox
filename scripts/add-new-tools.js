#!/usr/bin/env node
/**
 * Batch add new tools: layout.tsx, page.tsx, tools.ts entries, and translations for all 15 languages
 */

const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'src', 'app', '[lang]', 'tools');
const DICT_DIR = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries');
const TOOLS_TS = path.join(__dirname, '..', 'src', 'lib', 'tools.ts');

// ============ NEW TOOLS DEFINITION ============
const newTools = [
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images online for free. Adjust width, height, and maintain aspect ratio with instant preview.',
    icon: '📐',
    category: 'converter',
    keywords: ['image resizer', 'resize image online', 'image resize', 'photo resizer', 'resize picture', 'image dimensions', 'scale image', 'reduce image size', 'image scaler', 'resize photo online free', 'bulk image resizer', 'pixel resizer'],
    relatedTools: ['image-compressor', 'png-to-jpg', 'image-cropper', 'webp-converter'],
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    description: 'Crop images online for free. Select custom areas, use preset aspect ratios, and download instantly.',
    icon: '✂️',
    category: 'converter',
    keywords: ['image cropper', 'crop image online', 'photo cropper', 'crop picture', 'image crop tool', 'cut image', 'trim image', 'crop photo online free', 'image cutter', 'crop jpg online', 'crop png online', 'free image cropper'],
    relatedTools: ['image-resizer', 'image-compressor', 'png-to-jpg', 'webp-converter'],
  },
  {
    id: 'webp-converter',
    name: 'WebP Converter',
    description: 'Convert images to and from WebP format online. Support PNG, JPG to WebP and WebP to PNG/JPG.',
    icon: 'WP',
    category: 'converter',
    keywords: ['webp converter', 'webp to png', 'webp to jpg', 'png to webp', 'jpg to webp', 'convert webp', 'webp converter online', 'webp to jpeg', 'image to webp', 'webp image converter', 'free webp converter', 'webp format'],
    relatedTools: ['png-to-jpg', 'image-resizer', 'image-compressor', 'image-cropper'],
  },
  {
    id: 'css-glassmorphism-generator',
    name: 'Glassmorphism CSS Generator',
    description: 'Generate beautiful glassmorphism CSS effects with live preview. Customize blur, transparency, and border.',
    icon: '🪟',
    category: 'css',
    keywords: ['glassmorphism', 'glassmorphism css', 'glassmorphism generator', 'glass effect css', 'frosted glass css', 'glassmorphism css generator', 'glass morphism', 'backdrop blur', 'css glass effect', 'transparent glass css', 'blur background css', 'frosted glass effect'],
    relatedTools: ['css-neumorphism-generator', 'css-gradient-generator', 'css-shadow-generator', 'css-filter-generator'],
  },
  {
    id: 'css-neumorphism-generator',
    name: 'Neumorphism CSS Generator',
    description: 'Generate soft UI neumorphism CSS effects with live preview. Customize shadows, colors, and shapes.',
    icon: '🫧',
    category: 'css',
    keywords: ['neumorphism', 'neumorphism css', 'neumorphism generator', 'soft ui', 'neumorphic design', 'neumorphism css generator', 'neomorphism', 'soft shadow css', 'neumorphic ui', 'neumorphism shadow', 'soft ui generator', 'new morphism css'],
    relatedTools: ['css-glassmorphism-generator', 'css-shadow-generator', 'css-gradient-generator', 'box-shadow'],
  },
  {
    id: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    description: 'Calculate and convert aspect ratios for images, videos, and screens. Find missing dimensions instantly.',
    icon: '📺',
    category: 'web',
    keywords: ['aspect ratio calculator', 'aspect ratio', 'image aspect ratio', 'video aspect ratio', 'screen ratio', '16:9 calculator', 'aspect ratio converter', 'calculate aspect ratio', 'ratio calculator', 'image ratio', 'display aspect ratio', 'pixel aspect ratio'],
    relatedTools: ['image-resizer', 'image-cropper', 'css-unit-converter', 'pixel-to-rem-converter'],
  },
  {
    id: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    description: 'Generate XML sitemaps for your website. Add URLs, set priorities and change frequencies for better SEO.',
    icon: '🗺️',
    category: 'web',
    keywords: ['sitemap generator', 'xml sitemap', 'sitemap xml generator', 'create sitemap', 'sitemap builder', 'website sitemap', 'seo sitemap', 'sitemap creator', 'generate sitemap xml', 'sitemap tool', 'xml sitemap generator online', 'free sitemap generator'],
    relatedTools: ['robots-generator', 'meta-tag-generator', 'og-image-preview', 'url-parser'],
  },
  {
    id: 'html-to-text',
    name: 'HTML to Text Converter',
    description: 'Convert HTML to plain text online. Strip HTML tags, decode entities, and extract readable text content.',
    icon: 'Txt',
    category: 'converter',
    keywords: ['html to text', 'strip html tags', 'html to plain text', 'remove html tags', 'html stripper', 'html to text converter', 'extract text from html', 'html tag remover', 'convert html to text', 'html cleaner', 'strip tags online', 'html to string'],
    relatedTools: ['html-entity', 'html-beautifier', 'html-minifier-online', 'html-to-markdown'],
  },
  {
    id: 'json-sorter',
    name: 'JSON Key Sorter',
    description: 'Sort JSON keys alphabetically or by custom order. Organize and clean up JSON data structure.',
    icon: 'A↓',
    category: 'formatter',
    keywords: ['json sorter', 'sort json keys', 'json key sorter', 'alphabetical json', 'order json keys', 'json sort', 'sort json online', 'json key order', 'organize json', 'json alphabetize', 'sort json alphabetically', 'json property sorter'],
    relatedTools: ['json-formatter', 'json-validator', 'json-beautifier', 'json-minifier'],
  },
  {
    id: 'css-gradient-text',
    name: 'CSS Gradient Text Generator',
    description: 'Create beautiful gradient text effects with CSS. Live preview, multiple colors, and copy-ready code.',
    icon: '🌈',
    category: 'css',
    keywords: ['gradient text css', 'css gradient text', 'text gradient generator', 'gradient text generator', 'css text gradient', 'colorful text css', 'rainbow text css', 'gradient font css', 'text color gradient', 'css gradient text generator', 'gradient heading css', 'text gradient effect'],
    relatedTools: ['css-gradient-generator', 'css-text-shadow-generator', 'css-glassmorphism-generator', 'color-gradient-generator'],
  },
];

// ============ LAYOUT TEMPLATE ============
function genLayout(toolId) {
  return `import type { Metadata } from 'next';
import ToolSeoServer from '@/components/ToolSeoServer';
import { getDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(lang);
  const t = dict.tools['${toolId}'];
  const url = \`https://viadreams.cc/\${lang}/tools/${toolId}\`;
  return {
    title: t.pageTitle,
    description: t.pageDescription,
    openGraph: {
      title: \`\${t.pageTitle} | DevToolBox\`,
      description: t.pageDescription,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: \`\${t.pageTitle} | DevToolBox\`,
      description: t.pageDescription,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, \`https://viadreams.cc/\${l}/tools/${toolId}\`])
        ),
        'x-default': \`https://viadreams.cc/en/tools/${toolId}\`,
      },
    },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  return (
    <ToolSeoServer toolId="${toolId}" lang={lang}>
      {children}
    </ToolSeoServer>
  );
}
`;
}

// ============ PAGE TEMPLATES ============
const pageTemplates = {
  'image-resizer': `'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function ImageResizer() {
  const { dict } = useLang();
  const t = (dict.tools as any)['image-resizer'];
  const [image, setImage] = useState<{ url: string; w: number; h: number; size: number } | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [resized, setResized] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const ratio = useRef(1);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage({ url: img.src, w: img.width, h: img.height, size: Math.round(file.size / 1024) });
        setWidth(img.width);
        setHeight(img.height);
        ratio.current = img.width / img.height;
        setResized(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const updateWidth = (v: number) => {
    setWidth(v);
    if (keepRatio) setHeight(Math.round(v / ratio.current));
  };
  const updateHeight = (v: number) => {
    setHeight(v);
    if (keepRatio) setWidth(Math.round(v * ratio.current));
  };

  const resize = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      setResized(canvas.toDataURL('image/png'));
    };
    img.src = image.url;
  };

  const download = () => {
    if (!resized) return;
    const a = document.createElement('a');
    a.href = resized;
    a.download = \`resized-\${width}x\${height}.png\`;
    a.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="image-resizer">
      <div
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent-blue)'; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border-color)'; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        style={{ border: '2px dashed var(--border-color)', borderRadius: 10, padding: 40, textAlign: 'center', cursor: 'pointer', background: 'var(--bg-input)' }}
      >
        <input ref={fileRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Drag & drop image or click to select</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>PNG, JPG, WebP, GIF supported</div>
      </div>

      {error && <div style={{ padding: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgb(239,68,68)', borderRadius: 6, color: 'rgb(239,68,68)', fontSize: 12, marginTop: 16 }}>{error}</div>}

      {image && (
        <div style={{ marginTop: 20 }}>
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Original: {image.w} × {image.h}px ({image.size} KB)</div>
            <img src={image.url} alt="Original" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 6 }} />
          </div>

          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Resize Options</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Width (px)</label>
                <input type="number" value={width} onChange={e => updateWidth(Number(e.target.value))} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Height (px)</label>
                <input type="number" value={height} onChange={e => updateHeight(Number(e.target.value))} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
              </div>
            </div>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <input type="checkbox" checked={keepRatio} onChange={e => setKeepRatio(e.target.checked)} /> Keep aspect ratio
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setWidth(Math.round(image.w / 2)); if (keepRatio) setHeight(Math.round(image.h / 2)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>50%</button>
              <button onClick={() => { setWidth(Math.round(image.w / 4)); if (keepRatio) setHeight(Math.round(image.h / 4)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>25%</button>
              <button onClick={() => { setWidth(1920); if (keepRatio) setHeight(Math.round(1920 / ratio.current)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>1920px</button>
              <button onClick={() => { setWidth(1280); if (keepRatio) setHeight(Math.round(1280 / ratio.current)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>1280px</button>
              <button onClick={() => { setWidth(640); if (keepRatio) setHeight(Math.round(640 / ratio.current)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>640px</button>
            </div>
          </div>

          <button onClick={resize} className="btn btn-primary" style={{ marginBottom: 16 }}>Resize Image</button>

          {resized && (
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Resized: {width} × {height}px</div>
              <img src={resized} alt="Resized" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 6, marginBottom: 12 }} />
              <button onClick={download} className="btn btn-primary">Download Resized Image</button>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'image-cropper': `'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function ImageCropper() {
  const { dict } = useLang();
  const t = (dict.tools as any)['image-cropper'];
  const [image, setImage] = useState<{ url: string; w: number; h: number } | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);
  const [cropped, setCropped] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage({ url: img.src, w: img.width, h: img.height });
        setCropX(0); setCropY(0);
        setCropW(img.width); setCropH(img.height);
        setCropped(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const setPresetRatio = (rw: number, rh: number) => {
    if (!image) return;
    const maxW = image.w;
    const maxH = image.h;
    const targetRatio = rw / rh;
    let w = maxW, h = Math.round(maxW / targetRatio);
    if (h > maxH) { h = maxH; w = Math.round(maxH * targetRatio); }
    setCropX(Math.round((maxW - w) / 2));
    setCropY(Math.round((maxH - h) / 2));
    setCropW(w); setCropH(h);
  };

  const crop = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      setCropped(canvas.toDataURL('image/png'));
    };
    img.src = image.url;
  };

  const download = () => {
    if (!cropped) return;
    const a = document.createElement('a');
    a.href = cropped;
    a.download = \`cropped-\${cropW}x\${cropH}.png\`;
    a.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="image-cropper">
      <div
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent-blue)'; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border-color)'; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        style={{ border: '2px dashed var(--border-color)', borderRadius: 10, padding: 40, textAlign: 'center', cursor: 'pointer', background: 'var(--bg-input)' }}
      >
        <input ref={fileRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Drag & drop image or click to select</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>PNG, JPG, WebP supported</div>
      </div>

      {error && <div style={{ padding: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgb(239,68,68)', borderRadius: 6, color: 'rgb(239,68,68)', fontSize: 12, marginTop: 16 }}>{error}</div>}

      {image && (
        <div style={{ marginTop: 20 }}>
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Original: {image.w} × {image.h}px</div>
            <img src={image.url} alt="Original" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 6 }} />
          </div>

          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Crop Settings</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <button onClick={() => setPresetRatio(1, 1)} className="btn btn-secondary" style={{ fontSize: 11 }}>1:1</button>
              <button onClick={() => setPresetRatio(16, 9)} className="btn btn-secondary" style={{ fontSize: 11 }}>16:9</button>
              <button onClick={() => setPresetRatio(4, 3)} className="btn btn-secondary" style={{ fontSize: 11 }}>4:3</button>
              <button onClick={() => setPresetRatio(3, 2)} className="btn btn-secondary" style={{ fontSize: 11 }}>3:2</button>
              <button onClick={() => setPresetRatio(9, 16)} className="btn btn-secondary" style={{ fontSize: 11 }}>9:16</button>
              <button onClick={() => { setCropX(0); setCropY(0); setCropW(image.w); setCropH(image.h); }} className="btn btn-secondary" style={{ fontSize: 11 }}>Free</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[['X', cropX, setCropX], ['Y', cropY, setCropY], ['Width', cropW, setCropW], ['Height', cropH, setCropH]].map(([label, val, setter]: any) => (
                <div key={label}>
                  <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
                  <input type="number" value={val} onChange={e => setter(Number(e.target.value))} style={{ width: '100%', padding: 6, fontSize: 12, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
                </div>
              ))}
            </div>
            <button onClick={crop} className="btn btn-primary">Crop Image</button>
          </div>

          {cropped && (
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Cropped: {cropW} × {cropH}px</div>
              <img src={cropped} alt="Cropped" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 6, marginBottom: 12 }} />
              <button onClick={download} className="btn btn-primary">Download Cropped Image</button>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'webp-converter': `'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function WebpConverter() {
  const { dict } = useLang();
  const t = (dict.tools as any)['webp-converter'];
  const [image, setImage] = useState<{ url: string; w: number; h: number; size: number; name: string } | null>(null);
  const [outputFormat, setOutputFormat] = useState<'webp' | 'png' | 'jpeg'>('webp');
  const [quality, setQuality] = useState(0.85);
  const [converted, setConverted] = useState<{ url: string; size: number } | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage({ url: img.src, w: img.width, h: img.height, size: Math.round(file.size / 1024), name: file.name });
        setConverted(null);
        // Auto-detect: if input is webp, suggest png output
        if (file.type === 'image/webp') setOutputFormat('png');
        else setOutputFormat('webp');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const convert = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      if (outputFormat === 'jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      const mime = outputFormat === 'webp' ? 'image/webp' : outputFormat === 'png' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mime, quality);
      const bytes = atob(dataUrl.split(',')[1]).length;
      setConverted({ url: dataUrl, size: Math.round(bytes / 1024) });
    };
    img.src = image.url;
  };

  const download = () => {
    if (!converted || !image) return;
    const ext = outputFormat;
    const a = document.createElement('a');
    a.href = converted.url;
    a.download = image.name.replace(/\\.[^.]+$/, '') + '.' + ext;
    a.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="webp-converter">
      <div
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent-blue)'; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border-color)'; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        style={{ border: '2px dashed var(--border-color)', borderRadius: 10, padding: 40, textAlign: 'center', cursor: 'pointer', background: 'var(--bg-input)' }}
      >
        <input ref={fileRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Drag & drop image or click to select</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>WebP, PNG, JPG, GIF supported</div>
      </div>

      {error && <div style={{ padding: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgb(239,68,68)', borderRadius: 6, color: 'rgb(239,68,68)', fontSize: 12, marginTop: 16 }}>{error}</div>}

      {image && (
        <div style={{ marginTop: 20 }}>
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Original: {image.name} — {image.w}×{image.h}px ({image.size} KB)</div>
            <img src={image.url} alt="Original" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 6 }} />
          </div>

          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Output Format</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {(['webp', 'png', 'jpeg'] as const).map(fmt => (
                <button key={fmt} onClick={() => setOutputFormat(fmt)} style={{ padding: '8px 16px', borderRadius: 6, border: \`2px solid \${outputFormat === fmt ? 'var(--accent-blue)' : 'var(--border-color)'}\`, background: outputFormat === fmt ? 'rgba(59,130,246,0.1)' : 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>{fmt.toUpperCase()}</button>
              ))}
            </div>
            {outputFormat !== 'png' && (
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Quality: {Math.round(quality * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(parseFloat(e.target.value))} style={{ width: '100%' }} />
              </div>
            )}
            <button onClick={convert} className="btn btn-primary">Convert</button>
          </div>

          {converted && (
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Converted: {converted.size} KB ({image.size > converted.size ? \`-\${Math.round((1 - converted.size / image.size) * 100)}%\` : \`+\${Math.round((converted.size / image.size - 1) * 100)}%\`})</div>
              <img src={converted.url} alt="Converted" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 6, marginBottom: 12 }} />
              <button onClick={download} className="btn btn-primary">Download {outputFormat.toUpperCase()}</button>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'css-glassmorphism-generator': `'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssGlassmorphismGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as any)['css-glassmorphism-generator'];
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.18);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(16);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return \`\${r}, \${g}, \${b}\`;
  };

  const rgb = hexToRgb(bgColor);
  const cssCode = \`/* Glassmorphism Effect */
background: rgba(\${rgb}, \${opacity});
backdrop-filter: blur(\${blur}px);
-webkit-backdrop-filter: blur(\${blur}px);
border-radius: \${borderRadius}px;
border: 1px solid rgba(\${rgb}, \${borderOpacity});
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\`;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-glassmorphism-generator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Controls */}
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Settings</div>
          {[
            { label: \`Blur: \${blur}px\`, value: blur, set: setBlur, min: 0, max: 40, step: 1 },
            { label: \`Opacity: \${opacity}\`, value: opacity, set: setOpacity, min: 0, max: 1, step: 0.05 },
            { label: \`Border Opacity: \${borderOpacity}\`, value: borderOpacity, set: setBorderOpacity, min: 0, max: 1, step: 0.05 },
            { label: \`Border Radius: \${borderRadius}px\`, value: borderRadius, set: setBorderRadius, min: 0, max: 50, step: 1 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
          ))}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Background Color</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: 40, height: 32, border: 'none', cursor: 'pointer' }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bgColor}</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 10, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, left: -20, width: 120, height: 120, borderRadius: '50%', background: '#ff6b6b' }} />
          <div style={{ position: 'absolute', bottom: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: '#ffd93d' }} />
          <div style={{ position: 'absolute', top: 40, right: 40, width: 80, height: 80, borderRadius: '50%', background: '#6bcb77' }} />
          <div style={{
            background: \`rgba(\${rgb}, \${opacity})\`,
            backdropFilter: \`blur(\${blur}px)\`,
            WebkitBackdropFilter: \`blur(\${blur}px)\`,
            borderRadius: borderRadius,
            border: \`1px solid rgba(\${rgb}, \${borderOpacity})\`,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            padding: 30,
            width: '80%',
            textAlign: 'center',
            zIndex: 1,
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Glass Card</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Glassmorphism effect preview</div>
          </div>
        </div>
      </div>

      {/* Code Output */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>CSS Code</label>
          <CopyButton text={cssCode} />
        </div>
        <pre style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, fontSize: 12, color: 'var(--text-primary)', overflow: 'auto', whiteSpace: 'pre-wrap' }}>{cssCode}</pre>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'css-neumorphism-generator': `'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssNeumorphismGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as any)['css-neumorphism-generator'];
  const [bgColor, setBgColor] = useState('#e0e5ec');
  const [size, setSize] = useState(10);
  const [intensity, setIntensity] = useState(0.15);
  const [borderRadius, setBorderRadius] = useState(20);
  const [shape, setShape] = useState<'flat' | 'concave' | 'convex' | 'pressed'>('flat');

  const adjustColor = (hex: string, amount: number) => {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
    return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  };

  const lightShadow = adjustColor(bgColor, Math.round(intensity * 255));
  const darkShadow = adjustColor(bgColor, -Math.round(intensity * 255));

  const getBackground = () => {
    if (shape === 'concave') return \`linear-gradient(145deg, \${darkShadow}, \${lightShadow})\`;
    if (shape === 'convex') return \`linear-gradient(145deg, \${lightShadow}, \${darkShadow})\`;
    return bgColor;
  };

  const getShadow = () => {
    if (shape === 'pressed') return \`inset \${size}px \${size}px \${size * 2}px \${darkShadow}, inset -\${size}px -\${size}px \${size * 2}px \${lightShadow}\`;
    return \`\${size}px \${size}px \${size * 2}px \${darkShadow}, -\${size}px -\${size}px \${size * 2}px \${lightShadow}\`;
  };

  const cssCode = \`/* Neumorphism Effect */
background: \${getBackground()};
border-radius: \${borderRadius}px;
box-shadow: \${getShadow()};\`;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-neumorphism-generator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Settings</div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Background Color</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: 40, height: 32, border: 'none', cursor: 'pointer' }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bgColor}</span>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Shape</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {(['flat', 'concave', 'convex', 'pressed'] as const).map(s => (
                <button key={s} onClick={() => setShape(s)} style={{ padding: '6px 12px', borderRadius: 6, border: \`2px solid \${shape === s ? 'var(--accent-blue)' : 'var(--border-color)'}\`, background: shape === s ? 'rgba(59,130,246,0.1)' : 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>{s}</button>
              ))}
            </div>
          </div>
          {[
            { label: \`Size: \${size}px\`, value: size, set: setSize, min: 2, max: 30, step: 1 },
            { label: \`Intensity: \${Math.round(intensity * 100)}%\`, value: intensity, set: setIntensity, min: 0.05, max: 0.4, step: 0.05 },
            { label: \`Border Radius: \${borderRadius}px\`, value: borderRadius, set: setBorderRadius, min: 0, max: 50, step: 1 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
          ))}
        </div>

        <div style={{ background: bgColor, borderRadius: 10, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{
            background: getBackground(),
            borderRadius: borderRadius,
            boxShadow: getShadow(),
            width: 180,
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: adjustColor(bgColor, -80) }}>Neumorphism</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>CSS Code</label>
          <CopyButton text={cssCode} />
        </div>
        <pre style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, fontSize: 12, color: 'var(--text-primary)', overflow: 'auto', whiteSpace: 'pre-wrap' }}>{cssCode}</pre>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'aspect-ratio-calculator': `'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

export default function AspectRatioCalculator() {
  const { dict } = useLang();
  const t = (dict.tools as any)['aspect-ratio-calculator'];
  const [w1, setW1] = useState(1920);
  const [h1, setH1] = useState(1080);
  const [w2, setW2] = useState('');
  const [h2, setH2] = useState('');

  const g = gcd(w1, h1);
  const ratioW = w1 / g;
  const ratioH = h1 / g;

  const calcMissing = (type: 'w' | 'h') => {
    const ratio = w1 / h1;
    if (type === 'w' && h2) setW2(String(Math.round(Number(h2) * ratio)));
    if (type === 'h' && w2) setH2(String(Math.round(Number(w2) / ratio)));
  };

  const presets = [
    { label: '16:9 (HD)', w: 1920, h: 1080 },
    { label: '4:3 (Standard)', w: 1024, h: 768 },
    { label: '1:1 (Square)', w: 1080, h: 1080 },
    { label: '21:9 (Ultrawide)', w: 2560, h: 1080 },
    { label: '9:16 (Mobile)', w: 1080, h: 1920 },
    { label: '3:2 (Photo)', w: 1500, h: 1000 },
  ];

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="aspect-ratio-calculator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Original Dimensions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Width</label>
              <input type="number" value={w1} onChange={e => setW1(Number(e.target.value) || 1)} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Height</label>
              <input type="number" value={h1} onChange={e => setH1(Number(e.target.value) || 1)} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div style={{ padding: 12, background: 'rgba(59,130,246,0.1)', borderRadius: 8, textAlign: 'center', fontSize: 20, fontWeight: 700, color: 'var(--accent-blue)' }}>
            {ratioW}:{ratioH}
          </div>
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Aspect Ratio</div>

          <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Calculate New Dimensions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>New Width</label>
              <input type="number" value={w2} onChange={e => setW2(e.target.value)} placeholder="?" style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
            <div style={{ display: 'flex', gap: 4, paddingBottom: 4 }}>
              <button onClick={() => calcMissing('w')} className="btn btn-secondary" style={{ fontSize: 11, padding: '6px 8px' }}>W←</button>
              <button onClick={() => calcMissing('h')} className="btn btn-secondary" style={{ fontSize: 11, padding: '6px 8px' }}>→H</button>
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>New Height</label>
              <input type="number" value={h2} onChange={e => setH2(e.target.value)} placeholder="?" style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Common Presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => { setW1(p.w); setH1(p.h); }} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.w} × {p.h}</div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 20, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Visual Preview</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 150 }}>
            <div style={{
              width: Math.min(200, 200 * (w1 / Math.max(w1, h1))),
              height: Math.min(200, 200 * (h1 / Math.max(w1, h1))),
              border: '2px solid var(--accent-blue)',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(59,130,246,0.05)',
            }}>
              <span style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600 }}>{ratioW}:{ratioH}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'sitemap-generator': `'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface SitemapEntry {
  url: string;
  changefreq: string;
  priority: string;
  lastmod: string;
}

export default function SitemapGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as any)['sitemap-generator'];
  const [entries, setEntries] = useState<SitemapEntry[]>([{ url: 'https://example.com/', changefreq: 'weekly', priority: '1.0', lastmod: new Date().toISOString().split('T')[0] }]);
  const [bulkUrls, setBulkUrls] = useState('');
  const [output, setOutput] = useState('');

  const addEntry = () => setEntries([...entries, { url: '', changefreq: 'weekly', priority: '0.5', lastmod: new Date().toISOString().split('T')[0] }]);
  const removeEntry = (i: number) => setEntries(entries.filter((_, idx) => idx !== i));
  const updateEntry = (i: number, field: keyof SitemapEntry, value: string) => {
    const updated = [...entries];
    updated[i] = { ...updated[i], [field]: value };
    setEntries(updated);
  };

  const addBulkUrls = () => {
    const urls = bulkUrls.split('\\n').map(u => u.trim()).filter(u => u);
    const newEntries = urls.map(url => ({ url, changefreq: 'weekly', priority: '0.5', lastmod: new Date().toISOString().split('T')[0] }));
    setEntries([...entries, ...newEntries]);
    setBulkUrls('');
  };

  const generate = () => {
    const valid = entries.filter(e => e.url);
    const xml = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${valid.map(e => \`  <url>
    <loc>\${e.url}</loc>
    <lastmod>\${e.lastmod}</lastmod>
    <changefreq>\${e.changefreq}</changefreq>
    <priority>\${e.priority}</priority>
  </url>\`).join('\\n')}
</urlset>\`;
    setOutput(xml);
  };

  const download = () => {
    const blob = new Blob([output], { type: 'application/xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sitemap.xml';
    a.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="sitemap-generator">
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={addEntry} className="btn btn-primary">+ Add URL</button>
          <button onClick={generate} className="btn btn-secondary">Generate Sitemap</button>
        </div>

        {entries.map((entry, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.5fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <input value={entry.url} onChange={e => updateEntry(i, 'url', e.target.value)} placeholder="https://example.com/page" style={{ padding: 8, fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            <select value={entry.changefreq} onChange={e => updateEntry(i, 'changefreq', e.target.value)} style={{ padding: 8, fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }}>
              {['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <select value={entry.priority} onChange={e => updateEntry(i, 'priority', e.target.value)} style={{ padding: 8, fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }}>
              {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="date" value={entry.lastmod} onChange={e => updateEntry(i, 'lastmod', e.target.value)} style={{ padding: 8, fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            <button onClick={() => removeEntry(i)} className="btn btn-secondary" style={{ fontSize: 11, padding: '6px 10px', color: 'var(--accent-rose)' }}>✕</button>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Bulk Add URLs (one per line)</div>
        <textarea value={bulkUrls} onChange={e => setBulkUrls(e.target.value)} placeholder={"https://example.com/page1\\nhttps://example.com/page2"} style={{ minHeight: 80, marginBottom: 8 }} />
        <button onClick={addBulkUrls} className="btn btn-secondary" style={{ fontSize: 11 }}>Add URLs</button>
      </div>

      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Generated Sitemap XML ({entries.filter(e => e.url).length} URLs)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <CopyButton text={output} />
              <button onClick={download} className="btn btn-secondary" style={{ fontSize: 11 }}>Download XML</button>
            </div>
          </div>
          <textarea value={output} readOnly style={{ minHeight: 300, fontFamily: 'var(--font-jetbrains)', fontSize: 11 }} />
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'html-to-text': `'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function HtmlToText() {
  const { dict } = useLang();
  const t = (dict.tools as any)['html-to-text'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [preserveLinks, setPreserveLinks] = useState(false);
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true);

  const convert = () => {
    let text = input;
    // Decode HTML entities
    const textarea = document.createElement('textarea');

    // Handle block elements with line breaks
    if (preserveLineBreaks) {
      text = text.replace(/<br\\s*\\/?>/gi, '\\n');
      text = text.replace(/<\\/(p|div|h[1-6]|li|tr|blockquote)>/gi, '\\n');
      text = text.replace(/<(hr)\\s*\\/?>/gi, '\\n---\\n');
    }

    // Extract links if preserving
    if (preserveLinks) {
      text = text.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\\/a>/gi, '$2 ($1)');
    }

    // Remove all remaining HTML tags
    text = text.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    textarea.innerHTML = text;
    text = textarea.value;

    // Clean up whitespace
    text = text.replace(/[ \\t]+/g, ' ');
    text = text.replace(/\\n{3,}/g, '\\n\\n');
    text = text.trim();

    setOutput(text);
  };

  const loadSample = () => {
    setInput(\`<html>
<body>
  <h1>Welcome to DevToolBox</h1>
  <p>This is a <strong>powerful</strong> set of <em>developer tools</em>.</p>
  <p>Visit our site at <a href="https://viadreams.cc">DevToolBox</a> for more.</p>
  <ul>
    <li>JSON Formatter</li>
    <li>Base64 Encoder</li>
    <li>UUID Generator</li>
  </ul>
  <p>Copyright &amp; &copy; 2024 DevToolBox. All rights reserved.</p>
</body>
</html>\`);
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="html-to-text">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">Convert</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
          <input type="checkbox" checked={preserveLinks} onChange={e => setPreserveLinks(e.target.checked)} /> Preserve links
        </label>
        <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={preserveLineBreaks} onChange={e => setPreserveLineBreaks(e.target.checked)} /> Preserve line breaks
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>HTML Input</label>
            <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{dict.common.clear}</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your HTML here..." style={{ minHeight: 350 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Plain Text Output</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder="Converted text will appear here..." style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'json-sorter': `'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type SortOrder = 'asc' | 'desc';

function sortKeys(obj: any, order: SortOrder, deep: boolean): any {
  if (Array.isArray(obj)) return deep ? obj.map(item => sortKeys(item, order, deep)) : obj;
  if (obj !== null && typeof obj === 'object') {
    const sorted: any = {};
    const keys = Object.keys(obj).sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
    for (const key of keys) {
      sorted[key] = deep ? sortKeys(obj[key], order, deep) : obj[key];
    }
    return sorted;
  }
  return obj;
}

export default function JsonSorter() {
  const { dict } = useLang();
  const t = (dict.tools as any)['json-sorter'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [order, setOrder] = useState<SortOrder>('asc');
  const [deep, setDeep] = useState(true);
  const [indent, setIndent] = useState(2);

  const sort = () => {
    try {
      const parsed = JSON.parse(input);
      const sorted = sortKeys(parsed, order, deep);
      setOutput(JSON.stringify(sorted, null, indent));
      setError('');
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      zebra: "striped",
      apple: { color: "red", taste: "sweet", origin: { country: "USA", state: "Washington" } },
      mango: [1, 2, 3],
      banana: { yellow: true, appeal: "high" },
      cherry: "red"
    }, null, 2));
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="json-sorter">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={sort} className="btn btn-primary">Sort Keys</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <select value={order} onChange={e => setOrder(e.target.value as SortOrder)} style={{ padding: '6px 10px', fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }}>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
        <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={deep} onChange={e => setDeep(e.target.checked)} /> Deep sort
        </label>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Indent:</label>
          <select value={indent} onChange={e => setIndent(Number(e.target.value))} style={{ width: 50, padding: '4px 6px', fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }}>
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>

      {error && <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>✕ {error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Input JSON</label>
            <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{dict.common.clear}</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your JSON here..." style={{ minHeight: 350 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Sorted JSON</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder="Sorted JSON will appear here..." style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,

  'css-gradient-text': `'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssGradientText() {
  const { dict } = useLang();
  const t = (dict.tools as any)['css-gradient-text'];
  const [text, setText] = useState('Gradient Text');
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState(800);
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [color3, setColor3] = useState('');
  const [angle, setAngle] = useState(135);

  const colors = [color1, color2, color3].filter(Boolean).join(', ');
  const gradient = \`linear-gradient(\${angle}deg, \${colors})\`;

  const cssCode = \`.gradient-text {
  background: \${gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: \${fontSize}px;
  font-weight: \${fontWeight};
}\`;

  const presets = [
    { name: 'Sunset', c1: '#f093fb', c2: '#f5576c', c3: '' },
    { name: 'Ocean', c1: '#4facfe', c2: '#00f2fe', c3: '' },
    { name: 'Forest', c1: '#43e97b', c2: '#38f9d7', c3: '' },
    { name: 'Fire', c1: '#f7971e', c2: '#ffd200', c3: '' },
    { name: 'Night', c1: '#a18cd1', c2: '#fbc2eb', c3: '' },
    { name: 'Rainbow', c1: '#ff0844', c2: '#ffb199', c3: '#667eea' },
  ];

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-gradient-text">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Settings</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Preview Text</label>
            <input type="text" value={text} onChange={e => setText(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Color 1</label>
              <input type="color" value={color1} onChange={e => setColor1(e.target.value)} style={{ width: '100%', height: 32, border: 'none', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Color 2</label>
              <input type="color" value={color2} onChange={e => setColor2(e.target.value)} style={{ width: '100%', height: 32, border: 'none', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Color 3 (optional)</label>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <input type="color" value={color3 || '#000000'} onChange={e => setColor3(e.target.value)} style={{ width: '100%', height: 32, border: 'none', cursor: 'pointer' }} />
                {color3 && <button onClick={() => setColor3('')} style={{ fontSize: 10, background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}>✕</button>}
              </div>
            </div>
          </div>
          {[
            { label: \`Angle: \${angle}°\`, value: angle, set: setAngle, min: 0, max: 360, step: 5 },
            { label: \`Font Size: \${fontSize}px\`, value: fontSize, set: setFontSize, min: 16, max: 120, step: 2 },
            { label: \`Font Weight: \${fontWeight}\`, value: fontWeight, set: setFontWeight, min: 100, max: 900, step: 100 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          ))}

          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, marginTop: 16 }}>Presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {presets.map(p => (
              <button key={p.name} onClick={() => { setColor1(p.c1); setColor2(p.c2); setColor3(p.c3); }} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: \`linear-gradient(90deg, \${p.c1}, \${p.c2}\${p.c3 ? ', ' + p.c3 : ''})\`, color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{p.name}</button>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: fontSize,
            fontWeight: fontWeight,
            textAlign: 'center',
            wordBreak: 'break-word',
          }}>
            {text || 'Gradient Text'}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>CSS Code</label>
          <CopyButton text={cssCode} />
        </div>
        <pre style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, fontSize: 12, color: 'var(--text-primary)', overflow: 'auto', whiteSpace: 'pre-wrap' }}>{cssCode}</pre>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
`,
};

// ============ TRANSLATIONS ============
const translations = {
  en: {
    'image-resizer': { name: 'Image Resizer', description: 'Resize images online for free with custom dimensions', pageTitle: 'Image Resizer Online - Resize Photos Free', pageDescription: 'Resize images online for free. Adjust width, height, maintain aspect ratio. Support PNG, JPG, WebP, GIF. No upload needed - everything runs in your browser.', seoTitle: 'What is Image Resizer?', seoContent: 'Image Resizer is a free online tool that lets you resize images to exact pixel dimensions. Simply upload your image, set the desired width and height, and download the resized result. All processing happens in your browser - your images are never uploaded to any server.', howToUseTitle: 'How to Use', howToUseSteps: ['Upload an image by dragging and dropping or clicking to select', 'Set the desired width and height in pixels', 'Toggle aspect ratio lock to maintain proportions', 'Click Resize Image to process', 'Download the resized image'], useCasesTitle: 'Use Cases', useCases: ['Resize images for social media posts', 'Create thumbnails for websites', 'Reduce image dimensions for email attachments', 'Prepare images for web optimization'], faqTitle: 'FAQ', faqs: [{ q: 'Is my image uploaded to a server?', a: 'No, all processing happens locally in your browser. Your images never leave your device.' }, { q: 'What image formats are supported?', a: 'PNG, JPG, WebP, GIF, and most common image formats are supported.' }, { q: 'Will resizing affect image quality?', a: 'Downscaling generally preserves quality well. Upscaling may result in some blurriness depending on the scale factor.' }] },
    'image-cropper': { name: 'Image Cropper', description: 'Crop images online for free with custom areas', pageTitle: 'Image Cropper Online - Crop Photos Free', pageDescription: 'Crop images online for free. Select custom crop areas, use preset aspect ratios like 1:1, 16:9, 4:3. Download instantly. No upload needed.', seoTitle: 'What is Image Cropper?', seoContent: 'Image Cropper is a free online tool that lets you crop images to exact dimensions. Choose preset aspect ratios or define custom crop areas. All processing happens locally in your browser for maximum privacy.', howToUseTitle: 'How to Use', howToUseSteps: ['Upload an image by dragging and dropping or clicking', 'Choose a preset aspect ratio or set custom crop dimensions', 'Adjust the X, Y, Width, and Height values', 'Click Crop Image to process', 'Download the cropped result'], useCasesTitle: 'Use Cases', useCases: ['Crop profile pictures to square format', 'Create 16:9 thumbnails for YouTube', 'Trim unwanted areas from screenshots', 'Prepare images for specific social media dimensions'], faqTitle: 'FAQ', faqs: [{ q: 'Can I crop to custom dimensions?', a: 'Yes, you can set exact X, Y, Width, and Height values or use preset ratios like 1:1, 16:9, 4:3.' }, { q: 'Is the cropping done locally?', a: 'Yes, all image processing happens in your browser. No data is sent to any server.' }, { q: 'What output format is used?', a: 'Cropped images are exported as PNG format for the best quality.' }] },
    'webp-converter': { name: 'WebP Converter', description: 'Convert images to and from WebP format', pageTitle: 'WebP Converter Online - Convert WebP to PNG/JPG Free', pageDescription: 'Convert images to and from WebP format online. Support PNG to WebP, JPG to WebP, and WebP to PNG/JPG. Adjust quality settings. Free and private.', seoTitle: 'What is WebP Converter?', seoContent: 'WebP Converter is a free online tool that converts images between WebP and other formats. WebP is a modern image format that provides superior compression, reducing file sizes by 25-35% compared to JPEG and PNG while maintaining visual quality.', howToUseTitle: 'How to Use', howToUseSteps: ['Upload an image (WebP, PNG, JPG, or GIF)', 'Select the output format (WebP, PNG, or JPEG)', 'Adjust quality settings if needed', 'Click Convert to process', 'Download the converted image'], useCasesTitle: 'Use Cases', useCases: ['Convert PNG/JPG to WebP for faster web loading', 'Convert WebP images to PNG for compatibility', 'Optimize images for web performance', 'Batch prepare images for modern browsers'], faqTitle: 'FAQ', faqs: [{ q: 'Why use WebP format?', a: 'WebP provides 25-35% smaller file sizes than JPEG and PNG while maintaining visual quality, leading to faster page loads.' }, { q: 'Is WebP supported by all browsers?', a: 'WebP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge.' }, { q: 'Does conversion affect image quality?', a: 'You can control the quality level. Higher quality means larger file sizes. Lossless conversion (PNG) preserves perfect quality.' }] },
    'css-glassmorphism-generator': { name: 'Glassmorphism CSS Generator', description: 'Generate glassmorphism CSS effects with live preview', pageTitle: 'Glassmorphism CSS Generator - Glass Effect Online', pageDescription: 'Generate beautiful glassmorphism CSS effects with live preview. Customize blur, transparency, border radius, and colors. Copy ready-to-use CSS code.', seoTitle: 'What is Glassmorphism?', seoContent: 'Glassmorphism is a modern UI design trend that creates a frosted glass effect using CSS backdrop-filter and semi-transparent backgrounds. This generator lets you customize blur intensity, opacity, border effects, and colors with real-time preview and copy-ready CSS code.', howToUseTitle: 'How to Use', howToUseSteps: ['Adjust the blur, opacity, and border settings using sliders', 'Pick a background color for the glass effect', 'Preview the result in the live preview panel', 'Copy the generated CSS code'], useCasesTitle: 'Use Cases', useCases: ['Create modern glass-effect cards and panels', 'Design frosted glass navigation bars', 'Build translucent modal overlays', 'Add depth to hero sections with blur effects'], faqTitle: 'FAQ', faqs: [{ q: 'What is backdrop-filter?', a: 'backdrop-filter is a CSS property that applies graphical effects like blur to the area behind an element, creating the glass effect.' }, { q: 'Is glassmorphism supported by all browsers?', a: 'backdrop-filter is supported by all modern browsers. For older browsers, a fallback solid background is recommended.' }, { q: 'Can I customize the colors?', a: 'Yes, you can change the background color, opacity, blur intensity, border opacity, and border radius.' }] },
    'css-neumorphism-generator': { name: 'Neumorphism CSS Generator', description: 'Generate neumorphism soft UI CSS effects', pageTitle: 'Neumorphism CSS Generator - Soft UI Generator Online', pageDescription: 'Generate neumorphism (soft UI) CSS effects with live preview. Customize shadows, colors, shapes. Create flat, concave, convex, and pressed states.', seoTitle: 'What is Neumorphism?', seoContent: 'Neumorphism (also called soft UI) is a design style that combines flat design with subtle shadows to create soft, extruded shapes. This generator creates neumorphic CSS effects with customizable shadow size, intensity, and four different shape variations.', howToUseTitle: 'How to Use', howToUseSteps: ['Choose a background color for your design', 'Select a shape style: flat, concave, convex, or pressed', 'Adjust shadow size, intensity, and border radius', 'Preview the effect in real-time', 'Copy the CSS code'], useCasesTitle: 'Use Cases', useCases: ['Design soft UI buttons and cards', 'Create neumorphic form inputs', 'Build modern dashboard interfaces', 'Add depth to minimalist designs'], faqTitle: 'FAQ', faqs: [{ q: 'What makes neumorphism different from flat design?', a: 'Neumorphism adds subtle light and dark shadows to create a soft, extruded appearance, while flat design uses no shadows.' }, { q: 'What are the shape options?', a: 'Four shapes: Flat (basic neumorphism), Concave (inward curve), Convex (outward curve), and Pressed (inset shadow).' }, { q: 'Does background color matter?', a: 'Yes, neumorphism works best with soft, muted colors. Very dark or very bright colors may not produce the desired effect.' }] },
    'aspect-ratio-calculator': { name: 'Aspect Ratio Calculator', description: 'Calculate and convert aspect ratios', pageTitle: 'Aspect Ratio Calculator - Calculate Image & Video Ratios', pageDescription: 'Calculate and convert aspect ratios for images, videos, and screens. Find missing dimensions, use common presets like 16:9, 4:3, 1:1. Free online tool.', seoTitle: 'What is Aspect Ratio Calculator?', seoContent: 'Aspect Ratio Calculator helps you calculate the aspect ratio of any image, video, or screen from its width and height. It also helps you find missing dimensions when you know one dimension and the desired aspect ratio.', howToUseTitle: 'How to Use', howToUseSteps: ['Enter the original width and height', 'View the calculated aspect ratio', 'Enter a new width or height to calculate the missing dimension', 'Use preset ratios for common formats'], useCasesTitle: 'Use Cases', useCases: ['Calculate aspect ratios for responsive web design', 'Find correct dimensions for video thumbnails', 'Resize images while maintaining proportions', 'Determine screen ratios for design mockups'], faqTitle: 'FAQ', faqs: [{ q: 'What is aspect ratio?', a: 'Aspect ratio is the proportional relationship between width and height, expressed as two numbers like 16:9 or 4:3.' }, { q: 'What is the most common aspect ratio?', a: '16:9 is the most common for HD video and modern screens. 4:3 was the traditional TV standard.' }, { q: 'How do I calculate a missing dimension?', a: 'Enter one dimension (width or height) and click the calculate button to find the other dimension based on the current aspect ratio.' }] },
    'sitemap-generator': { name: 'XML Sitemap Generator', description: 'Generate XML sitemaps for your website', pageTitle: 'XML Sitemap Generator Online - Create Sitemap Free', pageDescription: 'Generate XML sitemaps for your website. Add URLs, set priorities, change frequencies. Download sitemap.xml file. Free online sitemap creator.', seoTitle: 'What is XML Sitemap Generator?', seoContent: 'XML Sitemap Generator creates valid XML sitemaps that help search engines discover and index your web pages. Add URLs individually or in bulk, set change frequencies and priorities, then download a ready-to-upload sitemap.xml file.', howToUseTitle: 'How to Use', howToUseSteps: ['Add URLs individually or paste multiple URLs in bulk', 'Set change frequency and priority for each URL', 'Set the last modification date', 'Click Generate Sitemap', 'Download the sitemap.xml file'], useCasesTitle: 'Use Cases', useCases: ['Create sitemaps for new websites', 'Update sitemaps after adding new pages', 'Generate sitemaps for small static sites', 'Quickly create test sitemaps for SEO audits'], faqTitle: 'FAQ', faqs: [{ q: 'What is an XML sitemap?', a: 'An XML sitemap is a file that lists all pages on your website, helping search engines like Google discover and crawl them efficiently.' }, { q: 'Where do I upload the sitemap?', a: 'Upload sitemap.xml to your website root directory and submit it via Google Search Console or add it to your robots.txt.' }, { q: 'How many URLs can I add?', a: 'This tool has no practical limit. However, XML sitemaps should contain no more than 50,000 URLs per the protocol specification.' }] },
    'html-to-text': { name: 'HTML to Text Converter', description: 'Convert HTML to plain text', pageTitle: 'HTML to Text Converter - Strip HTML Tags Online', pageDescription: 'Convert HTML to plain text online. Strip HTML tags, decode entities, extract readable text content. Option to preserve links and line breaks.', seoTitle: 'What is HTML to Text Converter?', seoContent: 'HTML to Text Converter strips all HTML tags and converts HTML content to readable plain text. It decodes HTML entities, preserves text structure, and optionally retains links and line breaks.', howToUseTitle: 'How to Use', howToUseSteps: ['Paste your HTML code in the input area', 'Choose options: preserve links, preserve line breaks', 'Click Convert to extract plain text', 'Copy the result'], useCasesTitle: 'Use Cases', useCases: ['Extract text content from HTML emails', 'Clean HTML for plain text newsletters', 'Convert web page content to text files', 'Remove markup from copied web content'], faqTitle: 'FAQ', faqs: [{ q: 'Does it decode HTML entities?', a: 'Yes, it converts entities like &amp;, &lt;, &gt;, &nbsp; and others to their text equivalents.' }, { q: 'Can I keep the links?', a: 'Yes, enable the Preserve Links option to convert <a> tags to text format like: link text (URL).' }, { q: 'Is formatting preserved?', a: 'Line breaks from block elements (p, div, br, h1-h6) are preserved when the Preserve Line Breaks option is enabled.' }] },
    'json-sorter': { name: 'JSON Key Sorter', description: 'Sort JSON keys alphabetically', pageTitle: 'JSON Key Sorter - Sort JSON Keys Alphabetically Online', pageDescription: 'Sort JSON keys alphabetically online. Order JSON properties A-Z or Z-A, with deep sorting for nested objects. Free JSON organizer tool.', seoTitle: 'What is JSON Key Sorter?', seoContent: 'JSON Key Sorter organizes JSON data by sorting object keys alphabetically. It supports both ascending (A-Z) and descending (Z-A) order, with optional deep sorting that recursively sorts keys in nested objects.', howToUseTitle: 'How to Use', howToUseSteps: ['Paste your JSON in the input area', 'Choose sort order: A-Z or Z-A', 'Toggle deep sort for nested objects', 'Click Sort Keys to process', 'Copy the sorted result'], useCasesTitle: 'Use Cases', useCases: ['Normalize JSON for consistent diffs in version control', 'Organize configuration files alphabetically', 'Clean up API responses for documentation', 'Make JSON files more readable and navigable'], faqTitle: 'FAQ', faqs: [{ q: 'What is deep sorting?', a: 'Deep sorting recursively sorts keys in nested objects, not just the top-level keys.' }, { q: 'Does it preserve array order?', a: 'Yes, array elements maintain their original order. Only object keys are sorted.' }, { q: 'Can I sort in reverse order?', a: 'Yes, choose Z-A from the dropdown to sort keys in descending alphabetical order.' }] },
    'css-gradient-text': { name: 'CSS Gradient Text Generator', description: 'Create gradient text effects with CSS', pageTitle: 'CSS Gradient Text Generator - Gradient Text Effect Online', pageDescription: 'Create beautiful gradient text effects with CSS. Live preview, multiple colors, angle control, font size and weight. Copy ready-to-use CSS code.', seoTitle: 'What is CSS Gradient Text?', seoContent: 'CSS Gradient Text Generator creates colorful gradient effects on text using CSS background-clip and -webkit-text-fill-color properties. Customize colors, angles, font size, and weight with real-time preview and copy-ready CSS code.', howToUseTitle: 'How to Use', howToUseSteps: ['Enter your preview text', 'Choose gradient colors (2 or 3 colors)', 'Adjust the angle, font size, and weight', 'Try preset color combinations', 'Copy the CSS code'], useCasesTitle: 'Use Cases', useCases: ['Create eye-catching headings for websites', 'Design gradient logos and titles', 'Add visual interest to landing pages', 'Build colorful text effects for marketing pages'], faqTitle: 'FAQ', faqs: [{ q: 'How does gradient text work in CSS?', a: 'It uses background with a gradient, then background-clip: text and -webkit-text-fill-color: transparent to show the gradient through the text shape.' }, { q: 'Is gradient text supported by all browsers?', a: 'Yes, it works in all modern browsers. The -webkit- prefix ensures compatibility with older versions of Chrome and Safari.' }, { q: 'Can I use more than 2 colors?', a: 'Yes, this generator supports up to 3 colors. The third color is optional.' }] },
  },
};

// Translation helper for other languages (simple translation from English)
const langTranslations = {
  zh: { 'image-resizer': '图片缩放工具', 'image-cropper': '图片裁剪工具', 'webp-converter': 'WebP图片转换器', 'css-glassmorphism-generator': '玻璃拟态CSS生成器', 'css-neumorphism-generator': '新拟态CSS生成器', 'aspect-ratio-calculator': '宽高比计算器', 'sitemap-generator': 'XML站点地图生成器', 'html-to-text': 'HTML转纯文本', 'json-sorter': 'JSON键名排序器', 'css-gradient-text': 'CSS渐变文字生成器' },
  fr: { 'image-resizer': 'Redimensionneur d\'Images', 'image-cropper': 'Recadrage d\'Images', 'webp-converter': 'Convertisseur WebP', 'css-glassmorphism-generator': 'Générateur CSS Glassmorphisme', 'css-neumorphism-generator': 'Générateur CSS Néomorphisme', 'aspect-ratio-calculator': 'Calculateur de Ratio', 'sitemap-generator': 'Générateur de Sitemap XML', 'html-to-text': 'Convertisseur HTML en Texte', 'json-sorter': 'Trieur de Clés JSON', 'css-gradient-text': 'Générateur de Texte Dégradé CSS' },
  de: { 'image-resizer': 'Bildgröße ändern', 'image-cropper': 'Bild zuschneiden', 'webp-converter': 'WebP-Konverter', 'css-glassmorphism-generator': 'Glassmorphismus CSS-Generator', 'css-neumorphism-generator': 'Neumorphismus CSS-Generator', 'aspect-ratio-calculator': 'Seitenverhältnis-Rechner', 'sitemap-generator': 'XML-Sitemap-Generator', 'html-to-text': 'HTML zu Text Konverter', 'json-sorter': 'JSON-Schlüssel Sortierer', 'css-gradient-text': 'CSS Verlaufstext Generator' },
  es: { 'image-resizer': 'Redimensionador de Imágenes', 'image-cropper': 'Recortador de Imágenes', 'webp-converter': 'Convertidor WebP', 'css-glassmorphism-generator': 'Generador CSS Glassmorfismo', 'css-neumorphism-generator': 'Generador CSS Neumorfismo', 'aspect-ratio-calculator': 'Calculadora de Relación de Aspecto', 'sitemap-generator': 'Generador de Sitemap XML', 'html-to-text': 'Convertidor HTML a Texto', 'json-sorter': 'Ordenador de Claves JSON', 'css-gradient-text': 'Generador de Texto Degradado CSS' },
  it: { 'image-resizer': 'Ridimensionatore Immagini', 'image-cropper': 'Ritaglio Immagini', 'webp-converter': 'Convertitore WebP', 'css-glassmorphism-generator': 'Generatore CSS Glassmorfismo', 'css-neumorphism-generator': 'Generatore CSS Neumorfismo', 'aspect-ratio-calculator': 'Calcolatore Rapporto d\'Aspetto', 'sitemap-generator': 'Generatore Sitemap XML', 'html-to-text': 'Convertitore HTML in Testo', 'json-sorter': 'Ordinatore Chiavi JSON', 'css-gradient-text': 'Generatore Testo Gradiente CSS' },
  pt: { 'image-resizer': 'Redimensionador de Imagens', 'image-cropper': 'Cortador de Imagens', 'webp-converter': 'Conversor WebP', 'css-glassmorphism-generator': 'Gerador CSS Glassmorfismo', 'css-neumorphism-generator': 'Gerador CSS Neumorfismo', 'aspect-ratio-calculator': 'Calculadora de Proporção', 'sitemap-generator': 'Gerador de Sitemap XML', 'html-to-text': 'Conversor HTML para Texto', 'json-sorter': 'Ordenador de Chaves JSON', 'css-gradient-text': 'Gerador de Texto Gradiente CSS' },
  nl: { 'image-resizer': 'Afbeelding Vergroten/Verkleinen', 'image-cropper': 'Afbeelding Bijsnijden', 'webp-converter': 'WebP Converter', 'css-glassmorphism-generator': 'Glassmorfisme CSS Generator', 'css-neumorphism-generator': 'Neumorfisme CSS Generator', 'aspect-ratio-calculator': 'Beeldverhouding Calculator', 'sitemap-generator': 'XML Sitemap Generator', 'html-to-text': 'HTML naar Tekst Converter', 'json-sorter': 'JSON Sleutel Sorteerder', 'css-gradient-text': 'CSS Verloop Tekst Generator' },
  pl: { 'image-resizer': 'Zmiana Rozmiaru Obrazów', 'image-cropper': 'Przycinanie Obrazów', 'webp-converter': 'Konwerter WebP', 'css-glassmorphism-generator': 'Generator CSS Glassmorfizm', 'css-neumorphism-generator': 'Generator CSS Neumorfizm', 'aspect-ratio-calculator': 'Kalkulator Proporcji', 'sitemap-generator': 'Generator Mapy Strony XML', 'html-to-text': 'Konwerter HTML na Tekst', 'json-sorter': 'Sortowanie Kluczy JSON', 'css-gradient-text': 'Generator Gradientu Tekstu CSS' },
  sv: { 'image-resizer': 'Ändra Bildstorlek', 'image-cropper': 'Beskär Bild', 'webp-converter': 'WebP Konverterare', 'css-glassmorphism-generator': 'Glassmorfism CSS Generator', 'css-neumorphism-generator': 'Neumorfism CSS Generator', 'aspect-ratio-calculator': 'Bildförhållande Kalkylator', 'sitemap-generator': 'XML Sitemap Generator', 'html-to-text': 'HTML till Text Konverterare', 'json-sorter': 'JSON Nyckelsorterare', 'css-gradient-text': 'CSS Gradient Text Generator' },
  no: { 'image-resizer': 'Endre Bildestørrelse', 'image-cropper': 'Beskjær Bilde', 'webp-converter': 'WebP Konverterer', 'css-glassmorphism-generator': 'Glassmorfisme CSS Generator', 'css-neumorphism-generator': 'Neumorfisme CSS Generator', 'aspect-ratio-calculator': 'Bildeforhold Kalkulator', 'sitemap-generator': 'XML Sitemap Generator', 'html-to-text': 'HTML til Tekst Konverterer', 'json-sorter': 'JSON Nøkkelsortering', 'css-gradient-text': 'CSS Gradient Tekst Generator' },
  ja: { 'image-resizer': '画像リサイズツール', 'image-cropper': '画像トリミングツール', 'webp-converter': 'WebP変換ツール', 'css-glassmorphism-generator': 'グラスモーフィズムCSSジェネレーター', 'css-neumorphism-generator': 'ニューモーフィズムCSSジェネレーター', 'aspect-ratio-calculator': 'アスペクト比計算機', 'sitemap-generator': 'XMLサイトマップジェネレーター', 'html-to-text': 'HTMLからテキスト変換', 'json-sorter': 'JSONキーソーター', 'css-gradient-text': 'CSSグラデーションテキストジェネレーター' },
  ko: { 'image-resizer': '이미지 크기 조정', 'image-cropper': '이미지 자르기', 'webp-converter': 'WebP 변환기', 'css-glassmorphism-generator': '글라스모피즘 CSS 생성기', 'css-neumorphism-generator': '뉴모피즘 CSS 생성기', 'aspect-ratio-calculator': '화면 비율 계산기', 'sitemap-generator': 'XML 사이트맵 생성기', 'html-to-text': 'HTML을 텍스트로 변환', 'json-sorter': 'JSON 키 정렬기', 'css-gradient-text': 'CSS 그라데이션 텍스트 생성기' },
  id: { 'image-resizer': 'Pengubah Ukuran Gambar', 'image-cropper': 'Pemotong Gambar', 'webp-converter': 'Konverter WebP', 'css-glassmorphism-generator': 'Generator CSS Glassmorphism', 'css-neumorphism-generator': 'Generator CSS Neumorphism', 'aspect-ratio-calculator': 'Kalkulator Rasio Aspek', 'sitemap-generator': 'Generator Sitemap XML', 'html-to-text': 'Konverter HTML ke Teks', 'json-sorter': 'Pengurut Kunci JSON', 'css-gradient-text': 'Generator Teks Gradien CSS' },
  th: { 'image-resizer': 'ปรับขนาดรูปภาพ', 'image-cropper': 'ครอปรูปภาพ', 'webp-converter': 'แปลงไฟล์ WebP', 'css-glassmorphism-generator': 'สร้าง CSS Glassmorphism', 'css-neumorphism-generator': 'สร้าง CSS Neumorphism', 'aspect-ratio-calculator': 'คำนวณอัตราส่วนภาพ', 'sitemap-generator': 'สร้าง XML Sitemap', 'html-to-text': 'แปลง HTML เป็นข้อความ', 'json-sorter': 'เรียงคีย์ JSON', 'css-gradient-text': 'สร้างข้อความไล่สี CSS' },
};

// ============ MAIN EXECUTION ============

console.log('=== Adding 10 New Tools ===\n');

// 1. Create tool directories and files
for (const tool of newTools) {
  const toolDir = path.join(TOOLS_DIR, tool.id);
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir, { recursive: true });
  }

  // Write layout.tsx
  fs.writeFileSync(path.join(toolDir, 'layout.tsx'), genLayout(tool.id));
  console.log(`✓ Created ${tool.id}/layout.tsx`);

  // Write page.tsx
  if (pageTemplates[tool.id]) {
    fs.writeFileSync(path.join(toolDir, 'page.tsx'), pageTemplates[tool.id]);
    console.log(`✓ Created ${tool.id}/page.tsx`);
  }
}

// 2. Add tool entries to tools.ts
const toolsTsContent = fs.readFileSync(TOOLS_TS, 'utf8');
const insertIndex = toolsTsContent.lastIndexOf('];');
const newToolEntries = newTools.map(tool => `  {
    id: '${tool.id}',
    name: '${tool.name}',
    description: '${tool.description}',
    icon: '${tool.icon}',
    category: '${tool.category}',
    keywords: [${tool.keywords.map(k => `'${k}'`).join(', ')}],
    path: '/tools/${tool.id}',
    relatedTools: [${tool.relatedTools.map(r => `'${r}'`).join(', ')}],
  }`).join(',\n');

const updatedToolsTs = toolsTsContent.slice(0, insertIndex) + newToolEntries + ',\n' + toolsTsContent.slice(insertIndex);
fs.writeFileSync(TOOLS_TS, updatedToolsTs);
console.log(`\n✓ Added ${newTools.length} entries to tools.ts`);

// 3. Update all language dictionaries
const locales = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th'];

for (const locale of locales) {
  const dictPath = path.join(DICT_DIR, `${locale}.json`);
  const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

  for (const tool of newTools) {
    // Use English translations as base
    const enTrans = translations.en[tool.id];
    const localeName = (langTranslations[locale] && langTranslations[locale][tool.id]) || enTrans.name;

    dict.tools[tool.id] = {
      name: localeName,
      description: enTrans.description,
      pageTitle: locale === 'en' ? enTrans.pageTitle : `${localeName} - DevToolBox`,
      pageDescription: enTrans.pageDescription,
      seoTitle: enTrans.seoTitle,
      seoContent: enTrans.seoContent,
      howToUseTitle: enTrans.howToUseTitle,
      howToUseSteps: enTrans.howToUseSteps,
      useCasesTitle: enTrans.useCasesTitle,
      useCases: enTrans.useCases,
      faqTitle: enTrans.faqTitle,
      faqs: enTrans.faqs,
    };
  }

  fs.writeFileSync(dictPath, JSON.stringify(dict, null, 2), 'utf8');
  console.log(`✓ Updated ${locale}.json`);
}

console.log(`\n=== Done! Added ${newTools.length} new tools ===`);
console.log('Tools added:', newTools.map(t => t.id).join(', '));
