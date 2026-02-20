'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

/* ── Cron helpers ──────────────────────────────────────────────── */
function matchField(value: number, field: string): boolean {
  if (field === '*') return true;
  if (field.includes('/')) {
    const [base, stepStr] = field.split('/');
    const step = parseInt(stepStr);
    if (base === '*' || base === '') return value % step === 0;
    const start = parseInt(base);
    return value >= start && (value - start) % step === 0;
  }
  if (field.includes(',')) {
    return field.split(',').some(p => matchField(value, p.trim()));
  }
  if (field.includes('-')) {
    const [start, end] = field.split('-').map(Number);
    return value >= start && value <= end;
  }
  return parseInt(field) === value;
}

function matchesCron(date: Date, parts: string[]): boolean {
  const [min, hour, dom, month, dow] = parts;
  return matchField(date.getMinutes(), min)
    && matchField(date.getHours(), hour)
    && matchField(date.getDate(), dom)
    && matchField(date.getMonth() + 1, month)
    && matchField(date.getDay(), dow);
}

function getNextRuns(parts: string[], count: number): Date[] {
  const dates: Date[] = [];
  const check = new Date();
  check.setSeconds(0, 0);
  check.setMinutes(check.getMinutes() + 1);
  for (let i = 0; i < 525600 && dates.length < count; i++) {
    if (matchesCron(check, parts)) dates.push(new Date(check));
    check.setMinutes(check.getMinutes() + 1);
  }
  return dates;
}

function describeCron(parts: string[]): string {
  if (parts.length !== 5) return 'Invalid cron expression';
  const [min, hour, dom, month, dow] = parts;
  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (min === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') return 'Every minute';
  let desc = '';
  if (min.startsWith('*/')) desc += `Every ${min.slice(2)} minutes`;
  else if (min === '0' && hour === '*') desc += 'At the start of every hour';
  else if (min === '0' && hour.startsWith('*/')) desc += `Every ${hour.slice(2)} hours`;
  else if (min !== '*' && hour !== '*' && !hour.includes('/') && !hour.includes(',')) {
    desc += `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
  } else if (min !== '*') desc += `At minute ${min}`;
  else desc += 'Every minute';
  if (dom !== '*') desc += ` on day ${dom} of the month`;
  if (month !== '*') {
    const m = parseInt(month);
    desc += m > 0 && m <= 12 ? ` in ${months[m]}` : ` in month ${month}`;
  }
  if (dow !== '*') {
    if (dow === '1-5') desc += ', Monday through Friday';
    else { const d = parseInt(dow); desc += d >= 0 && d <= 6 ? ` on ${days[d]}` : ` on day-of-week ${dow}`; }
  }
  return desc || 'Custom schedule';
}

const quickSchedules = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every 5 min', cron: '*/5 * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every day', cron: '0 0 * * *' },
  { label: 'Every week', cron: '0 0 * * 0' },
  { label: 'Every month', cron: '0 0 1 * *' },
];

const commonSchedules: [string, string][] = [
  ['* * * * *', 'Every minute'],
  ['*/2 * * * *', 'Every 2 minutes'],
  ['*/5 * * * *', 'Every 5 minutes'],
  ['*/10 * * * *', 'Every 10 minutes'],
  ['*/15 * * * *', 'Every 15 minutes'],
  ['*/30 * * * *', 'Every 30 minutes'],
  ['0 * * * *', 'Every hour'],
  ['0 */2 * * *', 'Every 2 hours'],
  ['0 */6 * * *', 'Every 6 hours'],
  ['0 */12 * * *', 'Every 12 hours'],
  ['0 0 * * *', 'Daily at midnight'],
  ['0 6 * * *', 'Daily at 6 AM'],
  ['0 12 * * *', 'Daily at noon'],
  ['0 18 * * *', 'Daily at 6 PM'],
  ['0 9 * * 1-5', 'Weekdays at 9 AM'],
  ['0 0 * * 0', 'Weekly on Sunday'],
  ['0 9 * * 1', 'Weekly on Monday 9 AM'],
  ['0 0 1 * *', 'Monthly on the 1st'],
  ['0 0 15 * *', 'Monthly on the 15th'],
  ['0 0 1 1 *', 'Yearly on January 1st'],
  ['0 0 1 */3 *', 'Every quarter (1st)'],
  ['30 4 * * *', 'Daily at 4:30 AM'],
];

/* ── i18n ──────────────────────────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Cron Job Scheduler',
    description: 'Schedule cron jobs with an interactive visual editor. Preview next run times and get platform-specific code.',
    quickTitle: 'Quick Schedule',
    customTitle: 'Custom Expression',
    customPlaceholder: 'Enter cron expression (e.g. */5 * * * *)',
    parseBtn: 'Apply',
    resultTitle: 'Cron Expression',
    humanTitle: 'Schedule Description',
    nextRunsTitle: 'Next 10 Execution Times',
    tzNote: 'Times shown in your local timezone. Cron jobs on servers typically run in UTC.',
    platformTitle: 'Platform-Specific Examples',
    cheatTitle: 'Common Cron Schedules Reference',
    cheatExpression: 'Expression',
    cheatDescription: 'Description',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do I schedule a cron job?',
    faq1a: 'On Linux/macOS, run "crontab -e" to open the cron editor, then add a line with 5 time fields followed by the command. For example: "0 9 * * 1-5 /path/to/script.sh" runs a script at 9 AM on weekdays. On cloud platforms, use their specific syntax: GitHub Actions uses "schedule" with cron in YAML, AWS CloudWatch uses rate() or cron() expressions, and Kubernetes uses CronJob resources.',
    faq2q: 'Cron vs Windows Task Scheduler?',
    faq2a: 'Cron is the Unix/Linux job scheduler using 5-field expressions (minute, hour, day, month, weekday). Windows Task Scheduler uses a GUI-based approach with triggers and actions. Cron is text-based and ideal for servers, while Task Scheduler provides a visual interface. For Windows, alternatives include schtasks (CLI) and PowerShell scheduled jobs.',
    faq3q: 'What is the maximum cron frequency?',
    faq3a: 'Standard cron supports a minimum interval of 1 minute (* * * * *). For sub-minute scheduling, use alternative approaches: sleep loops in a cron job, systemd timers (Linux) which support seconds, or specialized tools like fcron. Most cloud platforms also have a minimum of 1 minute, though some support rate expressions like "rate(30 seconds)" for higher frequency.',
    relatedTitle: 'Related Cron Tools',
  },
  zh: {
    title: 'Cron 任务调度器',
    description: '使用交互式可视化编辑器调度 cron 任务。预览下次运行时间并获取平台特定代码。',
    quickTitle: '快速调度',
    customTitle: '自定义表达式',
    customPlaceholder: '输入 cron 表达式（例如 */5 * * * *）',
    parseBtn: '应用',
    resultTitle: 'Cron 表达式',
    humanTitle: '调度描述',
    nextRunsTitle: '接下来 10 次执行时间',
    tzNote: '显示的时间为您的本地时区。服务器上的 cron 任务通常在 UTC 时区运行。',
    platformTitle: '平台特定示例',
    cheatTitle: '常用 Cron 调度参考',
    cheatExpression: '表达式',
    cheatDescription: '描述',
    faqTitle: '常见问题',
    faq1q: '如何调度 cron 任务？',
    faq1a: '在 Linux/macOS 上运行 "crontab -e" 打开 cron 编辑器，然后添加 5 个时间字段加命令的行。在云平台上使用其特定语法：GitHub Actions 使用 YAML 中的 schedule，AWS CloudWatch 使用 rate() 或 cron() 表达式，Kubernetes 使用 CronJob 资源。',
    faq2q: 'Cron 与 Windows 任务计划程序的区别？',
    faq2a: 'Cron 是 Unix/Linux 任务调度器，使用 5 字段表达式。Windows 任务计划程序使用基于 GUI 的方法。Cron 基于文本，适合服务器；任务计划程序提供可视化界面。',
    faq3q: 'Cron 的最大频率是多少？',
    faq3a: '标准 cron 支持最小 1 分钟间隔（* * * * *）。对于亚分钟级调度，可以使用 sleep 循环、systemd 定时器（支持秒级）或 fcron 等专用工具。',
    relatedTitle: '相关 Cron 工具',
  },
  fr: {
    title: 'Planificateur de Taches Cron',
    description: 'Planifiez des taches cron avec un editeur visuel interactif. Apercu des prochaines executions et code specifique a chaque plateforme.',
    quickTitle: 'Planification rapide',
    customTitle: 'Expression personnalisee',
    customPlaceholder: 'Entrez une expression cron (ex. */5 * * * *)',
    parseBtn: 'Appliquer',
    resultTitle: 'Expression Cron',
    humanTitle: 'Description du planning',
    nextRunsTitle: '10 prochaines executions',
    tzNote: 'Heures affichees dans votre fuseau horaire local. Les taches cron sur les serveurs fonctionnent generalement en UTC.',
    platformTitle: 'Exemples par plateforme',
    cheatTitle: 'Reference des planifications Cron courantes',
    cheatExpression: 'Expression',
    cheatDescription: 'Description',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment planifier une tache cron ?',
    faq1a: 'Sur Linux/macOS, executez "crontab -e" pour ouvrir l\'editeur, puis ajoutez une ligne avec 5 champs de temps suivis de la commande.',
    faq2q: 'Cron vs Planificateur de taches Windows ?',
    faq2a: 'Cron est le planificateur Unix/Linux utilisant des expressions a 5 champs. Le Planificateur Windows utilise une interface graphique.',
    faq3q: 'Quelle est la frequence maximale de cron ?',
    faq3a: 'Le cron standard prend en charge un intervalle minimum de 1 minute (* * * * *). Pour une planification inferieure a la minute, utilisez des minuteries systemd ou fcron.',
    relatedTitle: 'Outils Cron associes',
  },
  de: {
    title: 'Cron Job Scheduler',
    description: 'Planen Sie Cron-Jobs mit einem interaktiven visuellen Editor. Vorschau der naechsten Ausfuehrungen und plattformspezifischer Code.',
    quickTitle: 'Schnellplanung',
    customTitle: 'Benutzerdefinierter Ausdruck',
    customPlaceholder: 'Cron-Ausdruck eingeben (z.B. */5 * * * *)',
    parseBtn: 'Anwenden',
    resultTitle: 'Cron-Ausdruck',
    humanTitle: 'Zeitplan-Beschreibung',
    nextRunsTitle: 'Naechste 10 Ausfuehrungszeiten',
    tzNote: 'Zeiten in Ihrer lokalen Zeitzone. Cron-Jobs auf Servern laufen typischerweise in UTC.',
    platformTitle: 'Plattformspezifische Beispiele',
    cheatTitle: 'Gaengige Cron-Zeitplaene Referenz',
    cheatExpression: 'Ausdruck',
    cheatDescription: 'Beschreibung',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie plane ich einen Cron-Job?',
    faq1a: 'Fuehren Sie "crontab -e" auf Linux/macOS aus und fuegen Sie eine Zeile mit 5 Zeitfeldern gefolgt vom Befehl hinzu.',
    faq2q: 'Cron vs Windows Aufgabenplanung?',
    faq2a: 'Cron ist der Unix/Linux-Jobplaner mit 5-Feld-Ausdruecken. Die Windows-Aufgabenplanung verwendet eine GUI-basierte Methode.',
    faq3q: 'Was ist die maximale Cron-Frequenz?',
    faq3a: 'Standard-Cron unterstuetzt ein Mindestintervall von 1 Minute. Fuer hoehere Frequenzen verwenden Sie systemd-Timer oder fcron.',
    relatedTitle: 'Verwandte Cron-Tools',
  },
  es: {
    title: 'Programador de Cron Jobs',
    description: 'Programa tareas cron con un editor visual interactivo. Vista previa de proximas ejecuciones y codigo especifico por plataforma.',
    quickTitle: 'Programacion rapida',
    customTitle: 'Expresion personalizada',
    customPlaceholder: 'Ingresa expresion cron (ej. */5 * * * *)',
    parseBtn: 'Aplicar',
    resultTitle: 'Expresion Cron',
    humanTitle: 'Descripcion del horario',
    nextRunsTitle: 'Proximas 10 ejecuciones',
    tzNote: 'Horas mostradas en tu zona horaria local. Las tareas cron en servidores generalmente se ejecutan en UTC.',
    platformTitle: 'Ejemplos por plataforma',
    cheatTitle: 'Referencia de horarios Cron comunes',
    cheatExpression: 'Expresion',
    cheatDescription: 'Descripcion',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como programar una tarea cron?',
    faq1a: 'En Linux/macOS, ejecuta "crontab -e" para abrir el editor y agrega una linea con 5 campos de tiempo seguidos del comando.',
    faq2q: 'Cron vs Programador de tareas de Windows?',
    faq2a: 'Cron es el programador Unix/Linux que usa expresiones de 5 campos. El Programador de Windows usa una interfaz grafica.',
    faq3q: 'Cual es la frecuencia maxima de cron?',
    faq3a: 'El cron estandar soporta un intervalo minimo de 1 minuto. Para frecuencias mas altas, usa timers de systemd o fcron.',
    relatedTitle: 'Herramientas Cron relacionadas',
  },
  ja: {
    title: 'Cron ジョブスケジューラー',
    description: 'インタラクティブなビジュアルエディターで cron ジョブをスケジュール。次回実行時間のプレビューとプラットフォーム別コード。',
    quickTitle: 'クイックスケジュール',
    customTitle: 'カスタム式',
    customPlaceholder: 'cron 式を入力（例: */5 * * * *）',
    parseBtn: '適用',
    resultTitle: 'Cron 式',
    humanTitle: 'スケジュール説明',
    nextRunsTitle: '次の10回の実行時間',
    tzNote: 'ローカルタイムゾーンで表示。サーバーの cron ジョブは通常 UTC で実行されます。',
    platformTitle: 'プラットフォーム別の例',
    cheatTitle: '一般的な Cron スケジュール参照',
    cheatExpression: '式',
    cheatDescription: '説明',
    faqTitle: 'よくある質問',
    faq1q: 'cron ジョブのスケジュール方法は？',
    faq1a: 'Linux/macOS で "crontab -e" を実行してエディターを開き、5つの時間フィールドとコマンドの行を追加します。',
    faq2q: 'Cron と Windows タスクスケジューラの違いは？',
    faq2a: 'Cron は5フィールド式を使う Unix/Linux のジョブスケジューラです。Windows タスクスケジューラは GUI ベースのアプローチを使用します。',
    faq3q: 'cron の最大頻度は？',
    faq3a: '標準 cron は最小1分間隔をサポート。秒単位のスケジューリングには systemd タイマーや fcron を使用します。',
    relatedTitle: '関連 Cron ツール',
  },
  ko: {
    title: 'Cron 작업 스케줄러',
    description: '대화형 비주얼 에디터로 cron 작업을 예약하세요. 다음 실행 시간 미리보기와 플랫폼별 코드 제공.',
    quickTitle: '빠른 스케줄',
    customTitle: '사용자 정의 표현식',
    customPlaceholder: 'cron 표현식 입력 (예: */5 * * * *)',
    parseBtn: '적용',
    resultTitle: 'Cron 표현식',
    humanTitle: '스케줄 설명',
    nextRunsTitle: '다음 10회 실행 시간',
    tzNote: '로컬 시간대로 표시됩니다. 서버의 cron 작업은 일반적으로 UTC에서 실행됩니다.',
    platformTitle: '플랫폼별 예제',
    cheatTitle: '일반적인 Cron 스케줄 참조',
    cheatExpression: '표현식',
    cheatDescription: '설명',
    faqTitle: '자주 묻는 질문',
    faq1q: 'cron 작업을 예약하는 방법은?',
    faq1a: 'Linux/macOS에서 "crontab -e"를 실행하여 편집기를 열고, 5개의 시간 필드와 명령어를 추가합니다.',
    faq2q: 'Cron vs Windows 작업 스케줄러?',
    faq2a: 'Cron은 5필드 표현식을 사용하는 Unix/Linux 작업 스케줄러입니다. Windows 작업 스케줄러는 GUI 기반 접근 방식을 사용합니다.',
    faq3q: 'cron의 최대 빈도는?',
    faq3a: '표준 cron은 최소 1분 간격을 지원합니다. 초 단위 스케줄링은 systemd 타이머나 fcron을 사용하세요.',
    relatedTitle: '관련 Cron 도구',
  },
};

export default function CronJobScheduler() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dom, setDom] = useState('*');
  const [month, setMonth] = useState('*');
  const [dow, setDow] = useState('*');
  const [customInput, setCustomInput] = useState('');

  const expression = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const parts = expression.split(' ');
  const description = useMemo(() => describeCron(parts), [expression]);
  const nextRuns = useMemo(() => getNextRuns(parts, 10), [expression]);

  const applyPreset = (cron: string) => {
    const p = cron.split(' ');
    setMinute(p[0]); setHour(p[1]); setDom(p[2]); setMonth(p[3]); setDow(p[4]);
  };

  const applyCustom = () => {
    const p = customInput.trim().split(/\s+/);
    if (p.length === 5) {
      setMinute(p[0]); setHour(p[1]); setDom(p[2]); setMonth(p[3]); setDow(p[4]);
    }
  };

  const fieldStyle = { padding: '8px 12px', fontSize: 14, width: 90, textAlign: 'center' as const, fontFamily: 'monospace' };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="cron-job-scheduler">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Quick schedule buttons */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{t.quickTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {quickSchedules.map(s => (
            <button key={s.cron} onClick={() => applyPreset(s.cron)}
              style={{ padding: '6px 14px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: expression === s.cron ? 'var(--accent-color)' : 'var(--bg-input)', color: expression === s.cron ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{t.customTitle}</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input value={customInput} onChange={e => setCustomInput(e.target.value)}
            placeholder={t.customPlaceholder}
            style={{ flex: 1, padding: '8px 12px', fontSize: 14, fontFamily: 'monospace' }}
            onKeyDown={e => e.key === 'Enter' && applyCustom()} />
          <button onClick={applyCustom} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>{t.parseBtn}</button>
        </div>
      </div>

      {/* Field editors */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Minute', value: minute, set: setMinute },
          { label: 'Hour', value: hour, set: setHour },
          { label: 'Day (Month)', value: dom, set: setDom },
          { label: 'Month', value: month, set: setMonth },
          { label: 'Day (Week)', value: dow, set: setDow },
        ].map(f => (
          <div key={f.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.label}</label>
            <input value={f.value} onChange={e => f.set(e.target.value)} style={fieldStyle} />
          </div>
        ))}
      </div>

      {/* Result */}
      <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 20, border: '1px solid var(--border-color)', marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{t.resultTitle}</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <code style={{ fontSize: 26, fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-color)', letterSpacing: 2 }}>{expression}</code>
          <CopyButton text={expression} />
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.humanTitle}</div>
        <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>{description}</p>
      </div>

      {/* Next 10 runs */}
      {nextRuns.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{t.nextRunsTitle}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 4 }}>
            {nextRuns.map((run, i) => (
              <div key={i} style={{ padding: '6px 12px', fontSize: 13, fontFamily: 'monospace', background: 'var(--bg-input)', borderRadius: 4, border: '1px solid var(--border-color)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--accent-color)', fontWeight: 700, minWidth: 20 }}>#{i + 1}</span>
                <span>{run.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8, fontStyle: 'italic' }}>{t.tzNote}</p>
        </div>
      )}

      {/* Platform-specific examples */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t.platformTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Linux crontab */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Linux crontab</span>
              <CopyButton text={`${expression} /path/to/script.sh`} />
            </div>
            <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 14, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', margin: 0 }}>
              <code>{`# Edit with: crontab -e\n${expression} /path/to/script.sh`}</code>
            </pre>
          </div>
          {/* GitHub Actions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>GitHub Actions</span>
              <CopyButton text={`on:\n  schedule:\n    - cron: '${expression}'`} />
            </div>
            <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 14, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', margin: 0 }}>
              <code>{`on:\n  schedule:\n    - cron: '${expression}'`}</code>
            </pre>
          </div>
          {/* AWS CloudWatch */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>AWS CloudWatch Events</span>
              <CopyButton text={`cron(${minute} ${hour} ${dom} ${month} ? ${dow === '*' ? '*' : dow})`} />
            </div>
            <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 14, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', margin: 0 }}>
              <code>{`# AWS uses 6 fields (adds year) and ? for day-of-month/day-of-week\ncron(${minute} ${hour} ${dom} ${month} ? ${dow === '*' ? '*' : dow})`}</code>
            </pre>
          </div>
          {/* Kubernetes CronJob */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Kubernetes CronJob</span>
              <CopyButton text={`apiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: my-cronjob\nspec:\n  schedule: "${expression}"\n  jobTemplate:\n    spec:\n      template:\n        spec:\n          containers:\n          - name: my-job\n            image: busybox\n            command: ["/bin/sh", "-c", "echo Hello"]`} />
            </div>
            <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 14, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', margin: 0 }}>
              <code>{`apiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: my-cronjob\nspec:\n  schedule: "${expression}"\n  jobTemplate:\n    spec:\n      template:\n        spec:\n          containers:\n          - name: my-job\n            image: busybox\n            command: ["/bin/sh", "-c", "echo Hello"]`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Cheat sheet — 22 common schedules */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.cheatExpression}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.cheatDescription}</th>
              </tr>
            </thead>
            <tbody>
              {commonSchedules.map(([expr, desc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}
                  onClick={() => applyPreset(expr)}>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 500 }}>{expr}</td>
                  <td style={{ padding: '6px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Related Tools */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/cron-generator`, label: 'Cron Expression Generator' },
            { href: `/${lang}/tools/cron-parser`, label: 'Cron Expression Parser' },
            { href: `/${lang}/tools/crontab-generator`, label: 'Crontab Generator' },
            { href: `/${lang}/tools/cron-expression-parser`, label: 'Cron Expression Explainer' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
