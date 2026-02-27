---
title: "Cron Expression Generator: Write and Understand Cron Syntax — Complete Guide"
tags: cron, linux, devops, automation
canonical_url: https://viadreams.cc/en/blog/cron-expression-online-guide
published: true
---

Master cron scheduling syntax. Complete guide for Linux crontab, Node.js, Python, GitHub Actions, and Kubernetes.

## Cron Syntax

```
* * * * *  command
│ │ │ │ │
│ │ │ │ └── Day of week (0-7, 0=Sunday)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

## Common Examples

| Schedule | Expression |
|----------|------------|
| Every minute | `* * * * *` |
| Every 5 minutes | `*/5 * * * *` |
| Every hour | `0 * * * *` |
| Daily at midnight | `0 0 * * *` |
| Daily at 9am | `0 9 * * *` |
| Weekdays at 9am | `0 9 * * 1-5` |
| Every Sunday 2am | `0 2 * * 0` |
| 1st of month | `0 0 1 * *` |
| Every 15 min | `*/15 * * * *` |
| Twice daily | `0 8,20 * * *` |

## Special Characters

```bash
*   # Any value
,   # List: 1,3,5
-   # Range: 1-5
/   # Step: */15 (every 15 units)
```

## Linux Crontab

```bash
crontab -e    # Edit crontab
crontab -l    # List crontab
crontab -r    # Remove crontab

# Special strings
@reboot   # Run once at startup
@daily    # = 0 0 * * *
@weekly   # = 0 0 * * 0
@monthly  # = 0 0 1 * *

# Redirect output
0 9 * * * /path/to/script.sh >> /var/log/job.log 2>&1
```

## Node.js — node-cron

```javascript
const cron = require('node-cron');

// Every weekday at 9am
cron.schedule('0 9 * * 1-5', () => {
  console.log('Running weekday job');
}, {
  timezone: "America/New_York"
});

// Stop a task
const task = cron.schedule('*/5 * * * *', callback);
task.stop();
task.start();
```

## Python — APScheduler

```python
from apscheduler.schedulers.blocking import BlockingScheduler
import pytz

scheduler = BlockingScheduler()

@scheduler.scheduled_job('cron', hour=9, minute=0, day_of_week='mon-fri',
                          timezone=pytz.timezone('America/New_York'))
def weekday_job():
    print("Running weekday job")

scheduler.start()
```

## GitHub Actions Schedule

```yaml
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9am UTC
```

## Kubernetes CronJob

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: daily-backup
spec:
  schedule: "0 2 * * *"
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: backup-image:latest
          restartPolicy: OnFailure
```

## Quick Tool

Use **[DevToolBox Cron Expression Generator](https://viadreams.cc/en/tools/cron-expression-generator)** — visually build cron expressions and see human-readable descriptions instantly.

---

*Generate cron expressions visually with [DevToolBox's free Cron Expression Generator](https://viadreams.cc/en/tools/cron-expression-generator).*