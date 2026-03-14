'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const base64UrlEncode = (str: string): string => {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const hmacSha256 = async (message: string, secret: string): Promise<string> => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
};

export default function JwtGeneratorPage() {
  const dict = useLang();
  const t = dict.tools['jwt-generator'];
  const [headerJson, setHeaderJson] = useState('{"alg":"HS256","typ":"JWT"}');
  const [payloadJson, setPayloadJson] = useState('{"sub":"1234567890","name":"John Doe","iat":1516239022}');
  const [secret, setSecret] = useState('your-secret-key');
  const [jwt, setJwt] = useState('');
  const [decodedHeader, setDecodedHeader] = useState('');
  const [decodedPayload, setDecodedPayload] = useState('');
  const [error, setError] = useState('');

  const generateJwt = useCallback(async () => {
    try {
      setError('');
      JSON.parse(headerJson);
      JSON.parse(payloadJson);

      const header = base64UrlEncode(headerJson);
      const payload = base64UrlEncode(payloadJson);
      const message = `${header}.${payload}`;
      
      const signature = await hmacSha256(message, secret);
      const token = `${message}.${signature}`;
      
      setJwt(token);
      setDecodedHeader(JSON.stringify(JSON.parse(headerJson), null, 2));
      setDecodedPayload(JSON.stringify(JSON.parse(payloadJson), null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON or error generating JWT');
      setJwt('');
    }
  }, [headerJson, payloadJson, secret]);

  const loadSample = useCallback(() => {
    setHeaderJson('{"alg":"HS256","typ":"JWT"}');
    setPayloadJson('{"sub":"1234567890","name":"John Doe","iat":1516239022}');
    setSecret('your-secret-key');
    setJwt('');
    setError('');
  }, []);

  const addClaim = useCallback(() => {
    try {
      const payload = JSON.parse(payloadJson);
      const now = Math.floor(Date.now() / 1000);
      payload.iat = now;
      payload.exp = now + 3600;
      setPayloadJson(JSON.stringify(payload, null, 2));
    } catch (err) {
      setError('Invalid JSON payload');
    }
  }, [payloadJson]);

  return (
    <ToolLayout toolId="jwt-generator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
            {t.headerLabel || 'Header (JSON)'}
          </label>
          <textarea
            value={headerJson}
            onChange={(e) => setHeaderJson(e.target.value)}
            placeholder={t.headerPlaceholder || 'Enter header JSON...'}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              resize: 'vertical',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
            {t.payloadLabel || 'Payload (JSON)'}
          </label>
          <textarea
            value={payloadJson}
            onChange={(e) => setPayloadJson(e.target.value)}
            placeholder={t.payloadPlaceholder || 'Enter payload JSON...'}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          {t.secretLabel || 'Secret Key'}
        </label>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder={t.secretPlaceholder || 'Enter secret key...'}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontFamily: 'monospace',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '0.5rem',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          onClick={generateJwt}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--accent-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          {t.generateBtn || 'Generate JWT'}
        </button>
        <button
          onClick={addClaim}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--accent-purple)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          {t.addTimeClaim || 'Add Time Claims'}
        </button>
        <button
          onClick={loadSample}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--accent-orange)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          {dict.common.loadSample}
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--error-bg)', color: 'var(--error)', borderRadius: '0.5rem' }}>
          {error}
        </div>
      )}

      {jwt && (
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
            {t.outputLabel || 'Generated JWT'}
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <textarea
              value={jwt}
              readOnly
              style={{
                flex: 1,
                minHeight: '100px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
              }}
            />
            <CopyButton text={jwt} />
          </div>
        </div>
      )}

      {jwt && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
              {t.decodedHeader || 'Decoded Header'}
            </label>
            <textarea
              value={decodedHeader}
              readOnly
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
              {t.decodedPayload || 'Decoded Payload'}
            </label>
            <textarea
              value={decodedPayload}
              readOnly
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
              }}
            />
          </div>
        </div>
      )}

      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoTitle || 'What is JWT Generator?'}
        </h2>
        <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {t.seoContent || 'Generate and sign JSON Web Tokens (JWT) with HS256 algorithm. Create custom headers and payloads, specify your secret key, and get a signed JWT token instantly. Perfect for API authentication and session management testing.'}
        </p>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoFeaturesTitle || 'Features'}
        </h3>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <li>{t.seoFeature1 || 'Generate JWT with custom headers and payloads'}</li>
          <li>{t.seoFeature2 || 'HS256 (HMAC SHA-256) signing algorithm'}</li>
          <li>{t.seoFeature3 || 'View decoded JWT parts for verification'}</li>
          <li>{t.seoFeature4 || '100% client-side processing — your data never leaves your browser'}</li>
        </ul>
      </section>
    </ToolLayout>
  );
}
