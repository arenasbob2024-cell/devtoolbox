'use client';

import Link from 'next/link';
import React from 'react';

/* ────────────────────────────────────────────────────────────────────────── */
/*  Cron Expression Online Guide — Comprehensive Reference                   */
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
  border: '1px solid #bae6fd',
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

const ulStyle: React.CSSProperties = {
  paddingLeft: 24,
  marginBottom: 20,
  lineHeight: 1.9,
  color: 'var(--text-secondary)',
  fontSize: 15,
};

const olStyle: React.CSSProperties = {
  paddingLeft: 24,
  marginBottom: 20,
  lineHeight: 1.9,
  color: 'var(--text-secondary)',
  fontSize: 15,
};

/* ────── i18n translations ────── */

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cron Expression Online Guide: Syntax, Examples, Environments & Best Practices',
    intro: 'Cron expressions are the backbone of task scheduling across Unix/Linux systems, cloud platforms, and CI/CD pipelines. Whether you need to run a database backup every night at 3 AM, send weekly reports every Monday, or trigger a build pipeline every 15 minutes, cron expressions give you precise, declarative control over when your jobs execute. This comprehensive guide covers everything from basic 5-field syntax to advanced special characters, platform-specific differences, timezone handling, debugging techniques, and security considerations.',
    tldrTitle: 'TL;DR',
    tldrBody: 'A cron expression is a time-based scheduling string with 5 fields (minute, hour, day-of-month, month, day-of-week). Extended formats add seconds or year fields. Use special characters like *, /, -, and comma for flexible scheduling. Platform differences exist between Linux crontab, AWS EventBridge, GitHub Actions, Kubernetes CronJob, and Vercel Cron. Always consider timezones, overlap prevention, and output logging when deploying cron jobs in production.',
    keyTakeawaysTitle: 'Key Takeaways',
    kt1: 'Standard cron uses 5 fields; some systems (Quartz, Spring, AWS) add a 6th (seconds) or 7th (year) field.',
    kt2: 'The asterisk (*) means "every value", slash (/) defines step intervals, dash (-) defines ranges, and comma (,) defines lists.',
    kt3: 'Special characters L, W, and # are available in extended implementations like Quartz for last-day, weekday, and nth-weekday scheduling.',
    kt4: 'GitHub Actions and many CI/CD platforms run cron in UTC only; always verify which timezone your scheduler uses.',
    kt5: 'Use file locking (flock) or advisory locks to prevent overlapping cron job executions.',
    kt6: 'Redirect stdout and stderr to log files and set up monitoring alerts for production cron jobs.',
    whatIsTitle: 'What Is a Cron Expression?',
    whatIsP1: 'A cron expression is a compact, whitespace-separated string that tells a scheduler exactly when to run a task. The term "cron" comes from the Greek word "chronos" meaning time. The cron daemon (crond) has been a core part of Unix-like operating systems since the 1970s, and its expression syntax has become the universal standard for time-based scheduling.',
    whatIsP2: 'The most widely used format is the 5-field expression, where each field represents a time unit. Some implementations extend this to 6 or 7 fields.',
    fiveFieldTitle: '5-Field Format (Standard Cron)',
    fiveFieldDesc: 'The standard cron expression used in Linux crontab, Kubernetes CronJob, GitHub Actions, and Vercel Cron:',
    sixFieldTitle: '6-Field Format (Quartz / Spring)',
    sixFieldDesc: 'Used by Java-based schedulers like Quartz, Spring @Scheduled, and AWS CloudWatch Events:',
    fieldBreakdownTitle: 'Field-by-Field Breakdown',
    fieldMinute: 'Minute',
    fieldMinuteDesc: 'Allowed values: 0 through 59. Specifies the minute(s) of each hour when the job should run.',
    fieldHour: 'Hour',
    fieldHourDesc: 'Allowed values: 0 through 23 (24-hour format). 0 is midnight, 12 is noon, 23 is 11 PM.',
    fieldDom: 'Day of Month',
    fieldDomDesc: 'Allowed values: 1 through 31. Be careful with 29, 30, 31 as not all months have these days.',
    fieldMonth: 'Month',
    fieldMonthDesc: 'Allowed values: 1 through 12 (or JAN-DEC in some implementations). 1 is January, 12 is December.',
    fieldDow: 'Day of Week',
    fieldDowDesc: 'Allowed values: 0 through 7 (or SUN-SAT). Both 0 and 7 represent Sunday. 1 is Monday, 6 is Saturday.',
    specialCharsTitle: 'Special Characters Explained',
    charStarTitle: 'Asterisk (*)',
    charStarDesc: 'Matches every possible value for that field. Using * in the minute field means "every minute" (0 through 59).',
    charSlashTitle: 'Slash (/)',
    charSlashDesc: 'Defines step values (increments). */15 in the minute field means "every 15 minutes" (0, 15, 30, 45). You can also combine with a start value: 5/15 means "every 15 minutes starting at minute 5" (5, 20, 35, 50).',
    charDashTitle: 'Dash (-)',
    charDashDesc: 'Defines an inclusive range. 9-17 in the hour field means "every hour from 9 AM to 5 PM". 1-5 in the day-of-week field means "Monday through Friday".',
    charCommaTitle: 'Comma (,)',
    charCommaDesc: 'Specifies a list of discrete values. 1,15 in the day-of-month field means "the 1st and 15th of the month". 0,30 in the minute field means "at minute 0 and minute 30".',
    charLTitle: 'L (Last)',
    charLDesc: 'Available in Quartz and some extended implementations. In the day-of-month field, L means "the last day of the month". In the day-of-week field, 5L means "the last Friday of the month".',
    charWTitle: 'W (Weekday)',
    charWDesc: 'Available in Quartz and extended implementations. 15W in the day-of-month field means "the nearest weekday (Mon-Fri) to the 15th". If the 15th is a Saturday, the job runs on Friday the 14th.',
    charHashTitle: 'Hash (#)',
    charHashDesc: 'Available in Quartz. Specifies "the Nth weekday of the month". 5#3 in the day-of-week field means "the third Friday of every month". 1#1 means "the first Monday of each month".',
    charQuestionTitle: 'Question Mark (?)',
    charQuestionDesc: 'Used in Quartz and AWS to indicate "no specific value" for day-of-month or day-of-week. Required when one of these two fields has a specific value and the other must be left open.',
    commonPatternsTitle: 'Common Cron Patterns with Examples',
    envTitle: 'Cron in Different Environments',
    envLinuxTitle: 'Linux Crontab',
    envLinuxDesc: 'The classic cron implementation. Edit with "crontab -e", list with "crontab -l". Uses 5-field syntax. Runs in the system timezone by default. Supports MAILTO for emailing output.',
    envAwsTitle: 'AWS EventBridge (CloudWatch Events)',
    envAwsDesc: 'AWS uses a 6-field format: minute, hour, day-of-month, month, day-of-week, year. Requires ? for either day-of-month or day-of-week. Supports UTC only by default (EventBridge Scheduler supports timezones). Rate expressions are an alternative: rate(5 minutes).',
    envGithubTitle: 'GitHub Actions',
    envGithubDesc: 'Uses standard 5-field POSIX cron syntax in the schedule trigger. Runs in UTC only. Minimum interval is every 5 minutes. Jobs may be delayed during high load. Defined in .github/workflows/*.yml under on.schedule.',
    envK8sTitle: 'Kubernetes CronJob',
    envK8sDesc: 'Uses standard 5-field cron syntax in spec.schedule. Runs in the timezone of the kube-controller-manager (usually UTC). Starting from Kubernetes 1.27, you can set spec.timeZone (e.g., "America/New_York"). Supports concurrencyPolicy: Allow, Forbid, or Replace.',
    envVercelTitle: 'Vercel Cron',
    envVercelDesc: 'Defined in vercel.json under the crons array. Uses standard 5-field syntax. Runs in UTC. Triggers a serverless function at the specified path. Free tier allows 2 cron jobs per project; Pro tier allows more.',
    librariesTitle: 'Cron Expression Parsing Libraries',
    libNodeTitle: 'Node.js: cron-parser',
    libNodeDesc: 'The most popular cron parsing library for Node.js. Parses cron expressions and calculates the next N occurrence dates. Supports 5-field and 6-field (with seconds) formats.',
    libPythonTitle: 'Python: croniter',
    libPythonDesc: 'The standard Python library for iterating over cron schedule dates. Supports standard 5-field and extended 6-field expressions. Works well with datetime objects.',
    libOtherTitle: 'Other Languages',
    libOtherDesc: 'Go: robfig/cron (the de facto standard). Java: Quartz Scheduler (includes its own cron parser). Rust: cron crate. PHP: dragonmantank/cron-expression.',
    timezoneTitle: 'Timezone Handling in Cron Jobs',
    timezoneP1: 'Timezone mismanagement is the number one source of cron job bugs. Different systems handle timezones differently:',
    tz1: 'Linux crontab: Runs in the system timezone. Set the TZ variable at the top of crontab to override.',
    tz2: 'GitHub Actions: Always UTC. No timezone configuration available.',
    tz3: 'AWS EventBridge: UTC by default. EventBridge Scheduler supports IANA timezones.',
    tz4: 'Kubernetes: Controller timezone (usually UTC). Use spec.timeZone (Kubernetes 1.27+) for per-job timezone.',
    tz5: 'Vercel Cron: Always UTC.',
    tzDstTitle: 'Daylight Saving Time (DST) Considerations',
    tzDstDesc: 'When your cron job depends on local time and your timezone observes DST, jobs can be skipped or run twice during clock changes. Spring forward: a 2:30 AM job may be skipped. Fall back: a 1:30 AM job may run twice. Best practice is to run critical jobs in UTC and convert timestamps in your application logic.',
    debugTitle: 'Debugging Cron Jobs: Logging, Monitoring & Alerting',
    debugLoggingTitle: 'Logging Output',
    debugLoggingDesc: 'Always redirect stdout and stderr to a log file. In crontab:',
    debugMonitorTitle: 'Monitoring',
    debugMonitorDesc: 'Use a dead-man-switch service (Cronitor, Healthchecks.io, Better Uptime) where your cron job pings a URL on success. If the ping does not arrive within the expected window, you get alerted. This catches silent failures where the job runs but produces no output.',
    debugAlertTitle: 'Alerting',
    debugAlertDesc: 'Set MAILTO in crontab to receive email output. For cloud-based cron, integrate with PagerDuty, Opsgenie, or Slack webhooks. Monitor exit codes: a non-zero exit should trigger an alert.',
    debugDryRunTitle: 'Dry Run Testing',
    debugDryRunDesc: 'Before deploying, verify your cron expression by calculating the next several execution times. Use our online cron parser tool or the cron-parser library to generate upcoming dates programmatically.',
    alternativesTitle: 'Cron vs Alternatives',
    altSystemdTitle: 'systemd Timers',
    altSystemdDesc: 'Modern Linux alternative to cron. Advantages: better logging via journalctl, dependency management, and resource control with cgroups. Create a .timer unit file paired with a .service file. Supports monotonic timers (run 5 minutes after boot) and calendar-based timers.',
    altAtTitle: 'at Command',
    altAtDesc: 'One-shot scheduler for running a command once at a specific time. Unlike cron, it does not repeat. Useful for scheduled maintenance or deferred tasks. Syntax: echo "command" | at 3:00 PM tomorrow.',
    altTaskSchedTitle: 'Windows Task Scheduler',
    altTaskSchedDesc: 'The Windows equivalent of cron. GUI-based with XML-backed definitions. Supports triggers (time, event, logon) and conditions (idle, network). Can be managed via PowerShell with the ScheduledTasks module.',
    altComparisonTitle: 'Quick Comparison',
    mistakesTitle: 'Common Mistakes and Pitfalls',
    mistake1Title: 'Forgetting Timezone',
    mistake1Desc: 'Your cron daemon and your mental model may use different timezones. Always verify with "date" on the server or check the scheduler documentation. CI/CD platforms almost always use UTC.',
    mistake2Title: 'Running Every Minute Accidentally',
    mistake2Desc: 'The expression * * * * * runs your job 1,440 times per day. This is rarely what you want. Use */5 * * * * for every 5 minutes or 0 * * * * for every hour.',
    mistake3Title: 'Confusing Day-of-Week Numbering',
    mistake3Desc: 'In standard POSIX cron, Sunday is 0 (and also 7). Monday is 1. But in Quartz, Sunday is 1 and Saturday is 7. Check your platform documentation.',
    mistake4Title: 'Not Handling Overlapping Executions',
    mistake4Desc: 'If a job takes 10 minutes but runs every 5 minutes, you get overlapping executions. Use flock, Kubernetes concurrencyPolicy: Forbid, or a distributed lock (Redis SETNX).',
    mistake5Title: 'Ignoring Output and Errors',
    mistake5Desc: 'Cron runs without a terminal. Environment variables, PATH, and shell initialization differ from interactive sessions. Always use absolute paths for commands and redirect output.',
    mistake6Title: 'Specifying Both Day-of-Month and Day-of-Week',
    mistake6Desc: 'In standard cron, if both fields are set (not *), the job runs when EITHER condition matches (OR logic), not when both match (AND logic). This catches many developers off guard.',
    securityTitle: 'Security Considerations for Cron Jobs',
    sec1Title: 'Principle of Least Privilege',
    sec1Desc: 'Run cron jobs under a dedicated service account, not root. Use /etc/cron.allow and /etc/cron.deny to control which users can create crontabs.',
    sec2Title: 'Secure Script Paths',
    sec2Desc: 'Use absolute paths in your crontab entries. A relative path could be hijacked by a malicious script placed in the working directory. Ensure scripts and their parent directories have proper permissions (owned by root or the service account, not world-writable).',
    sec3Title: 'Protect Credentials',
    sec3Desc: 'Never hardcode passwords or API keys in cron scripts. Use environment variables loaded from a secured file (chmod 600), a secrets manager (AWS Secrets Manager, HashiCorp Vault), or Kubernetes Secrets.',
    sec4Title: 'Audit and Rotate Logs',
    sec4Desc: 'Cron job logs can contain sensitive data. Use logrotate to manage log file sizes. Restrict log file permissions. Consider forwarding logs to a centralized system with access controls.',
    sec5Title: 'Monitor for Unauthorized Changes',
    sec5Desc: 'Use file integrity monitoring (AIDE, OSSEC) to detect unauthorized modifications to crontab files. Review /var/spool/cron/ periodically.',
    tryToolCta: 'Parse and test your cron expressions interactively',
    tryToolButton: 'Open Cron Expression Parser',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a cron expression and what are the 5 fields?',
    faq1a: 'A cron expression is a time-based string that defines when a scheduled job runs. The 5 fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7, where 0 and 7 both represent Sunday). Each field can use special characters like *, /, -, and comma to define complex schedules.',
    faq2q: 'How do I write a cron expression for every 5 minutes?',
    faq2a: 'Use */5 * * * *. The */5 in the minute field means "every 5th minute starting from 0". This triggers at minutes 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, and 55 of every hour, every day.',
    faq3q: 'What is the difference between 5-field and 6-field cron expressions?',
    faq3a: 'The standard 5-field format covers minute, hour, day-of-month, month, and day-of-week. The 6-field format (used by Quartz Scheduler, Spring, and AWS) prepends a seconds field. Some 7-field formats also append a year field. GitHub Actions, Kubernetes, and Linux crontab use the 5-field format.',
    faq4q: 'How do cron expressions handle timezones?',
    faq4a: 'Linux crontab uses the system timezone (overridable with the TZ variable). GitHub Actions and Vercel always use UTC. AWS EventBridge Scheduler supports IANA timezone names. Kubernetes 1.27+ supports spec.timeZone on CronJob resources. Always verify your scheduler timezone to avoid missed or doubled executions.',
    faq5q: 'What do the special characters L, W, and # mean in cron?',
    faq5a: 'These are Quartz/extended-only characters. L means "last": in day-of-month it is the last day; 5L in day-of-week is the last Friday. W means "nearest weekday": 15W fires on the closest Mon-Fri to the 15th. # means "nth day": 5#3 in day-of-week is the third Friday of the month.',
    faq6q: 'How can I prevent overlapping cron job executions?',
    faq6a: 'Use a file lock with flock: flock -n /tmp/myjob.lock /path/to/script.sh. In Kubernetes, set concurrencyPolicy: Forbid on the CronJob spec. For distributed systems, use a distributed lock via Redis SETNX or a database advisory lock.',
    faq7q: 'What is the difference between cron and systemd timers?',
    faq7a: 'Cron is the traditional Unix job scheduler with a simple expression syntax. systemd timers are the modern Linux alternative offering better logging (journalctl), dependency management, resource control via cgroups, and both monotonic (relative) and calendar (absolute) timer types. systemd timers require two unit files (.timer + .service) compared to a single crontab line.',
    faq8q: 'Can I use cron expressions in Docker containers?',
    faq8a: 'Yes, but the recommended approach is to use the host system cron or an orchestrator (Kubernetes CronJob, ECS Scheduled Tasks) rather than installing cron inside the container. If you must run cron in a container, ensure the cron daemon is the foreground process (cron -f) and that your Dockerfile installs cron and sets up the crontab correctly.',
    conclusionTitle: 'Conclusion',
    conclusionP1: 'Cron expressions remain the universal language for time-based task scheduling. From a simple Linux crontab entry to sophisticated Kubernetes CronJobs with timezone support and concurrency policies, the core syntax has stood the test of time since the 1970s.',
    conclusionP2: 'The keys to reliable cron job management are: understand your platform syntax and timezone, prevent overlapping runs, log all output, monitor execution with dead-man switches, and follow security best practices. Use our online cron expression parser to validate and test your expressions before deploying them to production.',
  },
  zh: {
    title: 'Cron 表达式在线指南：语法、示例、环境与最佳实践',
    intro: 'Cron 表达式是 Unix/Linux 系统、云平台和 CI/CD 流水线中任务调度的基础。无论你需要每晚 3 点运行数据库备份、每周一发送报告，还是每 15 分钟触发一次构建流水线，cron 表达式都能提供精确的声明式控制。本全面指南涵盖从基础 5 字段语法到高级特殊字符、平台差异、时区处理、调试技术和安全注意事项的方方面面。',
    tldrTitle: 'TL;DR',
    tldrBody: 'Cron 表达式是一种基于时间的调度字符串，包含 5 个字段（分钟、小时、日、月、星期）。扩展格式添加秒或年字段。使用 *、/、-、逗号等特殊字符实现灵活调度。Linux crontab、AWS EventBridge、GitHub Actions、Kubernetes CronJob 和 Vercel Cron 之间存在平台差异。生产环境中部署 cron 任务时，务必考虑时区、重叠防护和输出日志。',
    keyTakeawaysTitle: '要点总结',
    kt1: '标准 cron 使用 5 个字段；部分系统（Quartz、Spring、AWS）增加第 6 个字段（秒）或第 7 个字段（年）。',
    kt2: '星号（*）表示"每个值"，斜杠（/）定义步长间隔，破折号（-）定义范围，逗号（,）定义列表。',
    kt3: '扩展实现（如 Quartz）中可使用 L、W 和 # 特殊字符，分别用于月末、工作日和第 N 个星期几的调度。',
    kt4: 'GitHub Actions 和许多 CI/CD 平台仅在 UTC 时区运行 cron；请务必确认你的调度器使用的时区。',
    kt5: '使用文件锁（flock）或咨询锁防止 cron 任务重叠执行。',
    kt6: '将 stdout 和 stderr 重定向到日志文件，并为生产环境的 cron 任务设置监控告警。',
    whatIsTitle: '什么是 Cron 表达式？',
    whatIsP1: 'Cron 表达式是一种紧凑的、以空格分隔的字符串，用于告诉调度器精确的任务执行时间。"cron"一词源自希腊语"chronos"（时间）。cron 守护进程（crond）自 1970 年代起就是类 Unix 操作系统的核心组件，其表达式语法已成为基于时间调度的通用标准。',
    whatIsP2: '最广泛使用的格式是 5 字段表达式，每个字段代表一个时间单位。部分实现扩展为 6 或 7 个字段。',
    fiveFieldTitle: '5 字段格式（标准 Cron）',
    fiveFieldDesc: 'Linux crontab、Kubernetes CronJob、GitHub Actions 和 Vercel Cron 使用的标准 cron 表达式：',
    sixFieldTitle: '6 字段格式（Quartz / Spring）',
    sixFieldDesc: 'Java 调度器（如 Quartz、Spring @Scheduled 和 AWS CloudWatch Events）使用的格式：',
    fieldBreakdownTitle: '逐字段详解',
    fieldMinute: '分钟',
    fieldMinuteDesc: '允许值：0 到 59。指定每小时中任务应运行的分钟。',
    fieldHour: '小时',
    fieldHourDesc: '允许值：0 到 23（24 小时制）。0 为午夜，12 为中午，23 为晚上 11 点。',
    fieldDom: '日期（月中第几天）',
    fieldDomDesc: '允许值：1 到 31。注意 29、30、31 日并非所有月份都有。',
    fieldMonth: '月份',
    fieldMonthDesc: '允许值：1 到 12（部分实现支持 JAN-DEC）。1 为一月，12 为十二月。',
    fieldDow: '星期（周中第几天）',
    fieldDowDesc: '允许值：0 到 7（或 SUN-SAT）。0 和 7 都表示周日。1 为周一，6 为周六。',
    specialCharsTitle: '特殊字符详解',
    charStarTitle: '星号（*）',
    charStarDesc: '匹配该字段的每个可能值。在分钟字段使用 * 表示"每一分钟"（0 到 59）。',
    charSlashTitle: '斜杠（/）',
    charSlashDesc: '定义步长值（增量）。分钟字段中的 */15 表示"每 15 分钟"（0、15、30、45）。也可与起始值组合：5/15 表示"从第 5 分钟开始每隔 15 分钟"（5、20、35、50）。',
    charDashTitle: '破折号（-）',
    charDashDesc: '定义包含范围。小时字段中的 9-17 表示"上午 9 点到下午 5 点的每个小时"。星期字段中的 1-5 表示"周一到周五"。',
    charCommaTitle: '逗号（,）',
    charCommaDesc: '指定离散值列表。日期字段中的 1,15 表示"每月 1 日和 15 日"。分钟字段中的 0,30 表示"第 0 分钟和第 30 分钟"。',
    charLTitle: 'L（Last，最后）',
    charLDesc: '在 Quartz 和部分扩展实现中可用。在日期字段中，L 表示"当月最后一天"。在星期字段中，5L 表示"当月最后一个周五"。',
    charWTitle: 'W（Weekday，工作日）',
    charWDesc: '在 Quartz 和扩展实现中可用。日期字段中的 15W 表示"离 15 日最近的工作日（周一到周五）"。如果 15 日是周六，则任务在周五 14 日运行。',
    charHashTitle: '井号（#）',
    charHashDesc: '在 Quartz 中可用。指定"当月第 N 个星期几"。星期字段中的 5#3 表示"每月第三个周五"。1#1 表示"每月第一个周一"。',
    charQuestionTitle: '问号（?）',
    charQuestionDesc: '在 Quartz 和 AWS 中使用，表示日期或星期字段"无特定值"。当其中一个字段有具体值时，另一个必须使用 ?。',
    commonPatternsTitle: '常用 Cron 模式与示例',
    envTitle: '不同环境中的 Cron',
    envLinuxTitle: 'Linux Crontab',
    envLinuxDesc: '经典 cron 实现。用 "crontab -e" 编辑，"crontab -l" 列出。使用 5 字段语法。默认使用系统时区。支持 MAILTO 发送输出邮件。',
    envAwsTitle: 'AWS EventBridge（CloudWatch Events）',
    envAwsDesc: 'AWS 使用 6 字段格式：分钟、小时、日期、月份、星期、年份。要求日期或星期其中一个使用 ?。默认仅支持 UTC（EventBridge Scheduler 支持时区）。也可用速率表达式：rate(5 minutes)。',
    envGithubTitle: 'GitHub Actions',
    envGithubDesc: '在 schedule 触发器中使用标准 5 字段 POSIX cron 语法。仅在 UTC 运行。最小间隔为 5 分钟。高负载时任务可能延迟。在 .github/workflows/*.yml 的 on.schedule 中定义。',
    envK8sTitle: 'Kubernetes CronJob',
    envK8sDesc: '在 spec.schedule 中使用标准 5 字段 cron 语法。在 kube-controller-manager 的时区运行（通常是 UTC）。Kubernetes 1.27 起可设置 spec.timeZone（如 "America/New_York"）。支持 concurrencyPolicy: Allow、Forbid 或 Replace。',
    envVercelTitle: 'Vercel Cron',
    envVercelDesc: '在 vercel.json 的 crons 数组中定义。使用标准 5 字段语法。在 UTC 运行。触发指定路径的 Serverless 函数。免费版每项目 2 个 cron 任务；Pro 版更多。',
    librariesTitle: 'Cron 表达式解析库',
    libNodeTitle: 'Node.js: cron-parser',
    libNodeDesc: 'Node.js 最流行的 cron 解析库。解析 cron 表达式并计算接下来 N 次执行时间。支持 5 字段和 6 字段（含秒）格式。',
    libPythonTitle: 'Python: croniter',
    libPythonDesc: 'Python 标准的 cron 日期迭代库。支持标准 5 字段和扩展 6 字段表达式。与 datetime 对象配合良好。',
    libOtherTitle: '其他语言',
    libOtherDesc: 'Go: robfig/cron（事实标准）。Java: Quartz Scheduler（内置 cron 解析器）。Rust: cron crate。PHP: dragonmantank/cron-expression。',
    timezoneTitle: 'Cron 任务的时区处理',
    timezoneP1: '时区管理不当是 cron 任务 bug 的头号来源。不同系统处理时区的方式各异：',
    tz1: 'Linux crontab：使用系统时区。可在 crontab 顶部设置 TZ 变量来覆盖。',
    tz2: 'GitHub Actions：始终使用 UTC。无时区配置选项。',
    tz3: 'AWS EventBridge：默认 UTC。EventBridge Scheduler 支持 IANA 时区。',
    tz4: 'Kubernetes：控制器时区（通常是 UTC）。使用 spec.timeZone（Kubernetes 1.27+）为每个任务设置时区。',
    tz5: 'Vercel Cron：始终使用 UTC。',
    tzDstTitle: '夏令时（DST）注意事项',
    tzDstDesc: '当 cron 任务依赖本地时间且所在时区实行夏令时，时钟调整时任务可能被跳过或重复运行。春季时钟前调：凌晨 2:30 的任务可能被跳过。秋季时钟回调：凌晨 1:30 的任务可能运行两次。最佳实践是在 UTC 运行关键任务，在应用逻辑中进行时间戳转换。',
    debugTitle: '调试 Cron 任务：日志、监控与告警',
    debugLoggingTitle: '日志记录',
    debugLoggingDesc: '始终将 stdout 和 stderr 重定向到日志文件。在 crontab 中：',
    debugMonitorTitle: '监控',
    debugMonitorDesc: '使用死人开关服务（Cronitor、Healthchecks.io、Better Uptime），让 cron 任务成功时 ping 一个 URL。如果在预期时间窗口内没有收到 ping，你会收到告警。这可以捕获任务运行但无输出的静默失败。',
    debugAlertTitle: '告警',
    debugAlertDesc: '在 crontab 中设置 MAILTO 接收邮件输出。对于云端 cron，集成 PagerDuty、Opsgenie 或 Slack webhook。监控退出码：非零退出应触发告警。',
    debugDryRunTitle: '模拟测试',
    debugDryRunDesc: '部署前，通过计算接下来几次执行时间来验证 cron 表达式。使用我们的在线 cron 解析器工具或 cron-parser 库以编程方式生成即将到来的日期。',
    alternativesTitle: 'Cron 的替代方案',
    altSystemdTitle: 'systemd 定时器',
    altSystemdDesc: '现代 Linux 替代方案。优势：通过 journalctl 获得更好的日志、依赖管理和 cgroups 资源控制。创建 .timer 单元文件配合 .service 文件。支持单调定时器（启动后 5 分钟运行）和基于日历的定时器。',
    altAtTitle: 'at 命令',
    altAtDesc: '一次性调度器，在特定时间运行一次命令。与 cron 不同，它不会重复。适用于计划维护或延迟任务。',
    altTaskSchedTitle: 'Windows 任务计划程序',
    altTaskSchedDesc: 'Windows 版本的 cron。基于 GUI 和 XML 定义。支持触发器（时间、事件、登录）和条件（空闲、网络）。可通过 PowerShell 的 ScheduledTasks 模块管理。',
    altComparisonTitle: '快速对比',
    mistakesTitle: '常见错误与陷阱',
    mistake1Title: '忘记时区',
    mistake1Desc: '你的 cron 守护进程和你的预期可能使用不同的时区。务必在服务器上用 "date" 验证或查阅调度器文档。CI/CD 平台几乎都使用 UTC。',
    mistake2Title: '意外地每分钟运行',
    mistake2Desc: '表达式 * * * * * 每天运行 1440 次。这很少是你想要的。使用 */5 * * * * 表示每 5 分钟，0 * * * * 表示每小时。',
    mistake3Title: '混淆星期编号',
    mistake3Desc: '标准 POSIX cron 中，周日是 0（也是 7），周一是 1。但在 Quartz 中，周日是 1，周六是 7。请查阅平台文档。',
    mistake4Title: '未处理重叠执行',
    mistake4Desc: '如果任务耗时 10 分钟但每 5 分钟运行一次，就会出现重叠执行。使用 flock、Kubernetes concurrencyPolicy: Forbid 或分布式锁（Redis SETNX）。',
    mistake5Title: '忽略输出和错误',
    mistake5Desc: 'Cron 在没有终端的环境运行。环境变量、PATH 和 shell 初始化与交互式会话不同。始终使用命令的绝对路径并重定向输出。',
    mistake6Title: '同时指定日期和星期',
    mistake6Desc: '标准 cron 中，如果两个字段都设置了（非 *），任务在任一条件匹配时运行（OR 逻辑），而非两者都匹配（AND 逻辑）。这让许多开发者措手不及。',
    securityTitle: 'Cron 任务的安全注意事项',
    sec1Title: '最小权限原则',
    sec1Desc: '以专用服务账户而非 root 运行 cron 任务。使用 /etc/cron.allow 和 /etc/cron.deny 控制哪些用户可以创建 crontab。',
    sec2Title: '安全的脚本路径',
    sec2Desc: '在 crontab 条目中使用绝对路径。相对路径可能被放置在工作目录中的恶意脚本劫持。确保脚本及其父目录具有适当的权限。',
    sec3Title: '保护凭据',
    sec3Desc: '切勿在 cron 脚本中硬编码密码或 API 密钥。使用从安全文件（chmod 600）加载的环境变量、密钥管理器（AWS Secrets Manager、HashiCorp Vault）或 Kubernetes Secrets。',
    sec4Title: '审计和轮换日志',
    sec4Desc: 'Cron 任务日志可能包含敏感数据。使用 logrotate 管理日志文件大小。限制日志文件权限。考虑将日志转发到具有访问控制的集中式系统。',
    sec5Title: '监控未授权变更',
    sec5Desc: '使用文件完整性监控（AIDE、OSSEC）检测对 crontab 文件的未授权修改。定期审查 /var/spool/cron/。',
    tryToolCta: '在线解析和测试你的 cron 表达式',
    tryToolButton: '打开 Cron 表达式解析器',
    faqTitle: '常见问题',
    faq1q: '什么是 cron 表达式，5 个字段分别是什么？',
    faq1a: 'Cron 表达式是一种基于时间的字符串，定义计划任务的执行时间。5 个字段是：分钟（0-59）、小时（0-23）、日期（1-31）、月份（1-12）和星期（0-7，其中 0 和 7 都代表周日）。每个字段可使用 *、/、- 和逗号等特殊字符定义复杂调度。',
    faq2q: '如何编写每 5 分钟执行一次的 cron 表达式？',
    faq2a: '使用 */5 * * * *。分钟字段中的 */5 表示"从 0 开始每第 5 分钟"。每小时在第 0、5、10、15、20、25、30、35、40、45、50、55 分钟触发。',
    faq3q: '5 字段和 6 字段 cron 表达式有什么区别？',
    faq3a: '标准 5 字段格式包含分钟、小时、日期、月份和星期。6 字段格式（Quartz Scheduler、Spring 和 AWS 使用）在前面增加了秒字段。某些 7 字段格式还在末尾追加年份字段。GitHub Actions、Kubernetes 和 Linux crontab 使用 5 字段格式。',
    faq4q: 'Cron 表达式如何处理时区？',
    faq4a: 'Linux crontab 使用系统时区（可通过 TZ 变量覆盖）。GitHub Actions 和 Vercel 始终使用 UTC。AWS EventBridge Scheduler 支持 IANA 时区名称。Kubernetes 1.27+ 支持 CronJob 资源的 spec.timeZone。务必验证调度器时区以避免漏执行或重复执行。',
    faq5q: '特殊字符 L、W 和 # 在 cron 中是什么意思？',
    faq5a: '这些是 Quartz/扩展实现专用字符。L 表示"最后"：在日期字段为当月最后一天；星期字段中 5L 为当月最后一个周五。W 表示"最近的工作日"：15W 在最接近 15 日的周一至周五触发。# 表示"第 N 个"：星期字段中 5#3 为当月第三个周五。',
    faq6q: '如何防止 cron 任务重叠执行？',
    faq6a: '使用 flock 文件锁：flock -n /tmp/myjob.lock /path/to/script.sh。在 Kubernetes 中，在 CronJob spec 上设置 concurrencyPolicy: Forbid。对于分布式系统，通过 Redis SETNX 或数据库咨询锁使用分布式锁。',
    faq7q: 'cron 和 systemd 定时器有什么区别？',
    faq7a: 'Cron 是传统的 Unix 任务调度器，语法简单。systemd 定时器是现代 Linux 替代方案，提供更好的日志（journalctl）、依赖管理、通过 cgroups 的资源控制，以及单调（相对）和日历（绝对）两种定时器类型。systemd 定时器需要两个单元文件（.timer + .service），而 cron 只需一行 crontab。',
    faq8q: '可以在 Docker 容器中使用 cron 表达式吗？',
    faq8a: '可以，但推荐使用宿主机 cron 或编排器（Kubernetes CronJob、ECS Scheduled Tasks）而非在容器内安装 cron。如果必须在容器中运行 cron，确保 cron 守护进程是前台进程（cron -f），并在 Dockerfile 中正确安装 cron 和设置 crontab。',
    conclusionTitle: '总结',
    conclusionP1: 'Cron 表达式仍然是基于时间的任务调度的通用语言。从简单的 Linux crontab 条目到具有时区支持和并发策略的复杂 Kubernetes CronJob，其核心语法自 1970 年代起经受住了时间的考验。',
    conclusionP2: '可靠的 cron 任务管理关键在于：了解平台语法和时区、防止重叠运行、记录所有输出、使用死人开关监控执行，以及遵循安全最佳实践。使用我们的在线 cron 表达式解析器在部署到生产环境之前验证和测试你的表达式。',
  },
};

/* ────── Component ────── */

export default function CronExpressionOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];
  const toolLink = `/${lang}/tools/cron-expression-parser`;

  /* ── FAQ Schema ── */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
      { '@type': 'Question', name: t.faq7q, acceptedAnswer: { '@type': 'Answer', text: t.faq7a } },
      { '@type': 'Question', name: t.faq8q, acceptedAnswer: { '@type': 'Answer', text: t.faq8a } },
    ],
  };

  /* ── Cron examples table data ── */
  const cronExamples = [
    ['* * * * *', 'Every minute'],
    ['*/5 * * * *', 'Every 5 minutes'],
    ['*/15 * * * *', 'Every 15 minutes'],
    ['0 * * * *', 'Every hour (at minute 0)'],
    ['0 0 * * *', 'Daily at midnight'],
    ['0 6 * * *', 'Daily at 6:00 AM'],
    ['30 8 * * 1-5', 'Weekdays at 8:30 AM'],
    ['0 9 * * 1', 'Every Monday at 9:00 AM'],
    ['0 0 * * 0', 'Every Sunday at midnight'],
    ['0 0 1 * *', 'First day of every month (midnight)'],
    ['0 0 1 1 *', 'January 1st at midnight'],
    ['0 0 1 */3 *', 'Every 3 months (quarterly)'],
    ['0 12 * * 1-5', 'Weekdays at noon'],
    ['0 0 * * 1,4', 'Monday and Thursday at midnight'],
    ['0 8-17 * * 1-5', 'Hourly from 8 AM to 5 PM, weekdays'],
    ['0 */2 * * *', 'Every 2 hours'],
    ['0 22 * * 5', 'Every Friday at 10 PM'],
    ['0 0 15 * *', '15th of every month at midnight'],
  ];

  /* ── Alternatives comparison data ── */
  const altComparison = [
    ['Feature', 'cron', 'systemd timers', 'at', 'Task Scheduler'],
    ['Recurring', 'Yes', 'Yes', 'No (one-shot)', 'Yes'],
    ['Logging', 'Manual redirect', 'journalctl', 'Mail', 'Event Viewer'],
    ['Dependencies', 'None', 'After/Requires', 'None', 'Triggers'],
    ['Resource limits', 'None', 'cgroups', 'None', 'Settings'],
    ['Syntax', '5 fields', 'Calendar spec', 'Natural language', 'GUI / XML'],
    ['Platform', 'Unix/Linux', 'Linux (systemd)', 'Unix/Linux', 'Windows'],
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Introduction ── */}
      <p style={pStyle}>{t.intro}</p>

      {/* ── TL;DR Box ── */}
      <div style={tldrBoxStyle}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: '#0369a1' }}>{t.tldrTitle}</h3>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#334155', margin: 0 }}>{t.tldrBody}</p>
      </div>

      {/* ── Key Takeaways ── */}
      <div style={keyTakeawaysStyle}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>{t.keyTakeawaysTitle}</h3>
        <ul style={{ ...ulStyle, marginBottom: 0 }}>
          <li>{t.kt1}</li>
          <li>{t.kt2}</li>
          <li>{t.kt3}</li>
          <li>{t.kt4}</li>
          <li>{t.kt5}</li>
          <li>{t.kt6}</li>
        </ul>
      </div>

      {/* ── What Is a Cron Expression? ── */}
      <h2 style={h2Style}>{t.whatIsTitle}</h2>
      <p style={pStyle}>{t.whatIsP1}</p>
      <p style={pStyle}>{t.whatIsP2}</p>

      {/* ── 5-Field Format ── */}
      <h3 style={h3Style}>{t.fiveFieldTitle}</h3>
      <p style={pStyle}>{t.fiveFieldDesc}</p>
      <pre style={codeBlockStyle}><code>{`\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${t.fieldMinute} (0\u201359)
\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${t.fieldHour} (0\u201323)
\u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${t.fieldDom} (1\u201331)
\u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${t.fieldMonth} (1\u201312)
\u2502 \u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500 ${t.fieldDow} (0\u20137)
\u2502 \u2502 \u2502 \u2502 \u2502
* * * * *`}</code></pre>

      {/* ── 6-Field Format ── */}
      <h3 style={h3Style}>{t.sixFieldTitle}</h3>
      <p style={pStyle}>{t.sixFieldDesc}</p>
      <pre style={codeBlockStyle}><code>{`\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 seconds (0\u201359)
\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${t.fieldMinute} (0\u201359)
\u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${t.fieldHour} (0\u201323)
\u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${t.fieldDom} (1\u201331)
\u2502 \u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${t.fieldMonth} (1\u201312)
\u2502 \u2502 \u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500 ${t.fieldDow} (0\u20137)
\u2502 \u2502 \u2502 \u2502 \u2502 \u2502
* * * * * *`}</code></pre>

      {/* ── Field-by-Field Breakdown ── */}
      <h2 style={h2Style}>{t.fieldBreakdownTitle}</h2>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.fieldMinute}</h3>
        <p style={pStyle}>{t.fieldMinuteDesc}</p>
        <pre style={codeBlockStyle}><code>{`0      \u2192 at the top of the hour
*/5    \u2192 every 5 minutes (0, 5, 10, 15, ...)
15,45  \u2192 at minute 15 and 45
10-20  \u2192 every minute from 10 through 20`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.fieldHour}</h3>
        <p style={pStyle}>{t.fieldHourDesc}</p>
        <pre style={codeBlockStyle}><code>{`0      \u2192 midnight
9      \u2192 9 AM
9-17   \u2192 every hour from 9 AM to 5 PM
*/4    \u2192 every 4 hours (0, 4, 8, 12, 16, 20)`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.fieldDom}</h3>
        <p style={pStyle}>{t.fieldDomDesc}</p>
        <pre style={codeBlockStyle}><code>{`1      \u2192 first day of month
15     \u2192 15th of the month
1,15   \u2192 1st and 15th
L      \u2192 last day (Quartz only)`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.fieldMonth}</h3>
        <p style={pStyle}>{t.fieldMonthDesc}</p>
        <pre style={codeBlockStyle}><code>{`1       \u2192 January
*/3     \u2192 every 3 months (Jan, Apr, Jul, Oct)
6-8     \u2192 June through August
1,4,7,10 \u2192 quarterly (Jan, Apr, Jul, Oct)`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.fieldDow}</h3>
        <p style={pStyle}>{t.fieldDowDesc}</p>
        <pre style={codeBlockStyle}><code>{`0 or 7  \u2192 Sunday
1       \u2192 Monday
1-5     \u2192 Monday through Friday (weekdays)
0,6     \u2192 Saturday and Sunday (weekend)
5#3     \u2192 3rd Friday (Quartz only)`}</code></pre>
      </div>

      {/* ── Special Characters ── */}
      <h2 style={h2Style}>{t.specialCharsTitle}</h2>

      <h3 style={h3Style}>{t.charStarTitle}</h3>
      <p style={pStyle}>{t.charStarDesc}</p>
      <pre style={codeBlockStyle}><code>{`* * * * *     # every minute of every hour of every day`}</code></pre>

      <h3 style={h3Style}>{t.charSlashTitle}</h3>
      <p style={pStyle}>{t.charSlashDesc}</p>
      <pre style={codeBlockStyle}><code>{`*/10 * * * *  # every 10 minutes
5/15 * * * *  # minutes 5, 20, 35, 50
0 */6 * * *   # every 6 hours at minute 0`}</code></pre>

      <h3 style={h3Style}>{t.charDashTitle}</h3>
      <p style={pStyle}>{t.charDashDesc}</p>
      <pre style={codeBlockStyle}><code>{`0 9-17 * * *  # hourly from 9 AM to 5 PM
0 0 * * 1-5   # midnight, Monday through Friday`}</code></pre>

      <h3 style={h3Style}>{t.charCommaTitle}</h3>
      <p style={pStyle}>{t.charCommaDesc}</p>
      <pre style={codeBlockStyle}><code>{`0 0 1,15 * *  # 1st and 15th at midnight
0 8,12,18 * * * # at 8 AM, noon, and 6 PM`}</code></pre>

      <h3 style={h3Style}>{t.charLTitle}</h3>
      <p style={pStyle}>{t.charLDesc}</p>
      <pre style={codeBlockStyle}><code>{`# Quartz / Spring only:
0 0 L * ?     # last day of every month at midnight
0 0 ? * 5L    # last Friday of every month at midnight`}</code></pre>

      <h3 style={h3Style}>{t.charWTitle}</h3>
      <p style={pStyle}>{t.charWDesc}</p>
      <pre style={codeBlockStyle}><code>{`# Quartz only:
0 0 15W * ?   # nearest weekday to the 15th at midnight
0 0 1W * ?    # nearest weekday to the 1st at midnight`}</code></pre>

      <h3 style={h3Style}>{t.charHashTitle}</h3>
      <p style={pStyle}>{t.charHashDesc}</p>
      <pre style={codeBlockStyle}><code>{`# Quartz only:
0 10 ? * 5#3  # 3rd Friday at 10 AM
0 9 ? * 1#1   # 1st Monday at 9 AM
0 9 ? * 1#2   # 2nd Monday at 9 AM`}</code></pre>

      <h3 style={h3Style}>{t.charQuestionTitle}</h3>
      <p style={pStyle}>{t.charQuestionDesc}</p>
      <pre style={codeBlockStyle}><code>{`# AWS / Quartz:
0 10 ? * 2    # every Monday at 10 AM (? for day-of-month)
0 0 15 * ?    # 15th of month at midnight (? for day-of-week)`}</code></pre>

      {/* ── Common Cron Patterns ── */}
      <h2 style={h2Style}>{t.commonPatternsTitle}</h2>
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
              <tr key={i}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, whiteSpace: 'nowrap' }}>{expr}</td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CTA ── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 12, color: 'var(--text-primary)' }}>{t.tryToolCta}</p>
        <Link href={toolLink} style={{ display: 'inline-block', padding: '10px 28px', background: 'var(--accent-blue)', color: '#fff', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
          {t.tryToolButton}
        </Link>
      </div>

      {/* ── Environments ── */}
      <h2 style={h2Style}>{t.envTitle}</h2>

      <h3 style={h3Style}>{t.envLinuxTitle}</h3>
      <p style={pStyle}>{t.envLinuxDesc}</p>
      <pre style={codeBlockStyle}><code>{`# Edit current user's crontab
crontab -e

# List current crontab entries
crontab -l

# Example: backup database daily at 3 AM
0 3 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1

# Set timezone (at top of crontab)
TZ=America/New_York
0 9 * * * /path/to/script.sh

# Send output via email
MAILTO=admin@example.com
0 6 * * 1 /path/to/weekly-report.sh`}</code></pre>

      <h3 style={h3Style}>{t.envAwsTitle}</h3>
      <p style={pStyle}>{t.envAwsDesc}</p>
      <pre style={codeBlockStyle}><code>{`# AWS EventBridge 6-field format:
# minute hour day-of-month month day-of-week year

# Every 5 minutes
cron(*/5 * * * ? *)

# Daily at 10 AM UTC
cron(0 10 * * ? *)

# First Monday of every month at 8 AM
cron(0 8 ? * 2#1 *)

# Rate expression alternative
rate(5 minutes)
rate(1 hour)
rate(7 days)`}</code></pre>

      <h3 style={h3Style}>{t.envGithubTitle}</h3>
      <p style={pStyle}>{t.envGithubDesc}</p>
      <pre style={codeBlockStyle}><code>{`# .github/workflows/scheduled.yml
name: Scheduled Job
on:
  schedule:
    # Runs at 06:00 UTC every day
    - cron: '0 6 * * *'
    # Runs every 15 minutes
    - cron: '*/15 * * * *'
    # Runs every Monday at 9 AM UTC
    - cron: '0 9 * * 1'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Triggered by cron schedule"`}</code></pre>

      <h3 style={h3Style}>{t.envK8sTitle}</h3>
      <p style={pStyle}>{t.envK8sDesc}</p>
      <pre style={codeBlockStyle}><code>{`apiVersion: batch/v1
kind: CronJob
metadata:
  name: database-backup
spec:
  schedule: "0 3 * * *"          # daily at 3 AM
  timeZone: "America/New_York"   # K8s 1.27+
  concurrencyPolicy: Forbid      # prevent overlapping
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 5
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:16
            command: ["/bin/sh", "-c", "pg_dump ..."]
          restartPolicy: OnFailure`}</code></pre>

      <h3 style={h3Style}>{t.envVercelTitle}</h3>
      <p style={pStyle}>{t.envVercelDesc}</p>
      <pre style={codeBlockStyle}><code>{`// vercel.json
{
  "crons": [
    {
      "path": "/api/daily-cleanup",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/hourly-sync",
      "schedule": "0 * * * *"
    }
  ]
}`}</code></pre>

      {/* ── Parsing Libraries ── */}
      <h2 style={h2Style}>{t.librariesTitle}</h2>

      <h3 style={h3Style}>{t.libNodeTitle}</h3>
      <p style={pStyle}>{t.libNodeDesc}</p>
      <pre style={codeBlockStyle}><code>{`import { parseExpression } from 'cron-parser';

const interval = parseExpression('*/15 * * * *');
console.log('Next:', interval.next().toString());
console.log('Next:', interval.next().toString());
console.log('Next:', interval.next().toString());

// With options
const options = {
  currentDate: new Date('2026-01-01T00:00:00'),
  tz: 'America/New_York'
};
const expr = parseExpression('0 9 * * 1-5', options);
for (let i = 0; i < 5; i++) {
  console.log(expr.next().toString());
}`}</code></pre>

      <h3 style={h3Style}>{t.libPythonTitle}</h3>
      <p style={pStyle}>{t.libPythonDesc}</p>
      <pre style={codeBlockStyle}><code>{`from croniter import croniter
from datetime import datetime

base = datetime(2026, 1, 1)
cron = croniter('0 9 * * 1-5', base)

# Get next 5 occurrences
for _ in range(5):
    print(cron.get_next(datetime))

# Check if a specific time matches
print(croniter.match('0 9 * * 1', datetime(2026, 3, 2, 9, 0)))
# True (March 2, 2026 is a Monday)`}</code></pre>

      <h3 style={h3Style}>{t.libOtherTitle}</h3>
      <p style={pStyle}>{t.libOtherDesc}</p>
      <pre style={codeBlockStyle}><code>{`// Go: robfig/cron v3
import "github.com/robfig/cron/v3"

c := cron.New()
c.AddFunc("0 9 * * 1-5", func() {
    fmt.Println("Weekday morning job")
})
c.Start()

// Rust: cron crate
use cron::Schedule;
let schedule = Schedule::from_str("0 9 * * 1-5").unwrap();
for dt in schedule.upcoming(Utc).take(5) {
    println!("{}", dt);
}`}</code></pre>

      {/* ── Timezone Handling ── */}
      <h2 style={h2Style}>{t.timezoneTitle}</h2>
      <p style={pStyle}>{t.timezoneP1}</p>
      <ul style={ulStyle}>
        <li>{t.tz1}</li>
        <li>{t.tz2}</li>
        <li>{t.tz3}</li>
        <li>{t.tz4}</li>
        <li>{t.tz5}</li>
      </ul>

      <h3 style={h3Style}>{t.tzDstTitle}</h3>
      <p style={pStyle}>{t.tzDstDesc}</p>
      <div style={warningBoxStyle}>
        <strong>Warning:</strong> A cron job scheduled at 2:30 AM in a timezone observing DST will be skipped during the spring-forward transition (clocks jump from 2:00 AM to 3:00 AM). During the fall-back transition, a 1:30 AM job may execute twice.
      </div>
      <pre style={codeBlockStyle}><code>{`# Best practice: run in UTC and convert in your app
TZ=UTC
0 8 * * *  /path/to/job.sh   # always 08:00 UTC

# Inside job.sh, convert to local time if needed:
LOCAL_TIME=$(TZ="America/New_York" date)`}</code></pre>

      {/* ── Debugging ── */}
      <h2 style={h2Style}>{t.debugTitle}</h2>

      <h3 style={h3Style}>{t.debugLoggingTitle}</h3>
      <p style={pStyle}>{t.debugLoggingDesc}</p>
      <pre style={codeBlockStyle}><code>{`# Redirect both stdout and stderr
*/5 * * * * /path/to/job.sh >> /var/log/myjob.log 2>&1

# With timestamp
*/5 * * * * echo "$(date): starting job" >> /var/log/myjob.log && /path/to/job.sh >> /var/log/myjob.log 2>&1

# Send output via email
MAILTO=dev@example.com
0 6 * * * /path/to/morning-report.sh`}</code></pre>

      <h3 style={h3Style}>{t.debugMonitorTitle}</h3>
      <p style={pStyle}>{t.debugMonitorDesc}</p>
      <pre style={codeBlockStyle}><code>{`# Dead-man switch with Healthchecks.io
0 3 * * * /path/to/backup.sh && curl -fsS --retry 3 https://hc-ping.com/YOUR-UUID

# Dead-man switch with Cronitor
0 3 * * * cronitor exec abc123 /path/to/backup.sh

# Custom alerting with webhook
0 3 * * * /path/to/backup.sh || curl -X POST https://hooks.slack.com/... -d '{"text":"Backup failed!"}'`}</code></pre>

      <h3 style={h3Style}>{t.debugAlertTitle}</h3>
      <p style={pStyle}>{t.debugAlertDesc}</p>
      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Always test your cron expression before deploying. Use our <Link href={toolLink} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Cron Expression Parser</Link> to verify the next execution times match your expectations.
      </div>

      <h3 style={h3Style}>{t.debugDryRunTitle}</h3>
      <p style={pStyle}>{t.debugDryRunDesc}</p>
      <pre style={codeBlockStyle}><code>{`# Verify with cron-parser (Node.js)
npx cron-parser "0 9 * * 1-5"

# Verify in Python
python3 -c "
from croniter import croniter
from datetime import datetime
c = croniter('0 9 * * 1-5', datetime.now())
for _ in range(10):
    print(c.get_next(datetime))
"`}</code></pre>

      {/* ── Alternatives ── */}
      <h2 style={h2Style}>{t.alternativesTitle}</h2>

      <h3 style={h3Style}>{t.altSystemdTitle}</h3>
      <p style={pStyle}>{t.altSystemdDesc}</p>
      <pre style={codeBlockStyle}><code>{`# /etc/systemd/system/backup.timer
[Unit]
Description=Daily backup timer

[Timer]
OnCalendar=*-*-* 03:00:00
Persistent=true

[Install]
WantedBy=timers.target

# /etc/systemd/system/backup.service
[Unit]
Description=Database backup

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh
User=backup

# Enable and start
systemctl enable --now backup.timer
systemctl list-timers`}</code></pre>

      <h3 style={h3Style}>{t.altAtTitle}</h3>
      <p style={pStyle}>{t.altAtDesc}</p>
      <pre style={codeBlockStyle}><code>{`# Schedule a one-time job
echo "/usr/local/bin/maintenance.sh" | at 3:00 AM tomorrow
echo "reboot" | at 2:00 AM Jan 15

# List pending jobs
atq

# Remove a scheduled job
atrm 42`}</code></pre>

      <h3 style={h3Style}>{t.altTaskSchedTitle}</h3>
      <p style={pStyle}>{t.altTaskSchedDesc}</p>
      <pre style={codeBlockStyle}><code>{`# PowerShell: create a scheduled task
$action = New-ScheduledTaskAction -Execute "C:\\scripts\\backup.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At 3am
Register-ScheduledTask -TaskName "DailyBackup" -Action $action -Trigger $trigger

# List scheduled tasks
Get-ScheduledTask | Where-Object {$_.State -eq 'Ready'}`}</code></pre>

      {/* ── Alternatives Comparison Table ── */}
      <h3 style={h3Style}>{t.altComparisonTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {altComparison[0].map((header, i) => (
                <th key={i} style={thStyle}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {altComparison.slice(1).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ ...tdStyle, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Common Mistakes ── */}
      <h2 style={h2Style}>{t.mistakesTitle}</h2>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.mistake1Title}</h3>
        <p style={pStyle}>{t.mistake1Desc}</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.mistake2Title}</h3>
        <p style={pStyle}>{t.mistake2Desc}</p>
        <div style={warningBoxStyle}>
          <strong>Warning:</strong> <span style={inlineCodeStyle}>* * * * *</span> = 1,440 runs/day = 43,200 runs/month. Always double-check before deploying.
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.mistake3Title}</h3>
        <p style={pStyle}>{t.mistake3Desc}</p>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Day</th>
                <th style={thStyle}>POSIX cron</th>
                <th style={thStyle}>Quartz</th>
              </tr>
            </thead>
            <tbody>
              {[['Sunday', '0 (or 7)', '1'], ['Monday', '1', '2'], ['Tuesday', '2', '3'], ['Wednesday', '3', '4'], ['Thursday', '4', '5'], ['Friday', '5', '6'], ['Saturday', '6', '7']].map(([day, posix, quartz], i) => (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{day}</td>
                  <td style={tdStyle}>{posix}</td>
                  <td style={tdStyle}>{quartz}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.mistake4Title}</h3>
        <p style={pStyle}>{t.mistake4Desc}</p>
        <pre style={codeBlockStyle}><code>{`# Use flock to prevent overlapping
*/5 * * * * flock -n /tmp/myjob.lock /path/to/long-running-job.sh

# Kubernetes concurrencyPolicy
spec:
  concurrencyPolicy: Forbid  # skip if previous still running`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.mistake5Title}</h3>
        <p style={pStyle}>{t.mistake5Desc}</p>
        <pre style={codeBlockStyle}><code>{`# BAD: relative path, no output capture
*/5 * * * * ./cleanup.sh

# GOOD: absolute path, full environment, output redirect
*/5 * * * * /usr/bin/env bash /home/deploy/scripts/cleanup.sh >> /var/log/cleanup.log 2>&1`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.mistake6Title}</h3>
        <p style={pStyle}>{t.mistake6Desc}</p>
        <pre style={codeBlockStyle}><code>{`# This runs on the 15th OR on Mondays (OR logic, not AND)
0 0 15 * 1

# If you want the 15th AND it must be a Monday,
# use a wrapper script with date checks instead.`}</code></pre>
      </div>

      {/* ── Security ── */}
      <h2 style={h2Style}>{t.securityTitle}</h2>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.sec1Title}</h3>
        <p style={pStyle}>{t.sec1Desc}</p>
        <pre style={codeBlockStyle}><code>{`# Restrict cron access
echo "deploy" >> /etc/cron.allow
echo "www-data" >> /etc/cron.deny

# Run as non-root user
su - deploy -c "crontab -e"`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.sec2Title}</h3>
        <p style={pStyle}>{t.sec2Desc}</p>
        <pre style={codeBlockStyle}><code>{`# GOOD: absolute path
0 3 * * * /home/deploy/scripts/backup.sh

# Secure script permissions
chmod 750 /home/deploy/scripts/backup.sh
chown deploy:deploy /home/deploy/scripts/backup.sh`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.sec3Title}</h3>
        <p style={pStyle}>{t.sec3Desc}</p>
        <pre style={codeBlockStyle}><code>{`# Load credentials from a secured file
0 3 * * * . /home/deploy/.env && /home/deploy/scripts/backup.sh

# .env file permissions
chmod 600 /home/deploy/.env
chown deploy:deploy /home/deploy/.env`}</code></pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.sec4Title}</h3>
        <p style={pStyle}>{t.sec4Desc}</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={h3Style}>{t.sec5Title}</h3>
        <p style={pStyle}>{t.sec5Desc}</p>
      </div>

      {/* ── CTA again ── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 12, color: 'var(--text-primary)' }}>{t.tryToolCta}</p>
        <Link href={toolLink} style={{ display: 'inline-block', padding: '10px 28px', background: 'var(--accent-blue)', color: '#fff', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
          {t.tryToolButton}
        </Link>
      </div>

      {/* ── FAQ ── */}
      <h2 style={h2Style}>{t.faqTitle}</h2>

      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
        { q: t.faq5q, a: t.faq5a },
        { q: t.faq6q, a: t.faq6a },
        { q: t.faq7q, a: t.faq7a },
        { q: t.faq8q, a: t.faq8a },
      ].map((faq, i) => (
        <div key={i} style={faqItemStyle}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{faq.q}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>{faq.a}</p>
        </div>
      ))}

      {/* ── Conclusion ── */}
      <h2 style={h2Style}>{t.conclusionTitle}</h2>
      <p style={pStyle}>{t.conclusionP1}</p>
      <p style={pStyle}>{t.conclusionP2}</p>
    </div>
  );
}
