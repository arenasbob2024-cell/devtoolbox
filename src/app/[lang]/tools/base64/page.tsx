'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

export default function Base64Tool() {
  const { dict } = useLang();
  const t = dict.tools['base64'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [shareCopied, setShareCopied] = useState(false);

  // Restore state from URL hash on mount
  useEffect(() => {
    const params = getHashParams();
    if (params.mode === 'encode' || params.mode === 'decode') {
      setMode(params.mode);
    }
    if (params.input) {
      const decoded = decodeFromUrl(params.input);
      if (decoded) {
        setInput(decoded);
        // Auto-process
        try {
          const m = params.mode === 'decode' ? 'decode' : 'encode';
          if (m === 'encode') {
            setOutput(btoa(unescape(encodeURIComponent(decoded))));
          } else {
            setOutput(decodeURIComponent(escape(atob(decoded.trim()))));
          }
        } catch { /* silently ignore */ }
      }
    }
  }, []);

  const handleShare = () => {
    if (!input) return;
    const params = { input: encodeForUrl(input), mode };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const process = () => {
    try {
      setError('');
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch {
      setError(mode === 'decode' ? t.invalidBase64 : t.encodingError);
      setOutput('');
    }
  };

  const swap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="base64"
    >
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          background: 'var(--bg-input)',
          borderRadius: 8,
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setMode('encode')}
            style={{
              padding: '8px 20px',
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              background: mode === 'encode' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'encode' ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {dict.common.encode}
          </button>
          <button
            onClick={() => setMode('decode')}
            style={{
              padding: '8px 20px',
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              background: mode === 'decode' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'decode' ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {dict.common.decode}
          </button>
        </div>
        <button onClick={process} className="btn btn-primary">
          {mode === 'encode' ? `${dict.common.encode} →` : `← ${dict.common.decode}`}
        </button>
        <button onClick={swap} className="btn btn-secondary">{'\u21C5'} {dict.common.swap}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
        <button onClick={handleShare} className="btn btn-secondary" style={{ marginLeft: 'auto' }} title="Share via URL">
          {shareCopied ? '\u2713 Link Copied!' : '\uD83D\uDD17 Share'}
        </button>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'encode' ? t.plainText : t.base64String}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? t.inputPlaceholder : t.decodePlaceholder}
            style={{ minHeight: 300 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'encode' ? t.base64String : t.plainText}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={dict.common.resultPlaceholder}
            style={{ minHeight: 300, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
