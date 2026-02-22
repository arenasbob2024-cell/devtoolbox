'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
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
interface FieldConfig { mode: FieldMode; specific: string; rangeStart: string; rangeEnd: string; step: string; }
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
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: 'Every 30 minutes', cron: '*/30 * * * *' },
  { label: 'Hourly', cron: '0 * * * *' },
  { label: 'Every 6 hours', cron: '0 */6 * * *' },
  { label: 'Daily at midnight', cron: '0 0 * * *' },
  { label: 'Daily at 9 AM', cron: '0 9 * * *' },
  { label: 'Weekly Monday 9 AM', cron: '0 9 * * 1' },
  { label: 'Monthly 1st', cron: '0 0 1 * *' },
  { label: 'Weekdays only', cron: '0 9 * * 1-5' },
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
    directInput: 'Direct Input',
    directPlaceholder: 'e.g., */5 * * * *',
    introTitle: 'Free Online Crontab Generator & Builder',
    introText: 'This crontab generator helps you create cron expressions for scheduling tasks on Unix/Linux systems. Crontab (cron table) uses five fields to define when a scheduled task runs: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). This tool supports all cron syntax including wildcards (*), ranges (1-5), steps (*/5), and comma-separated values (1,3,5). Perfect for setting up automated backups, log rotation, email reports, and any recurring task.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is crontab and how does it work?',
    faq1a: 'Crontab (cron table) is a configuration file used by the cron daemon on Unix/Linux systems to schedule recurring tasks. Each line contains five time fields (minute, hour, day of month, month, day of week) followed by the command to execute. The cron daemon checks every minute and runs commands whose time patterns match the current time.',
    faq2q: 'How do I edit my crontab?',
    faq2a: 'Run "crontab -e" in your terminal to edit your personal crontab. Use "crontab -l" to list current entries and "crontab -r" to remove all entries. The system-wide crontab is at /etc/crontab. Each user can have their own crontab file.',
    faq3q: 'What do the special characters mean in cron expressions?',
    faq3a: 'Asterisk (*) means "every" value. Comma (,) separates multiple values like 1,3,5. Hyphen (-) defines ranges like 1-5. Slash (/) defines step values like */5 meaning every 5 units. These can be combined: 1-30/5 means every 5th minute from 1 to 30.',
    faq4q: 'How do I run a cron job every 5 minutes?',
    faq4a: 'Use the expression "*/5 * * * *" which means every 5th minute, every hour, every day. The */5 in the minute field means "at minutes 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55".',
    faq5q: 'What is the difference between crontab and cron?',
    faq5a: 'Cron is the daemon (background service) that runs scheduled tasks. Crontab is the configuration file that tells cron when to run what. Think of cron as the engine and crontab as the schedule. You interact with crontab to manage scheduled jobs.',
    relatedTitle: 'Related Tools',
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
    directInput: '直接输入',
    directPlaceholder: '例如 */5 * * * *',
    introTitle: '免费在线 Crontab 生成器',
    introText: '此 crontab 生成器帮助您创建 cron 表达式来调度 Unix/Linux 系统上的定时任务。支持所有 cron 语法，包括通配符、范围、步长和逗号分隔值。',
    faqTitle: '常见问题',
    faq1q: '什么是 crontab？', faq1a: 'Crontab（cron table）是 Unix/Linux 系统上 cron 守护进程用来调度重复任务的配置文件。每一行使用五个时间字段加上要执行的命令来定义调度。',
    faq2q: '如何编辑 crontab？', faq2a: '在终端运行 "crontab -e" 编辑个人 crontab，"crontab -l" 列出条目，"crontab -r" 删除所有条目。',
    faq3q: 'cron 表达式中的特殊字符是什么意思？', faq3a: '星号(*)表示"每个"值，逗号(,)分隔多个值，连字符(-)定义范围，斜杠(/)定义步长值。',
    faq4q: '如何每5分钟运行一次 cron 任务？', faq4a: '使用表达式 "*/5 * * * *"，表示每5分钟执行一次。',
    faq5q: 'crontab 和 cron 有什么区别？', faq5a: 'Cron 是执行定时任务的守护进程。Crontab 是告诉 cron 何时执行什么的配置文件。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'Crontab ジェネレーター',
    description: 'ドロップダウンで crontab 式を視覚的に構築。cron スケジュールを即座に生成、理解、コピー。',
    presetsTitle: 'クイックプリセット',
    fieldMinute: '分', fieldHour: '時', fieldDom: '日', fieldMonth: '月', fieldDow: '曜日',
    modeEvery: '毎', modeSpecific: '指定', modeRange: '範囲', modeStep: 'ステップ',
    resultTitle: '生成された Crontab 式', humanTitle: '人間が読める説明', nextRunsTitle: '次の 5 回の実行時間',
    cheatTitle: 'Crontab 構文チートシート', cheatField: 'フィールド', cheatAllowed: '許可値', cheatSpecial: '特殊文字',
    directInput: '直接入力', directPlaceholder: '例: */5 * * * *',
    introTitle: '無料オンライン Crontab ジェネレーター',
    introText: 'Unix/Linux でタスクをスケジュールするための cron 式を作成するツールです。',
    faqTitle: 'よくある質問',
    faq1q: 'crontab とは？', faq1a: 'crontab は Unix/Linux の cron デーモンが使う設定ファイルです。',
    faq2q: 'crontab の編集方法は？', faq2a: '"crontab -e" で編集、"crontab -l" で一覧表示、"crontab -r" で削除。',
    faq3q: '特殊文字の意味は？', faq3a: '* は全ての値、, は複数値、- は範囲、/ はステップ値を表します。',
    faq4q: '5 分ごとにジョブを実行するには？', faq4a: '"*/5 * * * *" を使用します。',
    faq5q: 'crontab と cron の違いは？', faq5a: 'cron はタスクを実行するデーモン。crontab はスケジュール設定ファイル。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Crontab 생성기',
    description: '드롭다운으로 crontab 표현식을 시각적으로 구축. cron 스케줄을 즉시 생성, 이해, 복사.',
    presetsTitle: '빠른 프리셋',
    fieldMinute: '분', fieldHour: '시', fieldDom: '일', fieldMonth: '월', fieldDow: '요일',
    modeEvery: '매', modeSpecific: '지정', modeRange: '범위', modeStep: '간격',
    resultTitle: '생성된 Crontab 표현식', humanTitle: '설명', nextRunsTitle: '다음 5회 실행 시간',
    cheatTitle: 'Crontab 구문 참조', cheatField: '필드', cheatAllowed: '허용 값', cheatSpecial: '특수 문자',
    directInput: '직접 입력', directPlaceholder: '예: */5 * * * *',
    introTitle: '무료 온라인 Crontab 생성기',
    introText: 'Unix/Linux에서 작업 스케줄링을 위한 cron 표현식을 생성하는 도구입니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'crontab이란?', faq1a: 'crontab은 Unix/Linux cron 데몬이 사용하는 설정 파일입니다.',
    faq2q: 'crontab 편집 방법?', faq2a: '"crontab -e"로 편집, "crontab -l"로 목록 확인, "crontab -r"로 삭제.',
    faq3q: '특수 문자의 의미?', faq3a: '* 는 모든 값, , 는 복수 값, - 는 범위, / 는 간격을 나타냅니다.',
    faq4q: '5분마다 작업을 실행하려면?', faq4a: '"*/5 * * * *"을 사용하세요.',
    faq5q: 'crontab과 cron의 차이?', faq5a: 'cron은 작업을 실행하는 데몬. crontab은 스케줄 설정 파일.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Generateur Crontab', description: 'Construisez des expressions crontab visuellement. Generez et copiez des planifications cron.',
    presetsTitle: 'Presets rapides', fieldMinute: 'Minute', fieldHour: 'Heure', fieldDom: 'Jour du mois', fieldMonth: 'Mois', fieldDow: 'Jour de la semaine',
    modeEvery: 'Chaque', modeSpecific: 'Specifique', modeRange: 'Plage', modeStep: 'Pas',
    resultTitle: 'Expression Crontab generee', humanTitle: 'Description lisible', nextRunsTitle: '5 prochaines executions',
    cheatTitle: 'Aide-memoire Crontab', cheatField: 'Champ', cheatAllowed: 'Valeurs', cheatSpecial: 'Caracteres speciaux',
    directInput: 'Saisie directe', directPlaceholder: 'ex: */5 * * * *',
    introTitle: 'Generateur Crontab en Ligne Gratuit', introText: 'Creez des expressions cron pour planifier des taches sur Unix/Linux.',
    faqTitle: 'Questions Frequentes',
    faq1q: "Qu'est-ce que crontab ?", faq1a: 'Crontab est un fichier de configuration pour planifier des taches recurrentes sur Unix/Linux.',
    faq2q: 'Comment editer crontab ?', faq2a: 'Executez "crontab -e" pour editer, "crontab -l" pour lister.',
    faq3q: 'Signification des caracteres speciaux ?', faq3a: '* = chaque valeur, , = valeurs multiples, - = plage, / = pas.',
    faq4q: 'Executer un job toutes les 5 minutes ?', faq4a: 'Utilisez "*/5 * * * *".',
    faq5q: 'Difference entre crontab et cron ?', faq5a: 'Cron est le daemon. Crontab est le fichier de configuration.',
    relatedTitle: 'Outils associes',
  },
  de: {
    title: 'Crontab Generator', description: 'Erstellen Sie Crontab-Ausdruecke visuell. Generieren und kopieren Sie Cron-Zeitplaene.',
    presetsTitle: 'Schnellvorlagen', fieldMinute: 'Minute', fieldHour: 'Stunde', fieldDom: 'Tag des Monats', fieldMonth: 'Monat', fieldDow: 'Wochentag',
    modeEvery: 'Jede', modeSpecific: 'Bestimmt', modeRange: 'Bereich', modeStep: 'Schritt',
    resultTitle: 'Generierter Crontab-Ausdruck', humanTitle: 'Lesbare Beschreibung', nextRunsTitle: 'Naechste 5 Ausfuehrungen',
    cheatTitle: 'Crontab Spickzettel', cheatField: 'Feld', cheatAllowed: 'Erlaubte Werte', cheatSpecial: 'Sonderzeichen',
    directInput: 'Direkte Eingabe', directPlaceholder: 'z.B. */5 * * * *',
    introTitle: 'Kostenloser Online Crontab Generator', introText: 'Erstellen Sie Cron-Ausdruecke fuer die Aufgabenplanung auf Unix/Linux.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist crontab?', faq1a: 'Crontab ist eine Konfigurationsdatei fuer die Aufgabenplanung auf Unix/Linux.',
    faq2q: 'Wie bearbeite ich crontab?', faq2a: '"crontab -e" zum Bearbeiten, "crontab -l" zum Auflisten.',
    faq3q: 'Bedeutung der Sonderzeichen?', faq3a: '* = jeder Wert, , = mehrere Werte, - = Bereich, / = Schritt.',
    faq4q: 'Job alle 5 Minuten ausfuehren?', faq4a: 'Verwenden Sie "*/5 * * * *".',
    faq5q: 'Unterschied crontab und cron?', faq5a: 'Cron ist der Daemon. Crontab ist die Konfigurationsdatei.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador Crontab', description: 'Construye expresiones crontab visualmente. Genera y copia planificaciones cron.',
    presetsTitle: 'Presets rapidos', fieldMinute: 'Minuto', fieldHour: 'Hora', fieldDom: 'Dia del mes', fieldMonth: 'Mes', fieldDow: 'Dia de semana',
    modeEvery: 'Cada', modeSpecific: 'Especifico', modeRange: 'Rango', modeStep: 'Paso',
    resultTitle: 'Expresion Crontab generada', humanTitle: 'Descripcion legible', nextRunsTitle: 'Proximas 5 ejecuciones',
    cheatTitle: 'Referencia Crontab', cheatField: 'Campo', cheatAllowed: 'Valores', cheatSpecial: 'Caracteres especiales',
    directInput: 'Entrada directa', directPlaceholder: 'ej: */5 * * * *',
    introTitle: 'Generador Crontab en Linea Gratis', introText: 'Cree expresiones cron para programar tareas en Unix/Linux.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Que es crontab?', faq1a: 'Crontab es un archivo de configuracion para programar tareas recurrentes en Unix/Linux.',
    faq2q: 'Como editar crontab?', faq2a: 'Ejecuta "crontab -e" para editar, "crontab -l" para listar.',
    faq3q: 'Significado de caracteres especiales?', faq3a: '* = cada valor, , = valores multiples, - = rango, / = paso.',
    faq4q: 'Ejecutar job cada 5 minutos?', faq4a: 'Usa "*/5 * * * *".', faq5q: 'Diferencia crontab y cron?', faq5a: 'Cron es el daemon. Crontab es el archivo de configuracion.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: { title: 'Generatore Crontab', description: 'Costruisci espressioni crontab visualmente.', presetsTitle: 'Preset rapidi', fieldMinute: 'Minuto', fieldHour: 'Ora', fieldDom: 'Giorno del mese', fieldMonth: 'Mese', fieldDow: 'Giorno settimana', modeEvery: 'Ogni', modeSpecific: 'Specifico', modeRange: 'Intervallo', modeStep: 'Passo', resultTitle: 'Espressione Crontab generata', humanTitle: 'Descrizione leggibile', nextRunsTitle: 'Prossime 5 esecuzioni', cheatTitle: 'Riferimento Crontab', cheatField: 'Campo', cheatAllowed: 'Valori', cheatSpecial: 'Caratteri speciali', directInput: 'Input diretto', directPlaceholder: 'es: */5 * * * *', introTitle: 'Generatore Crontab Online Gratuito', introText: 'Crea espressioni cron per pianificare attivita su Unix/Linux.', faqTitle: 'Domande Frequenti', faq1q: 'Cos\'e crontab?', faq1a: 'File di configurazione per pianificare attivita ricorrenti.', faq2q: 'Come modificare crontab?', faq2a: '"crontab -e" per modificare.', faq3q: 'Significato dei caratteri speciali?', faq3a: '* = ogni, , = multipli, - = intervallo, / = passo.', faq4q: 'Eseguire ogni 5 minuti?', faq4a: 'Usa "*/5 * * * *".', faq5q: 'Differenza crontab e cron?', faq5a: 'Cron e il daemon, crontab il file di configurazione.', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Gerador Crontab', description: 'Construa expressoes crontab visualmente.', presetsTitle: 'Presets rapidos', fieldMinute: 'Minuto', fieldHour: 'Hora', fieldDom: 'Dia do mes', fieldMonth: 'Mes', fieldDow: 'Dia da semana', modeEvery: 'Cada', modeSpecific: 'Especifico', modeRange: 'Faixa', modeStep: 'Passo', resultTitle: 'Expressao Crontab gerada', humanTitle: 'Descricao legivel', nextRunsTitle: 'Proximas 5 execucoes', cheatTitle: 'Referencia Crontab', cheatField: 'Campo', cheatAllowed: 'Valores', cheatSpecial: 'Caracteres especiais', directInput: 'Entrada direta', directPlaceholder: 'ex: */5 * * * *', introTitle: 'Gerador Crontab Online Gratuito', introText: 'Crie expressoes cron para agendar tarefas em Unix/Linux.', faqTitle: 'Perguntas Frequentes', faq1q: 'O que e crontab?', faq1a: 'Arquivo de configuracao para agendar tarefas recorrentes.', faq2q: 'Como editar crontab?', faq2a: '"crontab -e" para editar.', faq3q: 'Significado dos caracteres especiais?', faq3a: '* = cada, , = multiplos, - = faixa, / = passo.', faq4q: 'Executar a cada 5 minutos?', faq4a: 'Use "*/5 * * * *".', faq5q: 'Diferenca crontab e cron?', faq5a: 'Cron e o daemon, crontab o arquivo de configuracao.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Crontab Generator', description: 'Bouw crontab-expressies visueel.', presetsTitle: 'Snelle presets', fieldMinute: 'Minuut', fieldHour: 'Uur', fieldDom: 'Dag van maand', fieldMonth: 'Maand', fieldDow: 'Weekdag', modeEvery: 'Elke', modeSpecific: 'Specifiek', modeRange: 'Bereik', modeStep: 'Stap', resultTitle: 'Gegenereerde Crontab-expressie', humanTitle: 'Leesbare beschrijving', nextRunsTitle: 'Volgende 5 uitvoeringen', cheatTitle: 'Crontab Referentie', cheatField: 'Veld', cheatAllowed: 'Waarden', cheatSpecial: 'Speciale tekens', directInput: 'Directe invoer', directPlaceholder: 'bijv. */5 * * * *', introTitle: 'Gratis Online Crontab Generator', introText: 'Maak cron-expressies voor het plannen van taken op Unix/Linux.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Wat is crontab?', faq1a: 'Configuratiebestand voor het plannen van terugkerende taken.', faq2q: 'Hoe bewerk ik crontab?', faq2a: '"crontab -e" om te bewerken.', faq3q: 'Betekenis speciale tekens?', faq3a: '* = elke, , = meerdere, - = bereik, / = stap.', faq4q: 'Elke 5 minuten uitvoeren?', faq4a: 'Gebruik "*/5 * * * *".', faq5q: 'Verschil crontab en cron?', faq5a: 'Cron is de daemon, crontab het configuratiebestand.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Generator Crontab', description: 'Buduj wyrazenia crontab wizualnie.', presetsTitle: 'Szybkie presety', fieldMinute: 'Minuta', fieldHour: 'Godzina', fieldDom: 'Dzien miesiaca', fieldMonth: 'Miesiac', fieldDow: 'Dzien tygodnia', modeEvery: 'Kazdy', modeSpecific: 'Okreslony', modeRange: 'Zakres', modeStep: 'Krok', resultTitle: 'Wygenerowane wyrazenie Crontab', humanTitle: 'Czytelny opis', nextRunsTitle: 'Nastepne 5 uruchomien', cheatTitle: 'Sciaga Crontab', cheatField: 'Pole', cheatAllowed: 'Wartosci', cheatSpecial: 'Znaki specjalne', directInput: 'Bezposrednie wejscie', directPlaceholder: 'np. */5 * * * *', introTitle: 'Darmowy Generator Crontab Online', introText: 'Tworzenie wyrazen cron do planowania zadan na Unix/Linux.', faqTitle: 'Czesto zadawane pytania', faq1q: 'Czym jest crontab?', faq1a: 'Plik konfiguracyjny do planowania powtarzajacych sie zadan.', faq2q: 'Jak edytowac crontab?', faq2a: '"crontab -e" do edycji.', faq3q: 'Znaczenie znakow specjalnych?', faq3a: '* = kazdy, , = wiele, - = zakres, / = krok.', faq4q: 'Uruchamiac co 5 minut?', faq4a: 'Uzyj "*/5 * * * *".', faq5q: 'Roznica crontab i cron?', faq5a: 'Cron to daemon, crontab to plik konfiguracyjny.', relatedTitle: 'Powiazane narzedzia' },
  sv: { title: 'Crontab Generator', description: 'Bygg crontab-uttryck visuellt.', presetsTitle: 'Snabbpresets', fieldMinute: 'Minut', fieldHour: 'Timme', fieldDom: 'Dag i manaden', fieldMonth: 'Manad', fieldDow: 'Veckodag', modeEvery: 'Varje', modeSpecific: 'Specifik', modeRange: 'Omfang', modeStep: 'Steg', resultTitle: 'Genererat Crontab-uttryck', humanTitle: 'Lasbar beskrivning', nextRunsTitle: 'Nasta 5 korningar', cheatTitle: 'Crontab Referens', cheatField: 'Falt', cheatAllowed: 'Varden', cheatSpecial: 'Specialtecken', directInput: 'Direkt inmatning', directPlaceholder: 't.ex. */5 * * * *', introTitle: 'Gratis Crontab Generator Online', introText: 'Skapa cron-uttryck for att schemalägga uppgifter pa Unix/Linux.', faqTitle: 'Vanliga fragor', faq1q: 'Vad ar crontab?', faq1a: 'Konfigurationsfil for att schemalägga uppgifter.', faq2q: 'Hur redigerar jag crontab?', faq2a: '"crontab -e" for att redigera.', faq3q: 'Specialteckens betydelse?', faq3a: '* = varje, , = flera, - = omfang, / = steg.', faq4q: 'Kora var 5:e minut?', faq4a: 'Anvand "*/5 * * * *".', faq5q: 'Skillnad crontab och cron?', faq5a: 'Cron ar daemon, crontab ar konfigurationsfilen.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Crontab Generator', description: 'Bygg crontab-uttrykk visuelt.', presetsTitle: 'Hurtigpresets', fieldMinute: 'Minutt', fieldHour: 'Time', fieldDom: 'Dag i maneden', fieldMonth: 'Maned', fieldDow: 'Ukedag', modeEvery: 'Hver', modeSpecific: 'Spesifikk', modeRange: 'Rekkevidde', modeStep: 'Steg', resultTitle: 'Generert Crontab-uttrykk', humanTitle: 'Lesbar beskrivelse', nextRunsTitle: 'Neste 5 kjoringer', cheatTitle: 'Crontab Referanse', cheatField: 'Felt', cheatAllowed: 'Verdier', cheatSpecial: 'Spesialtegn', directInput: 'Direkte inndata', directPlaceholder: 'f.eks. */5 * * * *', introTitle: 'Gratis Crontab Generator Online', introText: 'Lag cron-uttrykk for a planlegge oppgaver pa Unix/Linux.', faqTitle: 'Vanlige sporrsmal', faq1q: 'Hva er crontab?', faq1a: 'Konfigurasjonsfil for a planlegge gjentakende oppgaver.', faq2q: 'Hvordan redigere crontab?', faq2a: '"crontab -e" for a redigere.', faq3q: 'Betydning av spesialtegn?', faq3a: '* = hver, , = flere, - = rekkevidde, / = steg.', faq4q: 'Kjore hvert 5. minutt?', faq4a: 'Bruk "*/5 * * * *".', faq5q: 'Forskjell crontab og cron?', faq5a: 'Cron er daemon, crontab er konfigurasjonsfilen.', relatedTitle: 'Relaterte verktoy' },
  id: { title: 'Generator Crontab', description: 'Bangun ekspresi crontab secara visual.', presetsTitle: 'Preset cepat', fieldMinute: 'Menit', fieldHour: 'Jam', fieldDom: 'Hari dalam bulan', fieldMonth: 'Bulan', fieldDow: 'Hari dalam minggu', modeEvery: 'Setiap', modeSpecific: 'Spesifik', modeRange: 'Rentang', modeStep: 'Langkah', resultTitle: 'Ekspresi Crontab yang dihasilkan', humanTitle: 'Deskripsi terbaca', nextRunsTitle: '5 eksekusi berikutnya', cheatTitle: 'Referensi Crontab', cheatField: 'Bidang', cheatAllowed: 'Nilai', cheatSpecial: 'Karakter khusus', directInput: 'Input langsung', directPlaceholder: 'mis: */5 * * * *', introTitle: 'Generator Crontab Online Gratis', introText: 'Buat ekspresi cron untuk menjadwalkan tugas di Unix/Linux.', faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Apa itu crontab?', faq1a: 'File konfigurasi untuk menjadwalkan tugas berulang.', faq2q: 'Cara mengedit crontab?', faq2a: '"crontab -e" untuk mengedit.', faq3q: 'Arti karakter khusus?', faq3a: '* = setiap, , = beberapa, - = rentang, / = langkah.', faq4q: 'Menjalankan setiap 5 menit?', faq4a: 'Gunakan "*/5 * * * *".', faq5q: 'Perbedaan crontab dan cron?', faq5a: 'Cron adalah daemon, crontab adalah file konfigurasi.', relatedTitle: 'Alat terkait' },
  th: { title: 'Crontab Generator', description: 'สร้างนิพจน์ crontab แบบเห็นภาพ', presetsTitle: 'พรีเซ็ตด่วน', fieldMinute: 'นาที', fieldHour: 'ชั่วโมง', fieldDom: 'วันที่', fieldMonth: 'เดือน', fieldDow: 'วันในสัปดาห์', modeEvery: 'ทุก', modeSpecific: 'เฉพาะ', modeRange: 'ช่วง', modeStep: 'ขั้น', resultTitle: 'นิพจน์ Crontab ที่สร้าง', humanTitle: 'คำอธิบาย', nextRunsTitle: '5 ครั้งถัดไป', cheatTitle: 'อ้างอิง Crontab', cheatField: 'ฟิลด์', cheatAllowed: 'ค่าที่อนุญาต', cheatSpecial: 'อักขระพิเศษ', directInput: 'ป้อนโดยตรง', directPlaceholder: 'เช่น */5 * * * *', introTitle: 'Crontab Generator ออนไลน์ฟรี', introText: 'สร้างนิพจน์ cron สำหรับกำหนดเวลางานบน Unix/Linux', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'crontab คืออะไร?', faq1a: 'ไฟล์การกำหนดค่าสำหรับกำหนดเวลางานที่ทำซ้ำ', faq2q: 'แก้ไข crontab อย่างไร?', faq2a: '"crontab -e" เพื่อแก้ไข', faq3q: 'ความหมายของอักขระพิเศษ?', faq3a: '* = ทุก, , = หลายค่า, - = ช่วง, / = ขั้น', faq4q: 'รันทุก 5 นาที?', faq4a: 'ใช้ "*/5 * * * *"', faq5q: 'ความแตกต่างระหว่าง crontab กับ cron?', faq5a: 'cron คือ daemon, crontab คือไฟล์การกำหนดค่า', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function CrontabGeneratorPage() {
  const { lang } = useLang();
  const t = ui[(lang as string) || 'en'] || ui.en;

  const [minute, setMinute] = useState<FieldConfig>(defaultField());
  const [hour, setHour] = useState<FieldConfig>(defaultField());
  const [dom, setDom] = useState<FieldConfig>(defaultField());
  const [month, setMonth] = useState<FieldConfig>(defaultField());
  const [dow, setDow] = useState<FieldConfig>(defaultField());
  const [directInput, setDirectInput] = useState('');

  const expression = useMemo(() => {
    if (directInput.trim()) return directInput.trim();
    return `${fieldToExpression(minute)} ${fieldToExpression(hour)} ${fieldToExpression(dom)} ${fieldToExpression(month)} ${fieldToExpression(dow)}`;
  }, [minute, hour, dom, month, dow, directInput]);

  const parts = expression.split(/\s+/);
  const isValid = parts.length === 5;
  const description = isValid ? describeCron(parts) : 'Invalid expression';
  const nextRuns = useMemo(() => isValid ? getNextRuns(parts, 5) : [], [expression, isValid]);

  const applyPreset = (cron: string) => {
    setDirectInput(cron);
    const p = cron.split(/\s+/);
    if (p.length === 5) {
      const parse = (val: string): FieldConfig => {
        if (val === '*') return defaultField();
        if (val.startsWith('*/')) return { mode: 'step', specific: '0', rangeStart: '0', rangeEnd: '5', step: val.slice(2) };
        if (val.includes('-')) { const [s, e] = val.split('-'); return { mode: 'range', specific: '0', rangeStart: s, rangeEnd: e, step: '5' }; }
        return { mode: 'specific', specific: val, rangeStart: '0', rangeEnd: '5', step: '5' };
      };
      setMinute(parse(p[0])); setHour(parse(p[1])); setDom(parse(p[2])); setMonth(parse(p[3])); setDow(parse(p[4]));
    }
  };

  const renderFieldBuilder = (label: string, config: FieldConfig, setConfig: (c: FieldConfig) => void, min: number, max: number) => (
    <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border-color)' }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--accent-blue)' }}>{label} ({min}-{max})</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {(['every', 'specific', 'range', 'step'] as FieldMode[]).map(mode => (
          <button key={mode} onClick={() => { setConfig({ ...config, mode }); setDirectInput(''); }}
            className="btn btn-ghost" style={{
              padding: '4px 10px', fontSize: 12,
              background: config.mode === mode ? 'var(--accent-blue)' : undefined,
              color: config.mode === mode ? '#fff' : undefined,
            }}>
            {t[`mode${mode.charAt(0).toUpperCase() + mode.slice(1)}` as keyof typeof t]}
          </button>
        ))}
      </div>
      {config.mode === 'specific' && (
        <input type="text" value={config.specific} onChange={e => { setConfig({ ...config, specific: e.target.value }); setDirectInput(''); }}
          placeholder={`${min}-${max}, comma-separated`} style={{ width: '100%', padding: '6px 10px', fontFamily: 'monospace', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }} />
      )}
      {config.mode === 'range' && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="number" min={min} max={max} value={config.rangeStart} onChange={e => { setConfig({ ...config, rangeStart: e.target.value }); setDirectInput(''); }}
            style={{ width: 70, padding: '6px', fontFamily: 'monospace', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }} />
          <span style={{ color: 'var(--text-secondary)' }}>-</span>
          <input type="number" min={min} max={max} value={config.rangeEnd} onChange={e => { setConfig({ ...config, rangeEnd: e.target.value }); setDirectInput(''); }}
            style={{ width: 70, padding: '6px', fontFamily: 'monospace', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }} />
        </div>
      )}
      {config.mode === 'step' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>*/</span>
          <input type="number" min={1} max={max} value={config.step} onChange={e => { setConfig({ ...config, step: e.target.value }); setDirectInput(''); }}
            style={{ width: 70, padding: '6px', fontFamily: 'monospace', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }} />
        </div>
      )}
    </div>
  );

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="crontab-generator">
      {/* Result */}
      <div style={{ background: 'var(--bg-input)', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{t.resultTitle}</div>
        <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'monospace', color: 'var(--accent-blue)', letterSpacing: 4 }}>{expression}</div>
        <CopyButton text={expression} />
        <div style={{ marginTop: 8, fontSize: 14, color: 'var(--accent-emerald)', fontWeight: 600 }}>{description}</div>
      </div>

      {/* Direct Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>{t.directInput}</label>
        <input type="text" value={directInput} onChange={e => setDirectInput(e.target.value)} placeholder={t.directPlaceholder}
          style={{ width: '100%', maxWidth: 300, padding: '8px 12px', fontFamily: 'monospace', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)' }} />
      </div>

      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{t.presetsTitle}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 6 }}>
          {presets.map(p => (
            <button key={p.cron} onClick={() => applyPreset(p.cron)} className="btn btn-ghost"
              style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', background: expression === p.cron ? 'var(--accent-blue)15' : undefined }}>
              <code style={{ fontSize: 11, color: 'var(--accent-blue)' }}>{p.cron}</code>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Field Builders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {renderFieldBuilder(t.fieldMinute, minute, setMinute, 0, 59)}
        {renderFieldBuilder(t.fieldHour, hour, setHour, 0, 23)}
        {renderFieldBuilder(t.fieldDom, dom, setDom, 1, 31)}
        {renderFieldBuilder(t.fieldMonth, month, setMonth, 1, 12)}
        {renderFieldBuilder(t.fieldDow, dow, setDow, 0, 6)}
      </div>

      {/* Next Runs */}
      {isValid && nextRuns.length > 0 && (
        <div style={{ marginBottom: 20, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{t.nextRunsTitle}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {nextRuns.map((d, i) => (
              <div key={i} style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-secondary)', padding: '4px 0' }}>
                {d.toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cheat Sheet */}
      <div style={{ marginBottom: 20, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{t.cheatTitle}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '6px 8px', textAlign: 'left' }}>{t.cheatField}</th>
              <th style={{ padding: '6px 8px', textAlign: 'left' }}>{t.cheatAllowed}</th>
              <th style={{ padding: '6px 8px', textAlign: 'left' }}>{t.cheatSpecial}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.fieldMinute, '0-59', '* , - /'],
              [t.fieldHour, '0-23', '* , - /'],
              [t.fieldDom, '1-31', '* , - /'],
              [t.fieldMonth, '1-12', '* , - /'],
              [t.fieldDow, '0-6 (0=Sun)', '* , - /'],
            ].map(([f, a, s], i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)20' }}>
                <td style={{ padding: '6px 8px', fontWeight: 600 }}>{f}</td>
                <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{a}</td>
                <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Intro */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{t.faqTitle}</h2>
        {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, i) => (
          <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <summary style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{faq.q}</summary>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ToolLayout>
  );
}
