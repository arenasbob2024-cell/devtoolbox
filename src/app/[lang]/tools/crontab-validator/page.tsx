'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Crontab Validator',
    description: 'Validate cron expressions, get human-readable explanations, and see the next 5 run times. Common presets included.',
    inputLabel: 'Cron Expression',
    inputPlaceholder: '* * * * *',
    validateBtn: 'Validate',
    clear: 'Clear',
    presetsLabel: 'Common Presets',
    explanationLabel: 'Explanation',
    nextRunsLabel: 'Next 5 Run Times',
    validExpression: 'Valid Expression',
    invalidExpression: 'Invalid Expression',
    fieldLabels: 'Field Reference',
    introTitle: 'Free Online Crontab Validator',
    introText: 'Cron is a time-based job scheduler in Unix-like operating systems. Cron expressions consist of 5 fields: minute, hour, day of month, month, and day of week. This validator checks your cron syntax and provides a human-readable explanation along with the next 5 scheduled run times.',
    tipTitle: 'Cron Expression Tips',
    tip1: 'Use * to match every possible value for a field',
    tip2: 'Use / for step values: */15 in minutes means every 15 minutes',
    tip3: 'Use - for ranges: 1-5 in day of week means Monday through Friday',
    tip4: 'Use , for lists: 1,3,5 in hours means 1am, 3am, and 5am',
    tip5: 'Common presets: @daily = 0 0 * * *, @hourly = 0 * * * *',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a cron expression?',
    faq1a: 'A cron expression is a string consisting of 5 fields separated by spaces that represent a schedule. The fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7, where 0 and 7 are Sunday). Special characters like *, -, /, and , add flexibility.',
    faq2q: 'What does * * * * * mean?',
    faq2a: 'The expression "* * * * *" runs every minute, every hour, every day. Each * means "any value" for that field (minute, hour, day-of-month, month, day-of-week respectively).',
    faq3q: 'How do I schedule a job every 15 minutes?',
    faq3a: 'Use "*/15 * * * *" to run every 15 minutes. The / operator specifies a step value. You can also use "0,15,30,45 * * * *" to explicitly list the minutes.',
    faq4q: 'How do I schedule a job on weekdays only?',
    faq4a: 'Use "0 9 * * 1-5" to run at 9 AM on Monday through Friday (1=Monday, 5=Friday). The day-of-week field uses 0 and 7 for Sunday, 1 for Monday, through 6 for Saturday.',
    faq5q: 'What are the @yearly, @monthly, @weekly, @daily shortcuts?',
    faq5a: '@yearly (or @annually) = 0 0 1 1 * (once a year). @monthly = 0 0 1 * * (first day of each month). @weekly = 0 0 * * 0 (every Sunday). @daily = 0 0 * * * (midnight every day). @hourly = 0 * * * * (start of every hour).',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Crontab 验证器',
    description: '验证 cron 表达式，获取人类可读的说明，并查看接下来5次运行时间。包含常见预设。',
    inputLabel: 'Cron 表达式', inputPlaceholder: '* * * * *',
    validateBtn: '验证', clear: '清除', presetsLabel: '常见预设', explanationLabel: '说明',
    nextRunsLabel: '接下来5次运行时间', validExpression: '有效表达式', invalidExpression: '无效表达式',
    fieldLabels: '字段参考',
    introTitle: '免费在线 Crontab 验证器',
    introText: 'Cron 是 Unix 类操作系统中基于时间的作业调度器。Cron 表达式由5个字段组成：分钟、小时、月份中的日期、月份和星期几。',
    tipTitle: 'Cron 表达式提示', tip1: '使用 * 匹配字段的每个可能值', tip2: '使用 / 表示步进值：分钟中的 */15 表示每15分钟',
    tip3: '使用 - 表示范围：星期中的 1-5 表示周一至周五', tip4: '使用 , 表示列表：小时中的 1,3,5 表示1时、3时和5时',
    tip5: '常见预设：@daily = 0 0 * * *，@hourly = 0 * * * *',
    faqTitle: '常见问题',
    faq1q: '什么是 cron 表达式？', faq1a: 'Cron 表达式是由5个用空格分隔的字段组成的字符串：分钟(0-59)、小时(0-23)、月份中的日期(1-31)、月份(1-12)和星期几(0-7)。',
    faq2q: '* * * * * 是什么意思？', faq2a: '表达式 "* * * * *" 每分钟运行一次。每个 * 表示该字段的"任意值"。',
    faq3q: '如何每15分钟运行一次？', faq3a: '使用 "*/15 * * * *" 每15分钟运行一次。也可以使用 "0,15,30,45 * * * *"。',
    faq4q: '如何只在工作日运行？', faq4a: '使用 "0 9 * * 1-5" 在周一至周五上午9点运行。',
    faq5q: '@yearly、@monthly 等快捷方式是什么？', faq5a: '@yearly=0 0 1 1*，@monthly=0 0 1**，@weekly=0 0**0，@daily=0 0***，@hourly=0****。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'Crontab バリデーター',
    description: 'Cron式を検証し、人間が読める説明と次の5回の実行時刻を表示します。',
    inputLabel: 'Cron式', inputPlaceholder: '* * * * *',
    validateBtn: '検証', clear: 'クリア', presetsLabel: '一般的なプリセット', explanationLabel: '説明',
    nextRunsLabel: '次の5回の実行時刻', validExpression: '有効な式', invalidExpression: '無効な式',
    fieldLabels: 'フィールド参照',
    introTitle: '無料Crontabバリデーター', introText: 'Cronは5つのフィールドからなるスケジュール式で、分、時、日、月、曜日を表します。',
    tipTitle: 'ヒント', tip1: '* は任意の値にマッチ', tip2: '/ はステップ値：分の */15 は15分ごと',
    tip3: '- は範囲：曜日の 1-5 は月曜から金曜', tip4: ', はリスト：時間の 1,3,5 は1時、3時、5時',
    tip5: 'プリセット：@daily = 0 0 * * *、@hourly = 0 * * * *',
    faqTitle: 'よくある質問',
    faq1q: 'Cron式とは何ですか？', faq1a: '5つのフィールドで構成される文字列：分(0-59)、時(0-23)、日(1-31)、月(1-12)、曜日(0-7)。',
    faq2q: '* * * * * は何を意味しますか？', faq2a: '毎分実行を意味します。各*はそのフィールドの任意の値を表します。',
    faq3q: '15分ごとに実行するには？', faq3a: '"*/15 * * * *" を使用します。',
    faq4q: '平日のみ実行するには？', faq4a: '"0 9 * * 1-5" で月曜から金曜の午前9時に実行。',
    faq5q: '@yearly等のショートカットは？', faq5a: '@yearly=0 0 1 1*、@monthly=0 0 1**、@weekly=0 0**0、@daily=0 0***、@hourly=0****。',
    relatedTitle: '関連ツール',
  },
};

const PRESETS = [
  { label: 'Every minute', value: '* * * * *', desc: 'Runs every minute' },
  { label: 'Every 5 minutes', value: '*/5 * * * *', desc: 'Runs every 5 minutes' },
  { label: 'Every 15 minutes', value: '*/15 * * * *', desc: 'Runs every 15 minutes' },
  { label: 'Every hour', value: '0 * * * *', desc: 'Runs at the start of every hour' },
  { label: 'Daily midnight', value: '0 0 * * *', desc: 'Runs at midnight every day' },
  { label: 'Daily 9am', value: '0 9 * * *', desc: 'Runs at 9:00 AM every day' },
  { label: 'Weekdays 9am', value: '0 9 * * 1-5', desc: 'Runs at 9 AM, Monday to Friday' },
  { label: 'Weekly Sunday', value: '0 0 * * 0', desc: 'Runs at midnight every Sunday' },
  { label: 'Monthly 1st', value: '0 0 1 * *', desc: 'Runs at midnight on the 1st of each month' },
  { label: 'Yearly Jan 1st', value: '0 0 1 1 *', desc: 'Runs at midnight on January 1st' },
];

function parseCron(expr: string): { valid: boolean; explanation: string; fields: string[] } {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return { valid: false, explanation: 'Cron expression must have exactly 5 fields', fields: [] };

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  const validateField = (val: string, min: number, max: number): boolean => {
    if (val === '*') return true;
    if (/^\*\/\d+$/.test(val)) return true;
    if (/^\d+$/.test(val)) { const n = parseInt(val); return n >= min && n <= max; }
    if (/^\d+-\d+$/.test(val)) { const [a, b] = val.split('-').map(Number); return a >= min && b <= max && a <= b; }
    if (/^[\d,]+$/.test(val)) return val.split(',').every(v => { const n = parseInt(v); return n >= min && n <= max; });
    return false;
  };

  const valid = validateField(minute, 0, 59) && validateField(hour, 0, 23) &&
    validateField(dayOfMonth, 1, 31) && validateField(month, 1, 12) && validateField(dayOfWeek, 0, 7);

  if (!valid) return { valid: false, explanation: 'Invalid cron expression syntax', fields: parts };

  const descField = (val: string, unit: string, names?: string[]) => {
    if (val === '*') return `every ${unit}`;
    if (/^\*\/(\d+)$/.test(val)) return `every ${val.split('/')[1]} ${unit}s`;
    if (/^\d+-\d+$/.test(val)) {
      const [a, b] = val.split('-').map(Number);
      if (names) return `${names[a] || a} through ${names[b] || b}`;
      return `${a} to ${b}`;
    }
    if (/^[\d,]+$/.test(val)) {
      const nums = val.split(',').map(Number);
      return nums.map(n => names ? names[n] || n : n).join(', ');
    }
    return val;
  };

  const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const explanation = `Runs at minute ${descField(minute, 'minute')}, ${descField(hour, 'hour')}, on ${descField(dayOfMonth, 'day')} of ${descField(month, 'month', monthNames)}, ${descField(dayOfWeek, 'day of week', dayNames)}`;
  return { valid: true, explanation, fields: parts };
}

function getNextRuns(expr: string, count: number): string[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const results: string[] = [];
  let d = new Date();
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  let attempts = 0;
  const matchField = (val: string, num: number): boolean => {
    if (val === '*') return true;
    if (/^\*\/(\d+)$/.test(val)) return num % parseInt(val.split('/')[1]) === 0;
    if (/^\d+$/.test(val)) return parseInt(val) === num;
    if (/^\d+-\d+$/.test(val)) { const [a, b] = val.split('-').map(Number); return num >= a && num <= b; }
    if (/^[\d,]+$/.test(val)) return val.split(',').map(Number).includes(num);
    return false;
  };
  while (results.length < count && attempts < 50000) {
    attempts++;
    const [m, h, dom, mo, dow] = parts;
    if (matchField(m, d.getMinutes()) && matchField(h, d.getHours()) &&
      matchField(dom, d.getDate()) && matchField(mo, d.getMonth() + 1) && matchField(dow, d.getDay())) {
      results.push(d.toLocaleString());
    }
    d = new Date(d.getTime() + 60000);
  }
  return results;
}

export default function CrontabValidator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState<{ valid: boolean; explanation: string; nextRuns: string[]; fields: string[] } | null>(null);

  const handleValidate = () => {
    const parsed = parseCron(expr);
    const nextRuns = parsed.valid ? getNextRuns(expr, 5) : [];
    setResult({ ...parsed, nextRuns });
  };

  const FIELD_LABELS = [
    { name: 'Minute', range: '0-59' },
    { name: 'Hour', range: '0-23' },
    { name: 'Day of Month', range: '1-31' },
    { name: 'Month', range: '1-12' },
    { name: 'Day of Week', range: '0-7' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="crontab-validator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.inputLabel}</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input type="text" value={expr} onChange={e => setExpr(e.target.value)} placeholder={t.inputPlaceholder}
            onKeyDown={e => e.key === 'Enter' && handleValidate()}
            style={{ flex: 1, padding: '10px 14px', fontSize: 20, fontFamily: 'monospace', letterSpacing: 4, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
          <button onClick={handleValidate} className="btn btn-primary">{t.validateBtn}</button>
          <button onClick={() => { setExpr(''); setResult(null); }} className="btn btn-secondary">{t.clear}</button>
        </div>
        {/* Field labels */}
        <div style={{ display: 'flex', gap: 4, marginTop: 6, paddingLeft: 0 }}>
          {FIELD_LABELS.map((f, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-secondary)', background: 'var(--bg-input)', padding: '3px 0', borderRadius: 4 }}>
              <div style={{ fontWeight: 600 }}>{f.name}</div>
              <div>{f.range}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{t.presetsLabel}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 6 }}>
          {PRESETS.map(p => (
            <button key={p.value} onClick={() => { setExpr(p.value); setResult(null); }}
              className="btn btn-ghost"
              style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 12px', background: expr === p.value ? 'rgba(59,130,246,0.1)' : undefined, border: expr === p.value ? '1px solid var(--accent-blue)' : undefined }}>
              <code style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{p.value}</code>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${result.valid ? '#22c55e' : '#ef4444'}`, background: result.valid ? '#22c55e10' : '#ef444410', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: result.valid ? 8 : 0 }}>
              <span style={{ fontSize: 18 }}>{result.valid ? '✓' : '✗'}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: result.valid ? '#22c55e' : '#ef4444' }}>
                {result.valid ? t.validExpression : t.invalidExpression}
              </span>
            </div>
            {result.valid && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--text-primary)' }}>{t.explanationLabel}:</strong> {result.explanation}
              </div>
            )}
            {!result.valid && (
              <div style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>{result.explanation}</div>
            )}
          </div>

          {result.valid && result.nextRuns.length > 0 && (
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.nextRunsLabel}</div>
                <CopyButton text={result.nextRuns.join('\n')} />
              </div>
              {result.nextRuns.map((run, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < result.nextRuns.length - 1 ? '1px solid var(--border-color)' : undefined }}>
                  <span style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700, minWidth: 20 }}>#{i + 1}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{run}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/timestamp-converter`, label: 'Timestamp Converter' },
            { href: `/${lang}/tools/regex-tester`, label: 'Regex Tester' },
            { href: `/${lang}/tools/chmod-calculator`, label: 'Chmod Calculator' },
            { href: `/${lang}/tools/git-ignore-generator`, label: '.gitignore Generator' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
