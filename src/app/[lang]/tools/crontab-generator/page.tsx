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

type FieldMode = 'every' | 'specific' | 'range' | 'step';

interface FieldConfig {
  mode: FieldMode;
  specific: string;
  rangeStart: string;
  rangeEnd: string;
  step: string;
}

function fieldToExpression(cfg: FieldConfig): string {
  switch (cfg.mode) {
    case 'every': return '*';
    case 'specific': return cfg.specific || '*';
    case 'range': return `${cfg.rangeStart}-${cfg.rangeEnd}`;
    case 'step': return `*/${cfg.step || '1'}`;
  }
}

const defaultField = (): FieldConfig => ({ mode: 'every', specific: '0', rangeStart: '0', rangeEnd: '5', step: '5' });

const presets = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Hourly', cron: '0 * * * *' },
  { label: 'Daily at midnight', cron: '0 0 * * *' },
  { label: 'Weekly Monday 9 AM', cron: '0 9 * * 1' },
  { label: 'Monthly 1st', cron: '0 0 1 * *' },
  { label: 'Yearly Jan 1', cron: '0 0 1 1 *' },
];

/* ── i18n ──────────────────────────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Crontab Generator',
    description: 'Build crontab expressions visually with dropdowns for each field. Generate, understand, and copy cron schedules instantly.',
    presetsTitle: 'Quick Presets',
    fieldMinute: 'Minute', fieldHour: 'Hour', fieldDom: 'Day of Month', fieldMonth: 'Month', fieldDow: 'Day of Week',
    modeEvery: 'Every', modeSpecific: 'Specific', modeRange: 'Range', modeStep: 'Step',
    resultTitle: 'Generated Crontab Expression',
    humanTitle: 'Human-Readable',
    nextRunsTitle: 'Next 5 Run Times',
    cheatTitle: 'Crontab Syntax Cheat Sheet',
    cheatField: 'Field', cheatAllowed: 'Allowed Values', cheatSpecial: 'Special Characters',
    cheatMinute: 'Minute', cheatHour: 'Hour', cheatDom: 'Day of Month', cheatMonth: 'Month', cheatDow: 'Day of Week',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is crontab?',
    faq1a: 'Crontab (cron table) is a configuration file used by the cron daemon on Unix/Linux systems to schedule recurring tasks. Each line in the crontab defines a schedule using five time fields followed by the command to execute. You can edit your crontab using the "crontab -e" command in the terminal.',
    faq2q: 'What is the difference between crontab and cron?',
    faq2a: 'Cron is the daemon (background service) that runs scheduled tasks on Unix/Linux systems. Crontab is the configuration file that tells cron when and what to run. Think of cron as the scheduler engine and crontab as the schedule itself. You interact with crontab to manage your scheduled jobs.',
    faq3q: 'How do I edit crontab in Linux?',
    faq3a: 'Run "crontab -e" to edit your personal crontab, "crontab -l" to list current entries, and "crontab -r" to remove all entries. The system-wide crontab is at /etc/crontab. Each user can have their own crontab file. Use "sudo crontab -e" to edit the root user\'s crontab.',
    relatedTitle: 'Related Cron Tools',
  },
  zh: {
    title: 'Crontab 生成器',
    description: '使用可视化下拉菜单构建 crontab 表达式。即时生成、理解和复制 cron 调度计划。',
    presetsTitle: '快速预设',
    fieldMinute: '分钟', fieldHour: '小时', fieldDom: '日期', fieldMonth: '月份', fieldDow: '星期',
    modeEvery: '每个', modeSpecific: '指定', modeRange: '范围', modeStep: '步长',
    resultTitle: '生成的 Crontab 表达式',
    humanTitle: '人类可读描述',
    nextRunsTitle: '接下来 5 次运行时间',
    cheatTitle: 'Crontab 语法速查表',
    cheatField: '字段', cheatAllowed: '允许的值', cheatSpecial: '特殊字符',
    cheatMinute: '分钟', cheatHour: '小时', cheatDom: '日期', cheatMonth: '月份', cheatDow: '星期',
    faqTitle: '常见问题',
    faq1q: '什么是 crontab？',
    faq1a: 'Crontab（cron table）是 Unix/Linux 系统上 cron 守护进程用来调度重复任务的配置文件。每一行使用五个时间字段加上要执行的命令来定义调度计划。您可以在终端中使用 "crontab -e" 命令编辑 crontab。',
    faq2q: 'crontab 和 cron 有什么区别？',
    faq2a: 'Cron 是在 Unix/Linux 系统上运行定时任务的守护进程（后台服务）。Crontab 是告诉 cron 何时运行什么的配置文件。将 cron 看作调度引擎，crontab 看作调度计划本身。',
    faq3q: '如何在 Linux 中编辑 crontab？',
    faq3a: '运行 "crontab -e" 编辑个人 crontab，"crontab -l" 列出当前条目，"crontab -r" 删除所有条目。系统级 crontab 位于 /etc/crontab。每个用户可以有自己的 crontab 文件。',
    relatedTitle: '相关 Cron 工具',
  },
  fr: {
    title: 'Generateur Crontab',
    description: 'Construisez des expressions crontab visuellement. Generez, comprenez et copiez des planifications cron instantanement.',
    presetsTitle: 'Presets rapides',
    fieldMinute: 'Minute', fieldHour: 'Heure', fieldDom: 'Jour du mois', fieldMonth: 'Mois', fieldDow: 'Jour de la semaine',
    modeEvery: 'Chaque', modeSpecific: 'Specifique', modeRange: 'Plage', modeStep: 'Pas',
    resultTitle: 'Expression Crontab generee',
    humanTitle: 'Description lisible',
    nextRunsTitle: '5 prochaines executions',
    cheatTitle: 'Aide-memoire syntaxe Crontab',
    cheatField: 'Champ', cheatAllowed: 'Valeurs autorisees', cheatSpecial: 'Caracteres speciaux',
    cheatMinute: 'Minute', cheatHour: 'Heure', cheatDom: 'Jour du mois', cheatMonth: 'Mois', cheatDow: 'Jour de la semaine',
    faqTitle: 'Questions frequentes',
    faq1q: "Qu'est-ce que crontab ?",
    faq1a: "Crontab (cron table) est un fichier de configuration utilise par le daemon cron sur les systemes Unix/Linux pour planifier des taches recurrentes. Utilisez 'crontab -e' pour l'editer.",
    faq2q: 'Quelle est la difference entre crontab et cron ?',
    faq2a: 'Cron est le daemon qui execute les taches planifiees. Crontab est le fichier de configuration qui indique a cron quand et quoi executer.',
    faq3q: 'Comment editer crontab sous Linux ?',
    faq3a: "Executez 'crontab -e' pour editer, 'crontab -l' pour lister et 'crontab -r' pour supprimer toutes les entrees.",
    relatedTitle: 'Outils Cron associes',
  },
  de: {
    title: 'Crontab Generator',
    description: 'Erstellen Sie Crontab-Ausdruecke visuell mit Dropdown-Menues. Generieren, verstehen und kopieren Sie Cron-Zeitplaene sofort.',
    presetsTitle: 'Schnellvorlagen',
    fieldMinute: 'Minute', fieldHour: 'Stunde', fieldDom: 'Tag des Monats', fieldMonth: 'Monat', fieldDow: 'Wochentag',
    modeEvery: 'Jede', modeSpecific: 'Bestimmt', modeRange: 'Bereich', modeStep: 'Schritt',
    resultTitle: 'Generierter Crontab-Ausdruck',
    humanTitle: 'Lesbare Beschreibung',
    nextRunsTitle: 'Naechste 5 Ausfuehrungen',
    cheatTitle: 'Crontab Syntax Kurzreferenz',
    cheatField: 'Feld', cheatAllowed: 'Erlaubte Werte', cheatSpecial: 'Sonderzeichen',
    cheatMinute: 'Minute', cheatHour: 'Stunde', cheatDom: 'Tag des Monats', cheatMonth: 'Monat', cheatDow: 'Wochentag',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist crontab?',
    faq1a: 'Crontab (cron table) ist eine Konfigurationsdatei des cron-Daemons auf Unix/Linux-Systemen zur Planung wiederkehrender Aufgaben. Bearbeiten Sie sie mit "crontab -e".',
    faq2q: 'Was ist der Unterschied zwischen crontab und cron?',
    faq2a: 'Cron ist der Daemon der geplante Aufgaben ausfuehrt. Crontab ist die Konfigurationsdatei die cron mitteilt wann und was ausgefuehrt werden soll.',
    faq3q: 'Wie bearbeite ich crontab unter Linux?',
    faq3a: '"crontab -e" zum Bearbeiten, "crontab -l" zum Auflisten, "crontab -r" zum Entfernen aller Eintraege.',
    relatedTitle: 'Verwandte Cron-Tools',
  },
  es: {
    title: 'Generador de Crontab',
    description: 'Construye expresiones crontab visualmente con menus desplegables. Genera, comprende y copia programaciones cron al instante.',
    presetsTitle: 'Presets rapidos',
    fieldMinute: 'Minuto', fieldHour: 'Hora', fieldDom: 'Dia del mes', fieldMonth: 'Mes', fieldDow: 'Dia de la semana',
    modeEvery: 'Cada', modeSpecific: 'Especifico', modeRange: 'Rango', modeStep: 'Paso',
    resultTitle: 'Expresion Crontab generada',
    humanTitle: 'Descripcion legible',
    nextRunsTitle: 'Proximas 5 ejecuciones',
    cheatTitle: 'Guia rapida de sintaxis Crontab',
    cheatField: 'Campo', cheatAllowed: 'Valores permitidos', cheatSpecial: 'Caracteres especiales',
    cheatMinute: 'Minuto', cheatHour: 'Hora', cheatDom: 'Dia del mes', cheatMonth: 'Mes', cheatDow: 'Dia de la semana',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es crontab?',
    faq1a: 'Crontab (cron table) es un archivo de configuracion utilizado por el daemon cron en sistemas Unix/Linux para programar tareas recurrentes. Editelo con "crontab -e".',
    faq2q: 'Cual es la diferencia entre crontab y cron?',
    faq2a: 'Cron es el daemon que ejecuta tareas programadas. Crontab es el archivo de configuracion que le dice a cron cuando y que ejecutar.',
    faq3q: 'Como editar crontab en Linux?',
    faq3a: '"crontab -e" para editar, "crontab -l" para listar, "crontab -r" para eliminar todas las entradas.',
    relatedTitle: 'Herramientas Cron relacionadas',
  },
  ja: {
    title: 'Crontab ジェネレーター',
    description: 'ドロップダウンメニューで crontab 式をビジュアルに構築。cron スケジュールを即座に生成、理解、コピー。',
    presetsTitle: 'クイックプリセット',
    fieldMinute: '分', fieldHour: '時', fieldDom: '日', fieldMonth: '月', fieldDow: '曜日',
    modeEvery: '毎', modeSpecific: '指定', modeRange: '範囲', modeStep: 'ステップ',
    resultTitle: '生成された Crontab 式',
    humanTitle: '人間が読める説明',
    nextRunsTitle: '次の5回の実行時間',
    cheatTitle: 'Crontab 構文クイックリファレンス',
    cheatField: 'フィールド', cheatAllowed: '許可される値', cheatSpecial: '特殊文字',
    cheatMinute: '分', cheatHour: '時', cheatDom: '日', cheatMonth: '月', cheatDow: '曜日',
    faqTitle: 'よくある質問',
    faq1q: 'crontab とは？',
    faq1a: 'Crontab（cron table）は Unix/Linux システムの cron デーモンが定期タスクをスケジュールするために使用する設定ファイルです。ターミナルで "crontab -e" コマンドで編集できます。',
    faq2q: 'crontab と cron の違いは？',
    faq2a: 'Cron はスケジュールされたタスクを実行するデーモン（バックグラウンドサービス）です。Crontab は cron にいつ何を実行するかを伝える設定ファイルです。',
    faq3q: 'Linux で crontab を編集するには？',
    faq3a: '"crontab -e" で編集、"crontab -l" で一覧表示、"crontab -r" ですべてのエントリを削除します。',
    relatedTitle: '関連 Cron ツール',
  },
  ko: {
    title: 'Crontab 생성기',
    description: '드롭다운 메뉴로 crontab 표현식을 시각적으로 구축하세요. cron 스케줄을 즉시 생성, 이해, 복사하세요.',
    presetsTitle: '빠른 프리셋',
    fieldMinute: '분', fieldHour: '시', fieldDom: '일', fieldMonth: '월', fieldDow: '요일',
    modeEvery: '매', modeSpecific: '지정', modeRange: '범위', modeStep: '간격',
    resultTitle: '생성된 Crontab 표현식',
    humanTitle: '사람이 읽을 수 있는 설명',
    nextRunsTitle: '다음 5회 실행 시간',
    cheatTitle: 'Crontab 구문 빠른 참조',
    cheatField: '필드', cheatAllowed: '허용 값', cheatSpecial: '특수 문자',
    cheatMinute: '분', cheatHour: '시', cheatDom: '일', cheatMonth: '월', cheatDow: '요일',
    faqTitle: '자주 묻는 질문',
    faq1q: 'crontab이란?',
    faq1a: 'Crontab(cron table)은 Unix/Linux 시스템에서 cron 데몬이 반복 작업을 예약하는 데 사용하는 구성 파일입니다. 터미널에서 "crontab -e" 명령으로 편집할 수 있습니다.',
    faq2q: 'crontab과 cron의 차이점은?',
    faq2a: 'Cron은 예약된 작업을 실행하는 데몬(백그라운드 서비스)입니다. Crontab은 cron에게 언제 무엇을 실행할지 알려주는 구성 파일입니다.',
    faq3q: 'Linux에서 crontab을 편집하는 방법은?',
    faq3a: '"crontab -e"로 편집, "crontab -l"로 목록 표시, "crontab -r"로 모든 항목을 삭제합니다.',
    relatedTitle: '관련 Cron 도구',
  },
};

export default function CrontabGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [fields, setFields] = useState<FieldConfig[]>([
    defaultField(), defaultField(), defaultField(), defaultField(), defaultField(),
  ]);

  const fieldLabels = [t.fieldMinute, t.fieldHour, t.fieldDom, t.fieldMonth, t.fieldDow];
  const fieldRanges = [
    { min: 0, max: 59 }, { min: 0, max: 23 }, { min: 1, max: 31 }, { min: 1, max: 12 }, { min: 0, max: 6 },
  ];
  const modeLabels: Record<FieldMode, string> = {
    every: t.modeEvery, specific: t.modeSpecific, range: t.modeRange, step: t.modeStep,
  };

  const updateField = (idx: number, patch: Partial<FieldConfig>) => {
    setFields(prev => prev.map((f, i) => i === idx ? { ...f, ...patch } : f));
  };

  const expression = fields.map(f => fieldToExpression(f)).join(' ');
  const parts = expression.split(' ');
  const description = useMemo(() => describeCron(parts), [expression]);
  const nextRuns = useMemo(() => getNextRuns(parts, 5), [expression]);

  const applyPreset = (cron: string) => {
    const p = cron.split(' ');
    const newFields = p.map((val, idx) => {
      if (val === '*') return defaultField();
      if (val.startsWith('*/')) return { ...defaultField(), mode: 'step' as FieldMode, step: val.slice(2) };
      if (val.includes('-')) {
        const [s, e] = val.split('-');
        return { ...defaultField(), mode: 'range' as FieldMode, rangeStart: s, rangeEnd: e };
      }
      return { ...defaultField(), mode: 'specific' as FieldMode, specific: val };
    });
    setFields(newFields);
  };

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
    <ToolLayout title={t.title} description={t.description} toolId="crontab-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{t.presetsTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {presets.map(p => (
            <button key={p.cron} onClick={() => applyPreset(p.cron)}
              style={{ padding: '4px 10px', fontSize: 12, borderRadius: 4, border: '1px solid var(--border-color)', background: expression === p.cron ? 'var(--accent-color)' : 'var(--bg-input)', color: expression === p.cron ? '#fff' : 'var(--text-primary)', cursor: 'pointer' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual field builders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {fields.map((f, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, minWidth: 100, color: 'var(--text-secondary)' }}>{fieldLabels[idx]}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['every', 'specific', 'range', 'step'] as FieldMode[]).map(mode => (
                <button key={mode} onClick={() => updateField(idx, { mode })}
                  style={{ padding: '3px 8px', fontSize: 11, borderRadius: 4, border: '1px solid var(--border-color)', background: f.mode === mode ? 'var(--accent-color)' : 'transparent', color: f.mode === mode ? '#fff' : 'var(--text-secondary)', cursor: 'pointer' }}>
                  {modeLabels[mode]}
                </button>
              ))}
            </div>
            {f.mode === 'specific' && (
              <input type="number" value={f.specific} min={fieldRanges[idx].min} max={fieldRanges[idx].max}
                onChange={e => updateField(idx, { specific: e.target.value })}
                style={{ width: 70, padding: '4px 8px', fontSize: 13, fontFamily: 'monospace', textAlign: 'center' }} />
            )}
            {f.mode === 'range' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input type="number" value={f.rangeStart} min={fieldRanges[idx].min} max={fieldRanges[idx].max}
                  onChange={e => updateField(idx, { rangeStart: e.target.value })}
                  style={{ width: 60, padding: '4px 8px', fontSize: 13, fontFamily: 'monospace', textAlign: 'center' }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>-</span>
                <input type="number" value={f.rangeEnd} min={fieldRanges[idx].min} max={fieldRanges[idx].max}
                  onChange={e => updateField(idx, { rangeEnd: e.target.value })}
                  style={{ width: 60, padding: '4px 8px', fontSize: 13, fontFamily: 'monospace', textAlign: 'center' }} />
              </div>
            )}
            {f.mode === 'step' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>*/</span>
                <input type="number" value={f.step} min={1} max={fieldRanges[idx].max}
                  onChange={e => updateField(idx, { step: e.target.value })}
                  style={{ width: 60, padding: '4px 8px', fontSize: 13, fontFamily: 'monospace', textAlign: 'center' }} />
              </div>
            )}
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

      {/* Next 5 runs */}
      {nextRuns.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{t.nextRunsTitle}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {nextRuns.map((run, i) => (
              <div key={i} style={{ padding: '6px 12px', fontSize: 13, fontFamily: 'monospace', background: 'var(--bg-input)', borderRadius: 4, border: '1px solid var(--border-color)' }}>
                {run.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cheat Sheet */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.cheatField}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.cheatAllowed}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.cheatSpecial}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.cheatMinute, '0-59', '* , - /'],
                [t.cheatHour, '0-23', '* , - /'],
                [t.cheatDom, '1-31', '* , - /'],
                [t.cheatMonth, '1-12', '* , - /'],
                [t.cheatDow, '0-6 (0=Sun)', '* , - /'],
              ].map(([field, allowed, special], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{field}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{allowed}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{special}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Character</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Meaning</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['*', 'Any value', '* in minute = every minute'],
                ['/', 'Step value', '*/5 in minute = every 5 minutes'],
                ['-', 'Range', '1-5 in DOW = Monday to Friday'],
                [',', 'List', '1,15 in DOM = 1st and 15th'],
              ].map(([char, meaning, example], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700, fontSize: 16 }}>{char}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{meaning}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{example}</td>
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
            { href: `/${lang}/tools/cron-job-scheduler`, label: 'Cron Job Scheduler' },
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
