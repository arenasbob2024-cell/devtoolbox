'use client';

import { useState, useEffect, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

interface GeolocationData {
  status: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  query?: string;
  message?: string;
}

export default function IpGeolocation() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['ip-geolocation'];

  const [ipInput, setIpInput] = useState('');
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const isValidIp = (ip: string): boolean => {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([\da-fA-F]{0,4}:){2,7}[\da-fA-F]{0,4}$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const lookupIp = useCallback(async (ip: string) => {
    try {
      setLoading(true);
      setError('');

      if (!ip.trim()) {
        setError('Please enter an IP address');
        setLoading(false);
        return;
      }

      if (!isValidIp(ip.trim())) {
        setError('Invalid IP address format');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://ip-api.com/json/${ip.trim()}?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,query,message`, {
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch geolocation data');
      }

      const data: GeolocationData = await response.json();

      if (data.status === 'fail') {
        setError(data.message || 'IP not found or invalid');
        setGeolocation(null);
      } else {
        setGeolocation(data);
        setHistory(prev => {
          const updated = [ip.trim(), ...prev.filter(x => x !== ip.trim())];
          return updated.slice(0, 10);
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lookup failed');
      setGeolocation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadUserIp = async () => {
      try {
        const response = await fetch('https://ip-api.com/json/?fields=query', {
          headers: { 'Accept': 'application/json' },
        });
        const data: { query?: string } = await response.json();
        if (data.query) {
          setIpInput(data.query);
          lookupIp(data.query);
        }
      } catch {
        // silently fail for auto-lookup
      }
    };

    loadUserIp();
  }, [lookupIp]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      lookupIp(ipInput);
    }
  };

  const handleHistoryClick = (ip: string) => {
    setIpInput(ip);
    lookupIp(ip);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: 13,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    outline: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: 'var(--accent-blue)',
    color: 'white',
    transition: 'opacity 0.2s',
  };

  const dataRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '150px 1fr',
    gap: 16,
    padding: '12px 0',
    borderBottom: '1px solid var(--border-color)',
    alignItems: 'center',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 13,
    color: 'var(--text-primary)',
    fontFamily: "'JetBrains Mono', monospace",
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="ip-geolocation">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, marginBottom: 16 }}>
        <input
          type="text"
          value={ipInput}
          onChange={(e) => setIpInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter IP address (e.g., 8.8.8.8)..."
          style={inputStyle}
        />
        <button
          onClick={() => lookupIp(ipInput)}
          disabled={loading}
          style={{ ...buttonStyle, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Lookup...' : 'Lookup'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: 12,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgb(239, 68, 68)',
          borderRadius: 6,
          color: 'rgb(239, 68, 68)',
          fontSize: 12,
          marginBottom: 16,
        }}>
          {error}
        </div>
      )}

      {geolocation && geolocation.status === 'success' && (
        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
            Geolocation Information
          </div>

          <div style={dataRowStyle}>
            <div style={labelStyle}>IP Address</div>
            <div style={valueStyle}>{geolocation.query}</div>
          </div>

          {geolocation.country && (
            <div style={dataRowStyle}>
              <div style={labelStyle}>Country</div>
              <div style={valueStyle}>{geolocation.country} ({geolocation.countryCode})</div>
            </div>
          )}

          {geolocation.region && (
            <div style={dataRowStyle}>
              <div style={labelStyle}>Region</div>
              <div style={valueStyle}>{geolocation.regionName || geolocation.region}</div>
            </div>
          )}

          {geolocation.city && (
            <div style={dataRowStyle}>
              <div style={labelStyle}>City</div>
              <div style={valueStyle}>{geolocation.city}</div>
            </div>
          )}

          {geolocation.zip && (
            <div style={dataRowStyle}>
              <div style={labelStyle}>Zip Code</div>
              <div style={valueStyle}>{geolocation.zip}</div>
            </div>
          )}

          {geolocation.lat !== undefined && geolocation.lon !== undefined && (
            <div style={dataRowStyle}>
              <div style={labelStyle}>Coordinates</div>
              <div style={valueStyle}>{geolocation.lat.toFixed(4)}, {geolocation.lon.toFixed(4)}</div>
            </div>
          )}

          {geolocation.timezone && (
            <div style={dataRowStyle}>
              <div style={labelStyle}>Timezone</div>
              <div style={valueStyle}>{geolocation.timezone}</div>
            </div>
          )}

          {geolocation.isp && (
            <div style={dataRowStyle}>
              <div style={labelStyle}>ISP</div>
              <div style={valueStyle}>{geolocation.isp}</div>
            </div>
          )}

          {geolocation.org && (
            <div style={dataRowStyle}>
              <div style={labelStyle}>Organization</div>
              <div style={valueStyle}>{geolocation.org}</div>
            </div>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Recent Lookups
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {history.map((ip) => (
              <button
                key={ip}
                onClick={() => handleHistoryClick(ip)}
                style={{
                  padding: '6px 12px',
                  fontSize: 12,
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.2s',
                }}
              >
                {ip}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgb(59, 130, 246)',
        borderRadius: 6,
        padding: 12,
        fontSize: 12,
        color: 'var(--text-secondary)',
        marginBottom: 16,
        lineHeight: 1.6,
      }}>
        Rate limit: 45 requests/minute. Powered by <strong>ip-api.com</strong> (free tier, no API key required).
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
