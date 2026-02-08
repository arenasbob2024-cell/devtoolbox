'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type Permission = { read: boolean; write: boolean; execute: boolean };

function permToNumber(p: Permission): number {
  return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
}

function permToString(p: Permission): string {
  return (p.read ? 'r' : '-') + (p.write ? 'w' : '-') + (p.execute ? 'x' : '-');
}

function numberToPerm(n: number): Permission {
  return { read: !!(n & 4), write: !!(n & 2), execute: !!(n & 1) };
}

export default function ChmodCalculator() {
  const { dict } = useLang();
  const t = dict.tools['chmod-calculator'];

  const [owner, setOwner] = useState<Permission>({ read: true, write: true, execute: true });
  const [group, setGroup] = useState<Permission>({ read: true, write: false, execute: true });
  const [others, setOthers] = useState<Permission>({ read: true, write: false, execute: true });
  const [numericInput, setNumericInput] = useState('');

  const numeric = useMemo(() => `${permToNumber(owner)}${permToNumber(group)}${permToNumber(others)}`, [owner, group, others]);
  const symbolic = useMemo(() => `-${permToString(owner)}${permToString(group)}${permToString(others)}`, [owner, group, others]);
  const command = `chmod ${numeric} filename`;

  const applyNumeric = (val: string) => {
    setNumericInput(val);
    if (/^[0-7]{3}$/.test(val)) {
      setOwner(numberToPerm(parseInt(val[0])));
      setGroup(numberToPerm(parseInt(val[1])));
      setOthers(numberToPerm(parseInt(val[2])));
    }
  };

  const commonPermissions = [
    { num: '755', desc: t.common755 },
    { num: '644', desc: t.common644 },
    { num: '777', desc: t.common777 },
    { num: '700', desc: t.common700 },
    { num: '600', desc: t.common600 },
    { num: '444', desc: t.common444 },
  ];

  const renderPermGroup = (label: string, perm: Permission, setPerm: (p: Permission) => void) => (
    <div style={{
      background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
      border: '1px solid var(--border-color)',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: 'var(--accent-blue)' }}>{label}</div>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { key: 'read' as const, label: t.read, letter: 'r', color: 'var(--accent-emerald)' },
          { key: 'write' as const, label: t.write, letter: 'w', color: 'var(--accent-orange)' },
          { key: 'execute' as const, label: t.execute, letter: 'x', color: 'var(--accent-rose)' },
        ].map(({ key, label: lbl, letter, color }) => (
          <label key={key} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            cursor: 'pointer', padding: '8px 12px', borderRadius: 8,
            background: perm[key] ? `${color}15` : 'transparent',
            border: `1px solid ${perm[key] ? color : 'var(--border-color)'}`,
            transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'monospace', color: perm[key] ? color : 'var(--text-secondary)' }}>{letter}</span>
            <span style={{ fontSize: 11 }}>{lbl}</span>
            <input type="checkbox" checked={perm[key]} onChange={e => setPerm({ ...perm, [key]: e.target.checked })}
              style={{ accentColor: color }} />
          </label>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', fontSize: 24, fontWeight: 800, fontFamily: 'monospace', color: 'var(--accent-blue)' }}>
          {permToNumber(perm)}
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="chmod-calculator"
    >
      {/* Result Display */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20,
      }}>
        <div style={{
          background: 'var(--bg-input)', borderRadius: 10, padding: '16px', textAlign: 'center',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.numericLabel}</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{numeric}</div>
          <CopyButton text={numeric} />
        </div>
        <div style={{
          background: 'var(--bg-input)', borderRadius: 10, padding: '16px', textAlign: 'center',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.symbolicLabel}</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'monospace', color: 'var(--accent-emerald)' }}>{symbolic}</div>
          <CopyButton text={symbolic} />
        </div>
        <div style={{
          background: 'var(--bg-input)', borderRadius: 10, padding: '16px', textAlign: 'center',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.commandLabel}</div>
          <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'monospace', color: 'var(--accent-purple)', marginTop: 6 }}>{command}</div>
          <CopyButton text={command} />
        </div>
      </div>

      {/* Numeric Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>{t.enterNumeric}</label>
        <input
          type="text"
          value={numericInput}
          onChange={e => applyNumeric(e.target.value)}
          placeholder="755"
          maxLength={3}
          style={{ width: 120, textAlign: 'center', fontSize: 20, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 8 }}
        />
      </div>

      {/* Permission Checkboxes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {renderPermGroup(t.owner, owner, setOwner)}
        {renderPermGroup(t.group, group, setGroup)}
        {renderPermGroup(t.others, others, setOthers)}
      </div>

      {/* Common Permissions */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{t.commonTitle}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {commonPermissions.map(({ num, desc }) => (
            <button key={num} onClick={() => applyNumeric(num)}
              className="btn btn-ghost"
              style={{
                display: 'flex', justifyContent: 'space-between', padding: '8px 14px',
                background: numeric === num ? 'var(--accent-blue)15' : undefined,
                border: numeric === num ? '1px solid var(--accent-blue)' : undefined,
              }}>
              <code style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{num}</code>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
