'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generatePassword(length: number, useUppercase: boolean, useLowercase: boolean, useNumbers: boolean, useSymbols: boolean): string {
  let chars = '';
  if (useUppercase) chars += UPPERCASE;
  if (useLowercase) chars += LOWERCASE;
  if (useNumbers) chars += NUMBERS;
  if (useSymbols) chars += SYMBOLS;
  
  if (chars === '') return '';
  
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  
  return password;
}

function calculateStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 2) return { score, label: 'weak', color: '#ef4444' };
  if (score <= 4) return { score, label: 'medium', color: '#f59e0b' };
  return { score, label: 'strong', color: '#22c55e' };
}

export default function StrongPasswordGenerator() {
  const { dict } = useLang();
  const t = dict.tools['strong-password-generator'];
  
  const [passwords, setPasswords] = useState<string[]>([]);
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  
  const generate = useCallback(() => {
    const newPasswords = Array.from({ length: count }, () => 
      generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols)
    );
    setPasswords(newPasswords);
  }, [length, count, useUppercase, useLowercase, useNumbers, useSymbols]);
  
  const allText = passwords.join('\n');
  
  const getStrengthLabel = (label: string) => {
    if (label === 'weak') return t.weak;
    if (label === 'medium') return t.medium;
    return t.strong;
  };
  
  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="strong-password-generator"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 14, color: 'var(--text-primary)', minWidth: 80 }}>
            {t.length}:
          </label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            style={{ flex: 1, minWidth: 150, maxWidth: 300 }}
          />
          <span style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            minWidth: 40,
            textAlign: 'center'
          }}>
            {length}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 14, color: 'var(--text-primary)', minWidth: 80 }}>
            {t.count}:
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{ width: 80, padding: '8px 12px', fontSize: 14 }}
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          flexWrap: 'wrap',
          padding: '12px 16px',
          background: 'var(--bg-secondary)',
          borderRadius: 8,
          border: '1px solid var(--border-color)'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-primary)', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={useUppercase} 
              onChange={(e) => setUseUppercase(e.target.checked)} 
            />
            {t.uppercaseOpt}
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-primary)', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={useLowercase} 
              onChange={(e) => setUseLowercase(e.target.checked)} 
            />
            {t.lowercaseOpt}
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-primary)', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={useNumbers} 
              onChange={(e) => setUseNumbers(e.target.checked)} 
            />
            {t.numbersOpt}
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-primary)', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={useSymbols} 
              onChange={(e) => setUseSymbols(e.target.checked)} 
            />
            {t.symbolsOpt}
          </label>
        </div>
        
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={generate} 
            className="btn btn-primary"
            disabled={!useUppercase && !useLowercase && !useNumbers && !useSymbols}
          >
            {t.generatePasswords}
          </button>
          {passwords.length > 0 && <CopyButton text={allText} label={dict.common.copyAll} />}
        </div>
        
        {!useUppercase && !useLowercase && !useNumbers && !useSymbols && (
          <div style={{ color: '#ef4444', fontSize: 13 }}>
            {t.selectAtLeastOne}
          </div>
        )}
      </div>
      
      {passwords.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {passwords.map((password, i) => {
            const strength = calculateStrength(password);
            return (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'var(--bg-input)',
                borderRadius: 8,
                padding: '12px 16px',
                border: '1px solid var(--border-color)',
              }}>
                <code style={{ 
                  flex: 1,
                  fontSize: 15, 
                  fontFamily: 'monospace', 
                  color: 'var(--text-primary)',
                  wordBreak: 'break-all'
                }}>
                  {password}
                </code>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8,
                  flexShrink: 0
                }}>
                  <span style={{
                    fontSize: 12,
                    padding: '4px 10px',
                    borderRadius: 12,
                    background: strength.color + '20',
                    color: strength.color,
                    fontWeight: 500,
                    whiteSpace: 'nowrap'
                  }}>
                    {t.strength} {getStrengthLabel(strength.label)}
                  </span>
                  <CopyButton text={password} label={dict.common.copy} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {passwords.length === 0 && (
        <div style={{ textAlign: 'center', padding: 50, color: 'var(--text-secondary)' }}>
          <p>{t.emptyState}</p>
        </div>
      )}
      
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
