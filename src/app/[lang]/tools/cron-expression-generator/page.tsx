'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const presets = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: 'Every 30 minutes', cron: '*/30 * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every 6 hours', cron: '0 */6 * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every day at noon', cron: '0 12 * * *' },
  { label: 'Every Monday at 9am', cron: '0 9 * * 1' },
  { label: 'Every weekday at 9am', cron: '0 9 * * 1-5' },
  { label: 'First day of month', cron: '0 0 1 * *' },
  { label: 'Every Sunday at 6pm', cron: '0 18 * * 0' },
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function describeCron(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return 'Invalid cron expression (expected 5 fields)';
  const [minute, hour, dom, month, dow] = parts;
  const segments: string[] = [];

  if (minute === '*' && hour === '*') segments.push('Every minute');
  else if (minute.startsWith('*/')) segments.push(`Every ${minute.slice(2)} minutes`);
  else if (hour === '*') segments.push(`At minute ${minute} of every hour`);
  else if (minute === '0' && !hour.includes(',') && !hour.includes('-') && !hour.includes('/')) {
    const h = parseInt(hour);
    segments.push(`At ${h.toString().padStart(2, '0')}:00`);
  } else if (hour.startsWith('*/')) segments.push(`Every ${hour.slice(2)} hours at minute ${minute}`);
  else segments.push(`At ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`);

  if (dom !== '*') {
    if (dom.includes(',')) segments.push(`on days ${dom} of the month`);
    else if (dom.includes('-')) segments.push(`on days ${dom} of the month`);
    else segments.push(`on day ${dom} of the month`);
  }
  if (month !== '*') {
    if (month.includes(',')) segments.push(`in months ${month}`);
    else {
      const mi = parseInt(month);
      segments.push(`in ${mi >= 1 && mi <= 12 ? monthNames[mi - 1] : month}`);
    }
  }
  if (dow !== '*') {
    if (dow === '1-5') segments.push('on weekdays (Mon-Fri)');
    else if (dow === '0,6') segments.push('on weekends');
    else if (dow.includes(',')) segments.push(`on days ${dow}`);
    else {
      const di = parseInt(dow);
      segments.push(`on ${di >= 0 && di <= 6 ? dayNames[di] : dow}`);
    }
  }
  return segments.join(', ');
}

function getNextRuns(cron: string, count: number = 5): Date[] {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const [minF, hourF, domF, monF, dowF] = parts;
  const results: Date[] = [];
  const now = new Date();
  const cursor = new Date(now.getTime() + 60000);
  cursor.setSeconds(0, 0);

  const matchField = (field: string, value: number, max: number): boolean => {
    if (field === '*') return true;
    if (field.startsWith('*/')) return value % parseInt(field.slice(2)) === 0;
    if (field.includes(',')) return field.split(',').map(Number).includes(value);
    if (field.includes('-')) {
      const [a, b] = field.split('-').map(Number);
      return value >= a && value <= b;
    }
    return parseInt(field) === value;
  };

  for (let i = 0; i < 525600 && results.length < count; i++) {
    const m = cursor.getMinutes(), h = cursor.getHours(), d = cursor.getDate(), mo = cursor.getMonth() + 1, wd = cursor.getDay();
    if (matchField(minF, m, 59) && matchField(hourF, h, 23) && matchField(domF, d, 31) && matchField(monF, mo, 12) && matchField(dowF, wd, 6)) {
      results.push(new Date(cursor));
    }
    cursor.setTime(cursor.getTime() + 60000);
  }
  return results;
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Cron Expression Generator',
    description: 'Generate and build cron expressions visually. Select presets, see human-readable descriptions, and preview next run times.',
    cronLabel: 'Cron Expression',
    cronPlaceholder: '* * * * *',
    presetsTitle: 'Common Presets',
    descriptionTitle: 'Human-readable Description',
    nextRunsTitle: 'Next 5 Run Times',
    fieldsTitle: 'Cron Fields',
    minuteField: 'Minute (0-59)',
    hourField: 'Hour (0-23)',
    domField: 'Day of Month (1-31)',
    monthField: 'Month (1-12)',
    dowField: 'Day of Week (0-6)',
    introTitle: 'Free Online Cron Expression Generator',
    introText: 'This cron expression generator helps you build cron schedules without memorizing the syntax. Select from common presets like "every 5 minutes" or "every weekday at 9am", or build custom expressions field by field. The generator shows a human-readable description of your cron expression and previews the next 5 run times so you can verify the schedule is correct before deploying it to your crontab, Kubernetes CronJob, GitHub Actions, or any other cron-based scheduler.',
    syntaxTitle: 'Cron Syntax Reference',
    field: 'Field',
    allowed: 'Allowed Values',
    special: 'Special Characters',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a cron expression?',
    faq1a: 'A cron expression is a string of five fields separated by spaces that defines a schedule for recurring tasks. The fields represent minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Special characters like * (any), */n (every n), commas (list), and hyphens (range) allow flexible scheduling. Cron is used in Unix/Linux crontab, Kubernetes CronJobs, GitHub Actions, AWS CloudWatch, and many CI/CD tools.',
    faq2q: 'How do I schedule a cron job every 5 minutes?',
    faq2a: 'Use the expression */5 * * * *. The */5 in the minute field means "every 5 minutes". The asterisks in the remaining fields mean "every hour, every day, every month, every day of the week". This is one of the most common cron patterns for monitoring, health checks, and data synchronization tasks.',
    faq3q: 'What is the difference between cron and crontab?',
    faq3a: 'Cron is the daemon (background service) that executes scheduled tasks on Unix/Linux systems. Crontab (cron table) is the configuration file where you define your scheduled tasks. Each line in a crontab file contains a cron expression followed by the command to execute. You edit your crontab with the command "crontab -e".',
    faq4q: 'Can I use cron expressions in cloud services?',
    faq4a: 'Yes. AWS CloudWatch Events/EventBridge, Google Cloud Scheduler, Azure Functions, GitHub Actions, GitLab CI/CD, Kubernetes CronJobs, and Vercel Cron Jobs all support cron expressions. Note that some services use 6-field expressions (adding seconds) or have slight syntax variations, so check the documentation for your specific platform.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Cron 表达式生成器',
    description: '可视化生成和构建 cron 表达式。选择预设，查看可读描述，预览下次执行时间。',
    cronLabel: 'Cron 表达式', cronPlaceholder: '* * * * *',
    presetsTitle: '常用预设', descriptionTitle: '可读描述', nextRunsTitle: '下 5 次执行时间',
    fieldsTitle: 'Cron 字段',
    minuteField: '分钟 (0-59)', hourField: '小时 (0-23)', domField: '日 (1-31)', monthField: '月 (1-12)', dowField: '星期 (0-6)',
    introTitle: '免费在线 Cron 表达式生成器',
    introText: '这个 cron 表达式生成器帮助您无需记忆语法即可构建 cron 调度。从常用预设中选择或逐字段构建自定义表达式。生成器显示可读描述并预览下 5 次执行时间。',
    syntaxTitle: 'Cron 语法参考', field: '字段', allowed: '允许值', special: '特殊字符',
    faqTitle: '常见问题',
    faq1q: '什么是 cron 表达式？', faq1a: 'Cron 表达式是由空格分隔的五个字段组成的字符串，用于定义周期性任务的调度。字段分别代表分钟、小时、日、月和星期。',
    faq2q: '如何设置每 5 分钟执行一次？', faq2a: '使用表达式 */5 * * * *。分钟字段的 */5 表示"每 5 分钟"。',
    faq3q: 'cron 和 crontab 有什么区别？', faq3a: 'Cron 是执行定时任务的后台服务。Crontab 是定义定时任务的配置文件。',
    faq4q: '云服务支持 cron 表达式吗？', faq4a: '是的，AWS CloudWatch、Google Cloud Scheduler、Azure Functions、GitHub Actions、Kubernetes CronJobs 等都支持 cron 表达式。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur d\'Expression Cron',
    description: 'Generez et construisez des expressions cron visuellement. Selectionnez des presets et previsualiser les prochaines executions.',
    cronLabel: 'Expression Cron', cronPlaceholder: '* * * * *',
    presetsTitle: 'Presets courants', descriptionTitle: 'Description lisible', nextRunsTitle: '5 prochaines executions',
    fieldsTitle: 'Champs Cron',
    minuteField: 'Minute (0-59)', hourField: 'Heure (0-23)', domField: 'Jour du mois (1-31)', monthField: 'Mois (1-12)', dowField: 'Jour de la semaine (0-6)',
    introTitle: 'Generateur d\'expression cron gratuit', introText: 'Ce generateur cron vous aide a construire des expressions cron sans memoriser la syntaxe.',
    syntaxTitle: 'Reference syntaxe cron', field: 'Champ', allowed: 'Valeurs', special: 'Caracteres speciaux',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'une expression cron ?', faq1a: 'Une expression cron est une chaine de 5 champs definissant une planification.',
    faq2q: 'Comment planifier toutes les 5 minutes ?', faq2a: 'Utilisez */5 * * * *.',
    faq3q: 'Difference entre cron et crontab ?', faq3a: 'Cron est le service, crontab est le fichier de configuration.',
    faq4q: 'Les services cloud supportent-ils cron ?', faq4a: 'Oui, AWS, GCP, Azure, GitHub Actions et Kubernetes supportent les expressions cron.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Cron-Ausdruck Generator',
    description: 'Cron-Ausdruecke visuell erstellen. Presets waehlen, Beschreibungen sehen und naechste Ausfuehrungszeiten anzeigen.',
    cronLabel: 'Cron-Ausdruck', cronPlaceholder: '* * * * *',
    presetsTitle: 'Gaeufige Presets', descriptionTitle: 'Lesbare Beschreibung', nextRunsTitle: 'Naechste 5 Ausfuehrungen',
    fieldsTitle: 'Cron-Felder',
    minuteField: 'Minute (0-59)', hourField: 'Stunde (0-23)', domField: 'Tag des Monats (1-31)', monthField: 'Monat (1-12)', dowField: 'Wochentag (0-6)',
    introTitle: 'Kostenloser Cron-Ausdruck Generator', introText: 'Dieser Generator hilft Ihnen, Cron-Ausdruecke ohne Syntaxkenntnisse zu erstellen.',
    syntaxTitle: 'Cron-Syntax Referenz', field: 'Feld', allowed: 'Erlaubte Werte', special: 'Sonderzeichen',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein Cron-Ausdruck?', faq1a: 'Ein Cron-Ausdruck besteht aus 5 Feldern, die einen Zeitplan definieren.',
    faq2q: 'Wie plant man alle 5 Minuten?', faq2a: 'Verwenden Sie */5 * * * *.',
    faq3q: 'Unterschied zwischen cron und crontab?', faq3a: 'Cron ist der Dienst, crontab ist die Konfigurationsdatei.',
    faq4q: 'Unterstuetzen Cloud-Dienste cron?', faq4a: 'Ja, AWS, GCP, Azure, GitHub Actions und Kubernetes unterstuetzen Cron-Ausdruecke.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Expresiones Cron',
    description: 'Genera y construye expresiones cron visualmente. Selecciona presets y previsualiza las proximas ejecuciones.',
    cronLabel: 'Expresion Cron', cronPlaceholder: '* * * * *',
    presetsTitle: 'Presets comunes', descriptionTitle: 'Descripcion legible', nextRunsTitle: 'Proximas 5 ejecuciones',
    fieldsTitle: 'Campos Cron',
    minuteField: 'Minuto (0-59)', hourField: 'Hora (0-23)', domField: 'Dia del mes (1-31)', monthField: 'Mes (1-12)', dowField: 'Dia de la semana (0-6)',
    introTitle: 'Generador de expresiones cron gratuito', introText: 'Este generador cron te ayuda a construir expresiones sin memorizar la sintaxis.',
    syntaxTitle: 'Referencia de sintaxis cron', field: 'Campo', allowed: 'Valores', special: 'Caracteres especiales',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es una expresion cron?', faq1a: 'Una expresion cron es una cadena de 5 campos que define una programacion.',
    faq2q: 'Como programar cada 5 minutos?', faq2a: 'Usa */5 * * * *.',
    faq3q: 'Diferencia entre cron y crontab?', faq3a: 'Cron es el servicio, crontab es el archivo de configuracion.',
    faq4q: 'Los servicios cloud soportan cron?', faq4a: 'Si, AWS, GCP, Azure, GitHub Actions y Kubernetes soportan expresiones cron.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'Cron 式ジェネレーター',
    description: 'Cron 式をビジュアルに生成・構築。プリセット選択、説明表示、次回実行時間のプレビュー。',
    cronLabel: 'Cron 式', cronPlaceholder: '* * * * *',
    presetsTitle: 'よく使うプリセット', descriptionTitle: '読みやすい説明', nextRunsTitle: '次の 5 回の実行時間',
    fieldsTitle: 'Cron フィールド',
    minuteField: '分 (0-59)', hourField: '時 (0-23)', domField: '日 (1-31)', monthField: '月 (1-12)', dowField: '曜日 (0-6)',
    introTitle: '無料オンライン Cron 式ジェネレーター', introText: 'この Cron ジェネレーターで構文を覚えずに Cron スケジュールを構築できます。',
    syntaxTitle: 'Cron 構文リファレンス', field: 'フィールド', allowed: '許容値', special: '特殊文字',
    faqTitle: 'よくある質問',
    faq1q: 'Cron 式とは？', faq1a: 'Cron 式は 5 つのフィールドからなるスケジュール定義文字列です。',
    faq2q: '5 分ごとにスケジュールするには？', faq2a: '*/5 * * * * を使用します。',
    faq3q: 'cron と crontab の違いは？', faq3a: 'cron はサービス、crontab は設定ファイルです。',
    faq4q: 'クラウドサービスは cron をサポート？', faq4a: 'はい、AWS、GCP、Azure、GitHub Actions、Kubernetes が Cron 式をサポートしています。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Cron 표현식 생성기',
    description: 'Cron 표현식을 시각적으로 생성하고 구축합니다. 프리셋 선택, 설명 확인, 다음 실행 시간 미리보기.',
    cronLabel: 'Cron 표현식', cronPlaceholder: '* * * * *',
    presetsTitle: '일반 프리셋', descriptionTitle: '읽기 쉬운 설명', nextRunsTitle: '다음 5회 실행 시간',
    fieldsTitle: 'Cron 필드',
    minuteField: '분 (0-59)', hourField: '시 (0-23)', domField: '일 (1-31)', monthField: '월 (1-12)', dowField: '요일 (0-6)',
    introTitle: '무료 온라인 Cron 표현식 생성기', introText: '이 Cron 생성기로 구문을 외우지 않고도 Cron 스케줄을 구축할 수 있습니다.',
    syntaxTitle: 'Cron 구문 참조', field: '필드', allowed: '허용 값', special: '특수 문자',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Cron 표현식이란?', faq1a: 'Cron 표현식은 5개의 필드로 구성된 스케줄 정의 문자열입니다.',
    faq2q: '5분마다 스케줄하려면?', faq2a: '*/5 * * * * 를 사용합니다.',
    faq3q: 'cron과 crontab의 차이점은?', faq3a: 'cron은 서비스, crontab은 설정 파일입니다.',
    faq4q: '클라우드 서비스에서 cron을 지원하나요?', faq4a: '네, AWS, GCP, Azure, GitHub Actions, Kubernetes가 Cron 표현식을 지원합니다.',
    relatedTitle: '관련 도구',
  },
};

export default function CronExpressionGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [cron, setCron] = useState('0 * * * *');
  const [fields, setFields] = useState(['0', '*', '*', '*', '*']);

  const updateField = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value || '*';
    setFields(newFields);
    setCron(newFields.join(' '));
  };

  const handleCronInput = (val: string) => {
    setCron(val);
    const parts = val.trim().split(/\s+/);
    if (parts.length === 5) setFields(parts);
  };

  const selectPreset = (cronStr: string) => {
    setCron(cronStr);
    setFields(cronStr.split(' '));
  };

  const description = useMemo(() => describeCron(cron), [cron]);
  const nextRuns = useMemo(() => getNextRuns(cron, 5), [cron]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  const cronSyntax = [
    { field: t.minuteField, allowed: '0-59', special: '* , - /' },
    { field: t.hourField, allowed: '0-23', special: '* , - /' },
    { field: t.domField, allowed: '1-31', special: '* , - /' },
    { field: t.monthField, allowed: '1-12', special: '* , - /' },
    { field: t.dowField, allowed: '0-6 (0=Sun)', special: '* , - /' },
  ];

  return (
    <ToolLayout title={t.title} description={t.description} toolId="cron-expression-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Cron Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.cronLabel}</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="text" value={cron} onChange={e => handleCronInput(e.target.value)}
            placeholder={t.cronPlaceholder}
            style={{ flex: 1, padding: '10px 14px', fontSize: 18, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 2 }} />
          <CopyButton text={cron} />
        </div>
      </div>

      {/* Individual Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
        {[t.minuteField, t.hourField, t.domField, t.monthField, t.dowField].map((label, i) => (
          <div key={i}>
            <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
            <input type="text" value={fields[i]} onChange={e => updateField(i, e.target.value)}
              style={{ width: '100%', padding: '6px 8px', fontSize: 14, fontFamily: 'monospace', textAlign: 'center' }} />
          </div>
        ))}
      </div>

      {/* Description */}
      <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 600 }}>{t.descriptionTitle}</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{description}</div>
      </div>

      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.presetsTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {presets.map(p => (
            <button key={p.cron} onClick={() => selectPreset(p.cron)}
              style={{
                padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border-color)',
                fontSize: 12, cursor: 'pointer', background: cron === p.cron ? 'var(--accent-blue)' : 'var(--bg-input)',
                color: cron === p.cron ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
              }}>
              {p.label} <code style={{ marginLeft: 4, fontSize: 11, opacity: 0.8 }}>{p.cron}</code>
            </button>
          ))}
        </div>
      </div>

      {/* Next Runs */}
      {nextRuns.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.nextRunsTitle}</h3>
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 12 }}>
            {nextRuns.map((d, i) => (
              <div key={i} style={{ padding: '6px 0', borderBottom: i < nextRuns.length - 1 ? '1px solid var(--border-color)' : 'none', fontSize: 13, fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                {d.toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.syntaxTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.field}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.allowed}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.special}</th>
              </tr>
            </thead>
            <tbody>
              {cronSyntax.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.field}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{row.allowed}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{row.special}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/cron-generator`, label: 'Cron Generator' },
            { href: `/${lang}/tools/cron-parser`, label: 'Cron Parser' },
            { href: `/${lang}/tools/crontab-generator`, label: 'Crontab Generator' },
            { href: `/${lang}/tools/cron-job-scheduler`, label: 'Cron Job Scheduler' },
          ].map((link) => (
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
