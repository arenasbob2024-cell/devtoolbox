import Link from 'next/link';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'Cron Expression Generator Guide: How to Set Up Scheduled Tasks',
    intro: 'Cron expressions are the standard way to schedule recurring tasks on Unix/Linux systems. Whether you need to run a script every 5 minutes, schedule daily backups, or automate weekly reports, understanding cron expressions is essential for every developer and system administrator. This guide explains what is a cron expression, how to use a cron expression generator, and provides practical examples for common scheduling needs.',
    h2_what: 'What Is a Cron Expression?',
    whatDesc1: 'A cron expression is a string that represents a schedule for running automated tasks. It consists of five fields separated by spaces, each representing a specific time unit. The format is:',
    whatDesc2: 'Each field accepts numbers, special characters, or ranges to define when the task should execute. The flexibility of cron expressions allows you to create simple schedules like "every hour" or complex ones like "every Monday and Wednesday at 2:30 PM".',
    h2_syntax: 'Cron Expression Syntax Explained',
    syntaxDesc: 'Understanding the special characters is key to mastering cron expressions:',
    syntaxStar: '<strong>* (Asterisk)</strong> — Matches any value. "*" in the minute field means "every minute".',
    syntaxComma: '<strong>, (Comma)</strong> — Specifies a list of values. "1,3,5" means "1st, 3rd, and 5th".',
    syntaxDash: '<strong>- (Dash)</strong> — Defines a range. "1-5" means "1 through 5".',
    syntaxSlash: '<strong>/ (Slash)</strong> — Specifies step values. "*/5" means "every 5 units".',
    syntaxL: '<strong>L (Letter L)</strong> — Stands for "Last". Used in day-of-month or day-of-week fields.',
    syntaxHash: '<strong># (Hash)</strong> — Specifies the nth occurrence of a weekday. "2#1" means "first Monday".',
    h2_examples: 'Cron Expression Every 5 Minutes and Other Common Examples',
    examplesDesc: 'Here are the most commonly used cron expressions that you can copy and paste:',
    exEveryMin: 'Every minute',
    exEvery5Min: 'Every 5 minutes',
    exEvery15Min: 'Every 15 minutes',
    exEvery30Min: 'Every 30 minutes',
    exEveryHour: 'Every hour',
    exDailyMidnight: 'Daily at midnight',
    exDaily6am: 'Daily at 6:00 AM',
    exWeeklySun: 'Weekly on Sunday',
    exWeeklyMon: 'Every Monday at 9 AM',
    exWeekdays: 'Weekdays at 9 AM',
    exMonthly: 'First day of every month',
    exYearly: 'Every January 1st',
    h2_generator: 'How to Use a Cron Expression Generator',
    generatorDesc: 'While you can write cron expressions manually, using an online cron expression generator makes the process much easier and error-free. Here is how to use one:',
    genStep1: 'Select the schedule type: Choose from preset options like "Every 5 minutes", "Daily", "Weekly", or "Custom".',
    genStep2: 'Set the time: Pick the specific hour and minute for your task to run.',
    genStep3: 'Choose days: Select which days of the week or month the task should execute.',
    genStep4: 'Copy the expression: The generator will output the correct cron expression like "*/5 * * * *".',
    genStep5: 'Test the schedule: Most generators show you the next few execution times to verify your schedule is correct.',
    h2_platforms: 'Cron Expression Examples for Different Platforms',
    platformsDesc: 'Different platforms may use slightly different cron syntax. Here is how the same schedule looks across popular platforms:',
    platformLinux: 'Standard Linux Cron (5 fields)',
    platformAWS: 'AWS CloudWatch/EventBridge (6 fields with year)',
    platformK8s: 'Kubernetes CronJob (5 fields)',
    platformGitHub: 'GitHub Actions (5 fields, UTC timezone)',
    h2_bestPractices: 'Best Practices for Cron Jobs',
    bp1: 'Use absolute paths: Always use full paths to commands and scripts in cron jobs.',
    bp2: 'Redirect output: Log both stdout and stderr to prevent cron from sending you email notifications.',
    bp3: 'Set the timezone: Explicitly set the timezone in your script or use TZ environment variable.',
    bp4: 'Prevent overlapping: Use flock or similar tools to prevent the same job from running multiple instances.',
    bp5: 'Test thoroughly: Always test your cron expressions before deploying to production.',
    h2_faq: 'Frequently Asked Questions',
    faq1q: 'How do I set a cron job to run every 5 minutes?',
    faq1a: 'Use the cron expression */5 * * * *. The */5 in the minute field means "every 5th minute", starting from minute 0.',
    faq2q: 'What is the difference between */5 and 0/5 in cron?',
    faq2a: 'In standard cron, they are equivalent. Both mean "every 5 units starting from 0". However, some platforms like AWS prefer 0/5 syntax.',
    faq3q: 'Can I use cron expressions on Windows?',
    faq3a: 'Windows does not use cron natively. You can use the Task Scheduler for similar functionality, or use WSL (Windows Subsystem for Linux) which supports cron.',
    faq4q: 'How do I test if my cron expression is correct?',
    faq4a: 'Use an online cron expression parser or generator. These tools show you the next execution times based on your expression, helping you verify it works as expected.',
    faq5q: 'Why is my cron job not running?',
    faq5a: 'Common issues include: wrong timezone, missing environment variables, incorrect paths, missing execute permissions on scripts, or syntax errors in the crontab file.',
    conclusion: 'Cron expressions are a powerful way to automate repetitive tasks. By using a cron expression generator, you can quickly create accurate schedules without memorizing complex syntax. Remember to always test your expressions and follow best practices for reliable job execution.',
    ctaText: 'Ready to create your own cron expressions?',
    ctaButton: 'Try Our Free Cron Expression Generator →',
  },
  zh: {
    title: 'Cron 表达式生成器指南：如何设置定时任务',
    intro: 'Cron 表达式是在 Unix/Linux 系统上安排周期任务的标准方式。无论您需要每 5 分钟运行一次脚本、安排每日备份，还是自动化每周报告，理解 cron 表达式对每个开发者和系统管理员都至关重要。本指南解释什么是 cron 表达式、如何使用 cron 表达式生成器，并提供常见调度需求的实用示例。',
    h2_what: '什么是 Cron 表达式？',
    whatDesc1: 'Cron 表达式是一个表示自动任务执行计划的字符串。它由五个用空格分隔的字段组成，每个字段代表特定的时间单位。格式为：',
    whatDesc2: '每个字段接受数字、特殊字符或范围来定义任务应该何时执行。Cron 表达式的灵活性允许您创建从简单的"每小时"到复杂的"每周一和周三下午 2:30"等各种调度。',
    h2_syntax: 'Cron 表达式语法详解',
    syntaxDesc: '理解特殊字符是掌握 cron 表达式的关键：',
    syntaxStar: '<strong>*（星号）</strong> — 匹配任意值。分钟字段中的"*"表示"每分钟"。',
    syntaxComma: '<strong>,（逗号）</strong> — 指定值列表。"1,3,5"表示"第1、3、5个"。',
    syntaxDash: '<strong>-（连字符）</strong> — 定义范围。"1-5"表示"1到5"。',
    syntaxSlash: '<strong>/（斜杠）</strong> — 指定步长值。"*/5"表示"每5个单位"。',
    syntaxL: '<strong>L（字母L）</strong> — 代表"最后"。用于日期或星期字段。',
    syntaxHash: '<strong>#（井号）</strong> — 指定第几个星期几。"2#1"表示"第一个周一"。',
    h2_examples: '每5分钟和其他常见 Cron 表达式示例',
    examplesDesc: '以下是您可以复制粘贴的最常用 cron 表达式：',
    exEveryMin: '每分钟',
    exEvery5Min: '每5分钟',
    exEvery15Min: '每15分钟',
    exEvery30Min: '每30分钟',
    exEveryHour: '每小时',
    exDailyMidnight: '每天午夜',
    exDaily6am: '每天早上6点',
    exWeeklySun: '每周日',
    exWeeklyMon: '每周一上午9点',
    exWeekdays: '工作日上午9点',
    exMonthly: '每月第一天',
    exYearly: '每年1月1日',
    h2_generator: '如何使用 Cron 表达式生成器',
    generatorDesc: '虽然您可以手动编写 cron 表达式，但使用在线 cron 表达式生成器会让这个过程更加简单且避免错误。使用方法如下：',
    genStep1: '选择调度类型：从预设选项中选择，如"每5分钟"、"每天"、"每周"或"自定义"。',
    genStep2: '设置时间：选择任务运行的具体小时和分钟。',
    genStep3: '选择日期：选择任务应该在一周或一个月的哪几天执行。',
    genStep4: '复制表达式：生成器会输出正确的 cron 表达式，如"*/5 * * * *"。',
    genStep5: '测试调度：大多数生成器会显示接下来的几次执行时间，帮助您验证调度是否正确。',
    h2_platforms: '不同平台的 Cron 表达式示例',
    platformsDesc: '不同平台可能使用略有不同的 cron 语法。以下是相同调度在不同平台上的表示方式：',
    platformLinux: '标准 Linux Cron（5个字段）',
    platformAWS: 'AWS CloudWatch/EventBridge（6个字段，包含年份）',
    platformK8s: 'Kubernetes CronJob（5个字段）',
    platformGitHub: 'GitHub Actions（5个字段，UTC时区）',
    h2_bestPractices: 'Cron 任务最佳实践',
    bp1: '使用绝对路径：始终在 cron 任务中使用命令和脚本的完整路径。',
    bp2: '重定向输出：将 stdout 和 stderr 都记录到日志文件，防止 cron 向您发送电子邮件通知。',
    bp3: '设置时区：在脚本中显式设置时区或使用 TZ 环境变量。',
    bp4: '防止重叠：使用 flock 或类似工具防止同一任务运行多个实例。',
    bp5: '充分测试：在部署到生产环境之前，始终测试您的 cron 表达式。',
    h2_faq: '常见问题',
    faq1q: '如何设置每5分钟运行的 cron 任务？',
    faq1a: '使用 cron 表达式 */5 * * * *。分钟字段中的 */5 表示"每第5分钟"，从第0分钟开始。',
    faq2q: 'cron 中的 */5 和 0/5 有什么区别？',
    faq2a: '在标准 cron 中，它们是等效的。都表示"从0开始每5个单位"。不过，AWS 等平台更喜欢 0/5 语法。',
    faq3q: '我可以在 Windows 上使用 cron 表达式吗？',
    faq3a: 'Windows 本身不使用 cron。您可以使用任务计划器实现类似功能，或者使用支持 cron 的 WSL（适用于 Linux 的 Windows 子系统）。',
    faq4q: '如何测试我的 cron 表达式是否正确？',
    faq4a: '使用在线 cron 表达式解析器或生成器。这些工具会根据您的表达式显示接下来的执行时间，帮助您验证它是否按预期工作。',
    faq5q: '为什么我的 cron 任务没有运行？',
    faq5a: '常见问题包括：时区错误、缺少环境变量、路径不正确、脚本缺少执行权限，或 crontab 文件中的语法错误。',
    conclusion: 'Cron 表达式是自动化重复任务的强大工具。通过使用 cron 表达式生成器，您可以快速创建准确的调度计划，而无需记忆复杂的语法。请记住始终测试您的表达式，并遵循最佳实践以确保任务可靠执行。',
    ctaText: '准备好创建您自己的 cron 表达式了吗？',
    ctaButton: '立即试用我们的免费 Cron 表达式生成器 →',
  },
};

const codeStyle: React.CSSProperties = { 
  background: 'var(--bg-input)', 
  border: '1px solid var(--border-color)', 
  borderRadius: 8, 
  padding: '16px 20px', 
  overflowX: 'auto', 
  fontSize: 13, 
  lineHeight: 1.8 
};

const thStyle: React.CSSProperties = { 
  background: 'var(--bg-input)', 
  border: '1px solid var(--border-color)', 
  padding: '10px 14px', 
  textAlign: 'left', 
  fontWeight: 700 
};

const tdStyle: React.CSSProperties = { 
  border: '1px solid var(--border-color)', 
  padding: '10px 14px', 
  fontSize: 13 
};

const h2Style: React.CSSProperties = { 
  fontSize: 22, 
  fontWeight: 700, 
  marginTop: 40, 
  marginBottom: 16, 
  color: 'var(--text-primary)' 
};

export default function CronExpressionGeneratorGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const commonExamples = [
    ['* * * * *', t.exEveryMin as string],
    ['*/5 * * * *', t.exEvery5Min as string],
    ['*/15 * * * *', t.exEvery15Min as string],
    ['*/30 * * * *', t.exEvery30Min as string],
    ['0 * * * *', t.exEveryHour as string],
    ['0 0 * * *', t.exDailyMidnight as string],
    ['0 6 * * *', t.exDaily6am as string],
    ['0 0 * * 0', t.exWeeklySun as string],
    ['0 9 * * 1', t.exWeeklyMon as string],
    ['0 9 * * 1-5', t.exWeekdays as string],
    ['0 0 1 * *', t.exMonthly as string],
    ['0 0 1 1 *', t.exYearly as string],
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{t.intro}</p>

      <h2 style={h2Style}>{t.h2_what}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.whatDesc1}</p>
      
      <pre style={codeStyle}><code>{`┌───────────── minute (0 - 59)
│ ┌─────────── hour (0 - 23)
│ │ ┌───────── day of month (1 - 31)
│ │ │ ┌─────── month (1 - 12)
│ │ │ │ ┌───── day of week (0 - 7, where 0 and 7 = Sunday)
│ │ │ │ │
* * * * *`}</code></pre>
      
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{t.whatDesc2}</p>

      <h2 style={h2Style}>{t.h2_syntax}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.syntaxDesc}</p>
      
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li dangerouslySetInnerHTML={{ __html: t.syntaxStar }} />
        <li dangerouslySetInnerHTML={{ __html: t.syntaxComma }} />
        <li dangerouslySetInnerHTML={{ __html: t.syntaxDash }} />
        <li dangerouslySetInnerHTML={{ __html: t.syntaxSlash }} />
        <li dangerouslySetInnerHTML={{ __html: t.syntaxL }} />
        <li dangerouslySetInnerHTML={{ __html: t.syntaxHash }} />
      </ul>

      <h2 style={h2Style}>{t.h2_examples}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.examplesDesc}</p>
      
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Cron Expression</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {commonExamples.map(([expr, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{expr}</code></td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{t.h2_generator}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.generatorDesc}</p>
      
      <ol style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.genStep1}</li>
        <li>{t.genStep2}</li>
        <li>{t.genStep3}</li>
        <li>{t.genStep4}</li>
        <li>{t.genStep5}</li>
      </ol>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.ctaText}</p>
        <Link href={`/${lang}/tools/cron-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.ctaButton}
        </Link>
      </div>

      <h2 style={h2Style}>{t.h2_platforms}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.platformsDesc}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { label: t.platformLinux, code: '*/5 * * * * /path/to/script.sh' },
          { label: t.platformAWS, code: 'cron(0/5 * * * ? *)' },
          { label: t.platformK8s, code: 'spec:\n  schedule: "*/5 * * * *"' },
          { label: t.platformGitHub, code: "schedule:\n  - cron: '*/5 * * * *'" },
        ].map((p, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{p.label}</strong>
            <pre style={{ ...codeStyle, padding: '8px 12px', margin: '8px 0 0' }}><code>{p.code}</code></pre>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{t.h2_bestPractices}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ul>

      <h2 style={h2Style}>{t.h2_faq}</h2>
      {[
        [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a], [t.faq4q, t.faq4a], [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 30 }}>{t.conclusion}</p>
    </div>
  );
}
