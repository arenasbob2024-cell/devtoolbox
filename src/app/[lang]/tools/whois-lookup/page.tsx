'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface RdapEntity {
  handle?: string;
  vcardArray?: unknown[];
  roles?: string[];
}

interface RdapResponse {
  ldhName?: string;
  handle?: string;
  status?: string[];
  events?: { eventAction: string; eventDate: string }[];
  entities?: RdapEntity[];
  nameservers?: { ldhName?: string }[];
  secureDNS?: { delegationSigned?: boolean };
  notices?: { title?: string; description?: string[] }[];
  errorCode?: number;
  title?: string;
  description?: string[];
}

interface ParsedRecord {
  domain: string;
  registrar?: string;
  registered?: string;
  updated?: string;
  expires?: string;
  status: string[];
  nameservers: string[];
  dnssec: boolean;
  registrant?: string;
  abuseContact?: string;
  raw: RdapResponse;
}

function extractVcardField(vcardArray: unknown, field: string): string | undefined {
  if (!Array.isArray(vcardArray) || vcardArray.length < 2) return undefined;
  const entries = vcardArray[1];
  if (!Array.isArray(entries)) return undefined;
  for (const entry of entries) {
    if (Array.isArray(entry) && entry[0] === field) {
      const value = entry[3];
      if (typeof value === 'string') return value;
      if (Array.isArray(value)) return value.filter(Boolean).join(', ');
    }
  }
  return undefined;
}

function parseRdap(data: RdapResponse): ParsedRecord {
  const events = data.events || [];
  const getEvent = (action: string) =>
    events.find((e) => e.eventAction === action)?.eventDate;

  let registrar: string | undefined;
  let registrantName: string | undefined;
  let abuseContact: string | undefined;

  for (const entity of data.entities || []) {
    const roles = entity.roles || [];
    const name = extractVcardField(entity.vcardArray, 'fn');
    if (roles.includes('registrar') && name) registrar = name;
    if (roles.includes('registrant') && name) registrantName = name;
    if (roles.includes('abuse')) {
      const email = extractVcardField(entity.vcardArray, 'email');
      if (email) abuseContact = email;
    }
  }

  return {
    domain: data.ldhName || '',
    registrar,
    registered: getEvent('registration'),
    updated: getEvent('last changed') || getEvent('last update of RDAP database'),
    expires: getEvent('expiration'),
    status: data.status || [],
    nameservers: (data.nameservers || []).map((n) => n.ldhName || '').filter(Boolean),
    dnssec: !!data.secureDNS?.delegationSigned,
    registrant: registrantName,
    abuseContact,
    raw: data,
  };
}

function formatDate(iso?: string): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toISOString().split('T')[0];
  } catch {
    return iso;
  }
}

export default function WhoisLookup() {
  const { dict } = useLang();
  const t = dict.tools['whois-lookup'] as Record<string, string | string[] | { q: string; a: string }[]>;

  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ParsedRecord | null>(null);
  const [error, setError] = useState<string>('');
  const [showRaw, setShowRaw] = useState(false);

  const lookup = async () => {
    const cleaned = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!cleaned || !/^[a-z0-9][a-z0-9-]*(\.[a-z0-9-]+)+$/.test(cleaned)) {
      setError((t.errorInvalid as string) || 'Please enter a valid domain.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const resp = await fetch(`https://rdap.org/domain/${encodeURIComponent(cleaned)}`);
      const data: RdapResponse = await resp.json();
      if (!resp.ok || data.errorCode) {
        setError(
          (data.title ? `${data.title}: ` : '') +
            (data.description?.join(' ') || ((t.errorNotFound as string) || 'Domain not found.'))
        );
      } else {
        setResult(parseRdap(data));
      }
    } catch {
      setError((t.errorNetwork as string) || 'Lookup failed. Check network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') lookup();
  };

  const samples = ['google.com', 'github.com', 'vercel.com', 'cloudflare.com'];

  const resultText = result
    ? `Domain: ${result.domain}\nRegistrar: ${result.registrar || '—'}\nRegistered: ${formatDate(result.registered)}\nExpires: ${formatDate(result.expires)}\nStatus: ${result.status.join(', ') || '—'}\nNameservers: ${result.nameservers.join(', ') || '—'}\nDNSSEC: ${result.dnssec ? 'enabled' : 'disabled'}`
    : '';

  return (
    <ToolLayout title={t.pageTitle as string} description={t.pageDescription as string} toolId="whois-lookup">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>
              {t.domainLabel as string}
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.domainPlaceholder as string}
              style={{ width: '100%' }}
            />
          </div>
          <button onClick={lookup} disabled={loading} className="btn btn-primary" style={{ minWidth: 120 }}>
            {loading ? (t.loading as string) : (t.lookup as string)}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 12 }}>
          <span style={{ color: 'var(--text-secondary)' }}>{t.samples as string}:</span>
          {samples.map((s) => (
            <button
              key={s}
              onClick={() => {
                setDomain(s);
                setTimeout(lookup, 50);
              }}
              className="btn btn-ghost"
              style={{ padding: '2px 10px', fontSize: 12 }}
            >
              {s}
            </button>
          ))}
        </div>

        {error && (
          <div style={{
            padding: 12, background: 'rgba(239,68,68,0.1)', borderRadius: 8,
            border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: 14,
          }}>
            {error}
          </div>
        )}

        {result && (
          <>
            <div style={{
              background: 'var(--bg-card)', borderRadius: 10, padding: 20,
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>
                  {t.results as string}: <code style={{ color: 'var(--accent-blue)' }}>{result.domain}</code>
                </h3>
                <CopyButton text={resultText} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, fontSize: 13 }}>
                <Field label={t.labelRegistrar as string} value={result.registrar} />
                <Field label={t.labelRegistered as string} value={formatDate(result.registered)} />
                <Field label={t.labelExpires as string} value={formatDate(result.expires)} />
                <Field label={t.labelUpdated as string} value={formatDate(result.updated)} />
                <Field label={t.labelDnssec as string} value={result.dnssec ? '✓' : '✗'} />
                <Field label={t.labelRegistrant as string} value={result.registrant} />
                <Field label={t.labelAbuseContact as string} value={result.abuseContact} />
              </div>

              {result.nameservers.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 6 }}>
                    {t.labelNameservers as string}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {result.nameservers.map((ns) => (
                      <code key={ns} style={{ fontSize: 13 }}>{ns}</code>
                    ))}
                  </div>
                </div>
              )}

              {result.status.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 6 }}>
                    {t.labelStatus as string}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {result.status.map((s) => (
                      <span key={s} style={{
                        fontSize: 11, padding: '3px 8px', background: 'var(--bg-input)',
                        borderRadius: 4, border: '1px solid var(--border-color)',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowRaw(!showRaw)}
              className="btn btn-ghost"
              style={{ alignSelf: 'flex-start', fontSize: 12 }}
            >
              {showRaw ? (t.hideRaw as string) : (t.showRaw as string)}
            </button>

            {showRaw && (
              <pre style={{
                background: 'var(--bg-input)', padding: 14, borderRadius: 8,
                border: '1px solid var(--border-color)', fontSize: 11,
                overflow: 'auto', maxHeight: 400,
              }}>
                {JSON.stringify(result.raw, null, 2)}
              </pre>
            )}
          </>
        )}
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
      </div>
    </ToolLayout>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ padding: 10, background: 'var(--bg-input)', borderRadius: 6, border: '1px solid var(--border-color)' }}>
      <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 500, wordBreak: 'break-word' }}>{value || '—'}</div>
    </div>
  );
}
