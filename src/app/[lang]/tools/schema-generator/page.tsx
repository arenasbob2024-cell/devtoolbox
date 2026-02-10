'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// ── Types ────────────────────────────────────────────────────────────────

type SchemaType = 'Article' | 'FAQ' | 'HowTo' | 'Product' | 'Organization' | 'LocalBusiness' | 'BreadcrumbList';

interface FaqPair { question: string; answer: string }
interface HowToStep { name: string; text: string }
interface BreadcrumbItem { name: string; url: string }

interface ArticleFields {
  headline: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  publisher: string;
  description: string;
}

interface ProductFields {
  name: string;
  description: string;
  image: string;
  brand: string;
  price: string;
  currency: string;
  availability: string;
}

interface OrganizationFields {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string;
}

interface LocalBusinessFields {
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  openingHours: string;
  latitude: string;
  longitude: string;
}

interface HowToFields {
  name: string;
  description: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────

const defaultArticle: ArticleFields = {
  headline: '', author: '', datePublished: '', dateModified: '',
  image: '', publisher: '', description: '',
};

const defaultProduct: ProductFields = {
  name: '', description: '', image: '', brand: '',
  price: '', currency: 'USD', availability: 'InStock',
};

const defaultOrganization: OrganizationFields = {
  name: '', url: '', logo: '', description: '', sameAs: '',
};

const defaultLocalBusiness: LocalBusinessFields = {
  name: '', streetAddress: '', city: '', state: '',
  postalCode: '', country: '', phone: '', openingHours: '',
  latitude: '', longitude: '',
};

const defaultHowTo: HowToFields = { name: '', description: '' };

const SCHEMA_TYPES: SchemaType[] = [
  'Article', 'FAQ', 'HowTo', 'Product', 'Organization', 'LocalBusiness', 'BreadcrumbList',
];

const AVAILABILITY_OPTIONS = [
  { value: 'InStock', label: 'In Stock' },
  { value: 'OutOfStock', label: 'Out of Stock' },
  { value: 'PreOrder', label: 'Pre-Order' },
  { value: 'Discontinued', label: 'Discontinued' },
];

// ── Validation ───────────────────────────────────────────────────────────

interface ValidationWarning { field: string; message: string }

function validateSchema(
  type: SchemaType,
  article: ArticleFields,
  faqPairs: FaqPair[],
  howTo: HowToFields,
  howToSteps: HowToStep[],
  product: ProductFields,
  org: OrganizationFields,
  local: LocalBusinessFields,
  breadcrumbs: BreadcrumbItem[],
): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  const req = (field: string, value: string, label: string) => {
    if (!value.trim()) warnings.push({ field, message: `${label} is required` });
  };

  switch (type) {
    case 'Article':
      req('headline', article.headline, 'Headline');
      req('author', article.author, 'Author');
      req('datePublished', article.datePublished, 'Date Published');
      req('description', article.description, 'Description');
      break;
    case 'FAQ':
      if (faqPairs.length === 0) {
        warnings.push({ field: 'faq', message: 'At least one Q&A pair is required' });
      }
      faqPairs.forEach((p, i) => {
        if (!p.question.trim()) warnings.push({ field: `faq-q-${i}`, message: `Question ${i + 1} is empty` });
        if (!p.answer.trim()) warnings.push({ field: `faq-a-${i}`, message: `Answer ${i + 1} is empty` });
      });
      break;
    case 'HowTo':
      req('name', howTo.name, 'Name');
      if (howToSteps.length === 0) {
        warnings.push({ field: 'steps', message: 'At least one step is required' });
      }
      howToSteps.forEach((s, i) => {
        if (!s.text.trim()) warnings.push({ field: `step-${i}`, message: `Step ${i + 1} text is empty` });
      });
      break;
    case 'Product':
      req('name', product.name, 'Product Name');
      req('price', product.price, 'Price');
      req('currency', product.currency, 'Currency');
      if (product.price && isNaN(parseFloat(product.price))) {
        warnings.push({ field: 'price', message: 'Price must be a valid number' });
      }
      break;
    case 'Organization':
      req('name', org.name, 'Organization Name');
      req('url', org.url, 'URL');
      break;
    case 'LocalBusiness':
      req('name', local.name, 'Business Name');
      req('streetAddress', local.streetAddress, 'Street Address');
      req('city', local.city, 'City');
      req('country', local.country, 'Country');
      if (local.latitude && isNaN(parseFloat(local.latitude))) {
        warnings.push({ field: 'latitude', message: 'Latitude must be a valid number' });
      }
      if (local.longitude && isNaN(parseFloat(local.longitude))) {
        warnings.push({ field: 'longitude', message: 'Longitude must be a valid number' });
      }
      break;
    case 'BreadcrumbList':
      if (breadcrumbs.length === 0) {
        warnings.push({ field: 'breadcrumbs', message: 'At least one breadcrumb item is required' });
      }
      breadcrumbs.forEach((b, i) => {
        if (!b.name.trim()) warnings.push({ field: `bc-name-${i}`, message: `Item ${i + 1} name is empty` });
        if (!b.url.trim()) warnings.push({ field: `bc-url-${i}`, message: `Item ${i + 1} URL is empty` });
      });
      break;
  }
  return warnings;
}

// ── JSON-LD Builder ──────────────────────────────────────────────────────

function buildJsonLd(
  type: SchemaType,
  article: ArticleFields,
  faqPairs: FaqPair[],
  howTo: HowToFields,
  howToSteps: HowToStep[],
  product: ProductFields,
  org: OrganizationFields,
  local: LocalBusinessFields,
  breadcrumbs: BreadcrumbItem[],
): object {
  const base = { '@context': 'https://schema.org' };

  switch (type) {
    case 'Article': {
      const obj: Record<string, unknown> = { ...base, '@type': 'Article' };
      if (article.headline) obj.headline = article.headline;
      if (article.author) obj.author = { '@type': 'Person', name: article.author };
      if (article.datePublished) obj.datePublished = article.datePublished;
      if (article.dateModified) obj.dateModified = article.dateModified;
      if (article.image) obj.image = article.image;
      if (article.publisher) obj.publisher = { '@type': 'Organization', name: article.publisher };
      if (article.description) obj.description = article.description;
      return obj;
    }
    case 'FAQ': {
      return {
        ...base,
        '@type': 'FAQPage',
        mainEntity: faqPairs
          .filter(p => p.question || p.answer)
          .map(p => ({
            '@type': 'Question',
            name: p.question,
            acceptedAnswer: { '@type': 'Answer', text: p.answer },
          })),
      };
    }
    case 'HowTo': {
      const obj: Record<string, unknown> = { ...base, '@type': 'HowTo' };
      if (howTo.name) obj.name = howTo.name;
      if (howTo.description) obj.description = howTo.description;
      obj.step = howToSteps
        .filter(s => s.name || s.text)
        .map((s, i) => {
          const step: Record<string, unknown> = { '@type': 'HowToStep', position: i + 1 };
          if (s.name) step.name = s.name;
          if (s.text) step.text = s.text;
          return step;
        });
      return obj;
    }
    case 'Product': {
      const obj: Record<string, unknown> = { ...base, '@type': 'Product' };
      if (product.name) obj.name = product.name;
      if (product.description) obj.description = product.description;
      if (product.image) obj.image = product.image;
      if (product.brand) obj.brand = { '@type': 'Brand', name: product.brand };
      if (product.price || product.currency || product.availability) {
        const offers: Record<string, unknown> = { '@type': 'Offer' };
        if (product.price) offers.price = product.price;
        if (product.currency) offers.priceCurrency = product.currency;
        if (product.availability) offers.availability = `https://schema.org/${product.availability}`;
        obj.offers = offers;
      }
      return obj;
    }
    case 'Organization': {
      const obj: Record<string, unknown> = { ...base, '@type': 'Organization' };
      if (org.name) obj.name = org.name;
      if (org.url) obj.url = org.url;
      if (org.logo) obj.logo = org.logo;
      if (org.description) obj.description = org.description;
      if (org.sameAs) {
        const links = org.sameAs.split('\n').map(s => s.trim()).filter(Boolean);
        if (links.length) obj.sameAs = links;
      }
      return obj;
    }
    case 'LocalBusiness': {
      const obj: Record<string, unknown> = { ...base, '@type': 'LocalBusiness' };
      if (local.name) obj.name = local.name;
      if (local.phone) obj.telephone = local.phone;
      if (local.openingHours) obj.openingHours = local.openingHours;
      const hasAddress = local.streetAddress || local.city || local.state || local.postalCode || local.country;
      if (hasAddress) {
        const addr: Record<string, string> = { '@type': 'PostalAddress' };
        if (local.streetAddress) addr.streetAddress = local.streetAddress;
        if (local.city) addr.addressLocality = local.city;
        if (local.state) addr.addressRegion = local.state;
        if (local.postalCode) addr.postalCode = local.postalCode;
        if (local.country) addr.addressCountry = local.country;
        obj.address = addr;
      }
      if (local.latitude && local.longitude) {
        obj.geo = {
          '@type': 'GeoCoordinates',
          latitude: parseFloat(local.latitude) || 0,
          longitude: parseFloat(local.longitude) || 0,
        };
      }
      return obj;
    }
    case 'BreadcrumbList': {
      return {
        ...base,
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs
          .filter(b => b.name || b.url)
          .map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: b.url,
          })),
      };
    }
  }
}

// ── Syntax Highlighting ──────────────────────────────────────────────────

function highlightJson(json: string): React.ReactNode[] {
  const lines = json.split('\n');
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // Match strings
      const strMatch = remaining.match(/^("(?:[^"\\]|\\.)*")/);
      if (strMatch) {
        const str = strMatch[1];
        // Check if it's a key (followed by colon)
        const afterStr = remaining.slice(str.length);
        if (afterStr.match(/^\s*:/)) {
          parts.push(<span key={key++} style={{ color: '#93c5fd' }}>{str}</span>);
        } else {
          parts.push(<span key={key++} style={{ color: '#86efac' }}>{str}</span>);
        }
        remaining = remaining.slice(str.length);
        continue;
      }

      // Match numbers
      const numMatch = remaining.match(/^(-?\d+\.?\d*)/);
      if (numMatch) {
        parts.push(<span key={key++} style={{ color: '#fbbf24' }}>{numMatch[1]}</span>);
        remaining = remaining.slice(numMatch[1].length);
        continue;
      }

      // Match booleans / null
      const boolMatch = remaining.match(/^(true|false|null)/);
      if (boolMatch) {
        parts.push(<span key={key++} style={{ color: '#f472b6' }}>{boolMatch[1]}</span>);
        remaining = remaining.slice(boolMatch[1].length);
        continue;
      }

      // Match braces / brackets / colons / commas
      const punctMatch = remaining.match(/^([{}\[\]:,])/);
      if (punctMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--text-secondary)' }}>{punctMatch[1]}</span>);
        remaining = remaining.slice(1);
        continue;
      }

      // Whitespace or other chars
      parts.push(<span key={key++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    return (
      <div key={i} style={{ minHeight: '1.4em' }}>
        <span style={{ display: 'inline-block', width: 36, textAlign: 'right', marginRight: 12, color: 'var(--text-secondary)', opacity: 0.4, fontSize: 11, userSelect: 'none' }}>{i + 1}</span>
        {parts}
      </div>
    );
  });
}

// ── Styles ───────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
  display: 'block', marginBottom: 4,
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', fontSize: 13, borderRadius: 8,
  border: '1px solid var(--border-color)', background: 'var(--bg-input)',
  color: 'var(--text-primary)', boxSizing: 'border-box',
};

const smallBtnStyle: React.CSSProperties = {
  fontSize: 11, padding: '4px 10px', cursor: 'pointer',
  borderRadius: 6, border: '1px solid var(--border-color)',
  background: 'var(--bg-input)', color: 'var(--text-primary)',
};

const removeBtnStyle: React.CSSProperties = {
  ...smallBtnStyle,
  color: 'var(--accent-rose)',
  border: '1px solid rgba(244, 63, 94, 0.3)',
  background: 'rgba(244, 63, 94, 0.1)',
};

const addBtnStyle: React.CSSProperties = {
  ...smallBtnStyle,
  color: 'var(--accent-blue)',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  background: 'rgba(59, 130, 246, 0.1)',
};

const fieldGroupStyle: React.CSSProperties = {
  marginBottom: 12,
};

const rowStyle: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
};

// ── Component ────────────────────────────────────────────────────────────

export default function SchemaGenerator() {
  const { dict } = useLang();
  const t = dict.tools['schema-generator'] as Record<string, unknown>;

  const [schemaType, setSchemaType] = useState<SchemaType>('Article');
  const [article, setArticle] = useState<ArticleFields>(defaultArticle);
  const [faqPairs, setFaqPairs] = useState<FaqPair[]>([{ question: '', answer: '' }]);
  const [howTo, setHowTo] = useState<HowToFields>(defaultHowTo);
  const [howToSteps, setHowToSteps] = useState<HowToStep[]>([{ name: '', text: '' }]);
  const [product, setProduct] = useState<ProductFields>(defaultProduct);
  const [org, setOrg] = useState<OrganizationFields>(defaultOrganization);
  const [local, setLocal] = useState<LocalBusinessFields>(defaultLocalBusiness);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([{ name: '', url: '' }]);
  const [warnings, setWarnings] = useState<ValidationWarning[]>([]);
  const [showWarnings, setShowWarnings] = useState(false);

  // ── List Helpers ─────────────────────────────────────────────────────

  const addFaqPair = useCallback(() => setFaqPairs(p => [...p, { question: '', answer: '' }]), []);
  const removeFaqPair = useCallback((i: number) => setFaqPairs(p => p.filter((_, idx) => idx !== i)), []);
  const updateFaqPair = useCallback((i: number, field: keyof FaqPair, value: string) => {
    setFaqPairs(p => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  }, []);

  const addStep = useCallback(() => setHowToSteps(s => [...s, { name: '', text: '' }]), []);
  const removeStep = useCallback((i: number) => setHowToSteps(s => s.filter((_, idx) => idx !== i)), []);
  const updateStep = useCallback((i: number, field: keyof HowToStep, value: string) => {
    setHowToSteps(s => s.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  }, []);

  const addBreadcrumb = useCallback(() => setBreadcrumbs(b => [...b, { name: '', url: '' }]), []);
  const removeBreadcrumb = useCallback((i: number) => setBreadcrumbs(b => b.filter((_, idx) => idx !== i)), []);
  const updateBreadcrumb = useCallback((i: number, field: keyof BreadcrumbItem, value: string) => {
    setBreadcrumbs(b => b.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  }, []);

  // ── Build JSON-LD ────────────────────────────────────────────────────

  const jsonLd = useMemo(() => {
    const obj = buildJsonLd(schemaType, article, faqPairs, howTo, howToSteps, product, org, local, breadcrumbs);
    return JSON.stringify(obj, null, 2);
  }, [schemaType, article, faqPairs, howTo, howToSteps, product, org, local, breadcrumbs]);

  const scriptTag = useMemo(() => {
    return `<script type="application/ld+json">\n${jsonLd}\n</script>`;
  }, [jsonLd]);

  // ── Validate ─────────────────────────────────────────────────────────

  const handleValidate = () => {
    const w = validateSchema(schemaType, article, faqPairs, howTo, howToSteps, product, org, local, breadcrumbs);
    setWarnings(w);
    setShowWarnings(true);
  };

  // ── Field updaters ───────────────────────────────────────────────────

  const updateArticle = (field: keyof ArticleFields, value: string) =>
    setArticle(prev => ({ ...prev, [field]: value }));
  const updateProduct = (field: keyof ProductFields, value: string) =>
    setProduct(prev => ({ ...prev, [field]: value }));
  const updateOrg = (field: keyof OrganizationFields, value: string) =>
    setOrg(prev => ({ ...prev, [field]: value }));
  const updateLocal = (field: keyof LocalBusinessFields, value: string) =>
    setLocal(prev => ({ ...prev, [field]: value }));
  const updateHowTo = (field: keyof HowToFields, value: string) =>
    setHowTo(prev => ({ ...prev, [field]: value }));

  // ── Render Form ──────────────────────────────────────────────────────

  const renderForm = () => {
    switch (schemaType) {
      case 'Article':
        return (
          <div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Headline *</label>
              <input style={inputStyle} value={article.headline} onChange={e => updateArticle('headline', e.target.value)} placeholder="Article headline" />
            </div>
            <div style={rowStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Author *</label>
                <input style={inputStyle} value={article.author} onChange={e => updateArticle('author', e.target.value)} placeholder="Author name" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Publisher</label>
                <input style={inputStyle} value={article.publisher} onChange={e => updateArticle('publisher', e.target.value)} placeholder="Publisher / Organization name" />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Date Published *</label>
                <input style={inputStyle} type="date" value={article.datePublished} onChange={e => updateArticle('datePublished', e.target.value)} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Date Modified</label>
                <input style={inputStyle} type="date" value={article.dateModified} onChange={e => updateArticle('dateModified', e.target.value)} />
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Image URL</label>
              <input style={inputStyle} value={article.image} onChange={e => updateArticle('image', e.target.value)} placeholder="https://example.com/image.jpg" />
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Description *</label>
              <textarea style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} value={article.description} onChange={e => updateArticle('description', e.target.value)} placeholder="Brief article description" />
            </div>
          </div>
        );

      case 'FAQ':
        return (
          <div>
            {faqPairs.map((pair, i) => (
              <div key={i} style={{
                padding: 12, marginBottom: 10, borderRadius: 8,
                border: '1px solid var(--border-color)', background: 'var(--bg-input)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Q&A #{i + 1}</span>
                  {faqPairs.length > 1 && (
                    <button style={removeBtnStyle} onClick={() => removeFaqPair(i)}>Remove</button>
                  )}
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Question</label>
                  <input style={inputStyle} value={pair.question} onChange={e => updateFaqPair(i, 'question', e.target.value)} placeholder="Enter question" />
                </div>
                <div style={{ marginBottom: 0 }}>
                  <label style={labelStyle}>Answer</label>
                  <textarea style={{ ...inputStyle, minHeight: 50, resize: 'vertical' }} value={pair.answer} onChange={e => updateFaqPair(i, 'answer', e.target.value)} placeholder="Enter answer" />
                </div>
              </div>
            ))}
            <button style={addBtnStyle} onClick={addFaqPair}>+ Add Q&A Pair</button>
          </div>
        );

      case 'HowTo':
        return (
          <div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Name *</label>
              <input style={inputStyle} value={howTo.name} onChange={e => updateHowTo('name', e.target.value)} placeholder="How-to guide name" />
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: 50, resize: 'vertical' }} value={howTo.description} onChange={e => updateHowTo('description', e.target.value)} placeholder="Brief description of the guide" />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ ...labelStyle, marginBottom: 8 }}>Steps</label>
              {howToSteps.map((step, i) => (
                <div key={i} style={{
                  padding: 12, marginBottom: 10, borderRadius: 8,
                  border: '1px solid var(--border-color)', background: 'var(--bg-input)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Step #{i + 1}</span>
                    {howToSteps.length > 1 && (
                      <button style={removeBtnStyle} onClick={() => removeStep(i)}>Remove</button>
                    )}
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Step Name</label>
                    <input style={inputStyle} value={step.name} onChange={e => updateStep(i, 'name', e.target.value)} placeholder="Step title (optional)" />
                  </div>
                  <div style={{ marginBottom: 0 }}>
                    <label style={labelStyle}>Step Text *</label>
                    <input style={inputStyle} value={step.text} onChange={e => updateStep(i, 'text', e.target.value)} placeholder="Describe this step" />
                  </div>
                </div>
              ))}
              <button style={addBtnStyle} onClick={addStep}>+ Add Step</button>
            </div>
          </div>
        );

      case 'Product':
        return (
          <div>
            <div style={rowStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Product Name *</label>
                <input style={inputStyle} value={product.name} onChange={e => updateProduct('name', e.target.value)} placeholder="Product name" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Brand</label>
                <input style={inputStyle} value={product.brand} onChange={e => updateProduct('brand', e.target.value)} placeholder="Brand name" />
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: 50, resize: 'vertical' }} value={product.description} onChange={e => updateProduct('description', e.target.value)} placeholder="Product description" />
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Image URL</label>
              <input style={inputStyle} value={product.image} onChange={e => updateProduct('image', e.target.value)} placeholder="https://example.com/product.jpg" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Price *</label>
                <input style={inputStyle} value={product.price} onChange={e => updateProduct('price', e.target.value)} placeholder="29.99" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Currency *</label>
                <input style={inputStyle} value={product.currency} onChange={e => updateProduct('currency', e.target.value)} placeholder="USD" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Availability</label>
                <select style={inputStyle} value={product.availability} onChange={e => updateProduct('availability', e.target.value)}>
                  {AVAILABILITY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 'Organization':
        return (
          <div>
            <div style={rowStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Organization Name *</label>
                <input style={inputStyle} value={org.name} onChange={e => updateOrg('name', e.target.value)} placeholder="Organization name" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>URL *</label>
                <input style={inputStyle} value={org.url} onChange={e => updateOrg('url', e.target.value)} placeholder="https://example.com" />
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Logo URL</label>
              <input style={inputStyle} value={org.logo} onChange={e => updateOrg('logo', e.target.value)} placeholder="https://example.com/logo.png" />
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: 50, resize: 'vertical' }} value={org.description} onChange={e => updateOrg('description', e.target.value)} placeholder="Organization description" />
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Social Links (one per line)</label>
              <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} value={org.sameAs} onChange={e => updateOrg('sameAs', e.target.value)} placeholder={"https://twitter.com/example\nhttps://facebook.com/example\nhttps://linkedin.com/in/example"} />
            </div>
          </div>
        );

      case 'LocalBusiness':
        return (
          <div>
            <div style={rowStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Business Name *</label>
                <input style={inputStyle} value={local.name} onChange={e => updateLocal('name', e.target.value)} placeholder="Business name" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={local.phone} onChange={e => updateLocal('phone', e.target.value)} placeholder="+1-555-555-5555" />
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Street Address *</label>
              <input style={inputStyle} value={local.streetAddress} onChange={e => updateLocal('streetAddress', e.target.value)} placeholder="123 Main St" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>City *</label>
                <input style={inputStyle} value={local.city} onChange={e => updateLocal('city', e.target.value)} placeholder="City" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>State</label>
                <input style={inputStyle} value={local.state} onChange={e => updateLocal('state', e.target.value)} placeholder="State" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Postal Code</label>
                <input style={inputStyle} value={local.postalCode} onChange={e => updateLocal('postalCode', e.target.value)} placeholder="12345" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Country *</label>
                <input style={inputStyle} value={local.country} onChange={e => updateLocal('country', e.target.value)} placeholder="US" />
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Opening Hours</label>
              <input style={inputStyle} value={local.openingHours} onChange={e => updateLocal('openingHours', e.target.value)} placeholder="Mo-Fr 09:00-17:00" />
            </div>
            <div style={rowStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Latitude</label>
                <input style={inputStyle} value={local.latitude} onChange={e => updateLocal('latitude', e.target.value)} placeholder="40.7128" />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Longitude</label>
                <input style={inputStyle} value={local.longitude} onChange={e => updateLocal('longitude', e.target.value)} placeholder="-74.0060" />
              </div>
            </div>
          </div>
        );

      case 'BreadcrumbList':
        return (
          <div>
            {breadcrumbs.map((item, i) => (
              <div key={i} style={{
                padding: 12, marginBottom: 10, borderRadius: 8,
                border: '1px solid var(--border-color)', background: 'var(--bg-input)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Item #{i + 1}</span>
                  {breadcrumbs.length > 1 && (
                    <button style={removeBtnStyle} onClick={() => removeBreadcrumb(i)}>Remove</button>
                  )}
                </div>
                <div style={rowStyle}>
                  <div style={{ marginBottom: 0 }}>
                    <label style={labelStyle}>Name</label>
                    <input style={inputStyle} value={item.name} onChange={e => updateBreadcrumb(i, 'name', e.target.value)} placeholder="Page name" />
                  </div>
                  <div style={{ marginBottom: 0 }}>
                    <label style={labelStyle}>URL</label>
                    <input style={inputStyle} value={item.url} onChange={e => updateBreadcrumb(i, 'url', e.target.value)} placeholder="https://example.com/page" />
                  </div>
                </div>
              </div>
            ))}
            <button style={addBtnStyle} onClick={addBreadcrumb}>+ Add Breadcrumb Item</button>
          </div>
        );
    }
  };

  // ── Main Render ──────────────────────────────────────────────────────

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'Schema Markup Generator'}
      description={(t.pageDescription as string) || 'Generate JSON-LD structured data for SEO'}
      toolId="schema-generator"
    >
      {/* Schema Type Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, flexWrap: 'wrap', borderBottom: '2px solid var(--border-color)' }}>
        {SCHEMA_TYPES.map(type => (
          <button
            key={type}
            onClick={() => { setSchemaType(type); setShowWarnings(false); setWarnings([]); }}
            style={{
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: schemaType === type ? 700 : 500,
              color: schemaType === type ? 'var(--accent-blue)' : 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              borderBottom: schemaType === type ? '2px solid var(--accent-blue)' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: -2,
              transition: 'color 0.15s, border-color 0.15s',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Two-column: Form + Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left: Form */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{schemaType} Fields</h3>
          </div>
          {renderForm()}

          {/* Validate button */}
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button
              onClick={handleValidate}
              className="btn btn-secondary"
              style={{ fontSize: 13 }}
            >
              Validate
            </button>
          </div>

          {/* Validation Results */}
          {showWarnings && (
            <div style={{ marginTop: 12 }}>
              {warnings.length === 0 ? (
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: 8, padding: '10px 14px', fontSize: 13,
                  color: '#4ade80',
                }}>
                  All required fields are valid. Your schema markup is ready to use.
                </div>
              ) : (
                <div style={{
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  borderRadius: 8, padding: '10px 14px', fontSize: 13,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--accent-rose)' }}>
                    {warnings.length} warning{warnings.length > 1 ? 's' : ''} found:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--accent-rose)' }}>
                    {warnings.map((w, i) => (
                      <li key={i} style={{ marginBottom: 2 }}>{w.message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>JSON-LD Output</h3>
            <CopyButton text={scriptTag} label="Copy" />
          </div>
          <div style={{
            background: '#0d1117',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            padding: '16px 12px',
            fontFamily: 'monospace',
            fontSize: 12,
            lineHeight: 1.5,
            overflowX: 'auto',
            maxHeight: 520,
            overflowY: 'auto',
            color: '#e6edf3',
          }}>
            {/* Script tag wrapper */}
            <div style={{ minHeight: '1.4em' }}>
              <span style={{ display: 'inline-block', width: 36, textAlign: 'right', marginRight: 12, color: 'var(--text-secondary)', opacity: 0.4, fontSize: 11, userSelect: 'none' }}>&nbsp;</span>
              <span style={{ color: 'var(--text-secondary)' }}>&lt;script type=&quot;application/ld+json&quot;&gt;</span>
            </div>
            {highlightJson(jsonLd)}
            <div style={{ minHeight: '1.4em' }}>
              <span style={{ display: 'inline-block', width: 36, textAlign: 'right', marginRight: 12, color: 'var(--text-secondary)', opacity: 0.4, fontSize: 11, userSelect: 'none' }}>&nbsp;</span>
              <span style={{ color: 'var(--text-secondary)' }}>&lt;/script&gt;</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      {(t.seoTitle || t.seoContent) ? (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          {t.seoTitle ? (
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
          ) : null}
          {t.seoContent ? (
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {t.seoContent as string}
            </p>
          ) : null}
        </div>
      ) : null}
    </ToolLayout>
  );
}
