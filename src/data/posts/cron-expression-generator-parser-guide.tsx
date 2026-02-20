import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Whether you are automating server maintenance, scheduling data pipelines, or triggering CI/CD workflows, the <strong>cron expression</strong> is the universal language of time-based job scheduling. A <strong>cron expression generator</strong> helps you build these scheduling patterns visually, while a <strong>cron parser</strong> translates cryptic strings like <code>0 */6 * * 1-5</code> into human-readable descriptions. This comprehensive guide covers everything from the classic five-field <strong>cron syntax</strong> to practical <strong>cron job examples</strong> in JavaScript, Python, Bash, and cloud platforms. If you need to quickly create or decode a <strong>cron schedule</strong>, try our free tool.',
    linkTool: 'Try our free online Cron Expression Generator & Parser tool instantly.',
    h2_what: 'What Is a Cron Expression?',
    whatDesc1: 'A <strong>cron expression</strong> is a compact string that defines a recurring schedule for automated tasks. The name comes from the Greek word <em>chronos</em> (time) and the Unix <code>cron</code> daemon, which has been executing scheduled jobs on Unix-like systems since the 1970s. Originally created by Ken Thompson for Version 7 Unix, <strong>cron</strong> has become the de facto standard for task scheduling across operating systems, programming languages, and cloud platforms.',
    whatDesc2: 'In the classic Unix <strong>crontab</strong> format, a cron expression consists of five space-separated fields: <code>minute hour day-of-month month day-of-week</code>. Each field accepts numbers, wildcards (<code>*</code>), ranges, lists, and step values. For example, <code>30 9 * * 1-5</code> means "at 09:30 on every weekday." The <strong>crontab</strong> file (short for "cron table") is where users store these expressions alongside the commands to execute.',
    whatDesc3: 'Today, cron expressions have expanded far beyond traditional Unix systems. <strong>Kubernetes CronJobs</strong> use them to schedule containerized workloads, <strong>GitHub Actions</strong> use them in workflow <code>schedule</code> triggers, <strong>AWS EventBridge</strong> (formerly CloudWatch Events) supports cron-based scheduling rules, and tools like <strong>Vercel cron</strong> let you trigger serverless functions on a schedule. Understanding <strong>cron syntax</strong> is an essential skill for any developer or DevOps engineer working with automated processes.',
    h2_syntax: 'Cron Expression Syntax Explained',
    syntaxDesc1: 'The standard <strong>cron expression</strong> uses five fields. Each field represents a unit of time and determines when the <strong>cron job</strong> fires. Here is the complete breakdown:',
    syntaxFields: '<table><thead><tr><th>Field</th><th>Allowed Values</th><th>Special Characters</th><th>Description</th></tr></thead><tbody><tr><td><strong>Minute</strong></td><td>0-59</td><td><code>* , - /</code></td><td>Minute of the hour when the job runs</td></tr><tr><td><strong>Hour</strong></td><td>0-23</td><td><code>* , - /</code></td><td>Hour of the day (24-hour format)</td></tr><tr><td><strong>Day of Month</strong></td><td>1-31</td><td><code>* , - / ? L W</code></td><td>Day of the month (1-based)</td></tr><tr><td><strong>Month</strong></td><td>1-12 or JAN-DEC</td><td><code>* , - /</code></td><td>Month of the year</td></tr><tr><td><strong>Day of Week</strong></td><td>0-7 or SUN-SAT</td><td><code>* , - / ? L #</code></td><td>Day of the week (0 and 7 both mean Sunday)</td></tr></tbody></table>',
    syntaxDesc2: '<strong>Special characters explained</strong>: The asterisk <code>*</code> matches every possible value for that field. A comma <code>,</code> separates a list of values (e.g., <code>1,3,5</code> means Monday, Wednesday, Friday). A hyphen <code>-</code> defines a range (e.g., <code>9-17</code> means hours 9 through 17). A slash <code>/</code> defines a step value (e.g., <code>*/5</code> in the minute field means every 5 minutes). The question mark <code>?</code> is used in some implementations (like Quartz) to indicate "no specific value" for day-of-month or day-of-week fields.',
    syntaxDesc3: 'The overall format is: <code>&#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; minute (0-59)</code> <code>&#x2502; &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; hour (0-23)</code> <code>&#x2502; &#x2502; &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; day of month (1-31)</code> <code>&#x2502; &#x2502; &#x2502; &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; month (1-12)</code> <code>&#x2502; &#x2502; &#x2502; &#x2502; &#x250C;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; day of week (0-7)</code> <code>&#x2502; &#x2502; &#x2502; &#x2502; &#x2502;</code> <code>* * * * *</code>. This five-field pattern is the heart of every <strong>cron schedule</strong> definition.',
    h2_examples: 'Cron Expression Examples Table',
    examplesDesc: 'Here are the most common <strong>cron job examples</strong> you will encounter in production systems. Use this table as a quick reference when building your <strong>cron schedule</strong>. You can paste any of these into a <strong>cron expression generator</strong> to verify the schedule:',
    examplesTable: '<table><thead><tr><th>Cron Expression</th><th>Description</th></tr></thead><tbody><tr><td><code>* * * * *</code></td><td>Every minute</td></tr><tr><td><code>*/5 * * * *</code></td><td>Every 5 minutes</td></tr><tr><td><code>*/10 * * * *</code></td><td>Every 10 minutes</td></tr><tr><td><code>*/15 * * * *</code></td><td>Every 15 minutes</td></tr><tr><td><code>*/30 * * * *</code></td><td>Every 30 minutes</td></tr><tr><td><code>0 * * * *</code></td><td>Every hour (at minute 0)</td></tr><tr><td><code>0 */2 * * *</code></td><td>Every 2 hours</td></tr><tr><td><code>0 */6 * * *</code></td><td>Every 6 hours</td></tr><tr><td><code>0 0 * * *</code></td><td>Daily at midnight (00:00)</td></tr><tr><td><code>0 6 * * *</code></td><td>Daily at 6:00 AM</td></tr><tr><td><code>0 12 * * *</code></td><td>Daily at noon (12:00)</td></tr><tr><td><code>0 0 * * 0</code></td><td>Every Sunday at midnight</td></tr><tr><td><code>0 9 * * 1-5</code></td><td>Weekdays at 9:00 AM</td></tr><tr><td><code>0 17 * * 1-5</code></td><td>Weekdays at 5:00 PM</td></tr><tr><td><code>30 9 * * 1</code></td><td>Every Monday at 9:30 AM</td></tr><tr><td><code>0 0 1 * *</code></td><td>First day of every month at midnight</td></tr><tr><td><code>0 0 15 * *</code></td><td>15th of every month at midnight</td></tr><tr><td><code>0 0 1 1 *</code></td><td>January 1st at midnight (yearly)</td></tr><tr><td><code>0 0 1 */3 *</code></td><td>First day of every quarter</td></tr><tr><td><code>0 8-17 * * 1-5</code></td><td>Every hour from 8 AM to 5 PM on weekdays</td></tr><tr><td><code>0 0,12 * * *</code></td><td>Twice daily at midnight and noon</td></tr><tr><td><code>0 0 * * 1,3,5</code></td><td>Mon, Wed, Fri at midnight</td></tr><tr><td><code>15,45 * * * *</code></td><td>At minute 15 and 45 of every hour</td></tr><tr><td><code>0 3 1-7 * 1</code></td><td>First Monday of every month at 3:00 AM</td></tr></tbody></table>',
    h2_code: 'Code Examples for Cron Jobs',
    codeJsTitle: 'JavaScript / Node.js Cron Jobs',
    codeJsDesc: 'Node.js offers several excellent libraries for scheduling <strong>cron jobs</strong>. The most popular options include <code>node-cron</code> for simple scheduling, the <code>cron</code> npm package for more control, <code>croner</code> for a modern zero-dependency approach, and <code>Bree</code> for worker-thread-based job scheduling. Here are practical examples using each library:',
    codePyTitle: 'Python Cron Job Scheduling',
    codePyDesc: 'Python provides multiple approaches to <strong>cron job</strong> scheduling. The <code>schedule</code> library offers a human-friendly API, <code>APScheduler</code> provides enterprise-grade features, the <code>python-crontab</code> module manipulates system crontab files directly, and <code>Celery Beat</code> handles distributed task scheduling. Here are examples of each approach:',
    codeBashTitle: 'Bash / Linux Crontab Commands',
    codeBashDesc: 'On Linux and macOS, the <strong>crontab</strong> command is the primary way to manage <strong>cron jobs</strong>. The <code>crontab -e</code> command opens your user crontab for editing, <code>crontab -l</code> lists current jobs, and system-wide cron jobs live in <code>/etc/cron.d/</code>. Here are essential <strong>crontab</strong> commands and configuration patterns:',
    codeCloudTitle: 'Cloud & CI/CD Cron Scheduling',
    codeCloudDesc: '<strong>Cron expressions</strong> power scheduled automation across all major cloud and CI/CD platforms. <strong>GitHub Actions</strong> uses them in workflow <code>schedule</code> triggers, <strong>AWS EventBridge</strong> (formerly CloudWatch Events) supports a slightly modified <strong>cron syntax</strong>, <strong>Kubernetes CronJob</strong> resources schedule containerized tasks, and <strong>Vercel cron</strong> triggers serverless functions. Here are configuration examples for each platform:',
    h2_advanced: 'Advanced Cron Features',
    advancedDesc1: 'While the standard five-field <strong>cron expression</strong> covers most scheduling needs, many implementations extend the syntax with additional fields and special characters. The most common extension is a <strong>seconds field</strong> (6-field format) prepended before the minute field: <code>second minute hour day-of-month month day-of-week</code>. Libraries like Quartz (Java), <code>node-cron</code>, and Spring Framework support this extended format. Some implementations also add a seventh field for <strong>year</strong>.',
    advancedDesc2: '<strong>Special characters in extended cron</strong>: The <code>L</code> character means "last" - <code>L</code> in the day-of-month field means the last day of the month, while <code>5L</code> in the day-of-week field means the last Friday. The <code>W</code> character means "nearest weekday" - <code>15W</code> means the nearest weekday to the 15th. The <code>#</code> character specifies the Nth occurrence of a weekday - <code>2#3</code> means the third Monday of the month (2=Monday, 3=third occurrence). These are supported by Quartz-based schedulers.',
    advancedDesc3: '<strong>Non-standard shorthand expressions</strong> are convenient aliases recognized by most cron implementations: <code>@reboot</code> runs the job once at system startup; <code>@yearly</code> or <code>@annually</code> is equivalent to <code>0 0 1 1 *</code>; <code>@monthly</code> equals <code>0 0 1 * *</code>; <code>@weekly</code> equals <code>0 0 * * 0</code>; <code>@daily</code> or <code>@midnight</code> equals <code>0 0 * * *</code>; and <code>@hourly</code> equals <code>0 * * * *</code>. These make <strong>crontab</strong> entries more readable without needing a <strong>crontab guru</strong> reference.',
    h2_debugging: 'Cron Job Debugging & Monitoring',
    debugDesc1: '<strong>Timezone issues</strong> are the most common source of cron job failures. By default, cron uses the system timezone, which can vary between servers, containers, and cloud environments. Always explicitly set the <code>TZ</code> environment variable in your <strong>crontab</strong> (e.g., <code>TZ=UTC</code>) or use UTC-based scheduling to avoid surprises when daylight saving time changes or when deploying to different regions. In Kubernetes CronJobs, set the <code>timeZone</code> field (available since v1.27) to your desired IANA timezone.',
    debugDesc2: '<strong>PATH and environment issues</strong>: The cron daemon runs jobs with a minimal environment, not your shell\'s full environment. The default <code>PATH</code> in cron is typically just <code>/usr/bin:/bin</code>, which means commands like <code>node</code>, <code>python3</code>, or <code>docker</code> may not be found. Fix this by setting <code>PATH</code> at the top of your crontab, using absolute paths for all commands (e.g., <code>/usr/local/bin/node</code>), or sourcing your profile at the start of the script.',
    debugDesc3: '<strong>Output not captured</strong>: By default, cron tries to email the output of each job using the local mail system. If mail is not configured (common on modern systems), output is silently lost, making debugging nearly impossible. Always redirect stdout and stderr to a log file: <code>0 * * * * /path/to/script.sh >> /var/log/myjob.log 2>&1</code>. Set <code>MAILTO=your@email.com</code> at the top of the crontab to receive email notifications on job failures.',
    debugDesc4: '<strong>Overlapping runs</strong>: If a cron job takes longer to execute than the interval between runs, multiple instances may run simultaneously, causing resource contention, data corruption, or deadlocks. Use a lock file mechanism with <code>flock</code> (e.g., <code>flock -n /tmp/myjob.lock /path/to/script.sh</code>) to prevent overlapping execution. Monitoring tools like <strong>healthchecks.io</strong>, <strong>Cronitor</strong>, and <strong>Dead Man\'s Snitch</strong> can alert you when a job fails to run, runs too long, or overlaps.',
    h2_bestpractices: 'Cron Job Best Practices',
    bestDesc1: '<strong>Use descriptive comments</strong>: Add a comment above each crontab entry explaining what the job does, who owns it, and when it was last modified. Comments start with <code>#</code> in crontab. This is critical for team environments where multiple engineers maintain the same crontab. Without comments, a <strong>cron expression</strong> like <code>0 3 * * 0</code> is meaningless to someone unfamiliar with the project.',
    bestDesc2: '<strong>Redirect output and use logging</strong>: Never let cron output go to /dev/null unless you are absolutely certain the job is reliable. Instead, redirect to a dedicated log file with timestamps: <code>0 * * * * /path/to/job.sh >> /var/log/cronjobs/job.log 2>&1</code>. Use <code>logrotate</code> to prevent log files from growing indefinitely. Include timestamps in your script output for easier debugging.',
    bestDesc3: '<strong>Use flock for mutual exclusion</strong>: Prevent overlapping runs with the <code>flock</code> command. Add it to your crontab entry: <code>*/5 * * * * flock -n /tmp/myjob.lock /path/to/script.sh</code>. The <code>-n</code> flag makes it non-blocking so the new instance simply exits if the lock is held. This is especially important for jobs that run frequently (every minute, every 5 minutes) where execution time may vary.',
    bestDesc4: '<strong>Set SHELL and PATH explicitly</strong>: At the top of your crontab, declare <code>SHELL=/bin/bash</code> (or your preferred shell) and <code>PATH=/usr/local/bin:/usr/bin:/bin</code> (including all directories needed by your scripts). This prevents failures caused by the minimal default cron environment. Also set <code>MAILTO</code> to receive notifications.',
    bestDesc5: '<strong>Use absolute paths everywhere</strong>: In cron jobs, always use absolute paths for scripts, binaries, configuration files, and output files. Relative paths are resolved against the user\'s home directory or root, which is rarely what you want. Instead of <code>python script.py</code>, use <code>/usr/bin/python3 /opt/myapp/script.py</code>.',
    bestDesc6: '<strong>Monitor with dedicated services</strong>: Use monitoring services like <strong>healthchecks.io</strong>, <strong>Cronitor</strong>, or <strong>Dead Man\'s Snitch</strong> to track job execution. These services provide a unique URL that your cron job pings upon completion. If the ping is missed, you get alerted. This catches silent failures that log-based monitoring might miss. Add a simple <code>curl</code> call at the end of your script: <code>curl -fsS --retry 3 https://hc-ping.com/your-uuid</code>.',
    bestDesc7: '<strong>Be timezone-aware</strong>: Document the timezone your cron jobs expect. Use <code>TZ=UTC</code> at the top of your crontab for consistency across environments. Be aware that daylight saving time transitions can cause jobs scheduled between 2:00 and 3:00 AM to be skipped or run twice. Use a <strong>cron expression generator</strong> or <strong>crontab guru</strong> to verify your schedules account for these edge cases.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What do the five fields in a cron expression mean?',
    faq1_a: 'The five fields in a standard cron expression represent, from left to right: minute (0-59), hour (0-23), day of month (1-31), month (1-12 or JAN-DEC), and day of week (0-7 or SUN-SAT, where both 0 and 7 mean Sunday). Each field accepts exact values, wildcards (*), ranges (1-5), lists (1,3,5), and step values (*/5). For example, "30 9 * * 1-5" means at 09:30 on every weekday (Monday through Friday).',
    faq2_q: 'What is the difference between cron and systemd timers?',
    faq2_a: 'Cron is the traditional Unix job scheduler using crontab files with five-field expressions. Systemd timers are the modern alternative on Linux systems using systemd. Key differences: systemd timers can trigger on events (not just time), support calendar-based schedules with more natural syntax, handle missed runs with Persistent=true, integrate with systemd logging (journalctl), and support per-unit resource limits. However, cron expressions remain the standard in cloud platforms (AWS, GitHub Actions, Kubernetes) and cross-platform tools. For simple time-based scheduling, cron is sufficient; for complex requirements on systemd-based Linux, consider systemd timers.',
    faq3_q: 'How do I run a cron job every N minutes?',
    faq3_a: 'To run a cron job every N minutes, use the step syntax */N in the minute field. Examples: every 5 minutes = "*/5 * * * *", every 10 minutes = "*/10 * * * *", every 15 minutes = "*/15 * * * *", every 30 minutes = "*/30 * * * *". Note that the step value must evenly divide 60 for consistent intervals. For example, */7 runs at minutes 0, 7, 14, 21, 28, 35, 42, 49, and 56 - then jumps back to 0 (only 4 minutes later). For truly even intervals that do not divide 60, consider using a loop-based approach or a task scheduler like systemd timers.',
    conclusion: 'Mastering <strong>cron expressions</strong> is essential for any developer or operations engineer who needs reliable, time-based automation. From basic Unix <strong>crontab</strong> configurations to cloud-native <strong>cron schedules</strong> in Kubernetes and GitHub Actions, the five-field cron syntax is a universal skill. Use a <strong>cron expression generator</strong> to build schedules visually and a <strong>cron parser</strong> to verify them. Bookmark this guide as your comprehensive reference.',
    linkToolBottom: 'Generate and parse cron expressions instantly with our free online tool.',
    relatedPosts: 'Related guides:',
    relatedPost1: 'Cron Expression Examples: Common Patterns & Cheat Sheet',
    relatedPost2: 'Cron Scheduling in Serverless: GitHub Actions, Vercel & Cloudflare',
  },
  zh: {
    intro: '无论你是自动化服务器维护、调度数据管道，还是触发 CI/CD 工作流，<strong>cron 表达式</strong>都是基于时间的任务调度的通用语言。<strong>Cron 表达式生成器</strong>帮助你可视化构建这些调度模式，而 <strong>cron 解析器</strong>将 <code>0 */6 * * 1-5</code> 这样的加密字符串翻译为人类可读的描述。本综合指南涵盖了从经典的五字段 <strong>cron 语法</strong>到 JavaScript、Python、Bash 和云平台的实际 <strong>cron 任务示例</strong>。如果你需要快速创建或解码 cron 调度，请试用我们的免费工具。',
    linkTool: '立即试用我们的免费在线 Cron 表达式生成器和解析器工具。',
    h2_what: '什么是 Cron 表达式？',
    whatDesc1: '<strong>Cron 表达式</strong>是一种紧凑的字符串，用于定义自动化任务的循环调度。名称来源于希腊语 <em>chronos</em>（时间）和 Unix <code>cron</code> 守护进程，自 1970 年代以来它一直在类 Unix 系统上执行定时任务。cron 最初由 Ken Thompson 为 Version 7 Unix 创建，已成为跨操作系统、编程语言和云平台的任务调度事实标准。',
    whatDesc2: '在经典的 Unix <strong>crontab</strong> 格式中，cron 表达式由五个空格分隔的字段组成：<code>分钟 小时 日 月 星期</code>。每个字段接受数字、通配符 (<code>*</code>)、范围、列表和步长值。例如 <code>30 9 * * 1-5</code> 表示"每个工作日的 09:30"。crontab 文件（cron table 的缩写）是用户存储这些表达式及待执行命令的地方。',
    whatDesc3: '如今，cron 表达式已远远超越传统 Unix 系统。Kubernetes CronJob 用它调度容器化工作负载，GitHub Actions 在工作流 schedule 触发器中使用它，AWS EventBridge 支持基于 cron 的调度规则，Vercel cron 让你按计划触发无服务器函数。理解 cron 语法是每位开发者和 DevOps 工程师的必备技能。',
    h2_syntax: 'Cron 表达式语法详解',
    syntaxDesc1: '标准 cron 表达式使用五个字段。每个字段代表一个时间单位，决定 cron 任务何时触发。以下是完整解析：',
    syntaxFields: '<table><thead><tr><th>字段</th><th>允许值</th><th>特殊字符</th><th>说明</th></tr></thead><tbody><tr><td><strong>分钟</strong></td><td>0-59</td><td><code>* , - /</code></td><td>任务运行的分钟</td></tr><tr><td><strong>小时</strong></td><td>0-23</td><td><code>* , - /</code></td><td>24小时制的小时</td></tr><tr><td><strong>日</strong></td><td>1-31</td><td><code>* , - / ? L W</code></td><td>月中的第几天</td></tr><tr><td><strong>月</strong></td><td>1-12 或 JAN-DEC</td><td><code>* , - /</code></td><td>年中的月份</td></tr><tr><td><strong>星期</strong></td><td>0-7 或 SUN-SAT</td><td><code>* , - / ? L #</code></td><td>星期几（0和7均为周日）</td></tr></tbody></table>',
    syntaxDesc2: '<strong>特殊字符说明</strong>：星号 <code>*</code> 匹配该字段的所有可能值。逗号 <code>,</code> 分隔值列表。连字符 <code>-</code> 定义范围。斜杠 <code>/</code> 定义步长值（如分钟字段的 <code>*/5</code> 表示每5分钟）。问号 <code>?</code> 在某些实现中用于日和星期字段，表示"无特定值"。',
    syntaxDesc3: '整体格式：<code>分钟 小时 日 月 星期</code>，即 <code>* * * * *</code>。这个五字段模式是每个 cron 调度定义的核心。',
    h2_examples: 'Cron 表达式示例表',
    examplesDesc: '以下是生产系统中最常见的 cron 任务示例。使用此表作为构建 cron 调度的快速参考：',
    examplesTable: '<table><thead><tr><th>Cron 表达式</th><th>说明</th></tr></thead><tbody><tr><td><code>* * * * *</code></td><td>每分钟</td></tr><tr><td><code>*/5 * * * *</code></td><td>每5分钟</td></tr><tr><td><code>*/15 * * * *</code></td><td>每15分钟</td></tr><tr><td><code>0 * * * *</code></td><td>每小时</td></tr><tr><td><code>0 */6 * * *</code></td><td>每6小时</td></tr><tr><td><code>0 0 * * *</code></td><td>每天午夜</td></tr><tr><td><code>0 9 * * 1-5</code></td><td>工作日上午9点</td></tr><tr><td><code>0 0 1 * *</code></td><td>每月1号午夜</td></tr><tr><td><code>0 0 1 1 *</code></td><td>每年1月1号午夜</td></tr><tr><td><code>0 0 1 */3 *</code></td><td>每季度第一天</td></tr></tbody></table>',
    h2_code: 'Cron 任务代码示例',
    codeJsTitle: 'JavaScript / Node.js Cron 任务',
    codeJsDesc: 'Node.js 提供多个优秀的 cron 任务调度库。最流行的选项包括 <code>node-cron</code>、<code>cron</code> npm 包、零依赖的 <code>croner</code> 以及基于 worker 线程的 <code>Bree</code>：',
    codePyTitle: 'Python Cron 任务调度',
    codePyDesc: 'Python 提供多种 cron 任务调度方式。<code>schedule</code> 库提供人性化 API，<code>APScheduler</code> 提供企业级功能，<code>python-crontab</code> 直接操作系统 crontab 文件：',
    codeBashTitle: 'Bash / Linux Crontab 命令',
    codeBashDesc: '在 Linux 和 macOS 上，<code>crontab</code> 命令是管理 cron 任务的主要方式。<code>crontab -e</code> 编辑用户 crontab，<code>crontab -l</code> 列出当前任务：',
    codeCloudTitle: '云平台与 CI/CD Cron 调度',
    codeCloudDesc: 'Cron 表达式驱动所有主要云和 CI/CD 平台的定时自动化。GitHub Actions、AWS EventBridge、Kubernetes CronJob 和 Vercel cron 都使用 cron 表达式：',
    h2_advanced: '高级 Cron 特性',
    advancedDesc1: '虽然标准五字段 cron 表达式满足大部分调度需求，许多实现扩展了语法。最常见的扩展是在分钟字段前添加秒字段（6字段格式）：<code>秒 分 时 日 月 星期</code>。Quartz、node-cron 和 Spring Framework 支持此扩展格式。',
    advancedDesc2: '<strong>扩展特殊字符</strong>：<code>L</code> 表示"最后"——日字段中的 <code>L</code> 表示月末最后一天。<code>W</code> 表示"最近工作日"——<code>15W</code> 表示最接近15号的工作日。<code>#</code> 指定星期几的第N次出现——<code>2#3</code> 表示每月第三个星期一。',
    advancedDesc3: '<strong>非标准简写表达式</strong>：<code>@reboot</code> 系统启动时执行；<code>@yearly</code> 等同于 <code>0 0 1 1 *</code>；<code>@monthly</code> 等同于 <code>0 0 1 * *</code>；<code>@weekly</code> 等同于 <code>0 0 * * 0</code>；<code>@daily</code> 等同于 <code>0 0 * * *</code>；<code>@hourly</code> 等同于 <code>0 * * * *</code>。',
    h2_debugging: 'Cron 任务调试与监控',
    debugDesc1: '<strong>时区问题</strong>是 cron 任务失败最常见的原因。默认情况下 cron 使用系统时区。始终在 crontab 中显式设置 <code>TZ=UTC</code> 以避免夏令时变化带来的意外。',
    debugDesc2: '<strong>PATH 和环境变量问题</strong>：cron 守护进程以最小化环境运行任务。默认 PATH 通常只有 <code>/usr/bin:/bin</code>。通过在 crontab 顶部设置 PATH 或使用绝对路径来解决。',
    debugDesc3: '<strong>输出未捕获</strong>：默认情况下 cron 尝试通过本地邮件系统发送输出。始终将 stdout 和 stderr 重定向到日志文件：<code>0 * * * * /path/to/script.sh >> /var/log/myjob.log 2>&1</code>。',
    debugDesc4: '<strong>任务重叠执行</strong>：如果 cron 任务执行时间超过间隔，可能同时运行多个实例。使用 <code>flock</code> 锁文件机制防止重叠执行。监控工具如 healthchecks.io 可在任务失败时发出警报。',
    h2_bestpractices: 'Cron 任务最佳实践',
    bestDesc1: '<strong>使用描述性注释</strong>：在每个 crontab 条目上方添加注释说明任务用途、负责人和最后修改时间。',
    bestDesc2: '<strong>重定向输出并使用日志</strong>：始终将输出重定向到专用日志文件，使用 logrotate 防止日志无限增长。',
    bestDesc3: '<strong>使用 flock 实现互斥</strong>：使用 <code>flock -n /tmp/myjob.lock /path/to/script.sh</code> 防止重叠运行。',
    bestDesc4: '<strong>显式设置 SHELL 和 PATH</strong>：在 crontab 顶部声明 <code>SHELL=/bin/bash</code> 和完整的 PATH。',
    bestDesc5: '<strong>使用绝对路径</strong>：在 cron 任务中始终使用脚本、二进制文件和配置文件的绝对路径。',
    bestDesc6: '<strong>使用专业监控服务</strong>：使用 healthchecks.io、Cronitor 等服务跟踪任务执行。在脚本末尾添加 curl 调用以发送心跳。',
    bestDesc7: '<strong>注意时区</strong>：记录 cron 任务期望的时区。使用 <code>TZ=UTC</code> 保持跨环境一致性。注意夏令时切换可能导致凌晨 2-3 点的任务被跳过或重复执行。',
    h2_faq: '常见问题',
    faq1_q: 'Cron 表达式的五个字段分别代表什么？',
    faq1_a: '标准 cron 表达式的五个字段从左到右分别是：分钟（0-59）、小时（0-23）、月中日（1-31）、月份（1-12）、星期（0-7，0和7都是周日）。每个字段接受精确值、通配符（*）、范围（1-5）、列表（1,3,5）和步长值（*/5）。',
    faq2_q: 'Cron 和 systemd timer 有什么区别？',
    faq2_a: 'Cron 是使用 crontab 文件的传统 Unix 任务调度器。Systemd timer 是 Linux 上使用 systemd 的现代替代方案。主要区别：systemd timer 可基于事件触发、支持更自然的日历语法、能处理错过的运行、集成 systemd 日志。但 cron 表达式仍是云平台的标准。',
    faq3_q: '如何让 cron 任务每 N 分钟运行一次？',
    faq3_a: '使用分钟字段的步长语法 */N。例如：每5分钟 = "*/5 * * * *"，每10分钟 = "*/10 * * * *"，每15分钟 = "*/15 * * * *"。注意步长值应能整除60以获得一致间隔。',
    conclusion: '掌握 cron 表达式是每位需要可靠定时自动化的开发者和运维工程师的必备技能。从基本的 Unix crontab 配置到 Kubernetes 和 GitHub Actions 的云原生 cron 调度，五字段 cron 语法是通用技能。收藏本指南作为综合参考。',
    linkToolBottom: '使用我们的免费在线工具即时生成和解析 Cron 表达式。',
    relatedPosts: '相关指南：',
    relatedPost1: 'Cron 表达式示例：常见模式与速查表',
    relatedPost2: '无服务器中的 Cron 调度：GitHub Actions、Vercel 与 Cloudflare',
  },
  fr: {
    intro: 'Que vous automatisiez la maintenance de serveurs, planifiiez des pipelines de donnees ou declenchiz des workflows CI/CD, l\'<strong>expression cron</strong> est le langage universel de la planification de taches. Un <strong>generateur d\'expressions cron</strong> vous aide a construire ces modeles visuellement, tandis qu\'un <strong>analyseur cron</strong> traduit les chaines cryptiques en descriptions lisibles. Ce guide couvre tout, de la <strong>syntaxe cron</strong> a cinq champs aux exemples pratiques en JavaScript, Python, Bash et plateformes cloud.',
    linkTool: 'Essayez notre outil gratuit de generation et d\'analyse d\'expressions cron.',
    h2_what: 'Qu\'est-ce qu\'une expression cron ?',
    whatDesc1: 'Une <strong>expression cron</strong> est une chaine compacte definissant un calendrier recurrent pour les taches automatisees. Le nom vient du grec <em>chronos</em> (temps) et du daemon Unix <code>cron</code>. Cron est devenu la norme pour la planification de taches sur tous les systemes d\'exploitation et plateformes cloud.',
    whatDesc2: 'Dans le format <strong>crontab</strong> Unix classique, une expression cron comporte cinq champs : <code>minute heure jour-du-mois mois jour-de-la-semaine</code>. Chaque champ accepte des nombres, des jokers, des plages, des listes et des pas.',
    whatDesc3: 'Aujourd\'hui, les expressions cron sont utilisees dans Kubernetes CronJobs, GitHub Actions, AWS EventBridge et Vercel cron. Comprendre la syntaxe cron est essentiel pour tout developpeur.',
    h2_syntax: 'Syntaxe des expressions cron',
    syntaxDesc1: 'L\'expression cron standard utilise cinq champs. Chaque champ represente une unite de temps :',
    syntaxFields: '<table><thead><tr><th>Champ</th><th>Valeurs</th><th>Caracteres speciaux</th><th>Description</th></tr></thead><tbody><tr><td><strong>Minute</strong></td><td>0-59</td><td><code>* , - /</code></td><td>Minute d\'execution</td></tr><tr><td><strong>Heure</strong></td><td>0-23</td><td><code>* , - /</code></td><td>Heure (format 24h)</td></tr><tr><td><strong>Jour du mois</strong></td><td>1-31</td><td><code>* , - / ? L W</code></td><td>Jour du mois</td></tr><tr><td><strong>Mois</strong></td><td>1-12</td><td><code>* , - /</code></td><td>Mois de l\'annee</td></tr><tr><td><strong>Jour de la semaine</strong></td><td>0-7</td><td><code>* , - / ? L #</code></td><td>Jour de la semaine</td></tr></tbody></table>',
    syntaxDesc2: '<strong>Caracteres speciaux</strong> : <code>*</code> correspond a toutes les valeurs. La virgule <code>,</code> separe une liste. Le tiret <code>-</code> definit une plage. La barre oblique <code>/</code> definit un pas (ex: <code>*/5</code> = toutes les 5 minutes).',
    syntaxDesc3: 'Le format est : <code>* * * * *</code> (minute heure jour mois jour-semaine). Ce modele a cinq champs est le coeur de toute definition de planification cron.',
    h2_examples: 'Tableau d\'exemples d\'expressions cron',
    examplesDesc: 'Voici les exemples les plus courants d\'expressions cron en production :',
    examplesTable: '<table><thead><tr><th>Expression cron</th><th>Description</th></tr></thead><tbody><tr><td><code>* * * * *</code></td><td>Chaque minute</td></tr><tr><td><code>*/5 * * * *</code></td><td>Toutes les 5 minutes</td></tr><tr><td><code>0 * * * *</code></td><td>Chaque heure</td></tr><tr><td><code>0 0 * * *</code></td><td>Chaque jour a minuit</td></tr><tr><td><code>0 9 * * 1-5</code></td><td>Jours ouvrables a 9h</td></tr><tr><td><code>0 0 1 * *</code></td><td>Premier jour de chaque mois</td></tr></tbody></table>',
    h2_code: 'Exemples de code pour les taches cron',
    codeJsTitle: 'JavaScript / Node.js Taches cron',
    codeJsDesc: 'Node.js offre plusieurs bibliotheques pour la planification cron, notamment <code>node-cron</code>, <code>cron</code>, <code>croner</code> et <code>Bree</code> :',
    codePyTitle: 'Python Planification cron',
    codePyDesc: 'Python propose <code>schedule</code>, <code>APScheduler</code>, <code>python-crontab</code> et <code>Celery Beat</code> pour la planification de taches :',
    codeBashTitle: 'Bash / Linux Commandes crontab',
    codeBashDesc: 'Sur Linux/macOS, <code>crontab -e</code> pour editer, <code>crontab -l</code> pour lister les taches :',
    codeCloudTitle: 'Cloud & CI/CD Planification cron',
    codeCloudDesc: 'Les expressions cron sont utilisees dans GitHub Actions, AWS EventBridge, Kubernetes CronJob et Vercel cron :',
    h2_advanced: 'Fonctionnalites cron avancees',
    advancedDesc1: 'De nombreuses implementations etendent la syntaxe avec un champ secondes (6 champs) et un champ annee (7 champs). Quartz, node-cron et Spring Framework supportent ces formats etendus.',
    advancedDesc2: '<strong>Caracteres etendus</strong> : <code>L</code> = dernier, <code>W</code> = jour ouvrable le plus proche, <code>#</code> = Nieme occurrence d\'un jour de la semaine.',
    advancedDesc3: '<strong>Raccourcis non standard</strong> : <code>@reboot</code>, <code>@yearly</code>, <code>@monthly</code>, <code>@weekly</code>, <code>@daily</code>, <code>@hourly</code> sont des alias pratiques.',
    h2_debugging: 'Debogage et surveillance des taches cron',
    debugDesc1: '<strong>Problemes de fuseau horaire</strong> : definissez toujours <code>TZ=UTC</code> dans votre crontab pour eviter les surprises.',
    debugDesc2: '<strong>Problemes de PATH</strong> : le daemon cron utilise un environnement minimal. Utilisez des chemins absolus.',
    debugDesc3: '<strong>Sortie non capturee</strong> : redirigez toujours stdout et stderr vers un fichier log.',
    debugDesc4: '<strong>Executions superposees</strong> : utilisez <code>flock</code> pour empecher les executions simultanees.',
    h2_bestpractices: 'Bonnes pratiques pour les taches cron',
    bestDesc1: '<strong>Commentaires descriptifs</strong> : documentez chaque entree crontab.',
    bestDesc2: '<strong>Redirection et journalisation</strong> : redirigez vers des fichiers log dedies.',
    bestDesc3: '<strong>Exclusion mutuelle avec flock</strong> : empêchez les executions superposees.',
    bestDesc4: '<strong>Definir SHELL et PATH</strong> : declarez explicitement l\'environnement.',
    bestDesc5: '<strong>Chemins absolus</strong> : utilisez des chemins absolus partout.',
    bestDesc6: '<strong>Services de surveillance</strong> : utilisez healthchecks.io ou Cronitor.',
    bestDesc7: '<strong>Conscience des fuseaux horaires</strong> : documentez et utilisez UTC.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Que signifient les cinq champs d\'une expression cron ?',
    faq1_a: 'Les cinq champs representent : minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12), jour de la semaine (0-7). Chaque champ accepte des valeurs exactes, jokers (*), plages, listes et pas.',
    faq2_q: 'Quelle est la difference entre cron et les timers systemd ?',
    faq2_a: 'Cron est le planificateur Unix traditionnel. Les timers systemd sont l\'alternative moderne sur Linux : ils supportent les evenements, gèrent les executions manquees et s\'integrent a journalctl. Cron reste le standard dans le cloud.',
    faq3_q: 'Comment executer une tache cron toutes les N minutes ?',
    faq3_a: 'Utilisez la syntaxe */N dans le champ minute. Exemples : toutes les 5 minutes = "*/5 * * * *", toutes les 15 minutes = "*/15 * * * *". Le pas doit diviser 60 pour des intervalles reguliers.',
    conclusion: 'Maitriser les expressions cron est essentiel pour tout developpeur. Utilisez notre outil gratuit pour generer et analyser des expressions cron.',
    linkToolBottom: 'Generez et analysez des expressions cron avec notre outil gratuit.',
    relatedPosts: 'Guides connexes :',
    relatedPost1: 'Exemples d\'expressions cron : modeles courants',
    relatedPost2: 'Planification cron serverless : GitHub Actions, Vercel & Cloudflare',
  },
  de: {
    intro: 'Ob Sie Serverwartung automatisieren, Datenpipelines planen oder CI/CD-Workflows auslosen - der <strong>Cron-Ausdruck</strong> ist die universelle Sprache der zeitbasierten Aufgabenplanung. Ein <strong>Cron-Ausdruck-Generator</strong> hilft beim visuellen Erstellen, wahrend ein <strong>Cron-Parser</strong> kryptische Zeichenketten in lesbare Beschreibungen ubersetzt. Dieser Leitfaden deckt alles ab, von der <strong>Cron-Syntax</strong> bis zu praktischen Beispielen in JavaScript, Python, Bash und Cloud-Plattformen.',
    linkTool: 'Testen Sie unser kostenloses Online-Tool zum Generieren und Parsen von Cron-Ausdrucken.',
    h2_what: 'Was ist ein Cron-Ausdruck?',
    whatDesc1: 'Ein <strong>Cron-Ausdruck</strong> ist eine kompakte Zeichenkette zur Definition wiederkehrender Zeitplane. Der Name stammt vom griechischen <em>chronos</em> (Zeit) und dem Unix-<code>cron</code>-Daemon. Cron ist zum Standard fur Aufgabenplanung geworden.',
    whatDesc2: 'Im klassischen Unix-<strong>Crontab</strong>-Format besteht ein Cron-Ausdruck aus funf Feldern: <code>Minute Stunde Tag Monat Wochentag</code>. Jedes Feld akzeptiert Zahlen, Platzhalter, Bereiche, Listen und Schritte.',
    whatDesc3: 'Heute werden Cron-Ausdrucke in Kubernetes CronJobs, GitHub Actions, AWS EventBridge und Vercel Cron verwendet. Das Verstandnis der Cron-Syntax ist fur jeden Entwickler unerlasslich.',
    h2_syntax: 'Cron-Ausdruck-Syntax erklart',
    syntaxDesc1: 'Der Standard-Cron-Ausdruck verwendet funf Felder. Jedes Feld stellt eine Zeiteinheit dar:',
    syntaxFields: '<table><thead><tr><th>Feld</th><th>Werte</th><th>Sonderzeichen</th><th>Beschreibung</th></tr></thead><tbody><tr><td><strong>Minute</strong></td><td>0-59</td><td><code>* , - /</code></td><td>Ausfuhrungsminute</td></tr><tr><td><strong>Stunde</strong></td><td>0-23</td><td><code>* , - /</code></td><td>Stunde (24h-Format)</td></tr><tr><td><strong>Tag</strong></td><td>1-31</td><td><code>* , - / ? L W</code></td><td>Tag des Monats</td></tr><tr><td><strong>Monat</strong></td><td>1-12</td><td><code>* , - /</code></td><td>Monat des Jahres</td></tr><tr><td><strong>Wochentag</strong></td><td>0-7</td><td><code>* , - / ? L #</code></td><td>Tag der Woche</td></tr></tbody></table>',
    syntaxDesc2: '<strong>Sonderzeichen</strong>: <code>*</code> passt auf alle Werte. Komma <code>,</code> trennt Listen. Bindestrich <code>-</code> definiert Bereiche. Schragstrich <code>/</code> definiert Schritte (z.B. <code>*/5</code> = alle 5 Minuten).',
    syntaxDesc3: 'Das Format ist: <code>* * * * *</code> (Minute Stunde Tag Monat Wochentag). Dieses Funf-Felder-Muster ist das Herzstuck jeder Cron-Zeitplan-Definition.',
    h2_examples: 'Cron-Ausdruck-Beispieltabelle',
    examplesDesc: 'Hier sind die haufigsten Cron-Ausdruck-Beispiele aus Produktionssystemen:',
    examplesTable: '<table><thead><tr><th>Cron-Ausdruck</th><th>Beschreibung</th></tr></thead><tbody><tr><td><code>* * * * *</code></td><td>Jede Minute</td></tr><tr><td><code>*/5 * * * *</code></td><td>Alle 5 Minuten</td></tr><tr><td><code>0 * * * *</code></td><td>Stundlich</td></tr><tr><td><code>0 0 * * *</code></td><td>Taglich um Mitternacht</td></tr><tr><td><code>0 9 * * 1-5</code></td><td>Werktags um 9 Uhr</td></tr><tr><td><code>0 0 1 * *</code></td><td>Erster Tag jedes Monats</td></tr></tbody></table>',
    h2_code: 'Codebeispiele fur Cron-Jobs',
    codeJsTitle: 'JavaScript / Node.js Cron-Jobs',
    codeJsDesc: 'Node.js bietet <code>node-cron</code>, <code>cron</code>, <code>croner</code> und <code>Bree</code> fur die Aufgabenplanung:',
    codePyTitle: 'Python Cron-Planung',
    codePyDesc: 'Python bietet <code>schedule</code>, <code>APScheduler</code>, <code>python-crontab</code> und <code>Celery Beat</code>:',
    codeBashTitle: 'Bash / Linux Crontab-Befehle',
    codeBashDesc: 'Unter Linux/macOS: <code>crontab -e</code> zum Bearbeiten, <code>crontab -l</code> zum Auflisten:',
    codeCloudTitle: 'Cloud & CI/CD Cron-Planung',
    codeCloudDesc: 'Cron-Ausdrucke werden in GitHub Actions, AWS EventBridge, Kubernetes CronJob und Vercel Cron verwendet:',
    h2_advanced: 'Erweiterte Cron-Funktionen',
    advancedDesc1: 'Viele Implementierungen erweitern die Syntax um ein Sekundenfeld (6 Felder) und ein Jahresfeld (7 Felder). Quartz, node-cron und Spring Framework unterstutzen diese erweiterten Formate.',
    advancedDesc2: '<strong>Erweiterte Sonderzeichen</strong>: <code>L</code> = letzter, <code>W</code> = nachster Werktag, <code>#</code> = N-tes Vorkommen eines Wochentags.',
    advancedDesc3: '<strong>Nicht-standardmasige Kurzformen</strong>: <code>@reboot</code>, <code>@yearly</code>, <code>@monthly</code>, <code>@weekly</code>, <code>@daily</code>, <code>@hourly</code>.',
    h2_debugging: 'Cron-Job-Debugging und Uberwachung',
    debugDesc1: '<strong>Zeitzonen-Probleme</strong>: Setzen Sie immer <code>TZ=UTC</code> in Ihrer Crontab.',
    debugDesc2: '<strong>PATH-Probleme</strong>: Der Cron-Daemon verwendet eine minimale Umgebung. Verwenden Sie absolute Pfade.',
    debugDesc3: '<strong>Ausgabe nicht erfasst</strong>: Leiten Sie stdout und stderr immer in eine Log-Datei um.',
    debugDesc4: '<strong>Uberlappende Ausfuhrungen</strong>: Verwenden Sie <code>flock</code> zur Vermeidung.',
    h2_bestpractices: 'Cron-Job Best Practices',
    bestDesc1: '<strong>Beschreibende Kommentare</strong>: Dokumentieren Sie jeden Crontab-Eintrag.',
    bestDesc2: '<strong>Ausgabeumleitung und Logging</strong>: In dedizierte Log-Dateien umleiten.',
    bestDesc3: '<strong>Gegenseitiger Ausschluss mit flock</strong>: Uberlappungen verhindern.',
    bestDesc4: '<strong>SHELL und PATH setzen</strong>: Umgebung explizit deklarieren.',
    bestDesc5: '<strong>Absolute Pfade</strong>: Uberall absolute Pfade verwenden.',
    bestDesc6: '<strong>Uberwachungsdienste</strong>: healthchecks.io oder Cronitor verwenden.',
    bestDesc7: '<strong>Zeitzonen-Bewusstsein</strong>: UTC verwenden und dokumentieren.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was bedeuten die funf Felder eines Cron-Ausdrucks?',
    faq1_a: 'Die funf Felder sind: Minute (0-59), Stunde (0-23), Tag des Monats (1-31), Monat (1-12), Wochentag (0-7). Jedes Feld akzeptiert Werte, Platzhalter (*), Bereiche, Listen und Schritte.',
    faq2_q: 'Was ist der Unterschied zwischen Cron und systemd Timern?',
    faq2_a: 'Cron ist der traditionelle Unix-Planer. Systemd Timer sind die moderne Alternative unter Linux: sie unterstutzen Ereignisse, behandeln verpasste Ausfuhrungen und integrieren sich in journalctl. Cron bleibt der Standard in der Cloud.',
    faq3_q: 'Wie fuhre ich einen Cron-Job alle N Minuten aus?',
    faq3_a: 'Verwenden Sie die Schritt-Syntax */N im Minutenfeld. Beispiele: alle 5 Minuten = "*/5 * * * *", alle 15 Minuten = "*/15 * * * *". Der Schrittwert sollte 60 teilen.',
    conclusion: 'Das Beherrschen von Cron-Ausdrucken ist fur jeden Entwickler unerlasslich. Nutzen Sie unser kostenloses Tool zum Generieren und Parsen.',
    linkToolBottom: 'Generieren und parsen Sie Cron-Ausdrucke mit unserem kostenlosen Tool.',
    relatedPosts: 'Verwandte Leitfaden:',
    relatedPost1: 'Cron-Ausdruck-Beispiele: Gangige Muster',
    relatedPost2: 'Cron-Planung in Serverless: GitHub Actions, Vercel & Cloudflare',
  },
  es: {
    intro: 'Ya sea que estes automatizando mantenimiento de servidores, programando pipelines de datos o activando workflows CI/CD, la <strong>expresion cron</strong> es el lenguaje universal de la programacion de tareas. Un <strong>generador de expresiones cron</strong> te ayuda a construir estos patrones visualmente, mientras que un <strong>analizador cron</strong> traduce cadenas cripticas en descripciones legibles. Esta guia cubre desde la <strong>sintaxis cron</strong> hasta ejemplos practicos en JavaScript, Python, Bash y plataformas cloud.',
    linkTool: 'Prueba nuestra herramienta gratuita de generacion y analisis de expresiones cron.',
    h2_what: 'Que es una expresion cron?',
    whatDesc1: 'Una <strong>expresion cron</strong> es una cadena compacta que define un calendario recurrente para tareas automatizadas. El nombre viene del griego <em>chronos</em> (tiempo) y el daemon Unix <code>cron</code>. Cron se ha convertido en el estandar para la programacion de tareas.',
    whatDesc2: 'En el formato <strong>crontab</strong> clasico de Unix, una expresion cron tiene cinco campos: <code>minuto hora dia-del-mes mes dia-de-la-semana</code>. Cada campo acepta numeros, comodines, rangos, listas y valores de paso.',
    whatDesc3: 'Hoy, las expresiones cron se usan en Kubernetes CronJobs, GitHub Actions, AWS EventBridge y Vercel cron. Entender la sintaxis cron es esencial para todo desarrollador.',
    h2_syntax: 'Sintaxis de expresiones cron',
    syntaxDesc1: 'La expresion cron estandar usa cinco campos. Cada campo representa una unidad de tiempo:',
    syntaxFields: '<table><thead><tr><th>Campo</th><th>Valores</th><th>Caracteres especiales</th><th>Descripcion</th></tr></thead><tbody><tr><td><strong>Minuto</strong></td><td>0-59</td><td><code>* , - /</code></td><td>Minuto de ejecucion</td></tr><tr><td><strong>Hora</strong></td><td>0-23</td><td><code>* , - /</code></td><td>Hora (formato 24h)</td></tr><tr><td><strong>Dia del mes</strong></td><td>1-31</td><td><code>* , - / ? L W</code></td><td>Dia del mes</td></tr><tr><td><strong>Mes</strong></td><td>1-12</td><td><code>* , - /</code></td><td>Mes del ano</td></tr><tr><td><strong>Dia de la semana</strong></td><td>0-7</td><td><code>* , - / ? L #</code></td><td>Dia de la semana</td></tr></tbody></table>',
    syntaxDesc2: '<strong>Caracteres especiales</strong>: <code>*</code> coincide con todos los valores. La coma <code>,</code> separa listas. El guion <code>-</code> define rangos. La barra <code>/</code> define pasos (ej: <code>*/5</code> = cada 5 minutos).',
    syntaxDesc3: 'El formato es: <code>* * * * *</code> (minuto hora dia mes dia-semana). Este patron de cinco campos es el nucleo de toda definicion de programacion cron.',
    h2_examples: 'Tabla de ejemplos de expresiones cron',
    examplesDesc: 'Aqui estan los ejemplos mas comunes de expresiones cron en produccion:',
    examplesTable: '<table><thead><tr><th>Expresion cron</th><th>Descripcion</th></tr></thead><tbody><tr><td><code>* * * * *</code></td><td>Cada minuto</td></tr><tr><td><code>*/5 * * * *</code></td><td>Cada 5 minutos</td></tr><tr><td><code>0 * * * *</code></td><td>Cada hora</td></tr><tr><td><code>0 0 * * *</code></td><td>Diariamente a medianoche</td></tr><tr><td><code>0 9 * * 1-5</code></td><td>Dias laborables a las 9 AM</td></tr><tr><td><code>0 0 1 * *</code></td><td>Primer dia de cada mes</td></tr></tbody></table>',
    h2_code: 'Ejemplos de codigo para tareas cron',
    codeJsTitle: 'JavaScript / Node.js Tareas cron',
    codeJsDesc: 'Node.js ofrece <code>node-cron</code>, <code>cron</code>, <code>croner</code> y <code>Bree</code> para la programacion de tareas:',
    codePyTitle: 'Python Programacion cron',
    codePyDesc: 'Python ofrece <code>schedule</code>, <code>APScheduler</code>, <code>python-crontab</code> y <code>Celery Beat</code>:',
    codeBashTitle: 'Bash / Linux Comandos crontab',
    codeBashDesc: 'En Linux/macOS: <code>crontab -e</code> para editar, <code>crontab -l</code> para listar:',
    codeCloudTitle: 'Cloud & CI/CD Programacion cron',
    codeCloudDesc: 'Las expresiones cron se usan en GitHub Actions, AWS EventBridge, Kubernetes CronJob y Vercel cron:',
    h2_advanced: 'Funciones cron avanzadas',
    advancedDesc1: 'Muchas implementaciones extienden la sintaxis con un campo de segundos (6 campos) y un campo de ano (7 campos). Quartz, node-cron y Spring Framework soportan estos formatos.',
    advancedDesc2: '<strong>Caracteres extendidos</strong>: <code>L</code> = ultimo, <code>W</code> = dia laborable mas cercano, <code>#</code> = N-esima ocurrencia de un dia de la semana.',
    advancedDesc3: '<strong>Atajos no estandar</strong>: <code>@reboot</code>, <code>@yearly</code>, <code>@monthly</code>, <code>@weekly</code>, <code>@daily</code>, <code>@hourly</code>.',
    h2_debugging: 'Depuracion y monitoreo de tareas cron',
    debugDesc1: '<strong>Problemas de zona horaria</strong>: siempre establece <code>TZ=UTC</code> en tu crontab.',
    debugDesc2: '<strong>Problemas de PATH</strong>: el daemon cron usa un entorno minimo. Usa rutas absolutas.',
    debugDesc3: '<strong>Salida no capturada</strong>: redirige siempre stdout y stderr a un archivo log.',
    debugDesc4: '<strong>Ejecuciones superpuestas</strong>: usa <code>flock</code> para prevenirlas.',
    h2_bestpractices: 'Mejores practicas para tareas cron',
    bestDesc1: '<strong>Comentarios descriptivos</strong>: documenta cada entrada crontab.',
    bestDesc2: '<strong>Redireccion y logging</strong>: redirige a archivos log dedicados.',
    bestDesc3: '<strong>Exclusion mutua con flock</strong>: previene ejecuciones superpuestas.',
    bestDesc4: '<strong>Establecer SHELL y PATH</strong>: declara el entorno explicitamente.',
    bestDesc5: '<strong>Rutas absolutas</strong>: usa rutas absolutas en todas partes.',
    bestDesc6: '<strong>Servicios de monitoreo</strong>: usa healthchecks.io o Cronitor.',
    bestDesc7: '<strong>Conciencia de zonas horarias</strong>: usa UTC y documenta.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Que significan los cinco campos de una expresion cron?',
    faq1_a: 'Los cinco campos son: minuto (0-59), hora (0-23), dia del mes (1-31), mes (1-12), dia de la semana (0-7). Cada campo acepta valores, comodines (*), rangos, listas y pasos.',
    faq2_q: 'Cual es la diferencia entre cron y los timers de systemd?',
    faq2_a: 'Cron es el programador Unix tradicional. Los timers de systemd son la alternativa moderna en Linux: soportan eventos, manejan ejecuciones perdidas y se integran con journalctl. Cron sigue siendo el estandar en la nube.',
    faq3_q: 'Como ejecuto una tarea cron cada N minutos?',
    faq3_a: 'Usa la sintaxis */N en el campo de minutos. Ejemplos: cada 5 minutos = "*/5 * * * *", cada 15 minutos = "*/15 * * * *". El valor debe dividir 60 para intervalos regulares.',
    conclusion: 'Dominar las expresiones cron es esencial para todo desarrollador. Usa nuestra herramienta gratuita para generar y analizar expresiones cron.',
    linkToolBottom: 'Genera y analiza expresiones cron con nuestra herramienta gratuita.',
    relatedPosts: 'Guias relacionadas:',
    relatedPost1: 'Ejemplos de expresiones cron: patrones comunes',
    relatedPost2: 'Programacion cron en serverless: GitHub Actions, Vercel & Cloudflare',
  },
  ja: {
    intro: 'サーバーメンテナンスの自動化、データパイプラインのスケジューリング、CI/CDワークフローのトリガーなど、<strong>cron式</strong>は時間ベースのジョブスケジューリングの共通言語です。<strong>cron式ジェネレーター</strong>はこれらのパターンを視覚的に構築し、<strong>cronパーサー</strong>は暗号のような文字列を人間が読める説明に変換します。このガイドでは<strong>cron構文</strong>からJavaScript、Python、Bash、クラウドプラットフォームの実践例まで全てをカバーします。',
    linkTool: '無料オンラインCron式ジェネレーター＆パーサーツールをお試しください。',
    h2_what: 'Cron式とは？',
    whatDesc1: '<strong>Cron式</strong>は自動化タスクの繰り返しスケジュールを定義するコンパクトな文字列です。名前はギリシャ語の<em>chronos</em>（時間）とUnixの<code>cron</code>デーモンに由来します。cronはタスクスケジューリングの事実上の標準となっています。',
    whatDesc2: 'クラシックなUnix <strong>crontab</strong>形式では、cron式は5つのフィールドで構成されます：<code>分 時 日 月 曜日</code>。各フィールドは数値、ワイルドカード、範囲、リスト、ステップ値を受け付けます。',
    whatDesc3: '現在、cron式はKubernetes CronJob、GitHub Actions、AWS EventBridge、Vercel cronで使用されています。cron構文の理解はすべての開発者にとって不可欠です。',
    h2_syntax: 'Cron式の構文解説',
    syntaxDesc1: '標準cron式は5つのフィールドを使用します。各フィールドは時間の単位を表します：',
    syntaxFields: '<table><thead><tr><th>フィールド</th><th>許可値</th><th>特殊文字</th><th>説明</th></tr></thead><tbody><tr><td><strong>分</strong></td><td>0-59</td><td><code>* , - /</code></td><td>実行する分</td></tr><tr><td><strong>時</strong></td><td>0-23</td><td><code>* , - /</code></td><td>時（24時間形式）</td></tr><tr><td><strong>日</strong></td><td>1-31</td><td><code>* , - / ? L W</code></td><td>月の日</td></tr><tr><td><strong>月</strong></td><td>1-12</td><td><code>* , - /</code></td><td>年の月</td></tr><tr><td><strong>曜日</strong></td><td>0-7</td><td><code>* , - / ? L #</code></td><td>曜日</td></tr></tbody></table>',
    syntaxDesc2: '<strong>特殊文字</strong>：<code>*</code>は全ての値にマッチ。カンマ<code>,</code>はリスト区切り。ハイフン<code>-</code>は範囲定義。スラッシュ<code>/</code>はステップ値定義（例：<code>*/5</code>=5分毎）。',
    syntaxDesc3: '形式は：<code>* * * * *</code>（分 時 日 月 曜日）。この5フィールドパターンがcronスケジュール定義の核心です。',
    h2_examples: 'Cron式の例テーブル',
    examplesDesc: '本番システムで最も一般的なcron式の例です：',
    examplesTable: '<table><thead><tr><th>Cron式</th><th>説明</th></tr></thead><tbody><tr><td><code>* * * * *</code></td><td>毎分</td></tr><tr><td><code>*/5 * * * *</code></td><td>5分毎</td></tr><tr><td><code>0 * * * *</code></td><td>毎時</td></tr><tr><td><code>0 0 * * *</code></td><td>毎日深夜0時</td></tr><tr><td><code>0 9 * * 1-5</code></td><td>平日9時</td></tr><tr><td><code>0 0 1 * *</code></td><td>毎月1日深夜0時</td></tr></tbody></table>',
    h2_code: 'Cronジョブのコード例',
    codeJsTitle: 'JavaScript / Node.js Cronジョブ',
    codeJsDesc: 'Node.jsは<code>node-cron</code>、<code>cron</code>、<code>croner</code>、<code>Bree</code>などのスケジューリングライブラリを提供しています：',
    codePyTitle: 'Python Cronスケジューリング',
    codePyDesc: 'Pythonは<code>schedule</code>、<code>APScheduler</code>、<code>python-crontab</code>、<code>Celery Beat</code>を提供しています：',
    codeBashTitle: 'Bash / Linux Crontabコマンド',
    codeBashDesc: 'Linux/macOSでは<code>crontab -e</code>で編集、<code>crontab -l</code>で一覧表示：',
    codeCloudTitle: 'クラウド & CI/CD Cronスケジューリング',
    codeCloudDesc: 'Cron式はGitHub Actions、AWS EventBridge、Kubernetes CronJob、Vercel cronで使用されます：',
    h2_advanced: '高度なCron機能',
    advancedDesc1: '多くの実装では秒フィールド（6フィールド形式）や年フィールド（7フィールド形式）で構文を拡張しています。Quartz、node-cron、Spring Frameworkがサポートしています。',
    advancedDesc2: '<strong>拡張特殊文字</strong>：<code>L</code>=最後、<code>W</code>=最も近い平日、<code>#</code>=N番目の曜日の出現。',
    advancedDesc3: '<strong>非標準の省略形</strong>：<code>@reboot</code>、<code>@yearly</code>、<code>@monthly</code>、<code>@weekly</code>、<code>@daily</code>、<code>@hourly</code>。',
    h2_debugging: 'Cronジョブのデバッグと監視',
    debugDesc1: '<strong>タイムゾーンの問題</strong>：crontabで常に<code>TZ=UTC</code>を設定してください。',
    debugDesc2: '<strong>PATHの問題</strong>：cronデーモンは最小限の環境で実行します。絶対パスを使用してください。',
    debugDesc3: '<strong>出力が未キャプチャ</strong>：stdoutとstderrを常にログファイルにリダイレクトしてください。',
    debugDesc4: '<strong>実行の重複</strong>：<code>flock</code>で重複実行を防止してください。',
    h2_bestpractices: 'Cronジョブのベストプラクティス',
    bestDesc1: '<strong>説明的なコメント</strong>：各crontabエントリをドキュメント化してください。',
    bestDesc2: '<strong>出力リダイレクトとログ</strong>：専用のログファイルにリダイレクトしてください。',
    bestDesc3: '<strong>flockによる排他制御</strong>：重複実行を防止してください。',
    bestDesc4: '<strong>SHELLとPATHの設定</strong>：環境を明示的に宣言してください。',
    bestDesc5: '<strong>絶対パスの使用</strong>：全ての場所で絶対パスを使用してください。',
    bestDesc6: '<strong>監視サービスの利用</strong>：healthchecks.ioやCronitorを使用してください。',
    bestDesc7: '<strong>タイムゾーンの意識</strong>：UTCを使用してドキュメント化してください。',
    h2_faq: 'よくある質問',
    faq1_q: 'Cron式の5つのフィールドは何を意味しますか？',
    faq1_a: '5つのフィールドは：分（0-59）、時（0-23）、日（1-31）、月（1-12）、曜日（0-7）です。各フィールドは値、ワイルドカード（*）、範囲、リスト、ステップ値を受け付けます。',
    faq2_q: 'cronとsystemdタイマーの違いは？',
    faq2_a: 'cronは伝統的なUnixスケジューラーです。systemdタイマーはLinuxの現代的な代替手段で、イベントベースのトリガー、欠落した実行の処理、journalctlとの統合をサポートします。cronはクラウドプラットフォームで標準のままです。',
    faq3_q: 'N分ごとにcronジョブを実行するには？',
    faq3_a: '分フィールドでステップ構文 */N を使用します。例：5分毎 = "*/5 * * * *"、15分毎 = "*/15 * * * *"。一定間隔にはステップ値が60を割り切れる必要があります。',
    conclusion: 'Cron式をマスターすることは、信頼性の高い時間ベースの自動化を必要とするすべての開発者にとって不可欠です。この総合ガイドをブックマークして参考にしてください。',
    linkToolBottom: '無料オンラインツールでCron式を即座に生成・解析。',
    relatedPosts: '関連ガイド：',
    relatedPost1: 'Cron式の例：一般的なパターンとチートシート',
    relatedPost2: 'サーバーレスでのCronスケジューリング：GitHub Actions、Vercel & Cloudflare',
  },
  ko: {
    intro: '서버 유지보수 자동화, 데이터 파이프라인 스케줄링, CI/CD 워크플로우 트리거 등 <strong>cron 표현식</strong>은 시간 기반 작업 스케줄링의 공용 언어입니다. <strong>cron 표현식 생성기</strong>는 시각적으로 패턴을 구축하고, <strong>cron 파서</strong>는 암호 같은 문자열을 읽기 쉬운 설명으로 변환합니다. 이 가이드에서는 <strong>cron 구문</strong>부터 JavaScript, Python, Bash 및 클라우드 플랫폼의 실용적 예제까지 다룹니다.',
    linkTool: '무료 온라인 Cron 표현식 생성기 및 파서 도구를 사용해 보세요.',
    h2_what: 'Cron 표현식이란?',
    whatDesc1: '<strong>Cron 표현식</strong>은 자동화된 작업의 반복 일정을 정의하는 간결한 문자열입니다. 이름은 그리스어 <em>chronos</em>(시간)와 Unix <code>cron</code> 데몬에서 유래했습니다. cron은 작업 스케줄링의 사실상 표준이 되었습니다.',
    whatDesc2: '클래식 Unix <strong>crontab</strong> 형식에서 cron 표현식은 5개 필드로 구성됩니다: <code>분 시 일 월 요일</code>. 각 필드는 숫자, 와일드카드, 범위, 목록, 스텝 값을 받습니다.',
    whatDesc3: '오늘날 cron 표현식은 Kubernetes CronJob, GitHub Actions, AWS EventBridge, Vercel cron에서 사용됩니다. cron 구문 이해는 모든 개발자에게 필수적입니다.',
    h2_syntax: 'Cron 표현식 구문 설명',
    syntaxDesc1: '표준 cron 표현식은 5개 필드를 사용합니다. 각 필드는 시간 단위를 나타냅니다:',
    syntaxFields: '<table><thead><tr><th>필드</th><th>허용값</th><th>특수문자</th><th>설명</th></tr></thead><tbody><tr><td><strong>분</strong></td><td>0-59</td><td><code>* , - /</code></td><td>실행 분</td></tr><tr><td><strong>시</strong></td><td>0-23</td><td><code>* , - /</code></td><td>시간(24시간)</td></tr><tr><td><strong>일</strong></td><td>1-31</td><td><code>* , - / ? L W</code></td><td>월의 날</td></tr><tr><td><strong>월</strong></td><td>1-12</td><td><code>* , - /</code></td><td>연의 월</td></tr><tr><td><strong>요일</strong></td><td>0-7</td><td><code>* , - / ? L #</code></td><td>요일</td></tr></tbody></table>',
    syntaxDesc2: '<strong>특수문자</strong>: <code>*</code>는 모든 값과 매치. 쉼표 <code>,</code>는 목록 구분. 하이픈 <code>-</code>은 범위 정의. 슬래시 <code>/</code>는 스텝 값 정의(예: <code>*/5</code> = 5분마다).',
    syntaxDesc3: '형식: <code>* * * * *</code> (분 시 일 월 요일). 이 5필드 패턴이 cron 스케줄 정의의 핵심입니다.',
    h2_examples: 'Cron 표현식 예제 테이블',
    examplesDesc: '프로덕션 시스템에서 가장 일반적인 cron 표현식 예제입니다:',
    examplesTable: '<table><thead><tr><th>Cron 표현식</th><th>설명</th></tr></thead><tbody><tr><td><code>* * * * *</code></td><td>매분</td></tr><tr><td><code>*/5 * * * *</code></td><td>5분마다</td></tr><tr><td><code>0 * * * *</code></td><td>매시간</td></tr><tr><td><code>0 0 * * *</code></td><td>매일 자정</td></tr><tr><td><code>0 9 * * 1-5</code></td><td>평일 오전 9시</td></tr><tr><td><code>0 0 1 * *</code></td><td>매월 1일 자정</td></tr></tbody></table>',
    h2_code: 'Cron 작업 코드 예제',
    codeJsTitle: 'JavaScript / Node.js Cron 작업',
    codeJsDesc: 'Node.js는 <code>node-cron</code>, <code>cron</code>, <code>croner</code>, <code>Bree</code> 등의 스케줄링 라이브러리를 제공합니다:',
    codePyTitle: 'Python Cron 스케줄링',
    codePyDesc: 'Python은 <code>schedule</code>, <code>APScheduler</code>, <code>python-crontab</code>, <code>Celery Beat</code>를 제공합니다:',
    codeBashTitle: 'Bash / Linux Crontab 명령',
    codeBashDesc: 'Linux/macOS에서 <code>crontab -e</code>로 편집, <code>crontab -l</code>로 목록 확인:',
    codeCloudTitle: '클라우드 & CI/CD Cron 스케줄링',
    codeCloudDesc: 'Cron 표현식은 GitHub Actions, AWS EventBridge, Kubernetes CronJob, Vercel cron에서 사용됩니다:',
    h2_advanced: '고급 Cron 기능',
    advancedDesc1: '많은 구현이 초 필드(6필드 형식)와 연도 필드(7필드 형식)로 구문을 확장합니다. Quartz, node-cron, Spring Framework가 이를 지원합니다.',
    advancedDesc2: '<strong>확장 특수문자</strong>: <code>L</code> = 마지막, <code>W</code> = 가장 가까운 평일, <code>#</code> = N번째 요일 발생.',
    advancedDesc3: '<strong>비표준 약어</strong>: <code>@reboot</code>, <code>@yearly</code>, <code>@monthly</code>, <code>@weekly</code>, <code>@daily</code>, <code>@hourly</code>.',
    h2_debugging: 'Cron 작업 디버깅 및 모니터링',
    debugDesc1: '<strong>시간대 문제</strong>: crontab에서 항상 <code>TZ=UTC</code>를 설정하세요.',
    debugDesc2: '<strong>PATH 문제</strong>: cron 데몬은 최소 환경으로 실행됩니다. 절대 경로를 사용하세요.',
    debugDesc3: '<strong>출력 미캡처</strong>: stdout과 stderr를 항상 로그 파일로 리다이렉트하세요.',
    debugDesc4: '<strong>중복 실행</strong>: <code>flock</code>으로 중복 실행을 방지하세요.',
    h2_bestpractices: 'Cron 작업 모범 사례',
    bestDesc1: '<strong>설명적 주석</strong>: 각 crontab 항목을 문서화하세요.',
    bestDesc2: '<strong>출력 리다이렉트와 로깅</strong>: 전용 로그 파일로 리다이렉트하세요.',
    bestDesc3: '<strong>flock으로 상호 배제</strong>: 중복 실행을 방지하세요.',
    bestDesc4: '<strong>SHELL과 PATH 설정</strong>: 환경을 명시적으로 선언하세요.',
    bestDesc5: '<strong>절대 경로 사용</strong>: 모든 곳에서 절대 경로를 사용하세요.',
    bestDesc6: '<strong>모니터링 서비스 활용</strong>: healthchecks.io나 Cronitor를 사용하세요.',
    bestDesc7: '<strong>시간대 인식</strong>: UTC를 사용하고 문서화하세요.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Cron 표현식의 5개 필드는 무엇을 의미하나요?',
    faq1_a: '5개 필드는: 분(0-59), 시(0-23), 일(1-31), 월(1-12), 요일(0-7)입니다. 각 필드는 값, 와일드카드(*), 범위, 목록, 스텝 값을 받습니다.',
    faq2_q: 'cron과 systemd 타이머의 차이점은?',
    faq2_a: 'cron은 전통적인 Unix 스케줄러입니다. systemd 타이머는 Linux의 현대적 대안으로 이벤트 기반 트리거, 누락된 실행 처리, journalctl 통합을 지원합니다. cron은 클라우드에서 여전히 표준입니다.',
    faq3_q: 'N분마다 cron 작업을 실행하려면?',
    faq3_a: '분 필드에서 스텝 구문 */N을 사용합니다. 예: 5분마다 = "*/5 * * * *", 15분마다 = "*/15 * * * *". 일정한 간격을 위해 스텝 값은 60을 나눌 수 있어야 합니다.',
    conclusion: 'Cron 표현식을 마스터하는 것은 안정적인 시간 기반 자동화가 필요한 모든 개발자에게 필수적입니다. 이 종합 가이드를 북마크하여 참고하세요.',
    linkToolBottom: '무료 온라인 도구로 Cron 표현식을 즉시 생성하고 파싱하세요.',
    relatedPosts: '관련 가이드:',
    relatedPost1: 'Cron 표현식 예제: 일반적인 패턴 및 치트시트',
    relatedPost2: '서버리스에서의 Cron 스케줄링: GitHub Actions, Vercel & Cloudflare',
  },
};

export default function CronExpressionGeneratorParserGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/cron-parser`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is a Cron Expression? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: Cron Expression Syntax */}
      <h2>{s.h2_syntax}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.syntaxDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.syntaxFields }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxDesc3 }} />

      {/* Section 3: Cron Expression Examples Table */}
      <h2>{s.h2_examples}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.examplesDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.examplesTable }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_code}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== node-cron (most popular) =====
// npm install node-cron
const cron = require('node-cron');

// Run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Running task every 5 minutes');
  // Your task logic here
});

// Run weekdays at 9:00 AM
cron.schedule('0 9 * * 1-5', () => {
  console.log('Good morning! Running weekday task.');
}, {
  timezone: 'America/New_York'
});

// Validate a cron expression
console.log(cron.validate('*/5 * * * *')); // true
console.log(cron.validate('60 * * * *'));  // false

// ===== cron npm package =====
// npm install cron
const { CronJob } = require('cron');

const job = new CronJob(
  '0 */6 * * *',   // every 6 hours
  function () {
    console.log('Running every 6 hours');
  },
  null,             // onComplete
  true,             // start immediately
  'America/Chicago' // timezone
);

// ===== croner (modern, zero-dependency) =====
// npm install croner
import { Cron } from 'croner';

// Run every minute
const task = new Cron('* * * * *', () => {
  console.log('Tick every minute');
});

// Run at specific time, get next run
const next = task.nextRun();
console.log('Next execution:', next);

// Stop the job
task.stop();

// ===== Bree (worker-thread scheduler) =====
// npm install bree
const Bree = require('bree');

const bree = new Bree({
  jobs: [
    {
      name: 'backup',
      cron: '0 2 * * *',   // daily at 2 AM
      path: './jobs/backup.js'
    },
    {
      name: 'cleanup',
      cron: '0 0 * * 0',   // weekly on Sunday
      path: './jobs/cleanup.js'
    }
  ]
});

bree.start();`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`# ===== schedule library (human-friendly) =====
# pip install schedule
import schedule
import time

def backup_database():
    print("Backing up database...")

def send_report():
    print("Sending daily report...")

schedule.every(5).minutes.do(backup_database)
schedule.every().day.at("09:00").do(send_report)
schedule.every().monday.at("08:30").do(send_report)

while True:
    schedule.run_pending()
    time.sleep(1)

# ===== APScheduler (enterprise-grade) =====
# pip install apscheduler
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger

scheduler = BlockingScheduler()

# Using cron expression syntax
@scheduler.scheduled_job(CronTrigger.from_crontab('*/10 * * * *'))
def cleanup_temp_files():
    print("Cleaning temp files every 10 minutes")

# Using keyword arguments
@scheduler.scheduled_job('cron', hour=9, minute=0, day_of_week='mon-fri')
def weekday_report():
    print("Weekday report at 9:00 AM")

# First Monday of each month at 3 AM
@scheduler.scheduled_job('cron', day='1-7', day_of_week='mon', hour=3)
def monthly_audit():
    print("Monthly audit")

scheduler.start()

# ===== python-crontab (manage system crontab) =====
# pip install python-crontab
from crontab import CronTab

cron = CronTab(user='myuser')

# Create a new cron job
job = cron.new(
    command='/usr/bin/python3 /opt/app/backup.py >> /var/log/backup.log 2>&1'
)
job.setall('0 2 * * *')  # Daily at 2 AM
job.set_comment('Nightly database backup')
job.enable()

# List all cron jobs
for job in cron:
    print(f"{job.slices} -> {job.command}")

cron.write()  # Save changes

# ===== Celery Beat (distributed scheduling) =====
# pip install celery
# celeryconfig.py
from celery.schedules import crontab

beat_schedule = {
    'cleanup-every-hour': {
        'task': 'tasks.cleanup',
        'schedule': crontab(minute=0, hour='*/1'),
    },
    'weekly-report': {
        'task': 'tasks.send_report',
        'schedule': crontab(hour=9, minute=0, day_of_week=1),
    },
}`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# ===== Essential crontab commands =====

# Edit your user crontab
crontab -e

# List current cron jobs
crontab -l

# Remove all cron jobs (use with caution!)
crontab -r

# Edit another user's crontab (requires root)
sudo crontab -u www-data -e

# ===== Example crontab file =====
# Set environment variables at the top
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin
MAILTO=admin@example.com
TZ=UTC

# m h dom mon dow  command

# Backup database every night at 2 AM
0 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1

# Run cleanup every 15 minutes with flock
*/15 * * * * flock -n /tmp/cleanup.lock /opt/scripts/cleanup.sh

# Send report on weekdays at 9 AM
0 9 * * 1-5 /opt/scripts/daily-report.sh 2>&1 | logger -t daily-report

# Rotate logs on the 1st of each month
0 0 1 * * /usr/sbin/logrotate /etc/logrotate.conf

# Health check every minute (ping monitoring service)
* * * * * curl -fsS --retry 3 https://hc-ping.com/your-uuid > /dev/null

# ===== System crontab (/etc/cron.d/) =====
# /etc/cron.d/myapp (includes username field)
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin

# Note: system crontab includes a user field
*/5 * * * * www-data /opt/myapp/cron/process-queue.sh
0 3 * * * root /opt/myapp/cron/maintenance.sh

# ===== Logging best practices =====

# Log with timestamp
0 * * * * /opt/scripts/job.sh 2>&1 | while read line; do \\
  echo "$(date '+\\%Y-\\%m-\\%d \\%H:\\%M:\\%S') $line"; \\
done >> /var/log/myjob.log

# MAILTO for error notifications
MAILTO=ops-team@example.com
# Only errors are emailed (stdout goes to log, stderr to email)
0 */6 * * * /opt/scripts/etl.sh >> /var/log/etl.log`}</code></pre>

      <h3>{s.codeCloudTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeCloudDesc }} />
      <pre><code>{`# ===== GitHub Actions scheduled workflow =====
# .github/workflows/scheduled.yml
name: Scheduled Tasks
on:
  schedule:
    # Run every day at 6 AM UTC
    - cron: '0 6 * * *'
    # Run every Monday at 9 AM UTC
    - cron: '0 9 * * 1'
  workflow_dispatch: # Allow manual trigger

jobs:
  daily-task:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/daily-task.sh

---
# ===== AWS EventBridge (CloudWatch) cron =====
# Note: AWS cron has 6 fields (includes year)
# Format: minute hour day-of-month month day-of-week year

# Every 5 minutes
aws events put-rule \\
  --name "every-5-min" \\
  --schedule-expression "cron(*/5 * * * ? *)"

# Weekdays at 9 AM UTC
aws events put-rule \\
  --name "weekday-morning" \\
  --schedule-expression "cron(0 9 ? * MON-FRI *)"

# First day of each quarter
aws events put-rule \\
  --name "quarterly" \\
  --schedule-expression "cron(0 0 1 1,4,7,10 ? *)"

---
# ===== Kubernetes CronJob =====
# k8s-cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: database-backup
spec:
  schedule: "0 2 * * *"           # Daily at 2 AM
  timeZone: "America/New_York"    # Available since k8s 1.27
  concurrencyPolicy: Forbid       # Prevent overlapping runs
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: myapp/backup:latest
            command: ["/bin/sh", "-c", "./backup.sh"]
            env:
            - name: DB_HOST
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: host
          restartPolicy: OnFailure

---
# ===== Vercel cron (vercel.json) =====
{
  "crons": [
    {
      "path": "/api/cron/daily-cleanup",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/hourly-sync",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/weekly-report",
      "schedule": "0 9 * * 1"
    }
  ]
}`}</code></pre>

      {/* Section 5: Advanced Cron Features */}
      <h2>{s.h2_advanced}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc3 }} />

      {/* Section 6: Cron Job Debugging & Monitoring */}
      <h2>{s.h2_debugging}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.debugDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.debugDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.debugDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.debugDesc4 }} />

      {/* Section 7: Cron Best Practices */}
      <h2>{s.h2_bestpractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bestDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestDesc4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestDesc5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestDesc6 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestDesc7 }} />

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      {/* Related Posts */}
      <h3>{s.relatedPosts}</h3>
      <ul>
        <li><Link href={`/${lang}/blog/cron-expression-examples`}>{s.relatedPost1}</Link></li>
        <li><Link href={`/${lang}/blog/cron-schedule-serverless-github-actions-vercel-cloudflare`}>{s.relatedPost2}</Link></li>
      </ul>

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/cron-parser`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
