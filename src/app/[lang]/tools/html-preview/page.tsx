'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
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
          body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
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
            document.body.innerHTML += '<div style="color: #d32f2f; padding: 12px; margin-top: 20px; border: 1px solid #d32f2f; background: #ffebee; border-radius: 4px; font-family: monospace; font-size: 12px;">Error: ' + e.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;

    iframeRef.current.srcdoc = combinedHtml;
    setJsError('');
  };

  const templates = {
    blank: { html: '', css: '', js: '' },
    flexbox: {
      html: `<div class="container">
  <div class="header">Header</div>
  <div class="main">
    <div class="sidebar">Sidebar</div>
    <div class="content">Content</div>
  </div>
  <div class="footer">Footer</div>
</div>`,
      css: `.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}
.header {
  background: #2196F3;
  color: white;
  padding: 20px;
  text-align: center;
  font-weight: bold;
}
.main {
  display: flex;
  flex: 1;
  gap: 10px;
  padding: 10px;
}
.sidebar {
  width: 200px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.content {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.footer {
  background: #333;
  color: white;
  padding: 20px;
  text-align: center;
}`,
      js: '',
    },
    form: {
      html: `<form class="form-container">
  <h2>Contact Form</h2>
  <div class="form-group">
    <label>Name:</label>
    <input type="text" placeholder="Your name">
  </div>
  <div class="form-group">
    <label>Email:</label>
    <input type="email" placeholder="your@email.com">
  </div>
  <div class="form-group">
    <label>Message:</label>
    <textarea placeholder="Your message..." rows="5"></textarea>
  </div>
  <button type="submit">Submit</button>
</form>`,
      css: `.form-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}
h2 {
  margin-top: 0;
  color: #333;
}
.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}
input, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}
input:focus, textarea:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 4px rgba(33,150,243,0.3);
}
button {
  padding: 12px 24px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
button:hover {
  background: #1976D2;
}`,
      js: `document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Form submitted!');
});`,
    },
    landing: {
      html: `<div class="landing">
  <nav class="navbar">
    <div class="logo">MyApp</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">Features</a>
      <a href="#">Pricing</a>
    </div>
  </nav>
  <section class="hero">
    <h1>Welcome to Our Amazing App</h1>
    <p>Build something awesome today</p>
    <button class="cta-btn">Get Started</button>
  </section>
</div>`,
      css: `.landing {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 15px 30px;
  color: white;
}
.logo {
  font-size: 24px;
  font-weight: bold;
}
.nav-links {
  display: flex;
  gap: 30px;
}
.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}
.nav-links a:hover {
  color: #00bcd4;
}
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 30px;
  text-align: center;
}
.hero h1 {
  font-size: 48px;
  margin: 0 0 20px 0;
}
.hero p {
  font-size: 20px;
  margin: 0 0 30px 0;
}
.cta-btn {
  padding: 15px 40px;
  background: #00bcd4;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}
.cta-btn:hover {
  transform: scale(1.05);
}`,
      js: `document.querySelector('.cta-btn').addEventListener('click', () => {
  alert('Thank you for your interest!');
});`,
    },
    interactive: {
      html: `<div class="interactive-demo">
  <h2>Interactive Counter</h2>
  <p>Count: <span id="counter">0</span></p>
  <button id="increment">+</button>
  <button id="decrement">-</button>
  <button id="reset">Reset</button>
</div>`,
      css: `.interactive-demo {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
h2 {
  margin-top: 0;
  font-size: 28px;
}
#counter {
  font-size: 48px;
  font-weight: bold;
  display: block;
  margin: 20px 0;
}
button {
  padding: 10px 20px;
  margin: 5px;
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s;
}
button:hover {
  background: white;
  color: #667eea;
}`,
      js: `let count = 0;
const counterEl = document.getElementById('counter');
document.getElementById('increment').addEventListener('click', () => {
  count++;
  counterEl.textContent = count;
});
document.getElementById('decrement').addEventListener('click', () => {
  count--;
  counterEl.textContent = count;
});
document.getElementById('reset').addEventListener('click', () => {
  count = 0;
  counterEl.textContent = count;
});`,
    },
  };

  const loadTemplate = (template: keyof typeof templates) => {
    const tmpl = templates[template];
    setHtml(tmpl.html);
    setCss(tmpl.css);
    setJs(tmpl.js);
    setActiveTab('html');
  };

  const previewContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, borderBottom: '1px solid var(--border-color)', paddingBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('html')}
          style={{
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: activeTab === 'html' ? 600 : 400,
            background: activeTab === 'html' ? 'var(--bg-secondary)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'html' ? '2px solid var(--accent)' : 'none',
            cursor: 'pointer',
            color: activeTab === 'html' ? 'var(--text-primary)' : 'var(--text-secondary)',
            transition: 'all 0.2s',
          }}
        >
          HTML
        </button>
        <button
          onClick={() => setActiveTab('css')}
          style={{
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: activeTab === 'css' ? 600 : 400,
            background: activeTab === 'css' ? 'var(--bg-secondary)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'css' ? '2px solid var(--accent)' : 'none',
            cursor: 'pointer',
            color: activeTab === 'css' ? 'var(--text-primary)' : 'var(--text-secondary)',
            transition: 'all 0.2s',
          }}
        >
          CSS
        </button>
        <button
          onClick={() => setActiveTab('js')}
          style={{
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: activeTab === 'js' ? 600 : 400,
            background: activeTab === 'js' ? 'var(--bg-secondary)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'js' ? '2px solid var(--accent)' : 'none',
            cursor: 'pointer',
            color: activeTab === 'js' ? 'var(--text-primary)' : 'var(--text-secondary)',
            transition: 'all 0.2s',
          }}
        >
          JavaScript
        </button>

        {/* Spacer */}
        <div style={{ marginLeft: 'auto' }} />

        {/* Templates Dropdown */}
        <select onChange={(e) => loadTemplate(e.target.value as keyof typeof templates)} defaultValue="" style={{ padding: '6px 8px', fontSize: 11, borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
          <option value="" disabled>Templates</option>
          <option value="blank">Blank</option>
          <option value="flexbox">Flexbox Layout</option>
          <option value="form">Form</option>
          <option value="landing">Landing Page</option>
          <option value="interactive">Interactive Counter</option>
        </select>

        <button onClick={() => setFullscreen(!fullscreen)} className="btn btn-secondary" style={{ fontSize: 11, padding: '6px 12px' }}>
          {fullscreen ? '⛌ Exit' : '⛶ Fullscreen'}
        </button>
      </div>

      {/* Code Editor */}
      <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span>{activeTab === 'html' ? 'HTML' : activeTab === 'css' ? 'CSS' : 'JavaScript'}</span>
          <button onClick={() => {
            if (activeTab === 'html') setHtml('');
            else if (activeTab === 'css') setCss('');
            else setJs('');
          }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>
            {dict.common.clear}
          </button>
        </div>
        {activeTab === 'html' && (
          <textarea
            value={html}
            onChange={e => setHtml(e.target.value)}
            placeholder={'<div class="container">\n  <h1>Hello World</h1>\n</div>'}
            style={{ flex: 1, minHeight: 300, fontFamily: 'monospace', fontSize: 13, padding: 12, backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 4 }}
          />
        )}
        {activeTab === 'css' && (
          <textarea
            value={css}
            onChange={e => setCss(e.target.value)}
            placeholder={'.container {\n  max-width: 1000px;\n  margin: 0 auto;\n  padding: 20px;\n}'}
            style={{ flex: 1, minHeight: 300, fontFamily: 'monospace', fontSize: 13, padding: 12, backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 4 }}
          />
        )}
        {activeTab === 'js' && (
          <textarea
            value={js}
            onChange={e => setJs(e.target.value)}
            placeholder={'document.addEventListener("DOMContentLoaded", () => {\n  console.log("Page loaded!");\n});'}
            style={{ flex: 1, minHeight: 300, fontFamily: 'monospace', fontSize: 13, padding: 12, backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 4 }}
          />
        )}
      </div>

      {/* Preview Section */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Preview</h3>
        <iframe
          ref={iframeRef}
          style={{
            width: '100%',
            height: 400,
            border: '1px solid var(--border-color)',
            borderRadius: 4,
            background: 'white',
          }}
          title="HTML Preview"
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
