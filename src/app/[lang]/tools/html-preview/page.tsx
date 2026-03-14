'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function HtmlPreview() {
  const { dict } = useLang();
  const t = dict.tools['html-preview'];
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [jsError, setJsError] = useState('');
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePreview();
    }, 500);
    return () => clearTimeout(timer);
  }, [html, css, js]);

  const updatePreview = () => {
    if (!iframeRef.current) return;

    const combinedHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch(e) {
            console.error('JS Error:', e.message);
            document.body.innerHTML += '<div style="color: red; padding: 10px; margin-top: 20px; border: 1px solid red; background: #ffe0e0;">Error: ' + e.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;

    iframeRef.current.srcdoc = combinedHtml;
    setJsError('');
  };

  const loadSample = () => {
    setHtml(`<div class="container">
  <h1>Interactive Demo</h1>
  <p>Click the button below:</p>
  <button id="myBtn">Click Me</button>
  <p id="result"></p>
</div>`);
    setCss(`.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
#myBtn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
#myBtn:hover {
  background: #0056b3;
}`);
    setJs(`document.getElementById('myBtn').addEventListener('click', function() {
  document.getElementById('result').textContent = 'Button clicked at ' + new Date().toLocaleTimeString();
});`);
  };

  const previewContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, borderBottom: '1px solid var(--border-color)', paddingBottom: 12 }}>
        <button
          onClick={() => setActiveTab('html')}
          style={{
            padding: '6px 12px',
            fontSize: 13,
            background: activeTab === 'html' ? 'var(--bg-secondary)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: activeTab === 'html' ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}
        >
          HTML
        </button>
        <button
          onClick={() => setActiveTab('css')}
          style={{
            padding: '6px 12px',
            fontSize: 13,
            background: activeTab === 'css' ? 'var(--bg-secondary)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: activeTab === 'css' ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}
        >
          CSS
        </button>
        <button
          onClick={() => setActiveTab('js')}
          style={{
            padding: '6px 12px',
            fontSize: 13,
            background: activeTab === 'js' ? 'var(--bg-secondary)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: activeTab === 'js' ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}
        >
          JavaScript
        </button>
        <button onClick={loadSample} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px', marginLeft: 'auto' }}>{dict.common.loadSample}</button>
        <button onClick={() => setFullscreen(!fullscreen)} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{fullscreen ? t.exitFullscreen : t.enterFullscreen}</button>
      </div>

      {activeTab === 'html' && (
        <textarea
          value={html}
          onChange={e => setHtml(e.target.value)}
          placeholder={t.htmlPlaceholder}
          style={{ flex: 1, minHeight: 300, fontFamily: 'monospace', marginBottom: 12 }}
        />
      )}
      {activeTab === 'css' && (
        <textarea
          value={css}
          onChange={e => setCss(e.target.value)}
          placeholder={t.cssPlaceholder}
          style={{ flex: 1, minHeight: 300, fontFamily: 'monospace', marginBottom: 12 }}
        />
      )}
      {activeTab === 'js' && (
        <textarea
          value={js}
          onChange={e => setJs(e.target.value)}
          placeholder={t.jsPlaceholder}
          style={{ flex: 1, minHeight: 300, fontFamily: 'monospace', marginBottom: 12 }}
        />
      )}

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.preview}</h3>
        <iframe
          ref={iframeRef}
          style={{
            width: '100%',
            height: 400,
            border: '1px solid var(--border-color)',
            borderRadius: 4,
            background: 'white',
          }}
        />
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-primary)', zIndex: 10000, display: 'flex', flexDirection: 'column', padding: 16 }}>
        <button
          onClick={() => setFullscreen(false)}
          className="btn btn-secondary"
          style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, padding: '4px 10px' }}
        >
          {t.exitFullscreen}
        </button>
        <div style={{ flex: 1, marginTop: 20 }}>
          {previewContent}
        </div>
      </div>
    );
  }

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="html-preview"
    >
      <div style={{ minHeight: 800 }}>
        {previewContent}
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
