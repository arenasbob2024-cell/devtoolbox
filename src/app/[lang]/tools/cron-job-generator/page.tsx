'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CronJobGenerator() {
  const { dict } = useLang();
  const t = dict.tools['cron-job-generator'];

  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('0');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [cronExpression, setCronExpression] = useState('0 0 * * *');

  const generateCronExpression = () => {
    const expr = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`;
    setCronExpression(expr);
  };

  const getHumanReadable = () => {
    const parts = cronExpression.split(' ');
    if (parts.length !== 5) return 'Invalid cron expression';

    const [m, h, d, mo, dow] = parts;
    const messages = [];

    if (m === '0' && h === '0') messages.push('Every day at midnight');
    else if (m === '0' && h !== '*') messages.push(`Every day at ${h}:00`);
    else if (m !== '*') messages.push(`At minute ${m}`);
    else messages.push('Every minute');

    if (h !== '*' && h !== '0') messages.push(`and hour ${h}`);
    if (d !== '*' && d !== '1') messages.push(`on day ${d}`);
    if (mo !== '*') messages.push(`in month ${mo}`);
    if (dow !== '*') messages.push(`on ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][parseInt(dow)]}`);

    return messages.join(' ') || cronExpression;
  };

  const getNextRuns = () => {
    const runs = [];
    const now = new Date();
    let count = 0;
    const checkDate = new Date(now);

    while (count < 5 && checkDate.getFullYear() === now.getFullYear()) {
      checkDate.setMinutes(checkDate.getMinutes() + 1);
      if (matchesCron(checkDate)) {
        runs.push(checkDate.toLocaleString());
        count++;
      }
      if (checkDate > new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)) break;
    }
    return runs;
  };

  const matchesCron = (date: Date): boolean => {
    const parts = cronExpression.split(' ');
    if (parts.length !== 5) return false;

    const m = parseInt(parts[0]);
    const h = parseInt(parts[1]);
    const d = parseInt(parts[2]);
    const mo = parseInt(parts[3]);
    const dow = parseInt(parts[4]);

    return (parts[0] === '*' || date.getMinutes() === m) &&
           (parts[1] === '*' || date.getHours() === h) &&
           (parts[2] === '*' || date.getDate() === d) &&
           (parts[3] === '*' || date.getMonth() + 1 === mo) &&
           (parts[4] === '*' || date.getDay() === dow);
  };

  const applyPreset = (preset: string) => {
    const presets: { [key: string]: [string, string, string, string, string] } = {
      'every-minute': ['*', '*', '*', '*', '*'],
      'hourly': ['0', '*', '*', '*', '*'],
      'daily': ['0', '0', '*', '*', '*'],
      'weekly': ['0', '0', '*', '*', '0'],
      'monthly': ['0', '0', '1', '*', '*'],
    };

    if (presets[preset]) {
      const [m, h, d, mo, dow] = presets[preset];
      setMinute(m);
      setHour(h);
      setDay(d);
      setMonth(mo);
      setDayOfWeek(dow);
      setCronExpression(`${m} ${h} ${d} ${mo} ${dow}`);
    }
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="cron-job-generator"
    >
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <button onClick={() => applyPreset('every-minute')} className="btn btn-secondary">Every Minute</button>
          <button onClick={() => applyPreset('hourly')} className="btn btn-secondary">Hourly</button>
          <button onClick={() => applyPreset('daily')} className="btn btn-secondary">Daily</button>
          <button onClick={() => applyPreset('weekly')} className="btn btn-secondary">Weekly</button>
          <button onClick={() => applyPreset('monthly')} className="btn btn-secondary">Monthly</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Minute</label>
            <input type="text" value={minute} onChange={e => setMinute(e.target.value)} placeholder="0-59 or *" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Hour</label>
            <input type="text" value={hour} onChange={e => setHour(e.target.value)} placeholder="0-23 or *" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Day</label>
            <input type="text" value={day} onChange={e => setDay(e.target.value)} placeholder="1-31 or *" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Month</label>
            <input type="text" value={month} onChange={e => setMonth(e.target.value)} placeholder="1-12 or *" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Day of Week</label>
            <input type="text" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} placeholder="0-6 or *" style={{ width: '100%' }} />
          </div>
        </div>

        <button onClick={generateCronExpression} className="btn btn-primary" style={{ marginBottom: 16 }}>Generate Expression</button>

        <div style={{ 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--border-color)', 
          borderRadius: 8, 
          padding: 14, 
          marginBottom: 16,
          fontFamily: 'monospace',
          fontSize: 14
        }}>
          <div style={{ marginBottom: 8 }}><strong>Cron Expression:</strong></div>
          <div style={{ fontSize: 16, color: 'var(--accent-color)', marginBottom: 12 }}>{cronExpression}</div>
          <CopyButton text={cronExpression} />
        </div>

        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)', 
          border: '1px solid rgba(59, 130, 246, 0.3)', 
          borderRadius: 8, 
          padding: 12, 
          marginBottom: 16,
          fontSize: 13
        }}>
          <strong>Description:</strong> {getHumanReadable()}
        </div>

        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Next 5 Run Times</h3>
          <ul style={{ fontSize: 13, lineHeight: 2, paddingLeft: 20 }}>
            {getNextRuns().map((time, i) => (
              <li key={i}>{time}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
