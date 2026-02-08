'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function generatePassword(length: number, options: {
  uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean;
}): string {
  let chars = '';
  if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) chars += '0123456789';
  if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array).map(x => chars[x % chars.length]).join('');
}

export default function PasswordGenerator() {
  const { dict } = useLang();
  const t = dict.tools['password-generator'];

  const getStrength = useCallback((password: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: t.weak, color: 'var(--accent-rose)' };
    if (score <= 4) return { score, label: t.medium, color: 'var(--accent-orange)' };
    return { score, label: t.strong, color: 'var(--accent-emerald)' };
  }, [t]);

  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generate = useCallback(() => {
    const newPasswords = Array.from({ length: count }, () =>
      generatePassword(length, { uppercase, lowercase, numbers, symbols })
    );
    setPasswords(newPasswords);
  }, [length, uppercase, lowercase, numbers, symbols, count]);

  const strength = passwords[0] ? getStrength(passwords[0]) : null;

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="password-generator"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.length}</label>
              <span style={{ fontSize: 13, color: 'var(--accent-blue)', fontWeight: 700 }}>{length}</span>
            </div>
            <input type="range" min={4} max={64} value={length} onChange={e => setLength(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-blue)' }} />
          </div>

          {[
            { label: t.uppercaseOpt, checked: uppercase, onChange: setUppercase },
            { label: t.lowercaseOpt, checked: lowercase, onChange: setLowercase },
            { label: t.numbersOpt, checked: numbers, onChange: setNumbers },
            { label: t.symbolsOpt, checked: symbols, onChange: setSymbols },
          ].map(({ label, checked, onChange }) => (
            <label key={label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: 13, cursor: 'pointer', padding: '8px 12px',
              background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)',
            }}>
              <span>{label}</span>
              <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
                style={{ accentColor: 'var(--accent-blue)' }} />
            </label>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.count}:</label>
            <input type="number" value={count} min={1} max={20}
              onChange={e => setCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
              style={{ width: 60, padding: '6px 10px', fontSize: 13 }} />
          </div>

          <button onClick={generate} className="btn btn-primary" style={{ width: '100%' }}>{t.generatePasswords}</button>
        </div>

        {/* Results */}
        <div>
          {strength && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
              padding: '8px 14px', background: 'var(--bg-input)', borderRadius: 8,
              border: '1px solid var(--border-color)',
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.strength}:</span>
              <div style={{ flex: 1, height: 6, background: 'var(--bg-primary)', borderRadius: 3 }}>
                <div style={{
                  width: `${(strength.score / 6) * 100}%`,
                  height: '100%', borderRadius: 3, background: strength.color,
                  transition: 'width 0.3s',
                }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: strength.color }}>{strength.label}</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {passwords.map((pw, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'var(--bg-input)', borderRadius: 6, padding: '10px 14px',
                border: '1px solid var(--border-color)',
              }}>
                <code style={{ fontSize: 13, fontFamily: 'monospace', wordBreak: 'break-all', flex: 1, marginRight: 8 }}>{pw}</code>
                <CopyButton text={pw} />
              </div>
            ))}
          </div>

          {passwords.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>
              {t.emptyState}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
