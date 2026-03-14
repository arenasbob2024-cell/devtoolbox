'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const PRESETS: { label: string; cron: string }[] = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: 'Every 30 minutes', cron: '*/30 * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every 6 hours', cron: '0 */6 * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every day at noon', cron: '0 12 * * *' },
  { label: 'Every Monday at 9 AM', cron: '0 9 * * 1' },
  { label: 'Weekdays at 9 AM', cron: '0 9 * * 1-5' },
  { label: 'First day of month', cron: '0 0 1 * *' },
  { label: 'Every Sunday at 3 AM', cron: '0 3 * * 0' },
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function describeCron(parts: CronParts): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
  const segments: string[] = [];

  if (minute === '*' && hour === '*') {
    segments.push('Every minute');
  } else if (minute.startsWith('*/')) {
    segments.push(`Every ${minute.slice(2)} minutes`);
  } else if (hour === '*') {
    segments.push(`At minute ${minute} of every hour`);
  } else if (hour.startsWith('*/')) {
    segments.push(`At minute ${minute}, every ${hour.slice(2)} hours`);
  } else {
    const h = parseInt(hour);
    const m = parseInt(minute);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    segments.push(`At ${h12}:${String(m).padStart(2, '0')} ${ampm}`);
  }

  if (dayOfMonth !== '*') {
    if (dayOfMonth.includes(',')) {
      segments.push(`on days ${dayOfMonth} of the month`);
    } else if (dayOfMonth.includes('-')) {
      segments.push(`on days ${dayOfMonth} of the month`);
    } else {
      segments.push(`on day ${dayOfMonth} of the month`);
    }
  }

  if (month !== '*') {
    if (month.includes(',')) {
      const names = month.split(',').map(m => MONTHS[parseInt(m) - 1] || m);
      segments.push(`in ${names.join(', ')}`);
    } else {
      segments.push(`in ${MONTHS[parseInt(month) - 1] || month}`);
    }
  }

  if (dayOfWeek !== '*') {
    if (dayOfWeek === '1-5') {
      segments.push('on weekdays');
    } else if (dayOfWeek === '0,6') {
      segments.push('on weekends');
    } else if (dayOfWeek.includes(',')) {
      const names = dayOfWeek.split(',').map(d => DAYS[parseInt(d)] || d);
      segments.push(`on ${names.join(', ')}`);
    } else if (dayOfWeek.includes('-')) {
      const [start, end] = dayOfWeek.split('-');
      segments.push(`on ${DAYS[parseInt(start)] || start} through ${DAYS[parseInt(end)] || end}`);
    } else {
      segments.push(`on ${DAYS[parseInt(dayOfWeek)] || dayOfWeek}`);
    }
  }

  return segments.join(', ');
}

function getNextRuns(parts: CronParts, count: number = 5): string[] {
  const results: string[] = [];
  const now = new Date();
  const current = new Date(now);

  for (let i = 0; i < 525600 && results.length < count; i++) {
    current.setMinutes(current.getMinutes() + 1);
    current.setSeconds(0);
    current.setMilliseconds(0);

    const m = current.getMinutes();
    const h = current.getHours();
    const dom = current.getDate();
    const mon = current.getMonth() + 1;
    const dow = current.getDay();

    if (!matchField(parts.minute, m)) continue;
    if (!matchField(parts.hour, h)) continue;
    if (!matchField(parts.dayOfMonth, dom)) continue;
    if (!matchField(parts.month, mon)) continue;
    if (!matchField(parts.dayOfWeek, dow)) continue;

    results.push(current.toLocaleString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    }));
  }
  return results;
}

function matchField(field: string, value: number): boolean {
  if (field === '*') return true;
  if (field.startsWith('*/')) {
    const step = parseInt(field.slice(2));
    return value % step === 0;
  }
  const parts = field.split(',');
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (value >= start && value <= end) return true;
    } else if (parseInt(part) === value) {
      return true;
    }
  }
  return false;
}

export default function CrontabGenerator() {
  const { dict } = useLang();
  const t = dict.tools['crontab-generator'] as Record<string, string>;
  const common = dict.common;

  const [parts, setParts] = useState<CronParts>({
    minute: '0', hour: '9', dayOfMonth: '*', month: '*', dayOfWeek: '*'
  });

  const cronString = `${parts.minute} ${parts.hour} ${parts.dayOfMonth} ${parts.month} ${parts.dayOfWeek}`;
  const description = describeCron(parts);
  const nextRuns = getNextRuns(parts);

  const updatePart = useCallback((key: keyof CronParts, value: string) => {
    setParts(prev => ({ ...prev, [key]: value || '*' }));
  }, []);

  const applyPreset = (cron: string) => {
    const p = cron.split(' ');
    setParts({ minute: p[0], hour: p[1], dayOfMonth: p[2], month: p[3], dayOfWeek: p[4] });
  };

  const fieldStyle: React.CSSProperties = {
    padding: '8px 12px', fontSize: 14, fontFamily: 'JetBrains Mono, monospace',
    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
    borderRadius: 6, color: 'var(--text-primary)', textAlign: 'center', width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)',
    textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 4,
  };

  return (
    <ToolLayout
      title={t.pageTitle || 'Crontab Generator'}
      description={t.pageDescription || 'Visual cron expression generator'}
      toolId="crontab-generator"
    >
      {/* Generated Expression */}
      <div style={{
        background: 'var(--bg-secondary)', borderRadius: 12, padding: 20, marginBottom: 20,
        textAlign: 'center', border: '1px solid var(--border-color)'
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Cron Expression
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <code style={{
            fontSize: 28, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--text-primary)', letterSpacing: 2,
          }}>
            {cronString}
          </code>
          <CopyButton text={cronString} />
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 10 }}>
          {description}
        </div>
      </div>

      {/* Field Editors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { key: 'minute' as const, label: 'Minute', hint: '0-59' },
          { key: 'hour' as const, label: 'Hour', hint: '0-23' },
          { key: 'dayOfMonth' as const, label: 'Day (Month)', hint: '1-31' },
          { key: 'month' as const, label: 'Month', hint: '1-12' },
          { key: 'dayOfWeek' as const, label: 'Day (Week)', hint: '0-6 (Sun=0)' },
        ].map(({ key, label, hint }) => (
          <div key={key}>
            <div style={labelStyle}>{label}</div>
            <input
              value={parts[key]}
              onChange={e => updatePart(key, e.target.value)}
              style={fieldStyle}
              placeholder="*"
            />
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4, textAlign: 'center' }}>{hint}</div>
          </div>
        ))}
      </div>

      {/* Quick Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* Presets */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Quick Presets</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {PRESETS.map(p => (
              <button
                key={p.cron}
                onClick={() => applyPreset(p.cron)}
                style={{
                  padding: '5px 10px', fontSize: 11, borderRadius: 6, cursor: 'pointer',
                  background: cronString === p.cron ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: cronString === p.cron ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)', transition: 'all 0.15s',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Next Runs */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Next {nextRuns.length} Runs</div>
          <div style={{
            background: 'var(--bg-secondary)', borderRadius: 8, padding: 12,
            border: '1px solid var(--border-color)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace',
          }}>
            {nextRuns.length > 0 ? nextRuns.map((run, i) => (
              <div key={i} style={{ padding: '4px 0', color: 'var(--text-secondary)', borderBottom: i < nextRuns.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <span style={{ color: 'var(--text-secondary)', marginRight: 8 }}>{i + 1}.</span>
                {run}
              </div>
            )) : (
              <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No upcoming runs found</div>
            )}
          </div>
        </div>
      </div>

      {/* Cheat Sheet */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Cron Syntax Reference</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
          background: 'var(--bg-secondary)', borderRadius: 8, padding: 14,
          border: '1px solid var(--border-color)', fontSize: 12,
        }}>
          {[
            ['*', 'Any value'],
            ['*/5', 'Every 5 units'],
            ['1,3,5', 'Specific values'],
            ['1-5', 'Range of values'],
            ['0 0 * * *', 'Daily at midnight'],
            ['0 */2 * * *', 'Every 2 hours'],
          ].map(([syntax, desc]) => (
            <div key={syntax} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <code style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{syntax}</code>
              <span style={{ color: 'var(--text-secondary)' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      {t.seoTitle && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
          {t.seoFeaturesTitle && (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
              <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
                {t.seoFeature1 && <li>{t.seoFeature1}</li>}
                {t.seoFeature2 && <li>{t.seoFeature2}</li>}
                {t.seoFeature3 && <li>{t.seoFeature3}</li>}
                {t.seoFeature4 && <li>{t.seoFeature4}</li>}
              </ul>
            </>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
