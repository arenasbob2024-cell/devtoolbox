import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Crontab Cheat Sheet 2025: 50+ Cron Expression Examples You\'ll Actually Use',
    intro: 'Whether you are scheduling backups, automating deployments, or running periodic cleanup scripts, <strong>cron</strong> is the backbone of task scheduling on Unix/Linux systems. This cheat sheet gives you <strong>50+ copy-paste cron expression examples</strong> organized by frequency, plus crontab commands, platform differences, and common gotchas.',
    syntaxTitle: '1. Cron Expression Syntax',
    syntaxDesc: 'A standard cron expression consists of <strong>5 fields</strong> separated by spaces. Each field controls when the job runs:',
    fieldMinute: 'Minute (0\u201359)',
    fieldHour: 'Hour (0\u201323)',
    fieldDom: 'Day of Month (1\u201331)',
    fieldMonth: 'Month (1\u201312 or JAN\u2013DEC)',
    fieldDow: 'Day of Week (0\u20137 or SUN\u2013SAT, 0 and 7 = Sunday)',
    syntaxNote: 'The command to execute follows the five fields. Use our <strong>Cron Generator</strong> tool to build expressions visually.',
    specialTitle: '2. Special Characters Explained',
    specialDesc: 'Cron uses four special characters to define schedules beyond fixed values:',
    charStar: 'Matches <strong>every</strong> possible value for the field',
    charComma: 'Specifies a <strong>list</strong> of values (e.g., 1,3,5)',
    charDash: 'Defines an inclusive <strong>range</strong> (e.g., 1\u20135 means 1 through 5)',
    charSlash: 'Defines a <strong>step</strong> interval (e.g., */5 means every 5 units)',
    char: 'Character',
    meaning: 'Meaning',
    example: 'Example',
    exampleDesc: 'Description',
    examplesTitle: '3. 50+ Cron Expression Examples',
    examplesDesc: 'The tables below cover the most commonly needed cron schedules. Each expression is ready to copy and paste into your crontab.',
    catMinutes: 'Every X Minutes',
    catHourly: 'Hourly Schedules',
    catDaily: 'Daily Schedules',
    catWeekly: 'Weekly Schedules',
    catMonthly: 'Monthly Schedules',
    catYearly: 'Yearly / Quarterly Schedules',
    catDevops: 'Business & DevOps Schedules',
    expression: 'Expression',
    description: 'Description',
    nextRun: 'Next Run Example',
    commandsTitle: '4. Crontab Commands Quick Reference',
    commandsDesc: 'The <code>crontab</code> command manages per-user cron job files. Here are the essential commands:',
    command: 'Command',
    whatItDoes: 'What It Does',
    platformTitle: '5. Platform-Specific Cron Syntax',
    platformDesc: 'Cron syntax varies slightly across platforms. Here are the key differences you need to know:',
    platformLinux: 'Linux crontab (standard)',
    platformLinuxDesc: '5 fields: minute hour day month weekday. The original and most common format.',
    platformGithub: 'GitHub Actions',
    platformGithubDesc: 'Standard 5 fields in <code>schedule.cron</code>. Always runs in <strong>UTC</strong>. Minimum interval: 5 minutes.',
    platformAws: 'AWS CloudWatch / EventBridge',
    platformAwsDesc: '<strong>6 fields</strong> (adds year). Uses <code>?</code> for day-of-week or day-of-month. Wrapped in <code>cron()</code>.',
    platformK8s: 'Kubernetes CronJob',
    platformK8sDesc: 'Standard 5 fields in the <code>schedule</code> spec. Timezone support added in K8s 1.27+ via <code>timeZone</code>.',
    platformVercel: 'Vercel Cron',
    platformVercelDesc: 'Standard 5 fields in <code>vercel.json</code>. Runs in UTC. Hobby plan: max 2 cron jobs, 1/day minimum.',
    gotchasTitle: '6. Cron Expression Gotchas',
    gotchasDesc: 'These are the most common mistakes developers make with cron schedules:',
    gotcha1t: 'Timezone Confusion',
    gotcha1: 'Cron runs in the <strong>system timezone</strong> by default. CI/CD platforms (GitHub Actions, Vercel) use <strong>UTC</strong>. Always check which timezone your cron daemon uses.',
    gotcha2t: 'Overlapping Executions',
    gotcha2: 'If a job takes longer than the interval (e.g., a 10-minute job on a 5-minute schedule), you get overlapping runs. Use <code>flock</code> or a PID lock file to prevent this.',
    gotcha3t: 'Daylight Saving Time',
    gotcha3: 'When clocks spring forward, a job scheduled at the skipped hour will <strong>not run</strong>. When clocks fall back, it may run <strong>twice</strong>. Use UTC to avoid this.',
    gotcha4t: 'Day-of-Month AND Day-of-Week',
    gotcha4: 'In standard cron, if both day-of-month and day-of-week are set (not *), the job runs when <strong>EITHER</strong> matches \u2014 not both. This is a common source of confusion.',
    gotcha5t: 'No Seconds Support',
    gotcha5: 'Standard cron does not support seconds. The minimum resolution is 1 minute. For sub-minute scheduling, use a loop with <code>sleep</code> inside a cron job.',
    gotcha6t: 'Environment Variables',
    gotcha6: 'Cron jobs run with a <strong>minimal environment</strong>. Your <code>$PATH</code> may not include expected binaries. Always use full paths in cron commands.',
    testingTitle: '7. Testing and Debugging Cron',
    testingDesc: 'Before deploying a cron job to production, verify that it does what you expect:',
    test1t: 'Use a Cron Expression Parser',
    test1: 'Paste your expression into our <strong>Cron Expression Parser</strong> to see the next 10 run times and a human-readable explanation.',
    test2t: 'Check Cron Logs',
    test2: 'On most Linux systems, cron logs appear in <code>/var/log/syslog</code> or <code>/var/log/cron</code>. Use <code>grep CRON /var/log/syslog</code> to filter.',
    test3t: 'Redirect Output',
    test3: 'Capture stdout and stderr to a log file for debugging. This prevents cron from sending mail for every execution.',
    test4t: 'Test with Shorter Intervals',
    test4: 'Before committing to a monthly schedule, test with <code>* * * * *</code> (every minute) to make sure the script runs correctly, then change to the target schedule.',
    test5t: 'Verify Mail Configuration',
    test5: 'By default, cron emails output to the user. Set <code>MAILTO=""</code> at the top of your crontab to disable email, or set it to a real address for alerts.',
    faqTitle: '8. Frequently Asked Questions',
    faq1q: 'What is the format of a cron expression?',
    faq1a: 'A standard cron expression has 5 fields separated by spaces: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7). For example, "0 9 * * 1-5" means every weekday at 9:00 AM.',
    faq2q: 'What does */5 mean in cron?',
    faq2a: 'The */5 syntax means "every 5 units" for the given field. In the minute field, */5 * * * * runs every 5 minutes (at 0, 5, 10, 15, ... 55). In the hour field, 0 */5 * * * runs every 5 hours at minute 0.',
    faq3q: 'How do I run a cron job every 30 seconds?',
    faq3a: 'Standard cron does not support sub-minute intervals. The workaround is to create two cron entries: one for the top of the minute and one with a 30-second sleep: * * * * * /path/to/script.sh and * * * * * sleep 30 && /path/to/script.sh',
    faq4q: 'What is the difference between cron and crontab?',
    faq4a: 'Cron is the background daemon (service) that executes scheduled tasks. Crontab (cron table) is the file that lists the scheduled jobs and their timing. You use the "crontab" command to edit, list, or remove your personal cron table.',
    faq5q: 'Can I use cron on Windows?',
    faq5a: 'Native Windows does not have cron. The equivalent is Task Scheduler (schtasks.exe). However, if you use WSL (Windows Subsystem for Linux), you can use cron normally. Docker containers on Windows also support cron.',
    toolCta: 'Build and test your cron expressions interactively:',
  },
  zh: {
    title: 'Crontab 速查表 2025：50+ 个你真正会用到的 Cron 表达式示例',
    intro: '无论你是在调度备份、自动化部署还是运行定期清理脚本，<strong>cron</strong> 都是 Unix/Linux 系统上任务调度的核心。本速查表提供 <strong>50+ 个可直接复制粘贴的 cron 表达式示例</strong>，按频率分类，并包含 crontab 命令、平台差异和常见陷阱。',
    syntaxTitle: '1. Cron 表达式语法',
    syntaxDesc: '标准 cron 表达式由空格分隔的 <strong>5 个字段</strong>组成，每个字段控制任务何时运行：',
    fieldMinute: '分钟 (0\u201359)',
    fieldHour: '小时 (0\u201323)',
    fieldDom: '日 (1\u201331)',
    fieldMonth: '月 (1\u201312 或 JAN\u2013DEC)',
    fieldDow: '星期 (0\u20137 或 SUN\u2013SAT，0 和 7 = 周日)',
    syntaxNote: '命令跟在五个字段之后。使用我们的 <strong>Cron 生成器</strong>工具可视化构建表达式。',
    specialTitle: '2. 特殊字符说明',
    specialDesc: 'Cron 使用四个特殊字符来定义超出固定值的调度：',
    charStar: '匹配该字段的<strong>每个</strong>可能值',
    charComma: '指定值<strong>列表</strong>（如 1,3,5）',
    charDash: '定义<strong>范围</strong>（如 1\u20135 表示 1 到 5）',
    charSlash: '定义<strong>步长</strong>间隔（如 */5 表示每 5 个单位）',
    char: '字符',
    meaning: '含义',
    example: '示例',
    exampleDesc: '说明',
    examplesTitle: '3. 50+ 个 Cron 表达式示例',
    examplesDesc: '以下表格涵盖最常用的 cron 调度。每个表达式都可以直接复制粘贴到你的 crontab 中。',
    catMinutes: '每 X 分钟',
    catHourly: '每小时调度',
    catDaily: '每天调度',
    catWeekly: '每周调度',
    catMonthly: '每月调度',
    catYearly: '每年/每季度调度',
    catDevops: '业务与 DevOps 调度',
    expression: '表达式',
    description: '说明',
    nextRun: '下次运行示例',
    commandsTitle: '4. Crontab 命令速查',
    commandsDesc: '<code>crontab</code> 命令用于管理用户级 cron 任务文件。以下是核心命令：',
    command: '命令',
    whatItDoes: '作用',
    platformTitle: '5. 各平台 Cron 语法差异',
    platformDesc: 'Cron 语法在不同平台略有差异，以下是你需要了解的关键区别：',
    platformLinux: 'Linux crontab（标准）',
    platformLinuxDesc: '5 个字段：分钟 小时 日 月 星期。最原始和最常见的格式。',
    platformGithub: 'GitHub Actions',
    platformGithubDesc: '在 <code>schedule.cron</code> 中使用标准 5 字段。始终以 <strong>UTC</strong> 运行。最小间隔：5 分钟。',
    platformAws: 'AWS CloudWatch / EventBridge',
    platformAwsDesc: '<strong>6 个字段</strong>（增加年份）。使用 <code>?</code> 替代日或星期。包裹在 <code>cron()</code> 中。',
    platformK8s: 'Kubernetes CronJob',
    platformK8sDesc: '在 <code>schedule</code> 规范中使用标准 5 字段。K8s 1.27+ 通过 <code>timeZone</code> 支持时区。',
    platformVercel: 'Vercel Cron',
    platformVercelDesc: '在 <code>vercel.json</code> 中使用标准 5 字段。以 UTC 运行。免费计划：最多 2 个 cron 任务，每天最少 1 次。',
    gotchasTitle: '6. Cron 表达式常见陷阱',
    gotchasDesc: '以下是开发者在使用 cron 调度时最常犯的错误：',
    gotcha1t: '时区混淆',
    gotcha1: 'Cron 默认在<strong>系统时区</strong>运行。CI/CD 平台（GitHub Actions、Vercel）使用 <strong>UTC</strong>。务必确认你的 cron 守护进程使用哪个时区。',
    gotcha2t: '执行重叠',
    gotcha2: '如果任务耗时超过间隔（如 5 分钟调度中的 10 分钟任务），会产生重叠运行。使用 <code>flock</code> 或 PID 锁文件防止此问题。',
    gotcha3t: '夏令时',
    gotcha3: '当时钟向前拨时，在跳过的小时调度的任务将<strong>不会运行</strong>。当时钟向后拨时，任务可能<strong>运行两次</strong>。使用 UTC 可避免此问题。',
    gotcha4t: '同时指定日和星期',
    gotcha4: '在标准 cron 中，如果日和星期都被设置（非 *），任务在<strong>任一</strong>匹配时运行 \u2014 不是两者都满足。这是常见的混淆来源。',
    gotcha5t: '不支持秒',
    gotcha5: '标准 cron 不支持秒级调度。最小分辨率是 1 分钟。要实现亚分钟调度，可在 cron 任务中使用带 <code>sleep</code> 的循环。',
    gotcha6t: '环境变量',
    gotcha6: 'Cron 任务以<strong>最小环境</strong>运行。你的 <code>$PATH</code> 可能不包含预期的程序。在 cron 命令中始终使用完整路径。',
    testingTitle: '7. 测试与调试 Cron',
    testingDesc: '在将 cron 任务部署到生产环境之前，验证它是否按预期工作：',
    test1t: '使用 Cron 表达式解析器',
    test1: '将你的表达式粘贴到我们的<strong> Cron 表达式解析器</strong>中，查看接下来 10 次运行时间和人类可读的解释。',
    test2t: '检查 Cron 日志',
    test2: '在大多数 Linux 系统上，cron 日志在 <code>/var/log/syslog</code> 或 <code>/var/log/cron</code> 中。使用 <code>grep CRON /var/log/syslog</code> 过滤。',
    test3t: '重定向输出',
    test3: '将 stdout 和 stderr 捕获到日志文件中以便调试。这可以防止 cron 为每次执行发送邮件。',
    test4t: '使用更短的间隔测试',
    test4: '在提交月度调度之前，先用 <code>* * * * *</code>（每分钟）测试以确保脚本正确运行，然后再更改为目标调度。',
    test5t: '验证邮件配置',
    test5: '默认情况下，cron 将输出通过邮件发送给用户。在 crontab 顶部设置 <code>MAILTO=""</code> 来禁用邮件，或设置为真实地址接收告警。',
    faqTitle: '8. 常见问题',
    faq1q: 'Cron 表达式的格式是什么？',
    faq1a: '标准 cron 表达式有 5 个空格分隔的字段：分钟 (0-59)、小时 (0-23)、日 (1-31)、月 (1-12) 和星期 (0-7)。例如 "0 9 * * 1-5" 表示每个工作日上午 9:00。',
    faq2q: '*/5 在 cron 中是什么意思？',
    faq2a: '*/5 语法表示该字段"每 5 个单位"。在分钟字段中，*/5 * * * * 每 5 分钟运行一次（在 0、5、10、15...55 分钟时）。在小时字段中，0 */5 * * * 每 5 小时在第 0 分钟运行。',
    faq3q: '如何每 30 秒运行一次 cron 任务？',
    faq3a: '标准 cron 不支持亚分钟间隔。解决方法是创建两个 cron 条目：一个在整分钟运行，另一个加 30 秒延迟：* * * * * /path/to/script.sh 和 * * * * * sleep 30 && /path/to/script.sh',
    faq4q: 'cron 和 crontab 有什么区别？',
    faq4a: 'Cron 是执行定时任务的后台守护进程（服务）。Crontab（cron 表）是列出定时任务及其时间安排的文件。你使用 "crontab" 命令来编辑、列出或删除个人的 cron 表。',
    faq5q: '可以在 Windows 上使用 cron 吗？',
    faq5a: '原生 Windows 没有 cron。等效工具是任务计划程序 (schtasks.exe)。但如果你使用 WSL（Windows Linux 子系统），可以正常使用 cron。Windows 上的 Docker 容器也支持 cron。',
    toolCta: '交互式构建和测试你的 cron 表达式：',
  },
  fr: {
    title: 'Crontab Cheat Sheet 2025 : 50+ Exemples d\'Expressions Cron Pratiques',
    intro: 'Que vous planifiiez des sauvegardes, automatisiez des d\u00e9ploiements ou ex\u00e9cutiez des scripts de nettoyage, <strong>cron</strong> est le pilier de la planification sur Unix/Linux. Ce cheat sheet vous donne <strong>50+ exemples d\'expressions cron</strong> class\u00e9s par fr\u00e9quence.',
    syntaxTitle: '1. Syntaxe des Expressions Cron',
    syntaxDesc: 'Une expression cron standard se compose de <strong>5 champs</strong> s\u00e9par\u00e9s par des espaces :',
    fieldMinute: 'Minute (0\u201359)',
    fieldHour: 'Heure (0\u201323)',
    fieldDom: 'Jour du mois (1\u201331)',
    fieldMonth: 'Mois (1\u201312 ou JAN\u2013DEC)',
    fieldDow: 'Jour de la semaine (0\u20137 ou SUN\u2013SAT)',
    syntaxNote: 'La commande suit les cinq champs. Utilisez notre <strong>G\u00e9n\u00e9rateur Cron</strong> pour construire des expressions visuellement.',
    specialTitle: '2. Caract\u00e8res Sp\u00e9ciaux',
    specialDesc: 'Cron utilise quatre caract\u00e8res sp\u00e9ciaux pour d\u00e9finir les planifications :',
    charStar: 'Correspond \u00e0 <strong>chaque</strong> valeur possible',
    charComma: 'Sp\u00e9cifie une <strong>liste</strong> de valeurs',
    charDash: 'D\u00e9finit une <strong>plage</strong> inclusive',
    charSlash: 'D\u00e9finit un <strong>intervalle</strong> de pas',
    char: 'Caract\u00e8re',
    meaning: 'Signification',
    example: 'Exemple',
    exampleDesc: 'Description',
    examplesTitle: '3. 50+ Exemples d\'Expressions Cron',
    examplesDesc: 'Les tableaux ci-dessous couvrent les planifications cron les plus courantes. Chaque expression est pr\u00eate \u00e0 copier-coller.',
    catMinutes: 'Toutes les X minutes',
    catHourly: 'Planifications horaires',
    catDaily: 'Planifications quotidiennes',
    catWeekly: 'Planifications hebdomadaires',
    catMonthly: 'Planifications mensuelles',
    catYearly: 'Planifications annuelles / trimestrielles',
    catDevops: 'Planifications Business & DevOps',
    expression: 'Expression',
    description: 'Description',
    nextRun: 'Prochaine ex\u00e9cution',
    commandsTitle: '4. Commandes Crontab',
    commandsDesc: 'La commande <code>crontab</code> g\u00e8re les fichiers cron par utilisateur :',
    command: 'Commande',
    whatItDoes: 'Action',
    platformTitle: '5. Syntaxe Cron par Plateforme',
    platformDesc: 'La syntaxe cron varie selon les plateformes :',
    platformLinux: 'Linux crontab (standard)', platformLinuxDesc: '5 champs. Le format le plus courant.',
    platformGithub: 'GitHub Actions', platformGithubDesc: '5 champs standard dans <code>schedule.cron</code>. Toujours en <strong>UTC</strong>.',
    platformAws: 'AWS CloudWatch / EventBridge', platformAwsDesc: '<strong>6 champs</strong> (ajout de l\'ann\u00e9e). Utilise <code>?</code>.',
    platformK8s: 'Kubernetes CronJob', platformK8sDesc: '5 champs standard. Support timezone depuis K8s 1.27+.',
    platformVercel: 'Vercel Cron', platformVercelDesc: '5 champs dans <code>vercel.json</code>. UTC.',
    gotchasTitle: '6. Pi\u00e8ges Courants',
    gotchasDesc: 'Les erreurs les plus courantes avec les planifications cron :',
    gotcha1t: 'Confusion de fuseau horaire', gotcha1: 'Cron utilise le <strong>fuseau syst\u00e8me</strong> par d\u00e9faut. Les plateformes CI/CD utilisent <strong>UTC</strong>.',
    gotcha2t: 'Ex\u00e9cutions chevauche\u00e9es', gotcha2: 'Utilisez <code>flock</code> ou un fichier de verrouillage PID.',
    gotcha3t: 'Heure d\'\u00e9t\u00e9', gotcha3: 'Utilisez UTC pour \u00e9viter les probl\u00e8mes de changement d\'heure.',
    gotcha4t: 'Jour du mois ET jour de la semaine', gotcha4: 'En cron standard, si les deux sont d\u00e9finis, le job s\'ex\u00e9cute quand <strong>l\'un ou l\'autre</strong> correspond.',
    gotcha5t: 'Pas de support des secondes', gotcha5: 'La r\u00e9solution minimale est 1 minute. Pour du sub-minute, utilisez <code>sleep</code>.',
    gotcha6t: 'Variables d\'environnement', gotcha6: 'Les jobs cron s\'ex\u00e9cutent avec un <strong>environnement minimal</strong>. Utilisez des chemins complets.',
    testingTitle: '7. Test et D\u00e9bogage',
    testingDesc: 'Avant de d\u00e9ployer un job cron en production :',
    test1t: 'Parseur d\'expressions', test1: 'Utilisez notre <strong>Parseur d\'Expressions Cron</strong> pour voir les prochaines ex\u00e9cutions.',
    test2t: 'Logs cron', test2: 'V\u00e9rifiez <code>/var/log/syslog</code> ou <code>/var/log/cron</code>.',
    test3t: 'Rediriger la sortie', test3: 'Capturez stdout et stderr dans un fichier log.',
    test4t: 'Tester avec des intervalles courts', test4: 'Testez d\'abord avec <code>* * * * *</code>.',
    test5t: 'Configuration mail', test5: 'D\u00e9finissez <code>MAILTO=""</code> pour d\u00e9sactiver les emails.',
    faqTitle: '8. Questions Fr\u00e9quentes',
    faq1q: 'Quel est le format d\'une expression cron ?', faq1a: 'Une expression cron standard a 5 champs : minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12) et jour de la semaine (0-7). Par exemple "0 9 * * 1-5" signifie chaque jour ouvr\u00e9 \u00e0 9h.',
    faq2q: 'Que signifie */5 en cron ?', faq2a: '*/5 signifie "toutes les 5 unit\u00e9s". Dans le champ minute, */5 * * * * s\'ex\u00e9cute toutes les 5 minutes.',
    faq3q: 'Comment ex\u00e9cuter un job cron toutes les 30 secondes ?', faq3a: 'Cron standard ne supporte pas les intervalles sub-minute. Cr\u00e9ez deux entr\u00e9es : une normale et une avec sleep 30.',
    faq4q: 'Quelle diff\u00e9rence entre cron et crontab ?', faq4a: 'Cron est le d\u00e9mon qui ex\u00e9cute les t\u00e2ches. Crontab est le fichier listant les jobs et leurs horaires.',
    faq5q: 'Peut-on utiliser cron sur Windows ?', faq5a: 'Windows natif n\'a pas cron. L\'\u00e9quivalent est le Planificateur de t\u00e2ches. Avec WSL, vous pouvez utiliser cron normalement.',
    toolCta: 'Construisez et testez vos expressions cron :',
  },
  de: {
    title: 'Crontab Cheat Sheet 2025: 50+ Cron-Ausdruck-Beispiele f\u00fcr die Praxis',
    intro: 'Ob Backups, Deployments oder Bereinigungsskripte \u2014 <strong>cron</strong> ist das R\u00fcckgrat der Aufgabenplanung auf Unix/Linux. Dieses Cheat Sheet bietet <strong>50+ kopierbare Cron-Ausdruck-Beispiele</strong> nach H\u00e4ufigkeit sortiert.',
    syntaxTitle: '1. Cron-Ausdruck-Syntax',
    syntaxDesc: 'Ein Standard-Cron-Ausdruck besteht aus <strong>5 Feldern</strong>:',
    fieldMinute: 'Minute (0\u201359)', fieldHour: 'Stunde (0\u201323)', fieldDom: 'Tag des Monats (1\u201331)', fieldMonth: 'Monat (1\u201312)', fieldDow: 'Wochentag (0\u20137)',
    syntaxNote: 'Der Befehl folgt den f\u00fcnf Feldern. Nutzen Sie unseren <strong>Cron-Generator</strong>.',
    specialTitle: '2. Sonderzeichen', specialDesc: 'Cron verwendet vier Sonderzeichen:',
    charStar: 'Entspricht <strong>jedem</strong> m\u00f6glichen Wert', charComma: 'Gibt eine <strong>Liste</strong> an', charDash: 'Definiert einen <strong>Bereich</strong>', charSlash: 'Definiert ein <strong>Schrittintervall</strong>',
    char: 'Zeichen', meaning: 'Bedeutung', example: 'Beispiel', exampleDesc: 'Beschreibung',
    examplesTitle: '3. 50+ Cron-Ausdruck-Beispiele', examplesDesc: 'Die folgenden Tabellen decken die h\u00e4ufigsten Cron-Zeitpl\u00e4ne ab.',
    catMinutes: 'Alle X Minuten', catHourly: 'St\u00fcndliche Zeitpl\u00e4ne', catDaily: 'T\u00e4gliche Zeitpl\u00e4ne', catWeekly: 'W\u00f6chentliche Zeitpl\u00e4ne', catMonthly: 'Monatliche Zeitpl\u00e4ne', catYearly: 'J\u00e4hrliche / Quartalszeitpl\u00e4ne', catDevops: 'Business & DevOps',
    expression: 'Ausdruck', description: 'Beschreibung', nextRun: 'N\u00e4chste Ausf\u00fchrung',
    commandsTitle: '4. Crontab-Befehle', commandsDesc: 'Der <code>crontab</code>-Befehl verwaltet Cron-Dateien:',
    command: 'Befehl', whatItDoes: 'Funktion',
    platformTitle: '5. Plattformspezifische Syntax', platformDesc: 'Die Cron-Syntax variiert je nach Plattform:',
    platformLinux: 'Linux crontab', platformLinuxDesc: '5 Felder. Das Standard-Format.',
    platformGithub: 'GitHub Actions', platformGithubDesc: '5 Felder in <code>schedule.cron</code>. Immer <strong>UTC</strong>.',
    platformAws: 'AWS CloudWatch', platformAwsDesc: '<strong>6 Felder</strong>. Verwendet <code>?</code>.',
    platformK8s: 'Kubernetes CronJob', platformK8sDesc: '5 Standard-Felder. Timezone ab K8s 1.27+.',
    platformVercel: 'Vercel Cron', platformVercelDesc: '5 Felder in <code>vercel.json</code>. UTC.',
    gotchasTitle: '6. H\u00e4ufige Fallstricke', gotchasDesc: 'Die h\u00e4ufigsten Fehler bei Cron:',
    gotcha1t: 'Zeitzone', gotcha1: 'Cron nutzt die <strong>Systemzeitzone</strong>. CI/CD-Plattformen nutzen <strong>UTC</strong>.',
    gotcha2t: '\u00dcberlappende Ausf\u00fchrungen', gotcha2: 'Nutzen Sie <code>flock</code> oder eine Lock-Datei.',
    gotcha3t: 'Sommerzeit', gotcha3: 'Nutzen Sie UTC um Probleme zu vermeiden.',
    gotcha4t: 'Tag UND Wochentag', gotcha4: 'Wenn beide gesetzt sind, l\u00e4uft der Job bei <strong>einem von beiden</strong>.',
    gotcha5t: 'Keine Sekunden', gotcha5: 'Mindestaufl\u00f6sung: 1 Minute. F\u00fcr Sub-Minute nutzen Sie <code>sleep</code>.',
    gotcha6t: 'Umgebungsvariablen', gotcha6: 'Cron-Jobs laufen mit <strong>minimaler Umgebung</strong>. Verwenden Sie vollst\u00e4ndige Pfade.',
    testingTitle: '7. Testen und Debuggen', testingDesc: 'Vor dem Produktiv-Deployment:',
    test1t: 'Cron-Parser', test1: 'Nutzen Sie unseren <strong>Cron-Ausdruck-Parser</strong>.',
    test2t: 'Cron-Logs', test2: 'Pr\u00fcfen Sie <code>/var/log/syslog</code> oder <code>/var/log/cron</code>.',
    test3t: 'Ausgabe umleiten', test3: 'Erfassen Sie stdout/stderr in einer Logdatei.',
    test4t: 'Mit kurzen Intervallen testen', test4: 'Testen Sie zuerst mit <code>* * * * *</code>.',
    test5t: 'Mail-Konfiguration', test5: 'Setzen Sie <code>MAILTO=""</code> zum Deaktivieren.',
    faqTitle: '8. H\u00e4ufig gestellte Fragen',
    faq1q: 'Was ist das Format eines Cron-Ausdrucks?', faq1a: 'Ein Standard-Cron-Ausdruck hat 5 Felder: Minute (0-59), Stunde (0-23), Tag (1-31), Monat (1-12) und Wochentag (0-7).',
    faq2q: 'Was bedeutet */5 in Cron?', faq2a: '*/5 bedeutet "alle 5 Einheiten". Im Minutenfeld l\u00e4uft */5 * * * * alle 5 Minuten.',
    faq3q: 'Wie f\u00fchre ich einen Cron-Job alle 30 Sekunden aus?', faq3a: 'Standard-Cron unterst\u00fctzt keine Sub-Minuten-Intervalle. Erstellen Sie zwei Eintr\u00e4ge mit sleep 30.',
    faq4q: 'Was ist der Unterschied zwischen cron und crontab?', faq4a: 'Cron ist der Daemon. Crontab ist die Datei mit den geplanten Jobs.',
    faq5q: 'Kann ich cron unter Windows verwenden?', faq5a: 'Natives Windows hat kein cron. Die Alternative ist der Aufgabenplaner. Mit WSL k\u00f6nnen Sie cron normal nutzen.',
    toolCta: 'Erstellen und testen Sie Ihre Cron-Ausdr\u00fccke:',
  },
  es: {
    title: 'Crontab Cheat Sheet 2025: 50+ Ejemplos de Expresiones Cron que Realmente Usar\u00e1s',
    intro: 'Ya sea que programes respaldos, automatices despliegues o ejecutes scripts de limpieza, <strong>cron</strong> es la base de la programaci\u00f3n de tareas en Unix/Linux. Esta hoja de referencia te da <strong>50+ ejemplos de expresiones cron</strong> listos para copiar y pegar.',
    syntaxTitle: '1. Sintaxis de Expresiones Cron',
    syntaxDesc: 'Una expresi\u00f3n cron est\u00e1ndar tiene <strong>5 campos</strong> separados por espacios:',
    fieldMinute: 'Minuto (0\u201359)', fieldHour: 'Hora (0\u201323)', fieldDom: 'D\u00eda del mes (1\u201331)', fieldMonth: 'Mes (1\u201312)', fieldDow: 'D\u00eda de la semana (0\u20137)',
    syntaxNote: 'El comando sigue a los cinco campos. Usa nuestro <strong>Generador Cron</strong> para construir expresiones visualmente.',
    specialTitle: '2. Caracteres Especiales', specialDesc: 'Cron usa cuatro caracteres especiales:',
    charStar: 'Coincide con <strong>cada</strong> valor posible', charComma: 'Especifica una <strong>lista</strong> de valores', charDash: 'Define un <strong>rango</strong> inclusivo', charSlash: 'Define un intervalo de <strong>paso</strong>',
    char: 'Car\u00e1cter', meaning: 'Significado', example: 'Ejemplo', exampleDesc: 'Descripci\u00f3n',
    examplesTitle: '3. 50+ Ejemplos de Expresiones Cron', examplesDesc: 'Las tablas cubren las programaciones cron m\u00e1s comunes.',
    catMinutes: 'Cada X minutos', catHourly: 'Cada hora', catDaily: 'Diarios', catWeekly: 'Semanales', catMonthly: 'Mensuales', catYearly: 'Anuales / Trimestrales', catDevops: 'Business & DevOps',
    expression: 'Expresi\u00f3n', description: 'Descripci\u00f3n', nextRun: 'Pr\u00f3xima ejecuci\u00f3n',
    commandsTitle: '4. Comandos Crontab', commandsDesc: 'El comando <code>crontab</code> gestiona archivos cron por usuario:',
    command: 'Comando', whatItDoes: 'Acci\u00f3n',
    platformTitle: '5. Sintaxis por Plataforma', platformDesc: 'La sintaxis cron var\u00eda seg\u00fan la plataforma:',
    platformLinux: 'Linux crontab', platformLinuxDesc: '5 campos est\u00e1ndar.',
    platformGithub: 'GitHub Actions', platformGithubDesc: '5 campos en <code>schedule.cron</code>. Siempre <strong>UTC</strong>.',
    platformAws: 'AWS CloudWatch', platformAwsDesc: '<strong>6 campos</strong>. Usa <code>?</code>.',
    platformK8s: 'Kubernetes CronJob', platformK8sDesc: '5 campos est\u00e1ndar. Timezone desde K8s 1.27+.',
    platformVercel: 'Vercel Cron', platformVercelDesc: '5 campos en <code>vercel.json</code>. UTC.',
    gotchasTitle: '6. Errores Comunes', gotchasDesc: 'Los errores m\u00e1s frecuentes con cron:',
    gotcha1t: 'Zona horaria', gotcha1: 'Cron usa la <strong>zona del sistema</strong>. Plataformas CI/CD usan <strong>UTC</strong>.',
    gotcha2t: 'Ejecuciones superpuestas', gotcha2: 'Usa <code>flock</code> o un archivo de bloqueo.',
    gotcha3t: 'Horario de verano', gotcha3: 'Usa UTC para evitar problemas.',
    gotcha4t: 'D\u00eda del mes Y d\u00eda de la semana', gotcha4: 'Si ambos est\u00e1n definidos, el job se ejecuta cuando <strong>cualquiera</strong> coincida.',
    gotcha5t: 'Sin soporte de segundos', gotcha5: 'Resoluci\u00f3n m\u00ednima: 1 minuto. Para sub-minuto usa <code>sleep</code>.',
    gotcha6t: 'Variables de entorno', gotcha6: 'Los jobs cron se ejecutan con <strong>entorno m\u00ednimo</strong>. Usa rutas completas.',
    testingTitle: '7. Pruebas y Depuraci\u00f3n', testingDesc: 'Antes de desplegar a producci\u00f3n:',
    test1t: 'Parser de expresiones', test1: 'Usa nuestro <strong>Parser de Expresiones Cron</strong>.',
    test2t: 'Logs de cron', test2: 'Revisa <code>/var/log/syslog</code> o <code>/var/log/cron</code>.',
    test3t: 'Redirigir salida', test3: 'Captura stdout/stderr en un archivo log.',
    test4t: 'Probar con intervalos cortos', test4: 'Prueba primero con <code>* * * * *</code>.',
    test5t: 'Configuraci\u00f3n de correo', test5: 'Define <code>MAILTO=""</code> para desactivar emails.',
    faqTitle: '8. Preguntas Frecuentes',
    faq1q: '\u00bfCu\u00e1l es el formato de una expresi\u00f3n cron?', faq1a: 'Una expresi\u00f3n cron tiene 5 campos: minuto (0-59), hora (0-23), d\u00eda (1-31), mes (1-12) y d\u00eda de la semana (0-7).',
    faq2q: '\u00bfQu\u00e9 significa */5 en cron?', faq2a: '*/5 significa "cada 5 unidades". En el campo de minutos, se ejecuta cada 5 minutos.',
    faq3q: '\u00bfC\u00f3mo ejecutar un cron cada 30 segundos?', faq3a: 'Cron no soporta intervalos sub-minuto. Crea dos entradas, una con sleep 30.',
    faq4q: '\u00bfCu\u00e1l es la diferencia entre cron y crontab?', faq4a: 'Cron es el daemon. Crontab es el archivo con los jobs programados.',
    faq5q: '\u00bfSe puede usar cron en Windows?', faq5a: 'Windows nativo no tiene cron. La alternativa es el Programador de tareas. Con WSL puedes usar cron normalmente.',
    toolCta: 'Construye y prueba tus expresiones cron:',
  },
  ja: {
    title: 'Crontab\u30c1\u30fc\u30c8\u30b7\u30fc\u30c8 2025\uff1a\u5b9f\u969b\u306b\u4f7f\u308650\u4ee5\u4e0a\u306eCron\u5f0f\u4f8b',
    intro: '\u30d0\u30c3\u30af\u30a2\u30c3\u30d7\u306e\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u3001\u30c7\u30d7\u30ed\u30a4\u306e\u81ea\u52d5\u5316\u3001\u5b9a\u671f\u30af\u30ea\u30fc\u30f3\u30a2\u30c3\u30d7\u30b9\u30af\u30ea\u30d7\u30c8\u306e\u5b9f\u884c\u306a\u3069\u3001<strong>cron</strong>\u306fUnix/Linux\u30b7\u30b9\u30c6\u30e0\u306e\u30bf\u30b9\u30af\u30b9\u30b1\u30b8\u30e5\u30fc\u30ea\u30f3\u30b0\u306e\u57fa\u76e4\u3067\u3059\u3002\u3053\u306e\u30c1\u30fc\u30c8\u30b7\u30fc\u30c8\u3067\u306f<strong>50\u4ee5\u4e0a\u306e\u30b3\u30d4\u30da\u53ef\u80fd\u306acron\u5f0f\u4f8b</strong>\u3092\u983b\u5ea6\u5225\u306b\u63d0\u4f9b\u3057\u307e\u3059\u3002',
    syntaxTitle: '1. Cron\u5f0f\u306e\u69cb\u6587',
    syntaxDesc: '\u6a19\u6e96\u7684\u306acron\u5f0f\u306f\u30b9\u30da\u30fc\u30b9\u3067\u533a\u5207\u3089\u308c\u305f<strong>5\u3064\u306e\u30d5\u30a3\u30fc\u30eb\u30c9</strong>\u3067\u69cb\u6210\u3055\u308c\u307e\u3059\uff1a',
    fieldMinute: '\u5206 (0\u201359)', fieldHour: '\u6642 (0\u201323)', fieldDom: '\u65e5 (1\u201331)', fieldMonth: '\u6708 (1\u201312)', fieldDow: '\u66dc\u65e5 (0\u20137)',
    syntaxNote: '\u30b3\u30de\u30f3\u30c9\u306f5\u3064\u306e\u30d5\u30a3\u30fc\u30eb\u30c9\u306e\u5f8c\u306b\u7d9a\u304d\u307e\u3059\u3002<strong>Cron\u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc</strong>\u30c4\u30fc\u30eb\u3067\u8996\u899a\u7684\u306b\u69cb\u7bc9\u3067\u304d\u307e\u3059\u3002',
    specialTitle: '2. \u7279\u6b8a\u6587\u5b57', specialDesc: 'Cron\u306f4\u3064\u306e\u7279\u6b8a\u6587\u5b57\u3092\u4f7f\u7528\u3057\u307e\u3059\uff1a',
    charStar: '\u305d\u306e\u30d5\u30a3\u30fc\u30eb\u30c9\u306e<strong>\u3059\u3079\u3066</strong>\u306e\u5024\u306b\u4e00\u81f4', charComma: '\u5024\u306e<strong>\u30ea\u30b9\u30c8</strong>\u3092\u6307\u5b9a', charDash: '<strong>\u7bc4\u56f2</strong>\u3092\u5b9a\u7fa9', charSlash: '<strong>\u30b9\u30c6\u30c3\u30d7</strong>\u9593\u9694\u3092\u5b9a\u7fa9',
    char: '\u6587\u5b57', meaning: '\u610f\u5473', example: '\u4f8b', exampleDesc: '\u8aac\u660e',
    examplesTitle: '3. 50\u4ee5\u4e0a\u306eCron\u5f0f\u4f8b', examplesDesc: '\u4ee5\u4e0b\u306e\u8868\u306f\u6700\u3082\u3088\u304f\u4f7f\u308f\u308c\u308bcron\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u3092\u7db2\u7f85\u3057\u3066\u3044\u307e\u3059\u3002',
    catMinutes: 'X\u5206\u3054\u3068', catHourly: '\u6bce\u6642', catDaily: '\u6bce\u65e5', catWeekly: '\u6bce\u9031', catMonthly: '\u6bce\u6708', catYearly: '\u6bce\u5e74/\u56db\u534a\u671f', catDevops: '\u30d3\u30b8\u30cd\u30b9 & DevOps',
    expression: '\u5f0f', description: '\u8aac\u660e', nextRun: '\u6b21\u306e\u5b9f\u884c\u4f8b',
    commandsTitle: '4. Crontab\u30b3\u30de\u30f3\u30c9', commandsDesc: '<code>crontab</code>\u30b3\u30de\u30f3\u30c9\u3067\u30e6\u30fc\u30b6\u30fc\u5225\u306ecron\u30d5\u30a1\u30a4\u30eb\u3092\u7ba1\u7406\u3057\u307e\u3059\uff1a',
    command: '\u30b3\u30de\u30f3\u30c9', whatItDoes: '\u6a5f\u80fd',
    platformTitle: '5. \u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u5225\u306e\u69cb\u6587', platformDesc: 'Cron\u306e\u69cb\u6587\u306f\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u306b\u3088\u3063\u3066\u7570\u306a\u308a\u307e\u3059\uff1a',
    platformLinux: 'Linux crontab', platformLinuxDesc: '5\u30d5\u30a3\u30fc\u30eb\u30c9\u3002\u6a19\u6e96\u5f62\u5f0f\u3002',
    platformGithub: 'GitHub Actions', platformGithubDesc: '<code>schedule.cron</code>\u30675\u30d5\u30a3\u30fc\u30eb\u30c9\u3002\u5e38\u306b<strong>UTC</strong>\u3002',
    platformAws: 'AWS CloudWatch', platformAwsDesc: '<strong>6\u30d5\u30a3\u30fc\u30eb\u30c9</strong>\u3002<code>?</code>\u3092\u4f7f\u7528\u3002',
    platformK8s: 'Kubernetes CronJob', platformK8sDesc: '5\u30d5\u30a3\u30fc\u30eb\u30c9\u3002K8s 1.27+\u3067timezone\u5bfe\u5fdc\u3002',
    platformVercel: 'Vercel Cron', platformVercelDesc: '<code>vercel.json</code>\u30675\u30d5\u30a3\u30fc\u30eb\u30c9\u3002UTC\u3002',
    gotchasTitle: '6. \u3088\u304f\u3042\u308b\u843d\u3068\u3057\u7a74', gotchasDesc: 'Cron\u3067\u6700\u3082\u3088\u304f\u3042\u308b\u9593\u9055\u3044\uff1a',
    gotcha1t: '\u30bf\u30a4\u30e0\u30be\u30fc\u30f3', gotcha1: 'Cron\u306f\u30c7\u30d5\u30a9\u30eb\u30c8\u3067<strong>\u30b7\u30b9\u30c6\u30e0\u30bf\u30a4\u30e0\u30be\u30fc\u30f3</strong>\u3002CI/CD\u306f<strong>UTC</strong>\u3002',
    gotcha2t: '\u5b9f\u884c\u306e\u91cd\u8907', gotcha2: '<code>flock</code>\u307e\u305f\u306f\u30ed\u30c3\u30af\u30d5\u30a1\u30a4\u30eb\u3092\u4f7f\u7528\u3002',
    gotcha3t: '\u590f\u6642\u9593', gotcha3: 'UTC\u3092\u4f7f\u7528\u3057\u3066\u554f\u984c\u3092\u56de\u907f\u3002',
    gotcha4t: '\u65e5\u3068\u66dc\u65e5\u306e\u4e21\u65b9', gotcha4: '\u4e21\u65b9\u304c\u8a2d\u5b9a\u3055\u308c\u3066\u3044\u308b\u5834\u5408\u3001<strong>\u3069\u3061\u3089\u304b</strong>\u304c\u4e00\u81f4\u3059\u308c\u3070\u5b9f\u884c\u3002',
    gotcha5t: '\u79d2\u975e\u5bfe\u5fdc', gotcha5: '\u6700\u5c0f\u89e3\u50cf\u5ea6\u306f1\u5206\u3002\u30b5\u30d6\u30df\u30cb\u30c3\u30c8\u306b\u306f<code>sleep</code>\u3092\u4f7f\u7528\u3002',
    gotcha6t: '\u74b0\u5883\u5909\u6570', gotcha6: 'Cron\u30b8\u30e7\u30d6\u306f<strong>\u6700\u5c0f\u9650\u306e\u74b0\u5883</strong>\u3067\u5b9f\u884c\u3002\u30d5\u30eb\u30d1\u30b9\u3092\u4f7f\u7528\u3002',
    testingTitle: '7. \u30c6\u30b9\u30c8\u3068\u30c7\u30d0\u30c3\u30b0', testingDesc: '\u672c\u756a\u30c7\u30d7\u30ed\u30a4\u524d\u306b\uff1a',
    test1t: 'Cron\u30d1\u30fc\u30b5\u30fc', test1: '<strong>Cron\u5f0f\u30d1\u30fc\u30b5\u30fc</strong>\u3067\u6b21\u306e\u5b9f\u884c\u6642\u523b\u3092\u78ba\u8a8d\u3002',
    test2t: 'Cron\u30ed\u30b0', test2: '<code>/var/log/syslog</code>\u307e\u305f\u306f<code>/var/log/cron</code>\u3092\u78ba\u8a8d\u3002',
    test3t: '\u51fa\u529b\u30ea\u30c0\u30a4\u30ec\u30af\u30c8', test3: 'stdout/stderr\u3092\u30ed\u30b0\u30d5\u30a1\u30a4\u30eb\u306b\u30ad\u30e3\u30d7\u30c1\u30e3\u3002',
    test4t: '\u77ed\u3044\u9593\u9694\u3067\u30c6\u30b9\u30c8', test4: '\u307e\u305a<code>* * * * *</code>\u3067\u30c6\u30b9\u30c8\u3002',
    test5t: '\u30e1\u30fc\u30eb\u8a2d\u5b9a', test5: '<code>MAILTO=""</code>\u3067\u30e1\u30fc\u30eb\u3092\u7121\u52b9\u5316\u3002',
    faqTitle: '8. \u3088\u304f\u3042\u308b\u8cea\u554f',
    faq1q: 'Cron\u5f0f\u306e\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306f\uff1f', faq1a: '\u6a19\u6e96\u7684\u306acron\u5f0f\u306f5\u3064\u306e\u30d5\u30a3\u30fc\u30eb\u30c9\uff1a\u5206(0-59)\u3001\u6642(0-23)\u3001\u65e5(1-31)\u3001\u6708(1-12)\u3001\u66dc\u65e5(0-7)\u3002',
    faq2q: '*/5\u306e\u610f\u5473\u306f\uff1f', faq2a: '*/5\u306f\u300c5\u5358\u4f4d\u3054\u3068\u300d\u3002\u5206\u30d5\u30a3\u30fc\u30eb\u30c9\u3067\u306f5\u5206\u3054\u3068\u306b\u5b9f\u884c\u3002',
    faq3q: '30\u79d2\u3054\u3068\u306b\u5b9f\u884c\u3059\u308b\u306b\u306f\uff1f', faq3a: '\u6a19\u6e96cron\u306f\u79d2\u975e\u5bfe\u5fdc\u30022\u3064\u306e\u30a8\u30f3\u30c8\u30ea\u3092\u4f5c\u6210\u3057\u3001\u4e00\u3064\u306bsleep 30\u3092\u8ffd\u52a0\u3002',
    faq4q: 'cron\u3068crontab\u306e\u9055\u3044\u306f\uff1f', faq4a: 'Cron\u306f\u30c7\u30fc\u30e2\u30f3\u3002Crontab\u306f\u30b8\u30e7\u30d6\u30d5\u30a1\u30a4\u30eb\u3002',
    faq5q: 'Windows\u3067cron\u306f\u4f7f\u3048\u308b\uff1f', faq5a: '\u30cd\u30a4\u30c6\u30a3\u30d6Windows\u306b\u306fcron\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u30bf\u30b9\u30af\u30b9\u30b1\u30b8\u30e5\u30fc\u30e9\u304c\u4ee3\u66ff\u3002WSL\u3067\u306fcron\u3092\u4f7f\u7528\u53ef\u80fd\u3002',
    toolCta: 'Cron\u5f0f\u3092\u30a4\u30f3\u30bf\u30e9\u30af\u30c6\u30a3\u30d6\u306b\u69cb\u7bc9\u30fb\u30c6\u30b9\u30c8\uff1a',
  },
  ko: {
    title: 'Crontab \uce58\ud2b8\uc2dc\ud2b8 2025: \uc2e4\uc81c\ub85c \uc4f0\ub294 50\uac1c \uc774\uc0c1\uc758 Cron \ud45c\ud604\uc2dd \uc608\uc2dc',
    intro: '\ubc31\uc5c5 \uc608\uc57d, \ubc30\ud3ec \uc790\ub3d9\ud654, \uc815\uae30 \uc815\ub9ac \uc2a4\ud06c\ub9bd\ud2b8 \uc2e4\ud589 \ub4f1 <strong>cron</strong>\uc740 Unix/Linux \uc2dc\uc2a4\ud15c\uc758 \ud0dc\uc2a4\ud06c \uc2a4\ucf00\uc904\ub9c1 \ud575\uc2ec\uc785\ub2c8\ub2e4. \uc774 \uce58\ud2b8\uc2dc\ud2b8\ub294 <strong>50\uac1c \uc774\uc0c1\uc758 \ubcf5\uc0ac \uac00\ub2a5\ud55c cron \ud45c\ud604\uc2dd \uc608\uc2dc</strong>\ub97c \ube48\ub3c4\ubcc4\ub85c \uc81c\uacf5\ud569\ub2c8\ub2e4.',
    syntaxTitle: '1. Cron \ud45c\ud604\uc2dd \uad6c\ubb38',
    syntaxDesc: '\ud45c\uc900 cron \ud45c\ud604\uc2dd\uc740 \uacf5\ubc31\uc73c\ub85c \uad6c\ubd84\ub41c <strong>5\uac1c \ud544\ub4dc</strong>\ub85c \uad6c\uc131\ub429\ub2c8\ub2e4:',
    fieldMinute: '\ubd84 (0\u201359)', fieldHour: '\uc2dc (0\u201323)', fieldDom: '\uc77c (1\u201331)', fieldMonth: '\uc6d4 (1\u201312)', fieldDow: '\uc694\uc77c (0\u20137)',
    syntaxNote: '\uba85\ub839\uc5b4\ub294 5\uac1c \ud544\ub4dc \ub4a4\uc5d0 \uc635\ub2c8\ub2e4. <strong>Cron \uc0dd\uc131\uae30</strong> \ub3c4\uad6c\ub85c \uc2dc\uac01\uc801\uc73c\ub85c \uad6c\uc131\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
    specialTitle: '2. \ud2b9\uc218 \ubb38\uc790', specialDesc: 'Cron\uc740 4\uac1c\uc758 \ud2b9\uc218 \ubb38\uc790\ub97c \uc0ac\uc6a9\ud569\ub2c8\ub2e4:',
    charStar: '\ud574\ub2f9 \ud544\ub4dc\uc758 <strong>\ubaa8\ub4e0</strong> \uac12\uacfc \uc77c\uce58', charComma: '\uac12 <strong>\ubaa9\ub85d</strong> \uc9c0\uc815', charDash: '<strong>\ubc94\uc704</strong> \uc815\uc758', charSlash: '<strong>\ub2e8\uacc4</strong> \uac04\uaca9 \uc815\uc758',
    char: '\ubb38\uc790', meaning: '\uc758\ubbf8', example: '\uc608\uc2dc', exampleDesc: '\uc124\uba85',
    examplesTitle: '3. 50\uac1c \uc774\uc0c1\uc758 Cron \ud45c\ud604\uc2dd \uc608\uc2dc', examplesDesc: '\uac00\uc7a5 \ub9ce\uc774 \uc0ac\uc6a9\ub418\ub294 cron \uc2a4\ucf00\uc904\uc744 \ub2f4\uc740 \ud45c\uc785\ub2c8\ub2e4.',
    catMinutes: 'X\ubd84\ub9c8\ub2e4', catHourly: '\ub9e4\uc2dc', catDaily: '\ub9e4\uc77c', catWeekly: '\ub9e4\uc8fc', catMonthly: '\ub9e4\uc6d4', catYearly: '\ub9e4\ub144/\ubd84\uae30\ubcc4', catDevops: '\ube44\uc988\ub2c8\uc2a4 & DevOps',
    expression: '\ud45c\ud604\uc2dd', description: '\uc124\uba85', nextRun: '\ub2e4\uc74c \uc2e4\ud589 \uc608\uc2dc',
    commandsTitle: '4. Crontab \uba85\ub839\uc5b4', commandsDesc: '<code>crontab</code> \uba85\ub839\uc5b4\ub85c \uc0ac\uc6a9\uc790\ubcc4 cron \ud30c\uc77c\uc744 \uad00\ub9ac\ud569\ub2c8\ub2e4:',
    command: '\uba85\ub839\uc5b4', whatItDoes: '\uae30\ub2a5',
    platformTitle: '5. \ud50c\ub7ab\ud3fc\ubcc4 \uad6c\ubb38', platformDesc: 'Cron \uad6c\ubb38\uc740 \ud50c\ub7ab\ud3fc\ub9c8\ub2e4 \ub2e4\ub985\ub2c8\ub2e4:',
    platformLinux: 'Linux crontab', platformLinuxDesc: '5\ud544\ub4dc \ud45c\uc900 \ud615\uc2dd.',
    platformGithub: 'GitHub Actions', platformGithubDesc: '<code>schedule.cron</code>\uc5d0\uc11c 5\ud544\ub4dc. \ud56d\uc0c1 <strong>UTC</strong>.',
    platformAws: 'AWS CloudWatch', platformAwsDesc: '<strong>6\ud544\ub4dc</strong>. <code>?</code> \uc0ac\uc6a9.',
    platformK8s: 'Kubernetes CronJob', platformK8sDesc: '5\ud544\ub4dc \ud45c\uc900. K8s 1.27+\uc5d0\uc11c timezone \uc9c0\uc6d0.',
    platformVercel: 'Vercel Cron', platformVercelDesc: '<code>vercel.json</code>\uc5d0\uc11c 5\ud544\ub4dc. UTC.',
    gotchasTitle: '6. \uc790\uc8fc \ud558\ub294 \uc2e4\uc218', gotchasDesc: 'Cron\uc5d0\uc11c \uac00\uc7a5 \ud754\ud55c \uc2e4\uc218:',
    gotcha1t: '\ud0c0\uc784\uc874', gotcha1: 'Cron\uc740 \uae30\ubcf8\uc801\uc73c\ub85c <strong>\uc2dc\uc2a4\ud15c \ud0c0\uc784\uc874</strong>. CI/CD\ub294 <strong>UTC</strong>.',
    gotcha2t: '\uc2e4\ud589 \uacb9\uce68', gotcha2: '<code>flock</code> \ub610\ub294 \ub77d \ud30c\uc77c \uc0ac\uc6a9.',
    gotcha3t: '\uc11c\uba38\ud0c0\uc784', gotcha3: 'UTC\ub97c \uc0ac\uc6a9\ud558\uc5ec \ubb38\uc81c \ud68c\ud53c.',
    gotcha4t: '\uc77c\uacfc \uc694\uc77c \ub3d9\uc2dc \uc124\uc815', gotcha4: '\ub458 \ub2e4 \uc124\uc815\ub418\uba74 <strong>\ub458 \uc911 \ud558\ub098</strong> \uc77c\uce58 \uc2dc \uc2e4\ud589.',
    gotcha5t: '\ucd08 \ubbf8\uc9c0\uc6d0', gotcha5: '\ucd5c\uc18c \ud574\uc0c1\ub3c4 1\ubd84. \uc11c\ube0c\ubbf8\ub2db\uc5d0\ub294 <code>sleep</code> \uc0ac\uc6a9.',
    gotcha6t: '\ud658\uacbd \ubcc0\uc218', gotcha6: 'Cron \uc791\uc5c5\uc740 <strong>\ucd5c\uc18c \ud658\uacbd</strong>\uc73c\ub85c \uc2e4\ud589. \uc804\uccb4 \uacbd\ub85c \uc0ac\uc6a9.',
    testingTitle: '7. \ud14c\uc2a4\ud2b8 \ubc0f \ub514\ubc84\uadf8', testingDesc: '\ud504\ub85c\ub355\uc158 \ubc30\ud3ec \uc804:',
    test1t: 'Cron \ud30c\uc11c', test1: '<strong>Cron \ud45c\ud604\uc2dd \ud30c\uc11c</strong>\ub85c \ub2e4\uc74c \uc2e4\ud589 \uc2dc\uac04 \ud655\uc778.',
    test2t: 'Cron \ub85c\uadf8', test2: '<code>/var/log/syslog</code> \ub610\ub294 <code>/var/log/cron</code> \ud655\uc778.',
    test3t: '\ucd9c\ub825 \ub9ac\ub2e4\uc774\ub809\ud2b8', test3: 'stdout/stderr\ub97c \ub85c\uadf8 \ud30c\uc77c\ub85c \ucea1\ucc98.',
    test4t: '\uc9e7\uc740 \uac04\uaca9\uc73c\ub85c \ud14c\uc2a4\ud2b8', test4: '\uba3c\uc800 <code>* * * * *</code>\ub85c \ud14c\uc2a4\ud2b8.',
    test5t: '\uba54\uc77c \uc124\uc815', test5: '<code>MAILTO=""</code>\ub85c \uba54\uc77c \ube44\ud65c\uc131\ud654.',
    faqTitle: '8. \uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    faq1q: 'Cron \ud45c\ud604\uc2dd\uc758 \ud615\uc2dd\uc740?', faq1a: '\ud45c\uc900 cron \ud45c\ud604\uc2dd\uc740 5\uac1c \ud544\ub4dc: \ubd84(0-59), \uc2dc(0-23), \uc77c(1-31), \uc6d4(1-12), \uc694\uc77c(0-7).',
    faq2q: '*/5\uc758 \uc758\ubbf8\ub294?', faq2a: '*/5\ub294 "\ub9e4 5\ub2e8\uc704"\ub97c \uc758\ubbf8. \ubd84 \ud544\ub4dc\uc5d0\uc11c 5\ubd84\ub9c8\ub2e4 \uc2e4\ud589.',
    faq3q: '30\ucd08\ub9c8\ub2e4 \uc2e4\ud589\ud558\ub824\uba74?', faq3a: '\ud45c\uc900 cron\uc740 \ucd08 \ubbf8\uc9c0\uc6d0. 2\uac1c \uc5d4\ud2b8\ub9ac\ub97c \ub9cc\ub4e4\uace0 \ud558\ub098\uc5d0 sleep 30 \ucd94\uac00.',
    faq4q: 'cron\uacfc crontab\uc758 \ucc28\uc774\ub294?', faq4a: 'Cron\uc740 \ub370\ubaac. Crontab\uc740 \uc791\uc5c5 \ud30c\uc77c.',
    faq5q: 'Windows\uc5d0\uc11c cron\uc744 \uc4f8 \uc218 \uc788\ub098\uc694?', faq5a: '\ub124\uc774\ud2f0\ube0c Windows\uc5d0\ub294 cron\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \uc791\uc5c5 \uc2a4\ucf00\uc904\ub7ec\uac00 \ub300\uc548. WSL\uc5d0\uc11c\ub294 cron \uc0ac\uc6a9 \uac00\ub2a5.',
    toolCta: 'Cron \ud45c\ud604\uc2dd\uc744 \uc778\ud130\ub799\ud2f0\ube0c\ud558\uac8c \uad6c\uc131\ud558\uace0 \ud14c\uc2a4\ud2b8\ud558\uc138\uc694:',
  },
};

export default function CrontabCheatSheetCronExamplesGuide({ lang }: { lang: string }) {
  const l = t[lang] || t.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: l.faq1q, acceptedAnswer: { '@type': 'Answer', text: l.faq1a } },
      { '@type': 'Question', name: l.faq2q, acceptedAnswer: { '@type': 'Answer', text: l.faq2a } },
      { '@type': 'Question', name: l.faq3q, acceptedAnswer: { '@type': 'Answer', text: l.faq3a } },
      { '@type': 'Question', name: l.faq4q, acceptedAnswer: { '@type': 'Answer', text: l.faq4a } },
      { '@type': 'Question', name: l.faq5q, acceptedAnswer: { '@type': 'Answer', text: l.faq5a } },
    ],
  };

  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 48, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 600, marginTop: 28, marginBottom: 12, color: 'var(--text-primary)' };
  const pStyle: React.CSSProperties = { fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto' as const, fontSize: 13, lineHeight: 1.8, marginBottom: 24 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left' as const, fontWeight: 700, fontSize: 13 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const codeTd: React.CSSProperties = { ...tdStyle, fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 600, whiteSpace: 'nowrap' as const };
  const cardStyle: React.CSSProperties = { padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', marginBottom: 12 };
  const ctaStyle: React.CSSProperties = { padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center' as const, marginBottom: 30, marginTop: 30 };

  const renderTable = (rows: string[][]) => (
    <div style={{ overflowX: 'auto', marginBottom: 28 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>{l.expression}</th>
            <th style={thStyle}>{l.description}</th>
            <th style={thStyle}>{l.nextRun}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([expr, desc, next], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
              <td style={codeTd}>{expr}</td>
              <td style={tdStyle}>{desc}</td>
              <td style={{ ...tdStyle, fontSize: 12, color: 'var(--text-muted)' }}>{next}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  /* ---- CRON EXAMPLE DATA ---- */
  const minuteExamples = [
    ['* * * * *', 'Every minute', '10:00, 10:01, 10:02 ...'],
    ['*/1 * * * *', 'Every minute (explicit)', '10:00, 10:01, 10:02 ...'],
    ['*/2 * * * *', 'Every 2 minutes', '10:00, 10:02, 10:04 ...'],
    ['*/5 * * * *', 'Every 5 minutes', '10:00, 10:05, 10:10 ...'],
    ['*/10 * * * *', 'Every 10 minutes', '10:00, 10:10, 10:20 ...'],
    ['*/15 * * * *', 'Every 15 minutes', '10:00, 10:15, 10:30, 10:45'],
    ['*/20 * * * *', 'Every 20 minutes', '10:00, 10:20, 10:40 ...'],
    ['*/30 * * * *', 'Every 30 minutes', '10:00, 10:30, 11:00 ...'],
    ['0,15,30,45 * * * *', 'At 0, 15, 30, 45 minutes past each hour', '10:00, 10:15, 10:30, 10:45'],
  ];

  const hourlyExamples = [
    ['0 * * * *', 'Every hour (at minute 0)', '10:00, 11:00, 12:00 ...'],
    ['30 * * * *', 'Every hour at minute 30', '10:30, 11:30, 12:30 ...'],
    ['15 * * * *', 'Every hour at minute 15', '10:15, 11:15, 12:15 ...'],
    ['0 */2 * * *', 'Every 2 hours', '00:00, 02:00, 04:00 ...'],
    ['0 */3 * * *', 'Every 3 hours', '00:00, 03:00, 06:00 ...'],
    ['0 */4 * * *', 'Every 4 hours', '00:00, 04:00, 08:00 ...'],
    ['0 */6 * * *', 'Every 6 hours', '00:00, 06:00, 12:00, 18:00'],
    ['0 */8 * * *', 'Every 8 hours', '00:00, 08:00, 16:00'],
    ['0 */12 * * *', 'Every 12 hours', '00:00, 12:00'],
  ];

  const dailyExamples = [
    ['0 0 * * *', 'Daily at midnight (00:00)', 'Tomorrow 00:00'],
    ['0 1 * * *', 'Daily at 1:00 AM', 'Tomorrow 01:00'],
    ['0 6 * * *', 'Daily at 6:00 AM', 'Tomorrow 06:00'],
    ['30 7 * * *', 'Daily at 7:30 AM', 'Tomorrow 07:30'],
    ['0 9 * * *', 'Daily at 9:00 AM', 'Tomorrow 09:00'],
    ['30 8 * * *', 'Daily at 8:30 AM', 'Tomorrow 08:30'],
    ['0 12 * * *', 'Daily at noon (12:00)', 'Tomorrow 12:00'],
    ['0 15 * * *', 'Daily at 3:00 PM', 'Tomorrow 15:00'],
    ['0 18 * * *', 'Daily at 6:00 PM', 'Tomorrow 18:00'],
    ['0 23 * * *', 'Daily at 11:00 PM', 'Tomorrow 23:00'],
    ['0 8-17 * * *', 'Every hour from 8 AM to 5 PM', '08:00, 09:00 ... 17:00'],
    ['0 9,12,18 * * *', 'Three times a day (9 AM, noon, 6 PM)', '09:00, 12:00, 18:00'],
  ];

  const weeklyExamples = [
    ['0 9 * * 1', 'Every Monday at 9:00 AM', 'Next Monday 09:00'],
    ['0 9 * * 1-5', 'Weekdays (Mon-Fri) at 9:00 AM', 'Next weekday 09:00'],
    ['0 0 * * 0', 'Every Sunday at midnight', 'Next Sunday 00:00'],
    ['0 0 * * 6,0', 'Saturday & Sunday at midnight', 'Next Sat/Sun 00:00'],
    ['0 17 * * 5', 'Every Friday at 5:00 PM', 'Next Friday 17:00'],
    ['0 9 * * 1,3,5', 'Mon, Wed, Fri at 9:00 AM', 'Next Mon/Wed/Fri 09:00'],
    ['0 8-17 * * 1-5', 'Hourly 8AM\u20135PM, weekdays only', 'Next weekday 08:00'],
    ['30 6 * * 1-5', 'Weekdays at 6:30 AM', 'Next weekday 06:30'],
  ];

  const monthlyExamples = [
    ['0 0 1 * *', '1st of every month at midnight', 'Next month, 1st 00:00'],
    ['0 0 15 * *', '15th of every month at midnight', 'Next 15th 00:00'],
    ['0 9 1 * *', '1st of every month at 9:00 AM', 'Next month, 1st 09:00'],
    ['0 0 1,15 * *', '1st and 15th at midnight', 'Next 1st or 15th 00:00'],
    ['0 0 * * 5L', 'Last Friday of the month (non-std)', 'Last Fri 00:00'],
    ['0 9 * * 1#1', 'First Monday of the month (non-std)', 'First Mon 09:00'],
    ['0 0 28 * *', '28th of every month at midnight', 'Next 28th 00:00'],
  ];

  const yearlyExamples = [
    ['0 0 1 1 *', 'January 1st at midnight', 'Jan 1 00:00'],
    ['0 0 1 1,4,7,10 *', 'Quarterly: Jan, Apr, Jul, Oct 1st', 'Next quarter 00:00'],
    ['0 0 1 1,7 *', 'Bi-annually: Jan 1 & Jul 1', 'Jan 1 or Jul 1 00:00'],
    ['0 0 25 12 *', 'December 25th at midnight', 'Dec 25 00:00'],
    ['0 0 1 */3 *', 'Every 3 months on the 1st', 'Next 1st in 3 months'],
    ['0 0 1 */6 *', 'Every 6 months on the 1st', 'Next 1st in 6 months'],
  ];

  const devopsExamples = [
    ['0 2 * * *', 'Database backup at 2:00 AM daily', 'Tomorrow 02:00'],
    ['0 3 * * 0', 'Log rotation every Sunday at 3 AM', 'Next Sunday 03:00'],
    ['0 4 1 * *', 'Monthly DB cleanup on 1st at 4 AM', 'Next month, 1st 04:00'],
    ['0 1 * * *', 'SSL cert check daily at 1 AM', 'Tomorrow 01:00'],
    ['*/5 * * * *', 'Health check every 5 minutes', '10:00, 10:05, 10:10 ...'],
    ['0 5 * * 1-5', 'Deploy window: weekdays at 5 AM', 'Next weekday 05:00'],
    ['0 0 * * *', 'Rotate logs daily at midnight', 'Tomorrow 00:00'],
    ['0 */4 * * *', 'Send report digest every 4 hours', '00:00, 04:00, 08:00 ...'],
    ['0 22 * * 5', 'Friday night maintenance at 10 PM', 'Next Friday 22:00'],
    ['30 2 * * *', 'Temp file cleanup at 2:30 AM daily', 'Tomorrow 02:30'],
  ];

  /* ---- CRONTAB COMMANDS ---- */
  const crontabCommands = [
    ['crontab -e', 'Edit your crontab file (opens in default editor)'],
    ['crontab -l', 'List all cron jobs for the current user'],
    ['crontab -r', 'Remove all cron jobs for the current user (use with caution!)'],
    ['crontab -u alice -l', 'List cron jobs for a specific user (requires root)'],
    ['crontab -u alice -e', 'Edit crontab for a specific user (requires root)'],
    ['crontab filename', 'Install a crontab from a file (overwrites existing)'],
  ];

  /* ---- SPECIAL CHARACTERS ---- */
  const specialChars = [
    ['*', l.charStar, '* * * * *', 'Every minute'],
    [',', l.charComma, '0 9 * * 1,3,5', 'Mon, Wed, Fri at 9 AM'],
    ['-', l.charDash, '0 9 * * 1-5', 'Mon through Fri at 9 AM'],
    ['/', l.charSlash, '*/10 * * * *', 'Every 10 minutes'],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article style={{ maxWidth: 768, margin: '0 auto' }}>

        {/* INTRO */}
        <p style={{ ...pStyle, fontSize: 16, marginBottom: 30 }} dangerouslySetInnerHTML={{ __html: l.intro }} />

        {/* ===== SECTION 1: SYNTAX ===== */}
        <h2 style={h2Style}>{l.syntaxTitle}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.syntaxDesc }} />

        <pre style={codeStyle}><code>{`\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${l.fieldMinute}
\u2502 \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${l.fieldHour}
\u2502 \u2502 \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${l.fieldDom}
\u2502 \u2502 \u2502 \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ${l.fieldMonth}
\u2502 \u2502 \u2502 \u2502 \u250c\u2500\u2500\u2500\u2500\u2500 ${l.fieldDow}
\u2502 \u2502 \u2502 \u2502 \u2502
* * * * *  command_to_execute`}</code></pre>

        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.syntaxNote }} />

        <div style={ctaStyle}>
          <Link href={`/${lang}/tools/cron-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Cron Generator Tool &rarr;
          </Link>
        </div>

        {/* ===== SECTION 2: SPECIAL CHARACTERS ===== */}
        <h2 style={h2Style}>{l.specialTitle}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.specialDesc }} />

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>{l.char}</th>
                <th style={thStyle}>{l.meaning}</th>
                <th style={thStyle}>{l.example}</th>
                <th style={thStyle}>{l.exampleDesc}</th>
              </tr>
            </thead>
            <tbody>
              {specialChars.map(([ch, desc, ex, exDesc], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ ...codeTd, fontSize: 16, textAlign: 'center' }}>{ch}</td>
                  <td style={tdStyle} dangerouslySetInnerHTML={{ __html: desc }} />
                  <td style={codeTd}>{ex}</td>
                  <td style={tdStyle}>{exDesc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== SECTION 3: 50+ EXAMPLES ===== */}
        <h2 style={h2Style}>{l.examplesTitle}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.examplesDesc }} />

        <h3 style={h3Style}>{l.catMinutes}</h3>
        {renderTable(minuteExamples)}

        <h3 style={h3Style}>{l.catHourly}</h3>
        {renderTable(hourlyExamples)}

        <h3 style={h3Style}>{l.catDaily}</h3>
        {renderTable(dailyExamples)}

        <h3 style={h3Style}>{l.catWeekly}</h3>
        {renderTable(weeklyExamples)}

        <h3 style={h3Style}>{l.catMonthly}</h3>
        {renderTable(monthlyExamples)}

        <h3 style={h3Style}>{l.catYearly}</h3>
        {renderTable(yearlyExamples)}

        <h3 style={h3Style}>{l.catDevops}</h3>
        {renderTable(devopsExamples)}

        <div style={ctaStyle}>
          <Link href={`/${lang}/tools/cron-expression-parser`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Cron Expression Parser Tool &rarr;
          </Link>
        </div>

        {/* ===== SECTION 4: CRONTAB COMMANDS ===== */}
        <h2 style={h2Style}>{l.commandsTitle}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.commandsDesc }} />

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>{l.command}</th>
                <th style={thStyle}>{l.whatItDoes}</th>
              </tr>
            </thead>
            <tbody>
              {crontabCommands.map(([cmd, desc], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={codeTd}>{cmd}</td>
                  <td style={tdStyle}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <pre style={codeStyle}><code>{`# Edit crontab
crontab -e

# List all cron jobs
crontab -l

# Backup current crontab to a file
crontab -l > my-crontab-backup.txt

# Install crontab from a file
crontab my-crontab-backup.txt

# Remove all cron jobs (careful!)
crontab -r`}</code></pre>

        <div style={ctaStyle}>
          <Link href={`/${lang}/tools/crontab-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Crontab Generator Tool &rarr;
          </Link>
        </div>

        {/* ===== SECTION 5: PLATFORM DIFFERENCES ===== */}
        <h2 style={h2Style}>{l.platformTitle}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: l.platformDesc }} />

        {[
          { label: l.platformLinux, desc: l.platformLinuxDesc, code: '# Standard 5-field crontab\n*/5 * * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1' },
          { label: l.platformGithub, desc: l.platformGithubDesc, code: "# .github/workflows/scheduled.yml\non:\n  schedule:\n    - cron: '0 9 * * 1-5'  # Weekdays 9AM UTC" },
          { label: l.platformAws, desc: l.platformAwsDesc, code: '# AWS EventBridge (6 fields, note the ?)\ncron(0 9 ? * MON-FRI *)  # Weekdays 9AM UTC' },
          { label: l.platformK8s, desc: l.platformK8sDesc, code: '# Kubernetes CronJob spec\napiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: daily-backup\nspec:\n  schedule: "0 2 * * *"\n  timeZone: "America/New_York"  # K8s 1.27+' },
          { label: l.platformVercel, desc: l.platformVercelDesc, code: '// vercel.json\n{\n  "crons": [{\n    "path": "/api/cron/daily-report",\n    "schedule": "0 9 * * *"\n  }]\n}' },
        ].map((p, i) => (
          <div key={i} style={cardStyle}>
            <strong style={{ color: 'var(--text-primary)', fontSize: 15 }}>{p.label}</strong>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '6px 0 10px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: p.desc }} />
            <pre style={{ ...codeStyle, padding: '10px 14px', margin: 0 }}><code>{p.code}</code></pre>
          </div>
        ))}

        {/* ===== SECTION 6: GOTCHAS ===== */}
        <h2 style={h2Style}>{l.gotchasTitle}</h2>
        <p style={pStyle}>{l.gotchasDesc}</p>

        {[
          [l.gotcha1t, l.gotcha1],
          [l.gotcha2t, l.gotcha2],
          [l.gotcha3t, l.gotcha3],
          [l.gotcha4t, l.gotcha4],
          [l.gotcha5t, l.gotcha5],
          [l.gotcha6t, l.gotcha6],
        ].map(([title, desc], i) => (
          <div key={i} style={{ ...cardStyle, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-blue)', minWidth: 24 }}>{i + 1}</span>
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: 4 }}>{title}</strong>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }} dangerouslySetInnerHTML={{ __html: desc }} />
            </div>
          </div>
        ))}

        <pre style={{ ...codeStyle, marginTop: 20 }}><code>{`# Gotcha: overlapping runs - use flock to prevent
*/5 * * * * /usr/bin/flock -n /tmp/myjob.lock /path/to/script.sh

# Gotcha: environment - always use full paths
0 2 * * * /usr/bin/python3 /home/user/scripts/backup.py >> /var/log/backup.log 2>&1

# Gotcha: 30-second workaround (two entries)
* * * * * /path/to/script.sh
* * * * * sleep 30 && /path/to/script.sh

# Gotcha: PATH not set - define it at the top of your crontab
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Gotcha: percent signs (%) must be escaped in crontab
# Wrong:
0 0 * * * echo "Today is $(date +%Y-%m-%d)"
# Correct:
0 0 * * * echo "Today is $(date +\\%Y-\\%m-\\%d)"`}</code></pre>

        <h3 style={h3Style}>Sample Crontab File</h3>
        <p style={pStyle}>Here is a complete, real-world crontab file combining several patterns discussed above:</p>

        <pre style={codeStyle}><code>{`# =============================================
# Crontab for: webserver (production)
# Last updated: 2025-01-15
# =============================================

# Environment
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
MAILTO="ops-team@example.com"

# --- BACKUPS ---
# Full database backup at 2:00 AM daily
0 2 * * * /usr/bin/flock -n /tmp/db-backup.lock /opt/scripts/db-backup.sh >> /var/log/db-backup.log 2>&1

# Incremental file backup every 6 hours
0 */6 * * * /opt/scripts/file-backup.sh >> /var/log/file-backup.log 2>&1

# --- MAINTENANCE ---
# Clear temp files older than 7 days, daily at 3 AM
0 3 * * * /usr/bin/find /tmp -type f -mtime +7 -delete

# Rotate application logs every Sunday at 4 AM
0 4 * * 0 /opt/scripts/rotate-logs.sh >> /var/log/log-rotation.log 2>&1

# --- MONITORING ---
# Health check every 5 minutes
*/5 * * * * /opt/scripts/healthcheck.sh > /dev/null 2>&1

# SSL certificate expiry check daily at 6 AM
0 6 * * * /opt/scripts/check-ssl.sh

# Disk space alert if usage > 90%, every hour
0 * * * * /opt/scripts/disk-alert.sh

# --- REPORTS ---
# Send daily summary at 8 AM on weekdays
0 8 * * 1-5 /opt/scripts/daily-report.sh

# Monthly analytics report on the 1st at 9 AM
0 9 1 * * /opt/scripts/monthly-report.sh`}</code></pre>

        {/* ===== SECTION 7: TESTING ===== */}
        <h2 style={h2Style}>{l.testingTitle}</h2>
        <p style={pStyle}>{l.testingDesc}</p>

        {[
          [l.test1t, l.test1],
          [l.test2t, l.test2],
          [l.test3t, l.test3],
          [l.test4t, l.test4],
          [l.test5t, l.test5],
        ].map(([title, desc], i) => (
          <div key={i} style={{ ...cardStyle, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-blue)', minWidth: 24 }}>{i + 1}</span>
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: 4 }}>{title}</strong>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }} dangerouslySetInnerHTML={{ __html: desc }} />
            </div>
          </div>
        ))}

        <pre style={{ ...codeStyle, marginTop: 20 }}><code>{`# Redirect all output to a log file
0 2 * * * /path/to/backup.sh >> /var/log/cron-backup.log 2>&1

# Disable cron mail for this job
0 2 * * * /path/to/backup.sh > /dev/null 2>&1

# Set MAILTO at the top of crontab
MAILTO=""
# Or send to a real address
MAILTO="admin@example.com"

# Check cron logs on Debian/Ubuntu
grep CRON /var/log/syslog | tail -20

# Check cron logs on CentOS/RHEL
grep CRON /var/log/cron | tail -20

# On systems using journald (systemd)
journalctl -u cron --since "1 hour ago"

# Quick test: add a job that writes to a file
# Then check if the file gets updated
* * * * * echo "cron works: $(date)" >> /tmp/cron-test.log

# Verify your crontab was saved correctly
crontab -l | grep -v '^#'

# Check if cron daemon is running
systemctl status cron    # Debian/Ubuntu
systemctl status crond   # CentOS/RHEL`}</code></pre>

        <h3 style={h3Style}>Common Cron Debugging Checklist</h3>
        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Check</th>
                <th style={thStyle}>How to Verify</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Cron daemon running?', 'systemctl status cron (or crond)'],
                ['Crontab saved?', 'crontab -l and look for your entry'],
                ['Script executable?', 'chmod +x /path/to/script.sh'],
                ['Full paths used?', 'Use which python3 to find full path'],
                ['Output captured?', 'Add >> /tmp/debug.log 2>&1'],
                ['Permissions correct?', 'Script owner = crontab owner'],
                ['No syntax errors?', 'bash -n /path/to/script.sh'],
                ['Timezone correct?', 'timedatectl or date to check'],
              ].map(([check, verify], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{check}</td>
                  <td style={codeTd}>{verify}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={ctaStyle}>
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>{l.toolCta}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${lang}/tools/cron-expression-parser`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 14 }}>
              Cron Expression Parser &rarr;
            </Link>
            <Link href={`/${lang}/tools/cron-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 14 }}>
              Cron Generator &rarr;
            </Link>
            <Link href={`/${lang}/tools/crontab-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 14 }}>
              Crontab Generator &rarr;
            </Link>
            <Link href={`/${lang}/tools/cron-job-scheduler`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 14 }}>
              Cron Job Scheduler &rarr;
            </Link>
          </div>
        </div>

        {/* ===== SECTION 8: FAQ ===== */}
        <h2 style={h2Style}>{l.faqTitle}</h2>

        {[
          [l.faq1q, l.faq1a],
          [l.faq2q, l.faq2a],
          [l.faq3q, l.faq3a],
          [l.faq4q, l.faq4a],
          [l.faq5q, l.faq5a],
        ].map(([q, a], i) => (
          <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
          </div>
        ))}

      </article>
    </>
  );
}
