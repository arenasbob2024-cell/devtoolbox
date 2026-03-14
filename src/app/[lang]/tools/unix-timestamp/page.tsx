'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function UnixTimestamp() {
  const { dict } = useLang();
  const t = dict.tools['unix-timestamp'];

  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');
  const [convertedDate, setConvertedDate] = useState<Record<string, string>>({});

  const [dateInput, setDateInput] = useState<string>('');
  const [timeInput, setTimeInput] = useState<string>('');
  const [convertedTimestamp, setConvertedTimestamp] = useState<Record<string, string>>({});

  // Update current timestamp every second
  useEffect(() => {
    const updateTimestamp = () => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    };
    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert Unix timestamp to various date formats
  const convertTimestampToDate = () => {
    if (!timestamp || isNaN(Number(timestamp))) {
      setConvertedDate({});
      return;
    }

    const ts = Number(timestamp);
    const date = new Date(ts * 1000);
    const dateMs = new Date(ts);

    setConvertedDate({
      iso8601: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toString(),
      rfc2822: date.toISOString().replace('T', ' ').replace('Z', '+0000'),
      unixSec: String(ts),
      unixMs: String(ts * 1000),
    });
  };

  // Convert date and time to Unix timestamp
  const convertDateToTimestamp = () => {
    if (!dateInput || !timeInput) {
      setConvertedTimestamp({});
      return;
    }

    try {
      const dateTimeStr = `${dateInput}T${timeInput}:00`;
      const date = new Date(dateTimeStr);

      if (isNaN(date.getTime())) {
        setConvertedTimestamp({ error: t.invalidDate });
        return;
      }

      const seconds = Math.floor(date.getTime() / 1000);
      const milliseconds = date.getTime();

      setConvertedTimestamp({
        seconds: String(seconds),
        milliseconds: String(milliseconds),
        iso8601: date.toISOString(),
      });
    } catch (e) {
      setConvertedTimestamp({ error: t.invalidDate });
    }
  };

  const commonTimestamps = [
    { label: t.unixEpoch, seconds: '0', description: '1970-01-01 00:00:00 UTC' },
    { label: t.y2k, seconds: '946684800', description: '2000-01-01 00:00:00 UTC' },
    { label: t.y2038Problem, seconds: '2147483647', description: '2038-01-19 03:14:07 UTC (32-bit overflow)' },
    { label: t.now, seconds: String(Math.floor(Date.now() / 1000)), description: 'Current time' },
  ];

  const dateTimePickerStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '14px',
  };

  const containerStyle = {
    background: 'var(--bg-secondary)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    border: '1px solid var(--border-color)',
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="unix-timestamp"
    >
      {/* Current Unix Timestamp */}
      <div style={containerStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
          {t.currentTimestamp}
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <div
            style={{
              background: 'var(--bg-primary)',
              padding: '12px 16px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontFamily: 'monospace',
              fontSize: '16px',
              fontWeight: 600,
              flex: 1,
              minWidth: '200px',
            }}
          >
            {currentTimestamp}
          </div>
          <CopyButton text={String(currentTimestamp)} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
          {t.currentTimestampDesc}
        </div>
      </div>

      {/* Convert Unix Timestamp to Date */}
      <div style={containerStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
          {t.timestampToDate}
        </h3>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
            {t.unixTimestampInput}
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder={t.pasteTimestamp}
              style={{ flex: 1, ...dateTimePickerStyle }}
            />
            <button onClick={convertTimestampToDate} className="btn btn-primary">
              {dict.common.convert}
            </button>
          </div>
        </div>

        {Object.keys(convertedDate).length > 0 && (
          <div style={{ background: 'var(--bg-primary)', borderRadius: '6px', padding: '12px', marginTop: 12 }}>
            {Object.entries(convertedDate).map(([key, value]) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '13px',
                }}
              >
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600, minWidth: '100px' }}>
                  {key === 'iso8601'
                    ? 'ISO 8601'
                    : key === 'utc'
                      ? 'UTC'
                      : key === 'local'
                        ? t.localTime
                        : key === 'rfc2822'
                          ? 'RFC 2822'
                          : key === 'unixSec'
                            ? t.unixSeconds
                            : t.unixMilliseconds}
                </span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{value}</span>
                  <CopyButton text={value} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Convert Date to Unix Timestamp */}
      <div style={containerStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
          {t.dateToTimestamp}
        </h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.date}
            </label>
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              style={dateTimePickerStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.time}
            </label>
            <input
              type="time"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              style={dateTimePickerStyle}
            />
          </div>
        </div>
        <button onClick={convertDateToTimestamp} className="btn btn-primary" style={{ marginBottom: 12 }}>
          {dict.common.convert}
        </button>

        {convertedTimestamp && Object.keys(convertedTimestamp).length > 0 && (
          <div style={{ background: 'var(--bg-primary)', borderRadius: '6px', padding: '12px' }}>
            {convertedTimestamp.error ? (
              <div style={{ color: 'var(--accent-red)', fontSize: '13px' }}>{convertedTimestamp.error}</div>
            ) : (
              Object.entries(convertedTimestamp).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600, minWidth: '120px' }}>
                    {key === 'seconds' ? t.unixSeconds : key === 'milliseconds' ? t.unixMilliseconds : 'ISO 8601'}
                  </span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{value}</span>
                    <CopyButton text={value} />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Common Timestamps Reference */}
      <div style={containerStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
          {t.commonTimestamps}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {commonTimestamps.map((item) => (
            <div
              key={item.seconds}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: '6px',
                padding: '12px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.description}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--accent)' }}>
                  {item.seconds}
                </span>
                <CopyButton text={item.seconds} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
          {t.seoContent}
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 16, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          {t.faqs && t.faqs.map((faq: { q: string; a: string }, idx: number) => (
            <div key={idx} style={{ marginBottom: 12 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Q: {faq.q}</strong>
              <p style={{ marginTop: 4, marginBottom: 0 }}>A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
