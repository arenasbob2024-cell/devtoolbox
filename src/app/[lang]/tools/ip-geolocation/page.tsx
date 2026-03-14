'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface GeoData {
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  isp?: string;
  timezone?: string;
}

export default function IpGeolocation() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['ip-geolocation'];

  const [ipInput, setIpInput] = useState('');
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCurrentIP();
  }, []);

  const fetchCurrentIP = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setGeoData({
        ip: data.ip,
        country: data.country_name,
        region: data.region,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        isp: data.org,
        timezone: data.timezone,
      });
      setIpInput(data.ip);
    } catch {
      setError('Failed to fetch IP information');
    }
    setLoading(false);
  };

  const validateIP = (ip: string): boolean => {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^(([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4})$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const handleLookup = async () => {
    if (!ipInput.trim()) {
      setError('Please enter an IP address');
      return;
    }

    if (!validateIP(ipInput)) {
      setError('Invalid IP address format');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://ipapi.co/${ipInput}/json/`);
      if (!response.ok) {
        throw new Error('IP not found');
      }
      const data = await response.json();
      setGeoData({
        ip: data.ip,
        country: data.country_name,
        region: data.region,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        isp: data.org,
        timezone: data.timezone,
      });
    } catch {
      setError('Could not find information for this IP address');
      setGeoData(null);
    }
    setLoading(false);
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    display: 'block',
    marginBottom: 4,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--text-primary)',
    wordBreak: 'break-all',
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 16,
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="ip-geolocation"
    >
      <div style={cardStyle}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            value={ipInput}
            onChange={e => setIpInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLookup()}
            placeholder="Enter IP address (e.g., 8.8.8.8)"
            style={{
              flex: 1,
              padding: '10px 12px',
              fontSize: 13,
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          <button
            onClick={handleLookup}
            disabled={loading}
            className="btn btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {loading ? 'Checking...' : 'Lookup'}
          </button>
          <button
            onClick={fetchCurrentIP}
            className="btn btn-secondary"
            style={{
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            My IP
          </button>
        </div>

        {error && (
          <div style={{
            padding: 10,
            borderRadius: 6,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgb(239, 68, 68)',
            color: 'rgb(239, 68, 68)',
            fontSize: 13,
            marginBottom: 12,
          }}>
            {error}
          </div>
        )}
      </div>

      {geoData && (
        <div>
          <div style={cardStyle}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--accent-blue)' }}>
              IP Address Information
            </div>
            <div style={{ ...rowStyle, marginBottom: 12 }}>
              <div>
                <label style={labelStyle}>IP Address</label>
                <div style={{ ...valueStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{geoData.ip}</span>
                  <CopyButton text={geoData.ip} label={dict.common.copy} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>ISP / Organization</label>
                <div style={valueStyle}>{geoData.isp || 'N/A'}</div>
              </div>
            </div>

            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>Country</label>
                <div style={valueStyle}>{geoData.country || 'N/A'}</div>
              </div>
              <div>
                <label style={labelStyle}>Region</label>
                <div style={valueStyle}>{geoData.region || 'N/A'}</div>
              </div>
            </div>

            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>City</label>
                <div style={valueStyle}>{geoData.city || 'N/A'}</div>
              </div>
              <div>
                <label style={labelStyle}>Timezone</label>
                <div style={valueStyle}>{geoData.timezone || 'N/A'}</div>
              </div>
            </div>

            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>Latitude</label>
                <div style={valueStyle}>{geoData.latitude?.toFixed(6) || 'N/A'}</div>
              </div>
              <div>
                <label style={labelStyle}>Longitude</label>
                <div style={valueStyle}>{geoData.longitude?.toFixed(6) || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
