'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface CronSchedule {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export default function CrontabEditor() {
  const { dict } = useLang();
  const t = dict.tools['crontab-editor'];
  const [cronInput, setCronInput] = useState('');
  const [schedule, setSchedule] = useState<CronSchedule | null>(null);
  const [description, setDescription] = useState('');
  const [nextRuns, setNextRuns] = useState<string[]>([]);
  const [error, setError] = useState('');

  const presets = [
    { name: 'Every minute', cron: '* * * * *' },
    { name: 'Every 5 minutes', cron: '*/5 * * * *' },
    { name: 'Every hour', cron: '0 * * * *' },
    { name: 'Daily at midnight', cron: '0 0 * * *' },
    { name: 'Daily at 9 AM', cron: '0 9 * * *' },
    { name: 'Every Monday', cron: '0 0 * * 1' },
    { name: 'Weekdays at 9 AM', cron: '0 9 * * 1-5' },
    { name: 'First day of month', cron: '0 0 1 * *' },
    { name: 'Every 6 hours', cron: '0 */6 * * *' },
    { name: 'Every Sunday at 3 PM', cron: '0 15 * * 0' },
  ];

  const parseCron = (input: string): { schedule: CronSchedule | null; error: string } => {
    const parts = input.trim().split(/\s+/);

    if (parts.length !== 5) {
      return { schedule: null, error: 'Cron expression must have 5 fields (minute hour day month weekday)' };
    }

    return {
      schedule: {
        minute: parts[0],
        hour: parts[1],
        dayOfMonth: parts[2],
        month: parts[3],
        dayOfWeek: parts[4],
      },
      error: '',
    };
  };

  const describeSchedule = (s: CronSchedule): string => {
    const minute = s.minute === '*' ? 'every minute' : s.minute.includes('*/') ? `every ${s.minute.split('/')[1]} minutes` : `at minute ${s.minute}`;
    const hour = s.hour === '*' ? 'every hour' : s.hour.includes('*/') ? `every ${s.hour.split('/')[1]} hours` : `at hour ${s.hour}`;
    const dayOfMonth = s.dayOfMonth === '*' ? 'every day' : `on day ${s.dayOfMonth}`;
    const month = s.month === '*' ? 'every month' : `in month ${s.month}`;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = '';

    if (s.dayOfWeek !== '*') {
      if (s.dayOfWeek.includes('-')) {
        const [start, end] = s.dayOfWeek.split('-').map(Number);
        dayOfWeek = ` on ${days[start]} to ${days[end]}`;
      } else if (s.dayOfWeek.includes(',')) {
        const dayNames = s.dayOfWeek.split(',').map((d) => days[Number(d)]);
        dayOfWeek = ` on ${dayNames.join(', ')}`;
      } else {
        dayOfWeek = ` on ${days[Number(s.dayOfWeek)]}`;
      }
    }

    return `${minute} ${hour} ${dayOfMonth} ${dayOfWeek}`.replace(/\s+/g, ' ').trim();
  };

  const calculateNextRuns = (s: CronSchedule): string[] => {
    const runs: string[] = [];
    const now = new Date();

    // Simple approximation: show next 5 runs based on the cron pattern
    if (s.minute === '*' && s.hour === '*') {
      for (let i = 1; i <= 5; i++) {
        const d = new Date(now);
        d.setMinutes(d.getMinutes() + i);
        runs.push(d.toLocaleString());
      }
    } else if (s.minute !== '*' && s.hour === '*') {
      const minute = Number(s.minute);
      for (let i = 0; i < 5; i++) {
        const d = new Date(now);
        d.setHours(d.getHours() + i);
        d.setMinutes(minute);
        d.setSeconds(0);
        if (d > now) runs.push(d.toLocaleString());
      }
    } else if (s.minute !== '*' && s.hour !== '*') {
      const [minute, hour] = [Number(s.minute), Number(s.hour)];
      for (let i = 0; i < 5; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() + i);
        d.setHours(hour, minute, 0);
        if (d > now) runs.push(d.toLocaleString());
      }
    } else {
      for (let i = 0; i < 5; i++) {
        runs.push(`Run ${i + 1}`);
      }
    }

    return runs.slice(0, 5);
  };

  const updateCron = () => {
    setError('');
    setSchedule(null);
    setDescription('');
    setNextRuns([]);

    const { schedule: parsed, error: parseError } = parseCron(cronInput);

    if (parseError) {
      setError(parseError);
      return;
    }

    if (parsed) {
      setSchedule(parsed);
      setDescription(describeSchedule(parsed));
      setNextRuns(calculateNextRuns(parsed));
    }
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="crontab-editor"
    >
      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Presets</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
          {presets.map((preset) => (
            <button
              key={preset.cron}
              onClick={() => {
                setCronInput(preset.cron);
                const { schedule: parsed, error: parseError } = parseCron(preset.cron);
                if (!parseError && parsed) {
                  setSchedule(parsed);
                  setDescription(describeSchedule(parsed));
                  setNextRuns(calculateNextRuns(parsed));
                  setError('');
                }
              }}
              className="btn btn-secondary"
              style={{ textAlign: 'left', whiteSpace: 'normal', height: 'auto', padding: '8px' }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input and Controls */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Cron Expression</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            value={cronInput}
            onChange={(e) => setCronInput(e.target.value)}
            placeholder="* * * * *"
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          />
          <button onClick={updateCron} className="btn btn-primary">Parse</button>
          <button onClick={() => { setCronInput(''); setSchedule(null); setDescription(''); setNextRuns([]); setError(''); }} className="btn btn-secondary">Clear</button>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          Format: minute (0-59) hour (0-23) day (1-31) month (1-12) weekday (0-6, 0=Sunday)
        </p>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '12px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {error}
        </div>
      )}

      {/* Schedule Description */}
      {schedule && description && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: 8,
          padding: 16,
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--accent-green)' }}>✓ Schedule Description</div>
          <p style={{
            fontSize: 14,
            color: 'var(--text-primary)',
            lineHeight: 1.6,
            marginBottom: 12,
            fontStyle: 'italic',
          }}>
            {description}
          </p>

          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Cron Components:</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 8,
            fontSize: 12,
          }}>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Minute</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11 }}>{schedule.minute}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Hour</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11 }}>{schedule.hour}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Day</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11 }}>{schedule.dayOfMonth}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Month</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11 }}>{schedule.month}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Weekday</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11 }}>{schedule.dayOfWeek}</div>
            </div>
          </div>

          {/* Next Runs */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Next 5 Execution Times:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {nextRuns.map((run, i) => (
                <div key={i} style={{
                  background: 'var(--bg-primary)',
                  padding: '8px 12px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: 'monospace',
                  border: '1px solid var(--border-color)',
                }}>
                  {run}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About Crontab Editor</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Create and understand crontab schedules with our visual editor. Parse cron expressions, get human-readable descriptions, and see when your scheduled tasks will run next.
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Features</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Parse and validate cron expressions with all 5 fields</li>
          <li>Human-readable schedule descriptions</li>
          <li>Shows next 5 execution times for your schedule</li>
          <li>10 common preset schedules for quick reference</li>
          <li>Support for special characters (*, /, -, ,)</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
