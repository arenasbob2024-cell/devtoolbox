'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cron Expression Complete Guide 2026: Syntax, Examples & Best Practices',
    intro: 'Cron expressions are the standard way to schedule recurring tasks in Linux, CI/CD pipelines, cloud functions, and job schedulers. This comprehensive guide covers the complete cron syntax, real-world examples for every common scheduling pattern, and best practices for production environments.',

    basicTitle: 'Cron Expression Format',
    basicIntro: 'A standard cron expression consists of 5 fields:',

    fieldTitle: 'Field Reference',
    fieldIntro: 'Each field accepts specific values and special characters:',

    specialTitle: 'Special Characters',
    specialIntro: 'Master these operators to create any schedule:',

    examplesTitle: 'Common Cron Examples',
    examplesIntro: 'Copy-paste ready expressions for common schedules:',

    advancedTitle: 'Advanced Patterns',
    advancedIntro: 'Complex scheduling scenarios:',

    toolsTitle: 'Cron in Modern Tools',
    toolsIntro: 'How cron expressions are used in popular platforms:',

    debugTitle: 'Debugging Cron Jobs',
    debugIntro: 'Common issues and how to fix them:',

    bestPracticesTitle: 'Best Practices',
    bestPracticesIntro: 'Production-tested recommendations:',

    conclusionTitle: 'Conclusion',
    conclusionContent: 'Cron expressions are a fundamental skill for developers and DevOps engineers. Understanding the 5-field syntax and special characters lets you schedule any recurring task. Use our Cron Expression Parser tool to validate and test your expressions before deploying them.',

    faq1q: 'What is the difference between * and ? in cron?',
    faq1a: 'The * means "every value" and works in all fields. The ? means "no specific value" and is used in some extended cron formats (like Quartz) for the day-of-week or day-of-month fields when the other is specified. Standard Unix cron only uses *.',

    faq2q: 'How do I run a cron job every 5 minutes?',
    faq2a: 'Use */5 * * * * — the */5 in the minute field means "every 5th minute". This runs at :00, :05, :10, :15, and so on throughout every hour.',

    faq3q: 'Can I schedule a job for the last day of the month?',
    faq3a: 'Standard cron does not have a "last day" operator. The common workaround is to check the date in your script: [ "$(date -d tomorrow +%d)" = "01" ] && your_command. Some extended cron implementations (like Spring) support L for last day.',

    faq4q: 'What timezone does cron use?',
    faq4a: 'Traditional crontab uses the system timezone. Cloud platforms often default to UTC. Always check your platform documentation. GitHub Actions uses UTC, AWS EventBridge lets you specify timezone, and Vercel Cron uses UTC.',

    faq5q: 'How do I schedule a job for business hours only?',
    faq5a: 'Use 0 9-17 * * 1-5 to run at the start of each hour from 9 AM to 5 PM on weekdays (Monday through Friday). Adjust the hour range as needed.',

    faq6q: 'What happens if a cron job takes longer than the interval?',
    faq6a: 'By default, a new instance will start even if the previous one is still running. This can cause resource issues. Use a lock file (flock) or a job queue to prevent overlapping execution.',

    tryTools: 'Try Our Cron Tools',
  },
  zh: {
    title: 'Cron 表达式完全指南 2026：语法、示例与最佳实践',
    intro: 'Cron 表达式是在 Linux、CI/CD 流水线、云函数和作业调度器中安排周期性任务的标准方式。本综合指南涵盖完整的 cron 语法、每种常见调度模式的实际示例，以及生产环境的最佳实践。',

    basicTitle: 'Cron 表达式格式',
    basicIntro: '标准 cron 表达式由 5 个字段组成：',

    fieldTitle: '字段参考',
    fieldIntro: '每个字段接受特定的值和特殊字符：',

    specialTitle: '特殊字符',
    specialIntro: '掌握这些运算符来创建任何调度：',

    examplesTitle: '常用 Cron 示例',
    examplesIntro: '可直接复制粘贴的常见调度表达式：',

    advancedTitle: '高级模式',
    advancedIntro: '复杂的调度场景：',

    toolsTitle: '现代工具中的 Cron',
    toolsIntro: 'Cron 表达式在流行平台中的使用方式：',

    debugTitle: '调试 Cron 任务',
    debugIntro: '常见问题及解决方法：',

    bestPracticesTitle: '最佳实践',
    bestPracticesIntro: '经过生产验证的建议：',

    conclusionTitle: '结论',
    conclusionContent: 'Cron 表达式是开发者和 DevOps 工程师的基本技能。理解 5 字段语法和特殊字符让你可以调度任何周期性任务。使用我们的 Cron 表达式解析器工具在部署前验证和测试你的表达式。',

    faq1q: 'Cron 中 * 和 ? 的区别是什么？',
    faq1a: '* 表示"每个值"，适用于所有字段。? 表示"无特定值"，在某些扩展 cron 格式（如 Quartz）中用于日期或星期字段。标准 Unix cron 只使用 *。',

    faq2q: '如何每 5 分钟运行一次 cron 任务？',
    faq2a: '使用 */5 * * * * — 分钟字段中的 */5 表示"每 5 分钟"。这将在每小时的 :00, :05, :10, :15 等时间运行。',

    faq3q: '能否安排任务在每月最后一天执行？',
    faq3a: '标准 cron 没有"最后一天"运算符。常见解决方案是在脚本中检查日期：[ "$(date -d tomorrow +%d)" = "01" ] && your_command。一些扩展 cron 实现（如 Spring）支持 L 表示最后一天。',

    faq4q: 'Cron 使用什么时区？',
    faq4a: '传统 crontab 使用系统时区。云平台通常默认为 UTC。务必检查平台文档。GitHub Actions 使用 UTC，AWS EventBridge 允许指定时区，Vercel Cron 使用 UTC。',

    faq5q: '如何安排任务仅在工作时间运行？',
    faq5a: '使用 0 9-17 * * 1-5 在工作日（周一到周五）每小时 9 点到 17 点执行。根据需要调整小时范围。',

    faq6q: '如果 cron 任务执行时间超过间隔怎么办？',
    faq6a: '默认情况下，即使前一个实例仍在运行，新实例也会启动。这可能导致资源问题。使用锁文件（flock）或作业队列来防止重叠执行。',

    tryTools: '试试我们的 Cron 工具',
  },
};

export default function CronExpressionCompleteGuide({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  const cronDiagram = isZh
    ? `┌───────────── 分钟 (0-59)
│ ┌───────────── 小时 (0-23)
│ │ ┌───────────── 日期 (1-31)
│ │ │ ┌───────────── 月份 (1-12)
│ │ │ │ ┌───────────── 星期 (0-7, 0 和 7 = 周日)
│ │ │ │ │
* * * * *`
    : `┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-7, 0 and 7 = Sunday)
│ │ │ │ │
* * * * *`;


  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <h2 style={h2Style}>{ct.basicTitle}</h2>
      <p style={pStyle}>{ct.basicIntro}</p>
      <pre style={{ ...codeStyle, fontSize: 15, textAlign: 'center', fontWeight: 700 }}><code>{cronDiagram}</code></pre>

      <h2 style={h2Style}>{ct.fieldTitle}</h2>
      <p style={pStyle}>{ct.fieldIntro}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '字段' : 'Field'}</th>
              <th style={thStyle}>{isZh ? '范围' : 'Range'}</th>
              <th style={thStyle}>{isZh ? '特殊字符' : 'Special Characters'}</th>
              <th style={thStyle}>{isZh ? '示例' : 'Example'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '分钟' : 'Minute', '0-59', '* , - /', '*/15 = every 15 min'],
              [isZh ? '小时' : 'Hour', '0-23', '* , - /', '9-17 = 9am to 5pm'],
              [isZh ? '日期' : 'Day of Month', '1-31', '* , - /', '1,15 = 1st and 15th'],
              [isZh ? '月份' : 'Month', '1-12 or JAN-DEC', '* , - /', '1-6 = Jan to Jun'],
              [isZh ? '星期' : 'Day of Week', '0-7 or SUN-SAT', '* , - /', '1-5 = Mon to Fri'],
            ].map(([field, range, special, example], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{field}</td>
                <td style={tdStyle}>{range}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{special}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.specialTitle}</h2>
      <p style={pStyle}>{ct.specialIntro}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '字符' : 'Character'}</th>
              <th style={thStyle}>{isZh ? '含义' : 'Meaning'}</th>
              <th style={thStyle}>{isZh ? '示例' : 'Example'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['*', isZh ? '匹配所有值' : 'Every value', '* * * * * = every minute'],
              [',', isZh ? '值列表' : 'List of values', '1,15 = 1st and 15th'],
              ['-', isZh ? '值范围' : 'Range of values', '1-5 = Monday to Friday'],
              ['/', isZh ? '步进值' : 'Step values', '*/10 = every 10th unit'],
            ].map(([char, meaning, example], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 700, fontFamily: 'monospace', fontSize: 16, textAlign: 'center' }}>{char}</td>
                <td style={tdStyle}>{meaning}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.examplesTitle}</h2>
      <p style={pStyle}>{ct.examplesIntro}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '表达式' : 'Expression'}</th>
              <th style={thStyle}>{isZh ? '说明' : 'Description'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['* * * * *', isZh ? '每分钟' : 'Every minute'],
              ['*/5 * * * *', isZh ? '每 5 分钟' : 'Every 5 minutes'],
              ['0 * * * *', isZh ? '每小时整点' : 'Every hour (on the hour)'],
              ['0 */2 * * *', isZh ? '每 2 小时' : 'Every 2 hours'],
              ['0 9 * * *', isZh ? '每天上午 9 点' : 'Every day at 9:00 AM'],
              ['0 9 * * 1-5', isZh ? '工作日上午 9 点' : 'Weekdays at 9:00 AM'],
              ['0 0 * * *', isZh ? '每天午夜' : 'Every day at midnight'],
              ['0 0 * * 0', isZh ? '每周日午夜' : 'Every Sunday at midnight'],
              ['0 0 1 * *', isZh ? '每月 1 日午夜' : 'First day of every month'],
              ['0 0 1 1 *', isZh ? '每年 1 月 1 日' : 'January 1st every year'],
              ['30 8 * * 1', isZh ? '每周一 8:30' : 'Every Monday at 8:30 AM'],
              ['0 9-17 * * 1-5', isZh ? '工作时间每小时' : 'Every hour during business hours'],
              ['*/15 9-17 * * 1-5', isZh ? '工作时间每 15 分钟' : 'Every 15 min during business hours'],
              ['0 0 1,15 * *', isZh ? '每月 1 日和 15 日' : '1st and 15th of every month'],
              ['0 6 * * 1-5', isZh ? '工作日早上 6 点' : 'Weekdays at 6:00 AM'],
              ['0 22 * * 5', isZh ? '每周五晚 10 点' : 'Every Friday at 10:00 PM'],
            ].map(([expr, desc], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, whiteSpace: 'nowrap', color: '#3b82f6' }}>{expr}</td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.toolsTitle}</h2>
      <p style={pStyle}>{ct.toolsIntro}</p>
      <pre style={codeStyle}><code>{\`# GitHub Actions (uses standard cron, UTC timezone)
on:
  schedule:
    - cron: '0 9 * * 1-5'  # Weekdays at 9 AM UTC

# Vercel Cron (vercel.json)
{
  "crons": [
    { "path": "/api/daily-task", "schedule": "0 0 * * *" }
  ]
}

# AWS EventBridge (uses 6-field cron with year)
# cron(minutes hours day-of-month month day-of-week year)
cron(0 9 ? * MON-FRI *)

# Kubernetes CronJob
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: backup:latest
          restartPolicy: OnFailure

# Docker (using supercronic or built-in)
# In crontab file:
*/10 * * * * /app/health-check.sh

# Node.js (node-cron)
import cron from 'node-cron';
cron.schedule('*/5 * * * *', () => {
  console.log('Running every 5 minutes');
});

# Python (APScheduler)
from apscheduler.triggers.cron import CronTrigger
scheduler.add_job(my_task, CronTrigger.from_crontab('0 9 * * 1-5'))\`}</code></pre>

      <h2 style={h2Style}>{ct.debugTitle}</h2>
      <p style={pStyle}>{ct.debugIntro}</p>
      <pre style={codeStyle}><code>{\`# Common cron debugging tips

# 1. Check cron service is running
systemctl status cron
# or: service cron status

# 2. View cron logs
grep CRON /var/log/syslog
# or: journalctl -u cron

# 3. Check user crontab
crontab -l

# 4. Edit crontab
crontab -e

# 5. Redirect output for debugging
* * * * * /path/to/script.sh >> /tmp/cron.log 2>&1

# 6. Common issues:
# - Script not found: use absolute paths
# - Permission denied: chmod +x script.sh
# - Environment variables missing: source profile in script
# - Wrong timezone: check with 'date' command
# - PATH not set: add PATH=/usr/local/bin:/usr/bin at top

# 7. Test script manually first
bash -x /path/to/script.sh

# 8. Lock file to prevent overlap
flock -n /tmp/myjob.lock /path/to/script.sh\`}</code></pre>

      <h2 style={h2Style}>{ct.bestPracticesTitle}</h2>
      <div style={boxStyle}>
        <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li><strong>{isZh ? '使用绝对路径' : 'Use absolute paths'}</strong> — {isZh ? 'cron 任务在最小环境下运行' : 'Cron jobs run with minimal environment'}</li>
          <li><strong>{isZh ? '添加日志输出' : 'Add logging'}</strong> — {isZh ? '总是将输出重定向到日志文件' : 'Always redirect output to a log file'}</li>
          <li><strong>{isZh ? '防止重叠' : 'Prevent overlap'}</strong> — {isZh ? '使用 flock 或 PID 文件' : 'Use flock or PID files for long-running tasks'}</li>
          <li><strong>{isZh ? '设置告警' : 'Set up alerting'}</strong> — {isZh ? '监控 cron 任务是否按时执行' : 'Monitor that cron jobs run on schedule'}</li>
          <li><strong>{isZh ? '注意时区' : 'Mind the timezone'}</strong> — {isZh ? '明确记录使用的时区' : 'Document which timezone your cron uses'}</li>
          <li><strong>{isZh ? '错开执行时间' : 'Stagger execution'}</strong> — {isZh ? '避免所有任务在同一时间运行' : 'Avoid running all tasks at :00; use :05, :10, etc.'}</li>
          <li><strong>{isZh ? '优先使用非高峰时段' : 'Prefer off-peak hours'}</strong> — {isZh ? '将重任务安排在凌晨' : 'Schedule heavy jobs during off-peak hours'}</li>
          <li><strong>{isZh ? '测试表达式' : 'Validate expressions'}</strong> — {isZh ? '使用在线工具验证 cron 表达式' : 'Use online tools to verify cron expressions before deploying'}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/cron-parser"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Cron Parser</a> {' • '}
        <a href={"/" + lang + "/tools/cron-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Cron Generator</a> {' • '}
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
