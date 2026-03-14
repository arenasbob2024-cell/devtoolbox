'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function XmlValidator() {
  const { dict } = useLang();
  const t = dict.tools['xml-validator'];
  const [xmlInput, setXmlInput] = useState('');
  const [validationResult, setValidationResult] = useState('');
  const [error, setError] = useState('');
  const [prettyPrinted, setPrettyPrinted] = useState('');
  const [isPrettyPrintMode, setIsPrettyPrintMode] = useState(false);

  const validateXml = () => {
    setError('');
    setValidationResult('');
    setPrettyPrinted('');

    if (!xmlInput.trim()) {
      setError('XML input is required');
      return;
    }

    try {
      // Basic XML validation - check if it can be parsed
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, 'text/xml');

      // Check for parsing errors
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        const errorElement = xmlDoc.getElementsByTagName('parsererror')[0];
        const errorText = errorElement.textContent || 'Unknown parse error';
        setError(`Parse Error: ${errorText}`);
        return;
      }

      // Validate structure
      const errors: string[] = [];

      // Check root element exists
      if (!xmlDoc.documentElement) {
        errors.push('No root element found');
      }

      // Check for unmatched tags (simple heuristic)
      const openTags = xmlInput.match(/<[^/][^>]*>/g) || [];
      const closeTags = xmlInput.match(/<\/[^>]+>/g) || [];
      const openCount = openTags.filter((tag) => !tag.includes('/>')).length;
      const closeCount = closeTags.length;

      if (openCount !== closeCount) {
        errors.push(`Unmatched tags: ${openCount} opening, ${closeCount} closing`);
      }

      // Check for duplicate attributes
      const attrRegex = /\s+([a-zA-Z_:][a-zA-Z0-9_:.-]*)\s*=/g;
      const tags = xmlInput.match(/<[^>]+>/g) || [];
      tags.forEach((tag, idx) => {
        const attrs = new Set<string>();
        let match;
        const regex = new RegExp(attrRegex);
        while ((match = regex.exec(tag)) !== null) {
          if (attrs.has(match[1])) {
            errors.push(`Duplicate attribute '${match[1]}' in tag ${idx + 1}`);
          }
          attrs.add(match[1]);
        }
      });

      if (errors.length === 0) {
        setValidationResult('✓ Valid - XML is well-formed and syntactically correct!');
      } else {
        setValidationResult(`✕ Found ${errors.length} issue(s):\n\n${errors.map((e, i) => `${i + 1}. ${e}`).join('\n')}`);
      }

      // Generate pretty-printed version
      if (xmlDoc.documentElement) {
        const pretty = formatXml(xmlInput);
        setPrettyPrinted(pretty);
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Validation error';
      setError(`Error: ${errorMsg}`);
    }
  };

  const formatXml = (xml: string): string => {
    let formatted = '';
    let indent = 0;
    const lines = xml.split(/>\s*</);

    lines.forEach((line, index) => {
      let node = line;

      if (index > 0) {
        node = '<' + node;
      }
      if (index < lines.length - 1) {
        node = node + '>';
      }

      // Count opening vs closing tags
      const opens = (node.match(/<[^/].*?>/g) || []).length;
      const closes = (node.match(/<\/.*?>/g) || []).length;
      const selfClose = node.match(/\/>/g) ? 1 : 0;

      if (closes > opens) {
        indent = Math.max(0, indent - 1);
      }

      formatted += '  '.repeat(indent) + node + '\n';

      if (opens > closes && !selfClose) {
        indent++;
      }
    });

    return formatted.trim();
  };

  const loadSample = () => {
    const sample = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <person>
    <name>John Doe</name>
    <email>john@example.com</email>
    <age>30</age>
  </person>
  <person>
    <name>Jane Smith</name>
    <email>jane@example.com</email>
    <age>28</age>
  </person>
</root>`;
    setXmlInput(sample);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="xml-validator"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={validateXml} className="btn btn-primary">
          Validate
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {dict.common.loadSample}
        </button>
        <button
          onClick={() => {
            setXmlInput('');
            setValidationResult('');
            setPrettyPrinted('');
            setError('');
          }}
          className="btn btn-secondary"
        >
          {dict.common.clear}
        </button>
        <button
          onClick={() => setIsPrettyPrintMode(!isPrettyPrintMode)}
          className="btn btn-secondary"
          style={{ opacity: prettyPrinted ? 1 : 0.5 }}
        >
          {isPrettyPrintMode ? 'Raw' : 'Pretty Print'}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: 'var(--accent-rose)',
          }}
        >
          ✕ {error}
        </div>
      )}

      {validationResult && (
        <div
          style={{
            background: validationResult.startsWith('✓') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.1)',
            border: validationResult.startsWith('✓') ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 8,
            padding: '12px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: validationResult.startsWith('✓') ? 'var(--accent-green)' : 'var(--accent-rose)',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            wordBreak: 'break-word',
          }}
        >
          {validationResult}
          <CopyButton text={validationResult} />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            XML Input
          </label>
          <textarea
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            placeholder="Paste XML here..."
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            {isPrettyPrintMode ? 'Pretty Printed' : 'Validation Details'}
          </label>
          <textarea
            value={isPrettyPrintMode ? prettyPrinted : validationResult}
            readOnly
            style={{ minHeight: 350, background: 'var(--bg-secondary)', fontFamily: 'monospace', fontSize: 12 }}
          />
          {(isPrettyPrintMode ? prettyPrinted : validationResult) && (
            <CopyButton text={isPrettyPrintMode ? prettyPrinted : validationResult} />
          )}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          {t.seoTitle || 'XML Validator and Formatter'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent ||
            'Validate XML syntax, check for well-formedness, and detect structural errors. Pretty-print your XML with proper indentation for better readability.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
          Features
        </h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>XML syntax validation</li>
          <li>Well-formedness checking</li>
          <li>Unmatched tag detection</li>
          <li>Duplicate attribute detection</li>
          <li>Detailed error messages with line information</li>
          <li>Pretty-print with automatic indentation</li>
          <li>No external dependencies required</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
