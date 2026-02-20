---
title: "50+ Cron Expressions You'll Actually Use (Copy-Paste Ready)"
published: false
description: "The only crontab cheat sheet you need. 50+ real-world cron expressions organized by frequency, plus platform gotchas for GitHub Actions, AWS, K8s, and Vercel."
tags: linux, devops, tutorial, beginners
canonical_url: https://viadreams.cc/en/blog/crontab-cheat-sheet-cron-examples-guide
cover_image: https://viadreams.cc/og-image.png
---

Every developer hits that moment: you need to schedule a backup, a deploy, or a cleanup script, and you're staring at five mysterious fields wondering what `*/5` means again.

This is the cron cheat sheet I wish I had when I started. Bookmark it. You'll be back.

## Cron Syntax in 30 Seconds

A cron expression has **5 fields** separated by spaces:

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-7, Sun=0 or 7)
│ │ │ │ │
* * * * *  command_to_run
```

**Special characters:**

| Char | Meaning | Example |
|------|---------|---------|
| `*` | Every value | `* * * * *` = every minute |
| `,` | List | `1,3,5` = at 1, 3, and 5 |
| `-` | Range | `1-5` = 1 through 5 |
| `/` | Step | `*/5` = every 5 units |

## The Expressions (Copy-Paste Ready)

### Every X Minutes

```
* * * * *        # Every minute
*/5 * * * *      # Every 5 minutes
*/10 * * * *     # Every 10 minutes
*/15 * * * *     # Every 15 minutes
*/30 * * * *     # Every 30 minutes
```

### Hourly

```
0 * * * *        # Every hour (at :00)
30 * * * *       # Every hour (at :30)
0 */2 * * *      # Every 2 hours
0 */6 * * *      # Every 6 hours
0 */12 * * *     # Every 12 hours
```

### Daily

```
0 0 * * *        # Midnight
0 6 * * *        # 6:00 AM
0 9 * * *        # 9:00 AM
0 12 * * *       # Noon
0 18 * * *       # 6:00 PM
0 2 * * *        # 2:00 AM (common for backups)
```

### Weekly

```
0 0 * * 0        # Sunday at midnight
0 9 * * 1        # Monday at 9 AM
0 9 * * 1-5      # Weekdays at 9 AM
0 17 * * 5       # Friday at 5 PM
```

### Monthly & Yearly

```
0 0 1 * *        # First day of every month
0 0 15 * *       # 15th of every month
0 9 1 1 *        # January 1st at 9 AM
0 0 1 */3 *      # Every quarter (1st day)
```

### DevOps Favorites

```
0 9 * * 1-5      # Weekdays at 9 AM (daily standups)
0 2 * * *        # 2 AM daily (database backups)
0 */4 * * *      # Every 4 hours (health checks)
0 0 * * 0        # Weekly Sunday midnight (log rotation)
30 8 * * 1       # Monday 8:30 AM (weekly reports)
```

## Crontab Commands You Need

```bash
crontab -e       # Edit your crontab
crontab -l       # List your cron jobs
crontab -r       # Remove ALL your cron jobs (careful!)
sudo crontab -u www-data -e   # Edit another user's crontab
```

## Platform Differences (This Will Save You)

Not all cron is created equal. Here's where things get tricky:

**GitHub Actions** -- Standard 5 fields, but always runs in **UTC**. Minimum interval: 5 minutes. Defined in `schedule.cron`.

**AWS EventBridge** -- Uses **6 fields** (adds year) and `?` for day-of-week or day-of-month. Wrapped in `cron()`.

**Kubernetes CronJob** -- Standard 5 fields. Timezone support added in K8s 1.27+ via the `timeZone` spec.

**Vercel Cron** -- Standard 5 fields in `vercel.json`. Runs in UTC. Hobby plan: max 2 cron jobs, 1/day minimum.

## 6 Gotchas That Will Bite You

**1. Timezone confusion** -- Cron defaults to the system timezone. CI/CD platforms use UTC. Always check.

**2. Overlapping executions** -- A 10-minute job on a 5-minute schedule? You'll get overlapping runs. Use `flock` to prevent this.

**3. Daylight saving time** -- Spring forward: your 2 AM job won't run. Fall back: it might run twice. Use UTC.

**4. Day-of-month AND day-of-week** -- If both are set (not `*`), the job runs when **either** matches. Not both. This trips everyone up.

**5. No seconds** -- Cron's minimum resolution is 1 minute. For every 30 seconds, use two entries with `sleep 30`.

**6. Environment variables** -- Cron runs with a minimal environment. Your `$PATH` is probably not what you expect. Always use full paths.

## Quick Debugging Checklist

```bash
# Check cron logs
grep CRON /var/log/syslog

# Redirect output for debugging
*/5 * * * * /path/to/script.sh >> /tmp/cron.log 2>&1

# Disable cron email notifications
MAILTO=""

# Test with every-minute first, then change to target schedule
* * * * * /path/to/script.sh
```

---

*Originally published on [DevToolBox](https://viadreams.cc/en/blog/crontab-cheat-sheet-cron-examples-guide). Try our free [Cron Expression Generator](https://viadreams.cc/en/tools/cron-generator) -- build and test cron expressions visually, 100% client-side, no data leaves your browser.*
