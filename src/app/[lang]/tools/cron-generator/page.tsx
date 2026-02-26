'use client';

import { useState, useMemo, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

const presets = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: 'Every 30 minutes', cron: '*/30 * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every 6 hours', cron: '0 */6 * * *' },
  { label: 'Every 12 hours', cron: '0 */12 * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every day at noon', cron: '0 12 * * *' },
  { label: 'Every Monday at 9am', cron: '0 9 * * 1' },
  { label: 'Every weekday at 9am', cron: '0 9 * * 1-5' },
  { label: 'First day of every month', cron: '0 0 1 * *' },
  { label: 'Every Sunday at midnight', cron: '0 0 * * 0' },
  { label: 'Every January 1st', cron: '0 0 1 1 *' },
];

function describeCron(parts: string[]): string {
  if (parts.length !== 5) return 'Invalid cron expression';
  const [min, hour, dom, month, dow] = parts;
  let desc = '';
  if (min === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') return 'Every minute';
  if (min.startsWith('*/')) desc += `Every ${min.slice(2)} minutes`;
  else if (min === '0' && hour === '*') desc += 'At the start of every hour';
  else if (min === '0' && hour.startsWith('*/')) desc += `Every ${hour.slice(2)} hours`;
  else if (min !== '*' && hour !== '*' && !hour.includes('/') && !hour.includes(',')) {
    desc += `At ${hour.padStart(2,'0')}:${min.padStart(2,'0')}`;
  } else if (min !== '*') desc += `At minute ${min}`;
  else desc += 'Every minute';

  if (dom !== '*' && !desc.includes('day')) desc += ` on day ${dom} of the month`;
  const months = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
  if (month !== '*') {
    const m = parseInt(month);
    desc += m > 0 && m <= 12 ? ` in ${months[m]}` : ` in month ${month}`;
  }
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  if (dow !== '*') {
    if (dow === '1-5') desc += ', Monday through Friday';
    else if (dow === '0-6' || dow === '*') {}
    else {
      const d = parseInt(dow);
      desc += d >= 0 && d <= 6 ? ` on ${days[d]}` : ` on day-of-week ${dow}`;
    }
  }
  return desc || 'Custom schedule';
}

function getNextRuns(parts: string[], count: number = 5): string[] {
  if (parts.length !== 5) return [];
  const runs: string[] = [];
  const now = new Date();
  const d = new Date(now);
  d.setSeconds(0);
  d.setMilliseconds(0);
  d.setMinutes(d.getMinutes() + 1);

  const matchField = (field: string, value: number, max: number): boolean => {
    if (field === '*') return true;
    if (field.includes('/')) {
      const step = parseInt(field.split('/')[1]);
      return value % step === 0;
    }
    if (field.includes('-')) {
      const [start, end] = field.split('-').map(Number);
      return value >= start && value <= end;
    }
    if (field.includes(',')) {
      return field.split(',').map(Number).includes(value);
    }
    return parseInt(field) === value;
  };

  let iterations = 0;
  while (runs.length < count && iterations < 525600) {
    iterations++;
    const [min, hour, dom, month, dow] = parts;
    if (matchField(min, d.getMinutes(), 59) &&
        matchField(hour, d.getHours(), 23) &&
        matchField(dom, d.getDate(), 31) &&
        matchField(month, d.getMonth() + 1, 12) &&
        matchField(dow, d.getDay(), 6)) {
      runs.push(d.toLocaleString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false
      }));
    }
    d.setMinutes(d.getMinutes() + 1);
  }
  return runs;
}

export default function CronGenerator() {
  const { dict } = useLang();
  const t = dict.tools['cron-generator'] || {} as unknown as Record<string, string>;
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dom, setDom] = useState('*');
  const [month, setMonth] = useState('*');
  const [dow, setDow] = useState('*');
  const [customInput, setCustomInput] = useState('');
  const [shareCopied, setShareCopied] = useState(false);

  // Restore state from URL hash on mount
  useEffect(() => {
    const params = getHashParams();
    if (params.expr) {
      const decoded = decodeFromUrl(params.expr);
      if (decoded) {
        const p = decoded.trim().split(/\s+/);
        if (p.length === 5) {
          setMinute(p[0]); setHour(p[1]); setDom(p[2]); setMonth(p[3]); setDow(p[4]);
        }
      }
    }
  }, []);

  const expression = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const parts = expression.split(' ');
  const description = useMemo(() => describeCron(parts), [expression]);
  const nextRuns = useMemo(() => getNextRuns(parts), [expression]);

  const applyPreset = (cron: string) => {
    const p = cron.split(' ');
    setMinute(p[0]); setHour(p[1]); setDom(p[2]); setMonth(p[3]); setDow(p[4]);
  };

  const applyCustom = () => {
    const p = customInput.trim().split(/\s+/);
    if (p.length === 5) {
      setMinute(p[0]); setHour(p[1]); setDom(p[2]); setMonth(p[3]); setDow(p[4]);
    }
  };

  const handleShare = () => {
    const params = { expr: encodeForUrl(expression) };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const fieldStyle = { padding: '8px 12px', fontSize: 14, width: 100, textAlign: 'center' as const, fontFamily: 'monospace' };

  return (
    <ToolLayout
      title={t.pageTitle || 'Cron Expression Generator'}
      description={t.pageDescription || 'Build and validate cron expressions visually'}
      toolId="cron-generator"
    >
      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
          {t.presetsTitle || 'Common Presets'}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {presets.map((p) => (
            <button key={p.cron} onClick={() => applyPreset(p.cron)}
              style={{ padding: '4px 10px', fontSize: 12, borderRadius: 4, border: '1px solid var(--border-color)', background: expression === p.cron ? 'var(--accent-color)' : 'var(--bg-input)', color: expression === p.cron ? '#fff' : 'var(--text-primary)', cursor: 'pointer' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
        <input value={customInput} onChange={e => setCustomInput(e.target.value)}
          placeholder={t.customPlaceholder || 'Enter cron expression (e.g. */5 * * * *)'}
          style={{ flex: 1, padding: '8px 12px', fontSize: 14, fontFamily: 'monospace' }}
          onKeyDown={e => e.key === 'Enter' && applyCustom()}
        />
        <button onClick={applyCustom} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          {t.parseBtn || 'Parse'}
        </button>
      </div>

      {/* Field editors */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: t.minute || 'Minute', value: minute, set: setMinute },
          { label: t.hour || 'Hour', value: hour, set: setHour },
          { label: t.dayOfMonth || 'Day (Month)', value: dom, set: setDom },
          { label: t.month || 'Month', value: month, set: setMonth },
          { label: t.dayOfWeek || 'Day (Week)', value: dow, set: setDow },
        ].map((f) => (
          <div key={f.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.label}</label>
            <input value={f.value} onChange={e => f.set(e.target.value)} style={fieldStyle} />
          </div>
        ))}
      </div>

      {/* Result */}
      <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 20, border: '1px solid var(--border-color)', marginBottom: 20, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <code style={{ fontSize: 24, fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-color)' }}>
            {expression}
          </code>
          <CopyButton text={expression} label={dict.common?.copy || 'Copy'} />
          <button onClick={handleShare} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 12px' }} title="Share via URL">
            {shareCopied ? '\u2713 Link Copied!' : '\uD83D\uDD17 Share'}
          </button>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{description}</p>
      </div>

      {/* Next runs */}
      {nextRuns.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
            {t.nextRunsTitle || 'Next 5 Scheduled Runs'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {nextRuns.map((run, i) => (
              <div key={i} style={{ padding: '6px 12px', fontSize: 13, fontFamily: 'monospace', background: 'var(--bg-input)', borderRadius: 4, border: '1px solid var(--border-color)' }}>
                {run}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'What is a Cron Expression?'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'A cron expression is a string of five fields representing a schedule for automated tasks. The five fields represent: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Special characters include * (any), / (step), - (range), and , (list). Our free online cron expression generator helps you build, validate, and understand cron schedules visually.'}
        </p>
      </div>
    </ToolLayout>
  );
}
