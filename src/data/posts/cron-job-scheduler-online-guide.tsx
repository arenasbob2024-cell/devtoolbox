'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Cron Job Scheduler: Schedule Tasks with Cron Expressions — Complete Guide',
    description: 'Schedule tasks with cron expressions. Complete guide covering cron syntax, Node.js node-cron, Bun/Deno, Python schedule & APScheduler, Linux crontab, Next.js Vercel Cron, GitHub Actions, distributed queues, and monitoring.',
  },
  zh: {
    title: 'Cron任务调度器：使用Cron表达式调度任务完整指南',
    description: '使用Cron表达式调度任务。含Cron语法、Node.js node-cron、Bun/Deno、Python schedule与APScheduler、Linux crontab、Next.js Vercel Cron、GitHub Actions、分布式队列和监控的完整指南。',
  },
};

export default function CronJobSchedulerOnlineGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does the cron expression * * * * * mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The expression * * * * * represents five fields separated by spaces: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7, where both 0 and 7 are Sunday). A * in any field means "every valid value." So * * * * * runs a job every single minute of every hour of every day. A more practical example: 0 2 * * * runs at 2:00 AM every day; 30 8 * * 1 runs at 8:30 AM every Monday.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the special cron strings like @daily and @hourly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most cron implementations support shorthand strings: @reboot (run once at startup), @yearly or @annually (0 0 1 1 *), @monthly (0 0 1 * *), @weekly (0 0 * * 0), @daily or @midnight (0 0 * * *), and @hourly (0 * * * *). These are more readable than raw cron expressions for common schedules. Not all cron schedulers support them — node-cron and APScheduler do, but raw Linux crontab only supports @reboot, @yearly, @annually, @monthly, @weekly, @daily, @midnight, and @hourly.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I run a cron job every 5 minutes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the step value syntax with a slash: */5 * * * * runs every 5 minutes. Similarly, */15 * * * * runs every 15 minutes, and */30 * * * * runs every 30 minutes. For every 2 hours, use 0 */2 * * *. The step syntax can also be combined with ranges: 0-30/5 * * * * runs every 5 minutes within the first 30 minutes of each hour. In node-cron and most modern schedulers, you can also use seconds as a sixth field: */5 * * * * * runs every 5 seconds.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle timezone-aware cron jobs in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In node-cron, pass the timezone option: cron.schedule("0 9 * * *", handler, { timezone: "America/New_York" }). This uses IANA timezone names (e.g., "Europe/London", "Asia/Tokyo"). Without a timezone, node-cron uses the system timezone of the server, which can cause unexpected behavior in cloud environments. Always explicitly set the timezone for production jobs. The node-cron package relies on the system\'s IANA timezone database — ensure your server has tzdata installed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between node-cron and node-schedule?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'node-cron (github.com/node-cron/node-cron) uses standard cron expression syntax and runs tasks within the Node.js process. node-schedule (github.com/node-schedule/node-schedule) supports cron expressions plus Date objects and recurrence rules, making it more flexible for one-time future tasks. For simple recurring schedules, node-cron is lighter and more straightforward. For complex scheduling logic (e.g., "every third Tuesday of odd months"), node-schedule or Agenda.js are better choices. Neither persists jobs across restarts — for persistence, use a database-backed scheduler like pg-boss or BullMQ.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prevent cron job overlap — what if the previous run is still executing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Job overlap occurs when a cron job is triggered again before the previous execution finishes. Solutions: (1) Use a mutex or distributed lock (Redis SETNX or Redlock) to skip execution if another instance is running. (2) In node-cron, use scheduled: false and call start() manually, tracking state with a boolean. (3) For APScheduler in Python, set max_instances=1 on the job. (4) In BullMQ, jobs are queued and processed one at a time per worker. (5) In pg-boss, jobs can use singleton keys to prevent duplicates. Always add timeout detection to release stuck locks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do GitHub Actions scheduled workflows work with cron?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GitHub Actions supports scheduled triggers via the schedule event with cron syntax: on: { schedule: [{ cron: "0 8 * * 1" }] }. Note: GitHub uses UTC timezone — always convert local times to UTC. Cron jobs on public repositories may be delayed during high load periods. GitHub may skip scheduled workflows on repos with no commits in 60 days. Important: the minimum interval is 5 minutes (* * * * * is not allowed). For reliability-critical jobs, add workflow_dispatch so you can trigger manually, and use actions/checkout with a specific ref to pin to known-good code.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best way to monitor cron jobs and get alerted on failures?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most reliable pattern is the "dead man\'s switch" or heartbeat check: your cron job pings a monitoring service (like Healthchecks.io or Dead Man\'s Snitch) on successful completion. If the ping is not received within the expected window, the service sends an alert. Implementation: add a curl or HTTP request at the end of your script: curl -fsS --retry 3 "https://hc-ping.com/YOUR-UUID". For failures, ping the /fail endpoint. This approach catches silent failures, timeouts, and server crashes — not just script errors. Tools: Healthchecks.io (free tier available), Dead Man\'s Snitch, Cronitor, OpsGenie, and Grafana alerting.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/cron-job-scheduler-online-guide" />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>cron expression</strong> has five fields — minute, hour, day-of-month, month, day-of-week — and
          controls when a scheduled task runs. In <strong>Node.js</strong>, use <code>node-cron</code> with a timezone
          option. In <strong>Python</strong>, use <code>schedule</code> for simple jobs or <code>APScheduler</code> for
          production workloads. On <strong>Linux</strong>, edit <code>crontab -e</code> or drop scripts into{' '}
          <code>/etc/cron.d/</code>. For <strong>serverless</strong> environments use Vercel Cron or GitHub Actions
          schedule. For <strong>distributed systems</strong>, prefer a queue-backed scheduler like pg-boss or BullMQ
          to guarantee exactly-once execution. Always <strong>monitor</strong> jobs with a dead man&apos;s switch pattern.
          Use our{' '}
          <Link href={`/${lang}/tools/cron-expression`} style={{ color: '#0284c7' }}>
            online cron expression tester
          </Link>{' '}
          to validate any schedule instantly.
        </p>
      </div>

      {/* Section 1: Cron Syntax */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Cron Expression Syntax — The Five (and Six) Field Format
      </h2>
      <p>
        A standard cron expression contains <strong>five whitespace-separated fields</strong>. Each field represents a
        time unit, and the scheduler fires the job when all fields match the current time simultaneously.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Field</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Position</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Allowed Values</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Special Characters</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Minute', '1st', '0 – 59', '* , - /'],
              ['Hour', '2nd', '0 – 23', '* , - /'],
              ['Day of Month', '3rd', '1 – 31', '* , - / ? L W'],
              ['Month', '4th', '1 – 12 or JAN–DEC', '* , - /'],
              ['Day of Week', '5th', '0 – 7 (0 and 7 = Sunday) or SUN–SAT', '* , - / ? L #'],
            ].map(([field, pos, vals, special], i) => (
              <tr key={field} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>{field}</strong></td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{pos}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>{vals}</code></td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>{special}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Special Characters
      </h3>
      <ul>
        <li><code>*</code> — matches every value in the field (wildcard)</li>
        <li><code>,</code> — list separator: <code>1,3,5</code> in the day-of-week field means Mon, Wed, Fri</li>
        <li><code>-</code> — range: <code>9-17</code> in the hour field means 9 AM through 5 PM</li>
        <li><code>/</code> — step: <code>*/15</code> in minutes means every 15 minutes; <code>0/5</code> means 0, 5, 10, …</li>
        <li><code>?</code> — no specific value (used in day-of-month or day-of-week to avoid conflicts in Quartz-style cron)</li>
        <li><code>L</code> — last: <code>L</code> in day-of-month means last day of month; <code>5L</code> means last Friday</li>
        <li><code>W</code> — nearest weekday: <code>15W</code> means the weekday nearest to the 15th</li>
        <li><code>#</code> — nth weekday: <code>2#3</code> means the third Monday of the month</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Common Cron Expressions Reference Table
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Expression</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['* * * * *', 'Every minute'],
              ['*/5 * * * *', 'Every 5 minutes'],
              ['0 * * * *', 'Every hour (at :00)'],
              ['0 0 * * *', 'Every day at midnight (UTC)'],
              ['0 9 * * 1-5', 'Weekdays at 9:00 AM'],
              ['0 2 * * *', 'Every day at 2:00 AM'],
              ['30 8 * * 1', 'Every Monday at 8:30 AM'],
              ['0 0 1 * *', 'First day of each month at midnight'],
              ['0 0 1 1 *', 'January 1st at midnight (yearly)'],
              ['0 */6 * * *', 'Every 6 hours'],
              ['0 9-17 * * 1-5', 'Every hour from 9 AM to 5 PM, weekdays'],
              ['*/15 9-17 * * 1-5', 'Every 15 min during business hours'],
            ].map(([expr, meaning], i) => (
              <tr key={expr} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>{expr}</code></td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Special Strings
      </h3>
      <p>Many schedulers accept human-readable aliases that expand to standard expressions:</p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`@reboot      # Run once, at startup
@yearly      # 0 0 1 1 *    — once a year
@annually    # 0 0 1 1 *    — same as @yearly
@monthly     # 0 0 1 * *    — first of every month
@weekly      # 0 0 * * 0    — every Sunday at midnight
@daily       # 0 0 * * *    — every day at midnight
@midnight    # 0 0 * * *    — same as @daily
@hourly      # 0 * * * *    — every hour`}</code>
      </pre>

      <p>
        Validate any expression instantly with the{' '}
        <Link href={`/${lang}/tools/cron-expression`} style={{ color: '#0284c7' }}>
          DevToolBox cron expression tester
        </Link>
        , which shows the next 10 run times and describes the schedule in plain English.
      </p>

      {/* Section 2: Node.js node-cron */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Node.js Cron Scheduling with node-cron
      </h2>
      <p>
        <strong>node-cron</strong> is the most popular Node.js scheduling library with over 3 million weekly npm
        downloads. It runs cron jobs within the Node.js process and supports a six-field format (including seconds)
        as an extension to the standard five fields.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Installation and Basic Usage
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# Install node-cron
npm install node-cron
# TypeScript types (included in package since v3)
npm install --save-dev @types/node-cron   # only if using older v2`}</code>
      </pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`// scheduler.ts
import cron from 'node-cron';

// Run every minute
const task = cron.schedule('* * * * *', () => {
  console.log('Running every minute:', new Date().toISOString());
});

// Run at 2:30 AM every day
cron.schedule('30 2 * * *', async () => {
  await cleanupExpiredSessions();
  console.log('Daily cleanup complete');
});

// Run every weekday at 9 AM New York time
cron.schedule('0 9 * * 1-5', sendDailyDigestEmail, {
  timezone: 'America/New_York',
});

// Six-field format: add seconds as the first field
// Run every 30 seconds
cron.schedule('*/30 * * * * *', () => {
  checkHealthEndpoints();
});`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Managing Tasks — Start, Stop, and Destroy
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`import cron from 'node-cron';

// Create a task but do NOT start it immediately
const task = cron.schedule(
  '0 * * * *',
  () => { processHourlyReports(); },
  { scheduled: false, timezone: 'UTC' }
);

// Start the task manually
task.start();

// Temporarily stop without destroying
task.stop();

// Re-start after stopping
task.start();

// Permanently destroy — removes from event loop
task.destroy();
console.log('Task destroyed. Status:', task.getStatus());
// → 'destroyed'

// Validate expression before scheduling
const isValid = cron.validate('0 */2 * * *');
console.log('Valid:', isValid); // → true`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Error Handling and Overlap Prevention
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`import cron from 'node-cron';

let isRunning = false;

cron.schedule('*/5 * * * *', async () => {
  // Prevent overlap: skip if previous run is still active
  if (isRunning) {
    console.warn('Previous job still running — skipping this tick');
    return;
  }
  isRunning = true;

  try {
    await syncDataFromExternalAPI();
    console.log('Sync successful:', new Date().toISOString());
  } catch (error) {
    // Send to error tracking (Sentry, Datadog, etc.)
    console.error('Cron job failed:', error);
    await notifyOncall(error);
  } finally {
    isRunning = false;
  }
}, { timezone: 'UTC' });`}</code>
      </pre>

      {/* Section 3: Bun.js / Deno cron */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Modern Runtimes: Bun.js and Deno Cron Support
      </h2>
      <p>
        Both <strong>Bun</strong> and <strong>Deno</strong> provide first-class built-in cron APIs, eliminating the
        need for third-party packages in those ecosystems.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Bun.cron() — Native Scheduling in Bun
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`// Bun v1.1+ — no npm install needed
// File: scheduler.ts

// Basic usage: run every hour
Bun.cron('hourly-report', '0 * * * *', async (job) => {
  console.log('Job name:', job.name); // 'hourly-report'
  console.log('Last run:', job.lastRun);
  console.log('Next run:', job.nextRun);
  await generateHourlyReport();
});

// Run every weekday morning at 8 AM UTC
Bun.cron('morning-digest', '0 8 * * 1-5', async () => {
  const digest = await buildMorningDigest();
  await sendEmailBatch(digest.recipients, digest.content);
});

// Cancel a running cron job
const controller = Bun.cron('temp-task', '*/1 * * * *', () => {
  processQueue();
});

// Stop after 10 minutes
setTimeout(() => {
  controller.unref(); // Stop keeping the process alive
}, 10 * 60 * 1000);`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Deno.cron() — Scheduled Tasks in Deno Deploy
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`// Deno 1.38+ with --unstable-cron flag
// deno run --unstable-cron scheduler.ts

// Run every day at midnight UTC
Deno.cron('daily-cleanup', '0 0 * * *', async () => {
  console.log('Running daily cleanup');
  await deleteExpiredTokens();
  await archiveOldLogs();
});

// Run every 15 minutes during business hours
Deno.cron('health-check', '*/15 9-17 * * 1-5', async () => {
  const status = await fetch('https://api.example.com/health');
  if (!status.ok) {
    await alertOncallTeam(status.status);
  }
});

// Deno Deploy cron: define in deno.json
// {
//   "tasks": {
//     "cron": "deno run --unstable-cron scheduler.ts"
//   }
// }

// Note: Deno.cron requires --allow-net for fetch calls
// deno run --unstable-cron --allow-net scheduler.ts`}</code>
      </pre>

      {/* Section 4: Python schedule */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Python Cron Scheduling with the schedule Library
      </h2>
      <p>
        The <strong>schedule</strong> library provides a human-friendly API for periodic task execution in Python. It
        is lightweight, dependency-free, and ideal for simple automation scripts and data pipelines.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Installation and Basic Scheduling
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`pip install schedule`}</code>
      </pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# scheduler.py
import schedule
import time
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(message)s')

def sync_database():
    logging.info("Syncing database...")
    # ... your logic here

def send_daily_report():
    logging.info("Sending daily report...")
    # ... your logic here

def cleanup_temp_files():
    logging.info("Cleaning up temp files...")
    # ... your logic here

# Run every 10 minutes
schedule.every(10).minutes.do(sync_database)

# Run every hour
schedule.every().hour.do(sync_database)

# Run every day at 10:30 AM
schedule.every().day.at("10:30").do(send_daily_report)

# Run every Monday at 9 AM
schedule.every().monday.at("09:00").do(send_weekly_digest)

# Run every week
schedule.every().week.do(cleanup_temp_files)

# Run every 5-10 minutes randomly (jitter)
schedule.every(5).to(10).minutes.do(poll_api)

# Main loop
if __name__ == "__main__":
    logging.info("Scheduler started")
    while True:
        schedule.run_pending()
        time.sleep(1)  # check every second`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Running in a Background Thread
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# background_scheduler.py
import schedule
import time
import threading
import logging

def run_scheduler():
    """Run in a background thread — non-blocking for web apps."""
    while True:
        schedule.run_pending()
        time.sleep(1)

def job_with_error_handling():
    try:
        risky_operation()
    except Exception as e:
        logging.error(f"Job failed: {e}")
        # Optionally: ping failure endpoint
        # requests.get("https://hc-ping.com/YOUR-UUID/fail")

# Register jobs
schedule.every(30).minutes.do(job_with_error_handling)
schedule.every().day.at("02:00").do(nightly_backup)

# Start background thread — daemon=True exits with main thread
scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
scheduler_thread.start()

# Your main application continues here
# e.g., Flask/FastAPI app, CLI tool, etc.
print("Application running with background scheduler")`}</code>
      </pre>

      {/* Section 5: APScheduler */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Production Python Scheduling with APScheduler
      </h2>
      <p>
        <strong>APScheduler (Advanced Python Scheduler)</strong> is a production-grade scheduling library that supports
        multiple job stores (memory, SQLAlchemy, Redis, MongoDB), multiple executors (thread pool, process pool,
        AsyncIO), and three types of schedules: interval, cron, and date.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        BackgroundScheduler with IntervalTrigger and CronTrigger
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`pip install apscheduler`}</code>
      </pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# apscheduler_example.py
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ThreadPoolExecutor
import logging
import atexit

logging.basicConfig(level=logging.INFO)

# Configure persistent job store with SQLite
jobstores = {
    'default': SQLAlchemyJobStore(url='sqlite:///jobs.db')
}

executors = {
    'default': ThreadPoolExecutor(max_workers=10),
}

job_defaults = {
    'coalesce': True,           # Combine missed runs into one
    'max_instances': 1,         # Prevent overlap
    'misfire_grace_time': 60,   # Run late jobs up to 60s after due time
}

scheduler = BackgroundScheduler(
    jobstores=jobstores,
    executors=executors,
    job_defaults=job_defaults,
    timezone='UTC'
)

def sync_inventory():
    logging.info("Syncing inventory from warehouse API...")
    # fetch_and_update_inventory()

def generate_daily_report():
    logging.info("Generating daily sales report...")
    # build_and_email_report()

# IntervalTrigger: run every 15 minutes
scheduler.add_job(
    sync_inventory,
    trigger=IntervalTrigger(minutes=15),
    id='inventory_sync',
    name='Inventory Sync',
    replace_existing=True,
)

# CronTrigger: run at 7:00 AM on weekdays in New York time
scheduler.add_job(
    generate_daily_report,
    trigger=CronTrigger(
        hour=7, minute=0,
        day_of_week='mon-fri',
        timezone='America/New_York'
    ),
    id='daily_report',
    name='Daily Sales Report',
    replace_existing=True,
)

# Start the scheduler
scheduler.start()

# Ensure scheduler shuts down cleanly when app exits
atexit.register(lambda: scheduler.shutdown())`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        APScheduler with FastAPI (AsyncScheduler)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# APScheduler 4.x async integration with FastAPI
from apscheduler import AsyncScheduler
from apscheduler.triggers.cron import CronTrigger
from contextlib import asynccontextmanager
from fastapi import FastAPI

async def nightly_cleanup():
    print("Running nightly cleanup...")

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with AsyncScheduler() as scheduler:
        await scheduler.add_schedule(
            nightly_cleanup,
            CronTrigger(hour=2, minute=0),
            id='nightly_cleanup'
        )
        await scheduler.start_in_background()
        yield  # FastAPI serves requests here

app = FastAPI(lifespan=lifespan)

@app.get("/jobs")
async def list_jobs():
    return {"status": "scheduler running"}`}</code>
      </pre>

      {/* Section 6: Linux crontab */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Linux Crontab — System-Level Scheduled Tasks
      </h2>
      <p>
        The Linux <strong>cron daemon</strong> (<code>crond</code>) is the original and most reliable cron
        implementation, running as a system service since the 1970s. On modern Linux systems (Ubuntu, Debian, RHEL),
        it is <code>cron</code> (Vixie cron) or <code>cronie</code>.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Editing the User Crontab
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# Open your user's crontab in the default editor (usually vi/nano)
crontab -e

# List current user's crontab
crontab -l

# Remove current user's crontab (use with caution!)
crontab -r

# Edit another user's crontab (requires root)
crontab -u username -e`}</code>
      </pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# Crontab format:
# MIN HOUR DOM MON DOW COMMAND

# Set environment variables at the top
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=admin@example.com   # Send output to this email (empty string = no email)

# Run backup script every day at 2 AM
0 2 * * * /home/deploy/scripts/backup.sh >> /var/log/backup.log 2>&1

# Run weekly report every Sunday at midnight (redirect output)
0 0 * * 0 /opt/scripts/weekly-report.sh > /var/log/weekly-report.log 2>&1

# Ping monitoring service after successful run
0 3 * * * /opt/scripts/sync.sh && curl -fsS --retry 3 https://hc-ping.com/UUID

# Run with specific user environment
0 6 * * * cd /var/www/myapp && /usr/bin/node scripts/cleanup.js

# Run every 5 minutes, append to log
*/5 * * * * /opt/scripts/check-queue.sh >> /var/log/queue-check.log 2>&1`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        System-Wide Cron: /etc/cron.d/ and Drop-in Directories
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# System cron locations:
# /etc/crontab          — system-wide crontab (includes USERNAME field)
# /etc/cron.d/          — drop-in crontab files (same format as /etc/crontab)
# /etc/cron.daily/      — scripts run once daily by run-parts
# /etc/cron.weekly/     — scripts run once weekly
# /etc/cron.monthly/    — scripts run once monthly
# /etc/cron.hourly/     — scripts run once hourly

# /etc/cron.d/myapp-jobs (note: includes USERNAME field)
# MIN HOUR DOM MON DOW USER COMMAND
0 2 * * * deploy /var/www/myapp/scripts/nightly-backup.sh
*/15 * * * * www-data /var/www/myapp/scripts/cache-warm.sh

# Drop a script into /etc/cron.daily/ — must be executable, no extension
cat > /etc/cron.daily/myapp-cleanup << 'EOF'
#!/bin/bash
set -euo pipefail
/var/www/myapp/scripts/cleanup.sh >> /var/log/myapp-cleanup.log 2>&1
EOF
chmod +x /etc/cron.daily/myapp-cleanup

# Verify cron service is running
systemctl status cron    # Ubuntu/Debian
systemctl status crond   # RHEL/CentOS

# Check cron logs
journalctl -u cron -n 50
grep CRON /var/log/syslog | tail -20`}</code>
      </pre>

      {/* Section 7: Next.js Vercel Cron */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Next.js Cron Jobs with Vercel Cron
      </h2>
      <p>
        <strong>Vercel Cron Jobs</strong> allow you to schedule serverless function invocations using cron expressions,
        defined in <code>vercel.json</code>. Each cron job calls a configured GET endpoint on your Next.js app at the
        specified schedule.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        vercel.json Configuration
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/daily-cleanup",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/send-digests",
      "schedule": "0 8 * * 1-5"
    },
    {
      "path": "/api/cron/refresh-cache",
      "schedule": "*/15 * * * *"
    }
  ]
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Next.js App Router Cron Handler with CRON_SECRET
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`// src/app/api/cron/daily-cleanup/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Vercel sets this environment variable automatically on cron invocations
const CRON_SECRET = process.env.CRON_SECRET;

export const runtime = 'nodejs';  // or 'edge' for Edge runtime
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = req.headers.get('authorization');
  if (authHeader !== \`Bearer \${CRON_SECRET}\`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const startTime = Date.now();

    // Your cron job logic here
    await deleteExpiredSessions();
    await archiveOldPosts();
    await purgeOrphanedFiles();

    const duration = Date.now() - startTime;
    console.log(\`Daily cleanup completed in \${duration}ms\`);

    return NextResponse.json({
      success: true,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Declare functions for TypeScript (replace with real implementations)
async function deleteExpiredSessions() { /* ... */ }
async function archiveOldPosts() { /* ... */ }
async function purgeOrphanedFiles() { /* ... */ }`}</code>
      </pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# .env.local — generate a strong random secret
CRON_SECRET=your-random-secret-here

# Generate a secure secret:
# openssl rand -hex 32`}</code>
      </pre>

      {/* Section 8: GitHub Actions scheduled workflows */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        GitHub Actions Scheduled Workflows
      </h2>
      <p>
        GitHub Actions supports cron-triggered workflows via the <code>schedule</code> event. The scheduler uses{' '}
        <strong>UTC timezone</strong> exclusively. The minimum supported interval is <strong>5 minutes</strong>, and
        scheduled jobs on public repositories may be delayed during peak load.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Basic Scheduled Workflow with workflow_dispatch Fallback
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# .github/workflows/nightly-build.yml
name: Nightly Build & Test

on:
  schedule:
    # Run at 2:00 AM UTC every day (Mon-Fri)
    - cron: '0 2 * * 1-5'
  # Also allow manual trigger (useful for testing)
  workflow_dispatch:
    inputs:
      debug_mode:
        description: 'Enable debug mode'
        required: false
        default: 'false'
        type: boolean

jobs:
  nightly-test:
    runs-on: ubuntu-latest
    # Skip if workflow is stale (no pushes in 60 days)
    # GitHub may auto-disable but this is an extra guard
    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run full test suite
        run: npm test -- --reporter=github

      - name: Build production bundle
        run: npm run build

      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "Nightly build failed on \${{ github.ref }}"
            }
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Scheduled Data Sync with Output Caching
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# .github/workflows/data-sync.yml
name: Weekly Data Sync

on:
  schedule:
    - cron: '0 6 * * 1'  # Monday 6:00 AM UTC
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write  # Allow pushing updated data files

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dependencies
        run: pip install requests pandas

      - name: Run data sync
        env:
          API_KEY: \${{ secrets.DATA_API_KEY }}
        run: python scripts/sync_data.py

      - name: Commit and push if data changed
        run: |
          git config user.name 'github-actions[bot]'
          git config user.email 'github-actions[bot]@users.noreply.github.com'
          git add data/
          git diff --staged --quiet || git commit -m "chore: weekly data sync [skip ci]"
          git push`}</code>
      </pre>

      {/* Section 9: Distributed cron */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Distributed Cron — pg-boss and BullMQ for Exactly-Once Execution
      </h2>
      <p>
        In a distributed system with multiple application instances (e.g., a Kubernetes deployment with 3 replicas),
        a naive cron job running in every instance would execute 3 times per tick. You need a{' '}
        <strong>distributed lock</strong> or a <strong>queue-backed scheduler</strong> to guarantee exactly-once
        execution.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        pg-boss — PostgreSQL-Backed Job Queue with Cron
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`npm install pg-boss`}</code>
      </pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`// pg-boss-scheduler.ts
import PgBoss from 'pg-boss';

const boss = new PgBoss({
  connectionString: process.env.DATABASE_URL,
  // Retention: keep completed jobs for 7 days
  deleteAfterDays: 7,
  // Retry failed jobs up to 3 times
  retryLimit: 3,
  retryDelay: 60,  // 60 seconds between retries
});

boss.on('error', (err) => console.error('pg-boss error:', err));

await boss.start();

// Schedule a recurring job — pg-boss uses node-cron expressions
// Only ONE instance across all workers will execute each tick
await boss.schedule(
  'daily-report',           // job name
  '0 7 * * 1-5',           // cron expression (UTC)
  {},                       // data payload (can be any JSON)
  {
    tz: 'America/Chicago',  // timezone
    singletonKey: 'daily-report',  // prevent duplicate scheduling
  }
);

// Worker: process the job (only one instance wins the lock)
await boss.work('daily-report', async (jobs) => {
  for (const job of jobs) {
    console.log('Processing daily-report job:', job.id);

    try {
      await generateAndSendDailyReport();
      // pg-boss auto-completes on successful return
    } catch (error) {
      console.error('Job failed:', error);
      throw error; // pg-boss will retry based on retryLimit
    }
  }
});

// One-time job with idempotency key — prevents duplicate processing
await boss.send('send-welcome-email', {
  userId: '123',
  email: 'user@example.com'
}, {
  singletonKey: 'welcome-123',  // won't create duplicate if key exists
  expireInHours: 24,
});

async function generateAndSendDailyReport() {
  // ... implementation
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        BullMQ — Redis-Backed Repeatable Jobs
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`npm install bullmq ioredis`}</code>
      </pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`// bullmq-scheduler.ts
import { Queue, Worker, QueueEvents } from 'bullmq';
import { Redis } from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,  // Required by BullMQ
});

// Create a queue
const reportQueue = new Queue('report-jobs', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 500 },
  },
});

// Add a repeatable cron job (stored in Redis, survives restarts)
await reportQueue.upsertJobScheduler(
  'weekly-sales-report',     // scheduler ID
  {
    pattern: '0 8 * * 1',    // cron expression — every Monday 8 AM
    tz: 'America/New_York',  // timezone
  },
  {
    name: 'generate-report',
    data: { type: 'sales', format: 'pdf' },
  }
);

// Worker: processes jobs one at a time (concurrency: 1 prevents overlap)
const worker = new Worker(
  'report-jobs',
  async (job) => {
    console.log(\`Processing job \${job.id}: \${job.name}\`);
    const { type, format } = job.data;

    // Update progress (visible in Bull Dashboard)
    await job.updateProgress(10);
    const data = await fetchReportData(type);

    await job.updateProgress(50);
    const pdf = await renderReport(data, format);

    await job.updateProgress(90);
    await emailReport(pdf);

    await job.updateProgress(100);
    return { success: true, generatedAt: new Date().toISOString() };
  },
  {
    connection: redis,
    concurrency: 1,  // Process one job at a time
  }
);

worker.on('completed', (job) => {
  console.log(\`Job \${job.id} completed\`);
});

worker.on('failed', (job, err) => {
  console.error(\`Job \${job?.id} failed:\`, err.message);
});

async function fetchReportData(_type: string) { return {}; }
async function renderReport(_data: unknown, _format: string) { return Buffer.from(''); }
async function emailReport(_pdf: Buffer) { /* ... */ }`}</code>
      </pre>

      {/* Section 10: Monitoring & Alerting */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Monitoring Cron Jobs — Dead Man&apos;s Switch and Alerting
      </h2>
      <p>
        The most common cron failure mode is <strong>silent failure</strong>: the job runs but produces no output,
        throws an error that is swallowed, or the server reboots and the job simply stops. Traditional monitoring that
        only watches for errors misses these cases entirely.
      </p>
      <p>
        The <strong>dead man&apos;s switch</strong> (or heartbeat) pattern inverts the alert logic: instead of
        alerting when something goes wrong, you alert when the expected ping is <em>not received</em> within the
        expected window. This catches silent failures, server crashes, misconfigured schedules, and timeout-induced
        hangs.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Healthchecks.io Ping Pattern
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`#!/bin/bash
# bash-cron-with-monitoring.sh
# Wrap your cron job with start/success/fail pings

PING_URL="https://hc-ping.com/YOUR-UUID-HERE"

# Signal job start (optional but useful for duration tracking)
curl -fsS --retry 3 "$PING_URL/start" > /dev/null 2>&1

# Run your actual job — capture exit code
/opt/scripts/nightly-backup.sh
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  # Ping success endpoint
  curl -fsS --retry 3 "$PING_URL" > /dev/null 2>&1
  echo "$(date): Job completed successfully"
else
  # Ping failure endpoint — triggers immediate alert
  curl -fsS --retry 3 "$PING_URL/fail" > /dev/null 2>&1
  echo "$(date): Job FAILED with exit code $EXIT_CODE" >&2
  exit $EXIT_CODE
fi`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Node.js: Ping Monitoring from Your Cron Handler
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`// cron-with-monitoring.ts
import cron from 'node-cron';

const HC_PING_URL = process.env.HC_PING_URL!;  // e.g. https://hc-ping.com/UUID

async function safePing(endpoint: string = '') {
  try {
    await fetch(\`\${HC_PING_URL}\${endpoint}\`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    // Monitoring ping failure should never crash the job
    console.warn('Failed to send monitoring ping');
  }
}

async function nightlyDataSync() {
  await safePing('/start');   // Signal job started

  const timeoutId = setTimeout(async () => {
    await safePing('/fail');  // Timeout exceeded — alert!
    process.exit(1);
  }, 25 * 60 * 1000);        // 25 minute timeout guard

  try {
    await fetchAndSyncAllRecords();
    await rebuildSearchIndex();
    await invalidateCDNCache();

    clearTimeout(timeoutId);
    await safePing();         // Signal success
    console.log('Nightly sync completed:', new Date().toISOString());
  } catch (error) {
    clearTimeout(timeoutId);
    await safePing('/fail');  // Signal failure
    throw error;
  }
}

// Schedule with timezone
cron.schedule('0 2 * * *', nightlyDataSync, {
  timezone: 'UTC',
});

async function fetchAndSyncAllRecords() { /* ... */ }
async function rebuildSearchIndex() { /* ... */ }
async function invalidateCDNCache() { /* ... */ }`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Python: Monitoring Integration with Requests
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        <code>{`# python-cron-monitoring.py
import schedule
import time
import requests
import logging
from contextlib import contextmanager

HC_PING_URL = "https://hc-ping.com/YOUR-UUID-HERE"

@contextmanager
def monitored_job(ping_url: str, timeout_seconds: int = 300):
    """Context manager that pings healthchecks.io on success/failure."""
    requests.get(f"{ping_url}/start", timeout=5)
    try:
        yield
        requests.get(ping_url, timeout=5)  # Success ping
    except Exception as e:
        logging.error(f"Job failed: {e}")
        requests.get(f"{ping_url}/fail", timeout=5)  # Failure ping
        raise

def nightly_etl_job():
    """ETL job with integrated monitoring."""
    with monitored_job(HC_PING_URL, timeout_seconds=1800):
        extract_from_source_database()
        transform_data()
        load_to_data_warehouse()
        send_completion_notification()
        logging.info("ETL pipeline completed successfully")

def extract_from_source_database(): pass
def transform_data(): pass
def load_to_data_warehouse(): pass
def send_completion_notification(): pass

# Schedule the monitored job
schedule.every().day.at("01:00").do(nightly_etl_job)

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s',
        handlers=[
            logging.FileHandler('/var/log/etl-cron.log'),
            logging.StreamHandler()
        ]
    )
    logging.info("ETL scheduler started")
    while True:
        schedule.run_pending()
        time.sleep(30)`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Monitoring Tools Comparison
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Tool</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Free Tier</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Alert Channels</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Healthchecks.io', '20 checks free', 'Email, Slack, PagerDuty, SMS', 'Most devs — simple & reliable'],
              ["Dead Man's Snitch", '1 snitch free', 'Email, Slack, PagerDuty', 'Simple heartbeat monitoring'],
              ['Cronitor', '5 monitors free', 'Email, SMS, Slack, webhook', 'Cron + API + CI monitoring'],
              ['OpsGenie', 'Free trial', 'Email, SMS, push, call', 'Enterprise on-call management'],
              ['Grafana Alerting', 'Open source', 'All (webhook, email, etc.)', 'Self-hosted observability'],
            ].map(([tool, free, alerts, best], i) => (
              <tr key={tool} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>{tool}</strong></td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{free}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{alerts}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Tool CTA */}
      <div
        style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '1.25rem',
          marginTop: '2rem',
          marginBottom: '2rem',
          textAlign: 'center' as const,
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1d4ed8' }}>
          Test Your Cron Expression Online
        </p>
        <p style={{ marginBottom: '1rem', color: '#374151' }}>
          Paste any cron expression to instantly see the next 10 scheduled run times, validate the syntax, and get a
          plain-English description of the schedule — no sign-up required.
        </p>
        <a
          href="https://viadreams.cc/en/tools/cron-expression"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '0.6rem 1.4rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          Open Cron Expression Tester
        </a>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.25rem',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1e293b' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            Cron expressions have <strong>5 fields</strong> (minute, hour, day-of-month, month, day-of-week); many
            schedulers support a 6th field for seconds. Use <code>*/N</code> for step values and{' '}
            <code>@daily</code>/<code>@hourly</code> shorthands when supported.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            In <strong>Node.js</strong>, use <code>node-cron</code> with an explicit <code>timezone</code> option.
            Always add error handling and overlap prevention with a boolean flag or distributed lock.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Bun</strong> has <code>Bun.cron()</code> built in (v1.1+); <strong>Deno</strong> has{' '}
            <code>Deno.cron()</code> behind <code>--unstable-cron</code>. No third-party packages needed.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            In <strong>Python</strong>, use <code>schedule</code> for simple scripts and{' '}
            <code>APScheduler</code> with <code>BackgroundScheduler</code> for production apps.
            Set <code>max_instances=1</code> and <code>misfire_grace_time</code> on all jobs.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            On <strong>Linux</strong>, use <code>crontab -e</code> for user jobs and drop files into{' '}
            <code>/etc/cron.d/</code> for system services. Always log output with <code>{'>> /var/log/... 2>&1'}</code>.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Vercel Cron</strong> calls a GET endpoint; protect it with a <code>CRON_SECRET</code> bearer
            token checked in the handler. <strong>GitHub Actions</strong> uses UTC; minimum interval is 5 minutes.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            For <strong>distributed systems</strong>, use <strong>pg-boss</strong> (Postgres-backed) or{' '}
            <strong>BullMQ</strong> (Redis-backed) to get exactly-once execution with retries, persistence, and
            visibility — not raw cron in each process.
          </li>
          <li>
            Always <strong>monitor</strong> with the dead man&apos;s switch pattern: ping a service like
            Healthchecks.io on success. If the ping is missed, you get an alert. This catches silent failures,
            server crashes, and schedule drift that error-only monitoring misses.
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Frequently Asked Questions
      </h2>

      {faqSchema.mainEntity.map((faq) => (
        <div
          key={faq.name}
          style={{
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '1rem',
            marginBottom: '1rem',
          }}
        >
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              color: '#1e293b',
            }}
          >
            {faq.name}
          </h3>
          <p style={{ margin: 0, color: '#475569' }}>{faq.acceptedAnswer.text}</p>
        </div>
      ))}

      {/* Meta info */}
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2rem' }}>
        {t.title} — <em>{t.description}</em>
      </p>
    </article>
  );
}
