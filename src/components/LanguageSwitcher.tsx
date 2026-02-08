'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { i18n, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { useLang } from '@/i18n/LangContext';

export default function LanguageSwitcher() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    window.location.href = segments.join('/');
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--accent-blue)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        <span>{localeFlags[lang]}</span>
        <span>{lang.toUpperCase()}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: 4,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          minWidth: 160,
          zIndex: 100,
        }}>
          {i18n.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => { switchLocale(locale); setOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 14px',
                border: 'none',
                background: locale === lang ? 'rgba(59,130,246,0.1)' : 'transparent',
                color: locale === lang ? 'var(--accent-blue)' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: locale === lang ? 600 : 400,
                textAlign: 'left',
                borderBottom: '1px solid var(--border-color)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (locale !== lang) e.currentTarget.style.background = 'var(--bg-input)'; }}
              onMouseLeave={e => { if (locale !== lang) e.currentTarget.style.background = 'transparent'; }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
              {locale === lang && <span style={{ marginLeft: 'auto', fontSize: 11 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
