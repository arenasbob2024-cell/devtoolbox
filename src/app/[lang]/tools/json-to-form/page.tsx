'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToForm() {
  const { dict } = useLang();
  const t = dict.tools['json-to-form'] as Record<string, unknown>;
  const common = dict.common;

  const [jsonInput, setJsonInput] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [includeCSS, setIncludeCSS] = useState(true);
  const [useBootstrap, setUseBootstrap] = useState(false);
  const [addValidation, setAddValidation] = useState(true);
  const [formAction, setFormAction] = useState('');
  const [formMethod, setFormMethod] = useState('POST');
  const [error, setError] = useState('');
  const [livePreview, setLivePreview] = useState('');

  const isEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  const isUrl = (str: string) => /^https?:\/\/[^\s]+$/.test(str);
  const isDate = (str: string) => /^\d{4}-\d{2}-\d{2}$/.test(str);

  const detectInputType = (key: string, value: any): string => {
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string') {
      if (isEmail(value)) return 'email';
      if (isUrl(value)) return 'url';
      if (isDate(value)) return 'date';
      if (value.length > 50 || value.includes('\n')) return 'textarea';
      return 'text';
    }
    if (Array.isArray(value) && value.every(v => typeof v === 'string')) return 'select';
    return 'text';
  };

  const generateForm = () => {
    setError('');
    setGeneratedHtml('');
    setLivePreview('');

    if (!jsonInput.trim()) {
      setError('JSON input is required');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);

      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        setError('JSON must be an object');
        return;
      }

      let html = '';
      let cssString = '';

      if (includeCSS) {
        cssString = `<style>
form { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; }
.form-group { margin-bottom: 20px; }
label { display: block; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
input[type="text"], input[type="email"], input[type="url"], input[type="number"], input[type="date"], textarea, select {
  width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; font-family: inherit;
  box-sizing: border-box; transition: border-color 0.2s;
}
input[type="text"]:focus, input[type="email"]:focus, input[type="url"]:focus, input[type="number"]:focus, input[type="date"]:focus, textarea:focus, select:focus {
  outline: none; border-color: #0066cc; box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}
textarea { resize: vertical; min-height: 100px; }
input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; margin-right: 8px; }
.checkbox-group { display: flex; align-items: center; }
button { padding: 10px 20px; background: #0066cc; color: white; border: none; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 14px; }
button:hover { background: #0052a3; }
</style>`;
      }

      html = `${cssString}<form${useBootstrap ? ' class="form"' : ''}${formAction ? ` action="${formAction}"` : ''}${formMethod ? ` method="${formMethod}"` : ''}>`;

      for (const [key, value] of Object.entries(parsed)) {
        const inputType = detectInputType(key, value);
        const fieldName = key.replace(/\s+/g, '_').toLowerCase();
        const isRequired = addValidation ? ' required' : '';

        if (inputType === 'checkbox') {
          html += `<div class="${useBootstrap ? 'form-check' : 'form-group'}">
<div class="checkbox-group">
<input type="checkbox" id="${fieldName}" name="${fieldName}" value="true"${isRequired}${useBootstrap ? ' class="form-check-input"' : ''} />
<label for="${fieldName}"${useBootstrap ? ' class="form-check-label"' : ''}>${key}</label>
</div>
</div>`;
        } else if (inputType === 'select') {
          const options = Array.isArray(value)
            ? value.map((v) => `<option value="${v}">${v}</option>`).join('\n')
            : '';
          html += `<div class="${useBootstrap ? 'mb-3' : 'form-group'}">
<label for="${fieldName}"${useBootstrap ? ' class="form-label"' : ''}>${key}</label>
<select id="${fieldName}" name="${fieldName}"${isRequired}${useBootstrap ? ' class="form-select"' : ''}>${options}</select>
</div>`;
        } else if (inputType === 'textarea') {
          const displayValue = typeof value === 'string' ? value : '';
          html += `<div class="${useBootstrap ? 'mb-3' : 'form-group'}">
<label for="${fieldName}"${useBootstrap ? ' class="form-label"' : ''}>${key}</label>
<textarea id="${fieldName}" name="${fieldName}" placeholder="${key}"${isRequired}${useBootstrap ? ' class="form-control"' : ''}>${displayValue}</textarea>
</div>`;
        } else {
          const displayValue = typeof value === 'string' ? value : String(value);
          html += `<div class="${useBootstrap ? 'mb-3' : 'form-group'}">
<label for="${fieldName}"${useBootstrap ? ' class="form-label"' : ''}>${key}</label>
<input type="${inputType}" id="${fieldName}" name="${fieldName}" placeholder="${key}" value="${displayValue}"${isRequired}${useBootstrap ? ' class="form-control"' : ''} />
</div>`;
        }
      }

      html += `<button type="submit">Submit</button>\n</form>`;

      setGeneratedHtml(html);
      setLivePreview(html);
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Parse error';
      setError(`Invalid JSON: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sampleJson = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      website: 'https://example.com',
      birthDate: '1990-05-15',
      message: 'Tell us about your experience...\nYou can write multiple lines here.',
      subscribe: false,
      country: ['United States', 'Canada', 'Mexico'],
      age: 30,
    };
    setJsonInput(JSON.stringify(sampleJson, null, 2));
  };

  const clearAll = () => {
    setJsonInput('');
    setGeneratedHtml('');
    setLivePreview('');
    setError('');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-to-form"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={generateForm} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={clearAll} className="btn btn-secondary">{common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            id="include-css"
            checked={includeCSS}
            onChange={(e) => setIncludeCSS(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor="include-css" style={{ fontSize: 13, cursor: 'pointer', margin: 0 }}>
            {t.includeCSSLabel}
          </label>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            id="use-bootstrap"
            checked={useBootstrap}
            onChange={(e) => setUseBootstrap(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor="use-bootstrap" style={{ fontSize: 13, cursor: 'pointer', margin: 0 }}>
            {t.useBootstrapLabel}
          </label>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            id="add-validation"
            checked={addValidation}
            onChange={(e) => setAddValidation(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor="add-validation" style={{ fontSize: 13, cursor: 'pointer', margin: 0 }}>
            {t.addValidationLabel}
          </label>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={formMethod}
            onChange={(e) => setFormMethod(e.target.value)}
            style={{ padding: '6px 10px', fontSize: 13, flex: 1 }}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
          {t.formActionLabel}
        </label>
        <input
          type="text"
          value={formAction}
          onChange={(e) => setFormAction(e.target.value)}
          placeholder={t.formActionPlaceholder}
          style={{ width: '100%' }}
        />
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
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.jsonInputLabel}</label>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={t.jsonInputPlaceholder}
            style={{ minHeight: 350 }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.htmlOutputLabel}</label>
          </div>
          <textarea
            value={generatedHtml}
            readOnly
            placeholder={t.htmlOutputPlaceholder}
            style={{ minHeight: 350, background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
          {generatedHtml && (
            <div style={{ marginTop: 8 }}>
              <CopyButton text={generatedHtml} />
            </div>
          )}
        </div>
      </div>

      {livePreview && (
        <div style={{
          marginBottom: 20,
          padding: 16,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          marginTop: 20,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.livePreviewLabel}</h3>
          <div dangerouslySetInnerHTML={{ __html: livePreview }} />
        </div>
      )}

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
