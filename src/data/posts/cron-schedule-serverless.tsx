import Link from 'next/link';

const cronT: Record<string, Record<string, string>> = {
  en: {
    intro: 'Cron expressions are the universal language for scheduling recurring tasks. But when you move from traditional <code>crontab</code> to serverless platforms, each platform has its own quirks, limitations, and syntax differences. This guide covers everything you need to schedule jobs on the three most popular serverless platforms.',
    h2_basics: 'Cron Expression Basics (60-Second Refresher)',
    p_5fields: 'A standard cron expression has <strong>5 fields</strong>:',
    p_chars: 'Common special characters:',
    li_any: 'any value', li_step: 'every 5 units (step)', li_list: 'specific values (list)', li_range: 'range of values',
    link_test: 'Test your cron expressions with our Cron Parser tool →',
    h2_gha: 'Platform 1: GitHub Actions',
    p_gha: 'GitHub Actions uses the <code>schedule</code> event with standard 5-field cron syntax. Scheduled workflows run on the default branch only.',
    h3_config: 'Configuration', h3_limits: 'Key Limitations', h3_schedules: 'Common Schedules for GitHub Actions',
    th_aspect: 'Aspect', th_details: 'Details',
    gha_tz: 'Timezone', gha_tz_val: 'UTC only — no timezone configuration',
    gha_min: 'Minimum interval', gha_min_val: 'Every 5 minutes',
    gha_acc: 'Accuracy', gha_acc_val: 'Can be delayed 5-15 minutes during peak load',
    gha_branch: 'Branch', gha_branch_val: 'Runs on default branch only',
    gha_disable: 'Disable condition', gha_disable_val: 'Auto-disabled after 60 days of repo inactivity',
    tip: 'GitHub Actions scheduled workflows may not fire exactly on time. If you need precision, use a webhook-based trigger from a more reliable scheduler.',
    h2_vercel: 'Platform 2: Vercel Cron Jobs',
    p_vercel: 'Vercel Cron Jobs trigger serverless functions on a schedule. Configure them in <code>vercel.json</code>.',
    h3_api: 'The API Route',
    th_plan: 'Plan', th_min: 'Min Interval', th_max: 'Max Cron Jobs', th_exec: 'Execution Limit',
    vercel_important: 'Vercel Cron Jobs use UTC timezone. The Hobby plan\'s once-per-day limit means expressions like */5 * * * * will not work — they\'ll only fire once daily.',
    h2_cf: 'Platform 3: Cloudflare Workers (Cron Triggers)',
    p_cf: 'Cloudflare Workers Cron Triggers are configured in <code>wrangler.toml</code> and run at the edge globally.',
    h3_worker: 'Worker Code',
    cf_tz_val: 'UTC only',
    cf_min_val: 'Once per minute',
    cf_max_val: '3 per Worker (free), more on paid plans',
    cf_cpu: 'CPU time', cf_cpu_val: '10ms (free) / 30s (paid) per invocation',
    cf_acc: 'Accuracy', cf_acc_val: 'Very reliable — runs at the edge',
    h2_cross: 'Cross-Platform Comparison',
    th_feature: 'Feature', th_gha: 'GitHub Actions', th_vercel: 'Vercel Cron', th_cf: 'CF Workers',
    h2_timezone: 'Common Timezone Pitfall',
    p_timezone: 'All three platforms use UTC exclusively. This is the most common source of bugs when setting up cron schedules. Here\'s a quick UTC conversion table:',
    th_local: 'Local Time', th_offset: 'UTC Offset', th_cron: 'Cron (9 AM local)',
    p_remember: 'Remember: Daylight Saving Time shifts UTC offsets. EST (UTC-5) becomes EDT (UTC-4) in summer. Your cron jobs won\'t adjust automatically.',
    h2_copy: '10 Copy-Paste Cron Expressions',
    p_here: 'Here are the most commonly needed schedules, ready to use on any platform:',
    link_validate: 'Validate any cron expression with our Cron Parser →',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What timezone do GitHub Actions cron schedules use?',
    faq1_a: 'GitHub Actions cron schedules always use UTC. There is no option to change the timezone. If you need a job to run at 9 AM Eastern Time, you must convert that to UTC (1 PM or 2 PM depending on daylight saving time) and use the corresponding cron expression.',
    faq2_q: 'What is the minimum interval for Vercel Cron Jobs?',
    faq2_a: 'On the Vercel Hobby (free) plan, the minimum interval is once per day. On the Pro plan, the minimum is once per hour. On the Enterprise plan, the minimum is once per minute. Vercel uses standard 5-field cron expressions.',
    faq3_q: 'Can Cloudflare Workers Cron Triggers run every second?',
    faq3_a: 'No. Cloudflare Workers Cron Triggers use standard cron expressions with a minimum granularity of one minute. For sub-minute scheduling, you would need to use Durable Objects with the alarm() API.',
  },
  fr: { intro: 'Les expressions cron sont le langage universel pour planifier des tâches récurrentes. Mais quand on passe du <code>crontab</code> traditionnel aux plateformes serverless, chaque plateforme a ses particularités. Ce guide couvre tout pour planifier des jobs sur les trois plateformes serverless les plus populaires.',
    h2_basics: 'Bases des expressions cron', p_5fields: 'Une expression cron standard a <strong>5 champs</strong> :', p_chars: 'Caractères spéciaux courants :',
    li_any: 'toute valeur', li_step: 'toutes les 5 unités', li_list: 'valeurs spécifiques', li_range: 'plage de valeurs',
    link_test: 'Testez vos expressions cron avec notre Cron Parser →', h2_gha: 'Plateforme 1 : GitHub Actions',
    p_gha: 'GitHub Actions utilise l\'événement <code>schedule</code> avec la syntaxe cron standard à 5 champs.',
    h3_config: 'Configuration', h3_limits: 'Limitations clés', h3_schedules: 'Planifications courantes',
    th_aspect: 'Aspect', th_details: 'Détails',
    gha_tz: 'Fuseau horaire', gha_tz_val: 'UTC uniquement', gha_min: 'Intervalle minimum', gha_min_val: 'Toutes les 5 minutes',
    gha_acc: 'Précision', gha_acc_val: 'Délai possible de 5-15 min en charge', gha_branch: 'Branche', gha_branch_val: 'Branche par défaut uniquement',
    gha_disable: 'Désactivation', gha_disable_val: 'Désactivé après 60 jours d\'inactivité',
    tip: 'Les workflows GitHub Actions peuvent ne pas s\'exécuter à l\'heure exacte. Pour plus de précision, utilisez un déclencheur webhook.',
    h2_vercel: 'Plateforme 2 : Vercel Cron Jobs', p_vercel: 'Les Cron Jobs Vercel déclenchent des fonctions serverless. Configurez-les dans <code>vercel.json</code>.',
    h3_api: 'La route API', th_plan: 'Plan', th_min: 'Intervalle min', th_max: 'Max Cron Jobs', th_exec: 'Limite d\'exécution',
    vercel_important: 'Les Cron Jobs Vercel utilisent UTC. Sur Hobby, une fois par jour uniquement.',
    h2_cf: 'Plateforme 3 : Cloudflare Workers', p_cf: 'Les Cron Triggers sont configurés dans <code>wrangler.toml</code>.',
    h3_worker: 'Code Worker', cf_tz_val: 'UTC uniquement', cf_min_val: 'Une fois par minute',
    cf_max_val: '3 par Worker (gratuit)', cf_cpu: 'CPU', cf_cpu_val: '10ms (gratuit) / 30s (payant)',
    cf_acc: 'Précision', cf_acc_val: 'Très fiable — exécution en edge',
    h2_cross: 'Comparaison multiplateforme', th_feature: 'Fonctionnalité', th_gha: 'GitHub Actions', th_vercel: 'Vercel Cron', th_cf: 'CF Workers',
    h2_timezone: 'Piège des fuseaux horaires', p_timezone: 'Les trois plateformes utilisent UTC exclusivement.',
    th_local: 'Heure locale', th_offset: 'Décalage UTC', th_cron: 'Cron (9h locale)',
    p_remember: 'Attention : l\'heure d\'été modifie les décalages UTC.',
    h2_copy: '10 expressions cron prêtes à l\'emploi', p_here: 'Planifications les plus courantes :',
    link_validate: 'Validez vos expressions cron avec notre Cron Parser →',
    h2_faq: 'Questions fréquentes', faq1_q: 'Quel fuseau horaire pour GitHub Actions ?', faq1_a: 'GitHub Actions utilise toujours UTC.',
    faq2_q: 'Quel intervalle minimum pour Vercel Cron ?', faq2_a: 'Hobby : 1/jour, Pro : 1/heure, Enterprise : 1/minute.',
    faq3_q: 'Cloudflare Workers peut-il tourner chaque seconde ?', faq3_a: 'Non. Granularité minimum : une minute.',
  },
  de: { intro: 'Cron-Ausdrücke sind die universelle Sprache für wiederkehrende Aufgaben. Serverless-Plattformen haben jeweils eigene Eigenheiten.', h2_basics: 'Cron-Grundlagen', p_5fields: 'Ein Standard-Cron hat <strong>5 Felder</strong>:', p_chars: 'Häufige Sonderzeichen:', li_any: 'beliebiger Wert', li_step: 'alle 5 Einheiten', li_list: 'bestimmte Werte', li_range: 'Wertebereich', link_test: 'Cron-Ausdrücke mit unserem Cron Parser testen →', h2_gha: 'Plattform 1: GitHub Actions', p_gha: 'GitHub Actions nutzt das <code>schedule</code>-Event.', h3_config: 'Konfiguration', h3_limits: 'Einschränkungen', h3_schedules: 'Häufige Zeitpläne', th_aspect: 'Aspekt', th_details: 'Details', gha_tz: 'Zeitzone', gha_tz_val: 'Nur UTC', gha_min: 'Mindestintervall', gha_min_val: 'Alle 5 Minuten', gha_acc: 'Genauigkeit', gha_acc_val: 'Verzögerung möglich', gha_branch: 'Branch', gha_branch_val: 'Nur Default-Branch', gha_disable: 'Deaktivierung', gha_disable_val: 'Nach 60 Tagen Inaktivität', tip: 'GitHub Actions kann verzögert auslösen.', h2_vercel: 'Plattform 2: Vercel Cron Jobs', p_vercel: 'Konfiguration in <code>vercel.json</code>.', h3_api: 'API-Route', th_plan: 'Plan', th_min: 'Min. Intervall', th_max: 'Max Cron Jobs', th_exec: 'Laufzeit', vercel_important: 'Vercel nutzt UTC. Hobby: 1x/Tag.', h2_cf: 'Plattform 3: Cloudflare Workers', p_cf: 'Konfiguration in <code>wrangler.toml</code>.', h3_worker: 'Worker-Code', cf_tz_val: 'Nur UTC', cf_min_val: '1x pro Minute', cf_max_val: '3 pro Worker (kostenlos)', cf_cpu: 'CPU', cf_cpu_val: '10ms/30s', cf_acc: 'Genauigkeit', cf_acc_val: 'Sehr zuverlässig', h2_cross: 'Plattformvergleich', th_feature: 'Feature', th_gha: 'GitHub Actions', th_vercel: 'Vercel Cron', th_cf: 'CF Workers', h2_timezone: 'Zeitzonen-Falle', p_timezone: 'Alle drei nutzen ausschließlich UTC.', th_local: 'Lokalzeit', th_offset: 'UTC-Offset', th_cron: 'Cron (9h lokal)', p_remember: 'Sommerzeit ändert UTC-Offsets.', h2_copy: '10 Copy-Paste Cron-Ausdrücke', p_here: 'Häufig benötigte Zeitpläne:', link_validate: 'Cron-Ausdrücke validieren →', h2_faq: 'Häufige Fragen', faq1_q: 'Welche Zeitzone nutzt GitHub Actions?', faq1_a: 'Immer UTC.', faq2_q: 'Mindestintervall Vercel Cron?', faq2_a: 'Hobby: 1/Tag, Pro: 1/Stunde, Enterprise: 1/Minute.', faq3_q: 'Cloudflare Workers jede Sekunde?', faq3_a: 'Nein. Mindestgranularität: 1 Minute.',
  },
  it: { intro: 'Le espressioni cron sono il linguaggio universale per pianificare attività ricorrenti. Ogni piattaforma serverless ha le sue peculiarità.', h2_basics: 'Basi delle espressioni cron', p_5fields: 'Un\'espressione cron standard ha <strong>5 campi</strong>:', p_chars: 'Caratteri speciali comuni:', li_any: 'qualsiasi valore', li_step: 'ogni 5 unità', li_list: 'valori specifici', li_range: 'intervallo', link_test: 'Testa le tue espressioni cron con il nostro Cron Parser →', h2_gha: 'Piattaforma 1: GitHub Actions', p_gha: 'GitHub Actions usa l\'evento <code>schedule</code>.', h3_config: 'Configurazione', h3_limits: 'Limitazioni', h3_schedules: 'Pianificazioni comuni', th_aspect: 'Aspetto', th_details: 'Dettagli', gha_tz: 'Fuso orario', gha_tz_val: 'Solo UTC', gha_min: 'Intervallo min', gha_min_val: 'Ogni 5 minuti', gha_acc: 'Precisione', gha_acc_val: 'Possibile ritardo', gha_branch: 'Branch', gha_branch_val: 'Solo branch predefinito', gha_disable: 'Disattivazione', gha_disable_val: 'Dopo 60 giorni inattività', tip: 'GitHub Actions può ritardare.', h2_vercel: 'Piattaforma 2: Vercel Cron Jobs', p_vercel: 'Configurazione in <code>vercel.json</code>.', h3_api: 'Route API', th_plan: 'Piano', th_min: 'Interv. min', th_max: 'Max Cron Jobs', th_exec: 'Limite esecuzione', vercel_important: 'Vercel usa UTC. Hobby: 1/giorno.', h2_cf: 'Piattaforma 3: Cloudflare Workers', p_cf: 'Configurazione in <code>wrangler.toml</code>.', h3_worker: 'Codice Worker', cf_tz_val: 'Solo UTC', cf_min_val: '1x al minuto', cf_max_val: '3 per Worker (gratis)', cf_cpu: 'CPU', cf_cpu_val: '10ms/30s', cf_acc: 'Precisione', cf_acc_val: 'Molto affidabile', h2_cross: 'Confronto piattaforme', th_feature: 'Funzione', th_gha: 'GitHub Actions', th_vercel: 'Vercel Cron', th_cf: 'CF Workers', h2_timezone: 'Trappola fusi orari', p_timezone: 'Tutte e tre usano esclusivamente UTC.', th_local: 'Ora locale', th_offset: 'Offset UTC', th_cron: 'Cron (9h locale)', p_remember: 'L\'ora legale cambia gli offset UTC.', h2_copy: '10 espressioni cron pronte', p_here: 'Pianificazioni più comuni:', link_validate: 'Valida espressioni cron con Cron Parser →', h2_faq: 'Domande frequenti', faq1_q: 'Quale fuso orario per GitHub Actions?', faq1_a: 'Sempre UTC.', faq2_q: 'Intervallo min Vercel Cron?', faq2_a: 'Hobby: 1/giorno, Pro: 1/ora, Enterprise: 1/minuto.', faq3_q: 'Cloudflare Workers ogni secondo?', faq3_a: 'No. Granularità min: 1 minuto.',
  },
  es: { intro: 'Las expresiones cron son el lenguaje universal para programar tareas recurrentes. Cada plataforma serverless tiene sus propias peculiaridades.', h2_basics: 'Conceptos básicos de cron', p_5fields: 'Una expresión cron estándar tiene <strong>5 campos</strong>:', p_chars: 'Caracteres especiales comunes:', li_any: 'cualquier valor', li_step: 'cada 5 unidades', li_list: 'valores específicos', li_range: 'rango de valores', link_test: 'Prueba tus expresiones cron con nuestro Cron Parser →', h2_gha: 'Plataforma 1: GitHub Actions', p_gha: 'GitHub Actions usa el evento <code>schedule</code>.', h3_config: 'Configuración', h3_limits: 'Limitaciones', h3_schedules: 'Horarios comunes', th_aspect: 'Aspecto', th_details: 'Detalles', gha_tz: 'Zona horaria', gha_tz_val: 'Solo UTC', gha_min: 'Intervalo mín', gha_min_val: 'Cada 5 minutos', gha_acc: 'Precisión', gha_acc_val: 'Posible retraso', gha_branch: 'Branch', gha_branch_val: 'Solo branch por defecto', gha_disable: 'Desactivación', gha_disable_val: 'Tras 60 días inactividad', tip: 'GitHub Actions puede retrasarse.', h2_vercel: 'Plataforma 2: Vercel Cron Jobs', p_vercel: 'Configuración en <code>vercel.json</code>.', h3_api: 'Ruta API', th_plan: 'Plan', th_min: 'Int. mín', th_max: 'Max Cron Jobs', th_exec: 'Límite ejecución', vercel_important: 'Vercel usa UTC. Hobby: 1/día.', h2_cf: 'Plataforma 3: Cloudflare Workers', p_cf: 'Configuración en <code>wrangler.toml</code>.', h3_worker: 'Código Worker', cf_tz_val: 'Solo UTC', cf_min_val: '1x por minuto', cf_max_val: '3 por Worker (gratis)', cf_cpu: 'CPU', cf_cpu_val: '10ms/30s', cf_acc: 'Precisión', cf_acc_val: 'Muy fiable', h2_cross: 'Comparación plataformas', th_feature: 'Característica', th_gha: 'GitHub Actions', th_vercel: 'Vercel Cron', th_cf: 'CF Workers', h2_timezone: 'Trampa de zonas horarias', p_timezone: 'Las tres usan exclusivamente UTC.', th_local: 'Hora local', th_offset: 'Desplazamiento UTC', th_cron: 'Cron (9h local)', p_remember: 'El horario de verano cambia los offsets UTC.', h2_copy: '10 expresiones cron listas', p_here: 'Horarios más comunes:', link_validate: 'Valida expresiones cron con Cron Parser →', h2_faq: 'Preguntas frecuentes', faq1_q: '¿Qué zona horaria usa GitHub Actions?', faq1_a: 'Siempre UTC.', faq2_q: '¿Intervalo mín de Vercel Cron?', faq2_a: 'Hobby: 1/día, Pro: 1/hora, Enterprise: 1/minuto.', faq3_q: '¿Cloudflare Workers cada segundo?', faq3_a: 'No. Granularidad mín: 1 minuto.',
  },
  zh: { intro: 'Cron 表达式是调度重复任务的通用语言。从传统 <code>crontab</code> 迁移到 Serverless 平台时，各平台都有各自的限制和语法差异。本指南涵盖三大主流 Serverless 平台的 Cron 调度配置。', h2_basics: 'Cron 表达式基础（60 秒速览）', p_5fields: '标准 cron 表达式包含 <strong>5 个字段</strong>：', p_chars: '常用特殊字符：', li_any: '任意值', li_step: '每 5 个单位（步进）', li_list: '指定值（列表）', li_range: '值范围', link_test: '使用我们的 Cron 解析器测试表达式 →', h2_gha: '平台 1：GitHub Actions', p_gha: 'GitHub Actions 使用 <code>schedule</code> 事件，采用标准 5 字段 cron 语法。定时工作流仅在默认分支运行。', h3_config: '配置', h3_limits: '关键限制', h3_schedules: 'GitHub Actions 常用调度', th_aspect: '方面', th_details: '详情', gha_tz: '时区', gha_tz_val: '仅 UTC', gha_min: '最小间隔', gha_min_val: '每 5 分钟', gha_acc: '准确性', gha_acc_val: '高峰时可能延迟 5-15 分钟', gha_branch: '分支', gha_branch_val: '仅默认分支', gha_disable: '停用条件', gha_disable_val: '仓库 60 天无活动后自动停用', tip: 'GitHub Actions 定时工作流可能无法准时触发。如需精确控制，建议使用外部调度器的 webhook 触发。', h2_vercel: '平台 2：Vercel Cron Jobs', p_vercel: 'Vercel Cron Jobs 按计划触发 Serverless 函数。在 <code>vercel.json</code> 中配置。', h3_api: 'API 路由', th_plan: '套餐', th_min: '最小间隔', th_max: '最大 Cron 任务数', th_exec: '执行时限', vercel_important: 'Vercel Cron 使用 UTC。Hobby 套餐每天最多一次，像 */5 * * * * 的表达式不会按预期工作。', h2_cf: '平台 3：Cloudflare Workers（Cron Triggers）', p_cf: 'Cloudflare Workers Cron Triggers 在 <code>wrangler.toml</code> 中配置，在全球边缘运行。', h3_worker: 'Worker 代码', cf_tz_val: '仅 UTC', cf_min_val: '每分钟一次', cf_max_val: '每 Worker 3 个（免费版）', cf_cpu: 'CPU 时间', cf_cpu_val: '10ms（免费）/30s（付费）', cf_acc: '准确性', cf_acc_val: '非常可靠，边缘执行', h2_cross: '跨平台对比', th_feature: '特性', th_gha: 'GitHub Actions', th_vercel: 'Vercel Cron', th_cf: 'CF Workers', h2_timezone: '常见时区陷阱', p_timezone: '三个平台都 exclusively 使用 UTC，这是配置 cron 时最常见的 bug 来源。以下是常用时区的 UTC 转换表：', th_local: '本地时间', th_offset: 'UTC 偏移', th_cron: 'Cron（本地 9 点）', p_remember: '注意：夏令时会改变 UTC 偏移。EST（UTC-5）在夏季变为 EDT（UTC-4）。Cron 任务不会自动调整。', h2_copy: '10 个即用 Cron 表达式', p_here: '以下是常用调度示例，可直接复制：', link_validate: '使用 Cron 解析器验证表达式 →', h2_faq: '常见问题', faq1_q: 'GitHub Actions cron 使用什么时区？', faq1_a: 'GitHub Actions 始终使用 UTC，无法更改。如需美东 9 点运行，需转换为 UTC（1PM 或 2PM，视夏令时而定）。', faq2_q: 'Vercel Cron Jobs 的最小间隔是多少？', faq2_a: 'Hobby（免费）：每天 1 次；Pro：每小时 1 次；Enterprise：每分钟 1 次。', faq3_q: 'Cloudflare Workers Cron 能否每秒运行？', faq3_a: '不能。Cloudflare Workers 最小粒度为 1 分钟。如需亚分钟级调度，需使用 Durable Objects 的 alarm() API。',
  },
  id: { intro: 'Ekspresi cron adalah bahasa universal untuk menjadwalkan tugas berulang. Setiap platform serverless punya batasan sendiri.', h2_basics: 'Dasar Ekspresi Cron', p_5fields: 'Ekspresi cron standar punya <strong>5 field</strong>:', p_chars: 'Karakter khusus umum:', li_any: 'nilai apapun', li_step: 'setiap 5 unit', li_list: 'nilai spesifik', li_range: 'rentang nilai', link_test: 'Uji ekspresi cron dengan Cron Parser kami →', h2_gha: 'Platform 1: GitHub Actions', p_gha: 'GitHub Actions memakai event <code>schedule</code>.', h3_config: 'Konfigurasi', h3_limits: 'Batasan Utama', h3_schedules: 'Jadwal Umum', th_aspect: 'Aspek', th_details: 'Detail', gha_tz: 'Zona waktu', gha_tz_val: 'Hanya UTC', gha_min: 'Interval min', gha_min_val: 'Setiap 5 menit', gha_acc: 'Akurasi', gha_acc_val: 'Bisa tertunda', gha_branch: 'Branch', gha_branch_val: 'Hanya branch default', gha_disable: 'Nonaktif', gha_disable_val: 'Setelah 60 hari tidak aktif', tip: 'GitHub Actions bisa terlambat.', h2_vercel: 'Platform 2: Vercel Cron Jobs', p_vercel: 'Konfigurasi di <code>vercel.json</code>.', h3_api: 'API Route', th_plan: 'Plan', th_min: 'Int. Min', th_max: 'Max Cron Jobs', th_exec: 'Limit Eksekusi', vercel_important: 'Vercel pakai UTC. Hobby: 1/hari.', h2_cf: 'Platform 3: Cloudflare Workers', p_cf: 'Konfigurasi di <code>wrangler.toml</code>.', h3_worker: 'Kode Worker', cf_tz_val: 'Hanya UTC', cf_min_val: '1x per menit', cf_max_val: '3 per Worker (gratis)', cf_cpu: 'CPU', cf_cpu_val: '10ms/30s', cf_acc: 'Akurasi', cf_acc_val: 'Sangat andal', h2_cross: 'Perbandingan Platform', th_feature: 'Fitur', th_gha: 'GitHub Actions', th_vercel: 'Vercel Cron', th_cf: 'CF Workers', h2_timezone: 'Jebakan Zona Waktu', p_timezone: 'Ketiga platform pakai UTC eksklusif.', th_local: 'Waktu Lokal', th_offset: 'Offset UTC', th_cron: 'Cron (9 pagi lokal)', p_remember: 'Waktu musim panas mengubah offset UTC.', h2_copy: '10 Ekspresi Cron Siap Pakai', p_here: 'Jadwal paling umum:', link_validate: 'Validasi ekspresi cron dengan Cron Parser →', h2_faq: 'Pertanyaan Umum', faq1_q: 'Zona waktu apa untuk GitHub Actions?', faq1_a: 'Selalu UTC.', faq2_q: 'Interval min Vercel Cron?', faq2_a: 'Hobby: 1/hari, Pro: 1/jam, Enterprise: 1/menit.', faq3_q: 'Cloudflare Workers tiap detik?', faq3_a: 'Tidak. Granularitas min: 1 menit.',
  },
  th: { intro: 'Cron expression คือภาษาสากลสำหรับการกำหนดตารางงาน แต่แพลตฟอร์ม serverless แต่ละแห่งมีข้อจำกัดต่างกัน', h2_basics: 'พื้นฐาน Cron Expression', p_5fields: 'Cron มาตรฐานมี <strong>5 ฟิลด์</strong>:', p_chars: 'ตัวอักษรพิเศษที่พบบ่อย:', li_any: 'ค่าใดก็ได้', li_step: 'ทุก 5 หน่วย', li_list: 'ค่าเฉพาะ', li_range: 'ช่วงค่า', link_test: 'ทดสอบ cron ด้วย Cron Parser ของเรา →', h2_gha: 'แพลตฟอร์ม 1: GitHub Actions', p_gha: 'GitHub Actions ใช้ event <code>schedule</code>.', h3_config: 'การกำหนดค่า', h3_limits: 'ข้อจำกัดหลัก', h3_schedules: 'ตารางที่พบบ่อย', th_aspect: 'ด้าน', th_details: 'รายละเอียด', gha_tz: 'เขตเวลา', gha_tz_val: 'UTC เท่านั้น', gha_min: 'ช่วงต่ำสุด', gha_min_val: 'ทุก 5 นาที', gha_acc: 'ความแม่นยำ', gha_acc_val: 'อาจล่าช้าได้', gha_branch: 'Branch', gha_branch_val: 'เฉพาะ branch หลัก', gha_disable: 'ปิดการใช้งาน', gha_disable_val: 'หลัง 60 วันไม่ใช้งาน', tip: 'GitHub Actions อาจไม่ตรงเวลา.', h2_vercel: 'แพลตฟอร์ม 2: Vercel Cron Jobs', p_vercel: 'กำหนดค่าใน <code>vercel.json</code>.', h3_api: 'API Route', th_plan: 'แผน', th_min: 'ช่วงต่ำสุด', th_max: 'Max Cron Jobs', th_exec: 'จำกัดการรัน', vercel_important: 'Vercel ใช้ UTC. Hobby: 1/วัน.', h2_cf: 'แพลตฟอร์ม 3: Cloudflare Workers', p_cf: 'กำหนดค่าใน <code>wrangler.toml</code>.', h3_worker: 'Worker Code', cf_tz_val: 'UTC เท่านั้น', cf_min_val: '1 ครั้ง/นาที', cf_max_val: '3 ต่อ Worker (ฟรี)', cf_cpu: 'CPU', cf_cpu_val: '10ms/30s', cf_acc: 'ความแม่นยำ', cf_acc_val: 'เชื่อถือได้สูง', h2_cross: 'เปรียบเทียบแพลตฟอร์ม', th_feature: 'ฟีเจอร์', th_gha: 'GitHub Actions', th_vercel: 'Vercel Cron', th_cf: 'CF Workers', h2_timezone: 'กับดักเขตเวลา', p_timezone: 'ทั้งสามใช้ UTC เท่านั้น.', th_local: 'เวลาท้องถิ่น', th_offset: 'UTC Offset', th_cron: 'Cron (9 โมงท้องถิ่น)', p_remember: 'เวลาออมแสงเปลี่ยน offset UTC.', h2_copy: '10 Cron Expression พร้อมใช้', p_here: 'ตารางที่ใช้บ่อย:', link_validate: 'ตรวจสอบ cron ด้วย Cron Parser →', h2_faq: 'คำถามที่พบบ่อย', faq1_q: 'GitHub Actions ใช้เขตเวลาใด?', faq1_a: 'UTC เสมอ.', faq2_q: 'ช่วงต่ำสุด Vercel Cron?', faq2_a: 'Hobby: 1/วัน, Pro: 1/ชม., Enterprise: 1/นาที.', faq3_q: 'Cloudflare Workers ทุกวินาที?', faq3_a: 'ไม่ได้. ความละเอียดต่ำสุด: 1 นาที.',
  },
};

export default function CronServerless({ lang }: { lang: string }) {
  const c = cronT[lang] || cronT['en'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: c.faq1_q, acceptedAnswer: { '@type': 'Answer', text: c.faq1_a } },
      { '@type': 'Question', name: c.faq2_q, acceptedAnswer: { '@type': 'Answer', text: c.faq2_a } },
      { '@type': 'Question', name: c.faq3_q, acceptedAnswer: { '@type': 'Answer', text: c.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: c.intro }} />

      <h2>{c.h2_basics}</h2>
      <p dangerouslySetInnerHTML={{ __html: c.p_5fields }} />
      <pre><code>{`┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-6, Sun=0)
│ │ │ │ │
* * * * *`}</code></pre>
      <p>{c.p_chars}</p>
      <ul>
        <li><code>*</code> — {c.li_any}</li>
        <li><code>*/5</code> — {c.li_step}</li>
        <li><code>1,3,5</code> — {c.li_list}</li>
        <li><code>1-5</code> — {c.li_range}</li>
      </ul>
      <p>
        <Link href={`/${lang}/tools/cron-parser`} style={{ fontWeight: 600 }}>
          {c.link_test}
        </Link>
      </p>

      <h2>{c.h2_gha}</h2>
      <p dangerouslySetInnerHTML={{ __html: c.p_gha }} />

      <h3>{c.h3_config}</h3>
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

      <h3>{c.h3_limits}</h3>
      <table>
        <thead>
          <tr><th>{c.th_aspect}</th><th>{c.th_details}</th></tr>
        </thead>
        <tbody>
          <tr><td>{c.gha_tz}</td><td>{c.gha_tz_val}</td></tr>
          <tr><td>{c.gha_min}</td><td>{c.gha_min_val} (<code>*/5 * * * *</code>)</td></tr>
          <tr><td>{c.gha_acc}</td><td>{c.gha_acc_val}</td></tr>
          <tr><td>{c.gha_branch}</td><td>{c.gha_branch_val}</td></tr>
          <tr><td>{c.gha_disable}</td><td>{c.gha_disable_val}</td></tr>
        </tbody>
      </table>

      <h3>{c.h3_schedules}</h3>
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

      <blockquote><p><strong>Tip:</strong> {c.tip}</p></blockquote>

      <h2>{c.h2_vercel}</h2>
      <p dangerouslySetInnerHTML={{ __html: c.p_vercel }} />

      <h3>{c.h3_config}</h3>
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

      <h3>{c.h3_api}</h3>
      <pre><code>{`// app/api/daily-report/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Your scheduled logic here
  await sendDailyReport();
  return NextResponse.json({ ok: true });
}

// Vercel recommends setting maxDuration for long tasks
export const maxDuration = 60; // seconds`}</code></pre>

      <h3>{c.h3_limits}</h3>
      <table>
        <thead>
          <tr><th>{c.th_plan}</th><th>{c.th_min}</th><th>{c.th_max}</th><th>{c.th_exec}</th></tr>
        </thead>
        <tbody>
          <tr><td>Hobby (free)</td><td>Once per day</td><td>2</td><td>10s</td></tr>
          <tr><td>Pro</td><td>Once per hour</td><td>40</td><td>60s (default)</td></tr>
          <tr><td>Enterprise</td><td>Once per minute</td><td>100</td><td>900s</td></tr>
        </tbody>
      </table>

      <blockquote><p><strong>Important:</strong> {c.vercel_important}</p></blockquote>

      <h2>{c.h2_cf}</h2>
      <p dangerouslySetInnerHTML={{ __html: c.p_cf }} />

      <h3>{c.h3_config}</h3>
      <pre><code>{`# wrangler.toml
name = "my-worker"
main = "src/index.ts"

[triggers]
crons = [
  "*/5 * * * *",    # Every 5 minutes
  "0 12 * * 1-5",   # Weekdays at noon UTC
  "0 0 1 * *"       # First of every month
]`}</code></pre>

      <h3>{c.h3_worker}</h3>
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

      <h3>{c.h3_limits}</h3>
      <table>
        <thead>
          <tr><th>{c.th_aspect}</th><th>{c.th_details}</th></tr>
        </thead>
        <tbody>
          <tr><td>{c.gha_tz}</td><td>{c.cf_tz_val}</td></tr>
          <tr><td>{c.gha_min}</td><td>{c.cf_min_val}</td></tr>
          <tr><td>Max cron triggers</td><td>{c.cf_max_val}</td></tr>
          <tr><td>{c.cf_cpu}</td><td>{c.cf_cpu_val}</td></tr>
          <tr><td>{c.cf_acc}</td><td>{c.cf_acc_val}</td></tr>
        </tbody>
      </table>

      <h2>{c.h2_cross}</h2>
      <table>
        <thead>
          <tr>
            <th>{c.th_feature}</th>
            <th>{c.th_gha}</th>
            <th>{c.th_vercel}</th>
            <th>{c.th_cf}</th>
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

      <h2>{c.h2_timezone}</h2>
      <p>{c.p_timezone}</p>
      <table>
        <thead>
          <tr><th>{c.th_local}</th><th>{c.th_offset}</th><th>{c.th_cron}</th></tr>
        </thead>
        <tbody>
          <tr><td>US Eastern (EST)</td><td>UTC-5</td><td><code>0 14 * * *</code></td></tr>
          <tr><td>US Pacific (PST)</td><td>UTC-8</td><td><code>0 17 * * *</code></td></tr>
          <tr><td>Central Europe (CET)</td><td>UTC+1</td><td><code>0 8 * * *</code></td></tr>
          <tr><td>China (CST)</td><td>UTC+8</td><td><code>0 1 * * *</code></td></tr>
          <tr><td>Japan (JST)</td><td>UTC+9</td><td><code>0 0 * * *</code></td></tr>
        </tbody>
      </table>
      <p><em>{c.p_remember}</em></p>

      <h2>{c.h2_copy}</h2>
      <p>{c.p_here}</p>
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
          {c.link_validate}
        </Link>
      </p>

      <div className="faq-section">
        <h2>{c.h2_faq}</h2>
        <h3>{c.faq1_q}</h3>
        <p>{c.faq1_a}</p>
        <h3>{c.faq2_q}</h3>
        <p>{c.faq2_a}</p>
        <h3>{c.faq3_q}</h3>
        <p>{c.faq3_a}</p>
      </div>
    </>
  );
}
