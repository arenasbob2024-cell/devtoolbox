'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function NumberBase() {
  const { dict } = useLang();
  const t = dict.tools['number-base'];
  const [dec, setDec] = useState('');
  const [bin, setBin] = useState('');
  const [oct, setOct] = useState('');
  const [hex, setHex] = useState('');

  const fromDecimal = (val: string) => {
    setDec(val);
    const n = parseInt(val, 10);
    if (isNaN(n)) { setBin(''); setOct(''); setHex(''); return; }
    setBin(n.toString(2));
    setOct(n.toString(8));
    setHex(n.toString(16).toUpperCase());
  };

  const fromBinary = (val: string) => {
    setBin(val);
    const n = parseInt(val, 2);
    if (isNaN(n)) { setDec(''); setOct(''); setHex(''); return; }
    setDec(n.toString(10));
    setOct(n.toString(8));
    setHex(n.toString(16).toUpperCase());
  };

  const fromOctal = (val: string) => {
    setOct(val);
    const n = parseInt(val, 8);
    if (isNaN(n)) { setDec(''); setBin(''); setHex(''); return; }
    setDec(n.toString(10));
    setBin(n.toString(2));
    setHex(n.toString(16).toUpperCase());
  };

  const fromHex = (val: string) => {
    setHex(val);
    const n = parseInt(val, 16);
    if (isNaN(n)) { setDec(''); setBin(''); setOct(''); return; }
    setDec(n.toString(10));
    setBin(n.toString(2));
    setOct(n.toString(8));
  };

  const bases = [
    { label: t.decimal, value: dec, onChange: fromDecimal, placeholder: t.decimalPlaceholder },
    { label: t.binary, value: bin, onChange: fromBinary, placeholder: t.binaryPlaceholder },
    { label: t.octal, value: oct, onChange: fromOctal, placeholder: t.octalPlaceholder },
    { label: t.hex, value: hex, onChange: fromHex, placeholder: t.hexPlaceholder },
  ];

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="number-base"
    >
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
        {t.helperText}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {bases.map(({ label, value, onChange, placeholder }) => (
          <div key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
              {value && <CopyButton text={value} />}
            </div>
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={placeholder}
              style={{ fontFamily: 'monospace', fontSize: 16, padding: '12px 16px' }}
            />
          </div>
        ))}
      </div>

      <button onClick={() => { setDec(''); setBin(''); setOct(''); setHex(''); }}
        className="btn btn-secondary" style={{ marginTop: 16 }}>{dict.common.clearAll}</button>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
