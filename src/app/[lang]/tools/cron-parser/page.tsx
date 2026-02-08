'use client';

import { useState } from 'react';
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

function parseCronExpression(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return 'Invalid cron expression (expected 5 fields)';

  const [minute, hour, dom, month, dow] = parts;

  const descriptions: string[] = [];

  // Minute
  if (minute === '*') descriptions.push('Every minute');
  else if (minute.includes('/')) descriptions.push(`Every ${minute.split('/')[1]} minutes`);
  else if (minute.includes(',')) descriptions.push(`At minutes ${minute}`);
  else descriptions.push(`At minute ${minute}`);

  // Hour
  if (hour === '*') descriptions.push('of every hour');
  else if (hour.includes('/')) descriptions.push(`every ${hour.split('/')[1]} hours`);
  else if (hour.includes(',')) descriptions.push(`at hours ${hour}`);
  else descriptions.push(`past hour ${hour}`);

  // Day of month
  if (dom === '*') { /* every day */ }
  else if (dom.includes('/')) descriptions.push(`every ${dom.split('/')[1]} days`);
  else descriptions.push(`on day ${dom} of the month`);

  // Month
  const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (month === '*') { /* every month */ }
  else if (month.includes(',')) {
    const months = month.split(',').map(m => monthNames[parseInt(m)] || m).join(', ');
    descriptions.push(`in ${months}`);
  }
  else if (month !== '*') descriptions.push(`in ${monthNames[parseInt(month)] || month}`);

  // Day of week
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (dow === '*') { /* every day */ }
  else if (dow.includes(',')) {
    const days = dow.split(',').map(d => dayNames[parseInt(d)] || d).join(', ');
    descriptions.push(`on ${days}`);
  }
  else descriptions.push(`on ${dayNames[parseInt(dow)] || dow}`);

  return descriptions.join(', ');
}

function getNextRuns(cron: string, count: number = 5): string[] {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const [minStr, hourStr] = parts;
  const runs: string[] = [];
  const now = new Date();
  const d = new Date(now);

  for (let i = 0; i < 1440 * count && runs.length < count; i++) {
    d.setMinutes(d.getMinutes() + 1);
    const matches = (
      (minStr === '*' || minStr === String(d.getMinutes()) || (minStr.includes('/') && d.getMinutes() % parseInt(minStr.split('/')[1]) === 0)) &&
      (hourStr === '*' || hourStr === String(d.getHours()) || (hourStr.includes('/') && d.getHours() % parseInt(hourStr.split('/')[1]) === 0))
    );
    if (matches) {
      runs.push(d.toLocaleString());
    }
  }
  return runs;
}

export default function CronParser() {
  const { dict } = useLang();
  const t = dict.tools['cron-parser'];

  const [cron, setCron] = useState('');
  const [description, setDescription] = useState('');
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  const parse = () => {
    const desc = parseCronExpression(cron);
    setDescription(desc);
    setNextRuns(getNextRuns(cron));
  };

  const presets = [
    { label: t.everyMinute, value: '* * * * *' },
    { label: t.everyHour, value: '0 * * * *' },
    { label: t.everyDayMidnight, value: '0 0 * * *' },
    { label: t.everyMondayMorning, value: '0 9 * * 1' },
    { label: t.everyFiveMin, value: '*/5 * * * *' },
    { label: t.everyDayEvening, value: '0 18 * * *' },
    { label: t.firstOfMonth, value: '0 0 1 * *' },
    { label: t.weekdaysMorning, value: '0 8 * * 1-5' },
  ];

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="cron-parser"
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.cronExpression}</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input type="text" value={cron} onChange={e => setCron(e.target.value)}
            placeholder={t.placeholder} style={{ flex: 1, fontFamily: 'monospace', fontSize: 16 }} />
          <button onClick={parse} className="btn btn-primary">{dict.common.parse}</button>
        </div>
      </div>

      {/* Field labels */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20,
        background: 'var(--bg-input)', borderRadius: 8, padding: '10px 16px',
        border: '1px solid var(--border-color)', fontSize: 11, textAlign: 'center', color: 'var(--text-secondary)',
      }}>
        {[`${t.minute} (0-59)`, `${t.hour} (0-23)`, `${t.day} (1-31)`, `${t.month} (1-12)`, `${t.weekday} (0-6)`].map(l => (
          <div key={l}>{l}</div>
        ))}
      </div>

      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>{t.quickPresets}</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {presets.map(p => (
            <button key={p.value} onClick={() => { setCron(p.value); }}
              className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {description && (
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 8, padding: '14px 18px', marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600, marginBottom: 6 }}>{t.humanReadable}</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{description}</div>
          <div style={{ marginTop: 4 }}><CopyButton text={description} /></div>
        </div>
      )}

      {nextRuns.length > 0 && (
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{t.nextRuns.replace('{count}', String(nextRuns.length))}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {nextRuns.map((run, i) => (
              <div key={i} style={{
                background: 'var(--bg-input)', borderRadius: 6, padding: '6px 12px',
                border: '1px solid var(--border-color)', fontSize: 13, fontFamily: 'monospace',
              }}>
                <span style={{ color: 'var(--text-secondary)', marginRight: 8 }}>#{i + 1}</span> {run}
              </div>
            ))}
          </div>
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
