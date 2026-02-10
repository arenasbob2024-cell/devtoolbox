'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function getCharCountColor(len: number, min: number, max: number): string {
  if (len === 0) return 'var(--text-secondary)';
  if (len >= min && len <= max) return 'var(--accent-emerald)';
  if (len > max) return 'var(--accent-rose)';
  return 'var(--accent-orange)';
}

export default function MetaTagGenerator() {
  const { dict } = useLang();
  const t = dict.tools['meta-tag-generator'] as Record<string, unknown>;

  // Basic Meta
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');

  // Open Graph
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [ogUrl, setOgUrl] = useState('');
  const [ogType, setOgType] = useState('website');
  const [ogSiteName, setOgSiteName] = useState('');

  // Twitter Card
  const [twitterCard, setTwitterCard] = useState('summary_large_image');
  const [twitterTitle, setTwitterTitle] = useState('');
  const [twitterDescription, setTwitterDescription] = useState('');
  const [twitterImage, setTwitterImage] = useState('');

  const generatedHtml = useMemo(() => {
    const lines: string[] = [];

    if (title) lines.push(`<title>${title}</title>`);
    if (title) lines.push(`<meta name="title" content="${title}" />`);
    if (description) lines.push(`<meta name="description" content="${description}" />`);
    if (keywords) lines.push(`<meta name="keywords" content="${keywords}" />`);
    if (author) lines.push(`<meta name="author" content="${author}" />`);
    if (canonicalUrl) lines.push(`<link rel="canonical" href="${canonicalUrl}" />`);

    // Open Graph
    const hasOg = ogTitle || ogDescription || ogImage || ogImageUrl || ogUrl || canonicalUrl || ogSiteName || title || description;
    if (hasOg) {
      lines.push('');
      lines.push('<!-- Open Graph / Facebook -->');
      lines.push(`<meta property="og:type" content="${ogType}" />`);
      if (ogTitle || title) lines.push(`<meta property="og:title" content="${ogTitle || title}" />`);
      if (ogDescription || description) lines.push(`<meta property="og:description" content="${ogDescription || description}" />`);
      if (ogImage || ogImageUrl) lines.push(`<meta property="og:image" content="${ogImage || ogImageUrl}" />`);
      if (ogUrl || canonicalUrl) lines.push(`<meta property="og:url" content="${ogUrl || canonicalUrl}" />`);
      if (ogSiteName) lines.push(`<meta property="og:site_name" content="${ogSiteName}" />`);
    }

    // Twitter Card
    const hasTwitter = twitterTitle || twitterDescription || twitterImage || ogImage || ogImageUrl || title || description;
    if (hasTwitter) {
      lines.push('');
      lines.push('<!-- Twitter -->');
      lines.push(`<meta property="twitter:card" content="${twitterCard}" />`);
      if (twitterTitle || ogTitle || title) lines.push(`<meta property="twitter:title" content="${twitterTitle || ogTitle || title}" />`);
      if (twitterDescription || ogDescription || description) lines.push(`<meta property="twitter:description" content="${twitterDescription || ogDescription || description}" />`);
      if (twitterImage || ogImage || ogImageUrl) lines.push(`<meta property="twitter:image" content="${twitterImage || ogImage || ogImageUrl}" />`);
      if (ogUrl || canonicalUrl) lines.push(`<meta property="twitter:url" content="${ogUrl || canonicalUrl}" />`);
    }

    return lines.join('\n');
  }, [title, description, keywords, author, canonicalUrl, ogImageUrl, ogTitle, ogDescription, ogImage, ogUrl, ogType, ogSiteName, twitterCard, twitterTitle, twitterDescription, twitterImage]);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    fontSize: 13,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 4,
    display: 'block',
    color: 'var(--text-primary)',
  };

  const hintStyle: React.CSSProperties = {
    fontSize: 11,
    color: 'var(--text-secondary)',
    marginTop: 2,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 14,
    paddingBottom: 8,
    borderBottom: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  };

  const fieldGroupStyle: React.CSSProperties = {
    marginBottom: 14,
  };

  const CharCount = ({ len, min, max }: { len: number; min: number; max: number }) => (
    <span style={{
      fontSize: 11,
      fontWeight: 700,
      color: getCharCountColor(len, min, max),
      marginLeft: 8,
    }}>
      {len}/{max}
    </span>
  );

  // Preview values with fallbacks
  const previewTitle = title || 'Your Page Title';
  const previewDescription = description || 'Your page description will appear here. Write a compelling description to improve click-through rates from search results.';
  const previewUrl = canonicalUrl || 'https://example.com/page';
  const previewOgTitle = ogTitle || title || 'Page Title';
  const previewOgDescription = ogDescription || description || 'Page description for social sharing.';
  const previewOgImage = ogImage || ogImageUrl || '';

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'Meta Tag Generator'}
      description={(t.pageDescription as string) || 'Generate meta tags for SEO and social media sharing'}
      toolId="meta-tag-generator"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Basic Meta Tags Section */}
        <div>
          <h3 style={sectionTitleStyle}>Basic Meta Tags</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ ...fieldGroupStyle, gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={labelStyle}>
                  Page Title
                  <CharCount len={title.length} min={50} max={60} />
                </label>
              </div>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="My Awesome Website - Best Tools for Developers"
                style={inputStyle}
              />
              <div style={hintStyle}>Recommended: 50-60 characters</div>
            </div>

            <div style={{ ...fieldGroupStyle, gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={labelStyle}>
                  Meta Description
                  <CharCount len={description.length} min={150} max={160} />
                </label>
              </div>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="A comprehensive collection of developer tools to boost your productivity. Free online utilities for encoding, formatting, and more."
                style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }}
              />
              <div style={hintStyle}>Recommended: 150-160 characters</div>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Keywords</label>
              <input
                type="text"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="developer tools, online utilities, free tools"
                style={inputStyle}
              />
              <div style={hintStyle}>Comma-separated keywords</div>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Author</label>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="John Doe"
                style={inputStyle}
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Canonical URL</label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={e => setCanonicalUrl(e.target.value)}
                placeholder="https://example.com/page"
                style={inputStyle}
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>OG Image URL</label>
              <input
                type="text"
                value={ogImageUrl}
                onChange={e => setOgImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                style={inputStyle}
              />
              <div style={hintStyle}>Recommended: 1200x630px</div>
            </div>
          </div>
        </div>

        {/* Open Graph Section */}
        <div>
          <h3 style={sectionTitleStyle}>Open Graph (Facebook, LinkedIn, etc.)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>
                og:title
                <CharCount len={(ogTitle || title).length} min={30} max={60} />
              </label>
              <input
                type="text"
                value={ogTitle}
                onChange={e => setOgTitle(e.target.value)}
                placeholder={title || 'Falls back to Page Title'}
                style={inputStyle}
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>og:type</label>
              <select
                value={ogType}
                onChange={e => setOgType(e.target.value)}
                style={inputStyle}
              >
                <option value="website">website</option>
                <option value="article">article</option>
                <option value="product">product</option>
                <option value="profile">profile</option>
                <option value="video.other">video</option>
                <option value="music.song">music</option>
                <option value="book">book</option>
              </select>
            </div>

            <div style={{ ...fieldGroupStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                og:description
                <CharCount len={(ogDescription || description).length} min={50} max={160} />
              </label>
              <textarea
                value={ogDescription}
                onChange={e => setOgDescription(e.target.value)}
                placeholder={description || 'Falls back to Meta Description'}
                style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }}
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>og:image</label>
              <input
                type="text"
                value={ogImage}
                onChange={e => setOgImage(e.target.value)}
                placeholder={ogImageUrl || 'Falls back to OG Image URL'}
                style={inputStyle}
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>og:url</label>
              <input
                type="text"
                value={ogUrl}
                onChange={e => setOgUrl(e.target.value)}
                placeholder={canonicalUrl || 'Falls back to Canonical URL'}
                style={inputStyle}
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>og:site_name</label>
              <input
                type="text"
                value={ogSiteName}
                onChange={e => setOgSiteName(e.target.value)}
                placeholder="My Website"
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Twitter Card Section */}
        <div>
          <h3 style={sectionTitleStyle}>Twitter Card</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Card Type</label>
              <select
                value={twitterCard}
                onChange={e => setTwitterCard(e.target.value)}
                style={inputStyle}
              >
                <option value="summary">summary</option>
                <option value="summary_large_image">summary_large_image</option>
              </select>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>
                twitter:title
                <CharCount len={(twitterTitle || ogTitle || title).length} min={30} max={70} />
              </label>
              <input
                type="text"
                value={twitterTitle}
                onChange={e => setTwitterTitle(e.target.value)}
                placeholder={ogTitle || title || 'Falls back to og:title or Page Title'}
                style={inputStyle}
              />
            </div>

            <div style={{ ...fieldGroupStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                twitter:description
                <CharCount len={(twitterDescription || ogDescription || description).length} min={50} max={200} />
              </label>
              <textarea
                value={twitterDescription}
                onChange={e => setTwitterDescription(e.target.value)}
                placeholder={ogDescription || description || 'Falls back to og:description or Meta Description'}
                style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }}
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>twitter:image</label>
              <input
                type="text"
                value={twitterImage}
                onChange={e => setTwitterImage(e.target.value)}
                placeholder={ogImage || ogImageUrl || 'Falls back to og:image'}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Live Previews */}
        <div>
          <h3 style={sectionTitleStyle}>Live Preview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* Google Search Preview */}
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 10,
              padding: 20,
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Google Search Preview
              </div>
              <div style={{
                background: '#fff',
                borderRadius: 8,
                padding: 16,
                fontFamily: 'Arial, sans-serif',
              }}>
                <div style={{ fontSize: 12, color: '#202124', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#f1f3f4',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    color: '#70757a',
                  }}>
                    W
                  </span>
                  <span style={{ color: '#202124', fontSize: 12 }}>
                    {previewUrl.replace(/^https?:\/\//, '').split('/')[0]}
                  </span>
                </div>
                <div style={{
                  fontSize: 18,
                  color: '#1a0dab',
                  lineHeight: 1.3,
                  marginBottom: 4,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {previewTitle}
                </div>
                <div style={{
                  fontSize: 13,
                  color: '#4d5156',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {previewDescription}
                </div>
              </div>
            </div>

            {/* Social Media Preview */}
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 10,
              padding: 20,
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Social Media Preview
              </div>
              <div style={{
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid #dadce0',
                background: '#fff',
              }}>
                {/* Image placeholder */}
                <div style={{
                  height: 140,
                  background: previewOgImage ? `url(${previewOgImage}) center/cover no-repeat` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                }}>
                  {!previewOgImage && '1200 x 630'}
                </div>
                <div style={{ padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, color: '#65676b', textTransform: 'uppercase', marginBottom: 2 }}>
                    {(ogUrl || canonicalUrl || 'example.com').replace(/^https?:\/\//, '').split('/')[0]}
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#1c1e21',
                    lineHeight: 1.3,
                    marginBottom: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {previewOgTitle}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: '#65676b',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {previewOgDescription}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated HTML Output */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ ...sectionTitleStyle, marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
              Generated HTML
            </h3>
            {generatedHtml && <CopyButton text={generatedHtml} label="Copy HTML" />}
          </div>
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 10,
            padding: 16,
            border: '1px solid var(--border-color)',
            maxHeight: 400,
            overflow: 'auto',
          }}>
            <pre style={{
              fontSize: 12,
              fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
              lineHeight: 1.7,
              color: 'var(--text-primary)',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}>
              {generatedHtml || '<!-- Enter your page details above to generate meta tags -->'}
            </pre>
          </div>
        </div>

      </div>

      {/* SEO Content Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{(t.seoTitle as string) || 'About Meta Tag Generator'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {(t.seoContent as string) || 'Meta tags are snippets of text that describe a page\'s content. They don\'t appear on the page itself, but in the page\'s source code. Meta tags are essentially little content descriptors that help tell search engines what a web page is about. The most important meta tags for SEO are the title tag and meta description. Open Graph tags control how your content appears when shared on Facebook and LinkedIn, while Twitter Card tags do the same for Twitter. Using proper meta tags helps improve your search engine rankings and click-through rates from search results and social media platforms.'}
        </p>
      </div>
    </ToolLayout>
  );
}
