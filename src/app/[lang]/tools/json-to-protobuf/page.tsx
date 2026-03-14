'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToProtobuf() {
  const { dict } = useLang();
  const t = dict.tools['json-to-protobuf'];
  const [jsonInput, setJsonInput] = useState('');
  const [protoOutput, setProtoOutput] = useState('');
  const [error, setError] = useState('');
  const [messageName, setMessageName] = useState('Message');

  const inferType = (value: any): string => {
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'bool';
    if (typeof value === 'number') {
      return Number.isInteger(value) ? 'int32' : 'double';
    }
    if (Array.isArray(value)) return 'repeated';
    if (typeof value === 'object' && value !== null) return 'object';
    return 'string';
  };

  const generateProto = (obj: any, name: string = messageName, indent = 0): string => {
    const spaces = '  '.repeat(indent);
    let proto = `${spaces}message ${name} {\n`;
    let fieldNumber = 1;

    for (const [key, value] of Object.entries(obj)) {
      const protoKey = key.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
      const type = inferType(value);

      if (type === 'repeated' && Array.isArray(value) && value.length > 0) {
        const itemType = inferType(value[0]);
        if (itemType === 'object') {
          proto += `${spaces}  repeated ${protoKey}_item ${protoKey} = ${fieldNumber};\n`;
        } else {
          proto += `${spaces}  repeated ${itemType} ${protoKey} = ${fieldNumber};\n`;
        }
      } else if (type === 'object') {
        proto += generateProto(value, toPascalCase(protoKey), indent + 1);
        proto += `${spaces}  ${toPascalCase(protoKey)} ${protoKey} = ${fieldNumber};\n`;
      } else {
        proto += `${spaces}  ${type} ${protoKey} = ${fieldNumber};\n`;
      }
      fieldNumber++;
    }

    proto += `${spaces}}\n`;
    return proto;
  };

  const toPascalCase = (str: string): string => {
    return str
      .split(/[_-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  const convert = () => {
    setError('');
    setProtoOutput('');

    if (!jsonInput.trim()) {
      setError('JSON input is required');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      if (typeof parsed !== 'object' || parsed === null) {
        setError('JSON must be an object');
        return;
      }
      const proto = generateProto(parsed, messageName);
      setProtoOutput(proto);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Parse error';
      setError(`Invalid JSON: ${msg}`);
    }
  };

  const loadSample = () => {
    const sample = {
      id: 123,
      name: "John Doe",
      email: "john@example.com",
      active: true,
      score: 95.5,
      tags: ["developer", "golang", "protobuf"],
      metadata: {
        created_at: "2024-01-01",
        last_login: "2024-03-14"
      }
    };
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-to-protobuf"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600 }}>{t.messageNameLabel || 'Message Name'}</label>
          <input
            type="text"
            value={messageName}
            onChange={e => setMessageName(e.target.value || 'Message')}
            placeholder="Message"
            style={{ fontSize: 13, minWidth: 150 }}
          />
        </div>
        <button onClick={convert} className="btn btn-primary">{dict.common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setJsonInput(''); setProtoOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Error */}
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
          ✕ {dict.common.error}: {error}
        </div>
      )}

      {/* Input and Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.jsonInputLabel || 'JSON Input'}</label>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder={t.jsonInputPlaceholder || 'Paste JSON here...'}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.protoOutputLabel || 'Protocol Buffers Output'}</label>
            {protoOutput && <CopyButton text={protoOutput} />}
          </div>
          <textarea
            value={protoOutput}
            readOnly
            style={{ minHeight: 350, background: 'var(--bg-secondary)', cursor: 'default', fontFamily: 'monospace' }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'JSON to Protocol Buffers Converter'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Convert JSON structures to Protocol Buffer message definitions. Automatically infer types, handle nested objects, and generate clean .proto files. Perfect for API design, gRPC services, and data serialization.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Automatic type inference (int32, string, bool, double, etc.)'}</li>
          <li>{t.seoFeature2 || 'Support for nested messages and repeated fields'}</li>
          <li>{t.seoFeature3 || 'Customizable message names'}</li>
          <li>{t.seoFeature4 || 'Clean, production-ready .proto output'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
