'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Cron Expression Generator',
    description: 'Build, validate, and understand cron expressions with a visual editor. See human-readable descriptions and next run times.',
    expression: 'Cron Expression',
    humanReadable: 'Human Readable',
    nextRuns: 'Next {count} Scheduled Runs',
    presets: 'Common Presets',
    parse: 'Parse',
    clear: 'Clear',
    copy: 'Copy',
    copied: 'Copied!',
    customPlaceholder: 'Enter cron expression (e.g. */5 * * * *)',
    minute: 'Minute',
    hour: 'Hour',
    dayOfMonth: 'Day (Month)',
    month: 'Month',
    dayOfWeek: 'Day (Week)',
    everyMinute: 'Every minute',
    everyFiveMinutes: 'Every 5 minutes',
    everyFifteenMinutes: 'Every 15 minutes',
    everyHour: 'Every hour',
    everyDayMidnight: 'Every day at midnight',
    everyDayNoon: 'Every day at noon',
    everyMondayMorning: 'Every Monday at 9am',
    weekdaysAt9: 'Weekdays at 9am',
    firstOfMonth: '1st of every month at midnight',
    lastDayOfMonth: 'Last day of every month',
    invalidCron: 'Invalid cron expression (expected 5 fields)',
    introTitle: 'Free Online Cron Expression Generator',
    introText: 'Cron expressions are used to schedule tasks in Unix-like systems. This visual editor helps you build, validate, and understand cron schedules. Enter an expression to see human-readable descriptions and upcoming execution times.',
    howTitle: 'How to Use Cron Expressions',
    step1: 'Select a preset or enter your own 5-field cron expression',
    step2: 'View the human-readable description',
    step3: 'Check the next scheduled execution times',
    step4: 'Copy the expression for use in crontab or applications',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a cron expression?',
    faq1a: 'A cron expression is a 5-field string (minute, hour, day of month, month, day of week) that defines when a scheduled task should run. It is widely used in Linux, Kubernetes, AWS CloudWatch, and CI/CD systems.',
    faq2q: 'What do the special characters mean?',
    faq2a: '* means any value, / means step (*/5 = every 5), - means range (1-5), and , means list (1,3,5). For example, */15 in the minute field means every 15 minutes.',
    faq3q: 'How do I run a job every 5 minutes?',
    faq3a: 'Use the expression */5 * * * *. The */5 in the minute field means every 5 minutes, and * in other fields means any hour, day, month, and weekday.',
    faq4q: 'Can I specify multiple values?',
    faq4a: 'Yes. Use commas to separate values (e.g., 0 9,17 * * * runs at 9 AM and 5 PM daily). Use hyphens for ranges (e.g., 1-5 for Monday through Friday).',
    faq5q: 'What timezone does cron use?',
    faq5a: 'Cron uses the system local timezone by default. Some systems allow specifying TZ variable or using UTC. Always check your system documentation.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Cron 表达式生成器',
    description: '使用可视化编辑器创建、验证和理解 Cron 表达式。查看人类可读的描述和下次执行时间。',
    expression: 'Cron 表达式',
    humanReadable: '可读描述',
    nextRuns: '接下来 {count} 次运行时间',
    presets: '常用预设',
    parse: '解析',
    clear: '清除',
    copy: '复制',
    copied: '已复制！',
    customPlaceholder: '输入 Cron 表达式（例如 */5 * * * *）',
    minute: '分钟',
    hour: '小时',
    dayOfMonth: '日期',
    month: '月份',
    dayOfWeek: '星期',
    everyMinute: '每分钟',
    everyFiveMinutes: '每5分钟',
    everyFifteenMinutes: '每15分钟',
    everyHour: '每小时',
    everyDayMidnight: '每天午夜',
    everyDayNoon: '每天中午',
    everyMondayMorning: '每周一上午9点',
    weekdaysAt9: '工作日（周一至周五）上午9点',
    firstOfMonth: '每月1日午夜',
    lastDayOfMonth: '每月最后一天',
    invalidCron: '无效的 Cron 表达式（需要5个字段）',
    introTitle: '免费在线 Cron 表达式生成器',
    introText: 'Cron 表达式用于在类 Unix 系统中安排定时任务。这个可视化编辑器帮助您创建、验证和理解 Cron 计划。输入表达式查看人类可读的描述和即将执行的时间。',
    howTitle: '如何使用 Cron 表达式',
    step1: '选择预设或输入您自己的5字段 Cron 表达式',
    step2: '查看人类可读的描述',
    step3: '检查下次计划的执行时间',
    step4: '复制表达式用于 crontab 或应用程序',
    faqTitle: '常见问题',
    faq1q: '什么是 Cron 表达式？',
    faq1a: 'Cron 表达式是一个5字段字符串（分钟、小时、日期、月份、星期），定义定时任务的执行时间。它广泛用于 Linux、Kubernetes、AWS CloudWatch 和 CI/CD 系统。',
    faq2q: '特殊字符是什么意思？',
    faq2a: '* 表示任意值，/ 表示步长（*/5 = 每5），- 表示范围（1-5），, 表示列表（1,3,5）。例如，分钟字段的 */15 表示每15分钟。',
    faq3q: '如何每5分钟运行一次任务？',
    faq3a: '使用表达式 */5 * * * *。分钟字段的 */5 表示每5分钟，其他字段的 * 表示任意小时、日期、月份和星期。',
    faq4q: '可以指定多个值吗？',
    faq4a: '可以。使用逗号分隔值（例如，0 9,17 * * * 在每天上午9点和下午5点运行）。使用连字符表示范围（例如，1-5 表示周一到周五）。',
    faq5q: 'Cron 使用什么时区？',
    faq5a: 'Cron 默认使用系统本地时区。某些系统允许指定 TZ 变量或使用 UTC。请查看您的系统文档。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Générateur d\'Expression Cron',
    description: 'Créez, validez et comprenez les expressions cron avec un éditeur visuel.',
    expression: 'Expression Cron',
    humanReadable: 'Description',
    nextRuns: '{count} Prochaines Exécutions',
    presets: 'Présets Courants',
    parse: 'Analyser',
    clear: 'Effacer',
    copy: 'Copier',
    copied: 'Copié!',
    customPlaceholder: 'Entrez une expression cron (ex: */5 * * * *)',
    minute: 'Minute',
    hour: 'Heure',
    dayOfMonth: 'Jour (Mois)',
    month: 'Mois',
    dayOfWeek: 'Jour (Semaine)',
    everyMinute: 'Chaque minute',
    everyFiveMinutes: 'Toutes les 5 minutes',
    everyFifteenMinutes: 'Toutes les 15 minutes',
    everyHour: 'Chaque heure',
    everyDayMidnight: 'Chaque jour à minuit',
    everyDayNoon: 'Chaque jour à midi',
    everyMondayMorning: 'Chaque lundi à 9h',
    weekdaysAt9: 'Jours de semaine à 9h',
    firstOfMonth: '1er de chaque mois',
    lastDayOfMonth: 'Dernier jour du mois',
    invalidCron: 'Expression cron invalide (5 champs attendus)',
    introTitle: 'Générateur d\'Expression Cron Gratuit',
    introText: 'Les expressions cron permettent de planifier des tâches. Cet éditeur visuel vous aide à créer et comprendre les plannings.',
    howTitle: 'Comment Utiliser',
    step1: 'Sélectionnez un preset ou entrez votre expression',
    step2: 'Affichez la description lisible',
    step3: 'Vérifiez les prochaines exécutions',
    step4: 'Copiez l\'expression pour votre crontab',
    faqTitle: 'FAQ',
    faq1q: 'Qu\'est-ce qu\'une expression cron?',
    faq1a: 'Une expression cron est une chaîne de 5 champs définissant quand une tâche doit s\'exécuter.',
    faq2q: 'Que signifient les caractères spéciaux?',
    faq2a: '* = n\'importe quelle valeur, / = pas, - = plage, , = liste',
    faq3q: 'Comment exécuter toutes les 5 minutes?',
    faq3a: 'Utilisez */5 * * * *',
    faq4q: 'Puis-je spécifier plusieurs valeurs?',
    faq4a: 'Oui, utilisez des virgules pour séparer les valeurs.',
    faq5q: 'Quel fuseau horaire?',
    faq5a: 'Cron utilise le fuseau horaire local par défaut.',
    relatedTitle: 'Outils Connexes',
  },
  de: {
    title: 'Cron-Ausdruck-Generator',
    description: 'Erstellen, validieren und verstehen Sie Cron-Ausdrücke visuell.',
    expression: 'Cron-Ausdruck',
    humanReadable: 'Beschreibung',
    nextRuns: 'Nächste {count} Ausführungen',
    presets: 'Häufige Voreinstellungen',
    parse: 'Analysieren',
    clear: 'Löschen',
    copy: 'Kopieren',
    copied: 'Kopiert!',
    customPlaceholder: 'Cron-Ausdruck eingeben (z.B. */5 * * * *)',
    minute: 'Minute',
    hour: 'Stunde',
    dayOfMonth: 'Tag (Monat)',
    month: 'Monat',
    dayOfWeek: 'Tag (Woche)',
    everyMinute: 'Jede Minute',
    everyFiveMinutes: 'Alle 5 Minuten',
    everyFifteenMinutes: 'Alle 15 Minuten',
    everyHour: 'Jede Stunde',
    everyDayMidnight: 'Jeden Tag um Mitternacht',
    everyDayNoon: 'Jeden Tag um 12 Uhr',
    everyMondayMorning: 'Jeden Montag um 9 Uhr',
    weekdaysAt9: 'Werktags um 9 Uhr',
    firstOfMonth: 'Jeden 1. des Monats',
    lastDayOfMonth: 'Letzter Tag jedes Monats',
    invalidCron: 'Ungültiger Cron-Ausdruck (5 Felder erwartet)',
    introTitle: 'Kostenloser Cron-Ausdruck-Generator',
    introText: 'Cron-Ausdrücke planen Aufgaben in Unix-Systemen. Dieser visuelle Editor hilft beim Erstellen und Verstehen.',
    howTitle: 'Bedienung',
    step1: 'Preset wählen oder eigenen Ausdruck eingeben',
    step2: 'Beschreibung anzeigen',
    step3: 'Nächste Ausführungen prüfen',
    step4: 'Ausdruck für crontab kopieren',
    faqTitle: 'FAQ',
    faq1q: 'Was ist ein Cron-Ausdruck?',
    faq1a: 'Ein Cron-Ausdruck hat 5 Felder für Minute, Stunde, Tag, Monat, Wochentag.',
    faq2q: 'Was bedeuten die Sonderzeichen?',
    faq2a: '* = beliebig, / = Schritt, - = Bereich, , = Liste',
    faq3q: 'Alle 5 Minuten ausführen?',
    faq3a: 'Verwenden Sie */5 * * * *',
    faq4q: 'Mehrere Werte möglich?',
    faq4a: 'Ja, mit Kommas trennen.',
    faq5q: 'Welche Zeitzone?',
    faq5a: 'Cron verwendet standardmäßig die lokale Zeitzone.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Expresiones Cron',
    description: 'Cree, valide y comprenda expresiones cron visualmente.',
    expression: 'Expresión Cron',
    humanReadable: 'Descripción',
    nextRuns: 'Próximas {count} Ejecuciones',
    presets: 'Preajustes Comunes',
    parse: 'Analizar',
    clear: 'Borrar',
    copy: 'Copiar',
    copied: '¡Copiado!',
    customPlaceholder: 'Ingrese expresión cron (ej: */5 * * * *)',
    minute: 'Minuto',
    hour: 'Hora',
    dayOfMonth: 'Día (Mes)',
    month: 'Mes',
    dayOfWeek: 'Día (Semana)',
    everyMinute: 'Cada minuto',
    everyFiveMinutes: 'Cada 5 minutos',
    everyFifteenMinutes: 'Cada 15 minutos',
    everyHour: 'Cada hora',
    everyDayMidnight: 'Cada día a medianoche',
    everyDayNoon: 'Cada día al mediodía',
    everyMondayMorning: 'Cada lunes a las 9am',
    weekdaysAt9: 'Días de semana a las 9am',
    firstOfMonth: '1ro de cada mes',
    lastDayOfMonth: 'Último día del mes',
    invalidCron: 'Expresión cron inválida (5 campos esperados)',
    introTitle: 'Generador de Expresiones Cron Gratuito',
    introText: 'Las expresiones cron programan tareas en sistemas Unix. Este editor visual ayuda a crear y comprender.',
    howTitle: 'Cómo Usar',
    step1: 'Seleccione un preset o ingrese su expresión',
    step2: 'Vea la descripción',
    step3: 'Verifique próximas ejecuciones',
    step4: 'Copie para su crontab',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: '¿Qué es una expresión cron?',
    faq1a: 'Una expresión cron tiene 5 campos: minuto, hora, día, mes, día de semana.',
    faq2q: '¿Qué significan los caracteres especiales?',
    faq2a: '* = cualquier valor, / = paso, - = rango, , = lista',
    faq3q: '¿Cada 5 minutos?',
    faq3a: 'Use */5 * * * *',
    faq4q: '¿Múltiples valores?',
    faq4a: 'Sí, use comas.',
    faq5q: '¿Qué zona horaria?',
    faq5a: 'Cron usa la zona horaria local por defecto.',
    relatedTitle: 'Herramientas Relacionadas',
  },
  ja: {
    title: 'Cron式ジェネレーター',
    description: 'ビジュアルエディタでCron式を作成、検証、理解します。',
    expression: 'Cron式',
    humanReadable: '説明',
    nextRuns: '次の{count}回の実行',
    presets: '一般的なプリセット',
    parse: '解析',
    clear: 'クリア',
    copy: 'コピー',
    copied: 'コピー済み',
    customPlaceholder: 'Cron式を入力（例：*/5 * * * *）',
    minute: '分',
    hour: '時',
    dayOfMonth: '日（月）',
    month: '月',
    dayOfWeek: '曜日',
    everyMinute: '毎分',
    everyFiveMinutes: '5分ごと',
    everyFifteenMinutes: '15分ごと',
    everyHour: '毎時',
    everyDayMidnight: '毎日午前0時',
    everyDayNoon: '毎日正午',
    everyMondayMorning: '毎週月曜9時',
    weekdaysAt9: '平日9時',
    firstOfMonth: '毎月1日',
    lastDayOfMonth: '毎月末日',
    invalidCron: '無効なCron式（5フィールド必要）',
    introTitle: '無料Cron式ジェネレーター',
    introText: 'Cron式はUnix系システムでタスクをスケジュールします。このビジュアルエディタで作成・理解できます。',
    howTitle: '使い方',
    step1: 'プリセットを選択または独自の式を入力',
    step2: '説明を表示',
    step3: '次の実行時間を確認',
    step4: 'crontab用にコピー',
    faqTitle: 'よくある質問',
    faq1q: 'Cron式とは？',
    faq1a: 'Cron式は5つのフィールド（分、時、日、月、曜日）で構成されます。',
    faq2q: '特殊文字の意味は？',
    faq2a: '* = 任意、/ = 間隔、- = 範囲、, = リスト',
    faq3q: '5分ごとに実行？',
    faq3a: '*/5 * * * * を使用',
    faq4q: '複数の値は？',
    faq4a: 'はい、カンマで区切ります。',
    faq5q: 'タイムゾーンは？',
    faq5a: 'デフォルトではローカルタイムゾーンです。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Cron 표현식 생성기',
    description: '시각적 편집기로 Cron 표현식을 만들고 검증합니다.',
    expression: 'Cron 표현식',
    humanReadable: '설명',
    nextRuns: '다음 {count}개 예정된 실행',
    presets: '일반적인 사전 설정',
    parse: '분석',
    clear: '지우기',
    copy: '복사',
    copied: '복사됨',
    customPlaceholder: 'Cron 표현식 입력 (예: */5 * * * *)',
    minute: '분',
    hour: '시간',
    dayOfMonth: '날짜(월)',
    month: '월',
    dayOfWeek: '요일',
    everyMinute: '매분',
    everyFiveMinutes: '5분마다',
    everyFifteenMinutes: '15분마다',
    everyHour: '매시간',
    everyDayMidnight: '매일 자정',
    everyDayNoon: '매일 정오',
    everyMondayMorning: '매주 월요일 오전 9시',
    weekdaysAt9: '주중 오전 9시',
    firstOfMonth: '매월 1일',
    lastDayOfMonth: '매월 마지막 날',
    invalidCron: '유효하지 않은 Cron 표현식 (5개 필드 필요)',
    introTitle: '무료 Cron 표현식 생성기',
    introText: 'Cron 표현식은 Unix 계열 시스템에서 작업을 예약합니다. 이 시각적 편집기로 쉽게 만들 수 있습니다.',
    howTitle: '사용 방법',
    step1: '사전 설정 선택 또는 직접 입력',
    step2: '설명 보기',
    step3: '다음 실행 시간 확인',
    step4: 'crontab에 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Cron 표현식이란?',
    faq1a: 'Cron 표현식은 5개 필드(분, 시, 일, 월, 요일)로 구성됩니다.',
    faq2q: '특수 문자의 의미는?',
    faq2a: '* = 모든 값, / = 간격, - = 범위, , = 목록',
    faq3q: '5분마다 실행?',
    faq3a: '*/5 * * * * 사용',
    faq4q: '여러 값 지정?',
    faq4a: '네, 쉼표로 구분합니다.',
    faq5q: '시간대는?',
    faq5a: '기본적으로 로컬 시간대를 사용합니다.',
    relatedTitle: '관련 도구',
  },
};

// Preset cron expressions
const presets = [
  { label: 'everyMinute', value: '* * * * *' },
  { label: 'everyFiveMinutes', value: '*/5 * * * *' },
  { label: 'everyFifteenMinutes', value: '*/15 * * * *' },
  { label: 'everyHour', value: '0 * * * *' },
  { label: 'everyDayMidnight', value: '0 0 * * *' },
  { label: 'everyDayNoon', value: '0 12 * * *' },
  { label: 'everyMondayMorning', value: '0 9 * * 1' },
  { label: 'weekdaysAt9', value: '0 9 * * 1-5' },
  { label: 'firstOfMonth', value: '0 0 1 * *' },
];

// Parse cron field to array of values
function parseCronField(field: string, min: number, max: number): number[] {
  if (field === '*') {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  }
  if (field === '?') return [];

  const values = new Set<number>();
  const parts = field.split(',');

  for (const part of parts) {
    if (part.includes('/')) {
      const [range, step] = part.split('/');
      const stepNum = parseInt(step, 10);
      let start = min;
      let end = max;
      if (range !== '*') {
        if (range.includes('-')) {
          [start, end] = range.split('-').map(Number);
        } else {
          start = parseInt(range, 10);
        }
      }
      for (let i = start; i <= end; i += stepNum) {
        values.add(i);
      }
    } else if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        values.add(i);
      }
    } else {
      values.add(parseInt(part, 10));
    }
  }

  return Array.from(values).sort((a, b) => a - b);
}

// Generate human-readable description
function describeCron(expression: string, t: Record<string, string>): string {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return t.invalidCron;

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  // Check for common patterns
  if (expression === '* * * * *') return t.everyMinute;
  if (expression === '*/5 * * * *') return t.everyFiveMinutes;
  if (expression === '*/15 * * * *') return t.everyFifteenMinutes;
  if (expression === '0 * * * *') return t.everyHour;
  if (expression === '0 0 * * *') return t.everyDayMidnight;
  if (expression === '0 12 * * *') return t.everyDayNoon;
  if (expression === '0 9 * * 1') return t.everyMondayMorning;
  if (expression === '0 9 * * 1-5') return t.weekdaysAt9;
  if (expression === '0 0 1 * *') return t.firstOfMonth;

  const minutes = parseCronField(minute, 0, 59);
  const hours = parseCronField(hour, 0, 23);
  const days = parseCronField(dayOfMonth, 1, 31);
  const months = parseCronField(month, 1, 12);
  const weekdays = parseCronField(dayOfWeek, 0, 6);

  let desc = '';

  // Describe minute/hour
  if (minute === '*') {
    desc = 'Every minute';
  } else if (minute.startsWith('*/')) {
    desc = `Every ${minute.slice(2)} minutes`;
  } else if (minutes.length === 1) {
    desc = `At minute ${minutes[0]}`;
  } else {
    desc = `At minutes ${minutes.join(', ')}`;
  }

  // Describe hour
  if (hour !== '*') {
    if (hour.startsWith('*/')) {
      desc += `, every ${hour.slice(2)} hours`;
    } else if (hours.length === 1) {
      desc += ` past hour ${hours[0]}`;
    }
  }

  // Describe day of month
  if (dayOfMonth !== '*') {
    if (days.length === 1) {
      desc += ` on day ${days[0]}`;
    } else {
      desc += ` on days ${days.join(', ')}`;
    }
  }

  // Describe month
  if (month !== '*') {
    if (months.length === 1) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      desc += ` in ${monthNames[months[0] - 1]}`;
    }
  }

  // Describe weekday
  if (dayOfWeek !== '*') {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (weekdays.length === 1) {
      desc += ` on ${dayNames[weekdays[0]]}`;
    } else if (weekdays.length > 1) {
      desc += ` on ${weekdays.map(d => dayNames[d]).join(', ')}`;
    }
  }

  return desc || t.everyMinute;
}

// Calculate next N run times
function getNextRuns(expression: string, count: number): Date[] {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  const minutes = parseCronField(minute, 0, 59);
  const hours = parseCronField(hour, 0, 23);
  const days = parseCronField(dayOfMonth, 1, 31);
  const months = parseCronField(month, 1, 12);
  const weekdays = parseCronField(dayOfWeek, 0, 6);

  const runs: Date[] = [];
  let current = new Date();
  current.setSeconds(0, 0);

  // Search for next runs (limit to 4 years to avoid infinite loop)
  const maxDate = new Date(current.getTime() + 4 * 365 * 24 * 60 * 60 * 1000);

  while (runs.length < count && current < maxDate) {
    const currentMinute = current.getMinutes();
    const currentHour = current.getHours();
    const currentDay = current.getDate();
    const currentMonth = current.getMonth() + 1;
    const currentWeekday = current.getDay();

    const minuteMatch = minutes.length === 0 || minutes.includes(currentMinute);
    const hourMatch = hours.length === 0 || hours.includes(currentHour);
    const dayMatch = days.length === 0 || days.includes(currentDay);
    const monthMatch = months.length === 0 || months.includes(currentMonth);
    const weekdayMatch = weekdays.length === 0 || weekdays.includes(currentWeekday);

    if (minuteMatch && hourMatch && dayMatch && monthMatch && weekdayMatch) {
      runs.push(new Date(current));
    }

    current.setMinutes(current.getMinutes() + 1);
  }

  return runs;
}

// Build cron expression from individual fields
function buildCronExpression(minute: string, hour: string, dayOfMonth: string, month: string, dayOfWeek: string): string {
  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

export default function CronExpressionGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [expression, setExpression] = useState('*/5 * * * *');
  const [minute, setMinute] = useState('*/5');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');
  const [nextRuns, setNextRuns] = useState<Date[]>([]);

  // Update expression when individual fields change
  useEffect(() => {
    const newExpression = buildCronExpression(minute, hour, dayOfMonth, month, dayOfWeek);
    setExpression(newExpression);
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  // Parse expression and update description/next runs
  useEffect(() => {
    const parts = expression.trim().split(/\s+/);
    if (parts.length === 5) {
      setError('');
      setDescription(describeCron(expression, t));
      setNextRuns(getNextRuns(expression, 5));
    } else {
      setError(t.invalidCron);
      setDescription('');
      setNextRuns([]);
    }
  }, [expression, t]);

  // Parse expression and update fields
  const parseExpression = useCallback(() => {
    const parts = expression.trim().split(/\s+/);
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDayOfMonth(parts[2]);
      setMonth(parts[3]);
      setDayOfWeek(parts[4]);
      setError('');
    } else {
      setError(t.invalidCron);
    }
  }, [expression, t]);

  // Apply preset
  const applyPreset = useCallback((value: string) => {
    setExpression(value);
    const parts = value.split(/\s+/);
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDayOfMonth(parts[2]);
      setMonth(parts[3]);
      setDayOfWeek(parts[4]);
    }
  }, []);

  // Clear all fields
  const clearAll = useCallback(() => {
    setMinute('*');
    setHour('*');
    setDayOfMonth('*');
    setMonth('*');
    setDayOfWeek('*');
    setExpression('* * * * *');
    setError('');
  }, []);

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

  return (
    <ToolLayout title={t.title} description={t.description} toolId="cron-expression-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Presets */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 10 }}>{t.presets}</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => applyPreset(preset.value)}
              className="btn btn-secondary"
              style={{ fontSize: 12, padding: '6px 12px' }}
            >
              {(t as unknown as Record<string, string>)[preset.label] || preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cron Expression Input */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.expression}</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder={t.customPlaceholder}
            style={{ flex: 1, fontFamily: 'monospace', fontSize: 16 }}
          />
          <CopyButton text={expression} />
        </div>
        {error && (
          <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 6, background: '#fee2e2', color: '#dc2626', fontSize: 13 }}>
            {error}
          </div>
        )}
      </div>

      {/* Individual Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>{t.minute}</label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="*"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>{t.hour}</label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            placeholder="*"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>{t.dayOfMonth}</label>
          <input
            type="text"
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(e.target.value)}
            placeholder="*"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>{t.month}</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="*"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>{t.dayOfWeek}</label>
          <input
            type="text"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            placeholder="*"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 14 }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button onClick={parseExpression} className="btn btn-primary" style={{ flex: 1 }}>
          {t.parse}
        </button>
        <button onClick={clearAll} className="btn btn-secondary">
          {t.clear}
        </button>
      </div>

      {/* Human Readable Description */}
      {description && !error && (
        <div
          style={{
            marginBottom: 20,
            padding: '16px 20px',
            borderRadius: 8,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
          }}
        >
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--accent-blue)' }}>
            {t.humanReadable}
          </label>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-primary)' }}>{description}</div>
        </div>
      )}

      {/* Next Runs */}
      {nextRuns.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 10 }}>
            {t.nextRuns.replace('{count}', '5')}
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {nextRuns.map((run, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-input)',
                  borderRadius: 6,
                  padding: '10px 14px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <code style={{ fontSize: 13, color: 'var(--text-primary)' }}>
                  {run.toLocaleString(lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </code>
                <CopyButton text={run.toISOString()} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
          {t.introText}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
            { q: t.faq5q, a: t.faq5a },
          ].map((faq, i) => (
            <details
              key={i}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                overflow: 'hidden',
                background: 'var(--bg-input)',
              }}
            >
              <summary
                style={{
                  padding: '14px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                {faq.q}
              </summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/cron-parser`, label: 'Cron Expression Parser' },
            { href: `/${lang}/tools/timestamp-converter`, label: 'Unix Timestamp Converter' },
            { href: `/${lang}/tools/uuid-generator`, label: 'UUID Generator' },
            { href: `/${lang}/tools/password-generator`, label: 'Password Generator' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                fontSize: 13,
                color: 'var(--accent-blue)',
                textDecoration: 'none',
                background: 'var(--bg-input)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
