import Link from 'next/link';

export default function CronExpressionExamples({ lang }: { lang: string }) {
  const t: Record<string, Record<string, string>> = {
    en: {
      title: 'Cron Expression Examples: Every 5 Minutes, Daily, Weekly, Monthly',
      intro: 'Cron expressions are the standard way to schedule recurring tasks on Unix/Linux systems. This guide covers the most common cron patterns with ready-to-use examples.',
      syntaxTitle: 'Cron Syntax Overview',
      syntaxDesc: 'A standard cron expression has 5 fields:',
      fieldMinute: 'Minute (0-59)',
      fieldHour: 'Hour (0-23)',
      fieldDay: 'Day of month (1-31)',
      fieldMonth: 'Month (1-12)',
      fieldWeekday: 'Day of week (0-7, where 0 and 7 = Sunday)',
      quickRefTitle: 'Quick Reference: Common Cron Expressions',
      specialCharsTitle: 'Special Characters Explained',
      charStar: '* (asterisk) — Matches every possible value for that field',
      charSlash: '/ (slash) — Step value. */5 means "every 5 units"',
      charComma: ', (comma) — List of values. 1,3,5 means "1, 3, and 5"',
      charDash: '- (dash) — Range. 1-5 means "1 through 5"',
      platformTitle: 'Platform Differences',
      platformStandard: 'Standard cron (crontab): 5 fields (minute hour day month weekday)',
      platformAws: 'AWS CloudWatch/EventBridge: 6 fields, adds year; uses "?" for day-of-week or day-of-month',
      platformGithub: 'GitHub Actions: Standard 5 fields in schedule.cron, uses UTC',
      platformK8s: 'Kubernetes CronJob: Standard 5 fields',
      mistakesTitle: 'Common Mistakes to Avoid',
      mistake1: 'Forgetting timezone — Cron runs in the system timezone unless configured otherwise. CI/CD platforms often use UTC.',
      mistake2: 'Using * * * * * (every minute) — This runs 1,440 times per day. Make sure you mean it!',
      mistake3: 'Confusing day-of-week values — Sunday is 0 (or 7) in standard cron, but 1 in some systems.',
      mistake4: 'Not logging output — Redirect stdout/stderr: */5 * * * * /script.sh >> /var/log/cron.log 2>&1',
      mistake5: 'Overlapping runs — If a job takes longer than the interval, use flock or a lock file.',
      tryTool: 'Test your cron expressions interactively',
      faq1q: 'How do I schedule a cron job every 5 minutes?',
      faq1a: 'Use */5 * * * * — the */5 in the minute field means "every 5th minute".',
      faq2q: 'What does 0 0 * * * mean?',
      faq2a: 'It runs at midnight (00:00) every day. The first 0 is the minute, the second 0 is the hour.',
      faq3q: 'How do I run a cron job every Monday at 9am?',
      faq3a: 'Use 0 9 * * 1 — minute=0, hour=9, any day, any month, weekday=1 (Monday).',
      faq4q: 'What is the difference between */5 and 0/5?',
      faq4a: 'In standard cron they are equivalent — both mean "every 5th minute". Some platforms like AWS support 0/5 syntax specifically.',
      faq5q: 'Can I specify both day-of-month and day-of-week?',
      faq5a: 'In standard cron, if both are set (not *), the job runs when EITHER matches. AWS CloudWatch requires "?" for one of them.',
    },
    zh: {
      title: 'Cron 表达式实例：每5分钟、每天、每周、每月',
      intro: 'Cron 表达式是在 Unix/Linux 系统上安排周期任务的标准方式。本指南涵盖最常用的 cron 模式和即用示例。',
      syntaxTitle: 'Cron 语法概览',
      syntaxDesc: '标准 cron 表达式有 5 个字段：',
      fieldMinute: '分钟 (0-59)', fieldHour: '小时 (0-23)', fieldDay: '日 (1-31)', fieldMonth: '月 (1-12)', fieldWeekday: '星期 (0-7，0和7=周日)',
      quickRefTitle: '快速参考：常用 Cron 表达式',
      specialCharsTitle: '特殊字符说明',
      charStar: '* (星号) — 匹配该字段的每个可能值',
      charSlash: '/ (斜杠) — 步长值。*/5 表示"每5个单位"',
      charComma: ', (逗号) — 值列表。1,3,5 表示"1、3和5"',
      charDash: '- (破折号) — 范围。1-5 表示"1到5"',
      platformTitle: '平台差异', platformStandard: '标准 cron (crontab): 5 个字段', platformAws: 'AWS CloudWatch/EventBridge: 6 个字段，新增年份字段', platformGithub: 'GitHub Actions: 标准 5 字段，使用 UTC', platformK8s: 'Kubernetes CronJob: 标准 5 字段',
      mistakesTitle: '常见错误',
      mistake1: '忘记时区 — Cron 默认使用系统时区。CI/CD 平台通常使用 UTC。',
      mistake2: '使用 * * * * *（每分钟）— 每天运行 1440 次，确保你真的需要！',
      mistake3: '混淆星期值 — 标准 cron 中周日是 0（或 7），某些系统是 1。',
      mistake4: '不记录输出 — 重定向输出：*/5 * * * * /script.sh >> /var/log/cron.log 2>&1',
      mistake5: '运行重叠 — 如果任务耗时超过间隔，使用 flock 或锁文件。',
      tryTool: '交互式测试你的 cron 表达式',
      faq1q: '如何设置每5分钟运行？', faq1a: '使用 */5 * * * * — 分钟字段的 */5 表示"每第5分钟"。',
      faq2q: '0 0 * * * 是什么意思？', faq2a: '每天午夜（00:00）运行。第一个 0 是分钟，第二个 0 是小时。',
      faq3q: '如何在每周一上午9点运行？', faq3a: '使用 0 9 * * 1 — 分钟=0，小时=9，任意日，任意月，星期=1（周一）。',
      faq4q: '*/5 和 0/5 有什么区别？', faq4a: '标准 cron 中它们等价 — 都表示"每第5分钟"。AWS 等平台特别支持 0/5 语法。',
      faq5q: '可以同时指定日期和星期吗？', faq5a: '标准 cron 中，如果两者都设置（非*），任一匹配时任务就会运行。AWS CloudWatch 要求其中一个使用 "?"。',
    },
  };
  const ct = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

  const cronExamples = [
    ['* * * * *', 'Every minute'],
    ['*/5 * * * *', 'Every 5 minutes'],
    ['*/15 * * * *', 'Every 15 minutes'],
    ['*/30 * * * *', 'Every 30 minutes'],
    ['0 * * * *', 'Every hour (at minute 0)'],
    ['0 */2 * * *', 'Every 2 hours'],
    ['0 */6 * * *', 'Every 6 hours'],
    ['0 0 * * *', 'Daily at midnight'],
    ['0 6 * * *', 'Daily at 6:00 AM'],
    ['30 8 * * *', 'Daily at 8:30 AM'],
    ['0 0 * * 0', 'Weekly (Sunday midnight)'],
    ['0 9 * * 1', 'Every Monday at 9:00 AM'],
    ['0 9 * * 1-5', 'Weekdays at 9:00 AM'],
    ['0 0 1 * *', 'First of every month (midnight)'],
    ['0 0 1 1 *', 'January 1st (midnight)'],
    ['0 0 1 */3 *', 'Every 3 months (quarterly)'],
    ['0 0 * * 1,4', 'Monday and Thursday at midnight'],
    ['0 8-17 * * 1-5', 'Every hour 8AM-5PM, weekdays'],
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <h2 style={h2Style}>{ct.syntaxTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.syntaxDesc}</p>

      <pre style={codeStyle}><code>{`┌───────────── ${ct.fieldMinute}
│ ┌─────────── ${ct.fieldHour}
│ │ ┌───────── ${ct.fieldDay}
│ │ │ ┌─────── ${ct.fieldMonth}
│ │ │ │ ┌───── ${ct.fieldWeekday}
│ │ │ │ │
* * * * *  command_to_execute`}</code></pre>

      <h2 style={h2Style}>{ct.quickRefTitle}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Expression</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {cronExamples.map(([expr, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{expr}</code></td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.specialCharsTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><code style={{ color: 'var(--accent-blue)' }}>*</code> — {ct.charStar}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>/</code> — {ct.charSlash}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>,</code> — {ct.charComma}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>-</code> — {ct.charDash}</li>
      </ul>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Examples with special characters:</h3>
      <pre style={codeStyle}><code>{`# Every 5 minutes
*/5 * * * *

# At minutes 0, 15, 30, 45 of every hour
0,15,30,45 * * * *

# Every weekday (Monday-Friday) at 9 AM
0 9 * * 1-5

# Every Monday and Friday at 6 PM
0 18 * * 1,5

# Every 3 hours on weekdays
0 */3 * * 1-5`}</code></pre>

      <h2 style={h2Style}>{ct.platformTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Standard cron', desc: ct.platformStandard, code: '*/5 * * * * /path/to/script.sh' },
          { label: 'AWS EventBridge', desc: ct.platformAws, code: 'cron(0/5 * * * ? *)' },
          { label: 'GitHub Actions', desc: ct.platformGithub, code: "schedule:\n  - cron: '*/5 * * * *'" },
          { label: 'Kubernetes', desc: ct.platformK8s, code: 'spec:\n  schedule: "*/5 * * * *"' },
        ].map((p, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{p.label}</strong>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 8px', lineHeight: 1.5 }}>{p.desc}</p>
            <pre style={{ ...codeStyle, padding: '8px 12px', margin: 0 }}><code>{p.code}</code></pre>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{ct.mistakesTitle}</h2>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.mistake1}</li>
        <li>{ct.mistake2}</li>
        <li>{ct.mistake3}</li>
        <li>{ct.mistake4}</li>
        <li>{ct.mistake5}</li>
      </ul>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTool}</p>
        <Link href={`/${lang}/tools/cron-parser`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          Cron Expression Parser →
        </Link>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
