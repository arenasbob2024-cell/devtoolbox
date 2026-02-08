import Link from 'next/link';

export default function CronServerless({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What timezone do GitHub Actions cron schedules use?',
        acceptedAnswer: { '@type': 'Answer', text: 'GitHub Actions cron schedules always use UTC. There is no option to change the timezone. If you need a job to run at 9 AM Eastern Time, you must convert that to UTC (1 PM or 2 PM depending on daylight saving time) and use the corresponding cron expression.' },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum interval for Vercel Cron Jobs?',
        acceptedAnswer: { '@type': 'Answer', text: 'On the Vercel Hobby (free) plan, the minimum interval is once per day. On the Pro plan, the minimum is once per hour. On the Enterprise plan, the minimum is once per minute. Vercel uses standard 5-field cron expressions.' },
      },
      {
        '@type': 'Question',
        name: 'Can Cloudflare Workers Cron Triggers run every second?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Cloudflare Workers Cron Triggers use standard cron expressions with a minimum granularity of one minute. The minimum interval is once per minute on all plans. For sub-minute scheduling, you would need to use Durable Objects with alarm() API.' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p>
        Cron expressions are the universal language for scheduling recurring tasks. But when you move
        from traditional <code>crontab</code> to serverless platforms, each platform has its own
        quirks, limitations, and syntax differences. This guide covers everything you need to schedule
        jobs on the three most popular serverless platforms.
      </p>

      <h2>Cron Expression Basics (60-Second Refresher)</h2>
      <p>
        A standard cron expression has <strong>5 fields</strong>:
      </p>
      <pre><code>{`┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-6, Sun=0)
│ │ │ │ │
* * * * *`}</code></pre>
      <p>Common special characters:</p>
      <ul>
        <li><code>*</code> — any value</li>
        <li><code>*/5</code> — every 5 units (step)</li>
        <li><code>1,3,5</code> — specific values (list)</li>
        <li><code>1-5</code> — range of values</li>
      </ul>
      <p>
        <Link href={`/${lang}/tools/cron-parser`} style={{ fontWeight: 600 }}>
          Test your cron expressions with our Cron Parser tool &rarr;
        </Link>
      </p>

      <h2>Platform 1: GitHub Actions</h2>
      <p>
        GitHub Actions uses the <code>schedule</code> event with standard 5-field cron syntax.
        Scheduled workflows run on the default branch only.
      </p>

      <h3>Configuration</h3>
      <pre><code>{`# .github/workflows/scheduled.yml
name: Scheduled Job
on:
  schedule:
    - cron: '30 5 * * 1-5'  # Weekdays at 5:30 AM UTC
    - cron: '0 12 1 * *'    # 1st of every month at noon UTC
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Running scheduled task"`}</code></pre>

      <h3>Key Limitations</h3>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Details</th></tr>
        </thead>
        <tbody>
          <tr><td>Timezone</td><td><strong>UTC only</strong> — no timezone configuration</td></tr>
          <tr><td>Minimum interval</td><td>Every 5 minutes (<code>*/5 * * * *</code>)</td></tr>
          <tr><td>Accuracy</td><td>Can be delayed 5-15 minutes during peak load</td></tr>
          <tr><td>Branch</td><td>Runs on default branch only</td></tr>
          <tr><td>Disable condition</td><td>Auto-disabled after 60 days of repo inactivity</td></tr>
        </tbody>
      </table>

      <h3>Common Schedules for GitHub Actions</h3>
      <pre><code>{`# Every 5 minutes
- cron: '*/5 * * * *'

# Every hour at minute 0
- cron: '0 * * * *'

# Daily at midnight UTC
- cron: '0 0 * * *'

# Daily at 9 AM Eastern (UTC-5, no DST)
- cron: '0 14 * * *'

# Weekdays at 8 AM UTC
- cron: '0 8 * * 1-5'

# Every Monday and Thursday at 6 PM UTC
- cron: '0 18 * * 1,4'

# First day of every month at midnight
- cron: '0 0 1 * *'`}</code></pre>

      <blockquote>
        <p>
          <strong>Tip:</strong> GitHub Actions scheduled workflows may not fire exactly on time.
          If you need precision, use a webhook-based trigger from a more reliable scheduler.
        </p>
      </blockquote>

      <h2>Platform 2: Vercel Cron Jobs</h2>
      <p>
        Vercel Cron Jobs trigger serverless functions on a schedule. Configure them in <code>vercel.json</code>.
      </p>

      <h3>Configuration</h3>
      <pre><code>{`// vercel.json
{
  "crons": [
    {
      "path": "/api/daily-report",
      "schedule": "0 8 * * *"
    },
    {
      "path": "/api/cleanup",
      "schedule": "0 0 * * 0"
    }
  ]
}`}</code></pre>

      <h3>The API Route</h3>
      <pre><code>{`// app/api/daily-report/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Your scheduled logic here
  await sendDailyReport();
  return NextResponse.json({ ok: true });
}

// Vercel recommends setting maxDuration for long tasks
export const maxDuration = 60; // seconds`}</code></pre>

      <h3>Key Limitations</h3>
      <table>
        <thead>
          <tr><th>Plan</th><th>Min Interval</th><th>Max Cron Jobs</th><th>Execution Limit</th></tr>
        </thead>
        <tbody>
          <tr><td>Hobby (free)</td><td>Once per day</td><td>2</td><td>10s</td></tr>
          <tr><td>Pro</td><td>Once per hour</td><td>40</td><td>60s (default)</td></tr>
          <tr><td>Enterprise</td><td>Once per minute</td><td>100</td><td>900s</td></tr>
        </tbody>
      </table>

      <blockquote>
        <p>
          <strong>Important:</strong> Vercel Cron Jobs use <strong>UTC timezone</strong>.
          The Hobby plan&apos;s once-per-day limit means expressions like <code>*/5 * * * *</code> will
          not work — they&apos;ll only fire once daily.
        </p>
      </blockquote>

      <h2>Platform 3: Cloudflare Workers (Cron Triggers)</h2>
      <p>
        Cloudflare Workers Cron Triggers are configured in <code>wrangler.toml</code> and run
        at the edge globally.
      </p>

      <h3>Configuration</h3>
      <pre><code>{`# wrangler.toml
name = "my-worker"
main = "src/index.ts"

[triggers]
crons = [
  "*/5 * * * *",    # Every 5 minutes
  "0 12 * * 1-5",   # Weekdays at noon UTC
  "0 0 1 * *"       # First of every month
]`}</code></pre>

      <h3>Worker Code</h3>
      <pre><code>{`// src/index.ts
export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ) {
    // controller.cron contains the cron pattern that triggered
    switch (controller.cron) {
      case '*/5 * * * *':
        await doHealthCheck(env);
        break;
      case '0 12 * * 1-5':
        await sendReport(env);
        break;
    }
  },
};`}</code></pre>

      <h3>Key Limitations</h3>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Details</th></tr>
        </thead>
        <tbody>
          <tr><td>Timezone</td><td><strong>UTC only</strong></td></tr>
          <tr><td>Minimum interval</td><td>Once per minute</td></tr>
          <tr><td>Max cron triggers</td><td>3 per Worker (free), more on paid plans</td></tr>
          <tr><td>CPU time</td><td>10ms (free) / 30s (paid) per invocation</td></tr>
          <tr><td>Accuracy</td><td>Very reliable — runs at the edge</td></tr>
        </tbody>
      </table>

      <h2>Cross-Platform Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>GitHub Actions</th>
            <th>Vercel Cron</th>
            <th>CF Workers</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Timezone</td><td>UTC</td><td>UTC</td><td>UTC</td></tr>
          <tr><td>Min interval (free)</td><td>5 min</td><td>1/day</td><td>1 min</td></tr>
          <tr><td>Min interval (paid)</td><td>5 min</td><td>1/min</td><td>1 min</td></tr>
          <tr><td>Reliability</td><td>Medium (can delay)</td><td>High</td><td>Very high</td></tr>
          <tr><td>Max execution time</td><td>6 hours</td><td>10s-900s</td><td>10ms-30s</td></tr>
          <tr><td>Config location</td><td>.github/workflows/</td><td>vercel.json</td><td>wrangler.toml</td></tr>
          <tr><td>Trigger handler</td><td>Workflow YAML</td><td>API route</td><td>scheduled() event</td></tr>
        </tbody>
      </table>

      <h2>Common Timezone Pitfall</h2>
      <p>
        All three platforms use <strong>UTC exclusively</strong>. This is the most common source of
        bugs when setting up cron schedules. Here&apos;s a quick UTC conversion table:
      </p>
      <table>
        <thead>
          <tr><th>Local Time</th><th>UTC Offset</th><th>Cron (9 AM local)</th></tr>
        </thead>
        <tbody>
          <tr><td>US Eastern (EST)</td><td>UTC-5</td><td><code>0 14 * * *</code></td></tr>
          <tr><td>US Pacific (PST)</td><td>UTC-8</td><td><code>0 17 * * *</code></td></tr>
          <tr><td>Central Europe (CET)</td><td>UTC+1</td><td><code>0 8 * * *</code></td></tr>
          <tr><td>China (CST)</td><td>UTC+8</td><td><code>0 1 * * *</code></td></tr>
          <tr><td>Japan (JST)</td><td>UTC+9</td><td><code>0 0 * * *</code></td></tr>
        </tbody>
      </table>
      <p>
        <em>Remember: Daylight Saving Time shifts UTC offsets. EST (UTC-5) becomes EDT (UTC-4) in summer.
        Your cron jobs won&apos;t adjust automatically.</em>
      </p>

      <h2>10 Copy-Paste Cron Expressions</h2>
      <p>Here are the most commonly needed schedules, ready to use on any platform:</p>
      <pre><code>{`# Every 5 minutes
*/5 * * * *

# Every hour at :00
0 * * * *

# Every day at midnight UTC
0 0 * * *

# Every day at noon UTC
0 12 * * *

# Weekdays (Mon-Fri) at 9 AM UTC
0 9 * * 1-5

# Every Monday at 8 AM UTC
0 8 * * 1

# Every 6 hours
0 */6 * * *

# First day of every month at midnight
0 0 1 * *

# Every 15 minutes during business hours (8-17 UTC)
*/15 8-17 * * 1-5

# Last day of month at 11 PM UTC (approximate)
0 23 28-31 * *`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/cron-parser`} style={{ fontWeight: 600 }}>
          Validate any cron expression with our Cron Parser &rarr;
        </Link>
      </p>

      {/* FAQ */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <h3>What timezone do GitHub Actions cron schedules use?</h3>
        <p>
          GitHub Actions cron schedules always use UTC. There is no option to change the timezone.
          If you need a job to run at 9 AM Eastern Time, you must convert that to UTC (1 PM or 2 PM
          depending on daylight saving time) and use the corresponding cron expression.
        </p>

        <h3>What is the minimum interval for Vercel Cron Jobs?</h3>
        <p>
          On the Vercel Hobby (free) plan, the minimum interval is once per day. On the Pro plan,
          the minimum is once per hour. On the Enterprise plan, the minimum is once per minute.
          Vercel uses standard 5-field cron expressions.
        </p>

        <h3>Can Cloudflare Workers Cron Triggers run every second?</h3>
        <p>
          No. Cloudflare Workers Cron Triggers use standard cron expressions with a minimum
          granularity of one minute. For sub-minute scheduling, you would need to use
          Durable Objects with the <code>alarm()</code> API.
        </p>
      </div>
    </>
  );
}
