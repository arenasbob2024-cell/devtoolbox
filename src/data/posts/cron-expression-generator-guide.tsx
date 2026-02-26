'use client';

import Link from 'next/link';

/* ────────────────────────────────────────────────────────────────────────── */
/*  Cron Expression Generator & Tester Online — Comprehensive Guide          */
/* ────────────────────────────────────────────────────────────────────────── */

const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 48,
  marginBottom: 16,
  color: 'var(--text-primary)',
  lineHeight: 1.3,
};

const h3Style: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  marginTop: 32,
  marginBottom: 12,
  color: 'var(--text-primary)',
  lineHeight: 1.4,
};

const pStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: 'var(--text-secondary)',
  marginBottom: 16,
};

const codeBlockStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  borderRadius: 8,
  padding: '16px 20px',
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.8,
  marginBottom: 20,
};

const inlineCodeStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 14,
  fontFamily: 'monospace',
  color: 'var(--accent-blue)',
  fontWeight: 600,
};

const thStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 700,
  fontSize: 14,
};

const tdStyle: React.CSSProperties = {
  border: '1px solid var(--border-color)',
  padding: '10px 14px',
  fontSize: 13,
};

const tldrBoxStyle: React.CSSProperties = {
  background: '#f0f9ff',
  border: '2px solid #bae6fd',
  borderRadius: 12,
  padding: '20px 24px',
  marginBottom: 32,
};

const keyTakeawaysStyle: React.CSSProperties = {
  background: '#f8fafc',
  borderRadius: 12,
  padding: '20px 24px',
  marginBottom: 32,
  border: '1px solid #e2e8f0',
};

const tipBoxStyle: React.CSSProperties = {
  background: 'rgba(59,130,246,0.06)',
  border: '1px solid rgba(59,130,246,0.2)',
  borderRadius: 8,
  padding: '14px 18px',
  marginBottom: 20,
  fontSize: 14,
  lineHeight: 1.7,
  color: 'var(--text-secondary)',
};

const warningBoxStyle: React.CSSProperties = {
  background: 'rgba(245,158,11,0.06)',
  border: '1px solid rgba(245,158,11,0.3)',
  borderRadius: 8,
  padding: '14px 18px',
  marginBottom: 20,
  fontSize: 14,
  lineHeight: 1.7,
  color: 'var(--text-secondary)',
};

const ctaBoxStyle: React.CSSProperties = {
  padding: 24,
  background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
  borderRadius: 12,
  border: '1px solid rgba(59,130,246,0.3)',
  textAlign: 'center' as const,
  marginBottom: 36,
  marginTop: 36,
};

const faqItemStyle: React.CSSProperties = {
  marginBottom: 16,
  padding: 16,
  background: 'var(--bg-input)',
  borderRadius: 8,
  border: '1px solid var(--border-color)',
};

export default function CronExpressionGeneratorGuide({ lang }: { lang: string }) {
  const toolLink = `/${lang}/tools/cron-expression-generator`;

  const faqData = [
    {
      q: 'What is a cron expression and how many fields does it have?',
      a: 'A cron expression is a time-based scheduling string used in Unix/Linux systems to define when a job should run. The standard format has 5 fields: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7). Some extended formats like Quartz and AWS CloudWatch use 6 or 7 fields, adding seconds and/or year.',
    },
    {
      q: 'How do I create a cron expression that runs every 5 minutes?',
      a: 'Use the expression */5 * * * *. The */5 in the minute field means "every 5th minute starting from 0". This is equivalent to running at minutes 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, and 55 of every hour.',
    },
    {
      q: 'What is the difference between crontab and systemd timers?',
      a: 'Crontab is the traditional Unix job scheduler using cron expressions. Systemd timers are the modern alternative on Linux systems that use systemd. Key differences: systemd timers support calendar events with friendlier syntax, have built-in logging via journalctl, can depend on other systemd units, support randomized delays, and can persist across reboots. However, crontab is simpler for basic scheduling and works on all Unix-like systems.',
    },
    {
      q: 'Why is my cron job not running at the expected time?',
      a: 'Common causes include: 1) Timezone mismatch - cron uses the system timezone by default, while cloud platforms often use UTC. 2) Missing environment variables - cron runs with a minimal environment, so $PATH may not include expected binaries. 3) Permission issues - the script may lack execute permissions. 4) Syntax errors in the crontab file. 5) The cron daemon (crond) may not be running. Check logs at /var/log/syslog or /var/log/cron for details.',
    },
    {
      q: 'How do I handle timezones in cron jobs?',
      a: 'For system crontab, set the TZ variable at the top of your crontab file (e.g., TZ=America/New_York). For Kubernetes CronJobs (v1.27+), use the timeZone field in the spec. For cloud services like GitHub Actions and Vercel, cron always runs in UTC, so you must convert your desired local time to UTC manually. Using a cron expression generator with timezone support can help avoid mistakes.',
    },
    {
      q: 'Can I use cron expressions in Docker containers?',
      a: 'Yes, but Docker containers do not run a cron daemon by default. You have several options: 1) Install and start crond in your Dockerfile entrypoint. 2) Use a lightweight cron image like supercronic. 3) Use Docker Compose with a dedicated cron service. 4) Use the host system cron to run docker exec commands. For production, consider using Kubernetes CronJobs or a dedicated task scheduler instead.',
    },
    {
      q: 'What does the L character mean in cron expressions?',
      a: 'The L (Last) character is available in extended cron formats like Quartz. In the day-of-month field, L means the last day of the month (28, 29, 30, or 31 depending on the month). In the day-of-week field, it means the last occurrence of a specific day - for example, 5L means the last Friday of the month. Standard Unix cron does not support the L character.',
    },
    {
      q: 'How do I test a cron expression before deploying it?',
      a: 'Use an online cron expression tester or generator that shows the next N execution times for your expression. You can also test locally by: 1) Setting the cron job to run every minute (* * * * *) and verifying the script works. 2) Using the date command in your script to log execution times. 3) Checking cron logs after adding the job. Our free Cron Expression Generator tool shows real-time previews of upcoming runs.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── TL;DR Box ─────────────────────────────────────────────── */}
      <div style={tldrBoxStyle}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#0c4a6e' }}>
          TL;DR
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#1e3a5f', margin: 0 }}>
          A cron expression is a 5-field string (<code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3, fontSize: 13 }}>minute hour day-of-month month day-of-week</code>) that schedules recurring tasks on Unix/Linux systems. Use an online cron expression generator to build, validate, and test schedules visually instead of memorizing syntax. This guide covers cron syntax, 30+ practical examples, special characters, crontab vs systemd timers, cron in Docker and Kubernetes, timezone handling, and debugging techniques.
        </p>
      </div>

      {/* ── Key Takeaways ─────────────────────────────────────────── */}
      <div style={keyTakeawaysStyle}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: 'var(--text-primary)' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, fontSize: 14, color: 'var(--text-secondary)' }}>
          <li>Cron uses a 5-field format: <strong>minute, hour, day-of-month, month, day-of-week</strong></li>
          <li>Special characters <code style={inlineCodeStyle}>*</code> <code style={inlineCodeStyle}>,</code> <code style={inlineCodeStyle}>-</code> <code style={inlineCodeStyle}>/</code> allow flexible scheduling; extended formats add <code style={inlineCodeStyle}>?</code> <code style={inlineCodeStyle}>L</code> <code style={inlineCodeStyle}>W</code> <code style={inlineCodeStyle}>#</code></li>
          <li>Always verify timezone settings &mdash; cloud platforms default to UTC</li>
          <li>Systemd timers offer modern alternatives with better logging and dependency management</li>
          <li>Use <code style={inlineCodeStyle}>flock</code> or lock files to prevent overlapping cron executions</li>
          <li>Kubernetes CronJobs and Docker require specific configuration for cron scheduling</li>
          <li>Test every expression with a cron tester tool before deploying to production</li>
        </ul>
      </div>

      <p style={pStyle}>
        Cron expressions are the backbone of automated task scheduling across Unix, Linux, macOS, and countless cloud platforms. From running database backups every night to triggering CI/CD pipelines on a schedule, cron is everywhere. Yet the terse syntax &mdash; five cryptic fields separated by spaces &mdash; trips up even experienced developers. This comprehensive guide walks you through everything you need to know about cron expressions, from basic syntax to advanced patterns used in Docker, Kubernetes, and serverless platforms.
      </p>

      {/* ── Section 1: Cron Syntax Explained ───────────────────────── */}
      <h2 style={h2Style}>1. Cron Expression Syntax: The 5-Field Format</h2>

      <p style={pStyle}>
        A standard cron expression consists of exactly five fields separated by whitespace. Each field represents a different unit of time, and together they define a precise schedule:
      </p>

      <pre style={codeBlockStyle}>
        <code>{`\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 minute (0 - 59)
\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 hour (0 - 23)
\u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 day of month (1 - 31)
\u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500 month (1 - 12 or JAN-DEC)
\u2502 \u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500 day of week (0 - 7, 0 and 7 = Sunday, or SUN-SAT)
\u2502 \u2502 \u2502 \u2502 \u2502
* * * * *  command_to_execute`}</code>
      </pre>

      <p style={pStyle}>
        Each field accepts specific values, ranges, lists, and step values. The combination of these five fields gives you remarkable flexibility &mdash; you can express anything from &quot;every minute&quot; to &quot;at 2:30 AM on the first Monday of January and July.&quot;
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Field</th>
              <th style={thStyle}>Allowed Values</th>
              <th style={thStyle}>Allowed Special Characters</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Minute', '0 - 59', '* , - /'],
              ['Hour', '0 - 23', '* , - /'],
              ['Day of Month', '1 - 31', '* , - / ? L W'],
              ['Month', '1 - 12 (or JAN - DEC)', '* , - /'],
              ['Day of Week', '0 - 7 (or SUN - SAT)', '* , - / ? L #'],
            ].map(([field, values, chars], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{field}</td>
                <td style={tdStyle}>{values}</td>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)' }}>{chars}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Some extended cron implementations (like Quartz Scheduler and Spring) add a 6th field for seconds at the beginning, and AWS CloudWatch adds a 6th field for year at the end. Always check which format your platform expects.
      </div>

      {/* ── Section 2: Special Characters ───────────────────────────── */}
      <h2 style={h2Style}>2. Special Characters in Cron Expressions</h2>

      <p style={pStyle}>
        The real power of cron comes from its special characters. Understanding these symbols is essential for creating anything beyond the simplest schedules.
      </p>

      <h3 style={h3Style}>Standard Special Characters</h3>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Character</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Meaning</th>
              <th style={thStyle}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['*', 'Asterisk', 'Matches every possible value in the field', '* in hour = every hour'],
              [',', 'Comma', 'Specifies a list of discrete values', '1,15 in day = 1st and 15th'],
              ['-', 'Hyphen', 'Defines an inclusive range of values', '9-17 in hour = 9 AM to 5 PM'],
              ['/', 'Slash', 'Defines step/interval values', '*/10 in minute = every 10 min'],
            ].map(([char, name, meaning, example], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ ...tdStyle, fontWeight: 700, fontSize: 16 }}><code style={{ color: 'var(--accent-blue)' }}>{char}</code></td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{name}</td>
                <td style={tdStyle}>{meaning}</td>
                <td style={tdStyle}><code style={{ fontSize: 12 }}>{example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Extended Special Characters (Quartz / Spring / AWS)</h3>

      <p style={pStyle}>
        These characters are not part of standard Unix cron but are widely used in enterprise schedulers like Quartz, Spring, and cloud platforms:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Character</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Meaning</th>
              <th style={thStyle}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['?', 'Question Mark', 'No specific value; used when one date field constrains the other', '0 0 15 * ? = 15th of every month, any weekday'],
              ['L', 'Last', 'Last day of the month or last weekday occurrence', 'L in day-of-month = last day; 5L = last Friday'],
              ['W', 'Weekday', 'Nearest weekday (Mon-Fri) to the given day', '15W = nearest weekday to the 15th'],
              ['#', 'Hash', 'Nth occurrence of a weekday in the month', '6#3 = third Friday of the month'],
            ].map(([char, name, meaning, example], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ ...tdStyle, fontWeight: 700, fontSize: 16 }}><code style={{ color: 'var(--accent-blue)' }}>{char}</code></td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{name}</td>
                <td style={tdStyle}>{meaning}</td>
                <td style={tdStyle}><code style={{ fontSize: 12 }}>{example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={warningBoxStyle}>
        <strong>Warning:</strong> Mixing standard cron syntax with Quartz-specific characters is a common mistake. Standard Linux crontab does not support <code style={inlineCodeStyle}>?</code>, <code style={inlineCodeStyle}>L</code>, <code style={inlineCodeStyle}>W</code>, or <code style={inlineCodeStyle}>#</code>. Make sure you know which cron implementation your platform uses.
      </div>

      {/* ── Section 3: Common Cron Expression Examples ──────────────── */}
      <h2 style={h2Style}>3. Cron Expression Examples: 30+ Ready-to-Use Schedules</h2>

      <p style={pStyle}>
        Below is a comprehensive table of cron expressions organized by frequency. Each expression is ready to copy and paste into your crontab, CI/CD config, or application scheduler.
      </p>

      <h3 style={h3Style}>Every X Minutes / Hours</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Expression</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['* * * * *', 'Every minute'],
              ['*/2 * * * *', 'Every 2 minutes'],
              ['*/5 * * * *', 'Every 5 minutes'],
              ['*/10 * * * *', 'Every 10 minutes'],
              ['*/15 * * * *', 'Every 15 minutes'],
              ['*/30 * * * *', 'Every 30 minutes'],
              ['0 * * * *', 'Every hour (at minute 0)'],
              ['0 */2 * * *', 'Every 2 hours'],
              ['0 */4 * * *', 'Every 4 hours'],
              ['0 */6 * * *', 'Every 6 hours'],
              ['0 */12 * * *', 'Every 12 hours'],
            ].map(([expr, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{expr}</code></td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Daily Schedules</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Expression</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['0 0 * * *', 'Daily at midnight (00:00)'],
              ['0 6 * * *', 'Daily at 6:00 AM'],
              ['0 8 * * *', 'Daily at 8:00 AM'],
              ['30 9 * * *', 'Daily at 9:30 AM'],
              ['0 12 * * *', 'Daily at noon'],
              ['0 18 * * *', 'Daily at 6:00 PM'],
              ['0 23 * * *', 'Daily at 11:00 PM'],
              ['0 1,13 * * *', 'Twice daily at 1 AM and 1 PM'],
              ['0 0,8,16 * * *', 'Three times daily at midnight, 8 AM, 4 PM'],
            ].map(([expr, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{expr}</code></td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Weekly / Monthly / Yearly Schedules</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Expression</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['0 0 * * 0', 'Every Sunday at midnight'],
              ['0 9 * * 1', 'Every Monday at 9:00 AM'],
              ['0 9 * * 1-5', 'Weekdays (Mon-Fri) at 9:00 AM'],
              ['0 0 * * 6,0', 'Weekends (Sat & Sun) at midnight'],
              ['0 17 * * 5', 'Every Friday at 5:00 PM'],
              ['0 0 1 * *', '1st of every month at midnight'],
              ['0 0 15 * *', '15th of every month at midnight'],
              ['0 0 1,15 * *', '1st and 15th of every month'],
              ['0 0 1 1 *', 'January 1st at midnight (yearly)'],
              ['0 0 1 */3 *', 'Every quarter (1st of Jan, Apr, Jul, Oct)'],
              ['0 0 1 1,4,7,10 *', 'Quarterly on the 1st (explicit months)'],
            ].map(([expr, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{expr}</code></td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
          Build cron expressions visually &mdash; no memorization needed
        </p>
        <Link href={toolLink} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          Try Our Free Cron Expression Generator &rarr;
        </Link>
      </div>

      {/* ── Section 4: Crontab vs Systemd Timers ──────────────────── */}
      <h2 style={h2Style}>4. Crontab vs Systemd Timers: Which Should You Use?</h2>

      <p style={pStyle}>
        On modern Linux distributions, you have two main options for scheduling recurring tasks: the traditional <code style={inlineCodeStyle}>crontab</code> and the newer <code style={inlineCodeStyle}>systemd timers</code>. Both get the job done, but they have important differences.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Crontab</th>
              <th style={thStyle}>Systemd Timers</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Configuration', 'Single crontab file per user', 'Requires .timer + .service unit files'],
              ['Scheduling Syntax', '5-field cron expression', 'Calendar events (OnCalendar) or monotonic (OnBootSec, OnUnitActiveSec)'],
              ['Logging', 'Minimal; check /var/log/syslog', 'Full journalctl integration'],
              ['Dependencies', 'None', 'Can depend on other systemd units'],
              ['Missed Runs', 'Silently skipped', 'Persistent=true catches up after boot'],
              ['Randomized Delay', 'Not supported', 'RandomizedDelaySec supported'],
              ['Portability', 'All Unix/Linux/macOS', 'Linux with systemd only'],
              ['Ease of Setup', 'Simple: one line per job', 'More verbose: two files per job'],
              ['Sub-minute Scheduling', 'Not supported natively', 'Supported with OnUnitActiveSec'],
              ['Environment', 'Minimal $PATH', 'Inherits service environment'],
            ].map(([feature, crontab, systemd], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{crontab}</td>
                <td style={tdStyle}>{systemd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={pStyle}>
        <strong>When to use crontab:</strong> Simple, one-off jobs; environments without systemd (macOS, BSD, Alpine containers); quick prototyping; when portability matters.
      </p>
      <p style={pStyle}>
        <strong>When to use systemd timers:</strong> Production Linux servers; jobs that need dependency management; when you need journalctl logging; jobs that must catch up after downtime; when you need randomized delays to spread load.
      </p>

      <h3 style={h3Style}>Systemd Timer Example</h3>
      <p style={pStyle}>
        Here is how a daily-at-3AM backup looks as a systemd timer:
      </p>

      <pre style={codeBlockStyle}>
        <code>{`# /etc/systemd/system/backup.timer
[Unit]
Description=Daily Backup Timer

[Timer]
OnCalendar=*-*-* 03:00:00
Persistent=true
RandomizedDelaySec=300

[Install]
WantedBy=timers.target`}</code>
      </pre>

      <pre style={codeBlockStyle}>
        <code>{`# /etc/systemd/system/backup.service
[Unit]
Description=Daily Backup Service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh`}</code>
      </pre>

      <pre style={codeBlockStyle}>
        <code>{`# Enable and start the timer
sudo systemctl enable backup.timer
sudo systemctl start backup.timer

# Check timer status
systemctl list-timers --all`}</code>
      </pre>

      {/* ── Section 5: Cron in Docker ──────────────────────────────── */}
      <h2 style={h2Style}>5. Running Cron Jobs in Docker Containers</h2>

      <p style={pStyle}>
        Docker containers do not run a cron daemon by default. If your application needs scheduled tasks inside a container, you have several approaches, each with trade-offs.
      </p>

      <h3 style={h3Style}>Approach 1: Install Cron in the Container</h3>
      <p style={pStyle}>
        Add crond to your Docker image and start it as the main process or alongside your app:
      </p>

      <pre style={codeBlockStyle}>
        <code>{`FROM python:3.12-slim

# Install cron
RUN apt-get update && apt-get install -y cron && rm -rf /var/lib/apt/lists/*

# Add crontab file
COPY crontab /etc/cron.d/app-cron
RUN chmod 0644 /etc/cron.d/app-cron && crontab /etc/cron.d/app-cron

# Create log file
RUN touch /var/log/cron.log

# Start cron and tail the log
CMD cron && tail -f /var/log/cron.log`}</code>
      </pre>

      <pre style={codeBlockStyle}>
        <code>{`# crontab file (crontab)
*/5 * * * * /usr/local/bin/python /app/task.py >> /var/log/cron.log 2>&1`}</code>
      </pre>

      <h3 style={h3Style}>Approach 2: Use Supercronic (Recommended for Docker)</h3>
      <p style={pStyle}>
        Supercronic is a cron implementation designed specifically for containers. It logs to stdout/stderr (so Docker captures the output), handles signals properly, and does not require root:
      </p>

      <pre style={codeBlockStyle}>
        <code>{`FROM python:3.12-slim

# Install supercronic
ENV SUPERCRONIC_URL=https://github.com/aptible/supercronic/releases/download/v0.2.29/supercronic-linux-amd64
RUN curl -fsSL "$SUPERCRONIC_URL" -o /usr/local/bin/supercronic \\
    && chmod +x /usr/local/bin/supercronic

COPY crontab /app/crontab
CMD ["supercronic", "/app/crontab"]`}</code>
      </pre>

      <h3 style={h3Style}>Approach 3: Host-based Scheduling with docker exec</h3>
      <pre style={codeBlockStyle}>
        <code>{`# On the host crontab
*/5 * * * * docker exec my-container python /app/task.py >> /var/log/task.log 2>&1`}</code>
      </pre>

      <div style={tipBoxStyle}>
        <strong>Best Practice:</strong> For production Docker deployments, avoid running cron inside application containers. Instead, use a dedicated sidecar container for cron, or better yet, use an external orchestrator like Kubernetes CronJobs, AWS ECS Scheduled Tasks, or a dedicated job queue (Celery, Bull, Sidekiq).
      </div>

      {/* ── Section 6: Cron in Kubernetes ──────────────────────────── */}
      <h2 style={h2Style}>6. Cron Jobs in Kubernetes</h2>

      <p style={pStyle}>
        Kubernetes has first-class support for cron-based scheduling through the <code style={inlineCodeStyle}>CronJob</code> resource. This is the recommended way to run periodic tasks in a Kubernetes cluster.
      </p>

      <pre style={codeBlockStyle}>
        <code>{`apiVersion: batch/v1
kind: CronJob
metadata:
  name: database-backup
spec:
  schedule: "0 3 * * *"          # Daily at 3 AM
  timeZone: "America/New_York"   # K8s 1.27+ feature
  concurrencyPolicy: Forbid       # Prevent overlapping
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  startingDeadlineSeconds: 200
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: myapp/backup:latest
            command: ["/bin/sh", "-c", "python /app/backup.py"]
            resources:
              requests:
                memory: "256Mi"
                cpu: "100m"
              limits:
                memory: "512Mi"
                cpu: "500m"
          restartPolicy: OnFailure`}</code>
      </pre>

      <p style={pStyle}>
        Key Kubernetes CronJob settings to configure:
      </p>

      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><strong>concurrencyPolicy:</strong> <code style={inlineCodeStyle}>Allow</code> (default), <code style={inlineCodeStyle}>Forbid</code> (skip if previous still running), or <code style={inlineCodeStyle}>Replace</code> (kill previous, start new)</li>
        <li><strong>startingDeadlineSeconds:</strong> How late a job can start after its scheduled time before being considered failed</li>
        <li><strong>timeZone:</strong> Available since Kubernetes 1.27; uses IANA timezone names (e.g., America/New_York)</li>
        <li><strong>suspend:</strong> Set to <code style={inlineCodeStyle}>true</code> to temporarily pause the CronJob without deleting it</li>
        <li><strong>successfulJobsHistoryLimit / failedJobsHistoryLimit:</strong> How many completed/failed Job records to keep</li>
      </ul>

      <pre style={codeBlockStyle}>
        <code>{`# Useful kubectl commands for CronJobs
kubectl get cronjobs                    # List all CronJobs
kubectl describe cronjob database-backup # Detailed status
kubectl get jobs --watch                # Watch job executions
kubectl create job --from=cronjob/database-backup manual-backup  # Trigger manually`}</code>
      </pre>

      {/* ── Section 7: Timezone Handling ───────────────────────────── */}
      <h2 style={h2Style}>7. Timezone Handling in Cron</h2>

      <p style={pStyle}>
        Timezone issues are the single most common source of cron schedule bugs. Different environments handle timezones differently, and a failure to account for this leads to jobs running at the wrong time &mdash; or not running at all.
      </p>

      <h3 style={h3Style}>Timezone Rules by Platform</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Platform</th>
              <th style={thStyle}>Default Timezone</th>
              <th style={thStyle}>How to Change</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Linux crontab', 'System timezone', 'Set TZ=America/New_York at top of crontab'],
              ['GitHub Actions', 'UTC (cannot change)', 'Convert your local time to UTC manually'],
              ['Vercel Cron', 'UTC (cannot change)', 'Convert your local time to UTC manually'],
              ['AWS EventBridge', 'UTC by default', 'CloudFormation supports timezone parameter'],
              ['Kubernetes CronJob', 'UTC by default', 'Use spec.timeZone field (K8s 1.27+)'],
              ['Cloudflare Workers', 'UTC (cannot change)', 'Convert your local time to UTC manually'],
              ['systemd timers', 'System timezone', 'Set Environment="TZ=..." in the service file'],
            ].map(([platform, tz, how], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={tdStyle}>{tz}</td>
                <td style={tdStyle}>{how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Daylight Saving Time (DST) Gotchas</h3>
      <p style={pStyle}>
        DST transitions create two specific problems with cron:
      </p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><strong>Spring Forward:</strong> When clocks jump from 2:00 AM to 3:00 AM, any cron job scheduled between 2:00 and 2:59 AM will be <em>skipped entirely</em> because that time never occurs.</li>
        <li><strong>Fall Back:</strong> When clocks move from 2:00 AM back to 1:00 AM, any cron job scheduled between 1:00 and 1:59 AM may run <em>twice</em> because that hour occurs twice.</li>
      </ul>

      <div style={tipBoxStyle}>
        <strong>Pro Tip:</strong> To avoid DST issues entirely, schedule critical jobs in UTC. If you must use local time, avoid scheduling jobs between 1:00 AM and 3:00 AM, and always verify behavior around DST transitions in your region.
      </div>

      {/* ── Section 8: Debugging Cron Jobs ─────────────────────────── */}
      <h2 style={h2Style}>8. Debugging Cron Jobs: A Systematic Approach</h2>

      <p style={pStyle}>
        When a cron job silently fails, methodical debugging is essential. Here is a step-by-step approach to diagnose common issues.
      </p>

      <h3 style={h3Style}>Step 1: Verify the Cron Daemon is Running</h3>
      <pre style={codeBlockStyle}>
        <code>{`# Check if crond is running
systemctl status cron      # Debian/Ubuntu
systemctl status crond     # CentOS/RHEL
ps aux | grep cron         # Universal check`}</code>
      </pre>

      <h3 style={h3Style}>Step 2: Check Cron Logs</h3>
      <pre style={codeBlockStyle}>
        <code>{`# View cron-specific log entries
grep CRON /var/log/syslog        # Debian/Ubuntu
grep CRON /var/log/cron          # CentOS/RHEL
journalctl -u cron --since today # systemd-based systems`}</code>
      </pre>

      <h3 style={h3Style}>Step 3: Verify Your Crontab Entry</h3>
      <pre style={codeBlockStyle}>
        <code>{`# List current user's crontab
crontab -l

# List crontab for a specific user (root only)
crontab -l -u www-data

# Check system-wide crontab
cat /etc/crontab
ls /etc/cron.d/`}</code>
      </pre>

      <h3 style={h3Style}>Step 4: Test the Command Manually</h3>
      <p style={pStyle}>
        Run the exact command from your crontab entry in a clean environment to ensure it works outside of cron:
      </p>
      <pre style={codeBlockStyle}>
        <code>{`# Simulate cron's minimal environment
env -i HOME=$HOME SHELL=/bin/sh PATH=/usr/bin:/usr/sbin /path/to/your/script.sh`}</code>
      </pre>

      <h3 style={h3Style}>Step 5: Add Comprehensive Logging</h3>
      <pre style={codeBlockStyle}>
        <code>{`# Redirect both stdout and stderr to a log file with timestamps
*/5 * * * * /path/to/script.sh >> /var/log/myjob.log 2>&1

# Or capture the entire environment and output for debugging
* * * * * /bin/bash -c 'date; env; /path/to/script.sh' >> /tmp/cron-debug.log 2>&1`}</code>
      </pre>

      <h3 style={h3Style}>Common Debugging Checklist</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>Is the script executable? (<code style={inlineCodeStyle}>chmod +x script.sh</code>)</li>
        <li>Are you using absolute paths for all commands and files?</li>
        <li>Is the shebang line correct? (<code style={inlineCodeStyle}>#!/bin/bash</code> or <code style={inlineCodeStyle}>#!/usr/bin/env python3</code>)</li>
        <li>Are required environment variables available? (cron does not load .bashrc or .profile)</li>
        <li>Is there a newline at the end of the crontab file? (required by some implementations)</li>
        <li>Are special characters like <code style={inlineCodeStyle}>%</code> escaped? (in crontab, <code style={inlineCodeStyle}>%</code> becomes a newline)</li>
        <li>Is disk space available for output/logs?</li>
        <li>Is MAILTO set? (unset it with <code style={inlineCodeStyle}>MAILTO=&quot;&quot;</code> to disable email notifications)</li>
      </ul>

      <div style={warningBoxStyle}>
        <strong>Important:</strong> The <code style={inlineCodeStyle}>%</code> character in crontab has special meaning &mdash; it is interpreted as a newline. If your command includes <code style={inlineCodeStyle}>%</code> (e.g., in a date format like <code style={inlineCodeStyle}>date +%Y-%m-%d</code>), you must escape it as <code style={inlineCodeStyle}>\%</code> or wrap the command in a shell script.
      </div>

      {/* ── Section 9: Preventing Overlapping Executions ────────────── */}
      <h2 style={h2Style}>9. Preventing Overlapping Cron Executions</h2>

      <p style={pStyle}>
        If a cron job takes longer than its scheduling interval, multiple instances can run simultaneously, causing resource contention, data corruption, or deadlocks. Here are proven techniques to prevent this:
      </p>

      <h3 style={h3Style}>Using flock (Recommended)</h3>
      <pre style={codeBlockStyle}>
        <code>{`# flock ensures only one instance runs at a time
*/5 * * * * /usr/bin/flock -n /tmp/myjob.lock /path/to/script.sh

# With timeout: wait up to 60 seconds for the lock
*/5 * * * * /usr/bin/flock -w 60 /tmp/myjob.lock /path/to/script.sh`}</code>
      </pre>

      <h3 style={h3Style}>Using a PID File</h3>
      <pre style={codeBlockStyle}>
        <code>{`#!/bin/bash
PIDFILE="/tmp/myjob.pid"

# Check if another instance is running
if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
    echo "Job is already running (PID: $(cat $PIDFILE))"
    exit 1
fi

# Write PID and clean up on exit
echo $$ > "$PIDFILE"
trap 'rm -f "$PIDFILE"' EXIT

# Your actual job logic here
/usr/local/bin/process-data.sh`}</code>
      </pre>

      {/* ── Section 10: Cron on Different Platforms ─────────────────── */}
      <h2 style={h2Style}>10. Platform-Specific Cron Syntax Comparison</h2>

      <p style={pStyle}>
        While the core 5-field format is universal, platforms add their own quirks. Here is how the same &quot;every 5 minutes&quot; schedule looks across popular platforms:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          {
            label: 'Standard Linux Crontab',
            code: '*/5 * * * * /usr/local/bin/task.sh >> /var/log/task.log 2>&1',
          },
          {
            label: 'GitHub Actions',
            code: `on:
  schedule:
    - cron: '*/5 * * * *'   # UTC only`,
          },
          {
            label: 'AWS CloudWatch / EventBridge (6 fields)',
            code: 'cron(0/5 * * * ? *)    # Note: uses ? for day-of-week',
          },
          {
            label: 'Kubernetes CronJob',
            code: `spec:
  schedule: "*/5 * * * *"
  timeZone: "America/New_York"   # K8s 1.27+`,
          },
          {
            label: 'Vercel Cron (vercel.json)',
            code: `{
  "crons": [{
    "path": "/api/cron",
    "schedule": "*/5 * * * *"
  }]
}`,
          },
          {
            label: 'Cloudflare Workers (wrangler.toml)',
            code: `[triggers]
crons = ["*/5 * * * *"]`,
          },
        ].map((p, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-primary)', fontSize: 14 }}>{p.label}</strong>
            <pre style={{ ...codeBlockStyle, padding: '8px 12px', margin: '8px 0 0' }}>
              <code>{p.code}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* ── Section 11: Advanced Cron Patterns ─────────────────────── */}
      <h2 style={h2Style}>11. Advanced Cron Patterns and Real-World Use Cases</h2>

      <p style={pStyle}>
        Beyond the basics, here are advanced patterns that solve common real-world scheduling needs:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Use Case</th>
              <th style={thStyle}>Expression</th>
              <th style={thStyle}>Explanation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Database backup (daily 3 AM)', '0 3 * * *', 'Runs once per day at 3:00 AM server time'],
              ['Business hours monitoring', '*/5 9-17 * * 1-5', 'Every 5 min, 9 AM-5 PM, Mon-Fri'],
              ['SSL certificate renewal', '0 0 1,15 * *', 'Twice a month on the 1st and 15th'],
              ['Log rotation (weekly)', '0 0 * * 0', 'Every Sunday at midnight'],
              ['Email digest (weekday morning)', '0 8 * * 1-5', 'Mon-Fri at 8:00 AM'],
              ['Cache cleanup (every 4 hours)', '0 */4 * * *', 'At minute 0 of every 4th hour'],
              ['Health check (every 2 min)', '*/2 * * * *', 'Runs every 2 minutes around the clock'],
              ['Payroll processing (biweekly)', '0 6 1,15 * *', '1st and 15th at 6 AM'],
              ['Night batch processing', '0 2 * * *', 'Daily at 2 AM during low-traffic period'],
              ['Quarterly report generation', '0 9 1 1,4,7,10 *', '9 AM on Jan 1, Apr 1, Jul 1, Oct 1'],
            ].map(([useCase, expr, explanation], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{useCase}</td>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{expr}</code></td>
                <td style={tdStyle}>{explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Section 12: Best Practices ─────────────────────────────── */}
      <h2 style={h2Style}>12. Cron Job Best Practices</h2>

      <p style={pStyle}>
        Follow these battle-tested practices to keep your scheduled jobs reliable and maintainable:
      </p>

      <ol style={{ lineHeight: 2.4, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24, fontSize: 15 }}>
        <li><strong>Always use absolute paths</strong> &mdash; Cron does not load your shell profile, so relative paths and aliases will not work. Use full paths to interpreters, scripts, and data files.</li>
        <li><strong>Redirect output to log files</strong> &mdash; Capture both stdout and stderr with <code style={inlineCodeStyle}>&gt;&gt; /var/log/job.log 2&gt;&amp;1</code> to prevent cron from spamming you with email notifications and to preserve debugging information.</li>
        <li><strong>Set MAILTO explicitly</strong> &mdash; Either set <code style={inlineCodeStyle}>MAILTO=you@example.com</code> for alert notifications or <code style={inlineCodeStyle}>MAILTO=&quot;&quot;</code> to suppress email entirely.</li>
        <li><strong>Prevent overlapping executions</strong> &mdash; Use <code style={inlineCodeStyle}>flock</code> or PID files to ensure only one instance of a job runs at a time.</li>
        <li><strong>Handle timezone explicitly</strong> &mdash; Set TZ in your crontab or use UTC consistently across all environments.</li>
        <li><strong>Test with short intervals first</strong> &mdash; Before deploying a weekly schedule, test with <code style={inlineCodeStyle}>* * * * *</code> (every minute) to confirm the script works correctly under cron.</li>
        <li><strong>Implement health checks and alerts</strong> &mdash; Use monitoring tools (PagerDuty, Healthchecks.io, Cronitor) to detect when scheduled jobs fail or do not run.</li>
        <li><strong>Keep jobs idempotent</strong> &mdash; Design scripts so they produce the same result whether they run once or multiple times. This protects against double execution and retry scenarios.</li>
        <li><strong>Version control your crontab</strong> &mdash; Store crontab entries in your repository and use configuration management (Ansible, Puppet, Chef) to deploy them.</li>
        <li><strong>Add a newline at the end</strong> &mdash; Some cron implementations require a trailing newline in the crontab file. Always add one to be safe.</li>
      </ol>

      {/* ── Second CTA ────────────────────────────────────────────── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
          Stop guessing &mdash; generate and test cron expressions instantly
        </p>
        <Link href={toolLink} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          Open the Cron Expression Generator &rarr;
        </Link>
      </div>

      {/* ── Section 13: FAQ ────────────────────────────────────────── */}
      <h2 style={h2Style}>13. Frequently Asked Questions</h2>

      {faqData.map((item, i) => (
        <div key={i} style={faqItemStyle}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {item.q}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
            {item.a}
          </p>
        </div>
      ))}

      {/* ── Conclusion ─────────────────────────────────────────────── */}
      <h2 style={h2Style}>Conclusion</h2>

      <p style={pStyle}>
        Cron expressions remain one of the most powerful and widely-used scheduling mechanisms in software development. Whether you are automating a simple backup on a single server or orchestrating complex distributed workflows across Kubernetes clusters, understanding cron syntax is a fundamental skill for every developer and operations engineer.
      </p>

      <p style={pStyle}>
        The key to mastering cron is threefold: know the 5-field syntax and special characters, understand the platform-specific quirks for your deployment target, and always test your expressions before deploying to production. Using a cron expression generator and tester eliminates guesswork and prevents the costly mistakes that come from manual expression writing.
      </p>

      <p style={pStyle}>
        Remember to handle timezones explicitly, prevent overlapping executions with locking mechanisms, redirect output for debugging, and monitor your scheduled jobs with external health checks. By following the best practices outlined in this guide, you will build reliable, maintainable automation that runs exactly when you need it to.
      </p>

      <p style={{ ...pStyle, fontWeight: 600, color: 'var(--text-primary)' }}>
        Ready to build your next cron schedule?{' '}
        <Link href={toolLink} style={{ color: 'var(--accent-blue)' }}>
          Try our free Cron Expression Generator
        </Link>{' '}
        to create, validate, and test expressions with a visual interface and real-time previews of upcoming execution times.
      </p>
    </div>
  );
}
