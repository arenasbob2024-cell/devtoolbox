'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function OgImagePreview() {
  const { dict } = useLang();
  const t = dict.tools['og-image-preview'];

  const [ogTitle, setOgTitle] = useState('My Awesome Website');
  const [ogDescription, setOgDescription] = useState('Discover the best tools and resources for developers. Build faster, ship smarter.');
  const [ogImage, setOgImage] = useState('https://via.placeholder.com/1200x630/1a1a2e/e2e8f0?text=OG+Image+Preview');
  const [ogUrl, setOgUrl] = useState('https://example.com');
  const [ogSiteName, setOgSiteName] = useState('Example Site');
  const [twitterCard, setTwitterCard] = useState<'summary' | 'summary_large_image'>('summary_large_image');

  const domain = (() => { try { return new URL(ogUrl).hostname; } catch { return 'example.com'; } })();

  const metaTags = [
    `<meta property="og:title" content="${ogTitle}" />`,
    `<meta property="og:description" content="${ogDescription}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:url" content="${ogUrl}" />`,
    `<meta property="og:site_name" content="${ogSiteName}" />`,
    `<meta property="og:type" content="website" />`,
    '',
    `<meta name="twitter:card" content="${twitterCard}" />`,
    `<meta name="twitter:title" content="${ogTitle}" />`,
    `<meta name="twitter:description" content="${ogDescription}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ].join('\n');

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8,
    border: '1px solid var(--border-color)', background: 'var(--bg-input)',
    color: 'var(--text-primary)',
  };
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="og-image-preview">
      {/* Input Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        <div>
          <label style={labelStyle}>og:title</label>
          <input type="text" value={ogTitle} onChange={e => setOgTitle(e.target.value)} placeholder="Page title" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>og:site_name</label>
          <input type="text" value={ogSiteName} onChange={e => setOgSiteName(e.target.value)} placeholder="Site name" style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>og:description</label>
          <textarea value={ogDescription} onChange={e => setOgDescription(e.target.value)} placeholder="Page description" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div>
          <label style={labelStyle}>og:image (URL)</label>
          <input type="url" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://example.com/image.png" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>og:url</label>
          <input type="url" value={ogUrl} onChange={e => setOgUrl(e.target.value)} placeholder="https://example.com" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>twitter:card</label>
          <select value={twitterCard} onChange={e => setTwitterCard(e.target.value as 'summary' | 'summary_large_image')} style={inputStyle}>
            <option value="summary">summary</option>
            <option value="summary_large_image">summary_large_image</option>
          </select>
        </div>
      </div>

      {/* Image Preview */}
      {ogImage && (
        <div style={{ marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', maxWidth: 400 }}>
          <img src={ogImage} alt="OG preview" style={{ width: '100%', display: 'block', maxHeight: 200, objectFit: 'cover' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
      )}

      {/* Preview Cards */}
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: 'var(--text-primary)' }}>Social Previews</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>

        {/* Facebook */}
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #3a3b3c', background: '#242526', fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <div style={{ fontSize: 11, fontWeight: 700, padding: '10px 12px 6px', color: '#b0b3b8', letterSpacing: 0.3 }}>Facebook</div>
          {ogImage && <img src={ogImage} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
          <div style={{ padding: '10px 12px', background: '#3a3b3c' }}>
            <div style={{ fontSize: 11, color: '#b0b3b8', textTransform: 'uppercase', marginBottom: 4 }}>{domain}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e4e6eb', lineHeight: 1.3, marginBottom: 4, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ogTitle || 'Untitled'}</div>
            <div style={{ fontSize: 13, color: '#b0b3b8', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ogDescription}</div>
          </div>
        </div>

        {/* Twitter / X */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #2f3336', background: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 11, fontWeight: 700, padding: '10px 12px 6px', color: '#71767b', letterSpacing: 0.3 }}>Twitter / X</div>
          {twitterCard === 'summary_large_image' ? (
            <>
              {ogImage && <img src={ogImage} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 13, color: '#71767b', marginBottom: 2 }}>{domain}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#e7e9ea', lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ogTitle || 'Untitled'}</div>
                <div style={{ fontSize: 13, color: '#71767b', lineHeight: 1.3, marginTop: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ogDescription}</div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', padding: '0 12px 12px' }}>
              {ogImage && <img src={ogImage} alt="" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
              <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                <div style={{ fontSize: 13, color: '#71767b', marginBottom: 2 }}>{domain}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e7e9ea', lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ogTitle || 'Untitled'}</div>
                <div style={{ fontSize: 13, color: '#71767b', lineHeight: 1.3, marginTop: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ogDescription}</div>
              </div>
            </div>
          )}
        </div>

        {/* LinkedIn */}
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #38434f', background: '#1b1f23', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 11, fontWeight: 700, padding: '10px 12px 6px', color: '#ffffff99', letterSpacing: 0.3 }}>LinkedIn</div>
          {ogImage && <img src={ogImage} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
          <div style={{ padding: '10px 12px', background: '#38434f' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffffe6', lineHeight: 1.3, marginBottom: 4, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ogTitle || 'Untitled'}</div>
            <div style={{ fontSize: 12, color: '#ffffff99', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{domain}</div>
          </div>
        </div>

        {/* Discord */}
        <div style={{ borderRadius: 4, overflow: 'hidden', background: '#2f3136', borderLeft: '4px solid #5865f2', fontFamily: 'gg sans, Noto Sans, Helvetica, Arial, sans-serif' }}>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, padding: '0 0 6px', color: '#b9bbbe', letterSpacing: 0.3 }}>Discord</div>
            <div style={{ fontSize: 12, color: '#00b0f4', fontWeight: 600, marginBottom: 4 }}>{ogSiteName || domain}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#00aff4', lineHeight: 1.3, marginBottom: 4, cursor: 'pointer', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ogTitle || 'Untitled'}</div>
            <div style={{ fontSize: 13, color: '#dcddde', lineHeight: 1.4, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ogDescription}</div>
            {ogImage && <img src={ogImage} alt="" style={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 4, display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
          </div>
        </div>
      </div>

      {/* Generated Meta Tags */}
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>Generated Meta Tags</div>
      <div style={{ position: 'relative' }}>
        <pre style={{
          background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8,
          padding: '16px', fontSize: 13, lineHeight: 1.7, overflowX: 'auto', color: 'var(--text-primary)',
          whiteSpace: 'pre-wrap', wordBreak: 'break-all',
        }}>
          {metaTags}
        </pre>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <CopyButton text={metaTags} />
        </div>
      </div>
    </ToolLayout>
  );
}
