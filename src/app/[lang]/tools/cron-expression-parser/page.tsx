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

/* ── Field description helpers ─────────────────────────────────── */
const fieldNames = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'];
const fieldRanges: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];
const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function describeField(field: string, idx: number): { raw: string; meaning: string; issue: string | null } {
  const [min, max] = fieldRanges[idx];
  let meaning = '';
  let issue: string | null = null;

  if (field === '*') {
    meaning = `every ${fieldNames[idx].toLowerCase()}`;
  } else if (field.startsWith('*/')) {
    const step = parseInt(field.slice(2));
    if (isNaN(step) || step < 1) { issue = `Invalid step value: ${field}`; meaning = 'invalid'; }
    else meaning = `every ${step} ${fieldNames[idx].toLowerCase()}${step > 1 ? 's' : ''}`;
  } else if (field.includes('/')) {
    const [base, stepStr] = field.split('/');
    const start = parseInt(base);
    const step = parseInt(stepStr);
    meaning = `every ${step} ${fieldNames[idx].toLowerCase()}${step > 1 ? 's' : ''} starting at ${start}`;
  } else if (field.includes('-')) {
    const [s, e] = field.split('-').map(Number);
    if (s > e) issue = `Range start (${s}) > end (${e})`;
    if (idx === 4) meaning = `from ${dayNames[s] || s} to ${dayNames[e] || e}`;
    else if (idx === 3) meaning = `from ${monthNames[s] || s} to ${monthNames[e] || e}`;
    else if (idx === 1) meaning = `from ${s}:00 to ${e}:00`;
    else meaning = `from ${s} to ${e}`;
  } else if (field.includes(',')) {
    const vals = field.split(',').map(Number);
    if (idx === 4) meaning = vals.map(v => dayNames[v] || v).join(', ');
    else if (idx === 3) meaning = vals.map(v => monthNames[v] || v).join(', ');
    else meaning = `at ${vals.join(', ')}`;
  } else {
    const val = parseInt(field);
    if (isNaN(val)) { issue = `Invalid value: ${field}`; meaning = 'invalid'; }
    else {
      if (val < min || val > max) issue = `Value ${val} out of range (${min}-${max})`;
      if (idx === 4) meaning = dayNames[val] || `day ${val}`;
      else if (idx === 3) meaning = monthNames[val] || `month ${val}`;
      else if (idx === 1) meaning = `at ${val}:00`;
      else if (idx === 0) meaning = `at minute ${val}`;
      else meaning = `on day ${val}`;
    }
  }
  return { raw: field, meaning, issue };
}

function buildSentence(parts: string[]): string {
  if (parts.length !== 5) return 'Invalid cron expression — expected 5 fields.';
  const [min, hour, dom, month, dow] = parts;
  const allStar = (f: string) => f === '*';
  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (allStar(min) && allStar(hour) && allStar(dom) && allStar(month) && allStar(dow)) return 'Runs every single minute.';

  let sentence = 'Runs ';

  // Time part
  if (min.startsWith('*/')) {
    sentence += `every ${min.slice(2)} minutes`;
  } else if (min === '0' && hour === '*') {
    sentence += 'at the start of every hour';
  } else if (min === '0' && hour.startsWith('*/')) {
    sentence += `every ${hour.slice(2)} hours`;
  } else if (min !== '*' && hour !== '*' && !hour.includes('/') && !hour.includes(',') && !hour.includes('-')) {
    sentence += `at ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
  } else if (min !== '*' && hour === '*') {
    sentence += `at minute ${min} of every hour`;
  } else if (min === '*' && hour !== '*') {
    sentence += `every minute during hour ${hour}`;
  } else {
    sentence += `at minute ${min}, hour ${hour}`;
  }

  // Day of month
  if (dom !== '*') {
    if (dom.includes(',')) sentence += ` on the ${dom.split(',').join(', ')} of the month`;
    else if (dom.includes('-')) { const [s, e] = dom.split('-'); sentence += ` from the ${s}th to the ${e}th of the month`; }
    else sentence += ` on the ${dom}${dom === '1' ? 'st' : dom === '2' ? 'nd' : dom === '3' ? 'rd' : 'th'} of the month`;
  }

  // Month
  if (month !== '*') {
    if (month.includes(',')) sentence += ` in ${month.split(',').map(m => months[parseInt(m)] || m).join(', ')}`;
    else if (month.includes('-')) { const [s, e] = month.split('-'); sentence += ` from ${months[parseInt(s)] || s} through ${months[parseInt(e)] || e}`; }
    else { const m = parseInt(month); sentence += ` in ${months[m] || `month ${month}`}`; }
  }

  // Day of week
  if (dow !== '*') {
    if (dow === '1-5') sentence += ', Monday through Friday';
    else if (dow === '0-6') {} // every day, already implied
    else if (dow.includes(',')) sentence += ` on ${dow.split(',').map(d => days[parseInt(d)] || d).join(', ')}`;
    else { const d = parseInt(dow); sentence += ` on ${days[d] || `day ${dow}`}`; }
  }

  return sentence + '.';
}

const examplePatterns: [string, string][] = [
  ['* * * * *', 'Every minute'],
  ['*/5 * * * *', 'Every 5 minutes'],
  ['*/15 * * * *', 'Every 15 minutes'],
  ['0 * * * *', 'Every hour at minute 0'],
  ['0 */2 * * *', 'Every 2 hours'],
  ['0 0 * * *', 'Daily at midnight'],
  ['0 6 * * *', 'Daily at 6:00 AM'],
  ['30 8 * * 1-5', 'Weekdays at 8:30 AM'],
  ['0 9 * * 1', 'Every Monday at 9:00 AM'],
  ['0 0 * * 0', 'Every Sunday at midnight'],
  ['0 0 1 * *', 'First day of every month'],
  ['0 0 1,15 * *', '1st and 15th of every month'],
  ['0 0 1 1 *', 'January 1st at midnight'],
  ['0 12 * * 1-5', 'Weekdays at noon'],
  ['*/10 9-17 * * *', 'Every 10 min during business hours (9-17)'],
  ['0 0 * * 6,0', 'Weekends at midnight'],
];

/* ── i18n ──────────────────────────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Cron Expression Parser',
    description: 'Paste any cron expression and get a plain-English explanation with field-by-field breakdown, next run times, and validation.',
    inputLabel: 'Cron Expression',
    inputPlaceholder: 'Enter cron expression (e.g. */5 9-17 * * 1-5)',
    parseBtn: 'Parse & Explain',
    clear: 'Clear',
    sentenceTitle: 'Plain English',
    breakdownTitle: 'Field-by-Field Breakdown',
    fieldCol: 'Field',
    valueCol: 'Value',
    meaningCol: 'Meaning',
    issuesTitle: 'Issues Detected',
    nextRunsTitle: 'Next 10 Execution Times',
    cheatTitle: 'Cron Expression Examples',
    cheatExpression: 'Expression',
    cheatMeaning: 'Meaning',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do you read a cron expression?',
    faq1a: 'A cron expression has 5 fields separated by spaces: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, Sunday=0). Read left to right. For example, "30 9 * * 1-5" means "at minute 30, hour 9, any day of month, any month, Monday through Friday" — or simply "weekdays at 9:30 AM".',
    faq2q: 'What does */5 mean in cron?',
    faq2a: 'The */N syntax means "every N units." So */5 in the minute field means "every 5 minutes" (at 0, 5, 10, 15, ..., 55). The * matches all values, and /5 is the step. You can also use a start value: 2/5 means "every 5 minutes starting at minute 2" (2, 7, 12, 17, ...).',
    faq3q: 'What is the difference between 5-field and 6-field cron?',
    faq3a: 'Standard Unix cron uses 5 fields: minute, hour, day of month, month, day of week. Some systems add a 6th field: seconds (at the beginning, used by Spring, Quartz) or year (at the end, used by AWS CloudWatch). This tool supports the standard 5-field format. If your system uses 6 fields, simply omit the seconds or year field when using this parser.',
    relatedTitle: 'Related Cron Tools',
    tryExample: 'Click any example to parse it:',
  },
  zh: {
    title: 'Cron 表达式解析器',
    description: '粘贴任意 cron 表达式，获取通俗易懂的中文解释，包括逐字段分解、下次运行时间和验证。',
    inputLabel: 'Cron 表达式',
    inputPlaceholder: '输入 cron 表达式（例如 */5 9-17 * * 1-5）',
    parseBtn: '解析并解释',
    clear: '清除',
    sentenceTitle: '通俗描述',
    breakdownTitle: '逐字段分解',
    fieldCol: '字段',
    valueCol: '值',
    meaningCol: '含义',
    issuesTitle: '检测到的问题',
    nextRunsTitle: '接下来 10 次执行时间',
    cheatTitle: 'Cron 表达式示例',
    cheatExpression: '表达式',
    cheatMeaning: '含义',
    faqTitle: '常见问题',
    faq1q: '如何阅读 cron 表达式？',
    faq1a: 'Cron 表达式有 5 个用空格分隔的字段：分钟（0-59）、小时（0-23）、日（1-31）、月（1-12）和星期（0-6，0=周日）。从左到右阅读。例如 "30 9 * * 1-5" 表示工作日上午 9:30。',
    faq2q: 'Cron 中的 */5 是什么意思？',
    faq2a: '*/N 语法表示"每 N 个单位"。分钟字段中的 */5 表示"每 5 分钟"（在第 0、5、10、15...55 分钟）。* 匹配所有值，/5 是步长。',
    faq3q: '5 字段和 6 字段 cron 有什么区别？',
    faq3a: '标准 Unix cron 使用 5 个字段：分钟、小时、日、月、星期。一些系统添加了第 6 个字段：秒（在开头，Spring/Quartz 使用）或年（在末尾，AWS CloudWatch 使用）。本工具支持标准 5 字段格式。',
    relatedTitle: '相关 Cron 工具',
    tryExample: '点击任意示例进行解析：',
  },
  fr: {
    title: 'Analyseur d\'Expressions Cron',
    description: 'Collez une expression cron et obtenez une explication claire avec decomposition, prochaines executions et validation.',
    inputLabel: 'Expression Cron',
    inputPlaceholder: 'Entrez une expression cron (ex. */5 9-17 * * 1-5)',
    parseBtn: 'Analyser',
    clear: 'Effacer',
    sentenceTitle: 'En langage courant',
    breakdownTitle: 'Decomposition champ par champ',
    fieldCol: 'Champ', valueCol: 'Valeur', meaningCol: 'Signification',
    issuesTitle: 'Problemes detectes',
    nextRunsTitle: '10 prochaines executions',
    cheatTitle: 'Exemples d\'expressions Cron',
    cheatExpression: 'Expression', cheatMeaning: 'Signification',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment lire une expression cron ?',
    faq1a: 'Une expression cron a 5 champs separes par des espaces : minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12) et jour de la semaine (0-6). Lisez de gauche a droite.',
    faq2q: 'Que signifie */5 dans cron ?',
    faq2a: 'La syntaxe */N signifie "toutes les N unites". Donc */5 dans le champ minute signifie "toutes les 5 minutes".',
    faq3q: 'Difference entre cron 5 champs et 6 champs ?',
    faq3a: 'Le cron Unix standard utilise 5 champs. Certains systemes ajoutent un 6e champ pour les secondes (Spring, Quartz) ou l\'annee (AWS CloudWatch).',
    relatedTitle: 'Outils Cron associes',
    tryExample: 'Cliquez sur un exemple pour l\'analyser :',
  },
  de: {
    title: 'Cron Expression Parser',
    description: 'Fuegen Sie einen Cron-Ausdruck ein und erhalten Sie eine verstaendliche Erklaerung mit Aufschluesselung und Validierung.',
    inputLabel: 'Cron-Ausdruck',
    inputPlaceholder: 'Cron-Ausdruck eingeben (z.B. */5 9-17 * * 1-5)',
    parseBtn: 'Analysieren',
    clear: 'Loeschen',
    sentenceTitle: 'Verstaendliche Erklaerung',
    breakdownTitle: 'Feld-fuer-Feld Aufschluesselung',
    fieldCol: 'Feld', valueCol: 'Wert', meaningCol: 'Bedeutung',
    issuesTitle: 'Erkannte Probleme',
    nextRunsTitle: 'Naechste 10 Ausfuehrungszeiten',
    cheatTitle: 'Cron-Ausdruck Beispiele',
    cheatExpression: 'Ausdruck', cheatMeaning: 'Bedeutung',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie liest man einen Cron-Ausdruck?',
    faq1a: 'Ein Cron-Ausdruck hat 5 durch Leerzeichen getrennte Felder: Minute (0-59), Stunde (0-23), Tag des Monats (1-31), Monat (1-12) und Wochentag (0-6). Von links nach rechts lesen.',
    faq2q: 'Was bedeutet */5 in Cron?',
    faq2a: 'Die Syntax */N bedeutet "alle N Einheiten". */5 im Minutenfeld bedeutet "alle 5 Minuten".',
    faq3q: 'Unterschied zwischen 5- und 6-Feld Cron?',
    faq3a: 'Standard-Unix-Cron verwendet 5 Felder. Einige Systeme fuegen ein 6. Feld fuer Sekunden (Spring, Quartz) oder Jahr (AWS) hinzu.',
    relatedTitle: 'Verwandte Cron-Tools',
    tryExample: 'Klicken Sie auf ein Beispiel zum Analysieren:',
  },
  es: {
    title: 'Analizador de Expresiones Cron',
    description: 'Pega cualquier expresion cron y obten una explicacion clara con desglose campo a campo y proximas ejecuciones.',
    inputLabel: 'Expresion Cron',
    inputPlaceholder: 'Ingresa expresion cron (ej. */5 9-17 * * 1-5)',
    parseBtn: 'Analizar',
    clear: 'Limpiar',
    sentenceTitle: 'En lenguaje sencillo',
    breakdownTitle: 'Desglose campo por campo',
    fieldCol: 'Campo', valueCol: 'Valor', meaningCol: 'Significado',
    issuesTitle: 'Problemas detectados',
    nextRunsTitle: 'Proximas 10 ejecuciones',
    cheatTitle: 'Ejemplos de expresiones Cron',
    cheatExpression: 'Expresion', cheatMeaning: 'Significado',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como leer una expresion cron?',
    faq1a: 'Una expresion cron tiene 5 campos separados por espacios: minuto (0-59), hora (0-23), dia del mes (1-31), mes (1-12) y dia de la semana (0-6). Se lee de izquierda a derecha.',
    faq2q: 'Que significa */5 en cron?',
    faq2a: 'La sintaxis */N significa "cada N unidades". */5 en el campo de minuto significa "cada 5 minutos".',
    faq3q: 'Diferencia entre cron de 5 y 6 campos?',
    faq3a: 'El cron Unix estandar usa 5 campos. Algunos sistemas agregan un 6to campo para segundos (Spring, Quartz) o ano (AWS CloudWatch).',
    relatedTitle: 'Herramientas Cron relacionadas',
    tryExample: 'Haz clic en un ejemplo para analizarlo:',
  },
  ja: {
    title: 'Cron 式パーサー',
    description: 'cron 式を貼り付けて、フィールドごとの分解、次回実行時間、バリデーション付きの分かりやすい説明を取得。',
    inputLabel: 'Cron 式',
    inputPlaceholder: 'cron 式を入力（例: */5 9-17 * * 1-5）',
    parseBtn: '解析',
    clear: 'クリア',
    sentenceTitle: '分かりやすい説明',
    breakdownTitle: 'フィールドごとの分解',
    fieldCol: 'フィールド', valueCol: '値', meaningCol: '意味',
    issuesTitle: '検出された問題',
    nextRunsTitle: '次の10回の実行時間',
    cheatTitle: 'Cron 式の例',
    cheatExpression: '式', cheatMeaning: '意味',
    faqTitle: 'よくある質問',
    faq1q: 'cron 式の読み方は？',
    faq1a: 'cron 式は5つのスペース区切りフィールドがあります：分（0-59）、時（0-23）、日（1-31）、月（1-12）、曜日（0-6）。左から右に読みます。',
    faq2q: 'cron の */5 とは？',
    faq2a: '*/N の構文は「N ごと」を意味します。分フィールドの */5 は「5分ごと」を意味します。',
    faq3q: '5フィールドと6フィールドの cron の違いは？',
    faq3a: '標準 Unix cron は5フィールド使用。一部のシステムは秒（Spring、Quartz）や年（AWS）の6番目のフィールドを追加します。',
    relatedTitle: '関連 Cron ツール',
    tryExample: '例をクリックして解析：',
  },
  ko: {
    title: 'Cron 표현식 파서',
    description: 'cron 표현식을 붙여넣고 필드별 분석, 다음 실행 시간, 검증과 함께 쉬운 설명을 받으세요.',
    inputLabel: 'Cron 표현식',
    inputPlaceholder: 'cron 표현식 입력 (예: */5 9-17 * * 1-5)',
    parseBtn: '분석',
    clear: '지우기',
    sentenceTitle: '쉬운 설명',
    breakdownTitle: '필드별 분석',
    fieldCol: '필드', valueCol: '값', meaningCol: '의미',
    issuesTitle: '감지된 문제',
    nextRunsTitle: '다음 10회 실행 시간',
    cheatTitle: 'Cron 표현식 예제',
    cheatExpression: '표현식', cheatMeaning: '의미',
    faqTitle: '자주 묻는 질문',
    faq1q: 'cron 표현식은 어떻게 읽나요?',
    faq1a: 'cron 표현식은 5개의 공백으로 구분된 필드가 있습니다: 분(0-59), 시(0-23), 일(1-31), 월(1-12), 요일(0-6). 왼쪽에서 오른쪽으로 읽습니다.',
    faq2q: 'cron에서 */5는 무슨 뜻인가요?',
    faq2a: '*/N 구문은 "N마다"를 의미합니다. 분 필드의 */5는 "5분마다"를 의미합니다.',
    faq3q: '5필드와 6필드 cron의 차이점은?',
    faq3a: '표준 Unix cron은 5개 필드를 사용합니다. 일부 시스템은 초(Spring, Quartz) 또는 연도(AWS)를 위한 6번째 필드를 추가합니다.',
    relatedTitle: '관련 Cron 도구',
    tryExample: '예제를 클릭하여 분석:',
  },
};

export default function CronExpressionParser() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<string[] | null>(null);

  const parse = (expr?: string) => {
    const value = expr || input.trim();
    if (expr) setInput(value);
    const p = value.split(/\s+/);
    if (p.length === 5) setParsed(p);
    else setParsed(null);
  };

  const breakdown = useMemo(() => {
    if (!parsed) return [];
    return parsed.map((field, idx) => ({
      name: fieldNames[idx],
      ...describeField(field, idx),
    }));
  }, [parsed]);

  const sentence = useMemo(() => parsed ? buildSentence(parsed) : '', [parsed]);
  const issues = useMemo(() => breakdown.filter(b => b.issue), [breakdown]);
  const nextRuns = useMemo(() => parsed ? getNextRuns(parsed, 10) : [], [parsed]);

  // Check for too-frequent schedule
  const isTooFrequent = parsed && parsed[0] === '*' && parsed[1] === '*';

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
    <ToolLayout title={t.title} description={t.description} toolId="cron-expression-parser">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Input */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{ flex: 1, padding: '10px 14px', fontSize: 16, fontFamily: 'monospace', letterSpacing: 1 }}
            onKeyDown={e => e.key === 'Enter' && parse()} />
          <button onClick={() => parse()} className="btn btn-primary" style={{ whiteSpace: 'nowrap', padding: '10px 20px' }}>{t.parseBtn}</button>
          <button onClick={() => { setInput(''); setParsed(null); }} className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>{t.clear}</button>
        </div>
      </div>

      {/* Parsed results */}
      {parsed && (
        <>
          {/* Sentence */}
          <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1))', borderRadius: 10, padding: '16px 20px', marginBottom: 20, border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>{t.sentenceTitle}</div>
            <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{sentence}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <code style={{ fontSize: 14, fontFamily: 'monospace', color: 'var(--accent-color)' }}>{parsed.join(' ')}</code>
              <CopyButton text={parsed.join(' ')} />
            </div>
          </div>

          {/* Issues */}
          {(issues.length > 0 || isTooFrequent) && (
            <div style={{ background: 'rgba(239,68,68,0.08)', borderRadius: 8, padding: '12px 16px', marginBottom: 16, border: '1px solid rgba(239,68,68,0.3)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>{t.issuesTitle}</div>
              {issues.map((iss, i) => (
                <div key={i} style={{ fontSize: 13, color: '#ef4444' }}>{iss.name}: {iss.issue}</div>
              ))}
              {isTooFrequent && (
                <div style={{ fontSize: 13, color: '#f59e0b' }}>Warning: This schedule runs every minute of every hour. Consider if this frequency is necessary.</div>
              )}
            </div>
          )}

          {/* Breakdown table */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{t.breakdownTitle}</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.fieldCol}</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.valueCol}</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.meaningCol}</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.map((b, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', background: b.issue ? 'rgba(239,68,68,0.05)' : 'transparent' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>{b.name}</td>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-color)', fontWeight: 600 }}>{b.raw}</td>
                      <td style={{ padding: '8px 12px', color: b.issue ? '#ef4444' : 'var(--text-secondary)' }}>{b.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Next 10 runs */}
          {nextRuns.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{t.nextRunsTitle}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 4 }}>
                {nextRuns.map((run, i) => (
                  <div key={i} style={{ padding: '6px 12px', fontSize: 13, fontFamily: 'monospace', background: 'var(--bg-input)', borderRadius: 4, border: '1px solid var(--border-color)', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--accent-color)', fontWeight: 700, minWidth: 22 }}>#{i + 1}</span>
                    <span>{run.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Cheat sheet */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{t.cheatTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{t.tryExample}</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.cheatExpression}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.cheatMeaning}</th>
              </tr>
            </thead>
            <tbody>
              {examplePatterns.map(([expr, desc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}
                  onClick={() => parse(expr)}>
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
            { href: `/${lang}/tools/cron-parser`, label: 'Cron Parser' },
            { href: `/${lang}/tools/crontab-generator`, label: 'Crontab Generator' },
            { href: `/${lang}/tools/cron-job-scheduler`, label: 'Cron Job Scheduler' },
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
